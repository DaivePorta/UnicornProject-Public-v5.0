Imports Microsoft.VisualBasic
Imports Microsoft.AspNet.SignalR
Imports System.Web
Imports Nomade.ChatJs
Imports System.Threading.Tasks
Imports NomadeChat.Models
Imports NomadeNotif.Models
Imports NomadeSeguridad.Models
Imports System.Threading

Public Class NomadeHub
    Inherits Hub
    Implements IChatHub, IRequiresSessionState, IReadOnlySessionState

    Private Shared ReadOnly connections As New Dictionary(Of String, Dictionary(Of Integer, List(Of String)))()
    Private Shared ReadOnly dbChatMessages As New List(Of DbChatMessage)()
    Private Shared ReadOnly dbChatUsuarios As New List(Of DbChatUsers)()
    Private Shared ReadOnly dbUserNotificaciones As New List(Of DbUserNotificacion)()
    Private Shared ReadOnly dbUserContenidos As New List(Of DbUserInfo)()

#Region "Chat_Orbitum"

    ''' <summary>
    ''' Borrar los mensajes de la conversación
    ''' </summary>
    ''' <param name="UserOrigen"></param>
    ''' <param name="UserDestino"></param>
    ''' <param name="Sala"></param>
    ''' <remarks></remarks>
    Public Sub RemoveMensajesChat(UserOrigen As Integer, UserDestino As Integer, Sala As Integer) Implements IChatHub.RemoveMensajesChat
        dbChatMessages.RemoveAll(Function(m) m.UserDestino = UserDestino AndAlso m.UserOrigen = UserOrigen AndAlso m.TenancyId = Sala)
        dbChatMessages.RemoveAll(Function(m) m.UserDestino = UserOrigen AndAlso m.UserOrigen = UserDestino AndAlso m.TenancyId = Sala)
    End Sub

    ''' <summary>
    ''' Obtiene el chat de un usuario especifico
    ''' </summary>
    ''' <param name="dbUserPidm">PIDM usuario</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GetChatUserFromDbUserPidm(dbUserPidm As Integer) As ChatCliente
        Dim myRoomId = Me.GetMyRoomId()

        Dim dbUser = dbChatUsuarios.First(Function(u) u.Pidm = dbUserPidm)

        Dim userStatus As ChatCliente.StatusType
        SyncLock connections
            userStatus = If(connections.ContainsKey(myRoomId), (If(connections(myRoomId).ContainsKey(dbUser.Pidm), ChatCliente.StatusType.Online, ChatCliente.StatusType.Offline)), ChatCliente.StatusType.Offline)
        End SyncLock
        Return New ChatCliente() With { _
             .Id = dbUser.Id, _
             .Pidm = dbUser.Pidm, _
             .Usuario = dbUser.Usuario, _
             .Status = userStatus, _
             .Foto = dbUser.Foto, _
             .IP = dbUser.IP, _
             .Navegador = dbUser.Navegador, _
             .RoomId = Convert.ToInt32(dbUser.RoomId),
             .Nombre = dbUser.Nombre, _
             .Catalogo = dbUser.Catalogo, _
             .Sucursal = dbUser.Sucursal
        }
    End Function


    ''' <summary>
    ''' Registra nuevo usuario
    ''' </summary>
    ''' <param name="newCliente">Objeto de tipo user</param>
    ''' <remarks></remarks>
    Public Shared Sub RegisterNewUser(newCliente As DbChatUsers)
        If newCliente Is Nothing Then
            Throw New ArgumentNullException("newCliente")
        End If
        dbChatUsuarios.Add(newCliente)
    End Sub

    ''' <summary>
    ''' Busca cliente por PIDM
    ''' </summary>
    ''' <param name="pidm">PIDM de la persona</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Shared Function BuscarClientePidm(pidm As Integer) As DbChatUsers
        Return dbChatUsuarios.FirstOrDefault(Function(u) u.Pidm = pidm)
    End Function

    ''' <summary>
    ''' Obtiene el historial de los mensajes por usuario
    ''' </summary>
    ''' <param name="otherUserPidm">Pidm de Usuario</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetMessageHistory(otherUserPidm As Integer) As List(Of ChatMensaje) Implements IChatHub.GetMessageHistory
        Dim myUserPidm = Me.GetMyUserPidm()
        Dim dbMessages = dbChatMessages.Where(Function(m) (m.UserDestino = myUserPidm AndAlso m.UserOrigen = otherUserPidm) OrElse (m.UserDestino = otherUserPidm AndAlso m.UserOrigen = myUserPidm)).OrderByDescending(Function(m) m.Fecha).Take(30).ToList()

        dbMessages.Reverse()
        Return dbMessages.[Select](Function(m) Me.GetChatMessage(m, Nothing)).ToList()
    End Function


    ''' <summary>
    ''' Actualiza la lista de contactos del chat
    ''' </summary>
    ''' <remarks></remarks>
    Public Sub BroadcastUsersList() Implements IChatHub.BroadcastUsersList
        Dim myRoomId = Me.GetMyRoomId()
        Dim connectionIds = New List(Of String)()
        SyncLock connections
            If connections.ContainsKey(myRoomId) Then
                connectionIds = connections(myRoomId).Keys.SelectMany(Function(userId) connections(myRoomId)(userId)).ToList()
            End If
        End SyncLock
        Dim dbRoomUsers = dbChatUsuarios.Where(Function(u) u.RoomId = myRoomId).OrderBy(Function(u) u.Nombre).ToList()
        Dim usersList = dbRoomUsers.[Select](Function(u) Me.GetChatUserFromDbUserPidm(u.Pidm)).ToList()

        For Each connectionId As String In connectionIds
            Me.Clients.Client(connectionId).usersListChanged(usersList)
        Next
    End Sub

    ''' <summary>
    ''' Registra un nuevo mensaje por usuario
    ''' </summary>
    ''' <param name="otherUserPidm">Usuario destino</param>
    ''' <param name="message">Mensaje</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function PersistMessage(otherUserPidm As Integer, message As String) As DbChatMessage
        Dim resp As Integer = 0

        Dim myUserPidm = Me.GetMyUserPidm()

        Dim myUser = dbChatUsuarios.FirstOrDefault(Function(u) u.Pidm = myUserPidm)
        Dim otherUser = dbChatUsuarios.FirstOrDefault(Function(u) u.Pidm = otherUserPidm)
        Dim codChat As Integer = 0

        Dim dbChatMessage = New DbChatMessage() With { _
             .Fecha = DateTime.Now, _
             .Message = message, _
             .UserOrigen = myUserPidm, _
             .UserDestino = otherUserPidm, _
             .TenancyId = myUser.RoomId _
        }

        dbChatMessages.Add(dbChatMessage)

        Return dbChatMessage
    End Function

    ''' <summary>
    ''' Envia mensaje a un usuario
    ''' </summary>
    ''' <param name="otherUserPidm">Usuario</param>
    ''' <param name="message">Mensaje</param>
    ''' <param name="clientGuid">Parte GUID generada</param>
    ''' <remarks></remarks>
    Public Sub SendMessage(otherUserPidm As Integer, message As String, clientGuid As String) Implements IChatHub.SendMessage
        Dim myUserPidm = Me.GetMyUserPidm()
        Dim myRoomId = Me.GetMyRoomId()

        If myRoomId <> "-1" Then
            Dim dbChatMessage = PersistMessage(otherUserPidm, message)
            Dim connectionIds = New List(Of String)()
            SyncLock connections
                If connections(myRoomId).ContainsKey(otherUserPidm) Then
                    connectionIds.AddRange(connections(myRoomId)(otherUserPidm))
                End If
                If connections(myRoomId).ContainsKey(myUserPidm) Then
                    connectionIds.AddRange(connections(myRoomId)(myUserPidm))
                End If
            End SyncLock
            For Each connectionId As String In connectionIds
                Me.Clients.Client(connectionId).sendMessage(Me.GetChatMessage(dbChatMessage, clientGuid))
            Next
        End If
    End Sub

    ''' <summary>
    ''' Obtiene Mensaje de un usuario
    ''' </summary>
    ''' <param name="ChatMensaje">Objeto de tipo message</param>
    ''' <param name="clientGuid">Parte generada por el GUID</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GetChatMessage(ChatMensaje As DbChatMessage, clientGuid As String) As ChatMensaje
        Return New ChatMensaje() With { _
             .Timestamp = ChatMensaje.Fecha, _
             .Message = ChatMensaje.Message, _
             .UserFrom = Me.GetChatUserFromDbUserPidm(ChatMensaje.UserOrigen), _
             .UserTo = Me.GetChatUserFromDbUserPidm(ChatMensaje.UserDestino), _
             .ClientGuid = clientGuid _
        }
    End Function


    ''' <summary>
    ''' Obtiene el PIDM desde cookies
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GetMyUserPidm() As Integer
        Dim pidm As Integer

        Try
            If (CookieChat.GetUserChatFromCookie(Me.Context.Request) IsNot Nothing) Then
                pidm = CookieChat.GetUserChatFromCookie(Me.Context.Request).Pidm
            Else
                pidm = 0
            End If
        Catch ex As Exception
            pidm = 0
        End Try

        Return pidm
    End Function

    ''' <summary>
    ''' Obtiene sala de chat (666)
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GetMyRoomId() As Integer
        Return 666
    End Function

    ''' <summary>
    ''' Obtiene objeto usuario
    ''' </summary>
    ''' <param name="userPidm"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetUserInfo(userPidm As Integer) As ChatCliente
        Dim user = dbChatUsuarios.FirstOrDefault(Function(u) u.Pidm = userPidm)
        Return If(user Is Nothing, Nothing, GetChatUserFromDbUserPidm(userPidm))
    End Function

    ''' <summary>
    ''' Envia un mensaje de usuario escribiendo
    ''' </summary>
    ''' <param name="otherUserId"></param>
    ''' <remarks></remarks>
    Public Sub SendTypingSignal(otherUserId As Integer) Implements IChatHub.SendTypingSignal
        Dim myUserPidm = Me.GetMyUserPidm()
        Dim myRoomId = Me.GetMyRoomId()

        Dim connectionIds = New List(Of String)()
        SyncLock connections
            If connections(myRoomId).ContainsKey(otherUserId) Then
                connectionIds.AddRange(connections(myRoomId)(otherUserId))
            End If
        End SyncLock
        For Each connectionId As String In connectionIds
            Me.Clients.Client(connectionId).sendTypingSignal(Me.GetUserInfo(myUserPidm))
        Next
    End Sub

#End Region

#Region "Notificaciones_Orbitum"

    ''' <summary>
    ''' Obtiene el numero de notificaciones que el usuario aun no ha visto
    ''' </summary>
    ''' <param name="userId">PIDM de usuario</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetNumNotificaciones(userId As String) As Integer
        Dim dbNotificaciones = dbUserNotificaciones.Where(Function(m) (m.UserDestino = userId) AndAlso (m.Visto = 0))
        Return dbNotificaciones.Count
    End Function

    ''' <summary>
    ''' Obtiene el historial de notificaciones 
    ''' </summary>
    ''' <param name="userId">Id de usuario</param>
    ''' <remarks></remarks>
    Public Sub GetNotificacionHistory(userId As String) Implements IChatHub.GetNotificacionHistory
        Dim dbNotificaciones = dbUserNotificaciones.Where(Function(m) (m.UserDestino = userId) AndAlso (m.Visto = 0)).OrderByDescending(Function(m) m.Fecha).Take(50).ToList()
        dbNotificaciones.Reverse()
        Clients.Client(Context.ConnectionId).dibujarNotificaciones(dbNotificaciones)
        'Clients.All.dibujarNotificaciones(dbNotificaciones)
    End Sub

    ''' <summary>
    ''' Obtiene todas las notificaciones ordenadas por fecha
    ''' </summary>
    ''' <param name="userId">Id de usuario</param>
    ''' <remarks></remarks>
    Public Sub GetNotificacionAll(userId As String)
        Dim dbNotificaciones = dbUserNotificaciones.Where(Function(m) (m.UserDestino = userId)).OrderByDescending(Function(m) m.Fecha).Take(50).ToList()
        dbNotificaciones.Reverse()
        Clients.Client(Context.ConnectionId).dibujarNotificacionesAll(dbNotificaciones)
        'Clients.All.dibujarNotificacionesAll(dbNotificaciones)
    End Sub

    ''' <summary>
    ''' Registra una nueva notificacion
    ''' </summary>
    ''' <param name="newNotif">Objeto de tipo notificacion</param>
    ''' <remarks></remarks>
    Public Shared Sub RegisterNewNotif(newNotif As DbUserNotificacion)
        If newNotif Is Nothing Then
            Throw New ArgumentNullException("newNotif")
        End If

        'If newNotif.IdNotificacion <= 0 Or Not dbUserNotificaciones.Any(Function(item) (item.IdNotificacion = newNotif.IdNotificacion And item.Grupo = newNotif.Grupo)) Then
        '    dbUserNotificaciones.Add(newNotif)
        'End If

        dbUserNotificaciones.Add(newNotif)
    End Sub
    ''' <summary>
    ''' Elimina todas las notificaciones de un grupo
    ''' </summary>
    ''' <param name="grupo">Grupo de alerta</param>
    ''' <remarks></remarks>
    Public Shared Sub DeleteByGrupo(grupo As String)
        dbUserNotificaciones.RemoveAll(Function(item) (item.Grupo.Equals(grupo)))
    End Sub

    ''' <summary>
    ''' Busca notificaciones por usuario
    ''' </summary>
    ''' <param name="usuario">usuario_destino</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Shared Function BuscarNotificacionesUsuario(usuario As String) As DbUserNotificacion
        Return dbUserNotificaciones.FirstOrDefault(Function(u) u.UserDestino = usuario)
    End Function

    ''' <summary>
    ''' Actualiza el estado de la notificacion a visto
    ''' </summary>
    ''' <param name="usuarioId">PIDM de usuario</param>
    ''' <param name="codReferencia">Codigo de referencia de operacion</param>
    ''' <remarks></remarks>
    Public Sub actualizarNotificacion(ByVal usuarioId As String, ByVal codReferencia As String)
        Dim notif = dbUserNotificaciones.FirstOrDefault(Function(u) (u.UserDestino = usuarioId) AndAlso (u.Visto = 0) AndAlso (u.CodReferencia = codReferencia))
        If notif IsNot Nothing Then
            notif.Visto = 1
        End If
    End Sub

    ''' <summary>
    ''' Envia notificacion real-time a un usuario
    ''' </summary>
    ''' <param name="user_destino">Usuario a quien se envia la notificacion</param>
    ''' <param name="modulo">GST:Gastos;ASG:Asignacion Temporal;PLA:Planilla;PRO:Produccion;OTR:Otros</param>
    ''' <param name="texto">Texto que se mostrara en la pantalla</param>
    ''' <param name="link">Link a donde te redirige la pantalla ('#' si no desea link)</param>
    ''' <param name="user_origen">Usuario que envía la notificacion</param>
    ''' <param name="codReferencia">Codigo de referencia de la operacion (ejm: GST00000021)</param>
    ''' <remarks></remarks>
    Public Sub enviarNotificacion(ByVal user_destino As String, ByVal modulo As String, ByVal texto As String, ByVal link As String, ByVal user_origen As String, ByVal codReferencia As String) Implements IChatHub.enviarNotificacion
        Dim icono As String = ""
        Dim tipo As String = ""
        Dim titulo As String = ""
        Select Case modulo
            Case "GST"
                icono = "icon-money"
                tipo = "success"
                titulo = "PROVISIÓN GASTOS"
            Case "ASG"
                icono = "icon-legal"
                tipo = "info"
                titulo = "ASIGNACION TEMPORAL"
            Case "PLA"
                icono = "icon-book"
                tipo = "warning"
                titulo = "PLANILLA"
            Case "PRO"
                icono = "icon-wrench"
                tipo = "important"
                titulo = "PRODUCCIÓN"
            Case "OTR"
                icono = "icon-asterisk"
                tipo = ""
                titulo = "OTROS"
        End Select


        Dim dbNotificacion = New DbUserNotificacion() With {
            .Fecha = Date.Now,
            .Link = link,
            .Modulo = modulo,
            .Texto = texto,
            .UserDestino = user_destino,
            .UserOrigen = user_origen,
            .Visto = 0,
            .CodReferencia = codReferencia,
            .Icono = icono,
            .Tipo = tipo
        }
        NomadeHub.RegisterNewNotif(dbNotificacion)

        Dim context = GlobalHost.ConnectionManager.GetHubContext(Of NomadeHub)()
        context.Clients.All.notificar(GetNumNotificaciones(user_destino), link, icono, texto, Date.Now.ToString, tipo, user_origen, titulo, codReferencia)

    End Sub

    ''' <summary>
    ''' Envia notificacion real-time a un usuario
    ''' </summary>
    ''' <param name="user_destino">Usuario a quien se envia la notificacion</param>
    ''' <param name="modulo">GST:Gastos;ASG:Asignacion Temporal;PLA:Planilla;PRO:Produccion;OTR:Otros</param>
    ''' <param name="texto">Texto que se mostrara en la pantalla</param>
    ''' <param name="link">Link a donde te redirige la pantalla ('#' si no desea link)</param>
    ''' <param name="user_origen">Usuario que envía la notificacion</param>
    ''' <param name="codReferencia">Codigo de referencia de la operacion (ejm: GST00000021)</param>
    ''' <remarks></remarks>
    Public Sub EnviarNotificacionNuevo(idNotificacion As Long,
                                       user_destino As String,
                                       modulo As String,
                                       texto As String,
                                       link As String,
                                       user_origen As String,
                                       codReferencia As String,
                                       grupo As String,
                                       Optional tipo As String = "warning",
                                       Optional icono As String = "icon-book") Implements IChatHub.EnviarNotificacionNuevo

        Dim dbNotificacion = New DbUserNotificacion() With {
            .IdNotificacion = idNotificacion,
            .Fecha = Date.Now,
            .Link = link,
            .Modulo = modulo,
            .Texto = texto,
            .UserDestino = user_destino,
            .UserOrigen = user_origen,
            .Visto = 0,
            .CodReferencia = codReferencia,
            .Icono = icono,
            .Tipo = tipo,
            .Grupo = grupo
        }
        NomadeHub.RegisterNewNotif(dbNotificacion)

        'Dim context = GlobalHost.ConnectionManager.GetHubContext(Of NomadeHub)()
        'context.Clients.All.notificar(GetNumNotificaciones(user_destino), link, icono, texto, Date.Now.ToString, tipo, user_origen, titulo, codReferencia)

    End Sub


    Public Sub EliminarNotificacionesPorGrupo(grupo As String) Implements IChatHub.EliminarNotificacionesPorGrupo
        NomadeHub.DeleteByGrupo(grupo)
    End Sub

    ''' <summary>
    ''' Obtiene objeto de tipo notificacion
    ''' </summary>
    ''' <param name="UserNotif"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Private Function GetUserNotificacion(UserNotif As DbUserNotificacion) As UserNotificacion
        Return New UserNotificacion() With { _
            .link = UserNotif.Link, _
            .modulo = UserNotif.Modulo, _
            .texto = UserNotif.Texto, _
            .user_destino = UserNotif.UserDestino, _
            .user_origen = UserNotif.UserOrigen, _
            .visto = UserNotif.Visto, _
            .codigo = UserNotif.CodReferencia, _
            .icono = UserNotif.Icono, _
            .tipo = UserNotif.Tipo
        }
    End Function

#End Region

#Region "Seguridad_Orbitum"

    ''' <summary>
    ''' Registra nueva Info Usuario
    ''' </summary>
    ''' <param name="newInfoUser"></param>
    ''' <remarks></remarks>
    Public Shared Sub RegisterNewInfoUser(newInfoUser As DbUserInfo)
        If newInfoUser Is Nothing Then
            Throw New ArgumentNullException("newInfoUser")
        End If
        dbUserContenidos.Add(newInfoUser)
    End Sub

    ''' <summary>
    ''' Obtiene el html del combo que se dibuja en las formas
    ''' </summary>
    ''' <param name="usuarioId">Id de usuario</param>
    ''' <param name="pidm">Pidm de usuario</param>
    ''' <param name="catalogo">Codigo de catalogo</param>
    ''' <param name="sucursal">Codigo de suscursal</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetFormasUsuario(ByVal usuarioId As String, ByVal pidm As Integer, ByVal catalogo As String, ByVal sucursal As String) As String
        Dim info = dbUserContenidos.FirstOrDefault(Function(u) (u.Id = usuarioId) AndAlso (u.Catalogo = catalogo) AndAlso (u.Sucursal = sucursal))
        If info Is Nothing Then
            Return String.Empty
        Else
            Return info.Formas
        End If
    End Function

    ''' <summary>
    ''' Obtiene el html del menu principal
    ''' </summary>
    ''' <param name="usuarioId">Id de usuario</param>
    ''' <param name="pidm">Pidm de usuario</param>
    ''' <param name="catalogo">Codigo de catalogo</param>
    ''' <param name="sucursal">Codigo de suscursal</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GetMenuUsuario(ByVal usuarioId As String, ByVal pidm As Integer, ByVal catalogo As String, ByVal sucursal As String) As String
        Dim info = dbUserContenidos.FirstOrDefault(Function(u) (u.Id = usuarioId) AndAlso (u.Catalogo = catalogo) AndAlso (u.Sucursal = sucursal))
        If info Is Nothing Then
            Return String.Empty
        Else
            Return info.Menu
        End If
    End Function

    ''' <summary>
    ''' Actualiza formas y menu de usuario
    ''' </summary>
    ''' <param name="usuarioId">Id de usuario</param>
    ''' <param name="pidm">Pidm de usuario</param>
    ''' <param name="catalogo">Codigo de catalogo</param>
    ''' <param name="sucursal">Codigo de suscursal</param>
    ''' <param name="formas">HTML de las formas para el select</param>
    ''' <param name="menu">HTML del menu principal</param>
    ''' <remarks></remarks>
    Public Shared Sub actualizarInfo(ByVal usuarioId As String, ByVal pidm As Integer, ByVal catalogo As String, ByVal sucursal As String, ByVal formas As String, ByVal menu As String)
        Dim info = dbUserContenidos.FirstOrDefault(Function(u) (u.Id = usuarioId) AndAlso (u.Catalogo = catalogo) AndAlso (u.Sucursal = sucursal))
        info.Formas = formas
        info.Menu = menu
    End Sub

    ''' <summary>
    ''' Verifica si el usuario ya tiene formas y menu en el objeto
    ''' </summary>
    ''' <param name="usuarioId">Id de usuario</param>
    ''' <param name="pidm">Pidm de usuario</param>
    ''' <param name="catalogo">Codigo de catalogo</param>
    ''' <param name="sucursal">Codigo de suscursal</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Shared Function UserRegistrado(ByVal usuarioId As String, ByVal pidm As Integer, ByVal catalogo As String, ByVal sucursal As String) As Integer
        Dim info = dbUserContenidos.FirstOrDefault(Function(u) (u.Id = usuarioId) AndAlso (u.Pidm = pidm) AndAlso (u.Catalogo = catalogo) AndAlso (u.Sucursal = sucursal))
        If info Is Nothing Then
            Return 0
        Else
            Return 1
        End If
    End Function

    ''' <summary>
    ''' Crea una variable en localstorage para poder trabajar en paralelo multiples sesiones
    ''' </summary>
    ''' <remarks></remarks>
    Public Sub trabajarParalelo() Implements IChatHub.trabajarParalelo
        Dim session As String
        Dim user As String
        user = Context.User.Identity.Name.ToString()
        'user = HttpContext.Current.User.Identity.Name 'srl 24.09.2015
        session = Context.RequestCookies("ASP.NET_SessionId").Value
        Clients.All.paralelo(session, user)
    End Sub

    ''' <summary>
    ''' Verifica la sesion del usuario
    ''' </summary>
    ''' <param name="sesionId">Session ID del asp net</param>
    ''' <remarks></remarks>
    Public Sub verificaSesion(ByVal sesionId As String, ByVal empresa As String) Implements IChatHub.verificaSesion
        Dim user As String
        Dim session As String

        Dim emp_arr(1) As String

        Try

            user = Context.User.Identity.Name.ToString()
            session = Context.RequestCookies("ASP.NET_SessionId").Value.ToString()
            Clients.Others.verificar(user, session, empresa)
        Catch ex As Exception
            Clients.Client(Context.ConnectionId).lanzar()
        End Try
    End Sub

    ''' <summary>
    ''' Cierra la sesion del usuario actual
    ''' </summary>
    ''' <param name="sessionId">Session ID del asp net</param>
    ''' <remarks></remarks>
    Public Sub cerrarSesionActual(ByVal sessionId As String) Implements IChatHub.cerrarSesionActual
        Dim user As String
        Dim session As String
        user = Context.User.Identity.Name.ToString()
        'user = HttpContext.Current.User.Identity.Name 'srl 24.09.2015
        session = Context.RequestCookies("ASP.NET_SessionId").Value
        Clients.All.cerrarActual(user, session)
    End Sub

    ''' <summary>
    ''' Cierra la sesion intrusa
    ''' </summary>
    ''' <param name="sessionId">Session ID del asp net</param>
    ''' <remarks></remarks>
    Public Sub cerrarOtraSesion(ByVal sessionId As String) Implements IChatHub.cerrarOtraSesion
        Dim user As String
        Dim session As String
        user = Context.User.Identity.Name.ToString()
        ' user = HttpContext.Current.User.Identity.Name 'srl 24.09.2015
        session = Context.RequestCookies("ASP.NET_SessionId").Value
        Clients.Others.cerrarOtra(user, session)
    End Sub

    ''' <summary>
    ''' OnConnected
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Overrides Function OnConnected() As Task Implements IChatHub.OnConnected
        Dim myRoomId = Me.GetMyRoomId()
        Dim myUserPidm = Me.GetMyUserPidm()

        SyncLock connections
            If Not connections.ContainsKey(myRoomId) Then
                connections(myRoomId) = New Dictionary(Of Integer, List(Of String))()
            End If

            If Not connections(myRoomId).ContainsKey(myUserPidm) Then
                connections(myRoomId)(myUserPidm) = New List(Of String)()
            End If

            connections(myRoomId)(myUserPidm).Add(Me.Context.ConnectionId)
        End SyncLock

        Me.BroadcastUsersList()
        Return MyBase.OnConnected()
    End Function

    ''' <summary>
    ''' OnDisconnected
    ''' </summary>
    ''' <param name="stopCalled"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Overrides Function OnDisconnected(ByVal stopCalled As Boolean) As Task Implements IChatHub.OnDisconnected
        Dim myRoomId = Me.GetMyRoomId()
        Dim myUserPidm = Me.GetMyUserPidm()

        SyncLock connections
            If connections.ContainsKey(myRoomId) Then
                If connections(myRoomId).ContainsKey(myUserPidm) Then
                    If connections(myRoomId)(myUserPidm).Contains(Me.Context.ConnectionId) Then
                        connections(myRoomId)(myUserPidm).Remove(Me.Context.ConnectionId)
                        If Not connections(myRoomId)(myUserPidm).Any() Then
                            connections(myRoomId).Remove(myUserPidm)
                            Task.Run(Function()
                                         Thread.Sleep(10000)
                                         If Not connections(myRoomId).ContainsKey(myUserPidm) Then
                                             Dim myDbUser = dbChatUsuarios.FirstOrDefault(Function(u) u.Pidm = myUserPidm)
                                             If myDbUser IsNot Nothing Then
                                                 dbChatUsuarios.Remove(myDbUser)
                                                 Me.BroadcastUsersList()
                                             End If
                                         End If
                                     End Function)
                        End If
                    End If
                End If
            End If
        End SyncLock

        Return MyBase.OnDisconnected(stopCalled)
    End Function
#End Region

End Class
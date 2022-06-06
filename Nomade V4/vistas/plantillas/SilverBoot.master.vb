Imports System.Security
Imports System.Web
Imports System.Web.UI.Page
Imports System.Data
Imports NomadeChat.Models

Partial Class vistas_plantillas_SilverBoot
    Inherits System.Web.UI.MasterPage
    Dim usua As String
    Dim v_logeado As String
    Public vestilo As String = 1000
    Dim v_modulo As String
    Public menu As New StringBuilder

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            sologeo(HttpContext.Current.User.Identity.Name)

            lblVersion.Text = System.Configuration.ConfigurationManager.AppSettings("Version")

            lbl_empresa.Text = Session("nEmpresa") & "</br><span style=""color: #c4d0d4;"">" & Session("nEstablecimiento") & "</span>"

            If (Me.hd.Value.ToString <> String.Empty) Then v_modulo = Me.hd.Value.ToString.ToLower


            Me.hddctlg.Value = Session("Empresa")

            Me.sHddctlg.Value = Session("nEmpresa")
         
            Me.hddestablecimiento.Value = Session("Establecimiento")

            'Carlos Medina 27/08/2014 - Captura la Clase
            Me.txtclase.Value = hd.Value

            Me.hdsesion.Value = Session("ID")

            Me.rutaImg.Value = obtenerRutaImag()

            Dim PIDM As Integer = Integer.Parse(Session("pidm"))

            Try

                Dim existingUser = NomadeHub.BuscarClientePidm(PIDM)

                If existingUser IsNot Nothing Then

                    IsUserAuthenticated = True
                    UserId = PIDM
                    UserName = HttpContext.Current.User.Identity.Name.ToString
                    UserProfilePictureUrl = obtenerRutaImag()

                Else
                    Dim dbUSer = New DbChatUsers() With {
                        .Nombre = Request.Cookies("UserInfo")("sNombre"),
                        .Usuario = HttpContext.Current.User.Identity.Name.ToUpper,
                        .Pidm = PIDM,
                        .Foto = obtenerRutaImag(),
                        .RoomId = 666,
                        .IP = Me.hfip.Value,
                        .Navegador = Context.Request.Browser.Browser & " " & Context.Request.Browser.Version,
                        .Catalogo = Session("nEmpresa"),
                        .Sucursal = Session("nEstablecimiento")
                    }

                    NomadeHub.RegisterNewUser(dbUSer)

                    IsUserAuthenticated = True
                    UserId = PIDM
                    UserName = HttpContext.Current.User.Identity.Name.ToString
                    UserProfilePictureUrl = obtenerRutaImag()

                End If

            Catch ex As Exception
                'ERROR AL INICIAR EL CHAT
            End Try




            Try
                Dim oNSAlertas As New Nomade.AL.ALAlertas("Bn")
                Dim dtAlertas As DataTable
                dtAlertas = oNSAlertas.ListarAlertas(Session("Empresa"), HttpContext.Current.User.Identity.Name.ToUpper)
                If dtAlertas IsNot Nothing Then
                    Dim nOTIF As New NomadeHub

                    Dim lstGrupo As IEnumerable
                    lstGrupo = dtAlertas.AsEnumerable().Select(Function(r) r.Field(Of String)("Grupo")).Distinct().ToList()
                    For Each item As String In lstGrupo
                        nOTIF.EliminarNotificacionesPorGrupo(item)
                    Next

                    For Each row As DataRow In dtAlertas.Rows
                        nOTIF.EnviarNotificacionNuevo(row("Id"),
                                                    row("UsuarioDestino"),
                                                    row("Modulo"),
                                                    row("Contenido"),
                                                    "#",
                                                    row("UsuarioOrigen"),
                                                    row("CodReferencia"),
                                                    row("Grupo"),
                                                    True)
                    Next row
                End If

            Catch ex As Exception

            End Try

        Catch ex As Exception
            Me.cph.Visible = False
            Response.Write(ex.Message)
        End Try
    End Sub

    'Lista los menus e items del sidebar izquierdo (Menu Principal)
    Public Sub Menus()
        Dim nsSis As New Nomade.NS.NSSistema("Bn")
        Dim nsMod As New Nomade.NS.NSModulo("Bn")
        Dim nsIte As New Nomade.NS.NSItem("Bn")
        Dim dtSis As DataTable
        Dim dtMod As DataTable
        Dim dtIte As DataTable

        dtSis = nsSis.ListarSistema("", "A", "W") 'Listar sistemas sólo Web (W)
        If Not (dtSis Is Nothing) Then

            menu.Append("<li id='home' class='start'>")
            menu.Append("<a href='../../Default.aspx'>")
            menu.Append("<i class='icon-home'></i>")
            menu.Append("<span class='title'>Principal</span>")
            menu.Append("<span class='selected'></span>")
            menu.Append("</a>")
            menu.Append("</li>")

            For Each MiDatarow As DataRow In dtSis.Rows

                dtMod = nsMod.ListarModulo("", MiDatarow("CODIGO").ToString, "A")
                menu.Append("<!--item menu " + MiDatarow("DESCRIPCION").ToString + "--->")
                menu.Append("<li><a href='javascript:;'>")
                menu.Append("<i class='" + MiDatarow("ICONO").ToString + "'></i><span class='title'>" + MiDatarow("NOMBRE").ToString + "</span>")
                menu.Append("<span class='arrow'></span>")
                menu.Append("</a>")

                If Not (dtMod Is Nothing) Then
                    menu.Append("<ul class='sub-menu'>")
                    For Each MiDatarow1 As DataRow In dtMod.Rows
                        dtIte = nsIte.ListarItem("", "A", MiDatarow("CODIGO").ToString, MiDatarow1("CODIGO").ToString)

                        menu.Append("<li><a href='#'><span class='title'>" + MiDatarow1("NOMBRE").ToString + "</span><span class='arrow'></span></a>")

                        If Not (dtIte Is Nothing) Then
                            menu.Append("<ul class='sub-menu'>")
                            For Each MiDatarow2 As DataRow In dtIte.Rows
                                menu.Append("<li id='" + MiDatarow2("FORMA").ToString.ToLower + "'><a href='?f=" + MiDatarow2("FORMA").ToString + "'>" + MiDatarow2("NOMBRE").ToString + "</a></li>")
                            Next
                            menu.Append("</ul>")
                        End If

                        menu.Append("</li>")
                    Next
                    menu.Append("</ul>")
                End If

                menu.Append("</li>")
            Next
            menu.Append("<li>")
            menu.Append("<a href='cerrar_sesion.aspx'>")
            menu.Append("<i class='icon-off'></i>")
            menu.Append("<span class='title'>Salir del Sistema</span>")
            menu.Append("</a>")
            menu.Append("</li>")
        End If

    End Sub

    Private Sub sologeo(ByVal v_autogen As String)
        If (Len(HttpContext.Current.User.Identity.Name) > 0) Then
            v_logeado = 1
            Me.lblusuario.Text = HttpContext.Current.User.Identity.Name
            Me.txtus.Value = HttpContext.Current.User.Identity.Name
        Else
            v_logeado = 0
        End If
    End Sub

    Function obtenerRutaImag() As String

        Dim P As New Nomade.NS.NSUsuario("Bn")
        Dim ruta As String = P.listarUsuario(String.Empty, String.Empty, Me.txtus.Value, "A").Rows(0).Item("IMAGEN")
        Return ruta

    End Function

    Public Property id_usua() As String
        Get
            Return usua
        End Get
        Set(ByVal value As String)
            usua = value
        End Set
    End Property

    Protected Property UserId() As Integer
        Get
            Return m_UserId
        End Get
        Set(value As Integer)
            m_UserId = value
        End Set
    End Property
    Private m_UserId As Integer

    Protected Property UserName() As String
        Get
            Return m_UserName
        End Get
        Set(value As String)
            m_UserName = value
        End Set
    End Property
    Private m_UserName As String

    Protected Property UserProfilePictureUrl() As String
        Get
            Return m_UserProfilePictureUrl
        End Get
        Set(value As String)
            m_UserProfilePictureUrl = value
        End Set
    End Property
    Private m_UserProfilePictureUrl As String

    Protected Property IsUserAuthenticated() As Boolean
        Get
            Return m_IsUserAuthenticated
        End Get
        Set(value As Boolean)
            m_IsUserAuthenticated = value
        End Set
    End Property
    Private m_IsUserAuthenticated As Boolean

End Class


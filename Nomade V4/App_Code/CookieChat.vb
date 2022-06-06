Imports Microsoft.VisualBasic
Imports System.Web.Script.Serialization
Imports NomadeChat.Models
Imports Microsoft.AspNet.SignalR

Public Class CookieChat
    ''' <summary>
    ''' Nombre de la Cookie donde se almacenara los datos del usuario
    ''' </summary>
    ''' <remarks></remarks>
    Public Shared COOKIE_NAME As String = "UserInfo"

    ''' <summary>
    ''' Obtiene datos de usuario desde la cookie
    ''' </summary>
    ''' <param name="request"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Shared Function GetUserChatFromCookie(request As HttpRequestBase) As DbChatUsers
        If request Is Nothing Then
            Throw New ArgumentNullException("request")
        End If
        Dim cookie = request.Cookies(COOKIE_NAME).Value
        If cookie Is Nothing Then
            Return Nothing
        End If

        Dim pidm As Integer = 0
        'Dim cookieBytes = Convert.FromBase64String(cookie.Value)
        'Dim cookieString = Encoding.UTF8.GetString(cookieBytes)
        'Dim pidm As Integer = New JavaScriptSerializer().Deserialize(Of DbChatUsers)(cookieString).Pidm

        'srl 24.09.2015

        For Each texto As String In cookie.Split("&")
            If (texto.Contains("sPIDM")) Then
                pidm = Integer.Parse(texto.Split("=")(1))
            End If
        Next

        Return NomadeHub.BuscarClientePidm(pidm)
    End Function

    ''' <summary>
    ''' Retorna los datos de usuario JSON
    ''' </summary>
    ''' <param name="request"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Shared Function GetUserChatFromCookie(request As IRequest) As DbChatUsers
        If request Is Nothing Then
            Throw New ArgumentNullException("request")
        End If
        Dim cookie = request.Cookies(COOKIE_NAME).Value

        If cookie Is Nothing Then
            Return Nothing
        End If

        'Dim cookieBytes = Convert.FromBase64String(cookie.Value)
        'Dim cookieString = Encoding.UTF8.GetString(cookieBytes)
        'Dim pidm As Integer = New JavaScriptSerializer().Deserialize(Of DbChatUsers)(cookieString).Pidm

        Dim pidm As Integer = 0
        For Each texto As String In cookie.Split("&")
            If (texto.Contains("sPIDM")) Then
                pidm = Integer.Parse(texto.Split("=")(1))
            End If
        Next

        Return NomadeHub.BuscarClientePidm(pidm)
    End Function

    ''' <summary>
    ''' Borra la cookie del navegador
    ''' </summary>
    ''' <param name="response"></param>
    ''' <remarks></remarks>
    Public Shared Sub RemoveCookie(response As HttpResponseBase)
        If response Is Nothing Then
            Throw New ArgumentNullException("response")
        End If
        Dim cookie = response.Cookies(COOKIE_NAME)
        If cookie IsNot Nothing Then
            cookie.Expires = DateTime.Now.AddDays(-1)
        End If
    End Sub

    ''' <summary>
    ''' Crea la cookie con los datos del usuario
    ''' </summary>
    ''' <param name="request"></param>
    ''' <param name="dbUser"></param>
    ''' <remarks></remarks>
    Public Shared Sub CreateNewUserChatCookie(request As HttpResponseBase, dbUser As DbChatUsers)
        If request Is Nothing Then
            Throw New ArgumentNullException("request")
        End If
        If dbUser Is Nothing Then
            Throw New ArgumentNullException("dbUser")
        End If

        Dim cookie = New HttpCookie(COOKIE_NAME) With { _
            .Value = Convert.ToBase64String(Encoding.UTF8.GetBytes(New JavaScriptSerializer().Serialize(dbUser))), _
            .Expires = DateTime.UtcNow.AddDays(30) _
        }
        request.Cookies.Add(cookie)
    End Sub
End Class

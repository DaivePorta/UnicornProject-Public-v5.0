
Partial Class cerrar_sesion
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            ''Dim C As New UPAO.YG.General.Seguridad("BN")
            ''Dim msg As String
            ''msg = C.CERRAR_SESION(User.Identity.Name)
            ''C = Nothing
            Dim rutaMenu = Me.Server.MapPath(".") & "/FileUsuarios/menu" & HttpContext.Current.Request.Cookies("ASP.NET_SessionId").Value & ".txt"
            Dim rutaFormas = Me.Server.MapPath(".") & "/FileUsuarios/formas" & HttpContext.Current.Request.Cookies("ASP.NET_SessionId").Value & ".txt"

            System.IO.File.Delete(rutaMenu)
            System.IO.File.Delete(rutaFormas)

            Response.Cookies("nomadeconf").Expires = "12/10/1900"
            Response.Cookies("opcionOtraSesion").Expires = "12/10/1900"
            Response.Cookies("otraSesion").Expires = "12/10/1900"
            Response.Cache.SetCacheability(HttpCacheability.NoCache)
            Response.Cache.SetExpires(DateTime.Now)
            Response.Cache.SetNoServerCaching()
            Response.Cache.SetNoStore()
            FormsAuthentication.SignOut()
            Response.Redirect("login.aspx")

        Catch ex As Exception
            Response.Redirect("login.aspx")
        End Try
    End Sub
End Class

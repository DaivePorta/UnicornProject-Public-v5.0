
Partial Class vistas_NS_NSMFORM
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        If Not Page.IsPostBack Then
            hfUsuario.Value = Me.usuario
        End If
    End Sub
End Class

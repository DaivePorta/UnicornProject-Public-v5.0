﻿

Partial Class vistas_NC_NCMIDIO
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

        If Not Page.IsPostBack Then
            hfCodigoUsuario.Value = Me.usuario
        End If

    End Sub
End Class

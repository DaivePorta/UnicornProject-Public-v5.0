
Partial Class vistas_NO_NOMORDD
    Inherits Nomade.N.Cub


    Protected Sub btnPFD_Click(sender As Object, e As EventArgs) Handles btnPFD.Click
        Dim filep As String
        Dim filen, ruta As String
        filep = "Archivos\"
        filen = hfDescarga.Value + ".pdf"
        ruta = Server.MapPath("~") + filep + filen
        'hddDesca.Value = ruta

        'Page.ClientScript.RegisterStartupScript(Page.GetType, "fun1", "javascript:AbrirPDF();", True)
        If My.Computer.FileSystem.FileExists(ruta) Then
            Response.Clear()
            Response.ContentType = "application/txt"
            Response.AddHeader("Content-Disposition", "attachment;filename=" + filen)
            Response.WriteFile(filep + filen)
            Response.End()
            Response.Close()
            Response.Clear()


        Else
            Exit Sub
        End If

    End Sub

End Class

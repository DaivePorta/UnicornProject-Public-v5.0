
Partial Class vistas_NA_NALLRIF
    Inherits Nomade.N.Cub

    Protected Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click

        Dim filep As String
        Dim filen, ruta As String
        filep = "Archivos\"
        filen = "LE" + hddRuc.Value + hddAnio.Value + hddMes.Value + "00120100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
        ruta = Server.MapPath("~") + filep + filen
        hddDesca.Value = ruta

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

    Protected Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        Dim filep As String
        Dim filen, ruta As String
        filep = "Archivos\"
        filen = "LE" + hddRuc.Value + hddAnio.Value + hddMes.Value + "00120100" + "00" + "1" + "1" + "1" + "1" + ".txt"
        ruta = Server.MapPath("~") + filep + filen
        hddDesca.Value = ruta

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

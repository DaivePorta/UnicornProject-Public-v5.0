
Partial Class vistas_NN_NNMLIQB
    Inherits Nomade.N.Cub
    Protected Sub Button1_Click(sender As Object, e As EventArgs) Handles btnliqbe.Click

        Dim filep As String
        Dim filen, ruta As String
        filep = "Archivos\"

        filen = hfarchivo.Value.ToString + ".pdf"
        

        ruta = Server.MapPath("~") + filep + filen


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


Partial Class vistas_NV_NVMDOVR
    Inherits Nomade.N.Cub
    Protected Sub btnPdf_Click(sender As Object, e As EventArgs) Handles btnDescPDF.Click
        Dim filep As String
        Dim filen, ruta As String

        If (Me.CodDoc.Value = "") Then
            Exit Sub
        Else
            filep = "Archivos\"
            filen = Me.CodDoc.Value + ".pdf"

            ruta = Server.MapPath("~") + filep + filen
            Desca.Value = ruta

            If My.Computer.FileSystem.FileExists(ruta) Then
                Response.Clear()
                Response.ContentType = "application/txt"
                Response.AddHeader("Content-Disposition", "attachment;filename=" + filen)
                Response.WriteFile(filep + filen)
                Response.End()
                Response.Close()
                Response.Clear()

            Else
                ScriptManager.RegisterStartupScript(Me.CodDoc, Me.GetType(), "Script", "<script language='javascript'>infoCustom2('El documento no se puede generar.');</script>", False)
                Exit Sub
            End If
        End If
    End Sub
End Class

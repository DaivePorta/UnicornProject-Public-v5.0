
Partial Class vistas_NV_NVLDOCT
    Inherits Nomade.N.Cub
    Protected Sub btnPdf_Click(sender As Object, e As EventArgs) Handles btnLibroPDF.Click
        Dim filep As String
        Dim filen, ruta As String

        If (Me.hddCodDoc.Value = "") Then
            Exit Sub
        Else
            filep = "Archivos\"
            filen = Me.hddCodDoc.Value + ".pdf"

            ruta = Server.MapPath("~") + filep + filen
            hddDesca.Value = ruta

            If My.Computer.FileSystem.FileExists(ruta) Then
                Response.Clear()
                Response.ContentType = "application/txt"
                Response.AddHeader("Content-Disposition", "attachment;filename=" + filen)
                Response.WriteFile(filep + filen)
                Response.End()
                Response.Close()
                Response.Clear()

            Else
                ScriptManager.RegisterStartupScript(Me.hddCodDoc, Me.GetType(), "Script", "<script language='javascript'>infoCustom2('El documento en consulta no se encuentra.');</script>", False)
                Exit Sub
            End If
        End If
    End Sub
End Class

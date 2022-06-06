Partial Class vistas_EF_EFLEDOC
    Inherits Nomade.N.Cub

    Protected Sub btnDescargarXML_Click(sender As Object, e As EventArgs) Handles btnDescargarXML.Click
        'DPORTA 11/03/2022
        Dim filep As String
        Dim filen, ruta, ctlg As String
        Dim rutaServer, rutaServer1, rutaServer2, rutaServer3, rutaServer4, rutaServer5 As String

        ctlg = Me.hddCtlg.Value
        rutaServer1 = ConfigurationManager.AppSettings("path_fac_empresa1").ToString()
        rutaServer2 = ConfigurationManager.AppSettings("path_fac_empresa2").ToString()
        rutaServer3 = ConfigurationManager.AppSettings("path_fac_empresa3").ToString()
        rutaServer4 = ConfigurationManager.AppSettings("path_fac_empresa4").ToString()
        rutaServer5 = ConfigurationManager.AppSettings("path_fac_empresa5").ToString()

        If ctlg = "N" Then
            rutaServer = rutaServer1
        ElseIf ctlg = "O" Then
            rutaServer = rutaServer2
        ElseIf ctlg = "P" Then
            rutaServer = rutaServer3
        ElseIf ctlg = "Q" Then
            rutaServer = rutaServer4
        Else
            rutaServer = rutaServer5
        End If

        If (Me.hddSerie.Value = "" Or Me.hddNumDoc.Value = "" Or Me.hddRuc.Value = "") Then
            Exit Sub
        Else
            'filep = "ArchivosXML\"
            filep = rutaServer + "FIRMA\"
            filen = Me.hddRuc.Value + "-" + Me.hddCodDoc.Value + "-" + Me.hddSerie.Value + "-" + Me.hddNumDoc.Value + ".xml"

            'ruta = Server.MapPath("~") + filep + filen
            ruta = filep + filen
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
                ScriptManager.RegisterStartupScript(Me.hddRuc, Me.GetType(), "Script", "<script language='javascript'>infoCustom2('El documento en consulta aún no se encuentra procesado por SUNAT.');</script>", False)
                'ScriptManager.RegisterStartupScript(Me.hddRuc, Me.GetType(), "Script", "<script language='javascript'> $('#divConfirmacion).modal('hide');;</script>", False)
                Exit Sub
            End If
        End If
    End Sub

    Protected Sub btnDescargarCDR_Click(sender As Object, e As EventArgs) Handles btnDescargarCDR.Click
        'DPORTA 11/03/2022
        Dim filep As String
        Dim filen, ruta, ctlg As String
        Dim rutaServer, rutaServer1, rutaServer2, rutaServer3, rutaServer4, rutaServer5 As String

        ctlg = Me.hddCtlg.Value
        rutaServer1 = ConfigurationManager.AppSettings("path_fac_empresa1").ToString()
        rutaServer2 = ConfigurationManager.AppSettings("path_fac_empresa2").ToString()
        rutaServer3 = ConfigurationManager.AppSettings("path_fac_empresa3").ToString()
        rutaServer4 = ConfigurationManager.AppSettings("path_fac_empresa4").ToString()
        rutaServer5 = ConfigurationManager.AppSettings("path_fac_empresa5").ToString()

        If ctlg = "N" Then
            rutaServer = rutaServer1
        ElseIf ctlg = "O" Then
            rutaServer = rutaServer2
        ElseIf ctlg = "P" Then
            rutaServer = rutaServer3
        ElseIf ctlg = "Q" Then
            rutaServer = rutaServer4
        Else
            rutaServer = rutaServer5
        End If

        If (Me.hddSerie.Value = "" Or Me.hddNumDoc.Value = "" Or Me.hddRuc.Value = "") Then
            Exit Sub
        Else
            'filep = "ArchivosCDR\"
            filep = rutaServer + "RPTA\"
            filen = "R" + Me.hddRuc.Value + "-" + Me.hddCodDoc.Value + "-" + Me.hddSerie.Value + "-" + Me.hddNumDoc.Value + ".zip"

            'ruta = Server.MapPath("~") + filep + filen
            ruta = filep + filen
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
                ScriptManager.RegisterStartupScript(Me.hddRuc, Me.GetType(), "Script", "<script language='javascript'>infoCustom2('El documento en consulta aún no se encuentra procesado por SUNAT.');</script>", False)
                'ScriptManager.RegisterStartupScript(Me.hddRuc, Me.GetType(), "Script", "<script language='javascript'> $('#divConfirmacion).modal('hide');;</script>", False)
                Exit Sub
            End If
        End If
    End Sub

    Protected Sub btnPdf_Click(sender As Object, e As EventArgs) Handles btnLibroPDF.Click
        Dim filep As String
        Dim filen, ruta As String

        If (Me.hddCodVenta.Value = "") Then
            Exit Sub
        Else
            filep = "Archivos\"
            filen = Me.hddCodVenta.Value + ".pdf"

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
                ScriptManager.RegisterStartupScript(Me.hddCodVenta, Me.GetType(), "Script", "<script language='javascript'>infoCustom2('El documento en consulta no se encuentra.');</script>", False)
                Exit Sub
            End If
        End If
    End Sub

End Class
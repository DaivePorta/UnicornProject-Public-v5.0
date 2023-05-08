Imports System.Data
Partial Class vistas_NA_NALGREM
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        'Dim p As New Nomade.NA.NAConfAlmacenes("Bn")
        'Dim dt As New DataTable
        'Dim sb As New StringBuilder()

        'Try
        '    dt = p.fVisuaiizaGR(String.Empty, Nothing, Nothing)
        '    If Not dt Is Nothing Then
        '        sb.Append("[")

        '        For Each row As DataRow In dt.Rows
        '            sb.Append("{")
        '            sb.Append("""NRO_DOC"":""" & row("NRO_DOC").ToString & """,")
        '            sb.Append("""NOMBREDESTINO"":""" & row("NOMBREDESTINO").ToString & """,")
        '            sb.Append("""FECHA"":""" & row("FECHA").ToString & """,")
        '            sb.Append("""MOVIMIENTO"":""" & row("MOVIMIENTO").ToString & """,")
        '            sb.Append("""OPERACION"":""" & row("OPERACION").ToString & """,")
        '            sb.Append("""ALMACEN"":""" & row("ALMACEN").ToString & """,")
        '            sb.Append("""CHOFER"":""" & row("CHOFER").ToString & """,")
        '            sb.Append("""DESPACHA"":""" & row("DESPACHA").ToString & """,")
        '            sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
        '            sb.Append("},")

        '        Next
        '        sb.Append("-")
        '        sb.Replace("},-", "}")

        '        sb.Append("]")
        '    End If

        '    Me.hfObjGR.Value = sb.ToString()
        '    p = Nothing
        'Catch ex As Exception
        '    Response.Write(ex.ToString)
        'End Try
    End Sub
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
    Protected Sub btnXML_Click(sender As Object, e As EventArgs) Handles btnDescXML.Click
        Dim filep As String
        Dim filen, ruta, ruc As String
        Dim rutaServer, rutaServerGR1 As String
        'rutaServer1, rutaServer2, rutaServer3, rutaServer4, rutaServer5, rutaServer6,
        'rutaServer7, rutaServer8, rutaServer9, rutaServer10, rutaServer11, rutaServer12, rutaServer13,
        'rutaServerGR1 As String

        ruc = Me.hddRuc.Value
        'rutaServer1 = ConfigurationManager.AppSettings("path_fac_empresa1").ToString()
        'rutaServer2 = ConfigurationManager.AppSettings("path_fac_empresa2").ToString()
        'rutaServer3 = ConfigurationManager.AppSettings("path_fac_empresa3").ToString()
        'rutaServer4 = ConfigurationManager.AppSettings("path_fac_empresa4").ToString()
        'rutaServer5 = ConfigurationManager.AppSettings("path_fac_empresa5").ToString()
        'rutaServer6 = ConfigurationManager.AppSettings("path_fac_empresa6").ToString()
        'rutaServer7 = ConfigurationManager.AppSettings("path_fac_empresa7").ToString()
        'rutaServer8 = ConfigurationManager.AppSettings("path_fac_empresa8").ToString()
        'rutaServer9 = ConfigurationManager.AppSettings("path_fac_empresa9").ToString()
        'rutaServer10 = ConfigurationManager.AppSettings("path_fac_empresa10").ToString()
        'rutaServer11 = ConfigurationManager.AppSettings("path_fac_empresa11").ToString()
        'rutaServer12 = ConfigurationManager.AppSettings("path_fac_empresa12").ToString()
        'rutaServer13 = ConfigurationManager.AppSettings("path_fac_empresa13").ToString()

        rutaServerGR1 = ConfigurationManager.AppSettings("path_fac_empresa_gr_1").ToString()
        rutaServer = rutaServerGR1

        'If ruc = "20560208295" Then 'Clinica San Isidro 
        '    rutaServer = rutaServer1
        'ElseIf ruc = "20608451146" Then 'Grupo San Isidro
        '    rutaServer = rutaServer2
        'ElseIf ruc = "10179652957" Then 'Comercial Cristhian - Alindor
        '    rutaServer = rutaServer3
        'ElseIf ruc = "10704418014" Then 'Comercial Cristhian Jr
        '    rutaServer = rutaServer4
        'ElseIf ruc = "20601874629" Then 'Ferrosol
        '    rutaServer = rutaServer5
        'ElseIf ruc = "20604664374" Then 'P&D
        '    rutaServer = rutaServer6
        'ElseIf ruc = "20606526904" Then 'Mercadotecnia
        '    rutaServer = rutaServer7
        'ElseIf ruc = "10179384812" Then 'Notaria Guerra Salas
        '    rutaServer = rutaServer8
        'ElseIf ruc = "20606851473" Then 'EyE Tecnologia
        '    rutaServer = rutaServer9
        'ElseIf ruc = "20607881007" Then 'Hogareando
        '    rutaServer = rutaServer10
        'ElseIf ruc = "20559748707" Then 'Ovatec
        '    rutaServer = rutaServer11
        'ElseIf ruc = "20600059760" Then 'System Computer
        '    rutaServer = rutaServer12
        'ElseIf ruc = "20355747191" Then 'Vanes
        '    If Me.hddCodDoc.Value = "09" Then 'Guia de Remisión Electrónica
        '        rutaServer = rutaServerGR1
        '    Else
        '        rutaServer = rutaServer13
        '    End If
        'Else
        '    ScriptManager.RegisterStartupScript(Me.hddRuc, Me.GetType(), "Script", "<script language='javascript'>infoCustom2('El RUC Emisor no es el correcto.');</script>", False)
        '    Exit Sub
        'End If

        If (Me.hddSerie.Value = "" Or Me.hddNumDoc.Value = "" Or Me.hddRuc.Value = "") Then
            Exit Sub
        Else
            filep = "C:\Users\Prospero\Desktop\"
            'filep = rutaServer + "FIRMA\"
            'filep =
            filen = Me.hddRuc.Value + "-" + Me.hddCodDoc.Value + "-" + Me.hddSerie.Value + "-" + Me.hddNumDoc.Value + ".xml"

            'ruta = Server.MapPath("~") + filep + filen
            ruta = filep + filen
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
                ScriptManager.RegisterStartupScript(Me.hddRuc, Me.GetType(), "Script", "<script language='javascript'>infoCustom2('El documento en consulta aún no se encuentra procesado por SUNAT.');</script>", False)
                Exit Sub
            End If
        End If
    End Sub
End Class

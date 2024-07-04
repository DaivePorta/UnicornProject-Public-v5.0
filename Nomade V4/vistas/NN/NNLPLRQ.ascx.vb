
Partial Class vistas_NN_NNLPLRQ
    Inherits Nomade.N.Cub
    Protected Sub btn_xls_Click(sender As Object, e As EventArgs) Handles btn_xls.Click

        Dim nombreArch As String = "PLAME" + hddAnio.Value + hddMes.Value

        HttpContext.Current.Response.Clear()
        HttpContext.Current.Response.AddHeader("Content-type", "")
        HttpContext.Current.Response.AddHeader("Charset", "application/vnd.ms-excel")
        HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=" & nombreArch & ".xls")
        HttpContext.Current.Response.ContentType = "Content-type: application/vnd.ms-excel"
        HttpContext.Current.Response.ContentEncoding = Encoding.Default
        HttpContext.Current.Response.Charset = "UTF-8"
        HttpContext.Current.Response.Write(Me.hddTabla.Value)
        HttpContext.Current.Response.End()
        HttpContext.Current.Response.Flush()
    End Sub

    Protected Sub btnExportarPLAMEPS4_Click(sender As Object, e As EventArgs) Handles btnExportarPS4.Click
        Dim mes = Integer.Parse(hddMes.Value).ToString("00")
        Dim nombreArchPs4 As String = "0601" + hddAnio.Value + mes + hddRUC.Value

        'Separar cadena
        Dim cadenaPS4 As String = Me.hddCadenaPS4.Value
        Dim parts As String() = cadenaPS4.Split("|"c)
        Dim sb As New StringBuilder()
        For i As Integer = 0 To parts.Length - 1
            sb.Append(parts(i))
            If (i + 1) Mod 7 = 0 Then
                sb.Append("|")
                sb.AppendLine()
            ElseIf i < parts.Length - 1 Then
                sb.Append("|")
            End If
        Next

        'Exportar PS4
        HttpContext.Current.Response.Clear()
        HttpContext.Current.Response.ContentType = "text/plain"
        HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=" & nombreArchPs4 & ".ps4")
        HttpContext.Current.Response.ContentEncoding = Encoding.Default
        HttpContext.Current.Response.Charset = "UTF-8"
        HttpContext.Current.Response.Write(sb.ToString())
        HttpContext.Current.Response.End()
        HttpContext.Current.Response.Flush()
    End Sub

    Protected Sub btnExportarPLAME4TA_Click(sender As Object, e As EventArgs) Handles btnExportar4TA.Click
        Dim mes = Integer.Parse(hddMes.Value).ToString("00")
        Dim nombreArch4ta As String = "0601" + hddAnio.Value + mes + hddRUC.Value

        'Separar cadena
        Dim cadena4TA As String = Me.hddCadena4TA.Value
        Dim parts As String() = cadena4TA.Split("|"c)
        Dim sb As New StringBuilder()
        For i As Integer = 0 To parts.Length - 1
            sb.Append(parts(i))
            If (i + 1) Mod 11 = 0 AndAlso i < parts.Length - 1 Then
                sb.Append("|")
                sb.AppendLine()
            ElseIf i < parts.Length - 1 Then
                sb.Append("|")
            End If
        Next

        'Exportar 4TA
        HttpContext.Current.Response.Clear()
        HttpContext.Current.Response.ContentType = "text/plain"
        HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=" & nombreArch4ta & ".4ta")
        HttpContext.Current.Response.ContentEncoding = Encoding.Default
        HttpContext.Current.Response.Charset = "UTF-8"
        HttpContext.Current.Response.Write(sb.ToString())
        HttpContext.Current.Response.End()
        HttpContext.Current.Response.Flush()
    End Sub

End Class

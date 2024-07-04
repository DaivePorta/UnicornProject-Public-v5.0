
Imports System.IO

Partial Class vistas_CP_CPLGAME
    Inherits Nomade.N.Cub

    Dim resb As New StringBuilder

    Dim cpCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
    Dim p_ANIO As String = ""
    Dim p_DESC_EMPRESA As String = ""
    Dim p_CTLG_CODE As String = ""
    Dim p_SCSL_CODE As String = ""
    Dim p_CLASIFICACION As String = ""
    Dim p_DESC_CLASIFICACION As String = ""

    Protected Sub btnPdf_Click(sender As Object, e As EventArgs) Handles btnLibroPDF.Click

        Dim filep As String
        Dim filen, ruta As String
        filep = "Archivos\"
        p_ANIO = Me.hddAnio.Value
        p_DESC_EMPRESA = Me.hddDescEmpresa.Value
        p_DESC_CLASIFICACION = Me.hddDesClasificacion.Value

        filen = "RESUMEN DE GASTOS DE " + p_DESC_EMPRESA.Replace("&amp;", "Y") + " POR " + p_DESC_CLASIFICACION + "_" + p_ANIO + ".pdf"

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
            Exit Sub
        End If

    End Sub

    Protected Sub btnXls_Click(sender As Object, e As EventArgs) Handles btnLibroXls.Click

        p_ANIO = Me.hddAnio.Value
        p_CTLG_CODE = Me.hddCtlg.Value
        p_SCSL_CODE = Me.hddScsl.Value
        p_CLASIFICACION = Me.hddClasificacion.Value
        p_DESC_EMPRESA = Me.hddDescEmpresa.Value
        p_DESC_CLASIFICACION = Me.hddDesClasificacion.Value

        If p_SCSL_CODE = "TODOS" Then
            p_SCSL_CODE = ""
        End If

        Dim dt As New System.Data.DataTable
        dt = cpCuentaPorPagar.ListarRegistroResumenGastos(p_CTLG_CODE, p_SCSL_CODE, p_CLASIFICACION, p_ANIO)
        resb = GenerarTablaResumenGastos(dt)

        Dim nombreArch As String

        nombreArch = "RESUMEN DE GASTOS DE " + p_DESC_EMPRESA.Replace("&amp;", "Y") + " POR " + p_DESC_CLASIFICACION + "_" + p_ANIO + ""

        HttpContext.Current.Response.Clear()
        HttpContext.Current.Response.AddHeader("Content-type", "")
        HttpContext.Current.Response.AddHeader("Charset", "application/vnd.ms-excel")
        HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=" & nombreArch & ".xls")
        HttpContext.Current.Response.ContentType = "Content-type: application/vnd.ms-excel"
        HttpContext.Current.Response.ContentEncoding = Encoding.Default
        HttpContext.Current.Response.Charset = "UTF-8"
        HttpContext.Current.Response.Write(resb)
        HttpContext.Current.Response.End()
        HttpContext.Current.Response.Flush()

    End Sub

    Public Function GenerarTablaResumenGastos(ByVal dt As System.Data.DataTable) As StringBuilder
        Dim total As Decimal = 0
        Dim res = ""
        resb.Clear()
        '------

        resb.AppendFormat("<table id=""tblRegistroGastos"" border=""1"" style=""max-width:3000px;width:2570px;"" width:""2570px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        If p_DESC_CLASIFICACION = "CONCEPTO" Then
            resb.AppendFormat("<th rowspan='1' style='width:50px;'>CONCEPTO</th>")
        ElseIf p_DESC_CLASIFICACION = "SUB CONCEPTO" Then
            resb.AppendFormat("<th rowspan='1' style='width:50px;'>SUB CONCEPTO</th>")
        Else
            resb.AppendFormat("<th rowspan='1' style='width:50px;'>CENTRO DE COSTOS</th>")
        End If
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>ENERO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>FEBRERO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>MARZO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>ABRIL</th>")
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>MAYO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>JUNIO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>JULIO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>AGOSTO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>SETIEMBRE</th>")
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>OCTUBRE</th>")
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>NOVIEMBRE</th>")
        resb.AppendFormat("<th rowspan='1' style='width:50px;'>DICIEMBRE</th>")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody >")


        Dim nroCorrelativo As Integer = 0
        Dim totalEnero As Decimal = 0.0
        Dim totalFebrero As Decimal = 0.0
        Dim totalMarzo As Decimal = 0.0
        Dim totalAbril As Decimal = 0.0
        Dim totalMayo As Decimal = 0.0
        Dim totalJunio As Decimal = 0.0
        Dim totalJulio As Decimal = 0.0
        Dim totalAgosto As Decimal = 0.0
        Dim totalSetiembre As Decimal = 0.0
        Dim totalOctubre As Decimal = 0.0
        Dim totalNoviembre As Decimal = 0.0
        Dim totalDiciembre As Decimal = 0.0

        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                nroCorrelativo += 1

                resb.AppendFormat("<tr style='font-size:9px;'>")
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESCRIPCION").ToString()) '1
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("ENERO").ToString()).ToString("N2")) '2
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("FEBRERO").ToString()).ToString("N2")) '3
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("MARZO").ToString()).ToString("N2")) '4             
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("ABRIL").ToString()).ToString("N2")) '5
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("MAYO").ToString()).ToString("N2")) '6
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("JUNIO").ToString()).ToString("N2")) '7
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("JULIO").ToString()).ToString("N2")) '8   
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("AGOSTO").ToString()).ToString("N2")) '9
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("SETIEMBRE").ToString()).ToString("N2")) '10
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("OCTUBRE").ToString()).ToString("N2")) '11
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("NOVIEMBRE").ToString()).ToString("N2")) '12   
                resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("DICIEMBRE").ToString()).ToString("N2")) '13
                resb.AppendFormat("</tr>")

                totalEnero += Decimal.Parse(dt.Rows(i)("ENERO").ToString())
                totalFebrero += Decimal.Parse(dt.Rows(i)("FEBRERO").ToString())
                totalMarzo += Decimal.Parse(dt.Rows(i)("MARZO").ToString())
                totalAbril += Decimal.Parse(dt.Rows(i)("ABRIL").ToString())
                totalMayo += Decimal.Parse(dt.Rows(i)("MAYO").ToString())
                totalJunio += Decimal.Parse(dt.Rows(i)("JUNIO").ToString())
                totalJulio += Decimal.Parse(dt.Rows(i)("JULIO").ToString())
                totalAgosto += Decimal.Parse(dt.Rows(i)("AGOSTO").ToString())
                totalSetiembre += Decimal.Parse(dt.Rows(i)("SETIEMBRE").ToString())
                totalOctubre += Decimal.Parse(dt.Rows(i)("OCTUBRE").ToString())
                totalNoviembre += Decimal.Parse(dt.Rows(i)("NOVIEMBRE").ToString())
                totalDiciembre += Decimal.Parse(dt.Rows(i)("DICIEMBRE").ToString())

            Next
            'Fila de totales          
            resb.AppendFormat("<tr style='font-size:9px;font-weight:800'>")
            resb.AppendFormat("<td colspan='1' align='center' >TOTALES</td>")
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalEnero.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalFebrero.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalMarzo.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalAbril.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalMayo.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalJunio.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalJulio.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalAgosto.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalSetiembre.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalOctubre.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalNoviembre.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalDiciembre.ToString("N2"))

            resb.AppendFormat("</tr>")
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='34' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        res = resb.ToString()
        'Return res
        Return resb
    End Function
End Class

Partial Class vistas_CP_CPLGACC
    Inherits Nomade.N.Cub

    Dim resb As New StringBuilder

    Dim cpCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
    Dim p_ANIO As String = ""
    Dim p_DESC_EMPRESA As String = ""
    Dim p_CTLG_CODE As String = ""
    Dim p_SCSL_CODE As String = ""
    Dim p_NIVEL As String = ""
    Dim p_CCOSTOS As String = ""
    Dim p_DESC_CCOSTOS As String = ""

    Protected Sub btnPdf_Click(sender As Object, e As EventArgs) Handles btnLibroPDF.Click

        Dim filep As String
        Dim filen, ruta As String
        filep = "Archivos\"
        p_ANIO = Me.hddAnio.Value
        p_DESC_EMPRESA = Me.hddDescEmpresa.Value
        p_DESC_CCOSTOS = Me.hddDesCCostos.Value

        filen = "DESTINO GASTOS POR CC " + p_DESC_CCOSTOS.Replace(":", "") + " DE " + p_DESC_EMPRESA.Replace("&amp;", "Y") + "_" + p_ANIO + ".pdf"

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
        p_DESC_EMPRESA = Me.hddDescEmpresa.Value
        p_NIVEL = Me.hddNivel.Value
        p_CCOSTOS = Me.hddCCostos.Value
        p_DESC_CCOSTOS = Me.hddDesCCostos.Value

        If p_SCSL_CODE = "TODOS" Then
            p_SCSL_CODE = ""
        End If

        Dim dt As New System.Data.DataTable
        dt = cpCuentaPorPagar.ListarRegistroGastosXCentroCostos(p_CTLG_CODE, p_SCSL_CODE, p_ANIO, p_NIVEL, p_CCOSTOS)
        resb = GenerarTablaGastosXCentroCostos(dt)

        Dim nombreArch As String

        nombreArch = "DESTINO GASTOS POR CC " + p_DESC_CCOSTOS.Replace(":", "") + " DE " + p_DESC_EMPRESA.Replace("&amp;", "Y") + "_" + p_ANIO + ""

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

    Public Function GenerarTablaGastosXCentroCostos(ByVal dt As System.Data.DataTable) As StringBuilder
        Dim total As Decimal = 0
        Dim res = ""
        resb.Clear()
        '------

        resb.AppendFormat("<table id=""tblRegistroGastos"" border=""1"" style=""max-width:3000px;width:2570px;"" width:""2570px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'></th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>ENERO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>FEBRERO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>MARZO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>ABRIL</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>MAYO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>JUNIO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>JULIO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>AGOSTO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>SETIEMBRE</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>OCTUBRE</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>NOVIEMBRE</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>DICIEMBRE</th>")
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
                If dt.Rows(i)("REGISTRO").ToString() = "CONCEPTO" Then
                    resb.AppendFormat("<td align='left'  bgcolor='#D8D8D8'>{0}</td>", dt.Rows(i)("DESCRIPCION").ToString()) '1
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("ENERO").ToString()).ToString("N2")) '2
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("FEBRERO").ToString()).ToString("N2")) '3
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("MARZO").ToString()).ToString("N2")) '4             
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("ABRIL").ToString()).ToString("N2")) '5
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("MAYO").ToString()).ToString("N2")) '6
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("JUNIO").ToString()).ToString("N2")) '7
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("JULIO").ToString()).ToString("N2")) '8   
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("AGOSTO").ToString()).ToString("N2")) '9
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("SETIEMBRE").ToString()).ToString("N2")) '10
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("OCTUBRE").ToString()).ToString("N2")) '11
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("NOVIEMBRE").ToString()).ToString("N2")) '12   
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("DICIEMBRE").ToString()).ToString("N2")) '13
                Else
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
                End If


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

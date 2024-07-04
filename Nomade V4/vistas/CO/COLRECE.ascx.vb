
Partial Class vistas_CO_COLRECE
    Inherits Nomade.N.Cub

    Dim resb As New StringBuilder

    Dim coRegistroVentas As New Nomade.CO.CORegistroCompras("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim p_CTLG_CODE As String = ""
    Dim p_MES As String = ""
    Dim p_MES_DES As String = ""
    Dim p_ANIO As String = ""
    Dim p_RUC As String = ""
    Dim p_DESC_EMPRESA As String = ""

    Protected Sub btnPdf_Click(sender As Object, e As EventArgs) Handles btnLibroPDF.Click

        Dim filep As String
        Dim filen, ruta As String
        filep = "Archivos\"
        p_MES = Me.hddMes.Value
        p_ANIO = Me.hddAnio.Value
        p_RUC = Me.hddRuc.Value

        If hfind_vacio.Value = "N" Then
            filen = "LE" + p_RUC + p_ANIO + p_MES + "00080400" + "02" + "1" + "1" + "1" + "2" + ".pdf"
        Else
            filen = "LE" + p_RUC + p_ANIO + p_MES + "00080400" + "02" + "1" + "0" + "1" + "2" + ".pdf"
        End If

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

    Protected Sub btnTxt_Click(sender As Object, e As EventArgs) Handles btnLibroTXT.Click
        Dim filep As String
        Dim filen, ruta As String
        filep = "Archivos\"
        p_MES = Me.hddMes.Value
        p_ANIO = Me.hddAnio.Value
        p_RUC = Me.hddRuc.Value

        If hfind_vacio.Value = "N" Then
            filen = "LE" + p_RUC + p_ANIO + p_MES + "00080400" + "02" + "1" + "1" + "1" + "2" + ".txt"
        Else
            filen = "LE" + p_RUC + p_ANIO + p_MES + "00080400" + "02" + "1" + "0" + "1" + "2" + ".txt"
        End If

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
        p_MES = Me.hddMes.Value
        p_MES_DES = Me.hddDescMes.Value
        p_CTLG_CODE = Me.hddCtlg.Value
        p_RUC = Me.hddRuc.Value
        p_DESC_EMPRESA = Me.hddDescEmpresa.Value

        Dim dt As New System.Data.DataTable
        dt = coRegistroVentas.ListarRegistroVentas_sire(p_ANIO, p_MES, p_CTLG_CODE, "", p_RUC, p_DESC_EMPRESA)
        resb = GenerarTablaRegistroVentas(dt)

        Dim nombreArch As String
        If hfind_vacio.Value = "N" Then
            nombreArch = "LE" + p_RUC + p_ANIO + p_MES + "00080400" + "02" + "1" + "1" + "1" + "2" + ""
        Else
            nombreArch = "LE" + p_RUC + p_ANIO + p_MES + "00080400" + "02" + "1" + "0" + "1" + "2" + ""
        End If

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

    Public Function GenerarTablaRegistroVentas(ByVal dt As System.Data.DataTable) As StringBuilder
        Dim total As Decimal = 0
        Dim res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PERIODO:")
        resb.AppendFormat("<td width='75%'  style=""mso-number-format:'\@'"">{0} {1}</td>", p_MES_DES, p_ANIO)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "RUC:")
        resb.AppendFormat("<td id='ruc' width='75%'>{0}</td>", p_RUC)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZÓN SOCIAL:")
        resb.AppendFormat("<td width='75%'>{0}</td>", p_DESC_EMPRESA)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        resb.AppendFormat("<br/>")

        resb.AppendFormat("<table id=""tblRegistroVentas"" border=""1"" style=""max-width:3000px;width:2570px;"" width:""2570px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>RUC</th>")
        resb.AppendFormat("<th rowspan='1' style='width:500px;'>RAZÓN SOCIAL</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>PERIODO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>CAR SUNAT</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>FECHA DE EMISIÓN</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>FECHA VCTO / PAGO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO CP / DOC.</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>SERIE DEL CDP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>AÑO DUA o DSI</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO CP O DOC. NRO INICIAL (RANGO)</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO FINAL (RANGO)</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO DOC IDENTIDAD</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO DOC IDENTIDAD</th>")
        resb.AppendFormat("<th rowspan='1' style='width:200px;'>APELLIDOS NOMBRES / RAZÓN SOCIAL</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>BASE IMPONIBLE DESTINO GRAVADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>IGV / IPM DG</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>BI GRAVADO Y NO GRAVADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>IGV / IPM DG Y NG</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>BI DESTINO NO GRAVADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>IGV / IPM DNG</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>VALOR ADQ. NG</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>ISC</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>ICBPER</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>OTROS TRIBUTOS / CARGOS</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TOTAL CP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>MONEDA</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO CAMBIO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>FECHA EMISIÓN DOC MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO CP MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>SERIE CP MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>COD. DAM O DSI</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO CP MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>CLASIF DE BSS Y SSS</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>ID PROYECTO OPERADORES</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>PORCPART</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>IMB</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>CAR ORIG / IND E o I</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>DETRACCIÓN</th>")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody >")


        Dim nroCorrelativo As Integer = 0
        Dim totalValorExportacion As Decimal = 0.0
        Dim totalBaseImponible As Decimal = 0.0
        Dim totalImportExone As Decimal = 0.0
        Dim totalImporteInafe As Decimal = 0.0
        Dim totalISC As Decimal = 0.0
        Dim totalIGV As Decimal = 0.0
        Dim totalTributos As Decimal = 0.0
        Dim totalImporte As Decimal = 0.0
        'nuevos
        Dim totalDescuentoBaseImp As Decimal = 0.0
        Dim totalDescuentoIgv As Decimal = 0.0
        Dim totalBaseImpArroz As Decimal = 0.0
        Dim totalImpuestoArroz As Decimal = 0.0

        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                nroCorrelativo += 1

                resb.AppendFormat("<tr style='font-size:9px;'>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RUC_EMISOR").ToString()) '1
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NOMBRE_EMISOR").ToString()) '2
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PERIODO").ToString()) '3
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CAR").ToString()) '4             
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("EMISION").ToString()) '5
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("VENCIMIENTO").ToString()) '6
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_SUNAT").ToString()) '7
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE").ToString()) '8   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ANIO").ToString()) '9
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUMERO").ToString()) '10
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_FINAL").ToString()) '11
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_PROV").ToString()) '12   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_DCTO_PROV").ToString()) '13
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString()) '14
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("BASE_IMPONIBLE").ToString()) '15
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IGV").ToString()) '16   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("BI_GRAVADO_DGNG").ToString()) '17
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IGV_DGNG").ToString()) '18
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("BI_GRAVADO_DNG").ToString()) '19
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IGV_DNG").ToString()) '20 
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("VALOR_ADQ_NG").ToString()) '21
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ISC").ToString()) '22
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ICBPER").ToString()) '23
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO_OTRTRI").ToString()) '24   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IMPORTE").ToString()) '25
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA").ToString()) '26
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("MONEDA") = "PEN", "", dt.Rows(i)("TIPO_CAMBIO").ToString())) '27
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_EMISION_DOC_MODIFICADO").ToString()) '28  
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_CP_MODIFICADO").ToString()) '29
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE_CP_MODIFICADO").ToString()) '30
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("COD_DAM_O_DSI").ToString()) '31
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_CP_MODIFICADO").ToString()) '32  
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CLASIF_BSS_Y_SSS").ToString()) '33
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ID_PROYECTO_OPERADORES").ToString()) '34
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PORC_PART").ToString()) '35
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IMB").ToString()) '36
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CAR_ORIG_IND").ToString()) '37
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DETRACCION_IND").ToString()) '38
            Next
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

Partial Class vistas_CO_COLRVIE
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
            filen = "LE" + p_RUC + p_ANIO + p_MES + "00140400" + "02" + "1" + "1" + "1" + "2" + ".pdf"
        Else
            filen = "LE" + p_RUC + p_ANIO + p_MES + "00140400" + "02" + "1" + "0" + "1" + "2" + ".pdf"
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
            filen = "LE" + p_RUC + p_ANIO + p_MES + "00140400" + "02" + "1" + "1" + "1" + "2" + ".txt"
        Else
            filen = "LE" + p_RUC + p_ANIO + p_MES + "00140400" + "02" + "1" + "0" + "1" + "2" + ".txt"
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
            nombreArch = "LE" + p_RUC + p_ANIO + p_MES + "00140400" + "02" + "1" + "1" + "1" + "2" + ""
        Else
            nombreArch = "LE" + p_RUC + p_ANIO + p_MES + "00140400" + "02" + "1" + "0" + "1" + "2" + ""
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
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO CP O DOC. NRO INICIAL (RANGO)</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO FINAL (RANGO)</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO DOC IDENTIDAD</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO DOC IDENTIDAD</th>")
        resb.AppendFormat("<th rowspan='1' style='width:200px;'>APELLIDOS NOMBRES / RAZÓN SOCIAL</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>VALOR FACTURADO EXPORTACIÓN</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>BI GRAVADA</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>DSCTO BI</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>IGV / IPM</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>DSCTO IGV / IPM</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>MTO EXONERADP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>MTO INAFECTO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>ISC</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>BI GRAV IVAP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>IVAP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>ICBPER</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>OTROS TRIBUTOS</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TOTAL CP</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>MONEDA</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO CAMBIO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>FECHA EMISIÓN DOC MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO CP MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>SERIE CP MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>NRO CP MODIFICADO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:85px;'>ID PROYECTO OPERADORES ATRIBUCIÓN</th>")
        'resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO DE NOTA</th>")
        'resb.AppendFormat("<th rowspan='1' style='width:85px;'>EST. COMP</th>")
        'resb.AppendFormat("<th rowspan='1' style='width:85px;'>VALOR FOB EMBARCADO</th>")
        'resb.AppendFormat("<th rowspan='1' style='width:85px;'>VALOR OP GRATUITAS</th>")
        'resb.AppendFormat("<th rowspan='1' style='width:85px;'>TIPO OPERACIÓN</th>")
        'resb.AppendFormat("<th rowspan='1' style='width:85px;'>DAM / CP</th>")
        'resb.AppendFormat("<th rowspan='1' style='width:85px;'>CLU</th>")
        'resb.AppendFormat("<th rowspan='1' style='width:85px;'>USO INTERNO SUNAT</th>")
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
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUMERO").ToString()) '9
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_FINAL").ToString()) '10
                If dt.Rows(i)("TIPO_DCTO_CLIE").ToString() = 0 And dt.Rows(i)("NRO_DCTO_CLIE").ToString() = "99999999" And Decimal.Parse(dt.Rows(i)("IMPORTE").ToString()) < 700 Then
                    resb.AppendFormat("<td align='center' >{0}</td>", "") '11
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_CLIE").ToString()) '11
                End If
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_DCTO_CLIE").ToString()) '12   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString()) '13
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("VALOR_EXPORTACION").ToString()) '14
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("BASE_IMPONIBLE").ToString()) '15
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DSCTO_BASE_IMPONIBLE").ToString()) '16   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IGV").ToString()) '17
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DSCTO_IGV").ToString()) '18
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IMPORTE_EXONERADA").ToString()) '19
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IMPORTE_INAFECTA").ToString()) '20 
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ISC").ToString()) '21
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("BASE_IMPONIBLE_IVAP").ToString()) '22
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IMPUESTO_IVAP").ToString()) '23
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ICBPER").ToString()) '24   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("OTROS_TRIBUTOS").ToString()) '25
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("IMPORTE").ToString()) '26
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA").ToString()) '27
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_CAMBIO").ToString()) '28  
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_EMISION_DOC_MODIFICADO").ToString()) '29
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_CP_MODIFICADO").ToString()) '30
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE_CP_MODIFICADO").ToString()) '31
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_CP_MODIFICADO").ToString()) '32  
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ID_PROYECTO_OPERADORES").ToString()) '33

                'resb.AppendFormat("<td align='center' >{0}</td>", "") '34
                'resb.AppendFormat("<td align='center' >{0}</td>", "1") '35
                'resb.AppendFormat("<td align='center' >{0}</td>", "0") '36   
                'resb.AppendFormat("<td align='center' >{0}</td>", "0") '37
                'resb.AppendFormat("<td align='center' >{0}</td>", "101") '38
                'resb.AppendFormat("<td align='center' >{0}</td>", "") '39   
                'resb.AppendFormat("<td align='center' >{0}</td>", "") '40  
                'resb.AppendFormat("<td align='center' >{0}</td>", "") '41  
                resb.AppendFormat("</tr>")
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

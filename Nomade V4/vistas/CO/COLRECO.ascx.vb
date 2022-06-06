Imports Microsoft.Office.Interop.Excel

Partial Class vistas_CO_COLRECO
    Inherits Nomade.N.Cub

    Dim resb As New StringBuilder

    Dim coRegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim p_CTLG_CODE As String = ""
    Dim p_MES As String = ""
    Dim p_MES_DES As String = ""
    Dim p_ANIO As String = ""



    Protected Sub btnPdf_Click(sender As Object, e As EventArgs) Handles btnLibroPDF.Click

        Dim filep As String
        Dim filen, ruta As String
        filep = "Archivos\"
        p_MES = Me.hddMes.Value

        If hfind_vacio.Value = "N" Then
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00080100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00120100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
        Else
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00080100" + "00" + "1" + "0" + "1" + "1" + ".pdf"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00120100" + "00" + "1" + "0" + "1" + "1" + ".pdf"
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

        If hfind_vacio.Value = "N" Then
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00080100" + "00" + "1" + "1" + "1" + "1" + ".txt"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00080100" + "00" + "1" + "1" + "1" + "1" + ".txt"
        Else
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00080100" + "00" + "1" + "0" + "1" + "1" + ".txt"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00080100" + "00" + "1" + "0" + "1" + "1" + ".txt"
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

        Dim dt As New System.Data.DataTable
        dt = coRegistroCompras.ListarRegistroCompras_Libro8(p_ANIO, p_MES, p_CTLG_CODE, "")
        resb = GenerarTablaRegistroCompras(dt)

        Dim nombreArch As String = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00080100" + "00" + "1" + "0" + "1" + "1" + ""

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

    Public Function GenerarTablaRegistroCompras(ByVal dt As System.Data.DataTable) As StringBuilder

        Dim total As Decimal = 0
        Dim res = ""
        resb.Clear()
        '------

        Dim dtEmpresa As New System.Data.DataTable
        dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PERIODO:")
        resb.AppendFormat("<td width='75%'>{0} {1}</td>", p_MES_DES, p_ANIO)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "RUC:")
        resb.AppendFormat("<td id='ruc' width='75%'>{0}</td>", dtEmpresa.Rows(0)("RUC").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZÓN SOCIAL:")
        resb.AppendFormat("<td width='75%'>{0}</td>", dtEmpresa.Rows(0)("DESCRIPCION").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        resb.AppendFormat("<br/>")

        resb.AppendFormat("<table id=""tblRegistroCompras"" border=""1"" style=""max-width:3000px;width:2570px;"" width:""2570px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>PERIODO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>CÓDIGO ÚNICO DE LA OPERACIÓN (CUO)</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>NÚMERO CORRELATIVO DEL ASIENTO CONTABLE</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>FECHA DE EMISIÓN DEL COMPROBANTE DE PAGO O DOCUMENTO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>FECHA DE VENCIMIENTO O FECHA DE PAGO(1)</th>")
        resb.AppendFormat("<th colspan='3' rowspan='2' style='width:60px;'>COMPROBANTE DE PAGO O DOCUMENTO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:80px;' >N° DEL COMPROBANTE DE PAGO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>N° FINAL</th>") '**        
        resb.AppendFormat("<th colspan='3'>INFORMACIÓN DEL PROVEEDOR</th>")
        resb.AppendFormat("<th colspan='2' rowspan='2' style='width:85px;'>ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES GRAVADAS Y/O DE EXPORTACIÓN</th>")
        resb.AppendFormat("<th colspan='2' rowspan='2' style='width:85px;'>ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES GRAVADAS Y/O DE EXPORTACIÓN Y A OPERACIONES NO GRAVADAS</th>")
        resb.AppendFormat("<th colspan='2' rowspan='2' style='width:85px;'>ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES NO GRAVADAS</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>VALOR DE LAS ADQUISICIONES NO GRAVADAS</th>")
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>OTROS TRIBUTOS Y CARGOS</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>ISC</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:60px;'>OTROS TRIBUTOS Y CARGOS</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>IMPORTE TOTAL</th>")
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>MONEDA</th>") '**        
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>TIPO DE CAMBIO</th>")
        resb.AppendFormat("<th colspan='5' rowspan='2' style='width:60px;'>REFERENCIA DEL COMPROBANTE DE PAGO O DOCUMENTO ORIGINAL QUE SE MODIFICA</th>")
        resb.AppendFormat("<th colspan='2' rowspan='2' style='width:85px;'>CONSTANCIA DE DEPÓSITO DE DETRACCIÓN (3)</th>")
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>MARCA DEL COMPROBANTE DE PAGO SUJETO A RETENCIÓN</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>CLASIFICACIÓN DE LOS BIENES Y SERVICIOS ADQUIRIDOS (TABLA 30)</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>CONTRATO DE COLABORACIÓN EMPRESARIAL</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>ERROR TIPO 1: INCONSISTENCIA EN EL TIPO DE CAMBIO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>ERROR TIPO 2: INCONSISTENCIA POR PROVEEDORES NO HABIDOS</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>ERROR TIPO 3: INCONSISTENCIA POR PROVEEDORES RENUNCIANTES A LA EXONERACIÓN DEL IGV</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>ERROR TIPO 4: INCONSISTENCIA POR DNIs</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>INDICADOR DE COMPROBANTES DE PAGO CANCELADOS CON MEDIOS DE PAGO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>ESTADO QUE IDENTIFICA LA OPORTUNIDAD DE LA ANOTACIÓN O INDICACIÓN SI ÉSTA CORRESPONDE A UN AJUSTE</th>") '**

        resb.AppendFormat("</tr>")
        'Fila 2 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th colspan='2' style='width:60px;'>DOCUMENTO DE IDENTIDAD</th>")
        resb.AppendFormat("<th rowspan='2' style='width:200px;'>APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZÓN SOCIAL</th>")
        resb.AppendFormat("</tr>")
        'Fila 3 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 10)</th>")
        resb.AppendFormat("<th style='width:60px;'>SERIE DEPENDENCIA ADUANERA (TABLA 11)</th>")
        resb.AppendFormat("<th style='width:60px;'>AÑO DE EMISIÓN DE LA DUA O DSI</th>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 2)</th>")
        resb.AppendFormat("<th style='width:60px;'>NÚMERO</th>")
        resb.AppendFormat("<th style='width:55px; word-wrap:break-word;'>BASE IMPONIBLE</th>")
        resb.AppendFormat("<th style='width:55px;'>IGV</th>")
        resb.AppendFormat("<th style='width:55px;'>BASE IMPONIBLE</th>")
        resb.AppendFormat("<th style='width:55px;'>IGV</th>")
        resb.AppendFormat("<th style='width:55px;'>BASE IMPONIBLE</th>")
        resb.AppendFormat("<th style='width:55px;'>IGV</th>")

        resb.AppendFormat("<th style='width:85px;'>FECHA DE EMISIÓN</th>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 10)</th>")
        resb.AppendFormat("<th style='width:60px;'>SERIE</th>")
        resb.AppendFormat("<th style='width:60px;'>DEPENDENCIA ADUANERA</th>") '**        
        resb.AppendFormat("<th style='width:55px;'>NÚMERO</th>")

        resb.AppendFormat("<th style='width:85px;'>FECHA</th>")
        resb.AppendFormat("<th style='width:60px;'>N° DEL COMPROBANTE</th>")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody >")

        Dim tipoAdquisicion As String = ""
        Dim nroCorrelativo As Integer = 0
        Dim totalBaseImponible1 As Decimal = 0
        Dim totalBaseImponible2 As Decimal = 0
        Dim totalBaseImponible3 As Decimal = 0
        Dim totalIGV1 As Decimal = 0
        Dim totalIGV2 As Decimal = 0
        Dim totalIGV3 As Decimal = 0
        Dim totalValorNoGravadas As Decimal = 0
        Dim totalValorOtrosTributos As Decimal = 0
        Dim totalISC As Decimal = 0
        Dim totalTributos As Decimal = 0
        Dim totalImporte As Decimal = 0
        If Not dt Is Nothing Then
            Dim editar As String = "Editar"
            For i As Integer = 0 To dt.Rows.Count - 1
                nroCorrelativo += 1
                tipoAdquisicion = dt.Rows(i)("OPERACION").ToString()
                resb.AppendFormat("<tr style='font-size:9px;'>")
                'PERIODO , CUO, CORRELATIVO ASIENTO CONTABLE
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PERIODO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CUO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CAC").ToString()) '**
                'FECHA DE EMISIÓN DEL COMPROBANTE DE PAGO O DOCUMENTO,	FECHA DE VENCIMIENTO O FECHA DE PAGO(1)      
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)))
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("VENCIMIENTO").ToString() = "", "", dt.Rows(i)("VENCIMIENTO").ToString().Substring(0, 10)))
                'COMPROBANTE DE PAGO O DOCUMENTO
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_SUNAT").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", "") 'TO DO
                'N° DEL COMPROBANTE DE PAGO
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUMERO").ToString())
                'N° FINAL
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_FINAL").ToString()) '**
                'INFORMACIÓN DEL PROVEEDOR
                If (dt.Rows(i)("DNI").ToString() = "" Or dt.Rows(i)("RUC").ToString() <> "") Then 'TO DO: VALIDAR CORRECTAMENTE
                    resb.AppendFormat("<td align='center' >{0}</td>", "06")
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RUC").ToString())
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", "01")
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DNI").ToString())
                End If
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                'Adquisiones
                If (tipoAdquisicion = "S") Then
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("MONTO_DSTGRA").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTGRA").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IGV_DSTGRA").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTGRA").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("MONTO_DSTMIX").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTMIX").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IGV_DSTMIX").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTMIX").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("MONTO_DSTNGR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_DSTNGR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IGV_DSTNGR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV_DSTNGR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("MONTO_ORGNGR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_ORGNGR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("MONTO_OTRTRI").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_OTRTRI").ToString()))))
                    totalBaseImponible1 += Decimal.Parse(dt.Rows(i)("MONTO_DSTGRA").ToString())
                    totalIGV1 += Decimal.Parse(dt.Rows(i)("IGV_DSTGRA").ToString())
                    totalBaseImponible2 += Decimal.Parse(dt.Rows(i)("MONTO_DSTMIX").ToString())
                    totalIGV2 += Decimal.Parse(dt.Rows(i)("IGV_DSTMIX").ToString())
                    totalBaseImponible3 += Decimal.Parse(dt.Rows(i)("MONTO_DSTNGR").ToString())
                    totalIGV3 += Decimal.Parse(dt.Rows(i)("IGV_DSTNGR").ToString())
                    totalValorNoGravadas += Decimal.Parse(dt.Rows(i)("MONTO_ORGNGR").ToString())
                    totalValorOtrosTributos += Decimal.Parse(dt.Rows(i)("MONTO_OTRTRI").ToString())
                ElseIf (tipoAdquisicion = "DSTGRA") Then
                    ' ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES GRAVADAS Y/O DE EXPORTACIÓN                    
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString())))
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    'Suma para el total
                    totalBaseImponible1 += Decimal.Parse(dt.Rows(i)("VALOR").ToString())
                    totalIGV1 += Decimal.Parse(dt.Rows(i)("IGV").ToString())
                ElseIf (tipoAdquisicion = "DSTMIX") Then
                    ' ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES GRAVADAS Y/O DE EXPORTACIÓN Y A OPERACIONES NO GRAVADAS
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString())))
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    '--Suma para el total
                    totalBaseImponible2 += Decimal.Parse(dt.Rows(i)("VALOR").ToString())
                    totalIGV2 += Decimal.Parse(dt.Rows(i)("IGV").ToString())
                ElseIf (tipoAdquisicion = "DSTNGR") Then
                    ' ADQUISICIONES GRAVADAS DESTINADAS A OPERACIONES NO GRAVADAS
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString())))
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    '--Suma para el total
                    totalBaseImponible3 += Decimal.Parse(dt.Rows(i)("VALOR").ToString())
                    totalIGV3 += Decimal.Parse(dt.Rows(i)("IGV").ToString())
                ElseIf (tipoAdquisicion = "ORGNGR") Then
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString()))))
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    '--Suma para el total
                    totalValorNoGravadas += Decimal.Parse(dt.Rows(i)("VALOR").ToString())
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", " ")
                    resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR").ToString()))))
                    '--Suma para el total
                    totalValorOtrosTributos += Decimal.Parse(dt.Rows(i)("VALOR").ToString())
                End If
                'ISC,OTROS TRIBUTOS Y CARGOS, IMPORTE TOTAL, nro comprobante emitido                
                If Decimal.Parse(dt.Rows(i)("ISC").ToString()) = 0 Then
                    resb.AppendFormat("<td align='center' >{0}</td>", "")
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("ISC").ToString())))
                End If
                'resb.AppendFormat("<td align='center' >{0}</td>", "") 'OTROS TRIBUTOS Y CARGOS
                resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE").ToString())))
                'CODIGO MONEDA
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA").ToString()) '**                
                'TIPO DE CAMBIO
                If Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString()) = 0 Then
                    resb.AppendFormat("<td align='center' >{0}</td>", " ") '
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", String.Format("{0:#0.000}", Decimal.Parse(dt.Rows(i)("VALOR_CAMBIO").ToString()))) '
                End If
                'REFERENCIA DEL COMPROBANTE DE PAGO O DOCUMENTO ORIGINAL QUE SE MODIFICA
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("FECHA_EMISION_ORIGEN").ToString() = "", "", dt.Rows(i)("FECHA_EMISION_ORIGEN").ToString().Substring(0, 10)))
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_SUNAT_ORIGEN").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE_ORIGEN").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DEPENDENCIA_ADUANERA").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUMERO_ORIGEN").ToString())

                'CONSTANCIA DE DEP
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("FECHA_EMISION_DETRAC").ToString() = "", "", dt.Rows(i)("FECHA_EMISION_DETRAC").ToString().Substring(0, 10)))
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NUM_DEP_DETRAC").ToString())
                '

                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MARCA_RETENCION").ToString()) '**                
                'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CLASIFICACION").ToString()) '**    
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CLASIFICACION").ToString()) '**   
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CONTRATO").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INC_TIPO_CAMBIO").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INC_PROV_NOHABIDO").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INC_PROV_RENUNCIANTE").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INC_DNI").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INDICADOR_COMPROBANTE").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO_AJUSTE").ToString()) '**                

                resb.AppendFormat("</tr>")
                '---Suma de totales
                totalISC += Decimal.Parse(dt.Rows(i)("ISC").ToString())
                'totalTributos += 0
                totalImporte += Decimal.Parse(dt.Rows(i)("IMPORTE").ToString())

            Next

            'Fila de totales          
            resb.AppendFormat("<tr style='font-size:9px;font-weight:700'>")
            resb.AppendFormat("<td colspan='12' align='center' style='border-bottom:1px solid white;border-left:1px solid white;' >{0}</td>", "") '**
            resb.AppendFormat("<td colspan='1' align='center' >TOTALES</td>")
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalBaseImponible1)) 'Total BASE IMPONIBLE 1
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalIGV1)) 'Total IGV 1 
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalBaseImponible2)) 'Total BASE IMPONIBLE 2
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalIGV2)) 'Total IGV 2
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalBaseImponible3)) 'Total BASE IMPONIBLE 3
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalIGV3)) 'Total IGV 3
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalValorNoGravadas)) 'Total Valor Ad. No Gravadas
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalValorOtrosTributos)) 'Total Otros Tributos y Cargos
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalISC)) 'Total ISC
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalImporte)) 'Total Importes Total
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**
            resb.AppendFormat("<td colspan='1' align='center' ></td>") '**

            resb.AppendFormat("</tr>")
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='41' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        res = resb.ToString()
        'Return res
        Return resb
    End Function



End Class


Partial Class vistas_CO_COLREVE
    Inherits Nomade.N.Cub

    Dim resb As New StringBuilder

    Dim coRegistroVentas As New Nomade.CO.CORegistroCompras("Bn")
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
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00140100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00140100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
        Else
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00140100" + "00" + "1" + "0" + "1" + "1" + ".pdf"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00140100" + "00" + "1" + "0" + "1" + "1" + ".pdf"
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
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00140100" + "00" + "1" + "1" + "1" + "1" + ".txt"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00140100" + "00" + "1" + "1" + "1" + "1" + ".txt"
        Else
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00140100" + "00" + "1" + "0" + "1" + "1" + ".txt"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00140100" + "00" + "1" + "0" + "1" + "1" + ".txt"
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
        dt = coRegistroVentas.ListarRegistroVentas_sunat(p_ANIO, p_MES, p_CTLG_CODE, "")
        resb = GenerarTablaRegistroVentas(dt)

        Dim nombreArch As String = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00140100" + "00" + "1" + "0" + "1" + "1" + ""

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
        resb.Clear()
        '------
        Dim dtEmpresa As New System.Data.DataTable
        dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "")
        resb.AppendFormat("<table border=""0"" width=""100%"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PERIODO:")
        resb.AppendFormat("<td width='75%' style=""mso-number-format:'\@'"">{0} {1}</td>", p_MES_DES, p_ANIO)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "RUC:")
        resb.AppendFormat("<td id='ruc' width='75%'>{0}</td>", dtEmpresa.Rows(0)("RUC").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "APELLIDOS Y NOMBRES, DENOMINACI&Oacute;N O RAZ&Oacute;N SOCIAL:")
        resb.AppendFormat("<td width='75%'>{0}</td>", dtEmpresa.Rows(0)("DESCRIPCION").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        resb.AppendFormat("<br/>")

        resb.AppendFormat("<table id=""tblRegistroVentas"" border=""1"" style=""max-width:3000px;width:2570px;"" width:""2570px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:15px;color:#FFFFFF;' align='center' bgcolor='#666666'>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>PERIODO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>CÓDIGO ÚNICO DE LA OPERACIÓN (CUO)</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>NÚMERO CORRELATIVO DEL ASIENTO CONTABLE</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>FECHA DE EMISIÓN <br/> DEL COMPROBANTE DE PAGO <br/> O DOCUMENTO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>FECHA DE VENCIMIENTO <br/> O FECHA DE PAGO(1)</th>")
        resb.AppendFormat("<th colspan='3' rowspan='2' style='width:60px;'>COMPROBANTE DE PAGO O DOCUMENTO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>N° FINAL</th>") '**        
        resb.AppendFormat("<th colspan='3'>INFORMACIÓN DEL CLIENTE</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>VALOR FACTURADO DE LA EXPORTACIÓN</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>BASE IMPONIBLE DE LA OPERACIÓN GRAVADA</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>DESCUENTO DE LA BASE IMPONIBLE</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>IGV O IMPUESTO DE PROMOCIÓN MUNICIPAL</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>DESCUENTO DEL IGV O IMPUESTO DE PROMOCIÓN MUNICIPAL</th>") '**        
        resb.AppendFormat("<th colspan='2' rowspan='2' style='width:85px;'> IMPORTE TOTAL DE LA OPERACIÓN EXONERADA O INAFECTA</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>ISC</th>")
        resb.AppendFormat("<th rowspan='2' colspan='2' style='width:75px;'>VENTAS DEL ARROZ PILADO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>OTROS TRIBUTOS Y CARGOS QUE NO FORMAN PARTE DE LA BASE IMPONIBLE</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>IMPORTE TOTAL DEL COMPROBANTE DE PAGO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>MONEDA</th>") '**                
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>TIPO DE CAMBIO</th>")
        resb.AppendFormat("<th colspan='4' rowspan='2' style='width:60px;'>REFERENCIA DEL COMPROBANTE DE PAGO O DOCUMENTO ORIGINAL QUE SE MODIFICA</th>")

        resb.AppendFormat("<th rowspan='3' style='width:60px;'>CONTRATO DE COLABORACIÓN EMPRESARIAL</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>ERROR TIPO 1: INCONSISTENCIA EN EL TIPO DE CAMBIO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>INDICADOR DE COMPROBANTES DE PAGO CANCELADOS CON MEDIOS DE PAGO</th>") '**
        resb.AppendFormat("<th rowspan='3' style='width:60px;'>ESTADO QUE IDENTIFICA LA OPORTUNIDAD DE LA ANOTACIÓN O INDICACIÓN SEGÚN EL INCISO e) DEL ARTÍCULO 8° RESOLUCIÓN 286-2009/SUNAT</th>") '**
        resb.AppendFormat("</tr>")
        'Fila 2 CABECERA
        resb.AppendFormat("<tr style='font-size:15px;color:#FFFFFF;' align='center' bgcolor='#666666'>")
        resb.AppendFormat("<th colspan='2' style='width:60px;'>DOCUMENTO DE IDENTIDAD</th>")
        resb.AppendFormat("<th rowspan='2' style='width:200px;'>APELLIDOS Y NOMBRES, DENOMINACI&Oacute;N O RAZ&Oacute;N SOCIAL</th>")
        resb.AppendFormat("</tr>")
        'Fila 3 CABECERA
        resb.AppendFormat("<tr style='font-size:15px;color:#FFFFFF;' align='center' bgcolor='#666666'>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 10)</th>")
        resb.AppendFormat("<th style='width:60px;'>N° SERIE</th>")
        resb.AppendFormat("<th style='width:60px;'>NÚMERO</th>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 2)</th>")
        resb.AppendFormat("<th style='width:60px;'>NÚMERO</th>")
        resb.AppendFormat("<th style='width:55px; word-wrap:break-word;'>EXONERADA</th>")
        resb.AppendFormat("<th style='width:55px;'>INAFECTA</th>")
        resb.AppendFormat("<th style='width:55px;'>BASE IMPONIBLE</th>") '**
        resb.AppendFormat("<th style='width:55px;'>IMPUESTO</th>") '**   
        resb.AppendFormat("<th style='width:85px;'>FECHA</th>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 10)</th>")
        resb.AppendFormat("<th style='width:60px;'>SERIE</th>")
        resb.AppendFormat("<th style='width:60px;'>N° DEL COMPROBANTE</th>")
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

                resb.AppendFormat("<tr style='font-size:15px;'>")
                'PERIODO , CUO, CORRELATIVO ASIENTO CONTABLE
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PERIODO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CUO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CAC").ToString()) '**
                'FECHA DE EMISIÓN DEL COMPROBANTE DE PAGO O DOCUMENTO,	FECHA DE VENCIMIENTO O FECHA DE PAGO(1)      
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10)))
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("VENCIMIENTO").ToString() = "", "", dt.Rows(i)("VENCIMIENTO").ToString().Substring(0, 10)))
                'COMPROBANTE DE PAGO O DOCUMENTO
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_SUNAT").ToString())
                resb.AppendFormat("<td align='center' style=""mso-number-format:'\@'"" >{0}</td>", dt.Rows(i)("SERIE").ToString())
                resb.AppendFormat("<td align='center' style=""mso-number-format:'\@'"">{0}</td>", dt.Rows(i)("NUMERO").ToString())
                'N° FINAL
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_FINAL").ToString()) '**
                'INFORMACIÓN DEL CLIENTE
                If dt.Rows(i)("TIPO_DCTO_CLIE").ToString() <> "" And dt.Rows(i)("NRO_DCTO_CLIE").ToString() <> "" Then
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_CLIE").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_DCTO_CLIE").ToString())
                Else
                    If (dt.Rows(i)("DNI").ToString() = "" Or dt.Rows(i)("RUC").ToString() <> "") Then
                        resb.AppendFormat("<td align='center' >{0}</td>", "06")
                        resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RUC").ToString())
                    Else
                        resb.AppendFormat("<td align='center' >{0}</td>", "01")
                        resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DNI").ToString())
                    End If
                End If

                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                'VALOR DE LA EXPORTACION
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("VALOR_EXPORTACION").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("VALOR_EXPORTACION").ToString()))))
                totalValorExportacion += Decimal.Parse(dt.Rows(i)("VALOR_EXPORTACION").ToString())
                'BASE IMPONIBLE
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE").ToString()))))
                totalBaseImponible += Decimal.Parse(dt.Rows(i)("BASE_IMPONIBLE").ToString())

                'DESCUENTO DE LA BASE IMPONIBLE
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("DESC_BASEIMP").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("DESC_BASEIMP").ToString()))))
                totalDescuentoBaseImp += Decimal.Parse(dt.Rows(i)("DESC_BASEIMP").ToString())
                'IMPUESTO GENERAL A LAS VENTAS Y/O IMPUESTO DE PROMOCION MUNICIPAL
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IGV").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IGV").ToString()))))
                totalIGV += Decimal.Parse(dt.Rows(i)("IGV").ToString())
                'DESCUENTO IMPUESTO GENERAL A LAS VENTAS Y/O IMPUESTO DE PROMOCION MUNICIPAL
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("DESC_IGV").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("DESC_IGV").ToString()))))
                totalDescuentoIgv += Decimal.Parse(dt.Rows(i)("DESC_IGV").ToString())

                'IMPORTE EXONERADA
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IMPORTE_EXONERADA").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE_EXONERADA").ToString()))))
                totalImportExone += Decimal.Parse(dt.Rows(i)("IMPORTE_EXONERADA").ToString())
                'IMPORTE INAFECTA
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IMPORTE_INAFECTA").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE_INAFECTA").ToString()))))
                totalImporteInafe += Decimal.Parse(dt.Rows(i)("IMPORTE_INAFECTA").ToString())
                'ISC
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("ISC").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("ISC").ToString()))))
                totalISC += Decimal.Parse(dt.Rows(i)("ISC").ToString())

                'BASE IMPONIBLE VENTAS DEL ARROZ PILADO
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("BASEIMP_ARROZ").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("BASEIMP_ARROZ").ToString()))))
                totalBaseImpArroz += Decimal.Parse(dt.Rows(i)("BASEIMP_ARROZ").ToString())
                'IMPUESTO A LAS VENTAS DEL ARROZ PILADO
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IMPUESTO_ARROZ").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPUESTO_ARROZ").ToString()))))
                totalImpuestoArroz += Decimal.Parse(dt.Rows(i)("IMPUESTO_ARROZ").ToString())

                'OTROS TRIBUTOS
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("OTROS_TRIBUTOS").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("OTROS_TRIBUTOS").ToString()))))
                totalTributos += Decimal.Parse(dt.Rows(i)("OTROS_TRIBUTOS").ToString())
                'IMPORTE
                resb.AppendFormat("<td align='center' >{0}</td>", If(Decimal.Parse(dt.Rows(i)("IMPORTE").ToString()) = 0, "", String.Format("{0:##0.00}", Decimal.Parse(dt.Rows(i)("IMPORTE").ToString()))))
                totalImporte += Decimal.Parse(dt.Rows(i)("IMPORTE").ToString())
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
                resb.AppendFormat("<td align='center' style=""mso-number-format:'\@'"" >{0}</td>", dt.Rows(i)("SERIE_ORIGEN").ToString())
                resb.AppendFormat("<td align='center' style=""mso-number-format:'\@'"">{0}</td>", dt.Rows(i)("NUMERO_ORIGEN").ToString())

                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CONTRATO").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INC_TIPO_CAMBIO").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("INDICADOR_COMPROBANTE").ToString()) '**                
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO_AJUSTE").ToString()) '**                
                resb.AppendFormat("</tr>")
                '---Suma de totales
            Next

            '    'Fila de totales          
            resb.AppendFormat("<tr style='font-size:15px;font-weight:700'>")
            resb.AppendFormat("<td colspan='11' align='center' style='border-bottom:1px solid white;border-left:1px solid white;' >{0}</td>", "")
            resb.AppendFormat("<td colspan='1' align='center' >TOTALES</td>")
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalValorExportacion)) 'Total BASE IMPONIBLE 1
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalBaseImponible)) 'Total IGV 1             
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalDescuentoBaseImp))
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalIGV)) 'Total IGV 3
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalDescuentoIgv))
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalImportExone)) 'Total BASE IMPONIBLE 2
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalImporteInafe)) 'Total IGV 2
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalISC)) 'Total BASE IMPONIBLE 3            
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalBaseImpArroz))
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalImpuestoArroz))
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalTributos)) 'Total BASE_IMPONIBLE Ad. No Gravadas
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalImporte)) 'Total ISC
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("<td colspan='1' align='center' ></td>")
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</tr>")
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='34' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        Return resb
    End Function


End Class

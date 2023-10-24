
Partial Class vistas_CO_COLIBDI
    Inherits NOMADE.N.Cub

    Dim resb As New StringBuilder

    Dim coLibroContable As New Nomade.CO.COLibroDiario("Bn")
    Dim ncEmpresa As New NOMADE.NC.NCEmpresa("Bn")
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

        If hfind_vacio.Value = "N" Then
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00050100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00050100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
        Else
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00050100" + "00" + "1" + "0" + "1" + "1" + ".pdf"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00050100" + "00" + "1" + "0" + "1" + "1" + ".pdf"
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
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00050100" + "00" + "1" + "1" + "1" + "1" + ".txt"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00050100" + "00" + "1" + "1" + "1" + "1" + ".txt"
        Else
            'filen = "LE" + hddRuc.Value + hddAnio.Value + "0" + hddMes.Value + "00050100" + "00" + "1" + "0" + "1" + "1" + ".txt"
            filen = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00050100" + "00" + "1" + "0" + "1" + "1" + ".txt"
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
        dt = coLibroContable.listarLibroDiario(p_ANIO, p_MES, p_CTLG_CODE, "")
        resb = GenerarTablaLibroDiario(dt)

        Dim nombreArch As String
        If hfind_vacio.Value = "N" Then
            nombreArch = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00050100" + "00" + "1" + "1" + "1" + "1" + ""
        Else
            nombreArch = "LE" + hddRuc.Value + hddAnio.Value + p_MES + "00050100" + "00" + "1" + "0" + "1" + "1" + ""
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

    Public Function GenerarTablaLibroDiario(ByVal dt As System.Data.DataTable) As StringBuilder
        Dim total As Decimal = 0
        Dim res = ""
        resb.Clear()
        '------
        'Cambios : buscar '**'
        'Dim dtEmpresa As New System.Data.DataTable
        'dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PERIODO:")
        resb.AppendFormat("<td width='75%'>{0} {1}</td>", p_MES_DES, p_ANIO)
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

        resb.AppendFormat("<table id=""tblLibroDiario"" border=""1"" style=""max-width:3000px;width:2570px;"" width:""2570px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>PERIODO</th>") '**
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>CÓDIGO ÚNICO DE LA OPERACIÓN (CUO)</th>") '**
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>NÚMERO CORRELATIVO DEL ASIENTO CONTABLE</th>") '**
        resb.AppendFormat("<th rowspan='2' style='width:85px;'>CUENTA CONTABLE</th>")
        resb.AppendFormat("<th rowspan='2' style='width:85px;'>CÓDIGO UNIDAD OPERATIVA</th>")
        resb.AppendFormat("<th rowspan='2' style='width:85px;'>CENTRO DE COSTOS</th>")
        resb.AppendFormat("<th rowspan='2' style='width:85px;'>TIPO DE MONEDA</th>")
        resb.AppendFormat("<th colspan='2' rowspan='1' style='width:60px;'>IDENTIDAD DEL EMISOR</th>")
        resb.AppendFormat("<th colspan='3' rowspan='1' style='width:60px;'>COMPROBANTE DE PAGO O DOCUMENTO</th>")
        resb.AppendFormat("<th rowspan='2' style='width:80px;' >FECHA CONTABLE</th>")
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>FECHA DE VENCIMIENTO</th>") '**        
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>FECHA DE OPERACIÓN O EMISIÓN</th>") '** 
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>DESCRIPCIÓN OPERACIÓN</th>") '** 
        resb.AppendFormat("<th rowspan='2' style='width:75px;'>GLOSA REFERENCIAL</th>") '** 
        resb.AppendFormat("<th colspan='2' rowspan='1' style='width:60px;'>MOVIMIENTOS</th>")
        resb.AppendFormat("<th rowspan='2' style='width:60px;'>CÓDIGO DEL LIBRO</th>") '**
        resb.AppendFormat("<th rowspan='2' style='width:60px;'>ESTADO QUE IDENTIFICA LA OPORTUNIDAD DE LA ANOTACIÓN O INDICACIÓN SI ÉSTA CORRESPONDE A UN AJUSTE</th>") '**

        resb.AppendFormat("</tr>")
        'Fila 2 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th style='width:60px;'>TIPO DOC. INDENTIDAD</th>")
        resb.AppendFormat("<th style='width:60px;'>NRO. DOC. IDENTIDAD</th>")
        resb.AppendFormat("<th style='width:60px;'>TIPO (TABLA 10)</th>")
        resb.AppendFormat("<th style='width:60px;'>N° SERIE </th>")
        resb.AppendFormat("<th style='width:60px;'>NÚMERO</th>")
        resb.AppendFormat("<th style='width:60px;'>DEBE</th>")
        resb.AppendFormat("<th style='width:60px;'>HABER</th>")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody >")

        Dim nroCorrelativo As Integer = 0
        Dim totalDebe As Decimal = 0
        Dim totalHaber As Decimal = 0
        If Not dt Is Nothing Then
            Dim editar As String = "Editar"
            For i As Integer = 0 To dt.Rows.Count - 1
                nroCorrelativo += 1
                resb.AppendFormat("<tr style='font-size:9px;'>")
                'PERIODO , CUO, CORRELATIVO ASIENTO CONTABLE
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PERIODO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CUO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_MOV").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CUENTA_CONTABLE").ToString()) '**

                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("COD_UNIDAD_OPERATIVA").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CENTRO_COSTOS").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_MONEDA").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DOC_IDENTIDAD").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_DOC_IDENTTIDAD").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DOC_COMPROBANTE").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE_COMPROBANTE").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_COMPROBANTE").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_CONTABLE").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_VENCIMIENTO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_EMISION").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CTAS_DESCRIPCION").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("GLOSA_REFERENCIAL").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DEBE").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("HABER").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO_LIBRO").ToString()) '**
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO_AJUSTE").ToString()) '**

                totalDebe += Decimal.Parse(dt.Rows(i)("DEBE").ToString())
                totalHaber += Decimal.Parse(dt.Rows(i)("HABER").ToString())
            Next
            'Fila de totales          
            resb.AppendFormat("<tr style='font-size:9px;font-weight:700'>")
            resb.AppendFormat("<td colspan='16' align='center' style='border-bottom:1px solid white;border-left:1px solid white;' >{0}</td>", "") '**
            resb.AppendFormat("<td colspan='1' align='center' >TOTALES</td>")
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalDebe)) 'Total Debe
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalHaber)) 'Total Haber
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

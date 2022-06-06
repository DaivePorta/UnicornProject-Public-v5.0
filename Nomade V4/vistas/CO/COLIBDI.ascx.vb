
Partial Class vistas_CO_COLIBDI
    Inherits NOMADE.N.Cub

    Dim resb As New StringBuilder

    Dim coLibroContable As New Nomade.CO.COLibroDiario("Bn")
    Dim ncEmpresa As New NOMADE.NC.NCEmpresa("Bn")
    Dim p_CTLG_CODE As String = ""
    Dim p_MES As String = ""
    Dim p_MES_DES As String = ""
    Dim p_ANIO As String = ""


    Protected Sub btnPdf_Click(sender As Object, e As EventArgs) Handles btnLibroPDF.Click

        Dim filep As String
        Dim filen, ruta As String
        filep = "Archivos\"
        If hfind_vacio.Value = "N" Then
            filen = "LE" + hddRuc.Value + hddAnio.Value + hddMes.Value + "00050100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
        Else
            filen = "LE" + hddRuc.Value + hddAnio.Value + hddMes.Value + "00050100" + "00" + "1" + "0" + "1" + "1" + ".pdf"
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
        If hfind_vacio.Value = "N" Then
            filen = "LE" + hddRuc.Value + hddAnio.Value + hddMes.Value + "00050100" + "00" + "1" + "1" + "1" + "1" + ".txt"
        Else
            filen = "LE" + hddRuc.Value + hddAnio.Value + hddMes.Value + "00050100" + "00" + "1" + "0" + "1" + "1" + ".txt"
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
        dt = coLibroContable.listarLibroDiario(p_CTLG_CODE, p_ANIO, p_MES, "")
        resb = GenerarTablaLibroDiario(dt)

        Dim nombreArch As String = "LE" + hddRuc.Value + hddAnio.Value + hddMes.Value + "00050100" + "00" + "1" + "0" + "1" + "1" + ""

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
        resb.Clear()
        '------
        Dim dtEmpresa As New System.Data.DataTable
        dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PERIODO:")
        resb.AppendFormat("<td width='75%'  style=""mso-number-format:'\@'"">{0} {1}</td>", p_MES_DES, p_ANIO)
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

        resb.AppendFormat("<table id=""tblLibroDiario"" border=""1"" style=""max-width:3000px;width:1500px;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='font-size:13px;color:white' align='center' bgcolor='#666666'>")
        resb.AppendFormat("<th style='width:75px;'>PERIODO</th>")
        resb.AppendFormat("<th style='width:75px;'>CÓDIGO ÚNICO DE LA OPERACIÓN (CUO)</th>")
        resb.AppendFormat("<th style='width:75px;'>NÚMERO CORRELATIVO DEL ASIENTO CONTABLE</th>")
        resb.AppendFormat("<th style='width:75px;'>PLAN CONTABLE USADO POR EL DEUDOR TRIBUTARIO (TABLA 17)</th>")
        resb.AppendFormat("<th style='width:75px;'>CÓDIGO DE CUENTA CONTABLE </th>")
        resb.AppendFormat("<th style='width:75px;'>FECHA DE OPERACIÓN</th>")
        resb.AppendFormat("<th style='width:150px;'>GLOSA DE LA NATURALEZA DE LA OPERACIÓN</th>")
        resb.AppendFormat("<th style='width:75px;'>DEBE</th>")
        resb.AppendFormat("<th style='width:75px;'>HABER</th>")
        resb.AppendFormat("<th style='width:75px;'>CORRELATIVO EN REGISTRO DE VENTA</th>")
        resb.AppendFormat("<th style='width:75px;'>CORRELATIVO EN REGISTRO DE COMRPA</th>")
        resb.AppendFormat("<th style='width:75px;'>CORRELATIVO EN REGISTRO DE CONSIGNACIONES</th>")
        resb.AppendFormat("<th style='width:75px;'>ESTADO DE LA OPERACIÓN</th>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        Dim totalDebe As Decimal = 0
        Dim totalHaber As Decimal = 0


        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                'nroCorrelativo += 1               
                resb.AppendFormat("<tr style='font-size:11px;'>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PERIODO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CUO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CORRELATIVO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPL").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CUENTA_CONTABLE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_OPERACION").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESCRIPCION").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO_DEBE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO_HABER").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CORR_REG_VENTAS").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CORR_REG_COMPRAS").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CORR_REG_CONSIG").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO_OPERACION").ToString())

                If dt.Rows(i)("MONTO_DEBE").ToString().Equals(String.Empty) Then
                    totalDebe += 0
                Else
                    totalDebe += Decimal.Parse(dt.Rows(i)("MONTO_DEBE").ToString())
                End If

                If dt.Rows(i)("MONTO_HABER").ToString().Equals(String.Empty) Then
                    totalHaber += 0
                Else
                    totalHaber += Decimal.Parse(dt.Rows(i)("MONTO_HABER").ToString())
                End If

            Next
            '    'Fila de totales          
            resb.AppendFormat("<tr style='font-size:12px;font-weight:700'>")
            resb.AppendFormat("<td colspan='6' align='center' style='border-bottom:1px solid white;border-left:1px solid white;' >{0}</td>", "")
            resb.AppendFormat("<td colspan='1' align='center' >TOTALES</td>")
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalDebe))
            resb.AppendFormat("<td colspan='1' align='center' >{0}</td>", String.Format("{0:#0.00}", totalHaber))
            resb.AppendFormat("<td colspan='4' align='center' ></td>")
            resb.AppendFormat("</tr>")
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='13' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        'Return res
        Return resb
    End Function

End Class

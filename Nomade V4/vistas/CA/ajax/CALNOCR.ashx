<%@ WebHandler Language="VB" Class="CALNOCR" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports QRCoder

Public Class CALNOCR : Implements IHttpHandler

    Dim OPCION, p_CTLG_CODE, p_SCSL_CODE, p_COMPRA_VENTA_IND As String
    Dim ncNotaCredito As New Nomade.CA.NotaCredito("Bn")
    Dim codigoQR As New Nomade.Impresion.CodigoQR("Bn")

    Dim p_NOCC_CODE, p_NOCC_NUM_SEQ_DOC As String
    Dim p_ENTREGA_DESPACHO_ALMACEN As String
    Dim p_ESTADO, p_DESDE, p_HASTA As String

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE") 'Codigo establecimiento/sucursal
        p_NOCC_CODE = context.Request("p_NOCC_CODE")
        p_NOCC_NUM_SEQ_DOC = context.Request("p_NOCC_NUM_SEQ_DOC")
        p_ENTREGA_DESPACHO_ALMACEN = context.Request("p_ENTREGA_DESPACHO_ALMACEN")
        p_COMPRA_VENTA_IND = context.Request("p_COMPRA_VENTA_IND")
        p_ESTADO = context.Request("p_ESTADO")
        p_DESDE = context.Request("p_DESDE")
        p_HASTA = context.Request("p_HASTA")

        Try

            Select Case OPCION
                Case "1" 'lista notas de credito
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ncNotaCredito.ListarNotaCredito("", "0", "", p_CTLG_CODE, p_SCSL_CODE, "", p_COMPRA_VENTA_IND, "", "", "", "", "")
                    res = GenerarTablaListaNotasCredito(dt)
                Case "1.5" 'lista notas de credito SOLO PARA CALNOCL
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = ncNotaCredito.ListarNotaCredito_2("", "0", "", p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), "", p_COMPRA_VENTA_IND, "", "", "", "", "")
                    res = GenerarTablaListaNotasCredito(dt)
                Case "2" 'Lista Cabecera nota de credito con todos sus datos 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncNotaCredito.ListarNotaCredito(If(p_NOCC_CODE = Nothing, "", p_NOCC_CODE), "0", "",
                                                         If(p_CTLG_CODE = Nothing Or p_CTLG_CODE = "undefined", "", p_CTLG_CODE),
                                                         If(p_SCSL_CODE = Nothing Or p_SCSL_CODE = "undefined", "", p_SCSL_CODE),"",
                                                         If(p_COMPRA_VENTA_IND = Nothing, "", p_COMPRA_VENTA_IND), "", "", "", "", "")
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "2.5" 'Lista Cabecera nota de credito con todos sus datos 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncNotaCredito.ListarNotaCredito_2("", "0", "", p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), "", p_COMPRA_VENTA_IND, "", "", "", "", "")
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "3"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = GenerarDctoImprimir(p_NOCC_CODE, p_CTLG_CODE)

                Case "4" 'lista anulación notas de credito
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim dt2 As New DataTable
                    dt = ncNotaCredito.ListarNotaCredito_2("", "0", "", p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), "", p_COMPRA_VENTA_IND, "", "", "", "", "")
                    'dt2 = ncNotaCredito.ListarNotaCreditoGenerica("", p_CTLG_CODE, p_SCSL_CODE, "", If(p_COMPRA_VENTA_IND = "C", "P", "C"))
                    res = GenerarTablaListaAnulacionNotasCredito(dt, dt2)

                Case Else

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try


    End Sub

    Public Function GenerarTablaListaNotasCredito(ByVal dtNotasCredito As DataTable) As String

        res = ""
        resb.Clear()
        '------
        resb.Append("<table id=""tblNotasCredito"" class=""display DTTT_selectable"" border=""0"">")
        resb.Append("<thead>")
        resb.Append("<th>CODIGO</th>")
        resb.Append("<th>DOCUMENTO</th>")
        resb.Append("<th>DOCUMENTO<br />ORIGEN</th>")
        resb.Append("<th>MONEDA</th>")
        resb.Append("<th>IMPORTE<br />ORIGEN</th>")
        resb.Append("<th>IMPORTE<br />NOTA CRÉDITO</th>")
        If p_COMPRA_VENTA_IND = "C" Then
            resb.Append("<th>PROVEEDOR</th>")
        ElseIf p_COMPRA_VENTA_IND = "V" Then
            resb.Append("<th>CLIENTE</th>")
        Else
            resb.Append("<th>PERSONA</th>")
        End If

        resb.Append("<th>EMISIÓN</th>")
        resb.Append("<th>VENDEDOR</th>")
        resb.Append("<th>E/D POR <br/> ALMACÉN</th>")
        resb.Append("<th>ESTADO</th>")
        resb.Append("<th>VIGENCIA</th>")
        resb.Append("</thead>")
        resb.Append("<tbody>")

        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                Dim cargar As String = "onclick=""cargarNotaCredito('" + dt.Rows(i)("CODIGO").ToString() + "','" + dt.Rows(i)("EMPRESA_CODE").ToString() + "')"""
                resb.AppendFormat("<tr >")
                resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO_ORIGEN").ToString())
                resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("MONEDA").ToString())
                resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("ORIGEN_IMPORTE").ToString())))
                resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_TOTAL").ToString())))
                resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("EMISION").ToString())
                resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("USUA_ID_REG").ToString())
                If dt.Rows(i)("ENTREGA_DESPACHO_ALMACEN").ToString() = "S" Then
                    resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", "SI")
                Else
                    resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", "NO")
                End If
                resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("USADO").ToString())
                resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", If(dt.Rows(i)("ANULADO_IND").ToString() = "S", "ANULADO", "VIGENTE"))
                resb.Append("</tr>")
            Next
        End If

        resb.Append("</tbody>")
        resb.Append("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarDctoImprimir(ByVal p_CODE As String, ByVal p_CTLG_CODE As String) As String

        Dim ncEmpresa As New Nomade.NC.NCEmpresa("bn")

        Dim tabla As New StringBuilder
        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        'Dim dtEmpresas As New DataTable
        dtCabecera = ncNotaCredito.ListarCabNotaCreditoImpresion(p_CODE)
        dtDetalles = ncNotaCredito.ListarDetNotaCreditoImpresion(p_CODE)

        If dtCabecera IsNot Nothing Then
            Dim rutaLogo As String = ""
            Dim mon As String = dtCabecera.Rows(0)("MONEDA_SIMBOLO")
            'VARIABLE PARA COLOCAR EL QR EN EL PDF
            Dim rutaQr As String = ""
            'VARIABLE PARA COLOCAR LA INFORMACIÓN DEL QR
            Dim cadenaQR As String = ""
            If dtCabecera.Rows(0)("COMPRA_VENTA") = "V" Then
                'dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("EMPRESA_CODE"), "A", "")
                rutaLogo = dtCabecera.Rows(0)("RUTA_IMAGEN")
            End If
            'OBTENER LOGO

            'PARAMETROS TABLAS
            Dim border As String = "1"
            Dim marginBottom As String = "10px"
            Dim cellpadding As String = "5px"
            'PARAMETROS TABLA1
            Dim wLogo As String = "60%"
            Dim wNota As String = "40%"
            'PARAMETROS TABLA2
            Dim wRuc As String = "50%"
            Dim wDen As String = "30%"
            Dim wNro As String = "20%"
            'PARAMETROS TABLA3
            Dim wCant As String = "10%"
            Dim wDesc As String = "60%"
            Dim wPrec As String = "15%"
            Dim wSubt As String = "15%"

            Dim codeMoneda As String = dtCabecera.Rows(0)("MONE_CODE") 'Código de Moneda
            Dim descMon As String = dtCabecera.Rows(0)("MONEDA") 'Descripcion de moneda   

            Dim motivoSunat As String = dtCabecera.Rows(0)("MOTIVO_SUNAT") 'Código motivo SUNAT
            'Cadena con la información del QR
            cadenaQR = "6" + "|" + dtCabecera(0)("RUC").ToString + "|" + dtCabecera(0)("CLIE_DOID").ToString + "|" + dtCabecera(0)("CLIE_DCTO_NRO").ToString + "|" + "07" + "|" + dtCabecera(0)("DOCUMENTO").ToString + "|" + dtCabecera(0)("FECHA_SUNAT").ToString + "|" + dtCabecera(0)("MONTO_IGV").ToString + "|" + dtCabecera(0)("IMPORTE_TOTAL").ToString
            'LA RUTA QUE VA A TENER
            'rutaQr = "data:image/png;base64," + codigoQR.fnGetCodigoQR(p_CODE, p_CTLG_CODE)
            rutaQr = "data:image/png;base64," + fnGetCodigoQR_fast(cadenaQR)

            If dtCabecera.Rows(0)("COMPRA_VENTA") = "V" Then
                tabla.Append("<table id='tblDctoImprimir1' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "'  align='center'>")
                tabla.Append("<tbody>")
                tabla.Append("<tr>")
                tabla.AppendFormat("<td width='" + wLogo + "' rowspan='2' style='text-align: center'><img src='{0}' style='max-height:50px;'></th></td>", rutaLogo)
                tabla.AppendFormat("<td width='" + wNota + "' style='text-align: center;'><strong>RUC N° {0}</strong></td>", dtCabecera.Rows(0)("RUC"))
                tabla.Append("</tr>") '------------------------------------------------
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align: center;'><strong>NOTA DE CRÉDITO {0}</strong></td>", If(dtCabecera.Rows(0)("IND_ELECTRONICO") = "N", "", " ELECTRÓNICA"))
                tabla.Append("</tr>") '------------------------------------------------            
                tabla.Append("<tr>")
                If (dtCabecera.Rows(0)("RUC").substring(0, 2) = "10") Then 'DPORTA 10/12/2021
                    tabla.AppendFormat("<td>{0} <br>De: {1} <br>{2}</td>", dtCabecera.Rows(0)("DESC_CORTA_EMPRESA"), dtCabecera.Rows(0)("DESC_EMPRESA"), If(dtCabecera.Rows(0)("DIRECCION") = "", "", dtCabecera.Rows(0)("DIRECCION")))
                Else
                    tabla.AppendFormat("<td>{0} {1}</td>", dtCabecera.Rows(0)("DESC_EMPRESA"), If(dtCabecera.Rows(0)("DIRECCION") = "", "", " - " + dtCabecera.Rows(0)("DIRECCION")))
                End If
                tabla.AppendFormat("<td style='text-align: center;'>{0}</td>", dtCabecera.Rows(0)("DOCUMENTO"))
                tabla.Append("</tr>")
                tabla.Append("</tbody></table>")


                tabla.Append("<table id='tblDctoImprimir2' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "' align='center'>")
                tabla.Append("<tbody>")
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Cliente:</strong> {0}</td>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
                tabla.Append("</tr>") '-------------------------------------------------            
                tabla.Append("<tr>")
                tabla.AppendFormat("<td><strong>Dirección:</strong> {0}</td>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
                tabla.AppendFormat("<td colspan='2'><strong>Documento que modifica</strong></td>")
                tabla.Append("</tr>") '------------------------------------------------
                tabla.Append("<tr>")
                tabla.AppendFormat("<td width='" + wRuc + "'><strong>{0}:</strong> {1}</td>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
                tabla.AppendFormat("<td width='" + wDen + "'><strong>Denominación</strong>: {0}</td>", dtCabecera.Rows(0)("ORIGEN_TIPO_DOC_DESC"))
                tabla.AppendFormat("<td width='" + wNro + "'><strong>N°</strong>: {0}</td>", dtCabecera.Rows(0)("DOCUMENTO_ORIGEN"))
                tabla.Append("</tr>") '------------------------------------------------            
                tabla.Append("<tr>")
                tabla.AppendFormat("<td><strong>Fecha Emisión:</strong> {0}</td>", dtCabecera.Rows(0)("EMISION"))
                tabla.AppendFormat("<td colspan='2'><strong>Fecha del comprobante que modifica:</strong> {0}</td>", dtCabecera.Rows(0)("EMISION_ORIGEN"))
                tabla.Append("</tr>") '------------------------------------------------           

                tabla.Append("</tbody></table>")


                tabla.Append("<table id='tblDctoImprimir3' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "'  cellpadding='" + cellpadding + "' align='center'>")
                tabla.Append("<tbody>")
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='4'><strong>Por lo siguiente:</strong></td>")
                tabla.Append("</tr>") '------------------------------------------------            
                tabla.Append("<tr>")
                tabla.AppendFormat("<td width='" + wCant + "'><strong>CANT.</strong></td>")
                tabla.AppendFormat("<td width='" + wDesc + "'><strong>DESCRIPCIÓN</strong></td>")
                tabla.AppendFormat("<td width='" + wPrec + "'><strong>P. UNIT. ({0})</strong></td>", mon)
                tabla.AppendFormat("<td width='" + wSubt + "' style='font-size:9px !important;word-wrap: break-word;text-align:center;'><strong>VALOR DE VENTA O SERVICIO PRESTADO</strong></td>")
                tabla.Append("</tr>") '------------------------------------------------- 
                For Each row In dtDetalles.Rows
                    'If Decimal.Parse(row("CANTIDAD_DEVL")) > 0 Then
                    tabla.Append("<tr>")
                    If motivoSunat = "01" Or motivoSunat = "02" Or motivoSunat = "06" Then
                        If dtCabecera.Rows(0)("ENTREGA_DESPACHO_ALMACEN") = "S" Then
                            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("CANTIDAD_DOC_ORIGEN"))
                            tabla.AppendFormat("<td ><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("PU"))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("VALOR_VENTA"))
                        Else
                            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("CANTIDAD_DOC_ORIGEN"))
                            tabla.AppendFormat("<td ><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("PU"))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("VALOR_VENTA"))
                        End If
                    ElseIf motivoSunat = "07" Then
                        If Decimal.Parse(row("CANTIDAD_DEVL")) > 0 Then
                            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("CANTIDAD_DEVL"))
                            tabla.AppendFormat("<td ><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("PU"))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("VALOR_VENTA"))
                        End If
                    Else
                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("CANTIDAD_DOC_ORIGEN"))
                        tabla.AppendFormat("<td ><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("PU"))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("VALOR_VENTA"))
                    End If

                    tabla.Append("</tr>")
                    'End If
                Next
                tabla.Append("<tr>")

                Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
                Dim importeTexto As String
                If (dtCabecera.Rows(0)("MONE_CODE") = "0002") Then
                    importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("MONTO_TOTAL"))).ToUpper()
                Else
                    importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("MONTO_TOTAL"))).ToUpper()
                    '(l.ToCustomCardinal((dtCabecera.Rows(0)("MONTO_TOTAL") / dtCabecera.Rows(0)("VALOR_CAMBIO")))).ToUpper()
                End If

                If codeMoneda = "0002" Then
                    tabla.AppendFormat("<td colspan='2'><strong>SON: {0} <span> SOLES </span></strong></td>", importeTexto.Replace(".-", " " + mon))
                ElseIf codeMoneda = "0003" Then
                    tabla.AppendFormat("<td colspan='2'><strong>SON: {0} <span> DOLARES </span></strong></td>", importeTexto.Replace(".-", " " + mon))
                Else
                    tabla.AppendFormat("<td colspan='2'><strong>SON: {0} </strong></td>", importeTexto.Replace(".-", " " + mon))
                End If
                tabla.AppendFormat("<td colspan='2'></td>")
                tabla.Append("</tr>") '------------------------------------------------ 
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='2'><strong>MOTIVO DE LA EMISIÓN DE LA NOTA DE CRÉDITO</strong></td>")
                tabla.AppendFormat("<td ><strong>IGV </strong> </td>")
                If (dtCabecera.Rows(0)("MONE_CODE") = "0002") Then
                    tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_IGV"))
                Else
                    'tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", (dtCabecera.Rows(0)("MONTO_IGV") / dtCabecera.Rows(0)("VALOR_CAMBIO")).toFixed(2))
                    tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_IGV"))
                End If
                tabla.Append("</tr>") '------------------------------------------------ 
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='2'>{0}</td>", dtCabecera.Rows(0)("MOTIVO_DESC"))
                tabla.AppendFormat("<td ><strong>TOTAL {0}</strong></td>", mon)
                If (dtCabecera.Rows(0)("MONE_CODE") = "0002") Then
                    tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_TOTAL"))
                Else
                    'tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", (dtCabecera.Rows(0)("MONTO_TOTAL") / dtCabecera.Rows(0)("VALOR_CAMBIO")).toFixed(2))
                    tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_TOTAL"))
                End If

                tabla.Append("</tr>") '------------------------------------------------             
                tabla.AppendFormat("<td colspan='2'><strong>GLOSA</strong></td>")
                tabla.AppendFormat("<td colspan='2'></td>")
                tabla.Append("</tr>") '------------------------------------------------ 
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='2'>{0}</td>", dtCabecera.Rows(0)("GLOSA"))
                tabla.Append("<td colspan='2'></strong></td>")
                tabla.Append("</tr>") '------------------------------------------------ 
                tabla.Append("</tbody></table>")

                tabla.Append("<table id='tblDctoImprimir3' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "'  cellpadding='" + cellpadding + "' align='center'>")
                tabla.Append("<tbody>")
                tabla.Append("<tr>")
                tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
                tabla.AppendFormat("<td width='" + wDen + "'><strong>OP GRAVADO ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
                tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("MONTO_GRAVADO").ToString())))
                tabla.Append("</tr>")
                tabla.Append("<tr>")
                tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
                tabla.AppendFormat("<td width='" + wDen + "'><strong>OP INAFECTA ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
                tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("MONTO_INAFECTO").ToString())))
                tabla.Append("</tr>")
                tabla.Append("<tr>")
                tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
                tabla.AppendFormat("<td width='" + wDen + "'><strong>OP EXONERADO ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
                tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("MONTO_EXONERADO").ToString())))
                tabla.Append("</tr>")
                tabla.Append("<tr>")
                tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
                tabla.AppendFormat("<td width='" + wDen + "'><strong>IGV ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
                tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("MONTO_IGV").ToString())))
                tabla.Append("</tr>")
                tabla.Append("<tr>")
                tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
                tabla.AppendFormat("<td width='" + wDen + "'><strong>TOTAL ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
                tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_TOTAL").ToString())))
                tabla.Append("</tr>")
                tabla.Append("</tbody>")
                tabla.Append("</table>")
                tabla.Append("<table id='tblDctoImprimir5' class='tblDctoImprimir' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "'  align='center'>")
                tabla.Append("<tbody>")
                tabla.Append("<tr>")
                If dtCabecera.Rows(0)("IND_ELECTRONICO") = "S" Then
                    tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaQr)
                    tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><strong>Autorizado mediante <span style='float:right'></span></strong>{0}</th></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
                    tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", "Para consultar el documento ingrese a http://52.41.93.228:1115, debe estar disponible dentro de las próximas 48 hrs. a partir de la fecha de emisión.")
                Else
                    tabla.AppendFormat("<td colspan='4' style='text-align: center;'>GRACIAS POR SU PREFERENCIA</td>")
                End If
                tabla.Append("</tr>")
                tabla.Append("</tbody></table>")
            Else ' PROVEEDORES /  COMPRAS
                tabla.Append("<table id='tblDctoImprimir1' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "'  align='center'>")
                tabla.Append("<tbody>")
                tabla.Append("<tr>")
                tabla.AppendFormat("<td rowspan='3'><h3>{0}</h3> {1}</td>", dtCabecera.Rows(0)("RAZON_SOCIAL"), If(dtCabecera.Rows(0)("DIRECCION_CLIENTE") = "", "", "</br>" + dtCabecera.Rows(0)("DIRECCION_CLIENTE")))
                tabla.AppendFormat("<td style='text-align: center;'>{0}</td>", dtCabecera.Rows(0)("DOCUMENTO"))
                tabla.Append("</tr>")
                tabla.Append("<tr>")
                'tabla.AppendFormat("<td width='" + wLogo + "' rowspan='2'></td>")
                tabla.AppendFormat("<td width='" + wNota + "' style='text-align: center;'><strong>RUC N° {0}</strong></td>", dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
                tabla.Append("</tr>") '------------------------------------------------
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align: center;'><strong>NOTA DE CRÉDITO</strong></td>")
                tabla.Append("</tr>") '------------------------------------------------            
                tabla.Append("</tbody></table>")

                tabla.Append("<table id='tblDctoImprimir2' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "' align='center'>")
                tabla.Append("<tbody>")
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Cliente:</strong> {0}</td>", dtCabecera.Rows(0)("DESC_EMPRESA"))
                tabla.Append("</tr>") '-------------------------------------------------            
                tabla.Append("<tr>")
                tabla.AppendFormat("<td><strong>Dirección:</strong> {0}</td>", dtCabecera.Rows(0)("DIRECCION"))
                tabla.AppendFormat("<td colspan='2'><strong>Documento que modifica</strong></td>")
                tabla.Append("</tr>") '------------------------------------------------
                tabla.Append("<tr>")
                tabla.AppendFormat("<td width='" + wRuc + "'><strong>{0}:</strong> {1}</td>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
                tabla.AppendFormat("<td width='" + wDen + "'><strong>Denominación</strong>: {0}</td>", dtCabecera.Rows(0)("ORIGEN_TIPO_DOC_DESC"))
                tabla.AppendFormat("<td width='" + wNro + "'><strong>N°</strong>: {0}</td>", dtCabecera.Rows(0)("DOCUMENTO_ORIGEN"))
                tabla.Append("</tr>") '------------------------------------------------            
                tabla.Append("<tr>")
                tabla.AppendFormat("<td><strong>Fecha Emisión:</strong> {0}</td>", dtCabecera.Rows(0)("EMISION"))
                tabla.AppendFormat("<td colspan='2'><strong>Fecha del comprobante que modifica:</strong> {0}</td>", dtCabecera.Rows(0)("EMISION_ORIGEN"))
                tabla.Append("</tr>") '------------------------------------------------           

                tabla.Append("</tbody></table>")


                tabla.Append("<table id='tblDctoImprimir3' class='tblDctoImprimir' border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "'  cellpadding='" + cellpadding + "' align='center'>")
                tabla.Append("<tbody>")
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='4'><strong>Por lo siguiente:</strong></td>")
                tabla.Append("</tr>") '------------------------------------------------            
                tabla.Append("<tr>")
                tabla.AppendFormat("<td width='" + wCant + "'><strong>CANT.</strong></td>")
                tabla.AppendFormat("<td width='" + wDesc + "'><strong>DESCRIPCIÓN</strong></td>")
                tabla.AppendFormat("<td width='" + wPrec + "'><strong>P. UNIT. ({0})</strong></td>", mon)
                tabla.AppendFormat("<td width='" + wSubt + "' style='font-size:9px !important;word-wrap: break-word;text-align:center;'><strong>VALOR DE VENTA O SERVICIO PRESTADO</strong></td>")
                tabla.Append("</tr>") '------------------------------------------------- 
                For Each row In dtDetalles.Rows
                    If Decimal.Parse(row("CANTIDAD_DEVL")) > 0 Then
                        tabla.Append("<tr>")
                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("CANTIDAD_DEVL"))
                        tabla.AppendFormat("<td ><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("PU"))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("MONTO_SUBTOTAL"))
                        tabla.Append("</tr>")
                    End If
                Next
                tabla.Append("<tr>")

                Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
                Dim importeTexto As String
                importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("MONTO_TOTAL"))).ToUpper()

                If codeMoneda = "0002" Then
                    tabla.AppendFormat("<td colspan='2'><strong>SON: {0} <span> SOLES </span></strong></td>", importeTexto.Replace(".-", " " + mon))
                ElseIf codeMoneda = "0003" Then
                    tabla.AppendFormat("<td colspan='2'><strong>SON: {0} <span> DOLARES </span></strong></td>", importeTexto.Replace(".-", " " + mon))
                Else
                    tabla.AppendFormat("<td colspan='2'><strong>SON: {0} </strong></td>", importeTexto.Replace(".-", " " + mon))
                End If

                tabla.AppendFormat("<td colspan='2'><strong>SON: {0}</strong></td>", importeTexto.Replace(".-", " " + mon))
                tabla.AppendFormat("<td colspan='2'></td>")
                tabla.Append("</tr>") '------------------------------------------------ 
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='2'><strong>MOTIVO DE LA EMISIÓN DE LA NOTA DE CRÉDITO</strong></td>")
                tabla.AppendFormat("<td ><strong>IGV </strong> </td>")
                tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_IGV"))
                tabla.Append("</tr>") '------------------------------------------------ 
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='2'>Devolución</td>")
                tabla.AppendFormat("<td ><strong>TOTAL {0}</strong></td>", mon)
                tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_TOTAL"))
                tabla.Append("</tr>") '------------------------------------------------             
                tabla.Append("</tbody></table>")

                tabla.Append("</tbody>")
                tabla.Append("</table>")
            End If



        End If
        Return tabla.ToString()
    End Function


    Private Function GenerarTablaListaAnulacionNotasCredito(dt As DataTable, dt2 As DataTable) As String

        res = ""
        resb.Clear()
        '------
        resb.Append("<table id=""tblNotasCredito"" class=""display DTTT_selectable"" border=""0"">")
        resb.Append("<thead>")
        resb.Append("<th>CODIGO</th>")
        resb.Append("<th>DOCUMENTO</th>")
        resb.Append("<th>DOCUMENTO<br />ORIGEN</th>")
        resb.Append("<th>MONEDA</th>")
        resb.Append("<th>IMPORTE<br />ORIGEN</th>")
        resb.Append("<th>IMPORTE<br />NOTA CRÉDITO</th>")
        If p_COMPRA_VENTA_IND = "C" Then
            resb.Append("<th>PROVEEDOR</th>")
        ElseIf p_COMPRA_VENTA_IND = "V" Then
            resb.Append("<th>CLIENTE</th>")
        Else
            resb.Append("<th>PERSONA</th>")
        End If

        resb.Append("<th>EMISIÓN</th>")
        resb.Append("<th>E/D POR <br/> ALMACÉN</th>")
        resb.Append("<th>ESTADO</th>")
        resb.Append("</thead>")
        resb.Append("<tbody>")

        Dim continuar As Boolean = True

        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                If p_ESTADO = "V" Then
                    If dt.Rows(i)("ANULADO_IND").ToString() = "S" Then
                        continuar = False
                    Else
                        continuar = True
                    End If
                ElseIf p_ESTADO = "A" Then
                    If dt.Rows(i)("ANULADO_IND").ToString() = "S" Then
                        continuar = True
                    Else
                        continuar = False
                    End If
                ElseIf p_ESTADO = "T" Then
                    continuar = True
                End If

                If continuar Then
                    Dim cargar As String = "onclick=""irAnularDcto('" + dt.Rows(i)("CODIGO").ToString() + "')"""
                    resb.AppendFormat("<tr >")
                    resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                    resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                    resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO_ORIGEN").ToString())
                    resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("MONEDA").ToString())
                    resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("ORIGEN_IMPORTE").ToString())))
                    resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_TOTAL").ToString())))
                    resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                    resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", dt.Rows(i)("EMISION").ToString())
                    If dt.Rows(i)("ENTREGA_DESPACHO_ALMACEN").ToString() = "S" Then
                        resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", "SI")
                    Else
                        resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", "NO")
                    End If
                    resb.AppendFormat("<td " + cargar + " align='center' >{0}</td>", If(dt.Rows(i)("ANULADO_IND").ToString() = "S", "ANULADO", "VIGENTE"))
                    resb.Append("</tr>")

                End If


            Next
        End If


        'NOTA DE CREDITO GENERICA
        If Not (dt2 Is Nothing) Then
            For i As Integer = 0 To dt2.Rows.Count - 1
                If p_ESTADO = "V" Then
                    If dt2.Rows(i)("ANULADO_IND").ToString() = "S" Then
                        continuar = False
                    Else
                        continuar = True
                    End If
                ElseIf p_ESTADO = "A" Then
                    If dt2.Rows(i)("ANULADO_IND").ToString() = "S" Then
                        continuar = True
                    Else
                        continuar = False
                    End If
                ElseIf p_ESTADO = "T" Then
                    continuar = True
                End If
                If continuar Then
                    Dim cargar As String = "onclick=""irAnularDcto('" + dt2.Rows(i)("CODIGO").ToString() + "','" + dt2.Rows(i)("CTLG_CODE").ToString() + "')"""
                    resb.AppendFormat("<tr  " + cargar + "  >")
                    resb.AppendFormat("<td align='center' >{0}</td>", dt2.Rows(i)("CODIGO").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt2.Rows(i)("DOCUMENTO").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt2.Rows(i)("DOCUMENTO_REF").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt2.Rows(i)("MONEDA").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt2.Rows(i)("DCTO_REF_IMPORTE"))
                    resb.AppendFormat("<td align='center' >{0}</td>", FormatNumber(CDbl(dt2.Rows(i)("IMPORTE_TOTAL")), 2))
                    resb.AppendFormat("<td align='center' >{0}</td>", dt2.Rows(i)("RAZON_SOCIAL").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt2.Rows(i)("EMISION").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", "-")
                    resb.AppendFormat("<td align='center' >{0}</td>", If(dt2.Rows(i)("ANULADO_IND").ToString() = "S", "ANULADO", "VIGENTE"))
                    resb.Append("</tr>")
                End If
            Next
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    Private Function fnGetCodigoQR_fast(ByVal informacionQR As String) As String 'DPORTA 07/12/2022
        Dim qrGenerator = New QRCodeGenerator()
        Dim qrCodeData = qrGenerator.CreateQrCode(informacionQR, QRCodeGenerator.ECCLevel.Q)
        Dim bitMapByteCode As BitmapByteQRCode = New BitmapByteQRCode(qrCodeData)
        Dim bitMap = bitMapByteCode.GetGraphic(20)
        Dim byteImage As Byte()
        Dim MS As MemoryStream = New MemoryStream()
        MS.Write(bitMap, 0, bitMap.Length)
        byteImage = MS.ToArray()
        Return Convert.ToBase64String(byteImage)
    End Function
End Class
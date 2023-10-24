<%@ WebHandler Language="VB" Class="NVMANTI" %>

Imports iTextSharp.text
Imports iTextSharp.text.pdf
Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.IO.FileStream
Imports QRCoder

Public Class NVMANTI : Implements IHttpHandler

    Dim p_IMGQR As String 'para el qr

    Dim OPCION, USUARIO, CTLG_CODE, MONEDA_CODE, CODE_PARAMETRO, TIPO_DCTO, PROD_CODE, NUM_DCTO, p_CODE As String

    Dim USUA_ID, PIDM, CTLG, SCSL, ALMC_CODE, SERIADO_IND, PRECIO_IND, CODIGO_CATEGORIA, TIPO_CAMBIO, p_FVBVTAC_SEQ_DOC, p_FVBVTAC_CODE, p_PLAZO As String

    Dim p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE, p_FECHA_EMISION, p_FECHA_TRANS, p_FECHA_VENCIMIENTO,
       p_CMNT_DCTO, p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, p_MONE_CODE, p_VALOR,
       p_DESCUENTO, p_IGV, p_IMPORTE, p_MOPA_CODE, p_FOPA_CODE, p_CLIE_PIDM, p_ACCION,
       p_CLIE_DOID, p_USVE_USUA_ID, p_COMPLETO_IND, p_CODE_REF, p_DCTO_CODE_REF,
       p_VALOR_CAMBIO, p_USUA_ID, p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
       p_IMPORTE_DONACION, p_IMPORTE_DETRACCION, p_IMPORTE_RETENCION, COPIA_IND,
       p_IMPORTE_PERCEPCION, p_IMPORTE_OTROS, p_IMPR_CODE, p_DETRACCION_IND, p_PERCEPCION_IND, p_RETENCION_IND,
       p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN, p_CODE_COTI, RAZON_SOCIAL,
       p_FECHA_EMISION_PERCEP, p_FECHA_EMISION_DETRAC, p_FECHA_EMISION_RETEN, p_TIPO,
       p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND, p_DETALLES, p_DCTO_SERIE_REF,
       p_DCTO_NUM_REF, p_VALOR_CAMBIO_OFI, p_COD_AUT, p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, p_RESP_PIDM, p_POR_PAGAR As String

    Dim p_EFECTIVO_RECIBIDO, p_EFECTIVO_RECIBIDO_ALTERNO, p_VUELTO, p_VUELTO_ALTERNO, p_NCMOCONT_CODIGO As String 'PARA PROBAR

    Dim p_PLAN_CODE, p_DESC_PLAN, p_TIPO_DCTO_PLAN As String

    Dim p_DESPACHO_VENTA_IND, p_DETALLES_PAGO, p_COBRAR_IND, p_VALIDAR_STOCK_IND As String

    Dim USAR_IGV_IND As String

    Dim SCSL_CODE, DESC, COMP_VENT_IND, DCTO_CODE,
        SERIE_DCTO, VENDEDOR, CLIENTE, PRODUCTO, ESTADO,
        DESDE, HASTA, CODE_VTA, NUM_DOC_COM As String

    'CORREO
    Dim NREMITENTE, DESTINATARIOS, ASUNTO, MENSAJE As String

    'WHATSAPP CLOUD API
    Dim RECIPIENT_PHONE_NUMBER, MENSAJEWHATSAPP As String

    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim g As New Nomade.NC.NCGrupos("Bn")
    Dim e As New Nomade.NM.NMTipodeExistencia("Bn")
    Dim c As New Nomade.NC.NCCuenta("Bn")
    Dim mone As New Nomade.NC.NCMonedas("Bn")
    Dim param As New Nomade.NC.NCParametros("Bn")
    Dim oc As New Nomade.NC.NCCompra("BN")
    Dim fac As New Nomade.NC.NCFactura("Bn")
    Dim modpag As New Nomade.NF.NFModalidadPago("Bn")
    Dim dcto As New Nomade.NC.NCTipoDC("Bn")
    Dim natipomov As New Nomade.NA.NATipoMovimiento("BN")

    Dim ncTipoDcEmpresa As New Nomade.NC.NCTipoDCEmpresa("BN")
    Dim nceCliente As New Nomade.NC.NCECliente("Bn")
    Dim nmUnidadMedida As New Nomade.NM.NMUnidadMedida("Bn")
    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
    Dim nmGestionPrecios As New Nomade.NM.NMGestionPrecios("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim cCotizacion As New Nomade.NV.NVCotizacion("Bn")
    Dim cAnticipo As New Nomade.NV.NVAnticipo("Bn")
    Dim codigoQR As New Nomade.Impresion.CodigoQR("Bn")

    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim oTransaction As New Nomade.DataAccess.Transaccion()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        p_IMGQR = context.Request("p_IMGQR")

        SCSL_CODE = context.Request("SCSL_CODE")
        DESC = context.Request("DESC")
        COMP_VENT_IND = context.Request("COMP_VENT_IND")
        DCTO_CODE = context.Request("DCTO_CODE")
        SERIE_DCTO = context.Request("SERIE_DCTO")
        VENDEDOR = context.Request("VENDEDOR")
        CLIENTE = context.Request("CLIENTE")
        PRODUCTO = context.Request("PRODUCTO")
        ESTADO = context.Request("ESTADO")
        OPCION = context.Request("OPCION")
        DESDE = context.Request("DESDE")
        HASTA = context.Request("HASTA")
        CODE_VTA = context.Request("CODE_VTA")
        NUM_DOC_COM = context.Request("NUM_DOC_COM")
        RAZON_SOCIAL = context.Request("RAZON_SOCIAL")

        CTLG_CODE = vChar(context.Request("CTLG_CODE"))
        OPCION = context.Request("OPCION")
        USUARIO = context.Request("USUARIO")
        MONEDA_CODE = context.Request("MONEDA_CODE")
        CODE_PARAMETRO = context.Request("CODE_PARAMETRO")
        p_FVBVTAC_CODE = context.Request("p_FVBVTAC_CODE")
        p_FVBVTAC_SEQ_DOC = context.Request("p_FVBVTAC_SEQ_DOC")

        'NUEVOS
        USUA_ID = context.Request("USUA_ID")
        PIDM = context.Request("PIDM")
        CTLG = context.Request("CTLG")
        SCSL = context.Request("SCSL")
        ALMC_CODE = context.Request("ALMC_CODE")

        TIPO_DCTO = context.Request("TIPO_DCTO")
        SERIADO_IND = context.Request("SERIADO_IND")
        PROD_CODE = context.Request("PROD_CODE")
        PRECIO_IND = context.Request("PRECIO_IND")
        NUM_DCTO = vChar(context.Request("NUM_DCTO"))
        TIPO_CAMBIO = context.Request("TIPO_CAMBIO")
        p_VALOR_CAMBIO_OFI = context.Request("p_VALOR_CAMBIO_OFI")
        p_COD_AUT = context.Request("p_COD_AUT")
        p_PCTJ_IGV = context.Request("p_PCTJ_IGV")
        p_PLAZO = context.Request("p_PLAZO")

        p_CODE = context.Request("p_CODE") 'CODIGO DE DOCUMENTO DE VENTA 
        'DATOS CABECERA Y DETALLES
        p_NUM_SERIE = vChar(context.Request("p_NUM_SERIE"))
        p_NUM_DCTO = vChar(context.Request("p_NUM_DCTO"))
        p_DCTO_CODE = context.Request("p_DCTO_CODE")
        p_FECHA_EMISION = context.Request("p_FECHA_EMISION")
        p_FECHA_TRANS = context.Request("p_FECHA_TRANS")
        p_FECHA_VENCIMIENTO = context.Request("p_FECHA_VENCIMIENTO")
        p_CMNT_DCTO = context.Request("p_CMNT_DCTO")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_CAJA_CODE = context.Request("p_CAJA_CODE")
        p_MONE_CODE = context.Request("p_MONE_CODE")
        p_VALOR = context.Request("p_VALOR")
        p_DESCUENTO = context.Request("p_DESCUENTO")
        p_IGV = context.Request("p_IGV")
        p_IMPORTE = context.Request("p_IMPORTE")
        p_MOPA_CODE = context.Request("p_MOPA_CODE")
        p_FOPA_CODE = context.Request("p_FOPA_CODE")
        p_CLIE_PIDM = context.Request("p_CLIE_PIDM")
        p_CLIE_DOID = context.Request("p_CLIE_DOID")
        p_USVE_USUA_ID = context.Request("p_USVE_USUA_ID")
        p_COMPLETO_IND = context.Request("p_COMPLETO_IND")

        p_CODE_REF = context.Request("p_CODE_REF")
        p_DCTO_CODE_REF = vChar(context.Request("p_DCTO_CODE_REF"))
        p_DCTO_SERIE_REF = vChar(context.Request("p_DCTO_SERIE_REF"))
        p_DCTO_NUM_REF = context.Request("p_DCTO_NUM_REF")

        p_VALOR_CAMBIO = context.Request("p_VALOR_CAMBIO")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_ISC = context.Request("p_ISC")
        p_IMPORTE_EXO = context.Request("p_IMPORTE_EXO")
        p_IMPORTE_INA = context.Request("p_IMPORTE_INA")
        p_IMPORTE_GRA = context.Request("p_IMPORTE_GRA")
        p_IMPORTE_REDONDEO = context.Request("p_IMPORTE_REDONDEO")
        p_IMPORTE_DONACION = context.Request("p_IMPORTE_DONACION")
        p_IMPORTE_DETRACCION = context.Request("p_IMPORTE_DETRACCION")
        p_IMPORTE_RETENCION = context.Request("p_IMPORTE_RETENCION")
        p_IMPORTE_PERCEPCION = context.Request("p_IMPORTE_PERCEPCION")
        p_IMPORTE_OTROS = context.Request("p_IMPORTE_OTROS")
        p_IMPR_CODE = context.Request("p_IMPR_CODE")
        p_DETRACCION_IND = context.Request("p_DETRACCION_IND")
        p_PERCEPCION_IND = context.Request("p_PERCEPCION_IND")
        p_RETENCION_IND = context.Request("p_RETENCION_IND")
        p_NUM_DCTO_PERCEP = vChar(context.Request("p_NUM_DCTO_PERCEP"))
        p_NUM_DCTO_DETRAC = vChar(context.Request("p_NUM_DCTO_DETRAC"))
        p_NUM_DCTO_RETEN = vChar(context.Request("p_NUM_DCTO_RETEN"))
        p_FECHA_EMISION_PERCEP = context.Request("p_FECHA_EMISION_PERCEP")
        p_FECHA_EMISION_DETRAC = context.Request("p_FECHA_EMISION_DETRAC")
        p_FECHA_EMISION_RETEN = context.Request("p_FECHA_EMISION_RETEN")
        p_IMPRFAC_PERCEP = context.Request("p_IMPRFAC_PERCEP")
        p_NRO_CUENTA_DETRAC = vChar(context.Request("p_NRO_CUENTA_DETRAC"))
        p_SCSL_EXONERADA_IND = context.Request("p_SCSL_EXONERADA_IND")
        p_IGV_IMPR_IND = context.Request("p_IGV_IMPR_IND")
        p_DETALLES = vChar(context.Request("p_DETALLES"))

        p_RESP_PIDM = context.Request("p_RESP_PIDM")
        p_FACTOR_RENTA = context.Request("p_FACTOR_RENTA")
        p_IMPUESTO_RENTA = context.Request("p_IMPUESTO_RENTA")
        '
        CODIGO_CATEGORIA = context.Request("CODIGO_CATEGORIA")
        'Plantillas 
        p_PLAN_CODE = context.Request("p_PLAN_CODE")
        p_DESC_PLAN = vChar(context.Request("p_DESC_PLAN"))
        p_TIPO_DCTO_PLAN = context.Request("p_TIPO_DCTO_PLAN")
        p_DETALLES_PAGO = context.Request("p_DETALLES_PAGO")
        p_DESPACHO_VENTA_IND = context.Request("p_DESPACHO_VENTA_IND")
        p_COBRAR_IND = context.Request("p_COBRAR_IND")
        p_VALIDAR_STOCK_IND = context.Request("p_VALIDAR_STOCK_IND")

        p_CODE_COTI = context.Request("p_CODE_COTI")
        COPIA_IND = context.Request("COPIA_IND")
        USAR_IGV_IND = context.Request("USAR_IGV_IND")
        p_TIPO = context.Request("p_TIPO")
        p_ACCION = context.Request("p_ACCION")

        'correo
        NREMITENTE = context.Request("NREMITENTE")
        DESTINATARIOS = context.Request("DESTINATARIOS")
        ASUNTO = context.Request("asunto")
        MENSAJE = context.Request("MENSAJE")

        'WHATSAPP CLOUD API
        RECIPIENT_PHONE_NUMBER = context.Request("RECIPIENT_PHONE_NUMBER")
        MENSAJEWHATSAPP = context.Request("MENSAJEWHATSAPP")

        p_POR_PAGAR = context.Request("p_POR_PAGAR")

        'para prueba
        p_EFECTIVO_RECIBIDO = context.Request("p_EFECTIVO_RECIBIDO")
        p_EFECTIVO_RECIBIDO_ALTERNO = context.Request("p_EFECTIVO_RECIBIDO_ALTERNO")
        p_VUELTO = context.Request("p_VUELTO")
        p_VUELTO_ALTERNO = context.Request("p_VUELTO_ALTERNO")

        p_NCMOCONT_CODIGO = context.Request("p_NCMOCONT_CODIGO")

        Try

            Select Case OPCION

                Case "GET_ANTICIPO"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable
                    oDT = cAnticipo.fnGetAnticipo(p_CODE)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dtc As DataTable
                    dtc = cCotizacion.ListarCotizacionCliente_Busq(IIf(p_CODE_COTI Is Nothing, "", p_CODE_COTI), RAZON_SOCIAL, "", "", "", "N", "", "", "0000-00-00", "0000-00-00", CTLG_CODE, SCSL_CODE)
                    If Not (dtc Is Nothing) Then
                        resb.Append("[")
                        For i As Integer = 0 To dtc.Rows.Count - 1
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & dtc(i).Item("CODE").ToString & """,")
                            resb.Append("""MONEDA_CODE"" : " & """" & dtc(i).Item("MONEDA").ToString & """,")
                            resb.Append("""SALDO"" : " & """" & dtc(i).Item("SALDO").ToString & """,")
                            resb.Append("""GLOSA"" : " & """" & dtc(i).Item("GLOSA").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"" : " & """" & dtc(i).Item("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""IMPORTE"" : " & """" & dtc(i).Item("IMPORTE").ToString & """,")
                            resb.Append("""NUM_DCTO"" :" & """" & IIf(dtc(i).Item("NUM_DCTO").ToString = String.Empty, dtc(i).Item("CODE").ToString, dtc(i).Item("NUM_DCTO").ToString) & """")
                            resb.Append("},")
                        Next
                        resb.Append("]")
                    End If
                    resb = resb.Replace(",]", "]")
                    res = resb.ToString()
                Case "2"
                    'context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dtc As DataTable
                    dtc = cAnticipo.ListarAnticiposCliente(IIf(p_CODE_COTI Is Nothing, "", p_CODE_COTI), CLIENTE, TIPO_DCTO, NUM_DCTO, SERIE_DCTO, If(p_FECHA_EMISION Is Nothing, Utilities.fechaLocal(p_FECHA_EMISION), Nothing), p_TIPO, p_CTLG_CODE, p_SCSL_CODE)
                    If Not (dtc Is Nothing) Then
                        Select Case p_ACCION
                            Case "1"
                                resb.Append("<table id=""tabla_det_anteriores"">")
                                resb.Append("<thead>")
                                resb.Append("<tr>")
                                resb.Append("<th>CODIGO</th>")
                                resb.Append("<th>MONEDA</th>")
                                resb.Append("<th>MONTO MONEDA BASE (SOL)</th>")
                                resb.Append("<th>MONTO MONEDA ALTERNA (DOL)</th>")
                                resb.Append("<th>VALOR DE CAMBIO APLICADO</th>")
                                resb.Append("</tr>")
                                resb.Append("</thead>")
                                resb.Append("<tbody>")
                                For i As Integer = 0 To dtc.Rows.Count - 1
                                    resb.Append("<tr>")
                                    resb.Append("<td>" & dtc(i).Item("codigo").ToString & "</td>")
                                    resb.Append("<td>" & dtc(i).Item("moneda").ToString & "</td>")
                                    resb.Append("<td>" & dtc(i).Item("monto_moba").ToString & "</td>")
                                    resb.Append("<td>" & dtc(i).Item("monto_moal").ToString & "</td>")
                                    resb.Append("<td>" & dtc(i).Item("tipo_cambio").ToString & "</td>")
                                    resb.Append("</tr>")
                                Next
                                resb.Append("</tbody>")
                                resb.Append("</table>")
                            Case "2"
                                context.Response.ContentType = "application/json; charset=utf-8"
                                resb.Append("[")
                                For i As Integer = 0 To dtc.Rows.Count - 1
                                    resb.Append("{")
                                    resb.Append("""CODIGO"" :" & """" & dtc(i).Item("codigo").ToString & """,")
                                    resb.Append("""MONEDA"" : " & """" & dtc(i).Item("moneda").ToString & """,")
                                    resb.Append("""MONTO_MOBA"" : " & """" & Math.Round(Decimal.Parse(dtc(i).Item("monto_moba").ToString), 2) & """,")
                                    resb.Append("""MONTO_MOAL"" : " & """" & Math.Round(Decimal.Parse(dtc(i).Item("monto_moal").ToString), 2) & """,")
                                    resb.Append("""NUM_DCTO"" : " & """" & dtc(i).Item("NUM_DCTO").ToString & """,")
                                    resb.Append("""GLOSA"" : " & """" & dtc(i).Item("GLOSA").ToString & """,")
                                    resb.Append("""TIPO_CAMBIO"" :" & """" & dtc(i).Item("tipo_cambio").ToString & """")
                                    resb.Append("},")
                                Next
                                resb.Append("]")
                                resb = resb.Replace(",]", "]")
                            Case "3"
                                context.Response.ContentType = "application/json; charset=utf-8"
                                Dim sumax As Decimal = 0
                                For i As Integer = 0 To dtc.Rows.Count - 1
                                    sumax += Decimal.Parse(dtc(i).Item("monto_moba").ToString)
                                Next
                                resb.Append("[{" & """SUMA"" :" & """" & sumax & """" & "}]")
                            Case "4"
                                context.Response.ContentType = "application/json; charset=utf-8"
                                Dim sumax As Decimal = 0
                                For i As Integer = 0 To dtc.Rows.Count - 1
                                    sumax += Decimal.Parse(dtc(i).Item("monto_moal").ToString)
                                Next
                                resb.Append("[{" & """SUMA"" :" & """" & sumax & """" & "}]")
                            Case "5"
                                context.Response.ContentType = "application/json; charset=utf-8"
                                resb.Append("[")
                                For Each row As DataRow In dtc.Rows

                                    resb.Append("{")
                                    resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                    resb.Append("""SECUENCIA"":""" & row("SECUENCIA").ToString & """,")
                                    resb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                                    resb.Append("""DESC_EMPRESA"":""" & row("DESC_EMPRESA").ToString & """,")
                                    resb.Append("""SUCURSAL"":""" & row("SUCURSAL").ToString & """,")
                                    resb.Append("""DESC_SUCURSAL"":""" & row("DESC_SUCURSAL").ToString & """,")
                                    resb.Append("""CAJA"":""" & row("CAJA").ToString & """,")
                                    resb.Append("""DESC_CAJA"":""" & row("DESC_CAJA").ToString & """,")
                                    resb.Append("""TIPO_DCTO"":""" & row("TIPO_DCTO").ToString & """,")
                                    resb.Append("""TIPO_DCTO_SUNAT"":""" & row("TIPO_DCTO_SUNAT").ToString & """,")
                                    resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                                    resb.Append("""EMISION"":""" & row("EMISION").ToString & """,")
                                    resb.Append("""NUM_DCTO"":""" & row("NUM_DCTO").ToString & """,")
                                    resb.Append("""RAZON_SOCIAL"":""" & row("RAZON_SOCIAL").ToString & """,")
                                    resb.Append("""MONEDA"":""" & row("MONEDA").ToString & """,")
                                    resb.Append("""SIMBOLO_MONEDA"":""" & row("SIMBOLO_MONEDA").ToString & """,")
                                    resb.Append("""COMPLETO"":""" & row("COMPLETO").ToString & """,")
                                    resb.Append("""PROVISIONADO"":""" & row("PROVISIONADO").ToString & """,")
                                    resb.Append("""ANULADO"":""" & row("ANULADO").ToString & """,")
                                    resb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                                    resb.Append("""CLIE_DCTO_SUNAT"":""" & row("CLIE_DCTO_SUNAT").ToString & """,")
                                    resb.Append("""CLIE_DCTO_DESC"":""" & row("CLIE_DCTO_DESC").ToString & """,")
                                    resb.Append("""CLIE_DCTO_NRO"":""" & row("CLIE_DCTO_NRO").ToString & """,")
                                    resb.Append("""DCTO_SERIE"":""" & row("DCTO_SERIE").ToString & """,")
                                    resb.Append("""DCTO_NRO"":""" & row("DCTO_NRO").ToString & """,")
                                    resb.Append("""DCTO_CODE"":""" & row("DCTO_CODE").ToString & """,")
                                    resb.Append("""TRANSACCION"":""" & row("TRANSACCION").ToString & """,")
                                    resb.Append("""VENCIMIENTO"":""" & row("VENCIMIENTO").ToString & """,")
                                    resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                                    resb.Append("""VENCIMIENTO"":""" & row("VENCIMIENTO").ToString & """,")
                                    resb.Append("""VALOR"":""" & row("VALOR").ToString & """,")
                                    resb.Append("""DESCUENTO"":""" & row("DESCUENTO").ToString & """,")
                                    resb.Append("""IGV"":""" & row("IGV").ToString & """,")
                                    resb.Append("""IMPORTE"":""" & row("IMPORTE").ToString & """,")
                                    resb.Append("""MOPA"":""" & row("MOPA").ToString & """,")
                                    resb.Append("""FOPA"":""" & row("FOPA").ToString & """,")
                                    resb.Append("""CLIE_PIDM"":""" & row("CLIE_PIDM").ToString & """,")
                                    resb.Append("""CLIE_DOID"":""" & row("CLIE_DOID").ToString & """,")
                                    resb.Append("""USVE_USUA_ID"":""" & row("USVE_USUA_ID").ToString & """,")
                                    resb.Append("""ANULAC_ID"":""" & row("ANULAC_ID").ToString & """,")
                                    resb.Append("""FECHA_ANULAC"":""" & row("FECHA_ANULAC").ToString & """,")
                                    resb.Append("""CMNT_ANULAC"":""" & row("CMNT_ANULAC").ToString & """,")
                                    resb.Append("""COMPLETO_IND"":""" & row("COMPLETO_IND").ToString & """,")
                                    resb.Append("""DCTO_CODE_REF"":""" & row("DCTO_CODE_REF").ToString & """,")
                                    resb.Append("""DCTO_TIPO_CODE_REF"":""" & row("DCTO_TIPO_CODE_REF").ToString & """,")
                                    resb.Append("""VALOR_CAMBIO"":""" & row("VALOR_CAMBIO").ToString & """,")
                                    resb.Append("""ISC"":""" & row("ISC").ToString & """,")
                                    resb.Append("""IMPORTE_EXO"":""" & row("IMPORTE_EXO").ToString & """,")
                                    resb.Append("""IMPORTE_INA"":""" & row("IMPORTE_INA").ToString & """,")
                                    resb.Append("""IMPORTE_GRA"":""" & row("IMPORTE_GRA").ToString & """,")
                                    resb.Append("""REDONDEO"":""" & row("REDONDEO").ToString & """,")
                                    resb.Append("""DONACION"":""" & row("DONACION").ToString & """,")
                                    resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                                    resb.Append("""RETENCION"":""" & row("RETENCION").ToString & """,")
                                    resb.Append("""PERCEPCION"":""" & row("PERCEPCION").ToString & """,")
                                    resb.Append("""DETRACCION_IND"":""" & row("DETRACCION_IND").ToString & """,")
                                    resb.Append("""PERCEPCION_IND"":""" & row("PERCEPCION_IND").ToString & """,")
                                    resb.Append("""RETENCION_IND"":""" & row("RETENCION_IND").ToString & """,")
                                    resb.Append("""NUM_DCTO_PERCEP"":""" & row("NUM_DCTO_PERCEP").ToString & """,")
                                    resb.Append("""NUM_DCTO_DETRAC"":""" & row("NUM_DCTO_DETRAC").ToString & """,")
                                    resb.Append("""NUM_DCTO_RETEN"":""" & row("NUM_DCTO_RETEN").ToString & """,")
                                    resb.Append("""FECHA_PERCEP"":""" & row("FECHA_PERCEP").ToString & """,")
                                    resb.Append("""FECHA_DETRAC"":""" & row("FECHA_DETRAC").ToString & """,")
                                    resb.Append("""FECHA_RETEN"":""" & row("FECHA_RETEN").ToString & """,")
                                    resb.Append("""IMPR_PERCEP"":""" & row("IMPR_PERCEP").ToString & """,")
                                    resb.Append("""NRO_CUENTA_DETRAC"":""" & row("NRO_CUENTA_DETRAC").ToString & """,")
                                    resb.Append("""DCTO_REF_SERIE"":""" & row("DCTO_REF_SERIE").ToString & """,")
                                    resb.Append("""DCTO_REF_NRO"":""" & row("DCTO_REF_NRO").ToString & """,")
                                    resb.Append("""SCSL_EXONERADA_IND"":""" & row("SCSL_EXONERADA_IND").ToString & """,")
                                    resb.Append("""IGV_IMPR_IND"":""" & row("IGV_IMPR_IND").ToString & """,")
                                    resb.Append("""VALOR_CAMBIO_OFI"":""" & row("VALOR_CAMBIO_OFI").ToString & """,")
                                    resb.Append("""PCTJ_IGV"":""" & row("PCTJ_IGV").ToString & """,")
                                    resb.Append("""PAGADO_IND"":""" & row("PAGADO_IND").ToString & """,")
                                    resb.Append("""DESPACHADO_IND"":""" & row("DESPACHADO_IND").ToString & """,")
                                    resb.Append("""RESPONSABLE_PAGO_PIDM"":""" & row("RESPONSABLE_PAGO_PIDM").ToString & """,")
                                    resb.Append("""RESPONSABLE_PAGO"":""" & row("RESPONSABLE_PAGO").ToString & """,")
                                    resb.Append("""USUA_ID"":""" & row("USUA_ID").ToString & """,")
                                    resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """,")
                                    resb.Append("""IMPRESORA_CODE"":""" & row("IMPRESORA_CODE").ToString & """,")
                                    'resb.Append("""IMPR_AUTORIZACION"":""" & row("IMPR_AUTORIZACION").ToString & """,")
                                    resb.Append("""IMPR_SERIE"":""" & row("IMPR_SERIE").ToString & """,")
                                    resb.Append("""COD_AUT"":""" & row("COD_AUT").ToString & """,")
                                    resb.Append("""MOVCONT_CODE"":""" & row("MOVCONT_CODE").ToString & """,")
                                    resb.Append("""ESTADO_DOC_ELECT"":""" & row("ESTADO_DOC_ELECT").ToString & """,")
                                    resb.Append("""VENTA_RAPIDA_IND"":""" & row("VENTA_RAPIDA_IND").ToString & """")
                                    resb.Append("},")
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                        End Select
                    Else
                        If Not (p_ACCION = "1") Then
                            context.Response.ContentType = "application/json; charset=utf-8"
                        End If
                    End If
                    res = resb.ToString()

                Case "5" 'CREAR DOCUMENTO ANTICIPO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim cadena As Array
                    If (p_POR_PAGAR = "S") Then ' CUANDO SELECCIONA EL MODO POR COBRAR
                        cadena = cAnticipo.CompletarAnticipoClientePorCobrar(p_CTLG_CODE, p_SCSL_CODE, p_DCTO_CODE, p_CLIE_PIDM, p_DCTO_CODE_REF,
                                                                  p_MONE_CODE, p_VALOR, p_VALOR_CAMBIO_OFI,
                                                                  If(p_FECHA_EMISION = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION)),
                                                                  p_USUA_ID, p_DETALLES_PAGO, If(p_COD_AUT = "", "0", p_COD_AUT),
                                                                  p_USVE_USUA_ID, p_MOPA_CODE, p_CLIE_DOID, p_DESCUENTO, p_IGV, p_IMPORTE,
                                                                  p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
                                                                  p_IMPORTE_DONACION, p_IMPORTE_DETRACCION, p_IMPORTE_DETRACCION,
                                                                  p_IMPORTE_PERCEPCION, p_DETRACCION_IND, p_PERCEPCION_IND,
                                                                  p_RETENCION_IND, p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN,
                                                                  If(p_FECHA_EMISION_PERCEP = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_PERCEP)),
                                                                  If(p_FECHA_EMISION_DETRAC = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_PERCEP)),
                                                                  If(p_FECHA_EMISION_RETEN = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_PERCEP)),
                                                                  p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND, p_PCTJ_IGV, p_CMNT_DCTO)
                    Else
                        cadena = cAnticipo.CompletarCotizacionCliente(p_CTLG_CODE, p_SCSL_CODE, p_DCTO_CODE, p_CLIE_PIDM, p_DCTO_CODE_REF,
                                                                  p_MONE_CODE, p_VALOR, p_VALOR_CAMBIO_OFI,
                                                                  If(p_FECHA_EMISION = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION)),
                                                                  p_USUA_ID, p_DETALLES_PAGO, If(p_COD_AUT = "", "0", p_COD_AUT),
                                                                  p_USVE_USUA_ID, p_MOPA_CODE, p_CLIE_DOID, p_DESCUENTO, p_IGV, p_IMPORTE,
                                                                  p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
                                                                  p_IMPORTE_DONACION, p_IMPORTE_DETRACCION, p_IMPORTE_DETRACCION,
                                                                  p_IMPORTE_PERCEPCION, p_DETRACCION_IND, p_PERCEPCION_IND,
                                                                  p_RETENCION_IND, p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN,
                                                                  If(p_FECHA_EMISION_PERCEP = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_PERCEP)),
                                                                  If(p_FECHA_EMISION_DETRAC = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_PERCEP)),
                                                                  If(p_FECHA_EMISION_RETEN = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_PERCEP)),
                                                                  p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND, p_PCTJ_IGV,
                                                                  p_EFECTIVO_RECIBIDO, p_EFECTIVO_RECIBIDO_ALTERNO, p_VUELTO, p_VUELTO_ALTERNO, p_CMNT_DCTO)
                    End If


                    If Not (cadena Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & cadena(0).ToString & """")
                        'resb.Append("""DATOS_QR"" :" & """" & cadena(1).ToString & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()


                Case "GET_DOC_ANTI"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable()
                    oDT = nvVenta.fnGetDocAnti(p_CODE)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "GEN_ASIENTO" ' Suma fecha de emision más plazo de pago

                    'Dim oNCParametros As New Nomade.NC.NCParametros("Bn")
                    'Dim oDT_Param As New DataTable()
                    'oDT_Param = oNCParametros.ListarParametros("ECON", "")
                    'If oDT_Param Is Nothing Then
                    '    Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    'End If
                    'If oDT_Param.Rows.Count = 0 Then
                    '    Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    'End If
                    'Dim sUsaContab As String = oDT_Param.Rows(0)("VALOR")
                    'If Not sUsaContab.Equals("S") Then
                    '    Throw New System.Exception("[Advertencia]: La empresa no tiene la opción contable activada.")
                    'End If

                    'Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")

                    ''Dim oDT_ConfigAsientoDocVenta As New DataTable
                    ''oDT_ConfigAsientoDocVenta = oCTMovimientoContable.fnGetConfigAsientoDocAnticipo(p_CODE)
                    'Dim oDT_Asiento As New DataTable
                    'oDT_Asiento = oCTMovimientoContable.fnGetAsientoContDocAnticipo(p_CODE)
                    Dim oCTGeneracionAsientos As New Nomade.CT.CTGeneracionAsientos()
                    Dim sCodMovCont As String = ""

                    sCodMovCont = oCTGeneracionAsientos.GenerarAsientoAnticipo(p_CODE, p_NCMOCONT_CODIGO, USUA_ID) 'DPORTA 02/02/2023

                    Dim dtCabecera As New DataTable
                    dtCabecera = nvVenta.ListarCabAnticipo(p_CODE)

                    Dim strCodAsientoCobroVenta As String
                    strCodAsientoCobroVenta = oCTGeneracionAsientos.GenerarAsientoCobroAnticipo(p_CODE, dtCabecera.Rows(0)("ASIENTO_COBRO"), dtCabecera.Rows(0)("PAGADO_IND"))
                    'Dim oDT_DocVenta As New DataTable
                    'oDT_DocVenta = nvVenta.fnGetDocAnti(p_CODE)
                    'If oDT_DocVenta Is Nothing Then
                    '    Throw New System.Exception("No se pudo generar el Asiento Contable. No se encontró el documento de anticipo.")
                    'End If

                    'Dim oDR_DocVenta As DataRow = oDT_DocVenta.NewRow
                    'oDR_DocVenta = oDT_DocVenta.Rows(0)

                    'Dim sAnuladoInd As String = oDR_DocVenta("AnuladoInd")
                    'If sAnuladoInd.Equals("S") Then
                    '    Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de anticipo está anulado.")
                    'End If

                    'Dim sCompletoInd As String = oDR_DocVenta("CompletoInd")
                    'If sCompletoInd.Equals("N") Then
                    '    Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de anticipo no está completado.")
                    'End If

                    'oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    'Dim sFechaEmision As String = Utilities.fechaLocal(oDR_DocVenta("FECHA_EMISION"))
                    'Dim sFechaTransac As String = Utilities.fechaLocal(oDR_DocVenta("FECHA_TRANS"))
                    'sCodMovCont = oCTMovimientoContable.fnAgregarMovCont(oDR_DocVenta("CodEmpresa"), oDR_DocVenta("CodEstablec"), oDR_DocVenta("ANIO_PERIODO"),
                    '                                                     oDR_DocVenta("MES_PERIODO"), p_NCMOCONT_CODIGO, "A", sFechaEmision, sFechaTransac,
                    '                                                     oDR_DocVenta("GLOSA"), oDR_DocVenta("MONE_CODE"), oDR_DocVenta("TC"), oDR_DocVenta("PIDM"),
                    '                                                     oDR_DocVenta("CodAnticipo"), USUA_ID,, oTransaction)

                    'If oDT_Asiento Is Nothing Then
                    '    Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. No se pudo obtener la configuración del asiento contable.")
                    'End If

                    'Dim iItem As Integer = 0
                    'Dim sFechaDoc As String
                    'For Each oDR As DataRow In oDT_Asiento.Rows
                    '    iItem = iItem + 1
                    '    sFechaDoc = Utilities.fechaLocal(oDR("FECHA_DCTO"))
                    '    Dim sCOD_CCOSTO_CAB As String = IIf(IsDBNull(oDR("COD_CCOSTO_CAB")), Nothing, oDR("COD_CCOSTO_CAB"))
                    '    Dim sCOD_CCOSTO_DET As String = IIf(IsDBNull(oDR("COD_CCOSTO_DET")), Nothing, oDR("COD_CCOSTO_DET"))
                    '    oCTMovimientoContable.fnAgregarMovContabDet(sCodMovCont, iItem, oDR("ITEM_TIPO"), oDR("GLOSA"), oDR("PIDM"), oDR("COD_DOC_IDENT"), oDR("COD_SUNAT_DOC_IDENT"),
                    '                                                oDR("DOC_IDENT"), oDR("NRO_DOC_IDENT"), sCOD_CCOSTO_CAB, sCOD_CCOSTO_DET, oDR("CCOSTO"), oDR("COD_DCTO"),
                    '                                                oDR("COD_SUNAT_DCTO"), oDR("DCTO"), oDR("SERIE_DCTO"), oDR("NRO_DCTO"), sFechaDoc, oDR("COD_MONE"),
                    '                                                oDR("COD_SUNAT_MONE"), oDR("CTA_ID"), oDR("CTA"), oDR("TC"), oDR("DEBE"), oDR("HABER"),
                    '                                                oDR("DEBE_MN"), oDR("HABER_MN"), oDR("DEBE_ME"), oDR("HABER_ME"), oTransaction)
                    'Next

                    'nvVenta.fnActualizarCodContabDocAnticipo(p_CODE, sCodMovCont, oTransaction)

                    'oTransaction.fnCommitTransaction()

                    res = sCodMovCont

                'Case "LPCQRANTI" 'Parametros para el QR
                '    context.Response.ContentType = "application/json; charset=utf-8"
                '    dt = nvVenta.ListarParametrosQRAnticipo(If(p_CODE_COTI = Nothing, "", p_CODE_COTI))
                '    If Not (dt Is Nothing) Then
                '        resb.Append("[")
                '        For Each MiDataRow As DataRow In dt.Rows
                '            resb.Append("{")
                '            resb.Append("""RUC_EMISOR"" :" & """" & MiDataRow("RUC_EMISOR").ToString & """,")
                '            resb.Append("""CODIGO_DOC"" :" & """" & MiDataRow("CODIGO_DOC").ToString & """,")
                '            resb.Append("""SERIE"" :" & """" & MiDataRow("SERIE").ToString & """,")
                '            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")
                '            resb.Append("""TOTAL_IGV"" :" & """" & MiDataRow("TOTAL_IGV").ToString & """,")
                '            resb.Append("""IMPORTE_TOTAL"" :" & """" & MiDataRow("IMPORTE_TOTAL").ToString & """,")
                '            resb.Append("""FECHA_EMISION"" :" & """" & MiDataRow("FECHA_EMISION").ToString & """,")
                '            resb.Append("""TIPO_DOC_ADQUIRIENTE"" :" & """" & MiDataRow("TIPO_DOC_ADQUIRIENTE").ToString & """,")
                '            resb.Append("""NUMERO_DOC_ADQUIRIENTE"" :" & """" & MiDataRow("NUMERO_DOC_ADQUIRIENTE").ToString & """")
                '            resb.Append("}")
                '            resb.Append(",")
                '        Next
                '        resb.Append("{}")
                '        resb = resb.Replace(",{}", String.Empty)
                '        resb.Append("]")
                '    End If
                '    res = resb.ToString()

                Case "GQR_ANTICIPO" 'Parametros para guardar el QR
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = nvVenta.GuardarCodigoQR_ANTICIPO(p_CODE_COTI, p_IMGQR)
                Case "GENERAR_PDF" 'DPORTA
                    Dim msgError As String = "OK"
                    Dim dtCabecera As New DataTable
                    'dtCabecera = cAnticipo.ListarAnticiposCliente(p_CODE, "", "", "", "", Nothing, "5", "", "")
                    If p_CODE.Length = 9 Then 'And dtCabecera.Rows(0)("PAGADO_IND") = "S" Then
                        Try
                            GenerarPDF(p_CODE, p_CTLG_CODE)
                        Catch ex As Exception
                            msgError = "ERROR: " + ex.Message
                        End Try
                    Else
                        msgError = "ERROR"
                    End If
                    res = msgError.ToString()
                Case "correo"
                    Dim email As New Nomade.Mail.NomadeMail("Bn")
                    'USAR_IGV_IND = context.Request("USAR_IGV_IND")
                    'CAMBIAR EL primer NREMITENTE POR EL NOMBRE DEL USUARIO
                    'If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_CODE & ".pdf") Then
                    ' email.enviar(NREMITENTE, NREMITENTE, DESTINATARIOS, ASUNTO, MENSAJE)
                    GenerarPDF(p_CODE, p_CTLG_CODE)
                    'End If
                    Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_CODE & ".pdf"

                    MENSAJE += "<br/>"
                    Dim documento As String = ""
                    documento = GenerarDctoCorreo(p_CODE, USAR_IGV_IND, "") 'GenerarDctoCorreo(p_CODE, USAR_IGV_IND, "")
                    MENSAJE += documento
                    'Dim piePagina As String = ""
                    'piePagina = "<br/><table><tr><td colspan='4'>&nbsp;</td></tr>"
                    'piePagina += "<tr><td colspan='4' style='text-align: left;font-size:10px;'>DOCUMENTO DE VENTA ENVÍADO AUTOMÁTICAMENTE POR EL SISTEMA: NOMADE ERP 3.0 </td></tr>"
                    'piePagina += "<tr><td colspan='4' style='text-align: left;font-size:10px'><span>Producto de Software desarrollado por&nbsp;<a href='http://www.orbitum.org' target='_blank'>Orbitum Net</a></span></td></tr>"
                    'piePagina = "</table>"
                    'MENSAJE += piePagina

                    email.enviar(NREMITENTE, NREMITENTE, DESTINATARIOS, ASUNTO, MENSAJE, datoAj)
                Case "whatsapp"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim whatsapp As New Nomade.Mail.NomadeMail("Bn")
                    Dim Plantilla As String = "Documento Venta"
                    USAR_IGV_IND = context.Request("USAR_IGV_IND")

                    'Dim f_Name As String = w_NAME.Substring(0, w_NAME.IndexOf(" "))
                    Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_CODE & ".pdf"

                    'se asume por defecto que el pdf existe

                    If File.Exists(datoAj) = False Then
                        GenerarPDF(p_CODE, p_CTLG_CODE)
                    End If
                    whatsapp.enviarWhatsapp(RECIPIENT_PHONE_NUMBER, p_CODE, MENSAJEWHATSAPP, Plantilla, datoAj)
                Case "IMPR"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    USAR_IGV_IND = context.Request("USAR_IGV_IND") ' Si es nothing se usará el de la tabla
                    COPIA_IND = context.Request("COPIA_IND") ' Si es nothing se imprimirá como si no fuera copia                        
                    res = GenerarDctoImprimir(p_CODE, p_CTLG_CODE, USAR_IGV_IND, COPIA_IND)

                    'Case "5" 'Generar tabla para impresion de detalle 
                    '    context.Response.ContentType = "application/text; charset=utf-8"
                    '    dt = nvVenta.ListarDocVenta_Busq("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE)
                    '    res = GenerarTablaDocumentoImprimir(dt)

            End Select
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub



    ''' <summary>
    ''' Obtiene los datos de un documento de venta y sus detalles, y los devuelve como una tabla con formato de ticket
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GenerarDctoImprimir(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal USAR_IGV_IND As String, ByVal COPIA_IND As String) As String
        Dim tabla As New StringBuilder
        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        ' Dim dtEmpresas As New DataTable

        'Dim dtParametroLogo As New DataTable
        'Dim dtParametroPiePagina As New DataTable

        'dtCabecera = cAnticipo.ListarAnticiposCliente(p_CODE, "", "", "", "", Nothing, "1", p_CTLG_CODE, p_SCSL_CODE)
        dtCabecera = cAnticipo.ListarAnticiposCliente(p_CODE, "", "", "", "", Nothing, "4", "", "") 'nvVenta.ListarDocumentosVenta(p_CODE, "", "", "", "", "", "", "", "")
        dtDetalles = Nothing

        'dtParametroLogo = New Nomade.NC.NCParametros("Bn").ListarParametros("LOVE", "")
        'dtParametroPiePagina = New Nomade.NC.NCParametros("Bn").ListarParametros("PPAG", "")

        'dtDetalles = nvVenta.ListarDetalleDocumentoVenta(p_CODE, "0", "")
        If dtCabecera IsNot Nothing Then
            Dim indica As Boolean = True
            Try
                If dtCabecera.Rows(0)("DCTO_CODE_REF").ToString().Length = 0 Then
                    indica = False
                End If
                'If p_CODE_COTI.Length = 0 Then
                '    indica = False
                'End If
            Catch ex As Exception
                indica = False
            End Try

            If indica Then
                dtDetalles = cCotizacion.ListarDetalleCotizacionCliente(If(p_CODE_COTI Is Nothing, dtCabecera.Rows(0)("DCTO_CODE_REF"), p_CODE_COTI), "0", "")
            End If

            Dim decimalIGV As Decimal = Decimal.Parse(dtCabecera.Rows(0)("PCTJ_IGV")) / 100

            Dim incIgv As String
            If USAR_IGV_IND = Nothing Then
                incIgv = dtCabecera.Rows(0)("IGV_IMPR_IND")
            Else
                incIgv = USAR_IGV_IND
            End If

            Dim exoneradaInd = dtCabecera.Rows(0)("SCSL_EXONERADA_IND")

            Dim rutaLogo As String = ""
            'VARIABLE PARA COLOCAR EL QR EN EL PDF
            Dim rutaQr As String = ""
            'VARIABLE PARA COLOCAR LA INFORMACIÓN DEL QR
            Dim cadenaQR As String = ""
            'PIE DE PAGINA EDITABLE
            'Dim pie_pagina As String = ""

            Dim mon As String = dtCabecera.Rows(0)("SIMBOLO_MONEDA") 'Simbolo de moneda     
            Dim descMon As String = dtCabecera.Rows(0)("DESC_MONEDA") 'Descripcion de moneda        
            Dim codeMoneda As String = dtCabecera.Rows(0)("MONEDA") 'Código de Moneda

            Dim totalSinDscto As Decimal = 0
            Dim totalDsctoSinIgv As Decimal = 0
            'OBTENER LOGO
            'dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("EMPRESA"), "A", "")
            rutaLogo = dtCabecera.Rows(0)("RUTA_IMAGEN").ToString

            'OBTENER EL TEXTO QUE VA A IR EN LA IMPRESION COMO PIE DE PAGINA
            'pie_pagina = dtParametroPiePagina(0)("DESCRIPCION_DETALLADA").ToString
            'Cadena con la información del QR
            cadenaQR = "6" + "|" + dtCabecera(0)("RUC").ToString + "|" + dtCabecera(0)("CLIE_DOID").ToString + "|" + dtCabecera(0)("CLIE_DCTO_NRO").ToString + "|" + dtCabecera(0)("TIPO_DCTO_SUNAT").ToString + "|" + dtCabecera(0)("NUM_DCTO").ToString + "|" + dtCabecera(0)("FECHA_SUNAT").ToString + "|" + dtCabecera(0)("IGV").ToString + "|" + dtCabecera(0)("IMPORTE").ToString
            'LA RUTA QUE VA A TENER
            'rutaQr = "data:image/png;base64," + codigoQR.fnGetCodigoQR(p_CODE, p_CTLG_CODE)
            rutaQr = "data:image/png;base64," + fnGetCodigoQR_fast(cadenaQR)

            tabla.Append("<br>")
            tabla.Append("<table id='tblDctoImprimir' border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'>")
            tabla.Append("<thead>")
            If dtCabecera.Rows(0)("ANULADO") = "SI" Then
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
                tabla.AppendFormat("<tr><th style='text-align: center;border-top: 1px dashed black;border-bottom: 1px dashed black; color:gray;' colspan='4'>ANULADO</th> </tr>")
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
            End If

            'If dtParametroLogo IsNot Nothing Then
            '    If dtParametroLogo.Rows(0)("VALOR") = "S" Then
            '        If Not rutaLogo = "" Then
            '            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaLogo)
            '        End If
            '    End If
            'Else
            '    If Not rutaLogo = "" Then
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaLogo)
            '    End If
            'End If

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            If (dtCabecera.Rows(0)("RUC").substring(0, 2) = "10") Then 'DPORTA 10/12/2021
                tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_CORTA_EMPRESA"))
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>De: {0}</td></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            Else
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            End If
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>RUC {0}</th></tr>", dtCabecera.Rows(0)("RUC"))
            tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION"))
            'tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>TELEF: {0}</td></tr>", dtCabecera.Rows(0)("TELEFONO"))
            tabla.Append("</thead>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DOCUMENTO"))
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("NUM_DCTO"))
            tabla.Append("</thead>")

            tabla.Append("<tbody")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            'tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Nro Maq<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Cliente<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>{0}<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Dirección<span>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Sucursal<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_SUCURSAL"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Vendedor<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("VENDEDOR_USUA_ID")) 'VENDEDOR
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Condición pago<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MODO_PAGO")) 'Modo de pago
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("EMISION"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha Venc.<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("VENCIMIENTO")) 'Feha Vencimiento
            If dtCabecera.Rows(0)("MOPA") = "0002" Then
                tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Cuotas<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("CUOTAS")) 'Cuotas
            End If
            'tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Moneda<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MONEDA"))
            If exoneradaInd = "S" Then
                tabla.Append("<tr><td></td><td colspan='3'>(Exonerado)</td></tr>")
            End If
            tabla.Append("</tbody></table>")
            tabla.Append("<br>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
            tabla.Append("<td style='text-align: left;'><strong>Cant.</strong></td><td style='text-align: left;padding-left:5px;' colspan='2'><strong>Descripción</strong></td><td style='text-align: right;'><strong>Total</strong></td>")
            tabla.Append("</tr>")

            If Not (dtDetalles Is Nothing) Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align: left;'></td>")
                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0} </span></td>", dtCabecera.Rows(0)("GLOSA")) ', dtCabecera.Rows(0)("VALOR"))
                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td></br>", dtCabecera.Rows(0)("VALOR"), "")
                tabla.Append("</tr>")
                For Each row In dtDetalles.Rows
                    tabla.Append("<tr>")
                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                    tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", row("NOMBRE_IMPRESION"), "")
                    tabla.AppendFormat("<td style='text-align: right;'><br/><span style='display: inline-block;position: relative;left: 6px' ></span></td>")
                    tabla.Append("</tr>")
                Next
            Else
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align: left;'>1</td>")
                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'> {0}</span></td>", "ANTICIPO") ', dtCabecera.Rows(0)("VALOR")) SIMBOLO_MONEDA
                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td></br>", dtCabecera.Rows(0)("VALOR"), "")
                tabla.Append("</tr>")
            End If

            tabla.Append("</tbody></table>")
            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            If incIgv = "S" Then
                tabla.Append("<tr style='border-top: 1px dashed black;'>")
                tabla.AppendFormat("<td colspan='3'><strong>Total Descuento<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DESCUENTO"))
                tabla.Append("</tr>")
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>SubTotal<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("VALOR"))
                tabla.Append("</tr>")
            Else
                tabla.Append("<tr style='border-top: 1px dashed black;'>")
                tabla.AppendFormat("<td colspan='3'><strong>Total Descuento<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", Math.Round(totalDsctoSinIgv, 2))
                tabla.Append("</tr>")
                Dim baseImponible As Decimal = Math.Round(
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_EXO")) +
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_INA")) +
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_GRA")), 2)

                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>SubTotal<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", baseImponible)
                tabla.Append("</tr>")

            End If
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Op. Exonerada<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_EXO"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Op. Inafecta<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_INA"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Op. Gravada<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_GRA"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>I.S.C.<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("ISC"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>I.G.V.<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IGV"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Importe Total<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("VALOR"))
            tabla.Append("</tr>")

            Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
            Dim importeTexto As String
            importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("VALOR"))).ToUpper()
            tabla.Append("<tr>")
            If codeMoneda = "0002" Then
                tabla.AppendFormat("<td colspan='4'>Son: {0} <span> SOLES </span></td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            ElseIf codeMoneda = "0003" Then
                tabla.AppendFormat("<td colspan='4'>Son: {0} <span> DOLARES </span></td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            Else
                tabla.AppendFormat("<td colspan='4'>Son: {0}</td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            End If
            tabla.Append("</tr>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")


            If dtCabecera.Rows(0)("DETRACCION_IND") = "S" Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Detracción<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DETRACCION"))
                tabla.Append("</tr>")
            End If

            If dtCabecera.Rows(0)("PERCEPCION_IND") = "S" Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Percepción<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("PERCEPCION"))
                tabla.Append("</tr>")
            End If

            If dtCabecera.Rows(0)("RETENCION_IND") = "S" Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Retención<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("RETENCION"))
                tabla.Append("</tr>")
            End If

            If Not Decimal.Parse(dtCabecera.Rows(0)("REDONDEO")) = 0 Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Redondeo<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("REDONDEO"))
                tabla.Append("</tr>")
            End If

            If Not Decimal.Parse(dtCabecera.Rows(0)("DONACION")) = 0 Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Donación<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DONACION"))
                tabla.Append("</tr>")
            End If

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Total a Pagar<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'><strong>{0}</strong></td>", dtCabecera.Rows(0)("IMPORTE"))
            tabla.Append("</tr>")

            If COPIA_IND = "S" Then
                tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
                tabla.Append("<tr style='border-top: 1px dashed black;'>")
                tabla.Append("<td colspan='4' style='text-align: center;'><strong>COPIA</strong></td>")
                tabla.Append("</tr>")
            End If

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("</tbody>")
            tabla.Append("</table>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")


            If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" Then
                'LUGAR DONDE SE VA A DIBUJAR EL QR EN EL PDF
                tabla.Append("<table' border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'>")
                tabla.Append("<thead>")
                tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaQr)
                tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
                tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><strong>Representación impresa de la <span style='float:right'></span></strong>{0}</th></tr>", dtCabecera.Rows(0)("DOCUMENTO"))
                If dtCabecera.Rows(0)("TIPO_DCTO") = "0012" Then
                    tabla.AppendFormat("<tr><td  style='vertical-align: top;'><strong>Nro Maq<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
                Else
                    tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><strong>Autorizado mediante <span style='float:right'></span></strong>{0}</th></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
                End If
            End If

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            'tabla.Append("<tr style='border-top: 1px dashed black;'>")
            'tabla.Append("<td colspan='4' style='text-align: center;'>Escribanos al correo: <strong>informes@orbitum.org</strong></td>")
            'If dtParametroPiePagina IsNot Nothing Then 'PIE DE PAGINA 
            Dim docu = dtCabecera.Rows(0)("NUM_DCTO")
            If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" Then
                'If Not pie_pagina = "" Then
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", "Para consultar el documento ingrese a http://52.41.93.228:1115, debe estar disponible dentro de las próximas 48 hrs. a partir de la fecha de emisión.")
                'tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><span style='float:right'></span>{0}</th></tr>", pie_pagina)
                'End If
            ElseIf (docu.substring(0, 2) = "NV") Then
                ' If Not pie_pagina = "" Then
                tabla.Append("<td colspan='4' style='text-align: center;'>CANJEAR POR BOLETA O FACTURA</td>")
                'End If
            Else
                tabla.Append("<td colspan='4' style='text-align: center;'>GRACIAS POR SU PREFERENCIA</td>")
            End If
            'End If
        End If
        tabla.Append("</tr>")
        tabla.Append("</thead>")
        tabla.Append("</thead>")
        tabla.Append("<br>")
        tabla.Append("</table>")
        Return tabla.ToString()
    End Function


    'CORREO    
    Public Function GenerarPDF(ByVal CODIGO As String, ByVal p_CTLG_CODE As String) As String
        Dim ress As String = ""
        Dim htmlText As String = ""
        Dim cNomArch As String = CODIGO & ".pdf"
        htmlText = getHtmlTextPDF(CODIGO, p_CTLG_CODE)
        HTMLToPDF(htmlText, cNomArch, CODIGO, p_CTLG_CODE)
        Return ress
    End Function

    Function getHtmlTextPDF(ByVal codigo As String, ByVal p_CTLG_CODE As String) As String
        Dim htmlText As New StringBuilder
        htmlText.Length = 0
        Dim documento As String = ""
        documento = GenerarDctoCorreo(codigo, USAR_IGV_IND, "")
        htmlText.Append(documento)
        Return htmlText.ToString
    End Function

    Sub HTMLToPDF(ByVal HTML As String, ByVal FilePath As String, ByVal p_CODE As String, ByVal p_CTLG_CODE As String)

        Dim nc As New Nomade.NC.NCEmpresa("Bn")
        Dim dtCabecera As DataTable
        dtCabecera = cAnticipo.ListarAnticiposCliente(p_CODE, "", "", "", "", Nothing, "4", "", "")

        Dim imgS, imgI As String
        Dim cadenaQR As String = ""
        'Cadena con la información del QR
        cadenaQR = "6" + "|" + dtCabecera(0)("RUC").ToString + "|" + dtCabecera(0)("CLIE_DOID").ToString + "|" + dtCabecera(0)("CLIE_DCTO_NRO").ToString + "|" + dtCabecera(0)("TIPO_DCTO_SUNAT").ToString + "|" + dtCabecera(0)("NUM_DCTO").ToString + "|" + dtCabecera(0)("FECHA_SUNAT").ToString + "|" + dtCabecera(0)("IGV").ToString + "|" + dtCabecera(0)("IMPORTE").ToString

        Dim imgSuperior As String = dtCabecera(0)("IMG_SUPERIOR").ToString
        imgS = imgSuperior.Replace("../../../", String.Empty)
        If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & imgS) Then
            imgS = "\recursos\img\SIN_IMAGEN.png"
        End If

        Dim imgInferior As String = dtCabecera(0)("IMG_INFERIOR").ToString
        imgI = imgInferior.Replace("../../../", String.Empty)
        If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & imgI) Then
            imgI = "\recursos\img\SIN_IMAGEN.png"
        End If

        Dim archivo, res As String
        res = "Archivos\" + FilePath
        archivo = HttpContext.Current.Server.MapPath("~") + res
        If My.Computer.FileSystem.FileExists(archivo) Then
            My.Computer.FileSystem.DeleteFile(archivo)
        End If

        Dim document As Document
        document = New Document(PageSize.A4, 25, 25, 55, 65)

        PdfWriter.GetInstance(document, New FileStream(archivo, FileMode.Create))
        document.Open()

        Dim styles As iTextSharp.text.html.simpleparser.StyleSheet = New iTextSharp.text.html.simpleparser.StyleSheet()
        styles.LoadStyle("border", "border-bottom", "2px")

        Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
        hw.Parse(New StringReader(HTML.ToString))
        document.Close()

        'If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" And dtCabecera(0)("IMAGEN_QR").ToString <> "" And dtCabecera(0)("IMAGEN_QR").ToString <> "undefined" Then 'DPORTA 20/05/2022
        If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" And p_CODE <> "" And p_CODE <> "undefined" Then
            'imgCabConQR(FilePath, imgS, imgI, Base64ToImage(codigoQR.fnGetCodigoQR(p_CODE, p_CTLG_CODE))) 'SOLO PARA ´DOCS ELECTRÓNICOS
            imgCabConQR(FilePath, imgS, imgI, Base64ToImage(fnGetCodigoQR_fast(cadenaQR))) 'SOLO PARA ´DOCS ELECTRÓNICOS
        Else
            imgC(FilePath, imgS, imgI)
        End If
    End Sub

    Function Base64ToImage(ByVal base64string As String) As System.Drawing.Image 'DPORTA 20/05/2022
        'Configurar imagen y obtener flujo de datos juntos
        Dim img As System.Drawing.Image
        Dim MS As System.IO.MemoryStream = New System.IO.MemoryStream
        Dim b64 As String
        If base64string = "" Then
            b64 = ""
        Else
            'b64 = base64string.Split(",")(1).Replace(" ", "+") 'Con el split se Toma lo que corresponde al base64 y luego se reemplaza
            b64 = base64string
        End If

        Dim b() As Byte

        'Convierte el mensaje codificado en base64 en datos de imagen
        b = Convert.FromBase64String(b64)
        MS = New System.IO.MemoryStream(b)

        'Crea la imagen
        img = System.Drawing.Image.FromStream(MS)

        Return img
    End Function

    Function imgCabConQR(ByVal Archivo As String, ByVal imgs As String, ByVal imginf As String, ByVal imgQR As System.Drawing.Image) As String 'DPORTA 20/05/2022

        Dim WatermarkLocation As String = HttpContext.Current.Server.MapPath("~") & imgs
        Dim WatermarkLocationI As String = HttpContext.Current.Server.MapPath("~") & imginf
        Dim FileLocation As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & Archivo
        Dim filePath As String = HttpContext.Current.Server.MapPath("~") & "Archivos\ArchivosAux\" & Archivo
        Dim document As Document = New Document()
        Dim pdfReader As PdfReader = New PdfReader(FileLocation)
        Dim stamp As PdfStamper = New PdfStamper(pdfReader, New FileStream(filePath, FileMode.Create))

        Dim img As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocation)

        img.ScaleAbsoluteWidth(425) '600
        img.ScaleAbsoluteHeight(73)
        img.SetAbsolutePosition(25, 770) '0,770

        Dim imgQ As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(imgQR, System.Drawing.Imaging.ImageFormat.Jpeg) 'Con esto se dibuja la imagen en el PDF
        imgQ.ScaleAbsoluteWidth(60)
        imgQ.ScaleAbsoluteHeight(60)
        imgQ.SetAbsolutePosition(515, 770)

        Dim waterMark As PdfContentByte
        For page As Integer = 1 To pdfReader.NumberOfPages
            If page = 1 Then
                waterMark = stamp.GetOverContent(page)
                waterMark.AddImage(img)
                'If elect = "S" Then
                waterMark.AddImage(imgQ)
                'End If
            End If
        Next

        stamp.FormFlattening = True
        stamp.Close()
        pdfReader.Close()
        document.Close()

        My.Computer.FileSystem.DeleteFile(FileLocation)
        My.Computer.FileSystem.MoveFile(filePath, FileLocation)
        Return "ok"

    End Function

    Function imgC(ByVal Archivo As String, ByVal imgs As String, ByVal imginf As String) As String

        Dim WatermarkLocation As String = HttpContext.Current.Server.MapPath("~") & imgs
        Dim WatermarkLocationI As String = HttpContext.Current.Server.MapPath("~") & imginf
        'Dim WatermarkLocationQ As String = HttpContext.Current.Server.MapPath("~") & imgQR
        Dim FileLocation As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & Archivo
        Dim filePath As String = HttpContext.Current.Server.MapPath("~") & "Archivos\ArchivosAux\" & Archivo
        Dim document As Document = New Document()
        Dim pdfReader As PdfReader = New PdfReader(FileLocation)
        Dim stamp As PdfStamper = New PdfStamper(pdfReader, New FileStream(filePath, FileMode.Create))

        Dim img As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocation)

        img.ScaleAbsoluteWidth(425) '600
        img.ScaleAbsoluteHeight(73)
        img.SetAbsolutePosition(25, 770) '0,770

        'Dim imgQ As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocationQ)
        'imgQ.ScaleAbsoluteWidth(60)
        'imgQ.ScaleAbsoluteHeight(60)
        'imgQ.SetAbsolutePosition(515, 770)


        'Dim imgIn As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocationI)
        'imgIn.ScaleAbsoluteWidth(600)
        'imgIn.ScaleAbsoluteHeight(70)
        'imgIn.Alignment = iTextSharp.text.Image.UNDERLYING
        'imgIn.SetAbsolutePosition(0, 0)

        Dim waterMark As PdfContentByte
        For page As Integer = 1 To pdfReader.NumberOfPages
            If page = 1 Then
                waterMark = stamp.GetOverContent(page)
                waterMark.AddImage(img)
                'If elect = "S" Then
                '    waterMark.AddImage(imgQ)
                'End If
                'waterMark.AddImage(imgIn)
            End If
        Next

        stamp.FormFlattening = True
        stamp.Close()
        pdfReader.Close()
        document.Close()

        My.Computer.FileSystem.DeleteFile(FileLocation)
        My.Computer.FileSystem.MoveFile(filePath, FileLocation)
        Return "ok"

    End Function

    Public Function getLinks(ByVal pie_pagina As String) As String 'DPORTA 31/05/2022
        Dim cadena As String
        cadena = "@»(http://([w.]+/?)S*)»"
        Dim re As Regex = New Regex(cadena, RegexOptions.IgnoreCase Or RegexOptions.Compiled)
        pie_pagina = re.Replace(pie_pagina, "«<a href=»$1″» target=»»_blank»»>$1</a>»»")
        Return pie_pagina
    End Function

    '----------------------------------------------------------
    '----------------------------------------------------------
    '----------------------------------------------------------
    '-----------DOCUMENTO PARA CORREO ELECTRÓNICO-------------
    '----------------------------------------------------------

    Public Function GenerarDctoCorreo(ByVal p_CODE As String, ByVal USAR_IGV_IND As String, ByVal COPIA_IND As String) As String
        Dim tabla As New StringBuilder
        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        'Dim dtEmpresas As New DataTable
        'dtCabecera = cAnticipo.ListarAnticiposCliente(p_CODE, "", "", "", "", Nothing, "1", p_CTLG_CODE, p_SCSL_CODE)
        dtCabecera = cAnticipo.ListarAnticiposCliente(p_CODE, "", "", "", "", Nothing, "4", "", "") 'nvVenta.ListarDocumentosVenta(p_CODE, "", "", "", "", "", "", "", "")
        dtDetalles = Nothing
        'dtDetalles = nvVenta.ListarDetalleDocumentoVenta(p_CODE, "0", "")
        If dtCabecera IsNot Nothing Then
            Dim indica As Boolean = True
            Try
                If dtCabecera.Rows(0)("DCTO_CODE_REF").ToString().Length = 0 Then
                    indica = False
                End If
                'If p_CODE_COTI.Length = 0 Then
                '    indica = False
                'End If
            Catch ex As Exception
                indica = False
            End Try

            If indica Then
                dtDetalles = cCotizacion.ListarDetalleCotizacionCliente(If(p_CODE_COTI Is Nothing, dtCabecera.Rows(0)("DCTO_CODE_REF"), p_CODE_COTI), "0", "")
            End If


            Dim decimalIGV As Decimal = Decimal.Parse(dtCabecera.Rows(0)("PCTJ_IGV")) / 100

            Dim incIgv As String
            If USAR_IGV_IND = Nothing Then
                incIgv = dtCabecera.Rows(0)("IGV_IMPR_IND")
            Else
                incIgv = USAR_IGV_IND
            End If

            Dim exoneradaInd = dtCabecera.Rows(0)("SCSL_EXONERADA_IND")
            Dim rutaLogo As String = ""
            Dim mon As String = dtCabecera.Rows(0)("SIMBOLO_MONEDA") 'Simbolo de moneda    
            Dim descMon As String = dtCabecera.Rows(0)("DESC_MONEDA") 'Descripcion de moneda            

            Dim totalSinDscto As Decimal = 0
            Dim totalDsctoSinIgv As Decimal = 0
            'OBTENER LOGO
            'dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("EMPRESA"), "A", "")

            'rutaLogo = dtEmpresas(0)("RUTA_IMAGEN").ToString

            tabla.Append("<br>")
            tabla.Append("<br>")
            tabla.Append("<table border='0' style='width: 90%;' align='center'>")
            tabla.Append("<thead>")
            tabla.Append("<tr><th border='1' style='border-top:1px solid black;'></th></tr>")
            tabla.Append("<tr><th>&nbsp;</th></tr>")
            tabla.Append("<tr><th align='left' style='font-size:12pt;font-family:Arial,sans-serif'>PAGO DE ANTICIPO</th></tr>")
            tabla.Append("<tr><th>&nbsp;</th></tr>")
            tabla.Append("<tr><th border='1' style='border-top:1px solid black;'></th></tr>")
            tabla.Append("</thead>")
            tabla.Append("</table>")

            tabla.Append("<table border='0' style='width: 90%;' align='center'>")
            tabla.Append("<thead>")
            If dtCabecera.Rows(0)("ANULADO") = "SI" Then
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
                tabla.AppendFormat("<tr><th style='text-align: center;border-top: 1px dashed black;border-bottom: 1px dashed black; color:gray;' colspan='4'>ANULADO</th> </tr>")
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
            End If
            tabla.Append("</thead>")
            tabla.Append("</table>")

            tabla.Append("<table border='0' style='width: 90%;' align='center' font size=9pt>")
            tabla.Append("<thead>")
            If (dtCabecera.Rows(0)("RUC").substring(0, 2) = "10") Then 'DPORTA 10/12/2021
                tabla.AppendFormat("<tr><th colspan='4' align='left' style='font-size:8pt;font-family:Arial,sans-serif'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_CORTA_EMPRESA"))
                tabla.AppendFormat("<tr><th colspan='4' align='left' style='font-size:8pt;font-family:Arial,sans-serif'>De: {0}</th></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            Else
                tabla.AppendFormat("<tr><th colspan='4' align='left' style='font-size:8pt;font-family:Arial,sans-serif'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            End If
            tabla.AppendFormat("<tr><th colspan='4' align='left' style='font-size:8pt;font-family:Arial,sans-serif'>RUC {0}</th></tr>", dtCabecera.Rows(0)("RUC"))
            tabla.AppendFormat("<tr><th colspan='4' align='left' style='font-size:8pt;font-family:Arial,sans-serif'>{0}</th></tr>", dtCabecera.Rows(0)("DIRECCION"))
            tabla.Append("</thead>")
            tabla.Append("<tbody>")
            tabla.Append("<tr><td colspan='4' border='1' style='border-top:1px solid black;'></td></tr>")
            If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" Then
                If dtCabecera.Rows(0)("TIPO_DCTO") = "0012" Then
                    tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Nro Maq </strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
                Else
                    tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Autorizado mediante </strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
                End If
            End If
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Fecha</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("EMISION"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Local</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DESC_SUCURSAL"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Vend.</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("VENDEDOR_USUA_ID")) 'VENDEDOR
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Moneda</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MONEDA"))
            tabla.Append("<tr><td colspan='4' border='1' style='border-top:1px solid black;' ></td></tr>")
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>{1}</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("NUM_DCTO"), dtCabecera.Rows(0)("DOCUMENTO_MIN"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Cliente</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>{0}</strong></td><td colspan='3'><strong>: </strong>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Dirección</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
            tabla.Append("<tr><td colspan='4' border='1' style='border-top:1px solid black;' ></td></tr>")
            tabla.Append("</tbody>")
            tabla.Append("</table>")
            tabla.Append("<br>")

            tabla.Append("<table border='1' style='width: 90%;' cellspacing='0px'  align='center' font size=9pt>")
            tabla.Append("<thead>")

            tabla.Append("</thead>")
            tabla.Append("<tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;background-color: #D6EAF8;'>")
            tabla.Append("<td style='text-align: left;'><strong>Cant.</strong></td>")
            tabla.Append("<td style='text-align: left;padding-left:5px;' colspan='2'><strong>Descripción</strong></td>")
            tabla.Append("<td style='text-align: right;'><strong>Total</strong></td>")
            tabla.Append("</tr>")

            If Not (dtDetalles Is Nothing) Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align: left;'></td>")
                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>ANTICIPO EN {0} POR CONCEPTO DE:</span></td>", dtCabecera.Rows(0)("DESC_MONEDA")) ', dtCabecera.Rows(0)("VALOR"))
                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' ><strong>{1}</span></td></br>", dtCabecera.Rows(0)("VALOR"), "")
                tabla.Append("</tr>")
                For Each row In dtDetalles.Rows
                    tabla.Append("<tr>")
                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                    tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", row("NOMBRE_IMPRESION"), "")
                    tabla.AppendFormat("<td style='text-align: right;'><br/><span style='display: inline-block;position: relative;left: 6px' ></span></td>")
                    tabla.Append("</tr>")
                Next
            Else
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align: left;'>1</td>")
                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'> {0}</span></td>", "ANTICIPO") ', dtCabecera.Rows(0)("VALOR")) SIMBOLO_MONEDA
                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td></br>", dtCabecera.Rows(0)("VALOR"), "")
                tabla.Append("</tr>")
            End If

            tabla.Append("</tbody></table>")
            tabla.Append("<table border='0' style='width: 90%;' cellspacing='0px' align='center' font size=9pt>")
            tabla.Append("<thead>")
            tabla.Append("</thead>")
            tabla.Append("<tbody>")

            If incIgv = "S" Then
                tabla.Append("<tr style='border-top: 1px dashed black;'>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Total Descuento {0}</strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DESCUENTO"))
                tabla.Append("</tr>")
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>SubTotal {0}</strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("VALOR"))
                tabla.Append("</tr>")
            Else
                tabla.Append("<tr style='border-top: 1px dashed black;'>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Total Descuento {0}</strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", Math.Round(totalDsctoSinIgv, 2))
                tabla.Append("</tr>")
                Dim baseImponible As Decimal = Math.Round(
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_EXO")) +
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_INA")) +
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_GRA")), 2)

                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>SubTotal {0}</strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", baseImponible)
                tabla.Append("</tr>")
            End If

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Op. Exonerada {0}</strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_EXO"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Op. Inafecta {0}</strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_INA"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Op. Gravada {0}</strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_GRA"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>I.S.C. <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("ISC"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>I.G.V. <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IGV"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Importe Total <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("VALOR"))
            tabla.Append("</tr>")

            Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
            Dim importeTexto As String
            importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("VALOR"))).ToUpper()
            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='4' style='text-align: right;'>Son: {0}</td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            tabla.Append("</tr>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            If dtCabecera.Rows(0)("DETRACCION_IND") = "S" Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Detracción <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DETRACCION"))
                tabla.Append("</tr>")
            End If

            If dtCabecera.Rows(0)("PERCEPCION_IND") = "S" Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Percepción <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("PERCEPCION"))
                tabla.Append("</tr>")
            End If

            If dtCabecera.Rows(0)("RETENCION_IND") = "S" Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Retención <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("RETENCION"))
                tabla.Append("</tr>")
            End If

            If Not Decimal.Parse(dtCabecera.Rows(0)("REDONDEO")) = 0 Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Redondeo <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("REDONDEO"))
                tabla.Append("</tr>")
            End If

            If Not Decimal.Parse(dtCabecera.Rows(0)("DONACION")) = 0 Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Donación <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DONACION"))
                tabla.Append("</tr>")
            End If

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Neto a Pagar <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'><strong>{0}</strong></td>", dtCabecera.Rows(0)("IMPORTE"))
            tabla.Append("<br>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr><td colspan='4' border='1'></td></tr>")
            tabla.Append("<tr>")
            If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" Then
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", "Para consultar el documento ingrese a http://52.41.93.228:1115, debe estar disponible dentro de las próximas 48 hrs. a partir de la fecha de emisión.")
            Else
                tabla.Append("<td colspan='4' style='text-align: center;'>GRACIAS POR SU PREFERENCIA</td>")
            End If


            tabla.Append("</table>")

        End If
        Return tabla.ToString()
    End Function


    ''' <summary>
    ''' Elimina espacion vacios (trim), cambia (") por ('), reemplaza (/) por vacio
    ''' </summary>
    ''' <param name="campo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function


    Public Function vDesc(ByVal valor As String) As String
        Dim res As String
        Try
            If Decimal.Parse(valor) = 0 Then
                res = ""
            Else
                res = valor + "-"
            End If
        Catch ex As Exception
            res = ""
        End Try
        Return res
    End Function

    Function ObtenerFecha(ByVal fecha As String) As String
        Dim dia = fecha.Split(" ")(0).Split("/")(0)
        Dim mes = fecha.Split(" ")(0).Split("/")(1)
        Dim anio = fecha.Split(" ")(0).Split("/")(2)
        Dim hora = ""
        Dim min = ""
        Dim seg = ""
        If fecha.Split(" ").Length = 3 Then
            hora = fecha.Split(" ")(1).Split(":")(0)
            min = fecha.Split(" ")(1).Split(":")(1)
            seg = fecha.Split(" ")(1).Split(":")(2)
            If fecha.Split(" ")(2).Contains("p") Then
                If Integer.Parse(hora) < 12 Then
                    hora = (Integer.Parse(hora) + 12).ToString
                End If
            End If
        End If
        fecha = anio + mes + dia + hora + min + seg
        Return fecha
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

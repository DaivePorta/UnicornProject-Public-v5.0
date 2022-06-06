<%@ WebHandler Language="VB" Class="NVLDOCT" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLDOCT : Implements IHttpHandler

    Dim OPCION, USUARIO, CTLG_CODE, MONEDA_CODE, CODE_PARAMETRO, TIPO_DCTO, PROD_CODE, NUM_DCTO, p_CODE As String

    Dim USUA_ID, PIDM, CTLG, SCSL, ALMC_CODE, SERIADO_IND, PRECIO_IND, CODIGO_CATEGORIA, TIPO_CAMBIO, p_FVBVTAC_SEQ_DOC, p_FVBVTAC_CODE, p_PLAZO, CODE_SUBGRUPO, CODE_MARCA, CODE_CLIENTE, MESES As String

    Dim p_NUM_SERIE, ANIO, p_NUM_DCTO, p_DCTO_CODE, p_FECHA_EMISION, p_FECHA_TRANS, p_FECHA_VENCIMIENTO,
       p_CMNT_DCTO, p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, p_MONE_CODE, p_VALOR,
       p_DESCUENTO, p_IGV, p_IMPORTE, p_MOPA_CODE, p_FOPA_CODE, p_CLIE_PIDM,
       p_CLIE_DOID, p_USVE_USUA_ID, p_COMPLETO_IND, p_CODE_REF, p_DCTO_CODE_REF,
       p_VALOR_CAMBIO, p_USUA_ID, p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
       p_IMPORTE_DONACION, p_IMPORTE_DETRACCION, p_IMPORTE_RETENCION,
       p_IMPORTE_PERCEPCION, p_IMPORTE_OTROS, p_IMPR_CODE, p_DETRACCION_IND, p_PERCEPCION_IND, p_RETENCION_IND,
       p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN,
       p_FECHA_EMISION_PERCEP, p_FECHA_EMISION_DETRAC, p_FECHA_EMISION_RETEN,
       p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND, p_DETALLES, p_DCTO_SERIE_REF,
       p_DCTO_NUM_REF, p_VALOR_CAMBIO_OFI, p_COD_AUT, p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, p_RESP_PIDM As String

    Dim p_PLAN_CODE, p_DESC_PLAN, p_TIPO_DCTO_PLAN As String

    Dim p_DESPACHO_VENTA_IND, p_DETALLES_PAGO, p_COBRAR_IND, p_VALIDAR_STOCK_IND As String

    Dim USAR_IGV_IND As String

    Dim SCSL_CODE, CODE_PROD, DESC, COMP_VENT_IND, DCTO_CODE,
        SERIE_DCTO, VENDEDOR, CLIENTE, PRODUCTO, ESTADO,
        DESDE, HASTA, CODE_VTA, NUM_DOC_COM As String


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


    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    Dim GRUPO_PROD As String
    Dim p_TIPO_VTA As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"


        SCSL_CODE = context.Request("SCSL_CODE")
        CODE_PROD = context.Request("CODE_PROD")

        ANIO = context.Request("ANIO")

        CODE_SUBGRUPO = context.Request("CODE_SUBGRUPO")
        CODE_MARCA = context.Request("CODE_MARCA")

        CODE_CLIENTE = context.Request("CODE_CLIENTE")
        MESES = context.Request("MESES")


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
        p_CMNT_DCTO = vChar(context.Request("p_CMNT_DCTO"))
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

        GRUPO_PROD = context.Request("GRUPO_PROD")
        If GRUPO_PROD Is Nothing Then
            GRUPO_PROD = ""
        End If

        p_TIPO_VTA = context.Request("p_TIPO_VTA")
        If p_TIPO_VTA Is Nothing Then
            p_TIPO_VTA = ""
        End If




        Try

            Select Case OPCION

                Case "LDOCC" 'Listar Clientes
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarDocVenta_Unica(p_FVBVTAC_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""SIG_DOC"" :" & """" & MiDataRow("SIG_DOC").ToString & """,")
                            resb.Append("""ANT_DOC"" :" & """" & MiDataRow("ANT_DOC").ToString & """,")
                            resb.Append("""SIGUIENTE"" :" & """" & MiDataRow("SIGUIENTE").ToString & """,")
                            resb.Append("""SIG_CLIE"" :" & """" & MiDataRow("SIG_CLIE").ToString & """,")
                            resb.Append("""ANT_CLIE"" :" & """" & MiDataRow("ANT_CLIE").ToString & """,")
                            resb.Append("""ANTERIOR"" :" & """" & MiDataRow("ANTERIOR").ToString & """,")
                            resb.Append("""PRIMERO"" :" & """" & MiDataRow("PRIMERO").ToString & """,")
                            resb.Append("""ULTIMO"" :" & """" & MiDataRow("ULTIMO").ToString & """,")
                            resb.Append("""NUM_DCTO"" :" & """" & MiDataRow("NUM_DCTO").ToString & """,")
                            resb.Append("""DCTO_CODE"" :" & """" & MiDataRow("DCTO_CODE").ToString & """,")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""DOCUMENTO"" :" & """" & MiDataRow("DOCUMENTO").ToString & """,")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("EMISION").ToString & """,")
                            resb.Append("""VIGENCIA"" :" & """" & MiDataRow("ANULADO").ToString & """,")
                            resb.Append("""CLIENTE"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""MOPA_DESC"" :" & """" & MiDataRow("MOPA_DESC").ToString & """,")
                            resb.Append("""FOPA_DESC"" :" & """" & MiDataRow("FOPA_DESC").ToString & """,")
                            resb.Append("""CAJA_DESC"" :" & """" & MiDataRow("CAJA_DESC").ToString & """,")
                            resb.Append("""VENDEDOR"" :" & """" & MiDataRow("NOMBRE_VENDEDOR").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ATENDIDO").ToString & "-" & MiDataRow("PAGADO").ToString & """,")
                            resb.Append("""IMPORTE"" :" & """" & MiDataRow("IMPORTE").ToString & """,")
                            resb.Append("""IGV"" :" & """" & MiDataRow("IGV").ToString & """,")
                            resb.Append("""VENTA_RAPIDA_IND"" :" & """" & MiDataRow("VENTA_RAPIDA_IND").ToString & """,")
                            resb.Append("""PCTJ_IGV"" :" & """" & MiDataRow("PCTJ_IGV").ToString & """,")
                            resb.Append("""VALOR"" :" & """" & MiDataRow("VALOR").ToString & """,")
                            resb.Append("""DETRACCION"" :" & """" & MiDataRow("DETRACCION").ToString & """,")
                            resb.Append("""PERCEPCION"" :" & """" & MiDataRow("PERCEPCION").ToString & """,")
                            resb.Append("""RETENCION"" :" & """" & MiDataRow("RETENCION").ToString & """,")
                            resb.Append("""DONACION"" :" & """" & MiDataRow("DONACION").ToString & """,")
                            resb.Append("""REDONDEO"" :" & """" & MiDataRow("REDONDEO").ToString & """,")
                            resb.Append("""EXONERADA"" :" & """" & MiDataRow("EXONERADA").ToString & """,")
                            resb.Append("""GRAVADA"" :" & """" & MiDataRow("GRAVADA").ToString & """,")
                            resb.Append("""INAFECTA"" :" & """" & MiDataRow("INAFECTA").ToString & """,")
                            resb.Append("""ISC"" :" & """" & MiDataRow("ISC").ToString & """,")
                            resb.Append("""MONE_DESC"" :" & """" & MiDataRow("MONE_DESC").ToString & """,")
                            resb.Append("""CONTRAENTREGA_IND"" :" & """" & MiDataRow("CONTRAENTREGA_IND").ToString & """,")
                            resb.Append("""GLOSA"" :" & """" & MiDataRow("GLOSA").ToString & """,")
                            resb.Append("""PIDM_CLIENTE"" :" & """" & MiDataRow("PIDM_CLIENTE").ToString & """,")
                            resb.Append("""DESCUENTO"" :" & """" & MiDataRow("DESCUENTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "ALLAMORT"
                    dt = nvVenta.Listar_todas_amortizaciones(p_FVBVTAC_CODE)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If

                Case "CUENTA"
                    dt = nvVenta.Listar_cuenta_venta(CTLG_CODE, p_FVBVTAC_CODE)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If


                Case "3" ' Obtiene tabla con documentos de venta
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    Dim fecha = HASTA
                    dt = nvVenta.ListarDocVenta_Busq("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE),
                                                 Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE, "", GRUPO_PROD, , p_TIPO_VTA)
                    If Not dt Is Nothing Then

                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If


                Case "4" ' Obtiene tabla con documentos de venta DETALLE POR PRODUCTO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarDocVenta_reporte(CODE_PROD, CTLG_CODE, SCSL_CODE, MONEDA_CODE, ANIO)
                    If Not dt Is Nothing Then

                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If

                Case "5" ' Obtiene tabla con documentos de venta DETALLE POR SUBGRUPO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarDocVenta_reporte_subgrupo(CODE_SUBGRUPO, CTLG_CODE, SCSL_CODE, MONEDA_CODE, ANIO)
                    If Not dt Is Nothing Then

                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If

                Case "6" ' Obtiene tabla con documentos de venta DETALLE POR MARCA
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarDocVenta_reporte_marca(CODE_MARCA, CTLG_CODE, SCSL_CODE, MONEDA_CODE, ANIO)
                    If Not dt Is Nothing Then

                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If

                Case "7" ' Obtiene tabla con documentos de venta DETALLE POR CLIENTE
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarDocVenta_reporte_cliente(CODE_CLIENTE, CTLG_CODE, SCSL_CODE, MONEDA_CODE, ANIO, MESES)
                    If Not dt Is Nothing Then

                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If


            End Select
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public Function GenerarTablaDocumento(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        '------
        ' resb.AppendFormat("<td style="text-align: center;"><i class="icon-pushpin" style="color: red"></i></td>
        resb.AppendFormat("<table id=""tblDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th style='max-width:52px;'></th>")
        resb.AppendFormat("<th style='max-width:52px;'>CÓDIGO</th>")
        resb.AppendFormat("<th style='max-width:70px;'>DOCUMENTO</th>")
        resb.AppendFormat("<th style='max-width:52px;'>FECHA<br/>EMISIÓN</th>")
        resb.AppendFormat("<th style='max-width:90px;'>NRO. DOC.</th>")
        resb.AppendFormat("<th style='max-width:300px;'>CLIENTE</th>")
        resb.AppendFormat("<th style='max-width:52px;'>MONEDA</th>")
        resb.AppendFormat("<th style='max-width:90px;'>TOTAL</th>")
        resb.AppendFormat("<th style='max-width:52px;'>MODO<br/>PAGO</th>")
        resb.AppendFormat("<th style='max-width:52px;'>FORMA<br/>PAGO</th>")
        resb.AppendFormat("<th style='max-width:90px;display:none;'>NOMBRE VENDEDOR</th>")
        resb.AppendFormat("<th style='max-width:90px;'>VENDEDOR</th>")
        resb.AppendFormat("<th style='max-width:90px;'>USUA REG.</th>")
        resb.AppendFormat("<th style='min-width:90px;max-width:110px;'>ESTADO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>VIGENCIA</th>")
        resb.AppendFormat("<th style='max-width:25px;'>#</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody style='font-family:calibri;'>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr  data-tipo='venta anulada'>")
                If dt.Rows(i)("ANULADO").ToString() = "ANULADO" Then
                    resb.AppendFormat("<td align='center' >{0}</td>", "<i class='icon-pushpin' style='color: red;font-size:medium;'>")
                Else
                    If dt.Rows(i)("VENTA_RAPIDA_IND").ToString() = "S" Then
                        ' resb.AppendFormat("<tr style='background-color:#F7F2CE;' data-tipo='venta rápida'>")
                        resb.AppendFormat("<td align='center' >{0}</td>", "<i class='icon-pushpin' style='color: blue;font-size:medium;'>")
                    Else
                        ' resb.AppendFormat("<tr style='background-color:#CEF7DE;' data-tipo='venta regular'>")
                        resb.AppendFormat("<td align='center' >{0}</td>", "<i class='icon-pushpin' style='color: black;font-size:medium;'>")
                    End If
                End If


                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODE").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td align='left' data-order='" + ObtenerFecha(dt.Rows(i)("EMISION").ToString) + "'>{0}<br/><small style='color:#6C7686;'>{1}</small></td>", dt.Rows(i)("EMISION").ToString(), dt.Rows(i)("FECHA_ACTV").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CLIE_DOID_NRO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA_DESC_CORTA").ToString())
                resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("VALOR").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("MOPA_DESC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("FOPA_DESC").ToString())
                resb.AppendFormat("<td style='display:none;' align='left' >{0}</td>", dt.Rows(i)("NOMBRE_VENDEDOR").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("VENDEDOR_USUA_ID").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("USUA_ID_REG").ToString())
                resb.AppendFormat("<td align='left' style='font-size:11.5px;'>{0}<br/>{1}</td>", dt.Rows(i)("ATENDIDO").ToString(), dt.Rows(i)("PAGADO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("ANULADO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>")
                resb.AppendFormat("<a class='btn blue' onclick=""imprimirDetalle('{0}','{1}')""><i class='icon-search'></i></a>", dt.Rows(i)("CODE").ToString(), dt.Rows(i)("NUM_DCTO").ToString())
                resb.AppendFormat("</td>")
                resb.AppendFormat("</tr>")

            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
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

End Class
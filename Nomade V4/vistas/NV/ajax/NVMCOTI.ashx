<%@ WebHandler Language="VB" Class="NVMCOTI" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVMCOTI : Implements IHttpHandler


    Dim OPCION, USUARIO, CTLG_CODE, MONEDA_CODE, CODE_PARAMETRO, TIPO_DCTO, PROD_CODE, NUM_DCTO, p_CODE As String

    Dim USUA_ID, PIDM, CTLG, SCSL, ALMC_CODE, ALMC, DESC_ALMC, SERIADO_IND, PRECIO_IND, CODIGO_CATEGORIA, TIPO_CAMBIO, p_FVBVTAC_SEQ_DOC, p_FVBVTAC_CODE, p_PLAZO As String

    Dim p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE, p_FECHA_EMISION, p_FECHA_TRANS, p_FECHA_VENCIMIENTO,
       p_CMNT_DCTO, p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, p_MONE_CODE, p_VALOR,
       p_DESCUENTO, p_IGV, p_IMPORTE, p_MOPA_CODE, p_FOPA_CODE, p_CLIE_PIDM,
       p_CLIE_DOID, p_USVE_USUA_ID, p_COMPLETO_IND, p_CODE_REF, p_DCTO_CODE_REF,
       p_VALOR_CAMBIO, p_USUA_ID, p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
       p_IMPORTE_DONACION, p_IMPORTE_DETRACCION, p_IMPORTE_RETENCION,
       p_IMPORTE_PERCEPCION, p_IMPORTE_OTROS, p_IMPR_CODE, p_DETRACCION_IND, p_PERCEPCION_IND, p_RETENCION_IND,
       p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN,
       p_FECHA_EMISION_PERCEP, p_FECHA_EMISION_DETRAC, p_FECHA_EMISION_RETEN,
       p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND, p_DETALLES, p_DETALLES_BONIFICACION, p_DETALLES_MUESTRA, p_DCTO_SERIE_REF,
       p_DCTO_NUM_REF, p_VALOR_CAMBIO_OFI, p_COD_AUT, p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, p_RESP_PIDM, p_DESC_PLAN, p_FECHA_VIGENCIA, p_DIAS_VIGENCIA As String

    Dim USAR_IGV_IND As String


    Dim ncSucursal As New NOMADE.NC.NCSucursal("Bn")
    Dim g As New NOMADE.NC.NCGrupos("Bn")
    Dim e As New NOMADE.NM.NMTipodeExistencia("Bn")
    Dim c As New NOMADE.NC.NCCuenta("Bn")
    Dim mone As New NOMADE.NC.NCMonedas("Bn")
    Dim param As New NOMADE.NC.NCParametros("Bn")
    Dim oc As New NOMADE.NC.NCCompra("BN")
    Dim fac As New NOMADE.NC.NCFactura("Bn")
    Dim modpag As New NOMADE.NF.NFModalidadPago("Bn")
    Dim dcto As New NOMADE.NC.NCTipoDC("Bn")
    Dim natipomov As New NOMADE.NA.NATipoMovimiento("BN")

    Dim ncTipoDcEmpresa As New NOMADE.NC.NCTipoDCEmpresa("BN")
    Dim nceCliente As New NOMADE.NC.NCECliente("Bn")
    Dim nmUnidadMedida As New NOMADE.NM.NMUnidadMedida("Bn")
    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
    Dim nvCotizacion As New Nomade.NV.NVCotizacion("Bn")
    Dim nmGestionPrecios As New NOMADE.NM.NMGestionPrecios("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim nvDetCotizacion As New Nomade.NV.NVCotizacion("Bn") 'almacena los detalles de cotizaciones de cliente para recepcion de anticipos

    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest


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

        ALMC = context.Request("ALMC")
        DESC_ALMC = context.Request("DESC_ALMC")

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
        p_DETALLES_BONIFICACION = vChar(context.Request("p_DETALLES_BONIFICACION"))
        p_DETALLES_MUESTRA = vChar(context.Request("p_DETALLES_MUESTRA"))

        p_RESP_PIDM = context.Request("p_RESP_PIDM")
        p_FACTOR_RENTA = context.Request("p_FACTOR_RENTA")
        p_IMPUESTO_RENTA = context.Request("p_IMPUESTO_RENTA")
        '
        CODIGO_CATEGORIA = context.Request("CODIGO_CATEGORIA")
        p_FECHA_VIGENCIA = context.Request("p_FECHA_VIGENCIA")
        p_DIAS_VIGENCIA = context.Request("p_DIAS_VIGENCIA")
        Try

            Select Case OPCION

                Case "5" 'CREAR COTIZACION A CLIENTE            
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = nvCotizacion.CrearCotizacionCliente(p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE,
                                             If(p_FECHA_EMISION = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION)),
                                             If(p_FECHA_TRANS = "", Nothing, Utilities.fechaLocal(p_FECHA_TRANS)),
                                             If(p_FECHA_VENCIMIENTO = "", Nothing, Utilities.fechaLocal(p_FECHA_VENCIMIENTO)),
                    p_CMNT_DCTO, p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, p_MONE_CODE, p_VALOR, p_DESCUENTO, p_IGV, p_IMPORTE,
                    p_MOPA_CODE, p_FOPA_CODE, p_CLIE_PIDM, p_CLIE_DOID, p_USVE_USUA_ID, p_COMPLETO_IND, p_CODE_REF, p_DCTO_CODE_REF,
                    p_VALOR_CAMBIO, p_USUA_ID, p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
                    p_IMPORTE_DONACION, p_IMPORTE_DETRACCION, p_IMPORTE_RETENCION, p_IMPORTE_PERCEPCION, p_IMPORTE_OTROS, p_IMPR_CODE,
                    p_DETRACCION_IND, p_PERCEPCION_IND, p_RETENCION_IND, p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN,
                    If(p_FECHA_EMISION_PERCEP = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_PERCEP)),
                    If(p_FECHA_EMISION_DETRAC = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_DETRAC)),
                    If(p_FECHA_EMISION_RETEN = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_RETEN)),
                    p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_DETALLES, p_DETALLES_BONIFICACION, p_DETALLES_MUESTRA, p_DCTO_SERIE_REF, p_DCTO_NUM_REF, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND,
                    p_VALOR_CAMBIO_OFI, If(p_COD_AUT = "", "0", p_COD_AUT), p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA,
                     If(p_FECHA_VIGENCIA = "", Nothing, Utilities.fechaLocal(p_FECHA_VIGENCIA)), p_DIAS_VIGENCIA, If(p_RESP_PIDM = "", Nothing, p_RESP_PIDM))
                    If Not (array Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & array(1).ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "7" 'ACTUALIZAR COTIZACION CLIENTE           
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = nvCotizacion.ActualizarCotizacionCliente(p_CODE, p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE,
                                             If(p_FECHA_EMISION = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION)),
                                             If(p_FECHA_TRANS = "", Nothing, Utilities.fechaLocal(p_FECHA_TRANS)),
                                             If(p_FECHA_VENCIMIENTO = "", Nothing, Utilities.fechaLocal(p_FECHA_VENCIMIENTO)),
                    p_CMNT_DCTO, p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, p_MONE_CODE, p_VALOR, p_DESCUENTO, p_IGV, p_IMPORTE,
                    p_MOPA_CODE, p_FOPA_CODE, p_CLIE_PIDM, p_CLIE_DOID, p_USVE_USUA_ID, p_COMPLETO_IND, p_CODE_REF, p_DCTO_CODE_REF,
                    p_VALOR_CAMBIO, p_USUA_ID, p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
                    p_IMPORTE_DONACION, p_IMPORTE_DETRACCION, p_IMPORTE_RETENCION, p_IMPORTE_PERCEPCION, p_IMPORTE_OTROS, p_IMPR_CODE,
                    p_DETRACCION_IND, p_PERCEPCION_IND, p_RETENCION_IND, p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN,
                    If(p_FECHA_EMISION_PERCEP = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_PERCEP)),
                    If(p_FECHA_EMISION_DETRAC = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_DETRAC)),
                    If(p_FECHA_EMISION_RETEN = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_RETEN)),
                    p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_DETALLES, p_DETALLES_BONIFICACION, p_DETALLES_MUESTRA, p_DCTO_SERIE_REF, p_DCTO_NUM_REF, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND,
                    p_VALOR_CAMBIO_OFI, If(p_COD_AUT = "", "0", p_COD_AUT), p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA,
                     If(p_FECHA_VIGENCIA = "", Nothing, Utilities.fechaLocal(p_FECHA_VIGENCIA)), p_DIAS_VIGENCIA, If(p_RESP_PIDM = "", Nothing, p_RESP_PIDM))
                    If Not (array Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & array(1).ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "8" 'COMPLETAR COTIZACION CLIENTE            
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = nvCotizacion.CompletarCotizacionCliente(p_CODE, p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE,
                                             If(p_FECHA_EMISION = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION)),
                                             If(p_FECHA_TRANS = "", Nothing, Utilities.fechaLocal(p_FECHA_TRANS)),
                                             If(p_FECHA_VENCIMIENTO = "", Nothing, Utilities.fechaLocal(p_FECHA_VENCIMIENTO)),
                    p_CMNT_DCTO, p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, p_MONE_CODE, p_VALOR, p_DESCUENTO, p_IGV, p_IMPORTE,
                    p_MOPA_CODE, p_FOPA_CODE, p_CLIE_PIDM, p_CLIE_DOID, p_USVE_USUA_ID, p_COMPLETO_IND, p_CODE_REF, p_DCTO_CODE_REF,
                    p_VALOR_CAMBIO, p_USUA_ID, p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
                    p_IMPORTE_DONACION, p_IMPORTE_DETRACCION, p_IMPORTE_RETENCION, p_IMPORTE_PERCEPCION, p_IMPORTE_OTROS, p_IMPR_CODE,
                    p_DETRACCION_IND, p_PERCEPCION_IND, p_RETENCION_IND, p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN,
                    If(p_FECHA_EMISION_PERCEP = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_PERCEP)),
                    If(p_FECHA_EMISION_DETRAC = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_DETRAC)),
                    If(p_FECHA_EMISION_RETEN = "", Nothing, Utilities.fechaLocal(p_FECHA_EMISION_RETEN)),
                    p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_DETALLES, p_DETALLES_BONIFICACION, p_DETALLES_MUESTRA, p_DCTO_SERIE_REF, p_DCTO_NUM_REF, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND,
                    p_VALOR_CAMBIO_OFI, If(p_COD_AUT = "", "0", p_COD_AUT), p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA,
                     If(p_FECHA_VIGENCIA = "", Nothing, Utilities.fechaLocal(p_FECHA_VIGENCIA)), p_DIAS_VIGENCIA, If(p_RESP_PIDM = "", Nothing, p_RESP_PIDM))
                    If Not (array Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & array(1).ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "LDOCC" ' LISTAR CABECERA COTIZACION CLIENTE
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvCotizacion.ListarCotizacionCliente(If(p_FVBVTAC_CODE = Nothing, "", p_FVBVTAC_CODE), "", "", If(p_CTLG_CODE = Nothing, "", p_CTLG_CODE),
                                                       If(p_SCSL_CODE = Nothing, "", p_SCSL_CODE), If(TIPO_DCTO = Nothing, "", TIPO_DCTO),
                                                       If(p_MONE_CODE = Nothing, "", p_MONE_CODE), If(PIDM = Nothing, "", PIDM), "", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
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
                            resb.Append("""IMPRESORA_CODE"":""" & row("IMPRESORA_CODE").ToString & """,")
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
                            resb.Append("""FECHA_VIGENCIA"":""" & If(row("FECHA_VIGENCIA").ToString() = "", "", row("FECHA_VIGENCIA").ToString().Substring(0, 10)) & """,")
                            resb.Append("""DIAS_VIGENCIA"":""" & row("DIAS_VIGENCIA").ToString & """,")
                            resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()


                Case "LDOCD" ' LISTAR DETALLES COTIZACION CLIENTE
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvCotizacion.ListarDetalleCotizacionCliente(If(p_FVBVTAC_CODE = Nothing, "", p_FVBVTAC_CODE), "0", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""SECUENCIA"":""" & row("SECUENCIA").ToString & """,")
                            resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                            resb.Append("""PROD_CODE"":""" & row("PROD_CODE").ToString & """,")
                            resb.Append("""NOMBRE_IMPRESION"":""" & row("NOMBRE_IMPRESION").ToString & """,")
                            resb.Append("""UNIDAD"":""" & row("UNIDAD").ToString & """,")
                            resb.Append("""DESC_UNIDAD"":""" & row("DESC_UNIDAD").ToString & """,")
                            resb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """,")
                            resb.Append("""PU"":""" & row("PU").ToString & """,")
                            resb.Append("""DESCUENTO"":""" & row("DESCUENTO").ToString & """,")
                            resb.Append("""TOTAL"":""" & row("TOTAL").ToString & """,")
                            resb.Append("""PRECIO_COMPRA"":""" & row("PRECIO_COMPRA").ToString & """,")
                            resb.Append("""CONVERT_PU"":""" & row("CONVERT_PU").ToString & """,")
                            resb.Append("""CONVERT_DESCUENTO"":""" & row("CONVERT_DESCUENTO").ToString & """,")
                            resb.Append("""CONVERT_TOTAL"":""" & row("CONVERT_TOTAL").ToString & """,")
                            resb.Append("""CONVERT_PRECIO_COMPRA"":""" & row("CONVERT_PRECIO_COMPRA").ToString & """,")
                            resb.Append("""CENTRO_COSTO_CODE"":""" & row("CENTRO_COSTO_CODE").ToString & """,")
                            resb.Append("""CUENTA_CODE"":""" & row("CUENTA_CODE").ToString & """,")
                            resb.Append("""USUA_ID"":""" & row("USUA_ID").ToString & """,")
                            resb.Append("""TIPO_PROD"":""" & row("TIPO_PROD").ToString & """,")
                            resb.Append("""TIPO_PRODUCTO"":""" & row("TIPO_PRODUCTO").ToString & """,")
                            resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """,")
                            'resb.Append("""ALMC_CODE"":""" & row("ALMC_CODE").ToString & """,")
                            resb.Append("""ALMC"":""" & row("ALMC").ToString & """,")
                            resb.Append("""DESC_ALMC"":""" & row("DESC_ALMC").ToString & """,")
                            resb.Append("""ALMACENABLE"":""" & row("ALMACENABLE").ToString & """,")
                            resb.Append("""TIPO_BIEN"":""" & row("TIPO_BIEN").ToString & """,")
                            resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                            resb.Append("""ISC"":""" & row("ISC").ToString & """,")
                            resb.Append("""CONVERT_DETRACCION"":""" & row("CONVERT_DETRACCION").ToString & """,")
                            resb.Append("""CONVERT_ISC"":""" & row("CONVERT_ISC").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""PROD_CODIGO_ANTIGUO"":""" & row("PROD_CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""SERIADO"":""" & row("SERIADO_IND").ToString & """,")
                            resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "LDOCDA" ' LISTAR DETALLES COTIZACION CLIENTE EN RECEPCION ANTICIPOS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvDetCotizacion.ListarDetalleCotizacionClienteAnticipos(If(p_FVBVTAC_CODE = Nothing, "", p_FVBVTAC_CODE), "0", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""SECUENCIA"":""" & row("SECUENCIA").ToString & """,")
                            resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                            resb.Append("""PROD_CODE"":""" & row("PROD_CODE").ToString & """,")
                            resb.Append("""NOMBRE_IMPRESION"":""" & row("NOMBRE_IMPRESION").ToString & """,")
                            resb.Append("""UNIDAD"":""" & row("UNIDAD").ToString & """,")
                            resb.Append("""DESC_UNIDAD"":""" & row("DESC_UNIDAD").ToString & """,")
                            resb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """,")
                            resb.Append("""PU"":""" & row("PU").ToString & """,")
                            resb.Append("""DESCUENTO"":""" & row("DESCUENTO").ToString & """,")
                            resb.Append("""TOTAL"":""" & row("TOTAL").ToString & """,")
                            resb.Append("""PRECIO_COMPRA"":""" & row("PRECIO_COMPRA").ToString & """,")
                            resb.Append("""CONVERT_PU"":""" & row("CONVERT_PU").ToString & """,")
                            resb.Append("""CONVERT_DESCUENTO"":""" & row("CONVERT_DESCUENTO").ToString & """,")
                            resb.Append("""CONVERT_TOTAL"":""" & row("CONVERT_TOTAL").ToString & """,")
                            resb.Append("""CONVERT_PRECIO_COMPRA"":""" & row("CONVERT_PRECIO_COMPRA").ToString & """,")
                            resb.Append("""CENTRO_COSTO_CODE"":""" & row("CENTRO_COSTO_CODE").ToString & """,")
                            resb.Append("""CUENTA_CODE"":""" & row("CUENTA_CODE").ToString & """,")
                            resb.Append("""USUA_ID"":""" & row("USUA_ID").ToString & """,")
                            resb.Append("""TIPO_PROD"":""" & row("TIPO_PROD").ToString & """,")
                            resb.Append("""TIPO_PRODUCTO"":""" & row("TIPO_PRODUCTO").ToString & """,")
                            resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """,")
                            resb.Append("""ALMC_CODE"":""" & row("ALMC_CODE").ToString & """,")
                            resb.Append("""ALMACENABLE"":""" & row("ALMACENABLE").ToString & """,")
                            resb.Append("""TIPO_BIEN"":""" & row("TIPO_BIEN").ToString & """,")
                            resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                            resb.Append("""ISC"":""" & row("ISC").ToString & """,")
                            resb.Append("""CONVERT_DETRACCION"":""" & row("CONVERT_DETRACCION").ToString & """,")
                            resb.Append("""CONVERT_ISC"":""" & row("CONVERT_ISC").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""PROD_CODIGO_ANTIGUO"":""" & row("PROD_CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""SERIADO"":""" & row("SERIADO_IND").ToString & """,")
                            resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "CORR" 'Cargar correlativo
                    Dim aut As New Nomade.NC.NCAutorizacionDocumento("BN")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = aut.ListarAutorizacion(String.Empty, "A", CTLG, SCSL, TIPO_DCTO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        Dim formato As String = ""
                        For Each row As DataRow In dt.Rows
                            Dim valor_fin As Long = Long.Parse(row("VALOR_FIN").ToString)
                            Dim valor_actual As Long = Long.Parse(row("VALOR_ACTUAL").ToString)
                            If valor_actual <= valor_fin And formato <> row("FORMATO").ToString Then
                                resb.Append("{")
                                resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                resb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                                resb.Append("""FORMATO"":""" & row("FORMATO").ToString & """,")
                                resb.Append("""VALOR_ACTUAL"":""" & row("VALOR_ACTUAL").ToString & """,")
                                resb.Append("""VALOR_FIN"":""" & row("VALOR_FIN").ToString & """,")
                                resb.Append("""CORRELATIVO"":""" & row("CORRELATIVO").ToString & """")
                                resb.Append("},")
                                formato = row("FORMATO").ToString
                                Exit For
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "DOCESPECIFICO" ' Listar documento específico
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncTipoDcEmpresa.ListarTipoDCEspecifico(TIPO_DCTO, CTLG)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION_CORTA", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION_CORTA"" :" & """" & MiDataRow("DESCRIPCION_CORTA").ToString & """,")
                            resb.Append("""FECHA_ELEC"" :" & """" & Utilities.fechaLocal(MiDataRow("FECHA_ELEC").ToString) & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "SENDMAIL"
                    context.Request.ContentType = "text/plain"
                    Dim mail As New Nomade.Mail.NomadeMail("BN")
                    Dim remitente As String = context.Request("REMITENTE")
                    Dim nremitente As String = context.Request("NREMITENTE")
                    Dim destinatarios As String = context.Request("DESTINATARIOS")
                    Dim asunto As String = context.Request("ASUNTO")
                    Dim mensaje As String = context.Request("MENSAJE")
                    Dim empresa As String = context.Request("EMPRESA")
                    Dim secuencia As String = context.Request("SECUENCIA")
                    Dim emision As String = context.Request("EMISION")
                    Dim transaccion As String = context.Request("TRANSACCION")
                    Dim cliente As String = context.Request("CLIENTE")
                    Dim responsablePago As String = context.Request("RESPONSABLE_PAGO")
                    Dim doc_registro As String = context.Request("DOC_REGISTRO")
                    Dim glosa As String = context.Request("GLOSA")
                    Dim codigo As String = context.Request("codigo")
                    Dim fechaVigencia As String = context.Request("p_FECHA_VIGENCIA")

                    Dim DETALLES As String = context.Request("DETALLES")
                    'DETALLES = Replace(DETALLES, "|", "<")
                    'DETALLES = Replace(DETALLES, "?", ">")
                    Dim tabla As New StringBuilder
                    tabla.Append("<table id='tabla_det' border='1' style='width: 100%;border: 1px solid black;border-collapse:collapse;' cellpadding='7px' >")
                    tabla.Append("<thead style='color:white;background-color:#3D3D3D;'>")
                    tabla.Append("<tr>")
                    tabla.Append("<th style='text-align: center'>ITEM</th>")
                    tabla.Append("<th style='text-align: center'>PRODUCTO</th>")
                    tabla.Append("<th >DESCRIPCIÓN</th>")
                    tabla.Append("<th style='text-align: center'>CANT.</th>")
                    tabla.Append("<th style='text-align: center'>UNIDAD</th>")
                    tabla.Append("<th style='text-align: center'>P.U.</th>")
                    tabla.Append("<th style='text-align: center'>TOTAL BRUTO</th>")
                    tabla.Append("<th style='text-align: center'>DESC.</th>")
                    tabla.Append("<th style='text-align: center'>TOTAL NETO</th>")
                    tabla.Append("<th style='text-align: center'>ISC</th>")
                    tabla.Append("<th style='text-align: center'>DETRACCIÓN</th>")
                    tabla.Append("<th style='text-align: center'>GLOSA</th>")
                    tabla.Append("</tr>")
                    tabla.Append("</thead>")
                    tabla.Append("<tbody>")
                    For Each fila As String In DETALLES.Split("|")
                        tabla.AppendFormat("<tr>")
                        tabla.AppendFormat("<td style='text-align: center'>{0}</td>", fila.Split(",")(0))
                        tabla.AppendFormat("<td style='text-align: center'>{0}</td>", fila.Split(",")(1))
                        tabla.AppendFormat("<td >{0}</td>", fila.Split(",")(2))
                        tabla.AppendFormat("<td style='text-align: center'>{0}</td>", fila.Split(",")(3))
                        tabla.AppendFormat("<td style='text-align: center'>{0}</td>", fila.Split(",")(4))
                        tabla.AppendFormat("<td style='text-align: center'>{0}</td>", fila.Split(",")(5))
                        tabla.AppendFormat("<td style='text-align: center'>{0}</td>", fila.Split(",")(6))
                        tabla.AppendFormat("<td style='text-align: center'>{0}</td>", fila.Split(",")(7))
                        tabla.AppendFormat("<td style='text-align: center'>{0}</td>", fila.Split(",")(8))
                        tabla.AppendFormat("<td style='text-align: center'>{0}</td>", fila.Split(",")(9))
                        tabla.AppendFormat("<td style='text-align: center'>{0}</td>", fila.Split(",")(10))
                        tabla.AppendFormat("<td style='text-align: center'>{0}</td>", fila.Split(",")(11))
                        tabla.AppendFormat("</tr>")
                    Next
                    tabla.Append("</tbody>")
                    tabla.Append("</table>")


                    Dim TOTALES As String
                    TOTALES = GenerarDctoImprimir(codigo, USAR_IGV_IND)
                    TOTALES = Replace(TOTALES, "|", "<")
                    TOTALES = Replace(TOTALES, "?", ">")

                    Dim CUERPO As String = ""
                    CUERPO =
                    "<p>" & mensaje & "</p><hr>" &
                    "<h2>" & empresa & "</h2>" &
                    "<p><strong>VIGENTE HASTA: </strong>" & fechaVigencia & "</p>" &
                    "<p><strong>EMISION:</strong> " & emision & "</p><p><strong>TRANSACCION:</strong> " & transaccion & "</p>" &
                    "<p><strong>CLIENTE:</strong> " & cliente & "</p><p><strong>RESPONSABLE PAGO:</strong> " & responsablePago & "</p>" &
                    "<p><strong>DOC. REGISTRO: </strong>" & doc_registro & "</p>" &
                    "<p><strong>GLOSA: </strong>" & glosa & "</p>" &
                    "<p>Los detalles se listan a continuación<p><br/>" & tabla.ToString &
                    TOTALES

                    'Dim rutaArchivo As String = GenerarPDFCorreo()                    
                    mail.enviar(remitente, nremitente, destinatarios, asunto, CUERPO)
                    res = "OK"
                Case "IMPR"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    USAR_IGV_IND = context.Request("USAR_IGV_IND") ' Si es nothing se usará el de la tabla
                    res = GenerarDctoImprimir(p_CODE, USAR_IGV_IND)

                Case Else

            End Select
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    ''' <summary>
    ''' Obtiene los datos de un documento  y sus detalles, y los devuelve como una tabla con formato de ticket
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GenerarDctoImprimir(ByVal p_CODE As String, ByVal USAR_IGV_IND As String) As String
        Dim tabla As New StringBuilder
        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        Dim dtEmpresas As New DataTable
        Dim dtParametroLogo As New DataTable

        dtCabecera = nvCotizacion.ListarCotizacionCliente(p_CODE, "", "", "", "", "", "", "", "", "")
        dtDetalles = nvCotizacion.ListarDetalleCotizacionCliente(p_CODE, "0", "")
        dtParametroLogo = New Nomade.NC.NCParametros("Bn").ListarParametros("LOVE", "")

        If dtCabecera IsNot Nothing Then


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
            dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("EMPRESA"), "A", "")
            rutaLogo = dtEmpresas(0)("RUTA_IMAGEN").ToString

            'OBTENER LOGO
            tabla.Append("<table id='tblDctoImprimir' border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'>")
            tabla.Append("<thead>")
            If dtCabecera.Rows(0)("ANULADO") = "SI" Then
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
                tabla.AppendFormat("<tr><th style='text-align: center;border-top: 1px dashed black;border-bottom: 1px dashed black; color:gray;' colspan='4'>ANULADO</th> </tr>")
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
            End If
            'tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DOCUMENTO")) 
            If dtParametroLogo IsNot Nothing Then
                If dtParametroLogo.Rows(0)("VALOR") = "S" Then
                    If Not rutaLogo = "" Then
                        tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaLogo)
                    End If
                End If
            Else
                If Not rutaLogo = "" Then
                    tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaLogo)
                End If
            End If

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>RUC {0}</th></tr>", dtCabecera.Rows(0)("RUC"))
            tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION"))
            tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>TELEF: {0}</td></tr>", dtCabecera.Rows(0)("TELEFONO"))
            tabla.Append("</thead>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", "COTIZACIÓN")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("NUM_DCTO"), dtCabecera.Rows(0)("DOCUMENTO_MIN"))
            tabla.Append("</thead>")

            tabla.Append("<tbody")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("EMISION"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Local<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_SUCURSAL"))
            If exoneradaInd = "S" Then
                tabla.Append("<tr><td></td><td colspan='3'>(Exonerado)</td></tr>")
            End If

            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Vend.<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("VENDEDOR_USUA_ID")) 'VENDEDOR
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Moneda<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MONEDA"))
            'tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>{1}<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("NUM_DCTO"), "Cotiza.")

            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Cliente<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>{0}<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Dirección<span>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
            tabla.Append("</tbody></table>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
            tabla.Append("<td style='text-align: left;'><strong>Cant.</strong></td><td style='text-align: left;padding-left:5px;' colspan='2'><strong>Descripción</strong></td><td style='text-align: right;'><strong>Total</strong></td>")
            tabla.Append("</tr>")

            If dtCabecera.Rows(0)("MONEDA_BASE") = dtCabecera.Rows(0)("MONEDA") Then
                'DETALLES
                If exoneradaInd = "S" Then
                    'Mostrar precios sin IGV
                    For Each row In dtDetalles.Rows
                        If row("TIPO_PRODUCTO") = "N" Then
                            tabla.Append("<tr>")
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                            tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), row("PU"))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", row("TOTAL"), vDesc(row("DESCUENTO")))
                            tabla.Append("</tr>")
                        End If
                        If row("TIPO_PRODUCTO") = "B" Then
                            tabla.Append("<tr>")
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                            tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1} (Bonificación)</td>", row("NOMBRE_IMPRESION"), row("PU"))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", row("TOTAL"), vDesc(row("DESCUENTO")))
                            tabla.Append("</tr>")
                        End If
                        If row("TIPO_PRODUCTO") = "M" Then
                            tabla.Append("<tr>")
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                            tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1} (Muestra)</td>", row("NOMBRE_IMPRESION"), row("PU"))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", row("TOTAL"), vDesc(row("DESCUENTO")))
                            tabla.Append("</tr>")
                        End If


                    Next
                Else
                    'Mostrar precios con IGV
                    If incIgv = "S" Then
                        For Each row In dtDetalles.Rows
                            If row("TIPO_PRODUCTO") = "N" Then
                                totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), row("PU"))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", totalSinDscto, vDesc(row("DESCUENTO")))
                                tabla.Append("</tr>")
                            End If
                            If row("TIPO_PRODUCTO") = "B" Then
                                totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1} (Bonificación)</td>", row("NOMBRE_IMPRESION"), row("PU"))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", totalSinDscto, vDesc(row("DESCUENTO")))
                                tabla.Append("</tr>")
                            End If
                            If row("TIPO_PRODUCTO") = "M" Then
                                totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1} (Muestra)</td>", row("NOMBRE_IMPRESION"), row("PU"))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", totalSinDscto, vDesc(row("DESCUENTO")))
                                tabla.Append("</tr>")
                            End If


                        Next
                    Else

                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                            If row("TIPO_BIEN") = "EXO" Or row("TIPO_BIEN") = "INA" Then
                                If row("TIPO_PRODUCTO") = "N" Then
                                    tabla.Append("<tr>")
                                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                    tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), row("PU"))
                                    tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", totalSinDscto, vDesc(row("DESCUENTO")))
                                    tabla.Append("</tr>")
                                    totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO"))
                                End If
                                If row("TIPO_PRODUCTO") = "B" Then
                                    tabla.Append("<tr>")
                                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                    tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1} (Bonnificación)</td>", row("NOMBRE_IMPRESION"), row("PU"))
                                    tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", totalSinDscto, vDesc(row("DESCUENTO")))
                                    tabla.Append("</tr>")
                                    totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO"))
                                End If
                                If row("TIPO_PRODUCTO") = "M" Then
                                    tabla.Append("<tr>")
                                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                    tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1} (Muestra)</td>", row("NOMBRE_IMPRESION"), row("PU"))
                                    tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", totalSinDscto, vDesc(row("DESCUENTO")))
                                    tabla.Append("</tr>")
                                    totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO"))
                                End If
                            Else
                                If row("TIPO_PRODUCTO") = "N" Then
                                    Dim PU As Decimal = Math.Round((Decimal.Parse(row("PU")) / (decimalIGV + 1)), 3)
                                    Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
                                    Dim desc As Decimal = Math.Round((Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)), 2)
                                    tabla.Append("<tr>")
                                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                    tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), PU)
                                    tabla.AppendFormat(" <td style='text-align: right;'>{0}</br><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", total, vDesc(desc.ToString()))
                                    tabla.Append("</tr>")
                                    totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)
                                End If

                                If row("TIPO_PRODUCTO") = "B" Then
                                    Dim PU As Decimal = Math.Round((Decimal.Parse(row("PU")) / (decimalIGV + 1)), 3)
                                    Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
                                    Dim desc As Decimal = Math.Round((Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)), 2)
                                    tabla.Append("<tr>")
                                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                    tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1} (Bonificación)</td>", row("NOMBRE_IMPRESION"), PU)
                                    tabla.AppendFormat(" <td style='text-align: right;'>{0}</br><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", total, vDesc(desc.ToString()))
                                    tabla.Append("</tr>")
                                    totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)
                                End If

                                If row("TIPO_PRODUCTO") = "M" Then
                                    Dim PU As Decimal = Math.Round((Decimal.Parse(row("PU")) / (decimalIGV + 1)), 3)
                                    Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
                                    Dim desc As Decimal = Math.Round((Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)), 2)
                                    tabla.Append("<tr>")
                                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                    tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1} (Muestra)</td>", row("NOMBRE_IMPRESION"), PU)
                                    tabla.AppendFormat(" <td style='text-align: right;'>{0}</br><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", total, vDesc(desc.ToString()))
                                    tabla.Append("</tr>")
                                    totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)
                                End If


                            End If
                        Next
                    End If

                End If
                'FIN DETALLES
            Else ' MONEDA ALTERNA
                'DETALLES
                If exoneradaInd = "S" Then
                    'Mostrar precios sin IGV
                    For Each row In dtDetalles.Rows
                        tabla.Append("<tr>")
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                        tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), row("CONVERT_PU"))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", row("CONVERT_TOTAL"), vDesc(row("CONVERT_DESCUENTO")))
                        tabla.Append("</tr>")
                    Next
                Else
                    'Mostrar precios con IGV
                    If incIgv = "S" Then
                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("CONVERT_TOTAL")) + Decimal.Parse(row("CONVERT_DESCUENTO")), 2)
                            tabla.Append("<tr>")
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                            tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), row("CONVERT_PU"))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", totalSinDscto, vDesc(row("CONVERT_DESCUENTO")))
                            tabla.Append("</tr>")
                        Next
                    Else

                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("CONVERT_TOTAL")) + Decimal.Parse(row("CONVERT_DESCUENTO")), 2)
                            If row("TIPO_BIEN") = "EXO" Or row("TIPO_BIEN") = "INA" Then
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), row("CONVERT_PU"))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", totalSinDscto, vDesc(row("CONVERT_DESCUENTO")))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("CONVERT_DESCUENTO"))
                            Else
                                Dim PU As Decimal = Math.Round((Decimal.Parse(row("CONVERT_PU")) / (decimalIGV + 1)), 3)
                                Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
                                Dim desc As Decimal = Math.Round((Decimal.Parse(row("CONVERT_DESCUENTO")) / (decimalIGV + 1)), 2)
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), PU)
                                tabla.AppendFormat(" <td style='text-align: right;'>{0}</br><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", total, vDesc(desc.ToString()))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("CONVERT_DESCUENTO")) / (decimalIGV + 1)
                            End If
                        Next
                    End If

                End If
                'FIN DETALLES
            End If
            tabla.Append("</tbody></table>")
            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            If incIgv = "S" Then
                tabla.Append("<tr style='border-top: 1px dashed black;'>")
                tabla.AppendFormat("<td colspan='3'><strong>Total Descuento</strong></td>")
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DESCUENTO"))
                tabla.Append("</tr>")
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Subtotal</strong></td>")
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("VALOR"))
                tabla.Append("</tr>")
            Else
                tabla.Append("<tr style='border-top: 1px dashed black;'>")
                tabla.AppendFormat("<td colspan='3'><strong>Total Descuento</strong></td>")
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", Math.Round(totalDsctoSinIgv, 2))
                tabla.Append("</tr>")
                Dim baseImponible As Decimal = Math.Round(
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_EXO")) +
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_INA")) +
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_GRA")), 2)

                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Subtotal</strong></td>")
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", baseImponible)
                tabla.Append("</tr>")

            End If
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Op. Exonerada</strong></td>")
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_EXO"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Op. Inafecta</strong></td>")
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_INA"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Op. Gravada</strong></td>")
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
            tabla.AppendFormat("<td colspan='4'>Son: {0}</td>", importeTexto.Replace(".-", " (" + descMon + ")"))
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

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Total a Pagar<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE"))
            tabla.Append("</tr>")

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
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<td colspan='4' style='text-align: center;'>GRACIAS POR SU PREFERENCIA</td>")

            tabla.Append("</tbody>")
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

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

End Class
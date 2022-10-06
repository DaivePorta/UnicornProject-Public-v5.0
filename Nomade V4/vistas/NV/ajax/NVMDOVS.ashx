<%@ WebHandler Language="VB" Class="NVMDOVS" %>

Imports iTextSharp.text
Imports iTextSharp.text.pdf
Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.IO.FileStream

Public Class NVMDOVS : Implements IHttpHandler


    Dim OPCION, USUARIO, CTLG_CODE, MONEDA_CODE, CODE_PARAMETRO, TIPO_DCTO, PROD_CODE, NUM_DCTO, p_CODE, p_DETALLES_BONI As String

    Dim USUA_ID, PIDM, CTLG, SCSL, ALMC_CODE, ALMC, DESC_ALMC, DESP_VENTA, SERIADO_IND, PRECIO_IND, CODIGO_CATEGORIA, TIPO_CAMBIO, p_FVBVTAC_SEQ_DOC, p_FVBVTAC_CODE, p_PLAZO As String

    Dim p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE, p_FECHA_EMISION, p_FECHA_TRANS, p_FECHA_VENCIMIENTO,
       p_CMNT_DCTO, p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, p_MONE_CODE, p_VALOR,
       p_DESCUENTO, p_IGV, p_IMPORTE, p_MOPA_CODE, p_FOPA_CODE, p_CLIE_PIDM,
       p_CLIE_DOID, p_USVE_USUA_ID, p_COMPLETO_IND, p_CODE_REF, p_DCTO_CODE_REF,
       p_VALOR_CAMBIO, p_USUA_ID, p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
       p_IMPORTE_DONACION, p_IMPORTE_DETRACCION, p_IMPORTE_RETENCION,
       p_IMPORTE_PERCEPCION, p_IMPORTE_OTROS, p_IMPR_CODE, p_DETRACCION_IND, p_PERCEPCION_IND, p_RETENCION_IND,
       p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN,
       p_FECHA_EMISION_PERCEP, p_FECHA_EMISION_DETRAC, p_FECHA_EMISION_RETEN,
       p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND, p_DETALLES, p_DCTO_SERIE_REF,
       p_DCTO_NUM_REF, p_VALOR_CAMBIO_OFI, p_COD_AUT, p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, p_RESP_PIDM, p_DIRECCION,
       p_LONGITUD, p_LATITUD, p_DETALLES_MUESTRA, p_TOTAL_GRATUITAS, p_EFECTIVO_RECIBIDO, p_EFECTIVO_RECIBIDO_ALTERNO, p_VUELTO, p_VUELTO_ALTERNO, p_AUTODETRACCION As String

    Dim p_PLAN_CODE, p_DESC_PLAN, p_TIPO_DCTO_PLAN As String

    Dim p_DESPACHO_VENTA_IND, p_DETALLES_PAGO, p_DETALLES_PAGO2, p_DETALLES_PAGO3, p_COBRAR_IND, p_VALIDAR_STOCK_IND As String '25/02

    Dim USAR_IGV_IND, TIPO_VENTA As String

    Dim SCSL_CODE, DESC, COMP_VENT_IND, DCTO_CODE,
        SERIE_DCTO, VENDEDOR, CLIENTE, PRODUCTO, ESTADO,
        DESDE, HASTA, CODE_VTA, NUM_DOC_COM As String

    Dim p_NRO_ATENCION, CANTIDAD_PROD As String 'ID_KARDEX DE SISNOT

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
    Dim codigoQR As New Nomade.Impresion.CodigoQR("Bn")

    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    Dim p_IMGQR As String

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
        TIPO_VENTA = context.Request("TIPO_VENTA")

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
        'ID_KARDEX DE SISNOT
        p_NRO_ATENCION = context.Request("p_NRO_ATENCION")
        CANTIDAD_PROD = context.Request("CANTIDAD_PROD")

        ALMC = context.Request("ALMC")
        DESC_ALMC = context.Request("DESC_ALMC")
        DESP_VENTA = context.Request("DESP_VENTA")

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
        p_CODE_REF = context.Request("p_CODE_REF") 'NRO_ATENCION
        p_DCTO_CODE_REF = vChar(context.Request("p_DCTO_CODE_REF")) 'NOMBRE CLIENTE REFERENCIAL
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
        p_DETALLES_PAGO2 = context.Request("p_DETALLES_PAGO2") '25/02
        p_DETALLES_PAGO3 = context.Request("p_DETALLES_PAGO3") '25/02
        p_DESPACHO_VENTA_IND = context.Request("p_DESPACHO_VENTA_IND")
        p_COBRAR_IND = context.Request("p_COBRAR_IND")
        p_VALIDAR_STOCK_IND = context.Request("p_VALIDAR_STOCK_IND")
        p_AUTODETRACCION = context.Request("p_AUTODETRACCION") ' DPORTA 25/02/2021

        p_DETALLES_BONI = context.Request("p_DETALLES_BONI")
        p_DETALLES_MUESTRA = context.Request("p_DETALLES_MUESTRA")
        p_DIRECCION = context.Request("p_DIRECCION")
        p_LATITUD = context.Request("p_LATITUD")
        p_LONGITUD = context.Request("p_LONGITUD")
        p_TOTAL_GRATUITAS = context.Request("p_TOTAL_GRATUITAS")

        p_EFECTIVO_RECIBIDO = context.Request("p_EFECTIVO_RECIBIDO")
        If p_EFECTIVO_RECIBIDO = "" Or p_EFECTIVO_RECIBIDO Is Nothing Then
            p_EFECTIVO_RECIBIDO = 0
        End If

        p_EFECTIVO_RECIBIDO_ALTERNO = context.Request("p_EFECTIVO_RECIBIDO_ALTERNO")
        If p_EFECTIVO_RECIBIDO_ALTERNO = "" Or p_EFECTIVO_RECIBIDO_ALTERNO Is Nothing Then
            p_EFECTIVO_RECIBIDO_ALTERNO = 0
        End If

        p_VUELTO = context.Request("p_VUELTO")
        If p_VUELTO = "" Or p_VUELTO Is Nothing Then
            p_VUELTO = 0
        End If

        p_VUELTO_ALTERNO = context.Request("p_VUELTO_ALTERNO")
        If p_VUELTO_ALTERNO = "" Or p_VUELTO_ALTERNO Is Nothing Then
            p_VUELTO_ALTERNO = 0
        End If

        Try

            Select Case OPCION

                Case "COMPLETAR_NVMDOVS" 'CREAR DOCUMENTO VENTA SERVICIO ---------- '25/02 p_DETALLES_PAGO2, p_DETALLES_PAGO3
                    context.Response.ContentType = "application/json; charset=utf-8"
                    p_CMNT_DCTO = "|@TV:R" + p_CMNT_DCTO
                    Dim array As Array
                    array = nvVenta.CrearVentaRapidaServiciosWeb(p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE,
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
                                                                 p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_DETALLES, p_DCTO_SERIE_REF, p_DCTO_NUM_REF, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND,
                                                                 p_VALOR_CAMBIO_OFI, If(p_COD_AUT = "", "0", p_COD_AUT), p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, p_DETALLES_PAGO, p_DETALLES_PAGO2, p_DETALLES_PAGO3, p_DESPACHO_VENTA_IND,
                                                                 p_COBRAR_IND, p_EFECTIVO_RECIBIDO, p_EFECTIVO_RECIBIDO_ALTERNO, p_VUELTO, p_VUELTO_ALTERNO, p_AUTODETRACCION, If(p_RESP_PIDM = "", Nothing, p_RESP_PIDM), p_VALIDAR_STOCK_IND, p_DETALLES_BONI, p_DIRECCION,
                                                                 IIf(p_LATITUD = "null", Nothing, p_LATITUD),
                                                                 IIf(p_LONGITUD = "null", Nothing, p_LONGITUD), p_DETALLES_MUESTRA, p_TOTAL_GRATUITAS)


                    If Not (array Is Nothing) Then
                        Dim msgError As String = "OK"
                        'If array(0).ToString.Length = 9 And p_COMPLETO_IND = "S" Then
                        '    Try
                        '        GenerarPDF(array(0).ToString)
                        '    Catch ex As Exception
                        '        msgError = "ERROR: " + ex.Message
                        '    End Try
                        'End If
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & array(1).ToString & """,")
                        'resb.Append("""DATOS_QR"" :" & """" & array(2).ToString & """,")
                        resb.Append("""MSGERROR"" :" & """" & msgError & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "GENERAR_PDF" 'DPORTA
                    Dim msgError As String = "OK"
                    Dim dtCabecera As New DataTable
                    dtCabecera = nvVenta.ListarCabDctoVentaImpresion(p_CODE, "X")
                    If p_CODE.Length = 9 And dtCabecera.Rows(0)("COMPLETO_IND") = "S" Then
                        Try
                            GenerarPDF(p_CODE)
                        Catch ex As Exception
                            msgError = "ERROR: " + ex.Message
                        End Try
                    Else
                        msgError = "ERROR: El doc. de venta no está completado"
                    End If
                    res = msgError.ToString()
                Case "GQR_VENTA" 'Parametros para guardar el QR
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = nvVenta.GuardarCodigoQR_VENTA(p_FVBVTAC_CODE, p_IMGQR)
                Case "LVEND" ' LISTAR VENDEDORES POR ROL

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarVendedorPorRol(CTLG, ESTADO)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "ESTADO", "ASC")
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"":""" & row("PIDM_PERSONA").ToString & """,")
                            resb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & row("ESTADO").ToString & """,")
                            resb.Append("""NOMBRE_EMPLEADO"":""" & row("NOMBRE").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LVRSERV" ' Obtiene tabla con venta rápida servicios
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarVentaRap_Serv("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE, p_COMPLETO_IND)
                    res = GenerarTablaDocumento(dt)

                Case "LDVSERV" ' Obtiene tabla con documentos de venta servicios
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarDocVenta_Serv("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE, p_COMPLETO_IND)
                    res = GenerarTablaDocumento(dt)
                'Case "3" ' Obtiene tabla con documentos de venta
                '    context.Response.ContentType = "application/text; charset=utf-8"
                '    dt = nvVenta.ListarDocVenta_Busq("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE, p_COMPLETO_IND)
                '    res = GenerarTablaDocumento(dt)

                Case "5" 'Generar tabla para impresion de detalle 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    'dt = nvVenta.ListarDocVenta_Busq("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE, p_COMPLETO_IND)
                    dt = nvVenta.ListarDocVenta_Busq_Serv("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE, TIPO_VENTA)
                    res = GenerarTablaDocumentoImprimir(dt)

                'Case "6" 'Generar tabla para impresion de detalle 
                '    context.Response.ContentType = "application/json; charset=utf-8"
                '    dt = nvVenta.ListarDocVenta_Busq("", PIDM, NUM_DCTO, DCTO_CODE, "", "", "", SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE, p_COMPLETO_IND)
                '    If Not (dt Is Nothing) Then
                '        res = Utilities.Datatable2Json(dt)
                '    Else
                '        res = "[]"
                '    End If
                Case "7" 'Lista direcciones
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim NCPersona As New Nomade.NC.NCPersona("Bn")
                    dt = NCPersona.listar_direcciones(PIDM, 0, "A")
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                'Case "8" 'MUESTRA'
                '    context.Response.ContentType = "application/json; charset=utf-8"
                '    Dim f_hoy = Date.Now
                '    'Now.ToString("dd/MM/yyyy")
                '    Dim f_ini_mes_actual = f_hoy.AddDays(-f_hoy.Day + 1)
                '    Dim f_fin_mes_actual = f_hoy.AddDays(-f_hoy.Day + 1).AddMonths(1).AddDays(-1)

                '    Dim f_ini_total_ventas = f_ini_mes_actual.AddMonths(-12)
                '    Dim f_fin_total_ventas = f_ini_mes_actual.AddDays(-1)

                '    Dim NVVenta As New Nomade.NV.NVVenta("Bn")
                '    dt = NVVenta.Obtener_valor_Muestra(f_ini_mes_actual.ToString("yyyy/MM/dd"),
                '                                        f_fin_mes_actual.ToString("yyyy/MM/dd"),
                '                                        f_ini_total_ventas.ToString("yyyy/MM/dd"),
                '                                        f_fin_total_ventas.ToString("yyyy/MM/dd"),
                '                                        p_CTLG_CODE)
                '    If Not (dt Is Nothing) Then
                '        res = Utilities.Datatable2Json(dt)
                '    Else
                '        res = "[]"
                '    End If
                'DPORTA
                Case "IMPRT"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    USAR_IGV_IND = context.Request("USAR_IGV_IND") ' Si es nothing se usará el de la tabla
                    res = GenerarDctoImprimirTicket(p_CODE, USAR_IGV_IND)
                'DPORTA
                Case "IMPRTICKET"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    USAR_IGV_IND = context.Request("USAR_IGV_IND") ' Si es nothing se usará el de la tabla
                    res = ImprimirTicket(p_CODE, USAR_IGV_IND)
                'DPORTA
                Case "PERMISO_MOD_VENTA"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.PermisoModificarVenta(USUARIO, CTLG)
                    If Not (dt Is Nothing) Then
                        'dt = SortDataTableColumn(dt, "ESTADO", "ASC")
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PERMISO"":""" & row("PERMISO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                'DPORTA
                Case "LISTAR_ATENCIONES" 'LISTA DE ATENCIONES PENDIENTES DE PAGO EN BD SISNOT
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarAtencionesPendientes()
                    res = GenerarTablaDocumentos(dt)

                'DPORTA
                Case "LISTAR_DETALLE_ATENCION" 'DETALLE DE LA ATENCIÓN SELECCIONADA
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarDetalleAtencion(If(p_NRO_ATENCION = Nothing, "", p_NRO_ATENCION))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NRO_ATENCION"":""" & row("NRO_ATENCION").ToString & """,")
                            resb.Append("""ITEM_PRODUCTO"":""" & row("ITEM_PRODUCTO").ToString & """,")
                            resb.Append("""ID_SERVICIO"":""" & row("ID_SERVICIO").ToString & """,")
                            resb.Append("""CANTIDAD_SERVICIO"":""" & row("CANTIDAD_SERVICIO").ToString & """,")
                            resb.Append("""VALOR_SERVICIO"":""" & row("VALOR_SERVICIO").ToString & """,")
                            resb.Append("""CODIGO_PRODUCTO"":""" & row("CODIGO_PRODUCTO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                'DPORTA
                Case "LISTAR_DATOS_PRODUCTO" 'DATOS DELOS PRODUCTOS PARA INSERTAR EN EL DETALLE
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarDatosProducto(If(PROD_CODE = Nothing, "", PROD_CODE), CTLG, ALMC_CODE, CANTIDAD_PROD)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PROD_CODIGO_ANTIGUO"":""" & row("PROD_CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""TIPO_BIEN"":""" & row("TIPO_BIEN").ToString & """,")
                            resb.Append("""UNIDAD"":""" & row("UNIDAD").ToString & """,")
                            resb.Append("""DESC_UNIDAD"":""" & row("DESC_UNIDAD").ToString & """,")
                            resb.Append("""ALMC"":""" & row("ALMC").ToString & """,")
                            resb.Append("""DESC_ALMC"":""" & row("DESC_ALMC").ToString & """,")
                            resb.Append("""DESP_VENTA"":""" & row("DESP_VENTA").ToString & """,")
                            resb.Append("""NOMBRE_IMPRESION"":""" & row("NOMBRE_IMPRESION").ToString & """,")
                            resb.Append("""MONEDA"":""" & row("MONEDA").ToString & """,")
                            resb.Append("""PRECIO_IND"":""" & row("PRECIO_IND").ToString & """,")
                            resb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                            resb.Append("""SUCURSAL"":""" & row("SUCURSAL").ToString & """,")
                            resb.Append("""PU"":""" & row("PU").ToString & """,")
                            resb.Append("""TOTAL"":""" & row("TOTAL").ToString & """,")
                            resb.Append("""DESCUENTO"":""" & row("DESCUENTO").ToString & """,")
                            resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                            resb.Append("""DETRACCION_DECIMALES"":""" & row("DETRACCION_DECIMALES").ToString & """,")
                            resb.Append("""ISC"":""" & row("ISC").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""CODIGO_PRODUCTO"":""" & row("CODIGO_PRODUCTO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
            End Select
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function GenerarDctoImprimirTicket(ByVal p_CODE As String, ByVal USAR_IGV_IND As String) As String
        Dim tabla As New StringBuilder

        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        'Dim dtDetallesBonificacion As New DataTable
        'Dim dtDetallesMuestra As New DataTable
        'Dim dtEmpresas As New DataTable
        'Dim dtParametroLogo As New DataTable

        Dim dtParametroPiePagina As New DataTable

        dtCabecera = nvVenta.ListarCabDctoVentaImpresion(p_CODE, "I")
        dtDetalles = nvVenta.ListarDetDctoVentaImpresion(p_CODE)
        'dtParametroLogo = New Nomade.NC.NCParametros("Bn").ListarParametros("LOVE", "")

        dtParametroPiePagina = New Nomade.NC.NCParametros("Bn").ListarParametros("PPAG", "")

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

            'VARIABLE PARA COLOCAR EL QR EN EL PDF
            Dim rutaQr As String = ""

            'PIE DE PAGINA EDITABLE
            Dim pie_pagina As String = ""

            Dim mon As String = dtCabecera.Rows(0)("SIMBOLO_MONEDA") 'Simbolo de moneda     
            Dim descMon As String = dtCabecera.Rows(0)("DESC_MONEDA") 'Descripcion de moneda   

            Dim codeMoneda As String = dtCabecera.Rows(0)("MONEDA") 'Código de Moneda

            Dim totalSinDscto As Decimal = 0
            Dim totalDsctoSinIgv As Decimal = 0
            'OBTENER LOGO
            'dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("EMPRESA"), "A", "")
            rutaLogo = dtCabecera(0)("RUTA_IMAGEN").ToString

            'OBTENER EL TEXTO QUE VA A IR EN LA IMPRESION COMO PIE DE PAGINA
            pie_pagina = dtParametroPiePagina(0)("DESCRIPCION_DETALLADA").ToString

            'LA RUTA QUE VA A TENER
            'rutaQr = dtCabecera(0)("IMAGEN_QR").ToString
            rutaQr = "data:image/png;base64," + codigoQR.fnGetCodigoQR(p_CODE)

            tabla.Append("<table id='tblDctoImprimir' border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'>")
            tabla.Append("<thead>")
            If dtCabecera.Rows(0)("ANULADO") = "SI" Then
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
                tabla.AppendFormat("<tr><th style='text-align: center;border-top: 1px dashed black;border-bottom: 1px dashed black; color:gray;' colspan='4'>ANULADO</th> </tr>")
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
            End If
            'tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DOCUMENTO")) 
            'If dtParametroLogo IsNot Nothing Then
            '    If dtParametroLogo.Rows(0)("VALOR") = "S" Then
            '        If Not rutaLogo = "" Then
            '            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaLogo)
            '        End If
            '    End If
            'Else
            '    If Not rutaLogo = "" Then
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 95px' src='{0}'></th> </tr>", rutaLogo) 'Cambio de 80 px a 95 px
            '    End If
            'End If

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            If (dtCabecera.Rows(0)("RUC").substring(0, 2) = "10") Then 'DPORTA 10/12/2021
                tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_CORTA_EMPRESA"))
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>De: {0}</td></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            Else
                tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            End If
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>RUC {0}</th></tr>", dtCabecera.Rows(0)("RUC"))
            tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION"))
            tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>TELEF: {0}</td></tr>", dtCabecera.Rows(0)("TELEFONO"))
            tabla.Append("</thead>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DOCUMENTO"))
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("NUM_DCTO"))
            tabla.Append("</thead>")

            tabla.Append("<tbody style='table-layout: fixed;overflow-x:auto;'>") 'Se agrego table-layout: fixed para que mantenga la misma distancia independiente del tamaño de la hoja
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><td style='vertical-align: top;width: 95px;'><strong>Cliente<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;width: 95px;'><strong>{0}<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;width: 95px;'><strong>Dirección<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
            'If dtCabecera.Rows(0)("TIPO_DCTO") = "0012" Then
            '    tabla.AppendFormat("<tr><td  style='vertical-align: top;'><strong>Nro Maq<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
            'Else
            '    tabla.AppendFormat("<tr><td  style='vertical-align: top;'><strong>Autorización<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
            'End If
            tabla.AppendFormat("<tr><td style='vertical-align: top;width: 95px;'><strong>Sucursal<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_SUCURSAL"))
            If exoneradaInd = "S" Then
                tabla.Append("<tr><td></td><td colspan='3'>(Exonerado)</td></tr>")
            End If
            tabla.AppendFormat("<tr><td style='vertical-align: top;width: 95px;'><strong>Vendedor<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("VENDEDOR_USUA_ID")) 'VENDEDOR
            tabla.AppendFormat("<tr><td style='vertical-align: top;width: 95px;'><strong>Condición pago<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MODO_PAGO")) 'Modo de pago
            tabla.AppendFormat("<tr><td style='vertical-align: top;width: 95px;'><strong>Fecha Emisión<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("EMISION")) 'Feha y Hora
            tabla.AppendFormat("<tr><td style='vertical-align: top;width: 95px;'><strong>Fecha Venc.<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("VENCIMIENTO")) 'Feha Vencimiento
            If dtCabecera.Rows(0)("MOPA") = "0002" Then
                tabla.AppendFormat("<tr><td style='vertical-align: top;width: 95px;'><strong>Cuotas<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("CUOTAS")) 'Cuotas
            End If
            tabla.AppendFormat("<tr><td style='vertical-align: top;width: 95px;'><strong>Glosa<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("GLOSA")) 'GLOSA

            tabla.Append("</tbody></table>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
            tabla.Append("<td style='text-align: left;'><strong>Cant.</strong></td><td style='text-align: left;'><strong>U.m.</strong></td><td style='text-align: left;padding-left:5px;' colspan='2'><strong>Descripción</strong></td><td style='text-align: right;'><strong>Total</strong></td>")
            tabla.Append("</tr>")

            If dtCabecera.Rows(0)("MONEDA_BASE") = dtCabecera.Rows(0)("MONEDA") Then
                'DETALLES
                If exoneradaInd = "S" Then
                    'Mostrar precios sin IGV
                    For Each row In dtDetalles.Rows
                        tabla.Append("<tr>")
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                        tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(Decimal.Parse(row("TOTAL")) < 0, ("(" & Decimal.Parse(row("TOTAL")) * (-1) & ")"), row("TOTAL")), vDesc(row("DESCUENTO")))
                        tabla.Append("</tr>")
                    Next
                Else
                    'Mostrar precios con IGV
                    If incIgv = "S" Then
                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                            tabla.Append("<tr>")
                            tabla.AppendFormat("<td valign='TOP' style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                            tabla.AppendFormat("<td valign='TOP' style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                            tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                            tabla.AppendFormat("<td valign='TOP' style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("DESCUENTO")))
                            tabla.Append("</tr>")
                        Next
                    Else

                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                            If row("TIPO_BIEN") = "EXO" Or row("TIPO_BIEN") = "INA" Then
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("DESCUENTO")))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO"))
                            Else
                                Dim PU As Decimal = Math.Round((Decimal.Parse(row("PU")) / (decimalIGV + 1)), 3)
                                Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
                                Dim desc As Decimal = Math.Round((Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)), 2)
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                                tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), IIf(PU < 0, (PU * (-1)), PU))
                                tabla.AppendFormat(" <td style='text-align: right;'>{0}</br><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(total < 0, ("(" & total * (-1) & ")"), total), vDesc(desc.ToString()))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)
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
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                        tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(Decimal.Parse(row("CONVERT_TOTAL")) < 0, ("(" & Decimal.Parse(row("CONVERT_TOTAL")) * (-1) & ")"), row("CONVERT_TOTAL")), vDesc(row("CONVERT_DESCUENTO")))
                        tabla.Append("</tr>")
                    Next
                Else
                    'Mostrar precios con IGV
                    If incIgv = "S" Then
                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("CONVERT_TOTAL")) + Decimal.Parse(row("CONVERT_DESCUENTO")), 2)
                            tabla.Append("<tr>")
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                            tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("CONVERT_DESCUENTO")))
                            tabla.Append("</tr>")
                        Next
                    Else

                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("CONVERT_TOTAL")) + Decimal.Parse(row("CONVERT_DESCUENTO")), 2)
                            If row("TIPO_BIEN") = "EXO" Or row("TIPO_BIEN") = "INA" Then
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("CONVERT_DESCUENTO")))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("CONVERT_DESCUENTO"))
                            Else
                                Dim PU As Decimal = Math.Round((Decimal.Parse(row("CONVERT_PU")) / (decimalIGV + 1)), 3)
                                Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
                                Dim desc As Decimal = Math.Round((Decimal.Parse(row("CONVERT_DESCUENTO")) / (decimalIGV + 1)), 2)
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                                tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), IIf(PU < 0, (PU * (-1)), PU))
                                tabla.AppendFormat(" <td style='text-align: right;'>{0}</br><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(total < 0, ("(" & total * (-1) & ")"), total), vDesc(desc.ToString()))
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
            If (dtCabecera.Rows(0)("TIPO_DCTO") <> "0101") Then
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
                    tabla.AppendFormat("<td colspan='3'><strong>SubTotal</strong></td>")
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

                'If dtCabecera.Rows(0)("CLIE_DCTO_SUNAT") != "06" and dtCabecera.Rows(0)("CLIE_DCTO_SUNAT") != "6" and True  Then
                '    'Op Gravada incluye IGV y ocultar IGV en totales de venta 
                'Else
                '    'Op Gravada no incluye IGV y mostrar IGV en totales de venta  
                'End If
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Op. Gravada<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_GRA"))
                tabla.Append("</tr>")

                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>I.S.C.<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("ISC"))
                tabla.Append("</tr>")

                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>I.G.V. (18%)<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IGV"))
                tabla.Append("</tr>")

            End If

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Importe Total<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("VALOR"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Efectivo<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("EFECTIVO"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Vuelto<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("VUELTO"))
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

            If (dtCabecera.Rows(0)("TIPO_DCTO") <> "0101") Then
                tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            End If

            If dtCabecera.Rows(0)("DETRACCION_IND") = "S" Then
                tabla.Append("<tr>")
                'tabla.AppendFormat("<td colspan='3'><strong>Detracción<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='3'><strong>Detracción {0}<span style='float:right;clear:both;'>{1}</span></strong></td>", dtCabecera.Rows(0)("PORCENTAJE_DETRA"), mon)
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

            If (dtCabecera.Rows(0)("TIPO_DCTO") <> "0101") Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Importe Neto a Pagar<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'><strong>{0}</strong></td>", dtCabecera.Rows(0)("IMPORTE"))
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
            If dtParametroPiePagina IsNot Nothing Then 'PIE DE PAGINA 
                Dim docu = dtCabecera.Rows(0)("NUM_DCTO")
                If dtParametroPiePagina.Rows(0)("VALOR") = "SI" And dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" Then
                    If Not pie_pagina = "" Then
                        tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", pie_pagina)
                        'tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><span style='float:right'></span>{0}</th></tr>", pie_pagina)
                    End If
                ElseIf (docu.substring(0, 2) = "NV") Then
                    ' If Not pie_pagina = "" Then
                    tabla.Append("<td colspan='4' style='text-align: center;'>CANJEAR POR BOLETA O FACTURA</td>")
                    'End If
                Else
                    tabla.Append("<td colspan='4' style='text-align: center;'>GRACIAS POR SU PREFERENCIA</td>")
                End If
            End If
        End If

        tabla.Append("</tr>")
        tabla.Append("</thead>")
        tabla.Append("</thead>")
        tabla.Append("<br>")
        tabla.Append("</table>")

        'tabla.Append("</tbody>")
        'tabla.Append("</table>")

        'tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
        'tabla.Append("<tbody>")
        'tabla.Append("<tr style='border-top: 1px dashed black;'>")

        'tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        'tabla.Append("<tr style='border-top: 1px dashed black;'>")
        'tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
        'tabla.Append("</tr>")

        'tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

        'If dtCabecera IsNot Nothing Then
        '    Dim decimalIGV As Decimal = Decimal.Parse(dtCabecera.Rows(0)("PCTJ_IGV")) / 100

        '    Dim incIgv As String
        '    If USAR_IGV_IND = Nothing Then
        '        incIgv = dtCabecera.Rows(0)("IGV_IMPR_IND")
        '    Else
        '        incIgv = USAR_IGV_IND
        '    End If

        '    Dim exoneradaInd = dtCabecera.Rows(0)("SCSL_EXONERADA_IND")

        '    Dim mon As String = dtCabecera.Rows(0)("SIMBOLO_MONEDA") 'Simbolo de moneda     
        '    Dim descMon As String = dtCabecera.Rows(0)("DESC_MONEDA") 'Descripcion de moneda   

        '    Dim codeMoneda As String = dtCabecera.Rows(0)("MONEDA") 'Código de Moneda

        '    Dim totalSinDscto As Decimal = 0
        '    Dim totalDsctoSinIgv As Decimal = 0

        '    'dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("EMPRESA"), "A", "")

        '    tabla.Append("<table id='tblDctoImprimir' border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'>")
        '    tabla.Append("<thead>")
        '    If dtCabecera.Rows(0)("ANULADO") = "SI" Then
        '        tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
        '        tabla.AppendFormat("<tr><th style='text-align: center;border-top: 1px dashed black;border-bottom: 1px dashed black; color:gray;' colspan='4'>ANULADO</th> </tr>")
        '        tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
        '    End If
        '    tabla.AppendFormat("<td colspan='4'>Fecha Emisón: {0} </td>", dtCabecera.Rows(0)("EMISION"))

        '    'tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        '    'tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
        '    'tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>RUC {0}</th></tr>", dtCabecera.Rows(0)("RUC"))
        '    'tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION"))
        '    'tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>TELEF: {0}</td></tr>", dtCabecera.Rows(0)("TELEFONO"))
        '    'tabla.Append("</thead>")

        '    tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        '    tabla.Append("<tr style='border-top: 1px dashed black;'>")
        '    tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
        '    tabla.Append("</tr>")

        '    tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        '    tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", "TICKET ELECTRÓNICO")
        '    tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("NUM_DCTO"))
        '    tabla.Append("</thead>")

        '    tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        '    tabla.Append("<tr style='border-top: 1px dashed black;'>")
        '    tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
        '    tabla.Append("</tr>")

        '    tabla.Append("<tbody>")
        '    tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        '    'tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("EMISION")) 'Feha y Hora
        '    tabla.AppendFormat("<tr><td style='vertical-align: top;'>Cliente<span style='float:right;clear:both;'>:</span></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
        '    tabla.AppendFormat("<tr><td style='vertical-align: top;'>{0}<span style='float:right;clear:both;'>:</span></td><td colspan='3'>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
        '    tabla.AppendFormat("<tr><td style='vertical-align: top;'>Dirección<span style='float:right;clear:both;'>:</span></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
        '    tabla.AppendFormat("<tr><td style='vertical-align: top;'>Orden de Servicio<span style='float:right;clear:both;'>:</span></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("ORDEN_SERVICIO"))

        '    tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        '    tabla.Append("<tr style='border-top: 1px dashed black;'>")
        '    tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
        '    tabla.Append("</tr>")

        '    tabla.Append("</tbody></table>")

        '    tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
        '    tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
        '    tabla.Append("<td style='text-align: left;'>DESCRIPCION</td><td style='text-align: left;'>CANT</td><td style='text-align: left;padding-left:5px;' colspan='2'>P/U</td><td style='text-align: right;'>TOTAL</td>")
        '    tabla.Append("</tr>")

        '    tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        '    tabla.Append("</tr>")

        '    If dtCabecera.Rows(0)("MONEDA_BASE") = dtCabecera.Rows(0)("MONEDA") Then
        '        'DETALLES
        '        If exoneradaInd = "S" Then
        '            'Mostrar precios sin IGV
        '            For Each row In dtDetalles.Rows
        '                tabla.Append("<tr>")
        '                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
        '                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
        '                tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
        '                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(Decimal.Parse(row("TOTAL")) < 0, ("(" & Decimal.Parse(row("TOTAL")) * (-1) & ")"), row("TOTAL")), vDesc(row("DESCUENTO")))
        '                tabla.Append("</tr>")
        '            Next
        '        Else
        '            'Mostrar precios con IGV
        '            If incIgv = "S" Then
        '                For Each row In dtDetalles.Rows
        '                    totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
        '                    tabla.Append("<tr>")
        '                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
        '                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
        '                    tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
        '                    tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("DESCUENTO")))
        '                    tabla.Append("</tr>")
        '                Next
        '            Else

        '                For Each row In dtDetalles.Rows
        '                    totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
        '                    If row("TIPO_BIEN") = "EXO" Or row("TIPO_BIEN") = "INA" Then
        '                        tabla.Append("<tr>")
        '                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
        '                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
        '                        tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
        '                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("DESCUENTO")))
        '                        tabla.Append("</tr>")
        '                        totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO"))
        '                    Else
        '                        Dim PU As Decimal = Math.Round((Decimal.Parse(row("PU")) / (decimalIGV + 1)), 3)
        '                        Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
        '                        Dim desc As Decimal = Math.Round((Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)), 2)
        '                        tabla.Append("<tr>")
        '                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
        '                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
        '                        tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(PU < 0, (PU * (-1)), PU))
        '                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(total < 0, ("(" & total * (-1) & ")"), total), vDesc(desc.ToString()))
        '                        tabla.Append("</tr>")
        '                        totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)
        '                    End If
        '                Next
        '            End If

        '        End If
        '        'FIN DETALLES

        '    Else ' MONEDA ALTERNA
        '        'DETALLES
        '        If exoneradaInd = "S" Then
        '            'Mostrar precios sin IGV
        '            For Each row In dtDetalles.Rows
        '                tabla.Append("<tr>")
        '                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
        '                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
        '                tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
        '                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(Decimal.Parse(row("CONVERT_TOTAL")) < 0, ("(" & Decimal.Parse(row("CONVERT_TOTAL")) * (-1) & ")"), row("CONVERT_TOTAL")), vDesc(row("CONVERT_DESCUENTO")))
        '                tabla.Append("</tr>")
        '            Next
        '        Else
        '            'Mostrar precios con IGV
        '            If incIgv = "S" Then
        '                For Each row In dtDetalles.Rows
        '                    totalSinDscto = Math.Round(Decimal.Parse(row("CONVERT_TOTAL")) + Decimal.Parse(row("CONVERT_DESCUENTO")), 2)
        '                    tabla.Append("<tr>")
        '                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
        '                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
        '                    tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
        '                    tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("CONVERT_DESCUENTO")))
        '                    tabla.Append("</tr>")
        '                Next
        '            Else

        '                For Each row In dtDetalles.Rows
        '                    totalSinDscto = Math.Round(Decimal.Parse(row("CONVERT_TOTAL")) + Decimal.Parse(row("CONVERT_DESCUENTO")), 2)
        '                    If row("TIPO_BIEN") = "EXO" Or row("TIPO_BIEN") = "INA" Then
        '                        tabla.Append("<tr>")
        '                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
        '                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
        '                        tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
        '                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("CONVERT_DESCUENTO")))
        '                        tabla.Append("</tr>")
        '                        totalDsctoSinIgv += Decimal.Parse(row("CONVERT_DESCUENTO"))
        '                    Else
        '                        Dim PU As Decimal = Math.Round((Decimal.Parse(row("CONVERT_PU")) / (decimalIGV + 1)), 3)
        '                        Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
        '                        Dim desc As Decimal = Math.Round((Decimal.Parse(row("CONVERT_DESCUENTO")) / (decimalIGV + 1)), 2)
        '                        tabla.Append("<tr>")
        '                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
        '                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
        '                        tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(PU < 0, (PU * (-1)), PU))
        '                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(total < 0, ("(" & total * (-1) & ")"), total), vDesc(desc.ToString()))
        '                        tabla.Append("</tr>")
        '                        totalDsctoSinIgv += Decimal.Parse(row("CONVERT_DESCUENTO")) / (decimalIGV + 1)
        '                    End If
        '                Next
        '            End If

        '        End If
        '        'FIN DETALLES

        '    End If

        '    tabla.Append("</tbody></table>")

        '    tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")

        '    tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        '    tabla.Append("<tr style='border-top: 1px dashed black;'>")
        '    tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
        '    tabla.Append("</tr>")

        '    tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        '    tabla.Append("<tr style='border-top: 1px dashed black;'>")
        '    tabla.Append("</tr>")

        '    tabla.Append("<tr>")
        '    If codeMoneda = "0002" Then
        '        tabla.AppendFormat("<td colspan='4' style='text-align: right;'>TOTAL S/ {0} </td>", dtCabecera.Rows(0)("IMPORTE"))
        '    ElseIf codeMoneda = "0003" Then
        '        tabla.AppendFormat("<td colspan='4' style='text-align: right;'>TOTAL $ {0} </td>", dtCabecera.Rows(0)("IMPORTE"))
        '    Else
        '        tabla.AppendFormat("<td colspan='4' style='text-align: right;'>TOTAL {0} </td>", dtCabecera.Rows(0)("IMPORTE"))
        '    End If
        '    tabla.Append("</tr>")

        '    tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        '    tabla.Append("<tr style='border-top: 1px dashed black;'>")
        '    tabla.Append("</tr>")

        '    Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
        '    Dim importeTexto As String
        '    importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("VALOR"))).ToUpper()

        '    tabla.Append("<tr>")

        '    If codeMoneda = "0002" Then
        '        tabla.AppendFormat("<td colspan='4'>Son: {0} <span> SOLES </span></td>", importeTexto.Replace(".-", " (" + descMon + ")"))
        '    ElseIf codeMoneda = "0003" Then
        '        tabla.AppendFormat("<td colspan='4'>Son: {0} <span> DOLARES </span></td>", importeTexto.Replace(".-", " (" + descMon + ")"))
        '    Else
        '        tabla.AppendFormat("<td colspan='4'>Son: {0}</td>", importeTexto.Replace(".-", " (" + descMon + ")"))
        '    End If
        '    tabla.Append("</tr>")

        '    tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        '    tabla.Append("<tr style='border-top: 1px dashed black;'>")
        '    tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
        '    tabla.Append("</tr>")

        '    tabla.Append("</tbody>")
        '    tabla.Append("</table>")

        '    tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
        '    tabla.Append("<tbody>")
        '    tabla.Append("<tr style='border-top: 1px dashed black;'>")

        '    tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        'End If
        'tabla.Append("</tr>")
        'tabla.Append("</thead>")
        'tabla.Append("</thead>")
        'tabla.Append("<br>")
        'tabla.Append("</table>")

        Return tabla.ToString()
    End Function

    Public Function ImprimirTicket(ByVal p_CODE As String, ByVal USAR_IGV_IND As String) As String
        Dim tabla As New StringBuilder

        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        'Dim dtDetallesBonificacion As New DataTable
        'Dim dtDetallesMuestra As New DataTable
        'Dim dtEmpresas As New DataTable
        'Dim dtParametroLogo As New DataTable

        'Dim dtParametroPiePagina As New DataTable

        dtCabecera = nvVenta.ListarCabDctoVentaImpresion(p_CODE, "I")
        dtDetalles = nvVenta.ListarDetDctoVentaImpresion(p_CODE)
        'dtParametroLogo = New Nomade.NC.NCParametros("Bn").ListarParametros("LOVE", "")

        'dtParametroPiePagina = New Nomade.NC.NCParametros("Bn").ListarParametros("PPAG", "")

        If dtCabecera IsNot Nothing Then
            Dim decimalIGV As Decimal = Decimal.Parse(dtCabecera.Rows(0)("PCTJ_IGV")) / 100

            Dim incIgv As String
            If USAR_IGV_IND = Nothing Then
                incIgv = dtCabecera.Rows(0)("IGV_IMPR_IND")
            Else
                incIgv = USAR_IGV_IND
            End If

            Dim exoneradaInd = dtCabecera.Rows(0)("SCSL_EXONERADA_IND")

            Dim mon As String = dtCabecera.Rows(0)("SIMBOLO_MONEDA") 'Simbolo de moneda     
            Dim descMon As String = dtCabecera.Rows(0)("DESC_MONEDA") 'Descripcion de moneda   

            Dim codeMoneda As String = dtCabecera.Rows(0)("MONEDA") 'Código de Moneda

            Dim totalSinDscto As Decimal = 0
            Dim totalDsctoSinIgv As Decimal = 0

            'dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("EMPRESA"), "A", "")

            tabla.Append("<table id='tblDctoImprimir' border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'>")
            tabla.Append("<thead>")
            If dtCabecera.Rows(0)("ANULADO") = "SI" Then
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
                tabla.AppendFormat("<tr><th style='text-align: center;border-top: 1px dashed black;border-bottom: 1px dashed black; color:gray;' colspan='4'>ANULADO</th> </tr>")
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
            End If
            tabla.AppendFormat("<td colspan='4'>Fecha Emisón: {0} </td>", dtCabecera.Rows(0)("EMISION"))

            'tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            'tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            'tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>RUC {0}</th></tr>", dtCabecera.Rows(0)("RUC"))
            'tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION"))
            'tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>TELEF: {0}</td></tr>", dtCabecera.Rows(0)("TELEFONO"))
            'tabla.Append("</thead>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", "TICKET ELECTRÓNICO")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("NUM_DCTO"))
            tabla.Append("</thead>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tbody>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            'tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("EMISION")) 'Feha y Hora
            tabla.AppendFormat("<tr><td style='vertical-align: top;'>Cliente<span style='float:right;clear:both;'>:</span></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'>{0}<span style='float:right;clear:both;'>:</span></td><td colspan='3'>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'>Dirección<span style='float:right;clear:both;'>:</span></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'>Orden de Servicio<span style='float:right;clear:both;'>:</span></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("ORDEN_SERVICIO"))

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("</tbody></table>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
            tabla.Append("<td style='text-align: left;'>DESCRIPCION</td><td style='text-align: left;'>CANT</td><td style='text-align: left;padding-left:5px;' colspan='2'>P/U</td><td style='text-align: right;'>TOTAL</td>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("</tr>")

            If dtCabecera.Rows(0)("MONEDA_BASE") = dtCabecera.Rows(0)("MONEDA") Then
                'DETALLES
                If exoneradaInd = "S" Then
                    'Mostrar precios sin IGV
                    For Each row In dtDetalles.Rows
                        tabla.Append("<tr>")
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                        tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(Decimal.Parse(row("TOTAL")) < 0, ("(" & Decimal.Parse(row("TOTAL")) * (-1) & ")"), row("TOTAL")), vDesc(row("DESCUENTO")))
                        tabla.Append("</tr>")
                    Next
                Else
                    'Mostrar precios con IGV
                    If incIgv = "S" Then
                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                            tabla.Append("<tr>")
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                            tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("DESCUENTO")))
                            tabla.Append("</tr>")
                        Next
                    Else

                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                            If row("TIPO_BIEN") = "EXO" Or row("TIPO_BIEN") = "INA" Then
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("DESCUENTO")))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO"))
                            Else
                                Dim PU As Decimal = Math.Round((Decimal.Parse(row("PU")) / (decimalIGV + 1)), 3)
                                Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
                                Dim desc As Decimal = Math.Round((Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)), 2)
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(PU < 0, (PU * (-1)), PU))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(total < 0, ("(" & total * (-1) & ")"), total), vDesc(desc.ToString()))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)
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
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                        tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(Decimal.Parse(row("CONVERT_TOTAL")) < 0, ("(" & Decimal.Parse(row("CONVERT_TOTAL")) * (-1) & ")"), row("CONVERT_TOTAL")), vDesc(row("CONVERT_DESCUENTO")))
                        tabla.Append("</tr>")
                    Next
                Else
                    'Mostrar precios con IGV
                    If incIgv = "S" Then
                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("CONVERT_TOTAL")) + Decimal.Parse(row("CONVERT_DESCUENTO")), 2)
                            tabla.Append("<tr>")
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                            tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("CONVERT_DESCUENTO")))
                            tabla.Append("</tr>")
                        Next
                    Else

                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("CONVERT_TOTAL")) + Decimal.Parse(row("CONVERT_DESCUENTO")), 2)
                            If row("TIPO_BIEN") = "EXO" Or row("TIPO_BIEN") = "INA" Then
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("CONVERT_DESCUENTO")))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("CONVERT_DESCUENTO"))
                            Else
                                Dim PU As Decimal = Math.Round((Decimal.Parse(row("CONVERT_PU")) / (decimalIGV + 1)), 3)
                                Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
                                Dim desc As Decimal = Math.Round((Decimal.Parse(row("CONVERT_DESCUENTO")) / (decimalIGV + 1)), 2)
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", IIf(PU < 0, (PU * (-1)), PU))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(total < 0, ("(" & total * (-1) & ")"), total), vDesc(desc.ToString()))
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

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            If codeMoneda = "0002" Then
                tabla.AppendFormat("<td colspan='4' style='text-align: right;'>TOTAL S/ {0} </td>", dtCabecera.Rows(0)("IMPORTE"))
            ElseIf codeMoneda = "0003" Then
                tabla.AppendFormat("<td colspan='4' style='text-align: right;'>TOTAL $ {0} </td>", dtCabecera.Rows(0)("IMPORTE"))
            Else
                tabla.AppendFormat("<td colspan='4' style='text-align: right;'>TOTAL {0} </td>", dtCabecera.Rows(0)("IMPORTE"))
            End If
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
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
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("</tbody>")
            tabla.Append("</table>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
        End If
        tabla.Append("</tr>")
        tabla.Append("</thead>")
        tabla.Append("</thead>")
        tabla.Append("<br>")
        tabla.Append("</table>")

        Return tabla.ToString()
    End Function

    'Tabla de busqueda de documentos 'DPORTA 
    Public Function GenerarTablaDocumentos(ByVal dtDocumentoAtenciones As DataTable) As String

        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblBuscarDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>NRO. ATENCIÓN</th>")
        resb.AppendFormat("<th>CLIENTE</th>")
        resb.AppendFormat("<th>MONTO</th>")
        resb.AppendFormat("<th>ABOGADO</th>")
        resb.AppendFormat("<th>FECHA EMISIÓN</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr class='doc_fila' onclick=""setSeleccionDocumento('{0}','{1}','{2}','{3}','{4}')"" id='doc_fila_{0}'>", dt.Rows(i)("NRO_ATENCION").ToString(), dt.Rows(i)("NOMBRE_CLIENTE").ToString(), dt.Rows(i)("PIDM_ABOGADO").ToString(), dt.Rows(i)("VALOR_TOTAL_OS").ToString(), dt.Rows(i)("NOMBRE_ABOGADO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_ATENCION").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NOMBRE_CLIENTE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("VALOR_TOTAL_OS").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NOMBRE_ABOGADO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_CIERRE").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaDocumento(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th style='max-width:52px;'>CÓDIGO</th>")
        resb.AppendFormat("<th style='max-width:70px;'>ORDEN DE SERVICIO</th>")
        resb.AppendFormat("<th style='max-width:70px;'>DOCUMENTO</th>")
        resb.AppendFormat("<th style='max-width:52px;'>FECHA<br/>EMISIÓN</th>")
        resb.AppendFormat("<th style='max-width:90px;'>NRO. DOC.</th>")
        resb.AppendFormat("<th style='max-width:300px;'>CLIENTE</th>")
        resb.AppendFormat("<th style='max-width:52px;'>MONEDA</th>")
        resb.AppendFormat("<th style='max-width:90px;'>TOTAL</th>")
        resb.AppendFormat("<th style='max-width:52px;'>MODO<br/>PAGO</th>")
        resb.AppendFormat("<th style='max-width:52px;'>FORMA<br/>PAGO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>ABOGADO</th>")
        resb.AppendFormat("<th style='min-width:90px;'>ESTADO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>VIGENCIA</th>")
        resb.AppendFormat("<th style='max-width:25px;'>#</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                'If dt.Rows(i)("VENTA_RAPIDA_IND").ToString() = "S" Then
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ORDEN_SERVICIO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td align='left' data-order='" + ObtenerFecha(dt.Rows(i)("EMISION").ToString) + "'>{0}<br/><small style='color:#6C7686;'>{1}</small></td>", dt.Rows(i)("EMISION").ToString(), dt.Rows(i)("FECHA_ACTV").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CLIE_DOID_NRO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA_DESC_CORTA").ToString())
                resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("IMPORTE").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("MOPA_DESC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("FOPA_DESC").ToString())
                'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NOMBRE_VENDEDOR").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("VENDEDOR_USUA_ID").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ATENDIDO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("ANULADO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>")
                If dt.Rows(i)("COMPLETO").ToString() = "COMPLETO" Then
                    resb.AppendFormat("<a class='btn blue' onclick=""imprimirDetalle('{0}','{1}','{2}','{3}')""><i class='icon-print'></i></a>", dt.Rows(i)("CODE").ToString(), dt.Rows(i)("NUM_DCTO").ToString(), dt.Rows(i)("TIPO_DCTO"), dt.Rows(i)("ELECTRONICO_IND"))
                Else
                    resb.AppendFormat("")
                End If

                resb.AppendFormat("</td>")
                resb.AppendFormat("</tr>")
                'End If
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function


    Public Function GenerarTablaDocumentoImprimir(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id='tblDocumento' style='width: 100%;' align='center'  border='1'>")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th><strong>CÓDIGO</strong></th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>FECHA<br/>EMISIÓN</th>")
        resb.AppendFormat("<th>NRO. DOC.</th>")
        resb.AppendFormat("<th>CLIENTE</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>TOTAL</th>")
        resb.AppendFormat("<th>MODO<br/>PAGO</th>")
        resb.AppendFormat("<th>FORMA<br/>PAGO</th>")
        resb.AppendFormat("<th>ABOGADO</th>")
        resb.AppendFormat("<th style='min-width:90px;max-width:110px;'>ESTADO</th>")
        resb.AppendFormat("<th>VIGENCIA</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CODE").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("EMISION").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("CLIE_DOID_NRO").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("MONEDA_DESC_CORTA").ToString())
                resb.AppendFormat("<td align='right'>{0}</td>", dt.Rows(i)("IMPORTE").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("MOPA_DESC").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("FOPA_DESC").ToString())
                'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NOMBRE_VENDEDOR").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("VENDEDOR_USUA_ID").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("ATENDIDO").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("ANULADO").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function


    'CORREO    
    Public Function GenerarPDF(ByVal CODIGO As String) As String
        Dim ress As String = ""
        Dim htmlText As String = ""
        Dim cNomArch As String = CODIGO & ".pdf"
        htmlText = getHtmlTextPDF(CODIGO)
        HTMLToPDF(htmlText, cNomArch, CODIGO)
        Return ress
    End Function

    Function getHtmlTextPDF(ByVal codigo As String) As String
        Dim htmlText As New StringBuilder
        htmlText.Length = 0
        Dim documento As String = ""
        documento = GenerarDctoCorreo(codigo, USAR_IGV_IND, "")
        htmlText.Append(documento)
        Return htmlText.ToString
    End Function

    Sub HTMLToPDF(ByVal HTML As String, ByVal FilePath As String, ByVal p_CODE As String)

        Dim nc As New Nomade.NC.NCEmpresa("Bn")
        Dim dtCabecera As DataTable
        dtCabecera = nvVenta.ListarCabDctoVentaImpresion(p_CODE, "C")

        Dim imgS, imgI As String

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
            imgCabConQR(FilePath, imgS, imgI, Base64ToImage(codigoQR.fnGetCodigoQR(p_CODE))) 'SOLO PARA ´DOCS ELECTRÓNICOS
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
        Dim dtParametroPiePagina As New DataTable

        dtCabecera = nvVenta.ListarCabDctoVentaImpresion(p_CODE, "C")
        dtDetalles = nvVenta.ListarDetDctoVentaImpresion(p_CODE)
        dtParametroPiePagina = New Nomade.NC.NCParametros("Bn").ListarParametros("PPAG", "")

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
            'OBTENER EL TEXTO QUE VA A IR EN LA IMPRESION COMO PIE DE PAGINA
            Dim pie_pagina As String = ""
            pie_pagina = getLinks(dtParametroPiePagina(0)("DESCRIPCION_DETALLADA").ToString)
            'VARIABLE PARA COLOCAR EL QR EN EL PDF
            ' Dim rutaQr As String = dtCabecera(0)("IMAGEN_QR").ToString
            Dim codeMoneda As String = dtCabecera.Rows(0)("MONEDA") 'Código de Moneda
            Dim mon As String = dtCabecera.Rows(0)("SIMBOLO_MONEDA") 'Simbolo de moneda            
            Dim descMon As String = dtCabecera.Rows(0)("DESC_MONEDA") 'Descripcion de moneda  

            If mon = "002" Then
                Dim monedaLetras As String = "SOLES"
            Else
                Dim monedaLetras As String = "DOLARES"
            End If

            Dim totalSinDscto As Decimal = 0
            Dim totalDsctoSinIgv As Decimal = 0

            tabla.Append("<br>")
            tabla.Append("<br>")
            tabla.Append("<table border='0' style='width: 90%;' align='center'>")
            tabla.Append("<thead>")
            tabla.Append("<tr><th border='1' style='border-top:1px solid black;'></th></tr>")
            tabla.Append("<tr><th>&nbsp;</th></tr>")
            tabla.AppendFormat("<tr><th align='left' style='font-size:12pt;font-family:Arial,sans-serif'>VENTA CON {0}</th></tr>", dtCabecera.Rows(0)("DOCUMENTO"))
            tabla.Append("<tr><th>&nbsp;</th></tr>")
            tabla.Append("<tr><th border='1' style='border-top:1px solid black;'></th></tr>")
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
            If exoneradaInd = "S" Then
                tabla.Append("<tr><td></td><td colspan='3'>(Exonerado)</td></tr>")
            End If
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Abog.</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("VENDEDOR_USUA_ID")) 'VENDEDOR
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Moneda</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MONEDA"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Glosa</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("GLOSA"))
            tabla.Append("<tr><td colspan='4' border='1' style='border-top:1px solid black;' ></td></tr>")
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>{1}</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("NUM_DCTO"), dtCabecera.Rows(0)("DOCUMENTO_MIN"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Cliente</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>{0}</strong></td><td colspan='3'><strong>: </strong>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Dirección</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
            tabla.Append("<tr><td colspan='4' border='1' style='border-top:1px solid black;' ></td></tr>")
            tabla.Append("</tbody>")
            tabla.Append("</table>")
            tabla.Append("<br>")

            tabla.Append("<table border='1' style='width: 90%;border-collapse:collapse' align='center' font size=9pt ><tbody>")
            tabla.Append("<tr style='background-color: #D6EAF8;'>")
            tabla.Append("<td style='text-align: center;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt'><strong>Cant.</strong></td>")
            tabla.Append("<td style='text-align: center;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt'><strong>Und.</strong></td>")
            tabla.Append("<td style='text-align: center;padding-left:5px;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt' colspan='2'><strong>Descripción</strong></td>")
            tabla.Append("<td style='text-align: center;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt'><strong>P. Unit</strong></td>")
            tabla.Append("<td style='text-align: center;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt'><strong>Total</strong></td>")
            tabla.Append("</tr>")

            If dtCabecera.Rows(0)("MONEDA_BASE") = dtCabecera.Rows(0)("MONEDA") Then
                'DETALLES
                If exoneradaInd = "S" Then
                    'Mostrar precios sin IGV
                    For Each row In dtDetalles.Rows
                        tabla.Append("<tr>")
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                        tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(Decimal.Parse(row("TOTAL")) < 0, ("(" & Decimal.Parse(row("TOTAL")) * (-1) & ")"), row("TOTAL")), vDesc(row("DESCUENTO")))
                        tabla.Append("</tr>")
                    Next
                Else
                    'Mostrar precios con IGV
                    If incIgv = "S" Then
                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                            tabla.Append("<tr>")
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                            tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("DESCUENTO")))
                            tabla.Append("</tr>")
                        Next
                    Else

                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                            If row("TIPO_BIEN") = "EXO" Or row("TIPO_BIEN") = "INA" Then
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                                tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                                tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("DESCUENTO")))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO"))
                            Else
                                Dim PU As Decimal = Math.Round((Decimal.Parse(row("PU")) / (decimalIGV + 1)), 3)
                                Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
                                Dim desc As Decimal = Math.Round((Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)), 2)
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                                tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                                tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(PU < 0, (PU * (-1)), PU))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}</br><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(total < 0, ("(" & total * (-1) & ")"), total), vDesc(desc.ToString()))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO")) / (decimalIGV + 1)
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
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                        tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(Decimal.Parse(row("CONVERT_TOTAL")) < 0, ("(" & Decimal.Parse(row("CONVERT_TOTAL")) * (-1) & ")"), row("CONVERT_TOTAL")), vDesc(row("CONVERT_DESCUENTO")))
                        tabla.Append("</tr>")
                    Next
                Else
                    'Mostrar precios con IGV
                    If incIgv = "S" Then
                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("CONVERT_TOTAL")) + Decimal.Parse(row("CONVERT_DESCUENTO")), 2)
                            tabla.Append("<tr>")
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                            tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("CONVERT_DESCUENTO")))
                            tabla.Append("</tr>")
                        Next
                    Else

                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("CONVERT_TOTAL")) + Decimal.Parse(row("CONVERT_DESCUENTO")), 2)
                            If row("TIPO_BIEN") = "EXO" Or row("TIPO_BIEN") = "INA" Then
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                                tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                                tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(Decimal.Parse(row("CONVERT_PU")) < 0, (Decimal.Parse(row("CONVERT_PU")) * (-1)), row("CONVERT_PU")))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(totalSinDscto < 0, ("(" & totalSinDscto * (-1) & ")"), totalSinDscto), vDesc(row("CONVERT_DESCUENTO")))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("CONVERT_DESCUENTO"))
                            Else
                                Dim PU As Decimal = Math.Round((Decimal.Parse(row("CONVERT_PU")) / (decimalIGV + 1)), 3)
                                Dim total As Decimal = Math.Round((totalSinDscto / (decimalIGV + 1)), 2)
                                Dim desc As Decimal = Math.Round((Decimal.Parse(row("CONVERT_DESCUENTO")) / (decimalIGV + 1)), 2)
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                                tabla.AppendFormat("<td style='text-align: left;' colspan='2'>{0}</td>", row("NOMBRE_IMPRESION").ToString())
                                tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(PU < 0, (PU * (-1)), PU))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}</br><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", IIf(total < 0, ("(" & total * (-1) & ")"), total), vDesc(desc.ToString()))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("CONVERT_DESCUENTO")) / (decimalIGV + 1)
                            End If
                        Next
                    End If

                End If
                'FIN DETALLES


            End If

            tabla.Append("</tbody></table>")

            tabla.Append("<table border='0' style='width: 90%;' align='center' font size=9pt><tbody>")
            If incIgv = "S" Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Total Descuento {0}</strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DESCUENTO"))
                tabla.Append("</tr>")
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>SubTotal {0}</strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("VALOR"))
                tabla.Append("</tr>")
            Else
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Total Descuento {0}</strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", Math.Round(totalDsctoSinIgv, 2))
                tabla.Append("</tr>")
                Dim baseImponible As Decimal = Math.Round(
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_EXO")) +
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_INA")) +
                    Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_GRA")), 2)

                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>SubTotal {0}</strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", baseImponible)
                tabla.Append("</tr>")

            End If
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Op. Exonerada {0}</strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_EXO"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Op. Inafecta {0}</strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_INA"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Op. Gravada {0}</strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_GRA"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>I.S.C. <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("ISC"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>I.G.V. <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IGV"))
            tabla.Append("</tr>")



            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Importe Total <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("VALOR"))
            tabla.Append("</tr>")

            Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
            Dim importeTexto As String
            importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("VALOR"))).ToUpper()

            tabla.Append("<tr>")

            If codeMoneda = "0002" Then
                tabla.AppendFormat("<td colspan='4' style='text-align: right;'>Son: {0} <span> SOLES </span></td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            ElseIf codeMoneda = "0003" Then
                tabla.AppendFormat("<td colspan='4' style='text-align: right;'>Son: {0} <span> DOLARES </span></td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            Else
                tabla.AppendFormat("<td colspan='4' style='text-align: right;'>Son: {0}</td>", importeTexto.Replace(".-", " (" + descMon + ")"))
            End If
            tabla.Append("</tr>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")


            If dtCabecera.Rows(0)("DETRACCION_IND") = "S" Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Detracción <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DETRACCION"))
                tabla.Append("</tr>")
            End If

            If dtCabecera.Rows(0)("PERCEPCION_IND") = "S" Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Percepción <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("PERCEPCION"))
                tabla.Append("</tr>")
            End If

            If dtCabecera.Rows(0)("RETENCION_IND") = "S" Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Retención <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("RETENCION"))
                tabla.Append("</tr>")
            End If

            If Not Decimal.Parse(dtCabecera.Rows(0)("REDONDEO")) = 0 Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Redondeo <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("REDONDEO"))
                tabla.Append("</tr>")
            End If

            If Not Decimal.Parse(dtCabecera.Rows(0)("DONACION")) = 0 Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Donación <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DONACION"))
                tabla.Append("</tr>")
            End If


            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Importe Neto a Pagar <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE"))
            tabla.Append("<br>")
            tabla.Append("</tr>")


            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr><td colspan='4' border='1'></td></tr>")
            tabla.Append("<tr>")
            If dtParametroPiePagina IsNot Nothing Then 'PIE DE PAGINA 
                If dtParametroPiePagina.Rows(0)("VALOR") = "SI" And dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" Then
                    If Not pie_pagina = "" Then
                        tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", pie_pagina)
                        'tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><span style='float:right'></span>{0}</th></tr>", pie_pagina)
                    End If
                Else
                    ' If Not pie_pagina = "" Then
                    tabla.Append("<td colspan='4' style='text-align: center;'>GRACIAS POR SU PREFERENCIA</td>")
                    'End If
                End If
            End If
            'tabla.Append("<td colspan='4' style='text-align: center; border-top:1px solid black;font-size:8pt;font-family:Arial,sans-serif'>GRACIAS POR SU COMPRA!!!</td>")
            'tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaQr)
            tabla.Append("</tr>")
            tabla.Append("</tbody>")
            tabla.Append("</table>")

            'LUGAR DONDE SE VA A DIBUJAR EL QR EN EL PDF
            'tabla.Append("<br><table border='0' style='width: 90%;' align='center' font size=9pt>")
            'tabla.Append("<tr>")
            ''tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE"))
            'tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><link rel='stylesheet' type='text/css' href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAJuElEQVR4Xu3d0XrjOAgF4Pb9H7r7JU1mU8eiP+A0mQ57uSMLCQ6Hg+S4729vbx9vB//38fH/lO/v719mX/3b7f9fLed2Lhl/mmf1zHZdV5u6vu7zWZev7GXn2Y4/RWcAcOOVAUAXUidEDQOcvVhhLGG/A0L0Z4ovDKC0ureAIzd7O/+j5hUnPtP2HVXflNKj4nQG6W0JOGrizjyP2rgE/JVsP2otWy0xAAiQ8U8zgKhOEUxRFyBUL2pbs1sCKmOi7Lz9txUTdm1EGmvPF9H4JQMMAL6K2QhkWZAOAHa82enXhwFiDzyVASp0WcmQVTlZUXKH4U5zCg1nxyjLyLy674eXgAHApweyZUK7gC6QBwBB2lUOtDTzruO0Zc6WSF3HwwEgCI0o9UglLWVihYcoUFKyJIAVG+Lfp2oAWeAA4BN2A4BL+nUyqtIRyDOV4KwYR85Pnq4BxCmywZ9QtmojuydV21rHr/YF4AqA7J5e6ihY6mKlJndqvYqn1TgJyADgG6oX3aBZJ3MJyKJ5dC0vzwCCXhlTaZ+kLipjHDXXq+5DYqBjXvKNIAn0qwbnKPBFnZEGV8YNAIJj3VcFmQRWx7x/ZAuYzrxT57ePimkRTNGVs7CJCDq91u52Rkn3tocPADYulJPHLT2voiDgbUewOcEAYABw8wpvEk3dG64sXXZaukhUSdZLudq6T9b7bJ3RYoABQJwxA4AEo0i9FIdGJqVFy7JSZE/WOwyw0y0IJSew9WfoAOD+xZQvJSCL2EoQsmWju6bO88JKJx8cZUPZS1hK/TwACO7hBwA7kKyo4RViKwcwe1mid/WrDJOS8xM2XooB5C5caqreomVptJudEvRKicuCWvwctbAre+0SIAsbAMQQEZCJnwcAFz8L4PQwRoLzzzFAtlYLDR95iSL2IgBotl3n6PboKwAxPS9+Eq7PX+1HflueBIoRCcgA4B4G4ttteyngFVbbjhkABDz/zzHAKqNFoasaFSR32rVuK5W1XTkIUgaQAx/RKVH8lgdBRwUqKgEdYIle2TpHKHIA8I3iFsRVqDM77wBAPPY5ps0A4uyfOCGsUKco8Ue1l7LeLAseXeKoBAwAakp+AOAsRb+fF4eqSRG8lfN/0U4yRvexEt+StOfycPtWcLavF+pUEShzVVSxgEbAEAlK8VsloNl1CbDCcwDZiCyqIgIHAHGZyQZXgD8McPG5gPrXMkD2Y9HZTN06TpwtNiL1LM9nKflIe+KDHzvDGAAYFAYA3xwQ6TmAoF8y+MiACASOtCc+eAoDiOO1vbiO01YqazsKWlbMCgAU4B3/HAkyOQA7i8DV18KPcuIAIIaXqPvTDEclyBZkAwBJ/2++4KXZtjduAHCQtsgeEmXP4H9tCeh8H6BbJrK0pkHLBkvnRbL4M0zWEflQDnMkBqFeGgDYL3uywd/WbSkTd8e0m7+4tiesBwA7npXMy6r1XwuA1UGQ0HOWoqKsyPbGKp4qgcu2sCsb3TWugCx+F8a5awNvHxoA+Ld7BwAbD+htoCh3QfszRJzY/KsZIMsGSjnCLFlgHHnYlC1FKvY6pShU8c2/J0jfCcwGLRJY2bkkIAOAT49nxW+oAYYB7O8CVR1/FCO020C5Ds7WMs1IAZmMUXudfVQuarJrr9iQPUVjWiVA1O92TEfUZcvHmeKSP7CUoG331AmCPLtlmeyeBgCXiKmz984BKtkpYNI1CfgryUUMIPVKFhixgTwvrZdmi3YtwnLi+EgYZ/2b7ZJWQGQRmF2gChOhMs2QbLYNAD49MAywQUKXZaJsu/6b2sjOJclyd+GUfSNIsjaknMUN1yOotiJAhe224lKf2dMW2Wcr48Mr5wFA8QAlCWTJ5kpw5ZkBwMVLWbEWObdC4y/JAJ3fBnaFl4jFiqOztVDWoWCoHMeKIJWrYbG99Wfrx6EDgIuSbl7IDADwe71S705jhgHWngoZ4PYxoUWhZ6GlCr2K7S0YVvsTgba119mXahEdt9deSsk4dzOrl0IHAF9hOQDYSVPJwk6mbPttofbtMjUTvlPoA4ABwBcPdICt1K7jDisBYlBKg9Z0FXV72VlZhzwjrKbrzl5wdd9ryLLdnQYYABz7I5EBQLFsrDJMHKrsU8kWzfwMYwkrqRaq7Im6gEqbJM56RB2N7AqAtASIIJWARPNk15u1x23gAOAeVgOAjU80cwRMwh5de9lr7ai9FO10+7zafhkGqFDLKohZZwkYtmOkrkoQJMv13EH2EZ01ZP2mCUIaYADg3cGRukYAKLEJhfFRR8G68SySJXOGAe69xAyweiMo63g1eFSLF9nrZI7U6qgtWz2f3bdqjuxet35bfiRqALD+UckAYAcdwwA1GpYMPs2c7QhW3dahDCBqO8sk3Xpesaf6Reg9O1fkQ9FLMiZad6sEDADu4TYAqKRg8IyA7Mjyo8vPZp6ci2zBIzZkDDOAKFXZiDpRelipfVHZ0Fp4Hac1WfYo+5N5dExl7fTTMKG1ShaKgwYAGn57GfYuWbIfiBgGqAVEBKTPvD+yzQCVbNtbSlfZZh3xE4dClTIjyRKxq9R30UiRP1tfC69sUDY1APj0gPhqAPDNn0YVWhSN808zwEpJS12rtDYVZsmyhtiQfUeZKmsSgMo81TFUAsQRQldKaxKcStaKk3QfAn6xNwC4eEkC2q13EpABwMVLWUfoeB2X7S4kuDKmsr7KGch1LU9ngM4fjOg49PSstJ2VgKzoWZwth1Pbfcu8qzKqLWynLIZt+QDgq2sHAJLWiTGK8BVKhwFiZ4suChlAjoIT8T4P1dOtjvDT00YpM1Iytj6Qui+2n54gA4CvoZWMitpZqfWqGToAkuQ672MAMAD42GtJsrSfreE6f0WUrbJQqL7LANn1RmwgWSwaKSozrVfCsg7VoGcDGM0rARGqVQ0g9qRMfKelrnMMAL5BlQRkAHBxooqTvZJRoc4OxUUsIWvpZo6wmQBLugmxFTFGqQTIwmSDEXUOAPw3hwICYbu7eMjHolfGBwBxWMQ/kmgS/F/FAFkKFybR3l3Avp1LAl0RzJLR2bL9VzDAAOAzTAOAghMiuuzQ7TYYcu7RDWD3eSkd6TeCpIfVuwBZoFBcFJzsmUKWzqPSInP9xF0AXwaJswcA97DNtpTq5w6A5NkzeJ/ZBQwDxG2gBLEDvhAAEhxRtlqTVcnLusQp2XkqGqBTfo48P4kY5+F3AQOAmqIfAEiKLsYMA/jfTP7x9wEkrtkWS9u7o2qqspoeKq3GiR/En2FX9tMvhMiCZeOqpLNdS5c9BIyqd8QP4s8BwMVLwwA7LewwgH1YoZK1f0MJ+A8xB09eZl0+lwAAAABJRU5ErkJggg=='></td>")
            'tabla.Append("</tr>")


            'tabla.Append("</table>")
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

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

End Class

<%@ WebHandler Language="VB" Class="NVLUTBR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLUTBR : Implements IHttpHandler
    Dim OPCION, USUARIO, CTLG_CODE, MONEDA_CODE, CODE_PARAMETRO, TIPO_DCTO, PROD_CODE, NUM_DCTO, p_CODE As String

    Dim USUA_ID, PIDM, CTLG, SCSL, ALMC_CODE, SERIADO_IND, PRECIO_IND, CODIGO_CATEGORIA, TIPO_CAMBIO, p_FVBVTAC_SEQ_DOC, p_FVBVTAC_CODE, p_PLAZO As String

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
       p_DCTO_NUM_REF, p_VALOR_CAMBIO_OFI, p_COD_AUT, p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, p_RESP_PIDM As String

    Dim p_PLAN_CODE, p_DESC_PLAN, p_TIPO_DCTO_PLAN As String

    Dim p_DESPACHO_VENTA_IND, p_DETALLES_PAGO, p_COBRAR_IND, p_VALIDAR_STOCK_IND As String

    Dim USAR_IGV_IND As String

    Dim SCSL_CODE, DESC, COMP_VENT_IND, DCTO_CODE,
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

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

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

        Try

            Select Case OPCION

                Case "LDOCD" ' Listar Detalles de Documento Venta FVBVTAC -> FVRVTAD
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarDetalleDocumentoVentaUtilidad(p_FVBVTAC_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""SECUENCIA"":""" & row("SECUENCIA").ToString & """,")
                            resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                            resb.Append("""PROD_CODE"":""" & row("PROD_CODE").ToString & """,")
                            resb.Append("""NOMBRE_IMPRESION"":""" & row("NOMBRE_IMPRESION").ToString & """,")
                            'resb.Append("""UNIDAD"":""" & row("UNIDAD").ToString & """,")
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
                            'resb.Append("""CENTRO_COSTO_CODE"":""" & row("CENTRO_COSTO_CODE").ToString & """,")
                            'resb.Append("""CUENTA_CODE"":""" & row("CUENTA_CODE").ToString & """,")
                            'resb.Append("""USUA_ID"":""" & row("USUA_ID").ToString & """,")
                            'resb.Append("""TIPO_PROD"":""" & row("TIPO_PROD").ToString & """,")
                            'resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """,")
                            resb.Append("""ALMC_CODE"":""" & row("ALMC_CODE").ToString & """,")
                            'resb.Append("""ALMACENABLE"":""" & row("ALMACENABLE").ToString & """,")
                            'resb.Append("""TIPO_BIEN"":""" & row("TIPO_BIEN").ToString & """,")
                            'resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                            'resb.Append("""ISC"":""" & row("ISC").ToString & """,")
                            'resb.Append("""CONVERT_DETRACCION"":""" & row("CONVERT_DETRACCION").ToString & """,")
                            'resb.Append("""CONVERT_ISC"":""" & row("CONVERT_ISC").ToString & """,")
                            'resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""PROD_CODIGO_ANTIGUO"":""" & row("PROD_CODIGO_ANTIGUO").ToString & """,")
                            'resb.Append("""SERIADO"":""" & row("SERIADO_IND").ToString & """,")
                            resb.Append("""CODE_DCTO_ORIGEN"":""" & row("CODE_DCTO_ORIGEN").ToString & """,")

                            resb.Append("""PRECIO_IND"":""" & row("PRECIO_IND").ToString & """,")
                            'resb.Append("""PROD_DETRACCION_DECIMALES"":""" & row("PROD_DETRACCION_DECIMALES").ToString & """,")
                            'resb.Append("""PROD_DETRACCION"":""" & row("PROD_DETRACCION").ToString & """,")
                            'resb.Append("""PROD_ISC"":""" & row("PROD_ISC").ToString & """,")
                            resb.Append("""COSTO_PRODUCTO"":""" & row("COSTO_PRODUCTO").ToString & """,")
                            resb.Append("""COSTO_PRODUCTO_SEGUN_EXO"":""" & row("COSTO_PRODUCTO_SEGUN_EXO").ToString & """,")

                            'resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """")
                            resb.Append("""UTILIDAD_ITEM"":""" & row("UTILIDAD_ITEM").ToString & """,")
                            resb.Append("""UTILIDAD_UNIDAD"":""" & row("UTILIDAD_UNIDAD").ToString & """,")
                            resb.Append("""PORCENTAJE_UTILIDAD"":""" & row("PORCENTAJE_UTILIDAD").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "3" ' Obtiene tabla con documentos de venta, NO lista anulados
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarDctoVentaUtilidad("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, "N", PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE, "", GRUPO_PROD)
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
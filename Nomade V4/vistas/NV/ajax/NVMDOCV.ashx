<%@ WebHandler Language="VB" Class="NVMDOCV" %>

Imports iTextSharp.text
Imports iTextSharp.text.pdf
Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.IO.FileStream

Public Class NVMDOCV : Implements IHttpHandler

    Dim OPCION, USUARIO, CTLG_CODE, MONEDA_CODE, CODE_PARAMETRO, TIPO_DCTO, PROD_CODE, NUM_DCTO, p_CODE, p_TOTAL_GRATUITAS, COD_UNI As String

    Dim USUA_ID, PIDM, CTLG, SCSL, ALMC_CODE, ALMC, DESC_ALMC, DESP_VENTA, SERIADO_IND, PRECIO_IND, CODIGO_CATEGORIA, TIPO_CAMBIO, p_FVBVTAC_SEQ_DOC, p_FVBVTAC_CODE, p_PLAZO, DOC_CODE As String

    Dim p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE, p_FECHA_EMISION, p_FECHA_TRANS, p_FECHA_VENCIMIENTO,
       p_CMNT_DCTO, p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, p_MONE_CODE, p_VALOR,
       p_DESCUENTO, p_IGV, p_IMPORTE, p_MOPA_CODE, p_FOPA_CODE, p_CLIE_PIDM,
       p_CLIE_DOID, p_USVE_USUA_ID, p_COMPLETO_IND, p_CODE_REF, p_DCTO_CODE_REF,
       p_VALOR_CAMBIO, p_USUA_ID, p_ISC, p_IMPORTE_EXO, p_IMPORTE_INA, p_IMPORTE_GRA, p_IMPORTE_REDONDEO,
       p_IMPORTE_DONACION, p_IMPORTE_DETRACCION, p_IMPORTE_RETENCION,
       p_IMPORTE_PERCEPCION, p_IMPORTE_OTROS, p_IMPR_CODE, p_DETRACCION_IND, p_PERCEPCION_IND, p_RETENCION_IND,
       p_NUM_DCTO_PERCEP, p_NUM_DCTO_DETRAC, p_NUM_DCTO_RETEN,
       p_FECHA_EMISION_PERCEP, p_FECHA_EMISION_DETRAC, p_FECHA_EMISION_RETEN,
       p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND, p_DETALLES, p_DETALLES_BONI, p_DETALLES_MUESTRA, p_DCTO_SERIE_REF,
       p_DCTO_NUM_REF, p_VALOR_CAMBIO_OFI, p_COD_AUT, p_ALMACENABLE, p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, p_RESP_PIDM, p_DIRECCION,
      p_LATITUD, p_LONGITUD, P_MES, P_ANIO, P_MONTO, p_DOCUMENTO, p_CODIGO, p_NCMOCONT_CODIGO As String

    Dim p_PLAN_CODE, p_DESC_PLAN, p_TIPO_DCTO_PLAN As String

    Dim USAR_IGV_IND As String
    Dim COPIA_IND As String
    'ssss

    Dim p_ESTADO_IND As String
    Dim p_CLIE_DOID_NRO As String
    'CORREO
    Dim NREMITENTE, DESTINATARIOS, ASUNTO, MENSAJE As String
    'PDF 
    Dim imagen As String

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
    Dim GRUP_PROD, SUBGRUPO_CODE As String
    Dim MARCA_CODE As String
    Dim p_IMGQR As String

    'Dim oTransaction As New Nomade.DataAccess.Transaccion()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        p_IMGQR = context.Request("p_IMGQR")
        CTLG_CODE = vChar(context.Request("CTLG_CODE"))
        OPCION = context.Request("OPCION")
        USUARIO = context.Request("USUARIO")
        MONEDA_CODE = context.Request("MONEDA_CODE")
        CODE_PARAMETRO = context.Request("CODE_PARAMETRO")
        p_FVBVTAC_CODE = context.Request("p_FVBVTAC_CODE")
        p_FVBVTAC_SEQ_DOC = context.Request("p_FVBVTAC_SEQ_DOC")
        COD_UNI = context.Request("COD_UNI")

        'NUEVOS
        USUA_ID = context.Request("USUA_ID")
        PIDM = context.Request("PIDM")
        CTLG = context.Request("CTLG")
        SCSL = context.Request("SCSL")
        ALMC_CODE = context.Request("ALMC_CODE")

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
        p_DOCUMENTO = context.Request("p_DOCUMENTO")
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
        p_CODIGO = context.Request("p_CODIGO")

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

        p_DETALLES_BONI = vChar(context.Request("p_DETALLES_BONI"))

        p_DETALLES_MUESTRA = vChar(context.Request("p_DETALLES_MUESTRA"))



        p_RESP_PIDM = context.Request("p_RESP_PIDM")
        p_FACTOR_RENTA = context.Request("p_FACTOR_RENTA")
        p_IMPUESTO_RENTA = context.Request("p_IMPUESTO_RENTA")
        '
        CODIGO_CATEGORIA = context.Request("CODIGO_CATEGORIA")
        'Plantillas 
        p_PLAN_CODE = context.Request("p_PLAN_CODE")
        p_DESC_PLAN = vChar(context.Request("p_DESC_PLAN"))
        p_TIPO_DCTO_PLAN = context.Request("p_TIPO_DCTO_PLAN")

        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_CLIE_DOID_NRO = context.Request("p_CLIE_DOID_NRO")
        'CORREO
        NREMITENTE = context.Request("NREMITENTE")
        DESTINATARIOS = context.Request("DESTINATARIOS")
        ASUNTO = context.Request("asunto")
        MENSAJE = context.Request("MENSAJE")
        GRUP_PROD = context.Request("GRUP_PROD")
        SUBGRUPO_CODE = context.Request("SUBGRUPO_CODE")
        MARCA_CODE = context.Request("MARCA_CODE")
        'USADO EN PDF: p_CTLG_CODE, p_USUA_ID

        p_ALMACENABLE = context.Request("p_ALMACENABLE")

        p_DIRECCION = context.Request("p_DIRECCION")
        p_LATITUD = context.Request("p_LATITUD")
        p_LONGITUD = context.Request("p_LONGITUD")

        p_TOTAL_GRATUITAS = context.Request("p_TOTAL_GRATUITAS")

        P_MES = context.Request("P_MES")
        P_ANIO = context.Request("P_ANIO")
        P_MONTO = context.Request("P_MONTO")

        p_NCMOCONT_CODIGO = context.Request("p_NCMOCONT_CODIGO")

        DOC_CODE = context.Request("DOC_CODE")

        Try

            Select Case OPCION
                Case "TICA" 'lista tipo de cambio
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = mone.dame_valor_monetario_cambio(MONEDA_CODE, Convert.ToDateTime(Date.Now).ToString("yyyy/MM/dd"), TIPO_CAMBIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""FECHA_VIGENTE"" :" & """" & MiDataRow("FECHA_VIGENTE").ToString & """,")
                            resb.Append("""VALOR_CAMBIO_VENTA"" :" & """" & MiDataRow("VALOR_CAMBIO_VENTA").ToString & """,")
                            resb.Append("""TIPO_CAMBIO"" :" & """" & MiDataRow("TIPO_CAMBIO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    Else
                        resb.Append("[")

                        resb.Append("{")
                        resb.Append("""FECHA_VIGENTE"" :"""",")
                        resb.Append("""VALOR_CAMBIO_VENTA"" :"""",")
                        resb.Append("""TIPO_CAMBIO"" :""""")

                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()


                Case "CTLG" 'Listar empresas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncEmpresa.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""AGENTE_RETEN_IND"" :" & """" & MiDataRow("AGENTE_RETEN_IND").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                            resb.Append("""CORTO"" :" & """" & MiDataRow("CORTO").ToString & """,")
                            resb.Append("""RUTA_IMAGEN"" :" & """" & MiDataRow("RUTA_IMAGEN").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "0" 'lista sucursales
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncSucursal.ListarSucursal(CTLG_CODE, "", "A")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""EXONERADO"" :" & """" & MiDataRow("EXONERADO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""ALMC_CODE"" :" & """" & MiDataRow("ALMC_CODE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "1" 'lista cambio mone
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = mone.dame_valor_monetario_cambio(MONEDA_CODE, Utilities.fechaLocal(Date.Now))
                    If Not (dt Is Nothing) Then

                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""FECHA_VIGENTE"" :" & """" & Utilities.fechaLocal(MiDataRow("FECHA_VIGENTE")) & """,")
                            resb.Append("""VALOR_CAMBIO_VENTA"" :" & """" & MiDataRow("VALOR_CAMBIO_VENTA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    Else
                        resb.Append("[")

                        resb.Append("{")
                        resb.Append("""FECHA_VIGENTE"" :"""",")
                        resb.Append("""VALOR_CAMBIO_VENTA"" :""""")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "2" 'Listar Clientes
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nceCliente.ListarCliente(If(PIDM = Nothing, "0", PIDM), "A", If(CTLG_CODE = Nothing, "", CTLG_CODE), "S")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("NRO_RUC").ToString & """,")
                            resb.Append("""CODIGO_TIPO_DOCUMENTO"" :" & """" & MiDataRow("CODIGO_TIPO_DOCUMENTO").ToString & """,")
                            resb.Append("""TIPO_DOCUMENTO"" :" & """" & MiDataRow("TIPO_DOCUMENTO").ToString & """,")
                            resb.Append("""NRO_DOCUMENTO"" :" & """" & MiDataRow("NRO_DOCUMENTO").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""DIAS"" :" & """" & MiDataRow("DIAS").ToString & """,")
                            resb.Append("""AGENTE_RETEN_IND"" :" & """" & MiDataRow("AGENTE_RETEN_IND").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""CODIGO_CATEGORIA"" :" & """" & MiDataRow("CODIGO_CATEGORIA").ToString & """,")
                            resb.Append("""CATE_DESC"" :" & """" & MiDataRow("CATE_DESC").ToString & """,")
                            resb.Append("""DEUDA"" :" & """" & MiDataRow("DEUDA").ToString & """,")
                            resb.Append("""PPBIDEN_CONDICION_SUNAT"" :" & """" & MiDataRow("PPBIDEN_CONDICION_SUNAT").ToString & """,")
                            resb.Append("""PPBIDEN_ESTADO_SUNAT"" :" & """" & MiDataRow("PPBIDEN_ESTADO_SUNAT").ToString & """,")

                            resb.Append("""TELEFONO"" :" & """" & MiDataRow("TELEFONO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "3" 'Listar Unidad de medida
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmUnidadMedida.ListarUnidadMedida("", "A")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""COD_TIPO_UNIDAD"" :" & """" & MiDataRow("COD_TIPO_UNIDAD").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "LUNPRO" 'Listar Unidad de medida por producto
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmUnidadMedida.ListarUnidadMedidaPro(COD_UNI)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "UNIDAD_MEDIDA", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""EQUI"" :" & """" & MiDataRow("EQUI").ToString & """,")
                            resb.Append("""CODUNI2"" :" & """" & MiDataRow("CODUNI2").ToString & """,")
                            resb.Append("""UNIDAD_MEDIDA"" :" & """" & MiDataRow("UNIDAD_MEDIDA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                'Case "LPCQR" 'Parametros para el QR
                '    context.Response.ContentType = "application/json; charset=utf-8"
                '    dt = nvVenta.ListarParametrosQR(If(p_FVBVTAC_CODE = Nothing, "", p_FVBVTAC_CODE))
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

                Case "GQR" 'Parametros para guardar el QR
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = nvVenta.GuardarCodigoQR(p_FVBVTAC_CODE, p_IMGQR)
                Case "4" 'Obtener precio producto             
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'Dim naAlmacen As New Nomade.NA.NAConfAlmacenes("Bn")
                    'Dim dtA As New DataTable
                    'dtA = naAlmacen.ListarAlmacenes("", CTLG, SCSL, "A")
                    'Dim ALMC_CODE As String = ""
                    'If Not dtA Is Nothing Then
                    '    ALMC_CODE = dtA.Rows(0)("CODIGO")
                    'End If
                    If PRECIO_IND = "E" Then
                        dt = nmGestionPrecios.LISTAR_PRECIO_ESTANDAR(PROD_CODE, CTLG, ALMC_CODE)
                        If Not dt Is Nothing Then
                            resb.Append("[{")
                            resb.Append("""PRECIO_VENTA"" :" & """" & dt.Rows(0)("PRECIO_VENTA") & """,")
                            resb.Append("""PRECIO_MINIMO"" :" & """" & dt.Rows(0)("PRECIO_MINIMO") & """")
                            resb.Append("}]")
                            res = resb.ToString()
                        Else
                            res = "[]"
                        End If
                    ElseIf PRECIO_IND = "C" Then
                        dt = nmGestionPrecios.LISTAR_PRECIO_CANTIDAD(PROD_CODE, CTLG, ALMC_CODE)
                        If Not (dt Is Nothing) Then
                            resb.Append("[")
                            For Each row As DataRow In dt.Rows
                                resb.Append("{")
                                resb.Append("""RANGO"":""" & row("RANGO").ToString & """,")
                                resb.Append("""PRECIO"":""" & row("PRECIO").ToString & """")
                                resb.Append("},")
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                            res = resb.ToString()
                        Else
                            res = "[]"
                        End If
                    ElseIf PRECIO_IND = "L" Then
                        dt = nmGestionPrecios.LISTAR_PRECIO_CLIENTE(PROD_CODE, CTLG, PIDM, ALMC_CODE)
                        If Not dt Is Nothing Then
                            resb.Append("[{")
                            resb.Append("""PRECIO_VENTA"" :" & """" & dt.Rows(0)("PRECIO_VENTA") & """,")
                            resb.Append("""PRECIO_MINIMO"" :" & """" & dt.Rows(0)("PRECIO_MINIMO") & """,")
                            resb.Append("""COD_CATEGORIA"" :" & """" & dt.Rows(0)("COD_CATEGORIA") & """,")
                            resb.Append("""DES_CATEGORIA"" :" & """" & dt.Rows(0)("DES_CATEGORIA") & """")
                            resb.Append("}]")
                            res = resb.ToString()
                        Else
                            res = "[]"
                        End If
                    Else
                        res = "[]"
                    End If

                Case "5" 'CREAR DOCUMENTO VENTA             
                    context.Response.ContentType = "application/json; charset=utf-8"
                    p_CMNT_DCTO = "|@TV:N" + p_CMNT_DCTO
                    Dim array As Array
                    array = nvVenta.CrearDocumentoVentaWeb(p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE,
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
                    p_VALOR_CAMBIO_OFI, If(p_COD_AUT = "", "0", p_COD_AUT), p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, If(p_RESP_PIDM = "", Nothing, p_RESP_PIDM), p_DETALLES_BONI, p_DETALLES_MUESTRA, p_DIRECCION,
                     IIf(p_LATITUD = "null" Or p_LATITUD = "", Nothing, p_LATITUD),
                   IIf(p_LONGITUD = "null" Or p_LONGITUD = "", Nothing, p_LONGITUD),
                   p_TOTAL_GRATUITAS)

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
                        resb.Append("""MSGERROR"" :" & """" & msgError & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "GEN_ASIENTO"
                    Dim oCTGeneracionAsientos As New Nomade.CT.CTGeneracionAsientos()
                    Dim strCodAsientoVenta As String
                    strCodAsientoVenta = oCTGeneracionAsientos.AsientoVenta(p_CODE, p_NCMOCONT_CODIGO, USUA_ID)

                    Dim lstCodAsientoVentaAplicacionAnticipo As New List(Of String)
                    lstCodAsientoVentaAplicacionAnticipo = oCTGeneracionAsientos.AsientoVentaAplicacionAnticipo(p_CODE, USUA_ID)

                    Dim strCodAsientoVentaAlmacen As String

                    Dim dtCabecera As New DataTable
                    dtCabecera = nvVenta.ListarDocumentosVenta(p_CODE, "", "", "", "", "", "", "", "")

                    If dtCabecera.Rows(0)("VENTA_RAPIDA_IND") = "S" Then
                        strCodAsientoVentaAlmacen = oCTGeneracionAsientos.AsientoVentaAlmacen(p_CODE, USUA_ID)
                    End If

                    Dim strCodAsientoCobroVenta As String
                    strCodAsientoCobroVenta = oCTGeneracionAsientos.GenerarAsientoCobroDocVenta(p_CODE)

                    res = strCodAsientoVenta

                Case "6" ' Obtener descuento de producto, SEGÚN la categoría de cliente
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim ncTipoClienteProveedor As New Nomade.NC.NCTipoClienteProveedor("Bn")
                    dt = ncTipoClienteProveedor.ListarCategoriaCliente(PROD_CODE, CODIGO_CATEGORIA, "C", "A", CTLG_CODE, SCSL)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""DESCUENTO"":""" & row("DESCUENTO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "7" 'ACTUALIZAR DOCUMENTO VENTA             
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = nvVenta.ActualizarDocumentoVentaWeb(p_CODE, p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE,
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
                    p_VALOR_CAMBIO_OFI, If(p_COD_AUT = "", "0", p_COD_AUT), p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, "0.00", "0.00", "0.00", "0.00", If(p_RESP_PIDM = "", Nothing, p_RESP_PIDM), p_DETALLES_BONI, p_DETALLES_MUESTRA, p_DIRECCION,
                      IIf(p_LATITUD = "null" Or p_LATITUD = "", Nothing, p_LATITUD),
                   IIf(p_LONGITUD = "null" Or p_LONGITUD = "", Nothing, p_LONGITUD),
                   p_TOTAL_GRATUITAS)
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

                Case "8" 'COMPLETAR DOCUMENTO VENTA             
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = nvVenta.CompletarDocumentoVentaWeb(p_CODE, p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE,
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
                    p_VALOR_CAMBIO_OFI, If(p_COD_AUT = "", "0", p_COD_AUT), p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, "0.00", "0.00", "0.00", "0.00", If(p_RESP_PIDM = "", Nothing, p_RESP_PIDM), p_DETALLES_BONI, p_DETALLES_MUESTRA, p_DIRECCION,
                    IIf(p_LATITUD = "null" Or p_LATITUD = "", Nothing, p_LATITUD),
                   IIf(p_LONGITUD = "null" Or p_LONGITUD = "", Nothing, p_LONGITUD))
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
                        resb.Append("""DATOS_QR"" :" & """" & array(2).ToString & """,")
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
                Case "FECHAX" ' Suma fecha de emision más plazo de pago
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim datos As String() = p_FECHA_EMISION.Split(New Char() {"/"})
                    Dim fechaEmision As Date
                    If datos.Length = 3 Then
                        fechaEmision = New Date(datos(2), datos(1), datos(0))
                    Else
                        fechaEmision = Date.Now
                    End If
                    If p_PLAZO = "" Then
                        p_PLAZO = "0"
                    End If
                    Dim fecha As Date = fechaEmision.AddDays(Double.Parse(p_PLAZO))
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""FECHANUEVA"" :" & """" & fecha.ToShortDateString() & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "LDOCC" ' Listar Cabecera Documento Venta FVBVTAC
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarDocumentosVenta(If(p_FVBVTAC_CODE = Nothing, "", p_FVBVTAC_CODE), "", "", "", "", If(p_CTLG_CODE = Nothing, "", p_CTLG_CODE),
                                                       If(p_SCSL_CODE = Nothing, "", p_SCSL_CODE), If(TIPO_DCTO = Nothing, "", TIPO_DCTO),
                                                       If(PIDM = Nothing, "", PIDM))
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
                            resb.Append("""GRAN_REDONDEO"":""" & row("GRAN_REDONDEO").ToString & """,")
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
                            resb.Append("""IMPR_AUTORIZACION"":""" & row("IMPR_AUTORIZACION").ToString & """,")
                            resb.Append("""IMPR_SERIE"":""" & row("IMPR_SERIE").ToString & """,")
                            resb.Append("""COD_AUT"":""" & row("COD_AUT").ToString & """,")
                            resb.Append("""DIRECCION_VENTA"":""" & row("DIRECCION_VENTA").ToString & """,")
                            resb.Append("""LATITUD_VENTA"":""" & row("LATITUD_VENTA").ToString & """,")
                            resb.Append("""LONGITUD_VENTA"":""" & row("LONGITUD_VENTA").ToString & """,")
                            resb.Append("""VENTA_RAPIDA_IND"":""" & row("VENTA_RAPIDA_IND").ToString & """,")
                            resb.Append("""MOTIVO_ANULAC"":""" & row("MOTIVO_ANULAC").ToString & """,")
                            resb.Append("""DESC_MOTIVO_ANULAC"":""" & row("DESC_MOTIVO_ANULAC").ToString & """,")
                            resb.Append("""MOTIVO_CODE"":""" & row("MOTIVO_CODE").ToString & """,")
                            resb.Append("""CONTRAENTREGA_IND"":""" & row("CONTRAENTREGA_IND").ToString & """,")
                            resb.Append("""MOTIVO_EFECTIVO"":""" & row("MOTIVO_EFECTIVO").ToString & """,")
                            resb.Append("""MOTIVO_DESPACHO"":""" & row("MOTIVO_DESPACHO").ToString & """,")
                            resb.Append("""MOVCONT_CODE"":""" & row("MOVCONT_CODE").ToString & """,")
                            resb.Append("""FORMATO_TICKET_IND"":""" & row("FORMATO_TICKET_IND").ToString & """,")
                            resb.Append("""AUTODETRACCION"":""" & row("AUTODETRACCION").ToString & """,") 'DPORTA 25/02/2021
                            resb.Append("""FECHA_EMISION"":""" & row("FECHA_EMISION").ToString & """,") 'DPORTA 10/02/2022
                            resb.Append("""ESTADO_DOC_ELECT"":""" & row("ESTADO_DOC_ELECT").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "[]"
                    End If
                Case "LDOCDB" ' Listar Detalles bonificacion de Documento Venta FVBVTAC
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarDetalleBonificacionDocumentoVenta(If(p_FVBVTAC_CODE = Nothing, "", p_FVBVTAC_CODE), "0", "")
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    End If
                Case "LDOCDM" ' Listar Detalles MUESTRA de Documento Venta FVBVTAC
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dtMuestra As New DataTable
                    dtMuestra = nvVenta.ListarDetalleMuestraDocumentoVenta(If(p_FVBVTAC_CODE = Nothing, "", p_FVBVTAC_CODE), "0", "")
                    If Not (dtMuestra Is Nothing) Then
                        res = Utilities.Datatable2Json(dtMuestra)
                    End If
                Case "LDOCD" ' Listar Detalles de Documento Venta FVBVTAC -> FVRVTAD
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarDetalleDocumentoVenta(If(p_FVBVTAC_CODE = Nothing, "", p_FVBVTAC_CODE), "0", "")
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
                            'resb.Append("""CENTRO_COSTO_CODE"":""" & row("CENTRO_COSTO_CODE").ToString & """,")
                            resb.Append("""CUENTA_CODE"":""" & row("CUENTA_CODE").ToString & """,")
                            resb.Append("""USUA_ID"":""" & row("USUA_ID").ToString & """,")
                            resb.Append("""TIPO_PROD"":""" & row("TIPO_PROD").ToString & """,")
                            resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """,")

                            'resb.Append("""ALMC_CODE"":""" & row("ALMC_CODE").ToString & """,")
                            resb.Append("""ALMC"":""" & row("ALMC").ToString & """,")
                            resb.Append("""DESC_ALMC"":""" & row("DESC_ALMC").ToString & """,")
                            resb.Append("""DESP_VENTA"":""" & row("DESP_VENTA").ToString & """,")
                            resb.Append("""ALMACENABLE"":""" & row("ALMACENABLE").ToString & """,")
                            resb.Append("""TIPO_BIEN"":""" & row("TIPO_BIEN").ToString & """,")
                            resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                            resb.Append("""ISC"":""" & row("ISC").ToString & """,")
                            resb.Append("""CONVERT_DETRACCION"":""" & row("CONVERT_DETRACCION").ToString & """,")
                            resb.Append("""CONVERT_ISC"":""" & row("CONVERT_ISC").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""PROD_CODIGO_ANTIGUO"":""" & row("PROD_CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""SERIADO"":""" & row("SERIADO_IND").ToString & """,")
                            resb.Append("""CODE_DCTO_ORIGEN"":""" & row("CODE_DCTO_ORIGEN").ToString & """,")

                            resb.Append("""PRECIO_IND"":""" & row("PRECIO_IND").ToString & """,")
                            resb.Append("""PROD_DETRACCION_DECIMALES"":""" & row("PROD_DETRACCION_DECIMALES").ToString & """,")
                            resb.Append("""PROD_DETRACCION"":""" & row("PROD_DETRACCION").ToString & """,")
                            resb.Append("""PROD_ISC"":""" & row("PROD_ISC").ToString & """,")
                            resb.Append("""COSTO_PRODUCTO"":""" & row("COSTO_PRODUCTO").ToString & """,")
                            resb.Append("""COSTO_PRODUCTO_SEGUN_EXO"":""" & row("COSTO_PRODUCTO_SEGUN_EXO").ToString & """,")
                            resb.Append("""CAT_CODE"":""" & row("CAT_CODE").ToString & """,")
                            resb.Append("""CAT_DESC"":""" & row("CAT_DESC").ToString & """,")
                            resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTA_" ' Listar Detalles de Documento Venta FVBVTAC -> FVRVTAD
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarDetalleDocumentoVentaNVLDOCT(If(p_FVBVTAC_CODE = Nothing, "", p_FVBVTAC_CODE), "0", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
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
                            resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """,")
                            resb.Append("""ALMC_CODE"":""" & row("ALMC_CODE").ToString & """,")

                            resb.Append("""DESC_ALMC"":""" & row("DESC_ALMC").ToString & """,")
                            resb.Append("""ESTADO_DESP"":""" & row("ESTADO_DESP").ToString & """,")

                            resb.Append("""ALMACENABLE"":""" & row("ALMACENABLE").ToString & """,")
                            resb.Append("""TIPO_BIEN"":""" & row("TIPO_BIEN").ToString & """,")
                            resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                            resb.Append("""ISC"":""" & row("ISC").ToString & """,")
                            resb.Append("""CONVERT_DETRACCION"":""" & row("CONVERT_DETRACCION").ToString & """,")
                            resb.Append("""CONVERT_ISC"":""" & row("CONVERT_ISC").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""PROD_CODIGO_ANTIGUO"":""" & row("PROD_CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""SERIADO"":""" & row("SERIADO_IND").ToString & """,")
                            resb.Append("""CODE_DCTO_ORIGEN"":""" & row("CODE_DCTO_ORIGEN").ToString & """,")

                            resb.Append("""PRECIO_IND"":""" & row("PRECIO_IND").ToString & """,")
                            resb.Append("""PROD_DETRACCION_DECIMALES"":""" & row("PROD_DETRACCION_DECIMALES").ToString & """,")
                            resb.Append("""PROD_DETRACCION"":""" & row("PROD_DETRACCION").ToString & """,")
                            resb.Append("""PROD_ISC"":""" & row("PROD_ISC").ToString & """,")
                            resb.Append("""COSTO_PRODUCTO"":""" & row("COSTO_PRODUCTO").ToString & """,")
                            resb.Append("""COSTO_PRODUCTO_SEGUN_EXO"":""" & row("COSTO_PRODUCTO_SEGUN_EXO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTA_DET_FAST" ' Listar Detalles de Documento Venta FVBVTAC -> FVRVTAD
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarDetalleDocumentoVentaNVLDOCT_FAST(If(p_FVBVTAC_CODE = Nothing, "", p_FVBVTAC_CODE), "0", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                            resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                            resb.Append("""NOMBRE_IMPRESION"":""" & row("NOMBRE_IMPRESION").ToString & """,")
                            resb.Append("""DESC_UNIDAD"":""" & row("DESC_UNIDAD").ToString & """,")
                            resb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """,")
                            resb.Append("""PU"":""" & row("PU").ToString & """,")
                            resb.Append("""DESCUENTO"":""" & row("DESCUENTO").ToString & """,")
                            resb.Append("""TOTAL"":""" & row("TOTAL").ToString & """,")
                            resb.Append("""CONVERT_PU"":""" & row("CONVERT_PU").ToString & """,")
                            resb.Append("""CONVERT_DESCUENTO"":""" & row("CONVERT_DESCUENTO").ToString & """,")
                            resb.Append("""CONVERT_TOTAL"":""" & row("CONVERT_TOTAL").ToString & """,")

                            resb.Append("""DESC_ALMC"":""" & row("DESC_ALMC").ToString & """,")
                            resb.Append("""ESTADO_DESP"":""" & row("ESTADO_DESP").ToString & """,")

                            resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                            resb.Append("""ISC"":""" & row("ISC").ToString & """,")
                            resb.Append("""CONVERT_DETRACCION"":""" & row("CONVERT_DETRACCION").ToString & """,")
                            resb.Append("""CONVERT_ISC"":""" & row("CONVERT_ISC").ToString & """,")
                            resb.Append("""PROD_CODIGO_ANTIGUO"":""" & row("PROD_CODIGO_ANTIGUO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LVEND" ' LISTAR VENDEDORES POR ROL

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarVendedorPorRol(CTLG, p_ESTADO_IND)
                    If Not (dt Is Nothing) Then
                        'dt = SortDataTableColumn(dt, "ESTADO", "ASC")
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

                Case "LPROD2" 'Listar Productos Venta Web
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarProductosVentaWeb(If(PROD_CODE = Nothing, "", PROD_CODE), "", If(CTLG = Nothing, "", CTLG), If(SCSL = Nothing, "", SCSL),
                                                         If(p_ALMACENABLE = Nothing, "", p_ALMACENABLE), If(SERIADO_IND = Nothing, "", SERIADO_IND),
                                                         If(GRUP_PROD = Nothing, "", GRUP_PROD))
                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "LPROD20" 'Listar Productos Venta Web solo para seriados 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarProductosVentaWebSeriados(If(PROD_CODE = Nothing, "", PROD_CODE), "", If(CTLG = Nothing, "", CTLG), If(ALMC_CODE = Nothing, "", ALMC_CODE),
                                                         If(p_ALMACENABLE = Nothing, "", p_ALMACENABLE), If(SERIADO_IND = Nothing, "", SERIADO_IND),
                                                         If(GRUP_PROD = Nothing, "", GRUP_PROD))
                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "LPROD3" 'Listar Productos Venta Web
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarProductosAlmacen(If(PROD_CODE = Nothing, "", PROD_CODE), "", If(CTLG = Nothing, "", CTLG), If(ALMC_CODE = Nothing, "", ALMC_CODE),
                                                         If(p_ALMACENABLE = Nothing, "", p_ALMACENABLE), If(SERIADO_IND = Nothing, "", SERIADO_IND),
                                                         If(GRUP_PROD = Nothing, "", GRUP_PROD))
                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "LPRODSERVICIO" 'Listar Productos Venta Web
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarServiciosWeb(If(PROD_CODE = Nothing, "", PROD_CODE), "", If(CTLG = Nothing, "", CTLG), If(SCSL = Nothing, "", SCSL))
                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                'Case "20" 'Listar Datos monetarios de linea de cliente.
                '    context.Response.ContentType = "application/json; charset=utf-8"
                '    dt = nvVenta.ListarDatosMonetariosCliente(If(PIDM = Nothing, "", PIDM), If(CTLG = Nothing, "", CTLG))
                '    If Not (dt Is Nothing) Then

                '        res = Utilities.Datatable2Json(dt)
                '    Else
                '        res = "[]"
                '    End If

                Case "LPRODTODOS" 'Listar Productos Venta Web
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarProductosTodos(If(PROD_CODE = Nothing, "", PROD_CODE), "", If(CTLG = Nothing, "", CTLG), If(SCSL = Nothing, "", SCSL),
                                                         If(p_ALMACENABLE = Nothing, "", p_ALMACENABLE), If(SERIADO_IND = Nothing, "", SERIADO_IND),
                                                         If(GRUP_PROD = Nothing, "", GRUP_PROD))
                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If


                Case "LPRODALMC" 'Listar Productos por Almacen (carga)
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarProductosAlmacen(If(PROD_CODE = Nothing, "", PROD_CODE), "", If(CTLG = Nothing, "", CTLG), If(ALMC_CODE = Nothing, "", ALMC_CODE),
                                                         If(p_ALMACENABLE = Nothing, "", p_ALMACENABLE), If(SERIADO_IND = Nothing, "", SERIADO_IND),
                                                         If(GRUP_PROD = Nothing, "", GRUP_PROD))
                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "LPRODALMC_CAB" 'Listar Productos por Almacen (carga)
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarProductosAlmacenCab(If(PROD_CODE = Nothing, "", PROD_CODE), "", If(CTLG = Nothing, "", CTLG), If(ALMC_CODE = Nothing, "", ALMC_CODE),
                                                         If(p_ALMACENABLE = Nothing, "", p_ALMACENABLE), If(SERIADO_IND = Nothing, "", SERIADO_IND),
                                                         If(GRUP_PROD = Nothing, "", GRUP_PROD))
                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "LPRODALMC_DET" 'Listar Productos por Almacen para mostrar en el detalle
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarProductosAlmacenDet(If(PROD_CODE = Nothing, "", PROD_CODE), "", If(CTLG = Nothing, "", CTLG), If(ALMC_CODE = Nothing, "", ALMC_CODE),
                                                         If(p_ALMACENABLE = Nothing, "", p_ALMACENABLE), If(SERIADO_IND = Nothing, "", SERIADO_IND),
                                                         If(GRUP_PROD = Nothing, "", GRUP_PROD))
                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "LPROD_COTI" 'Listar Productos Venta Web
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarProductosVentaWebCoti(If(PROD_CODE = Nothing, "", PROD_CODE), "", If(CTLG = Nothing, "", CTLG), If(SCSL = Nothing, "", SCSL),
                                                         If(p_ALMACENABLE = Nothing, "", p_ALMACENABLE), If(SERIADO_IND = Nothing, "", SERIADO_IND),
                                                         If(GRUP_PROD = Nothing, "", GRUP_PROD))
                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "LPROD_CORTO" 'Listar Productos Venta Web
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable()
                    PROD_CODE = IIf(PROD_CODE = Nothing, "", PROD_CODE)
                    GRUP_PROD = IIf(GRUP_PROD = Nothing, "", GRUP_PROD)
                    oDT = nvVenta.fnListarProdCorto(CTLG, PROD_CODE, GRUP_PROD)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.Datatable2Json(oDT)
                    End If

                Case "LPROD_CORTO_SERIE" 'Listar Productos Venta Web
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable()
                    PROD_CODE = IIf(PROD_CODE = Nothing, "", PROD_CODE)
                    GRUP_PROD = IIf(GRUP_PROD = Nothing, "", GRUP_PROD)
                    oDT = nvVenta.fnListarProdCortoSeriado(CTLG, PROD_CODE, GRUP_PROD)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.Datatable2Json(oDT)
                    End If
                Case "Limite"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ActualizarLimiteMuestra(CTLG_CODE, P_ANIO, P_MES, P_MONTO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""P_RESULTADO"":""" & row("P_RESULTADO").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "CORR" 'Cargar correlativo
                    Dim aut As New Nomade.NC.NCAutorizacionDocumento("BN")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If TIPO_DCTO <> "" Then
                        p_ESTADO_IND = IIf(p_ESTADO_IND Is Nothing, "A", p_ESTADO_IND)
                        dt = aut.ListarAutorizacion(String.Empty, p_ESTADO_IND, CTLG, SCSL, TIPO_DCTO)
                        If Not (dt Is Nothing) Then
                            resb.Append("[")
                            Dim formato As String = ""
                            For Each row As DataRow In dt.Rows
                                Dim valor_fin As Long = Long.Parse(row("VALOR_FIN").ToString)
                                Dim valor_actual As Long = Long.Parse(row("VALOR_ACTUAL").ToString)
                                If valor_actual <= valor_fin Then
                                    resb.Append("{")
                                    resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                    resb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                                    resb.Append("""DOC_CODE"":""" & row("TIPO_DOC_CODE").ToString & """,")
                                    resb.Append("""FORMATO"":""" & row("FORMATO").ToString & """,")
                                    resb.Append("""VALOR_ACTUAL"":""" & row("VALOR_ACTUAL").ToString & """,")
                                    resb.Append("""VALOR_FIN"":""" & row("VALOR_FIN").ToString & """,")
                                    resb.Append("""CORRELATIVO"":""" & row("CORRELATIVO").ToString & """,")
                                    resb.Append("""NRO_LINEAS"":""" & row("NRO_LINEAS").ToString & """,")
                                    resb.Append("""FORMATO_TICKET_IND"":""" & row("FORMATO_TICKET_IND").ToString & """,")
                                    resb.Append("""ESTADO_IND"":""" & row("ESTADO_IND").ToString & """")
                                    resb.Append("},")
                                    formato = row("FORMATO").ToString
                                    'Exit For
                                End If
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                    End If
                    res = resb.ToString()

                Case "DOCESPECIFICO" ' Listar documento específico
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncTipoDcEmpresa.ListarTipoDCEspecifico(TIPO_DCTO, CTLG)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION_CORTA", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            If MiDataRow("DESCRIPCION_CORTA").ToString <> "" Then
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                resb.Append("""DESCRIPCION_CORTA"" :" & """" & MiDataRow("DESCRIPCION_CORTA").ToString & """,")
                                resb.Append("""FECHA_ELEC"" :" & """" & Utilities.fechaLocal(MiDataRow("FECHA_ELEC").ToString) & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If

                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "FORTICK" ' Verifica si el tipo de documento tiene FORMATO TICKET
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncTipoDcEmpresa.VerificarFormatoTicket(DOC_CODE, CTLG, SCSL)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""FORMATO_TICKET"" :" & """" & MiDataRow("FORMATO_TICKET").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()


                Case "LASOC" 'Listar letras asociadas A DOCUMENTO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim canj As New Nomade.GL.GLCanjeLetrasFacturas("BN")
                    dt = canj.ListarLetrasAsociadas(p_CODE, CTLG_CODE, "C", p_DOCUMENTO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        'For Each MiDataRow As DataRow In dt.Rows
                        For Each MiDataRow As DataRow In dt.Rows
                            If MiDataRow("COD_DETALLE").ToString() = p_CODE Then
                                resb.Append("{")
                                resb.Append("""CODIGO_DOCUMENTO"" :" & """" & MiDataRow("CODIGO_DOCUMENTO").ToString & """,")
                                resb.Append("""NUMERO_DOCUMENTO"" :" & """" & MiDataRow("NUMERO_DOCUMENTO").ToString & """,")
                                resb.Append("""NRO_DOC_DETALLE"" :" & """" & MiDataRow("NRO_DOC_DETALLE").ToString & """,")
                                resb.Append("""FECHA_EMISION"" :" & """" & MiDataRow("FECHA_EMISION").ToString & """,")
                                resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb = resb.Replace("{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "DETRAC" 'Obtener cuentra de detracciones para la empresa seleccionada
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim cuen As New Nomade.NC.NCBanco("BN")
                    dt = cuen.fListarCtasBancariasZCliente(PIDM, "A", "0005")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            If MiDataRow("MONEDA_CODE").ToString() = MONEDA_CODE Then
                                resb.Append("{")
                                resb.Append("""NRO_CUENTA"" :" & """" & MiDataRow("NRO_CUENTA").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "LDOCS" ' LISTAR DOCUMENTOS DE ORIGEN 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Select Case TIPO_DCTO
                        Case "P0027", "P0053" 'PLANTILLAS DE O/C CLIENTE Y COTIZACION CLIENTE                            
                            dt = nvVenta.ListarPlantillaVenta("", If(p_CTLG_CODE = Nothing, "", p_CTLG_CODE), If(p_SCSL_CODE = Nothing, "", p_SCSL_CODE),
                                                              If(p_MONE_CODE = Nothing, "", p_MONE_CODE), TIPO_DCTO, If(PIDM = Nothing, "", PIDM), "A", "", "")
                            If Not (dt Is Nothing) Then
                                resb.Append("[")
                                For Each row As DataRow In dt.Rows
                                    resb.Append("{")
                                    resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                    resb.Append("""SECUENCIA"":""" & row("SECUENCIA").ToString & """,")
                                    resb.Append("""ALIAS"":""" & row("ALIAS").ToString & """,")
                                    resb.Append("""EMISION"":""" & row("EMISION").ToString & """,")
                                    resb.Append("""MONEDA"":""" & row("MONEDA").ToString & """,")
                                    resb.Append("""SIMBOLO_MONEDA"":""" & row("SIMBOLO_MONEDA").ToString & """,")
                                    resb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                                    resb.Append("""TRANSACCION"":""" & row("TRANSACCION").ToString & """,")
                                    resb.Append("""IMPORTE"":""" & row("IMPORTE").ToString & """,")
                                    resb.Append("""TIPO_DCTO_PLAN"":""" & row("TIPO_DCTO_PLAN").ToString & """,")
                                    resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """")
                                    resb.Append("},")
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                            Else
                                resb.Append("[]")
                            End If
                            res = resb.ToString()

                        Case "0027" 'ORDEN DE COMPRA CLIENTE (SOLO VIGENTES)------------------------------------                            
                            Dim nvOrdenCompra As New Nomade.NV.NVOrdenCompra("Bn")
                            dt = nvOrdenCompra.ListarOrdenCompraCliente("", "", "", CTLG_CODE, If(SCSL = Nothing, "", SCSL), If(p_MONE_CODE = Nothing, "", p_MONE_CODE), "", PIDM, "", "", "S")
                            If Not (dt Is Nothing) Then
                                resb.Append("[")
                                For Each MiDataRow As DataRow In dt.Rows
                                    If MiDataRow("COMPLETO") = "SI" And MiDataRow("ANULADO") = "NO" And MiDataRow("PROVISIONADO") = "NO" And MiDataRow("TIPO_DCTO_DESTINO").ToString = "" And MiDataRow("CODE_DCTO_DESTINO").ToString = "" Then
                                        resb.Append("{")
                                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                        resb.Append("""NRO_DOCUMENTO"" :" & """" & MiDataRow("DCTO_SERIE").ToString & "-" & MiDataRow("DCTO_NRO").ToString & """,")
                                        resb.Append("""NRO"":""" & MiDataRow("DCTO_NRO").ToString & """,")
                                        resb.Append("""SERIE"" :" & """" & MiDataRow("DCTO_SERIE").ToString & """,")
                                        resb.Append("""MONEDA"" :" & """" & MiDataRow("MONEDA").ToString & """,")
                                        resb.Append("""CLIENTE"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")
                                        resb.Append("}")
                                        resb.Append(",")
                                    End If
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                                If resb.ToString = "[{}]" Then
                                    resb.Clear().Append("[]")
                                End If
                            Else
                                resb.Append("[]")
                            End If

                        Case "0053" 'COTIZACION (SOLO VIGENTES)-----------------------------------------------

                            Dim nvCotizacion As New Nomade.NV.NVCotizacion("Bn")
                            dt = nvCotizacion.ListarCotizacionCliente("", "", "", CTLG_CODE, If(SCSL = Nothing, "", SCSL), If(p_MONE_CODE = Nothing, "", p_MONE_CODE), "", PIDM, "", "", "S")
                            If Not (dt Is Nothing) Then
                                resb.Append("[")
                                For Each MiDataRow As DataRow In dt.Rows
                                    If MiDataRow("COMPLETO") = "SI" And MiDataRow("ANULADO") = "NO" And MiDataRow("PROVISIONADO") = "NO" And MiDataRow("TIPO_DCTO_DESTINO").ToString = "" And MiDataRow("CODE_DCTO_DESTINO").ToString = "" Then
                                        resb.Append("{")
                                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                        resb.Append("""NRO_DOCUMENTO"" :" & """" & MiDataRow("DCTO_SERIE").ToString & "-" & MiDataRow("DCTO_NRO").ToString & """,")
                                        resb.Append("""NRO"":""" & MiDataRow("DCTO_NRO").ToString & """,")
                                        resb.Append("""SERIE"" :" & """" & MiDataRow("DCTO_SERIE").ToString & """,")
                                        resb.Append("""MONEDA"" :" & """" & MiDataRow("MONEDA").ToString & """,")
                                        resb.Append("""CLIENTE"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")
                                        resb.Append("}")
                                        resb.Append(",")
                                    End If
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                                If resb.ToString = "[{}]" Then
                                    resb.Clear().Append("[]")
                                End If
                            Else
                                resb.Append("[]")
                            End If

                        Case "0009", "0050" 'GUIA SALIDA, REMISION REMITENTE---------------------
                            dt = natipomov.lista_dcto_almacen(String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, "S", CTLG_CODE, String.Empty, PIDM, TIPO_DCTO)

                            If Not (dt Is Nothing) Then
                                resb.Append("[")
                                For Each MiDataRow As DataRow In dt.Rows
                                    If MiDataRow("COMPLETO") = "COMPLETO" And MiDataRow("ORGN") = "" And MiDataRow("ANULADO_IND") = "VIGENTE" And MiDataRow("TMOV_CODE") = "0001" Then
                                        resb.Append("{")
                                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                        resb.Append("""NRO_DOCUMENTO"" :" & """" & MiDataRow("REQC_NUM_SEQ_DOC").ToString & "-" & MiDataRow("REQC_CODE").ToString & """,")
                                        resb.Append("""NRO"":""" & MiDataRow("REQC_CODE").ToString & """,")
                                        resb.Append("""SERIE"" :" & """" & MiDataRow("REQC_NUM_SEQ_DOC").ToString & """,")
                                        resb.Append("""CLIENTE"" :" & """" & MiDataRow("RAZON_DEST").ToString & """")
                                        resb.Append("}")
                                        resb.Append(",")
                                    End If
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                                If resb.ToString = "[{}]" Then
                                    resb.Clear().Append("[]")
                                End If
                            Else
                                resb.Append("[]")
                            End If

                    End Select
                    res = resb.ToString()

                Case "LDOCABSD" ' LISTAR CABECERA DOCUMENTOS DE ORIGEN 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Select Case TIPO_DCTO
                        Case "0053" 'COTIZACION
                            Dim nvOrdenCompra As New Nomade.NV.NVOrdenCompra("Bn")
                            dt = nvOrdenCompra.ListarCabeceraCotizacionCliente(p_CODE_REF)
                            If Not (dt Is Nothing) Then
                                resb.Append("[")
                                For Each MiDataRow As DataRow In dt.Rows
                                    resb.Append("{")
                                    resb.Append("""TIPO_PAGO"":""" & MiDataRow("TIPO_PAGO").ToString & """")
                                    resb.Append("},")
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                            Else
                                resb.Append("[]")
                            End If

                        Case "0027" 'ORDEN DE COMPRA CLIENTE
                            Dim nvOrdenCompra As New Nomade.NV.NVOrdenCompra("Bn")
                            'dt = nvOrdenCompra.ListarDetalleOrdenCompraCliente(p_CODE_REF, "0", "")
                            dt = nvOrdenCompra.ListarCabeceraOrdenCompraCliente(p_CODE_REF)

                            If Not (dt Is Nothing) Then
                                resb.Append("[")
                                For Each MiDataRow As DataRow In dt.Rows
                                    resb.Append("{")
                                    resb.Append("""TIPO_PAGO"":""" & MiDataRow("TIPO_PAGO").ToString & """")

                                    resb.Append("},")
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                            Else
                                resb.Append("[]")
                            End If
                            'Case "0009", "0050"
                            '    dt = natipomov.lista_detalle_dcto_almacen(p_CODE_REF, "")
                            '    If Not (dt Is Nothing) Then

                            '        resb.Append("[")
                            '        For Each MiDataRow As DataRow In dt.Rows
                            '            resb.Append("{")
                            '            resb.Append("""CODIGO"" :" & """" & MiDataRow("ISAC_CODE").ToString & """,") 'FSBISAC_CODE                                    
                            '            resb.Append("""DETRACCION"" :" & """" & MiDataRow("DETRACCION").ToString & """")
                            '            resb.Append("}")
                            '            resb.Append(",")
                            '        Next
                            '        resb.Append("{}")
                            '        resb = resb.Replace(",{}", String.Empty)
                            '        resb.Append("]")
                            '    Else
                            '        resb.Append("[]")
                            '    End If

                    End Select
                    res = resb.ToString()




















                Case "LDOCSD" ' LISTAR DETALLES DOCUMENTOS DE ORIGEN 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Select Case TIPO_DCTO
                        Case "P0027", "P0053" 'PLANTILLAS DE O/C CLIENTE Y COTIZACION CLIENTE
                            dt = nvVenta.ListarDetallePlantillaVenta(p_PLAN_CODE, "0", "")
                            If Not (dt Is Nothing) Then
                                resb.Append("[")
                                For Each MiDataRow As DataRow In dt.Rows
                                    resb.Append("{")
                                    resb.Append("""CODIGO"":""" & MiDataRow("CODIGO").ToString & """,")
                                    resb.Append("""SECUENCIA"":""" & MiDataRow("SECUENCIA").ToString & """,")
                                    resb.Append("""ITEM"":""" & MiDataRow("ITEM").ToString & """,")
                                    resb.Append("""PROD_CODE"":""" & MiDataRow("PROD_CODE").ToString & """,")
                                    resb.Append("""NOMBRE_IMPRESION"":""" & MiDataRow("NOMBRE_IMPRESION").ToString & """,")
                                    resb.Append("""UNIDAD"":""" & MiDataRow("UNIDAD").ToString & """,")
                                    resb.Append("""DESC_UNIDAD"":""" & MiDataRow("DESC_UNIDAD").ToString & """,")
                                    resb.Append("""CANTIDAD"":""" & MiDataRow("CANTIDAD").ToString & """,")
                                    resb.Append("""PU"":""" & MiDataRow("PU").ToString & """,")
                                    resb.Append("""DESCUENTO"":""" & MiDataRow("DESCUENTO").ToString & """,")
                                    resb.Append("""TOTAL"":""" & MiDataRow("TOTAL").ToString & """,")
                                    resb.Append("""PRECIO_COMPRA"":""" & MiDataRow("PRECIO_COMPRA").ToString & """,")
                                    resb.Append("""CONVERT_PU"":""" & MiDataRow("CONVERT_PU").ToString & """,")
                                    resb.Append("""CONVERT_DESCUENTO"":""" & MiDataRow("CONVERT_DESCUENTO").ToString & """,")
                                    resb.Append("""CONVERT_TOTAL"":""" & MiDataRow("CONVERT_TOTAL").ToString & """,")
                                    resb.Append("""CONVERT_PRECIO_COMPRA"":""" & MiDataRow("CONVERT_PRECIO_COMPRA").ToString & """,")
                                    resb.Append("""CENTRO_COSTO_CODE"":""" & MiDataRow("CENTRO_COSTO_CODE").ToString & """,")
                                    resb.Append("""CUENTA_CODE"":""" & MiDataRow("CUENTA_CODE").ToString & """,")
                                    resb.Append("""USUA_ID"":""" & MiDataRow("USUA_ID").ToString & """,")
                                    resb.Append("""TIPO_PROD"":""" & MiDataRow("TIPO_PROD").ToString & """,")
                                    resb.Append("""FECHA_ACTV"":""" & MiDataRow("FECHA_ACTV").ToString & """,")
                                    resb.Append("""ALMC_CODE"":""" & MiDataRow("ALMC_CODE").ToString & """,")
                                    'añadido
                                    resb.Append("""ALMC"":""" & MiDataRow("ALMC").ToString & """,")
                                    resb.Append("""DESC_ALMC"":""" & MiDataRow("DESC_ALMC").ToString & """,")

                                    resb.Append("""ALMACENABLE"":""" & MiDataRow("ALMACENABLE").ToString & """,")
                                    resb.Append("""TIPO_BIEN"":""" & MiDataRow("TIPO_BIEN").ToString & """,")
                                    resb.Append("""DETRACCION"":""" & MiDataRow("DETRACCION").ToString & """,")
                                    resb.Append("""ISC"":""" & MiDataRow("ISC").ToString & """,")
                                    resb.Append("""CONVERT_DETRACCION"":""" & MiDataRow("CONVERT_DETRACCION").ToString & """,")
                                    resb.Append("""CONVERT_ISC"":""" & MiDataRow("CONVERT_ISC").ToString & """,")
                                    resb.Append("""GLOSA"":""" & MiDataRow("GLOSA").ToString & """,")
                                    resb.Append("""PROD_CODIGO_ANTIGUO"":""" & MiDataRow("PROD_CODIGO_ANTIGUO").ToString & """,")
                                    resb.Append("""SERIADO"":""" & MiDataRow("SERIADO_IND").ToString & """,")
                                    resb.Append("""TIPO_PRODUCTO"":""" & MiDataRow("TIPO_PRODUCTO").ToString & """,")

                                    resb.Append("""FECHA_ACTV"":""" & MiDataRow("FECHA_ACTV").ToString & """")
                                    resb.Append("},")
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                            Else
                                resb.Append("[]")
                            End If



                        Case "0053" 'COTIZACION
                            Dim nvCotizacion As New Nomade.NV.NVCotizacion("Bn")
                            dt = nvCotizacion.ListarDetalleCotizacionCliente(p_CODE_REF, "0", "")
                            If Not (dt Is Nothing) Then
                                resb.Append("[")
                                For Each MiDataRow As DataRow In dt.Rows
                                    resb.Append("{")
                                    resb.Append("""CODIGO"":""" & MiDataRow("CODIGO").ToString & """,")
                                    resb.Append("""SECUENCIA"":""" & MiDataRow("SECUENCIA").ToString & """,")
                                    resb.Append("""ITEM"":""" & MiDataRow("ITEM").ToString & """,")
                                    resb.Append("""PROD_CODE"":""" & MiDataRow("PROD_CODE").ToString & """,")
                                    resb.Append("""NOMBRE_IMPRESION"":""" & MiDataRow("NOMBRE_IMPRESION").ToString & """,")
                                    resb.Append("""UNIDAD"":""" & MiDataRow("UNIDAD").ToString & """,")
                                    resb.Append("""DESC_UNIDAD"":""" & MiDataRow("DESC_UNIDAD").ToString & """,")
                                    resb.Append("""CANTIDAD"":""" & MiDataRow("CANTIDAD").ToString & """,")
                                    resb.Append("""PU"":""" & MiDataRow("PU").ToString & """,")
                                    resb.Append("""DESCUENTO"":""" & MiDataRow("DESCUENTO").ToString & """,")
                                    resb.Append("""TOTAL"":""" & MiDataRow("TOTAL").ToString & """,")
                                    resb.Append("""PRECIO_COMPRA"":""" & MiDataRow("PRECIO_COMPRA").ToString & """,")
                                    resb.Append("""CONVERT_PU"":""" & MiDataRow("CONVERT_PU").ToString & """,")
                                    resb.Append("""CONVERT_DESCUENTO"":""" & MiDataRow("CONVERT_DESCUENTO").ToString & """,")
                                    resb.Append("""CONVERT_TOTAL"":""" & MiDataRow("CONVERT_TOTAL").ToString & """,")
                                    resb.Append("""CONVERT_PRECIO_COMPRA"":""" & MiDataRow("CONVERT_PRECIO_COMPRA").ToString & """,")
                                    resb.Append("""CENTRO_COSTO_CODE"":""" & MiDataRow("CENTRO_COSTO_CODE").ToString & """,")
                                    resb.Append("""CUENTA_CODE"":""" & MiDataRow("CUENTA_CODE").ToString & """,")
                                    resb.Append("""USUA_ID"":""" & MiDataRow("USUA_ID").ToString & """,")
                                    resb.Append("""TIPO_PROD"":""" & MiDataRow("TIPO_PROD").ToString & """,")
                                    resb.Append("""FECHA_ACTV"":""" & MiDataRow("FECHA_ACTV").ToString & """,")
                                    resb.Append("""ALMC_CODE"":""" & MiDataRow("ALMC_CODE").ToString & """,")
                                    'añadido
                                    resb.Append("""ALMC"":""" & MiDataRow("ALMC").ToString & """,")
                                    resb.Append("""DESC_ALMC"":""" & MiDataRow("DESC_ALMC").ToString & """,")

                                    resb.Append("""ALMACENABLE"":""" & MiDataRow("ALMACENABLE").ToString & """,")
                                    resb.Append("""TIPO_BIEN"":""" & MiDataRow("TIPO_BIEN").ToString & """,")
                                    resb.Append("""DETRACCION"":""" & MiDataRow("DETRACCION").ToString & """,")
                                    resb.Append("""ISC"":""" & MiDataRow("ISC").ToString & """,")
                                    resb.Append("""CONVERT_DETRACCION"":""" & MiDataRow("CONVERT_DETRACCION").ToString & """,")
                                    resb.Append("""CONVERT_ISC"":""" & MiDataRow("CONVERT_ISC").ToString & """,")
                                    resb.Append("""GLOSA"":""" & MiDataRow("GLOSA").ToString & """,")
                                    resb.Append("""PROD_CODIGO_ANTIGUO"":""" & MiDataRow("PROD_CODIGO_ANTIGUO").ToString & """,")
                                    resb.Append("""SERIADO"":""" & MiDataRow("SERIADO_IND").ToString & """,")
                                    resb.Append("""TIPO_PRODUCTO"":""" & MiDataRow("TIPO_PRODUCTO").ToString & """,")
                                    resb.Append("""FECHA_ACTV"":""" & MiDataRow("FECHA_ACTV").ToString & """")
                                    resb.Append("},")
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                            Else
                                resb.Append("[]")
                            End If

                        Case "0027" 'ORDEN DE COMPRA CLIENTE
                            Dim nvOrdenCompra As New Nomade.NV.NVOrdenCompra("Bn")
                            dt = nvOrdenCompra.ListarDetalleOrdenCompraCliente(p_CODE_REF, "0", "")

                            If Not (dt Is Nothing) Then
                                resb.Append("[")
                                For Each MiDataRow As DataRow In dt.Rows
                                    resb.Append("{")
                                    resb.Append("""CODIGO"":""" & MiDataRow("CODIGO").ToString & """,")
                                    resb.Append("""SECUENCIA"":""" & MiDataRow("SECUENCIA").ToString & """,")
                                    resb.Append("""ITEM"":""" & MiDataRow("ITEM").ToString & """,")
                                    resb.Append("""PROD_CODE"":""" & MiDataRow("PROD_CODE").ToString & """,")
                                    resb.Append("""NOMBRE_IMPRESION"":""" & MiDataRow("NOMBRE_IMPRESION").ToString & """,")
                                    resb.Append("""UNIDAD"":""" & MiDataRow("UNIDAD").ToString & """,")
                                    resb.Append("""DESC_UNIDAD"":""" & MiDataRow("DESC_UNIDAD").ToString & """,")
                                    resb.Append("""CANTIDAD"":""" & MiDataRow("CANTIDAD").ToString & """,")
                                    resb.Append("""PU"":""" & MiDataRow("PU").ToString & """,")
                                    resb.Append("""DESCUENTO"":""" & MiDataRow("DESCUENTO").ToString & """,")
                                    resb.Append("""TOTAL"":""" & MiDataRow("TOTAL").ToString & """,")
                                    resb.Append("""PRECIO_COMPRA"":""" & MiDataRow("PRECIO_COMPRA").ToString & """,")
                                    resb.Append("""CONVERT_PU"":""" & MiDataRow("CONVERT_PU").ToString & """,")
                                    resb.Append("""CONVERT_DESCUENTO"":""" & MiDataRow("CONVERT_DESCUENTO").ToString & """,")
                                    resb.Append("""CONVERT_TOTAL"":""" & MiDataRow("CONVERT_TOTAL").ToString & """,")
                                    resb.Append("""CONVERT_PRECIO_COMPRA"":""" & MiDataRow("CONVERT_PRECIO_COMPRA").ToString & """,")
                                    resb.Append("""CENTRO_COSTO_CODE"":""" & MiDataRow("CENTRO_COSTO_CODE").ToString & """,")
                                    resb.Append("""CUENTA_CODE"":""" & MiDataRow("CUENTA_CODE").ToString & """,")
                                    resb.Append("""USUA_ID"":""" & MiDataRow("USUA_ID").ToString & """,")
                                    resb.Append("""TIPO_PROD"":""" & MiDataRow("TIPO_PROD").ToString & """,")
                                    resb.Append("""FECHA_ACTV"":""" & MiDataRow("FECHA_ACTV").ToString & """,")
                                    resb.Append("""ALMC_CODE"":""" & MiDataRow("ALMC_CODE").ToString & """,")
                                    resb.Append("""ALMACENABLE"":""" & MiDataRow("ALMACENABLE").ToString & """,")
                                    resb.Append("""TIPO_BIEN"":""" & MiDataRow("TIPO_BIEN").ToString & """,")
                                    resb.Append("""DETRACCION"":""" & MiDataRow("DETRACCION").ToString & """,")
                                    resb.Append("""ISC"":""" & MiDataRow("ISC").ToString & """,")
                                    resb.Append("""CONVERT_DETRACCION"":""" & MiDataRow("CONVERT_DETRACCION").ToString & """,")
                                    resb.Append("""CONVERT_ISC"":""" & MiDataRow("CONVERT_ISC").ToString & """,")
                                    resb.Append("""GLOSA"":""" & MiDataRow("GLOSA").ToString & """,")
                                    resb.Append("""PROD_CODIGO_ALDOCSDNTIGUO"":""" & MiDataRow("PROD_CODIGO_ANTIGUO").ToString & """,")
                                    resb.Append("""SERIADO"":""" & MiDataRow("SERIADO_IND").ToString & """,")
                                    resb.Append("""TIPO_PRODUCTO"":""" & MiDataRow("TIPO_PRODUCTO").ToString & """,")
                                    resb.Append("""FECHA_ACTV"":""" & MiDataRow("FECHA_ACTV").ToString & """")
                                    resb.Append("},")
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                            Else
                                resb.Append("[]")
                            End If
                        Case "0009", "0050"
                            dt = natipomov.lista_detalle_dcto_almacen(p_CODE_REF, "")
                            If Not (dt Is Nothing) Then

                                resb.Append("[")
                                For Each MiDataRow As DataRow In dt.Rows
                                    resb.Append("{")
                                    resb.Append("""CODIGO"" :" & """" & MiDataRow("ISAC_CODE").ToString & """,") 'FSBISAC_CODE
                                    resb.Append("""ITEM"" :" & """" & MiDataRow("ITEM").ToString & """,")
                                    resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                                    resb.Append("""PROD_CODE"" :" & """" & MiDataRow("PROD_CODE").ToString & """,")
                                    resb.Append("""NRO_SERIE"" :" & """" & MiDataRow("NRO_SERIE").ToString & """,")
                                    resb.Append("""DESC_PRODUCTO"" :" & """" & MiDataRow("DESC_PRODUCTO").ToString & """,")
                                    resb.Append("""UNME_BASE"" :" & """" & MiDataRow("UNME_BASE").ToString & """,")
                                    resb.Append("""DESC_UNME_BASE"" :" & """" & MiDataRow("DESC_UNME_BASE").ToString & """,")
                                    resb.Append("""CANTIDAD_BASE"" :" & """" & MiDataRow("CANTIDAD_BASE").ToString & """,")
                                    resb.Append("""UNME_CONVERT"" :" & """" & MiDataRow("UNME_CONVERT").ToString & """,")
                                    resb.Append("""DESC_UNME_CONVERT"" :" & """" & MiDataRow("DESC_UNME_CONVERT").ToString & """,")
                                    resb.Append("""TOTAL"":""" & MiDataRow("TOTAL").ToString & """,")
                                    resb.Append("""GARANTIA"" :" & """" & MiDataRow("GARANTIA").ToString & """,")
                                    resb.Append("""TOTAL_ALTERNO"" :" & """" & MiDataRow("TOTAL_ALTERNO").ToString & """,")
                                    resb.Append("""DESC_UNME_BASE_CORTO"" :" & """" & MiDataRow("DESC_UNME_BASE_CORTO").ToString & """,")
                                    resb.Append("""SERIADO"" :" & """" & MiDataRow("SERIADO_IND").ToString & """,")
                                    resb.Append("""CENTRO_COSTO"" :" & """" & MiDataRow("CENTRO_COSTO").ToString & """,")
                                    resb.Append("""MONEDA"" :" & """" & MiDataRow("MONEDA").ToString & """,")
                                    resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                                    resb.Append("""MONTO_ALTERNO"" :" & """" & MiDataRow("MONTO_ALTERNO").ToString & """,")
                                    resb.Append("""INC_IGV"" :" & """" & MiDataRow("INC_IGV").ToString & """,")
                                    resb.Append("""CECC_CODE"" :" & """" & MiDataRow("CECC_CODE").ToString & """,")
                                    resb.Append("""CECD_CODE"" :" & """" & MiDataRow("CECD_CODE").ToString & """,")
                                    resb.Append("""APLIC_VALORES_IND"" :" & """" & MiDataRow("APLIC_VALORES_IND").ToString & """,")
                                    resb.Append("""DETRACCION"" :" & """" & MiDataRow("DETRACCION").ToString & """")
                                    resb.Append("}")
                                    resb.Append(",")
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                            Else
                                resb.Append("[]")
                            End If

                    End Select
                    res = resb.ToString()
                Case "IMPR"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    USAR_IGV_IND = context.Request("USAR_IGV_IND") ' Si es nothing se usará el de la tabla
                    COPIA_IND = context.Request("COPIA_IND") ' Si es nothing se imprimirá como si no fuera copia                        
                    res = GenerarDctoImprimir(p_CODE, USAR_IGV_IND, COPIA_IND)

                Case "CPLAN" 'CREAR PLANTILLA COTIZACION A CLIENTE            
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = nvVenta.CrearPlantillaVenta(p_TIPO_DCTO_PLAN, p_NUM_SERIE, p_NUM_DCTO, p_DCTO_CODE,
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
                    p_IMPRFAC_PERCEP, p_NRO_CUENTA_DETRAC, p_DETALLES, p_DETALLES_BONI, p_DETALLES_MUESTRA, p_DCTO_SERIE_REF, p_DCTO_NUM_REF, p_SCSL_EXONERADA_IND, p_IGV_IMPR_IND,
                    p_VALOR_CAMBIO_OFI, If(p_COD_AUT = "", "0", p_COD_AUT), p_PCTJ_IGV, p_FACTOR_RENTA, p_IMPUESTO_RENTA, p_DESC_PLAN, If(p_RESP_PIDM = "", Nothing, p_RESP_PIDM))
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

                Case "LDOCPCAP" 'OBTENER CABECERA PLANTILLA COTIZACION A CLIENTE            
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarCabeceraPlantillaVenta(p_PLAN_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DOCUMENTO"":""" & MiDataRow("DOCUMENTO").ToString & """,")
                            resb.Append("""MODO_PAGO"":""" & MiDataRow("MODO_PAGO").ToString & """,")
                            resb.Append("""SERIE"":""" & MiDataRow("SERIE").ToString & """,")
                            resb.Append("""NUMERO"":""" & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""EMPLEADO"":""" & MiDataRow("EMPLEADO").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()

                Case "BPLAN" ' DAR DE BAJA PLANTILLA
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = nvVenta.EliminarPlantillaVenta(p_PLAN_CODE, p_USUA_ID)

                Case "DOID" ' LISTAR DOCUMENTOS DE IDENTIDAD
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NC.NCDocumentoIdentidad("Bn")
                    dt = p.ListarDOCUMENTOS_IDENTIDAD(String.Empty, "A", String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            ' If MiDataRow("CODIGO").ToString <> "0" Then
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""DESC_CORTA"" :" & """" & MiDataRow("DESC_CORTA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                            ' End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "BCLI" ' BUSCAR CLIENTE X DOCUMENTO DE IDENTIDAD
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim q As New Nomade.NC.NCPersona("Bn")
                    dt = q.verificar_Existencia_Persona(p_CLIE_DOID, p_CLIE_DOID_NRO, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("VERIFICADO").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "LSU" 'lista sucursales por usuario
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncSucursal.ListarSucursalUsuario(USUA_ID, CTLG_CODE, "A")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""EXONERADO"" :" & """" & MiDataRow("EXONERADO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""UBIGEO"" :" & """" & MiDataRow("UBIGEO").ToString & """,")
                            resb.Append("""ALMC_CODE"" :" & """" & MiDataRow("ALMC_CODE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "DCOTI"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim nvCotizacion As New Nomade.NV.NVCotizacion("Bn")
                    dt = nvCotizacion.ListarCotizacionCliente(p_CODIGO, "", "", "", If(SCSL = Nothing, "", SCSL), If(p_MONE_CODE = Nothing, "", p_MONE_CODE), "", "", "", "", "")

                    'dt = nvCotizacion.DatosCotizacion(p_CODIGO)
                    If dt Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "correo"
                    Dim email As New Nomade.Mail.NomadeMail("Bn")
                    'CAMBIAR EL primer NREMITENTE POR EL NOMBRE DEL USUARIO
                    'If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_CODE & ".pdf") Then
                    ' email.enviar(NREMITENTE, NREMITENTE, DESTINATARIOS, ASUNTO, MENSAJE)
                    GenerarPDF(p_CODE)
                    'End If
                    Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_CODE & ".pdf"

                    MENSAJE += "<br/>"
                    Dim documento As String = ""
                    documento = GenerarDctoCorreo(p_CODE, USAR_IGV_IND, "")
                    MENSAJE += documento
                    'Dim piePagina As String = ""
                    'piePagina = "<br/><table><tr><td colspan='4'>&nbsp;</td></tr>"
                    'piePagina += "<tr><td colspan='4' style='text-align: left;font-size:10px;'>DOCUMENTO DE VENTA ENVÍADO AUTOMÁTICAMENTE POR EL SISTEMA: NOMADE ERP 3.0 </td></tr>"
                    'piePagina += "<tr><td colspan='4' style='text-align: left;font-size:10px'><span>Producto de Software desarrollado por&nbsp;<a href='http://www.orbitum.org' target='_blank'>Orbitum Net</a></span></td></tr>"
                    'piePagina = "</table>"
                    'MENSAJE += piePagina

                    email.enviar(NREMITENTE, NREMITENTE, DESTINATARIOS, ASUNTO, MENSAJE, datoAj)


                Case "GET_DOC_VTA"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable()
                    oDT = nvVenta.fnGetDocVta(p_CODE)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "GET_SALDO_DOC_VTA"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable()
                    oDT = nvVenta.fnGetSaldoDocVta(p_CODE)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case Else

            End Select
            context.Response.Write(res)

        Catch ex As Exception
            'If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
            '    oTransaction.fnRollBackTransaction()
            'End If

            Dim sMsjeError As String = ex.Message
            If sMsjeError.IndexOf("[Advertencia]") > -1 Then
                context.Response.Write(sMsjeError)
            Else
                context.Response.Write("[Error]: " & sMsjeError)
            End If
        End Try

    End Sub

    ''' <summary>
    ''' Obtiene los datos de un documento de venta y sus detalles, y los devuelve como una tabla con formato de ticket
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function GenerarDctoImprimir(ByVal p_CODE As String, ByVal USAR_IGV_IND As String, ByVal COPIA_IND As String) As String
        Dim tabla As New StringBuilder

        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        Dim dtDetallesBonificacion As New DataTable
        Dim dtDetallesMuestra As New DataTable
        'Dim dtEmpresas As New DataTable
        'Dim dtParametroLogo As New DataTable

        Dim dtParametroPiePagina As New DataTable

        dtCabecera = nvVenta.ListarCabDctoVentaImpresion(p_CODE, "I")
        dtDetalles = nvVenta.ListarDetDctoVentaImpresion(p_CODE)

        dtDetallesBonificacion = Nothing
        dtDetallesMuestra = Nothing

        If dtCabecera.Rows(0)("DET_BONI") <> 0 Then
            dtDetallesBonificacion = nvVenta.ListarDetalleBonificacionDocumentoVenta(p_CODE, "0", "")
        End If

        If dtCabecera.Rows(0)("DET_MUES") <> 0 Then
            dtDetallesMuestra = nvVenta.ListarDetalleMuestraDocumentoVenta(p_CODE, "0", "")
        End If

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
            rutaQr = dtCabecera(0)("IMAGEN_QR").ToString

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
            tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>TELEF: {0}</td></tr>", dtCabecera.Rows(0)("TELEFONO"))
            tabla.Append("</thead>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DOCUMENTO"))
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("NUM_DCTO"))
            tabla.Append("</thead>")

            tabla.Append("<tbody>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Cliente<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>{0}<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Dirección<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
            'If dtCabecera.Rows(0)("TIPO_DCTO") = "0012" Then
            '    tabla.AppendFormat("<tr><td  style='vertical-align: top;'><strong>Nro Maq<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
            'Else
            '    tabla.AppendFormat("<tr><td  style='vertical-align: top;'><strong>Autorización<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
            'End If
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Sucursal<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_SUCURSAL"))
            If exoneradaInd = "S" Then
                tabla.Append("<tr><td></td><td colspan='3'>(Exonerado)</td></tr>")
            End If
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Vendedor<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("VENDEDOR_USUA_ID")) 'VENDEDOR
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Condición pago<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MODO_PAGO")) 'Modo de pago
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha Emisión<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("EMISION")) 'Feha y Hora
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha Venc.<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("VENCIMIENTO")) 'Feha Vencimiento
            If dtCabecera.Rows(0)("MOPA") = "0002" Then
                tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Cuotas<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("CUOTAS")) 'Cuotas
            End If
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Glosa<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("GLOSA")) 'GLOSA

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

            'INICIO DETALLES BONIFICACION

            If Not Nothing Is dtDetallesBonificacion Then
                tabla.Append("<tr><td colspan='5'><b>PRODUCTOS X BONIFICACIÓN</b></td></tr>")
                For Each row In dtDetallesBonificacion.Rows

                    Dim PU As Decimal = 0.0
                    Dim total As String = ""
                    Dim desc As Decimal = 0.0
                    tabla.Append("<tr>")
                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                    tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), IIf(row("PU").ToString = "", "0", row("PU").ToString))
                    tabla.AppendFormat(" <td style='text-align: right;'>{0}</br><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", total, vDesc(desc.ToString()))
                    tabla.Append("</tr>")




                Next

            End If

            'FIN DETALLE BONIFICACION


            'INICIO DETALLES MUESTRA

            If Not Nothing Is dtDetallesMuestra Then
                tabla.Append("<tr><td colspan='5'><b>PRODUCTOS X MUESTRA</b></td></tr>")
                For Each row In dtDetallesMuestra.Rows

                    'Dim PU As Decimal = 0.0
                    Dim total As String = ""
                    Dim desc As Decimal = 0.0
                    tabla.Append("<tr>")
                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("DESC_UNIDAD_CORTA").ToString())
                    tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), IIf(row("PU").ToString = "", "0", row("PU").ToString))
                    tabla.AppendFormat(" <td style='text-align: right;'>{0}</br><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", total, vDesc(desc.ToString()))
                    tabla.Append("</tr>")




                Next

            End If

            'FIN DETALLE MUESTRA



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
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")


            If dtCabecera.Rows(0)("DETRACCION_IND") = "S" Then
                tabla.Append("<tr>")
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

            If Not Decimal.Parse(dtCabecera.Rows(0)("GRAN_REDONDEO")) = 0 Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Redondeo<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("GRAN_REDONDEO"))
                tabla.Append("</tr>")
            End If

            If Not Decimal.Parse(dtCabecera.Rows(0)("DONACION")) = 0 Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3'><strong>Donación<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DONACION"))
                tabla.Append("</tr>")
            End If

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Importe Neto a Pagar<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
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

        'End If

        'End If
        Return tabla.ToString()
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

        'dporta xmlworker
        'Dim sr As New StringReader(HTML.ToString())
        'Dim pdfDoc As New Document(PageSize.A4, 10.0F, 10.0F, 10.0F, 0F)
        'Dim writer As PdfWriter = PdfWriter.GetInstance(pdfDoc, New FileStream(archivo, FileMode.Create))
        'pdfDoc.Open()

        'XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, sr)
        'pdfDoc.Close()

        If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" And dtCabecera(0)("IMAGEN_QR").ToString <> "" Then 'DPORTA 20/05/2022
            imgCabConQR(FilePath, imgS, imgI, Base64ToImage(dtCabecera(0)("IMAGEN_QR").ToString)) 'SOLO PARA ´DOCS ELECTRÓNICOS
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
            b64 = base64string.Split(",")(1).Replace(" ", "+") 'Con el split se Toma lo que corresponde al base64 y luego se reemplaza
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
        Dim dtDetallesBonificacion As New DataTable
        Dim dtDetallesMuestra As New DataTable
        'Dim dtEmpresas As New DataTable
        Dim dtParametroPiePagina As New DataTable

        dtCabecera = nvVenta.ListarCabDctoVentaImpresion(p_CODE, "C")
        dtDetalles = nvVenta.ListarDetDctoVentaImpresion(p_CODE)

        dtDetallesBonificacion = Nothing
        dtDetallesMuestra = Nothing

        If dtCabecera.Rows(0)("DET_BONI") <> 0 Then
            dtDetallesBonificacion = nvVenta.ListarDetalleBonificacionDocumentoVenta(p_CODE, "0", "")
        End If

        If dtCabecera.Rows(0)("DET_MUES") <> 0 Then
            dtDetallesMuestra = nvVenta.ListarDetalleMuestraDocumentoVenta(p_CODE, "0", "")
        End If


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
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Local</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DESC_SUCURSAL"))
            If exoneradaInd = "S" Then
                tabla.Append("<tr><td></td><td colspan='3'>(Exonerado)</td></tr>")
            End If
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Vend.</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("VENDEDOR_USUA_ID")) 'VENDEDOR
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Moneda</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MONEDA"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Glosa</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("GLOSA"))
            tabla.Append("<tr><td colspan='4' border='1' style='border-top:1px solid black;' ></td></tr>")
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>{1}</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("NUM_DCTO"), dtCabecera.Rows(0)("DOCUMENTO_MIN"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Cliente</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>{0}</strong></td><td colspan='3'><strong>: </strong>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Dirección</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Condición pago</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MODO_PAGO"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Fecha Emisión</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("EMISION"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Fecha Venc.</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("VENCIMIENTO"))
            If dtCabecera.Rows(0)("MOPA") = "0002" Then
                tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Cuotas</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("CUOTAS")) 'Cuotas
            End If

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


            ' DETALLES BONIFICACION
            If Not Nothing Is dtDetallesBonificacion Then

                tabla.Append("<br><table border='0' style='width: 90%;' align='center' font size=9pt>")
                tabla.Append("<tr><td>PRODUCTOS X BONIFICACIÓN</td></tr>")
                tabla.Append("</table><br>")

                tabla.Append("<table border='1' style='width: 90%;border-collapse:collapse' align='center' font size=9pt ><tbody>")
                tabla.Append("<tr>")
                tabla.Append("<td style='text-align: center;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt'><strong>Cant.</strong></td>")
                tabla.Append("<td style='text-align: center;padding-left:5px;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt' colspan='2'><strong>Descripción</strong></td>")

                tabla.Append("</tr>")



                For Each row In dtDetallesBonificacion.Rows

                    ' Dim PU As Decimal = 0
                    Dim total As String = ""
                    Dim desc As Decimal = 0
                    tabla.Append("<tr>")
                    tabla.AppendFormat("<td style='text-align: left;border:1pt solid windowtext;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                    tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), Math.Round(Decimal.Parse(row("PU")), 2).ToString())

                    tabla.Append("</tr>")


                Next




                tabla.Append("</tbody></table><br>")

            End If

            'FIN DETALLES BONIFICACION

            ' DETALLES MUESTRA
            If Not Nothing Is dtDetallesMuestra Then

                tabla.Append("<br><table border='0' style='width: 90%;' align='center' font size=9pt>")
                tabla.Append("<tr><td>PRODUCTOS X MUESTRA</td></tr>")
                tabla.Append("</table><br>")

                tabla.Append("<table border='1' style='width: 90%;border-collapse:collapse' align='center' font size=9pt ><tbody>")
                tabla.Append("<tr>")
                tabla.Append("<td style='text-align: center;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt'><strong>Cant.</strong></td>")
                tabla.Append("<td style='text-align: center;padding-left:5px;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt' colspan='2'><strong>Descripción</strong></td>")

                tabla.Append("</tr>")



                For Each row In dtDetallesMuestra.Rows

                    'Dim PU As Decimal = 0
                    Dim total As String = ""
                    Dim desc As Decimal = 0
                    tabla.Append("<tr>")
                    tabla.AppendFormat("<td style='text-align: left;border:1pt solid windowtext;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                    tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), Math.Round(Decimal.Parse(row("PU")), 2).ToString())

                    tabla.Append("</tr>")


                Next




                tabla.Append("</tbody></table><br>")

            End If

            'FIN DETALLES MUESTRA


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
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Detracción {0}<span style='float:right;clear:both;'>{1}</span></strong></td>", dtCabecera.Rows(0)("PORCENTAJE_DETRA"), mon)
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

            If Not Decimal.Parse(dtCabecera.Rows(0)("GRAN_REDONDEO")) = 0 Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Redondeo <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("GRAN_REDONDEO"))
                tabla.Append("</tr>")
            End If

            If Not Decimal.Parse(dtCabecera.Rows(0)("DONACION")) = 0 Then
                tabla.Append("<tr>")
                tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Donación <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
                tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("DONACION"))
                tabla.Append("</tr>")
            End If

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Neto a Pagar <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
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
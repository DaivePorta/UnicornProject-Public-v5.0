<%@ WebHandler Language="VB" Class="NOMDOCC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NOMDOCC : Implements IHttpHandler

    Dim OPCION, USUARIO, CTLG_CODE, MONEDA_CODE, CODE_PARAMETRO, NUM_SERIE, NUM_DCTO, NUM_SERIE_ORG, NUM_DCTO_ORG, TIPO_DCTO_ORG, FEC_EMISION,
        FEC_TRANS, FEC_VENCI, GLOSA, SCSL_CODE, IMPUESTO_IND, PROV_PIDM, VALOR_CAMBIO, TIPO_DCTO, BASE_IMPONIBLE,
        INAFECTO, DESCUENTO, IMPUESTO, TOTAL_PAGAR, MODO_PAGO, NUM_DCTO_DETRAC, FEC_EMI_DETRAC, FEC_DCTO_REF, DETALLE_DETRACCION,
        FACC_CODE, FACC_SEQ_DOC, PROD_CODE, PROD_ALMACENABLE, PROD_CMNT, UMME_CODE, CANTIDAD, PREC_UNI, TOTAL, COMC_CODE, COMC_NUM_SEQ, COMD_ITEM, REGC_CODE, PAGO_FINAL_IND,
        IND_COMPL, ITEM, id, value, columnId, codrec, ESTABLECIMIENTO, PERCEPCION_IND, DETRACCION_IND, RETENCION_IND, PERCEPCION, DETRACCION, RETENCION,
        NRO_CUENTA_DETRAC, IMPRFAC_PERCEP, NUM_DCTO_PERCEP, FECHA_EMI_PERCEP, NUM_DCTO_RETEN, OPERACION, FECHA_EMI_RETEN, ISC, cadenaux,
        DESDE, HASTA, PRODUCTO, p_MES_TRIB, p_ANIO_TRIB, p_ANULADO_IND, p_DIRECCION, p_LATITUD, p_LONGITUD, p_ISC_IND, p_PORCEN_IGV,
        p_HABIDO_IND, p_TIPO_BIEN, p_CODE, p_DOCUMENTO, p_PROV_PIDM, PERIODO, PROVEEDOR, ESTADO, MES, ANIO, p_COMPLETO_IND, p_NCMOCONT_CODIGO, USUA_ID As String

    Dim COD_OPERA, FILTRO As String

    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim oTransaction As New Nomade.DataAccess.Transaccion()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest


        codrec = context.Request("codigo")
        cadenaux = context.Request("cadenaux")
        OPCION = context.Request("OPCION")
        USUARIO = context.Request("USUARIO")
        CTLG_CODE = context.Request("CTLG_CODE")

        MONEDA_CODE = context.Request("MONEDA_CODE")
        CODE_PARAMETRO = context.Request("CODE_PARAMETRO")
        NUM_SERIE = context.Request("NUM_SERIE")
        NUM_DCTO = context.Request("NUM_DCTO")
        NUM_SERIE_ORG = context.Request("NUM_SERIE_ORG")
        NUM_DCTO_ORG = context.Request("NUM_DCTO_ORG")
        TIPO_DCTO_ORG = context.Request("TIPO_DCTO_ORG")
        FEC_EMISION = context.Request("FEC_EMISION")
        FEC_TRANS = context.Request("FEC_TRANS")
        FEC_VENCI = context.Request("FEC_VENCI")
        GLOSA = context.Request("GLOSA")
        SCSL_CODE = context.Request("SCSL_CODE")
        IMPUESTO_IND = context.Request("IMPUESTO_IND")
        VALOR_CAMBIO = context.Request("VALOR_CAMBIO")
        TIPO_DCTO = context.Request("TIPO_DCTO")
        p_CODE = context.Request("p_CODE")
        p_DOCUMENTO = context.Request("p_DOCUMENTO")

        DESCUENTO = context.Request("DESCUENTO")
        IMPUESTO = context.Request("IMPUESTO")
        TOTAL_PAGAR = context.Request("TOTAL_PAGAR")
        MODO_PAGO = context.Request("MODO_PAGO")
        NUM_DCTO_DETRAC = context.Request("NUM_DCTO_DETRAC")
        FEC_EMI_DETRAC = context.Request("FEC_EMI_DETRAC")
        NRO_CUENTA_DETRAC = context.Request("NRO_CUENTA_DETRAC")
        FEC_DCTO_REF = context.Request("FEC_DCTO_REF")


        BASE_IMPONIBLE = context.Request("BASE_IMPONIBLE")
        INAFECTO = context.Request("INAFECTO")
        PROV_PIDM = context.Request("PROV_PIDM")

        FACC_CODE = context.Request("FACC_CODE")
        FACC_SEQ_DOC = context.Request("FACC_SEQ_DOC")
        PROD_CODE = context.Request("PROD_CODE")
        PROD_ALMACENABLE = context.Request("PROD_ALMACENABLE")
        PROD_CMNT = context.Request("PROD_CMNT")
        UMME_CODE = context.Request("UMME_CODE")
        CANTIDAD = context.Request("CANTIDAD")
        PREC_UNI = context.Request("PREC_UNI")
        TOTAL = context.Request("TOTAL")
        COMC_CODE = context.Request("COMC_CODE")
        COMC_NUM_SEQ = context.Request("COMC_NUM_SEQ")
        COMD_ITEM = context.Request("COMD_ITEM")
        REGC_CODE = context.Request("REGC_CODE")
        PAGO_FINAL_IND = context.Request("PAGO_FINAL_IND")
        IND_COMPL = context.Request("IND_COMPL")
        ITEM = context.Request("ITEM")
        id = context.Request.Form("id")
        value = context.Request.Form("value")
        columnId = context.Request.Form("columnId")
        ESTABLECIMIENTO = context.Request("ESTABLECIMIENTO")

        PERCEPCION_IND = context.Request("PERCEPCION_IND")
        DETRACCION_IND = context.Request("DETRACCION_IND")
        RETENCION_IND = context.Request("RETENCION_IND")
        PERCEPCION = context.Request("PERCEPCION")
        DETRACCION = context.Request("DETRACCION")
        RETENCION = context.Request("RETENCION")

        IMPRFAC_PERCEP = context.Request("IMPRFAC_PERCEP")
        NUM_DCTO_PERCEP = context.Request("NUM_DCTO_PERCEP")
        FECHA_EMI_PERCEP = context.Request("FECHA_EMI_PERCEP")
        NUM_DCTO_RETEN = context.Request("NUM_DCTO_RETEN")
        FECHA_EMI_RETEN = context.Request("FECHA_EMI_RETEN")
        ISC = context.Request("ISC")

        p_MES_TRIB = context.Request("p_MES_TRIB")
        p_ANIO_TRIB = context.Request("p_ANIO_TRIB")

        OPERACION = context.Request("OPERACION")

        DETALLE_DETRACCION = context.Request("DETALLE_DETRACCION")

        DESDE = context.Request("DESDE")
        HASTA = context.Request("HASTA")
        PRODUCTO = context.Request("PRODUCTO")

        p_ANULADO_IND = context.Request("p_ANULADO_IND")
        p_DIRECCION = context.Request("p_DIRECCION")
        p_LATITUD = context.Request("p_LATITUD")
        p_LONGITUD = context.Request("p_LONGITUD")
        p_ISC_IND = context.Request("p_ISC_IND")
        p_PORCEN_IGV = context.Request("p_PORCEN_IGV")

        p_HABIDO_IND = context.Request("p_HABIDO_IND")
        p_TIPO_BIEN = context.Request("p_TIPO_BIEN")

        p_PROV_PIDM = context.Request("p_PROV_PIDM")

        PERIODO = context.Request("PERIODO")
        PROVEEDOR = context.Request("PROVEEDOR")
        ESTADO = context.Request("ESTADO")

        MES = context.Request("MES")
        ANIO = context.Request("ANIO")

        p_COMPLETO_IND = context.Request("p_COMPLETO_IND")

        p_NCMOCONT_CODIGO = context.Request("p_NCMOCONT_CODIGO")

        USUA_ID = context.Request("USUA_ID") 'para asientos

        COD_OPERA = context.Request("COD_OPERA")
        FILTRO = context.Request("FILTRO") 'DPORTA  11/03/2022

        If DESDE = "" Or DESDE Is Nothing Then
            DESDE = "00/00/0000"
        End If

        If HASTA = "" Or HASTA Is Nothing Then
            HASTA = Date.Now.ToString("dd/MM/yyyy")
        End If

        Try

            Select Case OPCION
                Case "S"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oNCFactura As New Nomade.NC.NCFactura("Bn")
                    dt = oNCFactura.busca_CAB_dcto_pagar(codrec, "1")

                    If Not (dt Is Nothing And dt.Rows.Count > 0) Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "BUDP" 'BUSCA DCTOS A PAGAR
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oNCFactura As New Nomade.NC.NCFactura("BN")
                    dt = oNCFactura.busca_dcto_pagar("", "", CTLG_CODE, SCSL_CODE, TIPO_DCTO, Utilities.fechaLocal(DESDE),
                                                     Utilities.fechaLocal(HASTA), PRODUCTO, IIf(NUM_SERIE = Nothing, "", NUM_SERIE),
                                                     IIf(NUM_DCTO = Nothing, "", NUM_DCTO), IIf(p_ANULADO_IND = Nothing, "", p_ANULADO_IND),
                                                     IIf(p_PROV_PIDM = Nothing, 0, p_PROV_PIDM), IIf(p_COMPLETO_IND Is Nothing, "", p_COMPLETO_IND))
                    resb.Append("[")
                    If Not dt Is Nothing Then
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESC_SUCURSAL"":" & """" & row("DESC_SUCURSAL").ToString & """,")
                            resb.Append("""DESC_DCTO"":" & """" & row("DESC_DCTO").ToString & """,")
                            resb.Append("""NUM_DCTO"":" & """" & row("NUM_DCTO").ToString & """,")
                            resb.Append("""EMISION"":" & """" & row("EMISION").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"":" & """" & row("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"":" & """" & row("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""TIPO_MONEDA"":" & """" & row("TIPO_MONEDA").ToString & """,")
                            resb.Append("""TOTAL"":" & """" & IIf(row("MONEDA").ToString = "0002", row("TOTAL").ToString, row("CONVERT_TOTAL").ToString) & """,")
                            resb.Append("""COMPLETO"":" & """" & row("COMPLETO").ToString & """,")
                            resb.Append("""ANULADO"":" & """" & row("ANULADO").ToString & """,")
                            resb.Append("""PROVISIONADO_DESC"":" & """" & row("PROVISIONADO_DESC").ToString & """,")
                            resb.Append("""EMPRESA"":" & """" & row("EMPRESA").ToString & """,")
                            resb.Append("""SUCURSAL"":" & """" & row("SUCURSAL").ToString & """,")
                            resb.Append("""PERIODO"":" & """" & row("PERIODO").ToString & """,")
                            resb.Append("""TIPO_DCTO"":" & """" & row("TIPO_DCTO").ToString & """")
                            'resb.Append("""ATENDIDO"" :" & """" & row("ATENDIDO").ToString & "-" & row("PAGADO").ToString & """")

                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", "")
                    End If
                    resb.Append("]")
                    res = resb.ToString()

                Case "BUDPL" 'BUSCA DCTOS A PAGAR
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oNCFactura As New Nomade.NC.NCFactura("BN")
                    dt = oNCFactura.busca_dcto_pagar_listado("", "", CTLG_CODE, SCSL_CODE, TIPO_DCTO, Utilities.fechaLocal(DESDE),
                                                     Utilities.fechaLocal(HASTA), PRODUCTO, MES, ANIO, ESTADO,
                                                     IIf(NUM_SERIE = Nothing, "", NUM_SERIE),
                                                     IIf(NUM_DCTO = Nothing, "", NUM_DCTO), IIf(p_ANULADO_IND = Nothing, "", p_ANULADO_IND), IIf(PROVEEDOR = "", 0, PROVEEDOR))
                    resb.Append("[")
                    If Not dt Is Nothing Then
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESC_SUCURSAL"":" & """" & row("DESC_SUCURSAL").ToString & """,")
                            resb.Append("""DESC_DCTO"":" & """" & row("DESC_DCTO").ToString & """,")
                            resb.Append("""NUM_DCTO"":" & """" & row("NUM_DCTO").ToString & """,")
                            resb.Append("""EMISION"":" & """" & row("EMISION").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"":" & """" & row("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""ATENDIDO"":" & """" & row("ATENDIDO").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"":" & """" & row("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""TIPO_MONEDA"":" & """" & row("TIPO_MONEDA").ToString & """,")
                            resb.Append("""MONEDA"":" & """" & row("MONEDA").ToString & """,")
                            resb.Append("""TOTAL"":" & """" & IIf(row("MONEDA").ToString = "0002", row("TOTAL").ToString, row("CONVERT_TOTAL").ToString) & """,")
                            resb.Append("""COMPLETO"":" & """" & row("COMPLETO").ToString & """,")
                            resb.Append("""ANULADO"":" & """" & row("ANULADO").ToString & """,")
                            resb.Append("""PROVISIONADO_DESC"":" & """" & row("PROVISIONADO_DESC").ToString & """,")
                            resb.Append("""EMPRESA"":" & """" & row("EMPRESA").ToString & """,")
                            resb.Append("""SUCURSAL"":" & """" & row("SUCURSAL").ToString & """,")
                            resb.Append("""ASIENTO"":" & """" & row("ASIENTO").ToString & """,")
                            resb.Append("""PERIODO"":" & """" & row("PERIODO").ToString & """,")
                            resb.Append("""TIPO_DCTO"":" & """" & row("TIPO_DCTO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", "")
                    End If
                    resb.Append("]")
                    res = resb.ToString()

                Case "GET_DOC_COMPRA"
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim nvCompra As New Nomade.NC.NCFactura("Bn")

                    Dim oDT As New DataTable()
                    oDT = nvCompra.fnGetDocCompra(p_CODE)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "FECHAX"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim fechaEmision As String() = context.Request("FECHA_EMISION").Split("/")
                    Dim nuevaFecha As Date = New Date(Integer.Parse(fechaEmision(2)), Integer.Parse(fechaEmision(1)), Integer.Parse(fechaEmision(0))).AddDays(Double.Parse(ISC))
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""FECHANUEVA"" :" & """" & nuevaFecha.ToShortDateString() & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                Case "0" 'lista sucursales
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCSucursal("Bn").ListarSucursal(CTLG_CODE, "", "A")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""EXONERADO"" :" & """" & row("EXONERADO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""ALMC_CODE"" :" & """" & row("ALMC_CODE").ToString & """")
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
                    Dim fechaEmision As String() = IIf(context.Request("FECHA_EMISION") Is Nothing, Date.Now.ToString("dd/MM/yyyy"), context.Request("FECHA_EMISION")).Split("/")
                    dt = New Nomade.NC.NCMonedas("Bn").dame_valor_monetario_cambio(MONEDA_CODE, Convert.ToDateTime(Date.Now).ToString("yyyy/MM/dd"), "OFICIAL") 'dporta 06/04/2022 - No tenía el tipo_cambio
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""FECHA_VIGENTE"" :" & """" & row("FECHA_VIGENTE").ToString & """,")
                            resb.Append("""VALOR_CAMBIO_VENTA"" :" & """" & row("VALOR_CAMBIO_VENTA").ToString & """")
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
                Case "2" 'lista monedas B/A
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCMonedas("Bn").ListarMoneda_AL_BA("")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""SIMBOLO"" :" & """" & row("SIMBOLO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""DESC_CORTA"" :" & """" & row("DESC_CORTA").ToString & """,")
                            resb.Append("""TIPO"" :" & """" & row("TIPO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "LISTAR_OPERA" '
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim nvCompra As New Nomade.NC.NCFactura("Bn")

                    dt = nvCompra.ListarOperacion("S", "S")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION_CORTA"" :" & """" & row("DESCRIPCION_CORTA").ToString & """,")
                            'resb.Append("""REGIMEN_VENTA"" :" & """" & row("REGIMEN_VENTA").ToString & """,")
                            'resb.Append("""REGIMEN_COMPRA"" :" & """" & row("REGIMEN_COMPRA").ToString & """,")
                            resb.Append("""VALOR"" :" & """" & row("VALOR").ToString & """")
                            'resb.Append("""USUARIO"" :" & """" & row("USUARIO").ToString & """,")
                            'resb.Append("""ACTIVO"" :" & """" & row("ACTIVO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3" 'lista IGV PARAMETRO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCParametros("Bn").ListarParametros(CODE_PARAMETRO, "")
                    If Not (dt Is Nothing) Then

                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION_DETALLADA"" :" & """" & row("DESCRIPCION_DETALLADA").ToString & """,")
                            resb.Append("""VALOR"" :" & """" & row("VALOR").ToString & """")

                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3.5" 'lista TODOS LOS PARAMETROS -- DPORTA 11/03/2022
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCParametros("Bn").ListarParametrosTodos(FILTRO)
                    If Not (dt Is Nothing) Then

                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION_DETALLADA"" :" & """" & row("DESCRIPCION_DETALLADA").ToString & """,")
                            resb.Append("""VALOR"" :" & """" & row("VALOR").ToString & """")

                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4" 'lista modo pago
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NF.NFModalidadPago("Bn").dame_modalidad_pago("", "S", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LPROV"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oNCEProveedor As New Nomade.NC.NCEProveedor("Bn")
                    Dim oDT As New DataTable()
                    oDT = oNCEProveedor.ListarProveedor(0, String.Empty, CTLG_CODE, String.Empty, "")
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If
                Case "LISTAR_PROVEEDORES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim prov As New Nomade.NC.NCEProveedor("Bn")
                    dt = prov.ListarProveedor("0", "A", CTLG_CODE, "", "N", String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("RUC").ToString <> "" Then
                                resb.Append("{")
                                resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                resb.Append("""RUC"" :" & """" & row("RUC").ToString & """,")
                                resb.Append("""DNI"" :" & """" & row("DNI").ToString & """,")
                                resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """,")
                                resb.Append("""ID"" :" & """" & row("ID").ToString & """,")
                                resb.Append("""DIAS"" :" & """" & row("DIAS").ToString & """,")
                                resb.Append("""AGENTE_RETEN_IND"" :" & """" & row("AGENTE_RETEN_IND").ToString & """,")

                                resb.Append("""PPBIDEN_CONDICION_SUNAT"" :" & """" & row("PPBIDEN_CONDICION_SUNAT").ToString & """,")
                                resb.Append("""PPBIDEN_ESTADO_SUNAT"" :" & """" & row("PPBIDEN_ESTADO_SUNAT").ToString & """,")

                                resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """")

                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTAR_PROVEEDORES_PER_NAT"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim prov As New Nomade.NC.NCEProveedor("Bn")
                    dt = prov.ListarProveedor("0", "A", CTLG_CODE, "", "N", String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("DNI").ToString <> "" Then
                                resb.Append("{")
                                resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                resb.Append("""RUC"" :" & """" & row("RUC").ToString & """,")
                                resb.Append("""DNI"" :" & """" & row("DNI").ToString & """,")
                                resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """,")
                                resb.Append("""ID"" :" & """" & row("ID").ToString & """,")
                                resb.Append("""DIAS"" :" & """" & row("DIAS").ToString & """,")
                                resb.Append("""AGENTE_RETEN_IND"" :" & """" & row("AGENTE_RETEN_IND").ToString & """,")

                                resb.Append("""PPBIDEN_CONDICION_SUNAT"" :" & """" & row("PPBIDEN_CONDICION_SUNAT").ToString & """,")
                                resb.Append("""PPBIDEN_ESTADO_SUNAT"" :" & """" & row("PPBIDEN_ESTADO_SUNAT").ToString & """,")

                                resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTAR_PROVEEDORES_PER"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim prov As New Nomade.NC.NCEProveedor("Bn")
                    dt = prov.ListarProveedor("0", "A", CTLG_CODE, "", "N", String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""RUC"" :" & """" & row("RUC").ToString & """,")
                            resb.Append("""DNI"" :" & """" & row("DNI").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """,")
                            resb.Append("""ID"" :" & """" & row("ID").ToString & """,")
                            resb.Append("""DIAS"" :" & """" & row("DIAS").ToString & """,")
                            resb.Append("""AGENTE_RETEN_IND"" :" & """" & row("AGENTE_RETEN_IND").ToString & """,")
                            resb.Append("""PPBIDEN_CONDICION_SUNAT"" :" & """" & row("PPBIDEN_CONDICION_SUNAT").ToString & """,")
                            resb.Append("""PPBIDEN_ESTADO_SUNAT"" :" & """" & row("PPBIDEN_ESTADO_SUNAT").ToString & """,")


                            resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTAR_LOCADORES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim prov As New Nomade.NC.NCEProveedor("Bn")
                    Dim NICA_CODE = context.Request("NICA_CODE")
                    dt = prov.ListarProveedor("0", "A", CTLG_CODE, "0008", "N", String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("DNI").ToString <> "" Then
                                resb.Append("{")
                                resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                resb.Append("""RUC"" :" & """" & row("RUC").ToString & """,")
                                resb.Append("""DNI"" :" & """" & row("DNI").ToString & """,")
                                resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """,")
                                resb.Append("""ID"" :" & """" & row("ID").ToString & """,")
                                resb.Append("""DIAS"" :" & """" & row("DIAS").ToString & """,")
                                resb.Append("""AGENTE_RETEN_IND"" :" & """" & row("AGENTE_RETEN_IND").ToString & """,")
                                resb.Append("""PPBIDEN_CONDICION_SUNAT"" :" & """" & row("PPBIDEN_CONDICION_SUNAT").ToString & """,")
                                resb.Append("""PPBIDEN_ESTADO_SUNAT"" :" & """" & row("PPBIDEN_ESTADO_SUNAT").ToString & """,")

                                resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTAR_PRODUCTOS" 'LISTAR PRODUCTOS ALMACENABLES Y NO ALMACENABLES
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim Prod As New Nomade.NM.NMGestionProductos("BN")
                    dt = Prod.LISTAR_PRODUCTO_NAMINSA(CTLG_CODE, "", "", "A")

                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)

                    Else
                        res = "[]"
                    End If

                Case "LPROD" 'LISTAR PRODUCTOS ALMACENABLES Y NO ALMACENABLES
                    context.Response.ContentType = "application/json; charset=utf-8"
                    PROD_CODE = IIf(context.Request("PROD_CODE") = Nothing, String.Empty, context.Request("PROD_CODE"))
                    PRODUCTO = IIf(context.Request("PRODUCTO") = Nothing, String.Empty, context.Request("PRODUCTO"))
                    Dim Prod As New Nomade.NM.NMGestionProductos("BN")
                    dt = Prod.LISTAR_PRODUCTO(String.Empty, String.Empty, String.Empty, PROD_CODE, String.Empty,
                                              CTLG_CODE, String.Empty, String.Empty, PRODUCTO)

                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)

                    Else
                        res = "[]"
                    End If

                Case "AGRID" 'ACTUALIZA CANTIDAD DETALLE 
                    context.Response.ContentType = "text/html"
                    If columnId = "3" Then
                        msg = New Nomade.NC.NCFactura("Bn").ACTUALIZAR_detalle_dcto_pagar_CANT(FACC_CODE, id, value)
                        res = value.ToString
                    ElseIf columnId = "6" Then
                        msg = New Nomade.NC.NCFactura("Bn").ACTUALIZAR_detalle_dcto_pagar_BRUTO(FACC_CODE, id, value)
                        res = value.ToString
                    ElseIf columnId = "7" Then
                        msg = New Nomade.NC.NCFactura("Bn").ACTUALIZAR_detalle_dcto_pagar_DESC(FACC_CODE, id, value)
                        res = value.ToString
                    ElseIf columnId = "8" Then
                        msg = New Nomade.NC.NCFactura("Bn").ACTUALIZAR_detalle_dcto_pagar_NETO(FACC_CODE, id, value)
                        res = value.ToString
                    Else

                    End If

                Case "LD" 'LISTA DETALLES
                    context.Response.ContentType = "text/html"
                    Dim TIPO_MONE = context.Request("TIPO_MONE")
                    dt = New Nomade.NC.NCFactura("Bn").lista_detalle_dcto_pagar(FACC_CODE, FACC_SEQ_DOC, "")
                    If Not (dt Is Nothing) Then
                        If (IND_COMPL <> Nothing) Then
                            res = GenerarTablaDet2(dt, TIPO_MONE)  'tabla documento O/C                           
                        Else
                            res = GenerarTablaDet(dt, TIPO_MONE)  'tabla documento O/C
                        End If
                    Else
                        ' res = GenerarTablaDetVacia()
                    End If
                Case "L" 'LISTA DCTOS A PAGAR
                    context.Response.ContentType = "application/json"
                    dt = New Nomade.NC.NCFactura("Bn").lista_dcto_pagar("", "", "", "", "", String.Empty, String.Empty)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESC_SUCURSAL"" :" & """" & row("DESC_SUCURSAL").ToString & """,")
                            resb.Append("""DESC_DCTO"" :" & """" & row("DESC_DCTO").ToString & """,")
                            resb.Append("""NUM_DCTO"" :" & """" & row("NUM_DCTO").ToString & """,")
                            resb.Append("""EMISION"" :" & """" & row("EMISION").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"" :" & """" & row("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""IMPORTE"" :" & """" & row("IMPORTE").ToString & """,")
                            resb.Append("""COMPLETO"" :" & """" & row("COMPLETO").ToString & """,")
                            resb.Append("""ANULADO"" :" & """" & row("ANULADO").ToString & """,")
                            resb.Append("""EMPRESA"" :" & """" & row("EMPRESA").ToString & """,")
                            resb.Append("""SUCURSAL"" :" & """" & row("SUCURSAL").ToString & """,")
                            resb.Append("""TIPO_DCTO"" :" & """" & row("TIPO_DCTO").ToString & """,")
                            resb.Append("""HABIDO_IND"" :" & """" & row("HABIDO_IND").ToString & """,")
                            resb.Append("""TIPO_BIEN"" :" & """" & row("TIPO_BIEN").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "MONTO_LINEA_CREDITO"
                    context.Response.ContentType = "text/plain"
                    dt = New Nomade.FI.FILineaCProveedores("BN").fListarLineaCredito(PROV_PIDM, CTLG_CODE, "P", "A")
                    res = dt.Rows(0)("LINCRED").ToString
                Case "DELETE" 'ELIMINA UN ITEM DEL DETALLE
                    context.Response.ContentType = "text/html"
                    msg = New Nomade.NC.NCFactura("Bn").ELIMINAR_DETALLE_DCTO_PAGAR(FACC_CODE, FACC_SEQ_DOC, ITEM)
                    res = msg.ToString()
                Case "COMPLETAR"
                    context.Response.ContentType = "text/html"

                    Dim oNCFactura As New Nomade.NC.NCFactura("Bn")


                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    msg = oNCFactura.COMPLETAR_DCTO_PAGAR(FACC_CODE, "1", oTransaction)

                    oTransaction.fnCommitTransaction()

                    res = "OK"

                Case "GEN_ASIENTO" ' Suma fecha de emision más plazo de pago

                    Dim oNCParametros As New Nomade.NC.NCParametros("Bn")
                    Dim oDT_Param As New DataTable()
                    oDT_Param = oNCParametros.ListarParametros("ECON", "")
                    If oDT_Param Is Nothing Then
                        Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    End If
                    If oDT_Param.Rows.Count = 0 Then
                        Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    End If
                    Dim sUsaContab As String = oDT_Param.Rows(0)("VALOR")
                    If Not sUsaContab.Equals("S") Then
                        Throw New System.Exception("[Advertencia]: La empresa no tiene la opción contable activada.")
                    End If

                    Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")

                    Dim oDT_ConfigAsientoDocCompra As New DataTable
                    oDT_ConfigAsientoDocCompra = oCTMovimientoContable.fnGetConfigAsientoDocCompra(p_CODE)
                    Dim oDT_Asiento As New DataTable
                    oDT_Asiento = oCTMovimientoContable.fnGetAsientoContDocCompra(p_CODE)

                    Dim sCodMovCont As String = ""

                    Dim oNCFactura As New Nomade.NC.NCFactura("Bn")

                    Dim oDT_DocCompra As New DataTable
                    oDT_DocCompra = oNCFactura.fnGetDocCompra(p_CODE)
                    If oDT_DocCompra Is Nothing Then
                        Throw New System.Exception("No se pudo generar el Asiento Contable. No se encontró el documento de compra.")
                    End If

                    Dim oDR_DocCompra As DataRow = oDT_DocCompra.NewRow
                    oDR_DocCompra = oDT_DocCompra.Rows(0)

                    Dim sAnuladoInd As String = oDR_DocCompra("AnuladoInd")
                    If sAnuladoInd.Equals("S") Then
                        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de compra está anulado.")
                    End If

                    Dim sCompletoInd As String = oDR_DocCompra("CompletoInd")
                    If sCompletoInd.Equals("N") Then
                        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de compra no está completado.")
                    End If

                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    Dim sFechaEmision As String = Utilities.fechaLocal(oDR_DocCompra("FECHA_EMISION"))
                    Dim sFechaTransac As String = Utilities.fechaLocal(oDR_DocCompra("FECHA_TRANS"))
                    sCodMovCont = oCTMovimientoContable.fnAgregarMovCont(oDR_DocCompra("CodEmpresa"), oDR_DocCompra("CodEstablec"), oDR_DocCompra("ANIO_PERIODO"),
                                                                         oDR_DocCompra("MES_PERIODO"), p_NCMOCONT_CODIGO, "A", sFechaEmision, sFechaTransac,
                                                                         oDR_DocCompra("GLOSA"), oDR_DocCompra("MONE_CODE"), oDR_DocCompra("TC"),
                                                                         oDR_DocCompra("PIDM"), oDR_DocCompra("CodCompra"), USUA_ID,, oTransaction)

                    Dim sCodProducto As String = ""
                    For Each oDR As DataRow In oDT_ConfigAsientoDocCompra.Rows
                        sCodProducto = oDR("PROD_CODE")
                        If IsDBNull(oDR("CTA_ID_COMPRA")) Then
                            Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El producto '" + sCodProducto + "' no tiene configuración contable.")
                        End If
                        If IsDBNull(oDR("CTA_ID_IMP")) Then
                            Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El producto '" + sCodProducto + "' no tiene configuración contable.")
                        End If
                        If IsDBNull(oDR("CTA_ID_OPE")) Then
                            Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El producto '" + sCodProducto + "' no tiene configuración contable.")
                        End If
                    Next

                    If oDT_Asiento Is Nothing Then
                        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. No se pudo obtener la configuración del asiento contable.")
                    End If

                    Dim iItem As Integer = 0
                    Dim sFechaDoc As String
                    For Each oDR As DataRow In oDT_Asiento.Rows
                        iItem = iItem + 1

                        sFechaDoc = Utilities.fechaLocal(oDR("FECHA_DCTO"))
                        Dim sCOD_CCOSTO_CAB As String = IIf(IsDBNull(oDR("COD_CCOSTO_CAB")), Nothing, oDR("COD_CCOSTO_CAB"))
                        Dim sCOD_CCOSTO_DET As String = IIf(IsDBNull(oDR("COD_CCOSTO_DET")), Nothing, oDR("COD_CCOSTO_DET"))
                        oCTMovimientoContable.fnAgregarMovContabDet(sCodMovCont, iItem, oDR("ITEM_TIPO"), oDR("GLOSA"), oDR("PIDM"), oDR("COD_DOC_IDENT"), oDR("COD_SUNAT_DOC_IDENT"),
                                                                    oDR("DOC_IDENT"), oDR("NRO_DOC_IDENT"), sCOD_CCOSTO_CAB, sCOD_CCOSTO_DET, oDR("CCOSTO"), oDR("COD_DCTO"),
                                                                    oDR("COD_SUNAT_DCTO"), oDR("DCTO"), oDR("SERIE_DCTO"), oDR("NRO_DCTO"), sFechaDoc, oDR("COD_MONE"),
                                                                    oDR("COD_SUNAT_MONE"), oDR("CTA_ID"), oDR("CTA"), oDR("TC"), oDR("DEBE"), oDR("HABER"),
                                                                    oDR("DEBE_MN"), oDR("HABER_MN"), oDR("DEBE_ME"), oDR("HABER_ME"), oTransaction)
                    Next

                    oNCFactura.fnActualizarCodContabDocCompra(p_CODE, sCodMovCont, oTransaction)

                    oTransaction.fnCommitTransaction()

                    res = sCodMovCont

                Case "V" 'valida si existe documento
                    context.Response.ContentType = "text/html"
                    Dim resp As String
                    resp = New Nomade.NC.NCFactura("Bn").EXISTE_DCTO_PAGAR(NUM_SERIE, NUM_DCTO, TIPO_DCTO, PROV_PIDM)
                    res = resp.ToString()

                Case "GF" ' REGISTRAR DOCUMENTO DE COMPRA
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim fac As New Nomade.NC.NCFactura("Bn")
                    Dim dtDocOrigen As New DataTable
                    Dim PLAZO As String = context.Request("PLAZO")
                    Dim FECHA_VENC As String = Utilities.fechaLocal(context.Request("FECHA_VENC"))
                    Dim COD_SERIE_ORG As String = context.Request("COD_SERIE_ORG")
                    Dim AJUSTE As String = context.Request("AJUSTE")
                    Dim array As Array
                    array = fac.insertar_dcto_pagar(COD_OPERA, "1", NUM_SERIE_ORG, NUM_DCTO_ORG, TIPO_DCTO_ORG, Utilities.fechaLocal(FEC_EMISION),
                                                    Utilities.fechaLocal(FEC_TRANS), Utilities.fechaLocal(FEC_VENCI), GLOSA, CTLG_CODE,
                                                    SCSL_CODE, MONEDA_CODE, BASE_IMPONIBLE, ISC, DESCUENTO, IMPUESTO, TOTAL_PAGAR, IMPUESTO_IND, "", MODO_PAGO, Nothing, PROV_PIDM,
                                                    "D", "N", "", "", COD_SERIE_ORG, Utilities.fechaLocal(Date.Now.ToString("dd/MM/yyyy")), "", "", IIf(VALOR_CAMBIO = Nothing, "0", VALOR_CAMBIO),
                                                   "", USUARIO, TIPO_DCTO, NUM_SERIE, NUM_DCTO, IIf(PERCEPCION_IND = Nothing, "N", PERCEPCION_IND), IIf(DETRACCION_IND = Nothing, "N", DETRACCION_IND),
                                                   IIf(RETENCION_IND = Nothing, "N", RETENCION_IND), IIf(PERCEPCION = Nothing, "0", PERCEPCION), IIf(DETRACCION = Nothing, "0", DETRACCION),
                                                   IIf(RETENCION = Nothing, "0", RETENCION), OPERACION, NUM_DCTO_DETRAC, Utilities.fechaLocal(IIf(FEC_EMI_DETRAC = "", Date.Now.ToString("dd/MM/yyyy"), FEC_EMI_DETRAC)),
                                                   NRO_CUENTA_DETRAC, NUM_DCTO_PERCEP, Utilities.fechaLocal(IIf(FECHA_EMI_PERCEP = "", Date.Now.ToString("dd/MM/yyyy"), FECHA_EMI_PERCEP)), IMPRFAC_PERCEP,
                                                   NUM_DCTO_RETEN, Utilities.fechaLocal(IIf(FECHA_EMI_RETEN = "", Date.Now.ToString("dd/MM/yyyy"), FECHA_EMI_RETEN)), INAFECTO, Nothing, PLAZO, FECHA_VENC, AJUSTE, p_MES_TRIB, p_ANIO_TRIB,
                                                   p_DIRECCION, IIf(p_LATITUD = "null", Nothing, IIf(p_LATITUD = "", Nothing, p_LATITUD)), IIf(p_LONGITUD = "null", Nothing, IIf(p_LONGITUD = "", Nothing, p_LONGITUD)), p_ISC_IND, p_PORCEN_IGV,
                                                   p_HABIDO_IND, p_TIPO_BIEN)
                    If Not (array Is Nothing) Then
                        Dim CD = Split(COD_SERIE_ORG, ",")
                        Select Case TIPO_DCTO_ORG
                            Case "0004"
                            Case "0009", "0031", "0001" 'GUIA DE REMISION-REMITENTE, GUIA DE REMISION-TRANSPORTISTA, FACTURA
                                For Each codigo As String In CD
                                    dt = New Nomade.NA.NATipoMovimiento("BN").lista_detalle_dcto_almacen(codigo, String.Empty)
                                    If Not dt Is Nothing Then
                                        For Each row As DataRow In dt.Rows
                                            fac.insertar_detalle_dcto_pagar(array(0).ToString, row("REQC_NUM_SEQ_DOC").ToString, row("PROD_CODE").ToString, "S",
                                                                            row("DESC_PRODUCTO").ToString, row("UNME_BASE").ToString, row("CANTIDAD_BASE").ToString,
                                                                            IIf(MONEDA_CODE = "0002", CDbl(row("MONTO").ToString), CDbl(row("MONTO_ALTERNO").ToString)), "0",
                                                                            IIf(MONEDA_CODE = "0002", CDbl(row("TOTAL").ToString), CDbl(row("TOTAL_ALTERNO").ToString)),
                                                                            Nothing, Nothing, Nothing, "N", "FACT", CTLG_CODE, "", "", "701", "", "", "", Nothing,
                                                                            USUARIO, row("INC_IGV").ToString.Chars(0), Nothing, Nothing, Nothing,
                                                                            CDbl(row("DETRACCION").ToString) * CDbl(row("TOTAL").ToString) / 100.0, codigo)
                                        Next
                                    End If
                                Next
                            Case "0026"
                                Dim item As Integer = 0
                                For Each codigo As String In CD
                                    dt = New Nomade.CO.CORegistroCompras("BN").LISTAR_DETALLE_ORDCOMPRA(codigo)
                                    If Not dt Is Nothing Then
                                        For Each row As DataRow In dt.Rows
                                            item = item + 1
                                            fac.insertar_detalle_dcto_pagar(array(0).ToString, "1", row("CODIGOPRO").ToString,
                                                                            row("ALMACENABLE").ToString, row("PRODUCTO").ToString, row("UNME_CODE").ToString, row("CANTIDAD").ToString,
                                                                            IIf(MONEDA_CODE = "0002", row("PREC_UNIT").ToString, row("PRECIO_UNIT_ALT").ToString), "0",
                                                                            IIf(MONEDA_CODE = "0002", row("IMPORTE").ToString, row("IMPORTE_ALT").ToString), Nothing, Nothing,
                                                                            item.ToString, "N", "FACT", CTLG_CODE, "", "", "701", "", "", "", Nothing, USUARIO, "", Nothing, Nothing, Nothing,
                                                                            CDbl(row("DETRACCION").ToString) * CDbl(row("IMPORTE").ToString) / 100.0, codigo)
                                        Next
                                    End If
                                Next
                            Case "0028"
                        End Select
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & array(1).ToString & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "AC" ' ACTUALIZAR DOCUMENTO DE COMPRA
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim PLAZO As String = context.Request("PLAZO")
                    Dim FECHA_VENC As String = context.Request("FECHA_VENC")
                    Dim AJUSTE As String = context.Request("AJUSTE")
                    Dim COD_SERIE_ORG As String = context.Request("COD_SERIE_ORG")
                    cadenaux = cadenaux
                    Dim array As Array
                    array = New Nomade.NC.NCFactura("Bn").actualizar_dcto_pagar(FACC_CODE, "1", COD_OPERA, NUM_SERIE_ORG, NUM_DCTO_ORG, TIPO_DCTO_ORG, Utilities.fechaLocal(FEC_EMISION),
                                                    Utilities.fechaLocal(FEC_TRANS), Utilities.fechaLocal(FEC_VENCI), GLOSA, CTLG_CODE,
                                                    SCSL_CODE, MONEDA_CODE, BASE_IMPONIBLE, ISC, DESCUENTO, IMPUESTO, TOTAL_PAGAR, IMPUESTO_IND, "", MODO_PAGO, Nothing, PROV_PIDM,
                                                    "D", "N", "", "", COD_SERIE_ORG,
                                                    Utilities.fechaLocal(Date.Now.ToString("dd/MM/yyyy")), "", "", IIf(VALOR_CAMBIO = Nothing, "0", VALOR_CAMBIO),
                                                   "", USUARIO, TIPO_DCTO, NUM_SERIE, NUM_DCTO, IIf(PERCEPCION_IND = Nothing, "N", PERCEPCION_IND), IIf(DETRACCION_IND = Nothing, "N", DETRACCION_IND),
                                                   IIf(RETENCION_IND = Nothing, "N", RETENCION_IND), IIf(PERCEPCION = Nothing, "0", PERCEPCION), IIf(DETRACCION = Nothing, "0", DETRACCION),
                                                   IIf(RETENCION = Nothing, "0", RETENCION), OPERACION,
                                                   NUM_DCTO_DETRAC, Utilities.fechaLocal(IIf(FEC_EMI_DETRAC = "", Date.Now.ToString("dd/MM/yyyy"), FEC_EMI_DETRAC)), NRO_CUENTA_DETRAC,
                                                   NUM_DCTO_PERCEP, Utilities.fechaLocal(IIf(FECHA_EMI_PERCEP = "", Date.Now.ToString("dd/MM/yyyy"), FECHA_EMI_PERCEP)), IMPRFAC_PERCEP,
                                                   NUM_DCTO_RETEN, Utilities.fechaLocal(IIf(FECHA_EMI_RETEN = "", Date.Now.ToString("dd/MM/yyyy"), FECHA_EMI_RETEN)), INAFECTO, PLAZO, FECHA_VENC, AJUSTE, p_MES_TRIB, p_ANIO_TRIB,
                                                   p_DIRECCION, IIf(p_LATITUD = "null", Nothing, IIf(p_LATITUD = "", Nothing, p_LATITUD)), IIf(p_LONGITUD = "null", Nothing, IIf(p_LONGITUD = "", Nothing, p_LONGITUD)), p_ISC_IND, p_PORCEN_IGV,
                                                   p_HABIDO_IND, p_TIPO_BIEN)
                    If Not (array Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""MENSAJE"" :" & """" & array(0).ToString & """")
                        resb.Append("}")
                        resb.Append(",")

                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "GD" ' registra un detalle del documento
                    context.Response.ContentType = "text/html"
                    Dim r As String
                    Dim DCTO_ORGN = context.Request("DCTO_ORGN")
                    r = New Nomade.NC.NCFactura("Bn").insertar_detalle_dcto_pagar(FACC_CODE, FACC_SEQ_DOC, PROD_CODE, PROD_ALMACENABLE,
                                                                                  PROD_CMNT, UMME_CODE, CANTIDAD, PREC_UNI, DESCUENTO,
                                                                                  TOTAL, Nothing, Nothing, Nothing, PAGO_FINAL_IND, "FACT",
                                                                                  CTLG_CODE, "", "", "701", "", "", "", "", USUARIO, IMPUESTO_IND,
                                                                                  "", "0", "0", DETALLE_DETRACCION, DCTO_ORGN)
                    res = r.ToString()
                Case "DOCESPECIFICO"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCTipoDCEmpresa("BN").ListarTipoDCEspecifico(TIPO_DCTO, CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION_CORTA", "ASC")
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION_CORTA"" :" & """" & row("DESCRIPCION_CORTA").ToString & """,")
                            resb.Append("""FECHA_ELEC"" :" & """" & Utilities.fechaLocal(row("FECHA_ELEC").ToString) & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LDOCS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim TOTAL_SOLES As Double
                    Dim TOTAL_DOLARES As Double
                    Dim TIPO_CAMBIO As Double
                    Select Case TIPO_DCTO
                        Case "0004" 'LIQUIDACION DE COMPRA
                            resb.Append("[]")
                        Case "0009", "0031", "0001" 'GUIA DE REMISION-REMITENTE, GUIA DE REMISION-TRANSPORTISTA, FACTURA
                            dt = New Nomade.NA.NATipoMovimiento("BN").lista_dcto_almacen(String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, "I", CTLG_CODE, String.Empty, PROV_PIDM, TIPO_DCTO)
                            If Not (dt Is Nothing) Then
                                resb.Append("[")
                                For Each row As DataRow In dt.Rows
                                    If row("COMPLETO").ToString = "COMPLETO" And row("ORGN").ToString.Trim = "" Then
                                        resb.Append("{")
                                        resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                        resb.Append("""NRO_DOCUMENTO"" :" & """" & row("REQC_NUM_SEQ_DOC").ToString & "-" & row("REQC_CODE").ToString & """,")
                                        resb.Append("""PROVEEDOR"" :" & """" & row("RAZON_DEST").ToString & """,")
                                        resb.Append("""TOTAL"" :" & """" & row("IMPORTE_BIEN").ToString & """,")
                                        resb.Append("""TOTAL_ALTERNO"" :" & """" & row("IMPORTE_BIEN_ALTERNO").ToString & """,")
                                        resb.Append("""DETRACCION"" :" & """0.00"",")
                                        resb.Append("""DETRACCION_ALTERNO"" :" & """0.00"",")
                                        resb.Append("""PERCEPCION"" :" & """0.00"",")
                                        resb.Append("""PERCEPCION_ALTERNO"" :" & """0.00"",")
                                        resb.Append("""RETENCION"" :" & """0.00"",")
                                        resb.Append("""RETENCION_ALTERNO"" :" & """0.00""")
                                        resb.Append("},")
                                    End If
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                                resb = resb.Replace("[{}]", String.Empty)
                            End If
                        Case "0026" 'ORDEN DE COMPRA AL PROVEEDOR
                            dt = New Nomade.CO.CORegistroCompras("BN").LISTAR_LISTA_ORDEN_COMPRA(CTLG_CODE, SCSL_CODE, PROV_PIDM, "N")
                            Dim DETRACCION, DETRACCION_ALTERNO As Double
                            Dim PERCEPCION, PERCEPCION_ALTERNO As Double
                            Dim RETENCION, RETENCION_ALTERNO As Double
                            If Not (dt Is Nothing) Then
                                resb.Append("[")
                                For Each row As DataRow In dt.Rows
                                    TIPO_CAMBIO = Double.Parse(row("TIPO_CAMBIO").ToString)
                                    If row("MONEDA").ToString = "0002" Then
                                        TOTAL_SOLES = Double.Parse(row("SUBTOTAL").ToString)
                                        TOTAL_DOLARES = TOTAL_SOLES / TIPO_CAMBIO
                                        DETRACCION = Double.Parse(row("DETRACCION").ToString)
                                        DETRACCION_ALTERNO = DETRACCION / TIPO_CAMBIO
                                        PERCEPCION = Double.Parse(row("PERCCECION").ToString)
                                        PERCEPCION_ALTERNO = PERCEPCION / TIPO_CAMBIO
                                        RETENCION = Double.Parse(row("RETENCION").ToString)
                                        RETENCION_ALTERNO = RETENCION / TIPO_CAMBIO
                                    Else
                                        TOTAL_DOLARES = Double.Parse(row("SUBTOTAL").ToString)
                                        TOTAL_SOLES = TOTAL_DOLARES * TIPO_CAMBIO
                                        DETRACCION_ALTERNO = Double.Parse(row("DETRACCION").ToString)
                                        DETRACCION = DETRACCION_ALTERNO / TIPO_CAMBIO
                                        PERCEPCION_ALTERNO = Double.Parse(row("PERCCECION").ToString)
                                        PERCEPCION = PERCEPCION_ALTERNO / TIPO_CAMBIO
                                        RETENCION_ALTERNO = Double.Parse(row("RETENCION").ToString)
                                        RETENCION = RETENCION_ALTERNO / TIPO_CAMBIO
                                    End If
                                    resb.Append("{")
                                    resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                    resb.Append("""NRO_DOCUMENTO"" :" & """" & row("CORRELATIVO").ToString & """,")
                                    resb.Append("""PROVEEDOR"" :" & """" & row("P_NOMBRE").ToString & """,")
                                    resb.Append("""TOTAL"" :" & """" & Math.Round(TOTAL_SOLES, 2) & """,")
                                    resb.Append("""TOTAL_ALTERNO"" :" & """" & Math.Round(TOTAL_DOLARES, 2) & """,")
                                    resb.Append("""DETRACCION"" :" & """" & Math.Round(DETRACCION, 2) & """,")
                                    resb.Append("""DETRACCION_ALTERNO"" :" & """" & Math.Round(DETRACCION_ALTERNO, 2) & """,")
                                    resb.Append("""PERCEPCION"" :" & """" & Math.Round(PERCEPCION, 2) & """,")
                                    resb.Append("""PERCEPCION_ALTERNO"" :" & """" & Math.Round(PERCEPCION_ALTERNO, 2) & """,")
                                    resb.Append("""RETENCION"" :" & """" & Math.Round(RETENCION, 2) & """,")
                                    resb.Append("""RETENCION_ALTERNO"" :" & """" & Math.Round(RETENCION_ALTERNO, 2) & """")
                                    resb.Append("},")
                                Next
                                resb.Append("{}")
                                resb = resb.Replace(",{}", String.Empty)
                                resb.Append("]")
                                resb = resb.Replace("[{}]", String.Empty)
                            End If
                        Case Else
                            resb.Append("[]")
                    End Select
                    res = resb.ToString()
                Case "DETRAC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim cuen As New Nomade.NC.NCBanco("BN")
                    dt = cuen.fListarCtasBancariasZCliente(PROV_PIDM, "A", "0005")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("MONEDA_CODE").ToString() = MONEDA_CODE Then
                                resb.Append("{")
                                resb.Append("""NRO_CUENTA"" :" & """" & row("NRO_CUENTA").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LASOC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim canj As New Nomade.GL.GLCanjeLetrasFacturas("BN")
                    dt = canj.ListarLetrasAsociadas(p_CODE, CTLG_CODE, "P", p_DOCUMENTO)
                    'dt = canj.ListarCanje(String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("NUMERO_DOCUMENTO").ToString() = NUM_DCTO And row("DOC_IND").ToString() = TIPO_DCTO Then
                                resb.Append("{")
                                resb.Append("""CODIGO_DOCUMENTO"" :" & """" & row("CODIGO_DOCUMENTO").ToString & """,")
                                resb.Append("""NUMERO_DOCUMENTO"" :" & """" & row("NUMERO_DOCUMENTO").ToString & """,")
                                resb.Append("""NRO_DOC_DETALLE"" :" & """" & row("NRO_DOC_DETALLE").ToString & """,")
                                resb.Append("""FECHA_EMISION"" :" & """" & row("FECHA_EMISION").ToString & """,")
                                resb.Append("""MONTO"" :" & """" & row("MONTO").ToString & """")
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

                Case "GET_SALDO_DOC_COMPRA" 'valida si existe documento
                    context.Response.ContentType = "text/html"
                    Dim oNCFactura As New Nomade.NC.NCFactura("Bn")

                    Dim oDT As New DataTable
                    oDT = oNCFactura.GET_SALDO_DOC_COMPRA(FACC_CODE)

                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case Else
            End Select
            context.Response.Write(res)

        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
            Dim sMsjeError As String = ex.Message
            If (sMsjeError.IndexOf("[Advertencia]") > -1) Then
                context.Response.Write(sMsjeError)
            Else
                context.Response.Write("[Error]: " + sMsjeError)
            End If
        End Try

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    Public Function GenerarTablaDet(ByVal dt As DataTable, ByVal TIPO_MONE As String) As String
        If Not dt Is Nothing Then
            res = "<table id=""tabla_det"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>ITEM</th>"
            res += "<th>PRODUCTO</th>"
            res += "<th style='text-align: left'>DESCRIPCION</th>"
            res += "<th>CANT.</th>"
            res += "<th>UNID.</th>"
            res += "<th>PU</th>"
            res += "<th>TOTAL BRUTO</th>"
            res += "<th>DESC.</th>"
            res += "<th>TOTAL NETO</th>"
            res += "<th>DETRACCION</th>"
            res += "<th></th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id=""" & dt.Rows(i)("ITEM").ToString() & """>"
                res += "<td align=""center"">" & dt.Rows(i)("ITEM").ToString() & "</td>"
                res += "<td class=""producto"" align=""center"">" & dt.Rows(i)("PROD_CODE_ANTIGUO").ToString() & "</td>"
                res += "<td >" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                res += "<td class=""cantidad" & dt.Rows(i)("ITEM").ToString() & """ style=""text-align: center"">" & dt.Rows(i)("CANTIDAD").ToString() & "</td>"
                res += "<td align=""center"">" & dt.Rows(i)("DESC_UNIDAD").ToString() & "</td>"
                res += "<td class=""precio" & dt.Rows(i)("ITEM").ToString() & """ align=""center"">" & Math.Round(CDbl(dt.Rows(i)("PRECIO").ToString), 2) & "</td>"
                res += "<td class=""bruto" & dt.Rows(i)("ITEM").ToString() & """ align=""center"">" & IIf(TIPO_MONE = "MOBA", dt.Rows(i)("TOTAL_BRUTO").ToString, dt.Rows(i)("CONVERT_TOTAL_BRUTO").ToString) & "</td>"
                res += "<td class=""descuento" & dt.Rows(i)("ITEM").ToString() & """ style=""text-align: center"">" & IIf(TIPO_MONE = "MOBA", dt.Rows(i)("DESCUENTO").ToString, dt.Rows(i)("CONVERT_DESCUENTO").ToString) & "</td>"
                res += "<td class=""suma neto" & dt.Rows(i)("ITEM").ToString() & """ align=""center"">" & CDbl(IIf(TIPO_MONE = "MOBA", dt.Rows(i)("TOTAL_NETO").ToString, dt.Rows(i)("CONVERT_TOTAL_NETO").ToString)) & "</td>"
                res += "<td class=""detraccion"" id=""det" & dt.Rows(i)("ITEM").ToString() & """ align=""center"">" & CDbl(IIf(TIPO_MONE = "MOBA", dt.Rows(i)("MONTO_DETRAC").ToString, dt.Rows(i)("CONVERT_MONTO_DETRAC").ToString)) & "</td>"
                res += "<td align=""center""><a href='javascript:Delete(""" & dt.Rows(i)("ITEM").ToString() & """,""" & IIf(TIPO_MONE = "MOBA", dt.Rows(i)("TOTAL_NETO").ToString, dt.Rows(i)("CONVERT_TOTAL_NETO").ToString) & """)' class='btn red'><i class=icon-trash></i></a></td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos."
        End If
        Return res
    End Function

    Public Function GenerarTablaDet2(ByVal dt As DataTable, ByVal TIPO_MONE As String) As String
        If Not dt Is Nothing Then
            res = "<table id=""tabla_det"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>ITEM</th>"
            res += "<th>PRODUCTO</th>"
            res += "<th>DESCRIPCION</th>"
            res += "<th>CANT.</th>"
            res += "<th>UNID.</th>"
            res += "<th>PU</th>"
            res += "<th>TOTAL BRUTO</th>"
            res += "<th>DESC.</th>"
            res += "<th>TOTAL NETO</th>"
            res += "<th>DETRACCION</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id=""" & dt.Rows(i)("ITEM").ToString() & """>"
                res += "<td align=""center"">" & dt.Rows(i)("ITEM").ToString() & "</td>"
                res += "<td class=""producto"" align=""center"">" & dt.Rows(i)("PROD_CODE_ANTIGUO").ToString() & "</td>"
                res += "<td >" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                res += "<td class=""cantidad" & dt.Rows(i)("ITEM").ToString() & """>" & dt.Rows(i)("CANTIDAD").ToString() & "</td>"
                res += "<td align=""center"">" & dt.Rows(i)("DESC_UNIDAD").ToString() & "</td>"
                res += "<td class=""precio" & dt.Rows(i)("ITEM").ToString() & """ align=""center"">" & Math.Round(CDbl(dt.Rows(i)("PRECIO").ToString), 2) & "</td>"
                res += "<td class=""bruto" & dt.Rows(i)("ITEM").ToString() & """ align=""center"">" & IIf(TIPO_MONE = "MOBA", dt.Rows(i)("TOTAL_BRUTO").ToString, dt.Rows(i)("CONVERT_TOTAL_BRUTO").ToString) & "</td>"
                res += "<td class=""descuento" & dt.Rows(i)("ITEM").ToString() & """>" & IIf(TIPO_MONE = "MOBA", dt.Rows(i)("DESCUENTO").ToString, dt.Rows(i)("CONVERT_DESCUENTO").ToString) & "</td>"
                res += "<td class=""suma neto" & dt.Rows(i)("ITEM").ToString() & """   align=""center"">" & Double.Parse(IIf(TIPO_MONE = "MOBA", dt.Rows(i)("TOTAL_NETO").ToString, dt.Rows(i)("CONVERT_TOTAL_NETO").ToString)) & "</td>"
                res += "<td class=""detrac detraccionx" & dt.Rows(i)("ITEM").ToString() & """   align=""center"">" & Double.Parse(IIf(TIPO_MONE = "MOBA", dt.Rows(i)("MONTO_DETRAC").ToString, dt.Rows(i)("CONVERT_MONTO_DETRAC").ToString)) & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos."
        End If
        Return res
    End Function

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

End Class
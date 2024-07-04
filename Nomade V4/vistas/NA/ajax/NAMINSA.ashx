<%@ WebHandler Language="VB" Class="NAMINSA" %>
Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports SelectPdf
Imports QRCoder

Public Class NAMINSA : Implements IHttpHandler

    Dim OPCION As String
    Dim USUARIO As String

    Dim TIPO, p_NUM_SEQ_DOC, PROD_CODE, IND, codrec, APLIC_VALORES, SERIADO_IND,
        item, id, value, CODE_CECC, CODE_CENTRO_COSTO, SERIE_PROD, VAL_FIN, VAL_INI,
        TIPO_INSERT, DESD_COMPRA_IND, ALMC_DEST, MONTO, CODE_PROD, CODE_PROD_ANTIGUO,
        CODE_UME, TIP_DCTO_ORG, DIRE, DCTO_ORGN_SERIE, DCTO_REG, DCTO_ORGN, PIDM_ENTREGAR_A, ENTREGAR_A,
        PIDM_SOLICITANTE, SOLICITANTE, FEC_TRANS, FEC_EMISION, TIPO_DCTO, PIDM, NICA_CODE, COD_ALMC,
        TIPO_MOV_CODE, TIPO_MOV, CTLG_CODE, SCSL_CODE, USUA_ID, DESC,
        DCTO_REQ, ISAC_CODE, ATEN_IND, IGV_IND, MONEDA, GARANTIA, CANT, TIPO_OPE, SERIE_DCTO,
        TIP_DCTO, PLACA, RAZON_TRANS, ESTADO_IND, CMMNT_DCTO, TIPO_DOC_RAZON_DEST, RAZON_DEST,
        LIC_CONDUCIR, CERTIFICADO, CHOFER, ELECTRONICO, TIPO_TRANS, COD_AUT, DOCS_CODE,
        TIPO_DOC_INTERNO, COD_AUT_INTERNO, TIPO_ENVIO, DIRECCION_TRANSPORTISTA,
        RAZON_DEST_DESC, RUC_DEST, RAZON_TRANS_DESC, RUC_TRANSP, DETALLE_IMPR, INDICE_INI, INDICE_FIN, NRO_VUELTAS, DESC_VEHICULO, MARCA_FACT, PLACA_FACT,
        UBIGEO_ORIGEN, UBIGEO_DESTINO, DIREC_ORIGEN, DIREC_DESTINO, URBANIZACION_ORIGEN, URBANIZACION_DESTINO, PIDM_TRANSP, COD_DIREC, p_CECC, p_CECD,
        F_DESDE, F_HASTA, P_CODE_DOC, p_CODE, TIPO_DOC_TRANS, CBOOPERACION As String

    Dim VALIDAR_EXISTENTE As String

    Dim filtrotypeahead As String

    Dim p_NCMOCONT_CODIGO, p_CODIGO_NAM As String

    Dim CODIGO As String

    Dim COSTO_TRANSPORTE, MONTO_MAS_COSTO_TRANSPORTE, PESO_UNIT, PESO_TOTAL, doc_origen As String

    'QR
    Dim p_IMGQR As String

    'WHATSAPP CLOUD API
    Dim RECIPIENT_PHONE_NUMBER, MENSAJEWHATSAPP As String

    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim oTransaction As New Nomade.DataAccess.Transaccion()
    Dim codigoQR As New Nomade.Impresion.CodigoQR("Bn")


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        'Capturamos los valores que nos envia el formulario
        p_IMGQR = context.Request("p_IMGQR")
        codrec = context.Request("codigo")
        '-------------------------------'
        OPCION = context.Request("OPCION")

        CODIGO = context.Request("CODIGO")
        CBOOPERACION = context.Request("CBOOPERACION")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        USUA_ID = context.Request("USUA_ID")
        DESC = context.Request("DESC")
        ESTADO_IND = context.Request("ESTADO_IND")
        TIPO_MOV = context.Request("TIPO_MOV")
        COD_ALMC = context.Request("COD_ALMC")
        TIPO_MOV_CODE = String.Empty
        NICA_CODE = context.Request("NICA_CODE")
        PIDM = context.Request("PIDM")
        TIPO_DCTO = context.Request("TIPO_DCTO")
        TIP_DCTO = context.Request("TIP_DCTO")
        CODE_PROD = context.Request("CODE_PROD")
        MONEDA = context.Request("MONEDA")
        ISAC_CODE = context.Request("ISAC_CODE")
        id = context.Request.Form("id")
        value = context.Request.Form("value")
        item = context.Request("item")
        SERIADO_IND = context.Request.Form("SERIE_IND")
        IND = context.Request("IND") 'ind completo el doc almc
        TIPO = context.Request("TIPO")
        ELECTRONICO = context.Request("ELECTRONICO")
        TIPO_TRANS = context.Request("TIPO_TRANS")
        INDICE_INI = context.Request("INDICE_INI")
        INDICE_FIN = context.Request("INDICE_FIN")
        NRO_VUELTAS = context.Request("NRO_VUELTAS")
        COD_DIREC = context.Request("sCodUbigSist")
        VALIDAR_EXISTENTE = context.Request("VALIDAR_EXISTENTE") 'INDICA SI SE DEBE VALIDAR LA SERIE PARA MODIFICA
        F_DESDE = context.Request("F_DESDE")
        F_HASTA = context.Request("F_HASTA")
        P_CODE_DOC = context.Request("P_CODE_DOC")
        p_NCMOCONT_CODIGO = context.Request("p_NCMOCONT_CODIGO")
        p_CODE = context.Request("p_CODE")
        p_CODIGO_NAM = context.Request("p_CODIGO_NAM")

        'WHATSAPP CLOUD API
        RECIPIENT_PHONE_NUMBER = context.Request("RECIPIENT_PHONE_NUMBER")
        MENSAJEWHATSAPP = context.Request("MENSAJEWHATSAPP")

        doc_origen = context.Request("doc_origen") 'PARA ELIMINAR UNA FILA DEL DETALLE INDICANDO EL DOC ORIGEN SI ES SALIDA O ENTRADA DE DOCS. MULTIPLES

        filtrotypeahead = IIf(context.Request("q") = Nothing, "", context.Request("q"))

        Try

            Select Case OPCION
                Case "S"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NA.NATipoMovimiento("Bn").busca_CAB_dcto_almacen(codrec)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("EMPRESA") & """,")
                    resb.Append("""ALMC_CODE"" :" & """" & dt.Rows(0)("ALMC_CODE") & """,")
                    resb.Append("""ALMC_DEST"" :" & """" & dt.Rows(0)("ALMC_DEST") & """,")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""CMNT_DCTO"" :" & """" & dt.Rows(0)("CMNT_DCTO") & """,")
                    resb.Append("""FECHA_EMISION"" :" & """" & dt.Rows(0)("FECHA_EMISION") & """,")
                    resb.Append("""FECHA_TRANS"" :" & """" & dt.Rows(0)("FECHA_TRANS") & """,")
                    resb.Append("""ORGN_CODE"" :" & """" & dt.Rows(0)("ORGN") & """,")
                    resb.Append("""NUM_DCTO"" :" & """" & dt.Rows(0)("NUM_DCTO") & """,")
                    resb.Append("""NUM_SERIE_DCTO"" :" & """" & dt.Rows(0)("NUM_SERIE_DCTO") & """,")
                    resb.Append("""RAZON_DEST_TIPO_DOC"" :" & """" & dt.Rows(0)("RAZON_DEST_TIPO_DOC") & """,")
                    resb.Append("""RAZON_DEST"" :" & """" & dt.Rows(0)("RAZON_DEST") & """,")
                    resb.Append("""DIRECCION"" :" & """" & dt.Rows(0)("DIRECCION") & """,")
                    resb.Append("""CHOFER"" :" & """" & dt.Rows(0)("CHOFER") & """,")
                    resb.Append("""PIDMDEST"" :" & """" & dt.Rows(0)("PIDMDEST") & """,")
                    resb.Append("""VEHICULO_MARCA_PLACA"" :" & """" & dt.Rows(0)("VEHICULO_MARCA_PLACA") & """,")
                    resb.Append("""CERTIFICADO_NRO"" :" & """" & dt.Rows(0)("CERTIFICADO_NRO") & """,")
                    resb.Append("""LICENCIA_NRO"" :" & """" & dt.Rows(0)("LICENCIA_NRO") & """,")
                    resb.Append("""COMPLETO"" :" & """" & dt.Rows(0)("COMPLETO") & """,")
                    resb.Append("""RAZON_TRANS"" :" & """" & dt.Rows(0)("RAZON_TRANS") & """,")

                    resb.Append("""PIDM_TRANSPORTISTA"" :" & """" & dt.Rows(0)("PIDM_TRANSPORTISTA") & """,")

                    resb.Append("""NRO_DOC_RUC_DEST"" :" & """" & dt.Rows(0)("NRO_DOC_RUC_DEST") & """,")
                    resb.Append("""NRO_DOC_RUC_TRANS"" :" & """" & dt.Rows(0)("NRO_DOC_RUC_TRANS") & """,")
                    resb.Append("""NRO_DOC_DNI_DEST"" :" & """" & dt.Rows(0)("NRO_DOC_DNI_DEST") & """,")
                    resb.Append("""NRO_DOC_DNI_TRANS"" :" & """" & dt.Rows(0)("NRO_DOC_DNI_TRANS") & """,")
                    resb.Append("""NUM_SERIE"" :" & """" & dt.Rows(0)("NUM_SERIE") & """,")
                    resb.Append("""TIPO_DCTO_ORG"" :" & """" & dt.Rows(0)("TIPO_DCTO_ORG") & """,")
                    resb.Append("""TIPO_DCTO"" :" & """" & dt.Rows(0)("TIPO_DCTO") & """,")
                    resb.Append("""MONEDA"" :" & """" & dt.Rows(0)("MONEDA") & """,")
                    resb.Append("""TIPO_TRANS"" :" & """" & dt.Rows(0)("TIPO_TRANS") & """,")
                    resb.Append("""PIDM_SOLICITANTE"" :" & """" & dt.Rows(0)("PIDM_SOLICITANTE") & """,")
                    resb.Append("""SOLICITANTE"" :" & """" & dt.Rows(0)("SOLICITANTE") & """,")
                    resb.Append("""REQC_CODE"" :" & """" & dt.Rows(0)("REQC_CODE") & """,")
                    resb.Append("""REQC_NUM_SEQ_DOC"" :" & """" & dt.Rows(0)("REQC_NUM_SEQ_DOC") & """,")
                    resb.Append("""REQC_CODE_INTERNO"" :" & """" & dt.Rows(0)("REQC_CODE_INTERNO") & """,")
                    resb.Append("""REQC_NUM_SEQ_DOC_INTERNO"" :" & """" & dt.Rows(0)("REQC_NUM_SEQ_DOC_INTERNO") & """,")
                    resb.Append("""RETORNO_IND"" :" & """" & dt.Rows(0)("RETORNO_IND") & """,")
                    resb.Append("""PIDM_ENTREGAR_A"" :" & """" & dt.Rows(0)("PIDM_ENTREGAR_A") & """,")
                    resb.Append("""ENTREGAR_A"" :" & """" & dt.Rows(0)("ENTREGAR_A") & """,")
                    resb.Append("""TMOV_CODE"" :" & """" & dt.Rows(0)("TMOV_CODE") & """,")
                    resb.Append("""TMOV_CONT"" :" & """" & dt.Rows(0)("TMOV_CONT") & """,")
                    resb.Append("""TIPO_MOVIMIENTO"" :" & """" & dt.Rows(0)("TIPO_MOVIMIENTO") & """,")
                    resb.Append("""NUM_SEQ_DOC"" :" & """" & dt.Rows(0)("NUM_SEQ_DOC") & """,")
                    resb.Append("""TIPO_ENVIO"" :" & """" & dt.Rows(0)("TIPO_ENVIO") & """,")
                    resb.Append("""DIRECCION_TRANSPORTISTA"" :" & """" & dt.Rows(0)("DIRECCION_TRANSPORTISTA") & """,")
                    resb.Append("""PIDMTRANS"" :" & """" & dt.Rows(0)("PIDMTRANS") & """,")
                    resb.Append("""NRO_VUELTAS"" :" & """" & dt.Rows(0)("NRO_VUELTAS") & """,")
                    resb.Append("""APROBADO_IND"" :" & """" & dt.Rows(0)("APROBADO_IND") & """,")
                    resb.Append("""COSTO_TRANSPORTE"" :" & """" & dt.Rows(0)("COSTO_TRANSPORTE") & """,")
                    resb.Append("""ELETRONICO_IND"" :" & """" & dt.Rows(0)("ELETRONICO_IND") & """,")
                    resb.Append("""MOVCONT_CODE"" :" & """" & dt.Rows(0)("MOVCONT_CODE") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    PROD_CODE = context.Request("PROD_CODE")
                    Dim fDesde, sAnio, sMes, sDia, fHasta As String

                    If F_DESDE = "" Then
                        fDesde = F_DESDE
                    Else
                        sDia = F_DESDE.Split("/")(0).ToString
                        sMes = F_DESDE.Split("/")(1).ToString
                        sAnio = F_DESDE.Split("/")(2).ToString
                        fDesde = sAnio + sMes + sDia

                    End If
                    If F_HASTA = "" Then
                        fHasta = F_HASTA
                    Else
                        sDia = F_HASTA.Split("/")(0).ToString
                        sMes = F_HASTA.Split("/")(1).ToString
                        sAnio = F_HASTA.Split("/")(2).ToString
                        fHasta = sAnio + sMes + sDia

                    End If


                    dt = New Nomade.NA.NATipoMovimiento("BN").lista_dcto_almacen("", "", "", "", "", "", CTLG_CODE, COD_ALMC, "", "", PROD_CODE, fDesde, fHasta)

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "LC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    PROD_CODE = context.Request("PROD_CODE")
                    Dim fDesde, sAnio, sMes, sDia, fHasta As String

                    If F_DESDE = "" Then
                        fDesde = F_DESDE
                    Else
                        sDia = F_DESDE.Split("/")(0).ToString
                        sMes = F_DESDE.Split("/")(1).ToString
                        sAnio = F_DESDE.Split("/")(2).ToString
                        fDesde = sAnio + sMes + sDia

                    End If
                    If F_HASTA = "" Then
                        fHasta = F_HASTA
                    Else
                        sDia = F_HASTA.Split("/")(0).ToString
                        sMes = F_HASTA.Split("/")(1).ToString
                        sAnio = F_HASTA.Split("/")(2).ToString
                        fHasta = sAnio + sMes + sDia

                    End If


                    dt = New Nomade.NA.NATipoMovimiento("BN").lista_dcto_almacen2("", "", "", "", "", "", CTLG_CODE, COD_ALMC, "", "", PROD_CODE, fDesde, fHasta)

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "ELIMINAR_DCTO_ALMACEN"
                    context.Response.ContentType = "text/plain"
                    res = New Nomade.NA.NATipoMovimiento("BN").ELIMINAR_DCTO_ALMACEN(ISAC_CODE)
                Case "0" 'Listar Empresas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim r As New Nomade.NC.NCEmpresa("Bn")
                    dt = r.ListarEmpresa(IIf(CTLG_CODE = Nothing, "", CTLG_CODE), "A", IIf(USUA_ID = Nothing, "", HttpContext.Current.User.Identity.Name))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """,")
                            resb.Append("""RUC"" :" & """" & row("RUC").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "00" 'Listar Empresas basico
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim r As New Nomade.NC.NCEmpresa("Bn")
                    dt = r.ListarEmpresaDatosBasicos(IIf(CTLG_CODE = Nothing, "", CTLG_CODE), "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """,")
                            resb.Append("""RUC"" :" & """" & row("RUC").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "1" 'Listar Almacenes
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim almc As New Nomade.NA.NAConfAlmacenes("Bn")
                    dt = almc.ListarAlmacenes("", CTLG_CODE, IIf(SCSL_CODE = Nothing, "0", SCSL_CODE), "A", IIf(TIPO = Nothing, "0", TIPO), IIf(COD_ALMC = Nothing, "", COD_ALMC))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""UBIGEO"" :" & """" & row("UBIGEO").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    Else
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :"""",")
                        resb.Append("""DESCRIPCION"" :""""")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LALM" 'Listar Almacenes
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim almc As New Nomade.NA.NAConfAlmacenes("Bn")
                    dt = almc.ListarAlmacenesUsuario(USUA_ID, CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""UBIGEO"" :" & """" & row("UBIGEO").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """,")
                            resb.Append("""URBANIZACION"" :" & """" & row("URBANIZACION").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & row("SCSL_CODE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LALMSUC" 'Listar Almacenes por sucursal
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim almc As New Nomade.NA.NAConfAlmacenes("Bn")
                    dt = almc.ListarAlmacenesSucursal(USUA_ID, CTLG_CODE, SCSL_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""UBIGEO"" :" & """" & row("UBIGEO").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """,")
                            resb.Append("""URBANIZACION"" :" & """" & row("URBANIZACION").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & row("SCSL_CODE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "CLACLIE" 'Listar Clase de clientes
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim clie As New Nomade.NC.NCTipoClienteProveedor("Bn")
                    dt = clie.ListarClaseCliente(CTLG_CODE, "A", "C")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""EMPRESA"" :" & """" & row("EMPRESA").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & row("ESTADO").ToString & """,")
                            resb.Append("""NUEVO"":""NO""")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "2" 'Listar Operaciones
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim t As New Nomade.NC.NCTipoMovimiento("Bn")
                    dt = t.dame_tipo_movimiento(String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""TIPO_MOV"" :" & """" & row("TIPO_MOV").ToString & """,")
                            resb.Append("""TIPO_PERSONA"" :" & """" & row("TIPO_PERSONA").ToString & """,")
                            resb.Append("""DOCS_ORIGEN"" :" & """" & row("DOCS_ORIGEN").ToString & """,")
                            resb.Append("""DOCS_REGISTRO"" :" & """" & row("DOCS_REGISTRO").ToString & """,")
                            resb.Append("""NIVEL_APROBACION"" :" & """" & row("NIVEL_APROBACION").ToString & """,")
                            resb.Append("""MOV_CONT"" :" & """" & row("MOV_CONT").ToString & """,")
                            resb.Append("""COSTOS_REQUERIDOS"" :" & """" & row("COSTOS_REQUERIDOS").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3" 'Listar Empleados
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCEEmpleado("Bn").Listar_Empleados(0, 0, "A", CTLG_CODE, SCSL_CODE, String.Empty, String.Empty, "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NOMBRE_EMPLEADO"" :" & """" & row("NOMBRE_EMPLEADO").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """,")
                            resb.Append("""DNI"" :" & """" & row("DNI").ToString & """,")
                            resb.Append("""RUC"" :" & """" & row("RUC").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & row("USUA_ID").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4" 'Listar Proveedor
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim prov As New Nomade.NC.NCEProveedor("Bn")
                    dt = prov.ListarProveedor("0", "A", If(CTLG_CODE = Nothing, "", CTLG_CODE), If(NICA_CODE = Nothing, "", NICA_CODE), "N", String.Empty)
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
                            resb.Append("""CODIGO_TIPO_DOCUMENTO"" :" & """" & row("CODIGO_TIPO_DOCUMENTO").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "PO" 'Listar Proveedor
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim prov As New Nomade.NC.NCEProveedor("Bn")
                    dt = prov.ListarTransportistaOtros()
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
                            resb.Append("""CODIGO_TIPO_DOCUMENTO"" :" & """" & row("CODIGO_TIPO_DOCUMENTO").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "5" 'Listar Clientes
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim clie As New Nomade.NC.NCECliente("Bn")
                    dt = clie.ListarCliente(If(PIDM = Nothing, "0", PIDM), "A", IIf(CTLG_CODE = Nothing, "", CTLG_CODE), "S")
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)

                    Else
                        res = "[]"

                    End If
                    'res = resb.ToString()
                Case "LPER" 'Listar Personas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim per As New Nomade.NC.NCPersona("BN")
                    dt = per.listar_Persona("N")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For i As Integer = 0 To (dt.Rows.Count - 1)
                            resb.Append("{")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & dt.Rows(i)("NOMBRE").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & dt.Rows(i)("PIDM").ToString & """,")
                            resb.Append("""CODIGO_TIPO_DOC"" :" & """" & dt.Rows(i)("CODIGO_TIPO_DOCUMENTO").ToString & """,")
                            resb.Append("""NRO_DOC"" :" & """" & dt.Rows(i)("NRO_DOCUMENTO").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & dt.Rows(i)("DIRECCION").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LDIR" 'LISTAR DIRECCIONES DE PERSONAS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCPersona("BN").listar_direcciones(PIDM, "0", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For i As Integer = 0 To (dt.Rows.Count - 1)
                            resb.Append("{")
                            resb.Append("""DIRECCION"" :" & """" & dt.Rows(i)("Direccion").ToString & """,")
                            resb.Append("""URBANIZACION"" :" & """" & dt.Rows(i)("URBANIZACION").ToString & """,")
                            resb.Append("""UBIGEO"" :" & """" & dt.Rows(i)("UBIGEO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LDOC" 'LISTAR TIPO DOCUMENTO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCPersona("BN").listar_tipo_documento(PIDM)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For i As Integer = 0 To (dt.Rows.Count - 1)
                            resb.Append("{")
                            resb.Append("""CODIGO_DOCUMENTO"" :" & """" & dt.Rows(i)("CODIGO_DOCUMENTO").ToString & """,")
                            resb.Append("""NUM_DOC"" :" & """" & dt.Rows(i)("NUM_DOC").ToString & """,")
                            resb.Append("""DESC_DOCUMENTO"" :" & """" & dt.Rows(i)("DESC_DOCUMENTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "GETUBI" 'UBIGEO POR DIRECCION
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCPersona("BN").listar_ubigeo_direcciones(COD_DIREC)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For i As Integer = 0 To (dt.Rows.Count - 1)
                            resb.Append("{")
                            resb.Append("""UBIG_DEPARTAMENTO"" :" & """" & dt.Rows(i)("UBIG_DEPARTAMENTO").ToString & """,")
                            resb.Append("""UBIG_PROVINCIA"" :" & """" & dt.Rows(i)("UBIG_PROVINCIA").ToString & """,")
                            resb.Append("""UBIG_DISTRITO"" :" & """" & dt.Rows(i)("UBIG_DISTRITO").ToString & """,")
                            resb.Append("""CODE_PAIS"" :" & """" & dt.Rows(i)("CODE_PAIS").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTAR_VEHICULOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NF.NFUnidadVehiculo("BN").ListarUnidad("", CTLG_CODE, "A", "0", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NOMBRE"" :" & """" & row("nombre_marca").ToString & " " & row("ANIO_FAB").ToString & " " & row("COLOR").ToString & " " & row("PLACA").ToString & """,")
                            resb.Append("""NRO_REGISTRO"" :" & """" & row("NRO_TARJETA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "6" 'Listar choferes
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCEChofer("Bn").ListarChofer("0", If(CTLG_CODE = Nothing, "", CTLG_CODE), "A", "E")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""LICENCIA"" :" & """" & row("LICENCIA").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & row("NOMBRE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "7" 'Listar Tipos de Documento por Empresa
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dcto As New Nomade.NC.NCTipoDCEmpresa("Bn")
                    dt = dcto.ListarTipoDCEmpresa(String.Empty, CTLG_CODE, String.Empty, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("DCTO_CODE").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & row("SUNAT_CODE").ToString & """,")
                            resb.Append("""DESCRIPCION_CORTA"" :" & """" & row("DCTO_DESC_CORTA").ToString & """,")
                            resb.Append("""TIPO_DOC"" :" & """" & row("TIPO_DOC").ToString & """,")
                            resb.Append("""FECHA_ELEC"" :" & """" & Utilities.fechaLocal(row("FECHA_ELEC").ToString) & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "CORR" 'Cargar correlativo
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim CORRELATIVO As String = context.Request("CORR")
                    dt = New Nomade.NC.NCAutorizacionDocumento("BN").ListarAutorizacion(String.Empty, "A", CTLG_CODE, IIf(SCSL_CODE = Nothing, "", SCSL_CODE), TIP_DCTO, IIf(CORRELATIVO = Nothing, "", CORRELATIVO), IIf(COD_ALMC = Nothing, "", COD_ALMC))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        Dim formato As String = ""
                        For Each row As DataRow In dt.Rows
                            Dim valor_fin As Long = Long.Parse(IIf(row("VALOR_FIN").ToString = Nothing, "0", row("VALOR_FIN").ToString))
                            Dim valor_actual As Long = Long.Parse(row("VALOR_ACTUAL").ToString)
                            If (valor_actual <= valor_fin Or valor_fin = 0) And formato <> row("FORMATO").ToString Then
                                resb.Append("{")
                                resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                resb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                                resb.Append("""FORMATO"":""" & row("FORMATO").ToString & """,")
                                resb.Append("""NRO_LINEAS"":""" & row("NRO_LINEAS").ToString & """,")
                                resb.Append("""VALOR_ACTUAL"":""" & row("VALOR_ACTUAL").ToString & """")
                                resb.Append("},")
                                formato = row("FORMATO").ToString
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LPSER" 'Listar series de un Producto
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NM.NMGestionProductos("Bn").LISTAR_SERIADOS(String.Empty, String.Empty, CODE_PROD, CTLG_CODE, COD_ALMC, "N", String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("VENDIDO").ToString = "NO" And row("ANULADO").ToString = "NO" Then
                                resb.Append("{")
                                resb.Append("""CODIGO_BARRAS"" :" & """" & row("CODIGO_BARRAS").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        resb = resb.Replace("[{}]", String.Empty)
                    End If
                    res = resb.ToString()
                Case "SERIES_SELECT"
                    context.Response.ContentType = "text/plain"
                    PROD_CODE = context.Request("PROD_CODE")
                    Dim SERIES As String() = context.Request("SERIES_SELECCIONADAS").Split(",")
                    dt = New Nomade.NM.NMGestionProductos("Bn").LISTAR_SERIADOS(String.Empty, String.Empty, PROD_CODE, CTLG_CODE, COD_ALMC, "N", String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("{")
                        For Each row As DataRow In dt.Rows
                            If Not SERIES.Contains(row("CODIGO_BARRAS").ToString) Then
                                resb.Append("""" & row("CODIGO_BARRAS").ToString & """ :" & """" & row("CODIGO_BARRAS").ToString & """,")
                            End If
                        Next
                        resb.Append("[]")
                        resb.Replace(",[]", "")
                        resb.Append("}")
                        resb.Replace("{[]}", "{}")
                    End If
                    res = resb.ToString()
                Case "COSTO"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NM.NMGestionProductos("Bn").LISTAR_KARDEX(CODE_PROD, COD_ALMC, MONEDA, CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        Dim n As Integer = dt.Rows.Count
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""PU_TOT"" :" & """" & dt.Rows(n - 1)("PU_TOT").ToString & """,")
                        resb.Append("""CA_TOT"" :" & """" & dt.Rows(n - 1)("CA_TOT").ToString & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "11"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NM.NMUnidadMedida("Bn").ListarUnidadMedida("", "A")
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
                Case "12" 'Listar Monedas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.GL.GLLetras("BN").ListarMoneda(CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""SIMBOLO"" :" & """" & row("SIMBOLO").ToString & """,")
                            resb.Append("""TIPO"" :" & """" & row("TIPO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTAR_PRODUCTOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    DCTO_ORGN = context.Request("DCTO_ORGN")
                    If DCTO_ORGN = "" Then
                        dt = New Nomade.NM.NMGestionProductos("BN").LISTAR_PRODUCTO_NAMINSA(CTLG_CODE, SCSL_CODE, "S", "A")
                    End If

                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
                Case "LISTAR_PRODUCTOS_NAM"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    DCTO_ORGN = context.Request("DCTO_ORGN")
                    If DCTO_ORGN = "" Then
                        dt = New Nomade.NM.NMGestionProductos("BN").LISTAR_PRODUCTO_NAMINSA_NAM(CTLG_CODE, SCSL_CODE, "S", "A", IIf(MONEDA = Nothing, "", MONEDA))
                    End If

                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If


                Case "LISTAR_PRODUCTO_CECO"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NM.NMGestionProductos("BN").LISTAR_PRODUCTO_CECO(CTLG_CODE, CODE_PROD, TIPO_MOV)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""centro_costo"" :" & """" & row("CENTRO_COSTO").ToString & """,")
                            resb.Append("""CECC"" :" & """" & row("CECC").ToString & """,")
                            resb.Append("""DES_CORTA"" :" & """" & row("DES_CORTA").ToString & """,")
                            resb.Append("""CECD"" :" & """" & row("CECD").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "ESTADO_NAMINSA"
                    context.Response.ContentType = "application/json; charset=utf-8"

                    dt = New Nomade.NA.NATipoMovimiento("BN").VERIFICAR_NAMINSA(ISAC_CODE)

                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "VERIFICAR_MOV_ALMACEN_DOC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oNATipoMovimiento As New Nomade.NA.NATipoMovimiento("BN")
                    Dim P_EXISTE As String = oNATipoMovimiento.VERIFICA_DOC_MOV_ALMACEN(P_CODE_DOC)
                    res = "[{""P_EXISTE"":""" & P_EXISTE & """}]"

                Case "13" 'LISTAR PRODUCTOS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NM.NMGestionProductos("BN").LISTAR_PRODUCTO("", "", "", "", "", CTLG_CODE, "S", "", "", SCSL_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & row("CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""UNIDAD"" :" & """" & row("UNIDAD").ToString & """,")
                            resb.Append("""NO_SERIADA"" :" & """" & row("NO_SERIADA").ToString & """,")
                            resb.Append("""DESC_ADM"" :" & """" & row("DESC_ADM").ToString & """,")
                            resb.Append("""SERVICIO"" :" & """" & row("SERVICIO").ToString & """,")
                            resb.Append("""DESC_EXISTENCIA"" :" & """" & row("DESC_EXISTENCIA").ToString & """,")
                            resb.Append("""MARCA"" :" & """" & row("MARCA").ToString & """,")
                            resb.Append("""MODELO"" :" & """" & row("MODELO").ToString & """,")
                            resb.Append("""DESC_UNIDAD_DESPACHO"" :" & """" & row("DESC_UNIDAD_DESPACHO").ToString & """,")
                            resb.Append("""DETRACCION"" :" & """" & row("DETRACCION").ToString & """,")
                            resb.Append("""MANUFACTURADA"" :" & """" & row("MANUFACTURADA").ToString & """,")
                            resb.Append("""STOCK_REAL"" :" & """" & row("STOCK_REAL").ToString & """,")
                            resb.Append("""CANT_TOTAL"" :" & """" & row("CANT_TOTAL").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "131"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    PROD_CODE = context.Request("PROD_CODE")
                    dt = New Nomade.NM.NMGestionProductos("Bn").LISTAR_PRODUCTO("", "", "", IIf(PROD_CODE = Nothing, "", PROD_CODE), "", CTLG_CODE, "S")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & row("CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""UNIDAD"" :" & """" & row("UNIDAD").ToString & """,")
                            resb.Append("""NO_SERIADA"" :" & """" & row("NO_SERIADA").ToString & """,")
                            resb.Append("""DESC_ADM"" :" & """" & row("DESC_ADM").ToString & """,")
                            resb.Append("""SERVICIO"" :" & """" & row("SERVICIO").ToString & """,")
                            resb.Append("""DESC_GRUPO"" :" & """" & row("DESC_GRUPO").ToString & """,")
                            resb.Append("""DESC_SUBGRUPO"" :" & """" & row("DESC_SUBGRUPO").ToString & """,")
                            resb.Append("""DESC_EXISTENCIA"" :" & """" & row("DESC_EXISTENCIA").ToString & """,")
                            resb.Append("""MARCA"" :" & """" & row("MARCA").ToString & """,")
                            resb.Append("""MODELO"" :" & """" & row("MODELO").ToString & """,")
                            resb.Append("""STOCK"" :" & """" & row("STOCK").ToString & """,")
                            resb.Append("""DESC_UNIDAD_DESPACHO"" :" & """" & row("DESC_UNIDAD_DESPACHO").ToString & """,")
                            resb.Append("""RUTA_IMAGEN"" :" & """" & row("RUTA_IMAGEN").ToString & """,")
                            resb.Append("""MANUFACTURADA"" :" & """" & row("MANUFACTURADA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "14"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NA.NATipoMovimiento("Bn").lista_detalle_dcto_almacen(ISAC_CODE, "")
                    resb.Append("[")
                    If Not (dt Is Nothing) Then
                        Dim nro As Integer = 1
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NRO"" :" & """" & nro.ToString & """,")
                            resb.Append("""ITEM"" :" & """" & row("ITEM").ToString & """,")
                            resb.Append("""PROD_CODE"" :" & """" & row("PROD_CODE").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & row("PRODUCTO").ToString & """,")
                            resb.Append("""DESC_PRODUCTO"" :" & """" & row("DESC_PRODUCTO").ToString & """,")
                            resb.Append("""NRO_SERIE"" :" & """" & row("NRO_SERIE").ToString & """,")
                            resb.Append("""CENTRO_COSTO"" :" & """" & row("CENTRO_COSTO").ToString & """,")
                            resb.Append("""GARANTIA"" :" & """" & row("GARANTIA").ToString & """,")
                            resb.Append("""CANTIDAD_BASE"" :" & """" & Math.Round(Double.Parse(row("CANTIDAD_BASE").ToString), 2) & """,")
                            resb.Append("""DESC_UNME_BASE"" :" & """" & row("DESC_UNME_BASE").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & row("MONTO").ToString & """,")
                            resb.Append("""TOTAL"" :" & """" & row("TOTAL").ToString & """,")
                            resb.Append("""MONTO_ALTERNO"" :" & """" & row("MONTO_ALTERNO").ToString & """,")
                            resb.Append("""TOTAL_ALTERNO"" :" & """" & row("TOTAL_ALTERNO").ToString & """,")
                            resb.Append("""INC_IGV"" :" & """" & row("INC_IGV").ToString & """,")
                            resb.Append("""DCTO_ORGN_CODE"" :" & """" & row("DCTO_ORGN_CODE").ToString & """,")
                            resb.Append("""TIPO_PRODUCTO"" :" & """" & row("TIPO_PRODUCTO").ToString & """,")
                            resb.Append("""SERIADO_IND"" :" & """" & row("SERIADO_IND").ToString & """,")
                            resb.Append("""PESO_UNIT"" :" & """" & row("PESO_UNIT").ToString & """,")
                            resb.Append("""PESO_TOTAL"" :" & """" & row("PESO_TOTAL").ToString & """,")
                            resb.Append("""MONTO_COSTO_TRANSPORTE"" :" & """" & row("MONTO_COSTO_TRANSPORTE").ToString & """")
                            resb.Append("},")
                            nro = nro + 1
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                    End If
                    resb.Append("]")
                    res = resb.ToString()
                Case "17" 'LISTA CENTRO COSTOS 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCCentroCostos("Bn").Listar_CentroCostos_Detalle("", "", "", "3", "A", CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & row("CODE").ToString & """,")
                            resb.Append("""DESCC"" :" & """" & row("DESCC").ToString & """,")
                            resb.Append("""DEPEND_CODE"" :" & """" & row("DEPEND_CODE").ToString & """,")
                            resb.Append("""CECC_CODE"" :" & """" & row("CECC_CODE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "COSTOS_SELECT"
                    context.Response.ContentType = "text/plain"
                    dt = New Nomade.NC.NCCentroCostos("Bn").Listar_CentroCostos_Detalle("", "", "", "4", "A", CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("{")
                        For Each row As DataRow In dt.Rows
                            resb.Append("""" & row("CODE").ToString & """ :" & """" & row("DESCC").ToString & """,")
                        Next
                        resb.Append("[]")
                        resb.Replace(",[]", "")
                        resb.Append("}")
                    End If
                    res = resb.ToString()
                Case "24" 'ACTUALIZA CANTIDAD DETALLE I/S ALMACEN
                    context.Response.ContentType = "text/plain"
                    Dim TIPO_CAMBIO As String = context.Request("columnName")
                    Select Case TIPO_CAMBIO
                        Case "SERIE"
                            res = New Nomade.NA.NATipoMovimiento("BN").actualizar_detalle_dcto_almacen_SERIE(ISAC_CODE, id, value.ToUpper, If(VALIDAR_EXISTENTE = Nothing, "N", VALIDAR_EXISTENTE))
                            If res = "EXISTE" Then
                                res = "La serie ingresada ya existe"
                            ElseIf res = "YA_AGREGADO" Then
                                res = "La serie ingresada ya se encuentra en la lista"
                            Else
                                res = value
                            End If
                        Case "CENTRO COSTOS"
                            res = New Nomade.NA.NATipoMovimiento("BN").actualizar_detalle_dcto_almacen_CENTRO_COSTOS(ISAC_CODE, id, value)
                            res = value
                        Case "GARNT"
                            res = New Nomade.NA.NATipoMovimiento("BN").actualizar_detalle_dcto_almacen_GARANTIA(ISAC_CODE, id, value)
                            res = value
                        Case "CANT"
                            msg = New Nomade.NA.NATipoMovimiento("BN").actualizar_detalle_dcto_almacen_CANTIDAD(ISAC_CODE, id, value)
                            res = value.ToString
                        Case "C.U. S/."
                            res = New Nomade.NA.NATipoMovimiento("BN").actualizar_detalle_dcto_almacen_MONTO_MN(ISAC_CODE, id, value)
                            res = value.ToString
                        Case "C.U. US$"
                            res = New Nomade.NA.NATipoMovimiento("BN").actualizar_detalle_dcto_almacen_MONTO_ME(ISAC_CODE, id, value)
                            res = value.ToString
                    End Select
                Case "DELETE" 'ELIMINA UN ITEM DEL DETALLE  I/S ALMACEN
                    Dim OK As String
                    context.Response.ContentType = "text/html"
                    msg = New Nomade.NA.NATipoMovimiento("Bn").ELIMINAR_DETALLE_DCTO_ALMACEN(ISAC_CODE, item, doc_origen)
                    OK = New Nomade.NA.NATipoMovimiento("BN").actualizar_doc_origen_NAMINSA(ISAC_CODE)
                    res = msg.ToString()
                Case "COMPLETAR" 'COMPLETA I/S DE ALMACEN
                    context.Response.ContentType = "text/html"
                    msg = New Nomade.NA.NATipoMovimiento("BN").VERIFICAR_SERIES(ISAC_CODE) 'DPORTA- VERIFICA SOLO EL INGRESO TRANSF. DE ENTRADA DE PROD. SERIADOS PARA EVITAR DUPLICIDAD EN LAS SERIES 
                    If msg = "OK" Then
                        msg = New Nomade.NA.NATipoMovimiento("Bn").COMPLETAR_DCTO_ALMACEN(ISAC_CODE)
                    End If
                    res = msg.ToString()
                Case "COMPLETAR_VALI" 'COMPLETA I/S DE ALMACEN
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim caTipoMov As New Nomade.NA.NATipoMovimiento("Bn")
                    Dim array As Array
                    msg = caTipoMov.VERIFICAR_SERIES(ISAC_CODE) 'DPORTA- VERIFICA SOLO EL INGRESO TRANSF. DE ENTRADA DE PROD. SERIADOS PARA EVITAR DUPLICIDAD EN LAS SERIES 
                    If msg = "OK" Then
                        array = caTipoMov.COMPLETAR_DCTO_ALMACEN_VALI(ISAC_CODE)
                        If Not (array Is Nothing) Then
                            resb.Append("[{")
                            resb.Append("""p_RPTA"" :" & """" & array(0).ToString & """")
                            'resb.Append("""DATOS_QR"" :" & """" & array(1).ToString & """")
                            resb.Append("}]")
                        End If
                        res = resb.ToString()
                    Else
                        resb.Append("[{")
                        resb.Append("""p_RPTA"" :" & """" & msg.ToString() & """,")
                        resb.Append("""ERROR_SERIES"" :" & """" & "ERROR_SERIES" & """")
                        resb.Append("}]")
                        res = resb.ToString()
                    End If
                Case "GQR_GRE" 'Parametros para guardar el QR GUIA REMISIÓN ELECTRÓNICA
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim caTipoMov As New Nomade.NA.NATipoMovimiento("Bn")
                    res = caTipoMov.GuardarCodigoQR_GRE(ISAC_CODE, p_IMGQR)
                Case "G"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    PIDM_SOLICITANTE = context.Request("PIDM_SOLICITANTE")
                    FEC_TRANS = context.Request("FEC_TRANS")
                    FEC_EMISION = context.Request("FEC_EMISION")
                    PIDM_ENTREGAR_A = context.Request("PIDM_ENTREGAR_A")
                    CMMNT_DCTO = context.Request("CMMNT_DCTO")
                    TIPO_DOC_RAZON_DEST = context.Request("TIPO_DOC_RAZON_DEST")
                    RAZON_DEST = context.Request("RAZON_DEST")
                    RAZON_TRANS = context.Request("RAZON_TRANS")
                    LIC_CONDUCIR = context.Request("LIC_CONDUCIR")
                    CHOFER = context.Request("CHOFER")
                    CERTIFICADO = context.Request("CERTIFICADO")
                    PLACA = context.Request("PLACA")
                    SERIE_DCTO = context.Request("SERIE_DCTO")
                    DCTO_ORGN = context.Request("DCTO_ORGN")
                    DCTO_REG = context.Request("DCTO_REG")
                    DCTO_ORGN_SERIE = context.Request("DCTO_ORGN_SERIE")
                    TIPO_OPE = context.Request("TIPO_OPE")
                    DIRE = context.Request("DIRE")
                    TIP_DCTO_ORG = context.Request("TIP_DCTO_ORG")
                    ALMC_DEST = context.Request("ALMC_DEST")
                    p_NUM_SEQ_DOC = context.Request("p_NUM_SEQ_DOC")
                    ELECTRONICO = context.Request("ELECTRONICO")
                    TIPO_TRANS = context.Request("TIPO_TRANS")

                    DESC_VEHICULO = context.Request("DESC_VEHICULO")
                    MARCA_FACT = context.Request("MARCA_FACT")
                    PLACA_FACT = context.Request("PLACA_FACT")

                    TIPO_DOC_TRANS = context.Request("TIPO_DOC_TRANS")


                    UBIGEO_ORIGEN = context.Request("UBIGEO_ORIGEN")
                    UBIGEO_DESTINO = context.Request("UBIGEO_DESTINO")
                    DIREC_ORIGEN = context.Request("DIREC_ORIGEN")
                    DIREC_DESTINO = context.Request("DIREC_DESTINO")
                    URBANIZACION_ORIGEN = context.Request("URBANIZACION_ORIGEN")
                    URBANIZACION_DESTINO = context.Request("URBANIZACION_DESTINO")
                    PIDM_TRANSP = context.Request("PIDM_TRANSP")


                    'PARAMETROS CORRELATIVO
                    DOCS_CODE = context.Request("DOCS_CODE")
                    COD_AUT = context.Request("COD_AUT")

                    'PARAMETROS CORRELATIVO INTERNO
                    TIPO_DOC_INTERNO = context.Request("TIPO_DCTO_INTERNO")
                    COD_AUT_INTERNO = context.Request("COD_AUT_INTERNO")

                    TIPO_ENVIO = context.Request("TIPO_ENVIO")
                    DIRECCION_TRANSPORTISTA = context.Request("DIRECCION_TRANSPORTISTA")

                    COSTO_TRANSPORTE = context.Request("COSTO_TRANSPORTE")

                    Dim arr, arr2 As Array
                    Dim lstaux, lstfinal As New List(Of String)
                    Dim indide_repetido As Integer = -1
                    arr = DCTO_REG.Split(",")
                    arr2 = SERIE_DCTO.Split(",")

                    For i = 0 To arr2.Length - 1
                        lstfinal.Add(arr2.GetValue(i).ToString + "-" + arr.GetValue(i).ToString)
                    Next

                    For i = 0 To lstfinal.Count - 1
                        If lstaux.Contains(lstfinal.ElementAt(i)) Then
                            indide_repetido = i
                            i = lstfinal.Count
                        Else
                            lstaux.Add(lstfinal.ElementAt(i))
                        End If
                    Next

                    If indide_repetido > 0 Then
                        msg = "ERROR"
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""SUCCESS"" :" & """" & msg.ToString & """,")
                        resb.Append("""NUMERO"" :" & """" & lstfinal.ElementAt(indide_repetido).ToString & """")
                        resb.Append("}")
                        resb.Append("]")
                    Else
                        Dim array As String()
                        cod = GrabarDctoAlmc(CTLG_CODE, COD_ALMC, Utilities.fechaLocal(FEC_EMISION), Utilities.fechaLocal(FEC_TRANS), DCTO_REG,
                                             PIDM_SOLICITANTE,
                                             IIf(TIPO_MOV = "TS" And TIP_DCTO = "0050", DCTO_ORGN, IIf(TIPO_MOV Like "*S", "", DCTO_ORGN)),
                                             IIf(TIPO_MOV = "TS" And TIP_DCTO = "0050", DCTO_ORGN_SERIE, IIf(TIPO_MOV Like "*S", "", DCTO_ORGN_SERIE)),
                                             DOCS_CODE, TIPO_MOV, PIDM_ENTREGAR_A, TIPO_OPE, CMMNT_DCTO, USUA_ID,
                                             TIPO_DOC_RAZON_DEST, RAZON_DEST, RAZON_TRANS, LIC_CONDUCIR, CHOFER, DIRE.ToUpper, CERTIFICADO, PLACA, TIP_DCTO, SERIE_DCTO, TIP_DCTO_ORG,
                                             ALMC_DEST, "0.00", MONEDA, p_NUM_SEQ_DOC, ELECTRONICO, TIPO_TRANS, COD_AUT, DOCS_CODE, TIPO_DOC_INTERNO, COD_AUT_INTERNO,
                                             TIPO_ENVIO, DIRECCION_TRANSPORTISTA, DESC_VEHICULO, MARCA_FACT, PLACA_FACT, UBIGEO_ORIGEN, UBIGEO_DESTINO, DIREC_ORIGEN, DIREC_DESTINO,
                                             URBANIZACION_ORIGEN, URBANIZACION_DESTINO, PIDM_TRANSP, TIPO_DOC_TRANS, COSTO_TRANSPORTE)





                        If (cod <> "") Then
                            array = cod.Split(",")
                            If (array(0) <> "LIMITE" And array(0) <> "LIMITE INTERNO") Then

                                Dim Mov As New Nomade.NA.NATipoMovimiento("Bn")
                                msg = Mov.actualizarSalidaAlmacen(array(0), NRO_VUELTAS)

                            Else
                                msg = "ERROR"
                            End If

                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & array(0) & """,")
                            resb.Append("""SUCCESS"" :" & """" & msg & """,")
                            resb.Append("""CORR_REG"" :" & """" & array(1) & """,")
                            resb.Append("""CORR_REG_INT"" :" & """" & array(2) & """")
                            resb.Append("}")
                            resb.Append("]")
                        End If
                    End If
                    res = resb.ToString()

                Case "GD"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    CODE_PROD_ANTIGUO = context.Request("CODE_PROD_ANTIGUO")
                    CODE_UME = context.Request("CODE_UME")
                    Dim TOTAL As String = context.Request("MONTO")
                    CANT = context.Request("CANT")
                    MONTO = Double.Parse(TOTAL) / Double.Parse(CANT)
                    GARANTIA = context.Request("GARANTIA")
                    IGV_IND = context.Request("IGV_IND")
                    DCTO_REQ = context.Request("DCTO_REQ")
                    DESD_COMPRA_IND = context.Request("DESD_COMPRA_IND")
                    TIPO_INSERT = context.Request("TIPO_INSERT")
                    VAL_INI = context.Request("VAL_INI")
                    VAL_FIN = context.Request("VAL_FIN")
                    SERIE_PROD = context.Request("SERIE_PROD")

                    MONEDA = context.Request("MONEDA")
                    MONTO_MAS_COSTO_TRANSPORTE = context.Request("MONTO_MAS_COSTO_TRANSPORTE")

                    PESO_UNIT = context.Request("PESO_UNIT")
                    PESO_TOTAL = context.Request("PESO_TOTAL")
                    'CODE_CENTRO_COSTO = context.Request("CODE_CENTRO_COSTO")
                    'CODE_CECC = context.Request("CODE_CECC")
                    APLIC_VALORES = context.Request("APLIC_VALORES")
                    p_CECC = context.Request("p_CECC")
                    p_CECD = context.Request("p_CECD")



                    Dim DETRACCION As String = context.Request("DETRACCION")
                    'msg = New Nomade.NA.NATipoMovimiento("Bn").insertar_detalle_dcto_almacen(ISAC_CODE, Nothing, CODE_PROD, CODE_PROD_ANTIGUO, CODE_UME, CANT,
                    '                CODE_UME, CANT, TOTAL, GARANTIA, DCTO_REQ, "1", "0", USUA_ID, SERIE_PROD, MONTO, IGV_IND, DESD_COMPRA_IND,
                    '                TIPO_INSERT, VAL_INI, VAL_FIN, p_CECD, p_CECC, APLIC_VALORES, "", MONEDA, DETRACCION, MONTO_MAS_COSTO_TRANSPORTE)

                    msg = New Nomade.NA.NATipoMovimiento("Bn").insertar_detalle_dcto_almacen(ISAC_CODE, Nothing, CODE_PROD, CODE_PROD_ANTIGUO, CODE_UME, CANT,
                                CODE_UME, CANT, TOTAL, GARANTIA, PESO_UNIT, PESO_TOTAL, "1", "0", USUA_ID, SERIE_PROD, MONTO, IGV_IND, DESD_COMPRA_IND,
                                TIPO_INSERT, VAL_INI, VAL_FIN, p_CECD, p_CECC, APLIC_VALORES, "", MONEDA, DETRACCION, MONTO_MAS_COSTO_TRANSPORTE)

                    'msg = New Nomade.NA.NATipoMovimiento("Bn").insertar_detalle_dcto_almacen2(ISAC_CODE, Nothing, CODE_PROD, CODE_PROD_ANTIGUO, CODE_UME, CANT,
                    '                 CODE_UME, CANT, TOTAL, GARANTIA, DCTO_REQ, "1", "0", USUA_ID, SERIE_PROD, MONTO, IGV_IND, DESD_COMPRA_IND,
                    '                 TIPO_INSERT, VAL_INI, VAL_FIN, p_CECD, p_CECC, APLIC_VALORES, "", MONTO_MAS_COSTO_TRANSPORTE, MONEDA, DETRACCION)

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""MENSAJE"" :" & """" & msg.ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "AD"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim DOCS_CODE As String = ""
                    DOCS_CODE = context.Request("DOCS_CODE")

                    PIDM_SOLICITANTE = context.Request("PIDM_SOLICITANTE")
                    FEC_TRANS = context.Request("FEC_TRANS")
                    FEC_EMISION = context.Request("FEC_EMISION")
                    PIDM_ENTREGAR_A = context.Request("PIDM_ENTREGAR_A")
                    CMMNT_DCTO = context.Request("CMMNT_DCTO")
                    TIPO_DOC_RAZON_DEST = context.Request("TIPO_DOC_RAZON_DEST")
                    RAZON_DEST = context.Request("RAZON_DEST")
                    RAZON_TRANS = context.Request("RAZON_TRANS")
                    LIC_CONDUCIR = context.Request("LIC_CONDUCIR")
                    CHOFER = context.Request("CHOFER")
                    CERTIFICADO = context.Request("CERTIFICADO")
                    PLACA = context.Request("PLACA")
                    SERIE_DCTO = context.Request("SERIE_DCTO")
                    DCTO_ORGN = context.Request("DCTO_ORGN")
                    DCTO_REG = context.Request("DCTO_REG")
                    DCTO_ORGN_SERIE = context.Request("DCTO_ORGN_SERIE")
                    TIPO_OPE = context.Request("TIPO_OPE")
                    DIRE = context.Request("DIRE")
                    TIP_DCTO_ORG = context.Request("TIP_DCTO_ORG")
                    ALMC_DEST = context.Request("ALMC_DEST")
                    p_NUM_SEQ_DOC = context.Request("p_NUM_SEQ_DOC")
                    ELECTRONICO = context.Request("ELECTRONICO")
                    TIPO_TRANS = context.Request("TIPO_TRANS")

                    TIPO_ENVIO = context.Request("TIPO_ENVIO")
                    DIRECCION_TRANSPORTISTA = context.Request("DIRECCION_TRANSPORTISTA")

                    DESC_VEHICULO = context.Request("DESC_VEHICULO")
                    MARCA_FACT = context.Request("MARCA_FACT")
                    PLACA_FACT = context.Request("PLACA_FACT")
                    PIDM_TRANSP = context.Request("PIDM_TRANSP")
                    TIPO_DOC_TRANS = context.Request("TIPO_DOC_TRANS")
                    COSTO_TRANSPORTE = context.Request("COSTO_TRANSPORTE")
                    UBIGEO_DESTINO = context.Request("UBIGEO_DESTINO")
                    DIREC_DESTINO = context.Request("DIREC_DESTINO")

                    Dim arr, arr2 As Array
                    Dim lstaux, lstfinal As New List(Of String)
                    Dim indide_repetido As Integer = -1
                    arr = DCTO_REG.Split(",")
                    arr2 = SERIE_DCTO.Split(",")

                    For i = 0 To arr2.Length - 1
                        lstfinal.Add(arr2.GetValue(i).ToString + "-" + arr.GetValue(i).ToString)
                    Next

                    For i = 0 To lstfinal.Count - 1
                        If lstaux.Contains(lstfinal.ElementAt(i)) Then
                            indide_repetido = i
                            i = lstfinal.Count
                        Else
                            lstaux.Add(lstfinal.ElementAt(i))
                        End If
                    Next

                    If indide_repetido > 0 Then
                        msg = "ERROR"
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""SUCCESS"" :" & """" & msg.ToString & """,")
                        resb.Append("""NUMERO"" :" & """" & lstfinal.ElementAt(indide_repetido).ToString & """")
                        resb.Append("}")
                        resb.Append("]")
                    Else
                        cod = ActualizarDctoAlmc(ISAC_CODE, CTLG_CODE, COD_ALMC, Utilities.fechaLocal(FEC_EMISION), Utilities.fechaLocal(FEC_TRANS), DCTO_REG, PIDM_SOLICITANTE,
                                                DCTO_ORGN, DCTO_ORGN_SERIE, DOCS_CODE, TIPO_MOV, PIDM_ENTREGAR_A, TIPO_OPE, CMMNT_DCTO,
                                                USUA_ID, TIPO_DOC_RAZON_DEST, RAZON_DEST, RAZON_TRANS, LIC_CONDUCIR, CHOFER, DIRE.ToUpper, CERTIFICADO, PLACA, TIP_DCTO, SERIE_DCTO, TIP_DCTO_ORG,
                                                ALMC_DEST, "0.00", "0.00", "", p_NUM_SEQ_DOC, ELECTRONICO, TIPO_TRANS, TIPO_ENVIO, DIRECCION_TRANSPORTISTA, DESC_VEHICULO, MARCA_FACT, PLACA_FACT,
                                                PIDM_TRANSP, TIPO_DOC_TRANS, COSTO_TRANSPORTE, UBIGEO_DESTINO, DIREC_DESTINO)
                        If (cod <> "") Then
                            Dim Mov As New Nomade.NA.NATipoMovimiento("Bn")
                            msg = Mov.actualizarSalidaAlmacen(ISAC_CODE, NRO_VUELTAS)
                        End If
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & cod.ToString & """,")
                        resb.Append("""SUCCESS"" :" & """" & msg.ToString & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If

                    res = resb.ToString()
                Case "LMAILS"
                    context.Request.ContentType = "application/json; charset=utf-8"
                    Dim mail As New Nomade.Mail.NomadeMail("BN")
                    dt = mail.ListarCorreos(0, 0, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("Correo").ToString <> "" Then
                                resb.Append("{")
                                resb.Append("""email"" :" & """" & row("Correo").ToString().ToLower & """,")
                                resb.Append("""name"" :" & """" & row("Nombres").ToString & """,")
                                resb.Append("""codigo"" :" & """" & row("Codigo").ToString & """,")
                                resb.Append("""usuario"" :" & """" & row("USUARIO").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", "")
                        resb.Append("]")
                        resb.Replace("[{}]", "[]")
                    End If
                    res = resb.ToString()
                Case "LTELEFONOS"
                    context.Request.ContentType = "application/json; charset=utf-8"
                    Dim tel As New Nomade.Mail.NomadeMail("BN")
                    dt = tel.ListarTelefonos(0, 0, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("Numero").ToString <> "" Then
                                resb.Append("{")
                                resb.Append("""telefono"" :" & """" & row("Numero").ToString & """,")
                                resb.Append("""name"" :" & """" & row("Nombres").ToString & """,")
                                resb.Append("""codigo"" :" & """" & row("Codigo").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", "")
                        resb.Append("]")
                        resb.Replace("[{}]", "[]")
                    End If
                    res = resb.ToString()
                Case "DETALLES_ORIGEN_LISTA" ' Devuelve todos los detalles de los documentos de origen para visualizacion
                    context.Request.ContentType = "text/plain"
                    res = GenerarTablaDetallesOrigen()

                Case "DETALLES_ORIGEN"
                    context.Request.ContentType = "text/plain"

                    Dim dtmov As New DataTable
                    Dim dtDetVent As New DataTable

                    Dim PROD_SIN_STOCK As String = ""
                    Dim VALIDAR_STOCK As Boolean = False

                    DCTO_ORGN = context.Request("DCTO_ORGN")
                    Dim DCTOS = DCTO_ORGN.Split(",")

                    Dim DCTO_SERIE As String = context.Request("DCTO_SERIE")
                    Dim SERIES = DCTO_SERIE.Split(",")
                    Dim TIPO_OPE = context.Request("TIPO_OPE")
                    Dim DCTO_NUM As String = context.Request("DCTO_NUM")
                    Dim NUMS = DCTO_NUM.Split(",")

                    Dim OK As String = ""

                    Dim glLetras As New Nomade.GL.GLLetras("Bn")
                    Dim dtMonedas As New DataTable
                    dtMonedas = glLetras.ListarMoneda("")
                    Dim codeMoba As String = ""
                    Dim codeMoal As String = ""
                    For Each row In dtMonedas.Rows
                        If row("TIPO") = "MOBA" Then
                            codeMoba = row("CODIGO")
                        Else
                            codeMoal = row("CODIGO")
                        End If
                    Next

                    Dim bool_despachado = True
                    Dim ALMACEN_CAB = True 'DPORTA 13/03/2021

                    If TIPO_MOV = "I" Then
                        Select Case TIPO_DCTO
                            Case "0001", "0003", "0012", "0000" ' FACTURA BOLETA TICKET INVOICE
                                For i As Integer = 0 To (DCTOS.Length - 1)
                                    dtmov = New Nomade.NC.NCTipoMovimiento("BN").dame_tipo_movimiento(TIPO_OPE, String.Empty)
                                    If Not (dtmov Is Nothing) Then
                                        If dtmov(0)("MOV_CONT").ToString = "SN" Then
                                            'LISTA VENTA DETALLE
                                            dtDetVent = New Nomade.NV.NVVenta("BN").ListarDetalleDocumentoVenta(DCTOS(i).ToString, "0", String.Empty)

                                            If Not (dtDetVent Is Nothing) Then

                                                Dim cantidad As Double = 0
                                                Dim peso_unit As Double = 0
                                                Dim peso_total As Double = 0

                                                For Each row As DataRow In dtDetVent.Rows
                                                    Dim moneda As String = ""
                                                    If row("MONEDA_CODE") = codeMoba Then
                                                        moneda = codeMoba
                                                    Else
                                                        moneda = codeMoal
                                                    End If

                                                    If row("DESPACHADO_IND").ToString = "N" Then
                                                        bool_despachado = False
                                                        Exit For
                                                    End If

                                                    cantidad = Double.Parse(row("CANTIDAD_DESPACHADA").ToString)
                                                    peso_unit = Double.Parse(row("PESO_UNIT").ToString)
                                                    peso_total = cantidad * peso_unit

                                                    If row("SERIADO_IND").ToString = "N" And CDbl(row("CANTIDAD_DESPACHADA").ToString) > 0 Then
                                                        OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("CODIGO_PRODUCTO").ToString,
                                                                                          row("PROD_CODE_ANTIGUO").ToString, row("UNIDAD").ToString, row("CANTIDAD_DESPACHADA").ToString,
                                                                                          row("UNIDAD").ToString, row("CANTIDAD_DESPACHADA").ToString, row("CANTIDAD_DESPACHADA").ToString,
                                                                                          "0", row("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, "", row("PRECIO").ToString,
                                                                                          "N", "N", "NORMAL", "", "", row("CENTRO_COSTO_CECD").ToString, row("CENTRO_COSTO_CECC").ToString, "E", moneda, "0.00")
                                                    Else
                                                        For c As Integer = 1 To (CDbl(row("CANTIDAD_DESPACHADA").ToString))
                                                            OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("CODIGO_PRODUCTO").ToString,
                                                                                              row("PROD_CODE_ANTIGUO").ToString, row("UNIDAD").ToString, "1",
                                                                                              row("UNIDAD").ToString, "1", row("CANTIDAD_DESPACHADA").ToString,
                                                                                              "0", row("PESO_UNIT").ToString, row("PESO_UNIT").ToString, "1", "0", USUA_ID, "", row("PRECIO").ToString,
                                                                                              "N", "N", "NORMAL", "", "", row("CENTRO_COSTO_CECD").ToString, row("CENTRO_COSTO_CECC").ToString, "M", moneda, "0.00")
                                                        Next
                                                    End If
                                                Next
                                            End If
                                        Else
                                            dt = New Nomade.NC.NCFactura("BN").lista_detalle_dcto_pagar(DCTOS(i).ToString, "0", String.Empty)

                                            If Not (dt Is Nothing) Then

                                                Dim cantidad As Double = 0
                                                Dim peso_unit As Double = 0
                                                Dim peso_total As Double = 0

                                                For Each row As DataRow In dt.Rows
                                                    Dim moneda As String = ""
                                                    If row("MONE_CODE") = codeMoba Then
                                                        moneda = codeMoba
                                                    Else
                                                        moneda = codeMoal
                                                    End If

                                                    cantidad = Double.Parse(row("CANTIDAD_NO_INGRESADA").ToString)
                                                    peso_unit = Double.Parse(row("PESO_UNIT").ToString)
                                                    peso_total = cantidad * peso_unit

                                                    If row("SERIADO_IND").ToString = "N" And CDbl(row("CANTIDAD_NO_INGRESADA").ToString) > 0 Then
                                                        OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PRODUCTO").ToString,
                                                                                          row("PROD_CODE_ANTIGUO").ToString, row("UNIDAD").ToString, row("CANTIDAD_NO_INGRESADA").ToString,
                                                                                          row("UNIDAD").ToString, row("CANTIDAD_NO_INGRESADA").ToString, row("TOTAL_NO_INGRESADO").ToString,
                                                                                          "0", row("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, "", row("PRECIO").ToString,
                                                                                          "N", "N", "NORMAL", "", "", IIf(row("CENTRO_COSTO_CECD").ToString = "", row("CENTRO_COSTO_CECD_MOV").ToString, row("CENTRO_COSTO_CECD").ToString),
                                                                                          IIf(row("CENTRO_COSTO_CECC").ToString = "", row("CENTRO_COSTO_CECC_MOV").ToString, row("CENTRO_COSTO_CECC").ToString), "E", String.Empty, moneda, "0.00")
                                                    Else
                                                        For c As Integer = 1 To (CDbl(row("CANTIDAD_NO_INGRESADA").ToString))
                                                            OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PRODUCTO").ToString,
                                                                                              row("PROD_CODE_ANTIGUO").ToString, row("UNIDAD").ToString, "1",
                                                                                              row("UNIDAD").ToString, "1", row("TOTAL_NO_INGRESADO").ToString,
                                                                                              "0", row("PESO_UNIT").ToString, row("PESO_UNIT").ToString, "1", "0", USUA_ID, "", row("PRECIO").ToString,
                                                                                              "N", "N", "NORMAL", "", "", IIf(row("CENTRO_COSTO_CECD").ToString = "", row("CENTRO_COSTO_CECD_MOV").ToString, row("CENTRO_COSTO_CECD").ToString),
                                                                                              IIf(row("CENTRO_COSTO_CECC").ToString = "", row("CENTRO_COSTO_CECC_MOV").ToString, row("CENTRO_COSTO_CECC").ToString), "M", String.Empty, moneda, "0.00")
                                                        Next
                                                    End If
                                                Next
                                            End If

                                        End If
                                    End If
                                Next

                            Case "0026" ' ORDEN DE COMPRA AL PROVEEDOR
                                For i As Integer = 0 To (DCTOS.Length - 1)
                                    dt = New Nomade.CO.CORegistroCompras("BN").LISTAR_DETALLE_ORDCOMPRA(DCTOS(i).ToString)
                                    Dim item As Integer = 1
                                    If Not (dt Is Nothing) Then

                                        Dim cantidad As Double = 0
                                        Dim peso_unit As Double = 0
                                        Dim peso_total As Double = 0

                                        For Each row As DataRow In dt.Rows

                                            cantidad = Double.Parse(row("CANTIDAD_NO_ATENDIDA").ToString)
                                            peso_unit = Double.Parse(row("PESO_UNIT").ToString)
                                            peso_total = cantidad * peso_unit

                                            If row("SERIADO_IND").ToString = "N" And CDbl(row("CANTIDAD_NO_ATENDIDA").ToString) > 0 Then
                                                OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("CODIGOPRO").ToString,
                                                                                  row("PROD_CODE_ANTIGUO").ToString, row("UNME_CODE").ToString, row("CANTIDAD_NO_ATENDIDA").ToString,
                                                                                  row("UNME_CODE").ToString, row("CANTIDAD_NO_ATENDIDA").ToString, row("IMPORTE_NO_ATENDIDO").ToString,
                                                                                  "0", row("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, "", row("PREC_UNIT").ToString,
                                                                                  "N", "N", "NORMAL", "", "", "", "", "E", "N", codeMoba, "0.00")
                                            Else
                                                For c As Integer = 1 To (CInt(row("CANTIDAD_NO_ATENDIDA").ToString))
                                                    OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("CODIGOPRO").ToString,
                                                                                      row("PROD_CODE_ANTIGUO").ToString, row("UNME_CODE").ToString, "1",
                                                                                      row("UNME_CODE").ToString, "1", row("IMPORTE_NO_ATENDIDO").ToString,
                                                                                      "0", row("PESO_UNIT").ToString, row("PESO_UNIT").ToString, "1", "0", USUA_ID, "", row("PREC_UNIT").ToString,
                                                                                      "N", "N", "NORMAL", "", "", "", "", "M", codeMoba, "0.00")
                                                Next
                                            End If
                                        Next
                                    End If
                                Next
                            Case "0007" ' NOTA DE CRÉDITO
                                For i As Integer = 0 To (DCTOS.Length - 1)
                                    dt = New Nomade.CA.NotaCredito("BN").ListarDetallesNotaCreditoNaminsa(DCTOS(i).ToString, "V")
                                    If Not (dt Is Nothing) Then

                                        Dim cantidad As Double = 0
                                        Dim peso_unit As Double = 0
                                        Dim peso_total As Double = 0

                                        For Each row As DataRow In dt.Rows
                                            Dim moneda As String = ""
                                            If row("MONE_CODE") = codeMoba Then
                                                moneda = codeMoba
                                            Else
                                                moneda = codeMoal
                                            End If

                                            cantidad = Double.Parse(row("CANTIDAD_DEVL").ToString)
                                            peso_unit = Double.Parse(row("PESO_UNIT").ToString)
                                            peso_total = cantidad * peso_unit

                                            If Decimal.Parse(row("CANTIDAD_DEVL")) > 0 Then
                                                'MONTO_SUBTOTAL: TOTAL_NO_INGRESADO
                                                'PRECIO : PU
                                                'PROD_CODE_ANTIGUO:COD_PROD_ANT
                                                'CANTIDAD_DEVL:CANTIDAD_NO_INGRESADA
                                                'PRODUCTO: PROD_CODE
                                                If CDbl(row("CANTIDAD_DEVL").ToString) > 0 And row("SERIADO_IND").ToString = "N" Then
                                                    'PRODUCTOS NO SERIADOS                                                    
                                                    OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PROD_CODE").ToString,
                                                                                      row("COD_PROD_ANT").ToString, row("UNIDAD").ToString, row("CANTIDAD_DEVL").ToString,
                                                                                      row("UNIDAD").ToString, row("CANTIDAD_DEVL").ToString, row("MONTO_SUBTOTAL").ToString,
                                                                                      "0", row("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, "", row("PU").ToString,
                                                                                      "N", "N", "NORMAL", "", "", "", "", "E", "", moneda, "0.00")
                                                Else
                                                    If CDbl(row("CANTIDAD_DEVL").ToString) > 0 Then
                                                        ' PRODUCTOS SERIADOS         
                                                        If row("CODS_MCDR_DESPACHADOS").ToString.Trim = "" Then
                                                            For c As Integer = 1 To (CDbl(row("CANTIDAD_DEVL").ToString))
                                                                OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PROD_CODE").ToString,
                                                                                                  row("COD_PROD_ANT").ToString, row("UNIDAD").ToString, "1",
                                                                                                  row("UNIDAD").ToString, "1", row("MONTO_SUBTOTAL").ToString,
                                                                                                  "0", row("PESO_UNIT").ToString, row("PESO_UNIT").ToString, "", "1", "0", USUA_ID, "", row("PU").ToString,
                                                                                                  "N", "N", "NORMAL", "", "", "", "", "M", "", moneda, "0.00")
                                                            Next
                                                        Else
                                                            Dim lstSeries As String()
                                                            lstSeries = row("CODS_MCDR_DESPACHADOS").ToString.Split(",")
                                                            For Each serie In lstSeries
                                                                If serie <> "" Then
                                                                    OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PROD_CODE").ToString,
                                                                                                row("COD_PROD_ANT").ToString, row("UNIDAD").ToString, "1",
                                                                                                row("UNIDAD").ToString, "1", row("MONTO_SUBTOTAL").ToString,
                                                                                                "0", row("PESO_UNIT").ToString, row("PESO_UNIT").ToString, "1", "0", USUA_ID, serie, row("PU").ToString,
                                                                                                "N", "N", "NORMAL", "", "", "", "", "M", "", moneda, "0.00")
                                                                End If
                                                            Next
                                                        End If
                                                    End If
                                                End If
                                            End If
                                        Next
                                    End If
                                Next

                            Case "0009" ' GUÍA DE REMISIÓN 

                                For i As Integer = 0 To (DCTOS.Length - 1)
                                    dt = New Nomade.NA.NATipoMovimiento("BN").lista_detalle_dcto_almacen(DCTOS(i).ToString, "")
                                    If Not (dt Is Nothing) Then

                                        Dim cantidad As Double = 0
                                        Dim peso_unit As Double = 0
                                        Dim peso_total As Double = 0

                                        For Each row As DataRow In dt.Rows

                                            cantidad = Double.Parse(row("CANTIDAD_NO_ATENDIDA").ToString)
                                            peso_unit = Double.Parse(row("PESO_UNIT").ToString)
                                            peso_total = cantidad * peso_unit

                                            If Double.Parse(row("CANTIDAD_NO_ATENDIDA").ToString) > 0 And row("SERIADO_IND").ToString = "N" Then
                                                OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PROD_CODE").ToString,
                                                                                  row("PRODUCTO").ToString, row("UNME_BASE").ToString, row("CANTIDAD_NO_ATENDIDA").ToString,
                                                                                  row("UNME_BASE").ToString, row("CANTIDAD_NO_ATENDIDA").ToString, row("TOTAL").ToString,
                                                                                  "0", row("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, row("NRO_SERIE").ToString, row("MONTO").ToString,
                                                                                  row("INC_IGV").ToString, "N", "NORMAL", "", "", row("CECD_CODE").ToString, row("CECC_CODE").ToString,
                                                                                  row("APLIC_VALORES_IND").ToString, "", "", row("DETRACCION").ToString, "0.00") ' Le quité un "" después de peso_total
                                            Else
                                                For c As Integer = 1 To (CInt(row("CANTIDAD_NO_ATENDIDA").ToString))
                                                    OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PROD_CODE").ToString,
                                                                             row("PRODUCTO").ToString, row("UNME_BASE").ToString, row("CANTIDAD_NO_ATENDIDA").ToString,
                                                                             row("UNME_BASE").ToString, row("CANTIDAD_NO_ATENDIDA").ToString, row("TOTAL").ToString,
                                                                             "0", row("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, row("NRO_SERIE").ToString, row("MONTO").ToString,
                                                                             row("INC_IGV").ToString, "N", "NORMAL", "", "", row("CECD_CODE").ToString, row("CECC_CODE").ToString,
                                                                             row("APLIC_VALORES_IND").ToString, "", "", row("DETRACCION").ToString, "0.00") ' Le quité un "" después de peso_total
                                                Next
                                            End If
                                        Next
                                    End If
                                Next
                        End Select
                    ElseIf tipo_mov = "TI" Then
                        Select Case TIPO_DCTO
                            Case "0050", "0009"
                                For i As Integer = 0 To (DCTOS.Length - 1)
                                    dt = New Nomade.NA.NATipoMovimiento("BN").lista_detalle_dcto_almacen(DCTOS(i).ToString, "")
                                    If Not (dt Is Nothing) Then

                                        Dim cantidad As Double = 0
                                        Dim peso_unit As Double = 0
                                        Dim peso_total As Double = 0

                                        For Each row As DataRow In dt.Rows

                                            cantidad = Double.Parse(row("CANTIDAD_BASE").ToString)
                                            peso_unit = Double.Parse(row("PESO_UNIT").ToString)
                                            peso_total = cantidad * peso_unit

                                            If Double.Parse(row("CANTIDAD_BASE").ToString) > 0 Then
                                                OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PROD_CODE").ToString,
                                                                                  row("PRODUCTO").ToString, row("UNME_BASE").ToString, row("CANTIDAD_BASE").ToString,
                                                                                  row("UNME_BASE").ToString, row("CANTIDAD_BASE").ToString, row("TOTAL").ToString,
                                                                                  "0", row("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, row("NRO_SERIE").ToString, row("MONTO").ToString,
                                                                                  row("INC_IGV").ToString, "N", "NORMAL", "", "", row("CECD_CODE").ToString, row("CECC_CODE").ToString,
                                                                                  row("APLIC_VALORES_IND").ToString, "", "", row("DETRACCION").ToString, "0.00") ' Le quité un "" después de peso_total
                                            End If
                                        Next
                                    End If
                                Next
                        End Select
                    ElseIf tipo_mov = "S" Then
                        Select Case TIPO_DCTO
                            Case "0001", "0003", "0012", "0101"
                                Dim dtDetBonificacion As New DataTable
                                Dim dtDetMuestra As New DataTable
                                For i As Integer = 0 To (DCTOS.Length - 1)
                                    dt = New Nomade.NV.NVVenta("BN").ListarDetalleDocumentoVenta(DCTOS(i).ToString, "0", String.Empty, CTLG_CODE, SCSL_CODE)
                                    dtDetBonificacion = New Nomade.NV.NVVenta("BN").ListarDetalleBonificacionDocumentoVenta(DCTOS(i).ToString, "0", String.Empty, CTLG_CODE, SCSL_CODE)
                                    dtDetMuestra = New Nomade.NV.NVVenta("BN").ListarDetalleMuestraDocumentoVenta(DCTOS(i).ToString, "0", String.Empty, CTLG_CODE, SCSL_CODE)

                                    If Not (dt Is Nothing) Then

                                        Dim cantidad As Double = 0
                                        Dim stock As Double = 0
                                        Dim peso_unit As Double = 0
                                        Dim peso_total As Double = 0

                                        VALIDAR_STOCK = True
                                        For Each row As DataRow In dt.Rows

                                            cantidad = Double.Parse(row("CANTIDAD_NO_INGRESADA").ToString)
                                            stock = Double.Parse(row("CANT_TOTAL").ToString)
                                            peso_unit = Double.Parse(row("PESO_UNIT").ToString)
                                            peso_total = cantidad * peso_unit

                                            If row("SERVICIO").ToString <> "000003500" Then
                                                If row("ESTADO_ENTREGA").ToString = "N" Then
                                                    If stock > 0 And cantidad > 0 Then
                                                        If (COD_ALMC = row("ALMC_CODE").ToString) Then ' cambio gozu
                                                            'If row("SERIADO_IND").ToString = "N" Then
                                                            OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen2(ISAC_CODE, DCTOS(i).ToString, row("ITEM").ToString, IIf(row("SERIADO_IND").ToString = "N", row("PROD_CODE").ToString, row("CODIGO_PRODUCTO").ToString),
                                                                                                  row("PROD_CODE_ANTIGUO").ToString, row("UNIDAD_AUX").ToString, IIf(stock > cantidad, cantidad, stock),
                                                                                                  row("UNIDAD").ToString, IIf(stock > cantidad, cantidad, stock),
                                                                                                  (Double.Parse(row("COSTO").ToString) * IIf(stock > cantidad, cantidad, stock)),
                                                                                                  "0", row("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, IIf(row("SERIADO_IND").ToString = "N", "", row("CODIGO_BARRAS").ToString), row("COSTO").ToString,
                                                                                                  "N", "N", "NORMAL", "", "", IIf(row("CENTRO_COSTO_CECD").ToString = "", row("CENTRO_COSTO_CECD_MOV").ToString, row("CENTRO_COSTO_CECD").ToString),
                                                                                                  IIf(row("CENTRO_COSTO_CECC").ToString = "", row("CENTRO_COSTO_CECC_MOV").ToString, row("CENTRO_COSTO_CECC").ToString),
                                                                                                  IIf(row("SERIADO_IND").ToString = "N", "E", "M"), "N", codeMoba, "0.00")

                                                            'Else
                                                            'For c As Integer = 1 To (IIf(stock > cantidad, cantidad, stock))
                                                            '    OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen2(ISAC_CODE, DCTOS(i).ToString, c, row("PROD_CODE").ToString,
                                                            '                                      row("PROD_CODE_ANTIGUO").ToString, row("UNIDAD").ToString, "1", row("UNIDAD").ToString, "1",
                                                            '                                      row("COSTO").ToString, "0", row("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, "", row("COSTO").ToString, "N", "N", "NORMAL",
                                                            '                                      "", "", IIf(row("CENTRO_COSTO_CECD").ToString = "", row("CENTRO_COSTO_CECD_MOV").ToString, row("CENTRO_COSTO_CECD").ToString),
                                                            '                                      IIf(row("CENTRO_COSTO_CECC").ToString = "", row("CENTRO_COSTO_CECC_MOV").ToString, row("CENTRO_COSTO_CECC").ToString), "M", "N", codeMoba, "0.00")
                                                            'Next
                                                            'End If
                                                        Else
                                                            ALMACEN_CAB = False
                                                        End If
                                                    Else
                                                        If cantidad > 0 And cantidad > stock Then
                                                            PROD_SIN_STOCK = PROD_SIN_STOCK + row("PROD_CODE_ANTIGUO").ToString + ", "
                                                        End If
                                                    End If
                                                End If
                                            End If
                                        Next
                                    End If

                                    'DETALLE BONIFICACION
                                    If Not (dtDetBonificacion Is Nothing) Then

                                        Dim cantidad As Double = 0
                                        Dim stock As Double = 0
                                        Dim peso_unit As Double = 0
                                        Dim peso_total As Double = 0

                                        VALIDAR_STOCK = True
                                        For Each row2 As DataRow In dtDetBonificacion.Rows

                                            cantidad = Double.Parse(row2("CANTIDAD_NO_INGRESADA").ToString)
                                            stock = Double.Parse(row2("CANT_TOTAL").ToString)
                                            peso_unit = Double.Parse(row2("PESO_UNIT").ToString)
                                            peso_total = cantidad * peso_unit

                                            If row2("SERVICIO").ToString <> "000003500" Then
                                                If row2("ESTADO_ENTREGA").ToString = "N" Then
                                                    If stock > 0 And cantidad > 0 Then
                                                        If (COD_ALMC = row2("ALMC_CODE").ToString) Then ' cambio gozu
                                                            'If row2("SERIADO_IND").ToString = "N" Then
                                                            OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen2(ISAC_CODE, DCTOS(i).ToString, row2("ITEM").ToString, IIf(row2("SERIADO_IND").ToString = "N", row2("PROD_CODE").ToString, row2("CODIGO_PRODUCTO").ToString),
                                                                                              row2("PROD_CODE_ANTIGUO").ToString, row2("UNIDAD").ToString, IIf(stock > cantidad, cantidad, stock),
                                                                                              row2("UNIDAD").ToString, IIf(stock > cantidad, cantidad, stock),
                                                                                              (Double.Parse(row2("COSTO").ToString) * IIf(stock > cantidad, cantidad, stock)),
                                                                                              "0", row2("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, IIf(row2("SERIADO_IND").ToString = "N", "", row2("CODIGO_BARRAS").ToString), row2("COSTO").ToString,
                                                                                              "N", "N", "NORMAL", "", "", IIf(row2("CENTRO_COSTO_CECD").ToString = "", row2("CENTRO_COSTO_CECD_MOV").ToString, row2("CENTRO_COSTO_CECD").ToString),
                                                                                              IIf(row2("CENTRO_COSTO_CECC").ToString = "", row2("CENTRO_COSTO_CECC_MOV").ToString, row2("CENTRO_COSTO_CECC").ToString),
                                                                                              IIf(row2("SERIADO_IND").ToString = "N", "E", "M"), "B", codeMoba, "0.00")

                                                            'OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row2("PROD_CODE").ToString,
                                                            '                                      row2("PROD_CODE_ANTIGUO").ToString, row2("UNIDAD").ToString, IIf(stock > cantidad, cantidad, stock),
                                                            '                                      row2("UNIDAD").ToString, IIf(stock > cantidad, cantidad, stock),
                                                            '                                      (Double.Parse(row2("COSTO").ToString) * IIf(stock > cantidad, cantidad, stock)),
                                                            '                                      "0", row2("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, "", row2("COSTO").ToString,
                                                            '                                      "N", "N", "NORMAL", "", "", IIf(row2("CENTRO_COSTO_CECD").ToString = "", row2("CENTRO_COSTO_CECD_MOV").ToString, row2("CENTRO_COSTO_CECD").ToString),
                                                            '                                      IIf(row2("CENTRO_COSTO_CECC").ToString = "", row2("CENTRO_COSTO_CECC_MOV").ToString, row2("CENTRO_COSTO_CECC").ToString), "E", "B", codeMoba, "0.00")

                                                            'Else
                                                            '    For c As Integer = 1 To (IIf(stock > cantidad, cantidad, stock))
                                                            '        OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row2("PROD_CODE").ToString,
                                                            '                                          row2("PROD_CODE_ANTIGUO").ToString, row2("UNIDAD").ToString, cantidad, row2("UNIDAD").ToString, cantidad,
                                                            '                                          row2("COSTO").ToString, "0", row2("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, "", row2("COSTO").ToString, "N", "N", "NORMAL",
                                                            '                                          "", "", IIf(row2("CENTRO_COSTO_CECD").ToString = "", row2("CENTRO_COSTO_CECD_MOV").ToString, row2("CENTRO_COSTO_CECD").ToString),
                                                            '                                          IIf(row2("CENTRO_COSTO_CECC").ToString = "", row2("CENTRO_COSTO_CECC_MOV").ToString, row2("CENTRO_COSTO_CECC").ToString), "M", "B", codeMoba, "0.00")
                                                            '    Next
                                                        Else
                                                            ALMACEN_CAB = False
                                                        End If
                                                    Else
                                                        If cantidad > 0 And cantidad > stock Then
                                                            PROD_SIN_STOCK = PROD_SIN_STOCK + row2("PROD_CODE_ANTIGUO").ToString + ", "
                                                        End If
                                                    End If
                                                End If
                                            End If

                                        Next
                                    End If
                                    'FIN DETALLE BONIFICACION

                                    'DETALLE MUESTRA
                                    If Not (dtDetMuestra Is Nothing) Then

                                        Dim cantidad As Double = 0
                                        Dim stock As Double = 0
                                        Dim peso_unit As Double = 0
                                        Dim peso_total As Double = 0

                                        VALIDAR_STOCK = True
                                        For Each row2 As DataRow In dtDetMuestra.Rows

                                            cantidad = Double.Parse(row2("CANTIDAD_NO_INGRESADA").ToString)
                                            stock = Double.Parse(row2("CANT_TOTAL").ToString)
                                            peso_unit = Double.Parse(row2("PESO_UNIT").ToString)
                                            peso_total = cantidad * peso_unit

                                            If row2("SERVICIO").ToString <> "000003500" Then
                                                If row2("ESTADO_ENTREGA").ToString = "N" Then
                                                    If stock > 0 And cantidad > 0 Then
                                                        If (COD_ALMC = row2("ALMC_CODE").ToString) Then ' cambio gozu
                                                            ' If row2("SERIADO_IND").ToString = "N" Then
                                                            OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen2(ISAC_CODE, DCTOS(i).ToString, row2("ITEM").ToString, IIf(row2("SERIADO_IND").ToString = "N", row2("PROD_CODE").ToString, row2("CODIGO_PRODUCTO").ToString),
                                                                                          row2("PROD_CODE_ANTIGUO").ToString, row2("UNIDAD").ToString, IIf(stock > cantidad, cantidad, stock),
                                                                                          row2("UNIDAD").ToString, IIf(stock > cantidad, cantidad, stock),
                                                                                          (Double.Parse(row2("COSTO").ToString) * IIf(stock > cantidad, cantidad, stock)),
                                                                                          "0", row2("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, IIf(row2("SERIADO_IND").ToString = "N", "", row2("CODIGO_BARRAS").ToString), row2("COSTO").ToString,
                                                                                          "N", "N", "NORMAL", "", "", IIf(row2("CENTRO_COSTO_CECD").ToString = "", row2("CENTRO_COSTO_CECD_MOV").ToString, row2("CENTRO_COSTO_CECD").ToString),
                                                                                          IIf(row2("CENTRO_COSTO_CECC").ToString = "", row2("CENTRO_COSTO_CECC_MOV").ToString, row2("CENTRO_COSTO_CECC").ToString),
                                                                                          IIf(row2("SERIADO_IND").ToString = "N", "E", "M"), "M", codeMoba, "0.00")
                                                            'OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row2("PROD_CODE").ToString,
                                                            '                                      row2("PROD_CODE_ANTIGUO").ToString, row2("UNIDAD").ToString, IIf(stock > cantidad, cantidad, stock),
                                                            '                                      row2("UNIDAD").ToString, IIf(stock > cantidad, cantidad, stock),
                                                            '                                      (Double.Parse(row2("COSTO").ToString) * IIf(stock > cantidad, cantidad, stock)),
                                                            '                                      "0", row2("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, "", row2("COSTO").ToString,
                                                            '                                      "N", "N", "NORMAL", "", "", IIf(row2("CENTRO_COSTO_CECD").ToString = "", row2("CENTRO_COSTO_CECD_MOV").ToString, row2("CENTRO_COSTO_CECD").ToString),
                                                            '                                      IIf(row2("CENTRO_COSTO_CECC").ToString = "", row2("CENTRO_COSTO_CECC_MOV").ToString, row2("CENTRO_COSTO_CECC").ToString), "E", "M", codeMoba, "0.00")

                                                            'Else
                                                            '    For c As Integer = 1 To (IIf(stock > cantidad, cantidad, stock))
                                                            '        OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row2("PROD_CODE").ToString,
                                                            '                                          row2("PROD_CODE_ANTIGUO").ToString, row2("UNIDAD").ToString, cantidad, row2("UNIDAD").ToString, cantidad,
                                                            '                                          row2("COSTO").ToString, "0", row2("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, "", row2("COSTO").ToString, "N", "N", "NORMAL",
                                                            '                                          "", "", IIf(row2("CENTRO_COSTO_CECD").ToString = "", row2("CENTRO_COSTO_CECD_MOV").ToString, row2("CENTRO_COSTO_CECD").ToString),
                                                            '                                          IIf(row2("CENTRO_COSTO_CECC").ToString = "", row2("CENTRO_COSTO_CECC_MOV").ToString, row2("CENTRO_COSTO_CECC").ToString), "M", "M", codeMoba, "0.00")
                                                            '    Next
                                                        Else
                                                            ALMACEN_CAB = False
                                                        End If
                                                    Else
                                                        If cantidad > 0 And cantidad > stock Then
                                                            PROD_SIN_STOCK = PROD_SIN_STOCK + row2("PROD_CODE_ANTIGUO").ToString + ", "
                                                        End If
                                                    End If
                                                End If
                                            End If
                                        Next
                                    End If
                                    'FIN DETALLE MUESTRA
                                Next
                                OK = New Nomade.NA.NATipoMovimiento("BN").actualizar_doc_origen_NAMINSA(ISAC_CODE)
                            Case "0028"
                                For i As Integer = 0 To (DCTOS.Length - 1)
                                    dt = New Nomade.CO.CORegistroCompras("BN").LISTAR_DETALLES_APROBADOS(DCTOS(i).ToString, String.Empty, SCSL_CODE, CTLG_CODE)
                                    If Not (dt Is Nothing) Then

                                        Dim cantidad As Double = 0
                                        Dim stock As Double = 0
                                        Dim peso_unit As Double = 0
                                        Dim peso_total As Double = 0

                                        For Each row As DataRow In dt.Rows

                                            cantidad = Double.Parse(row("CANTIDAD").ToString)
                                            stock = Double.Parse(row("STOCK_REAL").ToString)
                                            peso_unit = Double.Parse(row("PESO_UNIT").ToString)
                                            peso_total = cantidad * peso_unit

                                            If stock > 0 And cantidad > 0 Then
                                                If row("SERIADO_IND").ToString = "N" Then
                                                    OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PROD_CODE").ToString,
                                                                                      row("PROD_CODE_ANTIGUO").ToString, row("UNME_CODE").ToString, IIf(stock > cantidad, cantidad, stock),
                                                                                      row("UNME_CODE").ToString, IIf(stock > cantidad, cantidad, stock),
                                                                                      (Double.Parse(row("COSTO").ToString) * Double.Parse(IIf(stock > cantidad, cantidad, stock))),
                                                                                      "0", row("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, "", row("COSTO").ToString,
                                                                                      "N", "N", "NORMAL", "", "", "", "", "E", "", "0.00")
                                                Else
                                                    For c As Integer = 1 To (IIf(stock > cantidad, cantidad, stock))
                                                        OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PROD_CODE").ToString,
                                                                                          row("PROD_CODE_ANTIGUO").ToString, row("UNME_CODE").ToString, "1", row("UNME_CODE").ToString,
                                                                                          "1", row("COSTO").ToString, "0", row("PESO_UNIT").ToString, row("PESO_UNIT").ToString, "1", "0", USUA_ID, "", row("COSTO").ToString,
                                                                                          "N", "N", "NORMAL", "", "", "", "", "M", "", "0.00")
                                                    Next
                                                End If
                                            End If
                                        Next
                                    End If
                                Next

                            Case "0052"
                                For i As Integer = 0 To (DCTOS.Length - 1)
                                    dt = New Nomade.CO.CORegistroCompras("BN").LISTAR_DETALLES_APROBADOS_REQUE(DCTOS(i).ToString, String.Empty, SCSL_CODE, CTLG_CODE)
                                    If Not (dt Is Nothing) Then

                                        Dim cantidad As Double = 0
                                        Dim stock As Double = 0
                                        Dim peso_unit As Double = 0
                                        Dim peso_total As Double = 0

                                        For Each row As DataRow In dt.Rows

                                            cantidad = Double.Parse(row("CANTIDAD").ToString)
                                            stock = Double.Parse(row("STOCK_REAL").ToString)
                                            peso_unit = Double.Parse(row("PESO_UNIT").ToString)
                                            peso_total = cantidad * peso_unit

                                            If stock > 0 And cantidad > 0 Then
                                                If row("SERIADO_IND").ToString = "N" Then
                                                    OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PROD_CODE").ToString,
                                                                                      row("PROD_CODE_ANTIGUO").ToString, row("UNME_CODE").ToString, IIf(stock > cantidad, cantidad, stock),
                                                                                      row("UNME_CODE").ToString, IIf(stock > cantidad, cantidad, stock),
                                                                                      (Double.Parse(row("COSTO").ToString) * Double.Parse(IIf(stock > cantidad, cantidad, stock))),
                                                                                      "0", row("PESO_UNIT").ToString, peso_total, "1", "0", USUA_ID, "", row("COSTO").ToString,
                                                                                      "N", "N", "NORMAL", "", "", row("FPBRCOM_PTVCECD_CODE").ToString, row("FPBRCOM_CECC_CODE").ToString, "E", "", "0.00")
                                                Else
                                                    For c As Integer = 1 To (IIf(stock > cantidad, cantidad, stock))
                                                        OK = New Nomade.NA.NATipoMovimiento("BN").insertar_detalle_dcto_almacen(ISAC_CODE, DCTOS(i).ToString, row("PROD_CODE").ToString,
                                                                                          row("PROD_CODE_ANTIGUO").ToString, row("UNME_CODE").ToString, "1", row("UNME_CODE").ToString,
                                                                                          "1", row("COSTO").ToString, "0", row("PESO_UNIT").ToString, row("PESO_UNIT").ToString, "1", "0", USUA_ID, "", row("COSTO").ToString,
                                                                                          "N", "N", "NORMAL", "", "", row("FPBRCOM_PTVCECD_CODE").ToString, row("FPBRCOM_CECC_CODE").ToString, "M", "", "0.00")
                                                    Next
                                                End If
                                            End If
                                        Next
                                    End If
                                Next
                        End Select
                    End If
                    res = "OK"

                    If VALIDAR_STOCK Then
                        ' SI EN SALIDA SE VALIDO STOCK Y NO HUBO SUFICIENTE, SE DEVUELVE LOS CODIGOS DE PRODUCTOS QUE NO TIENEN STOCK
                        If PROD_SIN_STOCK <> "" Then
                            PROD_SIN_STOCK = PROD_SIN_STOCK + "{}"
                            PROD_SIN_STOCK = PROD_SIN_STOCK.Replace(", {}", "")
                        Else
                            PROD_SIN_STOCK = "OK"
                        End If
                        res = PROD_SIN_STOCK
                    End If

                    If bool_despachado = False Then
                        res = "SIN_DESPACHAR"
                    End If

                    If ALMACEN_CAB = False Then 'DPORTA 13/03/2021
                        res = "ALMACEN_DIF"
                    End If
                Case "LDOCS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If tipo_mov = "I" Then
                        Select Case TIPO_DCTO
                            Case "0001", "0003", "0012", "0000"
                                dt = New Nomade.NC.NCFactura("BN").lista_dcto_pagar(String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, CTLG_CODE, IIf(SCSL_CODE Is Nothing, "", SCSL_CODE), TIPO_DCTO, PIDM)
                                If Not (dt Is Nothing) Then
                                    resb.Append("[")
                                    For Each row As DataRow In dt.Rows
                                        If row("COMPLETO").ToString = "COMPLETO" And row("DESPACHADO_IND").ToString <> "S" Then
                                            resb.Append("{")
                                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                            resb.Append("""NRO_DOCUMENTO"" :" & """" & row("NUM_DCTO").ToString & """,")
                                            resb.Append("""PROVEEDOR"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                            resb.Append("""IMPORTE_TOTAL"" :" & """" & row("IMPORTE_TOTAL").ToString & """,")
                                            resb.Append("""DESC_CORTA_MONEDA"" :" & """" & row("DESC_CORTA_MONEDA").ToString & """,")
                                            resb.Append("""EMISION"" :" & """" & row("EMISION").ToString & """,")
                                            resb.Append("""DESPACHADO_IND"" :" & """" & row("DESPACHADO_IND").ToString & """,")
                                            resb.Append("""DESPACHADO"" :" & """" & row("DESPACHADO").ToString & """,")
                                            resb.Append("""IMPORTE_PAGAR"" :" & """" & row("IMPORTE_PAGAR").ToString & """,")
                                            resb.Append("""TOTAL"" :" & """" & row("IMPORTE").ToString & """")
                                            resb.Append("}")
                                            resb.Append(",")
                                        End If
                                    Next
                                    resb.Append("{}")
                                    resb = resb.Replace(",{}", String.Empty)
                                    resb.Append("]")
                                    resb = resb.Replace("[{}]", String.Empty)
                                End If
                            Case "0009"
                                dt = New Nomade.NA.NATipoMovimiento("BN").lista_dcto_almacen("", "", "", "", "", "S", CTLG_CODE, COD_ALMC, PIDM, TIPO_DCTO)
                                If Not (dt Is Nothing) Then
                                    resb.Append("[")
                                    For Each row As DataRow In dt.Rows
                                        If row("COMPLETO").ToString = "COMPLETO" And row("DESPACHADO").ToString <> "S" Then
                                            resb.Append("{")
                                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                            resb.Append("""NRO_DOCUMENTO"" :" & """" & row("REQC_NUM_SEQ_DOC").ToString & "-" & row("REQC_CODE").ToString & """,")
                                            resb.Append("""PROVEEDOR"" :" & """" & row("RAZON_DEST").ToString & """,")
                                            resb.Append("""DESC_CORTA_MONEDA"" :" & """" & row("DESC_CORTA_MONEDA").ToString & """,")
                                            resb.Append("""EMISION"" :" & """" & row("FECHA_EMISION").ToString & """,")
                                            resb.Append("""DESPACHADO_IND"" :" & """" & row("COMPLETO").ToString & """,")
                                            resb.Append("""DESPACHADO"" :" & """" & row("DESPACHADO").ToString & """,")
                                            resb.Append("""TOTAL"" :" & """" & row("IMPORTE_BIEN").ToString & """")
                                            resb.Append("}")
                                            resb.Append(",")
                                        End If
                                    Next
                                    resb.Append("{}")
                                    resb = resb.Replace(",{}", String.Empty)
                                    resb.Append("]")
                                End If
                            Case "0026"
                                'dt = New Nomade.CO.CORegistroCompras("BN").LISTAR_LISTA_ORDEN_COMPRA(CTLG_CODE, SCSL_CODE, PIDM, "N")
                                dt = New Nomade.CO.CORegistroCompras("BN").LISTAR_LISTA_ORDEN_COMPRA(CTLG_CODE, COD_ALMC, PIDM, "N")
                                If Not (dt Is Nothing) Then
                                    resb.Append("[")
                                    For Each row As DataRow In dt.Rows
                                        If row("TIPODOC").ToString = "PROVEEDOR" Then
                                            resb.Append("{")
                                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                            resb.Append("""NRO_DOCUMENTO"" :" & """" & row("CORRELATIVO").ToString & """,")
                                            resb.Append("""DESC_CORTA_MONEDA"" :" & """" & row("DESC_MONEDA").ToString & """,")
                                            resb.Append("""PROVEEDOR"" :" & """" & row("P_NOMBRE").ToString & """,")
                                            resb.Append("""EMISION"" :" & """" & row("FECHA_ENTREGA").ToString & """,")
                                            resb.Append("""DESPACHADO_IND"" :" & """" & row("COMPLETO").ToString & """,")
                                            resb.Append("""DESPACHADO"" :" & """" & row("DESPACHADO").ToString & """,")
                                            resb.Append("""TOTAL"" :" & """" & row("PAGAR").ToString & """")
                                            resb.Append("}")
                                            resb.Append(",")
                                        End If
                                    Next
                                    resb.Append("{}")
                                    resb = resb.Replace(",{}", String.Empty)
                                    resb.Append("]")
                                End If
                            Case "0007"
                                dt = New Nomade.CA.NotaCredito("BN").ListarNotaCredito("", "0", "", CTLG_CODE, SCSL_CODE, PIDM, "V", "", "", "", "", "S")
                                If Not (dt Is Nothing) Then
                                    resb.Append("[")
                                    For Each row As DataRow In dt.Rows
                                        If row("DESPACHADO_IND").ToString = "N" Then
                                            resb.Append("{")
                                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                            resb.Append("""NRO_DOCUMENTO"" :" & """" & row("DOCUMENTO").ToString.Replace("N/", "") & """,")
                                            resb.Append("""PROVEEDOR"" :" & """" & row("RAZON_SOCIAL").ToString & """,") 'Nombre de Cliente
                                            resb.Append("""DESC_CORTA_MONEDA"" :" & """" & row("MONEDA").ToString & """,")
                                            resb.Append("""EMISION"" :" & """" & row("EMISION").ToString & """,")
                                            resb.Append("""DESPACHADO_IND"" :" & """" & row("DESPACHADO_IND").ToString & """,")
                                            resb.Append("""DESPACHADO"" :" & """" & row("DESPACHADO").ToString & """,")
                                            resb.Append("""IMPORTE_TOTAL"" :" & """" & row("MONTO_TOTAL").ToString & """")
                                            resb.Append("}")
                                            resb.Append(",")
                                        End If
                                    Next
                                    resb.Append("{}")
                                    resb = resb.Replace(",{}", String.Empty)
                                    resb.Append("]")
                                End If
                            Case Else
                                resb.Append("[]")
                        End Select
                    ElseIf tipo_mov = "TI" Then
                        Select Case TIPO_DCTO
                            Case "0009", "0050"
                                'ALMC_DEST = context.Request("ALMC_DEST")
                                dt = New Nomade.NA.NATipoMovimiento("BN").lista_dcto_almacen("", "", "TI", "", "", "TS", CTLG_CODE, "", PIDM, TIPO_DCTO)
                                If Not (dt Is Nothing) Then
                                    resb.Append("[")
                                    For Each row As DataRow In dt.Rows
                                        'If row("COMPLETO").ToString = "COMPLETO" Then
                                        'resb.Append("{")
                                        'resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                        'resb.Append("""NRO_DOCUMENTO"" :" & """" & row("REQC_NUM_SEQ_DOC").ToString & "-" & row("REQC_CODE").ToString & """,")
                                        'resb.Append("""PROVEEDOR"" :" & """" & row("RAZON_DEST").ToString & """,")
                                        'resb.Append("""TOTAL"" :" & """" & row("IMPORTE_BIEN").ToString & """")
                                        'resb.Append("}")
                                        'resb.Append(",")

                                        resb.Append("{")
                                        resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                        resb.Append("""NRO_DOCUMENTO"" :" & """" & row("REQC_NUM_SEQ_DOC").ToString & "-" & row("REQC_CODE").ToString & """,")
                                        resb.Append("""PROVEEDOR"" :" & """" & row("RAZON_DEST").ToString & """,")
                                        resb.Append("""DESC_CORTA_MONEDA"" :" & """" & row("DESC_CORTA_MONEDA").ToString & """,")
                                        resb.Append("""EMISION"" :" & """" & row("FECHA_EMISION").ToString & """,")
                                        resb.Append("""DESPACHADO_IND"" :" & """" & row("COMPLETO").ToString & """,")
                                        resb.Append("""DESPACHADO"" :" & """" & row("DESPACHADO").ToString & """,")
                                        resb.Append("""ALMC_CODE_ORIGEN"" :" & """" & row("ALMC_CODE_ORIGEN").ToString & """,")
                                        resb.Append("""ALMC_CODE_DESTINO"" :" & """" & row("ALMACEN_CODE_DESTINO").ToString & """,")
                                        resb.Append("""DESC_ALMC_ORIGEN"" :" & """" & row("DESC_ALMC_ORIGEN").ToString & """,")
                                        resb.Append("""DESC_ALMC_DESTINO"" :" & """" & row("DESC_ALMC_DESTINO").ToString & """,")
                                        resb.Append("""TOTAL"" :" & """" & row("IMPORTE_BIEN").ToString & """")
                                        resb.Append("}")
                                        resb.Append(",")
                                        'End If
                                    Next
                                    resb.Append("{}")
                                    resb = resb.Replace(",{}", String.Empty)
                                    resb.Append("]")
                                End If
                        End Select
                    ElseIf tipo_mov = "S" Then 'SALIDA
                        Select Case TIPO_DCTO
                            Case "0001", "0003", "0012", "0101" 'DOCUMENTOS DE VENTA
                                dt = New Nomade.NV.NVVenta("BN").ListarDocumentosVentaNaminsa(String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, CTLG_CODE, IIf(SCSL_CODE Is Nothing, "", SCSL_CODE), TIPO_DCTO, PIDM)
                                If Not (dt Is Nothing) Then
                                    resb.Append("[")
                                    For Each row As DataRow In dt.Rows
                                        If row("PAGADO_IND").ToString = "S" Then
                                            If row("ANULADO").ToString = "NO" And row("COMPLETO").ToString = "SI" And row("DESPACHADO_IND").ToString <> "S" And row("NOTA_CREDITO_IND").ToString = "N" Then
                                                resb.Append("{")
                                                resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                                resb.Append("""NRO_DOCUMENTO"" :" & """" & row("NUM_DCTO").ToString & """,")
                                                resb.Append("""PROVEEDOR"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                                resb.Append("""DESC_CORTA_MONEDA"" :" & """" & row("DESC_CORTA_MONEDA").ToString & """,")
                                                resb.Append("""EMISION"" :" & """" & row("EMISION").ToString & """,")
                                                resb.Append("""DESPACHADO_IND"" :" & """" & row("DESPACHADO_IND").ToString & """,")
                                                resb.Append("""DESPACHADO"" :" & """" & row("DESPACHADO").ToString & """,")
                                                resb.Append("""TOTAL"" :" & """" & row("IMPORTE").ToString & """")
                                                resb.Append("},")
                                            Else
                                                If row("ANULADO").ToString = "NO" And row("COMPLETO").ToString = "SI" And row("DESPACHADO_IND").ToString <> "S" And row("NOTA_CREDITO_IND").ToString = "N" _
                                                 And If(row("MOPA").ToString = "0002", True, If(row("PAGADO_IND").ToString = "S", True, False)) Then 'SI ES AL CREDITO SÍ SE LISTA, SINO SE VERIFICA QUE ESTÉ PAGADO
                                                    resb.Append("{")
                                                    resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                                    resb.Append("""NRO_DOCUMENTO"" :" & """" & row("NUM_DCTO").ToString & """,")
                                                    resb.Append("""PROVEEDOR"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                                    resb.Append("""DESC_CORTA_MONEDA"" :" & """" & row("DESC_CORTA_MONEDA").ToString & """,")
                                                    resb.Append("""EMISION"" :" & """" & row("EMISION").ToString & """,")
                                                    resb.Append("""DESPACHADO_IND"" :" & """" & row("DESPACHADO_IND").ToString & """,")
                                                    resb.Append("""DESPACHADO"" :" & """" & row("DESPACHADO").ToString & """,")
                                                    resb.Append("""TOTAL"" :" & """" & row("IMPORTE").ToString & """")
                                                    resb.Append("},")
                                                End If
                                            End If
                                        Else
                                            'If row("CONTRAENTREGA_IND").ToString = "S" And row("ANULADO").ToString = "NO" And row("COMPLETO").ToString = "SI" And row("DESPACHADO_IND").ToString <> "S" And row("NOTA_CREDITO_IND").ToString = "N" Then
                                            If row("ANULADO").ToString = "NO" And row("COMPLETO").ToString = "SI" And row("DESPACHADO_IND").ToString <> "S" And row("NOTA_CREDITO_IND").ToString = "N" Then
                                                resb.Append("{")
                                                resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                                resb.Append("""NRO_DOCUMENTO"" :" & """" & row("NUM_DCTO").ToString & """,")
                                                resb.Append("""PROVEEDOR"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                                resb.Append("""DESC_CORTA_MONEDA"" :" & """" & row("DESC_CORTA_MONEDA").ToString & """,")
                                                resb.Append("""EMISION"" :" & """" & row("EMISION").ToString & """,")
                                                resb.Append("""DESPACHADO_IND"" :" & """" & row("DESPACHADO_IND").ToString & """,")
                                                resb.Append("""DESPACHADO"" :" & """" & row("DESPACHADO").ToString & """,")
                                                resb.Append("""TOTAL"" :" & """" & row("IMPORTE").ToString & """")
                                                resb.Append("},")
                                            Else
                                                If row("ANULADO").ToString = "NO" And row("COMPLETO").ToString = "SI" And row("DESPACHADO_IND").ToString <> "S" And row("NOTA_CREDITO_IND").ToString = "N" _
                                             And If(row("MOPA").ToString = "0002", True, If(row("PAGADO_IND").ToString = "S", True, False)) Then 'SI ES AL CREDITO SÍ SE LISTA, SINO SE VERIFICA QUE ESTÉ PAGADO
                                                    resb.Append("{")
                                                    resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                                    resb.Append("""NRO_DOCUMENTO"" :" & """" & row("NUM_DCTO").ToString & """,")
                                                    resb.Append("""PROVEEDOR"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                                                    resb.Append("""DESC_CORTA_MONEDA"" :" & """" & row("DESC_CORTA_MONEDA").ToString & """,")
                                                    resb.Append("""EMISION"" :" & """" & row("EMISION").ToString & """,")
                                                    resb.Append("""DESPACHADO_IND"" :" & """" & row("DESPACHADO_IND").ToString & """,")
                                                    resb.Append("""DESPACHADO"" :" & """" & row("DESPACHADO").ToString & """,")
                                                    resb.Append("""TOTAL"" :" & """" & row("IMPORTE").ToString & """")
                                                    resb.Append("},")
                                                End If
                                            End If
                                        End If


                                    Next
                                    resb.Append("{}")
                                    resb = resb.Replace(",{}", String.Empty)
                                    resb.Append("]")
                                End If
                            Case "0028", "0052"
                                dt = New Nomade.CO.CORegistroCompras("BN").LISTAR_CABECERA_REQUECOMPRA(CTLG_CODE, SCSL_CODE, USUA_ID, 0, "APROBADO")
                                If Not (dt Is Nothing) Then
                                    resb.Append("[")
                                    For Each row As DataRow In dt.Rows
                                        resb.Append("{")
                                        resb.Append("""CODIGO"" :" & """" & row("CODE").ToString & """,")
                                        resb.Append("""NRO_DOCUMENTO"" :" & """" & row("CODE").ToString & """,")
                                        resb.Append("""PROVEEDOR"" :" & """" & row("USUARIO").ToString & """,")
                                        resb.Append("""TOTAL"" :" & """-""")
                                        resb.Append("},")
                                    Next
                                    resb.Append("{}")
                                    resb = resb.Replace(",{}", String.Empty)
                                    resb.Append("]")
                                End If
                            Case Else
                                resb.Append("[]")
                        End Select
                    End If
                    resb = resb.Replace("[{}]", "[]")
                    res = resb.ToString()
                Case "SENDMAIL"
                    context.Request.ContentType = "text/plain"
                    ISAC_CODE = context.Request("codigo")
                    Dim mail As New Nomade.Mail.NomadeMail("BN")
                    Dim HTML_TABLA_DETALLES As String = GenerarTablaDetISC(New Nomade.NA.NATipoMovimiento("BN").lista_detalle_dcto_almacen(ISAC_CODE, ""))
                    Dim remitente As String = context.Request("REMITENTE")
                    Dim nremitente As String = context.Request("NREMITENTE")
                    Dim destinatarios As String = context.Request("DESTINATARIOS")
                    Dim asunto As String = context.Request("ASUNTO")
                    Dim mensaje As String = context.Request("MENSAJE")

                    Dim empresa As String = context.Request("EMPRESA")
                    Dim tipo_mov As String = context.Request("TIPO_MOV")
                    Dim almacen As String = context.Request("ALMACEN")
                    Dim operacion As String = context.Request("OPERACION")
                    Dim secuencia As String = context.Request("SECUENCIA")
                    Dim emision As String = context.Request("EMISION")
                    Dim transaccion As String = context.Request("TRANSACCION")
                    Dim solicitante As String = context.Request("SOLICITANTE")
                    Dim recepcionado As String = context.Request("RECEPCIONADO")
                    Dim aux As String = context.Request("AUX")
                    Dim origen_destino As String = context.Request("ORIGEN_DESTINO")
                    Dim doc_origen As String = context.Request("DOC_ORIGEN")
                    Dim num_doc_origen As String = context.Request("NUM_DOC_ORIGEN")
                    Dim doc_registro As String = context.Request("DOC_REGISTRO")
                    Dim glosa As String = context.Request("GLOSA")

                    Dim CUERPO As String =
                        "<p>" & mensaje & "</p><hr>" &
                        "<h2>" & empresa & "</h2>" &
                        "<h3>" & tipo_mov & " EN " & almacen & " POR " & operacion & " SECUENCIA " & secuencia & "</h3>" &
                        "<p><strong>EMISION:</strong> " & emision & "</p><p><strong>MOVIMIENTO:</strong> " & transaccion & "</p>" &
                        "<p><strong>SOLICITANTE:</strong> " & solicitante & "</p><p><strong>RECEPCIONADO POR:</strong> " & recepcionado & "</p>" &
                        "<p><strong>" & aux & "</strong> " & origen_destino & " <strong>" & doc_origen & ": </strong>" & num_doc_origen & "</p>" &
                        "<p><strong>DOC. REGISTRO: </strong>" & doc_registro & "</p>" &
                        "<p><strong>GLOSA: </strong>" & glosa & "</p>" & HTML_TABLA_DETALLES

                    mail.enviar(remitente, nremitente, destinatarios, asunto, CUERPO)
                    res = "OK"

                Case "SENDWHATSAPP"
                    context.Request.ContentType = "text/plain"
                    Dim whatsapp As New Nomade.Mail.NomadeMail("Bn")
                    Dim plantilla = "Documento Venta"
                    Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_CODE & ".pdf"

                    res = GenerarPDF(p_CODE)
                    whatsapp.enviarWhatsapp(RECIPIENT_PHONE_NUMBER, p_CODE, MENSAJEWHATSAPP, plantilla, datoAj)

                Case "DescargarPDF"
                    res = GenerarPDF(p_CODE)

                Case "VL_SERIE_DOC"
                    context.Request.ContentType = "text/plain"
                    RAZON_DEST = context.Request("RAZON_DEST")
                    TIP_DCTO = context.Request("TIP_DCTO")
                    DCTO_ORGN_SERIE = context.Request("DCTO_ORGN_SERIE")
                    DCTO_ORGN = context.Request("DCTO_ORGN")
                    dt = New Nomade.NA.NATipoMovimiento("Bn").verificar_numero_serie_empresa(RAZON_DEST, TIP_DCTO, DCTO_ORGN_SERIE, DCTO_ORGN, ISAC_CODE)
                    Dim sAlmDestino As String = ""
                    Dim sAlmOrigen As String = ""
                    Dim sNroDoc As String = ""
                    Dim sSerie As String = ""
                    Dim sTipoDoc As String = ""

                    If Not (dt Is Nothing) Then


                        For Each row As DataRow In dt.Rows
                            sAlmDestino = row("FSBISAC_ALMC_DESTINO").ToString()
                            sAlmOrigen = row("FSBISAC_ALMC_CODE").ToString()
                            sNroDoc = row("NRO_DOC").ToString()
                            sSerie = row("SERIE_DOC").ToString()
                            sTipoDoc = row("TIPO_DOC").ToString()

                            If (sAlmDestino <> sAlmOrigen) And (sTipoDoc = TIP_DCTO) And (sNroDoc = DCTO_ORGN And sSerie = DCTO_ORGN_SERIE) Then
                                dt = Nothing
                            End If
                        Next
                    End If

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NRO_DOC"" :" & """" & row("NRO_DOC").ToString().ToLower & """,")
                            resb.Append("""SERIE_DOC"" :" & """" & row("SERIE_DOC").ToString & """,")
                            resb.Append("""TIPO_DOC"" :" & """" & row("TIPO_DOC").ToString & """,")
                            resb.Append("""PIDM_EMPRESA"" :" & """" & row("PIDM_EMPRESA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", "")
                        resb.Append("]")
                        resb.Replace("[{}]", "[]")
                        res = resb.ToString()
                    Else
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""NRO_DOC"" :" & """NO EXISTE""")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    End If
                Case "NUM_LINEAS_G"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Try
                        Dim impresora As New Nomade.Impresion.Global("Bn")
                        Dim dtx As DataTable = New DataTable()
                        dtx = impresora.ListarDatosImpresora("0009", "N")

                        If Not (dtx Is Nothing) Then
                            resb.Append("[")
                            For Each row As DataRow In dtx.Rows
                                resb.Append("{")
                                resb.Append("""DIRECCION_EMP"" :" & """" & row("DIRECCION_EMP").ToString().ToLower & """,")
                                resb.Append("""LINEAS"" :" & """" & row("LINEAS").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            Next
                            resb.Append("{}")
                            resb.Replace(",{}", "")
                            resb.Append("]")
                            resb.Replace("[{}]", "[]")
                            res = resb.ToString()
                        Else
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""LINEAS"" :" & """VACIO""")
                            resb.Append("}")
                            resb.Append("]")
                            res = resb.ToString()
                        End If
                    Catch ex As Exception
                        res = "ERROR AL LISTAR DATOS DE IMPRESORA"
                    End Try

                Case "00" 'Listar Empresas basico
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim r As New Nomade.NC.NCEmpresa("Bn")
                    dt = r.ListarEmpresaDatosBasicos(IIf(CTLG_CODE = Nothing, "", CTLG_CODE), "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """,")
                            resb.Append("""RUC"" :" & """" & row("RUC").ToString & """,")
                            resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()


                Case "GET_DOC_ALMACEN"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable()
                    Dim oMovAlmacen As New Nomade.NA.NATipoMovimiento("BN")
                    oDT = oMovAlmacen.fnGetDocAlmacen(p_CODE)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "TOTALES_DOC"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable()
                    Dim oMovAlmacen As New Nomade.NA.NATipoMovimiento("BN")
                    oDT = oMovAlmacen.fnTotalesDoc(p_CODIGO_NAM)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "GEN_ASIENTO" ' Suma fecha de emision más plazo de pago

                    'Verifica Parametro Contabilidad
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
                        Throw New System.Exception("[Advertencia2]: La empresa no tiene la opción contable activada.")
                    End If



                    'Obtiene Configuración de Almacén
                    Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")
                    Dim oDT_ConfigAsientoDocAlmacen As New DataTable
                    oDT_ConfigAsientoDocAlmacen = oCTMovimientoContable.fnGetConfigAsientoDocAlmacen(p_CODE)

                    'Obtiene Datos del Asiento de Almacén
                    Dim oDT_Asiento As New DataTable
                    oDT_Asiento = oCTMovimientoContable.fnGetAsientoContDocAlmacen(p_CODE)

                    'Obtiene Datos del documento de almacén
                    Dim sCodMovCont As String = ""
                    Dim oDT_DocAlmacen As New DataTable
                    Dim oMovAlmacen As New Nomade.NA.NATipoMovimiento("BN")
                    oDT_DocAlmacen = oMovAlmacen.fnGetDocAlmacen(p_CODE)
                    If oDT_DocAlmacen Is Nothing Then
                        Throw New System.Exception("No se pudo generar el Asiento Contable. No se encontró el documento de almacén.")
                    End If

                    Dim oDR_DocAlmacen As DataRow = oDT_DocAlmacen.NewRow
                    oDR_DocAlmacen = oDT_DocAlmacen.Rows(0)

                    Dim sAnuladoInd As String = oDR_DocAlmacen("AnuladoInd")
                    If sAnuladoInd.Equals("S") Then
                        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de almacén está anulado.")
                    End If

                    Dim sCompletoInd As String = oDR_DocAlmacen("CompletoInd")
                    If sCompletoInd.Equals("N") Then
                        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de almacén no está completado.")
                    End If

                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    Dim sFechaEmision As String = Utilities.fechaLocal(oDR_DocAlmacen("FECHA_EMISION"))
                    Dim sFechaTransac As String = Utilities.fechaLocal(oDR_DocAlmacen("FECHA_TRANS"))

                    sCodMovCont = oCTMovimientoContable.fnAgregarMovCont(oDR_DocAlmacen("CodEmpresa"), oDR_DocAlmacen("CodEstablec"), oDR_DocAlmacen("ANIO_PERIODO"),
                                                                         oDR_DocAlmacen("MES_PERIODO"), p_NCMOCONT_CODIGO, "A", sFechaEmision, sFechaTransac,
                                                                         oDR_DocAlmacen("GLOSA"), oDR_DocAlmacen("MONE_CODE"), oDR_DocAlmacen("TC"), oDR_DocAlmacen("PIDM"),
                                                                         oDR_DocAlmacen("CodDcto"), USUA_ID,, oTransaction)

                    Dim sCodProducto As String = ""
                    For Each oDR As DataRow In oDT_ConfigAsientoDocAlmacen.Rows
                        sCodProducto = oDR("PROD_CODE")
                        If IsDBNull(oDR("CTA_ID_DEBE")) Then
                            Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El producto '" + sCodProducto + "' no tiene configuración contable, para asiento de almacén.")
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

                    oMovAlmacen.fnActualizarCodContabDocAlmacen(p_CODE, sCodMovCont, oTransaction)

                    oTransaction.fnCommitTransaction()

                    res = sCodMovCont



                Case "IMP_GUIA"
                    Try
                        Dim codigo_catalogo As String = context.Request("CTLG_CODE")
                        Dim fecha_emecion As String = context.Request("FEC_EMISION")
                        Dim fecha_traslado As String = context.Request("FEC_TRANS")
                        Dim razsocial_destino As String = context.Request("RAZON_DEST_DESC")
                        Dim ruc_destino As String = context.Request("RUC_DEST")

                        Dim direccion_partida As String = ""
                        Dim direccion_destino As String = context.Request("DIRE")

                        Dim doc_org As String = ""
                        Dim doc_guia As String = ""

                        Dim nro_serie_org As String = context.Request("DCTO_ORGN_SERIE")
                        Dim nro_doc_org As String = context.Request("DCTO_ORGN")

                        doc_org = nro_serie_org & "-" & nro_doc_org

                        Dim nro_serie_reg As String = context.Request("SERIE_DCTO")
                        Dim nro_doc_reg As String = context.Request("DCTO_REG")

                        doc_guia = nro_serie_reg & "-" & nro_doc_reg

                        Dim observaciones As String = context.Request("CMMNT_DCTO")

                        Dim transportista As String = context.Request("RAZON_TRANS_DESC")
                        Dim ruc_transp As String = context.Request("RUC_TRANSP")
                        Dim certificado_insc As String = context.Request("CERTIFICADO")
                        Dim veh_marca As String = context.Request("txtvehiculo")
                        Dim veh_placa As String = context.Request("txtvehiculo")
                        Dim lic_conductor As String = context.Request("LIC_CONDUCIR")

                        Dim DETALLE_IMPR As String = context.Request("DETALLE_IMPR")

                        Dim impresora As New Nomade.Impresion.Global("Bn")
                        Dim nombre_impresora As String = ""


                        Dim filas As Array = Nothing
                        Dim colum As Array = Nothing
                        Dim nombre_producto As String = ""
                        Dim cantidad As String = ""
                        Dim unidad As String = ""
                        Dim code As String = ""
                        Dim num_items As Integer = 3
                        Dim num_filas As Integer = 0
                        'Dim parte_decimal As Integer = 0
                        'Dim nro_guias As Integer = 0
                        'Dim indice_inicio As Integer = 1
                        'Dim indice_fin As Integer = num_items
                        'Dim indice_compara As Integer = 0
                        Dim dataImp As DataTable = New DataTable()
                        Try
                            dataImp = impresora.ListarDatosImpresora("0009", codigo_catalogo)
                            If Not (dataImp Is Nothing) Then
                                nombre_impresora = dataImp.Rows(0)("IMPRESORA").ToString()
                                num_items = Convert.ToInt16(dataImp.Rows(0)("LINEAS").ToString())
                                direccion_partida = dataImp.Rows(0)("DIRECCION_EMP").ToString()
                            Else
                                ' nombre_impresora = impresora.GetImpresoraDefecto()
                            End If
                        Catch ex As Exception
                            res = "ERROR AL LISTAR DATOS DE IMPRESORA"
                        End Try


                        Dim formato_doc As New Nomade.Impresion.Formato("test") 'no proteger
                        Dim estructura As New Hashtable()
                        estructura = formato_doc.generarEstructura(codigo_catalogo, "GUIA_REMISION")
                        Dim doc As New Nomade.Impresion.Documento(estructura)
                        doc.fontSize = 9
                        doc.espacioEntreItems = 7
                        doc.AddDatos(fecha_emecion, estructura("txt_impr_fecha1x"), estructura("txt_impr_fecha1y"))
                        doc.AddDatos(fecha_traslado, estructura("txt_impr_fecha2x"), estructura("txt_impr_fecha2y"))
                        doc.AddDatos(direccion_partida, estructura("txt_impr_dir_partx_1"), estructura("txt_impr_dir_party_1"))

                        Dim dir_nueva_1 As String = ""
                        Dim dir_nueva_2 As String = ""
                        Dim dir_nueva_3 As String = ""
                        If (direccion_destino.Length >= 60) Then
                            Dim dir_llegada As Array = direccion_destino.Split(" ")

                            For i As Integer = 0 To (dir_llegada.Length - 1)
                                dir_nueva_1 = dir_nueva_1 & dir_llegada(i).ToString
                                If dir_nueva_1.Length < 60 Then
                                    If dir_llegada(i).ToString <> "" Then
                                        dir_nueva_2 = dir_nueva_2 & " " & dir_llegada(i).ToString
                                    End If

                                Else
                                    If dir_llegada(i).ToString <> "" Then
                                        dir_nueva_3 = dir_nueva_3 & " " & dir_llegada(i).ToString
                                    End If

                                End If
                            Next
                            doc.AddDatos(dir_nueva_2, estructura("txt_impr_dir_llegx_1"), estructura("txt_impr_dir_llegy_1"))
                            doc.AddDatos(dir_nueva_3, estructura("txt_impr_dir_llegx_2"), estructura("txt_impr_dir_llegy_2"))
                        Else
                            doc.AddDatos(direccion_destino, estructura("txt_impr_dir_llegx_1"), estructura("txt_impr_dir_llegy_1"))

                        End If





                        doc.AddDatos(veh_placa, estructura("txt_impr_marplacax"), estructura("txt_impr_marplacay"))


                        Dim razlg_nueva_1 As String = ""
                        Dim razlg_nueva_2 As String = ""
                        Dim razlg_nueva_3 As String = ""
                        If (razsocial_destino.Length >= 40) Then
                            Dim razlg_llegada As Array = razsocial_destino.Split(" ")

                            For i As Integer = 0 To (razlg_llegada.Length - 1)
                                razlg_nueva_1 = razlg_nueva_1 & razlg_llegada(i).ToString
                                If razlg_nueva_1.Length < 40 Then
                                    If razlg_llegada(i).ToString <> "" Then
                                        razlg_nueva_2 = razlg_nueva_2 & " " & razlg_llegada(i).ToString
                                    End If
                                Else
                                    If razlg_llegada(i).ToString <> "" Then
                                        razlg_nueva_3 = razlg_nueva_3 & " " & razlg_llegada(i).ToString
                                    End If
                                End If
                            Next
                            doc.AddDatos(razlg_nueva_2, estructura("txt_impr_nomrazdestx_1"), estructura("txt_impr_nomrazdesty_1"))
                            doc.AddDatos(razlg_nueva_3, estructura("txt_impr_nomrazdestx_2"), estructura("txt_impr_nomrazdesty_2"))

                        Else
                            doc.AddDatos(razsocial_destino, estructura("txt_impr_nomrazdestx_1"), estructura("txt_impr_nomrazdesty_1"))
                        End If

                        doc.AddDatos(ruc_destino, estructura("txt_impr_nrorucx"), estructura("txt_impr_nrorucy"))

                        'doc.AddDatos("FACTURA", estructura("txt_impr_tipo_docx"), estructura("txt_impr_tipo_docy"))
                        doc.AddDatos(doc_org, estructura("txt_impr_nro_docx"), estructura("txt_impr_nro_docy"))
                        doc.AddDatos(doc_guia, estructura("txt_impr_nro_docguix"), estructura("txt_impr_nro_docguiy"))

                        filas = DETALLE_IMPR.Split("|")
                        num_filas = filas.Length - 1
                        For con As Integer = INDICE_INI To INDICE_FIN
                            colum = filas(con - 1).ToString.Split("¬")
                            nombre_producto = colum(0).ToString.Replace(",", "")
                            cantidad = colum(1).ToString
                            unidad = colum(2).ToString
                            doc.AddItems(Decimal.Round(Convert.ToDecimal(cantidad), 2).ToString("###,00") + "," + nombre_producto.ToString + "," + unidad.ToString + ",,," + "")
                        Next
                        Try
                            doc.PrintFactura(nombre_impresora)
                            res = "OK"
                        Catch ex As Exception
                            res = "ERROR AL IMPRIMIR"
                        End Try
                    Catch ex As Exception
                        res = "ERROR"
                    End Try
                Case "IMPR"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    'USAR_IGV_IND = context.Request("USAR_IGV_IND") ' Si es nothing se usará el de la tabla
                    'COPIA_IND = context.Request("COPIA_IND") ' Si es nothing se imprimirá como si no fuera copia                        
                    res = GenerarDctoImprimir(CTLG_CODE, p_CODE)
                Case Else

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If

            Dim sMsjeError As String = ex.Message
            If sMsjeError.IndexOf("[Advertencia]") > -1 Then
                context.Response.Write(sMsjeError)
            Else
                context.Response.Write("[Error]: " & sMsjeError)
            End If

            'context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Private Function GenerarTablaDetISC(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table style=""border: 1px solid #ddd;border-collapse: separate;border-left: 0;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;clear: both;margin-bottom: 6px !important;max-width: none !important; width: 100%;"">"
            res &= "<thead style=""display: table-header-group;vertical-align: middle;border-color: inherit; background-color: #dddddd"">"
            res &= "<tr style=""display: table-row;vertical-align: inherit;border-color: inherit;"">"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">ITEM</th>"
            res &= "<th>PRODUCTO</th>"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">NRO SERIE</th>"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">CENTRO COSTO</th>"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">GARANTIA</th>"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">CANT.</th>"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">UNID.</th>"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">MONTO S/.</th>"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">MONTO US$</th>"
            res &= "<th style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">INC. IGV</th>"
            res &= "</tr>"
            res &= "</thead>"
            res &= "<tbody style=""display: table-header-group;vertical-align: middle;border-color: inherit;"">"
            For i As Integer = 0 To dt.Rows.Count - 1
                res &= "<tr style=""display: table-row;vertical-align: inherit;border-color: inherit;"">"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("ITEM").ToString() & "</td>"
                res &= "<td style=""padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("DESC_PRODUCTO").ToString() & "</td>"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("NRO_SERIE").ToString() & "</td>"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("CENTRO_COSTO").ToString() & "</td>"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("GARANTIA").ToString() & "</td>"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("CANTIDAD_BASE").ToString() & "</td>"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("DESC_UNME_BASE").ToString() & "</td>"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & FormatNumber(CDbl(dt.Rows(i)("TOTAL").ToString), 2) & "</td>"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & FormatNumber(CDbl(dt.Rows(i)("TOTAL_ALTERNO").ToString), 2) & "</td>"
                res &= "<td style=""text-align: center;padding: 8px;line-height: 20px;vertical-align: top;border-top: 1px solid #ddd;display: table-cell;"">" & dt.Rows(i)("INC_IGV").ToString() & "</td>"
                res &= "</tr>"
            Next
            res &= "</tbody>"
            res &= "</table>"
        Else
            res = "No se encontraron datos."
        End If
        Return res
    End Function

    Private Function GenerarPDFCorreo() As String
        Dim cNomArch As String = ""
        'Dim htmlText As New StringBuilder
        'If Not dt Is Nothing Then
        '    cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00120100" + "00" + "1" + "1" + "1" + "1" + ".pdf"
        'Else
        '    cNomArch = "LE" + p_RUC + p_ANIO + p_MES + "00120100" + "00" + "1" + "0" + "1" + "1" + ".pdf"
        'End If
        Return ""
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    Public Function GrabarDctoAlmc(ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_FECHA_EMISION As String, ByVal p_FECHA_TRANS As String,
                                   ByVal p_NUM_DCTO As String, ByVal p_PIDM_SOLICITANTE As String, ByVal p_REQC_CODE As String,
                                   ByVal p_REQC_NUM_SEQ_DOC As String, ByVal p_ORGN_CODE As String, ByVal p_RETORNO_IND As String, ByVal p_PIDM_ENTREGAR_A As String,
                                   ByVal p_TMOV_CODE As String, ByVal p_CMNT_DCTO As String, ByVal p_USUA_ID As String,
                                   ByVal p_TIPO_DOC_RAZON_DEST As String, ByVal p_RAZON_DEST As String, ByVal p_RAZON_TRANS As String, ByVal p_LICENCIA As String,
                                   ByVal p_CHOFER As String, ByVal p_DIRECCION As String, ByVal p_CERTIFICADO As String, ByVal p_PLACA As String, ByVal p_TIPO_DCTO As String,
                                   ByVal p_SERIE_DCTO As String, ByVal p_TIPO_DCTO_ORG As String, ByVal p_ALMC_DEST As String, ByVal p_MONTO As String, ByVal p_MONEDA As String,
                                   ByVal p_NUM_SEQ_DOC As String, ByVal p_ELECTRONICO As String, ByVal p_TIPO_TRANS As String, ByVal p_COD_AUT As String, ByVal p_DOCS_CODE As String,
                                   ByVal p_TIPO_DCTO_INTERNO As String, ByVal p_COD_AUT_INTERNO As String, ByVal p_TIPO_ENVIO As String, ByVal p_DIR_TRANS As String,
                                   ByVal p_DESC_VEHICULO As String, ByVal p_MARCA_FACT As String, ByVal p_PLACA_FACT As String, ByVal p_UBIGEO_ORIGEN As String,
                                   ByVal p_UBIGEO_DESTINO As String, ByVal p_DIREC_ORIGEN As String, ByVal p_DIREC_DESTINO As String, ByVal p_URBANIZACION_ORIGEN As String,
                                   ByVal p_URBANIZACION_DESTINO As String, ByVal p_PIDM_TRANSP As String, p_TIPO_DOC_TRANS As String, p_COSTO_TRANSPORTE As String) As String
        Dim OC As New Nomade.NC.NCCompra("Bn")
        Dim MovAl As New Nomade.NA.NATipoMovimiento("Bn")
        Dim FAC As New Nomade.NC.NCFactura("Bn")
        Dim dato As String
        dato = MovAl.insertar_dcto_almacen(p_CTLG_CODE, p_ALMC_CODE, p_FECHA_EMISION, p_FECHA_TRANS, p_NUM_DCTO, p_PIDM_SOLICITANTE, p_REQC_CODE, p_REQC_NUM_SEQ_DOC, p_ORGN_CODE,
                                           p_RETORNO_IND, p_PIDM_ENTREGAR_A, p_TMOV_CODE, p_CMNT_DCTO, p_USUA_ID, p_TIPO_DOC_RAZON_DEST, p_RAZON_DEST, p_RAZON_TRANS, p_LICENCIA,
                                           p_CHOFER, p_DIRECCION, p_CERTIFICADO, p_PLACA, p_TIPO_DCTO, p_SERIE_DCTO, p_TIPO_DCTO_ORG, p_ALMC_DEST, p_MONTO, p_MONEDA, p_NUM_SEQ_DOC, p_ELECTRONICO,
                                           p_TIPO_TRANS, p_COD_AUT, p_TIPO_DCTO_INTERNO, p_COD_AUT_INTERNO, p_TIPO_ENVIO, p_DIR_TRANS, p_DESC_VEHICULO, p_MARCA_FACT, p_PLACA_FACT,
                                           p_UBIGEO_ORIGEN, p_UBIGEO_DESTINO, p_DIREC_ORIGEN, p_DIREC_DESTINO, p_URBANIZACION_ORIGEN, p_URBANIZACION_DESTINO, p_PIDM_TRANSP, p_TIPO_DOC_TRANS, p_COSTO_TRANSPORTE)
        Return dato
    End Function

    Public Function ActualizarDctoAlmc(ByVal p_ISAC_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_FECHA_EMISION As String, ByVal p_FECHA_TRANS As String,
                                          ByVal p_NUM_DCTO As String, ByVal p_PIDM_SOLICITANTE As String, ByVal p_REQC_CODE As String, ByVal p_REQC_NUM_SEQ_DOC As String,
                                          ByVal p_ORGN_CODE As String, ByVal p_RETORNO_IND As String, ByVal p_PIDM_ENTREGAR_A As String, ByVal p_TMOV_CODE As String,
                                          ByVal p_CMNT_DCTO As String, ByVal p_USUA_ID As String, ByVal p_TIPO_DOC_RAZON_DEST As String, ByVal p_RAZON_DEST As String, ByVal p_RAZON_TRANS As String,
                                          ByVal p_LICENCIA As String, ByVal p_CHOFER As String, ByVal p_DIRECCION As String, ByVal p_CERTIFICADO As String,
                                          ByVal p_PLACA As String, ByVal p_TIPO_DCTO As String, ByVal p_SERIE_DCTO As String, ByVal p_TIPO_DCTO_ORG As String,
                                          ByVal p_ALMC_DEST As String, ByVal p_MONTO As String, ByVal p_MONTO_ALTERNO As String, ByVal p_MONEDA As String, ByVal p_NUM_SEQ_DOC As String,
                                          ByVal p_ELECTRONICO As String, ByVal p_TIPO_TRANS As String, ByVal p_TIPO_ENVIO As String, ByVal p_DIR_TRANS As String,
                                          ByVal p_DESC_VEHICULO As String, ByVal p_MARCA_FACT As String, ByVal p_PLACA_FACT As String, ByVal p_PIDM_TRANSP As String, ByVal p_TIPO_DOC_TRANS As String,
                                          ByVal p_COSTO_TRANSPORTE As String, ByVal p_UBIGEO_DESTINO As String, ByVal p_DIREC_DESTINO As String) As String
        Dim dato As String
        dato = New Nomade.NA.NATipoMovimiento("Bn").actualizar_dcto_almacen(p_ISAC_CODE, p_CTLG_CODE, p_ALMC_CODE, p_FECHA_EMISION, p_FECHA_TRANS, p_NUM_DCTO, p_PIDM_SOLICITANTE,
                                                                            p_REQC_CODE, p_REQC_NUM_SEQ_DOC,
                                           p_ORGN_CODE, p_RETORNO_IND, p_PIDM_ENTREGAR_A, p_TMOV_CODE, p_CMNT_DCTO, p_USUA_ID, p_TIPO_DOC_RAZON_DEST, p_RAZON_DEST, p_RAZON_TRANS,
                                           p_LICENCIA, p_CHOFER, p_DIRECCION, p_CERTIFICADO, p_PLACA, p_TIPO_DCTO, p_SERIE_DCTO, p_TIPO_DCTO_ORG, p_ALMC_DEST,
                                           p_MONTO, p_MONTO_ALTERNO, p_MONEDA, p_NUM_SEQ_DOC, p_ELECTRONICO, p_TIPO_TRANS, p_TIPO_ENVIO, p_DIR_TRANS, p_DESC_VEHICULO, p_MARCA_FACT, p_PLACA_FACT, p_PIDM_TRANSP, p_TIPO_DOC_TRANS,
                                           p_COSTO_TRANSPORTE, p_UBIGEO_DESTINO, p_DIREC_DESTINO)


        Return dato
    End Function

    Public Function GenerarTablaDetallesOrigen() As String
        dt = New Nomade.NA.NATipoMovimiento("BN").ListarDetalleOrigenDctoAlmacen(ISAC_CODE)
        resb.Append("<table id=""tblDetallesOrigen"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>CODIGO_PRODUCTO</th>")
        resb.AppendFormat("<th>CODIGO_MCDR</th>")
        resb.AppendFormat("<th>ITEM</th>")
        resb.AppendFormat("<th>CODIGO_ANTIGUO</th>")
        resb.AppendFormat("<th>PRODUCTO</th>")
        resb.AppendFormat("<th>ALMACÉN<br/>ORIGEN</th>")
        resb.AppendFormat("<th>CANTIDAD<br/>ORIGEN</th>")
        resb.AppendFormat("<th>ESTADO<br/>DESPACHO</th>")
        'resb.AppendFormat("<th>AGREGADO<br/> A ESTE DCTO</th>")
        resb.AppendFormat("<th>STOCK</th>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("SERVICIO").ToString() <> "000003500" Then
                    If dt.Rows(i)("ESTADO_PRODUCTO").ToString() = "N" Then
                        resb.Append("<tr>")
                        resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                        resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO_PRODUCTO").ToString())
                        resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO_MCDR").ToString())
                        resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ITEM").ToString())
                        resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO_ANTIGUO").ToString())
                        resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_PRODUCTO").ToString())
                        resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_ALMACEN").ToString())
                        resb.AppendFormat("<td align='center' >{0:n}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD").ToString), 2))
                        resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CANTIDAD_NO_INGRESADA").ToString())
                        'resb.AppendFormat("<td align='center' >{0:n}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD_NO_INGRESADA").ToString), 2))
                        'resb.AppendFormat("<td align='center' >{0:n}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD_AGREGADA").ToString), 2))
                        'resb.AppendFormat("<td align='center' >{0:n}</td>", FormatNumber(CDbl(dt.Rows(i)("STOCK").ToString), 2))

                        If dt.Rows(i)("STOCK").ToString = "" Then
                            resb.AppendFormat("<td align='center' >{0:n}</td>", "")
                        Else
                            resb.AppendFormat("<td align='center' >{0:n}</td>", FormatNumber(CDbl(dt.Rows(i)("STOCK").ToString), 2))
                        End If
                        resb.Append("</tr>")
                    Else
                        If dt.Rows(i)("ESTADO_PRODUCTO").ToString() = "S" Then
                            resb.Append("<tr>")
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO_PRODUCTO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO_MCDR").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ITEM").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO_ANTIGUO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_PRODUCTO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_ALMACEN").ToString())
                            resb.AppendFormat("<td align='center' >{0:n}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD").ToString), 2))
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CANTIDAD_NO_INGRESADA").ToString())
                            ' resb.AppendFormat("<td align='center' >{0:n}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD_NO_INGRESADA").ToString), 2))
                            'resb.AppendFormat("<td align='center' >{0:n}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD_AGREGADA").ToString), 2))
                            'resb.AppendFormat("<td align='center' >{0:n}</td>", FormatNumber(CDbl(dt.Rows(i)("STOCK").ToString), 2))

                            If dt.Rows(i)("STOCK").ToString = "" Then
                                resb.AppendFormat("<td align='center' >{0:n}</td>", "")
                            Else
                                resb.AppendFormat("<td align='center' >{0:n}</td>", FormatNumber(CDbl(dt.Rows(i)("STOCK").ToString), 2))
                            End If

                            resb.Append("</tr>")
                        End If
                    End If
                End If

            Next
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        Return resb.ToString
    End Function

    Public Function GenerarDctoImprimir(ByVal CTLG_CODE As String, ByVal p_CODE As String) As String
        Dim tabla As New StringBuilder

        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        Dim dtEmpresas As New DataTable
        'Dim dtParametroLogo As New DataTable

        Dim dtParametroPiePagina As New DataTable
        Dim onGuiaRemision As New Nomade.NA.NATransferenciaAlmacen("Bn")
        'Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")

        dtCabecera = onGuiaRemision.ListarDatosCabeceraGuiaRemision(CTLG_CODE, p_CODE)
        dtDetalles = onGuiaRemision.ListarDatosDetalleGuiaRemision(CTLG_CODE, p_CODE)
        'dtParametroLogo = New Nomade.NC.NCParametros("Bn").ListarParametros("LOVE", "")

        'dtParametroPiePagina = New Nomade.NC.NCParametros("Bn").ListarParametros("PPAG", "")

        If dtCabecera IsNot Nothing Then
            Dim rutaLogo As String = ""

            'VARIABLE PARA COLOCAR EL QR EN EL PDF
            Dim rutaQr As String = ""
            'VARIABLE PARA COLOCAR LA INFORMACIÓN DEL QR
            Dim cadenaQR As String = ""
            'PIE DE PAGINA EDITABLE
            Dim pie_pagina As String = ""

            Dim mon As String = dtCabecera.Rows(0)("SIMBOLO_MONEDA") 'Simbolo de moneda     
            Dim descMon As String = dtCabecera.Rows(0)("DESC_MONEDA") 'Descripcion de moneda   

            Dim codeMoneda As String = dtCabecera.Rows(0)("MONEDA") 'Código de Moneda

            Dim totalSinDscto As Decimal = 0
            Dim totalPeso As Decimal = 0
            'OBTENER LOGO
            'dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("EMPRESA"), "A", "")
            rutaLogo = dtCabecera.Rows(0)("RUTA_IMAGEN").ToString

            'OBTENER EL TEXTO QUE VA A IR EN LA IMPRESION COMO PIE DE PAGINA
            'pie_pagina = dtParametroPiePagina(0)("DESCRIPCION_DETALLADA").ToString

            'Cadena con la información del QR
            cadenaQR = "6" + "|" + dtCabecera(0)("RUC_EMPRESA").ToString + "|" + dtCabecera(0)("tipDocDestinatario").ToString + "|" + dtCabecera(0)("numDocDestinatario").ToString + "|" + "09" + "|" + dtCabecera(0)("serNumDocGuia").ToString + "|" + dtCabecera(0)("FECHA_SUNAT").ToString + "|" + dtCabecera(0)("psoBrutoTotalBienesDatosEnvio").ToString '+ "|" + dtCabecera(0)("IMPORTE_TOTAL").ToString

            'LA RUTA QUE VA A TENER
            'rutaQr = "data:image/png;base64," + codigoQR.fnGetCodigoQR(p_CODE, CTLG_CODE)
            rutaQr = "data:image/png;base64," + fnGetCodigoQR_fast(cadenaQR)

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
            If (dtCabecera.Rows(0)("RUC_EMPRESA").substring(0, 2) = "10") Then 'DPORTA 10/12/2021
                tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_CORTA_EMPRESA"))
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>De: {0}</td></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            Else
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>De: {0}</td></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            End If
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>RUC {0}</th></tr>", dtCabecera.Rows(0)("RUC_EMPRESA"))
            tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION"))
            tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>TELEF: {0}</td></tr>", dtCabecera.Rows(0)("TELEFONO"))
            tabla.Append("</thead>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DOCUMENTO"))
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("serNumDocGuia"))
            tabla.Append("</thead>")

            tabla.Append("<tbody>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Cliente<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("rznSocialDestinatario"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>{0}<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("numDocDestinatario"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Dirección Destino <span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("dirLlegada"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Dirección Origen<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("dirPartida"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Motivo Traslado<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("desMotivoTrasladoDatosEnvio"))
            If dtCabecera.Rows(0)("tipDocGuia") = "0012" Then
                tabla.AppendFormat("<tr><td  style='vertical-align: top;'><strong>Nro Maq<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
            Else
                tabla.AppendFormat("<tr><td  style='vertical-align: top;'><strong>Autorización<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
            End If
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Sucursal<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_SUCURSAL"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Vendedor<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("VENDEDOR_USUA_ID")) 'VENDEDOR
            'tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Condición pago<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MODO_PAGO")) 'Modo de pago
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha Emisión<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("EMISION")) 'Feha y Hora
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha Movimiento.<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("MOVIMIENTO")) 'Feha Vencimiento
            'If dtCabecera.Rows(0)("MOPA") = "0002" Then
            '    tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Cuotas<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("CUOTAS")) 'Cuotas
            'End If
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Glosa<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("GLOSA")) 'GLOSA

            tabla.Append("</tbody></table>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;border-bottom: 1px dashed black;'>")
            tabla.Append("<td style='text-align: left;'><strong>Cant.</strong></td><td style='text-align: left;'><strong>U.m.</strong></td><td style='text-align: left;padding-left:5px;' colspan='2'><strong>Descripción</strong></td><td style='text-align: right;'><strong>Peso (Kg)</strong></td>")
            tabla.Append("</tr>")

            For Each row In dtDetalles.Rows
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Decimal.Parse(row("canItem")))
                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", row("descUnidadMedida").ToString())
                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", row("desItem").ToString())
                tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", Decimal.Parse(row("pesoItem")))
                tabla.Append("</tr>")
                totalPeso += Decimal.Parse(row("pesoItem"))
            Next
            tabla.Append("</tbody></table>")
            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.AppendFormat("<td colspan='3'><strong>Peso total (Kg)</strong></td>")
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", totalPeso)
            tabla.Append("</tr>")


            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            tabla.AppendFormat("<td colspan='4'><strong>DATOS DEL TRANSPORTISTA</strong></td>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")

            tabla.Append("<tbody>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Tipo de Transporte<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("descModTrasladoDatosEnvio"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Transportista<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("nomTransportista"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Vehículo, Marca, Placa<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("VEHICULO_MARCA_PLACA"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Certificado de Inscripción<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("NRO_CERTIFICADO"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Chofer<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("nomConductorTransPrivado"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Licencia de Conducir<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("LICENCIA"))

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong></strong></td>")
            tabla.Append("</tr>")
            tabla.Append("</tbody></table>")

            tabla.Append("<table border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'><tbody>")
            If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" Then
                'LUGAR DONDE SE VA A DIBUJAR EL QR EN EL PDF
                tabla.Append("<table' border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'>")
                tabla.Append("<thead>")
                tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px' src='{0}'></th> </tr>", rutaQr)
                tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
                tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><strong>Representación impresa de la <span style='float:right'></span></strong>{0}</th></tr>", dtCabecera.Rows(0)("DOCUMENTO"))
                If dtCabecera.Rows(0)("tipDocGuia") = "0012" Then
                    tabla.AppendFormat("<tr><td  style='vertical-align: top;'><strong>Nro Maq<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
                Else
                    tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><strong>Autorizado mediante <span style='float:right'></span></strong>{0}</th></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
                End If
            End If

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            'tabla.Append("<tr style='border-top: 1px dashed black;'>")
            'tabla.Append("<td colspan='4' style='text-align: center;'>Escribanos al correo: <strong>informes@orbitum.org</strong></td>")
            'If dtParametroPiePagina IsNot Nothing Then 'PIE DE PAGINA 
            If dtCabecera.Rows(0)("ELECTRONICO_IND") = "S" Then
                'If Not pie_pagina = "" Then
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", "Para consultar el documento ingrese a http://52.41.93.228:1115, debe estar disponible dentro de las próximas 48 hrs. a partir de la fecha de emisión.")
                'tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><span style='float:right'></span>{0}</th></tr>", pie_pagina)
                'End If
            Else
                tabla.Append("<td colspan='4' style='text-align: center;'>GRACIAS POR SU PREFERENCIA</td>")
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

    Public Function GenerarPDF(ByVal NOMBRE As String) As String
        Dim ress As String = ""
        Dim htmlText As String = ""
        Dim cNomArch As String = NOMBRE & ".pdf"
        htmlText = GenerarDctoImprimir(CTLG_CODE, p_CODE)
        HTMLToPDF(htmlText, cNomArch)
        ress = "OK"
        Return ress
    End Function

    Sub HTMLToPDF(ByVal HTML As String, ByVal nombreArchivo As String)

        Dim archivo, res As String
        res = "Archivos\" + nombreArchivo
        archivo = HttpContext.Current.Server.MapPath("~") + res
        If My.Computer.FileSystem.FileExists(archivo) Then
            My.Computer.FileSystem.DeleteFile(archivo)
        End If

        Dim converter = New HtmlToPdf()
        converter.Options.PdfPageSize = PdfPageSize.A4
        converter.Options.MarginTop = 1.9
        converter.Options.AutoFitWidth = HtmlToPdfPageFitMode.AutoFit
        converter.Options.AutoFitHeight = HtmlToPdfPageFitMode.AutoFit
        converter.Options.MarginTop = 20
        converter.Options.MarginBottom = 20
        converter.Options.MarginLeft = 20
        converter.Options.MarginRight = 20

        Dim doc As SelectPdf.PdfDocument = converter.ConvertHtmlString(HTML)

        doc.Save(archivo)
        doc.Close()
    End Sub

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

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

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
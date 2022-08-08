<%@ WebHandler Language="VB" Class="CAMNOCL" %>

Imports iTextSharp.text
Imports iTextSharp.text.pdf
Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.IO.FileStream

Public Class CAMNOCL : Implements IHttpHandler

    Dim OPCION As String
    Dim USUARIO As String

    Dim SUBGRUP_CODE, CTLG_CODE, USUA_ID, DEPEND_CODE, DESC, CODE_EXIS, ESTADO_IND, GRUP_CODE, SCSL_CODE, TIPO_DOC_CODE As String

    Dim COMPRA_VENTA_CODE, ITEM As String
    Dim COMPRA_VENTA_NUM_SEQ_DOC, ITEM2 As String

    Dim p_NUM_SEQ_DOC, p_ORIGEN_CODE, p_ORIGEN_TIPO_DOC, p_ORIGEN_IMPORTE, p_DESTINO_CODE, p_DESTINO_TIPO_DOC, p_PERS_PIDM,
        p_CTLG_CODE, p_SCSL_CODE, p_COMPRA_VENTA_IND, p_MONTO_TOTAL, p_ESTADO_USO, p_USUA_ID, p_ESTADO_IND, p_SERIE, p_NUMERO, p_IGV, p_COD_MOTIVO_NC, p_MONTO_GRAVADO, p_MONTO_INAFECTA, p_MONTO_EXONERADO, p_MONTO_ISC As String

    Dim p_NOCC_CODE, p_NOCC_NUM_SEQ_DOC, p_PROD_CODE, p_UNME_CODE, p_CANTIDAD_DEVL, p_ORIGEN_PRECIO_UNIT,
        p_MONTO_SUBTOTAL, p_CANTIDAD_ORIGEN As String
    Dim p_ENTREGA_DESPACHO_ALMACEN, p_APLICA_DOC_REFERENCIA, CODIGO_DOC As String
    Dim p_CODIGO_CORRELATIVO As String

    Dim p_FECHA_EMISION, p_DETALLES, p_MONTO_IGV, p_GLOSA As String

    Dim ANULAC_ID, CMNT_ANULAC, DEVOLUCION_EFECTIVO, DEVOLUCION_DESPACHO, GENERICA_IND As String

    Dim p_DESPACHADO_IND, p_COBRADO_IND As String

    Dim p_FTVMOSU_CODE As String
    Dim p_FTVMOSU_IND_ESTADO As String
    Dim p_SI_NO As String
    'QR
    Dim p_IMGQR, p_CODE As String

    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncProvedor As New Nomade.NC.NCEProveedor("Bn")
    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    'Dim ncTipoDocumento As New Nomade.NC.NCTipoDC("Bn")
    Dim ncTipoDCEmpresa As New Nomade.NC.NCTipoDCEmpresa("Bn")
    Dim caNotaCredito As New Nomade.CA.NotaCredito("Bn")
    Dim ncFactura As New Nomade.NC.NCFactura("Bn")
    Dim gesPro As New Nomade.NM.NMGestionProductos("Bn")


    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    'correo
    Dim REMITENTE, DESTINATARIOS, ASUNTO, MENSAJE As String


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        CTLG_CODE = context.Request("CTLG_CODE")
        USUA_ID = context.Request("USUA_ID")
        SCSL_CODE = context.Request("SCSL_CODE") 'Codigo establecimiento/sucursal
        TIPO_DOC_CODE = context.Request("TIPO_DOC_CODE")

        COMPRA_VENTA_CODE = context.Request("COMPRA_VENTA_CODE")
        COMPRA_VENTA_NUM_SEQ_DOC = context.Request("COMPRA_VENTA_NUM_SEQ_DOC")

        p_NUM_SEQ_DOC = context.Request("p_NUM_SEQ_DOC")
        p_ORIGEN_CODE = context.Request("p_ORIGEN_CODE")
        p_ORIGEN_TIPO_DOC = context.Request("p_ORIGEN_TIPO_DOC")
        p_ORIGEN_IMPORTE = context.Request("p_ORIGEN_IMPORTE")
        p_DESTINO_CODE = context.Request("p_DESTINO_CODE")
        p_DESTINO_TIPO_DOC = context.Request("p_DESTINO_TIPO_DOC")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_COMPRA_VENTA_IND = context.Request("p_COMPRA_VENTA_IND")
        p_MONTO_TOTAL = context.Request("p_MONTO_TOTAL")
        p_ESTADO_USO = context.Request("p_ESTADO_USO")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_SERIE = context.Request("p_SERIE")
        p_NUMERO = context.Request("p_NUMERO")
        p_IGV = context.Request("p_IGV")
        p_COD_MOTIVO_NC = context.Request("p_COD_MOTIVO_NC")

        p_MONTO_GRAVADO = context.Request("p_MONTO_GRAVADO")
        p_MONTO_INAFECTA = context.Request("p_MONTO_INAFECTA")
        p_MONTO_EXONERADO = context.Request("p_MONTO_EXONERADO")
        p_MONTO_ISC = context.Request("p_MONTO_ISC")

        p_DESPACHADO_IND = context.Request("p_DESPACHADO_IND")
        p_COBRADO_IND = context.Request("p_COBRADO_IND")

        p_IMGQR = context.Request("p_IMGQR")
        p_CODE = context.Request("p_CODE")

        'Detalles         
        p_NOCC_CODE = (context.Request("p_NOCC_CODE"))
        p_NOCC_NUM_SEQ_DOC = (context.Request("p_NOCC_NUM_SEQ_DOC"))
        p_PROD_CODE = (context.Request("p_PROD_CODE"))
        p_UNME_CODE = (context.Request("p_UNME_CODE"))
        p_CANTIDAD_DEVL = (context.Request("p_CANTIDAD_DEVL"))
        p_ORIGEN_PRECIO_UNIT = (context.Request("p_ORIGEN_PRECIO_UNIT"))
        p_MONTO_SUBTOTAL = (context.Request("p_MONTO_SUBTOTAL"))
        p_CANTIDAD_ORIGEN = (context.Request("p_CANTIDAD_ORIGEN"))
        p_ENTREGA_DESPACHO_ALMACEN = context.Request("p_ENTREGA_DESPACHO_ALMACEN")
        p_APLICA_DOC_REFERENCIA = context.Request("p_APLICA_DOC_REFERENCIA")
        CODIGO_DOC = context.Request("CODIGO_DOC")
        '
        p_CODIGO_CORRELATIVO = context.Request("p_CODIGO_CORRELATIVO")

        p_FECHA_EMISION = context.Request("p_FECHA_EMISION")
        p_DETALLES = context.Request("p_DETALLES")
        p_MONTO_IGV = context.Request("p_MONTO_IGV")
        p_GLOSA = context.Request("p_GLOSA")

        'ANULACION
        ANULAC_ID = context.Request("ANULAC_ID")
        CMNT_ANULAC = vChar(context.Request("CMNT_ANULAC"))
        DEVOLUCION_EFECTIVO = context.Request("DEVOLUCION_EFECTIVO")
        DEVOLUCION_DESPACHO = context.Request("DEVOLUCION_DESPACHO")
        GENERICA_IND = context.Request("GENERICA_IND")

        p_FTVMOSU_CODE = context.Request("p_FTVMOSU_CODE")
        p_FTVMOSU_CODE = IIf(p_FTVMOSU_CODE Is Nothing, "", p_FTVMOSU_CODE)
        p_FTVMOSU_IND_ESTADO = context.Request("p_FTVMOSU_IND_ESTADO")
        p_FTVMOSU_IND_ESTADO = IIf(p_FTVMOSU_IND_ESTADO Is Nothing, "", p_FTVMOSU_IND_ESTADO)

        p_SI_NO = context.Request("p_SI_NO")

        ' correo
        REMITENTE = context.Request("REMITENTE")
        DESTINATARIOS = context.Request("DESTINATARIOS")
        ASUNTO = context.Request("asunto")
        MENSAJE = context.Request("MENSAJE")

        Try

            Select Case OPCION
                Case "0" 'lista empresas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncEmpresa.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "1" 'lista sucursales
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncSucursal.ListarSucursal(CTLG_CODE, "", "A")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "3" 'lista Clientes
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'dt = ncCliente.ListarClienteAuto("", "", "", "X", p_CTLG_CODE)
                    dt = ncCliente.ListarCliente("", "A", p_CTLG_CODE, "S")
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                        'resb.Append("[")
                        'For Each row As DataRow In dt.Rows
                        '    resb.Append("{")
                        '    resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL").ToString & """,")
                        '    resb.Append("""PIDM"" :" & """" & row("PIDM").ToString & """,")
                        '    resb.Append("""DNI"" :" & """" & row("DNI").ToString & """,")
                        '    resb.Append("""RUC"" :" & """" & row("RUC").ToString & """,")
                        '    resb.Append("""CATE_DESC"" :" & """" & row("CATE_DESC").ToString & """,")
                        '    resb.Append("""TELEFONO"" :" & """" & row("TELEFONO").ToString & """,")
                        '    resb.Append("""DIRECCION"" :" & """" & row("DIRECCION").ToString & """,")
                        '    resb.Append("""NRO_DOCUMENTO"" :" & """" & row("NRO_DOCUMENTO").ToString & """,")
                        '    resb.Append("""CODIGO_TIPO_DOCUMENTO"" :" & """" & row("CODIGO_TIPO_DOCUMENTO").ToString & """,")
                        '    resb.Append("""TIPO_DOCUMENTO"" :" & """" & row("TIPO_DOCUMENTO").ToString & """")
                        '    resb.Append("}")
                        '    resb.Append(",")
                        'Next
                        'resb.Append("{}")
                        'resb = resb.Replace(",{}", String.Empty)
                        'resb.Append("]")
                    Else
                        res = "[]"

                    End If
                Case "4" 'lista documentos
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncTipoDCEmpresa.ListarTipoDCEmpresa("", p_CTLG_CODE, "", "", "", "", "E")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DCTO_DESC_CORTA", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("DCTO_CODE").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("SUNAT_CODE").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DCTO_DESC").ToString & """,")
                            resb.Append("""DESCRIPCION_CORTA"" :" & """" & MiDataRow("DCTO_DESC_CORTA").ToString & """,")
                            resb.Append("""COMPRA_VENTA"" :" & """" & MiDataRow("COMPRA_VENTA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "6" 'lista documentos de venta
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caNotaCredito.ListarDocumentosVentaNotaCredito(CTLG_CODE, SCSL_CODE, TIPO_DOC_CODE, USUA_ID)
                    res = GenerarTablaDocumentos(dt)


                Case "8" 'Lista detalles venta
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                    'dt = caNotaCredito.lista_detalle_dcto_venta(COMPRA_VENTA_CODE, COMPRA_VENTA_NUM_SEQ_DOC, "")
                    'dt = nvVenta.ListarDetalleDocumentoVenta(If(COMPRA_VENTA_CODE = Nothing, "", COMPRA_VENTA_CODE), "0", "")
                    dt = nvVenta.ListarDetalleDocumentoVenta2(If(COMPRA_VENTA_CODE = Nothing, "", COMPRA_VENTA_CODE), "0", "") 'DPORTA
                    res = GenerarTablaDetallesVenta(dt, p_COD_MOTIVO_NC)

                Case "9" 'Registrar nota de credito
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array




                    array = caNotaCredito.CrearNotaCreditoMotivo(p_NUM_SEQ_DOC, p_ORIGEN_CODE, p_ORIGEN_TIPO_DOC, p_ORIGEN_IMPORTE, p_DESTINO_CODE,
                                                           p_DESTINO_TIPO_DOC, p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_COMPRA_VENTA_IND,
                                                           p_MONTO_TOTAL, p_ESTADO_USO, p_USUA_ID, "A", p_SERIE, p_NUMERO, p_ENTREGA_DESPACHO_ALMACEN, p_APLICA_DOC_REFERENCIA, p_CODIGO_CORRELATIVO,
                                                           Utilities.fechaLocal(p_FECHA_EMISION), p_MONTO_IGV, p_DETALLES, "", "", p_IGV, p_COD_MOTIVO_NC, p_SI_NO, p_MONTO_GRAVADO, p_MONTO_INAFECTA,
                                                           p_MONTO_EXONERADO, p_MONTO_ISC, p_GLOSA, p_DESPACHADO_IND, p_COBRADO_IND)
                    If Not (array Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""DATOS_QR"" :" & """" & array(1).ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & array(2).ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "10" 'Registrar detalle nota de credito
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = caNotaCredito.CrearDetalleNotaCredito(p_NOCC_CODE, p_NOCC_NUM_SEQ_DOC, p_PROD_CODE, p_UNME_CODE, p_CANTIDAD_DEVL,
                                                              p_ORIGEN_PRECIO_UNIT, p_MONTO_SUBTOTAL, p_CTLG_CODE, p_SCSL_CODE,
                                                              p_ORIGEN_IMPORTE, p_USUA_ID, "A", p_CANTIDAD_ORIGEN)
                Case "11" 'Lista detalles notaCredito
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caNotaCredito.ListarDetallesNotaCredito(p_NOCC_CODE, p_NOCC_NUM_SEQ_DOC, "0")
                    res = GenerarTablaDetallesNotaCredito(dt)

                Case "13" 'lista documentos de venta
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caNotaCredito.ListarDocumentosVenta(CODIGO_DOC, "", "", "", "", CTLG_CODE, "", "", "")
                    If Not (dt Is Nothing) Then
                        Dim serie_numero As String() = dt.Rows(0)("NUM_DCTO").ToString().Split(New Char() {"-"})
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & serie_numero(0) & """,")
                            resb.Append("""NUMERO"" :" & """" & serie_numero(1) & """,")
                            resb.Append("""SECUENCIA"" :" & """" & MiDataRow("SECUENCIA").ToString & """,")
                            resb.Append("""TIPO_DCTO"" :" & """" & MiDataRow("TIPO_DCTO").ToString & """,")
                            resb.Append("""DESC_DCTO"" :" & """" & MiDataRow("DOCUMENTO").ToString & """,")
                            resb.Append("""EMISION"" :" & """" & MiDataRow("EMISION").ToString & """,")
                            resb.Append("""NUM_DCTO"" :" & """" & MiDataRow("NUM_DCTO").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""MONEDA"" :" & """" & MiDataRow("MONEDA").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"" :" & """" & MiDataRow("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""MONEDA"" :" & """" & MiDataRow("MONEDA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "DEUDA" 'LISTAR DEUDA DOCUMENTO DE ORIGEN
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim ccCuentaPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
                    dt = ccCuentaPorCobrar.ListarDeudasDeCliente(p_CTLG_CODE, "", "A", p_PERS_PIDM)
                    Dim deuda As String = ""

                    If Not (dt Is Nothing) Then

                        For Each row As DataRow In dt.Rows
                            If row("CODIGO") = p_ORIGEN_CODE Then
                                If row("ES_MONEDA_BASE").ToString = "S" Then
                                    deuda = row("POR_PAGAR_BASE").ToString
                                Else
                                    deuda = row("POR_PAGAR_ALTER").ToString
                                End If
                            End If
                        Next
                    End If


                    If deuda = "" Then
                        deuda = "NO_ENCONTRADO"
                    End If
                    res = deuda
                Case "GQR" 'Parametros para guardar el QR
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                    res = nvVenta.GuardarCodigoQR(p_NOCC_CODE, p_IMGQR)
                Case "GENERAR_PDF" 'DPORTA
                    Dim msgError As String = "OK"
                    Dim dtCabecera As New DataTable
                    'dtCabecera = caNotaCredito.ListarCabNotaCreditoImpresion(p_NOCC_CODE)
                    If p_CODE.Length = 9 Then 'And dtCabecera.Rows(0)("ESTADO_IND") = "A" Then
                        Try
                            GenerarPDF(p_CODE, p_CTLG_CODE)
                        Catch ex As Exception
                            msgError = "ERROR: " + ex.Message
                        End Try
                    Else
                        msgError = "ERROR"
                    End If
                    res = msgError.ToString()
                'Case "correo"
                '    Dim email As New Nomade.Mail.NomadeMail("Bn")

                '    'CAMBIAR EL primer NREMITENTE POR EL NOMBRE DEL USUARIO
                '    'If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_NOCC_CODE & ".pdf") Then
                '    'GenerarPDF(p_NOCC_CODE, p_CTLG_CODE)
                '    'End If
                '    'Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_NOCC_CODE & ".pdf"

                '    MENSAJE += "<br>"
                '    Dim documento As String = ""
                '    documento = GenerarDctoCorreo(p_NOCC_CODE, p_CTLG_CODE)
                '    MENSAJE += documento

                '    email.enviar(REMITENTE, REMITENTE, DESTINATARIOS, ASUNTO, MENSAJE)
                Case "correo"
                    Dim email As New Nomade.Mail.NomadeMail("Bn")

                    'CAMBIAR EL primer NREMITENTE POR EL NOMBRE DEL USUARIO
                    'If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_NOCC_CODE & ".pdf") Then
                    'GenerarPDF(p_NOCC_CODE, p_CTLG_CODE)
                    'End If
                    'Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_NOCC_CODE & ".pdf"
                    GenerarPDF(p_NOCC_CODE, p_CTLG_CODE)
                    'End If
                    Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_NOCC_CODE & ".pdf"

                    MENSAJE += "<br>"
                    Dim documento As String = ""
                    documento = GenerarDctoCorreo(p_NOCC_CODE, p_CTLG_CODE)
                    MENSAJE += documento

                    'email.enviar(REMITENTE, REMITENTE, DESTINATARIOS, ASUNTO, MENSAJE)
                    email.enviar(REMITENTE, REMITENTE, DESTINATARIOS, ASUNTO, MENSAJE, datoAj)
                Case "ANULAR" 'ANULAR NOTA DE CREDITO CLIENTE
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = caNotaCredito.AnularNotaCreditoCliente(p_NOCC_CODE, ANULAC_ID, CMNT_ANULAC,
                                                       If(DEVOLUCION_EFECTIVO = Nothing, "N", DEVOLUCION_EFECTIVO),
                                                       If(DEVOLUCION_DESPACHO = Nothing, "N", DEVOLUCION_DESPACHO),
                                                       If(GENERICA_IND = Nothing, "N", GENERICA_IND))

                Case "LMOTSUNAT" 'LISTAR MOTIVOS SUNAT
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caNotaCredito.fnListarMotivosNCSunat(p_FTVMOSU_CODE, p_FTVMOSU_IND_ESTADO)
                    res = "[]"
                    If Not dt Is Nothing Then
                        res = Utilities.DataTableToJSON(dt)
                    End If
                Case Else


            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    'Public Function GenerarDctoCorreo(ByVal p_CODE As String, ByVal CTLG_CODE As String) As String
    '    Dim ncEmpresa As New Nomade.NC.NCEmpresa("bn")

    '    Dim tabla As New StringBuilder
    '    Dim dtCabecera As New DataTable
    '    Dim dtDetalles As New DataTable
    '    Dim dtEmpresas As New DataTable
    '    dtCabecera = caNotaCredito.ListarNotaCredito(p_CODE, 0, "", "", "", "", "", "", "", "", "", "")
    '    dtDetalles = caNotaCredito.ListarDetallesNotaCredito(p_CODE, "0", "0")

    '    If dtCabecera IsNot Nothing Then
    '        Dim rutaLogo As String = ""
    '        Dim mon As String = dtCabecera.Rows(0)("MONEDA_SIMBOLO")

    '        If dtCabecera.Rows(0)("COMPRA_VENTA") = "V" Then
    '            dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("EMPRESA_CODE"), "A", "")
    '            rutaLogo = dtEmpresas(0)("RUTA_IMAGEN").ToString
    '        End If
    '        'OBTENER LOGO

    '        'PARAMETROS TABLAS
    '        Dim border As String = "1"
    '        Dim marginBottom As String = "10px"
    '        Dim cellpadding As String = "5px"
    '        'PARAMETROS TABLA1
    '        Dim wLogo As String = "60%"
    '        Dim wNota As String = "40%"
    '        'PARAMETROS TABLA2
    '        Dim wRuc As String = "50%"
    '        Dim wDen As String = "30%"
    '        Dim wNro As String = "20%"
    '        'PARAMETROS TABLA3
    '        Dim wCant As String = "10%"
    '        Dim wDesc As String = "60%"
    '        Dim wPrec As String = "15%"
    '        Dim wSubt As String = "15%"

    '        Dim codeMoneda As String = dtCabecera.Rows(0)("MONE_CODE") 'Código de Moneda
    '        Dim descMon As String = dtCabecera.Rows(0)("MONEDA") 'Descripcion de moneda   

    '        Dim motivoSunat As String = dtCabecera.Rows(0)("MOTIVO_SUNAT") 'Código motivo SUNAT   

    '        If dtCabecera.Rows(0)("COMPRA_VENTA") = "V" Then

    '            tabla.Append("<table border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "'  align='center'><tbody>")
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td width='" + wLogo + "' rowspan='2' style='text-align: center'><img src='{0}' style='max-height:50px;'></td>", rutaLogo)
    '            tabla.AppendFormat("<td width='" + wNota + "' style='text-align: center;'><strong>RUC N° {0}</strong></td>", dtCabecera.Rows(0)("RUC"))
    '            tabla.Append("</tr>") '------------------------------------------------
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td style='text-align: center;'><strong>NOTA DE CRÉDITO {0}</strong></td>", If(dtCabecera.Rows(0)("IND_ELECTRONICO") = "N", "", " ELECTRÓNICA"))
    '            tabla.Append("</tr>") '------------------------------------------------            
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td>{0} {1}</td>", dtCabecera.Rows(0)("DESC_EMPRESA"), If(dtCabecera.Rows(0)("DIRECCION") = "", "", " - " + dtCabecera.Rows(0)("DIRECCION")))
    '            tabla.AppendFormat("<td style='text-align: center;'>{0}</td>", dtCabecera.Rows(0)("DOCUMENTO"))
    '            tabla.Append("</tr>")
    '            tabla.Append("</tbody></table>")

    '            tabla.Append("<table border='1' style='width:100%;margin-bottom:10px' cellpadding='5px' align='center'><tbody>")
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td colspan='3'><strong>Cliente:</strong> {0}</td>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
    '            tabla.Append("</tr>") '-------------------------------------------------            
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td><strong>Dirección:</strong> {0}</td>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))
    '            tabla.AppendFormat("<td colspan='2'><strong>Documento que modifica</strong></td>")
    '            tabla.Append("</tr>") '------------------------------------------------
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td width='" + wRuc + "'><strong>{0}:</strong> {1}</td>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
    '            tabla.AppendFormat("<td width='" + wDen + "'><strong>Denominación</strong>: {0}</td>", dtCabecera.Rows(0)("ORIGEN_TIPO_DOC_DESC"))
    '            tabla.AppendFormat("<td width='" + wNro + "'><strong>N°</strong>: {0}</td>", dtCabecera.Rows(0)("DOCUMENTO_ORIGEN"))
    '            tabla.Append("</tr>") '------------------------------------------------            
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td><strong>Fecha Emisión:</strong> {0}</td>", dtCabecera.Rows(0)("EMISION"))
    '            tabla.AppendFormat("<td colspan='2'><strong>Fecha del comprobante que modifica:</strong> {0}</td>", dtCabecera.Rows(0)("EMISION_ORIGEN"))
    '            tabla.Append("</tr>") '------------------------------------------------           

    '            tabla.Append("</tbody></table>")

    '            tabla.Append("<table border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "'  cellpadding='" + cellpadding + "' align='center'><tbody>")
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td colspan='4'><strong>Por lo siguiente:</strong></td>")
    '            tabla.Append("</tr>") '------------------------------------------------            
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td width='" + wCant + "'><strong>CANT.</strong></td>")
    '            tabla.AppendFormat("<td width='" + wDesc + "'><strong>DESCRIPCIÓN</strong></td>")
    '            tabla.AppendFormat("<td width='" + wPrec + "'><strong>P. UNIT. ({0})</strong></td>", mon)
    '            tabla.AppendFormat("<td width='" + wSubt + "' style='font-size:9px !important;word-wrap: break-word;text-align:center;'><strong>VALOR DE VENTA O SERVICIO PRESTADO</strong></td>")
    '            tabla.Append("</tr>") '------------------------------------------------- 
    '            For Each row In dtDetalles.Rows
    '                'If Decimal.Parse(row("CANTIDAD_DEVL")) > 0 Then
    '                tabla.Append("<tr>")
    '                If motivoSunat = "01" Or motivoSunat = "02" Then
    '                    If dtCabecera.Rows(0)("ENTREGA_DESPACHO_ALMACEN") = "S" Then
    '                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("CANTIDAD_ORIGEN"))
    '                        tabla.AppendFormat("<td ><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
    '                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("PU"))
    '                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("MONTO_SUBTOTAL"))
    '                    Else
    '                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("CANTIDAD_DEVL"))
    '                        tabla.AppendFormat("<td ><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
    '                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("PU"))
    '                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("MONTO_SUBTOTAL"))
    '                    End If
    '                ElseIf motivoSunat = "06" Or motivoSunat = "07" Then
    '                    If Decimal.Parse(row("CANTIDAD_DEVL")) > 0 Then
    '                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("CANTIDAD_DEVL"))
    '                        tabla.AppendFormat("<td ><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
    '                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("PU"))
    '                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("MONTO_SUBTOTAL"))
    '                    End If
    '                Else
    '                    tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("CANTIDAD_DEVL"))
    '                    tabla.AppendFormat("<td ><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
    '                    tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("PU"))
    '                    tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("MONTO_SUBTOTAL"))
    '                End If

    '                tabla.Append("</tr>")
    '                'End If
    '            Next
    '            tabla.Append("<tr>")

    '            Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
    '            Dim importeTexto As String
    '            importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("MONTO_TOTAL"))).ToUpper()

    '            If codeMoneda = "0002" Then
    '                tabla.AppendFormat("<td colspan='2'><strong>SON: {0} <span> SOLES </span></strong></td>", importeTexto.Replace(".-", " " + mon))
    '            ElseIf codeMoneda = "0003" Then
    '                tabla.AppendFormat("<td colspan='2'><strong>SON: {0} <span> DOLARES </span></strong></td>", importeTexto.Replace(".-", " " + mon))
    '            Else
    '                tabla.AppendFormat("<td colspan='2'><strong>SON: {0} </strong></td>", importeTexto.Replace(".-", " " + mon))
    '            End If
    '            tabla.AppendFormat("<td colspan='2'></td>")
    '            tabla.Append("</tr>") '------------------------------------------------ 
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td colspan='2'><strong>MOTIVO DE LA EMISIÓN DE LA NOTA DE CRÉDITO</strong></td>")
    '            tabla.AppendFormat("<td ><strong>IGV </strong> </td>")
    '            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_IGV"))
    '            tabla.Append("</tr>") '------------------------------------------------ 
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td colspan='2'>{0}</td>", dtCabecera.Rows(0)("MOTIVO_DESC"))
    '            tabla.AppendFormat("<td ><strong>TOTAL {0}</strong></td>", mon)
    '            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_TOTAL"))
    '            tabla.Append("</tr>") '------------------------------------------------             
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td colspan='2'><strong>GLOSA</strong></td>")
    '            tabla.AppendFormat("<td colspan='2'></td>")
    '            tabla.Append("</tr>") '------------------------------------------------ 
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td colspan='2'>{0}</td>", dtCabecera.Rows(0)("GLOSA"))
    '            tabla.Append("<td colspan='2'></td>")
    '            tabla.Append("</tr>") '------------------------------------------------  
    '            tabla.Append("</tbody></table>")

    '            tabla.Append("<table border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "'  cellpadding='" + cellpadding + "' align='center'><tbody>")
    '            tabla.Append("<tr>")
    '            tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
    '            tabla.AppendFormat("<td width='" + wDen + "'><strong>OP GRAVADO ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
    '            tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("MONTO_GRAVADO").ToString())))
    '            tabla.Append("</tr>")
    '            tabla.Append("<tr>")
    '            tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
    '            tabla.AppendFormat("<td width='" + wDen + "'><strong>OP INAFECTA ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
    '            tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("MONTO_INAFECTO").ToString())))
    '            tabla.Append("</tr>")
    '            tabla.Append("<tr>")
    '            tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
    '            tabla.AppendFormat("<td width='" + wDen + "'><strong>OP EXONERADO ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
    '            tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("MONTO_EXONERADO").ToString())))
    '            tabla.Append("</tr>")
    '            tabla.Append("<tr>")
    '            tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
    '            tabla.Append("<td width='" + wDen + "'><strong>IGV:</strong> </td>")
    '            tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("MONTO_IGV").ToString())))
    '            tabla.Append("</tr>")
    '            tabla.Append("<tr>")
    '            tabla.Append("<td width='" + wRuc + "'><strong></strong> </td>")
    '            tabla.AppendFormat("<td width='" + wDen + "'><strong>TOTAL ({0})</strong>: </td>", dtCabecera.Rows(0)("MONEDA_SIMBOLO"))
    '            tabla.AppendFormat("<td width='" + wNro + "' style='text-align: right;'><strong></strong> {0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtCabecera.Rows(0)("IMPORTE_TOTAL").ToString())))
    '            tabla.Append("</tr>")
    '            tabla.Append("</tbody>")
    '            tabla.Append("</table>")
    '        Else ' PROVEEDORES /  COMPRAS
    '            tabla.Append("<table border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "'  align='center'><tbody>")
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td rowspan='3'><h3>{0}</h3> {1}</td>", dtCabecera.Rows(0)("RAZON_SOCIAL"), If(dtCabecera.Rows(0)("DIRECCION_CLIENTE") = "", "", "</br>" + dtCabecera.Rows(0)("DIRECCION_CLIENTE")))
    '            tabla.AppendFormat("<td style='text-align: center;'>{0}</td>", dtCabecera.Rows(0)("DOCUMENTO"))
    '            tabla.Append("</tr>")
    '            tabla.Append("<tr>")
    '            'tabla.AppendFormat("<td width='" + wLogo + "' rowspan='2'></td>")
    '            tabla.AppendFormat("<td width='" + wNota + "' style='text-align: center;'><strong>RUC N° {0}</strong></td>", dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
    '            tabla.Append("</tr>") '------------------------------------------------
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td style='text-align: center;'><strong>NOTA DE CRÉDITO</strong></td>")
    '            tabla.Append("</tr>") '------------------------------------------------            
    '            tabla.Append("</tbody></table>")

    '            tabla.Append("<table border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "' cellpadding='" + cellpadding + "' align='center'><tbody>")
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td colspan='3'><strong>Cliente:</strong> {0}</td>", dtCabecera.Rows(0)("DESC_EMPRESA"))
    '            tabla.Append("</tr>") '-------------------------------------------------            
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td><strong>Dirección:</strong> {0}</td>", dtCabecera.Rows(0)("DIRECCION"))
    '            tabla.AppendFormat("<td colspan='2'><strong>Documento que modifica</strong></td>")
    '            tabla.Append("</tr>") '------------------------------------------------
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td width='" + wRuc + "'><strong>{0}:</strong> {1}</td>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
    '            tabla.AppendFormat("<td width='" + wDen + "'><strong>Denominación</strong>: {0}</td>", dtCabecera.Rows(0)("ORIGEN_TIPO_DOC_DESC"))
    '            tabla.AppendFormat("<td width='" + wNro + "'><strong>N°</strong>: {0}</td>", dtCabecera.Rows(0)("DOCUMENTO_ORIGEN"))
    '            tabla.Append("</tr>") '------------------------------------------------            
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td><strong>Fecha Emisión:</strong> {0}</td>", dtCabecera.Rows(0)("EMISION"))
    '            tabla.AppendFormat("<td colspan='2'><strong>Fecha del comprobante que modifica:</strong> {0}</td>", dtCabecera.Rows(0)("EMISION_ORIGEN"))
    '            tabla.Append("</tr>") '------------------------------------------------           

    '            tabla.Append("</tbody></table>")

    '            tabla.Append("<table border='" + border + "' style='width: 100%;margin-bottom:" + marginBottom + "'  cellpadding='" + cellpadding + "' align='center'><tbody>")
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td colspan='4'><strong>Por lo siguiente:</strong></td>")
    '            tabla.Append("</tr>") '------------------------------------------------            
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td width='" + wCant + "'><strong>CANT.</strong></td>")
    '            tabla.AppendFormat("<td width='" + wDesc + "'><strong>DESCRIPCIÓN</strong></td>")
    '            tabla.AppendFormat("<td width='" + wPrec + "'><strong>P. UNIT. ({0})</strong></td>", mon)
    '            tabla.AppendFormat("<td width='" + wSubt + "' style='font-size:9px !important;word-wrap: break-word;text-align:center;'><strong>VALOR DE VENTA O SERVICIO PRESTADO</strong></td>")
    '            tabla.Append("</tr>") '------------------------------------------------- 
    '            For Each row In dtDetalles.Rows
    '                If Decimal.Parse(row("CANTIDAD_DEVL")) > 0 Then
    '                    tabla.Append("<tr>")
    '                    tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("CANTIDAD_DEVL"))
    '                    tabla.AppendFormat("<td ><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
    '                    tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("PU"))
    '                    tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", row("MONTO_SUBTOTAL"))
    '                    tabla.Append("</tr>")
    '                End If
    '            Next
    '            tabla.Append("<tr>")

    '            Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
    '            Dim importeTexto As String
    '            importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("MONTO_TOTAL"))).ToUpper()

    '            If codeMoneda = "0002" Then
    '                tabla.AppendFormat("<td colspan='2'><strong>SON: {0} <span> SOLES </span></strong></td>", importeTexto.Replace(".-", " " + mon))
    '            ElseIf codeMoneda = "0003" Then
    '                tabla.AppendFormat("<td colspan='2'><strong>SON: {0} <span> DOLARES </span></strong></td>", importeTexto.Replace(".-", " " + mon))
    '            Else
    '                tabla.AppendFormat("<td colspan='2'><strong>SON: {0} </strong></td>", importeTexto.Replace(".-", " " + mon))
    '            End If

    '            tabla.AppendFormat("<td colspan='2'><strong>SON: {0}</strong></td>", importeTexto.Replace(".-", " " + mon))
    '            tabla.AppendFormat("<td colspan='2'></td>")
    '            tabla.Append("</tr>") '------------------------------------------------ 
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td colspan='2'><strong>MOTIVO DE LA EMISIÓN DE LA NOTA DE CRÉDITO</strong></td>")
    '            tabla.AppendFormat("<td ><strong>IGV </strong> </td>")
    '            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_IGV"))
    '            tabla.Append("</tr>") '------------------------------------------------ 
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td colspan='2'>Devolución</td>")
    '            tabla.AppendFormat("<td ><strong>TOTAL {0}</strong></td>", mon)
    '            tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_TOTAL"))
    '            tabla.Append("</tr>") '------------------------------------------------  
    '            tabla.Append("<tr>")
    '            tabla.AppendFormat("<td colspan='2'><strong>GLOSA</strong></td>")
    '            tabla.AppendFormat("<td colspan='2'></td>")
    '            tabla.Append("</tr>") '------------------------------------------------ 

    '            tabla.Append("</tbody></table>")

    '        End If



    '    End If
    '    Return tabla.ToString()
    'End Function

    Public Function GenerarDctoCorreo(ByVal p_CODE As String, ByVal CTLG_CODE As String) As String
        Dim ncEmpresa As New Nomade.NC.NCEmpresa("bn")

        Dim tabla As New StringBuilder
        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        'Dim dtEmpresas As New DataTable
        dtCabecera = caNotaCredito.ListarCabNotaCreditoImpresion(p_CODE)
        dtDetalles = caNotaCredito.ListarDetNotaCreditoImpresion(p_CODE)

        If dtCabecera IsNot Nothing Then

            Dim codeMoneda As String = dtCabecera.Rows(0)("MONE_CODE") 'Código de Moneda
            Dim mon As String = dtCabecera.Rows(0)("MONEDA_SIMBOLO")
            Dim descMon As String = dtCabecera.Rows(0)("MONEDA") 'Descripcion de moneda  

            Dim motivoSunat As String = dtCabecera.Rows(0)("MOTIVO_SUNAT") 'Código motivo SUNAT   

            tabla.Append("<br>")
            tabla.Append("<br>")
            tabla.Append("<table border='0' style='width: 90%;' align='center'>")
            tabla.Append("<thead>")
            tabla.Append("<tr><th border='1' style='border-top:1px solid black;'></th></tr>")
            tabla.Append("<tr><th>&nbsp;</th></tr>")
            tabla.AppendFormat("<tr><th align='left' style='font-size:12pt;font-family:Arial,sans-serif'>NOTA DE CRÉDITO ELECTRÓNICA</th></tr>")
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
            If dtCabecera.Rows(0)("IND_ELECTRONICO") = "S" Then
                tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Autorizado mediante </strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
            End If
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Local</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DESC_SUCURSAL"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Vend.</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("USUA_ID"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Tipo Moneda</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MONEDA"))

            tabla.Append("<tr><td colspan='4' border='1' style='border-top:1px solid black;' ></td></tr>")
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>{1}</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DOCUMENTO"), "Nota de Crédito")
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Cliente</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("RAZON_SOCIAL"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>{0}</strong></td><td colspan='3'><strong>: </strong>{1}</td></tr>", dtCabecera.Rows(0)("CLIE_DCTO_DESC"), dtCabecera.Rows(0)("CLIE_DCTO_NRO"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Dirección</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DIRECCION_CLIENTE"))

            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Doc. Afectado</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("DOCUMENTO_REF"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Notivo</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("MOTIVO_DESC"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Fecha Emisión</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("FECHA_EMISION"))
            tabla.AppendFormat("<tr><td valign='top' style='font-size:8pt;font-family:Arial,sans-serif'><strong>Fecha Venc.</strong></td><td colspan='3'><strong>: </strong>{0}</td></tr>", dtCabecera.Rows(0)("EMISION"))

            tabla.Append("<tr><td colspan='4' border='1' style='border-top:1px solid black;' ></td></tr>")
            tabla.Append("</tbody>")
            tabla.Append("</table>")
            tabla.Append("<br>")

            tabla.Append("<table border='1' style='width: 90%;border-collapse:collapse' align='center' font size=9pt ><tbody>")
            tabla.Append("<tr style='background-color: #D6EAF8;'>")
            tabla.Append("<td style='text-align: center;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt'><strong>CANTIDAD</strong></td>")
            tabla.Append("<td style='text-align: center;padding-left:5px;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt' colspan='2'><strong>DESCRIPCIÓN</strong></td>")
            tabla.Append("<td style='text-align: center;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt'><strong>P. UNIT</strong></td>")
            tabla.Append("<td style='text-align: center;border:1pt solid windowtext;padding:0cm 3.5pt;height:33pt'><strong>VALOR ITEM</strong></td>")
            tabla.Append("</tr>")

            For Each row In dtDetalles.Rows
                tabla.Append("<tr>")
                If motivoSunat = "01" Or motivoSunat = "02" Then
                    If dtCabecera.Rows(0)("ENTREGA_DESPACHO_ALMACEN") = "S" Then
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD_ORIGEN")), 2).ToString())
                        tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                        tabla.AppendFormat("<td style='text-align: right; padding-left:10px;padding-right:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", Decimal.Parse(row("VALOR_VENTA")))
                    Else
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD_DEVL")), 2).ToString())
                        tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                        tabla.AppendFormat("<td style='text-align: right; padding-left:10px;padding-right:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", Decimal.Parse(row("VALOR_VENTA")))
                    End If
                ElseIf motivoSunat = "06" Or motivoSunat = "07" Then
                    If Decimal.Parse(row("CANTIDAD_DEVL")) > 0 Then
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD_DEVL")), 2).ToString())
                        tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                        tabla.AppendFormat("<td style='text-align: right; padding-left:10px;padding-right:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", Decimal.Parse(row("VALOR_VENTA")))
                    End If
                Else
                    tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD_DEVL")), 2).ToString())
                    tabla.AppendFormat("<td style='text-align: left; padding-right:10px;padding-left:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", row("DESC_PRODUCTO_DCTO"))
                    tabla.AppendFormat("<td style='text-align: right;'>{0}</td>", IIf(Decimal.Parse(row("PU")) < 0, (Decimal.Parse(row("PU")) * (-1)), row("PU")))
                    tabla.AppendFormat("<td style='text-align: right; padding-left:10px;padding-right:5px;border:1pt solid windowtext;' colspan='2'><span style='word-break:break-all;'>{0}</span></td>", Decimal.Parse(row("VALOR_VENTA")))
                End If
                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody></table>")

            tabla.Append("<table border='0' style='width: 90%;' align='center' font size=9pt><tbody>")
            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Op. Gravada {0}</strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_GRAVADO"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>IGV <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_IGV"))
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>ISC <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", "0.00")
            tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>OTROS <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", "0.00")
            tabla.Append("</tr>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")

            'tabla.Append("<tr>")
            'tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Desc.Global <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            'tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", "0.00")
            'tabla.Append("</tr>")

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Total valor de venta <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("MONTO_GRAVADO"))
            tabla.Append("</tr>")

            Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
            Dim importeTexto As String
            importeTexto = (l.ToCustomCardinal(dtCabecera.Rows(0)("IMPORTE_TOTAL"))).ToUpper()

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

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'><strong>Importe Total <span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='font-size:8pt;font-family:Arial,sans-serif;text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE_TOTAL"))
            tabla.Append("<br>")
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr><td colspan='4' border='1'></td></tr>")
            tabla.Append("<tr>")
            If dtCabecera.Rows(0)("IND_ELECTRONICO") = "S" Then
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", "Para consultar el documento ingrese a http://52.41.93.228:1115, debe estar disponible dentro de las próximas 48 hrs. a partir de la fecha de emisión.")
            Else
                tabla.AppendFormat("<tr><td style='text-align: center' colspan='4'>{0}</td></tr>", "GRACIAS POR SU PREFERENCIA")
            End If
            tabla.Append("</table>")
        End If
        Return tabla.ToString()
    End Function

    'CORREO    
    Public Function GenerarPDF(ByVal CODIGO As String, ByVal EMPRESA As String) As String
        Dim ress As String = ""
        Dim htmlText As String = ""
        Dim cNomArch As String = CODIGO & ".pdf"
        htmlText = getHtmlTextPDF(CODIGO, EMPRESA)
        HTMLToPDF(htmlText, cNomArch, CODIGO)
        Return ress
    End Function

    Function getHtmlTextPDF(ByVal codigo As String, ByVal ctlg As String) As String
        Dim htmlText As New StringBuilder
        htmlText.Length = 0
        Dim documento As String = ""
        documento = GenerarDctoCorreo(codigo, ctlg)
        htmlText.Append(documento)
        Return htmlText.ToString
    End Function

    Sub HTMLToPDF(ByVal HTML As String, ByVal FilePath As String, ByVal p_CODE As String)

        Dim nc As New Nomade.NC.NCEmpresa("Bn")
        Dim dtCabecera As DataTable
        dtCabecera = caNotaCredito.ListarCabNotaCreditoImpresion(p_CODE)

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

        If dtCabecera.Rows(0)("IND_ELECTRONICO") = "S" And dtCabecera(0)("IMAGEN_QR").ToString <> "" Then 'DPORTA 20/05/2022
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

    'Tabla de busqueda de documentos    
    Public Function GenerarTablaDocumentos(ByVal dtDocumentoCompraVenta As DataTable) As String

        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblBuscarDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CÓDIGO</th>")
        resb.AppendFormat("<th>SERIE</th>")
        resb.AppendFormat("<th>NRO</th>")
        resb.AppendFormat("<th>EMISIÓN</th>")
        resb.AppendFormat("<th>DCTO</th>")
        resb.AppendFormat("<th>MONTO</th>")
        resb.AppendFormat("<th>PAGADO</th>")
        resb.AppendFormat("<th>CAJA</th>")
        resb.AppendFormat("<th>DESPACHADO</th>")
        resb.AppendFormat("<th>ANTICIPO APLICADO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("COMPLETO_IND").ToString = "S" And dt.Rows(i)("ANULADO").ToString = "NO" And dt.Rows(i)("DOCUMENTO").ToString <> "NOTA DE VENTA" Then 'DPORTA "NOTA DE VENTA"
                    If dt.Rows(i)("NOTA_CREDITO_IND").ToString = "N" And dt.Rows(i)("NOTA_CREDITO_GEN_IND").ToString = "N" Then
                        'VALIDA QUE LA FECHA DE EMISION DE LA NOTA DE CREDITO SEA MENOR O IGUAL AL DOCUMENTO DE ORIGEN
                        Dim continuar As Boolean = False
                        If p_FECHA_EMISION <> "" And dt.Rows(i)("EMISION").ToString() <> "" Then
                            Dim fechaConsultada As Integer = Integer.Parse(ObtenerFecha(p_FECHA_EMISION))
                            Dim fechaEvaluar As Integer = Integer.Parse(ObtenerFecha(dt.Rows(i)("EMISION").ToString()))
                            If fechaConsultada >= fechaEvaluar Then
                                continuar = True
                            End If
                        End If
                        If continuar Then
                            Dim serie_numero As String() = dt.Rows(i)("NUM_DCTO").ToString().Split(New Char() {"-"})
                            Dim fechaEmision As String = If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10))
                            resb.AppendFormat("<tr class='doc_fila' onclick=""setSeleccionDocumento('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','{17}','{18}','{19}','{20}','{21}')"" id='doc_fila_{0}_{1}'>", dt.Rows(i)("CODIGO").ToString(), dt.Rows(i)("SECUENCIA").ToString(), serie_numero(0), serie_numero(1), dt.Rows(i)("TIPO_DCTO").ToString(), dt.Rows(i)("IMPORTE").ToString(), dt.Rows(i)("MONEDA").ToString(), dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("SCSL_EXONERADA_IND").ToString(), fechaEmision, dt.Rows(i)("PAGADO_IND"), dt.Rows(i)("PAGADO_DESC"), Replace(dt.Rows(i)("CAJA").ToString(), "CAJA ", ""), dt.Rows(i)("DESPACHO_IND"), dt.Rows(i)("DESPACHO_DESC"), dt.Rows(i)("ISC_DOCUMENTO"), dt.Rows(i)("GRAVADA_DOCUMENTO"), dt.Rows(i)("INAFECTA_DOCUMENTO"), dt.Rows(i)("EXONERADA_DOCUMENTO"), dt.Rows(i)("IGV_DOCUMENTO"), dt.Rows(i)("VALOR_VENTA"), dt.Rows(i)("VALOR_CAMBIO"))
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(0))
                            resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(1))
                            resb.AppendFormat("<td align='center' >{0}</td>", fechaEmision)
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                            resb.AppendFormat("<td align='center' style='text-align:center;' >{0}</td>", dt.Rows(i)("SIMBOLO_MONEDA").ToString() + " " + dt.Rows(i)("IMPORTE").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PAGADO_DESC").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", Replace(dt.Rows(i)("CAJA").ToString(), "CAJA ", ""))
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESPACHO_DESC"))
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ANTICIPO_APLICADO"))
                            resb.AppendFormat("</tr>")
                        End If


                    End If
                End If
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function


    Public Function GenerarTablaDetallesVenta(ByVal dtDetallesVenta As DataTable, ByVal motivo As String) As String
        Dim CodProducto As String = ""
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblDetallesCompraVenta"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead style='color:white;background-color:rgb(75, 135, 184);'>")
        resb.AppendFormat("<th>CÓDIGO<br/>PRODUCTO</th>")
        resb.AppendFormat("<th>PRODUCTO</th>")
        resb.AppendFormat("<th>UNIDAD<br/>MEDIDA</th>")
        resb.AppendFormat("<th>VALOR<br/>UNITARIO</th>")
        resb.AppendFormat("<th>CANT.<br/>SOLICITADA</th>")
        resb.AppendFormat("<th>CANT.<br/>DESPACHADA</th>")
        resb.AppendFormat("<th>CANT.<br/>DEVOLUCIÓN</th>")
        resb.AppendFormat("<th>SERIADOS</th>")
        resb.AppendFormat("<th>DESPACHADO</th>")
        resb.AppendFormat("<th>TIPO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        Dim hfCantDetalles As String
        If (dt Is Nothing) Then
            hfCantDetalles = " <input id=""hfCantDetalles"" value=""0"" type=""hidden"" />"
        Else
            hfCantDetalles = dt.Rows.Count.ToString()
            For i As Integer = 0 To dt.Rows.Count - 1
                'Dim dtProd As New DataTable
                CodProducto = dt.Rows(i)("PROD_CODE").ToString()
                If CodProducto.Substring(0, 2) <> "AP" Then

                    'dtProd = gesPro.LISTAR_PRODUCTO(dt.Rows(i)("PROD_CODE").ToString(), "", "", "", "", "")
                    Dim hf As New StringBuilder
                    hf.AppendFormat("<input id='hfDetalle{0}_prod' value='{1}' type='hidden' />", i, dt.Rows(i)("PROD_CODE").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_um' value='{1}' type='hidden' />", i, dt.Rows(i)("UNIDAD").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_pu' value='{1}' type='hidden' />", i, dt.Rows(i)("PRECIO").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_imp' value='{1}' type='hidden' />", i, dt.Rows(i)("TOTAL").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_cant_sol' class='inputCantidad' value='{1}'  type='hidden' />", i, dt.Rows(i)("CANTIDAD").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_cant'value='{1}'  type='hidden' />", i, dt.Rows(i)("CANTIDAD_DESPACHADA").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_item' value='{1}'type='hidden' />", i, dt.Rows(i)("ITEM").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_almc' value='{1}'type='hidden' />", i, dt.Rows(i)("ALMC_CODE").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_tipo_prod' value='{1}'type='hidden' />", i, dt.Rows(i)("TIPO_PROD").ToString()) 'DPORTA 17/03/2021
                    hf.AppendFormat("<input id='hfDetalle{0}_tipo' value='{1}'type='hidden' />", i, dt.Rows(i)("TIPO_BIEN").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_isc' value='{1}'type='hidden' />", i, dt.Rows(i)("PROD_ISC").ToString())
                    hf.AppendFormat("<input id='hfCantDetalles{0}' value='{1}' type='hidden' />", i, hfCantDetalles)


                    resb.AppendFormat("<tr class='det_fila'  id='det_fila_{0}_{1}'>", dt.Rows(i)("CODIGO").ToString(), dt.Rows(i)("PROD_CODE").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PROD_CODE_ANTIGUO").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NOMBRE_IMPRESION").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_UNIDAD").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PRECIO").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD").ToString), 2))
                    resb.AppendFormat("<td align='center' >{0}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD_DESPACHADA").ToString), 2))
                    'resb.AppendFormat("<td align='center' ><input id='txtDevolucion_{1}' class='inputDevolucion' onkeypress='return ValidaDecimales(event,this)'  onkeyup=""ValidaCantidadOrigen(this,'{0}')"" value='{0}' type='number' max='{0}' min='0' disabled='disabled' style='text-align:center;'>{2}</td>", dt.Rows(i)("CANTIDAD_DESPACHADA").ToString(), i.ToString(), hf.ToString())
                    If motivo = "07" Then
                        'resb.AppendFormat("<td align='center' ><input id='txtDevolucion_{1}' class='inputDevolucion' onkeypress='return ValidaDecimales(event,this)'  onkeyup=""ValidaCantidadOrigen(this,'{0}', '{3}')"" value='{0}' type='number' max='{0}' min='0' disabled='disabled' style='text-align:center;'>{2}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD").ToString), 2), i.ToString(), hf.ToString(), dt.Rows(i)("CANTIDAD_DESPACHADA").ToString())
                        resb.AppendFormat("<td align='center' ><input id='txtDevolucion_{1}' class='inputDevolucion' onkeypress='return ValidaDecimales(event,this)'  onkeyup=""ValidaCantidadOrigen(this,'{0}', '{3}')"" value='{0}' type='number' max='{0}' min='0' disabled='disabled' style='text-align:center;'>{2}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD_DESPACHADA").ToString), 2), i.ToString(), hf.ToString(), dt.Rows(i)("CANTIDAD_DESPACHADA").ToString())
                    Else
                        resb.AppendFormat("<td align='center' ><input id='txtDevolucion_{1}' class='inputDevolucion' onkeypress='return ValidaDecimales(event,this)'  onkeyup=""ValidaCantidadOrigen(this,'{0}')"" value='{0}' type='number' max='{0}' min='0' disabled='disabled' style='text-align:center;'>{2}</td>", dt.Rows(i)("CANTIDAD_DESPACHADA").ToString(), i.ToString(), hf.ToString())
                    End If


                    If dt.Rows(i)("SERIADO_IND") = "S" And Not dt.Rows(i)("PROD_CODE").ToString().Contains("M") Then
                        'If dt.Rows(i)("SERIADO_IND") = "S" And dt.Rows(i)("TIPO_DCTO_ORIGEN") <> "0009" And dt.Rows(i)("TIPO_DCTO_ORIGEN") <> "0050" Then
                        Dim dtProdAlmacen As New DataTable
                        Dim naTipoMovimiento = New Nomade.NA.NATipoMovimiento("Bn")
                        dtProdAlmacen = naTipoMovimiento.lista_detalle_dcto_almacen("", "", dt.Rows(i)("CODIGO").ToString())
                        Dim productos As String = ""
                        Dim nroProds As Integer = 0
                        If Not (dtProdAlmacen Is Nothing) Then
                            For Each prod In dtProdAlmacen.Rows
                                If prod("MCDR_CODE") <> "" And prod("PROD_CODE") = dt.Rows(i)("PROD_CODE").ToString() Then
                                    nroProds += 1
                                    If nroProds > Decimal.Parse(dt.Rows(i)("CANTIDAD_DESPACHADA").ToString()) Then
                                        productos += "<option value='" + prod("MCDR_CODE") + "'>" + prod("NRO_SERIE") + "</option>"
                                    Else
                                        productos += "<option value='" + prod("MCDR_CODE") + "' selected='selected'>" + prod("NRO_SERIE") + "</option>"
                                    End If

                                End If
                            Next
                        End If

                        'resb.AppendFormat("<td align='center' ><select id='cboDevolucion_{1}' class='span12 cboDevolucion' disabled='disabled'  multiple='multiple' data-placeholder='Seriados' style='display: none;'>{2}</select></td>", dt.Rows(i)("CANTIDAD_DESPACHADA").ToString(), i.ToString(), productos)
                        resb.AppendFormat("<td align='center' ><select id='cboDevolucion_{1}' class='span12 cboDevolucion' disabled='disabled'  multiple='multiple' data-placeholder='Seriados' style='display: none;'>{2}</select></td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD_DESPACHADA").ToString), 2), i.ToString(), productos)
                    Else
                        resb.Append("<td>" + dt.Rows(i)("COD_BARRAS") + "</td>")
                    End If

                    If Convert.ToInt32(dt.Rows(i)("CANTIDAD")) = Convert.ToInt32(dt.Rows(i)("CANTIDAD_DESPACHADA")) Then
                        resb.Append("<td align='center'>SI</td>")
                    ElseIf Convert.ToInt32(dt.Rows(i)("CANTIDAD_DESPACHADA")) = 0 Then
                        resb.Append("<td align='center'>NO</td>")
                    Else
                        resb.Append("<td align='center'>PARCIAL</td>")
                    End If
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_VENTA").ToString())
                    resb.AppendFormat("</tr>")



                End If

            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function


    Function GenerarTablaDetallesNotaCredito(ByVal dt As DataTable) As String

        res = ""
        resb.Clear()
        Dim total_parcial As Boolean = True
        Dim totalDevolucion As Decimal = 0

        '------
        resb.AppendFormat("<table id=""tblDetallesCompraVenta"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead style='color:white;background-color:rgb(75, 135, 184);'>")
        resb.AppendFormat("<th>CÓDIGO<br/>PRODUCTO</th>")
        resb.AppendFormat("<th>PRODUCTO</th>")
        resb.AppendFormat("<th>UNIDAD<br/>MEDIDA</th>")
        resb.AppendFormat("<th>PRECIO<br/>UNITARIO</th>")
        resb.AppendFormat("<th>CANT. ORIGEN<br/> DESPACHADA</th>")
        resb.AppendFormat("<th>SUBTOTAL<br/>ORIGEN</th>")
        resb.AppendFormat("<th>CANT.<br/>DEVOLUCIÓN</th>")
        resb.AppendFormat("<th>SUBTOTAL<br/>DEVOLUCIÓN</th>")
        resb.AppendFormat("<th>SERIADOS</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        Dim hfCantDetalles As String
        If (dt Is Nothing) Then
            hfCantDetalles = " <input id=""hfCantDetalles0"" value=""0"" type=""hidden"" />"
        Else
            hfCantDetalles = dt.Rows.Count.ToString()

            For i As Integer = 0 To dt.Rows.Count - 1



                'If Decimal.Parse(dt.Rows(i)("CANTIDAD_DEVL").ToString()) <> 0 Then

                'dt.PRODUCTO = FARFACD_PROD_CODE
                'dt.UNIDAD= Codigo de UM
                'dt.FACC_CODE= Codigo del documento de compraventa
                Dim hf As New StringBuilder
                hf.AppendFormat("<input id='hfDetalle{0}_prod' value='{1}' type='hidden' />", i, dt.Rows(i)("PRODUCTO").ToString())
                hf.AppendFormat("<input id='hfDetalle{0}_um' value='{1}' type='hidden' />", i, dt.Rows(i)("UNIDAD").ToString())
                hf.AppendFormat("<input id='hfDetalle{0}_pu' value='{1}' type='hidden' />", i, dt.Rows(i)("PU").ToString())
                hf.AppendFormat("<input id='hfDetalle{0}_imp' value='{1}' type='hidden' />", i, dt.Rows(i)("ORIGEN_IMPORTE").ToString())
                hf.AppendFormat("<input id='hfDetalle{0}_cant' value='{1}' type='hidden' />", i, dt.Rows(i)("CANTIDAD_DEVL").ToString())
                hf.AppendFormat("<input id='hfDetalle{0}_item' value='{1}' type='hidden' />", i, dt.Rows(i)("ITEM").ToString())
                hf.AppendFormat("<input id='hfCantDetalles{0}' value='{1}' type='hidden' />", i, hfCantDetalles)

                resb.AppendFormat("<tr class='det_fila'  id='det_fila_{0}_{1}'>", dt.Rows(i)("NOCC_CODE").ToString(), dt.Rows(i)("PRODUCTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("COD_PROD_ANT").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_PRODUCTO_DCTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_UNIDAD").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PU").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CANTIDAD_ORIGEN").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ORIGEN_IMPORTE").ToString())
                resb.AppendFormat("<td align='center' >{0}{1}</td>", dt.Rows(i)("CANTIDAD_DEVL").ToString(), hf.ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO_SUBTOTAL").ToString())

                If dt.Rows(i)("NROS_MCDR").ToString() <> "" Then
                    Dim nros As String()
                    Dim cods As String()
                    Dim productos As String = ""
                    nros = Split(dt.Rows(i)("NROS_MCDR").ToString(), ",")
                    cods = Split(dt.Rows(i)("CODS_MCDR").ToString(), ",")
                    For index = 0 To nros.Length - 1
                        'productos += "<option value='" + cods(index) + "' selected='selected'>" + nros(index) + "</option>"
                        If index = nros.Length - 1 Then
                            productos += nros(index)
                        Else
                            productos += nros(index) + ", "
                        End If
                    Next
                    'resb.AppendFormat("<td align='center' ><select id='cboDevolucion_{0}' class='span12 cboDevolucion' multiple='multiple' data-placeholder='Seriados' style='display: none;'>{1}</select></td>", i.ToString(), productos)
                    resb.AppendFormat("<td align='center'>{1}</td>", i.ToString(), productos)
                Else
                    resb.Append("<td></td>")
                End If


                resb.AppendFormat("</tr>")

                If Not (Decimal.Parse(dt.Rows(i)("CANTIDAD_ORIGEN").ToString()) = Decimal.Parse(dt.Rows(i)("CANTIDAD_DEVL").ToString())) Then
                    total_parcial = False
                End If

                totalDevolucion += Decimal.Parse(dt.Rows(i)("MONTO_SUBTOTAL").ToString())
                'End If
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<input id='total_parcial' type='hidden' value='{0}'>", total_parcial)
        res = resb.ToString()
        Return res
    End Function

    Function ObtenerFecha(ByVal fecha As String) As String
        If fecha <> "" Then
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
        End If
        Return fecha
    End Function

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

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

End Class
  <%@ WebHandler Language="VB" Class="CCMCBCL" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.Drawing
Imports System.Drawing.Imaging


Public Class CCMCBCL : Implements IHttpHandler
    Dim dt, dt2 As DataTable
    Dim s As New Nomade.NC.NCEAdicionales("bn")
    Dim ccCuentasPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
    Dim CobroCliente As New Nomade.CC.CCCobroCliente("Bn")
    Dim ccPercepcion As New Nomade.CC.CCPercepcion("Bn")
    Dim Ventas As New NOMADE.NV.NVVenta("bn")
    Dim mtar As New Nomade.NC.NCMarcaTarjeta("Bn")
    Dim NCcliente As New Nomade.NC.NCECliente("Bn")
    Dim anticipo As New Nomade.NV.NVAnticipo("Bn")
    Dim flag As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim empresapidm As String
    Dim codigo As String
    Dim empresa As String
    Dim proveedor As String
    Dim clie As New Nomade.NC.NCECliente("Bn")
    Dim estable As String
    Dim detalle As String
    Dim origen As String
    Dim usuario As String
    Dim codigo_apertura As String
    Dim moneda As String
    Dim medio_pago As String
    Dim descripcion As String
    Dim destino As String
    Dim fecha_pago As String
    Dim banco As String
    Dim cuenta As String
    Dim pidmcuenta As String
    Dim tipo As String
    Dim factura As String
    Dim documento As String
    Dim completo As String
    Dim adicional As String
    Dim monto_total As String
    Dim clientepidm As String
    Dim cliente As String
    Dim caja As String
    Dim CODIGO_VENTA As String
    Dim scsl As String
    Dim usua_id, notaCredito As String
    Dim tipo_cambio As String
    Dim fini As String
    Dim ffin As String
    Dim establec, VALIDAR_IMG As String
    Dim sRutaImagenes As String = System.Configuration.ConfigurationManager.AppSettings("PathImagenes") + "Sustentos"

    Dim RUTA_IMAGEN As String = ""
    Dim RUTA As String = ""

    Dim efectivo_recibido As String
    Dim efectivo_recibido_alterno As String
    Dim vuelto As String
    Dim vuelto_alterno As String

    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")
        caja = context.Request("caja")
        empresapidm = context.Request("empresapidm")
        codigo = context.Request("codigo")
        empresa = context.Request("empresa")
        proveedor = context.Request("proveedor")
        detalle = context.Request("detalle")
        origen = context.Request("origen")
        usuario = context.Request("usuario")
        codigo_apertura = context.Request("codigo_apertura")
        moneda = context.Request("moneda")
        medio_pago = context.Request("medio_pago")
        descripcion = context.Request("descripcion")
        destino = context.Request("destino")
        fecha_pago = Utilities.fechaLocal(context.Request("fecha_pago"))
        banco = context.Request("banco")
        cuenta = context.Request("cuenta")
        pidmcuenta = context.Request("pidmcuenta")
        tipo = context.Request("tipo")
        factura = context.Request("factura")
        documento = context.Request("documento")
        completo = context.Request("completo")
        adicional = context.Request("adicional")
        monto_total = context.Request("monto_total")
        clientepidm = context.Request("clientepidm")
        cliente = context.Request("cliente")
        estable = context.Request("estable")
        tipo_cambio = context.Request("tipo_cambio")

        CODIGO_VENTA = context.Request("CODIGO_VENTA") 'SI ES VACIO CARGA TODAS LAS DEUDAS, SINO UNA EN ESPECIFICO

        RUTA_IMAGEN = context.Request("RUTA_IMAGEN")

        scsl = context.Request("scsl")
        usua_id = context.Request("usua_id")
        notaCredito = context.Request("notacredito")
        establec = context.Request("establec")
        fini = context.Request("fini")
        If fini <> "" Then
            fini = Utilities.fechaLocal(fini)
        End If
        ffin = context.Request("ffin")
        If ffin <> "" Then
            ffin = Utilities.fechaLocal(ffin)
        End If

        efectivo_recibido = context.Request("efectivo_recibido")
        If efectivo_recibido = "" Or efectivo_recibido Is Nothing Then
            efectivo_recibido = 0
        End If

        efectivo_recibido_alterno = context.Request("efectivo_recibido_alterno")
        If efectivo_recibido_alterno = "" Or efectivo_recibido_alterno Is Nothing Then
            efectivo_recibido_alterno = 0
        End If

        vuelto = context.Request("vuelto")
        If vuelto = "" Or vuelto Is Nothing Then
            vuelto = 0
        End If

        vuelto_alterno = context.Request("vuelto_alterno")
        If vuelto_alterno = "" Or vuelto_alterno Is Nothing Then
            vuelto_alterno = 0
        End If

        Try

            Select Case flag.ToString()

                Case "1" 'crear pago x caja
                    If RUTA_IMAGEN = "../../recursos/img/no_disponible.jpg" Then
                        VALIDAR_IMG = "NO"
                    Else
                        VALIDAR_IMG = "SI"
                    End If

                    resArray = CobroCliente.CobrarClienteCaja(detalle, origen, usuario, codigo_apertura, empresa, fecha_pago, moneda, medio_pago, descripcion, destino, documento, tipo_cambio, VALIDAR_IMG, efectivo_recibido, efectivo_recibido_alterno, vuelto, vuelto_alterno, adicional, notaCredito)

                    Dim oCTGeneracionAsientos As New Nomade.CT.CTGeneracionAsientos()
                    Dim strCodAsientoCobroVenta As String
                    For Each item As String In detalle.Split("|")
                        'Ejemplo de traza: V01039153,B/BE01 - 0026864,10,0,S,0001|V01039155,B/BE01 - 0026865,20,0,S,0001
                        Dim strCodVenta As String = item.Split(",")(0)
                        strCodAsientoCobroVenta = oCTGeneracionAsientos.GenerarAsientoCobroDocVenta(strCodVenta)
                    Next

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE_GENERADO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")

                    If RUTA_IMAGEN <> "" And resArray(1) = "TC" And VALIDAR_IMG = "SI" Then
                        RUTA = GrabaImagen(RUTA_IMAGEN, context, resArray(0).ToString + ".jpg")
                    End If


                    res = resb.ToString()

                Case "1.5" 'crear pago x banco
                    If RUTA_IMAGEN = "../../recursos/img/no_disponible.jpg" Then
                        VALIDAR_IMG = "NO"
                    Else
                        VALIDAR_IMG = "SI"
                    End If

                    resArray = CobroCliente.CobrarClienteBanco(detalle, pidmcuenta, cuenta, usuario, empresa, fecha_pago, moneda, medio_pago, descripcion, destino, documento, completo, monto_total, tipo_cambio, VALIDAR_IMG, efectivo_recibido, efectivo_recibido_alterno, vuelto, vuelto_alterno, adicional, origen, notaCredito)

                    Dim oCTGeneracionAsientos As New Nomade.CT.CTGeneracionAsientos()
                    Dim strCodAsientoCobroVenta As String
                    For Each item As String In detalle.Split("|")
                        'Ejemplo de traza: V01039153,B/BE01 - 0026864,10,0,S,0001|V01039155,B/BE01 - 0026865,20,0,S,0001
                        Dim strCodVenta As String = item.Split(",")(0)
                        strCodAsientoCobroVenta = oCTGeneracionAsientos.GenerarAsientoCobroDocVenta(strCodVenta)
                    Next

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE_GENERADO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")

                    If RUTA_IMAGEN <> "" And resArray(1) = "TC" And VALIDAR_IMG = "SI" Then
                        RUTA = GrabaImagen(RUTA_IMAGEN, context, resArray(0).ToString + ".jpg")
                    End If

                    res = resb.ToString()

                Case "1.6" 'crear pago c/ nota credito
                    If RUTA_IMAGEN = "../../recursos/img/no_disponible.jpg" Then
                        VALIDAR_IMG = "NO"
                    Else
                        VALIDAR_IMG = "SI"
                    End If

                    resArray = CobroCliente.CobrarClienteNotaCredito(usuario, empresa, fecha_pago, notaCredito, tipo_cambio, efectivo_recibido, efectivo_recibido_alterno, vuelto, vuelto_alterno, VALIDAR_IMG)

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE_GENERADO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                    resb.Append("}")
                    resb.Append("]")

                    If RUTA_IMAGEN <> "" And resArray(1) = "TC" And VALIDAR_IMG = "SI" Then
                        RUTA = GrabaImagen(RUTA_IMAGEN, context, resArray(0).ToString + ".jpg")
                    End If

                    res = resb.ToString()

                Case "2" 'lista forma de pago

                    dt = ccPercepcion.ListarFormasPago("", "", "", "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion_corta", "FOPA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "descripcion_corta", "ASC"), "codigo", "descripcion_corta", "FOPA")
                    End If


                Case "3"
                    dt = CobroCliente.ListarClientesConDeuda(empresa)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "pidm", "razon_social", "CLIENTE")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "razon_social", "ASC"), "pidm", "razon_social", "CLIENTE")
                    End If

                Case "3.5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = NCcliente.ListarClienteAuto("", "", "", "", empresa)
                    If Not dt Is Nothing Then

                        res = Utilities.Datatable2Json(dt)
                        'res = GenerarSelect(dt, "pidm", "razon_social", "CLIENTE")
                    Else
                        ' res = GenerarSelect(SortDataTableColumn(dt, "razon_social", "ASC"), "pidm", "razon_social", "CLIENTE")
                        res = "[]"
                    End If


                Case "4"
                    dt = ccCuentasPorCobrar.ListarDeudasDeCliente(empresa, "N", "", clientepidm, establec, fini, ffin)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If CODIGO_VENTA = "" Then
                                '       If Convert.ToDecimal(row("POR_PAGAR_BASE").ToString) > 0 Then
                                resb.Append("{")
                                resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                                resb.Append("""FECHA_EMISION"":""" & row("FECHA_EMISION").ToString & """,")
                                resb.Append("""MONTO_MONE_BASE"":""" & row("MONTO_MONE_BASE").ToString & """,")
                                resb.Append("""MONTO_MONE_ALTER"":""" & row("MONTO_MONE_ALTER").ToString & """,")
                                resb.Append("""ES_MONEDA_BASE"":""" & row("ES_MONEDA_BASE").ToString & """,")
                                resb.Append("""POR_PAGAR_BASE"":""" & row("POR_PAGAR_BASE").ToString & """,")
                                resb.Append("""POR_PAGAR_ALTER"":""" & row("POR_PAGAR_ALTER").ToString & """,")
                                resb.Append("""VALOR_TIPO_CAMBIO"":""" & row("VALOR_TIPO_CAMBIO").ToString & """,")
                                resb.Append("""ANTICIPO_IND"":""" & row("ANTICIPO_IND").ToString & """,")
                                resb.Append("""DOC_CANJEADO"":""" & row("DOC_CANJEADO").ToString & """,")
                                resb.Append("""RETENCION_IND"":""" & row("RETENCION_IND").ToString & """,")
                                resb.Append("""SUCURSAL_CODE"":""" & row("SUCURSAL_CODE").ToString & """")
                                resb.Append("},")
                                '  End If
                            Else
                                If row("CODIGO").ToString = CODIGO_VENTA Then
                                    resb.Append("{")
                                    resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                    resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                                    resb.Append("""FECHA_EMISION"":""" & row("FECHA_EMISION").ToString & """,")
                                    resb.Append("""MONTO_MONE_BASE"":""" & row("MONTO_MONE_BASE").ToString & """,")
                                    resb.Append("""MONTO_MONE_ALTER"":""" & row("MONTO_MONE_ALTER").ToString & """,")
                                    resb.Append("""ES_MONEDA_BASE"":""" & row("ES_MONEDA_BASE").ToString & """,")
                                    resb.Append("""POR_PAGAR_BASE"":""" & row("POR_PAGAR_BASE").ToString & """,")
                                    resb.Append("""POR_PAGAR_ALTER"":""" & row("POR_PAGAR_ALTER").ToString & """,")
                                    resb.Append("""VALOR_TIPO_CAMBIO"":""" & row("VALOR_TIPO_CAMBIO").ToString & """,")
                                    resb.Append("""ANTICIPO_IND"":""" & row("ANTICIPO_IND").ToString & """,")
                                    resb.Append("""DOC_CANJEADO"":""" & row("DOC_CANJEADO").ToString & """,")
                                    resb.Append("""RETENCION_IND"":""" & row("RETENCION_IND").ToString & """,")
                                    resb.Append("""SUCURSAL_CODE"":""" & row("SUCURSAL_CODE").ToString & """")
                                    resb.Append("},")
                                End If
                            End If
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else

                    End If

                Case "4.5" 'lista amortizaciones (detalles de filas de tabla) DESDE fabampr

                    dt = ccCuentasPorCobrar.ListarAmortizacionesCliente(factura)
                    dt2 = anticipo.ListarAnticipoDocumento(factura)

                    resb.Append("[")

                    If Not dt Is Nothing Then

                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""DESTINO"":""" & row("DESTINO").ToString & """,")
                            resb.Append("""ORIGEN"":""" & row("ORIGEN").ToString & """,")
                            resb.Append("""FECHA"":{""display"":""" & row("FECHA_FORMATO").ToString & """,""order"":""" & String.Join("", row("FECHA_FORMATO").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""FORMA_PAGO"":""" & row("FORMA_PAGO").ToString & """,")
                            resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"":""" & row("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """")
                            resb.Append("},")

                        Next
                    End If

                    If Not dt2 Is Nothing Then

                        For Each row As DataRow In dt2.Rows
                            resb.Append("{")
                            resb.Append("""DESTINO"":""-"",")
                            resb.Append("""ORIGEN"":""-"",")
                            resb.Append("""FECHA"":{""display"":"""",""order"":""""},")
                            resb.Append("""FORMA_PAGO"":""ANTICIPO"",")
                            resb.Append("""DOCUMENTO"":""" & row("NUM_DCTO").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"":""" & row("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""MONTO"":""" & IIf(row("MONEDA_BASE") = "S", row("monto_moba").ToString, row("monto_moal").ToString) & """")
                            resb.Append("},")

                        Next
                    End If

                    If resb.ToString() <> "[" Then


                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")

                        res = resb.ToString()

                        If res = "[-]" Then
                            res = ""
                        End If

                    Else
                        res = ""
                    End If



                Case "5"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If


                Case "5.5"
                    Dim p As New Nomade.NC.NCSucursal("bn")
                    dt = p.ListarSucursal(empresa, "", "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "ESTABLECIMIENTO")
                    End If


                Case "6"

                    dt = s.Listar_DatosBancarios(empresapidm, "", banco, moneda, "", "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DESCRIPCION", "CTABANC")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "code", "DESCRIPCION", "CTABANC")
                    End If

                Case "6.5"

                    dt = s.Listar_DatosBancarios(empresapidm, "", "", moneda, "", "A")

                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DES", "CTABANC")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DES", "ASC"), "code", "DES", "CTABANC")
                    End If

                Case "7"
                    Dim p As New Nomade.NC.NCCaja("BN")
                    dt = p.ListarCajasAperturadas(String.Empty, empresa, If(scsl = Nothing, String.Empty, scsl), String.Empty, "A", If(usua_id = Nothing, "", usua_id))
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "CODIGO", "DESCRIPCION", "CAJA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "CODIGO", "DESCRIPCION", "CAJA")
                    End If

                    'VALIDA CAJA ACTIVA
                Case "7.5"
                    Dim p As New Nomade.NC.NCCaja("BN")
                    res = p.ListarCajasAperturadas(codigo, empresa, String.Empty, String.Empty, "A").Rows(0)("MONTOCAJA").ToString()



                Case "8"
                    Dim p As New Nomade.NB.NBCheque("Bn")
                    dt = p.ListarCheque("", cuenta, pidmcuenta, "", "E", "P")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "NUMERO_CHEQ", "NUMERO_CHEQ", "CHEQUE")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "NUMERO_CHEQ", "ASC"), "NUMERO_CHEQ", "NUMERO_CHEQ", "CHEQUE")
                    End If

                Case "9"
                    Dim p As New Nomade.NC.NCTarjetasEmpresa("Bn")
                    dt = p.ListarTarjetaEmpresa("", pidmcuenta, cuenta, "A", tipo)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "CODE", "NUMERO", "NTARJETA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "NUMERO", "ASC"), "CODE", "NUMERO", "NTARJETA")
                    End If

                Case "10"
                    Dim p As New Nomade.CA.NotaCredito("Bn")
                    dt = p.ListarNotaCredito(String.Empty, 0, String.Empty, empresa, String.Empty, clientepidm, "V", String.Empty, String.Empty, String.Empty, String.Empty, String.Empty)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows

                            If row("MONTO_USABLE") > 0 Then
                                resb.Append("{")
                                resb.Append("""DOCUMENTO_ORIGEN"":""" & row("DOCUMENTO_ORIGEN").ToString & """,")
                                resb.Append("""MONTO_USABLE"":""" & row("MONTO_USABLE").ToString & """,")
                                resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                                resb.Append("""MONTO_TOTAL"":""" & row("MONTO_TOTAL").ToString & """,")
                                resb.Append("""ORIGEN_TIPO_DOC_DESC"":""" & row("ORIGEN_TIPO_DOC_DESC").ToString & """,")
                                resb.Append("""MONEDA"":""" & row("MONEDA").ToString & """,")
                                resb.Append("""MONEDA_SIMBOLO"":""" & row("MONEDA_SIMBOLO").ToString & """,")
                                resb.Append("""MONE_CODE"":""" & row("MONE_CODE").ToString & """,")
                                resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """")
                                resb.Append("},")
                            End If
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")

                        res = resb.ToString()

                        If res = "[-]" Then
                            res = "SIN_NOTAS"
                        End If
                    Else
                        res = "SIN_NOTAS"
                    End If


                Case "11"
                    Dim p As New Nomade.CA.NotaCredito("Bn")
                    dt = p.ListarNotaCreditoCobro(empresa, clientepidm)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows

                            If row("MONTO_USABLE") > 0 Then
                                resb.Append("{")
                                resb.Append("""DOCUMENTO_ORIGEN"":""" & row("DOCUMENTO_ORIGEN").ToString & """,")
                                resb.Append("""MONTO_USABLE"":""" & row("MONTO_USABLE").ToString & """,")
                                resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                                resb.Append("""MONTO_TOTAL"":""" & row("MONTO_TOTAL").ToString & """,")
                                resb.Append("""ORIGEN_TIPO_DOC_DESC"":""" & row("ORIGEN_TIPO_DOC_DESC").ToString & """,")
                                resb.Append("""MONEDA"":""" & row("MONEDA").ToString & """,")
                                resb.Append("""MONEDA_SIMBOLO"":""" & row("MONEDA_SIMBOLO").ToString & """,")
                                resb.Append("""MONE_CODE"":""" & row("MONE_CODE").ToString & """,")
                                resb.Append("""MOTIVO"":""" & row("MOTIVO").ToString & """,")
                                resb.Append("""SUCURSAL_DESC"":""" & row("SUCURSAL_DESC").ToString & """,")
                                resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """")
                                resb.Append("},")
                            End If
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")

                        res = resb.ToString()

                        If res = "[-]" Then
                            res = "SIN_NOTAS"
                        End If
                    Else
                        res = "SIN_NOTAS"
                    End If

                Case "M"
                    Dim p As New Nomade.NC.NCMonedas("BN")
                    dt = p.ListarMoneda(codigo, String.Empty, "A")
                    res = dt.Rows(0)("Simbolo").ToString

                Case "PI"
                    res = Utilities.FileImgToBase64(sRutaImagenes + RUTA_IMAGEN)

                Case "MO"
                    Dim p As New Nomade.GL.GLLetras("Bn")
                    dt = p.ListarMoneda(empresa)
                    res = GenerarSelect(dt, "codigo", "descripcion", "MONEDA")


                Case "POS"
                    Dim p As New Nomade.NC.NCCaja("Bn")
                    dt = p.ListaPOS(caja, empresa, estable, "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "CODIGO_POS", "POST_DESCRIPCION", "POS")
                    Else
                        'res = GenerarSelect(SortDataTableColumn(dt, "POST_DESCRIPCION", "ASC"), "CODIGO_POS", "POST_DESCRIPCION", "POS")
                        res = GenerarSelect(SortDataTableColumn(dt, "PREDETERMINADO", "DESC"), "CODIGO_POS", "POST_DESCRIPCION", "POS") 'DPORTA
                    End If
                Case "POS_PRED" 'DPORTA 24/06/2021
                    Dim p As New Nomade.NC.NCCaja("Bn")
                    dt = p.ListaPOS_PRED(caja, empresa, estable, "A")
                    res = dt.Rows(0)("CODIGO_POS").ToString
                Case "MTAR"
                    dt = mtar.ListarMarcaTarjeta("", "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "marca", "MARCA_TARJETA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "marca", "ASC"), "codigo", "marca", "MARCA_TARJETA")
                    End If

                Case "BCO"
                    Dim p As New Nomade.NC.NCBanco("Bn")
                    dt = p.ListarBanco("", "A")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "BANCO", "NOMBRE_COMERCIAL", "BANCO")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "NOMBRE_COMERCIAL", "ASC"), "BANCO", "NOMBRE_COMERCIAL", "BANCO")
                    End If

                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = CobroCliente.ListarCobroClientes(empresa, estable, cliente, fini, ffin)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CLIENTE"":""" & row("CLIENTE").ToString & """,")
                            resb.Append("""FECHA_PAGO"":""" & row("FECHA_PAGO").ToString & """,")
                            resb.Append("""MONEDA"":""" & row("MONEDA").ToString & """,")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            resb.Append("""ORIGEN"":""" & row("ORIGEN").ToString & """,")
                            resb.Append("""CAJA_BCO"":""" & row("CAJA_BCO").ToString & """,")
                            resb.Append("""FORMA_PAGO"":""" & row("FORMA_PAGO").ToString & """,")
                            resb.Append("""NRO_OP"":""" & row("NRO_OP").ToString & """,")
                            resb.Append("""RECEPCION"":""" & row("RECEPCION").ToString & """,")
                            resb.Append("""CODE_DOCUMENTO"":""" & row("CODE_DOCUMENTO").ToString & """,")
                            resb.Append("""FOTO"":""" & row("FOTO").ToString & """")
                            resb.Append("},")
                        Next

                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")

                        res = resb.ToString()

                        'res = Utilities.Datatable2Json(dt)

                    Else

                        res = "[]"

                    End If


            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try

    End Sub

    Public Function GrabaImagen(ByVal img As String, ByVal context As HttpContext, ByVal nombrearch As String) As String
        Dim rp As String = String.Empty
        Try
            Dim savepath As String = sRutaImagenes
            Dim filename As String = nombrearch

            If Not Directory.Exists(savepath) Then
                Directory.CreateDirectory(savepath)
            End If

            File.WriteAllBytes(savepath & "\" & filename, Utilities.Base64ImgToBytes(img))
            rp = "/" & filename

            context.Response.StatusCode = 200

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

        Return rp
    End Function


    Private Function GetEncoder(ByVal format As ImageFormat) As ImageCodecInfo
        Dim codecs As ImageCodecInfo() = ImageCodecInfo.GetImageDecoders()
        Dim codec As ImageCodecInfo
        For Each codec In codecs
            If codec.FormatID = format.Guid Then
                Return codec
            End If
        Next codec
        Return Nothing
    End Function


    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then

            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase = "EMPRESA" Then
                    res += "<option pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    If clase = "CTABANC" Then
                        res += "<option monto=""" & dt.Rows(i)("SALDO") & """ banco=""" & dt.Rows(i)("BANC_CODE") & """ moneda=""" & dt.Rows(i)("MONE_CODE").ToString() & """ pidm=""" & dt.Rows(i)("PIDM").ToString() & """ billetera_dig=""" & dt.Rows(i)("BILLETERA_DIG").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    Else
                        If clase = "MONEDA" Then
                            res += "<option tipo=""" & dt.Rows(i)("TIPO").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                        Else
                            If clase = "CAJA" Then
                                res += "<option monto=""" & dt.Rows(i)("MONTOCAJA").ToString() & """ monto_d=""" & dt.Rows(i)("MONTOCAJA_DOLARES").ToString() & """ codigo=""" & dt.Rows(i)("CODIGO_APERTURA").ToString() & """ stbl=""" & dt.Rows(i)("SUCURSAL").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & " - S/." & dt.Rows(i)("MONTOCAJA").ToString() & " $" & dt.Rows(i)("MONTOCAJA_DOLARES").ToString() & "</option>"
                            Else
                                If clase = "CHEQUE" Then
                                    res += "<option tipo=""" & dt.Rows(i)("TIPO").ToString() & """ ngiradoa=""" & dt.Rows(i)("NGIRADOA").ToString() & """ giradoa=""" & dt.Rows(i)("GIRADOA").ToString() & """ monto=""" & dt.Rows(i)("MONTO").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & " (" & dt.Rows(i)("SMONEDA").ToString() & " " & dt.Rows(i)("MONTO").ToString() & ")" & "</option>"
                                Else
                                    If clase = "POS" Then
                                        res += "<option tarjetas=""" & dt.Rows(i)("TARJETAS") & """ moneda=""" & dt.Rows(i)("MONEDA") & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                                    Else
                                        If clase = "CLIENTE" Then
                                            If dt.Rows(i)(chtml).ToString() <> String.Empty Then
                                                res += "<option data-direccion=""" & dt.Rows(i)("DIRECCION").ToString() & """ data-retencion=""" & dt.Rows(i)("RETENCION_IND").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                                            End If
                                        Else
                                            If dt.Rows(i)(chtml).ToString() <> String.Empty Then
                                                res += "<option value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                                            End If
                                        End If
                                    End If
                                End If
                            End If
                        End If
                    End If
                End If
            Next

        Else
            res = "error"
        End If
        Return res
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

End Class
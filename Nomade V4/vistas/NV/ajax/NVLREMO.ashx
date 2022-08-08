<%@ WebHandler Language="VB" Class="NVLREMO" %>

Imports iTextSharp.text
Imports iTextSharp.text.pdf
Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.IO.FileStream

Public Class NVLREMO : Implements IHttpHandler
    Dim OPCION As String
    Dim p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_CODE_MOVI, p_DESDE, p_HASTA, p_DET_GASTO As String


    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")
    Dim ncCaja As New Nomade.NC.NCCaja("Bn")
    Dim caMovimientos As New Nomade.CA.CAMovimientos("Bn")
    Dim gesPro As New Nomade.NM.NMGestionProductos("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    'correo
    Dim REMITENTE, DESTINATARIOS, ASUNTO, MENSAJE As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_DESDE = context.Request("p_DESDE")
        p_HASTA = context.Request("p_HASTA")
        p_DET_GASTO = context.Request("p_DET_GASTO")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_CODE_MOVI = context.Request("p_CODE_MOVI")

        REMITENTE = context.Request("REMITENTE")
        DESTINATARIOS = context.Request("DESTINATARIOS")
        ASUNTO = context.Request("asunto")
        MENSAJE = context.Request("MENSAJE")

        Try
            Select Case OPCION
                Case "1" 'Generar tabla contado (montos)
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarVentasContado(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    'If Not (dt Is Nothing) Then
                    res = GenerarTablaVentasContado(dt)
                    'End If
                Case "2" 'Generar tabla crédito (montos)
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarCobroVentasCredito(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    'If Not (dt Is Nothing) Then
                    res = GenerarTablaCobroVentasCredito(dt)
                    'End If
                Case "3" 'Listar detalles de movimientos caja (resúmen) JSON
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caMovimientos.ResumenDetallesMovimientosCaja(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "4" 'Generar tabla pago gastos por banco (montos)
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarPagoGastosPorBanco(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    'If Not (dt Is Nothing) Then
                    res = GenerarTablaPagoGastosPorBanco(dt)
                    'End If
                Case "4.5" 'Generar tabla pago gastos de caja (montos)
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarDetGastos(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    'If Not (dt Is Nothing) Then
                    res = GenerarTablaDetGastos(dt)
                    'End If
                Case "5" 'Generar tabla ventas área (montos)
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarVentasArea(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    'If Not (dt Is Nothing) Then
                    res = GenerarTablaVentasArea(dt)
                    'End If
                Case "6" 'Generar tabla ventas sub-área (montos)
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarVentasSubArea(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    'If Not (dt Is Nothing) Then
                    res = GenerarTablaVentasSubArea(dt)
                    'End If
                Case "7" 'Generar tabla inconsistencias (montos)
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarInconsistencias(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA))
                    If Not (dt Is Nothing) Then
                        res = GenerarTablaInconsistencias(dt)
                    End If
                Case "IMPR" 'Generar tabla para impresion de detalle 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = GenerarReporteImprimir(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), p_HASTA, p_DET_GASTO)
                Case "GENERAR_PDF" 'DPORTA
                    Dim msgError As String = "OK"
                    p_CODE_MOVI = "Reporte_Monetario_"
                    Try
                        GenerarPDF(p_CODE_MOVI, p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), p_DESDE, p_HASTA, p_DET_GASTO)
                    Catch ex As Exception
                        msgError = "ERROR: " + ex.Message
                    End Try
                    res = msgError.ToString()
                Case "correo"
                    Dim email As New Nomade.Mail.NomadeMail("Bn")
                    p_CODE_MOVI = "Reporte_Monetario_"
                    'GenerarPDF(p_CODE_MOVI, p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), p_DESDE, p_HASTA) 'DPORTA PDF
                    Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_CODE_MOVI & Date.Now().ToString("ddMMyyyy") & ".pdf"

                    Dim documento As String = ""

                    documento = GenerarDctoCorreo(p_CODE_MOVI, p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), p_DET_GASTO)
                    MENSAJE += documento
                    'email.enviar(REMITENTE, REMITENTE, DESTINATARIOS, ASUNTO, MENSAJE, datoAj) 'DPORTA PDF
                    email.enviar(REMITENTE, REMITENTE, DESTINATARIOS, ASUNTO, MENSAJE)
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function GenerarPDF(ByVal CODIGO As String, ByVal CTLG As String, ByVal SCSL As String, ByVal DESDE As String, ByVal HASTA As String, ByVal p_DESDEH As String, ByVal p_HASTAH As String, ByVal p_DET_GASTO As String) As String
        Dim ress As String = ""
        Dim htmlText As StringBuilder
        Dim cNomArch As String = CODIGO + Date.Now().ToString("ddMMyyyy") + ".pdf"
        htmlText = GenerarReportePDF(CTLG, SCSL, DESDE, HASTA, p_DESDEH, p_HASTAH, p_DET_GASTO)
        HTMLToPDF(htmlText, cNomArch)
        Return ress
    End Function

    Function getHtmlTextPDF(ByVal codigo As String, ByVal ctlg As String, ByVal scsl As String, ByVal desde As String, ByVal hasta As String, ByVal p_DET_GASTO As String) As String
        Dim htmlText As New StringBuilder
        htmlText.Length = 0
        Dim documento As String = ""
        documento = GenerarDctoCorreo(codigo, ctlg, scsl, desde, hasta, p_DET_GASTO)
        htmlText.Append(documento)
        Return htmlText.ToString
    End Function

    Public Function GenerarDctoCorreo(ByVal p_CODE_MOVI As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_DET_GASTO As String) As String
        Dim tabla As New StringBuilder
        Dim dtVentasContado As New DataTable
        Dim dtVentasCredito As New DataTable
        Dim dtResumenCajas As New DataTable
        Dim dtPagoGastosBanco As New DataTable
        Dim dtVentasArea As New DataTable
        Dim dtVentasSubArea As New DataTable
        Dim dtInconsistencias As New DataTable
        Dim dtDetGastos As New DataTable

        Dim caMovimientos As New Nomade.CA.CAMovimientos("Bn")
        dtVentasContado = caMovimientos.ListarVentasContado(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtVentasCredito = caMovimientos.ListarCobroVentasCredito(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtResumenCajas = caMovimientos.ResumenDetallesMovimientosCaja(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtPagoGastosBanco = caMovimientos.ListarPagoGastosPorBanco(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtVentasArea = caMovimientos.ListarVentasArea(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtVentasSubArea = caMovimientos.ListarVentasSubArea(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtInconsistencias = caMovimientos.ListarInconsistencias(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        If p_DET_GASTO = "S" Then
            dtDetGastos = caMovimientos.ListarDetGastos(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        End If
        'tabla.Clear()
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        Dim efectivoIngresoSoles As Decimal = 0
        Dim efectivoIngresoDolares As Decimal = 0
        Dim tarjetaIngresoSoles As Decimal = 0
        Dim tarjetaIngresoDolares As Decimal = 0
        Dim cuentasIngresoSoles As Decimal = 0
        Dim cuentasIngresoDolares As Decimal = 0
        Dim totalIngresoSoles As Decimal = 0
        Dim totalIngresoDolares As Decimal = 0
        Dim totalCreditoSoles As Decimal = 0
        Dim totalCreditoDolares As Decimal = 0
        Dim totalAutoDetraSoles As Decimal = 0
        Dim totalAutoDetraDolares As Decimal = 0
        Dim totalComisionSoles As Decimal = 0
        Dim totalComisionDolares As Decimal = 0
        Dim otrosMediosPagosSoles As Decimal = 0
        Dim otrosMediosPagosDolares As Decimal = 0
        Dim devolucionSoles As Decimal = 0
        Dim devolucionDolares As Decimal = 0
        'crédito
        Dim efectivoIngresoSolesC As Decimal = 0
        Dim efectivoIngresoDolaresC As Decimal = 0
        Dim tarjetaIngresoSolesC As Decimal = 0
        Dim tarjetaIngresoDolaresC As Decimal = 0
        Dim cuentasIngresoSolesC As Decimal = 0
        Dim cuentasIngresoDolaresC As Decimal = 0
        Dim totalIngresoSolesC As Decimal = 0
        Dim totalIngresoDolaresC As Decimal = 0
        Dim totalCreditoSolesC As Decimal = 0
        Dim totalCreditoDolaresC As Decimal = 0
        Dim totalAutoDetraSolesC As Decimal = 0
        Dim totalAutoDetraDolaresC As Decimal = 0
        Dim totalComisionSolesC As Decimal = 0
        Dim totalComisionDolaresC As Decimal = 0
        Dim otrosMediosPagosSolesC As Decimal = 0
        Dim otrosMediosPagosDolaresC As Decimal = 0
        If (dtVentasContado Is Nothing) Then
            'No hay datos     
        Else
            Dim continuar As Boolean = True

            For i As Integer = 0 To dtVentasContado.Rows.Count - 1
                If dtVentasContado.Rows(i)("ANULADO_IND") = "N" Then
                    continuar = True
                Else
                    continuar = False
                End If

                If continuar Then
                    'EFECTIVO
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0008") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0009"))) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            efectivoIngresoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            efectivoIngresoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    'TARJETA DE DEBITO  / TARJETA DE CREDITO
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0006"))) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            tarjetaIngresoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            tarjetaIngresoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEPOSITO EN CUENTA
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0001") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0003") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0013"))) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            cuentasIngresoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            cuentasIngresoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' OTROS MEDIOS DE PAGO
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0020")) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            otrosMediosPagosSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            otrosMediosPagosDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEVOLUCIÓN A CLIENTE
                    If dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("SI") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            devolucionSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            devolucionDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' SOLO EL MONTO DE VENTAS AL CRÉDITO
                    If dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0002") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalCreditoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_VENTA"))
                        Else
                            totalCreditoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_VENTA"))
                        End If
                    End If
                    ' AUTO-DETRACCIONES
                    If dtVentasContado.Rows(i)("AUTODETRACCION").ToString().Equals("S") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalAutoDetraSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_DETRACCION"))
                        Else
                            totalAutoDetraDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_DETRACCION"))
                        End If
                    End If
                    ' COMISIÓN DE TARJETAS
                    If (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalComisionSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_COMISION_TARJETA"))
                        Else
                            totalComisionDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_COMISION_TARJETA"))
                        End If
                    End If
                End If
            Next
            totalIngresoSoles = efectivoIngresoSoles + tarjetaIngresoSoles + cuentasIngresoSoles + otrosMediosPagosSoles
            totalIngresoDolares = efectivoIngresoDolares + tarjetaIngresoDolares + cuentasIngresoDolares + otrosMediosPagosDolares
        End If
        'COBRO VENTAS AL CRÉDITO
        If (dtVentasCredito Is Nothing) Then
            'No hay datos     
        Else
            Dim continuar As Boolean = True

            For i As Integer = 0 To dtVentasCredito.Rows.Count - 1
                If dtVentasCredito.Rows(i)("ANULADO_IND") = "N" Then
                    continuar = True
                Else
                    continuar = False
                End If

                If continuar Then
                    'EFECTIVO
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0008") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0009")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            efectivoIngresoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            efectivoIngresoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    'TARJETA DE DEBITO  / TARJETA DE CREDITO
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            tarjetaIngresoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            tarjetaIngresoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEPOSITO EN CUENTA
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0001") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0003") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0013")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            cuentasIngresoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            cuentasIngresoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    ' OTROS MEDIOS DE PAGO
                    'If dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0020") Then
                    '    If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                    '        otrosMediosPagosSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                    '    Else
                    '        otrosMediosPagosDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                    '    End If
                    'End If
                    ' PENDIENTES A COBRAR
                    If dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("") And dtVentasCredito.Rows(i)("PAGADO_IND").ToString().Equals("N") Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalCreditoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            totalCreditoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DETRACCIONES A CLIENTES (YA PAGADOS)
                    If dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("X") And dtVentasCredito.Rows(i)("AUTODETRACCION").ToString().Equals("N") Then 'And dt.Rows(i)("DETRA_PAGADO_IND").ToString().Equals("S") Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalAutoDetraSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_DETRACCION"))
                        Else
                            totalAutoDetraDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_DETRACCION"))
                        End If
                    End If
                    ' COMISIÓN DE TARJETAS
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalComisionSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_COMISION_TARJETA"))
                        Else
                            totalComisionDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_COMISION_TARJETA"))
                        End If
                    End If
                End If
            Next
            totalIngresoSolesC = efectivoIngresoSolesC + tarjetaIngresoSolesC + cuentasIngresoSolesC + otrosMediosPagosSolesC
            totalIngresoDolaresC = efectivoIngresoDolaresC + tarjetaIngresoDolaresC + cuentasIngresoDolaresC + otrosMediosPagosDolaresC
        End If
        tabla.AppendFormat("<input id='datosMoba' type='hidden' value='{0}'/>", simbMonedaBase)
        tabla.AppendFormat("<input id='datosMoal' type='hidden' value='{0}'/>", simbMonedaAlterna)
        tabla.AppendFormat("<table id=""tblDctoImprimir"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
        tabla.AppendFormat("<thead>")
        tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        tabla.AppendFormat("<th>VENTAS AL CONTADO</th>")
        tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>VENTAS MONEDA NACIONAL ({0})</th>", simbMonedaBase)
        tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>VENTAS MONEDA EXTRANJERA ({0})</th>", simbMonedaAlterna)
        tabla.AppendFormat("</tr>")
        tabla.AppendFormat("</thead>")
        tabla.AppendFormat("<tbody>")

        'Fila 1 EFECTIVO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>VENTAS EN EFECTIVO</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 2 TARJETA
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>VENTAS CON TARJETA</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 3 BANCO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>VENTAS BANCARIZADAS</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 4 OTROS MEDIOS DE PAGO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>BILLETERA DIGITAL</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 5 TOTALES
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>TOTAL AL CONTADO</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 5.5 DEVOLUCION
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>DEVOLUCIÓN AL CLIENTE</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", devolucionSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", devolucionDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 6 TOTAL CRÉDITO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>VENTAS AL CRÉDITO</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 7 TOTAL AUTO-DETRACCIONES
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>AUTO-DETRACCIONES</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 8 TOTAL COMISIONES TARJETA
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COMISIÓN POR VENTAS CON TARJETA</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")
        'COBRO VENTAS AL CRÉDITO
        tabla.AppendFormat("</tbody>")
        tabla.AppendFormat("<thead>")
        tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        tabla.AppendFormat("<th>COBRO VENTAS AL CRÉDITO</th>")
        tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>VENTAS MONEDA NACIONAL ({0})</th>", simbMonedaBase)
        tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>VENTAS MONEDA EXTRANJERA ({0})</th>", simbMonedaAlterna)
        tabla.AppendFormat("</tr>")
        tabla.AppendFormat("</thead>")
        tabla.AppendFormat("<tbody>")

        'Fila 1 EFECTIVO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COBRANZAS EFECTIVO</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 2 TARJETA
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COBRANZAS TARJETA</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 3 BANCO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COBRANZAS BANCARIZADAS</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 4 OTROS MEDIOS DE PAGO
        'tabla.AppendFormat("<tr>")
        'tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COBRANZA OTROS MEDIOS DE PAGO</strong></td>")
        'tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosSolesC, simbMonedaBase)
        'tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosDolaresC, simbMonedaAlterna)
        'tabla.AppendFormat("</tr>")

        'Fila 5 TOTALES
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>TOTAL COBRANZAS EFECTUADAS</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 6 TOTAL CRÉDITO 
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", p_HASTA, "PENDIENTES A COBRAR AL ")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 7 TOTAL AUTO-DETRACCIONES
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COBRO DE DETRACCIONES A CLIENTES</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 8 TOTAL COMISIONES TARJETA
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COMISIÓN POR COBRANZAS CON TARJETA</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        tabla.AppendFormat("</tbody>")
        tabla.AppendFormat("</table>")
        'PAGO GASTOS POR BANCO
        If Not (dtPagoGastosBanco Is Nothing) Then
            tabla.AppendFormat("<table id=""tblTotales3"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
            tabla.AppendFormat("<thead>")
            tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
            tabla.AppendFormat("<th>PAGO DE GASTOS POR BANCO (CUENTA)</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>MONTO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("</tr>")
            tabla.AppendFormat("</thead>")
            tabla.AppendFormat("<tbody>")
            For i As Integer = 0 To dtPagoGastosBanco.Rows.Count - 1
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtPagoGastosBanco.Rows(i)("NRO_CUENTA").ToString())
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtPagoGastosBanco.Rows(i)("MONTO_PAGADO").ToString())))
                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody>")
            tabla.Append("</table>")
        End If
        'VENTAS ÁREA
        If Not (dtVentasArea Is Nothing) Then
            tabla.AppendFormat("<table id=""tblTotales4"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
            tabla.AppendFormat("<thead>")
            tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
            tabla.AppendFormat("<th>VENTAS ÁREA</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>MONTO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("</tr>")
            tabla.AppendFormat("</thead>")
            tabla.AppendFormat("<tbody>")
            For i As Integer = 0 To dtVentasArea.Rows.Count - 1
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtVentasArea.Rows(i)("DESC_GRUPO").ToString())
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtVentasArea.Rows(i)("MONTO").ToString())))
                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody>")
            tabla.Append("</table>")
        End If
        'VENTAS SUB-ÁREA
        If Not (dtVentasSubArea Is Nothing) Then
            tabla.AppendFormat("<table id=""tblTotales5"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
            tabla.AppendFormat("<thead>")
            tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
            tabla.AppendFormat("<th>VENTAS SUB-ÁREA</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>MONTO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("</tr>")
            tabla.AppendFormat("</thead>")
            tabla.AppendFormat("<tbody>")
            For i As Integer = 0 To dtVentasSubArea.Rows.Count - 1
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtVentasSubArea.Rows(i)("DESC_SUB_GRUPO").ToString())
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtVentasSubArea.Rows(i)("MONTO").ToString())))
                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody>")
            tabla.Append("</table>")
        End If
        'INCONSISTENCIAS 
        If Not (dtInconsistencias Is Nothing) Then
            tabla.AppendFormat("<table id=""tblTotales6"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
            tabla.AppendFormat("<thead>")
            tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
            tabla.AppendFormat("<th>INCONSISTENCIAS (CAJA)</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>TIPO</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>FECHA / HORA</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>MONTO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>USUARIO</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>OBSERVACIÓN</th>")
            tabla.AppendFormat("</tr>")
            tabla.AppendFormat("</thead>")
            tabla.AppendFormat("<tbody>")
            For i As Integer = 0 To dtInconsistencias.Rows.Count - 1
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtInconsistencias.Rows(i)("CAJA").ToString())
                tabla.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dtInconsistencias.Rows(i)("INCS_SOLES").ToString())
                tabla.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dtInconsistencias.Rows(i)("FECHA").ToString())
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtInconsistencias.Rows(i)("SOLES").ToString())))
                tabla.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dtInconsistencias.Rows(i)("USUARIO").ToString())
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtInconsistencias.Rows(i)("OBSERVACIONES").ToString())
                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody>")
            tabla.Append("</table>")
        End If
        'GASTOS DE CAJA
        If p_DET_GASTO = "S" Then
            If Not (dtDetGastos Is Nothing) Then
                tabla.AppendFormat("<table id=""tblTotales4.5"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
                tabla.AppendFormat("<thead>")
                tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
                tabla.AppendFormat("<th>GASTOS DE CAJA</th>")
                tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>MONTO ({0})</th>", simbMonedaBase)
                tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>APROBADO</th>")
                tabla.AppendFormat("</tr>")
                tabla.AppendFormat("</thead>")
                tabla.AppendFormat("<tbody>")
                For i As Integer = 0 To dtDetGastos.Rows.Count - 1
                    tabla.Append("<tr>")
                    tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtDetGastos.Rows(i)("DESC_GASTO").ToString())
                    tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtDetGastos.Rows(i)("MONTO_PAGADO").ToString())))
                    tabla.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dtDetGastos.Rows(i)("APROBADO").ToString())
                    tabla.Append("</tr>")
                Next
                tabla.Append("</tbody>")
                tabla.Append("</table>")
            End If
        End If
        'RESUMEN CAJAS 
        If Not (dtResumenCajas Is Nothing) Then
            tabla.AppendFormat("<table id=""tblTotales6"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
            tabla.AppendFormat("<thead>")
            tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>CAJA</th>")
            'tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>ESTABLEC.</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>SALDO EFECTIVO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>INGRESO EFECTIVO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>INGRESO TARJETA ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>EGRESO EFECTIVO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>DIFERIDO A BANCO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>DIFERIDO A OTRA CAJA ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>SALDO EFECTIVO ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>INGRESO EFECTIVO ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>INGRESO TARJETA ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>EGRESO EFECTIVO ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>DIFERIDO A BANCO ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>DIFERIDO A OTRA CAJA ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("</tr>")
            tabla.AppendFormat("</thead>")
            tabla.AppendFormat("<tbody>")
            For i As Integer = 0 To dtResumenCajas.Rows.Count - 1
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtResumenCajas.Rows(i)("DES_CAJA").ToString())
                'tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtResumenCajas.Rows(i)("DESC_ESTABLECIMIENTO").ToString())
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("SALDO_MONTO_SOLES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_SOLES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_SOLES_TARJETA").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("EGR_MONTO_SOLES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CUENTA_MONTO_SOLES").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CAJA_MONTO_SOLES").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("SALDO_MONTO_DOLARES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_DOLARES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_DOLARES_TARJETA").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("EGR_MONTO_DOLARES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CUENTA_MONTO_DOLARES").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CAJA_MONTO_DOLARES").ToString())))
                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody>")
            tabla.Append("</table>")
        End If
        Return tabla.ToString()
    End Function

    Sub HTMLToPDF(ByVal HTML As StringBuilder, ByVal FilePath As String)

        Dim archivo, res As String
        res = "Archivos\" + FilePath
        archivo = HttpContext.Current.Server.MapPath("~") + res
        If My.Computer.FileSystem.FileExists(archivo) Then
            My.Computer.FileSystem.DeleteFile(archivo)
        End If

        Dim document As Document
        document = New Document(PageSize.A2.Rotate(), 25, 25, 45, 20)

        PdfWriter.GetInstance(document, New FileStream(archivo, FileMode.Create))
        document.Open()

        Dim abc As StringReader = New StringReader(HTML.ToString)
        Dim styles As iTextSharp.text.html.simpleparser.StyleSheet = New iTextSharp.text.html.simpleparser.StyleSheet()
        styles.LoadStyle("border", "border-bottom", "2px")

        Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
        hw.Parse(New StringReader(HTML.ToString))
        document.Close()
    End Sub

    Function imgC(ByVal Archivo As String, ByVal imgs As String, ByVal imginf As String) As String

        Dim WatermarkLocation As String = HttpContext.Current.Server.MapPath("~") & imgs
        Dim WatermarkLocationI As String = HttpContext.Current.Server.MapPath("~") & imginf
        Dim FileLocation As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & Archivo
        Dim filePath As String = HttpContext.Current.Server.MapPath("~") & "Archivos\ArchivosAux\" & Archivo
        Dim document As Document = New Document()
        Dim pdfReader As PdfReader = New PdfReader(FileLocation)
        Dim stamp As PdfStamper = New PdfStamper(pdfReader, New FileStream(filePath, FileMode.Create))

        Dim img As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocation)

        img.ScaleAbsoluteWidth(540)
        img.ScaleAbsoluteHeight(70)
        img.SetAbsolutePosition(0, 770)

        Dim imgIn As iTextSharp.text.Image = iTextSharp.text.Image.GetInstance(WatermarkLocationI)
        imgIn.ScaleAbsoluteWidth(595)
        imgIn.ScaleAbsoluteHeight(20)
        imgIn.Alignment = iTextSharp.text.Image.UNDERLYING
        imgIn.SetAbsolutePosition(0, 0)

        Dim waterMark As PdfContentByte
        For page As Integer = 1 To pdfReader.NumberOfPages
            waterMark = stamp.GetOverContent(page)
            waterMark.AddImage(img)
            waterMark.AddImage(imgIn)
        Next

        stamp.FormFlattening = True
        stamp.Close()
        pdfReader.Close()
        document.Close()

        My.Computer.FileSystem.DeleteFile(FileLocation)
        My.Computer.FileSystem.MoveFile(filePath, FileLocation)
        Return "ok"

    End Function

    Public Function GenerarTablaVentasContado(ByVal dt As DataTable) As String
        resb.Clear()
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        Dim efectivoIngresoSoles As Decimal = 0
        Dim efectivoIngresoDolares As Decimal = 0
        Dim tarjetaIngresoSoles As Decimal = 0
        Dim tarjetaIngresoDolares As Decimal = 0
        Dim cuentasIngresoSoles As Decimal = 0
        Dim cuentasIngresoDolares As Decimal = 0
        Dim totalIngresoSoles As Decimal = 0
        Dim totalIngresoDolares As Decimal = 0
        Dim totalCreditoSoles As Decimal = 0
        Dim totalCreditoDolares As Decimal = 0
        Dim totalAutoDetraSoles As Decimal = 0
        Dim totalAutoDetraDolares As Decimal = 0
        Dim totalComisionSoles As Decimal = 0
        Dim totalComisionDolares As Decimal = 0
        Dim otrosMediosPagosSoles As Decimal = 0
        Dim otrosMediosPagosDolares As Decimal = 0
        Dim devolucionSoles As Decimal = 0
        Dim devolucionDolares As Decimal = 0
        If (dt Is Nothing) Then
            'No hay datos     
        Else
            Dim continuar As Boolean = True

            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("ANULADO_IND") = "N" Then
                    continuar = True
                Else
                    continuar = False
                End If

                If continuar Then
                    'EFECTIVO
                    If (dt.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dt.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dt.Rows(i)("FORMA_PAGO").ToString().Equals("0008") Or dt.Rows(i)("FORMA_PAGO").ToString().Equals("0009"))) Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            efectivoIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        Else
                            efectivoIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        End If
                    End If
                    'TARJETA DE DEBITO  / TARJETA DE CREDITO
                    If (dt.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dt.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dt.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dt.Rows(i)("FORMA_PAGO").ToString().Equals("0006"))) Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            tarjetaIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        Else
                            tarjetaIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEPOSITO EN CUENTA
                    If (dt.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dt.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dt.Rows(i)("FORMA_PAGO").ToString().Equals("0001") Or dt.Rows(i)("FORMA_PAGO").ToString().Equals("0003") Or dt.Rows(i)("FORMA_PAGO").ToString().Equals("0013"))) Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            cuentasIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        Else
                            cuentasIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        End If
                    End If
                    ' OTROS MEDIOS DE PAGO
                    If (dt.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dt.Rows(i)("FORMA_PAGO").ToString().Equals("0020")) Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            otrosMediosPagosSoles += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        Else
                            otrosMediosPagosDolares += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEVOLUCIÓN A CLIENTE
                    If dt.Rows(i)("DEV_CLIENTE").ToString().Equals("SI") Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            devolucionSoles += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        Else
                            devolucionDolares += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        End If
                    End If
                    ' SOLO EL MONTO DE VENTAS AL CRÉDITO
                    If dt.Rows(i)("MODO_PAGO").ToString().Equals("0002") And dt.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalCreditoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_VENTA"))
                        Else
                            totalCreditoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_VENTA"))
                        End If
                    End If
                    ' AUTO-DETRACCIONES
                    If dt.Rows(i)("AUTODETRACCION").ToString().Equals("S") And dt.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalAutoDetraSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_DETRACCION"))
                        Else
                            totalAutoDetraDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_DETRACCION"))
                        End If
                    End If
                    ' COMISIÓN DE TARJETAS
                    If (dt.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dt.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) And dt.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalComisionSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_COMISION_TARJETA"))
                        Else
                            totalComisionDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_COMISION_TARJETA"))
                        End If
                    End If
                End If
            Next
            totalIngresoSoles = efectivoIngresoSoles + tarjetaIngresoSoles + cuentasIngresoSoles + otrosMediosPagosSoles
            totalIngresoDolares = efectivoIngresoDolares + tarjetaIngresoDolares + cuentasIngresoDolares + otrosMediosPagosDolares
        End If
        resb.AppendFormat("<input id='datosMoba' type='hidden' value='{0}'/>", simbMonedaBase)
        resb.AppendFormat("<input id='datosMoal' type='hidden' value='{0}'/>", simbMonedaAlterna)
        resb.AppendFormat("<table id=""tblTotales"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        resb.AppendFormat("<th>VENTAS AL CONTADO</th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>Ventas Moneda Nacional ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>Ventas Moneda Extranjera ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        'Fila 1 EFECTIVO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>VENTAS EN EFECTIVO</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 2 TARJETA
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>VENTAS CON TARJETA</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 3 BANCO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>VENTAS BANCARIZADAS</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 4 OTROS MEDIOS DE PAGO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>BILLETERA DIGITAL</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 5 TOTALES
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>TOTAL AL CONTADO</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 5.5 DEVOLUCION
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>DEVOLUCIÓN AL CLIENTE</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", devolucionSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", devolucionDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 6 TOTAL CRÉDITO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>VENTAS AL CRÉDITO</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 7 TOTAL AUTO-DETRACCIONES
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>AUTO-DETRACCIONES</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 8 TOTAL COMISIONES TARJETA
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COMISIÓN POR VENTAS CON TARJETA</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaCobroVentasCredito(ByVal dt As DataTable) As String
        resb.Clear()
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        Dim efectivoIngresoSoles As Decimal = 0
        Dim efectivoIngresoDolares As Decimal = 0
        Dim tarjetaIngresoSoles As Decimal = 0
        Dim tarjetaIngresoDolares As Decimal = 0
        Dim cuentasIngresoSoles As Decimal = 0
        Dim cuentasIngresoDolares As Decimal = 0
        Dim totalIngresoSoles As Decimal = 0
        Dim totalIngresoDolares As Decimal = 0
        Dim totalCreditoSoles As Decimal = 0
        Dim totalCreditoDolares As Decimal = 0
        Dim totalAutoDetraSoles As Decimal = 0
        Dim totalAutoDetraDolares As Decimal = 0
        Dim totalComisionSoles As Decimal = 0
        Dim totalComisionDolares As Decimal = 0
        Dim otrosMediosPagosSoles As Decimal = 0
        Dim otrosMediosPagosDolares As Decimal = 0
        If (dt Is Nothing) Then
            'No hay datos     
        Else
            Dim continuar As Boolean = True

            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("ANULADO_IND") = "N" Then
                    continuar = True
                Else
                    continuar = False
                End If

                If continuar Then
                    'EFECTIVO
                    If (dt.Rows(i)("FORMA_PAGO").ToString().Equals("0008") Or dt.Rows(i)("FORMA_PAGO").ToString().Equals("0009")) Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            efectivoIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        Else
                            efectivoIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        End If
                    End If
                    'TARJETA DE DEBITO  / TARJETA DE CREDITO
                    If (dt.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dt.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            tarjetaIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        Else
                            tarjetaIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEPOSITO EN CUENTA
                    If (dt.Rows(i)("FORMA_PAGO").ToString().Equals("0001") Or dt.Rows(i)("FORMA_PAGO").ToString().Equals("0003") Or dt.Rows(i)("FORMA_PAGO").ToString().Equals("0013")) Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            cuentasIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        Else
                            cuentasIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        End If
                    End If
                    ' OTROS MEDIOS DE PAGO
                    'If dt.Rows(i)("FORMA_PAGO").ToString().Equals("0020") Then
                    '    If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                    '        otrosMediosPagosSoles += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                    '    Else
                    '        otrosMediosPagosDolares += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                    '    End If
                    'End If
                    ' PENDIENTES A COBRAR
                    If dt.Rows(i)("FORMA_PAGO").ToString().Equals("") And dt.Rows(i)("PAGADO_IND").ToString().Equals("N") Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalCreditoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        Else
                            totalCreditoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DETRACCIONES A CLIENTES (YA PAGADOS)
                    If dt.Rows(i)("FORMA_PAGO").ToString().Equals("X") And dt.Rows(i)("AUTODETRACCION").ToString().Equals("N") Then 'And dt.Rows(i)("DETRA_PAGADO_IND").ToString().Equals("S") Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalAutoDetraSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_DETRACCION"))
                        Else
                            totalAutoDetraDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_DETRACCION"))
                        End If
                    End If
                    ' COMISIÓN DE TARJETAS
                    If (dt.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dt.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) Then
                        If dt.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalComisionSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_COMISION_TARJETA"))
                        Else
                            totalComisionDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_COMISION_TARJETA"))
                        End If
                    End If
                End If
            Next
            totalIngresoSoles = efectivoIngresoSoles + tarjetaIngresoSoles + cuentasIngresoSoles + otrosMediosPagosSoles
            totalIngresoDolares = efectivoIngresoDolares + tarjetaIngresoDolares + cuentasIngresoDolares + otrosMediosPagosDolares
        End If
        resb.AppendFormat("<input id='datosMoba' type='hidden' value='{0}'/>", simbMonedaBase)
        resb.AppendFormat("<input id='datosMoal' type='hidden' value='{0}'/>", simbMonedaAlterna)
        resb.AppendFormat("<table id=""tblTotales2"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        resb.AppendFormat("<th>COBRO VENTAS AL CRÉDITO</th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>Ventas Moneda Nacional ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>Ventas Moneda Extranjera ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        'Fila 1 EFECTIVO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COBRANZAS EFECTIVO</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 2 TARJETA
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COBRANZAS TARJETA</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 3 BANCO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COBRANZAS BANCARIZADAS</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 4 OTROS MEDIOS DE PAGO
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COBRANZA OTROS MEDIOS DE PAGO</strong></td>")
        'resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosSoles, simbMonedaBase)
        'resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosDolares, simbMonedaAlterna)
        'resb.AppendFormat("</tr>")

        'Fila 5 TOTALES
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>TOTAL COBRANZAS EFECTUADAS</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 6 TOTAL CRÉDITO 
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", p_HASTA, "PENDIENTES A COBRAR AL ")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 7 TOTAL AUTO-DETRACCIONES
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COBRO DE DETRACCIONES A CLIENTES</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 8 TOTAL COMISIONES TARJETA
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>COMISIÓN POR COBRANZAS CON TARJETA</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaPagoGastosPorBanco(ByVal dt As DataTable) As String
        resb.Clear()
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        '------
        resb.AppendFormat("<table id=""tblTotales3"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        resb.AppendFormat("<th>PAGO DE GASTOS POR BANCO (CUENTA)</th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>MONTO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dt.Rows(i)("NRO_CUENTA").ToString())
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_PAGADO").ToString())))
                resb.Append("</tr>")
            Next
        Else
            resb.Append("<tr>")
            resb.AppendFormat("<td style='text-align:center;border-center: 1px solid #cbcbcb;'>{0}</td>", "No hay datos")
            resb.AppendFormat("<td style='text-align:center;border-center: 1px solid #cbcbcb;'>{0}</td>", "No hay datos")
            resb.Append("</tr>")
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaVentasArea(ByVal dt As DataTable) As String
        resb.Clear()
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        '------
        resb.AppendFormat("<table id=""tblTotales4"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        resb.AppendFormat("<th>VENTAS ÁREA</th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>MONTO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dt.Rows(i)("DESC_GRUPO").ToString())
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO").ToString())))
                resb.Append("</tr>")
            Next
        Else
            resb.Append("<tr>")
            resb.AppendFormat("<td style='text-align:center;border-center: 1px solid #cbcbcb;'>{0}</td>", "No hay datos")
            resb.AppendFormat("<td style='text-align:center;border-center: 1px solid #cbcbcb;'>{0}</td>", "No hay datos")
            resb.Append("</tr>")
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaDetGastos(ByVal dt As DataTable) As String
        resb.Clear()
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        '------
        resb.AppendFormat("<table id=""tblTotales4.5"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        resb.AppendFormat("<th>GASTOS DE CAJA</th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>MONTO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>APROBADO</th>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dt.Rows(i)("DESC_GASTO").ToString())
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_PAGADO").ToString())))
                resb.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dt.Rows(i)("APROBADO").ToString())
                resb.Append("</tr>")
            Next
        Else
            resb.Append("<tr>")
            resb.AppendFormat("<td style='text-align:center;border-center: 1px solid #cbcbcb;'>{0}</td>", "No hay datos")
            resb.AppendFormat("<td style='text-align:center;border-center: 1px solid #cbcbcb;'>{0}</td>", "No hay datos")
            resb.AppendFormat("<td style='text-align:center;border-center: 1px solid #cbcbcb;'>{0}</td>", "No hay datos")
            resb.Append("</tr>")
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaVentasSubArea(ByVal dt As DataTable) As String
        resb.Clear()
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        '------
        resb.AppendFormat("<table id=""tblTotales5"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        resb.AppendFormat("<th>VENTAS SUB-ÁREA</th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>MONTO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dt.Rows(i)("DESC_SUB_GRUPO").ToString())
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO").ToString())))
                resb.Append("</tr>")
            Next
        Else
            resb.Append("<tr>")
            resb.AppendFormat("<td style='text-align:center;border-center: 1px solid #cbcbcb;'>{0}</td>", "No hay datos")
            resb.AppendFormat("<td style='text-align:center;border-center: 1px solid #cbcbcb;'>{0}</td>", "No hay datos")
            resb.Append("</tr>")
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaInconsistencias(ByVal dt As DataTable) As String
        resb.Clear()
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        '------
        resb.AppendFormat("<table id=""tblTotales6"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        resb.AppendFormat("<th>INCONSISTENCIAS (CAJA)</th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>TIPO</th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>FECHA / HORA</th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>MONTO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>USUARIO</th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>OBSERVACIÓN</th>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dt.Rows(i)("CAJA").ToString())
                resb.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dt.Rows(i)("INCS_SOLES").ToString())
                resb.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dt.Rows(i)("FECHA").ToString())
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("SOLES").ToString())))
                resb.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dt.Rows(i)("USUARIO").ToString())
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dt.Rows(i)("OBSERVACIONES").ToString())
                resb.Append("</tr>")
            Next
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        res = resb.ToString()
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

    Public Function GenerarReporteImprimir(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_HASTAH As String, ByVal p_DET_GASTO As String) As String
        Dim tabla As New StringBuilder
        Dim dtVentasContado As New DataTable
        Dim dtVentasCredito As New DataTable
        Dim dtResumenCajas As New DataTable
        Dim dtPagoGastosBanco As New DataTable
        Dim dtVentasArea As New DataTable
        Dim dtVentasSubArea As New DataTable
        Dim dtInconsistencias As New DataTable
        Dim dtDetGastos As New DataTable

        Dim caMovimientos As New Nomade.CA.CAMovimientos("Bn")
        dtVentasContado = caMovimientos.ListarVentasContado(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtVentasCredito = caMovimientos.ListarCobroVentasCredito(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtResumenCajas = caMovimientos.ResumenDetallesMovimientosCaja(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtPagoGastosBanco = caMovimientos.ListarPagoGastosPorBanco(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtVentasArea = caMovimientos.ListarVentasArea(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtVentasSubArea = caMovimientos.ListarVentasSubArea(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtInconsistencias = caMovimientos.ListarInconsistencias(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        If p_DET_GASTO = "S" Then
            dtDetGastos = caMovimientos.ListarDetGastos(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        End If
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        Dim efectivoIngresoSoles As Decimal = 0
        Dim efectivoIngresoDolares As Decimal = 0
        Dim tarjetaIngresoSoles As Decimal = 0
        Dim tarjetaIngresoDolares As Decimal = 0
        Dim cuentasIngresoSoles As Decimal = 0
        Dim cuentasIngresoDolares As Decimal = 0
        Dim totalIngresoSoles As Decimal = 0
        Dim totalIngresoDolares As Decimal = 0
        Dim totalCreditoSoles As Decimal = 0
        Dim totalCreditoDolares As Decimal = 0
        Dim totalAutoDetraSoles As Decimal = 0
        Dim totalAutoDetraDolares As Decimal = 0
        Dim totalComisionSoles As Decimal = 0
        Dim totalComisionDolares As Decimal = 0
        Dim otrosMediosPagosSoles As Decimal = 0
        Dim otrosMediosPagosDolares As Decimal = 0
        Dim devolucionSoles As Decimal = 0
        Dim devolucionDolares As Decimal = 0
        'crédito
        Dim efectivoIngresoSolesC As Decimal = 0
        Dim efectivoIngresoDolaresC As Decimal = 0
        Dim tarjetaIngresoSolesC As Decimal = 0
        Dim tarjetaIngresoDolaresC As Decimal = 0
        Dim cuentasIngresoSolesC As Decimal = 0
        Dim cuentasIngresoDolaresC As Decimal = 0
        Dim totalIngresoSolesC As Decimal = 0
        Dim totalIngresoDolaresC As Decimal = 0
        Dim totalCreditoSolesC As Decimal = 0
        Dim totalCreditoDolaresC As Decimal = 0
        Dim totalAutoDetraSolesC As Decimal = 0
        Dim totalAutoDetraDolaresC As Decimal = 0
        Dim totalComisionSolesC As Decimal = 0
        Dim totalComisionDolaresC As Decimal = 0
        Dim otrosMediosPagosSolesC As Decimal = 0
        Dim otrosMediosPagosDolaresC As Decimal = 0
        If (dtVentasContado Is Nothing) Then
            'No hay datos     
        Else
            Dim continuar As Boolean = True

            For i As Integer = 0 To dtVentasContado.Rows.Count - 1
                If dtVentasContado.Rows(i)("ANULADO_IND") = "N" Then
                    continuar = True
                Else
                    continuar = False
                End If

                If continuar Then
                    'EFECTIVO
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0008") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0009"))) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            efectivoIngresoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            efectivoIngresoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    'TARJETA DE DEBITO  / TARJETA DE CREDITO
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0006"))) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            tarjetaIngresoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            tarjetaIngresoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEPOSITO EN CUENTA
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0001") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0003") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0013"))) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            cuentasIngresoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            cuentasIngresoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' OTROS MEDIOS DE PAGO
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0020")) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            otrosMediosPagosSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            otrosMediosPagosDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEVOLUCIÓN A CLIENTE
                    If dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("SI") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            devolucionSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            devolucionDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' SOLO EL MONTO DE VENTAS AL CRÉDITO
                    If dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0002") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalCreditoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_VENTA"))
                        Else
                            totalCreditoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_VENTA"))
                        End If
                    End If
                    ' AUTO-DETRACCIONES
                    If dtVentasContado.Rows(i)("AUTODETRACCION").ToString().Equals("S") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalAutoDetraSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_DETRACCION"))
                        Else
                            totalAutoDetraDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_DETRACCION"))
                        End If
                    End If
                    ' COMISIÓN DE TARJETAS
                    If (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalComisionSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_COMISION_TARJETA"))
                        Else
                            totalComisionDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_COMISION_TARJETA"))
                        End If
                    End If
                End If
            Next
            totalIngresoSoles = efectivoIngresoSoles + tarjetaIngresoSoles + cuentasIngresoSoles + otrosMediosPagosSoles
            totalIngresoDolares = efectivoIngresoDolares + tarjetaIngresoDolares + cuentasIngresoDolares + otrosMediosPagosDolares
        End If
        'COBRO VENTAS AL CRÉDITO
        If (dtVentasCredito Is Nothing) Then
            'No hay datos     
        Else
            Dim continuar As Boolean = True

            For i As Integer = 0 To dtVentasCredito.Rows.Count - 1
                If dtVentasCredito.Rows(i)("ANULADO_IND") = "N" Then
                    continuar = True
                Else
                    continuar = False
                End If

                If continuar Then
                    'EFECTIVO
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0008") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0009")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            efectivoIngresoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            efectivoIngresoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    'TARJETA DE DEBITO  / TARJETA DE CREDITO
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            tarjetaIngresoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            tarjetaIngresoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEPOSITO EN CUENTA
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0001") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0003") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0013")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            cuentasIngresoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            cuentasIngresoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    ' OTROS MEDIOS DE PAGO
                    'If dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0020") Then
                    '    If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                    '        otrosMediosPagosSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                    '    Else
                    '        otrosMediosPagosDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                    '    End If
                    'End If
                    ' PENDIENTES A COBRAR
                    If dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("") And dtVentasCredito.Rows(i)("PAGADO_IND").ToString().Equals("N") Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalCreditoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            totalCreditoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DETRACCIONES A CLIENTES (YA PAGADOS)
                    If dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("X") And dtVentasCredito.Rows(i)("AUTODETRACCION").ToString().Equals("N") Then 'And dt.Rows(i)("DETRA_PAGADO_IND").ToString().Equals("S") Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalAutoDetraSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_DETRACCION"))
                        Else
                            totalAutoDetraDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_DETRACCION"))
                        End If
                    End If
                    ' COMISIÓN DE TARJETAS
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalComisionSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_COMISION_TARJETA"))
                        Else
                            totalComisionDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_COMISION_TARJETA"))
                        End If
                    End If
                End If
            Next
            totalIngresoSolesC = efectivoIngresoSolesC + tarjetaIngresoSolesC + cuentasIngresoSolesC + otrosMediosPagosSolesC
            totalIngresoDolaresC = efectivoIngresoDolaresC + tarjetaIngresoDolaresC + cuentasIngresoDolaresC + otrosMediosPagosDolaresC
        End If
        tabla.AppendFormat("<input id='datosMoba' type='hidden' value='{0}'/>", simbMonedaBase)
        tabla.AppendFormat("<input id='datosMoal' type='hidden' value='{0}'/>", simbMonedaAlterna)
        tabla.AppendFormat("<table id=""tblDctoImprimir"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
        tabla.AppendFormat("<thead>")
        tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        tabla.AppendFormat("<th style='font-size:200%;'>VENTAS AL CONTADO</th>")
        tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;font-size:200%;'>VENTAS MONEDA NACIONAL ({0})</th>", simbMonedaBase)
        tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;font-size:200%;'>VENTAS MONEDA EXTRANJERA ({0})</th>", simbMonedaAlterna)
        tabla.AppendFormat("</tr>")
        tabla.AppendFormat("</thead>")
        tabla.AppendFormat("<tbody>")

        'Fila 1 EFECTIVO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>VENTAS EN EFECTIVO</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", efectivoIngresoSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", efectivoIngresoDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 2 TARJETA
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>VENTAS CON TARJETA</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", tarjetaIngresoSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", tarjetaIngresoDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 3 BANCO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>VENTAS BANCARIZADAS</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", cuentasIngresoSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", cuentasIngresoDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 4 OTROS MEDIOS DE PAGO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>BILLETERA DIGITAL</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", otrosMediosPagosSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", otrosMediosPagosDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 5 TOTALES
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>TOTAL AL CONTADO</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'><strong>{1}{0:N}</strong></td>", totalIngresoSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'><strong>{1}{0:N}</strong></td>", totalIngresoDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 5.5 DEVOLUCION
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>DEVOLUCIÓN AL CLIENTE</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", devolucionSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", devolucionDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 6 TOTAL CRÉDITO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>VENTAS AL CRÉDITO</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalCreditoSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalCreditoDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 7 TOTAL AUTO-DETRACCIONES
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>AUTO-DETRACCIONES</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalAutoDetraSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalAutoDetraDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 8 TOTAL COMISIONES TARJETA
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>COMISIÓN POR VENTAS CON TARJETA</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalComisionSoles, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalComisionDolares, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")
        'COBRO VENTAS AL CRÉDITO
        tabla.AppendFormat("</tbody>")
        tabla.AppendFormat("<thead>")
        tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        tabla.AppendFormat("<th style='font-size:200%;'>COBRO VENTAS AL CRÉDITO</th>")
        tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>VENTAS MONEDA NACIONAL ({0})</th>", simbMonedaBase)
        tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>VENTAS MONEDA EXTRANJERA ({0})</th>", simbMonedaAlterna)
        tabla.AppendFormat("</tr>")
        tabla.AppendFormat("</thead>")
        tabla.AppendFormat("<tbody>")

        'Fila 1 EFECTIVO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>COBRANZAS EFECTIVO</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", efectivoIngresoSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", efectivoIngresoDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 2 TARJETA
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>COBRANZAS TARJETA</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", tarjetaIngresoSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", tarjetaIngresoDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 3 BANCO
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>COBRANZAS BANCARIZADAS</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", cuentasIngresoSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", cuentasIngresoDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 4 OTROS MEDIOS DE PAGO
        'tabla.AppendFormat("<tr>")
        'tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>COBRANZA OTROS MEDIOS DE PAGO</strong></td>")
        'tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", otrosMediosPagosSolesC, simbMonedaBase)
        'tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", otrosMediosPagosDolaresC, simbMonedaAlterna)
        'tabla.AppendFormat("</tr>")

        'Fila 5 TOTALES
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>TOTAL COBRANZAS EFECTUADAS</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'><strong>{1}{0:N}</strong></td>", totalIngresoSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'><strong>{1}{0:N}</strong></td>", totalIngresoDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 6 TOTAL CRÉDITO 
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>{1}{0:N}</strong></td>", p_HASTAH, "PENDIENTES A COBRAR AL ")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalCreditoSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalCreditoDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 7 TOTAL AUTO-DETRACCIONES
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>COBRO DE DETRACCIONES A CLIENTES</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalAutoDetraSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalAutoDetraDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        'Fila 8 TOTAL COMISIONES TARJETA
        tabla.AppendFormat("<tr>")
        tabla.AppendFormat("<td style='border-right: 1px solid #cbcbcb; font-size:160%;'><strong>COMISIÓN POR COBRANZAS CON TARJETA</strong></td>")
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalComisionSolesC, simbMonedaBase)
        tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{1}{0:N}</td>", totalComisionDolaresC, simbMonedaAlterna)
        tabla.AppendFormat("</tr>")

        tabla.AppendFormat("</tbody>")
        tabla.AppendFormat("</table>")
        'PAGO GASTOS POR BANCO
        If Not (dtPagoGastosBanco Is Nothing) Then
            tabla.AppendFormat("<table id=""tblTotales3"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
            tabla.AppendFormat("<thead>")
            tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
            tabla.AppendFormat("<th style='font-size:200%;'>PAGO DE GASTOS POR BANCO (CUENTA)</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>MONTO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("</tr>")
            tabla.AppendFormat("</thead>")
            tabla.AppendFormat("<tbody>")
            For i As Integer = 0 To dtPagoGastosBanco.Rows.Count - 1
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtPagoGastosBanco.Rows(i)("NRO_CUENTA").ToString())
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtPagoGastosBanco.Rows(i)("MONTO_PAGADO").ToString())))
                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody>")
            tabla.Append("</table>")
        End If
        'VENTAS ÁREA
        If Not (dtVentasArea Is Nothing) Then
            tabla.AppendFormat("<table id=""tblTotales4"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
            tabla.AppendFormat("<thead>")
            tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
            tabla.AppendFormat("<th style='font-size:200%;'>VENTAS ÁREA</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>MONTO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("</tr>")
            tabla.AppendFormat("</thead>")
            tabla.AppendFormat("<tbody>")
            For i As Integer = 0 To dtVentasArea.Rows.Count - 1
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtVentasArea.Rows(i)("DESC_GRUPO").ToString())
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtVentasArea.Rows(i)("MONTO").ToString())))
                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody>")
            tabla.Append("</table>")
        End If
        'VENTAS SUB-ÁREA
        If Not (dtVentasSubArea Is Nothing) Then
            tabla.AppendFormat("<table id=""tblTotales5"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
            tabla.AppendFormat("<thead>")
            tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
            tabla.AppendFormat("<th style='font-size:200%;'>VENTAS SUB-ÁREA</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>MONTO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("</tr>")
            tabla.AppendFormat("</thead>")
            tabla.AppendFormat("<tbody>")
            For i As Integer = 0 To dtVentasSubArea.Rows.Count - 1
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtVentasSubArea.Rows(i)("DESC_SUB_GRUPO").ToString())
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtVentasSubArea.Rows(i)("MONTO").ToString())))
                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody>")
            tabla.Append("</table>")
        End If
        'INCONSISTENCIAS 
        If Not (dtInconsistencias Is Nothing) Then
            tabla.AppendFormat("<table id=""tblTotales6"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
            tabla.AppendFormat("<thead>")
            tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
            tabla.AppendFormat("<th style='font-size:200%;'>INCONSISTENCIAS (CAJA)</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>TIPO</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>FECHA / HORA</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>MONTO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>USUARIO</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>OBSERVACIÓN</th>")
            tabla.AppendFormat("</tr>")
            tabla.AppendFormat("</thead>")
            tabla.AppendFormat("<tbody>")
            For i As Integer = 0 To dtInconsistencias.Rows.Count - 1
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtInconsistencias.Rows(i)("CAJA").ToString())
                tabla.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtInconsistencias.Rows(i)("INCS_SOLES").ToString())
                tabla.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtInconsistencias.Rows(i)("FECHA").ToString())
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtInconsistencias.Rows(i)("SOLES").ToString())))
                tabla.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtInconsistencias.Rows(i)("USUARIO").ToString())
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtInconsistencias.Rows(i)("OBSERVACIONES").ToString())
                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody>")
            tabla.Append("</table>")
        End If
        'GASTOS DE CAJA
        If p_DET_GASTO = "S" Then
            If Not (dtDetGastos Is Nothing) Then
                tabla.AppendFormat("<table id=""tblTotales4.5"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
                tabla.AppendFormat("<thead>")
                tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
                tabla.AppendFormat("<th style='font-size:200%;'>GASTOS DE CAJA</th>")
                tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>MONTO ({0})</th>", simbMonedaBase)
                tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:200%;'>APROBADO POR</th>")
                tabla.AppendFormat("</tr>")
                tabla.AppendFormat("</thead>")
                tabla.AppendFormat("<tbody>")
                For i As Integer = 0 To dtDetGastos.Rows.Count - 1
                    tabla.Append("<tr>")
                    tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtDetGastos.Rows(i)("DESC_GASTO").ToString())
                    tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtDetGastos.Rows(i)("MONTO_PAGADO").ToString())))
                    tabla.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtDetGastos.Rows(i)("APROBADO").ToString())
                    tabla.Append("</tr>")
                Next
                tabla.Append("</tbody>")
                tabla.Append("</table>")
            End If
        End If
        'RESUMEN CAJAS 
        If Not (dtResumenCajas Is Nothing) Then
            tabla.AppendFormat("<table id=""tblTotales6"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
            tabla.AppendFormat("<thead>")
            tabla.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:150%;'>CAJA</th>")
            'tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>ESTABLEC.</th>")
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>SALDO EFECTIVO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>INGRESO EFECTIVO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>INGRESO TARJETA ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>EGRESO EFECTIVO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>DIFERIDO A BANCO ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>DIFERIDO A OTRA CAJA ({0})</th>", simbMonedaBase)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>SALDO EFECTIVO ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>INGRESO EFECTIVO ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>INGRESO TARJETA ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>EGRESO EFECTIVO ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>DIFERIDO A BANCO ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb; font-size:125%;'>DIFERIDO A OTRA CAJA ({0})</th>", simbMonedaAlterna)
            tabla.AppendFormat("</tr>")
            tabla.AppendFormat("</thead>")
            tabla.AppendFormat("<tbody>")
            For i As Integer = 0 To dtResumenCajas.Rows.Count - 1
                tabla.Append("<tr>")
                tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtResumenCajas.Rows(i)("DES_CAJA").ToString())
                'tabla.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb; font-size:160%;'>{0}</td>", dtResumenCajas.Rows(i)("DESC_ESTABLECIMIENTO").ToString())
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("SALDO_MONTO_SOLES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_SOLES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_SOLES_TARJETA").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("EGR_MONTO_SOLES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CUENTA_MONTO_SOLES").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CAJA_MONTO_SOLES").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("SALDO_MONTO_DOLARES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_DOLARES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_DOLARES_TARJETA").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("EGR_MONTO_DOLARES_EFECTIVO").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CUENTA_MONTO_DOLARES").ToString())))
                tabla.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb; font-size:180%;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CAJA_MONTO_DOLARES").ToString())))
                tabla.Append("</tr>")
            Next
            tabla.Append("</tbody>")
            tabla.Append("</table>")
        End If
        Return tabla.ToString()
    End Function

    Public Function GenerarReportePDF(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_DESDEH As String, ByVal p_HASTAH As String, ByVal p_DET_GASTO As String) As StringBuilder
        'Dim tabla As New StringBuilder
        res = ""
        resb.Clear()
        Dim dtVentasContado As New DataTable
        Dim dtVentasCredito As New DataTable
        Dim dtResumenCajas As New DataTable
        Dim dtPagoGastosBanco As New DataTable
        Dim dtVentasArea As New DataTable
        Dim dtVentasSubArea As New DataTable
        Dim dtInconsistencias As New DataTable
        Dim dtEmpresas As New DataTable
        Dim dtDetGastos As New DataTable

        Dim caMovimientos As New Nomade.CA.CAMovimientos("Bn")
        Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")

        dtVentasContado = caMovimientos.ListarVentasContado(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtVentasCredito = caMovimientos.ListarCobroVentasCredito(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtResumenCajas = caMovimientos.ResumenDetallesMovimientosCaja(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtPagoGastosBanco = caMovimientos.ListarPagoGastosPorBanco(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtVentasArea = caMovimientos.ListarVentasArea(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtVentasSubArea = caMovimientos.ListarVentasSubArea(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtInconsistencias = caMovimientos.ListarInconsistencias(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        dtEmpresas = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "")
        If p_DET_GASTO = "S" Then
            dtDetGastos = caMovimientos.ListarDetGastos(p_CTLG_CODE, p_SCSL_CODE, p_DESDE, p_HASTA)
        End If
        'tabla.Clear()
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim descMonedaBase As String = ""
        Dim descMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                descMonedaBase = row("DESC_CORTA")
                simbMonedaBase = row("SIMBOLO")
            Else
                descMonedaAlterna = row("DESC_CORTA")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        Dim efectivoIngresoSoles As Decimal = 0
        Dim efectivoIngresoDolares As Decimal = 0
        Dim tarjetaIngresoSoles As Decimal = 0
        Dim tarjetaIngresoDolares As Decimal = 0
        Dim cuentasIngresoSoles As Decimal = 0
        Dim cuentasIngresoDolares As Decimal = 0
        Dim totalIngresoSoles As Decimal = 0
        Dim totalIngresoDolares As Decimal = 0
        Dim totalCreditoSoles As Decimal = 0
        Dim totalCreditoDolares As Decimal = 0
        Dim totalAutoDetraSoles As Decimal = 0
        Dim totalAutoDetraDolares As Decimal = 0
        Dim totalComisionSoles As Decimal = 0
        Dim totalComisionDolares As Decimal = 0
        Dim otrosMediosPagosSoles As Decimal = 0
        Dim otrosMediosPagosDolares As Decimal = 0
        Dim devolucionSoles As Decimal = 0
        Dim devolucionDolares As Decimal = 0
        'crédito
        Dim efectivoIngresoSolesC As Decimal = 0
        Dim efectivoIngresoDolaresC As Decimal = 0
        Dim tarjetaIngresoSolesC As Decimal = 0
        Dim tarjetaIngresoDolaresC As Decimal = 0
        Dim cuentasIngresoSolesC As Decimal = 0
        Dim cuentasIngresoDolaresC As Decimal = 0
        Dim totalIngresoSolesC As Decimal = 0
        Dim totalIngresoDolaresC As Decimal = 0
        Dim totalCreditoSolesC As Decimal = 0
        Dim totalCreditoDolaresC As Decimal = 0
        Dim totalAutoDetraSolesC As Decimal = 0
        Dim totalAutoDetraDolaresC As Decimal = 0
        Dim totalComisionSolesC As Decimal = 0
        Dim totalComisionDolaresC As Decimal = 0
        Dim otrosMediosPagosSolesC As Decimal = 0
        Dim otrosMediosPagosDolaresC As Decimal = 0
        If (dtVentasContado Is Nothing) Then
            'No hay datos     
        Else
            Dim continuar As Boolean = True

            For i As Integer = 0 To dtVentasContado.Rows.Count - 1
                If dtVentasContado.Rows(i)("ANULADO_IND") = "N" Then
                    continuar = True
                Else
                    continuar = False
                End If

                If continuar Then
                    'EFECTIVO
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0008") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0009"))) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            efectivoIngresoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            efectivoIngresoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    'TARJETA DE DEBITO  / TARJETA DE CREDITO
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0006"))) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            tarjetaIngresoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            tarjetaIngresoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEPOSITO EN CUENTA
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") And (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0001") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0003") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0013"))) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            cuentasIngresoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            cuentasIngresoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' OTROS MEDIOS DE PAGO
                    If (dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0001") And dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0020")) Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            otrosMediosPagosSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            otrosMediosPagosDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEVOLUCIÓN A CLIENTE
                    If dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("SI") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            devolucionSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        Else
                            devolucionDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO"))
                        End If
                    End If
                    ' SOLO EL MONTO DE VENTAS AL CRÉDITO
                    If dtVentasContado.Rows(i)("MODO_PAGO").ToString().Equals("0002") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalCreditoSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_VENTA"))
                        Else
                            totalCreditoDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_VENTA"))
                        End If
                    End If
                    ' AUTO-DETRACCIONES
                    If dtVentasContado.Rows(i)("AUTODETRACCION").ToString().Equals("S") And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalAutoDetraSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_DETRACCION"))
                        Else
                            totalAutoDetraDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_DETRACCION"))
                        End If
                    End If
                    ' COMISIÓN DE TARJETAS
                    If (dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasContado.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) And dtVentasContado.Rows(i)("DEV_CLIENTE").ToString().Equals("NO") Then
                        If dtVentasContado.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalComisionSoles += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_COMISION_TARJETA"))
                        Else
                            totalComisionDolares += Convert.ToDecimal(dtVentasContado.Rows(i)("MONTO_COMISION_TARJETA"))
                        End If
                    End If
                End If
            Next
            totalIngresoSoles = efectivoIngresoSoles + tarjetaIngresoSoles + cuentasIngresoSoles + otrosMediosPagosSoles
            totalIngresoDolares = efectivoIngresoDolares + tarjetaIngresoDolares + cuentasIngresoDolares + otrosMediosPagosDolares
        End If
        'COBRO VENTAS AL CRÉDITO
        If (dtVentasCredito Is Nothing) Then
            'No hay datos     
        Else
            Dim continuar As Boolean = True

            For i As Integer = 0 To dtVentasCredito.Rows.Count - 1
                If dtVentasCredito.Rows(i)("ANULADO_IND") = "N" Then
                    continuar = True
                Else
                    continuar = False
                End If

                If continuar Then
                    'EFECTIVO
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0008") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0009")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            efectivoIngresoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            efectivoIngresoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    'TARJETA DE DEBITO  / TARJETA DE CREDITO
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            tarjetaIngresoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            tarjetaIngresoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DEPOSITO EN CUENTA
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0001") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0003") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0013")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            cuentasIngresoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            cuentasIngresoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    ' OTROS MEDIOS DE PAGO
                    'If dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0020") Then
                    '    If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                    '        otrosMediosPagosSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                    '    Else
                    '        otrosMediosPagosDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                    '    End If
                    'End If
                    ' PENDIENTES A COBRAR
                    If dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("") And dtVentasCredito.Rows(i)("PAGADO_IND").ToString().Equals("N") Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalCreditoSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        Else
                            totalCreditoDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO"))
                        End If
                    End If
                    ' DETRACCIONES A CLIENTES (YA PAGADOS)
                    If dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("X") And dtVentasCredito.Rows(i)("AUTODETRACCION").ToString().Equals("N") Then 'And dt.Rows(i)("DETRA_PAGADO_IND").ToString().Equals("S") Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalAutoDetraSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_DETRACCION"))
                        Else
                            totalAutoDetraDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_DETRACCION"))
                        End If
                    End If
                    ' COMISIÓN DE TARJETAS
                    If (dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0005") Or dtVentasCredito.Rows(i)("FORMA_PAGO").ToString().Equals("0006")) Then
                        If dtVentasCredito.Rows(i)("CODIGO_MONEDA").ToString().Equals("0002") Then
                            totalComisionSolesC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_COMISION_TARJETA"))
                        Else
                            totalComisionDolaresC += Convert.ToDecimal(dtVentasCredito.Rows(i)("MONTO_COMISION_TARJETA"))
                        End If
                    End If
                End If
            Next
            totalIngresoSolesC = efectivoIngresoSolesC + tarjetaIngresoSolesC + cuentasIngresoSolesC + otrosMediosPagosSolesC
            totalIngresoDolaresC = efectivoIngresoDolaresC + tarjetaIngresoDolaresC + cuentasIngresoDolaresC + otrosMediosPagosDolaresC
        End If
        resb.AppendFormat("<input id='datosMoba' type='hidden' value='{0}'/>", simbMonedaBase)
        resb.AppendFormat("<input id='datosMoal' type='hidden' value='{0}'/>", simbMonedaAlterna)
        resb.AppendFormat("<html><body>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='center'><strong><h1>{0}</h1></strong></td>", dtEmpresas(0)("CORTO").ToString) 'DESCRIPCION
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table><br>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='50%' align='left'><strong><h2>{0}</h2></strong></td>", "REPORTE MONETARIO | " + "DESDE: " + p_DESDEH + " - HASTA: " + p_HASTAH)
        resb.AppendFormat("<td width='50%' align='right'><strong><h2>{0}</h2></strong></td>", "FECHA DE REPORTE: " + Date.Now().ToString("dd/MM/yyyy"))
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table><br><br>")
        resb.AppendFormat("<table border=""1"" width=""100%"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='background-color:#4B8CC5;color:black;'>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>VENTAS AL CONTADO</strong></th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>VENTAS MONEDA NACIONAL ({0})</strong></th>", simbMonedaBase)
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>VENTAS MONEDA EXTRANJERA ({0})</strong></th>", simbMonedaAlterna)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        'Fila 1 EFECTIVO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>VENTAS EN EFECTIVO</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 2 TARJETA
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>VENTAS CON TARJETA</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 3 BANCO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>VENTAS BANCARIZADAS</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 4 OTROS MEDIOS DE PAGO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>BILLETERA DIGITAL</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 5 TOTALES
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>TOTAL AL CONTADO</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 5.5 DEVOLUCION
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>DEVOLUCIÓN AL CLIENTE</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", devolucionSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", devolucionDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 6 TOTAL CRÉDITO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>VENTAS AL CRÉDITO</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 7 TOTAL AUTO-DETRACCIONES
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>AUTO-DETRACCIONES</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 8 TOTAL COMISIONES TARJETA
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>COMISIÓN POR VENTAS CON TARJETA</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table><br>")
        'COBRO VENTAS AL CRÉDITO
        resb.AppendFormat("<table border=""1"" width=""100%"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='background-color:#4B8CC5;color:black;'>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>COBRO VENTAS AL CRÉDITO</strong></th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>VENTAS MONEDA NACIONAL ({0})</strong></th>", simbMonedaBase)
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>VENTAS MONEDA EXTRANJERA ({0})</strong></th>", simbMonedaAlterna)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        'Fila 1 EFECTIVO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>COBRANZAS EFECTIVO</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoSolesC, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", efectivoIngresoDolaresC, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 2 TARJETA
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>COBRANZAS TARJETA</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoSolesC, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", tarjetaIngresoDolaresC, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 3 BANCO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>COBRANZAS BANCARIZADAS</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoSolesC, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", cuentasIngresoDolaresC, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 4 OTROS MEDIOS DE PAGO
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>COBRANZA OTROS MEDIOS DE PAGO</td>")
        'resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosSolesC, simbMonedaBase)
        'resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", otrosMediosPagosDolaresC, simbMonedaAlterna)
        'resb.AppendFormat("</tr>")

        'Fila 5 TOTALES
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>TOTAL COBRANZAS EFECTUADAS</strong></td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoSolesC, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'><strong>{1}{0:N}</strong></td>", totalIngresoDolaresC, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 6 TOTAL CRÉDITO 
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>{1}{0:N}</strong>", p_HASTA, "PENDIENTES A COBRAR AL ")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoSolesC, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalCreditoDolaresC, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 7 TOTAL AUTO-DETRACCIONES
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>COBRO DE DETRACCIONES A CLIENTES</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraSolesC, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalAutoDetraDolaresC, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 8 TOTAL COMISIONES TARJETA
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'>COMISIÓN POR COBRANZAS CON TARJETA</td>")
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionSolesC, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{1}{0:N}</td>", totalComisionDolaresC, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table><br>")
        'PAGO GASTOS POR BANCO
        If Not (dtPagoGastosBanco Is Nothing) Then
            resb.AppendFormat("<table border=""1"" width=""100%"">")
            resb.AppendFormat("<thead>")
            resb.AppendFormat("<tr style='background-color:#4B8CC5;color:black;'>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>PAGO DE GASTOS POR BANCO (CUENTA)</strong></th>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>MONTO ({0})</strong></th>", simbMonedaBase)
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</thead>")
            resb.AppendFormat("<tbody>")
            For i As Integer = 0 To dtPagoGastosBanco.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtPagoGastosBanco.Rows(i)("NRO_CUENTA").ToString())
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtPagoGastosBanco.Rows(i)("MONTO_PAGADO").ToString())))
                resb.Append("</tr>")
            Next
            resb.Append("</tbody>")
            resb.Append("</table><br>")
        End If
        'VENTAS ÁREA
        If Not (dtVentasArea Is Nothing) Then
            resb.AppendFormat("<table border=""1"" width=""100%"">")
            resb.AppendFormat("<thead>")
            resb.AppendFormat("<tr style='background-color:#4B8CC5;color:black;'>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>VENTAS ÁREA</strong></th>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>MONTO ({0})</strong></th>", simbMonedaBase)
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</thead>")
            resb.AppendFormat("<tbody>")
            For i As Integer = 0 To dtVentasArea.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtVentasArea.Rows(i)("DESC_GRUPO").ToString())
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtVentasArea.Rows(i)("MONTO").ToString())))
                resb.Append("</tr>")
            Next
            resb.Append("</tbody>")
            resb.Append("</table><br>")
        End If
        'VENTAS SUB-ÁREA
        If Not (dtVentasSubArea Is Nothing) Then
            resb.AppendFormat("<table border=""1"" width=""100%"">")
            resb.AppendFormat("<thead>")
            resb.AppendFormat("<tr style='background-color:#4B8CC5;color:black;'>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>VENTAS SUB-ÁREA</strong></th>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>MONTO ({0})</strong></th>", simbMonedaBase)
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</thead>")
            resb.AppendFormat("<tbody>")
            For i As Integer = 0 To dtVentasSubArea.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtVentasSubArea.Rows(i)("DESC_SUB_GRUPO").ToString())
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtVentasSubArea.Rows(i)("MONTO").ToString())))
                resb.Append("</tr>")
            Next
            resb.Append("</tbody>")
            resb.Append("</table><br>")
        End If
        'INCONSISTENCIAS 
        If Not (dtInconsistencias Is Nothing) Then
            resb.AppendFormat("<table border=""1"" width=""100%"">")
            resb.AppendFormat("<thead>")
            resb.AppendFormat("<tr style='background-color:#4B8CC5;color:black;'>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>INCONSISTENCIAS (CAJA)</strong></th>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>TIPO</strong></th>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>FECHA / HORA</strong></th>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>MONTO ({0})</strong></th>", simbMonedaBase)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>USUARIO</strong></th>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>OBSERVACIÓN</strong></th>")
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</thead>")
            resb.AppendFormat("<tbody>")
            For i As Integer = 0 To dtInconsistencias.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtInconsistencias.Rows(i)("CAJA").ToString())
                resb.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dtInconsistencias.Rows(i)("INCS_SOLES").ToString())
                resb.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dtInconsistencias.Rows(i)("FECHA").ToString())
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtInconsistencias.Rows(i)("SOLES").ToString())))
                resb.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dtInconsistencias.Rows(i)("USUARIO").ToString())
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtInconsistencias.Rows(i)("OBSERVACIONES").ToString())
                resb.Append("</tr>")
            Next
            resb.Append("</tbody>")
            resb.Append("</table><br>")
        End If
        'GASTOS DE CAJA
        If p_DET_GASTO = "S" Then
            If Not (dtDetGastos Is Nothing) Then
                resb.AppendFormat("<table border=""1"" width=""100%"">")
                resb.AppendFormat("<thead>")
                resb.AppendFormat("<tr style='background-color:#4B8CC5;color:black;'>")
                resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>GASTOS DE CAJA</th>")
                resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>MONTO ({0})</th>", simbMonedaBase)
                resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>APROBADO</th>")
                resb.AppendFormat("</tr>")
                resb.AppendFormat("</thead>")
                resb.AppendFormat("<tbody>")
                For i As Integer = 0 To dtDetGastos.Rows.Count - 1
                    resb.Append("<tr>")
                    resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtDetGastos.Rows(i)("DESC_GASTO").ToString())
                    resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtDetGastos.Rows(i)("MONTO_PAGADO").ToString())))
                    resb.AppendFormat("<td style='text-align:center;border-left: 1px solid #cbcbcb;'>{0}</td>", dtDetGastos.Rows(i)("APROBADO").ToString())
                    resb.Append("</tr>")
                Next
                resb.Append("</tbody>")
                resb.Append("</table><br>")
            End If
        End If
        'RESUMEN CAJAS 
        If Not (dtResumenCajas Is Nothing) Then
            resb.AppendFormat("<table border=""1"" width=""100%"">")
            resb.AppendFormat("<thead>")
            resb.AppendFormat("<tr style='background-color:#4B8CC5;color:black;'>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>CAJA</strong></th>")
            'resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>ESTABLEC.</th>")
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>SALDO EFECTIVO ({0})</th>", simbMonedaBase)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>INGRESO EFECTIVO ({0})</strong></th>", simbMonedaBase)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>INGRESO TARJETA ({0})</strong></th>", simbMonedaBase)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>EGRESO EFECTIVO ({0})</strong></th>", simbMonedaBase)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>DIFERIDO A BANCO ({0})</strong></th>", simbMonedaBase)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>DIFERIDO A OTRA CAJA ({0})</strong></th>", simbMonedaBase)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>SALDO EFECTIVO ({0})</th>", simbMonedaAlterna)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>INGRESO EFECTIVO ({0})</strong></th>", simbMonedaAlterna)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>INGRESO TARJETA ({0})</strong></th>", simbMonedaAlterna)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>EGRESO EFECTIVO ({0})</strong></th>", simbMonedaAlterna)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>DIFERIDO A BANCO ({0})</strong></th>", simbMonedaAlterna)
            resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'><strong>DIFERIDO A OTRA CAJA ({0})</strong></th>", simbMonedaAlterna)
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</thead>")
            resb.AppendFormat("<tbody>")
            For i As Integer = 0 To dtResumenCajas.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtResumenCajas.Rows(i)("DES_CAJA").ToString())
                'resb.AppendFormat("<td style='text-align:left;border-left: 1px solid #cbcbcb;'>{0}</td>", dtResumenCajas.Rows(i)("DESC_ESTABLECIMIENTO").ToString())
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("SALDO_MONTO_SOLES_EFECTIVO").ToString())))
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_SOLES_EFECTIVO").ToString())))
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_SOLES_TARJETA").ToString())))
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("EGR_MONTO_SOLES_EFECTIVO").ToString())))
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CUENTA_MONTO_SOLES").ToString())))
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CAJA_MONTO_SOLES").ToString())))
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("SALDO_MONTO_DOLARES_EFECTIVO").ToString())))
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_DOLARES_EFECTIVO").ToString())))
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("ING_MONTO_DOLARES_TARJETA").ToString())))
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("EGR_MONTO_DOLARES_EFECTIVO").ToString())))
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CUENTA_MONTO_DOLARES").ToString())))
                resb.AppendFormat("<td style='text-align:right;border-left: 1px solid #cbcbcb;'>{0}</td>", String.Format("{0:#,##0.00}", Decimal.Parse(dtResumenCajas.Rows(i)("DIF_CAJA_MONTO_DOLARES").ToString())))
                resb.Append("</tr>")
            Next
            resb.Append("</tbody>")
            resb.Append("</table>")
        End If
        resb.AppendFormat("</body></html>")
        res = resb.ToString()
        Return resb
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

End Class
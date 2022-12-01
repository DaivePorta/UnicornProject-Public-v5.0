<%@ WebHandler Language="VB" Class="CALREPO" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports iTextSharp.text
Imports iTextSharp.text.pdf

Public Class CALREPO : Implements IHttpHandler

    Dim OPCION, COD_CTLG, COD_ESTABLE, COD_CAJA, USUA_ID, COD_MOV As String


    Dim caja As New Nomade.CA.CAMovimientos("BN")


    Dim dt, dt2, dt3 As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    'WHATSAPP CLOUD API
    Dim RECIPIENT_PHONE_NUMBER, MENSAJEWHATSAPP As String


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        COD_CTLG = context.Request("COD_CTLG")
        COD_ESTABLE = context.Request("COD_ESTABLE")
        COD_CAJA = context.Request("COD_CAJA")
        USUA_ID = context.Request("USUA_ID")
        COD_MOV = context.Request("COD_MOV")

        'WHATSAPP CLOUD API
        RECIPIENT_PHONE_NUMBER = context.Request("RECIPIENT_PHONE_NUMBER")
        MENSAJEWHATSAPP = context.Request("MENSAJEWHATSAPP")

        Try
            Select Case OPCION


                Case "5" 'DETALLE CAJA
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caja.ListarDetalleMovimientosCaja(COD_MOV, "", "", "T")
                    dt2 = caja.ListarMovimientosCaja(COD_MOV, COD_CTLG, COD_ESTABLE, COD_CAJA, "", "")
                    dt3 = caja.ListarDetalleMovimientosCaja(COD_MOV, "", "", "P")
                    res = GenerarPDF(dt, dt2, dt3, USUA_ID)
                Case "6" 'RESUMEN CAJA
                    Dim dt As New DataTable
                    Dim dt2 As New DataTable
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caja.ListarDetalleMovimientosCaja(COD_MOV, "", "", "T")
                    dt2 = caja.ListarMovimientosCaja(COD_MOV, COD_CTLG, COD_ESTABLE, COD_CAJA, "", "")
                    res = GenerarPDF_resumencaj(dt, dt2, USUA_ID)
                Case "whatsapp"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim whatsapp As New Nomade.Mail.NomadeMail("Bn")
                    Dim Plantilla As String = "Reporte"
                    Dim datoAj As String
                    Dim nombreArchivo = "Reporte_Detallado_Caja_" + Date.Now().ToString("ddMMyyyy") + ".pdf"

                    dt = caja.ListarDetalleMovimientosCaja(COD_MOV, "", "", "T")
                    dt2 = caja.ListarMovimientosCaja(COD_MOV, COD_CTLG, COD_ESTABLE, COD_CAJA, "", "")
                    dt3 = caja.ListarDetalleMovimientosCaja(COD_MOV, "", "", "P")

                    GenerarPDF(dt, dt2, dt3, USUA_ID)
                    datoAj = HttpContext.Current.Server.MapPath("~") & "Archivos\" & "Reporte_Detallado_Caja_" + Date.Now().ToString("ddMMyyyy") + ".pdf"
                    Dim rep = System.IO.Path.GetFileName(datoAj)

                    whatsapp.enviarWhatsapp(RECIPIENT_PHONE_NUMBER, nombreArchivo, MENSAJEWHATSAPP, Plantilla, datoAj)
                    res = ""
            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function GenerarPDF(ByVal dt As DataTable, ByVal dt2 As DataTable, ByVal dt3 As DataTable, ByVal USUA_ID As String) As String
        Dim ress As String

        Dim htmlText As New StringBuilder
        Dim cNomArch As String = "Reporte_Detallado_Caja_" + Date.Now().ToString("ddMMyyyy") + ".pdf"
        'dt=
        htmlText = GenerarTablaDetaMovCaja(dt, dt2, dt3, USUA_ID)
        HTMLToPDF(htmlText, cNomArch)
        'GenerarTXT(dt)
        ress = "ok"
        Return ress
    End Function

    Public Function GenerarPDF_resumencaj(ByVal dt As DataTable, ByVal dt2 As DataTable, ByVal USUA_ID As String) As String
        Dim ress As String

        Dim htmlText As New StringBuilder
        Dim cNomArch As String = "Reporte_Resumen_Caja_" + Date.Now().ToString("ddMMyyyy") + ".pdf"
        'dt=
        htmlText = GenerarTablaResumenCaja(dt, dt2, USUA_ID)
        HTMLToPDF(htmlText, cNomArch)
        'GenerarTXT(dt)
        ress = "ok"
        Return ress
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


    Public Function GenerarTablaResumenCaja(ByVal dt As DataTable, ByVal dt2 As DataTable, ByVal USUA_ID As String) As StringBuilder
        Dim efectivoIngresoSoles As Decimal = 0.0
        Dim efectivoIngresoDolares As Decimal = 0.0
        Dim efectivoEgresoSoles As Decimal = 0.0
        Dim efectivoEgresoDolares As Decimal = 0.0
        Dim saldoEfectivoSoles As Decimal = 0.0
        Dim saldoefectivo As Decimal = 0.0
        Dim saldoefectivoDol As Decimal = 0.0
        Dim ventastotales As Decimal = 0.0
        Dim ventastotalesDol As Decimal = 0.0

        If Not (dt Is Nothing) Then

            For i As Integer = 0 To dt.Rows.Count - 1

                If (dt.Rows(i)("PAGO").ToString().Equals("SI")) Then
                    If (dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("I") And dt.Rows(i)("ANULADO_IND").ToString().Equals("N") And dt.Rows(i)("DEV_EFECTIVO_IND").ToString().Equals("N")) Then
                        'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0008")) Then
                        efectivoIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                        efectivoIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                        'End If
                    End If
                    If (dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("I") And dt.Rows(i)("ANULADO_IND").ToString().Equals("S") And dt.Rows(i)("DEV_EFECTIVO_IND").ToString().Equals("N")) Then
                        'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0008")) Then
                        efectivoIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                        efectivoIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                        'End If
                    End If
                    If (dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("E") And dt.Rows(i)("ANULADO_IND").ToString().Equals("N") And dt.Rows(i)("DEV_EFECTIVO_IND").ToString().Equals("N")) Then
                        'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0008")) Then
                        efectivoEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                        efectivoEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                        'End If
                    End If

                End If

            Next

            '***SE SUMA EL MONTO DE VENTAS SOLO SI NO ESTÁ ANULADO; O EN EL CASO QUE ESTÉ ANULADO SE SUMA
            'SOLO SI NO SE HA HECHO LA DEVOLUCION DE EFECTIVO AL ANULAR
            For i As Integer = 0 To dt.Rows.Count - 1
                If (dt.Rows(i)("PAGO").ToString().Equals("SI")) Then
                    If (dt.Rows(i)("DCTO_REF_IND").ToString().Equals("V")) Then

                        If dt.Rows(i)("ANULADO_IND").ToString() = "N" Then
                            'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0008")) Then
                            ventastotales += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                            ventastotalesDol += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                            'End If
                        Else
                            If dt.Rows(i)("DEV_EFECTIVO_IND").ToString() = "N" Then
                                ventastotales += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                ventastotalesDol += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                            End If
                        End If
                    End If
                End If

            Next


        End If


        saldoefectivo = efectivoIngresoSoles - efectivoEgresoSoles
        saldoefectivoDol = efectivoIngresoDolares - efectivoEgresoDolares



        resb.AppendFormat("<html><body>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='center'><strong><h1>{0}</h1></strong></td>", "REPORTE RESUMEN DE CAJA")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='center'><strong><i><h4>{0}</h4></i></strong></td>", dt2.Rows(0)("DESC_EMPRESA") + "  -  " + dt2.Rows(0)("DESC_SCSL") + " - " + dt2.Rows(0)("DESC_CAJA"))
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table><br>")


        resb.AppendFormat("<table border=""0"" width=""50%"" align='center' >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td  align='left'><strong>{0}</strong></td>", "Fecha Apertura :")
        resb.AppendFormat("<td  align='center'><strong>{0}</strong></td>", dt2.Rows(0)("FECHA_APERTURA").ToString())
        resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", "CAJERO")
        resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", dt2.Rows(0)("CAJERO").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table border=""0"" width=""50%"" align='center' >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td  align='left'><strong>{0}</strong></td>", "Fecha Cierre :")
        resb.AppendFormat("<td  align='center'><strong>{0}</strong></td>", IIf(dt2.Rows(0)("FECHA_CIERRE").ToString.Equals(""), "-", dt2.Rows(0)("FECHA_CIERRE").ToString()))
        resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", "Impreso Por :")
        resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", USUA_ID)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")





        resb.AppendFormat("<br/><br/><br/><br/>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='center'><strong><i><h2>{0}</h2></i></strong></td>", "RESUMEN EJECUTIVO DE CAJA")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        resb.AppendFormat("<br/>")

        'resumen ejec
        resb.AppendFormat("<table border=""0"" width=""50%"" align='center' >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td  align='left'>{0}</td>", "")
        resb.AppendFormat("<td  align='center'>{0}</td>", "TOTAL(S/.)")
        resb.AppendFormat("<td  align='center'>{0}</td>", "TOTAL($.)")
        resb.AppendFormat("<td  align='right'>{0}</td>", "")
        resb.AppendFormat("<td  align='right'>{0}</td>", "TOTAL(S/.)")
        resb.AppendFormat("<td  align='right'>{0}</td>", "TOTAL($.)")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td  align='left'><strong>{0}</strong></td>", "VENTAS TOTALES")
        resb.AppendFormat("<td  align='center'><strong>S/.{0}</strong></td>", ventastotales)
        resb.AppendFormat("<td  align='center'><strong>$.{0}</strong></td>", ventastotalesDol)
        resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", "EGRESOS")
        resb.AppendFormat("<td  align='right'><strong>S/.{0}</strong></td>", efectivoEgresoSoles)
        resb.AppendFormat("<td  align='right'><strong>$.{0}</strong></td>", efectivoEgresoDolares)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table border=""0"" width=""50%"" align='center' >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td  align='left'><strong>{0}</strong></td>", "INGRESOS TOTALES")
        resb.AppendFormat("<td  align='center'><strong>S/.{0}</strong></td>", efectivoIngresoSoles)
        resb.AppendFormat("<td  align='center'><strong>$.{0}</strong></td>", efectivoIngresoDolares)
        resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", "SALDO EFECTIVO")
        resb.AppendFormat("<td  align='right'><strong>S/.{0}</strong></td>", saldoefectivo)
        resb.AppendFormat("<td  align='right'><strong>$.{0}</strong></td>", saldoefectivoDol)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<br/>")

        resb.AppendFormat("</body></html>")

        res = resb.ToString()
        'Return res
        Return resb
    End Function



    Public Function GenerarTablaDetaMovCaja(ByVal dt As DataTable, ByVal dt2 As DataTable, ByVal dt3 As DataTable, ByVal USUA_ID As String) As StringBuilder


        Dim total As Decimal = 0
        Dim dtIngresocredito As New DataTable
        Dim dtEgresocredito As New DataTable
        Dim dtIngresotarjeta As New DataTable
        Dim dtEgresotarjeta As New DataTable
        Dim dtIEfectivo As New DataTable
        Dim dtEgresoEfectivo As New DataTable
        Dim dtAperCaja As New DataTable
        Dim dtIcheques As New DataTable
        Dim dtEgresoCheques As New DataTable
        Dim dtInCuentas As New DataTable
        Dim dtEgresoCuentas As New DataTable
        Dim dtVentasAnuladas As New DataTable
        Dim dtVentProdE As New DataTable
        Dim dtVentProdC As New DataTable
        Dim dtVentProdT As New DataTable
        Dim dtVentProdChe As New DataTable


        Dim efectivoIngresoSoles As Decimal = 0.0
        Dim efectivoIngresoDolares As Decimal = 0.0
        Dim efectivoEgresoSoles As Decimal = 0.0
        Dim efectivoEgresoDolares As Decimal = 0.0

        Dim efectInCreditoSoles As Decimal = 0.0
        Dim efectInCreditoDolares As Decimal = 0.0
        Dim efectEgreCreditoSoles As Decimal = 0.0
        Dim efectEgreCreditoDolares As Decimal = 0.0

        Dim efectIntarjetaSoles As Decimal = 0.0
        Dim efectIntarjetaDolares As Decimal = 0.0
        Dim efectEgresotarjetasoles As Decimal = 0.0
        Dim efectEgresotarjetaDolares As Decimal = 0.0


        Dim efectInchequesSoles As Decimal = 0.0
        Dim efectInchequesDolares As Decimal = 0.0
        Dim efectEgresochequesSoles As Decimal = 0.0
        Dim efectEgresochequesDolares As Decimal = 0.0

        Dim efectInCuentasSoles As Decimal = 0.0
        Dim efectInCuentasDolares As Decimal = 0.0
        Dim efectEgresoCuentassoles As Decimal = 0.0
        Dim efectEgresoCuentasDolares As Decimal = 0.0

        Dim efectApercajSoles As Decimal = 0.0
        Dim efectApercajDolares As Decimal = 0.0

        Dim ventastotales As Decimal = 0.0
        Dim ventastotalesDol As Decimal = 0.0
        Dim ingresostotales As Decimal = 0.0
        Dim ingresostotalesDol As Decimal = 0.0
        Dim egresostotales As Decimal = 0.0
        Dim egresostotalesDol As Decimal = 0.0
        Dim saldoefectivo As Decimal = 0.0
        Dim saldoefectivoDol As Decimal = 0.0

        Dim totalventanuladas As Decimal = 0.0
        Dim totalventanuladasDol As Decimal = 0.0

        Dim totalventefecSol As Decimal = 0.0
        Dim totalventefecDol As Decimal = 0.0
        Dim totalventarjSol As Decimal = 0.0
        Dim totalventarjDol As Decimal = 0.0
        Dim totalventcreSol As Decimal = 0.0
        Dim totalventcreDol As Decimal = 0.0
        Dim totalventcheSol As Decimal = 0.0
        Dim totalventcheDol As Decimal = 0.0

        Dim total_monto_ventas As Decimal = 0.0


        res = ""
        resb.Clear()
        '------ INGRESO CREDITO
        dtIngresocredito.Columns.Add("fechaHora")
        dtIngresocredito.Columns.Add("detalle")
        dtIngresocredito.Columns.Add("origen")
        dtIngresocredito.Columns.Add("monto_sol")
        dtIngresocredito.Columns.Add("monto_usd")
        dtIngresocredito.Columns.Add("usuario")
        dtIngresocredito.Columns.Add("documento")

        dtIngresotarjeta.Columns.Add("fechaHora")
        dtIngresotarjeta.Columns.Add("detalle")
        dtIngresotarjeta.Columns.Add("origen")
        dtIngresotarjeta.Columns.Add("monto_sol")
        dtIngresotarjeta.Columns.Add("monto_usd")
        dtIngresotarjeta.Columns.Add("usuario")
        dtIngresotarjeta.Columns.Add("documento")

        dtIEfectivo.Columns.Add("fechaHora")
        dtIEfectivo.Columns.Add("detalle")
        dtIEfectivo.Columns.Add("origen")
        dtIEfectivo.Columns.Add("monto_sol")
        dtIEfectivo.Columns.Add("monto_usd")
        dtIEfectivo.Columns.Add("usuario")
        dtIEfectivo.Columns.Add("documento")

        dtAperCaja.Columns.Add("fechaHora")
        dtAperCaja.Columns.Add("detalle")
        dtAperCaja.Columns.Add("origen")
        dtAperCaja.Columns.Add("monto_sol")
        dtAperCaja.Columns.Add("monto_usd")
        dtAperCaja.Columns.Add("usuario")
        dtAperCaja.Columns.Add("documento")

        dtIcheques.Columns.Add("fechaHora")
        dtIcheques.Columns.Add("detalle")
        dtIcheques.Columns.Add("origen")
        dtIcheques.Columns.Add("monto_sol")
        dtIcheques.Columns.Add("monto_usd")
        dtIcheques.Columns.Add("usuario")
        dtIcheques.Columns.Add("documento")


        dtInCuentas.Columns.Add("fechaHora")
        dtInCuentas.Columns.Add("detalle")
        dtInCuentas.Columns.Add("origen")
        dtInCuentas.Columns.Add("monto_sol")
        dtInCuentas.Columns.Add("monto_usd")
        dtInCuentas.Columns.Add("usuario")
        dtInCuentas.Columns.Add("documento")

        '-----EGRESOS
        dtEgresocredito.Columns.Add("fechaHora")
        dtEgresocredito.Columns.Add("detalle")
        dtEgresocredito.Columns.Add("origen")
        dtEgresocredito.Columns.Add("monto_sol")
        dtEgresocredito.Columns.Add("monto_usd")
        dtEgresocredito.Columns.Add("usuario")
        dtEgresocredito.Columns.Add("documento")

        dtEgresotarjeta.Columns.Add("fechaHora")
        dtEgresotarjeta.Columns.Add("detalle")
        dtEgresotarjeta.Columns.Add("origen")
        dtEgresotarjeta.Columns.Add("monto_sol")
        dtEgresotarjeta.Columns.Add("monto_usd")
        dtEgresotarjeta.Columns.Add("usuario")
        dtEgresotarjeta.Columns.Add("documento")

        dtEgresoEfectivo.Columns.Add("fechaHora")
        dtEgresoEfectivo.Columns.Add("detalle")
        dtEgresoEfectivo.Columns.Add("origen")
        dtEgresoEfectivo.Columns.Add("monto_sol")
        dtEgresoEfectivo.Columns.Add("monto_usd")
        dtEgresoEfectivo.Columns.Add("usuario")
        dtEgresoEfectivo.Columns.Add("documento")


        dtEgresoCheques.Columns.Add("fechaHora")
        dtEgresoCheques.Columns.Add("detalle")
        dtEgresoCheques.Columns.Add("origen")
        dtEgresoCheques.Columns.Add("monto_sol")
        dtEgresoCheques.Columns.Add("monto_usd")
        dtEgresoCheques.Columns.Add("usuario")
        dtEgresoCheques.Columns.Add("documento")

        dtEgresoCuentas.Columns.Add("fechaHora")
        dtEgresoCuentas.Columns.Add("detalle")
        dtEgresoCuentas.Columns.Add("origen")
        dtEgresoCuentas.Columns.Add("monto_sol")
        dtEgresoCuentas.Columns.Add("monto_usd")
        dtEgresoCuentas.Columns.Add("usuario")
        dtEgresoCuentas.Columns.Add("documento")


        dtVentasAnuladas.Columns.Add("fechaHora")
        dtVentasAnuladas.Columns.Add("detalle")
        dtVentasAnuladas.Columns.Add("origen")
        dtVentasAnuladas.Columns.Add("monto_sol")
        dtVentasAnuladas.Columns.Add("monto_usd")
        dtVentasAnuladas.Columns.Add("usuario")
        dtVentasAnuladas.Columns.Add("documento")


        dtVentProdE.Columns.Add("producto")
        dtVentProdE.Columns.Add("cantidad")
        dtVentProdE.Columns.Add("monto_sol")
        dtVentProdE.Columns.Add("monto_usd")
        dtVentProdE.Columns.Add("vendedor")

        dtVentProdT.Columns.Add("producto")
        dtVentProdT.Columns.Add("cantidad")
        dtVentProdT.Columns.Add("monto_sol")
        dtVentProdT.Columns.Add("monto_usd")
        dtVentProdT.Columns.Add("vendedor")

        dtVentProdC.Columns.Add("producto")
        dtVentProdC.Columns.Add("cantidad")
        dtVentProdC.Columns.Add("monto_sol")
        dtVentProdC.Columns.Add("monto_usd")
        dtVentProdC.Columns.Add("vendedor")

        dtVentProdChe.Columns.Add("producto")
        dtVentProdChe.Columns.Add("cantidad")
        dtVentProdChe.Columns.Add("monto_sol")
        dtVentProdChe.Columns.Add("monto_usd")
        dtVentProdChe.Columns.Add("vendedor")


        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("PAGO").ToString().Equals("SI") Then
                    If dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("I") Then
                        If dt.Rows(i)("MOPA_CODE").ToString().Equals("0002") Then ' al credito
                            Dim rowICredito As DataRow = dtIngresocredito.NewRow()
                            rowICredito("fechaHora") = dt.Rows(i)("FECHA")
                            rowICredito("detalle") = dt.Rows(i)("DESCRIPCION")
                            rowICredito("origen") = dt.Rows(i)("PERSONA")
                            rowICredito("monto_sol") = dt.Rows(i)("MONTO_INGRESO_SOLES")
                            rowICredito("monto_usd") = dt.Rows(i)("MONTO_INGRESO_DOLARES")
                            rowICredito("usuario") = dt.Rows(i)("CAJERO")
                            rowICredito("documento") = dt.Rows(i)("NRO_DOCUMENTO")
                            dtIngresocredito.Rows.Add(rowICredito)
                            efectInCreditoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                            efectInCreditoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))

                            'VENTA PRODUCTOS POR VENDEDOR
                            'If dt.Rows(i)("CODIGO_VENTA").ToString() <> String.Empty Then
                            '    Dim rowProdC As DataRow = dtVentProdC.NewRow()
                            '    rowProdC("producto") = dt3.Rows(i)("PRODUCTO")
                            '    rowProdC("cantidad") = dt3.Rows(i)("CANTIDAD")
                            '    'VALIDO SI ES MONTO SOL O USD
                            '    If dt.Rows(i)("MONTO_INGRESO_SOLES").ToString <> String.Empty Then
                            '        rowProdC("monto_sol") = dt3.Rows(i)("VALOR_VENTA")
                            '        rowProdC("monto_usd") = "0.00"
                            '        If dt3.Rows(i)("VALOR_VENTA").ToString = String.Empty Then
                            '            totalventcreSol += 0.00
                            '        Else
                            '            totalventcreSol += Convert.ToDecimal(dt3.Rows(i)("VALOR_VENTA"))
                            '        End If
                            '        'totalventcreSol += Convert.ToDecimal(dt.Rows(i)("VALOR_VENTA"))
                            '    Else
                            '        rowProdC("monto_sol") = "0.00"
                            '        rowProdC("monto_usd") = dt3.Rows(i)("VALOR_VENTA")
                            '        If dt3.Rows(i)("VALOR_VENTA").ToString = String.Empty Then
                            '            totalventcreDol += 0.00
                            '        Else
                            '            totalventcreDol += Convert.ToDecimal(dt3.Rows(i)("VALOR_VENTA"))
                            '        End If
                            '        'totalventcreDol += Convert.ToDecimal(dt.Rows(i)("VALOR_VENTA"))
                            '    End If

                            '    rowProdC("vendedor") = dt3.Rows(i)("VENDEDOR")
                            '    dtVentProdC.Rows.Add(rowProdC)
                            'End If


                        End If
                        If dt.Rows(i)("FOPA_CODE").ToString().Equals("0006") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0005") Then 'tarjeta
                            Dim rowItarjeta As DataRow = dtIngresotarjeta.NewRow()
                            rowItarjeta("fechaHora") = dt.Rows(i)("FECHA")
                            rowItarjeta("detalle") = dt.Rows(i)("DESCRIPCION")
                            rowItarjeta("origen") = dt.Rows(i)("PERSONA")
                            rowItarjeta("monto_sol") = dt.Rows(i)("MONTO_INGRESO_SOLES")
                            rowItarjeta("monto_usd") = dt.Rows(i)("MONTO_INGRESO_DOLARES")
                            rowItarjeta("usuario") = dt.Rows(i)("CAJERO")
                            rowItarjeta("documento") = dt.Rows(i)("NRO_DOCUMENTO")
                            dtIngresotarjeta.Rows.Add(rowItarjeta)
                            efectIntarjetaSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                            efectIntarjetaDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                            If dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ") Then
                                If respuestaresta(dt, i) Then
                                    efectIntarjetaSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    efectIntarjetaDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                End If
                            End If

                            'VENTA PRODUCTOS POR VENDEDOR
                            'If dt.Rows(i)("CODIGO_VENTA").ToString() <> String.Empty Then
                            '    If i = 445 Then
                            '        Dim s As String = dt.Rows(i)("CODIGO_VENTA").ToString()
                            '    End If
                            '    Dim rowProdT As DataRow = dtVentProdT.NewRow()
                            '    rowProdT("producto") = dt3.Rows(i)("PRODUCTO")
                            '    rowProdT("cantidad") = dt3.Rows(i)("CANTIDAD")
                            '    'VALIDO SI ES MONTO SOL O USD
                            '    If dt.Rows(i)("MONTO_INGRESO_SOLES").ToString <> String.Empty Then
                            '        rowProdT("monto_sol") = dt3.Rows(i)("VALOR_VENTA")
                            '        rowProdT("monto_usd") = "0.00"

                            '        If dt3.Rows(i)("VALOR_VENTA").ToString = String.Empty Then
                            '            totalventarjSol += 0.00
                            '        Else
                            '            totalventarjSol += Convert.ToDecimal(dt3.Rows(i)("VALOR_VENTA"))
                            '        End If

                            '        'totalventarjSol += Convert.ToDecimal(dt.Rows(i)("VALOR_VENTA"))

                            '    Else
                            '        rowProdT("monto_sol") = "0.00"
                            '        rowProdT("monto_usd") = dt3.Rows(i)("VALOR_VENTA")

                            '        If dt3.Rows(i)("VALOR_VENTA").ToString = String.Empty Then
                            '            totalventarjDol += 0.00
                            '        Else
                            '            totalventarjDol += Convert.ToDecimal(dt3.Rows(i)("VALOR_VENTA"))
                            '        End If

                            '        'totalventarjDol += Convert.ToDecimal(dt.Rows(i)("VALOR_VENTA"))
                            '    End If

                            '    rowProdT("vendedor") = dt3.Rows(i)("VENDEDOR")
                            '    dtVentProdT.Rows.Add(rowProdT)
                            'End If

                        End If
                        If dt.Rows(i)("FOPA_CODE").ToString().Equals("0008") Then 'efectivo And dt.Rows(i)("DESCRIPCION").ToString() <> "SALDO INICIAL"
                            Dim rowIefectivo As DataRow = dtIEfectivo.NewRow()
                            rowIefectivo("fechaHora") = dt.Rows(i)("FECHA")
                            rowIefectivo("detalle") = dt.Rows(i)("DESCRIPCION")
                            rowIefectivo("origen") = dt.Rows(i)("PERSONA")
                            rowIefectivo("monto_sol") = dt.Rows(i)("MONTO_INGRESO_SOLES")
                            rowIefectivo("monto_usd") = dt.Rows(i)("MONTO_INGRESO_DOLARES")
                            rowIefectivo("usuario") = dt.Rows(i)("CAJERO")
                            rowIefectivo("documento") = dt.Rows(i)("NRO_DOCUMENTO")
                            dtIEfectivo.Rows.Add(rowIefectivo)
                            efectivoIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                            efectivoIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                            If dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ") Then
                                If respuestaresta(dt, i) Then
                                    efectivoIngresoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    efectivoIngresoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                End If
                            End If
                            'VENTA PRODUCTOS POR VENDEDOR
                            'If dt.Rows(i)("CODIGO_VENTA").ToString() <> String.Empty Then
                            '    Dim rowProdE As DataRow = dtVentProdE.NewRow()
                            '    rowProdE("producto") = dt3.Rows(i)("PRODUCTO")
                            '    rowProdE("cantidad") = dt3.Rows(i)("CANTIDAD")
                            '    'VALIDO SI ES MONTO SOL O USD
                            '    If dt.Rows(i)("MONTO_INGRESO_SOLES").ToString <> String.Empty Then
                            '        rowProdE("monto_sol") = dt3.Rows(i)("VALOR_VENTA")
                            '        rowProdE("monto_usd") = "0.00"
                            '        If dt3.Rows(i)("VALOR_VENTA").ToString = String.Empty Then
                            '            totalventefecSol += 0.00
                            '        Else
                            '            totalventefecSol += Convert.ToDecimal(dt3.Rows(i)("VALOR_VENTA"))
                            '        End If
                            '        'totalventefecSol += Convert.ToDecimal(dt.Rows(i)("VALOR_VENTA"))
                            '    Else
                            '        rowProdE("monto_sol") = "0.00"
                            '        rowProdE("monto_usd") = dt3.Rows(i)("VALOR_VENTA")
                            '        If dt3.Rows(i)("VALOR_VENTA").ToString = String.Empty Then
                            '            totalventefecDol += 0.00
                            '        Else
                            '            totalventefecDol += Convert.ToDecimal(dt3.Rows(i)("VALOR_VENTA"))
                            '        End If
                            '        'totalventefecDol += Convert.ToDecimal(dt.Rows(i)("VALOR_VENTA"))
                            '    End If

                            '    rowProdE("vendedor") = dt3.Rows(i)("VENDEDOR")
                            '    dtVentProdE.Rows.Add(rowProdE)
                            'End If
                        End If
                        If dt.Rows(i)("FOPA_CODE").ToString().Equals("0008") And dt.Rows(i)("DESCRIPCION").ToString().Equals("SALDO INICIAL") Then 'aper caja
                            Dim rowIapercaja As DataRow = dtAperCaja.NewRow()
                            rowIapercaja("fechaHora") = dt.Rows(i)("FECHA")
                            rowIapercaja("detalle") = dt.Rows(i)("DESCRIPCION")
                            rowIapercaja("origen") = dt.Rows(i)("PERSONA")
                            rowIapercaja("monto_sol") = dt.Rows(i)("MONTO_INGRESO_SOLES")
                            rowIapercaja("monto_usd") = dt.Rows(i)("MONTO_INGRESO_DOLARES")
                            rowIapercaja("usuario") = dt.Rows(i)("CAJERO")
                            rowIapercaja("documento") = dt.Rows(i)("NRO_DOCUMENTO")
                            dtAperCaja.Rows.Add(rowIapercaja)
                            efectApercajSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                            efectApercajDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                        End If
                        'If dt.Rows(i)("FOPA_CODE").ToString().Equals("109") Then 'tarjeta
                        '    Dim rowItarjeta As DataRow = dtIngresotarjeta.NewRow()
                        '    rowItarjeta("fechaHora") = dt.Rows(i)("FECHA")
                        '    rowItarjeta("detalle") = dt.Rows(i)("DESCRIPCION")
                        '    rowItarjeta("origen") = dt.Rows(i)("PERSONA")
                        '    rowItarjeta("monto_sol") = dt.Rows(i)("MONTO_INGRESO_SOLES")
                        '    rowItarjeta("monto_usd") = dt.Rows(i)("MONTO_INGRESO_DOLARES")
                        '    rowItarjeta("usuario") = dt.Rows(i)("CAJERO")
                        '    rowItarjeta("documento") = dt.Rows(i)("NRO_DCTO")
                        '    dtIngresotarjeta.Rows.Add(rowItarjeta)
                        '    efectIntarjetaSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                        '    efectIntarjetaDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                        '    If dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ") Then
                        '        If respuestaresta(dt, i) Then
                        '            efectIntarjetaSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                        '            efectIntarjetaDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                        '        End If
                        '    End If

                        '    'VENTA PRODUCTOS POR VENDEDOR
                        '    If dt.Rows(i)("CODIGO_VENTA").ToString() <> String.Empty Then
                        '        Dim rowProdT As DataRow = dtVentProdT.NewRow()
                        '        rowProdT("producto") = dt.Rows(i)("PRODUCTO")
                        '        rowProdT("cantidad") = dt.Rows(i)("CANTIDAD")
                        '        'VALIDO SI ES MONTO SOL O USD
                        '        If dt.Rows(i)("MONTO_INGRESO_SOLES").ToString <> String.Empty Then
                        '            rowProdT("monto_sol") = dt.Rows(i)("VALOR_VENTA")
                        '            rowProdT("monto_usd") = "0.00"
                        '            totalventarjSol += Convert.ToDecimal(dt.Rows(i)("VALOR_VENTA"))
                        '        Else
                        '            rowProdT("monto_sol") = "0.00"
                        '            rowProdT("monto_usd") = dt.Rows(i)("VALOR_VENTA")
                        '            totalventarjDol += Convert.ToDecimal(dt.Rows(i)("VALOR_VENTA"))
                        '        End If

                        '        rowProdT("vendedor") = dt.Rows(i)("VENDEDOR")
                        '        dtVentProdT.Rows.Add(rowProdT)
                        '    End If

                        'End If
                        If dt.Rows(i)("FOPA_CODE").ToString().Equals("0007") Then 'cheques
                            Dim rowIcheques As DataRow = dtIcheques.NewRow()
                            rowIcheques("fechaHora") = dt.Rows(i)("FECHA")
                            rowIcheques("detalle") = dt.Rows(i)("DESCRIPCION")
                            rowIcheques("origen") = dt.Rows(i)("PERSONA")
                            rowIcheques("monto_sol") = dt.Rows(i)("MONTO_INGRESO_SOLES")
                            rowIcheques("monto_usd") = dt.Rows(i)("MONTO_INGRESO_DOLARES")
                            rowIcheques("usuario") = dt.Rows(i)("CAJERO")
                            rowIcheques("documento") = dt.Rows(i)("NRO_DOCUMENTO")
                            dtIcheques.Rows.Add(rowIcheques)
                            efectInchequesSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                            efectInchequesDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                            If dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ") Then
                                If respuestaresta(dt, i) Then
                                    efectInchequesSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    efectInchequesDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                End If
                            End If

                            'VENTA PRODUCTOS POR VENDEDOR
                            'If dt.Rows(i)("CODIGO_VENTA").ToString() <> String.Empty Then
                            '    Dim rowProdChe As DataRow = dtVentProdChe.NewRow()
                            '    rowProdChe("producto") = dt3.Rows(i)("PRODUCTO")
                            '    rowProdChe("cantidad") = dt3.Rows(i)("CANTIDAD")
                            '    'VALIDO SI ES MONTO SOL O USD
                            '    If dt.Rows(i)("MONTO_INGRESO_SOLES").ToString <> String.Empty Then
                            '        rowProdChe("monto_sol") = dt3.Rows(i)("VALOR_VENTA")
                            '        rowProdChe("monto_usd") = "0.00"
                            '        If dt3.Rows(i)("VALOR_VENTA").ToString = String.Empty Then
                            '            totalventcheSol += 0.00
                            '        Else
                            '            totalventcheSol += Convert.ToDecimal(dt3.Rows(i)("VALOR_VENTA"))
                            '        End If
                            '        'totalventcheSol += Convert.ToDecimal(dt.Rows(i)("VALOR_VENTA"))
                            '    Else
                            '        rowProdChe("monto_sol") = "0.00"
                            '        rowProdChe("monto_usd") = dt3.Rows(i)("VALOR_VENTA")
                            '        If dt3.Rows(i)("VALOR_VENTA").ToString = String.Empty Then
                            '            totalventcheDol += 0.00
                            '        Else
                            '            totalventcheDol += Convert.ToDecimal(dt3.Rows(i)("VALOR_VENTA"))
                            '        End If
                            '        'totalventcheDol += Convert.ToDecimal(dt.Rows(i)("VALOR_VENTA"))
                            '    End If

                            '    rowProdChe("vendedor") = dt3.Rows(i)("VENDEDOR")
                            '    dtVentProdChe.Rows.Add(rowProdChe)
                            'End If

                        End If
                        If dt.Rows(i)("FOPA_CODE").ToString().Equals("0001") Then ' cuentas
                            Dim rowICuentas As DataRow = dtInCuentas.NewRow()
                            rowICuentas("fechaHora") = dt.Rows(i)("FECHA")
                            rowICuentas("detalle") = dt.Rows(i)("DESCRIPCION")
                            rowICuentas("origen") = dt.Rows(i)("PERSONA")
                            rowICuentas("monto_sol") = dt.Rows(i)("MONTO_INGRESO_SOLES")
                            rowICuentas("monto_usd") = dt.Rows(i)("MONTO_INGRESO_DOLARES")
                            rowICuentas("usuario") = dt.Rows(i)("CAJERO")
                            rowICuentas("documento") = dt.Rows(i)("NRO_DOCUMENTO")
                            dtInCuentas.Rows.Add(rowICuentas)
                            efectInCuentasSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                            efectInCuentasDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                            If dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ") Then
                                If respuestaresta(dt, i) Then
                                    efectInCreditoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    efectInCreditoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                End If
                            End If
                        End If
                    End If
                    If dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("E") Then
                        If dt.Rows(i)("FOPA_CODE").ToString().Equals("0008") Then
                            Dim rowEefectivo As DataRow = dtEgresoEfectivo.NewRow()
                            rowEefectivo("fechaHora") = dt.Rows(i)("FECHA")
                            rowEefectivo("detalle") = dt.Rows(i)("GLOSARIO")
                            rowEefectivo("origen") = dt.Rows(i)("PERSONA")
                            rowEefectivo("monto_sol") = dt.Rows(i)("MONTO_EGRESO_SOLES")
                            rowEefectivo("monto_usd") = dt.Rows(i)("MONTO_EGRESO_DOLARES")
                            rowEefectivo("usuario") = dt.Rows(i)("CAJERO")
                            rowEefectivo("documento") = dt.Rows(i)("NRO_DOCUMENTO")
                            dtEgresoEfectivo.Rows.Add(rowEefectivo)
                            efectivoEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                            efectivoEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                        End If
                        If dt.Rows(i)("FOPA_CODE").ToString().Equals("0005") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0006") Then

                            Dim rowEtarjeta As DataRow = dtEgresotarjeta.NewRow()
                            rowEtarjeta("fechaHora") = dt.Rows(i)("FECHA")
                            rowEtarjeta("detalle") = dt.Rows(i)("DESCRIPCION")
                            rowEtarjeta("origen") = dt.Rows(i)("PERSONA")
                            rowEtarjeta("monto_sol") = dt.Rows(i)("MONTO_EGRESO_SOLES")
                            rowEtarjeta("monto_usd") = dt.Rows(i)("MONTO_EGRESO_DOLARES")
                            rowEtarjeta("usuario") = dt.Rows(i)("CAJERO")
                            rowEtarjeta("documento") = dt.Rows(i)("NRO_DOCUMENTO")
                            dtEgresotarjeta.Rows.Add(rowEtarjeta)
                            efectEgresotarjetasoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                            efectEgresotarjetaDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                        End If
                        If dt.Rows(i)("FOPA_CODE").ToString().Equals("0001") Then ' cuentas
                            Dim rowECuentas As DataRow = dtEgresoCuentas.NewRow()
                            rowECuentas("fechaHora") = dt.Rows(i)("FECHA")
                            rowECuentas("detalle") = dt.Rows(i)("DESCRIPCION")
                            rowECuentas("origen") = dt.Rows(i)("PERSONA")
                            rowECuentas("monto_sol") = dt.Rows(i)("MONTO_EGRESO_SOLES")
                            rowECuentas("monto_usd") = dt.Rows(i)("MONTO_EGRESO_DOLARES")
                            rowECuentas("usuario") = dt.Rows(i)("CAJERO")
                            rowECuentas("documento") = dt.Rows(i)("NRO_DOCUMENTO")
                            dtEgresoCuentas.Rows.Add(rowECuentas)
                            efectEgresoCuentassoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                            efectEgresoCuentasDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                        End If
                        If dt.Rows(i)("FOPA_CODE").ToString().Equals("0007") Then
                            Dim rowEcheques As DataRow = dtEgresoCheques.NewRow()
                            rowEcheques("fechaHora") = dt.Rows(i)("FECHA")
                            rowEcheques("detalle") = dt.Rows(i)("DESCRIPCION")
                            rowEcheques("origen") = dt.Rows(i)("PERSONA")
                            rowEcheques("monto_sol") = dt.Rows(i)("MONTO_EGRESO_SOLES")
                            rowEcheques("monto_usd") = dt.Rows(i)("MONTO_EGRESO_DOLARES")
                            rowEcheques("usuario") = dt.Rows(i)("CAJERO")
                            rowEcheques("documento") = dt.Rows(i)("NRO_DOCUMENTO")
                            dtEgresoCheques.Rows.Add(rowEcheques)
                            efectEgresochequesSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                            efectEgresochequesDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                        End If
                        'If dt.Rows(i)("FOPA_CODE").ToString().Equals("109") Then
                        '    Dim rowEtarjeta As DataRow = dtEgresotarjeta.NewRow()
                        '    rowEtarjeta("fechaHora") = dt.Rows(i)("FECHA")
                        '    rowEtarjeta("detalle") = dt.Rows(i)("DESCRIPCION")
                        '    rowEtarjeta("origen") = dt.Rows(i)("PERSONA")
                        '    rowEtarjeta("monto_sol") = dt.Rows(i)("MONTO_EGRESO_SOLES")
                        '    rowEtarjeta("monto_usd") = dt.Rows(i)("MONTO_EGRESO_DOLARES")
                        '    rowEtarjeta("usuario") = dt.Rows(i)("CAJERO")
                        '    rowEtarjeta("documento") = dt.Rows(i)("NRO_DCTO")
                        '    dtEgresotarjeta.Rows.Add(rowEtarjeta)
                        '    efectEgresotarjetasoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                        '    efectEgresotarjetaDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                        'End If
                        If dt.Rows(i)("MOPA_CODE").ToString().Equals("0002") Then
                            Dim rowEcredito As DataRow = dtEgresocredito.NewRow()
                            rowEcredito("fechaHora") = dt.Rows(i)("FECHA")
                            rowEcredito("detalle") = dt.Rows(i)("DESCRIPCION")
                            rowEcredito("origen") = dt.Rows(i)("PERSONA")
                            rowEcredito("monto_sol") = dt.Rows(i)("MONTO_INGRESO_SOLES")
                            rowEcredito("monto_usd") = dt.Rows(i)("MONTO_INGRESO_DOLARES")
                            rowEcredito("usuario") = dt.Rows(i)("CAJERO")
                            rowEcredito("documento") = dt.Rows(i)("NRO_DOCUMENTO")
                            dtEgresocredito.Rows.Add(rowEcredito)
                            efectEgreCreditoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                            efectEgreCreditoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                        End If




                    End If
                Else
                    Dim rowVentAnul As DataRow = dtVentasAnuladas.NewRow()
                    rowVentAnul("fechaHora") = dt.Rows(i)("FECHA")
                    rowVentAnul("detalle") = dt.Rows(i)("DESCRIPCION")
                    rowVentAnul("origen") = dt.Rows(i)("PERSONA")
                    rowVentAnul("monto_sol") = dt.Rows(i)("MONTO_INGRESO_SOLES")
                    rowVentAnul("monto_usd") = dt.Rows(i)("MONTO_INGRESO_DOLARES")
                    rowVentAnul("usuario") = dt.Rows(i)("CAJERO")
                    rowVentAnul("documento") = dt.Rows(i)("NRO_DOCUMENTO") 'NRO_DCTO
                    dtVentasAnuladas.Rows.Add(rowVentAnul)
                    totalventanuladas += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                    totalventanuladasDol += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                End If
            Next
        End If

        ingresostotales = efectivoIngresoSoles + efectInchequesSoles + efectInCreditoSoles + efectIntarjetaSoles + efectInCuentasSoles
        ingresostotalesDol = efectivoIngresoDolares + efectInchequesDolares + efectInCreditoDolares + efectIntarjetaDolares + efectInCuentasDolares
        ventastotales = efectivoIngresoSoles + efectInCreditoSoles + efectIntarjetaSoles
        ventastotalesDol = efectivoIngresoDolares + efectInCreditoDolares + efectIntarjetaDolares
        egresostotales = efectivoEgresoSoles + efectEgresotarjetasoles + efectEgresochequesSoles + efectEgreCreditoSoles + efectEgresoCuentassoles
        egresostotalesDol = efectivoEgresoDolares + efectEgresotarjetaDolares + efectEgresochequesDolares + efectEgreCreditoDolares + efectEgresoCuentasDolares
        saldoefectivo = ventastotales - egresostotales
        saldoefectivoDol = ventastotalesDol - egresostotalesDol

        resb.AppendFormat("<html><body>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='center'><strong><h1>{0}</h1></strong></td>", "REPORTE COMPLETO DE CAJA")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='center'><strong><i><h4>{0}</h4></i></strong></td>", dt2.Rows(0)("DESC_EMPRESA") + "  -  " + dt2.Rows(0)("DESC_SCSL") + " - " + dt2.Rows(0)("DESC_CAJA"))
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table><br>")


        resb.AppendFormat("<table border=""0"" width=""50%"" align='center' >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td  align='left'><strong>{0}</strong></td>", "Fecha Apertura :")
        resb.AppendFormat("<td  align='center'><strong>{0}</strong></td>", dt2.Rows(0)("FECHA_APERTURA").ToString())
        resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", "CAJERO")
        resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", dt2.Rows(0)("CAJERO").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table border=""0"" width=""50%"" align='center' >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td  align='left'><strong>{0}</strong></td>", "Fecha Cierre :")
        resb.AppendFormat("<td  align='center'><strong>{0}</strong></td>", IIf(dt2.Rows(0)("FECHA_CIERRE").ToString.Equals(""), "-", dt2.Rows(0)("FECHA_CIERRE").ToString()))
        resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", "Impreso Por :")
        resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", USUA_ID)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")





        resb.AppendFormat("<br/><br/><br/><br/>")
        'resb.AppendFormat("<table border=""0"" width=""100%"" >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='100%' align='center'><strong><i><h2>{0}</h2></i></strong></td>", "RESUMEN EJECUTIVO DE CAJA")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")
        'resb.AppendFormat("<br/>")

        ''resumen ejec
        'resb.AppendFormat("<table border=""0"" width=""50%"" align='center' >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td  align='left'>{0}</td>", "")
        'resb.AppendFormat("<td  align='center'>{0}</td>", "TOTAL(S/.)")
        'resb.AppendFormat("<td  align='center'>{0}</td>", "TOTAL($.)")
        'resb.AppendFormat("<td  align='right'>{0}</td>", "")
        'resb.AppendFormat("<td  align='right'>{0}</td>", "TOTAL(S/.)")
        'resb.AppendFormat("<td  align='right'>{0}</td>", "TOTAL($.)")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td  align='left'><strong>{0}</strong></td>", "VENTAS TOTALES")
        'resb.AppendFormat("<td  align='center'><strong>S/.{0}</strong></td>", ventastotales)
        'resb.AppendFormat("<td  align='center'><strong>$.{0}</strong></td>", ventastotalesDol)
        'resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", "EGRESOS")
        'resb.AppendFormat("<td  align='right'><strong>S/.{0}</strong></td>", egresostotales)
        'resb.AppendFormat("<td  align='right'><strong>$.{0}</strong></td>", egresostotalesDol)
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("<table border=""0"" width=""50%"" align='center' >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td  align='left'><strong>{0}</strong></td>", "INGRESOS TOTALES")
        'resb.AppendFormat("<td  align='center'><strong>S/.{0}</strong></td>", ingresostotales)
        'resb.AppendFormat("<td  align='center'><strong>$.{0}</strong></td>", ingresostotalesDol)
        'resb.AppendFormat("<td  align='right'><strong>{0}</strong></td>", "SALDO EFECTIVO")
        'resb.AppendFormat("<td  align='right'><strong>S/.{0}</strong></td>", saldoefectivo)
        'resb.AppendFormat("<td  align='right'><strong>$.{0}</strong></td>", saldoefectivoDol)
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")


        resb.AppendFormat("<br/><br/><br/><br/>")

        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='center'><strong><h2><u>{0}</u></h2></strong></td>", "DETALLE MOVIMIENTOS DE CAJA")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table><br><br><br><br><br>")


        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='center' color='blue'><strong><h2>{0}</h2></strong></td>", "INGRESOS")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#86C6FC' >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Apertura Caja")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtAperCaja.Rows.Count > 0 Then
            For i As Integer = 0 To dtAperCaja.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtAperCaja.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtAperCaja.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtAperCaja.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtAperCaja.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtAperCaja.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtAperCaja.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtAperCaja.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next

        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", efectApercajSoles)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", efectApercajDolares)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")



        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#86C6FC'>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Ventas Efectivo")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtIEfectivo.Rows.Count > 0 Then
            For i As Integer = 0 To dtIEfectivo.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIEfectivo.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtIEfectivo.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIEfectivo.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtIEfectivo.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtIEfectivo.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIEfectivo.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIEfectivo.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", efectivoIngresoSoles)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", efectivoIngresoDolares)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")





        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#86C6FC'>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Ventas Tarjeta")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtIngresotarjeta.Rows.Count > 0 Then
            For i As Integer = 0 To dtIngresotarjeta.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIngresotarjeta.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtIngresotarjeta.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIngresotarjeta.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtIngresotarjeta.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtIngresotarjeta.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIngresotarjeta.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIngresotarjeta.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", efectIntarjetaSoles)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", efectIntarjetaDolares)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")




        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#86C6FC' >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Ventas al Crédito")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtIngresocredito.Rows.Count > 0 Then
            For i As Integer = 0 To dtIngresocredito.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIngresocredito.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtIngresocredito.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIngresocredito.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtIngresocredito.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtIngresocredito.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIngresocredito.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIngresocredito.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
            resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", "")
            resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", "")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", efectInCreditoSoles)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", efectInCreditoDolares)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


















        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#86C6FC'>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Cheques")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtIcheques.Rows.Count > 0 Then
            For i As Integer = 0 To dtIcheques.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIcheques.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtIcheques.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIcheques.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtIcheques.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtIcheques.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIcheques.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtIcheques.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", efectInchequesSoles)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", efectInchequesDolares)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")




        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#86C6FC'>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Cuentas")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtInCuentas.Rows.Count > 0 Then
            For i As Integer = 0 To dtInCuentas.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtInCuentas.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtInCuentas.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtInCuentas.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtInCuentas.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtInCuentas.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtInCuentas.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtInCuentas.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", efectInCuentasSoles)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", efectInCuentasDolares)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")





        'EGRESOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS-----------------------------------------

        resb.AppendFormat("<br/><br/><br/><br/>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='center' color='red'><strong><h2>{0}</h2></strong></td>", "EGRESOS")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")



        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#81F781'>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Egresos Efectivo")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtEgresoEfectivo.Rows.Count > 0 Then
            For i As Integer = 0 To dtEgresoEfectivo.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoEfectivo.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtEgresoEfectivo.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoEfectivo.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtEgresoEfectivo.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtEgresoEfectivo.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoEfectivo.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoEfectivo.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", efectivoEgresoSoles)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", efectivoEgresoDolares)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")






        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#81F781'>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Egresos Tarjeta")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtEgresotarjeta.Rows.Count > 0 Then
            For i As Integer = 0 To dtEgresotarjeta.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresotarjeta.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtEgresotarjeta.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresotarjeta.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtEgresotarjeta.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtEgresotarjeta.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresotarjeta.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresotarjeta.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", efectEgresotarjetasoles)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", efectEgresotarjetaDolares)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")





        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#81F781'>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Egresos al Credito")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtEgresocredito.Rows.Count > 0 Then
            For i As Integer = 0 To dtEgresocredito.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresocredito.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtEgresocredito.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresocredito.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtEgresocredito.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtEgresocredito.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresocredito.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresocredito.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", efectEgreCreditoSoles)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", efectEgreCreditoDolares)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")






        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#81F781'>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Egresos cheques")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtEgresoCheques.Rows.Count > 0 Then
            For i As Integer = 0 To dtEgresoCheques.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoCheques.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtEgresoCheques.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoCheques.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtEgresoCheques.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtEgresoCheques.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoCheques.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoCheques.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", efectEgresochequesSoles)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", efectEgresochequesDolares)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")



        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#81F781'>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Cuentas")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtEgresoCuentas.Rows.Count > 0 Then
            For i As Integer = 0 To dtEgresoCuentas.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoCuentas.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtEgresoCuentas.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoCuentas.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtEgresoCuentas.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtEgresoCuentas.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoCuentas.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtEgresoCuentas.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", efectEgresoCuentassoles)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", efectEgresoCuentasDolares)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")




        resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#81F781'>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Ventas Anuladas")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Fecha")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "Detalle")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Origen")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Usuario")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "Documento")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If dtVentasAnuladas.Rows.Count > 0 Then
            For i As Integer = 0 To dtVentasAnuladas.Rows.Count - 1

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtVentasAnuladas.Rows(i)("fechaHora").ToString())
                resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", dtVentasAnuladas.Rows(i)("detalle").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtVentasAnuladas.Rows(i)("origen").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtVentasAnuladas.Rows(i)("monto_sol").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtVentasAnuladas.Rows(i)("monto_usd").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtVentasAnuladas.Rows(i)("usuario").ToString())
                resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", dtVentasAnuladas.Rows(i)("documento").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='20%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", totalventanuladas)
        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", totalventanuladasDol)
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='15%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")






        'VENTASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS PRODUCTOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
        'resb.AppendFormat("<br/><br/><br/><br/><br/><br/><br/>")
        'resb.AppendFormat("<table border=""0"" width=""100%"" >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='100%' align='center'><strong><i><h2><u>{0}</u></h2></i></strong></td>", "VENTAS DE PRODUCTOS POR VENDEDOR")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")
        'resb.AppendFormat("<br/>")


        'resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#FAFDC7'>")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Ventas Efectivo")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td>")
        'resb.AppendFormat("<table border=""0"" width=""100%"" >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "Producto")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Cantidad")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "Vendedor")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("</td>")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")


        'resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td>")
        'resb.AppendFormat("<table border=""1"" width=""100%"" >")
        'If dtVentProdE.Rows.Count > 0 Then
        '    For i As Integer = 0 To dtVentProdE.Rows.Count - 1

        '        resb.AppendFormat("<tr>")
        '        resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", dtVentProdE.Rows(i)("producto").ToString())
        '        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", dtVentProdE.Rows(i)("cantidad").ToString())
        '        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtVentProdE.Rows(i)("monto_sol").ToString())
        '        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtVentProdE.Rows(i)("monto_usd").ToString())
        '        resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", dtVentProdE.Rows(i)("vendedor").ToString())
        '        resb.AppendFormat("</tr>")
        '    Next
        'Else
        '    resb.AppendFormat("<tr>")
        '    resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("</tr>")

        'End If
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("</td>")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")


        'resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "")
        'resb.AppendFormat("<td width='10%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        'resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", totalventefecSol)
        'resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", totalventefecDol)
        'resb.AppendFormat("<td width='35%' align='right'><strong>{0}</strong></td>", "")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")



        'resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#FAFDC7'>")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Ventas Tarjeta")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td>")
        'resb.AppendFormat("<table border=""0"" width=""100%"" >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "Producto")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Cantidad")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "Vendedor")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("</td>")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")


        'resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td>")
        'resb.AppendFormat("<table border=""1"" width=""100%"" >")
        'If dtVentProdT.Rows.Count > 0 Then
        '    For i As Integer = 0 To dtVentProdT.Rows.Count - 1

        '        resb.AppendFormat("<tr>")
        '        resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", dtVentProdT.Rows(i)("producto").ToString())
        '        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", dtVentProdT.Rows(i)("cantidad").ToString())
        '        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtVentProdT.Rows(i)("monto_sol").ToString())
        '        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtVentProdT.Rows(i)("monto_usd").ToString())
        '        resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", dtVentProdT.Rows(i)("vendedor").ToString())
        '        resb.AppendFormat("</tr>")
        '    Next
        'Else
        '    resb.AppendFormat("<tr>")
        '    resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("</tr>")

        'End If
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("</td>")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")


        'resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "")
        'resb.AppendFormat("<td width='10%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        'resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", totalventarjSol)
        'resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", totalventarjDol)
        'resb.AppendFormat("<td width='35%' align='right'><strong>{0}</strong></td>", "")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#FAFDC7'>")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Ventas al Credito")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td>")
        'resb.AppendFormat("<table border=""0"" width=""100%"" >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "Producto")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Cantidad")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "Vendedor")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("</td>")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")


        'resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td>")
        'resb.AppendFormat("<table border=""1"" width=""100%"" >")
        'If dtVentProdC.Rows.Count > 0 Then
        '    For i As Integer = 0 To dtVentProdC.Rows.Count - 1

        '        resb.AppendFormat("<tr>")
        '        resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", dtVentProdC.Rows(i)("producto").ToString())
        '        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", dtVentProdC.Rows(i)("cantidad").ToString())
        '        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtVentProdC.Rows(i)("monto_sol").ToString())
        '        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtVentProdC.Rows(i)("monto_usd").ToString())
        '        resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", dtVentProdC.Rows(i)("vendedor").ToString())
        '        resb.AppendFormat("</tr>")
        '    Next
        'Else
        '    resb.AppendFormat("<tr>")
        '    resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("</tr>")

        'End If
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("</td>")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")


        'resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "")
        'resb.AppendFormat("<td width='10%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        'resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", totalventcreSol)
        'resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", totalventcreDol)
        'resb.AppendFormat("<td width='35%' align='right'><strong>{0}</strong></td>", "")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")


        'resb.AppendFormat("<table border=""0"" width=""9%"" bgcolor='#FAFDC7'>")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='100%' align='left'><strong><i><h3>{0}</h3></i></strong></td>", "Cheques")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td>")
        'resb.AppendFormat("<table border=""0"" width=""100%"" >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "Producto")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Cantidad")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto (S/.)")
        'resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto ($.)")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "Vendedor")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("</td>")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")


        'resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td>")
        'resb.AppendFormat("<table border=""1"" width=""100%"" >")
        'If dtVentProdChe.Rows.Count > 0 Then
        '    For i As Integer = 0 To dtVentProdChe.Rows.Count - 1

        '        resb.AppendFormat("<tr>")
        '        resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", dtVentProdChe.Rows(i)("producto").ToString())
        '        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", dtVentProdChe.Rows(i)("cantidad").ToString())
        '        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", dtVentProdChe.Rows(i)("monto_sol").ToString())
        '        resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", dtVentProdChe.Rows(i)("monto_usd").ToString())
        '        resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", dtVentProdChe.Rows(i)("vendedor").ToString())
        '        resb.AppendFormat("</tr>")
        '    Next
        'Else
        '    resb.AppendFormat("<tr>")
        '    resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "-")
        '    resb.AppendFormat("</tr>")

        'End If
        'resb.AppendFormat("</table>")

        'resb.AppendFormat("</td>")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")


        'resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "")
        'resb.AppendFormat("<td width='10%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        'resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", totalventcheSol)
        'resb.AppendFormat("<td width='10%' align='right'><strong>$. {0}</strong></td>", totalventcheDol)
        'resb.AppendFormat("<td width='35%' align='right'><strong>{0}</strong></td>", "")
        'resb.AppendFormat("</tr>")
        'resb.AppendFormat("</table>")


        'ventas resumen de productos

        resb.AppendFormat("<br/><br/><br/><br/><br/><br/><br/>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' align='center'><strong><i><h2><u>{0}</u></h2></i></strong></td>", "RESUMEN DE PRODUCTOS VENDIDOS")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        resb.AppendFormat("<br/>")

        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Codigo")
        resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "Producto")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Cantidad")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "UM.")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "Monto")

        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' width=""80%"" border=""0"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        If Not dt3 Is Nothing Then
            For i As Integer = 0 To dt3.Rows.Count - 1
                If dt3.Rows(i)("VALOR_VENTA").ToString = String.Empty Then
                    total_monto_ventas += 0.00
                Else
                    total_monto_ventas += Convert.ToDecimal(dt3.Rows(i)("VALOR_VENTA"))
                End If


                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", dt3.Rows(i)("COD_PROD").ToString())
                resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", dt3.Rows(i)("PRODUCTO").ToString())
                resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", dt3.Rows(i)("CANTIDAD").ToString())
                resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", dt3.Rows(i)("UNIDAD_MEDIDA").ToString())
                resb.AppendFormat("<td width='10%' align='right'><strong>{0}</strong></td>", dt3.Rows(i)("VALOR_VENTA").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='35%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "-")
            resb.AppendFormat("</tr>")

        End If
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table align='center' border=""0"" width=""80%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='10%' align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='35%' align='right'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='10%' align='right'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='10%' align='right'><strong>{0}</strong></td>", "TOTAL :")
        resb.AppendFormat("<td width='10%' align='right'><strong>S/. {0}</strong></td>", total_monto_ventas)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")







        resb.AppendFormat("<br/>")

        resb.AppendFormat("</body></html>")


        res = resb.ToString()
        'Return res
        Return resb
    End Function



    Public Function respuestaresta(ByVal dtx As DataTable, ByVal indice As Integer) As Boolean


        Try
            Dim midato As String = dtx.Rows(indice)("DESCRIPCION").ToString()
            Dim dividido As Array = midato.Split(" ")
            midato = dividido.GetValue(dividido.Length - 1).ToString().Substring(2).Trim()
            For Each midata As DataRow In dtx.Rows
                Try
                    Dim midatox As String = midata("NRO_DOCUMENTO").ToString().Trim()
                    Dim midatoxy As Array = midatox.Split(" ")
                    midatox = midatoxy.GetValue(0).ToString() + midatoxy.GetValue(1).ToString() + midatoxy.GetValue(2).ToString()

                    If midatox.Equals(midato) Then
                        Return True
                    End If
                Catch ex As Exception
                    Return False
                End Try
            Next



        Catch ex As Exception
            Return False
        End Try

    End Function






    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
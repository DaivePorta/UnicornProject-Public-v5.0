<%@ WebHandler Language="VB" Class="CALDEMO" %>

Imports iTextSharp.text
Imports iTextSharp.text.pdf
Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.IO.FileStream

Public Class CALDEMO : Implements IHttpHandler
    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_CAJA_CODE, p_CODE_MOVI, p_CODE_DET_MOVI As String


    Dim ncEmpresa As New NOMADE.NC.NCEmpresa("Bn")
    Dim ncSucursal As New NOMADE.NC.NCSucursal("Bn")
    Dim glLetras As New NOMADE.GL.GLLetras("Bn")
    Dim ncCaja As New NOMADE.NC.NCCaja("Bn")
    Dim caMovimientos As New NOMADE.CA.CAMovimientos("Bn")
    Dim gesPro As New NOMADE.NM.NMGestionProductos("Bn")

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
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        p_CODE_MOVI = context.Request("p_CODE_MOVI")
        p_CODE_DET_MOVI = context.Request("p_CODE_DET_MOVI")
        p_CAJA_CODE = context.Request("p_CAJA_CODE")

        REMITENTE = context.Request("REMITENTE")
        DESTINATARIOS = context.Request("DESTINATARIOS")
        ASUNTO = context.Request("asunto")
        MENSAJE = context.Request("MENSAJE")


        If p_PERS_PIDM = "" Or p_PERS_PIDM Is Nothing Then
            p_PERS_PIDM = "0"
        End If
        Try
            Select Case OPCION
                Case "1" 'lista pendientes (movimientos por cobrar)
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarMovimientosPorCobrar(p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE)
                    res = GenerarTablaPendientes(dt)
                Case "2" 'lista detalle de movimientos
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarDetalleMovimientosCaja(p_CODE_MOVI, "", "", "T") 'CODIGO DE MOVIMIENTO, CODIGO DE DETALLE DE MOVIMIENTO, DOCUMENTO DE REFERENCIA DEL DETALLE(FBRMCAJ_DCTO_CODE_REF)
                    res = GenerarTablaDetalleMovimientos(dt)
                Case "3" 'Generar tabla detalles de caja (montos)
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarDetalleMovimientosCaja(p_CODE_MOVI, "", "", "T")
                    res = GenerarTablaTotales(dt)
                Case "4" 'Generar tabla para impresion de detalle 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caMovimientos.ListarDetalleMovimientosCaja("", p_CODE_DET_MOVI, "", "T")
                    res = GenerarTablaDetalle(dt)
                Case "5" 'Listar detalles de movimientos caja  JSON
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caMovimientos.ListarDetalleMovimientosCaja(p_CODE_MOVI, "", "", "T")
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "correo"
                    Dim email As New Nomade.Mail.NomadeMail("Bn")
                    GenerarPDF(p_CODE_MOVI)
                    Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & p_CODE_MOVI & ".pdf"

                    Dim documento As String = ""

                    documento = GenerarDctoCorreo(p_CODE_MOVI)
                    MENSAJE += documento

                    email.enviar(REMITENTE, REMITENTE, DESTINATARIOS, ASUNTO, MENSAJE)
                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caMovimientos.ListarMovimientosCaja(p_CODE_MOVI, p_CTLG_CODE, p_SCSL_CODE, p_CAJA_CODE, "", "")
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""FECHA_APERTURA"" :" & """" & dt.Rows(0)("FECHA_APERTURA") & """,")
                    resb.Append("""FECHA_CIERRE"" :" & """" & dt.Rows(0)("FECHA_CIERRE") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    'Genera el contenido que muestra el detalle del DOCUMENTO DE VENTA  de un movimiento
    Public Function GenerarTablaDetalle(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        If Not (dt Is Nothing) Then
            For Each row In dt.Rows
                Dim codigoVenta As String = row("CODIGO_VENTA").ToString()
                If Not codigoVenta = "" Then
                    Dim nroDocumento As String = row("NRO_DOCUMENTO").ToString()
                    Dim fecha As String = row("FECHA").ToString()
                    Dim cajero As String = row("CAJERO").ToString()
                    'ReporteDocumento(codigoVenta, nroDocumento, fecha, cajero)                    
                    res = GenerarDctoImprimir(codigoVenta)
                    Return res
                End If
            Next
        End If
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarPDF(ByVal CODIGO As String) As String
        Dim ress As String = ""
        Dim htmlText As String = ""
        Dim cNomArch As String = CODIGO & ".pdf"
        htmlText = getHtmlTextPDF(CODIGO)
        HTMLToPDF(htmlText, cNomArch)
        Return ress
    End Function

    Function getHtmlTextPDF(ByVal codigo As String) As String
        Dim htmlText As New StringBuilder
        htmlText.Length = 0
        Dim documento As String = ""
        documento = GenerarDctoCorreo(codigo)
        htmlText.Append(documento)
        Return htmlText.ToString
    End Function

    Public Function GenerarDctoCorreo(ByVal p_CODE_MOVI As String) As String
        Dim tabla As New StringBuilder
        Dim dtTotales As New DataTable
        Dim dtDetalleMovimiento As New DataTable
        Dim res1, res2 As String
        res1 = ""
        res2 = ""
        tabla.Clear()
        dtTotales = caMovimientos.ListarDetalleMovimientosCaja(p_CODE_MOVI, "", "", "T")
        res1 = GenerarTablaTotales(dtTotales)
        dtDetalleMovimiento = caMovimientos.ListarDetalleMovimientosCaja(p_CODE_MOVI, "", "", "T")
        res2 = GenerarHtmlDetalleMovimiento(dtDetalleMovimiento)

        tabla.Append("<br>")
        tabla.Append("TOTALES")
        tabla.Append(res1)
        tabla.Append("<br>")
        tabla.Append("DETALLE MOVIMIENTO DE CAJA")
        tabla.Append("<br>")
        tabla.Append(res2)
        Return tabla.ToString()
    End Function

    Sub HTMLToPDF(ByVal HTML As String, ByVal FilePath As String)

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

        Dim nc As New Nomade.NC.NCEmpresa("Bn")
        Dim dtEmpre As DataTable
        dtEmpre = nc.ListarEmpresa(p_CTLG_CODE, "", "")

        Dim imgS, imgI As String

        Dim imgSuperior As String = dtEmpre.Rows(0)("IMG_SUPERIOR").ToString()
        imgS = imgSuperior.Replace("../../../", String.Empty)
        If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & imgS) Then
            imgS = "\recursos\img\SIN_IMAGEN.png"
        End If

        Dim imgInferior As String = dtEmpre.Rows(0)("IMG_INFERIOR").ToString()
        imgI = imgInferior.Replace("../../../", String.Empty)
        If Not My.Computer.FileSystem.FileExists(HttpContext.Current.Server.MapPath("~") & imgI) Then
            imgI = "\recursos\img\SIN_IMAGEN.png"
        End If

        Dim abc As StringReader = New StringReader(HTML)
        Dim styles As iTextSharp.text.html.simpleparser.StyleSheet = New iTextSharp.text.html.simpleparser.StyleSheet()
        styles.LoadStyle("border", "border-bottom", "2px")

        Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
        hw.Parse(New StringReader(HTML))
        document.Close()

        imgC(FilePath, imgS, imgI)
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

    'Gerera el contenido para el reporte del detalle de un movimiento  de VENTA
    Public Function ReporteDocumento(ByVal codigoVenta As String, ByVal nroDocumento As String, ByVal fecha As String, ByVal cajero As String) As String
        resb.Clear()
        'Cargar detalle
        Dim ca As New Nomade.CA.NotaCredito("Bn")
        dt = ca.lista_detalle_dcto_venta(codigoVenta, "1", "")
        Dim detalles As New StringBuilder
        If Not (dt Is Nothing) Then
            If (dt.Rows.Count > 0) Then
                For Each row In dt.Rows
                    Dim dtProd As New DataTable
                    dtProd = gesPro.LISTAR_PRODUCTO(row("MERCADERIA").ToString(), "", "", "", "", "")
                    detalles.AppendFormat("<tr>")
                    detalles.AppendFormat("<td style='text-align:right;'>{0}</td>", row("CANTIDAD").ToString())
                    detalles.AppendFormat("<td style='text-align:left;'colspan='2'>{0}</td>", dtProd.Rows(0)("DESC_ADM").ToString())
                    detalles.AppendFormat("<td style='text-align:right;'>{0}</td>", If(row("TOTAL").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(row("TOTAL").ToString()))))
                    detalles.AppendFormat("</tr>")
                Next
            End If
        End If
        'Fin Cargar detalle     

        Dim dtVenta As New DataTable
        dtVenta = ca.ListarDocumentosVenta(codigoVenta, "", "", "", "", "", "", "", "")
        Dim moneda As String = ""
        Dim cliente As String = ""
        Dim clienteDctoDesc As String = ""
        Dim clienteDctoNro As String = ""
        Dim subtotal As String = ""
        Dim valorIgv As String = ""
        Dim igv As String = ""
        Dim total As String = ""
        Dim caja As String = ""
        Dim documentoVenta As String = ""

        'Obtiene datos del documento de venta
        For Each row In dtVenta.Rows
            moneda = row("SIMBOLO_MONEDA").ToString()
            cliente = row("RAZON_SOCIAL").ToString()
            clienteDctoNro = row("CLIE_DCTO_DESC").ToString()
            clienteDctoDesc = row("CLIE_DCTO_DESC").ToString()
            subtotal = row("VALOR").ToString()
            valorIgv = row("IGV").ToString()
            total = row("IMPORTE").ToString()
            caja = row("DESC_CAJA").ToString()
            documentoVenta = row("DOCUMENTO").ToString()

            'igv = Convert.ToDecimal(row("PORC_IMPT").ToString())                     
        Next

        resb.AppendFormat("<table border='0' style='width:50%;' cellpadding='5px' align='center'>")
        resb.AppendFormat("<tr><td><strong>{0}</strong></td><td colspan='3'>{1}</td></tr>", documentoVenta, nroDocumento)
        resb.AppendFormat("<tr><td><strong>Caja:</strong></td><td>{0}</td><td><strong>Cajero:</strong></td><td>{1}</td></tr>", caja, cajero)
        resb.AppendFormat("<tr><td><strong>Fecha/Hora:</strong></td><td colspan='3'>{0}</td></tr>", fecha)
        resb.AppendFormat("<tr style='border-top:1px dashed black;'><td><strong>Cliente:</strong></td><td colspan='3'>{0}</td></tr>", cliente)
        resb.AppendFormat("<tr><td><strong>{0}:</strong></td><td colspan='3'>{1}</td></tr>", clienteDctoDesc, clienteDctoNro)
        resb.AppendFormat("<tr style='border-top:1px dashed black;'>")
        resb.AppendFormat("<td style='text-align:center;'><strong>Cantidad</strong></td>")
        resb.AppendFormat("<td style='text-align:center;'colspan='2'><strong>Descripción</strong></td>")
        resb.AppendFormat("<td style='text-align:center;'><strong>Importe</strong></td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("{0}", detalles.ToString())
        resb.AppendFormat("<tr style='border-top:1px dashed black;'><td colspan='3'><strong>VENTA NETA</strong></td><td colspan='1' style='text-align:right;'>{0}</td></tr>", subtotal)
        resb.AppendFormat("<tr><td colspan='3'><strong>I.G.V.</strong></td><td colspan='1' style='text-align:right;'>{0}</td></tr>", valorIgv)
        resb.AppendFormat("<tr><td colspan='3'><strong>TOTAL {1}</strong></td><td colspan='1' style='text-align:right;'><strong>{0}</strong</td></tr>", total, moneda)
        resb.AppendFormat("</table> ")
        res = resb.ToString()
        Return res
    End Function


    Public Function GenerarTablaPendientes(ByVal dt As DataTable) As String
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
        resb.AppendFormat("<table id=""tblPendientes"" class=""display"" border=""0"" style=""border: 1px solid#cbcbcb;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>FECHA / HORA DE PAGO</th>")
        resb.AppendFormat("<th>ORIGEN/DESTINO</th>")
        resb.AppendFormat("<th>CONCEPTO</th>")
        resb.AppendFormat("<th>DETALLE</th>")
        resb.AppendFormat("<th>NRO DOC</th>")
        resb.AppendFormat("<th>INGRESO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th>INGRESO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th>EGRESO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th>EGRESO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th>USUARIO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If (dt Is Nothing) Then
            'No hay datos          
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("<td style='text-align:center;'> </td>")
            resb.AppendFormat("</tr>")
        Else
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("FECHA").ToString())
                resb.AppendFormat("<td style='text-align:left;'>{0}</td>", dt.Rows(i)("PERSONA").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CONCEPTO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DETALLE").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("NRO_DOC").ToString())
                resb.AppendFormat("<td style='text-align:right;'>{0}</td>", If(dt.Rows(i)("INGRESO_SOLES").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("INGRESO_SOLES").ToString()))))
                resb.AppendFormat("<td style='text-align:right;'>{0}</td>", If(dt.Rows(i)("INGRESO_DOLARES").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("INGRESO_DOLARES").ToString()))))
                resb.AppendFormat("<td style='text-align:right;'>{0}</td>", If(dt.Rows(i)("EGRESO_SOLES").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("EGRESO_SOLES").ToString()))))
                resb.AppendFormat("<td style='text-align:right;'>{0}</td>", If(dt.Rows(i)("EGRESO_DOLARES").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("EGRESO_DOLARES").ToString()))))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("USUARIO").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        'Datos de moneda  
        resb.AppendFormat("<input id='hfDescMonedaBase' value='{0}' type='hidden' />", descMonedaBase)
        resb.AppendFormat("<input id='hfDescMonedaAlterna' value='{0}' type='hidden' />", descMonedaAlterna)
        resb.AppendFormat("<input id='hfSimbMonedaBase' value='{0}' type='hidden' />", simbMonedaBase)
        resb.AppendFormat("<input id='hfSimbMonedaAlterna' value='{0}' type='hidden' />", simbMonedaAlterna)
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaDetalleMovimientos(ByVal dt As DataTable) As String
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
        resb.AppendFormat("<table id=""tblDetalles"" class=""display DTTT_selectable"" border=""0"" style=""border: 1px solid#cbcbcb;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th>CODIGO</th>")
        resb.AppendFormat("<th>FECHA / HORA DE PAGO</th>")
        resb.AppendFormat("<th>ORIGEN/DESTINO</th>")
        resb.AppendFormat("<th>CONCEPTO</th>")
        resb.AppendFormat("<th>DETALLE</th>")
        resb.AppendFormat("<th>TIPO</th>")
        resb.AppendFormat("<th>NRO DOC</th>")
        resb.AppendFormat("<th>INGRESO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th>INGRESO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th>EGRESO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th>EGRESO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th>CAJERO</th>")
        resb.AppendFormat("<th></th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("FECHA").ToString())
                resb.AppendFormat("<td style='text-align:left;'>{0}</td>", dt.Rows(i)("PERSONA").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DESCRIPCION_CONCEPTO").ToString()) 'CONCEPTO
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DESCRIPCION").ToString()) 'DETALLE
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("TIPO_PAGO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("NRO_DOCUMENTO").ToString())
                resb.AppendFormat("<td style='text-align:right;'>{0}</td>", If(dt.Rows(i)("MONTO_INGRESO_SOLES").ToString() = "" Or dt.Rows(i)("MONTO_INGRESO_SOLES").ToString() = "0.00", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_INGRESO_SOLES").ToString()))))
                resb.AppendFormat("<td style='text-align:right;'>{0}</td>", If(dt.Rows(i)("MONTO_INGRESO_DOLARES").ToString() = "" Or dt.Rows(i)("MONTO_INGRESO_DOLARES").ToString() = "0.00", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_INGRESO_DOLARES").ToString()))))
                resb.AppendFormat("<td style='text-align:right;'>{0}</td>", If(dt.Rows(i)("MONTO_EGRESO_SOLES").ToString() = "" Or dt.Rows(i)("MONTO_EGRESO_SOLES").ToString() = "0.00", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_EGRESO_SOLES").ToString()))))
                resb.AppendFormat("<td style='text-align:right;'>{0}</td>", If(dt.Rows(i)("MONTO_EGRESO_DOLARES").ToString() = "" Or dt.Rows(i)("MONTO_EGRESO_DOLARES").ToString() = "0.00", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_EGRESO_DOLARES").ToString()))))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CAJERO").ToString())
                If dt.Rows(i)("CODIGO_VENTA").ToString() = "" Or dt.Rows(i)("CODIGO_VENTA").ToString().Length <= 0 Then
                    resb.AppendFormat("<td style='text-align:center;'></td>")
                Else
                    If dt.Rows(i)("CODIGO_VENTA").ToString().Substring(0, 1) = "V" Then
                        resb.AppendFormat("<td style='text-align:center;'>")
                        resb.AppendFormat(" <span><a class='btn blue' onclick=""imprimirDetalle('{0}')""><i class='icon-print'></i></a></span>", dt.Rows(i)("CODIGO").ToString())
                        resb.AppendFormat("</td>")
                    Else
                        resb.AppendFormat("<td style='text-align:center;'></td>")
                    End If
                End If
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarHtmlDetalleMovimiento(ByVal dt As DataTable) As String
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
        resb.AppendFormat("<table border=""1"" style=""border: 1px solid#cbcbcb; width: 90%"">")
        resb.AppendFormat("<thead style='font-size:8px'>")
        resb.AppendFormat("<th style='font-size:8px'>CODIGO</th>")
        resb.AppendFormat("<th style='font-size:8px'>FECHA / HORA DE PAGO</th>")
        resb.AppendFormat("<th style='font-size:8px'>ORIGEN/DESTINO</th>")
        resb.AppendFormat("<th style='font-size:8px'>CONCEPTO</th>")
        resb.AppendFormat("<th style='font-size:8px'>DETALLE</th>")
        resb.AppendFormat("<th style='font-size:8px'>TIPO</th>")
        resb.AppendFormat("<th style='font-size:8px'>NRO DOC</th>")
        resb.AppendFormat("<th style='font-size:8px'>INGRESO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th style='font-size:8px'>INGRESO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th style='font-size:8px'>EGRESO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th style='font-size:8px'>EGRESO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th>CAJERO</th>")
        resb.Append("</thead>")
        resb.Append("<tbody style='font-size:8px'>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.Append("<tr>")
                resb.AppendFormat("<td style='text-align:center;font-size:8px'>{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td style='text-align:center; font-size:8px'>{0}</td>", dt.Rows(i)("FECHA").ToString())
                resb.AppendFormat("<td style='text-align:left; font-size:8px'>{0}</td>", dt.Rows(i)("PERSONA").ToString())
                resb.AppendFormat("<td style='text-align:center; font-size:8px'>{0}</td>", dt.Rows(i)("DESCRIPCION_CONCEPTO").ToString()) 'CONCEPTO
                resb.AppendFormat("<td style='text-align:center; font-size:8px'>{0}</td>", dt.Rows(i)("DESCRIPCION").ToString()) 'DETALLE
                resb.AppendFormat("<td style='text-align:center; font-size:8px'>{0}</td>", dt.Rows(i)("TIPO_PAGO").ToString())
                resb.AppendFormat("<td style='text-align:center; font-size:8px'>{0}</td>", dt.Rows(i)("NRO_DOCUMENTO").ToString())
                resb.AppendFormat("<td style='text-align:right; font-size:8px'>{0}</td>", If(dt.Rows(i)("MONTO_INGRESO_SOLES").ToString() = "" Or dt.Rows(i)("MONTO_INGRESO_SOLES").ToString() = "0.00", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_INGRESO_SOLES").ToString()))))
                resb.AppendFormat("<td style='text-align:right; font-size:8px'>{0}</td>", If(dt.Rows(i)("MONTO_INGRESO_DOLARES").ToString() = "" Or dt.Rows(i)("MONTO_INGRESO_DOLARES").ToString() = "0.00", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_INGRESO_DOLARES").ToString()))))
                resb.AppendFormat("<td style='text-align:right; font-size:8px'>{0}</td>", If(dt.Rows(i)("MONTO_EGRESO_SOLES").ToString() = "" Or dt.Rows(i)("MONTO_EGRESO_SOLES").ToString() = "0.00", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_EGRESO_SOLES").ToString()))))
                resb.AppendFormat("<td style='text-align:right; font-size:8px'>{0}</td>", If(dt.Rows(i)("MONTO_EGRESO_DOLARES").ToString() = "" Or dt.Rows(i)("MONTO_EGRESO_DOLARES").ToString() = "0.00", "", String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO_EGRESO_DOLARES").ToString()))))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("CAJERO").ToString())
                resb.Append("</tr>")

            Next
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaTotales(ByVal dt As DataTable) As String
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
        Dim efectivoEgresoSoles As Decimal = 0
        Dim efectivoEgresoDolares As Decimal = 0
        Dim efectivoIngresoSoles As Decimal = 0
        Dim efectivoIngresoDolares As Decimal = 0
        Dim tarjetaIngresoSoles As Decimal = 0
        Dim tarjetaIngresoDolares As Decimal = 0
        Dim tarjetaEgresoSoles As Decimal = 0
        Dim tarjetaEgresoDolares As Decimal = 0
        Dim creditoIngresoSoles As Decimal = 0
        Dim creditoEgresoSoles As Decimal = 0
        Dim creditoIngresoDolares As Decimal = 0
        Dim creditoEgresoDolares As Decimal = 0
        Dim cuentasIngresoSoles As Decimal = 0
        Dim cuentasEgresoSoles As Decimal = 0
        Dim cuentasIngresoDolares As Decimal = 0
        Dim cuentasEgresoDolares As Decimal = 0
        Dim chequesIngresoSoles As Decimal = 0
        Dim chequesEgresoSoles As Decimal = 0
        Dim chequesIngresoDolares As Decimal = 0
        Dim chequesEgresoDolares As Decimal = 0

        Dim totalIngresoSoles As Decimal = 0
        Dim totalIngresoDolares As Decimal = 0
        Dim totalEgresoSoles As Decimal = 0
        Dim totalEgresoDolares As Decimal = 0

        Dim saldoEfectivoSoles As Decimal = 0
        Dim saldoEfectivoDolares As Decimal = 0
        Dim saldoTarjetaSoles As Decimal = 0
        Dim saldoTarjetaDolares As Decimal = 0
        Dim saldoCuentasSoles As Decimal = 0
        Dim saldoCuentasDolares As Decimal = 0
        Dim saldoChequesSoles As Decimal = 0
        Dim saldoChequesDolares As Decimal = 0
        Dim saldoCreditoSoles As Decimal = 0
        Dim saldoCreditoDolares As Decimal = 0
        Dim totalSaldoSoles As Decimal = 0
        Dim totalSaldoDolares As Decimal = 0

        If (dt Is Nothing) Then
            'No hay datos     
        Else
            Dim continuar As Boolean = True

            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("ANULADO_IND") = "N" Or (dt.Rows(i)("ANULADO_IND") = "S" And dt.Rows(i)("DEV_EFECTIVO_IND") = "N") Then
                    continuar = True
                Else
                    continuar = False
                End If
                If continuar Then

                    If Not (dt.Rows(i)("PAGO") Is DBNull.Value) Then
                        If (dt.Rows(i)("PAGO").ToString().Equals("SI")) Then
                            'INGRESOS---------------------------------------
                            If (dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("I")) Then
                                'EFECTIVO
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0008") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0009")) Then
                                    If Not (dt.Rows(i)("DESCRIPCION").ToString().Contains("DEVOLUCION A CLIENTE")) Then 'DPORTA 15/05/2021
                                        efectivoIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                        efectivoIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                    End If

                                    If (dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ")) Then
                                        If respuestaResta(dt, i) Then
                                            creditoIngresoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                            creditoIngresoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                        End If
                                    End If

                                End If
                                'TARJETA DE DEBITO  / TARJETA DE CREDITO
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0005") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0006")) Then
                                    If Not (dt.Rows(i)("DESCRIPCION").ToString().Contains("DEVOLUCION A CLIENTE")) Then 'DPORTA 15/05/2021
                                        tarjetaIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                        tarjetaIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                    End If

                                    If (dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO")) Then
                                        If respuestaResta(dt, i) Then
                                            creditoIngresoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                            creditoIngresoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                        End If
                                    End If

                                End If
                                ' DEPOSITO EN CUENTA
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0001")) Then
                                    If Not (dt.Rows(i)("DESCRIPCION").ToString().Contains("DEVOLUCION A CLIENTE ")) Then 'DPORTA 15/05/2021
                                        cuentasIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                        cuentasIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                    End If

                                    If (dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ")) Then
                                        If respuestaResta(dt, i) Then
                                            creditoIngresoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                            creditoIngresoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                        End If
                                    End If

                                End If
                                'CHEQUES NO NEGOCIABLES
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0007")) Then
                                    chequesIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    chequesIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))

                                    If (dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ")) Then
                                        If respuestaResta(dt, i) Then
                                            creditoIngresoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                            creditoIngresoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                        End If
                                    End If

                                End If
                                'EFECTIVO + TARJETA CREDITO/DEBITO
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("109")) Then
                                    tarjetaIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    tarjetaIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))

                                    If (dt.Rows(i)("DESCRIPCION").ToString().Contains("ACUENTA DEL DOCUMENTO ")) Then
                                        If respuestaResta(dt, i) Then
                                            creditoIngresoSoles -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                            creditoIngresoDolares -= Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                        End If
                                    End If
                                End If
                                'CREDITO
                                If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0018") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0019")) Then
                                    creditoIngresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_SOLES"))
                                    creditoIngresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_INGRESO_DOLARES"))
                                End If
                            End If
                            '-------
                            'EGRESOS---------------------------------------
                            If (dt.Rows(i)("TIPO_MOVIMIENTO").ToString().Equals("E")) Then
                                efectivoEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                efectivoEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'EFECTIVO
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0008") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0009")) Then
                                '    efectivoEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    efectivoEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                                ''TARJETA DE DEBITO  / TARJETA DE CREDITO
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0005") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0006")) Then
                                '    tarjetaEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    tarjetaEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                                '' DEPOSITO EN CUENTA
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0001")) Then
                                '    cuentasEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    cuentasEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                                ''CHEQUES NO NEGOCIABLES
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0007")) Then
                                '    chequesEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    chequesEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                                ''EFECTIVO + TARJETA CREDITO/DEBITO
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("109")) Then
                                '    tarjetaEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    tarjetaEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                                ''CREDITO
                                'If (dt.Rows(i)("FOPA_CODE").ToString().Equals("0018") Or dt.Rows(i)("FOPA_CODE").ToString().Equals("0019")) Then
                                '    creditoEgresoSoles += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_SOLES"))
                                '    creditoEgresoDolares += Convert.ToDecimal(dt.Rows(i)("MONTO_EGRESO_DOLARES"))
                                'End If
                            End If
                            '------
                        End If
                    End If

                End If
            Next

            totalIngresoSoles = efectivoIngresoSoles + tarjetaIngresoSoles + cuentasIngresoSoles + chequesIngresoSoles + creditoIngresoSoles
            totalIngresoDolares = efectivoIngresoDolares + tarjetaIngresoDolares + cuentasIngresoDolares + chequesIngresoDolares + creditoIngresoDolares
            totalEgresoSoles = efectivoEgresoSoles '+ tarjetaEgresoSoles + cuentasEgresoSoles + chequesEgresoSoles + creditoEgresoSoles
            totalEgresoDolares = efectivoEgresoDolares '+ tarjetaEgresoDolares + cuentasEgresoDolares + chequesEgresoDolares + creditoEgresoDolares

            saldoEfectivoSoles = efectivoIngresoSoles - efectivoEgresoSoles
            saldoEfectivoDolares = efectivoIngresoDolares - efectivoEgresoDolares
            saldoTarjetaSoles = tarjetaIngresoSoles '- tarjetaEgresoSoles
            saldoTarjetaDolares = tarjetaIngresoDolares '- tarjetaEgresoDolares
            'saldoCuentasSoles = cuentasIngresoSoles - cuentasEgresoSoles
            'saldoCuentasDolares = cuentasIngresoDolares - cuentasEgresoDolares
            saldoChequesSoles = chequesIngresoSoles '- chequesEgresoSoles
            saldoChequesDolares = chequesIngresoDolares '- chequesEgresoDolares
            saldoCreditoSoles = creditoIngresoSoles '- creditoEgresoSoles
            saldoCreditoDolares = creditoIngresoDolares '- creditoEgresoDolares

            totalSaldoSoles = saldoEfectivoSoles + saldoTarjetaSoles + saldoCuentasSoles + saldoChequesSoles + saldoCreditoSoles
            totalSaldoDolares = saldoEfectivoDolares + saldoTarjetaDolares + saldoCuentasDolares + saldoChequesDolares + saldoCreditoDolares

        End If
        '------
        resb.AppendFormat("<input id='datosMoba' type='hidden' value='{0}'/>", simbMonedaBase)
        resb.AppendFormat("<input id='datosMoal' type='hidden' value='{0}'/>", simbMonedaAlterna)
        resb.AppendFormat("<table id=""tblTotales"" class=""table display DTTT_selectable"" style=""border: 1px solid #cbcbcb;width:100%;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr style='background-color:#4B8CC5;color:white;'>")
        resb.AppendFormat("<th></th>")
        resb.AppendFormat("<th style='text-align:center;border-left: 1px solid #cbcbcb;'>INGRESO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th style='text-align:center;'>EGRESO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th style='text-align:center;'>INGRESO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th style='text-align:center;'>EGRESO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("<th style='text-align:center;'>SALDO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th style='text-align:center;'>SALDO ({0})</th>", simbMonedaAlterna)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        'Fila 1 TOTALES
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>TOTAL</strong></td>")
        resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalEgresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalEgresoDolares, simbMonedaAlterna)
        resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalSaldoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'><strong>{1}{0:N}</strong></td>", totalSaldoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 2 EFECTIVO
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>EFECTIVO</strong></td>")
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", efectivoIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", efectivoEgresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", efectivoIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", efectivoEgresoDolares, simbMonedaAlterna)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", saldoEfectivoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", saldoEfectivoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 3 TARJETA
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>TARJETA</strong></td>")
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", tarjetaIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", tarjetaEgresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", tarjetaIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", tarjetaEgresoDolares, simbMonedaAlterna)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", saldoTarjetaSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", saldoTarjetaDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        ''Fila 4 CUENTAS
        'resb.AppendFormat("<tr>")
        'resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>CUENTAS</strong></td>")
        'resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", cuentasIngresoSoles, simbMonedaBase)
        'resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", cuentasEgresoSoles, simbMonedaBase)
        'resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", cuentasIngresoDolares, simbMonedaAlterna)
        'resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", cuentasEgresoDolares, simbMonedaAlterna)
        'resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", saldoCuentasSoles, simbMonedaBase)
        'resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", saldoCuentasDolares, simbMonedaAlterna)
        'resb.AppendFormat("</tr>")

        'Fila 5 CHEQUES
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>CHEQUES</strong></td>")
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", chequesIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", chequesEgresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", chequesIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", chequesEgresoDolares, simbMonedaAlterna)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", saldoChequesSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", saldoChequesDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        'Fila 6 CREDITOS
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='border-right: 1px solid #cbcbcb;'><strong>CRÉDITOS</strong></td>")
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", creditoIngresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", creditoEgresoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", creditoIngresoDolares, simbMonedaAlterna)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", creditoEgresoDolares, simbMonedaAlterna)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", saldoCreditoSoles, simbMonedaBase)
        resb.AppendFormat("<td style='text-align:right;'>{1}{0:N}</td>", saldoCreditoDolares, simbMonedaAlterna)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function


    Private Function respuestaResta(ByVal dtx As DataTable, ByVal indice As Integer) As Boolean
        Try
            Dim midato As String = dtx.Rows(indice)("DESCRIPCION").ToString()
            Dim dividido As Array = midato.Split(" ")
            midato = dividido.GetValue(dividido.Length - 1).ToString().Substring(2).Trim()
            For Each midata In dtx.Rows
                Try
                    Dim midatox As String = midata("NRO_DOCUMENTO").ToString().Trim()
                    Dim midatoxy As Array = midatox.Split(" ")
                    midatox = midatoxy.GetValue(0).ToString() + midatoxy.GetValue(1).ToString() + midatoxy.GetValue(2).ToString()

                    If (midatox.Equals(midato)) Then
                        Return True
                    End If

                Catch ex As Exception
                End Try
            Next
        Catch ex As Exception
        End Try
        Return False
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

    Public Function GenerarDctoImprimir(ByVal p_CODE As String) As String
        Dim tabla As New StringBuilder
        Dim dtCabecera As New DataTable
        Dim dtDetalles As New DataTable
        Dim dtEmpresas As New DataTable
        Dim nvVenta As New NOMADE.NV.NVVenta("Bn")
        dtCabecera = nvVenta.ListarDocumentosVenta(p_CODE, "", "", "", "", "", "", "", "")
        dtDetalles = nvVenta.ListarDetalleDocumentoVenta(p_CODE, "0", "")
        '---------------------------------------------------------------        
        If dtCabecera IsNot Nothing Then
            Dim decimalIGV As Decimal = Decimal.Parse(dtCabecera.Rows(0)("PCTJ_IGV")) / 100
            Dim incIgv As String = dtCabecera.Rows(0)("IGV_IMPR_IND")
            Dim exoneradaInd = dtCabecera.Rows(0)("SCSL_EXONERADA_IND")
            Dim rutaLogo As String = ""
            Dim mon As String = dtCabecera.Rows(0)("SIMBOLO_MONEDA") 'Simbolo de moneda            
            Dim descMon As String = dtCabecera.Rows(0)("DESC_MONEDA") 'Descripcion de moneda                        
            Dim totalSinDscto As Decimal = 0
            Dim totalDsctoSinIgv As Decimal = 0
            'OBTENER LOGO
            dtEmpresas = ncEmpresa.ListarEmpresa(dtCabecera.Rows(0)("EMPRESA"), "A", "")
            rutaLogo = dtEmpresas(0)("RUTA_IMAGEN").ToString
            tabla.Append("<table id='tblDctoImprimir' border='0' style='width: 100%;' cellpadding='0px' cellspacing='0px' align='center'>")
            tabla.Append("<thead>")
            If dtCabecera.Rows(0)("ANULADO") = "SI" Then
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
                tabla.AppendFormat("<tr><th style='text-align: center;border-top: 1px dashed black;border-bottom: 1px dashed black; color:gray;' colspan='4'>ANULADO</th> </tr>")
                tabla.AppendFormat("<tr><th colspan='4'>&nbsp;</th></tr>")
            End If
            If Not rutaLogo = "" Then
                tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'><img style='max-height: 80px'  src='{0}'></th> </tr>", rutaLogo)
            End If
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DESC_EMPRESA"))
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>RUC {0}</th></tr>", dtCabecera.Rows(0)("RUC"))
            tabla.AppendFormat("<tr><th style='text-align: center' colspan='4'>{0}</th></tr>", dtCabecera.Rows(0)("DIRECCION"))
            tabla.Append("</thead>")

            tabla.Append("<tbody")
            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Nro Maq<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("IMPR_SERIE"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Fecha<span style='float:right'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("EMISION"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Local<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_SUCURSAL"))
            If exoneradaInd = "S" Then
                tabla.Append("<tr><td></td><td colspan='3'>(Exonerado)</td></tr>")
            End If

            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Vend.<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("VENDEDOR_USUA_ID")) 'VENDEDOR
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>Moneda<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("DESC_MONEDA"))
            tabla.AppendFormat("<tr><td style='vertical-align: top;'><strong>{1}<span style='float:right;clear:both;'>:</span></strong></td><td colspan='3'>{0}</td></tr>", dtCabecera.Rows(0)("NUM_DCTO"), dtCabecera.Rows(0)("DOCUMENTO_MIN"))

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
                        tabla.Append("<tr>")
                        tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                        tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), row("PU"))
                        tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", row("TOTAL"), vDesc(row("DESCUENTO")))
                        tabla.Append("</tr>")
                    Next
                Else

                    'Mostrar precios con IGV
                    If incIgv = "S" Then
                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                            tabla.Append("<tr>")
                            tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                            tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), row("PU"))
                            tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", totalSinDscto, vDesc(row("DESCUENTO")))
                            tabla.Append("</tr>")
                        Next
                    Else

                        For Each row In dtDetalles.Rows
                            totalSinDscto = Math.Round(Decimal.Parse(row("TOTAL")) + Decimal.Parse(row("DESCUENTO")), 2)
                            If row("TIPO_BIEN") = "EXO" Or row("TIPO_BIEN") = "INA" Then
                                tabla.Append("<tr>")
                                tabla.AppendFormat("<td style='text-align: left;'>{0}</td>", Math.Round(Decimal.Parse(row("CANTIDAD")), 2).ToString())
                                tabla.AppendFormat("<td style='text-align: left;padding-right:10px;padding-left:5px;' colspan='2'><span style='word-break:break-all;'>{0}</span> x {1}</td>", row("NOMBRE_IMPRESION"), row("PU"))
                                tabla.AppendFormat("<td style='text-align: right;'>{0}<br/><span style='display: inline-block;position: relative;left: 6px' >{1}</span></td>", totalSinDscto, vDesc(row("DESCUENTO")))
                                tabla.Append("</tr>")
                                totalDsctoSinIgv += Decimal.Parse(row("DESCUENTO"))
                            Else
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
                tabla.AppendFormat("<td colspan='3'><strong>SubTotal</strong></td>")
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
                tabla.AppendFormat("<td colspan='3'><strong>SubTotal</strong></td>")
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

            'If dtCabecera.Rows(0)("CLIE_DCTO_SUNAT") != "06" and dtCabecera.Rows(0)("CLIE_DCTO_SUNAT") != "6" and True  Then
            '    'Op Gravada incluye IGV y ocultar IGV en totales de venta 
            'Else
            '    'Op Gravada no incluye IGV y mostrar IGV en totales de venta  
            'End If
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

            tabla.Append("<tr>")
            tabla.AppendFormat("<td colspan='3'><strong>Total a Pagar<span style='float:right;clear:both;'>{0}</span></strong></td>", mon)
            tabla.AppendFormat("<td colspan='1' style='text-align: right;'>{0}</td>", dtCabecera.Rows(0)("IMPORTE"))
            tabla.Append("</tr>")

            tabla.Append("<tr><td colspan='4'>&nbsp;</td></tr>")
            tabla.Append("<tr style='border-top: 1px dashed black;'>")
            tabla.Append("<td colspan='4' style='text-align: center;'><strong>GRACIAS POR SU COMPRA</strong></td>")
            tabla.Append("</tr>")

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
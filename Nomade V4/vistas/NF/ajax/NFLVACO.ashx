<%@ WebHandler Language="VB" Class="NFLVACO" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports iTextSharp.text
Imports iTextSharp.text.pdf

Public Class NFLVACO : Implements IHttpHandler


    Dim OPCION As String
    Dim p_CTLG_CODE, p_SCSL_CODE As String
    Dim p_DESDE, p_HASTA, p_PIDM, p_NOMBRE_CTLG_CODE As String

    Dim ccCuentaPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim periodo As New Nomade.NC.NCPeriodo("bn")
    Dim coRegistroVentas As New Nomade.CO.CORegistroCompras("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")

        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_DESDE = context.Request("p_DESDE")
        p_HASTA = context.Request("p_HASTA")
        p_PIDM = context.Request("p_PIDM")
        p_NOMBRE_CTLG_CODE = context.Request("p_NOMBRE_CTLG_CODE")

        Try

            Select Case OPCION

                Case "1" 'Generar tabla: Libro 8 en interfaz
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coRegistroVentas.ListarComprobantes_Masivo(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), p_PIDM)
                    res = GenerarTablaComprobantesMasivo(dt).ToString()

                Case "2"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coRegistroVentas.ListarComprobantes_Masivo(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), p_PIDM)
                    res = GenerarPDF(dt, p_DESDE, p_HASTA, p_NOMBRE_CTLG_CODE) 'Tambien genera el .txt

                Case "3"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = coRegistroVentas.ListarComprobantes_Masivo(p_CTLG_CODE, p_SCSL_CODE, Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), p_PIDM)
                    res = GenerarLibroTXT(dt) 'Tambien genera el .txt 
                    res = GenerarTablaDocumento(dt)
            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function GenerarPDF(ByVal dt As DataTable, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_NOMBRE_CTLG_CODE As String) As String
        Dim ress As String = ""
        Dim cNomArch As String
        Dim htmlText As New StringBuilder

        cNomArch = "validez" + ".pdf"
        htmlText = GenerarTablaComprobantesMasivoPDF(dt, p_DESDE, p_HASTA, p_NOMBRE_CTLG_CODE)

        HTMLToPDF(htmlText, cNomArch)
        If dt.Rows.Count <> 0 Then
            ress = "ok"
        End If
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
        document = New Document(PageSize.A4, 25, 25, 55, 65)
        'document = New Document(PageSize.A2.Rotate(), 25, 25, 45, 20)

        PdfWriter.GetInstance(document, New FileStream(archivo, FileMode.Create))
        document.Open()

        Dim abc As StringReader = New StringReader(HTML.ToString)
        Dim styles As iTextSharp.text.html.simpleparser.StyleSheet = New iTextSharp.text.html.simpleparser.StyleSheet()
        styles.LoadStyle("border", "border-bottom", "2px")

        Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
        hw.Parse(New StringReader(HTML.ToString))
        document.Close()
    End Sub

    Public Function GenerarTablaDocumento(ByVal dt As DataTable) As String
        Dim archivosMax As Integer = 0
        Dim cantidad_datos As Integer = 0
        Dim archivosDescarga As Integer = 0

        cantidad_datos = dt.Rows.Count
        archivosMax = (cantidad_datos \ 100) + 1

        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th style='max-width:52px;'>NOMBRE ARCHIVO</th>")
        resb.AppendFormat("<th style='max-width:25px;'>#</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To archivosMax - 1
                archivosDescarga += 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", "validez" + Convert.ToString(archivosDescarga).PadLeft(3, "0") + ".txt")
                resb.AppendFormat("<td style='text-align:center;'>")
                resb.AppendFormat("<a class='btn black' onclick=""DescargaArchivoTXT('{0}')""><i class='icon-download'></i>&nbsp;Descargar TXT</a>", "validez" + Convert.ToString(archivosDescarga).PadLeft(3, "0") + ".txt")
                resb.AppendFormat("</td>")
                resb.AppendFormat("</tr>")
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarLibroTXT(ByVal dt As System.Data.DataTable) As String
        If dt.Rows.Count > 100 Then
            Dim numArchivos As Integer = 0
            Dim cantidad_datos As Integer = 0
            Dim archivosMax As Integer = 0
            Dim archivosDescarga As Integer = 0

            cantidad_datos = dt.Rows.Count
            archivosMax = (cantidad_datos \ 100) + 1

            res = GenerarTXT(dt, numArchivos)
        Else
            Dim numArchivos As Integer = 0

            res = GenerarTXT(dt, numArchivos)
        End If
        Return res
    End Function

    Public Function GenerarTXT(ByVal dt As System.Data.DataTable, ByVal numArchivos As Integer) As String
        Dim cadena As String = ""
        Dim archivo As String
        Dim res As String = ""
        Dim cantidad_datos As Integer = 0
        Dim contador As Integer = 0
        Dim archivosMax As Integer = 0
        Dim registrosFaltantes As Integer = 0

        Try
            Dim nroCorrelativo As Integer = 0

            If Not dt Is Nothing Then

                cantidad_datos = dt.Rows.Count
                archivosMax = (cantidad_datos \ 100) + 1
                registrosFaltantes = cantidad_datos Mod 100

                For i As Integer = 0 To dt.Rows.Count - 1
                    nroCorrelativo += 1
                    contador += 1
                    cadena += dt.Rows(i)("RUC").ToString() + "|" + dt.Rows(i)("COD_SUNAT").ToString() + "|" + dt.Rows(i)("SERIE").ToString() + "|" + dt.Rows(i)("CORRELATIVO").ToString() + "|" + dt.Rows(i)("FECHA_EMISION").ToString() + "|" + dt.Rows(i)("TOTAL").ToString()
                    If cantidad_datos <> nroCorrelativo And contador <> 100 Then
                        cadena += vbCrLf
                    End If
                    If contador = 100 Then

                        contador = 0
                        numArchivos += 1

                        res = "Archivos\" + "validez" + Convert.ToString(numArchivos).PadLeft(3, "0") + ".txt"

                        archivo = HttpContext.Current.Server.MapPath("~") + res

                        If My.Computer.FileSystem.FileExists(archivo) Then
                            My.Computer.FileSystem.DeleteFile(archivo)
                        End If

                        Dim fd As New StreamWriter(archivo, True)
                        fd.Write(cadena)
                        fd.Close()
                        cadena = ""
                    ElseIf (contador = registrosFaltantes) And (archivosMax = numArchivos + 1) Then

                        res = "Archivos\" + "validez" + Convert.ToString(archivosMax).PadLeft(3, "0") + ".txt"

                        archivo = HttpContext.Current.Server.MapPath("~") + res

                        If My.Computer.FileSystem.FileExists(archivo) Then
                            My.Computer.FileSystem.DeleteFile(archivo)
                        End If

                        Dim fd As New StreamWriter(archivo, True)
                        fd.Write(cadena)
                        fd.Close()
                    End If
                Next
                res = archivosMax
            Else
                res = "vacio"
            End If
        Catch ex As Exception
            res = "error"
        End Try
        Return res
    End Function

    Public Function GenerarTablaComprobantesMasivo(ByVal dt As DataTable) As StringBuilder
        Dim total As Decimal = 0
        res = ""
        resb.Clear()
        resb.AppendFormat("<br/>")

        resb.AppendFormat("<table id=""tblRegistroVentas"" border=""1"" style=""max-width:1610px;width:1610px;"" width:""1610px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>RUC EMISOR</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>CODIGO DOCUMENTO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>SERIE</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>CORRELATIVO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>FECHA DE EMISIÓN</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>MONTO</th>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody >")

        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr style='font-size:9px;'>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RUC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("COD_SUNAT").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CORRELATIVO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("FECHA_EMISION").ToString() = "", "", dt.Rows(i)("FECHA_EMISION").ToString().Substring(0, 10)))
                resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("TOTAL").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='34' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        res = resb.ToString()
        Return resb
    End Function

    Public Function GenerarTablaComprobantesMasivoPDF(ByVal dt As DataTable, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_NOMBRE_CTLG_CODE As String) As StringBuilder
        Dim total As Decimal = 0
        res = ""
        resb.Clear()
        resb.AppendFormat("<table border='0' style='width: 90%;' align='center'>")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr><th align='left' style='font-size:12pt;font-family:Arial,sans-serif'>{0}</th></tr>", p_NOMBRE_CTLG_CODE)
        resb.AppendFormat("<tr><th align='left' style='font-size:11pt;font-family:Arial,sans-serif'>COMPROBANTES ELECTRÓNICOS EMITIDOS DESDE {0} HASTA {1}</th></tr>", p_DESDE, p_HASTA)
        resb.AppendFormat("</thead>")
        resb.AppendFormat("</table>")
        resb.AppendFormat("<br>")

        resb.AppendFormat("<table id=""tblRegistroVentas"" border=""1"" style=""max-width:1610px;width:1610px;"" width:""1610px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>RUC EMISOR</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>CODIGO DOCUMENTO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>SERIE</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>CORRELATIVO</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>FECHA DE EMISIÓN</th>")
        resb.AppendFormat("<th rowspan='3' style='width:75px;'>MONTO</th>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody >")

        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr style='font-size:9px;'>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RUC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("COD_SUNAT").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SERIE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CORRELATIVO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", If(dt.Rows(i)("FECHA_EMISION").ToString() = "", "", dt.Rows(i)("FECHA_EMISION").ToString().Substring(0, 10)))
                resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("TOTAL").ToString())
                resb.AppendFormat("</tr>")
            Next
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='34' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        res = resb.ToString()
        Return resb
    End Function

    Public Function GenerarCmbAnioMes(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)("CODIGO").ToString() & """>" & dt.Rows(i)("DESCRIPCION").ToString() & "</option>"
            Next
        Else
            res = ""
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
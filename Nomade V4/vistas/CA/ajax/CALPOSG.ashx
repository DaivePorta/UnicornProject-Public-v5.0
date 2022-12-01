<%@ WebHandler Language="VB" Class="CALPOSG" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.IO.FileStream
Imports SelectPdf

Public Class CALPOSG : Implements IHttpHandler
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim OPCION As String
    Dim USUA_ID As String
    '----------------
    Dim p_CTLG_CODE, p_MONE_CODE, p_TIPO, p_SUBTIPO, p_FILTRO1 As String

    '----------------
    Dim caMovimientos As New Nomade.CA.CAMovimientos("Bn")

    'WHATSAPP CLOUD API
    Dim RECIPIENT_PHONE_NUMBER, MENSAJEWHATSAPP As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        USUA_ID = vChar(context.Request("USUA_ID"))
        'MOTIVO DE ANULACION
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_MONE_CODE = context.Request("p_MONE_CODE")
        p_TIPO = context.Request("p_TIPO")
        p_SUBTIPO = context.Request("p_SUBTIPO")
        p_FILTRO1 = context.Request("p_FILTRO1")

        'WHATSAPP CLOUD API
        RECIPIENT_PHONE_NUMBER = context.Request("RECIPIENT_PHONE_NUMBER")
        MENSAJEWHATSAPP = context.Request("MENSAJEWHATSAPP")

        Try

            Select Case OPCION
                Case "1" 'LISTAR REPORTE DE POSICION GLOBAL
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caMovimientos.ResumenPosicionGlobal(p_CTLG_CODE, p_MONE_CODE, p_TIPO, p_SUBTIPO, p_FILTRO1)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "whatsapp"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim whatsapp As New Nomade.Mail.NomadeMail("Bn")
                    Dim Plantilla As String = "Reporte"
                    Dim nombre_archivo = "Posicion_global_" & Date.Now().ToString("ddMMyyyy")
                    HttpContext.Current.Request.InputStream.Position = 0
                    Dim body = New StreamReader(HttpContext.Current.Request.InputStream).ReadToEnd()

                    Dim HTML As String = Replace(body, Chr(34), "")
                    HTML = HTML.Replace("\n", "")

                    Dim datoAj As String = HttpContext.Current.Server.MapPath("~") & "Archivos\" & nombre_archivo & ".pdf"

                    GenerarPDF(nombre_archivo, HTML)
                    whatsapp.enviarWhatsapp(RECIPIENT_PHONE_NUMBER, nombre_archivo, MENSAJEWHATSAPP, Plantilla, datoAj)
                Case Else
            End Select
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
            res = res.ToString().Replace(vbLf, "\n").Replace("""", "\""")
        Else
            res = campo
        End If
        Return res
    End Function

    Public Function GenerarPDF(ByVal NOMBRE As String, ByVal HTML As String) As String
        Dim ress As String = ""
        Dim htmlText As String = ""
        Dim cNomArch As String = NOMBRE & ".pdf"
        htmlText = HTML
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

        Dim htmlString As String = "<style> table {width: 100%;border-collapse: collapse;} th, td {padding: 10px;} div {margin-bottom: 40px;}" &
                "caption {font-weight: bold;}</style>" & "<body> " & HTML.ToString() & "</body>"

        Dim converter = New HtmlToPdf()
        converter.Options.PdfPageSize = PdfPageSize.A4
        converter.Options.MarginTop = 1.9
        converter.Options.AutoFitWidth = HtmlToPdfPageFitMode.AutoFit
        converter.Options.AutoFitHeight = HtmlToPdfPageFitMode.AutoFit
        converter.Options.MarginTop = 20
        converter.Options.MarginBottom = 20
        converter.Options.MarginLeft = 20
        converter.Options.MarginRight = 20

        Dim doc As SelectPdf.PdfDocument = converter.ConvertHtmlString(htmlString)

        doc.Save(archivo)
        doc.Close()
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
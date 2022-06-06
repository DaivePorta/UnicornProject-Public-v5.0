<%@ WebHandler Language="VB" Class="UTILES" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports iTextSharp.text
Imports iTextSharp.text.pdf

Public Class UTILES : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState


    Dim sOpcion As String
    Dim sRuta As String
    Dim sResponse As String
    Dim sNombreArchivo, sHTML As String
    Dim empresa As String
    Dim titulo As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        context.Response.ContentType = "text/plain"
        sRuta = context.Request("sRuta")
        sOpcion = context.Request("sOpcion")
        sNombreArchivo = context.Request("sNombreArchivo")
        sHTML = context.Request("sHTML")
        empresa = Utilities.mGetEmpresa(context)
        titulo = context.Request("titulo")

        Try

            Select Case sOpcion

                Case "PDF"
                    sResponse = HTMLToPDF(sHTML, sNombreArchivo)

                Case "DOWNLOAD"
                    sResponse = Utilities.FileToBase64(HttpContext.Current.Server.MapPath("~") & sRuta)

                Case "FILE2B64"
                    sResponse = Utilities.FileToBase64(sRuta)

                Case "CABECERA"
                    sResponse = GetCabeceraHTML(empresa, titulo)

            End Select

            context.Response.Write(sResponse)

        Catch ex As Exception
            Dim sMensaje As String = ex.Message
            If (sMensaje.IndexOf("[Advertencia]:") >= 0) Then
                context.Response.Write(ex.Message)
            Else
                context.Response.Write("[Error]: " + ex.Message)
            End If
        End Try

    End Sub

    Function HTMLToPDF(ByVal HTML As String, ByVal FilePath As String) As String 'crea el archivo en el servidor

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

        Dim abc As StringReader = New StringReader(HTML)
        Dim styles As iTextSharp.text.html.simpleparser.StyleSheet = New iTextSharp.text.html.simpleparser.StyleSheet()
        styles.LoadStyle("border", "border-bottom", "2px")

        Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
        hw.Parse(New StringReader(HTML))
        document.Close()

        Dim filep As String
        Dim ruta As String
        filep = "Archivos\"

        ruta = HttpContext.Current.Server.MapPath("~") + filep + FilePath

        If File.Exists(ruta) Then
            Return "OK"
        Else
            Return "Error"
        End If

    End Function

    Public Shared Function GetCabeceraHTML(empresa As String, titulo As String) As String

        Try

            '============== VARIABLES DE FUENTE ========================================
            Dim fuente_enunciado As String = "style='font-size:10px;font-family:Arial,sans-serif;vertical-align:initial'"
            Dim fuente_encabezado As String = "style='font-size:14px;font-family:Arial,sans-serif;font-weight:bold;vertical-align:middle;text-align:center;'"
            Dim fuente_texto As String = "style='font-size:10px;font-family:Arial,sans-serif;vertical-align:initial'"

            '============== DATOS CABECERA (EMPRESA, FECHA, HORA Y USUARIO) ============
            Dim html_cabecera As New StringBuilder
            Dim dt_empresa As New DataTable
            Dim dt_sucursal As New DataTable
            Dim oEmpresa As New NOMADE.NC.NCEmpresa("Bn")
            Dim oSucursal As New NOMADE.NC.NCSucursal("Bn")
            Dim nombre_empresa As String = ""
            '=== EMPRESA ===

            Dim direccion_empresa As String = ""
            dt_empresa = oEmpresa.ListarTotalEmpresa(empresa, String.Empty)
            If dt_empresa.Rows.Count > 0 Then
                nombre_empresa = dt_empresa.Rows(0)("CORTO").ToString()
                direccion_empresa = dt_empresa.Rows(0)("DIRECCION").ToString()
            End If

            '=== FECHA Y HORA ===
            Dim str_fecha As String = Date.Now.ToString("dd/MM/yyyy")
            Dim str_hora As String = Date.Now.ToShortTimeString()

            '=== USUARIO ===
            Dim str_usuario As String = HttpContext.Current.User.Identity.Name

            '=== DIBUJAR TABLA CABECERA ===
            html_cabecera.Append("<table border=""0"" style=""width:100%"" width:""100%"">")

            html_cabecera.Append("<tr><td style='width:30%'></td><td style='width:50%'></td><td style='width:10%'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style='width:10%'></td></tr>")
            html_cabecera.Append("<tr>")
            html_cabecera.Append("<td colspan='3' " & fuente_enunciado & ">" & nombre_empresa & "</td>")
            html_cabecera.Append("<td colspan='10' rowspan='3' " & fuente_encabezado & ">" & titulo & "</td>")
            html_cabecera.Append("<td " & fuente_enunciado & ">FechaImp</td>")
            html_cabecera.Append("<td " & fuente_enunciado & ">:" & str_fecha & "</td>")
            html_cabecera.Append("</tr>")

            html_cabecera.Append("<tr>")
            html_cabecera.Append("<td colspan='3' " & fuente_enunciado & ">" & direccion_empresa & "</td>")
            html_cabecera.Append("<td " & fuente_enunciado & ">HoraImp</td>")
            html_cabecera.Append("<td " & fuente_enunciado & ">:" & str_hora & "</td>")
            html_cabecera.Append("</tr>")

            html_cabecera.Append("<tr>")
            html_cabecera.Append("<td colspan='3'></td>")
            html_cabecera.Append("<td " & fuente_enunciado & ">Usuario</td>")
            html_cabecera.Append("<td " & fuente_enunciado & ">:" & str_usuario & "</td>")
            html_cabecera.Append("</tr>")
            html_cabecera.Append("<tr colspan='15'><td> <td></tr>")
            html_cabecera.Append("</table>")

            oEmpresa = Nothing
            dt_empresa = Nothing

            oSucursal = Nothing
            dt_sucursal = Nothing

            Return html_cabecera.ToString()

        Catch ex As Exception
            Return ""
        End Try
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
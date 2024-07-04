<%@ WebHandler Language="VB" Class="CPLGACC" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports iTextSharp.text
Imports iTextSharp.text.pdf

Public Class CPLGACC : Implements IHttpHandler

    Dim OPCION As String
    Dim p_CTLG_CODE, p_SCSL_CODE, p_ANIO, p_DESC_EMPRESA, p_NIVEL, p_CCOSTOS, p_DESC_CCOSTOS As String

    Dim cpCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")

        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_ANIO = context.Request("p_ANIO")
        p_DESC_EMPRESA = context.Request("p_DESC_EMPRESA").Replace("&amp;", "Y")
        p_NIVEL = context.Request("p_NIVEL")
        p_CCOSTOS = context.Request("p_CCOSTOS")
        p_DESC_CCOSTOS = context.Request("p_DESC_CCOSTOS").Replace(":", "")

        Try

            Select Case OPCION
                Case "1" 'Generar tabla: Libro 8 en interfaz
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpCuentaPorPagar.ListarRegistroGastosXCentroCostos(p_CTLG_CODE, p_SCSL_CODE, p_ANIO, p_NIVEL, p_CCOSTOS)
                    res = GenerarTablaGastosXCentroCostos(dt).ToString()

                Case "2"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpCuentaPorPagar.ListarRegistroGastosXCentroCostos(p_CTLG_CODE, p_SCSL_CODE, p_ANIO, p_NIVEL, p_CCOSTOS)
                    res = GenerarPDF(dt)
            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function GenerarPDF(ByVal dt As DataTable) As String
        Dim ress As String = ""
        Dim cNomArch As String
        Dim htmlText As New StringBuilder

        cNomArch = "DESTINO GASTOS POR CC " + p_DESC_CCOSTOS + " DE " + p_DESC_EMPRESA.ToString + "_" + p_ANIO + ".pdf"

        htmlText = GenerarTablaGastosXCentroCostos(dt)
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

    Public Function GenerarTablaGastosXCentroCostos(ByVal dt As DataTable) As StringBuilder
        Dim total As Decimal = 0
        res = ""
        resb.Clear()
        '------

        resb.AppendFormat("<table id=""tblRegistroGastos"" border=""1"" style=""max-width:3000px;width:2570px;"" width:""2570px"">")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>GASTOS</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>ENERO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>FEBRERO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>MARZO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>ABRIL</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>MAYO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>JUNIO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>JULIO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>AGOSTO</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>SETIEMBRE</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>OCTUBRE</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>NOVIEMBRE</th>")
        resb.AppendFormat("<th rowspan='1' style='width:75px;'>DICIEMBRE</th>")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody >")


        Dim nroCorrelativo As Integer = 0
        Dim totalEnero As Decimal = 0.0
        Dim totalFebrero As Decimal = 0.0
        Dim totalMarzo As Decimal = 0.0
        Dim totalAbril As Decimal = 0.0
        Dim totalMayo As Decimal = 0.0
        Dim totalJunio As Decimal = 0.0
        Dim totalJulio As Decimal = 0.0
        Dim totalAgosto As Decimal = 0.0
        Dim totalSetiembre As Decimal = 0.0
        Dim totalOctubre As Decimal = 0.0
        Dim totalNoviembre As Decimal = 0.0
        Dim totalDiciembre As Decimal = 0.0

        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                nroCorrelativo += 1

                resb.AppendFormat("<tr style='font-size:9px;'>")
                If dt.Rows(i)("REGISTRO").ToString() = "CONCEPTO" Then
                    resb.AppendFormat("<td align='left'  bgcolor='#D8D8D8'>{0}</td>", dt.Rows(i)("DESCRIPCION").ToString()) '1
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("ENERO").ToString()).ToString("N2")) '2
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("FEBRERO").ToString()).ToString("N2")) '3
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("MARZO").ToString()).ToString("N2")) '4             
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("ABRIL").ToString()).ToString("N2")) '5
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("MAYO").ToString()).ToString("N2")) '6
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("JUNIO").ToString()).ToString("N2")) '7
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("JULIO").ToString()).ToString("N2")) '8   
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("AGOSTO").ToString()).ToString("N2")) '9
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("SETIEMBRE").ToString()).ToString("N2")) '10
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("OCTUBRE").ToString()).ToString("N2")) '11
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("NOVIEMBRE").ToString()).ToString("N2")) '12   
                    resb.AppendFormat("<td align='right' bgcolor='#D8D8D8'><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("DICIEMBRE").ToString()).ToString("N2")) '13
                Else
                    resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESCRIPCION").ToString()) '1
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("ENERO").ToString()).ToString("N2")) '2
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("FEBRERO").ToString()).ToString("N2")) '3
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("MARZO").ToString()).ToString("N2")) '4             
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("ABRIL").ToString()).ToString("N2")) '5
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("MAYO").ToString()).ToString("N2")) '6
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("JUNIO").ToString()).ToString("N2")) '7
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("JULIO").ToString()).ToString("N2")) '8   
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("AGOSTO").ToString()).ToString("N2")) '9
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("SETIEMBRE").ToString()).ToString("N2")) '10
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("OCTUBRE").ToString()).ToString("N2")) '11
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("NOVIEMBRE").ToString()).ToString("N2")) '12   
                    resb.AppendFormat("<td align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", Decimal.Parse(dt.Rows(i)("DICIEMBRE").ToString()).ToString("N2")) '13
                End If


                resb.AppendFormat("</tr>")

                totalEnero += Decimal.Parse(dt.Rows(i)("ENERO").ToString())
                totalFebrero += Decimal.Parse(dt.Rows(i)("FEBRERO").ToString())
                totalMarzo += Decimal.Parse(dt.Rows(i)("MARZO").ToString())
                totalAbril += Decimal.Parse(dt.Rows(i)("ABRIL").ToString())
                totalMayo += Decimal.Parse(dt.Rows(i)("MAYO").ToString())
                totalJunio += Decimal.Parse(dt.Rows(i)("JUNIO").ToString())
                totalJulio += Decimal.Parse(dt.Rows(i)("JULIO").ToString())
                totalAgosto += Decimal.Parse(dt.Rows(i)("AGOSTO").ToString())
                totalSetiembre += Decimal.Parse(dt.Rows(i)("SETIEMBRE").ToString())
                totalOctubre += Decimal.Parse(dt.Rows(i)("OCTUBRE").ToString())
                totalNoviembre += Decimal.Parse(dt.Rows(i)("NOVIEMBRE").ToString())
                totalDiciembre += Decimal.Parse(dt.Rows(i)("DICIEMBRE").ToString())

            Next
            'Fila de totales          
            resb.AppendFormat("<tr style='font-size:9px;font-weight:800'>")
            resb.AppendFormat("<td colspan='1' align='center' >TOTALES</td>")
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalEnero.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalFebrero.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalMarzo.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalAbril.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalMayo.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalJunio.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalJulio.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalAgosto.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalSetiembre.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalOctubre.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalNoviembre.ToString("N2"))
            resb.AppendFormat("<td colspan='1' align='right' ><span style='float:left;clear:both;'>&nbsp;&nbsp;{0}</span>{1}</td>", "S/ ", totalDiciembre.ToString("N2"))

            resb.AppendFormat("</tr>")
        Else
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td colspan='34' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        res = resb.ToString()
        'Return res
        Return resb
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
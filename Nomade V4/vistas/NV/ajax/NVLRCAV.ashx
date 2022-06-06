<%@ WebHandler Language="VB" Class="NVLRCAV" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLRCAV : Implements IHttpHandler
    
    Dim OPCION As String
    Dim p_CTLG_CODE, p_SCSL_CODE, p_MONE_CODE, p_ANIOS, p_GRUP_CODE, p_SUBGRUP_CODE, p_USVE_CODE, p_PROD_CODE As String
    
    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_MONE_CODE = context.Request("p_MONE_CODE")
        p_ANIOS = context.Request("p_ANIOS")
      
        p_GRUP_CODE = context.Request("p_GRUP_CODE")
        p_SUBGRUP_CODE = context.Request("p_SUBGRUP_CODE")
        p_USVE_CODE = context.Request("p_USVE_CODE")
        p_PROD_CODE = context.Request("p_PROD_CODE")
        
        Try
            Select Case OPCION
                Case "1" 'Generar tabla 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ReporteComparativoAnaliticoVentas(p_CTLG_CODE, p_SCSL_CODE, p_MONE_CODE, p_ANIOS, p_GRUP_CODE, p_SUBGRUP_CODE,
                                                                   If(p_USVE_CODE = "" Or p_USVE_CODE = "TODOS", "0", p_USVE_CODE), If(p_PROD_CODE = "" Or p_PROD_CODE = "TODOS", "", p_PROD_CODE))
                    res = GenerarTablaDatos(dt)
                    
                Case "2" 'Listar años en los que hay VENTAS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarAniosVentas()
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""ANIO"" :" & """" & MiDataRow("ANIO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                   
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
 
       
    Public Function GenerarTablaDatos(ByVal dt As DataTable) As String
        resb.Clear()
        Dim datosAnio As StringBuilder = New StringBuilder
        Dim nroAnios As Integer = 0
        Dim anios As ArrayList = New ArrayList
        Dim totales As ArrayList = New ArrayList
        Dim m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12 As String
        Dim m1x, m2x, m3x, m4x, m5x, m6x, m7x, m8x, m9x, m10x, m11x, m12x As String
        Dim mon As String
        '-----       
        Dim dtMonedas As New DataTable
        dtMonedas = glLetras.ListarMoneda(p_CTLG_CODE)
        Dim codeMonedaBase As String = ""
        Dim codeMonedaAlterna As String = ""
        Dim simbMonedaBase As String = ""
        Dim simbMonedaAlterna As String = ""
        For Each row In dtMonedas.Rows
            If row("TIPO") = "MOBA" Then
                codeMonedaBase = row("CODIGO")
                simbMonedaBase = row("SIMBOLO")
            Else
                codeMonedaAlterna = row("CODIGO")
                simbMonedaAlterna = row("SIMBOLO")
            End If
        Next
        If p_MONE_CODE = codeMonedaBase Then
            mon = simbMonedaBase
        Else
            mon = simbMonedaAlterna
        End If

        m1 = "<tr><td>Enero</td>"
        m2 = "<tr><td>Febrero</td>"
        m3 = "<tr><td>Marzo</td>"
        m4 = "<tr><td>Abril</td>"
        m5 = "<tr><td>Mayo</td>"
        m6 = "<tr><td>Junio</td>"
        m7 = "<tr><td>Julio</td>"
        m8 = "<tr><td>Agosto</td>"
        m9 = "<tr><td>Septiembre</td>"
        m10 = "<tr><td>Octubre</td>"
        m11 = "<tr><td>Noviembre</td>"
        m12 = "<tr><td>Diciembre</td>"
        
        m1x = "<tr><td>Enero</td>"
        m2x = "<tr><td>Febrero</td>"
        m3x = "<tr><td>Marzo</td>"
        m4x = "<tr><td>Abril</td>"
        m5x = "<tr><td>Mayo</td>"
        m6x = "<tr><td>Junio</td>"
        m7x = "<tr><td>Julio</td>"
        m8x = "<tr><td>Agosto</td>"
        m9x = "<tr><td>Septiembre</td>"
        m10x = "<tr><td>Octubre</td>"
        m11x = "<tr><td>Noviembre</td>"
        m12x = "<tr><td>Diciembre</td>"
        If Not (dt Is Nothing) Then
            Dim nroMes As Integer = 0
            Dim monto As String = ""
            Dim totalAnio As Decimal = 0
            
            Dim anioActual, mesActual As Integer
            Dim fecha As Date = Date.Now
            anioActual = fecha.Year
            mesActual = fecha.Month
            
            For Each row In dt.Rows
                nroMes += 1
                monto = row("MONTO").ToString
                totalAnio += Decimal.Parse(row("MONTO").ToString)
                
                If row("ANIO") = anioActual And row("MES") > mesActual Then
                    If row("MONTO").ToString = "0.00" Then
                        monto = ""
                    End If
                End If
                If nroMes = 1 Then
                    m1 += "<td style='text-align:right;'>" + monto + "</td>"
                    m1x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(Decimal.Parse(monto)))) + "</td>"
                ElseIf nroMes = 2 Then
                    m2 += "<td style='text-align:right;'>" + monto + "</td>"
                    m2x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                    
                ElseIf nroMes = 3 Then
                    m3 += "<td style='text-align:right;'>" + monto + "</td>"
                    m3x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                    
                ElseIf nroMes = 4 Then
                    m4 += "<td style='text-align:right;'>" + monto + "</td>"
                    m4x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                    
                ElseIf nroMes = 5 Then
                    m5 += "<td style='text-align:right;'>" + monto + "</td>"
                    m5x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                    
                ElseIf nroMes = 6 Then
                    m6 += "<td style='text-align:right;'>" + monto + "</td>"
                    m6x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                    
                ElseIf nroMes = 7 Then
                    m7 += "<td style='text-align:right;'>" + monto + "</td>"
                    m7x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                    
                ElseIf nroMes = 8 Then
                    m8 += "<td style='text-align:right;'>" + monto + "</td>"
                    m8x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                    
                ElseIf nroMes = 9 Then
                    m9 += "<td style='text-align:right;'>" + monto + "</td>"
                    m9x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                    
                ElseIf nroMes = 10 Then
                    m10 += "<td style='text-align:right;'>" + monto + "</td>"
                    m10x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                    
                ElseIf nroMes = 11 Then
                    m11 += "<td style='text-align:right;'>" + monto + "</td>"
                    m11x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                    
                ElseIf nroMes = 12 Then
                    m12 += "<td style='text-align:right;'>" + monto + "</td>"
                    m12x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                    
                    anios.Add(row("ANIO").ToString)
                    totales.Add(totalAnio)
                    totalAnio = 0
                    nroAnios += 1
                Else
                    nroMes = 1
                    m1 += "<td style='text-align:right;'>" + monto + "</td>"
                    m1x += "<td style='text-align:right;'>" + If(monto = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(monto))) + "</td>"
                End If
            Next
        End If
        m1 += "</tr>"
        m2 += "</tr>"
        m3 += "</tr>"
        m4 += "</tr>"
        m5 += "</tr>"
        m6 += "</tr>"
        m7 += "</tr>"
        m8 += "</tr>"
        m9 += "</tr>"
        m10 += "</tr>"
        m11 += "</tr>"
        m12 += "</tr>"
            
        m1x += "</tr>"
        m2x += "</tr>"
        m3x += "</tr>"
        m4x += "</tr>"
        m5x += "</tr>"
        m6x += "</tr>"
        m7x += "</tr>"
        m8x += "</tr>"
        m9x += "</tr>"
        m10x += "</tr>"
        m11x += "</tr>"
        m12x += "</tr>"
        
        resb.AppendFormat("<table id=""tblDatos"" class=""table display DTTT_selectable"" style=""display:none;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<th style='text-align:center;'>Meses</th>")
        For Each anio In anios
            resb.Append("<th style='text-align:center;'>Año " + anio.ToString + "</th>")
        Next
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        resb.Append(m1)
        resb.Append(m2)
        resb.Append(m3)
        resb.Append(m4)
        resb.Append(m5)
        resb.Append(m6)
        resb.Append(m7)
        resb.Append(m8)
        resb.Append(m9)
        resb.Append(m10)
        resb.Append(m11)
        resb.Append(m12)
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        
        resb.Append("<div id='divDatosMostrar'><table id=""tblDatosMostrar"" class=""table display DTTT_selectable"">")
        resb.Append("<thead>")
        resb.Append("<tr>")
        resb.AppendFormat("<th style='text-align:center;'></th>")
        For Each anio In anios
            resb.Append("<th style='text-align:center;'>Año " + anio.ToString + "</th>")
        Next
        resb.Append("</tr>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
        resb.Append(m1x)
        resb.Append(m2x)
        resb.Append(m3x)
        resb.Append(m4x)
        resb.Append(m5x)
        resb.Append(m6x)
        resb.Append(m7x)
        resb.Append(m8x)
        resb.Append(m9x)
        resb.Append(m10x)
        resb.Append(m11x)
        resb.Append(m12x)
        resb.Append("<tr><td><strong>TOTAL</strong></td>")
        For Each total In totales
            resb.AppendFormat("<td style='text-align:center;'><strong>{0}</strong></td>", If(total.ToString = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(total.ToString))))
        Next
        resb.Append("<tr>")
        resb.Append("</tbody>")
        resb.Append("</table></div>")
        
        res = resb.ToString()
        Return res
    End Function
  
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class
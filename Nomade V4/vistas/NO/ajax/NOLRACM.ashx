<%@ WebHandler Language="VB" Class="NOLRACM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NOLRACM : Implements IHttpHandler
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Dim CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO, ANIOS, GRUP_CODE, SUBGRUP_CODE, USVE_CODE, PROD_CODE As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim OPCION As String
        
        Dim compra As New Nomade.NC.NCFactura("BN")
        
        Dim dt As DataTable
    
        Try
            OPCION = context.Request("OPCION")
            CTLG_CODE = context.Request("CTLG_CODE")
            SCSL_CODE = context.Request("SCSL_CODE")
            MONE_CODE = context.Request("MONE_CODE")
            ANIO = context.Request("ANIO")
            
            ANIOS = context.Request("ANIOS")
            GRUP_CODE = context.Request("GRUP_CODE")
            SUBGRUP_CODE = context.Request("SUBGRUP_CODE")
            USVE_CODE = context.Request("USVE_CODE")
            PROD_CODE = context.Request("PROD_CODE")
            
            Select Case OPCION
                Case "PROVEEDORES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCEProveedor("BN").ListarProveedor("0", "A", CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""PROVEEDOR"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "COMPARATIVO_COMPRAS"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = compra.ReporteComparativoAnaliticoCompras(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIOS, GRUP_CODE, SUBGRUP_CODE,
                                                                   If(USVE_CODE = "" Or USVE_CODE = "TODOS", "0", USVE_CODE), If(PROD_CODE = "" Or PROD_CODE = "TODOS", "", PROD_CODE))
                    res = GenerarTablaDatos(dt)
                Case "REPORTE"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = compra.ReporteAnaliticoComprasMensuales(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NOMBRE_MES"" :" & """" & MiDataRow("NOMBRE_MES").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "REPORTE_ANUALES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = compra.ReporteAnaliticoComprasAnuales(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""ANIO"" :" & """" & MiDataRow("ANIO").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "PRODUCTOS_COMPRADOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = compra.ReporteProductosComprados(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                            resb.Append("""PORCENTAJE"" :" & """" & MiDataRow("PORCENTAJE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "SUBGRUPOS_COMPRADOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = compra.ReporteAnaliticoSubgruposComprados(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""SUBGRUPO"" :" & """" & MiDataRow("GRUPO").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                            resb.Append("""PORCENTAJE"" :" & """" & MiDataRow("PORCENTAJE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "MARCAS_COMPRADAS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = compra.ReporteMarcasCompradas(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""MARCA"" :" & """" & MiDataRow("MARCA").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                            resb.Append("""PORCENTAJE"" :" & """" & MiDataRow("PORCENTAJE").ToString & """")
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
        dtMonedas = New Nomade.GL.GLLetras("BN").ListarMoneda(CTLG_CODE)
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
        If MONE_CODE = codeMonedaBase Then
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
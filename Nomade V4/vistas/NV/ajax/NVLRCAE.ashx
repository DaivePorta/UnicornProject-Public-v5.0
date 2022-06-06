<%@ WebHandler Language="VB" Class="NVLRCAE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLRCAE : Implements IHttpHandler

    Dim OPCION As String
    Dim p_CTLG_CODE, p_SCSL_CODE, p_MONE_CODE, p_ANIO, p_VENDEDORES, p_IGV As String

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
        p_ANIO = context.Request("p_ANIO")
        p_VENDEDORES = context.Request("p_VENDEDORES")
        p_IGV = context.Request("p_IGV")

        Try
            Select Case OPCION
                Case "1" 'Generar tabla 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ReporteComparativoAnaliticoVendedores(p_CTLG_CODE, p_SCSL_CODE, p_MONE_CODE, p_ANIO, p_VENDEDORES, p_IGV)
                    res = GenerarTablaDatos(dt)


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
        Dim vendedores As ArrayList = New ArrayList
        Dim totalesVendedor As ArrayList = New ArrayList
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
            Dim monto_anticipo As String = ""
            Dim totalAnio As Decimal = 0
            'La suma de monto_venta + anticipo -- esto es por cada mes
            Dim totalMes1 As String = ""
            Dim totalMes2 As String = ""
            Dim totalMes3 As String = ""
            Dim totalMes4 As String = ""
            Dim totalMes5 As String = ""
            Dim totalMes6 As String = ""
            Dim totalMes7 As String = ""
            Dim totalMes8 As String = ""
            Dim totalMes9 As String = ""
            Dim totalMes10 As String = ""
            Dim totalMes11 As String = ""
            Dim totalMes12 As String = ""

            Dim anioActual, mesActual As Integer
            Dim fecha As Date = Date.Now
            anioActual = fecha.Year
            mesActual = fecha.Month

            For Each row In dt.Rows
                nroMes += 1
                monto = row("MONTO").ToString
                monto_anticipo = row("MONTO_ANTICIPO").ToString
                totalAnio += Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)

                If Decimal.Parse(p_ANIO) = anioActual And row("MES") > mesActual Then
                    If row("MONTO").ToString = "0.00" And row("MONTO_ANTICIPO").ToString = "0.00" Then
                        monto = ""
                        monto_anticipo = ""
                    End If
                End If
                If nroMes = 1 Then
                    totalMes1 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m1 += "<td style='text-align:right;'>" + totalMes1 + "</td>"
                    m1x += "<td style='text-align:right;'>" + If(totalMes1 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(Decimal.Parse(totalMes1)))) + "</td>"
                ElseIf nroMes = 2 Then
                    totalMes2 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m2 += "<td style='text-align:right;'>" + totalMes2 + "</td>"
                    m2x += "<td style='text-align:right;'>" + If(totalMes2 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(totalMes2))) + "</td>"

                ElseIf nroMes = 3 Then
                    totalMes3 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m3 += "<td style='text-align:right;'>" + totalMes3 + "</td>"
                    m3x += "<td style='text-align:right;'>" + If(totalMes3 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(totalMes3))) + "</td>"

                ElseIf nroMes = 4 Then
                    totalMes4 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m4 += "<td style='text-align:right;'>" + totalMes4 + "</td>"
                    m4x += "<td style='text-align:right;'>" + If(totalMes4 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(totalMes4))) + "</td>"

                ElseIf nroMes = 5 Then
                    totalMes5 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m5 += "<td style='text-align:right;'>" + totalMes5 + "</td>"
                    m5x += "<td style='text-align:right;'>" + If(totalMes5 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(totalMes5))) + "</td>"

                ElseIf nroMes = 6 Then
                    totalMes6 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m6 += "<td style='text-align:right;'>" + totalMes6 + "</td>"
                    m6x += "<td style='text-align:right;'>" + If(totalMes6 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(totalMes6))) + "</td>"

                ElseIf nroMes = 7 Then
                    totalMes7 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m7 += "<td style='text-align:right;'>" + totalMes7 + "</td>"
                    m7x += "<td style='text-align:right;'>" + If(totalMes7 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(totalMes7))) + "</td>"

                ElseIf nroMes = 8 Then
                    totalMes8 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m8 += "<td style='text-align:right;'>" + totalMes8 + "</td>"
                    m8x += "<td style='text-align:right;'>" + If(totalMes8 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(totalMes8))) + "</td>"

                ElseIf nroMes = 9 Then
                    totalMes9 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m9 += "<td style='text-align:right;'>" + totalMes9 + "</td>"
                    m9x += "<td style='text-align:right;'>" + If(totalMes9 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(totalMes9))) + "</td>"

                ElseIf nroMes = 10 Then
                    totalMes10 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m10 += "<td style='text-align:right;'>" + totalMes10 + "</td>"
                    m10x += "<td style='text-align:right;'>" + If(totalMes10 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(totalMes10))) + "</td>"

                ElseIf nroMes = 11 Then
                    totalMes11 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m11 += "<td style='text-align:right;'>" + totalMes11 + "</td>"
                    m11x += "<td style='text-align:right;'>" + If(totalMes11 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(totalMes11))) + "</td>"

                ElseIf nroMes = 12 Then
                    totalMes12 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString)) 'agregado
                    m12 += "<td style='text-align:right;'>" + totalMes12 + "</td>"
                    m12x += "<td style='text-align:right;'>" + If(totalMes12 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(totalMes12))) + "</td>"

                    vendedores.Add(row("VENDEDOR").ToString)
                    totalesVendedor.Add(totalAnio)
                    totalAnio = 0
                    nroAnios += 1
                Else
                    'Como ya se trajo datos del primero vendedor y esos datos están en decimales, tiene que volver a su valor inicial para que la cadena que trae no se altere 
                    totalMes1 = ""
                    totalMes2 = ""
                    totalMes3 = ""
                    totalMes4 = ""
                    totalMes5 = ""
                    totalMes6 = ""
                    totalMes7 = ""
                    totalMes8 = ""
                    totalMes9 = ""
                    totalMes10 = ""
                    totalMes11 = ""
                    totalMes12 = ""
                    nroMes = 1
                    totalMes1 += String.Format(Decimal.Parse(row("MONTO").ToString) + Decimal.Parse(row("MONTO_ANTICIPO").ToString))
                    m1 += "<td style='text-align:right;'>" + totalMes1 + "</td>"
                    m1x += "<td style='text-align:right;'>" + If(totalMes1 = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(Decimal.Parse(totalMes1)))) + "</td>"
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
        For Each anio In vendedores
            resb.Append("<th style='text-align:center;'>" + anio.ToString + "</th>")
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
        For Each anio In vendedores
            resb.Append("<th style='text-align:center;'>" + anio.ToString + "</th>")
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
        For Each total In totalesVendedor
            resb.AppendFormat("<td style='text-align:right;'><strong>{0}</strong></td>", If(total.ToString = "", "", mon + " " + String.Format("{0:#,##0.00}", Decimal.Parse(total.ToString))))
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
<%@ WebHandler Language="VB" Class="NVLRAVC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLRAVC : Implements IHttpHandler
    
    Dim OPCION As String
    Dim p_CTLG_CODE, p_SCSL_CODE, p_MONE_CODE, p_ANIOS, p_MESES As String
    
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
        p_MESES = context.Request("p_MESES")
                    
        Try
            Select Case OPCION
                Case "1" 'Generar tabla 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ReporteAnaliticoVentasClientes(p_CTLG_CODE, p_SCSL_CODE, p_MONE_CODE, p_ANIOS, p_MESES)
                    ' res = GenerarTablaDatos(dt)
                    
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                    
                   
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
 
       
    Public Function GenerarTablaDatos(ByVal dt As DataTable) As String
        resb.Clear()
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
        
        resb.AppendFormat("<table id=""tblDatos"" class=""table display DTTT_selectable"" style=""display:none;"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<th style='text-align:center;'>CLIENTE</th>")
        resb.AppendFormat("<th style='text-align:center;'>MONTO</th>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                If dt.Rows(i)("CODIGO").ToString() <> "TOTA" Then
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("NOMBRE").ToString())
                    resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("MONTO").ToString())
                End If
               
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        
        
        resb.AppendFormat("<div id='divDatosMostrar'><table id=""tblDatosMostrar"" class=""table display DTTT_selectable"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<th style='text-align:center;'>ORD.</th>")
        resb.AppendFormat("<th style='text-align:left;'>CLIENTE</th>")
        resb.AppendFormat("<th style='text-align:center;'>MONTO {0}</th>", mon)
        '   resb.AppendFormat("<th style='text-align:center;'>PORCENTAJE</th>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                If dt.Rows(i)("CODIGO").ToString() = "TOTA" Then
                    resb.AppendFormat("<td style='text-align:center;'></td>")
                    resb.AppendFormat("<th style='text-align:left;'>{0}</th>", dt.Rows(i)("NOMBRE").ToString())
                    resb.AppendFormat("<th style='text-align:right;'>{0} {1}</th>", mon, String.Format("{0:#,##0.00}", Decimal.Parse(dt.Rows(i)("MONTO").ToString())))
                    '  resb.AppendFormat("<th style='text-align:right;'>{0} %</th>", dt.Rows(i)("PORCENTAJE").ToString())
                Else
                    If dt.Rows(i)("CODIGO").ToString() = "OTRO" Then
                        resb.AppendFormat("<td style='text-align:center;'>0</td>")
                    Else
                        resb.AppendFormat("<td style='text-align:center;'>{0}</td>", i + 1)
                    End If
                    resb.AppendFormat("<td style='text-align:left;'>{0}</td>", dt.Rows(i)("NOMBRE").ToString())
                    resb.AppendFormat("<td style='text-align:right;'>{0} {1}</td>", mon, dt.Rows(i)("MONTO").ToString())
                    '  resb.AppendFormat("<td style='text-align:right;'>{0} %</td>", dt.Rows(i)("PORCENTAJE").ToString())
                End If
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table></div>")
       
        
        res = resb.ToString()
        Return res
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
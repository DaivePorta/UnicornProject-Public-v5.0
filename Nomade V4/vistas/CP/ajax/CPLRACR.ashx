<%@ WebHandler Language="VB" Class="CPLRACR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPLRACR : Implements IHttpHandler
    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_USUA_ID, p_ANIO, p_MES As String
    
  
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim cpLineaCredito As New Nomade.CP.CPLineaCredito("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        
        p_ANIO = context.Request("p_ANIO")
        p_MES = context.Request("p_MES")
           
        If p_PERS_PIDM = "" Or p_PERS_PIDM Is Nothing Then
            p_PERS_PIDM = "0"
        End If
        Try
            Select Case OPCION
                Case "1" 'Generar tabla Creditos
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = cpLineaCredito.ListarReporteAnaliticoCreditoProveedores(p_CTLG_CODE, p_ANIO, p_MES)
                    res = GenerarTablaDatos(dt)
                    
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
 
       
    Public Function GenerarTablaDatos(ByVal dt As DataTable) As String
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
        resb.AppendFormat("<table id=""tblDatos"" class=""table display DTTT_selectable"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<th style='text-align:center;'>DÍA</th>")
        resb.AppendFormat("<th style='text-align:center;'>LÍNEAS PROVEEDORES ({0})</th>", simbMonedaBase)
        resb.AppendFormat("<th style='text-align:center;'>LÍMITE CRÉDITO ({0})</th>", simbMonedaBase)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
        If (dt Is Nothing) Then
            'No hay datos     
            resb.AppendFormat("<tr><td colspan='3' style='text-align:center;'>No hay datos</td></tr>")
        Else
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<th style='text-align:center;'>{0}</th>", dt.Rows(i)("DIA").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("LINEA_PROVEEDORES").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("LIMITE_CREDITO").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
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
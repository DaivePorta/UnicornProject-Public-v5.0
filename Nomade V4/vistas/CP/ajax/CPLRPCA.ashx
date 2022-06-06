<%@ WebHandler Language="VB" Class="CPLRPCA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPLRPCA : Implements IHttpHandler
    
    Dim OPCION, p_CTLG_CODE, p_SCSL_CODE, p_COD_PLANILLA, p_USUA_ID, p_PIDM, p_DESDE, p_HASTA, p_COD_FACAPS As String

  
  

    
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
           
     
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PIDM = context.Request("p_PIDM")
        
        p_DESDE = context.Request("p_DESDE")
        p_HASTA = context.Request("p_HASTA")
        p_COD_FACAPS = context.Request("p_COD_FACAPS")
        p_COD_PLANILLA = context.Request("p_COD_PLANILLA")

        Try
        
            Select Case OPCION
                Case "0"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
                    dt = CPCuentaPorPagar.ListarCreditoPlanillaFechas(p_CTLG_CODE, IIf(p_SCSL_CODE = Nothing, "", p_SCSL_CODE), Utilities.fechaLocal(p_DESDE), Utilities.fechaLocal(p_HASTA), p_PIDM)
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    End If
                Case "1" 'LISTA AMORTIZACIONES 
                     context.Response.ContentType = "application/json; charset=utf-8"
                    Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
                    dt = CPCuentaPorPagar.ListarAmortizacionesPlanillas(p_COD_PLANILLA, p_CTLG_CODE)
                    'res = GenerarTablaAmortizaciones(dt)
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    End If
            End Select
           
            
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
    
    
    
    
    Public Function GenerarTablaAmortizaciones(ByVal dtAmortizaciones As DataTable) As String
        
        res = ""
        resb.Clear()
        '------
        resb.Append("<table id=""tblBandeja"" class=""display DTTT_selectable"" border=""0"" style=""width:100%;"">")
        resb.Append("<thead >")
        resb.Append("<th >FECHA</th>")
        resb.Append("<th >ORIGEN</th>")
        resb.Append("<th >DESTINO</th>")
        resb.Append("<th >FORMA_PAGO</th>")
        resb.Append("<th >DOCUMENTO</th>")
        resb.Append("<th >MONTO</th>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
       
        If (dt Is Nothing) Then
            'No hay datos
            resb.Append("<tr>")
            resb.Append("<td style='text-align:center;'>NO HAY DATOS DISPONIBLES</td>")
            resb.Append("<td style='text-align:center;'> </td>")
            resb.Append("<td style='text-align:center;'> </td>")
            resb.Append("<td style='text-align:center;'> </td>")
            resb.Append("<td style='text-align:center;'> </td>")
            resb.Append("<td style='text-align:center;'> </td>")
            resb.Append("</tr>")
        Else
            Dim color = ""
            For i As Integer = 0 To dt.Rows.Count - 1
                If i Mod 2 = 0 Then
                    color = "lightblue"
                Else
                    color = "white"
                End If
                    
                resb.Append("<tr style='background-color:" + color + "'>")
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", If(dt.Rows(i)("FECHA_PROCESO").ToString() = "", "", dt.Rows(i)("FECHA_PROCESO").ToString().Substring(0, 10)))
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("ORIGEN").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DESTINO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("FORMA_PAGO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td style='text-align:center;'>{0} {1}</td>", dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("MONTO").ToString())
                resb.Append("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function
    
    
    
    
    
    
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
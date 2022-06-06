<%@ WebHandler Language="VB" Class="CPLDEMP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPLDEMP : Implements IHttpHandler
    Dim OPCION, p_CTLG_CODE As String
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
       
        
        Try
        
            Select Case OPCION
                Case "0" 'lista deudas
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim cpCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
                    dt = cpCuentaPorPagar.Listar_Deuda_Total_Empleado(p_CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    End If
                  
              
                    
            End Select
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
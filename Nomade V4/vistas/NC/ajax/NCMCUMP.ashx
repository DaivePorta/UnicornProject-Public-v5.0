<%@ WebHandler Language="VB" Class="NCMCUMP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMCUMP : Implements IHttpHandler
    
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    
    
    Dim OPCION As String
    Dim USUA_ID As String
    '----------------
    Dim p_SCSL_CODE, p_CTLG_CODE, p_MES_DESDE, p_MES_HASTA As String
 
    Dim ncVista As New Nomade.NC.NCVista("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        USUA_ID = context.Request("USUA_ID")
    
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_MES_DESDE = context.Request("p_MES_DESDE")
        p_MES_HASTA = context.Request("p_MES_HASTA")
        
        Try
        
            Select Case OPCION
                Case "3" 'LISTAR CUMPLEAÑOS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncVista.ListarCumpleaniosEmpleados(p_CTLG_CODE, p_SCSL_CODE, p_MES_DESDE, p_MES_HASTA)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case Else
                    
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
<%@ WebHandler Language="VB" Class="NOMANUL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NOMANUL : Implements IHttpHandler
    
    
    
    Dim OPCION, USUA_ID As String
    Dim CODE, ANULAC_ID, CMNT_ANULAC As String
    Dim dt As DataTable
    Dim res As String
  
    
   
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        ANULAC_ID = context.User.Identity.Name
        CMNT_ANULAC = context.Request("CMNT_ANULAC")
        CODE = context.Request("CODE")
        
        
        Try
            Select Case OPCION
                Case "1"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim NCFactura As New Nomade.NC.NCFactura("Bn")
                    res = NCFactura.AnularDocumentoCompra(CODE, ANULAC_ID, CMNT_ANULAC)
              
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
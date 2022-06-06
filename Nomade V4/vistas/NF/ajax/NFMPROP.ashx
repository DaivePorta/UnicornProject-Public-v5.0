<%@ WebHandler Language="VB" Class="NFMPROP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NFMPROP : Implements IHttpHandler
    Dim codigo As String
    Dim res As String
    Dim dt As DataTable
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        codigo = context.Request("codigo")
        
        Try
        
            Dim p As New Nomade.NC.NCPersona("BN")
            dt = p.listar_Persona_Natural(codigo, 1, String.Empty)
            res = dt.Rows(0)("NRO")
        
   
        
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
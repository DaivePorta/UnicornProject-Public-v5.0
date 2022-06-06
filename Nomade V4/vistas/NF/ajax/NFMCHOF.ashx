<%@ WebHandler Language="VB" Class="Handler" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Handler : Implements IHttpHandler
    Dim codigo As String
    Dim res As String
    Dim dt As DataTable
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        codigo = context.Request("codigo")
        
        Try
        
            Dim p As New Nomade.NC.NCPersona("BN")
            dt = p.listar_Persona_Natural(codigo, String.Empty, String.Empty)
            res = dt.Rows(0)("NRO") & "|" & dt.Rows(0)("DOID_CODE")
        
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
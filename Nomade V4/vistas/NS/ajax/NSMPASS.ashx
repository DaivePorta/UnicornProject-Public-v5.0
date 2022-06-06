<%@ WebHandler Language="VB" Class="NSMPASS" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSMPASS : Implements IHttpHandler

    Dim user As String
    Dim pass As String
    Dim pasn As String
    Dim res As String
    Dim p As New Nomade.NS.NSUsuario("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        user = context.Request("user")
        pass = context.Request("pass")
        pasn = context.Request("pasn")
        
        Try
            res = p.CambiarClaveUsuario(user, pass, pasn)
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
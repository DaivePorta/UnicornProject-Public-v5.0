<%@ WebHandler Language="VB" Class="NCMANDO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMANDO : Implements IHttpHandler


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
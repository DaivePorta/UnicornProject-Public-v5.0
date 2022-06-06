<%@ WebHandler Language="VB" Class="CBMMTAR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CBMMTAR : Implements IHttpHandler
    
    Dim OPCION As String
    
    Dim CODIGO, NOMBRE_MARCA, TIPO_MARCA, ESTADO_MARCA As String
    
    Dim dt As DataTable
    
    Dim mtar As New Nomade.NC.NCMarcaTarjeta("Bn")
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        
        CODIGO = context.Request("CODIGO")
        NOMBRE_MARCA = context.Request("NOMBRE_MARCA")
        TIPO_MARCA = context.Request("TIPO_MARCA")
        
        ESTADO_MARCA = context.Request("ESTADO_MARCA")
        
        Select Case OPCION
            Case "0"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = mtar.ListarMarcaTarjeta(CODIGO, "")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""MARCA"":""" & row("MARCA").ToString & """,")
                        resb.Append("""TIPO_MARCA"":""" & row("TIPO_MARCA").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "1"
                context.Response.ContentType = "text/plain"
                res = mtar.CrearMarcaTarjeta(NOMBRE_MARCA, TIPO_MARCA, ESTADO_MARCA)
            Case "2"
                context.Response.ContentType = "text/plain"
                res = mtar.ActualizarMarcaTarjeta(CODIGO, NOMBRE_MARCA, TIPO_MARCA, ESTADO_MARCA)
        End Select
        context.Response.Write(res)
        
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
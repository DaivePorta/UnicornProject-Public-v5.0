<%@ WebHandler Language="VB" Class="NRMNICA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NRMNICA : Implements IHttpHandler
    
    Dim code As String
    Dim opcion As String
    Dim codigo, descripcion, estado, usuario As String
    Dim dt As DataTable
    Dim p As New Nomade.NR.NRNivelCadenaAbastecimiento("bn")
    Dim res As String
    Dim resb As New StringBuilder
    
        
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
    
        opcion = context.Request("opcion")
        code = context.Request("code")
        
        codigo = context.Request("codigo")
        descripcion = context.Request("descripcion")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        context.Response.ContentType = "text/html"
        

     
        Try
            Select Case opcion
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarNivelCadenaAbastecimiento(code, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""code"":" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""Descripcion"":" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""ESTADO_IND"":" & """" & MiDataRow("ESTADO_IND").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                        
                    End If
                    res = resb.ToString()
                    
                Case "2"
                    
                    res = CrearNCAbastecimientos(descripcion, estado, usuario)
                
                Case "3"
                    
                    res = ActualizarNCAbastecimientos(codigo, descripcion, estado, usuario)
                
                Case "4"
                    res = CambiarEstadoNCAbastecimientos(code)
                Case Else
                    
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
            
        End Try
             
    End Sub
 
    Public Function CrearNCAbastecimientos(ByVal p_DESC As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As String
       
        Dim Datos(1) As String
        Datos = p.CrearNCAbastecimiento(p_DESC, p_ESTADO_IND, p_USUA_ID)
        Return Datos(0)
    
    End Function
    
    Public Function ActualizarNCAbastecimientos(ByVal p_CODE As String, ByVal p_DESC As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As String
       
        Dim Datos(1) As String
        Datos = p.ActualizarNCAbastecimiento(p_CODE, p_DESC, p_ESTADO_IND, p_USUA_ID)
        Return Datos(0)
    
    End Function
    
    Public Function CambiarEstadoNCAbastecimientos(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = p.CambiarEstadoNCAbastecimiento(p_CODE)
        
        Return datos(0)
     
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
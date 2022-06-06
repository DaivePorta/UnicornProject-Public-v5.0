<%@ WebHandler Language="VB" Class="NCMPERE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMPERE : Implements IHttpHandler
    
        
    Dim codigo, codigo_sunat, estado, descripcion, desc_corta, usuario As String
    
     
    Dim opcion As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim periodo As New Nomade.NC.NCPeriodo("Bn")
    Dim code As String
    
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        code = context.Request("code")
        opcion = context.Request("opcion")
                
        codigo = context.Request("codigo")
        codigo_sunat = context.Request("codigo_sunat")
        estado = context.Request("estado")
        descripcion = context.Request("descripcion")
        usuario = context.Request("usuario")
        
        
        Try
            
            Select Case opcion

                Case "0"
                    context.Response.ContentType = "application/json; charset=utf-8"
                                    
                    dt = periodo.ListarPeriodo(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("codigo").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("codigo_sunat").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("descripcion").ToString & """,")
                            resb.Append("""ESTADO_ID"" :" & """" & MiDataRow("ESTADO_ID").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("usuario").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "N"
                    res = CrearPeriodo(codigo_sunat, descripcion, estado, usuario)

                Case "M"
                    res = ActualizarPeriodo(codigo, codigo_sunat, descripcion, estado, usuario)
                    
                Case "A"
                    res = CambiarEstadoPeriodo(code)
            End Select
            
            
            context.Response.Write(res)
            
        Catch ex As Exception

        End Try
        
 
    End Sub
    
     public function CrearPeriodo(ByVal p_CODE_SUNAT As String, _
                                       ByVal p_DESC As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As String
        Dim Datos As String
        
        Datos = periodo.CrearPeriodo(p_CODE_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID)
        periodo = Nothing
        
        Return Datos
                
    End Function
 
    Public Function ActualizarPeriodo(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_ID As String, p_USUA_ID As String) As String
        Dim datos As String
        datos = periodo.ActualizarPeriodo(p_CODE, p_CODE_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID)
        Return datos
        
    End Function
    
     
    Public Function CambiarEstadoPeriodo(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = periodo.CambiarEstadoPeriodo(p_CODE)
        
        Return datos(0)
     
    End Function
 
      
     
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
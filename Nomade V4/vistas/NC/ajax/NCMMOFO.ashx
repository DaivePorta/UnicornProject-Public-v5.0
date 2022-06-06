<%@ WebHandler Language="VB" Class="NCMMOFO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMMOFO : Implements IHttpHandler
    
    Dim code As String
    Dim opcion As String
    
    Dim codigo, cod_sunat, estado, descripcion, usuario As String
    
    Dim modFormativa As New Nomade.NC.NCModalidadForm("Bn")
    
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
   
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
      
        
        code = context.Request("CODE")
        opcion = context.Request("opcion")
        
        codigo = context.Request("codigo")
        cod_sunat = context.Request("cod_sunat")
        descripcion = context.Request("descripcion")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        
        Try
            
            Select Case opcion
                
                Case "0"
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = modFormativa.Listar_ModalidadFormativa(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""CODE_SUNAT"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""ESTADO_ID"" :" & """" & MiDataRow("ESTADO_ID").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("Usuario").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
            
                Case "N"
                    
                    res = crearModFormativa(cod_sunat, descripcion, estado, usuario)
             
                    
                Case "M"
                    
                    res = ActualizarModFormativa(codigo,cod_sunat, descripcion, estado, usuario)
                    
                Case "A"
                    
                    res= CambiarEstadoFinPLaboral(code)
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)
            
        End Try
        
        
    End Sub
    
    Public Function crearModFormativa(ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_ID As String, p_USUA_ID As String) As String
        Dim datos(1) As String
        
        datos = modFormativa.Crear_ModalidadFormativa(p_CODE_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID)
        
        Return datos(0)
        
    End Function
    
    Public Function ActualizarModFormativa(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_ID As String, p_USUA_ID As String) As String
        Dim datos(1) As String
        datos = modFormativa.Actualizar_ModalidadFormativa(p_CODE, p_CODE_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID)
        Return datos(0)
    End Function
    
 
    
    Public Function CambiarEstadoFinPLaboral(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = modFormativa.CambiarEstado_ModalidadFormativa(p_CODE)
        
        Return datos(0)
     
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
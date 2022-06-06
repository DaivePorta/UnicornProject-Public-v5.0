<%@ WebHandler Language="VB" Class="NCMVINC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMVINC : Implements IHttpHandler
    
    Dim code As String
    Dim opcion As String
    
    Dim codigo, cod_sunat, descripcion, estado, usuario, sexo As String
   
    Dim vinc As New Nomade.NC.NCVinculosFamiliares("Bn")
    
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
        sexo = context.Request("sexo")
        
        Try
            Select Case opcion
                
                Case "0"
                    
                    context.Response.ContentType = "application/json; charset=utf-8"
                    
                    dt = vinc.Listar_VinculosFam(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""ESTADO_ID"" :" & """" & MiDataRow("ESTADO_ID").ToString & """,")
                            resb.Append("""GENERO"" :" & """" & MiDataRow("GENERO").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("usuario").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                   
                    
                Case "N"
                    
                    res = CrearVinculosFam(cod_sunat, descripcion, estado, usuario, sexo)
                    
                Case "M"
                    
                    res = ActualizarVinculosFam(codigo, cod_sunat, descripcion, estado, usuario, sexo)
                    
                Case "A"
                    
                    res = CambiarEstadoVinculosFamiliar(code)
                    
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)
            
        End Try
        
        
        
    End Sub
 
    Public Function CrearVinculosFam(ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_ID As String, _
                                     ByVal p_USUA_ID As String, p_GENERO As String) As String
       
        Dim datos(1) As String
        datos = vinc.Crear_VinculosFam(p_CODE_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID, p_GENERO)
        Return datos(0)
        
    End Function
    
    
    Public Function ActualizarVinculosFam(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_ID As String, _
                                     ByVal p_USUA_ID As String, p_GENERO As String) As String
        
        Dim datos(1) As String
        
        datos = vinc.Actualizar_VinculosFam(p_CODE, p_CODE_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID, p_GENERO)
        Return datos(0)
        
    End Function
    
    
    Public Function CambiarEstadoVinculosFamiliar(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = vinc.CambiarEstadoVinculosFamiliar(p_CODE)
        
        Return datos(0)
     
    End Function
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
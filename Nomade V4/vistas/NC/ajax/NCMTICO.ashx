<%@ WebHandler Language="VB" Class="NCMTICO" %>

Imports System
Imports System.Web
Imports System.Data
Public Class NCMTICO : Implements IHttpHandler
    
    Dim codigo, cod_sunat, descripcion, estado, usuario As String
    
    Dim TipContr As New NOMADE.NC.NCTipoContr("Bn")
    
    Dim opcion As String
    Dim code As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
     
        code = context.Request("code")
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
                
                    dt = TipContr.Listar_TipContr(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("codigo").ToString & """,")
                            resb.Append("""CODE_SUNAT"" :" & """" & MiDataRow("codigo_sunat").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("descripcion").ToString & """,")
                            resb.Append("""ESTADO_ID"" :" & """" & MiDataRow("ESTADO_ID").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("usuario").ToString & """")
                            resb.Append("}")
                        Next
                        
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "N"
                    
                    res = CrearTipoContrato(cod_sunat, descripcion, estado, usuario)
                    
                Case "M"
                
                    res = ActualizarContrato(codigo, cod_sunat, descripcion, estado, usuario)
                    
                Case "A"
                    
                    res = CambiarEstadoTipoContrato(code)
                             
                 
            End Select
                           
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
        
    End Sub

    
    Public Function CrearTipoContrato(ByVal p_COD_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As String
        Dim datos(1) As String
        datos = TipContr.Crear_TipContr(p_COD_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID)
        TipContr = Nothing
        Return datos(0)
        
    End Function
    
    Public Function ActualizarContrato(ByVal p_CODE As String, ByVal p_COD_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As String
        
        Dim datos(1) As String
        datos = TipContr.Actualizar_TipContr(p_CODE, p_COD_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID)
        TipContr = Nothing
        Return datos(0)
        
    End Function
 
     
    Public Function CambiarEstadoTipoContrato(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = TipContr.CambiarEstado_TipoContrato(p_CODE)
        
        Return datos(0)
     
    End Function
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
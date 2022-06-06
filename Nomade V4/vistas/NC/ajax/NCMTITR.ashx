<%@ WebHandler Language="VB" Class="NCMTITR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMTITR : Implements IHttpHandler
      
    Dim code As String
    Dim opcion, codigo, cod_sunat, des_tip, estado, usuario As String
    Dim TipoT As New Nomade.NC.NCTipoTR("Bn")
    Dim res As String
    Dim resb As New StringBuilder
  
    Dim dt As DataTable
 
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        
        Try
            
            code = context.Request("CODE")
            opcion = context.Request("opcion")
            
            codigo = context.Request("codigo")
            cod_sunat = context.Request("cod_sunat")
            des_tip = context.Request("des_tip")
            estado = context.Request("estado")
            usuario = context.Request("usuario")

           
            Select Case opcion
           
                Case "0"
                    context.Response.ContentType = "application/json; charset=utf-8"
                
                    dt = TipoT.Listar_tipoTrab(code, String.Empty, String.Empty)
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
                     
                    res = CrearTipT(cod_sunat, des_tip, estado, usuario)
                    
                Case "M"
                    res = ActualizarTipT(codigo, cod_sunat, des_tip, estado, usuario)
                    
                Case "A"
                    
                    res= CambiarEstadoTipT(code)
                   
            End Select
            
            context.Response.Write(res)
                
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
        End Try
              
                     
        
    End Sub
 
    
    Public Function CrearTipT(ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As String
        
        Dim datos(1) As String
        datos = TipoT.Crear_tipoTrab(p_CODE_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID)
        TipoT = Nothing
        Return datos(0)
                       
    End Function
    
    Public Function ActualizarTipT(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As String
       
        Dim datos(1) As String
        datos = TipoT.Actualizar_tipoTrab(p_CODE, p_CODE_SUNAT, p_DESC, p_ESTADO_ID, p_USUA_ID)
        TipoT = Nothing
        Return datos(0)
        
    End Function
     
    Public Function CambiarEstadoTipT(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = TipoT.CambiarEstado_tipoTrab(p_CODE)
        
        Return datos(0)
     
    End Function
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
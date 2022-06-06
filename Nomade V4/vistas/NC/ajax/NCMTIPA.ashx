<%@ WebHandler Language="VB" Class="NCMTIPA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMTIPA : Implements IHttpHandler
    
    Dim opcion As String
    Dim code As String
    
    Dim codigo, cod_sunat, descripcion, nom_corto, estado, usuario As String
    
    Dim tiPago As New Nomade.NC.NCTipoPago("Bn")
    
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        
        opcion = context.Request("opcion")
        code = context.Request("code")
               
        codigo = context.Request("codigo")
        cod_sunat = context.Request("cod_sunat")
        descripcion = context.Request("descripcion")
        nom_corto = context.Request("nom_corto")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        
        
        Try
           
            Select Case opcion
                           
                Case "0"
                                     
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = tiPago.Listar_TiPago(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"":" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""CODE_SUNAT"":" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                            resb.Append("""DESCRIPCION"":" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""Nombre_corto"":" & """" & MiDataRow("Nombre_corto").ToString & """,")
                            resb.Append("""ESTADO_ID"":" & """" & MiDataRow("ESTADO_ID").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("Usuario").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                    
                Case "1"

                    
                Case "N"
                    
                    res = crearTiPago(cod_sunat, descripcion, nom_corto, estado, usuario)
                
                Case "M"
                    
                    res = actualizarTiPago(codigo, cod_sunat, descripcion, nom_corto, estado, usuario)
                    
                Case "A"
                    
                    res= CambiarEstadoTiPago(code)
                                    
            End Select
            
            
            context.Response.Write(res)
            
        Catch ex As Exception
                
            context.Response.Write("error" & ex.ToString)
               
        End Try
        
        
        
    End Sub
 
   
    Public Function crearTiPago(ByVal p_COD_SUNAT As String, ByVal p_DESC As String, ByVal p_NOM_CORTO As String, ByVal p_ESTADO_ID As String, p_USUA_ID As String) As String
        Dim datos(1) As String
        
        datos = tiPago.Crear_TiPago(p_COD_SUNAT, p_DESC, p_NOM_CORTO, p_ESTADO_ID, p_USUA_ID)
        Return datos(0)
        
    End Function
    
    Public Function actualizarTiPago(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_NOM_CORTO As String, ByVal p_ESTADO_ID As String, p_USUA_ID As String) As String
       
        Dim datos(1) As String
        
        datos = tiPago.Actualizar_TiPago(p_CODE, p_CODE_SUNAT, p_DESC, p_NOM_CORTO, p_ESTADO_ID, p_USUA_ID)
        
        tiPago = Nothing
        
        Return datos(0)
    End Function
    
    
    Public Function CambiarEstadoTiPago(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = tiPago.CambiarEstado_TipoPago(p_CODE)
        
        Return datos(0)
     
    End Function
 
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
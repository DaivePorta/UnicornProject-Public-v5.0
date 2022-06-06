<%@ WebHandler Language="VB" Class="NCMPAIS" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMPAIS : Implements IHttpHandler
    
    'variables a usar en el proceso
    
    
    Dim code As String
    
    Dim opcion, cod_pais, cod_sunat, activo, nombre_pais, nombre_corto, usuario As String
    
    Dim dt As DataTable
      
    Dim p As New Nomade.NC.NCPais("Bn")
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
         
        opcion = context.Request("opcion")    
        code = context.Request("CODE")
        
        
        cod_pais = context.Request("codpais")
        cod_sunat = context.Request("codsunat")
        nombre_pais = context.Request("nompais")
        activo = context.Request("activo")
        nombre_corto = context.Request("nomcort")
        usuario = context.Request("usuario")
        
               
        Try
            
            Select Case opcion
                Case "0"
                                        
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.Listar_Pais(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"":" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"":" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                            resb.Append("""ESTADO_ID"":" & """" & MiDataRow("ESTADO_ID").ToString & """,")
                            resb.Append("""NOMBRE_PAIS"":" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""NOMBRE_CORTO"":" & """" & MiDataRow("Descripcion_Corto").ToString & """")
                            
                           
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "N"
                    res = GrabarPais(cod_sunat, nombre_pais, nombre_corto, activo, usuario)
                    
                Case "M"
                    res = ActualizarPais(cod_pais, cod_sunat, nombre_pais, nombre_corto,  activo, usuario)
                Case "A"
                    
                   res=CambiarEstadoPais(code)

            End Select
            
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
    
    
     
    Public Function GrabarPais(cod_sunat As String, nombre_pais As String, nombre_corto As String, activo As String, usuario As String) As String
        Dim datos(1) As String
        
        datos = p.Crear_Pais(cod_sunat, nombre_pais, nombre_corto, activo, usuario)
        p = Nothing
        Return datos(0)
    End Function
    
    Public Function ActualizarPais(cod_pais As String, cod_sunat As String, nombre_pais As String, nombre_corto As String, activo As String, usuario As String) As String
        Dim datos(1) As String
        
        datos = p.Actualizar_Pais(cod_pais, cod_sunat, nombre_pais, nombre_corto, activo, usuario)
        Return datos(0)
    End Function
    
     
    Public Function CambiarEstadoPais(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = p.CambiarEstadoPais(p_CODE)
        
        Return datos(0)
     
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            
            Return False
        End Get
    End Property

End Class
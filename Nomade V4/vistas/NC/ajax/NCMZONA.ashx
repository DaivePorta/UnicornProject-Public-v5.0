<%@ WebHandler Language="VB" Class="NCMZONA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMZONA : Implements IHttpHandler

    Dim code As String
    Dim opcion, codigo, cod_sunat, nom_zona, estado, nombre_corto, usuario As String
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder
    
    
    Dim p As New NOMADE.NC.NCZona("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
          
        opcion = context.Request("opcion")
        code = context.Request("CODE")
        
        codigo = context.Request("codigo")
        cod_sunat = context.Request("cod_sunat")
        nom_zona = context.Request("nom_zona")
        nombre_corto = context.Request("nombre_corto")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        context.Response.ContentType = "text/html"
        
        Try
            Select Case opcion
               
                Case "0"
                                        
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.Listar_Zonas(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"":" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"":" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                            resb.Append("""NOMBRE_ZONA"":" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""NOMBRE_CORTO"":" & """" & MiDataRow("Descripcion_Corto").ToString & """,")
                            resb.Append("""ESTADO_ID"":" & """" & MiDataRow("ESTADO_ID").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "N"
   
                    res = GrabarZona(cod_sunat, nom_zona, nombre_corto, estado, usuario)
                    
                    
                Case "M"
                    
                    res = Actualizar_Zona(codigo, cod_sunat, nom_zona, nombre_corto, estado, usuario)
                    
                Case "A"
                    
                    res=CambiarEstadoZona(code)
                Case Else
                    
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
 
    Public Function GrabarZona(ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_DESC_CORTA As String, ByVal p_ESTADO As String, p_USUA_ID As String) As String
        
        Dim Datos(1) As String
         
        Datos = p.Crear_Zonas(p_CODE_SUNAT, p_DESC, p_DESC_CORTA, p_ESTADO, p_USUA_ID)
        
        Return Datos(0)
     
    End Function
    
    
    Public Function Actualizar_Zona(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_NOMBRE As String, ByVal p_DESC_CORT As String, ByVal p_ESTADO_ID As String, p_USUA_ID As String) As String     
        Dim Datos(1) As String
         
        Datos = p.Actualizar_Zona(p_CODE, p_CODE_SUNAT, p_NOMBRE, p_DESC_CORT, p_ESTADO_ID, p_USUA_ID)
        
        Return Datos(0)
    
    End Function
    
     
    Public Function CambiarEstadoZona(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = p.CambiarEstadoZona(p_CODE)
        
        Return datos(0)
     
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
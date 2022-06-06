º
<%@ WebHandler Language="VB" Class="NCMVIAS" %>
Imports System
Imports System.Web
Imports System.Data


Public Class NCMVIAS : Implements IHttpHandler
        
    
    Dim code As String
    Dim opcion As String
    Dim codigo, cod_sunat, nom_via, activo, nombre_corto, usuario As String
    Dim dt As DataTable
    Dim p As New NOMADE.NC.NCVias("bn")
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
opcion:  'M', codigo: codigo, cod_sunat: cod_sunat, nom_via: nom_via, activo: activo, nombre_corto: nombre_corto, usuario: usuario
               
        opcion = context.Request("opcion")
        code = context.Request("CODE")
        
        codigo = context.Request("codigo")
        cod_sunat = context.Request("cod_sunat")
        nom_via = context.Request("nom_via")
        nombre_corto = context.Request("nombre_corto")
        activo = context.Request("activo")
        usuario = context.Request("usuario")
        context.Response.ContentType = "text/html"
        Try
            
            Select Case opcion
               
                Case "0"
                                        
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.Listar_Vias(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"":" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"":" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                            resb.Append("""NOMBRE_VIA"":" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""NOMBRE_CORTO"":" & """" & MiDataRow("Descripcion_Corto").ToString & """,")
                            resb.Append("""ESTADO_ID"":" & """" & MiDataRow("ESTADO_ID").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "N"
   
                    res = GrabarVia(cod_sunat, nom_via, nombre_corto, activo, usuario)
                    
                Case "M"
                    
                    res = ActualizarVia(codigo, cod_sunat, nom_via, nombre_corto, activo, usuario)
                    
                Case "A"
                    
                    res= CambiarEstadoVias(code)
                    
                Case Else

            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
 
    Public Function GrabarVia(ByVal p_COD_SUNAT As String, ByVal p_NOMBRE_VIA As String, ByVal p_NOMBRE_CORTO As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As String
       
        Dim Datos(1) As String
        Datos = p.Crear_Vias(p_COD_SUNAT, p_NOMBRE_VIA, p_NOMBRE_CORTO, p_ESTADO_ID, p_USUA_ID)
        Return Datos(0)
    
    End Function
    
    Public Function ActualizarVia(ByVal p_CODE As String, ByVal p_COD_SUNAT As String, ByVal p_NOMBRE_VIA As String, ByVal p_NOMBRE_CORTO As String, ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As String
    
        Dim Datos(1) As String
        Datos = p.Actualizar_Vias(p_CODE, p_COD_SUNAT, p_NOMBRE_VIA, p_NOMBRE_CORTO, p_ESTADO_ID, p_USUA_ID)
        Return Datos(0)
        
    End Function
    
     
    Public Function CambiarEstadoVias(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = p.CambiarEstadoVias(p_CODE)
        
        Return datos(0)
     
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
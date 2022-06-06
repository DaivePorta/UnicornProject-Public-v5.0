<%@ WebHandler Language="VB" Class="NMMTEXI" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMMTEXI : Implements IHttpHandler
    
    
    Dim code As String
    Dim opcion As String
    Dim codigo, cod_sunat, descripcion, estado, usuario, almacenable As String
    Dim dt As DataTable
    Dim p As New Nomade.NM.NMTipodeExistencia("bn")
    Dim res As String
    Dim resb As New StringBuilder
    
    
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        opcion = context.Request("opcion")
        code = context.Request("code")
        
        codigo = context.Request("codigo")
        cod_sunat = context.Request("cod_sunat")
        descripcion = context.Request("descripcion")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        almacenable = context.Request("almacenable")
        context.Response.ContentType = "text/html"
        
        
        Try
            Select Case opcion
                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.Listar_Existencias(code, String.Empty, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"":" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                            resb.Append("""DESCRIPCION"":" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""ESTADO"":" & """" & MiDataRow("ESTADO").ToString & """,")
                            resb.Append("""ESTADO_ID"":" & """" & MiDataRow("ESTADO_ID").ToString & """,")
                            resb.Append("""ALMACENABLE_IND"":" & """" & MiDataRow("ALMACENABLE_IND").ToString & """,")
                            resb.Append("""ALMACENABLE"":" & """" & MiDataRow("ALMACENABLE").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                        
                    End If
                    res = resb.ToString()
                    
                Case "C"
                    res = Crear_Existencia(cod_sunat, descripcion, estado, usuario, almacenable )
                    
                    
                Case "AU"
                    res = Actualizar_Existencia(codigo, cod_sunat, descripcion, estado, usuario, almacenable)
                    
                Case "CA"
                    res = CambiarEstadoExistencias(code)
                Case Else
                    
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
            
        End Try
     
    End Sub
 
    Public Function Crear_Existencia(ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_ALMACENABLE As String) As String
       
        Dim Datos(1) As String
        Datos = p.Crear_Existencias(p_CODE_SUNAT, p_DESC, p_ESTADO_IND, p_USUA_ID, p_ALMACENABLE)
        Return Datos(0)
    
    End Function
    
    Public Function Actualizar_Existencia(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String, ByVal p_ALMACENABLE As String) As String
       
        Dim Datos(1) As String
        Datos = p.Actualizar_Existencias(p_CODE, p_CODE_SUNAT, p_DESC, p_ESTADO_IND, p_USUA_ID, p_ALMACENABLE)
        Return Datos(0)
    
    End Function
    
    Public Function CambiarEstadoExistencias(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = p.CambiarEstadoExistencias(p_CODE)
        
        Return datos(0)
     
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class
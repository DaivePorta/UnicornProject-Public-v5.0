<%@ WebHandler Language="VB" Class="NCMZONH" %>

Imports System
Imports System.Web
Imports System.Data


Public Class NCMZONH : Implements IHttpHandler
    
    Dim opcion As String
    Dim code As String
    
    Dim codigo,index, tiempo, NomZona, descripcion, hora, estado, usuario As String
    
    Dim zonaH As New Nomade.NC.NCZonaHoraria("Bn")
    
    Dim dt As DataTable
    Dim res As String
    Dim resb As new StringBuilder
        
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        opcion = context.Request("opcion")
        code = context.Request("CODE")
        
        codigo=context.Request("codigo")        
        index = context.Request("index")
        tiempo = context.Request("tiempo")
        NomZona = context.Request("NomZona")
        descripcion = context.Request("descripcion")
        hora = context.Request("hora")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        
        
        Try
            
            Select Case opcion
                

                Case "0"
                    
                    context.Response.ContentType = "aplicattion/json; charset= utf-8"
                    dt = zonaH.Listar_ZonaHoraria(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""INDEX"" :" & """" & MiDataRow("indicador").ToString & """,")
                            resb.Append("""ZONA"" :" & """" & MiDataRow("zona").ToString & """,")
                            resb.Append("""TIEMPO"" :" & """" & MiDataRow("tiempo").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """,")
                            resb.Append("""ZONA_HORA"" :" & """" & MiDataRow("zona_hora").ToString & """,")
                            resb.Append("""ESTADO_ID"" :" & """" & MiDataRow("Estado").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("Usuario").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                           
                    
                Case "N"
                            res = crear_zonaHoraria(index, NomZona, tiempo, descripcion, hora, estado, usuario)
                    
                Case "M"
                    res = Actualizar_zonaHoraria(codigo, index, NomZona, tiempo, descripcion, hora, estado, usuario)
                    
                Case "A"
                    
                    res = CambiarEstado_ZonaHoraria(code)
                    
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
          
            context.Response.Write("error" & ex.ToString)
        End Try
       
    End Sub
    
    Public Function crear_zonaHoraria(ByVal p_INDEX As String, ByVal p_ZONA_HORA As String, ByVal p_TIME As String, ByVal p_DESC As String, ByVal p_HORA As String, p_ESTADO_ID As String, p_USUA_ID As String) As String
        Dim datos(1) As String
        
        datos = zonaH.Crear_ZonaHoraria(p_INDEX, p_ZONA_HORA, p_TIME, p_DESC, p_HORA, p_ESTADO_ID, p_USUA_ID)
        
        Return datos(0)
    End Function
    
    Public Function Actualizar_zonaHoraria(ByVal p_CODE As String, ByVal p_INDEX As String, ByVal p_ZONA_HORA As String, ByVal p_TIME As String, ByVal p_DESC As String, ByVal p_HORA As String, p_ESTADO_ID As String, p_USUA_ID As String) As String
        Dim datos(1) As String
        
        datos = zonaH.Actualizar_zonaHoraria(p_CODE,p_INDEX, p_ZONA_HORA, p_TIME, p_DESC, p_HORA, p_ESTADO_ID, p_USUA_ID)
        
        Return datos(0)
    End Function
    
     
    Public Function CambiarEstado_ZonaHoraria(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = zonaH.CambiarEstado_ZonaHoraria(p_CODE)
        
        Return datos(0)
     
    End Function
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
<%@ WebHandler Language="VB" Class="NSMSIST" %>

Imports System
Imports System.Web

Imports System.Data


Public Class NSMSIST : Implements IHttpHandler
  
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NS.NSSistema("Bn")
    Dim res As String
    Dim codigo, nombre, acronimo, activo, user, codrec, descripcion, icono, tipo As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        codrec = context.Request.QueryString("codigo")
        
        'ASIGNACION DE VARIABLES CAPTURADAS 
        
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        nombre = context.Request("nomb")
        acronimo = context.Request("acro")
        descripcion = context.Request("desc")
        user = context.Request("user")
        activo = context.Request("acti")
        icono = context.Request("icon")
        tipo = context.Request("tipo")
        
                
        'FIN
        
        If codrec <> String.Empty Then
            flag = "C"
        End If
        
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    
                    res = CrearSistema(codigo, nombre, icono, acronimo, descripcion, activo, user, tipo)
                    
                Case "2"
                    
                    res = ActualizarSistema(codigo, nombre, icono, acronimo, descripcion, activo, user, tipo)
                    
                Case "3"
                          
                    res = CambiarEstadoSistema(codigo)
                    
                Case "4"
                          
                    dt = p.ListarSistema(String.Empty, String.Empty)
                    res = String.Empty
                    If Not dt Is Nothing Then
                        For i As Integer = 0 To dt.Rows.Count - 1
                            res += dt.Rows(i)("CODIGO")
                        Next
                    
                    Else : res = "error"
                    End If
                Case "C"
                          
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarSistema(codrec, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""NOMBRE"" :" & """" & dt.Rows(0)("NOMBRE") & """,")
                    resb.Append("""ICONO"" :" & """" & dt.Rows(0)("ICONO") & """,")
                    resb.Append("""ACRONIMO"" :" & """" & dt.Rows(0)("ACRONIMO") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION").ToString().Replace(vbCrLf, "\n").Replace("""", "\""") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    resb.Append("""TIPO_IND"" :" & """" & dt.Rows(0)("TIPO_IND").ToString & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                
                 
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
        
    End Sub
 
    Public Function CrearSistema(ByVal p_codigo As String, ByVal p_nombre As String, ByVal p_icono As String, ByVal p_acronimo As String, ByVal p_descripcion As String, ByVal p_activo As String, _
                                       ByVal p_user As String, ByVal p_tipo_ind As String) As String
        Dim datos As String
        
        datos = p.CrearSistema(p_codigo, p_icono, p_nombre, p_acronimo, p_descripcion, p_activo, p_user, p_tipo_ind)
              
        Return datos
       
    End Function
    
    
    
    Public Function CambiarEstadoSistema(ByVal p_codigo As String) As String
        
        Dim datos As String
        
        datos = p.CambiarEstadoSistema(p_codigo)
        
        Return datos
        
    End Function
    
    
    Public Function ActualizarSistema(ByVal p_codigo As String, _
                                      ByVal p_nombre As String, ByVal p_icono As String, ByVal p_acronimo As String, ByVal p_descripcion As String, ByVal p_activo As String, _
                                      ByVal p_user As String, ByVal p_tipo_ind As String) As String
        Dim datos As String
        
        datos = p.ActualizarSistema(p_codigo, p_icono, p_nombre, p_acronimo, p_descripcion, p_activo, p_user, p_tipo_ind)
        
        Return datos
        
    End Function
        
        
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
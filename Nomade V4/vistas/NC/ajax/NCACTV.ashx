<%@ WebHandler Language="VB" Class="NCACTV" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCACTV : Implements IHttpHandler
    
  
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCActividad("Bn")
    Dim res As String
    Dim codigo, codigosunat, nombre, nombrepropio, activo, user, codrec, descripcion As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        codrec = context.Request.QueryString("codigo")
        
        'ASIGNACION DE VARIABLES CAPTURADAS 
        
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        codigosunat = context.Request("cosu")
        nombre = context.Request("nomb")
        nombrepropio = context.Request("nopo")
        descripcion = context.Request("desc")
        user = context.Request("user")
        activo = context.Request("acti")
                
        'FIN
        
        If codrec <> String.Empty Then
            flag = "C"
        End If
        
            
        Select Case flag.ToString
                
            Case "1"
                    
                res = CrearActividad(codigosunat, nombre, nombrepropio, descripcion, activo, user)
                    
            Case "2"
                    
                res = ActualizarActividad(codigo, codigosunat, nombre, nombrepropio, descripcion, activo, user)
                    
            Case "3"
                          
                res = CambiarEstadoActividad(codigo)
                    
            Case Else
                          
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.ListarActividad(codrec, String.Empty)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("CODIGO_SUNAT") & """,")
                resb.Append("""NOMBRE"" :" & """" & dt.Rows(0)("NOMBRE") & """,")
                resb.Append("""NOMBRE_PROPIO"" :" & """" & dt.Rows(0)("NOMBRE_PROPIO") & """,")
                resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION").ToString().Replace(vbCrLf, "\n").Replace("""", "\""") & """,")
                resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
                
                 
        End Select
            
        context.Response.Write(res)
    
    End Sub
 
    Public Function CrearActividad(ByVal p_codigosunat As String, _
                                       ByVal p_nombre As String, ByVal p_nombrepropio As String, ByVal p_descripcion As String, ByVal p_activo As String, _
                                       ByVal p_user As String) As String
        Dim datos As String
        
        datos = p.CrearActividad(p_codigosunat, p_nombre, p_nombrepropio, p_descripcion, p_activo, p_user)
              
        Return datos
       
    End Function
    
    
    
    Public Function CambiarEstadoActividad(ByVal p_codigo As String) As String
        
        Dim datos As String
        
        datos = p.CambiarEstadoActividad(p_codigo)
        
        Return datos
        
    End Function
    
    
     Public Function ActualizarActividad(ByVal p_codigo As String, ByVal p_codigosunat As String, _
                                       ByVal p_nombre As String, ByVal p_nombrepropio As String, ByVal p_descripcion As String, ByVal p_activo As String, _
                                       ByVal p_user As String) As String
        Dim datos As String
        
        datos = p.ActualizarActividad(p_codigo, p_codigosunat, p_nombre, p_nombrepropio, p_descripcion, p_activo, p_user)
        
        Return datos
        
    End Function
        
        
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
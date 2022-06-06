<%@ WebHandler Language="VB" Class="NCTITV" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCTITV : Implements IHttpHandler
    
 
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCTipoTV("Bn")
    Dim res As String
    Dim codigo, codigosunat, descripcion, abreviatura, activo, user, codrec As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        codrec = context.Request.QueryString("codigo")
        
        'ASIGNACION DE VARIABLES CAPTURADAS 
        
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        codigosunat = context.Request("cosu")
        descripcion = context.Request("desc")
        abreviatura = context.Request("abre")
      
        user = context.Request("user")
        activo = context.Request("acti")
                
        'FIN
        
        If codrec <> String.Empty Then
            flag = "C"
        End If
        
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    
                    res = CrearTipoTV(codigosunat, descripcion, abreviatura, activo, user)
                    
                Case "2"
                    
                    res = ActualizarTipoTV(codigo, codigosunat, descripcion, abreviatura, activo, user)
                    
                Case "3"
                          
                    res = CambiarEstadoTipoTV(codigo)
                    
                Case Else
                          
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarTipoTV(codrec, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("CODIGO_SUNAT") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""ABREVIATURA"" :" & """" & dt.Rows(0)("ABREVIATURA") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                
                 
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
                
        
        
        
    End Sub
 
    Public Function CrearTipoTV(ByVal p_codigosunat As String, _
                                       ByVal p_descripcion As String, ByVal p_abreviatura As String, ByVal p_activo As String, _
                                       ByVal p_user As String) As String
        Dim datos As String
        
        datos = p.CrearTipoTV(p_codigosunat, p_descripcion, p_abreviatura, p_activo, p_user)
              
        Return datos
       
    End Function
    
    
    
    Public Function CambiarEstadoTipoTV(ByVal p_codigo As String) As String
        
        Dim datos As String
        
        datos = p.CambiarEstadoTipoTV(p_codigo)
        
        Return datos
        
    End Function
    
    
    Public Function ActualizarTipoTV(ByVal p_codigo As String, ByVal p_codigosunat As String, _
                                      ByVal p_descripcion As String, ByVal p_abreviatura As String, ByVal p_activo As String, _
                                      ByVal p_user As String) As String
        Dim datos As String
        
        datos = p.ActualizarTipoTV(p_codigo, p_codigosunat, p_descripcion, p_abreviatura, p_activo, p_user)
        
        Return datos
        
    End Function
        
        
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
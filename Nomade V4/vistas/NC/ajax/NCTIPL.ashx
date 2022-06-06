<%@ WebHandler Language="VB" Class="NCTIPL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCTIPL : Implements IHttpHandler
    
  
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCTipoPlan("Bn")
    Dim res As String
    Dim codigo, codigosunat, abrev, descripcioncorta, activo, user, codrec, descripcion As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        codrec = context.Request.QueryString("codigo")
        
        'ASIGNACION DE VARIABLES CAPTURADAS 
        
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        codigosunat = context.Request("cosu")
        abrev = context.Request("abre")
        descripcioncorta = context.Request("deco")
        descripcion = context.Request("desc")
        user = context.Request("user")
        activo = context.Request("acti")
                
        'FIN
        
        If codrec <> String.Empty Then
            flag = "C"
        End If
        
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    
                    res = CrearTipoPlan(descripcion, descripcioncorta, activo, user, abrev, codigosunat)
                    
                Case "2"
                    
                    res = ActualizarTipoPlan(codigo, descripcion, descripcioncorta, activo, user, abrev, codigosunat)
                    
                Case "3"
                          
                    res = CambiarEstadoTipoPlan(codigo)
                    
                Case Else
                          
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.Listar_TipoPlan(codrec, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("CODIGO_SUNAT") & """,")
                    resb.Append("""ABREV"" :" & """" & dt.Rows(0)("ABREV") & """,")
                    resb.Append("""DESCRIPCION_CORTA"" :" & """" & dt.Rows(0)("DESCRIPCION_CORTA") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
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
 
    Public Function CrearTipoPlan( ByVal p_descripcion As String, _
                                       ByVal p_descripcioncorta As String, ByVal p_activo As String, ByVal p_user As String, ByVal p_abrev As String, _
                                       ByVal p_codigosunat As String) As String
        Dim datos As String
        
        datos = p.CrearTipoPlan(p_descripcion, p_descripcioncorta, p_activo, p_user, p_abrev, p_codigosunat)
              
        Return datos
       
    End Function
    
    
    
    Public Function CambiarEstadoTipoPlan(ByVal p_codigo As String) As String
        
        Dim datos As String
        
        datos = p.CambiarEstadoTipoPlan(p_codigo)
        
        Return datos
        
    End Function
    
    
    Public Function ActualizarTipoPlan(ByVal p_codigo As String, ByVal p_descripcion As String, _
                                      ByVal p_descripcioncorta As String, ByVal p_activo As String, ByVal p_user As String, ByVal p_abrev As String, _
                                      ByVal p_codigosunat As String) As String
        Dim datos As String
        
        datos = p.ActualizarTipoPlan(p_codigo, p_descripcion, p_descripcioncorta, p_activo, p_user, p_abrev, p_codigosunat)
        
        Return datos
        
    End Function
        
        
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
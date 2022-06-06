<%@ WebHandler Language="VB" Class="NCTIES" %>

Imports System
Imports System.Web
Imports System.Data


Public Class NCTIES : Implements IHttpHandler
    
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCEstablecimientos("Bn")
    Dim res As String
    Dim codigo, codisunat, nombretipo, nombrecorto, activo, user, codrec As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        codrec = context.Request.QueryString("codigo")
        
        'ASIGNACION DE VARIABLES CAPTURADAS 
        
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        codisunat = context.Request("cosu")
        nombretipo = context.Request("nomb")
        nombrecorto = context.Request("noco")
        activo = context.Request("acti")
        user = context.Request("user")
                
        'FIN
        
        If codrec <> String.Empty Then
            flag = "C"
        End If
        
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    
                    res = CrearEstablecimiento(codisunat, nombretipo, nombrecorto, activo, user)
                    
                Case "2"
                    
                    res = ActualizarEstablecimiento(codigo, codisunat, nombretipo, nombrecorto, activo, user)
                    
                Case "3"
                          
                    res = CambiarEstadoEstablecimiento(codigo)
                    
                Case Else
                          
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarEstablecimiento(codrec, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""CODIGOSUNAT"" :" & """" & dt.Rows(0)("CODIGOSUNAT") & """,")
                    resb.Append("""TIPO"" :" & """" & dt.Rows(0)("TIPO") & """,")
                    resb.Append("""CORTO"" :" & """" & dt.Rows(0)("CORTO") & """,")
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
 
    Public Function CrearEstablecimiento(ByVal p_codisunat As String, ByVal p_nombretipo As String, _
                                       ByVal p_nombrecorto As String, ByVal p_activo As String, _
                                       ByVal p_user As String) As String
        Dim datos As String
        
        datos = p.CrearEstablecimiento(p_codisunat, p_nombretipo, p_nombrecorto, p_activo, p_user)
              
        Return datos
       
    End Function
    
    
    
    Public Function CambiarEstadoEstablecimiento(ByVal p_codigo As String) As String
        
        Dim datos As String
        
        datos = p.CambiarEstadoEstablecimiento(p_codigo)
        
        Return datos
        
    End Function
    
    
     Public Function ActualizarEstablecimiento(ByVal p_codigo As String, ByVal p_codisunat As String, ByVal p_nombretipo As String, _
                                       ByVal p_nombrecorto As String, ByVal p_activo As String, _
                                       ByVal p_user As String) As String
        
        Dim datos As String
        
        datos = p.ActualizarEstablecimiento(p_codigo, p_codisunat, p_nombretipo, p_nombrecorto, p_activo, p_user)
        
        Return datos
        
    End Function
        
        
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
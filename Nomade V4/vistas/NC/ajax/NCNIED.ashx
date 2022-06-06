<%@ WebHandler Language="VB" Class="NCNIED" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCNIED : Implements IHttpHandler
    
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCNivelEducativo("Bn")
    Dim res As String
    Dim codigo, codigosunat, niveleducativo, nombrecorto, activo, user, codrec, maquina, nivel As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        codrec = context.Request.QueryString("codigo")
        
        'ASIGNACION DE VARIABLES CAPTURADAS 
        
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        codigosunat = context.Request("cosu")
        niveleducativo = context.Request("nomb")
        nombrecorto = context.Request("noco")
        nivel = context.Request("nive")
        user = context.Request("user")
        activo = context.Request("acti")
                
        'FIN
        
        If codrec <> String.Empty Then
            flag = "C"
        End If
        
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    
                    res = CrearNivelEducativo(codigosunat, niveleducativo, nombrecorto, nivel, activo, user)
                    
                Case "2"
                    
                    res = ActualizarNivelEducativo(codigo, codigosunat, niveleducativo, nombrecorto, nivel, activo, user)
                    
                Case "3"
                          
                    res = CambiarEstadoNivelEducativo(codigo)
                    
                Case Else
                          
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarNivelEducativo(codrec, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("CODIGO_SUNAT") & """,")
                    resb.Append("""NOMBRE"" :" & """" & dt.Rows(0)("NOMBRE") & """,")
                    resb.Append("""NOMBRE_CORTO"" :" & """" & dt.Rows(0)("NOMBRE_CORTO") & """,")
                    resb.Append("""NIVEL"" :" & """" & dt.Rows(0)("NIVEL") & """,")
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
 
    Public Function CrearNivelEducativo( ByVal p_codigosunat As String, _
                                       ByVal p_niveleducativo As String, ByVal p_nombrecorto As String, ByVal p_nivel As String, ByVal p_activo As String, _
                                       ByVal p_user As String) As String
        Dim datos As String
        
        datos = p.CrearNivelEducativo(p_codigosunat, p_niveleducativo, p_nombrecorto, p_nivel, p_activo, p_user)
              
        Return datos
       
    End Function
    
    
    
    Public Function CambiarEstadoNivelEducativo(ByVal p_codigo As String) As String
        
        Dim datos As String
        
        datos = p.CambiarEstadoNivelEducativo(p_codigo)
        
        Return datos
        
    End Function
    
    
     Public Function ActualizarNivelEducativo(ByVal p_codigo As String, ByVal p_codigosunat As String, _
                                       ByVal p_niveleducativo As String, ByVal p_nombrecorto As String, ByVal p_nivel As String, ByVal p_activo As String, _
                                       ByVal p_user As String) As String
        Dim datos As String
        
        datos = p.ActualizarNivelEducativo(p_codigo, p_codigosunat, p_niveleducativo, p_nombrecorto, p_nivel, p_activo, p_user)
        
        Return datos
        
    End Function
        
        
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
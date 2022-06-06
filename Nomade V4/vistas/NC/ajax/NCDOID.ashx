<%@ WebHandler Language="VB" Class="NCDOID" %>
Imports System.Data
Imports System
Imports System.Web

Public Class NCDOID : Implements IHttpHandler
    
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New NOMADE.NC.NCDocumentoIdentidad("Bn")
    Dim res As String
    Dim codigo, desc, desc_corta, codigo_sunat, activo, user, codrec, orden, muestra As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       
        codrec = context.Request.QueryString("codigo")
        
        'ASIGNACION DE VARIABLES CAPTURADAS 
        
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        orden = context.Request("orde")
        desc = context.Request("desc")
        desc_corta = context.Request("deco")
        codigo_sunat = context.Request("cosu")
        muestra = context.Request("mues")
        user = context.Request("user")
        activo = context.Request("acti")
        

        
        'FIN
        
        If codrec <> String.Empty Then
            flag = "C"
        End If
        
        Select Case flag.ToString
                
            Case "1"
                    
                res = CrearDocumento_Identidad(orden, desc, desc_corta, codigo_sunat, activo, user, muestra)
                    
            Case "2"
                    
                res = ActualizarDocumento_Identidad(codigo, orden, desc, desc_corta, codigo_sunat, activo, user, muestra)
                    
            Case "3"
                          
                res = CambiarEstadoDocumento_Identidad(codigo)
                    
            Case Else
                          
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.ListarDOCUMENTOS_IDENTIDAD(codrec, String.Empty, String.Empty)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                resb.Append("""DESC"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                resb.Append("""DESC_CORTA"" :" & """" & dt.Rows(0)("DESC_CORTA") & """,")
                resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("CODIGO_SUNAT") & """,")
                resb.Append("""ORDEN"" :" & """" & dt.Rows(0)("ORDEN") & """,")
                resb.Append("""MUESTRA"" :" & """" & dt.Rows(0)("MUESTRA") & """,")
                resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
                
                 
        End Select
            
        context.Response.Write(res)
            
            
              
        
    End Sub
 
    Public Function CrearDocumento_Identidad(ByVal p_orden As String, ByVal p_desc As String, _
                                       ByVal p_desc_corta As String, ByVal p_codigo_sunat As String, ByVal p_activo As String, ByVal p_user As String, _
                                       ByVal p_muestra As String) As String
        Dim datos As String
        
        datos = p.CrearDOCUMENTOS_IDENTIDAD(p_orden, p_desc, p_desc_corta, p_codigo_sunat, p_activo, p_user, p_muestra)
              
        Return datos
       
    End Function
    
    
    
    Public Function CambiarEstadoDocumento_Identidad(ByVal p_codigo As String) As String
        
        Dim datos As String
        
        datos = p.CambiarEstadoDOCUMENTOS_IDENTIDAD(p_codigo)
        
        Return datos
        
    End Function
    
    
    Public Function ActualizarDocumento_Identidad(ByVal p_codigo As String, ByVal p_orden As String, ByVal p_desc As String, _
                                      ByVal p_desc_corta As String, ByVal p_codigo_sunat As String, ByVal p_activo As String, ByVal p_user As String, _
                                      ByVal p_muestra As String) As String
        
        Dim datos As String
        
        datos = p.ActualizarDOCUMENTOS_IDENTIDAD(p_codigo, p_orden, p_desc, p_desc_corta, p_codigo_sunat, p_activo, p_user, p_muestra)
        
        Return datos
        
    End Function
        
        
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
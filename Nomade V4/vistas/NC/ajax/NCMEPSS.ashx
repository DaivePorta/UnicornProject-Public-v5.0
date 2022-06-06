<%@ WebHandler Language="VB" Class="NCMEPSS" %>

Imports System
Imports System.Web
Imports System.Data



Public Class NCMEPSS : Implements IHttpHandler
    
    Dim opcion As String
    Dim code As String
    
    Dim codigo, cod_sunat, descripcion, estado, opcionSit, usuario As String
    
    Dim sitEps As New NOMADE.NC.NCSituacionEPS("Bn")
    Dim res As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        
        code = context.Request("CODE")
        opcion = context.Request("opcion")
        
        codigo = context.Request("codigo")
        cod_sunat = context.Request("cod_sunat")
        descripcion = context.Request("descripcion")
        estado = context.Request("estado")
        opcionSit = context.Request("opcionSit")
        usuario = context.Request("usuario")
        Try
            Select Case opcion
            
                Case "0"
              
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = sitEps.Listar_SituacionEPS(code, String.Empty, String.Empty, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE"" :" & """" & dt.Rows(0)("Codigo") & """,")
                    resb.Append("""CODE_SUNAT"" :" & """" & dt.Rows(0)("Codigo_Sunat") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("Descripcion") & """,")
                    resb.Append("""OPCION_ID"" :" & """" & dt.Rows(0)("OPCION_ID") & """,")
                    resb.Append("""ESTADO_ID"" :" & """" & dt.Rows(0)("ESTADO_ID") & """,")
                    resb.Append("""USUA_ID"" :" & """" & dt.Rows(0)("Usuario") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()
                
                Case "N"
                
                    res = Crear_SituacionEPS(cod_sunat, descripcion, opcionSit, estado, usuario)
                
                    
                Case "M"
                    
                    res = Actualizar_SituacionEPS(codigo, cod_sunat, descripcion, opcionSit, estado, usuario)
                    
                Case "A"
                    
                    res = sitEps.CambiarEstado_SituacionEPS(code)
                
            End Select
        
        
            context.Response.Write(res)
            
        Catch ex As Exception
      
            context.Response.Write("error" & res.ToString)
            
        End Try
        
    
    End Sub
 
    Public Function Crear_SituacionEPS(ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_OPCION As String, _
    ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As String
    
        Dim datos(1) As String
        
        datos = sitEps.Crear_SituacionEPS(p_CODE_SUNAT, p_DESC, p_OPCION, p_ESTADO_ID, p_USUA_ID)
        
        Return datos(0)
        
    End Function
    
    
    Public Function Actualizar_SituacionEPS(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_DESC As String, ByVal p_TIP_ID As String, _
    ByVal p_ESTADO_ID As String, ByVal p_USUA_ID As String) As String
        
        Dim datos(1) As String
        
        datos = sitEps.Actualizar_SituacionEPS(p_CODE, p_CODE_SUNAT, p_DESC, p_TIP_ID, p_ESTADO_ID, p_USUA_ID)
        
        Return datos(0)
        
    End Function
     
    Public Function CambiarEstado_SituacionEPS(ByVal p_CODE As String) As String
       
        Dim datos As String
        
        datos = sitEps.CambiarEstado_SituacionEPS(p_CODE)
        
        Return datos
     
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
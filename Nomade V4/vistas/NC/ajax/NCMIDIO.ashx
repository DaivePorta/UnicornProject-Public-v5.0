<%@ WebHandler Language="VB" Class="NCMIDIO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMIDIO : Implements IHttpHandler
          
    Dim code As String
    
    Dim opcion, codIdioma, idioma, estado, nombreCorto, usuario As String
    
    Dim dt As DataTable
  
    Dim P As New Nomade.NC.NCIdioma("Bn")
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        opcion = context.Request("opcion")
        code = context.Request("CODE")
        
        codIdioma = context.Request("codIdioma")
        idioma = context.Request("idioma")
        nombreCorto = context.Request("nombreCorto")
        estado = context.Request("estado")
        usuario = context.Request("usuario")
        
                
        Try
            Select Case opcion
                
                Case "0"
                    context.Response.ContentType = "application/json; charset=utf-8"
                
                    dt = P.ListarIdioma(code, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("Codigo").ToString & """,")
                            resb.Append("""NOMBRE_IDIOMA"" :" & """" & MiDataRow("descripcion").ToString & """,")
                            resb.Append("""NOMBRE_CORTO"" :" & """" & MiDataRow("nom_corto").ToString & """,")
                            resb.Append("""ESTADO_ID"" :" & """" & MiDataRow("ESTADO_ID").ToString & """,")
                            resb.Append("""USUA_ID"" :" & """" & MiDataRow("usuario").ToString & """")
                            resb.Append("}")
                        Next
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "N"
                    
                    res = CrearIdioma(idioma, nombreCorto, estado, usuario)
                    
                Case "M"
                    res = ActualizarIdioma(codIdioma, idioma, nombreCorto, estado, usuario)
                    
                Case "A"
                    res= CambiarEstadoIdioma(code)
                    
            End Select
            
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
                                
    Public Function CrearIdioma(ByVal p_IDIOMA As String, ByVal p_NOM_CORTO As String, ByVal p_ESTADO As String, ByVal p_USUARIO As String) As String
        Dim datos(1) As String
        datos = P.CrearIdioma(p_IDIOMA, p_NOM_CORTO, p_ESTADO, p_USUARIO)
        P = Nothing
        Return datos(0)
        
    End Function
    
    Public Function ActualizarIdioma(ByVal p_CODE As String, ByVal p_IDIOMA As String, ByVal p_NOM_CORTO As String, ByVal p_ESTADO As String, p_USUARIO As String) As String
        Dim datos(1) As String
        datos = P.ActualizarIdioma(p_CODE, p_IDIOMA, p_NOM_CORTO, p_ESTADO, p_USUARIO)
        Return datos(0)
        
    End Function
    
     
    Public Function CambiarEstadoIdioma(ByVal p_CODE As String) As String
       
        Dim datos(1) As String
        
        datos = p.CambiarEstadoIdioma(p_CODE)
        
        Return datos(0)
     
    End Function
 
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
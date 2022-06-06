<%@ WebHandler Language="VB" Class="NAMTIAL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NAMTIAL : Implements IHttpHandler
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NA.NATipoAlmacen("Bn")
    Dim res As String
    Dim codigo, activo, user As String
    Dim resb As New StringBuilder
  
    Dim descripcion As String
    Dim venta As String

    Dim nombre As String

    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       

        
        'ASIGNACION DE VARIABLES CAPTURADAS 
        
        flag = context.Request("flag")
        
        codigo = context.Request("codi")
        nombre = context.Request("nom")
        venta = context.Request("vent")
        activo = context.Request("acti")
        user = context.Request("user")
        descripcion = context.Request("desc")
      
        
        'FIN
        

        Try
            
            Select Case flag.ToString
                
                Case "1"
                    
                    res = p.CrearTipoAlmacen(descripcion, nombre, venta, activo, user)
                    
                Case "2"
                    
                    res = p.ActualizarTipoAlmacen(codigo, descripcion, nombre, venta, activo, user)
                    
                Case "3"
                          
              
                    
                Case "4"
                          
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarTipoAlmacen(codigo, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION").ToString().Replace(vbCrLf, "\n").Replace("""", "\""").Replace(",", ",,") & """,")
                    resb.Append("""NOMBRE"" :" & """" & dt.Rows(0)("NOMBRE") & """,")
                    resb.Append("""VENTA_IND"" :" & """" & dt.Rows(0)("VENTA_IND") & """,")
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
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
<%@ WebHandler Language="VB" Class="NKMSGCL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NKMSGCL : Implements IHttpHandler
    
    Dim segment As New Nomade.NC.NCSucursalClienteProveedor("BN")
    Dim opcion As String
    Dim tipo, empresa, descripcion, estado, codigo As String
    Dim res As String
    Dim usuario As String
    Dim dt As DataTable
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        
        usuario = context.User.Identity.Name
        empresa = context.Request("empresa")
        descripcion = context.Request("descripcion")
        tipo = context.Request("tipo")
        codigo = context.Request("codigo")
        estado = context.Request("estado")
        opcion = context.Request("opcion")
        
        Try
        
            Select opcion
                Case "1"
                    res = segment.CrearSegmentacionEstable(empresa, descripcion, tipo, codigo, "A", usuario)
                Case "2"
                    res = segment.ActualizarSegmentacionEstable(codigo, empresa, descripcion, estado, usuario)
                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = segment.ListarSegmentacionEstablecimiento(tipo, codigo, empresa, String.Empty)
                    If Not dt Is Nothing Then
                        res = Utilities.DataTableToJSON(dt)
                    Else
                        res = "[]"
                    End If
                    
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
<%@ WebHandler Language="VB" Class="NSMSIST" %>

Imports System
Imports System.Web

Imports System.Data

'PERMISOS

Public Class NSMSIST : Implements IHttpHandler, System.Web.SessionState.IRequiresSessionState
  
    Dim flag As String
    
    Dim dt As DataTable
    Dim p As New Nomade.NS.NSPermisos("Bn")
    Dim res As String
    Dim user, empresa, forma As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       

        empresa = context.Session("Empresa")
        user = context.User.Identity.Name
        forma = context.Request("forma")
                
        'FIN

        
        Try
            

                          
            dt = p.ObtenerPermiso(forma, user, context.Session("empresa"))
            res = String.Empty
            If Not dt Is Nothing Then
                For i As Integer = 0 To dt.Rows.Count - 1
                    res += dt.Rows(i)("PERMISO")
                Next
                    
            Else : res = "error"
            End If
               
                 
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
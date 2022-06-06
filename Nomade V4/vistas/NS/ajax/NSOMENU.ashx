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
    Dim user, empresa As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
       

        empresa = context.Session("Empresa")
        user = context.User.Identity.Name
        context.Response.ContentType = "application/json; charset=utf-8"
        'FIN

        Try
                 
            dt = p.ObtenerMenu(user, empresa)
            res = String.Empty
            If Not dt Is Nothing Then
                resb.Append("[")
                For i As Integer = 0 To dt.Rows.Count - 1
                                   
                    resb.Append("{")
                    resb.Append("""ITEM"" :" & """" & dt.Rows(i)("ITEM").ToString & """")
                    resb.Append("},")
                Next
                resb.Append("{}")
                resb = resb.Replace(",{}", String.Empty)
                resb.Append("]")
                res = resb.ToString
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
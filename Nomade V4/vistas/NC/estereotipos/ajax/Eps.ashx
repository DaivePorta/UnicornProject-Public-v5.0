<%@ WebHandler Language="VB" Class="Eps" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Eps : Implements IHttpHandler
    
    Dim flag As String
    
    Dim dt As DataTable
    ' Dim p As New Nomade.NC("Bn")
    Dim res, usuario As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
   
        flag = context.Request("flag")
        usuario=context.Request("usua")
        
        
        Try
            
            Select Case flag.ToString

                    
                Case "4"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    res = GenerarSelect(dt, "slcEmpresaeps", "codigo", "descripcion", "EMPRESA")

                Case "5"
                    Dim p As New Nomade.NC.NCSituacionEPS("BN")
                    dt = p.Listar_SituacionEPS(String.Empty, String.Empty, String.Empty, "A")
                    res = GenerarSelect(dt, "slceps", "codigo", "descripcion", "EPS")

                    
            End Select
            
            context.Response.Write(res)
            
            
        Catch ex As Exception
            
            context.Response.Write("error" & ex.ToString)
            
        End Try
        
        
        
    End Sub
 
    
    Public Function GenerarSelect(ByVal dt As DataTable, ByVal id As String, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
            res = "<select class=""span12"" id=""" & id & """>"
            res += "<option></option>"
            If clase = "EPS" Then
                For i As Integer = 0 To dt.Rows.Count - 1
                    res += "<option codsunat=""" & dt.Rows(i)("codigo_sunat").ToString() & """value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Next
                
            Else
            
                For i As Integer = 0 To dt.Rows.Count - 1
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Next
            End If
            res += "</select>"
        Else
            res = "error"
        End If
            Return res
    End Function

    
    
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
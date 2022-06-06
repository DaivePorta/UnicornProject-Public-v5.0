<%@ WebHandler Language="VB" Class="Afp" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Afp : Implements IHttpHandler
    
    Dim flag As String
    
    Dim dt As DataTable
    ' Dim p As New Nomade.NC("Bn")
    Dim res, pidm, estado, usuario, codigo, fecha_inicio, fecha_fin, usua As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
   
        flag = context.Request("flag")
        codigo = context.Request("codigo")
        usua = context.Request("usua")
        estado = context.Request("acti")
        usuario = context.Request("user")
        pidm = context.Request("pidm")
        fecha_inicio = context.Request("fein")
        fecha_fin = context.Request("fefi")
        
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    Dim p As New NOMADE.NC.NCAfp("BN")
                    res = p.CrearAfp(pidm, 0, 0, estado, usuario, fecha_inicio, fecha_fin)
                    
                Case "2"
                    Dim p As New NOMADE.NC.NCAfp("BN")
                    res = p.ActualizarAfp(codigo, pidm, 0, 0, estado, usuario, fecha_inicio, fecha_fin)
                    
                Case "4"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    res = GenerarSelect(dt, "slcEmpresaafp", "codigo", "descripcion", "EMPRESA")
                
                
                Case "5"
                    Dim p As New Nomade.NC.NCAfp("BN")
                    dt = p.ListarAfp(String.Empty, 0, "A")
                    res = GenerarSelect(dt, "slcafp", "codigo", "descripcion", "AFP")
                    
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
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next
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
<%@ WebHandler Language="VB" Class="Banco" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Banco : Implements IHttpHandler
    
    Dim flag As String
    
    Dim dt As DataTable
    ' Dim p As New Nomade.NC("Bn")
    Dim res, codigo, desc, fecha_inicio, fecha_fin, pidm, estado, usuario, nombre, usua As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
   
        flag = context.Request("flag")
        codigo = context.Request("codigo")
        desc = context.Request("desc")
        estado = context.Request("acti")
        usuario = context.Request("user")
        pidm = context.Request("pidm")
        fecha_inicio = context.Request("fein")
        fecha_fin = context.Request("fefi")
        nombre = context.Request("nomb")
        usua=context.Request("usua")
        Try
            
            Select Case flag.ToString
                
                Case "1"
                    Dim p As New NOMADE.NC.NCBanco("BN")
                    res = p.CrearBanco(codigo, desc, fecha_inicio, fecha_fin, pidm, nombre, estado, usuario)
                    
                Case "2"
                    Dim p As New Nomade.NC.NCBanco("BN")
                    res = p.ActualizarBanco(codigo, codigo, desc, fecha_inicio, fecha_fin, pidm, nombre, estado, usuario)
                    
                Case "4"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    res = GenerarSelect(dt, "slcEmpresabanc", "codigo", "descripcion", "EMPRESA")
                    
                Case "5"
                    Dim p As New Nomade.NC.NCBanco("BN")
                    dt = p.ListarBanco(String.Empty, "A")
                    res = GenerarSelect(dt, "slcbancbanc", "banco", "descripcion", "BANCO")
                    

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
            
            If clase = "BANCO" Then
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
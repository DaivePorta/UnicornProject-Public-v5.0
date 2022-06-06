<%@ WebHandler Language="VB" Class="NFMPERI" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NFMPERI : Implements IHttpHandler
    
    Dim OPCION, p_CTLG_CODE, p_ANIO As String
    Dim CODE As String
    
    Dim dt As DataTable
    Dim NFPeriodo As New Nomade.NF.NFPeriodo("")
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        CODE = context.Request("CODE")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_ANIO = context.Request("p_ANIO")
        Select Case OPCION
            Case "L" ' lista PERIODOS
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = NFPeriodo.Listar_Periodo("", p_ANIO, p_CTLG_CODE)
                If Not dt Is Nothing Then
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If
            Case "CR" 'CREA TIPO REGIMEN
                context.Response.ContentType = "text/html"
                res = Crear_Periodo()
            Case "AT" 'ACTUALIZA 
                context.Response.ContentType = "text/html"
                res = Actualizar_Periodo(CODE)
            Case Else
        End Select
        context.Response.Write(res)
    End Sub
 
    
    Public Function Crear_Periodo() As String
       
        Dim Datos As String
        Datos = NFPeriodo.Crear_Periodo()
        Return Datos
    
    End Function
    Public Function Actualizar_Periodo(ByVal p_CODE As String) As String
    
        Dim Datos As String
        Datos = NFPeriodo.Actualizar_Periodo(p_CODE)
        Return Datos
        
    End Function
    
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
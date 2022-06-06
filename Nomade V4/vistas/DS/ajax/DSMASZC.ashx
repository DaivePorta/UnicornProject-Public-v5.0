<%@ WebHandler Language="VB" Class="DSMASZC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class DSMASZC : Implements IHttpHandler
    
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
        
    Dim OPCION As String
    Dim USUA_ID As String
    '----------------
    Dim p_CODE, p_CTLG_CODE, p_SCSL_CODE, p_TIPO_IND, p_ZONA_CODE, p_CLIE_PIDM, p_PIDM_VEND, p_DIRECCIONES As String

    '----------------
    Dim dsZonas As New Nomade.DS.DSZonasDistribucion("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        USUA_ID = vChar(context.Request("USUA_ID"))
        
        p_CODE = context.Request("p_CODE")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
  
        
        p_TIPO_IND = context.Request("p_TIPO_IND")
        p_ZONA_CODE = context.Request("p_ZONA_CODE")
        p_CLIE_PIDM = context.Request("p_CLIE_PIDM")
        p_PIDM_VEND = context.Request("p_PIDM_VEND")
        p_DIRECCIONES = context.Request("p_DIRECCIONES")
        Try
        
            Select Case OPCION
                Case "1" ' ASIGNAR ZONA
                    context.Response.ContentType = "application/json; charset=utf-8"
                    res = dsZonas.asignarZonaDistribucionAclientes(p_ZONA_CODE, p_DIRECCIONES, p_TIPO_IND)
                    
                    resb.Append("[{")
                    resb.Append("""RESPUESTA"" :" & """" & res.ToString & """")
                    resb.Append("}]")
                    res = resb.ToString()
                Case "3" 'LISTAR CLIENTES POR ZONA DE DISTRIBUCION
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dsZonas.listarClientesXzonaDistribucion(p_CTLG_CODE, p_SCSL_CODE, p_ZONA_CODE, If(p_CLIE_PIDM Is Nothing, "0", p_CLIE_PIDM), p_PIDM_VEND, p_TIPO_IND)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case Else
                    
            End Select
            
            context.Response.Write(res)
            
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
        
    End Sub
   
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
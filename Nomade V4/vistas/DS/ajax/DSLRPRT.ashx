<%@ WebHandler Language="VB" Class="DSLRPRT" %>

Imports System
Imports System.Web
Imports System.Data

Public Class DSLRPRT : Implements IHttpHandler
    
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
        
    Dim OPCION As String
    Dim USUA_ID As String
    '----------------
    Dim p_CTLG_CODE, p_SCSL_CODE, p_ZONA_CODE, p_FECHA_INI, p_FECHA_FIN As String
    '----------------
    Dim dsZonas As New Nomade.DS.DSReportes("Bn")
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        USUA_ID = context.Request("USUA_ID")
        '--------
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_ZONA_CODE = context.Request("p_ZONA_CODE")
        p_FECHA_INI = context.Request("p_FECHA_INI")
        p_FECHA_FIN = context.Request("p_FECHA_FIN")
        
        If Not (p_FECHA_INI Is Nothing) Then
            p_FECHA_INI = Utilities.fechaLocal(p_FECHA_INI)
        End If
        
        If Not (p_FECHA_FIN Is Nothing) Then
            p_FECHA_FIN = Utilities.fechaLocal(p_FECHA_FIN)
        End If
        
        Try
        
            Select Case OPCION
                Case "1" 'DSLALCL - REPORTE DE ALTAS DE CLIENTES
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dsZonas.ListarAltasDeClientes(p_CTLG_CODE, p_SCSL_CODE)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dsZonas.VentasXzonasDistribucion(p_CTLG_CODE, p_SCSL_CODE, p_ZONA_CODE,
                                                          IIf(p_FECHA_INI = "0000-00-00", Nothing, p_FECHA_INI),
                                                          IIf(p_FECHA_FIN = "0000-00-00", Nothing, p_FECHA_FIN))
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
    
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
<%@ WebHandler Language="VB" Class="NOLRTCA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NOLRTCA : Implements IHttpHandler
    
    Dim res As String
    Dim resb As New StringBuilder
    
    Dim CTLG_CODE, SCSL_CODE, MONE_CODE, PROD_CODE, GRUP_CODE, NIVEL, DESDE, HASTA, MARCA_CODE As String
    Dim ANHO As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim OPCION As String
        
        Dim venta As New Nomade.NV.NVVenta("Bn")
        
        Dim dt As DataTable
    
        Try
            OPCION = context.Request("OPCION")
            CTLG_CODE = context.Request("CTLG_CODE")
            SCSL_CODE = context.Request("SCSL_CODE")
            MONE_CODE = context.Request("MONE_CODE")
            MARCA_CODE = context.Request("MARCA_CODE")

            GRUP_CODE = context.Request("GRUP_CODE")
            PROD_CODE = context.Request("PROD_CODE")
            NIVEL = context.Request("NIVEL")
            DESDE = context.Request("DESDE")
            HASTA = context.Request("HASTA")
            ANHO = context.Request("ANHO")
            
            Select Case OPCION
               
                Case "REPORTE"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = venta.ReporteAnaliticoVentasxSegmentacion(CTLG_CODE, SCSL_CODE, NIVEL, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), _
                                                                   GRUP_CODE, PROD_CODE, MONE_CODE, MARCA_CODE)
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                 
                Case "REPORTE_MENSUAL"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = venta.ReporteAnaliticoMensualVentasxSegmentacion(CTLG_CODE, SCSL_CODE, NIVEL, ANHO, MONE_CODE)
                    If Not (dt Is Nothing) Then
                        res = Utilities.Datatable2Json(dt)
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
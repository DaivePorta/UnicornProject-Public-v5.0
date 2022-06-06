<%@ WebHandler Language="VB" Class="NVLPRVE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLPRVE : Implements IHttpHandler

    Dim OPCION, USUARIO, CTLG_CODE, MONEDA_CODE, SCSL_CODE, VENDEDOR, CLIENTE, DESDE, HASTA, TIPO_VENTA As String

    Dim nvVenta As New Nomade.NV.NVVenta("Bn")


    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    Dim GRUPO_PROD As String
    Dim ENTREGADO As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        VENDEDOR = context.Request("VENDEDOR")
        CLIENTE = context.Request("CLIENTE")
        MONEDA_CODE = context.Request("MONEDA_CODE")
        'ESTADO = context.Request("ESTADO")
        OPCION = context.Request("OPCION")
        DESDE = context.Request("DESDE")
        HASTA = context.Request("HASTA")
        USUARIO = context.User.Identity.Name()
        ENTREGADO = context.Request("ENTREGADO")
        TIPO_VENTA = context.Request("TIPO_VENTA")




        'GRUPO_PROD = context.Request("GRUPO_PROD")
        'If GRUPO_PROD Is Nothing Then
        '    GRUPO_PROD = ""
        'End If

        Try

            Select Case OPCION


                Case "L" ' Obtiene tabla con documentos de venta
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListadoProductosVendidos(CTLG_CODE, SCSL_CODE, CLIENTE, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), VENDEDOR, MONEDA_CODE, TIPO_VENTA, "", "", ENTREGADO)

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "L2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ReporteFacturacionxFechas(CTLG_CODE, SCSL_CODE, If(DESDE = "", String.Empty, Utilities.fechaLocal(DESDE)), If(HASTA = "", String.Empty, Utilities.fechaLocal(HASTA)), MONEDA_CODE)

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "L3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ReportePreVentasxFechas(CTLG_CODE, SCSL_CODE, If(DESDE = "", String.Empty, Utilities.fechaLocal(DESDE)), If(HASTA = "", String.Empty, Utilities.fechaLocal(HASTA)))

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "L4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ReporteMotivosNoEntrega(CTLG_CODE, SCSL_CODE, If(DESDE = "", String.Empty, Utilities.fechaLocal(DESDE)), If(HASTA = "", String.Empty, Utilities.fechaLocal(HASTA)))

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "LR" ' Obtiene tabla con documentos de venta para Ranking de productos
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListadoRankingProductosVendidos(CTLG_CODE, SCSL_CODE, CLIENTE, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), VENDEDOR, MONEDA_CODE, TIPO_VENTA, "", "", ENTREGADO)

                    If Not dt Is Nothing Then
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
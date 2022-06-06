<%@ WebHandler Language="VB" Class="NVLRAVM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLRAVM : Implements IHttpHandler

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim OPCION As String

        Dim CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO, DIAS, GRUPO, DESDE, HASTA, MES, RANGO_HORARIO As String

        Dim dvta As New Nomade.NV.NVVenta("BN")

        Dim dt As DataTable

        Dim res As String
        Dim resb As New StringBuilder

        Try
            OPCION = context.Request("OPCION")
            CTLG_CODE = context.Request("CTLG_CODE")
            SCSL_CODE = context.Request("SCSL_CODE")
            MONE_CODE = context.Request("MONE_CODE")
            ANIO = context.Request("ANIO")
            DIAS = context.Request("DIAS")
            GRUPO = context.Request("GRUPO")
            DESDE = context.Request("DESDE")
            HASTA = context.Request("HASTA")
            MES = context.Request("MES")
            RANGO_HORARIO = context.Request("RANGO_HORARIO") 'DPORTA 15/07/21


            Select Case OPCION
                Case "REPORTE"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dvta.ReporteAnaliticoVentasMensuales(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NOMBRE_MES"" :" & """" & MiDataRow("NOMBRE_MES").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "REPORTE_MES_DETALLE" ' Obtiene tabla con documentos de venta DETALLE POR MES
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'context.Response.ContentType = "application/text; charset=utf-8"
                    dt = dvta.ReporteAnaliticoVentasMensualesDetalle(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO, MES)
                    If Not dt Is Nothing Then

                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If
                Case "REPORTE_ANUALES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dvta.ReporteAnaliticoVentasAnuales(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""ANIO"" :" & """" & MiDataRow("ANIO").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "PRODUCTOS_VENDIDOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dvta.ReporteProductosVendidos(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""COD_PRODUCTO"" :" & """" & MiDataRow("COD_PRODUCTO").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                            resb.Append("""PORCENTAJE"" :" & """" & MiDataRow("PORCENTAJE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "MARCAS_VENDIDAS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dvta.ReporteMarcasVendidas(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""COD_MARCA"" :" & """" & MiDataRow("COD_MARCA").ToString & """,")
                            resb.Append("""MARCA"" :" & """" & MiDataRow("MARCA").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                            resb.Append("""PORCENTAJE"" :" & """" & MiDataRow("PORCENTAJE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "REPORTE_CRONOLOGICO"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dvta.ReporteCronologicoVentas(CTLG_CODE, SCSL_CODE, DIAS, GRUPO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), RANGO_HORARIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""DIA"" :" & """" & MiDataRow("DIA").ToString & """,")
                            resb.Append("""RANGO"" :" & """" & MiDataRow("RANGO").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & MiDataRow("CANTIDAD").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
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
<%@ WebHandler Language="VB" Class="NELREGG" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NELREGG : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim OPCION As String
        
        Dim CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO, DIAS, GRUPO, DESDE, HASTA, SUBCONCEPTO, CECC_CODE, CECD_CODE, CONC_CODE, TIPO, MES As String
        
        Dim dvta As New Nomade.CP.CPReportesGastos("Bn")
        
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
            MES = context.Request("MES")
            GRUPO = context.Request("GRUPO")
            DESDE = context.Request("DESDE")
            HASTA = context.Request("HASTA")
            SUBCONCEPTO = context.Request("SUBCONCEPTO")
            CECC_CODE = context.Request("CECC_CODE")
            CECD_CODE = context.Request("CECD_CODE")
            CONC_CODE = context.Request("CONC_CODE")
            TIPO = context.Request("TIPO")
            
            
            Select Case OPCION
                Case "EGRESOS_GENERALES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dvta.ReporteEgresosGenerales(CTLG_CODE, SCSL_CODE, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CECC_CODE, CECD_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CONCEPTO"" :" & """" & MiDataRow("CONCEPTO").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "EGRESOS_GASTOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dvta.ReporteEgresosSubconceptos(CTLG_CODE, SCSL_CODE, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), SUBCONCEPTO, CECC_CODE, CECD_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CONCEPTO"" :" & """" & MiDataRow("CONCEPTO").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    
                Case "EGRESOS_MENSUALES"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dvta.ReporteEgresosMensuales(CTLG_CODE, SCSL_CODE, SUBCONCEPTO, ANIO, CECC_CODE, CECD_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""MES"" :" & """" & MiDataRow("MES").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "MOSTRAR_DETALLE"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dvta.DetalleEgresosGenerales(TIPO, CTLG_CODE, SCSL_CODE, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CECC_CODE, CECD_CODE, CONC_CODE, ANIO, MES)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CODIGO_GAST_ORG"" :" & """" & MiDataRow("CODIGO_GAST_ORG").ToString & """,")
                            resb.Append("""GASTO"" :" & """" & MiDataRow("GASTO").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"" :" & """" & MiDataRow("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""MONTO_APROBADO"" :" & """" & MiDataRow("MONTO_APROBADO").ToString & """,")
                            resb.Append("""FECHA_PAGO"" :" & """" & MiDataRow("FECHA_PAGO").ToString & """,")
                            resb.Append("""FECHA_EMISION"" :" & """" & MiDataRow("FECHA_EMISION").ToString & """,")
                            resb.Append("""DESC_DCTO"" :" & """" & MiDataRow("DESC_DCTO").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""SOLICITA"" :" & """" & MiDataRow("SOLICITA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    'Case "REPORTE_ANUALES"
                    '    context.Response.ContentType = "application/json; charset=utf-8"
                    '    dt = dvta.ReporteAnaliticoVentasAnuales(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    '    If Not (dt Is Nothing) Then
                    '        resb.Append("[")
                    '        For Each MiDataRow As DataRow In dt.Rows
                    '            resb.Append("{")
                    '            resb.Append("""ANIO"" :" & """" & MiDataRow("ANIO").ToString & """,")
                    '            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """")
                    '            resb.Append("}")
                    '            resb.Append(",")
                    '        Next
                    '        resb.Append("{}")
                    '        resb = resb.Replace(",{}", String.Empty)
                    '        resb.Append("]")
                    '    End If
                    '    res = resb.ToString()
                    'Case "PRODUCTOS_VENDIDOS"
                    '    context.Response.ContentType = "application/json; charset=utf-8"
                    '    dt = dvta.ReporteProductosVendidos(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    '    If Not (dt Is Nothing) Then
                    '        resb.Append("[")
                    '        For Each MiDataRow As DataRow In dt.Rows
                    '            resb.Append("{")
                    '            resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                    '            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                    '            resb.Append("""PORCENTAJE"" :" & """" & MiDataRow("PORCENTAJE").ToString & """")
                    '            resb.Append("}")
                    '            resb.Append(",")
                    '        Next
                    '        resb.Append("{}")
                    '        resb = resb.Replace(",{}", String.Empty)
                    '        resb.Append("]")
                    '    End If
                    '    res = resb.ToString()
                    'Case "MARCAS_VENDIDAS"
                    '    context.Response.ContentType = "application/json; charset=utf-8"
                    '    dt = dvta.ReporteMarcasVendidas(CTLG_CODE, SCSL_CODE, MONE_CODE, ANIO)
                    '    If Not (dt Is Nothing) Then
                    '        resb.Append("[")
                    '        For Each MiDataRow As DataRow In dt.Rows
                    '            resb.Append("{")
                    '            resb.Append("""MARCA"" :" & """" & MiDataRow("MARCA").ToString & """,")
                    '            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                    '            resb.Append("""PORCENTAJE"" :" & """" & MiDataRow("PORCENTAJE").ToString & """")
                    '            resb.Append("}")
                    '            resb.Append(",")
                    '        Next
                    '        resb.Append("{}")
                    '        resb = resb.Replace(",{}", String.Empty)
                    '        resb.Append("]")
                    '    End If
                    '    res = resb.ToString()
                    'Case "REPORTE_CRONOLOGICO"
                    '    context.Response.ContentType = "application/json; charset=utf-8"
                    '    dt = dvta.ReporteCronologicoVentas(CTLG_CODE, SCSL_CODE, DIAS, GRUPO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA))
                    '    If Not (dt Is Nothing) Then
                    '        resb.Append("[")
                    '        For Each MiDataRow As DataRow In dt.Rows
                    '            resb.Append("{")
                    '            resb.Append("""DIA"" :" & """" & MiDataRow("DIA").ToString & """,")
                    '            resb.Append("""RANGO"" :" & """" & MiDataRow("RANGO").ToString & """,")
                    '            resb.Append("""CANTIDAD"" :" & """" & MiDataRow("CANTIDAD").ToString & """,")
                    '            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """")
                    '            resb.Append("}")
                    '            resb.Append(",")
                    '        Next
                    '        resb.Append("{}")
                    '        resb = resb.Replace(",{}", String.Empty)
                    '        resb.Append("]")
                    '    End If
                    '    res = resb.ToString()
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
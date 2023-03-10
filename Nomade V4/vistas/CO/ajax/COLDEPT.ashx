<%@ WebHandler Language="VB" Class="COLDEPT" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports iTextSharp.text
Imports iTextSharp.text.pdf

Public Class COLDEPT : Implements IHttpHandler


    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_FECHA_EMISION_DESDE, p_FECHA_EMISION_HASTA, p_FECHA_REGISTRO_DESDE, p_FECHA_REGISTRO_HASTA, p_DOC_CODE As String
    Dim p_ANIO, p_MES, p_MES_DES As String
    Dim p_RUC As String
    Dim p_ACTIVO, p_COMPRA As String
    Dim coRegistroCompras As New Nomade.CO.CORegistroCompras("Bn")

    Dim dt As System.Data.DataTable
    Dim res, cod, msg, id, value As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")


        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        p_RUC = context.Request("p_RUC")
        p_ANIO = context.Request("p_ANIO")
        p_MES = context.Request("p_MES")
        p_MES_DES = context.Request("p_MES_DES")
        p_FECHA_EMISION_DESDE = context.Request("p_FECHA_EMISION_DESDE")
        If p_FECHA_EMISION_DESDE <> "" Then
            p_FECHA_EMISION_DESDE = Utilities.fechaLocal(p_FECHA_EMISION_DESDE)
        End If
        p_FECHA_EMISION_HASTA = context.Request("p_FECHA_EMISION_HASTA")
        If p_FECHA_EMISION_HASTA <> "" Then
            p_FECHA_EMISION_HASTA = Utilities.fechaLocal(p_FECHA_EMISION_HASTA)
        End If
        p_FECHA_REGISTRO_DESDE = context.Request("p_FECHA_REGISTRO_DESDE")
        If p_FECHA_REGISTRO_DESDE <> "" Then
            p_FECHA_REGISTRO_DESDE = Utilities.fechaLocal(p_FECHA_REGISTRO_DESDE)
        End If
        p_FECHA_REGISTRO_HASTA = context.Request("p_FECHA_REGISTRO_HASTA")
        If p_FECHA_REGISTRO_HASTA <> "" Then
            p_FECHA_REGISTRO_HASTA = Utilities.fechaLocal(p_FECHA_REGISTRO_HASTA)
        End If
        ' UPDATE EN TABLA 

        value = context.Request.Form("value")
        p_DOC_CODE = context.Request("CODIGO")
        p_ACTIVO = context.Request("p_ACTIVO")
        p_COMPRA = context.Request("p_COMPRA")

        Try

            Select Case OPCION
                Case "0"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = coRegistroCompras.Listar_Registro_Compras(p_CTLG_CODE, p_SCSL_CODE, p_ANIO, p_MES, p_FECHA_EMISION_DESDE, p_FECHA_REGISTRO_DESDE, p_FECHA_REGISTRO_HASTA, p_FECHA_EMISION_HASTA)

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "1" 'LISTAR PERIODO
                    context.Response.ContentType = "text/plain"
                    Dim anio As String = Date.Now.Year.ToString()
                    dt = New NOMADE.NF.NFPeriodo("Bn").Listar_Periodo("A", "", p_CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("{")
                        For Each row As DataRow In dt.Rows
                            resb.Append("""" & row("COD").ToString & """ :" & """" & row("PERIODO_DESC").ToString & """,")
                        Next
                        resb.Append("[]")
                        resb.Replace(",[]", "")
                        resb.Append("}")
                    End If
                    res = resb.ToString()
                Case "LISTAR_OPERA" '
                    context.Response.ContentType = "text/plain"
                    Dim nvCompra As New Nomade.NC.NCFactura("Bn")

                    dt = nvCompra.ListarOperacionC(p_ACTIVO, p_COMPRA)
                    If Not (dt Is Nothing) Then
                        resb.Append("{")
                        For Each row As DataRow In dt.Rows
                            resb.Append("""" & row("CODIGO").ToString & """ :" & """" & row("DESCRIPCION_CORTA").ToString & """,")
                        Next
                        resb.Append("[]")
                        resb.Replace(",[]", "")
                        resb.Append("}")
                    End If
                    res = resb.ToString()

                Case "2" 'ACTUALIZA DETALLES DE LIBRO DE COMPRAS
                    context.Response.ContentType = "text/plain"
                    Dim sCOLUMNA As String = context.Request("columnName")
                    Dim nCOLUMNA As String = context.Request("columnId")
                    If (nCOLUMNA = "0" Or nCOLUMNA = "13") Then
                        res = coRegistroCompras.actualizar_detalle_registro_compras(p_DOC_CODE, nCOLUMNA, value)
                    ElseIf (nCOLUMNA = "12") Then
                        res = coRegistroCompras.actualizar_detalle_codigo_opera(p_DOC_CODE, nCOLUMNA, value)
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
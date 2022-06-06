<%@ WebHandler Language="VB" Class="CCLCCUO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CCLCCUO : Implements IHttpHandler

    Dim OPCION, p_CTLG_CODE, p_USUA_ID, p_CLIE_PIDM, p_DESDE, p_HASTA, p_SCSL_CODE As String
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Dim ccCuentaPorCobrar As New Nomade.CC.CCCuentaPorCobrar("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim glLetras As New Nomade.GL.GLLetras("Bn")

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_CLIE_PIDM = context.Request("p_CLIE_PIDM")
        p_DESDE = context.Request("p_DESDE")

        If p_DESDE <> "" Then
            p_DESDE = Utilities.fechaLocal(p_DESDE)
        End If
        p_HASTA = context.Request("p_HASTA")
        If p_HASTA <> "" Then
            p_HASTA = Utilities.fechaLocal(p_HASTA)
        End If


        Try

            Select Case OPCION
                Case "1" 'reporte de cuentas por cobrar
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ccCuentaPorCobrar.ListarDeudaClienteCuotas(p_CTLG_CODE, p_SCSL_CODE, p_CLIE_PIDM, p_DESDE, p_HASTA)
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


    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
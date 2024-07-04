<%@ WebHandler Language="VB" Class="NVMANUL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVMANUL : Implements IHttpHandler

    Dim OPCION, USUA_ID As String
    Dim CTLG_CODE, SCSL_CODE As String
    Dim VTAC_CODE, NUM_SEQ_DOC, ANULAC_ID, CMNT_ANULAC, DEVOLUCION_EFECTIVO, DEVOLUCION_DESPACHO, MOTIVO_CODE,
        DOCUMENTO, PIDM_CLIENTE, ESTADO_PAGO, ESTADO_DESPACHO, MONE_CODE As String
    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array



    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        Try
            OPCION = context.Request("OPCION")
            USUA_ID = context.Request("USUA_ID")

            CTLG_CODE = context.Request("CTLG_CODE")
            SCSL_CODE = context.Request("SCSL_CODE")
            DOCUMENTO = context.Request("DOCUMENTO")
            PIDM_CLIENTE = context.Request("PIDM_CLIENTE")
            ESTADO_PAGO = context.Request("ESTADO_PAGO")
            ESTADO_DESPACHO = context.Request("ESTADO_DESPACHO")
            MONE_CODE = context.Request("MONE_CODE")

            VTAC_CODE = context.Request("VTAC_CODE")
            NUM_SEQ_DOC = context.Request("NUM_SEQ_DOC")
            ANULAC_ID = context.Request("ANULAC_ID")
            CMNT_ANULAC = vChar(context.Request("CMNT_ANULAC"))
            DEVOLUCION_EFECTIVO = context.Request("DEVOLUCION_EFECTIVO")
            DEVOLUCION_DESPACHO = context.Request("DEVOLUCION_DESPACHO")
            MOTIVO_CODE = context.Request("MOTIVO_CODE")

            Select Case OPCION
                Case "1"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                    res = nvVenta.AnularDocumentoVenta(VTAC_CODE, NUM_SEQ_DOC, ANULAC_ID, CMNT_ANULAC,
                                                       If(DEVOLUCION_EFECTIVO = Nothing, "N", DEVOLUCION_EFECTIVO), If(DEVOLUCION_DESPACHO = Nothing, "N", DEVOLUCION_DESPACHO),
                                                       MOTIVO_CODE, CTLG_CODE, SCSL_CODE, DOCUMENTO, PIDM_CLIENTE, ESTADO_PAGO, ESTADO_DESPACHO, MONE_CODE)

                Case "2"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim oNVAnticipo As New Nomade.NV.NVAnticipo("Bn")
                    res = oNVAnticipo.fnAnularAnticipo(VTAC_CODE, ANULAC_ID, CMNT_ANULAC, If(DEVOLUCION_EFECTIVO = Nothing, "N", DEVOLUCION_EFECTIVO), MOTIVO_CODE,
                                                       CTLG_CODE, SCSL_CODE, DOCUMENTO, PIDM_CLIENTE, ESTADO_PAGO, MONE_CODE)

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            Dim sMsjeError As String = ex.Message
            If sMsjeError.IndexOf("[Advertencia]") > -1 Then
                context.Response.Write(sMsjeError)
            Else
                context.Response.Write("[Error]: " & sMsjeError)
            End If
        End Try


    End Sub

    ''' <summary>
    ''' Elimina espacion vacios (trim), cambia (") por ('), reemplaza (/) por vacio
    ''' </summary>
    ''' <param name="campo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
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
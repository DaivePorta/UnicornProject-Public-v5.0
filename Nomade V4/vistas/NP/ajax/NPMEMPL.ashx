<%@ WebHandler Language="VB" Class="NPMEMPL" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NPMEMPL : Implements IHttpHandler

    Dim OPCION, P_CODE, USUA_ID, CTLG_CODE As String
    Dim res As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")

        P_CODE = context.Request("P_CODE")
        USUA_ID = context.Request("USUA_ID")
        CTLG_CODE = context.Request("CTLG_CODE")

        Select Case OPCION
            Case "CAMBIO_ESTADO" 'DPORTA
                context.Response.ContentType = "text/plain"
                Dim ep As New Nomade.NC.NCEEmpleado("Bn")
                res = ep.CambiarEstadoEmpleado(P_CODE, USUA_ID, CTLG_CODE)
        End Select
        context.Response.Write(res)
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
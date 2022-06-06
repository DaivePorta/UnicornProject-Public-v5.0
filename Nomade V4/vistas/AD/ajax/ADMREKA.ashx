<%@ WebHandler Language="VB" Class="ADMREKA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class ADMREKA : Implements IHttpHandler

    Dim opcion As String
    Dim res, ctlgCode, prodCode, almcCode, fecha As String
    Dim oDtRecalculo As New Nomade.AD.ADRecalculo("BN")

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest


        opcion = context.Request("opcion")
        ctlgCode = context.Request("ctlgCode")
        prodCode = context.Request("prodCode")
        almcCode = context.Request("almcCode")
        fecha = context.Request("fecha")
        If fecha <> String.Empty Then
            fecha = Utilities.fechaLocal(context.Request("fecha"))
        End If
        Try
            Select Case opcion
                Case "1"
                    ' context.Response.ContentType = "application/json; charset=utf-8"
                    res = oDtRecalculo.RecalcularKardex(ctlgCode, prodCode, almcCode, fecha)
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
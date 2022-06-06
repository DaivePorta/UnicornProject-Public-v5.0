<%@ WebHandler Language="VB" Class="NCMABRP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMABRP : Implements IHttpHandler

    Dim OPCION, p_ctlg As String
    Dim p_Mes As Integer
    Dim p_Anio As Integer

    Dim dt As DataTable
    Dim NFPeriodo As New Nomade.NF.NFPeriodo("")

    Dim res As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        p_ctlg = context.Request("p_ctlg")
        p_Mes = IIf(context.Request("p_Mes") = Nothing, 0, IIf(context.Request("p_Mes") = "", 0, context.Request("p_Mes")))
        p_Anio = IIf(context.Request("p_Anio") = Nothing, 0, IIf(context.Request("p_Anio") = "", 0, context.Request("p_Anio")))



        ' Utilities.fechaLocal('')
        Select Case OPCION

            Case "1"
                context.Response.ContentType = "text/html"
                Dim periodo = Now()
                res = periodo.Year().ToString() + "-" + Devuelve_Nombre_Mes(periodo.Month)
            Case "2"

                res = Abrir_Periodo(p_ctlg)

            Case "LPA" 'Lista Periodi Abrir
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dt As New DataTable
                dt = NFPeriodo.Listar_Periodo_Abrir(p_ctlg)
                If dt Is Nothing Then
                    res = "{}"
                Else
                    res = Utilities.DataTableToJSON(dt)
                End If

            Case Else
        End Select
        context.Response.Write(res)
    End Sub





    Public Function Abrir_Periodo(p_ctlg As String) As String

        Dim msg As String
        Try
            Dim NFPeriodo As New Nomade.NF.NFPeriodo("Bn")
            msg = NFPeriodo.Abrir_Periodo(p_ctlg, p_Anio, p_Mes)
            NFPeriodo = Nothing

        Catch ex As Exception
            msg = "Error"
        End Try



        Return msg

    End Function





    Public Function Devuelve_Nombre_Mes(omes As String) As String

        Dim cMes As String = ""

        If omes = "1" Then
            cMes = "ENERO"
        ElseIf omes = "2" Then
            cMes = "FEBRERO"
        ElseIf omes = "3" Then
            cMes = "MARZO"
        ElseIf omes = "4" Then
            cMes = "ABRIL"
        ElseIf omes = "5" Then
            cMes = "MAYO"
        ElseIf omes = "6" Then
            cMes = "JUNIO"
        ElseIf omes = "7" Then
            cMes = "JULIO"
        ElseIf omes = "8" Then
            cMes = "AGOSTO"
        ElseIf omes = "9" Then
            cMes = "SEPTIEMBRE"
        ElseIf omes = "10" Then
            cMes = "OCTUBRE"
        ElseIf omes = "11" Then
            cMes = "NOVIEMBRE"
        ElseIf omes = "12" Then
            cMes = "DICIEMBRE"
        End If

        Return cMes
    End Function







    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property


End Class
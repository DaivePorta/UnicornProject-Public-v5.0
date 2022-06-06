<%@ WebHandler Language="VB" Class="CPMPASU" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPMPASU : Implements IHttpHandler

    Dim OPCION, p_DETALLE, COD_PLA_BANC, COD_PLANILLA, CTLG_CODE, MES, ANIO As String
    Dim res As String
    Dim resb As New StringBuilder
    Dim dt As DataTable

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        p_DETALLE = context.Request("p_DETALLE")
        COD_PLA_BANC = context.Request("COD_PLA_BANC")
        COD_PLANILLA = context.Request("COD_PLANILLA")
        MES = context.Request("MES")
        ANIO = context.Request("ANIO")
        CTLG_CODE = context.Request("CTLG_CODE")

        Select Case OPCION
            Case "0"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NNPlanillaBancaria As New Nomade.NN.NNPlanillaBancaria("Bn")
                dt = NNPlanillaBancaria.Listar_Detalle_Pago_Sueldo(COD_PLA_BANC, COD_PLANILLA)
                If Not (dt Is Nothing) Then
                    res = Utilities.Datatable2Json(dt)
                End If
            Case "1"
                res = Crea_Pago_Planilla(p_DETALLE)
            Case "2"
                Dim NNPlanillaBancaria As New NOMADE.NN.NNPlanillaBancaria("Bn")
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New DataTable
                dt = NNPlanillaBancaria.ListarPlanillasBancarias(CTLG_CODE, MES, ANIO)

                If dt Is Nothing Then
                    res = "{}"
                Else
                    res = Utilities.DataTableToJSON(dt)
                End If



        End Select
        context.Response.Write(res)
    End Sub



    Public Function Crea_Pago_Planilla(p_DETALLE As String) As String

        Dim Datos As String
        Dim NNPlanillaBancaria As New Nomade.NN.NNPlanillaBancaria("Bn")

        Try
            Datos = NNPlanillaBancaria.Crea_Pago_Planilla(p_DETALLE)
        Catch ex As Exception
            Datos = "E"
        End Try

        NNPlanillaBancaria = Nothing
        Return Datos
    End Function





    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
<%@ WebHandler Language="VB" Class="NNMREFE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMREFE : Implements IHttpHandler
    Dim OPCION As String
    Dim p_ANHO, p_MES, p_FECHA, p_TIPO, p_CAD_PIDM, p_CTLG_CODE, p_SCSL_CODE As String
    Dim dt As DataTable


    Dim res As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")

        p_ANHO = context.Request("p_ANHO")
        p_MES = context.Request("p_MES")
        p_FECHA = context.Request("p_FECHA")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_TIPO = context.Request("p_TIPO")
        p_CAD_PIDM = context.Request("p_CAD_PIDM")

        Select Case OPCION

            Case "1"

            Case "2"
                context.Response.ContentType = "text/html"
                res = Crea_Marcadas_Biometrico(p_FECHA, p_CTLG_CODE)
            Case "3"
                context.Response.ContentType = "text/html"
                res = Evalua_Marcaciones_Biometrico(p_FECHA, p_CTLG_CODE)
            Case "4"
                context.Response.ContentType = "text/html"
                res = Reprocesa_Marcadas_Biometrico(Utilities.fechaLocal(p_FECHA), p_CTLG_CODE, p_SCSL_CODE)
            Case Else
        End Select
        context.Response.Write(res)

    End Sub




    Public Function Evalua_Marcaciones_Biometrico(p_FECHA As String, p_CTLG_CODE As String) As String

        Dim msg As String
        Try
            Dim NNPlanilla As New NOMADE.NN.NNPlanilla("Bn")
            NNPlanilla.Evalua_Marcaciones_Biometrico(p_FECHA, p_CTLG_CODE)
            NNPlanilla = Nothing
            msg = "OK"
        Catch ex As Exception
            msg = "E"
        End Try



        Return msg

    End Function

    Public Function Crea_Marcadas_Biometrico(p_FECHA As String, p_CTLG_CODE As String) As String

        Dim msg As String = ""
        Try
            Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
            msg = NNPlanilla.Crea_Marcadas_Biometrico(p_FECHA, p_CTLG_CODE)
            NNPlanilla = Nothing
        Catch ex As Exception
            msg = "E"
        End Try

        Return msg

    End Function

    Public Function Reprocesa_Marcadas_Biometrico(p_FECHA As String, p_CTLG_CODE As String, p_SCSL_CODE As String) As String

        Dim msg As String = ""
        Try
            Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
            msg = NNPlanilla.Reprocesa_Marcadas_Biometrico(p_FECHA, p_CTLG_CODE, p_SCSL_CODE)
            NNPlanilla = Nothing
        Catch ex As Exception
            msg = "E"
        End Try

        Return msg

    End Function









    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
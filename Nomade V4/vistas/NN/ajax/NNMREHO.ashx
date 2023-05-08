<%@ WebHandler Language="VB" Class="NNMREHO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNMREHO : Implements IHttpHandler
    Dim OPCION As String
    Dim CTLG_CODE, SCSL_CODE, p_Ids, p_AUTOMATICO, p_HORAS, FECHA_DESDE, FECHA_HASTA, FECHA, CODIGO_HORARIO, PIDM As String
    Dim dt As DataTable


    Dim res As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")

        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        FECHA_DESDE = context.Request("FECHA_DESDE")
        FECHA_HASTA = context.Request("FECHA_HASTA")
        FECHA = context.Request("FECHA")
        CODIGO_HORARIO = context.Request("CODIGO_HORARIO")
        PIDM = context.Request("PIDM")
        p_HORAS = context.Request("p_HORAS")
        p_Ids = context.Request("p_Ids")
        p_AUTOMATICO = context.Request("p_AUTOMATICO")

        Select Case OPCION

            Case "1" ' lista empleados
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NN.NNPlanilla("Bn").Listar_Empleados_Regularizar_horas(CTLG_CODE, IIf(SCSL_CODE = "T", "", SCSL_CODE), Utilities.fechaLocal(FECHA_DESDE), Utilities.fechaLocal(FECHA_HASTA))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""EMPLEADO"" :" & """" & MiDataRow("EMPLEADO").ToString & """,")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""CODIGO_HORARIO"" :" & """" & MiDataRow("CODIGO_HORARIO").ToString & """,")
                        resb.Append("""FECHA"" :" & """" & MiDataRow("FECHA").ToString & """")

                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dh As New Nomade.NN.NNPlanilla("Bn")
                dt = dh.Listar_Horario_Detalle_X_Dia(Utilities.fechaLocal(FECHA), PIDM, CTLG_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""HOEC_CODE"" :" & """" & MiDataRow("HOEC_CODE") & """,")
                        resb.Append("""SEQ"" :" & """" & MiDataRow("SEQ") & """,")
                        resb.Append("""HORA_INICIO"" :" & """" & MiDataRow("HORA_INICIO") & """,")
                        resb.Append("""HORA_FIN"" :" & """" & MiDataRow("HORA_FIN") & """")

                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                dh = Nothing
            Case "3"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dh As New Nomade.NN.NNPlanilla("Bn")
                dt = dh.Listar_Horas_X_Regularizar_Empleado(PIDM, Utilities.fechaLocal(FECHA))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")

                        resb.Append("""MARCACION"" :" & """" & MiDataRow("MARCACION") & """,")
                        resb.Append("""recordid"" :" & """" & MiDataRow("recordid") & """")


                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                dh = Nothing
            Case "4"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dh As New Nomade.NN.NNPlanilla("Bn")
                dt = dh.Listar_Marcaciones_Biometricos_reales(PIDM, Utilities.fechaLocal(FECHA))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")

                        resb.Append("""FECHA"" :" & """" & MiDataRow("FECHA") & """,")
                        resb.Append("""MARCACION_ENTRADA"" :" & """" & MiDataRow("MARCACION_ENTRADA") & """,")
                        resb.Append("""MARCACION_SALIDA"" :" & """" & MiDataRow("MARCACION_SALIDA") & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                dh = Nothing
            Case "5"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dh As New Nomade.NN.NNPlanilla("Bn")
                dt = dh.Listar_Horas_Regularizadas_Sin_Procesar(IIf(CTLG_CODE Is Nothing, "", CTLG_CODE), IIf(SCSL_CODE Is Nothing, "", SCSL_CODE))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")

                        resb.Append("""FECHA_ACTV"" :" & """" & MiDataRow("FECHA_ACTV") & """")



                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                dh = Nothing
            Case "AT" 'aCTUALIZA 
                context.Response.ContentType = "text/html"
                res = Actualizar_Horas_Regularizacion(PIDM, p_HORAS, Utilities.fechaLocal(FECHA), p_Ids)
            Case "C" 'CACLULA 
                context.Response.ContentType = "text/html"
                res = Calcula_Asistencias(p_AUTOMATICO, CTLG_CODE)

            Case "JOBFALTA" 'JOB FALTAS 
                context.Response.ContentType = "text/html"
                res = Ejecuta_job_faltas(FECHA, CTLG_CODE)

            Case Else
        End Select
        context.Response.Write(res)
    End Sub






    Public Function Actualizar_Horas_Regularizacion(PIDM As String, p_HORAS As String, p_FECHA As String, p_IDS As String) As String

        Dim msg As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        msg = NNPlanilla.Actualizar_Horas_Regularizacion(PIDM, p_HORAS, p_FECHA, p_Ids)
        NNPlanilla = Nothing
        Return msg

    End Function


    Public Function Calcula_Asistencias(p_AUTOMATICO As String, CTLG_CODE As String) As String

        Dim msg As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        NNPlanilla.Calcula_Asistencias(p_AUTOMATICO, CTLG_CODE)
        NNPlanilla = Nothing
        msg = "OK"
        Return msg

    End Function

    Public Function Ejecuta_job_faltas(p_FECHA As String, CTLG_CODE As String) As String

        Dim msg As String
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        msg = NNPlanilla.Ejecuta_job_faltas(p_FECHA, CTLG_CODE)
        NNPlanilla = Nothing
        Return msg

    End Function













    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
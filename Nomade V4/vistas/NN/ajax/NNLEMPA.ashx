<%@ WebHandler Language="VB" Class="NNLEMPA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNLEMPA : Implements IHttpHandler
    Dim OPCION As String
    Dim ANHO, MES, SCSL_CODE, CTLG_CODE, PIDM As String
    Dim dt As DataTable


    Dim res As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")

        ANHO = context.Request("ANHO")
        MES = context.Request("MES")
        PIDM = context.Request("PIDM")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")

        Select Case OPCION

            Case "1" ' 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dtFalta As New DataTable
                Dim dtFaltaHoras As New DataTable
                Dim dt_horas_extras As New DataTable
                Dim dtHoraSubsanada As New DataTable
                ' Dim array_fec As New ArrayList   'array alamcena fechas horas que no existen  en fechas tardanzas
                Dim bool As Boolean = False
                Dim bool2 As Boolean = False
                Dim bool3 As Boolean = False
                Dim bool4 As Boolean = False
                Dim bool5 As Boolean = False
                Dim bool6 As Boolean = False
                Dim array As New ArrayList
                Dim array2 As New ArrayList
                dt = New Nomade.NN.NNPlanilla("Bn").Listar_calculo_Tardanzas(ANHO, MES, PIDM, "N", "0001", "2")
                'dtFalta = New Nomade.NN.NNPlanilla("Bn").Listar_Faltas_Empleado(ANHO, MES, PIDM, "N", "0001", "3")
                dtFalta = New Nomade.NN.NNPlanilla("Bn").Listar_Faltas_Empleado(ANHO, MES, PIDM, "N", "0001", "6") 'DPORTA - FALTAS POR TODO EL DÍA
                dtFaltaHoras = New Nomade.NN.NNPlanilla("Bn").Listar_Faltas_Empleado(ANHO, MES, PIDM, "N", "0001", "4") 'MIN EN CONTRA PERMISOS POR HORAS
                dtHoraSubsanada = New Nomade.NN.NNPlanilla("Bn").Listar_Faltas_Empleado(ANHO, MES, PIDM, "N", "0001", "5") 'MIN SUBSANADOS PERMISOS POR HORAS
                dt_horas_extras = New Nomade.NN.NNPlanilla("Bn").Listar_calculo_horas_extras(ANHO, MES, PIDM, "N", "0001", "2")

                'dt = Nothing
                'dtFalta = Nothing
                'dt_horas_extras = Nothing 

                resb.Append("[")
                If Not (dt Is Nothing) Then

                    For i As Integer = 0 To dt.Rows.Count - 1
                        bool = False
                        bool2 = False
                        bool3 = False
                        bool4 = False
                        bool5 = False
                        bool6 = False
                        resb.Append("{")
                        resb.Append("""DIA"" :" & """" & dt(i)("DIA").ToString & """,")
                        resb.Append("""FECHA"" :" & """" & dt(i)("FECHA").ToString & """,")
                        'resb.Append("""ENTRADA_M"" :" & """" & dt(i)("ENTRADA_M").ToString & """,")
                        'resb.Append("""SALIDA_M"" :" & """" & dt(i)("SALIDA_M").ToString & """,")
                        'resb.Append("""ENTRADA_T"" :" & """" & dt(i)("ENTRADA_T").ToString & """,")
                        'resb.Append("""SALIDA_T"" :" & """" & dt(i)("SALIDA_T").ToString & """,")

                        If Not (dtFalta Is Nothing) Then
                            For k As Integer = 0 To dtFalta.Rows.Count - 1
                                If dtFalta(k)("FECHA_FALTA").ToString = dt(i)("FECHA").ToString And dtFalta(k)("FALTA_DIA").ToString = 1 Then
                                    resb.Append("""ENTRADA_M"" :" & """" & "-" & """,")
                                    resb.Append("""SALIDA_M"" :" & """" & "-" & """,")
                                    bool5 = True
                                    Exit For
                                End If
                            Next
                        End If
                        If bool5 = False Then
                            resb.Append("""ENTRADA_M"" :" & """" & dt(i)("ENTRADA_M").ToString & """,")
                            resb.Append("""SALIDA_M"" :" & """" & dt(i)("SALIDA_M").ToString & """,")
                        End If

                        If Not (dtFalta Is Nothing) Then
                            For k As Integer = 0 To dtFalta.Rows.Count - 1
                                If dtFalta(k)("FECHA_FALTA").ToString = dt(i)("FECHA").ToString Then
                                    resb.Append("""ENTRADA_T"" :" & """" & "-" & """,")
                                    resb.Append("""SALIDA_T"" :" & """" & "-" & """,")
                                    bool6 = True
                                    Exit For
                                End If
                            Next
                        End If
                        If bool6 = False Then
                            resb.Append("""ENTRADA_T"" :" & """" & dt(i)("ENTRADA_T").ToString & """,")
                            resb.Append("""SALIDA_T"" :" & """" & dt(i)("SALIDA_T").ToString & """,")
                        End If

                        resb.Append("""TARDANZA"" :" & """" & dt(i)("TARDANZA").ToString & """,")
                        'resb.Append("""FALTA"" :" & """" & "" & """,")

                        If Not (dtFalta Is Nothing) Then
                            For k As Integer = 0 To dtFalta.Rows.Count - 1
                                If dtFalta(k)("FECHA_FALTA").ToString = dt(i)("FECHA").ToString Then
                                    resb.Append("""FALTA"" :" & """" & dtFalta(k)("FALTA_DIA").ToString & """,")
                                    bool2 = True
                                    Exit For
                                End If
                            Next
                        End If
                        If bool2 = False Then
                            resb.Append("""FALTA"" :" & """" & "" & """,")
                        End If

                        If Not (dtFaltaHoras Is Nothing) Then
                            For k As Integer = 0 To dtFaltaHoras.Rows.Count - 1
                                If dtFaltaHoras(k)("DIA").ToString = dt(i)("DIA").ToString Then
                                    resb.Append("""MIN_NO_SUBSANADOS"" :" & """" & dtFaltaHoras(k)("MINUTOS").ToString & """,")
                                    bool3 = True
                                    Exit For
                                End If
                            Next
                        End If
                        If bool3 = False Then
                            resb.Append("""MIN_NO_SUBSANADOS"" :" & """" & "" & """,")
                        End If

                        If Not (dtHoraSubsanada Is Nothing) Then
                            For k As Integer = 0 To dtHoraSubsanada.Rows.Count - 1
                                If dtHoraSubsanada(k)("DIA").ToString = dt(i)("DIA").ToString Then
                                    resb.Append("""MIN_SUBSANADOS"" :" & """" & dtHoraSubsanada(k)("MINUTOS").ToString & """,")
                                    bool4 = True
                                    Exit For
                                End If
                            Next
                        End If
                        If bool4 = False Then
                            resb.Append("""MIN_SUBSANADOS"" :" & """" & "" & """,")
                        End If


                        If Not (dt_horas_extras Is Nothing) Then
                            For j As Integer = 0 To dt_horas_extras.Rows.Count - 1
                                If dt_horas_extras(j)("DIA").ToString = dt(i)("DIA").ToString Then
                                    resb.Append("""EXTRA"" :" & """" & dt_horas_extras(j)("TOTAL_MINUTOS").ToString & """")
                                    bool = True
                                    Exit For
                                End If
                            Next

                        End If
                        If bool = False Then
                            resb.Append("""EXTRA"" :" & """" & "" & """")
                        End If


                        resb.Append("}")
                        resb.Append(",")

                    Next
                End If

                'extras
                'If Not (dt_horas_extras Is Nothing) Then
                '    If Not (dt Is Nothing) Then
                '        For j As Integer = 0 To dt.Rows.Count - 1
                '            array.Add(dt(j)("DIA").ToString)
                '        Next
                '    End If
                '    If Not (dtFalta Is Nothing) Then
                '        For j As Integer = 0 To dtFalta.Rows.Count - 1
                '            array2.Add(dtFalta(j)("DIA").ToString)
                '        Next
                '    End If

                '    For j As Integer = 0 To dt_horas_extras.Rows.Count - 1
                '        If array.Contains(dt_horas_extras(j)("DIA").ToString) = False And array2.Contains(dt_horas_extras(j)("DIA").ToString) = False Then


                '            Dim a = dt_horas_extras(j)("DIA").ToString
                '            Dim lll = ""
                '            resb.Append("{")
                '            resb.Append("""DIA"" :" & """" & dt_horas_extras(j)("DIA").ToString & """,")
                '            resb.Append("""FECHA"" :" & """" & dt_horas_extras(j)("FECHA_HORA_EXTRA").ToString & """,")
                '            resb.Append("""ENTRADA_M"" :" & """" & "-" & """,")
                '            resb.Append("""SALIDA_M"" :" & """" & "-" & """,")
                '            resb.Append("""ENTRADA_T"" :" & """" & "-" & """,")
                '            resb.Append("""SALIDA_T"" :" & """" & "-" & """,")
                '            resb.Append("""TARDANZA"" :" & """" & "-" & """,")
                '            resb.Append("""FALTA"" :" & """" & "-" & """,")
                '            resb.Append("""MIN_NO_SUBSANADOS"" :" & """" & "-" & """,")
                '            resb.Append("""MIN_SUBSANADOS"" :" & """" & "-" & """,")
                '            resb.Append("""EXTRA"" :" & """" & dt_horas_extras(j)("TOTAL_MINUTOS").ToString & """")
                '            resb.Append("}")
                '            resb.Append(",")
                '        End If

                '    Next


                '    'resb.Append("{}")
                '    'resb = resb.Replace(",{}", String.Empty)


                'End If

                'faltas
                'If Not (dtFalta Is Nothing) Then
                '    For x As Integer = 0 To dtFalta.Rows.Count - 1
                '        bool2 = False
                '        resb.Append("{")
                '        resb.Append("""DIA"" :" & """" & dtFalta(x)("DIA").ToString & """,")
                '        resb.Append("""FECHA"" :" & """" & dtFalta(x)("FECHA_FALTA").ToString & """,")
                '        resb.Append("""ENTRADA_M"" :" & """" & "-" & """,")
                '        resb.Append("""SALIDA_M"" :" & """" & "-" & """,")
                '        resb.Append("""ENTRADA_T"" :" & """" & "-" & """,")
                '        resb.Append("""SALIDA_T"" :" & """" & "-" & """,")
                '        resb.Append("""TARDANZA"" :" & """" & "-" & """,")
                '        resb.Append("""FALTA"" :" & """" & dtFalta(x)("FALTA_DIA").ToString & """,")
                '        resb.Append("""MIN_NO_SUBSANADOS"" :" & """" & "-" & """,")
                '        resb.Append("""MIN_SUBSANADOS"" :" & """" & "-" & """,")
                '        If Not (dt_horas_extras Is Nothing) Then
                '            For y As Integer = 0 To dt_horas_extras.Rows.Count - 1
                '                If dtFalta(x)("DIA").ToString = dt_horas_extras(y)("DIA").ToString Then
                '                    resb.Append("""EXTRA"" :" & """" & dt_horas_extras(y)("TOTAL_MINUTOS").ToString & """")
                '                    bool2 = True
                '                    Exit For
                '                End If
                '            Next
                '        End If

                '        If bool2 = False Then
                '            resb.Append("""EXTRA"" :" & """" & "-" & """")
                '        End If


                '        resb.Append("}")
                '        resb.Append(",")

                '    Next





                '    resb.Append("{}")
                '    resb = resb.Replace(",{}", String.Empty)

                'End If

                resb.Append("{}")
                resb = resb.Replace(",{}", String.Empty)
                resb = resb.Replace("{}", String.Empty)

                resb.Append("]")

                res = resb.ToString()

            Case Else
        End Select
        context.Response.Write(res)


    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
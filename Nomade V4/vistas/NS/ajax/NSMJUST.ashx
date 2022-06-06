<%@ WebHandler Language="VB" Class="NSMJUST" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO

Public Class NSMJUST : Implements IHttpHandler
    Dim Opcion, Empr, Sucur As String
    Dim Periodo As New Nomade.NF.NFPeriodo("Bn")
    Dim Empleado As New Nomade.NC.NCEEmpleado("Bn")
    Dim Justificacion As New Nomade.NS.NSJustificacion("Bn")
    Dim dt As DataTable
    Dim resb As New StringBuilder
    Dim res As String
    Dim Usuario As String
    Dim Parametro As New Nomade.NC.NCParametros("Bn")


    Dim p_RHFATAR_CODE, p_RHFATAR_CTLG_CODE, p_RHFATAR_PERIODO, p_RHFATAR_PPBIDEN_PIDM,
    p_RHFATAR_NOMBRE, p_MOTIVO, p_HFTIPO_JUST, p_RHFATAR_DIA_INICIO, p_NUM_DIAS_LABORADOS, p_RHFATAR_DIA_FIN, p_RHFATAR_DESDE_HORA,
    p_RHFATAR_HASTA_HORA, p_SCSL_CODE, p_RHFATAR_TIPO, p_HORA_INICIO, p_HORA_FIN, p_DIA_INICIO, p_RHFATAR_MOTIVO, p_RHFATAR_USUA_ID, P_RHFATAR_ESTADO_IND, p_SALIDA, Nom, Est, Tipo_Justi, p_TP As String
    Dim Ruta, Des, Cod As String
    Dim img As HttpPostedFile
    Dim cFecha As String = ""
    Dim p_RHPLAHO_CTLG_CODE As String = ""
    Dim p_PIDM, p_CODIGO, p_TIPO_X_DIA_HORA, p_TIPO_JUST, p_TIPO_MOTIVO, p_USUA_ID, p_IND_COMPLETADO, p_MIN_REFRIGERIO, p_EST_IND, p_TIPO_FALTA, p_DIA_FIN, p_CTLG_CODE As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        'context.Response.ContentType = "text/plain"
        'context.Response.Write("Hello World")
        Opcion = context.Request("Opcion")
        'Empr = context.Request("Empresa")
        'Sucur = context.Request("Sucursal")

        p_RHFATAR_DESDE_HORA = context.Request("Hora_Inicio")
        p_RHFATAR_HASTA_HORA = context.Request("Hora_Fin")


        img = context.Request.Files("img")
        Cod = context.Request("Cod")
        Des = context.Request("Des")
        Ruta = context.Request("Ruta")

        Empr = context.Request("Emp")
        Sucur = context.Request("Suc")
        Usuario = context.Request("us")
        Nom = context.Request("Nom")

        p_PIDM = context.Request("p_PIDM")
        p_CODIGO = context.Request("p_CODIGO")
        p_TIPO_X_DIA_HORA = context.Request("p_TIPO_X_DIA_HORA")
        p_DIA_INICIO = context.Request("p_DIA_INICIO")
        p_DIA_FIN = context.Request("p_DIA_FIN")
        p_HORA_INICIO = context.Request("p_HORA_INICIO")
        p_HORA_FIN = context.Request("p_HORA_FIN")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_RHFATAR_CTLG_CODE = context.Request("Emp")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_MOTIVO = context.Request("p_MOTIVO")
        p_TIPO_FALTA = context.Request("p_TIPO_FALTA")
        p_EST_IND = context.Request("p_EST_IND")
        p_TIPO_JUST = context.Request("p_TIPO_JUST")
        p_TIPO_MOTIVO = context.Request("p_TIPO_MOTIVO")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_HFTIPO_JUST = context.Request("p_HFTIPO_JUST")

        Try
            Select Case Opcion
                Case "L"
                    dt = Empleado.Listar_Empleados_Contrato_Activo(p_CTLG_CODE, String.Empty)
                    'dt = Empleado.Listar_Empleados("0", "0", "A", Empr, Sucur)
                    If Not dt Is Nothing Then
                        For i = 0 To dt.Rows.Count - 1
                            If i = 0 Then
                                resb.Append("<option value='" & dt.Rows(i)("PIDM").ToString() & "' selected>" & dt.Rows(i)("NOMBRE_EMPLEADO").ToString() & "</option>")
                            Else
                                resb.Append("<option value='" & dt.Rows(i)("PIDM").ToString() & "'>" & dt.Rows(i)("NOMBRE_EMPLEADO").ToString() & "</option>")
                            End If

                        Next
                    End If
                    res = resb.ToString()
                Case "I"
                    Dim precede = System.Configuration.ConfigurationManager.AppSettings("PathImageJustificacion")
                    Dim Codigo As String = Crear_Imagen(String.Empty, Cod, precede, Des)
                    Ruta = GrabaImagen(img, context, Codigo & "_" & ".jpg", Codigo)
                    res = Ruta & "," & Des & "," & Codigo
                Case "11"
                    Dim Dthorario As New DataTable
                    Dim bool As Boolean = False
                    context.Response.ContentType = "text/html"
                    If p_PIDM = Nothing Or p_PIDM = "" Then
                        res = "Elija un empleado porfavor."
                    Else
                        Dthorario = New NOMADE.NN.NNPlanilla("Bn").Listar_Horario_Detalle_X_Dia(p_DIA_INICIO, p_PIDM, "N") 'no se encontro llamada a esta opcion "N" fijo
                        If Not Dthorario Is Nothing Then
                            For i As Integer = 0 To Dthorario.Rows.Count - 1
                                If Int(p_HORA_INICIO.Replace(":", "")) >= Int(Dthorario.Rows(i)("HORA_INICIO").ToString().Replace(":", "")) And
                                    Int(p_HORA_INICIO.Replace(":", "")) <= Int(Dthorario.Rows(i)("HORA_FIN").ToString().Replace(":", "")) Then


                                    bool = True
                                    Exit For
                                End If


                            Next

                            If bool Then
                                For i As Integer = 0 To Dthorario.Rows.Count - 1
                                    If Int(p_HORA_INICIO.Replace(":", "")) >= Int(Dthorario.Rows(i)("HORA_INICIO").ToString().Replace(":", "")) And
                                       Int(p_HORA_INICIO.Replace(":", "")) <= Int(Dthorario.Rows(i)("HORA_FIN").ToString().Replace(":", "")) Then

                                        res = Dthorario.Rows(i)("HORA_FIN").ToString()
                                        Exit For

                                    End If
                                Next
                            Else
                                res = "La hora inicio no esta disponible porque esta fuera del rango de su horario."
                            End If

                        Else
                            res = "El empleado no dispone de horario para la fecha seleccionada."
                        End If
                    End If


                Case "R"
                    context.Response.ContentType = "text/html"
                    Dim DTjustificaciones As New DataTable
                    Dim DTcargoConfianza As New DataTable
                    Dim bool As Boolean = True
                    DTcargoConfianza = New Nomade.NC.NCEEmpleado("Bn").Listar_Empleados(p_PIDM, "0", "")

                    If DTcargoConfianza.Rows(0)("IND_CARG_CONFIANZA").ToString.Equals("N") Then
                        If p_PIDM = Nothing Or p_PIDM = "" Then
                            res = "No existe empleado para registrar la justificacion."
                        Else
                            If p_TIPO_X_DIA_HORA = "D" Then
                                If CDate(p_DIA_INICIO) <= CDate(p_DIA_FIN) Then
                                    'FERIADO
                                    Dim DTferiados As New DataTable
                                    Dim bool_feriado As Boolean = True
                                    Dim NumDiasFeriados As Integer = 0
                                    Dim Dthorario As New DataTable
                                    Dthorario = New NOMADE.NS.NSGestionhorarioempleado("Bn").ListarHorarioEmpleado("", p_PIDM, p_CTLG_CODE, "A")
                                    If Not Dthorario Is Nothing Then
                                        If Dthorario.Rows(0)("INC_FERIADOS_IND").ToString() = "NO" Then
                                            DTferiados = New Nomade.NS.NSJustificacion("Bn").LISTAR_CANTIDAD_DIAS_FERIADOS(p_DIA_INICIO, p_DIA_FIN, p_CTLG_CODE, p_SCSL_CODE, "D")
                                            If Not DTferiados Is Nothing Then
                                                NumDiasFeriados = DTferiados.Rows.Count
                                                If CDate(p_DIA_INICIO) = CDate(p_DIA_FIN) Then

                                                    If NumDiasFeriados > 0 Then
                                                        res = "La fecha seleccionada es considerada feriado no laborable < " + DTferiados.Rows(0)("PEVFERC_DESC").ToString() + " >, por favor seleccionar otra fecha"

                                                        bool_feriado = False
                                                    End If

                                                End If
                                            End If
                                        End If
                                    End If




                                    If bool_feriado Then
                                        Dim anio = p_DIA_INICIO.Split("/")(2)
                                        Dim mes = p_DIA_INICIO.Split("/")(1)
                                        Dim dt_resp As New DataTable
                                        dt_resp = New Nomade.NN.NNPlanilla("Bn").Verifica_Generacion_Planilla(p_CTLG_CODE, mes, anio)
                                        res = dt_resp(0)("RESPUESTA").ToString()
                                        'PERIODO
                                        'CDate(p_DIA_INICIO) >= CDate(dt.Rows(0)("FECHA_INI_PERIODO").ToString()) And
                                        'CDate(p_DIA_FIN) <= CDate(dt.Rows(0)("FECHA_FIN_PERIODO").ToString())
                                        If res <> "C" Then

                                            Dim DTjustificaciones_Dia As New DataTable
                                            Dim DTjustificaciones_Hora As New DataTable
                                            bool = True
                                            DTjustificaciones_Dia = New Nomade.NN.NNPlanilla("Bn").Listar_Justificaciones_x_Periodo(p_DIA_INICIO, p_DIA_INICIO, "1", p_PIDM, p_CTLG_CODE)
                                            DTjustificaciones_Hora = New Nomade.NN.NNPlanilla("Bn").Listar_Justificaciones_x_Periodo(p_DIA_INICIO, p_DIA_INICIO, "2", p_PIDM, p_CTLG_CODE)

                                            If Not DTjustificaciones_Dia Is Nothing Then
                                                'JUSTIFICACIONES DIA
                                                For j As Integer = 0 To DTjustificaciones_Dia.Rows.Count - 1
                                                    If CDate(p_DIA_INICIO) >= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                                      CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) Or
                                                      CDate(p_DIA_FIN) >= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                                      CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) Then
                                                        bool = False
                                                        res = "Dias no disponibles porque existe un cruce con la fecha < " + CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) + " - " + CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) + " >"
                                                        Exit Select
                                                    End If
                                                Next

                                            End If

                                            If Not DTjustificaciones_Hora Is Nothing Then
                                                'JUSTIFICACIONES HORA 
                                                For j As Integer = 0 To DTjustificaciones_Hora.Rows.Count - 1
                                                    If CDate(p_DIA_INICIO) >= CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                                      CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_FIN").ToString()) Or
                                                      CDate(p_DIA_FIN) >= CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                                      CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_FIN").ToString()) Then
                                                        bool = False
                                                        res = "Dias no disponibles porque existe un cruce con la fecha < " + CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_INICIO").ToString()) + " - " + CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_FIN").ToString()) + " >"
                                                        Exit Select
                                                    End If
                                                Next
                                            End If





                                            If bool Then
                                                ' res = "OK"
                                                Dim DTbreak As New DataTable
                                                DTbreak = New NOMADE.NN.NNPlanilla("Bn").Listar_Refrigerio_Detalle_X_Dia(p_DIA_INICIO, p_DIA_FIN, p_PIDM, "1", p_CTLG_CODE)
                                                If Not DTbreak Is Nothing Then
                                                    Dim tiempo_total_break = DTbreak.Rows(0)("MINUTOS_BREAK")
                                                    p_MIN_REFRIGERIO = tiempo_total_break.ToString
                                                End If
                                                p_IND_COMPLETADO = "C"

                                                Dim DiasLab = New NOMADE.NN.NNPlanilla("Bn").Listar_dias_laborados_x_empleado(p_DIA_INICIO, p_DIA_FIN, p_PIDM, p_CTLG_CODE)
                                                p_NUM_DIAS_LABORADOS = DiasLab.ToString
                                                p_NUM_DIAS_LABORADOS = Int(p_NUM_DIAS_LABORADOS) - Int(NumDiasFeriados)
                                                If p_NUM_DIAS_LABORADOS <= 0 Then
                                                    res = "No es posible registrar no son dias laborables , por favor seleccionar fechas correctas"
                                                Else

                                                    res = Crea_Justificacion(p_CTLG_CODE,
                                                                        p_SCSL_CODE,
                                                                        p_PIDM,
                                                                        p_TIPO_FALTA,
                                                                        p_DIA_INICIO,
                                                                        p_DIA_FIN,
                                                                        p_HORA_INICIO,
                                                                        p_HORA_FIN,
                                                                        p_MOTIVO,
                                                                        p_EST_IND,
                                                                        p_MIN_REFRIGERIO,
                                                                        p_IND_COMPLETADO,
                                                                        p_NUM_DIAS_LABORADOS,
                                                                        p_TIPO_JUST,
                                                                        p_TIPO_MOTIVO,
                                                                        p_USUA_ID)
                                                End If

                                            End If


                                        Else

                                            ' res = "El rango de fechas seleccionada no se ecuentra dentro del periodo < " + dt.Rows(0)("FECHA_INI_PERIODO").ToString() + " - " + dt.Rows(0)("FECHA_FIN_PERIODO").ToString() + " >"
                                            res = "No es posible registrar dentro del mes seleccionado debido a que la planilla ha sido cerrada !!"

                                        End If
                                    End If

                                Else
                                    res = "Fecha inicio no puede ser mayor o igual a la fecha final."
                                End If




                            ElseIf p_TIPO_X_DIA_HORA = "H" Then

                                Dim Dthorario As New DataTable
                                Dim ind_completo As String = "C"
                                If p_HORA_FIN = Nothing Or p_HORA_FIN = "" Then
                                    ind_completo = "I"
                                    p_HORA_FIN = Devuelve_Hora_Cercana_Horario(p_DIA_INICIO, p_PIDM, p_CTLG_CODE)
                                    If p_HORA_FIN.Split("/")(0).ToString <> "4" Then
                                        res = p_HORA_FIN.Split("/")(1).ToString
                                        Exit Select
                                    Else
                                        p_HORA_FIN = p_HORA_FIN.Split("/")(1).ToString
                                        'Exit Select
                                    End If
                                End If

                                p_DIA_FIN = p_DIA_INICIO





                                'dt = Nothing
                                'dt = New Nomade.NN.NNPlanilla("Bn").Listar_periodo_corte_x_ctlg(p_CTLG_CODE)
                                'If CDate(p_DIA_INICIO) >= CDate(dt.Rows(0)("FECHA_INI_PERIODO").ToString()) And
                                '   CDate(p_DIA_FIN) <= CDate(dt.Rows(0)("FECHA_FIN_PERIODO").ToString()) Then
                                Dim anio = p_DIA_INICIO.Split("/")(2)
                                Dim mes = p_DIA_INICIO.Split("/")(1)
                                Dim dt_resp As New DataTable
                                dt_resp = New Nomade.NN.NNPlanilla("Bn").Verifica_Generacion_Planilla(p_CTLG_CODE, mes, anio)
                                res = dt_resp(0)("RESPUESTA").ToString()
                                'PERIODO
                                'CDate(p_DIA_INICIO) >= CDate(dt.Rows(0)("FECHA_INI_PERIODO").ToString()) And
                                'CDate(p_DIA_FIN) <= CDate(dt.Rows(0)("FECHA_FIN_PERIODO").ToString())
                                If res <> "C" Then

                                    If Int(p_HORA_INICIO.Replace(":", "")) >= Int(p_HORA_FIN.Replace(":", "")) Then
                                        res = "La hora de inicio no debe ser mayor o igual a la hora fin."
                                    Else
                                        'FERIADOS
                                        Dim DTfer_dia As New DataTable
                                        Dim DTfer_medio_dia As New DataTable
                                        Dim DTfer_horas As New DataTable
                                        Dim boo = False
                                        Dthorario = New NOMADE.NS.NSGestionhorarioempleado("Bn").ListarHorarioEmpleado("", p_PIDM, p_CTLG_CODE, "A")
                                        DTfer_dia = New Nomade.NS.NSJustificacion("Bn").LISTAR_CANTIDAD_DIAS_FERIADOS(p_DIA_INICIO, p_DIA_FIN, p_CTLG_CODE, p_SCSL_CODE, "D")
                                        DTfer_medio_dia = New Nomade.NS.NSJustificacion("Bn").LISTAR_CANTIDAD_DIAS_FERIADOS(p_DIA_INICIO, p_DIA_FIN, p_CTLG_CODE, p_SCSL_CODE, "M")
                                        DTfer_horas = New Nomade.NS.NSJustificacion("Bn").LISTAR_CANTIDAD_DIAS_FERIADOS(p_DIA_INICIO, p_DIA_FIN, p_CTLG_CODE, p_SCSL_CODE, "H")


                                        If Not Dthorario Is Nothing Then
                                            If Dthorario.Rows(0)("INC_FERIADOS_IND").ToString() = "NO" Then
                                                If Not DTfer_dia Is Nothing Then
                                                    If DTfer_dia.Rows.Count > 0 Then
                                                        res = "El dia seleccionado es feriado no laborable < " + DTfer_dia.Rows(0)("PEVFERC_DESC").ToString() + " > , por favor seleccionar otra fecha"
                                                        Exit Select
                                                    End If

                                                End If
                                            End If
                                        End If

                                        If Not DTfer_medio_dia Is Nothing Then
                                            For i = 0 To DTfer_medio_dia.Rows.Count - 1
                                                If Int(p_HORA_INICIO.Replace(":", "")) >= Int(DTfer_medio_dia.Rows(i)("PEVFERC_HORA_INICIO").ToString().Replace(":", "")) And
                                                  Int(p_HORA_FIN.Replace(":", "")) <= Int(DTfer_medio_dia.Rows(i)("PEVFERC_HORA_FIN").ToString().Replace(":", "")) Then
                                                    res = "Rango de horas no disponibles por que existe un cruce con horas del feriado < " + DTfer_medio_dia.Rows(i)("PEVFERC_DESC").ToString() + " >"
                                                    boo = True
                                                    Exit For

                                                End If
                                            Next
                                            If boo Then
                                                Exit Select
                                            End If

                                        ElseIf Not DTfer_horas Is Nothing Then
                                            For i = 0 To DTfer_horas.Rows.Count - 1
                                                If Int(p_HORA_INICIO.Replace(":", "")) >= Int(DTfer_horas.Rows(i)("PEVFERC_HORA_INICIO").ToString().Replace(":", "")) And
                                                 Int(p_HORA_FIN.Replace(":", "")) <= Int(DTfer_horas.Rows(i)("PEVFERC_HORA_FIN").ToString().Replace(":", "")) Then
                                                    res = "Rango de horas no disponibles por que existe un cruce con suspension de horas  < " + DTfer_horas.Rows(i)("PEVFERC_DESC").ToString() + " >"
                                                    boo = True
                                                    Exit For

                                                End If
                                            Next
                                            If boo Then
                                                Exit Select
                                            End If

                                        End If





                                        'HORARIO
                                        Dthorario = Nothing
                                        Dthorario = New NOMADE.NN.NNPlanilla("Bn").Listar_Horario_Detalle_X_Dia(p_DIA_INICIO, p_PIDM, p_CTLG_CODE)
                                        If Not Dthorario Is Nothing Then
                                            Dim p_HORA As String = p_HORA_INICIO
                                            Dim bool_H_inicio As Boolean = False
                                            Dim bool_H_fin As Boolean = False
                                            Dim i As Integer = 0
                                            For i = 0 To Dthorario.Rows.Count - 1
                                                If Int(p_HORA.Replace(":", "")) >= Int(Dthorario.Rows(i)("HORA_INICIO").ToString().Replace(":", "")) And
                                                   Int(p_HORA.Replace(":", "")) <= Int(Dthorario.Rows(i)("HORA_FIN").ToString().Replace(":", "")) Then


                                                    If bool_H_inicio = False Then
                                                        p_HORA = p_HORA_FIN
                                                        i = -1
                                                        bool_H_inicio = True
                                                    Else
                                                        bool_H_fin = True
                                                        Exit For

                                                    End If

                                                End If
                                            Next


                                            If bool_H_inicio And bool_H_fin Then
                                                'res = "OK"
                                                Dim DTjustificaciones_Dia As New DataTable
                                                Dim DTjustificaciones_Hora As New DataTable
                                                bool = True
                                                DTjustificaciones_Dia = New Nomade.NN.NNPlanilla("Bn").Listar_Justificaciones_x_Periodo(p_DIA_INICIO, p_DIA_INICIO, "1", p_PIDM, p_CTLG_CODE)
                                                DTjustificaciones_Hora = New Nomade.NN.NNPlanilla("Bn").Listar_Justificaciones_x_Periodo(p_DIA_INICIO, p_DIA_INICIO, "2", p_PIDM, p_CTLG_CODE)

                                                If Not DTjustificaciones_Dia Is Nothing Then
                                                    For j As Integer = 0 To DTjustificaciones_Dia.Rows.Count - 1
                                                        If CDate(p_DIA_INICIO) >= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                                           CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) Or
                                                           CDate(p_DIA_INICIO) >= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                                           CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) Then
                                                            bool = False
                                                            res = "Horas no disponibles porque existe un cruce con la fecha < " + CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) + " - " + CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) + " >"
                                                            'Exit For
                                                            Exit Select
                                                        End If
                                                    Next

                                                End If

                                                If Not DTjustificaciones_Hora Is Nothing Then
                                                    For j As Integer = 0 To DTjustificaciones_Hora.Rows.Count - 1
                                                        If Int(p_HORA_INICIO.Replace(":", "")) > Int(DTjustificaciones_Hora.Rows(j)("RHFATAR_DESDE_HORA").ToString().Replace(":", "")) And
                                                           Int(p_HORA_INICIO.Replace(":", "")) < Int(DTjustificaciones_Hora.Rows(j)("RHFATAR_HASTA_HORA").ToString().Replace(":", "")) Or
                                                           Int(p_HORA_FIN.Replace(":", "")) > Int(DTjustificaciones_Hora.Rows(j)("RHFATAR_DESDE_HORA").ToString().Replace(":", "")) And
                                                           Int(p_HORA_INICIO.Replace(":", "")) < Int(DTjustificaciones_Hora.Rows(j)("RHFATAR_HASTA_HORA").ToString().Replace(":", "")) Then
                                                            bool = False
                                                            res = "Horas no disponibles porque existe un cruce con < " + DTjustificaciones_Hora.Rows(j)("RHFATAR_DESDE_HORA").ToString() + " - " + DTjustificaciones_Hora.Rows(j)("RHFATAR_HASTA_HORA").ToString() + " >"
                                                            'Exit For
                                                            Exit Select
                                                        End If
                                                    Next
                                                End If



                                                If bool Then
                                                    res = "OK"
                                                    Dim DTbreak As New DataTable
                                                    Dim DTbreak_Min As New DataTable
                                                    Dim tiempo_total_break As String = "0"
                                                    DTbreak = New NOMADE.NN.NNPlanilla("Bn").Listar_Refrigerio_Detalle_X_Dia(p_DIA_INICIO, p_DIA_INICIO, p_PIDM, "2", p_CTLG_CODE)
                                                    If Not DTbreak Is Nothing Then

                                                        If Int(DTbreak.Rows(0)("HORA_INICIO").ToString().Replace(":", "")) > Int(p_HORA_INICIO.Replace(":", "")) And
                                                           Int(DTbreak.Rows(0)("HORA_FIN").ToString().Replace(":", "")) < Int(p_HORA_FIN.Replace(":", "")) Then
                                                            DTbreak_Min = New NOMADE.NN.NNPlanilla("Bn").Listar_Refrigerio_Detalle_X_Dia(p_DIA_INICIO, p_DIA_INICIO, p_PIDM, "1", p_CTLG_CODE)
                                                            tiempo_total_break = DTbreak_Min.Rows(0)("MINUTOS_BREAK").ToString
                                                        End If
                                                    End If

                                                    'Dim DiasLab = New Nomade.NN.NNPlanilla("Bn").Listar_dias_laborados_x_empleado(p_DIA_INICIO, p_DIA_FIN, p_PIDM)
                                                    'p_NUM_DIAS_LABORADOS = DiasLab.ToString

                                                    p_MIN_REFRIGERIO = tiempo_total_break
                                                    'crea la justificacion
                                                    res = Crea_Justificacion(p_CTLG_CODE,
                                                                   p_SCSL_CODE,
                                                                   p_PIDM,
                                                                   p_TIPO_FALTA,
                                                                   p_DIA_INICIO,
                                                                   p_DIA_FIN,
                                                                   p_HORA_INICIO,
                                                                   p_HORA_FIN,
                                                                   p_MOTIVO,
                                                                   p_EST_IND,
                                                                   p_MIN_REFRIGERIO,
                                                                   ind_completo,
                                                                   Nothing,
                                                                   p_TIPO_JUST,
                                                                   p_TIPO_MOTIVO,
                                                                   p_USUA_ID)

                                                End If

                                            Else
                                                res = "El rango de horas seleccionada no esta disponible porque esta fuera del rango de su horario."
                                            End If
                                        Else
                                            res = "El empleado no dispone de horario para la fecha seleccionada."
                                        End If


                                    End If


                                Else
                                    'res = "La fecha seleccionada no se ecuentra dentro del periodo < " + dt.Rows(0)("FECHA_INI_PERIODO").ToString() + " - " + dt.Rows(0)("FECHA_FIN_PERIODO").ToString() + " >"
                                    res = "No es posible registrar dentro del mes seleccionado debido a que la planilla ha sido cerrada !!"
                                End If
                            End If
                        End If
                    Else
                        res = "El empleado seleccionado posee un cargo de confianza para el cual no es necesario registrarle permisos."
                    End If

                Case "M"
                    context.Response.ContentType = "text/html"
                    Dim DTjustificaciones As New DataTable
                    Dim bool As Boolean = True
                    dt = Nothing
                    dt = Justificacion.Listar_Imagen(p_CODIGO)

                    If Not dt Is Nothing Then
                        If dt.Rows.Count > 0 Then
                            If p_TIPO_JUST = "TJU3" Then
                                res = "Por favor antes de actualizar , ELIMINAR! los archivos existentes para la justificacion"
                                Exit Select
                            End If

                        End If
                    End If


                    dt = Nothing

                    If p_TIPO_X_DIA_HORA = "D" Then
                        If CDate(p_DIA_INICIO) <= CDate(p_DIA_FIN) Then
                            'FERIADO
                            Dim DTferiados As New DataTable
                            Dim bool_feriado As Boolean = True
                            Dim NumDiasFeriados As Integer = 0
                            Dim Dthorario As New DataTable
                            Dthorario = New NOMADE.NS.NSGestionhorarioempleado("Bn").ListarHorarioEmpleado("", p_PIDM, p_CTLG_CODE, "A")
                            If Not Dthorario Is Nothing Then
                                If Dthorario.Rows(0)("INC_FERIADOS_IND").ToString() = "NO" Then
                                    DTferiados = New Nomade.NS.NSJustificacion("Bn").LISTAR_CANTIDAD_DIAS_FERIADOS(p_DIA_INICIO, p_DIA_FIN, p_CTLG_CODE, p_SCSL_CODE, "D")
                                    If Not DTferiados Is Nothing Then
                                        NumDiasFeriados = DTferiados.Rows.Count
                                        If CDate(p_DIA_INICIO) = CDate(p_DIA_FIN) Then

                                            If NumDiasFeriados > 0 Then
                                                res = "La fecha seleccionada es considerado feriado no laborable < " + DTferiados.Rows(0)("PEVFERC_DESC").ToString() + " >, por favor seleccionar otra fecha"

                                                bool_feriado = False
                                            End If

                                        End If
                                    End If
                                End If
                            End If



                            'PERIODO
                            If bool_feriado Then
                                'dt = New Nomade.NN.NNPlanilla("Bn").Listar_periodo_corte_x_ctlg(p_CTLG_CODE)
                                'If CDate(p_DIA_INICIO) >= CDate(dt.Rows(0)("FECHA_INI_PERIODO").ToString()) And
                                '   CDate(p_DIA_FIN) <= CDate(dt.Rows(0)("FECHA_FIN_PERIODO").ToString()) Then
                                Dim anio = p_DIA_INICIO.Split("/")(2)
                                Dim mes = p_DIA_INICIO.Split("/")(1)
                                Dim dt_resp As New DataTable
                                dt_resp = New Nomade.NN.NNPlanilla("Bn").Verifica_Generacion_Planilla(p_CTLG_CODE, mes, anio)
                                res = dt_resp(0)("RESPUESTA").ToString()
                                'PERIODO
                                'CDate(p_DIA_INICIO) >= CDate(dt.Rows(0)("FECHA_INI_PERIODO").ToString()) And
                                'CDate(p_DIA_FIN) <= CDate(dt.Rows(0)("FECHA_FIN_PERIODO").ToString())
                                If res <> "C" Then
                                    Dim DTjustificaciones_Dia As New DataTable
                                    Dim DTjustificaciones_Hora As New DataTable
                                    bool = True
                                    DTjustificaciones_Dia = New Nomade.NN.NNPlanilla("Bn").Listar_Justificaciones_x_Periodo(p_DIA_INICIO, p_DIA_INICIO, "1", p_PIDM, p_CTLG_CODE)
                                    DTjustificaciones_Hora = New Nomade.NN.NNPlanilla("Bn").Listar_Justificaciones_x_Periodo(p_DIA_INICIO, p_DIA_INICIO, "2", p_PIDM, p_CTLG_CODE)

                                    If Not DTjustificaciones_Dia Is Nothing Then
                                        'elimino del dt el codigo del que voi a modificar para luego continuar con las validaciones
                                        For j As Integer = 0 To DTjustificaciones_Dia.Rows.Count - 1
                                            If DTjustificaciones_Dia.Rows(j)("RHFATAR_CODE").ToString().Equals(p_CODIGO) Then
                                                DTjustificaciones_Dia.Rows.RemoveAt(j)
                                                Exit For
                                            End If

                                        Next


                                        For j As Integer = 0 To DTjustificaciones_Dia.Rows.Count - 1
                                            If CDate(p_DIA_INICIO) >= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                              CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) Or
                                              CDate(p_DIA_FIN) >= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                              CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) Then
                                                bool = False
                                                res = "Dias no disponibles porque existe un cruce con la fecha < " + CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) + " - " + CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) + " >"
                                                'Exit For
                                                Exit Select
                                            End If
                                        Next

                                    End If

                                    If Not DTjustificaciones_Hora Is Nothing Then
                                        For j As Integer = 0 To DTjustificaciones_Hora.Rows.Count - 1
                                            If CDate(p_DIA_INICIO) >= CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                              CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_FIN").ToString()) Or
                                              CDate(p_DIA_FIN) >= CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                              CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_FIN").ToString()) Then
                                                bool = False
                                                res = "Dias no disponibles porque existe un cruce con la fecha < " + CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_INICIO").ToString()) + " - " + CDate(DTjustificaciones_Hora.Rows(j)("RHFATAR_DIA_FIN").ToString()) + " >"
                                                'Exit For
                                                Exit Select
                                            End If
                                        Next
                                    End If





                                    If bool Then
                                        ' res = "OK"
                                        Dim DTbreak As New DataTable
                                        DTbreak = New NOMADE.NN.NNPlanilla("Bn").Listar_Refrigerio_Detalle_X_Dia(p_DIA_INICIO, p_DIA_FIN, p_PIDM, "1", p_CTLG_CODE)
                                        If Not DTbreak Is Nothing Then
                                            Dim tiempo_total_break = DTbreak.Rows(0)("MINUTOS_BREAK")
                                            p_MIN_REFRIGERIO = tiempo_total_break.ToString
                                        End If
                                        p_IND_COMPLETADO = "C"

                                        Dim DiasLab = New NOMADE.NN.NNPlanilla("Bn").Listar_dias_laborados_x_empleado(p_DIA_INICIO, p_DIA_FIN, p_PIDM, p_CTLG_CODE)
                                        p_NUM_DIAS_LABORADOS = DiasLab.ToString
                                        p_NUM_DIAS_LABORADOS = Int(p_NUM_DIAS_LABORADOS) - Int(NumDiasFeriados)
                                        If p_NUM_DIAS_LABORADOS <= 0 Then
                                            res = "No es posible registrar no son dias laborables , por favor seleccionar fechas correctas"
                                        Else
                                            'modifica
                                            res = Modificar_Justificacion(p_CODIGO,
                                                                          Nothing,
                                                                          p_DIA_FIN,
                                                                          p_DIA_INICIO,
                                                                          p_EST_IND,
                                                                          Nothing,
                                                                          p_MIN_REFRIGERIO,
                                                                          "C",
                                                                          p_MOTIVO,
                                                                          p_NUM_DIAS_LABORADOS,
                                                                          p_TIPO_FALTA,
                                                                          p_TIPO_JUST,
                                                                          p_TIPO_MOTIVO,
                                                                          p_USUA_ID)
                                        End If



                                    End If


                                Else

                                    'res = "El rango de fechas seleccionada no se ecuentra dentro del periodo < " + dt.Rows(0)("FECHA_INI_PERIODO").ToString() + " - " + dt.Rows(0)("FECHA_FIN_PERIODO").ToString() + " >"
                                    res = "No es posible registrar dentro del mes seleccionado debido a que la planilla ha sido cerrada !!"

                                End If

                            End If
                        Else
                            res = "Fecha inicio no puede ser mayor o igual a la fecha final."
                        End If




                    ElseIf p_TIPO_X_DIA_HORA = "H" Then

                        Dim Dthorario As New DataTable
                        Dim ind_completo As String = "C"
                        If p_HORA_FIN = Nothing Or p_HORA_FIN = "" Then
                            ind_completo = "I"
                            p_HORA_FIN = Devuelve_Hora_Cercana_Horario(p_DIA_INICIO, p_PIDM, p_CTLG_CODE)
                            If p_HORA_FIN.Split("/")(0).ToString <> "4" Then
                                res = p_HORA_FIN.Split("/")(1).ToString
                                Exit Select
                            Else
                                p_HORA_FIN = p_HORA_FIN.Split("/")(1).ToString
                                'Exit Select
                            End If
                        End If

                        p_DIA_FIN = p_DIA_INICIO





                        '    dt = Nothing
                        'dt = New Nomade.NN.NNPlanilla("Bn").Listar_periodo_corte_x_ctlg(p_CTLG_CODE)
                        Dim anio = p_DIA_INICIO.Split("/")(2)
                        Dim mes = p_DIA_INICIO.Split("/")(1)
                        Dim dt_resp As New DataTable
                        dt_resp = New Nomade.NN.NNPlanilla("Bn").Verifica_Generacion_Planilla(p_CTLG_CODE, mes, anio)
                        res = dt_resp(0)("RESPUESTA").ToString()
                        'PERIODO
                        'CDate(p_DIA_INICIO) >= CDate(dt.Rows(0)("FECHA_INI_PERIODO").ToString()) And
                        'CDate(p_DIA_FIN) <= CDate(dt.Rows(0)("FECHA_FIN_PERIODO").ToString())
                        If res <> "C" Then
                            'If CDate(p_DIA_INICIO) >= CDate(dt.Rows(0)("FECHA_INI_PERIODO").ToString()) And
                            '   CDate(p_DIA_FIN) <= CDate(dt.Rows(0)("FECHA_FIN_PERIODO").ToString()) Then

                            If Int(p_HORA_INICIO.Replace(":", "")) >= Int(p_HORA_FIN.Replace(":", "")) Then
                                res = "La hora de inicio no debe ser mayor o igual a la hora fin."
                            Else
                                'FERIADOS
                                Dim DTfer_dia As New DataTable
                                Dim DTfer_medio_dia As New DataTable
                                Dim DTfer_horas As New DataTable
                                Dim boo = False
                                Dthorario = New NOMADE.NS.NSGestionhorarioempleado("Bn").ListarHorarioEmpleado("", p_PIDM, p_CTLG_CODE, "A")
                                DTfer_dia = New Nomade.NS.NSJustificacion("Bn").LISTAR_CANTIDAD_DIAS_FERIADOS(p_DIA_INICIO, p_DIA_FIN, p_CTLG_CODE, p_SCSL_CODE, "D")
                                DTfer_medio_dia = New Nomade.NS.NSJustificacion("Bn").LISTAR_CANTIDAD_DIAS_FERIADOS(p_DIA_INICIO, p_DIA_FIN, p_CTLG_CODE, p_SCSL_CODE, "M")
                                DTfer_horas = New Nomade.NS.NSJustificacion("Bn").LISTAR_CANTIDAD_DIAS_FERIADOS(p_DIA_INICIO, p_DIA_FIN, p_CTLG_CODE, p_SCSL_CODE, "H")


                                If Not Dthorario Is Nothing Then
                                    If Dthorario.Rows(0)("INC_FERIADOS_IND").ToString() = "NO" Then
                                        If Not DTfer_dia Is Nothing Then
                                            If DTfer_dia.Rows.Count > 0 Then
                                                res = "El dia seleccionado es feriado no laborable < " + DTfer_dia.Rows(0)("PEVFERC_DESC").ToString() + " > , por favor seleccionar otra fecha"
                                                Exit Select
                                            End If

                                        End If
                                    End If
                                End If

                                If Not DTfer_medio_dia Is Nothing Then
                                    For i = 0 To DTfer_medio_dia.Rows.Count - 1
                                        If Int(p_HORA_INICIO.Replace(":", "")) >= Int(DTfer_medio_dia.Rows(i)("PEVFERC_HORA_INICIO").ToString().Replace(":", "")) And
                                          Int(p_HORA_FIN.Replace(":", "")) <= Int(DTfer_medio_dia.Rows(i)("PEVFERC_HORA_FIN").ToString().Replace(":", "")) Then
                                            res = "Rango de horas no disponibles por que existe un cruce con horas del feriado < " + DTfer_medio_dia.Rows(i)("PEVFERC_DESC").ToString() + " >"
                                            boo = True
                                            Exit For

                                        End If
                                    Next
                                    If boo Then
                                        Exit Select
                                    End If

                                ElseIf Not DTfer_horas Is Nothing Then
                                    For i = 0 To DTfer_horas.Rows.Count - 1
                                        If Int(p_HORA_INICIO.Replace(":", "")) >= Int(DTfer_horas.Rows(i)("PEVFERC_HORA_INICIO").ToString().Replace(":", "")) And
                                         Int(p_HORA_FIN.Replace(":", "")) <= Int(DTfer_horas.Rows(i)("PEVFERC_HORA_FIN").ToString().Replace(":", "")) Then
                                            res = "Rango de horas no disponibles por que existe un cruce con suspension de horas  < " + DTfer_horas.Rows(i)("PEVFERC_DESC").ToString() + " >"
                                            boo = True
                                            Exit For

                                        End If
                                    Next
                                    If boo Then
                                        Exit Select
                                    End If

                                End If


                                'HORARIO
                                Dthorario = Nothing
                                Dthorario = New NOMADE.NN.NNPlanilla("Bn").Listar_Horario_Detalle_X_Dia(p_DIA_INICIO, p_PIDM, p_CTLG_CODE)
                                If Not Dthorario Is Nothing Then
                                    Dim p_HORA As String = p_HORA_INICIO
                                    Dim bool_H_inicio As Boolean = False
                                    Dim bool_H_fin As Boolean = False
                                    Dim i As Integer = 0
                                    For i = 0 To Dthorario.Rows.Count - 1
                                        If Int(p_HORA.Replace(":", "")) >= Int(Dthorario.Rows(i)("HORA_INICIO").ToString().Replace(":", "")) And
                                           Int(p_HORA.Replace(":", "")) <= Int(Dthorario.Rows(i)("HORA_FIN").ToString().Replace(":", "")) Then


                                            If bool_H_inicio = False Then
                                                p_HORA = p_HORA_FIN
                                                i = -1
                                                bool_H_inicio = True
                                            Else
                                                bool_H_fin = True
                                                Exit For

                                            End If

                                        End If
                                    Next


                                    If bool_H_inicio And bool_H_fin Then
                                        'res = "OK"
                                        Dim DTjustificaciones_Dia As New DataTable
                                        Dim DTjustificaciones_Hora As New DataTable
                                        bool = True
                                        DTjustificaciones_Dia = New Nomade.NN.NNPlanilla("Bn").Listar_Justificaciones_x_Periodo(p_DIA_INICIO, p_DIA_INICIO, "1", p_PIDM, p_CTLG_CODE)
                                        DTjustificaciones_Hora = New Nomade.NN.NNPlanilla("Bn").Listar_Justificaciones_x_Periodo(p_DIA_INICIO, p_DIA_INICIO, "2", p_PIDM, p_CTLG_CODE)

                                        If Not DTjustificaciones_Dia Is Nothing Then
                                            For j As Integer = 0 To DTjustificaciones_Dia.Rows.Count - 1
                                                If CDate(p_DIA_INICIO) >= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                                   CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) Or
                                                   CDate(p_DIA_INICIO) >= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) And
                                                   CDate(p_DIA_INICIO) <= CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) Then
                                                    bool = False
                                                    res = "Horas no disponibles porque existe un cruce con la fecha < " + CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_INICIO").ToString()) + " - " + CDate(DTjustificaciones_Dia.Rows(j)("RHFATAR_DIA_FIN").ToString()) + " >"
                                                    'Exit For
                                                    Exit Select
                                                End If
                                            Next

                                        End If

                                        If Not DTjustificaciones_Hora Is Nothing Then
                                            'elimino del dt el codigo del que voi a modificar para luego continuar con las validaciones
                                            For j As Integer = 0 To DTjustificaciones_Hora.Rows.Count - 1
                                                If DTjustificaciones_Hora.Rows(j)("RHFATAR_CODE").ToString().Equals(p_CODIGO) Then
                                                    DTjustificaciones_Hora.Rows.RemoveAt(j)
                                                    Exit For
                                                End If

                                            Next


                                            For j As Integer = 0 To DTjustificaciones_Hora.Rows.Count - 1
                                                If Int(p_HORA_INICIO.Replace(":", "")) > Int(DTjustificaciones_Hora.Rows(j)("RHFATAR_DESDE_HORA").ToString().Replace(":", "")) And
                                                   Int(p_HORA_INICIO.Replace(":", "")) < Int(DTjustificaciones_Hora.Rows(j)("RHFATAR_HASTA_HORA").ToString().Replace(":", "")) Or
                                                   Int(p_HORA_FIN.Replace(":", "")) > Int(DTjustificaciones_Hora.Rows(j)("RHFATAR_DESDE_HORA").ToString().Replace(":", "")) And
                                                   Int(p_HORA_INICIO.Replace(":", "")) < Int(DTjustificaciones_Hora.Rows(j)("RHFATAR_HASTA_HORA").ToString().Replace(":", "")) Then
                                                    bool = False
                                                    res = "Horas no disponibles porque existe un cruce con < " + DTjustificaciones_Hora.Rows(j)("RHFATAR_DESDE_HORA").ToString() + " - " + DTjustificaciones_Hora.Rows(j)("RHFATAR_HASTA_HORA").ToString() + " >"
                                                    'Exit For
                                                    Exit Select
                                                End If
                                            Next
                                        End If



                                        If bool Then
                                            res = "OK"
                                            Dim DTbreak As New DataTable
                                            Dim DTbreak_Min As New DataTable
                                            Dim tiempo_total_break As String = "0"
                                            DTbreak = New NOMADE.NN.NNPlanilla("Bn").Listar_Refrigerio_Detalle_X_Dia(p_DIA_INICIO, p_DIA_INICIO, p_PIDM, "2", p_CTLG_CODE)
                                            If Not DTbreak Is Nothing Then

                                                If Int(DTbreak.Rows(0)("HORA_INICIO").ToString().Replace(":", "")) > Int(p_HORA_INICIO.Replace(":", "")) And
                                                   Int(DTbreak.Rows(0)("HORA_FIN").ToString().Replace(":", "")) < Int(p_HORA_FIN.Replace(":", "")) Then
                                                    DTbreak_Min = New NOMADE.NN.NNPlanilla("Bn").Listar_Refrigerio_Detalle_X_Dia(p_DIA_INICIO, p_DIA_INICIO, p_PIDM, "1", p_CTLG_CODE)
                                                    tiempo_total_break = DTbreak_Min.Rows(0)("MINUTOS_BREAK").ToString
                                                End If
                                            End If

                                            'Dim DiasLab = New Nomade.NN.NNPlanilla("Bn").Listar_dias_laborados_x_empleado(p_DIA_INICIO, p_DIA_FIN, p_PIDM)
                                            'p_NUM_DIAS_LABORADOS = DiasLab.ToString

                                            p_MIN_REFRIGERIO = tiempo_total_break
                                            'modifica la justificacion
                                            res = Modificar_Justificacion(p_CODIGO,
                                                                  p_HORA_INICIO,
                                                                  p_DIA_FIN,
                                                                  p_DIA_INICIO,
                                                                  p_EST_IND,
                                                                  p_HORA_FIN,
                                                                  p_MIN_REFRIGERIO,
                                                                 ind_completo,
                                                                  p_MOTIVO,
                                                                  Nothing,
                                                                  p_TIPO_FALTA,
                                                                  p_TIPO_JUST,
                                                                  p_TIPO_MOTIVO,
                                                                  p_USUA_ID)

                                        End If

                                    Else
                                        res = "El rango de horas seleccionada no esta disponible porque esta fuera del rango de su horario."
                                    End If
                                Else
                                    res = "El empleado no dispone de horario para la fecha seleccionada."
                                End If


                            End If


                        Else
                            ' res = "La fecha seleccionada no se ecuentra dentro del periodo < " + dt.Rows(0)("FECHA_INI_PERIODO").ToString() + " - " + dt.Rows(0)("FECHA_FIN_PERIODO").ToString() + " >"
                            res = "No es posible registrar dentro del mes seleccionado debido a que la planilla ha sido cerrada !!"
                        End If
                    End If




                        'res = Modificar_Justificacion(Cod, p_RHFATAR_PPBIDEN_PIDM,
                        '               Nom, Tipo_Justi, p_RHFATAR_DIA_INICIO,
                        '               p_RHFATAR_DIA_FIN, p_RHFATAR_DESDE_HORA,
                        '               p_RHFATAR_HASTA_HORA, p_RHFATAR_TIPO,
                        '               p_RHFATAR_MOTIVO, Usuario,
                        '                Est, String.Empty, p_TP)


                Case "E"
                    Cod = context.Request("id")

                    res = Justificacion.Actualizar_Imagen(Cod, String.Empty, String.Empty, String.Empty, "1")


                    Dim savepath As String = "" 'path fisico del server
                    Dim tempPath As String = "" 'path ../../ para src
                    tempPath = System.Configuration.ConfigurationManager.AppSettings("PathImageJustificacion") 'ruta en el web config
                    savepath = context.Server.MapPath(tempPath)


                    Dim filename As String = Cod
                    'If Not Directory.Exists(savepath) Then
                    '    Directory.CreateDirectory(savepath)
                    'End If

                    'img.SaveAs(savepath & "\" & filename)

                    Dim Archivo As String = savepath & "\" & filename & "_.jpg"

                    File.Delete(Archivo)

                Case "22" 'Lista tipos de justificaciones
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NS.NSJustificacion("Bn").Listar_tipo_motivo_just("", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")


                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "P" 'Lista tipos de justificaciones
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCParametros("Bn").ListarParametros("", "", "TJU")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")


                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "10" 'Lista empleados contrato activo
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCEEmpleado("Bn").Listar_Empleados_Contrato_Activo(Empr, IIf(Sucur = "T", "", Sucur))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """")


                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case Else
            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write(ex.Message)

        End Try


    End Sub



    Public Function Crea_Justificacion(p_CTLG_CODE As String,
                                         p_SCSL_CODE As String,
                                         p_PIDM As String,
                                         p_TIPO_FALTA As String,
                                         p_DIA_INICIO As String,
                                         p_DIA_FIN As String,
                                         p_DESDE_HORA As String,
                                         p_HASTA_HORA As String,
                                         p_MOTIVO As String,
                                         p_EST_IND As String,
                                         p_MIN_REFRIGERIO As String,
                                         p_IND_COMPLETADO As String,
                                         p_NUM_DIAS_LABORADOS As String,
                                         p_TIPO_JUST As String,
                                         p_TIPO_MOTIVO As String,
                                         p_USUA_ID As String) As String

        Dim msg As String = ""

        Try
            Dim NSJustificacion As New Nomade.NS.NSJustificacion("Bn")
            msg = NSJustificacion.Crear_Justificacion(p_CTLG_CODE,
                                                    p_SCSL_CODE,
                                                    p_PIDM,
                                                    p_TIPO_FALTA,
                                                    p_DIA_INICIO,
                                                    p_DIA_FIN,
                                                    IIf(p_DESDE_HORA = "", Nothing, p_DESDE_HORA),
                                                    IIf(p_HASTA_HORA = "", Nothing, p_HASTA_HORA),
                                                    p_MOTIVO,
                                                    p_EST_IND,
                                                    p_MIN_REFRIGERIO,
                                                    p_IND_COMPLETADO,
                                                    p_NUM_DIAS_LABORADOS,
                                                    p_TIPO_JUST,
                                                    p_TIPO_MOTIVO,
                                                    p_USUA_ID)
            msg = msg + ",OK"
            NSJustificacion = Nothing
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
    Public Function Crear_Imagen(ByVal p_RHIMFTR_CODE As String, ByVal p_RHIMFTR_RHFATAR_CODE As String,
                                   ByVal p_RHIMFTR_RUTA As String, ByVal p_RHIMFTR_DESCRIPCION As String) As String
        Dim cResultado As String = ""
        cResultado = Justificacion.Crear_Imagen(p_RHIMFTR_CODE, p_RHIMFTR_RHFATAR_CODE, p_RHIMFTR_RUTA, p_RHIMFTR_DESCRIPCION)
        Return cResultado
    End Function
    'Public Function Registrar_Justificacion(ByVal p_RHFATAR_CODE As String, ByVal p_RHFATAR_CTLG_CODE As String, ByVal p_RHFATAR_FTVSCSL_CODE As String,
    '                               ByVal p_RHFATAR_PERIODO As String, ByVal p_RHFATAR_PPBIDEN_PIDM As String,
    '                               ByVal p_RHFATAR_NOMBRE As String, ByVal p_RHFATAR_TIPO_FALTA As String, ByVal p_RHFATAR_DIA_INICIO As String,
    '                               ByVal p_RHFATAR_DIA_FIN As String, ByVal p_RHFATAR_DESDE_HORA As String,
    '                               ByVal p_RHFATAR_HASTA_HORA As String, ByVal p_RHFATAR_TIPO As String,
    '                               ByVal p_RHFATAR_MOTIVO As String, ByVal p_RHFATAR_USUA_ID As String,
    '                               ByVal p_SALIDA As String, ByVal p_TP As String) As String
    '    Dim cResultado As String = ""
    '    cResultado = Justificacion.Crear_Justificacion(p_RHFATAR_CODE, p_RHFATAR_CTLG_CODE, p_RHFATAR_FTVSCSL_CODE, p_RHFATAR_PERIODO, p_RHFATAR_PPBIDEN_PIDM,
    '                                p_RHFATAR_NOMBRE, p_RHFATAR_TIPO_FALTA, p_RHFATAR_DIA_INICIO, p_RHFATAR_DIA_FIN, p_RHFATAR_DESDE_HORA,
    '                                p_RHFATAR_HASTA_HORA, p_RHFATAR_TIPO, p_RHFATAR_MOTIVO, p_RHFATAR_USUA_ID, p_SALIDA, p_TP)
    '    Return cResultado
    'End Function
    Public Function Modificar_Justificacion(ByVal p_CODE As String, ByVal p_DESDE_HORA As String,
                                       ByVal p_DIA_FIN As String, ByVal p_DIA_INICIO As String, ByVal p_EST_IND As String,
                                       ByVal p_HASTA_HORA As String, ByVal p_MIN_REFRIGERIO As String,
                                       ByVal p_IND_COMPLETADO As String, ByVal p_MOTIVO As String,
                                       ByVal p_NUM_DIAS_LAB As String, ByVal p_TIPO_FALTA As String,
                                        ByVal p_TIPO_JUST As String, ByVal p_TIPO_MOTIVO As String, ByVal p_USUA_ID As String) As String
        Dim cResultado As String = ""
        cResultado = Justificacion.Actualizar_Justificacion(p_CODE,
                                                            p_DESDE_HORA,
                                                            p_DIA_FIN,
                                                            p_DIA_INICIO,
                                                            p_EST_IND,
                                                           p_HASTA_HORA,
                                                            p_MIN_REFRIGERIO,
                                                            p_IND_COMPLETADO,
                                                            p_MOTIVO,
                                                            p_NUM_DIAS_LAB,
                                                            p_TIPO_FALTA,
                                                                p_TIPO_JUST,
                                                                p_TIPO_MOTIVO,
                                                                p_USUA_ID)
        Return cResultado
    End Function
    Public Function GrabaImagen(ByVal img As HttpPostedFile, ByVal context As HttpContext, ByVal nombrearch As String, ByVal Codi As String) As String
        Dim rp As String = String.Empty
        Try

            Dim savepath As String = "" 'path fisico del server
            Dim tempPath As String = "" 'path ../../ para src
            tempPath = System.Configuration.ConfigurationManager.AppSettings("PathImageJustificacion") 'ruta en el web config
            savepath = context.Server.MapPath(tempPath)


            Dim filename As String = nombrearch
            If Not Directory.Exists(savepath) Then
                Directory.CreateDirectory(savepath)
            End If

            img.SaveAs(savepath & "\" & filename)
            'context.Response.Write(tempPath & "/" & filename)
            rp = tempPath & "/" & filename
            context.Response.StatusCode = 200

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try



        Return rp
    End Function


    Public Function CaculaDif_Hora(hora_ini As String, hora_fin As String) As Integer

        Dim hora_ini_minutos As Integer = 0
        Dim hora_fin_minutos As Integer = 0
        Dim Minutos_ini_break As String = ""
        Dim Minutos_fin_break As String = ""
        Dim hora_ini_break As String = hora_ini
        Dim hora_fin_break As String = hora_fin

        hora_ini_break = hora_ini_break.Split(":")(0)
        Minutos_ini_break = hora_ini_break.Split(":")(1)
        hora_ini_minutos = Int(hora_ini_break) * 60 + Int(Minutos_ini_break)

        hora_fin_break = hora_fin_break.Split(":")(0)
        Minutos_fin_break = hora_fin_break.Split(":")(1)
        hora_fin_minutos = Int(hora_fin_break) * 60 + Int(Minutos_fin_break)


        Dim Minutos_total_break As Integer = hora_fin_minutos - hora_ini_minutos


        Return Minutos_total_break
    End Function


    Public Function Devuelve_Hora_Cercana_Horario(p_DIA_INICIO As String, p_PIDM As String, p_CTLG_CODE As String) As String

        Dim Dthorario As New DataTable
        Dim bool As Boolean = False

        If p_PIDM = Nothing Or p_PIDM = "" Then
            res = "1/Elija un empleado porfavor."
        Else
            Dthorario = New NOMADE.NN.NNPlanilla("Bn").Listar_Horario_Detalle_X_Dia(p_DIA_INICIO, p_PIDM, p_CTLG_CODE)
            If Not Dthorario Is Nothing Then
                For i As Integer = 0 To Dthorario.Rows.Count - 1
                    If Int(p_HORA_INICIO.Replace(":", "")) >= Int(Dthorario.Rows(i)("HORA_INICIO").ToString().Replace(":", "")) And
                        Int(p_HORA_INICIO.Replace(":", "")) <= Int(Dthorario.Rows(i)("HORA_FIN").ToString().Replace(":", "")) Then


                        bool = True
                        Exit For
                    End If


                Next

                If bool Then
                    For i As Integer = 0 To Dthorario.Rows.Count - 1
                        If Int(p_HORA_INICIO.Replace(":", "")) >= Int(Dthorario.Rows(i)("HORA_INICIO").ToString().Replace(":", "")) And
                           Int(p_HORA_INICIO.Replace(":", "")) <= Int(Dthorario.Rows(i)("HORA_FIN").ToString().Replace(":", "")) Then

                            res = "4/" + Dthorario.Rows(i)("HORA_FIN").ToString()
                            Exit For

                        End If
                    Next
                Else
                    res = "2/La hora inicio no esta disponible porque esta fuera del rango de su horario."
                End If

            Else
                res = "3/El empleado no dispone de horario para la fecha seleccionada."
            End If
        End If
        Return res
    End Function

End Class
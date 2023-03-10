<%@ WebHandler Language="VB" Class="NSLAPHO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSLAPHO : Implements IHttpHandler

    Dim Periodo As New Nomade.NF.NFPeriodo("Bn")
    Dim Extra As New Nomade.NS.NSExtras("Bn")
    'Dim Extra As New Nomade.NS.
    'Dim Extra As New Nomade.NS.
    Dim resb As New StringBuilder
    Dim res As String
    Dim Codigo As String
    Dim dt As DataTable
    Dim Opcion, Empr, Sucur, Peri, USUA_ID As String
    Dim PIDM, MES, ANIO, ESTADO, p_DETALLE As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Opcion = context.Request("Opcion")
        Empr = context.Request("Emp")
        Sucur = context.Request("Suc")
        Peri = context.Request("Peri")

        PIDM = context.Request("PIDM")
        MES = context.Request("MES")

        ANIO = context.Request("ANIO")
        ESTADO = context.Request("ESTADO")
        p_DETALLE = context.Request("p_DETALLE")

        Try
            Select Case Opcion
                Case "0"
                    'context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New DataTable
                    dt = Periodo.Listar_Periodo("", "", "")
                    Dim Fecha As String = ""
                    If Not (dt Is Nothing) Then
                        For i = 0 To dt.Rows.Count - 1
                            Fecha = dt.Rows(0)("CODIGO").ToString()
                        Next

                    End If
                    res = Fecha
                Case "X"
                    Codigo = context.Request("Codigo")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'dt = Extra.Listar_Hora_Extra(Codigo, String.Empty, String.Empty, String.Empty)
                    dt = Extra.Listar_Hora_Extra(String.Empty, IIf(Empr Is Nothing, String.Empty, Empr), String.Empty, String.Empty, IIf(PIDM = "null", Nothing, PIDM), If(Sucur Is Nothing, String.Empty, Sucur), String.Empty, MES, ANIO)
                    If Not (dt Is Nothing) Then

                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            Dim FecUno As String = MiDataRow("RHAPRHO_FEC_PRO").ToString
                            Dim FecDos As String = MiDataRow("RHAPRHO_FEC_ACT").ToString
                            Dim Estado As String = ""

                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("RHAPRHO_CODE").ToString & """,")
                            resb.Append("""EMPLEADO"" :" & """" & MiDataRow("EMP").ToString & """,")
                            resb.Append("""FECHA_PROCESO"" :" & """" & IIf(FecUno <> "", FecUno.Substring(0, 10), "") & """,")

                            If FecDos = "" Then
                                resb.Append("""FECHA_ACT"" :" & """" & "" & """,")
                            Else
                                resb.Append("""FECHA_ACT"" :" & """" & (Utilities.fechaLocal(FecDos.Substring(0, 10))) & """,")
                            End If
                            resb.Append("""INICIO"" :" & """" & MiDataRow("RHAPRHO_HOR_NI").ToString & """,")
                            resb.Append("""FIN"" :" & """" & MiDataRow("RHAPRHO_HOR_FIN").ToString & """,")
                            resb.Append("""SOLICITA"" :" & """" & MiDataRow("SOL_USUA").ToString & """,")

                            If MiDataRow("RHAPRHO_ESTADO").ToString = "S" Then
                                Estado = "Solicitado"
                            ElseIf MiDataRow("RHAPRHO_ESTADO").ToString = "A" Then
                                Estado = "Aprobado"
                            ElseIf MiDataRow("RHAPRHO_ESTADO").ToString = "R" Then
                                Estado = "Rechazado"
                            End If

                            If MiDataRow("RHAPRHO_ESTADO_IND").ToString = "I" Then
                                Estado = "Inactivo"
                            End If
                            resb.Append("""ESTADO"" :" & """" & Estado & """,")

                            resb.Append("""AUTORIZA"" :" & """" & MiDataRow("AUT_USUA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    Else
                        resb.Append("{}")
                    End If
                    res = resb.ToString()
                Case "11" 'genera creacion faltas y tardanzas valorizados 
                    context.Response.ContentType = "text/html"
                    Dim dh As New Nomade.NN.NNPlanilla("Bn")
                    res = dh.Genera_valorizado_fa_tar_ex(ANIO, MES, p_DETALLE)
                Case "Z"
                    Codigo = context.Request("Codigo")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'dt = Extra.Listar_Hora_Extra(Codigo, String.Empty, String.Empty, String.Empty)
                    dt = Extra.Listar_Hora_Extra(String.Empty, Empr, "A", String.Empty, PIDM, Sucur, ESTADO, MES, ANIO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            Dim FecUno As String = MiDataRow("RHAPRHO_FEC_PRO").ToString
                            Dim FecDos As String = MiDataRow("RHAPRHO_FEC_ACT").ToString
                            Dim Estado As String = ""

                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("RHAPRHO_CODE").ToString & """,")
                            resb.Append("""EMPLEADO"" :" & """" & MiDataRow("EMP").ToString & """,")
                            resb.Append("""FECHA_PROCESO"" :" & """" & IIf(FecUno <> "", FecUno.Substring(0, 10), "") & """,")
                            If FecDos = "" Then
                                resb.Append("""FECHA_ACT"" :" & """" & "" & """,")
                            Else
                                resb.Append("""FECHA_ACT"" :" & """" & (Utilities.fechaLocal(FecDos.Substring(0, 10))) & """,")
                            End If
                            resb.Append("""INICIO"" :" & """" & MiDataRow("RHAPRHO_HOR_NI").ToString & """,")
                            resb.Append("""FIN"" :" & """" & MiDataRow("RHAPRHO_HOR_FIN").ToString & """,")
                            resb.Append("""SOLICITA"" :" & """" & MiDataRow("SOL_USUA").ToString & """,")
                            If MiDataRow("RHAPRHO_ESTADO").ToString = "S" Then
                                Estado = "Solicitado"

                            ElseIf MiDataRow("RHAPRHO_ESTADO").ToString = "A" Then
                                Estado = "Aprobado"
                            ElseIf MiDataRow("RHAPRHO_ESTADO").ToString = "R" Then
                                Estado = "Rechazado"

                            End If

                            If MiDataRow("RHAPRHO_ESTADO_IND").ToString = "I" Then
                                Estado = "Inactivo"
                            End If
                            resb.Append("""ESTADO"" :" & """" & Estado & """,")

                            If MiDataRow("RHAPRHO_ESTADO").ToString = "R" Or MiDataRow("RHAPRHO_ESTADO").ToString = "S" Then
                                resb.Append("""ICON"" :" & """" & "icon-thumbs-up" & """,")
                            ElseIf MiDataRow("RHAPRHO_ESTADO").ToString = "A" Then
                                resb.Append("""ICON"" :" & """" & "icon-thumbs-down" & """,")
                            End If



                            resb.Append("""AUTORIZA"" :" & """" & MiDataRow("AUT_USUA").ToString & """,")
                            resb.Append("""MOTIVO"" :" & """" & MiDataRow("RHAPRHO_MOTIVO").ToString & """,")
                            resb.Append("""TIPO_HE"" :" & """" & MiDataRow("TIPO_HE").ToString & """")

                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    Else
                        resb.Append("{}")
                    End If
                    res = resb.ToString()
                Case "10"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim dh As New Nomade.NN.NNPlanilla("Bn")
                    Dim dtEmpleados As New DataTable
                    Dim dt_tardanzas As New DataTable
                    Dim dt_faltas_dia As New DataTable
                    Dim dt_faltas_horas As New DataTable
                    Dim dtHorasSPro As New DataTable
                    Dim dtFechaNPro As New DataTable
                    Dim dtHorasSReg As New DataTable
                    Dim dt_horas_extras As New DataTable
                    Dim bool As Boolean = False
                    Dim bool2 As Boolean = False
                    Dim bool3 As Boolean = False
                    Dim bool5 As Boolean = False
                    dt_tardanzas = dh.Listar_calculo_Tardanzas(ANIO, MES, Nothing, Empr, Sucur)
                    dt_horas_extras = dh.Listar_calculo_horas_extras(ANIO, MES, Nothing, Empr, Sucur)
                    dtEmpleados = dh.Listar_Empleado_Reporte_Fatar(Empr, Sucur, ANIO, MES)
                    dt_faltas_dia = dh.Listar_Faltas_Empleado(ANIO, MES, Nothing, Empr, Sucur, "1")
                    dt_faltas_horas = dh.Listar_Faltas_Empleado(ANIO, MES, Nothing, Empr, Sucur, "2")
                    dtHorasSPro = dh.Listar_Horas_Regularizadas_Sin_Procesar(Empr, Sucur)
                    'dtFechaNPro = lista_fechas_no_procesadas()
                    dtFechaNPro = Nothing
                    'New Nomade.NN.NNPlanilla("Bn").Listar_Fechas_No_Procesadas_Biometrico(ANIO, MES, Empr, Sucur)
                    dtHorasSReg = New Nomade.NN.NNPlanilla("Bn").Verifica_marcaciones_no_regularizadas(ANIO, MES, Empr, Sucur)
                    Dim dscto_fal_injust As Double = 0
                    Dim monto_horas_extras As Double = 0



                    'VALIDA VACIOS
                    If Not (dt_tardanzas Is Nothing) Or
                        Not (dt_horas_extras Is Nothing) Or
                        Not (dt_faltas_dia Is Nothing) Or
                        Not (dt_faltas_horas Is Nothing) Then


                        If Not (dtFechaNPro Is Nothing) Then
                            Dim b As Boolean = False
                            For p As Integer = 0 To dtFechaNPro.Rows.Count - 1
                                If dtFechaNPro(p)("ESTADO").ToString <> "1" Then
                                    b = True
                                    Exit For
                                End If
                            Next

                            If b = False Then
                                dtFechaNPro = Nothing
                            End If


                        End If





                        If Not (dtEmpleados Is Nothing) Then
                            resb.Append("[")
                            For i As Integer = 0 To dtEmpleados.Rows.Count - 1
                                bool = False
                                bool2 = False
                                bool3 = False
                                bool5 = False
                                Dim Sum_min As Integer = 0
                                Dim Sum_desc_min As Decimal = 0
                                resb.Append("{")
                                resb.Append("""NOMBRES"" :" & """" & dtEmpleados(i)("EMPLEADO").ToString & """,")
                                resb.Append("""DNI"" :" & """" & dtEmpleados(i)("DNI").ToString & """,")
                                resb.Append("""DESC_CARGO"" :" & """" & dtEmpleados(i)("DESC_CARGO").ToString & """,")
                                resb.Append("""REM_TOTAL"" :" & """" & dtEmpleados(i)("REM_TOTAL").ToString & """,")
                                If Not (dt_faltas_dia Is Nothing) Then
                                    For k As Integer = 0 To dt_faltas_dia.Rows.Count - 1
                                        If dt_faltas_dia(k)("PIDM").ToString = dtEmpleados(i)("PIDM").ToString Then
                                            resb.Append("""FALTAS"" :" & """" & dt_faltas_dia(k)("TOTAL_FALTAS").ToString & """,")
                                            resb.Append("""DSCTO_FAL_INJUST"" :" & """" & dt_faltas_dia(k)("DESCUENTO_X_FALTA").ToString & """,")
                                            'dscto_fal_injust = CDbl(dt_faltas_dia(k)("DESCUENTO_X_FALTA").ToString)
                                            dscto_fal_injust = -Math.Round(CDbl(dt_faltas_dia(k)("REM_EMPLEADO_DIA").ToString()) * Int(dt_faltas_dia(k)("DIAS_NO_LABORADOS").ToString()), 2)
                                            bool2 = True
                                            Exit For


                                        End If

                                    Next
                                End If


                                If Not (dt_tardanzas Is Nothing) Then
                                    For j As Integer = 0 To dt_tardanzas.Rows.Count - 1
                                        If dt_tardanzas(j)("PIDM").ToString = dtEmpleados(i)("PIDM").ToString Then

                                            If Not (dt_faltas_horas Is Nothing) Then
                                                bool5 = True
                                                For q As Integer = 0 To dt_faltas_horas.Rows.Count - 1
                                                    If dt_faltas_horas(q)("PIDM").ToString = dtEmpleados(i)("PIDM").ToString Then
                                                        Sum_min = Int(dt_tardanzas(j)("TOTAL_MINUTOS_TARDANZAS").ToString())
                                                        If dt_faltas_horas(q)("IND_SUB_CONTRA").ToString = "C" Then
                                                            Sum_min = Int(dt_tardanzas(j)("TOTAL_MINUTOS_TARDANZAS").ToString()) - Int(dt_faltas_horas(q)("MINUTOS").ToString)
                                                            Sum_desc_min = CDbl(dt_tardanzas(j)("REDONDEO_TOTAL_DESC_X_MINUTOS_TARDANZA").ToString)
                                                            Sum_desc_min = Math.Round(Sum_desc_min - CDbl(dt_tardanzas(j)("REMUNERACION_X_MIN").ToString()) * Int(dt_faltas_horas(q)("MINUTOS").ToString), 2)
                                                            ' Exit For


                                                        End If

                                                        If dt_faltas_horas(q)("IND_SUB_CONTRA").ToString = "S" Then
                                                            Sum_min = Sum_min + Int(dt_faltas_horas(q)("MINUTOS").ToString)
                                                            Sum_desc_min = Math.Round(CDbl(dt_tardanzas(j)("REMUNERACION_X_MIN").ToString()) * Int(Sum_min), 2)

                                                        End If

                                                    Else
                                                        Sum_min = Int(dt_tardanzas(j)("TOTAL_MINUTOS_TARDANZAS").ToString())
                                                        Sum_desc_min = CDbl(dt_tardanzas(j)("REDONDEO_TOTAL_DESC_X_MINUTOS_TARDANZA").ToString)
                                                    End If
                                                Next
                                            End If
                                            If bool5 = False Then
                                                Sum_min = Int(dt_tardanzas(j)("TOTAL_MINUTOS_TARDANZAS").ToString())
                                                Sum_desc_min = CDbl(dt_tardanzas(j)("REDONDEO_TOTAL_DESC_X_MINUTOS_TARDANZA").ToString)
                                            End If

                                            resb.Append("""TOTAL_MINUTOS_TARDANZAS"" :" & """" & Sum_min.ToString & """,")
                                            resb.Append("""REDONDEO_TOTAL_DESC_X_MINUTOS_TARDANZA"" :" & """" & Sum_desc_min.ToString & """,")
                                            bool = True
                                            Exit For


                                        End If

                                    Next
                                End If
                                If bool2 = False Then
                                    resb.Append("""FALTAS"" :" & """" & "0" & """,")
                                    resb.Append("""DSCTO_FAL_INJUST"" :" & """" & "-0.00" & """,")
                                    dscto_fal_injust = 0
                                End If
                                If bool = False Then
                                    resb.Append("""TOTAL_MINUTOS_TARDANZAS"" :" & """" & "-0" & """,")
                                    resb.Append("""REDONDEO_TOTAL_DESC_X_MINUTOS_TARDANZA"" :" & """" & "-0.00" & """,")
                                End If




                                If Not (dtFechaNPro Is Nothing) Then
                                    If dtFechaNPro.Rows.Count > 0 Then
                                        resb.Append("""INDICADOR_PENDIENTES"" :" & """" & "1" & """,")
                                    End If
                                Else
                                    If Not (dtHorasSPro Is Nothing) Then
                                        If dtHorasSPro.Rows.Count > 0 Then
                                            resb.Append("""INDICADOR_PENDIENTES"" :" & """" & "2" & """,")
                                        End If
                                    Else
                                        If Int(dtHorasSReg(0)("CONTADOR")) > 0 Then
                                            resb.Append("""INDICADOR_PENDIENTES"" :" & """" & "3" & """,")
                                        Else
                                            resb.Append("""INDICADOR_PENDIENTES"" :" & """" & "0" & """,")
                                        End If
                                    End If
                                End If

                                'horas extras
                                If Not (dt_horas_extras Is Nothing) Then
                                    For l As Integer = 0 To dt_horas_extras.Rows.Count - 1
                                        If dt_horas_extras(l)("PIDM").ToString = dtEmpleados(i)("PIDM").ToString Then
                                            resb.Append("""TOTAL_MINUTOS_EXTRAS"" :" & """" & dt_horas_extras(l)("TOTAL_MINUTOS_EXTRAS").ToString & """,")
                                            resb.Append("""REDONDEO_TOTAL_PAGAR_HORAS_EXTRAS"" :" & """" & dt_horas_extras(l)("REDONDEO_TOTAL_PAGAR_HORAS_EXTRAS").ToString & """,")
                                            monto_horas_extras = CDbl(dt_horas_extras(l)("REDONDEO_TOTAL_PAGAR_HORAS_EXTRAS").ToString)
                                            bool3 = True
                                            Exit For


                                        End If

                                    Next
                                End If
                                If bool3 = False Then
                                    resb.Append("""TOTAL_MINUTOS_EXTRAS"" :" & """" & 0 & """,")
                                    resb.Append("""REDONDEO_TOTAL_PAGAR_HORAS_EXTRAS"" :" & """" & 0.0 & """,")
                                    monto_horas_extras = 0
                                End If


                                resb.Append("""SALDO"" :" & """" & Math.Round((Sum_desc_min + dscto_fal_injust + monto_horas_extras), 2) & """")
                                resb.Append("}")
                                resb.Append(",")
                            Next


                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If


                    Else
                        resb.Append("")
                    End If






                    res = resb.ToString()
                    dtEmpleados = Nothing
                    dt_tardanzas = Nothing
            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write(ex.Message)

        End Try
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property


    Public Function lista_fechas_no_procesadas() As DataTable
        Dim dtFechasBio As DataTable = New Nomade.NN.NNPlanilla("Bn").Listar_Fechas_No_Procesadas_Biometrico(ANIO, IIf(MES.Length = 1, "0" + MES, MES), Empr, Sucur, "2", "")

        Dim dtContrato As DataTable = New Nomade.NN.NNPlanilla("Bn").Listar_Fechas_No_Procesadas_Biometrico(ANIO, IIf(MES.Length = 1, "0" + MES, MES), Empr, Sucur, "1", "")
        Dim dtMarcBio As New DataTable
        Dim dtMarcBD As New DataTable
        resb.Append("[")
        For i = 0 To dtFechasBio.Rows.Count - 1
            Dim filtro As String = "#" + Utilities.fechaLocal(dtFechasBio(i)("FECHA")) + "# >= PEBEMCO_FECHA_INI_CONT   AND " +
                               "#" + Utilities.fechaLocal(dtFechasBio(i)("FECHA")) + "# <= PEBEMCO_FECHA_FIN_CONT"

            Dim result() As DataRow = dtContrato.Select(filtro)
            Dim punchno_cad As String = ""


            If result.Count > 0 Then



                For Each row As DataRow In result
                    punchno_cad += row("punchno") + ","
                Next
                punchno_cad += "}"
                punchno_cad = punchno_cad.Replace(",}", "")

                dtMarcBio = New Nomade.NN.NNPlanilla("Bn").Listar_Fechas_No_Procesadas_Biometrico(ANIO, IIf(MES.Length = 1, "0" + MES, MES), Empr, Sucur, "3", punchno_cad)
                dtMarcBD = New Nomade.NN.NNPlanilla("Bn").Listar_Fechas_No_Procesadas_Biometrico(ANIO, IIf(MES.Length = 1, "0" + MES, MES), Empr, Sucur, "4", punchno_cad)
            End If

            Dim cont_dtMarcBio = 0
            If Not (dtMarcBio Is Nothing) Then
                cont_dtMarcBio = dtMarcBio.Rows.Count
            End If
            Dim cont_dtMarcBD = 0
            If Not (dtMarcBD Is Nothing) Then
                cont_dtMarcBD = dtMarcBD.Rows.Count
            End If

            If cont_dtMarcBio > cont_dtMarcBD Then
                resb.Append("{")
                resb.Append("""FECHA"" :" & """" & Utilities.fechaLocal(dtFechasBio(i)("FECHA")) & """,")
                resb.Append("""ESTADO"" :" & """" & "0" & """")

                resb.Append("}")
                resb.Append(",")
            ElseIf cont_dtMarcBio = cont_dtMarcBD And
                cont_dtMarcBio <> 0 And
                cont_dtMarcBD <> 0 Then

                resb.Append("{")
                resb.Append("""FECHA"" :" & """" & Utilities.fechaLocal(dtFechasBio(i)("FECHA")) & """,")
                resb.Append("""ESTADO"" :" & """" & "1" & """")

                resb.Append("}")
                resb.Append(",")
            End If


        Next
        resb.Append("{}")
        resb = resb.Replace(",{}", String.Empty)
        resb.Append("]")
        Dim dt As DataTable = Utilities.json2Datatable(resb.ToString())
        resb.Clear()

        Return dt
    End Function



End Class
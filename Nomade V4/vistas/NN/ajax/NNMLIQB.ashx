<%@ WebHandler Language="VB" Class="NNMLIQB" %>

Imports System
Imports System.Web
Imports System.Data
Imports iTextSharp.text
Imports System.IO
Imports iTextSharp.text.pdf

Public Class NNMLIQB : Implements IHttpHandler
    Dim OPCION As String
    Dim CTLG_CODE, SCSL_CODE, filtrotypeahead, p_tipo, p_USUA_ID, p_DETALLE As String
    Dim dt As DataTable
    Dim PIDM As Integer

    Dim res As String
    Dim resb As New StringBuilder


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")

        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        PIDM = context.Request("PIDM")
        filtrotypeahead = context.Request("q")

        p_tipo = context.Request("p_tipo")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_DETALLE = context.Request("p_DETALLE")


        Select Case OPCION

            Case "1" ' lista empleados
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New NOMADE.NC.NCEEmpleado("Bn").Listar_Empleados(0, 0, "A", CTLG_CODE, SCSL_CODE, String.Empty, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""DNI"" :" & """" & IIf(MiDataRow("DNI") Is Nothing, "_______", MiDataRow("DNI").ToString) & """,")
                        resb.Append("""RUC"" :" & """" & IIf(MiDataRow("RUC") Is Nothing, "_______", MiDataRow("RUC").ToString) & """,")
                        resb.Append("""DIRECCION"" :" & """" & MiDataRow("DIRECCION").ToString & """,")
                        resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                        resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                        resb.Append("""ESTADO_CONTRATO"" :" & """" & MiDataRow("ESTADO_CONTRATO").ToString & """,")
                        resb.Append("""ESTADO_CONT"" :" & """" & MiDataRow("ESTADO_CONT").ToString & """,")
                        resb.Append("""USUA_ID"" :" & """" & MiDataRow("USUA_ID").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "2" ' lista contrato
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = New Nomade.NC.NCEEmpleado("Bn").Lista_Contrato_Empl(PIDM, "", "", "")
                If Not (dt Is Nothing) Then
                    resb.Append("[")

                    resb.Append("{")
                    resb.Append("""NRO"" :" & """" & dt(0)("NRO").ToString & """,")
                    resb.Append("""FECHA_INI"" :" & """" & dt(0)("FECHA_INI").ToString & """,")
                    resb.Append("""FECHA_CESE"" :" & """" & dt(0)("FECHA_CESE").ToString & """,")
                    resb.Append("""LIQ_IND"" :" & """" & dt(0)("LIQ_IND").ToString & """,")
                    resb.Append("""FECHA_FIN"" :" & """" & dt(0)("FECHA_FIN").ToString & """")

                    resb.Append("}")
                    resb.Append(",")

                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "3" 'Generar liquidacion beneficios sociales

                Dim NCEEmpleado As New Nomade.NC.NCEEmpleado("Bn")
                dt = NCEEmpleado.Lista_Liquidacion_Empl(PIDM, "1")
                res = GenerarTablaLiquidacion(dt).ToString()
                NCEEmpleado = Nothing
            Case "4" ' lista contrato
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NCEEmpleado As New Nomade.NC.NCEEmpleado("Bn")
                dt = NCEEmpleado.Lista_Liquidacion_Empl(PIDM, "2")
                'Dim ruta As String = ""
                'ruta = context.Server.MapPath("~")

                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""ARCHIVO"" :" & """" & MiDataRow("ARCHIVO").ToString & """,")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                        resb.Append("""FECHA_LIQ"" :" & """" & MiDataRow("FECHA_LIQ").ToString & """,")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """")


                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "G"
                context.Response.ContentType = "text/html"
                Dim NCEEmpleado As New Nomade.NC.NCEEmpleado("Bn")
                Dim resp As String = ""
                resp = Crear_Liq_Empleado(PIDM, p_USUA_ID, p_DETALLE)
                dt = NCEEmpleado.Lista_Liquidacion_Empl(PIDM, "1")
                GenerarPDF(dt)
                res = resp
            Case "D"
                context.Response.ContentType = "text/html"
                Dim NCEEmpleado As New Nomade.NC.NCEEmpleado("Bn")
                dt = NCEEmpleado.Lista_Liquidacion_Empl(PIDM, "1")
                res = GenerarPDF(dt)
                'Case "A" 'aCTUALIZA asigancion concepto empleado
                '    context.Response.ContentType = "text/html"
                '    res = Actualizar_Concepto_Planilla(p_CONCEPTO_CODE, p_CODE_ASIGNACION, p_PIDM_EMPL, IIf(p_FECHA_FIN = "", Nothing, p_FECHA_FIN), p_FECHA_INICIO, p_MONTO, p_ESTADO, p_USUA_ID, p_TIPO_UPDATE)


            Case Else
        End Select
        context.Response.Write(res)
    End Sub


    Public Function Crear_Liq_Empleado(ByVal PIDM As String, ByVal p_USUA_ID As String, ByVal p_DETALLE As String) As String

        Dim Datos(1) As String
        Dim NCEEmpleado As New Nomade.NC.NCEEmpleado("Bn")
        Datos = NCEEmpleado.Crear_Liquidacion_Empleado(PIDM, p_USUA_ID, p_DETALLE)
        NCEEmpleado = Nothing
        Return Datos(0) + "," + Datos(1) + "," + Datos(2)




    End Function

    Public Function GenerarPDF(ByVal dt As DataTable) As String
        Dim ress As String
        Dim cNomArch As String = ""
        Dim bloquesHtml As String() = {"1", "2"}

        If Not dt Is Nothing Then
            cNomArch = dt(0)("ARCHIVO").ToString + ".pdf"
        End If

        p_tipo = "v"
        bloquesHtml(0) = GenerarTablaLiquidacion(dt)
        bloquesHtml(1) = Replace(GenerarTablaLiquidacion(dt), "COPIA EMPLEADOR", "COPIA TRABAJADOR")
        HTMLToPDF(bloquesHtml, cNomArch)

        ress = "OK"
        Return ress
    End Function





    Sub HTMLToPDF(ByVal HTML As Array, ByVal FilePath As String)
        Dim archivo, res As String
        res = "Archivos\" + FilePath
        archivo = HttpContext.Current.Server.MapPath("~") + res
        If My.Computer.FileSystem.FileExists(archivo) Then
            My.Computer.FileSystem.DeleteFile(archivo)
        End If

        Dim document As Document
        document = New Document(PageSize.A2)

        PdfWriter.GetInstance(document, New FileStream(archivo, FileMode.Create))
        document.Open()

        'Dim abc As StringReader = New StringReader(HTML.ToString)
        'Dim styles As iTextSharp.text.html.simpleparser.StyleSheet = New iTextSharp.text.html.simpleparser.StyleSheet()
        'styles.LoadStyle("border", "border-bottom", "2px")

        'Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
        'hw.Parse(New StringReader(HTML.ToString))
        'document.Close()
        For i As Integer = 0 To HTML.Length - 1
            document.NewPage()
            Dim hw As iTextSharp.text.html.simpleparser.HTMLWorker = New iTextSharp.text.html.simpleparser.HTMLWorker(document)
            hw.Parse(New StringReader(HTML(i).ToString))

        Next

        document.Close()
    End Sub


    Public Function GenerarTablaLiquidacion(ByVal dtLiquidacion As DataTable) As String
        Dim total As Decimal = 0
        Dim k As Integer = 0
        Dim cod_sunat_reg_pen As String
        Dim Remuneracion As Decimal = 0
        Dim MesesLaborados As Integer = 0
        Dim DiasLaborados As Integer = 0
        Dim RemuneracionPro As Decimal = 0.0
        Dim diasReg As Integer = 0
        Dim Multiplicador As Decimal = 0.0
        Dim MontoMes As Decimal = 0.0
        Dim MontoDia As Decimal = 0.0
        Dim TotalVacaciones As Decimal = 0.0
        Dim MontoVacPendientes As Decimal = 0.0
        Dim diasResVac As Integer = 0
        Dim MontoGrati As Decimal = 0.0
        Dim MesesGrati As Decimal = 0.0
        Dim TotalLiquidacion As Decimal = 0.0
        Dim plame() As String = {}
        Dim val_afp() As String = {}
        Dim ind_mixta As String = ""
        Dim param_comisiones() As String = {}
        Dim cod_grup_com() As String = {}
        Dim pos_tipo As New ArrayList
        Dim val_final As New ArrayList
        Dim comision As Decimal = 0.0
        Dim TotalAfp As Decimal = 0.0
        Dim tipo As String = ""
        Dim CTS As Decimal = 0.0
        Dim numeracion As Boolean = False
        Dim por_essalud As Decimal = 0.0
        Dim total_aporte As Decimal = 0.0
        Dim TOTAL_ADEL_VAC As Decimal = 0.0
        Dim CODIGO_REGLABORAL As String = ""

        '**********************VARIABLES PARA VACACIONES ADEL *************************
        Dim FECHA_INI_PERIODO As String = ""
        Dim FECHA_FIN_PERIODO As String = ""
        Dim DIAS_GOZADOS_PERIODO As Integer = 0
        Dim DIAS_GOZADOS_ADEL As Integer = 0
        Dim DIAS_VAC_PENDIENTES As Integer = 0
        Dim FECHA_INI_TRUN As String = ""
        Dim FECHA_FIN_TRUN As String = ""
        Dim A As String = ""
        Dim M As String = ""
        Dim D As String = ""
        Dim T_DESC_VAC_ADEL As Decimal = 0.0
        Dim F_PERIODO_FIN As Date
        Dim IND_DESCUENTO_VAC_ADEL As String = ""
        Dim IND_VAC_PENDIENTE As String = ""
        Dim IND_VAC_TRUNCAS As String = "S"
        Dim cadena As New StringBuilder
        '**********************VARIABLES PARA VACACIONES ADEL *************************

        If Not dtLiquidacion Is Nothing Then
            Remuneracion = dtLiquidacion(0)("REM_TOTAL")
            RemuneracionPro = Convert.ToDecimal(dtLiquidacion(0)("REMUNERACION_PROMEDIO"))
            MesesLaborados = IIf(dtLiquidacion(0)("MESES").ToString = "", 0, dtLiquidacion(0)("MESES"))
            MesesGrati = dtLiquidacion(0)("MESES_GRATI")
            DiasLaborados = dtLiquidacion(0)("DIAS")
            diasReg = dtLiquidacion(0)("DIAS_REGIMEN")

            'If dtLiquidacion(0)("VAC_PENDIENTES").ToString = "-1000" Then
            '    diasResVac = diasReg
            'End If
            'If Convert.ToInt32(dtLiquidacion(0)("VAC_PENDIENTES")) > 0 Then
            '    diasResVac = dtLiquidacion(0)("VAC_PENDIENTES").ToString
            'End If

            'TOTAL_ADEL_VAC = (RemuneracionPro * Convert.ToInt32(dtLiquidacion(0)("VACACIONES_ADELANTADAS_GOZADAS"))) / 30

            Multiplicador = Remuneracion * (diasReg / 30)
            MontoMes = (Multiplicador / 12) * MesesLaborados
            MontoDia = (Multiplicador / 12) / 30 * (DiasLaborados)
            por_essalud = dtLiquidacion(0)("POR_ESSALUD")
            MontoVacPendientes = RemuneracionPro * (diasResVac / diasReg)
            MontoGrati = (Remuneracion / 6) * MesesGrati
            cod_sunat_reg_pen = dtLiquidacion(0)("cod_sunat_reg_pen")
            CTS = Convert.ToDecimal(Split(dtLiquidacion(0)("CTS"), "%")(0))


            ind_mixta = dtLiquidacion(0)("IND_AFP_MIXTA").ToString
            param_comisiones = Split(dtLiquidacion(0)("PARAMETRO_COMISION").ToString, ",")
            plame = Split(dtLiquidacion(0)("PLAME_CODIGOS").ToString, ",")
            val_afp = Split(dtLiquidacion(0)("VALORES_AFP").ToString, ",")
            cod_grup_com = Split(dtLiquidacion(0)("TIPO_AFP").ToString, ",")
            CODIGO_REGLABORAL = dtLiquidacion(0)("CODIGO_REGLABORAL").ToString

            If param_comisiones.Length > 0 And plame.Length > 0 Then
                For i As Integer = 0 To param_comisiones.Length - 1
                    For j As Integer = 0 To plame.Length - 1
                        If param_comisiones(i).Equals(plame(j)) Then
                            pos_tipo.Add(j)

                        End If
                    Next
                Next
            End If


            Dim p As Integer

            If cod_sunat_reg_pen <> "48" Then
                If ind_mixta = "S" Then
                    tipo = "(Mixta)"
                    If cod_grup_com.Length > 0 Then
                        For i As Integer = 0 To cod_grup_com.Length - 1
                            If cod_grup_com(i).Equals("1") Then
                                p = i
                            End If
                        Next
                    End If
                Else
                    tipo = "(Fija)"
                    If cod_grup_com.Length > 0 Then

                        For i As Integer = 0 To cod_grup_com.Length - 1
                            If cod_grup_com(i).Equals("2") Then
                                p = i
                            End If
                        Next

                    End If
                End If

                If pos_tipo.Count > 0 Then

                    For i As Integer = 0 To pos_tipo.Count - 1
                        val_final.Add(val_afp.ElementAt(pos_tipo(i)).ToString)
                    Next

                End If

                If val_final.Count > 0 Then
                    val_final.RemoveAt(p)
                End If



                If val_final.Count > 0 Then

                    For i As Integer = 0 To val_final.Count - 1
                        comision += Convert.ToDecimal(val_final(i))
                    Next

                End If

            Else

                If val_afp.Count > 0 Then

                    For i As Integer = 0 To val_afp.Count - 1
                        If IsNumeric(val_afp(i)) Then
                            comision = Convert.ToDecimal(val_afp(i))
                            Exit For

                        End If

                    Next

                End If

            End If

            'CALCULOS VACACIONES PENDIENTES -  VACACIONES TRUNCAS CON ADELANTOS


            If dtLiquidacion(0)("FECHA_F_PERIODO").ToString = "" Then
                F_PERIODO_FIN = Convert.ToDateTime(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI"))).AddYears(1).AddDays(-1)
            Else
                F_PERIODO_FIN = Utilities.fechaLocal(dtLiquidacion(0)("FECHA_F_PERIODO"))
            End If

            If dtLiquidacion(0)("FECHA_FIN_CONTRATO").ToString = "" Then
                If Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")) > F_PERIODO_FIN Then
                    If dtLiquidacion(0)("IND_EXISTE_PROGRAMACION").ToString <> "" Then
                        FECHA_INI_PERIODO = dtLiquidacion(0)("FECHA_I_PERIODO").ToString
                        FECHA_FIN_PERIODO = dtLiquidacion(0)("FECHA_F_PERIODO").ToString
                        DIAS_GOZADOS_PERIODO = Convert.ToInt32(dtLiquidacion(0)("D_GOZADOS"))
                        DIAS_VAC_PENDIENTES = diasReg - DIAS_GOZADOS_PERIODO
                        If DIAS_VAC_PENDIENTES > 0 Then
                            IND_VAC_PENDIENTE = "S"
                        End If
                        MontoVacPendientes = RemuneracionPro * (DIAS_VAC_PENDIENTES / diasReg)
                        FECHA_INI_TRUN = Convert.ToDateTime(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_F_PERIODO"))).AddDays(1).ToString
                        FECHA_FIN_TRUN = Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")).ToString
                        Dim MESES_DIAS_TRUNCAR = Calcular_AñosMesesDias(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")))
                        M = MESES_DIAS_TRUNCAR.Split("/")(1)
                        D = MESES_DIAS_TRUNCAR.Split("/")(2)
                        MontoMes = (Multiplicador / 12) * M

                    Else
                        FECHA_INI_TRUN = Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI"))
                        FECHA_FIN_TRUN = Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE"))
                        FECHA_INI_PERIODO = Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI"))
                        FECHA_FIN_PERIODO = Convert.ToDateTime(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI"))).AddYears(1).AddDays(-1)
                        Dim MESES_DIAS_TRUNCAR = Calcular_AñosMesesDias(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")))
                        A = MESES_DIAS_TRUNCAR.Split("/")(0)
                        M = MESES_DIAS_TRUNCAR.Split("/")(1)
                        D = MESES_DIAS_TRUNCAR.Split("/")(2)
                        DIAS_VAC_PENDIENTES = diasReg
                        IND_VAC_PENDIENTE = "S"
                    End If
                Else
                    If dtLiquidacion(0)("D_GOZADOS_ADEL").ToString <> "" Then

                        Dim D_LABORADOS = DateDiff("d", Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")))
                        Dim D_A_VACACIONAR = Convert.ToInt32(Math.Round(((D_LABORADOS * diasReg) / 365), 0)) 'Math.Round(Numero, 2)
                        Dim D_PEND_VACACIONAR = Convert.ToInt32(D_A_VACACIONAR - dtLiquidacion(0)("D_GOZADOS_ADEL"))
                        If D_PEND_VACACIONAR > 0 Then
                            'TRUNCO Y DESCUENTO DIAS GOZADOS
                            Dim MESES_DIAS_TRUNCAR = Calcular_AñosMesesDias(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")))
                            M = MESES_DIAS_TRUNCAR.Split("/")(1)
                            D = MESES_DIAS_TRUNCAR.Split("/")(2)
                            DIAS_GOZADOS_ADEL = dtLiquidacion(0)("D_GOZADOS_ADEL")
                            T_DESC_VAC_ADEL = (RemuneracionPro * DIAS_GOZADOS_ADEL) / diasReg
                            IND_DESCUENTO_VAC_ADEL = "S"
                            FECHA_INI_TRUN = dtLiquidacion(0)("FECHA_INI").ToString
                            FECHA_FIN_TRUN = dtLiquidacion(0)("FEC_CESE").ToString
                        Else
                            'DESCUENTA LOS DIAS DEUDA EN LA ULTIMA BOLETA PAGO
                            MontoDia = 0
                            MontoMes = 0
                            IND_VAC_TRUNCAS = "N"
                        End If
                    Else
                        'TRUNCO TODO
                        Dim MESES_DIAS_TRUNCAR = Calcular_AñosMesesDias(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")))
                        M = MESES_DIAS_TRUNCAR.Split("/")(1)
                        D = MESES_DIAS_TRUNCAR.Split("/")(2)
                        IND_DESCUENTO_VAC_ADEL = "N"
                        FECHA_INI_TRUN = dtLiquidacion(0)("FECHA_INI").ToString
                        FECHA_FIN_TRUN = dtLiquidacion(0)("FEC_CESE").ToString

                    End If
                End If
            Else
                If Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")) > F_PERIODO_FIN Then
                    If dtLiquidacion(0)("IND_EXISTE_PROGRAMACION").ToString <> "" Then
                        FECHA_INI_PERIODO = dtLiquidacion(0)("FECHA_I_PERIODO").ToString
                        FECHA_FIN_PERIODO = dtLiquidacion(0)("FECHA_F_PERIODO").ToString
                        DIAS_GOZADOS_PERIODO = Convert.ToInt32(dtLiquidacion(0)("D_GOZADOS"))
                        DIAS_VAC_PENDIENTES = diasReg - DIAS_GOZADOS_PERIODO
                        If DIAS_VAC_PENDIENTES > 0 Then
                            IND_VAC_PENDIENTE = "S"
                        End If
                        MontoVacPendientes = RemuneracionPro * (DIAS_VAC_PENDIENTES / diasReg)
                        FECHA_INI_TRUN = Convert.ToDateTime(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_F_PERIODO"))).AddDays(1).ToString
                        FECHA_FIN_TRUN = Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE"))
                        Dim MESES_DIAS_TRUNCAR = Calcular_AñosMesesDias(Convert.ToDateTime(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI"))).AddDays(1), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")))
                        M = MESES_DIAS_TRUNCAR.Split("/")(1)
                        D = MESES_DIAS_TRUNCAR.Split("/")(2)
                        MontoMes = (Multiplicador / 12) * M
                    Else
                        FECHA_INI_TRUN = Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI"))
                        FECHA_FIN_TRUN = Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE"))
                        FECHA_INI_PERIODO = Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI"))
                        FECHA_FIN_PERIODO = Convert.ToDateTime(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI"))).AddYears(1).AddDays(-1)
                        Dim MESES_DIAS_TRUNCAR = Calcular_AñosMesesDias(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")))
                        A = MESES_DIAS_TRUNCAR.Split("/")(0)
                        M = MESES_DIAS_TRUNCAR.Split("/")(1)
                        D = MESES_DIAS_TRUNCAR.Split("/")(2)
                        DIAS_VAC_PENDIENTES = diasReg
                        IND_VAC_PENDIENTE = "S"
                    End If
                Else
                    If dtLiquidacion(0)("D_GOZADOS_ADEL").ToString <> "" Then

                        Dim D_LABORADOS = DateDiff("d", Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")))
                        Dim D_A_VACACIONAR = Convert.ToInt32(Math.Round(((D_LABORADOS * diasReg) / 365), 0)) 'Math.Round(Numero, 2)
                        Dim D_PEND_VACACIONAR = Convert.ToInt32(D_A_VACACIONAR - dtLiquidacion(0)("D_GOZADOS_ADEL"))
                        If D_PEND_VACACIONAR > 0 Then
                            'TRUNCO Y DESCUENTO DIAS GOZADOS
                            Dim MESES_DIAS_TRUNCAR = Calcular_AñosMesesDias(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")))
                            M = MESES_DIAS_TRUNCAR.Split("/")(1)
                            D = MESES_DIAS_TRUNCAR.Split("/")(2)
                            DIAS_GOZADOS_ADEL = dtLiquidacion(0)("D_GOZADOS_ADEL")
                            T_DESC_VAC_ADEL = (RemuneracionPro * DIAS_GOZADOS_ADEL) / diasReg
                            IND_DESCUENTO_VAC_ADEL = "S"
                            FECHA_INI_TRUN = dtLiquidacion(0)("FECHA_INI").ToString
                            FECHA_FIN_TRUN = dtLiquidacion(0)("FEC_CESE").ToString
                        Else
                            'DESCUENTA LOS DIAS DEUDA EN LA ULTIMA BOLETA PAGO
                            MontoDia = 0
                            MontoMes = 0
                            IND_VAC_TRUNCAS = "N"
                        End If
                    Else
                        'TRUNCO TODO
                        Dim MESES_DIAS_TRUNCAR = Calcular_AñosMesesDias(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE")))
                        M = MESES_DIAS_TRUNCAR.Split("/")(1)
                        D = MESES_DIAS_TRUNCAR.Split("/")(2)
                        IND_DESCUENTO_VAC_ADEL = "N"
                        FECHA_INI_TRUN = dtLiquidacion(0)("FECHA_INI").ToString
                        FECHA_FIN_TRUN = dtLiquidacion(0)("FEC_CESE").ToString

                    End If
                End If


            End If


            'FIN CALCULOS



            TotalVacaciones = (MontoMes + MontoDia)
            TotalAfp = TotalVacaciones * (comision / 100)
            total_aporte = TotalVacaciones * (por_essalud / 100)

            If CODIGO_REGLABORAL <> "00000001" And CODIGO_REGLABORAL <> "00000002" Then
                MontoGrati = 0
                CTS = 0
            End If


        End If
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")

        resb.AppendFormat("<table border=""0"" width=""100%"" >")

        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%'><strong>{0}</strong></td>", dtLiquidacion(0)("DESC_CTLG").ToString)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%'><strong>R U C :&nbsp;&nbsp;{0}</strong></td>", dtLiquidacion(0)("RUC_CTLG").ToString)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%'><strong>{0}</strong></td>", dtLiquidacion(0)("DIRECCION_CTLG").ToString)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table border=""2"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td style='font-size: xx-large;' width='100%' height='60px' align='center'><strong>{0}</strong></td>", "L I Q U I D A C I O N&nbsp;&nbsp;&nbsp;&nbsp;D E&nbsp;&nbsp;&nbsp;&nbsp;B E N E F I C I O S&nbsp;&nbsp;&nbsp;&nbsp;S O C I A L E S")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")

        resb.AppendFormat("<table border=""0"" width=""100%"" >")

        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td width='25%'>{0}</td>", "APELLIDOS Y NOMBRES")
        resb.AppendFormat("<td width='5%' align='center'>{0}</td>", ":")
        resb.AppendFormat("<td width='70%'><strong>{0}</strong></td>", dtLiquidacion(0)("NOMBRE_EMPLEADO").ToString)
        resb.AppendFormat("</tr>")


        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td width='25%'>{0}</td>", "DNI")
        resb.AppendFormat("<td width='5%' align='center'>{0}</td>", ":")
        resb.AppendFormat("<td width='70%'>{0}</td>", dtLiquidacion(0)("DNI").ToString)
        resb.AppendFormat("</tr>")


        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td width='25%'>{0}</td>", "CARGO")
        resb.AppendFormat("<td width='5%' align='center'>{0}</td>", ":")
        resb.AppendFormat("<td width='70%'>{0}</td>", dtLiquidacion(0)("CARGO_DESC").ToString)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td width='25%'>{0}</td>", "REGIMEN LABORAL")
        resb.AppendFormat("<td width='5%' align='center'>{0}</td>", ":")
        resb.AppendFormat("<td width='70%'>{0}</td>", dtLiquidacion(0)("REGIMEN_LABORAL").ToString)
        resb.AppendFormat("</tr>")


        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td width='25%'>{0}</td>", "FECHA DE INGRESO")
        resb.AppendFormat("<td width='5%' align='center'>{0}</td>", ":")
        resb.AppendFormat("<td width='70%'>{0}</td>", dtLiquidacion(0)("FECHA_INI").ToString)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td width='25%'>{0}</td>", "FECHA DE CESE")
        resb.AppendFormat("<td width='5%' align='center'>{0}</td>", ":")
        resb.AppendFormat("<td width='70%'>{0}</td>", dtLiquidacion(0)("FECHA_CESE").ToString)
        resb.AppendFormat("</tr>")


        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td width='25%'>{0}</td>", "REMUNERACION COMPUTABLE")
        resb.AppendFormat("<td width='5%' align='center'>{0}</td>", ":")
        resb.AppendFormat("<td width='70%'><strong>S/ .{0}</strong></td>", dtLiquidacion(0)("REM_TOTAL").ToString)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td width='25%'>{0}</td>", "TIEMPO DE SERVICIOS")
        resb.AppendFormat("<td width='5%' align='center'>{0}</td>", ":")
        Dim anos As String = ""
        Dim meses As String = ""
        Dim dias As String = ""
        If dtLiquidacion(0)("ANOS").ToString <> Nothing Then
            anos = Calcular_AñosMesesDias(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE"))).Split("/")(0) + "&nbsp;Años,"
        End If
        If dtLiquidacion(0)("MESES").ToString <> Nothing Then
            meses = Calcular_AñosMesesDias(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE"))).Split("/")(1) + "&nbsp;Meses"
        End If
        If dtLiquidacion(0)("DIAS").ToString <> Nothing Then
            dias = "&nbsp;y&nbsp;" + Calcular_AñosMesesDias(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE"))).Split("/")(2) + "&nbsp;Dias"
        End If
        resb.AppendFormat("<td width='70%'>{0}{1}{2}</td>", anos, meses, dias)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr width=""100%"">")
        resb.AppendFormat("<td width='25%'>{0}</td>", "MOTIVO DE CESE")
        resb.AppendFormat("<td width='5%' align='center'>{0}</td>", ":")
        resb.AppendFormat("<td width='70%'>{0}</td>", dtLiquidacion(0)("DESC_CESE").ToString)
        resb.AppendFormat("</tr>")

        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")

        resb.AppendFormat("<table border=""0"" width=""100%"" >")

        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%' height='36px' align='bottom'>{0}</td>", "Cálculo de Liquidación de Beneficios Sociales")
        resb.AppendFormat("</tr>")


        resb.AppendFormat("</table>")

        'VACACIONES PENDIENTES
        Dim total_vac_pendi = 0
        If IND_VAC_PENDIENTE = "S" Then


            numeracion = True

            resb.AppendFormat("<table border=""0"" width=""100%"" >")
            resb.AppendFormat("<tr bgcolor='#E0E0E3'>")
            resb.AppendFormat("<td width='100%' height='30px'  align='left'><strong>{0}{1}</strong></td>", "I", ".&nbsp;&nbsp;VACACIONES PENDIENTES :&nbsp;&nbsp;")
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</table>")

            resb.AppendFormat("<table border=""0"" width=""100%"" >") 'acaa
            'resb.AppendFormat("<tr bgcolor='#A9D0F5'><br>")
            'resb.AppendFormat("<td width='25%'><strong>&nbsp;&nbsp;Periodo&nbsp;&nbsp;(&nbsp;{0}{1}{2}&nbsp;)</strong></td>", Replace(dtLiquidacion(0)("FECHA_INI_PERIODO").ToString, "/", "."), "&nbsp;hasta&nbsp;", Replace(dtLiquidacion(0)("PERIODO_VAC_FIN").ToString, "/", "."))
            'resb.AppendFormat("<td></td>")
            'resb.AppendFormat("<td></td>")
            'resb.AppendFormat("<td></td>")
            'resb.AppendFormat("</tr>")


            'Dim año = ""

            'año = dtLiquidacion(0)("FECHA_INI_PERIODO").ToString.Substring(6)
            Dim YYYY = Calcular_AñosMesesDias(Utilities.fechaLocal(dtLiquidacion(0)("FECHA_INI")), Utilities.fechaLocal(dtLiquidacion(0)("FEC_CESE"))).Split("/")(0)


            For i As Integer = 0 To Convert.ToInt32(YYYY) - 1


                resb.AppendFormat("<tr bgcolor='#A9D0F5'>")
                resb.AppendFormat("<br><td ><strong>Periodo&nbsp;&nbsp;(&nbsp;{0}{1}{2}&nbsp;)</strong></td>", FECHA_INI_PERIODO.Replace("/", ".").Substring(0, 10), "&nbsp;hasta&nbsp;", FECHA_FIN_PERIODO.Replace("/", ".").Substring(0, 10))
                resb.AppendFormat("<td><br></td><td><br></td><td><br></td></tr>")

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='25%'><strong>Dias&nbsp;&nbsp;(&nbsp;{0}&nbsp;)</strong></td>", DIAS_VAC_PENDIENTES)
                resb.AppendFormat("<td width='5%' align='center'><strong>{0}</strong></td>", ":")
                resb.AppendFormat("<td width='25%'><strong>{0}&nbsp;x&nbsp;{1}&nbsp;/&nbsp;{2}</strong></td>", dtLiquidacion(0)("REMUNERACION_PROMEDIO").ToString, DIAS_VAC_PENDIENTES, diasReg)
                resb.AppendFormat("<td width='45%' align='right'><strong>{0}</strong></td>", String.Format("{0:0.00}", (RemuneracionPro * DIAS_VAC_PENDIENTES) / diasReg))
                resb.AppendFormat("</tr>")

                cadena.AppendFormat("{0},Periodo&nbsp;&nbsp;(&nbsp;{1}{2}{3}&nbsp;),Dias&nbsp;&nbsp;(&nbsp;{4}&nbsp;),{5}&nbsp;x&nbsp;{6}&nbsp;/&nbsp;{7},{8};", "0005", FECHA_INI_PERIODO.Replace("/", ".").Substring(0, 10), "&nbsp;hasta&nbsp;", FECHA_FIN_PERIODO.Replace("/", ".").Substring(0, 10), DIAS_VAC_PENDIENTES, dtLiquidacion(0)("REMUNERACION_PROMEDIO").ToString, DIAS_VAC_PENDIENTES, diasReg, String.Format("{0:0.00}", (RemuneracionPro * DIAS_VAC_PENDIENTES) / diasReg))

                ' anio = anio + 1
                FECHA_INI_PERIODO = Convert.ToDateTime(Utilities.fechaLocal(FECHA_FIN_PERIODO)).AddDays(1)
                FECHA_FIN_PERIODO = Convert.ToDateTime(Utilities.fechaLocal(FECHA_INI_PERIODO)).AddYears(1).AddDays(-1)
                total_vac_pendi = total_vac_pendi + ((RemuneracionPro * DIAS_VAC_PENDIENTES) / diasReg)
            Next

            cadena.AppendFormat("???")
            cadena = cadena.Replace(";???", "")
            FECHA_INI_TRUN = Convert.ToDateTime(Utilities.fechaLocal(FECHA_FIN_PERIODO)).AddYears(-1).AddDays(1)



            resb.AppendFormat("<tr><td><br></td><td><br></td><td><br></td><td><br></td></tr>")

            resb.AppendFormat("</table>")

            resb.AppendFormat("<table border=""1"" width=""100%"" >")
            resb.AppendFormat("<tr><td>")
            resb.AppendFormat("<table border=""0"" width=""100%"" >")
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td  align='left' width='50%'>{0}</td>", "TOTAL")
            resb.AppendFormat("<td align='right' width='50%'>{0}</td>", String.Format("{0:0.00}", total_vac_pendi))
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</table>")
            resb.AppendFormat("</td></tr>")
            resb.AppendFormat("</table><br><br>")



        End If

        'VACIONES TRUNCAS
        If IND_VAC_TRUNCAS = "S" Then


            numeracion = True
            resb.AppendFormat("<table border=""0"" width=""100%"" >")
            resb.AppendFormat("<tr bgcolor='#E0E0E3'>")
            resb.AppendFormat("<td width='100%' height='30px'  align='left'><strong>{0}{1}{2}{3}{4}</strong></td>", "I", ".&nbsp;&nbsp;VACACIONES TRUNCAS :&nbsp;&nbsp;", Utilities.fechaLocal(FECHA_INI_TRUN).ToString.Replace("/", ".").Substring(0, 10), "&nbsp;hasta&nbsp;", FECHA_FIN_TRUN.Replace("/", ".").Substring(0, 10))
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</table>")

            resb.AppendFormat("<table border=""0"" width=""100%"" >") 'acaa
            resb.AppendFormat("<tr><td><br></td><td><br></td><td><br></td><td><br></td></tr>")

            If M > 0 Then

                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td width='25%'><strong>Mes&nbsp;&nbsp;(&nbsp;{0}&nbsp;)</strong></td>", M)
                resb.AppendFormat("<td width='5%' align='center'><strong>{0}</strong></td>", ":")
                resb.AppendFormat("<td width='25%'><strong>{0}&nbsp;x&nbsp;({1}&nbsp;/&nbsp;30)&nbsp;/&nbsp;12&nbsp;x&nbsp;{2}</strong></td>", dtLiquidacion(0)("REM_TOTAL").ToString, diasReg, M)
                resb.AppendFormat("<td width='45%' align='right'><strong>{0}</strong></td>", String.Format("{0:0.00}", MontoMes))
                resb.AppendFormat("</tr>")

            End If

            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='25%'><strong>Dia&nbsp;&nbsp;(&nbsp;{0}&nbsp;)<strong></td>", D)
            resb.AppendFormat("<td width='5%' align='center'><strong>{0}<strong></td>", ":")
            resb.AppendFormat("<td width='25%'><strong>{0}&nbsp;x&nbsp;({1}&nbsp;/&nbsp;30)&nbsp;/&nbsp;12&nbsp;/&nbsp;30&nbsp;x&nbsp;{2}</strong></td>", dtLiquidacion(0)("REM_TOTAL").ToString, diasReg, D)
            resb.AppendFormat("<td width='45%' align='right'><strong>{0}</strong></td>", String.Format("{0:0.00}", MontoDia))
            resb.AppendFormat("</tr>")

            If IND_DESCUENTO_VAC_ADEL = "S" Then

                resb.AppendFormat("<tr bgcolor='#A9D0F5'>")
                resb.AppendFormat("<td  width='25%'><strong>{0}&nbsp;&nbsp;{1}&nbsp;(&nbsp;{2}&nbsp;)<strong></td>", "*Adelanto Vacaciones", "Dia", DIAS_GOZADOS_ADEL)
                resb.AppendFormat("<td width='5%' align='center'><strong>{0}<strong></td>", ":")
                resb.AppendFormat("<td width='25%'><strong>{0}&nbsp;x&nbsp;{1}&nbsp;/&nbsp;{2}</strong></td>", dtLiquidacion(0)("REMUNERACION_PROMEDIO").ToString, DIAS_GOZADOS_ADEL, 30)
                resb.AppendFormat("<td width='45%' align='right'><font color='red'><strong>-&nbsp;{0}</strong></font></td>", String.Format("{0:0.00}", T_DESC_VAC_ADEL))
                resb.AppendFormat("</tr>")


                TotalVacaciones = TotalVacaciones - T_DESC_VAC_ADEL
                TotalAfp = TotalVacaciones * (comision / 100)
            End If

            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='25%'><strong>{0}&nbsp;&nbsp;{1}&nbsp;{2}<strong></td>", dtLiquidacion(0)("REGIMEN_PENSIONARIO"), comision, tipo)
            resb.AppendFormat("<td width='5%' align='center'><strong>{0}<strong></td>", ":")
            resb.AppendFormat("<td width='25%'><strong>{0}&nbsp;x&nbsp;{1}&nbsp;%</strong></td>", String.Format("{0:0.00}", TotalVacaciones), comision)
            resb.AppendFormat("<td width='45%' align='right'><font color='red'><strong>-&nbsp;{0}</strong></font></td>", String.Format("{0:0.00}", TotalAfp))
            resb.AppendFormat("</tr>")


            resb.AppendFormat("<tr><td><br></td><td><br></td><td><br></td><td><br></td></tr>")

            resb.AppendFormat("</table>")

            resb.AppendFormat("<table border=""1"" width=""100%"" >")
            resb.AppendFormat("<tr><td>")
            resb.AppendFormat("<table border=""0"" width=""100%"" >")
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td  align='left' width='50%'>{0}</td>", "TOTAL")
            resb.AppendFormat("<td align='right' width='50%'>{0}</td>", String.Format("{0:0.00}", TotalVacaciones - TotalAfp))
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</table>")
            resb.AppendFormat("</td></tr>")
            resb.AppendFormat("</table><br><br>")

        End If

        'CTS
        If CODIGO_REGLABORAL = "00000001" Or CODIGO_REGLABORAL = "00000002" Then

            resb.AppendFormat("<table border=""0"" width=""100%"" >")
            resb.AppendFormat("<tr bgcolor='#E0E0E3'>")
            resb.AppendFormat("<td width='100%' height='30px'  align='left'><strong>{0}{1}</strong></td>", IIf(numeracion = True, "II", "I"), ".&nbsp;&nbsp;COMPENSACION POR TIEMPO DE SERVICIOS :&nbsp;&nbsp;", Replace(dtLiquidacion(0)("FECHA_INI").ToString, "/", "."), "&nbsp;hasta&nbsp;", Replace(dtLiquidacion(0)("FECHA_CESE").ToString, "/", "."))
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</table>")

            resb.AppendFormat("<table border=""0"" width=""100%"" >") 'acaa
            resb.AppendFormat("<tr><td><br></td><td><br></td><td><br></td><td><br></td></tr>")

            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='25%'><strong>Mes&nbsp;(&nbsp;{0}&nbsp;)</strong></td>", Split(dtLiquidacion(0)("CTS"), "%")(1))
            resb.AppendFormat("<td width='5%' align='center'><strong>:<strong></td>")
            resb.AppendFormat("<td width='25%'><strong>(&nbsp;{0}&nbsp;+&nbsp;(&nbsp;{0}&nbsp;/&nbsp;6&nbsp;)&nbsp;x&nbsp;{1}&nbsp;)&nbsp;/&nbsp;12</strong></td>", dtLiquidacion(0)("REM_TOTAL").ToString, Split(dtLiquidacion(0)("CTS"), "%")(1))
            resb.AppendFormat("<td width='45%' align='right'><strong>{0}</strong></td>", String.Format("{0:0.00}", Split(dtLiquidacion(0)("CTS"), "%")(0)))
            resb.AppendFormat("</tr>")

            resb.AppendFormat("<tr><td><br></td><td><br></td><td><br></td><td><br></td></tr>")

            resb.AppendFormat("</table>")

            resb.AppendFormat("<table border=""1"" width=""100%"" >")
            resb.AppendFormat("<tr><td>")
            resb.AppendFormat("<table border=""0"" width=""100%"" >")
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td  align='left' width='50%'>{0}</td>", "TOTAL")
            resb.AppendFormat("<td align='right' width='50%'>{0}</td>", String.Format("{0:0.00}", CTS))
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</table>")
            resb.AppendFormat("</td></tr>")
            resb.AppendFormat("</table><br><br>")

        End If

        'GRATIFICACIONES
        If CODIGO_REGLABORAL = "00000001" Or CODIGO_REGLABORAL = "00000002" Then
            resb.AppendFormat("<table border=""0"" width=""100%"" >")
            resb.AppendFormat("<tr bgcolor='#E0E0E3'>")
            resb.AppendFormat("<td width='100%' height='30px'  align='left'><strong>{0}{1}</strong></td>", IIf(numeracion = True, "III", "II"), ".&nbsp;&nbsp;GRATIFICACIONES TRUNCAS :&nbsp;&nbsp;", Replace(dtLiquidacion(0)("FECHA_INI_ULT_CONT").ToString, "/", "."), "&nbsp;hasta&nbsp;", Replace(dtLiquidacion(0)("FECHA_CESE").ToString, "/", "."))
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</table>")

            resb.AppendFormat("<table border=""0"" width=""100%"" >") 'acaa
            resb.AppendFormat("<tr><td><br></td><td><br></td><td><br></td><td><br></td></tr>")

            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='25%'><strong>Mes&nbsp;(&nbsp;{0}&nbsp;)</strong></td>", dtLiquidacion(0)("MESES_GRATI"))
            resb.AppendFormat("<td width='5%' align='center'><strong>:</strong></td>")
            resb.AppendFormat("<td width='25%'><strong>{0}&nbsp;/&nbsp;6&nbsp;x&nbsp;{1}</strong></td>", dtLiquidacion(0)("REM_TOTAL").ToString, dtLiquidacion(0)("MESES_GRATI"))
            resb.AppendFormat("<td width='45%' align='right'><strong>{0}</strong></td>", String.Format("{0:0.00}", MontoGrati))
            resb.AppendFormat("</tr>")

            resb.AppendFormat("<tr><td><br></td><td><br></td><td><br></td><td><br></td></tr>")

            resb.AppendFormat("</table>")

            resb.AppendFormat("<table border=""1"" width=""100%"" >")
            resb.AppendFormat("<tr><td>")
            resb.AppendFormat("<table border=""0"" width=""100%"" >")
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td  align='left' width='50%'>{0}</td>", "TOTAL")
            resb.AppendFormat("<td align='right' width='50%'>{0}</td>", String.Format("{0:0.00}", MontoGrati))
            resb.AppendFormat("</tr>")
            resb.AppendFormat("</table>")
            resb.AppendFormat("</td></tr>")
            resb.AppendFormat("</table><br><br>")
        End If

        'APORTESSSSSSSS
        If IND_VAC_TRUNCAS = "S" Then

            resb.AppendFormat("<table border=""0"" width=""100%"" >")
            resb.AppendFormat("<tr bgcolor='#E0E0E3'>")
            If CODIGO_REGLABORAL = "00000001" Or CODIGO_REGLABORAL = "00000002" Then
                resb.AppendFormat("<td width='100%' height='30px'  align='left'><strong>{0}{1}</strong></td>", IIf(numeracion = True, "IV", "III"), ".&nbsp;&nbsp;APORTES DEL EMPLEADOR :&nbsp;&nbsp;")
            Else
                resb.AppendFormat("<td width='100%' height='30px'  align='left'><strong>{0}{1}</strong></td>", "II", ".&nbsp;&nbsp;APORTES DEL EMPLEADOR :&nbsp;&nbsp;")
            End If

            resb.AppendFormat("</tr>")
            resb.AppendFormat("</table>")

            resb.AppendFormat("<table border=""0"" width=""100%"" >") 'acaa
            resb.AppendFormat("<tr><td><br></td><td><br></td><td><br></td><td><br></td></tr>")
            resb.AppendFormat("<tr>")
            resb.AppendFormat("<td width='25%'><strong>ESSALUD&nbsp;{0}%</strong></td>", dtLiquidacion(0)("POR_ESSALUD"))
            resb.AppendFormat("<td width='5%' align='center'><strong>:</strong></td>")
            resb.AppendFormat("<td width='25%'><strong>{0}&nbsp;x&nbsp;{1}%</strong></td>", String.Format("{0:0.00}", TotalVacaciones), dtLiquidacion(0)("POR_ESSALUD"))
            resb.AppendFormat("<td width='45%' align='right'><strong>{0}</strong></td>", String.Format("{0:0.00}", total_aporte))
            resb.AppendFormat("</tr>")

            resb.AppendFormat("<tr><td><br></td><td><br></td><td><br></td><td><br></td></tr>")

            resb.AppendFormat("</table>")


        End If

        TotalLiquidacion = MontoGrati + (TotalVacaciones - TotalAfp) + CTS + total_aporte

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")


        resb.AppendFormat("<table style='font-size: large;' border=""1"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")

        resb.AppendFormat("<table style='font-size: large;' border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr bgcolor='#E0E0E3' height='40px'>")
        resb.AppendFormat("<td width='50%'   align='right'><strong>{0}</strong></td>", "TOTAL A PAGAR :")
        resb.AppendFormat("<td width='25%'   align='center'><strong>{0}</strong></td>", "S/.")
        resb.AppendFormat("<td width='25%'   align='right'><strong>{0}</strong></td>", String.Format("{0:0.00}", TotalLiquidacion + total_vac_pendi))
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        'tabla fecha 
        resb.AppendFormat("<table border=""1"" width=""100%"">")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td>")

        Dim l As New Nomade.NB.Numalet(False, "00/100 $.", "con", True)
        Dim importeTexto As String
        importeTexto = (l.ToCustomCardinal(TotalLiquidacion + total_vac_pendi)).ToUpper()
        importeTexto = Replace(importeTexto, ".-", "") + "&nbsp;&nbsp;NUEVOS SOLES."
        resb.AppendFormat("<table border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr  style='font-size: large;'>")
        resb.AppendFormat("<td width='100%'   align='center'><strong>SON&nbsp;:&nbsp;&nbsp;{0}</strong></td>", importeTexto)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr height='50px'>")
        resb.AppendFormat("<td width='100%'   align='left'>{0}</td>", "Las partes que suscriben la presente liquidación de beneficios sociales declaran su conformidad con su contenido, no teniendo suma alguna que reclamar por este concepto.")
        resb.AppendFormat("</tr>")

        resb.AppendFormat("<tr height='30px'>")
        resb.AppendFormat("<td width='100%'></td>")
        resb.AppendFormat("</tr>")


        resb.AppendFormat("<tr>")

        resb.AppendFormat("<td width='100%'   align='right'><strong>{0}{1}<strong></td>", "________________,", "&nbsp;___ &nbsp;de&nbsp; _____________&nbsp; del&nbsp; _______&nbsp;")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table><br><br>")


        'tabla fecha 

        'tabla firmas 


        resb.AppendFormat("<table  border=""0"" width=""100%"" >")
        resb.AppendFormat("<tr height='130px'>")
        resb.AppendFormat("<td width='50%'   align='center'></td>")
        resb.AppendFormat("<td width='50%'   align='center'></td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='50%'   align='center'><strong>{0}</strong></td>", "____________________________________")
        resb.AppendFormat("<td width='50%'   align='center'><strong>{0}</strong></td>", "____________________________________")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='50%'   align='center'><strong>{0}</strong></td>", "GERENTE GENERAL")
        resb.AppendFormat("<td width='50%'   align='center'><strong>{0}</strong></td>", dtLiquidacion(0)("NOMBRE_EMPLEADO").ToString)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='50%'   align='center'><strong>{0}</strong></td>", "")
        resb.AppendFormat("<td width='50%'   align='center'><strong>{0}</strong></td>", dtLiquidacion(0)("DNI").ToString)
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")

        resb.AppendFormat("</td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        'tabla firmas 

        resb.AppendFormat("<table border=""1"" width=""100%"" >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='100%'   align='right'><strong>{0}</strong></td>", "COPIA EMPLEADOR")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table><br><br>")




        resb.AppendFormat("<br><br><br><br>")

        If p_tipo = "v" Then

            resb.AppendFormat("<table border=""0"" width=""100%"" style='display:none' color='white'>")
            resb.AppendFormat("<tr>")
            If IND_VAC_TRUNCAS = "S" Then


                If M > 0 Then
                    resb.AppendFormat("<td width='100%' class='vacaciones' >{0},Mes({1}),{2}&nbsp;x&nbsp;({3}&nbsp;/&nbsp;30)&nbsp;/&nbsp;12&nbspx&nbsp;{4},{5}</td>", "0001", M, Remuneracion, diasReg, M, String.Format("{0:0.00}", MontoMes))
                End If

                resb.AppendFormat("<td width='100%' class='vacaciones' >{0},Dias({1}),{2}&nbsp;x&nbsp;({3}&nbsp;/&nbsp;30)&nbsp;/&nbsp;12&nbsp;/&nbsp;30&nbsp;x&nbsp;{4},{5}</td>", "0001", D, Remuneracion, diasReg, D, String.Format("{0:0.00}", MontoDia))
                resb.AppendFormat("<td width='100%' class='vacaciones' >{0},{1}&nbsp;&nbsp;{2}&nbsp;{3},{4}&nbsp;x&nbsp;{5}&nbsp;%,-{6}</td>", "0001", dtLiquidacion(0)("REGIMEN_PENSIONARIO"), comision, tipo, String.Format("{0:0.00}", TotalVacaciones), comision, String.Format("{0:0.00}", TotalAfp))
                If IND_DESCUENTO_VAC_ADEL = "S" Then
                    resb.AppendFormat("<td width='100%' class='vacaciones' >{0},Adelanto Vacaciones&nbsp;Dia&nbsp;(&nbsp;{1}&nbsp;),{2}&nbsp;x&nbsp;{1}&nbsp;/&nbsp;{3},-{4}</td>", "0006", DIAS_GOZADOS_ADEL, Remuneracion, diasReg, T_DESC_VAC_ADEL)
                End If
            End If
            If CODIGO_REGLABORAL = "00000001" Or CODIGO_REGLABORAL = "00000002" Then
                resb.AppendFormat("<td width='100%' id='cts' >{0},Mes({1}),({2}+({2}/6)x{3})/12,{4}</td>", "0002", Split(dtLiquidacion(0)("CTS"), "%")(1), dtLiquidacion(0)("REM_TOTAL").ToString, Split(dtLiquidacion(0)("CTS"), "%")(1), String.Format("{0:0.00}", Split(dtLiquidacion(0)("CTS"), "%")(0)))
                resb.AppendFormat("<td width='100%' id='grati' >{0},Mes({1}),{2}/6x{3},{4}</td>", "0003", dtLiquidacion(0)("MESES_GRATI"), dtLiquidacion(0)("REM_TOTAL").ToString, dtLiquidacion(0)("MESES_GRATI"), String.Format("{0:0.00}", MontoGrati))
            Else
                resb.AppendFormat("<td width='100%' id='cts' >{0}</td>", "")
                resb.AppendFormat("<td width='100%' id='grati' >{0}</td>", "")
            End If
            If IND_VAC_TRUNCAS = "S" Then
                resb.AppendFormat("<td width='100%' id='aportes' >{0},ESSALUD({1}),{2}x{1},{3}</td>", "0004", dtLiquidacion(0)("POR_ESSALUD"), String.Format("{0:0.00}", TotalVacaciones), String.Format("{0:0.00}", total_aporte))
            End If



            resb.AppendFormat("</tr>")
            resb.AppendFormat("</table>")

            If IND_VAC_PENDIENTE = "S" Then
                resb.AppendFormat("<table border=""0"" width=""100%"" style='display:none' color='white'>")
                resb.AppendFormat("<tr>")

                resb.AppendFormat("<td width='100%' id='vac_pendientes' >{0}</td>", cadena)
                resb.AppendFormat("</tr>")
                resb.AppendFormat("</table>")
            End If
            res = resb.ToString()
        Else
            res = resb.ToString()

            res += Replace(resb.ToString(), "COPIA EMPLEADOR", "COPIA TRABAJADOR")
        End If



        'Return res
        Return res
    End Function






    Public Function Calcular(FechaInicio As Date, FechaActual As Date) As String

        Dim diaActual = DatePart("d", FechaActual)
        Dim mesActual = DatePart("m", FechaActual)
        Dim anioActual = DatePart("yyyy", FechaActual)
        '**************************************'
        Dim diaInicio = DatePart("d", FechaInicio)
        Dim mesInicio = DatePart("m", FechaInicio)
        Dim anioInicio = DatePart("yyyy", FechaInicio)

        Dim B = 0
        Dim Mes = mesInicio - 1

        ' si el mes es febrero
        If (Mes = 2) Then   ' *
            If ((anioActual / 4 = 0 And anioActual / 100.0! = 0) Or anioActual / 400 = 0) Then
                B = 29
            Else
                B = 28
            End If
        ElseIf (Mes <= 7) Then  '*
            If (Mes = 0) Then
                B = 31
            ElseIf (Mes / 2 = 0) Then
                B = 30
            Else
                B = 31
            End If

        ElseIf (Mes > 7) Then
            If (Mes / 2 = 0) Then
                B = 31
            Else
                B = 30
            End If
        End If
        Dim Anios = ""
        Dim Meses = ""
        Dim Dias = ""
        If ((anioInicio > anioActual) Or (anioInicio = anioActual And mesInicio > mesActual) Or (anioInicio = anioActual And mesInicio = mesActual And diaInicio > diaActual)) Then
            ' MsgBox "La fecha de inicio ha de ser anterior a la fecha Actual"
        Else
            If (mesInicio <= mesActual) Then
                Anios = anioActual - anioInicio
                If (diaInicio <= diaActual) Then
                    Meses = mesActual - mesInicio
                    Dias = diaActual - diaInicio
                Else
                    If (mesActual = mesInicio) Then
                        Anios = Anios - 1
                    End If
                    Meses = (mesActual - mesInicio - 1 + 12) / 12
                    Dias = B - (diaInicio - diaActual)
                End If
            Else
                Anios = anioActual - anioInicio - 1

                If (diaInicio > diaActual) Then
                    Meses = mesActual - mesInicio - 1 + 12
                    Dias = B - (diaInicio - diaActual)
                Else
                    Meses = mesActual - mesInicio + 12
                    Dias = diaActual - diaInicio
                End If
            End If

        End If '*

        Calcular = Anios & "/" & Meses & "/" & Dias

    End Function

    Public Function Calcular_AñosMesesDias(FechaInicio As Date, FechaFin As Date) As String

        Dim Anios As Integer = 0
        Dim Meses As Integer = 0
        Dim Dias As Integer = 0
        Dim Total_dias = DateDiff("d", FechaInicio, FechaFin)

        '**********ANIOS*********
        If Total_dias > 360 Then
            Anios = Int(Total_dias / 360)

        End If

        '**********MESES*********
        If (Total_dias - (Anios * 360)) > 30 Then
            Meses = Int((Total_dias - (Anios * 360)) / 30)
            Dim b = "sadasdas"

        End If

        '**********DIAS*********
        Dias = (Total_dias - (Anios * 360)) - (Meses * 30)

        Calcular_AñosMesesDias = Anios & "/" & Meses & "/" & Dias

    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
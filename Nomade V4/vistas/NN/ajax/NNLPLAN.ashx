<%@ WebHandler Language="VB" Class="NNLPLAN" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NNLPLAN : Implements IHttpHandler

    Dim OPCION As String
    Dim p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_USUA_ID, p_DETALLE, p_CABECERA As String
    Dim p_ANIO, p_MES, p_MES_DES As String
    Dim p_RUC, TIPO_PLANILLA As String



    Dim CAD_DET_PLANILLA As String = ""
    Dim dt As DataTable
    Dim res As String
    Dim resb As New StringBuilder


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")


        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        p_RUC = context.Request("p_RUC")
        p_ANIO = context.Request("p_ANIO")
        p_MES = context.Request("p_MES")
        p_MES_DES = context.Request("p_MES_DES")
        TIPO_PLANILLA = context.Request("TIPO_PLANILLA")
        p_DETALLE = context.Request("p_DETALLE")
        p_CABECERA = context.Request("p_CABECERA")

        Try

            Select Case OPCION



                Case "1" 'Generar Planilla quincenal
                    Dim dtAdicional_NA As New DataTable
                    Dim dtAdicional_AF As New DataTable
                    Dim dtNoAdicional_AF As New DataTable
                    Dim dtNoAdicional_NA As New DataTable

                    Dim dtDatosBasicos As New DataTable
                    Dim dtDatosFATAR As New DataTable
                    Dim dtVacaciones As New DataTable
                    Dim dtValoresPlanilla As New DataTable
                    'Dim dtDescuentosAfecAdic As New DataTable
                    'Dim dtDescuentosNoAfecAdic As New DataTable
                    Dim dtTardanzas As New DataTable
                    Dim dtFaltas As New DataTable
                    Dim dtHoraExtra As New DataTable
                    Dim dtAfps As New DataTable
                    Dim dtConcep_Descuentos As New DataTable
                    Dim dtDescuentos As New DataTable
                    Dim dtMontoConcpAdicionales As New DataTable

                    Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")

                    dtAdicional_AF = NNPlanilla.Listar_ConceptoxTipoPlanilla("S", "0001", "AF")
                    dtAdicional_NA = NNPlanilla.Listar_ConceptoxTipoPlanilla("S", "0001", "NA")


                    dtNoAdicional_AF = NNPlanilla.Listar_ConceptoxTipoPlanilla("N", "0001", "AF", "NO")
                    dtNoAdicional_NA = NNPlanilla.Listar_ConceptoxTipoPlanilla("N", "0001", "NA", "NO")

                    dtDatosBasicos = NNPlanilla.Listar_Datos_Basicos_Planilla(p_CTLG_CODE, "", p_MES, p_ANIO)


                    dtDatosFATAR = NNPlanilla.Listar_Datos_Valorizados_Fatar(p_CTLG_CODE, "", p_MES, p_ANIO)


                    dtVacaciones = NNPlanilla.Carga_Datos_Para_Planilla("", "", p_MES, p_ANIO, "1") 'vacaciones
                    dtValoresPlanilla = NNPlanilla.Carga_Datos_Para_Planilla(p_CTLG_CODE, "", p_MES, p_ANIO, "2")
                    dtTardanzas = NNPlanilla.Carga_Datos_Para_Planilla(p_CTLG_CODE, "", p_MES, p_ANIO, "3")
                    dtFaltas = NNPlanilla.Carga_Datos_Para_Planilla(p_CTLG_CODE, "", p_MES, p_ANIO, "4")
                    dtHoraExtra = NNPlanilla.Carga_Datos_Para_Planilla(p_CTLG_CODE, "", p_MES, p_ANIO, "5")

                    dtAfps = NNPlanilla.Carga_Datos_Para_Planilla(p_CTLG_CODE, Nothing, Nothing, Nothing, "6")

                    dtConcep_Descuentos = NNPlanilla.Listar_ConceptoxTipoPlanilla("S", "0001", "DE", "")

                    dtDescuentos = NNPlanilla.Carga_Datos_Para_Planilla(p_CTLG_CODE, "", p_MES, p_ANIO, "7")

                    dtMontoConcpAdicionales = NNPlanilla.Listar_Monto_Conceptos_Adicionales_planilla(p_ANIO, p_MES, p_CTLG_CODE, "0001")


                    res = GenerarTablaPlanillaQuincenal(dt, dtAdicional_NA, dtAdicional_AF, dtDatosBasicos, dtDatosFATAR, dtNoAdicional_AF, dtNoAdicional_NA, dtVacaciones, dtValoresPlanilla,
                                                        dtTardanzas,
                                                        dtFaltas,
                                                        dtHoraExtra,
                                                        dtAfps,
                                                        dtConcep_Descuentos,
                                                        dtDescuentos, dtMontoConcpAdicionales).ToString()



                    NNPlanilla = Nothing

                Case "2"

                    Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                    res = NNPlanilla.Crea_cabecera_detalle_planilla(p_DETALLE, p_CABECERA, p_ANIO, p_MES, p_CTLG_CODE, p_USUA_ID)
                Case "3"


                    res = ArmaPlanilla_desde_BD(p_MES, p_ANIO, p_CTLG_CODE)

                Case 4
                    Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
                    Dim dt_resp As New DataTable
                    dt_resp = NNPlanilla.Verifica_Generacion_Planilla(p_CTLG_CODE, p_MES, p_ANIO)
                    res = dt_resp(0)("RESPUESTA").ToString()

            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public Structure OrdenConceptosAfectos
        Dim concepto As String
    End Structure


    Public Structure OrdenConceptosNoAfectos
        Dim concepto As String
    End Structure


    Public Structure OrdenCOnceptosDescuentos
        Dim concepto As String
    End Structure

    Public Function GenerarTablaPlanillaQuincenal(ByVal dt As DataTable, dtAdicional_NA As DataTable, dtAdicional_AF As DataTable, dtDatosBasicos As DataTable,
                                                  dtDatosFATAR As DataTable,
                                                  dtNoAdicional_AF As DataTable,
                                                  dtNoAdicional_NA As DataTable,
                                                  dtVacaciones As DataTable,
                                                  dtValoresPlanilla As DataTable,
                                                  dtTardanzas As DataTable,
                                                  dtFaltas As DataTable,
                                                  dtHoraExtra As DataTable,
                                                  dtAfps As DataTable,
                                                  dtConcep_Descuentos As DataTable,
                                                  dtDescuentos As DataTable,
                                                  dtMontoConcpAdicionales As DataTable) As String
        Dim total As Decimal = 0
        Dim lst_afectos As New List(Of OrdenConceptosAfectos)
        Dim lst_no_afectos As New List(Of OrdenConceptosNoAfectos)
        Dim lst_descuentos As New List(Of OrdenCOnceptosDescuentos)
        Dim var As OrdenConceptosAfectos
        Dim var_1 As OrdenConceptosNoAfectos
        Dim var_2 As OrdenCOnceptosDescuentos
        Dim Total_afecto As Decimal = 0.0
        Dim Total_no_afecto As Decimal = 0.0
        Dim sum_rem_afec As Decimal = 0.0
        Dim sum_rem_no_afec As Decimal = 0.0
        Dim Sum_descuentos As Decimal = 0.0
        Dim total_sueldo_neto As Decimal = 0.0
        Dim total_descuentos As Decimal = 0.0
        Dim total_essalud As Decimal = 0.0
        Dim CAD_CAB_PLANILLA As String = ""
        CAD_DET_PLANILLA = ""
        'For i As Integer = 0 To 4
        '    Dim var As OrdenConceptos
        '    vard.apellido = "dsfsdfsd"
        '    vard.nombre = "sfdsdsd"
        '    listaxxx.Add(vard)
        'Next

        'Dim vsry As variableXXX

        'vsry = listaxxx.ElementAt(0)



        res = ""
        resb.Clear()
        '------
        Dim dtEmpresa As New DataTable
        Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
        dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "")
        resb.AppendFormat("<table border='0' width='100%' >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PERIODO:")
        resb.AppendFormat("<td width='75%'>{0} {1}</td>", " " & p_MES.ToUpper(), " " & p_ANIO.ToUpper())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PLANILLA:")
        resb.AppendFormat("<td width='75%'>PLANILLA {0}{1}{2}{3}</td>", IIf(TIPO_PLANILLA = "1", "QUINCENAL ", "MENSUAL "), dtEmpresa.Rows(0)("CORTO").ToString(), " " & p_MES.ToUpper(), " " & p_ANIO.ToUpper())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "RUC:")
        resb.AppendFormat("<td id='ruc' width='75%'>{0}</td>", dtEmpresa.Rows(0)("RUC").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZON SOCIAL:")
        resb.AppendFormat("<td width='75%'>{0}</td>", dtEmpresa.Rows(0)("DESCRIPCION").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", " (Expresado en Nuevos Soles)")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        resb.AppendFormat("<br/>")

        resb.AppendFormat("<table id='tblplanilla' border='1' style='max-width:8000px;width:5570px;color:white' width:'5570px'>")
        resb.AppendFormat("<thead>")
        Dim cont_colums_total As Integer = 19
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#4682B4' color='white'>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;'>Cód Trab.</th>")
        resb.AppendFormat("<th rowspan='2' colspan='2'  style='width:100px;'>Datos del Trabajador</th>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;'>Banco</th>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;'>D.N.I</th>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;' >Local</th>")
        resb.AppendFormat("<th rowspan='2' colspan='2' style='width:150px;'>Condiciones</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:85px;'>Dias Laborados</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:85px;'>Dias Efectivos</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:85px;'>Horas Efectivas Laboradas</th>")
        'resb.AppendFormat("<th rowspan='3' style='width:85px;'>Horas Extras Acumuladas</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Días Faltados</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Minutos Tardanza</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Fecha de Cese</th>")
        resb.AppendFormat("<th rowspan='2' colspan='3' style='width:85px;'> No Subsidios(Primeros 20 Dias)</th>")
        resb.AppendFormat("<th rowspan='2' colspan='3' style='width:85px;'> Subsidios(Apartir del 21 Dia)</th>")
        resb.AppendFormat("<th rowspan='2' colspan='2' style='width:85px;'> Período Vacacional</th>")
        'remuneraciones afectos'
        Dim Ncolum_afectas_Adicionales As Integer = 0
        If Not dtAdicional_AF Is Nothing Then
            Ncolum_afectas_Adicionales = dtAdicional_AF.Rows.Count
        End If
        Dim Ncolum_afectas_No_adicionales As Integer = 0
        If Not dtNoAdicional_AF Is Nothing Then
            Ncolum_afectas_No_adicionales = dtNoAdicional_AF.Rows.Count
        End If

        resb.AppendFormat("<th rowspan='2' colspan='{0}' style='width:350px;'>Remuneraciones Afectas</th>", Ncolum_afectas_Adicionales + Ncolum_afectas_No_adicionales + 1)

        'remuneraciones NO afectos'

        Dim Ncolum_Noafectas_Adicionales As Integer = 0
        If Not dtAdicional_NA Is Nothing Then
            Ncolum_Noafectas_Adicionales = dtAdicional_NA.Rows.Count
        End If
        Dim Ncolum_Noafectas_No_adicionales As Integer = 0
        If Not dtNoAdicional_NA Is Nothing Then
            Ncolum_Noafectas_No_adicionales = dtNoAdicional_NA.Rows.Count
        End If


        'descuentos 
        Dim Ncolum_Descuentos As Integer = 0
        If Not dtConcep_Descuentos Is Nothing Then
            Ncolum_Descuentos = dtConcep_Descuentos.Rows.Count
        End If
        resb.AppendFormat("<th rowspan='2' colspan='{0}' style='width:450px;'>Remuneraciones No Afectas</th>", Ncolum_Noafectas_Adicionales + Ncolum_Noafectas_No_adicionales + 1)


        resb.AppendFormat("<th rowspan='3' style='width:85px;'>TOTAL REMUNERACION</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>AFP / SNP</th>")
        resb.AppendFormat("<th colspan='{0}' style='width:100px;'>Descuentos al Trabajador</th>", Ncolum_Descuentos + 4)
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Total Descuento</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Sueldo Neto a Pagar</th>")
        resb.AppendFormat("<th style='width:85px;'>APORTACIONES DEL EMPLEADOR</th>")

        resb.AppendFormat("</tr>")
        'Fila 2 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#4682B4' color='white'>")

        resb.AppendFormat("<th colspan='4' style='width:80px;'>Fondo de Pensiones</th>")

        If Ncolum_Descuentos > 0 Then
            resb.AppendFormat("<th colspan='{0}' style='width:80px;'>Varios</th>", Ncolum_Descuentos)
        Else
            resb.AppendFormat("<th colspan='{0}' style='display:none'>Varios</th>", Ncolum_Descuentos)
        End If


        resb.AppendFormat("<th style='width:80px;'>Esssalud</th>")


        resb.AppendFormat("</tr>")
        'Fila 3 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")

        resb.AppendFormat("<th style='width:200px;'>Apellidos</th>")
        resb.AppendFormat("<th style='width:200px;'>Nombres</th>")


        resb.AppendFormat("<th style='width:200px;'>EPS</th>")
        resb.AppendFormat("<th style='width:200px;'>Labor</th>")
        'resb.AppendFormat("<th style='width:200px;'>SCTR</th>")

        resb.AppendFormat("<th style='width:80px;background-color:#999;'>Tipo</th>")
        resb.AppendFormat("<th style='width:80px;background-color:#999;'>Desde</th>")
        resb.AppendFormat("<th style='width:60px;background-color:#999;'>Hasta</th>")

        resb.AppendFormat("<th style='width:80px;'>Tipo</th>")
        resb.AppendFormat("<th style='width:80px;'>Desde</th>")
        resb.AppendFormat("<th style='width:60px;'>Hasta</th>")

        resb.AppendFormat("<th style='width:80px;background-color:#999;'>Inicio</th>")
        resb.AppendFormat("<th style='width:80px;background-color:#999;'>Fin</th>")



        'adicionales afectos
        If Not dtAdicional_AF Is Nothing Then

            For i As Integer = 0 To dtAdicional_AF.Rows.Count - 1
                resb.AppendFormat("<th style='width:100px;'>{0}</th>", dtAdicional_AF(i)("DESCRIPCION").ToString)
                var.concepto = dtAdicional_AF(i)("CODE_PLAN").ToString
                lst_afectos.Add(var)

            Next

        End If

        'no adicionales  afectos
        If Not dtNoAdicional_AF Is Nothing Then
            For i As Integer = 0 To dtNoAdicional_AF.Rows.Count - 1
                resb.AppendFormat("<th style='width:100px;'>{0}</th>", dtNoAdicional_AF(i)("DESCRIPCION").ToString)
                var.concepto = dtNoAdicional_AF(i)("CODE_PLAN").ToString
                lst_afectos.Add(var)
            Next

        End If



        resb.AppendFormat("<th style='width:100px;'>Total Afecto</th>")
        ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        'adicionales no afectos
        If Not dtAdicional_NA Is Nothing Then
            For i As Integer = 0 To dtAdicional_NA.Rows.Count - 1
                resb.AppendFormat("<th style='width:100px;background-color:#999;'>{0}</th>", dtAdicional_NA(i)("DESCRIPCION").ToString)
                var_1.concepto = dtAdicional_NA(i)("CODE_PLAN").ToString
                lst_no_afectos.Add(var_1)
            Next

        End If

        'no adicionales no afectos
        If Not dtNoAdicional_NA Is Nothing Then
            For i As Integer = 0 To dtNoAdicional_NA.Rows.Count - 1
                resb.AppendFormat("<th style='width:100px;background-color:#999;'>{0}</th>", dtNoAdicional_NA(i)("DESCRIPCION").ToString)
                var_1.concepto = dtNoAdicional_NA(i)("CODE_PLAN").ToString
                lst_no_afectos.Add(var_1)
            Next

        End If



        resb.AppendFormat("<th style='width:100px;background-color:#999;'>Total No Afecto</th>")
        ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        resb.AppendFormat("<th style='width:60px;'>S.N.P 13%</th>")
        resb.AppendFormat("<th style='width:60px;'>Aportac. AFP 10%</th>")
        resb.AppendFormat("<th style='width:60px;'>Comision AFP</th>")
        resb.AppendFormat("<th style='width:60px;'>Seguros AFP</th>")



        ' conceptos de descuentos agregados en lista
        If Not dtConcep_Descuentos Is Nothing Then
            For i As Integer = 0 To dtConcep_Descuentos.Rows.Count - 1
                resb.AppendFormat("<th style='width:100px;background-color:#999;'>{0}</th>", dtConcep_Descuentos(i)("DESCRIPCION").ToString)
                var_2.concepto = dtConcep_Descuentos(i)("CODE_PLAN").ToString
                lst_descuentos.Add(var_2)
            Next

        End If



        resb.AppendFormat("<th style='width:80px;'>De Regulares</th>")


        resb.AppendFormat("</tr>")

        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody  >")

        Dim b As Boolean = False
        If Not dtDatosBasicos Is Nothing Then
            For i As Integer = 0 To dtDatosBasicos.Rows.Count - 1
                resb.AppendFormat("<tr style='font-size:9px;color:black;'>")
                resb.AppendFormat("<td align='left' >{0}</td>", dtDatosBasicos.Rows(i)("ID").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dtDatosBasicos.Rows(i)("APELLIDOS").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dtDatosBasicos.Rows(i)("NOMBRES").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dtDatosBasicos.Rows(i)("DESC_BANCO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dtDatosBasicos.Rows(i)("DNI").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dtDatosBasicos.Rows(i)("DESC_LOCAL").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dtDatosBasicos.Rows(i)("TIPO_REG_SALUD").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dtDatosBasicos.Rows(i)("DESC_REGIMEN_LABORAL").ToString())


                If b Then
                    CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "|" + dtDatosBasicos.Rows(i)("ID").ToString() + "," +
                                                                  dtDatosBasicos.Rows(i)("PIDM").ToString() + "," +
                                                                dtDatosBasicos.Rows(i)("APELLIDOS").ToString() + "," +
                                                                  dtDatosBasicos.Rows(i)("NOMBRES").ToString() + "," +
                                                                    IIf(dtDatosBasicos.Rows(i)("DESC_BANCO").ToString() = "", "-", dtDatosBasicos.Rows(i)("DESC_BANCO").ToString()) + "," +
                                                                      dtDatosBasicos.Rows(i)("DNI").ToString() + "," +
                                                                        dtDatosBasicos.Rows(i)("DESC_LOCAL").ToString() + "," +
                                                                          dtDatosBasicos.Rows(i)("TIPO_REG_SALUD").ToString() + "," +
                                                                            dtDatosBasicos.Rows(i)("DESC_REGIMEN_LABORAL").ToString() + "," +
                                                                            p_CTLG_CODE.ToString + "," + p_MES.ToString + "," + p_ANIO.ToString
                Else

                    CAD_CAB_PLANILLA = dtDatosBasicos.Rows(i)("ID").ToString() + "," +
                                        dtDatosBasicos.Rows(i)("PIDM").ToString() + "," +
                                        dtDatosBasicos.Rows(i)("APELLIDOS").ToString() + "," +
                                          dtDatosBasicos.Rows(i)("NOMBRES").ToString() + "," +
                                           IIf(dtDatosBasicos.Rows(i)("DESC_BANCO").ToString() = "", "-", dtDatosBasicos.Rows(i)("DESC_BANCO").ToString()) + "," +
                                              dtDatosBasicos.Rows(i)("DNI").ToString() + "," +
                                                dtDatosBasicos.Rows(i)("DESC_LOCAL").ToString() + "," +
                                                  dtDatosBasicos.Rows(i)("TIPO_REG_SALUD").ToString() + "," +
                                                    dtDatosBasicos.Rows(i)("DESC_REGIMEN_LABORAL").ToString() + "," +
                                                     p_CTLG_CODE.ToString + "," + p_MES.ToString + "," + p_ANIO.ToString
                    b = True
                End If



                Dim bool As Boolean = False
                If Not dtDatosFATAR Is Nothing Then
                    For k As Integer = 0 To dtDatosFATAR.Rows.Count - 1
                        If dtDatosBasicos.Rows(i)("DNI").ToString() = dtDatosFATAR.Rows(k)("RHFATAV_NUMERO_DCTO").ToString() Then
                            resb.AppendFormat("<td align='center' >{0}</td>", dtDatosFATAR.Rows(k)("RHFATAV_FALTAS_INJUST").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", Convert.ToDouble(dtDatosFATAR.Rows(k)("RHFATAV_TARDANZAS_MIN").ToString()) * -1)
                            bool = True


                            'ARMANDO CADENA PARA INSERTAR CABEZERA
                            CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + dtDatosFATAR.Rows(k)("RHFATAV_FALTAS_INJUST").ToString() + "," +
                                                                     (Convert.ToDouble(dtDatosFATAR.Rows(k)("RHFATAV_TARDANZAS_MIN").ToString()) * -1).ToString()



                        End If

                    Next

                    If bool = False Then
                        resb.AppendFormat("<td align='center' >{0}</td>", "-")
                        resb.AppendFormat("<td align='center' >{0}</td>", "-")
                        CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-," + "-"
                    End If

                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", "-")
                    resb.AppendFormat("<td align='center' >{0}</td>", "-")
                    CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-," + "-"
                End If

                Dim mm As String = ""
                Dim yyyy As String = ""
                If dtDatosBasicos.Rows(i)("FECHA_CESE").ToString <> "" Then
                    mm = dtDatosBasicos.Rows(i)("MES").ToString() 'DPORTA
                    yyyy = dtDatosBasicos.Rows(i)("ANIO").ToString() 'DPORTA
                End If

                If p_MES.Length = 1 Then 'DPORTA
                    p_MES = 0 & p_MES
                End If

                If mm = p_MES And yyyy = p_ANIO Then
                    resb.AppendFormat("<td align='center' >{0}</td>", dtDatosBasicos.Rows(i)("FECHA_CESE").ToString())
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", "")
                End If




                'ARMANDO CADENA PARA INSERTAR CABEZERA
                CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + IIf(dtDatosBasicos.Rows(i)("FECHA_CESE").ToString() = "", "-", dtDatosBasicos.Rows(i)("FECHA_CESE").ToString())

                resb.AppendFormat("<td align='center' >{0}</td>", "")
                resb.AppendFormat("<td align='center' >{0}</td>", "")
                resb.AppendFormat("<td align='center' >{0}</td>", "")
                resb.AppendFormat("<td align='center' >{0}</td>", "")
                resb.AppendFormat("<td align='center' >{0}</td>", "")
                resb.AppendFormat("<td align='center' >{0}</td>", "")


                bool = False
                Dim cadena_vac_ini As String = ""
                Dim cadena_vac_fin As String = ""
                If Not dtVacaciones Is Nothing Then
                    For k As Integer = 0 To dtVacaciones.Rows.Count - 1
                        If dtDatosBasicos.Rows(i)("PIDM").ToString() = dtVacaciones.Rows(k)("PIDM").ToString() Then
                            'resb.AppendFormat("<td align='center' >{0}</td>", dtVacaciones.Rows(k)("FECHA_INICIO").ToString())
                            'resb.AppendFormat("<td align='center' >{0}</td>", dtVacaciones.Rows(k)("FECHA_FIN").ToString())
                            bool = True

                            If cadena_vac_ini <> "" Then
                                cadena_vac_ini = cadena_vac_ini + "<br>" + dtVacaciones.Rows(k)("FECHA_INICIO").ToString()
                            Else
                                cadena_vac_ini = dtVacaciones.Rows(k)("FECHA_INICIO").ToString()
                            End If


                            If cadena_vac_fin <> "" Then
                                cadena_vac_fin = cadena_vac_fin + "<br>" + dtVacaciones.Rows(k)("FECHA_FIN").ToString()
                            Else
                                cadena_vac_fin = dtVacaciones.Rows(k)("FECHA_FIN").ToString()
                            End If





                        End If

                    Next

                    If bool = False Then
                        resb.AppendFormat("<td align='center' >{0}</td>", "")
                        resb.AppendFormat("<td align='center' >{0}</td>", "")
                        'ARMANDO CADENA PARA INSERTAR CABEZERA
                        CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-" + "," + "-"
                    Else
                        resb.AppendFormat("<td align='center' >{0}</td>", cadena_vac_ini)
                        resb.AppendFormat("<td align='center' >{0}</td>", cadena_vac_fin)
                        'ARMANDO CADENA PARA INSERTAR CABEZERA
                        CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + cadena_vac_ini + "," + cadena_vac_fin
                    End If

                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", "")
                    resb.AppendFormat("<td align='center' >{0}</td>", "")
                    'ARMANDO CADENA PARA INSERTAR CABEZERA
                    CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-" + "," + "-"
                End If







                'resb.AppendFormat("<td align='center' >{0}</td>", "ad")
                'resb.AppendFormat("<td align='center' >{0}</td>", "a")


                Total_afecto = 0.0
                For x As Integer = 0 To lst_afectos.Count - 1


                    Select Case lst_afectos.ElementAt(x).concepto

                        Case "0201"

                            'A S I G N A C I O N   -   F A M I L I A R
                            bool = False
                            If Not dtValoresPlanilla Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtValoresPlanilla.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_afecto = Total_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0201", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "AF")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0201", "0.00", "AF")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0201", "0.00", "AF")
                            End If
                            'A S I G N A C I O N   -   F A M I L I A R


                        Case "0121"

                            'R E M U N E R A C I O N   -   B A S I C A
                            bool = False
                            If Not dtValoresPlanilla Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtValoresPlanilla.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_afecto = Total_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0121", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "AF")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0121", "0.00", "AF")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0121", "0.00", "AF")
                            End If
                            'R E M U N E R A C I O N   -   B A S I C A

                        Case "0909"
                            'M O V I L I D A D
                            bool = False
                            If Not dtValoresPlanilla Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtValoresPlanilla.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_afecto = Total_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0909", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "AF")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0909", "0.00", "AF")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0909", "0.00", "AF")
                            End If
                            'M O V I L I D A D

                        Case "0905"
                            'G A S T O S - E N - R E P R E S E N T A C I O N
                            bool = False
                            If Not dtValoresPlanilla Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtValoresPlanilla.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_afecto = Total_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0905", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "AF")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0905", "0.00", "AF")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0905", "0.00", "AF")
                            End If
                            'G A S T O S - E N - R E P R E S E N T A C I O N

                        Case "0914"
                            'R E F R I G E R I O 
                            bool = False
                            If Not dtValoresPlanilla Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtValoresPlanilla.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_afecto = Total_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0914", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "AF")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0914", "0.00", "AF")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0914", "0.00", "AF")
                            End If
                            'R E F R I G E R I O 

                        Case "0704"
                            'T A R D A N Z A S
                            bool = False
                            If Not dtTardanzas Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtTardanzas.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_afecto = Total_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0704", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "AF")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0704", "0.00", "AF")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0704", "0.00", "AF")
                            End If
                            'T A R D A N Z A S

                        Case "0705"
                            'I N A S I S T E N C I A S
                            bool = False
                            If Not dtFaltas Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtFaltas.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_afecto = Total_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0705", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "AF")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0705", "0.00", "AF")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0705", "0.00", "AF")
                            End If
                            'I N A S I S T E N C I A S

                        Case "0105"
                            'H O R A S - E X T R A S  25%
                            bool = False
                            If Not dtHoraExtra Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtHoraExtra.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2))
                                    Total_afecto = Total_afecto + Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0105", Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2).ToString, "AF")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0105", "0.00", "AF")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0105", "0.00", "AF")
                            End If
                            'H O R A S - E X T R A S  25%

                        Case "0106"
                            'H O R A S - E X T R A S  35%
                            bool = False
                            If Not dtHoraExtra Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtHoraExtra.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2))
                                    Total_afecto = Total_afecto + Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0106", Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2).ToString, "AF")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0106", "0.00", "AF")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0106", "0.00", "AF")
                            End If
                            'H O R A S - E X T R A S  35%
                        Case "0701"
                            'A D E L A N T O  -  S U E L D O
                            bool = False
                            If Not dtDescuentos Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtDescuentos.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", (Decimal.Round(CDec(row(0)("MONTO").ToString), 2) * -1))
                                    ' Sum_descuentos = Sum_descuentos + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    Total_afecto = Total_afecto + (Decimal.Round(CDec(row(0)("MONTO").ToString), 2) * -1)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0701", (Decimal.Round(CDec(row(0)("MONTO").ToString), 2) * -1).ToString, "AF")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0701", "0.00", "AF")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0701", "0.00", "AF")
                            End If
                            'A D E L A N T O  -  S U E L D O   
                        Case "0201"
                            'A S I G N A C I O N -  F A M I L I A R
                            resb.AppendFormat("<td align='center' >{0}</td>", "0.00")

                        Case "0101", "0102", "0103", "0104", "0107", "0108", "0109", "0110", "0111", "0112", "0113", "0114", "0115", "0116", "0117", "0119", "0120",
                            "0122", "0123", "0124", "0125", "0126", "0127",
                            "0201", "0202", "0203", "0204", "0206", "0207", "0208", "0209", "0210", "0211", "0212", "0213", "0214",
                            "0301", "0302", "0303", "0304", "0305", "0306", "0307", "0308", "0309", "0310", "0311", "0312", "0313",
                            "0401", "0402", "0403", "0404", "0405", "0406", "0407",
                            "0501", "0502", "0503", "0504", "0505", "0506", "0507",
                            "0601", "0602", "0603", "0604", "0605", "0606", "0607", "0608", "0609", "0610", "0611", "0612", "0613",
                            "0702", "0703", "0704", "0705", "0706", "0707",
                            "0801", "0802", "0803", "0804", "0805", "0806", "0807", "0808", "0809", "0810", "0811",
                            "0901", "0902", "0903", "0904", "0905", "0906", "0907", "0908", "0909", "0910", "0911", "0912", "0913",
                            "0914", "0915", "0916", "0917", "0918", "0919", "0920", "0921", "0922", "0923", "0924", "0925"

                            Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_afectos.ElementAt(x).concepto + "'"







                            If Not (dtMontoConcpAdicionales Is Nothing) Then
                                Dim row() As DataRow = dtMontoConcpAdicionales.Select(filtro)

                                If row.Length > 0 Then
                                    Total_afecto = Total_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, lst_afectos.ElementAt(x).concepto.ToString, Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "AF")
                                Else
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, lst_afectos.ElementAt(x).concepto.ToString, "0.00", "AF")
                                End If

                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, lst_afectos.ElementAt(x).concepto.ToString, "0.00", "AF")
                            End If


                    End Select

                Next

                sum_rem_afec = sum_rem_afec + Total_afecto
                ' T O T A L - A F E C T O
                resb.AppendFormat("<td align='center' >{0}</td>", Total_afecto)
                'ARMANDO CADENA PARA INSERTAR CABEZERA
                CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + Total_afecto.ToString


                Total_no_afecto = 0.0
                For x As Integer = 0 To lst_no_afectos.Count - 1

                    Select Case lst_no_afectos.ElementAt(x).concepto



                        Case "0201"

                            'A S I G N A C I O N    -    F A M I L I A R
                            bool = False
                            If Not dtValoresPlanilla Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_no_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtValoresPlanilla.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_no_afecto = Total_no_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0201", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "NA")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0201", "0.00", "NA")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0201", "0.00", "NA")
                            End If
                            'A S I G N A C I O N    -    F A M I L I A R

                        Case "0121"

                            'R E M U N E R A C I O N   -   B A S I C A
                            bool = False
                            If Not dtValoresPlanilla Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_no_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtValoresPlanilla.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_no_afecto = Total_no_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0121", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "NA")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0121", "0.00", "NA")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0121", "0.00", "NA")
                            End If
                            'R E M U N E R A C I O N   -   B A S I C A

                        Case "0909"
                            'M O V I L I D A D
                            bool = False
                            If Not dtValoresPlanilla Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_no_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtValoresPlanilla.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_no_afecto = Total_no_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0909", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "NA")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0909", "0.00", "NA")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0909", "0.00", "NA")
                            End If
                            'M O V I L I D A D

                        Case "0905"
                            'G A S T O S - E N - R E P R E S E N T A C I O N
                            bool = False
                            If Not dtValoresPlanilla Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_no_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtValoresPlanilla.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_no_afecto = Total_no_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0905", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "NA")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0905", "0.00", "NA")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0905", "0.00", "NA")
                            End If
                            'G A S T O S - E N - R E P R E S E N T A C I O N

                        Case "0914"
                            'R E F R I G E R I O 
                            bool = False
                            If Not dtValoresPlanilla Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_no_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtValoresPlanilla.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_no_afecto = Total_no_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0914", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "NA")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0914", "0.00", "NA")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0914", "0.00", "NA")
                            End If
                            'R E F R I G E R I O 

                        Case "0704"
                            'T A R D A N Z A S
                            bool = False
                            If Not dtTardanzas Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_no_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtTardanzas.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_no_afecto = Total_no_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0704", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "NA")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0704", "0.00", "NA")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0704", "0.00", "NA")
                            End If
                            'T A R D A N Z A S

                        Case "0705"
                            'I N A S I S T E N C I A S
                            bool = False
                            If Not dtFaltas Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_no_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtFaltas.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    Total_no_afecto = Total_no_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0705", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "NA")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0705", "0.00", "NA")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0705", "0.00", "NA")
                            End If
                            'I N A S I S T E N C I A S

                        Case "0105"
                            'H O R A S - E X T R A S  25%
                            bool = False
                            If Not dtHoraExtra Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_no_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtHoraExtra.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2))
                                    Total_no_afecto = Total_no_afecto + Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0105", Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2).ToString, "NA")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0105", "0.00", "NA")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0105", "0.00", "NA")
                            End If
                            'H O R A S - E X T R A S  25%

                        Case "0106"
                            'H O R A S - E X T R A S  35%
                            bool = False
                            If Not dtHoraExtra Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_no_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtHoraExtra.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2))
                                    Total_no_afecto = Total_no_afecto + Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0106", Decimal.Round(CDec(row(0)("PAGO_X_MINUTO").ToString), 2).ToString, "NA")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0106", "0.00", "NA")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0106", "0.00", "NA")
                            End If
                            'H O R A S - E X T R A S  35%
                        Case "0701"
                            'A D E L A N T O  -  S U E L D O
                            bool = False
                            If Not dtDescuentos Is Nothing Then
                                Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_no_afectos.ElementAt(x).concepto + "'"
                                Dim row() As DataRow = dtDescuentos.Select(filtro)

                                If row.Count > 0 Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", (Decimal.Round(CDec(row(0)("MONTO").ToString), 2) * -1))
                                    'Sum_descuentos = Sum_descuentos + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    Total_no_afecto = Total_no_afecto + (Decimal.Round(CDec(row(0)("MONTO").ToString), 2) * -1)
                                    bool = True
                                    'ARMA CADENA DETALLE
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0701", (Decimal.Round(CDec(row(0)("MONTO").ToString), 2) * -1).ToString, "NA")
                                End If

                                If bool = False Then
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    'ARMANDO CADENA DETALLE PLANILLA
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0701", "0.00", "NA")
                                End If
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                'ARMANDO CADENA DETALLE PLANILLA
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0701", "0.00", "NA")
                            End If
                            'A D E L A N T O  -  S U E L D O

                        Case "0201"
                            'A S I G N A C I O N -  F A M I L I A R
                            resb.AppendFormat("<td align='center' >{0}</td>", "0.00")

                        Case "0101", "0102", "0103", "0104", "0107", "0108", "0109", "0110", "0111", "0112", "0113", "0114", "0115", "0116", "0117", "0119", "0120",
                            "0122", "0123", "0124", "0125", "0126", "0127",
                            "0201", "0202", "0203", "0204", "0206", "0207", "0208", "0209", "0210", "0211", "0212", "0213", "0214",
                            "0301", "0302", "0303", "0304", "0305", "0306", "0307", "0308", "0309", "0310", "0311", "0312", "0313",
                            "0401", "0402", "0403", "0404", "0405", "0406", "0407",
                            "0501", "0502", "0503", "0504", "0505", "0506", "0507",
                            "0601", "0602", "0603", "0604", "0605", "0606", "0607", "0608", "0609", "0610", "0611", "0612", "0613",
                            "0702", "0703", "0704", "0705", "0706", "0707",
                            "0801", "0802", "0803", "0804", "0805", "0806", "0807", "0808", "0809", "0810", "0811",
                            "0901", "0902", "0903", "0904", "0905", "0906", "0907", "0908", "0909", "0910", "0911", "0912", "0913",
                            "0914", "0915", "0916", "0917", "0918", "0919", "0920", "0921", "0922", "0923", "0924", "0925"

                            Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_no_afectos.ElementAt(x).concepto + "'"


                            If Not (dtMontoConcpAdicionales Is Nothing) Then
                                Dim row() As DataRow = dtMontoConcpAdicionales.Select(filtro)

                                If row.Length > 0 Then
                                    Total_no_afecto = Total_no_afecto + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, lst_no_afectos.ElementAt(x).concepto.ToString, Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "NA")
                                Else
                                    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, lst_no_afectos.ElementAt(x).concepto.ToString, "0.00", "NA")
                                End If

                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, lst_no_afectos.ElementAt(x).concepto.ToString, "0.00", "NA")
                            End If



                    End Select
                Next


                sum_rem_no_afec = sum_rem_no_afec + Total_no_afecto
                ' T O T A L - N O  - A F E C T O
                resb.AppendFormat("<td align='center' >{0}</td>", Total_no_afecto)
                resb.AppendFormat("<td align='center' >{0}</td>", Total_afecto + Total_no_afecto)

                'ARMANDO CADENA PARA INSERTAR CABEZERA
                CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + Total_no_afecto.ToString + "," + (Total_afecto + Total_no_afecto).ToString

                ' A F P
                Dim pos As Integer = -1
                bool = False
                If Not dtAfps Is Nothing Then
                    For k As Integer = 0 To dtAfps.Rows.Count - 1
                        If dtDatosBasicos.Rows(i)("PIDM").ToString() = dtAfps.Rows(k)("PIDM").ToString() Then
                            resb.AppendFormat("<td align='center' >{0}</td>", dtAfps.Rows(k)("REPE_DESC").ToString())
                            pos = k
                            bool = True
                            'ARMANDO CADENA PARA INSERTAR CABEZERA
                            CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + dtAfps.Rows(k)("REPE_DESC").ToString()
                        End If

                    Next

                    If bool = False Then
                        resb.AppendFormat("<td align='center' >{0}</td>", "")
                        CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-"
                    End If

                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", "")
                    CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-"

                End If

                Sum_descuentos = 0.0
                'O N P - S I S T E M A   - N A C I O N A L  - P E N S I O N E S
                If Not dtAfps Is Nothing Then
                    If pos <> -1 Then
                        If dtAfps.Rows(pos)("REPE_COD_SUNAT").ToString.Equals("3") Or
                      dtAfps.Rows(pos)("REPE_COD_SUNAT").ToString.Equals("48") Then

                            resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round((CDec(Total_afecto * (13 / 100))), 2))
                            Sum_descuentos = Sum_descuentos + Decimal.Round((CDec(Total_afecto * (13 / 100))), 2)

                            'ARMANDO CADENA PARA INSERTAR CABEZERA
                            CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + Decimal.Round((CDec(Total_afecto * (13 / 100))), 2).ToString
                        Else
                            resb.AppendFormat("<td align='center' >{0}</td>", "-")
                            'ARMANDO CADENA PARA INSERTAR CABEZERA
                            CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-"
                        End If
                    Else
                        resb.AppendFormat("<td align='center' >{0}</td>", "-")
                        'ARMANDO CADENA PARA INSERTAR CABEZERA
                        CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-"
                    End If


                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", "-")
                    'ARMANDO CADENA PARA INSERTAR CABEZERA
                    CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-"
                End If




                If Not dtAfps Is Nothing Then
                    If pos <> -1 Then
                        If dtAfps.Rows(pos)("REPE_COD_SUNAT").ToString() <> "3" And
                   dtAfps.Rows(pos)("REPE_COD_SUNAT").ToString() <> "99" And
                   dtAfps.Rows(pos)("REPE_COD_SUNAT").ToString() <> "48" Then

                            resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round((CDec(Total_afecto * (10 / 100))), 2))
                            Sum_descuentos = Sum_descuentos + Decimal.Round((CDec(Total_afecto * (10 / 100))), 2)

                            'ARMANDO CADENA PARA INSERTAR CABEZERA
                            CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + Decimal.Round((CDec(Total_afecto * (10 / 100))), 2).ToString
                        Else
                            resb.AppendFormat("<td align='center' >{0}</td>", "-")
                            'ARMANDO CADENA PARA INSERTAR CABEZERA
                            CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-"
                        End If
                    Else
                        resb.AppendFormat("<td align='center' >{0}</td>", "-")
                        'ARMANDO CADENA PARA INSERTAR CABEZERA
                        CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-"
                    End If


                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", "-")
                    'ARMANDO CADENA PARA INSERTAR CABEZERA
                    CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + "-"
                End If


                Dim com As Decimal = 0
                Dim prima As Decimal = 0
                If pos <> -1 Then
                    com = Devuelve_Comision(dtAfps.Rows(pos)("REPE_CODE").ToString(), (p_MES + p_ANIO), dtAfps.Rows(pos)("MIXTA_IND").ToString(), p_CTLG_CODE)
                    prima = Devuelve_Prima_Seguro(dtAfps.Rows(pos)("REPE_CODE").ToString(), (p_MES + p_ANIO), p_CTLG_CODE)
                End If

                resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(((Total_afecto + Total_no_afecto) * (com / 100)), 2))
                resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(((Total_afecto + Total_no_afecto) * (prima / 100)), 2))




                Sum_descuentos = Sum_descuentos + Decimal.Round(((Total_afecto + Total_no_afecto) * (com / 100)), 2) + Decimal.Round(((Total_afecto + Total_no_afecto) * (prima / 100)), 2)

                'ARMANDO CADENA PARA INSERTAR CABEZERA
                CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + Decimal.Round(((Total_afecto + Total_no_afecto) * (com / 100)), 2).ToString + "," +
                                                              Decimal.Round(((Total_afecto + Total_no_afecto) * (prima / 100)), 2).ToString

                For x As Integer = 0 To lst_descuentos.Count - 1

                    Select Case lst_descuentos.ElementAt(x).concepto
                        'Case "0701"

                        'A D E L A N T O  -  S U E L D O
                        'bool = False
                        'If Not dtDescuentos Is Nothing Then
                        '    Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_descuentos.ElementAt(x).concepto + "'"
                        '    Dim row() As DataRow = dtDescuentos.Select(filtro)

                        '    If row.Count > 0 Then
                        '        resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                        '        Sum_descuentos = Sum_descuentos + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                        '        bool = True
                        '        'ARMA CADENA DETALLE
                        '        ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0701", Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "DE")
                        '    End If

                        '    If bool = False Then
                        '        resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                        '        'ARMANDO CADENA DETALLE PLANILLA
                        '        ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0701", "0.00", "DE")
                        '    End If
                        'Else
                        '    resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                        '    'ARMANDO CADENA DETALLE PLANILLA
                        '    ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, "0701", "0.00", "DE")
                        'End If
                        'A D E L A N T O  -  S U E L D O

                        Case "0702", "0703", "0704", "0705", "0706", "0707", "0701"

                            Dim filtro = "PIDM = '" + dtDatosBasicos.Rows(i)("PIDM").ToString + "'  AND CONCEPTO_CODE = '" + lst_descuentos.ElementAt(x).concepto + "'"
                            Dim row() As DataRow = dtMontoConcpAdicionales.Select(filtro)

                            If row.Length > 0 Then
                                Sum_descuentos = Sum_descuentos + Decimal.Round(CDec(row(0)("MONTO").ToString), 2)
                                resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(row(0)("MONTO").ToString), 2))
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, lst_descuentos.ElementAt(x).concepto.ToString, Decimal.Round(CDec(row(0)("MONTO").ToString), 2).ToString, "DE")
                            Else
                                resb.AppendFormat("<td align='center' >{0}</td>", "0.00")
                                ArmaCadena_Detalle_Planilla(CAD_DET_PLANILLA, dtDatosBasicos.Rows(i)("PIDM").ToString, lst_descuentos.ElementAt(x).concepto.ToString, "0.00", "DE")
                            End If

                    End Select
                Next

                total_descuentos = total_descuentos + Sum_descuentos
                total_sueldo_neto = total_sueldo_neto + ((Total_afecto + Total_no_afecto) - Sum_descuentos)
                resb.AppendFormat("<td align='center' >{0}</td>", Sum_descuentos)
                resb.AppendFormat("<td align='center' >{0}</td>", (Total_afecto + Total_no_afecto) - Sum_descuentos)

                'ARMANDO CADENA PARA INSERTAR CABEZERA
                CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + Sum_descuentos.ToString + "," +
                                                             ((Total_afecto + Total_no_afecto) - Sum_descuentos).ToString



                If Total_afecto > 750.0 Then
                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(Total_afecto * (9 / 100)), 2))
                    total_essalud = total_essalud + Decimal.Round(CDec(Total_afecto * (9 / 100)), 2)

                    'ARMANDO CADENA PARA INSERTAR CABEZERA
                    CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + Decimal.Round(CDec(Total_afecto * (9 / 100)), 2).ToString
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", Decimal.Round(CDec(750.0 * (9 / 100)), 2))
                    total_essalud = total_essalud + Decimal.Round(CDec(750.0 * (9 / 100)), 2)

                    'ARMANDO CADENA PARA INSERTAR CABEZERA                    
                    CAD_CAB_PLANILLA = CAD_CAB_PLANILLA + "," + Decimal.Round(CDec(750.0 * (9 / 100)), 2).ToString
                End If


                resb.AppendFormat("</tr>")
            Next



            resb.AppendFormat("<tr style='color:black;'>")
            resb.AppendFormat("<td colspan='{1}' align='right' >{0}</td>", "TOTALES", cont_colums_total + Ncolum_afectas_Adicionales + Ncolum_afectas_No_adicionales)
            resb.AppendFormat("<td  align='center' >{0}</td>", sum_rem_afec)
            resb.AppendFormat("<td colspan='{1}' align='right' >{0}</td>", "", Ncolum_Noafectas_Adicionales + Ncolum_Noafectas_No_adicionales)
            resb.AppendFormat("<td  align='center' >{0}</td>", sum_rem_no_afec)
            resb.AppendFormat("<td  align='center' >{0}</td>", sum_rem_no_afec + sum_rem_afec)

            resb.AppendFormat("<td colspan='{1}' align='right' >{0}</td>", "", Ncolum_Descuentos + 5)
            resb.AppendFormat("<td  align='center' >{0}</td>", total_descuentos)
            resb.AppendFormat("<td  align='center' >{0}</td>", total_sueldo_neto)

            resb.AppendFormat("<td  align='center' >{0}</td>", total_essalud)
            resb.AppendFormat("</tr>")
        Else
            resb.AppendFormat("<tr style='color:black;'>")
            resb.AppendFormat("<td colspan='61' align='center' >{0}</td>", "NO HAY DATOS")
            resb.AppendFormat("</tr>")
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        Dim dt_resp As New DataTable
        dt_resp = NNPlanilla.Verifica_Generacion_Planilla(p_CTLG_CODE, p_MES, p_ANIO)


        Dim r As String = ""
        'resb.ToString + "{|||||}" + 
        r = resb.ToString + "{|||||}" + CAD_CAB_PLANILLA + "{|||||}" + CAD_DET_PLANILLA + "{|||||}" + dt_resp(0)("RESPUESTA").ToString
        'Return res
        Return r
    End Function








    Public Function Devuelve_Comision(cod_afp As String, cod_peri As String, ind_mixta As String, ctlg_code As String) As Decimal
        Dim dt As New DataTable
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        dt = NNPlanilla.Lista_Datos_Comisiones_AFP_Planilla(ctlg_code, cod_peri, cod_afp)

        Dim resp As Decimal = 0.0
        Dim cod_plames As String = ""
        Dim grup As String = ""
        Dim comi As String = ""

        If Not dt Is Nothing Then


            cod_plames = dt(0)("COD_PLAMES").ToString
            grup = dt(0)("GRUPO").ToString
            comi = dt(0)("DATO").ToString

            Dim plames() As String = cod_plames.Split(",")
            Dim grupos() As String = grup.Split(",")
            Dim comisiones() As String = comi.Split(",")

            Dim posiciones As New List(Of String)

            For i As Integer = 0 To plames.Length - 1
                If plames.GetValue(i).ToString = "0601" Then
                    posiciones.Add(i.ToString)
                End If
            Next


            Dim com_mixta As String = ""
            Dim com_flujo As String = ""
            Dim bool As Boolean = False
            Dim bool2 As Boolean = False
            For i As Integer = 0 To grupos.Length - 1
                If i = posiciones.ElementAt(i) Then
                    If grupos.GetValue(i).ToString = "1" Then
                        com_flujo = comisiones.GetValue(i)
                        bool = True
                    ElseIf grupos.GetValue(i).ToString = "2" Then
                        com_mixta = comisiones.GetValue(i)
                        bool2 = True

                    End If
                End If
                If bool And bool2 Then
                    Exit For
                End If
            Next

            If ind_mixta = "S" Then
                resp = CDec(com_mixta)
            Else
                resp = CDec(com_flujo)
            End If
        End If

        Return resp
    End Function

    Public Function Devuelve_Prima_Seguro(cod_afp As String, cod_peri As String, ctlg_code As String) As Decimal
        Dim dt As New DataTable
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        dt = NNPlanilla.Lista_Datos_Comisiones_AFP_Planilla(ctlg_code, cod_peri, cod_afp)

        Dim resp As Decimal = 0.0
        Dim cod_plames As String = ""
        Dim comi As String = ""

        If Not dt Is Nothing Then


            cod_plames = dt(0)("COD_PLAMES").ToString
            comi = dt(0)("DATO").ToString

            Dim plames() As String = cod_plames.Split(",")
            Dim comisiones() As String = comi.Split(",")



            For i As Integer = 0 To plames.Length - 1
                If plames.GetValue(i).ToString = "0606" Then
                    resp = CDec(comisiones.GetValue(i).ToString)
                    Exit For
                End If
            Next





        End If

        Return resp
    End Function


    Public Structure OrdenConcAF
        Dim concepto As String
    End Structure
    Public Structure OrdenConcNA
        Dim concepto As String
    End Structure
    Public Structure OrdenConcDE
        Dim concepto As String
    End Structure

    Public Function ArmaPlanilla_desde_BD(p_MES As String, p_ANIO As String, p_CTLG_CODE As String) As String

        Dim dt As New DataTable
        Dim dtConceptosAfectos As New DataTable
        Dim NNPlanilla As New Nomade.NN.NNPlanilla("Bn")
        dt = NNPlanilla.Lista_Cabecera_Planilla(p_CTLG_CODE, p_MES, p_ANIO)
        Dim lst_AF As New List(Of OrdenConcAF)
        Dim lst_NA As New List(Of OrdenConcNA)
        Dim lst_DE As New List(Of OrdenConcDE)
        Dim obj_1 As New OrdenConcAF
        Dim obj_2 As New OrdenConcNA
        Dim obj_3 As New OrdenConcDE
        Dim Sum_total_Afectos As Decimal = 0.0
        Dim Sum_total_NOAfectos As Decimal = 0.0
        Dim Sum_total_descuentos As Decimal = 0.0
        Dim Sum_total_essalud As Decimal = 0.0
        Dim Sum_total_sueldo_Neto As Decimal = 0.0

        Dim dtEmpresa As New DataTable
        Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
        dtEmpresa = ncEmpresa.ListarEmpresa(p_CTLG_CODE, "A", "")
        resb.AppendFormat("<table border='0' width='100%' >")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PERIODO:")
        resb.AppendFormat("<td width='75%'>{0} {1}</td>", " " & p_MES.ToUpper(), " " & p_ANIO.ToUpper())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "PLANILLA:")
        resb.AppendFormat("<td width='75%'>PLANILLA {0}{1}{2}{3}</td>", IIf(TIPO_PLANILLA = "1", "QUINCENAL ", "MENSUAL "), dtEmpresa.Rows(0)("CORTO").ToString(), " " & p_MES.ToUpper(), " " & p_ANIO.ToUpper())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "RUC:")
        resb.AppendFormat("<td id='ruc' width='75%'>{0}</td>", dtEmpresa.Rows(0)("RUC").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", "APELLIDOS Y NOMBRES, DENOMINACIÓN O RAZON SOCIAL:")
        resb.AppendFormat("<td width='75%'>{0}</td>", dtEmpresa.Rows(0)("DESCRIPCION").ToString())
        resb.AppendFormat("</tr>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<td width='25%'><strong>{0}</strong></td>", " (Expresado en Nuevos Soles)")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("</table>")
        resb.AppendFormat("<br/>")



        resb.AppendFormat("<table id='tblplanilla' border='1' style='max-width:8000px;width:5570px;color:white;' width:'5570px'>")
        resb.AppendFormat("<thead>")
        'Fila 1 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#4682B4' color='white'>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;' color='white'>Cód Trab.</th>")
        resb.AppendFormat("<th rowspan='2' colspan='2'  style='width:100px;' color='white'>Datos del Trabajador</th>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;' color='white'>Banco</th>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;'>D.N.I</th>")
        resb.AppendFormat("<th rowspan='3' style='width:150px;' >Local</th>")
        resb.AppendFormat("<th rowspan='2' colspan='2' style='width:150px;'>Condiciones</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Días Faltados</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Minutos Tardanza</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Fecha de Cese</th>")
        resb.AppendFormat("<th rowspan='2' colspan='3' style='width:85px;'> No Subsidios(Primeros 20 Dias)</th>")
        resb.AppendFormat("<th rowspan='2' colspan='3' style='width:85px;'> Subsidios(Apartir del 21 Dia)</th>")
        resb.AppendFormat("<th rowspan='2' colspan='2' style='width:85px;'> Período Vacacional</th>")


        Dim Ncolum_afectas As Integer = 0
        If Not dt Is Nothing Then
            dtConceptosAfectos = NNPlanilla.Lista_Detalle_Planilla(p_CTLG_CODE, p_MES, p_ANIO, dt(0)("RHPLANC_PIDM").ToString())
            If Not dtConceptosAfectos Is Nothing Then

                Dim filtro = "IND = 'AF'"
                Dim row() As DataRow = dtConceptosAfectos.Select(filtro)

                Ncolum_afectas = row.Count

                'For j As Integer = 0 To dtConceptosAfectos.Rows.Count - 1
                '    If dtConceptosAfectos(j)("IND").ToString() = "AF" Then

                '    End If

                'Next
            End If
        End If

        resb.AppendFormat("<th rowspan='2' colspan='{0}' style='width:350px;'>Remuneraciones Afectas</th>", Ncolum_afectas + 1)

        'remuneraciones NO afectos'

        Dim Ncolum_no_afectas As Integer = 0
        If Not dt Is Nothing Then
            dtConceptosAfectos = NNPlanilla.Lista_Detalle_Planilla(p_CTLG_CODE, p_MES, p_ANIO, dt(0)("RHPLANC_PIDM").ToString())
            If Not dtConceptosAfectos Is Nothing Then
                Dim filtro = "IND = 'NA'"
                Dim row() As DataRow = dtConceptosAfectos.Select(filtro)

                Ncolum_no_afectas = row.Count
                'For j As Integer = 0 To dtConceptosAfectos.Rows.Count - 1
                '    If dtConceptosAfectos(j)("IND").ToString() = "NA" Then
                '        Ncolum_no_afectas = Ncolum_no_afectas + 1
                '    End If

                'Next
            End If
        End If

        resb.AppendFormat("<th rowspan='2' colspan='{0}' style='width:450px;'>Remuneraciones No Afectas</th>", Ncolum_no_afectas + 1)


        resb.AppendFormat("<th rowspan='3' style='width:85px;'>TOTAL REMUNERACION</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>AFP / SNP</th>")
        resb.AppendFormat("<th colspan='{0}' style='width:100px;'>Descuentos al Trabajador</th>", 1 + 4)
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Total Descuento</th>")
        resb.AppendFormat("<th rowspan='3' style='width:85px;'>Sueldo Neto a Pagar</th>")
        resb.AppendFormat("<th style='width:85px;'>APORTACIONES DEL EMPLEADOR</th>")

        resb.AppendFormat("</tr>")
        'Fila 2 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#4682B4' color='white'>")

        resb.AppendFormat("<th colspan='4' style='width:80px;'>Fondo de Pensiones</th>")



        Dim Ncolum_descuentos As Integer = 0
        If Not dt Is Nothing Then
            dtConceptosAfectos = NNPlanilla.Lista_Detalle_Planilla(p_CTLG_CODE, p_MES, p_ANIO, dt(0)("RHPLANC_PIDM").ToString())
            If Not dtConceptosAfectos Is Nothing Then
                Dim filtro = "IND = 'DE'"
                Dim row() As DataRow = dtConceptosAfectos.Select(filtro)

                Ncolum_descuentos = row.Count
                'For j As Integer = 0 To dtConceptosAfectos.Rows.Count - 1
                '    If dtConceptosAfectos(j)("IND").ToString() = "DE" Then
                '        Ncolum_descuentos = Ncolum_descuentos + 1
                '    End If

                'Next
            End If
        End If


        If Ncolum_descuentos > 0 Then
            resb.AppendFormat("<th colspan='{0}' style='width:80px;'>Varios</th>", Ncolum_descuentos)
        Else
            resb.AppendFormat("<th colspan='{0}' style='display:none'>Varios</th>", Ncolum_descuentos)
        End If


        resb.AppendFormat("<th style='width:80px;'>Esssalud</th>")


        resb.AppendFormat("</tr>")
        'Fila 3 CABECERA
        resb.AppendFormat("<tr style='font-size:9px;' align='center' bgcolor='#666666' color='white'>")

        resb.AppendFormat("<th style='width:200px;'>Apellidos</th>")
        resb.AppendFormat("<th style='width:200px;'>Nombres</th>")


        resb.AppendFormat("<th style='width:200px;'>EPS</th>")
        resb.AppendFormat("<th style='width:200px;'>Labor</th>")
        'resb.AppendFormat("<th style='width:200px;'>SCTR</th>")

        resb.AppendFormat("<th style='width:80px;background-color:#999;'>Tipo</th>")
        resb.AppendFormat("<th style='width:80px;background-color:#999;'>Desde</th>")
        resb.AppendFormat("<th style='width:60px;background-color:#999;'>Hasta</th>")

        resb.AppendFormat("<th style='width:80px;'>Tipo</th>")
        resb.AppendFormat("<th style='width:80px;'>Desde</th>")
        resb.AppendFormat("<th style='width:60px;'>Hasta</th>")

        resb.AppendFormat("<th style='width:80px;background-color:#999;'>Inicio</th>")
        resb.AppendFormat("<th style='width:80px;background-color:#999;'>Fin</th>")




        If Not dt Is Nothing Then
            dtConceptosAfectos = NNPlanilla.Lista_Detalle_Planilla(p_CTLG_CODE, p_MES, p_ANIO, dt(0)("RHPLANC_PIDM").ToString())
            If Not dtConceptosAfectos Is Nothing Then
                For j As Integer = 0 To dtConceptosAfectos.Rows.Count - 1
                    If dtConceptosAfectos(j)("IND").ToString() = "AF" Then
                        resb.AppendFormat("<th style='width:100px;'>{0}</th>", dtConceptosAfectos(j)("DESC_CONCEPTO").ToString())
                        obj_1.concepto = dtConceptosAfectos(j)("CONCEPTO_CODE").ToString()
                        lst_AF.Add(obj_1)
                    End If

                Next
            End If
        End If





        resb.AppendFormat("<th style='width:100px;'>Total Afecto</th>")
        ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        ' no afectos
        If Not dt Is Nothing Then
            dtConceptosAfectos = NNPlanilla.Lista_Detalle_Planilla(p_CTLG_CODE, p_MES, p_ANIO, dt(0)("RHPLANC_PIDM").ToString())
            If Not dtConceptosAfectos Is Nothing Then
                For j As Integer = 0 To dtConceptosAfectos.Rows.Count - 1
                    If dtConceptosAfectos(j)("IND").ToString() = "NA" Then
                        resb.AppendFormat("<th style='width:100px;background-color:#999;'>{0}</th>", dtConceptosAfectos(j)("DESC_CONCEPTO").ToString())
                        obj_2.concepto = dtConceptosAfectos(j)("CONCEPTO_CODE").ToString()
                        lst_NA.Add(obj_2)
                    End If

                Next
            End If
        End If



        resb.AppendFormat("<th style='width:100px;background-color:#999;'>Total No Afecto</th>")
        ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

        resb.AppendFormat("<th style='width:60px;'>S.N.P 13%</th>")
        resb.AppendFormat("<th style='width:60px;'>Aportac. AFP 10%</th>")
        resb.AppendFormat("<th style='width:60px;'>Comision AFP</th>")
        resb.AppendFormat("<th style='width:60px;'>Seguros AFP</th>")



        ' de descuentos 
        If Not dt Is Nothing Then
            dtConceptosAfectos = NNPlanilla.Lista_Detalle_Planilla(p_CTLG_CODE, p_MES, p_ANIO, dt(0)("RHPLANC_PIDM").ToString())
            If Not dtConceptosAfectos Is Nothing Then
                For j As Integer = 0 To dtConceptosAfectos.Rows.Count - 1
                    If dtConceptosAfectos(j)("IND").ToString() = "DE" Then
                        resb.AppendFormat("<th style='width:100px;background-color:#999;'>{0}</th>", dtConceptosAfectos(j)("DESC_CONCEPTO").ToString())
                        obj_3.concepto = dtConceptosAfectos(j)("CONCEPTO_CODE").ToString()
                        lst_DE.Add(obj_3)
                    End If

                Next
            End If
        End If



        resb.AppendFormat("<th style='width:80px;'>De Regulares</th>")


        resb.AppendFormat("</tr>")

        resb.AppendFormat("</thead>")





        resb.AppendFormat("<tbody  >")


        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr style='font-size:9px;color:black'>")
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RHPLANC_COD_TRABAJADOR").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RHPLANC_APELLIDOS").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RHPLANC_NOMBRES").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RHPLANC_BANCO_DESC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_NRO_DNI").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_ESTABLECIMIENTO_DESC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_EPS_DESC").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_LABOR_DESC").ToString())

                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_DIAS_FALTAS").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_MINUTOS_TARDANZA").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_FECHA_CESE").ToString())

                resb.AppendFormat("<td align='center' >{0}</td>", "")
                resb.AppendFormat("<td align='center' >{0}</td>", "")
                resb.AppendFormat("<td align='center' >{0}</td>", "")
                resb.AppendFormat("<td align='center' >{0}</td>", "")
                resb.AppendFormat("<td align='center' >{0}</td>", "")
                resb.AppendFormat("<td align='center' >{0}</td>", "")

                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_PERIODO_VAC_INI").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_PERIODO_VAC_FIN").ToString())


                dtConceptosAfectos = NNPlanilla.Lista_Detalle_Planilla(p_CTLG_CODE, p_MES, p_ANIO, dt(i)("RHPLANC_PIDM").ToString())
                For x As Integer = 0 To lst_AF.Count - 1


                    Select Case lst_AF.ElementAt(x).concepto

                        Case "0105", "0121", "0106", "0201", "0704", "0705", "0905", "0909", "0914",
                            "0101", "0102", "0103", "0104", "0107", "0108", "0109", "0110", "0111", "0112", "0113", "0114", "0115", "0116", "0117", "0119", "0120",
                            "0122", "0123", "0124", "0125", "0126", "0127",
                            "0201", "0202", "0203", "0204", "0206", "0207", "0208", "0209", "0210", "0211", "0212", "0213", "0214",
                            "0301", "0302", "0303", "0304", "0305", "0306", "0307", "0308", "0309", "0310", "0311", "0312", "0313",
                            "0401", "0402", "0403", "0404", "0405", "0406", "0407",
                            "0501", "0502", "0503", "0504", "0505", "0506", "0507",
                            "0601", "0602", "0603", "0604", "0605", "0606", "0607", "0608", "0609", "0610", "0611", "0612", "0613",
                            "0801", "0802", "0803", "0804", "0805", "0806", "0807", "0808", "0809", "0810", "0811",
                            "0901", "0902", "0903", "0904", "0905", "0906", "0907", "0908", "0909", "0910", "0911", "0912", "0913",
                            "0914", "0915", "0916", "0917", "0918", "0919", "0920", "0921", "0922", "0923", "0924", "0925"
                            Dim filtro = "CONCEPTO_CODE = '" + lst_AF.ElementAt(x).concepto + "'"
                            Dim row() As DataRow = dtConceptosAfectos.Select(filtro)

                            If row.Length > 0 Then
                                resb.AppendFormat("<td align='center' >{0}</td>", row(0)("VALOR").ToString)
                            End If

                    End Select




                Next

                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_TOTAL_AFECTO").ToString())

                Sum_total_Afectos = Sum_total_Afectos + CDec(dt.Rows(i)("RHPLANC_TOTAL_AFECTO").ToString())




                For x As Integer = 0 To lst_NA.Count - 1
                    Select Case lst_NA.ElementAt(x).concepto

                        Case "0105", "0121", "0106", "0201", "0704", "0705", "0905", "0909", "0914",
                            "0101", "0102", "0103", "0104", "0107", "0108", "0109", "0110", "0111", "0112", "0113", "0114", "0115", "0116", "0117", "0119", "0120",
                            "0122", "0123", "0124", "0125", "0126", "0127",
                            "0201","0202", "0203", "0204", "0206", "0207", "0208", "0209", "0210", "0211", "0212", "0213", "0214",
                            "0301", "0302", "0303", "0304", "0305", "0306", "0307", "0308", "0309", "0310", "0311", "0312", "0313",
                            "0401", "0402", "0403", "0404", "0405", "0406", "0407",
                            "0501", "0502", "0503", "0504", "0505", "0506", "0507",
                            "0601", "0602", "0603", "0604", "0605", "0606", "0607", "0608", "0609", "0610", "0611", "0612", "0613",
                            "0801", "0802", "0803", "0804", "0805", "0806", "0807", "0808", "0809", "0810", "0811",
                            "0901", "0902", "0903", "0904", "0905", "0906", "0907", "0908", "0909", "0910", "0911", "0912", "0913",
                            "0914", "0915", "0916", "0917", "0918", "0919", "0920", "0921", "0922", "0923", "0924", "0925"
                            Dim filtro = "CONCEPTO_CODE = '" + lst_NA.ElementAt(x).concepto + "'"
                            Dim row() As DataRow = dtConceptosAfectos.Select(filtro)

                            If row.Length > 0 Then
                                resb.AppendFormat("<td align='center' >{0}</td>", row(0)("VALOR").ToString)
                            End If

                    End Select
                Next


                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_TOTAL_NOAFECTO").ToString())
                Sum_total_NOAfectos = Sum_total_NOAfectos + CDec(dt.Rows(i)("RHPLANC_TOTAL_NOAFECTO").ToString())


                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_TOTAL_REMUNERACION").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_AFP_SNP_DESC").ToString())

                'afps
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_SNP_MONTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_APORTACION_AFP_MONTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_COMISION_AFP_MONTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_SEGURO_AFP_MONTO").ToString())


                For x As Integer = 0 To lst_DE.Count - 1

                    Select Case lst_DE.ElementAt(x).concepto

                        Case "0701", "0702", "0703", "0704", "0705", "0705", "0706", "0707"
                            Dim filtro = "CONCEPTO_CODE = '" + lst_AF.ElementAt(x).concepto + "'"
                            Dim row() As DataRow = dtConceptosAfectos.Select(filtro)

                            If row.Length > 0 Then
                                resb.AppendFormat("<td align='center' >{0}</td>", row(0)("VALOR").ToString)
                            End If

                    End Select

                Next

                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_TOTAL_DESCUENTO").ToString())
                Sum_total_descuentos = Sum_total_descuentos + CDec(dt.Rows(i)("RHPLANC_TOTAL_DESCUENTO").ToString())

                resb.AppendFormat("<td align='center' >{0}</td>", CDec(dt.Rows(i)("RHPLANC_TOTAL_REMUNERACION").ToString()) - CDec(dt.Rows(i)("RHPLANC_TOTAL_DESCUENTO").ToString()))
                Sum_total_sueldo_Neto = Sum_total_sueldo_Neto + (CDec(dt.Rows(i)("RHPLANC_TOTAL_REMUNERACION").ToString()) - CDec(dt.Rows(i)("RHPLANC_TOTAL_DESCUENTO").ToString()))


                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("RHPLANC_APORTE_ESSALUD_MONTO").ToString())
                Sum_total_essalud = Sum_total_essalud + CDec(dt.Rows(i)("RHPLANC_APORTE_ESSALUD_MONTO").ToString())





            Next

            resb.AppendFormat("<tr style='color:black;'>")
            resb.AppendFormat("<td colspan='{1}' align='right' >{0}</td>", "TOTALES", 19 + Ncolum_afectas)
            resb.AppendFormat("<td  align='center' >{0}</td>", Sum_total_Afectos)
            resb.AppendFormat("<td colspan='{1}' align='right' >{0}</td>", "", Ncolum_no_afectas)
            resb.AppendFormat("<td  align='center' >{0}</td>", Sum_total_NOAfectos)
            resb.AppendFormat("<td  align='center' >{0}</td>", Sum_total_NOAfectos + Sum_total_Afectos)

            resb.AppendFormat("<td colspan='{1}' align='right' >{0}</td>", "", Ncolum_descuentos + 5)
            resb.AppendFormat("<td  align='center' >{0}</td>", Sum_total_descuentos)
            resb.AppendFormat("<td  align='center' >{0}</td>", Sum_total_sueldo_Neto)

            resb.AppendFormat("<td  align='center' >{0}</td>", Sum_total_essalud)
            resb.AppendFormat("</tr>")
        Else


        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")





        Dim res As String = ""
        res = resb.ToString()
        Return res

    End Function



    Public Sub ArmaCadena_Detalle_Planilla(cadena As String, pidm As String, concepto As String, valor As String, tipo As String)



        If cadena <> "" Then
            CAD_DET_PLANILLA = CAD_DET_PLANILLA + "|" + pidm + "," + concepto + "," + valor + "," + tipo
        Else
            CAD_DET_PLANILLA = pidm + "," + concepto + "," + valor + "," + tipo
        End If






    End Sub




    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
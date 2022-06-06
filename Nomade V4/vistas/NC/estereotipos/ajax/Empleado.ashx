<%@ WebHandler Language="VB" Class="Empleado" %>

Imports System
Imports System.Web
Imports System.Data

Public Class Empleado : Implements IHttpHandler

    Dim OPCION, CTLG_CODE As String

    Dim PIDM, PIDM_DA As String

    Dim FECHA_INICIO, FECHA_FIN, VINC_CODE, MBDH_CODE, ESTADO_IND, USUA_ID As String

    Dim TIPA_CODE, CUBA_CODE_PAGO, PEPA_CODE, CUBA_CODE_CTS, EPSA_CODE, EPSS_CODE, SCSL_CODE,
        FECHA_INGRESO, FECHA_INI_CONT, TICO_CODE, FECHA_CESE_CONT, MOTIVO_CESE_CONT, TITR_CODE,
        OCUP_CODE, TMOF_CODE, NIED_CODE, CARG_CODE, NUM_CUSSP, REPE_CODE, AFP_FECHA_INI,
        TIPO_REG_SALUD, EPS_ESTADO, EPS_FECHA_INI, EPS_FECHA_FIN, VIDA_LEY_ESTADO, REM_BASICA, ASIG_FAM_IND,
        ASIG_FAM, MOVILIDAD, VIATICOS, REFRIGERIO, REM_TOTAL, NRO_CONTRATO, CONT_FECHA_INI,
        CONT_FECHA_FIN, CESE_IND, FTVIEDU_CODE, ANIO_EDU_FIN, ASIST_CODE, FTVIEDU_DESC, PIDMA_DA_ANT, MIXTO_IND, DNI_BIO, RESUMEN,
        p_IND_ASIG_FAM, p_FEC_ASIG_FAM_INI, p_FEC_ASIG_FAM_FIN As String

    'Contrato Empleados
    Dim PEBEMCO_SEQ As Integer


    'EPS SITUACION
    Dim EPSS_TIPO_IND As String

    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder

    Dim resArray As Array

    'PARAMETRO COMBOBOX
    Dim M_EMPRESA, M_SUCURSAL, M_TIPOTRABAJADOR, M_OCUPACION, M_AFILIADOEPS, M_SITUACIONEPS,
        M_TIPOCONTRATO, M_MOTIVOCESE, M_TIPOPAGO, M_MODFORMATIVA, M_CUENTA, M_REGIMENPENSION,
        M_PERIODICIDADPAGO, M_NIVELEDUCATIVO, M_CARGO As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        CTLG_CODE = context.Request("CTLG_CODE")

        PIDM = context.Request("PIDM")
        PIDM_DA = context.Request("PIDM_DA")

        FECHA_INICIO = context.Request("FECHA_INICIO")
        FECHA_FIN = context.Request("FECHA_FIN")
        VINC_CODE = context.Request("VINC_CODE")
        MBDH_CODE = context.Request("MBDH_CODE")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")

        TIPA_CODE = context.Request("TIPA_CODE")
        CUBA_CODE_PAGO = context.Request("CUBA_CODE_PAGO")
        PEPA_CODE = context.Request("PEPA_CODE")
        CUBA_CODE_CTS = context.Request("CUBA_CODE_CTS")
        EPSA_CODE = context.Request("EPSA_CODE")
        EPSS_CODE = context.Request("EPSS_CODE")
        FECHA_INGRESO = context.Request("FECHA_INGRESO")
        FECHA_INI_CONT = context.Request("FECHA_INI_CONT")
        TICO_CODE = context.Request("TICO_CODE")
        FECHA_CESE_CONT = context.Request("FECHA_CESE_CONT")
        MOTIVO_CESE_CONT = context.Request("MOTIVO_CESE_CONT")
        TITR_CODE = context.Request("TITR_CODE")
        OCUP_CODE = context.Request("OCUP_CODE")
        TMOF_CODE = context.Request("TMOF_CODE")
        NIED_CODE = context.Request("NIED_CODE")
        CARG_CODE = context.Request("CARG_CODE")
        NUM_CUSSP = context.Request("NUM_CUSSP")
        REPE_CODE = context.Request("REPE_CODE")

        PEBEMCO_SEQ = context.Request("PEBEMCO_SEQ")

        SCSL_CODE = context.Request("SCSL_CODE")

        EPSS_TIPO_IND = context.Request("EPSS_TIPO_IND")

        M_EMPRESA = context.Request("M_EMPRESA")
        M_SUCURSAL = context.Request("M_SUCURSAL")
        M_TIPOTRABAJADOR = context.Request("M_TIPOTRABAJADOR")
        M_OCUPACION = context.Request("M_OCUPACION")
        M_AFILIADOEPS = context.Request("M_AFILIADOEPS")
        M_SITUACIONEPS = context.Request("M_SITUACIONEPS")
        M_TIPOCONTRATO = context.Request("M_TIPOCONTRATO")
        M_MOTIVOCESE = context.Request("M_MOTIVOCESE")
        M_TIPOPAGO = context.Request("M_TIPOPAGO")
        M_MODFORMATIVA = context.Request("M_MODFORMATIVA")
        M_CUENTA = context.Request("M_CUENTA")
        M_REGIMENPENSION = context.Request("M_REGIMENPENSION")
        M_PERIODICIDADPAGO = context.Request("M_PERIODICIDADPAGO")
        M_NIVELEDUCATIVO = context.Request("M_NIVELEDUCATIVO")
        M_CARGO = context.Request("M_CARGO")


        AFP_FECHA_INI = context.Request("AFP_FECHA_INI")
        TIPO_REG_SALUD = context.Request("TIPO_REG_SALUD")
        EPS_ESTADO = context.Request("EPS_ESTADO")
        EPS_FECHA_INI = context.Request("EPS_FECHA_INI")
        EPS_FECHA_FIN = context.Request("EPS_FECHA_FIN")
        VIDA_LEY_ESTADO = context.Request("VIDA_LEY_ESTADO")
        REM_BASICA = context.Request("REM_BASICA")
        ASIG_FAM_IND = context.Request("ASIG_FAM_IND")
        ASIG_FAM = context.Request("ASIG_FAM")
        MOVILIDAD = context.Request("MOVILIDAD")
        VIATICOS = context.Request("VIATICOS")
        REFRIGERIO = context.Request("REFRIGERIO")
        REM_TOTAL = context.Request("REM_TOTAL")
        NRO_CONTRATO = context.Request("NRO_CONTRATO")
        CONT_FECHA_INI = context.Request("CONT_FECHA_INI")
        CONT_FECHA_FIN = context.Request("CONT_FECHA_FIN")
        CESE_IND = context.Request("CESE_IND")

        FTVIEDU_CODE = context.Request("FTVIEDU_CODE")
        ANIO_EDU_FIN = context.Request("ANIO_EDU_FIN")
        ASIST_CODE = context.Request("ASIST_CODE")
        FTVIEDU_DESC = context.Request("FTVIEDU_DESC")

        PIDMA_DA_ANT = context.Request("PIDMA_DA_ANT")
        MIXTO_IND = context.Request("MIXTO_IND")

        DNI_BIO =  context.Request("DNI_BIO")
        RESUMEN = context.Request("RESUMEN")
        RESUMEN = vChar(RESUMEN)


        p_IND_ASIG_FAM = context.Request("p_IND_ASIG_FAM")
        p_FEC_ASIG_FAM_INI = context.Request("p_FEC_ASIG_FAM_INI")
        p_FEC_ASIG_FAM_FIN = context.Request("p_FEC_ASIG_FAM_FIN")

        Select Case OPCION.ToString()

            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim ep As New Nomade.NC.NCEEmpleado("Bn")
                dt = ep.Listar_Empleados_ComboBox(M_EMPRESA, CTLG_CODE, M_SUCURSAL, M_TIPOTRABAJADOR, M_OCUPACION, M_AFILIADOEPS, EPSS_TIPO_IND, M_SITUACIONEPS, _
                                                  M_TIPOCONTRATO, M_MOTIVOCESE, M_TIPOPAGO, M_MODFORMATIVA, PIDM, M_CUENTA, M_REGIMENPENSION, M_PERIODICIDADPAGO, _
                                                  M_NIVELEDUCATIVO, M_CARGO)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        If MiDataRow("SUCURSAL") Is DBNull.Value Then
                            resb.Append("""SUCURSAL"" :" & """""")
                        Else
                            resb.Append("""SUCURSAL"" :" & """" & MiDataRow("SUCURSAL").ToString & """")
                        End If
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                ep = Nothing
            Case "5"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim ep As New Nomade.NC.NCEEmpleado("Bn")
                dt = ep.Listar_Empleados_ComboBox(M_EMPRESA, CTLG_CODE, M_SUCURSAL, M_TIPOTRABAJADOR, M_OCUPACION, M_AFILIADOEPS, EPSS_TIPO_IND, M_SITUACIONEPS, _
                                                  M_TIPOCONTRATO, M_MOTIVOCESE, M_TIPOPAGO, M_MODFORMATIVA, PIDM, M_CUENTA, M_REGIMENPENSION, M_PERIODICIDADPAGO, _
                                                  M_NIVELEDUCATIVO, M_CARGO)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        If MiDataRow("SITUACION_EPS") Is DBNull.Value Then
                            resb.Append("""SITUACION_EPS"" :" & """""")
                        Else
                            resb.Append("""SITUACION_EPS"" :" & """" & MiDataRow("SITUACION_EPS").ToString & """")
                        End If
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                ep = Nothing
            Case "15"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")
                dt = e.Listar_DatosContractuales(PIDM, PEBEMCO_SEQ, CTLG_CODE, SCSL_CODE, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows

                        resb.Append("{")
                        If MiDataRow("FECHA_INI_CONT") Is DBNull.Value Then
                            resb.Append("""FECHA_INI_CONT"" :" & """"",")
                        Else
                            resb.Append("""FECHA_INI_CONT"" :" & """" & MiDataRow("FECHA_INI_CONT").ToString & """,")
                        End If
                        If MiDataRow("NTICO_DESC") Is DBNull.Value Then
                            resb.Append("""NTICO_DESC"" :" & """"",")
                        Else
                            resb.Append("""NTICO_DESC"" :" & """" & MiDataRow("NTICO_DESC").ToString & """,")
                        End If
                        If MiDataRow("NCARG_DESC") Is DBNull.Value Then
                            resb.Append("""NCARG_DESC"" :" & """"",")
                        Else
                            resb.Append("""NCARG_DESC"" :" & """" & MiDataRow("NCARG_DESC").ToString & """,")
                        End If
                        If MiDataRow("FECHA_CESE_CONT") Is DBNull.Value Then
                            resb.Append("""FECHA_CESE_CONT"" :" & """""")
                        Else
                            resb.Append("""FECHA_CESE_CONT"" :" & """" & MiDataRow("FECHA_CESE_CONT").ToString & """")
                        End If
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                e = Nothing
            Case "16"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")
                dt = e.Listar_DerechoHabientes(PIDM, PIDM_DA, "")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows

                        resb.Append("{")
                        If MiDataRow("PIDM") Is DBNull.Value Then
                            resb.Append("""PIDM"" :" & """"",")
                        Else
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        End If
                        If MiDataRow("PIDM_DA") Is DBNull.Value Then
                            resb.Append("""PIDM_DA"" :" & """"",")
                        Else
                            resb.Append("""PIDM_DA"" :" & """" & MiDataRow("PIDM_DA").ToString & """,")
                        End If
                        If MiDataRow("NRO") Is DBNull.Value Then
                            resb.Append("""NRO"" :" & """"",")
                        Else
                            resb.Append("""NRO"" :" & """" & MiDataRow("NRO").ToString & """,")
                        End If
                        If MiDataRow("DERECHO_HABIENTE") Is DBNull.Value Then
                            resb.Append("""DERECHO_HABIENTE"" :" & """"",")
                        Else
                            resb.Append("""DERECHO_HABIENTE"" :" & """" & MiDataRow("DERECHO_HABIENTE").ToString & """,")
                        End If
                        If MiDataRow("FECHA_INICIO") Is DBNull.Value Then
                            resb.Append("""FECHA_INICIO"" :" & """"",")
                        Else
                            resb.Append("""FECHA_INICIO"" :" & """" & MiDataRow("FECHA_INICIO").ToString & """,")
                        End If
                        If MiDataRow("FFECHA_INICIO") Is DBNull.Value Then
                            resb.Append("""FFECHA_INICIO"" :" & """"",")
                        Else
                            resb.Append("""FFECHA_INICIO"" :" & """" & MiDataRow("FFECHA_INICIO").ToString & """,")
                        End If
                        If MiDataRow("FECHA_FIN") Is DBNull.Value Then
                            resb.Append("""FECHA_FIN"" :" & """"",")
                        Else
                            resb.Append("""FECHA_FIN"" :" & """" & MiDataRow("FECHA_FIN").ToString & """,")
                        End If
                        If MiDataRow("FFECHA_FIN") Is DBNull.Value Then
                            resb.Append("""FFECHA_FIN"" :" & """"",")
                        Else
                            resb.Append("""FFECHA_FIN"" :" & """" & MiDataRow("FFECHA_FIN").ToString & """,")
                        End If
                        If MiDataRow("VINC_CODE") Is DBNull.Value Then
                            resb.Append("""VINC_CODE"" :" & """"",")
                        Else
                            resb.Append("""VINC_CODE"" :" & """" & MiDataRow("VINC_CODE").ToString & """,")
                        End If
                        If MiDataRow("NVINC_CODE") Is DBNull.Value Then
                            resb.Append("""NVINC_CODE"" :" & """"",")
                        Else
                            resb.Append("""NVINC_CODE"" :" & """" & MiDataRow("NVINC_CODE").ToString & """,")
                        End If
                        If MiDataRow("MBDH_COD") Is DBNull.Value Then
                            resb.Append("""MBDH_COD"" :" & """"",")
                        Else
                            resb.Append("""MBDH_COD"" :" & """" & MiDataRow("MBDH_COD").ToString & """,")
                        End If
                        If MiDataRow("NMBDH_COD") Is DBNull.Value Then
                            resb.Append("""NMBDH_COD"" :" & """"",")
                        Else
                            resb.Append("""NMBDH_COD"" :" & """" & MiDataRow("NMBDH_COD").ToString & """,")
                        End If
                        If MiDataRow("ESTADO") Is DBNull.Value Then
                            resb.Append("""ESTADO"" :" & """""")
                        Else
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                        End If
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                e = Nothing
            Case "17"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim v As New Nomade.NC.NCVinculosFamiliares("Bn")
                dt = v.Listar_VinculosFam(String.Empty, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        If MiDataRow("Codigo") Is DBNull.Value Then
                            resb.Append("""CODIGO"" :" & """"",")
                        Else
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        End If
                        If MiDataRow("Descripcion") Is DBNull.Value Then
                            resb.Append("""DESCRIPCION"" :" & """""")
                        Else
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """")
                        End If
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                v = Nothing
            Case "18"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim m As New Nomade.NC.NCMotivosBajaDerecho("Bn")
                dt = m.Listar_MotivoBaja(String.Empty, String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        If MiDataRow("Codigo") Is DBNull.Value Then
                            resb.Append("""CODIGO"" :" & """"",")
                        Else
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        End If
                        If MiDataRow("Descripcion") Is DBNull.Value Then
                            resb.Append("""DESCRIPCION"" :" & """""")
                        Else
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("Descripcion").ToString & """")
                        End If
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                m = Nothing
            Case "19"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim ep As New Nomade.NC.NCEEmpleado("Bn")
                dt = ep.Listar_Personas()
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        If MiDataRow("PIDM") Is DBNull.Value Then
                            resb.Append("""CODIGO"" :" & """"",")
                        Else
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        End If
                        If MiDataRow("NOMBRE_COMPLETO") Is DBNull.Value Then
                            resb.Append("""DESCRIPCION"" :" & """""")
                        Else
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("NOMBRE_COMPLETO").ToString & """,")
                        End If
                        If MiDataRow("SEXO") Is DBNull.Value Then
                            resb.Append("""SEXO"" :" & """""")
                        Else
                            resb.Append("""SEXO"" :" & """" & MiDataRow("SEXO").ToString & """")
                        End If
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                ep = Nothing
            Case "NDH"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")
                If Not FECHA_INICIO.Equals(String.Empty) Then
                    FECHA_INICIO = Utilities.fechaLocal(FECHA_INICIO)
                End If
                If Not FECHA_FIN.Equals(String.Empty) Then
                    FECHA_FIN = Utilities.fechaLocal(FECHA_FIN)
                End If
                resArray = e.Crear_DerechoHabiente(PIDM, PIDM_DA, FECHA_INICIO, FECHA_FIN, VINC_CODE, MBDH_CODE, ESTADO_IND, USUA_ID)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""EXISTE"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
            Case "MDH"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")
                If Not FECHA_INICIO.Equals(String.Empty) Then
                    FECHA_INICIO = Utilities.fechaLocal(FECHA_INICIO)
                End If
                If Not FECHA_FIN.Equals(String.Empty) Then
                    FECHA_FIN = Utilities.fechaLocal(FECHA_FIN)
                End If
                resArray = e.Actualizar_DerechoHabiente(PIDM, PIDM_DA, FECHA_INICIO, FECHA_FIN, VINC_CODE, MBDH_CODE, ESTADO_IND, USUA_ID, PIDMA_DA_ANT)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "COMBOBOX"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim ep As New Nomade.NC.NCEEmpleado("Bn")
                dt = ep.Listar_Empleados_ComboBox(M_EMPRESA, CTLG_CODE, M_SUCURSAL, M_TIPOTRABAJADOR, M_OCUPACION, M_AFILIADOEPS, EPSS_TIPO_IND, M_SITUACIONEPS, _
                                                  M_TIPOCONTRATO, M_MOTIVOCESE, M_TIPOPAGO, M_MODFORMATIVA, PIDM, M_CUENTA, M_REGIMENPENSION, M_PERIODICIDADPAGO, _
                                                  M_NIVELEDUCATIVO, M_CARGO)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        If MiDataRow("EMPRESA") Is DBNull.Value Then
                            resb.Append("""EMPRESA"" :" & """"",")
                        Else
                            resb.Append("""EMPRESA"" :" & """" & MiDataRow("EMPRESA").ToString & """,")
                        End If
                        If MiDataRow("SUCURSAL") Is DBNull.Value Then
                            resb.Append("""SUCURSAL"" :" & """"",")
                        Else
                            resb.Append("""SUCURSAL"" :" & """" & MiDataRow("SUCURSAL").ToString & """,")
                        End If

                        If MiDataRow("SITUACION_EPS") Is DBNull.Value Then
                            resb.Append("""SITUACION_EPS"" :" & """"",")
                        Else
                            resb.Append("""SITUACION_EPS"" :" & """" & MiDataRow("SITUACION_EPS").ToString & """,")
                        End If

                        If MiDataRow("TIPO_PAGO") Is DBNull.Value Then
                            resb.Append("""TIPO_PAGO"" :" & """"",")
                        Else
                            resb.Append("""TIPO_PAGO"" :" & """" & MiDataRow("TIPO_PAGO").ToString & """,")
                        End If

                        If MiDataRow("CUENTA_AHO") Is DBNull.Value Then
                            resb.Append("""CUENTA_AHO"" :" & """"",")
                        Else
                            resb.Append("""CUENTA_AHO"" :" & """" & MiDataRow("CUENTA_AHO").ToString & """,")
                        End If

                        If MiDataRow("CUENTA_CTS") Is DBNull.Value Then
                            resb.Append("""CUENTA_CTS"" :" & """"",")
                        Else
                            resb.Append("""CUENTA_CTS"" :" & """" & MiDataRow("CUENTA_CTS").ToString & """,")
                        End If

                        If MiDataRow("PERIODICIDAD_PAGO") Is DBNull.Value Then
                            resb.Append("""PERIODICIDAD_PAGO"" :" & """"",")
                        Else
                            resb.Append("""PERIODICIDAD_PAGO"" :" & """" & MiDataRow("PERIODICIDAD_PAGO").ToString & """,")
                        End If

                        If MiDataRow("CARGO") Is DBNull.Value Then
                            resb.Append("""CARGO"" :" & """"",")
                        Else
                            resb.Append("""CARGO"" :" & """" & MiDataRow("CARGO").ToString & """")
                        End If


                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                ep = Nothing
            Case "NE" 'Nuevo Empleado
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")

                If Not AFP_FECHA_INI.Equals(String.Empty) Then
                    AFP_FECHA_INI = Utilities.fechaLocal(AFP_FECHA_INI)
                End If

                EPS_FECHA_INI = Utilities.fechaLocal(EPS_FECHA_INI)
                EPS_FECHA_FIN = Utilities.fechaLocal(EPS_FECHA_FIN)

                resArray = e.Crear_Empleado(PIDM, ESTADO_IND, USUA_ID, CTLG_CODE, SCSL_CODE, NIED_CODE, OCUP_CODE, REPE_CODE, NUM_CUSSP, AFP_FECHA_INI,
                                            TIPO_REG_SALUD, EPSA_CODE, EPSS_CODE, EPS_ESTADO, EPS_FECHA_INI, EPS_FECHA_FIN, VIDA_LEY_ESTADO, CUBA_CODE_PAGO,
                                            CUBA_CODE_CTS, TIPA_CODE, PEPA_CODE, CARG_CODE, FTVIEDU_CODE, ANIO_EDU_FIN, ASIST_CODE, FTVIEDU_DESC, MIXTO_IND, RESUMEN)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""RESPUESTA"" :" & """" & resArray(1).ToString & """,")
                resb.Append("""VALIDACION"" :" & """" & resArray(2).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "LEMP" 'Lista Info Empleado
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Listar_Empleados(PIDM, "0", IIf(ESTADO_IND = Nothing, "", ESTADO_IND), IIf(CTLG_CODE = Nothing, String.Empty, CTLG_CODE), IIf(SCSL_CODE = Nothing, String.Empty, SCSL_CODE), String.Empty)
                If Not (dt Is Nothing) Then

                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If

            Case "AFRP" 'Lista Afiliacion Regimen Pensionario
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Lista_Afiliacion_Reg_Pens(PIDM, IIf(REPE_CODE Is Nothing, "", REPE_CODE), IIf(ESTADO_IND Is Nothing, "", ESTADO_IND), CTLG_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & MiDataRow("SECUENCIA").ToString & """,")
                        resb.Append("""CUSPP"" :" & """" & MiDataRow("CUSPP").ToString & """,")
                        resb.Append("""REPE_CODE"" :" & """" & MiDataRow("REPE_CODE").ToString & """,")
                        resb.Append("""REPE_COD_SUNAT"" :" & """" & MiDataRow("REPE_COD_SUNAT").ToString & """,")
                        resb.Append("""REPE_DESC"" :" & """" & MiDataRow("REPE_DESC").ToString & """,")
                        resb.Append("""FECHA_INICIO"" :" & """" & MiDataRow("FECHA_INICIO").ToString & """,")
                        resb.Append("""FECHA_FIN"" :" & """" & MiDataRow("FECHA_FIN").ToString & """,")
                        resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                        resb.Append("""MIXTA_IND"" :" & """" & MiDataRow("MIXTA_IND").ToString & """,")
                        resb.Append("""MIXTA_DESC"" :" & """" & MiDataRow("MIXTA_DESC").ToString & """,")
                        resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "AFEPS" 'Lista Afiliacion EPS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Lista_Afiliacion_EPS(PIDM, CTLG_CODE, REPE_CODE, IIf(ESTADO_IND Is Nothing, "", ESTADO_IND))
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & MiDataRow("SECUENCIA").ToString & """,")
                        resb.Append("""EPSS_CODE"" :" & """" & MiDataRow("EPSS_CODE").ToString & """,")
                        resb.Append("""EPSA_CODE"" :" & """" & MiDataRow("EPSA_CODE").ToString & """,")
                        resb.Append("""EPSA_COD_SUNAT"" :" & """" & MiDataRow("EPSA_COD_SUNAT").ToString & """,")
                        resb.Append("""NOMBRE_EPS"" :" & """" & MiDataRow("NOMBRE_EPS").ToString & """,")
                        resb.Append("""FECHA_INICIO"" :" & """" & MiDataRow("FECHA_INICIO").ToString & """,")
                        resb.Append("""FECHA_FIN"" :" & """" & MiDataRow("FECHA_FIN").ToString & """,")
                        resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                        resb.Append("""VIDA_LEY_IND"" :" & """" & MiDataRow("VIDA_LEY_IND").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "PAGO" 'Lista Datos del Pago del empleado
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Lista_Datos_Pago_Empl(PIDM)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""TIPO_PAGO_COD"" :" & """" & MiDataRow("TIPO_PAGO_COD").ToString & """,")
                        resb.Append("""TIPO_PAGO"" :" & """" & MiDataRow("TIPO_PAGO").ToString & """,")
                        resb.Append("""CUEN_CODE_SUELDO"" :" & """" & MiDataRow("CUEN_CODE_SUELDO").ToString & """,")
                        resb.Append("""NRO_CUENTA_SUELDO"" :" & """" & MiDataRow("NRO_CUENTA_SUELDO").ToString & """,")
                        resb.Append("""CUEN_CODE_CTS"" :" & """" & MiDataRow("CUEN_CODE_CTS").ToString & """,")
                        resb.Append("""NRO_CUENTA_CTS"" :" & """" & MiDataRow("NRO_CUENTA_CTS").ToString & """,")
                        resb.Append("""PEPA_CODE"" :" & """" & MiDataRow("PEPA_CODE").ToString & """,")
                        resb.Append("""PEPA_DESC"" :" & """" & MiDataRow("PEPA_DESC").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "CONT" 'Lista Datos del Contrato del empleado
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Lista_Contrato_Empl(PIDM, CTLG_CODE, SCSL_CODE, ESTADO_IND)
                If Not (dt Is Nothing) Then
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If

            Case "AE" 'Actualiza Empleado
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New NOMADE.NC.NCEEmpleado("Bn")

                If Not AFP_FECHA_INI.Equals(String.Empty) Then
                    AFP_FECHA_INI = Utilities.fechaLocal(AFP_FECHA_INI)
                End If

                EPS_FECHA_INI = Utilities.fechaLocal(EPS_FECHA_INI)

                EPS_FECHA_FIN = Utilities.fechaLocal(EPS_FECHA_FIN)

                resArray = e.Actualizar_Empleado(PIDM, USUA_ID, CTLG_CODE, SCSL_CODE, NIED_CODE, OCUP_CODE, REPE_CODE, NUM_CUSSP, AFP_FECHA_INI,
                                            TIPO_REG_SALUD, EPSA_CODE, EPSS_CODE, EPS_ESTADO, EPS_FECHA_INI, EPS_FECHA_FIN, VIDA_LEY_ESTADO, CUBA_CODE_PAGO, CUBA_CODE_CTS, TIPA_CODE, PEPA_CODE,
                                            CARG_CODE, FTVIEDU_CODE, ANIO_EDU_FIN, ASIST_CODE, FTVIEDU_DESC, MIXTO_IND, RESUMEN, p_IND_ASIG_FAM, Utilities.fechaLocal(IIf(p_FEC_ASIG_FAM_INI.Equals(""), Nothing, p_FEC_ASIG_FAM_INI)), Utilities.fechaLocal(IIf(p_FEC_ASIG_FAM_FIN.Equals(""), Nothing, p_FEC_ASIG_FAM_FIN)))
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""RESPUESTA"" :" & """" & resArray(1).ToString & """,")
                resb.Append("""VALIDACION"" :" & """" & resArray(2).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "NIVED" 'Lista Nivel Educativo
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCNivelEducativo("BN")
                dt = pemp.ListarNivelEducativo("", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                        resb.Append("""NOMBRE_CORTO"" :" & """" & MiDataRow("NOMBRE_CORTO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "OCUP" 'Lista Ocupacion
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCOcupacion("BN")
                dt = pemp.ListarOcupacion("", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                        resb.Append("""NOMBRE_CORTO"" :" & """" & MiDataRow("NOMBRE_CORTO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "REGPEN" 'Regimen Pensionario
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCRegimenPen("BN")
                dt = pemp.ListarRegimenP("", "", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                        resb.Append("""TIP"" :" & """" & MiDataRow("TIP").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("Descripcion").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "LEPS" 'REPS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEps("BN")
                dt = pemp.ListarEps("", "","A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("EPS").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "TCONT" 'Tipo de Contrato
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCTipoContr("BN")
                dt = pemp.Listar_TipContr("", "", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("Codigo").ToString & """,")
                        resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("Codigo_Sunat").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("descripcion").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "IED" 'Institucion Educativa                
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")
                dt = pemp.Listar_Inst_Educativa()
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "NAF" 'Nueva Afiliación
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEEmpleado("Bn")

                AFP_FECHA_INI = Utilities.fechaLocal(AFP_FECHA_INI)

                resArray = e.Crear_AfiliacionAFP(PIDM, REPE_CODE, AFP_FECHA_INI, USUA_ID, MIXTO_IND)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""SUCCESS"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""GENERADO"" :" & """" & resArray(1).ToString & """,")
                resb.Append("""VALIDACION"" :" & """" & resArray(2).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()
            Case "VBIO" 'Vincula Biometrico

                Dim CodBio As String

                CodBio = New Nomade.NN.NNPlanilla("Bn").Verifica_Cod_Usu_Biometrico(DNI_BIO)
                res = CodBio.ToString()

            Case "NIVCARG" 'Lista  Empleado por nivel de cargo o indicador confianza
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim pemp As New Nomade.NC.NCEEmpleado("BN")

                Dim NIVEL_CARGO As String = ""
                Dim IND_CONFIANZA As String = ""

                NIVEL_CARGO = context.Request("NIVEL_CARGO")
                IND_CONFIANZA = context.Request("IND_CONFIANZA")

                dt = pemp.Listar_Empleados_Nivel_contrato(PIDM, ESTADO_IND, NIVEL_CARGO, IND_CONFIANZA, CTLG_CODE, SCSL_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                        resb.Append("""NOMBRE_EMPLEADO"" :" & """" & MiDataRow("NOMBRE_EMPLEADO").ToString & """,")
                        resb.Append("""CARGO"" :" & """" & MiDataRow("CARGO").ToString & """")
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
    End Sub


    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
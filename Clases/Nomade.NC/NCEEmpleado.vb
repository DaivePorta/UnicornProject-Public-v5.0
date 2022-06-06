Public Class NCEEmpleado
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_Personas() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_EMPLEADO_PERSONAS", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Empleados(ByVal p_PIDM As Integer, ByVal p_SEQ As Integer, ByVal p_ESTADO_IND As String, Optional ByVal p_CTLG_CODE As String = "", Optional p_SCSL_CODE As String = "",
                                     Optional p_CARGO As String = "", Optional p_NOMBRE As String = "", Optional p_FILTRO As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PCS_LISTAR_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SEQ", p_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CARGO", p_CARGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE", p_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILTRO", p_FILTRO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Empleados_Contrato_Activo(P_CTLG_CODE As String, P_SCSL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PCS_LISTAR_EMPLEADO_CONTRATO_ACTIVO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Empleados_ComboBox(ByVal p_MUESTRA_EMPRESA As String,
                                              ByVal p_SCSL_CTLG_CODE As String, ByVal p_MUESTRA_SUCURSAL As String,
                                              ByVal p_MUESTRA_TIPO_TRABAJADOR As String,
                                              ByVal p_MUESTRA_OCUPACION As String,
                                              ByVal p_MUESTRA_AFILIADO_EPS As String,
                                              ByVal p_EPSS_TIPO_IND As String,
                                              ByVal p_MUESTRA_SITUACION_EPS As String,
                                              ByVal p_MUESTRA_TIPO_CONTRATO As String,
                                              ByVal p_MUESTRA_MOTIVO_CESE As String,
                                              ByVal p_MUESTRA_TIPO_PAGO As String,
                                              ByVal p_MUESTRA_MOD_FORMATIVA As String,
                                              ByVal p_CUEN_PIDM As Integer,
                                              ByVal p_MUESTRA_CUENTA As String,
                                              ByVal p_MUESTRA_REGIMEN_PENSION As String,
                                              ByVal p_MUESTRA_PERIODICIDAD_PAGO As String,
                                              ByVal p_MUESTRA_NIVEL_EDUCATIVO As String,
                                              ByVal p_MUESTRA_CARGO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_EMPLEADO_COMBOBOX", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_EMPRESA", p_MUESTRA_EMPRESA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CTLG_CODE", p_SCSL_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_SUCURSAL", p_MUESTRA_SUCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_TIPO_TRABAJADOR", p_MUESTRA_TIPO_TRABAJADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_OCUPACION", p_MUESTRA_OCUPACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_AFILIADO_EPS", p_MUESTRA_AFILIADO_EPS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EPSS_TIPO_IND", p_EPSS_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_SITUACION_EPS", p_MUESTRA_SITUACION_EPS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_TIPO_CONTRATO", p_MUESTRA_TIPO_CONTRATO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_MOTIVO_CESE", p_MUESTRA_MOTIVO_CESE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_TIPO_PAGO", p_MUESTRA_TIPO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_MOD_FORMATIVA", p_MUESTRA_MOD_FORMATIVA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUEN_PIDM", p_CUEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_CUENTA", p_MUESTRA_CUENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_REGIMEN_PENSION", p_MUESTRA_REGIMEN_PENSION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_PERIODICIDAD_PAGO", p_MUESTRA_PERIODICIDAD_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_NIVEL_EDUCATIVO", p_MUESTRA_NIVEL_EDUCATIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MUESTRA_CARGO", p_MUESTRA_CARGO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_DatosContractuales(ByVal p_PEBEMCO_PIDM As Integer, ByVal p_PEBEMCO_SEQ As Integer, ByVal p_PEBEMCO_CTLG_CODE As String, ByVal p_PEBEMCO_SCSL_CODE As String, ByVal p_PEBEMCO_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_EMPLEADO_DATOSCONTRACTUALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMCO_PIDM", p_PEBEMCO_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMCO_SEQ", p_PEBEMCO_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMCO_CTLG_CODE", p_PEBEMCO_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMCO_SCSL_CODE", p_PEBEMCO_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMCO_ESTADO_IND", p_PEBEMCO_ESTADO_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_DerechoHabientes(ByVal p_PEBEMDA_PIDM As Integer, ByVal p_PEBEMDA_PIDM_DA As Integer, ByVal p_PEBEMDA_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_EMPLEADO_DERECHOHABIENTES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_PIDM", IIf(p_PEBEMDA_PIDM = 0, Nothing, p_PEBEMDA_PIDM), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_PIDM_DA", IIf(p_PEBEMDA_PIDM_DA = 0, Nothing, p_PEBEMDA_PIDM_DA), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_ESTADO_IND", p_PEBEMDA_ESTADO_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_DerechoHabiente(ByVal p_PEBEMDA_PIDM As Integer, ByVal p_PEBEMDA_PIDM_DA As Integer, ByVal p_PEBEMDA_FECHA_INICIO As String,
                                          ByVal p_PEBEMDA_FECHA_FIN As String, ByVal p_PEBEMDA_VINC_CODE As String, ByVal p_PEBEMDA_MBDH_CODE As String,
                                          ByVal p_PEBEMDA_ESTADO_IND As String, ByVal p_PEBEMDA_USUA_ID As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_EMPLEADO_DERECHOHABIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_PIDM", p_PEBEMDA_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_PIDM_DA", p_PEBEMDA_PIDM_DA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_FECHA_INICIO", p_PEBEMDA_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_FECHA_FIN", p_PEBEMDA_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_VINC_CODE", p_PEBEMDA_VINC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_MBDH_CODE", p_PEBEMDA_MBDH_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_ESTADO_IND", p_PEBEMDA_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_USUA_ID", p_PEBEMDA_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_RESP").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_DerechoHabiente(ByVal p_PEBEMDA_PIDM As Integer, ByVal p_PEBEMDA_PIDM_DA As Integer, ByVal p_PEBEMDA_FECHA_INICIO As String,
                                          ByVal p_PEBEMDA_FECHA_FIN As String, ByVal p_PEBEMDA_VINC_CODE As String, ByVal p_PEBEMDA_MBDH_CODE As String,
                                          ByVal p_PEBEMDA_ESTADO_IND As String, ByVal p_PEBEMDA_USUA_ID As String, p_PIDM_DA_ANT As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_EMPLEADO_DERECHOHABIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_PIDM", p_PEBEMDA_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_PIDM_DA", p_PEBEMDA_PIDM_DA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_FECHA_INICIO", p_PEBEMDA_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_FECHA_FIN", isNull(p_PEBEMDA_FECHA_FIN), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_VINC_CODE", p_PEBEMDA_VINC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_MBDH_CODE", isNull(p_PEBEMDA_MBDH_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_ESTADO_IND", p_PEBEMDA_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEBEMDA_USUA_ID", p_PEBEMDA_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_DA_ANT", p_PIDM_DA_ANT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_Empleado(ByVal p_PIDM As Integer, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String,
                                   ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                   ByVal p_NIED_CODE As String, ByVal p_OCUP_CODE As String, ByVal p_REPE_CODE As String,
                                   ByVal p_NUM_CUSSP As String, ByVal p_AFP_FECHA_INI As String, ByVal p_TIPO_REG_SALUD As String,
                                   ByVal p_EPSA_CODE As String, ByVal p_EPSS_CODE As String, ByVal EPS_ESTADO As String,
                                   ByVal p_EPS_FECHA_INI As String, ByVal p_EPS_FECHA_FIN As String, ByVal p_VIDA_LEY_IND As String, ByVal p_CUBA_CODE_PAGO As String,
                                   ByVal p_CUBA_CODE_CTS As String, ByVal p_TIPA_CODE As String, ByVal p_PEPA_CODE As String,
                                   ByVal p_CARG_CODE As String, p_FTVIEDU_CODE As String, p_ANIO_EDU_FIN As String, p_ASIST_CODE As String,
                                    p_FTVIEDU_DESC As String, p_MIXTO_IND As String, p_RESUMEN As String
                                   ) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_PERSONA_ESTEREOTIPO_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPA_CODE", p_TIPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUBA_CODE_PAGO", IIf(p_CUBA_CODE_PAGO = String.Empty, Nothing, p_CUBA_CODE_PAGO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEPA_CODE", p_PEPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUBA_CODE_CTS", IIf(p_CUBA_CODE_CTS = String.Empty, Nothing, p_CUBA_CODE_CTS), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EPSA_CODE", IIf(p_EPSA_CODE = String.Empty, Nothing, p_EPSA_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EPSS_CODE", p_EPSS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_OCUP_CODE", IIf(p_OCUP_CODE = String.Empty, Nothing, p_OCUP_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NIED_CODE", IIf(p_NIED_CODE = String.Empty, Nothing, p_NIED_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CARG_CODE", IIf(p_CARG_CODE = String.Empty, Nothing, p_CARG_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_CUSSP", p_NUM_CUSSP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REPE_CODE", p_REPE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDACION", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_REG_SALUD", p_TIPO_REG_SALUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EPS_FECHA_INI", p_EPS_FECHA_INI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VIDA_LEY_IND", p_VIDA_LEY_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AFP_FECHA_INI", p_AFP_FECHA_INI, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVIEDU_CODE", p_FTVIEDU_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO_EDU_FIN", p_ANIO_EDU_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ASIST_CODE", p_ASIST_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVIEDU_DESC", p_FTVIEDU_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MIXTO_IND", p_MIXTO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESUMEN", p_RESUMEN, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_GENERADO").Value
            msg(2) = cmd1.Parameters("@p_VALIDACION").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Lista_Afiliacion_Reg_Pens(p_PIDM As Integer, P_REPE_CODE As String, p_ESTADO_IND As String, p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTA_AFILIACION_REGIMEN_PENS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_REPE_CODE", P_REPE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Lista_Afiliacion_EPS(p_PIDM As Integer, P_CTLG_CODE As String, P_EPSA_CODE As String, p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTA_AFILIACION_EPS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_EPSA_CODE", P_EPSA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Lista_Contrato_Empl(ByVal P_PIDM As Integer, ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_ESTADO_IND As String, Optional P_NUMERO As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTA_CONTRATO_EMPL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NUMERO", P_NUMERO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Lista_Datos_Pago_Empl(ByVal P_PIDM As Integer) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTA_DATOS_PAGO_EMPL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Actualizar_Empleado(ByVal p_PIDM As Integer, ByVal p_USUA_ID As String,
                                  ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                  ByVal p_NIED_CODE As String, ByVal p_OCUP_CODE As String, ByVal p_REPE_CODE As String,
                                  ByVal p_NUM_CUSSP As String, ByVal p_AFP_FECHA_INI As String, ByVal p_TIPO_REG_SALUD As String,
                                  ByVal p_EPSA_CODE As String, ByVal p_EPSS_CODE As String, ByVal EPS_ESTADO As String,
                                  ByVal p_EPS_FECHA_INI As String, ByVal p_EPS_FECHA_FIN As String, ByVal p_VIDA_LEY_IND As String, ByVal p_CUBA_CODE_PAGO As String,
                                  ByVal p_CUBA_CODE_CTS As String, ByVal p_TIPA_CODE As String, ByVal p_PEPA_CODE As String,
                                  ByVal p_CARG_CODE As String, p_FTVIEDU_CODE As String, p_ANIO_EDU_FIN As String, p_ASIST_CODE As String,
                                    p_FTVIEDU_DESC As String, p_MIXTO_IND As String, p_RESUMEN As String, Optional p_IND_ASIG_FAM As String = "N",
                                    Optional p_FEC_ASIG_FAM_INI As String = "", Optional p_FEC_ASIG_FAM_FIN As String = ""
                                  ) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_PERS_ESTEREOTIPO_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPA_CODE", p_TIPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUBA_CODE_PAGO", IIf(p_CUBA_CODE_PAGO = String.Empty, Nothing, p_CUBA_CODE_PAGO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PEPA_CODE", p_PEPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUBA_CODE_CTS", IIf(p_CUBA_CODE_CTS = String.Empty, Nothing, p_CUBA_CODE_CTS), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EPSA_CODE", IIf(p_EPSA_CODE = String.Empty, Nothing, p_EPSA_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EPSS_CODE", p_EPSS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))



            cmd.Parameters.Add(cn.GetNewParameter("@p_OCUP_CODE", IIf(p_OCUP_CODE = String.Empty, Nothing, p_OCUP_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NIED_CODE", IIf(p_NIED_CODE = String.Empty, Nothing, p_NIED_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CARG_CODE", p_CARG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_CUSSP", p_NUM_CUSSP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REPE_CODE", p_REPE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDACION", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_REG_SALUD", p_TIPO_REG_SALUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EPS_FECHA_INI", p_EPS_FECHA_INI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EPS_FECHA_FIN", p_EPS_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VIDA_LEY_IND", p_VIDA_LEY_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_AFP_FECHA_INI", p_AFP_FECHA_INI, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVIEDU_CODE", p_FTVIEDU_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO_EDU_FIN", p_ANIO_EDU_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ASIST_CODE", p_ASIST_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVIEDU_DESC", p_FTVIEDU_DESC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MIXTO_IND", p_MIXTO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESUMEN", p_RESUMEN, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_ASIG_FAM", p_IND_ASIG_FAM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FEC_ASIG_FAM_INI", If(p_FEC_ASIG_FAM_INI = "", DBNull.Value, p_FEC_ASIG_FAM_INI), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FEC_ASIG_FAM_FIN", If(p_FEC_ASIG_FAM_FIN = "", DBNull.Value, p_FEC_ASIG_FAM_FIN), ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_GENERADO").Value
            msg(2) = cmd1.Parameters("@p_VALIDACION").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Lista_Empl_Centro_Costos(ByVal P_PIDM As Integer) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTA_EMPL_CENTRO_COSTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_Centro_Costo_Empl(ByVal P_PIDM As Integer, ByVal P_PTVCECD_CODE As String, ByVal P_PORCENTAJE As String,
                                 P_USUARIO As String, P_NUMERO_CONT As String, P_CECC_CODE As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_INSERTA_EMPL_CENTRO_COSTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PTVCECD_CODE", P_PTVCECD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PORCENTAJE", P_PORCENTAJE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUARIO", P_USUARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NUMERO_CONT", P_NUMERO_CONT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECC_CODE", P_CECC_CODE, ParameterDirection.Input, 253))

            'cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDACION", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            'msg(1) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = cmd1.Parameters("@p_VALIDACION").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Eliminar_Centro_Costo_Empl(ByVal P_PIDM As Integer, P_NUMERO_CONT As String, P_CECC_CODE As String, ByVal P_PTVCECD_CODE As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ELIMINAR_EMPL_CENTRO_COSTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NUMERO_CONT", P_NUMERO_CONT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECC_CODE", P_CECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PTVCECD_CODE", P_PTVCECD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDACION", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_VALIDACION").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_MotivoCese(ByVal p_CODE As String, ByVal p_CODE_SUNAT As String, ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_MOTIVO_CESE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", p_CODE_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_Contrato(p_PIDM As Integer, p_CTLG_CODE As String, p_SCSL_CODE As String, p_CONT_FECHA_INI As String,
                                    p_CONT_FECHA_FIN As String, p_TICO_CODE As String, p_TITR_CODE As String, p_TMOF_CODE As String,
                                    p_CARG_CODE As String, p_REM_BASICA As String, p_MOVILIDAD As String, p_VIATICOS As String,
                                    p_REFRIGERIO As String, p_BONIFICACION_RIESGO_CAJA As String, p_BONO_PRODUCTIVIDAD As String,
                                    p_ASIG_FAM_IND As String, p_ASIG_FAM As String, p_REM_TOTAL As String,
                                    p_ESTADO_IND As String, p_USUA_ID As String, p_RHREGLA_CODE As String, p_RENOV_IND As String) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_INSERTAR_CONTRATO_EMPL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONT_FECHA_INI", p_CONT_FECHA_INI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONT_FECHA_FIN", p_CONT_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TICO_CODE", p_TICO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TITR_CODE", p_TITR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TMOF_CODE", p_TMOF_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CARG_CODE", p_CARG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REM_BASICA", p_REM_BASICA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVILIDAD", p_MOVILIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VIATICOS", p_VIATICOS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_REFRIGERIO", p_REFRIGERIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BONIFICACION_RIESGO_CAJA", p_BONIFICACION_RIESGO_CAJA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BONO_PRODUCTIVIDAD", p_BONO_PRODUCTIVIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ASIG_FAM_IND", p_ASIG_FAM_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ASIG_FAM", p_ASIG_FAM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REM_TOTAL", p_REM_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDACION", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHREGLA_CODE", p_RHREGLA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RENOV_IND", p_RENOV_IND, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_GENERADO").Value
            msg(2) = cmd1.Parameters("@p_VALIDACION").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Contrato(p_PIDM As Integer, p_CTLG_CODE As String, p_SCSL_CODE As String, p_CONT_FECHA_INI As String,
                                   p_CONT_FECHA_FIN As String, p_TICO_CODE As String, p_TITR_CODE As String, p_TMOF_CODE As String,
                                   p_CARG_CODE As String, p_REM_BASICA As String, p_MOVILIDAD As String, p_VIATICOS As String,
                                   p_REFRIGERIO As String, p_BONIFICACION_RIESGO_CAJA As String, p_BONO_PRODUCTIVIDAD As String, p_REM_TOTAL As String,
                                   p_ESTADO_IND As String, p_USUA_ID As String, p_MOTIVO_CESE As String, p_CONT_FECHA_CESE As String, p_RHREGLA_CODE As String) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALZAR_CONTRATO_EMPL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONT_FECHA_INI", p_CONT_FECHA_INI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONT_FECHA_FIN", p_CONT_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TICO_CODE", p_TICO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TITR_CODE", p_TITR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TMOF_CODE", p_TMOF_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CARG_CODE", p_CARG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REM_BASICA", p_REM_BASICA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVILIDAD", p_MOVILIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VIATICOS", p_VIATICOS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_REFRIGERIO", p_REFRIGERIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BONIFICACION_RIESGO_CAJA", p_BONIFICACION_RIESGO_CAJA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BONO_PRODUCTIVIDAD", p_BONO_PRODUCTIVIDAD, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_REM_TOTAL", p_REM_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO_CESE", p_MOTIVO_CESE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONT_FECHA_CESE", p_CONT_FECHA_CESE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDACION", String.Empty, ParameterDirection.Output, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RHREGLA_CODE", p_RHREGLA_CODE, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_GENERADO").Value
            msg(2) = cmd1.Parameters("@p_VALIDACION").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Inst_Educativa() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_INSTITUCION_EDUC", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_AfiliacionAFP(P_PIDM As Integer, P_REPE_CODE As String, P_FECHA_INICIO As String, p_USUA_ID As String, p_MIXTO_IND As String) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_INSERTA_AFILIACION_REGIMEN_PENS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", P_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_REPE_CODE", P_REPE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_INICIO", P_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDACION", String.Empty, ParameterDirection.Output, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MIXTO_IND", p_MIXTO_IND, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_GENERADO").Value
            msg(2) = cmd1.Parameters("@p_VALIDACION").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Detalle_Vac(p_PIDM As Integer, p_SEQ As Integer, p_ITEM As Integer, p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_DETALLE_VAC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SEQ", p_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_Periodo_Vac(p_PIDM As Integer, p_SERIE As String, p_DIAS As Integer, p_USUARIO As String, p_CTLG_CODE As String) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_PERIODO_VAC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIAS", p_DIAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUARIO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDACION", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_GENERADO").Value
            msg(2) = cmd1.Parameters("@p_VALIDACION").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_Detalle_Vac(p_PIDM As Integer, p_SEQ As Integer, p_FECHA_INI As String, p_FECHA_FIN As String,
                                      p_DIAS As Integer, p_ESTADO As String, p_USUARIO As String, p_ADEL_IND As String, p_CTLG_CODE As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_DETALLE_VAC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SEQ", p_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI", p_FECHA_INI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIAS", p_DIAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADEL_IND", p_ADEL_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = ""
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Elimina_Detalle_Vac(ITEM As Integer) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ELIMINAR_DETALLE_VAC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", ITEM, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = ""

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Actualiza_Detalle_Vac(ITEM As Integer, ESTADO As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_DETALLE_VAC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", ESTADO, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = ""

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Lista_Liquidacion_Empl(ByVal P_PIDM As Integer, ByVal p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_LIQUIDACION_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@PIDM", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@CODIGO_CARGO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@CODIGO_REGLABORAL", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@FECHA_INI", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@FECHA_CESE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@CODIGO_MOTIVO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@ANOS", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@MESES", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@DIAS", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@SERIE_CONTRATO", String.Empty, ParameterDirection.Output, 253))



            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function




    Public Function Listar_Periodo_Vac(p_PIDM As Integer, p_SERIE As String, p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PERIODO_VAC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function Listar_Detalle_Vac(p_PIDM As Integer, p_SEQ As Integer) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_DETALLE_VAC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SEQ", p_SEQ, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_Liquidacion_Empleado(P_PIDM As Integer, p_USUA_ID As String, ByVal p_DETALLE As String) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_CREAR_LIQUIDACION_EMPLEADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", P_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ARCHV", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_LIQ", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_RESP").Value
            msg(1) = cmd1.Parameters("@p_ARCHV").Value
            msg(2) = cmd1.Parameters("@p_FECHA_LIQ").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Empleados_Nivel_contrato(P_PIDM As Integer, P_ESTADO_IND As String, P_NIVEL As String,
                                                    P_CONFI_IND As String, P_CTLG_CODE As String, P_SCSL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PCS_LISTAR_EMPLEADO_NIVEL_CARGO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NIVEL", P_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CONFI_IND", P_CONFI_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Desactiva_DerechoHabiente(p_CODE_DERE_HAB As Integer, p_FECHA_FIN As String, p_CODE_MOTIVO As String, p_USUA_ID As String) As String
        Try
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            Dim msg As String

            cmd = cn.GetNewCommand("PFC_DESACTIVA_DERECHO_HABIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_DERE_HAB", p_CODE_DERE_HAB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_MOTIVO", p_CODE_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarEstadoContrato(p_CODIGO As String, p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTA_ESTADO_CONTRATO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Function isNull(ByVal p_Value As Object) As Object
        Return IIf(Trim(p_Value.ToString) = String.Empty, DBNull.Value, p_Value)
    End Function
    Public Function Obtener_Niveles_Centros_Costos(P_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_OBTENER_NIVELES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class

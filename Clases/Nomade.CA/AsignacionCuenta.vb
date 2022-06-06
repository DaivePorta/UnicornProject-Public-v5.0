Public Class AsignacionCuenta
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function AprobarRendicionCuenta(ByVal p_ctlg_code As String, ByVal p_scsl_code As String, ByVal p_monto As String, ByVal p_asig_code As String, ByVal p_seq As String, ByVal p_usua_id As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCA_APROBAR_RENDICION_CUENTA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ASIG_CODE", p_asig_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SEQ", p_seq, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarRendicionTipo(ByVal p_codigo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCA_LISTAR_RENDICION_TIPO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))

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
    Public Function ListarRendicionesCuentas(ByVal p_ctlg_code As String, ByVal p_scsl_code As String, ByVal p_estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCA_LISTAR_RENDICIONES_ASIGNACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", p_estado, ParameterDirection.Input, 253))

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

    Public Function ListarAsignacion(ByVal p_codigo As String, ByVal p_ctlg_code As String, ByVal p_scsl_code As String, ByVal p_estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCA_LISTAR_ASIGNACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))

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

    Public Function ListarAsignacionesAprobadas(ByVal p_ctlg_code As String, ByVal p_scsl_code As String, ByVal p_estado As String, ByVal p_finicio As String, ByVal p_ffin As String, ByVal p_pidm As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCA_LISTAR_ASIGNACIONES_APROBADAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FINICIO", p_finicio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FFIN", p_ffin, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))

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

    Public Function ListarAsignacionesAprobadasPersona(ByVal p_ctlg_code As String, ByVal p_scsl_code As String, ByVal p_estado As String, ByVal p_pidm As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCA_LISTAR_ASIGNACIONES_APROBADAS_PERSONA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))

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

    Public Function AprobarRechazarAsignacion(ByVal p_tipo As String, ByVal p_ctlg_code As String, _
                                        ByVal p_scsl_code As String, ByVal p_codigos As String, _
                                        ByVal p_caja_code As String, ByVal p_pidm As String, _
                                        ByVal p_usua_id As String, ByVal P_TIPO_DCTO_INT As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCA_APROBAR_RECHAZAR_CUENTA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGOS", p_codigos, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_DCTO_INT", P_TIPO_DCTO_INT, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarAsignacion(ByVal p_codigo As String, ByVal p_ctlg_code As String,
                                        ByVal p_scsl_code As String, ByVal p_pidm As String, ByVal p_activo_ind As String,
                                        ByVal p_glosa As String, ByVal p_mone_code As String, ByVal p_monto As String,
                                        ByVal p_fecha_registro As String, ByVal p_fecha_limite As String, _
                                        ByVal p_centro_costo As String, ByVal p_centro_cecc As String, ByVal p_estado As String, ByVal p_usua_id As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCA_ACTUALIZAR_ASIGNACION_CUENTA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACTIVO_IND", p_activo_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_glosa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_mone_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_REGISTRO", p_fecha_registro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_LIMITE", p_fecha_limite, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECC_CODE", p_centro_cecc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECD_CODE", p_centro_costo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearAsignacion(ByVal p_ctlg_code As String,
                                        ByVal p_scsl_code As String, ByVal p_pidm As String, ByVal p_activo_ind As String,
                                        ByVal p_glosa As String, ByVal p_mone_code As String, ByVal p_monto As String,
                                        ByVal p_fecha_registro As String, ByVal p_fecha_limite As String, _
                                        ByVal p_centro_costo As String, ByVal p_centro_cecc As String, ByVal p_estado As String, ByVal p_usua_id As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCA_CREAR_ASIGNACION_CUENTA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACTIVO_IND", p_activo_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_glosa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_mone_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_REGISTRO", p_fecha_registro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_LIMITE", p_fecha_limite, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECC_CODE", p_centro_cecc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECD_CODE", p_centro_costo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarCajasDisponibles(ByVal p_ctlg_code As String, ByVal p_scsl_code As String, ByVal p_estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCA_LISTAR_CAJAS_DISPONIBLES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))

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


    Public Function RendirCuentaAsignacion(ByVal p_ctlg_code As String, ByVal p_scsl_code As String, _
                                        ByVal p_asig_code As String, ByVal p_text_comp As String, _
                                        ByVal p_mone_code As String, ByVal p_mont_caja As String, _
                                        ByVal p_caja_code As String, ByVal p_usua_id As String, _
                                        ByVal p_tipo_camb As String, ByVal p_pidm_empl As String, _
                                        ByVal p_codigo_apertura As String, ByVal p_tcom_code As String, _
                                        ByVal p_monto As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCA_RENDICION_ASIGNACION_CUENTA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ASIG_CODE", p_asig_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CAJA", p_mone_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", p_mone_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", p_text_comp, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONT_CAJA", p_mont_caja, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_CAMB", p_tipo_camb, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_EMPL", p_pidm_empl, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO_APERTURA", p_codigo_apertura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TCOM_CODE", p_tcom_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONTO", p_monto, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@P_RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function GrabarRendicionCuenta(ByVal p_ctlg_code As String, ByVal p_scsl_code As String, _
                                        ByVal p_asig_code As String, ByVal p_text_comp As String, _
                                        ByVal p_mone_code As String, ByVal p_caja_code As String, _
                                        ByVal p_monto As String, ByVal p_tipo As String, _
                                        ByVal p_devolver As String, ByVal p_usua_id As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PCA_CREAR_RENDICION_CUENTA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ASIG_CODE", p_asig_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", p_text_comp, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", p_mone_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DEVOLVER", p_devolver, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@P_RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class

Public Class NFDiagnostico
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarDiagnostico(ByVal p_ctlg As String, ByVal p_scsl As String, ByVal p_rece As String, ByVal p_diag As String, ByVal p_pidm As String, ByVal p_tipo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFF_LISTAR_DIAGNOSTICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_scsl, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RECE_CODE", p_rece, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DIAG_CODE", p_diag, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", p_tipo, ParameterDirection.Input, 253))

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

    Public Function CrearDiagnostico(ByVal p_code_rece As String,
                                         ByVal p_fec_diagnostico As String, ByVal p_hora_diagnostico As String,
                                         ByVal p_fec_entrega As String, ByVal p_hora_entrega As String,
                                         ByVal p_code_cotiz As String, ByVal p_monto_cotiz As String,
                                         ByVal p_diagnostico As String, ByVal p_recomendacion As String,
                                         ByVal p_pidm_tecnico As String, ByVal p_estado As String, ByVal p_almc_code As String,
                                         ByVal p_conc_diag As String, ByVal p_monto_diag As String,
                                         ByVal p_est_diagnostico As String, ByVal p_usua_id As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFF_CREAR_DIAGNOSTICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_RECE", p_code_rece, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FEC_DIAGNOSTICO", p_fec_diagnostico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORA_DIAGNOSTICO", p_hora_diagnostico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FEC_ENTREGA", p_fec_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORA_ENTREGA", p_hora_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_COTIZ", p_code_cotiz, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONTO_COTIZ", p_monto_cotiz, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DIAGNOSTICO", p_diagnostico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RECOMENDACION", p_recomendacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_TECNICO", p_pidm_tecnico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMC_CODE", p_almc_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CONC_DIAG", p_conc_diag, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONTO_DIAG", p_monto_diag, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_EST_DIAG", p_est_diagnostico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_CODE_GENERADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Se ejecuta cuando la venta no se ha generado
    Public Function RevertirDiagnostico(ByVal p_code As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFF_REVERTIR_DIAGNOSTICO_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_DIAGNOSTICO", p_code, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ActualizarDiagnostico(ByVal p_code As String, ByVal p_fec_diagnostico As String,
                                          ByVal p_fec_entrega As String, ByVal p_code_cotiz As String,
                                          ByVal p_monto_cotiz As String, ByVal p_diagnostico As String,
                                          ByVal p_recomendacion As String, ByVal p_pidm_tecnico As String,
                                          ByVal p_estado As String, ByVal p_conc_diag As String,
                                          ByVal p_monto_diag As String, ByVal p_usua_id As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFF_ACTUALIZAR_DIAGNOSTICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", p_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FEC_DIAGNOSTICO", p_fec_diagnostico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FEC_ENTREGA", p_fec_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_COTIZ", p_code_cotiz, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONTO_COTIZ", p_monto_cotiz, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DIAGNOSTICO", p_diagnostico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RECOMENDACION", p_recomendacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_TECNICO", p_pidm_tecnico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CONC_DIAG", p_conc_diag, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONTO_DIAG", p_monto_diag, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarServiciosPrecio(ByVal p_ctlg As String, ByVal p_scsl As String, ByVal p_almc As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_SERVICIOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_scsl, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMC_CODE", p_almc, ParameterDirection.Input, 253))
            
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

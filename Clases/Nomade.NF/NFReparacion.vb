Public Class NFReparacion
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function CrearReparacion(ByVal p_ctlg As String,
                                         ByVal p_scsl As String, ByVal p_almc As String,
                                         ByVal p_cod_prd As String, ByVal p_serie As String,
                                         ByVal p_fec_entrega As String, ByVal p_hora_entrega As String,
                                         ByVal p_lugar_entrega As String, ByVal p_rece_code As String,
                                         ByVal p_diag_code As String, ByVal p_diagnostico As String,
                                         ByVal p_recomendacion As String, ByVal p_pidm_tecnico As String,
                                         ByVal p_estado As String, ByVal p_detalles_prod As String,
                                         ByVal p_cecc_code As String, ByVal p_cecd_code As String,
                                         ByVal p_usua_id As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFF_CREAR_REPARACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUCURSAL", p_scsl, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMC_CODE", p_almc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COD_PRD", p_cod_prd, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NRO_SERIE", p_serie, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_ENTREGA", p_fec_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORA_ENTREGA", p_hora_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_LUGAR_ENTREGA", p_lugar_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RECE_CODE", p_rece_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DIAG_CODE", p_diag_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DIAGNOSTICO", p_diagnostico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RECOMENDACION", p_recomendacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_TECNICO", p_pidm_tecnico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DETALLES_PROD", p_detalles_prod, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECC_CODE", p_cecc_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECD_CODE", p_cecd_code, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ISAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@P_CODIGO").Value
            msg(1) = cmd1.Parameters("@P_ISAC_CODE").Value
            msg(2) = cmd1.Parameters("@P_RESPUESTA").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function PasePagoReparacion(ByVal p_ctlg As String,
                                         ByVal p_scsl As String, ByVal p_almc As String,
                                         ByVal p_cod_prd As String, ByVal p_serie As String,
                                         ByVal p_fec_entrega As String, ByVal p_hora_entrega As String,
                                         ByVal p_lugar_entrega As String, ByVal p_rece_code As String,
                                         ByVal p_diag_code As String, ByVal p_diagnostico As String,
                                         ByVal p_recomendacion As String, ByVal p_pidm_tecnico As String,
                                         ByVal p_estado As String, ByVal p_detalles_prod As String,
                                         ByVal p_cecc_code As String, ByVal p_cecd_code As String,
                                         ByVal p_usua_id As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFF_PASAR_PAGO_REPARACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUCURSAL", p_scsl, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMC_CODE", p_almc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COD_PRD", p_cod_prd, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NRO_SERIE", p_serie, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_ENTREGA", p_fec_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORA_ENTREGA", p_hora_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_LUGAR_ENTREGA", p_lugar_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RECE_CODE", p_rece_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DIAG_CODE", p_diag_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DIAGNOSTICO", p_diagnostico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RECOMENDACION", p_recomendacion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_TECNICO", p_pidm_tecnico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DETALLES_PROD", p_detalles_prod, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECC_CODE", p_cecc_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECD_CODE", p_cecd_code, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ISAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@P_CODIGO").Value
            msg(1) = cmd1.Parameters("@P_ISAC_CODE").Value
            msg(2) = cmd1.Parameters("@P_RESPUESTA").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CerrarReparacion(ByVal p_repa_code As String, ByVal p_usua_id As String, ByVal p_valor As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFF_CIERRE_REPARACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_REPA_CODE", p_repa_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR", p_valor, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarReparacion(ByVal p_rece_code As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFF_LISTAR_REPARACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_RECE_CODE", p_rece_code, ParameterDirection.Input, 253))
            
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

    Public Function ListarDetalleReparacion(ByVal p_repa_code As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFF_LISTAR_DETALLE_REPARACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_REPA_CODE", p_repa_code, ParameterDirection.Input, 253))

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

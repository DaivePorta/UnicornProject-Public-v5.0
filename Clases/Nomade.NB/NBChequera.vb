Public Class NBChequera


    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarChequera(ByVal p_CODE As String, ByVal p_PIDM As String, Optional ByVal p_CTA As String = "", Optional ByVal p_tipo As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_CHEQUERA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA", p_CTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))

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

    Public Function ListarChequeraActiva(ByVal p_CODE As String, ByVal p_PIDM As String, Optional ByVal p_CTA As String = "", Optional ByVal p_tipo As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_CHEQUERA_ACTIVA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA", p_CTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))

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

    Public Function ActualizarChequera(ByVal p_codigo As String, ByVal p_ctlg_code As String,
                                   ByVal p_fecha_registro As String, ByVal p_fecha_inicio As String,
                                   ByVal p_cta_code As String,
                                   ByVal p_cta_pidm As String, ByVal p_tipo As String,
                                   ByVal p_cheque_inicial As String, ByVal p_cheque_final As String,
                                   ByVal p_nro_cheques As String, ByVal p_usua_id As String, ByVal p_monto As String,
                                    ByVal p_moneda_code As String
                                    ) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_ACTUALIZAR_CHEQUERA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REGISTRO", p_fecha_registro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fecha_inicio, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_cta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CHEQUE_INICIAL", p_cheque_inicial, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CHEQUE_FINAL", p_cheque_final, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_moneda_code, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CHEQUES", p_nro_cheques, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearChequera(ByVal p_ctlg_code As String,
                                   ByVal p_fecha_registro As String, ByVal p_fecha_inicio As String,
                                    ByVal p_cta_code As String,
                                   ByVal p_cta_pidm As String, ByVal p_tipo As String,
                                   ByVal p_cheque_inicial As String, ByVal p_cheque_final As String,
                                   ByVal p_nro_cheques As String, ByVal p_usua_id As String, ByVal p_monto As String,
                                    ByVal p_moneda_code As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_CHEQUERA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REGISTRO", p_fecha_registro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fecha_inicio, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_cta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CHEQUE_INICIAL", p_cheque_inicial, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CHEQUE_FINAL", p_cheque_final, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_moneda_code, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CHEQUES", p_nro_cheques, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ObtenerSiguienteNumero(ByVal p_cta_bancaria As String, ByVal p_cta_pidm As String, ByVal p_tipo As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_SGT_CHEQUERA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_CHEQA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_BANCARIA", p_cta_bancaria, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_NUMERO_CHEQA").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarCtasBancarias(ByVal PIDM As String, ByVal ESTADO As String, ByVal CHEQUERA_IND As String, Optional ByVal CODIGO As String = "", Optional ByVal p_BANC_CODE As String = "") As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_CTAS_BANCARIAS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CHEQUERA", CHEQUERA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BANC_CODE", p_BANC_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ListarCtasBancarias_2(ByVal p_CTLG As String, ByVal ESTADO As String, ByVal CHEQUERA_IND As String, Optional ByVal CODIGO As String = "", Optional ByVal p_BANC_CODE As String = "") As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_CTAS_BANCARIAS_2", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CHEQUERA", CHEQUERA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BANC_CODE", p_BANC_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ListarMovimientosCuentasBancarias(ByVal p_CTLG_CODE As String, ByVal p_CHK_DETALLE As String, ByVal p_MONE_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CTA_BANCARIA As String,
                                                      ByVal p_DESC_CTA_BANCARIA As String, ByVal p_DESDE As String, p_HASTA As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_MOVIMIENTOS_CTAS_BANCARIAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CHK_DETALLE", p_CHK_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_BANCARIA", p_CTA_BANCARIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_CTA_BANCARIA", p_DESC_CTA_BANCARIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

End Class

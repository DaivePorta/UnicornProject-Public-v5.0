Public Class NBCheque

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarCheque(ByVal p_numero_cheq As String, ByVal p_cta_bancaria As String, ByVal p_cta_pidm As String, ByVal p_tipo As String, Optional ByVal p_estado As String = "", Optional ByVal p_destino As String = "", Optional ByVal p_ctlg As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_CHEQUE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_CHEQ", p_numero_cheq, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_BANCARIA", p_cta_bancaria, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))

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

    Public Function ListarChequeAnulados(ByVal p_numero_cheq As String, ByVal p_cta_bancaria As String, ByVal p_cta_pidm As String, ByVal p_tipo As String, Optional ByVal p_estado As String = "", Optional ByVal p_destino As String = "", Optional ByVal p_ctlg As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_CHEQUE_ANULAR", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_CHEQ", p_numero_cheq, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_BANCARIA", p_cta_bancaria, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))

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

    Public Function ActualizarCheque(ByVal p_ctlg_code As String, ByVal p_cta_bancaria As String,
                                   ByVal p_cta_pidm As String, ByVal p_numero_cheq As String,
                                   ByVal p_fecha_emision As String, ByVal p_fecha_cobrar As String,
                                   ByVal p_monto As String, ByVal p_fecha_registro As String,
                                   ByVal p_giradoa_pidm As String, ByVal p_estado_ind As String,
                                   ByVal p_estado_cheq As String, ByVal p_usua_id As String,
                                   ByVal p_firmante_pidm As String, ByVal p_firmante_pidm2 As String,
                                   ByVal p_moneda As String, ByVal p_glosa As String, ByVal p_tipo As String,
                                   ByVal p_destino As String,
                                   Optional ByVal p_CODE_TEXT As String = "")
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_ACTUALIZAR_CHEQUE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_BANCARIA", p_cta_bancaria, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_CHEQ", p_numero_cheq, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_fecha_emision, ParameterDirection.Input, 253))
            If p_fecha_cobrar = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_COBRAR", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_COBRAR", p_fecha_cobrar, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_REGISTRO", p_fecha_registro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_GIRADOA", p_giradoa_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_CHEQ", p_estado_cheq, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_FIRMANTE", p_firmante_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_FIRMANTE_2", p_firmante_pidm2, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_moneda, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_glosa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))



            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_TEXT", p_CODE_TEXT, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function AnularRangoCheque(ByVal p_cta_pidm As String, ByVal p_nro_cheq_inicio As String, ByVal p_nro_cheq_final As String,
                                      ByVal p_cta_bancaria As String, ByVal p_ctlg_code As String, ByVal p_usua_id As String,
                                      ByVal p_tipo As String, ByVal p_glosa As String) As String

        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_ANULAR_RANGO_CHEQUE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CHEQ_INICIO", p_nro_cheq_inicio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CHEQ_FINAL", p_nro_cheq_final, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_BANCARIA", p_cta_bancaria, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_glosa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESPUESTA").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try

    End Function

    Public Function CrearCheque(ByVal p_ctlg_code As String, ByVal p_cta_bancaria As String,
                                   ByVal p_cta_pidm As String, ByVal p_numero_cheq As String,
                                   ByVal p_fecha_emision As String, ByVal p_fecha_cobrar As String,
                                   ByVal p_monto As String, ByVal p_fecha_registro As String,
                                   ByVal p_giradoa_pidm As String, ByVal p_estado_ind As String,
                                   ByVal p_estado_cheq As String, ByVal p_usua_id As String,
                                   ByVal p_firmante_pidm As String, ByVal p_firmante_pidm2 As String,
                                   ByVal p_destino As String,
                                   ByVal p_moneda As String, ByVal p_glosa As String, ByVal p_tipo As String, ByVal p_sf_ind As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_CHEQUE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_BANCARIA", p_cta_bancaria, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_CHEQ", p_numero_cheq, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_fecha_emision, ParameterDirection.Input, 253))
            If p_fecha_cobrar = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_COBRAR", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_COBRAR", p_fecha_cobrar, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_REGISTRO", p_fecha_registro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_GIRADOA", p_giradoa_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_CHEQ", p_estado_cheq, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_FIRMANTE", p_firmante_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_FIRMANTE_2", p_firmante_pidm2, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_moneda, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_glosa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SIN_FONDOS_IND", p_sf_ind, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarMoneda(ByVal p_CTA_BANCARIA As String, ByVal p_CTA_PIDM As String) As String
        Try

            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_SGT_CHEQUE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_CHEQ", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_BANCARIA", p_CTA_BANCARIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_CTA_PIDM, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_NUMERO_CHEQ").Value


            Return msg


        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ObtenerNroCheque(ByVal p_cta_bancaria As String, ByVal p_cta_pidm As String, ByVal p_tipo As String, ByVal p_code_chequera As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_GENERAR_SGTE_CHEQUE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_CHEQ", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA", p_cta_bancaria, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_code_chequera, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_NUMERO_CHEQ").Value

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

            cmd = cn.GetNewCommand("PFB_LISTAR_SGT_CHEQUE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_CHEQ", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_BANCARIA", p_cta_bancaria, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_NUMERO_CHEQ").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ObtenerChequesRestantes(ByVal p_cta_bancaria As String, ByVal p_cta_pidm As String, ByVal p_tipo As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_VALIDAR_CHEQUES_RESTANTES", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CHEQ_RESTANTES", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_BANCARIA", p_cta_bancaria, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CHEQ_RESTANTES").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function ListarCheque_Detallle(ByVal p_numero_cheq As String, ByVal p_cta_bancaria As String, ByVal p_cta_pidm As String, ByVal p_tipo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_CHEQUE_DETALLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_CHEQ", p_numero_cheq, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_BANCARIA", p_cta_bancaria, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_PIDM", p_cta_pidm, ParameterDirection.Input, 253))
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

End Class

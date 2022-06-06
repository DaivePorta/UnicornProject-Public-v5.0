Public Class NBCreditoBancario

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function PagoCreditoCaja(ByVal p_detalle As String, ByVal p_caja_code As String,
                          ByVal p_usua_id As String, ByVal p_codigo_apertura As String,
                            ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                          ByVal p_moneda_code As String, ByVal p_medio_pago As String,
                          ByVal p_descripcion As String, ByVal p_destino As String, ByVal p_documento As String, ByVal p_tipo_cambio As String,
                          ByVal p_PAGADO_IND As String, ByVal p_establecimiento As String,
                          Optional ByVal p_ind As String = "CAJ", Optional ByVal p_pidm As String = "", Optional ByVal p_cta_code As String = "",
                           Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "", Optional ByVal p_ind_completo As String = "",
                            Optional ByVal p_adicional As String = "", Optional ByVal p_MONTO_TOTAL As String = "") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_PAGO_CREDITO_BANCARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_detalle, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_APERTURA", p_codigo_apertura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_moneda_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MEDIO_PAGO", p_medio_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_fecha_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOCUMENTO", p_documento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND", p_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_cta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", p_oficina, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANAL", p_canal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPLETO", p_ind_completo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADICIONAL", p_adicional, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", p_MONTO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_establecimiento, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd.Parameters("@p_MENSAJE").Value


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function PagoCreditoBanco(ByVal p_detalle As String, ByVal p_pidm As String, ByVal p_cta_code As String,
                               ByVal p_usua_id As String, ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                               ByVal p_moneda_code As String, ByVal p_medio_pago As String, ByVal p_descripcion As String,
                               ByVal p_destino As String, ByVal p_documento As String, ByVal p_ind_completo As String, ByVal p_MONTO_TOTAL As String,
                               ByVal p_tipo_cambio As String, ByVal p_PAGADO_IND As String, ByVal p_establecimiento As String, Optional ByVal p_adicional As String = "",
                               Optional ByVal p_caja_code As String = "", Optional ByVal p_ind As String = "BAN",
                               Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "",
                               Optional ByVal p_codigo_apertura As String = "") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_PAGO_CREDITO_BANCARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_detalle, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_APERTURA", p_codigo_apertura, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_ctlg, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA_CODE", p_moneda_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MEDIO_PAGO", p_medio_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_fecha_pago, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOCUMENTO", p_documento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND", p_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_cta_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", p_oficina, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANAL", p_canal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPLETO", p_ind_completo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ADICIONAL", p_adicional, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", p_MONTO_TOTAL, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_establecimiento, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd.Parameters("@p_MENSAJE").Value


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function ActualizarCredito(ByVal p_CODE As String, ByVal p_ctlg_code As String,
                                   ByVal p_SCSL_CODE As String, ByVal p_BCO_CODE As String,
                                   ByVal p_CUEN_CODE As String,
                                   ByVal p_CUENTA_PIDM As String, ByVal p_NCUOTAS As String,
                                   ByVal p_TIPO_LINEA As String, ByVal p_TEA As String,
                                   ByVal p_MONEDA As String, ByVal p_usua_id As String, ByVal p_monto As String,
                                    ByVal p_DETALLE As String, ByVal p_fecha_ing As String, ByVal p_nro_credito As String
                                    ) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_ACTUALIZAR_CREDITO_BANCARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BCO_CODE", p_BCO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUEN_CODE", p_CUEN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_LINEA", p_TIPO_LINEA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NCUOTAS", p_NCUOTAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEA", p_TEA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_PIDM", p_CUENTA_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_ING", p_fecha_ing, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CREDITO", p_nro_credito, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearCredito(ByVal p_ctlg_code As String,
                                   ByVal p_SCSL_CODE As String, ByVal p_BCO_CODE As String,
                                   ByVal p_CUEN_CODE As String,
                                   ByVal p_CUENTA_PIDM As String, ByVal p_NCUOTAS As String,
                                   ByVal p_TIPO_LINEA As String, ByVal p_TEA As String,
                                   ByVal p_MONEDA As String, ByVal p_usua_id As String, ByVal p_monto As String,
                                    ByVal p_DETALLE As String, ByVal p_fecha_ing As String, ByVal p_nro_credito As String
                                    ) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_CREDITO_BANCARIO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BCO_CODE", p_BCO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUEN_CODE", p_CUEN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_LINEA", p_TIPO_LINEA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NCUOTAS", p_NCUOTAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEA", p_TEA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_PIDM", p_CUENTA_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_ING", p_fecha_ing, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CREDITO", p_nro_credito, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CompletarCreditoBancario(ByVal p_CRBA_CODE As String, ByVal p_USUA_ID As String, ByVal p_DESTINO_IND As String, ByVal p_DESTINO As String, ByVal p_NDOCUMENTO As String
                                   ) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_COMPLETAR_CREDITO_BANCARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CRBA_CODE", p_CRBA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO_IND", p_DESTINO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_DESTINO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NDOCUMENTO", p_NDOCUMENTO, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ListarCreditoBancario(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CTA_CODE As String, ByVal p_PIDM_CTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_CREDITO_BANCARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CODE", p_CTA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_CTA", p_PIDM_CTA, ParameterDirection.Input, 253))

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


    Public Function ListarDetalleCreditoBancario(ByVal p_CODE As String, ByVal p_NRO_CUOTA As String, ByVal pagado_ind As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFB_LISTAR_CREDITO_BANCARIO_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUOTA", p_NRO_CUOTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", pagado_ind, ParameterDirection.Input, 253))



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

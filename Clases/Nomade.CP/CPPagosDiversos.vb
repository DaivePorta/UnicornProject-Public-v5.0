Public Class CPPagosDiversos
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub


    Public Function PagoDiversoCaja(ByVal p_detalle As String, ByVal p_caja_code As String,
                           ByVal p_usua_id As String, ByVal p_codigo_apertura As String,
                             ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                           ByVal p_moneda_code As String, ByVal p_medio_pago As String,
                           ByVal p_descripcion As String, ByVal p_destino As String, ByVal p_documento As String, ByVal p_tipo_cambio As String,
                           Optional ByVal p_ind As String = "CAJ", Optional ByVal p_pidm As String = "", Optional ByVal p_cta_code As String = "",
                            Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "", Optional ByVal p_ind_completo As String = "",
                             Optional ByVal p_adicional As String = "", Optional ByVal p_MONTO_TOTAL As String = "", Optional ByVal p_TIPO As String = "D") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_PAGO_DIVERSO", CommandType.StoredProcedure)

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
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", p_MONTO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_ACTUAL", String.Empty, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd.Parameters("@p_MENSAJE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function PagoDiversoBanco(ByVal p_detalle As String, ByVal p_pidm As String, ByVal p_cta_code As String,
                               ByVal p_usua_id As String, ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                               ByVal p_moneda_code As String, ByVal p_medio_pago As String, ByVal p_descripcion As String,
                               ByVal p_destino As String, ByVal p_documento As String, ByVal p_ind_completo As String, ByVal p_MONTO_TOTAL As String,
                               ByVal p_tipo_cambio As String, ByVal p_scsl_actual As String, Optional ByVal p_adicional As String = "",
                               Optional ByVal p_caja_code As String = "", Optional ByVal p_TIPO As String = "D", Optional ByVal p_ind As String = "BAN",
                               Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "",
                               Optional ByVal p_codigo_apertura As String = "") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_PAGO_DIVERSO", CommandType.StoredProcedure)

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
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_tipo_cambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_ACTUAL", p_scsl_actual, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd.Parameters("@p_MENSAJE").Value


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearGastoDiverso(
      ByVal p_FACGADI_MONE_CODE As String,
      ByVal p_FACGADI_MONTO As Decimal,
      ByVal p_FACGADI_MODULO_CODE As String,
      ByVal p_FACGADI_FECHA_TRANSACCION As String,
      ByVal p_FACGADI_FECHA_VENCIMIENTO As String,
      ByVal p_FACGADI_REF_CODE As String,
      ByVal p_FACGADI_MODALIDAD_PAGO As String,
      ByVal p_FACGADI_USUA_ID As String,
      ByVal p_FACGADI_FECHA_PAGO_PROG As String,
      ByVal p_PIDM As String,
      ByVal p_FECHA_EMISION As String,
      ByVal p_REF_DCTO_DESC As String,
      ByVal p_REF_DCTO_NRO As String,
      Optional ByVal p_TIPO_GASTO_COD As String = "",
      Optional ByVal p_ES_EMPLEADO As String = "N"
     ) As String
        Try
            Dim msg As String
            Dim cmd1, cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_CREAR_GASTO_DIVERSO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_FACGADI_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_FACGADI_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODULO_CODE", p_FACGADI_MODULO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANSACCION", p_FACGADI_FECHA_TRANSACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FACGADI_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REF_CODE", p_FACGADI_REF_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODALIDAD_PAGO", p_FACGADI_MODALIDAD_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_FACGADI_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO_PROG", p_FACGADI_FECHA_PAGO_PROG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REF_DCTO_DESC", p_REF_DCTO_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REF_DCTO_NRO", p_REF_DCTO_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_GASTO_COD", p_TIPO_GASTO_COD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ES_EMPLEADO", p_ES_EMPLEADO, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_CODE").Value


            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarGastoDiverso(
          ByVal p_FACGADI_CODE As String,
          ByVal p_FACGADI_MONE_CODE As String,
          ByVal p_FACGADI_MONTO As Decimal,
          ByVal p_FACGADI_MODULO_CODE As String,
          ByVal p_FACGADI_MONTO_PAGADO As String,
          ByVal p_FACGADI_FECHA_TRANSACCION As String,
          ByVal p_FACGADI_FECHA_VENCIMIENTO As String,
          ByVal p_FACGADI_REF_CODE As String,
          ByVal p_FACGADI_MODALIDAD_PAGO As String,
          ByVal p_FACGADI_USUA_ID As String,
          ByVal p_FACGADI_FECHA_PAGO_PROG As String,
          ByVal p_REF_DCTO_DESC As String,
          ByVal p_REF_DCTO_NRO As String,
          Optional ByVal p_FACGADI_ESTADO As String = "N",
          Optional ByVal p_FACGADI_ESTADO_IND As String = "A",
          Optional ByVal p_FACGADI_ANULADO_IND As String = "N",
          Optional ByVal p_FACGADI_ANUL_USUA_ID As String = "",
          Optional ByVal p_FACGADI_ANUL_FECHA As String = "",
          Optional ByVal p_FACGADI_ANUL_CMNT As String = "",
           Optional ByVal p_TIPO_GASTO_COD As String = "",
          Optional ByVal p_FACGADI_FECHA_PAGO_COMPLETO As String = Nothing
         ) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_ACTUALIZAR_GASTO_DIVERSO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_FACGADI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_FACGADI_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_FACGADI_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODULO_CODE", p_FACGADI_MODULO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_FACGADI_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_PAGADO", p_FACGADI_MONTO_PAGADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANSACCION", p_FACGADI_FECHA_TRANSACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FACGADI_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REF_CODE", p_FACGADI_REF_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODALIDAD_PAGO", p_FACGADI_MODALIDAD_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_FACGADI_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_FACGADI_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO_PROG", p_FACGADI_FECHA_PAGO_PROG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANUL_USUA_ID", p_FACGADI_ANUL_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANUL_FECHA", p_FACGADI_ANUL_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANUL_CMNT", p_FACGADI_ANUL_CMNT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO_COMPLETO", p_FACGADI_FECHA_PAGO_COMPLETO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REF_DCTO_DESC", p_REF_DCTO_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REF_DCTO_NRO", p_REF_DCTO_NRO, ParameterDirection.Input, 253))
            cn.Ejecuta_parms(cmd)
            msg = "OK"


            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarGastoDiverso(ByVal p_CODE As String, ByVal p_MONE_CODE As String, ByVal p_MODULO_CODE As String,
                                       ByVal p_MODALIDAD_PAGO As String, ByVal p_ESTADO As String, Optional ByVal p_FIL As String = "1") As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_LISTAR_GASTO_DIVERSO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODULO_CODE", p_MODULO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODALIDAD_PAGO", p_MODALIDAD_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILTRO", p_FIL, ParameterDirection.Input, 253))
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

    'REPORTES

    Public Function ListarCuentasDiversasPorPagar(ByVal p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            'p_FILTRO=P
            cmd = cn.GetNewCommand("PFA_REPORTE_CUENTAS_DIVERSAS_POR_PAGAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILTRO", "P", ParameterDirection.Input, 253))
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

    'CPLRGAT
    Public Function ListarCuentasDiversasAtrasadasPorPagar(ByVal p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            'p_FILTRO=V
            cmd = cn.GetNewCommand("PFA_REPORTE_CUENTAS_DIVERSAS_POR_PAGAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILTRO", "V", ParameterDirection.Input, 253))
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

    'CPLRGCA
    Public Function ListarCuentasDiversasFechas(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_CUENTAS_DIVERSAS_FECHAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
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

    Public Function ListarAmortizacionesCuentasDiversas(ByVal p_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_AMORTIZACIONES_CUENTAS_DIVERSAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
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

    Public Function ListarCuentasDiversasPorPersona(ByVal p_CTLG_CODE As String, ByVal p_PIDM As String, ByVal p_DESDE As String,
                                                  ByVal p_HASTA As String, ByVal p_PAGADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_CUENTAS_DIVERSAS_POR_PERSONA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
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

    Public Function ListarCuentasDiversasPorPersonaHistorico(ByVal p_CTLG_CODE As String, ByVal p_PIDM As String, ByVal p_DESDE As String,
                                                    ByVal p_HASTA As String, ByVal p_PAGADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_CUENTAS_DIVERSAS_POR_PERSONA_HISTORICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))

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

    Public Function ListarDeudasActualesDiversas(ByVal p_CTLG_CODE As String, ByVal p_PAGADO_IND As String, ByVal p_ESTADO_IND As String, ByVal p_PIDM As String, Optional p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_DEUDAS_ACTUALES_DIVERSAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
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

    Public Function ListarDeudasActualesDiversas2(ByVal p_CTLG_CODE As String, ByVal p_PAGADO_IND As String, ByVal p_ESTADO_IND As String, ByVal p_PIDM As String, Optional p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_DEUDAS_ACTUALES_DIVERSAS_2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
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

    'Procedimiento para listar deudas por pagar diversas en calendar
    Public Function ListarDeudasPagarDiversas(ByVal p_CTLG_CODE As String, ByVal p_PAGADO_IND As String, ByVal p_ESTADO_IND As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_DEUDAS_PAGAR_DIVERSAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
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

    Public Function PagoAfp(ByVal p_detalle As String, ByVal p_caja_code As String,
                          ByVal p_usua_id As String, ByVal p_codigo_apertura As String,
                            ByVal p_ctlg As String, ByVal p_fecha_pago As String,
                          ByVal p_moneda_code As String, ByVal p_medio_pago As String,
                          ByVal p_descripcion As String, ByVal p_destino As String, ByVal p_documento As String,
                          Optional ByVal p_ind As String = "CAJ", Optional ByVal p_pidm As String = "", Optional ByVal p_cta_code As String = "",
                           Optional ByVal p_oficina As String = "", Optional ByVal p_canal As String = "", Optional ByVal p_ind_completo As String = "",
                            Optional ByVal p_adicional As String = "", Optional ByVal p_MONTO_TOTAL As String = "") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_PAGO_PLANILLA_AFP", CommandType.StoredProcedure)

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
            cmd.Parameters.Add(cn.GetNewParameter("@p_MENSAJE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd.Parameters("@p_MENSAJE").Value


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Procedimiento para listar deudas Afps/Planilla pagadas
    Public Function ListarAfpPagadas(ByVal p_CTLG_CODE As String, ByVal p_PIDM As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_PAGOS_AFP", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AFP", p_PIDM, ParameterDirection.Input, 253))
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

    'Procedimiento para listar Pagos Diversos pagadas
    Public Function ListarPagosDiversos(ByVal p_CTLG_CODE As String, ByVal p_PIDM As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_PAGOS_DIVERSOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
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

    'Procedimiento para listar deudas Afps/Planilla por pagar
    Public Function ListarDeudasPagarAfpPlanilla(ByVal p_CTLG_CODE As String, ByVal p_PAGADO_IND As String, ByVal p_Tipo As String, ByVal p_PIDM As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_DEUDAS_PAGAR_AFP", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_PLANILLA", p_Tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
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

    'Procedimiento para registrar postergacion de PAGO
    Public Function CrearActualizacionPago(ByVal p_DCTO_TIPO As String, ByVal p_DCTO_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_FECHA_ANTERIOR As String, ByVal p_FECHA_COBRANZA As String, ByVal p_TIPO_DCTO_IND As String, ByVal p_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_CREAR_ACTUALIZACION_PROGRAMACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_TIPO", p_DCTO_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_ANTERIOR", p_FECHA_ANTERIOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_COBRANZA", p_FECHA_COBRANZA, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_CLIE_IND", "P", ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO_IND", p_TIPO_DCTO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Procedimiento para listar Gasto de movilidad
    Public Function fnListarGastoMovilidad(ByVal P_FECHA_INICIO As String, ByVal P_FECHA_FIN As String, ByVal P_FPRGAST_PIDM_BENEFICIARIO As String,
                                           ByVal P_FPRGAST_CTLG_CODE As String, ByVal P_FPRGAST_SCSL_CODE As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SP_LISTAR_GASTO_MOVILIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_INICIO", P_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_FIN", P_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGAST_PIDM_BENEFICIARIO", P_FPRGAST_PIDM_BENEFICIARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGAST_CTLG_CODE", P_FPRGAST_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGAST_SCSL_CODE", P_FPRGAST_SCSL_CODE, ParameterDirection.Input, 253))

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
    'Registra Planilla de Movilidad
    Public Function fnRegistrarPlanillaMovilidad(ByVal P_FPRGASTMOV_EMPRESA As String, ByVal P_FPRGASTMOV_SUCURSAL As String, ByVal P_FPRGASTMOV_COD_TRABAJADOR As String, ByVal P_FPRGASTMOV_PERIODO As String,
                                           ByVal P_FPRGASTMOV_GLOSA As String, ByVal P_FPRGASTMOV_USUA_REGISTRO As String, ByVal P_FPRGASTMOV_MONTO_TOTAL As Decimal,
                                                 ByVal P_FECHA_INICIO As String, ByVal P_FECHA_FIN As String) As String
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_REGISTRAR_PLANILLA_MOVILIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_EMPRESA", P_FPRGASTMOV_EMPRESA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_SUCURSAL", P_FPRGASTMOV_SUCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_COD_TRABAJADOR", P_FPRGASTMOV_COD_TRABAJADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_PERIODO", P_FPRGASTMOV_PERIODO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_GLOSA", P_FPRGASTMOV_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_USUA_REGISTRO", P_FPRGASTMOV_USUA_REGISTRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_MONTO_TOTAL", P_FPRGASTMOV_MONTO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_INICIO", P_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_FIN", P_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODE_GENERADO").Value
            Return msg(0)

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    'Lista Planilla de Moilidad
    Public Function fnListarPlanillaMovilidad(ByVal P_FPRGASTMOV_EMPRESA As String, ByVal P_FPRGASTMOV_SUCURSAL As String, ByVal P_FPRGASTMOV_COD_TRABAJADOR As String, ByVal P_FPRGASTMOV_PERIODO As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SP_LISTAR_PLANILLA_MOVILIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_EMPRESA", P_FPRGASTMOV_EMPRESA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_SUCURSAL", P_FPRGASTMOV_SUCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_COD_TRABAJADOR", P_FPRGASTMOV_COD_TRABAJADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_PERIODO", P_FPRGASTMOV_PERIODO, ParameterDirection.Input, 253))

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
    ' IMPRIMIR PLANILLA MOVILIDAD
    Public Function fnImprimirPlanillaMovilidad(ByVal P_FPRGASTMOV_EMPRESA As String, ByVal P_FPRGASTMOV_SUCURSAL As String, ByVal P_FPRGASTMOV_COD_TRABAJADOR As String, ByVal P_FPRGASTMOV_PERIODO As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SP_IMPRIMIR_PLANILLA_MOVILIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_EMPRESA", P_FPRGASTMOV_EMPRESA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_SUCURSAL", P_FPRGASTMOV_SUCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_COD_TRABAJADOR", P_FPRGASTMOV_COD_TRABAJADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FPRGASTMOV_PERIODO", P_FPRGASTMOV_PERIODO, ParameterDirection.Input, 253))

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

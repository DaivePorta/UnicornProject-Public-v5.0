Public Class CAMovimientos
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function CrearMovimientoCaja(ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String, ByVal p_ORIGEN_DESTINO As String, ByVal p_TMCA_CODE As String,
                                        ByVal p_CONC_CODE As String, ByVal p_DESC As String, ByVal p_DCTO_CODE As String, ByVal p_NRO_DOC As String,
                                        ByVal p_DCTO_CODE_REF As String, ByVal p_PAGO_IND As String, ByVal p_MONTO_DCTO_SOLES As String,
                                        ByVal p_MONTO_DCTO_DOLARES As String, ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String,
                                        ByVal p_TTAR_CODE As String, ByVal p_FECHA_VENCIM As String, ByVal p_FECHA_PAGO As String,
                                        ByVal p_COD_REF As String, ByVal p_COMPLETO_IND As String, ByVal p_USUA_ID As String, ByVal p_IND_INGR_EGRE As String, Optional ByVal p_COD_MBANC As String = "") As Array

        Dim msg(3) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_MOVIM_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_DESTINO", p_ORIGEN_DESTINO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TMCA_CODE", p_TMCA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONC_CODE", p_CONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DOC", p_NRO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGO_IND", p_PAGO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_DCTO_SOLES", p_MONTO_DCTO_SOLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_DCTO_DOLARES", p_MONTO_DCTO_DOLARES, ParameterDirection.Input, 253))
            If p_MOPA_CODE = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            End If

            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            If p_TTAR_CODE = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_TTAR_CODE", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_TTAR_CODE", p_TTAR_CODE, ParameterDirection.Input, 253))
            End If
            If p_FECHA_VENCIM = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIM", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIM", p_FECHA_VENCIM, ParameterDirection.Input, 253))
            End If


            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_FECHA_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_REF", p_COD_REF, ParameterDirection.Input, 253)) 'USUARIO RECEPCION
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253)) 'USUARIO RECEPCION
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253)) 'USUARIO RECEPCION
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_INGR_EGRE", p_IND_INGR_EGRE, ParameterDirection.Input, 253)) 'USUARIO RECEPCION
            cmd.Parameters.Add(cn.GetNewParameter("@p_SECUENCIA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_MBANC", IIf(p_COD_MBANC = "", DBNull.Value, p_COD_MBANC), ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = cmd.Parameters("@p_SECUENCIA").Value

            Return msg

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = ""
            Return msg
        End Try

    End Function

    Public Function ListarMovimientosCaja(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String,
                                          ByVal p_CERRADO_IND As String, ByVal p_USUA_ID As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFS_LISTAR_MOVIMIENTOS_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253)) 'FBAMCAJ_CODE
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CERRADO_IND", p_CERRADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

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

    Public Function ListarMovimientosCajaFechas(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String,
                                         ByVal p_CERRADO_IND As String, ByVal p_USUA_ID As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable
            cmd = cn.GetNewCommand("PFS_LISTAR_MOVIMIENTOS_CAJA_FECHAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CERRADO_IND", p_CERRADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
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

    Public Function ListarMovimientosPorCobrar(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_LISTAR_MOVIMIENTOS_POR_COBRAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
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

    Public Function ListarMovimientosPorCobrarCuen(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CUEN_CODE As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_LISTAR_MOVIMIENTOS_POR_COBRAR_CUEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUEN_CODE", p_CUEN_CODE, ParameterDirection.Input, 253))
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


    Public Function ListarMovimientosPorCobrarMoie(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String,
                                                   ByVal p_BENEFICIARIO_PIDM As String, ByVal p_ASIGNADO_PIDM As String, ByVal p_MONE_CODE As String,
                                                   ByVal p_ESTADOS As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_LISTAR_MOVIMIENTOS_POR_COBRAR_MOIE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BENEFICIARIO_PIDM", p_BENEFICIARIO_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ASIGNADO_PIDM", p_ASIGNADO_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADOS", p_ESTADOS, ParameterDirection.Input, 253))
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

    Public Function ActualizarMovimientoPorCobrarMoie(ByVal p_CODE As String, ByVal p_ESTADO As String, p_MOV_CAJA_CODE As String) As Array
        Dim msg(1) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_ACTUALIZAR_MOVIMIENTO_POR_COBRAR_MOIE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MOV_CAJA_CODE", p_MOV_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_RESPUESTA").Value

            Return msg
        Catch ex As Exception
            msg(0) = ex.Message
            Return msg
        End Try

    End Function

    Public Function ListarDetalleMovimientosCaja(ByVal p_CODE As String, ByVal p_CODE_MOVI As String, ByVal p_DCTO_CODE_REF As String, ByVal p_TIPO As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_LISTAR_DETALLE_MOVIM_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_MOVI", p_CODE_MOVI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))

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

    Public Function ListarVentasContado(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_LISTAR_VENTAS_CONTADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

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

    Public Function ListarCobroVentasCredito(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_LISTAR_COBRO_VENTAS_CREDITO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

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

    Public Function ListarPagoGastosPorBanco(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_LISTAR_PAGO_GASTOS_XBANCO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

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

    Public Function ListarVentasArea(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_LISTAR_VENTAS_AREA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

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

    Public Function ListarVentasSubArea(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_LISTAR_VENTAS_SUB_AREA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

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

    Public Function ListarInconsistencias(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_LISTAR_INCOSISTENCIAS_RM", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

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

    Public Function ResumenDetallesMovimientosCaja(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_RESUMEN_DETALLE_MOVIM_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))

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

    Public Function abrir_caja(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String, _
                              ByVal p_EFECTIVO_SOLES As String, ByVal p_EFECTIVO_DOLARES As String, ByVal p_USUA_ID As String, _
                              ByVal p_INCONSISTENCIA As String, ByVal p_TIPO_SOLES_IND As String, ByVal p_MONTO_SOLES As String, _
                              ByVal p_TIPO_DOLARES_IND As String, ByVal p_MONTO_DOLARES As String, ByVal p_MOTIVO As String) As String
        Try
            Dim cmd As IDbCommand
            Dim msg As String

            cmd = cn.GetNewCommand("PFB_APERTURAR_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_EFECTIVO_SOLES", p_EFECTIVO_SOLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_EFECTIVO_DOLARES", p_EFECTIVO_DOLARES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_INCONSISTENCIA", p_INCONSISTENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_SOLES_IND", p_TIPO_SOLES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONTO_SOLES", p_MONTO_SOLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_DOLARES_IND", p_TIPO_DOLARES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONTO_DOLARES", p_MONTO_DOLARES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function cerrar_caja(ByVal p_CODIGO As String, ByVal p_EFECTIVO_SOLES As String, ByVal p_EFECTIVO_DOLARES As String, _
                             ByVal p_INCONSISTENCIA As String, ByVal p_TIPO_SOLES_IND As String, ByVal p_MONTO_SOLES As String, _
                             ByVal p_TIPO_DOLARES_IND As String, ByVal p_MONTO_DOLARES As String, ByVal p_MOTIVO As String, _
                             ByVal p_USUA_ID As String) As String
        Try
            Dim cmd As IDbCommand
            Dim msg As String

            cmd = cn.GetNewCommand("PFB_CERRAR_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_EFECTIVO_SOLES", p_EFECTIVO_SOLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_EFECTIVO_DOLARES", p_EFECTIVO_DOLARES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_INCONSISTENCIA", p_INCONSISTENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_SOLES_IND", p_TIPO_SOLES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONTO_SOLES", p_MONTO_SOLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_DOLARES_IND", p_TIPO_DOLARES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONTO_DOLARES", p_MONTO_DOLARES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'TRANSFERENCIAS CAJA
    Public Function CrearTransferenciaCaja(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String,
                                       ByVal p_MONTO_MOBA As String, ByVal p_MONTO_MOAL As String,
                                       ByVal p_TIPO_DESTINO_MOBA As String, ByVal p_TIPO_DESTINO_MOAL As String,
                                       ByVal p_DESTINO_MOBA As String, ByVal p_DESTINO_MOAL As String, ByVal p_USUA_ID As String,
                                       ByVal p_MOBA_IND As String, ByVal p_MOAL_IND As String) As Array
        Dim msg(3) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_TRANSFERENCIA_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONTO_MOBA", p_MONTO_MOBA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONTO_MOAL", p_MONTO_MOAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_DESTINO_MOBA", p_TIPO_DESTINO_MOBA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_DESTINO_MOAL", p_TIPO_DESTINO_MOAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_DESTINO_MOBA", p_DESTINO_MOBA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_DESTINO_MOAL", p_DESTINO_MOAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MOBA_IND", p_MOBA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MOAL_IND", p_MOAL_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESULTADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_RESULTADO").Value
            msg(1) = cmd.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = ""
            Return msg
        End Try

    End Function

    Public Function ListarTransferenciaCaja(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String,
                                      ByVal p_PIDM As String, ByVal p_PIDM_RECEPCION As String,
                                      ByVal p_TIPO_DESTINO_MOBA As String, ByVal p_TIPO_DESTINO_MOAL As String,
                                      ByVal p_CODE_DESTINO_MOBA As String, ByVal p_CODE_DESTINO_MOAL As String,
                                      ByVal p_APROBADO_IND As String, ByVal p_ESTADO_IND As String,
                                      ByVal p_USUA_ID As String, ByVal p_USUA_ID_RECEPCION As String) As DataTable

        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable
            cmd = cn.GetNewCommand("PFB_LISTAR_TRANSFERENCIA_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_PIDM_RECEPCION", p_PIDM_RECEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_DESTINO_MOBA", p_TIPO_DESTINO_MOBA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_DESTINO_MOAL", p_TIPO_DESTINO_MOAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CODE_DESTINO_MOBA", p_CODE_DESTINO_MOBA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CODE_DESTINO_MOAL", p_CODE_DESTINO_MOAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_APROBADO_IND", p_APROBADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_USUA_ID_RECEPCION", p_USUA_ID_RECEPCION, ParameterDirection.Input, 253))
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

    Public Function DiferirEfectivoCaja(ByVal p_TRANSFERENCIA_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_CTLG_PIDM As String, ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String,
                                        ByVal p_MONTO_MOBA As String, ByVal p_MONTO_MOAL As String,
                                        ByVal p_TIPO_DESTINO_MOBA As String, ByVal p_TIPO_DESTINO_MOAL As String,
                                        ByVal p_DESTINO_MOBA As String, ByVal p_DESTINO_MOAL As String, ByVal p_USUA_ID As String, ByVal p_USUA_ID_RECEPCION As String,
                                        ByVal p_MOBA_IND As String, ByVal p_MOAL_IND As String,
                                        Optional p_NRO_OPERACION As String = "") As Array
        Dim msg(3) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_DIFERIR_EFECTIVO_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_TRANSFERENCIA_CODE", p_TRANSFERENCIA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CTLG_PIDM", p_CTLG_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONTO_MOBA", p_MONTO_MOBA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONTO_MOAL", p_MONTO_MOAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_DESTINO_MOBA", p_TIPO_DESTINO_MOBA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_DESTINO_MOAL", p_TIPO_DESTINO_MOAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_DESTINO_MOBA", p_DESTINO_MOBA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_DESTINO_MOAL", p_DESTINO_MOAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253)) 'USUARIO RECEPCION
            cmd.Parameters.Add(cn.GetNewParameter("p_USUA_ID_RECEPCION", p_USUA_ID_RECEPCION, ParameterDirection.Input, 253)) 'USUARIO RECEPCION
            cmd.Parameters.Add(cn.GetNewParameter("p_MOBA_IND", p_MOBA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MOAL_IND", p_MOAL_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_NRO_OPERACION", p_NRO_OPERACION, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_RESULTADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVI_CODE1", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVI_CODE2", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_RESULTADO").Value
            msg(1) = cmd.Parameters("@p_MOVI_CODE1").Value
            msg(2) = cmd.Parameters("@p_MOVI_CODE2").Value

            Return msg

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = ""
            msg(2) = ""

            Return msg
        End Try

    End Function

    Public Function RechazarTransferenciaCaja(ByVal p_TRANSFERENCIA_CODE As String, ByVal p_USUA_ID_RECEPCION As String) As Array
        Dim msg(1) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_RECHAZAR_TRANSFERENCIA_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_TRANSFERENCIA_CODE", p_TRANSFERENCIA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_USUA_ID_RECEPCION", p_USUA_ID_RECEPCION, ParameterDirection.Input, 253)) 'USUARIO RECEPCION
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESULTADO", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_RESULTADO").Value
            Return msg

        Catch ex As Exception
            msg(0) = ex.Message
            Return msg
        End Try

    End Function

    Function ListarMontoTransferenciaCaja(p_CTLG_CODE As String, p_SCSL_CODE As String, p_CAJA_CODE As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable
            cmd = cn.GetNewCommand("PFB_LISTAR_MONTO_TRANSFERENCIA_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
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

    Function ResumenPosicionGlobal(ByVal p_CTLG_CODE As String, ByVal p_MONE_CODE As String, ByVal p_TIPO As String, ByVal p_SUBTIPO As String, ByVal p_FILTRO1 As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable
            cmd = cn.GetNewCommand("REP_RESUMEN_POSICION_GLOBAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_SUBTIPO", p_SUBTIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_FILTRO1", p_FILTRO1, ParameterDirection.Input, 253))
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

Public Class CPCuentaPorPagar
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarCuentasPorPagar(ByVal p_CTLG_CODE As String, Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            'p_FILTRO=P
            cmd = cn.GetNewCommand("PFA_LISTAR_MOROSOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILTRO", "P", ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            'Se agregó el pidm
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", "", ParameterDirection.Input, 253))
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

    Public Function ListarCuentasPorPagarPorProveedor(ByVal p_CTLG_CODE As String, ByVal p_PROV_PIDM As String, ByVal p_DESDE As String,
                                                      ByVal p_HASTA As String, ByVal p_PAGADO_IND As String, Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_CUENTAS_PAGAR_POR_PROVEEDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_PIDM", p_PROV_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
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
    Public Function ListarCuentasPorPagarPorProveedorHistorico(ByVal p_CTLG_CODE As String, ByVal p_PROV_PIDM As String, ByVal p_DESDE As String,
                                                     ByVal p_HASTA As String, ByVal p_PAGADO_IND As String, Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_CUENTAS_PAGAR_POR_PROVEEDOR_HISTORICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_PIDM", p_PROV_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
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

    Public Function ListarDeudasAtrasadasPorPagar(ByVal p_CTLG_CODE As String, Optional ByVal p_SCSL_CODE As String = "", Optional ByVal p_PIDM As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            'p_FILTRO =V
            cmd = cn.GetNewCommand("PFA_LISTAR_MOROSOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FILTRO", "V", ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
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


    Public Function ListarCreditoProveedor(ByVal p_PIDM As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_ESTADO_IND As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_CREDITO_PROVEEDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
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


    Public Function ListarCreditoProveedorFechas(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_CREDITO_PROVEEDOR_FECHAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
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

    Public Function ListarParaBalanceContable(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_REALIZACION As String, ByVal p_ACREEDOR_DEUDOR As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_PARA_BALANCE_CONTABLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REALIZACION", p_REALIZACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACREEDOR_DEUDOR", p_ACREEDOR_DEUDOR, ParameterDirection.Input, 253))
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

    Public Function ListarCuentasAsientosBalanceContable(ByVal p_CODE_MNEMO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_REALIZACION As String, ByVal p_ACREEDOR_DEUDOR As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_CUENTAS_ASIENTOS_BALANCE_CONT", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_MNEMO", p_CODE_MNEMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REALIZACION", p_REALIZACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACREEDOR_DEUDOR", p_ACREEDOR_DEUDOR, ParameterDirection.Input, 253))
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

    Public Function ListarAsientosMnemo(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_ASIENTOS_MNEMO", CommandType.StoredProcedure)
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

    Public Function ListarCuentasAsientosMnemo(ByVal p_CODE_MNEMO As String, ByVal p_CTLG As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_CUENTAS_DETA_ASIENTOS_MNEMO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_MNEMO", p_CODE_MNEMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
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

    Public Function ListarAmortizacionesProveedor(ByVal p_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_AMORTIZACIONES_PROV_CLIE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_CLIE_IND", "P", ParameterDirection.Input, 253))
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

    Public Function ListarDeudasConProveedor(ByVal p_CTLG_CODE As String, ByVal p_PAGADO_IND As String, ByVal p_ESTADO_IND As String, ByVal p_PIDM As String,
                                             Optional ByVal p_STBL As String = "", Optional ByVal p_DESDE As String = "", Optional ByVal p_HASTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_DEUDAS_CON_PROVEEDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STBL", p_STBL, ParameterDirection.Input, 253))

            If p_DESDE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            End If

            If p_DESDE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            End If


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

    Public Function ListarDeudasConProveedorGatos(ByVal p_CTLG_CODE As String, ByVal p_PAGADO_IND As String, ByVal p_ESTADO_IND As String, ByVal p_PIDM As String,
                                             Optional ByVal p_STBL As String = "", Optional ByVal p_DESDE As String = "", Optional ByVal p_HASTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_DEUDAS_GASTOS_CON_PROVEEDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGADO_IND", p_PAGADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STBL", p_STBL, ParameterDirection.Input, 253))

            If p_DESDE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            End If

            If p_DESDE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            End If


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

    'Procedimiento para listar deudas por pagar en calendar
    Public Function ListarDeudasPagarProveedor(ByVal p_CTLG_CODE As String, ByVal p_PAGADO_IND As String, ByVal p_ESTADO_IND As String, ByVal p_PIDM As String, Optional ByVal p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_DEUDAS_PAGAR_PROVEEDOR", CommandType.StoredProcedure)
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

    'Procedimiento para registrar postergacion de cobranza
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

    Public Function ListarDatosResumenCompras(ByVal p_PIDM As String, ByVal p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFT_LISTAR_DATOS_RESUMEN_COMPRAS_PROV", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
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

    Public Function BuscarDocumentoProvisionExiste(ByVal p_PIDM As String, ByVal p_TIPO_DCTO As String, ByVal p_SERIE As String, ByVal p_NUMERO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_BUSCAR_DOCUMENTOS_GASTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_NUMERO, ParameterDirection.Input, 253))
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

    Public Function Crear_Provision_Gasto(ByVal p_CONC_CODE As String, ByVal p_CTLG_CODE As String,
                                          ByVal p_DATO_FRECUENCIA As Integer, ByVal p_DESC_GASTO As String,
                                          ByVal p_ESTADO_IND As String, ByVal p_FECHA_UNICA As String,
                                          ByVal p_FRECUENCIA As String,
                                          ByVal p_MONTO As Decimal, ByVal p_PERIOCIDAD As String,
                                          ByVal p_PIDM_BENEFICIARIO As Integer, ByVal p_SCONC_CODE As String,
                                          ByVal p_SCSL_CODE As String, ByVal p_TIPO_IND As String,
                                          ByVal p_USUA_ID As String, ByVal p_NRO_DCTO_REF As String,
                                          ByVal p_CTA_CONTABLE As String,
                                          ByVal p_MONE_CODE As String,
                                          ByVal p_CENTRO_COSTO As String,
                                          ByVal p_CENTRO_COSTO_CABECERA As String,
                                          ByVal p_TIPO_DCTO As String,
                                          ByVal p_SERIE As String,
                                          ByVal p_NUMERO As String,
                                          ByVal p_COMPRAS_IND As String,
                                          ByVal p_MES_TRIB As String,
                                          ByVal p_ANIO_TRIB As String,
                                          ByVal p_HABIDO_IND As String,
                                          ByVal p_TIPO_BIEN As String,
                                          ByVal p_DETALLE_GASTO As String, ByVal p_DEDUCIBLE_IND As String, ByVal p_DECLARA As String, ByVal p_FECHA_VENCI As String,
                                          ByVal p_DETRACCION_IND As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_PAGAR As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFS_CREAR_PROVISION_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONC_CODE", p_CONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DATO_FRECUENCIA", p_DATO_FRECUENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_GASTO", p_DESC_GASTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_UNICA", p_FECHA_UNICA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FRECUENCIA", p_FRECUENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIOCIDAD", p_PERIOCIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_BENEFICIARIO", p_PIDM_BENEFICIARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCONC_CODE", p_SCONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DCTO_REF", p_NRO_DCTO_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CONTABLE", p_CTA_CONTABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CENTRO_COSTO", p_CENTRO_COSTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CENTRO_COSTO_CABECERA", p_CENTRO_COSTO_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPRAS_IND", p_COMPRAS_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES_TRIB", p_MES_TRIB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO_TRIB", p_ANIO_TRIB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HABIDO_IND", p_HABIDO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_BIEN", p_TIPO_BIEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE_GASTO", p_DETALLE_GASTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEDUCIBLE_IND", p_DEDUCIBLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DECLARA", p_DECLARA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCI", p_FECHA_VENCI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PAGAR", p_IMPORTE_PAGAR, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarGasto(p_CTLG_CODE As String, p_SCSL_CODE As String, p_CODIGO As String, p_FECHA_INI_EMI As String,
                                  p_FECHA_FIN_EMI As String, p_ESTADO As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", IIf(p_CODIGO.Equals(""), Nothing, p_CODIGO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI_EMI", p_FECHA_INI_EMI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN_EMI", p_FECHA_FIN_EMI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function fnAnularGasto(ByVal p_GASTO_CODE As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_ANULAR_GASTO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_GASTO_CODE", p_GASTO_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RPTA", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RPTA").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Provision_gasto(ByVal p_ESTADO As String,
                                           Optional TIPO As String = "1",
                                           Optional p_CTLG_CODE As String = Nothing,
                                           Optional p_SCSL_CODE As String = Nothing,
                                           Optional p_GASTO_CODE As String = Nothing,
                                           Optional p_SGASTO_CODE As String = Nothing,
                                           Optional p_CODIGO As String = Nothing,
                                           Optional p_ESTADO_PAGADO As String = Nothing,
                                           Optional p_FECHA_INI As String = Nothing,
                                           Optional p_FECHA_FIN As String = Nothing,
                                           Optional p_IND_COMPRAS As String = Nothing,
                                           Optional p_PERIODO_MES As String = Nothing,
                                           Optional p_PERIODO_ANIO As String = Nothing,
                                           Optional p_PERIODO As String = Nothing,
                                           Optional p_FECHA_INI_EMI As String = Nothing,
                                           Optional p_FECHA_FIN_EMI As String = Nothing,
                                           Optional p_CENTRO_COSTOS As String = Nothing) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_PROVISION_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@TIPO", TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GASTO_CODE", p_GASTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SGASTO_CODE", p_SGASTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_PAGADO", p_ESTADO_PAGADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI", IIf(p_FECHA_INI = "", Nothing, Convert.ToDateTime(p_FECHA_INI).ToString("yyyy/MM/dd")), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", IIf(p_FECHA_FIN = "", Nothing, Convert.ToDateTime(p_FECHA_FIN).ToString("yyyy/MM/dd")), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPRAS", p_IND_COMPRAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO_MES", p_PERIODO_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO_ANIO", p_PERIODO_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO", p_PERIODO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI_EMI", IIf(p_FECHA_INI_EMI = "", Nothing, Convert.ToDateTime(p_FECHA_INI_EMI).ToString("yyyy/MM/dd")), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN_EMI", IIf(p_FECHA_FIN_EMI = "", Nothing, Convert.ToDateTime(p_FECHA_FIN_EMI).ToString("yyyy/MM/dd")), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CENTRO_COSTOS", p_CENTRO_COSTOS, ParameterDirection.Input, 253))

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

    Public Function Listar_Asiento_ContUnico(Optional CTLG As String = Nothing, Optional p_CODIGO As String = Nothing) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_MOVIMIENTO_CONT_UNICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))

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

    Public Function Listar_Detalle_Asiento_ContUnico(p_CODIGO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_DETALLE_ASIENTO_CONT_UNICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
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

    Public Function Listar_Detalle_Provision_gasto(p_GASTO_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_DETALLE_PROVISION_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GASTO_CODE", p_GASTO_CODE, ParameterDirection.Input, 253))
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


    Public Function fnLISTAR_GASTO_NO_PROG(p_CTLG_CODE As String,
                                           p_SCSL_CODE As String,
                                           Optional p_FECHA_INI_EMI As String = Nothing,
                                           Optional p_FECHA_FIN_EMI As String = Nothing,
                                           Optional p_IND_COMPRAS As String = Nothing,
                                           Optional p_PERIODO_ANIO As String = Nothing,
                                           Optional p_PERIODO_MES As String = Nothing,
                                           Optional p_CONCEPTO_CODE As String = Nothing,
                                           Optional p_SUBCONCEPTO_CODE As String = Nothing,
                                           Optional p_ESTADO_GASTO As String = Nothing,
                                           Optional p_FECHA_INI_REG As String = Nothing,
                                           Optional p_FECHA_FIN_REG As String = Nothing,
                                           Optional p_CCOSTO_DET_CODE As String = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_GASTO_NO_PROG", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI_EMI", p_FECHA_INI_EMI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN_EMI", p_FECHA_FIN_EMI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPRAS", p_IND_COMPRAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO_ANIO", p_PERIODO_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO_MES", p_PERIODO_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONCEPTO_CODE", p_CONCEPTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBCONCEPTO_CODE", p_SUBCONCEPTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_GASTO", p_ESTADO_GASTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI_REG", p_FECHA_INI_REG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN_REG", p_FECHA_FIN_REG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CCOSTO_DET_CODE", p_CCOSTO_DET_CODE, ParameterDirection.Input, 253))

            Dim oDT As New DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnLISTAR_GASTO_PROG(p_CTLG_CODE As String,
                                           p_SCSL_CODE As String,
                                           Optional p_FECHA_INI_EMI As String = Nothing,
                                           Optional p_FECHA_FIN_EMI As String = Nothing,
                                           Optional p_IND_COMPRAS As String = Nothing,
                                           Optional p_CONCEPTO_CODE As String = Nothing,
                                           Optional p_SUBCONCEPTO_CODE As String = Nothing,
                                           Optional p_ESTADO_GASTO As String = Nothing,
                                           Optional p_FECHA_INI_REG As String = Nothing,
                                           Optional p_FECHA_FIN_REG As String = Nothing,
                                           Optional p_CCOSTO_DET_CODE As String = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_GASTO_PROG", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI_EMI", p_FECHA_INI_EMI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN_EMI", p_FECHA_FIN_EMI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPRAS", p_IND_COMPRAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONCEPTO_CODE", p_CONCEPTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBCONCEPTO_CODE", p_SUBCONCEPTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_GASTO", p_ESTADO_GASTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI_REG", p_FECHA_INI_REG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN_REG", p_FECHA_FIN_REG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CCOSTO_DET_CODE", p_CCOSTO_DET_CODE, ParameterDirection.Input, 253))

            Dim oDT As New DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_Aprobacion_Gasto(ByVal p_CODE_REF_GASTO As String, ByVal p_ESTADO As String,
                                         ByVal p_MONTO As Decimal, ByVal p_FECHA_APROBACION As String, ByVal p_FECHA_OPERACION As String,
                                         ByVal p_USUA_ID As String,
                                         ByVal p_GLOSA As String,
                                         ByVal p_FECHA_VENCIMIENTO As String,
                                         ByVal p_NRO_DCTO_REF As String,
                                         ByVal p_SERIE As String,
                                         ByVal p_DCTO_CODE As String,
                                         ByVal p_CENTRO_COSTO_CODE As String,
                                         ByVal p_CENTRO_COSTO_CABECERA As String,
                                         ByVal p_IND_COMPRAS As String,
                                         p_MES_TRIB As String, p_ANIO_TRIB As String,
                                         ByVal p_HABIDO_IND As String,
                                         ByVal p_TIPO_BIEN As String,
                                         ByVal p_DETRACCION_IND As String,
                                         ByVal p_IMPORTE_DETRACCION As String,
                                         ByVal p_IMPORTE_PAGAR As String,
                                         Optional p_CONC_CODE As String = Nothing,
                                         Optional p_SCONC_CODE As String = Nothing,
                                         Optional p_CTA_CONTABLE As String = Nothing,
                                         Optional p_TCOM_CODE As String = "0100",
                                         Optional p_DETALLE_GASTO As String = "", Optional p_IND_DEDUCIBLE As String = "N") As Array
        Try
            Dim msg(3) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_REGISTRA_APROVACION_GASTO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF_GASTO", p_CODE_REF_GASTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_APROBACION", p_FECHA_APROBACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_OPERACION", p_FECHA_OPERACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DCTO_REF", p_NRO_DCTO_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CENTRO_COSTO_CODE", p_CENTRO_COSTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CENTRO_COSTO_CABECERA", p_CENTRO_COSTO_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_COMPRAS", p_IND_COMPRAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TCOM_CODE", p_TCOM_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES_TRIB", p_MES_TRIB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO_TRIB", p_ANIO_TRIB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONC_CODE", p_CONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCONC_CODE", p_SCONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CONTABLE", p_CTA_CONTABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HABIDO_IND", p_HABIDO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_BIEN", p_TIPO_BIEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PAGAR", p_IMPORTE_PAGAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE_GASTO", p_DETALLE_GASTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_DEDUCIBLE", p_IND_DEDUCIBLE, ParameterDirection.Input, 253))



            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_INTERNO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_INTERNO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_CODE_GENERADO").Value
            msg(1) = cmd1.Parameters("@p_NUMERO_INTERNO").Value
            msg(2) = cmd1.Parameters("@p_SERIE_INTERNO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Anular_Aprobacion_Gasto(ByVal p_CODE_REF_GASTO As String, ByVal p_ESTADO As String,
                                            ByVal p_USUA_ID As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_ANULA_APROVACION_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF_GASTO", p_CODE_REF_GASTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE_GENERADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Crear_Credito_Persona(ByVal p_CTLG_CODE As String,
                                          ByVal p_SCSL_CODE As String,
                                          ByVal p_COMC_CODE As String,
                                          ByVal p_FECHA As String,
                                          ByVal p_MONTO As Decimal,
                                          ByVal p_TIPO_CRED_IND As String,
                                          ByVal p_COMENTARIO As String,
                                          ByVal p_USUA_ID As String,
                                          ByVal p_FECHA_VENC As String,
                                          ByVal p_MONE_CODE As String,
                                          ByVal p_FECHA_PAGO As String,
                                          ByVal p_VTAC_CODE As String,
                                          ByVal p_TIPO_IND As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFA_CREAR_CREDITO_PERSONA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMC_CODE", p_COMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CRED_IND", p_TIPO_CRED_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMENTARIO", p_COMENTARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENC", p_FECHA_VENC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_PAGO", p_FECHA_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Aprobacion_gasto(ByVal p_FECHA_INI As String,
                                            ByVal p_FECHA_FIN As String,
                                            ByVal p_CODIGO As String, Optional p_CTLG_CODE As String = "", Optional p_SCSL_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_APROBACION_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI", p_FECHA_INI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_FECHA_FIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
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


    Public Function fnGetDocGasto(p_CodGasto As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_GET_DOC_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodGasto", p_CodGasto, ParameterDirection.Input, 253))

            Dim oDT As New DataTable()
            'oDT = cn.Consulta(cmd)
            If oTransaction Is Nothing Then
                oDT = cn.Consulta(cmd)
            Else
                oDT = oTransaction.fnExecute_GetDataTable_StoreProcedure(cmd)
                'oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Actualizar_Provision_Gasto(ByVal p_CONC_CODE As String, ByVal p_CTLG_CODE As String,
                                      ByVal p_DATO_FRECUENCIA As Integer, ByVal p_DESC_GASTO As String,
                                      ByVal p_ESTADO_IND As String, ByVal p_FECHA_UNICA As String,
                                      ByVal p_FRECUENCIA As String,
                                      ByVal p_MONTO As Decimal, ByVal p_PERIOCIDAD As String,
                                      ByVal p_PIDM_BENEFICIARIO As Integer, ByVal p_SCONC_CODE As String,
                                      ByVal p_SCSL_CODE As String, ByVal p_TIPO_IND As String,
                                      ByVal p_USUA_ID As String,
                                      ByVal p_CTA_CONTABLE As String,
                                      ByVal p_MONE_CODE As String,
                                      ByVal p_CODIGO As String,
                                      ByVal p_CENTRO_COSTO As String,
                                      ByVal p_CENTRO_COSTO_CABECERA As String,
                                      ByVal p_TIPO_DCTO As String,
                                          ByVal p_SERIE As String,
                                          ByVal p_NUMERO As String,
                                          ByVal p_COMPRAS_IND As String,
                                          ByVal p_HABIDO_IND As String,
                                          ByVal p_TIPO_BIEN As String,
                                      ByVal p_OPERACION As String, ByVal p_DETALLE_GASTO As String, ByVal p_DEDUCIBLE_IND As String, ByVal p_DECLARA As String, ByVal p_FECHA_VENCI As String,
                                      ByVal p_DETRACCION_IND As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_PAGAR As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_PROVISION_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONC_CODE", p_CONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DATO_FRECUENCIA", p_DATO_FRECUENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_GASTO", p_DESC_GASTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_UNICA", p_FECHA_UNICA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FRECUENCIA", p_FRECUENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIOCIDAD", p_PERIOCIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_BENEFICIARIO", p_PIDM_BENEFICIARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCONC_CODE", p_SCONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CONTABLE", p_CTA_CONTABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CENTRO_COSTO", p_CENTRO_COSTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CENTRO_COSTO_CABECERA", p_CENTRO_COSTO_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPRAS_IND", p_COMPRAS_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HABIDO_IND", p_HABIDO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_BIEN", p_TIPO_BIEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERACION", p_OPERACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE_GASTO", p_DETALLE_GASTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEDUCIBLE_IND", p_DEDUCIBLE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DECLARA", p_DECLARA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCI", p_FECHA_VENCI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PAGAR", p_IMPORTE_PAGAR, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Programacion_Gasto(ByVal p_CONC_CODE As String, ByVal p_CTLG_CODE As String,
                                      ByVal p_DATO_FRECUENCIA As Integer, ByVal p_DESC_GASTO As String,
                                      ByVal p_ESTADO_IND As String, ByVal p_FECHA_UNICA As String,
                                      ByVal p_FRECUENCIA As String,
                                      ByVal p_MONTO As Decimal, ByVal p_PERIOCIDAD As String,
                                      ByVal p_PIDM_BENEFICIARIO As Integer, ByVal p_SCONC_CODE As String,
                                      ByVal p_SCSL_CODE As String, ByVal p_TIPO_IND As String,
                                      ByVal p_USUA_ID As String,
                                      ByVal p_CTA_CONTABLE As String,
                                      ByVal p_MONE_CODE As String,
                                      ByVal p_CODIGO As String,
                                      p_CENTRO_COSTO As String,
                                      p_CENTRO_COSTO_CABECERA As String,
                                      ByVal p_TIPO_DCTO As String,
                                          ByVal p_SERIE As String,
                                          ByVal p_NUMERO As String,
                                          ByVal p_COMPRAS_IND As String,
                                          ByVal p_HABIDO_IND As String,
                                          ByVal p_TIPO_BIEN As String,
                                          ByVal p_OPERACION As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_GASTO_PROGRAMADO", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_CONC_CODE", p_CONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DATO_FRECUENCIA", p_DATO_FRECUENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_GASTO", p_DESC_GASTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_UNICA", p_FECHA_UNICA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FRECUENCIA", p_FRECUENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIOCIDAD", p_PERIOCIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_BENEFICIARIO", p_PIDM_BENEFICIARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCONC_CODE", p_SCONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CONTABLE", p_CTA_CONTABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CENTRO_COSTO", p_CENTRO_COSTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CENTRO_COSTO_CABECERA", p_CENTRO_COSTO_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPRAS_IND", p_COMPRAS_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HABIDO_IND", p_HABIDO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_BIEN", p_TIPO_BIEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERACION", p_OPERACION, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Verificar_Provision_Gasto(ByVal p_PIDM_BENEFICIARIO As String, ByVal p_SERIE As String,
                                        ByVal p_NUMERO As String, p_TIPO As String, p_COD_GASTO As String, ByVal p_TIPO_DCTO As String, ByVal p_CTLG_CODE As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_VERIFICAR_PROVISION_GASTO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_BENEFICIARIO", p_PIDM_BENEFICIARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_GASTO", p_COD_GASTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_SALIDA").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Deudas_afp(p_CTLG_CODE As String, p_COD_AFP_SUNAT As String, p_PERIODO_INI As String, p_PERIODO_FIN As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_REPORTE_DEUDAS_AFP", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AFP_SUNAT", p_COD_AFP_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO_INI", p_PERIODO_INI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERIODO_FIN", p_PERIODO_FIN, ParameterDirection.Input, 253))





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


    Public Function ListarCreditoPlanillaFechas(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_PAGOS_PLANILLA_AMORTIZACIONES", CommandType.StoredProcedure)
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

    Public Function ListarAmortizacionesPlanillas(ByVal p_CODE As String, Optional p_CTLG_CODE As String = "") As DataTable
        Try
            'A
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_AMORTIZACIONES_PAGOS_PLANILLAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
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

    Public Function Listar_Deuda_Total_Empleado(ByVal p_CTLG_CODE As String) As DataTable
        Try
            'A
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PCS_LISTAR_DEUDA_EMPLEADOS", CommandType.StoredProcedure)
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

    Public Function ListarEstadoCuentaProveedor(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                                ByVal p_DESDE As String,
                                                ByVal p_HASTA As String, ByVal p_PIDM As String,
                                                ByVal p_MONE_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFT_ESTADO_CUENTA_PROVEEDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_PROV", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
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

    Public Function Listar_Amortizacion(ByVal p_CODE As String) As DataTable
        Try
            'A
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_AMORTIZACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODE, ParameterDirection.Input, 253))
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
    Public Function Listar_Amortizacion_Gatos(ByVal p_CODE As String) As DataTable
        Try
            'A
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_LISTAR_AMORTIZACION_GASTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODE, ParameterDirection.Input, 253))
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

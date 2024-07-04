Public Class NATipoMovimiento

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarTipoMovimiento(ByVal p_codigo As String, ByVal p_tipo As String, ByVal p_estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_TIPO_MOVIMIENTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TMOV_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_tipo", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))

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

    Public Function VERIFICAR_NAMINSA(ByVal p_ISAC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_VERIFICAR_ESTADO_NAMINSA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))

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

    Public Function VERIFICA_DOC_MOV_ALMACEN(P_CODE_DOC As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_VERIFICA_DOC_MOV_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_DOC", P_CODE_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_EXISTE", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            Dim P_EXISTE As String = cmd.Parameters("@P_EXISTE").Value

            Return P_EXISTE
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarTipoMovimiento(ByVal p_codigo As String, ByVal p_desc As String,
                                             ByVal p_mov_logi As String, ByVal p_imprime As String,
                                             ByVal p_codigo_sunat As String, ByVal p_mov_cont As String,
                                             ByVal p_desc_sunat As String, ByVal p_desc_corta As String,
                                             ByVal p_estado_ind As String, ByVal p_user As String, ByVal p_CECC As String,
                                             ByVal p_CECD As String, ByVal p_interno_logistico As String, ByVal p_OPER As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_TIPO_MOVIMIENTO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MOV_LOGI", p_mov_logi, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRIME", p_imprime, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_SUNAT", p_codigo_sunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOV_CONT", p_mov_cont, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_SUNAT", p_desc_sunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_CORTA", p_desc_corta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVTMOV_CECC", p_CECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVTMOV_CECD", p_CECD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INTERNO_LOGISTICO", p_interno_logistico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPER", p_OPER, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearTipoMovimiento(ByVal p_desc As String,
                                             ByVal p_mov_logi As String, ByVal p_imprime As String,
                                             ByVal p_codigo_sunat As String, ByVal p_mov_cont As String,
                                             ByVal p_desc_sunat As String, ByVal p_desc_corta As String,
                                             ByVal p_estado_ind As String, ByVal p_user As String,
                                             p_CECC As String, p_CECD As String, ByVal p_interno_logistico As String, ByVal p_OPER As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFA_CREAR_TIPO_MOVIMIENTO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_desc, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_MOV_LOGI", p_mov_logi, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRIME", p_imprime, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_SUNAT", p_codigo_sunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOV_CONT", p_mov_cont, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_SUNAT", p_desc_sunat, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_CORTA", p_desc_corta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVTMOV_CECC", p_CECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FTVTMOV_CECD", p_CECD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INTERNO_LOGISTICO", p_interno_logistico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPER", p_OPER, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function insertar_dcto_almacen(ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_FECHA_EMISION As String, ByVal p_FECHA_TRANS As String, ByVal p_NUM_DCTO As String,
                                          ByVal p_PIDM_SOLICITANTE As String, ByVal p_REQC_CODE As String, ByVal p_REQC_NUM_SEQ_DOC As String, ByVal p_ORGN_CODE As String,
                                          ByVal p_RETORNO_IND As String, ByVal p_PIDM_ENTREGAR_A As String, ByVal p_TMOV_CODE As String, ByVal p_CMNT_DCTO As String,
                                          ByVal p_USUA_ID As String, ByVal p_TIPO_DOC_RAZON_DEST As String, ByVal p_RAZON_DEST As String, ByVal p_RAZON_TRANS As String, ByVal p_LICENCIA As String,
                                          ByVal p_CHOFER As String, ByVal p_DIRECCION As String, ByVal p_CERTIFICADO As String, ByVal p_PLACA As String, ByVal p_TIPO_DCTO As String, ByVal p_SERIE_DCTO As String,
                                          ByVal p_TIPO_DCTO_ORG As String, ByVal p_ALMC_DEST As String, ByVal p_MONTO As String, ByVal p_MONEDA As String, ByVal p_NUM_SEQ_DOC As String, ByVal p_ELECTRONICO As String,
                                          ByVal p_TIPO_TRANS As String, ByVal p_COD_AUT As String, ByVal p_TIPO_DCTO_INTERNO As String, ByVal p_COD_AUT_INTERNO As String, ByVal p_TIPO_ENVIO As String, ByVal p_DIR_TRANS As String,
                                          ByVal p_DESC_VEHICULO As String, ByVal p_MARCA_FACT As String, ByVal p_PLACA_FACT As String, ByVal p_UBIGEO_ORIGEN As String, ByVal p_UBIGEO_DESTINO As String,
                                          ByVal p_DIREC_ORIGEN As String, ByVal p_DIREC_DESTINO As String, ByVal p_URBANIZACION_ORIGEN As String, ByVal p_URBANIZACION_DESTINO As String, ByVal p_PIDM_TRANSP As String,
                                          ByVal p_TIPO_DOC_TRANS As String, ByVal p_COSTO_TRANSPORTE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFS_CREAR_DCTO_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_DCTO", p_SERIE_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_SOLICITANTE", p_PIDM_SOLICITANTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQC_CODE", p_REQC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQC_NUM_SEQ_DOC", p_REQC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORGN_CODE", p_ORGN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETORNO_IND", p_RETORNO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_ENTREGAR_A", p_PIDM_ENTREGAR_A, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TMOV_CODE", p_TMOV_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DOC_RAZON_DEST", p_TIPO_DOC_RAZON_DEST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_DEST", p_RAZON_DEST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_TRANS", p_RAZON_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LICENCIA", p_LICENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CHOFER", p_CHOFER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CERTIFICADO", p_CERTIFICADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLACA", p_PLACA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO_ORG", p_TIPO_DCTO_ORG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_DEST", p_ALMC_DEST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SEQ_DOC", p_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ELECTRONICO", p_ELECTRONICO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TRANS", p_TIPO_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO_INTERNO", p_TIPO_DCTO_INTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT_INTERNO", p_COD_AUT_INTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_ENVIO", p_TIPO_ENVIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIR_TRANS", p_DIR_TRANS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REG", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REG_INT", String.Empty, ParameterDirection.Output, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_VEHICULO", p_DESC_VEHICULO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA_FACT", p_MARCA_FACT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLACA_FACT", p_PLACA_FACT, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_UBIGEO_ORIGEN", p_UBIGEO_ORIGEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UBIGEO_DESTINO", p_UBIGEO_DESTINO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIREC_ORIGEN", p_DIREC_ORIGEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIREC_DESTINO", p_DIREC_DESTINO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_URBANIZACION_ORIGEN", p_URBANIZACION_ORIGEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_URBANIZACION_DESTINO", p_URBANIZACION_DESTINO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_TRANSP", p_PIDM_TRANSP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DOC_TRANS", p_TIPO_DOC_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COSTO_TRANSPORTE", p_COSTO_TRANSPORTE, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_DESPACHADO_IND", p_DESPACHADO_IND, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_ISAC_CODE").Value & ","
            msg &= cmd1.Parameters("@p_REG").Value & ","
            msg &= cmd1.Parameters("@p_REG_INT").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function actualizar_dcto_almacen(ByVal p_ISAC_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_FECHA_EMISION As String, ByVal p_FECHA_TRANS As String,
                                            ByVal p_NUM_DCTO As String, ByVal p_PIDM_SOLICITANTE As String, ByVal p_REQC_CODE As String, ByVal p_REQC_NUM_SEQ_DOC As String,
                                            ByVal p_ORGN_CODE As String, ByVal p_RETORNO_IND As String, ByVal p_PIDM_ENTREGAR_A As String, ByVal p_TMOV_CODE As String,
                                            ByVal p_CMNT_DCTO As String, ByVal p_USUA_ID As String, ByVal p_TIPO_DOC_RAZON_DEST As String, ByVal p_RAZON_DEST As String, ByVal p_RAZON_TRANS As String,
                                            ByVal p_LICENCIA As String, ByVal p_CHOFER As String, ByVal p_DIRECCION As String, ByVal p_CERTIFICADO As String,
                                            ByVal p_PLACA As String, ByVal p_TIPO_DCTO As String, ByVal p_SERIE_DCTO As String, ByVal p_TIPO_DCTO_ORG As String,
                                            ByVal p_ALMC_DEST As String, ByVal p_MONTO As String, ByVal p_MONTO_ALTERNO As String, ByVal p_MONEDA As String, ByVal p_NUM_SEQ_DOC As String,
                                            ByVal p_ELECTRONICO As String, ByVal p_TIPO_TRANS As String, ByVal p_TIPO_ENVIO As String, ByVal p_DIR_TRANS As String,
                                            ByVal p_DESC_VEHICULO As String, ByVal p_MARCA_FACT As String, ByVal p_PLACA_FACT As String, ByVal p_PIDM_TRANSP As String, ByVal p_TIPO_DOC_TRANS As String,
                                            ByVal p_COSTO_TRANSPORTE As String, ByVal p_UBIGEO_DESTINO As String, ByVal p_DIREC_DESTINO As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_DCTO_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_DCTO", p_SERIE_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_SOLICITANTE", p_PIDM_SOLICITANTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQC_CODE", p_REQC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQC_NUM_SEQ_DOC", p_REQC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORGN_CODE", p_ORGN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETORNO_IND", p_RETORNO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_ENTREGAR_A", p_PIDM_ENTREGAR_A, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TMOV_CODE", p_TMOV_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DOC_RAZON_DEST", p_TIPO_DOC_RAZON_DEST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_DEST", p_RAZON_DEST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_TRANS", p_RAZON_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LICENCIA", p_LICENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CHOFER", p_CHOFER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CERTIFICADO", p_CERTIFICADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLACA", p_PLACA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO_ORG", p_TIPO_DCTO_ORG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_DEST", p_ALMC_DEST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_ALTERNO", p_MONTO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SEQ_DOC", p_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ELECTRONICO", p_ELECTRONICO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TRANS", p_TIPO_TRANS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_ENVIO", p_TIPO_ENVIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIR_TRANS", p_DIR_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_VEHICULO", p_DESC_VEHICULO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MARCA_FACT", p_MARCA_FACT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLACA_FACT", p_PLACA_FACT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_TRANSP", p_PIDM_TRANSP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DOC_TRANS", p_TIPO_DOC_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COSTO_TRANSPORTE", p_COSTO_TRANSPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UBIGEO_DESTINO", p_UBIGEO_DESTINO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIREC_DESTINO", p_DIREC_DESTINO, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function lista_dcto_almacen(ByVal p_ISAC_CODE As String, ByVal p_NUM_DCTO As String, ByVal p_REQC_CODE As String, ByVal p_ANIO As String,
                                   ByVal p_MES As String, ByVal p_RETORNO_IND As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String,
                                   Optional ByVal p_RAZON_DEST_PIDM As String = "", Optional ByVal p_TIPO_DCTO As String = "", Optional ByVal P_PROD_CODE As String = "",
                                   Optional ByVal P_DESDE As String = "", Optional ByVal P_HASTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DCTO_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQC_CODE", p_REQC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETORNO_IND", p_RETORNO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_DEST_PIDM", p_RAZON_DEST_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESDE", P_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HASTA", P_HASTA, ParameterDirection.Input, 253))
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
    Public Function lista_estado_prod_vendido(ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal P_PROD_CODE As String, ByVal P_CHK_CODE As String, ByVal P_DESDE As String, ByVal P_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_ESTADO_PODUCTOS_VENDIDOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CHK_CODE", P_CHK_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESDE", P_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HASTA", P_HASTA, ParameterDirection.Input, 253))
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

    Public Function lista_dcto_almacen2(ByVal p_ISAC_CODE As String, ByVal p_NUM_DCTO As String, ByVal p_REQC_CODE As String, ByVal p_ANIO As String,
                                   ByVal p_MES As String, ByVal p_RETORNO_IND As String, ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String,
                                   Optional ByVal p_RAZON_DEST_PIDM As String = "", Optional ByVal p_TIPO_DCTO As String = "", Optional ByVal P_PROD_CODE As String = "",
                                   Optional ByVal P_DESDE As String = "", Optional ByVal P_HASTA As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DCTO_ALMACEN_SIN_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQC_CODE", p_REQC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETORNO_IND", p_RETORNO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_DEST_PIDM", p_RAZON_DEST_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESDE", P_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HASTA", P_HASTA, ParameterDirection.Input, 253))
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

    Public Function lista_dcto_almacen2(ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_DESDE As String, p_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTADO_DCTO_ALMACEN", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
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


    Public Function insertar_detalle_dcto_almacen(ByVal p_ISAC_CODE As String, ByVal p_DCTO_ORGN_CODE As String, ByVal p_PROD_CODE As String, ByVal p_PROD_CODE_ANTIGUO As String,
                                                  ByVal p_UNME_CODE_BASE As String, ByVal p_CANTIDAD_BASE As String,
                                                  ByVal p_UNME_CODE_CONVERT As String, ByVal p_CANTIDAD_CONVERT As String, ByVal p_TOTAL As String,
                                                  ByVal p_GARANTIA As String, ByVal p_PESO_UNIT As String, ByVal p_PESO_TOTAL As String, ByVal p_REQC_NUM_SEQ_DOC As String,
                                                  ByVal p_REQD_ITEM As String, ByVal p_USUA_ID As String, ByVal p_NRO_SERIE As String,
                                                  ByVal p_MONTO As String, ByVal p_INC_IGV As String, ByVal p_DESD_COMPRA_IND As String,
                                                  ByVal p_TIPO_INSERT As String, ByVal p_VALINI As String, ByVal p_VALFIN As String,
                                                  ByVal p_CECD_CODE As String, ByVal p_CECC_CODE As String, ByVal p_APLIC_VALORES_IND As String,
                                                  ByVal P_TIPO_PROD As String, Optional ByVal v_MONEDA As String = "", Optional ByVal P_DETRACCION As String = "0.0", Optional ByVal p_MONTO_MAS_COSTO_TRANSPORTE As String = "0.0") As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_CREAR_DETALLE_DCTO_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_ORGN_CODE", p_DCTO_ORGN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE_ANTIGUO", p_PROD_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE_BASE", p_UNME_CODE_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD_BASE", p_CANTIDAD_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE_CONVERT", p_UNME_CODE_CONVERT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD_CONVERT", p_CANTIDAD_CONVERT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TOTAL", p_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GARANTIA", p_GARANTIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PESO_UNIT", p_PESO_UNIT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PESO_TOTAL", p_PESO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQC_NUM_SEQ_DOC", p_REQC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQD_ITEM", p_REQD_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_SERIE", p_NRO_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INC_IGV", p_INC_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESD_COMPRA_IND", p_DESD_COMPRA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_INSERT", p_TIPO_INSERT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALINI", p_VALINI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALFIN", p_VALFIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECD_CODE", p_CECD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECC_CODE", p_CECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_APLIC_VALORES_IND", p_APLIC_VALORES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@v_MONEDA", v_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DETRACCION", P_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_PROD", P_TIPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_MAS_COSTO_TRANSPORTE", p_MONTO_MAS_COSTO_TRANSPORTE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RESP").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function insertar_detalle_dcto_almacen2(ByVal p_ISAC_CODE As String, ByVal p_DCTO_ORGN_CODE As String, ByVal p_ITEM As String, ByVal p_PROD_CODE As String, ByVal p_PROD_CODE_ANTIGUO As String,
                                                  ByVal p_UNME_CODE_BASE As String, ByVal p_CANTIDAD_BASE As String,
                                                  ByVal p_UNME_CODE_CONVERT As String, ByVal p_CANTIDAD_CONVERT As String, ByVal p_TOTAL As String,
                                                  ByVal p_GARANTIA As String, ByVal p_PESO_UNIT As String, ByVal p_PESO_TOTAL As String, ByVal p_REQC_NUM_SEQ_DOC As String,
                                                  ByVal p_REQD_ITEM As String, ByVal p_USUA_ID As String, ByVal p_NRO_SERIE As String,
                                                  ByVal p_MONTO As String, ByVal p_INC_IGV As String, ByVal p_DESD_COMPRA_IND As String,
                                                  ByVal p_TIPO_INSERT As String, ByVal p_VALINI As String, ByVal p_VALFIN As String,
                                                  ByVal p_CECD_CODE As String, ByVal p_CECC_CODE As String, ByVal p_APLIC_VALORES_IND As String,
                                                  ByVal P_TIPO_PROD As String, Optional ByVal v_MONEDA As String = "", Optional ByVal P_DETRACCION As String = "0.0", Optional ByVal p_MONTO_MAS_COSTO_TRANSPORTE As String = "0.0") As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_CREAR_DETALLE_DCTO_ALMACEN_2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_ORGN_CODE", p_DCTO_ORGN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE_ANTIGUO", p_PROD_CODE_ANTIGUO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE_BASE", p_UNME_CODE_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD_BASE", p_CANTIDAD_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE_CONVERT", p_UNME_CODE_CONVERT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD_CONVERT", p_CANTIDAD_CONVERT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TOTAL", p_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GARANTIA", p_GARANTIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PESO_UNIT", p_PESO_UNIT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PESO_TOTAL", p_PESO_TOTAL, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_REQC_CODE", p_REQC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQC_NUM_SEQ_DOC", p_REQC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQD_ITEM", p_REQD_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_SERIE", p_NRO_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INC_IGV", p_INC_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESD_COMPRA_IND", p_DESD_COMPRA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_INSERT", p_TIPO_INSERT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALINI", p_VALINI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALFIN", p_VALFIN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECD_CODE", p_CECD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECC_CODE", p_CECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_APLIC_VALORES_IND", p_APLIC_VALORES_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@v_MONEDA", v_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DETRACCION", P_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_PROD", P_TIPO_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_MAS_COSTO_TRANSPORTE", p_MONTO_MAS_COSTO_TRANSPORTE, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RESP").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function actualizar_detalle_dcto_almacen_MONTO_MN(ByVal P_ISAC_CODE As String, ByVal P_ITEM As String, ByVal P_MONTO_MN As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_DETALLE_DCTO_ALMACEN_COSTO_MN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ISAC_CODE", P_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ITEM", P_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONTO_MN", P_MONTO_MN, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function actualizar_doc_origen_NAMINSA(ByVal P_ISAC_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_DOC_ORIGEN_NAMINSA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ISAC_CODE", P_ISAC_CODE, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function actualizar_detalle_dcto_almacen_MONTO_ME(ByVal P_ISAC_CODE As String, ByVal P_ITEM As String, ByVal P_MONTO_ME As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_DETALLE_DCTO_ALMACEN_COSTO_ME", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ISAC_CODE", P_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ITEM", P_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONTO_ME", P_MONTO_ME, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function actualizar_detalle_dcto_almacen_CANTIDAD(ByVal p_ISAC_CODE As String, ByVal p_ITEM As String, ByVal p_CANTIDAD As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_DETALLE_DCTO_ALMACEN_CANTIDAD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD", p_CANTIDAD, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function actualizar_detalle_dcto_almacen_SERIE(ByVal P_ISAC_CODE As String, ByVal P_ITEM As String, ByVal P_SERIE As String, Optional ByVal P_VALIDAR_EXISTENTE As String = "N") As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_DETALLE_DCTO_ALMACEN_SERIE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ISAC_CODE", P_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ITEM", P_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SERIE", P_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALIDAR_EXISTENTE", P_VALIDAR_EXISTENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RESPUESTA", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Return cmd.Parameters("@P_RESPUESTA").Value.ToString

        Catch ex As Exception
            Return "ERROR"
        End Try
    End Function

    Public Function actualizar_detalle_dcto_almacen_GARANTIA(ByVal P_ISAC_CODE As String, ByVal P_ITEM As String, ByVal P_GARANTIA As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_DETALLE_DCTO_ALMACEN_GARANTIA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ISAC_CODE", P_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ITEM", P_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_GARANTIA", P_GARANTIA, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function actualizar_detalle_dcto_almacen_CENTRO_COSTOS(ByVal P_ISAC_CODE As String, ByVal P_ITEM As String, ByVal P_CENTRO_COSTOS As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_DETALLE_DCTO_ALMACEN_CENTRO_COSTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ISAC_CODE", P_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ITEM", P_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CENTRO_COSTOS", P_CENTRO_COSTOS, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ELIMINAR_DETALLE_DCTO_ALMACEN(ByVal p_ISAC_CODE As String, ByVal p_ITEM As String, ByVal p_DOC_ORIGEN As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ELIMINAR_DETALLE_DCTO_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_ORIGEN", p_DOC_ORIGEN, ParameterDirection.Input, 253)) 'SI ES SALIDA O INGRESO DE DOCUMENTOS MULTIPLES

            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function VERIFICAR_SERIES(p_ISAC_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_VERIFICAR_SERIES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RPTA", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            msg = cmd.Parameters("@p_RPTA").Value
            Return msg
        Catch ex As Exception
            Return "ERROR"
        End Try
    End Function

    Public Function COMPLETAR_DCTO_ALMACEN(p_ISAC_CODE As String, Optional p_TRANSAC_MYSQL As String = "S") As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_COMPLETAR_DCTO_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSAC_MYSQL", p_TRANSAC_MYSQL, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Return "OK"
        Catch ex As Exception
            Return "ERROR"
        End Try
    End Function

    'DPORTA 08/02/2022 PROBANDO LA APRBACION DE NAMINSA VALIDANDO EL STOCK DE PRODUCTOS ANTES DE PROCESARLOS EN EL SP
    Public Function COMPLETAR_DCTO_ALMACEN_VALI(p_ISAC_CODE As String, Optional p_TRANSAC_MYSQL As String = "S") As Array
        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_COMPLETAR_DCTO_ALMACEN_VALI", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSAC_MYSQL", p_TRANSAC_MYSQL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RPTA", String.Empty, ParameterDirection.Output, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_DATOS_QR", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_RPTA").Value
            'msg(1) = cmd.Parameters("@p_VTAC_DATOS_QR").Value
            'Return "OK"
        Catch ex As Exception
            msg(0) = ex.Message
            'msg(1) = ""
        End Try
        Return msg
    End Function

    'Gurda la ruta de la imagen del QR convertida a base64
    Public Function GuardarCodigoQR_GRE(ByVal p_CODE As String, ByVal p_IMGQR As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("GUARDAR_QR_GRE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMGQR", p_IMGQR, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ELIMINAR_DCTO_ALMACEN(ByVal p_ISAC_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ELIMINAR_DCTO_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Return "ERROR"
        End Try
    End Function

    Public Function busca_CAB_dcto_almacen(ByVal p_ISAC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DCTO_ALMACEN_ESPECIFICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))

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

    Public Function lista_detalle_dcto_almacen(ByVal p_ISAC_CODE As String, ByVal p_ITEM As String, Optional ByVal p_DCTO_ORGN_CODE As String = "") As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DETALLE_DCTO_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_ORGN_CODE", p_DCTO_ORGN_CODE, ParameterDirection.Input, 253))

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

    Public Function ListarDetalleOrigenDctoAlmacen(ByVal p_ISAC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_DETALLE_ORIGEN_DCTO_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
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


    Public Function verificar_numero_serie_empresa(ByVal p_PIDM_EMPRESA As String, ByVal p_TIPO_DOC As String, ByVal p_SERIE_DOC As String, ByVal p_NRO_DOC As String, ByVal p_BISAC_CODE As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DOC_SERIE_POR_EMPRESA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_EMPRESA", p_PIDM_EMPRESA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CODE", p_TIPO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_DOC", p_SERIE_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DOC", p_NRO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BISAC_CODE", p_BISAC_CODE, ParameterDirection.Input, 253))
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

    'LISTA LA CABECERA DE GUIA PARA IMPRESION CON FORMATO EN EL CONFIGURADOR DE FORMATOS DE IMPRESION
    Public Function ListarGuiaRemisionImpresion(ByVal p_ISAC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_GUIA_REMISION_IMPRESION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
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
    'LISTA LA DETALLES DE GUIA PARA IMPRESION CON FORMATO EN EL CONFIGURADOR DE FORMATOS DE IMPRESION
    Public Function ListarDetallGuiaRemisionImpresion(ByVal p_ISAC_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DETALLE_GUIA_REMISION_IMPRESION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
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



    Public Function actualizarSalidaAlmacen(ByVal P_ISAC_CODE As String, ByVal p_NRO_VUELTAS As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_SALIDA_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ISAC_CODE", P_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_VUELTAS", p_NRO_VUELTAS, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)

            Return "OK"

        Catch ex As Exception
            Return "ERROR"
        End Try
    End Function

    Public Function CrearCentroCostosTipoMov(p_MOV_CODE As String, p_CTLG_CODE As String, p_CECC As String, p_CECD As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_CREAR_TIPO_MOV_CENTRO_COSTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOV_CODE", p_MOV_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECC", p_CECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECD", p_CECD, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function EliminarCentroCostosTipoMov(p_MOV_CODE As String, p_CTLG_CODE As String, p_CECC As String, p_CECD As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_ELIMINAR_TIPO_MOV_CENTRO_COSTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOV_CODE", p_MOV_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECC", p_CECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECD", p_CECD, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarCentroCostoTipoMov(p_MOV_CODE As String, p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_TIPO_MOV_CENTRO_COSTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOV_CODE", p_MOV_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", IIf(p_CTLG_CODE = "", DBNull.Value, p_CTLG_CODE), ParameterDirection.Input, 253))
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


    Public Function fnGetDocAlmacen(p_Cod As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_GET_DOC_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_CODE", p_Cod, ParameterDirection.Input, 253))

            Dim oDT As New DataTable()
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

    Public Function fnTotalesDoc(p_CODIGO_NAM As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_TOTALES_DOC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_NAM", p_CODIGO_NAM, ParameterDirection.Input, 253))

            Dim oDT As New DataTable()
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

    Public Sub fnActualizarCodContabDocAlmacen(p_CodDoc As String, p_CodMovCont As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ActualizarCodContabDocAlmacen", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDoc", p_CodDoc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodMovCont", p_CodMovCont, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub



End Class

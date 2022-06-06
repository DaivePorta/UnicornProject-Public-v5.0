Public Class MPConfiguracionReceta

    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarConfiguracionReceta(ByVal P_CODE As String, ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_ORFAB_CODE As String,
                                              ByVal P_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_LISTAR_CONFIGURACION_RECETA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ORFAB_CODE", P_ORFAB_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearConfiguracionReceta(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_ORFAB_CODE As String, ByVal P_ORFAB_DESC As String, ByVal P_HORAS As String, ByVal P_USUA_ID As String,
                                             ByVal P_MANC_CODES As String, ByVal P_PROD_CODES As String, ByVal P_CANTIDADES_PROD As String, ByVal P_UNME_CODES_PROD As String, ByVal P_MERMAS_PROD As String, ByVal P_COSTOS_MN_PROD As String, ByVal P_COSTOS_ME_PROD As String,
                                             ByVal P_EMPL_CODES As String, ByVal P_HORAS_EMPL As String, ByVal P_ACTIVIDADES_EMPL As String, ByVal P_INICIOS_EMPL As String, ByVal P_LIMITES_EMPL As String, ByVal P_COSTOS_MN_EMPL As String, ByVal P_COSTOS_ME_EMPL As String,
                                             ByVal P_SECC_CODES As String, ByVal P_INICIOS_SECC As String, ByVal P_LIMITES_SECC As String, ByVal P_COSTOS_MN_SECC As String, ByVal P_COSTOS_ME_SECC As String,
                                             ByVal P_ACFI_CODES As String, ByVal P_ACTIVIDADES_ACFI As String, ByVal P_INICIOS_ACFI As String, ByVal P_LIMITES_ACFI As String, ByVal P_COSTOS_MN_ACFI As String, ByVal P_COSTOS_ME_ACFI As String,
                                             ByVal P_COEN_CODES As String, ByVal P_CANTIDADES_COEN As String, ByVal P_UNME_CODES_COEN As String, ByVal P_COSTOS_MN_COEN As String, ByVal P_COSTOS_ME_COEN As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFR_CREAR_CONFIGURACION_RECETA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ORFAB_CODE", P_ORFAB_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ORFAB_DESC", P_ORFAB_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORAS", P_HORAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_MANC_CODES", P_MANC_CODES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODES", P_PROD_CODES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDADES_PROD", P_CANTIDADES_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNME_CODES_PROD", P_UNME_CODES_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MERMAS_PROD", P_MERMAS_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_MN_PROD", P_COSTOS_MN_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_ME_PROD", P_COSTOS_ME_PROD, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_EMPL_CODES", P_EMPL_CODES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORAS_EMPL", P_HORAS_EMPL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACTIVIDADES_EMPL", P_ACTIVIDADES_EMPL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INICIOS_EMPL", P_INICIOS_EMPL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_LIMITES_EMPL", P_LIMITES_EMPL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_MN_EMPL", P_COSTOS_MN_EMPL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_ME_EMPL", P_COSTOS_ME_EMPL, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_SECC_CODES", P_SECC_CODES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INICIOS_SECC", P_INICIOS_SECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_LIMITES_SECC", P_LIMITES_SECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_MN_SECC", P_COSTOS_MN_SECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_ME_SECC", P_COSTOS_ME_SECC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_ACFI_CODES", P_ACFI_CODES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACTIVIDADES_ACFI", P_ACTIVIDADES_ACFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INICIOS_ACFI", P_INICIOS_ACFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_LIMITES_ACFI", P_LIMITES_ACFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_MN_ACFI", P_COSTOS_MN_ACFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_ME_ACFI", P_COSTOS_ME_ACFI, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_COEN_CODES", P_COEN_CODES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDADES_COEN", P_CANTIDADES_COEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNME_CODES_COEN", P_UNME_CODES_COEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_MN_COEN", P_COSTOS_MN_COEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_ME_COEN", P_COSTOS_ME_COEN, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_CODE").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarConfiguracionReceta(ByVal P_CODE As String, ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_ORFAB_CODE As String, ByVal P_ORFAB_DESC As String, ByVal P_HORAS As String, ByVal P_ESTADO_IND As String, ByVal P_USUA_ID As String,
                                                  ByVal P_MANC_CODES As String, ByVal P_PROD_CODES As String, ByVal P_CANTIDADES_PROD As String, ByVal P_UNME_CODES_PROD As String, ByVal P_MERMAS_PROD As String, ByVal P_COSTOS_MN_PROD As String, ByVal P_COSTOS_ME_PROD As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_ACTUALIZAR_CONFIGURACION_RECETA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ORFAB_CODE", P_ORFAB_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ORFAB_DESC", P_ORFAB_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORAS", P_HORAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_MANC_CODES", P_MANC_CODES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODES", P_PROD_CODES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDADES_PROD", P_CANTIDADES_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNME_CODES_PROD", P_UNME_CODES_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MERMAS_PROD", P_MERMAS_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_MN_PROD", P_COSTOS_MN_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTOS_ME_PROD", P_COSTOS_ME_PROD, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)

            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoConfiguracionReceta(ByVal P_CODE As String, ByVal P_USUA_ID As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFR_CAMBIAR_ESTADO_CONFIGURACION_RECETA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            estado = cmd1.Parameters("@P_ESTADO").Value

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarDetallesConfiguracionReceta(ByVal P_CODE As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_LISTAR_DETALLES_CONFIGURACION_RECETA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearDetalleConfiguracionReceta(ByVal P_CORE_CODE As String, ByVal P_MANC_CODE As String, ByVal P_PROD_CODE As String, ByVal P_EMPL_CODE As String,
                                                    ByVal P_SECC_CODE As String, ByVal P_ACFI_CODE As String, ByVal P_COEN_CODE As String, ByVal P_CANTIDAD As String,
                                                    ByVal P_UNME_CODE As String, ByVal P_MERMA As String, ByVal P_HORAS As String, ByVal P_ACTIVIDAD As String,
                                                    ByVal P_INICIO As String, ByVal P_LIMITE As String, ByVal P_COSTO_MN As String, ByVal P_COSTO_ME As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_CREAR_DETALLE_CONFIGURACION_RECETA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CORE_CODE", P_CORE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MANC_CODE", P_MANC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_EMPL_CODE", P_EMPL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SECC_CODE", P_SECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACFI_CODE", P_ACFI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COEN_CODE", P_COEN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDAD", P_CANTIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNME_CODE", P_UNME_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MERMA", P_MERMA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORAS", P_HORAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACTIVIDAD", P_ACTIVIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_INICIO", P_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_LIMITE", P_LIMITE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTO_MN", P_COSTO_MN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COSTO_ME", P_COSTO_ME, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            estado = "OK"

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function EliminarInsumoConfiguracionReceta(ByVal P_CORE_CODE As String, ByVal P_PROD_CODE As String, ByVal P_EMPL_CODE As String,
                                                      ByVal P_SECC_CODE As String, ByVal P_ACFI_CODE As String, ByVal P_COEN_CODE As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_ELIMINAR_INSUMO_CONFIGURACION_RECETA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CORE_CODE", P_CORE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_EMPL_CODE", P_EMPL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SECC_CODE", P_SECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACFI_CODE", P_ACFI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COEN_CODE", P_COEN_CODE, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            estado = "OK"

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoDetallesConfiguracionReceta(ByVal P_CODE As String, ByVal P_CORE_CODE As String, ByVal P_ESTADO As String, ByVal P_ORFAB_CODE As String, ByVal P_TIPO_DCTO As String, ByVal P_NRO_DCTO As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_CAMBIAR_ESTADO_DETALLES_CONFIGURACION_RECETA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CORE_CODE", P_CORE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ORFAB_CODE", P_ORFAB_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_DCTO", P_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NRO_DCTO", P_NRO_DCTO, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)

            estado = "OK"

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CompletarConfiguracionReceta(ByVal P_CORE_CODE As String, ByVal P_ORFAB_CODE As String, ByVal P_USUA_ID As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_COMPLETAR_CONFIGURACION_RECETA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CORE_CODE", P_CORE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ORFAB_CODE", P_ORFAB_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            estado = "OK"

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class

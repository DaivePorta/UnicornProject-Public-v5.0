Public Class AFActivoFijo

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub


    Public Function EMPLE_PROD_FABRI(ByVal P_CODE As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_EMPLE_PROD_FABRI", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))



            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Prod_detalle_fabr(ByVal P_CODE As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_DETALLE_PROD_FABRI", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            


            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Prod_fabr(ByVal P_CTLG As String, ByVal P_SCSL As String, ByVal P_CODE As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_PROD_FABRICADO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", P_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUCURSAL", P_SCSL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CREAR_DETALLE_MANO_OBRA(ByVal P_CODIGO As String, ByVal P_TETX As String) As Array

        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFA_CREAR_DETALLE_MANO_OBRA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXT_COMP", P_TETX, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CREAR_DETALLE_PROD_FABRI(ByVal P_CODIGO As String, ByVal P_TETX As String, ByVal p_ISAC_CODE As String, ByVal p_USUA_ID As String) As Array

        Try
            Dim msg(2) As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFA_CREAR_DETALLE_PROD_FABRI", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXT_COMP", P_TETX, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CREAR_PROD_FABRICADO(ByVal P_CATALOGO As String, ByVal P_SUCURSAL As String, ByVal P_ALMC_CODE As String, ByVal P_COD_PRD As String, ByVal P_TSIGV As Decimal,
                                    ByVal P_TIGV As Decimal, ByVal P_TSHORA As Decimal, ByVal P_THORAS_TRABAJ As Decimal,
                                    ByVal P_TOTAL_MANO As Decimal, ByVal P_TOTAL_SIN_IGV As Decimal, ByVal P_TOTAL_CON_IGV As Decimal,
                                    ByVal P_NRO_SERIE As String, ByVal P_FECHA_ENSAMBLAJE As String, ByVal P_FECHA_MOVIMIENTO As String, ByVal P_PIDM_ALMACENERO As String,
                                    ByVal P_USUA_ID As String, ByVal P_CECC_CODE As String, ByVal P_CECD_CODE As String,
                                    ByVal P_DETALLES_PROD As String, ByVal P_DETALLES_MANO As String) As Array

        Dim msg(2) As String
        Try

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFA_CREAR_PROD_FABRICADO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", P_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUCURSAL", P_SUCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMC_CODE", P_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COD_PRD", P_COD_PRD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TSIGV", P_TSIGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIGV", P_TIGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TSHORA", P_TSHORA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_THORAS_TRABAJ", P_THORAS_TRABAJ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TOTAL_MANO", P_TOTAL_MANO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TOTAL_SIN_IGV", P_TOTAL_SIN_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TOTAL_CON_IGV", P_TOTAL_CON_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NRO_SERIE", P_NRO_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_ENSAMBLAJE", P_FECHA_ENSAMBLAJE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_MOVIMIENTO", P_FECHA_MOVIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_ALMACENERO", P_PIDM_ALMACENERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECC_CODE", P_CECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CECD_CODE", P_CECD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DETALLES_PROD", P_DETALLES_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DETALLES_MANO", P_DETALLES_MANO, ParameterDirection.Input, 253)) 'MANO DE OBRA
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MCDR_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@P_CODIGO").Value
            msg(1) = cmd.Parameters("@P_MCDR_CODE").Value
            msg(2) = cmd.Parameters("@P_RESPUESTA").Value
            Return msg
        Catch ex As Exception
            msg(0) = ""
            msg(1) = ""
            msg(2) = ex.Message
            Return msg
        End Try
    End Function


    Public Function ListarActivosFijos(ByVal P_CODIGO As String, ByVal P_CODIGO_AF As String, ByVal P_CTLG As String, ByVal P_SCSL As String, ByVal P_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_ACTIVO_FIJO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", P_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO_AF", P_CODIGO_AF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG", P_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL", P_SCSL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearActivoFijo(ByVal P_IMPR_CODE As String, ByVal P_PROD_CODE As String, ByVal P_MCDR_CODE As String, ByVal P_UNID_CODE As String,
                                    ByVal P_UNIDAD As String, ByVal P_SERIE As String, ByVal P_FECHA_INICIAL As String,
                                    ByVal P_FECHA_ENTREGA As String, ByVal P_VALOR_INICIAL As String, ByVal P_VALOR As String,
                                    ByVal P_PRODUCCION As String, ByVal P_VIDA_UTIL As String, ByVal P_VALOR_DESECHO As String,
                                    ByVal P_METODO_DEPRECIACION As String, ByVal CENTRO_COSTO_DETALLE As String, ByVal P_CTLG_CODE As String,
                                    ByVal P_SCSL_CODE As String, ByVal P_ESTADO_IND As String, ByVal P_USUA_ID As String, ByVal P_CENTRO_COSTO As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_CREAR_ACTIVO_FIJO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_IMPR_CODE", P_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MCDR_CODE", P_MCDR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNID_CODE", P_UNID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNIDAD", P_UNIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SERIE", P_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_INICIAL", P_FECHA_INICIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_ENTREGA", P_FECHA_ENTREGA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR_INICIAL", P_VALOR_INICIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR", P_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PRODUCCION", P_PRODUCCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VIDA_UTIL", P_VIDA_UTIL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR_DESECHO", P_VALOR_DESECHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_METODO_DEPRECIACION", P_METODO_DEPRECIACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CC_DETALLE", CENTRO_COSTO_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CENTRO_COSTO", P_CENTRO_COSTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_AF", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR_ACTUAL", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_CODE").Value & ","
            msg &= cmd1.Parameters("@P_CODE_AF").Value & ","
            msg &= cmd1.Parameters("@P_VALOR_ACTUAL").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarActivoFijo(ByVal P_CODE As String, ByVal P_IMPR_CODE As String, ByVal P_PROD_CODE As String, ByVal P_MCDR_CODE As String,
                                         ByVal P_UNID_CODE As String, ByVal P_UNIDAD As String, ByVal P_SERIE As String,
                                         ByVal P_FECHA_INICIAL As String, ByVal P_FECHA_ENTREGA As String, ByVal P_VALOR_INICIAL As String,
                                         ByVal P_VALOR As String, ByVal P_PRODUCCION As String, ByVal P_VIDA_UTIL As String, ByVal P_VALOR_DESECHO As String,
                                         ByVal P_METODO_DEPRECIACION As String, ByVal CENTRO_COSTO_DETALLE As String,
                                         ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_ESTADO_IND As String,
                                         ByVal P_USUA_ID As String, ByVal P_CENTRO_COSTO As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_ACTIVO_FIJO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_IMPR_CODE", P_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", P_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MCDR_CODE", P_MCDR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNID_CODE", P_UNID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_UNIDAD", P_UNIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SERIE", P_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_INICIAL", P_FECHA_INICIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_ENTREGA", P_FECHA_ENTREGA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR_INICIAL", P_VALOR_INICIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR", P_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PRODUCCION", P_PRODUCCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VIDA_UTIL", P_VIDA_UTIL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR_DESECHO", P_VALOR_DESECHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_METODO_DEPRECIACION", P_METODO_DEPRECIACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CC_DETALLE", CENTRO_COSTO_DETALLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CENTRO_COSTO", P_CENTRO_COSTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR_ACTUAL", String.Empty, ParameterDirection.Output, 253))

            cn.Ejecuta_parms(cmd)

            msg = "OK"

            msg = cmd.Parameters("@P_VALOR_ACTUAL").Value & ","
            msg &= "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoActivoFijo(ByVal P_CODE As String, ByVal P_USUA_ID As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_CAMBIAR_ESTADO_ACTIVO_FIJO", CommandType.StoredProcedure)
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

    Public Function CargarValorActualActivoFijo(ByVal P_ACFI_CODE As String) As String
        Try
            Dim valor As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_CALCULAR_VALOR_ACTIVO_FIJO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACFI_CODE", P_ACFI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            valor = cmd1.Parameters("@P_VALOR").Value

            Return valor

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Function ListarDocumentoCompraxCodigoBarras(p_CTLG_CODE As String, p_ALMC_CODE As String, p_PROD_CODE As String, p_CODIGO_BARRAS As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_DOCUMENTO_COMPRA_X_CODIGO_BARRAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_BARRAS", p_CODIGO_BARRAS, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class

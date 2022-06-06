Public Class NFRecepcion
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarRecepcion(ByVal p_ctlg As String, ByVal p_scsl As String, ByVal p_estado As String, ByVal p_codigo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFF_LISTAR_RECEPCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_scsl, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", p_codigo, ParameterDirection.Input, 253))

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

    Public Function CrearRecepcion(ByVal p_ctlg As String,
                                         ByVal p_scsl As String, ByVal p_fec_registro As String,
                                         ByVal p_fec_recepcion As String, ByVal p_fec_entrega As String,
                                         ByVal p_hora_registro As String,
                                         ByVal p_hora_recepcion As String, ByVal p_hora_entrega As String,
                                         ByVal p_pidm_cliente As String, ByVal p_dcto_cliente As String,
                                         ByVal p_pidm_autorizado As String,
                                         ByVal p_prod_code As String, ByVal p_serie As String,
                                         ByVal p_accesorios As String, ByVal p_motivos As String,
                                         ByVal p_pidm_recepcionado As String, ByVal p_pidm_asignado As String,
                                         ByVal p_usua_id As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFF_CREAR_RECEPCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_scsl, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FEC_REGISTRO", p_fec_registro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FEC_RECEPCION", p_fec_recepcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FEC_ENTREGA", p_fec_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORA_REGISTRO", p_hora_registro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORA_RECEPCION", p_hora_recepcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORA_ENTREGA", p_hora_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_CLIENTE", p_pidm_cliente, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DCTO_CLIENTE", p_dcto_cliente, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_AUTORIZADO", p_pidm_autorizado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", p_prod_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SERIE", p_serie, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACCESORIOS", p_accesorios, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MOTIVOS", p_motivos, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_RECEPCIONADO", p_pidm_recepcionado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_ASIGNADO", p_pidm_asignado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_CODE_GENERADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ActualizarRecepcion(ByVal p_code As String, ByVal p_ctlg As String,
                                         ByVal p_scsl As String, ByVal p_fec_registro As String,
                                         ByVal p_fec_recepcion As String, ByVal p_fec_entrega As String,
                                         ByVal p_hora_registro As String,
                                         ByVal p_hora_recepcion As String, ByVal p_hora_entrega As String,
                                         ByVal p_pidm_cliente As String, ByVal p_dcto_cliente As String,
                                         ByVal p_pidm_autorizado As String,
                                         ByVal p_prod_code As String, ByVal p_serie As String,
                                         ByVal p_accesorios As String, ByVal p_motivos As String,
                                         ByVal p_pidm_recepcionado As String, ByVal p_pidm_asignado As String,
                                         ByVal p_usua_id As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFF_ACTUALIZAR_RECEPCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_scsl, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FEC_REGISTRO", p_fec_registro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FEC_RECEPCION", p_fec_recepcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FEC_ENTREGA", p_fec_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORA_REGISTRO", p_hora_registro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORA_RECEPCION", p_hora_recepcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HORA_ENTREGA", p_hora_entrega, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_CLIENTE", p_pidm_cliente, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DCTO_CLIENTE", p_dcto_cliente, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_AUTORIZADO", p_pidm_autorizado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", p_prod_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SERIE", p_serie, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACCESORIOS", p_accesorios, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MOTIVOS", p_motivos, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_RECEPCIONADO", p_pidm_recepcionado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_ASIGNADO", p_pidm_asignado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", p_code, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarPersonaNatural(ByVal p_tipo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PPP_LISTAR_PERSONA_LISTA", CommandType.StoredProcedure)
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

    'Listar las series de los productos
    Public Function ListarSeriesProductos(ByVal p_CTLG_CODE As String, ByVal p_PROD_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFF_LISTAR_SERIE_PRODUCTOS_TODOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))

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

    Public Function CrearMercaderia(ByVal p_MCDR_DESC As String, ByVal p_PROD_CODE As String, ByVal p_UNME_CODE As String, ByVal p_CTLG_CODE As String,
            ByVal p_ALMC_CODE As String, ByVal p_FOND_CODE As String, ByVal p_CTAS_CODE As String, ByVal p_CODIGO As String,
            ByVal p_CODIGO_BARRAS As String, ByVal p_PRECIO_MINIMO As String, ByVal p_PRECIO_VENTA As String,
            ByVal p_PORC_MAX_DCTO_VENTA As String, ByVal p_MONE_CODE_VENTA As String, ByVal p_ACTIVO_VENTA_IND As String,
            ByVal p_COMC_CODE As String, ByVal p_COMD_ITEM As String, ByVal p_VALOR_COMPRA As String,
            ByVal p_FECHA_COMPRA As String, ByVal p_ISAC_CODE As String, ByVal p_FECHA_RECEPCION As String, ByVal p_FACC_CODE As String,
            ByVal p_VENDIDO_IND As String, ByVal p_VTAC_CODE As String, ByVal p_VTAC_FECHA As String, ByVal p_VTAC_PRECIO_VENTA As String,
            ByVal p_VTAC_MONE_CODE_VENTA As String, ByVal p_ANULADO_IND As String, ByVal p_ANULAC_USER_ID As String,
            ByVal p_FECHA_ANULAC As String, ByVal p_CMNT_ANULAC As String, ByVal p_USUA_ID As String, ByVal p_ORGN_CODE As String,
            ByVal p_PROG_CODE As String, ByVal p_ACTV_CODE As String, ByVal p_LOCN_CODE As String, ByVal p_PROY_CODE As String,
            ByVal p_PROV_CODE As String, ByVal p_TIEMPO_GARANTIA As String, ByVal p_IGV As String, ByVal p_RENTA As String,
            ByVal p_TIPO_COMPRA As String, ByVal p_NRO_FACTURA As String, ByVal p_NRO_GUIA As String, ByVal p_ATR1 As String,
            ByVal p_ATR2 As String, ByVal p_ATR3 As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFS_CREAR_MERCADERIA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MCDR_DESC", p_MCDR_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE", p_UNME_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ALMC_CODE", p_ALMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOND_CODE", p_FOND_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_CODE", p_CTAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_VIN", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_BARRAS", p_CODIGO_BARRAS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PRECIO_MINIMO", p_PRECIO_MINIMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PRECIO_VENTA", p_PRECIO_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PORC_MAX_DCTO_VENTA", p_PORC_MAX_DCTO_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE_VENTA", p_MONE_CODE_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACTIVO_VENTA_IND", p_ACTIVO_VENTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMC_CODE", p_COMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMD_ITEM", p_COMD_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_COMPRA", p_VALOR_COMPRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_COMPRA", p_FECHA_COMPRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISAC_CODE", p_ISAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_RECEPCION", p_FECHA_RECEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDIDO_IND", p_VENDIDO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_FECHA", p_VTAC_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_PRECIO_VENTA", p_VTAC_PRECIO_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_MONE_CODE_VENTA", p_VTAC_MONE_CODE_VENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO_IND", p_ANULADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULAC_USER_ID", p_ANULAC_USER_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_ANULAC", p_FECHA_ANULAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_ANULAC", p_CMNT_ANULAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORGN_CODE", p_ORGN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROG_CODE", p_PROG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACTV_CODE", p_ACTV_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LOCN_CODE", p_LOCN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROY_CODE", p_PROY_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_CODE", p_PROV_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIEMPO_GARANTIA", p_TIEMPO_GARANTIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RENTA", p_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_COMPRA", p_TIPO_COMPRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_FACTURA", p_NRO_FACTURA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_GUIA", p_NRO_GUIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ATR1", p_ATR1, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ATR2", p_ATR2, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ATR3", p_ATR3, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE_GENERADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class

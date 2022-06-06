Public Class NVCotizacion
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub


    Public Function ListarCotizacionCliente_Busq(ByVal p_COTI_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String,
                                           ByVal p_TIPO_DCTO As String, ByVal p_VENDEDOR As String, ByVal p_ANULADO As String,
                                           ByVal p_PROD_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_DESDE As String, ByVal p_HASTA As String,
                                           p_CTLG_CODE As String, p_SCSL_CODE As String, Optional p_COMPLETO_IND As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_COTIZACION_CLIENTE_BUSQ", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_CODE", p_COTI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))

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

    'Crea una cotizacion a cliente y sus detalles
    Public Function CrearCotizacionCliente(ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                           ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                           ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                           ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                           ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                           ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                           ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                           ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                           ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                           ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                           ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                           ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                           ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                           ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String, ByVal p_DETALLES_BONIFICACION As String, ByVal p_DETALLES_MUESTRA As String,
                                           ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                           ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                           ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                           ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String, ByVal p_FECHA_VIGENCIA As String, ByVal p_DIAS_VIGENCIA As String,
                                           Optional p_RESP_PIDM As String = Nothing) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_CREAR_COTIZACION_CLIENTE", CommandType.StoredProcedure)
            'Correlativo mostrado en pantalla, puede cambiar en BD
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VIGENCIA", p_FECHA_VIGENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIAS_VIGENCIA", p_DIAS_VIGENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONIFICACION", p_DETALLES_BONIFICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))


            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_COTI_CODE").Value
            msg(1) = cmd.Parameters("@p_COTI_NUM_SEQ_DOC").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    'Actualiza una cotizacion y tambien sus detalles
    Public Function ActualizarCotizacionCliente(ByVal p_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                           ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                           ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                           ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                           ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                           ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                           ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                           ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                           ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                           ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                           ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                           ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                           ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                           ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String, ByVal p_DETALLES_BONIFICACION As String, ByVal p_DETALLES_MUESTRA As String,
                                           ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                           ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                           ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                           ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String, ByVal p_FECHA_VIGENCIA As String, ByVal p_DIAS_VIGENCIA As String,
                                           Optional p_RESP_PIDM As String = Nothing) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_ACTUALIZAR_COTIZACION_CLIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VIGENCIA", p_FECHA_VIGENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIAS_VIGENCIA", p_DIAS_VIGENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONIFICACION", p_DETALLES_BONIFICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_COTI_CODE").Value
            msg(1) = cmd.Parameters("@p_COTI_NUM_SEQ_DOC").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Completa un documento de venta grabado anteriormente
    Public Function CompletarCotizacionCliente(ByVal p_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String,
                                          ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                          ByVal p_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                          ByVal p_CAJA_CODE As String, ByVal p_MONE_CODE As String, ByVal p_VALOR As String,
                                          ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                          ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_CLIE_PIDM As String,
                                          ByVal p_CLIE_DOID As String, ByVal p_USVE_USUA_ID As String, ByVal p_COMPLETO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String,
                                          ByVal p_VALOR_CAMBIO As String, ByVal p_USUA_ID As String, ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                          ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String, ByVal p_IMPORTE_REDONDEO As String,
                                          ByVal p_IMPORTE_DONACION As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                          ByVal p_IMPORTE_PERCEPCION As String, ByVal p_IMPORTE_OTROS As String, ByVal p_IMPR_CODE As String,
                                          ByVal p_DETRACCION_IND As String, ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                          ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String, ByVal p_NUM_DCTO_RETEN As String,
                                          ByVal p_FECHA_EMISION_PERCEP As String, ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                          ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String, ByVal p_DETALLES As String, ByVal p_DETALLES_BONIFICACION As String, ByVal p_DETALLES_MUESTRA As String,
                                          ByVal p_DCTO_SERIE_REF As String, ByVal p_DCTO_NUM_REF As String,
                                          ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                          ByVal p_VALOR_CAMBIO_OFI As String, ByVal p_COD_AUT As String, ByVal p_PCTJ_IGV As String,
                                          ByVal p_FACTOR_RENTA As String, ByVal p_IMPUESTO_RENTA As String, ByVal p_FECHA_VIGENCIA As String, ByVal p_DIAS_VIGENCIA As String,
                                          Optional p_RESP_PIDM As String = Nothing) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFV_COMPLETAR_COTIZACION_CLIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253)) 'Moneda en la que se hizo la venta
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            'Documento de origen
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_SERIE_REF", p_DCTO_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_NUM_REF", p_DCTO_NUM_REF, ParameterDirection.Input, 253))
            '--
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_OTROS", p_IMPORTE_OTROS, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPR_CODE", p_IMPR_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRACCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERCEPCION_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETENCION_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO_OFI", p_VALOR_CAMBIO_OFI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACTOR_RENTA", p_FACTOR_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_RENTA", p_IMPUESTO_RENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP_PIDM", p_RESP_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VIGENCIA", p_FECHA_VIGENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIAS_VIGENCIA", p_DIAS_VIGENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_BONIFICACION", p_DETALLES_BONIFICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MUESTRA", p_DETALLES_MUESTRA, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_COTI_CODE").Value
            msg(1) = cmd.Parameters("@p_COTI_NUM_SEQ_DOC").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Lista la cabecera de una cotizacion
    Public Function ListarCotizacionCliente(ByVal p_COTI_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String,
                                          ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_MONE_CODE As String, ByVal p_TIPO_DCTO As String, ByVal p_PIDM As String,
                                          ByVal p_ANIO As String, ByVal p_MES As String, Optional p_VIGENTES As String = "N") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_COTIZACION_CLIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_CODE", p_COTI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VIGENTES", p_VIGENTES, ParameterDirection.Input, 253)) 'N:todos, S:solo vigentes
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



    'Lista los detalles de una cotizacion 
    Public Function ListarDetalleCotizacionCliente(ByVal p_COTI_CODE As String, ByVal p_COTI_NUM_SEQ_DOC As String,
                                   ByVal p_ITEM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_COTIZACION_CLIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_CODE", p_COTI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_NUM_SEQ_DOC", p_COTI_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
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


    'Lista los detalles de una cotización en recepción de anticipos
    Public Function ListarDetalleCotizacionClienteAnticipos(ByVal p_COTI_CODE As String, ByVal p_COTI_NUM_SEQ_DOC As String,
                                   ByVal p_ITEM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_COTIZACION_CLIENTE_ANTICIPOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_CODE", p_COTI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_NUM_SEQ_DOC", p_COTI_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
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

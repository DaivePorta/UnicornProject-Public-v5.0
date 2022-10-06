Public Class NVAnticipo
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    ''' <summary>
    ''' LISTADO GENERAL DE ANTICIPOS
    ''' </summary>
    ''' <param name="p_CODE">CÓDIGO DE ANTICIPO</param>
    ''' <param name="p_CLIE_PIDM">PIDM DE CLIENTE</param>
    ''' <param name="p_TIPO_DOC">TIPO DE DOCUMENTO DE EMISIÓN</param>
    ''' <param name="p_NUM_DOC">NÚMERO DE DOCUMENTOI</param>
    ''' <param name="p_SERIE">SERIE DE DOCUMENTO</param>
    ''' <param name="p_FECHA_EMISION">FECHA DE EMISIÓN DEL DOCUMENTO</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ListarAnticiposCliente(ByVal p_CODE As String, ByVal p_CLIE_PIDM As String, ByVal p_TIPO_DOC As String,
                                           ByVal p_NUM_DOC As String, ByVal p_SERIE As String,
                                           ByVal p_FECHA_EMISION As String, ByVal p_TIPO As String,
                                           ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                           Optional p_VENDEDOR As String = "", Optional ByVal p_ESTADO_IND As String = "A",
                                           Optional ByVal p_ESTADO_DOC As String = "") As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_ANTICIPOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DOC", p_TIPO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DOC", p_NUM_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_DOC", p_ESTADO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))

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

    'Public Function ListarCotizacionCliente_Busq(ByVal p_COTI_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String,
    '                                       ByVal p_TIPO_DCTO As String, ByVal p_VENDEDOR As String, ByVal p_ANULADO As String,
    '                                       ByVal p_PROD_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_DESDE As String, ByVal p_HASTA As String,
    '                                       p_CTLG_CODE As String, p_SCSL_CODE As String, Optional p_COMPLETO_IND As String = "") As DataTable
    '    Try
    '        Dim dt As DataTable
    '        Dim cmd As IDbCommand

    '        cmd = cn.GetNewCommand("PFV_LISTAR_COTIZACION_CLIENTE_BUSQ", CommandType.StoredProcedure)
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_COTI_CODE", p_COTI_CODE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_VENDEDOR", p_VENDEDOR, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
    '        cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))

    '        dt = cn.Consulta(cmd)


    '        If Not (dt Is Nothing) Then
    '            Return dt
    '        Else
    '            Return Nothing
    '        End If
    '    Catch ex As Exception
    '        Throw (ex)
    '    End Try
    'End Function

    ''' <summary>
    ''' Completar documento de anticipo
    ''' </summary>
    ''' <param name="p_CTLG_CODE">Empresa</param>
    ''' <param name="p_SCSL_CODE">Sucursal</param>
    ''' <param name="p_DCTO_CODE">Tipo de Documento</param>
    ''' <param name="p_CLIE_PIDM">Pidem de cliente</param>
    ''' <param name="p_DOC_CODE_REF">Cotización de origen</param>
    ''' <param name="p_MONE_CODE">Moneda de documento</param>
    ''' <param name="p_VALOR">Monto del documento</param>
    ''' <param name="p_VALOR_CAMBIO">Tipo de cambio</param>
    ''' <param name="p_FECHA_REG">fecha de emisión</param>
    ''' <param name="p_USUA_ID">usuario que genera el movimiento</param>
    ''' <param name="p_DETALLES_PAGO">datos de pago reunidos en una cadena a descomponer</param>
    ''' <param name="p_COD_AUT">codigo de autorización de documento</param>
    ''' <param name="p_USVE_USUA_ID">pidm de vendedor que realiza el cobro</param>
    ''' <param name="p_COMPLETAR">S:completar N:no completar</param>
    ''' <param name="p_PAGAR">S:pagar N:no pagar</param>
    ''' <param name="p_TIPO">C:cliente P:proveedor</param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function CompletarCotizacionCliente(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                                ByVal p_DCTO_CODE As String, ByVal p_CLIE_PIDM As String,
                                                ByVal p_DOC_CODE_REF As String, ByVal p_MONE_CODE As String,
                                                ByVal p_VALOR As String, ByVal p_VALOR_CAMBIO As String,
                                                ByVal p_FECHA_REG As String, ByVal p_USUA_ID As String,
                                                ByVal p_DETALLES_PAGO As String, ByVal p_COD_AUT As String,
                                                ByVal p_USVE_USUA_ID As String, ByVal p_MOPA_CODE As String,
                                                ByVal p_CLIE_DOID As String, ByVal p_DESCUENTO As String,
                                                ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                                ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                                ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String,
                                                ByVal p_IMPORTE_REDONDEO As String, ByVal p_IMPORTE_DONACION As String,
                                                ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                                ByVal p_IMPORTE_PERCEPCION As String, ByVal p_DETRACCION_IND As String,
                                                ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                                ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String,
                                                ByVal p_NUM_DCTO_RETEN As String, ByVal p_FECHA_EMISION_PERCEP As String,
                                                ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                                ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String,
                                                ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                                ByVal p_PCTJ_IGV As String, ByVal p_EFECTIVO_RECIBIDO As String,
                                                ByVal p_EFECTIVO_RECIBIDO_ALTERNO As String, ByVal p_VUELTO As String,
                                                ByVal p_VUELTO_ALTERNO As String, Optional p_CMNT_DCTO As String = "", Optional p_COMPLETAR As String = "S",
                                                Optional p_PAGAR As String = "S", Optional p_TIPO As String = "C") As Array


        Try
            Dim cmd As IDbCommand
            Dim msg(2) As String

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFS_CREAR_ANTICIPO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DOC", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_PAGO", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_CODE_REF", p_DOC_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_REG", p_FECHA_REG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETAR", p_COMPLETAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGAR", p_PAGAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DATOS_PAGO", p_DETALLES_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
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
            'cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_IMPR_IND", p_IGV_IMPR_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO", p_EFECTIVO_RECIBIDO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EFECTIVO_RECIBIDO_ALTERNO", p_EFECTIVO_RECIBIDO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO", p_VUELTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VUELTO_ALTERNO", p_VUELTO_ALTERNO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_ANTI_DATOS_QR", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_RESP").Value
            'msg(1) = cmd.Parameters("@p_ANTI_DATOS_QR").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CompletarAnticipoClientePorCobrar(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                                        ByVal p_DCTO_CODE As String, ByVal p_CLIE_PIDM As String,
                                                        ByVal p_DOC_CODE_REF As String, ByVal p_MONE_CODE As String,
                                                        ByVal p_VALOR As String, ByVal p_VALOR_CAMBIO As String,
                                                        ByVal p_FECHA_REG As String, ByVal p_USUA_ID As String,
                                                        ByVal p_DETALLES_PAGO As String, ByVal p_COD_AUT As String,
                                                        ByVal p_USVE_USUA_ID As String, ByVal p_MOPA_CODE As String,
                                                        ByVal p_CLIE_DOID As String, ByVal p_DESCUENTO As String,
                                                        ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                                        ByVal p_ISC As String, ByVal p_IMPORTE_EXO As String,
                                                        ByVal p_IMPORTE_INA As String, ByVal p_IMPORTE_GRA As String,
                                                        ByVal p_IMPORTE_REDONDEO As String, ByVal p_IMPORTE_DONACION As String,
                                                        ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_RETENCION As String,
                                                        ByVal p_IMPORTE_PERCEPCION As String, ByVal p_DETRACCION_IND As String,
                                                        ByVal p_PERCEPCION_IND As String, ByVal p_RETENCION_IND As String,
                                                        ByVal p_NUM_DCTO_PERCEP As String, ByVal p_NUM_DCTO_DETRAC As String,
                                                        ByVal p_NUM_DCTO_RETEN As String, ByVal p_FECHA_EMISION_PERCEP As String,
                                                        ByVal p_FECHA_EMISION_DETRAC As String, ByVal p_FECHA_EMISION_RETEN As String,
                                                        ByVal p_IMPRFAC_PERCEP As String, ByVal p_NRO_CUENTA_DETRAC As String,
                                                        ByVal p_SCSL_EXONERADA_IND As String, ByVal p_IGV_IMPR_IND As String,
                                                        ByVal p_PCTJ_IGV As String, Optional p_CMNT_DCTO As String = "",
                                                        Optional p_COMPLETAR As String = "S", Optional p_PAGAR As String = "S",
                                                        Optional p_TIPO As String = "C") As Array
        Try
            Dim cmd As IDbCommand
            Dim msg(2) As String

            'Los valores monetarios se ingresan en moneda base y en el procedimiento se calculan a moneda alterna 
            cmd = cn.GetNewCommand("PFS_CREAR_ANTICIPO_POR_COBRAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DOC", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_PAGO", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_CODE_REF", p_DOC_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_REG", p_FECHA_REG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETAR", p_COMPLETAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGAR", p_PAGAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DATOS_PAGO", p_DETALLES_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USVE_USUA_ID", p_USVE_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_DOID", p_CLIE_DOID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXO", p_IMPORTE_EXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INA", p_IMPORTE_INA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRA", p_IMPORTE_GRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_REDONDEO", p_IMPORTE_REDONDEO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DONACION", p_IMPORTE_DONACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_RETENCION", p_IMPORTE_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_PERCEPCION", p_IMPORTE_PERCEPCION, ParameterDirection.Input, 253))
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
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTJ_IGV", p_PCTJ_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_DCTO", p_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_ANTI_DATOS_QR", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)

            msg(0) = cmd.Parameters("@p_RESP").Value
            'msg(1) = cmd.Parameters("@p_ANTI_DATOS_QR").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try

    End Function
    Public Function ListarAnticipoDocumento(ByVal p_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_ANTICIPO_USADO", CommandType.StoredProcedure)
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

    'Anular anticipo
    Function fnAnularAnticipo(VTAC_CODE As String, ANULAC_ID As String, CMNT_ANULAC As String, p_DEVOLUCION_EFECTIVO As String, p_MOTIVO_CODE As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFV_ANULAR_ANTICIPO_WEB", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FVRANTI_CODE", VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULAC_ID", ANULAC_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_ANULAC", CMNT_ANULAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEVOLUCION_EFECTIVO", p_DEVOLUCION_EFECTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO_CODE", p_MOTIVO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Dim sMensaje As String
            sMensaje = cmd.Parameters("@p_RESPUESTA").Value

            Return sMensaje

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fnGetAnticipo(p_CODE As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_GET_ANTICIPO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))

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

End Class

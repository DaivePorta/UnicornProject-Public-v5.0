Public Class NCFactura
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function lista_detalle_alm_compra(ByVal P_CODIGO_COMPRA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_DETALLE_ALMACEN_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO_COMPRA", P_CODIGO_COMPRA, ParameterDirection.Input, 253))
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


    Public Function fnGetDocCompra(p_CodCompra As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_GET_DOC_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCompra", p_CodCompra, ParameterDirection.Input, 253))

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

    Public Function ListarOperacion(p_Estado As String, p_Regimen As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("LISTAR_OPERACIONES_CONT", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_Estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REGIMEN", p_Regimen, ParameterDirection.Input, 253))
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

    Public Function ListarOperacionC(p_Estado As String, p_Regimen As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("LISTAR_OPERACIONES_CONT_C", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_Estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REGIMEN", p_Regimen, ParameterDirection.Input, 253))
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

    Public Function lista_dcto_pagar(ByVal p_FACC_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String, ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, Optional ByVal p_TIPO_DCTO As String = "", Optional ByVal p_PIDM As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_DCTO_PAGAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
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

    Public Function EXISTE_DCTO_PAGAR(ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String, ByVal p_DCTO_CODE As String, ByVal p_PROV_PIDM As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_EXISTE_DOCUMENTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_PIDM", p_PROV_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)

            msg = cmd.Parameters("@p_ESTADO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function insertar_detalle_dcto_pagar(ByVal p_FACC_CODE As String, ByVal p_FACC_NUM_SEQ_DOC As String, ByVal p_PROD_CODE As String,
                                                ByVal p_PROD_ALMACENABLE As String, ByVal p_PROD_CMNT As String,
                                                ByVal p_UNME_CODE As String, ByVal p_CANTIDAD As String, ByVal p_PRECIO_UNIT As String, ByVal p_DESCUENTO As String,
                                                ByVal p_TOTAL As String, ByVal p_COMC_CODE As String, ByVal p_COMC_NUM_SEQ_DOC As String, ByVal p_COMD_ITEM As String,
                                                ByVal p_PAGO_FINAL_IND As String, ByVal p_REGC_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_FOND_CODE As String,
                                                ByVal p_ORGN_CODE As String, ByVal p_CTAS_CODE As String, ByVal p_PROG_CODE As String, ByVal p_ACTV_CODE As String,
                                                ByVal p_LOCN_CODE As String, ByVal p_PROY_CODE As String, ByVal p_USUA_ID As String, ByVal p_incluye_igv As String,
                                                ByVal p_COLOR As String, ByVal p_ANO_MODELO As String, ByVal p_ANO_FABRICACION As String,
                                                ByVal p_DETRACCION As String, ByVal p_DCTO_ORGN As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_CREAR_DETALLE_DCTO_PAGAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_NUM_SEQ_DOC", p_FACC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_ALMACENABLE", p_PROD_ALMACENABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CMNT", p_PROD_CMNT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE", p_UNME_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD", p_CANTIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PRECIO_UNIT", p_PRECIO_UNIT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TOTAL", p_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMC_CODE", p_COMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMC_NUM_SEQ_DOC", p_COMC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMD_ITEM", p_COMD_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PAGO_FINAL_IND", p_PAGO_FINAL_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REGC_CODE", p_REGC_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOND_CODE", p_FOND_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORGN_CODE", p_ORGN_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_CODE", p_CTAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROG_CODE", p_PROG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ACTV_CODE", p_ACTV_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_LOCN_CODE", p_LOCN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROY_CODE", p_PROY_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_incluye_igv", p_incluye_igv, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION", p_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_ORGN", p_DCTO_ORGN, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function insertar_dcto_pagar(ByVal p_COMC_CODE As String, ByVal p_COMC_NUM_SEQ_DOC As String, ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String,
                                        ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String, ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                        ByVal p_FABFACC_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_MONE_CODE As String,
                                        ByVal p_VALOR As String, ByVal p_ISC As String, ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                        ByVal p_IMPUESTO_IND As String, ByVal p_BANC_CODE As String, ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_PROV_PIDM As String,
                                        ByVal p_TIPO_FACC_IND As String, ByVal p_COMPLETO_IND As String,
                                        ByVal p_APROBADO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String, ByVal p_FECHA_DCTO_REF As String,
                                        ByVal p_NUM_SERIE_REF As String, ByVal p_NUM_DCTO_REF As String, ByVal p_VALOR_CAMBIO As String, ByVal p_IMPT_CODE As String,
                                        ByVal p_USUA_ID As String, ByVal p_DOC_REGISTRO As String, ByVal p_SERIE_REGISTRO As String,
                                        ByVal p_NUM_REGISTRO As String, ByVal p_PERC_IND As String, ByVal p_DETRAC_IND As String, ByVal p_RETEN_IND As String,
                                        ByVal p_PERC As String, ByVal p_DETRAC As String, ByVal p_RETEN As String, ByVal p_OPERACION As String,
                                        Optional ByVal p_NUM_DCTO_DETRAC As String = "", Optional ByVal p_FECHA_EMISION_DETRAC As String = "", Optional ByVal p_NRO_CUENTA_DETRAC As String = "",
                                        Optional ByVal p_NUM_DCTO_PERCEP As String = "", Optional ByVal p_FECHA_EMISION_PERCEP As String = "", Optional ByVal p_IMPRFAC_PERCEP As String = "",
                                        Optional ByVal p_NUM_DCTO_RETEN As String = "", Optional ByVal p_FECHA_EMISION_RETEN As String = "", Optional ByVal p_INAFECTO As String = "0",
                                        Optional p_CUENTA_CONTABLE As String = Nothing, Optional ByVal p_PLAZO As String = "", Optional ByVal p_FECHA_VENC As String = "",
                                        Optional ByVal p_AJUSTE As String = "", Optional ByVal p_MES_TRIB As String = Nothing, Optional ByVal p_ANIO_TRIB As String = Nothing,
                                        Optional p_DIRECCION As String = "",
                                        Optional p_LATITUD As String = Nothing,
                                        Optional p_LONGITUD As String = Nothing,
                                        Optional p_ISC_IND As String = "N",
                                        Optional p_PORCEN_IGV As String = "0.00",
                                        Optional p_HABIDO_IND As String = "1",
                                        Optional p_TIPO_BIEN As String = Nothing) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_CREAR_DCTO_PAGAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMC_CODE", p_COMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMC_NUM_SEQ_DOC", p_COMC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FABFACC_CMNT_DCTO", p_FABFACC_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INAFECTO", p_INAFECTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_IND", p_IMPUESTO_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_BANC_CODE", p_BANC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_PIDM", p_PROV_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_FACC_IND", p_TIPO_FACC_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_APROBADO_IND", p_APROBADO_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_DCTO_REF", p_FECHA_DCTO_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE_REF", p_NUM_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_REF", p_NUM_DCTO_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPT_CODE", p_IMPT_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_REGISTRO", p_DOC_REGISTRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_REGISTRO", p_SERIE_REGISTRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_REGISTRO", p_NUM_REGISTRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERC_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRAC_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETEN_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION", p_PERC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION", p_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION", p_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERACION", p_OPERACION, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_CONTABLE", p_CUENTA_CONTABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAZO", p_PLAZO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENC", p_FECHA_VENC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AJUSTE", p_AJUSTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES_TRIB", p_MES_TRIB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO_TRIB", p_ANIO_TRIB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC_IND", p_ISC_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PORCE_IGV", p_PORCEN_IGV, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_HABIDO_IND", p_HABIDO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_BIEN", p_TIPO_BIEN, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_FACC_CODE").Value
            msg(1) = cmd.Parameters("@p_FACC_NUM_SEQ_DOC").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function actualizar_dcto_pagar(ByVal p_FACC_CODE As String, ByVal p_FACC_NUM_SEQ_DOC As String, ByVal p_COMC_CODE As String, ByVal p_NUM_SERIE As String, ByVal p_NUM_DCTO As String,
                                        ByVal p_DCTO_CODE As String, ByVal p_FECHA_EMISION As String, ByVal p_FECHA_TRANS As String, ByVal p_FECHA_VENCIMIENTO As String,
                                        ByVal p_FABFACC_CMNT_DCTO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_MONE_CODE As String,
                                        ByVal p_VALOR As String, ByVal p_ISC As String, ByVal p_DESCUENTO As String, ByVal p_IGV As String, ByVal p_IMPORTE As String,
                                        ByVal p_IMPUESTO_IND As String, ByVal p_BANC_CODE As String, ByVal p_MOPA_CODE As String, ByVal p_FOPA_CODE As String, ByVal p_PROV_PIDM As String,
                                        ByVal p_TIPO_FACC_IND As String, ByVal p_COMPLETO_IND As String,
                                        ByVal p_APROBADO_IND As String, ByVal p_CODE_REF As String, ByVal p_DCTO_CODE_REF As String, ByVal p_FECHA_DCTO_REF As String,
                                        ByVal p_NUM_SERIE_REF As String, ByVal p_NUM_DCTO_REF As String, ByVal p_VALOR_CAMBIO As String, ByVal p_IMPT_CODE As String,
                                        ByVal p_USUA_ID As String, ByVal p_DOC_REGISTRO As String, ByVal p_SERIE_REGISTRO As String,
                                        ByVal p_NUM_REGISTRO As String, ByVal p_PERC_IND As String, ByVal p_DETRAC_IND As String, ByVal p_RETEN_IND As String,
                                        ByVal p_PERC As String, ByVal p_DETRAC As String, ByVal p_RETEN As String, ByVal p_OPERACION As String,
                                        Optional ByVal p_NUM_DCTO_DETRAC As String = "", Optional ByVal p_FECHA_EMISION_DETRAC As String = "", Optional ByVal p_NRO_CUENTA_DETRAC As String = "",
                                        Optional ByVal p_NUM_DCTO_PERCEP As String = "", Optional ByVal p_FECHA_EMISION_PERCEP As String = "", Optional ByVal p_IMPRFAC_PERCEP As String = "",
                                        Optional ByVal p_NUM_DCTO_RETEN As String = "", Optional ByVal p_FECHA_EMISION_RETEN As String = "", Optional ByVal p_INAFECTO As String = "0",
                                        Optional ByVal p_PLAZO As String = "", Optional ByVal p_FECHA_VENC As String = "",
                                        Optional ByVal p_AJUSTE As String = "", Optional ByVal p_MES_TRIB As String = Nothing, Optional ByVal p_ANIO_TRIB As String = Nothing,
                                        Optional p_DIRECCION As String = "",
                                        Optional p_LATITUD As String = Nothing,
                                        Optional p_LONGITUD As String = Nothing,
                                        Optional p_ISC_IND As String = "N",
                                        Optional p_PORCEN_IGV As String = "0.00",
                                        Optional p_HABIDO_IND As String = "1",
                                        Optional p_TIPO_BIEN As String = Nothing) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_DCTO_PAGAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_NUM_SEQ_DOC", p_FACC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMC_CODE", p_COMC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE", p_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANS", p_FECHA_TRANS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FABFACC_CMNT_DCTO", p_FABFACC_CMNT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR", p_VALOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INAFECTO", p_INAFECTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCUENTO", p_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO_IND", p_IMPUESTO_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_BANC_CODE", p_BANC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOPA_CODE", p_MOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FOPA_CODE", p_FOPA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_PIDM", p_PROV_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_DETRAC", p_NUM_DCTO_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DETRAC", p_FECHA_EMISION_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_CUENTA_DETRAC", p_NRO_CUENTA_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_FACC_IND", p_TIPO_FACC_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_APROBADO_IND", p_APROBADO_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REF", p_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_CODE_REF", p_DCTO_CODE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_DCTO_REF", p_FECHA_DCTO_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE_REF", p_NUM_SERIE_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_REF", p_NUM_DCTO_REF, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPT_CODE", p_IMPT_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_REGISTRO", p_DOC_REGISTRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_REGISTRO", p_SERIE_REGISTRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_REGISTRO", p_NUM_REGISTRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION_IND", p_PERC_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION_IND", p_DETRAC_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION_IND", p_RETEN_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERCEPCION", p_PERC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETRACCION", p_DETRAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RETENCION", p_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERACION", p_OPERACION, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_PERCEP", p_NUM_DCTO_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_PERCEP", p_FECHA_EMISION_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPRFAC_PERCEP", p_IMPRFAC_PERCEP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO_RETEN", p_NUM_DCTO_RETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_RETEN", p_FECHA_EMISION_RETEN, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC", p_ISC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAZO", p_PLAZO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VENC", p_FECHA_VENC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_AJUSTE", p_AJUSTE, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_MES_TRIB", p_MES_TRIB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO_TRIB", p_ANIO_TRIB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCION", p_DIRECCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LATITUD", p_LATITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LONGITUD", p_LONGITUD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ISC_IND", p_ISC_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PORCEN_IGV", p_PORCEN_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HABIDO_IND", p_HABIDO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_BIEN", p_TIPO_BIEN, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function lista_detalle_dcto_pagar(ByVal p_FACC_CODE As String, ByVal p_FACC_NUM_SEQ_DOC As String, _
                                   ByVal p_ITEM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_DETALLE_DCTO_PAGAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_NUM_SEQ_DOC", p_FACC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
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

    Public Function ACTUALIZAR_detalle_dcto_pagar_CANT(ByVal p_FACC_CODE As String, ByVal p_ITEM As String, _
                                                 ByVal p_CANTIDAD As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_DETALLE_DCTO_PAGAR_CANT", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD", p_CANTIDAD, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ACTUALIZAR_detalle_dcto_pagar_BRUTO(ByVal p_FACC_CODE As String, ByVal p_ITEM As String, _
                                          ByVal p_BRUTO As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_DETALLE_DCTO_PAGAR_BRUTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BRUTO", p_BRUTO, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ACTUALIZAR_detalle_dcto_pagar_NETO(ByVal p_FACC_CODE As String, ByVal p_ITEM As String, _
                                      ByVal p_NETO As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_DETALLE_DCTO_PAGAR_NETO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NETO", p_NETO, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ACTUALIZAR_detalle_dcto_pagar_DESC(ByVal p_FACC_CODE As String, ByVal p_ITEM As String, _
                                            ByVal p_DESC As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_ACTUALIZAR_DETALLE_DCTO_PAGAR_DESC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ELIMINAR_DETALLE_DCTO_PAGAR(ByVal p_FACC_CODE As String, ByVal p_FACC_NUM_SEQ_DOC As String, ByVal p_ITEM As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_ELIMINAR_DETALLE_DCTO_PAGAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_NUM_SEQ_DOC", p_FACC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function COMPLETAR_DCTO_PAGAR(p_FACC_CODE As String, p_FACC_NUM_SEQ_DOC As String,
                                         Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFA_COMPLETAR_DCTO_PAGAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_NUM_SEQ_DOC", p_FACC_NUM_SEQ_DOC, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return "OK"
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function busca_CAB_dcto_pagar(ByVal p_FACC_CODE As String, ByVal p_FACC_NUM_SEQ_DOC As String _
                                     ) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_DCTO_PAGAR_ESPECIFICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_NUM_SEQ_DOC", p_FACC_NUM_SEQ_DOC, ParameterDirection.Input, 253))


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

    Public Function busca_dcto_pagar(P_FACC_CODE As String, P_NUM_DCTO As String, P_CTLG_CODE As String,
                                     P_SCSL_CODE As String, P_TIPO_DCTO As String, P_DESDE As String, P_HASTA As String,
                                     P_PRODUCTO As String, Optional p_NUM_SERIE As String = "", Optional p_N_DCTO As String = "",
                                     Optional p_ANULADO As String = "", Optional p_PROV_PIDM As String = "",
                                     Optional p_COMPLETO_IND As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_DCTO_PAGAR_BUSQ", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_FACC_CODE", P_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NUM_DCTO", P_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_DCTO", P_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESDE", P_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HASTA", P_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PRODUCTO", P_PRODUCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_N_DCTO", p_N_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_PIDM", p_PROV_PIDM, ParameterDirection.Input, 253))
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

    Public Function busca_dcto_pagar_listado(ByVal P_FACC_CODE As String,
                                             ByVal P_NUM_DCTO As String,
                                             ByVal P_CTLG_CODE As String,
                                             ByVal P_SCSL_CODE As String,
                                             ByVal P_TIPO_DCTO As String,
                                             ByVal P_DESDE As String,
                                             ByVal P_HASTA As String,
                                             ByVal P_PRODUCTO As String,
                                             ByVal P_MES As String,
                                             ByVal P_ANIO As String,
                                             ByVal P_ESTADO As String,
                                             Optional p_NUM_SERIE As String = "",
                                             Optional p_N_DCTO As String = "",
                                             Optional p_ANULADO As String = "",
                                             Optional p_PROV_PIDM As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_DCTO_PAGAR_BUSQ_LISTADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_FACC_CODE", P_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NUM_DCTO", P_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_DCTO", P_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESDE", P_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_HASTA", P_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PRODUCTO", P_PRODUCTO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_MES", P_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SERIE", p_NUM_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_N_DCTO", p_N_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULADO", p_ANULADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROV_PIDM", p_PROV_PIDM, ParameterDirection.Input, 253))
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

    Public Function ReporteComparativoAnaliticoCompras(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_MONE_CODE As String, ByVal p_ANIOS As String,
                                                     ByVal p_GRUP_CODE As String, ByVal p_SUBGRUP_CODE As String, ByVal p_USVE_CODE As String, ByVal p_PROD_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_REPORTE_COMPARATIVO_ANALITICO_COMPRAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIOS", p_ANIOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_GRUP_CODE", p_GRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUBGRUP_CODE", p_SUBGRUP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROV_PIDM", p_USVE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
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

    Public Function ReporteAnaliticoComprasMensuales(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MONE_CODE As String, ByVal P_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_REPORTE_ANALITICO_COMPRAS_MENSUALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))
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

    Public Function ReporteAnaliticoComprasAnuales(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MONE_CODE As String, ByVal P_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_REPORTE_ANALITICO_COMPRAS_ANUALES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIOS", P_ANIO, ParameterDirection.Input, 253))
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

    Public Function ReporteProductosComprados(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MONE_CODE As String, ByVal P_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_REPORTE_ANALITICO_PRODUCTOS_COMPRADOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))
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

    Public Function ReporteAnaliticoSubgruposComprados(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_MONE_CODE As String, ByVal p_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_REPORTE_ANALITICO_SUBGRUPOS_COMPRADOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
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

    Public Function ReporteMarcasCompradas(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MONE_CODE As String, ByVal P_ANIO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_REPORTE_ANALITICO_MARCAS_COMPRADAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIO", P_ANIO, ParameterDirection.Input, 253))
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

    Public Function ListarAniosCompras(Optional p_CTLG_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_ANIOS_COMPRAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
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

    Public Function ReporteAnaliticoComprasProveedores(ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_MONE_CODE As String, ByVal P_ANIOS As String, ByVal P_MESES As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_REPORTE_ANALITICO_COMPRAS_PROVEEDORES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONE_CODE", P_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ANIOS", P_ANIOS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MESES", P_MESES, ParameterDirection.Input, 253))
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

    'Anular un documento de Compra
    Function AnularDocumentoCompra(CODE As String, ANULAC_ID As String, CMNT_ANULAC As String) As String
        Dim msg As String
        Dim cmd As IDbCommand
        Try
            cmd = cn.GetNewCommand("PFS_ANULAR_DOCUMENTO_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULAC_ID", ANULAC_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_ANULAC", CMNT_ANULAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RESP").Value

        Catch ex As Exception
            msg = ex.Message
        End Try
        Return msg
    End Function

    'Anular un documento de Compra
    Function GET_SALDO_DOC_COMPRA(CODE_DOC_COMPRA As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFV_GET_SALDO_DOC_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCompra", CODE_DOC_COMPRA, ParameterDirection.Input, 253))

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

    Public Sub fnActualizarCodContabDocCompra(p_CodDocCompra As String, p_CodMovCont As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ActualizarCodContabDocCompra", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocCompra", p_CodDocCompra, ParameterDirection.Input, 253))
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

    Public Sub fnActualizarCodContabDocGasto(p_CodDocGasto As String, p_CodMovCont As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ActualizarCodContabDocGasto", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocGasto", p_CodDocGasto, ParameterDirection.Input, 253))
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

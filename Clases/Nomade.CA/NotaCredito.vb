Public Class NotaCredito
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub


    Public Function ListarDocumentosCompra(ByVal p_FACC_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String,
                                           ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String,
                                           ByVal p_SCSL_CODE As String, ByVal p_TIPO_DCTO As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFA_LISTAR_DCTO_PAGAR_2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FACC_CODE", p_FACC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
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


    Public Function ListarDocumentosVenta(ByVal p_VTAC_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String,
                                           ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String,
                                           ByVal p_SCSL_CODE As String, ByVal p_TIPO_DCTO As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
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

    Public Function ListarDocumentosVenta2(ByVal p_VTAC_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String,
                                           ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String,
                                           ByVal p_SCSL_CODE As String, ByVal p_TIPO_DCTO As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
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

    Public Function ListarDocumentosVentaNotaGenerica(ByVal p_VTAC_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String,
                                           ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String,
                                           ByVal p_SCSL_CODE As String, ByVal p_TIPO_DCTO As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_NOTA_CREDITO_GENERICA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
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

    Public Function ListarDocumentosVentaNotaGenerica_Solo_Anticipos(ByVal p_VTAC_CODE As String, ByVal p_RAZON_SOCIAL As String, ByVal p_NUM_DCTO As String,
                                           ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String,
                                           ByVal p_SCSL_CODE As String, ByVal p_TIPO_DCTO As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_NOTA_CREDITO_GENERICA_SOLO_ANTICIPOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_DCTO", p_NUM_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
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

    Public Function ListarDocumentosVentaNotaCredito(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_TIPO_DCTO As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DCTO_VENTA_NOTA_CREDITO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
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

    Public Function lista_detalle_dcto_venta(ByVal p_VTAC_CODE As String, ByVal p_VTAC_NUM_SEQ_DOC As String, _
                                    ByVal p_ITEM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFV_LISTAR_DETALLE_DCTO_VENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_CODE", p_VTAC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VTAC_NUM_SEQ_DOC", p_VTAC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
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

    'NOTA DE CRÉDITO POR DEVOLUCIÓN DE PRODUCTOS

    Public Function CrearNotaCredito(p_NUM_SEQ_DOC As String, p_ORIGEN_CODE As String, p_ORIGEN_TIPO_DOC As String,
                                      p_ORIGEN_IMPORTE As String, p_DESTINO_CODE As String, p_DESTINO_TIPO_DOC As String,
                                      p_PERS_PIDM As String, p_CTLG_CODE As String, p_SCSL_CODE As String,
                                      p_COMPRA_VENTA_IND As String, p_MONTO_TOTAL As String, p_ESTADO_USO As String,
                                      p_USUA_ID As String, p_ESTADO_IND As String, p_SERIE As String,
                                      p_NUMERO As String, p_ENTREGA_DESPACHO_ALMACEN As String, p_APLICA_DOC_REFERENCIA As String, p_COD_AUT As String,
                                      p_FECHA_EMISION As String, p_MONTO_IGV As String, p_DETALLES As String,
                                      p_ANHO As String, p_MES As String, p_IGV As String,
                                      p_FTVNOCC_FTVMOSU_CODE As String,
                                      p_SI_NO As String, p_MONTO_GRAVADO As String, p_MONTO_INAFECTA As String, p_MONTO_EXONERADO As String, p_MONTO_ISC As String, p_GLOSA As String,
                                      Optional ByVal p_AUTOAMORTIZAR As String = "S", Optional ByVal p_AJUSTE As Decimal = 0.0) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_NOTA_CREDITO", CommandType.StoredProcedure)
            'cmd = cn.GetNewCommand("PFB_CREAR_NOTA_CREDITO_PROVEEDOR", CommandType.StoredProcedure) ESTO ES PARA HACERLO CON CAMNOPR (HAY UNA CARPETA CON EL SP)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_CODE", p_ORIGEN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_TIPO_DOC", p_ORIGEN_TIPO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_IMPORTE", p_ORIGEN_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO_CODE", p_DESTINO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO_TIPO_DOC", p_DESTINO_TIPO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERS_PIDM", p_PERS_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPRA_VENTA_IND", p_COMPRA_VENTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", p_MONTO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_USO", p_ESTADO_USO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SEQ_DOC", p_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTREGA_DESPACHO_ALMACEN", p_ENTREGA_DESPACHO_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_APLICA_DOC_REFERENCIA", p_APLICA_DOC_REFERENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_IGV", p_MONTO_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AUTOAMORTIZAR", p_AUTOAMORTIZAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVNOCC_ANHO_PERIODO", p_ANHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVNOCC_MES_PERIODO", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVNOCC_FTVMOSU_CODE", p_FTVNOCC_FTVMOSU_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVNOCC_AJUSTE", p_AJUSTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SI_NO", p_SI_NO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_GRAVADO", p_MONTO_GRAVADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_INAFECTA", p_MONTO_INAFECTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_EXONERADO", p_MONTO_EXONERADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_ISC", p_MONTO_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ERROR_IND", String.Empty, ParameterDirection.Output, 253))


            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_NOCC_CODE").Value
            msg(1) = cmd.Parameters("@p_NOCC_NUM_SEQ_DOC").Value
            msg(2) = cmd.Parameters("@p_ERROR_IND").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearNotaCreditoMotivo(p_NUM_SEQ_DOC As String, p_ORIGEN_CODE As String, p_ORIGEN_TIPO_DOC As String,
                                      p_ORIGEN_IMPORTE As String, p_DESTINO_CODE As String, p_DESTINO_TIPO_DOC As String,
                                      p_PERS_PIDM As String, p_CTLG_CODE As String, p_SCSL_CODE As String,
                                      p_COMPRA_VENTA_IND As String, p_MONTO_TOTAL As String, p_ESTADO_USO As String,
                                      p_USUA_ID As String, p_ESTADO_IND As String, p_SERIE As String,
                                      p_NUMERO As String, p_ENTREGA_DESPACHO_ALMACEN As String, p_APLICA_DOC_REFERENCIA As String, p_COD_AUT As String,
                                      p_FECHA_EMISION As String, p_MONTO_IGV As String, p_DETALLES As String,
                                      p_ANHO As String, p_MES As String, p_IGV As String,
                                      p_FTVNOCC_FTVMOSU_CODE As String,
                                      p_SI_NO As String, p_MONTO_GRAVADO As String, p_MONTO_INAFECTA As String, p_MONTO_EXONERADO As String, p_MONTO_ISC As String, p_GLOSA As String,
                                      p_DESPACHADO_IND As String, p_COBRADO_IND As String,
                                      Optional ByVal p_AUTOAMORTIZAR As String = "S", Optional ByVal p_AJUSTE As Decimal = 0.0) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_NOTA_CREDITO_POR_MOTIVOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_CODE", p_ORIGEN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_TIPO_DOC", p_ORIGEN_TIPO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_IMPORTE", p_ORIGEN_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO_CODE", p_DESTINO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO_TIPO_DOC", p_DESTINO_TIPO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERS_PIDM", p_PERS_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPRA_VENTA_IND", p_COMPRA_VENTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_TOTAL", p_MONTO_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_USO", p_ESTADO_USO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SEQ_DOC", p_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTREGA_DESPACHO_ALMACEN", p_ENTREGA_DESPACHO_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_APLICA_DOC_REFERENCIA", p_APLICA_DOC_REFERENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_IGV", p_MONTO_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_NUM_SEQ_DOC", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AUTOAMORTIZAR", p_AUTOAMORTIZAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVNOCC_ANHO_PERIODO", p_ANHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVNOCC_MES_PERIODO", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVNOCC_FTVMOSU_CODE", p_FTVNOCC_FTVMOSU_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVNOCC_AJUSTE", p_AJUSTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SI_NO", p_SI_NO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_GRAVADO", p_MONTO_GRAVADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_INAFECTA", p_MONTO_INAFECTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_EXONERADO", p_MONTO_EXONERADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_ISC", p_MONTO_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESPACHADO_IND", p_DESPACHADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COBRADO_IND", p_COBRADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ERROR_IND", String.Empty, ParameterDirection.Output, 253))


            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_NOCC_CODE").Value
            msg(1) = cmd.Parameters("@p_NOCC_NUM_SEQ_DOC").Value
            msg(2) = cmd.Parameters("@p_ERROR_IND").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearDetalleNotaCredito(ByVal p_NOCC_CODE As String, ByVal p_NOCC_NUM_SEQ_DOC As String, ByVal p_PROD_CODE As String,
                                            ByVal p_UNME_CODE As String, ByVal p_CANTIDAD_DEVL As String, ByVal p_ORIGEN_PRECIO_UNIT As String,
                                             ByVal p_MONTO_SUBTOTAL As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                             ByVal p_ORIGEN_IMPORTE As String, ByVal p_USUA_ID As String, ByVal p_ESTADO_IND As String,
                                             ByVal p_CANTIDAD_ORIGEN As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_DETALLE_NOTA_CREDITO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_CODE", p_NOCC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_NUM_SEQ_DOC", p_NOCC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_UNME_CODE", p_UNME_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD_DEVL", p_CANTIDAD_DEVL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_IMPORTE", p_ORIGEN_IMPORTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ORIGEN_PRECIO_UNIT", p_ORIGEN_PRECIO_UNIT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_SUBTOTAL", p_MONTO_SUBTOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD_ORIGEN", p_CANTIDAD_ORIGEN, ParameterDirection.Input, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarNotaCredito(ByVal p_NOCC_CODE As String, ByVal p_NOCC_NUM_SEQ_DOC As String, ByVal p_RAZON_SOCIAL As String,
                                           ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_PERS_PIDM As String,
                                            ByVal p_COMPRA_VENTA_IND As String, ByVal p_ANIO As String, ByVal p_MES As String,
                                            ByVal p_NUMERO As String, ByVal p_SERIE As String, ByVal p_ENTREGA_DESPACHO_ALMACEN As String, Optional ByVal p_DOC_ORIGEN_CODE As String = "") As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_NOTA_CREDITO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_CODE", p_NOCC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_NUM_SEQ_DOC", p_NOCC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERS_PIDM", p_PERS_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPRA_VENTA_IND", p_COMPRA_VENTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTREGA_DESPACHO_ALMACEN", p_ENTREGA_DESPACHO_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_ORIGEN_CODE", p_DOC_ORIGEN_CODE, ParameterDirection.Input, 253))

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

    Public Function ListarNotaCredito_2(ByVal p_NOCC_CODE As String, ByVal p_NOCC_NUM_SEQ_DOC As String, ByVal p_RAZON_SOCIAL As String,
                                           ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, p_HASTA As String, ByVal p_PERS_PIDM As String,
                                            ByVal p_COMPRA_VENTA_IND As String, ByVal p_ANIO As String, ByVal p_MES As String,
                                            ByVal p_NUMERO As String, ByVal p_SERIE As String, ByVal p_ENTREGA_DESPACHO_ALMACEN As String, Optional ByVal p_DOC_ORIGEN_CODE As String = "") As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_NOTA_CREDITO_2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_CODE", p_NOCC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_NUM_SEQ_DOC", p_NOCC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERS_PIDM", p_PERS_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPRA_VENTA_IND", p_COMPRA_VENTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTREGA_DESPACHO_ALMACEN", p_ENTREGA_DESPACHO_ALMACEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_ORIGEN_CODE", p_DOC_ORIGEN_CODE, ParameterDirection.Input, 253))

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

    Public Function ListarNotaCreditoCobro(ByVal p_CTLG_CODE As String, ByVal p_PERS_PIDM As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_NOTA_CREDITO_PAGO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERS_PIDM", p_PERS_PIDM, ParameterDirection.Input, 253))

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

    Public Function ListarDetallesNotaCredito(ByVal p_NOCC_CODE As String, ByVal p_NOCC_NUM_SEQ_DOC As String, _
                                  ByVal p_ITEM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_DETALLE_NOTA_CREDITO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_CODE", p_NOCC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_SEQ_NUM_DOC", p_NOCC_NUM_SEQ_DOC, ParameterDirection.Input, 253))
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

    Public Function ListarDetallesNotaCreditoNaminsa(ByVal p_NOCC_CODE As String, ByVal p_COMPRA_VENTA_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_DETALLE_NOTA_CREDITO_NAMINSA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_CODE", p_NOCC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPRA_VENTA_IND", p_COMPRA_VENTA_IND, ParameterDirection.Input, 253))
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

    Function AnularNotaCreditoCliente(ByVal p_NOCC_CODE As String, ByVal ANULAC_ID As String, ByVal CMNT_ANULAC As String,
                                       ByVal p_DEVOLUCION_EFECTIVO As String, ByVal p_DEVOLUCION_DESPACHO As String, Optional p_GENERICA_IND As String = "N") As String
        Dim msg As String
        Dim cmd As IDbCommand
        Try
            cmd = cn.GetNewCommand("PFB_ANULAR_NOTA_CREDITO_CLIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_CODE", p_NOCC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULAC_ID", ANULAC_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_ANULAC", CMNT_ANULAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEVOLUCION_EFECTIVO", p_DEVOLUCION_EFECTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEVOLUCION_DESPACHO", p_DEVOLUCION_DESPACHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERICA_IND", p_GENERICA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg = ex.Message
        End Try
        Return msg
    End Function

    Function AnularNotaCreditoProveedor(ByVal p_NOCC_CODE As String, ByVal ANULAC_ID As String, ByVal CMNT_ANULAC As String,
                                       ByVal p_DEVOLUCION_EFECTIVO As String, ByVal p_DEVOLUCION_DESPACHO As String, Optional p_GENERICA_IND As String = "N") As String
        Dim msg As String
        Dim cmd As IDbCommand
        Try
            cmd = cn.GetNewCommand("PFB_ANULAR_NOTA_CREDITO_PROVEEDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOCC_CODE", p_NOCC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANULAC_ID", ANULAC_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CMNT_ANULAC", CMNT_ANULAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEVOLUCION_EFECTIVO", p_DEVOLUCION_EFECTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEVOLUCION_DESPACHO", p_DEVOLUCION_DESPACHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERICA_IND", p_GENERICA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg = ex.Message
        End Try
        Return msg
    End Function

    'NOTA DE CREDITO GENÉRICA

    Public Function CrearNotaCreditoGenerica(
  ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_SERIE As String,
  ByVal p_NUMERO As String, ByVal p_FECHA_EMISION As String,
  ByVal p_PERS_PIDM As String, ByVal p_DCTO_REF_CODE As String, ByVal p_DCTO_REF_TIPO_CODE As String,
  ByVal p_MOTIVO_CODE As String, ByVal p_MOTIVO As String, ByVal p_MONE_CODE As String,
  ByVal p_TIPO_IND As String, ByVal p_IMPORTE_INAFECTO As String, ByVal p_IMPORTE_EXONERADA As String,
  ByVal p_IMPORTE_GRAVADA As String, ByVal p_IGV As String, ByVal p_IMPORTE_TOTAL As String,
  ByVal p_IGV_PORCENTAJE As String, ByVal p_USUA_ID As String,
  ByVal p_SCSL_EXONERADA_IND As String, ByVal p_VALOR_CAMBIO As String,
  ByVal p_MONTO_USABLE As String, ByVal p_MES_PERIODO As String, ByVal p_ANIO_PERIODO As String,
  ByVal p_COD_AUT As String, ByVal p_DETALLES As String
 ) As Array
        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_CREAR_NOTA_CREDITO_GENERICA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERS_PIDM", p_PERS_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_REF_CODE", p_DCTO_REF_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_REF_TIPO_CODE", p_DCTO_REF_TIPO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO_CODE", p_MOTIVO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INAFECTO", p_IMPORTE_INAFECTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXONERADA", p_IMPORTE_EXONERADA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRAVADA", p_IMPORTE_GRAVADA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_TOTAL", p_IMPORTE_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_PORCENTAJE", p_IGV_PORCENTAJE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_USABLE", p_MONTO_USABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES_PERIODO", p_MES_PERIODO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO_PERIODO", p_ANIO_PERIODO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_NRO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODE").Value
            msg(1) = cmd.Parameters("@p_SERIE_NRO").Value
            msg(2) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = ""
            msg(2) = ""
        End Try

        Return msg

    End Function

    'NOTA DE CREDITO GENÉRICA_2

    Public Function CrearNotaCreditoGenerica_2(
  ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_SERIE As String,
  ByVal p_NUMERO As String, ByVal p_FECHA_EMISION As String,
  ByVal p_PERS_PIDM As String, ByVal p_DCTO_REF_CODE As String, ByVal p_DCTO_REF_TIPO_CODE As String,
  ByVal p_MOTIVO_CODE As String, ByVal p_MOTIVO As String, ByVal p_MONE_CODE As String,
  ByVal p_TIPO_IND As String, ByVal p_IMPORTE_INAFECTO As String, ByVal p_IMPORTE_EXONERADA As String,
  ByVal p_IMPORTE_GRAVADA As String, ByVal p_IGV As String, ByVal p_IMPORTE_TOTAL As String,
  ByVal p_IGV_PORCENTAJE As String, ByVal p_USUA_ID As String,
  ByVal p_SCSL_EXONERADA_IND As String, ByVal p_VALOR_CAMBIO As String,
  ByVal p_MONTO_USABLE As String, ByVal p_MES_PERIODO As String, ByVal p_ANIO_PERIODO As String, ByVal p_DEVOLVER_DINERO As String,
  ByVal p_COD_AUT As String, ByVal p_DETALLES As String
 ) As Array
        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_CREAR_NOTA_CREDITO_GENERICA_2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE", p_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERS_PIDM", p_PERS_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_REF_CODE", p_DCTO_REF_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO_REF_TIPO_CODE", p_DCTO_REF_TIPO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO_CODE", p_MOTIVO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_INAFECTO", p_IMPORTE_INAFECTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_EXONERADA", p_IMPORTE_EXONERADA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_GRAVADA", p_IMPORTE_GRAVADA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV", p_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE_TOTAL", p_IMPORTE_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IGV_PORCENTAJE", p_IGV_PORCENTAJE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_EXONERADA_IND", p_SCSL_EXONERADA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALOR_CAMBIO", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_USABLE", p_MONTO_USABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES_PERIODO", p_MES_PERIODO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO_PERIODO", p_ANIO_PERIODO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEVOLVER_DINERO", p_DEVOLVER_DINERO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_AUT", p_COD_AUT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES", p_DETALLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_NRO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODE").Value
            msg(1) = cmd.Parameters("@p_SERIE_NRO").Value
            msg(2) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
            msg(1) = ""
            msg(2) = ""
        End Try

        Return msg

    End Function

    Public Function ListarNotaCreditoGenerica(ByVal p_NOGC_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                              ByVal p_PERS_PIDM As String, ByVal p_TIPO_IND As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_LISTAR_NOTA_CREDITO_GENERICA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOGC_CODE", p_NOGC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PERS_PIDM", p_PERS_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
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
    'Crea el QR con todos los parametros requeridos
    Public Function ListarParametrosQR(ByVal p_codigo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFM_MOSTRAR_QR_NCG", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOGC_CODE", p_codigo, ParameterDirection.Input, 253))

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
    'Gurda la imagen del QR convertida en texto base64 
    Public Function GuardarCodigoQR(ByVal p_CODE As String, ByVal p_IMGQR As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("GUARDAR_QR_NCG", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMGQR", p_IMGQR, ParameterDirection.Input, 253))

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

    Public Function ListarDetalleNotaCreditoGenerica(ByVal p_CODE As String, ByVal p_ITEM As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_LISTAR_DETALLE_NOTA_CREDITO_GENERICA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
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

    Public Function fnListarMotivosNCSunat(ByVal p_FTVMOSU_CODE As String, ByVal p_FTVMOSU_IND_ESTADO As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FTV_LISTAR_MOTIVOS_NC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVMOSU_CODE", p_FTVMOSU_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVMOSU_IND_ESTADO", p_FTVMOSU_IND_ESTADO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If dt Is Nothing Then
                Return Nothing
            ElseIf dt.Rows.Count = 0 Then
                Return Nothing
            Else
                Return dt
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarDocumentosNC(ByVal p_FTVDCTO_CODE As String, ByVal p_FTVDCTO_IND_ESTADO As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("FTV_LISTAR_DOCUMENTOS_NC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVDCTO_CODE", p_FTVDCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVDCTO_IND_ESTADO", p_FTVDCTO_IND_ESTADO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If dt Is Nothing Then
                Return Nothing
            ElseIf dt.Rows.Count = 0 Then
                Return Nothing
            Else
                Return dt
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class

Public Class CTMovimientoContable
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function fnAgregarMovCont(p_CTLG_CODE As String, p_SCSL_CODE As String, p_ANIO As String, p_MES As String, p_NCMOCONT_CODIGO As String,
                                     p_ASIENTO_IND As String, p_FECHA_EMI_DOC As String, p_FECHA_TRANSAC As String, p_GLOSA As String, p_MONE_CODE As String,
                                     p_TC As Decimal, p_PIDM As Integer, p_REF_CODE As String, p_USUA_ID As String, Optional p_FECHA As String = Nothing,
                                     Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_AgregarMovCont", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", Nothing, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NCMOCONT_CODIGO", p_NCMOCONT_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ASIENTO_IND", p_ASIENTO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMI_DOC", p_FECHA_EMI_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANSAC", p_FECHA_TRANSAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TC", p_TC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", IIf(p_PIDM = 0, Nothing, p_PIDM), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REF_CODE", p_REF_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Dim p_CODE As String = cmd.Parameters("@p_CODE").Value
            Return p_CODE
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnActualizarMovCont2(p_CTLG_CODE As String, p_SCSL_CODE As String, p_ANIO As String, p_MES As String, p_OPERACION As String,
                                     p_ASIENTO_IND As String, p_FECHA_EMISION As String, p_FECHA_TRANSACCION As String, p_DESCRIPCION As String, p_COD_MONEDA As String,
                                     p_VALOR_CAMBIO As Decimal, p_PIDM As String, p_REF_CODE As String, p_USUARIO As String, p_DETALLE_ASIENTO As String,
                                     p_COD_DOC_CLIENTE As String, p_DESC_DOC_CLIENTE As String, p_NRO_DOC_CLIENTE As String, p_COD_DOCUMENTO As String, p_DESC_DOCUMENTO As String,
                                     p_COD_SERIE As String, p_COD_NUMERO As String, p_OPERACION_ASIENTO As String, p_DECLARADO As String, p_OPORTUNIDAD_ANOTACION As String, p_CODE As String,
                                     Optional p_FECHA As String = Nothing, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_UPDATE_ASIENTO_UNICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NCMOCONT_CODIGO", p_OPERACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ASIENTO_IND", p_ASIENTO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMI_DOC", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANSAC", p_FECHA_TRANSACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_COD_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TC", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", IIf(p_PIDM = "", Nothing, p_PIDM), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REF_CODE", IIf(p_REF_CODE = "", Nothing, p_REF_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE_ASIENTO", p_DETALLE_ASIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_DOC_CLIENTE", p_COD_DOC_CLIENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_DOC_CLIENTE", p_DESC_DOC_CLIENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DOC_CLIENTE", p_NRO_DOC_CLIENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_DOCUMENTO", p_COD_DOCUMENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_DOCUMENTO", p_DESC_DOCUMENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_SERIE", p_COD_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_NUMERO", p_COD_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERACION_ASIENTO", p_OPERACION_ASIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DECLARADO", p_DECLARADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPORTUNIDAD_ANOTACION", p_OPORTUNIDAD_ANOTACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Dim p_RESP As String = cmd.Parameters("@p_RESP").Value
            Return p_RESP
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnAgregarMovCont2(p_CTLG_CODE As String, p_SCSL_CODE As String, p_ANIO As String, p_MES As String, p_OPERACION As String,
                                     p_ASIENTO_IND As String, p_FECHA_EMISION As String, p_FECHA_TRANSACCION As String, p_DESCRIPCION As String, p_COD_MONEDA As String,
                                     p_VALOR_CAMBIO As Decimal, p_PIDM As String, p_REF_CODE As String, p_USUARIO As String, p_DETALLE_ASIENTO As String,
                                     p_COD_DOC_CLIENTE As String, p_DESC_DOC_CLIENTE As String, p_NRO_DOC_CLIENTE As String, p_COD_DOCUMENTO As String, p_DESC_DOCUMENTO As String,
                                     p_COD_SERIE As String, p_COD_NUMERO As String, p_OPERACION_ASIENTO As String, p_DECLARADO As String, p_OPORTUNIDAD_ANOTACION As String,
                                     Optional p_FECHA As String = Nothing, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_AgregarMovCont2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", Nothing, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NCMOCONT_CODIGO", p_OPERACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ASIENTO_IND", p_ASIENTO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMI_DOC", p_FECHA_EMISION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANSAC", p_FECHA_TRANSACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_COD_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TC", p_VALOR_CAMBIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", IIf(p_PIDM = "", Nothing, p_PIDM), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REF_CODE", IIf(p_REF_CODE = "", Nothing, p_REF_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE_ASIENTO", p_DETALLE_ASIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_DOC_CLIENTE", p_COD_DOC_CLIENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_DOC_CLIENTE", p_DESC_DOC_CLIENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DOC_CLIENTE", p_NRO_DOC_CLIENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_DOCUMENTO", p_COD_DOCUMENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_DOCUMENTO", p_DESC_DOCUMENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_SERIE", p_COD_SERIE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_NUMERO", p_COD_NUMERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERACION_ASIENTO", p_OPERACION_ASIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DECLARADO", p_DECLARADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPORTUNIDAD_ANOTACION", p_OPORTUNIDAD_ANOTACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Dim p_CODE As String = cmd.Parameters("@p_CODE").Value
            Return p_CODE
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnLISTAR_ASIENTOS_CONTABLES(p_CTLG_CODE As String,
                                           p_SCSL_CODE As String,
                                           Optional p_FECHA_INI_EMI As String = Nothing,
                                           Optional p_FECHA_FIN_EMI As String = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListarCabAsientos", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INI_EMI", p_FECHA_INI_EMI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN_EMI", p_FECHA_FIN_EMI, ParameterDirection.Input, 253))

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

    Public Sub fnAgregarMovContabDet(p_MOVCONT_CODE As String, p_ITEM As Integer, p_ITEM_TIPO As String, p_GLOSA As String, p_PIDM As Integer, p_COD_DOC_IDENT As String,
                                     p_COD_SUNAT_DOC_IDENT As String, p_DOC_IDENT As String, p_NRO_DOC_IDENT As String, p_COD_CCOSTO_CAB As String, p_COD_CCOSTO_DET As String,
                                     p_CCOSTO As String, p_COD_DCTO As String, p_COD_SUNAT_DCTO As String, p_DCTO As String, p_SERIE_DCTO As String, p_NRO_DCTO As String,
                                     p_FECHA_DCTO As String, p_COD_MONE As String, p_COD_SUNAT_MONE As String, p_FTVCTAS_ID As String, p_CTAS_CODE As String, p_TC As Decimal,
                                     p_DEBE As Decimal, p_HABER As Decimal, p_DEBE_MN As Decimal, p_HABER_MN As Decimal, p_DEBE_ME As Decimal, p_HABER_ME As Decimal,
                                     Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_AgregarMovContabDet", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", p_MOVCONT_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM_TIPO", p_ITEM_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_DOC_IDENT", p_COD_DOC_IDENT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_SUNAT_DOC_IDENT", p_COD_SUNAT_DOC_IDENT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_IDENT", p_DOC_IDENT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DOC_IDENT", p_NRO_DOC_IDENT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_CCOSTO_CAB", p_COD_CCOSTO_CAB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_CCOSTO_DET", p_COD_CCOSTO_DET, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CCOSTO", p_CCOSTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_DCTO", p_COD_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_SUNAT_DCTO", p_COD_SUNAT_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DCTO", p_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SERIE_DCTO", p_SERIE_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DCTO", p_NRO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_DCTO", p_FECHA_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_MONE", p_COD_MONE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_SUNAT_MONE", p_COD_SUNAT_MONE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_ID", p_FTVCTAS_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_CODE", p_CTAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TC", p_TC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEBE", p_DEBE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HABER", p_HABER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEBE_MN", p_DEBE_MN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HABER_MN", p_HABER_MN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEBE_ME", p_DEBE_ME, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HABER_ME", p_HABER_ME, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub


    Public Function fnGetConfigAsientoDocCompra(p_CodDocCompra As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetConfigAsientoCompra", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@CodDocCompra", p_CodDocCompra, ParameterDirection.Input, 253))

            Dim oDT As DataTable
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

    Public Function fnGetConfigAsientoGasto(p_CodGasto As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetConfigAsientoGasto", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@CodGasto", p_CodGasto, ParameterDirection.Input, 253))

            Dim oDT As DataTable
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

    Public Function fnGetConfigAsientoDocVenta(p_CodDocVenta As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetConfigAsientoVenta", CommandType.StoredProcedure) 'SpCon_GetConfigAsientoVenta2
            cmd.Parameters.Add(cn.GetNewParameter("@CodDocVenta", p_CodDocVenta, ParameterDirection.Input, 253))

            Dim oDT As DataTable
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

    Public Function fnGetConfigAsientoDocAnticipo(p_CodDocAnticipo As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetConfigAsientoAnticipo", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@CodDocAnticipo", p_CodDocAnticipo, ParameterDirection.Input, 253))

            Dim oDT As DataTable
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

    Public Function fnGetConfigAsientoDocAnticipo_Inv(p_CodDocAnticipo As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetConfigAsientoAnticipo_Inv", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@CodDocAnticipo", p_CodDocAnticipo, ParameterDirection.Input, 253))

            Dim oDT As DataTable
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

    Public Function fnGetAsientoContDocCompra(p_CodDocCompra As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetAsientoContDocCompra ", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@CodDocCompra", p_CodDocCompra, ParameterDirection.Input, 253))

            Dim oDT As DataTable
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



    Public Function fnGetAsientoContDocGasto(p_CodDocGasto As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetAsientoContGasto ", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@CodDocGasto", p_CodDocGasto, ParameterDirection.Input, 253))

            Dim oDT As DataTable
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


    Public Function fnGetAsientoContDocVenta(p_CodDocVenta As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetAsientoContDocVenta", CommandType.StoredProcedure) 'SpCon_GetAsientoContDocVenta2
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocVenta", p_CodDocVenta, ParameterDirection.Input, 253))

            Dim oDT As DataTable
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

    Public Function fnGetAsientoContDocAnticipo(p_CodDocAnticipo As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetAsientoContAnticipo", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocAnticipo", p_CodDocAnticipo, ParameterDirection.Input, 253))

            Dim oDT As DataTable
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

    Public Function fnGetAsientoContDocAnticipo_Inv(p_CodDocAnticipo As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetAsientoContAnticipo_Inv", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocAnticipo", p_CodDocAnticipo, ParameterDirection.Input, 253))

            Dim oDT As DataTable
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
    Public Function fnListarTipoMovAlmacen(p_CODE As String, p_TIPO_MOV As String, p_ESTADO_IND As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_TIPO_MOV_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", IIf(p_CODE.Equals(""), DBNull.Value, p_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_MOV", IIf(p_TIPO_MOV.Equals(""), DBNull.Value, p_TIPO_MOV), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", IIf(p_ESTADO_IND.Equals(""), DBNull.Value, p_ESTADO_IND), ParameterDirection.Input, 253))

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

    Public Sub fnEliminarCtasxTipoMovAlmac(p_FTVTEXI_CODE As String, p_FTVTMOV_CODE As String, p_PROD_CODE As String,
                                           Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_EliminarCtasxTipoMovAlmac", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVTEXI_CODE", p_FTVTEXI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVTMOV_CODE", p_FTVTMOV_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Sub fnAgregarCtasxTipoMovAlmac(p_FTVTEXI_CODE As String, p_FTVTMOV_CODE As String, p_PROD_CODE As String, p_CTAS_ID_DEBE As String,
                                          p_CUENTA_DEBE As String, p_CTAS_ID_HABER As String, p_CUENTA_HABER As String, p_USER_CREA As String,
                                          Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing)
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_AgregarCtasxTipoMovAlmac", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVTEXI_CODE", p_FTVTEXI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVTMOV_CODE", p_FTVTMOV_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_ID_DEBE", p_CTAS_ID_DEBE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_DEBE", p_CUENTA_DEBE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_ID_HABER", p_CTAS_ID_HABER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_HABER", p_CUENTA_HABER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USER_CREA", p_USER_CREA, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function fnListarCtasxTipoMovAlmac(p_FTVTEXI_CODE As String, p_FTVTMOV_CODE As String, p_PROD_CODE As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListarCtasxTipoMovAlmac", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVTEXI_CODE", IIf(p_FTVTEXI_CODE.Equals(""), DBNull.Value, p_FTVTEXI_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVTMOV_CODE", IIf(p_FTVTMOV_CODE.Equals(""), DBNull.Value, p_FTVTMOV_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", IIf(p_PROD_CODE.Equals(""), DBNull.Value, p_PROD_CODE), ParameterDirection.Input, 253))

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

    Public Function ListaMovimientoContable(p_CODE As String, p_CTLG_CODE As String, p_SCSL_CODE As String, p_MONE_CODE As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListarMovCont", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", IIf(p_CODE.Equals(""), DBNull.Value, p_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", IIf(p_CTLG_CODE.Equals(""), DBNull.Value, p_CTLG_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL", IIf(p_SCSL_CODE.Equals(""), DBNull.Value, p_SCSL_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", IIf(p_MONE_CODE.Equals(""), DBNull.Value, p_MONE_CODE), ParameterDirection.Input, 253))

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

    Public Function VerificarAsientoContable(p_CODE As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_VerificarMovCont", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", IIf(p_CODE.Equals(""), DBNull.Value, p_CODE), ParameterDirection.Input, 253))

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

    Public Function SpCon_ListarMovContDet(p_CODE As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListarMovContDet", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", IIf(p_CODE.Equals(""), DBNull.Value, p_CODE), ParameterDirection.Input, 253))


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

    Public Function fnGetConfigAsientoDocAlmacen(p_CodDoc As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetConfigAsientoAlmacen", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_CODE", p_CodDoc, ParameterDirection.Input, 253))

            Dim oDT As DataTable
            If oTransaction Is Nothing Then
                oDT = cn.Consulta(cmd)
            Else
                oDT = oTransaction.fnExecute_GetDataTable_StoreProcedure(cmd)
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

    Public Function fnGetAsientoContDocAlmacen(p_CodDoc As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetAsientoContDocAlmacen", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_CODE", p_CodDoc, ParameterDirection.Input, 253))

            Dim oDT As DataTable
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

    Public Function fnGetConfigAsientoDocAlmacenRapida(p_CodDoc As String, p_AlmDoc As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetConfigAsientoAlmacenRapida", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_CODE", p_CodDoc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ALMC", p_AlmDoc, ParameterDirection.Input, 253))
            Dim oDT As DataTable
            If oTransaction Is Nothing Then
                oDT = cn.Consulta(cmd)
            Else
                oDT = oTransaction.fnExecute_GetDataTable_StoreProcedure(cmd)
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

    Public Function fnGetAsientoContDocAlmacenRapida(p_CodDoc As String, p_AlmDoc As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GetAsientoContDocAlmacenRapida", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_CODE", p_CodDoc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_ALMC", p_AlmDoc, ParameterDirection.Input, 253))
            Dim oDT As DataTable
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

    Public Function fnGenerarAsientoAnticipo(p_CodAnticipo As String, p_CodModulo As String, p_Usuario As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoAnticipo", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodAnticipo", p_CodAnticipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodModulo", p_CodModulo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Usuario", p_Usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnGenerarAsientoCobroAnticipo(p_CodAnticipo As String, p_AsientoCobro As String, p_PagadoInd As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoCobroAnticipo", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodAnticipo", p_CodAnticipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AsientoCobro", p_AsientoCobro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PagadoInd", p_PagadoInd, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnGenerarAsientoGasto(p_CodDocGasto As String, p_CodModulo As String, p_Usuario As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoGasto", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocGasto", p_CodDocGasto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodModulo", p_CodModulo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Usuario", p_Usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnGenerarAsientoGastoDestino(p_CodDocGasto As String, p_CodModulo As String, p_Usuario As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoGastoDestino", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocGasto", p_CodDocGasto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodModulo", p_CodModulo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Usuario", p_Usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnGenerarAsientoVenta(p_CodDocVenta As String, p_CodModulo As String, p_Usuario As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoVenta", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocVenta", p_CodDocVenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodModulo", p_CodModulo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Usuario", p_Usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnGenerarAsientoCobroDocVenta(p_CodDocVenta As String, p_AsientoCobro As String, p_PagadoInd As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoCobroDocVenta", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocVenta", p_CodDocVenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AsientoCobro", p_AsientoCobro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PagadoInd", p_PagadoInd, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function FnGenerarAsientoCobroDetraccionDocVenta(p_CodDetracCode As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoCobroDocVentaDetrac", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDetrac", p_CodDetracCode, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function FnGenerarAsientoPagoGasto(p_CodGasto As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoPagoGasto", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodGasto", p_CodGasto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function FnGenerarAsientoPagoDocCompra(p_CodDocCompra As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoPagoDocCompra", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDocCompra", p_CodDocCompra, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function GenerarAsientoNotaCreditoCliente(p_CodNC As String, p_Usuario As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoNotaCreditoCliente", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodNC", p_CodNC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_Usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function GenerarAsientoNotaCreditoGenericaCliente(p_CodNC As String, p_Usuario As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoNotaCreditoGenericaCliente", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodNC", p_CodNC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_Usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function GenerarAsientoNotaCreditoProveedor(p_CodNC As String, p_Usuario As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoNotaCreditoProveedor", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodNC", p_CodNC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_Usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function GenerarAsientoNotaCreditoGenericaProveedor(p_CodNC As String, p_Usuario As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoNotaCreditoGenericaProveedor", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodNC", p_CodNC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_Usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function GenerarAsientoMovBancario(p_CodMovBanc As String, p_CTLG As String, p_Usuario As String, p_tope As String, p_CTA10 As String, p_PIDM As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoMovBancario", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodMovBanc", p_CodMovBanc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_Usuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_OPERACION", p_tope, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA10", p_CTA10, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function GenerarAsientoCierrePos(p_CodMovBanc As String, p_CodMovPos As String, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoPOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodMovBanc", p_CodMovBanc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodMovPos", p_CodMovPos, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function GenerarAsientoITF(Optional p_CodMovBanc As String = "", Optional ByVal p_CodMovPos As String = "",
                                      Optional ByVal p_CodDoc As String = "", Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_GenerarAsientoITF", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodMovBanc", p_CodMovBanc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodMovPos", p_CodMovPos, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodDoc", p_CodDoc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOVCONT_CODE", Nothing, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Return cmd.Parameters("@p_MOVCONT_CODE").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
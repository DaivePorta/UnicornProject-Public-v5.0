Imports System.Globalization

Public Class CTGeneracionAsientos
    Public Function AsientoVenta(ByVal p_CodDocVenta As String, ByVal p_CodModulo As String, ByVal p_Usuario As String) As String
        Dim oTransaction As New Nomade.DataAccess.Transaccion()

        Try
            Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")
            Dim nvVenta As New Nomade.NV.NVVenta("Bn")

            'INICIO ASIENTO DE VENTA
            Dim oNCParametros As New Nomade.NC.NCParametros("Bn")
            Dim oDT_Param As New DataTable()
            oDT_Param = oNCParametros.ListarParametros("ECON", "")
            If oDT_Param Is Nothing Then
                Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
            End If
            If oDT_Param.Rows.Count = 0 Then
                Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
            End If
            Dim sUsaContab As String = oDT_Param.Rows(0)("VALOR")
            If Not sUsaContab.Equals("S") Then
                Throw New System.Exception("[Advertencia]: La empresa no tiene la opción contable activada.")
            End If

            Dim oDT_ConfigAsientoDocVenta As New DataTable
            oDT_ConfigAsientoDocVenta = oCTMovimientoContable.fnGetConfigAsientoDocVenta(p_CodDocVenta)
            Dim oDT_Asiento As New DataTable
            oDT_Asiento = oCTMovimientoContable.fnGetAsientoContDocVenta(p_CodDocVenta)

            If oDT_Asiento Is Nothing Then
                Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. No se pudo obtener la configuración del asiento contable.")
            End If

            Dim sCodMovCont As String = ""

            Dim oDT_DocVenta As New DataTable
            oDT_DocVenta = nvVenta.fnGetDocVta(p_CodDocVenta)
            If oDT_DocVenta Is Nothing Then
                Throw New System.Exception("No se pudo generar el Asiento Contable. No se encontró el documento de venta.")
            End If

            Dim oDR_DocVenta As DataRow = oDT_DocVenta.NewRow
            oDR_DocVenta = oDT_DocVenta.Rows(0)

            Dim sAnuladoInd As String = oDR_DocVenta("AnuladoInd")
            If sAnuladoInd.Equals("S") Then
                Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de venta está anulado.")
            End If

            Dim sCompletoInd As String = oDR_DocVenta("CompletoInd")
            If sCompletoInd.Equals("N") Then
                Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de venta no está completado.")
            End If

            Dim nMontoDetraccion As Decimal = oDR_DocVenta("MontoDetrac")

            oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

            Dim sFechaEmision As String = fechaLocal(oDR_DocVenta("FECHA_EMISION"))
            Dim sFechaTransac As String = fechaLocal(oDR_DocVenta("FECHA_TRANS"))
            sCodMovCont = oCTMovimientoContable.fnAgregarMovCont(oDR_DocVenta("CodEmpresa"), oDR_DocVenta("CodEstablec"), oDR_DocVenta("ANIO_PERIODO"),
                                                                         oDR_DocVenta("MES_PERIODO"), p_CodModulo, "A", sFechaEmision, sFechaTransac,
                                                                         oDR_DocVenta("GLOSA"), oDR_DocVenta("MONE_CODE"), oDR_DocVenta("TC"), oDR_DocVenta("PIDM"),
                                                                         oDR_DocVenta("CodVenta"), p_Usuario,, oTransaction)

            Dim sCodProducto As String = ""

            Dim iItem As Integer = 0
            Dim sFechaDoc As String
            For Each oDR As DataRow In oDT_Asiento.Rows
                iItem = iItem + 1
                sFechaDoc = fechaLocal(oDR("FECHA_DCTO"))
                Dim sCOD_CCOSTO_CAB As String = IIf(IsDBNull(oDR("COD_CCOSTO_CAB")), Nothing, oDR("COD_CCOSTO_CAB"))
                Dim sCOD_CCOSTO_DET As String = IIf(IsDBNull(oDR("COD_CCOSTO_DET")), Nothing, oDR("COD_CCOSTO_DET"))
                oCTMovimientoContable.fnAgregarMovContabDet(sCodMovCont, iItem, oDR("ITEM_TIPO"), oDR("GLOSA"), oDR("PIDM"), oDR("COD_DOC_IDENT"), oDR("COD_SUNAT_DOC_IDENT"),
                                                                    oDR("DOC_IDENT"), oDR("NRO_DOC_IDENT"), sCOD_CCOSTO_CAB, sCOD_CCOSTO_DET, oDR("CCOSTO"), oDR("COD_DCTO"),
                                                                    oDR("COD_SUNAT_DCTO"), oDR("DCTO"), oDR("SERIE_DCTO"), oDR("NRO_DCTO"), sFechaDoc, oDR("COD_MONE"),
                                                                    oDR("COD_SUNAT_MONE"), oDR("CTA_ID"), oDR("CTA"), oDR("TC"), oDR("DEBE"), oDR("HABER"),
                                                                    oDR("DEBE_MN"), oDR("HABER_MN"), oDR("DEBE_ME"), oDR("HABER_ME"), oTransaction)
            Next

            nvVenta.fnActualizarCodContabDocVenta(p_CodDocVenta, sCodMovCont, oTransaction)

            oTransaction.fnCommitTransaction()

            Return sCodMovCont
            'FIN ASIENTO DE VENTA
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
        End Try
        Return ""
    End Function

    Public Function AsientoVentaAplicacionAnticipo(ByVal p_CodDocVenta As String, ByVal p_Usuario As String) As List(Of String)
        Dim oTransaction As New Nomade.DataAccess.Transaccion()
        Try
            Dim listResult As New List(Of String)

            Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")
            Dim nvVenta As New Nomade.NV.NVVenta("Bn")

            Dim oDT_DocVenta As New DataTable
            oDT_DocVenta = nvVenta.fnGetDocVta(p_CodDocVenta)
            If oDT_DocVenta Is Nothing Then
                Throw New System.Exception("No se pudo generar el Asiento Contable. No se encontró el documento de venta.")
            End If
            Dim oDR_DocVenta As DataRow = oDT_DocVenta.NewRow
            oDR_DocVenta = oDT_DocVenta.Rows(0)

            Dim dtDetalles As New DataTable 'CAMBIO AVENGER: PARA PODER REALIZAR LA APLICACIÓN DEL ANTICIPO
            dtDetalles = nvVenta.ListarDetalleDocumentoVenta(p_CodDocVenta, "0", "")

            For Each row In dtDetalles.Rows
                Dim codAnti As String = row("PROD_CODE").ToString()
                Dim codAntiT As String = Mid(codAnti, 1, 2)
                If codAntiT = "AP" Then

                    Dim oNCParametros2 As New Nomade.NC.NCParametros("Bn")
                    Dim oDT_Param2 As New DataTable()
                    oDT_Param2 = oNCParametros2.ListarParametros("ECON", "")
                    If oDT_Param2 Is Nothing Then
                        Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    End If
                    If oDT_Param2.Rows.Count = 0 Then
                        Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    End If
                    Dim sUsaContab2 As String = oDT_Param2.Rows(0)("VALOR")
                    If Not sUsaContab2.Equals("S") Then
                        Throw New System.Exception("[Advertencia]: La empresa no tiene la opción contable activada.")
                    End If

                    Dim oCTMovimientoContable2 As New Nomade.CT.CTMovimientoContable("Bn")

                    Dim oDT_ConfigAsientoDocVenta2 As New DataTable
                    oDT_ConfigAsientoDocVenta2 = oCTMovimientoContable2.fnGetConfigAsientoDocAnticipo_Inv(codAnti) 'CAMBIO DPORTA
                    Dim oDT_Asiento2 As New DataTable
                    oDT_Asiento2 = oCTMovimientoContable2.fnGetAsientoContDocAnticipo_Inv(codAnti) 'CAMBIO DPORTA

                    Dim oDT_DocVenta2 As New DataTable
                    oDT_DocVenta2 = nvVenta.fnGetDocAnti(codAnti)
                    If oDT_DocVenta2 Is Nothing Then
                        Throw New System.Exception("No se pudo generar el Asiento Contable. No se encontró el documento de anticipo.")
                    End If

                    Dim oDR_DocVenta2 As DataRow = oDT_DocVenta.NewRow
                    oDR_DocVenta2 = oDT_DocVenta2.Rows(0)

                    Dim sAnuladoInd2 As String = oDR_DocVenta2("AnuladoInd")
                    If sAnuladoInd2.Equals("S") Then
                        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de anticipo está anulado.")
                    End If

                    Dim sCompletoInd2 As String = oDR_DocVenta2("CompletoInd")
                    If sCompletoInd2.Equals("N") Then
                        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de anticipo no está completado.")
                    End If

                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    Dim sFechaEmision2 As String = fechaLocal(oDR_DocVenta("FECHA_EMISION")) 'CAMBIO
                    Dim sFechaTransac2 As String = fechaLocal(oDR_DocVenta("FECHA_TRANS")) 'CAMBIO

                    Dim sCodMovCont As String = ""
                    sCodMovCont = oCTMovimientoContable2.fnAgregarMovCont(oDR_DocVenta2("CodEmpresa"), oDR_DocVenta2("CodEstablec"), oDR_DocVenta2("ANIO_PERIODO"),
                                                                            oDR_DocVenta2("MES_PERIODO"), "0012", "A", sFechaEmision2, sFechaTransac2,
                                                                            oDR_DocVenta2("GLOSA"), oDR_DocVenta2("MONE_CODE"), oDR_DocVenta2("TC"), oDR_DocVenta2("PIDM"),
                                                                            p_CodDocVenta, p_Usuario,, oTransaction)

                    If oDT_Asiento2 Is Nothing Then
                        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. No se pudo obtener la configuración del asiento contable.")
                    End If

                    Dim iItem2 As Integer = 0
                    Dim sFechaDoc2 As String
                    For Each oDR2 As DataRow In oDT_Asiento2.Rows
                        iItem2 = iItem2 + 1
                        sFechaDoc2 = fechaLocal(oDR2("FECHA_DCTO"))
                        Dim sCOD_CCOSTO_CAB2 As String = IIf(IsDBNull(oDR2("COD_CCOSTO_CAB")), Nothing, oDR2("COD_CCOSTO_CAB"))
                        Dim sCOD_CCOSTO_DET2 As String = IIf(IsDBNull(oDR2("COD_CCOSTO_DET")), Nothing, oDR2("COD_CCOSTO_DET"))
                        oCTMovimientoContable2.fnAgregarMovContabDet(sCodMovCont, iItem2, oDR2("ITEM_TIPO"), oDR2("GLOSA"), oDR2("PIDM"), oDR2("COD_DOC_IDENT"), oDR2("COD_SUNAT_DOC_IDENT"),
                                                                    oDR2("DOC_IDENT"), oDR2("NRO_DOC_IDENT"), sCOD_CCOSTO_CAB2, sCOD_CCOSTO_DET2, oDR2("CCOSTO"), oDR2("COD_DCTO"),
                                                                    oDR2("COD_SUNAT_DCTO"), oDR2("DCTO"), oDR2("SERIE_DCTO"), oDR2("NRO_DCTO"), sFechaDoc2, oDR2("COD_MONE"),
                                                                    oDR2("COD_SUNAT_MONE"), oDR2("CTA_ID"), oDR2("CTA"), oDR2("TC"), oDR2("DEBE"), oDR2("HABER"),
                                                                    oDR2("DEBE_MN"), oDR2("HABER_MN"), oDR2("DEBE_ME"), oDR2("HABER_ME"), oTransaction)
                    Next

                    oTransaction.fnCommitTransaction()

                    listResult.Add(sCodMovCont)
                    'FIN APLICACIÓN ASIENTO ANTICIPO
                End If
            Next
            Return listResult
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
        End Try
        Return New List(Of String)
    End Function

    Public Function AsientoVentaAlmacen(ByVal p_CodDocVenta As String, ByVal p_Usuario As String) As String
        Dim oTransaction As New Nomade.DataAccess.Transaccion()
        Try
            Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")
            Dim nvVenta As New Nomade.NV.NVVenta("Bn")

            Dim sCodMovCont As String = ""

            Dim oDT_DocVenta As New DataTable
            oDT_DocVenta = nvVenta.fnGetDocVta(p_CodDocVenta)
            If oDT_DocVenta Is Nothing Then
                Throw New System.Exception("No se pudo generar el Asiento Contable. No se encontró el documento de venta.")
            End If

            Dim oDR_DocVenta As DataRow = oDT_DocVenta.NewRow
            oDR_DocVenta = oDT_DocVenta.Rows(0)

            'INICIO ASIENTO DE ALMACÉN
            Dim oCTMovimientoContableR As New Nomade.CT.CTMovimientoContable("Bn")
            Dim oDT_ConfigAsientoDocAlmacenR As New DataTable
            oDT_ConfigAsientoDocAlmacenR = oCTMovimientoContableR.fnGetConfigAsientoDocAlmacenRapida(p_CodDocVenta, oDR_DocVenta("CodEstablec")) 'CAMBIO DPORTA

            Dim oDT_AsientoR As New DataTable
            oDT_AsientoR = oCTMovimientoContableR.fnGetAsientoContDocAlmacenRapida(p_CodDocVenta, oDR_DocVenta("CodEstablec")) 'CAMBIO DPORTA

            If oDT_ConfigAsientoDocAlmacenR IsNot Nothing Or oDT_AsientoR IsNot Nothing Then 'DPORTA
                Dim sCodMovContR As String = ""

                oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                Dim sFechaEmisionR As String = fechaLocal(oDR_DocVenta("FECHA_EMISION"))
                Dim sFechaTransacR As String = fechaLocal(oDR_DocVenta("FECHA_TRANS"))
                sCodMovContR = oCTMovimientoContableR.fnAgregarMovCont(oDR_DocVenta("CodEmpresa"), oDR_DocVenta("CodEstablec"), oDR_DocVenta("ANIO_PERIODO"),
                                                                                 oDR_DocVenta("MES_PERIODO"), "0004", "A", sFechaEmisionR, sFechaTransacR,
                                                                                 oDR_DocVenta("GLOSA"), oDR_DocVenta("MONE_CODE"), oDR_DocVenta("TC"), oDR_DocVenta("PIDM"),
                                                                                 oDR_DocVenta("CodVenta"), p_Usuario,, oTransaction)


                Dim sCodProductoR As String = ""
                For Each oDRR As DataRow In oDT_ConfigAsientoDocAlmacenR.Rows
                    sCodProductoR = oDRR("PROD_CODE")
                    If IsDBNull(oDRR("CTA_ID_DEBE")) Then
                        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El producto '" + sCodProductoR + "' no tiene configuración contable, para asiento de almacén.")
                    End If
                Next

                If oDT_AsientoR Is Nothing Then
                    Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. No se pudo obtener la configuración del asiento contable.")
                End If

                Dim iItemR As Integer = 0
                Dim sFechaDocR As String
                For Each oDRR As DataRow In oDT_AsientoR.Rows
                    iItemR = iItemR + 1
                    sFechaDocR = fechaLocal(oDRR("FECHA_DCTO"))
                    Dim sCOD_CCOSTO_CAB_R As String = IIf(IsDBNull(oDRR("COD_CCOSTO_CAB")), Nothing, oDRR("COD_CCOSTO_CAB"))
                    Dim sCOD_CCOSTO_DET_R As String = IIf(IsDBNull(oDRR("COD_CCOSTO_DET")), Nothing, oDRR("COD_CCOSTO_DET"))
                    oCTMovimientoContableR.fnAgregarMovContabDet(sCodMovContR, iItemR, oDRR("ITEM_TIPO"), oDRR("GLOSA"), oDRR("PIDM"), oDRR("COD_DOC_IDENT"), oDRR("COD_SUNAT_DOC_IDENT"),
                                                                            oDRR("DOC_IDENT"), oDRR("NRO_DOC_IDENT"), sCOD_CCOSTO_CAB_R, sCOD_CCOSTO_DET_R, oDRR("CCOSTO"), oDRR("COD_DCTO"),
                                                                            oDRR("COD_SUNAT_DCTO"), oDRR("DCTO"), oDRR("SERIE_DCTO"), oDRR("NRO_DCTO"), sFechaDocR, oDRR("COD_MONE"),
                                                                            oDRR("COD_SUNAT_MONE"), oDRR("CTA_ID"), oDRR("CTA"), oDRR("TC"), oDRR("DEBE"), oDRR("HABER"),
                                                                            oDRR("DEBE_MN"), oDRR("HABER_MN"), oDRR("DEBE_ME"), oDRR("HABER_ME"), oTransaction)
                Next

                oTransaction.fnCommitTransaction()

                Return sCodMovContR
            End If
            'FIN APLICACIÓN ASIENTO ANTICIPO
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
        End Try
        Return ""
    End Function

    Public Function GenerarAsientoCobroDocVenta(ByVal p_CodDocVenta As String) As String
        Dim oTransaction As New Nomade.DataAccess.Transaccion()
        Try
            Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")

            Dim sCodMovCont As String = ""

            oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

            sCodMovCont = oCTMovimientoContable.fnGenerarAsientoCobroDocVenta(p_CodDocVenta, oTransaction)

            oTransaction.fnCommitTransaction()

            Return sCodMovCont
            'FIN ASIENTO DE VENTA
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
        End Try
        Return ""
    End Function

    Public Function GenerarAsientoCobroDetraccionDocVenta(ByVal p_CodDetracCode As String) As String
        Dim oTransaction As New Nomade.DataAccess.Transaccion()
        Try
            Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")

            Dim sCodMovCont As String = ""

            oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

            sCodMovCont = oCTMovimientoContable.FnGenerarAsientoCobroDetraccionDocVenta(p_CodDetracCode, oTransaction)

            oTransaction.fnCommitTransaction()

            Return sCodMovCont
            'FIN ASIENTO DE VENTA
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
        End Try
        Return ""
    End Function

    Public Function GenerarAsientoPagoGasto(strCodGasto As String) As String
        Dim oTransaction As New Nomade.DataAccess.Transaccion()
        Try
            Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")

            Dim sCodMovCont As String = ""

            oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

            sCodMovCont = oCTMovimientoContable.FnGenerarAsientoPagoGasto(strCodGasto, oTransaction)

            oTransaction.fnCommitTransaction()

            Return sCodMovCont
            'FIN ASIENTO DE GASTO
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
        End Try
        Return ""
    End Function

    Public Function GenerarAsientoPagoDocCompra(p_CodDocCompra As String) As String
        Dim oTransaction As New Nomade.DataAccess.Transaccion()
        Try
            Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")

            Dim sCodMovCont As String = ""

            oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

            sCodMovCont = oCTMovimientoContable.FnGenerarAsientoPagoDocCompra(p_CodDocCompra, oTransaction)

            oTransaction.fnCommitTransaction()

            Return sCodMovCont
            'FIN ASIENTO DE PAGO COMPRA
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
        End Try
        Return ""
    End Function

    Public Function GenerarAsientoNotaCreditoCliente(p_CodNC As String, p_Usuario As String) As String
        Dim oTransaction As New Nomade.DataAccess.Transaccion()
        Try
            Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")

            Dim sCodMovCont As String = ""

            oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

            sCodMovCont = oCTMovimientoContable.GenerarAsientoNotaCreditoCliente(p_CodNC, p_Usuario, oTransaction)

            oTransaction.fnCommitTransaction()

            Return sCodMovCont
            'FIN ASIENTO DE PAGO COMPRA
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
        End Try
        Return ""
    End Function

    Public Function GenerarAsientoNotaCreditoGenericaCliente(p_CodNC As String, p_Usuario As String) As String
        Dim oTransaction As New Nomade.DataAccess.Transaccion()
        Try
            Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")

            Dim sCodMovCont As String = ""

            oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

            sCodMovCont = oCTMovimientoContable.GenerarAsientoNotaCreditoGenericaCliente(p_CodNC, p_Usuario, oTransaction)

            oTransaction.fnCommitTransaction()

            Return sCodMovCont
            'FIN ASIENTO DE PAGO COMPRA
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
        End Try
        Return ""
    End Function

    Public Function GenerarAsientoNotaCreditoProveedor(p_CodNC As String, p_Usuario As String) As String
        Dim oTransaction As New Nomade.DataAccess.Transaccion()
        Try
            Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")

            Dim sCodMovCont As String = ""

            oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

            sCodMovCont = oCTMovimientoContable.GenerarAsientoNotaCreditoProveedor(p_CodNC, p_Usuario, oTransaction)

            oTransaction.fnCommitTransaction()

            Return sCodMovCont
            'FIN ASIENTO DE PAGO COMPRA
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
        End Try
        Return ""
    End Function

    Public Function GenerarAsientoNotaCreditoGenericaProveedor(p_CodNC As String, p_Usuario As String) As String
        Dim oTransaction As New Nomade.DataAccess.Transaccion()
        Try
            Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")

            Dim sCodMovCont As String = ""

            oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

            sCodMovCont = oCTMovimientoContable.GenerarAsientoNotaCreditoGenericaProveedor(p_CodNC, p_Usuario, oTransaction)

            oTransaction.fnCommitTransaction()

            Return sCodMovCont
            'FIN ASIENTO DE PAGO COMPRA
        Catch ex As Exception
            If oTransaction.iTransactionState = Nomade.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
        End Try
        Return ""
    End Function


    Public Shared Function fechaLocal(ByVal fecha As String) As String

        If fecha <> String.Empty Then
            Dim fechaConvertida As DateTime
            DateTime.TryParseExact(fecha, "dd/MM/yyyy", CultureInfo.CurrentCulture, DateTimeStyles.None, fechaConvertida)
            Return fechaConvertida.ToString("yyyy/MM/dd")
        Else
            Return "0000/00/00"
        End If

    End Function
End Class

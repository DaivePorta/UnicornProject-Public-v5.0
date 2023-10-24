<%@ WebHandler Language="VB" Class="CPMAGAS" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPMAGAS : Implements IHttpHandler
    Dim OPCION As String
    Dim p_CODE_REF_GASTO, p_CODIGO, p_SERIE, p_CENTRO_COSTO_CABECERA, p_IND_COMPRAS,
        p_CENTRO_COSTO_CODE, p_DCTO_CODE, p_REF_DCTO_DESC, p_REF_DCTO_NRO, p_FECHA_INI, p_CONC_CODE, p_SCONC_CODE, p_CTA_CONTABLE,
        p_TIPO, p_FECHA_FIN, p_TIPO_IND, p_TIPO_CRED_IND, p_FECHA, p_COMC_CODE, p_SCSL_CODE,
        p_CTLG_CODE, p_FECHA_EMISION, p_PIDM, p_GLOSA, p_FECHA_VENCIMIENTO, p_NRO_DCTO_REF,
        p_FACGADI_FECHA_PAGO_PROG, p_FACGADI_USUA_ID, p_FACGADI_MODALIDAD_PAGO, p_FACGADI_REF_CODE,
        p_FACGADI_FECHA_VENCIMIENTO, p_FACGADI_FECHA_TRANSACCION, p_ESTADO, p_FECHA_APROBACION,
        p_FACGADI_MODULO_CODE, p_FECHA_OPERACION, p_ANIO_TRIB, p_MES_TRIB, p_USUA_ID, p_FACGADI_MONE_CODE, p_FACGADI_MONTO, p_SIN_DCTO, p_DETALLE_GASTO,
        p_HABIDO_IND, p_TIPO_BIEN, p_OPERACION, p_CODE, p_NCMOCONT_CODIGO, USUA_ID, p_IND_DEDUCIBLE, p_DETRACCION_IND, p_IMPORTE_DETRACCION, p_IMPORTE_PAGAR, p_FACGADI_IMPORTE_PAGAR As String
    Dim p_indRR, p_SURE As String
    Dim dt As DataTable
    Dim p_MONTO As Decimal
    Dim res As String
    Dim resb As New StringBuilder
    Dim oTransaction As New Nomade.DataAccess.Transaccion()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")

        p_NCMOCONT_CODIGO = context.Request("p_NCMOCONT_CODIGO")


        p_CODE_REF_GASTO = context.Request("p_CODE_REF_GASTO")
        p_ESTADO = context.Request("p_ESTADO")
        p_MONTO = context.Request("p_MONTO")

        p_CODE = context.Request("p_CODE")

        USUA_ID = context.Request("USUA_ID")

        p_FECHA_APROBACION = context.Request("p_FECHA_APROBACION")
        p_DETALLE_GASTO = vChar(context.Request("p_DETALLE_GASTO"))
        p_FECHA_OPERACION = context.Request("p_FECHA_OPERACION")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_FACGADI_MONTO = context.Request("p_FACGADI_MONTO")
        p_FACGADI_MODULO_CODE = context.Request("p_FACGADI_MODULO_CODE")
        p_FACGADI_FECHA_TRANSACCION = context.Request("p_FACGADI_FECHA_TRANSACCION")
        p_FACGADI_FECHA_VENCIMIENTO = context.Request("p_FACGADI_FECHA_VENCIMIENTO")
        p_FACGADI_REF_CODE = context.Request("p_FACGADI_REF_CODE")
        p_FACGADI_MODALIDAD_PAGO = context.Request("p_FACGADI_MODALIDAD_PAGO")
        p_FACGADI_USUA_ID = context.Request("p_FACGADI_USUA_ID")
        p_FACGADI_FECHA_PAGO_PROG = context.Request("p_FACGADI_FECHA_PAGO_PROG")
        p_GLOSA = context.Request("p_GLOSA")
        p_GLOSA = IIf(p_GLOSA Is Nothing, "", p_GLOSA)
        p_FECHA_VENCIMIENTO = context.Request("p_FECHA_VENCIMIENTO")
        p_NRO_DCTO_REF = context.Request("p_NRO_DCTO_REF")
        p_PIDM = context.Request("p_PIDM")
        p_FECHA_EMISION = context.Request("p_FECHA_EMISION")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_COMC_CODE = context.Request("p_COMC_CODE")
        p_FECHA = context.Request("p_FECHA")
        p_TIPO_IND = context.Request("p_TIPO_IND")
        p_TIPO_CRED_IND = context.Request("p_TIPO_CRED_IND")
        p_FACGADI_MONE_CODE = context.Request("p_FACGADI_MONE_CODE")
        p_FECHA_INI = context.Request("p_FECHA_INI")
        p_FECHA_FIN = context.Request("p_FECHA_FIN")
        p_CODIGO = context.Request("p_CODIGO")
        p_REF_DCTO_DESC = context.Request("p_REF_DCTO_DESC")
        p_REF_DCTO_NRO = context.Request("p_REF_DCTO_NRO")

        p_SERIE = context.Request("p_SERIE")
        p_DCTO_CODE = context.Request("p_DCTO_CODE")
        p_CENTRO_COSTO_CODE = context.Request("p_CENTRO_COSTO_CODE")
        p_CENTRO_COSTO_CABECERA = context.Request("p_CENTRO_COSTO_CABECERA")
        p_IND_COMPRAS = context.Request("p_IND_COMPRAS")
        p_IND_DEDUCIBLE = context.Request("p_IND_DEDUCIBLE")

        p_DETRACCION_IND = context.Request("p_DETRACCION_IND")
        p_IMPORTE_DETRACCION = context.Request("p_IMPORTE_DETRACCION")
        p_IMPORTE_PAGAR = context.Request("p_IMPORTE_PAGAR")
        p_FACGADI_IMPORTE_PAGAR = context.Request("p_FACGADI_IMPORTE_PAGAR")

        p_indRR = context.Request("p_indRR")
        p_SURE = context.Request("p_SURE")

        p_SIN_DCTO = context.Request("p_SIN_DCTO")
        p_MES_TRIB = context.Request("p_MES_TRIB")
        p_ANIO_TRIB = context.Request("p_ANIO_TRIB")

        p_CONC_CODE = context.Request("p_CONC_CODE")
        p_SCONC_CODE = context.Request("p_SCONC_CODE")
        p_CTA_CONTABLE = context.Request("p_CTA_CONTABLE")
        '---------------------------------------------
        p_HABIDO_IND = context.Request("p_HABIDO_IND")
        p_TIPO_BIEN = context.Request("p_TIPO_BIEN")
        p_OPERACION = context.Request("p_OPERACION")
        '---------------------------------------------

        Try
            Select Case OPCION

                Case "G"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim res_arr(3) As String
                    Dim res_json As New StringBuilder
                    Dim r As String = ""
                    r = Verifica_Existe_Provision(CInt(p_PIDM), p_SERIE, p_NRO_DCTO_REF, "2", p_CODE_REF_GASTO, p_DCTO_CODE, p_CTLG_CODE)
                    If r = "C" Then 'C = NO EXISTE
                        res_arr = Crear_Aprobacion_Gasto(p_CODE_REF_GASTO, p_ESTADO, p_MONTO, p_FECHA_APROBACION, p_FECHA_OPERACION, p_USUA_ID, p_GLOSA, p_FECHA_VENCIMIENTO,
                                                         p_NRO_DCTO_REF, p_SERIE, p_DCTO_CODE, p_CENTRO_COSTO_CODE, p_CENTRO_COSTO_CABECERA, p_IND_COMPRAS, p_MES_TRIB, p_ANIO_TRIB,
                                                         p_DETALLE_GASTO, p_IND_DEDUCIBLE, p_DETRACCION_IND, p_IMPORTE_DETRACCION, p_IMPORTE_PAGAR)

                        res_json.Append("[")
                        res_json.Append("{")
                        res_json.Append("""CODE_GENERADO"" :" & """" & res_arr(0).ToString & """,")
                        res_json.Append("""SERIE_INT"" :" & """" & res_arr(2).ToString & """,")
                        res_json.Append("""NUMERO_INT"" :" & """" & res_arr(1).ToString & """")
                        res_json.Append("}")
                        res_json.Append("]")
                        res = res_json.ToString()
                    ElseIf r = "X" Then ' X = YA EXISTE                                            
                        res_json.Append("[")
                        res_json.Append("{")
                        res_json.Append("""ERROR"" :" & """" & "X" & """")
                        res_json.Append("}")
                        res_json.Append("]")
                        res = res_json.ToString()
                    End If

                Case "4"
                    'SE CAMBIÓ p_FACGADI_MONTO POR p_FACGADI_IMPORTE_PAGAR
                    context.Response.ContentType = "text/html"
                    res = Crear_Pago_Diverso(p_FACGADI_MONE_CODE,
                                           p_FACGADI_IMPORTE_PAGAR,
                                           "0003",
                                           IIf(p_FACGADI_FECHA_TRANSACCION.Length = 0, Nothing, Utilities.fechaLocal(p_FACGADI_FECHA_TRANSACCION)),
                                           IIf(p_FACGADI_FECHA_VENCIMIENTO.Length = 0, Nothing, Utilities.fechaLocal(p_FACGADI_FECHA_VENCIMIENTO)),
                                           p_FACGADI_REF_CODE,
                                           Nothing,
                                           p_FACGADI_USUA_ID,
                                           IIf(p_FACGADI_FECHA_PAGO_PROG.Length = 0, Nothing, Utilities.fechaLocal(p_FACGADI_FECHA_PAGO_PROG)),
                                           p_PIDM,
                                           IIf(p_FECHA_EMISION.Length = 0, Nothing, Utilities.fechaLocal(p_FECHA_EMISION)),
                                           IIf(p_REF_DCTO_DESC = "", Nothing, p_REF_DCTO_DESC),
                                           IIf(p_REF_DCTO_NRO = "", Nothing, p_REF_DCTO_NRO),
                                           IIf(p_COMC_CODE = "", Nothing, p_COMC_CODE))
                Case "5"
                    context.Response.ContentType = "text/html"
                    res = Anula_Aprobacion_Gasto(p_CODE_REF_GASTO, p_ESTADO, p_USUA_ID)
                Case "6"
                    'SE CAMBIÓ p_MONTO POR p_IMPORTE_PAGAR
                    context.Response.ContentType = "text/html"
                    res = Crear_Credito(p_CTLG_CODE, p_SCSL_CODE, p_COMC_CODE,
                                            IIf(p_FECHA_EMISION.Length = 0, Nothing, Utilities.fechaLocal(p_FECHA_EMISION)),
                                           p_IMPORTE_PAGAR,
                                           p_TIPO_CRED_IND,
                                           "",
                                           p_USUA_ID,
                                             IIf(p_FACGADI_FECHA_VENCIMIENTO.Length = 0, Nothing, Utilities.fechaLocal(p_FACGADI_FECHA_VENCIMIENTO)),
                                           p_FACGADI_MONE_CODE,
                                           IIf(p_FACGADI_FECHA_PAGO_PROG.Length = 0, Nothing, Utilities.fechaLocal(p_FACGADI_FECHA_PAGO_PROG)),
                                           Nothing,
                                           p_TIPO_IND)

                Case "7" ' lista 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If p_FECHA_INI = "" Then
                        p_FECHA_INI = Nothing
                    Else
                        p_FECHA_INI = Utilities.fechaLocal(p_FECHA_INI)
                    End If
                    If p_FECHA_FIN = "" Then
                        p_FECHA_FIN = Nothing
                    Else
                        p_FECHA_FIN = Utilities.fechaLocal(p_FECHA_FIN)
                    End If
                    If p_CODIGO = "" Then
                        p_CODIGO = Nothing

                    End If
                    dt = New Nomade.CP.CPCuentaPorPagar("Bn").Listar_Aprobacion_gasto(p_FECHA_INI,
                                                                                     p_FECHA_FIN,
                                                                                     IIf(p_CODIGO = Nothing, "", p_CODIGO),
                                                                                      IIf(p_CTLG_CODE = Nothing, "", p_CTLG_CODE),
                                                                                       IIf(p_SCSL_CODE = Nothing, "", p_SCSL_CODE))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""GASTO"" :" & """" & MiDataRow("GASTO").ToString & """,")
                            resb.Append("""FECHA_PAGO"" :" & """" & MiDataRow("FECHA_PAGO").ToString & """,")
                            resb.Append("""FECHA_VENCIMIENTO"" :" & """" & MiDataRow("FECHA_VENCIMIENTO").ToString & """,")
                            resb.Append("""MOVCONT_CODE"" :" & """" & MiDataRow("MOVCONT_CODE").ToString & """,")
                            resb.Append("""NESTADO"" :" & """" & MiDataRow("NESTADO").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                            resb.Append("""MONTO_APROBADO"" :" & """" & MiDataRow("MONTO_APROBADO").ToString & """,")
                            resb.Append("""GLOSA"" :" & """" & MiDataRow("GLOSA").ToString & """,")
                            resb.Append("""CTA_CONTABLE"" :" & """" & MiDataRow("CTA_CONTABLE").ToString & """,")
                            resb.Append("""DCTO_REF"" :" & """" & MiDataRow("DCTO_REF").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"" :" & """" & MiDataRow("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""CODIGO_GAST_ORG"" :" & """" & MiDataRow("CODIGO_GAST_ORG").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""USUARIO_AUT"" :" & """" & MiDataRow("USUARIO_AUT").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                            resb.Append("""SERIE_INT"" :" & """" & MiDataRow("SERIE_INT").ToString & """,")
                            resb.Append("""NUMERO_INT"" :" & """" & MiDataRow("NUMERO_INT").ToString & """,")
                            resb.Append("""NUMERO_CONCAT"" :" & """" & MiDataRow("SERIE").ToString & "-" & MiDataRow("DCTO_REF").ToString & """,")
                            resb.Append("""SOLICITA"" :" & """" & MiDataRow("SOLICITA").ToString & """,")
                            resb.Append("""DESC_MONEDA"" :" & """" & MiDataRow("DESC_MONEDA").ToString & """,")
                            resb.Append("""DESC_DCTO"" :" & """" & MiDataRow("DESC_DCTO").ToString & """,")
                            resb.Append("""DCTO_CODE"" :" & """" & MiDataRow("DCTO_CODE").ToString & """,")
                            resb.Append("""DESC_DCTO_INT"" :" & """" & MiDataRow("DESC_DCTO_INT").ToString & """,")
                            resb.Append("""DCTO_CODE_INT"" :" & """" & MiDataRow("DCTO_CODE_INT").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & MiDataRow("SERIE").ToString & """,")
                            resb.Append("""IND_COMPRAS"" :" & """" & MiDataRow("IND_COMPRAS").ToString & """,")
                            resb.Append("""DESC_CENTRO_COSTO"" :" & """" & MiDataRow("DESC_CENTRO_COSTO").ToString & """,")
                            resb.Append("""CONC_CODE"" :" & """" & MiDataRow("CONC_CODE").ToString & """,")
                            resb.Append("""SCONC_CODE"" :" & """" & MiDataRow("SCONC_CODE").ToString & """,")
                            resb.Append("""ANIO_TRIB"" :" & """" & MiDataRow("ANIO_TRIB").ToString & """,")
                            resb.Append("""MES_TRIB"" :" & """" & MiDataRow("MES_TRIB").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                            resb.Append("""FEC_EMISION"" :" & """" & MiDataRow("FEC_EMISION").ToString & """,")
                            resb.Append("""FEC_REG"" :" & """" & MiDataRow("FEC_REG").ToString & """,")
                            resb.Append("""HABIDO_IND"" :" & """" & MiDataRow("HABIDO_IND").ToString & """,")
                            resb.Append("""TIPO_BIEN"" :" & """" & MiDataRow("TIPO_BIEN").ToString & """,")
                            resb.Append("""DETRACCION_IND"" :" & """" & MiDataRow("DETRACCION_IND").ToString & """,")
                            resb.Append("""IMPORTE_DETRACCION"" :" & """" & MiDataRow("IMPORTE_DETRACCION").ToString & """,")
                            resb.Append("""IMPORTE_PAGAR"" :" & """" & MiDataRow("IMPORTE_PAGAR").ToString & """,")
                            resb.Append("""IMPORTE_PAGAR_APROBADO"" :" & """" & MiDataRow("IMPORTE_PAGAR_APROBADO").ToString & """,")
                            'resb.Append("""OPERACION"" :" & """" & MiDataRow("OPERACION").ToString & """,")
                            resb.Append("""IND_DEDUCIBLE"" :" & """" & MiDataRow("IND_DEDUCIBLE").ToString & """,")
                            resb.Append("""FECHA_APROBACION"" :" & """" & MiDataRow("FECHA_APROBACION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "GET_GASTO"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable()
                    oDT = New Nomade.CP.CPCuentaPorPagar("Bn").fnGetDocGasto(p_CODE_REF_GASTO)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "GEN_ASIENTO" ' Suma fecha de emision más plazo de pago

                    'Dim oNCParametros As New Nomade.NC.NCParametros("Bn")
                    'Dim oDT_Param As New DataTable()
                    'oDT_Param = oNCParametros.ListarParametros("ECON", "")
                    'If oDT_Param Is Nothing Then
                    '    Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    'End If
                    'If oDT_Param.Rows.Count = 0 Then
                    '    Throw New System.Exception("No se encontró el parámetro ECON: Empresa usa Contabilidad.")
                    'End If
                    'Dim sUsaContab As String = oDT_Param.Rows(0)("VALOR")
                    'If Not sUsaContab.Equals("S") Then
                    '    Throw New System.Exception("[Advertencia]: La empresa no tiene la opción contable activada.")
                    'End If

                    'Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")

                    ''Dim oDT_ConfigAsientoDocGasto As New DataTable
                    ''oDT_ConfigAsientoDocGasto = oCTMovimientoContable.fnGetConfigAsientoGasto(p_CODE)
                    'Dim oDT_Asiento As New DataTable

                    'oDT_Asiento = oCTMovimientoContable.fnGetAsientoContDocGasto(p_CODE)

                    Dim oCTGeneracionAsientos As New Nomade.CT.CTGeneracionAsientos()
                    Dim sCodMovCont As String = ""
                    Dim sCodMovContDest As String = ""


                    If p_indRR = "S" And p_SURE IsNot Nothing Then 'Si se cumple la retencion de renta se traeran otros valores junto al codigo del documento
                        sCodMovCont = oCTGeneracionAsientos.GenerarAsientoGastoRetencionRenta(p_CODE, p_SURE, p_indRR, p_NCMOCONT_CODIGO, USUA_ID) 'ASIENTO RETENCION DE RENTA PARA RECIBOS POR HONORARIO
                    Else
                        sCodMovCont = oCTGeneracionAsientos.GenerarAsientoGasto(p_CODE, p_NCMOCONT_CODIGO, USUA_ID) 'DPORTA 02/02/2023
                    End If

                    sCodMovContDest = oCTGeneracionAsientos.GenerarAsientoGastoDestino(p_CODE, p_NCMOCONT_CODIGO, USUA_ID) 'DPORTA 02/02/2023
                    'Dim oNCFactura As New Nomade.NC.NCFactura("Bn")

                    'Dim oDT_Docgasto As New DataTable
                    'oDT_Docgasto = New Nomade.CP.CPCuentaPorPagar("Bn").fnGetDocGasto(p_CODE)
                    'If oDT_Docgasto Is Nothing Then
                    '    Throw New System.Exception("No se pudo generar el Asiento Contable. No se encontró el documento de compra.")
                    'End If

                    'Dim oDR_DocGasto As DataRow = oDT_Docgasto.NewRow
                    'oDR_DocGasto = oDT_Docgasto.Rows(0)

                    ''Dim sAnuladoInd As String = oDR_DocCompra("AnuladoInd")
                    ''If sAnuladoInd.Equals("S") Then
                    ''    Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de compra está anulado.")
                    ''End If

                    ''Dim sCompletoInd As String = oDR_DocCompra("CompletoInd")
                    ''If sCompletoInd.Equals("N") Then
                    ''    Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El documento de compra no está completado.")
                    ''End If

                    'oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    'Dim sFechaEmision As String = Utilities.fechaLocal(oDR_DocGasto("FECHA_EMISION"))
                    'Dim sFechaTransac As String = Utilities.fechaLocal(oDR_DocGasto("FECHA_TRANS"))

                    'If IsDBNull(oDR_DocGasto("TC")) Then
                    '    Throw New System.Exception("[Advertencia]: No posee tipo de cambio el gasto")
                    'End If

                    'sCodMovCont = oCTMovimientoContable.fnAgregarMovCont(oDR_DocGasto("CodEmpresa"), oDR_DocGasto("CodEstablec"), oDR_DocGasto("ANIO_PERIODO"),
                    '                                                     oDR_DocGasto("MES_PERIODO"), p_NCMOCONT_CODIGO, "A", sFechaEmision, sFechaTransac,
                    '                                                     oDR_DocGasto("GLOSA"), oDR_DocGasto("MONE_CODE"), oDR_DocGasto("TC"),
                    '                                                     oDR_DocGasto("PIDM"), oDR_DocGasto("CodGasto"), USUA_ID,, oTransaction)

                    ''Dim sCodProducto As String = ""
                    ''For Each oDR As DataRow In oDT_ConfigAsientoDocGasto.Rows
                    ''    sCodProducto = oDR("PROD_CODE")
                    ''    If IsDBNull(oDR("CTA_ID_COMPRA")) Then
                    ''        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El producto '" + sCodProducto + "' no tiene configuración contable.")
                    ''    End If
                    ''    If IsDBNull(oDR("CTA_ID_IMP")) Then
                    ''        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El producto '" + sCodProducto + "' no tiene configuración contable.")
                    ''    End If
                    ''    If IsDBNull(oDR("CTA_ID_OPE")) Then
                    ''        Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. El producto '" + sCodProducto + "' no tiene configuración contable.")
                    ''    End If
                    ''Next

                    'If oDT_Asiento Is Nothing Then
                    '    Throw New System.Exception("[Advertencia]: No se pudo generar el Asiento Contable. No se pudo obtener la configuración del asiento contable.")
                    'End If

                    'Dim iItem As Integer = 0
                    'Dim sFechaDoc As String
                    'For Each oDR As DataRow In oDT_Asiento.Rows
                    '    iItem = iItem + 1

                    '    sFechaDoc = Utilities.fechaLocal(oDR_DocGasto("FECHA_EMISION"))
                    '    Dim sCOD_CCOSTO_CAB As String = IIf(IsDBNull(oDR("COD_CCOSTO_CAB")), Nothing, oDR("COD_CCOSTO_CAB"))
                    '    Dim sCOD_CCOSTO_DET As String = IIf(IsDBNull(oDR("COD_CCOSTO_DET")), Nothing, oDR("COD_CCOSTO_DET"))
                    '    oCTMovimientoContable.fnAgregarMovContabDet(sCodMovCont, iItem, oDR("ITEM_TIPO"), oDR("GLOSA"), oDR("PIDM"), oDR("COD_DOC_IDENT"), oDR("COD_SUNAT_DOC_IDENT"),
                    '                                                oDR("DOC_IDENT"), oDR("NRO_DOC_IDENT"), sCOD_CCOSTO_CAB, sCOD_CCOSTO_DET, oDR("CCOSTO"), oDR("COD_DCTO"),
                    '                                                oDR("COD_SUNAT_DCTO"), oDR("DCTO"), oDR("SERIE_DCTO"), oDR("NRO_DCTO"), sFechaDoc, oDR("COD_MONE"),
                    '                                                oDR("COD_SUNAT_MONE"), oDR("CTA_ID"), oDR("CTA"), oDR("TC"), oDR("DEBE"), oDR("HABER"),
                    '                                                oDR("DEBE_MN"), oDR("HABER_MN"), oDR("DEBE_ME"), oDR("HABER_ME"), oTransaction)
                    'Next

                    'oNCFactura.fnActualizarCodContabDocGasto(p_CODE, sCodMovCont, oTransaction)


                    'oTransaction.fnCommitTransaction()

                    res = sCodMovCont


                Case "8" ' lista 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If p_FECHA_INI = "" Then
                        p_FECHA_INI = Nothing
                    Else
                        p_FECHA_INI = Utilities.fechaLocal(p_FECHA_INI)
                    End If
                    If p_FECHA_FIN = "" Then
                        p_FECHA_FIN = Nothing
                    Else
                        p_FECHA_FIN = Utilities.fechaLocal(p_FECHA_FIN)
                    End If
                    If p_CODIGO = "" Then
                        p_CODIGO = Nothing

                    End If
                    dt = New Nomade.CP.CPCuentaPorPagar("Bn").Listar_Aprobacion_gasto(p_FECHA_INI,
                                                                                     p_FECHA_FIN,
                                                                                     p_CODIGO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""GASTO"" :" & """" & MiDataRow("GASTO").ToString & """,")
                            resb.Append("""FECHA_PAGO"" :" & """" & MiDataRow("FECHA_PAGO").ToString & """,")
                            resb.Append("""FECHA_VENCIMIENTO"" :" & """" & MiDataRow("FECHA_VENCIMIENTO").ToString & """,")
                            resb.Append("""NESTADO"" :" & """" & MiDataRow("NESTADO").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                            resb.Append("""MONTO_APROBADO"" :" & """" & MiDataRow("MONTO_APROBADO").ToString & """,")
                            resb.Append("""GLOSA"" :" & """" & MiDataRow("GLOSA").ToString & """,")
                            resb.Append("""CTA_CONTABLE"" :" & """" & MiDataRow("CTA_CONTABLE").ToString & """,")
                            resb.Append("""DCTO_REF"" :" & """" & MiDataRow("DCTO_REF").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"" :" & """" & MiDataRow("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""CODIGO_GAST_ORG"" :" & """" & MiDataRow("CODIGO_GAST_ORG").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""USUARIO_AUT"" :" & """" & MiDataRow("USUARIO_AUT").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                            resb.Append("""SERIE_INT"" :" & """" & MiDataRow("SERIE_INT").ToString & """,")
                            resb.Append("""NUMERO_INT"" :" & """" & MiDataRow("NUMERO_INT").ToString & """,")
                            resb.Append("""NUMERO_CONCAT"" :" & """" & MiDataRow("SERIE").ToString & "-" & MiDataRow("DCTO_REF").ToString & """,")
                            resb.Append("""SOLICITA"" :" & """" & MiDataRow("SOLICITA").ToString & """,")
                            resb.Append("""DESC_MONEDA"" :" & """" & MiDataRow("DESC_MONEDA").ToString & """,")
                            resb.Append("""DESC_DCTO"" :" & """" & MiDataRow("DESC_DCTO").ToString & """,")
                            resb.Append("""DCTO_CODE"" :" & """" & MiDataRow("DCTO_CODE").ToString & """,")
                            resb.Append("""DESC_DCTO_INT"" :" & """" & MiDataRow("DESC_DCTO_INT").ToString & """,")
                            resb.Append("""DCTO_CODE_INT"" :" & """" & MiDataRow("DCTO_CODE_INT").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & MiDataRow("SERIE").ToString & """,")
                            resb.Append("""IND_COMPRAS"" :" & """" & MiDataRow("IND_COMPRAS").ToString & """,")
                            resb.Append("""DESC_CENTRO_COSTO"" :" & """" & MiDataRow("DESC_CENTRO_COSTO").ToString & """,")
                            resb.Append("""HABIDO_IND"" :" & """" & MiDataRow("HABIDO_IND").ToString & """,")
                            resb.Append("""TIPO_BIEN"" :" & """" & MiDataRow("TIPO_BIEN").ToString & """,")
                            resb.Append("""OPERACION"" :" & """" & MiDataRow("OPERACION").ToString & """,")
                            resb.Append("""DETRACCION_IND"" :" & """" & MiDataRow("DETRACCION_IND").ToString & """,")
                            resb.Append("""IMPORTE_DETRACCION"" :" & """" & MiDataRow("IMPORTE_DETRACCION").ToString & """,")
                            resb.Append("""IMPORTE_PAGAR"" :" & """" & MiDataRow("IMPORTE_PAGAR").ToString & """,")
                            resb.Append("""FECHA_APROBACION"" :" & """" & MiDataRow("FECHA_APROBACION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case Else
            End Select
            context.Response.Write(res)

        Catch ex As Exception
            If oTransaction.iTransactionState = NOMADE.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
            Dim sMsjeError As String = ex.Message
            If (sMsjeError.IndexOf("[Advertencia]") > -1) Then
                context.Response.Write(sMsjeError)
            Else
                context.Response.Write("[Error]: " + sMsjeError)
            End If
        End Try
    End Sub

    Public Function Crear_Credito(ByVal p_CTLG_CODE As String,
                                      ByVal p_SCSL_CODE As String,
                                      ByVal p_COMC_CODE As String,
                                      ByVal p_FECHA As String,
                                      ByVal p_MONTO As Decimal,
                                      ByVal p_TIPO_CRED_IND As String,
                                      ByVal p_COMENTARIO As String,
                                      ByVal p_USUA_ID As String,
                                      ByVal p_FECHA_VENC As String,
                                      ByVal p_MONE_CODE As String,
                                      ByVal p_FECHA_PAGO As String,
                                      ByVal p_VTAC_CODE As String,
                                      ByVal p_TIPO_IND As String) As String

        Dim Datos As String
        Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
        Datos = CPCuentaPorPagar.Crear_Credito_Persona(p_CTLG_CODE, p_SCSL_CODE, p_COMC_CODE,
                                           p_FECHA,
                                           p_MONTO,
                                           p_TIPO_CRED_IND,
                                           p_COMENTARIO,
                                           p_USUA_ID,
                                           p_FECHA_VENC,
                                           p_MONE_CODE,
                                           p_FECHA_PAGO,
                                           p_VTAC_CODE,
                                           p_TIPO_IND)
        CPCuentaPorPagar = Nothing
        Return Datos
    End Function

    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, " ")
        Else
            res = campo
        End If
        Return res
    End Function

    Public Function Crear_Aprobacion_Gasto(ByVal p_CODE_REF_GASTO As String, ByVal p_ESTADO As String,
                                         ByVal p_MONTO As Decimal, ByVal p_FECHA_APROBACION As String, ByVal p_FECHA_OPERACION As String,
                                         ByVal p_USUA_ID As String,
                                          ByVal p_GLOSA As String,
                                         ByVal p_FECHA_VENCIMIENTO As String,
                                         ByVal p_NRO_DCTO_REF As String,
                                         ByVal p_SERIE As String,
                                         ByVal p_DCTO_CODE As String,
                                         ByVal p_CENTRO_COSTO_CODE As String,
                                         ByVal p_CENTRO_COSTO_CABECERA As String,
                                         ByVal p_IND_COMPRAS As String,
                                         p_MES_TRIB As String, p_ANIO_TRIB As String, p_DETALLE_GASTO As String, p_IND_DEDUCIBLE As String,
                                         p_DETRACCION_IND As String, p_IMPORTE_DETRACCION As String, p_IMPORTE_PAGAR As String) As Array
        Dim Datos(2) As String
        Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
        Datos = CPCuentaPorPagar.Crear_Aprobacion_Gasto(p_CODE_REF_GASTO, p_ESTADO, p_MONTO, IIf(p_FECHA_APROBACION = "", Convert.ToDateTime(Date.Now).ToString("yyyy/MM/dd"), Utilities.fechaLocal(p_FECHA_APROBACION)),
                                                        IIf(p_FECHA_OPERACION = "", Convert.ToDateTime(Date.Now).ToString("yyyy/MM/dd"), Utilities.fechaLocal(p_FECHA_OPERACION)), p_USUA_ID, p_GLOSA,
                                                        Utilities.fechaLocal(p_FECHA_VENCIMIENTO), p_NRO_DCTO_REF, p_SERIE, p_DCTO_CODE, p_CENTRO_COSTO_CODE, p_CENTRO_COSTO_CABECERA, p_IND_COMPRAS, p_MES_TRIB, p_ANIO_TRIB,
                                                        p_HABIDO_IND, p_TIPO_BIEN, p_DETRACCION_IND, p_IMPORTE_DETRACCION, p_IMPORTE_PAGAR, p_CONC_CODE, p_SCONC_CODE, p_CTA_CONTABLE, "0100", p_DETALLE_GASTO, p_IND_DEDUCIBLE)
        CPCuentaPorPagar = Nothing

        Return Datos
    End Function

    Public Function Crear_Pago_Diverso(ByVal p_FACGADI_MONE_CODE As String, _
     ByVal p_FACGADI_MONTO As Decimal, _
     ByVal p_FACGADI_MODULO_CODE As String, _
     ByVal p_FACGADI_FECHA_TRANSACCION As String, _
     ByVal p_FACGADI_FECHA_VENCIMIENTO As String, _
     ByVal p_FACGADI_REF_CODE As String, _
     ByVal p_FACGADI_MODALIDAD_PAGO As String, _
     ByVal p_FACGADI_USUA_ID As String, _
     ByVal p_FACGADI_FECHA_PAGO_PROG As String, _
      ByVal p_PIDM As String, _
      ByVal p_FECHA_EMISION As String,
       ByVal p_REF_DCTO_DESC As String, _
      ByVal p_REF_DCTO_NRO As String, _
      ByVal p_COMC_CODE As String) As String

        Dim Datos As String
        Dim CPPagosDiversos As New Nomade.CP.CPPagosDiversos("Bn")
        Datos = CPPagosDiversos.CrearGastoDiverso(
            p_FACGADI_MONE_CODE,
       p_FACGADI_MONTO,
       p_FACGADI_MODULO_CODE,
       p_FACGADI_FECHA_TRANSACCION,
       p_FACGADI_FECHA_VENCIMIENTO,
       p_FACGADI_REF_CODE,
       p_FACGADI_MODALIDAD_PAGO,
       p_FACGADI_USUA_ID,
       p_FACGADI_FECHA_PAGO_PROG,
       p_PIDM,
       p_FECHA_EMISION,
       p_REF_DCTO_DESC,
       p_REF_DCTO_NRO, p_COMC_CODE
       )
        CPPagosDiversos = Nothing
        Return Datos
    End Function


    Public Function Anula_Aprobacion_Gasto(ByVal p_CODE_REF_GASTO As String, ByVal p_ESTADO As String,
                                           ByVal p_USUA_ID As String) As String

        Dim Datos As String
        Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
        Datos = CPCuentaPorPagar.Anular_Aprobacion_Gasto(p_CODE_REF_GASTO, p_ESTADO, p_USUA_ID)
        CPCuentaPorPagar = Nothing
        Return Datos
    End Function

    Public Function Verifica_Existe_Provision(ByVal p_PIDM As String, ByVal p_SERIE As String,
                                   ByVal p_NRO_DCTO_REF As String, p_TIPO As String, p_COD_GASTO As String, ByVal p_DCTO_CODE As String, ByVal p_CTLG_CODE As String) As String

        Dim Datos As String
        Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
        Datos = CPCuentaPorPagar.Verificar_Provision_Gasto(p_PIDM,
                                                       IIf(p_SERIE = "", Nothing, p_SERIE),
                                                       IIf(p_NRO_DCTO_REF = "", Nothing, p_NRO_DCTO_REF),
                                                       p_TIPO, p_COD_GASTO, IIf(p_DCTO_CODE = "", Nothing, p_DCTO_CODE), p_CTLG_CODE)
        CPCuentaPorPagar = Nothing
        Return Datos
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
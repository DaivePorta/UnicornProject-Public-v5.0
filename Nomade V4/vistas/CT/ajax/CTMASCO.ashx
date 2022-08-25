<%@ WebHandler Language="VB" Class="CTMASCO" %>

Imports iTextSharp.text
Imports iTextSharp.text.pdf
Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.IO.FileStream


Public Class CTMASCO : Implements IHttpHandler
    Dim OPCION As String
    Dim filtrotypeahead, p_FECHA_FIN, p_CENTRO_COSTO, p_CENTRO_COSTO_CABECERA, p_FECHA_INI,
        p_ESTADO_PAG, p_ESTADO_IND, p_MONE_CODE, p_CODE, p_CTA_CONTABLE, p_NRO_DCTO_REF,
        p_FECHA_UNICA, p_FRECUENCIA, p_CONC_CODE, p_PERIOCIDAD, p_CTLG_CODE, p_DESC_GASTO,
        p_SCONC_CODE, p_SCSL_CODE, p_TIPO_IND, p_USUA_ID, p_TIPO_DCTO, p_SERIE, p_NUMERO,
        p_COMPRAS_IND, p_FECHA_FIN_EMI, p_GASTO_CONCATENADO, p_FECHA_INI_EMI, p_CENTRO_COSTOS, p_PERIODO, p_CODIGO, p_MES_TRIB, p_ANIO_TRIB, p_DETALLE_GASTO, p_DEDUCIBLE_IND,
        p_HABIDO_IND, p_TIPO_BIEN, p_OPERACION, p_PIDM As String

    'DPORTA
    Dim p_COD_MONEDA, p_VALOR_CAMBIO, p_ANIO, p_MES, p_DESCRIPCION, p_TIPO_ASIENTO, p_DECLARADO, p_OPERACION_ASIENTO,
        p_CUO, p_NRO_MOV, p_USUARIO, p_COD_DOC_CLIENTE, p_NRO_DOC_CLIENTE, p_CLIENTE, p_COD_DOCUMENTO, p_COD_SERIE, p_COD_NUMERO, p_FECHA_EMISION, p_FECHA_TRANSACCION,
        p_OPORTUNIDAD_ANOTACION, p_DETALLE_ASIENTO, p_DESC_DOC_CLIENTE, p_DESC_DOCUMENTO, CTLG As String

    Dim oCTMovimientoContable As New Nomade.CT.CTMovimientoContable("Bn")
    Dim oTransaction As New Nomade.DataAccess.Transaccion()
    '--------------------------------------------------------------------------
    Dim dt As DataTable
    Dim p_DATO_FRECUENCIA, p_PIDM_BENEFICIARIO As Integer
    Dim p_MONTO As Decimal
    Dim res As String
    Dim resb As New StringBuilder




    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        'DPORTA
        p_DETALLE_ASIENTO = vChar(context.Request("p_DETALLE_ASIENTO"))

        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_COD_MONEDA = context.Request("p_COD_MONEDA")
        p_VALOR_CAMBIO = context.Request("p_VALOR_CAMBIO")
        p_ANIO = context.Request("p_ANIO")
        p_MES = context.Request("p_MES")
        p_DESCRIPCION = context.Request("p_DESCRIPCION")
        p_TIPO_ASIENTO = context.Request("p_TIPO_ASIENTO")
        p_OPERACION_ASIENTO = context.Request("p_OPERACION_ASIENTO")
        p_CUO = context.Request("p_CUO")
        p_NRO_MOV = context.Request("p_NRO_MOV")
        p_USUARIO = context.Request("p_USUARIO")
        p_COD_DOC_CLIENTE = context.Request("p_COD_DOC_CLIENTE")
        p_DESC_DOC_CLIENTE = context.Request("p_DESC_DOC_CLIENTE")
        p_NRO_DOC_CLIENTE = context.Request("p_NRO_DOC_CLIENTE")
        p_CLIENTE = context.Request("p_CLIENTE")
        p_COD_DOCUMENTO = context.Request("p_COD_DOCUMENTO")
        p_DESC_DOCUMENTO = context.Request("p_DESC_DOCUMENTO")
        p_COD_SERIE = context.Request("p_COD_SERIE")
        p_COD_NUMERO = context.Request("p_COD_NUMERO")
        p_FECHA_EMISION = context.Request("p_FECHA_EMISION")
        p_FECHA_TRANSACCION = context.Request("p_FECHA_TRANSACCION")
        p_OPORTUNIDAD_ANOTACION = context.Request("p_OPORTUNIDAD_ANOTACION")
        p_DECLARADO = context.Request("p_DECLARADO")

        p_OPERACION = context.Request("p_OPERACION")
        p_PIDM = context.Request("p_PIDM")
        '------------------------------------------------------
        filtrotypeahead = context.Request("q")
        p_CONC_CODE = context.Request("p_CONC_CODE")
        p_DATO_FRECUENCIA = IIf(context.Request("p_DATO_FRECUENCIA") = "", 0, context.Request("p_DATO_FRECUENCIA"))
        p_DESC_GASTO = vChar(context.Request("p_DESC_GASTO"))
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_FECHA_UNICA = context.Request("p_FECHA_UNICA")
        p_FRECUENCIA = context.Request("p_FRECUENCIA")
        p_MONTO = context.Request("p_MONTO")
        p_PERIOCIDAD = context.Request("p_PERIOCIDAD")
        p_DEDUCIBLE_IND = context.Request("p_DEDUCIBLE_IND")
        p_PIDM_BENEFICIARIO = context.Request("p_PIDM_BENEFICIARIO")
        p_SCONC_CODE = context.Request("p_SCONC_CODE")
        p_TIPO_IND = context.Request("p_TIPO_IND")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_NRO_DCTO_REF = context.Request("p_NRO_DCTO_REF")
        p_CTA_CONTABLE = context.Request("p_CTA_CONTABLE")
        p_CODE = context.Request("p_CODE")
        p_MONE_CODE = context.Request("p_MONE_CODE")
        p_ESTADO_PAG = context.Request("p_ESTADO_PAG")
        p_FECHA_INI = context.Request("p_FECHA_INI")
        p_FECHA_FIN = context.Request("p_FECHA_FIN")
        p_CENTRO_COSTO = context.Request("p_CENTRO_COSTO")
        p_CENTRO_COSTO_CABECERA = context.Request("p_CENTRO_COSTO_CABECERA")
        p_TIPO_DCTO = context.Request("p_TIPO_DCTO")
        p_SERIE = context.Request("p_SERIE")
        p_NUMERO = context.Request("p_NUMERO")
        p_COMPRAS_IND = context.Request("p_COMPRAS_IND")
        p_GASTO_CONCATENADO = context.Request("p_GASTO_CONCATENADO")
        p_CODIGO = context.Request("p_CODIGO")
        p_MES_TRIB = context.Request("p_MES_TRIB")
        p_ANIO_TRIB = context.Request("p_ANIO_TRIB")
        p_PERIODO = context.Request("p_PERIODO")
        p_FECHA_INI_EMI = context.Request("p_FECHA_INI_EMI")
        p_FECHA_FIN_EMI = context.Request("p_FECHA_FIN_EMI")
        p_CENTRO_COSTOS = context.Request("p_CENTRO_COSTOS")
        '---------------------------------------------
        p_HABIDO_IND = context.Request("p_HABIDO_IND")
        p_TIPO_BIEN = context.Request("p_TIPO_BIEN")
        CTLG = context.Request("CTLG")
        '---------------------------------------------

        Try
            Select Case OPCION

                Case "GRABAR_ASIENTO"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim sCodMovCont As String = ""
                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)


                    sCodMovCont = oCTMovimientoContable.fnAgregarMovCont2(p_CTLG_CODE, p_SCSL_CODE, p_ANIO, p_MES, p_OPERACION, p_TIPO_ASIENTO, p_FECHA_EMISION, p_FECHA_TRANSACCION, p_DESCRIPCION,
                                                                          p_COD_MONEDA, p_VALOR_CAMBIO, p_PIDM, "", p_USUARIO, p_DETALLE_ASIENTO, p_COD_DOC_CLIENTE, p_DESC_DOC_CLIENTE,
                                                                          p_NRO_DOC_CLIENTE, p_COD_DOCUMENTO, p_DESC_DOCUMENTO, p_COD_SERIE, p_COD_NUMERO, p_OPERACION_ASIENTO, p_DECLARADO,
                                                                          p_OPORTUNIDAD_ANOTACION, , oTransaction)

                    oTransaction.fnCommitTransaction()

                    res = sCodMovCont

                Case "UPDATE_ASIENTO"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim aCodMovCont As String = ""
                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)


                    aCodMovCont = oCTMovimientoContable.fnActualizarMovCont2(p_CTLG_CODE, p_SCSL_CODE, p_ANIO, p_MES, p_OPERACION, p_TIPO_ASIENTO, p_FECHA_EMISION, p_FECHA_TRANSACCION, p_DESCRIPCION,
                                                                          p_COD_MONEDA, p_VALOR_CAMBIO, p_PIDM, "", p_USUARIO, p_DETALLE_ASIENTO, p_COD_DOC_CLIENTE, p_DESC_DOC_CLIENTE,
                                                                          p_NRO_DOC_CLIENTE, p_COD_DOCUMENTO, p_DESC_DOCUMENTO, p_COD_SERIE, p_COD_NUMERO, p_OPERACION_ASIENTO, p_DECLARADO,
                                                                          p_OPORTUNIDAD_ANOTACION, p_CODE, , oTransaction)

                    oTransaction.fnCommitTransaction()

                    res = aCodMovCont

                Case "LASIENTOS" ' LISTA ASIENTOS CONTABLES (CABECERA)
                    context.Response.ContentType = "application/json; charset=utf-8"

                    If (p_FECHA_INI_EMI = "") Then
                        p_FECHA_INI_EMI = Nothing
                    Else
                        p_FECHA_INI_EMI = Utilities.fechaLocal(p_FECHA_INI_EMI)
                    End If

                    If (p_FECHA_FIN_EMI = "") Then
                        p_FECHA_FIN_EMI = Nothing
                    Else
                        p_FECHA_FIN_EMI = Utilities.fechaLocal(p_FECHA_FIN_EMI)
                    End If

                    Dim oDT As New DataTable()
                    oDT = oCTMovimientoContable.fnLISTAR_ASIENTOS_CONTABLES(p_CTLG_CODE, p_SCSL_CODE, p_FECHA_INI_EMI, p_FECHA_FIN_EMI)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "CORR"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim CORRELATIVO As String = context.Request("CORR")
                    dt = New Nomade.NC.NCAutorizacionDocumento("BN").ListarAutorizacion(String.Empty, "A", p_CTLG_CODE, IIf(p_SCSL_CODE = Nothing, "", p_SCSL_CODE), "0100", IIf(CORRELATIVO = Nothing, "", CORRELATIVO), "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        Dim formato As String = ""
                        For Each row As DataRow In dt.Rows
                            Dim valor_fin As Long = Long.Parse(IIf(row("VALOR_FIN").ToString = Nothing, "0", row("VALOR_FIN").ToString))
                            Dim valor_actual As Long = Long.Parse(row("VALOR_ACTUAL").ToString)
                            If (valor_actual <= valor_fin Or valor_fin = 0) And formato <> row("FORMATO").ToString Then
                                resb.Append("{")
                                resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                resb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                                resb.Append("""FORMATO"":""" & row("FORMATO").ToString & """,")
                                resb.Append("""NRO_LINEAS"":""" & row("NRO_LINEAS").ToString & """,")
                                resb.Append("""VALOR_ACTUAL"":""" & row("VALOR_ACTUAL").ToString & """")
                                resb.Append("},")
                                formato = row("FORMATO").ToString
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "ROL"
                    dt = New Nomade.NS.NSUsuario("Bn").VerificaRolUsuario(p_USUA_ID, "0064")
                    If Not (dt Is Nothing) Then
                        For Each MiDataRow As DataRow In dt.Rows
                            res = MiDataRow("PERMISO").ToString
                        Next
                    End If
                Case "VERIFICA"
                    dt = New Nomade.CP.CPCuentaPorPagar("Bn").BuscarDocumentoProvisionExiste(p_PIDM_BENEFICIARIO, p_TIPO_DCTO, p_SERIE, p_NUMERO)
                    If Not (dt Is Nothing) Then
                        For Each MiDataRow As DataRow In dt.Rows
                            res = MiDataRow("EXISTE").ToString
                        Next
                    End If
                Case "1" ' lista PROVEEDORES
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCEProveedor("Bn").ListarProveedor(0, String.Empty, p_CTLG_CODE, String.Empty, "X")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """")

                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "2" ' lista 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.CP.CPCuentaPorPagar("Bn").Listar_Provision_gasto(p_ESTADO_IND, "1", Nothing, Nothing, p_CODIGO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""GASTO"" :" & """" & MiDataRow("GASTO").ToString & """,")
                            resb.Append("""MONTO_ORIGEN"" :" & """" & MiDataRow("MONTO_ORIGEN").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CODIGO_GAST_ORG"" :" & """" & MiDataRow("CODIGO_GAST_ORG").ToString & """,")
                            resb.Append("""FECHA_UNICA"" :" & """" & MiDataRow("FECHA_UNICA").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""FECHA_APROBACION"" :" & """" & MiDataRow("FECHA_APROBACION").ToString & """,")
                            resb.Append("""FECHA_PAGO"" :" & """" & MiDataRow("FECHA_PAGO").ToString & """,")
                            resb.Append("""FECHA_VENCIMIENTO"" :" & """" & MiDataRow("FECHA_VENCIMIENTO").ToString & """,")
                            resb.Append("""NESTADO"" :" & """" & MiDataRow("NESTADO").ToString & """,")
                            resb.Append("""MONEDA_CODE"" :" & """" & MiDataRow("MONEDA_CODE").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"" :" & """" & MiDataRow("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""DCTO_DESC"" :" & """" & MiDataRow("DCTO_DESC").ToString & """,")
                            resb.Append("""DESC_DCTO"" :" & """" & MiDataRow("DESC_DCTO").ToString & """,")
                            resb.Append("""CONC_CODE"" :" & """" & MiDataRow("CONC_CODE").ToString & """,")
                            resb.Append("""SCONC_CODE"" :" & """" & MiDataRow("SCONC_CODE").ToString & """,")
                            resb.Append("""DESC_CENTRO_COSTO"" :" & """" & MiDataRow("DESC_CENTRO_COSTO").ToString & """,")
                            resb.Append("""COD_CENTRO_COSTO"" :" & """" & MiDataRow("COD_CENTRO_COSTO").ToString & """,")
                            resb.Append("""COD_CABECERA_CENTRO_COSTO"" :" & """" & MiDataRow("COD_CABECERA_CENTRO_COSTO").ToString & """,")
                            resb.Append("""TIPO_DCTO"" :" & """" & MiDataRow("TIPO_DCTO").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & MiDataRow("SERIE").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""COMPRAS_IND"" :" & """" & MiDataRow("COMPRAS_IND").ToString & """,")
                            resb.Append("""DESC_MONEDA"" :" & """" & MiDataRow("DESC_MONEDA").ToString & """,")
                            resb.Append("""FECHA_REGISTRO"" :" & """" & MiDataRow("FECHA_REGISTRO").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                            resb.Append("""SOLICITA"" :" & """" & MiDataRow("SOLICITA").ToString & """,")
                            resb.Append("""HABIDO_IND_ORG"" :" & """" & MiDataRow("HABIDO_IND_ORG").ToString & """,") ' DATO DE PROVISION
                            resb.Append("""TIPO_BIEN_ORG"" :" & """" & MiDataRow("TIPO_BIEN_ORG").ToString & """,") ' DATO DE PROVISION
                            ' resb.Append("""OPERACION_ORG"" :" & """" & MiDataRow("OPERACION_ORG").ToString & """,") ' DATO DE PROVISION
                            '------------------
                            resb.Append("""HABIDO_IND"" :" & """" & MiDataRow("HABIDO_IND").ToString & """,") ' DATO DE APROBACION
                            resb.Append("""TIPO_BIEN"" :" & """" & MiDataRow("TIPO_BIEN").ToString & """,") ' DATO DE APROBACION
                            'resb.Append("""OPERACION"" :" & """" & MiDataRow("OPERACION").ToString & """,") ' DATO DE APROBACION
                            '------------------
                            resb.Append("""GLOSA2"" :" & """" & MiDataRow("GLOSA2").ToString & """,")


                            resb.Append("""MOVCONT_CODE"" :" & """" & MiDataRow("MOVCONT_CODE").ToString & """,")
                            resb.Append("""IND_DEDUCIBLE"" :" & """" & MiDataRow("IND_DEDUCIBLE").ToString & """,")


                            resb.Append("""CTA_CONTABLE"" :" & """" & MiDataRow("CTA_CONTABLE").ToString & """")

                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3" ' lista 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCMonedas("Bn").ListarMoneda_AL_BA(p_CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""SIMBOLO"" :" & """" & MiDataRow("SIMBOLO").ToString & """")

                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "LISTAD_MOV" ' lista 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCMonedas("Bn").ListarMovimientos(p_CTLG_CODE, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                            resb.Append("""MNEMOTECNIA"" :" & """" & MiDataRow("MNEMOTECNIA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "DETASIENTO" ' lista 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.CP.CPCuentaPorPagar("Bn").Listar_Detalle_Asiento_ContUnico(p_CODE)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If

                Case "4" ' LISTA PROVISION DE GASTOS UNICOS //CPLPGAS
                    context.Response.ContentType = "application/json; charset=utf-8"

                    dt = New Nomade.CP.CPCuentaPorPagar("Bn").Listar_Asiento_ContUnico(IIf(CTLG = "", Nothing, CTLG), IIf(p_CODE = "", Nothing, p_CODE))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""MONE_CODE"" :" & """" & MiDataRow("MONE_CODE").ToString & """,")
                            resb.Append("""ANIO"" :" & """" & MiDataRow("ANIO").ToString & """,")
                            resb.Append("""VAL_MES"" :" & """" & MiDataRow("VAL_MES").ToString & """,")
                            resb.Append("""MES"" :" & """" & MiDataRow("MES").ToString & """,")
                            resb.Append("""GLOSA"" :" & """" & MiDataRow("GLOSA").ToString & """,")
                            resb.Append("""COD_OPERACION_ASIENTO"" :" & """" & MiDataRow("COD_OPERACION_ASIENTO").ToString & """,")
                            resb.Append("""OPERACION_ASIENTO"" :" & """" & MiDataRow("OPERACION_ASIENTO").ToString & """,")
                            resb.Append("""TIPO_ASIENTO"" :" & """" & MiDataRow("TIPO_ASIENTO").ToString & """,")
                            resb.Append("""VALOR_CAMBIO"" :" & """" & MiDataRow("VALOR_CAMBIO").ToString & """,")
                            resb.Append("""COD_DOCUMENTO"" :" & """" & MiDataRow("COD_DOCUMENTO").ToString & """,")
                            resb.Append("""DESC_DOCUMENTO"" :" & """" & MiDataRow("DESC_DOCUMENTO").ToString & """,")
                            resb.Append("""NRO_DOCUMENTO"" :" & """" & MiDataRow("NRO_DOCUMENTO").ToString & """,")
                            resb.Append("""PIDM_BENE"" :" & """" & MiDataRow("PIDM_BENE").ToString & """,")
                            resb.Append("""NOMBRES"" :" & """" & MiDataRow("NOMBRES").ToString & """,")
                            resb.Append("""COD_MOVIMIENTO"" :" & """" & MiDataRow("COD_MOVIMIENTO").ToString & """,")
                            resb.Append("""TIPO_DCTO"" :" & """" & MiDataRow("TIPO_DCTO").ToString & """,")
                            resb.Append("""DESC_DOC"" :" & """" & MiDataRow("DESC_DOC").ToString & """,")
                            resb.Append("""SERIE_DOC"" :" & """" & MiDataRow("SERIE_DOC").ToString & """,")
                            resb.Append("""NUMERO_DOC"" :" & """" & MiDataRow("NUMERO_DOC").ToString & """,")
                            resb.Append("""FECHA_UNICA"" :" & """" & MiDataRow("FECHA_UNICA").ToString & """,")
                            resb.Append("""COD_DECLARADO"" :" & """" & MiDataRow("COD_DECLARADO").ToString & """,")
                            resb.Append("""OPORTUNIDAD"" :" & """" & MiDataRow("OPORTUNIDAD").ToString & """,")
                            resb.Append("""FECHA_REGISTRO"" :" & """" & MiDataRow("FECHA_REGISTRO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "5" ' LISTA PROVISION DE GASTOS PROGRAMADOS //CPLPGAS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.CP.CPCuentaPorPagar("Bn").Listar_Provision_gasto(IIf(p_ESTADO_IND = "", Nothing, p_ESTADO_IND),
                                                                    "3",
                                                                     IIf(p_CTLG_CODE = "", Nothing, p_CTLG_CODE),
                                                                      IIf(p_SCSL_CODE = "", Nothing, p_SCSL_CODE),
                                                                    IIf(p_CONC_CODE = "", Nothing, p_CONC_CODE),
                                                                    IIf(p_SCONC_CODE = "", Nothing, p_SCONC_CODE),
                                                                     IIf(p_CODE = "", Nothing, p_CODE),
                                                                     Nothing,
                                                                        IIf(p_FECHA_INI = "", Nothing, p_FECHA_INI),
                                                                            IIf(p_FECHA_FIN = "", Nothing, p_FECHA_FIN), IIf(p_COMPRAS_IND = "T", Nothing, p_COMPRAS_IND))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""GASTO"" :" & """" & MiDataRow("GASTO").ToString & """,")
                            resb.Append("""NOMBRES"" :" & """" & MiDataRow("NOMBRES").ToString & """,")
                            resb.Append("""PIDM_BENE"" :" & """" & MiDataRow("PIDM_BENE").ToString & """,")
                            resb.Append("""GASTO_COD"" :" & """" & MiDataRow("GASTO_COD").ToString & """,")
                            resb.Append("""SUB_GASTO"" :" & """" & MiDataRow("SUB_GASTO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""TIPO_IND"" :" & """" & MiDataRow("TIPO_IND").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                            resb.Append("""MONEDA_CODE"" :" & """" & MiDataRow("MONEDA_CODE").ToString & """,")
                            resb.Append("""PERIODICIDAD_IND"" :" & """" & MiDataRow("PERIODICIDAD_IND").ToString & """,")
                            resb.Append("""FECHA_UNICA"" :" & """" & MiDataRow("FECHA_UNICA").ToString & """,")
                            resb.Append("""EST_IND"" :" & """" & MiDataRow("EST_IND").ToString & """,")
                            resb.Append("""ESTADO_A_I"" :" & """" & MiDataRow("ESTADO_A_I").ToString & """,")
                            resb.Append("""FRECUENCIA"" :" & """" & MiDataRow("FRECUENCIA").ToString & """,")
                            resb.Append("""DATO_FRECUENCIA"" :" & """" & MiDataRow("DATO_FRECUENCIA").ToString & """,")
                            resb.Append("""FECHA_REGISTRO"" :" & """" & MiDataRow("FECHA_REGISTRO").ToString & """,")
                            resb.Append("""DESC_CENTRO_COSTO"" :" & """" & IIf(MiDataRow("DESC_CENTRO_COSTO").ToString = "", "", MiDataRow("DESC_CENTRO_COSTO").ToString) & """,")
                            resb.Append("""CODIGO_CENTRO_COSTO"" :" & """" & IIf(MiDataRow("CODIGO_CENTRO_COSTO").ToString = "", "", MiDataRow("CODIGO_CENTRO_COSTO").ToString) & """,")
                            resb.Append("""COD_CABECERA_CENTRO_COSTO"" :" & """" & IIf(MiDataRow("COD_CABECERA_CENTRO_COSTO").ToString = "", "", MiDataRow("COD_CABECERA_CENTRO_COSTO").ToString) & """,")
                            resb.Append("""DESC_MONEDA"" :" & """" & MiDataRow("DESC_MONEDA").ToString & """,")
                            resb.Append("""TIPO_DCTO"" :" & """" & MiDataRow("TIPO_DCTO").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & MiDataRow("SERIE").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""NUMERO_CONCAT"" :" & """" & MiDataRow("SERIE").ToString & " - " & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""DESC_DCTO"" :" & """" & MiDataRow("DESC_DCTO").ToString & """,")
                            resb.Append("""COMPRAS_IND"" :" & """" & MiDataRow("COMPRAS_IND").ToString & """,")
                            resb.Append("""SERIE_INT"" :" & """" & MiDataRow("SERIE_INT").ToString & """,")
                            resb.Append("""NUMERO_INT"" :" & """" & MiDataRow("NUMERO_INT").ToString & """,")
                            resb.Append("""USUARIO_PROVISIONO"" :" & """" & MiDataRow("USUARIO_PROVISIONO").ToString & """,")
                            resb.Append("""HABIDO_IND_ORG"" :" & """" & MiDataRow("HABIDO_IND_ORG").ToString & """,")
                            resb.Append("""TIPO_BIEN_ORG"" :" & """" & MiDataRow("TIPO_BIEN_ORG").ToString & """,")
                            resb.Append("""OPERACION_ORG"" :" & """" & MiDataRow("OPERACION_ORG").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """,")
                            resb.Append("""NESTADO"" :" & """" & MiDataRow("NESTADO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "10" ' lista 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCTipoDCEmpresa("Bn").Listar_Tipo_dcto_emite("", p_CTLG_CODE, "", "A", "", "S")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""DCTO_CODE"" :" & """" & MiDataRow("DCTO_CODE").ToString & """,")
                            resb.Append("""COMPRAS"" :" & """" & MiDataRow("COMPRAS").ToString & """,")
                            resb.Append("""DOC_INTERNO"" :" & """" & MiDataRow("DOC_INTERNO").ToString & """,")
                            resb.Append("""DCTO_DESC_CORTA"" :" & """" & MiDataRow("DCTO_DESC_CORTA").ToString & """")


                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "PER" 'LISTAR PERSONAS NATURALES
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NF.NFRecepcion("Bn").ListarPersonaNatural("")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PERSONA"" :" & """" & MiDataRow("PERSONA").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")

                            resb.Append("""PPBIDEN_CONDICION_SUNAT"" :" & """" & MiDataRow("PPBIDEN_CONDICION_SUNAT").ToString & """,")
                            resb.Append("""PPBIDEN_ESTADO_SUNAT"" :" & """" & MiDataRow("PPBIDEN_ESTADO_SUNAT").ToString & """,")

                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "98" 'LISTAR PERIODO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim anio As String = Date.Now.Year.ToString()
                    dt = New Nomade.NF.NFPeriodo("Bn").Listar_Periodo("A", "", p_CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PERIODO_DESC"" :" & """" & MiDataRow("PERIODO_DESC").ToString & """,")
                            resb.Append("""COD"" :" & """" & MiDataRow("COD").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "99" 'LISTAR PERIODO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim anio As String = Date.Now.Year.ToString()
                    dt = New Nomade.NF.NFPeriodo("Bn").Listar_Periodo("A", "", p_CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PERIODO_DESC"" :" & """" & MiDataRow("PERIODO_DESC").ToString & """,")
                            resb.Append("""COEFICIENTE"" :" & """" & MiDataRow("COEFICIENTE").ToString & """,")
                            resb.Append("""NUMERO_MES"" :" & """" & MiDataRow("NUMERO_MES").ToString & """,")
                            resb.Append("""ANO"" :" & """" & MiDataRow("ANO").ToString & """,")
                            resb.Append("""COD"" :" & """" & MiDataRow("COD").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "100" 'LISTAR PERIODO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim anio As String = Date.Now.Year.ToString()
                    dt = New Nomade.NF.NFPeriodo("Bn").Listar_Periodo("", "", p_CTLG_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PERIODO_DESC"" :" & """" & MiDataRow("PERIODO_DESC").ToString & """,")
                            resb.Append("""COEFICIENTE"" :" & """" & MiDataRow("COEFICIENTE").ToString & """,")
                            resb.Append("""NUMERO_MES"" :" & """" & MiDataRow("NUMERO_MES").ToString & """,")
                            resb.Append("""ANO"" :" & """" & MiDataRow("ANO").ToString & """,")
                            resb.Append("""COD"" :" & """" & MiDataRow("COD").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "LGASTOS"
                    context.Response.ContentType = "application/json; charset=utf-8"

                    If p_FECHA_INI_EMI = "" Then
                        p_FECHA_INI_EMI = Nothing
                    Else
                        p_FECHA_INI_EMI = Utilities.fechaLocal(p_FECHA_INI_EMI)
                    End If

                    If p_FECHA_FIN_EMI = "" Then
                        p_FECHA_FIN_EMI = Nothing
                    Else
                        p_FECHA_FIN_EMI = Utilities.fechaLocal(p_FECHA_FIN_EMI)
                    End If

                    Dim oCPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
                    Dim oDT As New DataTable
                    oDT = oCPCuentaPorPagar.fnListarGasto(p_CTLG_CODE, p_SCSL_CODE, p_CODE, p_FECHA_INI_EMI, p_FECHA_FIN_EMI, p_ESTADO_IND)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "LGASTOS_PROG" ' LISTA PROVISION DE GASTOS UNICOS //CPLPGAS
                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim oCPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")

                    If (p_FECHA_INI_EMI = "") Then
                        p_FECHA_INI_EMI = Nothing
                    Else
                        p_FECHA_INI_EMI = Utilities.fechaLocal(p_FECHA_INI_EMI)
                    End If

                    If (p_FECHA_FIN_EMI = "") Then
                        p_FECHA_FIN_EMI = Nothing
                    Else
                        p_FECHA_FIN_EMI = Utilities.fechaLocal(p_FECHA_FIN_EMI)
                    End If

                    p_COMPRAS_IND = IIf(p_COMPRAS_IND = "T", Nothing, p_COMPRAS_IND)
                    p_CONC_CODE = IIf(p_CONC_CODE = "", Nothing, p_CONC_CODE)
                    p_SCONC_CODE = IIf(p_SCONC_CODE = "", Nothing, p_SCONC_CODE)
                    p_ESTADO_IND = IIf(p_ESTADO_IND = "", Nothing, p_ESTADO_IND)


                    If (p_FECHA_INI = "") Then
                        p_FECHA_INI = Nothing
                    Else
                        p_FECHA_INI = Utilities.fechaLocal(p_FECHA_INI)
                    End If

                    If (p_FECHA_FIN = "") Then
                        p_FECHA_FIN = Nothing
                    Else
                        p_FECHA_FIN = Utilities.fechaLocal(p_FECHA_FIN)
                    End If

                    p_CENTRO_COSTOS = IIf(p_CENTRO_COSTOS = "", Nothing, p_CENTRO_COSTOS)

                    Dim oDT As New DataTable()
                    oDT = oCPCuentaPorPagar.fnLISTAR_GASTO_PROG(p_CTLG_CODE, p_SCSL_CODE, p_FECHA_INI_EMI, p_FECHA_FIN_EMI, p_COMPRAS_IND,
                                                                p_CONC_CODE, p_SCONC_CODE, p_ESTADO_IND, p_FECHA_INI, p_FECHA_FIN, p_CENTRO_COSTOS)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If
                Case Else
            End Select
            context.Response.Write(res)

        Catch ex As Exception
            Dim sMensajeError As String = ex.Message
            If (sMensajeError.IndexOf("[Advertencia]:") > -1) Then
                context.Response.Write(sMensajeError)
            Else
                context.Response.Write("[Error]: " + sMensajeError)
            End If
        End Try
    End Sub


    'Public Function Verifica_Existe_Provision(ByVal p_PIDM_BENEFICIARIO As String, ByVal p_SERIE As String,
    '                                    ByVal p_NUMERO As String, p_TIPO As String, p_COD_GASTO As String, ByVal p_COD_DOCUMENTO As String) As String

    '    Dim Datos As String
    '    Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
    '    Datos = CPCuentaPorPagar.Verificar_Provision_Gasto(p_PIDM_BENEFICIARIO,
    '                                                   IIf(p_SERIE = "", Nothing, p_SERIE),
    '                                                   IIf(p_NUMERO = "", Nothing, p_NUMERO),
    '                                                   p_TIPO, p_COD_GASTO, IIf(p_COD_DOCUMENTO = "", Nothing, p_COD_DOCUMENTO))
    '    CPCuentaPorPagar = Nothing
    '    Return Datos
    'End Function

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

    'Public Function Crear_Aprobacion_Gasto(ByVal p_CODE_REF_GASTO As String, ByVal p_ESTADO As String,
    '                                    ByVal p_MONTO As Decimal, ByVal p_FECHA_APROBACION As String, ByVal p_FECHA_OPERACION As String,
    '                                    ByVal p_USUA_ID As String,
    '                                     ByVal p_GLOSA As String,
    '                                    ByVal p_FECHA_VENCIMIENTO As String,
    '                                    ByVal p_NRO_DCTO_REF As String,
    '                                    p_SERIE As String,
    '                                    p_DCTO_CODE As String,
    '                                    p_CENTRO_COSTO_CODE As String,
    '                                    p_CENTRO_COSTO_CABECERA As String,
    '                                    p_IND_COMPRAS As String,
    '                                    p_MES_TRIB As String, p_ANIO_TRIB As String) As Array

    '    Dim Datos(3) As String
    '    Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
    '    Datos = CPCuentaPorPagar.Crear_Aprobacion_Gasto(p_CODE_REF_GASTO, p_ESTADO, p_MONTO, p_FECHA_APROBACION, p_FECHA_OPERACION, p_USUA_ID, p_GLOSA, p_FECHA_VENCIMIENTO, p_NRO_DCTO_REF, p_SERIE, p_DCTO_CODE, p_CENTRO_COSTO_CODE, p_CENTRO_COSTO_CABECERA, p_IND_COMPRAS, p_MES_TRIB, p_ANIO_TRIB,
    '                                                    p_HABIDO_IND, p_TIPO_BIEN, p_OPERACION)
    '    CPCuentaPorPagar = Nothing
    '    Return Datos
    'End Function


    Public Function Crear_Pago_Diverso(ByVal p_FACGADI_MONE_CODE As String,
     ByVal p_FACGADI_MONTO As Decimal,
     ByVal p_FACGADI_MODULO_CODE As String,
     ByVal p_FACGADI_FECHA_TRANSACCION As String,
     ByVal p_FACGADI_FECHA_VENCIMIENTO As String,
     ByVal p_FACGADI_REF_CODE As String,
     ByVal p_FACGADI_MODALIDAD_PAGO As String,
     ByVal p_FACGADI_USUA_ID As String,
     ByVal p_FACGADI_FECHA_PAGO_PROG As String,
      ByVal p_PIDM As String,
      ByVal p_FECHA_EMISION As String,
       ByVal p_REF_DCTO_DESC As String,
      ByVal p_REF_DCTO_NRO As String,
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

    Public Function Anula_Aprobacion_Gasto(ByVal p_CODE_REF_GASTO As String, ByVal p_ESTADO As String,
                                           ByVal p_USUA_ID As String) As String

        Dim Datos As String
        Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
        Datos = CPCuentaPorPagar.Anular_Aprobacion_Gasto(p_CODE_REF_GASTO, p_ESTADO, p_USUA_ID)
        CPCuentaPorPagar = Nothing
        Return Datos
    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
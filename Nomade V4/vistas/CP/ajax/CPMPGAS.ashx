<%@ WebHandler Language="VB" Class="CPMPGAS" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CPMPGAS : Implements IHttpHandler
    Dim OPCION As String
    Dim filtrotypeahead, p_FECHA_FIN, p_CENTRO_COSTO, p_CENTRO_COSTO_CABECERA, p_FECHA_INI,
        p_ESTADO_PAG, p_ESTADO_IND, p_MONE_CODE, p_CODE, p_CTA_CONTABLE, p_NRO_DCTO_REF,
        p_FECHA_UNICA, p_FRECUENCIA, p_CONC_CODE, p_PERIOCIDAD, p_CTLG_CODE, p_DESC_GASTO,
        p_SCONC_CODE, p_SCSL_CODE, p_TIPO_IND, p_USUA_ID, p_TIPO_DCTO, p_SERIE, p_NUMERO,
        p_COMPRAS_IND, p_FECHA_FIN_EMI, p_GASTO_CONCATENADO, p_FECHA_INI_EMI, p_CENTRO_COSTOS, p_PERIODO, p_CODIGO, p_MES_TRIB, p_ANIO_TRIB, p_DETALLE_GASTO, p_DEDUCIBLE_IND,
        p_HABIDO_IND, p_TIPO_BIEN, p_OPERACION, p_DECLARA, p_FECHA_VENCI, p_DETRACCION_IND, p_IMPORTE_DETRACCION, p_IMPORTE_PAGAR As String
    Dim dt As DataTable
    Dim p_DATO_FRECUENCIA, p_PIDM_BENEFICIARIO As Integer
    Dim p_MONTO As Decimal
    Dim res As String
    Dim resb As New StringBuilder


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try
            OPCION = context.Request("OPCION")

            filtrotypeahead = context.Request("q")
            p_CONC_CODE = context.Request("p_CONC_CODE")
            p_CTLG_CODE = context.Request("p_CTLG_CODE")
            p_DATO_FRECUENCIA = IIf(context.Request("p_DATO_FRECUENCIA") = "", 0, context.Request("p_DATO_FRECUENCIA"))
            p_DESC_GASTO = vChar(context.Request("p_DESC_GASTO"))
            p_DETALLE_GASTO = vChar(context.Request("p_DETALLE_GASTO"))
            p_ESTADO_IND = context.Request("p_ESTADO_IND")
            p_FECHA_UNICA = context.Request("p_FECHA_UNICA")
            p_FRECUENCIA = context.Request("p_FRECUENCIA")
            p_MONTO = context.Request("p_MONTO")
            p_PERIOCIDAD = context.Request("p_PERIOCIDAD")
            p_DEDUCIBLE_IND = context.Request("p_DEDUCIBLE_IND")
            p_PIDM_BENEFICIARIO = context.Request("p_PIDM_BENEFICIARIO")
            p_SCONC_CODE = context.Request("p_SCONC_CODE")
            p_SCSL_CODE = context.Request("p_SCSL_CODE")
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
            p_OPERACION = context.Request("p_OPERACION")
            p_DECLARA = context.Request("p_DECLARA")
            p_FECHA_VENCI = context.Request("p_FECHA_VENCI")
            p_DETRACCION_IND = context.Request("p_DETRACCION_IND")
            p_IMPORTE_DETRACCION = context.Request("p_IMPORTE_DETRACCION")
            p_IMPORTE_PAGAR = context.Request("p_IMPORTE_PAGAR")
            '---------------------------------------------

            Select Case OPCION
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
                            resb.Append("""DETRACCION_IND"" :" & """" & MiDataRow("DETRACCION_IND").ToString & """,")
                            resb.Append("""IMPORTE_DETRACCION"" :" & """" & MiDataRow("IMPORTE_DETRACCION").ToString & """,")
                            resb.Append("""IMPORTE_PAGAR"" :" & """" & MiDataRow("IMPORTE_PAGAR").ToString & """,")

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


                Case "DETGAST" ' lista 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.CP.CPCuentaPorPagar("Bn").Listar_Detalle_Provision_gasto(p_CODE)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If

                Case "4" ' LISTA PROVISION DE GASTOS UNICOS //CPLPGAS
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

                    dt = New Nomade.CP.CPCuentaPorPagar("Bn").Listar_Provision_gasto(
                                                                    IIf(p_ESTADO_IND = "", Nothing, p_ESTADO_IND),
                                                                    "2",
                                                                     IIf(p_CTLG_CODE = "", Nothing, p_CTLG_CODE),
                                                                      IIf(p_SCSL_CODE = "", Nothing, p_SCSL_CODE),
                                                                    IIf(p_CONC_CODE = "", Nothing, p_CONC_CODE),
                                                                    IIf(p_SCONC_CODE = "", Nothing, p_SCONC_CODE),
                                                                     IIf(p_CODE = "", Nothing, p_CODE),
                                                                     IIf(p_ESTADO_PAG = "", Nothing, p_ESTADO_PAG),
                                                                        IIf(p_FECHA_INI = "", Nothing, p_FECHA_INI),
                                                                            IIf(p_FECHA_FIN = "", Nothing, p_FECHA_FIN), IIf(p_COMPRAS_IND = "T", Nothing, p_COMPRAS_IND),
                                                                                 IIf(p_MES_TRIB = "", Nothing, p_MES_TRIB),
                                                                                    IIf(p_ANIO_TRIB = "", Nothing, p_ANIO_TRIB),
                                                                                       IIf(p_PERIODO = "", Nothing, p_PERIODO),
                                                                                           IIf(p_FECHA_INI_EMI = "", Nothing, p_FECHA_INI_EMI),
                                                                                               IIf(p_FECHA_FIN_EMI = "", Nothing, p_FECHA_FIN_EMI),
                                                                                                IIf(p_CENTRO_COSTOS = Nothing, "", p_CENTRO_COSTOS)
                                                                    )
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
                            resb.Append("""DESC_GASTO"" :" & """" & MiDataRow("DESC_GASTO").ToString & """,")
                            resb.Append("""DESC_SUBGASTO"" :" & """" & MiDataRow("DESC_SUBGASTO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""TIPO_IND"" :" & """" & MiDataRow("TIPO_IND").ToString & """,")
                            resb.Append("""MONTO"" :" & """" & MiDataRow("MONTO").ToString & """,")
                            resb.Append("""MONEDA_CODE"" :" & """" & MiDataRow("MONEDA_CODE").ToString & """,")
                            resb.Append("""PERIODICIDAD_IND"" :" & """" & MiDataRow("PERIODICIDAD_IND").ToString & """,")
                            resb.Append("""FECHA_UNICA"" :" & """" & MiDataRow("FECHA_UNICA").ToString & """,")
                            resb.Append("""FEC_EMISION"" :" & """" & MiDataRow("FEC_EMISION").ToString & """,")
                            resb.Append("""EST_IND"" :" & """" & MiDataRow("EST_IND").ToString & """,")
                            resb.Append("""ESTADO_A_I"" :" & """" & MiDataRow("ESTADO_A_I").ToString & """,")
                            resb.Append("""DESC_MONEDA"" :" & """" & MiDataRow("DESC_MONEDA").ToString & """,")
                            resb.Append("""FECHA_REGISTRO"" :" & """" & MiDataRow("FECHA_REGISTRO").ToString & """,")
                            resb.Append("""DESC_CENTRO_COSTO"" :" & """" & IIf(MiDataRow("DESC_CENTRO_COSTO").ToString = "", "", MiDataRow("DESC_CENTRO_COSTO").ToString) & """,")
                            resb.Append("""CODIGO_CENTRO_COSTO"" :" & """" & IIf(MiDataRow("CODIGO_CENTRO_COSTO").ToString = "", "", MiDataRow("CODIGO_CENTRO_COSTO").ToString) & """,")
                            resb.Append("""COD_CABECERA_CENTRO_COSTO"" :" & """" & IIf(MiDataRow("COD_CABECERA_CENTRO_COSTO").ToString = "", "", MiDataRow("COD_CABECERA_CENTRO_COSTO").ToString) & """,")
                            resb.Append("""TIPO_DCTO"" :" & """" & MiDataRow("TIPO_DCTO").ToString & """,")
                            resb.Append("""DESC_DCTO"" :" & """" & MiDataRow("DESC_DCTO").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & MiDataRow("SERIE").ToString & """,")
                            resb.Append("""NUMERO"" :" & """" & MiDataRow("NUMERO").ToString & """,")

                            resb.Append("""MOVCONT_CODE"" :" & """" & MiDataRow("MOVCONT_CODE").ToString & """,")
                            resb.Append("""FECHA_VENCIMIENTO"" :" & """" & MiDataRow("FECHA_VENCIMIENTO").ToString & """,")

                            resb.Append("""DEDUCIBLE"" :" & """" & MiDataRow("DEDUCIBLE").ToString & """,")
                            resb.Append("""NUMERO_CONCAT"" :" & """" & MiDataRow("SERIE").ToString & " - " & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""SERIE_INT"" :" & """" & MiDataRow("SERIE_INT").ToString & """,")
                            resb.Append("""NUMERO_INT"" :" & """" & MiDataRow("NUMERO_INT").ToString & """,")
                            resb.Append("""COMPRAS_IND"" :" & """" & MiDataRow("COMPRAS_IND").ToString & """,")
                            resb.Append("""SOLICITA"" :" & """" & MiDataRow("SOLICITA").ToString & """,")
                            resb.Append("""ANIO_TRIB"" :" & """" & MiDataRow("ANIO_TRIB").ToString & """,")
                            resb.Append("""MES_TRIB"" :" & """" & MiDataRow("MES_TRIB").ToString & """,")
                            resb.Append("""USUARIO_PROVISIONO"" :" & """" & MiDataRow("USUARIO_PROVISIONO").ToString & """,")
                            resb.Append("""HABIDO_IND"" :" & """" & MiDataRow("HABIDO_IND").ToString & """,")
                            resb.Append("""TIPO_BIEN"" :" & """" & MiDataRow("TIPO_BIEN").ToString & """,")
                            resb.Append("""DETRACCION_IND"" :" & """" & MiDataRow("DETRACCION_IND").ToString & """,")
                            resb.Append("""IMPORTE_DETRACCION"" :" & """" & MiDataRow("IMPORTE_DETRACCION").ToString & """,")
                            resb.Append("""IMPORTE_PAGAR"" :" & """" & MiDataRow("IMPORTE_PAGAR").ToString & """,")
                            'resb.Append("""OPERACION"" :" & """" & MiDataRow("OPERACION").ToString & """,")
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
                Case "G" 'CREAR PROVISION DE GASTO UNICOY PROGRAMADO
                    context.Response.ContentType = "text/html"
                    Dim r As String = ""
                    r = Verifica_Existe_Provision(p_PIDM_BENEFICIARIO, p_SERIE, p_NUMERO, "1", "", p_TIPO_DCTO)
                    If r = "C" Then
                        res = Crear_Provision_Gasto(p_CONC_CODE, p_CTLG_CODE, p_DATO_FRECUENCIA, p_DESC_GASTO,
                                               p_ESTADO_IND, IIf(Utilities.fechaLocal(p_FECHA_UNICA) = "", Nothing, Utilities.fechaLocal(p_FECHA_UNICA)), IIf(p_FRECUENCIA = "", Nothing, p_FRECUENCIA), p_MONTO,
                                               p_PERIOCIDAD, p_PIDM_BENEFICIARIO, p_SCONC_CODE,
                                               p_SCSL_CODE, p_TIPO_IND, p_USUA_ID, p_NRO_DCTO_REF, p_CTA_CONTABLE, p_MONE_CODE, p_CENTRO_COSTO, p_CENTRO_COSTO_CABECERA,
                                               p_TIPO_DCTO, p_SERIE, p_NUMERO, p_COMPRAS_IND, p_MES_TRIB, p_ANIO_TRIB,
                                               p_HABIDO_IND, p_TIPO_BIEN, p_DETALLE_GASTO, p_DEDUCIBLE_IND, p_DECLARA, IIf(Utilities.fechaLocal(p_FECHA_VENCI) = "", Nothing, Utilities.fechaLocal(p_FECHA_VENCI)),
                                               p_DETRACCION_IND, p_IMPORTE_DETRACCION, p_IMPORTE_PAGAR)
                    ElseIf r = "X" Then
                        res = "X"
                    End If

                Case "AT" 'ACTUALIZAR/MODIFICAR PROVISION GASTO UNICO
                    context.Response.ContentType = "text/html"
                    Dim r As String = ""
                    r = Verifica_Existe_Provision(p_PIDM_BENEFICIARIO, p_SERIE, p_NUMERO, "3", p_CODE, p_TIPO_DCTO)
                    If r = "C" Then
                        res = Actualizar_Provision_Gasto(p_CONC_CODE, p_CTLG_CODE, p_DATO_FRECUENCIA, p_DESC_GASTO,
                                             p_ESTADO_IND, IIf(Utilities.fechaLocal(p_FECHA_UNICA) = "", Nothing, Utilities.fechaLocal(p_FECHA_UNICA)), IIf(p_FRECUENCIA = "", Nothing, p_FRECUENCIA), p_MONTO,
                                             p_PERIOCIDAD, p_PIDM_BENEFICIARIO, p_SCONC_CODE,
                                             p_SCSL_CODE, p_TIPO_IND, p_USUA_ID, p_CTA_CONTABLE, p_MONE_CODE, p_CODE, p_CENTRO_COSTO, p_CENTRO_COSTO_CABECERA,
                                             p_TIPO_DCTO, p_SERIE, p_NUMERO, p_COMPRAS_IND, p_HABIDO_IND, p_TIPO_BIEN, p_OPERACION, p_DETALLE_GASTO, p_DEDUCIBLE_IND, p_DECLARA, IIf(Utilities.fechaLocal(p_FECHA_VENCI) = "", Nothing, Utilities.fechaLocal(p_FECHA_VENCI)),
                                             p_DETRACCION_IND, p_IMPORTE_DETRACCION, p_IMPORTE_PAGAR)
                    ElseIf r = "X" Then
                        res = "X"
                    End If

                Case "A"
                    context.Response.ContentType = "text/html"
                    res = Actualizar_Programacion_Gasto(p_CONC_CODE, p_CTLG_CODE, p_DATO_FRECUENCIA, p_DESC_GASTO,
                                                p_ESTADO_IND, IIf(Utilities.fechaLocal(p_FECHA_UNICA) = "", Nothing, Utilities.fechaLocal(p_FECHA_UNICA)), IIf(p_FRECUENCIA = "", Nothing, p_FRECUENCIA), p_MONTO,
                                                p_PERIOCIDAD, p_PIDM_BENEFICIARIO, p_SCONC_CODE,
                                                p_SCSL_CODE, p_TIPO_IND, p_USUA_ID, p_CTA_CONTABLE, p_MONE_CODE, p_CODE, p_CENTRO_COSTO, p_CENTRO_COSTO_CABECERA,
                                                p_TIPO_DCTO, p_SERIE, p_NUMERO, p_COMPRAS_IND)
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

                Case "AP" ' APROBAR PROVISION DE GASTO
                    Dim cod_prov As String
                    Dim cod_apro(3) As String
                    Dim cod_pago As String
                    Dim cod_cred As String
                    Dim p_fecha As String = Convert.ToDateTime(Date.Now).ToString("dd/MM/yyyy")

                    context.Response.ContentType = "text/html"
                    Dim r As String = ""
                    r = Verifica_Existe_Provision(p_PIDM_BENEFICIARIO, p_SERIE, p_NUMERO, "1", "", p_TIPO_DCTO)
                    If r = "C" Then
                        'CREA PROVISION
                        cod_prov = Crear_Provision_Gasto(p_CONC_CODE, p_CTLG_CODE, p_DATO_FRECUENCIA, p_DESC_GASTO,
                                                    p_ESTADO_IND, IIf(Utilities.fechaLocal(p_FECHA_UNICA) = "", Nothing, Utilities.fechaLocal(p_FECHA_UNICA)), IIf(p_FRECUENCIA = "", Nothing, p_FRECUENCIA), p_MONTO,
                                                    p_PERIOCIDAD, p_PIDM_BENEFICIARIO, p_SCONC_CODE,
                                                    p_SCSL_CODE, p_TIPO_IND, p_USUA_ID, p_NRO_DCTO_REF, p_CTA_CONTABLE, p_MONE_CODE, p_CENTRO_COSTO, p_CENTRO_COSTO_CABECERA,
                                                    p_TIPO_DCTO, p_SERIE, p_NUMERO, p_COMPRAS_IND, p_MES_TRIB, p_ANIO_TRIB,
                                                    p_HABIDO_IND, p_TIPO_BIEN, p_DETALLE_GASTO, p_DEDUCIBLE_IND, p_DECLARA, IIf(Utilities.fechaLocal(p_FECHA_VENCI) = "", Nothing, Utilities.fechaLocal(p_FECHA_VENCI)),
                                                    p_DETRACCION_IND, p_IMPORTE_DETRACCION, p_IMPORTE_PAGAR)


                        If cod_prov.Length = 15 Then
                            'CREA APROBACION
                            cod_apro = Crear_Aprobacion_Gasto(cod_prov, "2", p_MONTO, IIf(p_fecha = "", Nothing, Utilities.fechaLocal(p_fecha)),
                                                         IIf(p_fecha = "", Nothing, Utilities.fechaLocal(p_fecha)), p_USUA_ID, p_DESC_GASTO, IIf(Utilities.fechaLocal(p_FECHA_UNICA) = "", Nothing, Utilities.fechaLocal(p_FECHA_UNICA)),
                                                         p_NUMERO, p_SERIE, p_TIPO_DCTO, p_CENTRO_COSTO,
                                                         p_CENTRO_COSTO_CABECERA, p_COMPRAS_IND, p_MES_TRIB, p_ANIO_TRIB, p_DETALLE_GASTO, p_DETRACCION_IND, p_IMPORTE_DETRACCION, p_IMPORTE_PAGAR)

                            If cod_apro(0).Length = 8 Then
                                'CREA PAGO DIVERSO
                                'SE CAMBIÓ p_MONTO POR p_IMPORTE_PAGAR
                                context.Response.ContentType = "text/html"
                                cod_pago = Crear_Pago_Diverso(p_MONE_CODE,
                                                       p_IMPORTE_PAGAR,
                                                       "0003",
                                                       Utilities.fechaLocal(p_fecha),
                                                       Utilities.fechaLocal(p_fecha),
                                                       cod_prov,
                                                       Nothing,
                                                       p_USUA_ID,
                                                       Utilities.fechaLocal(p_fecha),
                                                       p_PIDM_BENEFICIARIO,
                                                       Utilities.fechaLocal(p_fecha),
                                                       p_GASTO_CONCATENADO,
                                                       IIf(p_SERIE = "", String.Empty, p_SERIE & "-") & IIf(p_NUMERO = "", String.Empty, p_NUMERO),
                                                       p_CONC_CODE)

                                If cod_pago.Length = 9 Then
                                    'CREA CREDITO
                                    'SE CAMBIÓ p_MONTO POR p_IMPORTE_PAGAR
                                    context.Response.ContentType = "text/html"
                                    cod_cred = Crear_Credito(p_CTLG_CODE, p_SCSL_CODE, cod_pago,
                                                           Utilities.fechaLocal(p_fecha),
                                                           p_IMPORTE_PAGAR,
                                                           "CR",
                                                           "",
                                                           p_USUA_ID,
                                                           Utilities.fechaLocal(p_fecha),
                                                           p_MONE_CODE,
                                                           Utilities.fechaLocal(p_fecha),
                                                           Nothing,
                                                          "P")
                                    If cod_cred.Length = 10 Then
                                        res = "OK," + cod_prov
                                    Else
                                        res = "ERROR AL CREAR CREDITO"
                                    End If
                                Else
                                    res = "ERROR AL CREAR PAGO DIVERSO"
                                End If
                            Else
                                res = "ERROR AL CREAR APROBACION"
                            End If
                        Else
                            res = "ERROR AL CREAR PROVISION"
                        End If
                    ElseIf r = "X" Then
                        res = "X"
                    End If

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

                Case "LGASTOS_NO_PROG" ' LISTA PROVISION DE GASTOS UNICOS //CPLPGAS
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
                    p_ANIO_TRIB = IIf(p_ANIO_TRIB = "", Nothing, p_ANIO_TRIB)
                    p_MES_TRIB = IIf(p_MES_TRIB = "", Nothing, p_MES_TRIB)
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
                    oDT = oCPCuentaPorPagar.fnLISTAR_GASTO_NO_PROG(p_CTLG_CODE, p_SCSL_CODE, p_FECHA_INI_EMI, p_FECHA_FIN_EMI, p_COMPRAS_IND, p_ANIO_TRIB, p_MES_TRIB,
                                                                   p_CONC_CODE, p_SCONC_CODE, p_ESTADO_IND, p_FECHA_INI, p_FECHA_FIN, p_CENTRO_COSTOS)
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



    Public Function Crear_Provision_Gasto(ByVal p_CONC_CODE As String, ByVal p_CTLG_CODE As String,
                                          ByVal p_DATO_FRECUENCIA As Integer, ByVal p_DESC_GASTO As String,
                                          ByVal p_ESTADO_IND As String, ByVal p_FECHA_UNICA As String,
                                          ByVal p_FRECUENCIA As String,
                                          ByVal p_MONTO As Decimal, ByVal p_PERIOCIDAD As String,
                                          ByVal p_PIDM_BENEFICIARIO As Integer, ByVal p_SCONC_CODE As String,
                                          ByVal p_SCSL_CODE As String, ByVal p_TIPO_IND As String,
                                          ByVal p_USUA_ID As String, ByVal p_NRO_DCTO_REF As String, ByVal p_CTA_CONTABLE As String,
                                          ByVal p_MONE_CODE As String,
                                          ByVal p_CENTRO_COSTO As String,
                                          ByVal p_CENTRO_COSTO_CABECERA As String,
                                          ByVal p_TIPO_DCTO As String,
                                          ByVal p_SERIE As String,
                                          ByVal p_NUMERO As String,
                                          ByVal p_COMPRAS_IND As String, p_MES_TRIB As String, p_ANIO_TRIB As String,
                                          ByVal p_HABIDO_IND As String, ByVal p_TIPO_BIEN As String, p_DETALLE_GASTO As String, p_DEDUCIBLE_IND As String, ByVal p_DECLARA As String, ByVal p_FECHA_VENCI As String,
                                          ByVal p_DETRACCION_IND As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_PAGAR As String) As String

        Dim Datos As String
        Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
        Datos = CPCuentaPorPagar.Crear_Provision_Gasto(p_CONC_CODE, p_CTLG_CODE,
                                                       p_DATO_FRECUENCIA, p_DESC_GASTO,
                                                       p_ESTADO_IND, p_FECHA_UNICA,
                                                       p_FRECUENCIA,
                                                       p_MONTO, p_PERIOCIDAD,
                                                       p_PIDM_BENEFICIARIO, p_SCONC_CODE,
                                                       p_SCSL_CODE, p_TIPO_IND,
                                                       p_USUA_ID, p_NRO_DCTO_REF,
                                                       p_CTA_CONTABLE,
                                                       p_MONE_CODE,
                                                       IIf(p_CENTRO_COSTO = "", Nothing, p_CENTRO_COSTO), IIf(p_CENTRO_COSTO_CABECERA = "", Nothing, p_CENTRO_COSTO_CABECERA),
                                                       IIf(p_TIPO_DCTO = "", Nothing, p_TIPO_DCTO),
                                                       IIf(p_SERIE = "", Nothing, p_SERIE),
                                                       IIf(p_NUMERO = "", Nothing, p_NUMERO),
                                                       p_COMPRAS_IND, p_MES_TRIB, p_ANIO_TRIB,
                                                       p_HABIDO_IND, p_TIPO_BIEN, p_DETALLE_GASTO, p_DEDUCIBLE_IND, p_DECLARA, p_FECHA_VENCI, p_DETRACCION_IND, p_IMPORTE_DETRACCION, p_IMPORTE_PAGAR)
        CPCuentaPorPagar = Nothing
        Return Datos
    End Function


    Public Function Verifica_Existe_Provision(ByVal p_PIDM_BENEFICIARIO As String, ByVal p_SERIE As String,
                                        ByVal p_NUMERO As String, p_TIPO As String, p_COD_GASTO As String, ByVal p_TIPO_DCTO As String) As String

        Dim Datos As String
        Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
        Datos = CPCuentaPorPagar.Verificar_Provision_Gasto(p_PIDM_BENEFICIARIO,
                                                       IIf(p_SERIE = "", Nothing, p_SERIE),
                                                       IIf(p_NUMERO = "", Nothing, p_NUMERO),
                                                       p_TIPO, p_COD_GASTO, IIf(p_TIPO_DCTO = "", Nothing, p_TIPO_DCTO))
        CPCuentaPorPagar = Nothing
        Return Datos
    End Function




    Public Function Actualizar_Provision_Gasto(ByVal p_CONC_CODE As String, ByVal p_CTLG_CODE As String,
                                          ByVal p_DATO_FRECUENCIA As Integer, ByVal p_DESC_GASTO As String,
                                          ByVal p_ESTADO_IND As String, ByVal p_FECHA_UNICA As String,
                                          ByVal p_FRECUENCIA As String,
                                          ByVal p_MONTO As Decimal, ByVal p_PERIOCIDAD As String,
                                          ByVal p_PIDM_BENEFICIARIO As Integer, ByVal p_SCONC_CODE As String,
                                          ByVal p_SCSL_CODE As String, ByVal p_TIPO_IND As String,
                                          ByVal p_USUA_ID As String, ByVal p_CTA_CONTABLE As String,
                                          ByVal p_MONE_CODE As String, ByVal p_CODIGO As String,
                                          p_CENTRO_COSTO As String,
                                          p_CENTRO_COSTO_CABECERA As String,
                                          ByVal p_TIPO_DCTO As String,
                                          ByVal p_SERIE As String,
                                          ByVal p_NUMERO As String,
                                          ByVal p_COMPRAS_IND As String,
                                          ByVal p_HABIDO_IND As String,
                                          ByVal p_TIPO_BIEN As String,
                                          ByVal p_OPERACION As String, ByVal p_DETALLE_GASTO As String, ByVal p_DEDUCIBLE_IND As String, ByVal p_DECLARA As String, ByVal p_FECHA_VENCI As String,
                                          ByVal p_DETRACCION_IND As String, ByVal p_IMPORTE_DETRACCION As String, ByVal p_IMPORTE_PAGAR As String) As String

        Dim Datos As String
        Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
        Datos = CPCuentaPorPagar.Actualizar_Provision_Gasto(p_CONC_CODE, p_CTLG_CODE,
                                                       p_DATO_FRECUENCIA, p_DESC_GASTO,
                                                       p_ESTADO_IND, p_FECHA_UNICA,
                                                       p_FRECUENCIA,
                                                       p_MONTO, p_PERIOCIDAD,
                                                       p_PIDM_BENEFICIARIO, p_SCONC_CODE,
                                                       p_SCSL_CODE, p_TIPO_IND,
                                                       p_USUA_ID,
                                                       p_CTA_CONTABLE,
                                                       p_MONE_CODE, p_CODIGO, IIf(p_CENTRO_COSTO = "", Nothing, p_CENTRO_COSTO), IIf(p_CENTRO_COSTO_CABECERA = "", Nothing, p_CENTRO_COSTO_CABECERA),
                                                       IIf(p_TIPO_DCTO = "", Nothing, p_TIPO_DCTO),
                                                       IIf(p_SERIE = "", Nothing, p_SERIE),
                                                       IIf(p_NUMERO = "", Nothing, p_NUMERO),
                                                       p_COMPRAS_IND, p_HABIDO_IND, p_TIPO_BIEN, p_OPERACION, p_DETALLE_GASTO, p_DEDUCIBLE_IND, p_DECLARA, p_FECHA_VENCI,
                                                       p_DETRACCION_IND, p_IMPORTE_DETRACCION, p_IMPORTE_PAGAR)
        CPCuentaPorPagar = Nothing
        Return Datos
    End Function



    Public Function Actualizar_Programacion_Gasto(ByVal p_CONC_CODE As String, ByVal p_CTLG_CODE As String,
                                      ByVal p_DATO_FRECUENCIA As Integer, ByVal p_DESC_GASTO As String,
                                      ByVal p_ESTADO_IND As String, ByVal p_FECHA_UNICA As String,
                                      ByVal p_FRECUENCIA As String,
                                      ByVal p_MONTO As Decimal, ByVal p_PERIOCIDAD As String,
                                      ByVal p_PIDM_BENEFICIARIO As Integer, ByVal p_SCONC_CODE As String,
                                      ByVal p_SCSL_CODE As String, ByVal p_TIPO_IND As String,
                                      ByVal p_USUA_ID As String, ByVal p_CTA_CONTABLE As String,
                                      ByVal p_MONE_CODE As String, ByVal p_CODIGO As String, p_CENTRO_COSTO As String,
                                      p_CENTRO_COSTO_CABECERA As String,
                                      ByVal p_TIPO_DCTO As String,
                                          ByVal p_SERIE As String,
                                          ByVal p_NUMERO As String,
                                          ByVal p_COMPRAS_IND As String) As String

        Dim Datos As String
        Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
        Datos = CPCuentaPorPagar.Actualizar_Programacion_Gasto(p_CONC_CODE, p_CTLG_CODE,
                                                       p_DATO_FRECUENCIA, p_DESC_GASTO,
                                                       p_ESTADO_IND, p_FECHA_UNICA,
                                                       p_FRECUENCIA,
                                                       p_MONTO, p_PERIOCIDAD,
                                                       p_PIDM_BENEFICIARIO, p_SCONC_CODE,
                                                       p_SCSL_CODE, p_TIPO_IND,
                                                       p_USUA_ID,
                                                       p_CTA_CONTABLE,
                                                       p_MONE_CODE, p_CODIGO, p_CENTRO_COSTO, p_CENTRO_COSTO_CABECERA,
                                                       IIf(p_TIPO_DCTO = "", Nothing, p_TIPO_DCTO),
                                                       IIf(p_SERIE = "", Nothing, p_SERIE),
                                                       IIf(p_NUMERO = "", Nothing, p_NUMERO),
                                                       p_COMPRAS_IND, p_HABIDO_IND, p_TIPO_BIEN, p_OPERACION)
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
                                        p_SERIE As String,
                                        p_DCTO_CODE As String,
                                        p_CENTRO_COSTO_CODE As String,
                                        p_CENTRO_COSTO_CABECERA As String,
                                        p_IND_COMPRAS As String,
                                        p_MES_TRIB As String, p_ANIO_TRIB As String, p_DETALLE_GASTO As String, p_DETRACCION_IND As String, p_IMPORTE_DETRACCION As String, p_IMPORTE_PAGAR As String) As Array

        Dim Datos(3) As String
        Dim CPCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
        Datos = CPCuentaPorPagar.Crear_Aprobacion_Gasto(p_CODE_REF_GASTO, p_ESTADO, p_MONTO, p_FECHA_APROBACION, p_FECHA_OPERACION, p_USUA_ID, p_GLOSA, p_FECHA_VENCIMIENTO, p_NRO_DCTO_REF, p_SERIE, p_DCTO_CODE, p_CENTRO_COSTO_CODE, p_CENTRO_COSTO_CABECERA, p_IND_COMPRAS, p_MES_TRIB, p_ANIO_TRIB,
                                                        p_HABIDO_IND, p_TIPO_BIEN, p_DETRACCION_IND, p_IMPORTE_DETRACCION, p_IMPORTE_PAGAR, Nothing, Nothing, Nothing, "0100", p_DETALLE_GASTO)
        CPCuentaPorPagar = Nothing
        Return Datos
    End Function


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
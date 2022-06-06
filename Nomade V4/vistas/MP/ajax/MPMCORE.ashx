<%@ WebHandler Language="VB" Class="MPMCORE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class MPMCORE : Implements IHttpHandler

    Dim OPCION As String
    Dim dt As DataTable

    Dim CODIGO, CTLG_CODE, SCSL_CODE, ALMC_CODE, USUA_ID, TIPO_CAMBIO As String
    Dim MANC_CODE, PROD_CODE, EMPL_CODE, ACFI_CODE, SECC_CODE, COEN_CODE, INSUMO_CODE, INSUMO_DESC, ORFAB_CODE,
        ORFAB_DESC, HORAS, CANTIDAD, UNME_CODE, INSUMOS, UNIDADES, CANTIDADES, MERMAS, COSTO_MN, COSTO_ME As String

    Dim resb As New StringBuilder()
    Dim res As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        CODIGO = context.Request("CODIGO")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        USUA_ID = context.Request("USUA_ID")

        Try
            Select Case OPCION
                Case "S"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New NOMADE.MP.MPConfiguracionReceta("BN").ListarConfiguracionReceta(CODIGO, "", "", "0", "")
                    resb.Append("[")
                    If Not (dt Is Nothing) Then
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & row("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & row("SCSL_CODE").ToString & """,")
                            resb.Append("""ORFAB_CODE"" :" & """" & row("ORFAB_CODE").ToString & """,")
                            resb.Append("""ORFAB_NRO_ORDEN"" :" & """" & row("ORFAB_NRO_ORDEN").ToString & """,")
                            resb.Append("""ORFAB_DESC"" :" & """" & row("ORFAB_DESC").ToString & """,")
                            resb.Append("""HORAS"" :" & """" & row("HORAS").ToString & """,")
                            resb.Append("""INICIO"" :" & """" & row("INICIO").ToString & """,")
                            resb.Append("""LIMITE"" :" & """" & row("LIMITE").ToString & """,")
                            resb.Append("""PROCESO"" :" & """" & row("PROCESO").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & row("ESTADO").ToString & """,")
                            resb.Append("""COMPLETO_IND"" :" & """" & row("COMPLETO_IND").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                    End If
                    resb.Append("]")
                    res = resb.ToString()
                Case "LISTAR_ORDEN_FABRICACION"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New NOMADE.MP.MPOrdenFabricacion("BN").ListarOrdenFabricacion("", CTLG_CODE, SCSL_CODE, "0", "0", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("CORE_IND").ToString = "0" And row("CONFIG_IND").ToString = "N" And row("ANULADO_IND").ToString = "N" Then
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                                resb.Append("""NRO_ORDEN"" :" & """" & row("NRO_ORDEN").ToString & """,")
                                resb.Append("""FECHA_INICIO"" :" & """" & row("FECHA_INICIO").ToString & """,")
                                resb.Append("""FECHA_FIN"" :" & """" & row("FECHA_FIN").ToString & """,")
                                resb.Append("""RESPONSABLE"" :" & """" & row("RESPONSABLE").ToString & """,")
                                resb.Append("""TIPO_FABRICACION"" :" & """" & row("TIPO_FABRICACION").ToString & """,")
                                resb.Append("""PROD_CODE"" :" & """" & row("PROD_CODE").ToString & """,")
                                resb.Append("""PRODUCTO"" :" & """" & row("PRODUCTO").ToString & """,")
                                resb.Append("""CANTIDAD_TOTAL"" :" & """" & row("CANTIDAD_TOTAL").ToString & """,")
                                resb.Append("""UNIDAD_MEDIDA"" :" & """" & row("UNIDAD_MEDIDA").ToString & """")
                                resb.Append("},")
                            End If
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        resb.Replace("[{}]", "")
                    End If
                    res = resb.ToString()
                Case "TIPO_CAMBIO"
                    context.Response.ContentType = "text/plain"
                    dt = New NOMADE.NC.NCMonedas("BN").dame_valor_monetario_cambio("0003", Utilities.fechaLocal(Date.Today.ToLocalTime()))
                    If Not (dt Is Nothing) Then
                        resb.Append(dt.Rows(0)("VALOR_CAMBIO_COMPRA").ToString)
                    End If
                    res = resb.ToString()
                Case "DATOS_FORMULACION"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    PROD_CODE = context.Request("PROD_CODE")
                    dt = New NOMADE.MP.MPFormulacionProductos("BN").ListarFormulaciones("", PROD_CODE, CTLG_CODE, "", "", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""HORAS"" :" & """" & row("HORAS").ToString & """,")
                            resb.Append("""TIEMPO"" :" & """" & row("TIEMPO_DESC").ToString & """,")
                            resb.Append("""PROCESO"" :" & """" & row("PROCESO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "INSUMOS_FORMULACION"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New NOMADE.GL.GLLetras("BN").ListarMoneda(CTLG_CODE)
                    MANC_CODE = context.Request("MANC_CODE")
                    CANTIDAD = context.Request("CANTIDAD")
                    ALMC_CODE = context.Request("ALMC_CODE")
                    TIPO_CAMBIO = context.Request("TIPO_CAMBIO")
                    dt = New NOMADE.MP.MPFormulacionProductos("BN").ListarInsumosFormulacion(MANC_CODE, "", CTLG_CODE, SCSL_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            Dim NUEVA_CANTIDAD As Double = Math.Round((CDbl(row("CANTIDAD").ToString) * CDbl(CANTIDAD) / CDbl(row("MANC_CANTIDAD").ToString)), 8)
                            Dim NUEVA_MERMA As Double = Math.Round((CDbl(row("MERMA").ToString) * CDbl(CANTIDAD) / CDbl(row("MANC_CANTIDAD").ToString)), 8)
                            resb.Append("{")
                            resb.Append("""MANC_CODE"" :" & """" & row("MANC_CODE").ToString & """,")
                            resb.Append("""MANC_CANTIDAD"" :" & """" & row("MANC_CANTIDAD").ToString & """,")
                            resb.Append("""PROD_CODE"" :" & """" & row("PROD_CODE").ToString & """,")
                            resb.Append("""MANC_HORAS"" :" & """" & row("MANC_HORAS").ToString & """,")
                            resb.Append("""MANC_TIEMPO"" :" & """" & row("MANC_TIEMPO").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & row("PROD_CODE_ANTIGUO").ToString & """,")
                            resb.Append("""INSUMO"" :" & """" & row("PRODUCTO").ToString & """,")
                            resb.Append("""NOMBRE_COMERCIAL"" :" & """" & row("NOMBRE_COMERCIAL").ToString & """,")
                            resb.Append("""UNME_CODE"" :" & """" & row("UNID_CODE").ToString & """,")
                            resb.Append("""UNIDAD_MEDIDA"" :" & """" & row("UNIDAD").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & NUEVA_CANTIDAD & """,")
                            resb.Append("""MERMA"" :" & """" & NUEVA_MERMA & """,")
                            resb.Append("""STOCK"" :" & """" & StockInsumo(CTLG_CODE, ALMC_CODE, row("PROD_CODE").ToString) & """,")
                            resb.Append("""COSTO_MN"" :" & """" & Math.Round((CDbl(row("COSTO").ToString) * NUEVA_CANTIDAD), 8) & """,")
                            resb.Append("""COSTO_ME"" :" & """" & Math.Round((CDbl(row("COSTO").ToString) / CDbl(TIPO_CAMBIO) * NUEVA_CANTIDAD), 8) & """,")
                            resb.Append("""ESTADO"" :" & """I"",")
                            resb.Append("""DETALLE_RECETA"" :" & """0""")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTAR_MAQUINARIAS_FORMULACION"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim MANC_CODE As String = context.Request("MANC_CODE")
                    CANTIDAD = context.Request("CANTIDAD")
                    dt = New NOMADE.MP.MPFormulacionProductos("BN").ListarMaquinariasFormulacion(MANC_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            Dim NUEVA_CANTIDAD As Double = Math.Ceiling((Double.Parse(row("CANTIDAD").ToString) * Double.Parse(CANTIDAD) / Double.Parse(row("MANC_CANTIDAD").ToString)))
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("GRUP_CODE").ToString & """,")
                            resb.Append("""MAQUINARIA"" :" & """" & row("GRUPO").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & NUEVA_CANTIDAD & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "DETALLES_RECETA"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    CTLG_CODE = context.Request("CTLG_CODE")
                    ALMC_CODE = context.Request("ALMC_CODE")
                    dt = New NOMADE.MP.MPConfiguracionReceta("BN").ListarDetallesConfiguracionReceta(CODIGO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""MANC_CODE"" :" & """" & row("MANC_CODE").ToString & """,")
                            resb.Append("""PROD_CODE"" :" & """" & row("PROD_CODE").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""INSUMO"" :" & """" & row("PRODUCTO").ToString & """,")
                            resb.Append("""NOMBRE_COMERCIAL"" :" & """" & row("NOMBRE_COMERCIAL").ToString & """,")
                            resb.Append("""EMPL_CODE"" :" & """" & row("EMPL_CODE").ToString & """,")
                            resb.Append("""EMPLEADO"" :" & """" & row("EMPLEADO").ToString & """,")
                            resb.Append("""ACFI_CODE"" :" & """" & row("ACFI_CODE").ToString & """,")
                            resb.Append("""ACTIVO"" :" & """" & row("ACTIVO").ToString & """,")
                            resb.Append("""SECC_CODE"" :" & """" & row("SECC_CODE").ToString & """,")
                            resb.Append("""SECCION"" :" & """" & row("SECCION").ToString & """,")
                            resb.Append("""COEN_CODE"" :" & """" & row("COEN_CODE").ToString & """,")
                            resb.Append("""CONCEPTO"" :" & """" & row("CONCEPTO").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & row("CANTIDAD").ToString & """,")
                            resb.Append("""UNME_CODE"" :" & """" & row("UNME_CODE").ToString & """,")
                            resb.Append("""UNIDAD_MEDIDA"" :" & """" & row("UNIDAD_MEDIDA").ToString & """,")
                            resb.Append("""MERMA"" :" & """" & row("MERMA").ToString & """,")
                            resb.Append("""HORAS"" :" & """" & row("HORAS").ToString & """,")
                            resb.Append("""ACTIVIDAD"" :" & """" & row("ACTIVIDAD").ToString & """,")
                            resb.Append("""INICIO"" :" & """" & row("INICIO").ToString & """,")
                            resb.Append("""LIMITE"" :" & """" & row("LIMITE").ToString & """,")
                            resb.Append("""STOCK"" :" & """" & StockInsumo(CTLG_CODE, ALMC_CODE, row("PROD_CODE").ToString) & """,")
                            resb.Append("""COSTO_MN"" :" & """" & row("COSTO_MN").ToString & """,")
                            resb.Append("""COSTO_ME"" :" & """" & row("COSTO_ME").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & row("ESTADO").ToString & """,")
                            resb.Append("""DETALLE_RECETA"" :" & """" & row("DETALLE_RECETA").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "CREAR_DETALLE"
                    context.Response.ContentType = "text/plain"
                    MANC_CODE = Nothing
                    PROD_CODE = context.Request("PROD_CODE")
                    EMPL_CODE = context.Request("EMPL_CODE")
                    SECC_CODE = context.Request("SECC_CODE")
                    ACFI_CODE = context.Request("ACFI_CODE")
                    COEN_CODE = context.Request("COEN_CODE")
                    CANTIDAD = context.Request("CANTIDAD")
                    UNME_CODE = context.Request("UNME_CODE")
                    MERMAS = context.Request("MERMAS")
                    HORAS = context.Request("HORAS")
                    Dim ACTIVIDAD As String = context.Request("ACTIVIDAD")
                    Dim INICIO As String = Utilities.fechaLocal(context.Request("INICIO"))
                    Dim LIMITE As String = Utilities.fechaLocal(context.Request("LIMITE"))
                    COSTO_MN = context.Request("COSTO_MN")
                    COSTO_ME = context.Request("COSTO_ME")
                    res = New NOMADE.MP.MPConfiguracionReceta("BN").CrearDetalleConfiguracionReceta(CODIGO, MANC_CODE, PROD_CODE, EMPL_CODE, SECC_CODE,
                                                                                                    ACFI_CODE, COEN_CODE, CANTIDAD, UNME_CODE, MERMAS,
                                                                                                    HORAS, ACTIVIDAD, If(INICIO = "0000-00-00", Nothing, INICIO),
                                                                                                    If(LIMITE = "0000-00-00", Nothing, LIMITE), COSTO_MN, COSTO_ME)
                Case "ELIMINAR_INSUMO"
                    context.Response.ContentType = "text/plain"
                    PROD_CODE = context.Request("PROD_CODE")
                    EMPL_CODE = context.Request("EMPL_CODE")
                    SECC_CODE = context.Request("SECC_CODE")
                    ACFI_CODE = context.Request("ACFI_CODE")
                    COEN_CODE = context.Request("COEN_CODE")
                    res = New NOMADE.MP.MPConfiguracionReceta("BN").EliminarInsumoConfiguracionReceta(CODIGO, PROD_CODE, EMPL_CODE, SECC_CODE, ACFI_CODE, COEN_CODE)
                Case "INSUMOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New NOMADE.GL.GLLetras("BN").ListarMoneda(CTLG_CODE)
                    ALMC_CODE = context.Request("ALMC_CODE")
                    TIPO_CAMBIO = context.Request("TIPO_CAMBIO")
                    dt = New NOMADE.NM.NMGestionProductos("BN").LISTAR_PRODUCTO_NAMINSA(CTLG_CODE, "", "S", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""CODIGO_ANTIGUO"":""" & row("CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("DESC_ADM").ToString & """,")
                            resb.Append("""NOMBRE_COMERCIAL"" :" & """" & row("NOMBRE_COMERCIAL").ToString & """,")
                            resb.Append("""UNME_CODE"":""" & row("UNIDAD").ToString & """,")
                            resb.Append("""COSTO_MN"" :" & """" & row("COSTO").ToString & """,")
                            resb.Append("""COSTO_ME"" :" & """" & Double.Parse(row("COSTO").ToString) / Double.Parse(TIPO_CAMBIO) & """,")
                            resb.Append("""STOCK"" :" & """" & StockInsumo(CTLG_CODE, ALMC_CODE, row("CODIGO").ToString) & """,")
                            resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "EMPLEADOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New NOMADE.NC.NCEEmpleado("BN").Listar_Empleados_Contrato_Activo(CTLG_CODE, SCSL_CODE)
                    Dim REM_BASICA, HORAS_CONTRATO As Decimal
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            REM_BASICA = Decimal.Parse(row("REM_BASICA").ToString)
                            HORAS_CONTRATO = Decimal.Parse(row("HORAS_CONTRATO").ToString)
                            resb.Append("{")
                            resb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                            resb.Append("""NOMBRE_EMPLEADO"":""" & row("NOMBRE_EMPLEADO").ToString & """,")
                            resb.Append("""HORAS_CONTRATO"":""" & row("HORAS_CONTRATO").ToString & """,")
                            resb.Append("""REM_HORA"":""" & REM_BASICA / IIf(HORAS_CONTRATO = 0, 240, (HORAS_CONTRATO * 4 + 16)) & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "ACTIVOS_FIJOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New NOMADE.AF.AFActivoFijo("BN").ListarActivosFijos("", "", CTLG_CODE, SCSL_CODE, "A")
                    'Dim dt2 As DataTable = New Nomade.NM.NMGestionProductos("BN").LISTAR_PRODUCTO_NAMINSA(CTLG_CODE, SCSL_CODE, "S", "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""BIEN"":""" & row("BIEN").ToString & """,")
                            resb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                            resb.Append("""VALOR_ACTUAL"":""" & Double.Parse(row("VALOR_ACTUAL").ToString) / 30 & """,")
                            resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "SECCIONES_ALMACEN"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim ALMC_CODE As String = context.Request("ALMC_CODE")
                    dt = New NOMADE.NA.NASeccionesAlmacen("BN").ListarSeccionAlmacen("", CTLG_CODE, ALMC_CODE, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""PALETIZADO"":""" & row("PALETIZADO").ToString & """,")
                            resb.Append("""COSTO_SECCION"":""" & Math.Round(Double.Parse(row("COSTO_SECCION").ToString) / 30) & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "CONCEPTOS_ENERGETICOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New NOMADE.MP.MPConceptoEnergetico("BN").ListarConceptoEnergetico("", CTLG_CODE, SCSL_CODE, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""UNME_CODE"":""" & row("UNME_CODE").ToString & """,")
                            resb.Append("""VALOR"":""" & row("VALOR").ToString & """,")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "AE"
                    context.Response.ContentType = "text/plain"
                    res = "OK"
                Case "G"
                    context.Response.ContentType = "text/plain"
                    ORFAB_CODE = context.Request("ORFAB_CODE")
                    ORFAB_DESC = context.Request("ORFAB_DESC")
                    HORAS = context.Request("HORAS")
                    USUA_ID = context.Request("USUA_ID")

                    MANC_CODE = context.Request("MANC_CODE")
                    PROD_CODE = context.Request("PROD_CODE")
                    Dim CANTIDADES_PROD As String = context.Request("CANTIDADES_PROD")
                    Dim UNME_CODES_PROD As String = context.Request("UNME_CODES_PROD")
                    Dim MERMAS_PROD As String = context.Request("MERMAS_PROD")
                    Dim COSTOS_MN_PROD As String = context.Request("COSTOS_MN_PROD")
                    Dim COSTOS_ME_PROD As String = context.Request("COSTOS_ME_PROD")

                    EMPL_CODE = context.Request("EMPL_CODE")
                    Dim HORAS_EMPL As String = context.Request("HORAS_EMPL")
                    Dim ACTIVIDADES_EMPL As String = context.Request("ACTIVIDADES_EMPL")
                    Dim INICIOS_EMPL As String = context.Request("INICIOS_EMPL")
                    Dim LIMITES_EMPL As String = context.Request("LIMITES_EMPL")
                    Dim COSTOS_MN_EMPL As String = context.Request("COSTOS_MN_EMPL")
                    Dim COSTOS_ME_EMPL As String = context.Request("COSTOS_ME_EMPL")

                    SECC_CODE = context.Request("SECC_CODE")
                    Dim INICIOS_SECC As String = context.Request("INICIOS_SECC")
                    Dim LIMITES_SECC As String = context.Request("LIMITES_SECC")
                    Dim COSTOS_MN_SECC As String = context.Request("COSTOS_MN_SECC")
                    Dim COSTOS_ME_SECC As String = context.Request("COSTOS_ME_SECC")

                    ACFI_CODE = context.Request("ACFI_CODE")
                    Dim ACTIVIDADES_ACFI As String = context.Request("ACTIVIDADES_ACFI")
                    Dim INICIOS_ACFI As String = context.Request("INICIOS_ACFI")
                    Dim LIMITES_ACFI As String = context.Request("LIMITES_ACFI")
                    Dim COSTOS_MN_ACFI As String = context.Request("COSTOS_MN_ACFI")
                    Dim COSTOS_ME_ACFI As String = context.Request("COSTOS_ME_ACFI")

                    COEN_CODE = context.Request("COEN_CODE")
                    Dim CANTIDADES_COEN As String = context.Request("CANTIDADES_COEN")
                    Dim UNME_CODES_COEN As String = context.Request("UNME_CODES_COEN")
                    Dim COSTOS_MN_COEN As String = context.Request("COSTOS_MN_COEN")
                    Dim COSTOS_ME_COEN As String = context.Request("COSTOS_ME_COEN")
                    res = New NOMADE.MP.MPConfiguracionReceta("BN").CrearConfiguracionReceta(CTLG_CODE, SCSL_CODE, ORFAB_CODE, ORFAB_DESC, HORAS, USUA_ID, MANC_CODE,
                                                                                             IIf(PROD_CODE = ",", Nothing, PROD_CODE), IIf(CANTIDADES_PROD = ",", Nothing, CANTIDADES_PROD), IIf(UNME_CODES_PROD = ",", Nothing, UNME_CODES_PROD), IIf(MERMAS_PROD = ",", Nothing, MERMAS_PROD), IIf(COSTOS_MN_PROD = ",", Nothing, COSTOS_MN_PROD), IIf(COSTOS_ME_PROD = ",", Nothing, COSTOS_ME_PROD),
                                                                                             IIf(EMPL_CODE = ",", Nothing, EMPL_CODE), IIf(HORAS_EMPL = ",", Nothing, HORAS_EMPL), IIf(ACTIVIDADES_EMPL = ",", Nothing, ACTIVIDADES_EMPL), IIf(INICIOS_EMPL = ",", Nothing, INICIOS_EMPL), IIf(LIMITES_EMPL = ",", Nothing, LIMITES_EMPL), IIf(COSTOS_MN_EMPL = ",", Nothing, COSTOS_MN_EMPL), IIf(COSTOS_ME_EMPL = ",", Nothing, COSTOS_ME_EMPL),
                                                                                             IIf(SECC_CODE = ",", Nothing, SECC_CODE), IIf(INICIOS_SECC = ",", Nothing, INICIOS_SECC), IIf(LIMITES_SECC = ",", Nothing, LIMITES_SECC), IIf(COSTOS_MN_SECC = ",", Nothing, COSTOS_MN_SECC), IIf(COSTOS_ME_SECC = ",", Nothing, COSTOS_ME_SECC),
                                                                                             IIf(ACFI_CODE = ",", Nothing, ACFI_CODE), IIf(ACTIVIDADES_ACFI = ",", Nothing, ACTIVIDADES_ACFI), IIf(INICIOS_ACFI = ",", Nothing, INICIOS_ACFI), IIf(LIMITES_ACFI = ",", Nothing, LIMITES_ACFI), IIf(COSTOS_MN_ACFI = ",", Nothing, COSTOS_MN_ACFI), IIf(COSTOS_ME_ACFI = ",", Nothing, COSTOS_ME_ACFI),
                                                                                             IIf(COEN_CODE = ",", Nothing, COEN_CODE), IIf(CANTIDADES_COEN = ",", Nothing, CANTIDADES_COEN), IIf(UNME_CODES_COEN = ",", Nothing, UNME_CODES_COEN), IIf(COSTOS_MN_COEN = ",", Nothing, COSTOS_MN_COEN), IIf(COSTOS_ME_COEN = ",", Nothing, COSTOS_ME_COEN))
                Case "A"
                    context.Response.ContentType = "text/plain"
                    res = "OK"
                Case "PIDM_USUARIO"
                    res = New NOMADE.MP.MPOrdenFabricacion("BN").DEVULVE_PIDM_USUARIO(USUA_ID).Rows(0)("PIDM").ToString
                Case "SOLICITUD_COMPRA"
                    'Dim c = New NOMADE.CO.CORegistroCompras("BN")
                    'Dim SOLICITA, FECHA, PRIORIDAD, TIPOREQ, CCNIVEL1, CCNIVEL2, CCNIVEL3, CCNIVEL4, GLOSA, DETALLE, DETALLES_RECETA As String
                    'ORFAB_CODE = context.Request("ORFAB_CODE")
                    'SOLICITA = context.Request("p_SOLICITA")
                    'FECHA = context.Request("p_FECHA")
                    'PRIORIDAD = context.Request("p_PRIORIDAD")
                    'TIPOREQ = context.Request("p_TIPOREQ")
                    'CCNIVEL1 = context.Request("p_AREA1")
                    'CCNIVEL2 = context.Request("p_SECCION1")
                    'CCNIVEL3 = context.Request("p_PROCESO1")
                    'CCNIVEL4 = context.Request("p_ACTIVIDAD")
                    'GLOSA = context.Request("p_GLOSA")
                    'DETALLE = context.Request("p_detalle")
                    'DETALLES_RECETA = context.Request("DETALLES_RECETA")

                    'Dim REQ_CODE = c.CREAR_REQUE_COMPRA(SOLICITA, FECHA, PRIORIDAD, TIPOREQ, CCNIVEL1, CCNIVEL2, CCNIVEL3, CCNIVEL4, GLOSA, context.Request("p_CATALOGO"), context.Request("p_ESTABLECIMIENTO"))
                    'Dim OK As String = c.CREAR_DETALLE_REQUE_COMPRA(REQ_CODE, DETALLE)
                    'If OK = "OK" Then
                    '    OK = New NOMADE.MP.MPConfiguracionReceta("BN").CambiarEstadoDetallesConfiguracionReceta(DETALLES_RECETA, CODIGO, "C", ORFAB_CODE, "0000", REQ_CODE)
                    '    If OK = "OK" Then
                    '        res = REQ_CODE
                    '    Else
                    '        res = "ERROR"
                    '    End If
                    'Else
                    '    res = "ERROR"
                    'End If

                Case "SALIDA_PRODUCCION"
                    Dim natm = New NOMADE.NA.NATipoMovimiento("BN")
                    Dim ORFAB_NRO, EMISION, TRANSACCION, PIDM_S, REQC_CODE, REQC_NUM_SEQ_DOC, GLOSA, COD_AUT, COD_AUT_INT, DETALLES_RECETA, DETALLES_SALIDA As String
                    CODIGO = context.Request("CODIGO")
                    ORFAB_CODE = context.Request("ORFAB_CODE")
                    ORFAB_NRO = context.Request("ORFAB_NRO")
                    ALMC_CODE = context.Request("ALMC_CODE")
                    EMISION = Utilities.fechaLocal(context.Request("EMISION"))
                    TRANSACCION = Utilities.fechaLocal(context.Request("TRANSACCION"))
                    PIDM_S = context.Request("PIDM_S")
                    REQC_CODE = context.Request("REQC_CODE")
                    REQC_NUM_SEQ_DOC = context.Request("REQC_NUM_SEQ_DOC")
                    GLOSA = context.Request("GLOSA")
                    COD_AUT = context.Request("COD_AUT")
                    COD_AUT_INT = context.Request("COD_AUT_INT")
                    USUA_ID = context.Request("USUA_ID")
                    DETALLES_RECETA = context.Request("DETALLES_RECETA")
                    DETALLES_SALIDA = context.Request("DETALLES_SALIDA")

                    Dim array As String() = natm.insertar_dcto_almacen(CTLG_CODE, ALMC_CODE, EMISION, TRANSACCION, ORFAB_NRO, PIDM_S, REQC_CODE, REQC_NUM_SEQ_DOC, ORFAB_NRO, "S", "", "0010", GLOSA, USUA_ID, "", "", "", "", "", "", "", "", "0050", "NTS", "0000", "", "0.00", "0002", "1", "N", "PUB", COD_AUT, "0050", COD_AUT_INT, "", "", "", "", "", "", "", "", "", "", "", "", "", "0.00").Split(",")
                    Dim arraySalida As String() = DETALLES_SALIDA.Split("|")
                    Dim arrayFila As String()
                    For Each fila As String In arraySalida
                        arrayFila = fila.Split(",")
                        natm.insertar_detalle_dcto_almacen(array(0), ORFAB_CODE, arrayFila(0), arrayFila(1), arrayFila(2), arrayFila(3), arrayFila(2), arrayFila(3), arrayFila(4), "0", "", "1", "0", USUA_ID, "", (Double.Parse(arrayFila(4)) / Double.Parse(arrayFila(3))).ToString, "N", "N", "NORMAL", "", "", "01010103", "0002", "E", "", "0.0")
                    Next
                    Dim OK As String = New NOMADE.MP.MPConfiguracionReceta("BN").CambiarEstadoDetallesConfiguracionReceta(DETALLES_RECETA, CODIGO, "P", ORFAB_CODE, "0050", array(0))
                    If OK = "OK" Then
                        res = array(0)
                    Else
                        res = "ERROR"
                    End If
                Case "COMPLETAR"
                    ORFAB_CODE = context.Request("ORFAB_CODE")
                    res = New NOMADE.MP.MPConfiguracionReceta("BN").CompletarConfiguracionReceta(CODIGO, ORFAB_CODE, USUA_ID)
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Private Function StockInsumo(CTLG_CODE As String, ALMC_CODE As String, PROD_CODE As String) As Double
        Dim data As DataTable = New NOMADE.NM.NMGestionProductos("Bn").STOCK_PRODUCTO(PROD_CODE, CTLG_CODE, ALMC_CODE)
        If data Is Nothing Then
            Return "0.0"
        Else
            Return Double.Parse(data.Rows(0)("STOCK_REAL").ToString)
        End If
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
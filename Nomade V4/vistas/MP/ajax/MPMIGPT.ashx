<%@ WebHandler Language="VB" Class="MPMIGPT" %>

Imports System
Imports System.Web
Imports System.Data

Public Class MPMIGPT : Implements IHttpHandler

    Dim OPCION As String
    Dim dt As DataTable

    Dim CODIGO, CTLG_CODE, SCSL_CODE, USUA_ID, P_TEXT As String
    Dim PROD_CODE, CANTIDAD, UNID_CODE, INSUMOS, UNIDADES, CANTIDADES, MERMAS As String
    Dim P_CODE, CODIGO_producto, ALMC_CODE, MONEDA, P_CODE_ORDEN, P_CODEFABR, P_CODE_DETALLE_FLUJO, P_USUARIO, P_CODE_PROD, P_FECHAINI, P_FECHAFIN, P_CODE_DETALLE, P_TIPO As String
    Dim cantidad_orden As Decimal

    Dim TIPO, p_NUM_SEQ_DOC, IND, codrec, APLIC_VALORES, SERIADO_IND,
        item, id, value, CODE_CECC, CODE_CENTRO_COSTO, SERIE_PROD, VAL_FIN, VAL_INI,
        TIPO_INSERT, DESD_COMPRA_IND, ALMC_DEST, MONTO, CODE_PROD, CODE_PROD_ANTIGUO,
        CODE_UME, TIP_DCTO_ORG, DIRE, DCTO_ORGN_SERIE, DCTO_REG, DCTO_ORGN, PIDM_ENTREGAR_A, ENTREGAR_A,
        PIDM_SOLICITANTE, SOLICITANTE, FEC_TRANS, FEC_EMISION, TIPO_DCTO, PIDM, NICA_CODE, COD_ALMC,
        TIPO_MOV_CODE, TIPO_MOV, DESC,
        DCTO_REQ, ISAC_CODE, ATEN_IND, IGV_IND, GARANTIA, CANT, TIPO_OPE, SERIE_DCTO,
        TIP_DCTO, PLACA, RAZON_TRANS, ESTADO_IND, CMMNT_DCTO, TIPO_DOC_RAZON_DEST, RAZON_DEST,
        LIC_CONDUCIR, CERTIFICADO, CHOFER, ELECTRONICO, TIPO_TRANS, COD_AUT, DOCS_CODE,
        TIPO_DOC_INTERNO, COD_AUT_INTERNO, TIPO_ENVIO, DIRECCION_TRANSPORTISTA As String
    Dim cod, msg As String
    Dim resb As New StringBuilder()
    Dim res As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        USUA_ID =context.Request("USUA_ID")
        COD_ALMC = context.Request("COD_ALMC")
        CTLG_CODE = context.Request("CTLG_CODE")

        SCSL_CODE = context.Request("SCSL_CODE")
        P_CODE = context.Request("P_CODE")
        P_CODE_PROD = context.Request("P_CODE_PROD")
        P_FECHAINI = context.Request("P_FECHAINI")
        P_FECHAFIN = context.Request("P_FECHAFIN")
        P_TIPO = context.Request("P_TIPO")
        OPCION = context.Request("OPCION")
        P_CODE_DETALLE = context.Request("P_CODE_DETALLE")
        P_CODEFABR = context.Request("P_CODEFABR")
        P_CODE_DETALLE_FLUJO = context.Request("P_CODE_DETALLE_FLUJO")
        P_CODE_ORDEN = context.Request("P_CODE_ORDEN")
        P_USUARIO = context.Request("P_USUARIO")
        CODIGO_producto = context.Request("CODIGO_producto")
        cantidad_orden = context.Request("cantidad_orden")
        P_TEXT = context.Request("P_TEXT")
        ALMC_CODE = context.Request("ALMC_CODE")
        MONEDA = context.Request("MONEDA")
        TIPO_MOV = context.Request("TIPO_MOV")
        P_TEXT = context.Request("P_TEXT")
        Try
            Select Case OPCION

                Case "1"

                    dt = New Nomade.MP.MPFormulacionProductos("BN").ListarFormulaciones("", CODIGO_producto, "", "", "", "")
                    If Not (dt Is Nothing) Then
                        Dim cantiad As Decimal = dt.Rows(0)("CANTIDAD").ToString()
                        Dim dtt As DataTable
                        dtt = New Nomade.MP.MPFormulacionProductos("BN").ListarDerivadosFormulacion(dt.Rows(0)("CODIGO").ToString(), "")
                        If Not (dtt Is Nothing) Then
                            Dim cantidadMedidad As Decimal = cantidad_orden / cantiad
                            resb.Append("[")
                            For Each MiDataRow As DataRow In dtt.Rows
                                Dim hola As Double = 0.0
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("PROD_CODE").ToString & """,")
                                resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("PROD_CODE_ANTIGUO").ToString & """,")
                                resb.Append("""DERIVADO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                                resb.Append("""UNID_CODE"" :" & """" & MiDataRow("UNID_CODE").ToString & """,")
                                resb.Append("""UNIDAD_MEDIDA"" :" & """" & MiDataRow("UNIDAD").ToString & """,")
                                resb.Append("""CANTIDAD"" :" & """" & MiDataRow("CANTIDAD").ToString & """,")
                                hola = (Convert.ToDecimal(MiDataRow("CANTIDAD").ToString) * (cantidadMedidad))
                                hola = Math.Round(hola, 2)

                                resb.Append("""CANTIDAD1"" :" & """" & hola & """")
                                resb.Append("},")
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                        res = resb.ToString()
                    End If
                    res = resb.ToString()
                Case "2"
                    dt = New Nomade.MP.MPFormulacionProductos("BN").ListarFormulaciones("", CODIGO_producto, "", "", "", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""ALMC_CODE"" :" & """" & MiDataRow("ALMC_CODE").ToString & """,")
                            resb.Append("""PROD_CODE"" :" & """" & MiDataRow("PROD_CODE").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                            resb.Append("""HORAS0"" :" & """" & MiDataRow("HORAS").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & MiDataRow("CANTIDAD").ToString & """,")
                            resb.Append("""UNID_CODE"" :" & """" & MiDataRow("UNID_CODE").ToString & """,")
                            resb.Append("""UNIDAD"" :" & """" & MiDataRow("UNIDAD").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3"
                    dt = New Nomade.MP.MPOrdenFabricacion("BN").ListarOrdenFabricacion("", CTLG_CODE, SCSL_CODE, "0", "0", "A", P_CODEFABR)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            If MiDataRow("CORE_IND").ToString <> "0" And MiDataRow("CORE_IND").ToString <> "1" And MiDataRow("CORE_IND").ToString <> "4" Then
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                resb.Append("""NRO_ORDEN"" :" & """" & MiDataRow("NRO_ORDEN").ToString & """,")
                                resb.Append("""RESPONSABLE"" :" & """" & MiDataRow("RESPONSABLE").ToString & """,")
                                resb.Append("""TIPO_FABRICACION"" :" & """" & MiDataRow("TIPO_FABRICACION").ToString & """,")
                                resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                                resb.Append("""CANTIDAD_TOTAL"" :" & """" & MiDataRow("CANTIDAD_TOTAL").ToString & """,")
                                resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                                resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                                resb.Append("""FECHA_REGISTRO"" :" & """" & MiDataRow("FECHA_REGISTRO").ToString & """,")
                                resb.Append("""CORE_IND"" :" & """" & MiDataRow("CORE_IND").ToString & """,")
                                resb.Append("""FECHA_CIERRE"" :" & """" & MiDataRow("FECHA_CIERRE").ToString & """,")
                                resb.Append("""CODE_LOTE"" :" & """" & MiDataRow("CODE_LOTE").ToString & """,")
                                resb.Append("""PROD_CODE"" :" & """" & MiDataRow("PROD_CODE").ToString & """,")
                                resb.Append("""EMPRESA"" :" & """" & MiDataRow("EMPRESA").ToString & """,")
                                resb.Append("""CODE_EMPRESA"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                                resb.Append("""UNIDAD_MEDIDA"" :" & """" & MiDataRow("UNIDAD_MEDIDA").ToString & """")
                                resb.Append("},")
                            End If

                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4"
                    res = New Nomade.MP.MPOrdenFabricacion("BN").Crear_salida_ordenFabr(P_TEXT)
                Case "5"
                    dt = New Nomade.MP.MPOrdenFabricacion("BN").LISTAR_DETALLE_CIERRE_PROD(P_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows

                            resb.Append("{")
                            resb.Append("""PRODUCTO_CODE"" :" & """" & MiDataRow("PRODUCTO_CODE").ToString & """,")
                            resb.Append("""PRODUCTO_CODE_ANTIGUO"" :" & """" & MiDataRow("PRODUCTO_CODE_ANTIGUO").ToString & """,")
                            resb.Append("""UNIDAD_MEDIDAD"" :" & """" & MiDataRow("UNIDAD_MEDIDAD").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                            resb.Append("""SALIENTE"" :" & """" & MiDataRow("SALIENTE").ToString & """,")
                            resb.Append("""PRODUCIDAD"" :" & """" & MiDataRow("PRODUCIDAD").ToString & """,")
                            resb.Append("""COSTO"" :" & """" & MiDataRow("COSTO").ToString & """,")
                            resb.Append("""DETRACCION"" :" & """" & MiDataRow("DETRACCION").ToString & """,")
                            resb.Append("""TIPO"" :" & """" & MiDataRow("TIPO").ToString & """")
                            resb.Append("},")


                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    PIDM_SOLICITANTE = context.Request("PIDM_SOLICITANTE")
                    FEC_TRANS = context.Request("FEC_TRANS")
                    FEC_EMISION = context.Request("FEC_EMISION")
                    PIDM_ENTREGAR_A = context.Request("PIDM_ENTREGAR_A")
                    CMMNT_DCTO = context.Request("CMMNT_DCTO")
                    TIPO_DOC_RAZON_DEST = context.Request("TIPO_DOC_RAZON_DEST")
                    RAZON_DEST = context.Request("RAZON_DEST")
                    RAZON_TRANS = context.Request("RAZON_TRANS")
                    LIC_CONDUCIR = context.Request("LIC_CONDUCIR")
                    CHOFER = context.Request("CHOFER")
                    CERTIFICADO = context.Request("CERTIFICADO")
                    PLACA = context.Request("PLACA")
                    SERIE_DCTO = context.Request("SERIE_DCTO")
                    DCTO_ORGN = context.Request("DCTO_ORGN")
                    DCTO_REG = context.Request("DCTO_REG")
                    DCTO_ORGN_SERIE = context.Request("DCTO_ORGN_SERIE")
                    TIPO_OPE = context.Request("TIPO_OPE")
                    DIRE = context.Request("DIRE")
                    TIP_DCTO_ORG = context.Request("TIP_DCTO_ORG")
                    ALMC_DEST = context.Request("ALMC_DEST")
                    p_NUM_SEQ_DOC = context.Request("p_NUM_SEQ_DOC")
                    ELECTRONICO = context.Request("ELECTRONICO")
                    TIPO_TRANS = context.Request("TIPO_TRANS")
                    COD_AUT = context.Request("COD_AUT")
                    DOCS_CODE = context.Request("DOCS_CODE")

                    'NUEVOS PARAMETROS 18/02/2015 AGARCIA
                    TIPO_DOC_INTERNO = context.Request("TIPO_DCTO_INTERNO")
                    COD_AUT_INTERNO = context.Request("COD_AUT_INTERNO")

                    TIPO_ENVIO = context.Request("TIPO_ENVIO")
                    DIRECCION_TRANSPORTISTA = context.Request("DIRECCION_TRANSPORTISTA")


                    Dim array As String()
                    cod = GrabarDctoAlmc(CTLG_CODE, COD_ALMC, Utilities.fechaLocal(FEC_EMISION), Utilities.fechaLocal(FEC_TRANS), DCTO_REG,
                                         PIDM_SOLICITANTE, DCTO_ORGN, DCTO_ORGN_SERIE, DOCS_CODE, TIPO_MOV, PIDM_ENTREGAR_A, TIPO_OPE, CMMNT_DCTO, USUA_ID,
                                         TIPO_DOC_RAZON_DEST, RAZON_DEST, RAZON_TRANS, LIC_CONDUCIR, CHOFER, DIRE, CERTIFICADO, PLACA, TIPO_DOC_INTERNO, SERIE_DCTO, "0000",
                                         ALMC_DEST, "0.00", MONEDA, p_NUM_SEQ_DOC, ELECTRONICO, TIPO_TRANS, COD_AUT, DOCS_CODE, TIPO_DOC_INTERNO, COD_AUT_INTERNO,
                                         TIPO_ENVIO, DIRECCION_TRANSPORTISTA)
                    If (cod <> "") Then
                        array = cod.Split(",")
                        If (array(0) <> "LIMITE" And array(0) <> "LIMITE INTERNO") Then
                            msg = "OK"
                        Else
                            msg = "ERROR"
                        End If

                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0) & """,")
                        resb.Append("""SUCCESS"" :" & """" & msg & """,")
                        resb.Append("""CORR_REG"" :" & """" & array(1) & """,")
                        resb.Append("""CORR_REG_INT"" :" & """" & array(2) & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If

                    If msg = "OK" Then
                        res = New Nomade.MP.MPOrdenFabricacion("BN").CREAR_DETALLE_ALMACEN(array(0), P_TEXT)

                    End If

                    res = resb.ToString()

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public Function GrabarDctoAlmc(ByVal p_CTLG_CODE As String, ByVal p_ALMC_CODE As String, ByVal p_FECHA_EMISION As String, ByVal p_FECHA_TRANS As String,
                                ByVal p_NUM_DCTO As String, ByVal p_PIDM_SOLICITANTE As String, ByVal p_REQC_CODE As String,
                                ByVal p_REQC_NUM_SEQ_DOC As String, ByVal p_ORGN_CODE As String, ByVal p_RETORNO_IND As String, ByVal p_PIDM_ENTREGAR_A As String,
                                ByVal p_TMOV_CODE As String, ByVal p_CMNT_DCTO As String, ByVal p_USUA_ID As String,
                                ByVal p_TIPO_DOC_RAZON_DEST As String, ByVal p_RAZON_DEST As String, ByVal p_RAZON_TRANS As String, ByVal p_LICENCIA As String,
                                ByVal p_CHOFER As String, ByVal p_DIRECCION As String, ByVal p_CERTIFICADO As String, ByVal p_PLACA As String, ByVal p_TIPO_DCTO As String,
                                ByVal p_SERIE_DCTO As String, ByVal p_TIPO_DCTO_ORG As String, ByVal p_ALMC_DEST As String, ByVal p_MONTO As String, ByVal p_MONEDA As String,
                                ByVal p_NUM_SEQ_DOC As String, ByVal p_ELECTRONICO As String, ByVal p_TIPO_TRANS As String, ByVal p_COD_AUT As String, ByVal p_DOCS_CODE As String,
                                ByVal p_TIPO_DCTO_INTERNO As String, ByVal p_COD_AUT_INTERNO As String, ByVal p_TIPO_ENVIO As String, ByVal p_DIR_TRANS As String) As String
        Dim OC As New Nomade.NC.NCCompra("Bn")
        Dim MovAl As New Nomade.NA.NATipoMovimiento("Bn")
        Dim FAC As New Nomade.NC.NCFactura("Bn")
        Dim dato As String
        dato = MovAl.insertar_dcto_almacen(p_CTLG_CODE, p_ALMC_CODE, p_FECHA_EMISION, p_FECHA_TRANS, p_NUM_DCTO, p_PIDM_SOLICITANTE, p_REQC_CODE, p_REQC_NUM_SEQ_DOC, p_ORGN_CODE,
                                           p_RETORNO_IND, p_PIDM_ENTREGAR_A, p_TMOV_CODE, p_CMNT_DCTO, p_USUA_ID, p_TIPO_DOC_RAZON_DEST, p_RAZON_DEST, p_RAZON_TRANS, p_LICENCIA,
                                           p_CHOFER, p_DIRECCION, p_CERTIFICADO, p_PLACA, p_TIPO_DCTO, p_SERIE_DCTO, p_TIPO_DCTO_ORG, p_ALMC_DEST, p_MONTO, p_MONEDA, p_NUM_SEQ_DOC, p_ELECTRONICO,
                                           p_TIPO_TRANS, p_COD_AUT, p_TIPO_DCTO_INTERNO, p_COD_AUT_INTERNO, p_TIPO_ENVIO, p_DIR_TRANS, "", "", "", "", "", "", "", "", "", "", "", "0.00")
        Return dato
    End Function

    Private Function CostoInsumo(CTLG_CODE As String, ALMC_CODE As String, PROD_CODE As String, MONE_CODE As String) As Double
        Dim data As DataTable = New Nomade.NM.NMGestionProductos("Bn").LISTAR_KARDEX(PROD_CODE, ALMC_CODE, MONE_CODE, CTLG_CODE)
        If data Is Nothing Then
            Return "0.0"
        Else
            Dim n As Integer = data.Rows.Count
            Return Double.Parse(data.Rows(n - 1)("PU_TOT").ToString)
        End If
    End Function
    Public Function GenerarTabla(ByVal dt As DataTable) As String

        If Not dt Is Nothing Then
            res = "<table style border='1'>"


            res += "<tr style='background-color: rgb(35, 119, 155); color: white;'>"
            res += "<td colspan='4' ></td>"
            res += "<td colspan='2'>Programacion</td>"
            res += "<td></td>"

            res += "</tr>"
            res += "<tr style='background-color: rgb(35, 119, 155); color: white;'>"
            res += "<td >Orden Fabricacion</td>"
            res += "<td >Producto</td>"
            res += "<td >Cantidad</td>"
            res += "<td >Lote</td>"
            res += "<td>Fecha Inicio</td>"
            res += "<td>Fecha Fin</td>"
            res += "<td >Glosa</td>"
            res += "</tr>"

            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr>"

                res += "<td align='center'>" & dt.Rows(i)("NRO_ORDEN").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("PRODUCTO").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("CANTIDAD_TOTAL").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("CODE_LOTE").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("FECHA_LOTE_INI").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("FECHA_LOTE_FIN").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</td>"
                res += "</tr>"

                'resb.Append("{")
                'resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                'resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                'resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                'resb.Append("""PROD_CODE"" :" & """" & MiDataRow("PROD_CODE").ToString & """,")
                'resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                'resb.Append("""PIDM_RESPONSABLE"" :" & """" & MiDataRow("PIDM_RESPONSABLE").ToString & """,")
                'resb.Append("""NRO_ORDEN"" :" & """" & MiDataRow("NRO_ORDEN").ToString & """,")
                'resb.Append("""RESPONSABLE"" :" & """" & MiDataRow("RESPONSABLE").ToString & """,")
                'resb.Append("""TIPO_FABRICACION"" :" & """" & MiDataRow("TIPO_FABRICACION").ToString & """,")
                'resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                'resb.Append("""CANTIDAD_TOTAL"" :" & """" & MiDataRow("CANTIDAD_TOTAL").ToString & """,")
                'resb.Append("""CODE_LOTE"" :" & """" & MiDataRow("CODE_LOTE").ToString & """,")
                'resb.Append("""FECHA_LOTE_INI"" :" & """" & MiDataRow("FECHA_LOTE_INI").ToString & """,")
                'resb.Append("""FECHA_LOTE_FIN"" :" & """" & MiDataRow("FECHA_LOTE_FIN").ToString & """,")
                'resb.Append("""RESPONSABLE"" :" & """" & MiDataRow("RESPONSABLE").ToString & """")


            Next
            res += "</tbody>"


            res += "</table>"

        End If
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
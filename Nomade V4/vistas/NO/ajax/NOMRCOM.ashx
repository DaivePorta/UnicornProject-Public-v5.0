<%@ WebHandler Language="VB" Class="NOMRCOM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NOMRCOM : Implements IHttpHandler


    Dim code As String
    Dim opcion As String
    Dim p_alamcen, p_grupo, p_scl, p_UNME_DET, p_TIPO, p_mone_code, p_prd, p_moneda As String
    Dim total As Decimal
    Dim CODIGO, EMPRESA, CTLG_CODE, DESCRIPCION,
   TIPO_ALMACEN,
   TIPO_ALMACENAJE, p_ALMACENABLE_IND, DEPEND_CODE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS As String

    Dim SERIADO_IND As String = ""



    Dim dt, dtc, dtaux As DataTable
    Dim dtp As DataTable
    Dim p As New Nomade.NA.NASeccionesAlmacen("bn")
    Dim gPro As New Nomade.NM.NMGestionProductos("BN")
    Dim q As New Nomade.NC.NCCentroCostos("Bn")
    Dim usu As New Nomade.NS.NSUsuario("Bn")
    Dim Prod As New Nomade.NM.NMGestionProductos("Bn")
    Dim oCORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")

    Dim res As String
    Dim resb As New StringBuilder
    Dim codempr As String
    Dim usua As String
    Dim p_area, p_seccion, p_proceso, p_usuario, p_detalle As String

    Dim tipoRequerimiento As String
    Dim CODE_CECC As String

    Dim P_ESTADOCABECE As String
    Dim p_SOLICITA As Integer
    Dim p_SOLICITA2 As String
    Dim p_FECHA As String
    Dim p_PRIORIDAD As String
    Dim p_TIPOREQ As String
    Dim p_AREA1 As String
    Dim p_SECCION1 As String
    Dim p_PROCESO1 As String
    Dim p_ACTIVIDAD As String
    Dim p_GLOSA As String
    Dim p_USUARIO1 As String
    Dim p_CATALOGO As String
    Dim p_CODIGO As String
    Dim p_ESTABLECIMIENTO As String
    Dim p_CODEUSU As String
    Dim p_CODEDETALLE As String
    Dim TEXTI As String
    Dim SERVICIO As String
    Dim P_ESTADO As String
    Dim P_CABEUSUARIO As String

    Dim P_APR_DETALLE As String

    Dim P_CODE_DETA As String
    Dim P_GLOSA_DETA, NIVEL As String

    Private p_CECC_CODE As String
    Private p_CECD_CODE As String

    Private sJSONDetalle As String

    Private oTransaction As New Nomade.DataAccess.Transaccion()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        tipoRequerimiento = context.Request("tipoRequerimiento")
        opcion = context.Request("OPCION")
        code = context.Request("code")
        CTLG_CODE = context.Request("CTLG_CODE")

        CODIGO = context.Request("CODIGO")
        EMPRESA = context.Request("EMPRESA")
        DEPEND_CODE = context.Request("DEPEND_CODE")
        CODE_CECC = context.Request("CODE_CECC")
        NIVEL = context.Request("NIVEL")

        p_area = context.Request("p_area")
        p_seccion = context.Request("p_seccion")
        p_proceso = context.Request("p_proceso")
        p_usuario = context.Request("p_usuario")

        P_ESTADOCABECE = IIf(context.Request("P_ESTADOCABECE") = Nothing, "", context.Request("P_ESTADOCABECE"))


        p_SOLICITA = IIf(context.Request("p_SOLICITA") = Nothing, 0, IIf(context.Request("p_SOLICITA") = "", 0, context.Request("p_SOLICITA")))
        p_SOLICITA2 = context.Request("p_SOLICITA2")
        p_FECHA = context.Request("p_FECHA")
        p_PRIORIDAD = context.Request("p_PRIORIDAD")
        p_TIPOREQ = context.Request("p_TIPOREQ")
        p_AREA1 = context.Request("p_AREA1")
        p_SECCION1 = context.Request("p_SECCION1")
        p_PROCESO1 = context.Request("p_PROCESO1")
        p_ACTIVIDAD = context.Request("p_ACTIVIDAD")
        p_GLOSA = context.Request("p_GLOSA")
        p_USUARIO1 = context.Request("p_USUARIO1")
        p_CATALOGO = context.Request("p_CATALOGO")
        p_detalle = context.Request("p_detalle")
        p_ESTABLECIMIENTO = context.Request("p_ESTABLECIMIENTO")
        p_CODEUSU = IIf(context.Request("p_CODEUSU") = Nothing, "", context.Request("p_CODEUSU"))
        p_CODEDETALLE = context.Request("p_CODEDETALLE")
        TEXTI = context.Request("TEXTI")
        SERVICIO = context.Request("SERVICIO")

        P_ESTADO = IIf(context.Request("P_ESTADO") = Nothing, "", context.Request("P_ESTADO"))

        P_CODE_DETA = context.Request("P_CODE_DETA")
        P_GLOSA_DETA = context.Request("P_GLOSA_DETA")

        P_APR_DETALLE = context.Request("P_APR_DETALLE")
        P_CABEUSUARIO = IIf(context.Request("P_CABEUSUARIO") = Nothing, "", context.Request("P_CABEUSUARIO"))

        SERIADO_IND = context.Request("SERIADO_IND")
        p_ALMACENABLE_IND = context.Request("p_ALMACENABLE_IND")

        sJSONDetalle = context.Request("sJSONDetalle")

        p_CECC_CODE = context.Request("p_CECC_CODE")
        p_CECD_CODE = context.Request("p_CECD_CODE")

        Try
            Select Case opcion
                Case "20"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = q.Listar_CentroCostos_Cabecera(String.Empty, CTLG_CODE, String.Empty, String.Empty, String.Empty)

                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "22"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = q.Listar_CentroCostos_Detalle(String.Empty, CODE_CECC, DEPEND_CODE, NIVEL, String.Empty)


                    If Not (dt Is Nothing) Then

                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "1"

                    dtc = q.Listar_CentroCostos_Cabecera(String.Empty, CTLG_CODE, "A", String.Empty, String.Empty)
                    context.Response.ContentType = "application/json; charset=utf-8"

                    If dtc Is Nothing Then
                        resb.Append("[")

                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & "" & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & "" & """,")
                        resb.Append("""CECC_CODE"" :" & """" & "" & """")
                        resb.Append("}")
                        'resb.Append(",")

                        'resb.Append("{}")
                        'resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")

                    Else
                        dt = q.Listar_CentroCostos_Detalle(String.Empty, dtc.Rows(0)("CODE").ToString(), String.Empty, 1, String.Empty)
                        If Not (dt Is Nothing) Then
                            resb.Append("[")
                            For Each MiDataRow As DataRow In dt.Rows
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                                resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCC").ToString & """,")
                                resb.Append("""CECC_CODE"" :" & """" & MiDataRow("CECC_CODE").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If

                    End If


                    res = resb.ToString()

                Case "2"


                    dtc = q.Listar_CentroCostos_Cabecera(String.Empty, CTLG_CODE, "A", String.Empty, String.Empty)
                    'dtaux = q.Listar_CentroCostos_DATOS(p_Code_Centro)
                    context.Response.ContentType = "application/json; charset=utf-8"

                    If dtc Is Nothing Then
                        resb.Append("[")

                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & "" & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & "" & """,")
                        resb.Append("""CECC_CODE"" :" & """" & "" & """")
                        resb.Append("}")
                        'resb.Append(",")

                        'resb.Append("{}")
                        'resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")

                    Else
                        dt = q.Listar_CentroCostos_Detalle(String.Empty, dtc.Rows(0)("CODE").ToString(), p_area, 2, String.Empty)

                        If Not (dt Is Nothing) Then
                            resb.Append("[")
                            For Each MiDataRow As DataRow In dt.Rows
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                                resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCC").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                    End If
                    res = resb.ToString()

                Case "3"
                    dtc = q.Listar_CentroCostos_Cabecera(String.Empty, CTLG_CODE, "A", String.Empty, String.Empty)
                    context.Response.ContentType = "application/json; charset=utf-8"

                    If dtc Is Nothing Then
                        resb.Append("[")

                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & "" & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & "" & """,")
                        resb.Append("""CECC_CODE"" :" & """" & "" & """")
                        resb.Append("}")
                        'resb.Append(",")

                        'resb.Append("{}")
                        'resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")

                    Else

                        dt = q.Listar_CentroCostos_Detalle(String.Empty, dtc.Rows(0)("CODE").ToString(), p_seccion, 3, String.Empty)


                        If Not (dt Is Nothing) Then
                            resb.Append("[")
                            For Each MiDataRow As DataRow In dt.Rows
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                                resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCC").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                    End If
                    res = resb.ToString()

                Case "4"

                    dtc = q.Listar_CentroCostos_Cabecera(String.Empty, CTLG_CODE, "A", String.Empty, String.Empty)
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If dtc Is Nothing Then
                        resb.Append("[")

                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & "" & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & "" & """,")
                        resb.Append("""CECC_CODE"" :" & """" & "" & """")
                        resb.Append("}")
                        'resb.Append(",")

                        'resb.Append("{}")
                        'resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")

                    Else
                        dt = q.Listar_CentroCostos_Detalle(String.Empty, dtc.Rows(0)("CODE").ToString(), p_proceso, 4, String.Empty)

                        If Not (dt Is Nothing) Then
                            resb.Append("[")
                            For Each MiDataRow As DataRow In dt.Rows
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                                resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCC").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                        res = resb.ToString()
                    End If

                Case "5"
                    dt = usu.DevuelveDatosUsuario(p_usuario)
                    res = dt.Rows(0)("NOMBRE").ToString()
                Case "6"

                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    res = oCORegistroCompras.CREAR_REQUE_COMPRA(p_SOLICITA, p_FECHA, p_PRIORIDAD, p_TIPOREQ, p_GLOSA, p_CATALOGO, p_ESTABLECIMIENTO, p_CECC_CODE, p_CECD_CODE, p_CODEUSU, oTransaction)
                    Dim p_CODE_CABECERA As String = res

                    Dim oDT_Det As New DataTable()
                    oDT_Det = Utilities.JSONToDataTable(sJSONDetalle)
                    Dim iContador As Integer = 0
                    For Each oDR As DataRow In oDT_Det.Rows
                        Dim p_CODE_PROD As String = oDR("p_CODE_PROD")
                        Dim p_CANTIDAD As Integer = oDR("p_CANTIDAD")
                        Dim p_CODE_UNM As String = oDR("p_CODE_UNM")
                        Dim p_FECHA_REQ As String = Utilities.fechaLocal(oDR("p_FECHA_REQ"))
                        iContador = iContador + 1

                        oCORegistroCompras.fnCrearDetalleRequerimiento(p_CODE_PROD, p_CANTIDAD, p_CODE_UNM, p_FECHA_REQ, p_CODE_CABECERA, iContador, oTransaction)
                    Next

                    oTransaction.fnCommitTransaction()

                Case "REGMIREQ"

                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    res = oCORegistroCompras.CREAR_MI_REQUE_COMPRA(p_SOLICITA2, p_FECHA, p_PRIORIDAD, p_TIPOREQ, p_GLOSA, p_CATALOGO, p_ESTABLECIMIENTO, p_CECC_CODE, p_CECD_CODE, oTransaction)
                    Dim p_CODE_CABECERA As String = res

                    Dim oDT_Det As New DataTable()
                    oDT_Det = Utilities.JSONToDataTable(sJSONDetalle)
                    Dim iContador As Integer = 0
                    For Each oDR As DataRow In oDT_Det.Rows
                        Dim p_CODE_PROD As String = oDR("p_CODE_PROD")
                        Dim p_CANTIDAD As Integer = oDR("p_CANTIDAD")
                        Dim p_CODE_UNM As String = oDR("p_CODE_UNM")
                        Dim p_FECHA_REQ As String = Utilities.fechaLocal(oDR("p_FECHA_REQ"))
                        iContador = iContador + 1

                        oCORegistroCompras.fnCrearDetalleRequerimiento(p_CODE_PROD, p_CANTIDAD, p_CODE_UNM, p_FECHA_REQ, p_CODE_CABECERA, iContador, oTransaction)
                    Next

                    oTransaction.fnCommitTransaction()


                Case "LPROD2" 'Listar Productos Venta Web
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                    dt = nvVenta.ListarProductosVentaWeb("", "",
                                                         If(CTLG_CODE = Nothing, "", CTLG_CODE), If(p_ESTABLECIMIENTO = Nothing, "", p_ESTABLECIMIENTO), p_ALMACENABLE_IND, If(SERIADO_IND = Nothing, "", SERIADO_IND), "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            If SERIADO_IND = "S" Then
                                resb.Append("""CODIGO_SERIADO"" :" & """" & MiDataRow("CODIGO_SERIADO").ToString & """,")
                                resb.Append("""CODIGO_BARRAS"" :" & """" & MiDataRow("CODIGO_BARRAS").ToString & """,")
                                resb.Append("""STOCK_TOTAL"" :""0"",")
                                resb.Append("""STOCK_REAL"" :""0"",")
                            Else
                                resb.Append("""CODIGO_SERIADO"" :"""",")
                                resb.Append("""CODIGO_BARRAS"" :"""",")
                                resb.Append("""STOCK_TOTAL"" :" & """" & MiDataRow("STOCK_TOTAL").ToString & """,")
                                resb.Append("""STOCK_REAL"" :" & """" & MiDataRow("STOCK_REAL").ToString & """,")
                            End If
                            resb.Append("""CTLG"" :" & """" & MiDataRow("CTLG").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESC_ADM"" :" & """" & MiDataRow("DESC_ADM").ToString & """,")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""CODIGO_SUBGRUPO"" :" & """" & MiDataRow("CODIGO_SUBGRUPO").ToString & """,")
                            resb.Append("""CODIGO_GRUPO"" :" & """" & MiDataRow("CODIGO_GRUPO").ToString & """,")
                            resb.Append("""UNIDAD"" :" & """" & MiDataRow("UNIDAD").ToString & """,")
                            resb.Append("""MARCA"" :" & """" & MiDataRow("MARCA").ToString & """,")
                            resb.Append("""MODELO"" :" & """" & MiDataRow("MODELO").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                            resb.Append("""MOSTRAR_WEB"" :" & """" & MiDataRow("MOSTRAR_WEB").ToString & """,")
                            resb.Append("""MONEDA"" :" & """" & MiDataRow("MONEDA").ToString & """,")
                            resb.Append("""CODIGO_UNIDAD_DESPACHO"" :" & """" & MiDataRow("UNIDAD_DESPACHO").ToString & """,")
                            resb.Append("""DESC_UNIDAD_DESPACHO"" :" & """" & MiDataRow("DESC_UNIDAD_DESPACHO").ToString & """,")
                            resb.Append("""NO_SERIADA"" :" & """" & MiDataRow("NO_SERIADA").ToString & """,")
                            resb.Append("""SERVICIO"" :" & """" & MiDataRow("SERVICIO").ToString & """,")
                            resb.Append("""SERIADO"" :" & """" & MiDataRow("SERIADA").ToString & """,")
                            resb.Append("""NOMBRE_COMERCIAL"" :" & """" & MiDataRow("NOMBRE_COMERCIAL").ToString & """,")
                            resb.Append("""GARANTIA"" :" & """" & MiDataRow("GARANTIA").ToString & """,")
                            resb.Append("""CODIGO_EXISTENCIA"" :" & """" & MiDataRow("CODE_EXISTENCIA").ToString & """,")
                            resb.Append("""VOLUMEN"" :" & """" & MiDataRow("VOLUMEN").ToString & """,")
                            resb.Append("""UNME_VOLUMEN"" :" & """" & MiDataRow("UNME_VOLUMEN").ToString & """,")
                            resb.Append("""DETRACCION_DECIMALES"" :" & """" & MiDataRow("DETRACCION_DECIMALES").ToString & """,")
                            resb.Append("""DETRACCION"" :" & """" & MiDataRow("DETRACCION").ToString & """,")
                            resb.Append("""PRECIO_IND"" :" & """" & MiDataRow("PRECIO_IND").ToString & """,")
                            resb.Append("""ALMACENABLE_IND"" :" & """" & MiDataRow("ALMACENABLE_IND").ToString & """,")
                            resb.Append("""TIPO_BIEN"" :" & """" & MiDataRow("TIPO_BIEN").ToString & """,")
                            resb.Append("""ISC"" :" & """" & MiDataRow("ISC").ToString & """,")
                            resb.Append("""TIPO_DE_UNIDAD"" :" & """" & MiDataRow("TIPO_DE_UNIDAD").ToString & """,")
                            resb.Append("""MANUFACTURADA"" :" & """" & MiDataRow("MANUFACTURADA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "7"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = Prod.LISTAR_PRODUCTO("", "", "", "", "", CTLG_CODE, SERVICIO, TEXTI)
                    Dim validar As String = "N" ' INDICA SI SOLO SE DESEA LISTAR SERIADOS O TODOS, AL MENOS 1 VALOR EN SERIADO_IND PARA LISTAR SOLO SERIADOS
                    If SERIADO_IND Is Nothing Or SERIADO_IND = "" Then
                        validar = "N"
                    Else
                        validar = "S"
                    End If
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            If validar = "N" Then
                                resb.Append("{")
                                resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("CODIGO_ANTIGUO").ToString & """,")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                resb.Append("""UNIDAD"" :" & """" & MiDataRow("UNIDAD").ToString & """,")
                                resb.Append("""DESC_UNIDAD_DESPACHO"" :" & """" & MiDataRow("DESC_UNIDAD_DESPACHO").ToString & """,")
                                resb.Append("""NO_SERIADA"" :" & """" & MiDataRow("NO_SERIADA").ToString & """,")
                                resb.Append("""SERVICIO"" :" & """" & MiDataRow("SERVICIO").ToString & """,")
                                resb.Append("""DESC_ADM"" :" & """" & MiDataRow("DESC_ADM").ToString & """,")
                                resb.Append("""SERVICIO"" :" & """" & MiDataRow("SERVICIO").ToString & """,")
                                resb.Append("""CODE_EXISTENCIA"" :" & """" & MiDataRow("CODE_EXISTENCIA").ToString & """,")
                                resb.Append("""DESC_EXISTENCIA"" :" & """" & MiDataRow("DESC_EXISTENCIA").ToString & """,")
                                resb.Append("""CODE_SUNAT"" :" & """" & MiDataRow("CODE_SUNAT").ToString & """,")
                                resb.Append("""COD_UNMED_SUNAT"" :" & """" & MiDataRow("COD_UNMED_SUNAT").ToString & """,")
                                resb.Append("""STOCK"" :" & """" & MiDataRow("STOCK").ToString & """,")
                                resb.Append("""DETRACCION"" :" & """" & MiDataRow("DETRACCION").ToString & """,")
                                resb.Append("""MANUFACTURADA"" :" & """" & MiDataRow("MANUFACTURADA").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            Else
                                If MiDataRow("NO_SERIADA").ToString = "N" Then
                                    resb.Append("{")
                                    resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("CODIGO_ANTIGUO").ToString & """,")
                                    resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                    resb.Append("""UNIDAD"" :" & """" & MiDataRow("UNIDAD").ToString & """,")
                                    resb.Append("""DESC_UNIDAD_DESPACHO"" :" & """" & MiDataRow("DESC_UNIDAD_DESPACHO").ToString & """,")
                                    resb.Append("""NO_SERIADA"" :" & """" & MiDataRow("NO_SERIADA").ToString & """,")
                                    resb.Append("""SERVICIO"" :" & """" & MiDataRow("SERVICIO").ToString & """,")
                                    resb.Append("""DESC_ADM"" :" & """" & MiDataRow("DESC_ADM").ToString & """,")
                                    resb.Append("""SERVICIO"" :" & """" & MiDataRow("SERVICIO").ToString & """,")
                                    resb.Append("""CODE_EXISTENCIA"" :" & """" & MiDataRow("CODE_EXISTENCIA").ToString & """,")
                                    resb.Append("""DESC_EXISTENCIA"" :" & """" & MiDataRow("DESC_EXISTENCIA").ToString & """,")
                                    resb.Append("""CODE_SUNAT"" :" & """" & MiDataRow("CODE_SUNAT").ToString & """,")
                                    resb.Append("""COD_UNMED_SUNAT"" :" & """" & MiDataRow("COD_UNMED_SUNAT").ToString & """,")
                                    resb.Append("""STOCK"" :" & """" & MiDataRow("STOCK").ToString & """,")
                                    resb.Append("""DETRACCION"" :" & """" & MiDataRow("DETRACCION").ToString & """,")
                                    resb.Append("""MANUFACTURADA"" :" & """" & MiDataRow("MANUFACTURADA").ToString & """")
                                    resb.Append("}")
                                    resb.Append(",")
                                End If
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "8"
                    dt = oCORegistroCompras.LISTAR_CABECERA_REQUECOMPRA(CTLG_CODE, p_ESTABLECIMIENTO, P_CABEUSUARIO, p_SOLICITA, P_ESTADOCABECE)
                    GenerarTablaPro(dt)
                Case "9"
                    context.Response.ContentType = "application/json; charset=utf-8"

                    dt = oCORegistroCompras.LISTAR_USUA_CABECERA_REQUCOMPRA(p_CODEUSU)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                            resb.Append("""CATALOGO"":""" & row("CATALOGO").ToString & """,")
                            resb.Append("""ESTABLECIMIENTO"":""" & row("ESTABLE").ToString & """,")
                            resb.Append("""FECHA"":""" & row("FECHA").ToString & """,")
                            resb.Append("""SOLICITANTE"":""" & row("SOLICITA").ToString & """,")
                            resb.Append("""PRIORIDAD"":""" & row("PRIORIDAD").ToString & """,")
                            resb.Append("""TIPOREQUE"":""" & row("TIPORQUE").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""CENTRO_COSTOS"":""" & row("CENTRO_COSTOS").ToString & """,")
                            resb.Append("""SOLICITA_NOMBRE"":""" & row("SOLICITA_NOMBRE").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("+")
                        resb.Replace(",+", "")
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "10"
                    dt = oCORegistroCompras.LISTAR_USUA_DETALLE_REQCOMPRA(p_CODEDETALLE, P_ESTADO)
                    GenerarTabladETALLE(dt)
                    GenerarTablaCorreo(dt)
                Case "11"
                    res = oCORegistroCompras.MODIFICAR_DETALLE_GLOSA_REQUE_COMPRA(P_CODE_DETA, P_GLOSA_DETA)
                Case "12"
                    dt = oCORegistroCompras.LISTAR_USUA_DETALLE_REQCOMPRA(p_CODEDETALLE, P_ESTADO)
                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows


                            tipoRequerimiento = row("CODETEXTI").ToString()


                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                            resb.Append("""NOMBRE"":""" & row("DESCP").ToString & """,")
                            resb.Append("""CANTIDAD_SOLI"":""" & row("CANTIDAD").ToString & """,")
                            resb.Append("""CANTIDAD_RESTANTE"":""" & row("CANTIDAD_RESTANTE").ToString & """,")
                            resb.Append("""UNIDAD"":""" & row("UNIDAM").ToString & """")

                            resb.Append("},")
                        Next

                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    'Me.hfObjJson.Value = resb.ToString()

                Case "13"
                    res = oCORegistroCompras.DELETE_DETALLE_REQUE_COMPRA(P_CODE_DETA)
                Case "14"
                    res = oCORegistroCompras.APROBACION_DETALLE_REQUE_COMPRA(P_APR_DETALLE, tipoRequerimiento)
                Case "15"
                    dt = oCORegistroCompras.LISTAR_CABECERA_REQUECOMPRA(CTLG_CODE, p_ESTABLECIMIENTO, P_CABEUSUARIO, p_SOLICITA, P_ESTADOCABECE)
                    GenerarTablaPro2(dt)

                Case "21"
                    dt = oCORegistroCompras.LISTAR_CABECERA_MIS_REQUECOMPRA(CTLG_CODE, p_ESTABLECIMIENTO, P_CABEUSUARIO)
                    GenerarTablaMisRequerimientos(dt)

                Case "SENDMAIL"
                    context.Request.ContentType = "text/plain"
                    Dim mail As New Nomade.Mail.NomadeMail("BN")
                    Dim HTML_TABLA_CORREO As String = System.Configuration.ConfigurationManager.AppSettings("HTML_DETALLES_CORREO")

                    Dim remitente As String = context.Request("REMITENTE")
                    Dim nremitente As String = context.Request("NREMITENTE")
                    Dim destinatarios As String = context.Request("DESTINATARIOS")
                    Dim asunto As String = context.Request("ASUNTO")
                    Dim mensaje As String = context.Request("MENSAJE")
                    Dim empresa As String = context.Request("EMPRESA")
                    Dim solicitante As String = context.Request("SOLICITANTE")
                    Dim ESTABLE As String = context.Request("ESTABLECI")
                    Dim num_doc_origen As String = context.Request("NUM_DOC_ORIGEN")
                    Dim glosa As String = context.Request("GLOSA")

                    Dim centro_costo As String = context.Request("centro_costo")


                    Dim CUERPO As String =
                    "<p>" & mensaje & "</p><hr>" &
                    "<h2>" & empresa & "</h2>" &
                     "<h2>" & ESTABLE & "</h2>" &
                    "<p><strong>Solicitante:</strong> " & solicitante &
                    "<p><strong>Nro de Requisición:</strong> " & num_doc_origen & "</p>" &
                    "<p>" & centro_costo.Replace(",", " - ") & "</p>" &
                    "<p><strong>Glosa: </strong>" & glosa & "</p>" & HTML_TABLA_CORREO

                    mail.enviar(remitente, nremitente, destinatarios, asunto, CUERPO)
                    res = "OK"
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

    Public Function GenerarTablaMisRequerimientos(ByVal dt As DataTable) As String

        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>CODIGO</th>"
            res += "<th>GLOSA</th>"
            res += "<th>EMPRESA</th>"
            res += "<th>ESTABLECIMIENTO</th>"
            res += "<th>FECHA</th>"
            res += "<th>ESTADO</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If P_ESTADOCABECE = "P" Then
                    If dt.Rows(i)("ESTADO").ToString() = "APROBADO" Then
                        res += "<tr >"
                        res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString().Replace("\n", " ").ToUpper() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                        res += "</tr>"
                    End If
                End If

                If P_ESTADOCABECE = "A" Then

                    If dt.Rows(i)("ESTADO").ToString() = "POR APROBAR" Then
                        res += "<tr >"
                        res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString().Replace("\n", " ").ToUpper() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                        res += "</tr>"
                    End If
                End If

                If P_ESTADOCABECE = "C" Then
                    If dt.Rows(i)("ESTADO").ToString() = "COMPLETADO" Then
                        res += "<tr >"
                        res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString().Replace("\n", " ").ToUpper() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"

                        res += "</tr>"
                    End If
                End If

                If P_ESTADOCABECE = "T" Then
                    res += "<tr >"
                    res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                    res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString().Replace("\n", " ").ToUpper() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                    res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                    res += "</tr>"
                End If

            Next
            res += "</tbody>"


            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function


    Public Function GenerarTablaCorreo(ByVal dt As DataTable) As String

        Dim corro As String = ""

        If Not dt Is Nothing Then
            corro = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            corro += "<thead>"
            corro += "<tr align=""center"">"
            corro += "<th>FECHA</th>"
            corro += "<th>PRODUCTO</th>"
            corro += "<th>CANTIDAD</th>"
            corro += "<th>CANT. APROBADA</th>"
            corro += "<th>CANT. POR ATENDER</th>"
            corro += "<th>UNID. DE MEDIDA</th>"
            corro += "<th>ESTADO</th>"
            corro += "<th>GLOSA</th>"
            corro += "</tr>"
            corro += "</thead>"
            corro += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                corro += "<tr >"
                corro += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                corro += "<td align='center'>" & dt.Rows(i)("DESCP").ToString() & "</td>"
                corro += "<td align='center' >" & dt.Rows(i)("CANTIDAD").ToString() & "</td>"
                corro += "<td align='center' >" & dt.Rows(i)("CANTIDAD_APROBADA").ToString() & "</td>"
                corro += "<td align='center' >" & dt.Rows(i)("CANTIDAD_RESTANTE").ToString() & "</td>"
                corro += "<td align='center'>" & dt.Rows(i)("UNIDAM").ToString() & "</td>"
                corro += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                corro += "<td align='center'>" & dt.Rows(i)("GLOSA").ToString() & "</td>"
                corro += "</tr>"
            Next
            corro += "</tbody>"
            corro += "</table>"
        Else
            'GenerarTablaProSinDatos()
        End If
        System.Configuration.ConfigurationManager.AppSettings("HTML_DETALLES_CORREO") = corro
        Return corro

    End Function

    Public Function GenerarTabladETALLE(ByVal dt As DataTable) As String

        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>FECHA</th>"
            res += "<th>PRODUCTO</th>"
            res += "<th>CANTIDAD</th>"
            res += "<th>CANT. APROBADA</th>"
            res += "<th>CANT. POR ATENDER</th>"
            res += "<th>UNID. DE MEDIDA</th>"
            res += "<th>ESTADO</th>"
            res += "<th>GLOSA</th>"
            res += "<th>CONFIRMACION</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1

                If dt.Rows(i)("CANTIDAD").ToString() = 0 And dt.Rows(i)("CANTIDAD_APROBADA").ToString() = 0 Then
                    res += "<tr style='background-color: #FFCC99' >"
                ElseIf dt.Rows(i)("CANTIDAD").ToString() <> 0 And dt.Rows(i)("CANTIDAD_APROBADA").ToString() <> 0 Then

                    res += "<tr style='background-color: #CCFFFF'>"
                Else
                    res += "<tr >"
                End If

                res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("DESCP").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("CANTIDAD").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("CANTIDAD_APROBADA").ToString() & "</td>"
                res += "<td align='center' >" & dt.Rows(i)("CANTIDAD_RESTANTE").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("UNIDAM").ToString() & "</td>"
                res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"

                If dt.Rows(i)("ESTADO").ToString() = "COMPLETADO" Then
                    res += "<td style='text-align:center; '>"
                    res += "<span title='Ingrese Glosa'><input id=txt_" & dt.Rows(i)("CODE").ToString() & " ></span>"
                    res += "</td>"

                    res += "<td style='text-align:center;'>"
                    res += "<span title='Confirmar'><a class='btn red'  tooltip='Ver detalles' id='buscar1' onclick=ENVIAGLOSA('" & dt.Rows(i)("CODE").ToString() & "') target='_blank'><i class='icon-check'></i></a></span>"
                    res += "</td>"

                ElseIf dt.Rows(i)("ESTADO").ToString() = "CONFORME" Then

                    res += "<td align='center'>" & dt.Rows(i)("GLOSA").ToString() & "</td>"

                    res += "<td style='text-align:center;'>"
                    res += "<span title='Confirmado'><a class='btn green'  disabled='true'  ><i class='icon-ok'></i></a></span>"
                    res += "</td>"
                Else
                    res += "<td style='text-align:center;'>"
                    res += "<span title='Ingrese Glosa'><input id='txtglosa' disabled='true'></span>"
                    res += "</td>"
                    res += "<td style='text-align:center;'>"
                    res += "<span title='Confirmar'><a class='btn red'  tooltip='Ver detalles' id='buscar1' disabled='true' target='_blank'><i class='icon-check'></i></a></span>"
                    res += "</td>"
                End If

                res += "</tr>"

            Next
            res += "</tbody>"
            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        'System.Configuration.ConfigurationManager.AppSettings("HTML_DETALLES_CORREO") = res
        Return res
    End Function


    Public Function GenerarTablaPro2(ByVal dt As DataTable) As String

        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>CODIGO</th>"
            res += "<th>USUARIO</th>"
            res += "<th>GLOSA</th>"
            res += "<th>EMPRESA</th>"
            res += "<th>ESTABLECIMIENTO</th>"
            res += "<th>FECHA</th>"
            res += "<th>ESTADO</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("ESTADO").ToString() = "POR APROBAR" Then
                    res += "<tr >"
                    res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("USUARIO").ToString() & "</td>"
                    res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString().Replace("\n", " ").ToUpper() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                    res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                    res += "</tr>"
                End If
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function
    Public Function GenerarTablaPro(ByVal dt As DataTable) As String

        If Not dt Is Nothing Then
            res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
            res += "<thead>"
            res += "<tr align=""center"">"
            res += "<th>CODIGO</th>"
            res += "<th>USUARIO</th>"
            res += "<th>GLOSA</th>"
            res += "<th>EMPRESA</th>"
            res += "<th>ESTABLECIMIENTO</th>"
            res += "<th>FECHA</th>"
            res += "<th>ESTADO</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If P_ESTADOCABECE = "P" Then
                    If dt.Rows(i)("ESTADO").ToString() = "APROBADO" Then
                        res += "<tr >"
                        res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("USUARIO").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString().Replace("\n", " ").ToUpper() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                        res += "</tr>"
                    End If
                End If

                If P_ESTADOCABECE = "A" Then

                    If dt.Rows(i)("ESTADO").ToString() = "POR APROBAR" Then
                        res += "<tr >"
                        res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("USUARIO").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString().Replace("\n", " ").ToUpper() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                        res += "</tr>"
                    End If
                End If

                If P_ESTADOCABECE = "C" Then
                    If dt.Rows(i)("ESTADO").ToString() = "COMPLETADO" Then
                        res += "<tr >"
                        res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("USUARIO").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString().Replace("\n", " ").ToUpper() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                        res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                        res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"

                        res += "</tr>"
                    End If
                End If

                If P_ESTADOCABECE = "T" Then
                    res += "<tr >"
                    res += "<td align='center'>" & dt.Rows(i)("CODE").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("USUARIO").ToString() & "</td>"
                    res += "<td align='center' >" & dt.Rows(i)("GLOSA").ToString().Replace("\n", " ").ToUpper() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("EMPRESA").ToString() & "</td>"
                    res += "<td align='center' >" & dt.Rows(i)("ESTABLEC").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("FECHA").ToString() & "</td>"
                    res += "<td align='center'>" & dt.Rows(i)("ESTADO").ToString() & "</td>"
                    res += "</tr>"
                End If

            Next
            res += "</tbody>"


            res += "</table>"
        Else
            GenerarTablaProSinDatos()
        End If
        Return res
    End Function


    Public Function GenerarTablaProSinDatos() As String

        res = "<table id=""tblbmodal"" class=""display DTTT_selectable"" border=""0"">"
        res += "<thead>"
        res += "<tr align=""center"">"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "<th>&nbsp</th>"
        res += "</tr>"
        res += "</thead>"
        res += "<tbody>"

        res += "<tr >"
        res += "<td align='center'> </td>"
        res += "<td ></td>"
        res += "<td align='center'></td>"
        res += "<td align='center' >NO HAY DATOS DISPONIBLES</td>"
        res += "<td align='center'></td>"
        res += "<td align='center'></td>"
        res += "</tr>"

        res += "</tbody>"
        res += "</table>"

        Return res
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
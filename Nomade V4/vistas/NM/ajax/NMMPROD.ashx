<%@ WebHandler Language="VB" Class="NMMPROD" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.Drawing
Imports System.Drawing.Imaging

Public Class NMMPROD : Implements IHttpHandler

    Dim CTLG_CODE, SCSL_CODE, ESTADO_IND, MOSTRAR_LISTA, TIPO_EXISTENCIA, SERIADA, SIN_SERIE, GRUPO_CODE, UNME_CODE, MARCA_CODE, MODELO,
        VOLUMEN, UNME_VOLUMEN, NOMPRODUCTO, CODE_ANTIGUO, CODE_AUXILIAR, MONE_CODE, NOM_COMERCIAL, USUA_ID, OPCION, PROD_CODE,
        IMAG_CODE, PLAN_CODE, PRECIO_VENTA, PRECIO_MINIMO, ALMC_CODE, RANG_CODE, DT_ID, DT_VALUE, URLPROD, DETRAC_CODE, DETRAC_PORCENTAJE,
        PRECIO_IND, PRES_CODE, PESO, p_CECC, p_CECD, p_COMPRABLE_IND, ISC_CODE As String
    Dim TIPO_CALCULO As String
    Dim TIPO_BIEN, ISC, ENBRUTO_IND, ESP_ADICIONAL, UTILIDAD_MINIMO, UTILIDAD_VENTA, UTILIDAD, P_DETALLES, FTVPRER_CODE As String
    Dim PPBIMAG_URL, RUTA_PPBIMAG, PPBIMAG As String
    'NUEVOS CAMPOS PARA GRABAR IMAGEN 
    Dim IMAGEN As String
    Dim RUTA_IMAGEN As String = ""
    Dim RUTA As String = ""

    'Para usar el server-side processing DataTables
    Dim length, start, draw As Integer
    Dim searchTable As String
    Dim orderColumn, orderDir As String
    'CAMPO GENERICO
    Dim p_CODIGO_FILTRO, p_VALOR_ACTUALIZAR As String

    Dim ID_NOMBRE_ALT As Integer

    Dim CODE_LISTA As String

    ' Dim PPBIMAG As HttpPostedFile

    Dim TIPOIMAGEN As String

    Dim dt As DataTable

    'Instanciamos las clases de Persona
    Dim nmGestionProductos As New Nomade.NM.NMGestionProductos("Bn")
    Dim nmGestionPrecios As New Nomade.NM.NMGestionPrecios("Bn")
    Dim sRutaImagenes As String = System.Configuration.ConfigurationManager.AppSettings("PathImagenes") + "Productos"

    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        'Para usar el server-side processing DataTables
        length = context.Request("length")
        start = context.Request("start")
        draw = context.Request("draw")
        searchTable = context.Request("search[value]")
        orderColumn = context.Request("order[0][column]")
        orderDir = context.Request("order[0][dir]")

        CODE_LISTA = context.Request("CODE_LISTA")
        'FTVPREL_CODE = context.Request("FTVPREL_CODE")

        P_DETALLES = context.Request("P_DETALLES")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        ESTADO_IND = context.Request("ESTADO_IND")
        MOSTRAR_LISTA = context.Request("MOSTRAR_LISTA")
        TIPO_EXISTENCIA = context.Request("TIPO_EXISTENCIA")
        SERIADA = context.Request("SERIADA")
        SIN_SERIE = context.Request("SIN_SERIE")
        GRUPO_CODE = context.Request("GRUPO_CODE")
        UNME_CODE = context.Request("UNME_CODE")
        MARCA_CODE = context.Request("MARCA_CODE")
        MODELO = context.Request("MODELO")
        VOLUMEN = context.Request("VOLUMEN")
        If VOLUMEN = "" Then
            VOLUMEN = "0"
        End If
        UNME_VOLUMEN = context.Request("UNME_VOLUMEN")
        NOMPRODUCTO = context.Request("NOMPRODUCTO")
        CODE_ANTIGUO = context.Request("CODE_ANTIGUO")
        CODE_AUXILIAR = context.Request("CODE_AUXILIAR")
        MONE_CODE = context.Request("MONE_CODE")
        NOM_COMERCIAL = context.Request("NOM_COMERCIAL")
        USUA_ID = context.Request("USUA_ID")
        PROD_CODE = context.Request("PROD_CODE")
        IMAG_CODE = context.Request("IMAG_CODE")
        PPBIMAG = context.Request("PPBIMAG")
        URLPROD = context.Request("URLPROD")
        DETRAC_CODE = context.Request("DETRAC_CODE")
        DETRAC_PORCENTAJE = context.Request("DETRAC_PORCENTAJE")
        If DETRAC_PORCENTAJE = "" Then
            DETRAC_PORCENTAJE = "0"
        End If
        PRECIO_IND = context.Request("PRECIO_IND")
        ALMC_CODE = context.Request("ALMC_CODE")
        PRECIO_MINIMO = context.Request("PRECIO_MINIMO")
        PRECIO_VENTA = context.Request("PRECIO_VENTA")
        PLAN_CODE = context.Request("PLAN_CODE")
        RANG_CODE = context.Request("RANG_CODE")

        DT_ID = context.Request("id")
        DT_VALUE = context.Request("value")

        TIPO_BIEN = context.Request("TIPO_BIEN")
        ISC = context.Request("ISC")
        ENBRUTO_IND = context.Request("ENBRUTO_IND")
        ESP_ADICIONAL = context.Request("ESP_ADICIONAL")
        PRES_CODE = context.Request("PRES_CODE")
        If PRES_CODE = "" Then
            PRES_CODE = Nothing
        End If
        PESO = context.Request("PESO")
        IMAGEN = context.Request("IMAGEN")
        UTILIDAD = context.Request("UTILIDAD")
        UTILIDAD_VENTA = context.Request("UTILIDAD_VENTA")
        UTILIDAD_MINIMO = context.Request("UTILIDAD_MINIMO")
        FTVPRER_CODE = context.Request("FTVPRER_CODE")
        p_CECC = context.Request("p_CECC")
        p_CECD = context.Request("p_CECD")
        p_COMPRABLE_IND = context.Request("p_COMPRABLE_IND")
        ISC_CODE = context.Request("p_ISC_CODE")
        If ISC_CODE = "" Or ISC_CODE = String.Empty Then
            ISC_CODE = Nothing
        End If

        'LIMPIAR CARACTERES
        NOMPRODUCTO = vChar(NOMPRODUCTO)
        CODE_ANTIGUO = vChar(CODE_ANTIGUO)
        CODE_AUXILIAR = vChar(CODE_AUXILIAR)
        NOM_COMERCIAL = vChar(NOM_COMERCIAL)
        ESP_ADICIONAL = vChar(ESP_ADICIONAL)
        MODELO = vChar(MODELO)

        'CAMPO GENERICO         
        p_CODIGO_FILTRO = context.Request("p_CODIGO_FILTRO")
        p_VALOR_ACTUALIZAR = context.Request("p_VALOR_ACTUALIZAR")

        IMAGEN = context.Request("IMAGEN")
        RUTA_IMAGEN = context.Request("RUTA_IMAGEN")
        ID_NOMBRE_ALT = context.Request("ID_NOMBRE_ALT")
        OPCION = context.Request("OPCION")

        Select Case OPCION
            Case "0"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim r As New Nomade.NC.NCEmpresa("Bn")
                dt = r.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                If Not (dt Is Nothing) Then
                    ' dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                        resb.Append("""AGENTE_RETEN_IND"" :" & """" & MiDataRow("AGENTE_RETEN_IND").ToString & """,")
                        resb.Append("""CORTO"" :" & """" & MiDataRow("CORTO").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "1" 'CREAR PRODUCTO
                Try
                    context.Response.ContentType = "text/plain"

                    resArray = nmGestionProductos.REGISTRAR_PRODUCTO(NOMPRODUCTO, CODE_ANTIGUO, CODE_AUXILIAR, ESTADO_IND, "S", UNME_CODE, GRUPO_CODE, MARCA_CODE,
                                                    MODELO, USUA_ID, SIN_SERIE, SERIADA, "N", "N", "0.00", NOM_COMERCIAL, MONE_CODE, "0.00", "0.00",
                                                    "N", MOSTRAR_LISTA, CTLG_CODE, "N", "0.00", RUTA_PPBIMAG, TIPO_EXISTENCIA, VOLUMEN, UNME_VOLUMEN,
                                                    MOSTRAR_LISTA, "N", URLPROD, DETRAC_CODE, DETRAC_PORCENTAJE, TIPO_BIEN, ISC, ENBRUTO_IND, ESP_ADICIONAL,
                                                    PRES_CODE, PESO, p_COMPRABLE_IND, ISC_CODE
                                                    )

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE_PRODUCTO"" :" & """" & resArray(0).ToString & """,")
                    resb.Append("""CODE_IMAGEN"" :" & """" & resArray(1).ToString & """,")
                    resb.Append("""SUCCESS"" :" & """" & resArray(2).ToString & """")
                    resb.Append("}")
                    resb.Append("]")

                    If RUTA_IMAGEN <> "" And resArray(2) = "OK" Then
                        RUTA = GrabaImagen(RUTA_IMAGEN, context, resArray(0).ToString + ".jpg")
                        RUTA_PPBIMAG = RUTA
                    Else
                        RUTA_PPBIMAG = "../../recursos/img/no_disponible.jpg"
                    End If

                    res = resb.ToString()
                Catch ex As Exception
                    Dim msg As String = ex.Message + ex.HelpLink + ex.Source


                    'context.Response.Write(ex.ToString)
                    context.Response.Write(msg)
                End Try
            Case "2"
                Try
                    Dim p As New Nomade.NM.NMGestionProductos("Bn")
                    Dim dt As New DataTable
                    Dim sb As New StringBuilder()

                    Dim inicio, fin As Integer

                    inicio = start
                    fin = length

                    dt = p.LISTAR_PRODUCTO_OPTIMIZADO(String.Empty, searchTable, String.Empty, String.Empty, String.Empty, CTLG_CODE, inicio, fin, ESTADO_IND, String.Empty, String.Empty, orderColumn, orderDir)
                    res = ListaProductosHtml(dt)
                    p = Nothing
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try

            Case "3" 'LISTAR PRODUCTO
                Try
                    context.Response.ContentType = "application/json; charset=utf-8"
                    CTLG_CODE = IIf(CTLG_CODE Is Nothing, "", CTLG_CODE)
                    dt = nmGestionProductos.LISTAR_PRODUCTO(PROD_CODE, String.Empty, String.Empty, String.Empty, String.Empty, CTLG_CODE)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""PROD_CODE"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                        resb.Append("""IMAG_CODE"" :" & """" & dt.Rows(0)("IMAG_CODE") & """,")
                        resb.Append("""RUTA_IMAGEN"" :" & """" & Utilities.FileImgToBase64(sRutaImagenes + dt.Rows(0)("RUTA_IMAGEN")) & """,")
                        resb.Append("""CTLG_CODE"" :" & """" & dt.Rows(0)("CTLG_CODE") & """,")
                        resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                        resb.Append("""LISTA"" :" & """" & dt.Rows(0)("LISTA") & """,")
                        resb.Append("""CODE_EXISTENCIA"" :" & """" & dt.Rows(0)("CODE_EXISTENCIA") & """,")
                        resb.Append("""DESC_EXISTENCIA"" :" & """" & dt.Rows(0)("DESC_EXISTENCIA") & """,")
                        resb.Append("""SERIADA"" :" & """" & dt.Rows(0)("SERIADA") & """,")
                        resb.Append("""NO_SERIADA"" :" & """" & dt.Rows(0)("NO_SERIADA") & """,")
                        resb.Append("""GRUPO"" :" & """" & dt.Rows(0)("CODIGO_GRUPO") & """,")
                        resb.Append("""DESC_GRUPO"" :" & """" & dt.Rows(0)("DESC_GRUPO") & """,")
                        resb.Append("""SUBGRUPO"" :" & """" & dt.Rows(0)("CODIGO_SUBGRUPO") & """,")
                        resb.Append("""DESC_SUBGRUPO"" :" & """" & dt.Rows(0)("DESC_SUBGRUPO") & """,")
                        resb.Append("""UNIDAD"" :" & """" & dt.Rows(0)("UNIDAD_DESPACHO") & """,")
                        resb.Append("""DESC_UNIDAD_DESPACHO"" :" & """" & dt.Rows(0)("DESC_UNIDAD_DESPACHO") & """,")
                        resb.Append("""DESC_CORTA_UNIDAD_DESPACHO"" :" & """" & dt.Rows(0)("DESC_CORTA_UNIDAD_DESPACHO") & """,")
                        resb.Append("""MARCA"" :" & """" & dt.Rows(0)("CODIGO_MARCA") & """,")
                        resb.Append("""DESC_MARCA"" :" & """" & dt.Rows(0)("MARCA") & """,")
                        resb.Append("""MODELO"" :" & """" & dt.Rows(0)("MODELO") & """,")
                        resb.Append("""NOMBRE"" :" & """" & dt.Rows(0)("DESC_ADM") & """,")
                        resb.Append("""ANTIGUO"" :" & """" & dt.Rows(0)("CODIGO_ANTIGUO") & """,")
                        resb.Append("""AUXILIAR"" :" & """" & dt.Rows(0)("CODIGO_AUXILIAR") & """,")
                        resb.Append("""MONEDA"" :" & """" & dt.Rows(0)("MONEDA") & """,")
                        resb.Append("""VOLUMEN"" :" & """" & dt.Rows(0)("VOLUMEN") & """,")
                        resb.Append("""UNME_VOLUMEN"" :" & """" & dt.Rows(0)("UNME_VOLUMEN") & """,")
                        resb.Append("""DESC_UNME_VOLUMEN"" :" & """" & dt.Rows(0)("DESC_UNME_VOLUMEN") & """,")
                        resb.Append("""DESC_CORTA_UNME_VOLUMEN"" :" & """" & dt.Rows(0)("DESC_CORTA_UNME_VOLUMEN") & """,")
                        resb.Append("""URLPROD"" :" & """" & dt.Rows(0)("URLPROD") & """,")
                        resb.Append("""DETRACCION_DECIMALES"" :" & """" & dt.Rows(0)("DETRACCION_DECIMALES") & """,")
                        resb.Append("""DETRACCION"" :" & """" & dt.Rows(0)("DETRACCION") & """,")
                        resb.Append("""DETRACCION_CODE"" :" & """" & dt.Rows(0)("DETRACCION_CODE") & """,")
                        resb.Append("""DESC_DETRACCION"" :" & """" & dt.Rows(0)("DESC_DETRACCION") & """,")
                        resb.Append("""PRECIO_IND"" :" & """" & dt.Rows(0)("PRECIO_IND") & """,")
                        resb.Append("""TIPO_BIEN"" :" & """" & dt.Rows(0)("TIPO_BIEN") & """,")
                        resb.Append("""ISC"" :" & """" & dt.Rows(0)("ISC") & """,")
                        resb.Append("""ENBRUTO_IND"" :" & """" & dt.Rows(0)("ENBRUTO_IND") & """,")
                        resb.Append("""ESP_ADICIONAL"" :" & """" & dt.Rows(0)("ESP_ADICIONAL") & """,")
                        resb.Append("""CODIGO_PRESENTACION"" :" & """" & dt.Rows(0)("CODIGO_PRESENTACION") & """,")
                        resb.Append("""DESC_PRESENTACION"" :" & """" & dt.Rows(0)("DESC_PRESENTACION") & """,")
                        resb.Append("""COMERCIAL"" :" & """" & dt.Rows(0)("NOMBRE_COMERCIAL") & """,")
                        resb.Append("""ALMACENABLE_IND"" :" & """" & dt.Rows(0)("ALMACENABLE_IND") & """,")
                        resb.Append("""PESO"" :" & """" & dt.Rows(0)("PESO") & """,")
                        resb.Append("""COMPRABLE_IND"" :" & """" & dt.Rows(0)("COMPRABLE_IND") & """,")
                        resb.Append("""ISC_IND"" :" & """" & dt.Rows(0)("ISC_IND") & """,")
                        resb.Append("""ISC_CODE"" :" & """" & dt.Rows(0)("ISC_CODE") & """")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "[{}]"
                    End If

                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try
            Case "4" 'ACTUALIZAR PRODUCTO
                Try

                    If RUTA_IMAGEN <> "" Then
                        RUTA = GrabaImagen(RUTA_IMAGEN, context, PROD_CODE + ".jpg")
                        RUTA_PPBIMAG = RUTA
                    Else
                        RUTA_PPBIMAG = "../../recursos/img/no_disponible.jpg"
                    End If

                    res = nmGestionProductos.ACTUALIZAR_PRODUCTO(PROD_CODE, IMAG_CODE, NOMPRODUCTO, CODE_ANTIGUO, CODE_AUXILIAR, ESTADO_IND, "N", UNME_CODE,
                                                                 GRUPO_CODE, MARCA_CODE, MODELO, USUA_ID, SIN_SERIE, SERIADA, "N", "N", "0.00", NOM_COMERCIAL,
                                                                 MONE_CODE, "0.00", "0.00", "N", "N", CTLG_CODE, "N", "0.00", RUTA_PPBIMAG, TIPO_EXISTENCIA,
                                                                 VOLUMEN, UNME_VOLUMEN, MOSTRAR_LISTA, URLPROD, "N", DETRAC_CODE, DETRAC_PORCENTAJE, PRECIO_IND,
                                                                 TIPO_BIEN, ISC, ENBRUTO_IND, ESP_ADICIONAL, PRES_CODE, PESO, p_COMPRABLE_IND, ISC_CODE)

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODE_PRODUCTO"" :" & """" & res & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try

            Case "5" 'Registrar precio ESTANDAR para todos los almacenes
                Try
                    res = nmGestionPrecios.REGISTRAR_PRECIO_ESTANDAR(PROD_CODE, CTLG_CODE, ALMC_CODE, UNME_CODE, PLAN_CODE, MONE_CODE,
                                                                     PRECIO_VENTA, PRECIO_MINIMO, UTILIDAD_VENTA, UTILIDAD_MINIMO, USUA_ID)
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try

            Case "6" 'Obtiene el precio ESTANDAR de el primer almacen (usado como global)
                Try
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmGestionPrecios.LISTAR_PRECIO_ESTANDAR(PROD_CODE, CTLG_CODE, ALMC_CODE)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""PRECIO_VENTA"" :" & """" & dt.Rows(0)("PRECIO_VENTA") & """,")
                        resb.Append("""UTILIDAD_VENTA"" :" & """" & dt.Rows(0)("UTILIDAD_VENTA") & """,")
                        resb.Append("""UTILIDAD_MINIMO"" :" & """" & dt.Rows(0)("UTILIDAD_MINIMO") & """,")
                        resb.Append("""ALMC_CODE"" :" & """" & dt.Rows(0)("ALMC_CODE") & """,")
                        resb.Append("""PRECIO_MINIMO"" :" & """" & dt.Rows(0)("PRECIO_MINIMO") & """")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "[{}]"
                    End If

                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try

            Case "PRECIO_LISTA" 'Obtiene el precio PRO LISTA DE CLIENTE 
                Try
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmGestionPrecios.LISTAR_PRECIO_CLIENTE_POR_LISTA(PROD_CODE, CTLG_CODE, CODE_LISTA, ALMC_CODE)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""PRECIO_VENTA"" :" & """" & dt.Rows(0)("PRECIO_VENTA") & """,")
                        resb.Append("""UTILIDAD_VENTA"" :" & """" & dt.Rows(0)("UTILIDAD_VENTA") & """,")
                        resb.Append("""ALMC_CODE"" :" & """" & dt.Rows(0)("ALMC_CODE") & """,")
                        resb.Append("""NOMBRE_LISTA"" :" & """" & dt.Rows(0)("NOMBRE_LISTA") & """,")
                        resb.Append("""PRECIO_MINIMO"" :" & """" & dt.Rows(0)("PRECIO_MINIMO") & """")
                        resb.Append("}")
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "[{}]"
                    End If

                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try

            Case "7" 'Actualiza precio ESTANDAR en todos los almacenes, si no tiene registro lo crea

                context.Response.ContentType = "application/text; charset=utf-8"
                Try
                    'res = nmGestionPrecios.REGISTRAR_PRECIO_ESTANDAR(PROD_CODE, CTLG_CODE, ALMC_CODE, UNME_CODE, PLAN_CODE, MONE_CODE,
                    '                                                 PRECIO_VENTA, PRECIO_MINIMO, UTILIDAD_VENTA, UTILIDAD_MINIMO, USUA_ID)
                    'Reemplaza los valores de aquellos almacenes que ya tienen registrado un precio estandar
                    res = nmGestionPrecios.ACTUALIZAR_PRECIO_ESTANDAR(PROD_CODE, CTLG_CODE, PRECIO_VENTA, PRECIO_MINIMO, UTILIDAD_VENTA, UTILIDAD_MINIMO, USUA_ID, ALMC_CODE)
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try


            Case "8" 'Registrar precio CANTIDAD para todos los almacenes
                Try
                    res = nmGestionPrecios.REGISTRAR_PRECIO_CANTIDAD(PROD_CODE, CTLG_CODE, ALMC_CODE, RANG_CODE, PLAN_CODE, MONE_CODE,
                                                                     PRECIO_VENTA, PRECIO_VENTA, UTILIDAD, FTVPRER_CODE, USUA_ID)
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try

            Case "69" 'Actualiza precio por CLIENTE por cada almacen
                context.Response.ContentType = "application/text; charset=utf-8"
                'Reemplaza los valores de aquellos almacenes que ya tienen registrado un precio cliente

                res = nmGestionPrecios.ACTUALIZAR_PRECIO_CLIENTE(PROD_CODE, CTLG_CODE, PRECIO_VENTA, PRECIO_VENTA, UTILIDAD_VENTA, USUA_ID, CODE_LISTA, ALMC_CODE)

            Case "9" 'Lista precio por CANTIDAD   para el primer almacén encontrado
                Try
                    context.Response.ContentType = "text/html"

                    dt = nmGestionPrecios.LISTAR_PRECIO_CANTIDAD(PROD_CODE, CTLG_CODE, ALMC_CODE)
                    ListaPreciosCantidadHtml(dt)
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try

            Case "10" 'Elimina precio por CANTIDAD  de todos los almacenes
                Try
                    context.Response.ContentType = "text/html"
                    res = nmGestionPrecios.QUITAR_PRECIO_CANTIDAD(PROD_CODE, CTLG_CODE, RANG_CODE, ALMC_CODE)
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try
            Case "11"
                Try
                    Dim P As New Nomade.NC.NCTipoClienteProveedor("Bn")
                    dt = P.ListarCategoriaCliente(PROD_CODE, String.Empty, "C", String.Empty, CTLG_CODE, SCSL_CODE)
                    ListaCategoriasClienteHtml(dt)
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try
            Case "12"
                Try
                    res = nmGestionProductos.ASIGNAR_PORCENTAJE_CATEGORIA_PRODUCTO(P_DETALLES)
                    If (res = "OK") Then
                        res = "OK"
                    Else
                        res = "ERROR AL GRABAR"
                    End If
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try
            Case "13"
                Try
                    'dt = p.LISTAR_CUENTAS_SUBGRUPO(GRUPO_CODE, CTLG_CODE)
                    'GenerarHtmlCuentas("", "", dt)
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try
            Case "14"
                'Try
                '    Dim P As New Nomade.NC.NCTipoClienteProveedor("Bn")

                '    res = P.AGREGAR_PORCENTAJE_CATEGORIA_PRODUCTO(PROD_CODE, DT_ID, DT_VALUE, USUA_ID)
                '    If (res = "OK") Then
                '        res = DT_VALUE
                '    Else
                '        res = "ERROR AL GRABAR"
                '    End If
                'Catch ex As Exception
                '    context.Response.Write(ex.ToString)
                'End Try
            Case "15"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim ncDetracciones As New Nomade.NC.NCDetracciones("Bn")
                dt = ncDetracciones.ListarDetracciones("", "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO") & """,")
                        resb.Append("""ANEXO"" :" & """" & MiDataRow("ANEXO") & """,")
                        resb.Append("""DEFINICION"" :" & """" & MiDataRow("DEFINICION") & """,")
                        resb.Append("""TIPO_EXISTENCIA_CODE"" :" & """" & MiDataRow("TIPO_EXISTENCIA_CODE") & """,")
                        resb.Append("""PORCENTAJE"" :" & """" & MiDataRow("PORCENTAJE") & """,")
                        resb.Append("""INFORMACION"" :" & """" & MiDataRow("INFORMACION").ToString().Replace(vbLf, "<br/>").Replace("""", "\""") & """,")
                        resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO") & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case "16" 'Listar valores de costeo del producto
                context.Response.ContentType = "application/json; charset=utf-8"

                Dim oNMGestionPrecios As New Nomade.NM.NMGestionPrecios("Bn")
                Dim oDT_Costo As New DataTable
                oDT_Costo = oNMGestionPrecios.fnGetCostoEstandarxProd(CTLG_CODE, SCSL_CODE, PROD_CODE)
                If oDT_Costo Is Nothing Then
                    res = "[]"
                Else
                    res = Utilities.DataTableToJSON(oDT_Costo)
                End If

            Case "17" 'Listar presentaciones
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim m As New Nomade.NM.NMPresentacionProd("Bn")
                dt = m.ListarPresentacionProd(String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""PRESENTACION"":""" & row("PRESENTACION").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "18" 'ACTUALIZAR ESTADO DE PRODUCTO
                context.Response.ContentType = "application/text; charset=utf-8"
                res = nmGestionProductos.ActualizarCampoGenerico("FTVPROD", "FTVPROD_CODE", p_CODIGO_FILTRO, "FTVPROD_ESTADO_IND", p_VALOR_ACTUALIZAR)

            Case "19" 'verifica si el prod posee movs en kardex
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NMGestionProductos As New Nomade.NM.NMGestionProductos("Bn")
                dt = NMGestionProductos.Verifica_Movimentos_Kardex_Producto(PROD_CODE, CTLG_CODE)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""MOVIMIENTOS"" :" & """" & MiDataRow("MOVIMIENTOS").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "20"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim NMGestionProductos As New Nomade.NM.NMGestionProductos("Bn")
                dt = NMGestionProductos.ListarProducto_CentroCosto(PROD_CODE)

                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""COSTO"" :" & """" & MiDataRow("CENTRO_COSTO").ToString & """,")
                        resb.Append("""CECC"" :" & """" & MiDataRow("CECC").ToString & """,")
                        resb.Append("""CECD"" :" & """" & MiDataRow("CED").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "21"
                context.Response.ContentType = "application/text; charset=utf-8"
                res = nmGestionProductos.ACTUALIZAR_PRODUCTO_CENTRO_COSTO(PROD_CODE, p_CECC, p_CECD)


            Case "L_PROD_SERV"
                context.Response.ContentType = "application/json; charset=utf-8"
                Try
                    Dim oNMGestionProductos As New Nomade.NM.NMGestionProductos("Bn")
                    Dim oDT As New DataTable

                    oDT = oNMGestionProductos.fnLISTAR_PROD_SERV(CTLG_CODE, ESTADO_IND)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If
                    'res = ListaProductosHtml(dt)
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try

            Case "CNA" 'Crear Nombre Alternativo
                Try
                    context.Response.ContentType = "text/plain"
                    Dim oNMGestionProductos As New Nomade.NM.NMGestionProductos("Bn")
                    res = nmGestionProductos.CreaNombreAltProducto(PROD_CODE, NOMPRODUCTO, USUA_ID)
                Catch ex As Exception
                    Dim msg As String = ex.Message + ex.HelpLink + ex.Source
                    context.Response.Write(msg)
                End Try

            Case "LNA" 'Lista Nombre Alternativo
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dt As New DataTable
                Dim oNMGestionProductos As New Nomade.NM.NMGestionProductos("Bn")
                dt = oNMGestionProductos.ListarNombreAltProducto(PROD_CODE)
                If dt Is Nothing Then
                    res = "{}"
                Else
                    res = Utilities.DataTableToJSON(dt)
                End If

            Case "LNA2" 'Lista Nombre Alternativo TODOS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dt As New DataTable
                Dim oNMGestionProductos As New Nomade.NM.NMGestionProductos("Bn")
                dt = oNMGestionProductos.ListarNombreAltProductoTodo(PROD_CODE)
                If dt Is Nothing Then
                    res = "{}"
                Else
                    res = Utilities.DataTableToJSON(dt)
                End If


            Case "ENA" 'Eliminar Nombre Alternativo
                Try
                    context.Response.ContentType = "text/plain"
                    Dim oNMGestionProductos As New Nomade.NM.NMGestionProductos("Bn")
                    res = nmGestionProductos.EliminarNombreAltProducto(ID_NOMBRE_ALT)
                Catch ex As Exception
                    Dim msg As String = ex.Message + ex.HelpLink + ex.Source
                    context.Response.Write(msg)
                End Try

            Case "GENERAR_CODE" 'Eliminar Nombre Alternativo
                Try
                    context.Response.ContentType = "text/plain"
                    res = nmGestionProductos.GET_COD_PROD_GENERADO(CTLG_CODE, GRUPO_CODE)
                Catch ex As Exception
                    Dim msg As String = ex.Message + ex.HelpLink + ex.Source
                    context.Response.Write(msg)
                End Try

            Case "LISTAR_ALMACENES" 'Registrar precio ESTANDAR para todos los almacenes
                context.Response.ContentType = "application/json; charset=utf-8"
                Try
                    Dim naAlmacen As New Nomade.NA.NAConfAlmacenes("Bn")
                    Dim oDT As New DataTable
                    oDT = naAlmacen.ListarAlmacenes("", CTLG_CODE, "", "A")
                    If oDT Is Nothing Then
                        res = "[]"
                    ElseIf oDT.Rows.Count = 0 Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If
                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try

            Case "LCAT" 'Lista categoria cliente
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim P As New Nomade.NC.NCTipoClienteProveedor("Bn")
                dt = P.ListarCategoriaCliente(PROD_CODE, String.Empty, "C", String.Empty, CTLG_CODE, SCSL_CODE)
                If dt Is Nothing Then
                    res = "{}"
                Else
                    res = Utilities.DataTableToJSON(dt)
                End If

            Case "LTISC" 'Lista los tipos de sistema del ISC
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim m As New Nomade.NM.NMTipoSistemaIsc("Bn")
                dt = m.ListarTipoSistemasIsc(String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        If MiDataRow("ESTADO").ToString = "ACTIVO" Then
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        End If
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()

            Case Else

        End Select
        context.Response.Write(res)
    End Sub

    Public Function ListaProductosHtml(ByVal dt As DataTable) As String

        If Not dt Is Nothing Then
            resb.Append("{")
            resb.Append("""draw"":" & draw & ",")
            resb.Append("""recordsTotal"":" & dt.Rows(0)("TOTAL_REGISTROS").ToString() & ",")
            resb.Append("""recordsFiltered"":" & dt.Rows(0)("TOTAL_REGISTROS").ToString() & ",")
            resb.Append("""data"":[")

            For Each row As DataRow In dt.Rows
                resb.Append("[")
                resb.Append("""" & row("CTLG_CODE").ToString & """,")
                resb.Append("""" & row("CODIGO").ToString & """,")
                resb.Append("""" & row("CODIGO_ANTIGUO").ToString & """,")
                resb.Append("""" & row("DESC_ADM").ToString & """,")
                resb.Append("""" & row("MARCA").ToString & """,")
                resb.Append("""" & row("DESC_GRUPO").ToString & """,")
                resb.Append("""" & row("DESC_SUBGRUPO").ToString & """,")
                resb.Append("""" & row("DESC_EXISTENCIA").ToString & """,")
                resb.Append("""" & row("DESC_UNIDAD_DESPACHO").ToString & """,")
                resb.Append("""" & row("CODIGO_AUXILIAR").ToString & """,")
                resb.Append("""" & row("ESTADO").ToString & """,")
                resb.Append("""" & row("ESTADO").ToString & """") 'DATA PARA BOTON
                resb.Append("],")
            Next
            resb.Append("{}")
            resb = resb.Replace(",{}", String.Empty)
            resb.Append("]")
            resb.Append("}")
        Else
            resb.Append("{")
            resb.Append("""draw"":" & draw & ",")
            resb.Append("""recordsTotal"":" & 0 & ",")
            resb.Append("""recordsFiltered"":" & 0 & ",")
            resb.Append("""data"":[]")
            resb.Append("}")
        End If
        Return resb.ToString()
    End Function

    Public Function ListaPreciosCantidadHtml(ByVal dt As DataTable) As String
        Dim del As String
        If Not dt Is Nothing Then
            resb.Clear()
            resb.Append("<table cellspacing='0' class='table table-bordered table-hover' id='tbl_precio' style='width:100%'>")
            resb.Append("<thead>")
            resb.Append("<tr>")
            resb.Append("<th align='center'>RANGO</th>")
            resb.Append("<th align='center'>UT %</th>")
            resb.Append("<th align='center'>PRECIO</th>")
            resb.Append("<th align='center'>QUITAR</th>")
            resb.Append("</tr>")
            resb.Append("</thead>")
            resb.Append("<tbody id='det_tbl_precio'>")
            For i As Integer = 0 To dt.Rows.Count - 1
                del = "<a href=javascript:quitaritem('" & dt.Rows(i)("RANGO").ToString() & "'); class='btn red icn-only'><i class='icon-remove icon-white'></i></a>"
                resb.AppendFormat("<tr id='{0}'>", dt.Rows(i)("RANGO").ToString().Replace(".", "_"))
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("NOMBRE_RANGO").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("UTILIDAD").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("PRECIO").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", del)
                resb.Append("</tr>")
            Next
            resb.Append("</tbody>")
            resb.Append("</table>")
            res = resb.ToString
        Else
            res = "<table class='table table-bordered table-hover' id='tbl_precio'><thead><tr><th>UNIDAD</th><th>UT. %</th><th>PRECIO</th><th>QUITAR</th></tr></thead><tbody id='det_tbl_precio'></tbody></table>"
        End If
        Return res
    End Function

    Public Function GenerarHtmlCuentas(ByVal name As String, ByVal titulo As String, ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table cellspacing='0' class='table table-bordered table-hover'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th align='center'>Tipo Cuenta</th>"
            res += "<th align='center'>Cta. Haber</th>"
            res += "<th align='center'>Desc. Cuenta</th>"
            res += "<th align='center'>Cta. Debe</th>"
            res += "<th align='center'>Desc. Cuenta</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr>"
                res += "<td>Compras</td>"
                res += "<td>" & dt.Rows(i)("COMPRAS_HABER").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("DES_COMPRAS_HABER").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("COMPRAS_DEBE").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("DES_COMPRAS_DEBE").ToString() & "</td>"
                res += "</tr>"
                res += "<tr>"
                res += "<td>Ventas</td>"
                res += "<td>" & dt.Rows(i)("VENTAS_HABER").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("DES_VENTAS_HABER").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("VENTAS_DEBE").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("DES_VENTAS_DEBE").ToString() & "</td>"
                res += "</tr>"
                res += "<tr>"
                res += "<td>Consumo</td>"
                res += "<td>" & dt.Rows(i)("CONSUMO_HABER").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("DES_CONSUMO_HABER").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("CONSUMO_DEBE").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("DES_CONSUMO_DEBE").ToString() & "</td>"
                res += "</tr>"
                res += "<tr>"
                res += "<td>Costo Venta</td>"
                res += "<td>" & dt.Rows(i)("COSTO_HABER").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("DES_COSTO_HABER").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("COSTO_DEBE").ToString() & "</td>"
                res += "<td>" & dt.Rows(i)("DES_COSTO_DEBE").ToString() & "</td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "No se encontraron datos!!!"
        End If
        Return res
    End Function


    Public Function ListaCategoriasClienteHtml(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            res = "<table cellspacing='0' class='table table-bordered' id='tbl_categoria'>"
            res += "<thead>"
            res += "<tr>"
            res += "<th align='center' width='44px'>ID</th>"
            res += "<th align='center' width='400px'>CATEGORIA</th>"
            res += "<th align='center' width='100px'>DSCTO %</th>"
            res += "</tr>"
            res += "</thead>"
            res += "<tbody id='det_tbl_cantidad'>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<tr id='" & dt.Rows(i)("CODIGO").ToString() & "'></td>"
                res += "<td align='left' width='44px'>" & dt.Rows(i)("CODIGO").ToString() & "</td>"
                res += "<td align='left' width='400px'>" & dt.Rows(i)("DESCRIPCION").ToString() & "</td>"
                res += "<td align='right' width='100px'><input type='text' onblur='validarDescuento(this.value)'  class='m-wrap descuento span' style='text-align: right;' data-cod= '" & dt.Rows(i)("CODIGO").ToString() & "' value='" & dt.Rows(i)("DESCUENTO").ToString() & "'/></td>"
                res += "</tr>"
            Next
            res += "</tbody>"
            res += "</table>"
        Else
            res = "<table class='table table-bordered' id='tbl_categoria'><thead><tr><th>ID</th><th>CATEGORIA</th><th>DESCUENTO</th></tr></thead><tbody></tbody></table>"
        End If
        Return res
    End Function

    Public Function GrabaImagen(ByVal img As String, ByVal context As HttpContext, ByVal nombrearch As String) As String
        Dim rp As String = String.Empty
        Try
            Dim savepath As String = sRutaImagenes
            Dim filename As String = nombrearch

            If Not Directory.Exists(savepath) Then
                Directory.CreateDirectory(savepath)
            End If

            File.WriteAllBytes(savepath & "\" & filename, Utilities.Base64ImgToBytes(img))
            rp = "/" & filename

            context.Response.StatusCode = 200

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

        Return rp
    End Function

    Private Function GetEncoder(ByVal format As ImageFormat) As ImageCodecInfo
        Dim codecs As ImageCodecInfo() = ImageCodecInfo.GetImageDecoders()
        Dim codec As ImageCodecInfo
        For Each codec In codecs
            If codec.FormatID = format.Guid Then
                Return codec
            End If
        Next codec
        Return Nothing
    End Function

    ''' <summary>
    ''' Elimina espacion vacios (trim), cambia (") por ('), reemplaza (/) por vacio
    ''' </summary>
    ''' <param name="campo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
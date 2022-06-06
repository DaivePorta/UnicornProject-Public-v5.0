<%@ WebHandler Language="VB" Class="NVLCPRO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLCPRO : Implements IHttpHandler

    Dim CTLG_CODE, SCSL_CODE, ESTADO_IND, STOCK_IND, MOSTRAR_LISTA, SERIADA,
       GRUPO_CODE, SUBGRUPO_CODE, MARCA_CODE,
       NOMPRODUCTO, CODE_ANTIGUO, USUA_ID, OPCION, PROD_CODE,
       ALMC_CODE As String

    'Para usar el server-side processing DataTables
    Dim length, start, draw As Integer
    Dim searchTable As String
    Dim orderColumn, orderDir As String
    Dim dt As DataTable

    Dim nmGestionProductos As New Nomade.NM.NMGestionProductos("Bn")

    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    Dim sRutaImagenes As String = System.Configuration.ConfigurationManager.AppSettings("PathImagenes") + "Productos"

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        'Para usar el server-side processing DataTables
        length = context.Request("length")
        start = context.Request("start")
        draw = context.Request("draw")
        searchTable = context.Request("search[value]")
        orderColumn = context.Request("order[0][column]")
        orderDir = context.Request("order[0][dir]")

        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        ALMC_CODE = context.Request("ALMC_CODE")
        GRUPO_CODE = context.Request("GRUPO_CODE")
        SUBGRUPO_CODE = context.Request("SUBGRUPO_CODE")
        MARCA_CODE = context.Request("MARCA_CODE")
        ESTADO_IND = context.Request("ESTADO_IND")
        STOCK_IND = context.Request("STOCK_IND")

        SERIADA = context.Request("SERIADA")
        NOMPRODUCTO = context.Request("NOMPRODUCTO")
        CODE_ANTIGUO = context.Request("CODE_ANTIGUO")
        USUA_ID = context.Request("USUA_ID")
        PROD_CODE = context.Request("PROD_CODE")


        Select Case OPCION
            Case "1" 'LISTAR CATALOGO PRODUCTO CON IMAGEN
                Try
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmGestionProductos.ListarCatalogoProductoImg("", CTLG_CODE, ALMC_CODE, GRUPO_CODE, SUBGRUPO_CODE, MARCA_CODE, ESTADO_IND, STOCK_IND)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO") & """,")
                            resb.Append("""DESC_ADM"" :" & """" & row("DESC_ADM") & """,")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & row("CODIGO_ANTIGUO") & """,")
                            resb.Append("""CODIGO_AUXILIAR"" :" & """" & row("CODIGO_AUXILIAR") & """,")
                            resb.Append("""MODELO"" :" & """" & row("MODELO") & """,")
                            resb.Append("""ESTADO"" :" & """" & row("ESTADO") & """,")
                            resb.Append("""SERIADA"" :" & """" & row("SERIADA") & """,")
                            resb.Append("""NOMBRE_COMERCIAL"" :" & """" & row("NOMBRE_COMERCIAL") & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & row("CTLG_CODE") & """,")
                            resb.Append("""VOLUMEN"" :" & """" & row("VOLUMEN") & """,")
                            resb.Append("""LISTA"" :" & """" & row("LISTA") & """,")
                            resb.Append("""ENBRUTO_IND"" :" & """" & row("ENBRUTO_IND") & """,")
                            resb.Append("""ESP_ADICIONAL"" :" & """" & row("ESP_ADICIONAL") & """,")
                            resb.Append("""CODIGO_PRESENTACION"" :" & """" & row("CODIGO_PRESENTACION") & """,")
                            resb.Append("""USUARIO"" :" & """" & row("USUARIO") & """,")
                            resb.Append("""FECHA_ACTV"" :" & """" & row("FECHA_ACTV") & """,")
                            resb.Append("""PRECIO_IND"" :" & """" & row("PRECIO_IND") & """,")
                            resb.Append("""TIPO_BIEN"" :" & """" & row("TIPO_BIEN") & """,")
                            resb.Append("""DETRACCION"" :" & """" & row("DETRACCION") & """,")
                            resb.Append("""ISC"" :" & """" & row("ISC") & """,")
                            resb.Append("""URLPROD"" :" & """" & row("URLPROD") & """,")
                            resb.Append("""CODIGO_SUBGRUPO"" :" & """" & row("CODIGO_SUBGRUPO") & """,")
                            resb.Append("""DESC_SUBGRUPO"" :" & """" & row("DESC_SUBGRUPO") & """,")
                            resb.Append("""CODIGO_GRUPO"" :" & """" & row("CODIGO_GRUPO") & """,")
                            resb.Append("""DESC_GRUPO"" :" & """" & row("DESC_GRUPO") & """,")
                            resb.Append("""CODIGO_MARCA"" :" & """" & row("CODIGO_MARCA") & """,")
                            resb.Append("""DESC_MARCA"" :" & """" & row("DESC_MARCA") & """,")
                            resb.Append("""DESC_MONEDA"" :" & """" & row("DESC_MONEDA") & """,")
                            resb.Append("""DESC_CORTA_MONEDA"" :" & """" & row("DESC_CORTA_MONEDA") & """,")
                            resb.Append("""SIMBOLO_MONEDA"" :" & """" & row("SIMBOLO_MONEDA") & """,")
                            resb.Append("""DESC_EXISTENCIA"" :" & """" & row("DESC_EXISTENCIA") & """,")
                            resb.Append("""ALMACENABLE_IND"" :" & """" & row("ALMACENABLE_IND") & """,")
                            resb.Append("""DESC_DETRACCION"" :" & """" & row("DESC_DETRACCION") & """,")
                            resb.Append("""DESC_PRESENTACION"" :" & """" & row("DESC_PRESENTACION") & """,")
                            resb.Append("""CODIGO_UNIDAD_DESPACHO"" :" & """" & row("CODIGO_UNIDAD_DESPACHO") & """,")
                            resb.Append("""DESC_UNIDAD_DESPACHO"" :" & """" & row("DESC_UNIDAD_DESPACHO") & """,")
                            resb.Append("""DESC_CORTA_UNIDAD_DESPACHO"" :" & """" & row("DESC_CORTA_UNIDAD_DESPACHO") & """,")
                            resb.Append("""CODIGO_UNIDAD_VOLUMEN"" :" & """" & row("CODIGO_UNIDAD_VOLUMEN") & """,")
                            resb.Append("""DESC_UNIDAD_VOLUMEN"" :" & """" & row("DESC_UNIDAD_VOLUMEN") & """,")
                            resb.Append("""DESC_CORTA_UNIDAD_VOLUMEN"" :" & """" & row("DESC_CORTA_UNIDAD_VOLUMEN") & """,")
                            resb.Append("""PRECIOS_ESTANDAR"" :" & """" & row("PRECIOS_ESTANDAR") & """,")
                            resb.Append("""ALMACENES_PREE"" :" & """" & row("ALMACENES_PREE") & """,")
                            resb.Append("""PRECIOS_CANTIDAD"" :" & """" & row("PRECIOS_CANTIDAD") & """,")
                            resb.Append("""STOCK_REAL"" :" & """" & row("STOCK_REAL") & """,")
                            resb.Append("""RUTA_IMAGEN"" :" & """" & Utilities.FileImgToBase64(sRutaImagenes + row("RUTA_IMAGEN")) & """,")
                            resb.Append("""IMAG_CODE"" :" & """" & row("IMAG_CODE") & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "[]"
                    End If

                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try
            Case "2" 'LISTAR CATALOGO PRODUCTO
                Try
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmGestionProductos.ListarCatalogoProducto("", CTLG_CODE, ALMC_CODE, GRUPO_CODE, SUBGRUPO_CODE, MARCA_CODE, ESTADO_IND, STOCK_IND)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Catch ex As Exception
                    context.Response.Write(ex.ToString)
                End Try
            Case Else

        End Select
        context.Response.Write(res)
    End Sub


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property


End Class
<%@ WebHandler Language="VB" Class="AFMACFI" %>

Imports System
Imports System.Web
Imports System.Data

Public Class AFMACFI : Implements IHttpHandler

    Dim af As New Nomade.AF.AFActivoFijo("BN")

    Dim dt As DataTable

    Dim res As String
    Dim sb As New StringBuilder()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        Dim OPCION = context.Request("OPCION")
        Dim P_CODE As String = context.Request("P_CODE")
        Dim CTLG_CODE As String = context.Request("CTLG_CODE")
        Dim SCSL_CODE As String = context.Request("SCSL_CODE")
        Dim ALMC_CODE = context.Request("ALMC_CODE")
        Dim USUA_ID As String = context.Request("USUA_ID")

        Dim IMPR_CODE = context.Request("IMPR_CODE")
        Dim PROD_CODE = context.Request("PROD_CODE")
        Dim MCDR_CODE = context.Request("MCDR_CODE")
        Dim UNID_CODE = context.Request("UNID_CODE")
        Dim UNIDAD = context.Request("UNIDAD")
        Dim SERIE = context.Request("SERIE")
        Dim FECHA_INICIAL = Utilities.fechaLocal(context.Request("FECHA_INICIAL"))
        Dim VALOR_INICIAL = context.Request("VALOR_INICIAL")
        Dim VIDA_UTIL = context.Request("VIDA_UTIL")
        Dim VALOR_DESECHO = context.Request("VALOR_DESECHO")
        Dim METODO_DEPRECIACION = context.Request("METODO_DEPRECIACION")
        Dim PRODUCCION = context.Request("PRODUCCION")
        Dim CENTRO_COSTO = context.Request("CENTRO_COSTO")



        Dim NIVEL1_VAL = context.Request("NIVEL1_VAL")
        Dim NIVEL2_VAL = context.Request("NIVEL2_VAL")
        Dim NIVEL3_VAL = context.Request("NIVEL3_VAL")
        Dim CENTRO_COSTO_DETALLE = context.Request("CENTRO_COSTO_DETALLE")
        Dim ESTADO = context.Request("ESTADO")
        Dim Vendido = context.Request("p_Vendido")

        Select Case OPCION
            Case "S"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = af.ListarActivosFijos(P_CODE, String.Empty, CTLG_CODE, SCSL_CODE, ESTADO)
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        sb.Append("""CODIGO_AF"":""" & row("CODIGO_AF").ToString & """,")
                        sb.Append("""CTLG"":""" & row("CTLG").ToString & """,")
                        sb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                        sb.Append("""SCSL"":""" & row("SCSL").ToString & """,")
                        sb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
                        sb.Append("""BIEN_CODE"":""" & row("BIEN_CODE").ToString & """,")
                        sb.Append("""BIEN"":""" & row("BIEN").ToString & """,")
                        sb.Append("""MCDR_CODE"":""" & row("MCDR_CODE").ToString & """,")
                        sb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                        sb.Append("""METODO_DEPRECIACION"":""" & row("METODO_DEPRECIACION").ToString & """,")
                        'sb.Append("""NIVEL1_VAL"":""" & row("NIVEL1_VAL").ToString & """,")
                        sb.Append("""DESC_CENTRO_COSTO"":""" & row("DESC_CENTRO_COSTO").ToString & """,")
                        sb.Append("""CENTRO_COSTO"":""" & row("CENTRO_COSTO").ToString & """,")
                        sb.Append("""DETALLE_CENTRO_COSTO"":""" & row("DETALLE_CENTRO_COSTO").ToString & """,")
                        sb.Append("""VALOR_INICIAL"":""" & row("VALOR_INICIAL").ToString & """,")
                        sb.Append("""PRODUCCION"":""" & row("PRODUCCION").ToString & """,")
                        sb.Append("""VIDA_UTIL"":""" & row("VIDA_UTIL").ToString & """,")
                        sb.Append("""VALOR_DESECHO"":""" & row("VALOR_DESECHO").ToString & """,")
                        sb.Append("""FECHA_INICIAL"":""" & row("FECHA_INICIAL").ToString & """,")
                        sb.Append("""VALOR_ACTUAL"":""" & row("VALOR_ACTUAL").ToString & """,")
                        sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                        sb.Append("""TIPO_BIEN"":""" & row("TIPO_BIEN").ToString & """")
                        sb.Append("},")
                    Next
                    sb.Append("-")
                    sb.Replace("},-", "}")
                    sb.Append("]")
                Else
                    sb.Append("[]")
                    'sb.Append("[")
                    'sb.Append("{")
                    'sb.Append("""CODIGO"":""" & "SIN REGISTROS" & """,")
                    'sb.Append("""CODIGO_AF"":""" & "" & """,")
                    'sb.Append("""CTLG"":""" & "" & """,")
                    'sb.Append("""CTLG_CODE"":""" & "" & """,")
                    'sb.Append("""SCSL"":""" & "" & """,")
                    'sb.Append("""SCSL_CODE"":""" & "" & """,")
                    'sb.Append("""BIEN_CODE"":""" & "" & """,")
                    'sb.Append("""BIEN"":""" & "" & """,")
                    'sb.Append("""MCDR_CODE"":""" & "" & """,")
                    'sb.Append("""SERIE"":""" & "" & """,")
                    'sb.Append("""METODO_DEPRECIACION"":""" & "" & """,")
                    'sb.Append("""NIVEL1_VAL"":""" & "" & """,")
                    'sb.Append("""NIVEL2_VAL"":""" & "" & """,")
                    'sb.Append("""NIVEL3_VAL"":""" & "" & """,")
                    'sb.Append("""CENTRO_COSTO_DETALLE"":""" & "" & """,")
                    'sb.Append("""VALOR_INICIAL"":""" & "" & """,")
                    'sb.Append("""PRODUCCION"":""" & "" & """,")
                    'sb.Append("""VIDA_UTIL"":""" & "" & """,")
                    'sb.Append("""VALOR_DESECHO"":""" & "" & """,")
                    'sb.Append("""FECHA_INICIAL"":""" & "" & """,")
                    'sb.Append("""VALOR_ACTUAL"":""" & "" & """,")
                    'sb.Append("""ESTADO"":""" & "" & """,")
                    'sb.Append("""TIPO_BIEN"":""" & "" & """")
                    'sb.Append("}")
                    'sb.Append("]")
                End If


                res = sb.ToString()
            Case "SALMC" 'CARGAR CODIGO ALMACEN
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim almc As New Nomade.NA.NAConfAlmacenes("BN")
                dt = almc.ListarAlmacenes(String.Empty, CTLG_CODE, SCSL_CODE, "A")
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """")
                        sb.Append("},")
                    Next
                    sb.Append("+")
                    sb.Replace(",+", "")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "LCC" 'LISTAR CENTRO DE COSTOS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim cc As New Nomade.NC.NCCentroCostos("BN")
                dt = cc.Listar_CentroCostos_Cabecera(String.Empty, CTLG_CODE, "A", String.Empty, String.Empty)
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                        sb.Append("""NOMBRE_PLAN"":""" & row("NOMBRE_PLAN").ToString & """,")
                        sb.Append("""NIVELES"":""" & row("NIVELES").ToString & """,")
                        sb.Append("""NIVEL1"":""" & row("NIVEL1").ToString & """,")
                        sb.Append("""NIVEL2"":""" & row("NIVEL2").ToString & """,")
                        sb.Append("""NIVEL3"":""" & row("NIVEL3").ToString & """,")
                        sb.Append("""NIVEL4"":""" & row("NIVEL4").ToString & """,")
                        sb.Append("""ESTADO_IND"":""" & row("NESTADO_IND").ToString & """")
                        sb.Append("},")
                    Next
                    sb.Append("+")
                    sb.Replace(",+", "")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "LNCC" 'LISTAR NIVEL DE UN CENTRO DE COSTOS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim cc As New Nomade.NC.NCCentroCostos("BN")
                Dim CECC_CODE As String = context.Request("CECC_CODE")
                Dim NIVEL As String = context.Request("NIVEL")
                Dim DEPEND_CODE As String = context.Request("DEPEND_CODE")
                dt = cc.Listar_CentroCostos_Detalle(String.Empty, CECC_CODE, DEPEND_CODE, NIVEL, "A")
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODE"":""" & row("CODE").ToString & """,")
                        sb.Append("""DESCC"":""" & row("DESCC").ToString & """,")
                        sb.Append("""ESTADO_IND"":""" & row("NESTADO_IND").ToString & """")
                        sb.Append("},")
                    Next
                    sb.Append("+")
                    sb.Replace(",+", "")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "LIMPR" 'LISTAR IMPRESORAS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim imp As New Nomade.NC.NCImpresora("BN")
                dt = imp.ListarImpresora(String.Empty, "A", String.Empty, CTLG_CODE, SCSL_CODE)
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"" :" & """" & row("CODIGO") & """,")
                        sb.Append("""MARCA"" :" & """" & row("MARCA") & """,")
                        sb.Append("""MODELO"" :" & """" & row("MODELO") & """,")
                        sb.Append("""SERIE"" :" & """" & row("SERIE") & """,")
                        sb.Append("""TIPO"" :" & """" & row("TIPO") & """")
                        sb.Append("},")
                    Next
                    sb.Append("+")
                    sb.Replace(",+", "")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "LPROD" 'LISTAR PRODUCTOS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim prod As New Nomade.NM.NMGestionProductos("BN")
                dt = prod.LISTAR_PRODUCTO(String.Empty, String.Empty, String.Empty, String.Empty, ALMC_CODE, CTLG_CODE, "S")
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"" :" & """" & row("CODIGO") & """,")
                        sb.Append("""CODIGO_ANTIGUO"" :" & """" & row("CODIGO_ANTIGUO") & """,")
                        sb.Append("""DESC_ADM"" :" & """" & row("DESC_ADM") & """,")
                        sb.Append("""SERIADA"" :" & """" & row("SERIADA") & """")
                        sb.Append("},")
                    Next
                    sb.Append("+")
                    sb.Replace(",+", "")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "LSPROD" 'LISTAR SERIES DE PRODUCTOS SERIADOS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim prod As New Nomade.NM.NMGestionProductos("BN")
                dt = prod.LISTAR_SERIADOS(String.Empty, String.Empty, PROD_CODE, CTLG_CODE, ALMC_CODE, Vendido, String.Empty)
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        ' If row("VENDIDO").ToString = "NO" Then
                        sb.Append("{")
                        sb.Append("""CODIGO"" :" & """" & row("CODIGO") & """,")
                        sb.Append("""CODIGO_BARRAS"" :" & """" & row("CODIGO_BARRAS") & """")
                        sb.Append("},")
                        ' End If
                    Next
                    sb.Append("+")
                    sb.Replace(",+", "")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "LVEH" 'LISTAR VEHICULOS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim uv As New Nomade.NF.NFUnidadVehiculo("BN")
                dt = uv.ListarUnidad(String.Empty, CTLG_CODE, "A", 0, USUA_ID)
                If Not dt Is Nothing Then
                    sb.Append("[")
                    For Each row As DataRow In dt.Rows
                        sb.Append("{")
                        sb.Append("""CODIGO"" :" & """" & row("CODIGO") & """,")
                        sb.Append("""MARCA"" :" & """" & row("NOMBRE_MARCA") & """,")
                        sb.Append("""CARROCERIA"" :" & """" & row("CARROCERIA") & """,")
                        sb.Append("""COLOR"" :" & """" & row("COLOR") & """,")
                        sb.Append("""PLACA"" :" & """" & row("PLACA") & """,")
                        sb.Append("""SERIE"" :" & """" & row("SERIE") & """,")
                        sb.Append("""CHASIS"" :" & """" & row("CHASIS") & """")
                        sb.Append("},")
                    Next
                    sb.Append("+")
                    sb.Replace(",+", "")
                    sb.Append("]")
                End If
                res = sb.ToString()
            Case "VACTUAL" 'OBTENER VALOR ACTUAL DEL ACTIVO FIJO
                context.Response.ContentType = "text/plain"
                res = af.CargarValorActualActivoFijo(P_CODE)
            Case "G"
                context.Response.ContentType = "text/plain"
                res = af.CrearActivoFijo(IIf(IMPR_CODE = "", Nothing, IMPR_CODE), IIf(PROD_CODE = "", Nothing, PROD_CODE), MCDR_CODE,
                                         IIf(UNID_CODE = "", Nothing, UNID_CODE), IIf(UNIDAD = "", Nothing, UNIDAD),
                                         SERIE, FECHA_INICIAL, Nothing, VALOR_INICIAL, Nothing, If(PRODUCCION = "", "0", PRODUCCION), VIDA_UTIL, VALOR_DESECHO, METODO_DEPRECIACION,
                                         CENTRO_COSTO_DETALLE, CTLG_CODE, SCSL_CODE, ESTADO, USUA_ID, CENTRO_COSTO)
            Case "A"
                context.Response.ContentType = "text/plain"
                res = af.ActualizarActivoFijo(P_CODE, IIf(IMPR_CODE = "", Nothing, IMPR_CODE), IIf(PROD_CODE = "", Nothing, PROD_CODE), MCDR_CODE,
                                         IIf(UNID_CODE = "", Nothing, UNID_CODE), IIf(UNIDAD = "", Nothing, UNIDAD),
                                         SERIE, FECHA_INICIAL, Nothing, VALOR_INICIAL, Nothing, IIf(PRODUCCION = "", "0", PRODUCCION), VIDA_UTIL, VALOR_DESECHO, METODO_DEPRECIACION,
                                         CENTRO_COSTO_DETALLE, CTLG_CODE, SCSL_CODE, ESTADO, USUA_ID, CENTRO_COSTO)
            Case "AE"
                context.Response.ContentType = "text/plain"
                res = af.CambiarEstadoActivoFijo(P_CODE, USUA_ID)
        End Select
        context.Response.Write(res)
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
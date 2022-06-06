<%@ WebHandler Language="VB" Class="MPMFORP" %>

Imports System
Imports System.Web
Imports System.Data

Public Class MPMFORP : Implements IHttpHandler
    
    Dim OPCION As String
    Dim dt As DataTable
    
    Dim CODIGO, CTLG_CODE, ALMC_CODE, USUA_ID As String
    Dim PROD_CODE, GRUP_CODE, PROC_CODE, HORAS, TIEMPO, CANTIDAD, UNID_CODE, INSUMOS, UNIDADES, CANTIDADES, MERMAS, MAQUINARIAS, CANTIDADES_M, DERIVADOS, UNIDADES_D, CANTIDADES_D As String
    
    Dim resb As New StringBuilder()
    Dim res As String
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        
        OPCION = context.Request("OPCION")
        CODIGO = context.Request("CODIGO")
        CTLG_CODE = context.Request("CTLG_CODE")
        USUA_ID = context.Request("USUA_ID")
        
        Try
            Select Case OPCION
                Case "S"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.MP.MPFormulacionProductos("BN").ListarFormulaciones(CODIGO, "", "", "", "", "")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & row("CTLG_CODE").ToString & """,")
                            resb.Append("""ALMC_CODE"" :" & """" & row("ALMC_CODE").ToString & """,")
                            resb.Append("""PROD_CODE"" :" & """" & row("PROD_CODE").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & row("PRODUCTO").ToString & """,")
                            resb.Append("""PROC_CODE"" :" & """" & row("PROC_CODE").ToString & """,")
                            resb.Append("""PROCESO"" :" & """" & row("PROCESO").ToString & """,")
                            resb.Append("""HORAS"" :" & """" & row("HORAS").ToString & """,")
                            resb.Append("""TIEMPO"" :" & """" & row("TIEMPO").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & row("CANTIDAD").ToString & """,")
                            resb.Append("""UNID_CODE"" :" & """" & row("UNID_CODE").ToString & """,")
                            resb.Append("""UNIDAD"" :" & """" & row("UNIDAD").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & row("ESTADO").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTAR_PRODUCTOS_TERMINADOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NM.NMGestionProductos("BN").LISTAR_PRODUCTO_NAMINSA(CTLG_CODE, "", "S", "A")
                    resb.Append("[")
                    If Not (dt Is Nothing) Then
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & row("CODIGO_ANTIGUO").ToString & """,")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""UNIDAD"" :" & """" & row("UNIDAD").ToString & """,")
                            resb.Append("""DESC_ADM"" :" & """" & row("DESC_ADM").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", "")
                    End If
                    resb.Append("]")
                    resb.Replace("[{}]", "[]")
                    res = resb.ToString()
                Case "LISTAR_SUBGRUPOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NC.NCGrupos("BN").lista_grupos_subgrupo_x_ctlg(CTLG_CODE)
                    Dim GRUP_CODE As String = New Nomade.NC.NCParametros("BN").ListarParametros("MAEQ", "").Rows(0)("VALOR").ToString
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            If row("TIPO").ToString = "SUBGRUPO" And row("CODIGO_GRUPO").ToString = GRUP_CODE Then
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & row("CODE").ToString & """,")
                                resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """")
                                resb.Append("},")
                            End If
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LISTAR_INSUMOS_FORMULACION"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.MP.MPFormulacionProductos("BN").ListarInsumosFormulacion(CODIGO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("PROD_CODE").ToString & """,")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & MiDataRow("PROD_CODE_ANTIGUO").ToString & """,")
                            resb.Append("""INSUMO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                            resb.Append("""NOMBRE_COMERCIAL"" :" & """" & MiDataRow("NOMBRE_COMERCIAL").ToString & """,")
                            resb.Append("""UNID_CODE"" :" & """" & MiDataRow("UNID_CODE").ToString & """,")
                            resb.Append("""UNIDAD_MEDIDA"" :" & """" & MiDataRow("UNIDAD").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & "" & MiDataRow("CANTIDAD").ToString & ",")
                            resb.Append("""MERMA"" :" & """" & MiDataRow("MERMA").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "AGREGAR_INSUMO"
                    context.Response.ContentType = "text/plain"
                    PROD_CODE = context.Request("PROD_CODE")
                    UNID_CODE = context.Request("UNID_CODE")
                    CANTIDAD = context.Request("CANTIDAD")
                    MERMAS = context.Request("MERMAS")
                    res = New Nomade.MP.MPFormulacionProductos("BN").AgregarInsumo(CODIGO, PROD_CODE, CANTIDAD, MERMAS, UNID_CODE)
                Case "ELIMINAR_INSUMO"
                    context.Response.ContentType = "text/plain"
                    PROD_CODE = context.Request("PROD_CODE")
                    res = New Nomade.MP.MPFormulacionProductos("BN").EliminarInsumo(CODIGO, PROD_CODE)
                Case "LISTAR_DERIVADOS_FORMULACION"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.MP.MPFormulacionProductos("BN").ListarDerivadosFormulacion(CODIGO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("PROD_CODE").ToString & """,")
                            resb.Append("""CODIGO_ANTIGUO"" :" & """" & row("PROD_CODE_ANTIGUO").ToString & """,")
                            resb.Append("""DERIVADO"" :" & """" & row("PRODUCTO").ToString & """,")
                            resb.Append("""UNID_CODE"" :" & """" & row("UNID_CODE").ToString & """,")
                            resb.Append("""UNIDAD_MEDIDA"" :" & """" & row("UNIDAD").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & row("CANTIDAD").ToString & """,")
                            resb.Append("""PORCENTAJE_COSTO"" :" & """" & (Double.Parse(row("PORCENTAJE_COSTO").ToString) * 100) & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "AGREGAR_DERIVADO"
                    context.Response.ContentType = "text/plain"
                    PROD_CODE = context.Request("PROD_CODE")
                    UNID_CODE = context.Request("UNID_CODE")
                    CANTIDAD = context.Request("CANTIDAD")
                    MERMAS = context.Request("MERMAS")
                    Dim PORCENTAJE_COSTO = context.Request("PORCENTAJE_COSTO")
                    res = New Nomade.MP.MPFormulacionProductos("BN").AgregarDerivado(CODIGO, PROD_CODE, CANTIDAD, UNID_CODE, PORCENTAJE_COSTO)
                Case "ELIMINAR_DERIVADO"
                    context.Response.ContentType = "text/plain"
                    PROD_CODE = context.Request("PROD_CODE")
                    res = New Nomade.MP.MPFormulacionProductos("BN").EliminarDerivado(CODIGO, PROD_CODE)
                Case "LISTAR_MAQUINARIAS_FORMULACION"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.MP.MPFormulacionProductos("BN").ListarMaquinariasFormulacion(CODIGO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("GRUP_CODE").ToString & """,")
                            resb.Append("""MAQUINARIA"" :" & """" & row("GRUPO").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & row("CANTIDAD").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "AGREGAR_MAQUINARIA"
                    context.Response.ContentType = "text/plain"
                    GRUP_CODE = context.Request("GRUP_CODE")
                    CANTIDAD = context.Request("CANTIDAD")
                    res = New Nomade.MP.MPFormulacionProductos("BN").AgregarMaquinaria(CODIGO, GRUP_CODE, CANTIDAD)
                Case "ELIMINAR_MAQUINARIA"
                    context.Response.ContentType = "text/plain"
                    GRUP_CODE = context.Request("GRUP_CODE")
                    res = New Nomade.MP.MPFormulacionProductos("BN").EliminarMaquinaria(CODIGO, GRUP_CODE)
                Case "AE"
                    context.Response.ContentType = "text/plain"
                    res = New Nomade.MP.MPFormulacionProductos("BN").CambiarEstadoFormulacion(CODIGO, USUA_ID)
                Case "G"
                    context.Response.ContentType = "text/plain"
                    ALMC_CODE = context.Request("ALMC_CODE")
                    PROD_CODE = context.Request("PROD_CODE")
                    PROC_CODE = context.Request("PROC_CODE")
                    HORAS = context.Request("HORAS")
                    TIEMPO = context.Request("TIEMPO")
                    CANTIDAD = context.Request("CANTIDAD")
                    UNID_CODE = context.Request("UNID_CODE")
                    
                    INSUMOS = context.Request("INSUMOS")
                    UNIDADES = context.Request("UNIDADES")
                    CANTIDADES = context.Request("CANTIDADES")
                    MERMAS = context.Request("MERMAS")
                    
                    MAQUINARIAS = context.Request("MAQUINARIAS")
                    CANTIDADES_M = context.Request("CANTIDADES_M")
                    
                    DERIVADOS = context.Request("DERIVADOS")
                    UNIDADES_D = context.Request("UNIDADES_D")
                    CANTIDADES_D = context.Request("CANTIDADES_D")
                    Dim PORCENTAJES_D = context.Request("PORCENTAJES_COSTO_D")
                    res = New Nomade.MP.MPFormulacionProductos("BN").CrearFormulacion(
                        CTLG_CODE, ALMC_CODE, PROD_CODE, PROC_CODE, HORAS, TIEMPO, CANTIDAD, UNID_CODE, USUA_ID,
                        IIf(INSUMOS = ",", Nothing, INSUMOS), IIf(UNIDADES = ",", Nothing, UNIDADES), IIf(CANTIDADES = ",", Nothing, CANTIDADES), IIf(MERMAS = ",", Nothing, MERMAS),
                        IIf(MAQUINARIAS = ",", Nothing, MAQUINARIAS), IIf(CANTIDADES_M = ",", Nothing, CANTIDADES_M),
                        IIf(DERIVADOS = ",", Nothing, DERIVADOS), IIf(UNIDADES_D = ",", Nothing, UNIDADES_D), IIf(CANTIDADES_D = ",", Nothing, CANTIDADES_D), IIf(PORCENTAJES_D = ",", Nothing, PORCENTAJES_D))
                Case "A"
                    context.Response.ContentType = "text/plain"
                    ALMC_CODE = context.Request("ALMC_CODE")
                    PROD_CODE = context.Request("PROD_CODE")
                    PROC_CODE = context.Request("PROC_CODE")
                    HORAS = context.Request("HORAS")
                    TIEMPO = context.Request("TIEMPO")
                    CANTIDAD = context.Request("CANTIDAD")
                    UNID_CODE = context.Request("UNID_CODE")
                    Dim ESTADO = context.Request("ESTADO")
                    res = New Nomade.MP.MPFormulacionProductos("BN").ActualizarFormulacion(CODIGO, ALMC_CODE, PROD_CODE, PROC_CODE, HORAS, TIEMPO, CANTIDAD, UNID_CODE, ESTADO, USUA_ID)
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub
    
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
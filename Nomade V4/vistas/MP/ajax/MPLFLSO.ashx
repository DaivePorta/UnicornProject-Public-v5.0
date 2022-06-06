<%@ WebHandler Language="VB" Class="MPLFLSO" %>

Imports System
Imports System.Web
Imports System.Data

Public Class MPLFLSO : Implements IHttpHandler

    Dim OPCION As String
    Dim dt As DataTable

    Dim CODIGO, CTLG_CODE, SCSL_CODE, USUA_ID As String
    Dim PROD_CODE, CANTIDAD, UNID_CODE, INSUMOS, UNIDADES, CANTIDADES, MERMAS As String
    Dim P_CODE, P_CODEFABR, P_CODE_DETALLE_FLUJO, P_CODE_PROD, P_FECHAINI, P_FECHAFIN, P_CODE_DETALLE, P_TIPO As String


    Dim resb As New StringBuilder()
    Dim res As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

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
        Try
            Select Case OPCION

                Case "1"
                    'context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.MP.MPOrdenFabricacion("BN").BUSCAR_FLUJO_SOLICITUD(P_CODE, P_CODE_PROD, Utilities.fechaLocal(P_FECHAINI), Utilities.fechaLocal(P_FECHAFIN), P_TIPO)

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE_SOLIC"" :" & """" & MiDataRow("CODE_SOLIC").ToString & """,")
                            resb.Append("""SOLICITANTE"" :" & """" & MiDataRow("SOLICITANTE").ToString & """,")

                            If MiDataRow("ESTADO").ToString = "0" Then
                                resb.Append("""ESTADO"" :" & """ANULADO"",")
                            End If

                            If MiDataRow("ESTADO").ToString = "1" Then
                                resb.Append("""ESTADO"" :" & """SOLICITADO"",")
                            End If

                            If MiDataRow("ESTADO").ToString = "2" Then
                                resb.Append("""ESTADO"" :" & """APROBADO"",")
                            End If

                            If MiDataRow("ESTADO").ToString = "3" Then
                                resb.Append("""ESTADO"" :" & """PROGRAMADO"",")
                            End If

                            If MiDataRow("ESTADO").ToString = "4" Then
                                resb.Append("""ESTADO"" :" & """EJECUCION"",")
                            End If


                            If MiDataRow("ESTADO").ToString = "5" Then
                                resb.Append("""ESTADO"" :" & """TERMINADO"",")
                            End If

                            resb.Append("""ITEM"" :" & """" & MiDataRow("ITEM").ToString & """,")
                            resb.Append("""GLOSA"" :" & """" & MiDataRow("GLOSA").ToString & """,")
                            resb.Append("""CANTIDAD_APROBADA"" :" & """" & MiDataRow("CANTIDAD_APROBADA").ToString & """,")
                            resb.Append("""UNIDAM"" :" & """" & MiDataRow("UNIDAM").ToString & """,")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""DESCP"" :" & """" & MiDataRow("DESCP").ToString & """,")
                            resb.Append("""FECHA"" :" & """" & MiDataRow("FECHA").ToString & """")

                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "2"
                    dt = New Nomade.MP.MPOrdenFabricacion("BN").BUSCAR_DETALLE_FLUJO_SOLICITUD(P_CODE_DETALLE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE_ORFL"" :" & """" & MiDataRow("CODE_ORFL").ToString & """,")
                            resb.Append("""CODE_SOLIC"" :" & """" & MiDataRow("CODE_SOLIC").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                            resb.Append("""FASE"" :" & """" & MiDataRow("FASE").ToString & """,")
                            resb.Append("""ITEM"" :" & """" & MiDataRow("ITEM").ToString & """,")

                            resb.Append("""FECHAINI"" :" & """" & MiDataRow("FECHAINI").ToString & """,")
                            resb.Append("""FECHAFIN"" :" & """" & MiDataRow("FECHAFIN").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & MiDataRow("CANTIDAD").ToString & """")

                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "3"
                    dt = New Nomade.MP.MPOrdenFabricacion("BN").listarDetalleOrdenfabri(P_CODEFABR, P_CODE_DETALLE_FLUJO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CODE_OFAB"" :" & """" & MiDataRow("CODE_OFAB").ToString & """,")
                            resb.Append("""CODE_FLUJO"" :" & """" & MiDataRow("CODE_FLUJO").ToString & """,")
                            resb.Append("""CODE_PRODUCTO"" :" & """" & MiDataRow("CODE_PRODUCTO").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & MiDataRow("CANTIDAD").ToString & """")

                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "4"
                    Dim dtx As DataTable
                    dtx = New Nomade.MP.MPOrdenFabricacion("BN").listarDetalleOrdenfabri(P_CODEFABR, P_CODE_DETALLE_FLUJO)

                    dt = New Nomade.MP.MPOrdenFabricacion("BN").ListarOrdenFabricacion("", "", "", "0", "0", "A", dtx.Rows(0)("CODE_OFAB").ToString())
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""NRO_ORDEN"" :" & """" & MiDataRow("NRO_ORDEN").ToString & """,")
                            resb.Append("""RESPONSABLE"" :" & """" & MiDataRow("RESPONSABLE").ToString & """,")
                            resb.Append("""TIPO_FABRICACION"" :" & """" & MiDataRow("TIPO_FABRICACION").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & MiDataRow("PRODUCTO").ToString & """,")
                            resb.Append("""CANTIDAD_TOTAL"" :" & """" & MiDataRow("CANTIDAD_TOTAL").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""UNIDAD_MEDIDA"" :" & """" & MiDataRow("UNIDAD_MEDIDA").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "5"

                    Dim dtx As DataTable
                    dtx = New Nomade.MP.MPOrdenFabricacion("BN").listarDetalleOrdenfabri(P_CODEFABR, P_CODE_DETALLE_FLUJO)
                    dt = New Nomade.MP.MPOrdenFabricacion("BN").LISTAR_LOTE_FABRICACION(dtx.Rows(0)("CODE_OFAB").ToString())

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CODE_FABRI"" :" & """" & MiDataRow("CODE_FABRI").ToString & """,")
                            resb.Append("""SECCION"" :" & """" & MiDataRow("SECCION").ToString & """,")
                            resb.Append("""FECHA_INI"" :" & """" & MiDataRow("FECHA_INI").ToString & """,")
                            resb.Append("""FECHA_FIN"" :" & """" & MiDataRow("FECHA_FIN").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & MiDataRow("CANTIDAD").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "6"
                    dt = New Nomade.MP.MPOrdenFabricacion("BN").ListarOrdenFabricacion("", CTLG_CODE, SCSL_CODE, "0", "0", "A", P_CODEFABR)
                    resb.Append("[")
                    If Not (dt Is Nothing) Then
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
                            resb.Append("""NRO_ORDEN"" :" & """" & row("NRO_ORDEN").ToString & """,")
                            resb.Append("""RESPONSABLE"" :" & """" & row("RESPONSABLE").ToString & """,")
                            resb.Append("""TIPO_FABRICACION"" :" & """" & row("TIPO_FABRICACION").ToString & """,")
                            resb.Append("""PRODUCTO"" :" & """" & row("PRODUCTO").ToString & """,")
                            resb.Append("""CANTIDAD_TOTAL"" :" & """" & row("CANTIDAD_TOTAL").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & row("ESTADO").ToString & """,")
                            resb.Append("""FECHA_REGISTRO"" :" & """" & row("FECHA_REGISTRO").ToString & """,")
                            resb.Append("""CORE_IND"" :" & """" & row("CORE_IND").ToString & """,")
                            resb.Append("""UNIDAD_MEDIDA"" :" & """" & row("UNIDAD_MEDIDA").ToString & """,")
                            resb.Append("""CONFIG_IND"" :" & """" & row("CONFIG_IND").ToString & """,")
                            resb.Append("""ANULADO_IND"" :" & """" & row("ANULADO_IND").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb.Replace(",{}", String.Empty)
                    End If
                    resb.Append("]")
                    resb.Replace("[{}]", "[]")
                    res = resb.ToString()
                Case "7"
                    dt = New Nomade.MP.MPOrdenFabricacion("BN").LISTAR_LOTE_FABRICACION(P_CODEFABR)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CODE_FABRI"" :" & """" & MiDataRow("CODE_FABRI").ToString & """,")
                            resb.Append("""SECCION"" :" & """" & MiDataRow("SECCION").ToString & """,")
                            resb.Append("""FECHA_INI"" :" & """" & MiDataRow("FECHA_INI").ToString & """,")
                            resb.Append("""FECHA_FIN"" :" & """" & MiDataRow("FECHA_FIN").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & MiDataRow("CANTIDAD").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "8"
                    dt = New Nomade.MP.MPOrdenFabricacion("BN").listarDetalleOrdenfabri(P_CODEFABR, P_CODE_DETALLE_FLUJO)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                            resb.Append("""CODE_OFA"" :" & """" & MiDataRow("CODE_OFAB").ToString & """,")
                            resb.Append("""CODE_FLUJO"" :" & """" & MiDataRow("CODE_FLUJO").ToString & """,")
                            resb.Append("""CANTIDAD"" :" & """" & MiDataRow("CANTIDAD").ToString & """")

                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "9"
                    Dim c As New Nomade.CO.CORegistroCompras("Bn")
                    dt = c.LISTAR_CABECERA_SOLIC_PRODUCCIOM("", "", "")
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                            resb.Append("""CATALOGO"":""" & row("EMPRESA").ToString & """,")
                            resb.Append("""ESTABLECIMIENTO"":""" & row("ESTABLEC").ToString & """,")
                            resb.Append("""PRIORIDAD"":""" & row("PRIORIDAD").ToString & """,")
                            resb.Append("""TIPOREQUE"":""" & row("TIPORQUE").ToString & """,")
                            resb.Append("""IND_CLIENTE"":""" & row("IND_CLIENTE").ToString & """,")
                            resb.Append("""CLIENTE"":""" & row("CLIENTE").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("+")
                        resb.Replace(",+", "")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "ANULAR_ORDEN_FAB"
                    res = "OK"
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
<%@ WebHandler Language="VB" Class="NALMERC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NALMERC : Implements IHttpHandler

    Dim code As String
    Dim opcion As String
    Dim p_ALMACEN, p_GRUP_CODE, p_SCSL_CODE, p_UNME_DET, p_TIPO, p_mone_code As String

    Dim CODIGO, EMPRESA, ALMACEN, DESCRIPCION,
   TIPO_ALMACEN,
   TIPO_ALMACENAJE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS As String

    Dim p_CTLG_CODE, p_ctlg As String

    Dim total As Decimal
    Dim dt As DataTable
    Dim dtp As DataTable
    Dim p As New Nomade.NA.NASeccionesAlmacen("bn")
    Dim gPro As New Nomade.NM.NMGestionProductos("BN")
    Dim res As String
    Dim resb As New StringBuilder

    Dim codempr As String
    Dim usua As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest


        opcion = context.Request("OPCION")

        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_ALMACEN = context.Request("p_almacen")
        p_ctlg = context.Request("p_ctlg")
        p_GRUP_CODE = context.Request("p_grupo")

        code = context.Request("code")
        p_mone_code = context.Request("p_mone_code")
        p_UNME_DET = context.Request("p_UNME_DET")
        p_TIPO = context.Request("p_TIPO")

        CODIGO = context.Request("CODIGO")
        EMPRESA = context.Request("EMPRESA")
        ALMACEN = context.Request("ALMACEN")
        DESCRIPCION = context.Request("DESCRIPCION")
        TIPO_ALMACEN = context.Request("TIPO_ALMACEN")

        TIPO_ALMACENAJE = context.Request("TIPO_ALMACENAJE")
        total = 0

        ESTADO = context.Request("ESTADO")

        USUARIO = context.Request("USUARIO")

        SISTEMA_ALMACENAJE = context.Request("SISTEMA_ALMACENAJE")

        PALETIZADO_IND = context.Request("PALETIZADO_IND")

        NRO_PALETS = context.Request("NRO_PALETS")
        If (NRO_PALETS = String.Empty) Then
            NRO_PALETS = "0"
        End If

        codempr = context.Request("codempr")
        usua = context.Request("usua")

        Try

            Select Case opcion

                Case "1"
                    'res = p.CrearSeccionAlmacen(CODIGO, EMPRESA, ALMACEN, DESCRIPCION, TIPO_ALMACEN, TIPO_ALMACENAJE, ESTADO, USUARIO, SISTEMA_ALMACENAJE, PALETIZADO_IND, NRO_PALETS)
                    Dim p As New Nomade.NA.NAConfAlmacenes("BN")


                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarAlmacenes(String.Empty, codempr, String.Empty, "A")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")

                    Else
                        Dim msg = "Error"
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""MENSAJE"" :" & """" & msg.ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "3"
                    Dim g As New Nomade.NC.NCGrupos("Bn")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = g.ListarGrupos_X_CTLG(String.Empty, codempr, String.Empty)

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")

                    Else
                        Dim msg = "Error"
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""MENSAJE"" :" & """" & msg.ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If


                    res = resb.ToString()

                Case "4" ' STOCK DE PRODUCTOS POR UNIDADES DE DETALLE X MEJORAR
                    dtp = gPro.busca_producto(p_ALMACEN, p_GRUP_CODE, p_ctlg, p_UNME_DET)
                    If Not dtp Is Nothing Then
                        res = Utilities.Datatable2Json(dtp)
                    Else
                        res = "[]"
                    End If

                Case "5" 'TABLA VALORIZADO DE PRODUCTOS
                    dtp = gPro.listar_stockProductos(p_ALMACEN, p_GRUP_CODE, p_mone_code, p_ctlg)
                    If Not dtp Is Nothing Then
                        res = Utilities.Datatable2Json(dtp)
                    Else
                        res = "[]"
                    End If
                Case "5.5" 'TABLA DE PRODUCTOS STOCK POR CANTIDAD 
                    dtp = gPro.listar_stockProductosCantidad(p_ALMACEN, p_GRUP_CODE, p_mone_code, p_ctlg)
                    If Not dtp Is Nothing Then
                        res = Utilities.Datatable2Json(dtp)
                    Else
                        res = "[]"
                    End If
                Case "6" 'TABLA VALORIZADO DE PRODUCTOS
                    dtp = gPro.listar_stockProductos_peso(p_ALMACEN, p_GRUP_CODE, p_mone_code, p_ctlg)
                    If Not dtp Is Nothing Then
                        res = Utilities.Datatable2Json(dtp)
                    Else
                        res = "[]"
                    End If

            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try
    End Sub

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then

            res += "["
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "{label:" & dt.Rows(i)(chtml).ToString() & ",title" & dt.Rows(i)(chtml).ToString() & "value" & dt.Rows(i)(cvalue).ToString() & "},"
            Next
            res += "]"
            res = res.Replace(",]", "]")

        Else
            res = "error"
        End If
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class
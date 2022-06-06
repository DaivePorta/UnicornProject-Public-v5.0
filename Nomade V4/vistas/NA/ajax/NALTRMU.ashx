<%@ WebHandler Language="VB" Class="NALTRMU" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NALTRMU : Implements IHttpHandler

    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim dtAlmacenes As DataTable
    Dim dtProductoTransferencia As DataTable
    Dim res As String

    Dim p_code, p_ctlg_code, p_almacen_code, p_grupo_code, p_subgrupo_code, p_fecha, p_documento_code As String

    Dim opcion As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        Try
            context.Response.ContentType = "text/plain"
            opcion = context.Request("OPCION")
            p_code = context.Request("CODE")
            p_ctlg_code = context.Request("CTLG_CODE")
            p_almacen_code = context.Request("ALMACEN_CODE")
            p_grupo_code = context.Request("GRUPO_CODE")
            p_subgrupo_code = context.Request("SUBGRUPO_CODE")
            p_fecha = context.Request("FECHA")
            p_documento_code = context.Request("DCTO_CODE")

            If p_code Is Nothing Then
                p_code = ""
            End If

            If p_ctlg_code Is Nothing Then
                p_ctlg_code = ""
            End If

            If p_almacen_code Is Nothing Then
                p_almacen_code = ""
            End If

            Select Case opcion
                Case "LDOCRE"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NA.NATransferenciaAlmacen("Bn").ListarDocumentosRegistro(p_code, p_ctlg_code, p_almacen_code)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"":""" & row("CODIGO_SUNAT").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""DESCRIPCION_CORTA"":""" & row("DESCRIPCION_CORTA").ToString & """,")
                            resb.Append("""INTERNO_IND"":""" & row("INTERNO_IND").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                        res = resb.ToString()
                    End If

                Case "LSERIE"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NA.NATransferenciaAlmacen("Bn").ListarSeriesDocumentos(p_code, p_ctlg_code, p_almacen_code)
                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""NRO_LINEAS"":""" & row("NRO_LINEAS").ToString & """,")
                            resb.Append("""NRO_SERIE"":""" & row("NRO_SERIE").ToString & """,")
                            resb.Append("""TIPO_DOC"":""" & row("TIPO_DOC").ToString & """,")
                            resb.Append("""FORMATO"":""" & row("FORMATO").ToString & """,")
                            resb.Append("""VALOR_ACTUAL"":""" & row("VALOR_ACTUAL").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                        res = resb.ToString()
                    End If

                Case "LSTOCK"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = New Nomade.NA.NATransferenciaAlmacen("Bn").ListarStockAlmacen(p_almacen_code, p_grupo_code, p_ctlg_code)
                    If Not dt Is Nothing Then
                        dtAlmacenes = New Nomade.NA.NATransferenciaAlmacen("Bn").ListarAlmacenesRestantes(p_almacen_code, p_ctlg_code)
                        If Not dtAlmacenes Is Nothing Then
                            res = GenerarTablaTranferenciaAlmacen(dt, dtAlmacenes, p_almacen_code, p_grupo_code, p_ctlg_code)
                        Else
                            res = "[Advertencia]: La empresa sólo tiene un almacén de origen. No tiene almacenes de salida."
                        End If
                    Else
                        res = "[Error]: Los productos no se listaron correctamente."
                    End If

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("Error " & ex.ToString)
        End Try


    End Sub


    Public Function GenerarTablaTranferenciaAlmacen(ByVal dt As DataTable, ByVal dtAlmacenes As DataTable, ByVal p_almacen_code As String, ByVal p_grupo_code As String, ByVal p_ctlg_code As String) As String


        Dim dtGeneral As New DataTable ' Almacena las cantidades disponibles de los almacenes de destino
        dtGeneral.Columns.Add("codigo")
        dtGeneral.Columns.Add("codigo_almacen")
        dtGeneral.Columns.Add("cantidad")
        dtGeneral.Columns.Add("cantidad_disponible")

        res = ""
        resb.Clear()

        resb.AppendFormat("<table id = 'tblTransferencia' Class='display DTTT_selectable' border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<th Class='center' rowspan='2'>CODIGO</th>")
        resb.AppendFormat("<th Class='center' rowspan='2' id='nomProd'>DESCRIPCION</th>")
        resb.AppendFormat("<th Class='center' rowspan='2'>UNIDAD <br /> MEDIDA</th>")
        resb.AppendFormat("<th Class='center' rowspan='2'>DISPONIBLE</th>")

        For i As Integer = 0 To dtAlmacenes.Rows.Count - 1
            resb.AppendFormat("<th Class='center' colspan='2'>{0}</th>", dtAlmacenes.Rows(i)("NOMBRE_ALMACEN").ToString())
            If i = (dtAlmacenes.Rows.Count - 1) Then
                resb.AppendFormat("</tr>")
            End If
        Next

        resb.AppendFormat("<tr>")
        For i As Integer = 0 To dtAlmacenes.Rows.Count - 1
            resb.AppendFormat("<th Class='center'>Stock</th>")
            resb.AppendFormat("<th Class='center'>Enviar</th>")
            If i = (dtAlmacenes.Rows.Count - 1) Then
                resb.AppendFormat("</tr>")
            End If
        Next

        resb.AppendFormat("</thead>")

        resb.AppendFormat("<tbody>")
        For i As Integer = 0 To dt.Rows.Count - 1
            resb.AppendFormat("<tr id='f_{0}'>", dt.Rows(i)("CODIGO").ToString())
            resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CODIGO_ANTIGUO").ToString())
            resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("PRODUCTO").ToString())
            resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("UM").ToString())
            resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CANTIDAD_DISPONIBLE").ToString())
            For j As Integer = 0 To dtAlmacenes.Rows.Count - 1
                dtProductoTransferencia = New Nomade.NA.NATransferenciaAlmacen("Bn").ListarStockAlmacenTransferencia(dt.Rows(i)("CODIGO").ToString(), dtAlmacenes.Rows(j)("CODIGO").ToString(), p_grupo_code, p_ctlg_code)
                If dtProductoTransferencia Is Nothing Then
                    resb.AppendFormat("<td align='center'>")
                    resb.AppendFormat("<input type='text' class='util' id='s_{0}_{1}' value='{2}' disabled='disabled' >", dt.Rows(i)("CODIGO").ToString(), dtAlmacenes.Rows(j)("CODIGO").ToString(), "0.00")
                    resb.AppendFormat("</td>")
                    resb.AppendFormat("<td align='center'>")
                    resb.AppendFormat("<input type='text' class='util' id='e_{0}_{1}' onkeypress='javascript: return ValidaDecimales(event, this)' >", dt.Rows(i)("CODIGO").ToString(), dtAlmacenes.Rows(j)("CODIGO").ToString())
                    resb.AppendFormat("</td>")
                Else
                    resb.AppendFormat("<td align='center'>")
                    resb.AppendFormat("<input type='text' class='util' id='s_{0}_{1}' value='{2}' disabled='disabled' >", dtProductoTransferencia.Rows(0)("CODIGO").ToString(), dtProductoTransferencia.Rows(0)("CODIGO_ALMACEN").ToString(), dtProductoTransferencia.Rows(0)("CANTIDAD_DISPONIBLE").ToString())
                    resb.AppendFormat("</td>")
                    resb.AppendFormat("<td align='center'>")
                    resb.AppendFormat("<input type='text' class='util' id='e_{0}_{1}' onkeypress='javascript: return ValidaDecimales(event, this)' >", dtProductoTransferencia.Rows(0)("CODIGO").ToString(), dtProductoTransferencia.Rows(0)("CODIGO_ALMACEN").ToString())
                    resb.AppendFormat("</td>")
                End If

            Next
            resb.AppendFormat("</tr>")
        Next

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")


        'For i As Integer = 0 To dtAlmacenes.Rows.Count - 1
        '    dtProductoTransferencia = New Nomade.NA.NATransferenciaAlmacen("Bn").ListarStockAlmacenTransferencia(p_almacen_code, dtAlmacenes.Rows(i)("CODIGO").ToString(), p_grupo_code, p_ctlg_code)
        '    For j As Integer = 0 To dtProductoTransferencia.Rows.Count - 1
        '        Dim itemRow As DataRow = dtGeneral.NewRow()
        '        itemRow("codigo") = dtProductoTransferencia.Rows(j)("CODIGO").ToString()
        '        itemRow("codigo_almacen") = dtProductoTransferencia.Rows(j)("CODIGO_ALMACEN").ToString()
        '        itemRow("cantidad") = dtProductoTransferencia.Rows(j)("CANTIDAD").ToString()
        '        itemRow("cantidad_disponible") = dtProductoTransferencia.Rows(j)("CANTIDAD_DISPONIBLE").ToString()
        '        dtGeneral.Rows.Add(itemRow)
        '    Next
        'Next


        res = resb.ToString()
        'Return res
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
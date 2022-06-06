<%@ WebHandler Language="VB" Class="NVLCPCL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLCPCL : Implements IHttpHandler

    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim dtListaClientes As DataTable 'agregado
    Dim dtProductos As DataTable
    Dim dtListaPrecios As DataTable
    Dim res As String

    'Dim p_code, p_ctlg_code, p_almacen_code, p_lista_code, p_fecha, p_documento_code As String
    Dim p_code, p_ctlg_code, p_almacen_code, p_grupo_code, p_subgrupo_code, p_fecha, p_documento_code, p_lista_code As String

    Dim opcion As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        Try
            context.Response.ContentType = "text/plain"
            opcion = context.Request("OPCION")
            p_code = context.Request("CODE")
            p_ctlg_code = context.Request("CTLG_CODE")
            p_almacen_code = context.Request("ALMACEN_CODE")
            p_grupo_code = context.Request("GRUPO_CODE")
            p_lista_code = context.Request("LISTA_CODE")
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

            If p_lista_code Is Nothing Then
                p_lista_code = ""
            End If

            Select Case opcion

                Case "LISTACLIE"
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = New Nomade.NM.NMGestionPrecios("Bn").ListarPreciosListaCliente(p_almacen_code, p_grupo_code, p_ctlg_code, p_lista_code)
                    If Not dt Is Nothing Then
                        Dim arrayListaCliente() As String = Split(p_lista_code, ",")
                        If Not arrayListaCliente Is Nothing Then
                            res = GenerarTablaListaPreciosCliente(dt, arrayListaCliente, p_grupo_code, p_ctlg_code)
                        Else
                            res = "[Advertencia]: Debe seleccionar por lo menos una Lista"
                        End If
                    Else
                        res = ""
                    End If

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("Error " & ex.ToString)
        End Try


    End Sub


    Public Function GenerarTablaListaPreciosCliente(ByVal dt As DataTable, ByVal arrayListaCliente() As String, ByVal p_grupo_code As String, ByVal p_ctlg_code As String) As String

        Dim dtListaClientes As DataTable ' Almacena los datos de la lista de cliente

        res = ""
        resb.Clear()

        resb.AppendFormat("<table id = 'tblStock' Class='display DTTT_selectable' border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<tr>")
        resb.AppendFormat("<th class='center'>CODIGO</th>")
        resb.AppendFormat("<th class='center'>DESCRIPCION</th>")
        resb.AppendFormat("<th class='center'>NOMBRE <br /> ALMACÉN</th>")
        resb.AppendFormat("<th class='center'>GRUPO</th>")
        resb.AppendFormat("<th class='center'>SUB-GRUPO</th>")
        resb.AppendFormat("<th class='center'>MARCA</th>")
        resb.AppendFormat("<th class='center'>STOCK</th>")
        Dim columnas(dt.Columns.Count) As String

        Dim item As Integer = 0
        For Each column As DataColumn In dt.Columns
            columnas(item) = column.ColumnName
            item += 1
        Next

        For i As Integer = 8 To columnas.Length - 1
            If Not columnas(i) Is Nothing Then
                dtListaClientes = New Nomade.NM.NMGestionPrecios("Bn").ListarListaClientes(p_ctlg_code, columnas(i), "S")
                resb.AppendFormat("<th class='center'>{0}</th>", Replace(dtListaClientes(0)("NOMBRE").ToString(), "LISTA ", ""))
            End If
        Next

        resb.AppendFormat("</tr>")
        resb.AppendFormat("</thead>")

        resb.AppendFormat("<tbody>")
        For i As Integer = 0 To dt.Rows.Count - 1
            resb.AppendFormat("<tr id='f_{0}'>", dt.Rows(i)("CODIGO").ToString())
            resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CODIGO_ANTIGUO").ToString())
            resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("PRODUCTO").ToString())
            resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("NOMBRE_ALMACEN").ToString())
            resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("GRUPO").ToString())
            resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("SUBGRUPO").ToString())
            resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("MARCA").ToString())
            resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("STOCK_REAL").ToString())

            For j As Integer = 8 To columnas.Length - 1
                If Not columnas(j) Is Nothing Then
                    resb.AppendFormat("<td align='center' id='s_{0}_{1}'>{2}</td>", dt.Rows(i)("CODIGO").ToString(), columnas(j), dt.Rows(i)(columnas(j)).ToString())
                End If
            Next
            resb.AppendFormat("</tr>")
        Next

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")

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

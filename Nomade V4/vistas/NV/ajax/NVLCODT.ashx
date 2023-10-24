<%@ WebHandler Language="VB" Class="NVLCODT" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLCODT : Implements IHttpHandler

    Dim OPCION As String
    Dim USUARIO As String

    Dim p_CODE, CTLG_CODE, SCSL_CODE, ESTADO, DESDE, HASTA As String
    Dim p_FECHA, p_DOCUMENTO_NUEVO, p_AUTORIZACION, p_TIPO, p_COD_VENTA, p_MONTO_APLICADO As String
    Dim nvVenta As New Nomade.NV.NVVenta("Bn")

    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        ESTADO = context.Request("ESTADO")
        OPCION = context.Request("OPCION")
        DESDE = context.Request("DESDE")
        HASTA = context.Request("HASTA")

        p_FECHA = context.Request("p_FECHA")
        p_DOCUMENTO_NUEVO = context.Request("p_DOCUMENTO_NUEVO")
        p_AUTORIZACION = context.Request("p_AUTORIZACION")
        p_TIPO = context.Request("p_TIPO")
        p_COD_VENTA = context.Request("p_COD_VENTA")
        p_MONTO_APLICADO = context.Request("p_MONTO_APLICADO")
        p_CODE = context.Request("p_CODE") 'Codigo del mov. bancario

        Try
            Select Case OPCION
                Case "LDOCS" ' Obtiene Docunento
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarDocumentosCanjeablesAplicables(Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE, ESTADO)
                    res = GenerarTablaDocumento(dt)

                Case "MDOCS" ' Obtiene documentos que no estan asociados a un mov. bancario y son utilizables
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarTicketsSinMovimientoBancario(CTLG_CODE, SCSL_CODE, ESTADO)
                    res = generarDetalleDocumentos(dt)

                Case "DOCMOVBANC" ' Obtiene datos de los documentos asociados a un mov. bancario ya existente
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarTicketsConMovimientoBancario(p_CODE, CTLG_CODE, SCSL_CODE, ESTADO)
                    res = generarDetalleDocumentos(dt)

                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = nvVenta.AplicarCanjearDocumento(Utilities.fechaLocal(p_FECHA), p_DOCUMENTO_NUEVO, p_AUTORIZACION, p_TIPO, p_COD_VENTA, p_MONTO_APLICADO)
                    If Not (array Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""RPTA"" :" & """" & array(0) & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    Public Function GenerarTablaDocumento(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th style='max-width:52px;'>DOC. ID</th>")
        resb.AppendFormat("<th style='max-width:100px;'>CLIENTE</th>")
        resb.AppendFormat("<th style='max-width:60px;'>DOC. RECIBIDO</th>")
        resb.AppendFormat("<th style='max-width:300px;'>GLOSA</th>")
        resb.AppendFormat("<th style='max-width:90px;'>FECHA EMISIÓN</th>")
        resb.AppendFormat("<th style='max-width:60px;'>MONTO RECIBIDO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>ESTADO</th>")
        resb.AppendFormat("<th style='max-width:300px;'>CAJA/BANCO RECIBIDO</th>")
        resb.AppendFormat("<th style='max-width:100px;'>FECHA APLICÓ/CANJEÓ</th>")
        resb.AppendFormat("<th style='max-width:80px;'>APLICAR/<br/>CANJEAR</th>")
        resb.AppendFormat("<th style='max-width:100px;'>DCTO. NUEVO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CLIE_DOID_NRO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NRO_SERIE_DCTO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESCRIPCION").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("EMISION").ToString())
                resb.AppendFormat("<td align='left' >{0}{1}</td>", dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("MONTO_PAGADO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ESTADO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MEDIO_PAGO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_APLI_CANJ").ToString())
                If dt.Rows(i)("ESTADO").ToString() = "POR APLICAR/CANJEAR" Then
                    resb.AppendFormat("<td style='text-align:center;'>")
                    resb.AppendFormat("<a class='btn green' onclick=""aplicarCanjear('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}')""><i class='icon-refresh'></i></a>", dt.Rows(i)("CLIE_DOID_NRO").ToString(), dt.Rows(i)("DESCRIPCION").ToString(), dt.Rows(i)("RAZON_SOCIAL").ToString(), dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("MONTO_PAGADO").ToString(), dt.Rows(i)("NRO_SERIE_DCTO").ToString(), dt.Rows(i)("EMISION").ToString(), dt.Rows(i)("CODIGO_VENTA").ToString(), dt.Rows(i)("TIPO_DCTO").ToString())
                    resb.AppendFormat("</td>")
                Else
                    resb.AppendFormat("<td align='center' >{0}</td>", "-")
                End If
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DCTO_APLICADO_CANJEADO").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function GenerarTablaDocumentoImprimir(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id='tblDocumento' style='width: 100%;' align='center'  border='1'>")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th><strong>CÓDIGO</strong></th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>FECHA<br/>EMISIÓN</th>")
        resb.AppendFormat("<th>NRO. DOC.</th>")
        resb.AppendFormat("<th>CLIENTE</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>TOTAL</th>")
        resb.AppendFormat("<th>MODO<br/>PAGO</th>")
        resb.AppendFormat("<th>FORMA<br/>PAGO</th>")
        resb.AppendFormat("<th>VENDEDOR</th>")
        resb.AppendFormat("<th style='min-width:90px;max-width:110px;'>ESTADO</th>")
        resb.AppendFormat("<th>VIGENCIA</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CODE").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("EMISION").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("CLIE_DOID_NRO").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("MONEDA_DESC_CORTA").ToString())
                resb.AppendFormat("<td align='right'>{0}</td>", dt.Rows(i)("IMPORTE").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("MOPA_DESC").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("FOPA_DESC").ToString())
                'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NOMBRE_VENDEDOR").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("VENDEDOR_USUA_ID").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("ATENDIDO").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("ANULADO").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public Function generarDetalleDocumentos(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then
            resb.Append("[")
            For Each row As DataRow In dt.Rows
                resb.Append("{")
                resb.Append("""CODIGO_VENTA"" :" & """" & row("CODIGO_VENTA") & """,")
                resb.Append("""NRO_SERIE_DCTO"" :" & """" & row("NRO_SERIE_DCTO") & """,")
                resb.Append("""TICKET"" :" & """" & row("DCTO_APLICADO_CANJEADO") & """,")
                resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION") & """,")
                resb.Append("""ESTADO"" :" & """" & row("ESTADO") & """,")
                resb.Append("""RAZON_SOCIAL"" :" & """" & row("RAZON_SOCIAL") & """,")
                resb.Append("""MONTO_PAGADO"" :" & """" & row("SIMBOLO_MONEDA") & row("MONTO_PAGADO") & """,")
                resb.Append("""MONTO_APLICADO"" :" & """" & row("SIMBOLO_MONEDA") & row("MONTO_APLICADO") & """")
                resb.Append("},")
            Next
            resb.Append("-")
            resb.Replace("},-", "}")
            resb.Append("]")
            res = resb.ToString()
        Else
            res = ""
        End If
        Return res
    End Function

    Function ObtenerFecha(ByVal fecha As String) As String
        Dim dia = fecha.Split(" ")(0).Split("/")(0)
        Dim mes = fecha.Split(" ")(0).Split("/")(1)
        Dim anio = fecha.Split(" ")(0).Split("/")(2)
        Dim hora = ""
        Dim min = ""
        Dim seg = ""
        If fecha.Split(" ").Length = 3 Then
            hora = fecha.Split(" ")(1).Split(":")(0)
            min = fecha.Split(" ")(1).Split(":")(1)
            seg = fecha.Split(" ")(1).Split(":")(2)
            If fecha.Split(" ")(2).Contains("p") Then
                If Integer.Parse(hora) < 12 Then
                    hora = (Integer.Parse(hora) + 12).ToString
                End If
            End If
        End If
        fecha = anio + mes + dia + hora + min + seg
        Return fecha
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
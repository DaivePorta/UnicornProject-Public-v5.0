﻿<%@ WebHandler Language="VB" Class="CTLDEAS" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CTLDEAS : Implements IHttpHandler

    Dim OPCION As String
    Dim USUARIO As String

    Dim CTLG_CODE, SCSL_CODE, USUA_ID, DESC, COMP_VENT_IND,
    DCTO_CODE, NUM_DCTO, SERIE_DCTO, VENDEDOR, CLIENTE, PRODUCTO, ESTADO,
    DESDE, HASTA, CODE_VTA, NUM_DOC_COM As String
    Dim p_ESTADO_IND As String
    Dim ncTipoDCEmpresa As New Nomade.NC.NCTipoDCEmpresa("Bn")
    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
    Dim nmGestionProductos As New Nomade.NM.NMGestionProductos("Bn")


    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")

        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        DESDE = context.Request("DESDE")
        HASTA = context.Request("HASTA")

        Try
            Select Case OPCION
                Case "1" 'Obtiene Docunento
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarDetalleAsientos(CTLG_CODE, SCSL_CODE, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA))
                    res = GenerarTablaDocumento(dt)
                Case "3" ' Obtiene Docunento
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarDocVenta_Busq("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE)
                    res = GenerarTablaDocumento(dt)
                Case "4" 'Generar tabla para impresion de detalle 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = ReporteDocumento(CODE_VTA, NUM_DOC_COM, "", "")
                Case "5" 'Generar tabla para impresion de detalle 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarDocVenta_Busq("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE)
                    res = GenerarTablaDocumentoImprimir(dt)
                    'Case "6" 'DPORTA 13/03/2024
                    '    context.Response.ContentType = "text/html"

                    '    res = nvVenta.EjecutarAsientosPendientesVenta()
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
        resb.AppendFormat("<th style='max-width:52px;'>CÓDIGO</th>")
        resb.AppendFormat("<th style='max-width:70px;'>NRO_MOV</th>")
        resb.AppendFormat("<th style='max-width:70px;'>CORRELATIVO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>DOCUMENTO</th>")
        resb.AppendFormat("<th style='max-width:52px;'>FECHA<br/>EMISIÓN</th>")
        resb.AppendFormat("<th style='max-width:52px;'>DOC. ID.</th>")
        resb.AppendFormat("<th style='max-width:300px;'>PERSONA</th>")
        'resb.AppendFormat("<th style='max-width:60px;'>CENTRO DE<br/>COSTOS</th>")
        resb.AppendFormat("<th style='max-width:100px;'>CUENTA</th>")
        resb.AppendFormat("<th style='max-width:100px;'>DESCRIPCIÓN</th>")
        resb.AppendFormat("<th style='max-width:90px;'>DEBE_MN</th>")
        resb.AppendFormat("<th style='max-width:90px;'>HABER_MN</th>")
        resb.AppendFormat("<th style='max-width:90px;'>DEBE_ME</th>")
        resb.AppendFormat("<th style='max-width:90px;'>HABER_ME</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NRO_MOV").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ITEM").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DCTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("EMISION").ToString())
                'resb.AppendFormat("<td align='center' data-order='" + ObtenerFecha(dt.Rows(i)("EMISION").ToString) + "'>{0}<br/><small style='color:#6C7686;'>{1}</small></td>", dt.Rows(i)("EMISION").ToString(), dt.Rows(i)("FECHA_ACTV").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DOC_IDENT").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("PERSONA").ToString())
                'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CCOSTO_DET").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CTAS_ID").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CTAS").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DEBE_MN").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("HABER_MN").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DEBE_ME").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("HABER_ME").ToString())
                resb.AppendFormat("</td>")
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


    'Gerera el contenido para el reporte del detalle de un movimiento  de VENTA
    Public Function ReporteDocumento(ByVal codigoVenta As String, ByVal nroDocumento As String, ByVal fecha As String, ByVal cajero As String) As String
        resb.Clear()
        'Cargar detalle
        Dim ca As New Nomade.CA.NotaCredito("Bn")
        dt = ca.lista_detalle_dcto_venta(codigoVenta, "1", "")
        Dim detalles As New StringBuilder
        If Not (dt Is Nothing) Then
            If (dt.Rows.Count > 0) Then
                For Each row In dt.Rows
                    Dim dtProd As New DataTable
                    dtProd = nmGestionProductos.LISTAR_PRODUCTO(row("MERCADERIA").ToString(), "", "", "", "", "")
                    detalles.AppendFormat("<tr>")
                    detalles.AppendFormat("<td style='text-align:right;'>{0}</td>", row("CANTIDAD").ToString())
                    detalles.AppendFormat("<td style='text-align:left;'colspan='2'>{0}</td>", dtProd.Rows(0)("DESC_ADM").ToString())
                    detalles.AppendFormat("<td style='text-align:right;'>{0}</td>", If(row("TOTAL").ToString() = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(row("TOTAL").ToString()))))
                    detalles.AppendFormat("</tr>")
                Next
            End If
        End If
        'Fin Cargar detalle     

        Dim dtVenta As New DataTable
        dtVenta = ca.ListarDocumentosVenta(codigoVenta, "", "", "", "", "", "", "", "")
        Dim moneda As String = ""
        Dim cliente As String = ""
        Dim clienteDctoDesc As String = ""
        Dim clienteDctoNro As String = ""
        Dim subtotal As String = ""
        Dim valorIgv As String = ""
        Dim igv As String = ""
        Dim total As String = ""
        Dim caja As String = ""
        Dim documentoVenta As String = ""

        'Obtiene datos del documento de venta
        For Each row In dtVenta.Rows
            moneda = row("SIMBOLO_MONEDA").ToString()
            cliente = row("RAZON_SOCIAL").ToString()
            clienteDctoNro = row("CLIE_DCTO_DESC").ToString()
            clienteDctoDesc = row("CLIE_DCTO_DESC").ToString()
            subtotal = row("VALOR").ToString()
            valorIgv = row("IGV").ToString()
            total = row("IMPORTE").ToString()
            caja = row("DESC_CAJA").ToString()
            documentoVenta = row("DOCUMENTO").ToString()

            'igv = Convert.ToDecimal(row("PORC_IMPT").ToString())                     
        Next

        resb.AppendFormat("<table border='0' style='width:50%;' cellpadding='5px' align='center'>")
        resb.AppendFormat("<tr><td><strong>{0}</strong></td><td colspan='3'>{1}</td></tr>", documentoVenta, nroDocumento)
        resb.AppendFormat("<tr><td><strong>Caja:</strong></td><td>{0}</td><td><strong>Cajero:</strong></td><td>{1}</td></tr>", caja, cajero)
        resb.AppendFormat("<tr><td><strong>Fecha/Hora:</strong></td><td colspan='3'>{0}</td></tr>", fecha)
        resb.AppendFormat("<tr style='border-top:1px dashed black;'><td><strong>Cliente:</strong></td><td colspan='3'>{0}</td></tr>", cliente)
        resb.AppendFormat("<tr><td><strong>{0}:</strong></td><td colspan='3'>{1}</td></tr>", clienteDctoDesc, clienteDctoNro)
        resb.AppendFormat("<tr style='border-top:1px dashed black;'>")
        resb.AppendFormat("<td style='text-align:center;'><strong>Cantidad</strong></td>")
        resb.AppendFormat("<td style='text-align:center;'colspan='2'><strong>Descripción</strong></td>")
        resb.AppendFormat("<td style='text-align:center;'><strong>Importe</strong></td>")
        resb.AppendFormat("</tr>")
        resb.AppendFormat("{0}", detalles.ToString())
        resb.AppendFormat("<tr style='border-top:1px dashed black;'><td colspan='3'><strong>VENTA NETA</strong></td><td colspan='1' style='text-align:right;'>{0}</td></tr>", subtotal)
        resb.AppendFormat("<tr><td colspan='3'><strong>I.G.V.</strong></td><td colspan='1' style='text-align:right;'>{0}</td></tr>", valorIgv)
        resb.AppendFormat("<tr><td colspan='3'><strong>TOTAL {1}</strong></td><td colspan='1' style='text-align:right;'><strong>{0}</strong</td></tr>", total, moneda)
        resb.AppendFormat("</table> ")
        res = resb.ToString()
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
<%@ WebHandler Language="VB" Class="NALRSPH" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NALRSPH : Implements IHttpHandler

    Dim OPCION As String
    Dim USUARIO As String

    Dim CTLG_CODE, SCSL_CODE, USUA_ID, DESC, COMP_VENT_IND,
    DCTO_CODE, NUM_DCTO, SERIE_DCTO, VENDEDOR, CLIENTE, PRODUCTO, ESTADO,
    DESDE, HASTA, CODE_VTA, NUM_DOC_COM, ALMC_CODE, FECHA As String
    Dim p_ESTADO_IND As String
    Dim ncTipoDCEmpresa As New Nomade.NC.NCTipoDCEmpresa("Bn")
    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
    Dim nmGestionProductos As New Nomade.NM.NMGestionProductos("Bn")


    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        ALMC_CODE = context.Request("ALMC_CODE")
        FECHA = context.Request("FECHA")
        USUA_ID = context.Request("USUA_ID")
        DESC = context.Request("DESC")
        COMP_VENT_IND = context.Request("COMP_VENT_IND")
        DCTO_CODE = context.Request("DCTO_CODE")
        NUM_DCTO = context.Request("NUM_DCTO")
        SERIE_DCTO = context.Request("SERIE_DCTO")
        VENDEDOR = context.Request("VENDEDOR")
        CLIENTE = context.Request("CLIENTE")
        PRODUCTO = context.Request("PRODUCTO")
        ESTADO = context.Request("ESTADO")
        OPCION = context.Request("OPCION")
        DESDE = context.Request("DESDE")
        HASTA = context.Request("HASTA")
        CODE_VTA = context.Request("CODE_VTA")
        NUM_DOC_COM = context.Request("NUM_DOC_COM")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")

        Try
            Select Case OPCION
                Case "1" 'Lista tipo de Documento
                    context.Response.ContentType = "application/json; charset=utf-8"

                    dt = ncTipoDCEmpresa.ListarTipoDCEmpresa(String.Empty, CTLG_CODE, String.Empty, "A", String.Empty, String.Empty, COMP_VENT_IND)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DCTO_DESC_CORTA", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("DCTO_CODE").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("SUNAT_CODE").ToString & """,")
                            resb.Append("""DESCRIPCION_CORTA"" :" & """" & MiDataRow("DCTO_DESC_CORTA").ToString & """,")
                            resb.Append("""FECHA_ELEC"" :" & """" & Utilities.fechaLocal(MiDataRow("FECHA_ELEC").ToString) & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "2" ' LISTA VENDEDORES POR ROL
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nvVenta.ListarVendedorPorRol(CTLG_CODE, p_ESTADO_IND)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "ESTADO", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM_PERSONA").ToString & """,")
                            resb.Append("""USUARIO"" :" & """" & MiDataRow("USUARIO").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LDMOVKAR" ' Obtiene Docunento
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nmGestionProductos.ListarMovimientoKardexProductos(CTLG_CODE, ALMC_CODE, Utilities.fechaLocal(FECHA))
                    res = GenerarTablaDocumento(dt)

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
        resb.AppendFormat("<th style='max-width:70px;'>CÓDIGO</th>")
        'resb.AppendFormat("<th style='max-width:52px;'>NRO. MOV</th>")
        resb.AppendFormat("<th style='max-width:200px;'>DESCRIPCIÓN</th>")
        resb.AppendFormat("<th style='max-width:90px;'>GRUPO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>SUB-GRUPO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>MARCA</th>")
        resb.AppendFormat("<th style='max-width:52px;'>FECHA<br/>EMISIÓN</th>")
        resb.AppendFormat("<th style='max-width:90px;'>CANTIDAD</th>")
        resb.AppendFormat("<th style='max-width:300px;'>UNIDAD MEDIDA</th>")
        resb.AppendFormat("<th style='max-width:90px;'>COSTO<br/>UNITARIO</th>")
        'resb.AppendFormat("<th style='max-width:90px;'>COSTO<br/>UNITARIO ALTERNO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>VALORIZADO</th>")
        'resb.AppendFormat("<th style='max-width:90px;'>VALORIZADO ALTERNO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("COD_ANTIGUO_PROD").ToString())
                'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ITEM").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESC_PROD").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("GRUPO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SUB_GRUPO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MARCA").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FECHA_EMISION").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CANTIDAD_SALDO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("UNIDAD_MEDIDA").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PU_SALDO").ToString())
                'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PU_SALDO_ALT").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TOTAL_SALDO").ToString())
                'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TOTAL_SALDO_ALT").ToString())
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
<%@ WebHandler Language="VB" Class="NVLANUL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLANUL : Implements IHttpHandler

    Dim OPCION As String
    Dim USUARIO As String

    Dim CTLG_CODE, SCSL_CODE, USUA_ID, DESC, COMP_VENT_IND,
    DCTO_CODE, NUM_DCTO, SERIE_DCTO, VENDEDOR, CLIENTE, PRODUCTO, ESTADO,
    DESDE, HASTA, CODE_VTA, NUM_DOC_COM As String

    Dim dcto As New Nomade.NC.NCTipoDCEmpresa("Bn")
    Dim dvta As New Nomade.NV.NVVenta("Bn")
    Dim gesPro As New Nomade.NM.NMGestionProductos("Bn")


    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
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


        Try
            Select Case OPCION
                Case "1" 'Lista tipo de Documento
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dcto.ListarTipoDCEmpresa(String.Empty, CTLG_CODE, String.Empty, "A", String.Empty, String.Empty, COMP_VENT_IND)
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

                Case "2" ' Lista Vendedor
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = dvta.ListaVendedor(CTLG_CODE, String.Empty, String.Empty, String.Empty, String.Empty)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "NOMBRE", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""EMPRESA"" :" & """" & MiDataRow("EMPRESA").ToString & """,")
                            resb.Append("""NOMBRE_EMPRESA"" :" & """" & MiDataRow("NOMBRE_EMPRESA").ToString & """,")
                            resb.Append("""SUCURSAL"" :" & """" & MiDataRow("SUCURSAL").ToString & """,")
                            resb.Append("""USUARIO"" :" & """" & MiDataRow("USUARIO").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "3" ' Obtiene Documentos
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = dvta.ListarDocVenta_Busq("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE)
                    res = GenerarTablaDocumento(dt)

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            Dim sMensaje As String = ex.Message
            If (sMensaje.IndexOf("[Advertencia]") > -1) Then
                context.Response.Write(sMensaje)
            Else
                context.Response.Write("[Error]: " + sMensaje)
            End If
        End Try


    End Sub


    Public Function GenerarTablaDocumento(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        resb.AppendFormat("<table id=""tblDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        'resb.AppendFormat("<th>EMPRESA</th>")
        'resb.AppendFormat("<th>ESTABLECIMIENTO</th>")
        resb.AppendFormat("<th>CÓDIGO</th>")
        'resb.AppendFormat("<th>TIPO DOCUMENTO</th>")
        'resb.AppendFormat("<th>NRO. DOC.</th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>EMISIÓN</th>")
        resb.AppendFormat("<th>CLIENTE</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>IMPORTE</th>")
        resb.AppendFormat("<th>GLOSARIO</th>")
        resb.AppendFormat("<th>COMPLETO</th>")
        resb.AppendFormat("<th>PROVISIONADO</th>")
        resb.AppendFormat("<th>ANULADO</th>")
        resb.AppendFormat("<th>ATENDIDO</th>")
        resb.AppendFormat("<th>VENDEDOR</th>")
        resb.AppendFormat("<th>MOTIVO ANUL.</th>")
        resb.AppendFormat("<th></th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("ESTADO_DOC_ELECT").ToString() = "N" And dt.Rows(i)("ATENDIDO").ToString() <> "N.CRÉDITO APLICADA" Then
                    resb.AppendFormat("<tr>")
                    'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("EMPRESA_DESC_CORTA").ToString())
                    'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("SUCURSAL_DESC").ToString())
                    resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CODE").ToString())
                    'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("TIPO_DCTO_DESC").ToString())
                    'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NUM_DCTO").ToString())
                    resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                    resb.AppendFormat("<td align='left' data-order='" + ObtenerFecha(dt.Rows(i)("EMISION").ToString) + "'>{0} <small style='color:#6C7686;'>{1}</small></td>", dt.Rows(i)("EMISION").ToString(), dt.Rows(i)("FECHA_ACTV").ToString())
                    'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("EMISION").ToString())
                    resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONEDA_DESC_CORTA").ToString())
                    resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("IMPORTE").ToString())
                    resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("GLOSA").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("COMPLETO").ToString())
                    resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("PROVISIONADO").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ANULADO").ToString())
                    resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("ATENDIDO").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("USUA_ID_REG").ToString())
                    resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("MOTIVO_ANULAC").ToString())
                    resb.AppendFormat("<td class='vta'><button type='button' class='btn red vervta' title='Ver Documento de Venta'><i class='icon-search'></i></button></td>")
                    resb.AppendFormat("</tr>")
                End If
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
                    dtProd = gesPro.LISTAR_PRODUCTO(row("MERCADERIA").ToString(), "", "", "", "", "")
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
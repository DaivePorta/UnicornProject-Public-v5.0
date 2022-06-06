<%@ WebHandler Language="VB" Class="NVLOCCL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLOCCL : Implements IHttpHandler
    Dim OPCION As String
    Dim USUARIO As String
    
    Dim CTLG_CODE, SCSL_CODE, USUA_ID, DESC, COMP_VENT_IND,
    DCTO_CODE, NUM_DCTO, SERIE_DCTO, VENDEDOR, CLIENTE, PRODUCTO, ESTADO,
    DESDE, HASTA, CODE_VTA, NUM_DOC_COM As String
       
    Dim dcto As New Nomade.NC.NCTipoDCEmpresa("Bn")
    Dim NVOrdenCompra As New Nomade.NV.NVOrdenCompra("Bn")

    
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
                Case "3" ' Obtiene Documento orden de compra
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = NVOrdenCompra.ListarOrdenCompraCliente_Busq("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE)
                    res = GenerarTablaDocumento(dt)
                Case "5" 'Generar tabla para impresion de detalle 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = NVOrdenCompra.ListarOrdenCompraCliente_Busq("", CLIENTE, NUM_DCTO, DCTO_CODE, VENDEDOR, ESTADO, PRODUCTO, SERIE_DCTO, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA), CTLG_CODE, SCSL_CODE)
                    res = GenerarTablaDocumentoImprimir(dt)
                    
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
        resb.AppendFormat("<th>CÓDIGO</th>")
        resb.AppendFormat("<th>TIPO DOCUMENTO</th>")
        resb.AppendFormat("<th>NÚMERO</th>")
        resb.AppendFormat("<th>FECHA EMISIÓN</th>")
        resb.AppendFormat("<th>NRO. DOC.</th>")
        resb.AppendFormat("<th>CLIENTE</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>TOTAL</th>")
        resb.AppendFormat("<th>VENDEDOR</th>")
        resb.AppendFormat("<th>TICKET</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
                                 
        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_DESC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NUM_DCTO").ToString())
                'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("EMISION").ToString())
                resb.AppendFormat("<td align='center' data-order='" + ObtenerFecha(dt.Rows(i)("EMISION").ToString) + "'>{0} <br/><small style='color:#6C7686;'>{1}</small></td>", dt.Rows(i)("EMISION").ToString(), dt.Rows(i)("FECHA_ACTV").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CLIE_DOID_NRO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("MONE_DESC").ToString())
                resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("IMPORTE").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NOMBRE_VENDEDOR").ToString())
                resb.AppendFormat("<td style='text-align:center;'>")
                resb.AppendFormat("<a class='btn blue' onclick=""imprimirDetalle('{0}','{1}')""><i class='icon-search'></i></a>", dt.Rows(i)("CODE").ToString(), dt.Rows(i)("NUM_DCTO").ToString())
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
        resb.AppendFormat("<th>TIPO DOCUMENTO</th>")
        resb.AppendFormat("<th>NÚMERO</th>")
        resb.AppendFormat("<th>FECHA EMISIÓN</th>")
        resb.AppendFormat("<th>NRO. DOC.</th>")
        resb.AppendFormat("<th>CLIENTE</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>TOTAL</th>")
        resb.AppendFormat("<th>FORMA PAGO</th>")
        resb.AppendFormat("<th>VENDEDOR</th>")
        resb.AppendFormat("<th>ANULADO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")
                                 
        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODE").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("TIPO_DCTO_DESC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NUM_DCTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("EMISION").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CLIE_DOID_NRO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("MONE_DESC").ToString())
                resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("IMPORTE").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("FOPA_DESC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("NOMBRE_VENDEDOR").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("ANULADO").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function

    Function ObtenerFecha(ByVal fecha As String) As String
        If fecha <> "" Then
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
        End If
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
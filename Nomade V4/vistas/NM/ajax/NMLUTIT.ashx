<%@ WebHandler Language="VB" Class="NMLUTIT" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMLUTIT : Implements IHttpHandler

    Dim OPCION, USUARIO, CTLG_CODE, SCSL_CODE, MONEDA_CODE, DESDE, HASTA, CHK_INC_SERVICIOS As String

    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    Dim g As New Nomade.NC.NCGrupos("Bn")
    Dim e As New Nomade.NM.NMTipodeExistencia("Bn")
    Dim c As New Nomade.NC.NCCuenta("Bn")
    Dim mone As New Nomade.NC.NCMonedas("Bn")
    Dim param As New Nomade.NC.NCParametros("Bn")
    Dim oc As New Nomade.NC.NCCompra("BN")
    Dim fac As New Nomade.NC.NCFactura("Bn")
    Dim modpag As New Nomade.NF.NFModalidadPago("Bn")
    Dim dcto As New Nomade.NC.NCTipoDC("Bn")
    Dim natipomov As New Nomade.NA.NATipoMovimiento("BN")

    Dim ncTipoDcEmpresa As New Nomade.NC.NCTipoDCEmpresa("BN")
    Dim nceCliente As New Nomade.NC.NCECliente("Bn")
    Dim nmUnidadMedida As New Nomade.NM.NMUnidadMedida("Bn")
    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
    Dim nmGestionPrecios As New Nomade.NM.NMGestionPrecios("Bn")
    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")


    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        OPCION = context.Request("OPCION")

        CTLG_CODE = vChar(context.Request("CTLG_CODE"))
        SCSL_CODE = context.Request("SCSL_CODE")
        MONEDA_CODE = context.Request("MONEDA_CODE")
        DESDE = context.Request("DESDE")
        HASTA = context.Request("HASTA")
        CHK_INC_SERVICIOS = context.Request("CHK_INC_SERVICIOS")
        Try

            Select Case OPCION

                Case "1" ' Obtiene tabla con documentos de venta Y ANTICIPOS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim fecha = HASTA
                    dt = nvVenta.ListarDococumentos_Busq(CTLG_CODE, SCSL_CODE, MONEDA_CODE, CHK_INC_SERVICIOS, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA))
                    If Not dt Is Nothing Then

                        res = Utilities.Datatable2Json(dt) 'GenerarTablaDocumento(dt)
                    Else
                        res = "[]"

                    End If

                Case "2" 'Generar tabla para impresion de detalle 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nvVenta.ListarDococumentos_Busq(CTLG_CODE, SCSL_CODE, MONEDA_CODE, CHK_INC_SERVICIOS, Utilities.fechaLocal(DESDE), Utilities.fechaLocal(HASTA))
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
        ' resb.AppendFormat("<td style="text-align: center;"><i class="icon-pushpin" style="color: red"></i></td>
        resb.AppendFormat("<table id=""tblDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th style='max-width:52px;'></th>")
        resb.AppendFormat("<th style='max-width:52px;'>CÓDIGO</th>")
        resb.AppendFormat("<th style='max-width:70px;'>DOCUMENTO</th>")
        resb.AppendFormat("<th style='max-width:52px;'>FECHA<br/>EMISIÓN</th>")
        resb.AppendFormat("<th style='max-width:52px;'>TIPO DOC</th>")
        resb.AppendFormat("<th style='max-width:52px;'>NRO. DOC</th>")
        resb.AppendFormat("<th style='max-width:300px;'>CLIENTE</th>")
        resb.AppendFormat("<th style='max-width:300px;'>CATEGORÍA CLIENTE</th>")
        'resb.AppendFormat("<th style='max-width:90px;display:none;'>NOMBRE VENDEDOR</th>")
        resb.AppendFormat("<th style='max-width:90px;'>VENDEDOR</th>")
        resb.AppendFormat("<th style='max-width:90px;'>CÓDIGO<br/>PRODUCTO/SERVICIO</th>")
        resb.AppendFormat("<th style='max-width:300px;'>PRODUCTO/SERVICIO</th>")
        resb.AppendFormat("<th style='max-width:300px;'>CENTRO COSTO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>GRUPO</th>")
        resb.AppendFormat("<th style='max-width:52px;'>SUB<br/>GRUPO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>MARCA</th>")
        resb.AppendFormat("<th style='max-width:90px;'>ALMACÉN</th>")
        resb.AppendFormat("<th style='max-width:52px;display:none;'>UNIDAD</th>")
        resb.AppendFormat("<th style='max-width:90px;'>CANTIDAD</th>")
        'resb.AppendFormat("<th style='max-width:90px;'>CANTIDAD</br>DESPACHADA</th>")
        'resb.AppendFormat("<th style='max-width:90px;'>CANTIDAD</br>NO DESPACHADA</th>")
        'resb.AppendFormat("<th style='max-width:90px;'>ESTADO</br>DESPACHO</th>")
        resb.AppendFormat("<th style='max-width:45px;'>MONEDA</th>")
        resb.AppendFormat("<th style='max-width:90px;'>PRECIO</br>UNITARIO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>PRECIO</br>TOTAL</th>")
        resb.AppendFormat("<th style='max-width:90px;'>COSTO</br>UNITARIO</th>")
        resb.AppendFormat("<th style='max-width:90px;'>COSTO</br>TOTAL</th>")
        resb.AppendFormat("<th style='max-width:90px;'>UTILIDAD</br>UNIDAD</th>")
        resb.AppendFormat("<th style='max-width:90px;'>UTILIDAD</br>ITEM</th>")
        'resb.AppendFormat("<th style='max-width:25px;'>#</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody style='font-family:calibri;'>")


        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr  data-tipo='venta anulada'>")
                If dt.Rows(i)("ANULADO").ToString() = "S" Then
                    resb.AppendFormat("<td align='center' >{0}</td>", "<i class='icon-pushpin' style='color: red;font-size:medium;'>")
                Else
                End If


                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td align='left' data-order='" + ObtenerFecha(dt.Rows(i)("EMISION").ToString) + "'>{0}<br/><small style='color:#6C7686;'>{1}</small></td>", dt.Rows(i)("EMISION").ToString(), dt.Rows(i)("FECHA_ACTV").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("TIPO_DOC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CLIE_DOID_NRO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CATEGORIA_CLIENTE").ToString())
                'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("NOMBRE_VENDEDOR").ToString())
                resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("VENDEDOR_USUA_ID").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CODIGO_PROD").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESC_PROD").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CENTRO_COSTO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("GRUPO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("SUBGRUPO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("MARCA").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESC_ALMC").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESC_UNIDAD").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CANTIDAD").ToString())
                'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CANTIDAD_DESPACHADA").ToString())
                'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("CANTIDAD_NO_DESPACHADA").ToString())
                'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("DESPACHO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("SIMBOLO_MONEDA").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("PRECIO_UNITARIO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("TOTAL").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("COSTO_PRODUCTO").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("COSTO_TOTAL").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("UTILIDAD").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("UTILIDAD_TOTAL").ToString())
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

        resb.AppendFormat("<table id='tblDocumento' style='width: 100%;' align='center'  border='1'>")
        resb.AppendFormat("<thead>")
        'resb.AppendFormat("<th><strong>CÓDIGO</strong></th>")
        resb.AppendFormat("<th>DOCUMENTO</th>")
        resb.AppendFormat("<th>FECHA<br/>EMISIÓN</th>")
        resb.AppendFormat("<th>NRO. DOC.</th>")
        resb.AppendFormat("<th>CLIENTE</th>")
        'resb.AppendFormat("<th>NOMBRE VENDEDOR</th>")
        resb.AppendFormat("<th>USUARIO</th>")
        resb.AppendFormat("<th>CÓDIGO<br/>PRODUCTO/SERVICIO</th>")
        resb.AppendFormat("<th>PRODUCTO/SERVICIO</th>")
        resb.AppendFormat("<th>CENTRO COSTO</th>")
        'resb.AppendFormat("<th>GRUPO</th>")
        'resb.AppendFormat("<th>SUB-GRUPO</th>")
        'resb.AppendFormat("<th>MARCA</th>")
        resb.AppendFormat("<th>ALMACÉN</th>")
        resb.AppendFormat("<th>UNIDAD</th>")
        resb.AppendFormat("<th>CANTIDAD</th>")
        resb.AppendFormat("<th>MONEDA</th>")
        resb.AppendFormat("<th>PRECIO<br/>UNITARIO</th>")
        resb.AppendFormat("<th>PRECIO<br/>TOTAL</th>")
        resb.AppendFormat("<th>COSTO<br/>UNITARIO</th>")
        resb.AppendFormat("<th>COSTO<br/>TOTAL</th>")
        resb.AppendFormat("<th>UTILIDAD<br/>UNIDAD</th>")
        resb.AppendFormat("<th>UTILIDAD<br/>ITEM</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")


        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                'resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CODIGO").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("DOCUMENTO").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("EMISION").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CLIE_DOID_NRO").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("RAZON_SOCIAL").ToString())
                'resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("NOMBRE_VENDEDOR").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("VENDEDOR_USUA_ID").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CODIGO_PROD").ToString())
                resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("DESC_PROD").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CENTRO_COSTO").ToString())
                'resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("GRUPO").ToString())
                'resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("SUBGRUPO").ToString())
                'resb.AppendFormat("<td align='left'>{0}</td>", dt.Rows(i)("MARCA").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("DESC_ALMC").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("DESC_UNIDAD").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("CANTIDAD").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("SIMBOLO_MONEDA").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("PRECIO_UNITARIO").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("TOTAL").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("COSTO_PRODUCTO").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("COSTO_TOTAL").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("UTILIDAD").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("UTILIDAD_TOTAL").ToString())
                resb.AppendFormat("</tr>")
            Next
        End If
        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function

    ''' <summary>
    ''' Elimina espacion vacios (trim), cambia (") por ('), reemplaza (/) por vacio
    ''' </summary>
    ''' <param name="campo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function


    Public Function vDesc(ByVal valor As String) As String
        Dim res As String
        Try
            If Decimal.Parse(valor) = 0 Then
                res = ""
            Else
                res = valor + "-"
            End If
        Catch ex As Exception
            res = ""
        End Try
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
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
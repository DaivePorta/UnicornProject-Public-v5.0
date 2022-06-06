<%@ WebHandler Language="VB" Class="NVMPREE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVMPREE : Implements IHttpHandler
    Dim OPCION As String
    Dim USUA_ID, PROD_CODE, CTLG, SCSL, PRECIO_FILTRO, GRUP_CODE, SUBGRUP_CODE As String
    Dim ALMC_CODE, PLAN_CODE, MONE_CODE, UNME_CODE, PRECIO_VENTA, UTILIDAD_VENTA, PRECIO_MINIMO, UTILIDAD_MINIMO As String
    Dim VALORIZADO_IND, SIMBOLO_MONEDA, p_COSTO_IND, p_TipoCambio, p_PROD_SIN_STOCK_IND, p_MARC_CODE As String
    Dim nmGestionPrecios As New NOMADE.NM.NMGestionPrecios("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        USUA_ID = context.Request("USUA_ID")
        CTLG = context.Request("CTLG")
        SCSL = context.Request("SCSL")
        PRECIO_FILTRO = context.Request("PRECIO_FILTRO")
        GRUP_CODE = context.Request("GRUP_CODE")
        SUBGRUP_CODE = context.Request("SUBGRUP_CODE")

        PROD_CODE = context.Request("PROD_CODE")
        ALMC_CODE = context.Request("ALMC_CODE")
        MONE_CODE = context.Request("MONE_CODE")
        UNME_CODE = context.Request("UNME_CODE")

        PRECIO_VENTA = context.Request("PRECIO_VENTA")
        UTILIDAD_VENTA = context.Request("UTILIDAD_VENTA")
        PRECIO_MINIMO = context.Request("PRECIO_MINIMO")
        UTILIDAD_MINIMO = context.Request("UTILIDAD_MINIMO")

        VALORIZADO_IND = context.Request("VALORIZADO_IND")
        SIMBOLO_MONEDA = context.Request("SIMBOLO_MONEDA")
        p_COSTO_IND = context.Request("p_COSTO_IND")

        p_PROD_SIN_STOCK_IND = context.Request("p_PROD_SIN_STOCK_IND")

        p_MARC_CODE = context.Request("p_MARC_CODE")

        p_TipoCambio = context.Request("p_TipoCambio")
        Try
            Select Case OPCION
                Case "1" 'Listar PRODUCTOS Y PRECIOS
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                    Dim dtRangos As New DataTable
                    Dim dtProds As New DataTable
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dtProds = nmGestionPrecios.ListarProductoPrecios(IIf(PROD_CODE Is Nothing, "", PROD_CODE), CTLG, SCSL, "E", IIf(PRECIO_FILTRO Is Nothing, "", PRECIO_FILTRO),
                                                                     IIf(GRUP_CODE Is Nothing, "", GRUP_CODE), IIf(SUBGRUP_CODE Is Nothing, "", SUBGRUP_CODE), "",
                                                                     IIf(p_COSTO_IND Is Nothing, "", p_COSTO_IND), IIf(p_PROD_SIN_STOCK_IND Is Nothing, "S", p_PROD_SIN_STOCK_IND),
                                                                     IIf(p_MARC_CODE Is Nothing, "", p_MARC_CODE))
                    If Not dtProds Is Nothing Then
                        res = Utilities.Datatable2Json(dtProds)
                    Else
                        res = "[]"
                    End If
                    'res = GenerarTablaMantenimientoPrecios(dtProds)

                Case "2" 'Registrar precio ESTANDAR para el almacen indicado
                    context.Response.ContentType = "application/text; charset=utf-8"
                    If ALMC_CODE = "" Then
                        res = "ALMC"
                    Else
                        res = nmGestionPrecios.REGISTRAR_PRECIO_ESTANDAR(PROD_CODE, CTLG, ALMC_CODE, UNME_CODE, PLAN_CODE, MONE_CODE,
                   PRECIO_VENTA, PRECIO_MINIMO, UTILIDAD_VENTA, UTILIDAD_MINIMO, USUA_ID)
                        res = "OK"
                    End If



                Case "3" 'Actualiza precio ESTANDAR en el almacen indicado 
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = nmGestionPrecios.ACTUALIZAR_PRECIO_ESTANDAR(PROD_CODE, CTLG, PRECIO_VENTA, PRECIO_MINIMO, UTILIDAD_VENTA, UTILIDAD_MINIMO, USUA_ID, ALMC_CODE)

                Case "4" 'Registro precio ESTANDAR en todos los almacenes
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Try
                        Dim naAlmacen As New Nomade.NA.NAConfAlmacenes("Bn")
                        dt = naAlmacen.ListarAlmacenes("", CTLG, "", "A")
                        For Each MiDataRow As DataRow In dt.Rows
                            res = nmGestionPrecios.REGISTRAR_PRECIO_ESTANDAR(PROD_CODE, CTLG, MiDataRow("CODIGO"), UNME_CODE, PLAN_CODE, MONE_CODE,
                                                                             PRECIO_VENTA, PRECIO_MINIMO, UTILIDAD_VENTA, UTILIDAD_MINIMO, USUA_ID)
                            'Reemplaza los valores de aquellos almacenes que ya tienen registrado un precio estandar
                            nmGestionPrecios.ACTUALIZAR_PRECIO_ESTANDAR(PROD_CODE, CTLG, PRECIO_VENTA, PRECIO_MINIMO, UTILIDAD_VENTA, UTILIDAD_MINIMO, USUA_ID)
                        Next
                    Catch ex As Exception
                        context.Response.Write(ex.ToString)
                    End Try

                Case "5" 'Actualiza precio ESTANDAR en todos los almacenes
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Try
                        res = nmGestionPrecios.ACTUALIZAR_PRECIO_ESTANDAR(PROD_CODE, CTLG, PRECIO_VENTA, PRECIO_MINIMO, UTILIDAD_VENTA, UTILIDAD_MINIMO, USUA_ID)
                    Catch ex As Exception
                        context.Response.Write(ex.ToString)
                    End Try

                Case "6" 'Generar tabla de precios para impresion
                    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                    Dim dtRangos As New DataTable
                    Dim dtProds As New DataTable
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dtRangos = nmGestionPrecios.ListarRangoPrecioCantidad("")
                    dtProds = nmGestionPrecios.ListarProductoPrecios(IIf(PROD_CODE Is Nothing, "", PROD_CODE), CTLG, SCSL, "E", IIf(PRECIO_FILTRO Is Nothing, "", PRECIO_FILTRO),
                                                                     IIf(GRUP_CODE Is Nothing, "", GRUP_CODE), IIf(SUBGRUP_CODE Is Nothing, "", SUBGRUP_CODE), "", p_COSTO_IND,
                                                                     IIf(p_PROD_SIN_STOCK_IND Is Nothing, "S", p_PROD_SIN_STOCK_IND), IIf(p_MARC_CODE Is Nothing, "", p_MARC_CODE))
                    res = GenerarTablaImprimir(dtProds)


            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public Function GenerarTablaMantenimientoPrecios(ByVal dtProds As DataTable) As String

        resb.Clear()
        resb.Append("<table id='tblPrecios' class='table' style='width: 100%; border: 1px solid #cbcbcb;' cellpadding='6px'>")
        resb.Append("<thead class='fondoHeader'>")
        resb.Append("<tr>")
        resb.Append("<th class='center' rowspan='2'>CODIGO</th>") 'CODIGO PRODUCTO
        resb.Append("<th class='center' rowspan='2' id='nomProd' >PRODUCTO</th>") 'PRODUCTO
        resb.Append("<th class='center' rowspan='2'>MONEDA</th>") 'MONEDA
        resb.AppendFormat("<th class='center' rowspan='2'>COSTO PROMEDIO<br/>{0}</th>", SIMBOLO_MONEDA) 'COSTO NETO
        resb.AppendFormat("<th class='center' rowspan='2'>ULTIMA COMPRA<br/>{0}</th>", SIMBOLO_MONEDA) 'ULTIMO PRECIO COMPRA  
        resb.Append("<th class='center dn' rowspan='2'>TIPO<br/>PRECIO</th>") 'TIPO PRECIO
        resb.Append("<th class='center' colspan='2'>Mínimo</th>")
        resb.Append("<th class='center' colspan='2'>Normal</th>")
        resb.Append("<th class='dn center' rowspan='2'>#</th>") 'ACCIONES
        resb.Append("</tr>")
        resb.Append("<tr>")
        resb.Append("<th  class='center' >Ut. %</th>")
        resb.Append("<th  class='center' >Precio</th>")
        resb.Append("<th  class='center' >Ut. %</th>")
        resb.Append("<th  class='center' >Precio </th>")
        resb.Append("</tr>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
        'PRODUCTOS
        If dtProds IsNot Nothing Then
            Dim strPrecios As String = ""
            Dim registradoInd As String = ""
            Dim count As Integer = 0
            For Each prod In dtProds.Rows
                count += 1
                If prod("PRECIO_IND") = "C" Then
                    strPrecios = "CANTIDAD"
                Else
                    strPrecios = "ESTANDAR"
                End If

                If prod("UTILIDAD_MINIMO") = "" And prod("PRECIO_MINIMO") = "" And prod("UTILIDAD_VENTA") = "" And prod("PRECIO_VENTA") = "" Then
                    registradoInd = ""
                Else
                    registradoInd = "registrado"
                End If

                resb.AppendFormat("<tr id='f_{0}' class='{1}'>", prod("CODIGO"), registradoInd)
                If count = dtProds.Rows.Count Then 'Habilitar filtros de dataTable
                    resb.AppendFormat("<td class='hover' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"">{1}<script>HabilitarBuscador();</script></td>", prod("CODIGO"), prod("CODIGO_ANTIGUO"))
                Else
                    resb.AppendFormat("<td class='hover' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"">{1}</td>", prod("CODIGO"), prod("CODIGO_ANTIGUO"))
                End If

                resb.AppendFormat("<td class='hover' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"">{1}</td>", prod("CODIGO"), prod("DESC_ADM"))
                resb.AppendFormat("<td class='hover center' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"" data-mone='{2}'>{1}</td>", prod("CODIGO"), prod("MONEDA_DESC_CORTA"), prod("MONEDA"))

                'OBTENER COSTO Y PRECIO SEGÚN INDICADOR DE VALORIZADO
                If VALORIZADO_IND = "MOBA" Then
                    resb.AppendFormat("<td id='c_{0}'  class='center'>{1}</td>", prod("CODIGO"), prod("COSTO_MOBA"))
                    resb.AppendFormat("<td id='pc_{0}'  class='center'>{1}</td>", prod("CODIGO"), prod("VALOR_ULTIMA_COMPRA_MOBA"))

                ElseIf VALORIZADO_IND = "MOAL" Then
                    resb.AppendFormat("<td id='c_{0}'  class='center'>{1}</td>", prod("CODIGO"), prod("COSTO_MOAL"))
                    resb.AppendFormat("<td id='pc_{0}'  class='center'>{1}</td>", prod("CODIGO"), prod("VALOR_ULTIMA_COMPRA_MOAL"))

                Else   'VALORIZADO_IND = "PROD"  'El costo está de acuerdo a la moneda del producto
                    resb.AppendFormat("<td id='c_{0}'  class='center'>{1}</td>", prod("CODIGO"), prod("COSTO"))
                    resb.AppendFormat("<td id='pc_{0}'  class='center'>{1}</td>", prod("CODIGO"), prod("VALOR_ULTIMA_COMPRA"))

                End If

                resb.AppendFormat("<td id='tp_{1}' class='dn'>{0}</td>", strPrecios, prod("CODIGO"))
                resb.AppendFormat("<td><input type='text' class='util' value='{0}' id='um_{1}_{2}_{3}_{4}'/></td>", prod("UTILIDAD_MINIMO").ToString, prod("CODIGO"), prod("MONEDA"), prod("ALMACEN"), prod("UNIDAD"))
                resb.AppendFormat("<td><input type='text' class='prec' value='{0}' id='pm_{1}_{2}_{3}_{4}'/></td>", prod("PRECIO_MINIMO").ToString, prod("CODIGO"), prod("MONEDA"), prod("ALMACEN"), prod("UNIDAD"))
                resb.AppendFormat("<td class='colorColumna'><input type='text' class='util' value='{0}' id='un_{1}_{2}_{3}_{4}'/></td>", prod("UTILIDAD_VENTA"), prod("CODIGO"), prod("MONEDA"), prod("ALMACEN"), prod("UNIDAD"))
                resb.AppendFormat("<td class='colorColumna'><input type='text' class='prec prec2' value='{0}' id='pn_{1}_{2}_{3}_{4}' data-um='{5}' data-pm='{6}' data-un='{7}' /></td>", prod("PRECIO_VENTA"), prod("CODIGO"), prod("MONEDA"), prod("ALMACEN"), prod("UNIDAD"), prod("UTILIDAD_MINIMO").ToString, prod("PRECIO_MINIMO").ToString, prod("UTILIDAD_VENTA").ToString)
                'ACCIONES
                resb.AppendFormat("<td class='dn' style=' min-width: 85px !important;'><div id='divBtn_{0}'>", prod("CODIGO"))
                resb.AppendFormat("<a onclick=""CalcularPreciosEstandar('{0}','{1}')""class='btn green btnCalcular' title='Calcular precio basado en Costo Promedio' style='margin:0px 2px 2px 0px;'><i class='fa fa-gears'></i></a>", prod("CODIGO"), prod("MONEDA"))
                resb.AppendFormat("<a onclick=""CalcularPreciosEstandar2('{0}','{1}')"" class='btn red btnCalcular2' title='Calcular precio basado en Precio Compra' style='margin:0px 2px 2px 0px;'><i class='fa fa-gears'></i></a>", prod("CODIGO"), prod("MONEDA"))
                resb.AppendFormat("<a id='btnCambiarIndicadorPrecio_{0}' onclick=""CambiarIndicadorPrecio('{0}','{1}',this)"" class='btn blue btnCambiarIndicadorPrecio' title='Cambiar indicador de precio de producto'  style='margin:0px 2px 2px 0px;'><i class='fa fa-random'></i></a>", prod("CODIGO"), prod("PRECIO_IND"))
                resb.AppendFormat("</div></td>")
                resb.Append("</tr>")
            Next
        End If
        'FIN PRODUCTOS
        resb.Append("</tbody>")
        resb.Append("</table>")
        Return resb.ToString
    End Function


    Public Function GenerarTablaImprimir(ByVal dtProds As DataTable) As String

        resb.Clear()
        resb.Append("<table id='tblPreciosImprimir' style='width: 100%;' align='center' border='1'>")
        resb.Append("<thead>")
        resb.Append("<tr>")
        resb.Append("<th  class='center' >CODIGO</th>") 'CODIGO PRODUCTO
        resb.Append("<th  class='center' >PRODUCTO</th>") 'PRODUCTO
        resb.Append("<th  class='center' >MONEDA</th>") 'MONEDA
        resb.Append("<th  class='center' >PRECIO MÍNIMO</th>")
        resb.Append("<th  class='center' >PRECIO NORMAL</th>")
        resb.Append("</tr>")

        resb.Append("</thead>")
        resb.Append("<tbody>")
        'PRODUCTOS
        If dtProds IsNot Nothing Then
            For Each prod In dtProds.Rows
                resb.Append("<tr>")
                resb.AppendFormat("<td >{1}</td>", prod("CODIGO"), prod("CODIGO_ANTIGUO"))
                resb.AppendFormat("<td >{1}</td>", prod("CODIGO"), prod("DESC_ADM"))
                resb.AppendFormat("<td  class='center'>{1}</td>", prod("CODIGO"), prod("MONEDA_DESC_CORTA"))
                resb.AppendFormat("<td style='text-align: right'>{0}</td>", If(prod("PRECIO_MINIMO").ToString = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(prod("PRECIO_MINIMO").ToString))))
                resb.AppendFormat("<td style='text-align: right'>{0}</td>", If(prod("PRECIO_VENTA").ToString = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(prod("PRECIO_VENTA").ToString))))
                resb.Append("</tr>")
            Next
        End If
        'FIN PRODUCTOS
        resb.Append("</tbody>")
        resb.Append("</table>")
        Return resb.ToString
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
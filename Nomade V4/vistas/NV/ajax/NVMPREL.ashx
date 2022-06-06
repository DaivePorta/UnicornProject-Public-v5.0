<%@ WebHandler Language="VB" Class="NVMPREC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVMPREC : Implements IHttpHandler

    Dim OPCION As String
    Dim USUA_ID, PROD_CODE, CTLG, SCSL, PRECIO_FILTRO, GRUP_CODE, SUBGRUP_CODE, PRECIO_IND As String
    Dim ALMC_CODE, PRECIO_VENTA, PLAN_CODE, RANG_CODE, MONE_CODE, UTILIDAD, FTVPRER_CODE As String
    Dim VALORIZADO_IND, SIMBOLO_MONEDA, p_COSTO_IND, p_TipoCambio, p_PROD_SIN_STOCK_IND, p_MARC_CODE, FTVPREL_CODE As String

    Dim p_CODE, p_DESCRIPCION, p_DETALLES As String
    Dim nmGestionPrecios As New Nomade.NM.NMGestionPrecios("Bn")

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
        PRECIO_VENTA = context.Request("PRECIO_VENTA")
        PLAN_CODE = context.Request("PLAN_CODE")
        RANG_CODE = context.Request("RANG_CODE")
        MONE_CODE = context.Request("MONE_CODE")
        UTILIDAD = context.Request("UTILIDAD")
        FTVPRER_CODE = context.Request("FTVPRER_CODE")
        FTVPREL_CODE = context.Request("FTVPREL_CODE")
        PRECIO_IND = context.Request("PRECIO_IND")

        VALORIZADO_IND = context.Request("VALORIZADO_IND")
        SIMBOLO_MONEDA = context.Request("SIMBOLO_MONEDA")

        'RANGO UTILIDAD
        p_CODE = context.Request("p_CODE")
        p_DESCRIPCION = context.Request("p_DESCRIPCION")
        p_DETALLES = context.Request("p_DETALLES")
        p_COSTO_IND = context.Request("p_COSTO_IND")
        p_TipoCambio = context.Request("p_TipoCambio")

        p_PROD_SIN_STOCK_IND = context.Request("p_PROD_SIN_STOCK_IND")

        p_MARC_CODE = context.Request("p_MARC_CODE")

        Try
            Select Case OPCION
                Case "1" 'Listar PRODUCTOS Y PRECIOS
                    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                    Dim dtListas As New DataTable
                    Dim dtProds As New DataTable
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dtListas = nmGestionPrecios.ListarRangoPrecioListaCliente("")
                    dtProds = nmGestionPrecios.ListarProductoPrecios(IIf(PROD_CODE Is Nothing, "", PROD_CODE), CTLG, SCSL, "L", If(PRECIO_FILTRO Is Nothing, "", PRECIO_FILTRO),
                                                                     IIf(GRUP_CODE Is Nothing, "", GRUP_CODE), IIf(SUBGRUP_CODE Is Nothing, "", SUBGRUP_CODE), "",
                                                                     IIf(p_COSTO_IND Is Nothing, "", p_COSTO_IND), IIf(p_PROD_SIN_STOCK_IND Is Nothing, "S", p_PROD_SIN_STOCK_IND),
                                                                     IIf(p_MARC_CODE Is Nothing, "", p_MARC_CODE))

                    res = GenerarTablaMantenimientoPrecios(dtListas, dtProds)

                Case "2" 'Registrar Precio cantidad
                    context.Response.ContentType = "application/text; charset=utf-8"
                    'nmGestionPrecios.QUITAR_PRECIO_CANTIDAD(PROD_CODE, CTLG, RANG_CODE, ALMC_CODE)
                    res = nmGestionPrecios.REGISTRAR_PRECIO_CLIENTE(PROD_CODE, CTLG, ALMC_CODE, MONE_CODE,
                                                                   PRECIO_VENTA, PRECIO_VENTA, UTILIDAD, FTVPREL_CODE, USUA_ID)
                Case "3" 'Registrar Precio cantidad para Todos los ALMACENES
                    context.Response.ContentType = "application/text; charset=utf-8"
                    nmGestionPrecios.QUITAR_PRECIO_CANTIDAD(PROD_CODE, CTLG, RANG_CODE)
                    Try
                        Dim naAlmacen As New Nomade.NA.NAConfAlmacenes("Bn")
                        dt = naAlmacen.ListarAlmacenes("", CTLG, "", "A")
                        For Each MiDataRow As DataRow In dt.Rows
                            res = nmGestionPrecios.REGISTRAR_PRECIO_CLIENTE(PROD_CODE, CTLG, MiDataRow("CODIGO"), MONE_CODE,
                                                                             PRECIO_VENTA, PRECIO_VENTA, UTILIDAD, FTVPREL_CODE, USUA_ID)
                        Next
                    Catch ex As Exception
                        context.Response.Write(ex.ToString)
                    End Try
                Case "4" 'Cambiar indicador de precio de producto
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim nmGestionProducto As New Nomade.NM.NMGestionProductos("Bn")
                    res = nmGestionProducto.ActualizarPrecioIndProducto(PROD_CODE, CTLG, PRECIO_IND)

                Case "5" 'Generar tabla de precios para impresion
                    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                    Dim dtListas As New DataTable
                    Dim dtProds As New DataTable
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dtListas = nmGestionPrecios.ListarRangoPrecioListaCliente("")
                    dtProds = nmGestionPrecios.ListarProductoPrecios(IIf(PROD_CODE Is Nothing, "", PROD_CODE), CTLG, SCSL, "L", IIf(PRECIO_FILTRO Is Nothing, "", PRECIO_FILTRO),
                                                                     IIf(GRUP_CODE Is Nothing, "", GRUP_CODE), IIf(SUBGRUP_CODE Is Nothing, "", SUBGRUP_CODE), "",
                                                                     p_COSTO_IND, IIf(p_PROD_SIN_STOCK_IND Is Nothing, "S", p_PROD_SIN_STOCK_IND),
                                                                     IIf(p_MARC_CODE Is Nothing, "", p_MARC_CODE))
                    res = GenerarTablaImprimir(dtListas, dtProds)

                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    res = nmGestionPrecios.RegistrarRangoUtilidad(p_DESCRIPCION, CTLG, SCSL, MONE_CODE, USUA_ID, p_DETALLES)
                    resb.Append("[{")
                    resb.Append("""RESPUESTA"":""" & res & """")
                    resb.Append("}]")
                    res = resb.ToString()

                Case "7"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    res = nmGestionPrecios.ActualizarRangoUtilidad(p_CODE, p_DESCRIPCION, CTLG, SCSL, MONE_CODE, USUA_ID, p_DETALLES)
                    resb.Append("[{")
                    resb.Append("""RESPUESTA"":""" & res & """")
                    resb.Append("}]")
                    res = resb.ToString()

                Case "8"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    res = nmGestionPrecios.EliminarRangoUtilidad(p_CODE)
                    resb.Append("[{")
                    resb.Append("""RESPUESTA"":""" & res & """")
                    resb.Append("}]")
                    res = resb.ToString()

                Case "9"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmGestionPrecios.ListarRangoUtilidad(If(p_CODE = Nothing, "", p_CODE), If(CTLG = Nothing, "", CTLG), If(SCSL = Nothing, "", SCSL), If(MONE_CODE = Nothing, "", MONE_CODE))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                            resb.Append("""MONE_CODE"":""" & row("MONE_CODE").ToString & """,")
                            resb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
                            resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """,")
                            resb.Append("""USUA_ID"":""" & row("USUA_ID").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "10"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmGestionPrecios.ListarDetalleRangoUtilidad(p_CODE)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""INICIO"":""" & row("INICIO").ToString & """,")
                            resb.Append("""UTILIDAD"":""" & row("UTILIDAD").ToString & """,")
                            resb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """,")
                            resb.Append("""USUA_ID"":""" & row("USUA_ID").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "11" 'Listar PRODUCTOS Y PRECIOS
                    Dim nvVenta As New Nomade.NV.NVVenta("Bn")
                    Dim dtRangos As New DataTable
                    Dim dtProds As New DataTable
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dtRangos = nmGestionPrecios.ListarRangoPrecioCantidad("")
                    dtProds = nmGestionPrecios.ListarProductoPrecios(IIf(PROD_CODE Is Nothing, "", PROD_CODE), CTLG, SCSL, "C", If(PRECIO_FILTRO Is Nothing, "", PRECIO_FILTRO),
                                                                     IIf(GRUP_CODE Is Nothing, "", GRUP_CODE), IIf(SUBGRUP_CODE Is Nothing, "", SUBGRUP_CODE), "",
                                                                     IIf(p_COSTO_IND Is Nothing, "", p_COSTO_IND), IIf(p_PROD_SIN_STOCK_IND Is Nothing, "S", p_PROD_SIN_STOCK_IND),
                                                                     IIf(p_MARC_CODE Is Nothing, "", p_MARC_CODE))

                    res = GenerarTablaListadoPrecios(dtRangos, dtProds)

            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Public Function GenerarTablaListadoPrecios(ByVal dtRangos As DataTable, ByVal dtProds As DataTable) As String

        Dim nroRangos = dtRangos.Rows.Count
        Dim colorColumna As Boolean = True
        resb.Clear()
        resb.Append("<table id='tblPrecios2' class='table' style='width: 100%; border: 1px solid #cbcbcb;' cellpadding='6px'>")
        resb.Append("<thead class='fondoHeader'>")
        resb.Append("<tr>")
        resb.Append("<th class='center' rowspan='2'>CODIGO</th>") 'CODIGO ANTIGUO PRODUCTO
        resb.Append("<th class='center' rowspan='2'>PRODUCTO</th>") 'PRODUCTO
        resb.Append("<th class='center' rowspan='2'>MONEDA PRECIO</th>") 'MONEDA
        resb.AppendFormat("<th class='center' rowspan='2'>COSTO PROMEDIO<br/>{0}</th>", SIMBOLO_MONEDA) 'COSTO NETO
        resb.AppendFormat("<th class='center' rowspan='2'>ULTIMA COMPRA<br/>{0}</th>", SIMBOLO_MONEDA) 'ULTIMO PRECIO COMPRA
        resb.Append("<th class='center dn' rowspan='2' >TIPO<br/>PRECIO</th>") 'TIPO PRECIO
        For Each row In dtRangos.Rows
            resb.AppendFormat("<th class='center' colspan='2'>{0}</th>", row("NOMBRE").ToString) 'RANGO          
        Next
        'resb.Append("<th class='dn center' rowspan='2'>#</th>") 'ACCIONES
        resb.Append("</tr>")

        resb.Append("<tr>")
        For Each row In dtRangos.Rows
            resb.AppendFormat("<th class='center'>Ut. %</th>")
            resb.AppendFormat("<th class='center'>Precio</th>")
        Next
        resb.Append("</tr>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
        'PRODUCTOS
        If dtProds IsNot Nothing Then
            Dim strPrecios As String = ""
            Dim count As Integer = 0
            For Each prod In dtProds.Rows
                count += 1
                Dim grupoPrecios As String() = prod("DATOS_PRECIOS").ToString.Split(",")

                If prod("PRECIO_IND") = "C" Then
                    strPrecios = "CANTIDAD"
                Else
                    strPrecios = "ESTANDAR"
                End If

                resb.AppendFormat("<tr id='f_{0}'>", prod("CODIGO"))
                'HabilitarBuscador cuando llegue a la última fila
                If count = dtProds.Rows.Count Then
                    resb.AppendFormat("<td class='hover' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"">{1}<script>HabilitarBuscador();</script></td>", prod("CODIGO"), prod("CODIGO_ANTIGUO"))
                Else
                    resb.AppendFormat("<td class='hover' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"">{1}</td>", prod("CODIGO"), prod("CODIGO_ANTIGUO"))
                End If

                resb.AppendFormat("<td class='hover' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"">{1}</td>", prod("CODIGO"), prod("DESC_ADM"))
                resb.AppendFormat("<td class='hover center' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"" data-mone='{2}' data-costo='{3}' data-costoultcompra='{4}' >{1}</td>", prod("CODIGO"), prod("MONEDA_DESC_CORTA"), prod("MONEDA"), prod("COSTO"), prod("VALOR_ULTIMA_COMPRA"))

                If VALORIZADO_IND = "MOBA" Then
                    resb.AppendFormat("<td id='c_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("COSTO_MOBA"))
                    resb.AppendFormat("<td id='pc_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("VALOR_ULTIMA_COMPRA_MOBA"))

                ElseIf VALORIZADO_IND = "MOAL" Then
                    resb.AppendFormat("<td id='c_{0}' class='center'>{1}</td>", prod("CODIGO"), Math.Round(prod("COSTO_MOAL") / p_TipoCambio, 2))
                    resb.AppendFormat("<td id='pc_{0}' class='center'>{1}</td>", prod("CODIGO"), Math.Round(prod("VALOR_ULTIMA_COMPRA_MOAL") / p_TipoCambio, 2))

                    'resb.AppendFormat("<td id='c_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("COSTO_MOAL"))
                    'resb.AppendFormat("<td id='pc_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("VALOR_ULTIMA_COMPRA_MOAL"))

                Else   'VALORIZADO_IND = "PROD"  'El costo está de acuerdo a la moneda del producto
                    resb.AppendFormat("<td id='c_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("COSTO"))
                    resb.AppendFormat("<td id='pc_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("VALOR_ULTIMA_COMPRA"))

                End If

                resb.AppendFormat("<td id='tp_{1}' class='dn'>{0}</td>", strPrecios, prod("CODIGO"))
                Dim utilidad, precio, rango As String
                colorColumna = True

                For Each rang In dtRangos.Rows
                    utilidad = ""
                    precio = ""
                    rango = ""
                    If grupoPrecios.Length >= 1 Then
                        For Each datoPrecio As String In grupoPrecios
                            Dim dato As String() = datoPrecio.ToString.Split("|") 'CODIGO FTVPRER(0)PRECIO(1)UTILIDAD(2)CODIGO_RANGO(3)

                            If dato(0).Equals(rang("CODIGO")) Then
                                precio = dato(1)
                                utilidad = dato(2)
                                'rango = dato(3)
                                Exit For
                            Else
                                utilidad = ""
                                precio = ""
                                'rango = rang("RANGO_INICIO")
                            End If
                        Next
                        If colorColumna Then
                            resb.AppendFormat("<td class='hover'"">{0}</td>", utilidad)
                            resb.AppendFormat("<td class='hover'"">{0}</td>", precio)

                            'resb.AppendFormat("<td class='noColorColumna'><input type='text' class='util' value='{0}' id='u_{1}_{2}_{3}_{4}_{5}' /></td>", utilidad, prod("CODIGO"), rang("CODIGO"), prod("MONEDA"), rango, prod("ALMACEN"))
                            'resb.AppendFormat("<td class='noColorColumna'><input type='text' class='prec' value='{0}' id='p_{1}_{2}_{3}_{4}_{5}' data-util='{6}'/></td>", precio, prod("CODIGO"), rang("CODIGO"), prod("MONEDA"), rango, prod("ALMACEN"), utilidad)
                            colorColumna = False
                        Else
                            resb.AppendFormat("<td class='hover'"">{0}</td>", utilidad)
                            resb.AppendFormat("<td class='hover'"">{0}</td>", precio)

                            'resb.AppendFormat("<td class='colorColumna'><input type='text' class='util' value='{0}' id='u_{1}_{2}_{3}_{4}_{5}' /></td>", utilidad, prod("CODIGO"), rang("CODIGO"), prod("MONEDA"), rango, prod("ALMACEN"))
                            'resb.AppendFormat("<td class='colorColumna'><input type='text' class='prec' value='{0}' id='p_{1}_{2}_{3}_{4}_{5}' data-util='{6}'/></td>", precio, prod("CODIGO"), rang("CODIGO"), prod("MONEDA"), rango, prod("ALMACEN"), utilidad)
                            colorColumna = True

                        End If

                    End If
                Next
                'ACCIONES                
                'resb.AppendFormat("<td class='dn center' style=' min-width: 85px !important;'><div id='divBtn_{0}'>", prod("CODIGO"))
                'resb.AppendFormat("<a onclick=""CalcularPreciosCantidad('{0}','{1}')"" class='btn green btnCalcular' title='Calcular precio basado en Costo Promedio' style='margin:0px 2px 2px 0px;'><i class='fa fa-gears'></i></a>", prod("CODIGO"), prod("MONEDA"))
                'resb.AppendFormat("<a onclick=""CalcularPreciosCantidad2('{0}','{1}')"" class='btn red btnCalcular2' title='Calcular precio basado en Precio Compra' style='margin:0px 2px 2px 0px;'><i class='fa fa-gears'></i></a>", prod("CODIGO"), prod("MONEDA"))
                'resb.AppendFormat("<a id='btnCambiarIndicadorPrecio_{0}' onclick=""CambiarIndicadorPrecio('{0}','{1}',this)"" class='btn blue btnCambiarIndicadorPrecio' title='Cambiar indicador de precio de producto'  style='margin:0px 2px 2px 0px;'><i class='fa fa-random'></i></a>", prod("CODIGO"), prod("PRECIO_IND"))
                'resb.AppendFormat("</div></td>")
                resb.Append("</tr>")

            Next
        End If
        'FIN PRODUCTOS
        resb.Append("</tbody>")
        resb.Append("</table>")

        Return resb.ToString
    End Function


    Public Function GenerarTablaMantenimientoPrecios(ByVal dtListas As DataTable, ByVal dtProds As DataTable) As String

        Dim nroRangos = dtListas.Rows.Count
        Dim colorColumna As Boolean = True
        resb.Clear()
        resb.Append("<table id='tblPrecios' class='table' style='width: 100%; border: 1px solid #cbcbcb;' cellpadding='6px'>")
        resb.Append("<thead class='fondoHeader'>")
        resb.Append("<tr>")
        resb.Append("<th class='center' rowspan='2'>CODIGO</th>") 'CODIGO ANTIGUO PRODUCTO
        resb.Append("<th class='center' rowspan='2'>PRODUCTO</th>") 'PRODUCTO
        resb.Append("<th class='center' rowspan='2'>MONEDA PRECIO</th>") 'MONEDA
        resb.AppendFormat("<th class='center' rowspan='2'>COSTO PROMEDIO<br/>{0}</th>", SIMBOLO_MONEDA) 'COSTO NETO
        resb.AppendFormat("<th class='center' rowspan='2'>ULTIMA COMPRA<br/>{0}</th>", SIMBOLO_MONEDA) 'ULTIMO PRECIO COMPRA
        resb.Append("<th class='center dn' rowspan='2' >TIPO<br/>PRECIO</th>") 'TIPO PRECIO
        For Each row In dtListas.Rows
            resb.AppendFormat("<th class='center' colspan='2'>{0}</th>", row("NOMBRE").ToString) 'LISTAS         
        Next
        resb.Append("<th class='dn center' rowspan='2'>#</th>") 'ACCIONES
        resb.Append("</tr>")

        resb.Append("<tr>")
        For Each row In dtListas.Rows
            resb.AppendFormat("<th class='center'>Ut. %</th>")
            resb.AppendFormat("<th class='center'>Precio</th>")
        Next
        resb.Append("</tr>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
        'PRODUCTOS
        If dtProds IsNot Nothing Then
            Dim strPrecios As String = ""
            Dim count As Integer = 0
            For Each prod In dtProds.Rows
                count += 1
                Dim grupoPrecios As String() = prod("DATOS_PRECIOS").ToString.Split(",")

                If prod("PRECIO_IND") = "L" Then
                    strPrecios = "CLIENTE"
                Else
                    strPrecios = "ESTANDAR"
                End If

                resb.AppendFormat("<tr id='f_{0}'>", prod("CODIGO"))
                'HabilitarBuscador cuando llegue a la última fila
                If count = dtProds.Rows.Count Then
                    resb.AppendFormat("<td class='hover' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"">{1}<script>HabilitarBuscador();</script></td>", prod("CODIGO"), prod("CODIGO_ANTIGUO"))
                Else
                    resb.AppendFormat("<td class='hover' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"">{1}</td>", prod("CODIGO"), prod("CODIGO_ANTIGUO"))
                End If

                resb.AppendFormat("<td class='hover' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"">{1}</td>", prod("CODIGO"), prod("DESC_ADM"))
                resb.AppendFormat("<td class='hover center' title='Doble clic para ver Producto' ondblclick=""IrAProducto('{0}')"" data-mone='{2}' data-costo='{3}' data-costoultcompra='{4}' >{1}</td>", prod("CODIGO"), prod("MONEDA_DESC_CORTA"), prod("MONEDA"), prod("COSTO"), prod("VALOR_ULTIMA_COMPRA"))

                If VALORIZADO_IND = "MOBA" Then
                    resb.AppendFormat("<td id='c_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("COSTO_MOBA"))
                    resb.AppendFormat("<td id='pc_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("VALOR_ULTIMA_COMPRA_MOBA"))

                ElseIf VALORIZADO_IND = "MOAL" Then
                    resb.AppendFormat("<td id='c_{0}' class='center'>{1}</td>", prod("CODIGO"), Math.Round(prod("COSTO_MOAL") / p_TipoCambio, 2))
                    resb.AppendFormat("<td id='pc_{0}' class='center'>{1}</td>", prod("CODIGO"), Math.Round(prod("VALOR_ULTIMA_COMPRA_MOAL") / p_TipoCambio, 2))

                    'resb.AppendFormat("<td id='c_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("COSTO_MOAL"))
                    'resb.AppendFormat("<td id='pc_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("VALOR_ULTIMA_COMPRA_MOAL"))

                Else   'VALORIZADO_IND = "PROD"  'El costo está de acuerdo a la moneda del producto
                    resb.AppendFormat("<td id='c_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("COSTO"))
                    resb.AppendFormat("<td id='pc_{0}' class='center'>{1}</td>", prod("CODIGO"), prod("VALOR_ULTIMA_COMPRA"))

                End If

                resb.AppendFormat("<td id='tp_{1}' class='dn'>{0}</td>", strPrecios, prod("CODIGO"))
                Dim utilidad, precio, rango As String
                colorColumna = True

                For Each rang In dtListas.Rows
                    utilidad = ""
                    precio = ""
                    rango = ""
                    If grupoPrecios.Length >= 1 Then
                        For Each datoPrecio As String In grupoPrecios
                            Dim dato As String() = datoPrecio.ToString.Split("|") 'CODIGO FTVPRER(0)PRECIO(1)UTILIDAD(2)CODIGO_RANGO(3)

                            If dato(0).Equals(rang("CODIGO")) Then
                                precio = dato(1)
                                utilidad = dato(2)
                                'rango = dato(3)
                                Exit For
                            Else
                                utilidad = ""
                                precio = ""
                                'rango = rang("RANGO_INICIO")
                            End If
                        Next
                        If colorColumna Then
                            resb.AppendFormat("<td class='noColorColumna'><input type='text' class='util' value='{0}' id='u_{1}_{2}_{3}_{4}_{5}' /></td>", utilidad, prod("CODIGO"), rang("CODIGO"), prod("MONEDA"), rango, prod("ALMACEN"))
                            resb.AppendFormat("<td class='noColorColumna'><input type='text' class='prec' value='{0}' id='p_{1}_{2}_{3}_{4}_{5}' data-util='{6}'/></td>", precio, prod("CODIGO"), rang("CODIGO"), prod("MONEDA"), rango, prod("ALMACEN"), utilidad)
                            colorColumna = False
                        Else
                            resb.AppendFormat("<td class='colorColumna'><input type='text' class='util' value='{0}' id='u_{1}_{2}_{3}_{4}_{5}' /></td>", utilidad, prod("CODIGO"), rang("CODIGO"), prod("MONEDA"), rango, prod("ALMACEN"))
                            resb.AppendFormat("<td class='colorColumna'><input type='text' class='prec' value='{0}' id='p_{1}_{2}_{3}_{4}_{5}' data-util='{6}'/></td>", precio, prod("CODIGO"), rang("CODIGO"), prod("MONEDA"), rango, prod("ALMACEN"), utilidad)
                            colorColumna = True

                        End If

                    End If
                Next
                'ACCIONES                
                resb.AppendFormat("<td class='dn center' style=' min-width: 85px !important;'><div id='divBtn_{0}'>", prod("CODIGO"))
                resb.AppendFormat("<a onclick=""CalcularPreciosCantidad('{0}','{1}')"" class='btn green btnCalcular' title='Calcular precio basado en Costo Promedio' style='margin:0px 2px 2px 0px;'><i class='fa fa-gears'></i></a>", prod("CODIGO"), prod("MONEDA"))
                resb.AppendFormat("<a onclick=""CalcularPreciosCantidad2('{0}','{1}')"" class='btn red btnCalcular2' title='Calcular precio basado en Precio Ultima Compra' style='margin:0px 2px 2px 0px;'><i class='fa fa-gears'></i></a>", prod("CODIGO"), prod("MONEDA"))
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

    Public Function GenerarTablaImprimir(ByVal dtRangos As DataTable, ByVal dtProds As DataTable) As String

        Dim nroRangos = dtRangos.Rows.Count
        Dim colorColumna As Boolean = True
        resb.Clear()

        resb.Append("<table id='tblPreciosImprimir' style='width: 100%;' align='center'  border='1'>")
        resb.Append("<thead>")
        resb.Append("<tr>")
        resb.Append("<th class='center'>CODIGO</th>") 'CODIGO ANTIGUO PRODUCTO
        resb.Append("<th class='center'>PRODUCTO</th>") 'PRODUCTO
        resb.Append("<th class='center'>MONEDA</th>") 'MONEDA        
        For Each row In dtRangos.Rows
            resb.AppendFormat("<th  class='center'>{0}</th>", row("NOMBRE").ToString)
        Next
        resb.Append("</tr>")
        resb.Append("<tr>")

        resb.Append("</tr>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
        'PRODUCTOS
        If dtProds IsNot Nothing Then
            Dim strPrecios As String = ""
            Dim count As Integer = 0
            For Each prod In dtProds.Rows
                count += 1
                Dim grupoPrecios As String() = prod("DATOS_PRECIOS").ToString.Split(",")

                resb.Append("<tr>")
                resb.AppendFormat("<td>{0}</td>", prod("CODIGO_ANTIGUO"))
                resb.AppendFormat("<td>{0}</td>", prod("DESC_ADM"))
                resb.AppendFormat("<td  class='center'>{0}</td>", prod("MONEDA_DESC_CORTA"))

                Dim utilidad, precio, rango As String
                colorColumna = True

                For Each rang In dtRangos.Rows
                    utilidad = ""
                    precio = ""
                    rango = ""
                    If grupoPrecios.Length >= 1 Then
                        For Each datoPrecio As String In grupoPrecios
                            Dim dato As String() = datoPrecio.ToString.Split("|") 'CODIGO FTVPRER(0)PRECIO(1)UTILIDAD(2)CODIGO_RANGO(3)
                            If dato(0).Equals(rang("CODIGO")) Then
                                precio = dato(1)
                                utilidad = dato(2)
                                'rango = dato(3)
                                Exit For
                            Else
                                utilidad = ""
                                precio = ""
                                'rango = rang("RANGO_INICIO")
                            End If
                        Next
                        resb.AppendFormat("<td style='text-align: right' >{0}</td>", If(precio = "", "", String.Format("{0:#,##0.00}", Decimal.Parse(precio))))

                    End If
                Next
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
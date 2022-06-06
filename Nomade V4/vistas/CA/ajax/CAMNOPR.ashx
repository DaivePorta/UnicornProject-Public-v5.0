<%@ WebHandler Language="VB" Class="CAMNOPR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CAMNOPR : Implements IHttpHandler


    Dim OPCION As String
    Dim USUARIO As String

    Dim SUBGRUP_CODE, CTLG_CODE, USUA_ID, DEPEND_CODE, DESC, CODE_EXIS, ESTADO_IND, GRUP_CODE, SCSL_CODE, TIPO_DOC_CODE As String

    Dim COMPRA_VENTA_CODE, ITEM As String
    Dim COMPRA_VENTA_NUM_SEQ_DOC, ITEM2 As String

    Dim p_NUM_SEQ_DOC, p_ORIGEN_CODE, p_ORIGEN_TIPO_DOC, p_ORIGEN_IMPORTE, p_DESTINO_CODE, p_DESTINO_TIPO_DOC, p_PERS_PIDM,
        p_CTLG_CODE, p_SCSL_CODE, p_COMPRA_VENTA_IND, p_MONTO_TOTAL, p_ESTADO_USO, p_USUA_ID, p_ESTADO_IND, p_SERIE, p_NUMERO As String

    Dim p_NOCC_CODE, p_NOCC_NUM_SEQ_DOC, p_PROD_CODE, p_UNME_CODE, p_CANTIDAD_DEVL, p_ORIGEN_PRECIO_UNIT,
        p_MONTO_SUBTOTAL, p_CANTIDAD_ORIGEN As String
    Dim p_ENTREGA_DESPACHO_ALMACEN, p_APLICA_DOC_REFERENCIA, CODIGO_DOC As String
    Dim p_CODIGO_CORRELATIVO As String

    Dim p_FECHA_EMISION, p_DETALLES, p_MONTO_IGV As String

    Dim ANULAC_ID, CMNT_ANULAC, DEVOLUCION_EFECTIVO, DEVOLUCION_DESPACHO, GENERICA_IND, p_IGV, p_COD_MOTIVO_NC As String

    Dim p_AJUSTE As Decimal

    Dim ncEmpresa As New Nomade.NC.NCEmpresa("Bn")
    Dim ncProvedor As New Nomade.NC.NCEProveedor("Bn")
    Dim ncCliente As New Nomade.NC.NCECliente("Bn")
    Dim ncSucursal As New Nomade.NC.NCSucursal("Bn")
    'Dim ncTipoDocumento As New Nomade.NC.NCTipoDC("Bn")
    Dim ncTipoDCEmpresa As New Nomade.NC.NCTipoDCEmpresa("Bn")
    Dim caNotaCredito As New Nomade.CA.NotaCredito("Bn")
    Dim ncFactura As New Nomade.NC.NCFactura("Bn")
    Dim gesPro As New Nomade.NM.NMGestionProductos("Bn")

    Dim dt As DataTable
    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array
    Dim p_AUTOAMORTIZAR As String
    Dim doc_origen_code As String
    Dim lista_tabla As String = ""
    Dim p_MES_PERIODO As String
    Dim p_ANIO_PERIODO As String
    Dim p_SI_NO As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        CTLG_CODE = context.Request("CTLG_CODE")
        USUA_ID = context.Request("USUA_ID")
        SCSL_CODE = context.Request("SCSL_CODE") 'Codigo establecimiento/sucursal
        TIPO_DOC_CODE = context.Request("TIPO_DOC_CODE")

        COMPRA_VENTA_CODE = context.Request("COMPRA_VENTA_CODE")
        COMPRA_VENTA_NUM_SEQ_DOC = context.Request("COMPRA_VENTA_NUM_SEQ_DOC")

        p_NUM_SEQ_DOC = context.Request("p_NUM_SEQ_DOC")
        p_ORIGEN_CODE = context.Request("p_ORIGEN_CODE")
        p_ORIGEN_TIPO_DOC = context.Request("p_ORIGEN_TIPO_DOC")
        p_ORIGEN_IMPORTE = context.Request("p_ORIGEN_IMPORTE")
        p_DESTINO_CODE = context.Request("p_DESTINO_CODE")
        p_DESTINO_TIPO_DOC = context.Request("p_DESTINO_TIPO_DOC")
        p_PERS_PIDM = context.Request("p_PERS_PIDM")
        p_CTLG_CODE = context.Request("p_CTLG_CODE")
        p_SCSL_CODE = context.Request("p_SCSL_CODE")
        p_COMPRA_VENTA_IND = context.Request("p_COMPRA_VENTA_IND")
        p_MONTO_TOTAL = context.Request("p_MONTO_TOTAL")
        p_ESTADO_USO = context.Request("p_ESTADO_USO")
        p_USUA_ID = context.Request("p_USUA_ID")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_SERIE = context.Request("p_SERIE")
        p_NUMERO = context.Request("p_NUMERO")
        'Detalles         
        p_NOCC_CODE = (context.Request("p_NOCC_CODE"))
        p_NOCC_NUM_SEQ_DOC = (context.Request("p_NOCC_NUM_SEQ_DOC"))
        p_PROD_CODE = (context.Request("p_PROD_CODE"))
        p_UNME_CODE = (context.Request("p_UNME_CODE"))
        p_CANTIDAD_DEVL = (context.Request("p_CANTIDAD_DEVL"))
        p_ORIGEN_PRECIO_UNIT = (context.Request("p_ORIGEN_PRECIO_UNIT"))
        p_MONTO_SUBTOTAL = (context.Request("p_MONTO_SUBTOTAL"))
        p_CANTIDAD_ORIGEN = (context.Request("p_CANTIDAD_ORIGEN"))
        p_ENTREGA_DESPACHO_ALMACEN = context.Request("p_ENTREGA_DESPACHO_ALMACEN")
        p_APLICA_DOC_REFERENCIA = context.Request("p_APLICA_DOC_REFERENCIA")
        CODIGO_DOC = context.Request("CODIGO_DOC")
        '
        p_CODIGO_CORRELATIVO = context.Request("p_CODIGO_CORRELATIVO")

        p_FECHA_EMISION = context.Request("p_FECHA_EMISION")
        p_DETALLES = context.Request("p_DETALLES")
        p_MONTO_IGV = context.Request("p_MONTO_IGV")
        p_MES_PERIODO = context.Request("p_MES_PERIODO")
        p_ANIO_PERIODO = context.Request("p_ANIO_PERIODO")

        'ANULACION
        ANULAC_ID = context.Request("ANULAC_ID")
        CMNT_ANULAC = vChar(context.Request("CMNT_ANULAC"))
        DEVOLUCION_EFECTIVO = context.Request("DEVOLUCION_EFECTIVO")
        DEVOLUCION_DESPACHO = context.Request("DEVOLUCION_DESPACHO")
        GENERICA_IND = context.Request("GENERICA_IND")
        p_IGV = context.Request("p_IGV")
        p_COD_MOTIVO_NC = context.Request("p_COD_MOTIVO_NC")
        p_AUTOAMORTIZAR = context.Request("p_AUTOAMORTIZAR")
        p_SI_NO = context.Request("p_SI_NO")
        doc_origen_code = context.Request("doc_origen_code")
        lista_tabla = context.Request("lista_tabla")

        p_AJUSTE = IIf(context.Request("p_AJUSTE") = Nothing, 0, IIf(context.Request("p_AJUSTE") = "", 0, context.Request("p_AJUSTE")))

        Try

            Select Case OPCION
                Case "0" 'lista empresas
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncEmpresa.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "1" 'lista sucursales
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncSucursal.ListarSucursal(CTLG_CODE, "", "A")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "2" 'lista proveedores
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncProvedor.ListarProveedor(0, "A", p_CTLG_CODE, "", "N")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "RAZON_SOCIAL", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""ID"" :" & """" & MiDataRow("ID").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""DNI"" :" & """" & MiDataRow("DNI").ToString & """,")
                            resb.Append("""RUC"" :" & """" & MiDataRow("RUC").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "3" 'lista notas de credito
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caNotaCredito.ListarNotaCredito("", "0", "", p_CTLG_CODE, p_SCSL_CODE, "", p_COMPRA_VENTA_IND, "", "", "", "", "", doc_origen_code)
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "4" 'lista documentos
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = ncTipoDCEmpresa.ListarTipoDCEmpresa("", p_CTLG_CODE, "", "", "", "", "E")
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DCTO_DESC_CORTA", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("DCTO_CODE").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("SUNAT_CODE").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DCTO_DESC").ToString & """,")
                            resb.Append("""DESCRIPCION_CORTA"" :" & """" & MiDataRow("DCTO_DESC_CORTA").ToString & """,")
                            resb.Append("""COMPRA_VENTA"" :" & """" & MiDataRow("COMPRA_VENTA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "5" 'lista documentos de compra
                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = caNotaCredito.ListarDocumentosCompra("", "", "", "", "", CTLG_CODE, SCSL_CODE, TIPO_DOC_CODE, USUA_ID)
                    res = GenerarTablaDocumentos(dt)

                Case "7" 'Lista detalles compra

                    dt = caNotaCredito.lista_detalle_dcto_pagar(COMPRA_VENTA_CODE, COMPRA_VENTA_NUM_SEQ_DOC, "")
                    If lista_tabla = "N" Then
                        context.Response.ContentType = "application/json; charset=utf-8"
                        If Not dt Is Nothing Then
                            res = Utilities.Datatable2Json(dt)
                        Else
                            res = "[]"
                        End If
                    Else
                        context.Response.ContentType = "application/text; charset=utf-8"

                        res = GenerarTablaDetallesCompra(dt)
                    End If


                Case "9" 'Registrar nota de credito '------------------------------------------------------------------------------- FALTA VERIFICAR ESAS ""
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim array As Array
                    array = caNotaCredito.CrearNotaCredito(p_NUM_SEQ_DOC, p_ORIGEN_CODE, p_ORIGEN_TIPO_DOC, p_ORIGEN_IMPORTE, p_DESTINO_CODE,
                                                           p_DESTINO_TIPO_DOC, p_PERS_PIDM, p_CTLG_CODE, p_SCSL_CODE, p_COMPRA_VENTA_IND,
                                                           p_MONTO_TOTAL, p_ESTADO_USO, p_USUA_ID, "A", p_SERIE, p_NUMERO, p_ENTREGA_DESPACHO_ALMACEN, "", p_CODIGO_CORRELATIVO,
                                                           Utilities.fechaLocal(p_FECHA_EMISION), p_MONTO_IGV, p_DETALLES, p_ANIO_PERIODO,
                                                           p_MES_PERIODO, p_IGV, p_COD_MOTIVO_NC, p_SI_NO, "0", "0", "0", "0", p_AUTOAMORTIZAR, p_AJUSTE)
                    If Not (array Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & array(0).ToString & """,")
                        resb.Append("""SECUENCIA"" :" & """" & array(1).ToString & """,")
                        resb.Append("""ERROR"" :" & """" & array(2).ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "10" 'Registrar detalle nota de credito
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = caNotaCredito.CrearDetalleNotaCredito(p_NOCC_CODE, p_NOCC_NUM_SEQ_DOC, p_PROD_CODE, p_UNME_CODE, p_CANTIDAD_DEVL,
                                                              p_ORIGEN_PRECIO_UNIT, p_MONTO_SUBTOTAL, p_CTLG_CODE, p_SCSL_CODE,
                                                              p_ORIGEN_IMPORTE, p_USUA_ID, "A", p_CANTIDAD_ORIGEN)
                Case "11" 'Lista detalles notaCredito

                    dt = caNotaCredito.ListarDetallesNotaCredito(p_NOCC_CODE, p_NOCC_NUM_SEQ_DOC, "0")
                    If lista_tabla = "N" Then
                        context.Response.ContentType = "application/json; charset=utf-8"
                        If Not dt Is Nothing Then
                            res = Utilities.Datatable2Json(dt)
                        Else
                            res = "[]"
                        End If
                    Else
                        context.Response.ContentType = "application/text; charset=utf-8"
                        res = GenerarTablaDetallesNotaCredito(dt)
                    End If

                Case "12" 'lista documentos de compra obtener serie y numero
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = caNotaCredito.ListarDocumentosCompra(CODIGO_DOC, "", "", "", "", CTLG_CODE, "", "", "")
                    If Not (dt Is Nothing) Then
                        Dim serie_numero As String() = dt.Rows(0)("NUM_DCTO").ToString().Split(New Char() {"-"})
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""SERIE"" :" & """" & serie_numero(0) & """,")
                            resb.Append("""NUMERO"" :" & """" & serie_numero(1) & """,")
                            resb.Append("""SECUENCIA"" :" & """" & MiDataRow("SECUENCIA").ToString & """,")
                            resb.Append("""TIPO_DCTO"" :" & """" & MiDataRow("TIPO_DCTO").ToString & """,")
                            resb.Append("""DESC_DCTO"" :" & """" & MiDataRow("DESC_DCTO").ToString & """,")
                            resb.Append("""EMISION"" :" & """" & MiDataRow("EMISION").ToString & """,")
                            resb.Append("""NUM_DCTO"" :" & """" & MiDataRow("NUM_DCTO").ToString & """,")
                            resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """,")
                            resb.Append("""SIMBOLO_MONEDA"" :" & """" & MiDataRow("SIMBOLO_MONEDA").ToString & """,")
                            resb.Append("""MONEDA"" :" & """" & MiDataRow("MONEDA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "DEUDA" 'LISTAR DEUDA DOCUMENTO DE ORIGEN
                    context.Response.ContentType = "application/text; charset=utf-8"
                    Dim cpCuentaPorPagar As New Nomade.CP.CPCuentaPorPagar("Bn")
                    dt = cpCuentaPorPagar.ListarDeudasConProveedor(p_CTLG_CODE, "", "A", p_PERS_PIDM)
                    Dim deuda As String = ""
                    For Each row As DataRow In dt.Rows
                        If row("CODIGO") = p_ORIGEN_CODE Then
                            If row("ES_MONEDA_BASE").ToString = "S" Then
                                deuda = row("POR_PAGAR_BASE").ToString
                            Else
                                deuda = row("POR_PAGAR_ALTER").ToString
                            End If
                        End If
                    Next
                    If deuda = "" Then
                        deuda = "NO_ENCONTRADO"
                    End If
                    res = deuda
                Case "ANULAR" 'ANULAR NOTA DE CREDITO PROVEEDOR
                    context.Response.ContentType = "application/text; charset=utf-8"
                    res = caNotaCredito.AnularNotaCreditoProveedor(p_NOCC_CODE, ANULAC_ID, CMNT_ANULAC,
                                                       If(DEVOLUCION_EFECTIVO = Nothing, "N", DEVOLUCION_EFECTIVO),
                                                       If(DEVOLUCION_DESPACHO = Nothing, "N", DEVOLUCION_DESPACHO),
                                                       If(GENERICA_IND = Nothing, "N", GENERICA_IND))
                Case Else

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try

    End Sub

    'Tabla de busqueda de documentos    
    Public Function GenerarTablaDocumentos(ByVal dtDocumentoCompraVenta As DataTable) As String

        res = ""
        resb.Clear()
        '------
        resb.Append("<table id=""tblBuscarDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.Append("<thead>")
        resb.Append("<th>CÓDIGO</th>")
        resb.Append("<th>SERIE</th>")
        resb.Append("<th>NRO</th>")
        resb.Append("<th>EMISIÓN</th>")
        resb.Append("<th>DCTO</th>")
        resb.Append("<th>MODO PAGO</th>")
        resb.Append("<th>MONTO</th>")
        'resb.Append("<th>PAGADO</th>")
        'resb.Append("<th>CAJA</th>")
        'resb.Append("<th>DESPACHADO</th>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
        If Not (dt Is Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                If dt.Rows(i)("COMPLETO").ToString = "COMPLETO" And dt.Rows(i)("ANULADO").ToString = "NO ANULADO" Then
                    If Double.Parse(dt.Rows(i)("MONTO_SIN_NOTAS").ToString) > 0 Or dt.Rows(i)("NOTA_CREDITO_IND").ToString = "N" Then
                        'VALIDA QUE LA FECHA DE EMISION DE LA NOTA DE CREDITO SEA MENOR O IGUAL AL DOCUMENTO DE ORIGEN
                        Dim continuar As Boolean = False
                        If p_FECHA_EMISION <> "" And dt.Rows(i)("EMISION").ToString() <> "" Then
                            Dim fechaConsultada As Integer = Integer.Parse(ObtenerFecha(p_FECHA_EMISION))
                            Dim fechaEvaluar As Integer = Integer.Parse(ObtenerFecha(dt.Rows(i)("EMISION").ToString()))
                            If fechaConsultada >= fechaEvaluar Then
                                continuar = True
                            End If
                        End If
                        If continuar Then
                            Dim serie_numero As String() = dt.Rows(i)("NUM_DCTO").ToString().Split(New Char() {"-"})
                            Dim fechaEmision As String = If(dt.Rows(i)("EMISION").ToString() = "", "", dt.Rows(i)("EMISION").ToString().Substring(0, 10))
                            resb.AppendFormat("<tr class='doc_fila' onclick=""setSeleccionDocumento('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}', '{13}' ,'{14}', '{15}')"" id='doc_fila_{0}_{1}'>",
                                              dt.Rows(i)("CODIGO").ToString(), dt.Rows(i)("SECUENCIA").ToString(), serie_numero(0), serie_numero(1), dt.Rows(i)("TIPO_DCTO").ToString(), dt.Rows(i)("IMPORTE").ToString(), dt.Rows(i)("MONEDA").ToString(), dt.Rows(i)("SIMBOLO_MONEDA").ToString(), dt.Rows(i)("INC_IGV_IND").ToString(), fechaEmision, Double.Parse(dt.Rows(i)("IMPORTE_PAGAR").ToString) - Double.Parse(dt.Rows(i)("PERCEPCION").ToString), Double.Parse(dt.Rows(i)("MONTO_SIN_NOTAS").ToString), dt.Rows(i)("NOTA_CREDITO_IND"), dt.Rows(i)("MODO_PAGO"), dt.Rows(i)("MONTO_NOTA_CRED"), dt.Rows(i)("TIPO_OPERACION").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CODIGO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(0))
                            resb.AppendFormat("<td align='center' >{0}</td>", serie_numero(1))
                            resb.AppendFormat("<td align='center' >{0}</td>", fechaEmision)
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_DCTO").ToString())
                            resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MOPA_DESC").ToString())
                            resb.AppendFormat("<td align='center' style='text-align:center;' >{0}</td>", dt.Rows(i)("SIMBOLO_MONEDA").ToString() + " " + dt.Rows(i)("IMPORTE").ToString())
                            'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PAGADO_DESC").ToString())
                            'resb.AppendFormat("<td align='center' >{0}</td>", Replace(dt.Rows(i)("CAJA").ToString(), "CAJA ", ""))
                            'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESPACHO_DESC"))

                            resb.Append("</tr>")
                        End If
                    End If
                End If
            Next
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        res = resb.ToString()
        Return res
    End Function

    'Tabla para los detalles de una compra venta, contiene los productos y cantidad 
    Public Function GenerarTablaDetallesCompra(ByVal dtDetallesCompra As DataTable) As String

        res = ""
        resb.Clear()
        '------
        resb.Append("<table id=""tblDetallesCompraVenta"" class=""display DTTT_selectable"" border=""0"">")
        resb.Append("<thead style='color:white;background-color:rgb(75, 135, 184);'>")
        resb.Append("<th>CÓDIGO<br/>PRODUCTO</th>")
        resb.Append("<th>PRODUCTO</th>")
        resb.Append("<th>UNIDAD<br/>MEDIDA</th>")
        resb.Append("<th>PRECIO<br/>UNITARIO</th>")
        resb.Append("<th>CANT.<br/>SOLICITADA</th>")
        resb.Append("<th>CANT.<br/>RECIBIDA</th>")
        resb.Append("<th>CANT.<br/>DEVOLUCIÓN</th>")
        resb.Append("<th>SERIADOS</th>")
        resb.Append("</thead>")
        resb.Append("<tbody>")
        Dim hfCantDetalles As String
        If (dt Is Nothing) Then
            hfCantDetalles = " <input id=""hfCantDetalles0"" value=""0"" type=""hidden"" />"
        Else
            hfCantDetalles = dt.Rows.Count.ToString()

            For i As Integer = 0 To dt.Rows.Count - 1
                'Dim dtProd As New DataTable
                'dtProd = gesPro.LISTAR_PRODUCTO(dt.Rows(i)("PRODUCTO").ToString(), "", "", "", "", "")

                Dim hf As New StringBuilder
                hf.AppendFormat("<input id='hfDetalle{0}_prod' value='{1}' type='hidden' />", i, dt.Rows(i)("PRODUCTO").ToString())
                hf.AppendFormat("<input id='hfDetalle{0}_um' value='{1}' type='hidden' />", i, dt.Rows(i)("UNIDAD").ToString())
                hf.AppendFormat("<input id='hfDetalle{0}_pu' value='{1}' type='hidden' />", i, dt.Rows(i)("PRECIO").ToString())
                hf.AppendFormat("<input id='hfDetalle{0}_imp' value='{1}' type='hidden' />", i, dt.Rows(i)("TOTAL_BRUTO").ToString())
                hf.AppendFormat("<input id='hfDetalle{0}_cant'value='{1}'  type='hidden' />", i, dt.Rows(i)("CANTIDAD_DESPACHADA").ToString())
                hf.AppendFormat("<input id='hfDetalle{0}_item' value='{1}' type='hidden' />", i, dt.Rows(i)("ITEM").ToString())
                hf.AppendFormat("<input id='hfCantDetalles{0}' value='{1}' type='hidden' />", i, hfCantDetalles)

                resb.AppendFormat("<tr class='det_fila'  id='det_fila_{0}_{1}'>", dt.Rows(i)("FACC_CODE").ToString(), dt.Rows(i)("PRODUCTO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("PROD_CODE_ANTIGUO").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_ADM").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_UNIDAD").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", Math.Round(Decimal.Parse(dt.Rows(i)("PRECIO")), 2).ToString())
                'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CANTIDAD").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD").ToString), 2))
                'resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CANTIDAD_DESPACHADA").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD_DESPACHADA").ToString), 2))
                'resb.AppendFormat("<td align='center' ><input id='txtDevolucion_{1}' class='inputDevolucion' onkeypress='return ValidaDecimales(event,this)' onkeyup=""ValidaCantidadOrigen(this,'{0}')"" value='{0}' type='number' max='{0}' min='0' disabled='disabled' style='text-align:center;'>{2}</td>", dt.Rows(i)("CANTIDAD_DESPACHADA").ToString(), i.ToString(), hf.ToString())

                Dim sCantidad As String = FormatNumber(CDbl(dt.Rows(i)("CANTIDAD_DESPACHADA").ToString), 2)
                sCantidad = sCantidad.Replace(",", "")
                resb.AppendFormat("<td align='center' ><input id='txtDevolucion_{1}' class='inputDevolucion' onkeypress='return ValidaDecimales(event,this)' onkeyup=""ValidaCantidadOrigen(this,'{0}')"" value='{0}' type='number' max='{0}' min='0' disabled='disabled' style='text-align:center;'>{2}</td>", sCantidad, i.ToString(), hf.ToString())

                If dt.Rows(i)("SERIADO_IND") = "S" And Not dt.Rows(i)("PRODUCTO").ToString().Contains("M") Then
                    Dim dtProdAlmacen As New DataTable
                    Dim naTipoMovimiento = New Nomade.NA.NATipoMovimiento("Bn")
                    dtProdAlmacen = naTipoMovimiento.lista_detalle_dcto_almacen("", "", dt.Rows(i)("FACC_CODE").ToString())
                    Dim productos As String = ""
                    Dim nroProds As Integer = 0
                    If Not (dtProdAlmacen Is Nothing) Then
                        For Each prod In dtProdAlmacen.Rows
                            If prod("MCDR_CODE") <> "" And prod("PROD_CODE") = dt.Rows(i)("PRODUCTO").ToString() Then
                                nroProds += 1
                                If nroProds > Decimal.Parse(dt.Rows(i)("CANTIDAD_DESPACHADA").ToString()) Then
                                    productos += "<option value='" + prod("MCDR_CODE") + "'>" + prod("NRO_SERIE") + "</option>"
                                Else
                                    productos += "<option value='" + prod("MCDR_CODE") + "' selected='selected'>" + prod("NRO_SERIE") + "</option>"
                                End If

                            End If
                        Next
                    End If

                    'resb.AppendFormat("<td align='center' ><select id='cboDevolucion_{1}' class='span12 cboDevolucion' disabled='disabled'  multiple='multiple' data-placeholder='Seriados' style='display: none;'>{2}</select></td>", dt.Rows(i)("CANTIDAD_DESPACHADA").ToString(), i.ToString(), productos)
                    resb.AppendFormat("<td align='center' ><select id='cboDevolucion_{1}' class='span12 cboDevolucion' disabled='disabled'  multiple='multiple' data-placeholder='Seriados' style='display: none;'>{2}</select></td>", FormatNumber(CDbl(dt.Rows(i)("CANTIDAD_DESPACHADA").ToString), 2), i.ToString(), productos)
                Else
                    resb.Append("<td></td>")
                End If

                resb.Append("</tr>")
            Next
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")
        res = resb.ToString()
        Return res
    End Function


    Function GenerarTablaDetallesNotaCredito(ByVal dt As DataTable) As String

        res = ""
        resb.Clear()
        Dim total_parcial As Boolean = True
        Dim totalDevolucion As Decimal = 0

        '------
        resb.Append("<table id=""tblDetallesCompraVenta"" class=""display DTTT_selectable"" border=""0"">")
        resb.Append("<thead style='color:white;background-color:rgb(75, 135, 184);'>")
        resb.Append("<th>CÓDIGO<br/>PRODUCTO</th>")
        resb.Append("<th>PRODUCTO</th>")
        resb.Append("<th>UNIDAD<br/>MEDIDA</th>")
        resb.Append("<th>PRECIO<br/>UNITARIO</th>")
        resb.Append("<th>CANT. ORIGEN<br/> RECIBIDA</th>")
        resb.Append("<th>SUBTOTAL<br/>ORIGEN</th>")
        resb.Append("<th>CANT.<br/>DEVOLUCIÓN</th>")
        resb.Append("<th>SUBTOTAL<br/>DEVOLUCIÓN</th>")
        resb.Append("<th>SERIADOS</th>")
        resb.Append("</thead>")
        resb.Append("<tbody>")

        Dim hfCantDetalles As String
        If (dt Is Nothing) Then
            hfCantDetalles = " <input id=""hfCantDetalles0"" value=""0"" type=""hidden"" />"
        Else
            hfCantDetalles = dt.Rows.Count.ToString()

            For i As Integer = 0 To dt.Rows.Count - 1

                If Decimal.Parse(dt.Rows(i)("CANTIDAD_DEVL").ToString()) <> 0 Then
                    'dt.PRODUCTO = FARFACD_PROD_CODE
                    'dt.UNIDAD= Codigo de UM
                    'dt.FACC_CODE= Codigo del documento de compraventa
                    Dim hf As New StringBuilder
                    hf.AppendFormat("<input id='hfDetalle{0}_prod' value='{1}' type='hidden' />", i, dt.Rows(i)("PRODUCTO").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_um' value='{1}' type='hidden' />", i, dt.Rows(i)("UNIDAD").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_pu' value='{1}' type='hidden' />", i, dt.Rows(i)("PU").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_imp' value='{1}' type='hidden' />", i, dt.Rows(i)("ORIGEN_IMPORTE").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_cant' value='{1}' type='hidden' />", i, dt.Rows(i)("CANTIDAD_DEVL").ToString())
                    hf.AppendFormat("<input id='hfDetalle{0}_item' value='{1}' type='hidden' />", i, dt.Rows(i)("ITEM").ToString())
                    hf.AppendFormat("<input id='hfCantDetalles{0}' value='{1}' type='hidden' />", i, hfCantDetalles)

                    resb.AppendFormat("<tr class='det_fila'  id='det_fila_{0}_{1}'>", dt.Rows(i)("NOCC_CODE").ToString(), dt.Rows(i)("PRODUCTO").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("COD_PROD_ANT").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_PRODUCTO_DCTO").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("DESC_UNIDAD").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", Math.Round(Decimal.Parse(dt.Rows(i)("PU")), 2).ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("CANTIDAD_ORIGEN").ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("ORIGEN_IMPORTE").ToString())
                    resb.AppendFormat("<td align='center' >{0}{1}</td>", dt.Rows(i)("CANTIDAD_DEVL").ToString(), hf.ToString())
                    resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("MONTO_SUBTOTAL").ToString())

                    If dt.Rows(i)("NROS_MCDR").ToString() <> "" Then
                        Dim nros As String()
                        Dim cods As String()
                        Dim productos As String = ""
                        Dim separador As String = ", "
                        nros = Split(dt.Rows(i)("NROS_MCDR").ToString(), ",")
                        cods = Split(dt.Rows(i)("CODS_MCDR").ToString(), ",")
                        For index = 0 To nros.Length - 1
                            If index = nros.Length - 1 Then
                                productos += nros(index)
                            Else
                                productos += nros(index) + ", "
                            End If
                        Next
                        'resb.AppendFormat("<td align='center'><select id='cboDevolucion_{0}' class='span12 cboDevolucion'  multiple='multiple' data-placeholder='Seriados' style='display: none;'>{1}</select></td>", i.ToString(), productos)
                        resb.AppendFormat("<td align='center'>{1}</td>", i.ToString(), productos)
                    Else
                        resb.Append("<td></td>")
                    End If

                    resb.AppendFormat("</tr>")
                    If Not (Decimal.Parse(dt.Rows(i)("CANTIDAD_ORIGEN").ToString()) = Decimal.Parse(dt.Rows(i)("CANTIDAD_DEVL").ToString())) Then
                        total_parcial = False
                    End If

                    totalDevolucion += Decimal.Parse(dt.Rows(i)("MONTO_SUBTOTAL").ToString())
                End If

            Next
        End If
        resb.Append("</tbody>")
        resb.Append("</table>")

        resb.AppendFormat("<input id='total_parcial' type='hidden' value='{0}'>", total_parcial)
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

End Class
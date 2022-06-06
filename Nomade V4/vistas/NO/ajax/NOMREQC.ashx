<%@ WebHandler Language="VB" Class="NOMREQC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NOMREQC : Implements IHttpHandler
    Dim OPCION, CANTIDAD_DES_ANT, EST_COTI As String
    Dim CODE_PRODUCTO, ITEM, IND_REQ, CODE_REQ, SCSL_CODE, CTLG_CODE, CODE_REQ_USUA, CANTIDAD_DES, CANTIDAD_PED, DATA, FECHA_TRAN, NOMBRE_REQ, USUA_ID As String
    Dim ACCION As String
    Dim CANTIDAD As Integer
    Dim dt As DataTable


    Dim res As String
    Dim resb As New StringBuilder


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")
        CODE_PRODUCTO = context.Request("CODE_PRODUCTO")
        ITEM = context.Request("ITEM")
        CODE_REQ = context.Request("CODE_REQ")
        CTLG_CODE = context.Request("CTLG_CODE")
        SCSL_CODE = context.Request("SCSL_CODE")
        CANTIDAD_DES = context.Request("CANTIDAD_DES")
        CANTIDAD_PED = context.Request("CANTIDAD_PED")

        DATA = context.Request("DATA")
        NOMBRE_REQ = context.Request("NOMBRE_REQ")
        FECHA_TRAN = context.Request("FECHA_TRAN")
        USUA_ID = context.Request("USUA_ID")
        CODE_REQ_USUA = context.Request("CODE_REQ_USUA")
        CANTIDAD_DES_ANT = context.Request("CANTIDAD_DES_ANT")
        IND_REQ = context.Request("IND_REQ")
        EST_COTI = context.Request("EST_COTI")
        ACCION = context.Request("ACCION")
        CANTIDAD = IIf(context.Request("CANTIDAD") = Nothing, 0, IIf(context.Request("CANTIDAD") = "", 0, context.Request("CANTIDAD")))


        Select Case OPCION

            Case "L" ' lista el REQ AREA USUA DETALLES
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
                dt = CORegistroCompras.Listar_Req_Usua_Detalle("", IIf(CTLG_CODE = Nothing, "", CTLG_CODE), IIf(SCSL_CODE = Nothing, "", SCSL_CODE), Nothing, "", "A", CODE_PRODUCTO, "HIJOS")
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO_REQ"":""" & row("CODIGO_REQ").ToString & """,")
                        resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                        resb.Append("""COD"":""" & row("COD").ToString & """,")
                        resb.Append("""PRODUCTO_CODE"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""COD_PROD_ANTIGUO"":""" & row("COD_PROD_ANTIGUO").ToString & """,")
                        resb.Append("""DETRACCION"":""" & row("DETRACCION").ToString & """,")
                        resb.Append("""IND_SERIE"":""" & row("IND_SERIE").ToString & """,")
                        resb.Append("""COD_UNME"":""" & row("COD_UNME").ToString & """,")
                        resb.Append("""PRODUCTO"":""" & row("PRODUCTO").ToString & """,")
                        resb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """,")
                        resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                        resb.Append("""CANTIDAD_PEDIDA"":""" & row("CANTIDAD_PEDIDA").ToString & """,")
                        resb.Append("""TIPO_REQ"":""" & row("TIPO_REQ").ToString & """,")
                        resb.Append("""CC_COSTO"":""" & row("CC_COSTO").ToString & """,")
                        resb.Append("""PRIORIDAD"":""" & row("PRIORIDAD").ToString & """,")
                        resb.Append("""CANTIDAD_DESPACHADA"":""" & row("CANTIDAD_DESPACHADA").ToString & """")
                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
                CORegistroCompras = Nothing
            Case "9" ' lista el REQ AREA USUA CABECERA
                'context.Response.ContentType = "application/json; charset=utf-8"
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
                dt = CORegistroCompras.Listar_Req_Usua_Detalle("", CTLG_CODE, SCSL_CODE, Nothing, "", "A", "", "PADRES") 'CTLG_CODE,SCSL_CODE
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""FECHA"":""" & row("FECHA").ToString & """,")
                        resb.Append("""PRODUCTO"":""" & row("PRODUCTO").ToString & """,")
                        resb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """,")
                        resb.Append("""COD_UNME"":""" & row("COD_UNME").ToString & """,")
                        resb.Append("""STOCK"":""" & row("STOCK").ToString & """,")

                        resb.Append("""CANTIDAD_PEDIDA"":""" & row("CANTIDAD_PEDIDA").ToString & """,")
                        resb.Append("""INDICA_COMPLETADOS"":""" & row("INDICA_COMPLETADOS").ToString & """,")
                        resb.Append("""CANTIDAD_DESPACHADA"":""" & row("CANTIDAD_DESPACHADA").ToString & """,")
                        resb.Append("""DESC_UNME"":""" & row("DESC_UNME").ToString & """")
                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
                CORegistroCompras = Nothing

            Case "99" ' lista REQ A DESPACHAR
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
                dt = CORegistroCompras.Listar_Req_Usua_Detalle("", CTLG_CODE, SCSL_CODE, Nothing, "", "A", "", "PADRES") 'CTLG_CODE,SCSL_CODE
                If Not (dt Is Nothing) Then
                    Dim dt_nuevo As New DataTable
                    Dim filtro = "CANTIDAD_DESPACHADA > 0"
                    Dim results As DataRow() = dt.Select(filtro)
                    If results.Length > 0 Then
                        dt_nuevo = dt.Clone()
                        'dt_nuevo.Rows.Add(results.CopyToDataTable())
                        dt_nuevo = results.CopyToDataTable()

                    End If
                    res = Utilities.Datatable2Json(dt_nuevo)
                Else
                    res = "[]"
                End If

                CORegistroCompras = Nothing
            Case "100" ' lista REQ A PEDIR
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
                dt = CORegistroCompras.Listar_Req_Usua_Detalle("", CTLG_CODE, SCSL_CODE, Nothing, "", "A", "", "PADRES") 'CTLG_CODE,SCSL_CODE
                If Not (dt Is Nothing) Then
                    Dim dt_nuevo As New DataTable
                    Dim filtro = "CANTIDAD_PEDIDA > 0"
                    Dim results As DataRow() = dt.Select(filtro)
                    If results.Length > 0 Then
                        dt_nuevo = dt.Clone()
                        dt_nuevo = results.CopyToDataTable()

                    End If
                    res = Utilities.Datatable2Json(dt_nuevo)
                Else
                    res = "[]"
                End If

                CORegistroCompras = Nothing
            Case "11" ' lista el REQ compra
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
                dt = CORegistroCompras.Listar_Req_compra_detalle(CODE_REQ_USUA, "A", "", "PADRES", "", "", "")
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""COD_PROD"":""" & row("COD_PROD").ToString & """,")
                        resb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """,")
                        resb.Append("""COD_UNME"":""" & row("COD_UNME").ToString & """,")
                        resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                        resb.Append("""PROD_DESC"":""" & row("PROD_DESC").ToString & """,")
                        resb.Append("""UNME_DESC"":""" & row("UNME_DESC").ToString & """,")
                        resb.Append("""PRECIO"":""" & row("PRECIO").ToString & """,")
                        resb.Append("""REQ_USUA_COD"":""" & row("REQ_USUA_COD").ToString & """")

                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
                CORegistroCompras = Nothing
            Case "12" ' lista el REQ compra DETALLE 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
                dt = CORegistroCompras.Listar_Req_compra_detalle(CODE_REQ_USUA, "", CODE_PRODUCTO, "HIJOS", "", "", "")
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CANTIDAD"":""" & row("CANTIDAD").ToString & """,")
                        resb.Append("""CODIGO_REQ"":""" & row("CODIGO_REQ").ToString & """,")
                        resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                        resb.Append("""PROD_DESC"":""" & row("PROD_DESC").ToString & """")

                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
                CORegistroCompras = Nothing
            Case "133" ' lista el REQ compra cabecera 
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
                dt = CORegistroCompras.Listar_Req_compra_detalle(IIf(CODE_REQ = Nothing, "", CODE_REQ), "A", "", "99", IIf(CTLG_CODE = Nothing, "", CTLG_CODE), IIf(SCSL_CODE = Nothing, "", SCSL_CODE), "")

                If Not (dt Is Nothing) Then
                    res = Utilities.Datatable2Json(dt)
                Else
                    res = "[]"
                End If
                'res = resb.ToString()
                CORegistroCompras = Nothing
            Case "13" ' lista el REQ compra cabecera 
                'context.Response.ContentType = "application/json; charset=utf-8"
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
                dt = CORegistroCompras.Listar_Req_compra_detalle(IIf(CODE_REQ = Nothing, "", CODE_REQ), "A", "", "CABECERA", IIf(CTLG_CODE = Nothing, "", CTLG_CODE), IIf(SCSL_CODE = Nothing, "", SCSL_CODE), "")
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
                        resb.Append("""FECHA_TRAN"":""" & row("FECHA_TRAN").ToString & """,")
                        resb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                        resb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
                        resb.Append("""DESC_SCSL"":""" & row("DESC_SCSL").ToString & """,")
                        resb.Append("""COD_REQ"":" & """" & String.Empty & """,")
                        resb.Append("""DESC_CTLG"":""" & row("DESC_CTLG").ToString & """")

                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
                CORegistroCompras = Nothing
            Case "14" ' lista el REQ compra total 
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
                dt = CORegistroCompras.Listar_Req_compra_detalle("", "", "", "COTIZACION", IIf(CTLG_CODE = Nothing, "", CTLG_CODE), IIf(SCSL_CODE = Nothing, "", SCSL_CODE), IIf(EST_COTI = Nothing, "", EST_COTI))
                If Not dt Is Nothing Then
                    resb.Append("[")

                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""DESC_PRODUCTO"":""" & row("DESC_PRODUCTO").ToString & """,")
                        resb.Append("""CODIGO_PRODUCTO"":""" & row("CODIGO_PRODUCTO").ToString & """,")
                        resb.Append("""CANTIDAD_PEDIDA"":""" & row("CANTIDAD_PEDIDA").ToString & """,")
                        resb.Append("""PRECIO_"":""" & row("PRECIO").ToString & """,")
                        resb.Append("""COD_REQ"":" & """" & String.Empty & """,")
                        resb.Append("""PRECIO"":""" & row("PRECIO").ToString & """")


                        resb.Append("},")
                    Next

                    resb.Append("-")
                    resb.Replace("},-", "}")

                    resb.Append("]")
                End If
                res = resb.ToString()
                CORegistroCompras = Nothing
            Case "G" 'CREA SALIDAD ALMACEN
                context.Response.ContentType = "text/html"
                Crear_salidas_almacen(CTLG_CODE, SCSL_CODE, DATA, CODE_REQ, USUA_ID)
            Case "10" 'CREA REQ COMPRA
                'context.Response.ContentType = "text/html"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim cadena_REQ_compra = CrearReqCompra()
                Dim cad_IS_alamcen = CrearCad_IS_Almacen()

                Dim arrayCompra As Array
                Dim ResPedir As String = "-"
                Dim ResDespacho As String = "-"

                If cad_IS_alamcen <> "#" Then
                    If cad_IS_alamcen = "CANTIDAD" Then
                        ResDespacho = "CANTIDAD"
                    Else
                        Dim cod_req As String = cad_IS_alamcen.Split("#")(0)
                        Dim data As String = cad_IS_alamcen.Split("#")(1)
                        ResDespacho = Crear_salidas_almacen(CTLG_CODE, SCSL_CODE, data, cod_req, USUA_ID)
                    End If
                End If

                If cadena_REQ_compra <> "" And cadena_REQ_compra <> "}" Then
                    If cadena_REQ_compra = "CANTIDAD" Then
                        ResPedir = "CANTIDAD"
                    Else
                        arrayCompra = Crear_REQ_COMPRA(CTLG_CODE, SCSL_CODE, cadena_REQ_compra, NOMBRE_REQ, FECHA_TRAN, USUA_ID)
                        ResPedir = arrayCompra(1)
                    End If
                End If

                resb.Append("[")
                resb.Append("{")
                resb.Append("""RESPEDIDO"" :" & """" & ResPedir.ToString & """,")
                resb.Append("""RESDESPACHO"" :" & """" & ResDespacho.ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "15" 'CREA REQ COMPRA
                context.Response.ContentType = "text/html"
                Dim cadena_REQ_compra = CrearReqCompra()
                Dim cad_IS_alamcen = CrearCad_IS_Almacen()

                If cad_IS_alamcen = "#" And cadena_REQ_compra = "" Then
                    res = "1"
                End If
                If cad_IS_alamcen <> "#" And cadena_REQ_compra <> "" Then
                    'salida y req
                    res = "2"
                End If
                If cad_IS_alamcen <> "#" And cadena_REQ_compra = "" Then
                    'salidas
                    res = "3"
                End If
                If cad_IS_alamcen = "#" And cadena_REQ_compra <> "" Then
                    'req compra 
                    res = "4"
                End If
            Case "AT" 'ACTUALIZA REQ
                context.Response.ContentType = "text/html"
                res = Actualizar_req_compra_cantidades(Replace(CODE_PRODUCTO, "tblBandejaDetalle", "").ToString(), CODE_REQ, ITEM, CANTIDAD_DES, CANTIDAD_PED, CTLG_CODE, SCSL_CODE, CANTIDAD_DES_ANT, IND_REQ)

            Case "EREQ" 'ELIMINA REQ
                context.Response.ContentType = "text/html"
                Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
                res = CORegistroCompras.Eliminar_Req_Compra(ACCION, CTLG_CODE, SCSL_CODE, CODE_PRODUCTO, CANTIDAD)


            Case "LPXS" 'Lista Productos por Stock
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dt As New DataTable

                Dim NMGestionProd As New Nomade.NM.NMGestionProductos("Bn")
                dt = NMGestionProd.ListarStockxProducto(CODE_PRODUCTO, CTLG_CODE, SCSL_CODE)
                If dt Is Nothing Then
                    res = "{}"
                Else
                    res = Utilities.DataTableToJSON(dt)
                End If

            Case Else
        End Select
        context.Response.Write(res)
    End Sub








    Public Function CrearReqCompra() As String

        Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
        dt = CORegistroCompras.Listar_Req_Usua_Detalle("", CTLG_CODE, SCSL_CODE, Nothing, "", "A", "", "PADRES")
        ' dt = Nothing
        Dim productos_req As New DataTable
        Dim productos As New DataTable
        Dim cad_productos As String = ""
        Dim cadena_req As String = ""

        If Not dt Is Nothing Then


            productos = dt.Clone()
            For i As Integer = 0 To dt.Rows.Count - 1

                If Int(dt(i)("CANTIDAD_DESPACHADA")) > 0 Or Int(dt(i)("CANTIDAD_PEDIDA")) > 0 Then
                    productos.ImportRow(dt.Rows(i))
                    cad_productos += dt.Rows(i)("CODIGO").ToString + ","
                End If


            Next
            cad_productos += "$"
            cad_productos = cad_productos.Replace(",$", "")


            Dim dt_detalles As New DataTable
            If productos.Rows.Count > 0 Then
                dt_detalles = CORegistroCompras.Listar_Req_Usua_Detalle("", "", "", Nothing, "", "A", cad_productos, "HIJOS")
            End If


            If dt_detalles.Rows.Count > 0 Then


                productos_req = dt_detalles.Clone()
                For i As Integer = 0 To dt_detalles.Rows.Count - 1

                    If Int(dt_detalles(i)("CANTIDAD_PEDIDA")) <> 0 Then

                        If (Int(dt_detalles(i)("CANTIDAD_DESPACHADA")) + Int(dt_detalles(i)("CANTIDAD_PEDIDA"))) >= Int(dt_detalles(i)("CANTIDAD")) Then
                            productos_req.ImportRow(dt_detalles.Rows(i))
                        Else
                            Return "CANTIDAD"
                            Exit Function
                        End If

                    End If

                Next


                Dim lista As List(Of String)
                Dim lista_de_listas As New List(Of List(Of String))
                Dim lista_codigos As New List(Of String)
                Dim lista_indices As New List(Of String)



                For Each midata As DataRow In productos_req.Rows
                    If Not (lista_codigos.Contains(midata("CODIGO"))) Then
                        lista = New List(Of String)
                        lista.Add(midata("CODIGO")) '0
                        lista.Add(midata("CANTIDAD_PEDIDA")) '1
                        lista.Add(midata("CODIGO_REQ")) '2
                        lista.Add(midata("ITEM")) '3
                        lista.Add(midata("COD_UNME")) '4
                        lista.Add("A") '5

                        lista_de_listas.Add(lista)
                        lista_codigos.Add(midata("CODIGO"))
                        lista_indices.Add(lista_de_listas.Count - 1)
                    Else
                        lista = New List(Of String)
                        Dim indice As Integer = lista_codigos.IndexOf(midata("CODIGO"))
                        Dim indicelista As Integer = lista_indices.ElementAt(indice)

                        lista = lista_de_listas.ElementAt(indicelista)

                        Dim lista_aux As New List(Of String)

                        lista_aux.Add(lista.ElementAt(0))
                        lista_aux.Add(Int(lista.ElementAt(1)) + Int(midata("CANTIDAD_PEDIDA")))
                        lista_aux.Add(lista.ElementAt(2) & "." & midata("CODIGO_REQ"))
                        lista_aux.Add(lista.ElementAt(3) & "%" & midata("ITEM"))
                        lista_aux.Add(lista.ElementAt(4))
                        lista_aux.Add(lista.ElementAt(5) & "/" & "A")

                        lista_de_listas.Insert(indicelista, lista_aux)
                        lista_de_listas.RemoveAt(indicelista + 1)
                    End If
                Next




                For i As Integer = 0 To lista_de_listas.Count - 1


                    cadena_req += lista_de_listas(i)(0).ToString & "," &
                                  lista_de_listas(i)(4).ToString & "," &
                                  lista_de_listas(i)(2).ToString & "," & lista_de_listas(i)(5).ToString & "," & lista_de_listas(i)(3).ToString & "," &
                                  lista_de_listas(i)(1).ToString & ";"


                Next
                cadena_req += "}"
                cadena_req = cadena_req.Replace(";}", "")




            End If

        End If

        Return cadena_req
    End Function


    Public Function CrearCad_IS_Almacen() As String
        Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
        dt = CORegistroCompras.Listar_Req_Usua_Detalle("", CTLG_CODE, SCSL_CODE, Nothing, "", "A", "", "PADRES")
        '   dt = Nothing
        Dim productos_despacho As New DataTable
        Dim productos As New DataTable
        Dim cad_productos As String = ""
        Dim cad_IS_Alm As String = ""
        Dim cad_cod_req As String = ""
        Dim CadRespuesta As String = ""

        If Not dt Is Nothing Then




            productos = dt.Clone()
            For i As Integer = 0 To dt.Rows.Count - 1

                If Int(dt(i)("CANTIDAD_DESPACHADA")) > 0 Or Int(dt(i)("CANTIDAD_PEDIDA")) > 0 Then
                    productos.ImportRow(dt.Rows(i))
                    cad_productos += dt.Rows(i)("CODIGO").ToString & ","
                End If


            Next
            cad_productos += "$"
            cad_productos = cad_productos.Replace(",$", "")







            Dim dt_detalles As New DataTable
            If productos.Rows.Count > 0 Then
                dt_detalles = CORegistroCompras.Listar_Req_Usua_Detalle("", "", "", Nothing, "", "A", cad_productos, "HIJOS")
            End If




            If dt_detalles.Rows.Count > 0 Then


                productos_despacho = dt_detalles.Clone()
                For i As Integer = 0 To dt_detalles.Rows.Count - 1

                    If Int(dt_detalles(i)("CANTIDAD_DESPACHADA")) <> 0 Then

                        If (Int(dt_detalles(i)("CANTIDAD_DESPACHADA")) + Int(dt_detalles(i)("CANTIDAD_PEDIDA"))) >= Int(dt_detalles(i)("CANTIDAD")) Then
                            productos_despacho.ImportRow(dt_detalles.Rows(i))
                            cad_IS_Alm += dt_detalles.Rows(i)("CODIGO_REQ").ToString & "," &
                                          dt_detalles.Rows(i)("ITEM").ToString & "," &
                                          dt_detalles.Rows(i)("CODIGO").ToString & "," &
                                          "A," &
                                          dt_detalles.Rows(i)("CANTIDAD_DESPACHADA").ToString & "," &
                                          dt_detalles.Rows(i)("COD_PROD_ANTIGUO").ToString & "," &
                                          dt_detalles.Rows(i)("COD_UNME").ToString & "," &
                                          dt_detalles.Rows(i)("DETRACCION").ToString & "," &
                                          dt_detalles.Rows(i)("IND_SERIE").ToString & ";"

                        Else
                            Return "CANTIDAD"
                            Exit Function

                        End If

                    End If



                Next

                cad_IS_Alm += "@"
                cad_IS_Alm = cad_IS_Alm.Replace(";@", "")


                Dim lista As List(Of String)
                Dim lista_de_listas As New List(Of List(Of String))
                Dim lista_tipo_reqs As New List(Of String)
                Dim lista_codigos As New List(Of String)
                Dim lista_indices As New List(Of String)



                For Each midata As DataRow In productos_despacho.Rows
                    If lista_tipo_reqs.Contains(midata("TIPO_REQ")) Then

                        If Not (lista_codigos.Contains(midata("CODIGO_REQ"))) Then
                            lista = New List(Of String)
                            Dim indice As Integer = lista_tipo_reqs.IndexOf(midata("TIPO_REQ"))
                            Dim indicelista As Integer = lista_indices.ElementAt(indice)

                            lista = lista_de_listas.ElementAt(indicelista)

                            Dim lista_aux As New List(Of String)


                            lista_aux.Add(lista.ElementAt(0) & "," & midata("CODIGO_REQ"))
                            lista_aux.Add(lista.ElementAt(1) & "," & "NTS")
                            lista_aux.Add(lista.ElementAt(2))


                            lista_de_listas.Insert(indicelista, lista_aux)
                            lista_de_listas.RemoveAt(indicelista + 1)

                        End If




                    Else



                        lista = New List(Of String)
                        lista.Add(midata("CODIGO_REQ")) '0
                        lista.Add("NTS") '1
                        lista.Add(midata("TIPO_REQ")) '2


                        lista_de_listas.Add(lista)
                        lista_tipo_reqs.Add(midata("TIPO_REQ"))
                        lista_codigos.Add(midata("CODIGO_REQ"))
                        lista_indices.Add(lista_de_listas.Count - 1)

                    End If
                Next



                For i As Integer = 0 To lista_de_listas.Count - 1
                    For j As Integer = 0 To lista_de_listas(i).Count - 1
                        cad_cod_req += lista_de_listas(i)(j) & ";"

                    Next
                    cad_cod_req += "%"
                    cad_cod_req = cad_cod_req.Replace(";%", "%")

                Next

                cad_cod_req += "$"
                cad_cod_req = cad_cod_req.Replace("%$", "")

                If cad_cod_req = "$" Then
                    cad_cod_req = ""
                End If
                If cad_IS_Alm = "@" Then
                    cad_IS_Alm = ""
                End If


                CadRespuesta = cad_cod_req & "#" & cad_IS_Alm
            End If



        End If


        Return CadRespuesta

    End Function




    Public Function Actualizar_req_compra_cantidades(ByVal p_COD_PRODUCTO As String, ByVal p_COD_REQ_AREA As String, ByVal p_ITEM As String, ByVal p_CANTIDAD_DESPACHADA As String, P_CANTIDAD_PEDIDA As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CANT_DESPACHADA_ANTERIOR As String, ByVal ind As String) As String
        Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
        Dim Datos(2) As String




        Dim dt As DataTable = CORegistroCompras.Devuelve_Stock_Producto(SCSL_CODE, CTLG_CODE, p_COD_PRODUCTO, "2")
        Dim stock = 0

        If Not dt Is Nothing Then
            stock = Int(dt(0)("STOCK").ToString)
        End If

        If Int(p_CANTIDAD_DESPACHADA) <> 0 Then
            If Int(p_CANTIDAD_DESPACHADA) > stock Or Int(p_CANTIDAD_DESPACHADA) < 0 Then
                Return "-1"
            End If
        End If





        Datos = CORegistroCompras.Actualizar_Req_Compra(p_COD_PRODUCTO, p_COD_REQ_AREA, p_ITEM, p_CANTIDAD_DESPACHADA, P_CANTIDAD_PEDIDA, p_CTLG_CODE, p_SCSL_CODE, p_CANT_DESPACHADA_ANTERIOR, ind)
        Dim respuesta As String
        respuesta = Datos(0).ToString() + "," + Datos(1).ToString() + "," + Datos(2).ToString()
        Return respuesta
        CORegistroCompras = Nothing

    End Function

    Public Function Crear_salidas_almacen(ByVal p_ctlg_code As String, ByVal p_scsl_code As String, ByVal p_detalle As String, ByVal p_CODE_REQ As String, ByVal p_USUA_ID As String) As String

        Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
        CORegistroCompras.Crear_Salidas_Almacen(p_ctlg_code, p_scsl_code, p_detalle, p_CODE_REQ, p_USUA_ID)
        Return "OK"
        CORegistroCompras = Nothing
    End Function

    Public Function Crear_REQ_COMPRA(ByVal p_ctlg_code As String, ByVal p_scsl_code As String, ByVal p_detalle As String, ByVal p_NOMBRE_REQ As String, ByVal p_FECHA_TRAN As String, ByVal p_USUA_ID As String) As Array
        Dim resp(1) As String
        Dim respCompra As String = ""
        Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
        respCompra = CORegistroCompras.Crear_req_compra(p_ctlg_code, p_scsl_code, p_detalle, p_NOMBRE_REQ, Utilities.fechaLocal(p_FECHA_TRAN), p_USUA_ID)
        resp(0) = respCompra
        resp(1) = "OK"

        Return resp
        CORegistroCompras = Nothing
    End Function



    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
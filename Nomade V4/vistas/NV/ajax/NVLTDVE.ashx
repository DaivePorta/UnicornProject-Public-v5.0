<%@ WebHandler Language="VB" Class="NVLTDVE" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NVLTDVE : Implements IHttpHandler

    Dim res As String
    Dim resb As New StringBuilder

    Dim CTLG_CODE, SCSL_CODE, TIPO_DCTO, RAZON_SOCIAL, DESDE, HASTA, FACC_CODE As String
    Dim DCTO As String
    Dim p_TIPO_DCTO, p_CODIGO_DCTO, p_CODIGO_ORIGEN, p_TIPO_IND, p_OPCIONAL_1, p_OPCIONAL_2 As String
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim OPCION As String

        Dim compra As New Nomade.NC.NCFactura("BN")

        Dim dt As DataTable

        Try
            OPCION = context.Request("OPCION")
            CTLG_CODE = context.Request("CTLG_CODE")
            SCSL_CODE = context.Request("SCSL_CODE")
            TIPO_DCTO = context.Request("TIPO_DCTO")
            RAZON_SOCIAL = context.Request("RAZON_SOCIAL")
            FACC_CODE = context.Request("FACC_CODE")
            DESDE = context.Request("txtDesde")
            HASTA = context.Request("txtHasta")


            'USADO PARA CONSULTA       
            DCTO = context.Request("DCTO")
            p_TIPO_DCTO = context.Request("p_TIPO_DCTO")
            p_CODIGO_DCTO = context.Request("p_CODIGO_DCTO")
            p_CODIGO_ORIGEN = context.Request("p_CODIGO_ORIGEN")
            p_TIPO_IND = context.Request("p_TIPO_IND")
            p_OPCIONAL_1 = context.Request("p_OPCIONAL_1")
            p_OPCIONAL_2 = context.Request("p_OPCIONAL_2")

            Select Case OPCION
                Case "DOCUMENTOS"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If TIPO_DCTO = "COTI" Then
                        Dim nvCotizacion As New Nomade.NV.NVCotizacion("Bn")
                        dt = nvCotizacion.ListarCotizacionCliente("", RAZON_SOCIAL, "", CTLG_CODE, SCSL_CODE, "", "", "", "", "")
                        If Not (dt Is Nothing) Then
                            resb.Append("[")
                            For Each MiDataRow As DataRow In dt.Rows
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                resb.Append("""NUM_DCTO"" :" & """" & MiDataRow("DCTO_SERIE").ToString & "-" & MiDataRow("DCTO_NRO").ToString & """,")
                                resb.Append("""EMISION"" :" & """" & MiDataRow("EMISION").ToString & """,")
                                resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")
                                resb.Append("},")
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                    ElseIf TIPO_DCTO = "OCCL" Then
                        Dim nvOrdenCompra As New Nomade.NV.NVOrdenCompra("Bn")
                        dt = nvOrdenCompra.ListarOrdenCompraCliente("", RAZON_SOCIAL, "", CTLG_CODE, SCSL_CODE, "", "", "", "", "")
                        If Not (dt Is Nothing) Then
                            resb.Append("[")
                            For Each MiDataRow As DataRow In dt.Rows
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                resb.Append("""NUM_DCTO"" :" & """" & MiDataRow("DCTO_SERIE").ToString & "-" & MiDataRow("DCTO_NRO").ToString & """,")
                                resb.Append("""EMISION"" :" & """" & MiDataRow("EMISION").ToString & """,")
                                resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")
                                resb.Append("},")
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                    ElseIf TIPO_DCTO = "SALIDA" Then 'solo ventas nacionales
                        dt = New Nomade.NA.NATipoMovimiento("BN").lista_dcto_almacen("", "", "", "", "", "S", CTLG_CODE, "", RAZON_SOCIAL, "")
                        If Not (dt Is Nothing) Then
                            resb.Append("[")
                            For Each MiDataRow As DataRow In dt.Rows
                                If MiDataRow("TMOV_CODE").ToString = "0001" Then
                                    resb.Append("{")
                                    resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                    If MiDataRow("COMPLETO").ToString = "COMPLETO" Then
                                        resb.Append("""NUM_DCTO"" :" & """" & MiDataRow("SERIE_DCTO_REGISTRO").ToString & "-" & MiDataRow("NRO_DCTO_REGISTRO").ToString & """,")
                                    Else
                                        resb.Append("""NUM_DCTO"" :" & """" & "NO COMPLETADO" & """,")
                                    End If
                                    resb.Append("""EMISION"" :" & """" & MiDataRow("FECHA_EMISION").ToString & """,")
                                    resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_DEST").ToString & """")
                                    resb.Append("},")
                                End If


                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                    Else
                        dt = New Nomade.NV.NVVenta("BN").ListarDocVenta_Busq("", RAZON_SOCIAL, "", TIPO_DCTO, "", "", "", "", "0000-00-00", "0000-00-00", CTLG_CODE, SCSL_CODE, "", "", "")
                        If Not (dt Is Nothing) Then
                            resb.Append("[")
                            For Each MiDataRow As DataRow In dt.Rows
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                                resb.Append("""NUM_DCTO"" :" & """" & MiDataRow("NUM_DCTO").ToString & """,")
                                resb.Append("""EMISION"" :" & """" & MiDataRow("EMISION").ToString & """,")
                                resb.Append("""RAZON_SOCIAL"" :" & """" & MiDataRow("RAZON_SOCIAL").ToString & """")
                                resb.Append("},")
                            Next
                            resb.Append("{}")
                            resb = resb.Replace(",{}", String.Empty)
                            resb.Append("]")
                        End If
                    End If
                    res = resb.ToString()
                Case "VER_FLUJO"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NV.NVVenta("BN").ListarDocumentosVenta(FACC_CODE, "", "", "", "", "", "", "", "")

                    resb.Append("")
                    If Not (dt Is Nothing) Then
                        resb.AppendFormat(" {{""name"":""{0}"",""url"":""?f=NVMDOCV&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""type"" : ""green"",", dt.Rows(0)("CODIGO").ToString, dt.Rows(0)("DOCUMENTO").ToString, dt.Rows(0)("DCTO_SERIE").ToString + "-" + dt.Rows(0)("DCTO_NRO").ToString)
                        resb.AppendFormat("""children"": [{0}] , ", ObtenerOrigenes(dt.Rows(0)("DCTO_CODE_REF").ToString, dt.Rows(0)("DCTO_TIPO_CODE_REF").ToString, dt.Rows(0)("CODIGO").ToString))
                        resb.AppendFormat("""parents"": [{0}] }} ", ObtenerDestinos(dt.Rows(0)("CODE_DCTO_DESTINO").ToString, dt.Rows(0)("TIPO_DCTO_DESTINO").ToString, dt.Rows(0)("CODIGO").ToString))
                    Else
                        resb.Append("[]")
                    End If

                    'EJEMPLO ESTATICO FUNCIONAL
                    'res = ""
                    'res += " { ""name"": ""V00000001"", ""url"" : ""?f=NVMDOCV&codigo=V00000001"", ""type"" : ""green"","
                    'res += " ""parents"": [ {  ""name"": ""Transparent_companies"", ""parents"": [ {  ""name"": ""Z00000002"", ""isparent"": true }], ""isparent"": true },"
                    'res += " {""name"": ""Z00000001"", ""isparent"": true } ],""children"": [ {""name"": ""Z00000003"",""isparent"": false,""children"": [ {""name"": ""V00000003"",""children"": [ {""name"": ""V00000004"",""isparent"": false }],""isparent"": false }] }, { ""name"": ""Airlines_by_continent"", ""isparent"": false },"
                    'res += " { ""name"": ""K00000001"",""isparent"": false }]}"

                    res = resb.ToString()
                Case "VER_FLUJO_2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New Nomade.NV.NVVenta("BN").ListarDocumentosVenta(FACC_CODE, "", "", "", "", "", "", "", "")
                    resb.Clear()
                    If Not (dt Is Nothing) Then
                        Dim datosRegistro As String = ""
                        If Not dt Is Nothing Then
                            datosRegistro = Utilities.Datatable2Json(dt)
                        Else
                            datosRegistro = "[]"
                        End If
                        resb.AppendFormat(" {{""CODIGO"":""{0}"",""DCTO"" :""VENTA"",""DATOS"" :{1},", dt.Rows(0)("CODIGO").ToString, datosRegistro)
                        resb.AppendFormat("""ORIGENES"": [{0}] , ", ObtenerOrigenes2(dt.Rows(0)("DCTO_CODE_REF").ToString, dt.Rows(0)("DCTO_TIPO_CODE_REF").ToString, dt.Rows(0)("CODIGO").ToString))
                        resb.AppendFormat("""DESTINOS"": [{0}] }} ", ObtenerDestinos2(dt.Rows(0)("CODE_DCTO_DESTINO").ToString, dt.Rows(0)("TIPO_DCTO_DESTINO").ToString, dt.Rows(0)("CODIGO").ToString))
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()

                Case "INFO_EXTRA" 'OBTIENE INFORMACION EXTRA ACERCA DE UN DOCUMENTO
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Select Case DCTO
                        Case "NOTA_CREDITO"
                            dt = New Nomade.NV.NVVenta("BN").ListarInfoextraTracking("NOTA_CREDITO", p_CODIGO_DCTO, p_CODIGO_ORIGEN, p_TIPO_IND, p_OPCIONAL_1, p_OPCIONAL_2)
                            If Not dt Is Nothing Then
                                res = Utilities.Datatable2Json(dt)
                            Else
                                res = "[]"
                            End If
                        Case "COBROS", "NOTA_DEBITO", "NAMINSA"
                            dt = New Nomade.NV.NVVenta("BN").ListarInfoextraTracking(DCTO, p_CODIGO_DCTO, p_CODIGO_ORIGEN, p_TIPO_IND, p_OPCIONAL_1, p_OPCIONAL_2)
                            If Not dt Is Nothing Then
                                res = Utilities.Datatable2Json(dt)
                            Else
                                res = "[]"
                            End If
                        Case "SALIDA", "OCCL", "COTI" 'DEVULEVE EL CODIGO DE LA VENTA A PARTIR DE UNA SALIDA DE ALMACEN, ORDEN DE COMPRA O COTIZACION
                            dt = New Nomade.NV.NVVenta("BN").ListarInfoextraTracking(DCTO, p_CODIGO_DCTO, p_CODIGO_ORIGEN, p_TIPO_IND, p_OPCIONAL_1, p_OPCIONAL_2)
                            If Not dt Is Nothing Then
                                res = Utilities.Datatable2Json(dt)
                            Else
                                res = "[]"
                            End If
                        Case Else

                    End Select
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try
    End Sub

    Private Function ObtenerOrigenes(ByVal DCTOS As String, ByVal TIPO_DCTO As String, ByVal PADRE As String) As String
        If DCTOS = "" Or DCTOS = Nothing Then
            Return ""
        Else
            Dim docs = DCTOS.Split(",")
            Dim origenes As String = ""
            Dim nombre As String = ""
            Dim c As Integer = 0
            Dim resb2 As New StringBuilder
            resb2.Clear()
            Select Case TIPO_DCTO
                Case "0027" 'ORDEN DE COMPRA CLIENTE------------------------------------                            
                    Dim nvOrdenCompra As New Nomade.NV.NVOrdenCompra("Bn")
                    For Each doc As String In docs
                        Dim data As DataTable = nvOrdenCompra.ListarOrdenCompraCliente(doc, "", "", "", "", "", "", "", "", "")
                        If Not data Is Nothing Then
                            resb2.AppendFormat("{{""name"":""{0}"",""url"":""?f=NVMOCCL&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""isparent"": false,", data.Rows(0)("CODIGO").ToString, "O/C CLIENTE", data.Rows(0)("DCTO_SERIE").ToString + "-" + data.Rows(0)("DCTO_NRO").ToString)
                            resb2.AppendFormat("""children"": [{0}] }} ", ObtenerOrigenes(data.Rows(0)("DCTO_CODE_REF").ToString, data.Rows(0)("DCTO_TIPO_CODE_REF").ToString, data.Rows(0)("CODIGO").ToString))
                            If docs.Length > 0 Then
                                If c <> docs.Length - 1 Then
                                    resb2.Append(",")
                                End If
                            End If
                        End If
                        c += 1
                    Next

                Case "0053" 'COTIZACION -----------------------------------------------
                    Dim nvCotizacion As New Nomade.NV.NVCotizacion("Bn")
                    For Each doc As String In docs
                        Dim data As DataTable = nvCotizacion.ListarCotizacionCliente(doc, "", "", "", "", "", "", "", "", "")
                        If Not data Is Nothing Then
                            resb2.AppendFormat("{{""name"":""{0}"",""url"":""?f=NVMCOTI&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""isparent"": false,", data.Rows(0)("CODIGO").ToString, "COTIZACION", data.Rows(0)("DCTO_SERIE").ToString + "-" + data.Rows(0)("DCTO_NRO").ToString)
                            resb2.AppendFormat("""children"": [{0}] }} ", ObtenerOrigenes(data.Rows(0)("DCTO_CODE_REF").ToString, data.Rows(0)("DCTO_TIPO_CODE_REF").ToString, data.Rows(0)("CODIGO").ToString))
                            If docs.Length > 0 Then
                                If c <> docs.Length - 1 Then
                                    resb2.Append(",")
                                End If
                            End If
                        End If
                        c += 1
                    Next
                    'Case "0009", "0050" 'GUIA SALIDA, REMISION REMITENTE---------------------                    
                    '    For Each doc As String In docs
                    '        Dim data As DataTable = New Nomade.NA.NATipoMovimiento("BN").busca_CAB_dcto_almacen(doc)
                    '        If Not data Is Nothing Then
                    '            resb2.AppendFormat("{{""name"":""{0}"",""url"":""?f=NAMINSA&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""isparent"": false,", data.Rows(0)("CODIGO").ToString, data.Rows(0)("DESC_TIPO_DCTO").ToString, data.Rows(0)("REQC_CODE").ToString + "-" + data.Rows(0)("REQC_NUM_SEQ_DOC").ToString)
                    '            resb2.AppendFormat("""children"": [{0}] }} ", ObtenerDestinos(data.Rows(0)("ORGN").ToString, data.Rows(0)("TIPO_DCTO_ORG").ToString, data.Rows(0)("CODIGO").ToString))
                    '            If docs.Length > 0 Then
                    '                If c <> docs.Length - 1 Then
                    '                    resb2.Append(",")
                    '                End If
                    '            End If
                    '        End If
                    '        c += 1
                    '    Next

            End Select
            origenes = resb2.ToString
            Return origenes
        End If
    End Function

    Private Function ObtenerDestinos(ByVal DCTOS As String, ByVal TIPO_DCTO As String, ByVal PADRE As String) As String
        If DCTOS = "" Or DCTOS = Nothing Then
            Return ""
        Else
            Dim docs = DCTOS.Split(",")
            Dim tiposDctos = TIPO_DCTO.Split(",")
            Dim origenes As String = ""
            Dim nombre As String = ""
            Dim c As Integer = 0
            Dim c2 As Integer = 0
            Dim resb2 As New StringBuilder
            For Each tipo As String In tiposDctos
                Select Case tipo
                    Case "0009", "0050" 'GUIA SALIDA, REMISION REMITENTE---------------------                    
                        Dim data As DataTable = New Nomade.NA.NATipoMovimiento("BN").busca_CAB_dcto_almacen(docs(c))
                        If Not data Is Nothing Then
                            If Not data Is Nothing Then
                                resb2.AppendFormat("{{""name"":""{0}"",""url"":""?f=NAMINSA&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""isparent"": true,", data.Rows(0)("CODIGO").ToString, data.Rows(0)("DESC_TIPO_DCTO").ToString, data.Rows(0)("REQC_CODE").ToString + "-" + data.Rows(0)("REQC_NUM_SEQ_DOC").ToString)
                                resb2.AppendFormat("""parents"": [{0}] }} ", ObtenerDestinos(data.Rows(0)("ORGN").ToString, data.Rows(0)("TIPO_DCTO_ORG").ToString, data.Rows(0)("CODIGO").ToString))

                            End If
                        End If
                    Case "0001", "0003", "0012" 'FACTURA, BOLETA TICKET DE NAMINSA--------------------- 
                        If docs(c).Substring(0, 1) = "A" Then
                            Dim data As DataTable = New Nomade.NA.NATipoMovimiento("BN").busca_CAB_dcto_almacen(docs(c))
                            If Not data Is Nothing Then
                                If Not data Is Nothing Then
                                    resb2.AppendFormat("{{""name"":""{0}"",""url"":""?f=NAMINSA&codigo={0}"",""documento"" :""{1}"",""numero"" :""{2}"",""isparent"": true,", data.Rows(0)("CODIGO").ToString, data.Rows(0)("DESC_TIPO_DCTO").ToString, data.Rows(0)("REQC_CODE").ToString + "-" + data.Rows(0)("REQC_NUM_SEQ_DOC").ToString)
                                    resb2.AppendFormat("""parents"": [{0}] }} ", ObtenerDestinos(data.Rows(0)("ORGN").ToString, data.Rows(0)("TIPO_DCTO_ORG").ToString, data.Rows(0)("CODIGO").ToString))
                                End If
                            End If
                        End If

                End Select
                If tiposDctos.Length > 0 Then
                    If c <> tiposDctos.Length - 1 Then
                        resb2.Append(",")
                    End If
                End If
                c += 1
            Next

            origenes = resb2.ToString
            Return origenes
        End If
    End Function

    ' **********************************************************
    ' **********************************************************
    ' **********************************************************
    ' **********************************************************
    ' **********************************************************
    ' **********************************************************
    ' **********************************************************

    Private Function ObtenerOrigenes2(ByVal DCTOS As String, ByVal TIPO_DCTO As String, ByVal PADRE As String) As String
        If DCTOS = "" Or DCTOS = Nothing Then
            Return ""
        Else
            Dim docs = DCTOS.Split(",")
            Dim origenes As String = ""
            Dim nombre As String = ""
            Dim c As Integer = 0
            Dim resb2 As New StringBuilder
            resb2.Clear()
            Select Case TIPO_DCTO
                Case "0027" 'ORDEN DE COMPRA CLIENTE------------------------------------                            
                    Dim nvOrdenCompra As New Nomade.NV.NVOrdenCompra("Bn")
                    For Each doc As String In docs
                        Dim data As DataTable = nvOrdenCompra.ListarOrdenCompraCliente(doc, "", "", "", "", "", "", "", "", "")
                        If Not data Is Nothing Then
                            Dim datosRegistro As String = ""
                            If Not data Is Nothing Then
                                datosRegistro = Utilities.Datatable2Json(data)
                            Else
                                datosRegistro = "[]"
                            End If
                            resb2.AppendFormat("{{""CODIGO"":""{0}"",""DCTO"" :""ORDEN_COMPRA"",""DATOS"": {1},", data.Rows(0)("CODIGO").ToString, datosRegistro)
                            resb2.AppendFormat("""ORIGENES"": [{0}] }} ", ObtenerOrigenes2(data.Rows(0)("DCTO_CODE_REF").ToString, data.Rows(0)("DCTO_TIPO_CODE_REF").ToString, data.Rows(0)("CODIGO").ToString))
                            If docs.Length > 0 Then
                                If c <> docs.Length - 1 Then
                                    resb2.Append(",")
                                End If
                            End If
                        End If
                        c += 1
                    Next

                Case "0053" 'COTIZACION -----------------------------------------------
                    Dim nvCotizacion As New Nomade.NV.NVCotizacion("Bn")
                    For Each doc As String In docs
                        Dim data As DataTable = nvCotizacion.ListarCotizacionCliente(doc, "", "", "", "", "", "", "", "", "")
                        If Not data Is Nothing Then
                            Dim datosRegistro As String = ""
                            If Not data Is Nothing Then
                                datosRegistro = Utilities.Datatable2Json(data)
                            Else
                                datosRegistro = "[]"
                            End If
                            resb2.AppendFormat("{{""CODIGO"":""{0}"",""DCTO"" :""COTIZACION"",""DATOS"": {1},", data.Rows(0)("CODIGO").ToString, datosRegistro)
                            resb2.AppendFormat("""ORIGENES"": [{0}] }} ", ObtenerOrigenes2(data.Rows(0)("DCTO_CODE_REF").ToString, data.Rows(0)("DCTO_TIPO_CODE_REF").ToString, data.Rows(0)("CODIGO").ToString))
                            If docs.Length > 0 Then
                                If c <> docs.Length - 1 Then
                                    resb2.Append(",")
                                End If
                            End If
                        End If
                        c += 1
                    Next

            End Select
            origenes = resb2.ToString
            Return origenes
        End If
    End Function

    Private Function ObtenerDestinos2(ByVal DCTOS As String, ByVal TIPO_DCTO As String, ByVal PADRE As String) As String
        If DCTOS = "" Or DCTOS = Nothing Then
            Return ""
        Else
            Dim docs = DCTOS.Split(",")
            Dim tiposDctos = TIPO_DCTO.Split(",")
            Dim origenes As String = ""
            Dim nombre As String = ""
            Dim c As Integer = 0
            Dim c2 As Integer = 0
            Dim resb2 As New StringBuilder
            For Each tipo As String In tiposDctos
                Select Case tipo
                    Case "0009", "0050" 'GUIA SALIDA, REMISION REMITENTE---------------------                    
                        Dim data As DataTable = New Nomade.NA.NATipoMovimiento("BN").busca_CAB_dcto_almacen(docs(c))
                        If Not data Is Nothing Then
                            If Not data Is Nothing Then
                                Dim datosRegistro As String = ""
                                If Not data Is Nothing Then
                                    datosRegistro = Utilities.Datatable2Json(data)
                                Else
                                    datosRegistro = "[]"
                                End If
                                resb2.AppendFormat("{{""CODIGO"":""{0}"",""DCTO"" :""NAMINSA_1"",""DATOS"": {1},", data.Rows(0)("CODIGO").ToString, datosRegistro)
                                resb2.AppendFormat("""ORIGENES"": [{0}] }} ", ObtenerDestinos2(data.Rows(0)("ORGN").ToString, data.Rows(0)("TIPO_DCTO_ORG").ToString, data.Rows(0)("CODIGO").ToString))

                            End If
                        End If
                    Case "0001", "0003", "0012" 'FACTURA, BOLETA TICKET DE NAMINSA--------------------- 
                        If docs(c).Substring(0, 1) = "A" Then
                            Dim data As DataTable = New Nomade.NA.NATipoMovimiento("BN").busca_CAB_dcto_almacen(docs(c))
                            If Not data Is Nothing Then
                                If Not data Is Nothing Then
                                    Dim datosRegistro As String = ""
                                    If Not data Is Nothing Then
                                        datosRegistro = Utilities.Datatable2Json(data)
                                    Else
                                        datosRegistro = "[]"
                                    End If
                                    resb2.AppendFormat("{{""CODIGO"":""{0}"",""DCTO"" :""NAMINSA_2"",""DATOS"": {1},", data.Rows(0)("CODIGO").ToString, datosRegistro)
                                    resb2.AppendFormat("""ORIGENES"": [{0}] }} ", ObtenerDestinos2(data.Rows(0)("ORGN").ToString, data.Rows(0)("TIPO_DCTO_ORG").ToString, data.Rows(0)("CODIGO").ToString))
                                End If
                            End If
                        End If

                End Select
                If tiposDctos.Length > 0 Then
                    If c <> tiposDctos.Length - 1 Then
                        resb2.Append(",")
                    End If
                End If
                c += 1
            Next

            origenes = resb2.ToString
            Return origenes
        End If
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
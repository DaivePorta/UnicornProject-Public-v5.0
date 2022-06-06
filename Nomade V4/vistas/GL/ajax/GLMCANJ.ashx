<%@ WebHandler Language="VB" Class="GLMCANJ" %>

Imports System
Imports System.Web
Imports System.Data

Public Class GLMCANJ : Implements IHttpHandler
    Dim res, flag As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim codigo, codigo_doc, estado, codigo_detalle, empresa, sucursal, doc_ind, detalle_ind, usuario, item, estadoLetra, p_letra, p_documento, p_sucursal As String
    Dim firmante As String
    Dim nro_doc As String
    Dim nro_detalle As String
    Dim canje As String
    Dim moneda As String
    Dim tipo As String
    Dim pagado As String
    Dim texto As String
    Dim pidm As String
    Dim sJsonDetLetras As String

    Dim p_usuario, p_empresa, p_giradoA, p_girador, p_lugar, p_nroLetras, p_periodoLetras, p_fechaGiro, p_tipo, p_NRO, sJsonDetDoc, sCodCanje, monto, p_montoCambio, p_fechaCanje As String

    Dim sCodVenta As String

    Dim oTransaction As New Nomade.DataAccess.Transaccion()


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Try

            context.Response.ContentType = "text/plain"

            flag = context.Request("flag")
            estado = context.Request("estado")
            p_letra = context.Request("p_letra")
            p_usuario = context.Request("p_usuario")
            p_empresa = context.Request("p_empresa")
            p_sucursal = context.Request("p_sucursal")

            p_giradoA = context.Request("p_giradoA")
            p_lugar = context.Request("p_lugar")
            p_nroLetras = context.Request("p_nroLetras")
            p_periodoLetras = context.Request("p_periodoLetras")
            p_fechaGiro = context.Request("p_fechaGiro")
            p_fechaCanje = context.Request("p_fechaCanje")


            If p_fechaGiro <> String.Empty Then
                p_fechaGiro = Utilities.fechaLocal(context.Request("p_fechaGiro"))
            End If

            If p_fechaCanje <> String.Empty Then
                p_fechaCanje = Utilities.fechaLocal(context.Request("p_fechaCanje"))
            End If

            p_tipo = context.Request("p_tipo")
            p_documento = context.Request("p_documento")
            codigo = context.Request("codigo")
            empresa = context.Request("empresa")
            sucursal = context.Request("sucursal")
            item = context.Request("item")
            estadoLetra = context.Request("estadoLetra")
            usuario = context.Request("usuario")
            nro_doc = context.Request("nro_doc")
            doc_ind = context.Request("doc_ind")
            pagado = context.Request("pagado")
            texto = context.Request("texto")
            canje = context.Request("canje")
            moneda = context.Request("moneda")
            monto = context.Request("monto")

            tipo = context.Request("tipo")
            pidm = context.Request("pidm")
            p_NRO = context.Request("p_NRO")
            p_girador = context.Request("p_girador")
            sCodCanje = context.Request("sCodCanje")
            p_montoCambio = context.Request("p_montoCambio")



            sJsonDetLetras = context.Request("sJsonDetLetras")
            sJsonDetDoc = context.Request("sJsonDetDoc")

            sCodVenta = context.Request("sCodVenta")

            Select Case flag

                Case "1"

                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    Dim oGLCanjeLetrasFacturas As New Nomade.GL.GLCanjeLetrasFacturas("BN")
                    Dim sCodCanje As String = oGLCanjeLetrasFacturas.CrearCanje(p_tipo, p_usuario, p_empresa, p_giradoA, monto, moneda, sucursal, p_montoCambio, p_fechaCanje, oTransaction)

                    Dim oDT_Letras As New DataTable
                    oDT_Letras = Utilities.JSONToDataTable(sJsonDetLetras)
                    Dim oGLLetras As New Nomade.GL.GLLetras("BN")
                    Dim asCodLetras() As String = Nothing
                    Dim sCodLetra As String
                    For Each oDR_Letra As DataRow In oDT_Letras.Rows
                        'res = p.CrearLetra(empresa, tipo, numero, refgirador, lugar, fechagiro, fechavcto, monto, girador, giradoa, "A", avalista, banco, oficina, dc, numerocta, importe, estado, usuario, destino, firmante, moneda, glosa, numero_unico)
                        sCodLetra = oGLLetras.CrearLetra(p_empresa, sucursal, p_tipo, p_NRO, "", p_lugar, p_fechaGiro, Utilities.fechaLocal(oDR_Letra("FECHA").ToString), oDR_Letra("MONTO").ToString, p_girador, p_giradoA, "A", 0, "C", "", "", "", oDR_Letra("MONTO").ToString, "F", p_usuario, "C", p_girador, moneda, "", "", oTransaction)

                        oGLCanjeLetrasFacturas.CrearCanjeDetLetra(sCodCanje, sCodLetra, oTransaction)
                    Next

                    Dim oDT_Documento As New DataTable
                    oDT_Documento = Utilities.JSONToDataTable(sJsonDetDoc)

                    Dim CodDoc As String
                    Dim CodMonto As String
                    For Each oDR_DocVen As DataRow In oDT_Documento.Rows
                        CodDoc = oDR_DocVen("sCodVenta").ToString
                        CodMonto = oDR_DocVen("sMontoVenta").ToString
                        oGLCanjeLetrasFacturas.CrearCanjeDetDocumneto(sCodCanje, CodDoc, CodMonto, oTransaction)
                    Next

                    oTransaction.fnCommitTransaction()

                    res = sCodCanje

                Case "2"
                    Dim p As New Nomade.GL.GLCanjeLetrasFacturas("BN")
                    res = p.EliminarCanje(codigo, item)

                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.GL.GLCanjeLetrasFacturas("BN")
                    dt = p.ListarCanje(tipo, codigo, "S", empresa)
                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows


                            resb.Append("{")
                            resb.Append("""ITEM"":""" & row("ITEM").ToString & """,")
                            resb.Append("""NUMERO_DOCUMENTO"":""" & row("NUMERO_DOCUMENTO").ToString & """,")
                            resb.Append("""DOC_IND"":""" & row("DOC_IND").ToString & """,")
                            resb.Append("""FECHA_EMISION"":{""display"":""" & row("FECHA_EMISION").ToString & """,""order"":""" & String.Join("", row("FECHA_EMISION").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            resb.Append("""NRO_DOC_DETALLE"":""" & row("NRO_DOC_DETALLE").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""COD_DETALLE"":""" & row("COD_DETALLE").ToString & """,")
                            resb.Append("""DETALLE_IND"":""" & row("DETALLE_IND").ToString & """")
                            resb.Append("},")

                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If

                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.GL.GLLetras("BN")
                    dt = p.ListarLetra(codigo, "A", tipo, estadoLetra, empresa, canje, moneda, String.Empty, String.Empty, Utilities.fechaLocal(String.Empty), Utilities.fechaLocal(String.Empty))

                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            If (row("TIPO") = "P" And row("GIRADOR").ToString = pidm) Or (row("TIPO") = "C" And row("GIRADOA").ToString = pidm) Or (pidm = "") Then
                                resb.Append("{")
                                resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                                resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                                resb.Append("""NUMERO_DOC"":""" & row("NUMERO").ToString & """,")
                                resb.Append("""FECHA"":{""display"":""" & row("FECHA_GIRO").ToString & """,""order"":""" & String.Join("", row("FECHA_GIRO").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""FECHA_VENC"":{""display"":""" & row("FECHA_VENC").ToString & """,""order"":""" & String.Join("", row("FECHA_VENC").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                                resb.Append("""NPIDM_SUJ"":""" & row("NPIDM_SUJ").ToString & """,")
                                resb.Append("""PIDM"":""" & row("PIDM_SUJ").ToString & """,")
                                resb.Append("""DOCUMENTO_PERSONA"":""" & row("DOCUMENTO_PERSONA").ToString & """,")
                                resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                                resb.Append("""NTIPO"":""" & row("NTIPO").ToString & """,")
                                resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                                resb.Append("""SMONEDA"":""" & row("SMONEDA").ToString & """,")
                                resb.Append("""MONEDA"":""" & row("MONEDA").ToString & """,")
                                resb.Append("""NMONEDA"":""" & row("NMONEDA").ToString & """")
                                resb.Append("},")
                            End If
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If

                Case "5"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If

                Case "6"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.GL.GLCanjeLetrasFacturas("BN")
                    dt = p.ListarFacturas(codigo, empresa, tipo, "A", String.Empty, canje, moneda, pidm)

                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            If (Decimal.Parse(row("MONTO_POR_PAGAR").ToString) > 0) Then
                                resb.Append("{")
                                resb.Append("""CODIGO"":""" & row("CODIGO_DOC").ToString & """,")
                                resb.Append("""NUMERO_DOC"":""" & row("NUMERO_DOC").ToString & """,")
                                resb.Append("""FECHA"":{""display"":""" & row("FECHA").ToString & """,""order"":""" & String.Join("", row("FECHA").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""FECHA_VENC"":{""display"":""" & row("FECHA_VENC").ToString & """,""order"":""" & String.Join("", row("FECHA_VENC").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""MONTO"":""" & row("MONTO_POR_PAGAR").ToString & """,")
                                resb.Append("""NPIDM_SUJ"":""" & row("NPIDM_SUJ").ToString & """,")
                                resb.Append("""PIDM"":""" & row("PIDM_SUJ").ToString & """,")
                                resb.Append("""DOCUMENTO_PERSONA"":""" & row("DOCUMENTO_PERSONA").ToString & """,")
                                resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                                resb.Append("""NTIPO"":""" & row("NTIPO").ToString & """,")
                                resb.Append("""GLOSA"":""" & row("COMENTARIO").ToString & """,")
                                resb.Append("""SMONEDA"":""" & row("SMONEDA").ToString & """,")
                                resb.Append("""MONEDA"":""" & row("MONEDA").ToString & """,")
                                resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                                resb.Append("""NMONEDA"":""" & row("NMONEDA").ToString & """")
                                resb.Append("},")
                            End If
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If

                Case "7"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim P As New Nomade.GL.GLCanjeLetrasFacturas("Bn")
                    dt = P.ListarCanje(tipo, String.Empty, "S", empresa)
                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO_DOCUMENTO").ToString & """,")
                            resb.Append("""TIPO"":""" & row("DOC_IND").ToString & """,")
                            resb.Append("""NUMERO"":""" & row("NUMERO_DOCUMENTO").ToString & """,")
                            resb.Append("""FECHA"":{""display"":""" & row("FECHA_EMISION").ToString & """,""order"":""" & String.Join("", row("FECHA_EMISION").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            resb.Append("""SMONEDA"":""" & row("SMONEDA").ToString & """,")
                            resb.Append("""EMPRESA"":{""NOMBRE"":""" & row("NEMPRESA").ToString & """,""CODIGO"":""" & row("EMPRESA").ToString & """},")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If

                Case "8"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.GL.GLCanjeLetrasFacturas("BN")

                    Dim oDT As New DataTable()
                    oDT = p.ListarFacturasCanje(empresa, tipo, pidm, sucursal, estado)

                    If Not oDT Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In oDT.Rows
                            If (Decimal.Parse(row("MONTO_POR_PAGAR").ToString) > 0) Then
                                resb.Append("{")
                                resb.Append("""CODIGO"":""" & row("CODIGO_DOC").ToString & """,")
                                resb.Append("""NUMERO_DOC"":""" & row("NUMERO_DOC").ToString & """,")
                                resb.Append("""FECHA"":{""display"":""" & row("FECHA").ToString & """,""order"":""" & String.Join("", row("FECHA").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""FECHA_VENC"":{""display"":""" & row("FECHA_VENC").ToString & """,""order"":""" & String.Join("", row("FECHA_VENC").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""MONTO"":""" & row("MONTO_POR_PAGAR").ToString & """,")
                                resb.Append("""NPIDM_SUJ"":""" & row("NPIDM_SUJ").ToString & """,")
                                'resb.Append("""PIDM"":""" & row("PIDM_SUJ").ToString & """,")
                                'resb.Append("""DOCUMENTO_PERSONA"":""" & row("DOCUMENTO_PERSONA").ToString & """,")
                                resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                                resb.Append("""NTIPO"":""" & row("NTIPO").ToString & """,")

                                resb.Append("""SMONEDA"":""" & row("SMONEDA").ToString & """,")
                                resb.Append("""MONEDA"":""" & row("MONEDA").ToString & """,")
                                resb.Append("""MONEDA_CORTA"":""" & row("MONEDA_CORTA").ToString & """,")
                                resb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                                resb.Append("""NMONEDA"":""" & row("NMONEDA").ToString & """")
                                resb.Append("},")
                            End If
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        If resb.Length > 3 Then
                            res = resb.ToString()
                        Else
                            res = "[]"
                        End If

                        'res = resb.ToString()
                        'Else
                        'res = ""
                    Else
                        res = "[]"
                    End If

                    'If oDT Is Nothing Then
                    '    res = "[]"
                    'Else
                    '    res = Utilities.DataTableToJSON(oDT)
                    'End If


                Case "9"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim P As New Nomade.GL.GLCanjeLetrasFacturas("Bn")

                    Dim oDT As New DataTable()
                    oDT = P.ListarLetrasCanje(sCodCanje)

                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "10"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oGLCanjeLetrasFacturas As New Nomade.GL.GLCanjeLetrasFacturas("Bn")
                    Dim oDT As New DataTable()
                    oDT = oGLCanjeLetrasFacturas.ListarDocumentoCanje(sCodCanje)

                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "11"
                    oTransaction.fnBeginTransaction(Nomade.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)


                    Dim oGLCanjeLetrasFacturas As New Nomade.GL.GLCanjeLetrasFacturas("BN")
                    Dim sCodCanje As String = oGLCanjeLetrasFacturas.CrearCanje(p_tipo, p_usuario, p_empresa, p_giradoA, monto, moneda, sucursal, p_montoCambio, p_fechaCanje, oTransaction)

                    Dim oDT_Letras As New DataTable
                    oDT_Letras = Utilities.JSONToDataTable(sJsonDetLetras)
                    Dim oGLLetras As New Nomade.GL.GLLetras("BN")
                    Dim asCodLetras() As String = Nothing
                    Dim sCodLetra As String
                    For Each oDR_Letra As DataRow In oDT_Letras.Rows
                        'res = p.CrearLetra(empresa, tipo, numero, refgirador, lugar, fechagiro, fechavcto, monto, girador, giradoa, "A", avalista, banco, oficina, dc, numerocta, importe, estado, usuario, destino, firmante, moneda, glosa, numero_unico)
                        sCodLetra = oGLLetras.CrearLetra(p_empresa, p_sucursal, p_tipo, oDR_Letra("NRO_DOC_DETALLE").ToString, "", p_lugar, p_fechaGiro, Utilities.fechaLocal(oDR_Letra("FECHA").ToString), oDR_Letra("MONTO").ToString, p_giradoA, p_girador, "A", 0, "C", "", "", "", oDR_Letra("MONTO").ToString, "F", p_usuario, "C", p_girador, moneda, "", "", oTransaction)

                        oGLCanjeLetrasFacturas.CrearCanjeDetLetra(sCodCanje, sCodLetra, oTransaction)
                    Next

                    Dim oDT_Documento As New DataTable
                    oDT_Documento = Utilities.JSONToDataTable(sJsonDetDoc)

                    Dim CodDoc As String
                    Dim CodMonto As String
                    For Each oDR_DocVen As DataRow In oDT_Documento.Rows
                        CodDoc = oDR_DocVen("sCodVenta").ToString
                        CodMonto = oDR_DocVen("sMontoVenta").ToString
                        oGLCanjeLetrasFacturas.CrearCanjeDetDocumneto(sCodCanje, CodDoc, CodMonto, oTransaction)
                    Next

                    oTransaction.fnCommitTransaction()

                    res = sCodCanje

                Case "GET_COD_CANJE_X_VTA"
                    Dim oGLCanjeLetrasFacturas As New Nomade.GL.GLCanjeLetrasFacturas("BN")
                    res = oGLCanjeLetrasFacturas.fnGetCodCanjeXDocVta(sCodVenta)

                Case "GET_COD_CANJE"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable
                    Dim oGLCanjeLetrasFacturas As New Nomade.GL.GLCanjeLetrasFacturas("BN")
                    oDT = oGLCanjeLetrasFacturas.fnListarCanjeLetra(sCodCanje)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

                Case "GET_CANJE"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim oDT As New DataTable
                    Dim oGLCanjeLetrasFacturas As New Nomade.GL.GLCanjeLetrasFacturas("BN")
                    oDT = oGLCanjeLetrasFacturas.fnListarCanjea(tipo, empresa)
                    If oDT Is Nothing Then
                        res = "[]"
                    Else
                        res = Utilities.DataTableToJSON(oDT)
                    End If

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            If oTransaction.iTransactionState = NOMADE.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If
            Dim sMsjeError As String = ex.Message
            If (sMsjeError.IndexOf("[Advertencia]") > -1) Then
                context.Response.Write(sMsjeError)
            Else
                context.Response.Write("[Error]: " + sMsjeError)
            End If
        End Try

    End Sub

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then

            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                If clase = "EMPRESA" Then
                    res += "<option pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                Else
                    res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                End If
            Next

        Else
            res = "error"
        End If
        Return res
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
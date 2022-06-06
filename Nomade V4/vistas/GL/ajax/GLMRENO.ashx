<%@ WebHandler Language="VB" Class="GLMRENO" %>

Imports System
Imports System.Web
Imports System.Data
Imports Newtonsoft.Json

Public Class GLMRENO : Implements IHttpHandler
    Dim res, flag As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim codigo, codigo_doc, codigo_detalle, empresa, doc_ind, detalle_ind, usuario, item, p_sucursal As String
    Dim firmante As String
    Dim nro_doc As String
    Dim nro_detalle As String
    Dim detalle As String
    Dim canje As String
    Dim moneda As String
    Dim tipo, letra, lugar, fechaGiro, renova_ind As String
    Dim oTransaction As New NOMADE.DataAccess.Transaccion()

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")
        codigo = context.Request("codigo")
        p_sucursal = context.Request("p_sucursal")
        empresa = context.Request("empresa")
        item = context.Request("item")
        usuario = context.User.Identity.Name
        nro_doc = context.Request("nro_doc")
        codigo_detalle = context.Request("codigo_detalle")
        doc_ind = context.Request("doc_ind")
        detalle_ind = context.Request("detalle_ind")
        nro_detalle = context.Request("nro_detalle")
        canje = context.Request("canje")
        moneda = context.Request("moneda")
        tipo = context.Request("tipo")
        detalle = context.Request("detalle")
        letra = context.Request("letra")
        lugar = context.Request("lugar")
        fechaGiro = context.Request("fechaGiro")
        renova_ind = context.Request("renova_ind")

        Try

            Select Case flag

                Case "1"

                    Dim letras As New NOMADE.GL.GLLetras("BN")
                    Dim renovacion As New NOMADE.GL.GLRenovacionLetras("BN")

                    oTransaction.fnBeginTransaction(NOMADE.DataAccess.Transaccion.eIsolationLevel.READ_UNCOMMITTED)

                    Dim codeDetalle As String
                    Dim jsonLetra As Object = JsonConvert.DeserializeObject(letra)
                    Dim jsonDetalle As Object = JsonConvert.DeserializeObject(detalle)
                    For Each item As Object In jsonDetalle

                        codeDetalle = letras.CrearLetra(empresa, p_sucursal, jsonLetra("TIPO"), item("NRO_DOC_DETALLE"), jsonLetra("REF_GIRADOR"), lugar, Utilities.fechaLocal(fechaGiro), Utilities.fechaLocal(item("FECHA").ToString()),
                                                        item("MONTO"), jsonLetra("GIRADOR"), jsonLetra("GIRADOA"), "A", jsonLetra("AVALISTA"), jsonLetra("BANCO_CODE"),
                                                        jsonLetra("OFICINA"), jsonLetra("DC"), jsonLetra("NUMERO_CTA"), item("MONTO"), "F", usuario, jsonLetra("DESTINO"),
                                                        jsonLetra("FIRMANTE"), jsonLetra("MONEDA"), jsonLetra("GLOSA") & "(Letra de " & jsonLetra("NUMERO") & ")", "", oTransaction)

                        res = renovacion.CrearRenovacion(jsonLetra("NUMERO"), codeDetalle, usuario, jsonLetra("CODIGO"), item("NRO_DOC_DETALLE"), empresa, Utilities.fechaLocal(fechaGiro), lugar, jsonLetra("TIPO"), oTransaction)

                    Next

                    oTransaction.fnCommitTransaction()

                Case "2"
                    Dim p As New Nomade.GL.GLRenovacionLetras("BN")
                    res = p.EliminarRenovacion(codigo, item)

                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.GL.GLRenovacionLetras("BN")
                    dt = p.ListarRenovacion(codigo, "N")
                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "4"

                    context.Response.ContentType = "application/json; charset=utf-8"

                    Dim p As New NOMADE.GL.GLLetras("BN")

                    dt = p.ListarLetra(codigo, "A", tipo, "", empresa, renova_ind, moneda, String.Empty, String.Empty, Utilities.fechaLocal(String.Empty), Utilities.fechaLocal(String.Empty))

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If

                Case "5"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If



                Case "6" 'LISTAR RENOVACIONES POR EMPRESA

                    context.Response.ContentType = "application/json; charset=utf-8"


                    Dim P As New Nomade.GL.GLRenovacionLetras("Bn")


                    dt = P.ListarRenovacion(String.Empty, "S", empresa, tipo)

                    If Not dt Is Nothing Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO_DOCUMENTO").ToString & """,")
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





            End Select

            context.Response.Write(res)

        Catch ex As Exception
            If oTransaction.iTransactionState = NOMADE.DataAccess.Transaccion.eTransactionState._ON Then
                oTransaction.fnRollBackTransaction()
            End If

            context.Response.Write("error" & ex.ToString)

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
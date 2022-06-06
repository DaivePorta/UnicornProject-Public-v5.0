<%@ WebHandler Language="VB" Class="NBMCHQA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NBMCHQA : Implements IHttpHandler

    Dim dt As DataTable

    Dim res As String
    Dim resb As New StringBuilder
    Dim b As New Nomade.NC.NCBanco("bn")
    Dim s As New Nomade.NB.NBChequera("bn")
    Dim flag As String
    Dim empresa As String
    Dim fecha_registro As String
    Dim fecha_inicio As String
    Dim fecha_pago As String
    Dim cta_code As String
    Dim cta_pidm As String
    Dim tipo As String
    Dim cheque_inicial As String
    Dim cheque_final As String
    Dim nro_cheques As String
    Dim usuario As String
    Dim codigo As String
    Dim empresapidm As String
    Dim cuenta_bancaria As String
    Dim pidm_cuenta As String
    Dim monto As String
    Dim moneda As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")
        empresapidm = context.Request("empresapidm")

        codigo = context.Request("codigo")
        empresa = context.Request("empresa")
        fecha_registro = context.Request("fecha_registro")
        If fecha_registro <> String.Empty Then
            fecha_registro = Utilities.fechaLocal(context.Request("fecha_registro"))
        End If

        fecha_inicio = context.Request("fecha_inicio")
        If fecha_inicio <> String.Empty Then
            fecha_inicio = Utilities.fechaLocal(context.Request("fecha_inicio"))
        End If



        cta_code = context.Request("cta_code")
        cta_pidm = context.Request("cta_pidm")
        tipo = context.Request("tipo")
        cheque_inicial = context.Request("cheque_inicial")
        cheque_final = context.Request("cheque_final")
        nro_cheques = context.Request("nro_cheques")
        usuario = context.Request("usuario")
        cuenta_bancaria = context.Request("cuenta_bancaria")
        pidm_cuenta = context.Request("pidm_cuenta")
        monto = context.Request("monto")
        If monto = String.Empty Then
            monto = 0
        End If

        moneda = context.Request("moneda")

        Try

            Select Case flag.ToString()

                Case "1"
                    res = s.CrearChequera(empresa, fecha_registro, fecha_inicio, cta_code, cta_pidm, tipo, cheque_inicial, cheque_final, nro_cheques, usuario, monto, moneda)

                Case "2"
                    res = s.ActualizarChequera(codigo, empresa, fecha_registro, fecha_inicio, cta_code, cta_pidm, tipo, cheque_inicial, cheque_final, nro_cheques, usuario, monto, moneda)

                Case "3"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NB.NBChequera("BN")
                    dt = p.ListarChequera(codigo, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"":""" & dt.Rows(0)("CODIGO").ToString & """,")
                    resb.Append("""CTA_CODE"":""" & dt.Rows(0)("CTA_CODE").ToString & """,")
                    resb.Append("""FECHA_INICIO"":""" & dt.Rows(0)("FECHA_INICIO").ToString & """,")
                    resb.Append("""FECHA_REGISTRO"":""" & dt.Rows(0)("FECHA_REGISTRO").ToString & """,")
                    resb.Append("""CHEQUE_INICIAL"":""" & dt.Rows(0)("CHEQUE_INICIAL").ToString & """,")
                    resb.Append("""CHEQUE_FINAL"":""" & dt.Rows(0)("CHEQUE_FINAL").ToString & """,")
                    resb.Append("""NRO_CHEQUES"":""" & dt.Rows(0)("NRO_CHEQUES").ToString & """,")
                    resb.Append("""PIDM"":""" & dt.Rows(0)("PIDM").ToString & """,")
                    resb.Append("""EMPRESA"":""" & dt.Rows(0)("EMPRESA").ToString & """,")
                    resb.Append("""MONTO"":""" & dt.Rows(0)("MONTO").ToString & """,")
                    resb.Append("""TIPO"":""" & dt.Rows(0)("TIPO").ToString & """,")
                    resb.Append("""NUMERO_CHEQUES_USADOS"":""" & dt.Rows(0)("NUMERO_CHEQUES_USADOS").ToString & """,")
                    resb.Append("""MONEDA_CODE"":""" & dt.Rows(0)("MONEDA_CODE").ToString & """")

                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "4"

                    res = s.ObtenerSiguienteNumero(cuenta_bancaria, pidm_cuenta, tipo)

                Case "5"
                    Dim p As New Nomade.NC.NCEmpresa("BN")
                    dt = p.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "descripcion", "EMPRESA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "codigo", "descripcion", "EMPRESA")
                    End If

                Case "6"

                    dt = s.ListarCtasBancarias(empresapidm, "A", "S")
                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "code", "DESCRIPCION", "CTABANC")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "DESCRIPCION", "ASC"), "code", "DESCRIPCION", "CTABANC")
                    End If

                Case "M"
                    Dim p As New Nomade.NC.NCMonedas("BN")
                    dt = p.ListarMoneda(codigo, String.Empty, "A")
                    res = dt.Rows(0)("Simbolo").ToString

                Case "LCQA" 'Lista chequeras                
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NB.NBChequera("BN")
                    dt = p.ListarChequera(codigo, IIf(pidm_cuenta Is Nothing, "", pidm_cuenta), IIf(cuenta_bancaria Is Nothing, "", cuenta_bancaria), String.Empty)
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If


            End Select

            context.Response.Write(res)

        Catch ex As Exception

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
                    If clase = "CTABANC" Then
                        res += "<option moneda=""" & dt.Rows(i)("MONEDA_CODE").ToString() & """ pidm=""" & dt.Rows(i)("PIDM").ToString() & """ value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    Else
                        res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
                    End If
                End If
            Next

        Else
            res = "<option></option>"
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
<%@ WebHandler Language="VB" Class="CBMOPTR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class CBMOPTR : Implements IHttpHandler

    Dim OPCION As String

    Dim CODIGO, PIDM, CTLG_CODE, OMTR, CUEN_CODE, CUEN_TIPO, MONE_CODE, ESTADO, VIGENCIA, OMTC_CODE As String
    Dim MARCAS As String()

    Dim filtrotypeahead As String

    Dim dt As DataTable

    Dim persona As New Nomade.NC.NCPersona("BN")
    Dim mtar As New Nomade.NC.NCMarcaTarjeta("BN")
    Dim optr As New Nomade.NC.NCOperadorTarjeta("BN")
    Dim ctab As New Nomade.NC.NCCuentaBancaria("BN")

    Dim res As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")

        CODIGO = context.Request("CODIGO")
        PIDM = context.Request("PIDM")
        CTLG_CODE = context.Request("CTLG_CODE")
        MONE_CODE = context.Request("MONE_CODE")
        ESTADO = context.Request("ESTADO")
        OMTR = context.Request("OMTR_CODE")
        OMTC_CODE = context.Request("OMTC_CODE")
        CUEN_CODE = context.Request("CUEN_CODE")
        CUEN_TIPO = context.Request("CUEN_TIPO")
        MARCAS = Split(context.Request("MARCAS"), ",")
        VIGENCIA = context.Request("VIGENCIA")

        filtrotypeahead = context.Request("q")

        Select Case OPCION
            Case "0"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = optr.ListarOperadorTarjeta(CODIGO, " ")
                If Not dt Is Nothing Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                        resb.Append("""RAZON_SOCIAL"":""" & row("RAZON_SOCIAL").ToString & """,")
                        resb.Append("""NOMBRE_COMERCIAL"":""" & row("NOMBRE_COMERCIAL").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("+")
                    resb.Replace(",+", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "1"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = persona.listar_Persona_Juridica("0", String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                        resb.Append("""RAZONSOCIAL"":""" & row("RAZONSOCIAL").ToString & """,")
                        resb.Append("""RUC"":""" & row("NRO").ToString & """,")
                        resb.Append("""RAZO_COME"":""" & row("RAZO_COME").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = mtar.ListarMarcaTarjeta(String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""MARCA"":""" & row("MARCA").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "3"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = mtar.ListarMarcaTarjetaPorOperador(CODIGO, " ")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO_MARCA"":""" & row("CODIGO_MARCA").ToString & """,")
                        resb.Append("""CODIGO_REL"":""" & row("CODIGO_REL").ToString & """,")
                        resb.Append("""MARCA"":""" & row("MARCA").ToString & """,")
                        resb.Append("""NUEVO"":""NO"",")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "4"
                context.Response.ContentType = "text/plain"
                res = optr.CrearOperadorTarjeta(PIDM, MARCAS)
            Case "5"
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = ctab.ListarCuentasBancarias(CTLG_CODE, " ", ESTADO)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODE").ToString & """,")
                        resb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                        resb.Append("""MONE_CODE"":""" & row("MONE_CODE").ToString & """,")
                        resb.Append("""NRO_CUENTA"":""" & row("NRO_CUENTA").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "JURIDICAS"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim oNCPersona As New Nomade.NC.NCPersona("BN")
                Dim oDT As New DataTable
                oDT = oNCPersona.fnListarPersonaJuridica()
                If (oDT Is Nothing) Then
                    res = "[]"
                Else
                    res = Utilities.DataTableToJSON(oDT)
                End If
            Case "6"
                context.Response.ContentType = "text/plain"
                res = optr.ActualizarOperadorTarjeta(CODIGO, PIDM, MARCAS)
            Case "7" 'CREAR CUENTA OPERADOR
                context.Response.ContentType = "text/plain"
                res = optr.CrearCuentaOperador(CODIGO, CTLG_CODE, CUEN_CODE, CUEN_TIPO, VIGENCIA)
            Case "8" 'LISTAR CUENTAS POR OPERADOR
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = optr.ListarCuentasPorOperador(CODIGO, " ")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                        resb.Append("""CUEN_CODE"":""" & row("CUEN_CODE").ToString & """,")
                        resb.Append("""DESC_CUENTA"":""" & row("DESC_LARGA").ToString & """,")
                        resb.Append("""MONE_CODE"":""" & row("MONE_CODE").ToString & """,")
                        resb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                        resb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                        resb.Append("""VIGENCIA"":""" & row("VIGENCIA").ToString & """,")
                        resb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                        resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                        resb.Append("},")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "9"
                context.Response.ContentType = "text/plain"
                res = optr.ActualizarCuentaOperador(OMTC_CODE)
            Case "10"
                context.Response.ContentType = "text/plain"
                res = optr.ActualizarMarcaOperador(OMTR, ESTADO)


        End Select
        context.Response.Write(res)

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
<%@ WebHandler Language="VB" Class="NBMANUL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NBMANUL : Implements IHttpHandler
    Dim res, flag, codigo As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim usuario As String
    Dim empresa As String
    Dim tipo As String
    Dim numero As String
    Dim cuenta_bancaria As String
    Dim pidm_cuenta As String
    Dim fecha As String
    Dim nro_cheq_inicio As String
    Dim nro_cheq_final As String
    Dim glosa As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        flag = context.Request("flag")
        codigo = context.Request("codigo")
        usuario = context.Request("usuario")
        empresa = context.Request("empresa")
        tipo = context.Request("tipo")
        numero = context.Request("numero")
        cuenta_bancaria = context.Request("cuenta_bancaria")
        fecha = Convert.ToDateTime(Date.Now()).ToString("yyyy/MM/dd")
        pidm_cuenta = context.Request("pidm_cuenta")
        nro_cheq_inicio = context.Request("cheque_inicio")
        nro_cheq_final = context.Request("cheque_final")
        glosa = context.Request("glosa")

        Try

            Select Case flag

                Case "1" 'anular
                    Dim p As New Nomade.NB.NBCheque("BN")
                    res = p.ActualizarCheque("", "", "", "", "00/00/0000", "", 0, "00/00/0000", 0, "", "A", usuario, "", "", "", "", "", "", codigo)

                Case "2" 'RECHAZAR
                    Dim p As New Nomade.NB.NBCheque("BN")
                    res = p.ActualizarCheque("", "", "", "", "00/00/0000", "", 0, "00/00/0000", 0, "", "R", usuario, "", "", "", "", "", "", codigo)

                Case "4"
                    Dim p As New Nomade.NB.NBCheque("Bn")

                    p.CrearCheque(empresa, cuenta_bancaria, pidm_cuenta, numero, fecha, "", 0, fecha, 0, "A", "F", usuario, "", "", "", "", "", tipo, "N")

                    res = p.ActualizarCheque("", "", "", "", "00/00/0000", "", 0, "00/00/0000", 0, "", "A", usuario, "", "", "", "", "", "", codigo)

                Case "ARCHE"
                    Dim p As New Nomade.NB.NBCheque("Bn")
                    res = p.AnularRangoCheque(pidm_cuenta, nro_cheq_inicio, nro_cheq_final, cuenta_bancaria, empresa, usuario, tipo, glosa)

                Case "3"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NB.NBCheque("BN")
                    dt = p.ListarCheque(String.Empty, IIf(cuenta_bancaria Is Nothing, String.Empty, cuenta_bancaria), IIf(pidm_cuenta Is Nothing, String.Empty, pidm_cuenta), String.Empty, String.Empty)

                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            If row("NESTADO_CHEQ").ToString <> "ANULADO" Then
                                resb.Append("{")
                                resb.Append("""NUMERO_CHEQ"":""" & row("NUMERO_CHEQ").ToString & """,")
                                resb.Append("""NUMERO_CUENTA"":{""NOMBRE"":""" & row("NUMERO_CUENTA").ToString & """,""PIDM"":""" & row("CTA_PIDM").ToString & """,""CODIGO"":""" & row("CTA_CODE").ToString & """},")
                                resb.Append("""EMPRESA"":{""NOMBRE"":""" & row("NEMPRESA").ToString & """,""CODIGO"":""" & row("EMPRESA").ToString & """},")
                                resb.Append("""TIPO"":{""NOMBRE"":""" & row("NTIPO").ToString & """,""CODIGO"":""" & row("TIPO").ToString & """},")
                                resb.Append("""FECHA_EMISION"":{""display"":""" & row("FECHA_EMISION").ToString & """,""order"":""" & String.Join("", row("FECHA_EMISION").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""FECHA_REGISTRO"":{""display"":""" & row("FECHA_REGISTRO").ToString & """,""order"":""" & String.Join("", row("FECHA_REGISTRO").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""FECHA_COBRAR"":{""display"":""" & row("FECHA_COBRAR").ToString & """,""order"":""" & String.Join("", row("FECHA_COBRAR").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                                resb.Append("""SMONEDA"":""" & row("SMONEDA").ToString & """,")
                                resb.Append("""NGIRADOA"":""" & row("NGIRADOA").ToString & """,")
                                resb.Append("""NFIRMANTE"":""" & row("NFIRMANTE").ToString & """,")
                                resb.Append("""NESTADO_CHEQ"":""" & row("NESTADO_CHEQ").ToString & """")
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

                Case "LCHEANU" 'Lista cheques
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NB.NBCheque("BN")
                    Dim dt As New DataTable
                    dt = p.ListarChequeAnulados(String.Empty, IIf(cuenta_bancaria Is Nothing, String.Empty, cuenta_bancaria), IIf(pidm_cuenta Is Nothing, String.Empty, pidm_cuenta), String.Empty, String.Empty)

                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            If row("NESTADO_CHEQ").ToString <> "ANULADO" Then
                                resb.Append("{")
                                resb.Append("""NUMERO_CHEQ"":""" & row("NUMERO_CHEQ").ToString & """,")
                                resb.Append("""NUMERO_CUENTA"":{""NOMBRE"":""" & row("NUMERO_CUENTA").ToString & """,""PIDM"":""" & row("CTA_PIDM").ToString & """,""CODIGO"":""" & row("CTA_CODE").ToString & """},")
                                resb.Append("""EMPRESA"":{""NOMBRE"":""" & row("NEMPRESA").ToString & """,""CODIGO"":""" & row("EMPRESA").ToString & """},")
                                resb.Append("""TIPO"":{""NOMBRE"":""" & row("NTIPO").ToString & """,""CODIGO"":""" & row("TIPO").ToString & """},")
                                resb.Append("""FECHA_EMISION"":{""display"":""" & row("FECHA_EMISION").ToString & """,""order"":""" & String.Join("", row("FECHA_EMISION").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""FECHA_REGISTRO"":{""display"":""" & row("FECHA_REGISTRO").ToString & """,""order"":""" & String.Join("", row("FECHA_REGISTRO").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""FECHA_COBRAR"":{""display"":""" & row("FECHA_COBRAR").ToString & """,""order"":""" & String.Join("", row("FECHA_COBRAR").ToString.Split("/").Reverse()) & """},")
                                resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                                resb.Append("""SMONEDA"":""" & row("SMONEDA").ToString & """,")
                                resb.Append("""NGIRADOA"":""" & row("NGIRADOA").ToString & """,")
                                resb.Append("""NFIRMANTE"":""" & row("NFIRMANTE").ToString & """,")
                                resb.Append("""NESTADO_CHEQ"":""" & row("NESTADO_CHEQ").ToString & """")
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

                Case "L"

                    '   context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.NB.NBChequera("BN")
                    dt = p.ListarChequeraActiva(String.Empty, pidm_cuenta, cuenta_bancaria, tipo)
                    'resb.Append("[")
                    'resb.Append("{")
                    'resb.Append("""CODIGO"":""" & dt.Rows(0)("CODIGO").ToString & """,")
                    'resb.Append("""CTA_CODE"":""" & dt.Rows(0)("CTA_CODE").ToString & """,")
                    'resb.Append("""FECHA_INICIO"":""" & dt.Rows(0)("FECHA_INICIO").ToString & """,")
                    'resb.Append("""FECHA_REGISTRO"":""" & dt.Rows(0)("FECHA_REGISTRO").ToString & """,")
                    'resb.Append("""CHEQUE_INICIAL"":""" & dt.Rows(0)("CHEQUE_INICIAL").ToString & """,")
                    'resb.Append("""CHEQUE_FINAL"":""" & dt.Rows(0)("CHEQUE_FINAL").ToString & """,")
                    'resb.Append("""NRO_CHEQUES"":""" & dt.Rows(0)("NRO_CHEQUES").ToString & """,")
                    'resb.Append("""PIDM"":""" & dt.Rows(0)("PIDM").ToString & """,")
                    'resb.Append("""EMPRESA"":""" & dt.Rows(0)("EMPRESA").ToString & """,")
                    'resb.Append("""MONTO"":""" & dt.Rows(0)("MONTO").ToString & """,")
                    'resb.Append("""TIPO"":""" & dt.Rows(0)("TIPO").ToString & """,")
                    'resb.Append("""MONEDA_CODE"":""" & dt.Rows(0)("MONEDA_CODE").ToString & """")

                    'resb.Append("}")
                    'resb.Append("]")
                    res = GenerarSelect(dt)


            End Select

            context.Response.Write(res)

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try

    End Sub

    Public Function GenerarSelect(ByVal dt As DataTable) As String
        If Not dt Is Nothing Then

            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1

                If dt.Rows(i)("estado").ToString() = "EN USO" Or dt.Rows(i)("estado").ToString() = "EN BLANCO" Then
                    res += "<option in=""" & dt.Rows(i)("cheque_inicial").ToString() & """ fi=""" & dt.Rows(i)("cheque_final").ToString() & """ value=""" & dt.Rows(i)("codigo").ToString() & """>" & dt.Rows(i)("cheque_inicial").ToString() & " ~ " & dt.Rows(i)("cheque_final").ToString() & "</option>"
                End If

            Next

        Else
            res = "error"
        End If
        Return res
    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
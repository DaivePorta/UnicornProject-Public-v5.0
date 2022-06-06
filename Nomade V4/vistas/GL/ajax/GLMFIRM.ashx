<%@ WebHandler Language="VB" Class="GLMFIRM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class GLMFIRM : Implements IHttpHandler
    Dim res, flag, codigo, empresa As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim usuario, estLetra, girador, tipo, fechaIni, fechaFin As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        flag = context.Request("flag")
        codigo = context.Request("codigo")
        usuario = context.Request("usuario")
        empresa = context.Request("empresa")
        estLetra = context.Request("estLetra")
        girador = context.Request("girador")
        tipo = context.Request("tipo")
        fechaIni = context.Request("fechaIni")
        fechaFin = context.Request("fechaFin")


        Try

            Select Case flag

                Case "1" 'APROBAR
                    Dim p As New Nomade.GL.GLLetras("BN")
                    res = p.ActualizarLetra("", empresa, "", "", "", "", "00/00/0000", "", 0, 0, 0, "", 0, "", "", "", "", 0, "E", usuario, "", 0, "", "", "", "N", codigo)

                Case "2" 'RECHAZAR
                    Dim p As New Nomade.GL.GLLetras("BN")
                    res = p.ActualizarLetra("", empresa, "", "", "", "", "00/00/0000", "", 0, 0, 0, "", 0, "", "", "", "", 0, "R", usuario, "", 0, "", "", "", "N", codigo)
                Case "3"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.GL.GLLetras("BN")
                    dt = p.ListarLetra(String.Empty, "", tipo, estLetra, empresa, String.Empty, String.Empty, String.Empty, girador, Utilities.fechaLocal(fechaIni), Utilities.fechaLocal(fechaFin))

                    If Not dt Is Nothing Then
                        res = Utilities.Datatable2Json(dt)
                    Else
                        res = "[]"
                    End If
                Case "4"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.GL.GLLetras("BN")
                    dt = p.ListarLetra(String.Empty, "", tipo, estLetra, empresa, String.Empty, String.Empty, String.Empty, girador, Utilities.fechaLocal(fechaIni), Utilities.fechaLocal(fechaFin))

                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""NUMERO"":""" & row("NUMERO").ToString & """,")
                            resb.Append("""FECHA_GIRO"":{""display"":""" & row("FECHA_GIRO").ToString & """,""order"":""" & String.Join("", row("FECHA_GIRO").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""FECHA_VENC"":{""display"":""" & row("FECHA_VENC").ToString & """,""order"":""" & String.Join("", row("FECHA_VENC").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
                            resb.Append("""NGIRADOR"":""" & row("NGIRADOR").ToString & """,")
                            resb.Append("""EMPRESA"":{""NOMBRE"":""" & row("NEMPRESA").ToString & """,""CODIGO"":""" & row("EMPRESA").ToString & """},")
                            resb.Append("""FECHA"":{""display"":""" & row("FECHA_APROBACION").ToString & """,""order"":""" & String.Join("", row("FECHA_APROBACION").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""USUARIO"":""" & row("NUSUARIOAP").ToString & """")
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

            context.Response.Write("error" & ex.ToString)

        End Try

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
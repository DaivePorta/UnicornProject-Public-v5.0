<%@ WebHandler Language="VB" Class="GLMPROT" %>

Imports System
Imports System.Web
Imports System.Data

Public Class GLMPROT : Implements IHttpHandler
    Dim res, flag, codigo As String
    Dim resb As New StringBuilder
    Dim dt As DataTable
    Dim usuario As String
    Dim empresa As String
    Dim tipo, estLetra As String
    Dim numero, girador, fechaIni, fechaFin As String
    Dim cuenta_bancaria As String
    Dim pidm_cuenta As String
    Dim fecha As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"
        flag = context.Request("flag")
        codigo = context.Request("codigo")
        usuario = context.Request("usuario")
        empresa = context.Request("empresa")
        tipo = context.Request("tipo")
        numero = context.Request("numero")
        cuenta_bancaria = context.Request("cuenta_bancaria")
        estLetra = context.Request("estLetra")
        girador = context.Request("girador")
        fechaIni = context.Request("fechaIni")
        fechaFin = context.Request("fechaFin")

        Dim fechaActual As New Date
        fecha = Utilities.fechaLocal(Date.Now())

        pidm_cuenta = context.Request("pidm_cuenta")



        Try

            Select Case flag

                Case "1" 'cobro
                    Dim p As New Nomade.GL.GLLetras("BN")
                    res = p.ActualizarLetra("", "", "", "", "", "", "00/00/0000", "", 0, 0, 0, "", 0, "", "", "", "", 0, "T", usuario, "", 0, "", "", "", "N", codigo)

                Case "2"
                    Dim p As New Nomade.NC.NCNotaria("BN")
                    dt = p.ListarNotaria(String.Empty, "A")

                    If dt Is Nothing Then
                        res = GenerarSelect(dt, "codigo", "nombre", "NOTARIA")
                    Else
                        res = GenerarSelect(SortDataTableColumn(dt, "nombre", "ASC"), "codigo", "nombre", "NOTARIA")
                    End If


                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim p As New Nomade.GL.GLLetras("BN")
                    dt = p.ListarLetraVencida(empresa)

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
                            resb.Append("""NTIPO"":""" & row("NTIPO").ToString & """,")
                            resb.Append("""EMPRESA"":{""NOMBRE"":""" & row("NEMPRESA").ToString & """,""CODIGO"":""" & row("EMPRESA").ToString & """},")
                            resb.Append("""FIRMANTE"":{""NOMBRE"":""" & row("NFIRMANTE").ToString & """,""CODIGO"":""" & row("FIRMANTE").ToString & """},")
                            resb.Append("""AVAL"":{""NOMBRE"":""" & row("NAVALISTA").ToString & """,""CODIGO"":""" & row("AVALISTA").ToString & """},")
                            resb.Append("""MONEDA"":{""NOMBRE"":""" & row("NMONEDA").ToString & """,""CODIGO"":""" & row("MONEDA").ToString & """},")
                            resb.Append("""SMONEDA"":""" & row("SMONEDA").ToString & """,")
                            resb.Append("""GLOSA"":""" & row("GLOSA").ToString & """,")
                            resb.Append("""NDESTINO"":""" & row("NDESTINO").ToString & """")
                            resb.Append("},")

                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")

                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = ""
                    End If

                Case "4" 'LISTADO DE GIRADO 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim P As New Nomade.GL.GLLetras("Bn")
                    dt = P.ListarGiradorLetra("A", empresa, tipo, estLetra)

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""GIRADOR"" :" & """" & MiDataRow("GIRADOR").ToString & """,")
                            resb.Append("""NGIRADOR"" :" & """" & MiDataRow("NGIRADOR").ToString & """,")
                            resb.Append("""GIRADOA"" :" & """" & MiDataRow("GIRADOA").ToString & """,")
                            resb.Append("""NGIRADOA"" :" & """" & MiDataRow("NGIRADOA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "5" 'LISTADO DE CHECHES PROTESTADOS 
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim P As New Nomade.GL.GLLetras("Bn")
                    dt = P.ListarLetra(String.Empty, "A", tipo, estLetra, empresa, String.Empty, String.Empty, String.Empty, girador, Utilities.fechaLocal(fechaIni), Utilities.fechaLocal(fechaFin))

                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""NUMERO"":""" & MiDataRow("NUMERO").ToString & """,")
                            resb.Append("""FECHA_GIRO"":{""display"":""" & MiDataRow("FECHA_GIRO").ToString & """,""order"":""" & String.Join("", MiDataRow("FECHA_GIRO").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""FECHA_VENC"":{""display"":""" & MiDataRow("FECHA_VENC").ToString & """,""order"":""" & String.Join("", MiDataRow("FECHA_VENC").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""MONTO"":""" & MiDataRow("MONTO").ToString & """,")
                            resb.Append("""NGIRADOR"":""" & MiDataRow("NGIRADOR").ToString & """,")
                            resb.Append("""EMPRESA"":{""NOMBRE"":""" & MiDataRow("NEMPRESA").ToString & """,""CODIGO"":""" & MiDataRow("EMPRESA").ToString & """},")
                            resb.Append("""FECHA"":{""display"":""" & MiDataRow("FECHA_PROTESTO").ToString & """,""order"":""" & String.Join("", MiDataRow("FECHA_PROTESTO").ToString.Split("/").Reverse()) & """},")
                            resb.Append("""NOTARIA"":""" & MiDataRow("NOTARIA").ToString & """,")
                            resb.Append("""USUARIO"":""" & MiDataRow("NUSUARIOAP").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                    End If
                    res = resb.ToString()
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

                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"

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
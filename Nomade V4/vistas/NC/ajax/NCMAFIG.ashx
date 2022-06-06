<%@ WebHandler Language="VB" Class="NCMAFIG" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCMAFIG : Implements IHttpHandler

    Dim flag As String
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCAfectacionIgv("Bn")
    Dim res As String
    Dim cosu, des, tipo, cod As String
    Dim resb As New StringBuilder




    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")
        des = context.Request("des")
        cosu = context.Request("cosu")
        tipo = context.Request("tipo")
        cod = context.Request("cod")

        Try

            Select Case flag.ToString

                Case "1"
                    res = p.CrearAfectacionIgv(cosu, des, tipo)

                Case "2"
                    res = p.ActualizarAfectacionIgv(cod, cosu, des, tipo)

                Case "3"
                    dt = p.CargarAfectacionIgv(cod)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("CODIGO_SUNAT") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""TIPO_BIEN_COD"" :" & """" & dt.Rows(0)("TIPO_BIEN_COD") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("[Error]:" & ex.ToString)
        End Try


    End Sub



    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
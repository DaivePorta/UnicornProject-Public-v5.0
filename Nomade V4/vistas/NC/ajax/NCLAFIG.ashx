<%@ WebHandler Language="VB" Class="NCLAFIG" %>

Imports System
Imports System.Web
Imports System.Data




Public Class NCLAFIG : Implements IHttpHandler
    Dim flag, codigo, tipo_bien As String
    Dim dt As DataTable
    Dim p As New Nomade.NC.NCAfectacionIgv("Bn")
    Dim res As String

    Dim resb As New StringBuilder



    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        flag = context.Request("OPCION")
        codigo = context.Request("P_CODE")

        Try

            Select Case flag.ToString

                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarAfectacionIgv()
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & MiDataRow("CODIGO_SUNAT").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""TIPO_BIEN"" :" & """" & MiDataRow("TIPO_BIEN").ToString & """,")
                            resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "CE"
                    res = p.CambiarEstadoAfectacion(codigo)

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
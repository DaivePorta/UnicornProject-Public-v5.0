<%@ WebHandler Language="VB" Class="NMMPRDI" %>

Imports System
Imports System.Web
Imports System.Data
Imports System.IO
Imports System.Drawing
Imports System.Drawing.Imaging

Public Class NMMPRDI : Implements IHttpHandler

    Dim flag As String
    Dim dt As DataTable
    Dim nmPrecioDistribuidor As New Nomade.NM.NMPrecioDistribuidor("Bn")
    Dim res As String
    Dim codigo, codigo_empresa, codigo_rango, limite, descuento, user As String
    Dim resb As New StringBuilder


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        flag = context.Request("flag")

        codigo = context.Request("codigo")
        codigo_empresa = context.Request("codigo_empresa")
        codigo_rango = context.Request("codigo_rango")
        limite = context.Request("limite")
        descuento = context.Request("descuento")
        user = context.Request("user")

        Try

            Select Case flag.ToString

                Case "1"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmPrecioDistribuidor.ListarPrecioDistribuidor(codigo_empresa)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""CODIGO_RANGO"" :" & """" & MiDataRow("CODIGO_RANGO").ToString & """,")
                            resb.Append("""LIMITE"" :" & """" & MiDataRow("LIMITE").ToString & """,")
                            resb.Append("""DESCUENTO"" :" & """" & MiDataRow("DESCUENTO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()

                Case "2"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If (limite = "null") Then
                        limite = "0"
                    End If
                    res = nmPrecioDistribuidor.CrearPrecioDistribuidor(codigo_rango, limite, descuento, codigo_empresa, user)

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""RESPUESTA"" :" & """" & res & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "3"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If (limite = "null") Then
                        limite = "0"
                    End If
                    res = nmPrecioDistribuidor.ActualizarPrecioDistribuidor(codigo, codigo_rango, limite, descuento, codigo_empresa, user)

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""RESPUESTA"" :" & """" & res & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

            End Select

            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error!!!:" & ex.ToString)
        End Try
    End Sub


    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then


            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value='" & dt.Rows(i)(cvalue).ToString() & "' >" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next
        Else
            res = "<option>Sin Datos</option>"
        End If
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
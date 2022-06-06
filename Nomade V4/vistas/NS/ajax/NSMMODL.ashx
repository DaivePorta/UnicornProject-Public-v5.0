<%@ WebHandler Language="VB" Class="NSMMODL" %>

Imports System
Imports System.Web

Imports System.Data

Public Class NSMMODL : Implements IHttpHandler

    Dim flag As String

    Dim dt As DataTable
    Dim p As New Nomade.NS.NSModulo("Bn")
    Dim res As String
    Dim codigo, nombre, sistema, activo, user, codrec, descripcion, sist_new As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        codrec = context.Request.QueryString("codigo")

        'ASIGNACION DE VARIABLES CAPTURADAS 

        flag = context.Request("flag")

        codigo = context.Request("codi")
        nombre = context.Request("nomb")
        sistema = context.Request("sist")
        descripcion = context.Request("desc")
        descripcion = vChar(descripcion)

        user = context.Request("user")
        activo = context.Request("acti")
        sist_new = context.Request("sist_new")

        'FIN

        If codrec <> String.Empty Then
            flag = "C"
        End If

        Try

            Select Case flag.ToString

                Case "1"

                    res = p.CrearModulo(codigo, nombre, sistema, descripcion, activo, user)

                Case "2"

                    res = p.ActualizarModulo(codigo, nombre, sistema, descripcion, activo, user, sist_new)

                Case "3"

                    res = p.CambiarEstadoModulo(codigo, sistema)

                Case "4"
                    Dim p2 As New Nomade.NS.NSSistema("BN")

                    dt = p2.ListarSistema(String.Empty, "A")
                    res = GenerarSelect(dt, "codigo", "nombre", "SISTEMA")

                Case "5"

                    dt = p.ListarModulo(codigo, sistema, String.Empty)
                    res = String.Empty
                    If dt Is Nothing Then
                        res = "ok"
                    Else : res = "error"
                    End If

                Case "C"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarModulo(codrec, sistema, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""NOMBRE"" :" & """" & dt.Rows(0)("NOMBRE") & """,")
                    resb.Append("""SISTEMA"" :" & """" & dt.Rows(0)("SISTEMA") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION").ToString & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                    resb.Append("}")
                    resb.Append("]")
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
            res = "<option>Sin Datos</option>"
        End If
        Return res
    End Function


    Public Function vChar(ByVal campo As String) As String
        Dim res As String
        If campo IsNot Nothing Then
            res = campo.Trim().Replace("""", "'").Replace("\", " ")
            res = res.Replace(vbCrLf, "\n")
        Else
            res = campo
        End If
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
        
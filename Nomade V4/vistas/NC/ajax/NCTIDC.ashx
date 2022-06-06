<%@ WebHandler Language="VB" Class="NCTIDC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCTIDC : Implements IHttpHandler


    Dim flag As String

    Dim dt As DataTable
    Dim p As New Nomade.NC.NCTipoDC("Bn")
    Dim res As String
    Dim codigo, codigosunat, docinterno, descripcion, descripcioncorta, activo, user, codrec, gastos, almacen, compraventa, compras, acronimo As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        codrec = context.Request.QueryString("codigo")

        'ASIGNACION DE VARIABLES CAPTURADAS 

        flag = context.Request("flag")

        codigo = context.Request("codi")
        codigosunat = context.Request("cosu")
        docinterno = context.Request("docint")
        descripcion = context.Request("desc")
        descripcioncorta = context.Request("deco")
        gastos = context.Request("gast")
        almacen = context.Request("alma")
        compraventa = context.Request("cove")
        user = context.Request("user")
        activo = context.Request("acti")
        compras = context.Request("compras")
        acronimo = context.Request("acronimo")

        'FIN

        If codrec <> String.Empty Then
            flag = "C"
        End If

        Try

            Select Case flag.ToString

                Case "1"
                    res = CrearTipoDC(codigosunat, docinterno, descripcion, descripcioncorta, activo, user, compras, acronimo)

                Case "2"
                    res = ActualizarTipoDC(codigo, codigosunat, docinterno, descripcion, descripcioncorta, activo, user, compras, acronimo)

                Case "3"
                    res = CambiarEstadoTipoDC(codigo)

                Case Else
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarTipoDC(codrec, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("CODIGO_SUNAT") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""DESCRIPCION_CORTA"" :" & """" & dt.Rows(0)("DESCRIPCION_CORTA") & """,")
                    resb.Append("""TIPO_DOC"" :" & """" & dt.Rows(0)("TIPO_DOC") & """,")
                    resb.Append("""REG_COMPRA"" :" & """" & dt.Rows(0)("REG_COMPRA") & """,")
                    resb.Append("""ACRONIMO"" :" & """" & dt.Rows(0)("ACRONIMO") & """,")
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

    Public Function CrearTipoDC(ByVal p_codigosunat As String, ByVal p_docinterno As String,
                                ByVal p_descripcion As String, ByVal p_descripcioncorta As String,
                                ByVal p_activo As String, ByVal p_user As String,
                                ByVal p_compras As String, ByVal p_acronimo As String) As String
        Dim datos As String

        datos = p.CrearTipoDC(p_codigosunat, p_docinterno, p_descripcion, p_descripcioncorta, p_activo, p_user, p_compras, p_acronimo)

        Return datos

    End Function



    Public Function CambiarEstadoTipoDC(ByVal p_codigo As String) As String

        Dim datos As String

        datos = p.CambiarEstadoTipoDC(p_codigo)

        Return datos

    End Function


    Public Function ActualizarTipoDC(ByVal p_codigo As String, ByVal p_codigosunat As String, ByVal p_docinterno As String,
                                     ByVal p_descripcion As String, ByVal p_descripcioncorta As String,
                                     ByVal p_activo As String, ByVal p_user As String, ByVal p_compras As String, ByVal p_acronimo As String) As String
        Dim datos As String

        datos = p.ActualizarTipoDC(p_codigo, p_codigosunat, p_docinterno, p_descripcion, p_descripcioncorta, p_activo, p_user, p_compras, p_acronimo)

        Return datos

    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
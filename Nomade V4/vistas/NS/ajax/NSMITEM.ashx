<%@ WebHandler Language="VB" Class="NSMITEM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSMITEM : Implements IHttpHandler

    Dim flag As String

    Dim dt As DataTable
    Dim p As New Nomade.NS.NSItem("Bn")
    Dim res As String
    Dim codigo, nombre, sistema, activo, user, codrec, descripcion As String
    Dim resb As New StringBuilder
    Dim modulo As String
    Dim forma As String
    Dim DETAIL As String
    Dim DETAIL_COUNT As Integer
    Dim TIPO As String

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        codrec = context.Request.QueryString("codigo")

        'ASIGNACION DE VARIABLES CAPTURADAS 

        flag = context.Request("flag")

        codigo = context.Request("codi")
        nombre = context.Request("nomb")
        sistema = context.Request("sist")
        descripcion = context.Request("desc")
        user = context.Request("user")
        activo = context.Request("acti")
        modulo = context.Request("modu")
        forma = context.Request("form")
        DETAIL = context.Request("DETAIL")
        DETAIL_COUNT = context.Request("DETAIL_COUNT")

        TIPO = context.Request("TIPO")

        If codrec <> String.Empty Then
            flag = "C"
        End If


        Select Case flag.ToString

            Case "1"
                res = p.CrearItem(nombre, modulo, sistema, descripcion, activo, user, DETAIL, DETAIL_COUNT)

            Case "2"

                res = p.ActualizarItem(codigo, nombre, modulo, sistema, descripcion, activo, user, DETAIL, DETAIL_COUNT)

            Case "3"

                res = p.CambiarEstadoItem(codigo)

            Case "4"
                Dim p2 As New Nomade.NS.NSSistema("BN")

                dt = p2.ListarSistema(String.Empty, "A")
                res = GenerarSelectSistema(dt, "codigo", "nombre", "SISTEMA")

            Case "5"
                Dim p2 As New Nomade.NS.NSModulo("BN")

                dt = p2.ListarModulo(String.Empty, sistema, "A")
                res = GenerarSelect(dt, "codigo", "NOMBRE", "MODULO")

            Case "6"
                Dim p2 As New Nomade.NS.NSFormas("BN")

                dt = p2.Listar_Formas(String.Empty, "A", sistema)
                res = GenerarSelect(dt, "code", "descr", "FORMA")
                'res = String.Empty
                'If Not dt Is Nothing Then
                '    For i As Integer = 0 To dt.Rows.Count - 1
                '        res += dt.Rows(i)("CODE")

                '        If i < dt.Rows.Count - 1 Then
                '            res += ","
                '        End If

                '    Next

                'Else : res = "error"
                'End If

            Case "7" 'Listar sistema por Tipo
                Dim p2 As New Nomade.NS.NSSistema("BN")

                dt = p2.ListarSistema(String.Empty, "A", TIPO)
                res = GenerarSelectSistema(dt, "codigo", "nombre", "SISTEMA")

            Case "C"

                context.Response.ContentType = "application/json; charset=utf-8"
                dt = p.ListarItem(codrec, String.Empty, String.Empty, String.Empty)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                resb.Append("""NOMBRE"" :" & """" & dt.Rows(0)("NOMBRE") & """,")
                resb.Append("""SISTEMA"" :" & """" & dt.Rows(0)("SISTEMA") & """,")
                resb.Append("""MODULO"" :" & """" & dt.Rows(0)("MODULO") & """,")
                resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION").ToString().Replace(vbCrLf, "\n").Replace("""", "\""") & """,")
                resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                If dt.Rows(0)("JSON_DETAIL") Is DBNull.Value Then
                    resb.Append("""JSON_DETAIL"" :" & """[]""")
                Else
                    resb.Append("""JSON_DETAIL"" :" & dt.Rows(0)("JSON_DETAIL").ToString & "")
                End If
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()


        End Select

        context.Response.Write(res)



    End Sub


    Public Function GenerarSelect(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """ >" & dt.Rows(i)(chtml).ToString() & " - " & dt.Rows(i)(cvalue).ToString() & "</option>"
            Next
        Else
            res = "<option></option>"
        End If
        Return res
    End Function

    Public Function GenerarSelectSistema(ByVal dt As DataTable, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
            res = "<option></option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """ data-tipo=""" + dt.Rows(i)("TIPO_IND").ToString() + """  >" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next
        Else
            res = "<option></option>"
        End If
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
        
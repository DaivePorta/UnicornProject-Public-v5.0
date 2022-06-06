<%@ WebHandler Language="VB" Class="NSMFORM" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSMFORM : Implements IHttpHandler

    Dim OPCION As String
    Dim CODE, DESC, ESTADO_IND, SIST_CODE, USUA_ID, TIPO, AYUDA As String

    Dim dt As DataTable

    Dim res As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        OPCION = context.Request("OPCION")
        CODE = context.Request("CODE")
        DESC = context.Request("DESC")
        ESTADO_IND = context.Request("ESTADO_IND")
        SIST_CODE = context.Request("SIST_CODE")
        USUA_ID = context.Request("USUA_ID")
        TIPO = context.Request("TIPO")
        AYUDA = context.Request("AYUDA")

        Select Case OPCION

            Case "1" 'Lista Sistemas Todos
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim t As New Nomade.NS.NSSistema("Bn")
                dt = t.ListarSistema(String.Empty, "A")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                        resb.Append("""TIPO_IND"" :" & """" & MiDataRow("TIPO_IND").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "2" 'Lista Sistemas Por TIPO
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim t As New Nomade.NS.NSSistema("Bn")
                dt = t.ListarSistema(String.Empty, "A", TIPO)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """,")
                        resb.Append("""TIPO_IND"" :" & """" & MiDataRow("TIPO_IND").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case "N" 'Grabar Forma
                context.Response.ContentType = "application/json; charset=utf-8"
                resArray = GrabarFormas(CODE, DESC, ESTADO_IND, SIST_CODE, USUA_ID, TIPO, AYUDA)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "M" ' Actualizar Forma
                context.Response.ContentType = "application/json; charset=utf-8"
                resArray = ActualizarFormas(CODE, DESC, ESTADO_IND, SIST_CODE, USUA_ID, TIPO, AYUDA)
                resb.Append("[")
                resb.Append("{")
                resb.Append("""CODIGO"" :" & """" & resArray(0).ToString & """,")
                resb.Append("""SUCCESS"" :" & """" & resArray(1).ToString & """")
                resb.Append("}")
                resb.Append("]")
                res = resb.ToString()

            Case "R"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim s As New Nomade.NS.NSFormas("Bn")
                dt = s.Listar_Formas(CODE, String.Empty, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODE"" :" & """" & MiDataRow("CODE").ToString & """,")
                        resb.Append("""DESCR"" :" & """" & MiDataRow("DESCR").ToString & """,")
                        resb.Append("""ESTADO_IND"" :" & """" & MiDataRow("ESTADO_IND").ToString & """,")
                        resb.Append("""SIST_CODE"" :" & """" & MiDataRow("SIST_CODE").ToString & """,")
                        resb.Append("""FECHA_ACTV"" :" & """" & MiDataRow("FECHA_ACTV").ToString & """,")
                        resb.Append("""TIPO_IND"" :" & """" & MiDataRow("TIPO_IND").ToString & """,")
                        resb.Append("""AYUDA"" :" & """" & MiDataRow("AYUDA").ToString().Replace("""", "'") & """")
                        resb.Append("}")
                    Next
                    resb.Append("]")
                End If
                res = resb.ToString()
            Case Else

        End Select
        context.Response.Write(res)
    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    Public Function GrabarFormas(ByVal p_GTVOBJT_CODE As String, ByVal p_GTVOBJT_DESC As String, ByVal p_GTVOBJT_ESTADO_IND As String, ByVal p_GTVOBJT_SIST_CODE As String, ByVal p_GTVOBJT_USUA_ID As String, ByVal p_TIPO_IND As String, ByVal p_AYUDA As String) As Array
        Dim datos(2) As String
        Dim s As New Nomade.NS.NSFormas("Bn")
        datos = s.Crear_Formas(p_GTVOBJT_CODE, p_GTVOBJT_DESC, p_GTVOBJT_ESTADO_IND, p_GTVOBJT_SIST_CODE, p_GTVOBJT_USUA_ID, p_TIPO_IND, p_AYUDA)
        Return datos
    End Function

    Public Function ActualizarFormas(ByVal p_GTVOBJT_CODE As String, ByVal p_GTVOBJT_DESC As String, ByVal p_GTVOBJT_ESTADO_IND As String, ByVal p_GTVOBJT_SIST_CODE As String, ByVal p_GTVOBJT_USUA_ID As String, ByVal p_TIPO_IND As String, ByVal p_AYUDA As String) As Array
        Dim datos(2) As String
        Dim s As New Nomade.NS.NSFormas("Bn")
        datos = s.Actualizar_Formas(p_GTVOBJT_CODE, p_GTVOBJT_DESC, p_GTVOBJT_ESTADO_IND, p_GTVOBJT_SIST_CODE, p_GTVOBJT_USUA_ID, p_TIPO_IND, p_AYUDA)
        Return datos
    End Function
End Class
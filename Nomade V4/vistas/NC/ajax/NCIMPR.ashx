<%@ WebHandler Language="VB" Class="NCIMPR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCIMPR : Implements IHttpHandler

    Dim flag As String




    Dim dt As DataTable
    Dim p As New Nomade.NC.NCImpresora("Bn")
    Dim res As String
    Dim codigo, ctlg, scsl, marca, modelo, serie, activo, user, codrec, maquina, tipoind, p_CODIGO_EDI, p_OPCION, p_EMPRESA, p_SCSL, p_MARCA, p_MODELO, p_SERIE, p_USUARIO, p_TIPO, p_MAQUINA, p_ESTADO, p_CODIGO As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        p_CODIGO = context.Request.QueryString("p_CODIGO")

        'ASIGNACION DE VARIABLES CAPTURADAS 

        flag = context.Request("flag")

        p_CODIGO_EDI = context.Request("p_CODIGO")
        maquina = context.Request("maqu")
        marca = context.Request("marc")
        modelo = context.Request("mode")
        serie = context.Request("seri")
        tipoind = context.Request("tipo")
        user = context.Request("user")
        activo = context.Request("acti")
        ctlg = context.Request("ctlg")
        scsl = context.Request("scsl")


        p_OPCION = context.Request("p_OPCION")
        p_EMPRESA = context.Request("p_EMPRESA")
        p_SCSL = context.Request("p_SCSL")
        p_MARCA = context.Request("p_MARCA")
        p_MODELO = context.Request("p_MODELO")
        p_SERIE = context.Request("p_SERIE")
        p_USUARIO = context.Request("p_USUARIO")
        p_TIPO = context.Request("p_TIPO")
        p_MAQUINA = context.Request("p_MAQUINA")
        p_ESTADO = context.Request("p_ESTADO")


        'FIN

        If p_CODIGO <> String.Empty Then
            p_OPCION = "C"
        End If

        Try
            Select Case p_OPCION.ToString
                Case "1"
                    res = CrearImpresora(p_EMPRESA, p_SCSL, p_MAQUINA, p_MARCA, p_MODELO, p_SERIE, p_TIPO, p_ESTADO, p_USUARIO)
                Case "2"
                    res = ActualizarImpresora(p_CODIGO_EDI, p_EMPRESA, p_SCSL, p_MAQUINA, p_MARCA, p_MODELO, p_SERIE, p_TIPO, p_ESTADO, p_USUARIO)
                Case "3"
                    res = CambiarEstadoImpresora(p_CODIGO_EDI)
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarImpresora(If(codrec Is Nothing, "", codrec), String.Empty, String.Empty, p_EMPRESA)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & row("CODIGO") & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & row("CTLG_CODE") & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & row("SCSL_CODE") & """,")
                            resb.Append("""MARCA"" :" & """" & row("MARCA") & """,")
                            resb.Append("""MODELO"" :" & """" & row("MODELO") & """,")
                            resb.Append("""SERIE"" :" & """" & row("SERIE") & """,")
                            resb.Append("""MAQUINA"" :" & """" & row("MAQUINA") & """,")
                            resb.Append("""TIPO"" :" & """" & row("TIPO") & """,")
                            resb.Append("""ESTADO"" :" & """" & row("ESTADO") & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If

                    res = resb.ToString()
                Case "5"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarImpresora("", String.Empty, String.Empty, p_EMPRESA, p_SCSL)
                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                            resb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
                            resb.Append("""MARCA"":""" & row("MARCA").ToString & """,")
                            resb.Append("""MAQUINA"" :" & """" & row("MAQUINA") & """,")
                            resb.Append("""MODELO"":""" & row("MODELO").ToString & """,")
                            resb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                            resb.Append("""TIPO_DESCRIPCION"":""" & row("TIPO_DESCRIPCION").ToString & """,")
                            resb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                            resb.Append("},")

                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                        res = resb.ToString()
                        context.Response.Write(res)
                    End If
                    res = ""
                    context.Response.Write(res)
                Case Else
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarImpresora("", String.Empty, String.Empty, p_EMPRESA, p_SCSL)

                    If Not dt Is Nothing Then
                        resb.Append("[")

                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & dt.Rows(0)("CTLG_CODE") & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & dt.Rows(0)("SCSL_CODE") & """,")
                            resb.Append("""MARCA"" :" & """" & dt.Rows(0)("MARCA") & """,")
                            resb.Append("""MODELO"" :" & """" & dt.Rows(0)("MODELO") & """,")
                            resb.Append("""SERIE"" :" & """" & dt.Rows(0)("SERIE") & """,")
                            resb.Append("""MAQUINA"" :" & """" & dt.Rows(0)("MAQUINA") & """,")
                            resb.Append("""IMPRESORA"" :" & """" & dt.Rows(0)("IMPRESORA") & """,")
                            resb.Append("""TIPO"" :" & """" & dt.Rows(0)("TIPO") & """,")
                            resb.Append("""TIPO_DESCRIPCION"" :" & """" & dt.Rows(0)("TIPO_DESCRIPCION") & """,")
                            resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                            resb.Append("},")

                        Next
                        resb.Append("-")
                        resb.Replace("},-", "}")
                        resb.Append("]")
                        res = resb.ToString()
                        context.Response.Write(res)
                    End If
                    res = ""
                    context.Response.Write(res)

                    'resb.Append("[")
                    'resb.Append("{")
                    'resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    'resb.Append("""CTLG_CODE"" :" & """" & dt.Rows(0)("CTLG_CODE") & """,")
                    'resb.Append("""SCSL_CODE"" :" & """" & dt.Rows(0)("SCSL_CODE") & """,")
                    'resb.Append("""MARCA"" :" & """" & dt.Rows(0)("MARCA") & """,")
                    'resb.Append("""MODELO"" :" & """" & dt.Rows(0)("MODELO") & """,")
                    'resb.Append("""SERIE"" :" & """" & dt.Rows(0)("SERIE") & """,")
                    'resb.Append("""MAQUINA"" :" & """" & dt.Rows(0)("MAQUINA") & """,")
                    'resb.Append("""IMPRESORA"" :" & """" & dt.Rows(0)("IMPRESORA") & """,")
                    'resb.Append("""TIPO"" :" & """" & dt.Rows(0)("TIPO") & """,")
                    'resb.Append("""TIPO_DESCRIPCION"" :" & """" & dt.Rows(0)("TIPO_DESCRIPCION") & """,")
                    'resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                    'resb.Append("}")
                    'resb.Append("]")
                    'res = resb.ToString()
            End Select
            context.Response.Write(res)

        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)


        End Try

    End Sub

    Public Function CrearImpresora(ByVal p_ctlg As String, ByVal p_scsl As String, ByVal p_maquina As String, ByVal p_marca As String, ByVal p_modelo As String, ByVal p_serie As String, ByVal p_tipoind As String, ByVal p_activo As String, ByVal p_user As String) As String
        Dim datos As String
        datos = p.CrearImpresora(p_ctlg, p_scsl, p_maquina, p_marca, p_modelo, p_serie, p_tipoind, p_activo, p_user)
        Return datos
    End Function

    Public Function CambiarEstadoImpresora(ByVal p_codigo As String) As String
        Dim datos As String
        datos = p.CambiarEstadoImpresora(p_codigo)
        Return datos
    End Function

    Public Function ActualizarImpresora(ByVal p_codigo As String, ByVal p_ctlg As String, ByVal p_scsl As String, ByVal p_maquina As String, ByVal p_marca As String, _
                                      ByVal p_modelo As String, ByVal p_serie As String, ByVal p_tipoind As String, ByVal p_activo As String, _
                                      ByVal p_user As String) As String
        Dim datos As String
        datos = p.ActualizarImpresora(p_codigo, p_ctlg, p_scsl, p_maquina, p_marca, p_modelo, p_serie, p_tipoind, p_activo, p_user)
        Return datos
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
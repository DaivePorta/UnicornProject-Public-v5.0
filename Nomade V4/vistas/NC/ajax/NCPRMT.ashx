<%@ WebHandler Language="VB" Class="NCPRMT" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NCPRMT : Implements IHttpHandler
    Dim flag As String

    Dim dt As DataTable
    Dim p As New Nomade.NC.NCParametros("Bn")
    Dim res, usua As String
    Dim codigo, empresa, pantalla, valor, user, codrec, estado, descripcion, descripcion_detallada, codigo_sistema As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        codrec = context.Request.QueryString("codigo")

        'ASIGNACION DE VARIABLES CAPTURADAS 

        flag = context.Request("flag")

        codigo = context.Request("codi")
        empresa = context.Request("empr")
        pantalla = context.Request("pant")
        valor = context.Request("valo")
        descripcion = context.Request("desc")
        descripcion_detallada = context.Request("desc_det")
        codigo_sistema = context.Request("code_sist")
        user = context.Request("user")
        usua = context.Request("usua")
        estado = context.Request("estado")

        'FIN

        If codrec <> String.Empty Then
            flag = "C"
        End If

        Try

            Select Case flag.ToString

                Case "1"

                    res = CrearParametros(codigo, empresa, descripcion, valor, pantalla, descripcion_detallada, codigo_sistema, user)

                Case "2"

                    res = ActualizarParametros(codigo, empresa, descripcion, valor, pantalla, descripcion_detallada, codigo_sistema, user)

                Case "3"

                    Dim p2 As New Nomade.NC.NCEmpresa("BN")
                    dt = p2.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                    res = GenerarSelect(dt, "slcEmpresa", "codigo", "descripcion", "EMPRESA")

                Case "4"

                    dt = p.ListarParametros(String.Empty, String.Empty)
                    res = String.Empty
                    If Not dt Is Nothing Then
                        For i As Integer = 0 To dt.Rows.Count - 1
                            res += dt.Rows(i)("CODIGO")
                            If i < dt.Rows.Count - 2 Then
                                res += ","
                            End If

                        Next

                    Else : res = "error"
                    End If
                Case "5"
                    'context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fnGetParametro(codigo)
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If

                Case "GRUP" 'Lista Grupo de Parametros
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Dim sist As New Nomade.NS.NSSistema("BN")
                    Dim dt As DataTable
                    dt = sist.fnListarTblCodigo(codigo, estado)
                    If Not (dt Is Nothing) And dt.Rows.Count > 0 Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""VALOR"" :" & """" & MiDataRow("VALOR").ToString & """,")
                            resb.Append("""ABREVIATURA"" :" & """" & MiDataRow("ABREVIATURA").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("ESTADO").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "LCN01" 'Lista Parametros de Conrabilidad
                    'Por seguridad se envía el grupo estático desde el controlador
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fnListarParametros(codigo, String.Empty, "GPA0002")
                    If Not (dt Is Nothing) And dt.Rows.Count > 0 Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""VALOR"" :" & """" & MiDataRow("VALOR").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""GRUPO"" :" & """" & MiDataRow("GRUPO").ToString & """,")
                            resb.Append("""GRUPO_DESC"" :" & """" & dt.Rows(0)("GRUPO_DESC") & """,")
                            resb.Append("""TIPO_VAL"" :" & """" & dt.Rows(0)("TIPO_VAL") & """,")
                            resb.Append("""TIPO_VAL_DESC"" :" & """" & dt.Rows(0)("TIPO_VAL_DESC") & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")


                    End If
                    res = resb.ToString()
                    p = Nothing
                Case "LRI02" 'Lista Parametros de Riesgos
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fnListarParametros(codigo, String.Empty, "GPA0003")
                    If Not (dt Is Nothing) And dt.Rows.Count > 0 Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""VALOR"" :" & """" & MiDataRow("VALOR").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""GRUPO"" :" & """" & MiDataRow("GRUPO").ToString & """,")
                            resb.Append("""GRUPO_DESC"" :" & """" & dt.Rows(0)("GRUPO_DESC") & """,")
                            resb.Append("""TIPO_VAL"" :" & """" & dt.Rows(0)("TIPO_VAL") & """,")
                            resb.Append("""TIPO_VAL_DESC"" :" & """" & dt.Rows(0)("TIPO_VAL_DESC") & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    p = Nothing
                Case "OP102" 'Lista Parametros de Operaciones
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fnListarParametros(codigo, String.Empty, "GPA0004")
                    If Not (dt Is Nothing) And dt.Rows.Count > 0 Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""VALOR"" :" & """" & MiDataRow("VALOR").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""GRUPO"" :" & """" & MiDataRow("GRUPO").ToString & """,")
                            resb.Append("""GRUPO_DESC"" :" & """" & dt.Rows(0)("GRUPO_DESC") & """,")
                            resb.Append("""TIPO_VAL"" :" & """" & dt.Rows(0)("TIPO_VAL") & """,")
                            resb.Append("""TIPO_VAL_DESC"" :" & """" & dt.Rows(0)("TIPO_VAL_DESC") & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    p = Nothing
                Case "RH909" 'Lista Parametros de Recursos Humanos
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fnListarParametros(codigo, String.Empty, "GPA0005")
                    If Not (dt Is Nothing) And dt.Rows.Count > 0 Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""VALOR"" :" & """" & MiDataRow("VALOR").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""GRUPO"" :" & """" & MiDataRow("GRUPO").ToString & """,")
                            resb.Append("""GRUPO_DESC"" :" & """" & dt.Rows(0)("GRUPO_DESC") & """,")
                            resb.Append("""TIPO_VAL"" :" & """" & dt.Rows(0)("TIPO_VAL") & """,")
                            resb.Append("""TIPO_VAL_DESC"" :" & """" & dt.Rows(0)("TIPO_VAL_DESC") & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                    p = Nothing
                Case "LTPRM" 'Lista Todos
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.fnListarParametros(String.Empty, String.Empty)
                    If dt Is Nothing Then
                        res = "{}"
                    Else
                        res = Utilities.DataTableToJSON(dt)
                    End If
                Case Else

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarParametros(codrec, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""EMPRESA"" :" & """" & dt.Rows(0)("EMPRESA") & """,")
                    resb.Append("""PANTALLA"" :" & """" & dt.Rows(0)("PANTALLA") & """,")
                    resb.Append("""VALOR"" :" & """" & dt.Rows(0)("VALOR") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""DESCRIPCION_DETALLADA"" :" & """" & dt.Rows(0)("DESCRIPCION_DETALLADA") & """,")
                    resb.Append("""CODIGO_SISTEMA"" :" & """" & dt.Rows(0)("CODIGO_SISTEMA") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()


            End Select

            context.Response.Write(res)


        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try





    End Sub

    Public Function CrearParametros(ByVal p_codigo As String, ByVal p_empresa As String, ByVal p_descripcion As String, ByVal p_valor As String, ByVal p_pantalla As String, ByVal p_descripcion_detallada As String, ByVal p_codigo_sistema As String, ByVal p_user As String) As String
        Dim datos As String

        datos = p.CrearParametros(p_codigo, p_empresa, p_descripcion, p_valor, p_pantalla, p_descripcion_detallada, p_codigo_sistema, p_user)

        Return datos

    End Function



    Public Function ActualizarParametros(ByVal p_codigo As String, ByVal p_empresa As String, ByVal p_descripcion As String, ByVal p_valor As String, ByVal p_pantalla As String, ByVal p_descripcion_detallada As String, ByVal p_codigo_sistema As String, ByVal p_user As String) As String
        Dim datos As String

        datos = p.ActualizarParametros(p_codigo, p_empresa, p_descripcion, p_valor, p_pantalla, p_descripcion_detallada, p_codigo_sistema, p_user)

        Return datos

    End Function

    Public Function GenerarSelect(ByVal dt As DataTable, ByVal id As String, ByVal cvalue As String, ByVal chtml As String, ByVal clase As String) As String
        If Not dt Is Nothing Then
            res = "<select class=""span12"" id=""" & id & """>"
            res += "<option value=""0""><option>"
            For i As Integer = 0 To dt.Rows.Count - 1
                res += "<option  value=""" & dt.Rows(i)(cvalue).ToString() & """>" & dt.Rows(i)(chtml).ToString() & "</option>"
            Next
            res += "</select>"
        Else
            res = "error"
        End If
        Return res
    End Function




    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
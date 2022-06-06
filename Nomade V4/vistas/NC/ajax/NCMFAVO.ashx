<%@ WebHandler Language="VB" Class="NCMFAVO" %>

Imports System
Imports System.Web
Imports System.Data


Public Class NCMFAVO : Implements IHttpHandler
    Dim dt As DataTable
    Dim v As New Nomade.NC.NCVista("Bn")
    Dim resb As New StringBuilder
    Dim resf As New StringBuilder
    Dim res As String
    Dim flag As String
    Dim p_codigo, p_codvista, p_estado, p_usuario, p_codinterno, p_pidm, p_ctlg, p_scsl As String
    Dim msg As String
    Dim contexto As HttpContext
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        p_codigo = context.Request.QueryString("codigo")
        p_codvista = context.Request("codvista")
        p_codinterno = context.Request("codigo")
        p_estado = context.Request("activo")
        p_usuario = context.Request("usuario")
        p_pidm = 666
        p_ctlg = context.Request("ctlg")
        p_scsl = context.Request("scsl")

        flag=context.Request("flag")


        Select Case flag
            Case 0
                Try

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = v.ListarVista(IIf(p_codigo = String.Empty, "", p_codigo))
                    v = Nothing
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        resb.Append("{")
                        resb.Append("""OBJETO"" :" & """" & dt.Rows(0)("OBJETO") & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                        resb.Append("""TIPO_OBJETO"" :" & """" & dt.Rows(0)("DESCRIPCION_OBJETO") & """")
                        resb.Append("}")
                        resb.Append("]")
                    End If

                    res = resb.ToString()
                    context.Response.Write(res)

                Catch ex As Exception
                    context.Response.Write("error" & ex.ToString)
                End Try
            Case 1
                Try
                    msg = v.CrearFavorito(p_codvista, p_estado, p_usuario)
                    v = Nothing
                    context.Response.Write(msg)
                Catch ex As Exception
                    context.Response.Write("error" & ex.ToString)
                End Try
            Case 2
                Try
                    msg = v.ActualizarFavorito(p_codinterno, p_codvista, 1, 1, p_estado, p_usuario)
                    v = Nothing
                    context.Response.Write(msg)
                Catch ex As Exception
                    context.Response.Write("error" & ex.ToString)
                End Try
            Case 3
                Try
                    Dim color(3) As String
                    Dim icono(3) As String

                    color(0) = "green"
                    color(1) = "blue"
                    color(2) = "purple"
                    'color(3) = "black"
                    color(3) = "light-blue" 'CCQ 27/08/2014

                    icono(0) = "icon-table"
                    icono(1) = "icon-bar-chart"
                    icono(2) = "icon-share"
                    icono(3) = "icon-edit"

                    Dim Random As New Random()

                    ' generar un random entre 1 y 100  
                    Dim numero As Integer


                    dt = v.ListarFavoritos(p_usuario)
                    v = Nothing

                    If Not (dt Is Nothing) Then
                        For Each MiDataRow As DataRow In dt.Rows
                            numero = Random.Next(0, 3)
                            'CCQ 26/08/2014 ************************************************
                            resf.Append("<div class='span3 column sortable'>")
                            resf.Append("<div class='portlet box " & color(3) & "' style='border-style:ridge'>")
                            resf.Append("<div class='portlet-title'style='padding:2px 10px 1px 10px;'>")
                            resf.Append("<h4 style='color:black;font-size:14px;'>" & MiDataRow("FORMA").ToString() & "</h4>")
                            resf.Append("<div class='actions'>")
                            resf.Append("<a href=javascript:Quitar('" & MiDataRow("FORMA").ToString() & "'); class='btn red mini' style='margin-top:-5px'><i class='fa fa-book'></i> X</a>")
                            resf.Append("</div>")
                            resf.Append("</div>")
                            resf.Append("<div class='portlet-body'>")
                            resf.Append("<div class='input-append'>")
                            resf.Append("<a href='?f=" & MiDataRow("FORMA").ToString() & "' target='_blank' class='btn White blue-stripe span12' style='font-size:12px;font-weight:bold' >" & MiDataRow("NOMBRE_FORMA").ToString() & "</a>")
                            resf.Append("</div>")
                            resf.Append("</div>")
                            resf.Append("</div>")
                            resf.Append("</div>")
                            '******************************************************************
                        Next

                    End If
                    context.Response.Write(resf.ToString)
                Catch ex As Exception
                    context.Response.Write("error" & ex.ToString)
                End Try
            Case 4
                Try
                    res = v.QuitarFavorito(p_codvista, p_usuario)
                    context.Response.Write(res)
                Catch ex As Exception
                    context.Response.Write("error" & ex.ToString)
                End Try
            Case 5
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = Nothing
                Dim p As New NOMADE.NC.NCTipoPlan("Bn")
                dt = v.ListarVista("", "W")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""OBETO"" :" & """" & MiDataRow("OBJETO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                context.Response.Write(res)
            Case 6
                Dim dt_p As DataTable
                Dim p As New NOMADE.NC.NCParametros("Bn")
                dt_p = p.ListarParametros("HELP", "")
                If Not (dt_p Is Nothing) Then
                    For Each MiDataRow As DataRow In dt_p.Rows
                        resb.Append(MiDataRow("VALOR").ToString)
                    Next
                End If
                res = resb.ToString()
                context.Response.Write(res)
            Case "MENU"
                Dim infoUser As New NomadeHub
                res = infoUser.GetMenuUsuario(p_usuario, p_pidm, p_ctlg, p_scsl)
                infoUser = Nothing
                context.Response.Write(res)
            Case "FORMAS"
                Dim infoUser As New NomadeHub
                res = infoUser.GetFormasUsuario(p_usuario, p_pidm, p_ctlg, p_scsl)
                infoUser = Nothing
                context.Response.Write(res)

            Case "LVF" 'Lista Vistas Favoritos
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim dt As New DataTable
                dt = v.ListarVistaFavoritos(p_usuario, "A")
                If dt Is Nothing Then
                    res = "{}"
                Else
                    res = Utilities.DataTableToJSON(dt)
                End If
                context.Response.Write(res)
        End Select


    End Sub



    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
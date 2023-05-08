<%@ WebHandler Language="VB" Class="NSLJUST" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NSLJUST : Implements IHttpHandler
    Dim Justificacion As New Nomade.NS.NSJustificacion("Bn")
    Dim Opcion, Empr, Sucur, p_ESTADO_IND, p_TODOS_IND, p_MOTIVO, p_DETALLE, p_TIPO_JUST, p_TIPO_MOTIVO, Peri As String
    Dim Periodo As New Nomade.NF.NFPeriodo("Bn")
    Dim resb As New StringBuilder
    Dim res As String
    Dim Codigo As String
    Dim dt As DataTable
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Opcion = context.Request("Opcion")
        Empr = context.Request("Empresa")
        Sucur = context.Request("Sucursal")
        Peri = context.Request("Peri")
        p_ESTADO_IND = context.Request("p_ESTADO_IND")
        p_TODOS_IND = context.Request("p_TODOS_IND")
        p_MOTIVO = context.Request("p_MOTIVO")
        p_TIPO_JUST = context.Request("p_TIPO_JUST")
        p_TIPO_MOTIVO = context.Request("p_TIPO_MOTIVO")
        p_DETALLE = context.Request("p_DETALLE")

        Try
            Select Case Opcion
                Case "0"
                    'context.Response.ContentType = "application/json; charset=utf-8"
                    dt = New DataTable
                    '   dt = Periodo.Listar_Periodo("", "")
                    Dim Fecha As String = ""
                    If Not (dt Is Nothing) Then
                        For i = 0 To dt.Rows.Count - 1
                            Fecha = dt.Rows(0)("CODIGO").ToString()
                        Next

                    End If
                    res = Fecha
                Case "99"
                    res = Modificar_Justificacion_bloque(p_DETALLE, p_MOTIVO, p_TIPO_JUST, p_TIPO_MOTIVO)
                Case "X"
                    Codigo = context.Request("Codigo")
                    context.Response.ContentType = "application/json; charset=utf-8"
                    'dt = Justificacion.Listar_Justificacion(String.Empty, Empr, Sucur, Peri)
                    dt = Justificacion.Listar_Justificacion(Codigo, Nothing, Nothing, Nothing, Nothing)
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            'resb.Append("""FECHA_INI_PERIODO"" :" & """" & MiDataRow("FECHA_INI_PERIODO").ToString & """,")
                            'resb.Append("""FECHA_FIN_PERIODO"" :" & """" & MiDataRow("FECHA_FIN_PERIODO").ToString & """,")
                            resb.Append("""FECHA_HOY"" :" & """" & MiDataRow("FECHA_HOY").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""RHFATAR_TIPO_FALTA"" :" & """" & MiDataRow("RHFATAR_TIPO_FALTA").ToString & """,")
                            resb.Append("""TIPO_JUST"" :" & """" & MiDataRow("TIPO_JUST").ToString & """,")
                            resb.Append("""RHFATAR_MOTIVO"" :" & """" & MiDataRow("RHFATAR_MOTIVO").ToString & """,")
                            resb.Append("""PIDM"" :" & """" & MiDataRow("PIDM").ToString & """,")
                            resb.Append("""RHFATAR_DIA_INICIO"" :" & """" & MiDataRow("RHFATAR_DIA_INICIO").ToString & """,")
                            resb.Append("""RHFATAR_DIA_FIN"" :" & """" & MiDataRow("RHFATAR_DIA_FIN").ToString & """,")
                            resb.Append("""TIPO_MOTIVO"" :" & """" & MiDataRow("TIPO_MOTIVO").ToString & """,")
                            resb.Append("""RHFATAR_ESTADO_IND"" :" & """" & MiDataRow("RHFATAR_ESTADO_IND").ToString & """,")

                            'If CDate(MiDataRow("FECHA_CREACION").ToString) >= CDate(MiDataRow("FECHA_INI_PERIODO").ToString) And
                            '    CDate(MiDataRow("FECHA_CREACION").ToString) <= CDate(MiDataRow("FECHA_FIN_PERIODO").ToString) Then
                            '    resb.Append("""IND_MODIFICACION"" :" & """" & "S" & """,")
                            'Else
                            '    resb.Append("""IND_MODIFICACION"" :" & """" & "N" & """,")
                            'End If

                            resb.Append("""IND_COMPLETADO"" :" & """" & MiDataRow("IND_COMPLETADO").ToString & """,")
                            resb.Append("""IND_PLANILLA"" :" & """" & MiDataRow("IND_PLANILLA").ToString & """,")
                            resb.Append("""RHFATAR_DESDE_HORA"" :" & """" & MiDataRow("RHFATAR_DESDE_HORA").ToString & """,")
                            resb.Append("""RHFATAR_HASTA_HORA"" :" & """" & MiDataRow("RHFATAR_HASTA_HORA").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("NOMBRE").ToString & """")


                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")

                    End If
                    res = resb.ToString()
                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Empr = context.Request("Emp")
                    Sucur = context.Request("Suc")
                    Dim anho As String = context.Request("anho")
                    Dim mes As String = context.Request("mes")
                    Dim p_TIPO_FALTA As String = context.Request("p_TIPO_FALTA")
                    'dt = Justificacion.Listar_Justificacion(String.Empty, Empr, Sucur, Peri)
                    dt = Justificacion.Listar_Justificacion(String.Empty, Empr, IIf(Sucur = "T", Nothing, Sucur), anho, mes, p_ESTADO_IND, p_TODOS_IND, IIf(p_TIPO_FALTA = "", Nothing, p_TIPO_FALTA))
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("RHFATAR_CODE").ToString & """,")
                            resb.Append("""TIPO"" :" & """" & MiDataRow("TP").ToString & """,")
                            resb.Append("""NOMBRE"" :" & """" & MiDataRow("RHFATAR_NOMBRE").ToString & """,")
                            If Not MiDataRow("RHFATAR_DIA_INICIO").ToString.Equals("") Then
                                resb.Append("""DINICIO"" :" & """" & MiDataRow("RHFATAR_DIA_INICIO").ToString.Substring(0, 10) & """,")
                            End If

                            If Not MiDataRow("RHFATAR_DIA_FIN").ToString.Equals("") Then
                                resb.Append("""DFIN"" :" & """" & MiDataRow("RHFATAR_DIA_FIN").ToString.Substring(0, 10) & """,")
                            Else
                                resb.Append("""DFIN"" :" & """" & "" & """,")
                            End If
                            resb.Append("""NOMBRE_USUARIO"" :" & """" & MiDataRow("NOMBRE_USUARIO").ToString & """,")
                            resb.Append("""HINCIO"" :" & """" & MiDataRow("RHFATAR_DESDE_HORA").ToString & """,")
                            resb.Append("""ESTADO"" :" & """" & MiDataRow("RHFATAR_ESTADO_IND").ToString & """,")
                            resb.Append("""IND_PLANILLA"" :" & """" & MiDataRow("IND_PLANILLA").ToString & """,")
                            resb.Append("""CTLG_CODE"" :" & """" & MiDataRow("CTLG_CODE").ToString & """,")
                            resb.Append("""DESC_MOTIVO"" :" & """" & MiDataRow("DESC_MOTIVO").ToString & """,")
                            resb.Append("""SCSL_CODE"" :" & """" & MiDataRow("SCSL_CODE").ToString & """,")
                            resb.Append("""HFIN"" :" & """" & MiDataRow("RHFATAR_HASTA_HORA").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    Else
                        resb.Append("[]")
                    End If
                    res = resb.ToString()
                Case "I"
                    Codigo = context.Request("Codigo")
                    dt = Justificacion.Listar_Imagen(Codigo)
                    If Not (dt Is Nothing) Then
                        'resb.Append("<tbody>")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("<tr>")
                            resb.Append("<td style='display: none;'>" & MiDataRow("RHIMFTR_CODE").ToString & "</td>")
                            resb.Append("<td><a href=javaScript:Visualizar('" & MiDataRow("RHIMFTR_RUTA").ToString & "')>" & MiDataRow("RHIMFTR_DESCRIPCION").ToString & "</a></td>")
                            resb.Append("<td  align='center'><a class='btn red Eliminar' href=javascript:Eliminar('" & MiDataRow("RHIMFTR_CODE").ToString & "');><i class='icon-minus'></i></a></td>")
                            resb.Append("</tr>")
                        Next
                        'resb.Append("</tbody>")
                    Else
                        'resb.Append("<tbody>")
                        'resb.Append("</tbody>")
                    End If
                    res = resb.ToString()
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write(ex.Message)

        End Try

    End Sub



    Public Function Modificar_Justificacion_bloque(p_DETALLE As String, ByVal p_MOTIVO As String,
                                       ByVal p_TIPO_JUST As String, ByVal p_TIPO_MOTIVO As String) As String
        Dim cResultado As String = ""
        cResultado = Justificacion.Actualizar_Justificacion_bloque(p_DETALLE, p_MOTIVO, p_TIPO_JUST, p_TIPO_MOTIVO)
        Return cResultado
    End Function


    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
<%@ WebHandler Language="VB" Class="NMMACCA" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMMACCA : Implements IHttpHandler
    Dim OPCION As String
    Dim USUARIO As String

    Dim p_FTVACRE_TIPO_ACREDITA As String
    Dim p_FTVACRE_DESCRIPCION As String
    Dim p_FTVACRE_DETALLE As String
    Dim p_FTVACRE_PROCEDENCIA As String
    Dim p_FTVACRE_ESTADO As String
    Dim p_FTVACRE_USUA_ID As String

    Dim p_FTVACRE_CODIGO As String
    Dim p_FTVAPRD_CODIGO As String


    Dim P_FTVACRE_PRD_NRO_UNICO As String
    Dim P_FTVACRE_PRD_FECHA_INICIO As String
    Dim P_FTVACRE_PRD_FECHA_FIN As String
    Dim p_FTVACRE_PRD_ESTADO As String

    Dim nmGestionProductos As New Nomade.NM.NMGestionDeMarcas("Bn")

    Dim dt As DataTable

    Dim res, cod, msg As String
    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        OPCION = context.Request("OPCION")

        p_FTVACRE_CODIGO = context.Request("p_FTVACRE_CODIGO")
        If p_FTVACRE_CODIGO = "" Then
            p_FTVACRE_CODIGO = "0"
        End If
        p_FTVACRE_TIPO_ACREDITA = context.Request("p_FTVACRE_TIPO_ACREDITA")
        p_FTVACRE_DESCRIPCION = context.Request("p_FTVACRE_DESCRIPCION")
        p_FTVACRE_DETALLE = context.Request("p_FTVACRE_DETALLE")
        p_FTVACRE_PROCEDENCIA = context.Request("p_FTVACRE_PROCEDENCIA")
        p_FTVACRE_ESTADO = "A"
        p_FTVACRE_USUA_ID = HttpContext.Current.User.Identity.Name
        p_FTVAPRD_CODIGO = context.Request("p_FTVAPRD_CODIGO")


        P_FTVACRE_PRD_NRO_UNICO = context.Request("P_FTVACRE_PRD_NRO_UNICO")
        P_FTVACRE_PRD_FECHA_INICIO = context.Request("P_FTVACRE_PRD_FECHA_INICIO")
        P_FTVACRE_PRD_FECHA_FIN = context.Request("P_FTVACRE_PRD_FECHA_FIN")
        p_FTVACRE_PRD_ESTADO = context.Request("p_FTVACRE_PRD_ESTADO")
        Try
            Select Case OPCION
                Case "0" ' obtener
                    context.Response.ContentType = "application/json; charset=utf-8"
                    Try
                        Dim naAlmacen As New Nomade.NA.NAConfAlmacenes("Bn")
                        Dim oDT As New DataTable
                        oDT = nmGestionProductos.ListarAcreditacion(p_FTVACRE_CODIGO, "A")
                        If oDT Is Nothing Then
                            res = "[]"
                        ElseIf oDT.Rows.Count = 0 Then
                            res = "[]"
                        Else
                            res = Utilities.DataTableToJSON(oDT)
                        End If
                    Catch ex As Exception
                        context.Response.Write(ex.ToString)
                    End Try
                Case "1" 'Lista  

                    context.Response.ContentType = "application/text; charset=utf-8"
                    dt = nmGestionProductos.ListarAcreditacion(p_FTVACRE_CODIGO, "I")
                    res = GenerarTablaDocumento(dt)

                Case "2"


                    res = nmGestionProductos.RegistroAcreditacion(p_FTVACRE_TIPO_ACREDITA, p_FTVACRE_DESCRIPCION,
                                                                  p_FTVACRE_DETALLE, p_FTVACRE_PROCEDENCIA,
                                                                  p_FTVACRE_ESTADO, p_FTVACRE_USUA_ID)
                Case "3"

                    res = nmGestionProductos.ActualizarAcreditacion(p_FTVACRE_CODIGO, p_FTVACRE_TIPO_ACREDITA, p_FTVACRE_DESCRIPCION,
                                                              p_FTVACRE_DETALLE, p_FTVACRE_PROCEDENCIA,
                                                              p_FTVACRE_ESTADO, p_FTVACRE_USUA_ID)
                Case "4"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmGestionProductos.ListarAcreditacion(p_FTVACRE_CODIGO, "I")
                    If Not (dt Is Nothing) Then
                        resb.Append("[")
                        For Each row As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"":""" & row("FTVACRE_CODIGO").ToString & """,")
                            resb.Append("""TIPO_ACREDITA_ID"":""" & row("FTVACRE_TIPO_ACREDITA_ID").ToString & """,")
                            resb.Append("""TIPO_ACREDITA"":""" & row("FTVACRE_TIPO_ACREDITA").ToString & """,")
                            resb.Append("""DESCRIPCION"":""" & row("FTVACRE_DESCRIPCION").ToString & """,")
                            resb.Append("""DETALLE"":""" & row("FTVACRE_DETALLE").ToString & """,")
                            resb.Append("""PROCEDENCIA_ID"":""" & row("FTVACRE_PROCEDENCIA_ID").ToString & """,")
                            resb.Append("""PROCEDENCIA"":""" & row("FTVACRE_PROCEDENCIA").ToString & """")
                            resb.Append("},")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                        res = resb.ToString()
                    Else
                        res = "[]"
                    End If
                Case "5"
                    Try
                        context.Response.ContentType = "application/json; charset=utf-8"
                        dt = nmGestionProductos.ListarProductoAcreditacion(p_FTVAPRD_CODIGO, p_FTVACRE_PRD_ESTADO)
                        If Not (dt Is Nothing) Then

                            res = Utilities.Datatable2Json(dt)
                        Else
                            res = "[]"
                        End If
                        'If Not dt Is Nothing Then
                        '    resb.Append("[")
                        '    resb.Append("{")
                        '    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("FTVACRE_PRD_CODIGO") & """,")
                        '    resb.Append("""CODIGO_ACREDITACION"" :" & """" & dt.Rows(0)("FTVACRE_CODIGO") & """,")
                        '    resb.Append("""CODIGO_PRODUCTO"" :" & """" & dt.Rows(0)("FTVPRD_CODIGO") & """,")
                        '    resb.Append("""NRO_UNICO"" :" & """" & dt.Rows(0)("FTVACRE_PRD_NRO_UNICO") & """,")
                        '    resb.Append("""FECHA_INICIO"" :" & """" & dt.Rows(0)("FTVACRE_PRD_FECHA_INICIO") & """,")
                        '    resb.Append("""FECHA_FIN"" :" & """" & dt.Rows(0)("FTVACRE_PRD_FECHA_FIN") & """,")
                        '    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("FTVACRE_PRD_ESTADO") & """")
                        '    resb.Append("}")
                        '    resb.Append("]")
                        '    res = resb.ToString()
                        'Else
                        '    res = "[{}]"
                        'End If

                    Catch ex As Exception
                        context.Response.Write(ex.ToString)
                    End Try
                Case "6"
                    res = nmGestionProductos.RegistroAcreditacionPRD(p_FTVACRE_CODIGO, p_FTVAPRD_CODIGO, P_FTVACRE_PRD_NRO_UNICO, P_FTVACRE_PRD_FECHA_INICIO,
                                                              P_FTVACRE_PRD_FECHA_FIN, p_FTVACRE_ESTADO, p_FTVACRE_USUA_ID)
                Case "7"
                    res = nmGestionProductos.ActualizarAcreditacionEstado(p_FTVACRE_CODIGO)
            End Select
            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error" & ex.ToString)
        End Try


    End Sub


    Public Function GenerarTablaDocumento(ByVal dt As DataTable) As String
        res = ""
        resb.Clear()
        '------
        resb.AppendFormat("<table id=""tblDocumento"" class=""display DTTT_selectable"" border=""0"">")
        resb.AppendFormat("<thead>")
        resb.AppendFormat("<th style='max-width:100px;'>CODIGO</th>")
        resb.AppendFormat("<th style='max-width:100px;'>TIPO</th>")
        resb.AppendFormat("<th style='max-width:200px;'>DESCRIPCION</th>")
        resb.AppendFormat("<th style='max-width:400px;'>DETALLE</th>")
        resb.AppendFormat("<th style='max-width:100px;'>PROCEDENCIA</th>")
        resb.AppendFormat("<th style='max-width:100px;'>ESTADO</th>")
        resb.AppendFormat("<th style='max-width:100px;'>CAMBIAR ESTADO</th>")
        resb.AppendFormat("</thead>")
        resb.AppendFormat("<tbody>")

        If (dt IsNot Nothing) Then
            For i As Integer = 0 To dt.Rows.Count - 1
                resb.AppendFormat("<tr>")
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("FTVACRE_CODIGO").ToString())
                resb.AppendFormat("<td align='center'>{0}</td>", dt.Rows(i)("FTVACRE_TIPO_ACREDITA").ToString())
                resb.AppendFormat("<td align='left' >{0}</td>", dt.Rows(i)("FTVACRE_DESCRIPCION").ToString())
                resb.AppendFormat("<td align='center' >{0}</td>", dt.Rows(i)("FTVACRE_DETALLE").ToString())
                resb.AppendFormat("<td align='right' >{0}</td>", dt.Rows(i)("FTVACRE_PROCEDENCIA").ToString())
                Dim sEstado = "INACTIVO"
                If dt.Rows(i)("FTVACRE_ESTADO").ToString() = "A" Then
                    sEstado = "ACTIVO"
                End If
                resb.AppendFormat("<td align='right' >{0}</td>", sEstado)
                resb.AppendFormat("<td style='text-align:center;'>")
                'resb.AppendFormat("<a class='btn blue' onclick=""Actualiza('{0}')""><i class='icon-edit'></i></a>",  dt.Rows(i)("FTVACRE_CODIGO").ToString())
                resb.AppendFormat("<a class='btn green cambiarbt' onclick=""ActualizaEstado('{0}')""><i class='icon-refresh'></i></a>", dt.Rows(i)("FTVACRE_CODIGO").ToString())
                resb.AppendFormat("</td>")
                resb.AppendFormat("</tr>")
            Next
        End If

        resb.AppendFormat("</tbody>")
        resb.AppendFormat("</table>")
        res = resb.ToString()
        Return res
    End Function

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
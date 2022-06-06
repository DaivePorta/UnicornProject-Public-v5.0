<%@ WebHandler Language="VB" Class="NMMUNME" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMMUNME : Implements IHttpHandler

    Dim flag As String
    Dim dt As DataTable
    Dim p As New Nomade.NM.NMUnidadMedida("Bn")
    Dim res As String
    Dim codigo, desc, desc_corta, desc_inter, codigo_sunat, activo, user, unba, tipo_uni, estado As String
    Dim estado2 As String
    Dim resb As New StringBuilder
    Dim unvo As String


    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        context.Response.ContentType = "text/plain"

        flag = context.Request("flag")

        codigo = context.Request("codi")
        desc = context.Request("desc")
        desc_inter = context.Request("desi")
        desc_corta = context.Request("deco")
        codigo_sunat = context.Request("cosu")
        user = context.Request("user")
        activo = context.Request("acti")
        unba = context.Request("unba")
        unvo = context.Request("unvo")
        tipo_uni = context.Request("tipo_uni")
        estado = context.Request("estado")

        Try

            Select Case flag.ToString

                Case "1"

                    res = p.CrearUnidadMedida(codigo_sunat, desc, desc_inter, desc_corta, activo, user, unba, unvo, tipo_uni)

                Case "2"

                    res = p.ActualizarUnidadMedida(codigo, codigo_sunat, desc, desc_inter, desc_corta, activo, user, unba, unvo, tipo_uni)

                Case "3"



                Case "4"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarUnidadesGeneral(codigo, String.Empty, IIf(tipo_uni = Nothing, String.Empty, tipo_uni))
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                    resb.Append("""DESCRIPCION_INTERNACIONAL"" :" & """" & dt.Rows(0)("DESCRIPCION_INTERNACIONAL") & """,")
                    resb.Append("""UNME"" :" & """" & dt.Rows(0)("UNME") & """,")
                    resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("CODIGO_SUNAT") & """,")
                    resb.Append("""UNIDAD_BASE"" :" & """" & dt.Rows(0)("COD_UNIDAD_BASE") & """,")
                    resb.Append("""UNIDAD_VOLUMEN"" :" & """" & dt.Rows(0)("UNIDAD_VOLUMEN") & """,")
                    resb.Append("""COD_TIPO_UNIDAD"" :" & """" & dt.Rows(0)("COD_TIPO_UNIDAD") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "5"
                    dt = p.ListarUnidadMedida(String.Empty, "A", IIf(tipo_uni = Nothing, String.Empty, tipo_uni))
                    res = GenerarSelect(dt, "codigo", "descripcion", "UNIDAD DE MEDIDA")
                Case "6"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarUnidadMedida(IIf(codigo = Nothing, String.Empty, codigo), IIf(estado = Nothing, String.Empty, estado), IIf(tipo_uni = Nothing, String.Empty, tipo_uni))
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""COD_TIPO_UNIDAD"" :" & """" & MiDataRow("COD_TIPO_UNIDAD").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
                    res = resb.ToString()
                Case "7"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = p.ListarUnidadMedida(codigo, If(estado = Nothing Or estado = "", String.Empty, estado), IIf(tipo_uni = Nothing, String.Empty, tipo_uni))
                    If Not (dt Is Nothing) Then
                        dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """,")
                            resb.Append("""UNME"" :" & """" & MiDataRow("UNME").ToString & """")
                            resb.Append("}")
                            resb.Append(",")
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    End If
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
                If dt.Rows(i)(chtml).ToString() <> "" Then
                    res += "<option  value='" & dt.Rows(i)(cvalue).ToString() & "' >" & dt.Rows(i)(chtml).ToString() & "</option>"
                End If
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
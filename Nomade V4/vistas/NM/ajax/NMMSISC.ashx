<%@ WebHandler Language="VB" Class="NMMSISC" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMMSISC : Implements IHttpHandler

    Dim opcion As String
    Dim nmTipoSistemaIsc As New Nomade.NM.NMTipoSistemaIsc("Bn")
    Dim dt As DataTable
    Dim res As String
    Dim codigo, descripcion, codigo_sunat, usuario, estado As String
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        opcion = context.Request("OPCION")
        codigo = context.Request("p_CODIGO")
        descripcion = context.Request("p_DESCRIPCION")
        codigo_sunat = context.Request("p_COD_SUNAT")
        usuario = context.Request("p_USUARIO")
        estado = context.Request("p_ESTADO")

        Try
            Select Case opcion.ToString
                Case "G"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    res = nmTipoSistemaIsc.CrearTipoSistemaIsc(descripcion, codigo_sunat, estado, usuario)

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""RESPUESTA"" :" & """" & res & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "A"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    res = nmTipoSistemaIsc.ActualizarTipoSistemaIsc(codigo, descripcion, codigo_sunat, estado, usuario)

                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""RESPUESTA"" :" & """" & res & """")
                    resb.Append("}")
                    resb.Append("]")
                    res = resb.ToString()

                Case "L"
                    context.Response.ContentType = "application/json; charset=utf-8"
                    If codigo Is Nothing Then
                        dt = nmTipoSistemaIsc.ListarTipoSistemasIsc(String.Empty)
                        resb.Append("[")
                        For Each MiDataRow As DataRow In dt.Rows
                            If MiDataRow("ESTADO").ToString = "ACTIVO" Then
                                resb.Append("{")
                                resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                                resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                                resb.Append("}")
                                resb.Append(",")
                            End If
                        Next
                        resb.Append("{}")
                        resb = resb.Replace(",{}", String.Empty)
                        resb.Append("]")
                    Else
                        dt = nmTipoSistemaIsc.ListarTipoSistemasIsc(codigo)
                        If Not (dt Is Nothing) Then
                            resb.Append("[")
                            resb.Append("{")
                            resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                            resb.Append("""DESCRIPCION"" :" & """" & dt.Rows(0)("DESCRIPCION") & """,")
                            resb.Append("""CODIGO_SUNAT"" :" & """" & dt.Rows(0)("CODIGO_SUNAT") & """,")
                            resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """")
                            resb.Append("}")
                            resb.Append("]")
                        End If
                    End If

                    res = resb.ToString()
                    nmTipoSistemaIsc = Nothing

                Case "D"
                    res = nmTipoSistemaIsc.CambiarEstadoTipoSistemaIsc(codigo)

            End Select

            context.Response.Write(res)
        Catch ex As Exception
            context.Response.Write("error!!!:" & ex.ToString)
        End Try

    End Sub

    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function

End Class
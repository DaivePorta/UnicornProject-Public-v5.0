<%@ WebHandler Language="VB" Class="NMMRACL" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMMRACL : Implements IHttpHandler

    Dim flag As String

    Dim dt As DataTable
    Dim nmGestionPrecios As New Nomade.NM.NMGestionPrecios("Bn")

    Dim res As String
    Dim codigo, lista, tipo, activo, user, ctlg As String

    Dim DETAIL As String
    Dim DETAIL_COUNT As Integer

    Dim codrec, empresa As String

    Dim resb As New StringBuilder
    Dim resArray As Array

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        codrec = context.Request.QueryString("codigo")
        empresa = context.Request("empresa")
        'ASIGNACION DE VARIABLES CAPTURADAS 

        flag = context.Request("flag")
        codigo = context.Request("codi")
        lista = context.Request("list")

        activo = context.Request("acti")
        user = context.Request("user")
        ctlg = context.Request("ctlg")
        DETAIL = context.Request("DETAIL")
        DETAIL_COUNT = context.Request("DETAIL_COUNT")
        'FIN

        If codrec <> String.Empty Then
            flag = "C"
        End If
        Try
            Select Case flag.ToString


                Case "1"

                    res = nmGestionPrecios.CrearListaClaseClientes(lista, activo, user, ctlg, DETAIL, DETAIL_COUNT)

                Case "2"

                    res = nmGestionPrecios.ActualizarListaClaseClientes(codigo, lista, activo, user, ctlg, DETAIL, DETAIL_COUNT)

                Case "3"

                    res = nmGestionPrecios.CambiarEstadoLista(codigo)

                Case "C"

                    context.Response.ContentType = "application/json; charset=utf-8"
                    dt = nmGestionPrecios.ListaClaseClientes(codrec, empresa, String.Empty)
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""NOMBRE"" :" & """" & dt.Rows(0)("NOMBRE") & """,")
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

        Catch ex As Exception

            context.Response.Write("error" & ex.ToString)

        End Try

    End Sub



    Private Function SortDataTableColumn(ByVal dt As DataTable, ByVal column As String, ByVal sort As String) As DataTable
        Dim dtv As New DataView(dt)
        dtv.Sort = column & " " & sort
        Return dtv.ToTable()
    End Function
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class
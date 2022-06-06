<%@ WebHandler Language="VB" Class="NMMGMAR" %>

Imports System
Imports System.Web
Imports System.Data

Public Class NMMGMAR : Implements IHttpHandler
    Dim OPCION As String
    Dim CODE, MARCA, ESTADO_IND, USUA_ID As String
    Dim CTLG_CODE As String
    Dim GRUP_CODE, SUBGRUP_CODE As String
    Dim TODOS As String
    Dim res As String
    Dim dt As DataTable
    Dim resb As New StringBuilder

    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest

        OPCION = context.Request("OPCION")
        CODE = context.Request("CODE")
        MARCA = context.Request("MARCA")
        ESTADO_IND = context.Request("ESTADO_IND")
        USUA_ID = context.Request("USUA_ID")
        CTLG_CODE = context.Request("CTLG_CODE")
        GRUP_CODE = context.Request("GRUP_CODE")
        TODOS = context.Request("TODOS")
        SUBGRUP_CODE = context.Request("SUBGRUP_CODE")

        Select Case OPCION.ToString
            Case "1"
                Dim m As New Nomade.NM.NMGestionDeMarcas("Bn")
                res = m.CambiarEstadoGestionMarcas(CODE)
                m = Nothing
            Case "CM"
                Dim m As New Nomade.NM.NMGestionDeMarcas("Bn")
                res = m.CrearGestionMarcas(MARCA, ESTADO_IND, USUA_ID)
                m = Nothing
            Case "2"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim e As New Nomade.NC.NCEmpresa("Bn")
                dt = e.ListarEmpresa(String.Empty, "A", HttpContext.Current.User.Identity.Name)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                e = Nothing
                res = resb.ToString()
            Case "RM" 'LISTAR UNA MARCA EN ESPECIFICO

                context.Response.ContentType = "application/json; charset=utf-8"
                Dim m As New Nomade.NM.NMGestionDeMarcas("Bn")
                dt = m.ListarGestionMarcas(CODE, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    resb.Append("{")
                    resb.Append("""CODIGO"" :" & """" & dt.Rows(0)("CODIGO") & """,")
                    resb.Append("""MARCA"" :" & """" & dt.Rows(0)("MARCA") & """,")
                    resb.Append("""ESTADO"" :" & """" & dt.Rows(0)("ESTADO") & """,")
                    If dt.Rows(0)("JSON") Is DBNull.Value Then
                        resb.Append("""JSON"" :" & """[]""")
                    Else
                        resb.Append("""JSON"" :" & dt.Rows(0)("JSON").ToString & "")
                    End If
                    resb.Append("}")
                    resb.Append("]")
                End If
                res = resb.ToString()
                m = Nothing
            Case "3" ' LISTAR GRUPOS
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim g As New Nomade.NM.NMFamiliaProductos("Bn")
                dt = g.ListarGrupo(String.Empty, CTLG_CODE, String.Empty, "A", "SI")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("GRUP_DESC").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                g = Nothing
                res = resb.ToString()
            Case "4"
                context.Response.ContentType = "application/json; charset=utf-8"
                Dim g As New Nomade.NM.NMFamiliaProductos("Bn")
                dt = g.ListarGrupo(String.Empty, CTLG_CODE, GRUP_CODE, "A", "NO")
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODE").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("GRUP_DESC").ToString & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                g = Nothing
                res = resb.ToString()
            Case "AM"
                Dim m As New Nomade.NM.NMGestionDeMarcas("Bn")
                res = m.ActualizarGestionMarcas(CODE, MARCA, ESTADO_IND, USUA_ID)
                m = Nothing
            Case "CMS"
                Dim m As New Nomade.NM.NMGestionDeMarcas("Bn")
                res = m.CrearGestionMarcasSubGrupos(CTLG_CODE, GRUP_CODE, SUBGRUP_CODE, CODE, USUA_ID, TODOS)
                m = Nothing
            Case "CEMS"
                Dim m As New Nomade.NM.NMGestionDeMarcas("Bn")
                res = m.CambiarEstadoGestionMarcasSubGrupos(SUBGRUP_CODE, CODE, USUA_ID)
                m = Nothing
            Case "6"
                Dim m As New Nomade.NM.NMGestionDeMarcas("Bn")
                ESTADO_IND = IIf(ESTADO_IND Is Nothing, "A", ESTADO_IND)
                context.Response.ContentType = "application/json; charset=utf-8"
                dt = m.ListarGestionMarcasGrupo(SUBGRUP_CODE, ESTADO_IND)
                If Not (dt Is Nothing) Then
                    dt = SortDataTableColumn(dt, "DESCRIPCION", "ASC")
                    resb.Append("[")
                    For Each MiDataRow As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & MiDataRow("CODIGO").ToString & """,")
                        resb.Append("""DESCRIPCION"" :" & """" & MiDataRow("DESCRIPCION").ToString & """")
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
                Dim m As New Nomade.NM.NMGestionDeMarcas("Bn")
                dt = m.ListarGestionMarcas(CODE, String.Empty)
                If Not (dt Is Nothing) Then
                    resb.Append("[")
                    For Each row As DataRow In dt.Rows
                        resb.Append("{")
                        resb.Append("""CODIGO"" :" & """" & row("CODIGO") & """,")
                        resb.Append("""MARCA"" :" & """" & row("MARCA") & """,")
                        resb.Append("""ESTADO"" :" & """" & row("ESTADO") & """")
                        resb.Append("}")
                        resb.Append(",")
                    Next
                    resb.Append("{}")
                    resb = resb.Replace(",{}", String.Empty)
                    resb.Append("]")
                End If
                res = resb.ToString()
                m = Nothing
            Case Else

        End Select

        context.Response.Write(res)

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
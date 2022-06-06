Imports System.Data
Partial Class vistas_NM_NMLFPRO
    Inherits Nomade.N.Cub


    'Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
    '    Try

    '        Dim P As New Nomade.NC.NCGrupos("Bn")
    '        Dim dt As DataTable = Nothing
    '        Dim sb As New StringBuilder()
    '        Dim CTLG_CODE As String
    '        CTLG_CODE = Context.Request("CTLG_CODE")
    '        'dt = P.ListarGrupos_X_CTLG(String.Empty, "N", String.Empty)
    '        dt = P.lista_grupos_subgrupo_x_ctlg("N")
    '        'dt = P.lista_grupos_subgrupo_x_ctlg("N")

    '        If Not dt Is Nothing Then
    '            sb.Append("[")

    '            For Each row As DataRow In dt.Rows
    '                sb.Append("{")
    '                sb.Append("""CODE"":""" & row("CODE").ToString & """,")
    '                sb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
    '                sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """")
    '                sb.Append("},")

    '            Next
    '            sb.Append("-")
    '            sb.Replace("},-", "}")

    '            sb.Append("]")
    '        End If

    '        Me.hfObjTipoexistencias.Value = sb.ToString()
    '        P = Nothing
    '    Catch ex As Exception
    '        Response.Write("Error" & ex.ToString)
    '    End Try

    'End Sub
End Class

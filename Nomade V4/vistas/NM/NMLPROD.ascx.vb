Imports System.Data
Partial Class vistas_NM_NMLPROD
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        'Try
        '    Dim ctlg_code As String
        '    Dim p As New Nomade.NM.NMGestionProductos("Bn")
        '    Dim dt As New DataTable
        '    Dim sb As New StringBuilder()
        '    dt = p.LISTAR_PRODUCTO(String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, Me.hfempresa.Value)
        '    If Not dt Is Nothing Then
        '        sb.Append("[")
        '        For Each row As DataRow In dt.Rows
        '            sb.Append("{")
        '            sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
        '            sb.Append("""DESCRIPCION"":""" & row("DESC_ADM").ToString & """,")
        '            sb.Append("""MARCA"":""" & row("MARCA").ToString & """,")
        '            sb.Append("""GRUPO"":""" & row("DESC_GRUPO").ToString & """,")
        '            sb.Append("""SUBGRUPO"":""" & row("DESC_SUBGRUPO").ToString & """,")
        '            sb.Append("""EXISTENCIA"":""" & row("DESC_EXISTENCIA").ToString & """,")
        '            sb.Append("""COD_SERIE"":""" & row("CODIGO_ANTIGUO").ToString & """,")
        '            sb.Append("""UNIDAD_MEDIDA"":""" & row("DESC_UNIDAD_DESPACHO").ToString & """,")
        '            sb.Append("""COD_AUXILIAR"":""" & row("CODIGO_AUXILIAR").ToString & """")
        '            sb.Append("},")
        '        Next
        '        sb.Append("-")
        '        sb.Replace("},-", "}")
        '        sb.Append("]")
        '    End If
        '    Me.hfObjProductos.Value = sb.ToString()
        '    p = Nothing
        'Catch ex As Exception
        '    Response.Write("Error " & ex.ToString)
        'End Try
    End Sub
End Class

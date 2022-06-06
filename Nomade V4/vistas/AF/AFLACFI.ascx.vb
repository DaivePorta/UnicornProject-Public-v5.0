Imports System.Data

Partial Class vistas_AF_AFLACFI
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        'Try
        '    Dim af As New Nomade.AF.AFActivoFijo("BN")
        '    Dim dt As New DataTable
        '    Dim sb As New StringBuilder()

        '    dt = af.ListarActivosFijos(String.Empty, String.Empty, String.Empty, String.Empty, String.Empty)

        '    If Not dt Is Nothing Then
        '        sb.Append("[")
        '        For Each row As DataRow In dt.Rows
        '            sb.Append("{")
        '            sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
        '            sb.Append("""CODIGO_AF"":""" & row("CODIGO_AF").ToString & """,")
        '            sb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
        '            sb.Append("""CTLG"":""" & row("CTLG").ToString & """,")
        '            sb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
        '            sb.Append("""SCSL"":""" & row("SCSL").ToString & """,")
        '            sb.Append("""BIEN"":""" & row("BIEN").ToString & """,")
        '            sb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
        '            sb.Append("""VALOR_INICIAL"":""" & row("VALOR_INICIAL").ToString & """,")
        '            sb.Append("""VALOR_ACTUAL"":""" & row("VALOR_ACTUAL").ToString & """,")
        '            sb.Append("""FECHA_INICIAL"":""" & Nomade.nomade.cutilidades.fechaMostrar(row("FECHA_INICIAL").ToString) & """,")
        '            sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
        '            sb.Append("},")
        '        Next
        '        sb.Append("-")
        '        sb.Replace("},-", "}")
        '        sb.Append("]")
        '    End If
        '    hfLISTA.Value = sb.ToString()
        '    af = Nothing
        'Catch ex As Exception
        '    Response.Write("Error " & ex.ToString)
        'End Try
    End Sub

End Class

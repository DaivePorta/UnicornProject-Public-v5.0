Imports System.Data
Partial Class vistas_NC_NCLIMPR

    Inherits Nomade.N.Cub

    'Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
    '    Try
    '        Dim P As New Nomade.NC.NCImpresora("Bn")
    '        Dim dt As New DataTable
    '        Dim sb As New StringBuilder()

    '        dt = P.ListarImpresora(String.Empty, String.Empty, String.Empty)

    '        If Not dt Is Nothing Then
    '            sb.Append("[")

    '            For Each row As DataRow In dt.Rows
    '                sb.Append("{")
    '                sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
    '                sb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
    '                sb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
    '                sb.Append("""MARCA"":""" & row("MARCA").ToString & """,")
    '                sb.Append("""MODELO"":""" & row("MODELO").ToString & """,")
    '                sb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
    '                sb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
    '                sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
    '                sb.Append("},")

    '            Next
    '            sb.Append("-")
    '            sb.Replace("},-", "}")

    '            sb.Append("]")

    '        End If

    '        hfObjImpresoras.Value = sb.ToString()

    '        P = Nothing
    '    Catch ex As Exception
    '        Response.Write("Error " & ex.ToString)
    '    End Try
    'End Sub
End Class


Imports System.Data

Partial Class vistas_GL_GLLRENO
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Try
        '    Dim P As New Nomade.GL.GLRenovacionLetras("Bn")
        '    Dim dt As New DataTable
        '    Dim sb As New StringBuilder()

        '    dt = P.ListarRenovacion(String.Empty, "S")

        '    If Not dt Is Nothing Then
        '        sb.Append("[")

        '        For Each row As DataRow In dt.Rows
        '            sb.Append("{")
        '            sb.Append("""CODIGO"":""" & row("CODIGO_DOCUMENTO").ToString & """,")
        '            sb.Append("""NUMERO"":""" & row("NUMERO_DOCUMENTO").ToString & """,")
        '            sb.Append("""FECHA"":{""display"":""" & row("FECHA_EMISION").ToString & """,""order"":""" & String.Join("", row("FECHA_EMISION").ToString.Split("/").Reverse()) & """},")
        '            sb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
        '            sb.Append("""SMONEDA"":""" & row("SMONEDA").ToString & """,")
        '            sb.Append("""EMPRESA"":{""NOMBRE"":""" & row("NEMPRESA").ToString & """,""CODIGO"":""" & row("EMPRESA").ToString & """},")
        '            sb.Append("""GLOSA"":""" & row("GLOSA").ToString & """")
        '            sb.Append("},")

        '        Next
        '        sb.Append("-")
        '        sb.Replace("},-", "}")

        '        sb.Append("]")

        '    End If

        '    hfObjJSON.Value = sb.ToString()

        '    P = Nothing
        'Catch ex As Exception
        '    Response.Write("Error " & ex.ToString)
        'End Try
    End Sub

End Class

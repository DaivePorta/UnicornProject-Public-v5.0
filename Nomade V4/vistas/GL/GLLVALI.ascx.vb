Imports System.Data

Partial Class vistas_GL_GLLVALI
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Try
        '    Dim P As New Nomade.GL.GLLetras("Bn")
        '    Dim dt As New DataTable
        '    Dim sb As New StringBuilder()

        '    dt = P.ListarLetra(String.Empty, String.Empty, "C", "E")

        '    If Not dt Is Nothing Then
        '        sb.Append("[")

        '        For Each row As DataRow In dt.Rows
        '            sb.Append("{")
        '            sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
        '            sb.Append("""NUMERO"":""" & row("NUMERO").ToString & """,")
        '            sb.Append("""FECHA_GIRO"":{""display"":""" & row("FECHA_GIRO").ToString & """,""order"":""" & String.Join("", row("FECHA_GIRO").ToString.Split("/").Reverse()) & """},")
        '            sb.Append("""FECHA_VENC"":{""display"":""" & row("FECHA_VENC").ToString & """,""order"":""" & String.Join("", row("FECHA_VENC").ToString.Split("/").Reverse()) & """},")
        '            sb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
        '            sb.Append("""NGIRADOA"":""" & row("NGIRADOA").ToString & """,")
        '            sb.Append("""EMPRESA"":{""NOMBRE"":""" & row("NEMPRESA").ToString & """,""CODIGO"":""" & row("EMPRESA").ToString & """},")
        '            sb.Append("""FECHA"":{""display"":""" & row("FECHA_APROBACION").ToString & """,""order"":""" & String.Join("", row("FECHA_APROBACION").ToString.Split("/").Reverse()) & """},")
        '            sb.Append("""USUARIO"":""" & row("NUSUARIOAP").ToString & """")
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

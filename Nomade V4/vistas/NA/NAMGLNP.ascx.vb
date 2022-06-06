
Imports System.Data

Partial Class vistas_NA_NAMGLNP
    Inherits NOMADE.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        'Dim p As New NOMADE.FI.FILineaCProveedores("bn")
        'Dim dt As DataTable
        'Dim sb As StringBuilder

        'Try
        '    dt = p.fListarLineaCredito(String.Empty)

        '    If Not dt Is Nothing Then
        '        sb.Append("[")
        '        For Each row As DataRow In dt.Rows
        '            sb.Append("""SECUENCIA"":""" & row("SECUENCIA").ToString & """,")
        '            sb.Append("""LINCRED"":""" & row("LINCRED").ToString & """,")
        '            sb.Append("""MONEDA"":""" & row("MONEDA").ToString & """,")
        '            sb.Append("""PLAZO"":""" & row("PLAZO").ToString & """,")
        '            sb.Append("""FECHA_INICIO"":""" & row("FECHA_INICIO").ToString & """,")
        '            sb.Append("""FECHA_FINAL"":""" & row("FECHA_FINAL").ToString & """,")
        '            sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
        '            sb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
        '            sb.Append("},")
        '        Next

        '        sb.Append("-")
        '        sb.Replace("},-", "}")
        '        sb.Append("]")
        '    End If
        '    hfLineas.Value = sb.ToString
        ''    p = Nothing
        'Catch ex As Exception
        '    Response.Write("Error:" & ex.Message.ToString)
        'End Try
    End Sub
End Class

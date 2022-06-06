Imports System.Data
Partial Class vistas_NA_NALGREM
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        'Dim p As New Nomade.NA.NAConfAlmacenes("Bn")
        'Dim dt As New DataTable
        'Dim sb As New StringBuilder()

        'Try
        '    dt = p.fVisuaiizaGR(String.Empty, Nothing, Nothing)
        '    If Not dt Is Nothing Then
        '        sb.Append("[")

        '        For Each row As DataRow In dt.Rows
        '            sb.Append("{")
        '            sb.Append("""NRO_DOC"":""" & row("NRO_DOC").ToString & """,")
        '            sb.Append("""NOMBREDESTINO"":""" & row("NOMBREDESTINO").ToString & """,")
        '            sb.Append("""FECHA"":""" & row("FECHA").ToString & """,")
        '            sb.Append("""MOVIMIENTO"":""" & row("MOVIMIENTO").ToString & """,")
        '            sb.Append("""OPERACION"":""" & row("OPERACION").ToString & """,")
        '            sb.Append("""ALMACEN"":""" & row("ALMACEN").ToString & """,")
        '            sb.Append("""CHOFER"":""" & row("CHOFER").ToString & """,")
        '            sb.Append("""DESPACHA"":""" & row("DESPACHA").ToString & """,")
        '            sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
        '            sb.Append("},")

        '        Next
        '        sb.Append("-")
        '        sb.Replace("},-", "}")

        '        sb.Append("]")
        '    End If

        '    Me.hfObjGR.Value = sb.ToString()
        '    p = Nothing
        'Catch ex As Exception
        '    Response.Write(ex.ToString)
        'End Try
    End Sub
End Class

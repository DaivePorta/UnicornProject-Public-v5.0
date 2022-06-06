Imports System.Data

Partial Class vistas_NO_NOLREQC
    Inherits Nomade.N.Cub
    'Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
    '    Try
    '        Dim CORegistroCompras As New Nomade.CO.CORegistroCompras("Bn")
    '        Dim dt As New DataTable
    '        Dim sb As New StringBuilder()
    '        dt = CORegistroCompras.Listar_Req_compra_detalle("", "A", "", "CABECERA")
    '        If Not dt Is Nothing Then
    '            sb.Append("[")

    '            For Each row As DataRow In dt.Rows
    '                sb.Append("{")
    '                sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
    '                sb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
    '                sb.Append("""FECHA_TRAN"":""" & row("FECHA_TRAN").ToString & """,")
    '                sb.Append("""DESC_SCSL"":""" & row("DESC_SCSL").ToString & """,")
    '                sb.Append("""DESC_CTLG"":""" & row("DESC_CTLG").ToString & """")

    '                sb.Append("},")
    '            Next

    '            sb.Append("-")
    '            sb.Replace("},-", "}")

    '            sb.Append("]")
    '        End If
    '        Me.hfObjJson.Value = sb.ToString()
    '        CORegistroCompras = Nothing
    '    Catch ex As Exception
    '        Response.Write("Error " & ex.ToString)
    '    End Try
    'End Sub
End Class

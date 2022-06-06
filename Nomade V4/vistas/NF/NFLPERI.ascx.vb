Imports System.Data

Partial Class vistas_NF_NFLPERI
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        '    Try
        '        Dim P As New Nomade.NF.NFPeriodo("Bn")
        '        Dim dt As New DataTable
        '        Dim sb As New StringBuilder()
        '        dt = P.Listar_Periodo("", "")

        '        If Not dt Is Nothing Then
        '            sb.Append("[")

        '            For Each row As DataRow In dt.Rows
        '                sb.Append("{")
        '                sb.Append("""ANO"":""" & row("ANO").ToString & """,")
        '                sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
        '                sb.Append("""MES"":""" & row("MES").ToString & """,")
        '                sb.Append("""NUMERO_MES"":""" & row("NUMERO_MES").ToString & """,")
        '                sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
        '                sb.Append("},")

        '            Next

        '            sb.Append("-")
        '            sb.Replace("},-", "}")

        '            sb.Append("]")
        '        End If
        '        Me.hfObjJson.Value = sb.ToString()
        '        P = Nothing
        '    Catch ex As Exception
        '        Response.Write("Error " & ex.ToString)
        '    End Try
    End Sub

End Class

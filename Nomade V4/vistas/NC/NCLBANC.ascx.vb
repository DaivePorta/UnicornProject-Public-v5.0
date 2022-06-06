Imports System.Data

Partial Class vistas_NC_NCLBANC
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim caja As New Nomade.NC.NCBanco("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = caja.ListarBanco(" ", String.Empty)
            If Not dt Is Nothing Then
                sb.Append("[")
                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""BANCO"":""" & row("BANCO").ToString & """,")
                    sb.Append("""CODIGO_SUNAT"":""" & row("CODIGO_SUNAT").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""NOMBRE_COMERCIAL"":""" & row("NOMBRE_COMERCIAL").ToString & """,")
                    sb.Append("""RUC"":""" & row("RUC").ToString & """,")
                    sb.Append("""FECHA_TERMINO"":""" & row("FECHA_TERMINO").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")
                Next
                sb.Append("+")
                sb.Replace(",+", "")

                sb.Append("]")
            End If

            hfBancos.Value = sb.ToString()

            caja = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

End Class

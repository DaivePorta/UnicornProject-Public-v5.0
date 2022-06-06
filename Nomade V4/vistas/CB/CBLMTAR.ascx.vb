Imports System.Data

Partial Class vistas_CB_CBLMTAR
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim mtar As New Nomade.NC.NCMarcaTarjeta("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = mtar.ListarMarcaTarjeta(String.Empty, String.Empty)
            If Not dt Is Nothing Then
                sb.Append("[")
                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""MARCA"":""" & row("MARCA").ToString & """,")
                    sb.Append("""TIPO_MARCA"":""" & row("TIPO_MARCA").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")
                Next
                sb.Append("+")
                sb.Replace(",+", "")

                sb.Append("]")
            End If

            hfMarcasTarjeta.Value = sb.ToString()

            mtar = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

End Class


Imports System.Data

Partial Class vistas_NC_NCLTIPA
    Inherits Nomade.N.Cub


    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

        Try
            Dim TipoPago As New NOMADE.NC.NCTipoPago("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = TipoPago.Listar_TiPago(String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""Codigo"":""" & row("Codigo").ToString & """,")
                    sb.Append("""Codigo_Sunat"":""" & row("Codigo_Sunat").ToString & """,")
                    sb.Append("""Descripcion"":""" & row("Descripcion").ToString & """,")
                    sb.Append("""Estado"":""" & row("Estado").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjTipago.Value = sb.ToString()

            TipoPago = Nothing
        Catch ex As Exception
            Throw (ex)
        End Try



    End Sub


End Class

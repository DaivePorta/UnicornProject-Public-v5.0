Imports System.Data
Partial Class vistas_NC_NCLTCBA
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try

            Dim p As New NOMADE.NC.NCTipoCuentasBancarias("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()


            dt = p.ListarTCBancarias(String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""Codigo"":""" & row("Codigo").ToString & """,")
                    sb.Append("""Descripcion"":""" & row("Descripcion").ToString & """,")
                    sb.Append("""DESC_MONEDA"":""" & row("DESC_MONEDA").ToString & """,")
                    sb.Append("""CHEQUERA_IND"":""" & row("CHEQUERA_IND").ToString & """,")
                    sb.Append("""Estado"":""" & row("Estado").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If

            Me.hfObjTCBancarias.Value = sb.ToString()
            p = Nothing
        Catch ex As Exception
            Response.Write("Error" & ex.ToString)
        End Try

    End Sub

End Class

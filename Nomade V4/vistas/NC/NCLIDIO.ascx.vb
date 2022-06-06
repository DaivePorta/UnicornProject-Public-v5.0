

Imports System.Data


Partial Class vistas_NC_NCLIDIO
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

        Try
            Dim oIdioma As New Nomade.NC.NCIdioma("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = oIdioma.ListarIdioma(String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""codigo"":""" & row("codigo").ToString & """,")
                    sb.Append("""descripcion"":""" & row("descripcion").ToString & """,")
                    sb.Append("""nom_corto"":""" & row("nom_corto").ToString & """,")
                    sb.Append("""estado"":""" & row("estado").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjIdioma.Value = sb.ToString()

            oIdioma = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try

    End Sub
End Class

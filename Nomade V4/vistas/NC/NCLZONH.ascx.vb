Imports System.Data

Partial Class vistas_NC_NCLZONH
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

        Try
            Dim p As New Nomade.NC.NCZonaHoraria("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = p.Listar_ZonaHoraria(String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""Codigo"":""" & row("Codigo").ToString & """,")
                    sb.Append("""indicador"":""" & row("indicador").ToString & """,")
                    sb.Append("""zona"":""" & row("zona").ToString & """,")
                    sb.Append("""tiempo"":""" & row("tiempo").ToString & """,")
                    sb.Append("""descripcion"":""" & row("descripcion").ToString & """,")
                    sb.Append("""zona_hora"":""" & row("zona_hora").ToString & """,")
                    sb.Append("""Estado"":""" & row("Estado").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjZonaH.Value = sb.ToString()

            p = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try

    End Sub


End Class

Imports System.Data
Partial Class vistas_NC_NCLRDNI
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

        Try
            Dim P As New Nomade.NC.NCImagenDNIPersona("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.ListarImagen(String.Empty, "S")

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""DNI"" :" & """" & row("DNI") & """,")
                    sb.Append("""PIDM"" :" & """" & row("PIDM") & """,")
                    sb.Append("""NOMBRE"" :" & """" & row("NOMBRE") & """")
            
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjJSON.Value = sb.ToString()


            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub


End Class


Imports System.Data
Partial Class vistas_NC_NCLMONE
    Inherits Nomade.N.Cub


    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NC.NCMonedas("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.ListarMoneda(String.Empty, String.Empty, String.Empty)
            
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""Codigo"":""" & row("Codigo").ToString & """,")
                    sb.Append("""Descripcion"":""" & row("Descripcion").ToString & """,")
                    sb.Append("""Descripcion_Corto"":""" & row("Descripcion_Corto").ToString & """,")
                    sb.Append("""Simbolo"":""" & row("Simbolo").ToString & """,")
                    sb.Append("""estado"":""" & row("estado").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If
            hfObjMoneda.Value = sb.ToString()
            P = Nothing
        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub
End Class

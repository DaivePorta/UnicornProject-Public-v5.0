
Imports System.Data
Partial Class vistas_NC_NCLDETR

    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

        Try
            Dim P As New Nomade.NC.NCDetracciones("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.ListarDetracciones(String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"" :" & """" & row("CODIGO") & """,")
                    sb.Append("""ANEXO"" :" & """" & row("ANEXO") & """,")
                    sb.Append("""DEFINICION"" :" & """" & row("DEFINICION") & """,")
                    sb.Append("""TIPO_EXISTENCIA"" :" & """" & row("TIPO_EXISTENCIA") & """,")
                    sb.Append("""PORCENTAJE"" :" & """" & row("PORCENTAJE") & """,")
                    sb.Append("""ESTADO"" :" & """" & row("ESTADO") & """")
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





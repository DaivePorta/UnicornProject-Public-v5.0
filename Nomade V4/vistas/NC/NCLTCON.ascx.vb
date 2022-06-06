Imports System.Data

Partial Class vistas_NC_NCLTCON
    Inherits NOMADE.N.Cub
    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load


        Try
            Dim c As New Nomade.NC.NCTipodeContribuyente("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = c.Listar_Tipo_Contribuyente(String.Empty, String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""CODIGO_SUNAT"":""" & row("CODIGO_SUNAT").ToString & """,")
                    sb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
                    sb.Append("""NESTADO"":""" & row("NESTADO").ToString & """")
                    sb.Append("},")
                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjcontribuyente.Value = sb.ToString()

            c = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

Imports System.Data
Partial Class vistas_NC_NCLCUCO
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim P As New NOMADE.NC.NCClaseCuentaContable("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.Listar_ClaseCuentaContable(String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODE"":""" & row("CODE").ToString & """,")
                    sb.Append("""CODIGO_SUNAT"":""" & row("CODIGO_SUNAT").ToString & """,")
                    sb.Append("""NCTIPL_CODE"":""" & row("NCTIPL_CODE").ToString & """,")
                    sb.Append("""CLASE_CUENTA"":""" & row("CLASE_CUENTA").ToString & """,")
                    sb.Append("""NOMBRE_CORTO"":""" & row("NOMBRE_CORTO").ToString & """,")
                    sb.Append("""NESTADO_IND"":""" & row("NESTADO_IND").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjCCContable.Value = sb.ToString()

            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

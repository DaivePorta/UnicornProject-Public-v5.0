Imports System.Data
Partial Class vistas_NC_NCLPRMT
    Inherits NOMADE.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New NOMADE.NC.NCParametros("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.ListarParametros(String.Empty, String.Empty)


            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""VALOR"":""" & row("VALOR").ToString & """,")
                    sb.Append("""CODIGO_SISTEMA"" :" & """" & row("CODIGO_SISTEMA").ToString & """,")
                    sb.Append("""FECHA_ACTV"" :" & """" & row("FECHA_ACTV").ToString & """,")
                    sb.Append("""DESCRIPCION_SISTEMA"" :" & """" & row("DESCRIPCION_SISTEMA").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjParametros.Value = sb.ToString()

            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

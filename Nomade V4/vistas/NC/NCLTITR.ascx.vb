Imports System.Data


Partial Class vistas_NC_NCLTITR
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

        Try
            Dim P As New Nomade.NC.NCTipoTR("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.Listar_tipoTrab(String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""codigo"":""" & row("codigo").ToString & """,")
                    sb.Append("""codigo_sunat"":""" & row("codigo_sunat").ToString & """,")
                    sb.Append("""descripcion"":""" & row("descripcion").ToString & """,")
                    sb.Append("""estado"":""" & row("estado").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjTipPer.Value = sb.ToString()

            
            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

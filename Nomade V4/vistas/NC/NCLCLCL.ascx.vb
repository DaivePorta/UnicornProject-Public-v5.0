Imports System.Data

Partial Class vistas_NC_NCLCLCL

    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NC.NCTipoClienteProveedor("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.ListarTipoClienteProveedor(String.Empty, "C", String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                    sb.Append("""NEMPRESA"":""" & row("NEMPRESA").ToString & """,")
                    sb.Append("""CONFIGURACION"":""" & row("CONFIGURACION").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjCCliente.Value = sb.ToString()

            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class


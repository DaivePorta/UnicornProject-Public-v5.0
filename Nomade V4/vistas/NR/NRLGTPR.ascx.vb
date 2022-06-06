Imports System.Data

Partial Class vistas_NR_NRLGTPR

    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NR.NRCategoriaProveedor("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.ListarTipoClienteProveedor(String.Empty, "P", String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""EMPRESA"":{""codigo"":""" & row("EMPRESA").ToString & """,""nombre"":""" & row("NEMPRESA").ToString & """},")
                    sb.Append("""CONFIGURACION"":""" & row("CONFIGURACION").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")
                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjCProveedores.Value = sb.ToString()

            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class


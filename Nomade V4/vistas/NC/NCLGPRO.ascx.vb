Imports System.Data

Partial Class vistas_NC_NCLGPRO
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim NCEProveedor As New Nomade.NC.NCEProveedor("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = NCEProveedor.Listar_Proveedor_Grupo("", "", "NORMAL")
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":" & """" & row("CODIGO").ToString & """,")
                    sb.Append("""NOMBRE"":" & """" & row("NOMBRE").ToString & """,")
                    sb.Append("""DESCRIPCION"":" & """" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""NESTADO"":" & """" & row("NESTADO").ToString & """")
                    sb.Append("},")
                Next

                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If
            Me.hfObjJson.Value = sb.ToString()
            NCEProveedor = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

End Class

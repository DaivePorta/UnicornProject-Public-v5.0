Imports System.Data

Partial Class vistas_NS_NSLPASS
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim c As New Nomade.NS.NSUsuario("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = c.listarUsuario(String.Empty, String.Empty, String.Empty, String.Empty)
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""USUARIO"":""" & row("USUARIO").ToString & """,")
                    sb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
                    sb.Append("""FECHA_ACTV"":""" & row("FECHA_ACTV").ToString & """,")
                    sb.Append("""ORDEN_FECHA"":""" & String.Join("", row("FECHA_ACTV").ToString.Split("/").Reverse()) & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")

                Next

                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If
            Me.hfObjJson.Value = sb.ToString()
            c = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

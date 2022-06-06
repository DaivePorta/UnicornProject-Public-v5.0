Imports System.Data

Partial Class vistas_NS_NSLCLAS
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim c As New Nomade.NS.NSClases("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = c.Listar_Clases(String.Empty, String.Empty, String.Empty)
            If Not dt Is Nothing Then

                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODE"":""" & row("CODE").ToString & """,")
                    sb.Append("""DESCR"":""" & row("DESCR").ToString & """,")
                    'sb.Append("""NSIST_CODE"":""" & row("NSIST_CODE").ToString & """,")
                    sb.Append("""NESTADO_IND"":""" & row("NESTADO_IND").ToString & """")
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

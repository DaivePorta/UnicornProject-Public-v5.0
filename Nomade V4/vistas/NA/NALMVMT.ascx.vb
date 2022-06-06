Imports System.Data

Partial Class vistas_NA_NALMVMT
    Inherits Nomade.N.Cub


    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try

            Dim p As New Nomade.NA.NAMetodosValuacion("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()


            dt = p.Listar_Metodos(String.Empty, String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODE"":""" & row("CODE").ToString & """,")
                    sb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                    sb.Append("""METODO"":""" & row("METODO").ToString & """,")
                    sb.Append("""Estado"":""" & row("Estado").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If

            Me.hfObjMVMateriales.Value = sb.ToString()

            p = Nothing
        Catch ex As Exception
            Response.Write("Error" & ex.ToString)
        End Try

    End Sub

End Class

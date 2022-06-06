Imports System.Data

Partial Class vistas_NF_NFLCOMB
    Inherits NOMADE.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New NOMADE.NF.NFCombustibleUnidad("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = P.ListarCombustibleUnidad(String.Empty, String.Empty, String.Empty)
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""COMBUSTIBLE"":""" & row("COMBUSTIBLE").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")

                Next

                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If
            Me.hfObjJson.Value = sb.ToString()
            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

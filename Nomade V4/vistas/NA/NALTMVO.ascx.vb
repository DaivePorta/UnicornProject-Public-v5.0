Imports System.Data

Partial Class vistas_NA_NALTMVO
    Inherits NOMADE.N.Cub


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NA.NATipoMovimiento("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.ListarTipoMovimiento(String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""LOGISTICO"":""" & row("LOGISTICO").ToString & """,")
                    sb.Append("""IMPRIME_IND"":""" & row("IMPRIME_IND").ToString & """,")
                    sb.Append("""CODIGO_SUNAT"":""" & row("CODIGO_SUNAT").ToString & """,")
                    sb.Append("""CONTABLE"":""" & row("CONTABLE").ToString & """,")
                    sb.Append("""DESC_SUNAT"":""" & row("DESC_SUNAT").ToString & """,")
                    sb.Append("""DESC_CORTA"":""" & row("DESC_CORTA").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjJSON.Value = sb.ToString()

            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub



End Class

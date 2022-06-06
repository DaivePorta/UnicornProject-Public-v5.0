Imports System.Data

Partial Class vistas_NP_NPLMAIL
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.MP.MPOrdenFabricacion("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.SEL_MailProduccion(String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""TIPO"":""" & row("NTIPO").ToString & """,")
                    sb.Append("""NOMBRE"":""" & row("NOMBRE_COND").ToString & """,")
                    sb.Append("""ETAPA"":""" & row("NETAPA").ToString & """")
           
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
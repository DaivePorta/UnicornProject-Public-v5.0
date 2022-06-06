Imports System.Data

Partial Class vistas_NS_NSLSIST
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NS.NSSistema("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = P.ListarSistema(String.Empty, String.Empty)
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
                    sb.Append("""ACRONIMO"":""" & row("ACRONIMO").ToString & """,")
                    sb.Append("""ICONO"":""" & "<i style='font-size:25px;' class='" & row("ICONO").ToString & "'/>" & """,")
                    sb.Append("""TIPO"":""" & If(row("TIPO_IND").ToString = "W", "Web", If(row("TIPO_IND").ToString = "E", "Escritorio", row("TIPO_IND").ToString)) & """,")
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


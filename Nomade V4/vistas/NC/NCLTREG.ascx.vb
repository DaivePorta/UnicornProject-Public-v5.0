Imports System.Data

Partial Class vistas_NC_NCLTREG
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim NCTipoRegimen As New Nomade.NC.NCTipoRegimen("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = NCTipoRegimen.Listar_Tipo_Regimen("", "", "")
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""CODIGO_SUNAT"":""" & row("CODIGO_SUNAT").ToString & """,")
                    sb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
                    sb.Append("""ESTADO_EXO_IGV"":""" & row("ESTADO_EXO_IGV").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")
                Next

                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If
            Me.hfObjJson.Value = sb.ToString()
            NCTipoRegimen = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

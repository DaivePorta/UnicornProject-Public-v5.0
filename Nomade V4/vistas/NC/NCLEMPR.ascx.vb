
Imports System.Data
Partial Class vistas_NC_NCLEMPR
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NC.NCEmpresa("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = P.ListarTotalEmpresa(String.Empty, String.Empty)
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""AUTH"":""" & row("AUTH").ToString & """,")
                    sb.Append("""EMPRESA"":{""CODIGO"":""" & row("CODIGO").ToString & """,""AUTH"":""" & row("AUTH").ToString & """},")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""DESC_REGIMEN"":""" & row("DESC_REGIMEN").ToString & """,")
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
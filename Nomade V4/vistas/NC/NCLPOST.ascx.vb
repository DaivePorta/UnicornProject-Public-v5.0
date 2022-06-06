Imports System.Data

Partial Class vistas_NC_NCLPOST
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim pos As New Nomade.NC.NCPOS("BN")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = pos.ListarPOS(String.Empty, String.Empty, String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")
                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
                    sb.Append("""CTLG"":""" & row("CTLG").ToString & """,")
                    sb.Append("""SCSL_CODE"":""" & row("SCSL_CODE").ToString & """,")
                    sb.Append("""SCSL"":""" & row("SCSL").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""MARCA_MODELO"":""" & row("MARCA_MODELO").ToString & """,")
                    sb.Append("""FECHA"":""" & row("FECHA").ToString & """,")
                    sb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                    sb.Append("""TIPO"":""" & row("TIPO_DESC").ToString & """,")
                    sb.Append("""PREDETERMINADO"":""" & row("PREDETERMINADO").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")
                Next
                sb.Append("-")
                sb.Replace("},-", "}")
                sb.Append("]")
            End If
            hfLISTA.Value = sb.ToString()
            pos = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

End Class

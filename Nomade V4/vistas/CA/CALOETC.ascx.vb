Imports System.Data

Partial Class vistas_CA_CALOETC
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim oetc As New Nomade.CA.CAOETipoCambio("BN")
            Dim dt As New DataTable
            Dim resb As New StringBuilder()

            'dt = oetc.ListarOETipoCambio("", "")
            'If Not dt Is Nothing Then
            '    resb.Append("[")
            '    For Each row As DataRow In dt.Rows
            '        resb.Append("{")
            '        resb.Append("""CODIGO"" :" & """" & row("CODIGO").ToString & """,")
            '        resb.Append("""CTLG_DESC"" :" & """" & row("CTLG_DESC").ToString & """,")
            '        resb.Append("""SCSL_DESC"" :" & """" & row("SCSL_DESC").ToString & """,")
            '        resb.Append("""CAJA_DESC"" :" & """" & row("CAJA_DESC").ToString & """,")
            '        resb.Append("""CASA_CAMBIO_NC"" :" & """" & row("CASA_CAMBIO_NC").ToString & """,")
            '        resb.Append("""MODO"" :" & """" & row("MODO").ToString & """")
            '        resb.Append("}")
            '        resb.Append(",")
            '    Next
            '    resb.Append("{}")
            '    resb = resb.Replace(",{}", String.Empty)
            '    resb.Append("]")
            'End If

            'hfOETC.Value = resb.ToString()

            'oetc = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

End Class

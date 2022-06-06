Imports System.Data

Partial Class vistas_NB_NBLCCUE
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim b As New Nomade.NC.NCCuentaBancaria("BN")
            Dim dt As New DataTable
            Dim resb As New StringBuilder()

            dt = b.ListarCuentasBancarias("", "", "A")
            If Not dt Is Nothing Then
                resb.Append("[")
                For Each row As DataRow In dt.Rows
                    resb.Append("{")
                    resb.Append("""CODE"" :" & """" & row("CODE").ToString & """,")
                    resb.Append("""CODE_EMPRESA"" :" & """" & row("CODE_EMPRESA").ToString & """,")
                    resb.Append("""NRO_CUENTA"" :" & """" & row("NRO_CUENTA").ToString & """,")
                    resb.Append("""DESCRIPCION"" :" & """" & row("DESCRIPCION").ToString & """,")
                    resb.Append("""NRO_CTA_INTER"" :" & """" & row("NRO_CTA_INTER").ToString & """,")
                    resb.Append("""CTAS_CODE"" :" & """" & row("CTAS_CODE").ToString & """,")
                    resb.Append("""DESC_FIRMA"" :" & """" & row("DESC_FIRMA").ToString & """,")
                    resb.Append("""ESTADO"" :" & """" & row("ESTADO").ToString & """")
                    resb.Append("}")
                    resb.Append(",")
                Next
                resb.Append("{}")
                resb = resb.Replace(",{}", String.Empty)
                resb.Append("]")
            End If

            hfOETC.Value = resb.ToString()

            b = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub

End Class

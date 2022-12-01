Imports System.Data
Partial Class vistas_NC_NCLCOWH
    Inherits Nomade.N.Cub
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NC.NCWhatsapp("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.ListarCuentasWhatsapp(String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("Codigo").ToString & """,")
                    sb.Append("""EMPRESA"":""" & row("Empresa").ToString & """,")
                    sb.Append("""NRO TELEFONO"":""" & row("Telefono").ToString & """,")
                    sb.Append("""WABA ID"":""" & row("Id_Cuenta_whatsapp").ToString & """,")
                    sb.Append("""ESTADO"":""" & UCase(row("Estado").ToString) & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If

            hfObjWhatsapp.Value = sb.ToString()

            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

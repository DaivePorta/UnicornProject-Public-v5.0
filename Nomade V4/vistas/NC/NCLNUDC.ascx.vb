Imports System.Data

Partial Class vistas_NC_NCLNUDC
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NC.NCNumeracionDC("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.ListarNuDC(String.Empty, String.Empty, Me.usuario)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""DOCUMENTO"":""" & row("DOCUMENTO").ToString & """,")
                    sb.Append("""COMPROBANTE"":""" & row("COMPROBANTE").ToString & """,")
                    sb.Append("""CAJA"":""" & row("CAJA").ToString & """,")
                    sb.Append("""IMPRENTA"":""" & row("IMPRENTA").ToString & """,")
                    sb.Append("""CORRE"":""" & row("CORRE").ToString & """,")
                    sb.Append("""NRO_DIGITO"":""" & row("NRO_DIGITO").ToString & """,")
                    sb.Append("""SERIE"":""" & row("SERIE").ToString & """,")
                    sb.Append("""VALOR_INICIO"":""" & row("VALOR_INICIO").ToString & """,")
                    sb.Append("""VALOR_FIN"":""" & row("VALOR_FIN").ToString & """,")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""CODE_EMPRESA"":""" & row("CODE_EMPRESA").ToString & """,")
                    sb.Append("""TIPO_DOC"":""" & row("TIPO_DOC").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjNTDComercial.Value = sb.ToString()

            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class



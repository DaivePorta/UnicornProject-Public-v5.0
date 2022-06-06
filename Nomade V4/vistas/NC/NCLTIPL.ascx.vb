Imports System.Data
Partial Class vistas_NC_NCLTIPL
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NC.NCTipoPlan("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.Listar_TipoPlan(String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
                    sb.Append("""CODIGO_SUNAT"":""" & row("CODIGO_SUNAT").ToString & """,")
                    sb.Append("""DESCRIPCION"":""" & row("DESCRIPCION").ToString & """,")
                    sb.Append("""DESCRIPCION_CORTA"":""" & row("DESCRIPCION_CORTA").ToString & """,")                    
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjTipoPCuentas.Value = sb.ToString()


            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class


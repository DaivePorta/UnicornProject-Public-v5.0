Imports System.Data

Partial Class vistas_NC_NCLFILA
    Inherits NOMADE.N.Cub


    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NC.NCFinPeriodoLaboral("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.Listar_FinPerLaboral(String.Empty, String.Empty, String.Empty)
            
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""Codigo"":""" & row("Codigo").ToString & """,")
                    sb.Append("""Codigo_Sunat"":""" & row("Codigo_Sunat").ToString & """,")
                    sb.Append("""Descripcion"":""" & row("Descripcion").ToString & """,")                   
                    sb.Append("""Estado"":""" & row("Estado").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjMFPeriodo.Value = sb.ToString()

            P = Nothing
        Catch ex As Exception

        End Try
    End Sub
End Class

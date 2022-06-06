Imports System.Data

Partial Class vistas_NC_NCLEPSA
    Inherits NOMADE.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim P As New NOMADE.NC.NCEps("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.ListarEps(String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""codigo"":""" & row("codigo").ToString & """,")
                    sb.Append("""codigo_sunat"":""" & row("codigo_sunat").ToString & """,")
                    sb.Append("""eps"":""" & row("eps").ToString & """,")
                    sb.Append("""fecha_ini"":{""display"":""" & row("fecha_ini").ToString & """,""order"":""" & String.Join("", row("fecha_ini").ToString.Split("/").Reverse()) & """},")                    
                    sb.Append("""fecha_fin"":{""display"":""" & row("fecha_fin").ToString & """,""order"":""" & String.Join("", row("fecha_fin").ToString.Split("/").Reverse()) & """},")
                    sb.Append("""Estado"":""" & row("Estado").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjEpsa.Value = sb.ToString()
            
            P = Nothing
        Catch ex As Exception
            Response.Write("Error" & ex.ToString)
        End Try
    End Sub
End Class


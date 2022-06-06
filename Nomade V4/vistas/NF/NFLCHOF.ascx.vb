Imports System.Data

Partial Class vistas_NF_NFLCHOF
    Inherits NOMADE.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New NOMADE.NC.NCEChofer("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = P.ListarChofer(0, String.Empty, String.Empty)
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                    sb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
                    sb.Append("""NOMBRE_EMPRESA"":""" & row("NOMBRE_EMPRESA").ToString & """,")
                    sb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                    sb.Append("""RENOVACION"":{""display"":""" & row("RENOVACION").ToString & """,""order"":""" & String.Join("", row("RENOVACION").ToString.Split("/").Reverse()) & """},")
                    sb.Append("""LICENCIA"":""" & row("LICENCIA").ToString & """,")
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

Imports System.Data

Partial Class vistas_NC_NCLREPE
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim p As New Nomade.NC.NCRegimenPen("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = p.ListarRegimenP(String.Empty, String.Empty, String.Empty)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""codigo"":""" & row("codigo").ToString & """,")
                    sb.Append("""Codigo_Sunat"":""" & row("Codigo_Sunat").ToString & """,")
                    If row("TIP").ToString.Equals("1") Then
                        sb.Append("""TIPO"":""" & "AFP" & """,")
                    End If
                    If row("TIP").ToString.Equals("2") Then
                        sb.Append("""TIPO"":""" & "ONP" & """,")
                    End If
                    If row("TIP").ToString.Equals("3") Then
                        sb.Append("""TIPO"":""" & "OTROS" & """,")
                    End If
                    sb.Append("""Descripcion"":""" & row("Descripcion").ToString & """,")
                    sb.Append("""fecha_ini"":{""display"":""" & row("fecha_ini").ToString & """,""order"":""" & String.Join("", row("fecha_ini").ToString.Split("/").Reverse()) & """},")
                    sb.Append("""fecha_fin"":{""display"":""" & row("fecha_fin").ToString & """,""order"":""" & String.Join("", row("fecha_fin").ToString.Split("/").Reverse()) & """},")
                    sb.Append("""Estado"":""" & row("Estado").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjRegimen.Value = sb.ToString()

            p = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

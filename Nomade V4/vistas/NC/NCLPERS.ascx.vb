Imports System.Data

Partial Class vistas_NC_NCLPERS
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim p As New NOMADE.NC.NCPersona("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = p.listar_Persona("S")

            If Not dt Is Nothing Then
                sb.Append("[")
                For Each row As DataRow In dt.Rows

                    sb.Append("{")

                    sb.Append("""NOMBRE"":""" & row("NOMBRE").ToString.Replace("""", "\""") & """,")

                    sb.Append("""TIPO_DOCUMENTO"":""" & row("TIPO_DOCUMENTO").ToString & """,")

                    sb.Append("""NRO_DOCUMENTO"":""" & row("NRO_DOCUMENTO").ToString & """,")

                    sb.Append("""NRO_RUC"":""" & row("NRO_RUC").ToString & """,")

                    sb.Append("""TIPO_PERSONA"":""" & row("TIPO_PERSONA").ToString & """,")

                    sb.Append("""ANIVERSARIO"":{""display"":""" & row("ANIVERSARIO").ToString & """,""order"":""" & row("ORDEN_FECHA").ToString & """},")

                    sb.Append("""TELEFONO"":""" & row("TELEFONO").ToString & """,")

                    sb.Append("""CORREO"":""" & row("CORREO").ToString & """,")

                    sb.Append("""DIRECCION"":""" & row("DIRECCION").ToString.Replace("""", "\""") & """,")

                    sb.Append("""CODIGO_TIPO_PERSONA"":""" & row("CODIGO_TIPO_PERSONA").ToString & """,")

                    sb.Append("""CODIGO_TIPO_DOCUMENTO"":""" & row("CODIGO_TIPO_DOCUMENTO").ToString & """,")

                    sb.Append("""PIDM"":""" & row("PIDM").ToString & """,")

                    sb.Append("""ID"":""" & row("ID").ToString & """")

                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")
            End If

            hfObjPersona.Value = sb.ToString()

            p = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

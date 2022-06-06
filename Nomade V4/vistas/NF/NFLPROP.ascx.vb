Imports System.Data

Partial Class vistas_NF_NFLPROP
    Inherits NOMADE.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try

            Dim P As New Nomade.NF.NFUnidadVehiculo("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()
            dt = P.ListarPropietario("")
            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""PIDM"":""" & row("PIDM").ToString & """,")
                    sb.Append("""NOMBRE"":""" & row("NOMBRE").ToString & """,")
                    sb.Append("""NOMBRE_EMPRESA"":""" & row("NOMBRE_EMPRESA").ToString & """,")
                    sb.Append("""EMPRESA"":""" & row("EMPRESA").ToString & """,")
                    sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")
                    sb.Append("""TIPO"":""" & row("TIPO").ToString & """,")
                    sb.Append("""CODIGO_TIPO_DOCUMENTO"":""" & row("CODIGO_TIPO_DOCUMENTO").ToString & """,")
                    sb.Append("""TIPO_DOCUMENTO"":""" & row("TIPO_DOCUMENTO").ToString & """,")
                    sb.Append("""NRO_DOCUMENTO"":""" & row("NRO_DOCUMENTO").ToString & """")
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


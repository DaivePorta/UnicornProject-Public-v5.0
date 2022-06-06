Imports System.Data

Partial Class vistas_NF_NFLUNID
    Inherits NOMADE.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Try
        '    Dim P As New NOMADE.NF.NFUnidadVehiculo("Bn")
        '    Dim dt As New DataTable
        '    Dim sb As New StringBuilder()
        '    dt = P.ListarUnidad(String.Empty, String.Empty, String.Empty, 0, Me.usuario)
        '    If Not dt Is Nothing Then
        '        sb.Append("[")

        '        For Each row As DataRow In dt.Rows

        '            sb.Append("{")
        '            sb.Append("""CODIGO"":""" & row("CODIGO").ToString & """,")
        '            sb.Append("""PLACA"":""" & row("PLACA").ToString & """,")
        '            sb.Append("""PROPIETARIO_NOMBRE"":""" & row("PROPIETARIO_NOMBRE").ToString & """,")
        '            sb.Append("""NOMBRE_EMPRESA"":""" & row("NOMBRE_EMPRESA").ToString & """,")
        '            sb.Append("""NOMBRE_MARCA"":""" & row("NOMBRE_MARCA").ToString & """,")
        '            sb.Append("""CARROCERIA"":""" & row("CARROCERIA").ToString & """,")
        '            sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """")
        '            sb.Append("},")

        '        Next

        '        sb.Append("-")
        '        sb.Replace("},-", "}")

        '        sb.Append("]")
        '    End If
        '    Me.hfObjJson.Value = sb.ToString()
        '    P = Nothing
        'Catch ex As Exception
        '    Response.Write("Error " & ex.ToString)
        'End Try
    End Sub
End Class
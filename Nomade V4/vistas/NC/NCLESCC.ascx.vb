Imports System.Data

Partial Class vistas_NC_NCLESCC
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        'Try
        '    Dim P As New Nomade.NC.NCCentroCostos("Bn")
        '    Dim dt As New DataTable
        '    Dim sb As New StringBuilder()

        '    dt = P.Listar_CentroCostos_Cabecera(String.Empty, String.Empty, String.Empty, Me.usuario, String.Empty)

        '    If Not dt Is Nothing Then
        '        sb.Append("[")

        '        For Each row As DataRow In dt.Rows
        '            sb.Append("{")
        '            sb.Append("""CODE"":""" & row("CODE").ToString & """,")
        '            sb.Append("""NOMBRE_PLAN"":""" & row("NOMBRE_PLAN").ToString & """,")
        '            sb.Append("""NIVELES"":""" & row("NIVELES").ToString & """,")
        '            sb.Append("""NIVEL1"":""" & row("NIVEL1").ToString & """,")
        '            sb.Append("""NIVEL2"":""" & row("NIVEL2").ToString & """,")
        '            sb.Append("""NIVEL3"":""" & row("NIVEL3").ToString & """,")
        '            sb.Append("""NIVEL4"":""" & row("NIVEL4").ToString & """,")
        '            sb.Append("""FECHA_INICIO"":""" & row("FECHA_INICIO").ToString & """,")
        '            sb.Append("""FECHA_FIN"":""" & row("FECHA_FIN").ToString & """,")
        '            sb.Append("""NCTLG_CODE"":""" & row("NCTLG_CODE").ToString & """,")
        '            sb.Append("""NESTADO_IND"":""" & row("NESTADO_IND").ToString & """")
        '            sb.Append("},")

        '        Next
        '        sb.Append("-")
        '        sb.Replace("},-", "}")

        '        sb.Append("]")

        '    End If

        '    hfObjECentroCostos.Value = sb.ToString()

        '    P = Nothing
        'Catch ex As Exception
        '    Response.Write("Error " & ex.ToString)
        'End Try
    End Sub
End Class

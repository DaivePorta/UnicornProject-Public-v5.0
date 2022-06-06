
Imports System.Data
Partial Class vistas_NP_NPLEMPL
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        'Try
        '    Dim p As New NOMADE.NC.NCEEmpleado("Bn")
        '    Dim dt As New DataTable
        '    Dim sb As New StringBuilder()

        '    dt = p.Listar_Empleados(0, 0, "", "", "", "", "")

        '    If Not dt Is Nothing Then
        '        sb.Append("[")
        '        For Each row As DataRow In dt.Rows

        '            sb.Append("{")

        '            sb.Append("""NOMBRE_EMPLEADO"":""" & row("NOMBRE_EMPLEADO").ToString & """,")

        '            sb.Append("""DNI"":""" & row("DNI").ToString & """,")

        '            sb.Append("""EMPRESA"":{""NOMBRE"":""" & row("CTLG_DESC").ToString & """,""CODIGO"":""" & row("CTLG_CODE").ToString & """},")

        '            sb.Append("""SUCURSAL"":{""NOMBRE"":""" & row("SCSL_DESC").ToString & """,""CODIGO"":""" & row("SCSL_CODE").ToString & """},")

        '            sb.Append("""CARGO"":""" & row("CARGO").ToString & """,")

        '            sb.Append("""ESTADO"":""" & row("ESTADO").ToString & """,")

        '            sb.Append("""REG_SALUD_DESC"":""" & row("REG_SALUD_DESC").ToString & """,")

        '            sb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """")

        '            sb.Append("},")

        '        Next
        '        sb.Append("-")
        '        sb.Replace("},-", "}")

        '        sb.Append("]")
        '    End If

        '    hfObjPersona.Value = sb.ToString()

        '    p = Nothing
        'Catch ex As Exception
        '    Response.Write("Error " & ex.ToString)
        'End Try
    End Sub



End Class

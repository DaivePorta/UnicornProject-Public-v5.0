

Partial Class vistas_NB_NBLFIRM
    Inherits Nomade.N.Cub

    'Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
    '    Try
    '        Dim P As New NOMADE.NB.NBCheque("Bn")
    '        Dim dt As New DataTable
    '        Dim sb As New StringBuilder()

    '        dt = P.ListarCheque(String.Empty, String.Empty, String.Empty, String.Empty, "E")

    '        If Not dt Is Nothing Then
    '            sb.Append("[")

    '            For Each row As DataRow In dt.Rows
    '                sb.Append("{")
    '                sb.Append("""NUMERO_CHEQ"":""" & row("NUMERO_CHEQ").ToString & """,")
    '                sb.Append("""NUMERO_CUENTA"":{""NOMBRE"":""" & row("NUMERO_CUENTA").ToString & """,""PIDM"":""" & row("CTA_PIDM").ToString & """,""CODIGO"":""" & row("CTA_CODE").ToString & """},")
    '                sb.Append("""FECHA_EMISION"":{""display"":""" & row("FECHA_EMISION").ToString & """,""order"":""" & String.Join("", row("FECHA_EMISION").ToString.Split("/").Reverse()) & """},")
    '                sb.Append("""FECHA_REGISTRO"":{""display"":""" & row("FECHA_REGISTRO").ToString & """,""order"":""" & String.Join("", row("FECHA_REGISTRO").ToString.Split("/").Reverse()) & """},")
    '                sb.Append("""MONTO"":""" & row("MONTO").ToString & """,")
    '                sb.Append("""TIPO"":{""NOMBRE"":""" & row("NTIPO").ToString & """,""CODIGO"":""" & row("TIPO").ToString & """},")
    '                sb.Append("""EMPRESA"":{""NOMBRE"":""" & row("NEMPRESA").ToString & """,""CODIGO"":""" & row("EMPRESA").ToString & """},")
    '                sb.Append("""FECHA"":{""display"":""" & row("FECHA").ToString & """,""order"":""" & String.Join("", row("FECHA").ToString.Split("/").Reverse()) & """},")
    '                sb.Append("""USUARIO"":""" & row("NUSUARIO").ToString & """")
    '                sb.Append("},")

    '            Next
    '            sb.Append("-")
    '            sb.Replace("},-", "}")

    '            sb.Append("]")

    '        End If

    '        hfObjJSON.Value = sb.ToString()

    '        P = Nothing
    '    Catch ex As Exception
    '        Response.Write("Error " & ex.ToString)
    '    End Try
    'End Sub


End Class

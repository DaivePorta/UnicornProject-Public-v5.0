Imports System.Data

Partial Class vistas_NC_NCLNIPL
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim P As New NOMADE.NC.NCNivelPlanContable("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.Listar_NivelPlanContable(String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, Me.usuario)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODE"":""" & row("CODE").ToString & """,")
                    sb.Append("""NCTLG_CODE"":""" & row("NCTLG_CODE").ToString & """,")
                    sb.Append("""NTIPL_CODE_CORTA"":""" & row("NTIPL_CODE_CORTA").ToString & """,")
                    sb.Append("""NOMBRE_PLAN"":""" & row("NOMBRE_PLAN").ToString & """,")
                    sb.Append("""NIVELES"":""" & row("NIVELES").ToString & """,")
                    sb.Append("""FECHA_INICIO"":{""display"":""" & row("FECHA_INICIO").ToString & """,""order"":""" & String.Join("", row("FECHA_INICIO").ToString.Split("/").Reverse()) & """},")                    
                    sb.Append("""FECHA_FIN"":{""display"":""" & row("FECHA_FIN").ToString & """,""order"":""" & String.Join("", row("FECHA_FIN").ToString.Split("/").Reverse()) & """},")
                    sb.Append("""NESTADO_IND"":""" & row("NESTADO_IND").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjEPlanContable.Value = sb.ToString()

            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

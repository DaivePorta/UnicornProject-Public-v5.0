Imports System.Data
Partial Class vistas_NC_NCLEQPC

    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim P As New Nomade.NC.NCEquivalenciaPlanCuentas("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = P.Listar_Equivalencia_PlanCuentas(String.Empty, String.Empty, String.Empty, Me.usuario)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODE"":""" & row("CODE").ToString & """,")
                    sb.Append("""NCTLG_CODE"":""" & row("NCTLG_CODE").ToString & """,")
                    sb.Append("""NOMBRE_PLAN_BASE"":""" & row("NOMBRE_PLAN_BASE").ToString & """,")
                    sb.Append("""DESCRIPCION_BASE"":""" & row("DESCRIPCION_BASE").ToString & """,")
                    sb.Append("""NOMBRE_EQUIVALENTE"":""" & row("NOMBRE_EQUIVALENTE").ToString & """,")
                    sb.Append("""DESCRIPCION_EQUIVALENTE"":""" & row("DESCRIPCION_EQUIVALENTE").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjEPCuentas.Value = sb.ToString()

            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class


Imports System.Data

Partial Class vistas_NC_NCLEQCC
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            Dim p As New NOMADE.NC.NCEquivalenciaCentroCostos("Bn")
            Dim dt As New DataTable
            Dim sb As New StringBuilder()

            dt = p.Listar_Equivalencia_CentroCostos(String.Empty, String.Empty, String.Empty, Me.usuario)

            If Not dt Is Nothing Then
                sb.Append("[")

                For Each row As DataRow In dt.Rows
                    sb.Append("{")
                    sb.Append("""CODE"":""" & row("CODE").ToString & """,")
                    'sb.Append("""NCTLG_CODE"":""" & row("NCTLG_CODE").ToString & """,")
                    sb.Append("""NOMBRE_PLAN_BASE"":""" & row("NOMBRE_PLAN_BASE").ToString & """,")
                    sb.Append("""CECD_CODE_BASE"":""" & row("CECD_CODE_BASE").ToString & """,")
                    sb.Append("""DESCRIPCION_BASE"":""" & row("DESCRIPCION_BASE").ToString & """,")
                    sb.Append("""NOMBRE_PLAN_EQUIVALENTE"":""" & row("NOMBRE_PLAN_EQUIVALENTE").ToString & """,")
                    sb.Append("""CECD_CODE_EQUIVALENTE"":""" & row("CECD_CODE_EQUIVALENTE").ToString & """,")
                    sb.Append("""DESCRIPCION_EQUIVALENTE"":""" & row("DESCRIPCION_EQUIVALENTE").ToString & """,")
                    sb.Append("""FECHA_INICIO"":""" & row("FECHA_INICIO").ToString & """,")
                    sb.Append("""FECHA_FIN"":""" & row("FECHA_FIN").ToString & """,")
                    sb.Append("""NESTADO_IND"":""" & row("NESTADO_IND").ToString & """")
                    sb.Append("},")

                Next
                sb.Append("-")
                sb.Replace("},-", "}")

                sb.Append("]")

            End If

            hfObjCentroCostos.Value = sb.ToString()

            P = Nothing
        Catch ex As Exception
            Response.Write("Error " & ex.ToString)
        End Try
    End Sub
End Class

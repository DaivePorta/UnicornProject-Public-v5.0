'Imports System.Data
Partial Class vistas_NC_NCLCTAS
    Inherits Nomade.N.Cub

    'Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
    '    'Try
    '    '    Dim P As New Nomade.NC.NCPlanCuentas("Bn")
    '    '    Dim dt As New DataTable
    '    '    Dim sb As New StringBuilder()
    '    '    dt = P.Listar_PlanCuentas(String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, String.Empty)
    '    '    If Not dt Is Nothing Then
    '    '        sb.Append("[")
    '    '        For Each row As DataRow In dt.Rows
    '    '            sb.Append("{")
    '    '            sb.Append("""ID"":""" & row("ID").ToString & """,")
    '    '            sb.Append("""CODE"":""" & row("CODE").ToString & """,")
    '    '            sb.Append("""DESCR"":""" & row("DESCR").ToString & """,")
    '    '            sb.Append("""CLASE_CUENTA"":""" & row("CLASE_CUENTA").ToString & """,")
    '    '            sb.Append("""NIVEL"":""" & row("NIVEL").ToString & """,")
    '    '            sb.Append("""NCENTRO_COSTO_IND"":""" & row("NCENTRO_COSTO_IND").ToString & """,")
    '    '            sb.Append("""NDIF_CAMBIO_IND"":""" & row("NDIF_CAMBIO_IND").ToString & """,")
    '    '            sb.Append("""NACTIV_FLUJO_EFECTVO_IND"":""" & row("NACTIV_FLUJO_EFECTVO_IND").ToString & """,")
    '    '            sb.Append("""NESTADO_IND"":""" & row("NESTADO_IND").ToString & """,")
    '    '            sb.Append("""CTLG_CODE"":""" & row("CTLG_CODE").ToString & """,")
    '    '            sb.Append("""NIPC_CODE"":""" & row("NIPC_CODE").ToString & """,")
    '    '            sb.Append("""CUCO_CODE"":""" & row("CUCO_CODE").ToString & """")
    '    '            sb.Append("},")
    '    '        Next
    '    '        sb.Append("-")
    '    '        sb.Replace("},-", "}")
    '    '        sb.Append("]")

    '    '    End If
    '    '    hfObjPlanCuentas.Value = sb.ToString

    '    'Catch ex As Exception
    '    '    Response.Write("Error " & ex.ToString)
    '    'End Try
    'End Sub
End Class

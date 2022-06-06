
Partial Class vistas_NC_BBLCOSP
    Inherits Nomade.N.Cub

    Dim Comision As New Nomade.BB.BBComisionSistemaPension("Bn")
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Verificar_Periodo_Pensiones()
    End Sub
    'Public Sub Verificar_Periodo_Pensiones()
    '    Try
    '        Dim hf As HiddenField
    '        hf = Page.Master.FindControl("hddctlg")
    '        Dim cResupuesta As String = ""
    '        cResupuesta = Comision.Verificar_Configuracion_Sistema(hf.Value, Fecha, "")
    '        'End If
    '    Catch ex As Exception

    '    End Try
    'End Sub
End Class

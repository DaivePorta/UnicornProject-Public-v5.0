Imports System.Data
Partial Class vistas_ND_NDDGINI
    Inherits Nomade.N.Cub
    Dim Fecha As String = ""
    Dim Comision As New Nomade.BB.BBComisionSistemaPension("Bn")
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Verificar_Periodo_Pensiones()
    End Sub
    Public Sub Verificar_Periodo_Pensiones()
        Try
            Dim hf As HiddenField
            hf = Page.Master.FindControl("hddctlg")

            Dim Fecha As String
            Fecha = Comision.ListarFechaHora
            If Fecha <> "" Then
                Dim cResupuesta As String = ""
                Fecha = Convert.ToString(Convert.ToDateTime(Fecha).ToString("MMMM yyyy")).ToUpper()
                cResupuesta = Comision.Verificar_Configuracion_Sistema(hf.Value, Fecha, "")
            End If
        Catch ex As Exception

        End Try
    End Sub

End Class


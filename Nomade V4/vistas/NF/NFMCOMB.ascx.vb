Imports System.Net

Partial Class vistas_NF_NFMCOMB
    Inherits Nomade.N.Cub
  

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'v_pantalla = Request.QueryString("v")
        'malerta = Page.Master.FindControl("alerta")
        'Me.malerta.Text = ""
        'Me.txt_code.Attributes.Add("readonly", "true")
        'Me.txt_code.CssClass = "f_inputl"
        'Me.btn_grabar.Visible = True
    End Sub

    'Protected Sub btn_grabar_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btn_grabar.Click
    '    Try
    '        Dim msg As String

    '        If (txt_mtc.Text = String.Empty) Then
    '            malerta.Text = "Error: Ingrese Codigo MTC"
    '            Exit Sub
    '        End If

    '        If (txt_combustible.Text = String.Empty) Then
    '            malerta.Text = "Error: Ingrese Combustible"
    '            Exit Sub
    '        End If

    '        If (txt_definicion.Value = String.Empty) Then
    '            malerta.Text = "Error: Ingrese la Definicion del Combustible"
    '            Exit Sub
    '        End If

    '        Dim c As New Nomade.Finanzas.Almacen.Ccombustible("bn")

    '        msg = c.CREAR_COMBUSTIBLE(Me.txt_combustible.Text.ToUpper, Me.txt_mtc.Text, Me.txt_definicion.Value, IIf(Me.chb_estado.Checked, "A", "I"), Request.Cookies("usernomade")("id"))
    '        c = Nothing
    '        Me.btn_grabar.Visible = False
    '        malerta.Text = "Transacción terminada: registros aplicados y guardados."
    '        Me.txt_code.Text = msg
    '    Catch ex As Exception
    '        malerta.Text = "ERROR: " & ex.Message
    '        Dim c As New Nomade.seguridad.cControlErrores("Bn")
    '        Dim mensaje As String = ex.ToString().Replace("'", "''")
    '        Dim desmensaje As String = ex.Message.Replace("'", "''")
    '        c.CREAR_ERRORES(v_pantalla, 0, desmensaje, mensaje, Dns.GetHostEntry(Request.UserHostAddress).HostName, Request.Cookies("usernomade")("id"))
    '    End Try
    'End Sub
End Class

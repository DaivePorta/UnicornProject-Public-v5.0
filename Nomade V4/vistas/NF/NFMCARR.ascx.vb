Imports System.IO
Imports System.Data

Partial Class vistas_NF_NFMCARR
    Inherits Nomade.N.Cub
    Dim malerta As Label

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        'malerta = Page.Master.FindControl("alerta")
        'Me.malerta.Text = ""
        'Me.txt_code.Attributes.Add("readonly", "true")
        'Me.txt_code.CssClass = "f_inputl"
        'Me.btn_grabar.Visible = True
    End Sub

    'Protected Sub btn_grabar_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btn_grabar.Click
    '    Try
    '        Dim msg As String

    '        If (txt_carroceria.Text = String.Empty) Then
    '            malerta.Text = "Error: Ingrese Carroceria"
    '            Exit Sub
    '        End If

    '        If (txt_mtc.Text = String.Empty) Then
    '            malerta.Text = "Error: Ingrese Codigo MTC"
    '            Exit Sub
    '        End If

    '        If (txt_definicion.Value = String.Empty) Then
    '            malerta.Text = "Error: Ingrese Definicion"
    '            Exit Sub
    '        End If

    '        Dim c As New Nomade.Finanzas.Almacen.Ccarroseria("bn")

    '        msg = c.CREAR_CARROSERIA(Me.txt_carroceria.Text.ToUpper, Me.txt_mtc.Text.ToUpper, Me.txt_definicion.Value.ToUpper, IIf(Me.chb_estado.Checked, "A", "I"), Request.Cookies("usernomade")("id"), "/Imagenes/Carrocerias/" & FileUploader1.PostedFile.FileName)
    '        c = Nothing
    '        Me.btn_grabar.Visible = False
    '        malerta.Text = "Transacción terminada: registros aplicados y guardados."
    '        Response.Redirect("/?c=flo&v=ftqcarr")
    '        Me.txt_code.Text = msg

    '        GuardarArchivoImagen(FileUploader1.PostedFile)

    '    Catch ex As Exception
    '        malerta.Text = "Error: crear Carroseria, " & ex.Message
    '    End Try
    'End Sub

    'Private Sub GuardarArchivoImagen(ByVal file As HttpPostedFile)
    '    'Se carga la ruta física de la carpeta temp del sitio
    '    Dim ruta As String = Server.MapPath("~/Imagenes/Carrocerias")

    '    'Si el directorio no existe, crearlo
    '    If Not (Directory.Exists(ruta)) Then
    '        Directory.CreateDirectory(ruta)
    '    End If
    '    Dim archivo As String = String.Format("{0}\{1}", ruta, file.FileName)
    '    file.SaveAs(archivo)

    'End Sub

End Class

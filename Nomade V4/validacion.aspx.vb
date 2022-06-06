
Partial Class validacion
    Inherits System.Web.UI.Page


    Dim v_rutagen As String = ""
    Dim v_plantilla As String = System.Configuration.ConfigurationManager.AppSettings("plantilla")

    Dim v_ruta As String = ""
    Dim v_control, v_opcion, v_mod, v_rutafinal As String
    Dim v_id As String
    Dim v_controlador As String = "controladores"
    Dim v_vista As String = "vistas"
    Dim v_validacion As String = "vistas/validacion/"
    Dim v_vista_select As String
    Dim v_forma As String = ""

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim vcontrol As Control
        Response.BufferOutput = True
        Dim v_rutagen As String = v_controlador & "/"
        v_forma = Request.QueryString("f") ' obtenemos la vista a cargar
       
        Try
            'If Not (Request.Cookies("usernomade") Is Nothing) Then
            If User.Identity.IsAuthenticated Then
                'If Not (Request.Cookies("usernomade")("id") = String.Empty) Then
                '    If (v_control = String.Empty) Then
                '        v_rutafinal = v_validacion & v_forma
                '    Else

                v_rutafinal = v_validacion & v_forma

                'End If
                'End If

            Else

                ' v_vista = "l"
                v_control = "ini"
                v_vista_select = "l"
                v_rutafinal = v_rutagen & v_control & v_controlador


            End If



            vcontrol = Page.LoadControl(v_rutafinal & ".ascx")
            cont.Controls.Add(vcontrol)
        Catch ex As Exception
            Dim lbl As New Literal
            lbl.Text = NOMADE.nomade.mensajes.merror("Error: No existe controlador" & ex.Message)
            cont.Controls.Add(lbl)
            Me.Page.Title = "Nomade | Error al cargar controlador"

        End Try
    End Sub

    Protected Sub Page_PreInit(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.PreInit
        Page.Theme = v_plantilla
    End Sub
End Class

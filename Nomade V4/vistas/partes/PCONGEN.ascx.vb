
Partial Class vistas_partes_PCONGEN
    Inherits Nomade.N.Cub

    Dim v_vista As String = System.Configuration.ConfigurationManager.AppSettings("vistas")
    Dim v_tobjeto As String = System.Configuration.ConfigurationManager.AppSettings("tobjeto")

    Dim v_separador As String = System.Configuration.ConfigurationManager.AppSettings("separadorURL")
    Dim v_replace As String = "/"
    Dim v_forma As String
    Dim v_carga As String
    Dim v_smod As String = ""
    Dim v_opcion, v_rutafinal As String
    Dim malerta As Literal
    Dim nomforma As HiddenField
    Dim v_forma_default As String = "DGINI"
    Dim v_id As String = ""
    Dim v_rol As String = ""
    Dim v_roles As String = ""
    Dim v_curso As String = ""

    Public Property id_usaurio() As String
        Get
            Return v_id
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                v_id = value
            End If
        End Set
    End Property

    Public Property forma() As String
        Get
            Return v_carga
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                v_carga = value
            End If
        End Set
    End Property

    Public Property rol() As String
        Get
            Return v_rol
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                v_rol = value
            End If
        End Set
    End Property

    Public Property roles() As String
        Get
            Return v_roles
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                v_roles = value
            End If
        End Set
    End Property


    Public Property curso() As String
        Get
            Return v_curso
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                v_curso = value
            End If
        End Set
    End Property


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            Dim vcontrol As Nomade.N.Cub 'Control
            malerta = Page.Master.FindControl("mensaje")

            'Carlos Medina 27/08/2014
            nomforma = Page.Master.FindControl("txtforma")


            Me.malerta.Text = ""

            If (v_forma = String.Empty) Then
                v_forma = Request.QueryString("f") ' obtenemos la forma a ejecutar
                nomforma.Value = v_forma 'Carlos Medina 27/08/2014
            Else
                v_forma = Me.forma
                nomforma.Value = Me.forma 'Carlos Medina 27/08/2014
            End If

            '   Response.Write(v_forma & "sss")


            If (v_forma = String.Empty) Then v_forma = "nd"

            If (v_forma.Length = v_tobjeto) Then
                'v_rutafinal = v_vista & "/" & Mid(v_forma, 1, 2) & "/" & Mid(v_forma, 3, 1) & "/" & v_forma
                ' Response.Write(v_forma)
                v_rutafinal = v_vista & "/" & Mid(v_forma, 1, 2) & "/" & v_forma
            Else
                'v_rutafinal = v_vista & "/" & Mid(v_forma, 1, 2) & "/" & v_forma
                v_rutafinal = v_vista & "/" & v_forma & "/" & v_forma & v_forma_default 'CCQ 26/08/2014

                'ERROR DE RUTA DE ACCESO SE PASA A ESTA PARTE DE FRENTE

            End If
            ' Me.usuario = "bbbbbbbbbb"
            vcontrol = Page.LoadControl(v_rutafinal & ".ascx")
            '  Response.Write(v_id)
            vcontrol.usuario = v_id
            vcontrol.usua_rol = Me.rol

            ' vcontrol.upao_usua_roles = Me.roles
            ' vcontrol.upao_curso_actual = Me.curso
            'Dim cantdad As Integer = ph_cont.Controls.Count
            'If cantdad > 0 Then
            '    For Each vcontrolx As NOMADE.N.Cub In ph_cont.Controls
            '        If Not vcontrolx.Equals(vcontrol) Then
            '            ph_cont.Controls.Add(vcontrol)
            '        End If
            '    Next
            'Else
            ph_cont.Controls.Add(vcontrol)
            'End If

            'Response.Write(v_id)
        Catch ex As Exception
            malerta.Text = "No existe forma para la solicitud" & "controlador " & ex.Message
            Me.Page.Title = "NOMADE | Error al cargar opción"
        End Try
    End Sub

End Class

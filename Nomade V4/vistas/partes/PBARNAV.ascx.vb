
Partial Class vistas_partes_PBARNAV
    Inherits System.Web.UI.UserControl
    Private v_modulo, v_usuario_roles, v_usuario As String
    Public xc As String


    Public Property img() As String
        Get
            Return v_img.Text
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                Me.v_img.Text = value
            End If
        End Set
    End Property
    Public Property Usuario() As String
        Get
            Return v_usuario
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                v_usuario = value
            End If
        End Set
    End Property

    Public Property titulo() As String
        Get
            Return tit_forma.Text
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                Me.tit_forma.Text = " &raquo; " & value
            End If
        End Set
    End Property

    Public Property titulo_modulo() As String
        Get
            Return Me.tit.InnerText
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                Me.tit.InnerText = Nomade.N.utilidades.quitaHTML_1(value)
            End If
        End Set
    End Property

    Public Property modulo() As String
        Get
            Return v_modulo
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                v_modulo = value
            End If
        End Set
    End Property
    Public Property Userario_Roles() As String
        Get
            Return v_usuario_roles
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                v_usuario_roles = value
            End If
        End Set
    End Property

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If (Me.modulo = "A") Then
            tit_forma.Text = ""
            GenerarMenu()
            'If (Me.modulo = "A") Then
            '    '  Me.tit_forma.Text = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" & "<a href='?f=yagmuro'><img src='recursos/ico/ahome.jpg' border='0'/> Principal</a> " & "&nbsp;&nbsp;|&nbsp;&nbsp;" & "<a href='?f=yagmuro'><img src='recursos/ico/aalumno.jpg' border='0'/> Alumno</a> " & "&nbsp;&nbsp;|&nbsp;&nbsp;" & "<a href='?f=yaaauto'><img src='recursos/ico/aautor.jpg' border='0'/>Coordinador</a>" & "&nbsp;&nbsp;|&nbsp;&nbsp;" & "<a href='?f=yaadoce'><img src='recursos/ico/adocente.jpg' border='0'/>&nbsp;Docente</a>" & "&nbsp;&nbsp;|&nbsp;&nbsp;" & "<a href='?f=yaadoce'><img src='recursos/ico/aadmi.jpg' border='0'/>&nbsp;Administrador</a>"
            '    Me.tit_forma.Text = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" & "<a href='?f=yagmuro'> Principal</a> " & "&nbsp;&nbsp;|&nbsp;&nbsp;" & "<a href='?f=yaasapl'> Alumno</a> " & "&nbsp;&nbsp;|&nbsp;&nbsp;" & "<a href='?f=yacscur'>Coordinador</a>" & "&nbsp;&nbsp;|&nbsp;&nbsp;" & "<a href='?f=yaadoce'>&nbsp;Docente</a>" & "&nbsp;&nbsp;|&nbsp;&nbsp;" & "<a href='?f=YACSADM'>&nbsp;Administrador</a>" & "     " & Me.titulo

            '    ' Me.titu.Style = "text-align:right;"
            '    'Me.tit_forma.Visible = False
            '    Me.xc = "text-align:feft;"
            'End If

        End If

    End Sub

    Private Sub GenerarMenu()
        tit_forma.Text = ""
        ''Dim Menu, Ruta, Parametro, Nombre As String
        ''Dim cobjeto As New UPAO.YG.General.c_menu("BN")
        ''Dim dt As DataTable
        ''Dim i As Integer
        ''dt = cobjeto.F_Get_Menu_Roles(Userario_Roles, Me.modulo, Usuario)
        ' ''dt = cobjeto.F_Get_Menu_Roles("D,A,O,C", Me.modulo, Usuario)
        ''cobjeto = Nothing
        ''Menu = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        ''If Not (dt Is Nothing) Then
        ''    For i = 0 To dt.Rows.Count - 1
        ''        Nombre = dt.Rows(i)("NombreMenu").ToString
        ''        Ruta = dt.Rows(i)("Forma").ToString
        ''        Parametro = dt.Rows(i)("Parametros").ToString
        ''        Menu = Menu + "<a href='?f=" + Ruta + Parametro + "'>" + Nombre + "</a>"
        ''        If i <> dt.Rows.Count - 1 Then Menu = Menu + "&nbsp;&nbsp;|&nbsp;&nbsp;"
        ''    Next
        ''End If
        'Menu = Menu + Me.titulo
        'Me.tit_forma.Text = Menu

    End Sub
End Class

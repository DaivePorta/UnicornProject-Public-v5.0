Imports Microsoft.VisualBasic

Namespace NOMADE.N
    Public Class Cub
        Inherits System.Web.UI.UserControl
        Dim v_menu As String
        Dim v_tituloforma As String
        Dim v_usuario As String
        Dim v_nomforma As String
        Dim v_modulo_desc As String
        Dim v_permiso As String
        Dim v_rol As String
        Dim v_roles As String
        Dim v_curso As String
        Dim v_img As String
        Dim v_plantilla As String
        Shared v_empresa As String
        Shared v_establecimiento As String

        Public Property menu() As String
            Get
                Return v_menu
            End Get
            Set(ByVal value As String)
                v_menu = value
            End Set
        End Property


        Public Property permiso_objeto() As String
            Get
                Return v_permiso
            End Get
            Set(ByVal value As String)
                v_permiso = value
            End Set
        End Property

        Public Property titulo_forma() As String
            Get
                Return v_tituloforma
            End Get
            Set(ByVal value As String)
                v_tituloforma = value
            End Set
        End Property

        Public Property nom_forma() As String
            Get
                Return v_nomforma
            End Get
            Set(ByVal value As String)
                v_nomforma = value
            End Set
        End Property

        Public Property usuario() As String
            Get
                Return v_usuario
            End Get
            Set(ByVal value As String)
                v_usuario = value
            End Set
        End Property


        Public Property modulo_desc() As String
            Get
                Return v_modulo_desc
            End Get
            Set(ByVal value As String)
                v_modulo_desc = value
            End Set
        End Property

        Public Property usua_rol() As String
            Get
                Return v_rol
            End Get
            Set(ByVal value As String)
                v_rol = value
            End Set
        End Property

        'Public Property upao_curso_actual() As String
        '    Get
        '        Return v_curso
        '    End Get
        '    Set(ByVal value As String)
        '        v_curso = value
        '    End Set
        'End Property

        Public Property plantilla() As String
            Get
                Return v_plantilla
            End Get
            Set(ByVal value As String)
                v_plantilla = value
            End Set
        End Property

        Public Property usua_roles() As String
            Get
                Return v_roles
            End Get
            Set(ByVal value As String)
                v_roles = value
            End Set
        End Property

        Public Shared Property catalogo() As String
            Get
                Return v_empresa
            End Get
            Set(ByVal value As String)
                v_empresa = value
            End Set
        End Property

        Public Shared Property establecimiento() As String
            Get
                Return v_establecimiento
            End Get
            Set(ByVal value As String)
                v_establecimiento = value
            End Set
        End Property

    End Class
End Namespace

Imports Microsoft.VisualBasic
Namespace NomadeSeguridad.Models
    Public Class DbUserInfo

        Public Property Id() As String
            Get
                Return m_Id
            End Get
            Set(value As String)
                m_Id = value
            End Set
        End Property
        Private m_Id As String
        Public Property Pidm() As String
            Get
                Return m_Pidm
            End Get
            Set(value As String)
                m_Pidm = Value
            End Set
        End Property
        Private m_Pidm As String
        Public Property Catalogo() As String
            Get
                Return m_Catalogo
            End Get
            Set(value As String)
                m_Catalogo = value
            End Set
        End Property
        Private m_Catalogo As String
        Public Property Sucursal() As String
            Get
                Return m_Sucursal
            End Get
            Set(value As String)
                m_Sucursal = value
            End Set
        End Property
        Private m_Sucursal As String
        Public Property Formas() As String
            Get
                Return m_Formas
            End Get
            Set(value As String)
                m_Formas = value
            End Set
        End Property
        Private m_Formas As String
        Public Property Menu() As String
            Get
                Return m_Menu
            End Get
            Set(value As String)
                m_Menu = value
            End Set
        End Property
        Private m_Menu As String

    End Class
End Namespace

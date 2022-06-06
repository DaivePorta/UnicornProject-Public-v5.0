Imports Microsoft.VisualBasic
Namespace NomadeChat.Models

    Public Class DbChatUsers
        Public Property Id() As Integer
            Get
                Return m_Id
            End Get
            Set(value As Integer)
                m_Id = Value
            End Set
        End Property
        Private m_Id As Integer
        Public Property Pidm() As String
            Get
                Return m_Pidm
            End Get
            Set(value As String)
                m_Pidm = Value
            End Set
        End Property
        Private m_Pidm As String
        Public Property Idioma() As String
            Get
                Return m_Idioma
            End Get
            Set(value As String)
                m_Idioma = value
            End Set
        End Property
        Private m_Idioma As String
        Public Property Usuario() As String
            Get
                Return m_Usuario
            End Get
            Set(value As String)
                m_Usuario = Value
            End Set
        End Property
        Private m_Usuario As String
        Public Property Nombre() As String
            Get
                Return m_Nombre
            End Get
            Set(value As String)
                m_Nombre = Value
            End Set
        End Property
        Private m_Nombre As String
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
        Public Property IP() As String
            Get
                Return m_IP
            End Get
            Set(value As String)
                m_IP = Value
            End Set
        End Property
        Private m_IP As String
        Public Property Navegador() As String
            Get
                Return m_Navegador
            End Get
            Set(value As String)
                m_Navegador = Value
            End Set
        End Property
        Private m_Navegador As String
        Public Property Foto() As String
            Get
                Return m_Foto
            End Get
            Set(value As String)
                m_Foto = Value
            End Set
        End Property
        Private m_Foto As String
        Public Property RoomId() As String
            Get
                Return m_RoomId
            End Get
            Set(value As String)
                m_RoomId = Value
            End Set
        End Property
        Private m_RoomId As String
    End Class
End Namespace
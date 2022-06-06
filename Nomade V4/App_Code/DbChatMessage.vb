Imports Microsoft.VisualBasic
Imports Nomade.ChatJs

Namespace NomadeChat.Models
    Public Class DbChatMessage
        Inherits ChatMensaje
        Public Property Fecha() As DateTime
            Get
                Return m_Fecha
            End Get
            Set(value As DateTime)
                m_Fecha = value
            End Set
        End Property
        Private m_Fecha As DateTime

        Public Property UserOrigen() As Integer
            Get
                Return m_UserOrigen
            End Get
            Set(value As Integer)
                m_UserOrigen = value
            End Set
        End Property
        Private m_UserOrigen As Integer

        Public Property UserDestino() As Integer
            Get
                Return m_UserDestino
            End Get
            Set(value As Integer)
                m_UserDestino = value
            End Set
        End Property
        Private m_UserDestino As Integer

        Public Property TenancyId() As String
            Get
                Return m_TenancyId
            End Get
            Set(value As String)
                m_TenancyId = value
            End Set
        End Property
        Private m_TenancyId As String
    End Class
End Namespace


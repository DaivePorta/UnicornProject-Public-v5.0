Imports Microsoft.VisualBasic

Namespace NomadeNotif.Models

    Public Class DbUserNotificacion

        Public Property IdNotificacion() As Long
            Get
                Return m_IdNotificacion
            End Get
            Set(value As Long)
                m_IdNotificacion = value
            End Set
        End Property
        Private m_IdNotificacion As Long
        Public Property UserOrigen() As String
            Get
                Return m_UserOrigen
            End Get
            Set(value As String)
                m_UserOrigen = value
            End Set
        End Property
        Private m_UserOrigen As String

        Public Property UserDestino() As String
            Get
                Return m_UserDestino
            End Get
            Set(value As String)
                m_UserDestino = value
            End Set
        End Property
        Private m_UserDestino As String

        Public Property Modulo() As String
            Get
                Return m_Modulo
            End Get
            Set(value As String)
                m_Modulo = value
            End Set
        End Property
        Private m_Modulo As String

        Public Property Texto() As String
            Get
                Return m_Texto
            End Get
            Set(value As String)
                m_Texto = value
            End Set
        End Property
        Private m_Texto As String

        Public Property Visto() As Integer
            Get
                Return m_Visto
            End Get
            Set(value As Integer)
                m_Visto = value
            End Set
        End Property
        Private m_Visto As String

        Public Property Link() As String
            Get
                Return m_Link
            End Get
            Set(value As String)
                m_Link = value
            End Set
        End Property
        Private m_Link As String

        Public Property Fecha() As String
            Get
                Return m_Fecha
            End Get
            Set(value As String)
                m_Fecha = value
            End Set
        End Property
        Private m_Fecha As String

        Public Property CodReferencia() As String
            Get
                Return m_CodReferencia
            End Get
            Set(value As String)
                m_CodReferencia = value
            End Set
        End Property
        Private m_CodReferencia As String

        Public Property Icono() As String
            Get
                Return m_Icono
            End Get
            Set(value As String)
                m_Icono = value
            End Set
        End Property
        Private m_Icono As String

        Public Property Tipo() As String
            Get
                Return m_Tipo
            End Get
            Set(value As String)
                m_Tipo = value
            End Set
        End Property
        Private m_Tipo As String

        Public Property Grupo() As String
            Get
                Return m_Grupo
            End Get
            Set(value As String)
                m_Grupo = value
            End Set
        End Property
        Private m_Grupo As String
    End Class
End Namespace
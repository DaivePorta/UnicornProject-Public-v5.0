Imports Microsoft.VisualBasic
Imports System.Web.UI
Namespace NOMADE.N
    Public Class PageBase
        Inherits Page
        Dim tit As String
        Public Property titforma() As String
            Get
                Return tit
            End Get
            Set(ByVal value As String)
                tit = value
            End Set
        End Property

    End Class
End Namespace

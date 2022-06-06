Imports System
Imports System.Web.UI
Public Class SessionPageStateAdapter
    Inherits System.Web.UI.Adapters.PageAdapter
    Public Overrides Function GetStatePersister() As System.Web.UI.PageStatePersister
        Return New SessionPageStatePersister(Page)
    End Function
End Class

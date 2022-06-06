Imports Microsoft.VisualBasic
Imports Owin
Imports Microsoft.Owin
Imports Microsoft.AspNet.SignalR

<Assembly: OwinStartup(GetType(NomadeSocket.Startup))> 
Namespace NomadeSocket
    Public Class Startup
        Public Sub Configuration(app As IAppBuilder)
            ' Inicia SignalR
            app.MapSignalR()
        End Sub
    End Class
End Namespace
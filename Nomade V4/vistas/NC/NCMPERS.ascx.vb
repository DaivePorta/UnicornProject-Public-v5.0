Imports System.Data

Partial Class vistas_NC_NCMPERS
    Inherits NOMADE.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Not Page.IsPostBack Then
            hfUsuario.Value = Me.usuario
            hfCodigoTipoDocumentoDNI.Value = ConfigurationManager.AppSettings("CodigoTipoDocumentoDNI")
            hfCodigoTipoDocumentoRUC.Value = ConfigurationManager.AppSettings("CodigoTipoDocumentoRUC")
            hfCodigoTipoTelefonoCelular.Value = ConfigurationManager.AppSettings("CodigoTipoTelefonoCelular")
            hfCodigoDireccionPrincipal.Value = ConfigurationManager.AppSettings("CodigoDireccionPrincipal")
            hfCodigoDireccionSecundario.Value = ConfigurationManager.AppSettings("CodigoDireccionSecundario")
            hfCodigoTipoContribuyenteSinNegocio.Value = ConfigurationManager.AppSettings("CodigoTipoContribuyenteSinNegocio")
            hfCodigoTipoContribuyenteConNegocio.Value = ConfigurationManager.AppSettings("CodigoTipoContribuyenteConNegocio")
        End If
    End Sub

End Class

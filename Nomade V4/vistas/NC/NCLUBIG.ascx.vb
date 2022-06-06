Imports System.Data

Partial Class vistas_NC_NCLUBIG
    Inherits Nomade.N.Cub

#Region "Eventos"

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        'If Not Page.IsPostBack Then
        '    Me.CARGAR_PAIS()
        'End If
    End Sub

    'Protected Sub dd_Pais_SelectedIndexChanged(sender As Object, e As EventArgs) Handles dd_Pais.SelectedIndexChanged
    '    If dd_Pais.SelectedValue <> "0" Then
    '        CARGAR_UBIGEO_DEPARTAMENTO(dd_Pais.SelectedValue)
    '    Else
    '        Me.BandejaUbigeo.DataSource = Nothing
    '        Me.BandejaUbigeo.DataBind()
    '    End If
    'End Sub

#End Region

    '#Region "Métodos"

    'Private Sub CARGAR_PAIS()
    '    Dim dt As New DataTable
    '    Dim p As New Nomade.NC.NCPais("BN")
    '    dt = p.Listar_Pais(String.Empty, String.Empty, "A")
    '    dd_Pais.DataSource = dt
    '    Me.dd_Pais.DataTextField = "Descripcion"
    '    Me.dd_Pais.DataValueField = "Codigo"
    '    dd_Pais.DataBind()
    '    dd_Pais.Items.Insert(0, New ListItem("--- SELECCIONE PAIS ---", "0"))
    '    p = Nothing
    'End Sub

    'Private Sub CARGAR_UBIGEO_DEPARTAMENTO(ByVal p_Code_Pais As String)
    '    Dim dt As New DataTable
    '    Dim p As New Nomade.NC.NCUbigeo("BN")
    '    dt = p.Listar_Ubigeo(String.Empty, String.Empty, String.Empty, 1, p_Code_Pais, "A")
    '    BandejaUbigeo.DataSource = dt
    '    BandejaUbigeo.DataBind()
    'End Sub

    '#End Region

End Class

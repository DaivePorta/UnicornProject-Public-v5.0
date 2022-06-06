
Partial Class vistas_partes_YG_pusua
    Inherits Nomade.N.Cub

    Public v_id, id As String
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If id_usuario = String.Empty Then
            id_usuario = Me.usuario
        End If

        ''If Not (id_usuario = String.Empty) Then
        ''    id = id_usuario
        ''    Dim f As New UPAO.Y.utilidades
        ''    dameFoto(id_usuario)
        ''End If
       
    End Sub

    'Protected Sub dameFoto(ByVal id As String)
    '    Dim strFoto As Boolean
    '    Dim strRutaFoto As String = Server.MapPath("\upload\f\") & id & ".jpg"
    '    strFoto = (System.IO.File.Exists(strRutaFoto))
    '    If strFoto = True Then
    '        Me.foto.Src = "~/../upload/f/" & id & ".jpg"
    '    Else
    '        Me.foto.Src = "../../../upload/foto1.jpg"
    '    End If
    'End Sub

    Public Property id_usuario() As String
        Get
            Return v_id
        End Get
        Set(ByVal value As String)
            v_id = value
        End Set
    End Property

End Class

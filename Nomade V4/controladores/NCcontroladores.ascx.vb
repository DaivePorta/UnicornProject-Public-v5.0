
Partial Class controladores_NCcontroladores
    Inherits Nomade.N.Cub

    Dim v_curso As String
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim f As String
        Dim v_menu As String
        f = Request.QueryString("f")
        'N=indica que no mostrara menu
        'B=Nos indica que no mostrara menu pero si la barra de perfiles 
        ' VACIO MOSTRARA MENU Y BRRA DE TITULO
        'If (f <> String.Empty And Len(f) = 7) Then
        '    v_menu = Mid(f, 4, 1) 
        '    v_menu = v_menu.ToUpper
        'End If
        '  Response.Write(Me.menu)
        If (f = String.Empty Or Me.menu = "N" Or Me.menu = "B" Or Me.menu = "X") Then
            'Response.Write(f)
            If (Me.menu = "N") Then
                Me.cmenu.Visible = False
                Me.todo.Visible = True
                Me.barra.Visible = False
                Me.PCONGEN2.id_usaurio = Me.usuario
                Me.PCONGEN2.rol = Me.usua_rol
                'Me.PCONGEN2.curso = v_curso
                Me.PMENU1.Dispose()
                Me.PBARNAV1.Dispose()
                Me.PCONGEN3.Dispose()
                Me.PCONGEN1.Dispose()
                Me.PBARNAV1.modulo = Mid(Me.nom_forma, 2, 1)
            ElseIf (Me.menu = "B") Then
                Me.cmenu.Visible = False
                Me.todo.Visible = True

                Me.PCONGEN2.id_usaurio = Me.usuario
                Me.PCONGEN2.rol = Me.usua_rol
                'Me.PCONGEN3.curso = v_curso
                Me.PMENU1.Dispose()
                Me.PBARNAV1.Dispose()
                Me.PCONGEN3.Dispose()
                cont3.Visible = False
                PCONGEN3.Visible = False
                Me.PBARNAV2.titulo = Me.titulo_forma & " (" & Me.nom_forma & ")"
                Me.PBARNAV2.modulo = Mid(Me.nom_forma, 2, 1)
                Me.PBARNAV2.titulo_modulo = Me.modulo_desc


            End If
        Else

            If (f <> String.Empty And Len(f) = 7) Then
                v_menu = Mid(f, 4, 1)
                v_menu = v_menu.ToUpper
            End If
            'Response.Write(v_menu)
            'Me.PCONGEN2.Visible = False
            Me.PCONGEN2.Dispose()
            Me.PCONGEN3.Dispose()
            Me.PBARNAV2.Dispose()
            Me.barra.Visible = False
            ' Me.PBARNAV1.Dispose()
            Me.todo.Visible = False
            cmenu.Visible = True

            Me.PBARNAV1.titulo = Me.titulo_forma & " (" & Me.nom_forma & ")"
            Me.PMENU1.nom_forma = Me.nom_forma
            Me.PBARNAV1.titulo_modulo = Me.modulo_desc
            Me.PCONGEN1.id_usaurio = Me.usuario
            Me.PCONGEN1.rol = Me.usua_rol
            Me.PCONGEN1.curso = v_curso

            Me.PBARNAV1.modulo = Mid(Me.nom_forma, 2, 1)

            ' Me.PBARNAV1.Visible = False
            Me.PMENU1.usuario = Me.usuario
            Me.PMENU1.Valor_menu = v_menu

            ' Me.PMENU1.Visible = False
        End If
    End Sub

    'Private Sub curso_actual(ByVal p_usuario As String, ByVal p_modulo As String)
    '    Dim cobjeto As New UPAO.YG.General.c_rol("BN")
    '    Dim dt As DataTable
    '    dt = cobjeto.dame_CURSO_actual(p_usuario, p_modulo)
    '    cobjeto = Nothing
    '    If Not (dt Is Nothing) Then
    '        v_curso = dt.Rows(0)("curso").ToString
    '    End If
    'End Sub

End Class

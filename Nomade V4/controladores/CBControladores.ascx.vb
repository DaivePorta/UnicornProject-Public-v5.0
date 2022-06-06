
Partial Class controladores_CBControladores
    Inherits Nomade.N.Cub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim f As String
        Dim v_menu As String = ""
        f = Request.QueryString("f")

        If (f = String.Empty Or Me.menu = "N" Or Me.menu = "B" Or Me.menu = "X") Then

            If (Me.menu = "N") Then
                Me.cmenu.Visible = False
                Me.todo.Visible = True
                Me.barra.Visible = False
                Me.PCONGEN2.id_usaurio = Me.usuario
                Me.PCONGEN2.rol = Me.usua_rol
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

            Me.PCONGEN2.Dispose()
            Me.PCONGEN3.Dispose()
            Me.PBARNAV2.Dispose()
            Me.barra.Visible = False
            Me.todo.Visible = False
            cmenu.Visible = True

            Me.PBARNAV1.titulo = Me.titulo_forma & " (" & Me.nom_forma & ")"
            Me.PMENU1.nom_forma = Me.nom_forma
            Me.PBARNAV1.titulo_modulo = Me.modulo_desc
            Me.PCONGEN1.id_usaurio = Me.usuario
            Me.PCONGEN1.rol = Me.usua_rol
            'Me.PCONGEN1.curso = v_curso

            Me.PBARNAV1.modulo = Mid(Me.nom_forma, 2, 1)

            Me.PMENU1.usuario = Me.usuario
            Me.PMENU1.Valor_menu = v_menu

        End If
    End Sub

End Class

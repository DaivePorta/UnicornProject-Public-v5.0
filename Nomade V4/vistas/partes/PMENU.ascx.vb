Imports System.Data
Partial Class vistas_partes_PMENU
    Inherits Nomade.N.Cub
    Dim v_modulo As String
    Dim v_menu As String
    Dim v_abre As String
    Dim v_cierra, v_titulo, v_tipo As String
    Dim v_htm As String
    Dim v_vermenu As String
    Dim vmod As String
    Dim dt1, dt2 As DataTable
    Dim MenuAula As String
    Dim codpadre As String
    Dim Bandera As Integer = 0
    Dim c As New NOMADE.general.CMENU("bn")
    Dim dts As DataTable
    Dim cs As New NOMADE.general.CMENU("bn")
    Dim dt As DataTable
    Dim a, b As String
    Dim ise As Integer = 0
    Public sm(20) As String
    Dim v_profundidad As Integer
    Dim v_rol_actual As String = "ADM"
    Dim v_mostrar As String = "T"
    Dim IndicadorMenu As String
    Dim v_ValorMenu As String
    Public Property vermenu() As String
        Get
            Return v_vermenu
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                v_vermenu = value
            End If
        End Set
    End Property

    Public Property Valor_menu() As String
        Get
            Return v_ValorMenu
        End Get
        Set(ByVal value As String)
            If value <> String.Empty Then
                v_ValorMenu = value
            End If
        End Set
    End Property

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Me.pusua1.id_usuario = Me.usuario
        v_modulo = Me.nom_forma
        If (v_modulo <> String.Empty) Then
            vmod = Mid(v_modulo, 2, 1)
            IndicadorMenu = ""
            Select Case IndicadorMenu
                Case "S"
                    MenuAula = "A"
                    menu_niveles_Select(Me.usuario, Mid(v_modulo, 2, 1), Me.usua_rol, Me.nom_forma, v_ValorMenu)
                Case Else
                    menu_niveles_Select(Me.usuario, Mid(v_modulo, 2, 1), Me.usua_rol, Me.nom_forma, v_ValorMenu)
            End Select
        End If
        c = Nothing
        cs = Nothing
        xx.Visible = False
    End Sub
    Private Sub AddMenuItem(ByRef mnuMenuItem As String, ByVal dtMenuItems As Data.DataTable)
        Try
            Dim n As Integer = 0
            Dim M As Integer = 0

            Dim FS As String = "N"
            If MenuAula = "A" Then
                For Each drMenuItem As Data.DataRow In dtMenuItems.Rows
                    If drMenuItem("padre").ToString.Equals(mnuMenuItem) AndAlso Not drMenuItem("codi").Equals(drMenuItem("padre")) Then
                        If Not (dts Is Nothing) Then
                            For Each MiDataRow1 As DataRow In dts.Rows
                                If drMenuItem("nivel").ToString() <= 2 Then
                                    n = n + 1
                                    Exit For
                                Else
                                    If drMenuItem("opc").ToString() = MiDataRow1("opc").ToString() Then
                                        n = n + 1
                                        Exit For
                                    End If
                                End If
                            Next
                        End If
                        If n > 0 Then
                            If Me.nom_forma = drMenuItem("forma").ToString() Then FS = "S"
                            genera_menuN(drMenuItem("opc").ToString(), drMenuItem("forma").ToString() & drMenuItem("parametros").ToString(), drMenuItem("icono").ToString(), drMenuItem("nivel").ToString(), FS)
                            dt2 = c.F_MENU_MODULO_VALOR(vmod, "1", Me.usuario, drMenuItem("codi").ToString, v_ValorMenu)
                            If Not (dt2 Is Nothing) Then
                                AddMenuItem(drMenuItem("codi").ToString, dt2)
                            End If
                            n = 0
                            FS = "N"
                        End If
                    End If
                Next

            Else
                For Each drMenuItem As Data.DataRow In dtMenuItems.Rows
                    If drMenuItem("padre").ToString.Equals(mnuMenuItem) AndAlso Not drMenuItem("codi").Equals(drMenuItem("padre")) Then
                        genera_menuN(drMenuItem("opc").ToString(), drMenuItem("forma").ToString() & drMenuItem("parametros").ToString(), drMenuItem("icono").ToString(), drMenuItem("nivel").ToString(), FS)
                        dt2 = c.F_MENU_MODULO_VALOR(vmod, "1", Me.usuario, drMenuItem("codi").ToString, v_ValorMenu)
                        If Not (dt2 Is Nothing) Then
                            AddMenuItem(drMenuItem("codi").ToString, dt2)
                        End If
                    End If
                Next
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Sub

    Private Sub open_menuN(ByVal v_titulo As String, ByVal v_mostrar As String)
        If (v_tipo <> "H") Then
            If (v_mostrar = "Y") Then
                v_abre = "<div class='acad_menu'><div style='padding-top:2px; padding-bottom:2px;'><b>" & v_titulo & "</b></div><div class='lh1'></div><div style='margin-bottom:5px;'></div>"
            Else
                v_abre = "<div class='acad_menu'><div style='padding-top:2px; padding-bottom:2px;'><b>" & v_titulo & "</b></div><div class='lh1'></div><div style='margin-bottom:5px;'></div>"
            End If
        Else
            v_abre = "<div>"
        End If
    End Sub

    Private Sub open_menu(ByVal v_titulo As String, ByVal v_mostrar As String)
        If (v_tipo <> "H") Then
            If (v_mostrar = "Y") Then
                v_abre = "<div class='arrowlistmenu'><h3 class='headerbar'>" & v_titulo & "</h3><ul>"
            Else
                v_abre = "<div class='arrowlistmenu1'><ul>"
            End If
        Else
            v_abre = "<div>"
        End If
    End Sub

    Private Sub cierra_menuN()
        If (v_tipo <> "H") Then
            v_cierra = "</div><div style='padding-bottom:20px;'></div>"
        Else
            v_cierra = "</div><div style='padding-bottom:20px;'></div>"
        End If
    End Sub

    Private Sub cierra_menu()
        If (v_tipo <> "H") Then
            v_cierra = "</ul></div>"
        Else
            v_cierra = "</div>"
        End If
    End Sub

    Private Sub genera_menuN(ByVal v_desc As String, ByVal v_forma As String, ByVal v_ico As String, ByVal v_nivel As String, ByVal FormaSelect As String)
        If (v_tipo <> "H") Then
            If (v_ico <> String.Empty) Then
                If (v_nivel = 2) Then
                    v_menu = v_menu & "<div class='menuF_submenu2'><img src='" & v_ico & "'/><a href='?f=" & v_forma & "'>" & v_desc & "</a></div>"
                ElseIf (v_nivel = 3) Then
                    If FormaSelect = "N" Then
                        v_menu = v_menu & "<div class='menuF_submenu3'>&nbsp;&nbsp;<img src='" & v_ico & "'/><a href='?f=" & v_forma & "'>" & v_desc & "</a></div>"
                    Else
                        v_menu = v_menu & "<div class='menuF_submenuSelect'>&nbsp;&nbsp;<img src='" & v_ico & "'/><a href='?f=" & v_forma & "'>" & v_desc & "</a></div>"
                    End If
                Else
                    If FormaSelect = "N" Then
                        v_menu = v_menu & "<div><img src='" & v_ico & "'/><a href='?f=" & v_forma & "'>" & v_desc & "</a></div>"
                    Else
                        v_menu = v_menu & "<div class='menuF_menuSelectPrincipal'>&nbsp;&nbsp;<img src='" & v_ico & "'/><a href='?f=" & v_forma & "'>" & v_desc & "</a></div>"
                    End If
                End If
            Else
                If (v_nivel = 2) Then
                    v_menu = v_menu & "<div class='menuF_submenu2'><img src='" & v_ico & "'/><a href='?f=" & v_forma & "'>" & v_desc & "</a></div>"
                ElseIf (v_nivel = 3) Then
                    If FormaSelect = "N" Then
                        v_menu = v_menu & "<div class='menuF_submenu3'>&nbsp;&nbsp;<img src='" & v_ico & "'/><a href='?f=" & v_forma & "'>" & v_desc & "</a></div>"
                    Else
                        v_menu = v_menu & "<div class='menuF_submenuSelect'>&nbsp;&nbsp;<img src='" & v_ico & "'/><a href='?f=" & v_forma & "'>" & v_desc & "</a></div>"
                    End If
                Else
                    v_menu = v_menu & "<div><a href='?f=" & v_forma & "'>" & v_desc & "</a></div>"
                End If
            End If
        Else
            v_menu = v_menu & v_htm
        End If
    End Sub

    Private Sub genera_menu(ByVal v_desc As String, ByVal v_forma As String, ByVal v_ico As String)
        If (v_tipo <> "H") Then
            If (v_ico <> String.Empty) Then
                v_menu = v_menu & "<li><img src='" & v_ico & "'/><a href='?f=" & v_forma & "'>" & v_desc & "</a></li>"
            Else
                v_menu = v_menu & "<li><a href='?f=" & v_forma & "'>" & v_desc & "</a></li>"
            End If
        Else
            v_menu = v_menu & v_htm
        End If
    End Sub

    Private Sub Dame_Indicador_Rol_Todo(ByVal modulo As String, ByVal Forma As String, ByVal proyecto As String)
        Dim dt As DataTable
        Dim v_consulta As New NOMADE.general.CMENU("bn")

        dt = v_consulta.F_Modulo_Codi(modulo, Forma, proyecto)
        v_consulta = Nothing
        If Not (dt Is Nothing) Then

            IndicadorMenu = dt.Rows(0)("GTVMODL_ESTADO_IND").ToString
            v_mostrar = dt.Rows(0)("Mostar").ToString
        Else
            IndicadorMenu = ""
        End If
    End Sub

    'NUEVO GENERADOR DE MENU - SEGUN EL ITEM SELECCIONADO *******************************************************

    Private Function SelecFormaPadre(ByRef vmodulo As String) As Boolean
        Dim n As Integer = 0
        Dim M As Integer = 0
        Dim FS As String = ""
        Dim dt_tablaFormasPadre As DataTable
        dt_tablaFormasPadre = c.F_MENU_MODULO_VALOR2(vmodulo, codpadre)
        If Not (dt_tablaFormasPadre Is Nothing) Then
            For Each MiDataRow1 As DataRow In dt_tablaFormasPadre.Rows
                If MiDataRow1("Estado").ToString() <> "O" Then
                    FS = "N"
                    Exit For
                Else
                    If Me.nom_forma = MiDataRow1("forma").ToString() Then
                        FS = "S"
                        n = n + 1
                    End If
                End If

            Next
        End If
        If FS = "S" Then
            Return True
        Else
            Return False
        End If
    End Function



    Private Sub menu_niveles_Select(ByVal v_usuario As String, ByVal v_modulo As String, ByVal v_rol As String, ByVal v_Forma As String, ByVal Valordmenu As String)
        'Dim ultimaseq As String = "0"
        'Dim v_html As String

        'dt = c.F_MENU_MODULO_VALOR(v_modulo, "0", v_usuario, "0", v_ValorMenu) 'CAMBIAR AQUI
        '' Response.Write(v_modulo & "," & "0," & v_usuario & ",0," & v_ValorMenu)
        'Dim k As String = "0"
        'Dim i As Integer = 1
        'If Not (dt Is Nothing) Then

        '    For Each MiDataRow As DataRow In dt.Rows
        '        v_tipo = MiDataRow("tipo").ToString()
        '        v_htm = MiDataRow("html").ToString()
        '        codpadre = MiDataRow("codi").ToString
        '        If (v_mostrar = "1") Then
        '            If (MiDataRow("inicio").ToString = "Y") Then
        '                open_menuN(MiDataRow("desc").ToString(), IIf(MiDataRow("mtg").ToString() = "N", "N", "Y"))
        '                genera_menuN(MiDataRow("opc").ToString(), MiDataRow("forma").ToString() & MiDataRow("parametros").ToString(), MiDataRow("icono").ToString(), MiDataRow("nivel").ToString(), "N")
        '                cierra_menuN()
        '            End If
        '        Else
        '            If (i = 1) Then
        '                v_titulo = MiDataRow("desc").ToString()
        '                open_menuN(v_titulo, IIf(MiDataRow("mtg").ToString() = "N", "N", "Y"))
        '                k = 0
        '            End If
        '            If (ultimaseq.ToString <> MiDataRow("seq").ToString()) Then
        '                If (i > 1) Then
        '                    cierra_menuN()
        '                    i = 1
        '                    v_html = v_html & v_abre & v_menu & v_cierra
        '                    k = 1
        '                    v_menu = ""
        '                    v_titulo = MiDataRow("desc").ToString()
        '                    open_menuN(v_titulo, IIf(MiDataRow("mtg").ToString() = "N", "N", "Y"))
        '                    genera_menuN(MiDataRow("opc").ToString(), MiDataRow("forma").ToString() & MiDataRow("parametros").ToString(), MiDataRow("icono").ToString(), MiDataRow("nivel").ToString(), "N")

        '                Else
        '                    If SelecFormaPadre(v_modulo) = False Then
        '                        genera_menuN(MiDataRow("opc").ToString(), MiDataRow("forma").ToString() & MiDataRow("parametros").ToString(), MiDataRow("icono").ToString(), MiDataRow("nivel").ToString(), "N")
        '                    Else
        '                        genera_menuN(MiDataRow("opc").ToString(), MiDataRow("forma").ToString() & MiDataRow("parametros").ToString(), MiDataRow("icono").ToString(), MiDataRow("nivel").ToString(), "S")
        '                    End If
        '                    i = i + 1
        '                End If
        '            Else
        '                If SelecFormaPadre(v_modulo) = False Then
        '                    genera_menuN(MiDataRow("opc").ToString(), MiDataRow("forma").ToString() & MiDataRow("parametros").ToString(), MiDataRow("icono").ToString(), MiDataRow("nivel").ToString(), "N")
        '                Else
        '                    genera_menuN(MiDataRow("opc").ToString(), MiDataRow("forma").ToString() & MiDataRow("parametros").ToString(), MiDataRow("icono").ToString(), MiDataRow("nivel").ToString(), "S")
        '                End If
        '                i = i + 1
        '            End If
        '            ultimaseq = MiDataRow("seq").ToString()
        '            dt1 = c.F_MENU_MODULO_VALOR(v_modulo, "1", v_usuario, codpadre, v_ValorMenu)
        '            'hacemos un llamado al metodo recursivo encargado de generar el árbol del menú.
        '            If Not (dt1 Is Nothing) Then
        '                If Bandera = 0 Then
        '                    dts = cs.F_Get_Menu_Select(v_usuario, v_modulo, v_ValorMenu, v_Forma)
        '                End If
        '                AddMenuItem(codpadre, dt1)
        '                Bandera = Bandera + 1
        '            End If
        '        End If
        '    Next
        'End If
        'If (k = "0") Then
        '    cierra_menuN()
        '    v_html = v_html & v_abre & v_menu & v_cierra
        'ElseIf (k = "1") Then
        '    cierra_menuN()
        '    v_html = v_html & v_abre & v_menu & v_cierra
        'End If
        'Me.lbl_menu.InnerHtml = v_html

    End Sub
End Class

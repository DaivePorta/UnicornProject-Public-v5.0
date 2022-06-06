Imports System.Data
Imports System.Security
Partial Class _Default
    Inherits Nomade.N.PageBase
    Dim v_rutagen As String = ""
    Dim v_ruta As String = ""
    Dim v_forma, v_forma1, v_opcion, v_rutafinal As String
    Dim v_plantilla As String = System.Configuration.ConfigurationManager.AppSettings("plantilla")
    Dim v_id As String
    Dim v_controlador As String = System.Configuration.ConfigurationManager.AppSettings("controladores")
    Dim v_vista As String = System.Configuration.ConfigurationManager.AppSettings("vistas")
    Dim v_maestro As String = System.Configuration.ConfigurationManager.AppSettings("maestro")
    Dim v_tobjeto As String = System.Configuration.ConfigurationManager.AppSettings("tobjeto")

    Dim v_c As String = ""
    Dim v_modulo As String = "nd"

    Dim malerta, ruta As Literal
    Dim v_mod(20) As String

    Dim tit As String
    Dim v_usuario As String = ""

    Dim v_logeado, v_roles As String
    Dim result(4) As String 'permiso a objeto
    Dim permiso As String
    Dim p_nombre As String


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim vcontrol As Nomade.N.Cub 'Control
        Dim noacceso As New StringBuilder
        Response.BufferOutput = True
        Dim v_rutagen As String = v_controlador & "/"
        carga_mod()
        malerta = Page.Master.FindControl("mensaje")
        ruta = Page.Master.FindControl("ruta_acceso")
        Me.malerta.Text = ""
        v_forma = Request.QueryString("f") ' obtenemos la forma a ejecutar
        v_forma1 = Request.QueryString("f")
        variables() 'cargamos las variables globales del sistema
        If (v_forma = String.Empty) Then
            v_c = v_modulo
        ElseIf (v_forma.Length = v_tobjeto) Then
            v_c = Mid(v_forma, 1, 2)
        Else
            v_c = v_forma
            v_c = v_modulo
        End If
        v_usuario = v_logeado 'obtenemos el nombre del usuario

        If (v_usuario = "0") Then
            Response.Redirect("cerrar_sesion.aspx")
        End If
        If User.Identity.IsAuthenticated Then
            If (v_forma = String.Empty) Then
                v_rutafinal = v_rutagen & v_modulo & v_controlador
                v_forma = v_modulo
                v_c = v_modulo
                v_forma1 = "NDDGINI"
                Response.Redirect("Default.aspx?f=NDDGINI") 'Carlos Medina 27/08/2014
            Else
                v_forma = Mid(v_forma, 1, 2)
                v_rutafinal = v_rutagen & v_forma & v_controlador
            End If

            permiso_forma(v_usuario, v_forma1.ToUpper)

            If (result(0) <> "error") Then
                permiso = "S"
            Else
                permiso = "N"
            End If
        Else
            v_forma1 = v_forma
        End If

        If (permiso = "S") Then

            vcontrol = Page.LoadControl(v_rutafinal & ".ascx")
            forma(vcontrol, v_forma1)
            Dim isd As Integer = cont.Controls.Count
            cont.Controls.Add(vcontrol)
            'cont1.Controls.Add(vcontrol)

        Else

            noacceso.Append("<div class='row-fluid'>")
            noacceso.Append("<div class='span12'>")
            noacceso.Append("<div class='row-fluid page-404'>")
            noacceso.Append("<div class='span5 number'>")
            noacceso.Append("<img src='recursos/img/noacceso.jpg'></img>")
            noacceso.Append("</div>")
            noacceso.Append("<div class='span7 details'>")
            noacceso.Append("<br /><br /><h3>Acceso no permitido</h3>")
            noacceso.Append("<p>")
            noacceso.Append("Usted no tiene permisos para acceder a esta forma.<br />")
            noacceso.Append("Solo puede acceder a las formas permitidas.")
            noacceso.Append("</p>")
            'CCQ 26/08/2014
            'noacceso.Append("<form action='#'>")
            'noacceso.Append("<div class='input-append'>  ")
            'noacceso.Append("<input class='m-wrap' size='16' type='text' placeholder='Buscar...' />")
            'noacceso.Append("<button class='btn blue'>Buscar</button>")
            'noacceso.Append("</div>")
            'noacceso.Append("</form>")
            noacceso.Append("</div>")
            noacceso.Append("</div>")
            noacceso.Append("</div>")
            noacceso.Append("</div>")


            CType(Page.Master.FindControl("mensaje"), Literal).Text = noacceso.ToString

        End If
        CType(Page.Master.FindControl("lblusuario"), Label).Text = p_nombre & " " & v_logeado
        CType(Page.Master.FindControl("hd"), HiddenField).Value = v_c
    End Sub

    Private Sub permiso_forma(ByVal v_user As String, ByVal v_objeto As String)
        'Dim c As New Nomade.seguridad.cobjeto("bn")
        'result = c.dame_permiso_objeto_1(v_user, v_objeto)
        'c = Nothing

        Dim c As New Nomade.NS.NSPermisos("Bn")
        Dim dt As New DataTable
        dt = c.ObtenerPermiso(v_objeto, v_user, Session("Empresa"))
        result(0) = String.Empty
        If Not dt Is Nothing Then
            For i As Integer = 0 To dt.Rows.Count - 1
                result(0) += dt.Rows(i)("PERMISO")
                CType(Page.Master.FindControl("hdpermiso"), HiddenField).Value = dt.Rows(i)("PERMISO")
            Next
        Else : result(0) = "error"
        End If
        c = Nothing

    End Sub


    Private Sub sologeo(ByVal v_autogen As String)
        If (User.Identity.IsAuthenticated) Then
            v_logeado = User.Identity.Name
        Else
            v_logeado = "0"
        End If
    End Sub
    Private Sub variables()
        Nomade.N.variables.titulo_aplicacion = "UNICORN ERP::"
    End Sub

    Private Sub carga_mod()
        v_mod(0) = "YA"
        v_mod(1) = "YG"
    End Sub

    Protected Sub Page_PreInit(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.PreInit

        If User.Identity.IsAuthenticated Then
            sologeo(User.Identity.Name)
        End If

        Me.MasterPageFile = CType(("~/" & v_maestro & "/" & v_plantilla & ".master"), String)
    End Sub

    
    Private Sub forma(ByVal p_control As Nomade.N.Cub, ByVal p_forma As String)
        Dim cobjeto As New Nomade.seguridad.cobjeto("BN")
        Dim dt As DataTable
        dt = cobjeto.dame_objeto(p_forma)
        cobjeto = Nothing
        If Not (dt Is Nothing) Then
            For Each MiDataRow As DataRow In dt.Rows
                p_control.titulo_forma = MiDataRow("GTVOBJT_desc").ToString
                'p_control.menu = MiDataRow("GTVOBJT_ind_menu").ToString
                p_control.nom_forma = MiDataRow("GTVOBJT_code").ToString
                'p_control.modulo_desc = MiDataRow("MODULO").ToString
            Next
        Else
        End If
        p_control.permiso_objeto = permiso
        p_control.usuario = v_usuario
        p_control.usua_rol = IIf(Mid(v_usuario, 1, 1) = "T", "T", "A")
        p_control.usua_roles = v_roles
        p_control.plantilla = v_maestro
        Me.Page.Title = NOMADE.N.variables.titulo_aplicacion & " | " & p_control.titulo_forma
        ruta.Text = "<li><a href='#'>" & p_control.titulo_forma & " (" & p_control.nom_forma & ")</a></li>"
    End Sub
End Class


Imports System.Data
Imports AjaxControlToolkit
Imports System.Web.Services
Imports System.Web
Imports System.Security.Principal
Imports System.Security
Imports System.DirectoryServices
Imports System.Windows.Forms
Imports FormsAuth
Imports System.IO
Imports System.Text
Imports NomadeChat.Models
Imports NomadeSeguridad.Models
Imports System.Security.Cryptography

Partial Class _login
    Inherits System.Web.UI.Page

    Public menu As New StringBuilder
    Public formas As New StringBuilder
    Dim c As New Encriptador.Encriptador()
    Public Shared ip As String
    Dim dataUsuario As DataTable

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        lblVersion.Text = System.Configuration.ConfigurationManager.AppSettings("Version")
        If Not Page.IsPostBack Then
            If Not Request.Cookies("UserInfo") Is Nothing Then
                Me.ccd0.SelectedValue = Request.Cookies("UserInfo")("sEmpresa")
                Me.ccd1.SelectedValue = Request.Cookies("UserInfo")("sEstablecimiento")
                Me.txtusuario.Text = Request.Cookies("UserInfo")("sUsuario")
                If Request.Cookies("UserInfo")("sClave") <> Nothing Then
                    Me.txtclave.Attributes.Add("value", New String("*", Request.Cookies("UserInfo")("sClave").Length))
                End If

                Me.remember.Checked = True
            End If
        End If
    End Sub

    Protected Sub Button1_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles Button1.Click

        Dim rutaMenu = ""
        Dim rutaFormas = ""
        Dim flag As Boolean = True
        Dim usuario, clave As String
        usuario = Me.txtusuario.Text
        If Not Request.Cookies("UserInfo") Is Nothing Then
            If Request.Cookies("UserInfo")("sClave") <> Nothing Then
                If (Me.txtclave.Text = New String("*", Request.Cookies("UserInfo")("sClave").Length)) Then
                    clave = c.DesEncriptarCadena(Request.Cookies("UserInfo")("sClave").Replace("Ã±", "ñ"))
                    flag = False
                End If
            End If
        End If

        If flag Then
            clave = Me.txtclave.Text
        End If

        ip = Me.hdip_publico.Value

        Try
            Dim cusuario As New Nomade.NS.NScusuario("BN")
            Dim dt As DataTable

            Dim res_audi As String
            Dim dta As New DataTable
            Dim user As New Nomade.NS.NSUsuario("Bn")
            Dim prmt As New Nomade.NC.NCParametros("Bn")
            Dim PIDM As Integer = 0
            Dim nombre As String = ""

            dta = user.listarUsuario(Me.dd_empresa.SelectedValue, Me.dd_establecimiento.SelectedValue, Me.txtusuario.Text.ToUpper, "A")

            If Not (dta Is Nothing) Then
                For Each row As DataRow In dta.Rows
                    PIDM = Integer.Parse(row("PIDM").ToString)
                    nombre = row("NOMBRE").ToString
                Next
            End If

            dt = cusuario.valida_usuario(usuario, clave, Me.logeado.Value, Me.dd_empresa.SelectedValue)

            If dt.Columns.Count > 1 Then

                Dim idsesion As String = HttpContext.Current.Request.Cookies("ASP.NET_SessionId").Value

                ListarFormas()
                Menus()

                If Me.remember.Checked = True Then
                    Response.Cookies("UserInfo")("sEmpresa") = dd_empresa.SelectedValue
                    Response.Cookies("UserInfo")("sEstablecimiento") = Me.logeado.Value
                    Response.Cookies("UserInfo")("sUsuario") = usuario
                    Response.Cookies("UserInfo")("sClave") = c.EncriptarCadena(clave)
                End If

                Session("Empresa") = dd_empresa.SelectedValue
                Session("nEmpresa") = Replace(dd_empresa.Items(dd_empresa.SelectedIndex).Text, "&", "##")
                Session("Establecimiento") = Me.logeado.Value
                Session("nEstablecimiento") = dd_establecimiento.Items(dd_establecimiento.SelectedIndex).Text
                Session("pidm") = PIDM
                Session("sNombre") = nombre


                Response.Cookies("UserInfo")("sPIDM") = PIDM
                ' Response.Cookies("UserInfo")("sNombre") = nombre

                FormsAuthentication.SetAuthCookie(dt.Rows(0)("gtvusua_id").ToString, True)

                Nomade.N.Cub.catalogo = dd_empresa.SelectedValue
                Nomade.N.Cub.establecimiento = Me.logeado.Value

                res_audi = cusuario.RegistrarAccesoUsuario(Me.txtusuario.Text, Me.dd_empresa.SelectedValue, Me.dd_establecimiento.SelectedValue, IIf(Me.hdip_publico.Value = "", "LOCAL", Me.hdip_publico.Value.ToUpper), Request.Browser.Browser & " " & Request.Browser.Version)

                Session("ID") = HttpContext.Current.Request.Cookies("ASP.NET_SessionId").Value

                Try
                    Dim existingUser = NomadeHub.BuscarClientePidm(PIDM)
                    If existingUser Is Nothing Then

                        Dim dbUSer = New DbChatUsers() With {
                        .Nombre = nombre.ToUpper,
                        .Pidm = PIDM,
                        .Foto = obtenerRutaImag(),
                        .RoomId = 666,
                        .IP = hdip_publico.Value,
                        .Navegador = Context.Request.Browser.Browser & " " & Context.Request.Browser.Version,
                        .Usuario = txtusuario.Text.ToUpper,
                        .Catalogo = dd_empresa.Items(dd_empresa.SelectedIndex).Text,
                        .Sucursal = dd_empresa.Items(dd_establecimiento.SelectedIndex).Text
                    }
                        NomadeHub.RegisterNewUser(dbUSer)
                    End If
                Catch ex As Exception
                    Response.Redirect("Default.aspx", True)
                End Try

                Try
                    Dim existingInfoUser = NomadeHub.UserRegistrado(txtusuario.Text.ToUpper, PIDM, dd_empresa.SelectedValue, dd_establecimiento.SelectedValue)

                    If existingInfoUser = 0 Then
                        Dim dbUSer = New DbUserInfo With {
                            .Pidm = PIDM,
                            .Id = txtusuario.Text.ToUpper,
                            .Catalogo = dd_empresa.SelectedValue,
                            .Sucursal = dd_establecimiento.SelectedValue,
                            .Formas = formas.ToString,
                            .Menu = menu.ToString
                        }
                        NomadeHub.RegisterNewInfoUser(dbUSer)
                    Else
                        NomadeHub.actualizarInfo(txtusuario.Text.ToUpper, PIDM, dd_empresa.SelectedValue, dd_establecimiento.SelectedValue, formas.ToString, menu.ToString)
                    End If

                Catch ex As Exception
                    Response.Redirect("Default.aspx", True)
                End Try

                Dim prmtParametro As String

                If prmt.fnGetParametro("TOPA").Rows.Count > 0 Then
                    prmtParametro = prmt.fnGetParametro("TOPA")(0)("VALOR").ToString()
                Else
                    prmtParametro = String.Empty
                End If

                If Int16.Parse(user.VerificaRolUsuario(Me.txtusuario.Text, prmtParametro)(0)("PERMISO").ToString) > 0 Then
                    Response.Redirect("vistas/TP/TomaPedidos.aspx", True)
                Else
                    Response.Redirect("Default.aspx", True)
                End If

            Else
                If Not dt Is Nothing Then

                    Dim tipo As String = String.Empty
                    Response.Cookies("LogUser")("lEmpresa") = dd_empresa.SelectedValue
                    Response.Cookies("LogUser")("lEstablecimiento") = Me.logeado.Value

                    Select Case dt.Rows(0).Item("ERROR")
                        Case "U"
                            tipo = "El <b>USUARIO</b> Ingresado no es v&aacute;lido porfavor verifiquelo vuelva a intentarlo...!!!"
                        Case "C"
                            tipo = "La <b>CLAVE</b> Ingresada no es v&aacute;lida porfavor verifiquela y vuelva a intentarlo...!!!"
                        Case "E"
                            tipo = "El Usuario no tiene acceso al <b>ESTABLECIMIENTO</b> seleccionado porfavor elija otro...!!!"
                        Case "H"
                            tipo = "Los usuarios poseen un <b>HORARIO</b> de ingreso al sistema, póngase en contacto con el Administrador...!!!"
                        Case "F"
                            tipo = "El acceso al sistema en <b>FERIADOS</b> es solo para algunos usuarios, póngase en contacto con el Administrador...!!!"
                    End Select

                    Literal1.Text = "<script>" &
                   "$(function() {" &
    "$('#classError').html(""" & tipo & """);  $('#DatosErroneos').modal('show');$(""body"").css(""cursor"", ""default"");})</script>"

                Else

                    Literal1.Text = "<script>" &
                    "$(function() {" &
    "$('#DatosErroneos').modal('show');$(""body"").css(""cursor"", ""default"");})</script>"

                End If
            End If

        Catch ex As Exception
            If rutaFormas.Length > 0 Then

            End If
            Literal1.Text = ex.ToString
        End Try
    End Sub

    Protected Sub Button2_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles Button2.Click

        Dim cusuario As New Nomade.NS.NSUsuario("Bn")

        Dim js As String = ""

        Dim correo As String = Me.txtMail.Value

        Dim email As New Nomade.Mail.NomadeMail("Bn")

        Dim code As String

        Dim rcount As Int16

        Dim dtJson As String = ""

        If Me.hdduserMail.Value <> "" Then
            rcount = 1
        Else
            dataUsuario = cusuario.listarUsuario(String.Empty, String.Empty, String.Empty, String.Empty, Me.txtMail.Value) 'LISTA LOS USUARIOS QUE REGISTRAN ESE CORREO

            Dim resb As New StringBuilder

            If dataUsuario Is Nothing Then
                rcount = 0
            Else
                rcount = dataUsuario.Rows.Count
            End If

            If rcount > 0 Then
                resb.Append("[")
                For Each MiDataRow As DataRow In dataUsuario.Rows
                    resb.Append("{")
                    resb.Append("""USUARIO"" :" & """" & MiDataRow("USUARIO").ToString & """")
                    resb.Append("}")
                    resb.Append(",")
                Next
                resb.Append("{}")
                resb = resb.Replace(",{}", String.Empty)
                resb.Append("]")

                dtJson = resb.ToString
            End If
        End If

        Select Case rcount
            Case 0

                js = "$(""body"").css(""cursor"", ""default"");t.html(""Mensaje"");b.html('<p>El correo ingresado no posee ning&uacute;n usuario asociado!</p>');" &
                        "f.html('<button data-dismiss=""modal"" class=""btn red btnActivo"">OK</button>');"

            Case 1

                js = "t.html(""Confirmar C&oacute;digo"");b.html('<p>En breves momentos se enviar&aacute; un c&oacute;digo de verificaci&oacute;n al correo: " & correo & ",</p>" &
                           "<p>el cual deber&aacute; ingresar a continuaci&oacute;n: " &
                            "<input id=""cVerific"" style=""width:70px;"" type=""text""></p>');" &
                            "f.html('<button type=""button"" id=""btnVerificaCode"" class=""btn blue btnActivo"">Confirmar</button>');" &
                            "$('#btnVerificaCode').click(function(){$(""body"").css(""cursor"", ""wait""); if($('#cVerific').val()!=''){$('#hddCode').val($('#cVerific').val()); $('#Button3').click();} else b.append('<p><small style=""color:red;"">C&oacute;digo no V&aacute;lido!</small></p>') });"

                If Me.hdduserMail.Value = "" Then
                    Me.hdduserMail.Value = dataUsuario.Rows(0)("USUARIO")
                End If

                code = cusuario.CrearCodigoVerificacion(Me.hdduserMail.Value, Me.txtMail.Value)

                email.enviar("soporte@orbitum.org", "Soporte", Me.txtMail.Value, "Restauración de Contraseña Nomade V4 - Codigo de Verificación", "Su codigo de verificación es:" & code)

            Case Else

                js = "t.html(""Confirmar Usuario"");b.html('<p>Este correo posee mas de un usuario asociado. Por favor ingrese el nombre del usuario del cual quiere reestablecer la clave:</p>" &
                            "<input id=""txtmUsuario"" placeholder=""Nombre de Usuario"" style=""width:160px;margin-left: 37%;"" type=""text""></p>');" &
                            "f.html('<button type=""button"" id=""btnConfUsuario"" class=""btn blue btnActivo"">Confirmar</button>');var json = JSON.parse('" & dtJson & "');" &
                            "$('#btnConfUsuario').click(function(){$(""body"").css(""cursor"", ""wait""); if(json.filter(function(e,d){if(e.USUARIO == $('#txtmUsuario').val())return true;}).length > 0) " &
                            "{$('#hdduserMail').val($('#txtmUsuario').val()); mg.modal('hide'); $('#Button2').click();}" &
                            "else $('#txtmUsuario').parent().append('<p><small style=""color:red;"">Usuario Incorrecto!</small></p>'); });"

        End Select

        Literal1.Text = "<script>" & _
                    "$(function() {$("".btnActivo"").removeClass(""btnActivo""); var mg = $('#ModalGeneral'); var t=$('#mgTitle');var b = $('#mgBody');var f =$('#mgFooter');" & js & _
    "mg.on('hide',function(){$('#A1').addClass('btnActivo');});mg.modal('show');$(""body"").css(""cursor"", ""default"");})</script>"


    End Sub

    Protected Sub Button3_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles Button3.Click

        Dim email As New Nomade.Mail.NomadeMail("Bn")
        Dim cusuario As New Nomade.NS.NSUsuario("Bn")
        Dim js As String = ""


        Select Case cusuario.VerificaCodigo(Me.hdduserMail.Value, Me.hddCode.Value)

            Case 1
                dataUsuario = cusuario.listarUsuario(String.Empty, String.Empty, String.Empty, String.Empty, Me.txtMail.Value)

                Dim row As System.Data.DataRow


                For Each MiDataRow As DataRow In dataUsuario.Rows
                    If MiDataRow("USUARIO").ToString = Me.hdduserMail.Value Then
                        row = MiDataRow
                    End If
                Next

                Dim nuevaClave As String = obtenerClaveRandom()

                cusuario.CambiarClaveUsuario(row("USUARIO").ToString(), row("CLAVE").ToString, nuevaClave)

                email.enviar("soporte@orbitum.org", "Soporte", Me.txtMail.Value, "Restauración de Contraseña Nomade V4", "Su nueva Contraseña de Acceso es: " & nuevaClave)

                js = "t.html(""Restauraci&oacute;n Exitosa"");b.html('<p>La restauraci&oacute;n se ha realizado correctamente. Se ha generado una nueva clave para el usuario <b>" & Me.txtMail.Value & "</b> y ha sido enviada al correo <b>" & Me.txtMail.Value & "</b>. </p>'); $('#btnok').removeClass('red').addClass('blue');"

            Case 0
                js = "t.html(""Confirmar C&oacute;digo"");b.html('<p>El c&oacute;digo ingresado es <b style=""color:red"">incorrecto</b>. por favor intente nuevamente.</p>" & _
                              "<p>Ingrese el código : " & _
                               "<input id=""cVerific"" style=""width:70px;"" type=""text""></p>');" & _
                               "f.html('<button type=""button"" id=""btnVerificaCode"" class=""btn blue btnActivo"">Confirmar</button>');" & _
                               "$('#btnVerificaCode').click(function(){ if($('#cVerific').val()!=''){$('#hddCode').val($('#cVerific').val()); $('#Button3').click();} else b.append('<p><small style=""color:red;"">C&oacute;digo no V&aacute;lido!</small></p>') });"

            Case 2

                js = "t.html(""Mensaje"");b.html('<p>El c&oacute;digo ingresado ha expirado!</p>');" & _
                       "f.html('<button data-dismiss=""modal"" class=""btn red btnActivo"">OK</button>');"


        End Select

        Literal1.Text = "<script>" & _
                    "$(function() {$("".btnActivo"").removeClass(""btnActivo"");var mg = $('#ModalGeneral'); var t=$('#mgTitle');var b = $('#mgBody');var f =$('#mgFooter');" & js & _
                    "mg.modal('show');$(""body"").css(""cursor"", ""default""); mg.on('hide',function(){$('#A1').addClass('btnActivo');}); })</script>"


    End Sub

    Function obtenerRutaImag() As String

        Dim P As New Nomade.NS.NSUsuario("Bn")
        Dim ruta As String = P.listarUsuario(String.Empty, String.Empty, Me.txtusuario.Text, "A").Rows(0).Item("IMAGEN")
        Return ruta

    End Function

    Public Sub Menus()

        Dim menuSis As New Nomade.NS.NSPermisos("Bn")
        Dim dtMenu As DataTable

        menu.Clear()
        dtMenu = menuSis.ListarMenuSistema() 'Listar menu web (W)

        menu.Append("<ul><li><div class='sidebar-toggler hidden-phone'></div></li><li><div style='margin:10px;'></div></li>")

        If Not (dtMenu Is Nothing) Then

            menu.Append("<li id='home' class='start'>")
            menu.Append("<a href='../../Default.aspx'>")
            menu.Append("<i class='icon-home'></i>")
            menu.Append("<span class='title'>Principal</span>")
            menu.Append("<span class='selected'></span>")
            menu.Append("</a>")
            menu.Append("</li>")

            Dim sistActual As String = String.Empty
            Dim sisAntiguo As String = String.Empty
            Dim moduActual As String = String.Empty
            Dim modAntiguo As String = String.Empty

            For Each MiDatarow As DataRow In dtMenu.Rows

                sistActual = MiDatarow("CODIGO_SISTEMA").ToString

                If sisAntiguo <> sistActual Then

                    If sisAntiguo <> String.Empty Then

                        menu.Append("</ul>")

                        menu.Append("</li>")

                        menu.Append("</ul>")

                        menu.Append("</li>")

                        modAntiguo = String.Empty

                    End If

                    menu.Append("<!--item menu " + MiDatarow("DESCRIPCION_SISTEMA").ToString + "--->")
                    menu.Append("<li><a href='javascript:;'>")
                    menu.Append("<i class='" + MiDatarow("ICONO_SISTEMA").ToString + "'></i><span class='title'>" + MiDatarow("NOMBRE_SISTEMA").ToString + "</span>")
                    menu.Append("<span class='arrow'></span>")
                    menu.Append("</a>")
                    menu.Append("<ul class='sub-menu'>")

                End If

                'modulo

                moduActual = MiDatarow("NOMBRE_MODULO").ToString

                If moduActual <> modAntiguo Then

                    If modAntiguo <> String.Empty Then

                        menu.Append("</ul>")

                        menu.Append("</li>")

                    End If

                    menu.Append("<li><a href='#'><span class='title'>" + MiDatarow("NOMBRE_MODULO").ToString + "</span><span class='arrow'></span></a>")

                    menu.Append("<ul class='sub-menu'>")

                End If

                'items

                menu.Append("<li id='" + MiDatarow("FORMA").ToString.ToLower + "'><a href='?f=" + MiDatarow("FORMA").ToString + "'>" + MiDatarow("NOMBRE_ITEM").ToString + "</a></li>")

                sisAntiguo = sistActual
                modAntiguo = moduActual
            Next

            'fin items
            menu.Append("</ul>")

            menu.Append("</li>")

            menu.Append("</ul>")

            'fin modulo

            menu.Append("</li>")

            menu.Append("<li>")
            menu.Append("<a href='cerrar_sesion.aspx'>")
            menu.Append("<i class='icon-off'></i>")
            menu.Append("<span class='title'>Salir del Sistema</span>")
            menu.Append("</a>")
            menu.Append("</li>")
        End If
        menu.Append("</ul>")

    End Sub

    Public Sub ListarFormas()
        Dim dt As DataTable = Nothing
        Dim v As New Nomade.NC.NCVista("Bn")
        dt = v.ListarVista("", "W")
        formas.Clear()
        If Not (dt Is Nothing) Then
            formas.Append("<select id='cboVistaX'  onchange='EnviarPagina();' placeholder='Buscar pantalla o Ingrese Codigo...'><option></option>")
            For Each MiDataRow As DataRow In dt.Rows
                formas.Append("<option value='" & MiDataRow("OBJETO").ToString & "'>" + MiDataRow("DESCRIPCION").ToString & " ( " & MiDataRow("OBJETO").ToString & " )" & "</option>")
            Next
            formas.Append("</select>")
        End If
    End Sub

    Public Function obtenerClaveRandom() As String

        Dim possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-."
        Dim Len = 8
        Dim cpossibleChars() As Char
        cpossibleChars = possibleChars.ToCharArray()
        Dim builder As New StringBuilder()

        For i As Integer = 0 To Len - 1
            Dim randInt32 As Integer = GetRandomInt()
            Dim r As New Random(randInt32)

            Dim nextInt As Integer = r.[Next](cpossibleChars.Length)
            Dim c As Char = cpossibleChars(nextInt)
            builder.Append(c)
        Next

        Return builder.ToString()

    End Function

    Public Function GetRandomInt() As Integer
        Dim randomBytes As Byte() = New Byte(3) {}
        Dim rng As New RNGCryptoServiceProvider()
        rng.GetBytes(randomBytes)
        Dim randomInt As Integer = BitConverter.ToInt32(randomBytes, 0)
        Return randomInt
    End Function




End Class
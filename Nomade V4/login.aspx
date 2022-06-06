<%@ Page Language="VB" AutoEventWireup="false" CodeFile="login.aspx.vb" Inherits="_login" Culture="es-PE" UICulture="es-PE" %>

<%@ Import Namespace="FormsAuth" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxcontrolToolkit" TagPrefix="ajaxToolkit" %>




<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!-->
<html lang="es">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
    <meta charset="utf-8" />
    <title>Unicorn ERP | Login</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <link href="recursos/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="recursos/plugins/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" />
    <link href="recursos/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="recursos/css/style-metro.css" rel="stylesheet" />
    <link href="recursos/css/style.css" rel="stylesheet" type="text/css" />
    <link href="recursos/css/style-responsive.css" rel="stylesheet" type="text/css" />
    <link href="recursos/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color" />
    <link href="recursos/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
    <link href="recursos/css/pages/login.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="recursos/img/ico/unicorn.png" />
    <link href="recursos/plugins/select2/select2.css" rel="stylesheet" type="text/css" />
    <link href="recursos/plugins/select2/select2-bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../recursos/plugins/font-awesome/css1/font-awesome.css" rel="stylesheet" />
    <link href="recursos/css/flag-icons/css/flag-icon.min.css" rel="stylesheet" />
    <script src="recursos/plugins/jquery-1.8.3.min.js" type="text/javascript"></script>

</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<script runat="server">
    Protected Function GetLogonId() As String
        Return System.Security.Principal.WindowsIdentity.GetCurrent().Name
    End Function
</script>



<body class="login">

    <div class="header-login">
    </div>
    <div class="row-fluid logo">
        <!-- INICIO DEL LOGO -->
        <a class="brand" href="#">
            <img src="../../recursos/img/logo.png" alt="logo" class="logo">
        </a>
        <div class="txtlogo">Unicorn ERP <span style="color: rgb(125, 128, 133);">[Login]</span></div>
        <!-- FIN DEL LOGO -->

    </div>

    <!-- BEGIN LOGIN -->
    <div class="row-fluid login">
        <div class="span6" id="imgIni">
        </div>

        <div class="span6">

            <div class="content">
                <!-- BEGIN LOGIN FORM -->
                <form id="form1" class="form-vertical login-form" runat="server" action="login.aspx">
                    <asp:Literal ID="Literal1" runat="server"></asp:Literal>
                    <asp:ScriptManager ID="asm" runat="server" EnablePartialRendering="true"></asp:ScriptManager>

                    <asp:HiddenField ID="hdduserf" runat="server" Value="<%$ Code: System.Security.Principal.WindowsIdentity.GetCurrent().Name %>" />

                    <asp:HiddenField ID="logeado" runat="server" Value="" />

                    <asp:HiddenField ID="hdduserMail" runat="server" Value="" />
                    <asp:HiddenField ID="hddCode" runat="server" Value="" />
                    <asp:HiddenField ID="txtMail" runat="server" Value=""></asp:HiddenField>
                    <asp:HiddenField ID="hdip_publico" runat="server" Value="" />


                    <asp:Label runat="server" ID="errorLabel"></asp:Label>
                    <%--<asp:CheckBox ID="chkPersist" Runat="server" Text="Persist Cookie" />--%>

         

                    <div style="display: none;">
                        <asp:Button ID="Button1" runat="server" Text="Button" />
                        <asp:Button ID="Button2" runat="server" Text="Button2" />
                        <asp:Button ID="Button3" runat="server" Text="Button3" />



                    </div>
                    <%--    <h3 class="form-title" align="center">Acceso al Sistema</h3>--%>
                    <div class="alert alert-error hide">
                        <button class="close" data-dismiss="alert"></button>
                        <span>Digita tu usuario y clave para ingresar al sistema</span>
                    </div>

                    <div class="control-group">
                        <label class="control-label visible-ie8 visible-ie9">Empresa</label>
                        <div class="controls">
                            <div class="input-icon left">
                                <%--<i class="icon-lock"></i>--%>
                                <asp:DropDownList class="m-wrap placeholder-no-fix" ID="dd_empresa" runat="server" Style="width: 100%;"></asp:DropDownList>
                            </div>
                        </div>
                    </div>


                    <div class="control-group">
                        <label class="control-label visible-ie8 visible-ie9">Establecimiento</label>
                        <div class="controls">
                            <div class="input-icon left" id="controlestablec">
                                <%--<i class="icon-lock"></i>--%>
                                <asp:DropDownList class="m-wrap placeholder-no-fix" ID="dd_establecimiento" runat="server" Style="width: 100%;"></asp:DropDownList>

                            </div>
                        </div>
                    </div>





                    <div class="control-group" id="ctrlusuario">
                        <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                        <label class="control-label visible-ie8 visible-ie9">Usuario</label>
                        <div class="controls">
                            <div class="input-icon left">
                                <i class="icon-user"></i>
                                <asp:TextBox ID="txtusuario" runat="server" placeholder="Usuario" class="m-wrap placeholder-no-fix"></asp:TextBox>
                            </div>
                        </div>
                    </div>

                    <div class="control-group" id="ctrlclave">
                        <label class="control-label visible-ie8 visible-ie9">Clave</label>
                        <div class="controls">
                            <div class="input-icon left">
                                <i class="icon-lock"></i>
                                <asp:TextBox class="m-wrap placeholder-no-fix" ID="txtclave" runat="server" placeholder="Clave" TextMode="Password"></asp:TextBox>
                            </div>
                        </div>
                    </div>


                    <div class="control-group">
                        <label class="control-label visible-ie8 visible-ie9">Idioma</label>
                        <div class="controls">
                            <div class="input-icon left">
                                <%--<i class="icon-lock"></i>--%>
                                <asp:DropDownList class="m-wrap placeholder-no-fix" ID="dd_idioma" runat="server" data-placeholder="IDIOMA" Style="width: 100%;">

                                    <asp:ListItem>ESPAÑOL LATINOAMERICA</asp:ListItem>
                                </asp:DropDownList>
                            </div>
                        </div>
                    </div>

                    <ajaxToolkit:CascadingDropDown id="ccd0" servicepath="webservice.asmx" prompttext="" runat="server" targetcontrolid="dd_empresa" servicemethod="listarempresa" category="empresa"></ajaxToolkit:CascadingDropDown>

                    <ajaxToolkit:CascadingDropDown id="ccd1" servicepath="webservice.asmx" prompttext="" runat="server" parentcontrolid="dd_empresa" targetcontrolid="dd_establecimiento" servicemethod="listarestablecimiento" category="establecimiento"></ajaxToolkit:CascadingDropDown>

                    <div class="form-actions">
                        <div class="row-fluid">
                            <a href="javascript:validar();" id="A1" class="btn blue pull-left btnActivo">Iniciar Sesion <i class="m-icon-swapright m-icon-white"></i>
                            </a>
                            <label class="checkbox pull-right">
                                <asp:CheckBox ID="remember" runat="server" type="checkbox" name="remember" />
                                <span id="spnRemember">Recordarme</span>
                            </label>
                        </div>

                    </div>

                </form>
                <!-- END LOGIN FORM -->
                <!-- BEGIN FORGOT PASSWORD FORM -->
                <form class="form-vertical forget-form" action="login.aspx">
                    <h3 class="">Olvidó su Clave ?</h3>
                    <div class="alert alert-error hide">
                        <button class="close" data-dismiss="alert"></button>
                        <span>Digita su email para recuperar su clave</span>
                    </div>

                    <p>Ingrese se email, se verificara y se enviara un mensaje con instrucciones.</p>
                    <div class="control-group">
                        <div class="controls">
                            <div class="input-icon left">
                                <i class="icon-envelope"></i>

                                <input class="m-wrap placeholder-no-fix" id="txtEmail" type="email" placeholder="Email" name="email" />
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <a id="back-btn" class="btn">
                            <i class="m-icon-swapleft"></i>&nbsp;Regresar
                        </a>
                        <a id="btngo" href="javascript:olvidoContra();" class="btn blue pull-right">Enviar <i class="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </form>
                <!-- END FORGOT PASSWORD FORM -->
                <!-- BEGIN REGISTRATION FORM -->
                <form class="form-vertical register-form" action="login.aspx">
                    <h3 class="">Solicitar Una cuenta</h3>
                    <p>Ingrese los datos para evaluar su requerimiento:</p>
                    <div class="control-group">
                        <div class="controls">
                            <div class="input-icon left">
                                <i class="icon-home"></i>
                                <input class="m-wrap" type="text" placeholder="Nombre Empresa" />
                            </div>
                        </div>
                        <div class="controls">
                            <div class="input-icon left">
                                <i class="icon-road"></i>
                                <input class="m-wrap" type="text" placeholder="Rubro Empresa" />
                            </div>
                        </div>
                        <div class="controls">
                            <div class="input-icon left">
                                <i class="icon-user"></i>
                                <input class="m-wrap" type="text" placeholder="Nombre Contacto" />
                            </div>
                        </div>
                        <div class="controls">
                            <div class="input-icon left">
                                <i class="icon-phone"></i>
                                <input class="m-wrap" type="text" placeholder="Telefono / Celular" />
                            </div>
                        </div>
                        <div class="controls">
                            <div class="input-icon left">
                                <i class="icon-envelope"></i>
                                <input class="m-wrap" type="text" placeholder="Email" />
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <a href="javascript:;" id="register-back-btn" class="btn">
                            <i class="m-icon-swapleft"></i>&nbsp;Regresar
                        </a>
                        <a href="#" id="register-submit-btn" class="btn blue pull-right">Solicitar <i class="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </form>
                <!-- END REGISTRATION FORM -->
            </div>
        </div>

    </div>


    <div class="row-fluid forget">
        <div class="span6" id="spaceForget">
            <img src="../../recursos/img/peru.png" class="peru"/>
        </div>
        <div class="span6">
            <div class="forget-password">
                <h4>Olvidó su Clave ?</h4>
                <p>
                    haga click <a href="javascript:;" class="" id="forget-password">aqui</a>
                    para restablecer su clave.
                </p>
            </div>
            <div class="forget-password">
                <h4>Desea utilizar nuestro sistema ?</h4>
                <p>
                     <a href="javascript:;" class="" id="new-account">Solicitar una Cuenta</a>                   
                </p>
            </div>
            <%--<div id="_divMsgSunat" style="background: rgba(0, 0, 0, 0.55); width: 230px; height: 35px; right: 0px; position: fixed; bottom: 8vh; display: none">
                <p id="msgSunat" style="position: relative; color: white; padding: 8px;">Cargando Tipo de Cambio Sunat ...</p>
            </div>--%>
        </div>
    </div>

    <!-- END LOGIN -->
    <!-- BEGIN COPYRIGHT -->
    <div class="row-fluid footer-login">
        
        <div class="pull-left copyR">
            <label>&copy; 2009 - <%=Date.Now.Year%> - Unicorn ERP version
                <asp:Label runat="server" ID="lblVersion"></asp:Label>
                - TODOS LOS DERECHOS RESERVADOS</label>
            <label>Software desarrollado bajo estándares de calidad por <b><a href="http://www.orbitum.org">ORBITUM NET SRL</a></b></label>
        </div>
        <div class="copyR pull-right">
            <div class="dropup">
                <span class="dropdown-toggle flag-icon flag-icon-pe" data-toggle="dropdown">                    
                </span> &nbsp;<b>Perú</b>
                <ul class="dropdown-menu">
                  <%--  <li><span class="flag-icon flag-icon-ar"></span>&nbsp;Argentina</li>
                    <li><span class="flag-icon flag-icon-br"></span>&nbsp;Brasil</li>
                    <li><span class="flag-icon flag-icon-cl"></span>&nbsp;Chile</li>
                    <li><span class="flag-icon flag-icon-co"></span>&nbsp;Colombia</li>
                    <li><span class="flag-icon flag-icon-ec"></span>&nbsp;Ecuador</li>
                    <li><span class="flag-icon flag-icon-py"></span>&nbsp;Paraguay</li>--%>
                    <li><span class="flag-icon flag-icon-pe"></span>&nbsp;Perú</li>
                </ul>
            </div>
            <div class="contact"> <a href="#">Contacto</a></div>
            <div class="social">
                <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-youtube" aria-hidden="true"></i></a>
            </div>
        </div>

    </div>
    <!-- END COPYRIGHT -->
    <!-- BEGIN JAVASCRIPTS -->
    <!-- BEGIN CORE PLUGINS -->
    <!-- IMPORTANT! Load jquery-ui-1.10.1.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->

               <div id="DatosErroneos" class="modal inline fade hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2"
                        aria-hidden="true">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            </button>
                            <h3 id="myModalLabel2">Datos Erroneos</h3>
                        </div>
                        <div class="modal-body">
                            <p id="classError">
                                Los datos Ingresados no son validos porfavor verifique sus datos y vuelva a intentarlo...!!!
                            </p>

                        </div>
                        <div class="modal-footer">
                            <button id="btnok" data-dismiss="modal" class="btn red">
                                OK</button>
                        </div>
                    </div>

                    <div id="ModalGeneral" class="modal inline fade hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2"
                        aria-hidden="true">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            </button>
                            <h3 id="mgTitle"></h3>
                        </div>
                        <div class="modal-body" id="mgBody">
                        </div>
                        <div class="modal-footer" id="mgFooter">
                            <button data-dismiss="modal" class="btn red">
                                OK</button>
                        </div>
                    </div>

                    <div id="TipoCambioErrado" class="modal inline fade hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3"
                        aria-hidden="true">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            </button>
                            <h3 id="myModalLabel3">Tipo Cambio Faltante</h3>
                        </div>
                        <div class="modal-body">
                            <p id="classErrorTp">
                                El tipo de cambio no se ha cargado correctamente...!!!
                            </p>

                        </div>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn red">
                                OK</button>
                        </div>
                    </div>


    <script src="recursos/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
    <script src="recursos/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <!--[if lt IE 9]>
  <script src="recursos/plugins/excanvas.js"></script>
  <script src="recursos/plugins/respond.js"></script> 
  <![endif]-->
    <script src="recursos/plugins/breakpoints/breakpoints.js" type="text/javascript"></script>
    <!-- IMPORTANT! jquery.slimscroll.min.js depends on jquery-ui-1.10.1.custom.min.js -->
    <script src="recursos/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
    <script src="recursos/plugins/jquery.blockui.js" type="text/javascript"></script>
    <script src="recursos/plugins/jquery.cookie.js" type="text/javascript"></script>
    <script src="recursos/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="recursos/plugins/select2/select2.min.js"></script>
    <!-- END CORE PLUGINS -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script src="recursos/plugins/jquery-validation/dist/jquery.validate.min.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL PLUGINS -->
    <!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="recursos/scripts/app.js" type="text/javascript"></script>
    <script src="recursos/scripts/login.js" type="text/javascript"></script>

    <%--<script type="text/javascript" src="http://l2.io/ip.js?var=ip_publico"></script>--%>

    <!-- END PAGE LEVEL SCRIPTS -->



    <script type="text/javascript">
        var ip_publico;



        function validar() {
            if ($('.login-form').validate().form()) {
                $("#logeado").val($("#dd_establecimiento").val());
                $("body").css("cursor", "wait");
                document.getElementById("<%=Button1.ClientId %>").click();
            }

        }

        function olvidoContra() {
            if ($('.forget-form').validate().form()) {
                $("body").css("cursor", "wait");
                document.getElementById("<%=Button2.ClientID%>").click();
            }
        }

        jQuery(document).ready(function () {
            $("#hdip_publico").val(ip_publico);
            App.init();
            Login.init();

        });

      // txtusuario.focus();
    </script>

</body>
<!-- END BODY -->
</html>




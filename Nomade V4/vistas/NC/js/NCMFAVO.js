//------ OBTENER LA TECLA DE PARAMETROS (CODIGO --> 'HELP') ----------
var ctrlPressed = false;
var teclaCtrl = 113;
var teclaPrmt = 0;
function _ObtenerTeclaAyuda() {
    var tecla;
    //$.post("vistas/NC/ajax/NCMFAVO.ASHX", { flag: 6 },
    //    function (res) {
    //        teclaPrmt = parseInt(res);
    //    });
}
//------- FIN TECLA ------------------------
//------- OBTENER AYUDA DE LA PANTALLA -------------
function ObtenerDatosForma() {

    var html =
    '<div id="_ayudaForma" class="modal red hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" style="width: 50%; left: 46%!important;aria-hidden="true">' +
    '<div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color:#ffffff;">' +
    ' <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">' +
    '  <i class="icon-remove"></i>' +
    ' </button>' +
    '        <h4 id="myModalLabel">CENTRO DE AYUDA AL USUARIO</h4>' +
    '    </div>' +
    '    <div class="modal-body" >' +
    '       <div class="row-fluid" >' +
    '           <div class="span12" id="_buscarempleadodetallebody" style="line-height: 230%;"></div>' +
    '       </div>' +
    '    </div>' +
    '</div>'
    ;
    if ($("#_ayudaForma").html() == undefined) {
        $("body").append(html);
    }

    var forma = $("#ctl00_txtforma").val();

    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMFORM.ASHX?OPCION=R&CODE=" + forma,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $("#myModalLabel").text("AYUDA DE USUARIO: " + datos[0].CODE);
            var cadena = "<h4>" + datos[0].DESCR + "</h4>" + datos[0].AYUDA;
            $("#_buscarempleadodetallebody").html(cadena);
        }
    });
    $("#_ayudaForma").modal('show');
}
//------- FIN AYUDA --------------------------------
function Quitar(codforma) {
    var p_user = $('#ctl00_lblusuario').html();
        Bloquear("sortable_portlets");
        $.post("vistas/NC/ajax/NCMFAVO.ASHX", { flag: 4, codvista: codforma, usuario: p_user},
            function (res) {
                if (res == "OK") {
                    exito();
                    Desbloquear("sortable_portlets");
                    CargarFavoritos();
                }
                else {
                    noexitoCustom("Error al eliminar favorito.")
                }


            });
}

function CargarFavoritos() {
    var p_user = $('#ctl00_lblusuario').html();

    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMFAVO.ASHX",
        data: { flag: 3,  usuario: p_user},
        async: true,
        beforeSend: function () { Bloquear("sortable_portlets"); },
        success: function (res) { $('#sortable_portlets').html(res); fillCboVistaFavoritos();},
        complete: function () { Desbloquear("sortable_portlets"); },
        error: function (error) { alert(error);}
    });
}

function _ActualizarFavoritos() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codigointerno = $('#txtcodigointerno').val();
    var p_codigovista = $("#txtcodvista").val();
    var p_user = $('#ctl00_lblusuario').html();

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMFAVO.ASHX", { flag: 2, codvista: p_codigovista, activo: p_acti, usuario: p_user,codigo:p_codigointerno },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    CargarFavoritos();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:_ActualizarFavoritos();");
                } else {
                    noexito();
                }
            });
}

function _CrearFavoritos() {

    var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';
    var p_codigovista = $("#cboVista").val();
    var p_user = $('#ctl00_lblusuario').html();
    if (vErrors("cboVista")) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMFAVO.ASHX", {
            flag: 1,
            codvista: p_codigovista,
            activo: "A",
            usuario: p_user,
            codigo: p_codigovista
        },
            function (res) {
                Desbloquear("ventana");
                if (res.length == 4) {
                    exito();                   
                    cargacbo();                
                    $("#txttipo").val("");
                    $("#txtnombre").val("");
                    CargarFavoritos();
                } else {
                    noexito();
                }
            });
    }
}

function vistaPreviaVista() {

    
}

var define = 1;

function defineVariable(variable)
{
    define=variable;
}

function BuscarVista(p_codigovista){    
    
    if (p_codigovista == '' && p_codigovista.length<7) {
        //alertCustom('Ingrese el codigo de la vista, recuerde que son 7 digitos.!!!');
        $("#txtcodvista").val("");
        $("#txtnombre").val("");
        $("#txttipo").val("");
    }else{
                    Bloquear('ventana');
                      $.ajax({
                          type: "POST",
                          url: "vistas/NC/ajax/NCMFAVO.ASHX?flag=0&codigo=" + p_codigovista,
                          contentType: "application/json;",
                          dataType: "json",
                          
                          success: function (datos) {
                              
                              if (datos == null){
                                  $("#txtcodvista").val("");
                                  $("#txtnombre").val("");
                                  $("#txttipo").val("");
                                alertCustom('El codigo ingresado no existe.!!!');
                              }else{
                                $("#txcodista").val(datos[0].OBETO);
                                $("#txtnombre").val(datos[0].DESCRIPCION);
                                $("#txttipo").val(datos[0].TIPO_OBJETO);
                              }
                              Desbloquear('ventana');
                          },
                          error: function (msg) {
                              $("#txtcodvista").val("");
                              Desbloquear('ventana');
                              alertCustom('El codigo ingresado no existe.!!!');
                          }
                      });
    }
}

function ObtenerQueryString(param) {
    var urlpagina = window.location.search.substring(1);
    var variables = urlpagina.split('&');
    for (var i = 0; i < variables.length; i++) {
        var nombrparam = variables[i].split('=');
        if (nombrparam[0] == param) {
            return nombrparam[1]; //valor

        }
    }
}




var fillCboVistaFavoritos = function () {
    var selectTipoPlan = $("#cboVista");
    var p_user = $('#ctl00_lblusuario').html();
    selectTipoPlan.select2({
        placeholder: "Buscar pantalla o Ingrese Codigo",
        allowClear: true
    });
    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmfavo.ashx?flag=LVF&usuario=" + p_user,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            selectTipoPlan.empty();
            selectTipoPlan.append("<option></option>");

            if (!isEmpty(datos)) {
                for (var i = 0; i < datos.length; i++) {
                    selectTipoPlan.append('<option value="' + datos[i].OBJETO + '">' + datos[i].DESCRIPCION + ' ( ' + datos[i].OBJETO + ' ) ' + '</option>');
                }
            }

            $("#cboVista").val("").change();
        

        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function cargacbo() {
    $("#cboVista").change(function () {

        $("#abuscar").removeAttr("disabled");

        BuscarVista($(this).val());

    });
}

var NCMFAVO = function () {
    var  armaBreadcrumb = function(forma) {
            forma = forma.toLowerCase();
            if (document.getElementById(forma) == null) {
                if (forma.substring(2, 3) == "m") { forma = forma.substring(0, 2) + 'l' + forma.substring(3, 7) }
                else { forma = forma.substring(0, 2) + 'm' + forma.substring(3, 7) }
            }
            var html = "<li><a style='font-size: 15px;font-weight: 600;'>" + $(".breadcrumb").html() + "</a></li>";
            var breadcrumbc = ' <li><i class="icon-home"></i><a href="Default.aspx">Principal</a><i class="icon-angle-right"></i></li>'

            for (var i = 0; i < $("#" + forma).parents("li").length ; i++) {

                breadcrumbc += '<li><a>';
                breadcrumbc += $($("#" + forma).parents("li")[$("#" + forma).parents("li").length - 1 - i]).children("a").children(".title").html();
                breadcrumbc += '</a><i class="icon-angle-right"></i></li>';

            }

            breadcrumbc += html;

            $(".breadcrumb").html(breadcrumbc);

        }
    //Carlos Medina 27/08/2014 - Función para mantener desplegado y activo el menú abierto

    var cargainicial = function() {
        cargacbo();
        $("#abuscar").click(function () {         

            var purl = ($("#cboVista").val()).toLowerCase();

            $("#myModalLabel").html("VISTA PREVIA: "+$("#txtnombre").val());

            $(".frame").attr("src", "?f="+purl);

          

        });
    }

    var fillMenuUsuario = function () {
        var usuario = $("#ctl00_txtus").val();
        var ctlg = $("#ctl00_hddctlg").val();
        var scsl = $("#ctl00_hddestablecimiento").val();
   

        if (localStorage.getItem("HTML_Menu") !== null && localStorage.getItem("HTML_cboVista")!==null) {
        
            $("#menuUsuario").html(localStorage.getItem("HTML_Menu"));
            ActivarForma();
            $("#formasUsuario").html(localStorage.getItem("HTML_cboVista"));
            $("#cboVistaX").css({ "display": "block" }).select2();

            eventosPostMenu();

        }else{

            $.ajax({
                type: "post",
                url: "vistas/nc/ajax/ncmfavo.ashx?flag=MENU&usuario=" + usuario + "&ctlg=" + ctlg + "&scsl=" + scsl,
                async: true,
                cache: true,
                dataType: "html",
                success: function (datos) {
                    if (datos != '') {
                        $(".page-sidebar").css("display", "none");
                        $("#menuUsuario").html(datos);


                    } else {
                        //alertCustom('El sistema se ha actualizado, por favor cierre la sesion y vuela  a ingresar.')
                    }
                },
                error: function (msg) {
                    //alert("error" + msg);
                    // location.href = "cerrar_sesion.aspx";
                    console.log(msg);
                },
                complete: function () {                   
                    var datos;
                    $.ajax({
                        type: "post",
                        url: "vistas/NS/ajax/NSOMENU.ASHX?empresa=" + $("#ctl00_hddctlg").val() + "&user=" + $("#ctl00_txtus").val(),
                        contenttype: "application/json;",
                        datatype: "json",
                        async: true,
                        success: function (res) {
                            datos = res;
                            if (res != "error") {

                                for (var i = 0; i < res.length; i++) {

                                    var exis_id_menu = $(".page-sidebar li [id*=" + res[i].ITEM.toLowerCase() + "]").html() != undefined ? true : false;
                                    if (exis_id_menu) {

                                        var id_menu = res[i].ITEM.toLowerCase();


                                        var prnt = $("#" + id_menu).parents("li")[0];


                                        $("#" + id_menu).remove();

                                        if ($(prnt).children("ul").html().trim() == "") {
                                            var prnts = $(prnt).parents("li")
                                            prnt.remove();
                                            if ($(prnts).children("ul").html().trim() == "") {

                                                prnts.remove();
                                            }

                                        }
                                    }
                                }


                                $(".page-sidebar li [id='']").remove();

                                /** eliminar modulos vacios **/

                                var mod = $(".page-sidebar li>a[href=#]").parent();


                                mod.filter(function (e, f) {
                                    if ($(f).children("ul").children().length == 0) {

                                        $(f).remove();

                                    }

                                });

                                var modulo = $(".page-sidebar li>.sub-menu").parent();

                                modulo.filter(function (e, f) {
                                    if ($(f).children("ul").children().length == 0) {

                                        $(f).remove();

                                    }

                                });

                                $(".page-sidebar").css("display", "block");

                                localStorage.setItem("HTML_Menu", $(".page-sidebar").html())

                                ActivarForma();
                            }
                        },
                        complete: function () {

                            fillFormasUsuario(datos);
                            eventosPostMenu();
                            
                        }

                    });

                }

            });
        }
    }

   

      


    function eventosPostMenu() {
        var forma = $("#ctl00_txtforma").val();
        if (forma == "NDDGINI") {
            $("#home").addClass('active');
        } else {
            forma = forma.toLowerCase();
            if (document.getElementById(forma) == null) {
                if (forma.substring(2, 3) == "m") { forma = forma.substring(0, 2) + 'l' + forma.substring(3, 7) }
                else { forma = forma.substring(0, 2) + 'm' + forma.substring(3, 7) }

            }
            $('#' + forma).parents("li").children("a").children("span").addClass("open");
            $('#' + forma).parents('li').addClass('open');
            $('#' + forma).parents('li').addClass('smactivo');
            $('#' + forma).parents('ul').css('display', 'block');
            $('#' + forma).addClass('active');
        }

        // if (parseInt($("#contenedorPrincipal").css("height").split("px")[0]) < parseInt($("#menuUsuario").css("height").split("px")[0]))
        $("#contenedorPrincipal").css("min-height", ($("#menuUsuario").height() > $(window).height() - 78 ? $("#menuUsuario").height().toString() : ($(window).height() - 75).toString()) + "px");
        $(window).resize(function () { $("#contenedorPrincipal").css("min-height", ($("#menuUsuario").height() > $(window).height() - 78 ? $("#menuUsuario").height().toString() : ($(window).height() - 75).toString()) + "px"); });

     //   $("#Principal").css({ "overflow-y": "auto", "max-height": ($("#menuUsuario").height() > $(window).height() - 78 ? $("#menuUsuario").height().toString() : ($(window).height() - 152).toString()) + "px" });


        var editor = $('#menuUsuario');

        //the next line is all you need for MSIE
        editor.resize(function () {
      
            $("#contenedorPrincipal").css("min-height", ($("#menuUsuario").height() > $(window).height() - 78 ? $("#menuUsuario").height().toString() : ($(window).height() - 75).toString()) + "px");
         //   $("#Principal").css({ "overflow-y": "auto", "max-height": ($("#menuUsuario").height() > $(window).height() - 78 ? $("#menuUsuario").height().toString() : ($(window).height() - 152).toString()) + "px" });
        });

        //MSIE will exit here
        if (!editor[0].addEventListener) { return; }

        editor.data('size', {height: editor.height() });

        $("#menuUsuario>ul>li").click(function () {
            var _this = $("#menuUsuario");
            setTimeout(function () {
                if (
                    _this.data('size').height != _this.height()
                  ) {
                    _this.data('size', { height: _this.height() });
                    _this.trigger('resize');
                }
            }, 100);           
        });

       

        $('.page-sidebar .sidebar-toggler').click(function (e) {
            $(".sidebar-search").removeClass("open");
            var container = $(".page-container");
            if (container.hasClass("sidebar-closed") === true) {
                container.removeClass("sidebar-closed");
                $.cookie('sidebar-closed', null);
            } else {
                container.addClass("sidebar-closed");
                $.cookie('sidebar-closed', 1);
            }
            e.preventDefault();
        });
    }


    function fillFormasUsuario(data) {
        var usuario = $("#ctl00_txtus").val();
        var ctlg = $("#ctl00_hddctlg").val();
        var scsl = $("#ctl00_hddestablecimiento").val();

        $.ajax({
            url: "vistas/nc/ajax/ncmfavo.ashx?flag=FORMAS&usuario=" + usuario + "&ctlg=" + ctlg + "&scsl=" + scsl,
            async: true,
            cache: true,
            success: function (datos) {
                if (datos != '') {

                    $("#formasUsuario").html(datos);
                    $("#cboVistaX").select2();
                } else {
                    //alertCustom('El sistema se ha actualizado, por favor cierre la sesion y vuela  a ingresar.')
                }
            },
            error: function (msg) {
                //alert("error" + msg);
                // location.href = "cerrar_sesion.aspx";
                console.log(msg);
            },
            complete: function () {              
          
                var res = data;

                    if (res != "error") {

                        for (var i = 0; i < res.length; i++) {

                            var exis_id_menu = $("#cboVistaX  option[value=" + res[i].ITEM.toUpperCase() + "]").tostring != undefined ? false : true;
                            if (exis_id_menu) {
                                var vista = $("#cboVistaX  option[value=" + res[i].ITEM.toUpperCase() + "]");
                                vista.remove();
                            }
                        }

                        localStorage.setItem("HTML_cboVista", $("#cboVistaX")[0].outerHTML);
                    }
                }       
        });
    }

    var favoritos = function(){
    $("#sortable_portlets").sortable({
                connectWith: ".portlet",
                items: ".portlet",
                opacity: 0.8,
                coneHelperSize: true,
                placeholder: 'sortable-box-placeholder round-all',
                forcePlaceholderSize: true,
                tolerance: "pointer"
            });

            $(".column").disableSelection();
    }

    function ActivarForma() {
        var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 13);
        $(".sub-menu  li  a ").each(function () {
            if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
                $(this).addClass("active");
        });   
 
        armaBreadcrumb($("#ctl00_txtforma").val());
    }



        return {
            init: function () {
                fillMenuUsuario();                                  
                favoritos();
                cargainicial();
                _ObtenerTeclaAyuda();
            }
        };    
}();

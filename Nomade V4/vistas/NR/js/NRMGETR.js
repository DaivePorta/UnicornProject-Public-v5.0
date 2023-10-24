var arrayActividad = [];
var vg_OptionsPersonaNatural = '';
var vg_OptionsPersonaJuridica = '';
var vg_OptionsTipoTelefono = '';
var vg_OptionsTipoEmail = '';
var ide;
var p = 0;
var us = $("#ctl00_txtus").val();
var vg_SelectTipoContribuyente = '';
DatosSunatCargados = new Array();
DatosReniecCargados = new Array();

tipo_doc = 1;
NRORUC = "";
var dire = "";//dporta
//var city = '';//dporta
var token_migo = '';//dporta
var NRLGETR = function () {


    var fillBandejaPersonas = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjPersona').val());
        var parms = {
            data: json,
            columns: [
                 { data: "RAZON_SOCIAL" },
                 {
                     data: "TIPO_DOCUMENTO",
                     createdCell: function (td, cellData, rowData, row, col) {

                         $(td).attr('align', 'center')
                         if (json[row].NRO_RUC != "") { $(td).html(cellData + "<BR>RUC") }

                     }
                 },
                {
                    data: "NRO_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        if (json[row].NRO_RUC != "") { $(td).html(cellData + "<BR>" + json[row].NRO_RUC) }

                    }
                },
                { data: "CATE_DESC" },
                 {
                     data: { _: "FECHA_INICIO.display", sort: "FECHA_INICIO.order" },
                     createdCell: function (td, cellData, rowData, row, col) {

                         $(td).attr('align', 'center')

                     }
                 },
                { data: "CTLG_DESC" },
                { data: "NICA_DESC" },
            { data: "DIRECCION" }]
        }

        oTablePersonas = iniciaTabla('tblPersonas', parms);



        $("#tblPersonas").removeAttr("style");

        $('#tblPersonas tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTablePersonas.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTablePersonas.fnGetPosition(this);
                var row = oTablePersonas.fnGetData(pos);
                var tp = row.TIPO;
                var td = row.CODIGO_TIPO_DOCUMENTO;
                var d = row.NRO_DOCUMENTO;

                window.location.href = '?f=NRMGETR&tp=' + tp + '&td=' + td + '&d=' + d;
            }
        });
    }

    return {
        init: function () {
            //plugins();
            fillBandejaPersonas();
        }
    };

}();

var NRMGETR = function () {

    var plugins = function () {
        $('#cboTipoDocumento').select2();

    }

    var fillCboTipoDocumento = function () {



        var selectTipoDocumento = $('#cboTipoDocumento');

        if (localStorage.getItem("dataTipoDoc") != undefined) {
            vg_OptionsPersona = localStorage.getItem("dataTipoDoc");
            selectTipoDocumento.html(vg_OptionsPersona);
            cargarxUrlDNI();
        } else {
            Bloquear($(selectTipoDocumento.siblings("div")[0]).attr("id"));
            var optionsPersona = '';
            $.ajax({
                type: "get",
                url: "vistas/nc/ajax/ncmpers.ashx?OPCION=0",
                success: function (datos) {
                    selectTipoDocumento.empty();

                    if (datos != null) {

                        vg_OptionsPersona = datos;
                        selectTipoDocumento.html(vg_OptionsPersona);
                        localStorage.setItem("dataTipoDoc", vg_OptionsPersona);
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            }).done(function () { Desbloquear($(selectTipoDocumento.siblings("div")[0]).attr("id")); cargarxUrlDNI(); });

        }

    }

    var eventoControles = function () {

        function AsignarVarp() {
            $("#txtdocumento").blur(function () {
                if ($('#cboTipoDocumento').val() == "6") {
                    if (parseInt($(this).val().substring(0, 1)) == 2 && $(this).val().length == 11) {
                        var aux = $(this).val();
                        var aux2 = $('#cboTipoDocumento').val();

                        $("#cboTipoDocumento").select2('val', aux2);
                        $("#txtdocumento").val(aux);

                        p = 1;

                    } else {
                        var aux = $(this).val();
                        var aux2 = $('#cboTipoDocumento').val();

                        $("#cboTipoDocumento").select2('val', aux2);
                        $("#txtdocumento").val(aux);

                        p = 0;
                    }
                } else {
                    p = 0;
                }

            });
        }

        $('#cboTipoDocumento').on('change', function () {
            $("#txtdocumento").focus();

            var valor = $(this).val();


            switch (valor) {
                case "1": //DNI

                    $("#txtdocumento").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
                    offObjectEvents('txtdocumento');
                    AsignarVarp();
                    HandlerKeydownDocumento();

                    break;

                case "6": //RUC
                    $("#txtdocumento").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
                    offObjectEvents('txtdocumento');
                    AsignarVarp();
                    HandlerKeydownDocumento();
                    break;

                case "4": //CARNE EXTRANJ.
                    $("#txtdocumento").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
                    offObjectEvents('txtdocumento');
                    HandlerKeydownDocumento();
                    break;

                case "7": //PASAPORTE
                    $("#txtdocumento").inputmask({ "mask": "#", "repeat": 9, "greedy": false });
                    offObjectEvents('txtdocumento');
                    HandlerKeydownDocumento();
                    break;

                case "11"://PARTIDA

                    $("#txtdocumento").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
                    offObjectEvents('txtdocumento');
                    HandlerKeydownDocumento();

                    break;

                case "0"://OTROS //DPORTA

                    $("#txtdocumento").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
                    offObjectEvents('txtdocumento');
                    HandlerKeydownDocumento();

                    break;
            }

            tipo_doc = $(this).val();
        });

        AsignarVarp();
    }

    var cargaInicial = function () {

        vg_OptionsTipoTelefono = '';
        vg_OptionsTipoEmail = '';
        vg_SelectTipoContribuyente = '';
        $('#hfPPBIDEN_PIDM').val('');
        $('#hfPPBIDEN_ID').val('');
        $('#hfPPRTELE_NUM_SEQ').val('');
        $('#hfPPRCORR_NUM_SEQ').val('');
        $('#hfPPBIMAG_CODE').val('');
        $('#hfPPBIDEN_PIDM_REPRESENTANTE').val('');
        $('#hfPPBIDEN_PIDM_CONTACTO').val('');
        $('#hfJsonDirecciones').val('');
        $('#hfEstereotipoActivo').val('');
        $('#hfDireccionPersonaJuridica').val('');

        $("#txtdocumento").inputmask({ "mask": "9", "repeat": 8, "greedy": false });

        HandlerKeydownDocumento();
        $("#txtcaptcha").keypress(function (e) { if (e.keyCode == "13") { CargaReniec(); } });
       // cargarxUrlDNI();

    }

    return {
        init: function () {
            plugins();
            cargarParametrosSistema();
            fillCboTipoDocumento();
            eventoControles();
            cargaInicial();

        }
    };
}();

function BloqueVerifica() {

    $("#cboTipoDocumento").attr("disabled", "disabled");
    //$("#txtdocumento").attr("disabled", "disabled"); se comento debido a que cargas el numero de documento es editable
    $("#btnverificar").attr("class", "span8 btn green disabled");
    $("#btnverificar").attr("onclick", "javascript:;");
}

function cargarParametrosSistema() {

    //TOKEN PARA PODER HACER LAS CONSULTAS DE LOS N° DE DOCS. A SUNAT
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=MIGO",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                token_migo = datos[0].DESCRIPCION_DETALLADA;
            } else {
                alertCustom("No se recuperó correctamente el parámetro MIGO!");
            }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro MIGO!");
        }
    });

    //DIRECCION(CIUDAD) POR DEFECTO
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=CIDE",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            if (datos[0].VALOR == "SI") {
    //                city = datos[0].DESCRIPCION_DETALLADA;

    //            } else {
    //                city = "TRUJILLO";
    //            }
    //        } else {
    //            city = "TRUJILLO";
    //        }
    //    },
    //});
}

function MuestraFormulario(v_Value, v_Datos) {
    
    BloqueVerifica();

    // offObjectEvents('txtdocumento');
    HandlerKeydownDocumento();
    $("#txtdocumento").val(ide);

    var doc = $("#cboTipoDocumento").val();//DPORTA

    if (ide.substr(0, 1) == '2' && ide.length == 11 && doc == '6') {//DPORTA

        $("#DatosPersona").load('../../vistas/NC/persona/PersonaJuridica.html', function (html) {

            $.getScript("../../vistas/NC/persona/js/PersonaJuridica.js")
             .done(function (script, textStatus) {
                 NCMPEJU.init();

                 if (v_Value) {
                     cargaDatosPersonaJuridica(v_Datos);
                     cargarReprecPrincipal();
                     cargarContacPrincipal();
                     ////alert('13');

                     p = 1;
                 }
                 else {

                     limpiarDatosPersonaJuridica();
                     //cargarReprecPrincipal();
                     if (v_Datos == "C") {//carga

                         var fechaAct = FechaDelDia();//dporta
                         //cargaDatosSunat(DatosSunatCargados)
                         cargaDatosSunat2(DatosSunatCargados, fechaAct)
                     }
                 }
                 $(".verificar").hide();
                 $("#DatosPersona").show();
             });


        });

    }

    if (((ide.substr(0, 1) != '2') && (doc != '0')) || ((ide.substr(0, 1) == '2') && (ide.length != 11) && (doc != '0'))) {//DPORTA

        $("#DatosPersona").load('../../vistas/NC/persona/PersonaNatural.html', function (html) {

            $.getScript("../../vistas/NC/persona/js/PersonaNatural.js")
             .done(function (script, textStatus) {
                 NCMPENA.init();
                 if (v_Value) { cargaDatosPersonaNatural(v_Datos); p = 0; }
                 else {
                     limpiarDatosPersonaNatural();
                     if (v_Datos == "C") {//carga

                         var fechaAct = FechaDelDia();//dporta
                         //cargaDatosSunat(DatosSunatCargados)
                         cargaDatosSunat2(DatosSunatCargados, fechaAct)
                     }
                     if (v_Datos == "R") {//carga

                         cargaDatosReniec(DatosReniecCargados);
                     }
                 }
                 $(".verificar").hide();
                 $("#DatosPersona").show();
             });


        });

    }

    //DPORTA
    if (doc == 0 && ide.length <= 11) {

        $("#DatosPersona").load('../../vistas/NC/persona/PersonaNatural.html', function (html) {

            $.getScript("../../vistas/NC/persona/js/PersonaNatural.js")
                .done(function (script, textStatus) {
                    NCMPENA.init();
                    if (v_Value) { cargaDatosPersonaNatural(v_Datos); p = 0; }
                    else {
                        limpiarDatosPersonaNatural();
                        if (v_Datos == "C") {//carga

                            cargaDatosSunatN(DatosSunatCargados)
                        }
                        if (v_Datos == "R") {//carga

                            cargaDatosReniec(DatosReniecCargados);
                        }
                    }
                    $(".verificar").hide();
                    $("#DatosPersona").show();
                });


        });

    }
}



function cargarEstereotipos() {

    var USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
    var CORRECTO = true;
    var ADICIONALES_IND = true;
    var PROVEEDOR_IND = true;

    var CTLG_CODE = $('#ctl00_hddctlg').val();

    if (CORRECTO) {

        $("#estereotipos").removeAttr("style");

        if (ADICIONALES_IND) {
            $('#tabAdicionales').tab('show');
            $('#tabAdicionales').tab().show();

            $.ajaxSetup({ async: false });


            $("#adicionales").load('../../vistas/NC/estereotipos/Adicionales.html', function (html) {
                $.getScript("../../vistas/NC/estereotipos/js/Adicionales.js")
                    .done(function (script, textStatus) {

                    });
            });
            $.ajaxSetup({ async: true });

            ADICIONALES.init();
            $("#txtdir").val(dire == '-' || dire == '' ? "TRUJILLO" : eliminarDiacriticos(dire));//dporta

            $("#tabAdicionales").on("click", function () {
                if ($.trim($('#hfEstereotipoActivo').val()) != "ADICIONALES") {
                    $('#hfEstereotipoActivo').val("ADICIONALES");
                }
            });

            $("#masdirecciones").on("click", function () {
                crearclones("direccion", "../../vistas/NC/estereotipos/Adicionales.html", "Direccion Secundaria", "DIRECCION");
                addObjectJsonDirecciones("", ObtenerUltimoIdDiv("direccion") - 1, 0);
            });

            jsEventsControlsDireccion("direccion");

            $("#masbancos").on("click", function () {
                crearclones("datosbanco", "../../vistas/NC/estereotipos/Adicionales.html", "Datos Bancarios Secundarios", "DATOSBANCO");
                addObjectJsonDatosBanco(ObtenerUltimoIdDiv("datosbanco") - 1, "0");
            });

            $("#mastelefonos").on("click", function () {
                crearclones("telefonos", "../../vistas/NC/estereotipos/Adicionales.html", "", "TELEFONOS");
                addObjectJsonTelefonos(ObtenerUltimoIdDiv("telefonos") - 1, 0);
            });

            $("#masemails").on("click", function () {
                crearclones("emails", "../../vistas/NC/estereotipos/Adicionales.html", "", "EMAILS");
                addObjectJsonEmails(ObtenerUltimoIdDiv("emails") - 1, 0);
            });

        }

      

        $('#tabProveedor').tab().hide();

      

        if (PROVEEDOR_IND) {

            $('#tabProveedor').tab().show();
            $.ajaxSetup({ async: false });
            $("#proveedor").load('../../vistas/NC/estereotipos/Proveedor.html', function (html) {
            });
            $.ajaxSetup({ async: true });

            $("#tabProveedor").on("click", function () {
                if ($.trim($('#hfEstereotipoActivo').val()) != "PROVEEDOR") {
                    PROVEEDOR.init();
                    $('#hfEstereotipoActivo').val("PROVEEDOR");
                    $('#slcNivelCadenaAbastecimiento').select2("val", "0006").attr("disabled", true);
                }
            });

        }

        }  
}


function VerificarPersona() {
    var NRO = '';
    var DOID_CODE = '';
    var Errors = '';
    var flag = false;

    var TipoDocumento = $.trim($('#cboTipoDocumento').val());
    var NroDocumento = $.trim($('#txtdocumento').val());

    if (TipoDocumento == "1") {
        if (NroDocumento.length < 8) {
            $('#txtdocumento').val('');
        }
    }
    else if (TipoDocumento == "6") {
        if (NroDocumento.length < 11) {
            $('#txtdocumento').val('');
        }
    }

    Errors = vErrors(["txtdocumento"]);

    $('#txtdocumento').val(NroDocumento);

    if (Errors) {

        DOID_CODE = TipoDocumento;
        NRO = NroDocumento;
        ide = NRO;

        if (NRO.length == 11 && TipoDocumento == '6') { //DPORTA
            if (rucValido(NRO)) {
                if ((ide.substr(0, 1) == '1') && (ide.substr(0, 1) != '2') && (ide.length == 11)) {


                    flag = true;
                }

                if ((ide.substr(0, 2) == '10') && (ide.length == 11) && TipoDocumento == '6') {
                    DOID_CODE = '1';
                    NRO = NRO.substring(2, 10);
                }

                Bloquear("verificar");
                //  $.ajaxSetup({ async: false });
                $.post("vistas/NC/ajax/NCMPERS.ASHX",
                    {
                        OPCION: 1.5,
                        DOID_CODE: DOID_CODE,
                        NRO: NRO
                    })
                    .done(function (res) {

                        if (res == 'NOEXISTE') {
                            if (p == 0) {
                                if (flag) $('#DatosSunat').attr('style', 'display:inline;');
                                else {
                                    $('#DatosSunat').attr('style', 'display:none;');
                                    $('#DatosReniec').attr('style', 'display:inline;');
                                }

                            }
                            if (p == 1) {
                                //  MuestraSunat();
                                $('#DatosSunat').attr('style', 'display:inline;');
                                $('#DatosReniec').attr('style', 'display:none;');
                            }
                            var docu = $('#cboTipoDocumento :selected').attr('nemonico');
                            $('#spanNroDoc').html((docu.substring(docu.length - 1) == 'A' ? "La" : "El") + "<B> " + docu + ' ' + $("#txtdocumento").val() + "</B>");
                            $('#PerNoExiste').modal('show');
                        } else {
                            $('#hfPPBIDEN_PIDM').val(res.split(",")[0]);
                            RecuperarDatos(res.split(",")[0], DOID_CODE, NRO);
                            if (ide.substr(0, 1) == '2' && ide.length == 11) {

                            }
                            if ((ide.substr(0, 1) != '2') || ((ide.substr(0, 1) == '2') && (ide.length != 11))) {

                            }
                            if (DOID_CODE !== res.split(",")[2]) {
                                infoCustom2("Persona ya se encuentra registrada con " + res.split(",")[1]);
                            }
                        }
                        Desbloquear("verificar");
                    })
                    .fail(function () {
                        Desbloquear("verificar");
                        alertCustom("Error al verificar Persona.");
                    });
                //  $.ajaxSetup({ async: true });
            } else {
                setTimeout(function () {
                    $("#txtdocumento").val("");
                }, 400);
                infoCustom2("El RUC ingresado NO existe en SUNAT");
            }
        } else {
            if ((TipoDocumento != '0') && (ide.substr(0, 1) == '1') && (ide.substr(0, 1) != '2') && (ide.length == 11)) {//DPORTA

                flag = true;
            }

            if ((ide.substr(0, 1) == '1') && (ide.length == 11) && TipoDocumento == '6') {
                DOID_CODE = '1';
                NRO = NRO.substring(2, 10);
            }

            Bloquear("verificar");
            //  $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMPERS.ASHX",
                {
                    OPCION: 1.5,
                    DOID_CODE: DOID_CODE,
                    NRO: NRO
                })
                .done(function (res) {

                    if (res == 'NOEXISTE') {
                        if (p == 0) {
                            if (flag) $('#DatosSunat').attr('style', 'display:inline;');
                            else {
                                $('#DatosSunat').attr('style', 'display:none;');
                                $('#DatosReniec').attr('style', 'display:inline;');
                            }

                        }
                        if (p == 1) {
                            //  MuestraSunat();
                            $('#DatosSunat').attr('style', 'display:inline;');
                            $('#DatosReniec').attr('style', 'display:none;');
                        }
                        var docu = $('#cboTipoDocumento :selected').attr('nemonico');
                        $('#spanNroDoc').html((docu.substring(docu.length - 1) == 'A' ? "La" : "El") + "<B> " + docu + ' ' + $("#txtdocumento").val() + "</B>");
                        $('#PerNoExiste').modal('show');
                    } else {
                        $('#hfPPBIDEN_PIDM').val(res.split(",")[0]);
                        RecuperarDatos(res.split(",")[0], DOID_CODE, NRO);
                        if (ide.substr(0, 1) == '2' && ide.length == 11) {

                        }
                        if ((ide.substr(0, 1) != '2') || ((ide.substr(0, 1) == '2') && (ide.length != 11))) {

                        }
                        if (DOID_CODE !== res.split(",")[2]) {
                            infoCustom2("Persona ya se encuentra registrada con " + res.split(",")[1]);
                        }
                    }
                    Desbloquear("verificar");
                })
                .fail(function () {
                    Desbloquear("verificar");
                    alertCustom("Error al verificar Persona.");
                });
                //  $.ajaxSetup({ async: true });
        }
    }
}

function rucValido(ruc) {
    var dig01 = ruc.substr(0, 1) * 5;
    var dig02 = ruc.substr(1, 1) * 4;
    var dig03 = ruc.substr(2, 1) * 3;
    var dig04 = ruc.substr(3, 1) * 2;
    var dig05 = ruc.substr(4, 1) * 7;
    var dig06 = ruc.substr(5, 1) * 6;
    var dig07 = ruc.substr(6, 1) * 5;
    var dig08 = ruc.substr(7, 1) * 4;
    var dig09 = ruc.substr(8, 1) * 3;
    var dig10 = ruc.substr(9, 1) * 2;
    var dig11 = ruc.substr(10, 1);

    var suma = dig01 + dig02 + dig03 + dig04 + dig05 + dig06 + dig07 + dig08 + dig09 + dig10;

    var residuo = suma % 11;
    var resta = 11 - residuo;

    var digVerifica;

    if (resta == 10) {
        digVerifica = 0;
    } else if (resta == 11) {
        digVerifica = 1;
    } else {
        digVerifica = resta;
    }

    if (dig11 == digVerifica) {
        return true;
    } else {
        return false;
    }
}

function RecuperarDatos(v_PIDM, v_TipoDocumento, v_NRO) {
    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMPERS.ASHX?OPCION=4&PIDM=" + v_PIDM + "&DOID_CODE=" + v_TipoDocumento + "&NRO=" + v_NRO,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                MuestraFormulario(true, datos);
            }
        },
        error: function (msg) {
            alertCustom("Error al obtener datos de la persona.");
        }
    });
}


function cargarxUrlDNI() {

    var v_TipoPersona = ObtenerQueryString("tp");
    var v_TipoDocumento = ObtenerQueryString("td");
    var v_Documento = ObtenerQueryString("d");

    if (v_TipoPersona != undefined && v_TipoDocumento != undefined && v_Documento != undefined) {


        $('#cboTipoDocumento').select2('val', v_TipoDocumento);
        $('#cboTipoDocumento').change();
        $("#txtdocumento").val(v_Documento);

        VerificarPersona();
    }

    if (ObtenerQueryString("prop") != undefined) {
        $("#txtdocumento").val(ObtenerQueryString("prop"));
        VerificarPersona();
    }
    if (ObtenerQueryString("chof") != undefined) {
        $("#txtdocumento").val(ObtenerQueryString("chof"));
        VerificarPersona();
    }
}

function HandlerKeydownDocumento() {
    $("#txtdocumento").keydown(function (e) {
        if (e.keyCode == 13) {
            VerificarPersona();
        }
    });
}

function MuestraReniec() {
    //DPORTA_RF
    var NRO = ide;
    if (NRO.length == 8) {
        var formData = new FormData();
        formData.append("token", token_migo);
        formData.append("dni", NRO);

        var request = new XMLHttpRequest();

        request.open("POST", "https://api.migo.pe/api/v1/dni-beta");
        request.setRequestHeader("Accept", "application/json");

        request.send(formData);
        request.onload = function () {
            var data = JSON.parse(this.response);
            $("#PerNoExiste").modal('hide');
            if (data.success == true) {
                $("#captchaModal").modal('hide');

                MuestraFormulario(false, 'R');
                DatosReniecCargados = data;

            } else {
                MuestraReniec2();//DPORTA 27/09/2021
                //alertCustom("No se Encontraron Resultados. Verique si ingresó correctamente el DNI")
                //$("#captchaModal").modal('hide');
                //$("#PerNoExiste").modal("show");
            }
        };
    } else {
        infoCustom2("RENIEC solo consulta números de DNI");
    }

    //var NRO = ide;
    //$.ajax({
    //    type: "post",
    //    url: "vistas/nc/ajax/ncmpers.ashx?OPCION=RENIEC&NRO=" + NRO,
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: false,
    //    success: function (data) {

    //        switch (data) {

    //            case "SIN_RESULTADOS":
    //                alertCustom("No se Encontraron Resultados. Verique si ingresó correctamente el DNI")
    //                $("#captchaModal").modal('hide');
    //                $("#PerNoExiste").modal("show");

    //                break;

    //            default:
    //                $("#captchaModal").modal('hide');

    //                MuestraFormulario(false, 'R');
    //                DatosReniecCargados = JSON.parse(data);

    //        }
    //    }
    //});

}

function MuestraReniec2() {//DPORTA 27/09/2021
    //DPORTA_RF
    var NRO = ide;
    if (NRO.length == 8) {
        var formData = new FormData();
        formData.append("token", token_migo);
        formData.append("dni", NRO);

        var request = new XMLHttpRequest();

        request.open("POST", "https://api.migo.pe/api/v1/dni");
        request.setRequestHeader("Accept", "application/json");

        request.send(formData);
        request.onload = function () {
            var data = JSON.parse(this.response);
            $("#PerNoExiste").modal('hide');
            if (data.success == true) {
                $("#captchaModal").modal('hide');

                MuestraFormulario(false, 'R');
                DatosReniecCargados = data;

            } else {
                alertCustom("No se Encontraron Resultados. Verique si ingresó correctamente el DNI")
                $("#captchaModal").modal('hide');
                $("#PerNoExiste").modal("show");
            }
        };
    } else {
        infoCustom2("RENIEC solo consulta números de DNI");
    }
}

//function CargaReniec() {

//    var NRO = ide;
//    $.ajax({
//        type: "post",
//        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=RENIEC&NRO=" + NRO + "&CAPTCHA=" + $("#txtcaptcha").val(),
//        contenttype: "application/json;",
//        datatype: "json",
//        async: false,
//        success: function (data) {

//            switch (data) {

//                case "CAPTCHA":

//                    $("#msgcaptcha")
//                        .html("Ingreso del captcha no v&aacute;lido!<a href='javascript:MuestraReniec();'> Reintentar<a>")
//                        .css("display", "block");

//                    break;

//                case "SIN_RESULTADOS":
//                    alertCustom("No se Encontraron Resultados.")
//                    $("#captchaModal").modal('hide');
//                    $("#PerNoExiste").modal("show");

//                    break;

//                case "ERROR":

//                    alertCustom("Se produjo un error en la consulta. Intente nuevamente más tarde.")
//                    $("#captchaModal").modal('hide');
//                    $("#PerNoExiste").modal("show");

//                    break;

//                default:
//                    $("#captchaModal").modal('hide');

//                    MuestraFormulario(false, 'R');
//                    DatosReniecCargados = JSON.parse(data);

//            }

//        }
//    });


//}

//function MuestraSunat() {

//    var NRO = ide;

//    $.ajax({
//        type: "post",
//        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=SUNAT&NRO=" + NRO,
//        contenttype: "application/json;",
//        datatype: "json",
//        async: false,
//        success: function (data) {

//            if (data == "NO_EXISTE" || data == "error") {
//                $("#no_existe").css("display", "block").html('<p>El número de <B>RUC ' + NRO + '</B> consultado no es válido.</p>');

//                $("#existe").css("display", "none");
//            } else {
//                var datos = $.parseJSON(data)

//                if (datos[0].FECHA_BAJA != "0000-00-00" && datos[0].FECHA_BAJA != "[]") {

//                    //DPORTA_RF
//                    let fecha;
//                    let mes;
//                    let anio;
//                    let dia;
//                    let fecha_baja;

//                    fecha = datos[0].FECHA_BAJA;

//                    anio = fecha.split("-")[0];
//                    mes = fecha.split("-")[1];
//                    dia = fecha.split("-")[2];

//                    fecha_baja = dia + "/" + mes + "/" + anio;

//                    $("#no_existe").css("display", "block").html('<p>El <b>RUC ' + NRO + '</b> perteneciente a <B>' + datos[0].RAZON + '</B> se encuentra en <B>' + datos[0].ESTADO + '</B> desde <B>' + fecha_baja + '</B> por SUNAT. </p>');;
//                    $("#existe").css("display", "none");

//                }
//                else {

//                    if (datos != null) {

//                        //DPORTA_RF
//                        let fecha;
//                        let mes;
//                        let anio;
//                        let dia;
//                        let new_fecha;

//                        fecha = datos[0].FECHA_INICIO;

//                        anio = fecha.split("-")[0];
//                        mes = fecha.split("-")[1];
//                        dia = fecha.split("-")[2];

//                        new_fecha = dia + "/" + mes + "/" + anio;

//                        $("#existe").css("display", "block");
//                        $("#no_existe").css("display", "none");
//                        $('#lblModalNumeroRuc').html(NRO);
//                        $('#lblrazonsocial').html(datos[0].RAZON);
//                        $('#lblModalEstado').html(datos[0].ESTADO);
//                        $('#lblModalSituacion').html(datos[0].CONDICION);
//                        $('#lblModalDireccion').html(datos[0].DIRECCION);
//                        $('#lblModalTelefono').html(datos[0].TELEFONO);
//                        $('#lblModalActividad').html(datos[0].ACTIVIDAD);
//                        $('#lblModalNombreComercial').html(datos[0].NOMBRE_COMERCIAL)
//                        $('#lblModalFechaIni').html(new_fecha)

//                        DatosSunatCargados = datos;
//                    } else {


//                    }
//                }
//            }
//            $('#SunatCaptcha').modal('hide');
//            $('#ModalSunat').modal('show');
//        },
//        error: function (msg) {
//            alert(msg);
//        }
//    });

//}

function FechaDelDia() {
    //$("#lblModalFechaIni").datepicker({
    //    dateFormat: 'dd/mm/yy',
    //    firstDay: 1
    //}).datepicker("setDate", new Date());

    var fecha = new Date();
    var dia = fecha.getDate();
    var ano = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;

    return fNueva = dia + '/' + mes + '/' + ano;

    //$("#lblModalFechaIni").val(fNueva);
};

//Nuevo link, en caso el que se está usando ahora deje de funcionar (Aún en desarrollo)
function MuestraSunat() {

    var NRO = ide;
    var formData = new FormData();

    formData.append("token", token_migo);
    formData.append("ruc", NRO);

    var request = new XMLHttpRequest();

    request.open("POST", "https://api.migo.pe/api/v1/ruc");
    request.setRequestHeader("Accept", "application/json");

    request.send(formData);
    request.onload = function () {
        var data = JSON.parse(this.response);
        $("#PerNoExiste").modal('hide');
        if (data.success == true) {
            if (data.estado_del_contribuyente == "ACTIVO") {
                if (data.condicion_de_domicilio == "HABIDO") {
                    $("#existe").css("display", "block");
                    $("#no_existe").css("display", "none");
                    $('#lblModalNumeroRuc').html(data.ruc);
                    $('#lblrazonsocial').html(data.nombre_o_razon_social);
                    $('#lblModalEstado').html(data.estado_del_contribuyente);
                    $('#lblModalSituacion').html(data.condicion_de_domicilio);
                    $('#lblModalDireccion').html(data.direccion);
                    dire = data.direccion;//dporta
                    //$('#lblModalTelefono').html("");
                    //$('#lblModalActividad').html("");
                    $('#lblModalNombreComercial').html(data.nombre_o_razon_social);
                    //$('#lblModalFechaIni').html(fecha)
                    $('#txtCondSunat').html(data.condicion_de_domicilio);
                    $('#txtEstaSunat').html(data.estado_del_contribuyente);
                    DatosSunatCargados = data;

                    $('#SunatCaptcha').modal('hide');
                    $('#ModalSunat').modal('show');
                } else {
                    infoCustom2("El RUC: " + NRO + " se encuentra como " + data.condicion_de_domicilio + " por SUNAT.");
                }
            } else {
                infoCustom2("El RUC: " + NRO + " se encuentra en " + data.estado_del_contribuyente + " por SUNAT.");
            }
        } 
    };
}

function CancelarSunat() {
    $('#ModalSunat').modal('hide');
}
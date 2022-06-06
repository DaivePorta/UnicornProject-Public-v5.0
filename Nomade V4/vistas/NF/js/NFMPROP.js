var NFLPROP = function () {


    var datatable = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "PIDM",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NOMBRE" },
                { data: "NOMBRE_EMPRESA" },
                { data: "EMPRESA", visible: false },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                  {
                      data: "TIPO_DOCUMENTO",
                      createdCell: function (td, cellData, rowData, row, col) {

                          $(td).attr('align', 'center')
                          if (json[row].NRO_RUC != "") { $(td).html(cellData + "<BR>RUC") }

                      },
                      visible: false
                  },
                {
                    data: "NRO_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        if (json[row].NRO_RUC != "") { $(td).html(cellData + "<BR>" + json[row].NRO_RUC) }

                    },
                    visible: false
                },
            ]

        }


        var oTablePersonas = iniciaTabla("tblBandeja", parms);

        //$('#tblBandeja tbody').on('click', 'tr', function () {           
        //    if ($(this).hasClass('selected')) {
        //        $(this).removeClass('selected');
        //    }
        //    else {
        //        table.$('tr.selected').removeClass('selected');
        //        $(this).addClass('selected');
        //        var pos = table.fnGetPosition(this);
        //        var row = table.fnGetData(pos);
        //        var code = row.CODIGO;
        //        var code_empr = row.EMPRESA;
        //        $.post("vistas/NF/ajax/NFMPROP.ASHX", { codigo: code },
        //        function (res) {
        //            window.location.href = '?f=ncmpers&prop=' + res + '&empr=' + code_empr;
        //        });
        //    }
        //});

        $('#tblBandeja tbody').on('click', 'tr', function () {
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
                window.location.href = '?f=NFMPROP&tp=' + tp + '&td=' + td + '&d=' + d;
            }
        });


    }

    return {
        init: function () {
            //  cargainicial();
            datatable();
            // plugins();
        }
    };
}();

//---------------------------------

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

var personas = [];

var NFMPROP = function () {

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

function MuestraFormulario(v_Value, v_Datos) {



    BloqueVerifica();

    // offObjectEvents('txtdocumento');
    HandlerKeydownDocumento();
    $("#txtdocumento").val(ide);

    var doc = $("#cboTipoDocumento").val();//DPORTA

    f(ide.substr(0, 1) == '2' && ide.length == 11 && doc == '6') {//DPORTA

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
}

function cargarEstereotipos() {

    var USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
    var CORRECTO = true;
    var ADICIONALES_IND = true;
    var PROPIETARIO_VEHICULO_IND = true;

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

        $('#tabPropietario').tab().hide();

        if (PROPIETARIO_VEHICULO_IND) {

            $('#tabPropietario').tab().show();
            $.ajaxSetup({ async: false });
            $("#propietario").load('../../vistas/NC/estereotipos/Propietario.html', function (html) {
            });
            $.ajaxSetup({ async: true });

            if (ObtenerQueryString("prop") != undefined) {
                $('#tabPropietario').tab("show");
                PROPIETARIO.init();
            }

            $("#tabPropietario").on("click", function () {
                if ($.trim($('#hfEstereotipoActivo').val()) != "PROPIETARIO") {
                    PROPIETARIO.init();
                    $('#hfEstereotipoActivo').val("PROPIETARIO");
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

    Errors = vErrors(["txtdocumento", "cboTipoDocumento"]);

    $('#txtdocumento').val(NroDocumento);

    if (Errors) {

        DOID_CODE = TipoDocumento;
        NRO = NroDocumento;
        ide = NRO;

        if ((ide.substr(0, 1) == '1') && (ide.substr(0, 1) != '2') && (ide.length == 11)) {


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
                OPCION: 1,
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
                    $('#hfPPBIDEN_PIDM').val(res);
                    RecuperarDatos(res, DOID_CODE, NRO);
                    if (ide.substr(0, 1) == '2' && ide.length == 11) {

                    }
                    if ((ide.substr(0, 1) != '2') || ((ide.substr(0, 1) == '2') && (ide.length != 11))) {

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
    //$("#captchaModal").modal("show");
    //var NRO = ide;
    //$.ajax({
    //    type: "post",
    //    url: "vistas/nc/ajax/ncmpers.ashx?OPCION=CAPTCHA_RENIEC",
    //    async: false,
    //    success: function (data) {
    //        $("#msgcaptcha").css("display", "none");
    //        $("#img_captcha").attr("src", data + "?" + Math.random());
    //    }
    //});

    var NRO = ide;
    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=RENIEC&NRO=" + NRO,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (data) {

            switch (data) {

                case "SIN_RESULTADOS":
                    alertCustom("No se Encontraron Resultados. Verique si ingresó correctamente el DNI")
                    $("#captchaModal").modal('hide');
                    $("#PerNoExiste").modal("show");

                    break;

                default:
                    $("#captchaModal").modal('hide');

                    MuestraFormulario(false, 'R');
                    DatosReniecCargados = JSON.parse(data);

            }
        }
    });
}

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

function MuestraSunat() {

    var NRO = ide;
    var formData = new FormData();

    formData.append("token", "a3c96a63-2073-4b0f-a9cf-d5788ac2466d-e903bbbc-bd05-4e2d-9371-2e53ba5eaf04");
    formData.append("ruc", NRO);

    var request = new XMLHttpRequest();

    request.open("POST", "https://api.migoperu.pe/api/v1/ruc");
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
                    //$('#lblModalTelefono').html("");
                    //$('#lblModalActividad').html("");
                    $('#lblModalNombreComercial').html(data.nombre_o_razon_social);
                    //$('#lblModalFechaIni').html("")
                    $('#txtCondSunat').html(data.condicion_de_domicilio);
                    $('#txtEstaSunat').html(data.estado_del_contribuyente);
                    DatosSunatCargados = data;

                    $('#SunatCaptcha').modal('hide');
                    $('#ModalSunat').modal('show');


                } else {
                    infoCustom2("El RUC: " + NRO + " se encuentra como " + data.condicion_de_domicilio + " por SUNAT.");
                    $("#divPersonaJuridica").slideUp();
                    $("#divBotones").slideUp();
                }
            } else {
                infoCustom2("El RUC: " + NRO + " se encuentra en " + data.estado_del_contribuyente + " por SUNAT.");
                $("#divPersonaJuridica").slideUp();
                $("#divBotones").slideUp();
            }
        }
    };
}
}

function CancelarSunat() {
    $('#ModalSunat').modal('hide');
}
var arrayActividad = [];
var vg_OptionsPersonaNatural = '';
var vg_OptionsPersonaJuridica = '';
var vg_OptionsTipoTelefono = '';
var vg_OptionsTipoEmail = '';
var ide;
var p = 0;
var us = $("#ctl00_txtus").val();
var vg_SelectTipoContribuyente = '';
var token_migo = '';//dporta


var NCMPENA = function () {

    var plugins = function () {
   
     
        $('#cboEstadoCivil').select2();
        $('#cboModalEstadoCivil').select2();
        $('#cboTipoDeContribuyenteNatural').select2();
        $("#txtrucnatural").inputmask({ "mask": "9", "repeat": 11, "greedy": false });



     //   $("#txtdninatural").attr("disabled", "");

        offObjectEvents('txtapepaterno');
        $("#txtapepaterno").focus(function () {
            $(this).inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
        });

        $("#txtapepaterno").focus();

        $("#txtapematerno").focus(function () {
            $("#txtapematerno").inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
        });

        $("#txtnombres").focus(function () {
            $("#txtnombres").inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
        });

        $('#txtfechanac').datepicker('setEndDate', '-18y');

        HandlerTipoDeContribuyente();

        offObjectEvents('txttelefono');
        $("#txttelefono").focus(function () {
            $('#txttelefono').inputmask({ "mask": "T", "repeat": 100, "greedy": false });
        });

        offObjectEvents('txtemail');
        $("#txtemail").focus(function () {
            $('#txtemail').inputmask({ "mask": "E", "repeat": 50, "greedy": false });
        });

        $('#txtInicioActividadNatural').datepicker();

        $('#txtInicioActividadNatural').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });

        $("#txtNombreComercialNatural").focus(function () {
            $("#txtNombreComercialNatural").inputmask({ "mask": "Z", "repeat": 150, "greedy": false });
        });

        offObjectEvents('txtActvidadEconomicaNatural')
        $("#txtActvidadEconomicaNatural").focus(function () {
            $("#txtActvidadEconomicaNatural").inputmask({ "mask": "!", "repeat": 250, "greedy": false });
        });

        $('#imgDNI').removeAttr('src');
        $('#imgDNI').attr('src', '../../recursos/img/150x200.gif');
        $('#fileDNI').parent().parent().children('span').remove();
        $('#fileDNI').val('');


        var valor = "";
        if (ide.length == 11 && parseInt(ide.substring(0, 1)) == 1 && tipo_doc != '0') { //DPORTA se le agregó el tipo de documento
            valor = ide.substring(2, 10);
          
            $("#cboTipoDeContribuyenteNatural").select2("val", "0001");
            $("#cboTipoDeContribuyenteNatural").change();
            $("#txtrucnatural").val(ide);


        } else {
            valor = ide;
        }
        $("#txtdninatural").val(valor);


    }

    var cargarParametrosSistema = function () {

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
    }

    var eventoControles = function () {
        $("#cbotidonatural").change(function(){
            $("#txtdninatural").val("");
            switch ($(this).val()) {
                case "1": //DNI

                    $("#txtdninatural").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
                    //  offObjectEvents('txtdocumento');
                    //   HandlerKeydownDocumento();

                    break;

                case "4": //CARNE EXTRANJ.
                    $("#txtdninatural").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
                    //  offObjectEvents('txtdocumento');
                    //    HandlerKeydownDocumento();
                    break;

                case "7": //PASAPORTE
                    $("#txtdninatural").inputmask({ "mask": "#", "repeat": 9, "greedy": false });
                    //  offObjectEvents('txtdocumento');
                    // HandlerKeydownDocumento();
                    break;

                case "11"://PARTIDA

                    $("#txtdninatural").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
                    //  offObjectEvents('txtdocumento');
                    //  HandlerKeydownDocumento();

                    break;
                case "0"://OTROS //DPORTA

                    $("#txtdninatural").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
                    //  offObjectEvents('txtdocumento');
                    //  HandlerKeydownDocumento();

                    break;

            }

        });

        $("#btnHabido").on("click", function () {
            if (vErrors(["cbotidonatural", "txtrucnatural"])) {
                if ($("#cbotidonatural").val() == "1" || $("#cbotidonatural").val() == "7" || $("#cbotidonatural").val() == "4") {
                    $("#modal-habido").modal("show");
                    MuestraSunat();
                } else {
                    infoCustom2("Debe seleccionar RUC como documento de identidad para consultar.")
                }
            }
        });

        $("#btnActualizarDS").on("click", function () {
            var pidm = $("#hfPPBIDEN_ID").val();
            var condSunat = $("#spanVerificando").text();
            var estadoSunat = $("#lblEstadoSunat").text();
            fnActualizarDatosContribuyente(pidm, condSunat, estadoSunat);
        });

    }

    var cargaInicial = function () {

        vg_OptionsTipoTelefono = '';
        vg_OptionsTipoEmail = '';
        vg_SelectTipoContribuyente = '';

        $('#hfPPBIDEN_ID').val('');
        $('#hfPPRTELE_NUM_SEQ').val('');
        $('#hfPPRCORR_NUM_SEQ').val('');
        $('#hfPPBIMAG_CODE').val('');
        $('#hfPPBIDEN_PIDM_REPRESENTANTE').val('');
        $('#hfPPBIDEN_PIDM_CONTACTO').val('');
        $('#hfJsonDirecciones').val('');
        $('#hfEstereotipoActivo').val('');
        $('#hfDireccionPersonaJuridica').val('');

        inputFile("fileDNI", "imgDNI", "../../recursos/img/150x200.gif",150,200);
        $("#fileDNI").show();
            

    }

    var cargaCombos = function () {
        fillCboTipoContribuyente('#cboTipoDeContribuyenteNatural', 'N');

        fillCboEstadoCivil('');
        fillCboTipoDocumentoNat(tipo_doc);
    }

    return {
        init: function () {
            eventoControles();
            cargaCombos();
            plugins();
            cargarParametrosSistema();
            cargaInicial();
          
            
        }
    };
}();

function fillCboTipoDocumentoNat(codigo_doc) {
    var selectTipoDocumento = $('#cbotidonatural');
    var optionsPersonaNatural = '';
    selectTipoDocumento
        .html(vg_OptionsPersona).select2();
       

    selectTipoDocumento.children("option")
            .filter(function (e, d) { if ($(d).attr("nemonico") == "RUC") { $(d).remove(); } else { $(d).html($(d).attr("nemonico")); } })


    selectTipoDocumento.select2("val", codigo_doc == "6" ? (parseInt(ide.substring(0, 2)) == 15?"4":"1") : codigo_doc).change();

    


}

function HandlerTipoDeContribuyente() {
    $('#cboTipoDeContribuyenteNatural').on('change', function () {

        if ($(this).val() != ''){ // es contribuyente
            $("#btnDatosSunatNat").css({ "display": "block" });
        }else{
            $("#btnDatosSunatNat").css({ "display": "none" });
        }

        if (vg_SelectTipoContribuyente == '' || vg_SelectTipoContribuyente != this.value) {

            var v_RucNatural = '';
            v_RucNatural = $.trim($('#txtrucnatural').val());

          //  offObjectEvents('txtrucnatural');
            $('#txtrucnatural').val(v_RucNatural);
            

            $('#txtrucnatural').attr('disabled', false);
            $('#txtrucnatural').attr('placeholder', 'RUC');

            $('#txtInicioActividadNatural').attr('disabled', false);
            $('#txtInicioActividadNatural').attr('placeholder', 'dd/mm/yyyy');

            if (this.value == $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoTipoContribuyenteSinNegocio').val()) {
                $('#txtNombreComercialNatural').attr('disabled', true);
                $('#txtNombreComercialNatural').removeAttr('placeholder');
                $('#txtNombreComercialNatural').val('');
            }
            else {
                $('#txtNombreComercialNatural').attr('disabled', false);
                $('#txtNombreComercialNatural').attr('placeholder', 'Nombre Comercial');
                $('#txtNombreComercialNatural').val('');
            }

            $('#chkAgenteRetencion').attr('disabled', false);
            $('#chkBuenContribuyente').attr('disabled', false);

            $('#txtActvidadEconomicaNatural').attr('disabled', false);
            $('#txtActvidadEconomicaNatural').attr('placeholder', 'Actividad Economica');

            vg_SelectTipoContribuyente = this.value;

            if ($(this).val() == '') {
                $('#txtrucnatural').val("").attr('disabled', true);
                $('#txtNombreComercialNatural').val("").attr('disabled', true);
                $('#chkAgenteRetencion').removeAttr('checked');
                $('#chkAgenteRetencion').parent().removeClass();
                $('#chkAgenteRetencion').attr('disabled', true);

                $('#chkBuenContribuyente').removeAttr('checked');
                $('#chkBuenContribuyente').parent().removeClass();
                $('#chkBuenContribuyente').attr('disabled', true);

                $('#txtInicioActividadNatural').val("").attr('disabled', true);
                $('#txtActvidadEconomicaNatural').val("").attr('disabled', true);

            }

        }

    });
}/**pnat*/

function GrabarPersona() {

        GrabarNatural(); //p=0;
  
}

function cargaDatosSunatN(v_Datos) {

    //DPORTA_RF
    //let fecha;
    //let mes;
    //let anio;
    //let dia;
    //let new_fecha;

    //fecha = v_Datos[0].FECHA_INICIO;

    //anio = fecha.split("-")[0];
    //mes = fecha.split("-")[1];
    //dia = fecha.split("-")[2];

    //new_fecha = dia + "/" + mes + "/" + anio;

    //$('#txtapepaterno').val(v_Datos[0].RAZON.split(" ")[0]);
    //$('#txtapematerno').val(v_Datos[0].RAZON.split(" ")[1]);
    //var aux = v_Datos[0].RAZON.split(" ");
    //aux[1] += "/";
    //$('#txtnombres').val($.trim(aux.join(" ").split("/")[1]));
 

    //var tipocont = "";
    //$("#cboTipoDeContribuyenteNatural").children().each(function (f, e) { if ($(e).html() == v_Datos[0].TIPO_CONTRIBUYENTE) { tipocont = $(e).val(); return 0; } })
    //$('#cboTipoDeContribuyenteNatural').select2('val', tipocont).change();

    //if ($("#txtNombreComercialNatural").attr("disabled") != "disabled") {
    //    $("#txtNombreComercialNatural").val(v_Datos[0].NOMBRE_COMERCIAL == '-' ? v_Datos[0].RAZON : v_Datos[0].NOMBRE_COMERCIAL);
    //}

    //$("#txtActvidadEconomicaNatural").val(v_Datos[0].ACTIVIDAD).keyup();
    //$("#txtActvidadEconomicaNatural").siblings("ul").children("li").click()

    //$('#txttelefono').val(v_Datos[0].TELEFONO);
    //$('#txtInicioActividadNatural').datepicker('setDate', new_fecha);

    //$('#txtCondSunat').val(v_Datos[0].CONDICION);
    //$('#txtEstaSunat').val(v_Datos[0].ESTADO);
    //$('#txtCondSunat').attr('disabled', true);
    //$('#txtEstaSunat').attr('disabled', true);

    $('#txtapepaterno').val(v_Datos.nombre_o_razon_social.split(" ")[0]);
    $('#txtapematerno').val(v_Datos.nombre_o_razon_social.split(" ")[1]);
    var aux = v_Datos.nombre_o_razon_social.split(" ");
    aux[1] += "/";
    $('#txtnombres').val($.trim(aux.join(" ").split("/")[1]));
    //$('#txtrazonsocial').attr('disabled', false);
    //$('#txtrazonsocial').val(v_Datos.nombre_o_razon_social);
    //$('#txtnombrecomercial').val(v_Datos.nombre_o_razon_social);
    //var tipocont = "";
    //$("#cboTipoContribuyenteJuridica").children().each(function (f, e) { if ($(e).html() == v_Datos[0].condicion_de_domicilio) { tipocont = $(e).val(); return 0; } })
    //$('#cboTipoContribuyenteJuridica').select2('val', tipocont);

    $("#txtActvidadEconomicaNatural").val("");
    //$("#txtactividad").siblings("ul").children("li").click()
    //$('#txttelefonoj').val(v_Datos[0].TELEFONO);
    $('#txtInicioActividadNatural').datepicker('setDate', "");
    $('#txtCondSunat').val(v_Datos.condicion_de_domicilio);
    $('#txtEstaSunat').val(v_Datos.estado_del_contribuyente);
    $('#txtCondSunat').attr('disabled', true);
    $('#txtEstaSunat').attr('disabled', true);

}

function cargaDatosSunat2(v_Datos, fecha) {//dporta


    $('#txtapepaterno').val(v_Datos.nombre_o_razon_social.split(" ")[0]);
    $('#txtapematerno').val(v_Datos.nombre_o_razon_social.split(" ")[1]);
    var aux = v_Datos.nombre_o_razon_social.split(" ");
    aux[1] += "/";
    $('#txtnombres').val($.trim(aux.join(" ").split("/")[1]));

    $("#txtActvidadEconomicaNatural").val("");
    //$("#txtactividad").siblings("ul").children("li").click()
    //$('#txttelefonoj').val(v_Datos[0].TELEFONO);
    $('#txtInicioActividadNatural').val(fecha);
    $('#txtCondSunat').val(v_Datos.condicion_de_domicilio);
    $('#txtEstaSunat').val(v_Datos.estado_del_contribuyente);
    $('#txtCondSunat').attr('disabled', true);
    $('#txtEstaSunat').attr('disabled', true);
}

function cargaDatosReniec(v_Datos) {
    //$('#txtapepaterno').val(v_Datos[0].APEPATERNO);
    //$('#txtapematerno').val(v_Datos[0].APEMATERNO);
    //$('#txtnombres').val(v_Datos[0].NOMBRES);

    $('#txtapepaterno').val(v_Datos.apellido_paterno);
    $('#txtapematerno').val(v_Datos.apellido_materno);
    $('#txtnombres').val(v_Datos.nombres);
    //DPORTA 27/09/2021
    if ($('#txtnombres').val() == '') {
        $('#txtapepaterno').val(v_Datos.nombre.split(" ")[0]);
        $('#txtapematerno').val(v_Datos.nombre.split(" ")[1]);
        if (v_Datos.nombre.split(" ")[3] == undefined) {
            $('#txtnombres').val(v_Datos.nombre.split(" ")[2]);
        } else if (v_Datos.nombre.split(" ")[4] == undefined) {
            $('#txtnombres').val(v_Datos.nombre.split(" ")[2] + ' ' + v_Datos.nombre.split(" ")[3]);
        } else {
            $('#txtnombres').val(v_Datos.nombre.split(" ")[2] + ' ' + v_Datos.nombre.split(" ")[3] + ' ' + v_Datos.nombre.split(" ")[4]);
        }
    }
}

function cargaDatosPersonaNatural(v_Datos) {

    Bloquear("natural");
    $("#btnHabido").show();
    $('#hfPPBIDEN_ID').val(v_Datos[0].ID);
    $('#hidPersona').text("ID:" + v_Datos[0].ID);
    $('#txtapepaterno').val(v_Datos[0].APELL_PATE);
    $('#txtapematerno').val(v_Datos[0].APELL_MATE);
    $('#txtnombres').val(v_Datos[0].NOMBRE);
    if (v_Datos[0].SEXO == 'M') {
        $('#rbmasculino').attr('checked', true);
        $('#rbmasculino').parent().addClass('checked');
        $('#rbmfemenino').removeAttr('checked');
        $('#rbmfemenino').parent().removeClass();
    }
    else {
        $('#rbmfemenino').attr('checked', true);
        $('#rbmfemenino').parent().addClass('checked');
        $('#rbmasculino').removeAttr('checked');
        $('#rbmasculino').parent().removeClass();
    }


    //SRL 11/02/2015
    $('#cbotidonatural').select2("val", v_Datos[0].DOID_CODE).change();
    $('#txtdninatural').val(v_Datos[0].NRO);
    console.log(v_Datos[0].DOID_CODE);
    console.log(v_Datos[0].NRO);


    fillCboTipoContribuyente('#cboTipoDeContribuyenteNatural', 'N');

    $('#cboTipoDeContribuyenteNatural').select2('val', v_Datos[0].TCON_CODE);
   
    if ($.trim(v_Datos[0].TCON_CODE) == "") {
        
        $('#txtrucnatural').val('');
        $('#txtrucnatural').attr('disabled', true);
        $('#txtrucnatural').attr('placeholder', '');

        $('#txtInicioActividadNatural').val('');
        $('#txtInicioActividadNatural').attr('disabled', true);
        $('#txtInicioActividadNatural').attr('placeholder', '');

        $('#txtNombreComercialNatural').val('');
        $('#txtNombreComercialNatural').attr('disabled', true);
        $('#txtNombreComercialNatural').attr('placeholder', '');

        $('#chkAgenteRetencion').removeAttr('checked');
        $('#chkAgenteRetencion').parent().removeClass();
        $('#chkAgenteRetencion').attr('disabled', true);
        
        $('#chkBuenContribuyente').removeAttr('checked');
        $('#chkBuenContribuyente').parent().removeClass();
        $('#chkBuenContribuyente').attr('disabled', true);

        $('#txtActvidadEconomicaNatural').val('');
        $('#txtActvidadEconomicaNatural').attr('disabled', true);
        $('#txtActvidadEconomicaNatural').attr('placeholder', '');
    }
    else {

        if ($.trim(v_Datos[0].TCON_CODE) == $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoTipoContribuyenteSinNegocio').val()) {         
            $('#txtNombreComercialNatural').attr('disabled', true);
            $('#txtNombreComercialNatural').removeAttr('placeholder');
            $('#txtNombreComercialNatural').val('');
        }
        else {

            $('#txtNombreComercialNatural').attr('disabled', false);
            $('#txtNombreComercialNatural').attr('placeholder', 'Nombre Comercial');
        }
    }

    $('#txtrucnatural').val(v_Datos[0].NRO_RUC);

    if ($('#txtrucnatural').val() != '') {
        $("#conEstHabido").css({ "display": "block" });        
    } else {
        $("#conEstHabido").css({ "display": "none" });        
    }
    //console.log($('#txtrucnatural').val());
    $('#txtInicioActividadNatural').val(v_Datos[0].INICIO_ACTIVIDAD);

    $('#txtCondSunat').val(v_Datos[0].PPBIDEN_CONDICION_SUNAT);
    $('#txtEstaSunat').val(v_Datos[0].PPBIDEN_ESTADO_SUNAT);
    $('#txtCondSunat').attr('disabled', true);
    $('#txtEstaSunat').attr('disabled', true);

    fillTxtActividad('#txtActvidadEconomicaNatural',  v_Datos[0].ACTIVIDAD);
   

    fillCboEstadoCivil(v_Datos[0].ESCI_CODE);

    if (v_Datos[0].AGENTE_RETEN_IND == 'S') {
        $('#chkAgenteRetencion').attr('checked', true);
        $('#chkAgenteRetencion').parent().addClass('checked');
    }
    else {
        $('#chkAgenteRetencion').removeAttr('checked');
        $('#chkAgenteRetencion').parent().removeClass();
    }

    if (v_Datos[0].BUEN_CONTRIB_IND == 'S') {
        $('#chkBuenContribuyente').attr('checked', true);
        $('#chkBuenContribuyente').parent().addClass('checked');
    }
    else {
        $('#chkBuenContribuyente').removeAttr('checked');
        $('#chkBuenContribuyente').parent().removeClass();
    }

    $('#txtfechanac').val(v_Datos[0].FECHA);
    $('#hfPPRTELE_NUM_SEQ').val(v_Datos[0].PPRTELE_NUM_SEQ);
    $('#hfPPRCORR_NUM_SEQ').val(v_Datos[0].PPRCORR_NUM_SEQ);
    //fillCboTipoTelefonoYCboTipoEmail(v_Datos[0].PPRTELE_TIDT_CODE, v_Datos[0].PPRCORR_TIDT_CODE);
    //fillCboOperador(v_Datos[0].OPERADOR);
    $('#txttelefono').val(v_Datos[0].NUMERO);
    $('#txtemail').val(v_Datos[0].CORREO);
    $('#hfPPBIMAG_CODE').val(v_Datos[0].PPBIMAG_CODE);
    $('#imgDNI').attr('src', v_Datos[0].PPBIMAG_NOMBRE);

    //09-02-2015-sroncal
    $("#grabarPersona").html("<i class='icon-pencil'></i> Modificar");
    $("#grabarPersona").attr("href", "javascript:ModificarNatural();");
    $("#grabarPersona").pulsate({
        color: "#0000FF",
        reach: 20,
        repeat: 3,
        glow: true
    });
    /***/

    if ((ide.length == 11 && parseInt(ide.substring(0, 1)) == 1 && tipo_doc != '0')||v_Datos[0].NRO_RUC!='') { //DPORTA
        valor = ide.substring(2, 10);

        $("#cboTipoDeContribuyenteNatural").select2("val", ($.trim(v_Datos[0].TCON_CODE) == "" ? "0001" : $.trim(v_Datos[0].TCON_CODE)));
        $("#cboTipoDeContribuyenteNatural").change();
        if (v_Datos[0].NRO_RUC == '') {
            $("#txtrucnatural").val(ide.length == 11 ? ide : v_Datos[0].NRO_RUC);
        }
    }

    $('#txtNombreComercialNatural').val(v_Datos[0].RAZO_COME);

    cargarEstereotipos();
    AD_Permissions();

    Desbloquear("natural");
}


function limpiarDatosPersonaNatural() {

    $('#txtapepaterno').val('');
    $('#txtapematerno').val('');
    $('#txtnombres').val('');
    fillTxtActividad('#txtActvidadEconomicaNatural', '');


    if (!(ide.length == 11 && parseInt(ide.substring(0, 2)) < 20)) {

        $('#txtrucnatural').val('');
        $('#txtrucnatural').attr('disabled', true);
        $('#txtrucnatural').attr('placeholder', '');

        $('#txtInicioActividadNatural').val('');
        $('#txtInicioActividadNatural').attr('disabled', true);
        $('#txtInicioActividadNatural').attr('placeholder', '');

        fillCboTipoContribuyente('#cboTipoDeContribuyenteNatural', 'N');

        $('#txtNombreComercialNatural').val('');
        $('#txtNombreComercialNatural').attr('disabled', true);
        $('#txtNombreComercialNatural').attr('placeholder', '');

        $('#chkAgenteRetencion').removeAttr('checked');
        $('#chkAgenteRetencion').parent().removeClass();
        $('#chkAgenteRetencion').attr('disabled', true);

        $('#chkBuenContribuyente').removeAttr('checked');
        $('#chkBuenContribuyente').parent().removeClass();
        $('#chkBuenContribuyente').attr('disabled', true);
        
    
        $('#txtActvidadEconomicaNatural').val('');
        $('#txtActvidadEconomicaNatural').attr('disabled', true);
        $('#txtActvidadEconomicaNatural').attr('placeholder', '');

    }
    $('#txtfechanac').val('');

    $('#txttelefono').val('');

    $('#txtemail').val('');



    fillCboEstadoCivil('');
    $('#cboEstadoCivil').select2('val', '');

    $('#rbmasculino').attr('checked', true);
    $('#rbmasculino').parent().addClass('checked');

    $('#rbmfemenino').removeAttr('checked');
    $('#rbmfemenino').parent().removeClass();

    $("#grabarPersona").html("<i class='icon-pencil'></i>&nbsp;Grabar");
    $("#grabarPersona").attr("href", "javascript:GrabarNatural();");

}



function fillTxtActividad(v_ID, v_value) {
    var obj = '';
    var selectActividad = $(v_ID);

    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=5",
        contenttype: "application/json;",
        datatype: "json",
      //  async: false,
        success: function (datos) {
            if (datos != null) {
                obj += '[';
                for (var i = 0; i < datos.length; i++) {
                    arrayActividad.push(datos[i].CODIGO_SUNAT + " \- " + datos[i].NOMBRE);
                    obj += '{';
                    obj += '"NOMBRE":"' + datos[i].NOMBRE + '"';
                    obj += '},';
                }
                obj += '{}';
                obj = obj.replace(',{}', '');
                obj += ']';

                selectActividad.typeahead({ source: arrayActividad });
                selectActividad.keyup(function () { $(this).siblings("ul").css("width", $(this).css("width")) });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectActividad.val(v_value);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}


function fillCboEstadoCivil(value) {
    var selectEstadoCivil = $('#cboEstadoCivil');

    if (localStorage.getItem("dataEstadoCivil") != undefined) {
         
        selectEstadoCivil.html(localStorage.getItem("dataEstadoCivil"));
        selectEstadoCivil.select2('val', value);
        //vdatos = localStorage.getItem("dataEstadoCivil'");
      
    } else {
        Bloquear($(selectEstadoCivil.siblings("div")[0]).attr("id"));
        var selectestado = '';
        var vdatos = null;
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmpers.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                selectEstadoCivil.empty();
                selectestado += '<option></option>';
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectestado += ('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    selectEstadoCivil.html(selectestado);
                    vdatos = datos;

                    CrearDatoPermanente("dataEstadoCivil", selectestado);
                }



            },
            error: function (msg) {
                alert(msg);
            }
        }).done(function () {
            if (vdatos != null && $.trim(value).length > 0) {
                selectEstadoCivil.select2('val', value);
            }
            Desbloquear($(selectEstadoCivil.siblings("div")[0]).attr("id"));
        });
    }
}



function fillCboTipoContribuyente(v_ID, v_TIPO) {
    var selectTipoContribuyente = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=9&TCON_TIPO=" + v_TIPO,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectTipoContribuyente.empty();

            selectTipoContribuyente.append('<option value="">NO ES CONTRIBUYENTE</option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectTipoContribuyente.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                }
            }
            selectTipoContribuyente.select2('val', '');
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function CancelarOperacion() {
 
    vg_OptionsTipoTelefono = '';
    vg_OptionsTipoEmail = '';
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

    $("#DatosPersona").attr("style", "display:none;");
   
   
    $("#cboTipoDocumento").removeAttr("disabled", "disabled");
    $("#txtdocumento").removeAttr("disabled", "disabled");
    $("#btnverificar").attr("class", "span8 btn green");

    $("#btnverificar").attr("onclick", "javascript:VerificarPersona();");
 
    $("#txtdocumento").focus();
    $("#estereotipos").attr("style", 'display: none;');

    var v_Documento = $('#txtdocumento').val();

    if ($('#cboTipoDocumento').val() == "1") {
        $("#txtdocumento").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
        //   offObjectEvents('txtdocumento');
        HandlerKeydownDocumento();
    }
    else if ($('#cboTipoDocumento').val() == "6") {
        $("#txtdocumento").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
        //   offObjectEvents('txtdocumento');
        HandlerKeydownDocumento();
    }
    else {
        $("#txtdocumento").inputmask({ "mask": "#", "repeat": 20, "greedy": false });
        //     offObjectEvents('txtdocumento');
        HandlerKeydownDocumento();
    }

    $('#txtdocumento').val(v_Documento);

    $(".verificar").show();

}




function GrabarNatural() {

    var Errors = true;

    //PPBIDEN
    var APELL_PATE = '';
    var APELL_MATE = ''; //NULL,
    var NOMBRE = ''; //NULL,
    var FECHA = ''; //NULL 
    var AGENTE_RETEN_IND = '';
    var ENTIDAD_IND = ''; //NOT NULL,
    var TINO_CODE = ''; //NULL,
    var USUA_ID = ''; //NOT NULL,
    var INICIO_ACTIVIDAD = '';
    var TIPO_CONTRIBUYENTE = '';
    var RAZO_COME = '';
    var ACTIVIDAD = '';

    //PPBPEBA
    var SEXO = ''; //NULL,
    var ESCI_CODE = ''; //NULL,

    //PPBDOID
    var DOID_CODE = ''; //NOT NULL
    var NRO = ''; //NOT NULL,
    var NRO_RUC = '';
    var ESTADO_IND = ''; //NOT NULL,

    //PPRTELE
    var PPRTELE_TIDT_CODE = ''; //NOT NULL,
    var OPERADOR = ''; //NULL,
    var NUMERO = ''; //NULL

    //PPRCORR
    var PPRCORR_TIDT_CODE = ''; //NOT NULL,
    var CORREO = ''; //NULL,

    //PPBIMAG
    var TIPO = ''; //NOT NULL COMMENT 'N=FOTO PERSONA NATUAL (FOTO PERSONAL), J=FOTO PERSONA JURIDICA (LOGO EMPRESA), A: ANVERSO CHOFER, R: REVERSO CHOFER .',
    var PPBIMAG = ''; //NOT NULL,

    //ESTADOS SUNAT
    var CONDI_SUNAT = '';
    var ESTADO_SUNAT = '';

    Errors = validarPersonaNatural();

    if (Errors) {
        APELL_PATE = $.trim($('#txtapepaterno').val());
        if (APELL_PATE.length == 0) {
            $('#txtapepaterno').val('');
        }
        APELL_MATE = $.trim($('#txtapematerno').val());
        NOMBRE = $.trim($('#txtnombres').val());
        FECHA = $.trim($('#txtfechanac').val());
        AGENTE_RETEN_IND = $("#chkAgenteRetencion").is(':checked') ? 'S' : 'N';
        ENTIDAD_IND = 'N';
        TINO_CODE = 'PNAT';
        USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
        INICIO_ACTIVIDAD = $('#txtInicioActividadNatural').val();
        TIPO_CONTRIBUYENTE = $('#cboTipoDeContribuyenteNatural').val();
        RAZO_COME = $('#txtNombreComercialNatural').val();
        ACTIVIDAD = $('#txtActvidadEconomicaNatural').val();

        SEXO = $("input:radio[name=sex]:checked").val();
        ESCI_CODE = $('#cboEstadoCivil').val();

        DOID_CODE = $('#cbotidonatural').val();
        NRO = $.trim($('#txtdninatural').val());
        if (NRO.length == 0) {
            $('#txtdninatural').val('');
        }
        NRO_RUC = $.trim($('#txtrucnatural').val());
        ESTADO_IND = 'A';

        PPRTELE_TIDT_CODE = '';
        OPERADOR = '';
        NUMERO = $.trim($('#txttelefono').val());

        PPRCORR_TIDT_CODE = '';
        CORREO = $.trim($('#txtemail').val());

        TIPO = 'N';
        PPBIMAG = $("#imgDNI").attr("src");

        CONDI_SUNAT = $.trim($('#txtCondSunat').val());
        ESTADO_SUNAT = $.trim($('#txtEstaSunat').val());

        var data = new FormData();
        data.append('OPCION', 'NPN');
        data.append('APELL_PATE', APELL_PATE);
        data.append('APELL_MATE', APELL_MATE);
        data.append('NOMBRE', NOMBRE);
        data.append('FECHA', FECHA);
        data.append('AGENTE_RETEN_IND', AGENTE_RETEN_IND);
        data.append('ENTIDAD_IND', ENTIDAD_IND);
        data.append('TINO_CODE', TINO_CODE);
        data.append('USUA_ID', USUA_ID);
        data.append('SEXO', SEXO);
        data.append('ESCI_CODE', ESCI_CODE);
        data.append('DOID_CODE', DOID_CODE);
        data.append('NRO', NRO);
        data.append('NRO_RUC', NRO_RUC);
        data.append('ESTADO_IND', ESTADO_IND);
        data.append('PPRTELE_TIDT_CODE', PPRTELE_TIDT_CODE);
        data.append('OPERADOR', OPERADOR);
        data.append('NUMERO', NUMERO);
        data.append('PPRCORR_TIDT_CODE', PPRCORR_TIDT_CODE);
        data.append('CORREO', CORREO);
        data.append('TIPO', TIPO);
        data.append('PPBIMAG', PPBIMAG);
        data.append('INICIO_ACTIVIDAD', INICIO_ACTIVIDAD);
        data.append('TIPO_CONTRIBUYENTE', TIPO_CONTRIBUYENTE);
        data.append('RAZO_COME', RAZO_COME);
        data.append('ACTIVIDAD', ACTIVIDAD);

        BUEN_CONTRIB_IND = $("#chkBuenContribuyente").is(':checked') ? 'S' : 'N';
        data.append('BUEN_CONTRIB_IND', BUEN_CONTRIB_IND);
        data.append('sCONDI_SUNAT', CONDI_SUNAT);
        data.append('sESTADO_SUNAT', ESTADO_SUNAT);  

        Bloquear("natural");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMPERS.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            Desbloquear("natural");
            if (res != null) {
                var datos = $.parseJSON(res);
                if (datos.length > 0) {
                    if (datos[0].SUCCESS == "OK") {
                        if (datos[0].p_MSG_RUC == "EXISTE") {
                            $('#PerRUCExiste').modal('show');
                        }
                        else {
                           
                            $('#hfPPBIDEN_PIDM').val(datos[0].p_PPBIDEN_PIDM);
                            $('#hfPPBIDEN_ID').val(datos[0].p_PPBIDEN_ID);
                            $('#hidPersona').text("ID:" + datos[0].p_PPBIDEN_ID);
                            $('#hfPPRTELE_NUM_SEQ').val(datos[0].p_PPRTELE_NUM_SEQ);
                            $('#hfPPRCORR_NUM_SEQ').val(datos[0].p_PPRCORR_NUM_SEQ);
                            $('#hfPPBIMAG_CODE').val(datos[0].p_PPBIMAG_CODE);
                            exito();

                            $("#btnHabido").show();
                            $("#grabarPersona").html("<i class='icon-pencil'></i> Modificar");
                            $("#grabarPersona").attr("href", "javascript:ModificarNatural();");

                            
                            if ($("#txtrucnatural").val() != "") {
                                NRORUC = $("#txtrucnatural").val();
                            }

                            cargarEstereotipos();
                        }
                    }
                }
            }
            else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("natural");
            alert("Error al grabar Natural.");
        })
        ;
    }

}

function ModificarNatural() {

    var Errors = true;

    //PPBIDEN
    var PIDM = 0;
    var APELL_PATE = ''; //NOT NULL
    var APELL_MATE = ''; //NULL,
    var NOMBRE = ''; //NULL,
    var FECHA = ''; //NULL 
    var AGENTE_RETEN_IND = '';
    var USUA_ID = ''; //NOT NULL,
    var INICIO_ACTIVIDAD = '';
    var TIPO_CONTRIBUYENTE = '';
    var RAZO_COME = '';
    var ACTIVIDAD = '';

    //PPBPEBA
    var SEXO = ''; //NULL,
    var ESCI_CODE = ''; //NULL,

    //PPBDOID
    var NRO = ''; //NOT NULL,
    var NRO_RUC = '';
    var DOID_CODE = ''; //NOT NULL

    //PPRTELE
    var PPRTELE_NUM_SEQ = 0;
    var PPRTELE_TIDT_CODE = ''; //NOT NULL,
    var OPERADOR = ''; //NULL,
    var NUMERO = ''; //NULL

    //PPRCORR
    var PPRCORR_NUM_SEQ = 0;
    var PPRCORR_TIDT_CODE = ''; //NOT NULL,
    var CORREO = ''; //NULL,

    //PPBIMAG
    var PPBIMAG_CODE = '';
    var PPBIMAG = ''; //NOT NULL,
    var PPBIMAG_URL = '';

    Errors = validarPersonaNatural();

    if (Errors) {

        PIDM = parseInt($('#hfPPBIDEN_PIDM').val());
        APELL_PATE = $.trim($('#txtapepaterno').val());
        if (APELL_PATE.length == 0) {
            $('#txtapepaterno').val('');
        }
        APELL_MATE = $.trim($('#txtapematerno').val());
        NOMBRE = $.trim($('#txtnombres').val());
        FECHA = $.trim($('#txtfechanac').val());
        AGENTE_RETEN_IND = $("#chkAgenteRetencion").is(':checked') ? 'S' : 'N';
        USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
        INICIO_ACTIVIDAD = $('#txtInicioActividadNatural').val();
        TIPO_CONTRIBUYENTE = $('#cboTipoDeContribuyenteNatural').val();
        RAZO_COME = $('#txtNombreComercialNatural').val();
        ACTIVIDAD = $('#txtActvidadEconomicaNatural').val();

        SEXO = $("input:radio[name=sex]:checked").val();
        ESCI_CODE = $('#cboEstadoCivil').val();

        DOID_CODE = $('#cbotidonatural').val();
        NRO = $.trim($('#txtdninatural').val());
        if (NRO.length == 0) {
            $('#txtdninatural').val('');
        }
        NRO_RUC = $.trim($('#txtrucnatural').val());

        PPRTELE_NUM_SEQ = $.trim($('#hfPPRTELE_NUM_SEQ').val()) == '' ? 1 : parseInt($.trim($('#hfPPRTELE_NUM_SEQ').val()));
        //PPRTELE_TIDT_CODE = $.trim($('#cboTipoTelefono').val());
        PPRTELE_TIDT_CODE = '';
        //OPERADOR = $('#cboOperador').val();
        OPERADOR = '';
        NUMERO = $.trim($('#txttelefono').val());

        PPRCORR_NUM_SEQ = $.trim($('#hfPPRCORR_NUM_SEQ').val()) == '' ? 1 : parseInt($('#hfPPRCORR_NUM_SEQ').val());
        //PPRCORR_TIDT_CODE = $.trim($('#cboTipoEmail').val());
        PPRCORR_TIDT_CODE = '';
        CORREO = $.trim($('#txtemail').val());

        PPBIMAG_CODE = $('#hfPPBIMAG_CODE').val();
        // PPBIMAG = $("#fileDNI")[0].files[0];
        PPBIMAG = $("#imgDNI").attr("src");

        if (typeof ($("#fileDNI")[0].files[0]) === "undefined") {
            PPBIMAG_URL = $('#imgDNI').attr('src');
        }
        else {
            PPBIMAG_URL = '';
        }

        var data = new FormData();
        data.append('OPCION', 'MPN');
        data.append('PIDM', PIDM);
        data.append('APELL_PATE', APELL_PATE);
        data.append('APELL_MATE', APELL_MATE);
        data.append('NOMBRE', NOMBRE);
        data.append('FECHA', FECHA);
        data.append('AGENTE_RETEN_IND', AGENTE_RETEN_IND);

        data.append('USUA_ID', USUA_ID);
        data.append('SEXO', SEXO);
        data.append('ESCI_CODE', ESCI_CODE);

        data.append('DOID_CODE', DOID_CODE);
        data.append('NRO', NRO);
        data.append('NRO_RUC', NRO_RUC);
        data.append('PPRTELE_NUM_SEQ', PPRTELE_NUM_SEQ);
        data.append('PPRTELE_TIDT_CODE', PPRTELE_TIDT_CODE);
        data.append('OPERADOR', OPERADOR);
        data.append('NUMERO', NUMERO);
        data.append('PPRCORR_NUM_SEQ', PPRCORR_NUM_SEQ);
        data.append('PPRCORR_TIDT_CODE', PPRCORR_TIDT_CODE);
        data.append('CORREO', CORREO);
        data.append('PPBIMAG_CODE', PPBIMAG_CODE);
        data.append('PPBIMAG', PPBIMAG);
        data.append('PPBIMAG_URL', PPBIMAG_URL);
        data.append('INICIO_ACTIVIDAD', INICIO_ACTIVIDAD);
        data.append('TIPO_CONTRIBUYENTE', TIPO_CONTRIBUYENTE);
        data.append('RAZO_COME', RAZO_COME);
        data.append('ACTIVIDAD', ACTIVIDAD);

        BUEN_CONTRIB_IND = $("#chkBuenContribuyente").is(':checked') ? 'S' : 'N';
        data.append('BUEN_CONTRIB_IND', BUEN_CONTRIB_IND);

        Bloquear("natural");

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMPERS.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            Desbloquear("natural");
            if (res != null) {
                var datos = $.parseJSON(res);
                if (datos.length > 0) {
                    if (datos[0].SUCCESS == "OK") {
                        if (datos[0].p_MSG_RUC == "EXISTE") {
                            $('#PerRUCExiste').modal('show');
                        }
                        else {
                            exito();
                        }
                    }
                }
            }
            else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("natural");
            alert("Error al modificar Persona Natural.");
        });
    }

}

function validarPersonaNatural() {
    var Errors = true;

    if (vErrorsNotMessage(["txtapepaterno", "txtdninatural"]) == false) {
        Errors = false;
    }

    var email = $.trim($('#txtemail').val());
    if (email.length > 0) {
        if (validarEmail($.trim($('#txtemail').val())) == false) {
            $('#txtemail').val('');
            if (vErrorsNotMessage("txtemail") == false) {
                $('#txtemail').val(email);
                Errors = false;
            }
        }
    }

    var v_RucNatural = '';
    v_RucNatural = $.trim($('#txtrucnatural').val());

    if ($('#cboTipoDeContribuyenteNatural').val() != "") {
        if ($.trim($('#txtrucnatural').val()).length > 0) {
            if ($.trim($('#txtrucnatural').val()).length < 11) {
                $('#txtrucnatural').val('');
                if (vErrorsNotMessage(["txtrucnatural"]) == false) {
                    Errors = false;
                    $('#txtrucnatural').val(v_RucNatural);
                }
            }
            else {
                offObjectEvents('txtrucnatural');
                $('#txtrucnatural').val(v_RucNatural);
            }
        }
        else {
            if (vErrorsNotMessage(["txtrucnatural"]) == false) {
                Errors = false;
            }
        }
    }
    else {
        offObjectEvents('txtrucnatural');
    }

    var v_Actividad = $.trim($('#txtActvidadEconomicaNatural').val());

    if (v_Actividad.length > 0) {

        var jsonActividades = arrayActividad;
        var existeActividad = false;

        for (var i = 0; i < jsonActividades.length; i++) {
            if (v_Actividad == jsonActividades[i]) {
                existeActividad = true;
                break;
            }
        }

        if (!existeActividad) {
            $('#txtActvidadEconomicaNatural').val('');
            if (vErrorsNotMessage(["txtActvidadEconomicaNatural"]) == false) {
                Errors = false;
                $('#txtActvidadEconomicaNatural').val(v_Actividad);
            }
        }
    }
    else {
        offObjectEvents('txtActvidadEconomicaNatural');
        $('#txtActvidadEconomicaNatural').typeahead({ source: arrayActividad });
        $('#txtActvidadEconomicaNatural').keyup(function () { $(this).siblings("ul").css("width", $(this).css("width")) });
    }


    if (!Errors) {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
    }

    return Errors;
}


//FOTO-------------------------------------------------------------

function TomaFoto() {
    $('#ModalFoto').modal('show');
}

function OcultarFoto() {
    $('#ModalFoto').modal('hide');
}




window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
    navigator.msGetUserMedia != function () {
        alert('su navegador no soporta navigator.getUserMedia().');
    };

window.datosVideo = {
    'StreamVideo': null, 'url': null
}

// jQuery('#botoniniciar').on('click', function (e) {
$('#ModalFoto').on('show', function () {

    navigator.getUserMedia({
        'audio': false,
        'video': true
    }
, function (streamVideo) {
    datosVideo.StreamVideo = streamVideo;
    datosVideo.url = window.URL.createObjectURL(streamVideo);
    jQuery('#camara').attr('src', datosVideo.url);

}, function () {
    alert('No fue posible obtener acceso a la camara.');
    //    $("#ModalFoto").modal('hide');
});
});

//   jQuery('#botondetener').on('click', function (e) {
$('#ModalFoto').on('hide', function () {

    if (datosVideo.StreamVideo) {
        datosVideo.StreamVideo.stop();
        window.URL.revokeObjectURL(datosVideo.url);
    }
});

jQuery('#botonfoto').on('click', function (e) {
    var oCamara, oFoto, oContexto, w, h;

    oCamara = jQuery('#camara');
    oFoto = jQuery('#foto');
    w = oCamara.width();
    h = oCamara.height();
    oFoto.attr({
        'width': w,
        'height': h
    });

    oContexto = oFoto[0].getContext('2d');
 

    oContexto.drawImage(oCamara[0], 140, 0, 400, 480, 0, 0, w, h);
 
   
});

function rptano() {


    $("#ModalFoto").modal('hide');

    $("#txtmarca").val("");
}

function rptasi() {
    var url = document.getElementById('foto').toDataURL('image/jpeg');

    resizeBase64Img(url.split("base64,")[1], 150, 200).then(function (newImg) {   $('#imgDNI').attr("src", newImg.attr("src")); });
 

    $("#ModalFoto").modal('hide');

}

//FIN FOTO ----------------------------------------------------

function ObtenertSunatNatural() {

    var NRO = NRORUC == "" ? $("#txtrucnatural").val() : NRORUC;

    if (NRO != "") {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmpers.ashx?OPCION=SUNAT&NRO=" + NRO,
            beforeSend: function () { Bloquear($("#natural"), "Obteniendo datos desde Sunat "); },
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (data) {
                if (data == "NO_EXISTE") {
                    infoCustom2("No se encontraron datos!");
                } else {
                    var v_Datos = $.parseJSON(data)
                    if (v_Datos != null) {
                        if ($("#txtNombreComercialNatural").attr("disabled")===false) { $('#txtNombreComercialNatural').val(v_Datos[0].NOMBRE_COMERCIAL == '-' ? v_Datos[0].RAZON : v_Datos[0].NOMBRE_COMERCIAL); }
                        $("#txtActvidadEconomicaNatural").val(v_Datos[0].ACTIVIDAD.substring(0, 6)).keyup();
                        $("#txtActvidadEconomicaNatural").siblings("ul").children("li").click()
                        $('#txttelefono').val(v_Datos[0].TELEFONO);
                        $('#txtInicioActividadNatural').datepicker('setDate', v_Datos[0].FECHA_INICIO);
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            },
            complete: function () { Desbloquear($("#natural")); }
        });
    } else {
        infoCustom2("No se encontró ruc del cual consultar.");
        $("#txtrucnatural").pulsate({
            color: "#33AECD",
            reach: 20,
            repeat: 3,
            glow: true
        });       

    }
}

//DATOS SUNAT PARA INDICADOR HABIDO_IND //cliente
var DatosSunatCargados;
//var ajaxSunat = null;

//function MuestraSunat() {

//    $("#no_existe").css("display", "none").html();
//    var NRO = $("#txtrucnatural").val();
//    Bloquear("divConsultaHabido");
//    if (ajaxSunat) {
//        ajaxSunat.abort();
//    }
//    ajaxSunat = $.ajax({
//        type: "post",
//        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=SUNAT&NRO=" + NRO,
//        contenttype: "application/json;",
//        datatype: "json",
//        async: true,
//        success: function (data) {

//            if (data == "NO_EXISTE" || data == "error") {
//                //$("#no_existe").css("display", "block").html('<p>El número de <B>RUC ' + NRO + '</B> consultado no es válido. Se marcará como HABIDO</p>');
//                $("#no_existe").css("display", "block").html('<p>El número de <B>RUC ' + NRO + '</B> consultado no es válido.</p>');
//                $("#spanVerificando").html("-");
//                HABIDO_IND = "1";
//            } else {
//                var datos = $.parseJSON(data)

//                if (datos[0].FECHA_BAJA != "0000-00-00") {

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

//                    $("#no_existe").css("display", "block").html('<p>El <b>RUC ' + NRO + '</b> perteneciente a <B>' + datos[0].RAZON + '</B> se encuentra en <B>' + datos[0].ESTADO + '</B> desde <B>' + fecha_baja + '</B> por SUNAT.</p>');;
//                    if (datos[0].CONDICION == "HABIDO") {
//                        HABIDO_IND = "1";
//                    } else {
//                        HABIDO_IND = "0";
//                    }
//                }
//                else {

//                    if (datos != null) {
//                        if (datos[0].CONDICION == "HABIDO") {
//                            HABIDO_IND = "1";
//                        } else {
//                            HABIDO_IND = "0";
//                        }
//                        DatosSunatCargados = datos[0];
//                    } else {
//                        $("#spanVerificando").html("-");
//                        $("#no_existe").css("display", "block").html('<p>No se encontraron datos. Se marcará como HABIDO</p>');;
//                        HABIDO_IND = "1";
//                    }
//                }
//            }

//            $("#lblEstadoSunat").html(datos[0].ESTADO);
//            $("#spanVerificando").html(datos[0].CONDICION);


//        },
//        error: function (msg) {
//            Desbloquear("divConsultaHabido");
//            if (msg.statusText != "abort") {
//                alertCustom("Consulta no se realizó correctamente");
//            }

//        }, complete: function () {
//            Desbloquear("divConsultaHabido");
//        }
//    });

//}

function MuestraSunat() {

    $("#no_existe").css("display", "none").html();
    var NRO = $("#txtrucnatural").val();
    Bloquear("divConsultaHabido");

    var formData = new FormData();

    formData.append("token", token_migo);
    formData.append("ruc", NRO);

    var request = new XMLHttpRequest();

    request.open("POST", "https://api.migo.pe/api/v1/ruc");
    request.setRequestHeader("Accept", "application/json");

    request.send(formData);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (data.success == true) {
            //if (data.estado_del_contribuyente == "ACTIVO") {
            if (data.condicion_de_domicilio == "HABIDO") {
                HABIDO_IND = "1";
            } else {
                HABIDO_IND = "0";
            }
            DatosSunatCargados = data;
            //} else {
            //    infoCustom2("El RUC: " + NRO + " se encuentra en " + data.estado_del_contribuyente + " por SUNAT.");
            //}
            debugger;
            Desbloquear("divConsultaHabido");
            $("#lblEstadoSunat").html(data.estado_del_contribuyente);
            $("#spanVerificando").html(data.condicion_de_domicilio);
        }
    };
}

var fnActualizarDatosContribuyente = function (pidm, cond_sunat, estado_sunat) {

    Bloquear("modal-habido");
    var data = new FormData();
    data.append('PIDM', pidm);
    data.append('sCONDI_SUNAT', cond_sunat);
    data.append('sESTADO_SUNAT', estado_sunat);

    $.ajax({
        type: "POST",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=22",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            if (datos != null) {
                if (datos == "OK") {
                    $("#txtCondSunat").val(cond_sunat);
                    $("#txtEstaSunat").val(estado_sunat);
                    exito();
                    $('#modal-habido').modal('hide');
                } else {
                    noexito();
                }

            } else {
                noexito();
            }
            Desbloquear("modal-habido");
        },
        error: function () {
            noexito();
            Desbloquear("modal-habido");
        }

    });
};
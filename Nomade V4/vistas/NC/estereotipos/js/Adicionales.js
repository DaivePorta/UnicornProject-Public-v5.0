var token_migo = '';//dporta
//var city = '';//dporta
function deshabilitacombos(iddiv, id) {
    var auxiliar = new Array();

    if (!(Object.prototype.toString.call(id) == "[object Array]")) {

        auxiliar[0] = id;

    } else { auxiliar = id; }

    for (var i = 0; i < auxiliar.length; i++) {
        $("#" + iddiv + " #" + auxiliar[i]).attr("disabled", "disabled");
        $("#" + iddiv + " #" + auxiliar[i]).select2("val", "");
        $("#" + iddiv + " #s2id_" + auxiliar[i] + " a .select2-chosen").html('');
    }

}


var fnCargarUbigeo = function (obj, opcion, valor, callback) {
    var sParametro = "&";
    switch (opcion) {
        case "18":
            sParametro = "";
            break;
        case "19":
            sParametro += "p_Code_Pais=" + valor;
            break;
        case "20":
            sParametro += "p_Code_Depa=" + valor;
            break;
        case "21":
            sParametro += "p_Code_Prov=" + valor;
            break;
    }
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/namcfal.ashx?opcion=" + opcion + sParametro,
        contenttype: "application/json;",
        datatype: "json",
        beforeSend: function () { Bloquear($(obj.parents("div")[0])); },
        async: false,
        cache: true,
        success: function (datos) {
            if (datos != null) {
                obj.empty();
                obj.append('<option value=""></option>');
                for (var i = 0; i < datos.length; i++) {
                    switch (opcion) {
                        case "18":
                            obj.append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                            break;
                        case "19":
                            obj.append('<option value="' + datos[i].UBIG_DEPARTAMENTO + '">' + datos[i].DEPARTAMENTO + '</option>');
                            break;
                        case "20":
                            obj.append('<option value="' + datos[i].UBIG_PROVINCIA + '">' + datos[i].PROVINCIA + '</option>');
                            break;
                        case "21":
                            obj.append('<option value="' + datos[i].UBIG_DISTRITO + '"codigoub="' + datos[i].CODE_UBIGEO + '">' + datos[i].DISTRITO + '</option>');
                            break;
                    }

                }
                obj.select2('val', '');
                obj.attr("disabled", false);
            }
        },
        complete: function () {
            obj.removeAttr("disabled").select2("val", "");
            Desbloquear($(obj.parents("div")[0]));

            if (callback !== undefined) callback();


        }
    });

}

function cargaini2(iddiv) {

    $("#" + iddiv + " #slcpais").empty();
    var obj_pais = $("#" + iddiv + " #slcpais");  
    var obj_ubigeo = $("#" + iddiv + " #txtubigeo");
    var obj_depa = $("#" + iddiv + " #slcdepa");
    var obj_prov = $("#" + iddiv + " #slcprov");
    var obj_dist = $("#" + iddiv + " #slcdist");


    fnCargarUbigeo(obj_pais, "18")
    // eventos ubigeo

    obj_pais.on('change', function (event, depa, prov, dist) {

        obj_prov.select2("val", "").attr("disabled", true);
        obj_dist.select2("val", "").attr("disabled", true);
        obj_ubigeo.val("");

        var f1 = !isEmpty(depa) ? function () { obj_depa.val(depa).trigger('change', [prov, dist]); } : function () { };

        fnCargarUbigeo(obj_depa, "19", this.value, f1);

    });

    obj_depa.on('change', function (event, prov, dist) {

        obj_dist.select2("val", "").attr("disabled", true);
        obj_ubigeo.val("");

        var f2 = !isEmpty(prov) ? function () { obj_prov.val(prov).trigger('change', [dist]); } : function () { };

        fnCargarUbigeo(obj_prov, '20', this.value, f2);

    });

    obj_prov.on('change', function (event, dist) {
        obj_ubigeo.val("");

        var f3 = !isEmpty(dist) ? function () { obj_dist.val(dist).change(); } : function () { };

        fnCargarUbigeo(obj_dist, '21', this.value, f3);

    });

    obj_dist.on('change', function () {

        obj_ubigeo.val(this.value);

    });

}

var ADICIONALES = function () {

    var initDireccion = function () {

        jsInitDireccion("direccion");

    }

    var initDatosBanco = function () {

        jsInitDatosBanco("datosbanco");

    }

    //var plugins = function () {
    //    $("#txtdir").focus(function () {
    //        $('#txtdir').inputmask({ "mask": "W", "repeat": 450, "greedy": false });
    //    });
    //}

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

    var cargaInicial = function () {

        var PPBIDEN_PIDM = $('#hfPPBIDEN_PIDM').val();

        jsInputMaskControlsDireccion("direccion");

        jsInputMaskControlsDatosBanco("datosbanco");

        jsInputMaskControlsTelefonos("telefonos");

        jsInputMaskControlsEmails("emails");

        $('#slcpais').val('0001').change();

        obtenerAdicionales(PPBIDEN_PIDM);

    }

    return {
        init: function () {
            initDireccion();
            initDatosBanco();
            cargarParametrosSistema();
            cargaInicial();
            //plugins();
        }
    };
}();

//function cargarParametrosSistema() {

//    //TOKEN PARA PODER HACER LAS CONSULTAS DE LOS N° DE DOCS. A SUNAT
//    $.ajax({
//        type: "post",
//        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=MIGO",
//        contenttype: "application/json;",
//        datatype: "json",
//        async: true,
//        success: function (datos) {
//            if (datos != null) {
//                token_migo = datos[0].DESCRIPCION_DETALLADA;
//            } else {
//                alertCustom("No se recuperó correctamente el parámetro MIGO!");
//            }
//        },
//        error: function (msg) {
//            alertCustom("No se recuperó correctamente el parámetro MIGO!");
//        }
//    });
//}

function jsInitDireccion(v_iddiv) {

    $("#" + v_iddiv + " #slcdepa").select2();
    $("#" + v_iddiv + " #slcprov").select2();
    $("#" + v_iddiv + " #slcdist").select2();
    $("#" + v_iddiv + " #slcmznr").select2();
    $("#" + v_iddiv + " #slcaten").select2();
    $("#" + v_iddiv + " #slcpais").select2();

    $("#" + v_iddiv + " #slcmznr").html("<option value=\"NRO\">NRO</option><option value=\"MZ\">MZ</option><option value=\"KM\">KM</option><option value=\"CD\">CD</option><option value=\"MOD\">MOD</option>");
    $("#" + v_iddiv + " #slcmznr").select2('val', 'NRO');

    fillCboTipoDeVias(v_iddiv, "");

    fillCboTipoZona(v_iddiv, "");

    fillCboSucursalAtencion(v_iddiv, "");

    cargaini2(v_iddiv);

    $("#" + v_iddiv + " #s2id_slcdepa a .select2-chosen").html('');
    $("#" + v_iddiv + " #s2id_slcprov a .select2-chosen").html('');
    $("#" + v_iddiv + " #s2id_slcdist a .select2-chosen").html('');


}

function jsInitDatosBanco(v_iddiv) {

    $("#" + v_iddiv + " #slcbanc").select2();
    $("#" + v_iddiv + " #slcticu").select2();
    $("#" + v_iddiv + " #slcmone").select2();

    fillCboBanco(v_iddiv, "");

    fillCboTipoCuenta(v_iddiv, "");

    fillCboMoneda(v_iddiv, "");

    $("#" + v_iddiv + " #slcticu").on('change', function () {
        var mone_code = $('#' + v_iddiv + ' #slcticu [value="' + $('#' + v_iddiv + ' #slcticu').val() + '"]').attr('mone_cod');
        $("#" + v_iddiv + " #slcmone").select2('val', mone_code).change();
    });

}

function jsInputMaskControlsDireccion(v_iddiv) {
    $("#" + v_iddiv + " #txtnombrevia").inputmask({ "mask": "!", "repeat": 500, "greedy": false });
    $("#" + v_iddiv + " #txtnumerovia").inputmask({ "mask": "U", "repeat": 10, "greedy": false });
    $("#" + v_iddiv + " #txtinteriorvia").inputmask({ "mask": "!", "repeat": 10, "greedy": false });
    $("#" + v_iddiv + " #txtnombrezona").inputmask({ "mask": "!", "repeat": 500, "greedy": false });
    $("#" + v_iddiv + " #txtdir").inputmask({ "mask": "R", "repeat": 1000, "greedy": false });
    $("#" + v_iddiv + " #txtref").inputmask({ "mask": "R", "repeat": 1000, "greedy": false });
    $("#" + v_iddiv + " #txtLatitud, #" + v_iddiv + " #txtLongitud").keypress(function (e) { return (ValidaDecimales(e, this, 8, true)); });
}

function jsInputMaskControlsDatosBanco(v_iddiv) {
    $("#" + v_iddiv + " #txtNumeroCuenta").inputmask({ "mask": "C", "repeat": 23, "greedy": false });
    $("#" + v_iddiv + " #txtCuentaInterbancaria").inputmask({ "mask": "C", "repeat": 23, "greedy": false });

}

function jsInputMaskControlsTelefonos(v_iddiv) {
    $("#" + v_iddiv + " #txtTelefonoA").inputmask({ "mask": "T", "repeat": 20, "greedy": false });
}

function jsInputMaskControlsEmails(v_iddiv) {
    $("#" + v_iddiv + " #txtEmailA").inputmask({ "mask": "E", "repeat": 50, "greedy": false });
}

function jsEventsControlsDireccion(v_iddiv) {

    $('#' + v_iddiv + ' #slcvia').on('change', function () {
        // generarDireccion(v_iddiv);
    });

    $('#' + v_iddiv + ' #txtnombrevia').on('blur', function () {
        //generarDireccion(v_iddiv);
    });

    $("#" + v_iddiv + " #slcmznr").change(function () {
        if ($("#" + v_iddiv + " #slcmznr").val() == "MZ") {
            $("#" + v_iddiv + " #txtnumerovia").parent().siblings("label").html("Manzana");
            $("#" + v_iddiv + " #txtnumerovia").attr("placeholder", "Manzana");
            $("#" + v_iddiv + " #txtinteriorvia").parent().siblings("label").html("Lote");
            $("#" + v_iddiv + " #txtinteriorvia").attr("placeholder", "Lote");
            //  generarDireccion(v_iddiv);
        } else if ($("#" + v_iddiv + " #slcmznr").val() == "NRO") {
            $("#" + v_iddiv + " #txtnumerovia").parent().siblings("label").html("Número");
            $("#" + v_iddiv + " #txtnumerovia").attr("placeholder", "Número");
            $("#" + v_iddiv + " #txtinteriorvia").parent().siblings("label").html("Interior");
            $("#" + v_iddiv + " #txtinteriorvia").attr("placeholder", "Interior");
            //generarDireccion(v_iddiv);
        } else {
            $("#" + v_iddiv + " #txtnumerovia").parent().siblings("label").html("Número");
            $("#" + v_iddiv + " #txtnumerovia").attr("placeholder", "Número");
            $("#" + v_iddiv + " #txtinteriorvia").parent().siblings("label").html("Interior");
            $("#" + v_iddiv + " #txtinteriorvia").attr("placeholder", "Interior");
        }
    });

    $('#' + v_iddiv + ' #txtnumerovia').on('blur', function () {
        //generarDireccion(v_iddiv);
    });

    $('#' + v_iddiv + ' #txtinteriorvia').on('blur', function () {
        //generarDireccion(v_iddiv);
    });

    $('#' + v_iddiv + ' #slczona').on('change', function () {
        //generarDireccion(v_iddiv);
    });

    $('#' + v_iddiv + ' #txtnombrezona').on('blur', function () {
        //generarDireccion(v_iddiv);
    });

}

function generarDireccion(v_iddiv) {

    var DIRECCIONCOMPLETA = '';
    var TIPOVIA = '';
    var NOMBREVIA = '';
    var TIPO = '';
    var NROVIA = '';
    var TIPONRO = '';
    var INTERIOR = '';
    var TIPOZONA = '';
    var NOMBREZONA = '';
    var PAIS = '';
    var DEPARTAMENTO = '';
    var PROVINCIA = '';
    var DISTRITO = '';

    var INDEX = v_iddiv.split('_')[1];

    if (typeof (INDEX) === 'undefined') { INDEX = 0; }
    else { INDEX = parseInt(INDEX); }

    var ArrayJson;
    var JsonDireccion = $('#hfJsonDirecciones').val();

    if (JsonDireccion.length == 0) {
        ArrayJson = [];
    }
    else {
        ArrayJson = JSON.parse(JsonDireccion);
    }

    for (var i = 0; i < ArrayJson.length; i++) {
        if (INDEX == ArrayJson[i].INDEX) {
            DIRECCIONCOMPLETA = $.trim(ArrayJson[i].DIRECCION);
            break;
        }
    }


    // if (DIRECCIONCOMPLETA.length == 0) {

    TIPOVIA = obtenerDescripcionCortaVia($('#' + v_iddiv + ' #slcvia').val());

    NOMBREVIA = $.trim($('#' + v_iddiv + ' #txtnombrevia').val());

    NROVIA = $.trim($('#' + v_iddiv + ' #txtnumerovia').val());

    if (NROVIA != '') {
        TIPO = $.trim($('#' + v_iddiv + ' #slcmznr').val());
    }
    else {
        TIPO = '';
    }

    INTERIOR = $.trim($('#' + v_iddiv + ' #txtinteriorvia').val());

    if (INTERIOR != '') {
        if ($.trim($('#' + v_iddiv + ' #slcmznr').val()) == 'NRO') {
            TIPONRO = 'INT';
        }
        if ($.trim($('#' + v_iddiv + ' #slcmznr').val()) == 'MZ') {
            TIPONRO = 'LT';
        }
    }
    else {
        TIPONRO = '';
    }

    TIPOZONA = obtenerDescripcionCortaZona($('#' + v_iddiv + ' #slczona').val());

    NOMBREZONA = $.trim($('#' + v_iddiv + ' #txtnombrezona').val());

    if ($.trim($('#' + v_iddiv + ' #txtubigeo').val()) != '') {
        //PAIS = $.trim($('#' + v_iddiv + ' #slcpais option:selected').html());
        DEPARTAMENTO = $.trim($('#' + v_iddiv + ' #slcdepa option:selected').html());
        PROVINCIA = $.trim($('#' + v_iddiv + ' #slcprov option:selected').html());
        DISTRITO = $.trim($('#' + v_iddiv + ' #slcdist option:selected').html());
    }

    DIRECCIONCOMPLETA = (TIPOVIA != '' ? TIPOVIA + ' ' : '') +
        (NOMBREVIA != '' ? NOMBREVIA + ' ' : '') +
        (TIPO != '' ? TIPO + '. ' : '') +
        (NROVIA != '' ? NROVIA + ' ' : '') +
        (TIPONRO != '' ? TIPONRO + ' ' : '') +
        (INTERIOR != '' ? INTERIOR + ' ' : '') +
        (TIPOZONA != '' ? TIPOZONA + ' ' : '') +
        (NOMBREZONA != '' ? NOMBREZONA + ' ' : '') +
        (DEPARTAMENTO != '' ? (DEPARTAMENTO + ' - ') : '') +
        (PROVINCIA != '' ? (PROVINCIA + ' - ') : '') +
        (DISTRITO != '' ? DISTRITO : '');
   

    //(PAIS != '' ? PAIS : '');

    $('#' + v_iddiv + ' #txtdir').val($.trim(DIRECCIONCOMPLETA));

    // }

}

function obtenerDescripcionCortaVia(v_Value) {
    var ArrayJson;
    var JsonVias = $('#hfJsonVias').val();
    var DescripcionCorta = '';
    if (JsonVias.length == 0) {
        ArrayJson = [];
    }
    else {
        ArrayJson = JSON.parse(JsonVias);
    }
    for (var i = 0; i < ArrayJson.length; i++) {
        if (v_Value == ArrayJson[i].CODIGO) {
            DescripcionCorta = $.trim(ArrayJson[i].DESCRIPCION_CORTO);
            break;
        }
    }
    return DescripcionCorta;
}

function obtenerDescripcionCortaZona(v_Value) {
    var ArrayJson;
    var JsonZona = $('#hfJsonZona').val();
    var DescripcionCorta = '';
    if (JsonZona.length == 0) {
        ArrayJson = [];
    }
    else {
        ArrayJson = JSON.parse(JsonZona);
    }
    for (var i = 0; i < ArrayJson.length; i++) {
        if (v_Value == ArrayJson[i].CODIGO) {
            DescripcionCorta = $.trim(ArrayJson[i].DESCRIPCION_CORTO);
            break;
        }
    }
    return DescripcionCorta;
}

function obtenerAdicionales(v_PPBIDEN_PIDM) {
    //Bloquear("adicionales");
    var b = false;
    var datos = null;
    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Adicionales.ashx?flag=12&PPBIDEN_PIDM=" + v_PPBIDEN_PIDM,
        contenttype: "application/json;",
        datatype: "json",
        //  async: false,
        success: function (datos) {
            //Desbloquear("adicionales");

            if (datos != null) {
                if (datos[0].DIRECCIONES != "") {
                    generarDirecciones(datos[0].DIRECCIONES);
                }
                else {
                    var v_Direccion = $.trim($('#hfDireccionPersonaJuridica').val());
                    if (v_Direccion != "") {
                        addObjectJsonDirecciones(v_Direccion, 0, 0);
                        $('#direccion #txtdir').val(v_Direccion);
                    }
                    else {
                        addObjectJsonDirecciones("", 0, 0);
                    }
                }
                if (datos[0].DATOSBANCO != "") {
                    generarDatosBanco(datos[0].DATOSBANCO);
                }
                else {
                    addObjectJsonDatosBanco(0, "0");
                }
                if (datos[0].TELEFONOS != "") {
                    generarTelefonos(datos[0].TELEFONOS);
                }
                else {
                    addObjectJsonTelefonos(0, 0);
                }
                if (datos[0].EMAILS != "") {
                    generarEmails(datos[0].EMAILS);
                }
                else {
                    addObjectJsonEmails(0, 0);
                }

            }
        },
        error: function (msg) {
            //Desbloquear("adicionales");
            alert(msg);
        }
    });

}

function generarDirecciones(v_DIRECCIONES) {

    var Array = [];

    Array = v_DIRECCIONES;

    addObjectJsonDirecciones(v_DIRECCIONES[0].PPRDIRE_DIRECCION, 0, parseInt(v_DIRECCIONES[0].PPRDIRE_NUM_SEQ));

    cargarDatosDirecciones("direccion", v_DIRECCIONES[0]);

    if (Array.length > 1) {
        for (var i = 1; i < Array.length; i++) {
            crearclones("direccion", "../../vistas/NC/estereotipos/Adicionales.html", "Direccion Secundaria", "DIRECCION");
            addObjectJsonDirecciones(v_DIRECCIONES[i].PPRDIRE_DIRECCION, i, parseInt(v_DIRECCIONES[i].PPRDIRE_NUM_SEQ));
            cargarDatosDirecciones("direccion_" + i.toString(), v_DIRECCIONES[i]);
        }
    }

}

x = null;

function generarDatosBanco(v_DATOSBANCO) {
    var Array = [];

    Array = v_DATOSBANCO;

    addObjectJsonDatosBanco(0, v_DATOSBANCO[0].FTVCUEN_CODE);

    cargarDatosDatosBanco("datosbanco", v_DATOSBANCO[0]);

    if (Array.length > 1) {
        for (var i = 1; i < Array.length; i++) {
            x = i;
            crearclones("datosbanco", "../../vistas/NC/estereotipos/Adicionales.html", "Datos Bancarios Secundarios", "DATOSBANCO");
            addObjectJsonDatosBanco(i, v_DATOSBANCO[i].FTVCUEN_CODE);
            cargarDatosDatosBanco("datosbanco_" + i.toString(), v_DATOSBANCO[i]);
        }
    }
}

function generarTelefonos(v_TELEFONOS) {
    var Array = [];

    Array = v_TELEFONOS;

    addObjectJsonTelefonos(0, v_TELEFONOS[0].TELE_NUM_SEQ);

    cargarDatosTelefonos("telefonos", v_TELEFONOS[0]);

    if (Array.length > 1) {
        for (var i = 1; i < Array.length; i++) {
            crearclones("telefonos", "../../vistas/NC/estereotipos/Adicionales.html", "", "TELEFONOS");
            addObjectJsonTelefonos(i, v_TELEFONOS[i].TELE_NUM_SEQ);
            cargarDatosTelefonos("telefonos_" + i.toString(), v_TELEFONOS[i]);
        }
    }
}

function generarEmails(v_EMAILS) {
    var Array = [];

    Array = v_EMAILS;

    addObjectJsonEmails(0, v_EMAILS[0].CORR_NUM_SEQ);

    cargarDatosEmails("emails", v_EMAILS[0]);

    if (Array.length > 1) {
        for (var i = 1; i < Array.length; i++) {
            crearclones("emails", "../../vistas/NC/estereotipos/Adicionales.html", "", "EMAILS");
            addObjectJsonEmails(i, v_EMAILS[i].CORR_NUM_SEQ);
            cargarDatosEmails("emails_" + i.toString(), v_EMAILS[i]);
        }
    }
}

function cargarDatosDirecciones(v_iddiv, v_DIRECCIONES) {

    fillCboTipoDeVias(v_iddiv, v_DIRECCIONES.PPRDIRE_TIVI_CODE);
    fillCboTipoZona(v_iddiv, v_DIRECCIONES.PPRDIRE_TIZO_CODE);
    fillCboSucursalAtencion(v_iddiv, v_DIRECCIONES.PPRDIRE_CODIGO_SCSL_ATENCION);

    $('#' + v_iddiv + ' #txtnombrevia').val(v_DIRECCIONES.PPRDIRE_NOMBRE_VIA);
    $('#' + v_iddiv + ' #slcmznr').select2('val', v_DIRECCIONES.PPRDIRE_TIPO);
    $('#' + v_iddiv + ' #txtnumerovia').val(v_DIRECCIONES.PPRDIRE_NRO_VIA);
    $('#' + v_iddiv + ' #txtinteriorvia').val(v_DIRECCIONES.PPRDIRE_INTERIOR);
    $('#' + v_iddiv + ' #txtnombrezona').val(v_DIRECCIONES.PPRDIRE_NOMBRE_ZONA);

    if (v_DIRECCIONES.PAIS != "") {
        $('#' + v_iddiv + ' #slcpais')
            .val(v_DIRECCIONES.PAIS)
            .trigger('change', [v_DIRECCIONES.DEPARTAMENTO, v_DIRECCIONES.PROVINCIA, v_DIRECCIONES.DISTRITO]);
    }

    $('#' + v_iddiv + ' #txtdir').val(v_DIRECCIONES.PPRDIRE_DIRECCION);
    $('#' + v_iddiv + ' #txtref').val(v_DIRECCIONES.PPRDIRE_REFERENCIA);
    $('#' + v_iddiv + ' #txtLatitud').val(v_DIRECCIONES.PPRDIRE_LATITUD);
    $('#' + v_iddiv + ' #txtLongitud').val(v_DIRECCIONES.PPRDIRE_LONGITUD);

    $('#' + v_iddiv + ' #txtLocalidad').val(v_DIRECCIONES.PPRDIRE_LOCALIDAD);
    $('#' + v_iddiv + ' #slcaten').select2('val', v_DIRECCIONES.PPRDIRE_CODIGO_SCSL_ATENCION);
    $('#' + v_iddiv + ' #txtCodigoUbicacion').val(v_DIRECCIONES.PPRDIRE_CODIGO_UBICACION);


}

function cargarDatosDatosBanco(v_iddiv, v_DATOSBANCO) {


    fillCboBanco(v_iddiv, v_DATOSBANCO.FTVCUEN_BANC_CODE);
    fillCboTipoCuenta(v_iddiv, v_DATOSBANCO.FTVCUEN_TCUE_CODE);

    if (v_DATOSBANCO.FTVCUEN_CON_MOVIMIENTOS == 'S') {
        $('#' + v_iddiv + ' input').attr("disabled", true);
        $('#' + v_iddiv + ' select').attr("disabled", true);

    }

    $('#' + v_iddiv + ' #txtNumeroCuenta').val(v_DATOSBANCO.FTVCUEN_NRO_CUENTA);
    if (v_DATOSBANCO.FTVCUEN_NRO_CTA_INTER == "") {
        $('#' + v_iddiv + " #txtCuentaInterbancaria").attr("disabled", false);
    }
    $('#' + v_iddiv + ' #txtCuentaInterbancaria').val(v_DATOSBANCO.FTVCUEN_NRO_CTA_INTER);
    fillCboMoneda(v_iddiv, v_DATOSBANCO.FTVCUEN_MONE_CODE);


}

function cargarDatosTelefonos(v_iddiv, v_TELEFONOS) {
    $('#' + v_iddiv + ' #txtTelefonoA').val(v_TELEFONOS.TELE_NUMERO);
}

function cargarDatosEmails(v_iddiv, v_EMAILS) {
    $('#' + v_iddiv + ' #txtEmailA').val(v_EMAILS.CORR_CORREO);
}

function addObjectJsonDirecciones(v_DIRECCION, v_INDEX, v_NUM_SEQ) {

    var ArrayJson;
    var JsonDireccion = $('#hfJsonDirecciones').val();

    if (JsonDireccion.length == 0) {
        ArrayJson = [];
    }
    else {
        ArrayJson = JSON.parse(JsonDireccion);
    }
    ArrayJson.push({ 'DIRECCION': v_DIRECCION, "INDEX": v_INDEX, "NUM_SEQ": v_NUM_SEQ });
    $('#hfJsonDirecciones').val(JSON.stringify(ArrayJson));

}

function addObjectJsonDatosBanco(v_INDEX, v_CODE) {

    var ArrayJson;
    var JsonDatosBanco = $('#hfJsonDatosBancos').val();

    if (JsonDatosBanco.length == 0) {
        ArrayJson = [];
    }
    else {
        ArrayJson = JSON.parse(JsonDatosBanco);
    }
    ArrayJson.push({ "INDEX": v_INDEX, "CODE": v_CODE });
    $('#hfJsonDatosBancos').val(JSON.stringify(ArrayJson));

}

function addObjectJsonTelefonos(v_INDEX, v_NUM_SEQ) {

    var ArrayJson;
    var JsonTelefonos = $('#hfJsonTelefonos').val();

    if (JsonTelefonos.length == 0) {
        ArrayJson = [];
    }
    else {
        ArrayJson = JSON.parse(JsonTelefonos);
    }
    ArrayJson.push({ "INDEX": v_INDEX, "NUM_SEQ": v_NUM_SEQ });
    $('#hfJsonTelefonos').val(JSON.stringify(ArrayJson));

}

function addObjectJsonEmails(v_INDEX, v_NUM_SEQ) {

    var ArrayJson;
    var JsonEmails = $('#hfJsonEmails').val();

    if (JsonEmails.length == 0) {
        ArrayJson = [];
    }
    else {
        ArrayJson = JSON.parse(JsonEmails);
    }
    ArrayJson.push({ "INDEX": v_INDEX, "NUM_SEQ": v_NUM_SEQ });
    $('#hfJsonEmails').val(JSON.stringify(ArrayJson));

}

function removeObjectJsonDirecciones(v_INDEX) {

    var JsonDireccion = $('#hfJsonDirecciones').val();
    var ArrayJson = JSON.parse(JsonDireccion);
    var index = -1;
    for (var i = 0; i < ArrayJson.length; i++) {
        if (v_INDEX == ArrayJson[i].INDEX) {
            index = i;
            break;
        }
    }
    ArrayJson.splice(index, 1);
    $('#hfJsonDirecciones').val(JSON.stringify(ArrayJson));

}

function removeObjectJsonDatosBanco(v_INDEX) {

    var JsonDatosBanco = $('#hfJsonDatosBancos').val();
    var ArrayJson = JSON.parse(JsonDatosBanco);
    var index = -1;
    for (var i = 0; i < ArrayJson.length; i++) {
        if (v_INDEX == ArrayJson[i].INDEX) {
            index = i;
            break;
        }
    }
    ArrayJson.splice(index, 1);
    $('#hfJsonDatosBancos').val(JSON.stringify(ArrayJson));

}

function removeObjectJsonTelefonos(v_INDEX) {

    var JsonTelefonos = $('#hfJsonTelefonos').val();
    var ArrayJson = JSON.parse(JsonTelefonos);
    var index = -1;
    for (var i = 0; i < ArrayJson.length; i++) {
        if (v_INDEX == ArrayJson[i].INDEX) {
            index = i;
            break;
        }
    }
    ArrayJson.splice(index, 1);
    $('#hfJsonTelefonos').val(JSON.stringify(ArrayJson));

}

function removeObjectJsonEmails(v_INDEX) {

    var JsonEmails = $('#hfJsonEmails').val();
    var ArrayJson = JSON.parse(JsonEmails);
    var index = -1;
    for (var i = 0; i < ArrayJson.length; i++) {
        if (v_INDEX == ArrayJson[i].INDEX) {
            index = i;
            break;
        }
    }
    ArrayJson.splice(index, 1);
    $('#hfJsonEmails').val(JSON.stringify(ArrayJson));

}

function GrabarAdicionales() {
    var Errors = false;

    var IdDivDireccion = 'direccion';

    var IdDivDatosBanco = 'datosbanco';

    var IdDivTelefonos = 'telefonos';

    var IdDivEmails = 'emails';

    var ITEMSCOUNT_DIRECCION = '';
    var ITEMSDETAIL_DIRECCION = '';

    var ITEMSCOUNT_DATOSBANCO = '';
    var ITEMSDETAIL_DATOSBANCO = '';

    var ITEMSCOUNT_TELEFONOS = '';
    var ITEMSDETAIL_TELEFONOS = '';

    var ITEMSCOUNT_EMAILS = '';
    var ITEMSDETAIL_EMAILS = '';

    //DIRECCION
    var PIDM = '';
    var NUM_SEQ_DIR = '';
    var TIDT_CODE = '';
    var TIVI_CODE = '';
    var NOMBRE_VIA = '';
    var TIPO = '';
    var NRO_VIA = '';
    var INTERIOR = '';
    var TIZO_CODE = '';
    var NOMBRE_ZONA = '';
    var UBIG_CODE = '';
    var DIRECCION = '';
    var REFERENCIA = '';
    var ESTADO_IND = '';
    var USUA_ID = '';

    var LOCALIDAD = '';
    var CODIGO_UBICACION = '';
    var SCSL_ATENCION = '';

    //DATOS BANCO
    var CUEN_CODE = '';
    var CUEN_BANC_CODE = '';
    var CUEN_MONE_CODE = '';
    var CUEN_TCUE_CODE = '';
    var CUEN_NRO_CUENTA = '';
    var CUEN_ESTADO_IND = '';
    var CUEN_USUA_ID = '';
    var CUEN_INTERBANCARIA = '';

    //TELEFONOS
    var TELE_PIDM = '';
    var TELE_NUM_SEQ = '';
    var TELE_TIDT_CODE = '';
    var TELE_NUMERO = '';
    var TELE_ESTADO_IND = '';
    var TELE_USUA_ID = '';


    //EMAILS
    var CORR_PIDM = '';
    var CORR_NUM_SEQ = '';
    var CORR_TIDT_CODE = '';
    var CORR_CORREO = '';
    var CORR_ESTADO_IND = '';
    var CORR_USUA_ID = '';

    PIDM = $('#hfPPBIDEN_PIDM').val();

    ITEMSCOUNT_DIRECCION = cuentaCamposLlenos(IdDivDireccion).length;//$("#" + IdDivDireccion).parent().children().length;

    ITEMSCOUNT_DATOSBANCO = cuentaCamposLlenos(IdDivDatosBanco).length;// $("#" + IdDivDatosBanco).parent().children().length;

    ITEMSCOUNT_TELEFONOS = cuentaCamposLlenos(IdDivTelefonos).length;//$("#" + IdDivTelefonos).parent().children().length;

    ITEMSCOUNT_EMAILS = cuentaCamposLlenos(IdDivEmails).length; //$("#" + IdDivEmails).parent().children().length;

    Errors = validarAdicionales();

    if (Errors) {

        var i = 0;
        var j = 0;
        var pos = -1;

        var JsonDireccion = $('#hfJsonDirecciones').val();
        var ArrayJsonDireccion = JSON.parse(JsonDireccion);

        var JsonDatosBanco = $('#hfJsonDatosBancos').val();
        var ArrayJsonDatosBanco = JSON.parse(JsonDatosBanco);

        var JsonTelefonos = $('#hfJsonTelefonos').val();
        var ArrayJsonTelefonos = JSON.parse(JsonTelefonos);

        var JsonEmails = $('#hfJsonEmails').val();
        var ArrayJsonEmails = JSON.parse(JsonEmails);

        while (i < ITEMSCOUNT_DIRECCION) {
            j = cuentaCamposLlenos(IdDivDireccion)[i];

            if (j == 0 && llenable([IdDivDireccion + ' #txtdir'])) {

                NUM_SEQ_DIR = ArrayJsonDireccion[j].NUM_SEQ;
                TIDT_CODE = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoDireccionPrincipal').val();
                TIVI_CODE = $.trim($('#' + IdDivDireccion + ' #slcvia').val());
                NOMBRE_VIA = $.trim($('#' + IdDivDireccion + ' #txtnombrevia').val());
                TIPO = $.trim($('#' + IdDivDireccion + ' #slcmznr').val());
                NRO_VIA = $.trim($('#' + IdDivDireccion + ' #txtnumerovia').val());
                INTERIOR = $.trim($('#' + IdDivDireccion + ' #txtinteriorvia').val());
                TIZO_CODE = $.trim($('#' + IdDivDireccion + ' #slczona').val());
                NOMBRE_ZONA = $.trim($('#' + IdDivDireccion + ' #txtnombrezona').val());
                UBIG_CODE = $.trim($('#' + IdDivDireccion + ' #slcdist :selected').attr("codigoub"));
                DIRECCION = $.trim($('#' + IdDivDireccion + ' #txtdir').val());
                LOCALIDAD = $.trim($('#' + IdDivDireccion + ' #txtLocalidad').val());
                SCSL_ATENCION = $.trim($('#' + IdDivDireccion + ' #slcaten').val());

                CODIGO_UBICACION = $.trim($('#' + IdDivDireccion + ' #txtCodigoUbicacion').val());
                REFERENCIA = $.trim($('#' + IdDivDireccion + ' #txtref').val());
                ESTADO_IND = 'A';
                USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
                LATITUD = $.trim($('#' + IdDivDireccion + ' #txtLatitud').val());
                LONGITUD = $.trim($('#' + IdDivDireccion + ' #txtLongitud').val());

                ITEMSDETAIL_DIRECCION += PIDM + '|,|' + NUM_SEQ_DIR + '|,|' + TIDT_CODE + '|,|' + TIVI_CODE + '|,|' + NOMBRE_VIA + '|,|' + TIPO + '|,|'
                    + NRO_VIA + '|,|' + INTERIOR + '|,|' + TIZO_CODE + '|,|' + NOMBRE_ZONA + '|,|'
                    + UBIG_CODE + '|,|' + DIRECCION + '|,|' + REFERENCIA + '|,|' + ESTADO_IND + '|,|'
                    + USUA_ID + '|,|'
                    + (LATITUD == "" ? 0 : LATITUD) + '|,|'
                    + (LONGITUD == "" ? 0 : LONGITUD) + '|,|'
                    + SCSL_ATENCION + '|,|'
                    + CODIGO_UBICACION + '|;|';

            }
            else {

                if (typeof ($("#" + IdDivDireccion + "_" + j.toString()).attr('id')) !== 'undefined' && llenable([IdDivDireccion + '_' + j.toString() + ' #txtdir'])) {

                    for (var l = 0; l < ArrayJsonDireccion.length; l++) {
                        if (j == ArrayJsonDireccion[l].INDEX) {
                            pos = l;
                            break;
                        }
                    }

                    NUM_SEQ_DIR = ArrayJsonDireccion[pos].NUM_SEQ;
                    TIDT_CODE = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoDireccionSecundario').val();
                    TIVI_CODE = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #slcvia').val());
                    NOMBRE_VIA = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #txtnombrevia').val());
                    TIPO = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #slcmznr').val());
                    NRO_VIA = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #txtnumerovia').val());
                    INTERIOR = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #txtinteriorvia').val());
                    TIZO_CODE = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #slczona').val());
                    NOMBRE_ZONA = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #txtnombrezona').val());
                    UBIG_CODE = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #slcdist :selected').attr("codigoub"));
                    DIRECCION = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #txtdir').val());
                    REFERENCIA = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #txtref').val());
                    ESTADO_IND = 'A';
                    USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
                    LATITUD = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #txtLatitud').val());
                    LONGITUD = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #txtLongitud').val());

                    CODIGO_UBICACION = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #txtCodigoUbicacion').val());
                    SCSL_ATENCION = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #slcaten').val());
                    LOCALIDAD = $.trim($('#' + IdDivDireccion + '_' + j.toString() + ' #txtLocalidad').val());

                    ITEMSDETAIL_DIRECCION += PIDM + '|,|' + NUM_SEQ_DIR + '|,|' + TIDT_CODE + '|,|' + TIVI_CODE + '|,|' + NOMBRE_VIA + '|,|' + TIPO + '|,|'
                        + NRO_VIA + '|,|' + INTERIOR + '|,|' + TIZO_CODE + '|,|' + NOMBRE_ZONA + '|,|'
                        + UBIG_CODE + '|,|' + DIRECCION + '|,|' + REFERENCIA + '|,|' + ESTADO_IND + '|,|' + USUA_ID + '|,|'
                        + (LATITUD == "" ? 0 : LATITUD) + '|,|'
                        + (LONGITUD == "" ? 0 : LONGITUD) + '|,|'
                        + SCSL_ATENCION + '|,|'
                        + CODIGO_UBICACION + '|;|';
                }
            }
            i++;

            pos = -1;

        }

        if (ITEMSDETAIL_DIRECCION.length > 0) {
            ITEMSDETAIL_DIRECCION = ITEMSDETAIL_DIRECCION.substr(0, ITEMSDETAIL_DIRECCION.length - 3);
        }

        i = 0;
        j = 0;
        pos = -1;

        //Guarda datos bancarios, y datos bancarios secundarios
        while (i < ITEMSCOUNT_DATOSBANCO) {
            j = cuentaCamposLlenos(IdDivDatosBanco)[i];
            if (j == 0 && llenable([IdDivDatosBanco + ' #slcbanc', IdDivDatosBanco + " #slcticu", IdDivDatosBanco + " #txtNumeroCuenta", IdDivDatosBanco + " #slcmone"])) {


                CUEN_CODE = ArrayJsonDatosBanco[j].CODE;
                CUEN_BANC_CODE = $.trim($('#' + IdDivDatosBanco + ' #slcbanc').val());
                CUEN_MONE_CODE = $.trim($('#' + IdDivDatosBanco + ' #slcmone').val());
                CUEN_TCUE_CODE = $.trim($('#' + IdDivDatosBanco + ' #slcticu').val());
                CUEN_NRO_CUENTA = $.trim($('#' + IdDivDatosBanco + ' #txtNumeroCuenta').val());
                //Se agrego cuenta interbancaria
                CUEN_INTERBANCARIA = $.trim($('#' + IdDivDatosBanco + ' #txtCuentaInterbancaria').val());
                CUEN_ESTADO_IND = 'A';
                CUEN_USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

                ITEMSDETAIL_DATOSBANCO += PIDM + '|,|' + CUEN_CODE + '|,|' + CUEN_BANC_CODE + '|,|' + CUEN_MONE_CODE + '|,|' + CUEN_TCUE_CODE + '|,|' + CUEN_NRO_CUENTA + '|,|'
                    + CUEN_ESTADO_IND + '|,|' + CUEN_USUA_ID + '|,|' + CUEN_INTERBANCARIA + '|;|';

            }
            else {
                if (typeof ($('#' + IdDivDatosBanco + "_" + j.toString()).attr('id')) !== 'undefined' && llenable(
                    [IdDivDatosBanco + '_' + j.toString() + ' #slcbanc',
                    IdDivDatosBanco + '_' + j.toString() + ' #slcmone',
                    IdDivDatosBanco + '_' + j.toString() + ' #slcticu',
                    IdDivDatosBanco + '_' + j.toString() + ' #txtNumeroCuenta']
                )) {

                    for (var l = 0; l < ArrayJsonDatosBanco.length; l++) {
                        if (j == ArrayJsonDatosBanco[l].INDEX) {
                            pos = l;
                            break;
                        }
                    }

                    CUEN_CODE = ArrayJsonDatosBanco[pos].CODE;
                    CUEN_BANC_CODE = $.trim($('#' + IdDivDatosBanco + '_' + j.toString() + ' #slcbanc').val());
                    CUEN_MONE_CODE = $.trim($('#' + IdDivDatosBanco + '_' + j.toString() + ' #slcmone').val());
                    CUEN_TCUE_CODE = $.trim($('#' + IdDivDatosBanco + '_' + j.toString() + ' #slcticu').val());
                    CUEN_NRO_CUENTA = $.trim($('#' + IdDivDatosBanco + '_' + j.toString() + ' #txtNumeroCuenta').val());
                    //Se agrego cuenta interbancaria
                    CUEN_INTERBANCARIA = $.trim($('#' + IdDivDatosBanco + '_' + j.toString() + ' #txtCuentaInterbancaria').val());
                    CUEN_ESTADO_IND = 'A';
                    CUEN_USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

                    ITEMSDETAIL_DATOSBANCO += PIDM + '|,|' + CUEN_CODE + '|,|' + CUEN_BANC_CODE + '|,|' + CUEN_MONE_CODE + '|,|' + CUEN_TCUE_CODE + '|,|' + CUEN_NRO_CUENTA + '|,|'
                        + CUEN_ESTADO_IND + '|,|' + CUEN_USUA_ID + '|,|' + CUEN_INTERBANCARIA + '|;|';


                }
            }
            i++;

            pos = -1;

        }

        if (ITEMSDETAIL_DATOSBANCO.length > 0) {
            ITEMSDETAIL_DATOSBANCO = ITEMSDETAIL_DATOSBANCO.substr(0, ITEMSDETAIL_DATOSBANCO.length - 3);
        }

        i = 0;
        j = 0;
        pos = -1;

        while (i < ITEMSCOUNT_TELEFONOS) {
            j = cuentaCamposLlenos(IdDivTelefonos)[i];
            if (j == 0 && llenable([IdDivTelefonos + ' #txtTelefonoA'])) {

                TELE_NUM_SEQ = ArrayJsonTelefonos[j].NUM_SEQ;
                TELE_TIDT_CODE = '0003';
                TELE_NUMERO = $.trim($('#' + IdDivTelefonos + ' #txtTelefonoA').val());
                TELE_ESTADO_IND = 'A';
                TELE_USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

                ITEMSDETAIL_TELEFONOS += PIDM + '|,|' + TELE_NUM_SEQ + '|,|' + TELE_TIDT_CODE + '|,|' + TELE_NUMERO + '|,|' + TELE_ESTADO_IND + '|,|' + TELE_USUA_ID + '|;|';



            }
            else {
                if (typeof ($("#" + IdDivTelefonos + "_" + j.toString()).attr('id')) !== 'undefined' &&
                    llenable([IdDivTelefonos + '_' + j.toString() + ' #txtTelefonoA'])
                ) {

                    for (var l = 0; l < ArrayJsonTelefonos.length; l++) {
                        if (j == ArrayJsonTelefonos[l].INDEX) {
                            pos = l;
                            break;
                        }
                    }

                    TELE_NUM_SEQ = ArrayJsonTelefonos[pos].NUM_SEQ;
                    TELE_TIDT_CODE = '0003';
                    TELE_NUMERO = $.trim($('#' + IdDivTelefonos + '_' + j.toString() + ' #txtTelefonoA').val());
                    TELE_ESTADO_IND = 'A';
                    TELE_USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

                    ITEMSDETAIL_TELEFONOS += PIDM + '|,|' + TELE_NUM_SEQ + '|,|' + TELE_TIDT_CODE + '|,|' + TELE_NUMERO + '|,|' + TELE_ESTADO_IND + '|,|' + TELE_USUA_ID + '|;|';


                }
            }
            i++;

            pos = -1;

        }

        if (ITEMSDETAIL_TELEFONOS.length > 0) {
            ITEMSDETAIL_TELEFONOS = ITEMSDETAIL_TELEFONOS.substr(0, ITEMSDETAIL_TELEFONOS.length - 3);
        }

        i = 0;
        j = 0;
        pos = -1;

        while (i < ITEMSCOUNT_EMAILS) {
            j = cuentaCamposLlenos(IdDivEmails)[i];
            if (j == 0 && llenable([IdDivEmails + ' #txtEmailA'])) {

                CORR_NUM_SEQ = ArrayJsonEmails[j].NUM_SEQ;
                CORR_TIDT_CODE = '0002';
                CORR_CORREO = $.trim($('#' + IdDivEmails + ' #txtEmailA').val());
                CORR_ESTADO_IND = 'A';
                CORR_USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

                ITEMSDETAIL_EMAILS += PIDM + '|,|' + CORR_NUM_SEQ + '|,|' + CORR_TIDT_CODE + '|,|' + CORR_CORREO + '|,|' + CORR_ESTADO_IND + '|,|' + CORR_USUA_ID + '|;|';



            }
            else {
                if (typeof ($("#" + IdDivEmails + "_" + j.toString()).attr('id')) !== 'undefined' &&
                    llenable([IdDivEmails + '_' + j.toString() + ' #txtEmailA'])) {

                    for (var l = 0; l < ArrayJsonEmails.length; l++) {
                        if (j == ArrayJsonEmails[l].INDEX) {
                            pos = l;
                            break;
                        }
                    }

                    CORR_NUM_SEQ = ArrayJsonEmails[pos].NUM_SEQ;
                    CORR_TIDT_CODE = '0002';
                    CORR_CORREO = $.trim($('#' + IdDivEmails + '_' + j.toString() + ' #txtEmailA').val());
                    CORR_ESTADO_IND = 'A';
                    CORR_USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

                    ITEMSDETAIL_EMAILS += PIDM + '|,|' + CORR_NUM_SEQ + '|,|' + CORR_TIDT_CODE + '|,|' + CORR_CORREO + '|,|' + CORR_ESTADO_IND + '|,|' + CORR_USUA_ID + '|;|';


                }
            }
            i++;

            pos = -1;

        }

        if (ITEMSDETAIL_EMAILS.length > 0) {
            ITEMSDETAIL_EMAILS = ITEMSDETAIL_EMAILS.substr(0, ITEMSDETAIL_EMAILS.length - 3);
        }

        var data = new FormData();
        data.append('flag', 'M');
        data.append('ITEMSDETAIL_DIRECCION', ITEMSDETAIL_DIRECCION);
        data.append('ITEMSCOUNT_DIRECCION', ITEMSCOUNT_DIRECCION);
        data.append('ITEMSDETAIL_DATOSBANCO', ITEMSDETAIL_DATOSBANCO);
        data.append('ITEMSCOUNT_DATOSBANCO', ITEMSCOUNT_DATOSBANCO);
        data.append('ITEMSDETAIL_TELEFONOS', ITEMSDETAIL_TELEFONOS);
        data.append('ITEMSCOUNT_TELEFONOS', ITEMSCOUNT_TELEFONOS);
        data.append('ITEMSDETAIL_EMAILS', ITEMSDETAIL_EMAILS);
        data.append('ITEMSCOUNT_EMAILS', ITEMSCOUNT_EMAILS);
        data.append('PPBIDEN_PIDM', $('#hfPPBIDEN_PIDM').val());
        data.append('USUA_ID', $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val());

        Bloquear("adicionales");
        $.ajax({
            type: "post",
            url: "vistas/nc/estereotipos/ajax/Adicionales.ashx",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {
                Desbloquear("adicionales");

                if (datos != null) {
                    if (datos[0].SUCCESS == "OK") {
                        recargaAdicionales();
                        exito();
                    }
                }
            },
            error: function (msg) {
                Desbloquear("adicionales");
                noexito();
            }
        });
    }
    else {

        if (!cambio) alertCustom("LA OPERACION NO SE REALIZO !<br/> NO HAY CAMBIOS QUE GRABAR!");
        else alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");
    }
}

function cuentaCamposLlenos(IdDiv) {
    var count = new Array;
    for (var i = 0; i < $("#" + IdDiv).parent().children().length; i++) {

        if (i == 0 && llenable(IdDiv + " #" + $($("#" + IdDiv + " input:text.indicador")[0]).attr("id"))) {
            count.push(i);
        }
        if (i > 0) {
            if (llenable(IdDiv + "_" + i + " #" + $($("#" + IdDiv + " input:text.indicador")[0]).attr("id"))) {
                count.push(i);
            }
        }

    }
    return count;
}

function llenable(v_Id) {
    var flag = false;
    var auxiliar = new Array();
    if (!(Object.prototype.toString.call(v_Id) == "[object Array]")) {

        auxiliar[0] = v_Id;

    } else { auxiliar = v_Id; }
    for (var i = 0; i < auxiliar.length; i++) {

        flag |= $.trim($("#" + auxiliar[i]).val()) != "";

    }

    return flag;
}
var cambio;
function validarAdicionales() {
    var Errors = false;
    cambio = false;
    var i = 1;
    var j = 0;

    var TotalDirecciones = $("#direccion").parent().children().length;
    var TotalDatosBanco = $("#datosbanco").parent().children().length;
    var TotalTelefonos = $("#telefonos").parent().children().length;
    var TotalEmails = $("#emails").parent().children().length;


    while (i <= TotalDirecciones) {

        if (j == 0 && llenable(["direccion #txtdir"])) {

            Errors |= vErrorsNotMessage(["direccion #txtdir"]);
            cambio = true;

        }
        else {
            if (typeof ($("#direccion_" + j.toString()).attr('id')) !== 'undefined' && llenable(["direccion_" + j.toString() + " #txtdir"])) {

                Errors |= vErrorsNotMessage(["direccion_" + j.toString() + " #txtdir"]);
                cambio = true;


            }
        }
        i++;
        j++;
    }

    i = 1;
    j = 0;



    while (i <= TotalDatosBanco) {

        if (j == 0 && llenable(["datosbanco #slcbanc", "datosbanco #slcticu", "datosbanco #txtNumeroCuenta", "datosbanco #slcmone"])) {
            // si es llenable valida              
            Errors |= vErrorsNotMessage([
                "datosbanco #slcbanc",
                "datosbanco #slcticu",
                "datosbanco #txtNumeroCuenta",
                "datosbanco #slcmone"
            ]);
            cambio = true;

        }
        else {
            if (typeof ($("#datosbanco_" + j.toString()).attr('id')) !== 'undefined'
                && llenable([
                    "datosbanco_" + j.toString() + " #slcbanc",
                    "datosbanco_" + j.toString() + " #slcticu",
                    "datosbanco_" + j.toString() + " #txtNumeroCuenta",
                    "datosbanco_" + j.toString() + " #slcmone"
                ])) {

                Errors |= vErrorsNotMessage([
                    "datosbanco_" + j.toString() + " #slcbanc",
                    "datosbanco_" + j.toString() + " #slcticu",
                    "datosbanco_" + j.toString() + " #txtNumeroCuenta",
                    "datosbanco_" + j.toString() + " #slcmone"
                ]);

                cambio = true;


            }
        }
        i++;
        j++;
    }

    i = 1;
    j = 0;

    while (i <= TotalTelefonos) {

        if (j == 0 && llenable(["telefonos #txtTelefonoA"])) {
            Errors |= vErrorsNotMessage(["telefonos #txtTelefonoA"]);
            cambio = true;

        }
        else {
            if (typeof ($("#telefonos_" + j.toString()).attr('id')) !== 'undefined' && llenable(["telefonos_" + j.toString() + " #txtTelefonoA"])) {
                Errors |= vErrorsNotMessage(["telefonos_" + j.toString() + " #txtTelefonoA"]);
                cambio = true;
            }
        } i++;
        j++;
    }

    i = 1;
    j = 0;

    while (i <= TotalEmails) {

        if (j == 0 && llenable(["emails #txtEmailA"])) {
            if (vErrorsNotMessage(["emails #txtEmailA"]) == true) {
                Errors |= true;
                cambio = true;
            }
            else {
                var email = $.trim($('#emails #txtEmailA').val());
                if (validarEmail($.trim($('#emails #txtEmailA').val())) == true) {
                    $('#emails #txtEmailA').val('');
                    if (vErrorsNotMessage(["emails #txtEmailA"]) == true) {
                        $('#emails #txtEmailA').val(email);
                        $('#emails #txtEmailA').parent().parent().removeClass();
                        $('#emails #txtEmailA').parent().parent().addClass('control-group error');
                        $('#emails #txtEmailA ~ span').children().remove();
                        Errors |= true;
                        cambio = true;
                    }
                }
            }

        }
        else {
            if (typeof ($("#emails_" + j.toString()).attr('id')) !== 'undefined' && llenable(["emails_" + j.toString() + " #txtEmailA"])) {
                if (vErrorsNotMessage(["emails_" + j.toString() + " #txtEmailA"]) == true) {
                    Errors |= true;
                    cambio = true;
                }
                else {
                    var email = $.trim($('#emails_' + j.toString() + ' #txtEmailA').val());
                    if (validarEmail($.trim($('#emails_' + j.toString() + ' #txtEmailA').val())) == true) {
                        $('#emails_' + j.toString() + ' #txtEmailA').val('');
                        if (vErrorsNotMessage(["emails_" + j.toString() + " #txtEmailA"]) == true) {
                            $('#emails_' + j.toString() + ' #txtEmailA').val(email);
                            $('#emails_' + j.toString() + ' #txtEmailA').parent().parent().removeClass();
                            $('#emails_' + j.toString() + ' #txtEmailA').parent().parent().addClass('control-group error');
                            $('#emails_' + j.toString() + ' #txtEmailA ~ span').children().remove();
                            Errors |= true;
                            cambio = true;
                        }
                    }
                }

            }
        } i++;
        j++;
    }
    // if (!cambio)//nunca cambio
    //     Errors = true;
    return Errors;
}

function recargaAdicionales() {
    $.ajaxSetup({ async: false });
    $("#adicionales").load('../../vistas/NC/estereotipos/Adicionales.html', function (html) {
    });
    $.ajaxSetup({ async: true });

    ADICIONALES.init();

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

function fillCboTipoDeVias(v_iddiv, v_value) {
    var selectTipoDeVias = $("#" + v_iddiv + " #slcvia");
    selectTipoDeVias.select2();



    if (localStorage.getItem("dataTipoDeVias") != undefined) {

        selectTipoDeVias.html(localStorage.getItem("dataTipoDeVias"));
        setTimeout(function () { selectTipoDeVias.select2('val', v_value); }, 200);
        $('#hfJsonVias').val(localStorage.getItem("jsonTipoDeVias"));

    } else {

        Bloquear($(selectTipoDeVias.siblings("div")[0]).attr("id"));
        var vdatos = null;

        var obj = '';
        $.ajax({
            type: "post",
            url: "vistas/NC/estereotipos/ajax/Adicionales.ASHX?flag=13",
            contenttype: "application/json;",
            datatype: "json",
            // async: false,
            success: function (datos) {
                selectTipoDeVias.empty();
                if (datos != null) {
                    obj += '[';
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectTipoDeVias.append('<option></option>');
                        }
                        selectTipoDeVias.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');

                        obj += '{';
                        obj += '"CODIGO":"' + datos[i].CODIGO + '",';
                        obj += '"DESCRIPCION":"' + datos[i].DESCRIPCION + '",';
                        obj += '"DESCRIPCION_CORTO":"' + datos[i].DESCRIPCION_CORTO + '"';
                        obj += '},';
                    }
                    obj += '{}';
                    obj = obj.replace(',{}', '');
                    obj += ']';
                    $('#hfJsonVias').val(obj);
                    vdatos = datos;
                    CrearDatoPermanente("dataTipoDeVias", selectTipoDeVias.html());
                    CrearDatoPermanente("jsonTipoDeVias", obj);
                }

            },
            error: function (msg) {
                alert(msg);
            }
        }).done(function () {

            if (vdatos != null && $.trim(v_value).length > 0) {
                selectTipoDeVias.select2('val', v_value);
            }
            Desbloquear($(selectTipoDeVias.siblings("div")[0]).attr("id"));
        });
    }
    flagCargaPlugMaps = 0;
}

function fillCboTipoZona(v_iddiv, v_value) {
    var selectTipoZona = $("#" + v_iddiv + " #slczona");
    selectTipoZona.select2();

    if (localStorage.getItem("dataTipoZona") != undefined) {

        selectTipoZona.html(localStorage.getItem("dataTipoZona"));
        setTimeout(function () { selectTipoZona.select2('val', v_value); }, 200);
        $('#hfJsonZona').val(localStorage.getItem("jsonTipoZona"));

    } else {

        Bloquear($(selectTipoZona.siblings("div")[0]).attr("id"));

        var vdatos = null;
        var obj = '';
        $.ajax({
            type: "post",
            url: "vistas/NC/estereotipos/ajax/Adicionales.ASHX?flag=14",
            contenttype: "application/json;",
            datatype: "json",
            //  async: false,
            success: function (datos) {
                selectTipoZona.empty();
                if (datos != null) {
                    obj += '[';
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectTipoZona.append('<option></option>');
                        }
                        selectTipoZona.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');

                        obj += '{';
                        obj += '"CODIGO":"' + datos[i].CODIGO + '",';
                        obj += '"DESCRIPCION":"' + datos[i].DESCRIPCION + '",';
                        obj += '"DESCRIPCION_CORTO":"' + datos[i].DESCRIPCION_CORTO + '"';
                        obj += '},';
                    }

                    obj += '{}';
                    obj = obj.replace(',{}', '');
                    obj += ']';
                    $('#hfJsonZona').val(obj);
                    vdatos = datos;
                    CrearDatoPermanente("dataTipoZona", selectTipoZona.html());
                    CrearDatoPermanente("jsonTipoZona", obj);
                }

            },
            error: function (msg) {
                alert(msg);
            }
        }).done(function () {
            if (vdatos != null && $.trim(v_value).length > 0) {
                selectTipoZona.select2('val', v_value);
            }
            Desbloquear($(selectTipoZona.siblings("div")[0]).attr("id"));
        });
    }
}

function fillCboSucursalAtencion(v_iddiv, v_value) {
    var selectScslAtencion = $("#" + v_iddiv + " #slcaten");
    selectScslAtencion.select2();

    if (localStorage.getItem("dataTipoScslAten") != undefined) {
        debugger;
        selectScslAtencion.html(localStorage.getItem("dataTipoScslAten"));        

        setTimeout(function () {
            if ($.trim(v_value).length > 0) {
                selectScslAtencion.val(v_value).change();
            } else {
                selectScslAtencion.val($("#ctl00_hddestablecimiento").val()).change();
            }
        }, 200);

        $('#hfJsonScslAten').val(localStorage.getItem("jsonTipoScslAten"));

    } else {

        Bloquear($(selectScslAtencion.siblings("div")[0]).attr("id"));

        var vdatos = null;
        var obj = '';
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + $("#ctl00_hddctlg").val(),
            contenttype: "application/json;",
            datatype: "json",
            success: function (datos) {
                selectScslAtencion.empty();
                if (datos != null) {
                    obj += '[';
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectScslAtencion.append('<option></option>');
                        }
                        selectScslAtencion.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        obj += '{';
                        obj += '"CODIGO":"' + datos[i].CODIGO + '",';
                        obj += '"DESCRIPCION":"' + datos[i].DESCRIPCION + '",';
                        obj += '"DESCRIPCION_CORTO":"' + datos[i].DESCRIPCION + '"';
                        obj += '},';
                    }

                    obj += '{}';
                    obj = obj.replace(',{}', '');
                    obj += ']';
                    $('#hfJsonScslAten').val(obj);
                    vdatos = datos;
                    CrearDatoPermanente("dataTipoScslAten", selectScslAtencion.html());
                    CrearDatoPermanente("jsonTipoScslAten", obj);
                }
            },
            error: function (msg) {
                alert(msg);
            },
            complete: function () {
                if (vdatos != null && $.trim(v_value).length > 0) {
                    selectScslAtencion.val(v_value).change();
                } else {
                    selectScslAtencion.val($("#ctl00_hddestablecimiento").val()).change();
                }
                Desbloquear($(selectScslAtencion.siblings("div")[0]).attr("id"));
            }
        });
    }    

}

dataCboBanco = "";
dataTipoCuenta = "";
dataCboMoneda = "";

function fillCboBanco(v_iddiv, v_value) {
    var selectBanco = $("#" + v_iddiv + " #slcbanc");
    selectBanco.select2();

    if (dataCboBanco != "") {

        selectBanco.html(dataCboBanco);
        selectBanco.select2('val', v_value).change();

    } else {

        Bloquear($(selectBanco.siblings("div")[0]).attr("id"));
        var vdatos = null;

        $.ajax({
            type: "post",
            url: "vistas/NC/estereotipos/ajax/Adicionales.ASHX?flag=9",
            contenttype: "application/json;",
            datatype: "json",
            //  async: false,
            success: function (datos) {
                selectBanco.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectBanco.append('<option></option>');
                        }
                        selectBanco.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        dataCboBanco = selectBanco.html();
                    }
                    vdatos = datos;
                }

            },
            error: function (msg) {
                alert(msg);
            }
        }).done(function () {
            if (vdatos != null && $.trim(v_value).length > 0) {
                selectBanco.select2('val', v_value).change();
            }
            Desbloquear($(selectBanco.siblings("div")[0]).attr("id"));
        });
    }
}

function fillCboTipoCuenta(v_iddiv, v_value) {
    var selectTipoCuenta = $("#" + v_iddiv + " #slcticu");
    selectTipoCuenta.select2();

    if (dataTipoCuenta != "") {

        selectTipoCuenta.html(dataTipoCuenta);
        selectTipoCuenta.select2('val', v_value).change();

    } else {

        Bloquear($(selectTipoCuenta.siblings("div")[0]).attr("id"));
        var vdatos = null;
        $.ajax({
            type: "post",
            url: "vistas/NC/estereotipos/ajax/Adicionales.ASHX?flag=10",
            contenttype: "application/json;",
            datatype: "json",
            // async: false,
            success: function (datos) {
                selectTipoCuenta.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectTipoCuenta.append('<option></option>');
                        }
                        selectTipoCuenta.append('<option value="' + datos[i].CODIGO + '" mone_cod ="' + datos[i].MONE_COD + '">' + datos[i].DESCRIPCION + '</option>');
                        dataTipoCuenta = selectTipoCuenta.html();
                    }
                    vdatos = datos;
                }

            },
            error: function (msg) {
                alert(msg);
            }
        }).done(function () {
            if (vdatos != null && $.trim(v_value).length > 0) {
                selectTipoCuenta.select2('val', v_value);
            }
            Desbloquear($(selectTipoCuenta.siblings("div")[0]).attr("id"));
        });
    }
}

function fillCboMoneda(v_iddiv, v_value) {
    var selectMoneda = $("#" + v_iddiv + " #slcmone");
    selectMoneda.select2();


    if (localStorage.getItem("dataMoneda") != undefined) {

        selectMoneda.html(localStorage.getItem("dataMoneda"));
        selectMoneda.select2('val', v_value);

    } else {

        Bloquear($(selectMoneda.siblings("div")[0]).attr("id"));
        var vdatos = null;
        $.ajax({
            type: "post",
            url: "vistas/NC/estereotipos/ajax/Adicionales.ASHX?flag=11&empresa=" + $("#ctl00_hddctlg").val(),

            //    async: false,
            success: function (datos) {
                selectMoneda.empty();


                if (datos != null) {
                    selectMoneda.html(datos);
                    CrearDatoPermanente("dataMoneda", datos);
                    vdatos = datos;
                }

            },
            error: function (msg) {
                alert(msg);
            }
        }).done(function () {

            if (vdatos != "" && $.trim(v_value).length > 0) {
                selectMoneda.select2('val', v_value);
            }
            Desbloquear($(selectMoneda.siblings("div")[0]).attr("id"));
        });
    }
}

function MuestraDireccion(obj) {

    var NRO = $.trim($('#txtrucjuridico').val()) == "" ? $.trim($("#txtrucnatural").val()) : $.trim($('#txtrucjuridico').val());

    if (NRO != "") {

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
                if (data.condicion_de_domicilio == "HABIDO") {
              //if (data.estado_del_contribuyente == "ACTIVO" && data.condicion_de_domicilio == "HABIDO") {
                    $("#" + obj.attr("id") + ' #txtdir').val(data.direccion == '-' || data.direccion == '' ? "TRUJILLO" : eliminarDiacriticos(data.direccion));
                    //$("#" + obj.attr("id") + ' #txtubigeo').val((data.direccion == ('-' || '') ? '130101' : data.ubigeo));
                }
            } else {
                alertCustom("Servicio SUNAT no disponible en estos momentos.");
            }
        };
    } else {
        infoCustom2("No se encontró ruc del cual consultar.");
    }
}

function estaCargado(idcbo) {

    if ($("#" + idcbo).html() != "") {

        return true;
    } else {
        return false;
    }

}

flagCargaPlugMaps = false;

function MostrarMapa(v_iddiv) {
    
    var vLatitud = $("#" + v_iddiv + " #txtLatitud").val();
    var vLongitud = $("#" + v_iddiv + " #txtLongitud").val();
    var vTitulo = $("#" + v_iddiv + " #titulodir").val();

    if (vLatitud == "0.00000000" && vLongitud == "0.00000000") {
        vLatitud = '';
        vLongitud = '';
    }
    

    $("#mapaModal").modal('show');

    if (!flagCargaPlugMaps) {
        $.getScript("//maps.googleapis.com/maps/api/js?key=AIzaSyCQ22NAvgA2_s8S1xRmR7YQZXsk_PejW1Q")
            .always(Bloquear("map"), "Cargando")
            .done(function (script, textStatus) {
                $.getScript("../../recursos/plugins/gmaps.js")
                    .done(function (script, textStatus) {
                        map = new GMaps({
                            div: '#map',
                            lat: -12.043333,
                            lng: -77.028333
                        });
                        if (vLatitud === "" || vLongitud === "") {
                            BuscarPorNombre(v_iddiv, vTitulo);
                        } else {
                            map.setCenter(vLatitud, vLongitud);
                            map.addMarker({
                                lat: vLatitud,
                                lng: vLongitud,
                                title: vTitulo,
                                draggable: true,
                                dragend: function () {
                                    $("#mapaModal").modal("hide");
                                    $("#modalGConfirmacion").modal("show");
                                    vNewLat = this.getPosition().lat();
                                    vNewLng = this.getPosition().lng();
                                },
                                infoWindow: {
                                    content: '<p>' + vTitulo + '</p>'
                                }
                            });
                        }

                    });
            });

        $("#modGSi").click(function () { $("#" + v_iddiv + " #txtLatitud").val(vNewLat); $("#" + v_iddiv + " #txtLongitud").val(vNewLng); $("#modalGConfirmacion").modal("hide"); $("#mapaModal").modal("show"); });
        $("#modGNo").click(function () { $("#modalGConfirmacion").modal("hide"); map.markers[0].setPosition(new google.maps.LatLng($("#" + v_iddiv + " #txtLatitud").val(), $("#" + v_iddiv + " #txtLongitud").val())); $("#mapaModal").modal("show"); });
        flagCargaPlugMaps |= 1;
    }
    else {
        x = map.markers[0];
        if (vLatitud === "" || vLongitud === "") {
            BuscarPorNombre(v_iddiv, vTitulo);
        } else {
            map.setCenter($("#" + v_iddiv + " #txtLatitud").val(), $("#" + v_iddiv + " #txtLongitud").val());
            x.setPosition(new google.maps.LatLng($("#" + v_iddiv + " #txtLatitud").val(), $("#" + v_iddiv + " #txtLongitud").val()));
        }
    }

}


function BuscarPorNombre(v_iddiv, vTitulo) {

    var DIRECCIONCOMPLETA = '';
    var TIPOVIA = '';
    var NOMBREVIA = '';
    var TIPO = '';
    var NROVIA = '';
    var TIPONRO = '';
    var INTERIOR = '';
    var TIPOZONA = '';
    var NOMBREZONA = '';
    var PAIS = '';
    var DEPARTAMENTO = '';
    var PROVINCIA = '';
    var DISTRITO = '';

    var INDEX = v_iddiv.split('_')[1];

    if (typeof (INDEX) === 'undefined') { INDEX = 0; }
    else { INDEX = parseInt(INDEX); }

    var ArrayJson;
    var JsonDireccion = $('#hfJsonDirecciones').val();

    if (JsonDireccion.length == 0) {
        ArrayJson = [];
    }
    else {
        ArrayJson = JSON.parse(JsonDireccion);
    }

    for (var i = 0; i < ArrayJson.length; i++) {
        if (INDEX == ArrayJson[i].INDEX) {
            DIRECCIONCOMPLETA = $.trim(ArrayJson[i].DIRECCION);
            break;
        }
    }


    // if (DIRECCIONCOMPLETA.length == 0) {

    TIPOVIA = obtenerDescripcionCortaVia($('#' + v_iddiv + ' #slcvia').val());

    NOMBREVIA = $.trim($('#' + v_iddiv + ' #txtnombrevia').val());

    NROVIA = $.trim($('#' + v_iddiv + ' #txtnumerovia').val());

    if (NROVIA != '') {
        TIPO = $.trim($('#' + v_iddiv + ' #slcmznr').val());
    }
    else {
        TIPO = '';
    }

    

    INTERIOR = $.trim($('#' + v_iddiv + ' #txtinteriorvia').val());

    if (INTERIOR != '') {
        if ($.trim($('#' + v_iddiv + ' #slcmznr').val()) == 'NRO') {
            TIPONRO = 'INT';
        }
        if ($.trim($('#' + v_iddiv + ' #slcmznr').val()) == 'MZ') {
            TIPONRO = 'LT';
        }
    }
    else {
        TIPONRO = '';
    }

    if (TIPO == "MZ" || TIPO == "CD" || TIPO == "MOD") {
        TIPO = '';
        TIPONRO = '';
    } 

    TIPOZONA = obtenerDescripcionCortaZona($('#' + v_iddiv + ' #slczona').val());

    NOMBREZONA = $.trim($('#' + v_iddiv + ' #txtnombrezona').val());

    if ($.trim($('#' + v_iddiv + ' #txtubigeo').val()) != '') {
        //PAIS = $.trim($('#' + v_iddiv + ' #slcpais option:selected').html());
        DEPARTAMENTO = $.trim($('#' + v_iddiv + ' #slcdepa option:selected').html());
        PROVINCIA = $.trim($('#' + v_iddiv + ' #slcprov option:selected').html());
        DISTRITO = $.trim($('#' + v_iddiv + ' #slcdist option:selected').html());
    }

    DIRECCIONCOMPLETA = (TIPOVIA != '' ? TIPOVIA + ' ' : '') +
        (NOMBREVIA != '' ? NOMBREVIA + ' ' : '') +
        (TIPO != '' ? TIPO + '. ' : '') +
        (NROVIA != '' ? NROVIA + ' ' : '') +
        (TIPONRO != '' ? TIPONRO + ' ' : '') +
        //(INTERIOR != '' ? INTERIOR + ' ' : '') +
        //(TIPOZONA != '' ? TIPOZONA + ' ' : '') +
        //(NOMBREZONA != '' ? NOMBREZONA + ' ' : '') +
        //(DEPARTAMENTO != '' ? (DEPARTAMENTO + ' - ') : '') +
        (PROVINCIA != '' ? (PROVINCIA + ' - ') : '') +
        (DISTRITO != '' ? DISTRITO : '');
   

    //var direccion = $("#" + v_iddiv + " #txtdir").val();
    DIRECCIONCOMPLETA = DIRECCIONCOMPLETA === "" ? "lima-peru" : DIRECCIONCOMPLETA;
    //$("#" + v_iddiv + " #txtdir").val(DIRECCIONCOMPLETA);
    GMaps.geocode({
        address: DIRECCIONCOMPLETA,
        callback: function (results, status) {
            if (status == 'OK') {
                var latlng = results[0].geometry.location;
                map.setCenter(latlng.lat(), latlng.lng());
                if (map.markers.length == 0) {
                    map.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng(),
                        draggable: true,
                        title: vTitulo,
                        dragend: function () {
                            $("#mapaModal").modal("hide");
                            $("#modalGConfirmacion").modal("show");
                            vNewLat = this.getPosition().lat();
                            vNewLng = this.getPosition().lng();
                        },
                        infoWindow: {
                            content: '<p>' + vTitulo + '</p>'
                        }
                    });
                } else {
                    x = map.markers[0];
                    map.setCenter(latlng.lat(), latlng.lng());
                    x.setPosition(new google.maps.LatLng(latlng.lat(), latlng.lng()));
                }
                $("#" + v_iddiv + " #txtLatitud").val(latlng.lat()); $("#" + v_iddiv + " #txtLongitud").val(latlng.lng());
            }
        }
    });

}

function Geolocalizar() {
    GMaps.geolocate({
        success: function (position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);
            if (map.markers[0].getPosition().lng() == 0 && map.markers[0].getPosition().lat() == 0) {
                map.markers[0].setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                //$("#"+v_iddiv+" #txtLatitud").val(map.markers[0].getPosition().lat()); $("#"+v_iddiv+" #txtLongitud").val(map.markers[0].getPosition().lng());
            }
            infoCustom2("Se ha localizado su posición actual!");
        },
        beforeSend: function () { Bloquear("map") },
        error: function (error) {
            if (error.message.indexOf("Only secure origins are allowed") == 0) {
                tryAPIGeolocation();
            } else {
                alert('Geolocalizacion falló: ' + error.message);
            }
        },
        not_supported: function () {
            infoCustom("Tu navegador no soporta geolocalización!");
        },
        always: function () {

        }
    });
}

function tryAPIGeolocation() {
    jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", function (success) {
        if (success.accuracy > 2000) { //precision
            var position = { coords: { latitude: success.location.lat, longitude: success.location.lng } };
            map.setCenter(position.coords.latitude, position.coords.longitude);
            if (map.markers[0].getPosition().lng() == 0 && map.markers[0].getPosition().lat() == 0) {
                map.markers[0].setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                //  $("#" + v_iddiv + " #txtLatitud").val(map.markers[0].getPosition().lat()); $("#" + v_iddiv + " #txtLongitud").val(map.markers[0].getPosition().lng());
            }
            infoCustom2("Se ha localizado su posición actual!");
        } else {
            tryAPIGeolocation();
        }
    })
        .fail(function (err) {
            alert("API Geolocation error! \n\n" + err);
        });
};

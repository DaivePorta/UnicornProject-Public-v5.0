var asincrono = false;
var iImgAncho = 350;
var iImgAlto = 350;

function ClearTables(name) {
    if ($('#tbl' + name).length != 0) {
        $('#tbl' + name).remove();
    }
}

function TomaFoto() {
    $('#ModalFoto').modal('show');
    //$('#muestraVistaPrev').modal('show');
}

function OcultarFoto() {
    $('#ModalFoto').modal('hide');
}

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
    navigator.msGetUserMedia != function () {
        alertCustom('su navegador no soporta navigator.getUserMedia().');
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
    alertCustom('No fue posible obtener acceso a la camara.');
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
    $('#imgDNI').attr("src", url);
    $("#ModalFoto").modal('hide');
}

$('#imgDNI').removeAttr('src');
$('#imgDNI').attr('src', 'data:image/jpeg;base64,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');
$('#fileDNI').parent().parent().children('span').remove();
$('#fileDNI').val('');



function Grabar() {
    if ($('#txtnomcomercial').val() == "") {
        $('#txtnomcomercial').val($('#txtproducto').val());
    }
    if ($('#txtvolumen').val() == "") {
        $('#txtvolumen').val("1");
    }
    if ($('#cbovolumen').val() == "") {
        //Verificar Valor por defecto
        $('#cbovolumen').select2("val", "0007");
    }
    if ($('#txtPeso').val() == "") {
        $('#txtPeso').val("0.00");
    }
    $('#aspnetForm').submit();


}

//Actualizar Producto
function Actualizar() {
    var Errors = true;
    var Errors2 = false;

    if ($("#chkDetraccion").is(":checked")) {
        Errors = false
        if (vErrors(["cboDetraccion"])) {
            Errors = true
        }
    }

    if (vErrors(["cboexistencia", "cbogrupo", "cbosubgrupo", "cbounidad", "txtmodelo", "txtproducto", "codproducto", "cbomoneda"])) {
        Errors2 = true
        //Validaciones de obligatoriedad de: cbomarca
        //Valida que la marca para cuando es PRODUCTO TERMINADO CON CODIGO 02 sea obligatoria
        if ($('#cboexistencia').val() == "02" || $('#cboexistencia').val() == "0002") {
            if (vErrors(["cbomarca"])) {
                Errors2 = true;
            }
            else {
                Errors2 = false;
            }
        }
    }

    //Errors = validarProducto();
    if ($('#txtnomcomercial').val() == "") {
        $('#txtnomcomercial').val($('#txtproducto').val());
    }
    if ($('#txtvolumen').val() == "") {
        $('#txtvolumen').val("1");
    }
    if ($('#cbovolumen').val() == "") {
        //Valor por defecto UND
        $('#cbovolumen').select2("val", "0007");
    }


    if (Errors && Errors2) {
        var CTLG_CODE, ESTADO_IND, MOSTRAR_LISTA, TIPO_EXISTENCIA, SERIADA, SIN_SERIE, GRUPO_CODE, UNME_CODE, MARCA_CODE, MODELO,
      VOLUMEN, UNME_VOLUMEN, NOMPRODUCTO, CODE_ANTIGUO, CODE_AUXILIAR, MONE_CODE, NOM_COMERCIAL, OPCION, USUA_ID, IMAG_CODE,
      PROD_CODE, URLPROD, DETRAC_CODE, DETRAC_PORCENTAJE, PRECIO_IND, TIPO_BIEN, ISC, ENBRUTO_IND, ESP_ADICIONAL, PRES_CODE,PESO;

        //PPBIMAG
        var TIPO = ''; //NOT NULL COMMENT 'N=FOTO PERSONA NATUAL (FOTO PERSONAL), J=FOTO PERSONA JURIDICA (LOGO EMPRESA), A: ANVERSO CHOFER, R: REVERSO CHOFER .',
        var PPBIMAG = ''; //NOT NULL,

        OPCION = "4";

        CTLG_CODE = $('#slcEmpresa').val();
        ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
        MOSTRAR_LISTA = $("#chklista").is(':checked') ? 'S' : 'N';
        p_COMPRABLE_IND = $("#chkComprable").is(':checked') ? 'S' : 'N';
        TIPO_EXISTENCIA = $('#cboexistencia').val();
        SERIADA = $("#rbseriada").is(':checked') ? 'S' : 'N';
        SIN_SERIE = $("#rbsinserie").is(':checked') ? 'S' : 'N';
        GRUPO_CODE = $('#cbosubgrupo').val();
        UNME_CODE = $('#cbounidad').val();
        MARCA_CODE = $('#cbomarca').val();
        MODELO = $('#txtmodelo').val();
        VOLUMEN = $('#txtvolumen').val();
        UNME_VOLUMEN = $('#cbovolumen').val();
        NOMPRODUCTO = $('#txtproducto').val();
        CODE_ANTIGUO = $('#codproducto').val();
        CODE_AUXILIAR = $('#codauxiliar').val();
        MONE_CODE = $('#cbomoneda').val();
        NOM_COMERCIAL = $('#txtnomcomercial').val();
        USUA_ID = $('#ctl00_lblusuario').text();
        URLPROD = $('#txtfichatecnica').val();

        PRECIO_IND = $("#hfPrecioInd").val();       

        if ($("#chkDetraccion").is(":checked")) {
            DETRAC_CODE = $("#cboDetraccion").val();
            DETRAC_PORCENTAJE = $("#txtDetraccion").val();
        }
        else {
            DETRAC_CODE = "";
            DETRAC_PORCENTAJE = "0";
        }

        IMAG_CODE = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_imag_code').val();
        PROD_CODE = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val();

        TIPO_BIEN = $("input[name=rbTipoBien]:checked").val();
        if ($("input[name=rbTipoBien]").is(":checked") && $("#rbIsc").is(":checked")) {
            TIPO_BIEN = "GIS";
        }
        if (TIPO_BIEN == "GIS") {
            ISC = $("#txtIsc").val();
        }
        else {
            ISC = "0";
        }
        ENBRUTO_IND = ($("#chkProductoEnBruto").is(":checked")) ? "S" : "N";
        ESP_ADICIONAL = $("#txtEspAdicional").val();
        PRES_CODE = $("#cboPresentacion").val();
        PESO = $("#txtPeso").val();



        var data = new FormData();

        data.append('OPCION', OPCION);
        data.append('CTLG_CODE', CTLG_CODE);
        data.append('ESTADO_IND', ESTADO_IND);
        data.append('MOSTRAR_LISTA', MOSTRAR_LISTA);
        data.append('TIPO_EXISTENCIA', TIPO_EXISTENCIA);
        data.append('SERIADA', SERIADA);
        data.append('SIN_SERIE', SIN_SERIE);
        data.append('GRUPO_CODE', GRUPO_CODE);
        data.append('UNME_CODE', UNME_CODE);
        data.append('MARCA_CODE', MARCA_CODE);
        data.append('MODELO', MODELO);
        data.append('VOLUMEN', VOLUMEN);
        data.append('UNME_VOLUMEN', UNME_VOLUMEN);
        data.append('NOMPRODUCTO', NOMPRODUCTO);
        data.append('CODE_ANTIGUO', CODE_ANTIGUO);
        data.append('CODE_AUXILIAR', CODE_AUXILIAR);
        data.append('MONE_CODE', MONE_CODE);
        data.append('NOM_COMERCIAL', NOM_COMERCIAL);
        data.append('USUA_ID', USUA_ID);


        data.append('PROD_CODE', PROD_CODE);
        data.append('IMAG_CODE', IMAG_CODE);
        data.append('URLPROD', URLPROD);
        data.append('DETRAC_CODE', DETRAC_CODE);
        data.append('DETRAC_PORCENTAJE', DETRAC_PORCENTAJE);
        data.append('PRECIO_IND', PRECIO_IND);

        data.append('TIPO_BIEN', TIPO_BIEN);
        data.append('ISC', ISC);
        data.append('ENBRUTO_IND', ENBRUTO_IND);
        data.append('ESP_ADICIONAL', ESP_ADICIONAL);
        data.append('PRES_CODE', PRES_CODE);

        //Recortar imagen 
        var url = $('#imgDNI').attr("src");
        resizeBase64Img(url.split("base64,")[1], 500, 500).then(function (newImg) { $('#imgDNI').attr("src", newImg.attr("src")); });
        PPBIMAG = $("#imgDNI").attr("src");
        data.append('RUTA_IMAGEN', $("#imgDNI").attr("src"));
        data.append('PESO', PESO);
        data.append('p_COMPRABLE_IND', p_COMPRABLE_IND);
        

        Bloquear("producto");

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMPROD.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            Desbloquear("producto");
            var datos = $.parseJSON(res);
            if (datos.length > 0) {
                if (datos[0].CODE_PRODUCTO == "CODIGO") {
                    alertCustom('Producto ya registrado!!!<br>Verifique CODIGO de producto.');
                    $("#codproducto").focus();
                }
                else if (datos[0].CODE_PRODUCTO == "NOMBRE") {
                    alertCustom('Producto ya registrado!!!<br>Verifique NOMBRE de producto.');
                    $("#txtproducto").focus();
                }
                else {
                    $("#slcEmpresa").attr("disabled", "disabled");
                    exito();
                }
            }
            else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("producto");
        });

    }

}

var NMMPROR = function () {
    datos2 = null;

    var validacion = function () {

        var frmPersonaNatural = $("#aspnetForm"); //aspnetForm es el formulario por defecto del ASP
        var errorNatural = $('.alert-error', frmPersonaNatural);
        var successNatural = $('.alert-success', frmPersonaNatural);

        frmPersonaNatural.validate({
            // debug: true,
            // onkeyup: true,
            //onclick: true,
            errorElement: 'span', //el input tien por defecto el span para mostrar el error
            errorClass: 'help-inline', // agrega la clase help-line en la cual se mostrara el error
            focusInvalid: false, // no se muestra el foco en el elemento invalido
            ignore: "",
            invalidHandler: function (event, validator) { //se ejecuta al no cumplirse las reglas              
                successNatural.hide();
                errorNatural.show();
                App.scrollTo(errorNatural, -200);
            },

            highlight: function (element) { // error para cada input
                $(element)
                    .closest('.help-inline').removeClass('ok'); // quita el icono de ok (aspa)
                $(element)
                    .closest('.control-group').removeClass('success').addClass('error'); // cambia la clase de todo el agrupador a rojo
            },

            unhighlight: function (element) { // revierte el error a success
                $(element)
                    .closest('.control-group').removeClass('error');
            },

            success: function (label) {
                label
                    .addClass('valid').addClass('help-inline ok') // agrega el icono del check
                .closest('.control-group').removeClass('error').addClass('success'); // quita el color rpjp y lo coloca en verde  

            },

            submitHandler: function (form) {
                successNatural.show();
                errorNatural.hide();
                var CTLG_CODE, ESTADO_IND, MOSTRAR_LISTA, TIPO_EXISTENCIA, SERIADA, SIN_SERIE, GRUPO_CODE, UNME_CODE, MARCA_CODE, MODELO,
                    VOLUMEN, UNME_VOLUMEN, NOMPRODUCTO, CODE_ANTIGUO, CODE_AUXILIAR, MONE_CODE, NOM_COMERCIAL, OPCION, USUA_ID,
                    URLPROD, DETRAC_CODE, DETRAC_PORCENTAJE, TIPO_BIEN, ISC, ENBRUTO_IND, ESP_ADICIONAL, PRES_CODE,PESO;
                //PPBIMAG
                var TIPO = ''; //NOT NULL COMMENT 'N=FOTO PERSONA NATUAL (FOTO PERSONAL), J=FOTO PERSONA JURIDICA (LOGO EMPRESA), A: ANVERSO CHOFER, R: REVERSO CHOFER .',
                var PPBIMAG = ''; //NOT NULL,

                OPCION = "1";

                PPBIMAG = $("#imgDNI").attr("src");

                CTLG_CODE = $('#slcEmpresa').val();
                ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
                MOSTRAR_LISTA = $("#chklista").is(':checked') ? 'S' : 'N';
                p_COMPRABLE_IND = $("#chkComprable").is(':checked') ? 'S' : 'N';
                TIPO_EXISTENCIA = $('#cboexistencia').val();
                SERIADA = $("#rbseriada").is(':checked') ? 'S' : 'N';
                SIN_SERIE = $("#rbsinserie").is(':checked') ? 'S' : 'N';
                GRUPO_CODE = $('#cbosubgrupo').val();
                UNME_CODE = $('#cbounidad').val();
                MARCA_CODE = $('#cbomarca').val();
                MODELO = $('#txtmodelo').val();
                VOLUMEN = $('#txtvolumen').val();
                UNME_VOLUMEN = $('#cbovolumen').val();
                NOMPRODUCTO = $('#txtproducto').val();
                CODE_ANTIGUO = $('#codproducto').val();
                CODE_AUXILIAR = $('#codauxiliar').val();
                MONE_CODE = $('#cbomoneda').val();
                NOM_COMERCIAL = $('#txtnomcomercial').val();
                USUA_ID = $('#ctl00_lblusuario').text();
                URLPROD = $('#txtfichatecnica').val();

                if ($("#chkDetraccion").is(":checked")) {
                    DETRAC_CODE = $("#cboDetraccion").val();
                    DETRAC_PORCENTAJE = $("#txtDetraccion").val();
                }
                else {
                    DETRAC_CODE = "";
                    DETRAC_PORCENTAJE = "0";
                }
                TIPO_BIEN = $("input[name=rbTipoBien]:checked").val();
                if ($("input[name=rbTipoBien]").is(":checked") && $("#rbIsc").is(":checked")) {
                    TIPO_BIEN = "GIS";
                }
                if (TIPO_BIEN == "GIS") {
                    ISC = $("#txtIsc").val();
                }
                else {
                    ISC = "0";
                }
                ENBRUTO_IND = ($("#chkProductoEnBruto").is(":checked")) ? "S" : "N";
                ESP_ADICIONAL = $("#txtEspAdicional").val();
                PRES_CODE = $("#cboPresentacion").val();
                PESO = $("#txtPeso").val();

                var data = new FormData();

                data.append('OPCION', OPCION);
                data.append('CTLG_CODE', CTLG_CODE);
                data.append('ESTADO_IND', ESTADO_IND);
                data.append('MOSTRAR_LISTA', MOSTRAR_LISTA);
                data.append('TIPO_EXISTENCIA', TIPO_EXISTENCIA);
                data.append('SERIADA', SERIADA);
                data.append('SIN_SERIE', SIN_SERIE);
                data.append('GRUPO_CODE', GRUPO_CODE);
                data.append('UNME_CODE', UNME_CODE);
                data.append('MARCA_CODE', MARCA_CODE);
                data.append('MODELO', MODELO);
                data.append('VOLUMEN', VOLUMEN);
                data.append('UNME_VOLUMEN', UNME_VOLUMEN);
                data.append('NOMPRODUCTO', NOMPRODUCTO);
                data.append('CODE_ANTIGUO', CODE_ANTIGUO);
                data.append('CODE_AUXILIAR', CODE_AUXILIAR);
                data.append('MONE_CODE', MONE_CODE);
                data.append('NOM_COMERCIAL', NOM_COMERCIAL);
                data.append('USUA_ID', USUA_ID);
                data.append('URLPROD', URLPROD);
                data.append('DETRAC_CODE', DETRAC_CODE);
                data.append('DETRAC_PORCENTAJE', DETRAC_PORCENTAJE);
                data.append('PPBIMAG', PPBIMAG);
                data.append('TIPO_BIEN', TIPO_BIEN);
                data.append('ISC', ISC);
                data.append('ENBRUTO_IND', ENBRUTO_IND);
                data.append('ESP_ADICIONAL', ESP_ADICIONAL);
                data.append('PRES_CODE', PRES_CODE);
                data.append('PESO', PESO);
                data.append('p_COMPRABLE_IND', p_COMPRABLE_IND)
                data.append('RUTA_IMAGEN', $("#imgDNI").attr("src"));

                Bloquear("producto");
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/NM/ajax/NMMPROD.ASHX",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                })
        .success(function (res) {
            Desbloquear("producto");
            console.log(res);
            if (res != null) {
                var datos = $.parseJSON(res);
                if (datos.length > 0) {
                    if (datos[0].SUCCESS == "OK") {

                        if (datos[0].CODE_PRODUCTO == "CODIGO") {
                            alertCustom('Producto ya registrado!!!<br>Verifique CODIGO de producto.');
                            $("#codproducto").focus();
                        }
                        else if (datos[0].CODE_PRODUCTO == "NOMBRE") {
                            alertCustom('Producto ya registrado!!!<br>Verifique NOMBRE de producto.');
                            $("#txtproducto").focus();
                        }
                        else {
                            $("#slcEmpresa").attr("disabled", "disabled");
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val(datos[0].CODE_PRODUCTO);

                            $('#hf_prod_code').val(datos[0].CODE_PRODUCTO);
                            $('#txtcodigo').val(datos[0].CODE_PRODUCTO);
                            $('#hf_imag_code').val(datos[0].CODE_IMAGEN);
                            exito();
                            $("#grabarProducto").html("<i class='icon-pencil'></i> Modificar");
                            $("#grabarProducto").attr("href", "javascript:Actualizar();");                           
                        }
                    }
                }
            }
            else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("producto");
        })
            }
        });
    }

    var plugins = function () {
        $('#slcEmpresa,#cbogrupo,#cbosubgrupo,#cbounidad,#cbomarca,#cbomoneda,#cboexistencia,#cbovolumen,#cboDetraccion,#cboPresentacion').select2();
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#slcEmpresa').empty();
                    $('#slcEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#slcEmpresa').select2('val', '');
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#slcEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#slcEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $('#slcEmpresa').select2('val', '');
        }
    }

    var fillcboExistencias = function () {
        Bloquear($($("#cboexistencia").parents("div")[0]).attr("id"));
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=3",
            contenttype: "application/json;",
            datatype: "json",
            cache: true,
            async: false,
            success: function (datos) {
                Desbloquear($($("#cboexistencia").parents("div")[0]).attr("id"));
                $('#cboexistencia').empty();
                $('#cboexistencia').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboexistencia').append('<option value="' + datos[i].Codigo + '" almacenable="' + datos[i].ALMACENABLE_IND + '" >' + datos[i].Descripcion + '</option>');
                    }
                }
                $('#cboexistencia').select2('val', '');
            },
            error: function (msg) {
                Desbloquear($($("#cboexistencia").parents("div")[0]).attr("id"));
                alertCustom("Tipos de Existencias no se listaron correctamente");
            }
        });
    }

    var fillCboGrupos = function () {
        Bloquear($($("#cbogrupo").parents("div")[0]).attr("id"));
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=4&CTLG_CODE=" + $.trim($('#slcEmpresa').val()) + "&OPCION2=TX&CODE_EXIS=" + $.trim($('#cboexistencia').val()),
            async: false,
            success: function (datos) {
                Desbloquear($($("#cbogrupo").parents("div")[0]).attr("id"));
                $('#cbogrupo').empty();
                $('#cbogrupo').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbogrupo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbogrupo').select2('val', '');
            },
            error: function (msg) {
                Desbloquear($($("#cbogrupo").parents("div")[0]).attr("id"));
                alertCustom("Grupos no se listaron correctamente");
            }
        });
    }

    var fillCboSubgrupos = function () {
        Bloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=6&DEPEND_CODE=" + $.trim($('#cbogrupo').val()) + "&CTLG_CODE=" + $.trim($('#slcEmpresa').val()),
            async: false,
            success: function (datos) {
                Desbloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
                $('#cbosubgrupo').empty();
                $('#cbosubgrupo').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbosubgrupo').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                    }
                }
                $('#cbosubgrupo').select2('val', '');
            },
            error: function (msg) {
                Desbloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
                alertCustom("Subgrupos no se listaron correctamente");
            }
        });
    }

    var fillCboMarcas = function () {
        Bloquear($($("#cbomarca").parents("div")[0]).attr("id"));
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmgmar.ashx?OPCION=6&SUBGRUP_CODE=" + $.trim($('#cbosubgrupo').val()),
            async: false,
            success: function (datos) {
                Desbloquear($($("#cbomarca").parents("div")[0]).attr("id"));
                $('#cbomarca').empty();
                $('#cbomarca').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbomarca').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbomarca').select2('val', '');
            },
            error: function (msg) {
                Desbloquear($($("#cbomarca").parents("div")[0]).attr("id"));
                alertCustom("Marcas no se listaron correctamente");
            }
        });
    }

    var fillCboPresentacion = function () {
        Bloquear($($("#cboPresentacion").parents("div")[0]).attr("id"));
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmprod.ashx?OPCION=17",
            async: false,
            success: function (datos) {
                Desbloquear($($("#cboPresentacion").parents("div")[0]).attr("id"));
                if (datos != null && typeof datos[0].CODIGO != "undefined") {
                    if (datos.length > 0) {
                        $('#cboPresentacion').empty();
                        $('#cboPresentacion').append('<option></option><option value="">NINGUNA</option>');
                        if (datos != null) {
                            for (var i = 0; i < datos.length; i++) {
                                $('#cboPresentacion').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].PRESENTACION + '</option>');
                            }
                        }
                        $('#cboPresentacion').select2('val', '');
                    }
                }
            },
            error: function (msg) {
                Desbloquear($($("#cboPresentacion").parents("div")[0]).attr("id"));
                alertCustom("Presentaciones no se listaron correctamente");
            }
        });
    }

    var fillCboUnidad = function () {
        Bloquear($($("#cbounidad").parents("div")[0]).attr("id"));
        Bloquear($($("#cbovolumen").parents("div")[0]).attr("id"));
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmunme.ashx?flag=7" +
                "&codi=" +
                "&estado=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbounidad,#cbovolumen').empty();
                $('#cbounidad,#cbovolumen').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbounidad,#cbovolumen').append('<option value="' + datos[i].CODIGO + '"  corto="' + datos[i].UNME + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbounidad,#cbovolumen').select2('val', '');
            },
            error: function (msg) {
                alertCustom("Unidades de medida no se listaron correctamente");
            }
        }).done(function () {
            Desbloquear($($("#cbounidad").parents("div")[0]).attr("id"));
            Desbloquear($($("#cbovolumen").parents("div")[0]).attr("id"));
            if (datos2 != null && $("#cbounidad").val() == "") {
                $('#cbounidad').select2("val", datos2[0].UNIDAD).change();
            }
            if (datos2 != null && $("#cbovolumen").val() == "") {
                $('#cbovolumen').select2("val", datos2[0].UNME_VOLUMEN).change();
            }

        });
    }

    var fillCboDetraccion = function () {
        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMPROD.ASHX?&OPCION=15",
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                $('#cboDetraccion').empty();
                $('#cboDetraccion').append('<option></option>');
                $('#cboDetraccion').select2('val', '');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].TIPO_EXISTENCIA_CODE == $('#cboexistencia').val()) {
                            $('#cboDetraccion').append('<option value="' + datos[i].CODIGO + '" data-percent="' + datos[i].PORCENTAJE + '" data-info="' + datos[i].INFORMACION + '" >' + datos[i].DEFINICION + '</option>');
                        }
                        //.Replace(vbCrLf, "\n").Replace("""", "\""")
                    }
                } else {
                    $('#cboDetraccion').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Detracciones no se listaron correctamente");
            }
        });
    }

    var fillCboMoneda = function () {
        var dPermanente = ObtenerDatoPermanente("jsonMonedaNOMDOCC");
        if (dPermanente == null) {
            Bloquear($($("#cbomoneda").parents("div")[0]).attr("id"));
            $.ajax({
                type: "post",
                url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                success: function (datos) {
                    $('#cbomoneda').empty();
                    $('#cbomoneda').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonMonedaNOMDOCC", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cbomoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                },
                error: function (msg) {
                    alertCustom("Monedas no se listaron correctamente");
                }
            }).done(function () {
                Desbloquear($($("#cbomoneda").parents("div")[0]).attr("id"));
                if (datos2 != null && $("#cbomoneda").val() == "") {
                    $('#cbomoneda').select2("val", datos2[0].MONEDA).change();
                }
            });
        } else {
            $('#cbomoneda').empty().append('<option></option>');
            dPermanente = JSON.parse(dPermanente);
            for (var i = 0; i < dPermanente.length; i++) {
                $('#cbomoneda').append('<option value="' + dPermanente[i].CODIGO + '" simbolo="' + dPermanente[i].SIMBOLO + '" data-tipo="' + dPermanente[i].TIPO + '">' + dPermanente[i].DESCRIPCION + '</option>');
            }
        }

    }

    var cargaInicial = function () {

        inputFile("fileDNI", "imgDNI", "data:image/jpeg;base64,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", iImgAncho, iImgAlto, 0.5);

        let sCodEmpresa = ObtenerQueryString("sCodEmpresa");
        let cod = ObtenerQueryString("codigo");

        if (cod == null || sCodEmpresa == null) {
            $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
        if (cod != null && sCodEmpresa != null) {
            $("#slcEmpresa").attr("disabled", "disabled");
            //Limpiar el required para no validar por formulario( la validacion se realiza de forma distinta)
            $('#codproducto').removeClass("required");
            $('#txtproducto').removeClass("required");
            $('#cbogrupo').removeClass("required");
            $('#cbounidad').removeClass("required");
            $('#txtmodelo').removeClass("required");
            $('#txtproducto').removeClass("required");
            $('#cbomoneda').removeClass("required");
            $('#txtvolumen').removeClass("required");
            Bloquear("producto");
            $.ajax({
                type: "POST",
                url: "vistas/NM/ajax/NMMPROD.ASHX?OPCION=3&PROD_CODE=" + cod + "&CTLG_CODE=" + sCodEmpresa,
                contentType: "application/json;",
                dataType: "json",
                async: true,
                success: function (datos) {

                    datos2 = datos;
                    //$('#p_detalles').slideDown(200);                   
                    $("#grabarProducto").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabarProducto").attr("href", "javascript:Actualizar();");

                    $('#slcEmpresa').select2("val", datos[0].CTLG_CODE).change();
                    $('#txtcodigo').val(datos[0].PROD_CODE);
                    $('#txtPeso').val(datos[0].PESO);

                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_imag_code').val(datos[0].IMAG_CODE);
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val(datos[0].PROD_CODE);


                    if (datos[0].ESTADO == 'A') {
                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                    if (datos[0].LISTA == 'S') {
                        $('#uniform-chklista span').removeClass().addClass("checked");
                        $('#chklista').attr('checked', true);
                    }
                    else {
                        $('#uniform-chklista span').removeClass();
                        $('#chklista').attr('checked', false);
                    }

                    if (datos[0].COMPRABLE_IND == 'S') {
                        $('#uniform-chkComprable span').removeClass().addClass("checked");
                        $('#chkComprable').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkComprable span').removeClass();
                        $('#chkComprable').attr('checked', false);
                    }
 
                    $('#cboexistencia').append("<option value='" + datos[0].CODE_EXISTENCIA + "' almacenable='" + datos[0].ALMACENABLE_IND + "'>" + datos[0].DESC_EXISTENCIA + "<option>").select2("val", datos[0].CODE_EXISTENCIA);

                    $('#txtPeso').val(datos[0].PESO);
                    if ($("#cboexistencia option:selected").attr("almacenable") == "S") {
                        $("#txtPeso").removeAttr("disabled");

                    } else {
                        $("#txtPeso").attr("disabled", "disabled")
                    }

                    // $('#chkDetraccion').change();
                    // $('#cboDetraccion').append('<option value="' + datos[i].DETRACCION_CODE + '" data-percent="' + datos[i].PORCENTAJE + '" data-info="' + datos[i].INFORMACION + '" >' + datos[i].DEFINICION + '</option>');
                    if (datos[0].DETRACCION_CODE != null && datos[0].DETRACCION_CODE != "") {
                        $('#uniform-chkDetraccion span').removeClass().addClass("checked");
                        $("#chkDetraccion").attr("checked", true);
                        fillCboDetraccion();
                        $("#cboDetraccion").select2("val", datos[0].DETRACCION_CODE).change();
                        $("#cboDetraccion").removeAttr("disabled");
                        $("#txtDetraccion").val(datos[0].DETRACCION);
                    }
                    else {
                        $('#uniform-chkDetraccion span').removeClass();
                        $("#chkDetraccion").attr("checked", false);
                    }

                    if (datos[0].SERIADA == 'S') {
                        $('#uniform-rbseriada span').removeClass().addClass("checked");
                        $('#rbseriada').attr('checked', true);
                    }
                    else {
                        $('#uniform-rbseriada span').removeClass();
                        $('#rbseriada').attr('checked', false);
                    }

                    if (datos[0].NO_SERIADA == 'S') {
                        $('#uniform-rbsinserie span').removeClass().addClass("checked");
                        $('#rbsinserie').attr('checked', true);
                    }
                    else {
                        $('#uniform-rbsinserie span').removeClass();
                        $('#rbsinserie').attr('checked', false);
                    }

                    //$('#cbogrupo').select2("val", datos[0].GRUPO).change();                   
                    $('#cbogrupo').append("<option value='" + datos[0].GRUPO + "'>" + datos[0].DESC_GRUPO + "<option>").select2("val", datos[0].GRUPO);
                    //$('#cbosubgrupo').select2("val", datos[0].SUBGRUPO).change();
                    $('#cbosubgrupo').append("<option value='" + datos[0].SUBGRUPO + "'>" + datos[0].DESC_SUBGRUPO + "<option>").select2("val", datos[0].SUBGRUPO);
                    //$('#cbounidad').select2("val", datos[0].UNIDAD).change();
                    $('#cbounidad').append("<option value='" + datos[0].UNIDAD + "' corto='" + datos[0].DESC_CORTA_UNIDAD_DESPACHO + "'>" + datos[0].DESC_UNIDAD_DESPACHO + "<option>").select2("val", datos[0].UNIDAD);
                    //$('#cbomarca').select2("val", datos[0].MARCA).change();
                    $('#cbomarca').append("<option value='" + datos[0].MARCA + "'>" + datos[0].DESC_MARCA + "<option>").select2("val", datos[0].MARCA);
                    $('#txtmodelo').val(datos[0].MODELO);
                    $('#txtvolumen').val(datos[0].VOLUMEN);
                    //$('#cbovolumen').select2("val", datos[0].UNME_VOLUMEN).change();
                    $('#cbovolumen').append("<option value='" + datos[0].UNME_VOLUMEN + "' corto='" + datos[0].DESC_CORTA_UNME_VOLUMEN + "'>" + datos[0].DESC_CORTA_UNME_VOLUMEN + "<option>").select2("val", datos[0].UNME_VOLUMEN);
                    $('#txtproducto').val(datos[0].NOMBRE);
                    $('#codproducto').val(datos[0].ANTIGUO);
                    $('#codauxiliar').val(datos[0].AUXILIAR);
                    $('#cbomoneda').select2("val", datos[0].MONEDA).change();
                    //$('#cbomoneda').val(datos[0].MONEDA);
                    $('#txtnomcomercial').val(datos[0].COMERCIAL);
                    $('#txtfichatecnica').val(datos[0].URLPROD);

                    $('#imgDNI').attr("src", datos[0].RUTA_IMAGEN);                

                    if (datos[0].TIPO_BIEN == "GIS") {
                        $("#rbIsc").attr("checked", true);
                        $("#rbIsc").parent("span").addClass("checked");

                        $("#txtIsc").val(datos[0].ISC)
                        $("#txtIsc").removeAttr("disabled");
                        $('#txtIsc').addClass("required");
                    }
                    else if (datos[0].TIPO_BIEN == "INA") {
                        $("#rbInafecto").attr("checked", true);
                        $("#rbInafecto").parent("span").addClass("checked");
                        $("#rbGravado").parent("span").removeClass("checked");
                        $("#rbIsc").attr("disabled", "disabled");
                    }
                    else if (datos[0].TIPO_BIEN == "EXO") {
                        $("#rbExonerado").attr("checked", true);
                        $("#rbExonerado").parent("span").addClass("checked");
                        $("#rbGravado").parent("span").removeClass("checked");
                        $("#rbIsc").attr("disabled", "disabled");
                    }

                    if (datos[0].ENBRUTO_IND == 'S') {
                        $('#uniform-chkProductoEnBruto span').removeClass().addClass("checked");
                        $('#chkProductoEnBruto').attr('checked', true);
                        $('#txtvolumen').attr("disabled", "disabled");
                        $('#cbovolumen').attr("disabled", "disabled");
                        $("#cboPresentacion").attr("disabled", "disabled");
                    }
                    else {
                        $('#uniform-chkProductoEnBruto span').removeClass();
                        $('#chkProductoEnBruto').attr('checked', false);
                    }
                    // $("#cboPresentacion").select2("val", datos[0].CODIGO_PRESENTACION).change();
                    $("#cboPresentacion").append('<option value="' + datos[0].CODIGO_PRESENTACION + '" >' + datos[0].DESC_PRESENTACION + '</option>').select2("val", datos[0].CODIGO_PRESENTACION);

                    $("#txtEspAdicional").val(datos[0].ESP_ADICIONAL);

                    $("#hfPrecioInd").val(datos[0].PRECIO_IND); 
                    Desbloquear("producto");         
                },
                error: function (msg) {
                    MostrarError(msg, "producto");
                }
            });

        }

        //$('#p_detalles').slideUp(200);
    }

    var eventoControles = function () {

        $("#txtPeso").on("click", function () {
            if ($(this).attr("disabled")!="disabled") {
                $(this).select();
            }
        });

        $('#cbomoneda').on('change', function () {
            $(".simboloMoneda").html($('#cbomoneda :selected').attr("simbolo"));
        });

        $('#slcEmpresa').on('change', function () {           
            $("#cboexistencia").change();
        });

        $("#btnGenerarCode").on("click", function () {
            if (!vErrors(["cbosubgrupo"])) {
                return;
            }
            var subGrupo = $('#cbosubgrupo').val();
            var empresa = $('#slcEmpresa').val();
            var sCode = fnGenerarCode(empresa, subGrupo);

            $("#codproducto").val(sCode);
        });

        $('#cboexistencia').on('change', function () {
            var cod = ObtenerQueryString("codigo");
            if ($("#cboexistencia option:selected").attr("almacenable") == "S") {
                $("#txtPeso").removeAttr("disabled");
                if (typeof cod != 'undefined' && cod != '') {
                    $("#txtPeso").val("");
                }
            } else {
                $("#txtPeso").attr("disabled", "disabled")
                $("#txtPeso").val("0.000");
            }

            fillCboGrupos();
            //Refresca los subgrupos en caso de cambio luego de que se selecciono un subgrupo         
            $('#cbosubgrupo').empty(); $('#cbosubgrupo').append('<option></option>'); $('#cbosubgrupo').select2('val', '');
            //Refresca las marcas en caso de cambio
            $('#cbomarca').empty(); $('#cbomarca').append('<option></option>'); $('#cbomarca').select2('val', '');
            fillCboDetraccion();
            $("#txtDetraccion").val("");

            //Valida que la marca para cuando es PRODUCTO TERMINADO CON CODIGO 02 sea obligatoria
            if ($('#cboexistencia').val() == "02" || $('#cboexistencia').val() == "0002") {
                $('#cbomarca').addClass("required");
            }
            else {
                $('#cbomarca').removeClass("required");
            }

            if (parseFloat($('#cboexistencia').val()) == 99) {
                $('#txtvolumen').val("1").attr("disabled", "disabled");
                $('#cbovolumen').select2("val", "0007").attr("disabled", "disabled");
                $("#cbounidad").select2("val", "0007").attr("disabled", "disabled");

                $("#cbomarca").select2("val", "").attr("disabled", "disabled").removeClass("required");
                $("#cboPresentacion").select2("val", "").attr("disabled", "disabled");
                $("#chkProductoEnBruto").attr("disabled", "disabled").prop('checked', false).parent().removeClass('checked');

            }
            else {
                $('#txtvolumen').val("").removeAttr("disabled");
                $('#cbovolumen').select2("val", "").removeAttr("disabled");
                $("#cbounidad").select2("val", "0007").removeAttr("disabled");
                $("#cbomarca").select2("val", "").removeAttr("disabled");
                $('#cboPresentacion').val("").removeAttr("disabled");
            }


            if ($('#cboexistencia').val() == "02" || $('#cboexistencia').val() == "0002" || //PRODUCTO TERMINADO
                $('#cboexistencia').val() == "03" || $('#cboexistencia').val() == "0003" || //MATERIA PRIMA
                $('#cboexistencia').val() == "05" || $('#cboexistencia').val() == "0005"  //MATERIALES AUXILIARES
                ) {
                $("#chkProductoEnBruto").removeAttr("disabled");
            } else {
                $("#chkProductoEnBruto").attr("disabled", "disabled");
                $('#chkProductoEnBruto').prop('checked', false).parent().removeClass('checked');
                // $("#cboPresentacion").empty().append("<option></option><option>NINGUNA</option>").select2("val", "").attr("disabled", "disabled");
                $("#cboPresentacion").select2("val", "");
            }

        });

        $('#cbogrupo').on('change', function () {
            fillCboSubgrupos();
            $('#cbomarca').empty(); $('#cbomarca').append('<option></option>'); $('#cbomarca').select2('val', '');
        });

        $('#cbosubgrupo').on('change', function () {
            fillCboMarcas();

        });

        $('#cbovolumen').on('change', function () {
            var auxiliar = $('#cbovolumen option:selected').attr("corto");
            $($("#s2id_cbovolumen a span")[0]).html(auxiliar);
        });

        $('#txtmodelo').on('blur', function () {
            var sgrupo = $("#cbosubgrupo option:selected").text();
            var marca = $("#cbomarca option:selected").text();
            var modelo = $("#txtmodelo").val();
            $("#txtproducto").val(sgrupo + ' ' + marca + ' ' + modelo);
        });

        $('#txtfichatecnica').on('keyup', function () {
            if (window.event.keyCode == 13) {

                var purl = $("#txtfichatecnica").val();
                if ($("#txtfichatecnica").val().indexOf("http://") < 0)
                    purl = "http://" + purl;

                $("#myModalLabel2").html("VISTA PREVIA: " + purl);

                $(".frame").attr("src", purl);

                $('#muestraVistaPrev').modal('show');
            }
        });

        $('#chkDetraccion').on('change', function () {
            $("#cboDetraccion").select2("val", "");
            $("#txtDetraccion").val("");
            if ($("#chkDetraccion").is(":checked")) {
                $("#cboDetraccion").removeAttr("disabled", "disabled");
                $("#cboDetraccion").attr("required", "required");
            }
            else {
                $("#cboDetraccion").attr("disabled", "disabled");
                $("#cboDetraccion").removeAttr("required");
            }
        });

        $('#cboDetraccion').on('change', function () {
            if (typeof $("#modalDescripcion_body").html() != "undefined")
                $("#modalDescripcion_body").html("No hay información disponible.");

            if ($("#chkDetraccion").is(":checked")) {
                if ($("#cboDetraccion").val() != "") {
                    if ($("#cboDetraccion option:selected").attr("data-percent") != "") {

                        $("#txtDetraccion").val($("#cboDetraccion option:selected").attr("data-percent"));

                        var texto = $("#cboDetraccion option:selected").attr("data-info");
                        if (texto == "")
                            texto = "No hay información disponible.";

                        if (typeof $("#modalDescripcion_body").html() != "undefined")
                            $("#modalDescripcion_body").html(texto);
                        else
                            crearmodal("modalDescripcion", "Información", texto);


                    } else {
                        //Aqui se debe indicar el valor por defecto de la detracción, en caso no se halla definido
                        $("#txtDetraccion").val("0");
                    }
                }
            }
        });

        $('#chkProductoEnBruto').on("change", function () {

            if ($("#chkProductoEnBruto").is(":checked")) {

                // $("#cboPresentacion").empty().append("<option></option><option>NINGUNA</option>").select2("val", "");
                $('#txtvolumen').val("1").attr("disabled", "disabled");
                $('#cbovolumen').select2("val", "0007").attr("disabled", "disabled");
                $("#cboPresentacion").select2("val", "0002")
                $("#cboPresentacion").attr("disabled", "disabled");
            }
            else {
                $("#cboPresentacion").removeAttr("disabled");
                $("#cboPresentacion").select2("val", "")
                $('#txtvolumen').val("").removeAttr("disabled");
                $('#cbovolumen').select2("val", "").removeAttr("disabled");
            }
        });
     
        $("#info_btnf").click(function () {
            if ($("#txtDetraccion").val() != "")
                $("#modalDescripcion").modal("show");
        });

        $("input[name=rbTipoBien]").on("change", function () {
            if ($(this).val() == "GRA") {
                $("#rbIsc").removeAttr("disabled");

            } else {
                $("#rbIsc").attr("disabled", "disabled");
                $('#uniform-rbIsc span').removeClass();
                $('#rbIsc').attr('checked', false);
                $("#txtIsc").attr("disabled", "disabled");
                $("#txtIsc").val("");
                $('#txtIsc').removeClass("required");
            }
        });

        $("#rbIsc").on("change", function () {
            if ($("#rbIsc").is(":checked")) {
                $("#txtIsc").removeAttr("disabled");
                $('#txtIsc').addClass("required");
            }
            else {
                $("#txtIsc").attr("disabled", "disabled");
                $("#txtIsc").val("");
                $('#txtIsc').removeClass("required");
            }
        });


        $('#btnNombreAlt').on('click', function () {
            let codProducto = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val();

            if (codProducto.trim() !== "") {
                fnListarNombreAlt(codProducto);
                $('#ModalNombreAlt').modal('show');
            } else {
                infoCustom("El código del producto debe estar generado.");
            }

        });

        $('#btnAddNombreAlt').on('click', function () {
            fnAddNombreAlterno($('#txtNombreAlt').val().trim());
        });

        $('#txtNombreAlt').keyup(function (e) {
            if (e.keyCode == 13) {
                fnAddNombreAlterno($(this).val().trim());
            }
        });

        $('#ModalNombreAlt').on('shown.bs.modal', function () {
            $('#txtNombreAlt').focus();
        });
      
    }



    var fnListarNombreAlt = function (pCodProducto) {
        $.ajax({
            type: "post",
            url: "vistas/NM/ajax/NMMPROD.ashx?OPCION=LNA&PROD_CODE=" + pCodProducto,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTableNombreAlt.fnClearTable();
                if (!isEmpty(datos)) {
                    oTableNombreAlt.fnAddData(datos);
                }
            },
            error: function (msg) {
                noexitoCustom("Error al listar nombre alternativo.");
            }
        });
    }



    var fnAddNombreAlterno = function (pNombreAlt) {
        let codProducto = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val();

        if (pNombreAlt.trim() == '') {
            infoCustom('Ingrese un nombre alternativo.');
            return;
        }

        Bloquear("ventana");
        $.post("vistas/NM/ajax/NMMPROD.ASHX", {
            OPCION: "CNA",
            PROD_CODE: codProducto,
            NOMPRODUCTO: pNombreAlt,
            USUA_ID: $('#ctl00_lblusuario').text()
        }).done(function (res) {

            Desbloquear("ventana");

            if (res.indexOf("[Error]:") > -1) {
                noexitoCustom('Error al grabar nombre alternativo.');
                return;
            }

            if (res == "OK") {
                exito();
                $('#txtNombreAlt').val('');
                fnListarNombreAlt(codProducto);
            }
            else if (res.indexOf('Duplicate') > - 1) {
                Desbloquear("ventana");
                infoCustom('El registro ingresado ya existe.');
            }
            else {
                Desbloquear("ventana");
                noexitoCustom('Error al grabar nombre alternativo.');
            }
        })
            .fail(function () {
                noexitoCustom('Error al grabar nombre alternativo.');
                Desbloquear('ventana');
            });
    }

    var fnGenerarCode = function (empresa, subGrupo) {
        var codeGenerado = '';

        var data = new FormData();
        data.append("OPCION", "GENERAR_CODE");
        data.append("CTLG_CODE", empresa);
        data.append("GRUPO_CODE", subGrupo);
        Bloquear("ventana");
        $.ajax({
            url: "vistas/NM/ajax/NMMPROD.ashx",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                codeGenerado = datos;

            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("Error al Generar!")
            }
        });

        return codeGenerado;
    };

    var fnDeleteNombreAlterno = function (pID) {

        if (pID == "" || pID == undefined) {
            alertCustom('Seleccione un Registro');
            return;
        }

        Bloquear("ventana");
        $.post("vistas/NM/ajax/NMMPROD.ASHX", {
            OPCION: "ENA",
            ID_NOMBRE_ALT: pID
        }).done(function (res) {

            Desbloquear("ventana");

            if (res.indexOf("[Error]:") > -1) {
                noexitoCustom('Error al eliminar nombre alternativo.');
                return;
            }

            if (res == "OK") {
                exito();
                let codProducto = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val();
                fnListarNombreAlt(codProducto);
            }

            else {
                Desbloquear("ventana");
                noexitoCustom('Error al eliminar nombre alternativo.');
            }
        })
            .fail(function () {
                noexitoCustom('Error al eliminar nombre alternativo.');
                Desbloquear('ventana');
            });
    }



    var EventosCargaInicial = function () {
        var value = "";
        var value2 = "";
        var cboExi = true;
        $("#cboexistencia").live("select2-opening", function () {
            if (cboExi) {
                value = $(this).val();
                fillcboExistencias();
                $(this).select2("val", value);
                cboExi = false;
            }
        })

        var cboGru = true;
        $("#cbogrupo").live("select2-opening", function () {
            if (cboGru) {
                value = $(this).val();
                fillCboGrupos();
                $(this).select2("val", value);
                cboGru = false;
            }
        })

        var cboSubgru = true;
        $("#cbosubgrupo").live("select2-opening", function () {
            if (cboSubgru) {
                value = $(this).val();
                fillCboSubgrupos()
                $(this).select2("val", value);
                cboSubgru = false;
            }
        })

        var cboVol = true;
        $("#cbovolumen").live("select2-opening", function () {
            if (cboVol) {
                value = $(this).val();
                value2 = $("#cbounidad").val();
                fillCboUnidad();
                $(this).select2("val", value);
                $("#cbounidad").select2("val", value2);
                var auxiliar = $('#cbovolumen option:selected').attr("corto");
                $($("#s2id_cbovolumen a span")[0]).html(auxiliar);
                cboVol = false;
                cboUni = false;
            }

        })

        var cboUni = true;
        $("#cbounidad").live("select2-opening", function () {
            if (cboUni) {
                value = $(this).val();
                value2 = $("#cbovolumen").val();
                fillCboUnidad();
                $(this).select2("val", value);
                $("#cbovolumen").select2("val", value2);
                var auxiliar = $('#cbovolumen option:selected').attr("corto");
                $($("#s2id_cbovolumen a span")[0]).html(auxiliar);
                cboUni = false;
                cboVol = false;
                $("#cbounidad").select2("open");
            }
        })

        var cboMarc = true;
        $("#cbomarca").live("select2-opening", function () {
            if (cboMarc) {
                value = $(this).val();
                fillCboMarcas();
                $(this).select2("val", value);
                cboMarc = false;
            }
        })

        var cboPres = true;
        $("#cboPresentacion").live("select2-opening", function () {
            if (cboPres) {
                value = $(this).val();
                fillCboPresentacion();
                $(this).select2("val", value);
                cboPres = false;
            }
        })
    }

    var iniciaTablaNombreAlt = function () {

        var parms = {
            data: null,
            //order: [[0, 'asc']],
            ScrollX: true,
            columns: [
                {
                    data: "NOMBRE_ALT",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left');
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).css('text-align', 'center');
                        $(td).css('width', '5%');
                        $(td).html("<button type='button' id='btnEliminaNombreAlt' class='btn red deleteNomAlt'><i class='icon-trash'></i></button>");
                    }

                },
            ]
        }

        oTableNombreAlt = iniciaTabla("tblNombreAlt", parms);


        $('#tblNombreAlt tbody').on('click', '.deleteNomAlt', function () {

            var pos = oTableNombreAlt.api(true).row($(this).parent().parent()).index();
            var row = oTableNombreAlt.fnGetData(pos);

            let idRegistro = row.ID;
            fnDeleteNombreAlterno(idRegistro);

        });


    }

    return {
        init: function () {
            plugins();
            crearmodal("modalDescripcion", "Información", "No hay información disponible.");
            if (ObtenerQueryString("codigo") != null && ObtenerQueryString("sCodEmpresa") != null) {
                EventosCargaInicial();
            } else {
                //No dependientes de empresa              
                fillCboUnidad();
                fillcboExistencias();
                fillCboPresentacion();
            }
            //No dependientes de empresa
            fillCboMoneda();       
            //Dependientes de empresa
            fillCboEmpresa();
            eventoControles();
            cargaInicial();
            validacion();
            iniciaTablaNombreAlt();
        }
    };
}();

function validaMaximoIsc() {
    if (parseFloat($("#txtIsc").val()) > 50) {
        $("#txtIsc").val("50")
    }
}

var oTableExistencias;
var NMLPROR = function () {
    var oTableLista;

    var plugins = function () {
        $("#slcEmpresa").select2();
        $(".combobox").select2();
    }

    var fnCargarBandeja = function () {
        let sCodEmpresa = $("#slcEmpresa").val();
        if (sCodEmpresa === "") {
            return;
        }

        let sEstadoInd = ($("#chkEstado").is(":checked") ? "" : "A");

        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMPROD.ASHX?OPCION=L_PROD_SERV&CTLG_CODE=" + sCodEmpresa + "&ESTADO_IND=" + sEstadoInd,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                oTableLista.fnClearTable();
                if (isEmpty(datos))
                    return;
                oTableLista.fnAddData(datos);
                Desbloquear("ventana");
            },
            error: function (result) {
                alertCustom("No se pudo recuperar la información.");
                Desbloquear("ventana");
            }
        });
        Desbloquear("ventana");
    }

    var fillCboEmpresa = function () {
        $('#slcEmpresa').html('<option></option>');
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                },
                error: function (msg) {
                    alertCustom("Empresas no listaron correctamente");
                }
            });
        }
        else {
            dPermanente = JSON.parse(dPermanente);
            for (var i = 0; i < dPermanente.length; i++) {
                $('#slcEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
            }
        }
    };

    var eventoControles = function () {

        $('#slcEmpresa').change(function () {
            fnCargarBandeja();
        });

        $("#chkEstado").on("change", function () {
            fnCargarBandeja();
        });
    }


    var fnFillBandeja = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "CODIGO_ANTIGUO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "DESC_ADM",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "MARCA",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "DESC_GRUPO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "DESC_SUBGRUPO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "DESC_EXISTENCIA",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "DESC_UNIDAD_DESPACHO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "CODIGO_AUXILIAR",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center").addClass("estado_desc");
                        if (cellData === "A") {
                            $(td).html("ACTIVO");
                        }
                        else {
                            $(td).html("DESCONTINUADO");
                            $(td).parent().css("color", "gray");
                        }
                    }
                },
                {
                    data: null,
                    defaultContent: "<a class='btn green Estado'><i class='icon-refresh'></i></a>",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                }
            ]
        }

        oTableLista = iniciaTabla("tblLista", parms);
        //$("#tblLista").removeAttr("style");

        //Agregamos los tipos de controles para los filtros
        $("#tblLista").dataTable().columnFilter({
            aoColumns: [
                { type: "text" },
                { type: "text" },
                { type: "text" },
                { type: "text" },
                { type: "text" },
                { type: "text" },
                { type: "text" },
                { type: "text" },
                { type: "text" },
                { type: "select", values: ["A", "I"] },
                null
            ]
        });

        //Editamos el texto de los combos que se usan en los filtros
        $("#tblLista_wrapper tfoot select option[value='A']").text("ACTIVO");
        $("#tblLista_wrapper tfoot select option[value='I']").text("DESCONTINUADO");


        // modificamos el combo de paginacion
        $("#tblLista_wrapper .dataTables_length select").addClass("m-wrap xsmall");

        // modificamos el tamaño de las caja de texto de los filtros
        var vInputBusq = $("#tblLista_wrapper tfoot input");
        $(vInputBusq[0]).addClass("m-wrap xsmall");
        $(vInputBusq[1]).addClass("m-wrap xsmall");
        $(vInputBusq[2]).addClass("m-wrap medium");
        $(vInputBusq[3]).addClass("m-wrap small");
        $(vInputBusq[4]).addClass("m-wrap small");
        $(vInputBusq[5]).addClass("m-wrap small");
        $(vInputBusq[6]).addClass("m-wrap xsmall");
        $(vInputBusq[7]).addClass("m-wrap xsmall");
        $(vInputBusq[8]).addClass("m-wrap xsmall");

        // modificamos el tamaño de los combos de los filtros
        var vSelectBusq = $("#tblLista_wrapper tfoot select");
        $(vSelectBusq[0]).addClass("m-wrap xsmall");

        //ponemos los filtros encima de las cabeceras de columnas de la Tabla
        $(".dataTables_scrollFoot").insertAfter($(".dataTables_scrollHead"));
        //$("#tblLista tfoot").css("display", "table-header-group");

        $('#tblLista tbody tr').live('dblclick', function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            }
            else {
                $(this).addClass("selected");
                var pos = oTableLista.fnGetPosition(this);
                var row = oTableLista.fnGetData(pos);
                var sCodEmpresa = row.CTLG_CODE;
                var sCodigo = row.CODIGO;     
                window.open("?f=nmmpror&codigo=" + sCodigo + "&sCodEmpresa=" + sCodEmpresa, '_blank');
            }
        });

        $("#tblLista tbody").on("click", "a.Estado", function () {

            var oTR = $(this).parent().parent();

            var pos = oTableLista.api(true).row($(this).parent().parent()).index();
            var row = oTableLista.fnGetData(pos);
            var sCodigo = row.CODIGO;
            var sEstado = row.ESTADO;

            var sEstadoNuevo;
            if (sEstado == "A") {
                sEstadoNuevo = "I";
            } else if (sEstado == "I") {
                sEstadoNuevo = "A";
            }

            $.ajax({
                type: "POST",
                url: "vistas/nm/ajax/NMMPROD.ashx?OPCION=18" +
                "&p_CODIGO_FILTRO=" + sCodigo +
                "&p_VALOR_ACTUALIZAR=" + sEstadoNuevo,
                async: false,
                success: function (datos) {
                    if (datos != null) {
                        if (datos == "OK") {
                            oTableLista.fnGetData(pos).ESTADO = sEstadoNuevo;
                            if (sEstadoNuevo == "A") {
                                $(oTR).removeAttr("style");
                                $(oTR).find(".estado_desc").html("ACTIVO");
                            } else if (sEstadoNuevo == "I") {
                                $(oTR).css("color", "gray");
                                $(oTR).find(".estado_desc").html("DESCONTINUADO");
                            }
                            exito();
                        }
                    }
                    Desbloquear("ventana");
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    alertCustom("Estado no pudo actualizarse correctamente");
                }
            });
            Desbloquear("ventana");
        });
    };    



    return {
        init: function () {           
            plugins();
            eventoControles();
            fillCboEmpresa();
            fnFillBandeja();
            $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
    };
}();

function CambiarEstadoProducto(cod, row) {
    Bloquear("ventana");
    var estado = $('#tblGestionproductos').dataTable().fnGetData(row)[9];
    var nuevo;
    if (estado == "A") {
        nuevo = "I";
    } else if (estado == "I") {
        nuevo = "A";
    }

    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmprod.ashx?OPCION=18" +
            "&p_CODIGO_FILTRO=" + cod +
            "&p_VALOR_ACTUALIZAR=" + nuevo,
        async: false,
        success: function (datos) {
            if (datos != null) {
                if (datos == "OK") {
                    exito();
                    $('#tblGestionproductos').dataTable().fnGetData()[row][9] = nuevo;
                    if (nuevo == "A") {
                        $("#row_" + row + "").removeAttr("style");
                        $($("#row_" + row + "").children()[8]).html("ACTIVO");
                    } else if (nuevo == "I") {
                        $("#row_" + row + "").attr("style", "color:gray;");
                        $($("#row_" + row + "").children()[8]).html("DESCONTINUADO");
                    }
                }
            }
            Desbloquear("ventana");
        },
        error: function (msg) {
            Desbloquear("ventana");
            alertCustom("Estado no pudo actualizarse correctamente");
        }
    });
}
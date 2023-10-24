/*
EL mantenimiento de precios aplica para todos los almacenes:
- Si se graba, se graba para todos
- Si se actualizar, se actualiza para todos(si no existe se graba)
- Si se elimina(Precio Cantidad), se elimina para todos
*/
var iImgAncho = 350;
var iImgAlto = 350;
var asincrono = false;
var bandera = false;
function ClearTables(name) {
    if ($('#tbl' + name).length != 0) {
        $('#tbl' + name).remove();
    }
}

function solonumletra(string) {//Solo numeros
    var out = '';
    //Se añaden las letras validas
    var filtro = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890';//Caracteres validos

    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    return out;
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
$('#imgDNI').attr('src', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAFeAV4DASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECAwQG/8QALRABAAIBAQUIAwACAwAAAAAAAAECEQMEEhMhMRQyM0FRUmFxIoGRQlMjJEP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAlAaCJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJlAXKpEKAAAAAkwoDLUSkwgNCKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmSUAWIIhQAAAAAAAAGZhoBlqJSYQGgiQAAAAAAAAAAAAAAAAAAAAAAAABDKALgiFAAAAAAAAAAAAATCgMqkgNBAAAAAAAAAAAAAAAAAAAAAAkySgCxBCgAAAAAAAAAAAAAAAAJhQGY6tZZkgGgAAAAAAAAAAAAAAAAAElUwCLEKAAAAAAAAAAAAAAAAAAAAAGAAAAGZvWJxNo/pxKe6P6DQzxKe6P6cSnuj+g0M8Snuj+rFonpMSCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMcTTzjfhq3ct9PJo7LS9d6esyCV2euta9ptPXliW+w6fut/XopStK7tYaB5ew6fut/TsOn7rf16gHl7Dp+639dNOlNDlNuXy7Oero11u9ALxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyD0VvW3dnKuOlpV0cxXzdgAAAAAAAAAAAAAAAAAAAAAAAAS3dn6c9m8L9ulu7P057N4X7B1MHKDOQMGAA6DN5xWZyUtF6xaAaAABYgEFzhnejpmAUAAAGZ7zTM95oAAAAAAAAAAAAAAAAAAAAAAAAEt3Z+nPZvC/bpbuz9OezeF+wdJjMT5S81p2qszFaxMer1APHxNr/ANcG/tn+uHsAePd2nW/G8RWvm9VKRSsVjyaAAAInHNjV1I0qTe8tebx68Tr7RFP8a9QY3tfaZzWZpRY2O3WdS2ft7aVitYx0hqZ+AeKOPoTnO9V6tO8alcwTiLYnzc614ery6WB2ifLzhWLTu3iZ8+TYMz3mmZ7zQAAAAAAAAAAAAAAAAAAAAAAAAJbuz9OezeF+3S3dn6c9m8L9g6gAAAAAAAkd559OP+xfLvM4t8SxemL78fsFrf8ALddHDV05vGazizhNtq7sY+8A662pE7RStec+braMy5bPocOd605tL0Y/sg5a84mkesuzyzbjbXuxzrR6gZnvNMz3mgAAAAAAAAAAAAAAAAAAAAAAAAS3dn6c9m8L9ulu7P057N4X7B1AAAAAAABnUrNq4jq56etEzu35Wj1dnPV0aakYnlPqDW7ELux5y8u5tOl3Ji8fJOttOPA5g9fKvR5to2j/AA0vyvPp5OW5tWvOLzuQ9Gjs9NLpznzkDZtLhU596esux5gMz3mmZ7zQAAAAAAAAAAAAAAAAAAAAAAAAJbuz9Oez+H+3WYzWY9WNGm5TE+oNigIKAgoCCgIKAgoCCgIKAx/k0mOagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAluks6U5plq3dljR8MHTMepmPVx0672cz5lazvzXPKAdsxPSRxmNzUjd6S3qRWcb04gG8x6jhmIvG7M4b1JmbVr6g3mPVXO2nEV5ZhmLTXRz8g7Zj1HCIpjM25/bVJzSecg65j1HHTpvVzMyunmLzXyB1cdW0xeIj0dnO3jR9A3Wd6rGZ40x8JH/AB3x5SsePP0DomY9XO2b6m75QXpu1zXPIHUSk5rEqAAAAAAAAAAAAAAAAAAAAAACW7ssaUTGm6HTkDnpZiJK+NLpjADlqd+pacamZ5w6pMRPWAcrTm1d2OS6mYtW3lDriPRm1t3rGQZtqRNeXOWYrNtHHyTbe/GtebpSu7WIBiLVxzjm1ymk4hrEZ6L+gY0o/DCVieLMuhjzAc7RPGrPw6HyDN670Oennic3Y/QOVs01N6Y5SXvFo3a55uqRGAKRisR6KAAAAAAAAAAAAAAAAAAAAAAABkc9XnaseoOmfkc+FHlMlJmLTSZ+gbzGcZVnFd/5LXrXrINCRaJjMJN646g0JW0W6SWtFeoKMxeszylZtEYyCk8meJXOMrbE159AMxjKxzc78tPl0K3rERGQdEic9CJi1cwxpef2DoMzesTiZhYmLdJBQAAAAAAAAAAAAAAAAAASZAyIoKAA56vfo6OerE5rMRnAOjlPPWjHku9eeUVwtKYzM9ZBn/3n6TuWnejMS1uzxc/BN55xNcg1GJrOGNGsTEzK0rMUtM+fkxp2msdMwDUxu6sY6FY3rzMlYm1t63ImLUtmIzEgatYrG9HKU1Oe4s72pOMYhb1zNceQLesbnJnnOjLd4zWYZ3Z4UwDNvAbpWN3nEJNZ4OMc0i1q1iJqBTle0eSUmYraWqVmM2nrJSs4tE+YMUtGMzWZmWtOfznliErM0jG7l0rMz5YBoAElIlpkGhmGoAAAAAAAAAAABJkCZQWIAhQAAAAAAAABJzhnTru1xLYAAAAAAAAAAAAAAAYAGZjA1LINCKAAAAAAACTIEygsAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMkLhJjANDLQAAAJIEygoGFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAZVWQaGYaATCgJEKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgATCgD//2Q==');
$('#fileDNI').parent().parent().children('span').remove();
$('#fileDNI').val('');

var indica_datos = 1;

var subgrupoprod = '';

var indica_actualizado = 1;

function setCheckDebeHaber() {
    $('#uniform-chxDebe1 span').removeClass().addClass("checked");
    $('#chxDebe1').attr('checked', true).parent().addClass("checked");
    $('#chxHaber1').attr('disabled', true);
    $('#chxDebe1').attr('disabled', true);

    $('#uniform-chxHaberv1 span').removeClass().addClass("checked");
    $('#chxHaberv1').attr('checked', true).parent().addClass("checked");
    $('#chxDebev1').attr('disabled', true);
    $('#chxHaberv1').attr('disabled', true);
}

function ListarCtasSgrup(OPERACION, CODE, PROD_CODE) {
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/NMMFPRO.ashx?OPCION=LSCONT&p_OPERACION=" + OPERACION + "&SUBGRUP_CODE=" + CODE + "&p_PROD_CODE=" + PROD_CODE,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {

            setCheckDebeHaber();

            if (!isEmpty(datos)) {
                switch (OPERACION) {
                    case "COMPRA":
                        {
                            $("#cbo_cuentaCompra").val(datos[0].ctasgrup).change();
                            if (datos[0].debhab_stasgrup == 'D') {
                                $('#uniform-chxDebe1 span').removeClass().addClass("checked");
                                $('#chxDebe1').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaber1 span').removeClass().addClass("checked");
                                $('#chxHaber1').attr('checked', true).parent().addClass("checked");
                            }

                            /*
                            // Deshabilitar configuración cuentas contables - EALFARO (23/02/2018)
                            $("#cbo_cuentaIgv").val(datos[0].ctaimpuesto).change();
                            if (datos[0].debhab_ctaimpuesto == 'D') {
                                $('#uniform-chxDebe2 span').removeClass().addClass("checked");
                                $('#chxDebe2').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaber2 span').removeClass().addClass("checked");
                                $('#chxHaber2').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaCompraMN").val(datos[0].ctaopemn).change();
                            if (datos[0].debhab_ctaopemn == 'D') {
                                $('#uniform-chxDebe3 span').removeClass().addClass("checked");
                                $('#chxDebe3').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaber3 span').removeClass().addClass("checked");
                                $('#chxHaber3').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaCompraME").val(datos[0].ctaopeme).change();
                            if (datos[0].debhab_ctaopeme == 'D') {
                                $('#uniform-chxDebe4 span').removeClass().addClass("checked");
                                $('#chxDebe4').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaber4 span').removeClass().addClass("checked");
                                $('#chxHaber4').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaCompraRelMN").val(datos[0].ctaoperelmn).change();
                            if (datos[0].debhab_ctaoperelmn == 'D') {
                                $('#uniform-chxDebe5 span').removeClass().addClass("checked");
                                $('#chxDebe5').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaber5 span').removeClass().addClass("checked");
                                $('#chxHaber5').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaCompraRelME").val(datos[0].ctaoperelme).change();
                            if (datos[0].debhab_ctaoperelme == 'D') {
                                $('#uniform-chxDebe6 span').removeClass().addClass("checked");
                                $('#chxDebe6').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaber6 span').removeClass().addClass("checked");
                                $('#chxHaber6').attr('checked', true).parent().addClass("checked");
                            }
                            */

                        }; break;
                    case "VENTA":
                        {
                            $("#cbo_cuentaVenta").val(datos[0].ctasgrup).change();
                            if (datos[0].debhab_stasgrup == 'D') {
                                $('#uniform-chxDebev1 span').removeClass().addClass("checked");
                                $('#chxDebev1').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaberv1 span').removeClass().addClass("checked");
                                $('#chxHaberv1').attr('checked', true).parent().addClass("checked");
                            }

                            /*
                            // Deshabilitar configuración cuentas contables - EALFARO (23/02/2018)
                            $("#cbo_cuentaIgv_venta").val(datos[0].ctaimpuesto).change();
                            if (datos[0].debhab_ctaimpuesto == 'D') {
                                $('#uniform-chxDebev2 span').removeClass().addClass("checked");
                                $('#chxDebev2').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaberv2 span').removeClass().addClass("checked");
                                $('#chxHaberv2').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaVentaMN").val(datos[0].ctaopemn).change();
                            if (datos[0].debhab_ctaopemn == 'D') {
                                $('#uniform-chxDebev3 span').removeClass().addClass("checked");
                                $('#chxDebev3').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaberv3 span').removeClass().addClass("checked");
                                $('#chxHaberv3').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaVentaME").val(datos[0].ctaopeme).change();
                            if (datos[0].debhab_ctaopeme == 'D') {
                                $('#uniform-chxDebev4 span').removeClass().addClass("checked");
                                $('#chxDebev4').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaberv4 span').removeClass().addClass("checked");
                                $('#chxHaberv4').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaVentaRelMN").val(datos[0].ctaoperelmn).change();
                            if (datos[0].debhab_ctaoperelmn == 'D') {
                                $('#uniform-chxDebev5 span').removeClass().addClass("checked");
                                $('#chxDebev5').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaberv5 span').removeClass().addClass("checked");
                                $('#chxHaberv5').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaVentaRelME").val(datos[0].ctaoperelme).change();
                            if (datos[0].debhab_ctaoperelme == 'D') {
                                $('#uniform-chxDebev6 span').removeClass().addClass("checked");
                                $('#chxDebev6').attr('checked', true).parent().addClass("checked");
                            }
                            else {
                                $('#uniform-chxHaberv6 span').removeClass().addClass("checked");
                                $('#chxHaberv6').attr('checked', true).parent().addClass("checked");
                            }
                            */

                        }; break;
                    default:

                }
                indica_datos = 1;
            }
            else {
                indica_datos = 0;
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
};

function ListarCtasGeneral(control, control_desc, cuenta) {
    //colocamos en una variable la referencia al control enviado por parámetro
    controlvar = $('#' + control);
    //control = $('#' + control_desc);

    $.ajax({
        type: "post",
        url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=LCC&empresa=" + $('#slcEmpresa').val() + "&P_CUEN_CODE=" + cuenta,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            controlvar.empty();
            controlvar.append('<option></option>');

            if (!isEmpty(datos)) {

                for (var i = 0; i < datos.length; i++) {
                    controlvar.append('<option value="' + datos[i].CUENTA + '" data-ctaid = "' + datos[i].ID_CUENTA + '">' + datos[i].DESCRIPCION + ' - ' + datos[i].CUENTA + '</option>');
                }
            }
            controlvar.select2('val', '');
            //colocamos el valor vacío al control de pantalla obtenido por parámetro
            $('#' + control_desc)[0].innerHTML = "";
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function ActualizarNuevaConfig() {

    if (indica_actualizado > 0) {

        prodcode = $("#txtcodigo").val();

        //definicion de varible para cadena json
        var sconfigcontatot = [];
        var sconfigconta = {};
        var ctasgrup = "";
        var idctagrup = "";
        var dh1 = "";

        /*
        // Deshabilitar configuración cuenas contables - EALFARO (13/02/2018)
        var impuesto="";
        var ctaimpuesto = "";
        var idctaimp ="";
        var dh2 = "";
        var ctaMN = "";
        var idctaMN = "";
        var dh3 = "";
        var ctaME = "";
        var idctaME = "";
        var dh4 = "";
        var ctaRELMN = "";
        var idRELMN = "";
        var dh5 = "";
        var ctaRELME = "";
        var idRELME = "";
        var dh6 = "";
        */

        //agregando comrpras
        var opecont = 'COMPRA';
        if ($("#chkComprable").is(':checked')) {
            if (!validaConfigContable(opecont)) { return; };
            ctasgrup = $("#cbo_cuentaCompra").val();
            idctagrup = $("#cbo_cuentaCompra option:selected").data('ctaid');
            dh1 = $("#chxDebe1").is(":checked") ? 'D' : $("#chxHaber1").is(":checked") ? 'H' : 'N';

            /*
            // Deshabilita configuración contable - EALFARO (13/02/2018)
            impuesto = 'IGV';
            ctaimpuesto = $("#cbo_cuentaIgv").val();
            idctaimp = $("#cbo_cuentaIgv option:selected").data('ctaid');
            dh2 = $("#chxDebe2").is(":checked") ? 'D' : $("#chxHaber2").is(":checked") ? 'H' : 'N';
            ctaMN = $("#cbo_cuentaCompraMN").val();
            idctaMN = $("#cbo_cuentaCompraMN option:selected").data('ctaid');
            dh3 = $("#chxDebe3").is(":checked") ? 'D' : $("#chxHaber3").is(":checked") ? 'H' : 'N';
            ctaME = $("#cbo_cuentaCompraME").val();
            idctaME = $("#cbo_cuentaCompraME option:selected").data('ctaid');
            dh4 = $("#chxDebe4").is(":checked") ? 'D' : $("#chxHaber4").is(":checked") ? 'H' : 'N';
            ctaRELMN = $("#cbo_cuentaCompraRelMN").val();
            idRELMN = $("#cbo_cuentaCompraRelMN option:selected").data('ctaid');
            dh5 = $("#chxDebe5").is(":checked") ? 'D' : $("#chxHaber5").is(":checked") ? 'H' : 'N';
            ctaRELME = $("#cbo_cuentaCompraRelME").val();
            idRELME = $("#cbo_cuentaCompraRelME option:selected").data('ctaid');
            dh6 = $("#chxDebe6").is(":checked") ? 'D' : $("#chxHaber6").is(":checked") ? 'H' : 'N';*/

            sconfigconta = {};
            sconfigconta.operacion = opecont;
            sconfigconta.idctagrup = idctagrup;
            sconfigconta.ctasgrup = ctasgrup;

            /*
            // Deshabilita configuración contable - EALFARO (13/02/2018)
            sconfigconta.impuesto = impuesto;
            sconfigconta.idctaimp = idctaimp;
            sconfigconta.ctaimpuesto = ctaimpuesto;
            sconfigconta.idctaMN = idctaMN;
            sconfigconta.ctaMN = ctaMN;
            sconfigconta.idctaME = idctaME;
            sconfigconta.ctaME = ctaME;
            sconfigconta.idRELMN = idRELMN;
            sconfigconta.ctaRELMN = ctaRELMN
            sconfigconta.idRELME = idRELME;
            sconfigconta.ctaRELME = ctaRELME;*/

            /*
            //Deshabilita configuración contable - EALFARO (13/02/2018)
            sconfigconta.debehaber = (dh1 + '|' + dh2 + '|' + dh3 + '|' + dh4 + '|' + dh5 + '|' + dh6);*/

            sconfigconta.debehaber = (dh1);
            sconfigconta.producto = prodcode;
            sconfigcontatot.push(sconfigconta);
        }

        //agregando ventas
        var opecont = 'VENTA';
        if ($("#chklista").is(':checked')) {
            if (!validaConfigContable(opecont)) { return; };
            ctasgrup = $("#cbo_cuentaVenta").val();
            idctagrup = $("#cbo_cuentaVenta option:selected").data('ctaid');
            dh1 = $("#chxDebev1").is(":checked") ? 'D' : $("#chxHaberv1").is(":checked") ? 'H' : 'N';

            /*
            // Deshabilita configuración contable - EALFARO (13/02/2018)
            impuesto = 'IGV';
            ctaimpuesto =  $("#cbo_cuentaIgv_venta").val();
            idctaimp = $("#cbo_cuentaIgv_venta option:selected").data('ctaid');
            dh2 = $("#chxDebev2").is(":checked") ? 'D' : $("#chxHaberv2").is(":checked") ? 'H' : 'N';
            ctaMN = $("#cbo_cuentaVentaMN").val();
            idctaMN = $("#cbo_cuentaVentaMN option:selected").data('ctaid');
            dh3 = $("#chxDebev3").is(":checked") ? 'D' : $("#chxHaberv3").is(":checked") ? 'H' : 'N';
            ctaME = $("#cbo_cuentaVentaME").val();
            idctaME =  $("#cbo_cuentaVentaME option:selected").data('ctaid');
            dh4 = $("#chxDebev4").is(":checked") ? 'D' : $("#chxHaberv4").is(":checked") ? 'H' : 'N';
            ctaRELMN = $("#cbo_cuentaVentaRelMN").val();
            idRELMN = $("#cbo_cuentaVentaRelMN option:selected").data('ctaid');
            dh5 = $("#chxDebev5").is(":checked") ? 'D' : $("#chxHaberv5").is(":checked") ? 'H' : 'N';
            ctaRELME = $("#cbo_cuentaVentaRelME").val();
            idRELME = $("#cbo_cuentaVentaRelME option:selected").data('ctaid');
            dh6 = $("#chxDebev6").is(":checked") ? 'D' : $("#chxHaberv6").is(":checked") ? 'H' : 'N';
            */

            sconfigconta = {};
            sconfigconta.operacion = opecont;
            sconfigconta.idctagrup = idctagrup;
            sconfigconta.ctasgrup = ctasgrup;

            /*
            // Deshabilita configuración contable - EALFARO (13/02/2018)
            sconfigconta.impuesto = impuesto;
            sconfigconta.idctaimp = idctaimp;
            sconfigconta.ctaimpuesto = ctaimpuesto;
            sconfigconta.idctaMN = idctaMN;
            sconfigconta.ctaMN = ctaMN;
            sconfigconta.idctaME = idctaME;
            sconfigconta.ctaME = ctaME;
            sconfigconta.idRELMN = idRELMN;
            sconfigconta.ctaRELMN = ctaRELMN
            sconfigconta.idRELME = idRELME;
            sconfigconta.ctaRELME = ctaRELME;
            sconfigconta.debehaber = (dh1 + '|' + dh2 + '|' + dh3 + '|' + dh4 + '|' + dh5 + '|' + dh6);
            */

            sconfigconta.debehaber = (dh1);
            sconfigconta.producto = prodcode;
            sconfigcontatot.push(sconfigconta);
        }

        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=EDCONT&ESTADO_IND=A&USUA_ID=" + $('#ctl00_txtus').val() +
            "&SUBGRUP_CODE=" + subgrupoprod + "&sconfigconta=" + JSON.stringify(sconfigcontatot),
            //contentType: "application/json;",
            //dataType: "json",
            contentType: false,
            processData: false,
            async: false,
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    exito();
                    cargaDatosContabilidad($("#txtcodigo").val(), subgrupoprod);
                }
                else {
                    noexitoCustom("Problemas al actualizar la configuración contable");
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    else {
        infoCustom2('Debe completar la modificación del producto antes de poder alterar sus cuentas contables asociadas');
    }
}

var validaConfigContable = function (sModulo) {
    let resp = true;
    if (isEmpty(sModulo)) { noexitoCustom("Error al validar configuración contable."); resp = false; }
    switch (sModulo) {
        case "COMPRA":
            if ($("#cbo_cuentaCompra").val() === "") {
                infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                resp = false;
                return;
            }
            var dh1 = $("#chxDebe1").is(":checked") ? 'D' : $("#chxHaber1").is(":checked") ? 'H' : 'N';

            if ($("#chxDebe1").is(":checked") && $("#chxHaber1").is(":checked")) {
                dh1 = 'N';
            }

            if (dh1 === "N") {
                infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                resp = false;
                return;
            }

            /*
            // Deshabilitar configuraciones contables - EALFARO (13/02/2018)
            if ($("#cbo_cuentaIgv").val() === "") {
                infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                resp = false;
                return;
            }       
            var dh2 = $("#chxDebe2").is(":checked") ? 'D' : $("#chxHaber2").is(":checked") ? 'H' : 'N';
            if (dh2 === "N") {
                infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                resp = false;
                return;
            }
            if ($("#cbo_cuentaCompraMN").val() === "") {
                infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                resp = false;
                return;
            }            
            var dh3 = $("#chxDebe3").is(":checked") ? 'D' : $("#chxHaber3").is(":checked") ? 'H' : 'N';
            if (dh3 === "N") {
                infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                resp = false;
                return;
            }
            if ($("#cbo_cuentaCompraME").val() === "") {
                infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                resp = false;
                return;
            }           
            var dh4 = $("#chxDebe4").is(":checked") ? 'D' : $("#chxHaber4").is(":checked") ? 'H' : 'N';
            if (dh4 === "N") {
                infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                resp = false;
                return;
            }
            if ($("#cbo_cuentaCompraRelMN").val() === "") {
                infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                resp = false;
                return;
            }                       
            var dh5 = $("#chxDebe5").is(":checked") ? 'D' : $("#chxHaber5").is(":checked") ? 'H' : 'N';
            if (dh5 === "N") {
                infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                resp = false;
                return;
            }
            if ($("#cbo_cuentaCompraRelME").val() === "") {
                infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                resp = false;
                return;
            }            
            var dh6 = $("#chxDebe6").is(":checked") ? 'D' : $("#chxHaber6").is(":checked") ? 'H' : 'N';
            if (dh6 === "N") {
                infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                resp = false;
                return;
            }*/

            break;

        case "VENTA":
            if ($("#cbo_cuentaVenta").val() === "") {
                infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                resp = false;
                return;
            }
            var dh1 = $("#chxDebev1").is(":checked") ? 'D' : $("#chxHaberv1").is(":checked") ? 'H' : 'N';

            if ($("#chxDebev1").is(":checked") && $("#chxHaberv1").is(":checked")) {
                dh1 = 'N';
            }

            if (dh1 === "N") {
                infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                resp = false;
                return;
            }

        /*
        // Deshabilita configuración contable - EALFARO (13/02/2018)
        if ($("#cbo_cuentaIgv_venta").val() === "") {
            infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
            resp = false;
            return;
        }
        var dh2 = $("#chxDebev2").is(":checked") ? 'D' : $("#chxHaberv2").is(":checked") ? 'H' : 'N';
        if (dh2 === "N") {
            infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
            resp = false;
            return;
        }
        if ($("#cbo_cuentaVentaMN").val() === "") {
            infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
            resp = false;
            return;
        }        
        var dh3 = $("#chxDebev3").is(":checked") ? 'D' : $("#chxHaberv3").is(":checked") ? 'H' : 'N';
        if (dh3 === "N") {
            infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
            resp = false;
            return;
        }
        if ($("#cbo_cuentaVentaME").val() === "") {
            infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
            resp = false;
            return;
        }         
        var dh4 = $("#chxDebev4").is(":checked") ? 'D' : $("#chxHaberv4").is(":checked") ? 'H' : 'N';
        if (dh4 === "N") {
            infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
            resp = false;
            return;
        }
        if ($("#cbo_cuentaVentaRelMN").val() === "") {
            infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
            resp = false;
            return;
        }            
        var dh5 = $("#chxDebev5").is(":checked") ? 'D' : $("#chxHaberv5").is(":checked") ? 'H' : 'N';
        if (dh5 === "N") {
            infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
            resp = false;
            return;
        }
        if ($("#cbo_cuentaVentaRelME").val() === "") {
            infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
            resp = false;
            return;
        }            
        var dh6 = $("#chxDebev6").is(":checked") ? 'D' : $("#chxHaberv6").is(":checked") ? 'H' : 'N';
        if (dh6 === "N") {
            infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
            resp = false;
            return;
        }
        */
    }

    return resp;
}

function cargaDatosContabilidad(PROD_CODE, SUBGRUP_CODE) {
    //compras
    ListarCtasGeneral('cbo_cuentaCompra', 'cbo_cuentaCompra_desc', '');
    /*
    // Deshabilitar configuración contable - EALFARO (13/02/2018)
    ListarCtasGeneral('cbo_cuentaIgv', 'cbo_cuentaIgv_desc', '40');
    ListarCtasGeneral('cbo_cuentaCompraMN', 'cbo_cuentaCompraMN_desc', '42');
    ListarCtasGeneral('cbo_cuentaCompraME', 'cbo_cuentaCompraME_desc', '42');
    ListarCtasGeneral('cbo_cuentaCompraRelMN', 'cbo_cuentaCompraRelMN_desc', '43');
    ListarCtasGeneral('cbo_cuentaCompraRelME', 'cbo_cuentaCompraRelME_desc', '43');
    */

    //ventas
    ListarCtasGeneral('cbo_cuentaVenta', 'cbo_cuentaVenta_desc', '');
    /*
    // Deshabilitar configuración contable - EALFARO (13/02/2018)
    ListarCtasGeneral('cbo_cuentaIgv_venta', 'cbo_cuentaIgv_venta_desc', '40');
    ListarCtasGeneral('cbo_cuentaVentaMN', 'cbo_cuentaVentaMN_desc', '12');
    ListarCtasGeneral('cbo_cuentaVentaME', 'cbo_cuentaVentaME_desc', '12');
    ListarCtasGeneral('cbo_cuentaVentaRelMN', 'cbo_cuentaVentaRelMN_desc', '13');
    ListarCtasGeneral('cbo_cuentaVentaRelME', 'cbo_cuentaVentaRelME_desc', '13');
    */

    ListarCtasSgrup('COMPRA', SUBGRUP_CODE, PROD_CODE);
    if (indica_datos <= 0) {
        ListarCtasSgrup('COMPRA', SUBGRUP_CODE, 'GENERAL');
        $("#configcompras").html("* Cuentas de COMPRAS heredadas de subgrupo");
    }
    else {
        $("#configcompras").html("* Cuentas de COMPRAS específicas de producto");
    }
    indica_datos = 1;
    ListarCtasSgrup('VENTA', SUBGRUP_CODE, PROD_CODE);
    if (indica_datos <= 0) {
        ListarCtasSgrup('VENTA', SUBGRUP_CODE, 'GENERAL');
        $("#configVentas").html("* Cuentas de VENTAS heredadas de subgrupo");
    }
    else {
        $("#configVentas").html("* Cuentas de VENTAS específicas de producto");
    }
    indica_datos = 1;
    subgrupoprod = SUBGRUP_CODE;
}

//TRANSACCIONES

//Actualiza Centro Costo
function ActualizaCeco() {

    var data = new FormData();
    var PROD_CODE = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val();
    var OPCION = "21";

    var p_CECC = $("#txt_centro_costo").data("CodCentroCostoCab");
    var p_CECD = $("#txt_centro_costo").data("CodCentroCosto");

    data.append('PROD_CODE', PROD_CODE);
    data.append('p_CECC', p_CECC);
    data.append('p_CECD', p_CECD);
    data.append('OPCION', OPCION);


    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMPROD.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (res) {

            exito();
        })
        .error(function () {
            noexito();
        });
}
//Lista Centro de Costo
function ListaCeco() {

    var data = new FormData();
    var PROD_CODE = $('#txtcodigo').val();
    if (PROD_CODE.length < 1) {
        return;
    }
    var OPCION = "20";

    data.append('PROD_CODE', PROD_CODE);
    data.append('OPCION', OPCION);

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMPROD.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (datos) {
            if (datos != null) {
                var CentroCosto = datos[0].COSTO
                var CECC = datos[0].CECC
                var CECD = datos[0].CECD
                $("#txt_centro_costo").val(CentroCosto);
                $("#txt_centro_costo").data("CodCentroCostoCab", CECC);
                $("#txt_centro_costo").data("CodCentroCosto", CECD);
            }
        })
        .error(function () {
            noexito();
        });
}

//MANTENIMIENTO DE PRECIOS
function GrabarPrecioEstandar() {
    Errors = true
    if (!vErrors(["txtprenormal", "txtpreminimo", "cboAlmacen"])) {
        Errors = false;
        return;
    }

    var PRECIO_NORMAL = parseFloat($("#txtprenormal").val());
    var PRECIO_MINIMO = parseFloat($("#txtpreminimo").val());
    if (PRECIO_NORMAL < PRECIO_MINIMO) {
        infoCustom2('El precio mínimo debe ser menor al precio normal.');
        return;
    }

    var UTILIDAD_VENTA = $.trim($('#txtUtilidadNormal').val());
    if ($.trim(UTILIDAD_VENTA) == "") {
        UTILIDAD_VENTA = "0.00";
        $('#txtUtilidadNormal').val(UTILIDAD_VENTA);
    }
    UTILIDAD_VENTA = parseFloat(UTILIDAD_VENTA);

    var UTILIDAD_MINIMO = $.trim($('#txtUtilidadMinimo').val());
    if (UTILIDAD_MINIMO == "") {
        UTILIDAD_MINIMO = "0.00";
        $('#txtUtilidadMinimo').val(UTILIDAD_MINIMO);
    }
    UTILIDAD_MINIMO = parseFloat(UTILIDAD_MINIMO);

    if (UTILIDAD_VENTA < UTILIDAD_MINIMO) {
        infoCustom2('El porcentaje de utilidad mínimo debe ser menor al porcentaje de utilidad normal.');
        return;
    }

    var PROD_COD, CTLG_CODE, ALMC_CODE, UNME_CODE, PLAN_CODE, MONE_CODE, USUA_ID, OPCION;

    OPCION = '5';
    CTLG_CODE = $('#slcEmpresa').val();
    USUA_ID = $('#ctl00_lblusuario').text();
    PROD_CODE = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val();
    ALMC_CODE = $("#cboAlmacen").val();
    UNME_CODE = $('#cbounidad').val();
    PLAN_CODE = '';
    MONE_CODE = $('#cbomoneda').val();

    var data = new FormData();
    data.append('OPCION', OPCION);
    data.append('CTLG_CODE', CTLG_CODE);
    data.append('UNME_CODE', UNME_CODE);
    data.append('MONE_CODE', MONE_CODE);
    data.append('USUA_ID', USUA_ID);
    data.append('PROD_CODE', PROD_CODE);
    data.append('ALMC_CODE', ALMC_CODE);
    data.append('PLAN_CODE', PLAN_CODE);
    data.append('PRECIO_MINIMO', PRECIO_MINIMO);
    data.append('PRECIO_VENTA', PRECIO_NORMAL);
    data.append('UTILIDAD_VENTA', UTILIDAD_VENTA);
    data.append('UTILIDAD_MINIMO', UTILIDAD_MINIMO);

    Bloquear("p_precios");

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMPROD.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (res) {
            Desbloquear("p_precios");
            //DPORTA
            var resp = res;
            var arr = resp.split("-");
            var arr1 = arr[0];
            if (arr1 == "OK") {
                if (arr1 == "OK") {
                    exito();
                    $("#g_pre_estandar").html("<i class='icon-pencil'></i> Modificar");
                    $("#g_pre_estandar").attr("href", "javascript:ActualizarPrecioEstandar();");
                } else {
                    alertCustom("El produto ya se encuentra registrado");
                }
            } else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("p_precios");
        })
};

function GrabarPrecioCantidad() {

    var Errors = false;
    var PROD_COD, CTLG_CODE, ALMC_CODE, RANG_CODE, PLAN_CODE, MONE_CODE, PRECIO_VENTA, PRECIO_MINIMO, USUA_ID, PRE_CANTIDAD, UTILIDAD, FTVPRER_CODE, OPCION;
    if (typeof $("#det_tbl_precio").val() == 'undefined') {
        $("#lista_precios_cantidad").html("<table class='table table-bordered table-hover' id='tbl_precio'><thead><tr><th>RANGO</th><th>UT %</th><th>PRECIO</th><th>QUITAR</th></tr></thead><tbody id='det_tbl_precio'></tbody></table>");
    }
    if (vErrors(["txtprecantidad", "cboRango", "cboAlmacen"])) {
        Errors = true
    }
    if (Errors) {
        OPCION = '8';
        CTLG_CODE = $('#slcEmpresa').val();
        USUA_ID = $('#ctl00_lblusuario').text();
        PROD_CODE = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val();
        ALMC_CODE = $("#cboAlmacen").val();
        PLAN_CODE = '';
        MONE_CODE = $('#cbomoneda').val();
        PRE_CANTIDAD = $('#txtprecantidad').val();
        UTILIDAD = ($.trim($('#txtUtilidadCantidad').val()) == "") ? "0.00" : $('#txtUtilidadCantidad').val();

        RANG_CODE = $('#cboRango :selected').attr("data-rango");
        FTVPRER_CODE = $("#cboRango").val();

        var data = new FormData();

        data.append('OPCION', OPCION);
        data.append('CTLG_CODE', CTLG_CODE);
        data.append('MONE_CODE', MONE_CODE);
        data.append('USUA_ID', USUA_ID);
        data.append('PROD_CODE', PROD_CODE);
        data.append('ALMC_CODE', ALMC_CODE);
        data.append('PLAN_CODE', PLAN_CODE);
        data.append('RANG_CODE', RANG_CODE);
        data.append('PRECIO_VENTA', PRE_CANTIDAD);
        data.append('UTILIDAD', UTILIDAD);
        data.append('FTVPRER_CODE', FTVPRER_CODE);

        Bloquear("p_precios");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMPROD.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (res) {
                Desbloquear("p_precios");
                if (res != null) {
                    //DPORTA
                    var resp = res;
                    var arr = resp.split("-");
                    var arr1 = arr[0];
                    if (arr1 == "OK") {
                        exito();
                        var del = "<a href='javascript:quitaritem(" + RANG_CODE + ");' class='btn red icn-only'><i class='icon-remove icon-white'></i></a>";
                        $("#det_tbl_precio").append('<tr id="' + RANG_CODE.replace(".", "_") + '"><td>' + $('#cboRango :selected').text() + '</td><td>' + UTILIDAD + '</td><td>' + PRE_CANTIDAD + '</td><td>' + del + '</td></tr>')
                        $('#txtprecantidad').val('');
                        recargarPrecioCantidad()
                    } else {
                        alertCustom('El Rango Ingresado ya se encuentra registrado!!!');
                    }
                } else {
                    noexito();
                }
            })
            .error(function () {
                Desbloquear("p_precios");
            })
            ;
    }
}

function GrabarPrecioCliente() {
    Errors = true
    if (!vErrors(["txtprecliente", "cboLista", "cboAlmacen"])) {
        Errors = false;
        return;
    }

    var PRECIO_CLIENTE = parseFloat($("#txtprecliente").val());

    var UTILIDAD_VENTA = $.trim($('#txtUtilidadCliente').val());
    if ($.trim(UTILIDAD_VENTA) == "") {
        UTILIDAD_VENTA = "0.00";
        $('#txtUtilidadCliente').val(UTILIDAD_VENTA);
    }
    UTILIDAD_VENTA = parseFloat(UTILIDAD_VENTA);

    var PROD_COD, CTLG_CODE, ALMC_CODE, UNME_CODE, PLAN_CODE, MONE_CODE, USUA_ID, FTVPREL_CODE, OPCION;

    OPCION = '2';
    CTLG_CODE = $('#slcEmpresa').val();
    USUA_ID = $('#ctl00_lblusuario').text();
    PROD_CODE = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val();
    ALMC_CODE = $("#cboAlmacen").val();
    UNME_CODE = $('#cbounidad').val();
    PLAN_CODE = '';
    MONE_CODE = $('#cbomoneda').val();
    FTVPREL_CODE = $('#cboLista').val();

    var data = new FormData();
    data.append('OPCION', OPCION);
    data.append('CTLG', CTLG_CODE);
    data.append('UNME_CODE', UNME_CODE);
    data.append('MONE_CODE', MONE_CODE);
    data.append('USUA_ID', USUA_ID);
    data.append('PROD_CODE', PROD_CODE);
    data.append('ALMC_CODE', ALMC_CODE);
    data.append('PLAN_CODE', PLAN_CODE);
    data.append('PRECIO_VENTA', PRECIO_CLIENTE);
    data.append('UTILIDAD', UTILIDAD_VENTA);
    data.append('FTVPREL_CODE', FTVPREL_CODE);

    Bloquear("p_precios");

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVMPREL.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (res) {
            Desbloquear("p_precios");
            if (res != null) {
                //DPORTA
                var resp = res;
                var arr = resp.split("-");
                var arr1 = arr[0];
                if (arr1 == "OK") {
                    exito();
                    $("#btnGrabarPreCliente").html("<i class='icon-pencil'></i> Modificar");
                    $("#btnGrabarPreCliente").attr("href", "javascript:ActualizarPrecioEstandar();");
                } else {
                    alertCustom("El produto ya se encuentra registrado");
                }
            } else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("p_precios");
        })
};

function ActualizarPrecioCliente() {

    Errors = true
    if (!vErrors(["txtprecliente", "cboLista", "cboAlmacen"])) {
        Errors = false;
        return;
    }

    var PRECIO_CLIENTE = parseFloat($("#txtprecliente").val());

    var UTILIDAD_VENTA = $.trim($('#txtUtilidadCliente').val());
    if (UTILIDAD_VENTA == "") {
        UTILIDAD_VENTA = "0.00";
        $('#txtUtilidadCliente').val(UTILIDAD_VENTA);
    }
    UTILIDAD_VENTA = parseFloat(UTILIDAD_VENTA);

    var data = new FormData();
    data.append('UNME_CODE', $('#cbounidad').val());
    data.append('MONE_CODE', $('#cbomoneda').val());
    data.append('PLAN_CODE', '');
    data.append('CTLG_CODE', $('#slcEmpresa').val());
    data.append('PROD_CODE', $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val());
    data.append('PRECIO_VENTA', PRECIO_CLIENTE);
    data.append('USUA_ID', $('#ctl00_lblusuario').text());
    data.append('UTILIDAD_VENTA', UTILIDAD_VENTA)
    data.append('OPCION', '69');
    data.append('ALMC_CODE', $("#cboAlmacen").val());
    data.append('CODE_LISTA', $("#cboLista").val());

    Bloquear("p_precios");

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMPROD.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (res) {
            Desbloquear("p_precios");
            if (res != null) {
                ////DPORTA
                //var resp = res;
                //var arr = resp.split("-");
                //var arr1 = arr[0];

                if (res == "OK") {
                    exito();
                } else {
                    noexito();
                }
            }
            else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("p_precios");
        });

};

function ActualizarPrecioEstandar() {

    Errors = true
    if (!vErrors(["txtprenormal", "txtpreminimo", "cboAlmacen"])) {
        Errors = false;
        return;
    }

    var PRECIO_NORMAL = parseFloat($("#txtprenormal").val());
    var PRECIO_MINIMO = parseFloat($("#txtpreminimo").val());
    if (PRECIO_NORMAL < PRECIO_MINIMO) {
        infoCustom2('El precio mínimo debe ser menor al precio normal.');
        return;
    }

    var UTILIDAD_VENTA = $.trim($('#txtUtilidadNormal').val());
    if (UTILIDAD_VENTA == "") {
        UTILIDAD_VENTA = "0.00";
        $('#txtUtilidadNormal').val(UTILIDAD_VENTA);
    }
    UTILIDAD_VENTA = parseFloat(UTILIDAD_VENTA);

    var UTILIDAD_MINIMO = $.trim($('#txtUtilidadMinimo').val());
    if (UTILIDAD_MINIMO == "") {
        UTILIDAD_MINIMO = "0.00";
        $('#txtUtilidadMinimo').val(UTILIDAD_MINIMO);
    }
    UTILIDAD_MINIMO = parseFloat(UTILIDAD_MINIMO);

    if (UTILIDAD_VENTA < UTILIDAD_MINIMO) {
        infoCustom2('El porcentaje de utilidad mínimo debe ser menor al porcentaje de utilidad normal.');
        return;
    }

    var data = new FormData();
    data.append('UNME_CODE', $('#cbounidad').val());
    data.append('MONE_CODE', $('#cbomoneda').val());
    data.append('PLAN_CODE', '');

    data.append('CTLG_CODE', $('#slcEmpresa').val());
    data.append('PROD_CODE', $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val());
    data.append('PRECIO_VENTA', PRECIO_NORMAL);
    data.append('PRECIO_MINIMO', PRECIO_MINIMO);
    data.append('USUA_ID', $('#ctl00_lblusuario').text());
    data.append('UTILIDAD_VENTA', UTILIDAD_VENTA);
    data.append('UTILIDAD_MINIMO', UTILIDAD_MINIMO);
    data.append('OPCION', '7');
    data.append('ALMC_CODE', $("#cboAlmacen").val());

    Bloquear("p_precios");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMPROD.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (res) {
            Desbloquear("p_precios");
            if (res != null) {
                //DPORTA
                var resp = res;
                var arr = resp.split("-");
                var arr1 = arr[0];

                if (arr1 == "OK") {
                    exito();
                } else {
                    noexito();
                }
            }
            else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("p_precios");
        });

};

function recargarPrecioCantidad() {
    if (!vErrors(["cboAlmacen"])) {
        return;
    }

    CTLG_CODE = $('#slcEmpresa').val();
    PROD_CODE = $('#txtcodigo').val();
    var ALMC_CODE = $("#cboAlmacen").val();
    Bloquear('det_tbl_precio');
    $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMPROD.ASHX?OPCION=9&PROD_CODE=" + PROD_CODE + "&CTLG_CODE=" + CTLG_CODE + "&ALMC_CODE=" + ALMC_CODE,
        success: function (datos) {
            $("#lista_precios_cantidad").html(datos);
            Desbloquear('det_tbl_precio');
        },
        error: function (msg) {
            //alert(msg);
            Desbloquear('det_tbl_precio');
        }
    });
}

function cargaPrecioCantidad(PROD_CODE, CTLG_CODE) {
    if (!vErrors(["cboAlmacen"])) {
        return;
    }
    var ALMC_CODE = $("#cboAlmacen").val();

    Bloquear("tab_1_2");
    $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMPROD.ASHX?OPCION=9&PROD_CODE=" + PROD_CODE + "&CTLG_CODE=" + CTLG_CODE + "&ALMC_CODE=" + ALMC_CODE,
        async: true,
        success: function (datos) {
            Desbloquear("tab_1_2");
            $("#lista_precios_cantidad").html(datos);
        },
        error: function (msg) {
            Desbloquear("tab_1_2");
            alertCustom("Precio por cantidad no se obtuvo correctamente");
        }
    });
}

function quitaritem(RANG_CODE) {
    if (!vErrors(["cboAlmacen"])) {
        return;
    }

    CTLG_CODE = $('#slcEmpresa').val();
    PROD_CODE = $('#txtcodigo').val();
    var ALMC_CODE = $("#cboAlmacen").val();
    $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMPROD.ASHX?OPCION=10&PROD_CODE=" + PROD_CODE + "&CTLG_CODE=" + CTLG_CODE + "&RANG_CODE=" + RANG_CODE + "&ALMC_CODE=" + ALMC_CODE,
        success: function (datos) {
            if (datos == "OK") {
                exito();
                recargarPrecioCantidad();

            } else {
                noexito();
            }
        },
        error: function (msg) {
            alertCustom("Precio por cantidad no se eliminó correctamente");
        }
    });
}

//Agregar Acreditacion
var tAcreditacion = [];
var tAcreditacionL = [];
//var oAcreditacion = {};
var pCodigoPrdd = "";

// FIN MANTENIMIENTO DE PRECIOS
var NMMPROD = function () {
    var oCentroCostoCab = [];
    var sCentroCostoCab = "";
    var aoNiveles = [];
    datos2 = null;

    var IniciaTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "ID",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "ACREDITACION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "TIPO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "NRO_UNICO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "FECHA_INICIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "FECHA_FIN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "IMPORTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                    }
                }
            ],
            stateSave: false,

            "paginate": true
        };

        oTable = iniciaTabla('tblAcreditacion', parms);

        oTable.fnSort([[0, "desc"]]);


        //actualizarEstilos();              
    }

    var fnCargarParametros = function (psPlanCostos) {
        aoNiveles = CargarNivelesCentroCostos(psPlanCostos);
    };

    var CargarNivelesCentroCostos = function (psPlanCostos) {
        let vNiveles = [];
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LNCC&sCodCentroCostosCab=" + psPlanCostos,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                vNiveles = datos;
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los niveles.");
            }
        });
        return vNiveles;
    };

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
                    URLPROD, DETRAC_CODE, DETRAC_PORCENTAJE, TIPO_BIEN, ISC, ENBRUTO_IND, ESP_ADICIONAL, PRES_CODE, PESO, ISC_CODE;
                //PPBIMAG
                var TIPO = ''; //NOT NULL COMMENT 'N=FOTO PERSONA NATUAL (FOTO PERSONAL), J=FOTO PERSONA JURIDICA (LOGO EMPRESA), A: ANVERSO CHOFER, R: REVERSO CHOFER .',
                var PPBIMAG = ''; //NOT NULL,

                OPCION = "1";


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
                    ISC_CODE = $("#cboTipoSistema").val();
                }
                else {
                    ISC = "0";
                    ISC_CODE = "";
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
                data.append('TIPO_BIEN', TIPO_BIEN);
                data.append('ISC', ISC);
                data.append('ENBRUTO_IND', ENBRUTO_IND);
                data.append('ESP_ADICIONAL', ESP_ADICIONAL);
                data.append('PRES_CODE', PRES_CODE);
                data.append('PESO', PESO);
                data.append('p_COMPRABLE_IND', p_COMPRABLE_IND);
                data.append('p_ISC_CODE', ISC_CODE);
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
                                        $('#p_detalles').slideDown(200);
                                        $("#tabContable").show();
                                        $("#tabMantPre").show();
                                        $("#tabCatCli").show();
                                        ListarCategoriasCliente($('#slcEmpresa').val(), datos[0].CODE_PRODUCTO);
                                        subgrupoprod = GRUPO_CODE;
                                        ListaCeco();
                                        cargaDatosContabilidad(datos[0].CODE_PRODUCTO, subgrupoprod);

                                        fnCargarTablaConfigContab();
                                        let bConfigPorDefecto = false;
                                        console.log("primer aoConfigCtas")
                                        let aoConfigCtas = fnListarCtasConfigAlmacen(bConfigPorDefecto);
                                        if (aoConfigCtas.length === 0) {
                                            bConfigPorDefecto = true;
                                            aoConfigCtas = fnListarCtasConfigAlmacen(bConfigPorDefecto);
                                        }
                                        console.log(aoConfigCtas);

                                        let oTr = {};
                                        for (let i = 0; i < aoConfigCtas.length; i++) {
                                            oTr = $("#tblConfigContabAlmacen").find(`[data-codmovalmc=${aoConfigCtas[i].TMOV_CODE}]`);
                                            $(oTr).find('.ctadebe').val(`${aoConfigCtas[i].CUENTA_DEBE} - ${aoConfigCtas[i].CTAS_DEBE}`);
                                            $(oTr).find('.ctahaber').val(`${aoConfigCtas[i].CUENTA_HABER} - ${aoConfigCtas[i].CTAS_HABER}`);
                                        }

                                        indica_actualizado = 1;
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
        $('#slcEmpresa,#cbogrupo,#cbosubgrupo,#cbounidad,#cbomarca,#cbomoneda,#cboexistencia,#cbovolumen,#cboDetraccion,#cboPresentacion,#cbo_acreditacion, #cboLista').select2();
        $(".combobox").select2();

        //compra
        $('#cbo_cuentaCompra').select2();
        $('#cbo_cuentaIgv').select2();
        $('#cbo_cuentaCompraMN').select2();
        $('#cbo_cuentaCompraME').select2();
        $('#cbo_cuentaCompraRelMN').select2();
        $('#cbo_cuentaCompraRelME').select2();

        //venta
        $('#cbo_cuentaVenta').select2();
        $('#cbo_cuentaIgv_venta').select2();
        $('#cbo_cuentaVentaMN').select2();
        $('#cbo_cuentaVentaME').select2();
        $('#cbo_cuentaVentaRelMN').select2();
        $('#cbo_cuentaVentaRelME').select2();

        $('#txt_fechaInicio').datepicker();
        $('#txt_fechaFin').datepicker();

        $('#cboTipoSistema').select2();

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
                        $('#cbosubgrupo').append('<option value="' + datos[i].Codigo + '" isc_code="' + datos[i].ISC_CODE + '" isc_ind="' + datos[i].ISC_IND + '" >' + datos[i].Descripcion + '</option>');
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
                $('#cbounidad,#cbovolumen').select2('val','');
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
    };

    var fillCboTipoSistema = function () {

        Bloquear($($("#cboTipoSistema").parents("div")[0]).attr("id"));
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/NMMPROD.ashx?OPCION=LTISC",
            contenttype: "application/json;",
            datatype: "json",
            cache: true,
            async: false,
            success: function (datos) {
                Desbloquear($($("#cboTipoSistema").parents("div")[0]).attr("id"));
                $('#cboTipoSistema').empty();
                $('#cboTipoSistema').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoSistema').append('<option value="' + datos[i].CODIGO + '" cod_sunat="' + datos[i].CODIGO_SUNAT + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboTipoSistema').select2('val', '');
            },
            error: function (msg) {
                Desbloquear($($("#cboTipoSistema").parents("div")[0]).attr("id"));
                alertCustom("Tipos de Sistema del ISC no se listaron correctamente");
            }
        });


    }

    var fnCargarAlmacen = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/NM/ajax/NMMPROD.ashx?OPCION=LISTAR_ALMACENES',
            contenttype: "application/json",
            datatype: "json",
            async: false,
            data: { CTLG_CODE: $('#slcEmpresa').val() }
        }).success(function (data) {
            data = (data === null) ? [] : data;
            var select = $('#cboAlmacen');
            $('#cboAlmacen').empty();
            for (var i = 0; i < data.length; i++) {
                select.append('<option value="' + data[i].CODIGO + '" data-codestablec="' + data[i].CODE_SUCURSAL + '">' + data[i].DESCRIPCION + '</option>');
            }
            $('#cboAlmacen').select2("val", $('#ctl00_hddestablecimiento').val()).change();
        }).error(function (msg) {
            alertCustom(msg.statusText);
        });
    };

    function cargaPrecioEstandar(PROD_CODE, CTLG_CODE) {
        if (!vErrors(["cboAlmacen"])) {
            return;
        }

        var ALMC_CODE = $("#cboAlmacen").val();

        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMPROD.ASHX?OPCION=6&PROD_CODE=" + PROD_CODE + "&CTLG_CODE=" + CTLG_CODE + "&ALMC_CODE=" + ALMC_CODE,
            contentType: "application/json;",
            dataType: "json",
            async: true,
            success: function (datos) {
                if (datos != null) {
                    $("#g_pre_estandar").html("<i class='icon-pencil'></i> Modificar");
                    $("#g_pre_estandar").attr("href", "javascript:ActualizarPrecioEstandar();");
                    $('#txtprenormal').val(datos[0].PRECIO_VENTA);
                    $('#txtpreminimo').val(datos[0].PRECIO_MINIMO);
                    $('#txtUtilidadNormal').val(datos[0].UTILIDAD_VENTA);
                    $('#txtUtilidadMinimo').val(datos[0].UTILIDAD_MINIMO);
                }
                if ($("#txtprenormal").val() == "" && $("#txtpreminimo").val() == "") {
                    $("#g_pre_estandar").html("<i class='icon-save'></i> Grabar");
                    $("#g_pre_estandar").attr("href", "javascript:GrabarPrecioEstandar();");
                }
            },
            error: function (msg) {
                alertCustom("Precio estándar no se listó correctamente");
            }
        });
    };
    
    //Precio cliente
    function cargaPrecioClientePorLista(PROD_CODE, CTLG_CODE) {
        if (!vErrors(["cboAlmacen"])) {
            return;
        }

        var ALMC_CODE = $("#cboAlmacen").val();
        var CODE_LISTA = $("#cboLista").val();

        Bloquear("ventana");

        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMPROD.ASHX?OPCION=PRECIO_LISTA&PROD_CODE=" + PROD_CODE + "&CTLG_CODE=" + CTLG_CODE + "&ALMC_CODE=" + ALMC_CODE + "&CODE_LISTA=" + CODE_LISTA,
            contentType: "application/json;",
            dataType: "json",
            async: true,
            success: function (datos) {
                if (CODE_LISTA == "") {
                    $("#txtprecliente").empty();
                    $("#txtUtilidadCliente").empty();
                } else {
                    $("#txtprecliente").empty();
                    $("#txtUtilidadCliente").empty();

                    if (datos != null) {
                        $("#btnGrabarPreCliente").html("<i class='icon-pencil'></i> Modificar");
                        $("#btnGrabarPreCliente").attr("href", "javascript:ActualizarPrecioCliente();");
                        //$('#cboLista').val(datos[0].NOMBRE_LISTA);
                        $('#txtprecliente').val(datos[0].PRECIO_VENTA);
                        $('#txtUtilidadCliente').val(datos[0].UTILIDAD_VENTA);
                    }
                    if ($("#txtprecliente").val() == "" && $("#txtpreminimo").val() == "") {
                        $("#btnGrabarPreCliente").html("<i class='icon-save'></i> Grabar");
                        $("#btnGrabarPreCliente").attr("href", "javascript:GrabarPrecioCliente();");
                    }
                }
            },
            error: function (msg) {
                alertCustom("Precio cliente no se listó correctamente");
            }
        });
    };

    var handleTablaCategoria = function () {

        oTableCategoria = iniciaTabla('tbl_categoria', {
            data: null,
            columns: [
                { data: "CODIGO" },
                { data: "DESCRIPCION" },
                {
                    data: "DESCUENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).attr('data-type-decimal', true);
                    },
                    type: "formatoMiles"
                }
            ],
            scrollCollapse: true,
            paging: false,
            info: false,
            sort: false


        });

        $('#tbl_categoria').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tbl_categoria_filter').css('display', 'none');

    }

    var editaTabla = function () {

        oTableCategoria.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [
                null, null,
                {
                    cssclass: "required number monto",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }
            ],
            fnOnEditing: function (input, settings, original) {
                if ($(input.parents("form")[0]).hasClass("monto")) {
                    return true;

                }

            }
        });
    }

    var ListarCategoriasCliente = function (empresa, producto) {

        Bloquear("p_categoria .portlet-body");
        USUA_ID = $('#ctl00_lblusuario').text();
        PROD_CODE = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val();
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmprod.ashx?OPCION=11&CTLG_CODE=" + empresa + "&PROD_CODE=" + producto + "&SCSL_CODE=" + $("#cboAlmacen").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("p_categoria .portlet-body");
                $('#tbl_det_categoria').html(datos);

                $('#tbl_categoria').dataTable({
                    "paging": true,
                    "searching": true,
                    "info": true,
                    "scrollX": true
                });
            },
            error: function (msg) {
                Desbloquear("p_categoria .portlet-body");
                alertCustom("Categorías de clientes no se listaron correctamente");
            }
        });
    }

    var cargaInicial = function () {

        inputFile("fileDNI", "imgDNI", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAFeAV4DASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECAwQG/8QALRABAAIBAQUIAwACAwAAAAAAAAECEQMEEhMhMRQyM0FRUmFxIoGRQlMjJEP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAlAaCJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJlAXKpEKAAAAAkwoDLUSkwgNCKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmSUAWIIhQAAAAAAAAGZhoBlqJSYQGgiQAAAAAAAAAAAAAAAAAAAAAAAABDKALgiFAAAAAAAAAAAAATCgMqkgNBAAAAAAAAAAAAAAAAAAAAAAkySgCxBCgAAAAAAAAAAAAAAAAJhQGY6tZZkgGgAAAAAAAAAAAAAAAAAElUwCLEKAAAAAAAAAAAAAAAAAAAAAGAAAAGZvWJxNo/pxKe6P6DQzxKe6P6cSnuj+g0M8Snuj+rFonpMSCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMcTTzjfhq3ct9PJo7LS9d6esyCV2euta9ptPXliW+w6fut/XopStK7tYaB5ew6fut/TsOn7rf16gHl7Dp+639dNOlNDlNuXy7Oero11u9ALxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyDtxdP3wcXT98OPYdL5Ow6XyD0VvW3dnKuOlpV0cxXzdgAAAAAAAAAAAAAAAAAAAAAAAAS3dn6c9m8L9ulu7P057N4X7B1MHKDOQMGAA6DN5xWZyUtF6xaAaAABYgEFzhnejpmAUAAAGZ7zTM95oAAAAAAAAAAAAAAAAAAAAAAAAEt3Z+nPZvC/bpbuz9OezeF+wdJjMT5S81p2qszFaxMer1APHxNr/ANcG/tn+uHsAePd2nW/G8RWvm9VKRSsVjyaAAAInHNjV1I0qTe8tebx68Tr7RFP8a9QY3tfaZzWZpRY2O3WdS2ft7aVitYx0hqZ+AeKOPoTnO9V6tO8alcwTiLYnzc614ery6WB2ifLzhWLTu3iZ8+TYMz3mmZ7zQAAAAAAAAAAAAAAAAAAAAAAAAJbuz9OezeF+3S3dn6c9m8L9g6gAAAAAAAkd559OP+xfLvM4t8SxemL78fsFrf8ALddHDV05vGazizhNtq7sY+8A662pE7RStec+braMy5bPocOd605tL0Y/sg5a84mkesuzyzbjbXuxzrR6gZnvNMz3mgAAAAAAAAAAAAAAAAAAAAAAAAS3dn6c9m8L9ulu7P057N4X7B1AAAAAAABnUrNq4jq56etEzu35Wj1dnPV0aakYnlPqDW7ELux5y8u5tOl3Ji8fJOttOPA5g9fKvR5to2j/AA0vyvPp5OW5tWvOLzuQ9Gjs9NLpznzkDZtLhU596esux5gMz3mmZ7zQAAAAAAAAAAAAAAAAAAAAAAAAJbuz9Oez+H+3WYzWY9WNGm5TE+oNigIKAgoCCgIKAgoCCgIKAx/k0mOagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAluks6U5plq3dljR8MHTMepmPVx0672cz5lazvzXPKAdsxPSRxmNzUjd6S3qRWcb04gG8x6jhmIvG7M4b1JmbVr6g3mPVXO2nEV5ZhmLTXRz8g7Zj1HCIpjM25/bVJzSecg65j1HHTpvVzMyunmLzXyB1cdW0xeIj0dnO3jR9A3Wd6rGZ40x8JH/AB3x5SsePP0DomY9XO2b6m75QXpu1zXPIHUSk5rEqAAAAAAAAAAAAAAAAAAAAAACW7ssaUTGm6HTkDnpZiJK+NLpjADlqd+pacamZ5w6pMRPWAcrTm1d2OS6mYtW3lDriPRm1t3rGQZtqRNeXOWYrNtHHyTbe/GtebpSu7WIBiLVxzjm1ymk4hrEZ6L+gY0o/DCVieLMuhjzAc7RPGrPw6HyDN670Oennic3Y/QOVs01N6Y5SXvFo3a55uqRGAKRisR6KAAAAAAAAAAAAAAAAAAAAAAABkc9XnaseoOmfkc+FHlMlJmLTSZ+gbzGcZVnFd/5LXrXrINCRaJjMJN646g0JW0W6SWtFeoKMxeszylZtEYyCk8meJXOMrbE159AMxjKxzc78tPl0K3rERGQdEic9CJi1cwxpef2DoMzesTiZhYmLdJBQAAAAAAAAAAAAAAAAAASZAyIoKAA56vfo6OerE5rMRnAOjlPPWjHku9eeUVwtKYzM9ZBn/3n6TuWnejMS1uzxc/BN55xNcg1GJrOGNGsTEzK0rMUtM+fkxp2msdMwDUxu6sY6FY3rzMlYm1t63ImLUtmIzEgatYrG9HKU1Oe4s72pOMYhb1zNceQLesbnJnnOjLd4zWYZ3Z4UwDNvAbpWN3nEJNZ4OMc0i1q1iJqBTle0eSUmYraWqVmM2nrJSs4tE+YMUtGMzWZmWtOfznliErM0jG7l0rMz5YBoAElIlpkGhmGoAAAAAAAAAAABJkCZQWIAhQAAAAAAAABJzhnTru1xLYAAAAAAAAAAAAAAAYAGZjA1LINCKAAAAAAACTIEygsAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMkLhJjANDLQAAAJIEygoGFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkAZVWQaGYaATCgJEKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgATCgD//2Q==", iImgAncho, iImgAlto, 0.5);

        let sCodEmpresa = ObtenerQueryString("sCodEmpresa");
        let cod = ObtenerQueryString("codigo");
        $("#chkactivoAcre").attr("checked", "checked");
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
                    console.log(datos);
                    datos2 = datos;
                    $('#p_detalles').slideDown(200);
                    $("#grabarProducto").html("<i class='icon-pencil'></i> Modificar");

                    $('#slcEmpresa').select2("val", datos[0].CTLG_CODE).change();
                    $('#txtcodigo').val(datos[0].PROD_CODE);
                    fnObtenerAcreditacionPrd();
                    //ListarTablaDetalles(ObtenerTablaDetalles());
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
                        $('#chklista').attr('checked', true).change();
                    }
                    else {
                        $('#uniform-chklista span').removeClass();
                        $('#chklista').attr('checked', false).change();
                    }

                    if (datos[0].COMPRABLE_IND == 'S') {
                        $('#uniform-chkComprable span').removeClass().addClass("checked");
                        $('#chkComprable').attr('checked', true).change();
                    }
                    else {
                        $('#uniform-chkComprable span').removeClass();
                        $('#chkComprable').attr('checked', false).change();
                    }

                    // $('#cboexistencia').select2("val", datos[0].CODE_EXISTENCIA).change();
                    $('#cboexistencia').append("<option value='" + datos[0].CODE_EXISTENCIA + "' almacenable='" + datos[0].ALMACENABLE_IND + "'>" + datos[0].DESC_EXISTENCIA + "<option>").select2("val", datos[0].CODE_EXISTENCIA);

                    $('#txtPeso').val(datos[0].PESO);
                    if ($("#cboexistencia option:selected").attr("almacenable") == "S") {
                        $("#txtPeso").removeAttr("disabled");

                    } else {
                        $("#txtPeso").attr("disabled", "disabled")
                    }

                    // $('#chkDetraccion').change();
                    // $('#cboDetraccion').append('<option value="' + datos[i].DETRACCION_CODE + '" data-percent="' + datos[i].PORCENTAJE + '" data-info="' + datos[i].INFORMACION + '" >' + datos[i].DEFINICION + '</option>');
                    fillCboDetraccion();
                    if (datos[0].DETRACCION_CODE != null && datos[0].DETRACCION_CODE != "") {
                        $('#uniform-chkDetraccion span').removeClass().addClass("checked");
                        $("#chkDetraccion").attr("checked", true);
                        //fillCboDetraccion();
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
                    $('#cbosubgrupo').append("<option value='" + datos[0].SUBGRUPO + "' isc_code='" + datos[0].ISC_CODE + "' isc_ind='" + datos[0].ISC_IND + "' >" + datos[0].DESC_SUBGRUPO + "<option>").select2("val", datos[0].SUBGRUPO);
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
                    if (datos[0].URLPROD == 'N')
                        $('#txtfichatecnica').val('');
                    else
                        $('#txtfichatecnica').val(datos[0].URLPROD);



                    $('#imgDNI').attr("src", datos[0].RUTA_IMAGEN);

                    if (datos[0].TIPO_BIEN == "GIS") {
                        $("#rbIsc").attr("checked", true);
                        $("#rbIsc").parent("span").addClass("checked");

                        $("#txtIsc").val(datos[0].ISC)
                        $("#txtIsc").removeAttr("disabled");
                        $('#txtIsc').addClass("required");
                        $('#cboTipoSistema').removeAttr("disabled");
                        $("#cboTipoSistema").addClass("required");
                        if (datos[0].ISC_CODE !== '0' && datos[0].ISC_CODE.length === 4) {                            
                            $('#cboTipoSistema').select2('val', datos[0].ISC_CODE);
                        } else {
                            $('#cboTipoSistema').select2('val', '');
                        }
                        
                    }
                    else if (datos[0].TIPO_BIEN == "INA") {
                        $("#rbInafecto").attr("checked", true);
                        $("#rbInafecto").parent("span").addClass("checked");
                        $("#rbGravado").parent("span").removeClass("checked");
                        $("#rbIsc").attr("disabled", "disabled");
                        $('#cboTipoSistema').select2('val', '');
                        $('#cboTipoSistema').attr("disabled", "disabled");
                        $("#cboTipoSistema").removeClass("required");
                    }
                    else if (datos[0].TIPO_BIEN == "EXO") {
                        $("#rbExonerado").attr("checked", true);
                        $("#rbExonerado").parent("span").addClass("checked");
                        $("#rbGravado").parent("span").removeClass("checked");
                        $("#rbIsc").attr("disabled", "disabled");
                        $('#cboTipoSistema').select2('val', '');
                        $('#cboTipoSistema').attr("disabled", "disabled");
                        $("#cboTipoSistema").removeClass("required");
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

                    Desbloquear("producto");
                    //ListarCategoriasCliente(datos[0].CTLG_CODE, datos[0].PROD_CODE);
                    //ListarCuentasSubgrupo(datos[0].SUBGRUPO, datos[0].CTLG_CODE);
                    //cargaDatosContabilidad(datos[0].PROD_CODE, datos[0].SUBGRUPO);
                    $('#tabContable').show();
                    $("#tabMantPre").show();
                    $("#tabCatCli").show();
                    indica_actualizado = 1;
                    subgrupoprod = datos[0].SUBGRUPO;
                    //ListaCeco();
                    Verifica_Mov_Kadex();

                    //cargaPrecioEstandar(datos[0].PROD_CODE, datos[0].CTLG_CODE);
                    //cargaPrecioCantidad(datos[0].PROD_CODE, datos[0].CTLG_CODE);
                    $("#rbPrecioEstandar").change();
                    if (datos[0].PRECIO_IND == "C") {
                        $("#rbPrecioCantidad").attr("checked", true);
                        $("#rbPrecioCantidad").parent("span").addClass("checked");
                        $("#rbPrecioEstandar").parent("span").removeClass("checked");
                        $("#rbPrecioCliente").parent("span").removeClass("checked");
                    } if (datos[0].PRECIO_IND == "L"){
                        $("#rbPrecioCliente").attr("checked", true);
                        $("#rbPrecioCliente").parent("span").addClass("checked");
                        $("#rbPrecioEstandar").parent("span").removeClass("checked");
                        $("#rbPrecioCantidad").parent("span").removeClass("checked");
                    }
                    else {
                        $("#rbPrecioEstandar").attr("checked", true);
                        $("#rbPrecioEstandar").parent("span").addClass("checked");
                        $("#rbPrecioCantidad").parent("span").removeClass("checked");
                        $("#rbPrecioCliente").parent("span").removeClass("checked");
                    }
                    $("input[name=rbPrecio]").change();

                    if (datos[0].ISC_IND == 'S') {
                        $("#rbIsc").attr("checked", true);
                        $("#rbIsc").parent("span").addClass("checked");

                        $("#txtIsc").val(datos[0].ISC)
                        $("#txtIsc").removeAttr("disabled");
                        $('#txtIsc').addClass("required");   
                        $('#cboTipoSistema').removeAttr("disabled");
                        $("#cboTipoSistema").addClass("required");
                        if (datos[0].ISC_CODE !== '0' && datos[0].ISC_CODE.length === 4) {
                            $('#cboTipoSistema').select2('val', datos[0].ISC_CODE);
                        } else {
                            $('#cboTipoSistema').select2('val', '');
                        }               
                    }


                    //fnCargarTablaConfigContab();

                    //let bConfigPorDefecto = false;
                    //let aoConfigCtas = fnListarCtasConfigAlmacen(bConfigPorDefecto);
                    //if (aoConfigCtas.length === 0) {
                    //    bConfigPorDefecto = true;
                    //    aoConfigCtas = fnListarCtasConfigAlmacen(bConfigPorDefecto);
                    //}
                    //let oTr = {};
                    //for (let i = 0; i < aoConfigCtas.length; i++) {
                    //    oTr = $("#tblConfigContabAlmacen").find(`[data-codmovalmc=${aoConfigCtas[i].TMOV_CODE}]`);
                    //    $(oTr).find('.ctadebe').val(`${aoConfigCtas[i].CUENTA_DEBE} - ${aoConfigCtas[i].CTAS_DEBE}`);
                    //    $(oTr).find('.ctahaber').val(`${aoConfigCtas[i].CUENTA_HABER} - ${aoConfigCtas[i].CTAS_HABER}`);
                    //}
                },
                error: function (msg) {
                    MostrarError(msg, "producto");
                }
            });
        }
        $('#p_detalles').slideUp(200);
    };

    var eventoControles = function () {

        $("#grabarProducto").on("click", function () {
            let sCodProducto = $("#txtcodigo").val();
            sCodProducto = $.trim($("#txtcodigo").val());

            if (sCodProducto === "") {
                Grabar();
            } else {
                Actualizar();
            }

        });
        //EVENTOS PARTE CONTABLE 


        $("#tabMantPre").on("click", function () {
            cargaPrecioEstandar($("#txtcodigo").val(), $("#slcEmpresa").val());
            cargaPrecioCantidad($("#txtcodigo").val(), $("#slcEmpresa").val());
            cargaPrecioClientePorLista($("#txtcodigo").val(), $("#slcEmpresa").val());
            fillCboRangoPrecioCantidad();
            //fillCboListaClientes();
            ListarCategoriasCliente($("#slcEmpresa").val(), $("#txtcodigo").val());
        });

        $("#tabContable").on("click", function () {
            ListaCeco();
            cargaDatosContabilidad($("#txtcodigo").val(), $("#cbosubgrupo").val());

            fnCargarTablaConfigContab();

            let bConfigPorDefecto = false;
            let aoConfigCtas = fnListarCtasConfigAlmacen(bConfigPorDefecto);
            if (aoConfigCtas.length === 0) {
                bConfigPorDefecto = true;
                aoConfigCtas = fnListarCtasConfigAlmacen(bConfigPorDefecto);
            }
            console.log(aoConfigCtas)
            let oTr = {};
            for (let i = 0; i < aoConfigCtas.length; i++) {
                oTr = $("#tblConfigContabAlmacen").find(`[data-codmovalmc=${aoConfigCtas[i].TMOV_CODE}]`);
                $(oTr).find('.ctadebe').val(`${aoConfigCtas[i].CUENTA_DEBE} - ${aoConfigCtas[i].CTAS_DEBE}`);
                $(oTr).find('.ctahaber').val(`${aoConfigCtas[i].CUENTA_HABER} - ${aoConfigCtas[i].CTAS_HABER}`);
            }
            console.log(oTr)
        });






        //compras
        $('#cbo_cuentaCompra').on('change', function () {
            var desc = $('#cbo_cuentaCompra').val();
            document.getElementById("cbo_cuentaCompra_desc").innerHTML = desc;
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

        $("#registrar_descuento").on("click", function () {
            Bloquear("ventana")
            let utilidad = $('#txtUtilidadMinimo').val();

            if (vErrors(["txtUtilidadMinimo", "cbogrupo", "cbosubgrupo", "cbounidad", "txtmodelo", "txtproducto", "codproducto", "cbomoneda"])) {
                if (bandera || utilidad != '') {

                    var datos_fila = '';
                    var total_reg = $("#tbl_categoria").find(".descuento").length;

                    for (var i = 0; i < total_reg; i++) {

                        var codProducto = $($("#tbl_categoria").find(".descuento")[i]).data("cod");
                        var descuento = $($("#tbl_categoria").find(".descuento")[i]).val();
                        datos_fila += codProducto + ',' + $('#txtcodigo').val() + ',' + descuento + ',' + $('#ctl00_txtus').val() + ',' + $('#cboAlmacen').val();
                        datos_fila += '|';
                    }

                    $.ajax({
                        type: "post",
                        url: "vistas/nm/ajax/nmmprod.ashx?OPCION=12&P_DETALLES=" + datos_fila,
                        //contenttype: "application/json;",
                        //datatype: "json",
                        async: false,
                        success: function (data) {



                            if (!isEmpty(data)) {

                                if (data == "OK") {
                                    exito();
                                    Desbloquear("ventana")
                                    return
                                } else {
                                    noexito();
                                }




                            } else { noexito() }
                        },
                        error: function (msg) {
                            noexito();
                        }
                    });
                } else {
                    infoCustom2('Verifique los valores ingresados');
                }
            }

        });

        $('#cbo_cuentaIgv').on('change', function () {
            var desc = $('#cbo_cuentaIgv').val();
            document.getElementById("cbo_cuentaIgv_desc").innerHTML = desc;
        });

        $('#cbo_cuentaCompraMN').on('change', function () {
            var desc = $('#cbo_cuentaCompraMN').val();
            document.getElementById("cbo_cuentaCompraMN_desc").innerHTML = desc;
        });

        $('#cbo_cuentaCompraME').on('change', function () {
            var desc = $('#cbo_cuentaCompraME').val();
            document.getElementById("cbo_cuentaCompraME_desc").innerHTML = desc;
        });

        $('#cbo_cuentaCompraRelMN').on('change', function () {
            var desc = $('#cbo_cuentaCompraRelMN').val();
            document.getElementById("cbo_cuentaCompraRelMN_desc").innerHTML = desc;
        });

        $('#cbo_cuentaCompraRelME').on('change', function () {
            var desc = $('#cbo_cuentaCompraRelME').val();
            document.getElementById("cbo_cuentaCompraRelME_desc").innerHTML = desc;
        });

        //ventas
        $('#cbo_cuentaVenta').on('change', function () {
            var desc = $('#cbo_cuentaVenta').val();
            document.getElementById("cbo_cuentaVenta_desc").innerHTML = desc;
        });

        $('#cbo_cuentaIgv_venta').on('change', function () {
            var desc = $('#cbo_cuentaIgv_venta').val();
            document.getElementById("cbo_cuentaIgv_venta_desc").innerHTML = desc;
        });

        $('#cbo_cuentaVentaMN').on('change', function () {
            var desc = $('#cbo_cuentaVentaMN').val();
            document.getElementById("cbo_cuentaVentaMN_desc").innerHTML = desc;
        });

        $('#cbo_cuentaVentaME').on('change', function () {
            var desc = $('#cbo_cuentaVentaME').val();
            document.getElementById("cbo_cuentaVentaME_desc").innerHTML = desc;
        });

        $('#cbo_cuentaVentaRelMN').on('change', function () {
            var desc = $('#cbo_cuentaVentaRelMN').val();
            document.getElementById("cbo_cuentaVentaRelMN_desc").innerHTML = desc;
        });

        $('#cbo_cuentaVentaRelME').on('change', function () {
            var desc = $('#cbo_cuentaVentaRelME').val();
            document.getElementById("cbo_cuentaVentaRelME_desc").innerHTML = desc;
        });

        //FIN DE EVENTOS PARTE CONTABLE

        $("#txtPeso").on("click", function () {
            if ($(this).attr("disabled") != "disabled") {
                $(this).select();
            }
        });

        $('#cbomoneda').on('change', function () {
            $(".simboloMoneda").html($('#cbomoneda :selected').attr("simbolo"));
        });

        $('#slcEmpresa').on('change', function () {
            fillCboEstablecimiento($("#slcEmpresa").val());
            fnCargarAlmacen();
            $("#cboexistencia").change();

            fnCargarComboCuentasContabAlmacen();
        });

        $("#cboEstablecimiento").on("change", function () {
            asincrono = true;
            //CargarCostosProducto();
            asincrono = false;

        });

        $("#cboAlmacen").on("change", function () {
            if ($("#cboAlmacen").val() === "") {
                return;
            }
            CargarCostosProducto();
            cargaPrecioEstandar($('#txtcodigo').val(), $('#slcEmpresa').val());
            cargaPrecioCantidad($('#txtcodigo').val(), $('#slcEmpresa').val());
            cargaPrecioClientePorLista($('#txtcodigo').val(), $('#slcEmpresa').val());
            ListarCategoriasCliente($('#slcEmpresa').val(), $('#txtcodigo').val());

        });

        $("#cboLista").on("change", function () {

            if ($("#cboLista").val() === "") {
                return;
            }
            cargaPrecioClientePorLista($('#txtcodigo').val(), $('#slcEmpresa').val());
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
            indica_actualizado = 0;
            if ($("#cbosubgrupo").val() !== "" || $("#cbosubgrupo").val().length === 0) {
                var isc_code = $("#cbosubgrupo :selected").attr("isc_code");
                var isc_ind = $("#cbosubgrupo :selected").attr("isc_ind");
                if (isc_ind != '0' && isc_code.length === 4) {
                    if ($("#rbIsc").is(":checked")) {
                        $("#cboTipoSistema").select2('val', isc_code);
                    } else {
                        $("#cboTipoSistema").select2('val', '');
                    }
                    
                } else {
                    $("#cboTipoSistema").select2('val', '');
                }
            } else {
                $("#cboTipoSistema").select2('val', '');
            }
        });

        $('#cbovolumen').on('change', function () {
            var auxiliar = $('#cbovolumen option:selected').attr("corto");
            $($("#s2id_cbovolumen a span")[0]).html(auxiliar);
        });

        $('#txtmodelo').on('blur', function () {
            var sgrupo = $.trim($("#cbosubgrupo option:selected").text());
            var marca = $.trim($("#cbomarca option:selected").text());
            var modelo = $.trim($("#txtmodelo").val());

            if (marca == "") {
                $.trim($("#txtproducto").val(sgrupo + ' ' + modelo));
            } else {
                $.trim($("#txtproducto").val(sgrupo + ' ' + marca + ' ' + modelo));
            }
            
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

        //Validaciones de interfaz para Precios
        $("input[name=rbPrecio]").on("change", function () {
            if ($("#rbPrecioEstandar").is(":checked")) {
                $("#tab_1_1").attr('class', 'tab-pane active');
                $("#tab_1_2").attr('class', 'tab-pane');
                $("#tab_1_3").attr('class', 'tab-pane');

                $("#btnTab1").attr('class', 'active');
                $("#btnTab2").removeAttr('class');
                $("#btnTab3").removeAttr('class');

                $("#cboRango").attr("disabled", "disabled");
                $("#txtprecantidad").attr("disabled", "disabled");
                $("#btnGrabarPreCantidad").attr("disabled", "disabled");
                $("#btnRecargarPreCantidad").attr("disabled", "disabled");
                $("#btnGrabarPreCantidad").removeAttr("href");
                $("#btnRecargarPreCantidad").removeAttr("href");

                $("#txtpreminimo").removeAttr("disabled");
                $("#txtprenormal").removeAttr("disabled");
                $("#g_pre_estandar").removeAttr("disabled");
                var cod = ObtenerQueryString("codigo");
                if (typeof cod != 'undefined' && cod != '') {
                    $("#g_pre_estandar").html("<i class='icon-pencil'></i> Modificar");
                    $("#g_pre_estandar").attr("href", "javascript:ActualizarPrecioEstandar();");
                }
                else {
                    $("#g_pre_estandar").attr("href", "javascript:GrabarPrecioEstandar();");
                }
                if ($("#txtprenormal").val() == "" && $("#txtpreminimo").val() == "") {
                    $("#g_pre_estandar").html("<i class='icon-save'></i> Grabar");
                    $("#g_pre_estandar").attr("href", "javascript:GrabarPrecioEstandar();");
                }
            } if ($("#rbPrecioCliente").is(":checked")) {
                $("#tab_1_3").attr('class', 'tab-pane active');
                $("#tab_1_1").attr('class', 'tab-pane');
                $("#tab_1_2").attr('class', 'tab-pane');
                $("#btnTab3").attr('class', 'active');
                $("#btnTab1").removeAttr('class');
                $("#btnTab2").removeAttr('class');

                //$("#cboRango").attr("disabled", "disabled");
                //$("#txtprecantidad").attr("disabled", "disabled");
                //$("#btnGrabarPreCantidad").attr("disabled", "disabled");
                //$("#btnRecargarPreCantidad").attr("disabled", "disabled");
                //$("#btnGrabarPreCantidad").removeAttr("href");
                //$("#btnRecargarPreCantidad").removeAttr("href");

                //$("#txtpreminimo").removeAttr("disabled");
                //$("#txtprenormal").removeAttr("disabled");
                //$("#g_pre_estandar").removeAttr("disabled");

            } if ($("#rbPrecioCantidad").is(":checked")) {
                $("#tab_1_1").attr('class', 'tab-pane')
                $("#tab_1_2").attr('class', 'tab-pane active')
                $("#tab_1_3").attr('class', 'tab-pane');

                $("#btnTab1").removeAttr('class');
                $("#btnTab2").attr('class', 'active');
                $("#btnTab3").removeAttr('class');

                $("#cboRango").removeAttr("disabled", "disabled");
                $("#txtprecantidad").removeAttr("disabled", "disabled");
                $("#btnGrabarPreCantidad").removeAttr("disabled", "disabled");
                $("#btnRecargarPreCantidad").removeAttr("disabled", "disabled");
                $("#btnGrabarPreCantidad").attr("href", "javascript:GrabarPrecioCantidad();");
                $("#btnRecargarPreCantidad").attr("href", "javascript:recargarPrecioCantidad();");

                $("#txtpreminimo").attr("disabled", "disabled");
                $("#txtprenormal").attr("disabled", "disabled");
                $("#g_pre_estandar").attr("disabled", "disabled");
                $("#g_pre_estandar").removeAttr("href");
            } else {
                //alertCustom("No se cargó correctamente el precio del producto");
                //return;
            }
        });

        $("#btnTab1").on("click", function () {
            $("#rbPrecioEstandar").attr("checked", true);
            $("#rbPrecioEstandar").parent("span").addClass("checked");
            $("#rbPrecioCantidad").parent("span").removeClass("checked");
            $("#rbPrecioCliente").parent("span").removeClass("checked");
            $("input[name=rbPrecio]").change();
        });

        $("#btnTab2").on("click", function () {
            $("#rbPrecioCantidad").attr("checked", true);
            $("#rbPrecioCantidad").parent("span").addClass("checked");
            $("#rbPrecioEstandar").parent("span").removeClass("checked");
            $("#rbPrecioCliente").parent("span").removeClass("checked");
            $("input[name=rbPrecio]").change();
        });

        $("#btnTab3").on("click", function () {
            $("#rbPrecioCliente").attr("checked", true);
            $("#rbPrecioCliente").parent("span").addClass("checked");
            $("#rbPrecioEstandar").parent("span").removeClass("checked");
            $("#rbPrecioCantidad").parent("span").removeClass("checked");
            $("input[name=rbPrecio]").change();
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
                $('#cboTipoSistema').select2('val', '');
                $("#cboTipoSistema").attr("disabled", "disabled");
            }
        });

        $("#rbIsc").on("change", function () {
            if ($("#rbIsc").is(":checked")) {
                $("#txtIsc").removeAttr("disabled");
                $('#txtIsc').addClass("required");                
                $("#cboTipoSistema").removeAttr("disabled");
                $("#cboTipoSistema").addClass("required");
                // validar isc por defecto según el subgrupo seleccionado
                if ($("#cbosubgrupo").val() !== "" || $("#cbosubgrupo").val().length !== 0 ) {
                    var isc_ind = $("#cbosubgrupo :selected").attr("isc_ind");
                    var isc_code = $("#cbosubgrupo :selected").attr("isc_code");
                    if (isc_ind == "S" && isc_code.length === 4) {
                        $('#cboTipoSistema').select2('val', isc_code);
                    } else {
                        $('#cboTipoSistema').select2('val', '');
                    }
                } else {
                    $('#cboTipoSistema').select2('val', '');
                }
                
            }
            else {
                $("#txtIsc").attr("disabled", "disabled");
                $("#txtIsc").val("");
                $('#txtIsc').removeClass("required");
                $('#cboTipoSistema').select2('val', '');
                $("#cboTipoSistema").attr("disabled", "disabled");
                $("#cboTipoSistema").removeClass("required");
            }
        });

        //$("#btnCargarCostos").on("click", function () {
        //    CargarCostosProducto();
        //});

        $("#btnCalcularPreciosEstandar").on("click", function () {
            if ($("#cboAlmacen").val() === "") {
                return;
            }

            Bloquear("p_precios")
            CargarCostosProducto();
            var precioNormal, preciodMinimo = 0;
            if (parseFloat($("#txtNeto").val()) != 0) {
                if ($.trim($("#txtUtilidadNormal").val()) != "") {
                    precioNormal = parseFloat($("#txtNeto").val()) + parseFloat($("#txtNeto").val()) * (parseFloat($("#txtUtilidadNormal").val()) / 100);
                    $("#txtprenormal").val(precioNormal.toFixed(2));
                }
                if ($.trim($("#txtUtilidadMinimo").val()) != "") {
                    preciodMinimo = parseFloat($("#txtNeto").val()) + parseFloat($("#txtNeto").val()) * (parseFloat($("#txtUtilidadMinimo").val()) / 100);
                    $("#txtpreminimo").val(preciodMinimo.toFixed(2));
                }
                Desbloquear("p_precios")
            } else {
                Desbloquear("p_precios")
                infoCustom2("El cálculo no se realizó ya que el Costo Neto encontrado fue 0.");
            }
        });

        $("#btnCalcularPreciosCantidad").on("click", function () {
            if ($("#cboAlmacen").val() === "") {
                return;
            }

            CargarCostosProducto();
            var precioCantidad = 0;
            if (parseFloat($("#txtNeto").val()) != 0) {

                if ($.trim($("#txtUtilidadCantidad").val()) != "") {
                    precioCantidad = parseFloat($("#txtNeto").val()) + parseFloat($("#txtNeto").val()) * (parseFloat($("#txtUtilidadCantidad").val()) / 100);
                    $("#txtprecantidad").val(precioCantidad.toFixed(2));
                }

            } else {
                infoCustom2("El cálculo no se realizó ya que el Costo Neto encontrado fue 0.");
            }
        });

        $("#btnCalcularPreciosCliente").on("click", function () {
            if ($("#cboAlmacen").val() === "") {
                return;
            }

            CargarCostosProducto();
            var precioCliente = 0;
            if (parseFloat($("#txtNeto").val()) != 0) {

                if ($.trim($("#txtUtilidadCliente").val()) != "") {
                    precioCliente = parseFloat($("#txtNeto").val()) + parseFloat($("#txtNeto").val()) * (parseFloat($("#txtUtilidadCliente").val()) / 100);
                    $("#txtprecliente").val(precioCliente.toFixed(2));
                }

            } else {
                infoCustom2("El cálculo no se realizó ya que el Costo Neto encontrado fue 0.");
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

        $('#chkComprable').on('change', function () {
            if ($("#chkComprable").is(":checked")) {
                DesbloquearSinGif("#Compras");
            } else {
                BloquearSinGif("#Compras");
            }
        });

        $('#chklista').on('change', function () {
            if ($("#chklista").is(":checked")) {
                DesbloquearSinGif("#Ventas");
            } else {
                BloquearSinGif("#Ventas");
            }
        });

        $('#modal-ctascontabalmacen').on('shown.bs.modal', function () {
            $('#cboCtaDebeAlmacen').focus();
        });

        $("#btnGrabarConfigContabAlmacen").on("click", function () {
            if (!vErrors(["txtcodigo", "cboexistencia", "cboCtaDebeAlmacen", "cboCtaHaberAlmacen"])) {
                return;
            }

            fnGrabarConfigContabAlmacen();
        });
    };    

    var fnCargarComboCuentasContabAlmacen = function () {
        if (!vErrors(["slcEmpresa"])) {
            return;
        }

        $("#cboCtaDebeAlmacen").html("<option></option>");
        $("#cboCtaHaberAlmacen").html("<option></option>");

        $.ajax({
            type: "post",
            url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=LCC&empresa=" + $('#slcEmpresa').val() + "&P_CUEN_CODE=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos)) {
                    return;
                }
                for (var i = 0; i < datos.length; i++) {
                    $("#cboCtaDebeAlmacen").append(`<option value="${datos[i].CUENTA}" data-ctaid="${datos[i].ID_CUENTA}">${datos[i].CUENTA} - ${datos[i].DESCRIPCION}</option>`);
                    $("#cboCtaHaberAlmacen").append(`<option value="${datos[i].CUENTA}" data-ctaid="${datos[i].ID_CUENTA}">${datos[i].CUENTA} - ${datos[i].DESCRIPCION}</option>`);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fnGrabarConfigContabAlmacen = function () {

        let sOpcion = "GRABAR_CTAS_TIPOMOVALMC";
        let p_CODE_TIPO_EXIST = $("#cboexistencia").val();
        let p_CODE_MOV_ALMC = $(oTrActual_ConfigContabAlmac).data("codmovalmc");
        let p_PROD_CODE = $("#txtcodigo").val();
        let p_CTAS_ID_DEBE = $('#cboCtaDebeAlmacen').find(':selected').data('ctaid');
        let p_CUENTA_DEBE = $('#cboCtaDebeAlmacen').val();
        let p_CTAS_ID_HABER = $('#cboCtaHaberAlmacen').find(':selected').data('ctaid');
        let p_CUENTA_HABER = $('#cboCtaHaberAlmacen').val();
        let p_USER = $("#ctl00_txtus").val();

        let data = new FormData();
        data.append("sOpcion", sOpcion);
        data.append("p_CODE_TIPO_EXIST", p_CODE_TIPO_EXIST);
        data.append("p_CODE_MOV_ALMC", p_CODE_MOV_ALMC);
        data.append("p_PROD_CODE", p_PROD_CODE);
        data.append("p_CTAS_ID_DEBE", p_CTAS_ID_DEBE);
        data.append("p_CUENTA_DEBE", p_CUENTA_DEBE);
        data.append("p_CTAS_ID_HABER", p_CTAS_ID_HABER);
        data.append("p_CUENTA_HABER", p_CUENTA_HABER);
        data.append("p_USER", p_USER);

        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMMOCO.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response == "") {
                    noexito();
                    return;
                }
                if (response.indexOf("[Advertencia]:") > -1) {
                    alertCustom(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    sException = response;
                    alertCustom("Error al intentar Guardar.");
                    return;
                }

                let sCtaDebe = $("#cboCtaDebeAlmacen option:selected").text();
                $(oTrActual_ConfigContabAlmac).find('.ctadebe').val(sCtaDebe);

                let sCtaHaber = $("#cboCtaHaberAlmacen option:selected").text();
                $(oTrActual_ConfigContabAlmac).find('.ctahaber').val(sCtaHaber);

                $("#modal-ctascontabalmacen").modal("hide");

                exito();
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo guardar los cambios.");
            }
        });
    };

    var fnEliminarConfigContabAlmacen = function () {

        let sOpcion = "ELIMINAR_CTAS_TIPOMOVALMC";
        let p_CODE_TIPO_EXIST = $("#cboexistencia").val();
        let p_CODE_MOV_ALMC = $(oTrActual_ConfigContabAlmac).data("codmovalmc");
        let p_PROD_CODE = $("#txtcodigo").val();

        let data = new FormData();
        data.append("sOpcion", sOpcion);
        data.append("p_CODE_TIPO_EXIST", p_CODE_TIPO_EXIST);
        data.append("p_CODE_MOV_ALMC", p_CODE_MOV_ALMC);
        data.append("p_PROD_CODE", p_PROD_CODE);

        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMMOCO.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response == "") {
                    noexito();
                    return;
                }
                if (response.indexOf("[Advertencia]:") > -1) {
                    alertCustom(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    sException = response;
                    alertCustom("Error al intentar Guardar.");
                    return;
                }

                $(oTrActual_ConfigContabAlmac).find('.ctadebe').val("");
                $(oTrActual_ConfigContabAlmac).find('.ctahaber').val("");

                $("#modal-ctascontabalmacen").modal("hide");

                exito();
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo guardar los cambios.");
            }
        });
    };

    var oTrActual_ConfigContabAlmac = {};
    var fnCargarTablaConfigContab = function () {

        let sCodTipoExistencia = $("#cboexistencia").val();
        let sTipoExistencia = $("#cboexistencia option:selected").text();

        $("#tipoexist").html(sTipoExistencia);

        let aoTipoMovAlmacen = fnGetTipoMovAlmacen();
        let sHtml = "";
        for (let i = 0; i < aoTipoMovAlmacen.length; i++) {
            sHtml += `
                    <tr class="ordenar" data-codmovalmc=${aoTipoMovAlmacen[i].CODIGO}>
                        <td>${aoTipoMovAlmacen[i].DESCRIPCION}</td>
                        <td style="text-align:center;">${aoTipoMovAlmacen[i].TIPO_MOV}</td>
                        <td style="text-align:center;">
                            <button type="button" class="btn green configctasalmacen"><i class="icon-cog" style="line-height: initial"></i></button>
                        </td>
                        <td>
                            <input type="text" class="span12 ctadebe" placeholder="Seleccionar Cuenta" readonly>
                        </td>
                        <td>
                            <input type="text" class="span12 ctahaber" placeholder="Seleccionar Cuenta" readonly>
                        </td>
                        <td style="text-align:center;">
                            <button type="button" class="btn red eliminarctasalmacen"><i class="icon-trash" style="line-height: initial"></i></button>
                        </td>
                    </tr>
                    `;
        }

        $("#tblConfigContabAlmacen tbody").html(sHtml);

        $(".configctasalmacen").on('click', function () {
            oTrActual_ConfigContabAlmac = $(this).closest("tr");
            $("#cboCtaDebeAlmacen").val("").change();
            $("#cboCtaHaberAlmacen").val("").change();
            $("#modal-ctascontabalmacen").modal("show");
        });

        $(".eliminarctasalmacen").on('click', function () {
            oTrActual_ConfigContabAlmac = $(this).closest("tr");
            fnEliminarConfigContabAlmacen();
        });

    };

    var fnListarCtasConfigAlmacen = function (bPorDefecto) {
        if (!vErrors(["txtcodigo", "cboexistencia"])) {
            return;
        }

        let aoConfigCtas = [];
        let p_CODE_TIPO_EXIST = $("#cboexistencia").val();
        let p_PROD_CODE = $("#txtcodigo").val();
        if (bPorDefecto) {
            p_PROD_CODE = "";
        }
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ashx?sOpcion=LISTAR_CTAS_TIPOMOVALMC&p_CODE_TIPO_EXIST=" + p_CODE_TIPO_EXIST + "&p_PROD_CODE=" + p_PROD_CODE,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                console.log("debug de datos")
                console.log(datos)
                aoConfigCtas = datos;
            },
            error: function (msg) {
                alert(msg);
            }
        });

        return aoConfigCtas;
    };

    var fnGetTipoMovAlmacen = function () {
        var aoTipoMovAlmacen = [];
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ashx?sOpcion=LIST_TIPO_MOV_ALMC&p_ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                aoTipoMovAlmacen = datos;
            },
            error: function (msg) {
                alert(msg);
            }
        });

        return aoTipoMovAlmacen;
    };

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
    };

    var fnAddNombreAlterno = function (pNombreAlt) {
        let codProducto = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val();

        if (pNombreAlt.trim() == '') {
            alertCustom('Ingrese un nombre alternativo.');
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
                infoCustom('Error al grabar nombre alternativo.');
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

    let oTableNombreAlt = [];

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

    //Referencia: var validacion = function ()
    var Grabar = function () {
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
    };

    //Actualizar Producto
    var Actualizar = function () {
        var Errors = true;
        var Errors2 = false;
        var Errors3 = false;

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

        if ($("#rbIsc").is(":checked")) {
            Errors3 = false
            if (vErrors(["cboTipoSistema", "txtIsc"])) {
                Errors3 = true
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
                PROD_CODE, URLPROD, DETRAC_CODE, DETRAC_PORCENTAJE, PRECIO_IND, TIPO_BIEN, ISC, ENBRUTO_IND, ESP_ADICIONAL, PRES_CODE, PESO, ISC_CODE;

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
            if (typeof $("input[name=rbPrecio]:checked").val() != "undefined") {
                PRECIO_IND = $("input[name=rbPrecio]:checked").val()
            }
            else {
                PRECIO_IND = "E"
            }
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
                ISC_CODE = $("#cboTipoSistema").val();
            }
            if (TIPO_BIEN == "GIS") {
                ISC = $("#txtIsc").val();
                ISC_CODE = $("#cboTipoSistema").val();
            }
            else {
                ISC = "0";
                ISC_CODE = "";
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
            data.append('PESO', PESO);
            data.append('p_COMPRABLE_IND', p_COMPRABLE_IND);
            data.append('p_ISC_CODE', ISC_CODE);

            PPBIMAG = $("#imgDNI").attr("src");
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
                            subgrupoprod = GRUPO_CODE;
                            cargaDatosContabilidad($("#txtcodigo").val(), subgrupoprod);

                            fnCargarTablaConfigContab();

                            let bConfigPorDefecto = false;
                            let aoConfigCtas = fnListarCtasConfigAlmacen(bConfigPorDefecto);
                            if (aoConfigCtas.length === 0) {
                                bConfigPorDefecto = true;
                                aoConfigCtas = fnListarCtasConfigAlmacen(bConfigPorDefecto);
                            }
                            console.log("ultimo aoConfigCtas")
                            console.log(aoConfigCtas);
                            let oTr = {};
                            for (let i = 0; i < aoConfigCtas.length; i++) {
                                oTr = $("#tblConfigContabAlmacen").find(`[data-codmovalmc=${aoConfigCtas[i].TMOV_CODE}]`);
                                $(oTr).find('.ctadebe').val(`${aoConfigCtas[i].CUENTA_DEBE} - ${aoConfigCtas[i].CTAS_DEBE}`);
                                $(oTr).find('.ctahaber').val(`${aoConfigCtas[i].CUENTA_HABER} - ${aoConfigCtas[i].CTAS_HABER}`);
                            }


                            indica_actualizado = 1;

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
    };

    //Cargar Acreditacion
    var fnCargarAcreditacion = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/NM/ajax/NMMACCA.ashx?OPCION=0',
            contenttype: "application/json",
            datatype: "json",
            async: false,
            data: {}
        }).success(function (data) {
            data = (data === null) ? [] : data;
            var select = $('#cbo_acreditacion');
            $('#cbo_acreditacion').empty();
            $('#cbo_acreditacion').append('<option></option>');
            for (var i = 0; i < data.length; i++) {
                select.append('<option value="' + data[i].FTVACRE_CODIGO + '" data-tipoacre="' + data[i].FTVACRE_TIPO_ACREDITA + '|' + data[i].FTVACRE_ESTADO + '">' + data[i].FTVACRE_DESCRIPCION + '</option>');
            }
            $('#cbo_acreditacion').select2("val", "").change();
        }).error(function (msg) {
            alertCustom(msg.statusText);
        });
    };


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
            fillCboTipoSistema();
            IniciaTabla();
            //Dependientes de empresa
            fillCboEmpresa();
            eventoControles();
            //handleTablaCategoria();
            $('#tabContable').hide();
            $("#tabMantPre").hide();
            $("#tabCatCli").hide();
            cargaInicial();
            validacion();
            iniciaTablaNombreAlt();
            fnCargarAcreditacion();
            fillCboListaClientes();
            $(".derecha").css("text-align", "right");
            $(".centro").css("text-align", "center");
            $("#uniform-chkactivoAcre").removeAttr("class", "checker focus")
            $("#uniform-chkactivoAcre").attr("class", "checker")
            $("#uniform-chkactivoAcre span").attr("class", "checked")
        }
    };
}();

// Acreditacion

function fnObtenerAcreditacionPrd() {
    var sCodigoPRd = $("#txtcodigo").val();
    var sEstado = "I"
    if ($("#chkactivoAcre").is(":checked")) {
        sEstado = "A"
    }
    var productoJSON = [];
    tAcreditacion = [];
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/NMMACCA.ashx?OPCION=5" +
        "&p_FTVAPRD_CODIGO=" + sCodigoPRd + "&p_FTVACRE_PRD_ESTADO=" + sEstado,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null && datos.length != 0) {


                for (i = 0; i < datos.length; i++) {

                    var oAcreditacion = new Object;
                    oAcreditacion.CODIGO = datos[i].FTVACRE_PRD_CODIGO;
                    oAcreditacion.CODIGO_ACREDITACION = datos[i].FTVACRE_CODIGO;
                    oAcreditacion.CODIGO_PRODUCTO = datos[i].FTVPRD_CODIGO;
                    oAcreditacion.DESCRIPCION = datos[i].FTVACRE_DESCRIPCION;
                    oAcreditacion.TIPO_ACREDITACION = datos[i].FTVACRE_TIPO_ACREDITA;
                    oAcreditacion.TIPO_ACREDITACION_DESC = datos[i].FTVACRE_TIPO_ACREDITA_DESC;
                    oAcreditacion.NRO_UNICO = datos[i].FTVACRE_PRD_NRO_UNICO;
                    oAcreditacion.FECHA_INICIO = datos[i].FTVACRE_PRD_FECHA_INICIO;
                    oAcreditacion.FECHA_FIN = datos[i].FTVACRE_PRD_FECHA_FIN;
                    oAcreditacion.ESTADO = datos[i].FTVACRE_PRD_ESTADO;

                    var objAux2 = JSON.stringify(oAcreditacion);
                    var objAux = jQuery.parseJSON(JSON.stringify(oAcreditacion));
                    tAcreditacion.push(oAcreditacion);
                }
                ListarTablaDetalles(ObtenerTablaDetalles());
                //var prod = "";
                //prod = '{';
                //prod += '"ITEM":"",';
                //prod += '"CODIGO":"' + datos[0].FTVACRE_PRD_CODIGO + '",';
                //prod += '"CODIGO_ACREDITACION":"' + datos[0].FTVACRE_CODIGO + '",';
                //prod += '"CODIGO_PRODUCTO":"' + datos[0].FTVPRD_CODIGO + '",';
                //prod += '"DESCRIPCION":"' + datos[0].FTVACRE_DESCRIPCION + '",';
                //prod += '"TIPO_ACREDITACION":"' + datos[0].FTVACRE_TIPO_ACREDITA + '",';
                //prod += '"NRO_UNICO":"' + datos[0].FTVACRE_PRD_NRO_UNICO + '",';
                //prod += '"FECHA_INICIO":"' + datos[0].FTVACRE_PRD_FECHA_INICIO + '",';
                //prod += '"FECHA_FIN":"' + datos[0].FTVACRE_PRD_FECHA_FIN + '",';
                //prod += '"ESTADO":"' + datos[0].FTVACRE_PRD_ESTADO + '"';
                //prod += '}';
                //productoJSON = JSON.parse(prod);
            }
        },
        error: function (msg) {
            alertCustom("No se obtuvo correctamente datos de producto.");
        }
    });
    return productoJSON;
}
function fnAgregarAcreditacion() {

    var sCodAcreditacion = $("#cbo_acreditacion").val();
    var sAcreditacion = $("#cbo_acreditacion option:selected").text();
    if (sAcreditacion == '') {
        infoCustom('por favor seleccionar la acreditación');
        return;
    }
    //var select = $("#cbo_acreditacion").find('option:selected').val();
    //var sTipo = select.data("tipoacre").val();
    var sMensaje = $("#cbo_acreditacion option:selected").data('tipoacre');
    //var sEstado = $("#cbo_acreditacion option:selected").data('estAcre');
    var sTipo = sMensaje.split("|")[0]
    var sEstado = sMensaje.split("|")[1]

    var sNro_unico = $("#txt_unico").val();
    var dFechaInicio = $("#txt_fechaInicio").val();
    var dFechaFin = $("#txt_fechaFin").val();
    var sCdoigoPRD = $("#txtcodigo").val();

    if (sNro_unico == '') {
        infoCustom('por favor ingresar el Nro. Unico');
        return;
    }
    if (dFechaInicio == '') {
        infoCustom('por favor ingresar la fecha de inicio');
        return;
    }
    if (dFechaFin == '') {
        infoCustom('por favor ingresar la fecha de fin');
        return;
    }
    //var AnioFechaFin = dFechaFin.getFullYear();
    //var MesFechaFin = dFechaFin.getMonth();
    //var DiaFechaFin = dFechaFin.getDate();
    var AnioFechaFin = dFechaFin.split("/")[2];
    var MesFechaFin = dFechaFin.split("/")[1];
    var DiaFechaFin = dFechaFin.split("/")[0];


    var AnioFechaInicio = dFechaInicio.split("/")[2];
    var MesFechaInicio = dFechaInicio.split("/")[1];
    var DiaFechaInicio = dFechaInicio.split("/")[0];

    if (parseInt(AnioFechaFin) < parseInt(AnioFechaInicio)) {
        infoCustom('La fecha de fin no puede ser mejor que la fecha de inicio');
        return;
    }
    else {
        if (parseInt(AnioFechaFin) == parseInt(AnioFechaInicio) && parseInt(MesFechaFin) < parseInt(MesFechaInicio)) {
            infoCustom('La fecha de fin no puede ser mejor que la fecha de inicio');
            return;
        }
        else {
            if (parseInt(AnioFechaFin) == parseInt(AnioFechaInicio) && parseInt(MesFechaFin) == parseInt(MesFechaInicio) && parseInt(DiaFechaFin) < parseInt(DiaFechaInicio)) {
                infoCustom('La fecha de fin no puede ser mejor que la fecha de inicio');
                return;
            }
        }
    }

    var oAcreditacion = new Object;
    oAcreditacion.CODIGO = 0;
    oAcreditacion.CODIGO_ACREDITACION = sCodAcreditacion;
    oAcreditacion.CODIGO_PRODUCTO = sCdoigoPRD;
    oAcreditacion.DESCRIPCION = sAcreditacion;
    oAcreditacion.TIPO_ACREDITACION = sTipo;
    oAcreditacion.TIPO_ACREDITACION_DESC = sTipo;
    oAcreditacion.NRO_UNICO = sNro_unico;
    oAcreditacion.FECHA_INICIO = dFechaInicio;
    oAcreditacion.FECHA_FIN = dFechaFin;
    oAcreditacion.ESTADO = sEstado;

    var objAux2 = JSON.stringify(oAcreditacion);
    var objAux = jQuery.parseJSON(JSON.stringify(oAcreditacion));
    var ExisteAcre = 0;
    var ExisteNroUnico = 0;
    var ErrorFecha = 1
    for (var i = 0; i < tAcreditacion.length; i++) {


        if (tAcreditacion[i].CODIGO_ACREDITACION == sCodAcreditacion && tAcreditacion[i].ESTADO == "A") {
            ExisteAcre = ExisteAcre + 1;
        }
        if (tAcreditacion[i].NRO_UNICO == sNro_unico) {
            ExisteNroUnico = ExisteNroUnico + 1;
        }



    }
    var iContador = 0;
    for (var i = 0; i < tAcreditacion.length; i++) {
        if (tAcreditacion[i].CODIGO_ACREDITACION == sCodAcreditacion) {
            if (fnFechaPrimeraMayorSegunda(oAcreditacion.FECHA_INICIO, tAcreditacion[i].FECHA_FIN) == 1) {
                ErrorFecha = 0;
            } else {
                if (fnFechaPrimeraMayorSegunda(oAcreditacion.FECHA_INICIO, tAcreditacion[i].FECHA_INICIO) == 1) {

                } else {
                    if (fnFechaPrimeraMayorSegunda(tAcreditacion[i].FECHA_INICIO, oAcreditacion.FECHA_INICIO) == 1 &&
                        fnFechaPrimeraMayorSegunda(tAcreditacion[i].FECHA_INICIO, oAcreditacion.FECHA_FIN) == 1) {
                        ErrorFecha = 0;
                    }
                }
            }
            iContador = iContador + 1;
        }         
    }

    if (iContador == 0 && ErrorFecha == 1) {
        ErrorFecha = 0;
    }

    if (ExisteAcre > 0) {
        noexitoCustom("Ya se registro la Acreditación");
    } else {
        if (ErrorFecha > 0) {
            noexitoCustom("No se puede agregar las misma fechas");
        } else {
            tAcreditacion.push(oAcreditacion);
            ListarTablaDetalles(ObtenerTablaDetalles());
            fnLimpiar();
        }
    }

}

function fnFechaPrimeraMayorSegunda(dFechaInicio, dFechaFin) {
    var valor = 0;
    var AnioFechaFin = dFechaFin.split("/")[2];
    var MesFechaFin = dFechaFin.split("/")[1];
    var DiaFechaFin = dFechaFin.split("/")[0];


    var AnioFechaInicio = dFechaInicio.split("/")[2];
    var MesFechaInicio = dFechaInicio.split("/")[1];
    var DiaFechaInicio = dFechaInicio.split("/")[0];

    if (parseInt(AnioFechaFin) < parseInt(AnioFechaInicio)) {
        valor = 1;
    }
    else {
        if (parseInt(AnioFechaFin) == parseInt(AnioFechaInicio) && parseInt(MesFechaFin) < parseInt(MesFechaInicio)) {
            valor = 1;

        }
        else {
            if (parseInt(AnioFechaFin) == parseInt(AnioFechaInicio) && parseInt(MesFechaFin) == parseInt(MesFechaInicio) && parseInt(DiaFechaFin) < parseInt(DiaFechaInicio)) {
                valor = 1;

            }
        }
    }
    return valor;
}




function ObtenerTablaDetalles() {
    var res = "";
    res = '<table id="tblAcreditacion" class="display DTTT_selectable" border="0" style="width:100%">'
    res += '<thead>'
    res += '<tr align="center">'
    res += '<th>ID</th>'
    res += '<th>ACREDITACION</th>'
    res += '<th>TIPO</th>'
    res += '<th>NRO. UNICO</th>'
    res += '<th>F. INICIO</th>'
    res += '<th>F. FIN</th>'
    res += '<th>ESTADO</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";
    var sEstado = "INACTIVO"
    for (var i = 0; i < tAcreditacion.length; i++) {

        // var combo = fillNombreAlterno(detallesVenta[i].CODIGO, detallesVenta[i].NOMBRE_IMPRESION, i, "N");
        res += '<tr id="' + tAcreditacion[i].CODIGO + '">'
        res += '<td align="center">' + tAcreditacion[i].CODIGO_ACREDITACION + '</td>'
        res += '<td align="center">' + tAcreditacion[i].DESCRIPCION + '</td>'
        res += '<td align="center">' + tAcreditacion[i].TIPO_ACREDITACION_DESC + '</td>'
        res += '<td align="center">' + tAcreditacion[i].NRO_UNICO + '</td>'
        res += '<td align="center">' + tAcreditacion[i].FECHA_INICIO + '</td>'
        res += '<td align="center">' + tAcreditacion[i].FECHA_FIN + '</td>'
        //res += '<td align="center">' + tAcreditacion[i].ESTADO + '</td>'
        if (tAcreditacion[i].ESTADO == "A") {
            sEstado = "ACTIVO"
        } else {
            sEstado = "INACTIVO"
        }
        res += '<td align="center"> <a href="#" onclick="" class="btn" >' + sEstado + '</a></td>'
        res += '</tr>'

    }

    res += '</tbody>'
    res += '</table>'
    return res;
}
function fnActualizaEstado() {
    SP_ACTUALIZA_ESTADO_ACRE_PRD
}
function fnGuardar(pCodigoACRE, pCodigoPRD, pNroUnico, pFechaInicio, pFechaFin, pEstado) {
    var sTipoAcreditacion = $("#txtTipoAcredita").val();
    var sDescripcion = $("#txtDescripcion").val();
    var sDetalle = $("#txtDetalle").val();
    var sProcedencia = $("#txtProcedencia").val();
    var sCodigo = $("#txtCodigo").val()

    var data = new FormData();
    data.append('OPCION', "6");
    data.append('p_FTVACRE_CODIGO', pCodigoACRE);
    data.append('p_FTVAPRD_CODIGO', pCodigoPRD);
    data.append('P_FTVACRE_PRD_NRO_UNICO', pNroUnico);
    data.append('P_FTVACRE_PRD_FECHA_INICIO', pFechaInicio);
    data.append('P_FTVACRE_PRD_FECHA_FIN', pFechaFin);
    data.append('p_FTVACRE_ESTADO', pEstado);

    $.ajax({
        url: "vistas/NM/ajax/NMMACCA.ASHX",
        type: "POST",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
    })

        .success(function (datos) {
            if (datos != null && datos != "") {
                switch (datos) {
                    case "OK":

                        break;
                }
            } else {
                noexitoCustom("Error al Registrar!")
            }

            Desbloquear("ventana2")

        })
        .error(function () {
            Desbloquear("ventana2");
            noexitoCustom("Error al Registrar!")
        })
}
function fnGuardarAcreditacion() {

    var pCodigoPRD = ""
    var pCodigoACRE = ""
    var pNroUnico = ""
    var pFechaInicio = ""
    var pFechaFin = ""
    var pEstado = 0

    try {
        for (var i = 0; i < tAcreditacion.length; i++) {

            pCodigoPRD = tAcreditacion[i].CODIGO_PRODUCTO
            pCodigoACRE = tAcreditacion[i].CODIGO_ACREDITACION
            pNroUnico = tAcreditacion[i].NRO_UNICO
            pFechaInicio = tAcreditacion[i].FECHA_INICIO
            pFechaFin = tAcreditacion[i].FECHA_FIN
            pEstado = tAcreditacion[i].ESTADO
            if (tAcreditacion[i].CODIGO == 0) {
                fnGuardar(pCodigoACRE, pCodigoPRD, pNroUnico, pFechaInicio, pFechaFin, pEstado);
            }

        }
        exito();
    } catch (ex) {
        noexito();
    }

}
function ListarTablaDetalles(datos) {

    $('#divDocumento').html(datos);

    $('#tblAcreditacion').dataTable({
        "info": false,
        "scrollX": true,
        "ordering": false,
        "aLengthMenu": 10,
        "iDisplayLength": 10,
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla.",
            "sZeroRecords": "No hay datos disponibles en la tabla."
        }
    });

    $("#tblAcreditacion tr").click(function () {
        item = $(this).attr('id');
    });
    //$('#tblAcreditacion_wrapper :first').remove()
}
function fnSoloActivo() {
    fnObtenerAcreditacionPrd();
}
function fnLimpiar() {
    $("#txt_unico").val('');
    $("#txt_fechaInicio").val('');
    $("#txt_fechaFin").val('');

    $('#cbo_acreditacion').select2('val', "");

}
// fin Acreditacion

function validarDescuento(valor) {
    console.log(valor);
    let porcMinimo = $("#txtUtilidadMinimo").val();
    if (porcMinimo == '') {
        bandera = false;
        infoCustom2('Ingrese Untilidad % Precio Minimo');
    } else {
        if (parseFloat(valor) >= parseFloat(porcMinimo)) {
            bandera = false;
            infoCustom('El descuento debe ser menor a la Untilidad % Precio Minimo');
        } else {
            bandera = true;

        }

    }

}

function fillCboEstablecimiento(ctlg) {
    $("#cboEstablecimiento").select2();
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + ctlg,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            $('#cboEstablecimiento').empty();
            $('#cboEstablecimiento').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
        },
        error: function (msg) {
            alertCustom("Establecimientos no listaron correctamente");
        }
    });

}

function fillCboRangoPrecioCantidad() {
    $('#cboRango').select2();
    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmrang.ashx?OPCION=1",
        async: true,
        success: function (datos) {
            // var parms;
            if (datos != null && typeof datos[0].CODIGO != "undefined") {

                if (datos.length > 0) {
                    $('#cboRango').empty();
                    $('#cboRango').append('<option></option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboRango').append('<option value="' + datos[i].CODIGO + '" data-rango="' + datos[i].RANGO_INICIO + '" >' + datos[i].NOMBRE + '</option>');
                        }
                    }
                    $('#cboRango').select2('val', '');

                }
            }
        },
        error: function (msg) {
            alertCustom("No se obtuvo correctamente los rangos para precios por cantidad");
        }
    });

}

var fillCboListaClientes = function () {
    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmrang.ashx?OPCION=4",
        async: false,
        success: function (datos) {
            $('#cboLista').empty();
            $('#cboLista').append('<option value=""></option>');
            if (datos != null && typeof datos[0].CODIGO != "undefined") {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboLista').append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                }
            }
            $('#cboLista').select2('val', '');
        },
        error: function (msg) {
            alertCustom("Lista de clientes no se cargó correctamente");
        }
    });
}

function CargarCostosProducto() {
    var cod = ObtenerQueryString("codigo");
    if (cod != null) {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmprod.ashx?OPCION=16&CTLG_CODE=" + $("#slcEmpresa").val() +
            "&PROD_CODE=" + cod +
            "&SCSL_CODE=" + $("#cboAlmacen").find(':selected').data('codestablec'),
            contenttype: "application/json;",
            datatype: "json",
            async: asincrono,
            success: function (datos) {
                if (datos != null) {
                    if (datos.length > 0) {
                        $("#txtUltimaCompra").val(datos[0].VALOR_ULTIMA_COMPRA);
                        $("#txtValorizado").val(datos[0].KARDEX_COSTO);
                        $("#txtNeto").val(datos[0].COSTO);

                        $("#txtCosto").val(formatoMiles(datos[0].COSTO));
                    } else {
                        $("#txtUltimaCompra").val(0);
                        $("#txtValorizado").val(0);
                        $("#txtNeto").val(0);

                        $("#txtCosto").val(0);
                    }

                }
            },
            error: function (msg) {
                alertCustom("Costos de producto no listaron correctamente");
            }
        });

    } else {
        $("#txtUltimaCompra").val("0.00");
        $("#txtValorizado").val("0.00");
        $("#txtNeto").val("0.00");
    }
}

function validaMaximoIsc() {
    if (parseFloat($("#txtIsc").val()) > 100) {
        $("#txtIsc").val("100.00")
    }
}

function ValidaPorcentaje() {
    

    /*if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
    }*/
}

var oTableExistencias;
var NMLPROD = function () {
    var oTableLista;

    var plugins = function () {
        $("#slcEmpresa").select2();
        $(".combobox").select2();
        $("#cboLista").select2();
    };

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }
    var eventoControles = function () {

        $('#slcEmpresa').change(function () {
            fnCargarBandeja();
        });

        $("#chkEstado").on("change", function () {
            fnCargarBandeja();
        });

    };

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
            ],
            "sDom": 'TC<"clear">lfrtip',
            "sPaginationType": "full_numbers",
            "oTableTools": {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    {
                        "sExtends": "copy",
                        "sButtonText": "Copiar"
                    },
                    {
                        "sExtends": "pdf",
                        "sPdfOrientation": "landscape",
                        "sButtonText": "Exportar a PDF"
                    },
                    {
                        "sExtends": "xls",
                        "sButtonText": "Exportar a Excel "
                    }
                ]
            }
            ,
        }

        oTableLista = iniciaTabla("tblLista", parms);
        actualizarEstilos();
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
                window.open("?f=nmmprod&sCodEmpresa=" + sCodEmpresa + "&codigo=" + sCodigo, '_blank');
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
            fillCboListaClientes();
            $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
    };
}();

function Verifica_Mov_Kadex() {

    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmprod.ashx?OPCION=19&CTLG_CODE=" + $.trim($('#slcEmpresa').val()) + "&PROD_CODE=" + $.trim($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val()),
        async: false,
        success: function (datos) {

            if (datos != null) {
                if (parseInt(datos[0].MOVIMIENTOS) > 0) {

                    $("#cbounidad").attr("disabled", true);
                }
            }

        },
        error: function (msg) {

            alertCustom("Error al verificar mov kardex correctamente");
        }
    });
};

function ActualizarIndicadorPrecio() {
    let indicador = "";

    if ($("#rbPrecioCantidad").is(':checked')) {
        indicador = "C";
    } else if ($("#rbPrecioEstandar").is(':checked')) {
        indicador = "E";
    } else if ($("#rbPrecioCliente").is(':checked')) {
        indicador = "L";
    }

    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/NVMPREC.ashx?OPCION=4&CTLG=" + $.trim($('#slcEmpresa').val()) + "&PROD_CODE=" + $.trim($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hf_prod_code').val() + "&PRECIO_IND=" + indicador),
        async: false,
        success: function (datos) {
            if (datos == 'OK')
                exito();
            else
                alertCustom("Se registro un error al cambiar indicador.");

        },
        error: function (msg) {

            alertCustom("Se registro un error al cambiar indicador.");
        }
    });
};


var impresion = function () {
   
    var onloadEvent = function () {
        var cod = ObtenerQueryString("codigo");
        crearImpresion(cod);
    };
   
    return {
        init: function () {
            onloadEvent();           
        }
    }
}();

function crearImpresion(vta_code) {
    Bloquear("contenedorPrincipal");

    /* estilos */
    var data = new FormData();
    var codigo_formato = "";
    var txtCssFormato = "";
    var jsonRes = new Array();
    var dcto_code = "";
    var ctlg_code = "";
    var formato = new Array();
    var espacio_items;
    var ppp = obtenerPPP(); // pulgada por pixel
    var ajustePpp = 1; //1.67;
    var ppm = 3.78; // milimetro por pixel

    var factorY = 144 / 120; // 120x144
    var factorX = 240 / 144; //120/144;
    var offsetY = 0.55;

    data.append('p_CODE', vta_code);

    $.ajax({
        type: "POST",
        url: "../../vistas/NC/ajax/NCMFDOC.ashx?OPCION=TEST_IMPR",
        contentType: false,
        data: data,
        dataType: "json",
        processData: false,
        cache: false,
        async: true,
        success: function (datosVta) {

            jsonRes = datosVta;

            ctlg_code = datosVta[0].cabecera[0].EMPRESA_CODE;
            dcto_code = datosVta[0].cabecera[0].DCTO_CODE;

        },
        complete: function () {


            data.append('FORM_CODE', "");
            data.append('CTLG_CODE', ctlg_code);
            data.append('SCSL_CODE', "");
            data.append('DCTO_CODE', dcto_code);
            $.ajax({
                type: "POST",
                url: "../../vistas/NC/ajax/NCMFDOC.ashx?OPCION=LF",
                contentType: false,
                data: data,
                dataType: "json",
                processData: false,
                cache: false,
                async: true,
                success: function (datos) {

                    if (datos.length > 0) {
                        codigo_formato = datos[0].CODIGO;
                        var ancho = datos[0].UNME == 'in' ? parseFloat(datos[0].ANCHO) * ppp : parseFloat(datos[0].ANCHO);
                        var alto = datos[0].UNME == 'in' ? parseFloat(datos[0].ALTO) * ppp : parseFloat(datos[0].ANCHO);
                        winPrint = window.open('', '', 'left=0,top=0,width=' + ancho + ',height=' + alto + ',toolbar=0,scrollbars=0,status=0,location=0');

                        winPrint.document.write('<link rel="stylesheet" href="../../recursos/css/Impresion.css" />');
                        //datos[0].ESPACIO_ITEMS
                        //datos[0].NRO_ITEMS
                        var anchoString = (parseFloat(datos[0].ANCHO)).toString() + datos[0].UNME.toString();
                        var altoString = (parseFloat(datos[0].ALTO)).toString() + datos[0].UNME.toString();
                        anchoDoc = parseFloat(datos[0].ANCHO) * ppp;
                        altoDoc = parseFloat(datos[0].ALTO) * ppp;

                        txtCssFormato += "@page{size:" + anchoString + " " + altoString + ";margin: 0;}";
                        txtCssFormato += "@media print {html, body { width:" + anchoString + ";height: " + altoString + ";margin: 0;}}";
                        espacio_items = datos[0].ESPACIO_ITEMS;
                    } else {
                        alertCustom("No se ha definido un formato para este tipo de documento!");
                    }

                },
                complete: function () {
                    Desbloquear("contenedorPrincipal");
                    data = new FormData();
                    data.append('FORM_CODE', codigo_formato);
                    data.append('DET_CODE', '');
                    $.ajax({
                        type: "POST",
                        url: "../../vistas/NC/ajax/NCMFDOC.ashx?OPCION=LD",
                        contentType: false,
                        data: data,
                        dataType: "json",
                        processData: false,
                        cache: false,
                        async: true,
                        success: function (datos2) {

                            formato = datos2;

                            for (var i = 0; i < datos2.length; i++) {
                                txtCssFormato += "." + (datos2[i].CONV_LET_IND == "S" ? ("L_" + datos2[i].NOMBRE_CAMPO) : datos2[i].NOMBRE_CAMPO) + "{"
                                txtCssFormato += "top:" + ((parseFloat(datos2[i].VALOR_Y) - (ppp * offsetY)) * factorY).toString() + ";";
                                // txtCssFormato += "top:" + (parseFloat(datos2[i].VALOR_Y)*100/altoDoc).toString() + "%;";
                                // txtCssFormato += "left:" + (parseFloat(datos2[i].VALOR_X)).toString() + ";";
                                txtCssFormato += "left:" + (parseFloat(datos2[i].VALOR_X) * 100 / anchoDoc).toString() + "%;";
                                txtCssFormato += "font-size:" + datos2[i].TAMANIO_LETRA + ";";
                                txtCssFormato += "font-family:" + datos2[i].TIPO_LETRA + ";";
                                txtCssFormato += "text-align:" + datos2[i].ALIGN_LETRA + ";";
                                if (datos2[i].ALIGN_LETRA == "right") {
                                    txtCssFormato += "width:" + obtenerAnchoTexto(datos2[i].LONG_MAXIMA, datos2[i].TAMANIO_LETRA + " px " + datos2[i].TIPO_LETRA);
                                }

                                txtCssFormato += "}"
                            }

                        },
                        complete: function () {

                            winPrint.document.write('<style>' + txtCssFormato + ' </style>');

                            winPrint.document.write('<title>Reporte</title>');

                            var dxVta = "";

                            for (var i = 0; i < formato.length; i++) {

                                if (formato[i].NOMBRE_CAMPO.substring(0, 2) == "I_") {

                                    for (var j = 0; j < jsonRes[0].detalle.length; j++) {

                                        var pos_parc = (j * ((parseFloat(espacio_items) * ppm) + parseFloat(formato[i].TAMANIO_LETRA))).toString();

                                        dxVta += "<span class='" + formato[i].NOMBRE_CAMPO + "' style='margin-top:" + pos_parc + "px'>" + eval("jsonRes[0].detalle[" + j.toString() + "]." + formato[i].NOMBRE_CAMPO) + "</span>";

                                    }


                                } else {

                                    if (formato[i].CONV_LET_IND == "S") {
                                        dxVta += "<span class='" + "L_" + formato[i].NOMBRE_CAMPO + "'>" + Aletras(parseFloat(eval("jsonRes[0].cabecera[0]." + formato[i].NOMBRE_CAMPO))) + "</span>";
                                    } else {
                                        if (formato[i].TIPO == 'EC' || formato[i].TIPO == 'EF') { //estaticos
                                            dxVta += "<span class='" + formato[i].NOMBRE_CAMPO + "'>" + formato[i].VALOR + "</span>";
                                        } else {
                                            dxVta += "<span class='" + formato[i].NOMBRE_CAMPO + "'>" + eval("jsonRes[0].cabecera[0]." + formato[i].NOMBRE_CAMPO) + "</span>";
                                        }
                                    }
                                }


                            }

                            winPrint.document.write(dxVta);
                            winPrint.document.close();
                            winPrint.focus();

                            // impresion
                            var document_focus = false;
                            setTimeout(function () { winPrint.print(); document_focus = true; }, 100);
                            var int = setInterval(function () {
                                if (document_focus === true) {
                                    winPrint.close();
                                    clearInterval(int);
                                }
                            }, 300);

                        }
                    });
                }

            });
        }
    });




}






function Aletras(numero) {
    var jqXHR = $.ajax({
        type: "POST",
        url: "../../vistas/NB/ajax/NBMCHEQ.ASHX?flag=Letras&numero=" + numero,
        contentType: false,
        processData: false,
        async: false
        //success: function (res) {
        //    retornaValor(res.toUpperCase());
        //}   
    });
    return jqXHR.responseText;
}

function obtenerAnchoTexto(nLTexto, formato_texto) {
    var texto = "";
    for (var i = 0; i < nLTexto; i++) {
        texto += "M";
    }
    var jk = formato_texto;//propiedades css del elemento;
    var c = document.createElement("CANVAS");
    var ctx = c.getContext("2d");
    ctx.font = c;
    c.remove();
    return ctx.measureText(texto).width;//ancho del texto
}


function obtenerPPP() {

    $("body").append("<div style='width:1in;' id='_divMuestreo'></div>");
    var val0r = document.getElementById('_divMuestreo').offsetWidth;
    $("_divMuestreo").remove();
    return val0r;
}




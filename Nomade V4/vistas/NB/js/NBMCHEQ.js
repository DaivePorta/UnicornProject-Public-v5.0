concepto_actu = false;
chq_sin_fondos = "N";

function Confirmacion() {

    var imagen_Interrogacion = "data:image/png;base64,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";

    $("#mensajemodal").html(
        "<div class='row-fluid'>" +
         "<div class='span2'>" +
         "<img src='" + imagen_Interrogacion + "'+></img>" +
         "</div>" +
        "<div class='span10'>" +
         "<div class='row-fluid'>" +
          "<div class='span12'>" +
        "Esta a punto de generar un cheque sin fondos suficientes. Desea continuar?" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" 
         );
   
        $("#modalconfir").modal('show');    

}

$("#rptasi").click(function () {
   
    $("#modalconfir").modal('hide');
    chq_sin_fondos = "S";

});


$("#rptano").click(function () {
$("#txt_monto").val("");

    alertCustom("El monto excede al saldo en la cuenta!");
    $("#modalconfir").modal('hide');

});


var NBMCHEQ = function () {

    function imprimir() {

        $("#btnimprimir").click(function () {

            var titulo = "CHEQUE NRO. ";

            titulo += $("#txt_nro_cheque").val();

            Aletras($("#txt_monto").val());
            ObtenerSimbolo($("#slcMoneda").val());

            var conf = 'border-color: #FFFFFF; border-style: solid; border-width: 1px;border-bottom-color: black;margin-bottom: 10px;';
            var confs = 'display: block;border-color: white;border-style: solid;border-width: 1px;border-top-color: black;margin-top: 60px;';


            $("#txt_girado")
                .html("Páguese a la orden de: ")
                .parents(".span6").removeClass("span6").addClass("span12");
            $("#txt_giradoa").parents(".span10").attr("style", conf);

            $("#txt_firmant")
                .html("")
                .parent().removeClass("span2").addClass("span8");

            $(".ff1.activo").parents(".span10").attr("style", confs).attr("align", "center").removeClass("span10").addClass("span4");
            $(".ff1.inactivo").addClass("noimpr")
            var texto = '<div class="row-fluid">' +
                '<div class="span2"></div>' +
                '<div class="span9" style="' + conf + '">' +
                '<label>' + conversion_a_letras + ' </label>' +
                '</div>' +
                '<div class="span1">' +
                '<input id="_moneda_corto" type="text" value="' + $("#slcMoneda :selected").html() + '" />' +
                '</div>' +
                '</div>';


            $("#cont_nuevo")
                .addClass("row-fluid")
                .append(texto);
            var monto = $("#txt_monto").val();
            var fechaval = $("#txt_fecha_emision").val();
            var htmlfechas = '<div class="span1"></div>' +
                '<div class="span2" style="' + conf + ';width: 8%;" align="center"><input id="fechas_texto"  type="text" value="' + fechaval + '" /></div>' +
                '<div class="span1" align="right"><input id="monto_texto_mone" type="text" value="' + simbolo_moneda + '" /></div>' +
                '<div class="span2" style="' + conf + '"><input id="monto_texto" type="text" value="' + formatoMiles(monto) + '" /></div>';



            $(".noimpr").remove();


            $($("#slcctaban").parents(".row-fluid")[0])
                .css("margin-bottom", "10px")
                .append(htmlfechas);


            imprimirDivOriginal('div_cheque', titulo);
        });

    }

    var cargarInputsPersona = function () {
        var jsonPersonas = "";
        var arrayPersonas = new Array();

        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMLETR.ashx?flag=L-2",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            beforeSend: function () { Bloquear($($(".personas").parents("div")[0])) },
            success: function (datos) {
                if (datos != null && datos != "") {
                    jsonPersonas = datos;
                }
            },
            complete: function () {

                if (jsonPersonas !== "") {
                    var json = jQuery.parseJSON(jsonPersonas);
                    if (json != null) {
                        json.filter(function (e) { if (arrayPersonas.indexOf(e.NOMBRE) < 0) { arrayPersonas.push(e.NOMBRE); } });
                    }

                    $(".personas").typeahead({ source: arrayPersonas }, { highlight: true, hint: true });

                    $(".personas").keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))

                    }).change(function () {
                        var actual = $(this);
                        var encontrado = false;
                        json.filter(function (d) {
                            if (d.NOMBRE == actual.val()) {
                                actual.attr("valor", d.PIDM);
                                encontrado = true;

                            }
                            if (!encontrado) {
                                actual.removeAttr("valor");
                            }
                        });

                        if (actual.val() == "") {
                            actual.removeAttr("valor");
                        }
                       
                    });

                }

                Desbloquear($($(".personas").parents("div")[0]))
            }
        });
    }

    var cargarCombos = function () {

        fnCargaEmpresa();

        agregar_firmante();

        fnCargaTipoCambio();     


    }

    var fnCargaTipoCambio = function () {
        var v_tipo_cambio = 0;
        $.ajax({
            type: "POST",
            url: "vistas/NB/ajax/NBMCHEQ.ASHX",
            data: { flag: 'TC' },
            async: true,
            alias: "tipoCambio",
            beforeSend: function () { },
            success: function (res) {
                if (res != null && res != "" && res.indexOf("error") < 0) {
                    v_tipo_cambio = res;
                }
            },
            complete: function () {
                if (v_tipo_cambio) $("#lbltcambio").html("<small>Tipo de Cambio:" + v_tipo_cambio + "</small>");
            }
        });
    };

    var fnCargaNroCheque = function (ncta, ctapidm, p_tipo) {

        if (ObtenerQueryString("n") == undefined ) {
            $.ajax({
                type: "POST",
                url: "vistas/NB/ajax/NBMCHEQ.ASHX",
                data: { flag: 4, cuenta_bancaria: ncta, pidm_cuenta: ctapidm, tipo: p_tipo },
                beforeSend: function () { },
                success: function (res) {
                    $("#txt_nro_cheque").removeAttr("style");
                    if (res.NUMERO_CHEQUE.length === 8 && res.NUMERO_CHEQUE !== "RNC") {
                        $("#txt_nro_cheque").val(res.NUMERO_CHEQUE);
                    } else if (res.NUMERO_CHEQUE === "RNC") {
                        $("#txt_nro_cheque").css("border-color", "rgb(190, 67, 67)");
                        alertCustom("La cuenta bancaria no posee una chequera registrada, registre una nueva Chequera!");
                        $("#txt_nro_cheque").val("");
                    } else {
                        alertCustom("No se pudo obtener correctamente el número de cheque.");
                        $("#txt_nro_cheque").val("");
                    }

                },
                complete: function () {
                },
                error: function () {
                    $("#txt_nro_cheque").removeAttr("style");
                    alertCustom("No se pudo obtener correctamente el número de cheque.");
                    $("#txt_nro_cheque").val("");
                }
            });
        } 
        

    };

    var fnCargaEmpresa = function () {
        $.ajax({
            type: "POST",
            url: "vistas/NB/ajax/NBMCHEQ.ASHX",
            data: { flag: 5 },
            async: false,
            success: function (datos) {
                if (datos != null && datos != "" && datos.indexOf("error") < 0) {
                    $("#slcEmpresa").html(datos);
                }
            }
        });
    };

    var fnCargaCtasBancarias = function () {
        var cboCtaBanc = $("#slcctaban");
        $.ajax({
            type: "POST",
            url: "vistas/NB/ajax/NBMCHEQ.ASHX",
            data: { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm") },
            async: true,
            beforeSend: function () { Bloquear($(cboCtaBanc.parents("div")[0])); },
            alias: "ctaBancaria",
            success: function (datos) {
                if (datos != null && datos != "" && datos.indexOf("error") < 0) {
                    cboCtaBanc.html(datos);
                }
                else {
                    infoCustom2("La empresa no tiene chequeras registradas.");                                
                    cboCtaBanc.html("<option></option>");                 
                    $("#slc_firmante").val("");
                    $("#slc_firmante").attr("disabled", true);
                }
                cboCtaBanc.select2('val', '');  
                $("#txt_nro_cheque").val("");
            },
            complete: function () {
                Desbloquear($(cboCtaBanc.parents("div")[0]));
            }
        });
    };

    var fnCargaAutorizados = function (v_monto) {

        $.ajax({
            type: "POST",
            url: "vistas/NB/ajax/NBMCHEQ.ASHX",
            data: { flag: 8, empresa: $("#slcEmpresa").val(), cuenta_bancaria: $("#slcctaban").val(), monto: v_monto },
            async: true,
            alias: "autorizados",
            success: function (res) {
                if (res != "") {
                    $(".firmante.f1").html(res).attr("disabled", false);
                    if ($(".firmante.f1 option").length > 1) {
                        $("#agregar_firmante").attr("disabled", false).addClass("blue");
                    } else {
                        $("#agregar_firmante").attr("disabled", true).removeClass("blue");
                    }
                } else {
                    alertCustom("No existen Firmantes autorizados para el monto ingresado!");
                    $(".firmante.f1").html("").attr("disabled", true);
                }
            }
        });

    };

    var fnCargaMoneda = function () {

        
        $.ajax({
            type: "POST",
            url: "vistas/NB/ajax/NBMCHEQ.ASHX",
            data: { flag: 7, empresa: $("#slcEmpresa").val() },
            async: true,
            alias: "moneda",
            success: function (res) {
                if (res != null && res != "" && res.indexOf("error") < 0) {
                    $("#slcMoneda").html(res);
                }
            }
        });
        

        
    };


    var eventos = function () {

        $("#slcEmpresa").on("change",function () {

            cargarInputsPersona();
            btnBuscaPersonas();
            fnCargaCtasBancarias();
            fnCargaMoneda();

        });

        $("#slcctaban").on("change", function () {            

            if ($("#slcctaban").val() !== "") {
                offObjectEvents("txt_monto");
                $("#txt_monto").keypress(function (e) { return (ValidaDecimales(e, this, 2)); })
                if (parseFloat($("#slcctaban :selected").attr("saldo")) > 0) {
                    $("#txt_monto").attr("disabled", false);
                    $("#txt_monto").blur(function () {
                        if (parseFloat($(this).val()) < 0 || parseFloat($(this).val()) > parseFloat($("#slcctaban :selected").attr("saldo"))) {
                            if (!concepto_actu)
                                Confirmacion();
                        }
                    }).blur();
                } else {
                    if (!concepto_actu) {
                        Confirmacion();
                        $("#txt_monto").attr("disabled", false);
                    }
                }

                $("#txt_monto").change();

                var mone_code = $("#slcctaban :selected").attr("moneda");

                $("#slcMoneda").select2("val", mone_code).change();


                var firma = $("#slcctaban :selected").attr("firma");

                switch (firma) {

                    case "M":
                        //mancomunada
                        $(".f2").css("display", "none");
                        $("input.f2").css("display", "");
                        $("#slc_firmante").removeClass("activo").addClass("inactivo");
                        $("#txt_firmante").val($("#slcctaban :selected").attr("aut1")).attr("valor", $("#slcctaban :selected").attr("aut1pim")).attr("disabled", true).removeClass("inactivo").addClass("activo").addClass("obligatorio");

                        var i = 2;
                        $(".hc").remove();
                        var html = $("#div_f2").html();

                        while ($("#slcctaban :selected").attr("aut" + i + "pim") != undefined) {
                            $("div.f2").css("display", "");
                            var html2 = html.split("Firmante 2").join("Firmante " + i).split("txt_firmante2").join("txt_firmante" + i);
                            html2 = "<div id='div_f" + i + "' class='row-fluid f2 noimpr hc'>" + html2 + "</div>";
                            if (i == 2) {
                                $("#div_f2").html("");
                                $("#div_f2").html(html);
                            } else {
                                $($("#div_f" + (i - 1)).parents("div")[0]).append(html2);
                            }
                            $("#txt_firmante" + i).val($("#slcctaban :selected").attr("aut" + i)).attr("valor", $("#slcctaban :selected").attr("aut" + i + "pim")).attr("disabled", true).addClass("obligatorio");

                            i += 1;
                        }

                        $(".f1").css("display", "none"); //button y select
                        btnBuscaPersonas();
                        break;

                    case "S":
                        $(".hc").remove();
                        //conf de boton
                        $("#agregar_firmante").children("i").removeClass("icon-minus").addClass("icon-plus");
                        $("#agregar_firmante")
                            .removeClass("red").addClass("blue")
                            .attr("fctn", "+");
                        //fin conf boton

                        var html = "";
                        var i = 1;
                        while ($("#slcctaban :selected").attr("aut" + i + "pim") != undefined) {

                            html += '<option value="' + i + '" valor="' + $("#slcctaban :selected").attr("aut" + i + "pim") + '">' + $("#slcctaban :selected").attr("aut" + i) + '</option>';
                            i += 1;
                        }
                        //si es solo uno deshabilita
                        if (i == 2) { $("#agregar_firmante").attr("disabled", true).removeClass("blue"); } else { $("#agregar_firmante").attr("disabled", false).addClass("blue"); }

                        //fin todos firmantes

                        $(".f2").css("display", "none").removeClass("obligatorio");
                        $("#txt_firmante").removeClass("activo").addClass("inactivo");;
                        $(".firmante.f1")            //select                                       
                            .attr("disabled", false)
                            .html(html)
                            .change()
                            .removeClass("inactivo")
                            .addClass("activo")
                            .addClass("obligatorio");
                        $(".f1").css("display", "");
                        $("#txt_firmante2").removeAttr("valor").removeClass("obligatorio");

                        break;

                    case "X":
                        var html = "";
                        $(".hc").remove();

                        //conf de boton
                        $("#agregar_firmante").children("i").removeClass("icon-minus").addClass("icon-plus");
                        $("#agregar_firmante")
                            .removeClass("red").addClass("blue")
                            .attr("fctn", "+");
                        //fin conf boton

                        //todos los firmantes
                        var i = 1;
                        while ($("#slcctaban :selected").attr("aut" + i + "pim") != undefined) {

                            html += '<option value="' + i + '" valor="' + $("#slcctaban :selected").attr("aut" + i + "pim") + '">' + $("#slcctaban :selected").attr("aut" + i) + '</option>';
                            i += 1;
                        }
                        //si es solo uno deshabilita
                        if (i == 2) { $("#agregar_firmante").attr("disabled", true).removeClass("blue"); } else { $("#agregar_firmante").attr("disabled", false).addClass("blue"); }

                        //fin todos firmantes

                        $(".f2").css("display", "none").removeClass("obligatorio");
                        $("#txt_firmante").removeClass("activo").addClass("inactivo");;
                        $(".firmante.f1")            //select                                                                                              
                            .html(html)
                            .change()
                            .removeClass("inactivo")
                            .addClass("activo")
                            .addClass("obligatorio");
                        $(".f1").css("display", "");
                        $("#txt_firmante2").removeAttr("valor").removeClass("obligatorio");
                        break;
                }

                cargaNumero();
            } else {
                $(".f2").css("display", "none").removeClass("obligatorio");
                $("#txt_firmante").removeClass("activo").addClass("inactivo");;
                $(".firmante.f1")            //select                                                                                              
                    .html("")
                    .change()
                    .removeClass("activo")
                    .addClass("inactivo")
                    .removeClass("obligatorio");
                $(".f1").css("display", "");
                $("#txt_firmante2").removeAttr("valor").removeClass("obligatorio");

                $("#agregar_firmante").children("i").removeClass("icon-minus").removeClass("icon-plus");
                $("#agregar_firmante")
                    .removeClass("red").removeClass("blue")
                    .attr("fctn", "");
                $("#agregar_firmante").css("display", "none");
            }

            
        });

        $("#slc_firmante").on("change",function () {
            $(this).attr("valor", $("#slc_firmante :selected").attr("valor"));
            });

        $("#txt_monto").on("change",function () {
            var v_monto;
            if ($("#slcctaban :selected").attr("firma") == "X") {
                if ($("#slcMoneda").val() == "0002") {
                    v_monto = $(this).val() == "" ? 0.01 : $(this).val();
                } else {
                    v_monto = $(this).val() == "" ? 0.01 : $(this).val() * v_tipo_cambio;
                }
                fnCargaAutorizados(v_monto);
            }
        })

        $("input:radio[name=rb_tipo]").on("change",function () {
      
            var tipoActual = $("input:radio[name=rb_tipo]:checked").val();
            switch (tipoActual) {

                case "C":
                    $("#txt_fecha_cobrar")
                        .removeClass("obligatorio");
                    break;
                case "D":
                    $("#txt_fecha_cobrar")
                        .addClass("obligatorio");
                    break;
            }
        });

        $("#slcdestino").change(function () {

            if ($(this).val() == "G") {
                $("#txt_monto").removeClass("obligatorio");
            } else {
                $("#txt_monto").removeClass("obligatorio").addClass("obligatorio");
            }

        });

        $("input:radio[name=rb_tipo]").change(function () {

            cargaNumero();

        });

        function cargaNumero() {
            if (($("#hddauxiliar").val() != ""
                && $("input:radio[name=rb_tipo]:checked").val() != $("#hddauxiliar2").val())
                || ($("#hddauxiliar").val() == ""
                    && $("#hddauxiliar2").val() == "")
                || $("#slcctaban").val() != $("#hddauxiliar3").val()) {

                var ncta = $("#slcctaban").val();
                var ctapidm = $("#slcctaban :selected").attr("pidm");
                var p_tipo = $("input:radio[name=rb_tipo]:checked").val();

                fnCargaNroCheque(ncta, ctapidm, p_tipo);

            } else {
                $("#txt_nro_cheque").val($("#hddauxiliar").val()).removeAttr("style");

            }
        } 

    };
    

    function btnBuscaPersonas() {

        $(".buscaPersona").off("click").click(function () {
            var campo = $($(this).siblings("input")).attr("class").indexOf("inactivo") > 0 ? $($(this).siblings("select")) : $($(this).siblings("input"));
            if ($.trim(campo.val()) != "") {
                var pidm = campo.attr("valor");
                if (pidm != undefined) {
                    BuscarEmpresa(pidm);
                } else {
                    campo.parents(".control-group").addClass("error");
                    alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese informaci&oacute;n v&aacute;lida!");
                    campo.focus(function () { $(this).parents(".control-group").removeClass("error"); });
                }
            } else {
                campo.parents(".control-group").addClass("error");
                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese el campo requerido!");
                campo.focus(function () { $(this).parents(".control-group").removeClass("error"); });
            }
        });;

    }
    
    function agregar_firmante() {

        $("#agregar_firmante").click(function () {
            var btnplus = $(this);
            if ($(this).attr("fctn") == "+") {

                var n = $("#slc_firmante").val();

                var flag = true;
                var i = $("div[id*=div_f]").length == 1 ? 2 : $("div[id*=div_f]").length + 2;

                var html = $("#div_f2").html();

                if ($("#div_f2").css("display") == "none") {
                    i = 2;
                    $("#div_f2").html(html);
                    $("#div_f2 button").css("display", "").click(function () {

                        var selected_div = $(this).parents("div[id*=div_f]").attr("id").split("div_f")[1];
                        $("#slc_firmante option[valor=" + $("#txt_firmante" + selected_div).attr("valor") + "]").css("display", "").removeClass("no-disp");

                        $("#div_f2").css("display", "none");

                        $("#txt_firmante2").removeAttr("valor").removeClass("obligatorio");

                        btnplus.children("i").attr("disabled", false);
                        btnplus.addClass("blue");
                        btnplus.attr("fctn", "+");
                        $("#slc_firmante").attr("disabled", false);

                        if ($("div[id*=div_f]").length == 1)
                            $(".row-fluid.f2").css("display", "none");


                    });
                } else {
                    if (i == 2) i += 1;
                    var html2 = html.split("Firmante 2").join("Firmante " + i).split("txt_firmante2").join("txt_firmante" + i);
                    html2 = "<div id='div_f" + i + "' class='row-fluid f2 noimpr hc'>" + html2 + "</div>";
                    $($("#div_f" + (i - 1)).parent()[0]).append(html2);
                    $("#div_f" + i + " button").css("display", "").click(function () {

                        var selected_div = $(this).parents("div[id*=div_f]").attr("id").split("div_f")[1];
                        $("#slc_firmante option[valor=" + $("#txt_firmante" + selected_div).attr("valor") + "]").css("display", "").removeClass("no-disp");

                        $("#div_f" + selected_div).remove();
                        $("#slc_firmante").attr("disabled", false);
                        btnplus.children("i").attr("disabled", false);
                        btnplus.addClass("blue");
                        btnplus.attr("fctn", "+");
                        $("#txt_firmante" + i).removeAttr("valor").removeClass("obligatorio");

                    });
                }

                $("#txt_firmante2, .row-fluid.f2").css("display", "");
                $("#txt_firmante" + i).val($("#slc_firmante :selected").html()).attr("valor", $("#slc_firmante :selected").attr("valor")).addClass("obligatorio").attr("disabled", true);

                $("#slc_firmante option[value=" + n + "]").css("display", "none").addClass("no-disp");

                $("#slc_firmante").val("");

                if ($("#slc_firmante option").length == i || $("#slc_firmante option").length == $("div[id*=div_f]").length + 1) {
                    $(this).children("i").attr("disabled", true);
                    $(this).removeClass("blue");
                    $(this).attr("fctn", "-");
                    $(".firmante").attr("disabled", true);
                }
                         
                $("#slc_firmante").val($($("#slc_firmante option[class!=no-disp]")[0]).val()).change();               

            }

        });

    }
    
    var cargaInicial = function () {

        $("#txt_monto").attr("disabled", true);

        var pidm = ObtenerQueryString("pidm");
        var cta = ObtenerQueryString("cta");
        var t = ObtenerQueryString("t");
        var n = ObtenerQueryString("n");

        if (n != null) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NB/ajax/NBMCHEQ.ASHX?numero=" + n + "&cuenta_bancaria=" + cta + "&pidm_cuenta=" + pidm + "&tipo=" + t + "&flag=3",
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {


                    concepto_actu = true;
                    $("input:radio[name=rb_tipo]").removeAttr("checked").parent("span").removeClass("checked");
                    $("input:radio[value=" + datos[0].TIPO + "]").attr("checked", true).parent("span").addClass("checked");
                    $("input:radio[name=rb_tipo]").change();
                    $("#hddauxiliar2").val(datos[0].TIPO);

                    $("#slcEmpresa").select2("val", datos[0].EMPRESA).change();

                    $("#txt_fecha_rgto").val(datos[0].FECHA_REGISTRO);
                    $("#txt_fecha_emision").val(datos[0].FECHA_EMISION);
                    $("#txt_fecha_cobrar").val(datos[0].FECHA_COBRAR);

                    $("#txt_giradoa").attr("valor", datos[0].GIRADOA).val(datos[0].NGIRADOA);;
                    
                 
                   

                    $("#hddauxiliar3").val(datos[0].CTA_CODE);
                    $("#txt_nro_cheque").val(datos[0].NUMERO_CHEQ);
                    $("#hddauxiliar").val(datos[0].NUMERO_CHEQ);
                    $("#slcestado").select2("val", datos[0].ESTADO_CHEQ);

                    $(document).ajaxComplete(function (event, xhr, settings) { // para los combos que cargan asincronamente
                        if (settings.url === "vistas/NB/ajax/NBMCHEQ.ASHX") {
                            switch (settings.alias) {                           
                                case "autorizados":
                                    var firma = $("#slcctaban :selected").attr("firma");
                                    if (firma != "M") {
                                        var firmantes_ = datos[0].FIRMANTE_2.split(",");
                                        if (firmantes_.length > 0 && datos[0].FIRMANTE_2 != "") {
                                            for (var i = 0; i < firmantes_.length; i++) {
                                                $("#slc_firmante").val($("#slc_firmante [valor = " + firmantes_[i] + "]").val()).change();
                                                $("#agregar_firmante").click();
                                            }
                                        }
                                        $("#slc_firmante").attr("valor", datos[0].FIRMANTE).val($("#slc_firmante [valor = " + datos[0].FIRMANTE + "]").val()).change();
                                    }
                                    break;
                                case "ctaBancaria":
                                    $("#slcctaban").select2("val", datos[0].CTA_CODE).change();
                                    $("#txt_monto").val(datos[0].MONTO).change();
                                    break;
                            }
                        }
                    });           

                   

                    $("#txt_glosa").val(datos[0].GLOSA);
                    $("#slcMoneda").select2("val", datos[0].MONEDA).change();
                    $("#slcdestino").select2("val", datos[0].DESTINO).change();


                    if (datos[0].ESTADO_CHEQ != "F") {
                        $(".portlet-body :input").attr("disabled", true);
                        $(".form-actions").hide();
                    }

                },
                error: function (msg) {

                    alert(msg);
                }
            });


        }


    };
    
    var plugins = function () {

        inifechas("txt_fecha_emision", "txt_fecha_cobrar");
        $(".personas").focus(function () { $(this).inputmask({ "mask": "k", "repeat": 150, "greedy": false }); })


        //$("#txt_monto").keypress(function (e) { return (ValidaDecimales(e, this)); })
        $("#txt_monto").keypress(function (e) { return (ValidaDecimales(e, this, 2)); })

        $("#txt_glosa").focus(function () { $(this).inputmask({ "mask": "D", "repeat": 100, "greedy": false }); })

        var date = new Date();
        var fecha_actual = date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString();
        $("#txt_fecha_rgto, #txt_fecha_emision").datepicker('setDate', fecha_actual);

        $("#slcEmpresa").select2();
        $("#slcestado").select2();
        $("#slcdestino").select2();
        $("#slcctaban").select2();
        $("#slcMoneda").select2();
    }

    return {
        init: function () {
            plugins();
            eventos();
            cargarCombos();
            imprimir();
            cargaInicial();
        }
    };

}();

var NBLCHEQ = function () {
    var oTableCheques = [];

    var handlePlugins = function () {
        $(".combo").select2();
    }

    var handleFillcboEmpresa = function () {
        var sEmpresa = fnGetEmpresas(1, "A", true);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").val("").change();
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/NB/ajax/NBMFIRM.ASHX?flag=4&usuario=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '"' + ' pidm="' + datos[i].PIDM + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#cboEmpresa").select2();

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var handleFillcboCuentas = function (pPidmEmp) {
        //let pidmEmpresa = $("#cboEmpresa").attr('data-pidm');

        $.ajax({
            type: "post",
            url: "vistas/nb/ajax/nbmcheq.ashx?flag=LCU"+
            "&pidm_cuenta=" + pPidmEmp + "&estado=A",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                let oTipoCta = datos;
                $("#cbocta").html('<option value="">TODOS</option>');
                $.each(oTipoCta, function (key, value) {
                    $("#cbocta").append("<option value='" + value.CODE + "'>" + value.DESCRIPCION + "</option>");
                });

                $("#cbocta").val("").change();

            },
            error: function () {
                noexito();
            }
        });

    }

    var handleControls = function () {
        $("#cboEmpresa").on("change", function () {
            let pidmEmp = $("#cboEmpresa option:selected").attr('pidm');
            console.log(pidmEmp);
            handleFillcboCuentas(pidmEmp);
        });

        $("#btnFiltrar").click(function () {
            fnGetCheques();
        });

    }

    var handleTablaCheques = function () {
        
        var parms = {
            data: null,
            order: [[0, 'asc']],
            columns: [
                {
                    data: "NUMERO_CHEQ", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NUMERO_CUENTA" },
                { data: "NEMPRESA" },
                { data: "NTIPO" },
                {
                    data: "FECHA_EMISION",
                    type:"fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_REGISTRO",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_COBRAR",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).html((rowData.SMONEDA == null) ? '' + parseFloat($(td).html()).toFixed(2) : (rowData.SMONEDA + $(td).html()));

                    }
                },
                { data: "NGIRADOA" },
                { data: "NFIRMANTE" },
                {
                    data: "NESTADO_CHEQ",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var info_html = '<div class="row-fluid"><div class="span9">' + $(td).html() + '</div><div class="span3" align="right"> <span  id="info_' + row + '"  ><i style="color:#888; cursor:help;" class="icon-info-sign"></i></span></div></div></td>';
                        $(td).html(info_html).attr("style", "width: 9%;").addClass("tipo_info");


                    }
                }
            ]
        }

        oTableCheques = iniciaTabla("tblBandeja", parms);       
        $('#tblBandeja').removeAttr('style');



        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableCheques.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableCheques.fnGetPosition(this);
                var row = oTableCheques.fnGetData(pos);
                var pidm = row.CTA_PIDM;
                var cta = row.CTA_CODE;
                var t = row.TIPO;
                var n = row.NUMERO_CHEQ;
                window.location.href = '?f=NBMCHEQ&pidm=' + pidm + '&cta=' + cta + '&t=' + t + '&n=' + n;
            }

        });

        $('#tblBandeja tbody').on('mouseover', '.tipo_info', function () {

            var pos = oTableCheques.api(true).row($(this).parents("tr")).index();
            var rowData = oTableCheques.fnGetData(pos);

            $.ajaxSetup({ async: false });
            $.post("vistas/NB/ajax/NBMCHEQ.ASHX", {
                flag: "D",
                cuenta_bancaria: rowData.CTA_CODE,
                pidm_cuenta: rowData.CTA_PIDM,
                numero: rowData.NUMERO_CHEQ,
                tipo: rowData.TIPO
            },
                function (res2) {
                    var text0 = "";
                    var fechaant = "";
                    for (var i = 0; i < res2.length; i++) {

                        if (fechaant == res2[i].FECHA) {
                            text0 = res2[i].NESTADO_CHEQ + " y " + text0;
                            continue;
                        }

                        text0 += res2[i].NESTADO_CHEQ + " el día " + res2[i].FECHA + " por " + res2[i].USUARIO + "<br>";

                        fechaant = res2[i].FECHA;
                    }


                    if ($('#_info_info_' + pos).html() == undefined) {
                        showInfo('info_' + pos, "Información", text0, 'I', 'D');

                    }
                });

            $.ajaxSetup({ async: true });

        });

    }

    var fnGetCheques = function () {
        let pidmEmpresa = $("#cboEmpresa option:selected").attr('pidm');
        let CodCta = $("#cbocta").val();
        let estado = $("#cboEstado").val();

        $.ajax({
            type: "post",
            url: "vistas/NB/ajax/NBMCHEQ.ASHX?flag=LCHE&cuenta_bancaria=" + CodCta + 
            "&pidm_cuenta=" + pidmEmpresa + "&estado=" + estado,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos.length > 0) {
                    oTableCheques.fnClearTable();
                    oTableCheques.fnAddData(datos);                   
                }
                else {
                    oTableCheques.fnClearTable();
                    infoCustom2("No se encontraron datos!");
                    Desbloquear('ventana');
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista de cheques.");
                oTableCheques.fnClearTable();
            }
        });

    }

    return {
        init: function () {
            handlePlugins();
            handleTablaCheques();            
            handleControls();
            fillCboEmpresa();
            $("#cboEmpresa").val($("#ctl00_hddctlg").val()).change();
            //handleFillcboEmpresa();
            $('#btnFiltrar').click();
            
        }
    }

}();


function cargaRep_Legal(pidm) {
    var v_pidm = "";
    var v_nombre = "";
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/ncmpers.ashx?OPCION=4&PIDM=" + pidm + "&DOID_CODE=6" + "&NRO=2xxxxxxxxxx",
        contenttype: "application/json;",
        datatype: "json",
        async: false,

        success: function (datos) {
            if (datos != null && datos != "") {
                if (datos[0].ENTIDAD_IND == 'J') {
                    if (datos[0].REP_LEGAL != "") {
                        v_pidm = datos[0].REP_LEGAL;
                        v_nombre = datos[0].REPRESENTANTE_DATOS[0].NOMBRE_COMPLETO;
                    }
                }
                else {
                    v_pidm = datos[0].PIDM;
                    v_nombre = datos[0].RAZONSOCIAL;

                }

            }
            else {
                $.ajax({
                    type: "post",
                    url: "vistas/NC/ajax/ncmpers.ashx?OPCION=4&PIDM=" + pidm + "&DOID_CODE=1" + "&NRO=xxxxxxxx",
                    contenttype: "application/json;",
                    datatype: "json",
                    async: false,

                    success: function (data) {
                        v_pidm = data[0].PIDM;
                        v_nombre = data[0].APELL_PATE + " " + data[0].APELL_MATE + " " + data[0].NOMBRE;
                    }
                });

            }
        }
    });

    $("#txt_firmante").attr("valor", v_pidm).val(v_nombre);

}

function Actualizar() {

    var p_tipo = $("input:radio[name=rb_tipo]:checked").val();
    var p_empr = $("#slcEmpresa").val();
    var p_nume = $("#txt_nro_cheque").val();
    var p_feem = $("#txt_fecha_emision").val();
    var p_feco = $("#txt_fecha_cobrar").val() == "" ? $("#txt_fecha_emision").val() : $("#txt_fecha_cobrar").val();
    var p_fere = $("#txt_fecha_rgto").val();
    var p_mont = $("#txt_monto").val();
    var p_giaa = $("#txt_giradoa").attr("valor") == undefined ? $("#txt_giradoa").val("") : $("#txt_giradoa").attr("valor");
    var p_ctab = $("#slcctaban").val();
    var p_ctap = $("#slcctaban :selected").attr("pidm");
    var p_esta = $("#slcestado").val();
    var p_firm = $(".ff1.activo :selected").attr("valor") == undefined ? $(".ff1.activo").val("") : $(".ff1.activo :selected").attr("valor");
    var inputs_firmantes = $("div[id*=div_f] input[id*=txt_firmante][class*=obligatorio]");
    var x = "";
    for (var i = 0; i < inputs_firmantes.length; i++) { x += ($(inputs_firmantes[i]).attr("valor") == undefined ? "" : $(inputs_firmantes[i]).attr("valor")) + ","; }
    x = x.substring(0, x.length - 1);
    var p_fir2 = x;
    var p_mone = $("#slcMoneda").val();
    var p_glos = $("#txt_glosa").val();
    var p_user = $('#ctl00_lblusuario').html();

    var p_destino = $('#slcdestino').val();

    $("#txt_dc").removeClass("obligatorio");

    if (!vErrorBodyAnyElement(".obligatorio")) {
        Bloquear("ventana");
        $.post("vistas/NB/ajax/NBMCHEQ.ASHX", {
            flag: 2,
            empresa: p_empr,
            cuenta_bancaria: p_ctab,
            pidm_cuenta: p_ctap,
            numero: p_nume,
            fechaemision: p_feem,
            fechacobrar: p_feco,
            fechargto: p_fere,
            monto: p_mont,
            giradoa: p_giaa,
            estado: p_esta,
            usuario: p_user,
            firmante: p_firm,
            moneda: p_mone,
            glosa: p_glos,
            tipo: p_tipo,
            firmante2: p_fir2,
            destino: p_destino

        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            });
    } else {

        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");

    }
}


function Crear() {
    var p_tipo = $("input:radio[name=rb_tipo]:checked").val();
    var p_empr = $("#slcEmpresa").val();
    var p_nume = $("#txt_nro_cheque").val();
    var p_feem = $("#txt_fecha_emision").val();
    var p_feco = $("#txt_fecha_cobrar").val() == "" ? $("#txt_fecha_emision").val() : $("#txt_fecha_cobrar").val();
    var p_fere = $("#txt_fecha_rgto").val();
    var p_mont = $("#txt_monto").val();
    var p_giaa = $("#txt_giradoa").attr("valor") == undefined ? $("#txt_giradoa").val("") : $("#txt_giradoa").attr("valor");
    var p_ctab = $("#slcctaban").val();
    var p_ctap = $("#slcctaban :selected").attr("pidm");
    var p_esta = $("#slcestado").val();
    var p_firm = $(".ff1.activo").attr("valor") == undefined ? $(".ff1.activo").val("") : $(".ff1.activo").attr("valor");
    var p_mone = $("#slcMoneda").val();
    var p_glos = $("#txt_glosa").val();
    var p_user = $('#ctl00_lblusuario').html();
    var inputs_firmantes = $("div[id*=div_f] input[id*=txt_firmante][class*=obligatorio]");
    var x = "";
    for (var i = 0; i < inputs_firmantes.length; i++) { x += ($(inputs_firmantes[i]).attr("valor") == undefined ? "" : $(inputs_firmantes[i]).attr("valor")) + ","; }
    x = x.substring(0, x.length - 1);

    var p_fir2 = x;
    
    var p_destino = $('#slcdestino').val();


    if (!vErrorBodyAnyElement(".obligatorio")) {
        Bloquear("ventana");
        $.post("vistas/NB/ajax/NBMCHEQ.ASHX", {
            flag: 1,
            empresa: p_empr,
            cuenta_bancaria: p_ctab,
            pidm_cuenta: p_ctap,
            numero: p_nume,
            fechaemision: p_feem,
            fechacobrar: p_feco,
            fechargto: p_fere,
            monto: p_mont,
            giradoa: p_giaa,
            estado: p_esta,
            usuario: p_user,
            firmante: p_firm,
            moneda: p_mone,
            glosa: p_glos,
            tipo: p_tipo,
            firmante2: p_fir2,
            destino: p_destino,
            fondos_ind: chq_sin_fondos

        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    concepto_actu = true;
                } else {
                    noexito();
                }
            });
    } else {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");

    }
}


conversion_a_letras = "";
simbolo_moneda = "";

function Aletras(numero) {
    $.ajaxSetup({ async: false });
    $.post("vistas/NB/ajax/NBMCHEQ.ASHX", {
        flag: "Letras",
        numero: numero

    },
        function (res) {
            Desbloquear("ventana");
            conversion_a_letras = res.toUpperCase();

        });
    $.ajaxSetup({ async: true });

}

function ObtenerSimbolo(codigo) {
    $.ajaxSetup({ async: false });
    $.post("vistas/NB/ajax/NBMCHEQ.ASHX", {
        flag: "M",
        codigo: codigo

    },
        function (res) {
            Desbloquear("ventana");
            simbolo_moneda = res;

        });
    $.ajaxSetup({ async: true });
}


function formatoMiles(n) {


    var basefinal = "";
    for (var i = 0; i < n.split(".")[0].length; i += 3) {
        basefinal += n.split(".")[0].split("").reverse().join("").substring(i, i + 3) + ",";
    }
    basefinal = basefinal.split("").reverse().join("").substring(1);

    if (n.split(".")[1] != undefined) {
        basefinal += "." + n.split(".")[1];
    }
    return basefinal;

}

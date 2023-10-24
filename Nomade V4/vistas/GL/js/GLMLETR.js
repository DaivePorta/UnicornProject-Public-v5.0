
pidmUsua = "";

var GLMLETR = function () {

    var cargarInputsPersona = function () {    
      
        var pantalla_actual = ObtenerQueryString("f");
        if (pantalla_actual.toUpperCase() != "GLMLETR") {  // por pagar

            $(".personasEmpleado").removeClass("personasEmpleado").addClass("personasNatural");
        }

    }

    var cargaPersona = function () {
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

                                if (actual.attr("id") == "txt_giradoa") {
                                    cargaRep_Legal(d.PIDM);
                                }

                            }
                            if (!encontrado) {
                                actual.removeAttr("valor");
                            }
                        });
                        if (actual.val() == "") { actual.removeAttr("valor"); }
                    });
                }

                Desbloquear($($(".personas").parents("div")[0]))
            }
        });
    }

    var cargaPersonaNatural = function () {
        var jsonPersonasNatural = "";
        var arrayPersonasNatural = new Array();

        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMLETR.ashx?flag=LN",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            beforeSend: function () { Bloquear($($(".personasNatural").parents("div")[0])) },
            success: function (datos) {
                if (datos != null && datos != "") {
                    jsonPersonasNatural = datos;
                }
            },
            complete: function () {

                if (jsonPersonasNatural !== "") {

                    var jsonNatural = jQuery.parseJSON(jsonPersonasNatural);
                    if (jsonNatural != null) {
                        jsonNatural.filter(function (e) { if (arrayPersonasNatural.indexOf(e.NOMBRE) < 0) { arrayPersonasNatural.push(e.NOMBRE); } });
                    }

                    $(".personasNatural").typeahead({ source: arrayPersonasNatural }, { highlight: true, hint: true });

                    $(".personasNatural").keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))

                    }).change(function () {
                        var actual = $(this);
                        var encontrado = false;
                        jsonNatural.filter(function (d) {
                            if (d.NOMBRE == actual.val()) {
                                actual.attr("valor", d.PIDM);
                                encontrado = true;

                            }
                            if (!encontrado) {
                                actual.removeAttr("valor");
                            }
                        });
                        if (actual.val() == "") { actual.removeAttr("valor"); }
                    });

                }


                Desbloquear($($(".personasNatural").parents("div")[0]))
            }
        });
    }   

    var cargaEmpresa = function () {

        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMLETR.ASHX",
            data: { flag: 5 },
            async: false,
            success: function (datos) {
                if (datos != null && datos != "" && datos.indexOf("error") < 0) {
                    $("#slcEmpresa").html(datos);
                    $("#slcEmpresa").change();
                }                
            }
        });
    }

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                //selectEst.append('<option></option>');
                if (datos != null) {
                    // $('#cboEstablecimiento').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', 'TODOS');
                    selectEst.val();
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboEstablecimiento').select2('val', '');
                }

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var cargaMoneda = function () {

        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMLETR.ASHX",
            data: { flag: 7, empresa: $("#slcEmpresa").val() },
            async: true,
            alias: "moneda",
            beforeSend: function () { Bloquear($($("#slcMoneda").parents("div")[0])) },
            success: function (datos) {
                if (datos != null && datos != "" && datos.indexOf("error") < 0) {
                    $("#slcMoneda").html(datos);
                }

            },
            complete: function () { Desbloquear($($("#slcMoneda").parents("div")[0])); }
        });
    }

    var cargaBancos = function () {

        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMLETR.ASHX",
            data: { flag: 6 },
            async: true,
            alias: "banco",
            beforeSend: function () { Bloquear($($("#slcbanco").parents("div")[0]))},
            success: function (datos) {
                if (datos != null && datos != "" && datos.indexOf("error") < 0) {
                    $("#slcbanco").html(datos);
                }

            },
            complete: function () { Desbloquear($($("#slcbanco").parents("div")[0])); }
        });

    }

    var cargarJsonEmpleado = function (empresa) {
        jsonPersonasEmpleado = null;
        arrayPersonasEmpleado = new Array();
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMLETR.ashx?flag=LE-2&empresa=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            beforeSend: function () { Bloquear($($(".personasEmpleado").parents("div")[0])); },
            async: true,
            success: function (datos) {
                if (datos != null && datos != "") {

                    jsonPersonasEmpleado = datos;

                } else {
                    jsonPersonasEmpleado = "";
                }
            },
            complete: function () {
                if (jsonPersonasEmpleado !== "") {
                    $(".autoPIDM").val($.trim($("#slcEmpresa :selected").html()));
                    $(".autoPIDM").attr("valor", $("#slcEmpresa :selected").attr("pidm"));

                    var pantalla_actual = ObtenerQueryString("f");
                    if (pantalla_actual.toUpperCase() == "GLMLETR") {                        

                        arrayPersonasEmpleado = new Array();

                        var jsonEmpleado = jQuery.parseJSON(jsonPersonasEmpleado);
                        if (jsonEmpleado != null) {
                            jsonEmpleado.filter(function (e) { if (arrayPersonasEmpleado.indexOf(e.NOMBRE) < 0) { arrayPersonasEmpleado.push(e.NOMBRE); } });
                        }

                        $(".personasEmpleado").typeahead({ source: arrayPersonasEmpleado }, { highlight: true, hint: true });

                        $(".personasEmpleado").keyup(function () {
                            $(this).siblings("ul").css("width", $(this).css("width"))
                        }).change(function () {
                            var actual = $(this);
                            var encontrado = false;
                            if (jsonEmpleado != null) {
                                jsonEmpleado.filter(function (d) {
                                    if (d.NOMBRE == actual.val()) {
                                        actual.attr("valor", d.PIDM);
                                        encontrado = true;

                                    }
                                    if (!encontrado) {
                                        actual.removeAttr("valor");
                                    }
                                });
                            }
                            if (actual.val() == "") { actual.removeAttr("valor"); }
                        });
                    }
                }

                Desbloquear($($(".personasEmpleado").parents("div")[0]));
            }
        });
    }

    var cargaCuenta = function (empresa, moneda, banco) {

        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMLETR.ASHX",
            data: { flag: 8, empresa: empresa, moneda: moneda, banco: banco },
            async: true,
            alias: "cuenta",
            beforeSend: function () { Bloquear($($("#txt_nro_cuenta").parents("div")[0])) },
            success: function (datos) {
                if (datos != null && datos != "" && datos.indexOf("error") < 0) {
                    $("#txt_nro_cuenta").html(datos).attr("disabled", false);
                }

            },
            complete: function () { Desbloquear($($("#txt_nro_cuenta").parents("div")[0])); }
        });      
    }

    var funcionalidad = function () {

        $("#slcEmpresa").change(function () {  
            fillCboEstablecimiento();
            cargarJsonEmpleado(this.value);       
            cargaMoneda();
        });      

        $("#slcdestino").select2()
            .change(function () {

                switch ($(this).val()) {

                    case "C":
                        $(".datosBanco")
                            .attr("disabled", true)
                            .removeClass("obligatorio")
                            .val("").change()
                            .parents(".control-group").removeClass("error");
                        break;
                    case "G":
                        $(".datosBanco")
                            .attr("disabled", true)
                            .removeClass("obligatorio")
                            .val("").change()
                            .parents(".control-group").removeClass("error");
                        break;
                    case "L":
                        $(".datosBanco")
                            .attr("disabled", false)
                            .addClass("obligatorio");
                       
                        $(".no-ob").removeClass("obligatorio");

                        cargaBancos();

                        break;
                    case "D":
                        $(".datosBanco")
                            .attr("disabled", false)
                            .addClass("obligatorio");

                        $(".no-ob").removeClass("obligatorio");

                        cargaBancos();

                        break;
                    case "":
                        $(".datosBanco")
                            .attr("disabled", true)
                            .removeClass("obligatorio")
                            .val("").change()
                            .parents(".control-group").removeClass("error");
                        break;

                }
                
            });

        $("#slcMoneda, #slcbanco, #slcEmpresa").change(function () {
            $("#txt_nro_cuenta").val("").change().html("").attr("disabled", true);
            if ($("#slcMoneda").val() != "" && $("#slcbanco").val() != "" && $("#slcEmpresa").val() != "") {  
                cargaCuenta($("#slcEmpresa").val(), $("#slcMoneda").val(), $("#slcbanco").val());
            }

        });

        $("#btnimprimir").click(function () {
            var titulo = "LETRA";
            if ($("input:radio[name=rb_tipo]:checked").val() == "P") {
                titulo += (" POR PAGAR");
            } else { titulo += (" POR COBRAR"); }
            $("#ctrlRadio").remove();
            imprimirDiv('div_letra', titulo);
        });
        
        function opcionPagarCobrar() {
            $("input:radio[name=rb_tipo]").change(function () {

                var tipoActual = $("input:radio[name=rb_tipo]:checked").val();

                $("#slcdestino").val("").change();
                switch (tipoActual) {
                    case "P":
                        $("#txt_girador")
                            .removeClass("autoPIDM")
                            .addClass("personas")
                            .val("")
                            .attr("disabled", false)
                            .removeAttr("valor")
                            .siblings("a").css("display", "inline-block");
                        $("#txt_giradoa")
                            .removeClass("personas")
                            .addClass("autoPIDM")
                            .val("")
                            .attr("disabled", true)
                            .siblings("a").css("display", "none")
                            .parents(".control-group").removeClass("error");

                        $('#txt_numero_unico').removeClass("no-ob");
                        $("#txt_dc, #txt_oficina,#txt_nro_cuenta").addClass("no-ob");

                        break;
                    case "C":
                        $("#txt_girador")
                            .removeClass("personas")
                            .addClass("autoPIDM")
                            .val("")
                            .attr("disabled", true)
                            .siblings("a").css("display", "none")
                            .parents(".control-group").removeClass("error");
                        $("#txt_giradoa")
                            .removeClass("autoPIDM")
                            .addClass("personas")
                            .val("")
                            .attr("disabled", false)
                            .removeAttr("valor")
                            .siblings("a").css("display", "inline-block");

                        $('#txt_nro_cuenta').removeClass("no-ob");
                        $("#txt_dc, #txt_oficina,#txt_numero_unico").addClass("no-ob");
                        break;

                }

                cargarInputsPersona();
             
            });
        }

        function validacionFecha() {

            $("#txt_fecha_vcmto").focus(function () {
                var fecha = $("#txt_fecha_giro").val();
                var fecha_arr = fecha.split("/")
                fecha_arr[0] = parseInt(fecha_arr[0]) + 1
                $(this).datepicker('setStartDate', fecha_arr.join("-"));
            });

        }

        function btnBuscaPersonas() {

            $(".buscaPersona").click(function () {
                var campo = $($(this).siblings("input"));
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

        function cargaPIDMUsuario() {

            $.ajaxSetup({ async: false });

            $.post("vistas/GL/ajax/GLMLETR.ASHX", { flag: 9, usuario: $("#ctl00_txtus").val() },
                function (res) {
                    if (res != null && res != "" && res.indexOf("error") < 0) {
                        pidmUsua = res;
                    }

                });
            $.ajaxSetup({ async: true });


            $("#txt_firmante").change(function () {

                if ($(this).attr("valor") == pidmUsua) {

                    $("#slcestado").select2("val", "E");

                } else {

                    $("#slcestado").select2("val", "F");

                }

            });

        }

        validacionFecha();
        opcionPagarCobrar();

        cargaPIDMUsuario();
        btnBuscaPersonas();
    }

    var handleOptionTipo = function () {

        $("#ctrlRadio").css("display", "none");

        $("input:radio[name=rb_tipo]").removeAttr("checked").parent("span").removeClass("checked");

        var pantalla_actual = ObtenerQueryString("f");

        if (pantalla_actual.toUpperCase() == "GLMLETR") {
            $("input:radio[value=P]").attr("checked", true).parent("span").addClass("checked");
        } else {
            $("input:radio[value=C]").attr("checked", true).parent("span").addClass("checked");
        }

        $("input:radio[name=rb_tipo]").attr("disabled", true).change();

    }
    
    var cargaInicial = function () {             
        handleOptionTipo();
        
        $(".datosBanco").attr("disabled", true);      

        var cod = ObtenerQueryString("codigo");
        var tipo = ObtenerQueryString("tipo");

        if (cod != null) {
            
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/GL/ajax/GLMLETR.ASHX?codigo=" + cod + "&flag=3&tipo=" + tipo,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {

                    $('#hddauxiliar').val(datos[0].CODIGO);

                    $("input:radio[name=rb_tipo]").removeAttr("checked").parent("span").removeClass("checked");
                    $("input:radio[value=" + datos[0].TIPO + "]").attr("checked", true).parent("span").addClass("checked");
                    $("input:radio[name=rb_tipo]").change();

                    $("#slcEmpresa").select2("val", datos[0].EMPRESA).change();
                    $("#txt_nro_letra").val(datos[0].NUMERO);
                    $("#txt_ref_girador").val(datos[0].REF_GIRADOR);
                    $("#txt_lugar").val(datos[0].LUGAR);
                    $("#txt_fecha_giro").val(datos[0].FECHA_GIRO);
                    $("#txt_fecha_vcmto").val(datos[0].FECHA_VENC);
                    $("#txt_monto").val(datos[0].MONTO);
                    $("#txt_girador").attr("valor", datos[0].GIRADOR).val(datos[0].NGIRADOR);

                    $("#txt_giradoa").attr("valor", datos[0].GIRADOA).val(datos[0].NGIRADOA);;
                    
                    $("#txt_avalista").attr("valor", datos[0].AVALISTA).val(datos[0].NAVALISTA);;

                    $("#slcestado").select2("val", datos[0].ESTADO_LETRA);

                    $("#txt_firmante").attr("valor", datos[0].FIRMANTE).val(datos[0].NFIRMANTE);
                    $("#txt_glosa").val(datos[0].GLOSA);


                    $("#slcdestino").select2("val", datos[0].DESTINO).change();    

                    $(document).ajaxComplete(function (event, xhr, settings) { // para los combos que cargan asincronamente
                        if (settings.url === "vistas/GL/ajax/GLMLETR.ASHX") {
                            switch (settings.alias) {
                                case "moneda":
                                    $("#slcMoneda").select2("val", datos[0].MONEDA);                                   
                                    break;
                                case "banco":
                                    $("#slcbanco").select2("val", datos[0].BANCO_CODE).change();
                                    break;                  
                                case "cuenta":
                                    $("#txt_nro_cuenta").select2("val", datos[0].NUMERO_CTA).change();
                                    break;   
                            }                        
                        }
                    });                    

                    if (datos[0].ESTADO_LETRA == "P") {
                        $(".portlet-body :input").attr("disabled", true);
                        $(".form-actions").hide();
                    } else {
                        if (datos[0].ESTADO_LETRA != "F") {
                            $(".portlet-body :input").attr("disabled", true);
                            $("#slcdestino").attr("disabled", false);
                        } else {
                            cargaPersona();
                            cargaPersonaNatural();
                        }
                    }
             
                    $("#txt_oficina").val(datos[0].OFICINA);
                    $("#txt_importe_debitar").val(datos[0].IMPORTE);
                    $("#txt_dc").val(datos[0].DC);                  
                    $("#txt_numero_unico").val(datos[0].NUNICO);



                },
                error: function (msg) {

                    alert(msg);
                }
            });
            
        } else {
            cargaPersona();
            cargaPersonaNatural();
        }
    }

    var plugins = function () {
        $("#slcMoneda").select2();
        $("#cboEstablecimiento").select2();
        
        $("#slcbanco").select2();
        $("#slcEmpresa").select2();
        $("#slcestado").select2();
        $("#txt_nro_cuenta").select2();

        inifechas("txt_fecha_giro", "txt_fecha_vcmto");
        $(".personas").focus(function () { $(this).inputmask({ "mask": "k", "repeat": 150, "greedy": false }); });
        $("#txt_lugar").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 200, "greedy": false }); });
        $("#txt_monto").keypress(function (e) { return (ValidaDecimales(e, this)); });
        $("#txt_importe_debitar").keypress(function (e) { return (ValidaDecimales(e, this)); });       
        $("#txt_oficina").focus(function () { $(this).inputmask({ "mask": "U", "repeat": 100, "greedy": false }); });
        $("#txt_glosa").focus(function () { $(this).inputmask({ "mask": "U", "repeat": 200, "greedy": false }); });
    }

    return {
        init: function () {
            plugins();
            cargaEmpresa();
            funcionalidad();
            cargaInicial();
        }
    };

}();


var GLLLETR = function () {


    var fillCboEmpresa = function () {
        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#cboEmpresa").html(sEmpresa);
        $('#cboEmpresa').select2();
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            complete: function () {

            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var creaTablaVacia = function (tipo) {

        var json = null;
        var parms = {
            data: json,
            columns: [


                { data: "NUMERO" },
                { data: "NEMPRESA" },
                {
                    data: "FECHA_GIRO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "FECHA_VENC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html(rowData.SMONEDA + formatoMiles(cellData));
                    }
                },
                { data: "NGIRADOR" },
                { data: "NGIRADOA" },
                { data: "NAVALISTA" },
                { data: "NBANCO" },
                { data: "NUNICO" },

                {
                    data: "NESTADO_LETRA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CANJ_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        if (cellData === "S") {
                            $(td).html("CANJEADO");
                        } else {
                            if (cellData === "R") {
                                $(td).html("RENOVADO");
                            } else {
                                $(td).html("");
                            }
                        }

                    },
                    align: "center"
                },
                {
                    data: "NDESTINO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

            ],
            "sDom": 'C<"clear">lfrtip',

        }



        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');

        $(".ColVis_Button").addClass("btn blue").css("margin-bottom", "10px");

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
                var url = ObtenerQueryString("f").substring(3);
                window.location.href = '?f=glm' + url + '&codigo=' + codigo + "&tipo=" + tipo;
            }

        });


    }

    var fillTablaLetra = function () {
        var tipo = ObtenerQueryString("f").toLowerCase() == 'gllletr' ? 'P' : 'C';
        var empresa = $('#cboEmpresa').val();
        $.ajax({
            type: "post",
            url: "vistas/gl/ajax/glmletr.ashx?flag=LISTAR&tipo=" + tipo + "&empresa=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos.length > 0)
                    oTable.fnAddData(datos);
                else
                    infoCustom("No se encontraron registros.");
            },
            complete: function () {

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            oTable.fnClearTable();
        });

        $('#btnFiltrar').on('click', function () {
            fillTablaLetra();
        });
    };

    return {
        init: function (tipo) {
            fillCboEmpresa();
            eventos();
            creaTablaVacia(tipo);
        }
    };

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

    var p_codi = $('#hddauxiliar').val();
    var p_tipo = $("input:radio[name=rb_tipo]:checked").val();
    var p_empr = $("#slcEmpresa").val();
    var p_sucursal = $("#cboEstablecimiento").val();
    var p_nume = $("#txt_nro_letra").val();
    var p_regi = $("#txt_ref_girador").val();
    var p_luga = $("#txt_lugar").val();
    var p_fegi = $("#txt_fecha_giro").val();
    var p_feve = $("#txt_fecha_vcmto").val();
    var p_mont = $("#txt_monto").val();
    var p_gira = $("#txt_girador").attr("valor") == undefined ? $("#txt_girador").val("") : $("#txt_girador").attr("valor");
    var p_banc = $("#slcbanco").val();
    var p_giaa = $("#txt_giradoa").attr("valor") == undefined ? $("#txt_giradoa").val("") : $("#txt_giradoa").attr("valor");
    var p_ofic = $("#txt_oficina").val();
    var p_dc = $("#txt_dc").val();
    var p_aval = $("#txt_avalista").attr("valor") == undefined ? 0 : $("#txt_avalista").attr("valor");
    var p_nrcu = $("#txt_nro_cuenta").val();
    var p_esta = $("#slcestado").val();
    var p_dest = $("#slcdestino").val();
    var p_impo = $("#txt_importe_debitar").val() == "" ? 0 : $("#txt_importe_debitar").val();;
    var p_user = $('#ctl00_lblusuario').html();
    var p_firm = $("#txt_firmante").attr("valor") == undefined ? $("#txt_firmante").val("") : $("#txt_firmante").attr("valor");
    var p_mone = $("#slcMoneda").val();
    var p_glos = $("#txt_glosa").val();
    var p_nunico = $("#txt_numero_unico").val();

    $("#txt_dc").removeClass("obligatorio");

    if (!vErrorBodyAnyElement(".obligatorio")) {
        Bloquear("ventana");
        $.post("vistas/GL/ajax/GLMLETR.ASHX", {
            flag: 2,
            codigo: p_codi,
            empresa: p_empr,    
            sucursal: p_sucursal,
            tipo: p_tipo,
            numero: p_nume,
            refgirador: p_regi,
            lugar: p_luga,
            fechagiro: p_fegi,
            fechavcto: p_feve,
            monto: p_mont,
            girador: p_gira,
            giradoa: p_giaa,
            avalista: p_aval,
            banco: p_banc,
            oficina: p_ofic,
            dc: p_dc,
            numerocta: p_nrcu,
            importe: p_impo,
            estado: p_esta,
            usuario: p_user,
            destino: p_dest,
            firmante: p_firm,
            moneda: p_mone,
            glosa: p_glos,
            nunico: p_nunico

        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {

                    if ($("#txt_firmante").attr("valor") == pidmUsua) {

                        Bloquear("ventana");
                        $.post("vistas/GL/ajax/GLMFIRM.ASHX", {
                            flag: 1,
                            codigo: p_codi,
                            usuario: p_user

                        },
                            function (resp) {
                                Desbloquear("ventana");
                                if (resp == "OK") {
                                    $(".portlet-body :input").attr("disabled", true);
                                    $("#slcdestino").attr("disabled", false);
                                    if ($("#slcbanco").val() != "") { $(".datosBanco").attr("disabled", false); }
                                } else {
                                    noexito();
                                }
                            });

                    }




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
    var p_sucursal = $("#cboEstablecimiento").val();
    var p_nume = p_tipo == 'C' ? "AUTO" : $("#txt_nro_letra").val();
    var p_regi = $("#txt_ref_girador").val();
    var p_luga = $("#txt_lugar").val();
    var p_fegi = $("#txt_fecha_giro").val();
    var p_feve = $("#txt_fecha_vcmto").val();
    var p_mont = $("#txt_monto").val();
    var p_gira = $("#txt_girador").attr("valor") == undefined ? $("#txt_girador").val("") : $("#txt_girador").attr("valor");
    var p_banc = $("#slcbanco").val();
    var p_giaa = $("#txt_giradoa").attr("valor") == undefined ? $("#txt_giradoa").val("") : $("#txt_giradoa").attr("valor");
    var p_ofic = $("#txt_oficina").val();
    var p_dc = $("#txt_dc").val();
    var p_aval = $("#txt_avalista").attr("valor") == undefined ? 0 : $("#txt_avalista").attr("valor");
    var p_nrcu = $("#txt_nro_cuenta").val();
    var p_esta = $("#slcestado").val();
    var p_dest = $("#slcdestino").val();
    var p_impo = $("#txt_importe_debitar").val() == "" ? 0 : $("#txt_importe_debitar").val();
    var p_firm = $("#txt_firmante").attr("valor") == undefined ? $("#txt_firmante").val("") : $("#txt_firmante").attr("valor");
    var p_mone = $("#slcMoneda").val();
    var p_glos = $("#txt_glosa").val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_nunico = $("#txt_numero_unico").val();

    $("#txt_dc").removeClass("obligatorio");

    if (!vErrorBodyAnyElement(".obligatorio")) {
        Bloquear("ventana");
        $.post("vistas/GL/ajax/GLMLETR.ASHX", {
            flag: 1,
            empresa: p_empr,
            tipo: p_tipo,
            sucursal: p_sucursal,
            numero: p_nume,
            refgirador: p_regi,
            lugar: p_luga,
            fechagiro: p_fegi,
            fechavcto: p_feve,
            monto: p_mont,
            girador: p_gira,
            giradoa: p_giaa,
            avalista: p_aval,
            banco: p_banc,
            oficina: p_ofic,
            dc: p_dc,
            numerocta: p_nrcu,
            importe: p_impo,
            estado: p_esta,
            usuario: p_user,
            destino: p_dest,
            firmante: p_firm,
            moneda: p_mone,
            glosa: p_glos,
            nunico: p_nunico
        },
            function (res) {
                Desbloquear("ventana");
                if (res != "" && res != null) {

                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");

                    let sCodigo = res;

                    $("#hddauxiliar").val(sCodigo);

                    if ($("#txt_firmante").attr("valor") == pidmUsua) {

                        Bloquear("ventana");
                        $.post("vistas/GL/ajax/GLMFIRM.ASHX", {
                            flag: 1,
                            codigo: sCodigo,
                            usuario: p_user

                        },
                            function (resp) {
                                Desbloquear("ventana");
                                if (resp == "OK") {
                                    $(".portlet-body :input").attr("disabled", true);
                                    $("#slcdestino").attr("disabled", false);
                                    if ($("#slcbanco").val() != "") { $(".datosBanco").attr("disabled", false); }
                                } else {
                                    noexito();
                                }
                            });

                    }

                    let aoLetra = fnListarLetraCorto(sCodigo);
                    if (aoLetra.length === 0) {
                        infoCustom("No se pudo obtener el número de la Letra");
                        return;
                    }
                    let sNumeroLetra = aoLetra[0].NUMERO;
                    $("#txt_nro_letra").val(sNumeroLetra);
                    exito();

                } else {
                    noexito();
                }
            });
    } else {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");

    }
}

function fnListarLetraCorto(sCodigo) {
    let aoLetra = [];
    sCodigo = (sCodigo === undefined ? "" : sCodigo);
    $.ajax({
        type: "post",
        url: "vistas/GL/ajax/GLMLETR.ashx?flag=LLC&codigo=" + sCodigo,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (isEmpty(datos)) {
                return;
            }
            aoLetra = datos;
        }
    });
    return aoLetra;
}
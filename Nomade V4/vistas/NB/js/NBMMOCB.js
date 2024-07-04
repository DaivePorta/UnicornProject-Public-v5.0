var op_op = '<option value="" oficina="">OPERACIONES EN FORMA AUTOMATICA</option>' +
    '<option value="VEN" oficina="(NOMBRE DE OFICINA)">VENTANILLA</option>' +
    '<option value="ATM" oficina="(NOMBRE DEL CAJERO)">CAJERO AUTOMATICO</option>' +
    '<option value="BIE" oficina="BCA. INTERNET">BANCA POR INTERNET EMPRESAS</option>' +
    '<option value="BIN" oficina="BCA. INTERNET">BANCA POR INTERNET PERSONAS NATURALES</option>' +
    '<option value="BIN" oficina="BCA. INTERNET">BANCA POR INTERNET VIP</option>' +
    '<option value="SAX" oficina="(NOMBRE DE OFICINA)">SALDO EXPRESS</option>' +
    '<option value="AGX" oficina="AGTE. EXPRESS">AGENTE EXPRESS</option>' +
    '<option value="BTE" oficina="BCA. TELEFONO">BANCA POR TELEFONO</option>' +
    '<option value="SCA" oficina="BCA. AUTOMATIC.">SISTEMA CASH</option>';

_u_monto = 0;
_CERRADO_IND = "";

var v_nro_operacion_inicial;
var v_monto_inicial; // para movimiento POS
var v_iItf = 0;
var v_rpos = 0;
var movimientoNoIdentificado;
var cargaTerminada = false;
var nuevoMovimiento = true;

var NBLMOCB = function () {

    $("#nvoMov").click(function () {

        var empresa = $("#slcEmpr").val();
        var cta = $("#slcCta").val();

        window.location.href = '?f=NBMMOCB' + (empresa != "" ? ("&emp=" + empresa) : "") + (cta != "" ? ("&cta=" + cta) : "");

    });

    var cargarCombos = function () {

        $("#slcEmpr, #slcCta, #slcMoneda").select2();

        $.ajaxSetup({ async: false });
        $.post("vistas/NB/ajax/NBMMOCB.ASHX", { flag: 7, empresa: $("#slcEmpr").val() },

            function (res) {

                $("#slcMoneda").html(res);


            });

        $.ajaxSetup({ async: true });

        $.ajaxSetup({ async: false });
        $.post("vistas/NB/ajax/NBMMOCB.ASHX", { flag: 5 },

            function (res) {

                $("#slcEmpr").html(res);
                $("#slcEmpr").change(function () {

                    $("#nroRUC").val($("#slcEmpr :selected").attr("RUC"));

                    $.ajaxSetup({ async: false });
                    $.post("vistas/NB/ajax/NBMMOCB.ASHX", { flag: 6, empresapidm: $("#slcEmpr :selected").attr("pidm") },

                        function (resp) {

                            if (resp != "error") {

                                $("#slcCta").html(resp).change(function () {

                                    $("#slcMoneda").val($("#slcCta :selected").attr("moneda")).change();

                                });
                            } else {
                                $("#slcCta").html("<option></option>").change();
                            }

                        });
                    $.ajaxSetup({ async: true });

                });

            });
        $.ajaxSetup({ async: true });
    }

    var funcionalidad = function () {

        $("#btnfiltrar").click(function () {

            if (!vErrorBodyAnyElement(".obligatorio")) {
                Bloquear("ventana")
                $.ajaxSetup({ async: false });
                $.post("vistas/NB/ajax/NBMMOCB.ASHX", {
                    flag: 3,
                    empresapidm: $("#slcEmpr :selected").attr("pidm"),
                    mes: ($("#optmes").datepicker('getDate').getMonth() + 1).toString().length == 1 ? "0" + ($("#optmes").datepicker('getDate').getMonth() + 1).toString() : ($("#optmes").datepicker('getDate').getMonth() + 1).toString(),
                    anho: $('#optanho').val(),
                    cuenta: $("#slcCta").val()
                },

                    function (res) {
                        Desbloquear("ventana")
                        if (res != "" && res.indexOf("error") < 0) {
                            _CERRADO_IND = res.split("|")[1];
                            $.post("vistas/NB/ajax/NBMMOCB.ASHX", {
                                flag: 4.5,
                                codigo: res.split("|")[0]
                            }, function (data) {

                                var json = $.parseJSON(data);
                                //$("#divDetalle").removeAttr("style");
                                Cargar_tabla(json);

                            });

                        } else {
                            limpiarData();
                            alertCustom("Cuenta no aperturada con ningun saldo ni movimientos!");
                        }

                    });

                $.ajaxSetup({ async: true });

                //if (_CERRADO_IND == "SI") {
                //    $('#tblBandeja').removeClass("DTTT_selectable");
                //    $('#tblBandeja tbody').off('click', 'tr');
                //} else {
                $('#tblBandeja').addClass("DTTT_selectable");
                $('#tblBandeja tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        oTable.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');

                        var pos = oTable.fnGetPosition(this);
                        var row = oTable.fnGetData(pos);

                        var codigo = row.CODIGO
                        window.location.href = '?f=NBMMOCB&codigo=' + codigo;
                    }
                });
            }
        });
    }

    var plugins = function () {

        $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () { return false; }).datepicker("setDate", new Date());

        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });

    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var fillTabla = function () {

        var parms = {
            data: null,
            columns: [
                {
                    data: { _: "FECHA_OPERACION.display", sort: parseInt("FECHA_OPERACION.order") },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.TIPO_REG == "M" || rowData.TIPO_REG == "C") {
                            $(td).parent('tr').attr("style", "background-color:#FCF7D7;");
                        }
                    },
                },
                {
                    data: { _: "FECHA_VALOR.display", sort: parseInt("FECHA_VALOR.order") },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "DESCRIPCION" },
                { data: "OFICINA" },
                { data: "CANAL" },
                {
                    data: "NRO_OPERACION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right');
                        if (rowData.COMPLETO_IND == "N") {
                            $(td).parent('tr').attr("style", "background-color:#F2BCC7;");
                        }
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right');
                        if (cellData != "") {
                            $(td).html(formatoMiles(cellData) + (rowData.TIPO == "I" ? "&nbsp;&nbsp;" : " -"));
                        }
                    }
                },
                {
                    data: "MONTO_ITF",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right');
                    }
                },
                {
                    data: "SALDO_CONTABLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right');
                        $(td).html(formatoMiles(cellData));

                    }
                },


            ],
            stateSave: false,
            "sDom": 'TC<"clear">lfrtip',
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
                        "sButtonText": "Exportar a Excel"
                    }
                ]
            },
            stateSave: false,
            sort: false,
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var x = new Array();
                var y = new Array();
                api.data().filter(function (e) {
                    if (e.TIPO == "I") { if (e.MONTO_ITF == "") { e.MONTO_ITF = 0.00; } x.push(parseFloat(e.MONTO_ITF)); }
                    else { if (e.MONTO_ITF == "") { e.MONTO_ITF = 0.00; } y.push(parseFloat(e.MONTO_ITF)); }
                });
                if (y.length > 0) {
                    $("#lblcargos").html(formatoMiles(y.reduce(function (a, b) { return a + b; })));
                }
                if (x.length > 0) {
                    $("#lblabonos").html(formatoMiles(x.reduce(function (a, b) { return a + b; })));
                }

                if (api.data().length > 0) {
                    var apiaux = this.api().data().pop();


                    $("#lblSaldoContable").html(formatoMiles(apiaux.SALDO_CONTABLE));

                    $("#lblSaldoDisponible").html(formatoMiles(apiaux.SALDO_DISPONIBLE));



                }


            },
            sDom: 'TC<"clear">lfrtip'

        }



        oTable = iniciaTabla('tblBandeja', parms);
        actualizarEstilos();
        //  $('#tblBandeja').removeAttr('style').css("border-collapse", "collapse");

    }

    return {
        init: function () {
            fillTabla();
            funcionalidad();
            cargarCombos();
            plugins();
            var emp = ObtenerQueryString("emp");
            var cta = ObtenerQueryString("cta");

            if (emp != undefined && cta != undefined) {
                $("#slcEmpr").select2("val", emp).change();
                $("#slcCta").select2("val", cta).change();
                $("#btnfiltrar").click();
            }

        }
    }
}();

function Cargar_tabla(data) {
    var json = data;

    oTable.fnClearTable()

    if (json != null) { oTable.fnAddData(json); }
}

function limpiarData() {
    oTable.fnClearTable();
    $("#lblcargos, #lblabonos, #lblSaldoContable, #lblSaldoDisponible").html("0.00");
}

function Confirmacion() {
    var imagen_Interrogacion = "data:image/png;base64,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";
    var ncaja = $("#slcCaja :selected").html().split(" - ")[0];
    var nmonto = smoneda + formatoMiles($("#txtMonto").val());
    $("#mensajeModal").html(
        "<div class='row-fluid'>" +
        "<div class='span2'>" +
        "<img src='" + imagen_Interrogacion + "'+></img>" +
        "</div>" +
        "<div class='span10'>" +
        "<div class='row-fluid'>" +
        "<div class='span12'>" +
        "Está a punto de crear un nuevo movimiento en la caja \"" + ncaja + "\" por el monto de " + nmonto + ". Desea Continuar?" +
        "</div>" +
        "</div></div></div>");

    $("#modalconfir").modal('show');
}

var NBMMOCB = function () {

    $("#listMov").click(function () {
        var empresa = $("#slcEmpr").val();
        var cta = $("#slcCta").val();

        window.location.href = '?f=NBLMOCB' + (empresa != "" ? ("&emp=" + empresa) : "") + (cta != "" ? ("&cta=" + cta) : "");
    });

    var funcionalidad = function () {
        $("#txtMonto").change(function () {
            if (parseFloat($(this).val() == "" ? 0 : $(this).val().split(",").join("")) > _u_monto && $("#slcTipo").val() == "E") {
                $(this).val("");
                alertCustom("El monto excede al saldo disponible en la cuenta");
            }
        });

        $("#slcTipo").change(function () {
            if ($(this).val() == "I") {
                $("#txtMonto").val("").attr("placeholder", "");
            } else {
                _u_monto = (parseFloat($("#slcCta :selected").attr("monto")) - parseFloat((parseInt($("#slcCta :selected").attr("monto") / 1000) * v_iItf).toFixed(2)));
                $("#txtMonto").val("").attr("placeholder", "max. " + _u_monto);
            }

            $("#txtMonto").change();
        });
    }

    var plugins = function () {

        $("#txtMonto")
            .keypress(function (e) { return (ValidaDecimales(e, this)); })
            .blur(function () { $(this).val(formatoMiles($(this).val().split(",").join(""))); });

        // $("#txtFeOp, #txtFeVa").datepicker();
        //var date = new Date();
        // $("#txtFeOp").datepicker('setStartDate', '01-' + ("00" + (date.getMonth() + 1).toString()).slice(-2) + '-' + date.getFullYear());
        $("#txtFeOp").datepicker();
        inifechas("txtFeOp", "txtFeVa");

    }

    var cargarCombos = function () {

        $("#slcEmpr, #slcCta, #slcMoneda, #slcTipo, #slcOperacion, slcEstereotipo").select2();

        $("#slcOperacion").prop("disabled", true);

        $('#divInfoTicket').hide()

        operacionEstereotipo = {
            '1': 'CLIEN', // Anticipo por compensar
            '2': 'BANC', // Mantenimiento de cuenta (Solo id de la cuenta seleccionada)
            '3': 'PERS', // Prestamo de terceros
            '4': 'EMPL', // Prestamo de titular
            '5': 'PERS', // Dinero por Encargo (Solo opera con un id)
            '6': 'PERS', // POS (Solo id asociado al POS) (No seleccionable)
            '7': 'CLIEN', // Abonos bancarios no identificados
            '8': 'EMPL', // Gastos personales de asociados
            '9': 'PROV', // Pagos bancarios no identificados
            '10': 'PROV' // Nota de credito a proveedor 
        };

        $("#slcOperacionEfectuada").html(op_op).select2().change(function () {
            $("#txtCanal").val($(this).val());
            var n_of = $("#slcOperacionEfectuada :selected").attr("oficina");
            if (n_of == "") {
                $("#txtOficina")
                    .val(n_of).attr("disabled", true)
                    .attr("placeholder", n_of)
                    .removeClass("obligatorio");
            } else {

                if (n_of.substring(0, 1) == "(") {
                    $("#txtOficina").val("").attr("placeholder", n_of).attr("disabled", false).addClass("obligatorio");
                } else {
                    $("#txtOficina").val(n_of).attr("disabled", true);
                }
            }
        });

        $("#slcOperacion").on("change", function () {
            if (!cargaTerminada) ajustesSecundariosTipoOperacion($("#slcOperacion").val());
        });

        $("#slcCta").on("change", function () {
            if ($("#slcOperacion").val() === '2') {
                var pidm = $("#slcCta :selected").attr("pidm_banco");
                selectedClient = persona.find(client => client.PIDM == pidm);

                if (selectedClient) {
                    $("#slcPersona").val(selectedClient.RAZON_SOCIAL);
                    $("#hfPIDM").val(selectedClient.PIDM);
                } else {
                    $("#slcPersona").val('');
                    $("#hfPIDM").val('');
                }
            };
        });

        $("#btnRecargarPersona").on("click", function () {
            $("#hfPIDM").val("");
            var operacion = $("#slcOperacion").val();
            estereotipo = operacionEstereotipo[operacion];

            //Resetear html
            var originalHtml = $('#inputPersona').html();
            $('#inputPersona').empty().html(originalHtml);

            //Establecer el valor del estereotipo
            if (estereotipo) {
                $("#slcEstereotipo").val(estereotipo);
            }

            fillPersona("#slcPersona", "", estereotipo);
            $("#slcPersona").val("").keyup();
        });

        $("#slcTipo").on("change", function () {
            resetearCampos();
            var tipoOperacion = $("#slcTipo").val();
            if (tipoOperacion) {
                filtrarTipoOperacion(tipoOperacion);
            }
        });

        $('#chkTodos').click(function () {
            var checked = $(this).prop('checked');
            $('.chkDocument').prop('checked', checked);
            if (checked) {
                $('.chkDocument').closest('tr').addClass('seleccionado');
            } else {
                $('.chkDocument').closest('tr').removeClass('seleccionado');
            }
        });

        $('#tblTicket').on('click', '.chkDocument', function () {
            if ($(this).prop('checked')) {
                $(this).closest('tr').addClass('seleccionado');
            } else {
                $(this).closest('tr').removeClass('seleccionado');
            }
        });

        $.ajaxSetup({ async: false });
        $.post("vistas/NB/ajax/NBMMOCB.ASHX", { flag: 5 },

            function (res) {

                $("#slcEmpr").html(res);
                $("#slcEmpr").change(function () {

                    $.ajaxSetup({ async: false });
                    $.post("vistas/NB/ajax/NBMMOCB.ASHX", { flag: 6, empresapidm: $("#slcEmpr :selected").attr("pidm") },

                        function (resp) {

                            $("#slcCta").html(resp).change(function () {

                                var mone_code = $("#slcCta :selected").attr("moneda");
                                _u_monto = (parseFloat($("#slcCta :selected").attr("monto")) - parseFloat((parseInt($("#slcCta :selected").attr("monto") / 1000) * v_iItf).toFixed(2)));
                                $("#txtMonto").val("").attr("placeholder", "max. " + _u_monto);

                                $.post("vistas/NB/ajax/NBMMOCB.ASHX", { flag: "M", codigo: mone_code },
                                    function (resp) {
                                        smoneda = resp;
                                        $("#lblmonto").html("Monto (" + resp + ")");
                                    });
                            });

                        });
                    $.ajaxSetup({ async: true });

                    cargarJsonEmpleado($(this).val());

                    arrayPersonasEmpleado = new Array();

                    var jsonEmpleado = jQuery.parseJSON(jsonPersonasEmpleado);
                    if (jsonEmpleado != null) {
                        jsonEmpleado.filter(function (e) { if (arrayPersonasEmpleado.indexOf(e.NOMBRE) < 0) { arrayPersonasEmpleado.push(e.NOMBRE); } });
                    }

                    offObjectEvents("slcResp");

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
                });
            });
        $.ajaxSetup({ async: true });
    }

    var cargainicial = function () {

        v_iItf = parseFloat(mGetParametro("ITF", "ITF CONSIDERADO EN OPERACIONES BANCARIAS"));
        v_rpos = parseFloat(mGetParametro("RPOS", "RPOS RANGO DE POS") / 100);

        var cod = ObtenerQueryString("codigo");
        var emp = ObtenerQueryString("emp");
        var cta = ObtenerQueryString("cta");

        // Indicador para saber si se trata de un nuevo movimiento o si se esta cargando un mov. existente
        if (cod != undefined) {
            nuevoMovimiento = false; // Necesario para el comportamiento de la tabla de tickets
        } else {
            nuevoMovimiento = true;
        }

        if (emp != undefined && cta != undefined) {
            $("#slcEmpr").select2("val", emp).change().attr("disabled", true);
            $("#slcCta").select2("val", cta).change().attr("disabled", true);
        }

        if (cod != null) {
            $(".RCaja").addClass("hide");
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:actualizarMovimiento();");

            $.ajax({
                type: "POST",
                url: "vistas/NB/ajax/NBMMOCB.ASHX?flag=L&codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    //Establecer datos
                    $("#hddauxiliar").val(datos[0].CODIGO);
                    $("#slcOperacionEfectuada").select2("val", datos[0].CANAL.toUpperCase());
                    $("#slcEmpr").select2("val", $("#slcEmpr [pidm=" + datos[0].PIDM + "]").val());
                    $("#slcCta").select2("val", datos[0].CTA_CODE).change();
                    $("#txtOficina").val(datos[0].OFICINA);
                    $("#txtDescripcion").val(datos[0].DESCRIPCION);
                    $("#txtCanal").val(datos[0].CANAL);
                    $("#txtFeOp").val(datos[0].FECHA_OPERACION);
                    $("#txtFeVa").val(datos[0].FECHA_VALOR);
                    if ($("#txtFeVa").val() != "") { $("#txtFeVa").attr("disabled", true); }
                    $("#txtNroOpe").val(datos[0].NRO_OPERACION);
                    v_nro_operacion_inicial = $("#txtNroOpe").val();
                    $("#slcTipo").select2("val", datos[0].TIPO);

                    $("#slcCta").prop("disabled", true);
                    $("#slcTipo").prop("disabled", true);

                    //Seleccionar tipo operacion
                    movimientoNoIdentificado = datos[0].CODIGO_OPERACION === '7';
                    if (datos[0].CODIGO_OPERACION !== undefined && datos[0].CODIGO_OPERACION !== '') {
                        filtrarTipoOperacion(datos[0].TIPO, datos[0].CODIGO_OPERACION);
                    } else {
                        $("#slcOperacion").empty().val('');
                    }
                    $("#slcOperacion").select2();

                    //Para Abonos y Pagos bancarios no identificados
                    var slcOperacion = $("#slcOperacion").val(); 
                    var deshabilitar = !(slcOperacion === '7'); 
                    $("#slcOperacion").prop("disabled", deshabilitar); 

                    //Seleccionar el estereotipo
                    estereotipo = operacionEstereotipo[$("#slcOperacion").val()];
                    if (estereotipo) {
                        $("#slcEstereotipo").val(estereotipo);
                    }

                    //Seleccionar persona
                    $("#hfPIDM").val(datos[0].PERSONA)

                    var selectedClient = persona.find(function (client) {
                        return client.PIDM == $("#hfPIDM").val();
                    });

                    if (selectedClient) {
                        $("#slcPersona").val(selectedClient.RAZON_SOCIAL);
                    }

                    //Establecer otros
                    if (datos[0].TIPO == "E") {
                        _u_monto += parseFloat((parseFloat(datos[0].MONTO) + parseFloat(datos[0].MONTO_ITF)).toFixed(2));
                        $("#txtMonto").attr("placeholder", "max." + _u_monto);
                    }

                    if (datos[0].TIPO_REG != "M" && datos[0].TIPO_REG != "C" && datos[0].CODIGO_OPERACION != '6' && datos[0].CODIGO_OPERACION != '10') {
                        $(".bl").attr("disabled", true);

                        $("#slcPersona, #txtDescripcion, #txtMonto").html('').prop("disabled", true);
                        $("#hfPIDM").val(""); //Los movimientos automaticos no tienen un PIDM cliente asociado
                        //Con esto el cliente sera mostrado de manera visual, pero no hará cambios en la BD incluso si se utiliza la opcion modificar
                    } else {
                        if (datos[0].TIPO_REG == "C") {
                            $(".RCaja").removeClass("hide");
                            $("#chkRCaja").click().click();
                            setTimeout(function () {
                                $("#slcCaja").val(datos[0].CAJA_CODE).change();
                                $("#slcResp").val(datos[0].RESPONSABLE)

                                setTimeout(function () {
                                    $("#ventana input, #ventana select").attr("disabled", true);
                                }, 100);

                            }, 500);
                        }
                    }

                    setTimeout(function () {
                        $("#txtMonto").val(datos[0].MONTO);
                        v_monto_inicial = $("#txtMonto").val();
                    }, 550);

                    cargaTerminada = true;
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    }

    return {
        init: function () {
            crearTablaVaciaTicket();
            plugins();
            cargarCombos();
            funcionalidad();
            cargainicial();
        }
    }
}();

$("#txtMonto").on('change', function () {
    if ($("#slcOperacion").val() === '6') { //Cierra el rango de variabilidad del monto
        var montoNuevo = parseFloat($(this).val().replace(/,/g, ''));
        var adjustedValue = rangoPOS(montoNuevo, v_monto_inicial);
        $(this).val(adjustedValue);
    }
});

//Solo para POS, se permitirá redondear el monto bajo cierto rango
function rangoPOS(montoNuevo, montoInicial) {
    montoNuevo = parseFloat(montoNuevo);

    var valorMax = montoInicial * (1 + v_rpos);
    var valorMin = montoInicial * (1 - v_rpos);

    console.log("monto inicial:" + montoInicial);
    console.log("monto nuevo:" + montoNuevo);
    console.log("monto maximo:" + valorMax);
    console.log("monto minimo:" + valorMin);

    if (montoNuevo > valorMax) {
        return valorMax.toFixed(2);
    } else if (montoNuevo < valorMin || isNaN(montoNuevo)) {
        return valorMin.toFixed(2);
    } else {
        return montoNuevo.toFixed(2);
    }
}

//Funcion para verificar que el nro de operacion no sea repetido
function verificarNroOperacion(nroOpera) {
    var nroOperacionCodificado = encodeURIComponent("B-" + nroOpera + "/-/-"); //encodeURIComponent en caso se utilicen caracteres especiales
    console.log(nroOperacionCodificado);
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=4.5&p_NRO_OPERA=" + nroOperacionCodificado,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos == 'OK') {
                respuesta = datos;
            } else {
                respuesta = datos;
            };
        },
        error: function (msg) {
            alertCustom("Error");
        }
    });
    return respuesta;
}

//Funcion para verificar que un anticipo por compensar sea modificable
function verificarModificacionOperacion(nroOpera) {
    var nroOperacionCodificado = encodeURIComponent(nroOpera);
    var res;
    $.ajax({
        type: "post",
        url: "vistas/NV/ajax/NVMANTI.ashx?OPCION=VERIFICAR_OPERACION&p_NRO_OPERA=" + nroOperacionCodificado,
        contenttype: "application/json;",
        datatype: "text",
        async: false,
        success: function (datos) {
            if (datos === '0') {
                res = true;
            } else {
                res = false;
            }
        },
        error: function (msg) {
            alertCustom("Error");
        }
    });

    return res;
};

//Tipo de operacion que estará disponible dependiendo si es Abono o Cargo
function filtrarTipoOperacion(tipoOperacion, valorOperacion) {
    $("#slcOperacion").empty();

    var options = {
        "I": [
            { value: "1", dataValue: "12.2.1.1.12", text: "ANTICIPO POR COMPENSAR - 12.2.1.1.12" },
            { value: "3", dataValue: "45.1.2.1.11", text: "PRESTAMO DE TERCEROS - 45.1.2.1.11" },
            { value: "4", dataValue: "45.1.2.1.12", text: "PRESTAMO DE TITULAR - 45.1.2.1.12" },
            { value: "6", dataValue: "42.2.1.1.11", text: "CIERRE DE LOTE POS - 42.2.1.1.11", condition: () => nuevoMovimiento == false },
            { value: "7", dataValue: "46.1.1.1.19", text: "ABONOS BANCARIOS NO IDENTIFICADOS - 46.1.1.1.19" },
            { value: "10", dataValue: "46.1.1.1.19", text: "NOTA DE CREDITO A PROVEEDOR - 46.1.1.1.19", condition: () => nuevoMovimiento == false }
        ],
        "E": [
            { value: "2", dataValue: "94.3.9.1.13", text: "MANTENIMIENTO CUENTA - 94.3.9.1.13" },
            { value: "3", dataValue: "45.1.2.1.11", text: "PRESTAMO DE TERCEROS  - 45.1.2.1.11" },
            { value: "4", dataValue: "45.1.2.1.12", text: "PRESTAMO DE TITULAR - 45.1.2.1.12" },
            { value: "5", dataValue: "10.3.1.1.11", text: "PAGAR DINERO POR ENCARGO - 10.3.1.1.11" },
            { value: "8", dataValue: "14.9.1.1.11", text: "GASTOS PERSONALES DE ASOCIADOS - 14.9.1.1.11" },
            { value: "9", dataValue: "16.9.1.1.11", text: "PAGOS BANCARIOS NO IDENTIFICADOS - 16.9.1.1.11" }
        ]
    };

    if (movimientoNoIdentificado) options["I"] = options["I"].filter(opt => opt.value === "1" || opt.value === "7");

    var filteredOptions = options[tipoOperacion].filter(opt => opt.condition === undefined || opt.condition());

    var filtered_op = filteredOptions.map(opt => `<option value="${opt.value}" data-value="${opt.dataValue}">${opt.text}</option>`).join('');

    $("#slcOperacion").html(filtered_op).prop("disabled", false).select2();

    ajustesSecundariosTipoOperacion(valorOperacion);
}



//Ajustes necesarios dependiendo del tipo de operacion
function ajustesSecundariosTipoOperacion(valorOperacion) {
    var estereotipo, pidm, selectedClient;

    if (valorOperacion && valorOperacion !== '') {
        $("#slcOperacion").val(valorOperacion);
        resetearCampos(); 
    }

    var operacion = $("#slcOperacion").val();
    estereotipo = operacionEstereotipo[operacion];

    //Resetear html
    var originalHtml = $('#inputPersona').html();
    $('#inputPersona').empty().html(originalHtml);

    //Establecer el valor del estereotipo
    if (estereotipo) {
        $("#slcEstereotipo").val(estereotipo);
    }

    //Traer personas
    if (operacion === '5') {
        pidm = '12330';
    } else {
        pidm = $("#hfPIDM").val();
    }

    fillPersona('#slcPersona', pidm, estereotipo);

    switch (operacion) {
        case '2': //Mantenimiento de cuenta
            $('#btnNuevaPersona, #btnNuevoClienteRapido, #btnRecargarPersona').hide();
            pidm = $("#slcCta :selected").attr("pidm_banco");
            $("#slcPersona").html('').prop("disabled", true);
            selectedClient = persona.find(client => client.PIDM == pidm);
            if (selectedClient) {
                $("#slcPersona").val(selectedClient.RAZON_SOCIAL);
                $("#hfPIDM").val(selectedClient.PIDM);
            }
            break;

        case '5':
            var cod = ObtenerQueryString("codigo");
            pidm = '12330';
            selectedClient = persona.find(client => client.PIDM == pidm);

            if (selectedClient) {
                $("#slcPersona").val(selectedClient.RAZON_SOCIAL);
                $("#hfPIDM").val(selectedClient.PIDM);
            }

            if (nuevoMovimiento) {  //Dinero por Encargo 
                $('#btnNuevaPersona, #btnNuevoClienteRapido, #btnRecargarPersona').hide();
                $("#slcPersona, #txtMonto").html('').prop("disabled", true);
                $("#txtMonto").val("");
                $('#btnBuscarTicket').show();
                btnBuscarTicket.click();
            } else {
                $("#slcPersona, #txtMonto, #txtNroOpe").html('').prop("disabled", true);
                cargarTickets(cod);
            }

            break;

        case '6': //POS
            $("#slcPersona, #slcPersona, #txtNroOpe, #txtDescripcion").html('').prop("disabled", true);
            $('#btnNuevaPersona, #btnNuevoClienteRapido, #btnRecargarPersona').hide();
            break;

        case '10': //NOTA DE CREDITO
            $(".bl").attr("disabled", true);
            $("#slcPersona, #slcPersona, #txtMonto, #txtDescripcion, #slcOperacionEfectuada").html('').prop("disabled", true);
            $('#btnNuevaPersona, #btnNuevoClienteRapido, #btnRecargarPersona').hide();
            break;

        default: // Otras operaciones
            if (nuevoMovimiento) {
                $('#btnNuevaPersona, #btnRecargarPersona').show();
                $("#slcPersona").removeAttr("disabled");

                estereotipo == 'CLIEN' ? $("#btnNuevoClienteRapido").show() : $("#btnNuevoClienteRapido").hide(); 

                // PIDM por defecto. Empleados y Proveedores no tienen PIDM 1
                if (estereotipo !== 'EMPL' && estereotipo !== 'PROV') {
                    pidm = '1';
                    selectedClient = persona.find(client => client.PIDM == pidm);
                    $("#hfPIDM").val(selectedClient.PIDM);
                    console.log($("#hfPIDM").val());
                }
            } else {
                $('#btnNuevaPersona, #btnNuevoClienteRapido, #btnRecargarPersona').show();
                $("#slcPersona").removeAttr("disabled");
            }
            break;
    }
}

function resetearCampos() {
    $("#btnBuscarTicket").hide();
    $("#divInfoTicket").hide()
    $("#hfPIDM").val("");
    $("#slcPersona").val("");
    $("#slcPersona").prop("disabled", false);
    $("#txtMonto").prop("disabled", false);
}

$.ajaxSetup({ async: false });

$("#chkRCaja").click(function () {

    $("#slcResp,#slcCaja").attr("disabled", true);

    if ($(this).is(":checked")) {
        $("#divRCaja").slideDown();

        $("#slcTipo").val("E").change()
            .attr("disabled", true);

        $("#slcCaja, #slcResp").addClass("obligatorio");
        // $.ajaxSetup({ async: false });
        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 7, empresa: $("#slcEmpr").val(), usua_id: $("#ctl00_txtus").val() },
            function (res) {
                if (res != null && res != "" && res.indexOf("error") < 0) {

                    $("#slcCaja").html(res).select2().attr("disabled", false);
                    $("#slcCaja,#slcResp").attr("disabled", false);

                    if ($("#slcCaja option").length > 1) {
                        $("#slcCaja").select2("val", $($("#slcCaja option")[1]).val()).change();
                    }

                } else {

                    $("#slcCaja").html("").attr("disabled", true);

                }
            });
        //$.ajaxSetup({ async: true });


    } else {
        $("#slcCaja, #slcResp").removeClass("obligatorio");
        // $("#divCheque").css("display","none");
        if ($("#chkChqPag").is(":checked")) {

            $("#chkChqPag").click().click();
            $("#chkChqPag").attr("checked", false);
        }
        $("#divRCaja").slideUp();
        $("#slcTipo").val("").change()
            .attr("disabled", false);

    }

});

$("#chkChqPag").click(function () {

    if ($(this).is(":checked")) {

        $("#slcResp").val("").attr("disabled", true);
        $("#slcResp").removeClass("obligatorio");

        $("#txtDescripcion").val("CHEQUE PAGADOR N°:");
        $("#slcOperacionEfectuada").val("VEN").change();
        $("#slcOperacionEfectuada,#txtDescripcion,#txtMonto").attr("disabled", true);
        $("#slcChq").addClass("obligatorio");
        $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 8, cuenta: $("#slcCta").val(), pidmcuenta: $("#slcEmpr :selected").attr("pidm") },
            function (res) {
                if (res != null && res != "" && res.indexOf("error") < 0) {
                    $("#slcChq").html(res).select2().change(function () {

                        $("#txtMonto")
                            .val($("#slcChq :selected").attr("monto"))
                            .change();

                        $("#txtDescripcion").val("CHEQUE PAGADOR N°:" + $(this).val());
                        $("#lblGiradoA").html($("#slcChq :selected").attr("ngiradoa"));
                    }

                    );
                } else {
                    $("#slcChq").html("<option></option>").select2();

                }

            });
        $.ajaxSetup({ async: true });

        $("#divCheque").slideDown();
    } else {
        $("#slcChq").removeClass("obligatorio");
        $("#divCheque").slideUp();
        $("#slcOperacionEfectuada,#txtDescripcion,#txtMonto").attr("disabled", false);
        $("#txtDescripcion").val("");
        $("#lblGiradoA").html("");
        $("#slcResp").attr("disabled", false);

    }

});

function fillPersona(v_ID, v_value, v_estereotipo) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/cc/ajax/cclrfva.ashx?OPCION=2.7&p_CTLG_CODE=" + $("#slcEmpr").val() + "&p_PERS_PIDM=" + v_value + "&p_ESTEREOTIPO=" + v_estereotipo,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                persona = datos;
                var map = {};

                selectRazonSocial.typeahead({
                    source: function (query, process) {
                        var arrayRazonSocial = [];

                        datos.forEach(function (objeto) {
                            arrayRazonSocial.push(objeto.RAZON_SOCIAL);
                            map[objeto.RAZON_SOCIAL] = objeto;
                        });

                        process(arrayRazonSocial);
                    },
                    updater: function (item) {
                        if (item) {
                            $("#hfPIDM").val(map[item].PIDM);
                            $("#hfCODTIPODOC").val(map[item].TIPO_DOCUMENTO);
                            $("#hfNRODOCCLIENTE").val(map[item].NRO_DOCUMENTO);
                            $("#slcPersona").val(map[item].RAZON_SOCIAL);
                            $("#hfESTADO").val(map[item].ESTADO);
                        } else {
                            $("#hfPIDM").val("1");
                        }
                        return item;
                    },
                });

                let previousValue = selectRazonSocial.val();
                selectRazonSocial.on('change', function () {
                    let currentValue = $(this).val();
                    if (currentValue === previousValue) return; // Skip if value hasn't changed
                    previousValue = currentValue;
                    if ($("#slcEstereotipo").val() === "CLIEN" || $("#slcEstereotipo").val() === "PERS") {
                        if (!$(this).val()) {
                            $("#hfPIDM").val("1");
                        }
                    } else {
                        if (!$(this).val()) {
                            $("#hfPIDM").val("");
                        }
                    }
                });

            } else {
                persona = [];
            }

            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function NuevoClienteRapido() {
    var tp, td, d;
    var continuar = false;
    personaSeleccionada = {};

    if ($("#hfNRODOCCLIENTE").val() != undefined && $("#hfCODTIPODOC") != undefined && vErrorsNotMessage(['slcPersona'])) {
        continuar = true;
        td = $("#hfCODTIPODOC").val();
        d = $("#hfNRODOCCLIENTE").val();
    }

    if (continuar) {
        if (td == "6") {//JURIDICA         
            if (d.length == 11) {
                if (d.toString().substring(0, 1) == "1") {
                    //PERSONA NATURAL CON RUC    
                    tp = "N";
                    window.open("?f=NKMGECL&tp=" + tp + "&td=" + td + "&d=" + d + "", "_blank");
                } else {
                    //PERSONA JURÍDICA  
                    tp = "J";
                    window.open("?f=NCMCLIR&tp=" + tp + "&td=" + td + "&d=" + d + "&ctlg=" + $("#slcEmpr").val() + "", "_blank");
                }
            } else {
                alertCustom("Ingrese un número de documento válido");
            }
        } else {//PERSONA NATURAL
            tp = "N";
            window.open("?f=NCMCLIR&tp=" + tp + "&td=" + td + "&d=" + d + "&ctlg=" + $("#slcEmpr").val() + "", "_blank");
        }
    }
}

//Funcion para confirmar que la persona seleccionada pueda emitir anticipos
function confirmarClienteAnticipo() {
    var continuar = false;
    var pidmSeleccionado = $("#hfPIDM").val();
    console.log($("#slcOperacion").val());
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2.5&CTLG_CODE=" + $("#slcEmpr").val(),
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                continuar = datos.some(function (pidm) {
                    return pidm.PIDM === pidmSeleccionado;
                });
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
    return continuar;
}

function cargarJsonEmpleado(empresa) {
    $.ajax({
        type: "post",
        url: "vistas/GL/ajax/GLMLETR.ashx?flag=LE-2&empresa=" + empresa,
        contenttype: "application/json;",
        datatype: "json",
        async: false,

        success: function (datos) {
            if (datos != null && datos != "") {

                jsonPersonasEmpleado = datos;

            } else {
                jsonPersonasEmpleado = "";
            }
        }
    });
}

flgRCaja = false;

$("#rptasi").click(function () {

    ejecutaMovimiento();
    $("#modalconfir").modal("hide");
    flgRCaja = true;

});

var ticketsAgregados = [];
var totalMontoAplicado = 0;

//Funcion del boton buscar tickets, disponible solo en dinero por encargo o slcOperacion = '5' al crearse un nuevo movimiento
$('#btnBuscarTicket').click(function (e) {
    buscarTicket();
    $('#divBuscarTicket').modal('show');
});

//Función para actualizar el monto total en caso de dinero por encargo
//El monto es determinado por la suma de los tickets agregados por el usuario
function actualizarMontoTotal() {
    totalMontoAplicado = ticketsAgregados.reduce((acc, ticket) => {
        var cantidad = parseFloat(ticket.MONTO_APLICADO.match(/\d+(\.\d+)?/)[0]);
        return acc + cantidad;
    }, 0);
    $('#txtMonto').val(totalMontoAplicado.toFixed(2));
}

var lcodVenta = "";

//Funcion para actualizar la tabla principal. Solo se efectua al crear un nuevo movimiento.
function actualizarListaTicket(ticketID, agregarTicket) {
    //agregarTicket va a determinar si se agrega o se elimina el ticket (ticketID) seleccionado
    //Siempre será falso con el botón eliminar fila de la tabla principal, pero puede ser true/false si se manipulan los checks
    if (agregarTicket) {
        var datosTicket = $('#tblTicket tbody tr').filter(function () {
            return $(this).find('td').eq(1).text() === ticketID;
        }).data('ticket');

        ticketsAgregados.push(datosTicket);
    } else {
        ticketsAgregados = ticketsAgregados.filter(item => item.TICKET !== ticketID);
    }

    //Se actualiza el monto para reflejar los cambios realizados
    actualizarMontoTotal();

    //Se concatena los codigos de venta de los documentos seleccionados a la variable lcodVenta
    //Debe actualizarse para reflejar los cambios en la tabla principal en caso se agregen o eliminen documentos (tickets)
    var listaCodVentaTickets = ticketsAgregados.map(function (ticket) {
        return ticket.CODIGO_VENTA;
    });
    lcodVenta = listaCodVentaTickets.join(',').toString();
}

//Agregar/eliminar ticket a través de los checks
$('#tblTicket tbody').on('change', '.chkDocument', function () {
    var ticketID = $(this).closest('tr').find('td').eq(1).text();
    actualizarListaTicket(ticketID, this.checked);
});

//Configuracion del boton eliminar fila. Solo al crear un nuevo movimiento. 
$('#tblInfoTicket tbody').on('click', '.btnEliminarDetalle', function () {
    var ticketID = $(this).closest('tr').find('td').eq(1).text();
    var table = $('#tblInfoTicket').DataTable();

    // Remover fila y actualizar estado de tabla
    table.row($(this).parents('tr')).remove().draw();

    // Actualizar lista de tickets y otra logica
    actualizarListaTicket(ticketID, false);
});

//Carga de los tickets al modal para su posterior seleccion. Solo se efectua al crear movimientos. Se llaman a TODOS los tickets disponibles (Canjeados/Aplicables).
//Los tickets ya asociados a un movimiento bancario no van a mostrarse. Los usuarios pueden elegir multiples tickets por movimiento.
var buscarTicket = function () {
    $('#tblTicket').DataTable().destroy();
    var data = new FormData();
    data.append('CTLG_CODE', $('#slcEmpr').val());
    data.append('ESTADO', "A");
    var tbody = $('#tblTicket').find('tbody'); //Tabla modal
    tbody.empty();
    $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLCODT.ashx?OPCION=MDOCS",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        dataType: 'json'
    }).success(function (datos) {
        if (datos != null) {
            for (var i = 0; i < datos.length; i++) {
                var isChecked = ticketsAgregados.some(function (ticket) {
                    return ticket.TICKET === datos[i].TICKET;
                });
                var checkbox = isChecked ? 'checked' : '';

                var row = $('<tr><td style="text-align: center"><input type="checkbox" class="chkDocument" ' + checkbox + '></td><td style="text-align: center">' + datos[i].TICKET + '</td><td style="text-align: center">' + datos[i].DESCRIPCION + '</td><td style="text-align: center">' + datos[i].RAZON_SOCIAL + '</td><td style="text-align: center">' + datos[i].MONTO_APLICADO + '</td></tr>');
                row.data('ticket', datos[i]);
                tbody.append(row);
            }
        }
        $('#tblTicket').DataTable();
    }).error(function () {
        alertCustom(msg);
    });
};

//Agregar tickets desde el modal a la tabla principal durante la creacion de un nuevo movimiento bancario
var AgregarTicket = function (codVentaticketsExistentes) { //Agregar Tickets seleccionados en el modal
    var ticketsSeleccionados = codVentaticketsExistentes || [];

    $('#tblTicket tbody tr').each(function () {
        var $row = $(this);
        if ($row.find('.chkDocument:checked').length > 0) {
            var ticketSelec = $row.data('ticket');
            ticketsSeleccionados.push(ticketSelec);
        }
    });

    poblarTabla(ticketsSeleccionados, true); //Se llena la tabla con los datos de los tickets seleccionados por el usuario
    actualizarListaTicket(); //Se actualiza la tabla para que se vean reflejados los documentos seleccionados

    if (!codVentaticketsExistentes) {
        $('#divBuscarTicket').modal('hide');
    }
    $('#divInfoTicket').show();
};

//Traer los tickets asociados a un movimiento bancario existente. Solo para Dinero por Encargo (slcOperacion = '5')
var cargarTickets = function (codigoMov) {
    $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLCODT.ashx?OPCION=DOCMOVBANC&p_CODE=" + codigoMov + "&CTLG_CODE=" + $("#slcEmpr").val(),
        contentType: false,
        processData: false,
        cache: false,
        dataType: 'json',
        success: function (datos) {
            poblarTabla(datos, false)
            $('#divInfoTicket').show();

        }, error: function (msg) {
            alert(msg);
        }
    });
}

//Tabla principal. Se reflejan los datos de los tickets seleccionados por el usuario, incluyendo el monto pagado y aplicado
function crearTablaVaciaTicket() {

    var parms = {
        data: null,
        sDom: 'T<"clear">lfrtip',
        order: [[0, "desc"]],
        columns: [
            {
                data: "",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center')
                }
            },
            {
                data: "TICKET",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center')
                }
            },
            {
                data: "NRO_SERIE_DCTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center')

                }
            },
            {
                data: "CODIGO_VENTA",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'left')
                }
            },
            {
                data: "DESCRIPCION",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center')
                }
            },
            {
                data: "RAZON_SOCIAL",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center')

                }
            },
            {
                data: "MONTO_APLICADO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center')
                }
            }
        ]
    }
    oTableTicket = iniciaTabla('tblInfoTicket', parms);
}

//Funcion para poblar la tabla principal, funciona para crear un movimiento nuevo o para cargar un movimiento existente
function poblarTabla(datosTicket, columnaEliminar) {

    var newRows = [];
    datosTicket.forEach(function (ticketSelec) {
        var btnEliminar = columnaEliminar ? '<a class="btn btnEliminarDetalle red"><i class=icon-trash></i></a>' : ''; //Condicion para la columna del boton Eliminar
        //Si se crea un nuevo movimiento bancario debe permitir eliminar las filas
        //Si se carga un movimiento existente no debe permitirse eliminar tickets de la tabla, puesto a que estos ya han sido utilizados
        newRows.push([
            btnEliminar,
            ticketSelec.TICKET,
            ticketSelec.NRO_SERIE_DCTO,
            ticketSelec.CODIGO_VENTA,
            ticketSelec.DESCRIPCION,
            ticketSelec.RAZON_SOCIAL,
            ticketSelec.MONTO_APLICADO
        ]);
    });

    $('#tblInfoTicket').DataTable().destroy();
    $('#tblInfoTicket tbody').empty();

    var table = $('#tblInfoTicket').DataTable();
    table.clear();
    newRows.forEach(function (rowData) {
        table.row.add(rowData);
    });
    table.draw();
}

function crearMovimiento() {
    if (vErrorBodyAnyElement(".obligatorio")) {
        alertCustom("La operación <b>NO</b> se realizó!<br/> Ingrese los campos obligatorios!");
        return;
    }

    var estereotipoVal = $("#slcEstereotipo").val();
    if (((estereotipoVal === "EMPL" || estereotipoVal === "PROV") && !vErrorsNotMessage(['slcPersona']))) {
        alertCustom("La operación <b>NO</b> se realizó!<br/> Debe asignarse una persona");
        return;
    }

    var verificaNroOpera = verificarNroOperacion($("#txtNroOpe").val());
    if (verificaNroOpera !== 'OK') {
        $("#A4").attr("disabled", false);
        var splitResult = verificaNroOpera.split("@");
        infoCustom2("El Nro. de Op. " + splitResult[0].substring(2).replace("OP", '') + " ya se encuentra registrado en el sistema");
        if (splitResult[1] === "1") {
            $("#txtNroOpe").pulsate({ color: "#FF0000", reach: 20, repeat: 3, glow: true });
        }
        return;
    }

    if (parseFloat($("#txtMonto").val()) === 0.00) {
        alertCustom("La operación <b>NO</b> se realizó!<br/> El monto no puede ser 0.00!");
        return;
    }

    if ($("#chkRCaja").is(":checked")) {
        Confirmacion();
    } else {
        ejecutaMovimiento();
    }
}


function ejecutaMovimiento() {

    var p_moneda = $("#slcCta :selected").attr("moneda");
    var p_tipo = $("#slcTipo").val();
    var p_ofic = $("#txtOficina").val();
    var p_desc = $("#txtDescripcion").val();
    var p_cana = $("#txtCanal").val();
    var p_nuop = $("#txtNroOpe").val();
    var p_feop = $("#txtFeOp").val();
    var p_mont = p_moneda == "0002" ? $("#txtMonto").val().split(",").join("") : 0;
    var p_mond = p_moneda == "0002" ? 0 : $("#txtMonto").val().split(",").join("");
    var p_feva = $("#txtFeVa").val();
    var p_pidm = $("#slcEmpr :selected").attr("pidm");
    var p_ctco = $("#slcCta").val();
    var p_caja = $("#chkRCaja").is(":checked") ? $("#slcCaja").val() : "";
    var p_cheq = $("#chkChqPag").is(":checked") ? $("#slcChq").val() : "";
    var p_tipoChq = $("#chkChqPag").is(":checked") ? $("#slcChq :selected").attr("tipo") : "";
    var p_user = $('#ctl00_lblusuario').html();
    var p_stbl = $("#chkRCaja").is(":checked") ? $("#slcCaja :selected").attr("stbl") : $("#ctl00_hddestablecimiento").val();
    var p_origen = $("#chkRCaja").is(":checked") ? $("#slcResp").val() : ($("#chkChqPag").is(":checked") ? $("#lblGiradoA").html() : "");

    Bloquear("ventana");
    $.post("vistas/NB/ajax/NBMMOCB.ASHX", {
        flag: 1,
        oficina: p_ofic,
        descripcion: p_desc,
        canal: p_cana,
        nro_operacion: p_nuop,
        fecha_ope: p_feop,
        monto: p_mont,
        fecha_valor: p_feva,
        user: p_user,
        tipo: p_tipo,
        pidm: p_pidm,
        cta_code: p_ctco,
        caja: p_caja,
        cheque: p_cheq,
        monto_d: p_mond,
        stbl: p_stbl,
        tipoChq: p_tipoChq,
        origen: p_origen
    },
        function (res) {
            Desbloquear("ventana");
            if (res.indexOf("error") < 0) {
                exito();
                $("#slcCta, #slcEmpr, #slcOperacion").attr("disabled", true);
                $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                $("#grabar").attr("href", "javascript:actualizarMovimiento();");
                v_nro_operacion_inicial = $("#txtNroOpe").val();

                $("#hddauxiliar").val(res);
                _u_monto += p_mont;

                if (flgRCaja) { $(".RCaja").addClass("hide"); flgRCaja = false; }

                agregarTipoOperacionYPersona(res); // Se agrega a la tabla las columnas Persona y Tipo de Operacion

            } else {
                noexito();
            }
        });
}

function actualizarMovimiento() {
    if (vErrorBodyAnyElement(".obligatorio")) {
        alertCustom("La operación <b>NO</b> se realizó!<br/> Ingrese los campos obligatorios!");
        return;
    }

    var estereotipoVal = $("#slcEstereotipo").val();
    if (((estereotipoVal === "EMPL" || estereotipoVal === "PROV") && !vErrorsNotMessage(['slcPersona']))) {
        alertCustom("La operación <b>NO</b> se realizó!<br/> Debe asignarse una persona");
        return;
    }

    var v_nro_operacion_actual = $("#txtNroOpe").val();
    if (v_nro_operacion_actual !== v_nro_operacion_inicial) {
        var verificaNroOpera = verificarNroOperacion(v_nro_operacion_actual);
        if (verificaNroOpera !== 'OK') {
            $("#A4").attr("disabled", false);
            var splitResult = verificaNroOpera.split("@");
            infoCustom2("El Nro. de Op. " + splitResult[0].substring(2).replace("OP", '') + " ya se encuentra registrado en el sistema");
            if (splitResult[1] === "1") {
                $("#txtNroOpe").pulsate({ color: "#FF0000", reach: 20, repeat: 3, glow: true });
            }zz
            return;
        }
    }

    var tipoOperacion = $("#slcOperacion").val();
    if (tipoOperacion === '1' && !confirmarClienteAnticipo()) {
        var estadoVal = $("#hfESTADO").val();
        alertCustom("La operación <b>NO</b> se realizó!<br/>" +
            (estadoVal === 'I' || estadoVal === '' ? " La persona seleccionada debe ser un cliente activo!" :
                " La persona seleccionada debe ser cliente para generar anticipos!"));
        return;
    }
    var varModificar = verificarModificacionOperacion(v_nro_operacion_actual);
    if ((tipoOperacion === '1' || tipoOperacion === '9') && varModificar === false) {
        alertCustom("La operación <b>NO</b> se realizó!<br/>" + "La operacion seleccionada ya ha sido utilizada.");
        return;
    }

    if (parseFloat($("#txtMonto").val()) === 0.00) {
        alertCustom("La operación <b>NO</b> se realizó!<br/> El monto no puede ser 0.00!");
        return;
    }

    Bloquear("ventana");
    $.post("vistas/NB/ajax/NBMMOCB.ASHX", {
        flag: 2,
        codigo: $("#hddauxiliar").val(),
        oficina: $("#txtOficina").val(),
        descripcion: $("#txtDescripcion").val(),
        canal: $("#txtCanal").val(),
        nro_operacion: v_nro_operacion_actual,
        fecha_ope: $("#txtFeOp").val(),
        monto: $("#txtMonto").val().split(",").join(""),
        fecha_valor: $("#txtFeVa").val(),
        user: $('#ctl00_lblusuario').html(),
        stbl: $("#chkRCaja").is(":checked") ? $("#slcCaja :selected").attr("stbl") : $("#ctl00_hddestablecimiento").val(),
        tipo: $("#slcTipo").val(),
        pidm: $("#slcEmpr :selected").attr("pidm"),
        cta_code: $("#slcCta").val(),
        tipoOperacion: $("#slcOperacion").val(),
        persona: $("#hfPIDM").val(),
    },
        function (res) {
            Desbloquear("ventana");
            if (res === "OK") {
                exito();
                $("#slcOperacion").prop("disabled", true); 
                _u_monto += parseFloat($("#txtMonto").val());
            } else {
                noexito();
            }
        });
}


function agregarTipoOperacionYPersona(codigo) {
    var p_tipoOperacion = $("#slcOperacion").val();
    var p_persona = $("#hfPIDM").val();

    Bloquear("ventana");
    $.post("vistas/NB/ajax/NBMMOCB.ASHX", {
        flag: 1.5,
        codigo: codigo,
        tipoOperacion: p_tipoOperacion,
        persona: p_persona,
        codigoVenta: lcodVenta ?? "" //Opcional, solo para slcOperacion === '5'
    },
        function (res) {
            Desbloquear("ventana");
            if (res === "OK") {
                generarAsiento($("#hddauxiliar").val());
            }
        });
}

function generarAsiento(p_codigo) {
    var opcion = $("#slcOperacion option:selected");

    var p_tipoOpeCta = opcion.data("value"); //cta contable asociada al tipo de operacion

    Bloquear("ventana");
    $.post("vistas/NB/ajax/NBMMOCB.ASHX", {
        flag: "GEN_ASIENTO",
        codigo: p_codigo,
        tipoOpeCta: p_tipoOpeCta
    },
        function (res) {
            Desbloquear("ventana");
            if (res.indexOf("error") < 0) {
                exito();
            } else {
                noexito();
            }
        });
}
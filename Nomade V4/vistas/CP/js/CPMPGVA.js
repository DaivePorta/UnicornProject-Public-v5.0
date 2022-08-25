var cade_pagar = "";
eventoModalHide = false;
var cade_pagar = "";
StringMediosPago = "";

let json_nota_dcto = new Array(); //array que contiene la relacion entre nota y dcto
let ArrObjectValidacionNota = new Array();
let ArrObjectValidacionDocu = new Array();
let objComboDocumentos;
conNotaCredito = false;
eventOrigenBco = false;
eventOrigenCaj = false;
jsonPersonas = null;
json_selec = new Array();

var CPLPGVA = function () {

    var plugins = function () {

        $("#cboempresa").select2();
        fnSetRangoDatePickerMesHoy("txtFeIn", "txtFeFi");

    }

    var cargarEmpresas = function () {
        var select = $('#cboempresa');
        $.ajax({
            type: "post",
            url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            },
            complete: function () {
                //  select.change();
            }
        });
    };

    var cargarSucursales = function () {
        var select = $('#slcEstablec');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboempresa').val(),
            beforesend: function () { Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {


                select.multiselect({
                    nonSelectedText: 'TODOS'

                });

                Desbloquear($(select.parents("div")[0]));
            }
        });
    };

    var cargarProveedores = function () {
        var select = $("#slcProveedor")
        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMPGVA.ashx?flag=3.5&empresa=" + $('#cboempresa').val(),
            async: true,
            beforeSend: function () { Bloquear($(select.parents("div")[0])) },
            success: function (data) {
                data = data.split("<option></option>").join("");
                select.append(data);

            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {
                select.multiselect({
                    nonSelectedText: 'TODOS',
                    includeSelectAllOption: true,
                    enableFiltering: true,
                    enableCaseInsensitiveFiltering: true,
                    maxHeight: 200
                });

                Desbloquear($(select.parents("div")[0]));
            }
        });


    }

    var eventos = function () {
        $('#cboempresa').change(function () {
            cargarSucursales();
            cargarProveedores();
        });

        $("#btnFiltrar").click(function () {

            $.ajax({
                type: "post",
                url: "vistas/CP/ajax/CPMPGVA.ashx?flag=L&empresa=" + $('#cboempresa').val() +
                    "&establec=" + ($("#slcEstablec").val() === null ? '' : $("#slcEstablec").val().toString()) +
                    "&proveedor=" + ($("#slcProveedor").val() === null ? '' : $("#slcProveedor").val().toString()) +
                    "&fini=" + $('#txtFeIn').val() + "&ffin=" + $('#txtFeFi').val(),
                async: true,
                contenttype: "application/json",
                datatype: "json",
                beforeSend: function () { Bloquear($($("#tblPagoPr").parents("div")[0])) },
                success: function (data) {

                    oTablePagoPr.fnClearTable();

                    if (data.length > 0) {

                        oTablePagoPr.fnAddData(data);

                    } else {

                        infoCustom2("No se encontraron datos!");

                    }

                },
                error: function (msg) {
                    alertCustom('Error al cargar Sucursales.');
                },
                complete: function () {

                    Desbloquear($($("#tblPagoPr").parents("div")[0]));
                }

            });
        });
    }

    var tablaVacia = function () {

        var parms = {
            data: null,
            columns: [
                {
                    data: null,
                    defaultContent: "  <img src='recursos/img/details_open.png' class='detDoc' />",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                },
                { data: "PROVEEDOR" },
                //{
                //    data: "FECHA_PAGO", type: "fecha", createdCell: function (td, cellData, rowData, row, col) {
                //        $(td)
                //            .css({ "text-align": "center" });
                //    }
                //},
                {
                    data: "MONEDA", createdCell: function (td, cellData, rowData, row, col) {
                        $(td)
                            .css({ "text-align": "center" });
                    }
                },
                {
                    data: "MONTO",
                    type: "formatoMiles"
                },
                //{ data: "ORIGEN" },
                {
                    data: "CAJA_BCO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td)
                            .css({ "text-align": "center" });
                    }
                },
                //{ data: "FORMA_PAGO" },
                //{ data: "NRO_OP" },
                {
                    data: null,
                    defaultContent: '',
                    createdCell: function (cell, cellData, row) {
                        if (row.FOTO != "") {
                            $(cell).append('<a class="btn glocat blue"><i class="icon-picture"></i></a>');
                        }
                        $(cell).css('text-align', 'center');

                    }
                }

            ]

        }
        oTablePagoPr = iniciaTabla('tblPagoPr', parms);

    }

    var obtenerImagen = function (img) {
        $.ajax({
            type: "post",
            url: 'vistas/CC/ajax/CCMCBCL.ASHX',
            data: { flag: 'PI', RUTA_IMAGEN: img },
            async: true,
            beforeSend: function () { $('#divVerImagen').modal('show'); Bloquear($($("#imgProtesto").parents("div")[0]), "Obteniendo Imagen...") },
            success: function (res) {
                $('#imgProtesto').attr("src", res);
            },
            error: function (msg) {
                alertCustom('Error al cargar imagen.');
            },
            complete: function () {
                Desbloquear($($("#imgProtesto").parents("div")[0]));
            }
        });
    }

    var eventosTabla = function () {

        $("#tblPagoPr").on('click', '.glocat', function (e) {
            var img = $('#tblPagoPr').DataTable().row($(this).parents('tr')).data().FOTO;
            obtenerImagen(img);
        });

        $('#tblPagoPr tbody').on('click', '.detDoc', function () {

            var pos = oTablePagoPr.api(true).row($(this).parents("tr")[0]).index();
            var row = oTablePagoPr.fnGetData(pos);

            var id = row.CODE_DOCUMENTO;
            var nTr = $(this).parents('tr')[0];

            if (oTablePagoPr.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                oTablePagoPr.fnClose(nTr);
            }
            else {
                /* Open this row */
                this.src = "recursos/img/details_close.png";
                //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

                oTablePagoPr.fnOpen(nTr, fnFormatDetails(nTr, id.split(",").join("")), 'details');
                oTablePagoPr.fnOpen(nTr, '<div id="c' + id.split(",").join("") + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
                //     $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');

                $.ajax({
                    type: "POST",
                    url: "vistas/cp/ajax/CPMPGVA.ashx?flag=LA&codigo=" + id,
                    beforeSend: function () { Bloquear($('#c' + id.split(",").join(""))); },
                    async: true,
                    success: function (datos) {
                        Desbloquear("ventana");
                        var str = "";
                        var resb = "";
                        if (datos.length < 1) { resb = "No hay datos disponibles!"; $('#c' + id.split(",").join("")).html(resb); }
                        else {
                            resb += "<table id='tblBandejaDetalleF" + id.split(",").join("") + "' class='DTTT_selectable' border='0' style='width:100%;'>";
                            resb += "<thead>";
                            resb += '<tr align="center">';
                            resb += "<th>DOCUMENTO</th>";
                            resb += "<th>DESCRIPCIÓN</th>";
                            resb += "<th>MONTO AMORT.</th>";
                            resb += "<th>MONTO TOTAL</th>";
                            resb += "<th>MEDIO DE PAGO</th>";
                            resb += "<th>ORIGEN</th>";
                            //resb += "<th>F. EMISION</th>";
                            //resb += "<th>F. VENCIMIENTO</th>";
                            resb += "<th>FECHA PAGO</th>";
                            resb += "<th>PAGADO</th>";
                            resb += "</tr>";
                            resb += "</thead>";
                            resb += "</table>";

                            $('#c' + id.split(",").join("")).html(resb);

                            cargatablaDetalleF("tblBandejaDetalleF" + id.split(",").join(""), datos);
                        }
                    },
                    complete: function () { Desbloquear($('#c' + id.split(",").join(""))); }


                });

            }

        });

        function fnFormatDetails(nTr, id) {
            //var aData = oTable.fnGetData(nTr);
            var sOut = '<div id="c' + id.split(",").join("") + '"></div>';
            return sOut;
        }

    }

    var cargatablaDetalleF = function (id, json) {

        oTableDeudasDetalle = $("#" + id).dataTable({
            data: json,
            columns: [
                {
                    data: "DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html(rowData.SMONEDA + formatoMiles(rowData.MONTO));
                    }
                },
                {
                    data: "MONTO_TOTAL_DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html(rowData.SMONEDA_ORIGEN + formatoMiles(rowData.MONTO_TOTAL_DOC));
                    }
                },
                {
                    data: "MEDIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    }
                },
                {
                    data: "ORIGEN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    }
                },
                //{
                //    data: "FECHA_EMISION",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'center');
                //    },
                //    type: "fecha"
                //},
                //{
                //    data: "FECHA_VCTO",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'center');
                //    },
                //    type: "fecha"
                //},
                {
                    data: "FECHA_PAGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    },
                    type: "fecha"
                },
                {
                    data: "PAGADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    }
                }


            ],
            "paging": false,
            scrollCollapse: true,
            //  sort: false,
            "sDom": "t"

        });


    }

    return {
        init: function () {
            plugins();
            eventos();
            cargarEmpresas();
            tablaVacia();
            eventosTabla();
        }
    };
}();

var CPMPGVA = function () {

    function decimalAdjust(type, value, exp) {
        // Si el exp no está definido o es cero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Si el valor no es un número o el exp no es un entero...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    if (!Math.round10) {
        Math.round10 = function (value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }

    var plugins = function () {
        $('#cboProveedores').select2();
        $('#cbo_OrigenPago').select2();
        $('#cboCtaEmpresa').select2();
        $('#cboMedioPago').select2();
        $('#cbDestino, #cbo_Det_Origen, #cbo_moneda').select2();
        $("#txtMonto").keypress(function (e) { return (ValidaDecimales(e, this, 2)); })
        $("#txt_TC").keypress(function (e) { return (ValidaDecimales(e, this, 4)); })
        $("#txt_TC").keyup(function () { if ($(this).val() < 1 || $(this).val() > 10) $(this).val(""); });
        inifechas("txtFeIn", "txtFeFi");
        $("#slcEmpresa").select2();

        $("#txtMonto").keyup(function () {
            var monto_base = $('#txt_monto_base').attr('monto');
            var monto_alt = $('#txt_monto_alt').attr('monto');
            var tc = parseFloat($("#txt_TC").val());
            var monto_actual = this.value;
            var moneda_activa_cod = $("select.moneda.activo").val();
            var moneda_activa_tipo = $(".moneda.activo :selected").attr("tipo");
            var nTotaSoloNotas = json_select_NotaCredito.filter(obj => obj.MONE_CODE == moneda_activa_cod).map(obj => parseFloat(obj.MONTO_USABLE).Redondear(2))
                .concat(json_select_NotaCredito.filter(obj => obj.MONE_CODE !== moneda_activa_cod).map(obj => parseFloat(moneda_activa_cod == '0002' ? obj.MONTO_USABLE * tc : obj.MONTO_USABLE / tc).Redondear(2))).reduce((sum, obj) => (sum + obj), 0).Redondear(2);

            if (monto_base.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
                var re = /,/g;
                monto_base = $('#txt_monto_base').attr('monto').replace(re, '');
            }

            if (monto_alt.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
                var re = /,/g;
                monto_alt = $('#txt_monto_alt').attr('monto').replace(re, '');
            }

            var montoSeleccionado = (moneda_activa_tipo == 'MOBA') ? monto_base : monto_alt;

            if (monto_actual.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
                var re = /,/g;
                monto_actual = this.value.replace(re, '');
            }

            if (monto_actual < 0 || monto_actual > (montoSeleccionado - nTotaSoloNotas)) {
                this.value = (montoSeleccionado - nTotaSoloNotas).Redondear(2);
            };

        });

    }

    var cargarCombos = function () {

        // CARGA DE CATALOGOS
        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 5 },
            function (res) {
                if (res != null && res != "" && res.indexOf("error") < 0) {
                    $("#slcEmpresa").html(res);
                }
            });

        // EVENTOS COMBOS
        $("#slcEmpresa").change(function () {
            json_select_NotaCredito = new Array();
            var valEmpresa = $(this).val();

            limpiaCampos();



            // CARGA DE ESTABLECIMIENTOS
            cargarSucursales(valEmpresa);

            filltxtproveedor();

            // CARGA MONEDAS DE LA EMPRESA
            $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "MO", empresa: valEmpresa },
                function (res) {
                    if (res != null && res != "" && res.indexOf("error") < 0) {
                        $("#cbo_moneda").html(res)
                    }
                });
        });

        $("#cbo_moneda").change(function () {

            var val0r = $(this).val();
            var d = 0.00;
            if (json_select_NotaCredito.length > 0) {
                json_select_NotaCredito.filter(function (e, f) {
                    var auxMonto = e.MONTO_USABLE;
                    if (e.MONE_CODE != val0r) {
                        if (val0r == "0002")
                            auxMonto *= parseFloat($("#txt_TC").val());
                        else {
                            auxMonto /= parseFloat($("#txt_TC").val());
                        }
                    }
                    d += parseFloat(auxMonto);
                    return d;
                });

                //var moneda_simbolo = val0r == "0002" ? "S/." : "$.";
                if (json_notacredito.length | 0 && val0r || 0)
                    $("#divMontoAgregado").css("display", "inline-block");
                else
                    $("#divMontoAgregado").css("display", "none");

                $("#montoNotaAgregado").html(formatoMiles(d)); ///actualiza montos de notas de credito
                $("#montoTotalAgregado").html(formatoMiles(d + parseFloat($("#txtMonto").attr("monto") == undefined ? 0 : $("#txtMonto").attr("monto"))))
            }

        });

        $("#cboMedioPago").select2();

        $('#slcEstablec').change(function () {
            // $('#cbo_OrigenPago').change();
        });

        cargaMediosDePago();
    }

    var cargarSucursales = function (empresa) {
        var select = $('#slcEstablec');
        select.multiselect('destroy');
        select.multiselect();
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + empresa,
            beforesend: function () { select.hide(); Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {
                select.empty();
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {

                select.multiselect('destroy');
                select.multiselect();

                Desbloquear($(select.parents("div")[0]));
            }
        });
    };

    var funcionalidad = function () {

        $("#cboProveedores").change(function () {
            $("#cbo_OrigenPago").attr("disabled", false);

            $("#txt_monto_base").attr("monto", 0.00).val("S/. 0.00");
            $("#txt_monto_alt").attr("monto", 0.00).val("US$ 0.00");

            $("#btnNotaCredito, .incluye_nota").css("display", "none");

            json_nota_dcto = new Array();



            json_select_NotaCredito = new Array();
            $("#form_medioPago").css("display", "block")
            $("#chkSoloNota").attr("checked", false); $("#chkSoloNota").parent().removeClass("checked");
            $(".NotaCreditoItem").remove();
            $("#divMontoAgregado").css("display", "none");
            limpiaCampos();
        });


        $("#btnConsultar").click(function () {
            if (!isEmpty($("#cboProveedores").val()) && !isEmpty($("#slcEmpresa").val())) {
                consultaDeudas();
                //consultaNotaCredito();
            } else {
                $($("#cboProveedores").siblings("div")[0]).pulsate({
                    color: "#33AECD",
                    reach: 20,
                    repeat: 3,
                    glow: true
                });
            }
        });

        $("#txtMonto").change(function () {

            var tipo = $("#cbo_moneda :selected").attr("tipo");
            var valor_ = parseFloat($(".monto_sele[tipo = " + tipo + "]").attr("monto"));
            var valor_2 = tipo == "MOAL" ? parseFloat($("#cbo_Det_Origen :selected").attr("monto_d")) : parseFloat($("#cbo_Det_Origen :selected").attr("monto"));

            var d = 0.00;

            if (json_select_NotaCredito.length > 0) {

                var val0r = $("#cbo_moneda").val();
                json_select_NotaCredito.filter(function (e, f) {
                    var auxMonto = e.MONTO_USABLE;
                    if (e.MONE_CODE != val0r) {
                        if (val0r == "0002")
                            auxMonto *= parseFloat($("#txt_TC").val());
                        else {
                            auxMonto /= parseFloat($("#txt_TC").val());
                        }
                    }
                    d += parseFloat(auxMonto);

                });
            }


            if (parseFloat($(this).val()) > valor_2) {

                $(this).val("").attr("monto", 0.000);

                infoCustom2("El monto excede al saldo disponible en la " + $("#lbl_detalle1").html());
                $("#s2id_cbo_Det_Origen").pulsate({
                    color: "#33AECD",
                    reach: 20,
                    repeat: 3,
                    glow: true
                });
            }

            else {
                if ((parseFloat($(this).val()) + d) > valor_) {

                    $(this).val("").attr("monto", 0.000);
                    infoCustom2("El monto ingresado es mayor al que se ha seleccionado a pagar!");
                    $(".monto_sele[tipo = " + tipo + "]").pulsate({
                        color: "#33AECD",
                        reach: 20,
                        repeat: 3,
                        glow: true
                    });

                }
                else {
                    $(this).val(formatoMiles($(this).val()))
                        .attr("monto", $(this).val().split(",").join(""));
                }

            }


            if ($(this).attr("monto") == "") {
                $(this).attr("monto", 0.00);
            }

            if (json_select_NotaCredito.length > 0) {
                // $("#divMontoAgregado").css("display", "inline-block");
                $("#montoNotaAgregado").html(formatoMiles(d)); ///actualiza montos de notas de credito
                $("#montoTotalAgregado").html(formatoMiles(d + parseFloat($("#txtMonto").attr("monto") == undefined ? 0 : $("#txtMonto").attr("monto"))))
            }

        });



        function cargarJson() {
            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMRDNI.ashx?flag=L",
                contenttype: "application/json;",
                datatype: "json",
                async: true,

                success: function (datos) {
                    if (datos != null && datos != "") {

                        jsonPersonas = datos;

                    }
                }
            });
        }

        $('#cbo_OrigenPago').change(function () {
            $('#fileSustento').attr("disabled", false);
            /*conf inicial mostrar detalle de saldos*/
            $(".det_saldos").css("display", "none");
            $("#iconDetSaldo").removeClass("icon-circle-arrow-up").addClass("icon-circle-arrow-down");
            /**/
            var OrigenActual = $(this).val();

            $("#lbl_detalle3").html("-");
            $("#lbl_detalle4").html("-");
            $("#cboMedioPago").val("").change();
            $("#cbo_moneda").val("").change();

            switch (OrigenActual) {

                case "Caja":

                    $("#lbl_detalle1").html("Caja");
                    $("#divSaldoCaja").addClass("activo");
                    $("#divSaldoCtas").removeClass("activo");

                    $("#cbo_Det_Origen").off("change");
                    $("#cbo_Det_Origen").attr("data-placeholder", "CAJA").select2("val", "").change();
                    $("#cbDestino").select2("val", "");



                    $.ajaxSetup({ async: false });
                    $.post("vistas/CP/ajax/CPMPGVA.ASHX", { flag: 7, empresa: $("#slcEmpresa").val(), usuario: $("#ctl00_txtus").val(), establec: ($("#slcEstablec").val() == null ? "" : $('#slcEstablec').val().toString()), },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {

                                $("#cbo_Det_Origen").html(res).attr("disabled", false).change(function () {
                                    if ($('#cbo_OrigenPago').val() == "Caja") {
                                        /***/
                                        if (!eventOrigenCaj)
                                            $("#iconDetSaldo").click();
                                        /***/
                                        eventOrigenCaj |= 1;
                                        $("#txtMontoDisponibleMOBA").val(formatoMiles($("#cbo_Det_Origen :selected").attr("monto")));
                                        $("#txtMontoDisponibleMOAL").val(formatoMiles($("#cbo_Det_Origen :selected").attr("monto_d")));

                                        if ($("#cbo_moneda :selected").attr("tipo") == "MOBA") {
                                            $("#txtMonto").attr("placeholder", "max. " + $("#cbo_Det_Origen :selected").attr("monto")).Redondear(2);
                                        } else {
                                            if (($("#cbo_moneda :selected").attr("tipo") == "MOAL"))
                                                $("#txtMonto").attr("placeholder", "max. " + $("#cbo_Det_Origen :selected").attr("monto_d")).Redondear(2);
                                            else
                                                $("#txtMonto").attr("placeholder", "");
                                        }
                                    }
                                });

                            } else {
                                $("#cbo_Det_Origen").html("").attr("disabled", true);

                            }
                        });
                    $.ajaxSetup({ async: true });

                    //
                    $("#cbo_moneda").change(function () {
                        $("#txtMonto").val("").change();
                        if ($("#cbo_moneda :selected").attr("tipo") == "MOBA") {
                            $("#txtMonto").attr("placeholder", "max. " + ($("#cbo_Det_Origen :selected").attr("monto") | 0).Redondear(2));
                        } else {
                            if (($("#cbo_moneda :selected").attr("tipo") == "MOAL"))
                                $("#txtMonto").attr("placeholder", "max. " + ($("#cbo_Det_Origen :selected").attr("monto_d") | 0).Redondear(2));
                            else
                                $("#txtMonto").attr("placeholder", "");
                        }
                    });
                    //***

                    $("#cboMedioPago").html(StringMediosPago);
                    $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0001" && valorO != "0008" && valorO != "") $(j).remove(); });
                    $("#cboMedioPago").attr("disabled", false);
                    break;

                case "Banco":
                    $("#divSaldoCaja").removeClass("activo");
                    $("#divSaldoCtas").addClass("activo");
                    $(".mPersona").css("display", "none");
                    $("#cbDestino").off("change");

                    $("#lbl_detalle1").html("Cuenta Origen");
                    $("#cbo_moneda").attr("disabled", true);
                    $("#cbDestino").html("<option></option>").select2("val", "");

                    //CargarCuentas Origen
                    $("#cbo_Det_Origen").val("").change().attr("data-placeholder", "CUENTA BANCARIA").select2();

                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGVA.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm"), banco: "", moneda: "" },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbo_Det_Origen").html(res).attr("disabled", false).change(function () {
                                    if ($('#cbo_OrigenPago').val() == "Banco") {

                                        /***/

                                        if (!eventOrigenBco)
                                            $("#iconDetSaldo").click();

                                        /***/

                                        eventOrigenBco |= 1;
                                        $("#cboMedioPago").change();
                                        var mone_code = $("#cbo_Det_Origen :selected").attr("moneda");
                                        $("#cbo_moneda").select2("val", mone_code).change();
                                        $("#txtMonto").attr("placeholder", "max. " + ($("#cbo_Det_Origen :selected").attr("monto") == undefined ? "0" : $("#cbo_Det_Origen :selected").attr("monto")));
                                        $("#txtMontoDisponibleCta").val(formatoMiles($("#cbo_Det_Origen :selected").attr("monto") == undefined ? "0" : $("#cbo_Det_Origen :selected").attr("monto")));
                                        if (mone_code == "0002") {//soles
                                            $($("#txtMontoDisponibleCta").siblings("span")).addClass("Rojo").removeClass("Azul").html("S/.")

                                        } else {//dolares
                                            $($("#txtMontoDisponibleCta").siblings("span")).addClass("Azul").removeClass("Rojo").html("US$.")
                                        }
                                        $("#txtMontoDisponibleCta").css("border-color", $($("#txtMontoDisponibleCta").siblings("span")).css("border-color"));

                                    }
                                }
                                );
                            } else {
                                $("#cbo_Det_Origen").html("<option></option>").change();
                            }

                        });
                    $.ajaxSetup({ async: true });


                    $("#cboMedioPago").html(StringMediosPago);
                    $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "0006" && valorO != "0005" && valorO != "") $(j).remove(); });
                    $("#cboMedioPago").attr("disabled", false);

                    break;

            }
        });

        $('#cboMedioPago').change(function () {

            var MedioActual = $(this).val();

            $("#txtNroOpe").removeClass("personas").attr("disabled", false);

            $("#cbDestino").val("").select2();

            $("#cbDestino").attr("disabled", false).off("change");

            $("#txtNroOpe").val("");
            $("#txtNroOpe").attr("disabled", false).attr("placeholder", "");
            switch (MedioActual) {

                case "0001"://DEPOSITO BANCARIO

                    $("#lbl_detalle3").html("Destino");
                    $("#lbl_detalle4").html("Nro. Operación");


                    $.ajaxSetup({ async: false });
                    $("#cbDestino").off("change");
                    $.post("vistas/CP/ajax/CPMPGVA.ASHX", { flag: 6, empresapidm: $("#cboProveedores").val(), banco: "", moneda: "" },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbDestino").html(res).change(function () {


                                    var mone_code = $("#cbDestino :selected").attr("moneda");
                                    $("#cbo_moneda").select2("val", mone_code).change();

                                }

                                );
                            } else {
                                $("#cbDestino").html("<option></option>").change();
                            }

                        });
                    $.ajaxSetup({ async: true });


                    $("#cbDestino").attr("disabled", false).select2();
                    $("#cbo_moneda").attr("disabled", true);

                    $(".mPersona").css("display", "none");
                    offObjectEvents("txtNroOpe");
                    $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                    $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la transacción");
                    $("#txtMonto").attr("disabled", false);
                    break;

                case "0008": //EFECTIVO

                    $("#lbl_detalle3").html("Destino");
                    $("#lbl_detalle4").html("Persona Recibe");


                    $("#cbDestino").html("<option>ENTREGA DIRECTA A BENEFICIARIO</option>").attr("disabled", true).select2();

                    $(".mPersona").css("display", "block");


                    $("#txtNroOpe").attr("disabled", false).attr("placeholder", "");
                    $("#txtNroOpe").addClass("personas").attr("disabled", false);
                    cargarInputsPersona();

                    $("#cbo_moneda").attr("disabled", false);
                    $("#txtMonto").attr("disabled", false);
                    break;

                case "0003": //transferencia

                    $("#lbl_detalle3").html("Destino");
                    $("#lbl_detalle4").html("Nro. Operación");



                    $.ajaxSetup({ async: false });
                    $("#cbDestino").off("change");
                    $.post("vistas/CP/ajax/CPMPGVA.ASHX", { flag: 6.5, moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: $("#cboProveedores").val() },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbDestino").html(res).select2();
                            } else {
                                $("#cbDestino").html("<option></option>").select2();
                            }

                        });
                    $.ajaxSetup({ async: true });
                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGVA.ASHX", { flag: 6, banco: $("#cbo_Det_Origen :selected").attr("banco"), moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: $("#cboProveedores").val() },
                        function (res) {
                            if (res != null && res != "" < 0) {
                                $("#cbDestino option").filter(function (e, j) { var valorO = $(j).val(); if (res.indexOf(valorO) > 0) $(j).remove(); });
                                if (res != "error") {
                                    $("#cbDestino").append(res.split("<option></option")[1]);
                                }
                            } else {
                                $("#cbDestino").html("<option></option>").change();
                            }

                        });
                    $.ajaxSetup({ async: true });


                    $("#cbDestino").attr("disabled", false).change();
                    $("#cbo_moneda").attr("disabled", true);
                    $("#txtMonto").attr("disabled", false);
                    //$("#txtNroOpe").attr("disabled", false);
                    $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la transacción");
                    break;

                case "0013": //cheques bancarios

                    $("#lbl_detalle3").html("N° Cheque");
                    $("#lbl_detalle4").html("Girado a");

                    $("#cbDestino").attr("disabled", false);
                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGVA.ASHX", { flag: 8, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm") },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbDestino").html(res).change(function () {
                                    $("#txtNroOpe").val($("#cbDestino :selected").attr("ngiradoa"));
                                    $("#txtNroOpe")
                                        .attr("valor", $("#cbDestino :selected").attr("giradoa"))
                                        ;
                                    $("#txtMonto")
                                        .val($("#cbDestino :selected").attr("monto"))
                                        .change();
                                }

                                );
                            } else {
                                $("#cbDestino").html("<option></option>").select2();
                            }

                        });
                    $.ajaxSetup({ async: true });

                    $("#txtNroOpe").attr("disabled", false).attr("placeholder", "");
                    //$("#txtNroOpe").attr("disabled", true);
                    $("#txtMonto").attr("disabled", true);
                    break;

                case "0006": //tarjeta de credito

                    $("#lbl_detalle3").html("N° Tarjeta");
                    $("#lbl_detalle4").html("Cod. Autorización");

                    //$("#txtNroOpe").attr("disabled", false);
                    $("#txtMonto").attr("disabled", false);
                    $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la operación");
                    $("#cbDestino").attr("disabled", false);
                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGVA.ASHX", { flag: 9, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm"), tipo: "0006" },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbDestino").html(res).change(function () {

                                }

                                );
                            } else {
                                $("#cbDestino").html("<option></option>").select2();
                            }

                        });
                    $.ajaxSetup({ async: true });

                    break;

                case "0005": // tarjeta de debito

                    $("#lbl_detalle3").html("N° Tarjeta");
                    $("#lbl_detalle4").html("Cod. Autorización");

                    //$("#txtNroOpe").attr("disabled", false);
                    $("#txtMonto").attr("disabled", false);
                    $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la operación");
                    $("#cbDestino").attr("disabled", false);
                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGVA.ASHX", { flag: 9, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm"), tipo: "0005" },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbDestino").html(res).change(function () {

                                }

                                );
                            } else {
                                $("#cbDestino").html("<option></option>").select2();
                            }

                        });
                    $.ajaxSetup({ async: true });


                    break;

            }


        });


        cargarJson();
    }

    function cargarInputsPersona() {


        var arrayPersonas = new Array();



        function cargaAutoCompleteInputs() {

            var json = jsonPersonas;
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
                if (actual.val() == "") { actual.removeAttr("valor"); }
            });


        }


        cargaAutoCompleteInputs();
    }

    function btnBuscaPersonas() {

        $(".buscaPersona").click(function () {
            var campo = $("#txtNroOpe");
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
        });

    }

    var cargainicial = function () {

        inputFile("fileSustento", "imgSustento", "../../recursos/img/no_disponible.jpg", 350, 350, 1);

        montoCajas(".div_origen");
        montoCtas(".div_origen");
        $("#iconDetSaldo").click(function () {
            if ($(this).hasClass("icon-circle-arrow-down")) {
                $(".det_saldos.activo").slideDown();
                $(this).removeClass("icon-circle-arrow-down").addClass("icon-circle-arrow-up");
            } else {
                $(".det_saldos.activo").slideUp();
                $(this).removeClass("icon-circle-arrow-up").addClass("icon-circle-arrow-down");
            }
        });

        cargatablavacia();
        btnBuscaPersonas();
        cargatablavaciaModalNotaCredito();

        $('#txt_TC').change(function () {

            $("#txt_monto_base, #txt_monto_alt").val("");
            if (parseFloat($(this).val()) == 0) { $(this).val(""); }

        });

        $('#txtFechaPago').datepicker();
        $('#txtFechaPago').inputmask("date",
            {
                yearrange: {
                    minyear: 1900,
                    maxyear: 2099
                }
            });

        $('#txtFechaPago').datepicker("setDate", new Date());
        $("#txtFechaTransaccion").datepicker({ dateFormat: "yy/mm/dd" }).datepicker("setDate", new Date());

        $('#chkAll').prop('disabled', true).parent().removeClass('checked');
    }

    var funcionalidadTabla = function () {

        $('#tblBandeja tbody').on('click', '.selecChk', function () {

            if ($('#chkAll').is(":checked")) {
                //$('#chkAll').prop('disabled', false).parent().removeClass('checked');
                $('#chkAll').prop('disabled', false).parent().removeClass('checked');
                $('#chkAll').prop('checked', false);
            } else {
                //$('#chkAll').prop('disabled', false).parent().addClass('checked');
                //$('#chkAll').prop('checked', true);
            }

            var pos = oTableDeudas.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableDeudas.fnGetData(pos);
            var monto_base = $("#txt_monto_base").attr("monto");
            var monto_alt = $("#txt_monto_alt").attr("monto");

            if (monto_base.indexOf(',') !== -1) {
                var re = /,/g;
                monto_base = $('#txt_monto_base').attr('monto').replace(re, '');
            }

            if (monto_alt.indexOf(',') !== -1) {
                var re = /,/g;
                monto_alt = $('#txt_monto_alt').attr('monto').replace(re, '');
            }


            var moba = row.ES_MONEDA_BASE == 'N' && $("#txt_TC").val() != "" ? parseFloat(row.POR_PAGAR_ALTER) * parseFloat($("#txt_TC").val()) : parseFloat(row.POR_PAGAR_BASE);//moneda base
            if (formatoMiles(moba).indexOf(',') !== -1) {
                var re = /,/g;
                moba = formatoMiles(moba).replace(re, '');
            }

            var moal = row.ES_MONEDA_BASE == 'S' && $("#txt_TC").val() != "" ? parseFloat(row.POR_PAGAR_BASE) / parseFloat($("#txt_TC").val()) : parseFloat(row.POR_PAGAR_ALTER);//moneda alterna
            if (formatoMiles(moal).indexOf(',') !== -1) {
                var re = /,/g;
                moal = formatoMiles(moal).replace(re, '');
            }

            var valor_moba = parseFloat(monto_base == "" ? "0.00" : monto_base);
            var valor_moal = parseFloat(monto_alt == "" ? "0.00" : monto_alt);




            if ($(this).is(":checked")) {

                $(this).parent().parent().addClass('selected');

                valor_moba += parseFloat(moba);
                valor_moal += parseFloat(moal);
                json_selec.push(row);

            } else {

                $(this).parent().parent().removeClass('selected');

                valor_moba -= parseFloat(moba);
                valor_moal -= parseFloat(moal);
                json_selec.filter(function (e, f) {
                    if (e == row) { json_selec.splice(f, 1); }
                });

            }

            $("#txt_monto_base")
                .val("S/." + formatoMiles(valor_moba))
                .attr("monto", formatoMiles(valor_moba));
            $("#txt_monto_alt")
                .val("US$." + formatoMiles(valor_moal))
                .attr("monto", formatoMiles(valor_moal));

            $("#txtMonto").keyup();

        });


        $('#tblBandeja tbody').on('click', '.detDoc', function () {

            var pos = oTableDeudas.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableDeudas.fnGetData(pos);

            var id = row.CODIGO;
            var nTr = $(this).parents('tr')[0];

            if (oTableDeudas.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                oTableDeudas.fnClose(nTr);
            }
            else {
                /* Open this row */
                this.src = "recursos/img/details_close.png";
                //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

                oTableDeudas.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
                oTableDeudas.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
                $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');

                $.ajax({
                    type: "POST",
                    url: "vistas/cp/ajax/CPMPGVA.ashx?flag=4.5&factura=" + id,
                    async: true,
                    success: function (datos) {

                        var str = "";
                        var resb = "";
                        if (datos == "") { resb = "No hay datos disponibles!"; $('#c' + id).html(resb); }
                        else {
                            resb += "<table id='tblBandejaDetalleF" + id + "' class='display DTTT_selectable' border='0' style='width:100%;'>";
                            resb += "<thead>";
                            resb += '<tr align="center">';
                            resb += "<th>FECHA</th>";
                            resb += "<th>ORIGEN</th>";
                            resb += "<th>DESTINO</th>";
                            resb += "<th>FORMA_PAGO</th>";
                            resb += "<th>DOCUMENTO</th>";
                            resb += "<th>MONTO</th>";
                            resb += "</tr>";
                            resb += "</thead>";
                            resb += "</table>";

                            $('#c' + id).html(resb);

                            cargatablavaciaDetalleF("tblBandejaDetalleF" + id, $.parseJSON(datos));
                        }
                    },
                    complete: function () { Desbloquear("ventana"); }
                });

            }

        });

        $('#tblBandeja tbody').on('dblclick', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $("#tblBandeja tr.selected").removeClass('selected');
                $(this).addClass('selected');
                var row = $("#tblBandeja").DataTable().row(this).data();
                var code = row.CODIGO;
                window.open("?f=nomdocc&codigo=" + code, '_blank');
            }


        });

        $('#chkAll').click(function () {

            var checked = $(this).is(':checked');

            $('#tblBandeja tbody input[type=checkbox]').prop('checked', checked);

            if (checked) {
                $(this).prop('disabled', false).parent().addClass('checked');
                $(this).prop('checked', true);
            } else {
                $(this).prop('disabled', false).parent().removeClass('checked');
                $(this).prop('checked', false);
            }


            if (checked) {
                $('#tblBandeja tbody input[type=checkbox]').parent().addClass('checked');
                $('#tblBandeja tbody tr').addClass('selected');

                $("#txt_monto_base").attr("monto", 0);
                $("#txt_monto_alt").attr("monto", 0);

                json_selec = [];

            } else {
                $('#tblBandeja tbody input[type=checkbox]').parent().removeClass('checked');
                $('#tblBandeja tbody tr').removeClass('selected');

            }

            $('#tblBandeja tbody .selecChk').each(function () {

                $(this).parent().parent().removeClass('selected');

                var pos = oTableDeudas.api(true).row($(this).parents("tr")[0]).index();
                var row = oTableDeudas.fnGetData(pos);
                var monto_base = $("#txt_monto_base").attr("monto");
                var monto_alt = $("#txt_monto_alt").attr("monto");

                if (monto_base.indexOf(',') !== -1) {
                    var re = /,/g;
                    monto_base = $('#txt_monto_base').attr('monto').replace(re, '');
                }

                if (monto_alt.indexOf(',') !== -1) {
                    var re = /,/g;
                    monto_alt = $('#txt_monto_alt').attr('monto').replace(re, '');
                }


                var moba = row.ES_MONEDA_BASE == 'N' && $("#txt_TC").val() != "" ? parseFloat(row.POR_PAGAR_ALTER) * parseFloat($("#txt_TC").val()) : parseFloat(row.POR_PAGAR_BASE);//moneda base
                if (formatoMiles(moba).indexOf(',') !== -1) {
                    var re = /,/g;
                    moba = formatoMiles(moba).replace(re, '');
                }

                var moal = row.ES_MONEDA_BASE == 'S' && $("#txt_TC").val() != "" ? parseFloat(row.POR_PAGAR_BASE) / parseFloat($("#txt_TC").val()) : parseFloat(row.POR_PAGAR_ALTER);//moneda alterna
                if (formatoMiles(moal).indexOf(',') !== -1) {
                    var re = /,/g;
                    moal = formatoMiles(moal).replace(re, '');
                }

                var valor_moba = parseFloat(monto_base == "" ? "0.00" : monto_base);
                var valor_moal = parseFloat(monto_alt == "" ? "0.00" : monto_alt);




                if ($(this).is(":checked")) {

                    $(this).parent().parent().addClass('selected');

                    valor_moba += parseFloat(moba);
                    valor_moal += parseFloat(moal);
                    json_selec.push(row);

                } else {

                    $(this).parent().parent().removeClass('selected');

                    valor_moba -= parseFloat(moba);
                    valor_moal -= parseFloat(moal);
                    json_selec.filter(function (e, f) {
                        if (e == row) { json_selec.splice(f, 1); }
                    });

                }

                $("#txt_monto_base")
                    .val("S/." + formatoMiles(valor_moba))
                    .attr("monto", formatoMiles(valor_moba));
                $("#txt_monto_alt")
                    .val("US$." + formatoMiles(valor_moal))
                    .attr("monto", formatoMiles(valor_moal));

                $("#txtMonto").keyup();

            });



        });

        function fnFormatDetails(nTr, id) {
            //var aData = oTable.fnGetData(nTr);
            var sOut = '<div id="c' + id + '"></div>';
            return sOut;
        }
    }

    var funcionalidadTablaModalNotaCredito = function () {

        $('#tblNotaCredito tbody').on('click', 'tr', function () {

            var pos = oTableModalNotaCredito.fnGetPosition(this);
            var row = oTableModalNotaCredito.fnGetData(pos);

            var element = '<li class="NotaCreditoItem" style="cursor: pointer;" id="' + row.CODIGO + '"><div class="col1">' +
                '					<div class="cont">' +
                '						<div class="cont-col1">' +
                '							<div class="label" style="background-color: #B6ADB9!important;">' +
                '								<i class="icon-ok"></i>' +
                '							</div>' +
                '						</div>' +
                '						<div class="cont-col2">' +
                '							<div class="desc">' +
                '							</div>' +
                '						</div>' +
                '					</div>' +
                '				</div></li>';


            $("#muestralistap").modal("hide");

            json_select_NotaCredito.push(row); //poner en lista seleccionado

            var val0r = $(".moneda.activo").select2("val")
            var d = 0.00; json_select_NotaCredito.filter(function (e, f) {
                var auxMonto = e.MONTO_USABLE;
                if (e.MONE_CODE != val0r && val0r !== "") {
                    if (val0r == "0002")
                        auxMonto *= parseFloat($("#txt_TC").val());
                    else {
                        auxMonto /= parseFloat($("#txt_TC").val());
                    }
                }
                d += parseFloat(auxMonto);
                return d;
            });

            var monto_base = $("#txt_monto_base").attr("monto");
            var monto_alt = $("#txt_monto_alt").attr("monto");

            if (monto_base.indexOf(',') !== -1) {
                var re = /,/g;
                monto_base = $("#txt_monto_base").attr("monto").replace(re, '');
            }

            if (monto_alt.indexOf(',') !== -1) {
                var re = /,/g;
                monto_alt = $("#txt_monto_alt").attr("monto").replace(re, '');
            }

            $("#montoNotaAgregado").html(formatoMiles(d)); //actualiza monto de notas de creditos
            if ((d + parseFloat($("#txtMonto").attr("monto"))) > parseFloat($("#cbo_moneda :selected").attr("tipo") == "MOBA" ? parseFloat(monto_base) : parseFloat(monto_alt))) {
                $("#txtMonto").attr("monto", 0.00).val("0.00");
            }
            $("#montoTotalAgregado").html(formatoMiles(d + parseFloat($("#txtMonto").attr("monto") == undefined ? 0 : $("#txtMonto").attr("monto"))))
            $("#lblMontoTotalSoloNota").attr("monto", d.toFixed(2)).html("Total: " + (($("#cbo_monedaSoloNota").val() == "0002" || $("#cbo_monedaSoloNota").val() == "") ? "S/." : "$.") + formatoMiles(d));

            //$("#divMontoAgregado").css("display", "inline-block");


            $(".NotaCreditoAgregados")
                .css("display", "block");

            $("#listaAgregados").append(element);
            $("#cbo_moneda").change();

            $("#" + row.CODIGO + " .desc").html("Nota de Crédito " + row.DOCUMENTO + " añadida. <b>|</b> " + row.MONEDA_SIMBOLO + formatoMiles(row.MONTO_USABLE));

            $("#" + row.CODIGO)
                .mouseover(function () {
                    $(this).css("background-color", "#FFC9C9");
                    $(this).find(".label").css("background-color", "#A56A6A");
                    $(this).find(".label i").removeClass("icon-ok").addClass("icon-remove");
                })
                .mouseout(function () {
                    $(this).css("background-color", "");
                    $(this).find(".label").css("background-color", "#B6ADB9");
                    $(this).find(".label i").removeClass("icon-remove").addClass("icon-ok");
                })
                .click(function () {
                    var vacio_ind = false;
                    var id = $(this).attr("id");
                    $(this).remove();
                    var d = 0.00;
                    json_select_NotaCredito.filter(function (e, d) {

                        if (e.CODIGO == id) {
                            if (json_select_NotaCredito.length == 1) { $("#divMontoAgregado").css("display", "none"); vacio_ind |= true; }

                            json_select_NotaCredito.splice(d, 1);

                        }
                    });
                    if (!vacio_ind) {
                        var val0r = $(".moneda.activo").select2("val");
                        json_select_NotaCredito.filter(function (e, f) {
                            var auxMonto = e.MONTO_USABLE;
                            if (e.MONE_CODE != val0r) {
                                if (val0r == "0002")
                                    auxMonto *= parseFloat($("#txt_TC").val());
                                else {
                                    auxMonto /= parseFloat($("#txt_TC").val());
                                }
                            }
                            d += parseFloat(auxMonto);
                            return d;
                        });
                    }

                    $("#montoNotaAgregado").html(formatoMiles(d)); ///actualiza montos de notas de credito



                    $("#montoTotalAgregado").html(formatoMiles(d + parseFloat($("#txtMonto").attr("monto") == undefined ? 0 : $("#txtMonto").attr("monto"))))

                    $("#lblMontoTotalSoloNota").attr("monto", d.toFixed(2)).html("Total: " + (($("#cbo_monedaSoloNota").val() == "0002" || $("#cbo_monedaSoloNota").val() == "") ? "S/." : "$.") + formatoMiles(d));

                });
            $("#cbo_monedaSoloNota").change();
        });

    }

    var eventos = function () {
        $("#btnCtc").click(function () {
            if (vErrors(["txt_TC"]))
                consultaDeudas();
        });

        $("#txt_TC").keypress(function (e) {
            if (e.keyCode == 13) {
                if (vErrors(["txt_TC"]))
                    consultaDeudas();
            }
        });

        $("#btnNotaCredito").click(function () {

            $("#muestralistap").modal("show");
            llenarTablaModalNotaCredito();
        });

        $("#btnGrabar").click(function () { verificaPago(); });

        $("#chkSoloNota").click(function () {
            var monto = 0.00;
            if ($(this).is(':checked')) {
                $("#form_medioPago").slideUp(true);
                var d = 0.00; json_select_NotaCredito.filter(function (e, f) {
                    d += parseFloat(e.MONTO_USABLE);
                    return d;
                });
                $("#listaAgregados").parent().append("<div id='divMonedaSoloNota' class='row-fluid NotaCreditoItem'>" + $("#divMoneda").html().split("cbo_moneda").join("cbo_monedaSoloNota") + "</div>");
                $("#s2id_cbo_monedaSoloNota").remove(); $("#cbo_monedaSoloNota").addClass("moneda").addClass("activo").css("display", "block").select2().attr("disabled", false);
                $("#cbo_moneda").removeClass("activo");

                $("#cbo_monedaSoloNota").select2("val", "0002").change(function () {
                    var val0r = $("#cbo_monedaSoloNota").val();
                    monto = 0.00; json_select_NotaCredito.filter(function (e, f) {
                        var auxMonto = e.MONTO_USABLE;
                        if (e.MONE_CODE != val0r) {
                            if (val0r == "0002")
                                auxMonto *= parseFloat($("#txt_TC").val());
                            else {
                                auxMonto /= parseFloat($("#txt_TC").val());
                            }
                        }
                        monto += parseFloat(auxMonto);
                    });
                    var moneda_simbolo = val0r == "0002" ? "S/." : "$.";
                    $("#lblMontoTotalSoloNota").attr("monto", d.toFixed(2)).html("Total: " + moneda_simbolo + formatoMiles(monto));
                });
                $("#cbo_monedaSoloNota").change();
                var moneda_simbolo = ($("#cbo_monedaSoloNota").val() == "0002" || $("#cbo_monedaSoloNota").val() == "") ? "S/." : "$.";
                $("#listaAgregados").parent().append("<div id='MontoTotalSoloNota' class='row-fluid NotaCreditoItem'><div class='span12'><label id='lblMontoTotalSoloNota'>Total: " + moneda_simbolo + formatoMiles(monto) + "</label></div></div>");
            } else {
                $("#form_medioPago").slideDown(true);
                $("#MontoTotalSoloNota, #divMonedaSoloNota").remove();
                $("#cbo_moneda").addClass("activo");
            }

        });

    }

    return {
        init: function () {
            eventos();
            plugins();
            cargarCombos();
            funcionalidad();
            cargainicial();
            funcionalidadTabla();
            funcionalidadTablaModalNotaCredito();
        }
    };
}();


function filltxtproveedor() {
    $.ajax({
        type: "post",
        url: "vistas/CP/ajax/CPMPGVA.ashx?flag=3&empresa=" + $('#slcEmpresa').val(),
        async: true,
        beforeSend: function () { Bloquear("s2id_cboProveedores"); $("#btnConsultar").attr("disabled", true); },
        success: function (datos) {
            if (datos != null) {

                $('#cboProveedores').empty();
                
                $('#cboProveedores').html(datos).select2("val", "").change();
                
            }
        },
        error: function (msg) {
            alert(msg);
        },
        complete: function () {
            Desbloquear("s2id_cboProveedores");
            $("#btnConsultar").attr("disabled", false);
        }
    });
}

//function consultaNotaCredito() {
//    $.ajax({
//        type: "post",
//        url: "vistas/CP/ajax/CPMPGVA.ashx?flag=10&empresa=" + $('#slcEmpresa').val() + "&proveedor=" + $('#cboProveedores').val() + "&establec=" + ($("#slcEstablec").val() == null ? "" : $('#slcEstablec').val().toString()),
//        async: true,
//        //beforeSend: function () { Bloquear($($("div.NotaCreditoAgregados").parents("div")[0]),"Verificando Notas de Crédito...");},
//        success: function (datos) {

//            if (datos != "SIN_NOTAS") {
//                $("#btnNotaCredito, .incluye_nota").css("display", "inline-block");
//                json_notacredito = JSON.parse(datos);
//            } else {
//                $("#btnNotaCredito, .incluye_nota").css("display", "none");
//                json_notacredito = [];

//            }

//        },
//        //complete: function () { Desbloquear($($("div.NotaCreditoAgregados").parents("div")[0]));}
//    });



//}

function consultaDeudas() {
    if ($("#cboProveedores").val() != "") {
        var oData = {
            flag: 4, empresa: $("#slcEmpresa").val(),
            proveedor: $('#cboProveedores').val() == null ? 0 : $('#cboProveedores').val(),
            establec: $("#slcEstablec").val() == null ? "" : $('#slcEstablec').val().toString(),
            fini: $("#txtFeIn").val(),
            ffin: $("#txtFeFi").val()
        };

        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMPGVA.ashx",
            data: oData,
            async: true,
            beforeSend: function () { Bloquear("div_body", "Obteniendo Deudas..."); },
            success: function (datos) {
                if (datos != "" && datos != null && datos != "[]") {
                    var json = $.parseJSON(datos);

                    if ($("#auxiliar").val() == "") {
                        $("#auxiliar").val(json[0].VALOR_TIPO_CAMBIO);
                        $("#txt_TC").val(json[0].VALOR_TIPO_CAMBIO);
                    }
                    llenarTablaDeudas(json);
                    $('#chkAll').prop('disabled', false).parent().removeClass('checked');
                } else {
                    llenarTablaDeudas(null);
                }
            },
            complete: function () { Desbloquear("div_body"); }
        });
    } else {
        llenarTablaDeudas(null);
        infoCustom2("No se ha seleccionado un proveedor!");
        $("#s2id_cboProveedores").pulsate({
            color: "#33AECD",
            reach: 20,
            repeat: 3,
            glow: true
        });
    }
    json_selec = new Array();
    $(".monto_sele").attr("monto", "0");
    $(".monto_sele").val("").change();
}

function cargatablavacia() {

    oTableDeudas = $('#tblBandeja').dataTable({
        data: null,
        columns: [
            {
                data: null,
                defaultContent: "  <img src='recursos/img/details_open.png' class='detDoc' />",
                createdCell: function (td, cellData, rowData, row, col) {

                    $(td).attr('align', 'center')

                }
            },
            {
                data: "DOCUMENTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },
            {
                data: "OPERACION",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },
            {
                data: "FECHA_VENCIMIENTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');

                },
                type: "fecha"
            },

            {
                data: "MONTO_MONE_BASE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    if (rowData.ES_MONEDA_BASE == 'N' && $("#txt_TC").val() != "") {
                        valor = parseFloat(rowData.MONTO_MONE_ALTER) * parseFloat($("#txt_TC").val());
                    } else {
                        $(td).css("background-color", "#FFF9B3");
                    }
                    $(td).html(formatoMiles(valor));
                }
            },

            {
                data: "MONTO_MONE_ALTER",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    if (rowData.ES_MONEDA_BASE == 'S' && $("#txt_TC").val() != "") {
                        valor = parseFloat(rowData.MONTO_MONE_BASE) / parseFloat($("#txt_TC").val());
                    } else {
                        $(td).css("background-color", "#FFF9B3");
                    }
                    $(td).html(formatoMiles(valor));
                }
            },

            {
                data: "POR_PAGAR_BASE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                    var valor = cellData;
                    if (rowData.ES_MONEDA_BASE == 'N' && $("#txt_TC").val() != "") {
                        valor = parseFloat(rowData.POR_PAGAR_ALTER) * parseFloat($("#txt_TC").val());
                    }
                    $(td).html(formatoMiles(valor));
                }
            },

            {
                data: "POR_PAGAR_ALTER",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    if (rowData.ES_MONEDA_BASE == 'S' && $("#txt_TC").val() != "") {
                        valor = parseFloat(rowData.POR_PAGAR_BASE) / parseFloat($("#txt_TC").val());
                    }
                    $(td).html(formatoMiles(valor));
                }
            },
            {
                data: null,
                defaultContent: '  <input type="checkbox" class="selecChk" />',
                createdCell: function (td, cellData, rowData, row, col) {

                    $(td).attr('align', 'center')

                }
            }
        ],
        "scrollY": "280px",
        "scrollCollapse": false,
        "paginate": false,
        "order": [[3, 'desc'], [6, 'desc']],

        info: false

    });

    $($("#tblBandeja_wrapper div.span6")[0]).html('<button type="button" class="btn green refreshData"><i class="icon-refresh"></i></button>');

    $(".refreshData").click(function () { consultaDeudas(); });



}

function cargatablavaciaModalNotaCredito() {

    oTableModalNotaCredito = iniciaTabla('tblNotaCredito', {
        data: null,
        columns: [

            {
                data: "DOCUMENTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    //  $(td).attr('align', 'center');
                }
            },

            {
                data: "MONTO_TOTAL",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    $(td).html(formatoMiles(valor));
                }
            },
            {
                data: "MONTO_USABLE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    $(td).html(formatoMiles(valor));
                }
            },
            {
                data: "MONEDA",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },

            {
                data: "ORIGEN_TIPO_DOC_DESC",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },

            {
                data: "DOCUMENTO_ORIGEN",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            }


        ],
        //  "scrollY": "200px", "scrollCollapse": false,
        "paging": false,
        "dom": '<"top cabecera"f><t><"clear">',

        info: false

    });
    $(".top.cabecera").append("<button class='btn green' id='btnActualizaNotaCr' type='button'><i class='icon-refresh'></i> Actualizar Datos</button>");
    $($("#tblNotaCredito").parent()).attr("id", "divtblNotaCredito");
    $("#btnActualizaNotaCr").click(function () {
        Bloquear("divtblNotaCredito");
        //consultaNotaCredito();
        //llenarTablaModalNotaCredito();
        Desbloquear("divtblNotaCredito");
    });
}

//function llenarTablaModalNotaCredito() {

//    oTableModalNotaCredito.fnClearTable();

//    var json_aux = JSON.parse(JSON.stringify(json_notacredito));

//    if (json_aux.length > 0) {
//        if (json_select_NotaCredito.length > 0) {
//            json_select_NotaCredito.filter(function (e, d) {

//                if (json_aux != []) {
//                    json_aux.filter(function (f, g) {
//                        if (f.CODIGO == e.CODIGO) {
//                            json_aux.splice(g, 1);
//                        }
//                    });


//                } else { json_aux = []; return false; }
//            });
//        }

//        if (json_aux.length > 0) { oTableModalNotaCredito.fnAddData(json_aux); oTableModalNotaCredito.fnAdjustColumnSizing(); }

//    }
//}

function cargatablavaciaDetalleF(id, json) {

    oTableDeudasDetalle = $("#" + id).dataTable({
        data: json,
        columns: [
            {
                data: { _: "FECHA.display", sort: "FECHA.order" },
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');

                }
            },
            {
                data: "ORIGEN",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },
            {
                data: "DESTINO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },
            {
                data: "FORMA_PAGO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },



            {
                data: "DOCUMENTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },


            {
                data: "MONTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    $(td).html(rowData.SIMBOLO_MONEDA + formatoMiles(valor));
                }
            }


        ],
        "paging": false,
        scrollCollapse: true,
        //  sort: false,
        "sDom": "t"

    });


}

function llenarTablaDeudas(json) {


    oTableDeudas.fnClearTable()

    if (json != null)
        oTableDeudas.fnAddData(json);

}

function nuevapersona() {

    window.open('?f=ncmpers', '_blank');

}

function verificaPago() {

    if (!eventoModalHide) { // coloca el evento si no existe

        eventoModalHide |= true;
        $("#modElijeDocu").on("hide", function () {
            if (conNotaCredito) { // si hay respuesta de pase sin nota de credito o si nota de credito se valido 
                pagar();

            } else {
                infoCustom("No se asigno ningun documento de venta a nota de crédito!");
                json_nota_dcto = new Array();
            }
        });
    }

    if ($("#chkSoloNota").is(':checked')) {

        if (!vErrorBodyAnyElement(".master .obligatorio")) { //si no hay errores en los campos oblig. 
            rpta = verificarPagoNotaCredito();
            if (rpta) pagar();

        }

    } else {
        if (!vErrorBodyAnyElement(".obligatorio") && parseFloat($("#txtMonto").attr("monto")) > 0) { //si no hay errores en los campos oblig. 
            rpta = verificarPagoNotaCredito(); //si hay respuesta inmediata
            if (rpta) {

                pagar();

            } else {
                //espera al cierre del modal

            }
        } else {
            alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
        }
    }

}

// VERIFICACIÓN DE COD. OP Y COD. AUT.
//function verificarNroOperacion(nroOpera, nroOpera2, nroOpera3) { //DPORTA 21/04/2021
//    //var respuesta = false;

//    $.ajax({
//        type: "post",
//        url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=4.5&p_NRO_OPERA=" + nroOpera + "/" + nroOpera2 + "/" + nroOpera3,
//        contenttype: "application/json;",
//        datatype: "json",
//        async: false,
//        success: function (datos) {
//            //respuesta = datos;
//            if (datos == 'OK') {
//                respuesta = datos;
//            } else {
//                respuesta = datos;
//            };
//        },
//        error: function (msg) {
//            alertCustom("Error");
//        }
//    });
//    return respuesta;

//}

function pagar() {
    //var verificaNroOpera = "";//DPORTA 21/04/2021
    cade_pagar = "";
    var p_empresa = $("#slcEmpresa").val();
    var p_user = $("#ctl00_txtus").val();
    var cade_pagoConNotacredito = "";
    var p_fecha_pago = $("#txtFechaPago").val();

    var cantidad_doc_venta = json_selec.length;
    var cantidad_notacredito = json_nota_dcto.length;

    var moneda_activa_cod = $("select.moneda.activo").val();
    var moneda_activa_tipo = $(".moneda.activo :selected").attr("tipo")
    var tc = parseFloat($("#txt_TC").val());

    var nTotaSoloNotas = json_select_NotaCredito.filter(obj => obj.MONE_CODE == moneda_activa_cod).map(obj => parseFloat(obj.MONTO_USABLE).Redondear(2))
        .concat(json_select_NotaCredito.filter(obj => obj.MONE_CODE !== moneda_activa_cod).map(obj => parseFloat(moneda_activa_cod == '0002' ? obj.MONTO_USABLE * tc : obj.MONTO_USABLE / tc).Redondear(2))).reduce((sum, obj) => (sum + obj), 0).Redondear(2);

    var nTotalMontoPagar = parseFloat($("#txtMonto").val().split(",").join(""));

    var monto_base = $("#txt_monto_base").attr("monto");
    var monto_alt = $("#txt_monto_alt").attr("monto");

    if (monto_base.indexOf(',') !== -1) {
        var re = /,/g;
        monto_base = $('#txt_monto_base').attr('monto').replace(re, '');
    }

    if (monto_alt.indexOf(',') !== -1) {
        var re = /,/g;
        monto_alt = $('#txt_monto_alt').attr('monto').replace(re, '');
    }


    var nMontoSeleccionado = $(".moneda.activo :selected").attr("tipo") == "MOBA" ? parseFloat(monto_base) : parseFloat(monto_alt);

    if (parseFloat($(".monto_sele").attr("monto")) == 0.00 || json_selec.length == 0) {

        alertCustom("No se ha seleccionado ningún documento a pagar!");

    } else {

        if ((cantidad_notacredito > 0 ? ($("#chkSoloNota").is(':checked') ? nTotaSoloNotas : nTotaSoloNotas + nTotalMontoPagar) : nTotalMontoPagar).Redondear(2) > nMontoSeleccionado) {

            alertCustom("El monto ingresado es mayor al que se ha seleccionado a cobrar!");

        } else {

            //DPORTA 21/04/2021
            //if ($("#cboMedioPago").val() == '0001' || $("#cboMedioPago").val() == '0003' || $("#cboMedioPago").val() == '0005' || $("#cboMedioPago").val() == '0006') {

            //    verificaNroOpera = verificarNroOperacion($("#cbo_OrigenPago").val().substring(0, 1) + '-' + $("#txtNroOpe").val());

            //    if (verificaNroOpera == 'OK') {
            //        let continuar = true;
            //    } else {
            //        if (verificaNroOpera.substring(0, 1) == 'B') { //BANCO
            //            infoCustom2("El Nro. de Op. " + verificaNroOpera.substring(3) + " ya se encuentra registrado en el sistema");
            //            return;
            //        } else { //CAJA
            //            infoCustom2("El Cod. de Aut. " + verificaNroOpera.substring(3) + " ya se encuentra registrado en el sistema");
            //            return;
            //        }
            //    }
            //}

            if (cantidad_notacredito > 0) {

                json_nota_dcto.filter(function (e, d) {
                    var pagado_comp_ind = 'N';


                    cade_pagoConNotacredito += ("|" + e.Nota.CODIGO + "," + e.Nota.DOCUMENTO + "," + e.monto + "," + e.Nota.MONE_CODE + "," + e.Documento.CODIGO + "," + e.Documento.SUCURSAL_CODE + ",");
                    pagado_comp_ind = e.completo;

                    json_selec.filter(function (f, g) {
                        if (f.CODIGO == e.Documento.CODIGO) {

                            if (moneda_activa_tipo == "MOBA") {
                                f.POR_PAGAR_BASE -= parseFloat(e.Nota.MONE_CODE == "0002" ? e.monto : (parseFloat($("#txt_TC").val()) * e.monto).Redondear(2));
                                if (f.POR_PAGAR_BASE <= 0) {
                                    // pagado_comp_ind = 'S';
                                    if (f.POR_PAGAR_BASE < 0) {
                                        e.monto = Math.abs(f.POR_PAGAR_BASE);
                                        f.POR_PAGAR_BASE = 0;
                                    }
                                }
                            }
                            else {
                                f.POR_PAGAR_ALTER -= parseFloat(e.Nota.MONE_CODE == "0002" ? (e.monto / parseFloat($("#txt_TC").val())).Redondear(2) : (e.monto));
                                if (f.POR_PAGAR_ALTER <= 0) {
                                    //pagado_comp_ind = 'S';
                                    if (f.POR_PAGAR_ALTER < 0) {
                                        e.monto = Math.abs(f.POR_PAGAR_ALTER);
                                        f.POR_PAGAR_ALTER = 0;
                                    }
                                }
                            }

                        }
                    });

                    cade_pagoConNotacredito += pagado_comp_ind;
                });

            }

            var json_ordenado = json_selec.sort(function (a, b) {
                if (a.FECHA_EMISION.order == b.FECHA_EMISION.order) {
                    return a.POR_PAGAR_BASE - b.POR_PAGAR_BASE;
                } else {
                    return a.FECHA_EMISION.order - b.FECHA_EMISION.order;
                }
            });


            var monto = nTotalMontoPagar;

            var ind = false;

            var ind_tipo = $("#cbo_OrigenPago").val().substring(0, 1);


            if (!$("#chkSoloNota").is(':checked')) {

                json_ordenado.filter(function (e) {

                    var monto_pb = "";
                    var monto_pp = "";
                    var monto_pa = "";
                    var moneda;


                    if (moneda_activa_tipo == "MOBA") {

                        monto_pb = parseFloat(e.ES_MONEDA_BASE == "N" ? (e.POR_PAGAR_ALTER * tc) : e.POR_PAGAR_BASE).toFixed(2);
                        monto_pp = parseFloat(monto_pb);


                    } else {

                        monto_pa = parseFloat(e.ES_MONEDA_BASE == "S" ? (e.POR_PAGAR_BASE / tc) : e.POR_PAGAR_ALTER).toFixed(2);
                        monto_pp = parseFloat(monto_pa);


                    }

                    monto -= monto_pp;



                    if (monto >= 0) {

                        cade_pagar += ("|" + e.CODIGO + "," + e.DOCUMENTO + "," + (monto_pb == "" ? 0 : monto_pb) + "," + (monto_pa == "" ? 0 : monto_pa) + "," + e.SUCURSAL_CODE + ",S");
                    }
                    else {
                        monto_pp += monto;
                        if (monto_pb != "") {
                            if (!ind) { monto_pb = monto_pp.toFixed(2); ind |= 1; }
                            else { monto_pb = 0; }
                        } else {
                            if (!ind) { monto_pa = monto_pp.toFixed(2); ind |= 1; }
                            else { monto_pa = 0; }
                        }
                        monto_pb = monto_pb == "" ? 0 : monto_pb;
                        monto_pa = monto_pa == "" ? 0 : monto_pa;
                        if (monto_pa != 0 || monto_pb != 0) {
                            cade_pagar += ("|" + e.CODIGO + "," + e.DOCUMENTO + "," + (monto_pb == "" ? 0 : monto_pb) + "," + (monto_pa == "" ? 0 : monto_pa) + "," + e.SUCURSAL_CODE + ",N");
                        }
                    }

                });

                //var p_caja = "";         
                var p_caja = $("#cbo_Det_Origen").val(); // origen
                var cod_ape = "";
                var p_moneda = $("#cbo_moneda").val();
                var medio_pa = $("#cboMedioPago").val();

                var p_destino = $("#cbDestino :selected").html();
                var p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
                var p_flag = 1;
                var adicional = "";

                var det_desc = "", pidm_cta = "", cta = "", compl = "";

                if (ind_tipo == "B") {


                    pidm_cta = $("#cbo_Det_Origen :selected").attr("pidm");
                    cta = $("#cbo_Det_Origen").val();
                    compl = "S";
                    p_flag = 1.5;

                    switch ($("#cboMedioPago").val()) {
                        case "0003": //transferencia

                            det_desc = "TRANSFERENCIA*" + "/" + $("#cboProveedores :selected").html(); //"*" + $("#cboProveedores :selected").html();

                            break;

                        case "0013": //cheques bancarios

                            det_desc = "CHEQ.PAGADOR N°:" + $("#cbDestino").val();
                            adicional = $("#cbDestino").val() + "|" + $("#cbDestino :selected").attr("tipo");
                            compl = "N";
                            p_documento = "";

                            break;

                        case "0006": //tarjeta de credito

                            det_desc = $("#cboProveedores :selected").html() + "/" + $("#cbDestino :selected").html();

                            break;

                        case "0005": // tarjeta de debito

                            det_desc = $("#cboProveedores :selected").html() + "/" + $("#cbDestino :selected").html();

                            break;
                    }
                } else if (ind_tipo == "C") {

                    cod_ape = $("#cbo_Det_Origen :selected").attr("codigo");

                }
                if (json_ordenado.DESCRIPCION == 'GASTO') {

                    var descripcion = ind_tipo == "C" ? "PAGO A BENEFICIARIO" : det_desc;

                } else {

                    var descripcion = ind_tipo == "C" ? "DEVOLUCION A CLIENTE" : det_desc;
                }
                
            } else {

                var p_flag = 1.6;
            }

            var data = new FormData();

            data.append('flag', p_flag);
            data.append('empresa', p_empresa);
            data.append('detalle', cade_pagar.substring(1));
            data.append('caja', p_caja);
            data.append('usuario', p_user);
            data.append('codigo_apertura', cod_ape);
            data.append('moneda', p_moneda);
            data.append('medio_pago', medio_pa);
            data.append('descripcion', descripcion);
            data.append('fecha_pago', p_fecha_pago);
            data.append('destino', p_destino);
            data.append('documento', p_documento);
            data.append('pidmcuenta', pidm_cta);
            data.append('cuenta', cta);
            data.append('completo', compl);
            data.append('adicional', adicional);
            data.append('monto_total', $("#txtMonto").val().split(",").join(""));
            data.append('notacredito', cade_pagoConNotacredito.substring(1));
            data.append('tipo_cambio', $("#txt_TC").val());
            data.append('RUTA_IMAGEN', $("#imgSustento").attr("src"));
            //Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/CP/ajax/CPMPGVA.ASHX",
                contentType: false,
                data: data,
                processData: false,
                beforeSend: function () { Bloquear($("#ventana"), "Procesando pago ..."); },
                cache: false
            })
                .success(function (res) {
                    Desbloquear("ventana");
                    var datos = $.parseJSON(res);

                    if (datos[0].SUCCESS != null && datos[0].SUCCESS != "" && res.indexOf("error") < 0) {
                        switch (datos[0].SUCCESS) {

                            case "NA": // Uno de los documentos no puede ser amortizado por el monto indicado
                                alertCustom("Uno de los documentos ya ha sido amortizado!");
                                break;
                            case "NG": // El monto usable de la nota de credito generica es 0
                                alertCustom("La nota de crédito genérica seleccionada no posee monto usable! ");
                                break;
                            case "NC": // El monto usable de la nota de credito es 0
                                alertCustom("La nota de crédito seleccionada no posee monto usable!");
                                break;
                            case "SI": // Saldo insuficiente caja/banco
                                alertCustom("No posee saldo suficiente en la " + ($("#cbo_OrigenPago").val().substring(0, 1) === "B" ? "cuenta" : "caja") + " seleccionada!");
                                break;
                            case "TC": // Transaccion realizada correctamente
                                if (datos[0].CODE_GENERADO != "") {
                                    consultaDeudas();
                                    json_selec = new Array();
                                    exito();
                                    $("#txt_monto_base, #txt_monto_alt, #txtMonto").val("");
                                    $("#txt_monto_base, #txt_monto_alt").attr("monto", 0.00);
                                    conNotaCredito = false;
                                    $(".gen").remove();
                                    $("#form_medioPago").css("display", "block")
                                    $("#chkSoloNota").attr("checked", false); $("#chkSoloNota").parent().removeClass("checked");
                                    $(".NotaCreditoItem").remove();
                                    $("#divMontoAgregado").css("display", "none")
                                    json_nota_dcto = new Array();
                                    json_select_NotaCredito = new Array();

                                    //consultaNotaCredito();
                                    //llenarTablaModalNotaCredito();
                                    limpiaCampos(); eventOrigenBco = false;
                                    eventOrigenCaj = false;
                                    if ($("#txtMonto").attr("placeholder") !== undefined)
                                        if ($("#txtMonto").attr("placeholder").indexOf("max.") > -1)
                                            $("#txtMonto").attr("placeholder", "max. " + (parseFloat($("#txtMonto").attr("placeholder").split("max. ")[1]) - parseFloat($("#txtMonto").val())).Redondear(2))

                                    $('.file-input-name').html("");
                                    $("#imgSustento").attr("src", "../../recursos/img/no_disponible.jpg");
                                    break;
                                } else {
                                    alertCustom("El pago no se realizó por ser Caja de otra Sucursal");
                                    break;
                                }                                 
                        }
                    }
                    else {
                        Desbloquear("ventana");
                        noexito();
                    }
                })
                .error(function () {
                    Desbloquear("ventana");
                });


            //$.ajax({
            //    type: "post",
            //    url: "vistas/CP/ajax/CPMPGPR.ASHX",
            //    data: {
            //        flag: p_flag,
            //        empresa: p_empresa,
            //        detalle: cade_pagar.substring(1),
            //        caja: p_caja,
            //        usuario: p_user,
            //        codigo_apertura: cod_ape,
            //        moneda: p_moneda,
            //        medio_pago: medio_pa,
            //        descripcion: descripcion,
            //        fecha_pago: p_fecha_pago,
            //        destino: p_destino,
            //        documento: p_documento,
            //        pidmcuenta: pidm_cta,
            //        cuenta: cta,
            //        completo: compl,
            //        adicional: adicional,
            //        monto_total: $("#txtMonto").val().split(",").join(""),
            //        notacredito: cade_pagoConNotacredito.substring(1),
            //        tipo_cambio: $("#txt_TC").val()
            //    },
            //    contenttype: "application/json;",
            //    datatype: "json",
            //    beforeSend: function () { Bloquear($("#ventana"), "Grabando Datos"); },
            //    async: true,
            //    success: function (res) {
            //        if (res != null && res != "" && res.indexOf("error") < 0) {
            //            switch (res) {

            //                case "NA": // Uno de los documentos no puede ser amortizado por el monto indicado
            //                    alertCustom("Uno de los documentos ya ha sido amortizado!");
            //                    break;
            //                case "NG": // El monto usable de la nota de credito generica es 0
            //                    alertCustom("La nota de crédito genérica seleccionada no posee monto usable! ");
            //                    break;
            //                case "NC": // El monto usable de la nota de credito es 0
            //                    alertCustom("La nota de crédito seleccionada no posee monto usable!");
            //                    break;
            //                case "SI": // Saldo insuficiente caja/banco
            //                    alertCustom("No posee saldo suficiente en la " + ($("#cbo_OrigenPago").val().substring(0, 1) === "B" ? "cuenta" : "caja") + " seleccionada!");
            //                    break;
            //                case "TC": // Transaccion realizada correctamente                             
            //                    consultaDeudas();
            //                    json_selec = new Array();
            //                    exito();
            //                    $("#txt_monto_base, #txt_monto_alt, #txtMonto").val("");
            //                    $("#txt_monto_base, #txt_monto_alt").attr("monto", 0.00);
            //                    conNotaCredito = false;
            //                    $(".gen").remove();
            //                    $("#form_medioPago").css("display", "block")
            //                    $("#chkSoloNota").attr("checked", false); $("#chkSoloNota").parent().removeClass("checked");
            //                    $(".NotaCreditoItem").remove();
            //                    $("#divMontoAgregado").css("display", "none")
            //                    json_nota_dcto = new Array();
            //                    json_select_NotaCredito = new Array();

            //                    consultaNotaCredito();
            //                    llenarTablaModalNotaCredito();
            //                    limpiaCampos(); eventOrigenBco = false;
            //                    eventOrigenCaj = false;
            //                    if($("#txtMonto").attr("placeholder") !== undefined)
            //                        if ($("#txtMonto").attr("placeholder").indexOf("max.") > -1)
            //                            $("#txtMonto").attr("placeholder", "max. " + (parseFloat($("#txtMonto").attr("placeholder").split("max. ")[1]) - parseFloat($("#txtMonto").val())).Redondear(2))
            //                    break;
            //            }
            //        }
            //        else {
            //            noexito();
            //        }
            //    },
            //    complete: function () {
            //        Desbloquear($("#ventana"))
            //    }
            //});

        }

    }

}

function cargaMediosDePago() {


    $.ajaxSetup({ async: false });
    $.post("vistas/CP/ajax/CPMPGVA.ASHX", { flag: 2 },
        function (res) {
            if (res != null && res != "" && res.indexOf("error") < 0) {


                StringMediosPago = res;

            }

        });
    $.ajaxSetup({ async: true });



}

$(document).on("change", ".slcModDocumento", function () {

    var tipoMoneda = $("select.moneda.activo :selected")[0].getAttribute("tipo");
    var codeMoneda = $("select.moneda.activo")[0].value;

    var NCSelec = this.selectedOptions[0]; // documento seleccionado
    var val0r = NCSelec.value;
    var codigoNotaCredito = this.getAttribute("scodnota");
    var notActual = json_select_NotaCredito.filter(function (e, d) { return e.CODIGO == codigoNotaCredito; })[0];
    var docActual = json_selec.filter(function (obj, d) { return obj.CODIGO == val0r; })[0];

    var montoDocuActual = notActual.MONE_CODE == codeMoneda && tipoMoneda == 'MOBA' && docActual.ES_MONEDA_BASE == 'S' ? docActual.POR_PAGAR_BASE : docActual.POR_PAGAR_ALTER;
    var montoNotaActual = parseFloat(notActual.MONTO_USABLE).Redondear(2);

    var oAmortizacionesDoc = ArrObjectValidacionDocu.filter(function (obj) { return obj.codigo == val0r; });
    var oAmortizacionesNot = ArrObjectValidacionNota.filter(function (obj) { return obj.codigo == codigoNotaCredito; });

    // actualizar montos
    montoDocuActual = parseFloat(oAmortizacionesDoc.length > 0 ?
        montoDocuActual - (oAmortizacionesDoc.length > 1 ? oAmortizacionesDoc.map(ob => ob.montoAmort).reduce((ob1, ob2) => ob1 + ob2) : oAmortizacionesDoc[0].montoAmort) :
        montoDocuActual).Redondear(2);

    montoNotaActual = parseFloat(oAmortizacionesNot.length > 0 ?
        montoNotaActual - (oAmortizacionesNot.length > 1 ? oAmortizacionesNot.map(ob => ob.montoAmort).reduce((ob1, ob2) => ob1 + ob2) : oAmortizacionesNot[0].montoAmort) :
        montoNotaActual).Redondear(2);

    //verificacion

    if (montoDocuActual >= montoNotaActual) { // se usa la nota en su totalidad para un documento / sobra para otra nota

        var flag_existe = false;
        var posicion = 0;
        json_nota_dcto.filter(function (e, d) {
            if (e.Nota.CODIGO == codigoNotaCredito && e.monto == montoNotaActual) {
                flag_existe = true;
                posicion = d;
            }
        });

        if (flag_existe) {
            json_nota_dcto.splice(posicion, 1);
        }

        ArrObjectValidacionDocu.filter(function (e, d) {
            if (e.nota == codigoNotaCredito && e.montoAmort == montoNotaActual) {
                flag_existe = true;
                posicion = d;
            }
        });

        if (flag_existe) {
            ArrObjectValidacionDocu.splice(posicion, 1);
        }


        ArrObjectValidacionDocu.push({ "codigo": val0r, "nota": codigoNotaCredito, "montoAmort": montoNotaActual });

        json_nota_dcto.push({ "Documento": docActual, "Nota": notActual, "monto": montoNotaActual, "completo": (montoNotaActual == montoDocuActual ? "S" : "N") });

    } else { // sobra dinero en la nota para otro documento

        this.setAttribute("disabled", true);

        objComboDocumentos.item(this.selectedIndex).setAttribute("disabled", true);


        //otros cbos
        $(".slcModDocumento option[value=" + val0r + "]").attr("disabled", true);
        if (oAmortizacionesDoc.length > 0) {
            $(".slcModDocumento :selected[value=" + val0r + "]").parent("select").attr("disabled", true);
        }


        ArrObjectValidacionNota.push({ "codigo": codigoNotaCredito, "montoAmort": montoDocuActual });

        json_nota_dcto.push({ "Documento": docActual, "Nota": notActual, "monto": montoDocuActual, "completo": "S" });

        // se crea otro objeto
        objComboDocumentos.setAttribute("scodnota", codigoNotaCredito);
        objComboDocumentos.setAttribute("index", oAmortizacionesNot.length);
        this.parentElement.append(objComboDocumentos.cloneNode(true));

    }

});

function verificarPagoNotaCredito() {

    // reiniciar Elementos
    json_nota_dcto = new Array();

    ArrObjectValidacionNota = new Array();
    ArrObjectValidacionDocu = new Array();



    var cantidad = json_select_NotaCredito.length; //Array que contiene a las notas de créditos agregadas
    var cantidad2 = json_selec.length; // Array de Documentos a pagar seleccionados 


    $(".gen").remove();

    if (cantidad > 0) { // si existen notas de credito

        if (cantidad2 > 1) { // si existe mas de un documento a pagar

            for (var j = 0; j < cantidad; j++) {

                objComboDocumentos = document.createElement("select")
                objComboDocumentos.setAttribute("data-placeholder", "DOCUMENTO");
                objComboDocumentos.className = "slcModDocumento obligatorio span12";
                objComboDocumentos.append(document.createElement("option"));

                for (var i = 0; i < cantidad2; i++) { // agregar documentos a oCombo
                    var objItemCombo = document.createElement("option");
                    objItemCombo.innerHTML = json_selec[i].DOCUMENTO + " <b>|</b> " + (json_select_NotaCredito[j].MONE_CODE == "0002" ? (" S/." + formatoMiles(json_selec[i].POR_PAGAR_BASE)) : (" $." + formatoMiles(json_selec[i].POR_PAGAR_ALTER)));
                    objItemCombo.value = json_selec[i].CODIGO;
                    objComboDocumentos.append(objItemCombo);
                }

                var objLabel = document.createElement("label");
                objLabel.id = "lblMod" + json_select_NotaCredito[j].CODIGO;
                objLabel.className = "slcModNotaCredito";
                objLabel.innerHTML = json_select_NotaCredito[j].DOCUMENTO + " <b>|</b> " + json_select_NotaCredito[j].MONEDA_SIMBOLO + formatoMiles(json_select_NotaCredito[j].MONTO_USABLE);

                objComboDocumentos.setAttribute("scodnota", json_select_NotaCredito[j].CODIGO);

                insertar_fila("#divbody", objLabel.outerHTML, objComboDocumentos.outerHTML);
            }

            //  $(".slcModDocumento").select2();

            $("#modElijeDocu").modal("show");

            return false;

        } else { // si existe un documento y una varias notas
            var tc = parseFloat($("#txt_TC").val());
            json_select_NotaCredito.forEach(
                function (obj) {
                    var montoLetra = parseFloat(obj.MONTO_USABLE).Redondear(2);
                    json_nota_dcto.push({ "Documento": json_selec[0], "Nota": obj, "monto": montoLetra, "completo": "N" });
                }
            );

            return true;

        }

    } else {
        if ($("#chkSoloNota").is(":checked")) {
            infoCustom("No hay ninguna nota de crédito agregada!");
        }
        else {
            return true;
        }
    }

}

function verificaNotaDcto() {

    if (!vErrorBodyAnyElement(".slcModDocumento")) {

        conNotaCredito = true;
        $("#modElijeDocu").modal("hide");

    } else {
        conNotaCredito = false;

        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
    }

}

function insertar_fila(padre, html1, html2) {

    var filaHtml = '<div class="row-fluid gen">' +
        '  <div class="span6">' +
        '      <div class="control-group ">' +
        html1 +
        '     </div>' +
        ' </div>' +
        ' <div class="span6">' +
        '     <div class="control-group ">' +
        html2 +
        '     </div>' +
        ' </div>' +
        '</div>';
    $(padre).append(filaHtml);
}

function limpiaCampos() {
    $("#cbDestino").html("<option></option>");
    $("#form_medioPago select").select2("val", "").change().attr("disabled", true);

    $("#form_medioPago input").attr("disabled", true);
    $("#cbo_OrigenPago").attr("disabled", false);
    oTableDeudas.fnClearTable();

}

function montoCajas(div) {

    $(div).append('<div id="divSaldoCaja" class="row-fluid det_saldos" style="display:none; padding-left: 1em; margin-bottom: 10px; width: 95%;  background-color: rgb(238, 238, 238);">' +
        '<div class="span6"><div class="control-group"><div class="controls"><div class="input-prepend">' +
        '<span class="add-on Rojo">S/.' +
        '</span><input readonly style="border-color: #9A0101;" class="m-wrap span9" id="txtMontoDisponibleMOBA" type="text">' +
        '</div></div></div></div><div class="span5"><div class="control-group"><div class="controls"><div class="input-prepend">' +
        '<span class="add-on Azul">US$' +
        '</span><input class="m-wrap span9" readonly style="border-color: #2822BF;" id="txtMontoDisponibleMOAL" type="text"></div></div></div></div></div>');

}

function montoCtas(div) {

    $(div).append('<div id="divSaldoCtas" class="row-fluid det_saldos" style="display:none; padding-left: 1em; margin-bottom: 10px; width: 95%;  background-color: rgb(238, 238, 238);">' +
        '<div class="span9"><div class="control-group"><div class="controls"><div class="input-prepend">' +
        '<span class="add-on Rojo">S/.' +
        '</span><input readonly style="border-color: #9A0101;" class="m-wrap span9" id="txtMontoDisponibleCta" type="text">' +
        '</div></div></div></div></div></div>');

}
var prodActual = {};
var asincrono = true;//clientes y responsablesPago
var gImporteCobrar = 0;
var jsonClientes = [];
var validarStockInd = "S";
var paramStock = -1;
var stockReal = 0;


//EQUIVALENCIA DE UNIDADES
var equivalencias = [];

carga_ini_ind = false;

const sCodModulo = "0001";

function fillcboUniMedida(codUniMed) {
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LUNPRO&COD_UNI=" + codUniMed,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cbo_und_medida').empty();
            $('#cbo_und_medida').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cbo_und_medida').append('<option value="' + datos[i].CODUNI2 + '" equivalencia="' + datos[i].EQUI + '">' + datos[i].UNIDAD_MEDIDA + '</option>');
                }
            }
            $('#cbo_und_medida').select2('val', "");
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var fillcboMoneda = function () {
    $('#cbo_moneda').select2('destroy');
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cbo_moneda').empty();
            $('#cbo_moneda').append('<option></option>');
            if (datos != null) {
                var pos = 0;
                for (var i = 0; i < datos.length; i++) {
                    $('#cbo_moneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                    if (datos[i].TIPO == "MOBA") { pos = i; }
                }
            }
            $('#cbo_moneda').val(datos[pos].CODIGO);
            ListarValorCambio($('#cbo_moneda').val());
            ListarValorCambioOficial($('#cbo_moneda').val());
        },
        error: function (msg) {
            alertCustom("Monedas no se listaron correctamente.");
        }
    });
    $('#cbo_moneda').select2();
}

function fillEquivalenciasUnidades() {
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/nmmequn.ashx?flag=6",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {

            if (datos != null) {

                equivalencias.push(datos);
            } else {
                alertCustom("Por favor de Registrar sus equivalencias de unidades que va utilizar");
            }
        },
        error: function (msg) {
            alertCustom("Error listar las equivalencias de unidades de medida.");
        }
    });
}

function calcula_factor_conversion(um_prod, um_venta) { //um_prod = unidad medida del producto
    var factor = 1;
    var encontrado = false;
    if (equivalencias.length > 0) {
        for (var i = 0; i < equivalencias[0].length; i++) {
            if (equivalencias[0][i].UNIDAD_MEDIDA.CODIGO == um_prod && equivalencias[0][i].UNIDAD_MEDIDA_EQ.CODIGO == um_venta) {
                factor = (1 / parseFloat(equivalencias[0][i].EQUIVALENCIA));
                encontrado = true;
                break;
            }
            if (equivalencias[0][i].UNIDAD_MEDIDA_EQ.CODIGO == um_prod && equivalencias[0][i].UNIDAD_MEDIDA.CODIGO == um_venta) {
                factor = parseFloat(equivalencias[0][i].EQUIVALENCIA);
                encontrado = true;
                break;
            }
            if (um_prod == um_venta) {
                factor = 1;
                encontrado = true;
                break;
            }
        }
    }
    if (!encontrado) {
        infoCustom("No se ha registrado equivalencia para la unidad de medida seleccionada!")
        $("#cbo_und_medida").select2("val", um_prod);
    }
    return factor;
}


var fillCboDirecciones = function (pidm) {
    Bloquear("div_direccion");
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=7&PIDM=" + pidm,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            Desbloquear("div_direccion");
            $('#cbo_direccion').empty();
            $('#cbo_direccion').append('<option></option>');
            var codigo = "";
            if (!isEmpty(datos)) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cbo_direccion').append('<option value="' + datos[i].Secuencia + '" latitud="' + datos[i].LATITUD + '"  longitud="' + datos[i].LONGITUD + '" >' + datos[i].Direccion + '</option>');
                }
                codigo = datos[0].Secuencia;
            }
            $('#cbo_direccion').select2('val', codigo);
            $('#cbo_direccion').change();
        },
        error: function (msg) {
            Desbloquear("div_direccion");
            infoCustom2("No existen direcciones registradas para el cliente seleccionado.");
        }
    });
}

var NVMDOVR = function () {

    var plugins = function () {
        $('#cbo_Empresa, #cbo_Sucursal,#cboVendedor, #cbo_modo_pago, #cboDocumentoVenta,  #cbo_moneda, #cbo_und_medida,  #cboTipoDoc,#cbo_correlativo,#cboSerieDocVenta').select2();
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_vig').datepicker();

        $('#txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_vig').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento,#txtFechaPago').datepicker("setDate", "now");
        CargarFactorImpuestoRentaVenta();

        //plugins cobro
        //$('#txtFechaPago').datepicker("setDate", new Date()).datepicker("setEndDate", "now");
        $('#txtFechaPago').datepicker();

        $('#cbo_OrigenPago').select2();
        $('#cboMedioPago').select2();
        $('#cbo_Det_Origen').select2();
        $('#cboCtaEmpresa').select2();
        $("#txtMonto").keypress(function (e) { return (ValidaDecimales(e, this, 2)); })

        $('#cbo_direccion').select2();
    }

    var fillCboEmpresa = function () {
        var select = $('#cbo_Empresa').select2('destroy');
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNVMDOCV");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $(select).empty();
                    $(select).append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNVMDOCV", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $(select).append('<option value="' + datos[i].CODIGO + '" agente-reten-ind="' + datos[i].AGENTE_RETEN_IND + '" data-pidm="' + datos[i].PIDM + '" direccion="' + datos[i].DIRECCION + '" ruc="' + datos[i].RUC + '" ruta="' + datos[i].RUTA_IMAGEN + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $(select).val($('#ctl00_hddctlg').val());
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente.");
                }
            });
        }
        else {
            $(select).empty().append('<option></option>');
            dPermanente = JSON.parse(dPermanente);
            for (var i = 0; i < dPermanente.length; i++) {
                $(select).append('<option value="' + dPermanente[i].CODIGO + '" agente-reten-ind="' + dPermanente[i].AGENTE_RETEN_IND + '" data-pidm="' + dPermanente[i].PIDM + '" direccion="' + dPermanente[i].DIRECCION + '" ruc="' + dPermanente[i].RUC + '" ruta="' + dPermanente[i].RUTA_IMAGEN + '">' + dPermanente[i].DESCRIPCION + '</option>');
            }
            $(select).val($('#ctl00_hddctlg').val());
        }
        $(select).select2();
    }

    var fillcboRegistroEspecifico = function (opcion) {
        var select = $('#cboDocumentoVenta').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG=" + $('#cbo_Empresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '" fecha-elec="' + datos[i].FECHA_ELEC + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
                $(select).select2('val', '');
            },
            error: function (msg) {
                alertCustom("Documentos de registro no se listaron correctamente.");
            }
        });
        $(select).select2();
    }

    var fillCboModoPago = function () {
        $('#cbo_modo_pago').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=4",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#cbo_modo_pago').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].CODIGO == "0001" || datos[i].CODIGO == "0002") {
                            $('#cbo_modo_pago').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                }
                $('#cbo_modo_pago').val(datos[0].CODIGO).change();
            },
            error: function (msg) {
                alertCustom("Modos de pago no se listaron correctamente.");
            }
        });
        $('#cbo_modo_pago').select2();
    }

    //DocumentosIdentidad
    var fillCboTipoDoc = function () {
        Bloquear("divCboTipoDoc");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOID",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboTipoDoc");
                $('#cboTipoDoc').empty();
                $('#cboTipoDoc').append('<option></option>');
                var codigo = "";
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoDoc').append('<option value="' + datos[i].CODIGO + '" data-sunat="' + datos[i].CODIGO_SUNAT + '">' + datos[i].DESC_CORTA + '</option>');
                    }
                    codigo = datos[0].CODIGO;
                }
                $('#cboTipoDoc').select2('val', codigo);
                $('#cboTipoDoc').change();
            },
            error: function (msg) {
                Desbloquear("divCboTipoDoc");
                alertCustom("Documentos de Identidad no se listaron correctamente.");
            }
        });
    }

    var cargarCorrelativo = function () {
        var select = $('#cboSerieDocVenta');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CORR&CTLG=" + $('#cbo_Empresa').val() + "&SCSL=" + $('#cbo_Sucursal').val() + "&TIPO_DCTO=" + $("#cboDocumentoVenta").val(),
            contenttype: "application/json;",
            async: false,
            datatype: "json",
            success: function (datos) {
                limpiarCorrelativo();
                $(select).empty();
                $(select).append('<option></option>');
                if (datos != null && datos != "" && typeof datos[0].SERIE != "undefined") {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '" data-formato="' + datos[i].FORMATO + '"   data-actual="' + datos[i].VALOR_ACTUAL + '"  data-fin="' + datos[i].VALOR_FIN + '"  data-ind="' + datos[i].CORRELATIVO + '">' + datos[i].SERIE + '</option>');
                    }
                    $(select).removeAttr("disabled");
                    $(select).select2("val", "");
                }
                else {
                    limpiarCorrelativo();
                }
                //CARGA POR DEFECTO
                if ($('#cboSerieDocVenta option').length > 0) {
                    var cbo = $('#cboSerieDocVenta option');
                    for (var i = 0; i < cbo.length; i++) {
                        if ($(cbo[i]).attr("data-ind") == "S") {
                            $('#cboSerieDocVenta').select2("val", $(cbo[i]).val()).change();
                            break;
                        }
                    }
                }
            },
            error: function (msg) {
                alertCustom("La Serie y Número correlativos no se obtuvieron correctamente.");
            }
        });
    }

    var limpiarCorrelativo = function () {
        $("#txtNroDocVenta").val("");
        $("#cboSerieDocVenta").select2("val", "");
        $("#lblTipoCorrelativo").html("");
    }

    var calcularFechaVencimiento = function () {
        if ($("#txt_plazo_pago").val() > 0) {
            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=FECHAX&p_PLAZO=" + $("#txt_plazo_pago").val() + "&p_FECHA_EMISION=" + $("#txt_fec_emision").val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null) {
                        $("#txt_fec_vencimiento").val(datos[0].FECHANUEVA);
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    }

    var eventoControles = function () {
        var fechaEmisionAnterior = "";
        var empresaAnterior = "";
        var dctoOrigenAnterior = "x";

        $('#btn_act_direccion').on('click', function () {
            if (vErrors(["txtClientes"])) {
                fillCboDirecciones($("#hfPIDM").val());
            }
        });

        $('#chkTodos').click(function () {
            var checked = $(this).is(':checked');
            //$('#btnEliminarDetalles').prop('disabled', !checked);
            $('#tabla_det tbody input[type=checkbox]').prop('checked', checked);
            if (checked) {
                $('#tabla_det tbody input[type=checkbox]').parent().addClass('checked');
                $('#tabla_det tbody tr').addClass('seleccionado');
            } else {
                $('#tabla_det tbody input[type=checkbox]').parent().removeClass('checked');
                $('#tabla_det tbody tr').removeClass('seleccionado');
            }
        });

        $('#cbo_Empresa').on('change', function () {
            if ($(this).val() != empresaAnterior) {

                limpiarCorrelativo();
                ListarSucursales($('#cbo_Empresa').val());
                fillcboRegistroEspecifico('VENT');

                if (ObtenerQueryString("codigo") == undefined) {
                    fillTxtCliente("#txtClientes", "");
                    fillTxtResponsablePago();
                }
                else {
                    asincrono = false;
                    fillTxtCliente("#txtClientes", "");
                    fillTxtResponsablePago();
                    asincrono = true;
                }
                if ($("#hfPIDM").val() != "") {
                    filltxtdescproducto('');
                }
                cargarJsonEmpleado($(this).val());
                empresaAnterior = $(this).val();

                $("#cbo_OrigenPago").change();
                CargarDatosCobroPorDefecto();
                fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", true);
            }
        });

        $('#cbo_Sucursal').on('change', function () {
            if ($('#cbo_Empresa').val() != "" && $('#cbo_Sucursal').val() != "") {
                LimpiarCamposDetalle();
                if ($("#hfPIDM").val() != "") {
                    filltxtdescproducto('');
                }
                if (ObtenerQueryString("codigo") != undefined) {
                    if ($("#hfCompletoInd").val() == "S") {
                        fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "", false);
                    } else {
                        fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", false);
                    }
                } else {
                    fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", true);
                }

                cargarCorrelativo();

                // funcion para obtener el igv del establecimiento
                obtenerIGVEstablecimiento();


            }
        });

        $('#cbo_moneda').on('change', function () {
            ListarValorCambio($('#cbo_moneda').val());
            ListarValorCambioOficial($('#cbo_moneda').val());
            $('#simbolo_moneda').text($('#cbo_moneda :selected').attr('simbolo'));
        });

        $("#btnverempl").click(function () {
            if (vErrorsNotIcon("txtClientes")) {
                BuscarEmpresa($("#hfPIDM").val());
            }
        });

        $("#btnEFac").click(function () {
            GenerarDocFacturacion();
        });

        $('#cboSerieDocVenta').on('change', function () {
            $("#txtNroDocVenta").val("");
            if ($("#cboSerieDocVenta").val() != "") {
                $("#txtNroDocVenta").val($("#cboSerieDocVenta :selected").attr("data-actual"));

                var tipo = $("#cboSerieDocVenta :selected").attr("data-ind");
                var cod = $("#cboSerieDocVenta :selected").val();
                if (tipo == "S") {
                    $("#lblTipoCorrelativo").html("[" + cod + "] Por Establecimiento");
                } else if (tipo == "C") {
                    $("#lblTipoCorrelativo").html("[" + cod + "] Por Caja");
                } else if (tipo == "V") {
                    $("#lblTipoCorrelativo").html("[" + cod + "] Por Vendedor");
                }
            }
        });

        $('#cboDocumentoVenta').on('change', function () {

            $('#cboSerieDocVenta').removeAttr("disabled");
            $('#cboSerieDocVenta').empty().append('<option></option>').select2("val", "");
            $("#txtNroDocVenta").val("");
            cargarCorrelativo();
        });

        $("#chkResponsablePago").on('change', function () {
            if ($("#hfPIDM").val() == "") {
                vErrorsNotMessage(['txtClientes'])
                alertCustom("Seleccione un cliente válido para continuar.")
                $("#txtClientes").focus();
                if ($(this).is(":checked")) {
                    $(this).prop("checked", false).parent().removeClass("checked");
                }
                return false;
            }
            if ($(this).is(":checked")) {
                $("#txtResponsablePago").removeAttr("disabled");
                $("#txtResponsablePago").focus();
            } else {
                $("#txtResponsablePago").attr("disabled", "disabled");
                $("#txtResponsablePago").val("");
                $("#txtClientes").keyup().siblings("ul").children("li").click();
            }
        });

        $('#cbo_modo_pago').on('change', function () {
            $("#txt_plazo_pago").attr("disabled", true);
            $("#txt_fec_vencimiento").attr("disabled", true);
            $("#divAlCredito").hide();
            if ($('#cbo_modo_pago').val() == "0001") {
                $("#txt_fec_vencimiento").val($("#txt_fec_emision").val());
                $('#txtFechaPago').datepicker("setDate", "now");
                CargarDatosCobroPorDefecto();
                $("#txtMonto").val($("#lblImporteCobrar").html());
                $("#txt_plazo_pago").val('0');
            } else {
                CargarDatosLineaCredito();
                calcularFechaVencimiento();
                $("#txtFechaPago").val("");
                $("#cbo_OrigenPago").select2("val", "").change().removeAttr("disabled");
                $("#cbo_Det_Origen").empty().select2("val", "").attr("disabled", "disabled");
                $("#cboMedioPago").empty().select2("val", "").attr("disabled", "disabled");
                $("#txtDestino").val("").attr("disabled", "disabled");
                $("#txtMonto,#txtNroOpe").val("");
                $("#lbl_detalle1").html("-");
                $("#p_DatCobro input").parent().parent().removeClass("error");
                $("#p_DatCobro select").parent().parent().removeClass("error");
                $("#p_DatCobro .icon-ok").parent().remove();
                $("#divAlCredito").show();
            }
            if ($("#chkDespachoVenta").is(":checked") && $("#cbo_modo_pago").val() == "0001") {
                $("#msgCobro").html("*Obligatorio");
            }
            else {
                $("#msgCobro").html("");
            }
        });

        $("#txt_fec_emision").on("change", function () {
            if ($("#txt_fec_emision").val() != fechaEmisionAnterior) {
                CargarFactorImpuestoRentaVenta();
                if ($("#cbo_modo_pago").val() == "0001") {
                    $("#txt_fec_vencimiento").val($("#txt_fec_emision").val());
                } else {
                    calcularFechaVencimiento();
                }
                fechaEmisionAnterior = $("#txt_fec_emision").val();
            }
        });

        //Actualiza el plazo de pago al presionar "Enter"
        $('#txt_plazo_pago').bind('keypress', function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) { //Enter keycode
                calcularFechaVencimiento();
            }
        });

        $("#chkDespachoVenta").on("change", function () {
            CamposProductosSeriados();
            if ($("#chkDespachoVenta").is(":checked") && $("#cbo_modo_pago").val() == "0001") {
                $("#msgCobro").html("*Obligatorio");
                validarStockInd = "S";
            }
            else {
                $("#msgCobro").html("");
                //Si es venta sin despacho
                if (!$("#chkDespachoVenta").is(":checked")) {
                    validarStockInd = "N";
                } else {
                    validarStockInd = "S";
                }
            }
        });

        $("#rbRedondeo").on("change", function () {
            $('#rbDonacion').prop('checked', false).parent().removeClass('checked');
            $("#rbRedondeo").is(":checked") ? $("#txtRedondeo2").val($("#txtRedondeo").val()) : $("#txtRedondeo2").val("0.00");
            $("#rbDonacion").is(":checked") ? $("#txtDonacion2").val($("#txtDonacion").val()) : $("#txtDonacion2").val("0.00");

            var importeCobrar = parseFloat(gImporteCobrar);

            if ($(this).is(":checked")) {
                importeCobrar += parseFloat($("#txtRedondeo").val());
            }

            if ($('#rbDonacion').is(":checked")) {
                importeCobrar -= parseFloat($("#txtDonacion").val());
            }
            //--
            $("#txt_monto_total").val(importeCobrar.toFixed(2))
            $("#lblImporteCobrar").html($("#txt_monto_total").val());

        });

        $("#rbDonacion").on("change", function () {
            $('#rbRedondeo').prop('checked', false).parent().removeClass('checked');
            $("#rbRedondeo").is(":checked") ? $("#txtRedondeo2").val($("#txtRedondeo").val()) : $("#txtRedondeo2").val("0.00");
            $("#rbDonacion").is(":checked") ? $("#txtDonacion2").val($("#txtDonacion").val()) : $("#txtDonacion2").val("0.00");

            var importeCobrar = parseFloat(gImporteCobrar);

            if ($(this).is(":checked")) {
                importeCobrar += parseFloat($("#txtDonacion").val());
            }

            if ($('#rbRedondeo').is(":checked")) {
                importeCobrar -= parseFloat($("#txtRedondeo").val());
            }
            //--                     
            $("#txt_monto_total").val(importeCobrar.toFixed(2))
            $("#lblImporteCobrar").html($("#txt_monto_total").val());
        });

        $("#tabDetalleComp").on("click", function () {
            CalcularDatosMonetarios();
        });

        //-------------Eventos "Enter"-------------
        $('#txt_cantidad').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 13 && $(this).val() != '') {
                if (prodActual != null) {
                    if (prodActual.PRECIO_IND == "E") {
                        $('#txtPrecioUnitario').focus().select();
                    } else {
                        $('#txt_glosa_det').focus();
                    }
                } else {
                    $('#txt_glosa_det').focus();
                }
            }
            //CalcularDescuento
            if ($("#txt_cantidad").val() != "" && $("#txtPrecioUnitario").val() != "") {
                var totalBruto = parseFloat($("#txt_cantidad").val()) * parseFloat($("#txtPrecioUnitario").val());
                var montoDescuento = 0;
                if (typeof prodActual.DESCUENTO != "undefined") {
                    if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                        //Si la sucursal es Exonerada los precios de los productos ya no contienen IGV                       
                        montoDescuento = totalBruto * (parseFloat(prodActual.DESCUENTO) / 100);
                    } else {

                        if (prodActual.TIPO_BIEN == "EXO" || prodActual.TIPO_BIEN == "INA") {
                            montoDescuento = totalBruto * (parseFloat(prodActual.DESCUENTO) / 100);
                        } else {
                            //El total bruto contiene IGV pues el producto está GRAVADO
                            var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                            montoDescuento = (totalBruto / (decimalIGV + 1)) * (parseFloat(prodActual.DESCUENTO) / 100);
                        }
                    }

                    $("#txt_descuento_det").val(montoDescuento.toFixed(2));
                }
            }
        });

        $('#txt_descuento_det').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13) {
                if ($(this).val() === '') { $(this).val('0') }
                $('#txtPrecioUnitario').focus();
            }
        });

        $('#txt_glosa_det').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13) {
                $('#A1').focus();
            }
        });
        //-------------Fin Eventos "Enter"-------------

        //Limpia Documento y Numero de Identidad del cliente       
        $('#cboTipoDoc').change(function () {
            $("#txtNroDctoCliente").focus();
            var valor = $(this).val();
            switch (valor) {
                case "1": //DNI                            
                    var numDoc = $("#txtNroDctoCliente").val().substring(0, 1);
                    if (numDoc == 2) {
                        $("#lblHabido").html("");
                        $("#lblEstado").html("");
                        $('#cboDocumentoVenta').val("").change();
                        $("#hfPIDM").val("");
                        $("#hfAgenteRetencionCliente").val("");
                        $("#hfCodigoCategoriaCliente").val("");
                        $("#hfCodigoTipoDocumento").val("");
                        $("#hfTipoDocumento").val("");
                        $("#hfNroDocumento").val("");
                        $("#hfRUC").val("");
                        $("#hfDIR").val("");
                        $("#txtNroDctoCliente").val("");
                        $("#txtClientes").val("");
                        $('#cbo_direccion').val("").change();

                    } else {
                        $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
                    }
                    break;
                case "6": //RUC
                    $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
                    break;
                case "4": //CARNE EXTRANJ.
                    $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
                    break;
                case "7": //PASAPORTE
                    $("#txtNroDctoCliente").inputmask({ "mask": "#", "repeat": 9, "greedy": false });
                    break;
                case "11"://PARTIDA
                    $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
                    break;
            }

            var tipo = $(this).val();
            if (tipo === '6') {
                $('#txtNroDctoCliente').val($("#hfRUC").val());
            } else {
                if ($("#hfCodigoTipoDocumento").val() == tipo) {
                    $('#txtNroDctoCliente').val($("#hfNroDocumento").val());
                } else {
                    $('#txtNroDctoCliente').val("");
                }
            }

            //if ($('#cboTipoDoc').val() == '6') {
            //    $("#cboDocumentoVenta option[value=0001]").removeAttr("disabled");
            //    $("#cboDocumentoVenta option[value=0003]").attr("disabled", "disabled");
            //} else {
            //    $("#cboDocumentoVenta option[value=0003]").removeAttr("disabled");
            //    $("#cboDocumentoVenta option[value=0001]").attr("disabled", "disabled");
            //}

            if ($('#cboTipoDoc').val() == '6') {
                $("#cboDocumentoVenta option:not([value=0001])").attr("disabled", "disabled");
                $("#cboDocumentoVenta option[value=0012]").removeAttr("disabled");
                $("#cboDocumentoVenta option[value=0001]").removeAttr("disabled");

                var oItems = $('#cboDocumentoVenta option');
                for (var i = 0; i < oItems.length; i++) {
                    if (oItems[i].value === "0012") {
                        $("#cboDocumentoVenta").select2("val", "0012").change();
                    } else {
                        $("#cboDocumentoVenta").select2("val", "0001").change();
                    }

                }

            } else {
                $("#cboDocumentoVenta option:not([value=0001])").removeAttr("disabled");
                $("#cboDocumentoVenta option[value=0001]").attr("disabled", "disabled");

                var oItems = $('#cboDocumentoVenta option');
                for (var i = 0; i < oItems.length; i++) {
                    if (oItems[i].value === "0012") {
                        $("#cboDocumentoVenta").select2("val", "0012").change();
                    } else {
                        $("#cboDocumentoVenta").select2("val", "0003").change();
                    }

                }
            }

        });

        $("#txtNroDctoCliente").live("keyup", function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if ($(this).val() != "") {
                if (key === 13) {
                    BuscarClientexDocumento();
                }
            }
        });

        //Actualiza los campos para productos seriados
        $("#cbo_correlativo").on('change', function () {

            if ($("#cbo_correlativo").val() == 'L') {    //Insert por lista detallada

                $("#hfTIPO_INSERT").val("LISTA");
                $("#div_txt_serie_sec").css("display", "none");
                $("#div_correlativos").attr("class", "span8");
                $("#div_correlativos").html('<select id="cboBuscar" class="span12" multiple></select>');

                $("#txt_serie").val("");
                $('#cboBuscar').select2();
                $("#s2id_cboBuscar").css("display", "inline-table");
                //Listar productos seriados para el producto elegido
                var prodCode = $("#hfCOD_PROD").val();
                $.ajax({
                    type: "post",
                    url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#cbo_Empresa').val() + "&SCSL=" + $('#cbo_Sucursal').val() + "&SERIADO_IND=S" + "&PROD_CODE=" + prodCode,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: false,
                    success: function (datos) {
                        var obj = '';
                        if (datos != null) {
                            for (var i = 0; i < datos.length; i++) {
                                $('#cboBuscar').append('<option value="' + datos[i].CODIGO_SERIADO + '">' + datos[i].CODIGO_BARRAS + '</option>');
                            }
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                });

                $('.checkbox').attr("style", "padding:3px 20px 3px 30px !important");
                $('#cboBuscar').on('change', function () {
                    $('#txt_serie').val($(this).val());
                    //TODO        

                });
            }
        });

        //---------------------

        $("#p_DatCredito .portlet-title").on("click", function () {
            $("#p_DatCredito .portlet-body").slideToggle();
            if ($("#p_DatCredito .portlet-title i").hasClass("icon-chevron-down")) {
                $("#p_DatCredito .portlet-title i").removeClass("icon-chevron-down");
                $("#p_DatCredito .portlet-title i").addClass("icon-chevron-up");
            }
            else {
                $("#p_DatCredito .portlet-title i").addClass("icon-chevron-down");
                $("#p_DatCredito .portlet-title i").removeClass("icon-chevron-up");
            }
        });

        $("#p_DatTributaciones .portlet-title").on("click", function () {
            $("#p_DatTributaciones .portlet-body").slideToggle();
            if ($("#p_DatTributaciones .portlet-title i").hasClass("icon-chevron-down")) {
                $("#p_DatTributaciones .portlet-title i").removeClass("icon-chevron-down");
                $("#p_DatTributaciones .portlet-title i").addClass("icon-chevron-up");
            }
            else {
                $("#p_DatTributaciones .portlet-title i").addClass("icon-chevron-down");
                $("#p_DatTributaciones .portlet-title i").removeClass("icon-chevron-up");
            }
        });

        $("#p_DatCobro .portlet-title").on("click", function () {
            $("#p_DatCobro .portlet-body").slideToggle();
            if ($("#p_DatCobro .portlet-title i").hasClass("icon-chevron-down")) {
                $("#p_DatCobro .portlet-title i").removeClass("icon-chevron-down");
                $("#p_DatCobro .portlet-title i").addClass("icon-chevron-up");
            }
            else {
                $("#p_DatCobro .portlet-title i").addClass("icon-chevron-down");
                $("#p_DatCobro .portlet-title i").removeClass("icon-chevron-up");
            }
        });

        $("#btnLimpiarCobro").on("click", function () {

            $("#txtFechaPago").val("");
            $("#cbo_OrigenPago").select2("val", "").change().removeAttr("disabled");
            $("#cbo_Det_Origen").empty().select2("val", "").attr("disabled", "disabled");
            $("#cboMedioPago").empty().select2("val", "").attr("disabled", "disabled");
            $("#txtDestino").val("").attr("disabled", "disabled");
            $("#txtMonto,#txtNroOpe").val("");
            $("#lbl_detalle1").html("-");

            $("#p_DatCobro input").parent().parent().removeClass("error");
            $("#p_DatCobro select").parent().parent().removeClass("error");
            $("#p_DatCobro .icon-ok").parent().remove();
        })

        $("#btnActualizarProductos").on("click", function () {
            if (vErrors(['cbo_Sucursal', 'cbo_Empresa'])) {
                LimpiarCamposDetalle();
                filltxtdescproducto('');
            }
        });

        $("#btnRecargarPersona").on("click", function () {
            $("#hfPIDM").val("");
            fillTxtCliente("#txtClientes", "");
            fillTxtResponsablePago();
            if ($("#chkResponsablePago").is(":checked")) {
                $("#chkResponsablePago").click();
                $("#chkResponsablePago").parent().removeClass("checked");
            }
            $("#txtClientes").val("").keyup();
            $("#cbo_direccion").empty().html("<option></option>")
            $("#cbo_direccion").select2("val", "")
        });

        //EMAIL
        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtcontenido').val("");
            $('#txtAsunto').val($('#txt_comentario').val());
            cargarCorreos();
            $('#divMail').modal('show');
        });

        $("#btnHabido").on("click", function () {
            if (vErrors(["cboTipoDoc", "txtNroDctoCliente"])) {
                if ($("#cboTipoDoc").val() == "6") {
                    $("#modal-habido").modal("show");
                    MuestraSunat();
                } else {
                    infoCustom2("Debe seleccionar RUC como documento de identidad para consultar.")
                }
            }
        });

        $("#btnActualizarDS").on("click", function () {
            if (vErrors(["cboTipoDoc", "txtNroDctoCliente"])) {

                if ($("#cboTipoDoc").val() == "6") {
                    var pidm = $("#hfPIDM").val();
                    var condSunat = $("#spanVerificando").text();
                    var estadoSunat = $("#lblEstadoSunat").text();
                    fnActualizarDatosContribuyente(pidm, condSunat, estadoSunat);
                } else {
                    infoCustom2("Debe seleccionar RUC como documento de identidad para consultar.")
                }
            }
        });

        $('#btnagregarAnticipoDetalle').click(function (e) {
            //$('#txtcontenido').attr('disabled', false);
            //$('#txtAsunto').val("DOCUMENTO DE VENTA");
            //cargarCorreos();            
            ListarAnticipos();
            $('#divAnticipos').modal('show');
        });

        $("#chkBonificacion").on("change", function () {
            if ($("#chkBonificacion").is(":checked")) {
                $("#chkMuestra").attr("disabled", true)
            } else {

                $("#chkMuestra").attr("disabled", true)

            }
        });

        $("#chkMuestra").on("change", function () {
            if ($("#chkMuestra").is(":checked")) {
                $("#chkBonificacion").attr("disabled", true)
            } else {

                $("#chkBonificacion").attr("disabled", true)

            }
        });

        $("#cbo_und_medida").on("change", function () {

            let equi = parseFloat($('#cbo_und_medida option:selected').attr('equivalencia'));
            let precio = parseFloat($('#txtPrecioUnitInicio').val());
            let precio_unitario = equi * precio;
            $('#txtPrecioUnitario').val(precio_unitario.toFixed(2));
            $('#hfCodUnd_Producto').val($("#cbo_und_medida").val());


            if ($("#hfCompletoInd").val() == "N") {
                if (prodActual.CODIGO != undefined && prodActual.CODE_UNIDAD != undefined) {
                    if ($("#cbo_und_medida").val() != "") {
                        calcula_factor_conversion(prodActual.CODE_UNIDAD, $("#cbo_und_medida").val());
                    }
                }
            }
        });

        $('#btnGenerarAsiento').on('click', function () {
            let sCodVenta = $("#txtNumDctoComp").val();
            sCodVenta = $.trim(sCodVenta);
            if (sCodVenta === "") {
                infoCustom("Imposible continuar. ¡El documento no está completado!");
                return;
            }

            if (!vErrors(['txtNumDctoComp'])) {
                return;
            }

            let aoDocVta = fnGetDocVta(sCodVenta);
            if (aoDocVta.length === 0) {
                infoCustom("No se encontró el Documento: " + sCodVenta);
                return;
            }

            let sAnuladoInd = aoDocVta[0].AnuladoInd;
            if (sAnuladoInd === "S") {
                infoCustom("Imposible continuar. ¡El documento está anulado!");
                return;
            }

            let sCompletoInd = aoDocVta[0].CompletoInd;
            if (sCompletoInd === "N") {
                infoCustom("Imposible continuar. ¡El documento no está completado!");
                return;
            }

            let sCodMovContab = aoDocVta[0].MOVCONT_CODE;
            sCodMovContab = (sCodMovContab === null ? "" : sCodMovContab);
            if (sCodMovContab === "") {
                fnGenerarAsiento(sCodVenta);
            }

        });
    };

    var obtenerIGVEstablecimiento = function () {
        //OBTENER IMPUESTO GENERAL A LAS VENTAS

        if ($("#cbo_Sucursal option:selected").attr("data-exonerado") == "SI") {
            $("#hfIMPUESTO").val("0");
            if (ObtenerQueryString("codigo") == undefined) {
                infoCustom2("Se considerará IGV: " + $('#hfIMPUESTO').val() + "%");
            }
        } else {
            $.ajax({
                type: "post",
                url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=0021",
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                success: function (datos) {
                    if (datos != null) {
                        if (!isNaN(parseFloat(datos[0].VALOR))) {
                            $('#hfIMPUESTO').val(parseFloat(datos[0].VALOR) * 100);
                            infoCustom2("Se considerará IGV: " + $('#hfIMPUESTO').val() + "%");
                        } else {
                            infoCustom2("El parámetro de Impuesto(0021) no es válido. Se considerará IGV 18%")
                            $('#hfIMPUESTO').val("18");
                        }
                    }
                    else { alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!"); }
                },
                error: function (msg) {
                    alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!");
                }
            });
        }
    }

    var fnGetDocVta = function (sCodVenta) {
        let aoDocVta = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NV/ajax/NVMDOCV.ashx?OPCION=GET_DOC_VTA&p_CODE=" + sCodVenta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoDocVta = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se encontró el documento de venta.");
            }
        });
        Desbloquear("ventana");

        return aoDocVta;
    };

    var fnGetSaldoDocVta = function (sCodVenta) {
        let aoDocSaldoVta = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NV/ajax/NVMDOCV.ashx?OPCION=GET_SALDO_DOC_VTA&p_CODE=" + sCodVenta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoDocSaldoVta = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se encontró el documento de venta.");
            }
        });
        Desbloquear("ventana");

        return aoDocSaldoVta;
    };

    var GenerarDocFacturacion = function () {
        Bloquear('ventana');
        let sCodEmpresa = $("#ctl00_hddctlg").val();
        let sCodVenta = $("#txtNumDctoComp").val();
        let sCodTipoDoc = $("#cboDocumentoVenta").val();
        if (sCodTipoDoc !== '0001' && sCodTipoDoc !== '0003') {
            alertCustom('No se puede realizar la operación por el tipo de documento.');
            return;
        }
        let sOpcion = (sCodTipoDoc === '0001' ? 'FACT' : 'BOL');
        let sRuta = "vistas/EF/ajax/EFACTEL.ashx?sOpcion=" + sOpcion + "&sCodEmpresa=" + sCodEmpresa + "&sCodVenta=" + sCodVenta

        $.ajax({
            type: "post",
            url: sRuta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos)) {
                    alertCustom("Error al Enviar Documento Eletrónico");
                    return;
                }
                let iIndice = datos.indexOf("[Advertencia]");
                if (iIndice >= 0) {
                    alertCustom(datos);
                    return;
                }
                if (datos.indexOf("[Error]") >= 0) {
                    alertCustom(datos);
                    return;
                }
                Desbloquear('ventana');
                exito();
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var GenerarDocFacturacion = function () {
        Bloquear('ventana');
        let sCodEmpresa = $("#ctl00_hddctlg").val();
        let sCodVenta = $("#txtNumDctoComp").val();
        let sCodTipoDoc = $("#cboDocumentoVenta").val();
        if (sCodTipoDoc !== '0001' && sCodTipoDoc !== '0003') {
            alertCustom('No se puede realizar la operación por el tipo de documento.');
            return;
        }
        let sOpcion = (sCodTipoDoc === '0001' ? 'FACT' : 'BOL');
        let sRuta = "vistas/EF/ajax/EFACTEL.ashx?sOpcion=" + sOpcion + "&sCodEmpresa=" + sCodEmpresa + "&sCodVenta=" + sCodVenta

        $.ajax({
            type: "post",
            url: sRuta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos)) {
                    alertCustom("Error al Enviar Documento Eletrónico");
                    return;
                }
                let iIndice = datos.indexOf("[Advertencia]");
                if (iIndice >= 0) {
                    alertCustom(datos);
                    return;
                }
                if (datos.indexOf("[Error]") >= 0) {
                    alertCustom(datos);
                    return;
                }
                Desbloquear('ventana');
                exito();
            },
            error: function (msg) {
                alert(msg);
            }
        });

    };

    var fnFillBandejaCtas = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "NRO_MOV",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "ANIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "MES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "TIPO_ASIENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "FECHA_EMI_DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "FECHA_TRANSAC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "DECLARADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "MONE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "TC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        type: formatoMiles;
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html("<a class='VerAsiento' >Ver Asiento</a>");
                        $(td).css("text-align", "center").addClass("asiento");
                    }
                }
            ]
        }

        oTableLista = $("#tblLista").dataTable(parms);
        // $("#tblLista").removeAttr("style");

        $("#tblLista tbody").on("click", "td.asiento", function (event) {

            event.stopPropagation();
            var oTr = $(this).parent();

            $(this).find("a.VerAsiento").html("Ocultar");

            if (oTableLista.fnIsOpen(oTr)) {
                $(this).find("a.VerAsiento").html("Ver Asiento");
                oTr.removeClass("details");
                oTableLista.fnClose(oTr);
                return;
            }

            var pos = oTableLista.api(true).row(oTr).index();
            var row = oTableLista.fnGetData(pos);
            var sCodigo = row.CODIGO;


            var oMovCuentaDet = fnListaMovContableDet(sCodigo);

            var sHtml = "<div class='span12' id='divTblCuentas'>";
            sHtml += "<div class='span12' id='divTblCuentas'>";
            sHtml += "<table id='tblCuentas' class='table table-bordered'>";
            sHtml += "<thead>";
            sHtml += "<tr style='background-color: rgb(3, 121, 56); color: aliceblue;'>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Correlativo</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Documento</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>F. Emisión</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Doc Id</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Persona</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Descripción</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Centro de Costos</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Cuenta</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>DebeMN</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>HaberMN</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>DebeME</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>HaberME</th>";
            sHtml += "</tr>";
            sHtml += "</thead>";
            sHtml += "<tbody>";

            if (!isEmpty(oMovCuentaDet)) {
                var nTotalDebeMN = 0;
                var nTotalHaberMN = 0;
                var nTotalDebeME = 0;
                var nTotalHaberME = 0;
                $.each(oMovCuentaDet, function (key, value) {
                    var sCorrelativo = value.ITEM;
                    var sDocumento = value.DCTO;
                    var sFEmision = value.FECHA_DCTO;
                    var sCodIdent = value.DOC_IDENT;
                    var sPersona = value.PERSONA;
                    var sDescripcionItem = value.CTAS;
                    var sCCosto = value.CCOSTO_DET;
                    var sCuenta = value.CTAS_CODE;
                    var nDebeMN = value.DEBE_MN;
                    var nHaberMN = value.HABER_MN;
                    var nDebeME = value.DEBE_ME;
                    var nHaberME = value.HABER_ME;

                    sHtml += ("<tr>");
                    sHtml += ("<td style='text-align:center;'>" + sCorrelativo + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sDocumento + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sFEmision + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sCodIdent + "</td>");
                    sHtml += ("<td>" + sPersona + "</td>");
                    sHtml += ("<td>" + sDescripcionItem + "</td>");
                    sHtml += ("<td>" + sCCosto + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + sCuenta + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nDebeMN) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nHaberMN) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nDebeME) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nHaberME) + "</td>");
                    sHtml += ("</tr>");

                    nTotalDebeMN = nTotalDebeMN + nDebeMN;
                    nTotalHaberMN = nTotalHaberMN + nHaberMN;

                    nTotalDebeME = nTotalDebeME + nDebeME;
                    nTotalHaberME = nTotalHaberME + nHaberME;
                });
            }
            sHtml += ("<tr style='background-color: rgb(237, 208, 0); color: #006232;'>");
            sHtml += ("<td colspan='8' style='text-align:right;font-weight:bold;'>Total</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalDebeMN) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalHaberMN) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalDebeME) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalHaberME) + "</td>");
            sHtml += ("</tr>");

            sHtml += "</tbody>";
            sHtml += "</table>";
            sHtml += "</div>";

            oTableLista.fnOpen(oTr, sHtml, "details");
        });
    };

    var fnGetMovContable = function (sCodMovContab) {
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ASHX?sOpcion=LMCO&p_DCTO_CODE=" + sCodMovContab,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oTableLista.fnClearTable();
                if (isEmpty(datos))
                    return;
                oTableLista.fnAddData(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar el Asiento Contable.");
            }
        });
    };

    var fnListaMovContableDet = function (sCodMovContab) {
        var oMovCuentaDet = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ASHX?sOpcion=LDCO&p_DCTO_CODE=" + sCodMovContab,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oMovCuentaDet = datos; // JSON.parse(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar el Detalle del Movimiento Contable.");
            }
        });
        return oMovCuentaDet;
    };

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");

        $("#cbo_Empresa").val($("#ctl00_hddctlg").val());
        $("#cbo_Empresa").change();
        if (cod !== undefined) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:ActualizarDctoVenta();");

            Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCC&p_FVBVTAC_CODE=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#hfCompletoInd").val(datos[0].COMPLETO_IND);
                    $("#hfIMPUESTO").val(datos[0].PCTJ_IGV);
                    $("#hfImprimirPreciosIGV").val(datos[0].IGV_IMPR_IND);
                    $("#hfPIDM").val(datos[0].CLIE_PIDM);

                    if (datos[0].IGV_IMPR_IND == "N") {
                        $("#chk_inc_igv").prop('checked', false).parent().removeClass('checked');
                    }
                    if (datos[0].SCSL_EXONERADA_IND == "S") {
                        $("#chk_inc_igv").attr("disabled", "disabled");
                    }
                    //DATOS GENERALES
                    //F1
                    $("#txtNumDctoComp").val(datos[0].CODIGO);
                    $("#txtNumSec").val(datos[0].SECUENCIA);
                    //F2
                    $("#cbo_Empresa").select2('val', datos[0].EMPRESA).change();
                    $("#cbo_Sucursal").select2('val', datos[0].SUCURSAL).change();
                    //F3 - Carga datos de cliente
                    carga_ini_ind = true;
                    $("#txtClientes").attr("disabled", "disabled");
                    $("#txtClientes").val(datos[0].RAZON_SOCIAL);
                    $("#txtClientes").keyup().siblings("ul").children("li").click();


                    // COMBO DIRECCION 
                    $("#cbo_direccion").empty()
                    $("#cbo_direccion").html("<option value=''>" + datos[0].DIRECCION_VENTA + "</option>")
                    $("#cbo_direccion").select2('val', '')


                    //F4 - Documento venta
                    $("#cboDocumentoVenta").select2("val", datos[0].DCTO_CODE).change();
                    //F5 
                    $("#txt_fec_transaccion").val(datos[0].TRANSACCION);
                    $("#txt_fec_emision").val(datos[0].EMISION);
                    $("#cboVendedor").select2("val", datos[0].USVE_USUA_ID);

                    //F7
                    $("#txt_comentario").val(datos[0].GLOSA);
                    //DETALLES VENTA
                    $("#cbo_moneda").select2('val', datos[0].MONEDA).change();

                    //DATOS CREDITO
                    if (datos[0].RESPONSABLE_PAGO_PIDM != "") {
                        $("#chkResponsablePago").prop('checked', true).parent().addClass('checked');
                        $("#txtResponsablePago").removeAttr("disabled");
                        $("#txtResponsablePago").val(datos[0].RESPONSABLE_PAGO);
                        $("#hfResponsablePagoPIDM").val(datos[0].RESPONSABLE_PAGO_PIDM);
                        $("#txtResponsablePago").keyup().siblings("ul").children("li").click();
                    }
                    $("#cbo_modo_pago").select2('val', datos[0].MOPA).change();
                    $("#txt_fec_vencimiento").val(datos[0].VENCIMIENTO);


                    //Si el documento ha sido COMPLETADO se bloquea la edicion y se carga el correlativo correspondiente
                    if ($("#hfCompletoInd").val() == "S") {

                        $("#hfImprimirPreciosIGV").val(datos[0].IGV_IMPR_IND);
                        $("#btnImprimir").attr("style", "display:inline-block;margin-top:2px;");
                        $(".btnImprimir").show();
                        $('#btnMail').removeClass('hidden');

                        $("#lblCopia").css("display", "inline-block");
                        $("#divBtnsMantenimiento").attr("style", "display:none");

                        //F4-DG
                        $("#cboSerieDocVenta").empty();
                        $("#cboSerieDocVenta").append('<option value="' + datos[0].CODIGO + '" >' + datos[0].DCTO_SERIE + '</option>');
                        $("#cboSerieDocVenta").select2("val", datos[0].CODIGO);
                        $("#txtNroDocVenta").val(datos[0].DCTO_NRO);
                        $("#lblTipoCorrelativo").html("[" + datos[0].COD_AUT + "]");
                        //F5 DC
                        var estado = "";
                        if (datos[0].PAGADO_IND == 'S') {
                            estado = 'PAGADO';
                        } else if (datos[0].PAGADO_IND == 'N') {
                            estado = 'NO PAGADO';
                        } else {
                            estado = '';
                        }
                        $('#txt_estado_credito').val(estado);
                        $('#txt_estado_credito').attr("title", estado);

                        //F1 F2 DV
                        $("#txt_valor_cambio").val(datos[0].VALOR_CAMBIO);
                        $("#txt_valor_cambio_Oficial").val(datos[0].VALOR_CAMBIO_OFI);
                        $("#lbl_fec_vig").attr("style", "display:none");
                        $("#input_fec_vig").attr("style", "display:none");
                        $("#lbl_fec_vig_Oficial").attr("style", "display:none");
                        $("#input_fec_vig_Oficial").attr("style", "display:none");
                        //
                        BloquearCampos();
                        $("#p_DatCobro").fadeOut();
                        $("#p_DatTributaciones .portlet-title").click();

                        if (datos[0].COMPLETO == "SI")
                            $("#chkCompleto").attr("checked", true).parent().addClass("checked");
                        if (datos[0].ANULADO == "SI")
                            $("#chkAnulado").attr("checked", true).parent().addClass("checked");
                        if (datos[0].PROVISIONADO == "SI")
                            $("#chkProvisionado").attr("checked", true).parent().addClass("checked");
                        $("#divIndicadores").attr("style", "display:block;");
                    }

                    //CARGA INICIAL DE TOTALES              
                    var baseImponible = parseFloat(datos[0].IMPORTE_EXO) + parseFloat(datos[0].IMPORTE_GRA) + parseFloat(datos[0].IMPORTE_INA);

                    $("#txt_base_imponible").val(baseImponible.toFixed(2));
                    $("#txt_descuento").val(datos[0].DESCUENTO);
                    $("#txt_isc").val(datos[0].ISC);

                    $("#txtOpExonerada").val(datos[0].IMPORTE_EXO);
                    $("#txtOpGravada").val(datos[0].IMPORTE_GRA);
                    $("#txtOpInafecta").val(datos[0].IMPORTE_INA);

                    $("#txt_impuesto").val(parseFloat(datos[0].PCTJ_IGV).toFixed(2));
                    $("#txt_impuesto_calc").val(datos[0].IGV);

                    var subtotal = baseImponible + parseFloat(datos[0].IGV);
                    $("#txt_subtotal").val(subtotal.toFixed(2));
                    //DETRACCION
                    if (datos[0].DETRACCION_IND == "S") {
                        $('#chk_detraccion').prop('checked', true).parent().addClass('checked');
                        $("#txt_detraccion").val(datos[0].DETRACCION)

                        $("#txt_num_op_detrac").val(datos[0].NUM_DCTO_DETRAC);
                        $("#txt_cta_detrac").val(datos[0].NRO_CUENTA_DETRAC);
                        $("#txt_fec_comp_detrac").datepicker('setDate', datos[0].FECHA_DETRAC);
                    }
                    $("#txt_detraccion").val(datos[0].DETRACCION)
                    $("#txt_monto_detraccion").val(datos[0].DETRACCION)
                    //RETENCION
                    if (datos[0].RETENCION_IND == "S") {
                        $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                        $("#chk_retencion").change();
                        $("#txt_Retencion").val(datos[0].RETENCION)
                        $("#txt_num_comp_reten").val(datos[0].NUM_DCTO_RETEN);
                        $("#txt_fec_comp_reten").datepicker('setDate', datos[0].FECHA_RETEN);
                    }
                    $("#txt_Retencion").val(datos[0].RETENCION)
                    //PERCEPCION
                    if (datos[0].PERCEPCION == "S") {
                        $('#chk_percepcion').prop('checked', true).parent().addClass('checked');
                        $("#chk_percepcion").change();
                    }
                    $("#txt_Percepcion").val(datos[0].PERCEPCION)
                    //REDONDEO
                    if (parseFloat(datos[0].REDONDEO) != 0) {
                        $('#rbRedondeo').prop('checked', true).parent().addClass('checked');
                    }
                    $('#txtRedondeo').val(datos[0].REDONDEO);
                    $('#txtRedondeo2').val(datos[0].REDONDEO);
                    //DONACION
                    if (parseFloat(datos[0].DONACION) != 0) {
                        $('#rbDonacion').prop('checked', true).parent().addClass('checked');
                    }
                    $('#txtDonacion').val(datos[0].DONACION);
                    $('#txtDonacion2').val(datos[0].DONACION);
                    //
                    gImporteCobrar = parseFloat(datos[0].IMPORTE) - parseFloat(datos[0].DONACION) - parseFloat(datos[0].REDONDEO);
                    $("#txt_monto_total").val(datos[0].IMPORTE);
                    $("#lblImporteCobrar").html(datos[0].IMPORTE);
                    //FIN CARGA TOTALES

                    var monedaCabecera = datos[0].MONEDA;

                    var validarDoc = $('#cboSerieDocVenta').text();
                    if (validarDoc.substring(0, 1) == 'F' || validarDoc.substring(0, 1) == 'B') {
                        //$('#btnEFac').removeClass('hidden');
                    }

                    //LISTAR DETALLES
                    $.ajax({
                        type: "POST",
                        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCD&p_FVBVTAC_CODE=" + cod,
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (datos2) {

                            if (datos2 != null) {
                                $("#cbo_moneda").attr("disabled", "disabled");
                                for (var i = 0; i < datos2.length; i++) {
                                    var objProd = {};

                                    objProd.CODE_DCTO_ORIGEN = datos2[i].CODE_DCTO_ORIGEN;
                                    objProd.ITEM = datos2[i].ITEM;
                                    objProd.CODIGO = datos2[i].PROD_CODE;
                                    objProd.PROD_CODE_ANTIGUO = datos2[i].PROD_CODIGO_ANTIGUO;
                                    objProd.TIPO_BIEN = datos2[i].TIPO_BIEN;
                                    objProd.ALMACENABLE = datos2[i].ALMACENABLE;

                                    objProd.CODE_UNIDAD = datos2[i].UNIDAD;
                                    objProd.UNIDAD = datos2[i].UNIDAD;
                                    objProd.DESC_UNIDAD = datos2[i].DESC_UNIDAD;
                                    objProd.GLOSA = datos2[i].GLOSA;
                                    objProd.NOMBRE_IMPRESION = datos2[i].NOMBRE_IMPRESION;

                                    objProd.CANTIDAD = datos2[i].CANTIDAD;

                                    objProd.MONEDA = datos[0].MONEDA;
                                    objProd.PRECIO_IND = datos2[i].PRECIO_IND;
                                    if ($("#hfCompletoInd").val() == "N") {
                                        //OBTENER DATOS PRECIOS
                                        if (datos2[i].PRECIO_IND = "E") {
                                            objProd.PRECIO_VENTA = ObtenerPreciosProductoJSON(datos2[i].PROD_CODE, datos2[i].PRECIO_IND, datos2[i].TIPO_BIEN, datos[0].EMPRESA, datos[0].SUCURSAL, "PV");
                                            objProd.PRECIO_MINIMO = ObtenerPreciosProductoJSON(datos2[i].PROD_CODE, datos2[i].PRECIO_IND, datos2[i].PRECIO_IND, datos[0].EMPRESA, datos[0].SUCURSAL, "PM");
                                            objProd.RANGOS_PRECIO = [];

                                        } else {
                                            objProd.PRECIO_VENTA = "0";
                                            objProd.PRECIO_MINIMO = "0";
                                            objProd.RANGOS_PRECIO = ObtenerPreciosProductoJSON(datos2[i].PROD_CODE, datos2[i].PRECIO_IND, datos2[i].PRECIO_IND, datos[0].EMPRESA, datos[0].SUCURSAL, "R");
                                        }

                                        var descuentoCliente = 0;
                                        // OBTENER DESCUENTO
                                        $.ajax({
                                            type: "post",
                                            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=6&PROD_CODE=" + datos2[i].PROD_CODE + "&CODIGO_CATEGORIA=" + $("#hfCodigoCategoriaCliente").val() + "&CTLG_CODE=" + datos[0].EMPRESA,
                                            contenttype: "application/json;",
                                            datatype: "json",
                                            async: false,
                                            success: function (datos) {
                                                if (datos != null && datos.length != 0) {
                                                    descuentoCliente = (datos[0].DESCUENTO == "") ? 0 : parseFloat(datos[0].DESCUENTO);
                                                }
                                            },
                                            error: function (msg) {
                                                alertCustom("No se obtuvo correctamente descuento por Categoría de cliente.");
                                            }
                                        });
                                        //DATOS NECESARIOS PARA RECALCULAR SUBTOTALES
                                        objProd.DETRACCION = datos2[i].PROD_DETRACCION_DECIMALES;
                                        objProd.DETRACCION_PORCENTAJE = datos2[i].PROD_DETRACCION;
                                        objProd.DESCUENTO = descuentoCliente;
                                        objProd.ISC = datos2[i].PROD_ISC;
                                    }


                                    if ($("#cbo_moneda option[value=" + monedaCabecera + "]").attr("data-tipo") == "MOBA") {

                                        objProd.MONTO_DESCUENTO = datos2[i].DESCUENTO;
                                        objProd.PRECIO_DETALLE = datos2[i].PU; //El precio está en la misma moneda que  cbo_moneda
                                        objProd.PU = datos2[i].PU;
                                        objProd.TOTAL_BRUTO = (parseFloat(datos2[i].CANTIDAD) * parseFloat(datos2[i].PU)).toFixed(2);
                                        objProd.TOTAL_NETO = datos2[i].TOTAL;
                                        objProd.MONTO_DETRAC = datos2[i].DETRACCION;
                                        objProd.MONTO_ISC = datos2[i].ISC;

                                        objProd.CONVERT_PU = datos2[i].CONVERT_PU;
                                        objProd.CONVERT_DESCUENTO = datos2[i].CONVERT_DESCUENTO;
                                        objProd.CONVERT_PRECIO_COMPRA = datos2[i].CONVERT_PRECIO_COMPRA;
                                        objProd.CONVERT_DETRACCION = datos2[i].CONVERT_DETRACCION;
                                        objProd.CONVERT_ISC = datos2[i].CONVERT_ISC;
                                    } else {

                                        objProd.MONTO_DESCUENTO = datos2[i].CONVERT_DESCUENTO;
                                        objProd.PRECIO_DETALLE = datos2[i].CONVERT_PU; //El precio está en la misma moneda que  cbo_moneda
                                        objProd.PU = datos2[i].CONVERT_PU;
                                        objProd.TOTAL_BRUTO = (parseFloat(datos2[i].CANTIDAD) * parseFloat(datos2[i].CONVERT_PU)).toFixed(2);
                                        objProd.TOTAL_NETO = datos2[i].CONVERT_TOTAL;
                                        objProd.MONTO_DETRAC = datos2[i].CONVERT_DETRACCION;
                                        objProd.MONTO_ISC = datos2[i].CONVERT_ISC;

                                        objProd.CONVERT_PU = datos2[i].PU;
                                        objProd.CONVERT_DESCUENTO = datos2[i].DESCUENTO;
                                        objProd.CONVERT_PRECIO_COMPRA = datos2[i].PRECIO_COMPRA;
                                        objProd.CONVERT_DETRACCION = datos2[i].DETRACCION;
                                        objProd.CONVERT_ISC = datos2[i].ISC;

                                    }

                                    objProd.CENTRO_COSTO_CODE = datos2[i].CENTRO_COSTO_CODE;
                                    objProd.CUENTA_CODE = datos2[i].CUENTA_CODE;
                                    //Por completar                                 
                                    objProd.CTAS_CODE = "";
                                    objProd.CECO_CODE = "";
                                    objProd.TIPO_PROD = "";
                                    objProd.SERIADO = datos2[i].SERIADO;
                                    objProd.COSTO_PRODUCTO = datos2[i].COSTO_PRODUCTO;

                                    detallesVenta.push(objProd);
                                }

                                if ($("#hfCompletoInd").val() == "S") {
                                    var datos2 = ObtenerTablaDetallesCompletado();
                                    ListarTablaDetalles(datos2);
                                } else {
                                    var datos2 = ObtenerTablaDetalles();
                                    ListarTablaDetalles(datos2);
                                }

                                if ($("#hfCompletoInd").val() == "S") {
                                    $(".btnEliminarDetalle").remove();
                                    $("#tabla_det").DataTable().column(0).visible(false);

                                } else {
                                    $("#rbRedondeo,#rbDonacion").removeAttr("disabled");
                                    CalcularDetraccion();
                                    CalcularDatosMonetarios();
                                }
                            }

                        },
                        error: function (msg) {
                            alertCustom(msg);
                        }
                    });
                    //FIN LISTAR DETALLES


                    //LISTAR DETALLES BONIFICACION
                    $.ajax({
                        type: "POST",
                        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCDB&p_FVBVTAC_CODE=" + cod,
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (datos3) {

                            if (datos3 != null) {

                                for (var i = 0; i < datos3.length; i++) {
                                    var objProdBoni = {};

                                    objProdBoni.CODE_DCTO_ORIGEN = "";
                                    objProdBoni.ITEM = datos3[i].ITEM;
                                    objProdBoni.CODIGO = datos3[i].PROD_CODE;
                                    objProdBoni.PROD_CODE_ANTIGUO = datos3[i].PROD_CODIGO_ANTIGUO;
                                    objProdBoni.TIPO_BIEN = datos3[i].TIPO_BIEN;
                                    objProdBoni.ALMACENABLE = datos3[i].ALMACENABLE;


                                    objProdBoni.CODE_UNIDAD = datos3[i].UNIDAD;
                                    objProdBoni.UNIDAD = datos3[i].UNIDAD;
                                    objProdBoni.DESC_UNIDAD = datos3[i].DESC_UNIDAD;
                                    objProdBoni.GLOSA = datos3[i].GLOSA;
                                    objProdBoni.NOMBRE_IMPRESION = datos3[i].NOMBRE_IMPRESION;

                                    objProdBoni.CANTIDAD = datos3[i].CANTIDAD;

                                    objProdBoni.MONEDA = datos[0].MONEDA;
                                    objProdBoni.PRECIO_IND = datos3[i].PRECIO_IND;
                                    if ($("#hfCompletoInd").val() == "N") {
                                        //OBTENER DATOS PRECIOS
                                        if (datos3[i].PRECIO_IND = "E") {
                                            objProdBoni.PRECIO_VENTA = "0"
                                            objProdBoni.PRECIO_MINIMO = "0"
                                            objProdBoni.RANGOS_PRECIO = [];

                                        } else {
                                            objProdBoni.PRECIO_VENTA = "0";
                                            objProdBoni.PRECIO_MINIMO = "0";
                                            objProdBoni.RANGOS_PRECIO = []
                                        }

                                        var descuentoCliente = 0;
                                        // OBTENER DESCUENTO

                                        //DATOS NECESARIOS PARA RECALCULAR SUBTOTALES
                                        objProdBoni.DETRACCION = "0";
                                        objProdBoni.DETRACCION_PORCENTAJE = "0";
                                        objProdBoni.DESCUENTO = descuentoCliente;
                                        objProdBoni.ISC = "0";
                                    }

                                    objProdBoni.MONTO_DESCUENTO = "0";
                                    objProdBoni.PRECIO_DETALLE = datos3[i].PU; //El precio está en la misma moneda que  cbo_moneda
                                    objProdBoni.PU = datos3[i].PU;
                                    objProdBoni.TOTAL_BRUTO = (parseFloat(datos3[i].CANTIDAD) * 0);
                                    objProdBoni.TOTAL_NETO = datos3[i].TOTAL;
                                    objProdBoni.MONTO_DETRAC = "0";
                                    objProdBoni.MONTO_ISC = "0";

                                    objProdBoni.CONVERT_PU = "0";
                                    objProdBoni.CONVERT_DESCUENTO = "0";
                                    objProdBoni.CONVERT_PRECIO_COMPRA = "0";
                                    objProdBoni.CONVERT_DETRACCION = "0";
                                    objProdBoni.CONVERT_ISC = "0";

                                    objProdBoni.CENTRO_COSTO_CODE = datos3[i].CENTRO_COSTO_CODE;
                                    objProdBoni.CUENTA_CODE = datos3[i].CUENTA_CODE;
                                    //Por completar                                 
                                    objProdBoni.CTAS_CODE = "";
                                    objProdBoni.CECO_CODE = "";
                                    objProdBoni.TIPO_PROD = "";
                                    objProdBoni.SERIADO = datos3[i].SERIADO_IND;

                                    detallesBonificacion.push(objProdBoni);
                                }

                                if ($("#hfCompletoInd").val() == "S") {
                                    var datos3 = ObtenerTablaDetallesBonificacionCompletado();
                                    ListarTablaDetallesBonificacion(datos3);
                                } else {
                                    var datos3 = ObtenerTablaDetallesBonificacion();
                                    ListarTablaDetallesBonificacion(datos3);
                                }


                                if ($("#hfCompletoInd").val() == "S") {
                                    $(".btnEliminarDetalle").remove();
                                    $("#tabla_det_boni").DataTable().column(0).visible(false);
                                }
                            }

                        },
                        error: function (msg) {
                            alertCustom(msg);
                        }
                    });
                    //FIN LISTAR DETALLES  BONIFICACION


                    //LISTAR DETALLES MUESTRA
                    $.ajax({
                        type: "POST",
                        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCDM&p_FVBVTAC_CODE=" + cod,
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (datos4) {

                            if (!isEmpty(datos4)) {

                                for (var i = 0; i < datos4.length; i++) {
                                    var objProdMues = {};

                                    objProdMues.CODE_DCTO_ORIGEN = "";
                                    objProdMues.ITEM = datos4[i].ITEM;
                                    objProdMues.CODIGO = datos4[i].PROD_CODE;
                                    objProdMues.PROD_CODE_ANTIGUO = datos4[i].PROD_CODIGO_ANTIGUO;
                                    objProdMues.TIPO_BIEN = datos4[i].TIPO_BIEN;
                                    objProdMues.ALMACENABLE = datos4[i].ALMACENABLE;


                                    objProdMues.CODE_UNIDAD = datos4[i].UNIDAD;
                                    objProdMues.UNIDAD = datos4[i].UNIDAD;
                                    objProdMues.DESC_UNIDAD = datos4[i].DESC_UNIDAD;
                                    objProdMues.GLOSA = datos4[i].GLOSA;
                                    objProdMues.NOMBRE_IMPRESION = datos4[i].NOMBRE_IMPRESION;

                                    objProdMues.CANTIDAD = datos4[i].CANTIDAD;

                                    objProdMues.MONEDA = datos[0].MONEDA;
                                    objProdMues.PRECIO_IND = datos4[i].PRECIO_IND;
                                    if ($("#hfCompletoInd").val() == "N") {
                                        //OBTENER DATOS PRECIOS
                                        if (datos4[i].PRECIO_IND = "E") {
                                            objProdMues.PRECIO_VENTA = "0"
                                            objProdMues.PRECIO_MINIMO = "0"
                                            objProdMues.RANGOS_PRECIO = [];

                                        } else {
                                            objProdMues.PRECIO_VENTA = "0";
                                            objProdMues.PRECIO_MINIMO = "0";
                                            objProdMues.RANGOS_PRECIO = []
                                        }

                                        var descuentoCliente = 0;
                                        // OBTENER DESCUENTO

                                        //DATOS NECESARIOS PARA RECALCULAR SUBTOTALES
                                        objProdMues.DETRACCION = "0";
                                        objProdMues.DETRACCION_PORCENTAJE = "0";
                                        objProdMues.DESCUENTO = descuentoCliente;
                                        objProdMues.ISC = "0";
                                    }

                                    objProdMues.MONTO_DESCUENTO = "0";
                                    objProdMues.PRECIO_DETALLE = datos4[i].PU; //El precio está en la misma moneda que  cbo_moneda
                                    objProdMues.PU = datos4[i].PU;
                                    objProdMues.TOTAL_BRUTO = (parseFloat(datos4[i].CANTIDAD) * 0);
                                    objProdMues.TOTAL_NETO = datos4[i].TOTAL;
                                    objProdMues.MONTO_DETRAC = "0";
                                    objProdMues.MONTO_ISC = "0";


                                    objProdMues.CONVERT_PU = "0";
                                    objProdMues.CONVERT_DESCUENTO = "0";
                                    objProdMues.CONVERT_PRECIO_COMPRA = "0";
                                    objProdMues.CONVERT_DETRACCION = "0";
                                    objProdMues.CONVERT_ISC = "0";



                                    objProdMues.CENTRO_COSTO_CODE = datos4[i].CENTRO_COSTO_CODE;
                                    objProdMues.CUENTA_CODE = datos4[i].CUENTA_CODE;
                                    //Por completar                                 
                                    objProdMues.CTAS_CODE = "";
                                    objProdMues.CECO_CODE = "";
                                    objProdMues.TIPO_PROD = "";
                                    objProdMues.SERIADO = datos4[i].SERIADO_IND;

                                    detallesMuestra.push(objProdMues);


                                }

                                if ($("#hfCompletoInd").val() == "S") {
                                    var datos4 = ObtenerTablaDetallesMuestraCompletado();
                                    ListarTablaDetallesMuestra(datos4);
                                } else {
                                    var datos4 = ObtenerTablaDetallesMuestra();
                                    ListarTablaDetallesMuestra(datos4);
                                }


                                if ($("#hfCompletoInd").val() == "S") {
                                    $(".btnEliminarDetalle").remove();
                                    $("#tabla_det_muestra").DataTable().column(0).visible(false);

                                }

                            }

                        },
                        error: function (msg) {
                            alertCustom(msg);
                        }
                    });
                    //FIN LISTAR DETALLES  MUESTRA


                    let sCodMovContab = datos[0].MOVCONT_CODE;
                    sCodMovContab = (sCodMovContab === null ? "" : sCodMovContab);
                    if (sCodMovContab !== "") {
                        $("#divGenAsiento").hide();
                        fnGetMovContable(sCodMovContab);
                    }
                },
                error: function (msg) {
                    alertCustom(msg);
                }
            });
            Desbloquear("ventana");
        }
    }

    var fnGenerarAsiento = function (sCodVenta) {

        var data = new FormData();
        data.append("OPCION", "GEN_ASIENTO");
        data.append("p_CODE", $("#txtNumDctoComp").val());
        data.append("USUA_ID", $("#ctl00_txtus").val());
        data.append("p_NCMOCONT_CODIGO", sCodModulo);

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmdocv.ashx",
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
                    infoCustom2(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    alertCustom(response);
                    return;
                }

                $("#divGenAsiento").hide();

                fnGetMovContable(response);

                exito();
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo generar el asiento.");
            }
        });
        Desbloquear("ventana");
    };

    return {
        init: function () {
            //No usan CTLG
            cargarParametrosSistema();
            plugins();
            eventoControles();
            fillCboModoPago();
            fillEquivalenciasUnidades();
            // fillcboUniMedida();
            fillCboTipoDoc();
            //Usan CTLG            
            fillCboEmpresa();
            //fillcboRegistroEspecifico('VENT');
            //if (ObtenerQueryString("codigo") == undefined) {
            //    fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", true);
            //}
            fillcboMoneda();
            $("#cboSerieDocVenta").select2("val", "");
            CargarDatosCobro();
            CrearListaAnticiposObjeto();
            cargaInicial();
            fnFillBandejaCtas();
        }
    };
}();

function cargarParametrosSistema() {
    //OBTENER PARAMETRO PARA MOSTRAR STOCK
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=STKP",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                $('#hfParamStock').val(datos[0].VALOR);
                paramStock = parseFloat($("#hfParamStock").val());
            }
            else { alertCustom("No se recuperó el Parámetro de Muestra de Stock(STKP) correctamente!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó el Parámetro de Muestra de Stock(STKP) correctamente!");
        }
    });
    //OBTENER PARAMETRO DE REDONDEO
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=REDN",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                $('#hfParamRedondeo').val(datos[0].VALOR);
            }
            else { alertCustom("No se recuperó el Parámetro de Redondeo(REDN) correctamente!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó el Parámetro de Redondeo(REDN) correctamente!");
        }
    });
    //OBTENER PARAMETRO DE DETRACCION
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=DETR",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                if (!isNaN(parseFloat(datos[0].VALOR))) {
                    $('#hfParamDetraccion').val(datos[0].VALOR);
                } else {
                    infoCustom2("El parámetro de sistema de Detracción(DETR) no es válido. Se considerará como monto requerido 700")
                    $('#hfParamDetraccion').val("700");
                }
            }
            else { alertCustom("No se recuperó el parámetro de Detracción(DETR) correctamente!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó el parámetro de Detracción(DETR) correctamente!");
        }
    });

    //OBTENER PARAMETRO DE RETENCION
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=RETN",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                if (!isNaN(parseFloat(datos[0].VALOR))) {
                    $('#hfParamRetencion').val(datos[0].VALOR);
                } else {
                    infoCustom2("El parámetro de sistema de Retención(RETN) no es válido. Se considerará retención 3%")
                    $('#hfParamRetencion').val("3");
                }
            }
            else { alertCustom("No se recuperó el parámetro de Retención(RETN) correctamente!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó el parámetro de Retención(RETN) correctamente!");
        }
    });
    //OBTENER PARAMETRO DE MONTO REQUERIDO PARA RETENCION
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=RETR",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                if (!isNaN(parseFloat(datos[0].VALOR))) {
                    $('#hfParamMontoRetencion').val(datos[0].VALOR);
                } else {
                    infoCustom2("El parámetro de sistema de Retención(RETR) no es válido. Se considerará 300")
                    $('#hfParamMontoRetencion').val("300");
                }
            }
            else {
                alertCustom("No se recuperó el parámetro de Monto Requerido para Retención(RETR) correctamente!");
            }
        },
        error: function (msg) {
            alertCustom("No se recuperó el parámetro de Monto Requerido para Retención(RETR) correctamente!");
        }
    });

    //OBTENER FACTOR DE IMPUESTO A LA RENTA
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=IMRE",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                if (!isNaN(parseFloat(datos[0].VALOR))) {
                    $('#hfFactorImpuestoRenta').val(parseFloat(datos[0].VALOR));
                } else {
                    infoCustom2("El parámetro Factor de Impuesto a la Renta Mínimo (IMRE) no es válido. Se considerará Factor Mínimo de 1.5%")
                    $('#hfFactorImpuestoRenta').val("1.5");
                }
            }
            else { alertCustom("No se recuperó el Factor de Impuesto a la Renta Mínimo correctamente!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó el Factor de Impuesto a la Renta Mínimo correctamente!");
        }
    });
}

function CargarFactorImpuestoRentaVenta() {
    var data = new FormData();
    data.append('p_FECHA_BUSQUEDA', $("#txt_fec_emision").val());
    $.ajax({
        type: "POST",
        url: "vistas/nc/ajax/ncmimre.ashx?OPCION=1",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (datos) {
            if (datos != null && datos != "") {
                if (parseFloat(datos[0].FACTOR) < parseFloat($("#hfFactorImpuestoRenta").val())) {
                    $("#hfFactorImpuestoRentaVenta").val($("#hfFactorImpuestoRenta").val());
                } else {
                    $("#hfFactorImpuestoRentaVenta").val(datos[0].FACTOR);
                }
            }
            else {
                //infoCustom2("No se encontró datos de impuesto a la renta para la fecha de emisión indicada. Se considerará factor mínimo:" + $("#hfFactorImpuestoRenta").val());
                $("#hfFactorImpuestoRentaVenta").val($("#hfFactorImpuestoRenta").val());
            }
        })
        .error(function () {
        });
}

function ListarSucursales(ctlg) {
    var USUA_ID = $("#ctl00_txtus").val();
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LSU&CTLG_CODE=" + ctlg + "&USUA_ID=" + USUA_ID,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cbo_Sucursal').empty();
            //$('#cbo_Sucursal').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cbo_Sucursal').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $('#cbo_Sucursal').select2('val', $('#ctl00_hddestablecimiento').val());
            $("#cbo_Sucursal").change();
        },
        error: function (msg) {
            alertCustom("Establecimientos no se listaron correctamente");
        }
    });

}

var ajaxVendedor = null;
function fillCboVendedor(ctlg, scsl, estado, bAsync) {
    if (ajaxVendedor) {
        ajaxVendedor.abort();
    }
    if (bAsync == undefined) {
        bAsync = true;
    }
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LVEND" +
        "&CTLG=" + ctlg +
        "&SCSL=" + scsl +
        "&p_ESTADO_IND=" + estado,
        contenttype: "application/json;",
        datatype: "json",
        async: bAsync,
        success: function (datos) {
            $('#cboVendedor').empty();
            $('#cboVendedor').append('<option></option>');
            var pidmActual = "";
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboVendedor').append('<option value="' + datos[i].PIDM + '" usuario="' + datos[i].USUARIO + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    if ($("#ctl00_lblusuario").html() == datos[i].USUARIO) {
                        pidmActual = datos[i].PIDM;
                    }
                }
            }

            $('#cboVendedor').select2("val", pidmActual);
        },
        error: function (msg) {
            if (msg.statusText != "abort") {
                alertCustom("Vendedores no se listaron correctamente.");
            }
        }
    });
}

//Llenar productos
var productos = [];
var ajaxProducto = null;
function filltxtdescproducto(seriado) {
    $('#input_cod_prod').html('<input id="txt_cod_producto" disabled="disabled" class="span6" type="text" style="margin-right: 4px" /><input id="txt_cod_a_producto" class="span6" type="text" style="margin-left:-2px;" placeholder="Código"/>');
    $("#input_desc_prod").html("<input id='txt_desc_producto' class='span12' type='text' placeholder='Nombre' />");


    //Bloquear("form_add_prod")
    Bloquear("input_cod_prod");
    Bloquear("input_desc_prod");
    if (ajaxProducto) {
        ajaxProducto.abort();
    }
    ajaxProducto = $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODTODOS&CTLG=" + $('#cbo_Empresa').val() + "&SCSL=" + $('#cbo_Sucursal').val() + "&SERIADO_IND=" + seriado,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            //Desbloquear("form_add_prod")
            Desbloquear("input_cod_prod");
            Desbloquear("input_desc_prod");

            if (datos != null) {
                productos = datos;
                // UPDATER_DESC_PROD
                var input = $('#txt_desc_producto');
                input.typeahead({
                    source: function (query, process) {
                        array = [];
                        map = {};
                        let aoObj = new Array();

                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].DESC_ADM);
                            var obj = {};
                            obj.DESC_ADM = datos[i].DESC_ADM;
                            obj.CODIGO = datos[i].CODIGO;
                            obj.NOMBRE_COMERCIAL = datos[i].NOMBRE_COMERCIAL;
                            obj.CODIGO_ANTIGUO = datos[i].CODIGO_ANTIGUO;
                            obj.MONEDA = datos[i].MONEDA;
                            obj.UNIDAD = datos[i].UNIDAD;
                            obj.TIPO_DE_UNIDAD = datos[i].TIPO_DE_UNIDAD;
                            obj.NO_SERIADA = datos[i].NO_SERIADA;
                            obj.SERIADO = datos[i].SERIADA;
                            obj.SERVICIO = datos[i].SERVICIO;
                            obj.PRECIO_IND = datos[i].PRECIO_IND;
                            obj.CTLG = datos[i].CTLG;
                            obj.STOCK_REAL = datos[i].STOCK_REAL;
                            obj.STOCK_TOTAL = datos[i].STOCK_TOTAL;
                            obj.DETRACCION = datos[i].DETRACCION;
                            aoObj.push(obj);
                        }

                        $.each(aoObj, function (i, objeto) {
                            map[objeto.DESC_ADM] = objeto;
                        });
                        process(array);
                    },
                    updater: function (item) {
                        //Bloquear("form_add_prod");
                        if ($("#hfPIDM").val() != "") {

                            $("#txtClientes").attr("disabled", "disabled");
                            $("#hfCOD_PROD").val(map[item].CODIGO);
                            $("#hfProdSeriado").val(map[item].SERIADO);
                            $("#hfporcentaje_detraccion").val(map[item].DETRACCION)

                            $("#txt_cod_producto").val($("#hfCOD_PROD").val());
                            $("#txt_cod_a_producto").val(map[item].CODIGO_ANTIGUO);
                            $("#txt_desc_producto").val(map[item].DESC_ADM);

                            //fillcboUniMedida(map[item].TIPO_DE_UNIDAD);
                            fillcboUniMedida(map[item].UNIDAD);
                            $("#cbo_und_medida").select2("destroy");
                            $("#cbo_und_medida").val(map[item].UNIDAD);
                            $("#cbo_und_medida").select2();

                            $("#hfCodUnd_Producto").val(map[item].UNIDAD);

                            if (map[item].SERIADO == "S") {
                                $("#cbo_und_medida").attr("disabled", true);

                            }
                            else {
                                if (map[item].PRECIO_IND == "C") {
                                    $("#cbo_und_medida").attr("disabled", true);
                                } else {

                                    $("#cbo_und_medida").attr("disabled", false);
                                }

                            }



                            $("#txt_cantidad").val("");
                            $("#txt_cantidad").focus();

                            if (map[item].SERVICIO == "S") {
                                //stockReal = map[item].STOCK_REAL;
                                ValidaMostrarStock("SERVICIO");
                            } else {
                                stockReal = map[item].STOCK_REAL;
                                ValidaMostrarStock(stockReal);
                            }

                            prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPIDM").val());
                            console.log(prodActual);
                            $("#hfCostoProducto").val(prodActual.COSTO_PRODUCTO);

                            ActualizarCamposPrecios();
                            //---
                            CamposProductosSeriados();
                            $('#txtPrecioUnitario').keyup(function (e) {
                                var key = e.keyCode ? e.keyCode : e.which;
                                if (key === 13 && $(this).val() != '') {
                                    $('#txt_glosa_det').focus();
                                }
                            });
                            //---                            
                            $("#cbo_moneda").attr("disabled", "disabled");
                            Desbloquear("form_add_prod");
                            return item;

                        } else {
                            Desbloquear("form_add_prod");
                            alertCustom("Seleccione un cliente válido para continuar.");

                            $('#txt_desc_producto, #txt_cod_producto').val('');
                            $("#cbo_und_medida").select2('destroy');
                            $("#cbo_und_medida").val('');
                            $("#cbo_und_medida").select2();

                            $("#hfCOD_PROD").val("");
                            $("#hfProdSeriado").val("");
                            $("#hfporcentaje_detraccion").val("")
                            prodActual = {};
                            $("#txtClientes").focus();
                        }
                    },
                });
                input.keyup(function (e) {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($(this).val().length <= 0) {
                        $('#txt_cod_a_producto, #txt_cod_producto').val('');
                        $("#cbo_und_medida").select2('destroy');
                        $("#cbo_und_medida").val('');
                        $("#cbo_und_medida").select2();
                        $("#cbo_und_medida").empty();
                        $("#txtPrecioUnitario").val("0.00");

                        if (detallesVenta.length == 0) {
                            $("#chkDespachoVenta").removeAttr("disabled");
                            $("#txtClientes").removeAttr("disabled", "disabled");
                            $("#txtNroDctoCliente").removeAttr("disabled");
                            $("#cboTipoDoc").removeAttr("disabled");
                        }
                        $("#hfCOD_PROD").val("");
                        $("#hfCostoProducto").val("");
                        prodActual = {};
                        if (detallesVenta.length == 0) {
                            $("#cbo_moneda").removeAttr("disabled");
                        }
                    }
                });

                var input = $('#txt_cod_a_producto');
                input.typeahead({
                    source: function (query, process) {
                        array = [];
                        map = {};

                        let aoObj = new Array();
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].CODIGO_ANTIGUO);
                            var obj = {};
                            obj.DESC_ADM = datos[i].DESC_ADM;
                            obj.CODIGO = datos[i].CODIGO;
                            obj.NOMBRE_COMERCIAL = datos[i].NOMBRE_COMERCIAL;
                            obj.CODIGO_ANTIGUO = datos[i].CODIGO_ANTIGUO;
                            obj.MONEDA = datos[i].MONEDA;
                            obj.UNIDAD = datos[i].UNIDAD;
                            obj.TIPO_DE_UNIDAD = datos[i].TIPO_DE_UNIDAD;
                            obj.NO_SERIADA = datos[i].NO_SERIADA;
                            obj.SERIADO = datos[i].SERIADA;
                            obj.SERVICIO = datos[i].SERVICIO;
                            obj.PRECIO_IND = datos[i].PRECIO_IND;
                            obj.CTLG = datos[i].CTLG;
                            obj.STOCK_REAL = datos[i].STOCK_REAL;
                            obj.STOCK_TOTAL = datos[i].STOCK_TOTAL;
                            obj.DETRACCION = datos[i].DETRACCION;
                            aoObj.push(obj);
                        }

                        $.each(aoObj, function (i, objeto) {
                            map[objeto.CODIGO_ANTIGUO] = objeto;
                        });
                        process(array);
                    },
                    updater: function (item) {
                        Bloquear("form_add_prod");
                        if ($("#hfPIDM").val() != "") {

                            $("#txtClientes").attr("disabled", "disabled");

                            $("#hfCOD_PROD").val(map[item].CODIGO);
                            $("#hfProdSeriado").val(map[item].SERIADO);

                            $("#txt_cod_producto").val($("#hfCOD_PROD").val());
                            //$("#txt_cod_producto").change();
                            $("#txt_desc_producto").val(map[item].DESC_ADM);

                            fillcboUniMedida(map[item].UNIDAD);

                            $('#cbo_und_medida').select2('destroy');
                            $("#cbo_und_medida").val(map[item].UNIDAD);
                            $("#cbo_und_medida").select2();

                            $("#hfCodUnd_Producto").val(map[item].UNIDAD);

                            if (map[item].SERIADO == "S") {
                                $("#cbo_und_medida").attr("disabled", true);

                            }
                            else {
                                if (map[item].PRECIO_IND == "C") {
                                    $("#cbo_und_medida").attr("disabled", true);
                                } else {

                                    $("#cbo_und_medida").attr("disabled", false);
                                }

                            }



                            $("#hfporcentaje_detraccion").val(map[item].DETRACCION)
                            $("#txt_cantidad").val("");
                            $("#txt_cantidad").focus();


                            if (map[item].SERVICIO == "S") {
                                //stockReal = map[item].STOCK_REAL;
                                ValidaMostrarStock("SERVICIO");
                            } else {
                                stockReal = map[item].STOCK_REAL;
                                ValidaMostrarStock(stockReal);
                            }

                            prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPIDM").val());
                            $("#hfCostoProducto").val(prodActual.COSTO_PRODUCTO);
                            ActualizarCamposPrecios();
                            //---
                            CamposProductosSeriados();
                            $('#txtPrecioUnitario').keyup(function (e) {
                                var key = e.keyCode ? e.keyCode : e.which;
                                if (key === 13 && $(this).val() != '') {
                                    $('#txt_glosa_det').focus();
                                }
                            });
                            //---
                            $("#cbo_moneda").attr("disabled", "disabled");
                            Desbloquear("form_add_prod");
                            return item;
                        } else {
                            Desbloquear("form_add_prod");
                            alertCustom("Seleccione un cliente válido para continuar.");

                            $('#txt_desc_producto, #txt_cod_producto').val('');
                            $("#cbo_und_medida").select2('destroy');
                            $("#cbo_und_medida").val('');
                            $("#cbo_und_medida").select2();

                            $("#hfCOD_PROD").val("");
                            $("#hfProdSeriado").val("");
                            $("#hfporcentaje_detraccion").val("")
                            prodActual = {};
                            $("#txtClientes").focus();

                        }
                    },
                });
                input.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($(this).val().length <= 0) {
                        $('#txt_desc_producto, #txt_cod_producto').val('');
                        $("#cbo_und_medida").select2('destroy');
                        $("#cbo_und_medida").val('');
                        $("#cbo_und_medida").select2();
                        $("#cbo_und_medida").empty();
                        $("#txtPrecioUnitario").val("0.00");

                        if (detallesVenta.length == 0) {
                            $("#txtClientes").removeAttr("disabled", "disabled");
                            $("#chkDespachoVenta").removeAttr("disabled");
                            $("#txtNroDctoCliente").removeAttr("disabled");
                            $("#cboTipoDoc").removeAttr("disabled");
                        }
                        $("#hfCOD_PROD").val("");
                        $("#hfCostoProducto").val("");
                        prodActual = {};
                        if (detallesVenta.length == 0) {
                            $("#cbo_moneda").removeAttr("disabled");
                        }
                    }
                });
            }
        },
        error: function (msg) {
            Desbloquear("form_add_prod")
            Desbloquear("input_cod_prod");
            Desbloquear("input_desc_prod");
            if (msg.statusText != "abort") {
                alertCustom("Productos no se listaron correctamente");
            }
        }
    });
}

function ValidaMostrarStock(stockAcumulado) {
    //if (!isNaN(paramStock)) {
    //    if (paramStock >= 0) {
    //        if (parseFloat(stockAcumulado) > paramStock) {
    //            stockAcumulado = "> " + paramStock;
    //        }
    //    }
    //}
    $("#txtStockReal").val(stockAcumulado);
}

//Actualiza campos para precios 
function ActualizarCamposPrecios() {
    if (prodActual != null && prodActual.length != 0) {
        $("#divPrecioUnitario").html("");
        //La moneda de venta coincide con la moneda del producto
        if (prodActual.MONEDA == $("#cbo_moneda").val()) {
            if (prodActual.PRECIO_IND == "E") {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + prodActual.PRECIO_VENTA + '" onkeyup="return ValidaPrecioEstandar(\'' + prodActual.PRECIO_VENTA + '\',\'' + prodActual.PRECIO_MINIMO + '\')"  onkeypress="return ValidaDecimales(event,this,3)" />')
                $("#txtPrecioUnitInicio").val(prodActual.PRECIO_VENTA);
            }
            else {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" disabled="disabled" />')
                $("#txtPrecioUnitInicio").val('');
            }
        } else {
            var valorCambio = parseFloat($("#txt_valor_cambio").val());
            if (prodActual.PRECIO_IND == "E") {
                var precioVenta, precioMinimo;
                //La moneda de venta no coincide con la moneda del producto                                          
                if (prodActual.MONEDA == $("#cbo_moneda [data-tipo='MOBA']").val()) {
                    //Si es igual a la moneda base: Convierte a MOAL
                    precioVenta = parseFloat(prodActual.PRECIO_VENTA) / valorCambio;
                    precioMinimo = parseFloat(prodActual.PRECIO_MINIMO) / valorCambio;
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + precioVenta.toFixed(2) + '" onkeyup="return ValidaPrecioEstandar(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this,3)" />')
                    $("#txtPrecioUnitInicio").val(precioVenta.toFixed(2));
                } else {
                    //Si es igual a la moneda alterna: Convierte a MOBA
                    precioVenta = parseFloat(prodActual.PRECIO_VENTA) * valorCambio;
                    precioMinimo = parseFloat(prodActual.PRECIO_MINIMO) * valorCambio;
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + precioVenta.toFixed(2) + '" onkeyup="return ValidaPrecioEstandar(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this,3)" />')
                    $("#txtPrecioUnitInicio").val(precioVenta.toFixed(2));
                }
            }
            else {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" disabled="disabled" />')
            }
        }
    }
}

//Obtiene tipo de cambio INTERNO
function ListarValorCambio(monecode) {
    if (typeof $("#cbo_moneda [data-tipo='MOAL']").val() != "undefined" && $("#cbo_moneda [data-tipo='MOAL']").val() != "") {
        monecode = $("#cbo_moneda [data-tipo='MOAL']").val();

        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=TICA&MONEDA_CODE=" + monecode + "&TIPO_CAMBIO=INTERNO",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {
                    $('#lbl_TC').attr("style", "display:block");
                    $('#input_valor_cambio').attr("style", "display:block");
                    $('#lbl_fec_vig').attr("style", "display:block");
                    $('#input_fec_vig').attr("style", "display:block");
                    $('#txt_valor_cambio').val(datos[0].VALOR_CAMBIO_VENTA);
                    $('#txt_fec_vig').val(datos[0].FECHA_VIGENTE);
                }
                else {
                    $('#txt_valor_cambio').val("");
                    $('#txt_fec_vig').val("");
                }
            },
            error: function (msg) {
                alertCustom("Tipo de cambio Interno no se obtuvo correctamente.");
            }
        });
    }
}

//Obtiene tipo de cambio OFICIAL
function ListarValorCambioOficial(monecode) {
    if (typeof $("#cbo_moneda [data-tipo='MOAL']").val() != "undefined" && $("#cbo_moneda [data-tipo='MOAL']").val() != "") {
        monecode = $("#cbo_moneda [data-tipo='MOAL']").val();

        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=TICA&MONEDA_CODE=" + monecode + "&TIPO_CAMBIO=OFICIAL",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {
                    $('#lbl_TC_Oficial').attr("style", "display:block");
                    $('#input_valor_cambio_Oficial').attr("style", "display:block");
                    $('#lbl_fec_vig_Oficial').attr("style", "display:block");
                    $('#input_fec_vig_Oficial').attr("style", "display:block");
                    $('#txt_valor_cambio_Oficial').val(datos[0].VALOR_CAMBIO_VENTA);
                    $('#txt_fec_vig_Oficial').val(datos[0].FECHA_VIGENTE);
                }
                else {
                    $('#txt_valor_cambio_Oficial').val("");
                    $('#txt_fec_vig_Oficial').val("");
                }
            },
            error: function (msg) {
                alertCustom("Tipo de cambio Oficial no se obtuvo correctamente.");
            }
        });
    }
}

//Lista Clientes 
function fillTxtCliente(v_ID, v_value) {

    $("#divTxtClientes").html('<input id="txtClientes" class="span12" type="text" placeholder="Cliente" style="text-transform: uppercase" />');
    var selectRazonSocial = $(v_ID);
    if (asincrono == true) {
        Bloquear("divFilaCliente");
    }
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2&CTLG_CODE=" + $("#cbo_Empresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: asincrono,
        success: function (datos) {
            if (asincrono == true) {
                Desbloquear("divFilaCliente");
            }
            if (datos != null) {
                textclientes = selectRazonSocial.typeahead({
                    source: function (query, process) {
                        arrayRazonSocial = [];
                        map = {};
                        let oObjet = new Array();
                        for (var i = 0; i < datos.length; i++) {

                            arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                            var obj = {};
                            obj.TIPO_DOCUMENTO = datos[i].TIPO_DOCUMENTO;
                            obj.NRO_DOCUMENTO = datos[i].NRO_DOCUMENTO;
                            obj.CODIGO_TIPO_DOCUMENTO = datos[i].CODIGO_TIPO_DOCUMENTO;
                            obj.RUC = datos[i].RUC;
                            obj.RAZON_SOCIAL = datos[i].RAZON_SOCIAL;
                            obj.DIRECCION = datos[i].DIRECCION;
                            obj.CODIGO_CATEGORIA = datos[i].CODIGO_CATEGORIA;
                            obj.PIDM = datos[i].PIDM;
                            obj.DIAS = datos[i].DIAS;
                            obj.ID = datos[i].ID;
                            obj.AGENTE_RETEN_IND = datos[i].AGENTE_RETEN_IND;
                            obj.PPBIDEN_CONDICION_SUNAT = datos[i].PPBIDEN_CONDICION_SUNAT;
                            obj.PPBIDEN_ESTADO_SUNAT = datos[i].PPBIDEN_ESTADO_SUNAT;
                            oObjet.push(obj);
                        }
                        jsonClientes = oObjet;
                        $.each(oObjet, function (i, objeto) {
                            map[objeto.RAZON_SOCIAL] = objeto;
                        });
                        process(arrayRazonSocial);
                    },
                    updater: function (item) {

                        $("#lblHabido").html("");
                        $("#lblEstado").html("");

                        $('#cboDocumentoVenta').removeAttr("disabled");
                        $("#hfPIDM").val(map[item].PIDM);
                        $("#hfAgenteRetencionCliente").val(map[item].AGENTE_RETEN_IND);
                        $("#hfCodigoCategoriaCliente").val(map[item].CODIGO_CATEGORIA);
                        $("#hfCodigoTipoDocumento").val(map[item].CODIGO_TIPO_DOCUMENTO);
                        $("#hfTipoDocumento").val(map[item].TIPO_DOCUMENTO);
                        $("#hfNroDocumento").val(map[item].NRO_DOCUMENTO);
                        $("#hfRUC").val(map[item].RUC);
                        $("#hfDIR").val(map[item].DIRECCION);

                        if (map[item].PPBIDEN_CONDICION_SUNAT != "") {
                            $("#lblHabido").html("CONDICIÓN: " + "<b>" + map[item].PPBIDEN_CONDICION_SUNAT + "</b>");
                        }
                        if (map[item].PPBIDEN_ESTADO_SUNAT != "") {
                            $("#lblEstado").html("ESTADO: " + "<b>" + map[item].PPBIDEN_ESTADO_SUNAT + "</b>");
                        }



                        if (map[item].RUC != "") {
                            $('#cboTipoDoc').select2("val", "6").change();
                            $("#txtNroDctoCliente").val(map[item].RUC);
                            $("#btnHabido").show();
                        } else {
                            $('#cboTipoDoc').select2("val", map[item].CODIGO_TIPO_DOCUMENTO).change();
                            $("#txtNroDctoCliente").val(map[item].NRO_DOCUMENTO);
                            $("#btnHabido").hide();
                        }

                        if ($('#cboTipoDoc').val() == '6') {
                            $("#cboDocumentoVenta option:not([value=0001])").attr("disabled", "disabled");
                            $("#cboDocumentoVenta option[value=0012]").removeAttr("disabled");
                            $("#cboDocumentoVenta option[value=0001]").removeAttr("disabled");

                            var oItems = $('#cboDocumentoVenta option');
                            for (var i = 0; i < oItems.length; i++) {
                                if (oItems[i].value === "0012") {
                                    $("#cboDocumentoVenta").select2("val", "0012").change();
                                } else {
                                    $("#cboDocumentoVenta").select2("val", "0001").change();
                                }

                            }

                        } else {
                            $("#cboDocumentoVenta option:not([value=0001])").removeAttr("disabled");
                            $("#cboDocumentoVenta option[value=0001]").attr("disabled", "disabled");

                            var oItems = $('#cboDocumentoVenta option');
                            for (var i = 0; i < oItems.length; i++) {
                                if (oItems[i].value === "0012") {
                                    $("#cboDocumentoVenta").select2("val", "0012").change();
                                } else {
                                    $("#cboDocumentoVenta").select2("val", "0003").change();
                                }

                            }
                        }


                        //$("#txt_plazo_pago").val(map[item].DIAS);
                        //Cargar modo de pago
                        $("#cbo_modo_pago").select2('val', '0001');
                        $("#cbo_modo_pago").change();
                        $('#chk_retencion').prop('disabled', true);
                        $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                        $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                        //Evalua si se aplica retencion
                        if (map[item].AGENTE_RETEN_IND == 'S' && $("#cbo_Empresa :selected").attr("agente-reten-ind") == "N") {//CAMBIO_RETENCION
                            $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                            $('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');
                        }

                        if (map[item].DIAS > 0) {
                            $("#cbo_modo_pago").prop("disabled", false);
                        }
                        else {
                            $("#cbo_modo_pago").prop("disabled", true);
                        }

                        filltxtdescproducto('');
                        if (!carga_ini_ind) {
                            fillCboDirecciones(map[item].PIDM);
                        }
                        //CARGA POR DEFECTO
                        if ($("#cboDocumentoVenta").val() == "" && $("#txtNroDocVenta").val() == "") {
                            $("#cboDocumentoVenta").select2("val", "0012").change();
                        }
                        return item;
                    },
                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($("#txtClientes").val().length <= 0) {
                        $("#lblHabido").html("");
                        $("#lblEstado").html("");
                        $('#cbo_modo_pago, #chk_retencion, #txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true);
                        $('#chk_retencion').parent().removeClass('checked');
                        $('#cbo_modo_pago option:first-child').prop('selected', true);
                        $('#cbo_modo_pago').change();
                        $('#txt_plazo_pago').val('0');
                        if ($("#txt_fec_emision").val() != "") {
                            $('#txt_fec_vencimiento').val($("#txt_fec_emision").val());
                        } else {
                            $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                        }
                        if ($("#txtNroDctoCliente").val() != "" && $("#txtClientes").val() != "") {
                            $('#cboTipoDoc').val('1').change();
                        }
                        //$('#cboTipoDoc').prop('disabled', true);
                        $("#txtNroDctoCliente, #txt_id_proveedor, #txt_Retencion").val("");

                        //Limpiar valores   
                        $("#txtResponsablePago").val("").attr("disabled", "disabled");
                        $("#chkResponsablePago").prop("checked", false).parent().removeClass('checked');

                        $('#cboDocumentoVenta').attr("disabled", "disabled");
                        $('#cboDocumentoVenta').select2("val", "");

                        $('#cboSerieDocVenta').attr("disabled", "disabled");
                        $('#cboSerieDocVenta').empty().append('<option></option>').select2("val", "");
                        $("#txtNroDocVenta").val("");

                        $("#hfPIDM").val('');
                        $("#hfAgenteRetencionCliente").val('');
                        $("#hfCodigoCategoriaCliente").val('');
                        $("#hfCodigoTipoDocumento").val('');
                        $("#hfTipoDocumento").val('');
                        $("#hfNroDocumento").val('');
                        $("#hfRUC").val('');
                        $("#hfDIR").val('');
                        $("#hfCreditoDispMoba").val("0");
                        $("#lblTipoCorrelativo").html("");


                        $("#cbo_direccion").empty().html("<option></option>")
                        $("#cbo_direccion").select2("val", "")
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
        },
        error: function (msg) {
            alertCustom("Clientes no se listaron correctamente");
            Desbloquear("divFilaCliente");
        }
    });
}

//Lista Clientes para el campo Responsable Pago
function fillTxtResponsablePago() {
    $("#divResponsablePago").html('<input id="txtResponsablePago" class="span12" type="text" placeholder="Responsable Pago" style="text-transform: uppercase" disabled="disabled" />');
    var selectRazonSocial = $("#txtResponsablePago");
    var v_value = "";
    if (jsonClientes.length = 0) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2&CTLG=" + $("#cbo_Empresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: asincrono,
            success: function (datos) {
                if (datos != null) {
                    textclientes = selectRazonSocial.typeahead({
                        items: 100,
                        source: function (query, process) {
                            arrayRazonSocial = [];
                            map = {};
                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                if (datos[i].PIDM != $("#hfPIDM").val()) {
                                    arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                                    obj += '{';
                                    obj += '"TIPO_DOCUMENTO":"' + datos[i].TIPO_DOCUMENTO +
                                        '","NRO_DOCUMENTO":"' + datos[i].NRO_DOCUMENTO +
                                        '","CODIGO_TIPO_DOCUMENTO":"' + datos[i].CODIGO_TIPO_DOCUMENTO +
                                        '","RUC":"' + datos[i].RUC +
                                        '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL +
                                        '","DIRECCION":"' + datos[i].DIRECCION +
                                        '","CODIGO_CATEGORIA":"' + datos[i].CODIGO_CATEGORIA +
                                        '","PIDM":"' + datos[i].PIDM +
                                        '","DIAS":"' + datos[i].DIAS +
                                        '","ID":"' + datos[i].ID +
                                        '","AGENTE_RETEN_IND": "' + datos[i].AGENTE_RETEN_IND + '"';
                                    obj += '},';
                                }
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });
                            process(arrayRazonSocial);
                        },
                        updater: function (item) {
                            $("#hfResponsablePagoPIDM").val(map[item].PIDM);
                            let iDiasPlazo = parseInt(map[item].DIAS);
                            $("#txt_plazo_pago").val(iDiasPlazo);
                            //Cargar modo de pago
                            $("#cbo_modo_pago").select2('val', '0001');
                            $("#cbo_modo_pago").change();

                            if (iDiasPlazo > 0) {
                                $("#cbo_modo_pago").prop("disabled", false);
                            }
                            else {
                                $("#cbo_modo_pago").prop("disabled", true);
                            }
                            return item;
                        },
                    });


                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($("#txtResponsablePago").val().length <= 0) {

                            $('#cbo_modo_pago').prop('disabled', true);
                            $('#cbo_modo_pago option:first-child').prop('selected', true);

                            $('#txt_plazo_pago').val('0');
                            if ($("#txt_fec_emision").val() != "") {
                                $('#txt_fec_vencimiento').val($("#txt_fec_emision").val());
                            } else {
                                $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                            }
                            //Limpiar campos
                            $("#hfResponsablePagoPIDM").val("");
                            $("#txtClientes").keyup().siblings("ul").children("li").click();
                            $('#cbo_modo_pago').change();
                            $("#txtResponsablePago").focus();
                        }
                    });
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectRazonSocial.val(v_value);
                }
            },
            error: function (msg) {
                alertCustom("Responsables de pago no se listaron correctamente.");
            }
        });

    } else {
        textclientes = selectRazonSocial.typeahead({
            items: 100,
            source: function (query, process) {
                arrayRazonSocial = [];
                map = {};
                var obj = "[";
                for (var i = 0; i < jsonClientes.length; i++) {
                    if (jsonClientes[i].PIDM != $("#hfPIDM").val()) {
                        arrayRazonSocial.push(jsonClientes[i].RAZON_SOCIAL);
                        obj += '{';
                        obj += '"TIPO_DOCUMENTO":"' + jsonClientes[i].TIPO_DOCUMENTO +
                            '","NRO_DOCUMENTO":"' + jsonClientes[i].NRO_DOCUMENTO +
                            '","CODIGO_TIPO_DOCUMENTO":"' + jsonClientes[i].CODIGO_TIPO_DOCUMENTO +
                            '","RUC":"' + jsonClientes[i].RUC +
                            '","RAZON_SOCIAL":"' + jsonClientes[i].RAZON_SOCIAL +
                            '","DIRECCION":"' + jsonClientes[i].DIRECCION +
                            '","CODIGO_CATEGORIA":"' + jsonClientes[i].CODIGO_CATEGORIA +
                            '","PIDM":"' + jsonClientes[i].PIDM +
                            '","DIAS":"' + jsonClientes[i].DIAS +
                            '","ID":"' + jsonClientes[i].ID +
                            '","AGENTE_RETEN_IND": "' + jsonClientes[i].AGENTE_RETEN_IND + '"';
                        obj += '},';
                    }
                }
                obj += "{}";
                obj = obj.replace(",{}", "");
                obj += "]";
                var json = $.parseJSON(obj);

                $.each(json, function (i, objeto) {
                    map[objeto.RAZON_SOCIAL] = objeto;
                });
                process(arrayRazonSocial);
            },
            updater: function (item) {
                $("#hfResponsablePagoPIDM").val(map[item].PIDM);
                let iDiasPlazo = parseInt(map[item].DIAS);
                $("#txt_plazo_pago").val(iDiasPlazo);
                //Cargar modo de pago
                $("#cbo_modo_pago").select2('val', '0001');
                $("#cbo_modo_pago").change();
                if (iDiasPlazo > 0) {
                    $("#cbo_modo_pago").prop("disabled", false);
                }
                else {
                    $("#cbo_modo_pago").prop("disabled", true);
                }
                return item;
            },
        });
        selectRazonSocial.keyup(function () {
            $(this).siblings("ul").css("width", $(this).css("width"))
            if ($("#txtResponsablePago").val().length <= 0) {
                $('#cbo_modo_pago').prop('disabled', true);
                $('#cbo_modo_pago option:first-child').prop('selected', true);

                $('#txt_plazo_pago').val('0');
                if ($("#txt_fec_emision").val() != "") {
                    $('#txt_fec_vencimiento').val($("#txt_fec_emision").val());
                } else {
                    $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                }
                //Limpiar campos
                $("#hfResponsablePagoPIDM").val("");
                $("#txtClientes").keyup().siblings("ul").children("li").click();
                $('#cbo_modo_pago').change();
                $("#txtResponsablePago").focus();
            }
        });
    }

}

//Mostrar/Ocultar campos productos seriados. Valida si el producto es seriado y si chkDespachoVenta esta seleccionado (SIN USO)
function CamposProductosSeriados() {

    $("#cbo_correlativo").change();

    if ($("#hfCOD_PROD").val() != "" && $("#chkDespachoVenta").is(":checked") && $("#hfProdSeriado").val() == "S") {
        $("#div_vie_camp_seriados").slideDown();

        $("#txt_cantidad").val("1").attr("disabled", "disabled");
        //Precios para producto Seriado
        if (prodActual != null) {

            if (parseFloat($("#txtStockReal").val()) <= 0) {
                $("#cboBuscar").attr("disabled", "disabled");
                $("#txt_serie").attr("disabled", "disabled");
            } else {
                $("#cboBuscar").removeAttr("disabled");
                $("#txt_serie").removeAttr("disabled");
            }

            if (prodActual.PRECIO_IND == "C") {    //Obtener precio para cantidad de acuerdo a los Items Seleccionados de la Lista

                $("#txt_cantidad").val("1");
                ValidaPrecioCantidad();
            }
            else {//Precio estandar

                //TO DO
            }
        }
    }
    else {
        $("#div_vie_camp_seriados").slideUp();
        $("#txt_cantidad").removeAttr("disabled");
    }
}
//Agregar Detalle
var detallesVenta = [];
var detallesBonificacion = [];
var detallesMuestra = [];
function AgregarDetalleVenta() {

    if (!$("#chkBonificacion").is(":checked") && !$("#chkMuestra").is(":checked")) {

        var codeProd = $("#hfCOD_PROD").val();//no varia, es único  
        var codeProdAntiguo = $("#txt_cod_a_producto").val();

        var cantidad = $("#txt_cantidad").val();
        var unidadMedidaCode = $("#cbo_und_medida :selected").val();
        var unidadMedida = $("#cbo_und_medida :selected").html();
        var precioUnidad = $("#txtPrecioUnitario").val();
        var glosa = $.trim($("#txt_glosa_det").val());

        var nomProdVenta = $("#txt_desc_producto").val() + " " + glosa;
        var descuento = $("#txt_descuento_det").val();
        var unidadMedidaCode_Prod = $("#hfCodUnd_Producto").val();
        let equi = parseFloat($('#cbo_und_medida option:selected').attr('equivalencia'));

        //var prod;
        var objProd = prodActual; //Json Producto
        var factor = calcula_factor_conversion(unidadMedidaCode_Prod, unidadMedidaCode) // factor conversion unidades
        var totalBruto = (cantidad / factor) * precioUnidad;
        var totalNeto = totalBruto - descuento;
        //Validaciones iniciales
        var continuar = false;
        if (vErrors(["txt_cod_producto", "txt_cantidad", "cbo_und_medida", "txt_descuento_det", "txtPrecioUnitario", "cbo_Empresa", "cbo_Sucursal"])) {

            if (typeof prodActual.CODIGO != undefined) {
                if (parseFloat($("#txtPrecioUnitario").val()) == 0) {
                    alertCustom("No puede agregar un producto con precio 0.")
                }
                else if (parseFloat($("#txt_cantidad").val()) == 0) {
                    alertCustom("La cantidad debe ser mayor a 0.")
                }
                else if (validarStockInd == "S") {
                    if (prodActual.SERIADO == "S" && $("#chkDespachoVenta").is(":checked")) {
                        //TO DO
                        var cantSeriados = 0;
                        if ($("#cboBuscar").val() != null) {
                            cantSeriados = $("#cboBuscar").val().length;
                        }
                        if ((parseFloat(stockReal) - cantSeriados) < 0) {
                            alertCustom("No hay stock suficiente para el producto seleccionado. Algunos productos ya pudieron haber sido vendidos.");
                        }
                        else {
                            continuar = true
                        }
                    } else {
                        if ((parseFloat(stockReal) - parseFloat($("#txt_cantidad").val())) < 0 && prodActual.ALMACENABLE == "S") {
                            alertCustom("No hay stock suficiente para el producto seleccionado.");
                        } else {
                            continuar = true
                        }
                    }
                }
                else {
                    continuar = true
                }
            } else {
                alertCustom("Debe seleccionar un producto.")
            }
        }

        if (isNaN($("#txt_cantidad").val()) || isNaN($("#txt_descuento_det").val()) || isNaN($("#txtPrecioUnitario").val())) {
            continuar = false;
            alertCustom("Los valores ingresados no son válidos. Intente nuevamente.")
            LimpiarCamposDetalle();
        }
        //Fin validaciones
        var continuar2;
        if (continuar) {

            if (objProd != null && typeof objProd != "undefined") {
                if ($("#chkDespachoVenta").is(":checked")) { // CON DESPACHO EN VENTA
                    if ($("#hfProdSeriado").val() == "S") {

                        var cantSeriados;
                        if ($("#cboBuscar").val() != null) {
                            cantSeriados = $("#cboBuscar").val().length;
                            var codigos = [];
                            var series = [];
                            codigos = $("#cboBuscar").val().toString().split(",");
                            series = ObtenerSeries().split(",");
                            var objAux;

                            //if (prodActual.PRECIO_IND == "C") {//Obtener precio para cantidad de acuerdo a los Items Seleccionados de la Lista
                            //    $("#txt_cantidad").val(codigos.length);
                            //    ValidaPrecioCantidad();
                            //    precioUnidad = $("#txtPrecioUnitario").val();
                            //    $("#txt_cantidad").val("1");
                            //}
                            //else {//Precio estandar                    
                            //    precioUnidad = ObtenerPreciosProductoJSON(objProd[i].PROD_CODE, objProd[i].PRECIO_IND, objProd[i].TIPO_BIEN, $("#cbo_Empresa").val(), $("#cbo_Sucursal").val(), "PV");
                            //}

                            var totalBruto = cantidad * precioUnidad;
                            var totalNeto = totalBruto - descuento;

                            for (var i = 0; i < codigos.length; i++) {

                                //var indice = -1;
                                //for (var h = 0; h < detallesVenta.length; h++) {
                                //    if (detallesVenta[h].CODIGO_BARRAS == series[i]) {
                                //        indice = h;
                                //    }
                                //}

                                var indice = -1;
                                var indice_aux = -1;


                                for (var j = 0; j < detallesVenta.length; j++) {
                                    if (detallesVenta[j].CODIGO_BARRAS == series[i]) {
                                        indice_aux = j;
                                        indice = indice_aux;
                                    }
                                }

                                if (indice_aux == -1) {
                                    for (var h = 0; h < detallesBonificacion.length; h++) {
                                        if (detallesBonificacion[h].CODIGO_BARRAS == series[i]) {
                                            indice_aux = h;
                                            indice = indice_aux;
                                        }
                                    }
                                }


                                if (indice_aux == -1) {
                                    for (var x = 0; x < detallesMuestra.length; x++) {
                                        if (detallesMuestra[x].CODIGO_BARRAS == series[i]) {
                                            indice_aux = x;
                                            indice = indice_aux;
                                        }
                                    }
                                }


                                if (indice == -1) {

                                    var item = detallesVenta.length + 1;
                                    objProd.ITEM = item;
                                    objProd.DESC_UNIDAD = unidadMedida;
                                    objProd.CODE_UNIDAD_PROD_BASE = objProd.CODE_UNIDAD;
                                    objProd.CODE_UNIDAD = unidadMedidaCode;
                                    objProd.GLOSA = glosa;
                                    objProd.NOMBRE_IMPRESION = nomProdVenta + " - " + series[i];
                                    objProd.CODIGO = codigos[i];
                                    objProd.CODIGO_BARRAS = series[i];
                                    objProd.MONTO_DESCUENTO = descuento;
                                    objProd.CANTIDAD = cantidad;
                                    objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                                    objProd.PU = precioUnidad;
                                    objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                                    objProd.TOTAL_NETO = totalNeto.toFixed(2);
                                    objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                                    objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;

                                    //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)
                                    var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                                    var detraccion, isc;
                                    detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                                    objProd.MONTO_DETRAC = detraccion.toFixed(2);

                                    if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                        isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                        objProd.MONTO_ISC = isc.toFixed(2);
                                    } else {
                                        isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); // Total neto Con IGV
                                        objProd.MONTO_ISC = isc.toFixed(2);
                                    }
                                    objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();
                                    objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();

                                    $("#div_vie_camp_seriados").slideUp();
                                    objAux = jQuery.parseJSON(JSON.stringify(objProd));
                                    detallesVenta.push(objAux);

                                    //Bloquear edicion
                                    $("#cbo_moneda").attr("disabled", "disabled");
                                    $("#cbo_uni_medida").attr("disabled", "disabled");
                                    $("#cbo_Sucursal").attr("disabled", "disabled");
                                    $("#cbo_Empresa").attr("disabled", "disabled");
                                    $("#chkDespachoVenta").attr("disabled", "disabled");
                                    //
                                    $("#rbRedondeo,#rbDonacion").removeAttr("disabled");
                                }
                                else {
                                    $("#div_vie_camp_seriados").slideUp();
                                    alertCustom("La producto con serie " + series[i] + " ya ha sido ingresado.")
                                }
                            }

                            LimpiarCamposDetalle();
                            ListarTablaDetalles(ObtenerTablaDetalles());

                        } else {
                            cantSeriados = 0;
                            alertCustom("Debe seleccionar al menos 1 producto de la lista detallada.");
                        }

                    } else {
                        if (ValidarProductoAgregado(objProd) < 0) {
                            var item = detallesVenta.length + 1;
                            objProd.ITEM = item;
                            objProd.DESC_UNIDAD = unidadMedida;
                            objProd.CODE_UNIDAD_PROD_BASE = objProd.CODE_UNIDAD;
                            objProd.CODE_UNIDAD = unidadMedidaCode;
                            objProd.GLOSA = glosa;
                            objProd.NOMBRE_IMPRESION = nomProdVenta;
                            objProd.MONTO_DESCUENTO = descuento;
                            objProd.CANTIDAD = cantidad;
                            objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                            objProd.PU = precioUnidad;
                            objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                            objProd.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
                            objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                            objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;
                            //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)

                            var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                            var detraccion, isc;
                            detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                            objProd.MONTO_DETRAC = detraccion.toFixed(2);

                            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                objProd.MONTO_ISC = isc.toFixed(2);

                            } else {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                                objProd.MONTO_ISC = isc.toFixed(2);
                            }
                            objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();
                            detallesVenta.push(objProd);

                            //Bloquear edicion
                            $("#cbo_moneda").attr("disabled", "disabled");
                            $("#cbo_uni_medida").attr("disabled", "disabled");
                            $("#cbo_Sucursal").attr("disabled", "disabled");
                            $("#cbo_Empresa").attr("disabled", "disabled");
                            $("#chkDespachoVenta").attr("disabled", "disabled");
                            //
                            $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                            LimpiarCamposDetalle();
                            ListarTablaDetalles(ObtenerTablaDetalles());
                        }
                        else { alertCustom("El producto ya ha sido agregado."); }
                    }
                }
                else { // CON DESPACHO DIFERIDO: No se admite varias filas de seriados
                    if (ValidarProductoAgregado(objProd) < 0) {

                        var item = detallesVenta.length + 1;
                        objProd.ITEM = item;
                        objProd.DESC_UNIDAD = unidadMedida;
                        objProd.CODE_UNIDAD_PROD_BASE = objProd.CODE_UNIDAD;
                        objProd.CODE_UNIDAD = unidadMedidaCode;
                        objProd.GLOSA = glosa;
                        objProd.NOMBRE_IMPRESION = nomProdVenta;
                        objProd.MONTO_DESCUENTO = descuento;
                        objProd.CANTIDAD = cantidad;
                        objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                        objProd.PU = precioUnidad;
                        objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                        objProd.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
                        objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                        objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;
                        //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)

                        var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                        var detraccion, isc;
                        detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                        objProd.MONTO_DETRAC = detraccion.toFixed(2);

                        if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(2);

                        } else {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(2);
                        }
                        objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();
                        detallesVenta.push(objProd);

                        //Bloquear edicion
                        $("#cbo_moneda").attr("disabled", "disabled");
                        $("#cbo_uni_medida").attr("disabled", "disabled");
                        $("#cbo_Sucursal").attr("disabled", "disabled");
                        $("#cbo_Empresa").attr("disabled", "disabled");
                        $("#chkDespachoVenta").attr("disabled", "disabled");
                        //
                        $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                        LimpiarCamposDetalle();
                        ListarTablaDetalles(ObtenerTablaDetalles());

                    } else { alertCustom("El producto ya ha sido agregado."); }
                }


            } else { alertCustom("Error al obtener datos completos de producto."); }

            //CalcularDetraccion();
            //CalcularDatosMonetarios();
            //$("#lblImporteCobrar").html($("#txt_monto_total").val());
            //$("#txtMonto").val($("#txt_monto_total").val());
        }
    } else if ($("#chkBonificacion").is(":checked")) // DETALLE BONIFICACION
    {


        var codeProd = $("#hfCOD_PROD").val();//no varia, es único  
        var codeProdAntiguo = $("#txt_cod_a_producto").val();
        //var nomProdVenta = $("#txt_desc_producto").val();
        var cantidad = $("#txt_cantidad").val();
        var unidadMedidaCode = $("#cbo_und_medida :selected").val();
        var unidadMedida = $("#cbo_und_medida :selected").html();
        var precioUnidad = $("#txtPrecioUnitario").val();
        // var precioUnidad = 0.00;
        var glosa = $.trim($("#txt_glosa_det").val());
        var nomProdVenta = $("#txt_desc_producto").val() + " " + glosa;

        var descuento = $("#txt_descuento_det").val();

        //var prod;
        var objProd = prodActual; //Json Producto

        var totalBruto = cantidad * 0;
        var totalNeto = totalBruto - descuento;
        //Validaciones iniciales
        var continuar = false;

        if (vErrors(["txt_cod_producto", "txt_cantidad", "cbo_und_medida", "txt_descuento_det", "txtPrecioUnitario", "cbo_Empresa", "cbo_Sucursal"])) {

            if (typeof prodActual.CODIGO != undefined) {
                //if (parseFloat($("#txtPrecioUnitario").val()) == 0) {
                //    alertCustom("No puede agregar un producto con precio 0.")
                //}
                if (parseFloat($("#txt_cantidad").val()) == 0) {
                    alertCustom("La cantidad debe ser mayor a 0.")
                }
                else if (validarStockInd == "S") {
                    if (prodActual.SERIADO == "S" && $("#chkDespachoVenta").is(":checked")) {
                        //TO DO
                        var cantSeriados = 0;
                        if ($("#cboBuscar").val() != null) {
                            cantSeriados = $("#cboBuscar").val().length;
                        }
                        if ((parseFloat(stockReal) - cantSeriados) < 0) {
                            alertCustom("No hay stock suficiente para el producto seleccionado. Algunos productos ya pudieron haber sido vendidos.");
                        }
                        else {
                            continuar = true
                        }
                    } else {
                        if ((parseFloat(stockReal) - parseFloat($("#txt_cantidad").val())) < 0 && prodActual.ALMACENABLE == "S") {
                            alertCustom("No hay stock suficiente para el producto seleccionado.");
                        } else {
                            continuar = true
                        }
                    }
                }
                else {
                    continuar = true
                }
            } else {
                alertCustom("Debe seleccionar un producto.")
            }
        }
        if (isNaN($("#txt_cantidad").val()) || isNaN($("#txt_descuento_det").val()) || isNaN($("#txtPrecioUnitario").val())) {
            continuar = false;
            alertCustom("Los valores ingresados no son válidos. Intente nuevamente.")
            LimpiarCamposDetalle();
        }
        //Fin validaciones
        var continuar2;
        if (continuar) {

            if (objProd != null && typeof objProd != "undefined") {
                if ($("#chkDespachoVenta").is(":checked")) { // CON DESPACHO EN VENTA
                    if ($("#hfProdSeriado").val() == "S") {

                        var cantSeriados;
                        if ($("#cboBuscar").val() != null) {
                            cantSeriados = $("#cboBuscar").val().length;
                            var codigos = [];
                            var series = [];
                            codigos = $("#cboBuscar").val().toString().split(",");
                            series = ObtenerSeries().split(",");
                            var objAux;

                            //if (prodActual.PRECIO_IND == "C") {//Obtener precio para cantidad de acuerdo a los Items Seleccionados de la Lista
                            //    $("#txt_cantidad").val(codigos.length);
                            //    ValidaPrecioCantidad();
                            //    precioUnidad = $("#txtPrecioUnitario").val();
                            //    $("#txt_cantidad").val("1");
                            //}
                            //else {//Precio estandar                    
                            //    precioUnidad = ObtenerPreciosProductoJSON(objProd[i].PROD_CODE, objProd[i].PRECIO_IND, objProd[i].TIPO_BIEN, $("#cbo_Empresa").val(), $("#cbo_Sucursal").val(), "PV");
                            //}

                            var totalBruto = cantidad * 0;
                            var totalNeto = totalBruto - descuento;

                            for (var i = 0; i < codigos.length; i++) {

                                var indice = -1;
                                var indice_aux = -1;


                                for (var j = 0; j < detallesVenta.length; j++) {
                                    if (detallesVenta[j].CODIGO_BARRAS == series[i]) {
                                        indice_aux = j;
                                        indice = indice_aux;
                                    }
                                }

                                if (indice_aux == -1) {
                                    for (var h = 0; h < detallesBonificacion.length; h++) {
                                        if (detallesBonificacion[h].CODIGO_BARRAS == series[i]) {
                                            indice_aux = h;
                                            indice = indice_aux;
                                        }
                                    }
                                }


                                if (indice_aux == -1) {
                                    for (var x = 0; x < detallesMuestra.length; x++) {
                                        if (detallesMuestra[x].CODIGO_BARRAS == series[i]) {
                                            indice_aux = x;
                                            indice = indice_aux;
                                        }
                                    }
                                }




                                if (indice == -1) {

                                    var item = detallesBonificacion.length + 1;
                                    objProd.ITEM = item;
                                    objProd.DESC_UNIDAD = unidadMedida;
                                    objProd.CODE_UNIDAD = unidadMedidaCode;
                                    objProd.GLOSA = glosa;
                                    objProd.NOMBRE_IMPRESION = nomProdVenta + " - " + series[i];
                                    objProd.CODIGO = codigos[i];
                                    objProd.CODIGO_BARRAS = series[i];
                                    objProd.MONTO_DESCUENTO = descuento;
                                    objProd.CANTIDAD = cantidad;
                                    objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                                    objProd.PU = precioUnidad;
                                    objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                                    objProd.TOTAL_NETO = totalNeto.toFixed(2);

                                    //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)
                                    var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                                    var detraccion, isc;
                                    detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                                    objProd.MONTO_DETRAC = detraccion.toFixed(2);

                                    if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                        isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                        objProd.MONTO_ISC = isc.toFixed(2);
                                    } else {
                                        isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); // Total neto Con IGV
                                        objProd.MONTO_ISC = isc.toFixed(2);
                                    }
                                    objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();

                                    $("#div_vie_camp_seriados").slideUp();
                                    objAux = jQuery.parseJSON(JSON.stringify(objProd));
                                    detallesBonificacion.push(objAux);

                                    //Bloquear edicion
                                    $("#cbo_moneda").attr("disabled", "disabled");
                                    $("#cbo_uni_medida").attr("disabled", "disabled");
                                    $("#cbo_Sucursal").attr("disabled", "disabled");
                                    $("#cbo_Empresa").attr("disabled", "disabled");
                                    $("#chkDespachoVenta").attr("disabled", "disabled");
                                    //
                                    $("#rbRedondeo,#rbDonacion").removeAttr("disabled");
                                }
                                else {
                                    $("#div_vie_camp_seriados").slideUp();
                                    alertCustom("La producto con serie " + series[i] + " ya ha sido ingresado.")
                                }
                            }

                            LimpiarCamposDetalle();
                            ListarTablaDetallesBonificacion(ObtenerTablaDetallesBonificacion());

                        } else {
                            cantSeriados = 0;
                            alertCustom("Debe seleccionar al menos 1 producto de la lista detallada.");
                        }

                    } else {
                        if (ValidarProductoAgregadoBonificacion(objProd) < 0) {
                            var item = detallesBonificacion.length + 1;
                            objProd.ITEM = item;
                            objProd.DESC_UNIDAD = unidadMedida;
                            objProd.CODE_UNIDAD = unidadMedidaCode;
                            objProd.GLOSA = glosa;
                            objProd.NOMBRE_IMPRESION = nomProdVenta;
                            objProd.MONTO_DESCUENTO = descuento;
                            objProd.CANTIDAD = cantidad;
                            objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                            objProd.PU = precioUnidad;
                            objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                            objProd.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
                            //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)

                            var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                            var detraccion, isc;
                            detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                            objProd.MONTO_DETRAC = detraccion.toFixed(2);

                            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                objProd.MONTO_ISC = isc.toFixed(2);

                            } else {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                                objProd.MONTO_ISC = isc.toFixed(2);
                            }
                            objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();
                            detallesBonificacion.push(objProd);

                            //Bloquear edicion
                            $("#cbo_moneda").attr("disabled", "disabled");
                            $("#cbo_uni_medida").attr("disabled", "disabled");
                            $("#cbo_Sucursal").attr("disabled", "disabled");
                            $("#cbo_Empresa").attr("disabled", "disabled");
                            $("#chkDespachoVenta").attr("disabled", "disabled");
                            //
                            $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                            LimpiarCamposDetalle();
                            ListarTablaDetallesBonificacion(ObtenerTablaDetallesBonificacion());
                        }
                        else { alertCustom("El producto ya ha sido agregado."); }
                    }
                }
                else { // CON DESPACHO DIFERIDO: No se admite varias filas de seriados
                    if (ValidarProductoAgregadoBonificacion(objProd) < 0) {

                        var item = detallesBonificacion.length + 1;
                        objProd.ITEM = item;
                        objProd.DESC_UNIDAD = unidadMedida;
                        objProd.CODE_UNIDAD = unidadMedidaCode;
                        objProd.GLOSA = glosa;
                        objProd.NOMBRE_IMPRESION = nomProdVenta;
                        objProd.MONTO_DESCUENTO = descuento;
                        objProd.CANTIDAD = cantidad;
                        objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                        objProd.PU = precioUnidad;
                        objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                        objProd.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
                        //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)

                        var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                        var detraccion, isc;
                        detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                        objProd.MONTO_DETRAC = detraccion.toFixed(2);

                        if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(2);

                        } else {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(2);
                        }
                        objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();
                        detallesBonificacion.push(objProd);

                        //Bloquear edicion
                        $("#cbo_moneda").attr("disabled", "disabled");
                        $("#cbo_uni_medida").attr("disabled", "disabled");
                        $("#cbo_Sucursal").attr("disabled", "disabled");
                        $("#cbo_Empresa").attr("disabled", "disabled");
                        $("#chkDespachoVenta").attr("disabled", "disabled");
                        //
                        $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                        LimpiarCamposDetalle();
                        ListarTablaDetallesBonificacion(ObtenerTablaDetallesBonificacion());

                    } else { alertCustom("El producto ya ha sido agregado."); }
                }


            } else { alertCustom("Error al obtener datos completos de producto."); }


        }
    } else if ($("#chkMuestra").is(":checked")) {  // DETALLESSSSS MUESTRA

        var codeProd = $("#hfCOD_PROD").val();//no varia, es único  
        var codeProdAntiguo = $("#txt_cod_a_producto").val();
        //var nomProdVenta = $("#txt_desc_producto").val();
        var cantidad = $("#txt_cantidad").val();
        var unidadMedidaCode = $("#cbo_und_medida :selected").val();
        var unidadMedida = $("#cbo_und_medida :selected").html();
        var precioUnidad = $("#txtPrecioUnitario").val();
        // var precioUnidad = 0.00;
        var glosa = $.trim($("#txt_glosa_det").val());
        var nomProdVenta = $("#txt_desc_producto").val() + " " + glosa;
        var descuento = $("#txt_descuento_det").val();

        //var prod;
        var objProd = prodActual; //Json Producto

        var totalBruto = cantidad * 0;
        var totalNeto = totalBruto - descuento;
        //Validaciones iniciales
        var continuar = false;

        if (vErrors(["txt_cod_producto", "txt_cantidad", "cbo_und_medida", "txt_descuento_det", "txtPrecioUnitario", "cbo_Empresa", "cbo_Sucursal"])) {

            if (typeof prodActual.CODIGO != undefined) {
                //if (parseFloat($("#txtPrecioUnitario").val()) == 0) {
                //    alertCustom("No puede agregar un producto con precio 0.")
                //}
                if (parseFloat($("#txt_cantidad").val()) == 0) {
                    alertCustom("La cantidad debe ser mayor a 0.")
                }
                else if (validarStockInd == "S") {
                    if (prodActual.SERIADO == "S" && $("#chkDespachoVenta").is(":checked")) {
                        //TO DO
                        var cantSeriados = 0;
                        if ($("#cboBuscar").val() != null) {
                            cantSeriados = $("#cboBuscar").val().length;
                        }
                        if ((parseFloat(stockReal) - cantSeriados) < 0) {
                            alertCustom("No hay stock suficiente para el producto seleccionado. Algunos productos ya pudieron haber sido vendidos.");
                        }
                        else {
                            continuar = true
                        }
                    } else {
                        if ((parseFloat(stockReal) - parseFloat($("#txt_cantidad").val())) < 0 && prodActual.ALMACENABLE == "S") {
                            alertCustom("No hay stock suficiente para el producto seleccionado.");
                        } else {
                            continuar = true
                        }
                    }
                }
                else {
                    continuar = true
                }
            } else {
                alertCustom("Debe seleccionar un producto.")
            }
        }
        if (isNaN($("#txt_cantidad").val()) || isNaN($("#txt_descuento_det").val()) || isNaN($("#txtPrecioUnitario").val())) {
            continuar = false;
            alertCustom("Los valores ingresados no son válidos. Intente nuevamente.")
            LimpiarCamposDetalle();
        }
        //Fin validaciones
        var continuar2;
        if (continuar) {

            if (objProd != null && typeof objProd != "undefined") {
                if ($("#chkDespachoVenta").is(":checked")) { // CON DESPACHO EN VENTA
                    if ($("#hfProdSeriado").val() == "S") {

                        var cantSeriados;
                        if ($("#cboBuscar").val() != null) {
                            cantSeriados = $("#cboBuscar").val().length;
                            var codigos = [];
                            var series = [];
                            codigos = $("#cboBuscar").val().toString().split(",");
                            series = ObtenerSeries().split(",");
                            var objAux;

                            //if (prodActual.PRECIO_IND == "C") {//Obtener precio para cantidad de acuerdo a los Items Seleccionados de la Lista
                            //    $("#txt_cantidad").val(codigos.length);
                            //    ValidaPrecioCantidad();
                            //    precioUnidad = $("#txtPrecioUnitario").val();
                            //    $("#txt_cantidad").val("1");
                            //}
                            //else {//Precio estandar                    
                            //    precioUnidad = ObtenerPreciosProductoJSON(objProd[i].PROD_CODE, objProd[i].PRECIO_IND, objProd[i].TIPO_BIEN, $("#cbo_Empresa").val(), $("#cbo_Sucursal").val(), "PV");
                            //}

                            var totalBruto = cantidad * 0;
                            var totalNeto = totalBruto - descuento;

                            for (var i = 0; i < codigos.length; i++) {

                                var indice = -1;
                                var indice_aux = -1;


                                for (var j = 0; j < detallesVenta.length; j++) {
                                    if (detallesVenta[j].CODIGO_BARRAS == series[i]) {
                                        indice_aux = j;
                                        indice = indice_aux;
                                    }
                                }

                                if (indice_aux == -1) {
                                    for (var h = 0; h < detallesBonificacion.length; h++) {
                                        if (detallesBonificacion[h].CODIGO_BARRAS == series[i]) {
                                            indice_aux = h;
                                            indice = indice_aux;
                                        }
                                    }
                                }


                                if (indice_aux == -1) {
                                    for (var x = 0; x < detallesMuestra.length; x++) {
                                        if (detallesMuestra[x].CODIGO_BARRAS == series[i]) {
                                            indice_aux = x;
                                            indice = indice_aux;
                                        }
                                    }
                                }



                                if (indice == -1) {

                                    var item = detallesMuestra.length + 1;
                                    objProd.ITEM = item;
                                    objProd.DESC_UNIDAD = unidadMedida;
                                    objProd.CODE_UNIDAD = unidadMedidaCode;
                                    objProd.GLOSA = glosa;
                                    objProd.NOMBRE_IMPRESION = nomProdVenta + " - " + series[i];
                                    objProd.CODIGO = codigos[i];
                                    objProd.CODIGO_BARRAS = series[i];
                                    objProd.MONTO_DESCUENTO = descuento;
                                    objProd.CANTIDAD = cantidad;
                                    objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                                    objProd.PU = precioUnidad;
                                    objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                                    objProd.TOTAL_NETO = totalNeto.toFixed(2);

                                    //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)
                                    var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                                    var detraccion, isc;
                                    detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                                    objProd.MONTO_DETRAC = detraccion.toFixed(2);

                                    if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                        isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                        objProd.MONTO_ISC = isc.toFixed(2);
                                    } else {
                                        isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); // Total neto Con IGV
                                        objProd.MONTO_ISC = isc.toFixed(2);
                                    }
                                    objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();

                                    $("#div_vie_camp_seriados").slideUp();
                                    objAux = jQuery.parseJSON(JSON.stringify(objProd));
                                    detallesMuestra.push(objAux);

                                    //Bloquear edicion
                                    $("#cbo_moneda").attr("disabled", "disabled");
                                    $("#cbo_uni_medida").attr("disabled", "disabled");
                                    $("#cbo_Sucursal").attr("disabled", "disabled");
                                    $("#cbo_Empresa").attr("disabled", "disabled");
                                    $("#chkDespachoVenta").attr("disabled", "disabled");
                                    //
                                    $("#rbRedondeo,#rbDonacion").removeAttr("disabled");
                                }
                                else {
                                    $("#div_vie_camp_seriados").slideUp();
                                    alertCustom("La producto con serie " + series[i] + " ya ha sido ingresado.")
                                }
                            }

                            LimpiarCamposDetalle();
                            ListarTablaDetallesMuestra(ObtenerTablaDetallesMuestra());

                        } else {
                            cantSeriados = 0;
                            alertCustom("Debe seleccionar al menos 1 producto de la lista detallada.");
                        }

                    } else {
                        if (ValidarProductoAgregadoMuestra(objProd) < 0) {
                            var item = detallesMuestra.length + 1;
                            objProd.ITEM = item;
                            objProd.DESC_UNIDAD = unidadMedida;
                            objProd.CODE_UNIDAD = unidadMedidaCode;
                            objProd.GLOSA = glosa;
                            objProd.NOMBRE_IMPRESION = nomProdVenta;
                            objProd.MONTO_DESCUENTO = descuento;
                            objProd.CANTIDAD = cantidad;
                            objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                            objProd.PU = precioUnidad;
                            objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                            objProd.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
                            //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)

                            var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                            var detraccion, isc;
                            detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                            objProd.MONTO_DETRAC = detraccion.toFixed(2);

                            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                objProd.MONTO_ISC = isc.toFixed(2);

                            } else {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                                objProd.MONTO_ISC = isc.toFixed(2);
                            }
                            objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();
                            detallesMuestra.push(objProd);

                            //Bloquear edicion
                            $("#cbo_moneda").attr("disabled", "disabled");
                            $("#cbo_uni_medida").attr("disabled", "disabled");
                            $("#cbo_Sucursal").attr("disabled", "disabled");
                            $("#cbo_Empresa").attr("disabled", "disabled");
                            $("#chkDespachoVenta").attr("disabled", "disabled");
                            //
                            $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                            LimpiarCamposDetalle();
                            ListarTablaDetallesMuestra(ObtenerTablaDetallesMuestra());
                        }
                        else { alertCustom("El producto ya ha sido agregado."); }
                    }
                }
                else { // CON DESPACHO DIFERIDO: No se admite varias filas de seriados
                    if (ValidarProductoAgregadoMuestra(objProd) < 0) {

                        var item = detallesMuestra.length + 1;
                        objProd.ITEM = item;
                        objProd.DESC_UNIDAD = unidadMedida;
                        objProd.CODE_UNIDAD = unidadMedidaCode;
                        objProd.GLOSA = glosa;
                        objProd.NOMBRE_IMPRESION = nomProdVenta;
                        objProd.MONTO_DESCUENTO = descuento;
                        objProd.CANTIDAD = cantidad;
                        objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                        objProd.PU = precioUnidad;
                        objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                        objProd.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
                        //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)

                        var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                        var detraccion, isc;
                        detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                        objProd.MONTO_DETRAC = detraccion.toFixed(2);

                        if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(2);

                        } else {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(2);
                        }
                        objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();
                        detallesMuestra.push(objProd);

                        //Bloquear edicion
                        $("#cbo_moneda").attr("disabled", "disabled");
                        $("#cbo_uni_medida").attr("disabled", "disabled");
                        $("#cbo_Sucursal").attr("disabled", "disabled");
                        $("#cbo_Empresa").attr("disabled", "disabled");
                        $("#chkDespachoVenta").attr("disabled", "disabled");
                        //
                        $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                        LimpiarCamposDetalle();
                        ListarTablaDetallesMuestra(ObtenerTablaDetallesMuestra());

                    } else { alertCustom("El producto ya ha sido agregado."); }
                }


            } else { alertCustom("Error al obtener datos completos de producto."); }


        }
    }

    $("#chkBonificacion").prop('checked', false).parent().removeClass('checked');
    $("#chkMuestra").prop('checked', false).parent().removeClass('checked');
    $("#chkMuestra").attr("disabled", false)
    $("#chkBonificacion").attr("disabled", false)
    //$("#txtPrecioUnitario").attr("disabled", false);

    CalcularDetraccion();
    CalcularDatosMonetarios();
    $("#lblImporteCobrar").html($("#txt_monto_total").val());

    if ($('#cbo_modo_pago').val() == '0002') {
        $("#txtMonto").val('');
    } else {
        $("#txtMonto").val($("#txt_monto_total").val());
    }

    //$("#txtMonto").val($("#txt_monto_total").val());

}
//-------------------------------------------------
//--------------- ANTICIPOS -----------------------
//-------------------------------------------------

seleccionados = new Array();
function AgregarAnticipo() {

    var filas = tabla_det.api(true).rows('.seleccionado').data().toArray();
    var item = '';
    for (var i in filas) {
        item = filas[i].CODIGO;
        if (seleccionados.indexOf(item) < 0) {
            var objProd = ObtenerAnticipoCompleto(item);
            console.log(objProd);
            detallesVenta.push(objProd);
            seleccionados.push(item);
            $("#cbo_moneda").attr("disabled", "disabled");
            $("#cbo_uni_medida").attr("disabled", "disabled");
            $("#cbo_Sucursal").attr("disabled", "disabled");
            $("#cbo_Empresa").attr("disabled", "disabled");
            $("#chkDespachoVenta,#txtNroDctoCliente,#txtClientes").attr("disabled", "disabled");
            $("#cboTipoDoc").attr("disabled", "disabled");
            //
            $("#rbRedondeo,#rbDonacion").removeAttr("disabled");
        }
    }
    LimpiarCamposDetalle();
    ListarTablaDetalles(ObtenerTablaDetalles());
    CalcularDetraccion();
    CalcularDatosMonetarios();
    $("#lblImporteCobrar").html($("#txt_monto_total").val());
    $("#txtMonto").val($("#txt_monto_total").val());
    $('#divAnticipos').modal('hide');
}

function ObtenerAnticipoCompleto(anticipoCode) {
    var anticipoJSON = [];
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/NVMANTI.ashx?OPCION=2&p_TIPO=1&p_ACCION=5&p_CODE_COTI=" + anticipoCode + "&CLIENTE=" + $("#hfPIDM").val() + "&p_CTLG_CODE=" + $("#cbo_Empresa").val() + "&p_SCSL_CODE=" + $("#cbo_Sucursal").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (!isEmpty(datos)) {//datos != null && datos.length != 0) {
                var prod = "";
                var itemfuncion = detallesVenta.length == 0 ? 1 : (parseInt(detallesVenta[detallesVenta.length - 1].ITEM) + 1);

                prod = '{';
                prod += '"ITEM":"' + itemfuncion + '",';
                prod += '"CTLG":"' + datos[0].EMPRESA + '",';
                prod += '"CODIGO":"' + datos[0].CODIGO + '",';
                prod += '"PROD_CODE_ANTIGUO":"' + datos[0].CODIGO + '",';
                prod += '"MONEDA":"' + datos[0].MONEDA + '",';
                prod += '"PROD_NOMBRE":"ANTICIPO DE CLIENTE",';
                prod += '"PROD_NOMBRE_COMERCIAL":"ANTICIPO DE CLIENTE",';
                prod += '"GLOSA":"' + datos[0].GLOSA + '",';
                prod += '"CANTIDAD":"1",';
                prod += '"CODE_UNIDAD":"0007",';
                prod += '"DESC_UNIDAD":"UNIDADES",';
                prod += '"NOMBRE_IMPRESION":"ANTICIPO DE CLIENTE (' + datos[0].NUM_DCTO + ' - ' + datos[0].EMISION + ')",';


                var base = (datos[0].MONEDA == "0002" ? parseFloat(datos[0].VALOR) : (parseFloat(datos[0].VALOR_CAMBIO_OFI) * parseFloat(datos[0].VALOR)));
                var convert = (datos[0].MONEDA == "0003" ? parseFloat(datos[0].VALOR) : (parseFloat(datos[0].VALOR) / parseFloat(datos[0].VALOR_CAMBIO_OFI)));
                var isc_base = (datos[0].MONEDA == "0002" ? parseFloat(datos[0].ISC) : (parseFloat(datos[0].VALOR_CAMBIO_OFI) * parseFloat(datos[0].ISC)));
                var isc_alt = (datos[0].MONEDA == "0003" ? parseFloat(datos[0].ISC) : (parseFloat(datos[0].ISC) / parseFloat(datos[0].VALOR_CAMBIO_OFI)));

                var pu = base * (-1);
                var pu_convert = convert * (-1);
                var isc = isc_base * (-1);
                var isc_convert = isc_alt * (-1);

                if (!($("#cbo_moneda").val() == '0002')) {
                    pu = convert * (-1);
                    pu_convert = base * (-1);
                    isc = isc_alt * (-1);
                    isc_convert = isc_base * (-1);
                }


                prod += '"PU":"' + pu.toString().Redondear() + '",';
                prod += '"TOTAL_BRUTO":"' + pu.toString().Redondear() + '",';
                prod += '"DESCUENTO":"0",';
                prod += '"MONTO_DESCUENTO":"0",';
                prod += '"TOTAL_NETO":"' + pu.toString().Redondear() + '",';
                prod += '"MONTO_DETRAC":"0",';
                prod += '"MONTO_ISC":"' + isc.toString().Redondear() + '",';

                //Indicadores/valores otros de producto
                prod += '"SERIADO":"N",';
                prod += '"CODIGO_SERIADO":"",';
                prod += '"CODIGO_BARRAS":"",';
                prod += '"PRECIO_IND":"E",'; //Cantidad - Estandar

                var igv = (parseFloat(datos[0].PCTJ_IGV) / 100);
                var pVenta = pu / (igv + 1);
                var pMinimo = pu / (igv + 1);
                prod += '"PRECIO_VENTA":"' + pVenta.toString().Redondear() + '",';//E
                prod += '"PRECIO_MINIMO":"' + pMinimo.toString().Redondear() + '",';//E
                prod += '"RANGOS_PRECIO":[] ,'; //C
                //ObtenerPreciosProductoJSON(datos[0].CODIGO, datos[0].PRECIO_IND, datos[0].TIPO_BIEN, datos[0].CTLG, $("#cbo_Sucursal").val(), "STR");

                prod += '"PRECIO_DETALLE":"' + pu.toString().Redondear() + '",'; //E Y C
                prod += '"DETRACCION":"2",';
                prod += '"DETRACCION_PORCENTAJE":"0",';
                prod += '"TIPO_BIEN":"GRA",';
                prod += '"ISC":"' + pu_convert.toString().Redondear() + '",';
                //MONTOS CONVERT
                prod += '"CONVERT_ISC":"' + isc_convert.toString().Redondear() + '",';
                prod += '"CONVERT_MONTO_DETRAC":"0",';
                prod += '"CONVERT_PRECIO_DETALLE":"' + pu_convert.toString().Redondear() + '",';
                prod += '"CONVERT_MONTO_DESCUENTO":"0",';
                prod += '"CONVERT_TOTAL_BRUTO":"' + pu_convert.toString().Redondear() + '",';
                prod += '"CONVERT_TOTAL_NETO":"' + pu_convert.toString().Redondear() + '",';
                //PENDIENTES
                prod += '"CTAS_CODE":"",';
                prod += '"CECO_CODE":"",';
                prod += '"ALMACENABLE":"N",';
                prod += '"TIPO_PROD":"",';
                prod += '"CODE_DCTO_ORIGEN":""';
                //prod += '"COSTO_PRODUCTO":""';
                prod += '}';
                anticipoJSON = JSON.parse(prod);
            }
        },
        error: function (msg) {
            alertCustom("No se obtuvo correctamente datos de Anticipo.");
        }
    });
    return anticipoJSON;
}

function CrearListaAnticiposObjeto() {
    tabla_det = $('#tabla_det_anticipo').dataTable({
        order: [[1, "asc"]],
        data: null,
        columns: [
            { data: null, defaultContent: '<div class="checker"><span><input type="checkbox" class="chkFila" style="opacity: 0;"></span></div>', width: '5%', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
            { data: 'CODIGO', createdCell: function (cell, cellData, row) { $(cell).css('text-align', 'center').attr('id', row.CODIGO); }, width: '10%' },
            { data: 'NUM_DCTO', createdCell: function (cell, cellData, row) { $(cell).css('text-align', 'center'); }, width: '10%' },
            { data: 'MONTO_MOBA', createdCell: function (cell, cellData, row) { $(cell).css('text-align', 'center'); }, width: '10%' },
            { data: 'MONTO_MOAL', createdCell: function (cell, cellData, row) { $(cell).css('text-align', 'center'); }, width: '10%' },
            { data: 'MONEDA', createdCell: function (cell, cellData, row) { $(cell).css('text-align', 'center'); }, width: '10%' },
            { data: 'TIPO_CAMBIO', createdCell: function (cell, cellData, row) { $(cell).css('text-align', 'center'); }, width: '10%' },
            { data: 'GLOSA', createdCell: function (cell, cellData, row) { $(cell).css('text-align', 'left'); }, width: '10%' }
        ]
    });

    //$('#tabla_det tbody').unbind('click');
    $('#tabla_det_anticipo tbody').on('click', 'input[type=checkbox]', function () {
        $(this).parents('tr').toggleClass('seleccionado');
        $(this).parent().toggleClass('checked');
        //var eliminar = $('#tabla_det').DataTable().rows('.seleccionado').data().toArray().length <= 0
        //$('#btnEliminarDetalles').prop('disabled', eliminar);
    });
}

function ListarAnticipos() {
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/NVMANTI.ashx?OPCION=2&p_TIPO=3&p_ACCION=2&CLIENTE=" + $("#hfPIDM").val() + "&p_CTLG_CODE=" + $("#cbo_Empresa").val() + "&p_SCSL_CODE=" + $("#cbo_Sucursal").val(),
        contenttype: "application/json;",
        async: false,
        success: function (datos) {
            console.log(datos);
            tabla_det.fnClearTable();
            if (!isEmpty(datos)) {
                var seleccionindice = new Array();
                datos.filter(function (objeto, posicion) {
                    if (seleccionados.indexOf(objeto.CODIGO) > -1)
                        seleccionindice.push(posicion);
                });

                for (var i = 0; i < seleccionindice.length; i++) {
                    var itemyi = parseInt(seleccionindice[i].toString());
                    datos.splice(itemyi, 1);
                    for (var j = (i + 1); j < seleccionindice.length; j++) {
                        var itemyj = parseInt(seleccionindice[j].toString());
                        var nuevoindice = itemyj - 1;
                        seleccionindice[j] = nuevoindice;
                    }
                }

                if (datos.length > 0)
                    tabla_det.fnAddData(datos);
            }
        },
        error: function (msg) {
            alertCustom("No se obtuvo correctamente datos de Anticipo.");
        }
    });
}

function ObtenerSeries() {
    var optns = $("#cboBuscar option");
    var nroSeries = "";
    var nroSelec = 0;
    var c = 0;
    $(optns).each(function (e, f) {
        if ($(f).is(":selected")) {
            nroSelec++;
        }
    });
    $(optns).each(function (e, f) {
        if ($(f).is(":selected")) {
            if (c == nroSelec - 1) {
                nroSeries += $(optns[e]).html();
            } else {
                nroSeries += $(optns[e]).html() + ",";
            }
            c++;
        }
    });

    return nroSeries;
}

//Limpiar campos para llenar nuevo producto
function LimpiarCamposDetalle() {
    $("#txt_cod_a_producto").focus();
    $('#txt_cod_a_producto, #txt_cod_producto,#txt_desc_producto').val('');
    $("#cbo_und_medida").select2('destroy');
    $("#cbo_und_medida").val('');
    $("#cbo_und_medida").select2();
    $("#cbo_und_medida").empty();

    $("#txt_cantidad").val('');
    $("#txtPrecioUnitario").val('');
    $("#txt_descuento_det").val('0.00');
    $("#txt_glosa_det").val('');
    $("#txtStockReal").val('');
    stockReal = 0;


    $("#hfCOD_PROD").val('');
    $("#hfCostoProducto").val('');
    prodActual = {};
    if (detallesVenta.length == 0) {
        $("#cbo_moneda").removeAttr("disabled");
        $("#chkDespachoVenta").removeAttr("disabled");
        $("#cbo_Sucursal").removeAttr("disabled");
        $("#cbo_Empresa").removeAttr("disabled");
        $("#txtClientes").removeAttr("disabled");
        $("#div_btn_completar").attr("style", "display:none");
        $("#rbRedondeo,#rbDonacion").attr("disabled", "disabled").prop('checked', false).parent().removeClass('checked');
    }
}

//Obtiene todos los datos de producto, precios, descuento por cliente. Devuelve un json con formato de detalle de venta
function ObtenerProductoCompleto(codeProd, cliePidm) {

    var productoJSON = [];
    var descuentoCliente = 0;
    // OBTENER DESCUENTO
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=6&PROD_CODE=" + codeProd + "&CODIGO_CATEGORIA=" + $("#hfCodigoCategoriaCliente").val() + "&CTLG_CODE=" + $("#cbo_Empresa").val() + "&SCSL=" + $("#cbo_Sucursal").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null && datos.length != 0) {
                descuentoCliente = (datos[0].DESCUENTO == "") ? 0 : parseFloat(datos[0].DESCUENTO);
            }
        },
        error: function (msg) {
            alertCustom("No se obtuvo correctamente descuento por Categoría de cliente.");
        }
    });
    //DATOS PRODUCTO E INICIALIZACION DE CAMPOS PARA DETALLE DE VENTA
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODTODOS" +
        "&PROD_CODE=" + codeProd +
        "&CTLG=" + $("#cbo_Empresa").val() +
        "&SCSL=" + $("#cbo_Sucursal").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null && datos.length != 0) {

                var prod = "";
                prod = '{';
                prod += '"ITEM":"",';
                prod += '"CTLG":"' + datos[0].CTLG + '",';
                prod += '"CODIGO":"' + datos[0].CODIGO + '",';
                prod += '"PROD_CODE_ANTIGUO":"' + datos[0].CODIGO_ANTIGUO + '",';
                prod += '"MONEDA":"' + datos[0].MONEDA + '",';
                prod += '"PROD_NOMBRE":"' + datos[0].DESC_ADM + '",';
                prod += '"PROD_NOMBRE_COMERCIAL":"' + datos[0].NOMBRE_COMERCIAL + '",';
                prod += '"GLOSA":"",';
                prod += '"CANTIDAD":"",';
                prod += '"CODE_UNIDAD":"' + datos[0].UNIDAD + '",';
                prod += '"DESC_UNIDAD":"",';
                prod += '"NOMBRE_IMPRESION":"' + datos[0].NOMBRE_COMERCIAL + '",';

                prod += '"PU":"0",';
                prod += '"TOTAL_BRUTO":"0",';
                prod += '"DESCUENTO":"' + descuentoCliente + '",';
                prod += '"MONTO_DESCUENTO":"0",';
                prod += '"TOTAL_NETO":"0",';
                prod += '"MONTO_DETRAC":"0",';
                prod += '"MONTO_ISC":"0",';
                //STOCK
                prod += '"STOCK_REAL":"' + datos[0].STOCK_REAL + '",';
                prod += '"STOCK_TOTAL":"' + datos[0].STOCK_TOTAL + '",';
                prod += '"COSTO_PRODUCTO":"' + datos[0].COSTO_PRODUCTO + '",';

                //Indicadores/valores otros de producto
                prod += '"SERIADO":"' + datos[0].SERIADA + '",';
                prod += '"CODIGO_SERIADO":"' + datos[0].CODIGO_SERIADO + '",';
                prod += '"CODIGO_BARRAS":"' + datos[0].CODIGO_BARRAS + '",';
                prod += '"PRECIO_IND":"' + datos[0].PRECIO_IND + '",'; //Cantidad - Estandar

                prod += ObtenerPreciosProductoJSON(datos[0].CODIGO, datos[0].PRECIO_IND, datos[0].TIPO_BIEN, datos[0].CTLG, $("#cbo_Sucursal").val(), "STR");

                prod += '"PRECIO_DETALLE":"0",'; //E Y C
                prod += '"DETRACCION":"' + datos[0].DETRACCION_DECIMALES + '",';
                prod += '"DETRACCION_PORCENTAJE":"' + datos[0].DETRACCION + '",';
                prod += '"TIPO_BIEN":"' + datos[0].TIPO_BIEN + '",';
                prod += '"ISC":"' + datos[0].ISC + '",';

                //MONTOS CONVERT
                prod += '"CONVERT_ISC":"0",';
                prod += '"CONVERT_MONTO_DETRAC":"0",';
                prod += '"CONVERT_PRECIO_DETALLE":"0",';
                prod += '"CONVERT_MONTO_DESCUENTO":"0",';
                prod += '"CONVERT_TOTAL_BRUTO":"0",';
                prod += '"CONVERT_TOTAL_NETO":"0",';
                //PENDIENTES
                prod += '"CTAS_CODE":"",';
                prod += '"CECO_CODE":"",';
                prod += '"ALMACENABLE":"' + datos[0].ALMACENABLE_IND + '",';
                prod += '"TIPO_PROD":"",';
                prod += '"CODE_DCTO_ORIGEN":""';
                prod += '}';
                productoJSON = JSON.parse(prod);
            }
        },
        error: function (msg) {
            alertCustom("No se obtuvo correctamente datos de producto.");
        }
    });
    return productoJSON;
}

function ObtenerPrecioProducto(codeProd, ctlg, scsl, precioInd) {
    var precios;
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=4&PROD_CODE=" + codeProd + "&CTLG=" + ctlg +
        "&PRECIO_IND=" + precioInd +
        "&SCSL=" + scsl +
        "&ALMC_CODE=" + $("#cbo_Sucursal :selected").attr("data-almc"),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            precios = datos;
        },
        error: function (msg) {
            alertCustom("Precio de producto no se obtuvo correctamente");
        }
    });
    return precios;
}

//Retorna fragmento de texto para JSON con los precios del producto
//EJM: 'PRECIO_VENTA":"0","PRECIO_MINIMO":"0","RANGOS_PRECIO":[{"RANGO":"100.00","PRECIO":"3.37"}],'
function ObtenerPreciosProductoJSON(codeProd, precioInd, tipoBien, ctlg, scsl, tipoRetorno) {
    var prod = "";
    var pv = "";
    var pm = "";
    var r;
    //PRECIO PARA SUCURSALES EXONERADAS
    if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {

        $("#chk_inc_igv").attr("disabled", "disabled").prop('checked', false).parent().removeClass('checked');
        var igv = parseFloat($("#hfIMPUESTO").val()) / 100;
        var precios = ObtenerPrecioProducto(codeProd, ctlg, scsl, precioInd);

        if (tipoBien == "EXO" || tipoBien == "INA") {
            //NO SE DESCUENTA IGV DE LOS PRECIOS PARA PRODUCTOS EXONERADOS E INAFECTOS
            if (precios.length > 0) {
                if (precioInd == "E") {//Precio estandar 
                    prod += '"PRECIO_VENTA":"' + precios[0].PRECIO_VENTA + '",';//E
                    prod += '"PRECIO_MINIMO":"' + precios[0].PRECIO_MINIMO + '",';//E
                    prod += '"RANGOS_PRECIO":[] ,'; //C

                    pv = precios[0].PRECIO_VENTA;
                    pm = precios[0].PRECIO_MINIMO;
                    r = [];
                }
                else {//Precio por cantidad 
                    prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                    prod += '"PRECIO_MINIMO":"' + "0" + '",';//E  
                    prod += '"RANGOS_PRECIO":' + JSON.stringify(precios) + ','; //C

                    pv = "0";
                    pm = "0";
                    r = precios;
                }
            } else {

                prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                prod += '"PRECIO_MINIMO":"' + "0" + '",';//E                    
                prod += '"RANGOS_PRECIO":[],'; //C

                pv = "0";
                pm = "0";
                r = [];
            }
        }
        else {
            //DESCONTAR IGV DE PRODUCTOS GRAVADOS
            if (precios.length > 0) {
                if (precioInd == "E") {//Precio estandar 
                    var pVenta = parseFloat(precios[0].PRECIO_VENTA) / (igv + 1);
                    var pMinimo = parseFloat(precios[0].PRECIO_MINIMO) / (igv + 1);
                    prod += '"PRECIO_VENTA":"' + pVenta.toFixed(2) + '",';//E
                    prod += '"PRECIO_MINIMO":"' + pMinimo.toFixed(2) + '",';//E
                    prod += '"RANGOS_PRECIO":[] ,'; //C

                    pv = pVenta.toFixed(2);
                    pm = pMinimo.toFixed(2);
                    r = [];
                }
                else {//Precio por cantidad 
                    var pPrecio;
                    for (var i = 0; i < precios.length; i++) {
                        pPrecio = parseFloat(precios[i].PRECIO) / (igv + 1);
                        precios[i].PRECIO = pPrecio.toFixed(2);
                    }
                    prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                    prod += '"PRECIO_MINIMO":"' + "0" + '",';//E  
                    prod += '"RANGOS_PRECIO":' + JSON.stringify(precios) + ','; //C

                    pv = "0";
                    pm = "0";
                    r = precios;
                }
            } else {

                prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                prod += '"PRECIO_MINIMO":"' + "0" + '",';//E                    
                prod += '"RANGOS_PRECIO":[],'; //C  

                pv = "0";
                pm = "0";
                r = [];
            }
        }

    } else {
        //PRECIO PARA SUCURSALES NO EXONERADAS
        $("#chk_inc_igv").removeAttr("disabled").prop('checked', true).parent().addClass('checked');
        var precios = ObtenerPrecioProducto(codeProd, ctlg, scsl, precioInd);

        if (precios.length > 0) {
            if (precioInd == "E") {//Precio estandar 
                prod += '"PRECIO_VENTA":"' + precios[0].PRECIO_VENTA + '",';//E
                prod += '"PRECIO_MINIMO":"' + precios[0].PRECIO_MINIMO + '",';//E
                prod += '"RANGOS_PRECIO":[] ,'; //C

                pv = precios[0].PRECIO_VENTA;
                pm = precios[0].PRECIO_MINIMO;
                r = [];

            }
            else {//Precio por cantidad 
                prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                prod += '"PRECIO_MINIMO":"' + "0" + '",';//E  
                prod += '"RANGOS_PRECIO":' + JSON.stringify(precios) + ','; //C

                pv = "0";
                pm = "0";
                r = precios;
            }
        } else {
            prod += '"PRECIO_VENTA":"' + "0" + '",';//E
            prod += '"PRECIO_MINIMO":"' + "0" + '",';//E                    
            prod += '"RANGOS_PRECIO":[],'; //C

            pv = "0";
            pm = "0";
            r = [];
        }
    }
    if (tipoRetorno == "PV") {//PRECIO_VENTA - STRING
        return pv;
    } else if (tipoRetorno == "PM") {//PRECIO MINIMO - STRING
        return pm;
    } else if (tipoRetorno == "R") {//RANDO DE PRECIO - ARREGLO
        return r;
    } else {//TODO CONCATENADO PARA JSON
        return prod;
    }
}

function ObtenerTablaDetalles() {
    var res = "";
    res = '<table id="tabla_det" class="display DTTT_selectable" border="0">'
    res += '<thead>'

    res += '<tr align="center">'
    res += '<th></th>'
    res += '<th>ITEM</th>'
    res += '<th>PRODUCTO</th>'
    res += '<th style="text-align: left">DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>PU</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCION</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesVenta.length; i++) {


        res += '<tr id="' + detallesVenta[i].ITEM + '">'

        res += '<td align="center"><a href="javascript:Delete(\'' + detallesVenta[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        res += '<td align="center">' + detallesVenta[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesVenta[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td ><textarea style="font-size: 11px;" disabled class="inputNombre" onkeyup="ActualizaNombreDetalle(\'' + detallesVenta[i].ITEM + '\',this.value,this);" maxlength="500" >' + detallesVenta[i].NOMBRE_IMPRESION + '</textarea></td>'

        res += '<td class="cantidad' + detallesVenta[i].ITEM + '" style="text-align: center">' + parseFloat(detallesVenta[i].CANTIDAD).toFixed(2) + '</td>'

        res += '<td align="center">' + detallesVenta[i].DESC_UNIDAD + '</td>'


        if (detallesVenta[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N" && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si es precio estandar es modificable
            res += '<td class="precio' + detallesVenta[i].ITEM + '" align="center"><input class="input2" type="text" onblur="ActualizaPrecioEstandarDetalle(this,this.value,\'' + i + '\')" value="' + detallesVenta[i].PRECIO_DETALLE + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        }
        else {
            res += '<td class="precio' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].PRECIO_DETALLE + '</td>'
        }

        res += '<td class="bruto' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].TOTAL_BRUTO + '</td>'

        res += '<td class="descuento' + detallesVenta[i].ITEM + '" style="text-align: center">' + detallesVenta[i].MONTO_DESCUENTO + '</td>'

        res += '<td class="suma neto' + detallesVenta[i].ITEM + '"   align="center">' + detallesVenta[i].TOTAL_NETO + '</td>'

        res += '<td class="isc" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].MONTO_ISC + '</td>'

        res += '<td class="detraccion" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].MONTO_DETRAC + '</td>'

        res += '<td class="glosa" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].GLOSA + '</td>'

        res += '</tr>'
    }

    res += '</tbody>'
    res += '</table>'
    return res;
}

function ObtenerTablaDetallesCompletado() {
    var res = "";
    res = '<table id="tabla_det" class="display DTTT_selectable" border="0">'
    res += '<thead>'

    res += '<tr align="center">'
    res += '<th></th>'
    res += '<th>ITEM</th>'
    res += '<th>PRODUCTO</th>'
    res += '<th style="text-align: left">DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>PU</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCION</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesVenta.length; i++) {


        res += '<tr id="' + detallesVenta[i].ITEM + '">'

        res += '<td align="center"><a href="javascript:Delete(\'' + detallesVenta[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        res += '<td align="center">' + detallesVenta[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesVenta[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td >' + detallesVenta[i].NOMBRE_IMPRESION + '</td>'

        res += '<td class="cantidad' + detallesVenta[i].ITEM + '" style="text-align: center">' + parseFloat(detallesVenta[i].CANTIDAD).toFixed(2) + '</td>'

        res += '<td align="center">' + detallesVenta[i].DESC_UNIDAD + '</td>'


        if (detallesVenta[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N" && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si es precio estandar es modificable
            res += '<td class="precio' + detallesVenta[i].ITEM + '" align="center"><input class="input2" type="text" onblur="ActualizaPrecioEstandarDetalle(this,this.value,\'' + i + '\')" value="' + detallesVenta[i].PRECIO_DETALLE + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        }
        else {
            res += '<td class="precio' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].PRECIO_DETALLE + '</td>'
        }

        res += '<td class="bruto' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].TOTAL_BRUTO + '</td>'

        res += '<td class="descuento' + detallesVenta[i].ITEM + '" style="text-align: center">' + detallesVenta[i].MONTO_DESCUENTO + '</td>'

        res += '<td class="suma neto' + detallesVenta[i].ITEM + '"   align="center">' + detallesVenta[i].TOTAL_NETO + '</td>'

        res += '<td class="isc" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].MONTO_ISC + '</td>'

        res += '<td class="detraccion" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].MONTO_DETRAC + '</td>'

        res += '<td class="glosa" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].GLOSA + '</td>'

        res += '</tr>'
    }

    res += '</tbody>'
    res += '</table>'
    return res;
}

function ObtenerTablaDetallesBonificacion() {
    var res = "";
    res = '<table id="tabla_det_boni" class="display DTTT_selectable" border="0">'
    res += '<thead>'

    res += '<tr align="center">'
    res += '<th></th>'
    res += '<th>ITEM</th>'
    res += '<th>PRODUCTO</th>'
    res += '<th style="text-align: left">DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>PU</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCION</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesBonificacion.length; i++) {


        res += '<tr id="' + detallesBonificacion[i].ITEM + '">'

        res += '<td align="center"><a href="javascript:DeleteBonificacion(\'' + detallesBonificacion[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        res += '<td align="center">' + detallesBonificacion[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesBonificacion[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td ><textarea class="inputNombre" disabled="disabled" onkeyup="ActualizaNombreDetalle(\'' + detallesBonificacion[i].ITEM + '\',this.value,this);" maxlength="500" >' + detallesBonificacion[i].NOMBRE_IMPRESION + '</textarea></td>'

        res += '<td class="cantidad' + detallesBonificacion[i].ITEM + '" style="text-align: center">' + parseFloat(detallesBonificacion[i].CANTIDAD).toFixed(2) + '</td>'

        res += '<td align="center">' + detallesBonificacion[i].DESC_UNIDAD + '</td>'

        if (detallesBonificacion[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N") {//Si es precio estandar es modificable
            res += '<td class="precio' + detallesBonificacion[i].ITEM + '" align="center"><input disabled="disabled" class="input2" type="text" onblur="ActualizaPrecioEstandarDetalle(this,this.value,\'' + i + '\')" value="' + detallesBonificacion[i].PRECIO_DETALLE + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        }
        else {
            res += '<td class="precio' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].PRECIO_DETALLE + '</td>'
        }

        res += '<td class="bruto' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].TOTAL_BRUTO + '</td>'

        res += '<td class="descuento' + detallesBonificacion[i].ITEM + '" style="text-align: center">' + detallesBonificacion[i].MONTO_DESCUENTO + '</td>'

        res += '<td class="suma neto' + detallesBonificacion[i].ITEM + '"   align="center">' + detallesBonificacion[i].TOTAL_NETO + '</td>'

        res += '<td class="isc" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].MONTO_ISC + '</td>'

        res += '<td class="detraccion" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].MONTO_DETRAC + '</td>'

        res += '<td class="glosa" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].GLOSA + '</td>'

        res += '</tr>'
    }

    res += '</tbody>'
    res += '</table>'
    return res;
}

function ObtenerTablaDetallesBonificacionCompletado() {
    var res = "";
    res = '<table id="tabla_det_boni" class="display DTTT_selectable" border="0">'
    res += '<thead>'

    res += '<tr align="center">'
    res += '<th></th>'
    res += '<th>ITEM</th>'
    res += '<th>PRODUCTO</th>'
    res += '<th style="text-align: left">DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>PU</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCION</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesBonificacion.length; i++) {


        res += '<tr id="' + detallesBonificacion[i].ITEM + '">'

        res += '<td align="center"><a href="javascript:DeleteBonificacion(\'' + detallesBonificacion[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        res += '<td align="center">' + detallesBonificacion[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesBonificacion[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td >' + detallesBonificacion[i].NOMBRE_IMPRESION + '</td>'

        res += '<td class="cantidad' + detallesBonificacion[i].ITEM + '" style="text-align: center">' + parseFloat(detallesBonificacion[i].CANTIDAD).toFixed(2) + '</td>'

        res += '<td align="center">' + detallesBonificacion[i].DESC_UNIDAD + '</td>'

        if (detallesBonificacion[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N") {//Si es precio estandar es modificable
            res += '<td class="precio' + detallesBonificacion[i].ITEM + '" align="center"><input disabled="disabled" class="input2" type="text" onblur="ActualizaPrecioEstandarDetalle(this,this.value,\'' + i + '\')" value="' + detallesBonificacion[i].PRECIO_DETALLE + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        }
        else {
            res += '<td class="precio' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].PRECIO_DETALLE + '</td>'
        }

        res += '<td class="bruto' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].TOTAL_BRUTO + '</td>'

        res += '<td class="descuento' + detallesBonificacion[i].ITEM + '" style="text-align: center">' + detallesBonificacion[i].MONTO_DESCUENTO + '</td>'

        res += '<td class="suma neto' + detallesBonificacion[i].ITEM + '"   align="center">' + detallesBonificacion[i].TOTAL_NETO + '</td>'

        res += '<td class="isc" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].MONTO_ISC + '</td>'

        res += '<td class="detraccion" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].MONTO_DETRAC + '</td>'

        res += '<td class="glosa" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].GLOSA + '</td>'

        res += '</tr>'
    }

    res += '</tbody>'
    res += '</table>'
    return res;
}

function ObtenerTablaDetallesMuestra() {
    var res = "";
    res = '<table id="tabla_det_muestra" class="display DTTT_selectable" border="0">'
    res += '<thead>'

    res += '<tr align="center">'
    res += '<th></th>'
    res += '<th>ITEM</th>'
    res += '<th>PRODUCTO</th>'
    res += '<th style="text-align: left">DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>VALOR REFERENCIAL</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCION</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesMuestra.length; i++) {


        res += '<tr id="' + detallesMuestra[i].ITEM + '">'

        res += '<td align="center"><a href="javascript:DeleteMuestra(\'' + detallesMuestra[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        res += '<td align="center">' + detallesMuestra[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesMuestra[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td ><textarea class="inputNombre" disabled="disabled" onkeyup="ActualizaNombreDetalle(\'' + detallesMuestra[i].ITEM + '\',this.value,this);" maxlength="500" >' + detallesMuestra[i].NOMBRE_IMPRESION + '</textarea></td>'

        res += '<td class="cantidad' + detallesMuestra[i].ITEM + '" style="text-align: center">' + parseFloat(detallesMuestra[i].CANTIDAD).toFixed(2) + '</td>'

        res += '<td align="center">' + detallesMuestra[i].DESC_UNIDAD + '</td>'

        if (detallesMuestra[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N") {//Si es precio estandar es modificable
            res += '<td class="precio' + detallesMuestra[i].ITEM + '" align="center"><input disabled="disabled" class="input2" type="text" onblur="ActualizaPrecioEstandarDetalle(this,this.value,\'' + i + '\')" value="' + detallesMuestra[i].PRECIO_DETALLE + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        }
        else {
            res += '<td class="precio' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].PRECIO_DETALLE + '</td>'
        }

        res += '<td class="bruto' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].TOTAL_BRUTO + '</td>'

        res += '<td class="descuento' + detallesMuestra[i].ITEM + '" style="text-align: center">' + detallesMuestra[i].MONTO_DESCUENTO + '</td>'

        res += '<td class="suma neto' + detallesMuestra[i].ITEM + '"   align="center">' + detallesMuestra[i].TOTAL_NETO + '</td>'

        res += '<td class="isc" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].MONTO_ISC + '</td>'

        res += '<td class="detraccion" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].MONTO_DETRAC + '</td>'

        res += '<td class="glosa" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].GLOSA + '</td>'

        res += '</tr>'
    }

    res += '</tbody>'
    res += '</table>'
    return res;
}

function ObtenerTablaDetallesMuestraCompletado() {
    var res = "";
    res = '<table id="tabla_det_muestra" class="display DTTT_selectable" border="0">'
    res += '<thead>'

    res += '<tr align="center">'
    res += '<th></th>'
    res += '<th>ITEM</th>'
    res += '<th>PRODUCTO</th>'
    res += '<th style="text-align: left">DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>VALOR REFERENCIAL</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCION</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesMuestra.length; i++) {


        res += '<tr id="' + detallesMuestra[i].ITEM + '">'

        res += '<td align="center"><a href="javascript:DeleteMuestra(\'' + detallesMuestra[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        res += '<td align="center">' + detallesMuestra[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesMuestra[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td >' + detallesMuestra[i].NOMBRE_IMPRESION + '</td>'

        res += '<td class="cantidad' + detallesMuestra[i].ITEM + '" style="text-align: center">' + parseFloat(detallesMuestra[i].CANTIDAD).toFixed(2) + '</td>'

        res += '<td align="center">' + detallesMuestra[i].DESC_UNIDAD + '</td>'

        if (detallesMuestra[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N") {//Si es precio estandar es modificable
            res += '<td class="precio' + detallesMuestra[i].ITEM + '" align="center"><input disabled="disabled" class="input2" type="text" onblur="ActualizaPrecioEstandarDetalle(this,this.value,\'' + i + '\')" value="' + detallesMuestra[i].PRECIO_DETALLE + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        }
        else {
            res += '<td class="precio' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].PRECIO_DETALLE + '</td>'
        }

        res += '<td class="bruto' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].TOTAL_BRUTO + '</td>'

        res += '<td class="descuento' + detallesMuestra[i].ITEM + '" style="text-align: center">' + detallesMuestra[i].MONTO_DESCUENTO + '</td>'

        res += '<td class="suma neto' + detallesMuestra[i].ITEM + '"   align="center">' + detallesMuestra[i].TOTAL_NETO + '</td>'

        res += '<td class="isc" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].MONTO_ISC + '</td>'

        res += '<td class="detraccion" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].MONTO_DETRAC + '</td>'

        res += '<td class="glosa" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].GLOSA + '</td>'

        res += '</tr>'
    }

    res += '</tbody>'
    res += '</table>'
    return res;
}

function ActualizaNombreDetalle(item, datos, txt) {
    var index = -1;
    for (var i = 0; i < detallesVenta.length; i++) {
        if (detallesVenta[i].ITEM == item) {
            index = i;
            break;
        }
    }
    if (index != -1) {
        if ($.trim(datos).length >= 3) {
            detallesVenta[index].NOMBRE_IMPRESION = datos;
        }
        else {
            txt.value = detallesVenta[index].NOMBRE_IMPRESION;
        }
    }
}

function ListarTablaDetalles(datos) {
    $("#div_tabla_det").attr("style", "display:block");
    $("#div_btn_completar").attr("style", "display:inline");
    $('#div_tabla_det').html(datos);

    $('#tabla_det').dataTable({
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

    $("#tabla_det tr").click(function () {
        item = $(this).attr('id');
    });
    $('#tabla_det_wrapper :first').remove()
}

function ListarTablaDetallesBonificacion(datos) {
    $("#porlet_boni").attr("style", "display:block");

    $('#div_tabla_det_boni').html(datos);

    $('#tabla_det_boni').dataTable({
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

    $("#tabla_det_boni tr").click(function () {
        item = $(this).attr('id');
    });
    $('#tabla_det_boni_wrapper :first').remove()
}

function ListarTablaDetallesMuestra(datos) {
    $("#porlet_muestra").attr("style", "display:block");

    $('#div_tabla_det_muestra').html(datos);

    $('#tabla_det_muestra').dataTable({
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

    $("#tabla_det_muestra tr").click(function () {
        item = $(this).attr('id');
    });
    $('#tabla_det_muestra_wrapper :first').remove()
}

//tiene cambios de anticipo
function Delete(item) {
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede eliminar un detalle de un documento ya 'Completado'")
    } else {
        $("#txtMonto").val("");
        var detallesNuevo = [];
        for (var i = 0; i < detallesVenta.length; i++) {
            if (detallesVenta[i].ITEM == item) {
                if (detallesVenta[i].CODIGO.indexOf("AP") > -1) {
                    var seleccionx = detallesVenta[i].CODIGO;
                    for (var j = 0; j < seleccionados.length; j++) {
                        if (seleccionados[j].toString().indexOf(seleccionx) > -1) {
                            seleccionados.splice(j, 1);
                        }
                    }

                }
                detallesVenta.splice(i, 1);
            }
        }
        for (var i = 0; i < detallesVenta.length; i++) {
            detallesVenta[i].ITEM = i + 1;
            detallesNuevo.push(detallesVenta[i]);
        }


        detallesVenta.splice(0, detallesVenta.length);
        detallesVenta = detallesNuevo;
        var datos = ObtenerTablaDetalles();


        $("#div_tabla_det").attr("style", "display:block");
        $("#div_btn_completar").attr("style", "display:inline");
        $('#div_tabla_det').html(datos);

        $('#tabla_det').dataTable({
            "info": false,
            "scrollX": true,
            "ordering": false,
            "aLengthMenu": 10,
            "iDisplayLength": 10,
            "oLanguage": {
                "sEmptyTable": "No hay datos disponibles en la tabla.",
                "sZeroRecords": "No hay datos disponibles en la tabla."
            }
        })

        $("#tabla_det tr").click(function () {
            item = $(this).attr('id');
        });
        $('#tabla_det_wrapper :first').remove()

        if (detallesVenta.length == 0) {
            $("#cbo_moneda").removeAttr("disabled");
            $("#chkDespachoVenta").removeAttr("disabled");
            $("#cbo_Sucursal").removeAttr("disabled");
            $("#cbo_Empresa").removeAttr("disabled");
            $("#txtClientes").removeAttr("disabled");
            $("#cboTipoDoc").removeAttr("disabled");
            $("#txtNroDctoCliente").removeAttr("disabled");
            $("#chkDespachoVenta").removeAttr("disabled");

            $("#div_btn_completar").attr("style", "display:none");
            $("#rbRedondeo,#rbDonacion").attr("disabled", "disabled").prop('checked', false).parent().removeClass('checked');

            $("#div_btn_add_prods,#divAgregarProducto").attr("style", "display:block");
            LimpiarCamposDetalle();
        } else {
            $("#cbo_moneda").attr("disabled", "disabled");
        }

        CalcularDetraccion();
        CalcularDatosMonetarios();
        $("#lblImporteCobrar").html($("#txt_monto_total").val());
    }
}

function DeleteBonificacion(item) {
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede eliminar un detalle de un documento ya 'Completado'")
    } else {
        $("#txtMonto").val("");
        var detallesNuevo = [];
        for (var i = 0; i < detallesBonificacion.length; i++) {
            if (detallesBonificacion[i].ITEM == item) {
                detallesBonificacion.splice(i, 1);
            }
        }
        for (var i = 0; i < detallesBonificacion.length; i++) {
            detallesBonificacion[i].ITEM = i + 1;
            detallesNuevo.push(detallesBonificacion[i]);
        }

        detallesBonificacion.splice(0, detallesBonificacion.length);
        detallesBonificacion = detallesNuevo;
        var datos = ObtenerTablaDetallesBonificacion();


        $("#div_tabla_det_boni").attr("style", "display:block");
        //$("#div_btn_completar").attr("style", "display:inline");
        $('#div_tabla_det_boni').html(datos);

        $('#tabla_det_boni').dataTable({
            "info": false,
            "scrollX": true,
            "ordering": false,
            "aLengthMenu": 10,
            "iDisplayLength": 10,
            "oLanguage": {
                "sEmptyTable": "No hay datos disponibles en la tabla.",
                "sZeroRecords": "No hay datos disponibles en la tabla."
            }
        })

        $("#tabla_det_boni tr").click(function () {
            item = $(this).attr('id');
        });
        $('#tabla_det_boni_wrapper :first').remove()


    }
}

function DeleteMuestra(item) {
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede eliminar un detalle de un documento ya 'Completado'")
    } else {
        $("#txtMonto").val("");
        var detallesNuevo = [];
        for (var i = 0; i < detallesMuestra.length; i++) {
            if (detallesMuestra[i].ITEM == item) {
                detallesMuestra.splice(i, 1);
            }
        }
        for (var i = 0; i < detallesMuestra.length; i++) {
            detallesMuestra[i].ITEM = i + 1;
            detallesNuevo.push(detallesMuestra[i]);
        }

        detallesMuestra.splice(0, detallesMuestra.length);
        detallesMuestra = detallesNuevo;
        var datos = ObtenerTablaDetallesMuestra();


        $("#div_tabla_det_muestra").attr("style", "display:block");
        //$("#div_btn_completar").attr("style", "display:inline");
        $('#div_tabla_det_muestra').html(datos);

        $('#tabla_det_muestra').dataTable({
            "info": false,
            "scrollX": true,
            "ordering": false,
            "aLengthMenu": 10,
            "iDisplayLength": 10,
            "oLanguage": {
                "sEmptyTable": "No hay datos disponibles en la tabla.",
                "sZeroRecords": "No hay datos disponibles en la tabla."
            }
        })

        $("#tabla_det_muestra tr").click(function () {
            item = $(this).attr('id');
        });
        $('#tabla_det_muestra_wrapper :first').remove()


    }
}

// CALCULOS

function CalcularDetraccion() {

    if ($("#hfCompletoInd").val() == "N") {

        var parametroDetraccion = parseFloat($("#hfParamDetraccion").val());

        var montoParaDetraccion = 0; // en MOBA o MOAL segun cbo_moneda
        var detraccionActual = 0;
        for (var i = 0; i < detallesVenta.length; i++) {
            //Suma montos netos de aquellos productos que tengan detraccion
            if (parseFloat(detallesVenta[i].MONTO_DETRAC) > 0) {
                montoParaDetraccion += parseFloat(detallesVenta[i].TOTAL_NETO);
                detraccionActual += parseFloat(detallesVenta[i].MONTO_DETRAC);
            }
        }

        //Muestra detraccion MOAL / MOBA
        var valorCambio = parseFloat($("#txt_valor_cambio").val());
        var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());

        $("#txt_monto_detraccion").val(detraccionActual.toFixed(2));


        var detraccionMoal, montoParaDetraccionMoal;
        if ($("#cbo_moneda :selected").attr("data-tipo") == "MOAL") {
            var detraccionMoba = detraccionActual * valorCambioOfi;
            detraccionMoal = detraccionActual;
            detraccionActual = detraccionMoba;
            var montoParaDetraccionMoba = montoParaDetraccion * valorCambioOfi;
            montoParaDetraccionMoal = montoParaDetraccion;
            montoParaDetraccion = montoParaDetraccionMoba;
        }

        $(".simboloMoneda").html($("#cbo_moneda :selected").attr("simbolo"));

        if (montoParaDetraccion >= parametroDetraccion && montoParaDetraccion != 0) {

            $('#chk_detraccion').prop('checked', true).parent().addClass('checked');
            if ($("#cbo_moneda :selected").attr("data-tipo") == "MOAL") {
                $("#txt_detraccion").val(detraccionMoal.toFixed(2));
            } else {
                $("#txt_detraccion").val(detraccionActual.toFixed(2));
            }

            $("#txt_num_op_detrac,#txt_fec_comp_detrac").prop('disabled', false);
            $('#chk_percepcion, #chk_retencion').prop('checked', false).parent().removeClass('checked');
            $('#txt_Percepcion, #txt_Retencion, #txt_num_comp_percep, #txt_estado_credito, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');
            $('#rbsinserie, #rbseriada').prop('disabled', true);
            $('#rbsinserie').prop('checked', true).parent().addClass('checked');
            $('#rbseriada').prop('checked', false).parent().removeClass('checked');
            cargarCuentaDetraccion();
        }
        else {

            if ($("#cbo_Empresa :selected").attr("agente-reten-ind") == "N" && $("#hfAgenteRetencionCliente").val() == "S") {//CAMBIO_RETENCION
                $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                $('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');

            } else {
                $("#txt_Retencion").val("0.00");
            }

            $('#chk_detraccion').prop('checked', false).parent().removeClass('checked');
            $("#txt_num_op_detrac, #txt_fec_comp_detrac").prop('disabled', true);
            $("#txt_detraccion").val("0.00");
        }
    }
}

function CalcularDatosMonetarios() {
    $(".simboloMoneda").html($("#cbo_moneda :selected").attr("simbolo"));

    if ($("#hfCompletoInd").val() == "N") {

        var baseImponible = 0;
        var descuento = 0;
        var isc = 0;
        var opExonerada = 0;
        var opGravada = 0;
        var opInafecta = 0;
        var igv = 0;
        var igvCalc = 0;
        var importeTotal = 0;
        var redondeo = 0;
        var percepcion = 0;
        var donacion = 0;
        var retencion = 0;
        var importeCobrar = 0;


        var igvTotalBoni = 0;


        //CALCULO PARA SUCURSALES NO EXONERADAS----------------------------
        //------------------------------------------------------------------

        if (true) {

            //INICIO RECORRIDO DETALLES
            for (var i = 0; i < detallesVenta.length; i++) {
                //Descuento total
                descuento += parseFloat(detallesVenta[i].MONTO_DESCUENTO);

                //ISC suma de todos los montos de ISC, de todos los producto que tengan ISC
                isc += parseFloat(detallesVenta[i].MONTO_ISC);

                //OPExonerada:
                //--Si la sucursal es exhonerada, todos los montos van a exonerada
                if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {

                    opExonerada += parseFloat(detallesVenta[i].TOTAL_NETO);
                }
                else {
                    if (detallesVenta[i].TIPO_BIEN == "EXO") {
                        opExonerada += parseFloat(detallesVenta[i].TOTAL_NETO);

                    } else if (detallesVenta[i].TIPO_BIEN == "INA") {
                        //OP inafecto:  INA 
                        opInafecta += parseFloat(detallesVenta[i].TOTAL_NETO);
                    }
                    else {
                        opGravada += parseFloat(detallesVenta[i].TOTAL_NETO);
                    }
                }
            }
            //FIN RECORRIDO DETALLES

            //IGV(%) igv definido como parametro de sistema
            igv = parseFloat($("#hfIMPUESTO").val());

            //INICIO RECORRIDO DETALLES BONIFICACION
            /*
            if (detallesBonificacion.length > 0) {
                for (var i = 0; i < detallesBonificacion.length; i++) {
                    //Descuento total
                    //descuento += parseFloat(detallesVenta[i].MONTO_DESCUENTO);

                    ////ISC suma de todos los montos de ISC, de todos los producto que tengan ISC
                    //isc += parseFloat(detallesVenta[i].MONTO_ISC);


                    var cantidad = parseFloat(detallesBonificacion[i].CANTIDAD)
                    var pu = parseFloat(detallesBonificacion[i].PU)

                    

                    


                    //OPExonerada:
                    //--Si la sucursal es exhonerada, todos los montos van a exonerada
                    if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {

                        igvTotalBoni = 0
                        return;
                    }
                    else {
                        if (detallesBonificacion[i].TIPO_BIEN == "EXO") {
                            igvTotalBoni += 0
                           
                            

                        } else if (detallesBonificacion[i].TIPO_BIEN == "INA") {
                            //OP inafecto:  INA 
                            igvTotalBoni += 0
                           
                        }
                        else {
                            var SinIgv = (cantidad * pu) / ((parseFloat(igv) / 100) + 1);

                            igvTotalBoni += SinIgv * (parseFloat(igv) / 100);
                        }
                    }




                }
            }
            */
            //FIN RECORRIDO DETALLES BONIFICACION



            //Op Gravada Sin IGV
            var opGravadaSinIGV = opGravada / (igv / 100 + 1); //Ejm. OpGrav/1.18   

            //IGV calculado de la operacion gravada sin IGV
            igvCalc = (opGravadaSinIGV * (parseFloat(igv) / 100));

            baseImponible += opExonerada + opInafecta + opGravadaSinIGV

            importeTotal = baseImponible + igvCalc;

            //Retención (Parametro:RETN): Si el cliente es agente de retención no aplica, si somos agentes de retención y ellos no, sí se aplica retención: 
            var parametroRetencion = parseFloat($("#hfParamRetencion").val()) / 100;

            if ($("#cbo_Empresa :selected").attr("agente-reten-ind") == "N" && $("#hfAgenteRetencionCliente").val() == "S") {//CAMBIO_RETENCION
                retencion = importeTotal * parametroRetencion;
                $("#txt_Retencion").val(retencion.toFixed(2));
            }


            if ($("#cbo_Empresa :selected").attr("agente-reten-ind") == "N" && $("#hfAgenteRetencionCliente").val() == "S") {//CAMBIO_RETENCION
                var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());
                var prmtMontoRetnMoba = parseFloat($("#hfParamMontoRetencion").val());
                var prmtMontoRetnMoal = prmtMontoRetnMoba / valorCambioOfi;
                var continuar = false;
                if ($("#cbo_moneda :selected").attr("data-tipo") == "MOBA") {
                    if (importeTotal > prmtMontoRetnMoba) {
                        continuar = true;
                    }
                } else {
                    if (importeTotal > prmtMontoRetnMoal) {
                        continuar = true;
                    }
                }
                if (continuar) {
                    //Aplicar detraccion
                    if (parseFloat($("#txt_detraccion").val()) >= parseFloat(retencion) && parseFloat($("#txt_detraccion").val()) != 0) {
                        retencion = 0;
                        if ($('#chk_retencion').is(":checked")) {
                            $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                            $('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');
                        }

                        $('#chk_detraccion').prop('checked', true).parent().addClass('checked');
                        $('#txt_num_op_detrac, #txt_fec_comp_detrac').prop('disabled', false).val('');
                    }//Aplicar Retencion
                    else {
                        $("#txt_detraccion").val("0.00");
                        if ($('#chk_detraccion').is(":checked")) {
                            $('#chk_detraccion').prop('checked', false).parent().removeClass('checked');
                            $('#txt_num_op_detrac, #txt_fec_comp_detrac').prop('disabled', true).val('');
                        }
                        $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                        $('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false);
                    }
                } else {//No se aplica retencion porque no cumplio con el parametro
                    retencion = 0;
                    if ($('#chk_retencion').is(":checked")) {
                        $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                        $('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');
                    }
                }
            }

            //Importe cobrar
            importeCobrar = parseFloat(importeTotal);
            if (parseFloat($("#txt_detraccion").val()) > parseFloat(retencion)) {
                importeCobrar -= parseFloat($("#txt_detraccion").val());
            } else {
                importeCobrar -= parseFloat(retencion);
            }

            //Redondeo: es la diferencia ejem: 10.56  a 10.60  redondeo= +0.04 

        } else {
        }



        $("#txt_base_imponible").val(baseImponible.toFixed(2));
        $("#txt_descuento").val(descuento.toFixed(2));
        $("#txt_isc").val(parseFloat(isc).toFixed(2));

        $("#txtOpExonerada").val(opExonerada.toFixed(2));
        $("#txtOpGravada").val(opGravadaSinIGV.toFixed(2));
        $("#txtOpInafecta").val(opInafecta.toFixed(2));

        $("#txt_impuesto").val(parseFloat(igv).toFixed(2));
        $("#txt_impuesto_calc").val(igvCalc.toFixed(2));
        $("#txt_subtotal").val(importeTotal.toFixed(2));

        $("#txt_Percepcion").val(percepcion.toFixed(2));
        $("#txt_Retencion").val(retencion.toFixed(2));

        gImporteCobrar = importeCobrar;
        $("#txt_monto_total").val(importeCobrar.toFixed(2));

        CalcularDonacionRedondeo(gImporteCobrar.toString());

        //-------------
        var importeCobrar = parseFloat(gImporteCobrar);
        if ($('#rbRedondeo').is(":checked")) {
            importeCobrar += parseFloat($("#txtRedondeo").val());
        }
        if ($('#rbDonacion').is(":checked")) {
            importeCobrar += parseFloat($("#txtDonacion").val());
        }

        $("#txt_monto_total").val(importeCobrar.toFixed(2))
        $("#lblImporteCobrar").html($("#txt_monto_total").val());

        $("#rbRedondeo").is(":checked") ? $("#txtRedondeo2").val($("#txtRedondeo").val()) : $("#txtRedondeo2").val("0.00");
        $("#rbDonacion").is(":checked") ? $("#txtDonacion2").val($("#txtDonacion").val()) : $("#txtDonacion2").val("0.00");
        //-------------

        if ($.trim($("#txt_detraccion").val()) == "") {
            $("#txt_detraccion").val("0.00");
        }
    }
}

// VALIDACIONES 

function ValidarProductoAgregado(obj) {
    for (var i = 0; i < detallesVenta.length; i++) {
        if (detallesVenta[i].CODIGO == obj.CODIGO) {
            return i;
        }
    }
    return -1;
}

function ValidarProductoAgregadoBonificacion(obj) {

    for (var i = 0; i < detallesBonificacion.length; i++) {
        if (detallesBonificacion[i].CODIGO == obj.CODIGO) {
            return i;
        }
    }

    return -1;
}

function ValidarProductoAgregadoMuestra(obj) {

    for (var i = 0; i < detallesMuestra.length; i++) {
        if (detallesMuestra[i].CODIGO == obj.CODIGO) {
            return i;
        }
    }

    return -1;
}

function ValidaPrecioEstandar(venta, min) {
    if (min == "") {
        min = "0";
    } else {
        var c = $("#txtPrecioUnitario").val();
        if ((c.indexOf(".")) > 0) {
            var nroDecimales = c.substring(c.indexOf(".") + 1, c.length).length;
            if (nroDecimales == 3) {
                $("#txtPrecioUnitario").val(c.substring(0, c.length - 1));
            }
        }
    }
    $("#txtPrecioUnitario").on("blur", function () {
        if (parseFloat($("#txtPrecioUnitario").val()) < parseFloat(min)) {
            infoCustom2("El valor ingresado no puede ser menor al precio mínimo: " + parseFloat(min).toFixed(2))
            $("#txtPrecioUnitario").val(parseFloat(min).toFixed(2));
        }
    });
    $('#txt_cantidad').keyup();
}

//Obtiene el precio cantidad para el producto seleccionado
function ValidaPrecioCantidad() {

    if (prodActual != null && prodActual.length != 0 && $("#txt_cantidad").val() != "") {
        if (prodActual.PRECIO_IND == "C") {


            if (typeof prodActual.RANGOS_PRECIO != "undefined" && prodActual.RANGOS_PRECIO.length > 0) {

                if (prodActual.MONEDA == $("#cbo_moneda").val()) {
                    //Moneda de producto coincide con la de cbo_moneda
                    var pLength = prodActual.RANGOS_PRECIO.length;

                    if (parseFloat($("#txt_cantidad").val()) < parseFloat(prodActual.RANGOS_PRECIO[1].RANGO)) {
                        $("#txtPrecioUnitario").val(prodActual.RANGOS_PRECIO[1].PRECIO)
                        return;
                    } else {
                        for (var i = pLength - 1; i > 0; i--) {
                            if (parseFloat($("#txt_cantidad").val()) >= parseFloat(prodActual.RANGOS_PRECIO[i].RANGO)) {
                                $("#txtPrecioUnitario").val(prodActual.RANGOS_PRECIO[i].PRECIO)
                                break;                            
                            }
                        }
                    }
                    
                    if ($("#txtPrecioUnitario").val() == "" || parseFloat($("#txt_cantidad").val()) < parseFloat(prodActual.RANGOS_PRECIO[0].RANGO)) {
                        $("#txtPrecioUnitario").val(prodActual.RANGOS_PRECIO[0].PRECIO)
                    }

                }
                else {
                    //Moneda de producto no coincide con la de cbo_moneda
                    var valorCambio = parseFloat($("#txt_valor_cambio").val());
                    var precio;
                    if (prodActual.MONEDA == $("#cbo_moneda [data-tipo='MOBA']").val()) {
                        //Si es moneda base: convertir a MOAL
                        var pLength = prodActual.RANGOS_PRECIO.length;
                        for (var i = pLength - 1; i >= 0; i--) {

                            if (parseFloat($("#txt_cantidad").val()) >= parseFloat(prodActual.RANGOS_PRECIO[i].RANGO)) {

                                precio = parseFloat(prodActual.RANGOS_PRECIO[i].PRECIO) / valorCambio;
                                $("#txtPrecioUnitario").val(precio.toFixed(2));
                                break;
                            }
                        }

                        if ($("#txtPrecioUnitario").val() == "" || parseFloat($("#txt_cantidad").val()) < parseFloat(prodActual.RANGOS_PRECIO[0].RANGO)) {

                            precio = parseFloat(prodActual.RANGOS_PRECIO[0].PRECIO) / valorCambio;
                            $("#txtPrecioUnitario").val(precio.toFixed(2));

                        }
                    }
                    else {
                        //Si es moneda alterna: convertir a MOBA
                        var pLength = prodActual.RANGOS_PRECIO.length;
                        for (var i = pLength - 1; i >= 0; i--) {

                            if (parseFloat($("#txt_cantidad").val()) >= parseFloat(prodActual.RANGOS_PRECIO[i].RANGO)) {

                                precio = parseFloat(prodActual.RANGOS_PRECIO[i].PRECIO) * valorCambio;
                                $("#txtPrecioUnitario").val(precio.toFixed(2));
                                break;

                            }
                        }

                        if ($("#txtPrecioUnitario").val() == "" || parseFloat($("#txt_cantidad").val()) < parseFloat(prodActual.RANGOS_PRECIO[0].RANGO)) {

                            precio = parseFloat(prodActual.RANGOS_PRECIO[0].PRECIO) * valorCambio;
                            $("#txtPrecioUnitario").val(precio.toFixed(2));

                        }

                    }

                }


            } else {
                $("#txtPrecioUnitario").val("0.00")
            }
        }
    }
}

// MANTENIMIENTO DE DOCUMENTO VENTA

function CompletaryPagar() {
    $("#A4").attr("disabled", true);
    GrabarCompletarDctoVenta()
}

function GrabarCompletarDctoVenta() {
    /*
   - Esta función modifica y completa el documento no grabado previamente, o inserta un nuevo documento en caso
   el documento no aún no esté grabado   
   */
    var continuar = false;
    try {
        if (parseFloat($("#lblImporteCobrar").text()) > 0) {
            continuar = true;
        }
        else {
            infoCustom2("Monto de cobro inválido");
            return;
        }

    }
    catch (er) {
        infoCustom2("Monto de cobro inválido");
        return;
    }

    if ($("#txtNumDctoComp").val() == "") {//INSERTA
        CalcularDatosMonetarios();
        //Validaciones iniciales antes de guardado


        if (vErrors(['cbo_direccion', 'cboDocumentoVenta', 'cboVendedor', 'txtClientes', 'cboDocumentoVenta', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'cboSerieDocVenta', 'txtNroDocVenta', 'txt_valor_cambio_Oficial', 'txt_valor_cambio'])) {
            continuar = true;
        } else {
            continuar = false;
        }

        if ($("#chkResponsablePago").is(":checked")) {
            if ($("#hfResponsablePagoPIDM").val() == "") {
                $("#txtResponsablePago").val("");
            }
            if (!vErrorsNotMessage(['txtResponsablePago'])) {
                continuar = false;
                alertCustom("Debe indicar un responsable de pago válido!")
            }
        }

        if ($("#cboDocumentoVenta").val() == "0001") {
            if ($("#cboTipoDoc").val() != "6") {
                alertCustom("Documento RUC necesario para registrar una venta con " + $("#cboDocumentoVenta :selected").html())
                continuar = false;
            }
        }

        //Valida Linea de crédito de Cliente
        if ($("#cbo_modo_pago").val() == "0002") {
            var lineaCredito;

            if ($("#cbo_moneda :selected").attr("data-tipo") == "MOBA") {
                lineaCredito = parseFloat($("#hfCreditoDispMoba").val());

                if (lineaCredito < parseFloat($('#txt_monto_total').val())) {
                    infoCustom2("El importe total excede al monto disponible en la Linea de Crédito: " + $("#cbo_moneda :selected").attr("simbolo") + " " + lineaCredito.toFixed(2) + "<br/>La operación no se llevó a cabo.");
                    continuar = false;
                }
            }
            else {
                lineaCredito = parseFloat($("#hfCreditoDispMoal").val());
                if (lineaCredito < parseFloat($('#txt_monto_total').val())) {

                    infoCustom2("El importe total excede al monto disponible en la Linea de Crédito: " + $("#cbo_moneda :selected").attr("simbolo") + " " + lineaCredito.toFixed(2) + "<br/>La operación no se llevó a cabo.");
                    continuar = false;

                }
            }
        }

        //valida limite de muestras
        if (detallesMuestra.length > 0) {
            if (!fVerificarLimite()) {
                continuar = false;
                alertCustom("El monto supera el límite máximo para muestras!")
            }
        }

        //Fin validaciones iniciales
        var camposCompletos; // (N)inguno, (P)arcial, (T)odos
        if (continuar) {
            var nroCamposOblig = $(".obligatorio").length - $("#p_DatCobro div.obligatorio").length;
            vErrorBodyAnyElement(".obligatorio")
            var nroCamposCompl = nroCamposOblig - $("#p_DatCobro .error").length;
            $("#p_DatCobro input").parent().parent().removeClass("error");
            $("#p_DatCobro select").parent().parent().removeClass("error");
            $("#p_DatCobro .icon-ok").parent().remove();


            if ($("#chkDespachoVenta").is(":checked") && $("#cbo_modo_pago").val() == "0001") {
                pagarInd = true;//Es obligatorio pagar
                camposCompletos = "T";
            }
            else {
                pagarInd = false;
                if (nroCamposCompl == 0) {
                    camposCompletos = "N";

                } else if (nroCamposCompl == nroCamposOblig) {
                    camposCompletos = "T";

                } else {
                    vErrorBodyAnyElement(".obligatorio")
                    camposCompletos = "P";
                    continuar = false;
                    alertCustom("Complete o limpie los campos de Cobro de Venta");
                }

            }


            //Si es obligatorio pagar Validar que los datos de pago no esten vacios
            var detallesPago = "";
            if (pagarInd) {
                if (continuar) {
                    detallesPago = pagar();
                    if (detallesPago == "") {
                        continuar = false;
                    }
                }
            } else {
                if (camposCompletos == 'T') {
                    detallesPago = pagar();
                    if (detallesPago == "") {
                        continuar = false;
                    }
                }
            }
        }
        //Valida monto 
        if (camposCompletos == 'T') {
            if (pagarInd == true) {
                if (parseFloat($("#txtMonto").val()) != parseFloat($("#txt_monto_total").val())) {
                    alertCustom("Monto a cobrar debe coincidir con el monto total a cobrar")
                    continuar = false;
                }
            }
        }
        if (continuar) {

            var valorCambio = parseFloat($("#txt_valor_cambio").val());
            var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());
            if (detallesVenta.length != 0) {
                Bloquear("ventana");
                var detalles = "";
                var detalles_bon = "";
                var detalles_mue = "";
                if ($("#cbo_moneda :selected").attr("data-tipo") == "MOBA") {
                    for (var i = 0; i < detallesVenta.length; i++) {
                        detalles += ValidaCaracter(detallesVenta[i].ITEM) + ";" +
                            detallesVenta[i].CODIGO + ";" +
                            ValidaCaracter(detallesVenta[i].NOMBRE_IMPRESION) + ";" +
                            detallesVenta[i].CODE_UNIDAD + ";" +
                            detallesVenta[i].CANTIDAD + ";" +
                            detallesVenta[i].PRECIO_DETALLE + ";" +
                            detallesVenta[i].MONTO_DESCUENTO + ";" +
                            detallesVenta[i].TOTAL_NETO + ";" +
                            detallesVenta[i].MONTO_DETRAC + ";" +
                            detallesVenta[i].MONTO_ISC + ";" +
                            //10
                            ValidaCaracter(detallesVenta[i].GLOSA) + ";" +
                            detallesVenta[i].TIPO_BIEN + ";" +
                            detallesVenta[i].PRECIO_IND + ";" +
                            //Montos convertidos:
                            (parseFloat(detallesVenta[i].MONTO_ISC) / valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].MONTO_DETRAC) / valorCambioOfi).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].PRECIO_DETALLE) / valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].MONTO_DESCUENTO) / valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].TOTAL_NETO) / valorCambio).toFixed(2) + ";" +
                            detallesVenta[i].CTAS_CODE + ";" +
                            detallesVenta[i].CECO_CODE + ";" +
                            //20
                            detallesVenta[i].ALMACENABLE + ";" +
                            detallesVenta[i].TIPO_PROD + ";" +
                            detallesVenta[i].SERIADO + ";" +
                            detallesVenta[i].CODE_DCTO_ORIGEN + ";" + //DCTO_ORGN_CODE
                            'N' + ";" +
                            (detallesVenta[i].COSTO_PRODUCTO === undefined ? 0 : detallesVenta[i].COSTO_PRODUCTO) +  //COSTO EN MONEDA BASE
                            "|";
                    }
                } else {
                    //Si los valores estan en MonedaAlterna
                    for (var i = 0; i < detallesVenta.length; i++) {
                        detalles += detallesVenta[i].ITEM + ";" +
                            detallesVenta[i].CODIGO + ";" +
                            ValidaCaracter(detallesVenta[i].NOMBRE_IMPRESION) + ";" +
                            detallesVenta[i].CODE_UNIDAD + ";" +
                            detallesVenta[i].CANTIDAD + ";" +
                            (parseFloat(detallesVenta[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                            //10
                            ValidaCaracter(detallesVenta[i].GLOSA) + ";" +
                            detallesVenta[i].TIPO_BIEN + ";" +
                            detallesVenta[i].PRECIO_IND + ";" +
                            //Montos convertidos:
                            (parseFloat(detallesVenta[i].MONTO_ISC)).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].MONTO_DETRAC)).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].PRECIO_DETALLE)).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].MONTO_DESCUENTO)).toFixed(2) + ";" +
                            (parseFloat(detallesVenta[i].TOTAL_NETO)).toFixed(2) + ";" +
                            detallesVenta[i].CTAS_CODE + ";" +
                            detallesVenta[i].CECO_CODE + ";" +
                            //20
                            detallesVenta[i].ALMACENABLE + ";" +
                            detallesVenta[i].TIPO_PROD + ";" +
                            detallesVenta[i].SERIADO + ";" +
                            detallesVenta[i].CODE_DCTO_ORIGEN + ";" + //DCTO_ORGN_CODE
                            'N' + ";" +
                            detallesVenta[i].COSTO_PRODUCTO +  //COSTO EN MONEDA BASE
                            "|";
                    }
                }

                if (detallesBonificacion.length != 0) {
                    var total_boni = 0.0
                    for (var i = 0; i < detallesBonificacion.length; i++) {

                        total_boni = total_boni + (parseFloat(detallesBonificacion[i].CANTIDAD) * parseFloat(detallesBonificacion[i].PRECIO_DETALLE))

                        detalles_bon += ValidaCaracter(detallesBonificacion[i].ITEM) + ";" +
                            detallesBonificacion[i].CODIGO + ";" +
                            ValidaCaracter(detallesBonificacion[i].NOMBRE_IMPRESION) + ";" +
                            detallesBonificacion[i].CODE_UNIDAD + ";" +
                            detallesBonificacion[i].CANTIDAD + ";" +
                            detallesBonificacion[i].PRECIO_DETALLE + ";" +
                            detallesBonificacion[i].MONTO_DESCUENTO + ";" +
                            detallesBonificacion[i].TOTAL_NETO + ";" +
                            detallesBonificacion[i].MONTO_DETRAC + ";" +
                            detallesBonificacion[i].MONTO_ISC + ";" +
                            //10
                            ValidaCaracter(detallesBonificacion[i].GLOSA) + ";" +
                            detallesBonificacion[i].TIPO_BIEN + ";" +
                            detallesBonificacion[i].PRECIO_IND + ";" +
                            //Montos convertidos:
                            (parseFloat(detallesBonificacion[i].MONTO_ISC) / valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].MONTO_DETRAC) / valorCambioOfi).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].PRECIO_DETALLE) / valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].MONTO_DESCUENTO) / valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].TOTAL_NETO) / valorCambio).toFixed(2) + ";" +
                            detallesBonificacion[i].CTAS_CODE + ";" +
                            detallesBonificacion[i].CECO_CODE + ";" +
                            //20
                            detallesBonificacion[i].ALMACENABLE + ";" +
                            detallesBonificacion[i].TIPO_PROD + ";" +
                            detallesBonificacion[i].SERIADO + ";" +
                            detallesBonificacion[i].CODE_DCTO_ORIGEN + ";" + //DCTO_ORGN_CODE
                            detallesBonificacion[i].COSTO_PRODUCTO +  //COSTO EN MONEDA BASE
                            "|";
                    }

                }

                if (detallesMuestra.length != 0) {
                    var total_muestra = 0.0
                    for (var i = 0; i < detallesMuestra.length; i++) {

                        total_muestra = total_muestra + (parseFloat(detallesMuestra[i].CANTIDAD) * parseFloat(detallesMuestra[i].PRECIO_DETALLE))

                        detalles_mue += ValidaCaracter(detallesMuestra[i].ITEM) + ";" +
                            detallesMuestra[i].CODIGO + ";" +
                            ValidaCaracter(detallesMuestra[i].NOMBRE_IMPRESION) + ";" +
                            detallesMuestra[i].CODE_UNIDAD + ";" +
                            detallesMuestra[i].CANTIDAD + ";" +
                            detallesMuestra[i].PRECIO_DETALLE + ";" +
                            detallesMuestra[i].MONTO_DESCUENTO + ";" +
                            detallesMuestra[i].TOTAL_NETO + ";" +
                            detallesMuestra[i].MONTO_DETRAC + ";" +
                            detallesMuestra[i].MONTO_ISC + ";" +
                            //10
                            ValidaCaracter(detallesMuestra[i].GLOSA) + ";" +
                            detallesMuestra[i].TIPO_BIEN + ";" +
                            detallesMuestra[i].PRECIO_IND + ";" +
                            //Montos convertidos:
                            (parseFloat(detallesMuestra[i].MONTO_ISC) / valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesMuestra[i].MONTO_DETRAC) / valorCambioOfi).toFixed(2) + ";" +
                            (parseFloat(detallesMuestra[i].PRECIO_DETALLE) / valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesMuestra[i].MONTO_DESCUENTO) / valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesMuestra[i].TOTAL_NETO) / valorCambio).toFixed(2) + ";" +
                            detallesMuestra[i].CTAS_CODE + ";" +
                            detallesMuestra[i].CECO_CODE + ";" +
                            //20
                            detallesMuestra[i].ALMACENABLE + ";" +
                            detallesMuestra[i].TIPO_PROD + ";" +
                            detallesMuestra[i].SERIADO + ";" +
                            detallesMuestra[i].CODE_DCTO_ORIGEN + ";" + //DCTO_ORGN_CODE
                            detallesMuestra[i].COSTO_PRODUCTO +  //COSTO EN MONEDA BASE
                            "|";
                    }

                    total_muestra = total_muestra.toFixed(2)

                    GetValorMuestra($("#cbo_Empresa").val());

                    if (isNaN(valor_muestra)) {

                        infoCustom2("No se puede completar debido a que no se obtuvo correctamente el valor tope para las muestras !")
                        Desbloquear("ventana")
                        $("#A4").attr("disabled", false);
                        return;
                    }


                    //if (parseFloat(total_muestra) > parseFloat(valor_muestra)) {

                    //    infoCustom2("La muestra no puede ser mayor a la permitida por un valor de <" + 8955.25 + "> ,por favor modifica tu items de tu muestra para poder completar!")
                    //    Desbloquear("ventana")
                    //    $("#A4").attr("disabled", false);
                    //    return;
                    //}


                }

                var data = new FormData();
                data.append('p_NUM_SERIE', ($("#cboSerieDocVenta :selected").html() == undefined) ? "" : $("#cboSerieDocVenta :selected").html());
                data.append('p_NUM_DCTO', $("#txtNroDocVenta").val());
                data.append('p_DCTO_CODE', $("#cboDocumentoVenta").val());
                data.append('p_FECHA_EMISION', $("#txt_fec_emision").val());
                data.append('p_FECHA_TRANS', $("#txt_fec_transaccion").val());
                data.append('p_FECHA_VENCIMIENTO', $("#txt_fec_vencimiento").val());
                data.append('p_CMNT_DCTO', $("#txt_comentario").val());
                data.append('p_CTLG_CODE', $("#cbo_Empresa").val());
                data.append('p_SCSL_CODE', $("#cbo_Sucursal").val());
                // data.append('p_CAJA_CODE', '');
                data.append('p_MONE_CODE', $("#cbo_moneda").val());
                data.append('p_VALOR', $("#txt_subtotal").val());
                data.append('p_DESCUENTO', $("#txt_descuento").val());
                data.append('p_IGV', $("#txt_impuesto_calc").val());
                data.append('p_IMPORTE', $('#txt_monto_total').val());
                data.append('p_ISC', $("#txt_isc").val());
                data.append('p_IMPORTE_EXO', $("#txtOpExonerada").val());
                data.append('p_IMPORTE_INA', $("#txtOpInafecta").val());
                data.append('p_IMPORTE_GRA', $("#txtOpGravada").val());
                data.append('p_IMPORTE_REDONDEO', $("#rbRedondeo").is(":checked") ? $("#txtRedondeo").val() : "0");
                data.append('p_IMPORTE_DONACION', $("#rbDonacion").is(":checked") ? $("#txtDonacion").val() : "0");
                data.append('p_IMPORTE_DETRACCION', $("#txt_detraccion").val());
                data.append("p_IMPORTE_RETENCION", $("#txt_Retencion").val());
                data.append('p_IMPORTE_PERCEPCION', $("#txt_Percepcion").val());
                data.append('p_IMPORTE_OTROS', "0");
                data.append('p_MOPA_CODE', $("#cbo_modo_pago").val());
                // data.append('p_FOPA_CODE', '');
                data.append('p_CLIE_PIDM', $("#hfPIDM").val());
                data.append('p_CLIE_DOID', $("#cboTipoDoc").val());
                data.append('p_USVE_USUA_ID', $("#cboVendedor").val());

                data.append('p_COMPLETO_IND', "S");

                data.append('p_VALOR_CAMBIO', ($("#txt_valor_cambio").val() == "") ? "1" : $("#txt_valor_cambio").val());
                data.append('p_USUA_ID', $("#ctl00_txtus").val());
                //data.append('p_IMPR_CODE', '');
                data.append('p_DETRACCION_IND', $("#chk_detraccion").is(":checked") ? "S" : "N");
                data.append('p_PERCEPCION_IND', $("#chk_percepcion").is(":checked") ? "S" : "N");
                data.append('p_RETENCION_IND', $("#chk_retencion").is(":checked") ? "S" : "N");
                data.append('p_NUM_DCTO_PERCEP', $("#txt_num_comp_percep").val());
                data.append('p_NUM_DCTO_DETRAC', $("#txt_num_op_detrac").val());
                data.append('p_NUM_DCTO_RETEN', $('#txt_num_comp_reten').val());
                data.append('p_FECHA_EMISION_PERCEP', $('#txt_fec_comp_percep').val());
                data.append('p_FECHA_EMISION_DETRAC', $('#txt_fec_comp_detrac').val());
                data.append('p_FECHA_EMISION_RETEN', $('#txt_fec_comp_reten').val());
                data.append('p_IMPRFAC_PERCEP', $('#rbsinserie').is(":checked") ? "S" : "N");
                data.append('p_NRO_CUENTA_DETRAC', $('#txt_cta_detrac').val());

                data.append('p_SCSL_EXONERADA_IND', ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") ? "S" : "N");
                data.append('p_IGV_IMPR_IND', $('#chk_inc_igv').is(":checked") ? "S" : "N");

                data.append('p_VALOR_CAMBIO_OFI', ($("#txt_valor_cambio_Oficial").val() == "") ? "1" : $('#txt_valor_cambio_Oficial').val());
                data.append('p_COD_AUT', ($('#cboSerieDocVenta').val() == null) ? "0" : $('#cboSerieDocVenta').val());
                data.append('p_PCTJ_IGV', $("#hfIMPUESTO").val());
                var ir = ((parseFloat($("#hfFactorImpuestoRentaVenta").val()) / 100) * parseFloat($('#txt_monto_total').val())).toFixed(4);
                data.append('p_FACTOR_RENTA', $("#hfFactorImpuestoRentaVenta").val());
                data.append('p_IMPUESTO_RENTA', ir);
                data.append('p_RESP_PIDM', $("#hfResponsablePagoPIDM").val());
                data.append('p_DETALLES', detalles);

                data.append('p_DETALLES_PAGO', detallesPago);
                data.append('p_DESPACHO_VENTA_IND', ($("#chkDespachoVenta").is(":checked") ? "S" : "N"));
                data.append('p_COBRAR_IND', (camposCompletos == "T") ? "S" : "N");
                data.append('p_VALIDAR_STOCK_IND', validarStockInd);

                data.append('p_DETALLES_BONI', detalles_bon);
                data.append('p_DIRECCION', $("#cbo_direccion option:selected").text());
                data.append('p_LATITUD', $("#cbo_direccion option:selected").attr("latitud"));
                data.append('p_LONGITUD', $("#cbo_direccion option:selected").attr("longitud"));

                data.append('p_DETALLES_MUESTRA', detalles_mue);
                if (isNaN(total_boni)) { total_boni = "0" }
                data.append('p_TOTAL_GRATUITAS', total_boni);

                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=5",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                })
                    .success(function (datos) {
                        if (datos != null) {
                            if (typeof datos[0].CODIGO != "undefined" && datos[0].CODIGO != 'ERROR') {
                                if (datos[0].CODIGO == 'LIMITE') {
                                    alertCustom("Se ha excedido el límite de los documentos autorizados. Intente utilizar otra serie o refrescar la página");

                                } else if (datos[0].CODIGO == 'DEST') {
                                    alertCustom("Un documento de origen ya ha sido usado por otro!");

                                } else if (datos[0].CODIGO == 'NOSTOCK') {
                                    alertCustom("No hay stock para los siguientes Items: " + datos[0].SECUENCIA.split("|")[1] + "");

                                } else {
                                    exito();
                                    if (datos[0].MSGERROR.indexOf("ERROR") >= 0) {
                                        alertCustom(datos[0].MSGERROR);
                                    } else {
                                        //COMPLETAR
                                        $("#hfCompletoInd").val("S")
                                        $("#grabar").attr("href", "javascript:ActualizarDctoVenta();");
                                        $("#divBtnsMantenimiento").attr("style", "display:none");

                                        $(".btnEliminarDetalle").attr("style", "display:none");

                                        $("#btnImprimir").attr("style", "display:inline-block;margin-top:2px;");
                                        $(".btnImprimir").show();
                                        $('#btnMail').removeClass('hidden');
                                        //$('#btnEFac').removeClass('hidden');
                                        $("#lblCopia").css("display", "inline-block");
                                        $("#lblCopia").css("display", "inline-block");
                                        $("#txtNumDctoComp").val(datos[0].CODIGO);
                                        BloquearCampos();

                                        $('#btnGenerarAsiento').click();
                                    }
                                }
                            }
                            else {
                                noexito();
                            }
                        } else {
                            noexito();
                        }
                        Desbloquear("ventana");
                    })
                    .error(function () {
                        noexito();
                        Desbloquear("ventana");
                        $("#A4").attr("disabled", false);
                    })
                    .complete(function () {
                        $("#A4").attr("disabled", false);
                    })
                    ;

            } else {
                alertCustom("Ingrese al menos 1 detalle!");
            }
        }
    } else {//MODIFICA
        CompletarDctoVenta();
    }
}
function fVerificarLimite() {
    var result = false;
    var fTran = $("#txt_fec_transaccion").val();
    var iMes = fTran.substring(3, 5);
    var iAnio = fTran.substring(6, 10);
    var nMonto = 0;

    for (var i = 0; i < detallesMuestra.length; i++) {
        nMonto = nMonto + (detallesMuestra[i].CANTIDAD * detallesMuestra[i].PRECIO_DETALLE);
    }


    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=Limite&P_MES=" + iMes + "&P_ANIO=" + iAnio + "&P_MONTO=" + nMonto + "&CTLG_CODE=" + $("#cbo_Empresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {

            if (datos != null) {
                if (datos[0].P_RESULTADO == "1") {
                    result = true;
                }
            }
        },
        error: function (msg) {

            alertCustom("No se obtuvo correctamente descuento por Categoría de cliente.");
        }
    });
    return result;



}
//Imprimir dcto venta
function ImprimirDctoVenta() {
    Bloquear("ventana");
    if ($("#cboDocumentoVenta").val() == '0012' || $("#cboDocumentoVenta :selected").html().indexOf("TICKET") >= 0) {
        var data = new FormData();
        data.append('p_CODE', $("#txtNumDctoComp").val());
        data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
        data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "N")
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=IMPR",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            cache: false
        })
            .success(function (datos) {
                if (datos != null) {


                    $("#divDctoImprimir").html(datos);
                    setTimeout(function () {
                        window.print();
                    }, 200)

                } else {
                    noexito();
                }
                Desbloquear("ventana");
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
            });
    } else {
        crearImpresion($("#txtNumDctoComp").val());
        Desbloquear("ventana");

    }
}

//Devuelve vacio si el descuento es 0, sino devuelve su valor con el signo negativo
function vDesc(valor) {
    if (parseFloat(valor) == 0) {
        valor = "";
    }
    else {
        valor = valor + "-";
    }
    return valor;
}

var cargarCuentaDetraccion = function () {
    if (vErrors(['cbo_Empresa'])) {
        $.post('vistas/nv/ajax/nvmdocv.ashx?OPCION=DETRAC&PIDM=' + $("#cbo_Empresa :selected").attr("data-pidm") + "&MONEDA_CODE=" + $('#cbo_moneda').val(),
            function (data) {
                if (data != null) {
                    $('#txt_cta_detrac').val(data[0].NRO_CUENTA);
                } else {
                    $('#txt_cta_detrac').val('');
                    // infoCustom2("No se encontró Cuenta de Detracciones para la empresa seleccionada.")
                }
            });
    }
};

function CargarDatosLineaCredito() {
    //Cargar datos resumen linea crédito
    var pidm;
    if ($("#hfResponsablePagoPIDM").val() != "") {
        pidm = $("#hfResponsablePagoPIDM").val();
    } else {
        pidm = $("#hfPIDM").val();
    }
    $.ajax({
        type: "GET",
        url: "vistas/NC/estereotipos/ajax/Cliente.ASHX",
        data: {
            flag: 7,
            pidm: pidm,
            empr: $("#cbo_Empresa").val()
        },
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            if (datos != "" & datos != null) {
                $("#txt_plazo_pago").val(datos[0].PLAZO);
                $("#hfCreditoDispMoba").val(datos[0].ACTUAL)
                $("#hfCreditoDispMoal").val(datos[0].ACTUAL_MOAL)
                $("#linea").html('Linea: S/ ' + formatoMiles(datos[0].LINEA));
                $("#disponible").html('Disponible: S/ ' + formatoMiles(datos[0].ACTUAL));
                $("#vencido").html('Vencido: S/ ' + formatoMiles(datos[0].MONTO_VENCIDO));
            }
        },
        error: function () {
            alertCustom("Error al obtener datos de Linea de Credito de Cliente.");
        }
    });
}

function Cancelar() {
    window.location.href = '?f=NVMDOVR';
}

function BloquearCampos() {
    //Bloqueo campos Datos Generales
    $("#cbo_Empresa").attr("disabled", "disabled");
    $("#cbo_Sucursal").attr("disabled", "disabled");
    $("#cboSerieDocVenta").attr("disabled", "disabled");

    $("#cboDocumentoVenta").attr("disabled", "disabled");
    $("#txtClientes").attr("disabled", "disabled");
    $("#cboTipoDoc").attr("disabled", "disabled");

    $("#txtNroDctoCliente").attr("disabled", "disabled");
    $("#txt_fec_emision").attr("disabled", "disabled");
    $("#cboVendedor").attr("disabled", "disabled");

    $("#txt_comentario").attr("readonly", "true");
    //Bloqueo campos Detalles Venta
    $("#cbo_moneda").attr("disabled", "disabled");
    $("#A1").attr("style", "display:none");
    $("#A2").attr("style", "display:none");
    $("#A2").parent().attr("style", "display:none");
    $("#fila_5").attr("style", "display:none");
    $("#div_tabla_det").find(".input,textarea").attr("disabled", "disabled")

    $("#chkDespachoVenta").attr("disabled", "disabled");

    $("#divAgregarProducto").attr("style", "display:none");
    //Bloqueo campos Datos Credito
    $("#cbo_modo_pago").attr("disabled", "disabled");
    $("#txt_plazo_pago").attr("disabled", "disabled");
    $("#txt_fec_vencimiento").attr("disabled", "disabled");
    $("#txt_estado_credito").attr("disabled", "disabled"); //pendiente

    $("#txtResponsablePago").attr("disabled", "disabled");
    $("#chkResponsablePago").attr("disabled", "disabled");
    $("#rbRedondeo,#rbDonacion").attr("disabled", "disabled");

    //Bloqueo campos Tributaciones
    $("#txt_monto_detraccion").attr("disabled", "disabled");
    $("#txt_num_op_detrac").attr("disabled", "disabled");
    $("#txt_fec_comp_detrac").attr("disabled", "disabled");
    $("#txt_num_comp_percep").attr("disabled", "disabled");
    $("#txt_fec_comp_percep").attr("disabled", "disabled");
    $("#txt_num_comp_reten").attr("disabled", "disabled");
    $("#txt_fec_comp_reten").attr("disabled", "disabled");

    //Bloqueo de datos Cobro

    $("#chkDespachoVenta").attr("disabled", "disabled");
    $("#cbo_OrigenPago").attr("disabled", "disabled");
    $("#cbo_Det_Origen").attr("disabled", "disabled");
    $("#cboMedioPago").attr("disabled", "disabled");
    $("#txtMonto,#txtDestino,#txtNroOpe").attr("disabled", "disabled");

    $("#lbl_chk_boni").css("display", "none");
    $("#lbl_chk_muestra").css("display", "none");

    $("#cbo_direccion").attr("disabled", "disabled");
}

//Valida que el texto no contenga ";" o "|" en los detalles de venta
function ValidaCaracter(texto) {
    while (texto.toString().indexOf(";") != -1) {
        texto = texto.replace(";", ",");
    }
    while (texto.toString().indexOf("|") != -1) {
        texto = texto.replace("|", " ");
    }
    while (texto.toString().indexOf('"') != -1) {
        texto = texto.replace('"', " ");
    }
    return texto;
}

//tiene cambios de anticipo
var NuevaVenta = function () {
    Bloquear("ventana");
    seleccionados = new Array();
    window.history.pushState("Object", "DOCUMENTO VENTA RAPIDA", "/Default.aspx?f=nvmdovr");
    $("#hfResponsablePagoPIDM,#hfPIDM,#hfRUC,#hfCodigoTipoDocumento,#hfTipoDocumento,#hfNroDocumento,#hfTIPO_INSERT,#hfCOD_PROD,#hfProdSeriado,#hfCodigoCategoriaCliente,#hfAgenteRetencionCliente,#hfDIR,#hfDNI").val("");

    $("#hfIMPUESTO,#hfCreditoDispMoba,#hfCreditoDispMoal,#hfParamDetraccion,#hfParamRetencion,#hfporcentaje_detraccion").val("0.00");
    $("#hfImprimirPreciosIGV,#hfCompletoInd").val("N");
    $("#hfParamRedondeo").val("EST");
    $("#divDctoImprimir").html("");

    $('#txt_fec_emision, #txt_fec_transaccion,#txt_fec_vencimiento').datepicker("setDate", "now");
    CargarFactorImpuestoRentaVenta();

    $("#txtNumDctoComp,#txtClientes,#txtNroDctoCliente,#txt_estado_credito").val("")
    $("#txtNumSec").val("1")

    fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", true);


    fillcboMoneda();
    $('#cbo_moneda').attr("disabled", false);
    $("#cbo_Sucursal").change();

    LimpiarCamposDetalle();
    $("#div_vie_camp_seriados").slideUp();

    detallesVenta = [];
    ListarTablaDetalles(ObtenerTablaDetalles());
    detallesBonificacion = []
    ListarTablaDetallesBonificacion(ObtenerTablaDetallesBonificacion());
    detallesMuestra = []
    ListarTablaDetallesMuestra(ObtenerTablaDetallesMuestra());


    $('#cbo_modo_pago, #chk_retencion, #txt_Retencion, #txt_num_comp_reten,#txt_fec_comp_reten').prop('disabled', true);
    $('#chk_retencion').parent().removeClass('checked');

    $("#txt_comentario").removeAttr("readonly").val("");

    $("#rbDonacion,#rbRedondeo").prop("checked", false).parent().removeClass('checked');
    $("#chkResponsablePago").removeAttr("disabled");

    $('#cbo_modo_pago option:first-child').prop('selected', true);
    $('#cbo_modo_pago').change();
    $('#txt_plazo_pago').val('0');
    $('#cboTipoDoc').val('1').change();
    $("#cboTipoDoc,#txtNroDctoCliente,#txtClientes").removeAttr("disabled");
    $("#cboTipoDoc").removeAttr("disabled");
    //$('#cboTipoDoc').prop('disabled', true);
    $("#txtNroDctoCliente, #txt_id_proveedor, #txt_Retencion").val("");
    $("#txtResponsablePago").val("").attr("disabled", "disabled");
    $("#chkResponsablePago").prop("checked", false).parent().removeClass('checked');
    $('#cboDocumentoVenta').attr("disabled", "disabled");
    $('#cboDocumentoVenta').select2("val", "");
    $('#cboSerieDocVenta').attr("disabled", "disabled");
    $('#cboSerieDocVenta').empty().append('<option></option>').select2("val", "");
    $("#lblTipoCorrelativo").html("");
    $("#txtNroDocVenta").val("");
    $("#cbo_Empresa,#cbo_Sucursal,#cboVendedor,#txtNroDctoCliente").removeAttr("disabled");
    $("#txt_fec_emision,#txtClientes").removeAttr("disabled");
    $("#div_btn_completar,#btnImprimir").attr("style", "display:none;");
    $(".btnImprimir").hide();
    $('#btnMail').addClass('hidden');
    $("#lblCopia").css("display", "none");
    $("#divBtnsMantenimiento,#divAgregarProducto,#lbl_fec_vig,#txt_fec_vig,#lbl_fec_vig_Oficial,#txt_fec_vig_Oficial,#input_fec_vig_Oficial,#input_fec_vig,#div_btn_add_prods").attr("style", "display:block;");
    $("#A1").attr("style", "display:block;margin-right: 5px;");
    $("#A2").attr("style", "display:block;");
    $("#grabar").attr("href", "javascript:GrabarDctoVenta();");
    $("#grabar").html("<i class='icon-save'></i> Grabar");
    $("#div_tabla_det").html("");
    $("#lblImporteCobrar").html("0.00");


    $("#cbo_direccion").attr("disabled", false);
    $("#cbo_direccion").empty().html("<option></option>")
    $("#cbo_direccion").select2("val", "")
    carga_ini_ind = false;


    $("#tabDatosGenerales").click();
    $("#rbRedondeo,#rbDonacion").removeAttr("disabled");
    $('#txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten,#txt_cta_detrac').val("");

    $("#divIndicadores").attr("style", "display:none;");
    //Despacho y campos de pago
    if (!$("#chkDespachoVenta").is(":checked")) {
        $("#chkDespachoVenta").attr("checked", true).change().removeAttr("disabled").parent().addClass("checked");
    }
    $("#btnLimpiarCobro").click();

    $("#p_DatTributaciones .portlet-body").slideUp();
    $("#p_DatTributaciones .portlet-title i").removeClass("icon-chevron-down").addClass("icon-chevron-up");
    $("#p_DatCobro").fadeIn();

    $("input").parent().parent().removeClass("error");
    $("select").parent().parent().removeClass("error");
    $(".icon-ok").parent().remove();


    bDatosCobroIniciado = false;
    //Cargar Datos cobro
    $('#txtFechaPago').datepicker("setDate", "now");
    //CARGA POR DEFECTO
    CargarDatosCobroPorDefecto();

    $("#porlet_boni").css("display", "none")
    $("#lbl_chk_boni").css("display", "block");
    $("#chkBonificacion").prop('checked', false).parent().removeClass('checked');

    $("#porlet_muestra").css("display", "none")
    $("#lbl_chk_muestra").css("display", "block");
    $("#chkMuestra").prop('checked', false).parent().removeClass('checked');


    $("#chkMuestra").attr("disabled", false)
    $("#chkBonificacion").attr("disabled", false)

    cargarParametrosSistema();
    CalcularDetraccion();
    CalcularDatosMonetarios();
    setTimeout(function () {
        Desbloquear("ventana");
    }, 200);


}


function ActualizaPrecioEstandarDetalle(campo, valor, indice) {
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede modificar un detalle de un documento ya 'Completado'")
    } else {

        var precioVenta, precioMinimo;
        //La moneda de venta coincide con la moneda del producto
        if (detallesVenta[indice].MONEDA == $("#cbo_moneda").val()) {
            precioVenta = detallesVenta[indice].PRECIO_VENTA;
            precioMinimo = detallesVenta[indice].PRECIO_MINIMO;
        } else {
            var valorCambio = parseFloat($("#txt_valor_cambio").val());
            //La moneda de venta no coincide con la moneda del producto                                          
            if (detallesVenta[indice].MONEDA == $("#cbo_moneda [data-tipo='MOBA']").val()) {
                precioVenta = parseFloat(detallesVenta[indice].PRECIO_VENTA) / valorCambio;
                precioMinimo = parseFloat(detallesVenta[indice].PRECIO_MINIMO) / valorCambio;
            } else {
                //Si es igual a la moneda alterna: Convierte a MOBA
                precioVenta = parseFloat(detallesVenta[indice].PRECIO_VENTA) * valorCambio;
                precioMinimo = parseFloat(detallesVenta[indice].PRECIO_MINIMO) * valorCambio;
            }
        }

        if (precioMinimo == "") {
            precioMinimo = "0";
        }

        if (parseFloat($(campo).val()) < parseFloat(precioMinimo) || $(campo).val().trim() == "") {
            infoCustom2("El valor ingresado no puede ser menor al precio mínimo: " + parseFloat(precioMinimo).toFixed(2))
            $(campo).val(parseFloat(precioMinimo).toFixed(2));
            $(campo).focus();
        } else {
            //var factor = calcula_factor_conversion(detallesVenta[indice].CODE_UNIDAD_PROD_BASE, detallesVenta[indice].CODE_UNIDAD) // factor conversion unidades
            //Calcular 01-TOTAL BRUTO, 02-DESCUENTO, 03-TOTAL NETO, 04-DETRACCION,05-ISC
            //var totalBruto = (parseFloat(detallesVenta[indice].CANTIDAD) / parseFloat(factor)) * parseFloat(valor);
            var totalBruto = (parseFloat(detallesVenta[indice].CANTIDAD)) * parseFloat(valor);
            var montoDescuento = 0;

            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                //Si la sucursal es Exonerada los precios de los productos ya no contienen IGV                       
                montoDescuento = totalBruto * (parseFloat(detallesVenta[indice].DESCUENTO) / 100);
            } else {

                if (detallesVenta[indice].TIPO_BIEN == "EXO" || detallesVenta[indice].TIPO_BIEN == "INA") {
                    montoDescuento = totalBruto * (parseFloat(detallesVenta[indice].DESCUENTO) / 100);
                } else {
                    //El total bruto contiene IGV pues el producto está GRAVADO
                    var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                    montoDescuento = (totalBruto / (decimalIGV + 1)) * (parseFloat(detallesVenta[indice].DESCUENTO) / 100);
                }
            }
            /*00*/detallesVenta[indice].PRECIO_DETALLE = parseFloat(valor).toFixed(2);
            /*01*/detallesVenta[indice].TOTAL_BRUTO = totalBruto.toFixed(2);
            /*02*/detallesVenta[indice].MONTO_DESCUENTO = montoDescuento.toFixed(2);
            /*03*/detallesVenta[indice].TOTAL_NETO = (totalBruto - montoDescuento).toFixed(2);
            var totalNeto = totalBruto - montoDescuento;

            var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
            var detraccion, isc;

            detraccion = parseFloat(detallesVenta[indice].DETRACCION) * (totalNeto);
            /*04*/detallesVenta[indice].MONTO_DETRAC = detraccion.toFixed(2);

            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                isc = parseFloat(detallesVenta[indice].ISC / 100) * (totalNeto); //Total neto Sin IGV
                /*05*/ detallesVenta[indice].MONTO_ISC = isc.toFixed(2);

            } else {
                isc = parseFloat(detallesVenta[indice].ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                /*05*/detallesVenta[indice].MONTO_ISC = isc.toFixed(2);
            }

            ListarTablaDetalles(ObtenerTablaDetalles());
            CalcularDetraccion();
            CalcularDatosMonetarios();

            $("#lblImporteCobrar").html($("#txt_monto_total").val());
            //console.log($("#lblImporteCobrar").html());
            if ($('#cbo_modo_pago').val() == '0002') {
                $("#txtMonto").val('');
            } else {
                $("#txtMonto").val($("#lblImporteCobrar").html());
            }

        }
    }
}

function CalcularDonacionRedondeo(importeCobrar) {//Param en string

    var parametroRedondeo = $("#hfParamRedondeo").val();
    importeAux = parseFloat(importeCobrar).toFixed(2).toLocaleString();
    var strRedondeo;
    var centecima = importeAux.substring(importeAux.length - 1, importeAux.length)
    if (parametroRedondeo == "ARR") {
        var diferencia = 10 - parseFloat(centecima);
        strRedondeo = "+0.0" + ((diferencia == 10) ? "0" : diferencia.toString());
    } else if (parametroRedondeo == "ABA") {
        strRedondeo = "-0.0" + centecima;
    } else {
        if (parseFloat(centecima) >= 5) {
            var diferencia = 10 - parseFloat(centecima);
            strRedondeo = "+0.0" + diferencia;
        } else {
            strRedondeo = "-0.0" + centecima;
        }
    }
    redondeo = strRedondeo;
    var strDonacion;
    var centecima = importeAux.substring(importeAux.length - 1, importeAux.length)
    var diferencia = 10 - parseFloat(centecima);
    strDonacion = "+0.0" + ((diferencia == 10) ? "0" : diferencia.toString());
    donacion = strDonacion;

    if ($("#rbDonacion").is(":checked")) {
        importeCobrar += parseFloat(donacion);
    }
    if ($("#rbRedondeo").is(":checked")) {
        importeCobrar += parseFloat(redondeo);
    }

    $("#txtRedondeo").val(redondeo);
    $("#rbRedondeo").is(":checked") ? $("#txtRedondeo2").val(redondeo) : $("#txtRedondeo2").val("0.00");
    $("#txtDonacion").val(donacion);
    $("#rbDonacion").is(":checked") ? $("#txtDonacion2").val(donacion) : $("#txtDonacion2").val("0.00");
}

//--------------------------------------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------
//--------------------------------------------------------------------

jsonPersonas = null;
var pagarInd = true; //Pago Obligatorio
function cargarJsonEmpleado(empresa) {
    $.ajax({
        type: "post",
        async: false,
        url: "vistas/GL/ajax/GLMLETR.ashx?flag=LE&empresa=" + empresa,
        contenttype: "application/json;",
        datatype: "json",
        success: function (datos) {
            if (datos != null && datos != "") {
                jsonPersonas = $.parseJSON(datos);
            } else {
                jsonPersonas = "";
            }
        }
    });
}

StringMediosPago = "";
bDatosCobroIniciado = false;
var html_txtDestino = $("#txtDestino").parent().html();

function CargarDatosCobro() {
    if (bDatosCobroIniciado == false) {
        bDatosCobroIniciado = true;
        //       
        $("#cbo_OrigenPago").removeAttr("disabled");
        $("#txtNroOpe").removeAttr("disabled");
        $("#txtMonto").removeAttr("disabled");

        //eventoControles
        $('#cbo_OrigenPago').change(function () {
            var OrigenActual = $(this).val();
            $("#lbl_detalle3").html("-");
            $("#lbl_detalle4").html("-");
            $("#cboMedioPago").val("").change();

            switch (OrigenActual) {

                case "Caja":

                    $("#lbl_detalle1").html("Caja");
                    $("#cbo_Det_Origen").off("change");
                    $("#cbo_Det_Origen").attr("data-placeholder", "CAJA").select2("val", "").change();

                    $("#txtDestino").val("");

                    //LISTAR CAJAS APERTURADAS
                    $.ajaxSetup({ async: false });
                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 7, empresa: $("#cbo_Empresa").val(), scsl: $("#cbo_Sucursal").val(), usua_id: $("#ctl00_lblusuario").html() },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {

                                $("#cbo_Det_Origen").html(res).attr("disabled", false);

                            } else {
                                $("#cbo_Det_Origen").html("").attr("disabled", true);

                            }
                        });
                    $.ajaxSetup({ async: true });

                    $("#cboMedioPago").html(StringMediosPago);

                    $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0008" && valorO != "0006" && valorO != "0005" && valorO != "") $(j).remove(); });

                    $("#cboMedioPago").attr("disabled", false);
                    break;

                case "Banco":

                    $(".mPersona").css("display", "none");
                    $("#txtDestino").off("change");
                    $("#pos,#tarjeta,#bco").remove();
                    $("#lbl_detalle1").html("Cuenta Destino");
                    $("#cbo_moneda").attr("disabled", true);

                    //CargarCuentas Origen
                    $("#cbo_Det_Origen").val("").change().attr("data-placeholder", "CUENTA BANCARIA").select2();

                    $.ajaxSetup({ async: false });
                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 6, empresapidm: $("#cbo_Empresa :selected").attr("data-pidm"), banco: "", moneda: $("#cbo_moneda").val() },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbo_Det_Origen").html(res).attr("disabled", false).change(function () {
                                    $("#cboMedioPago").change();
                                    var mone_code = $("#cbo_Det_Origen :selected").attr("moneda");

                                    $("#cbo_moneda").select2("val", mone_code).change();
                                }
                                );
                            } else {
                                $("#cbo_Det_Origen").html("<option></option>").change();
                            }

                        });
                    $.ajaxSetup({ async: true });

                    $("#cboMedioPago").html(StringMediosPago);
                    $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "0001" && valorO != "") $(j).remove(); });
                    //$("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "") $(j).remove(); });
                    $("#cboMedioPago").attr("disabled", false);
                    break;

            }
        });

        $('#cboMedioPago').change(function () {
            html_monedas = $("#cbo_moneda").html();

            var MedioActual = $(this).val();

            $(".cbocta").parent().html(html_txtDestino);
            $("#txtNroOpe").removeClass("personas").attr("disabled", false);
            $("#txtDestino").val("");
            $("#txtDestino").attr("disabled", false).off("change").attr("placeholder", "");
            $("#txtNroOpe").val("");

            $(".pos,#tarjeta,#bco").remove();
            $(".mPersona").css("display", "none");
            offObjectEvents("txtNroOpe");

            $("#txtNroOpe").removeClass("personas").attr("disabled", false);
            switch (MedioActual) {
                case "0001"://DEPOSITO BANCARIO

                    $("#lbl_detalle3").html("Origen de Pago");
                    $("#lbl_detalle4").html("Nro. Op.");
                    $("#txtDestino").parent().html("<select id='cbDestino' class='obligatorio span12 cbocta' data-placeholder='CUENTA DE CLIENTE'></select>");
                    $("#cbDestino").html("<option>DEPOSITO DIRECTO VENTANILLA</option>").attr("disabled", true).select2();

                    $(".mPersona").css("display", "none");
                    offObjectEvents("txtNroOpe");
                    $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                    $("#txtMonto").attr("disabled", false);
                    $("#cbo_moneda").val($("#cbo_Det_Origen :selected").attr("moneda")).change().attr("disabled", true);

                    break;

                case "0008": //EFECTIVO

                    $("#lbl_detalle3").html("Destino");
                    $("#lbl_detalle4").html("Persona Recibe");

                    $("#txtDestino").val("ENTREGA DIRECTA").attr("disabled", true);
                    $(".mPersona").css("display", "block");

                    $("#txtNroOpe").addClass("personas").attr("disabled", false);
                    cargarInputsPersona();

                    $("#cbo_moneda").attr("disabled", false);
                    $("#txtMonto").attr("disabled", false);

                    break;

                case "0003": //transferencia

                    $("#lbl_detalle3").html("Origen");
                    $("#lbl_detalle4").html("Nro. Op.");

                    $("#txtDestino").parent().html("<select id='cbDestino' class='obligatorio span12 cbocta' data-placeholder='CUENTA DE CLIENTE'></select>");
                    $("#cbDestino").select2();
                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 6.5, moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: $("#hfPIDM").val() },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbDestino").html(res).select2();
                            } else {
                                $("#cbDestino").html("<option></option>").select2();
                            }

                        });
                    $.ajaxSetup({ async: true });
                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 6, banco: $("#cbo_Det_Origen :selected").attr("banco"), moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: $("#hfPIDM").val() },
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
                    $("#txtNroOpe").attr("disabled", false);

                    break;

                case "0013": //cheques bancarios

                    $("#lbl_detalle3").html("N° Cheque");
                    $("#lbl_detalle4").html("Girado a");

                    $("#txtDestino").attr("disabled", false);
                    $("#txtNroOpe").attr("disabled", false);


                    $("#txtMonto").attr("disabled", false);
                    break;

                case "0006": //tarjeta de credito

                    $("#cbo_moneda").attr("disabled", false);
                    $("#lbl_detalle3").html("N° Tarjeta");
                    $("#lbl_detalle4").html("Cod. Aut.");

                    $("#txtNroOpe").attr("disabled", false);
                    $("#txtMonto").attr("disabled", false);

                    $("#txtDestino").attr("disabled", false).attr("placeholder", "ult. 4 digitos");
                    mascespecial("txtDestino", "************", 16);

                    $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="pos"><div class="span4">POS</div><div class="span8"><select data-placeholder="POS" id="slcPos" class="span12"><option></option></select></div></div>');
                    $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="tarjeta"><div class="span4">MARCA</div><div class="span8"><select data-placeholder="MARCA TARJETA" id="slcTarjeta" class="span12"><option></option></select></div></div>')
                    $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="bco"><div class="span4">BANCO</div><div class="span8"><select data-placeholder="BANCO" id="slcBco" class="span12"><option></option></select></div></div>')

                    $("#slcPos, #slcTarjeta, #slcBco").select2();
                    $("#slcPos, #slcBco,#slcTarjeta").attr("disabled", true);

                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "BCO" },
                        function (res) {
                            Bloquear($($("#slcBco").siblings("div")).attr("id"));
                            $("#slcBco").attr("disabled", false);
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#slcBco").addClass("obligatorio").html(res);

                            } else {
                                $("#slcBco").html("").attr("disabled", true);
                            }

                        }).done(function () { Desbloquear($($("#slcBco").siblings("div")).attr("id")); });

                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "MTAR" },
                        function (res) {
                            Bloquear($($("#slcTarjeta").siblings("div")).attr("id"));
                            $("#slcTarjeta").attr("disabled", false);
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                listaTarjetas = res;
                                $("#slcTarjeta").addClass("obligatorio").html(res);

                            } else {
                                $("#slcTarjeta").html("").attr("disabled", true);
                            }

                        }).done(function () { Desbloquear($($("#slcTarjeta").siblings("div")).attr("id")); });;

                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "POS", caja: $("#cbo_Det_Origen").val(), empresa: $("#cbo_Empresa").val(), estable: $("#cbo_Det_Origen :selected").attr("stbl") },
                        function (res) {
                            Bloquear($($("#slcPos").siblings("div")).attr("id"));
                            $("#slcPos").attr("disabled", false);
                            if (res != null && res != "" && res.indexOf("error") < 0) {

                                $("#slcPos").addClass("obligatorio").html(res).change(function () {

                                    var mone_pos = $("#slcPos :selected").attr("moneda");

                                    if (mone_pos.indexOf($("#cbo_moneda").val()) < 0) {
                                        $("#slcPos").select2("val", "");
                                        infoCustom2("Moneda de POS no coincide con moneda del Documento de Venta")
                                    }

                                    //$("#cbo_moneda").select2("val", "");
                                    //$("#cbo_moneda option").filter(function (e, d) {
                                    //    var val0r = $(d).val();
                                    //    if (mone_pos.indexOf(val0r) < 0)
                                    //    { $("#cbo_moneda option[value=" + val0r + "]").remove(); }

                                    //});

                                    var tarj_pos = $("#slcPos :selected").attr("tarjetas");
                                    $("#slcTarjeta").html(listaTarjetas).select2("val", "");
                                    $("#slcTarjeta option").filter(function (e, d) {
                                        var val0r = $(d).val();
                                        if (tarj_pos.indexOf(val0r) < 0)
                                        { $("#slcTarjeta option[value=" + val0r + "]").remove(); }

                                    });

                                });

                            } else {
                                $("#slcPos").html("").attr("disabled", true);
                            }

                        }).done(function () { Desbloquear($($("#slcPos").siblings("div")).attr("id")); });

                    break;
                case "0005": // tarjeta de debito

                    $("#lbl_detalle3").html("N° Tarjeta");
                    $("#lbl_detalle4").html("Cod. Aut.");

                    $("#txtNroOpe").attr("disabled", false);
                    $("#txtMonto").attr("disabled", false);

                    $("#txtDestino").attr("disabled", false).attr("placeholder", "ult. 4 digitos");
                    mascespecial("txtDestino", "************", 16);

                    $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="pos"><div class="span4">POS</div><div class="span8"><select data-placeholder="POS" id="slcPos" class="span12"><option></option></select></div></div>');
                    $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="tarjeta"><div class="span4">MARCA</div><div class="span8"><select data-placeholder="MARCA TARJETA" id="slcTarjeta" class="span12"><option></option></select></div></div>')
                    $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="bco"><div class="span4">BANCO</div><div class="span8"><select data-placeholder="BANCO" id="slcBco" class="span12"><option></option></select></div></div>')

                    $("#slcPos, #slcTarjeta, #slcBco").select2();
                    $("#slcPos, #slcBco,#slcTarjeta").attr("disabled", true);

                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "BCO" },
                        function (res) {
                            Bloquear($($("#slcBco").siblings("div")).attr("id"));
                            $("#slcBco").attr("disabled", false);
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#slcBco").addClass("obligatorio").html(res);

                            } else {
                                $("#slcBco").html("").attr("disabled", true);
                            }

                        }).done(function () { Desbloquear($($("#slcBco").siblings("div")).attr("id")); });

                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "MTAR" },
                        function (res) {
                            Bloquear($($("#slcTarjeta").siblings("div")).attr("id"));
                            $("#slcTarjeta").attr("disabled", false);
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#slcTarjeta").addClass("obligatorio").html(res);

                            } else {
                                $("#slcTarjeta").html("").attr("disabled", true);
                            }

                        }).done(function () { Desbloquear($($("#slcTarjeta").siblings("div")).attr("id")); });;

                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "POS", caja: $("#cbo_Det_Origen").val(), empresa: $("#cbo_Empresa").val(), estable: $("#cbo_Det_Origen :selected").attr("stbl") },
                        function (res) {
                            Bloquear($($("#slcPos").siblings("div")).attr("id"));
                            $("#slcPos").attr("disabled", false);
                            if (res != null && res != "" && res.indexOf("error") < 0) {

                                $("#slcPos").addClass("obligatorio").html(res).change(function () {

                                    var mone_pos = $("#slcPos :selected").attr("moneda");

                                    if (mone_pos.indexOf($("#cbo_moneda").val()) < 0) {
                                        $("#slcPos").select2("val", "");
                                        infoCustom2("Moneda de POS no coincide con moneda del Documento de Venta")
                                    }

                                    //$("#cbo_moneda").select2("val", "");
                                    //$("#cbo_moneda option").filter(function (e, d) {
                                    //    var val0r = $(d).val();
                                    //    if (mone_pos.indexOf(val0r) < 0)
                                    //    { $("#cbo_moneda option[value=" + val0r + "]").remove(); }

                                    //});
                                    var tarj_pos = $("#slcPos :selected").attr("tarjetas");
                                    $("#slcTarjeta").html(listaTarjetas).select2("val", "");
                                    $("#slcTarjeta option").filter(function (e, d) {
                                        var val0r = $(d).val();
                                        if (tarj_pos.indexOf(val0r) < 0)
                                        { $("#slcTarjeta option[value=" + val0r + "]").remove(); }
                                    });
                                });

                            } else {
                                $("#slcPos").html("").attr("disabled", true);
                            }

                        }).done(function () { Desbloquear($($("#slcPos").siblings("div")).attr("id")); });

                    break;
            }

        });

        $("#txtMonto").on("keyup", function () {
            var montoCobrar = $("#txt_monto_total").val();
            if (montoCobrar == "") {
                montoCobrar = 0;
            }
            else {
                montoCobrar = parseFloat($("#txt_monto_total").val());
            }
            if (parseFloat($("#txtMonto").val()) > montoCobrar) {
                $("#txtMonto").val(montoCobrar.toFixed(2));
            }
        })

        // Carga de combos
        function cargaMediosDePago() {
            $.ajaxSetup({ async: false });
            $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 2 },
                function (res) {
                    if (res != null && res != "" && res.indexOf("error") < 0) {
                        StringMediosPago = res;
                    }
                });
            $.ajaxSetup({ async: true });
        }

        cargaMediosDePago();

        function cargarInputsPersona() {
            var arrayPersonas = new Array();
            function cargaAutoCompleteInputs() {

                var json = jsonPersonas;
                if (jsonPersonas == null) {
                    cargarJsonEmpleado($("#cbo_Empresa").val());
                    json = jsonPersonas;
                }
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

    }
    //CARGA POR DEFECTO
    CargarDatosCobroPorDefecto();

}

function pagar() {
    var datosPago = "";
    cade_pagar = "";

    if (!vErrorBodyAnyElement(".obligatorio")) {

        if ($("#txtMonto").val() == "") {
            alertCustom("Indique un monto a cobrar");
        } else if (parseFloat($("#txtMonto").val()) == 0) {
            alertCustom("Monto a cobrar no puede ser 0");
        } else {

            var monto = parseFloat($("#txtMonto").val().split(",").join(""));
            var origenCobroInd = $("#cbo_OrigenPago").val().substring(0, 1); //Antes ind_tipo

            var monto_pb = ""; //Por pagar base
            var monto_pa = ""; //Por pagar alter
            var monto_pp = ""; //Por pagar segun venta

            if ($("#cbo_moneda :selected").attr("data-tipo") == "MOBA") {
                monto_pb = parseFloat($("#txtMonto").val().split(",").join("")).toFixed(2);
                monto_pp = parseFloat(monto_pb);
            } else {
                monto_pa = parseFloat($("#txtMonto").val().split(",").join("")).toFixed(2);
                monto_pp = parseFloat(monto_pa);
            }

            var codigoVenta = ""; //EN BD
            var documento = ""; //EN BD

            cade_pagar += (codigoVenta + "," + documento + "," + (monto_pb == "" ? 0 : monto_pb) + "," + (monto_pa == "" ? 0 : monto_pa) + "," + (parseFloat($("#txt_monto_total").val()) === parseFloat($("#txtMonto").val()) ? "S" : "N"));


            var p_empresa = $("#cbo_Empresa").val();
            var p_user = $("#ctl00_txtus").val();
            var p_destino = $("#cbo_Det_Origen").val(); // origen
            var p_moneda = $("#cbo_moneda").val();

            var p_fecha_pago = ConvertirDate($("#txtFechaPago").val());

            var p_origen = $("#txtDestino").val();
            var p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
            var medio_pa = $("#cboMedioPago").val();
            var adicional = "";
            var cod_ape = "";
            var det_desc = "", pidm_cta = "", cta = "", compl = "";
            var p_flag = 1;

            if (origenCobroInd == "B") {
                pidm_cta = $("#cbo_Det_Origen :selected").attr("pidm"); //Pidm Cuenta bancaria
                cta = $("#cbo_Det_Origen").val();//Cuenta bancaria
                compl = "S";
                p_flag = 1.5;

                switch ($("#cboMedioPago").val()) {
                    case "0003": //transferencia
                        det_desc = "*" + $("#txtClientes").val();
                        var p_origen = $("#cbDestino").val();
                        break;

                    case "0013": //cheques bancarios
                        det_desc = "CHEQ.PAGADOR N°:" + $("#txtDestino").val();
                        adicional = $("#txtDestino").val();
                        compl = "N";
                        p_documento = "";
                        break;
                }
            } else if (origenCobroInd == "C") {

                switch ($("#cboMedioPago").val()) {
                    case "0006": //tarjeta de credito
                        p_documento = p_documento.replace("OP", "COD.AUT.");
                        p_origen = p_origen.substring(12);
                        det_desc = $("#txtClientes").val() + "/" + $("#txtDestino").val();
                        adicional = $("#slcPos").val() + "|" + $("#slcTarjeta").val() + "|" + $("#slcBco").val() + "|W"; //pos|marca|banco|tipoind
                        break;

                    case "0005": // tarjeta de debito
                        p_documento = p_documento.replace("OP", "COD.AUT.");
                        p_origen = p_origen.substring(12);
                        det_desc = $("#txtClientes").val() + "/" + $("#txtDestino").val();
                        adicional = $("#slcPos").val() + "|" + $("#slcTarjeta").val() + "|" + $("#slcBco").val() + "|W";
                        break;

                    case "0008":

                        break;
                }
                cod_ape = $("#cbo_Det_Origen :selected").attr("codigo");
            }

            var descripcion = origenCobroInd == "C" ? "COBRO A CLIENTE" : det_desc;


            v_CTLG_CODE = p_empresa;
            v_MONE_CODE = p_moneda;
            v_USUA_ID = p_user;
            v_DETALLE = cade_pagar;
            v_fecha_pago = p_fecha_pago;
            v_medio_pago = medio_pa;
            v_descripcion = descripcion;
            v_destino = p_destino;
            v_documento = p_documento;
            v_ORIGEN = p_origen;
            v_adicional = adicional;

            if (p_flag == "1") {
                v_codigo_apertura = cod_ape;
                v_ind = "CAJ";
                v_pidm = "";
                v_cta_code = "";
                v_oficina = "";
                v_canal = "";
                v_ind_completo = "";
                v_MONTO_TOTAL = "0";

            } else if (p_flag == "1.5") {
                v_pidm = pidm_cta;
                v_cta_code = cta;
                v_ind_completo = compl;
                v_MONTO_TOTAL = $("#txtMonto").val().split(",").join("") + ";";
                v_ind = "BAN";
                v_codigo_apertura = "";
                v_oficina = "";
                v_canal = "";
            }

            datosPago += v_DETALLE + ";";
            datosPago += v_ORIGEN + ";";
            datosPago += v_USUA_ID + ";";
            datosPago += v_codigo_apertura + ";";
            datosPago += v_CTLG_CODE + ";";
            datosPago += v_MONE_CODE + ";";
            datosPago += v_medio_pago + ";";
            datosPago += v_descripcion + ";";
            datosPago += v_fecha_pago + ";";
            datosPago += v_destino + ";";
            datosPago += v_documento + ";";
            datosPago += v_ind + ";";
            datosPago += v_pidm + ";";
            datosPago += v_cta_code + ";";
            datosPago += v_oficina + ";";
            datosPago += v_canal + ";";
            datosPago += v_ind_completo + ";";
            datosPago += v_adicional + ";";
            datosPago += v_MONTO_TOTAL + ";";
            return datosPago;
        }
    } else {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
        return datosPago;
    }
}

function CargarDatosCobroPorDefecto() {
    //CARGA POR DEFECTO
    $("#txtMonto,#txtNroOpe").val("");
    $('#cbo_OrigenPago').select2("val", "Caja").change();
    if ($("#cbo_Det_Origen option").length > 0) {
        var cbo = $("#cbo_Det_Origen option");
        $("#cbo_Det_Origen").select2("val", $($("#cbo_Det_Origen option")[1]).val()).change();
    }

    if ($("#cboMedioPago option").length > 0) {
        $("#cboMedioPago").select2("val", "0008"); //EFECTIVO DIRECTO           
        $("#cboMedioPago").change(); //EFECTIVO DIRECTO    
        var jsonUsuario = devuelveDatosUsuario($("#ctl00_lblusuario").html());
        if (jsonUsuario != null) {
            $("#txtNroOpe").val(jsonUsuario[0].NOMBRE).keyup().siblings("ul").children("li").click();
            $("#txtClientes").focus();
        }
    }

};

function BuscarClientexDocumento() {
    if (vErrors(['cboTipoDoc'])) {
        Bloquear("divFilaCliente");

        //$.ajax({
        //    type: "post",
        //    async: true,
        //    url: "vistas/NV/ajax/NVMDOCV.ashx?OPCION=BCLI" +
        //    "&p_CLIE_DOID=" + $("#cboTipoDoc").val() +
        //    "&p_CLIE_DOID_NRO=" + $("#txtNroDctoCliente").val(),
        //    contenttype: "application/json;",
        //    datatype: "json",
        //    success: function (datos) {
        //        var doid = $("#cboTipoDoc").val();
        //        var nro = $("#txtNroDctoCliente").val();
        //        if (datos != null && datos != "") {
        //            var esCliente = false;
        //            $("#txtClientes").val(" ").keyup();
        //            $("#txtClientes").val("").keyup();
        //            for (var i = 0; i < jsonClientes.length; i++) {
        //                if ($.trim(jsonClientes[i].RAZON_SOCIAL) == $.trim(datos[0].RAZON_SOCIAL)) {
        //                    esCliente = true;
        //                    $("#txtClientes").val(datos[0].RAZON_SOCIAL);
        //                    $("#txtClientes").keyup().siblings("ul").children("li").click();
        //                    break;
        //                }
        //            }
        //            if (!esCliente) {
        //                infoCustom2("La Persona no está registrada como Cliente");
        //                NuevoClienteRapido(doid, nro);
        //                //Datos buscados permanecen
        //                $("#cboTipoDoc").val(doid).change();
        //                $("#txtNroDctoCliente").val(nro);
        //            }
        //        } else {
        //            infoCustom2("No se encontró Cliente");
        //            NuevoClienteRapido(doid, nro);
        //            $("#txtClientes").val("").keyup();
        //            //Datos buscados permanecen
        //            $("#cboTipoDoc").val(doid).change();
        //            $("#txtNroDctoCliente").val(nro);
        //        }
        //        Desbloquear("divFilaCliente");
        //    },
        //    error: function (msg) {
        //        Desbloquear("divFilaCliente");
        //        alertCustom("No se pudo verificar Identidad de Cliente correctamente");
        //    }
        //});

        var doid = $("#cboTipoDoc").val();
        var nro = $("#txtNroDctoCliente").val();

        var esCliente = false;
        $("#txtClientes").val(" ").keyup();
        $("#txtClientes").val("").keyup();

        if (jsonClientes != null && jsonClientes.length > 0) {

            for (var i = 0; i < jsonClientes.length; i++) {
                if ((parseInt(jsonClientes[i].CODIGO_TIPO_DOCUMENTO) == parseInt(doid) && parseInt(jsonClientes[i].NRO_DOCUMENTO) == parseInt(nro)) || (jsonClientes[i].RUC == parseInt(nro) && parseInt(doid) == 6)) {
                    esCliente = true;
                    $("#txtClientes").val($.trim(jsonClientes[i].RAZON_SOCIAL));
                    $("#txtClientes").keyup().siblings("ul").children("li").click();
                    break;
                }
            }
            if (!esCliente) {
                infoCustom2("La Persona no está registrada como Cliente");
                NuevoClienteRapido(doid, nro);
                //Datos buscados permanecen
                $("#cboTipoDoc").val(doid).change();
                $("#txtNroDctoCliente").val(nro);
            }
        } else {
            infoCustom2("No se encontró Cliente");
            NuevoClienteRapido(doid, nro);
            $("#txtClientes").val("").keyup();
            //Datos buscados permanecen
            $("#cboTipoDoc").val(doid).change();
            $("#txtNroDctoCliente").val(nro);
        }
        Desbloquear("divFilaCliente");
    }

}

function NuevoCliente() {
    //console.log('Nuevo cliente');
    var tp, td, d;
    var continuar = false;
    personaSeleccionada = {};

    if (vErrorsNotMessage(['cboTipoDoc', 'txtNroDctoCliente'])) {
        continuar = true;
        td = $("#cboTipoDoc").val();
        d = $("#txtNroDctoCliente").val();
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
                    window.open("?f=NKMGECL&tp=" + tp + "&td=" + td + "&d=" + d + "&ctlg=" + $("#cbo_Empresa").val() + "", "_blank");
                }
            } else {
                alertCustom("Ingrese un número de documento válido");
            }
        } else {//PERSONA NATURAL
            tp = "N";
            window.open("?f=NKMGECL&tp=" + tp + "&td=" + td + "&d=" + d + "&ctlg=" + $("#cbo_Empresa").val() + "", "_blank");
        }
    }
}

function NuevoClienteRapido(doid, nro) {
    var tp, td, d;
    var continuar = false;
    personaSeleccionada = {};

    if (doid != undefined && nro != undefined) {
        continuar = true;
        td = doid;
        d = nro;

    } else {
        if (vErrorsNotMessage(['cboTipoDoc', 'txtNroDctoCliente'])) {
            continuar = true;
            td = $("#cboTipoDoc").val();
            d = $("#txtNroDctoCliente").val();
        }
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
                    window.open("?f=NCMCLIR&tp=" + tp + "&td=" + td + "&d=" + d + "&ctlg=" + $("#cbo_Empresa").val() + "", "_blank");
                }
            } else {
                alertCustom("Ingrese un número de documento válido");
            }
        } else {//PERSONA NATURAL
            tp = "N";
            window.open("?f=NCMCLIR&tp=" + tp + "&td=" + td + "&d=" + d + "&ctlg=" + $("#cbo_Empresa").val() + "", "_blank");
        }
    }
}

//EMAIL
function cargarCorreos() {
    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);
        for (var u in data) {
            if (data[u].usuario === $('#ctl00_txtus').val()) {
                $('#txtRemitente').val(data[u].email);
                break;
            }
        }



        $('#cboCorreos').selectize({
            persist: false,
            maxItems: null,
            valueField: 'email',
            labelField: 'name',
            searchField: ['name', 'email'],
            options: data,
            render: {
                item: function (item, escape) {
                    return '<div>' +
                        (item.name ? '<span class="name">' + escape(item.name) + '</span>&nbsp;' : '') +
                        (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                        '</div>';
                },
                option: function (item, escape) {
                    var label = item.name || item.email;
                    var caption = item.name ? item.email : null;
                    return '<div style="padding: 2px">' +
                        '<span class="label" style="display: block; font-size: 14px; background-color: inherit; color: inherit; text-shadow: none">' + escape(label) + '</span>' +
                        (caption ? '<span class="caption" style="display: block; font-size: 12px; margin: 2px 5px">' + escape(caption) + '</span>' : '') +
                        '</div>';
                }
            },
            createFilter: function (input) {
                var match, regex;
                // email@address.com
                regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[0]);
                // name <email@address.com>
                regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[2]);
                return false;
            },
            create: function (input) {
                if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                    return { email: input };
                }
                var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                if (match) { return { email: match[2], name: $.trim(match[1]) }; }
                alert('Invalid email address.');
                return false;
            }
        });
        $('.selectize-control').css('margin-left', '0px').css('margin-bottom', '15px');
        $('.selectize-dropdown').css('margin-left', '0px');

        for (var c in data) {
            if (data[c].codigo === $('#hfPIDM').val()) {
                $("#cboCorreos")[0].selectize.setValue(data[c].email);
                break;
            }
        }
    });

    if ($("#txtRemitente").val() == "") {
        $("#txtRemitente").val($("#ctl00_lblusuario").html() + "@gmail.com");
    }
};

function enviarCorreo() {
    var destinos = $('#cboCorreos').val();
    if (vErrors(['cboCorreos', 'txtAsunto'])) {

        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=correo" +
            "&p_CODE=" + $('#txtNumDctoComp').val() +
            "&p_CTLG_CODE=" + $('#cbo_Empresa').val() +
            "&REMITENTE=" + $('#txtRemitente').val() +
            "&NREMITENTE=" + $('#txtRemitente').val() +
            "&DESTINATARIOS=" + destinos +
            "&ASUNTO=" + $('#txtAsunto').val() +
            "&MENSAJE=" + $('#txtcontenido').val(),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                if (datos.indexOf("error") >= 0) {
                    alertCustom("No se encontró el archivo adjunto. Correo no se envió correctamente.");

                } else {
                    exito();
                }
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
                setTimeout(function () { $('#divMail').modal('hide'); }, 25);

            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            }
        });

    }
};


valor_muestra = NaN
function GetValorMuestra(ctlg) {
    valor_muestra = NaN;
    $.ajax({
        type: "post",
        async: false,
        url: "vistas/NV/ajax/NVMDOVR.ashx?OPCION=8" + "&p_CTLG_CODE=" + ctlg,
        contenttype: "application/json;",
        datatype: "json",
        success: function (datos) {
            if (!isEmpty(datos)) {
                valor_muestra = datos[0].VALOR_MUESTRA_ACTUAL

            } else {
                valor_muestra = NaN

            }

        },
        error: function (msg) {
            // alertCustom("Error obtener valor muestra");
            valor_muestra = NaN

        }
    });
}

//_________________________________________________
//_________________________________________________

flagCargaPlugMaps = false;
function MostrarMapa(v_iddiv) {

    //var vLatitud = $("#" + v_iddiv + " #txtLatitud").val();
    //var vLongitud = $("#" + v_iddiv + " #txtLongitud").val();
    //var vTitulo = $("#" + v_iddiv + " #titulodir").val();
    if (vErrors(["cbo_direccion"])) {
        var vLongitud = $("#cbo_direccion option:selected").attr("longitud");
        var vLatitud = $("#cbo_direccion option:selected").attr("latitud");
        var vTitulo = $("#cbo_direccion option:selected").html();
        if (vLongitud != "null" && vLatitud != "null") {


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
        } else {
            infoCustom2("No se ha encontrado una longitud y latitud para esta dirección.");
        }
    }
}

//DATOS SUNAT PARA INDICADOR HABIDO_IND //cliente
var DatosSunatCargados;
var ajaxSunat = null;
function MuestraSunat() {

    $("#no_existe").css("display", "none").html();
    var NRO = $("#txtNroDctoCliente").val();
    Bloquear("divConsultaHabido");
    if (ajaxSunat) {
        ajaxSunat.abort();
    }
    ajaxSunat = $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=SUNAT&NRO=" + NRO,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data == "NO_EXISTE" || data == "error") {
                //$("#no_existe").css("display", "block").html('<p>El número de <B>RUC ' + NRO + '</B> consultado no es válido. Se marcará como HABIDO</p>');
                $("#no_existe").css("display", "block").html('<p>El número de <B>RUC ' + NRO + '</B> consultado no es válido.</p>');
                $("#spanVerificando").html("-");
                HABIDO_IND = "1";
            } else {

                var datos = $.parseJSON(data)
                if (datos[0].FECHA_BAJA != undefined) {
                    $("#no_existe").css("display", "block").html('<p>El <b>RUC ' + NRO + '</b> perteneciente a <B>' + datos[0].RAZON + '</B> se encuentra en <B>' + datos[0].ESTADO + '</B> desde <B>' + datos[0].FECHA_BAJA + '</B> por SUNAT.</p>');;
                    if (datos[0].CONDICION == "HABIDO") {
                        HABIDO_IND = "1";
                    } else {
                        HABIDO_IND = "0";
                    }
                }
                else {

                    if (datos != null) {
                        if (datos[0].CONDICION == "HABIDO") {
                            HABIDO_IND = "1";
                        } else {
                            HABIDO_IND = "0";
                        }
                        DatosSunatCargados = datos[0];
                    } else {
                        $("#spanVerificando").html("-");
                        $("#no_existe").css("display", "block").html('<p>No se encontraron datos. Se marcará como HABIDO</p>');;
                        HABIDO_IND = "1";
                    }
                }
            }

            $("#lblEstadoSunat").html(datos[0].ESTADO);
            $("#spanVerificando").html(datos[0].CONDICION);


        },
        error: function (msg) {
            Desbloquear("divConsultaHabido");
            if (msg.statusText != "abort") {
                alertCustom("Consulta no se realizó correctamente");
            }

        }, complete: function () {
            Desbloquear("divConsultaHabido");
        }
    });

}

var fnActualizarDatosContribuyente = function (pidm, cond_sunat, estado_sunat) {

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
                    $("#lblHabido").html("CONDICIÓN: " + "<b>" + cond_sunat + "</b>");
                    $("#lblEstado").html("ESTADO: " + "<b>" + estado_sunat + "</b>");
                    exito();
                    $('#modal-habido').modal('hide');
                } else {
                    noexito();
                }

            } else {
                noexito();
            }
            Desbloquear("ventana");
        },
        error: function () {
            noexito();
            Desbloquear("ventana");
        }
    });
};

function CancelarSunat() {
    $('#ModalSunat').modal('hide');
}

﻿var prodActual = {};
var asincrono = true;//clientes y responsablesPago
var jsonClientes = [];
var aux_predeterminado = false;
var jsonPredeterminado = new Array();
//EQUIVALENCIA DE UNIDADESLMCO
var equivalencias = [];
//PARAMETROS NUEVOS
var prmtVNST = "";//VALIDA STOCK ANTES DE AGREGAR A DETALLES
var agregarDetalle = "";//AGREGAR DETALLE VALIDADO
//var cargarprederteminado = false;
//DPORTA
var prmtDIGC = 0;
var prmtDIGP = 0;
var prmtACON = "NO";//VERIFICA SI DESEA QUE SE GENERE O NO EL ASIENTO CONTABLE
var docu = "";
var prmtCURS = "";
/*var token_migo = '';//dporta*/
var desc_producto = '';

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

var cargarAlmacenes = function () {
    $('#cboAlmacen').select2('destroy');
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + $('#cbo_Empresa').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboAlmacen').html('');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboAlmacen').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboAlmacen').select2('val', $('#ctl00_hddestablecimiento').val());
            //$("#cboAlmacen").change();
        },
        error: function (msg) {
            alertCustom('Ocurrió un error al listar almacenes.');
        }
    });
    $('#cboAlmacen').select2();
};

var NVMCOTI = function () {

    var plugins = function () {
        $('#cbo_Empresa, #cbo_Sucursal,#cboVendedor, #cbo_modo_pago, #cboDocumentoVenta, #cbo_moneda, #cbo_und_medida,  #cboTipoDoc,#cboDctoOrigen, #cboAlmacen').select2();
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_vig').datepicker();

        $('#txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_vig').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento').datepicker("setDate", "now");

       //Fecha Vigencia Y Dias
        $('#txtFechaVigencia').datepicker("setStartDate", $('#txt_fec_emision').val());
        $('#txtFechaVigencia').datepicker().on("change", function () {
            if ($('#txt_fec_emision').val() != "") {
                $('#txtFechaVigencia').datepicker('setStartDate', $('#txt_fec_emision').val());
                if ($('#txtFechaVigencia').val() != "") {
                    $("#txtDiasVigencia").val(DateDiff(new Date(ConvertirDate($('#txtFechaVigencia').val())), new Date(ConvertirDate($('#txt_fec_emision').val()))));
                } else {
                    $("#txtDiasVigencia").val("0");
                }
            }
        });
        $('#txt_fec_emision').datepicker().on("change", function () {
            $('#txtFechaVigencia').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtFechaVigencia').val().split("/").reverse().join(""))) ? "" : $('#txtFechaVigencia').val());
            $('#txtFechaVigencia').datepicker('setStartDate', $(this).val());
            $('#txtFechaVigencia').change();
        });
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
            async: false,
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
                alert(msg);
            }
        });
        $(select).select2();
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
                alert(msg);
            }
        });
        $('#cbo_moneda').select2();
    }

    //var cargarAlmacenes = function () {
    //    $('#cboAlmacen').select2('destroy');
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + $('#cbo_Empresa').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: false,
    //        success: function (datos) {
    //            $('#cboAlmacen').html('');
    //            if (datos != null) {
    //                for (var i = 0; i < datos.length; i++) {
    //                    $('#cboAlmacen').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
    //                }
    //            }
    //            $("#cboAlmacen").change();
    //        },
    //        error: function (msg) {
    //            alertCustom('Ocurrió un error al listar almacenes.');
    //        }
    //    });
    //    $('#cboAlmacen').select2();
    //};

    var fillCboModoPago = function () {
        $('#cbo_modo_pago').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=4",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_modo_pago').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].CODIGO == "0001" || datos[i].CODIGO == "0002") {
                            $('#cbo_modo_pago').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                }
                $('#cbo_modo_pago').val(datos[0].CODIGO);
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cbo_modo_pago').select2();
    }

    //var fillcboUniMedida = function () {
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=3",
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: false,
    //        success: function (datos) {
    //            $('#cbo_und_medida').empty();
    //            $('#cbo_und_medida').append('<option></option>');
    //            if (datos != null) {
    //                for (var i = 0; i < datos.length; i++) {
    //                    $('#cbo_und_medida').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
    //                }
    //            }
    //            $('#cbo_und_medida').select2('val', "");
    //        },
    //        error: function (msg) {
    //            alert(msg);
    //        }
    //    });
    //}
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

    //PENDIENTE
    var cargarCorrelativo = function () {
        //Cargar correlativo cotizacion
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CORR&CTLG=" + $('#cbo_Empresa').val() + "&SCSL=" + $('#cbo_Sucursal').val() + "&TIPO_DCTO=0053",
            contenttype: "application/json;",
            async: false,
            datatype: "json",
            success: function (datos) {
                if (datos != null && datos != "" && typeof datos[0].SERIE != "undefined") {
                    $('#txtCodigoAutorizacion').val(datos[0].CODIGO);
                    $('#txtSerieCotizacion').val(datos[0].SERIE);
                    $('#txtNroCotizacion').val(datos[0].VALOR_ACTUAL);
                }
                else {
                    limpiarCorrelativo();
                }
            },
            error: function (msg) {
                alertCustom("La Serie y Número correlativos no se obtuvieron correctamente.");
            }
        });
    }

    var limpiarCorrelativo = function () {
        $("#txtSerieCotizacion,#txtNroCotizacion,#txtCodigoAutorizacion").val("");
    }

    var calcularFechaVencimiento = function () {
        if ($("#txt_plazo_pago").val() > 0) {
            //var fecha = new Date(Date($("#txt_fec_emision").val()));
            //var plazo = parseInt($("#txt_plazo_pago").val());
            //fecha.setDate(fecha.getDate() + plazo);
            //var fecha_vencimiento = (fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate()) + '/' + ((fecha.getMonth() + 1) < 10 ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1)) + '/' + fecha.getFullYear();
            //$("#txt_fec_vencimiento").val(fecha_vencimiento);
            var fechita = $("#txt_fec_emision").val();
            let dia = fechita.split("/")[0];
            let mes = fechita.split("/")[1] - 1; // -1 porque el mes empieza en 0 que viene a ser enero y diciembre sería 11
            let anio = fechita.split("/")[2];
            var fecha = new Date(anio, mes, dia);
            var plazo = parseInt($("#txt_plazo_pago").val());
            fecha.setDate(fecha.getDate() + plazo);
            var fecha_vencimiento = (fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate()) + '/' + ((fecha.getMonth() + 1) < 10 ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1)) + '/' + fecha.getFullYear();
            $("#txt_fec_vencimiento").val(fecha_vencimiento);
        }
    }

    var eventoControles = function () {
        var fechaEmisionAnterior = "";
        var empresaAnterior = "";

        $('#cbo_Empresa').on('change', function () {
            //if ($(this).val() != empresaAnterior) {
            //    $('#input_cod_prod').html('<input id="txt_cod_producto" disabled="disabled" class="span6" type="text" style="margin-right: 4px" /><input id="txt_cod_a_producto" class="span6" type="text" style="margin-left:-2px;" />');
            //    $("#input_desc_prod").html("<input id='txt_desc_producto' class='span12' type='text' />");

            //    ListarSucursales($('#cbo_Empresa').val());
            //    cargarAlmacenes();
            //    fillcboRegistroEspecifico('VENT');
            //    fillTxtCliente("#txtClientes", "");
            //    fillTxtResponsablePago();
            //    filltxtdescproducto('');
            //    if ($("#hfPIDM").val() != "") {
            //        filltxtdescproducto('');
            //    }
            //    if ($("#txtNumDctoComp").val() == "" && ObtenerQueryString("codigo") == null) {
            //        cargarCorrelativo();
            //    }
            //    empresaAnterior = $(this).val();
            //}
            if ($(this).val() != empresaAnterior) {
                //limpiarCorrelativo();
                ListarSucursales($('#cbo_Empresa').val());
                cargarAlmacenes();
                fillcboRegistroEspecifico('VENT');
                // fillcboOrigenEspecifico();
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
                // filltxtdescproducto('');
                empresaAnterior = $(this).val();
                // fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", true);
            }
        });

        $('#cbo_Sucursal').on('change', function () {
            if ($('#cbo_Empresa').val() != "" && $('#cbo_Sucursal').val() != "") {
                //LimpiarCamposDetalle();
                //if ($("#hfPIDM").val() != "") {
                //    filltxtdescproducto('');
                //}
                if (ObtenerQueryString("codigo") != undefined) {
                    if ($("#hfCompletoInd").val() == "S") {
                        fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "", false);
                    } else {
                        fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", false);
                    }
                } else {
                    fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", true);
                }
                if ($("#txtNumDctoComp").val() == "" && ObtenerQueryString("codigo") == null) {
                    cargarCorrelativo();
                }
                $('#cboAlmacen').select2('val', $('#cbo_Sucursal').val());
                $("#cboAlmacen").change();
            }

            if ($('#cbo_Sucursal').val() != "") {
                if ($('#cbo_Sucursal option:selected').attr("data-exonerado") == "SI") {
                    $("#lblExonerado").html("Exonerado");
                } else {
                    $("#lblExonerado").html("");
                }
            } else {
                $("#lblExonerado").html("");
            }

            if ($("#cbo_Sucursal").val() != "") {
                if ($("#cbo_Sucursal option:selected").attr("data-exonerado") == "SI") {
                    $("#hfIMPUESTO").val("0");
                    if (ObtenerQueryString("codigo") == undefined) {
                        infoCustom2("Se considerará IGV: " + $('#hfIMPUESTO').val() + "%");
                    }
                } else {
                    //OBTENER IMPUESTO GENERAL A LAS VENTAS
                    $.ajax({
                        type: "post",
                        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=0021",
                        contenttype: "application/json;",
                        datatype: "json",
                        async: false,
                        success: function (datos) {
                            if (datos != null) {
                                if (!isNaN(parseFloat(datos[0].VALOR))) {
                                    $('#hfIMPUESTO').val(parseFloat(datos[0].VALOR) * 100);
                                    if (ObtenerQueryString("codigo") == undefined) {
                                        infoCustom2("Se considerará IGV: " + $('#hfIMPUESTO').val() + "%");
                                    }
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
        });

        $('#cbo_moneda').on('change', function () {
            ListarValorCambio($('#cbo_moneda').val());
            ListarValorCambioOficial($('#cbo_moneda').val());
            $('#simbolo_moneda').text($('#cbo_moneda :selected').attr('simbolo'));
        });

        $('#cboAlmacen').on('change', function () {
            LimpiarCamposDetalle();
            if ($('#cboAlmacen').val() != null) {
                filltxtdescproducto('');
            }
        });

        $("#btnverempl").click(function () {
            if (vErrorsNotIcon("txtClientes")) {
                BuscarEmpresa($("#hfPIDM").val());
            }
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
            if ($('#cbo_modo_pago').val() == "0001" || $('#cbo_modo_pago').val() == "0000") {
                $("#txt_fec_vencimiento").val($("#txt_fec_emision").val());
                $("#txt_plazo_pago").val('0');
            } else {
                CargarDatosLineaCredito();
                calcularFechaVencimiento();
                
            }
        });

        $("#txt_fec_emision").on("change", function () {
            if ($("#txt_fec_emision").val() != fechaEmisionAnterior) {
                CargarFactorImpuestoRentaVenta();
                if ($("#cbo_modo_pago").val() == "0001" || $('#cbo_modo_pago').val() == "0000") {
                    $("#txt_fec_vencimiento").val($("#txt_fec_emision").val());
                } else {
                    if ($("#txt_plazo_pago").val() > 0) {
                        var fechita = $("#txt_fec_emision").val();
                        let dia = fechita.split("/")[0];
                        let mes = fechita.split("/")[1] - 1; // -1 porque el mes empieza en 0 que viene a ser enero y diciembre sería 11
                        let anio = fechita.split("/")[2];
                        var fecha = new Date(anio, mes, dia);
                        var plazo = parseInt($("#txt_plazo_pago").val());
                        fecha.setDate(fecha.getDate() + plazo);
                        var fecha_vencimiento = (fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate()) + '/' + ((fecha.getMonth() + 1) < 10 ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1)) + '/' + fecha.getFullYear();
                        $("#txt_fec_vencimiento").val(fecha_vencimiento);
                    } else {
                        $("#txt_fec_vencimiento").val($("#txt_fec_emision").val());
                    }
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
                AgregarDetalleVenta();//DPORTA
            }
        });

        $('#txt_comentario, #txt_glosa_det').bind('keypress', function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) { //Enter keycode
                return false;
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
                        //$('#cboDocumentoVenta').val("").change();
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
                        //$('#cbo_direccion').val("").change();

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
                case "0"://OTROS
                    $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
                    break;
            }

            var tipo = $(this).val();
            $('#cboDocumentoVenta').val("").change();//DPORTA
            if (tipo === '6') {
                $('#txtNroDctoCliente').val($("#hfRUC").val());
            } else {
                if ($("#hfCodigoTipoDocumento").val() == tipo) {
                    $('#txtNroDctoCliente').val($("#hfNroDocumento").val());
                } else {
                    $('#txtNroDctoCliente').val("");
                }
            }

            if ($('#cboTipoDoc').val() == '6') {
                $("#cboDocumentoVenta option:not([value=0001])").attr("disabled", "disabled");
                $("#cboDocumentoVenta option[value=0012]").removeAttr("disabled");
                $("#cboDocumentoVenta option[value=0101]").removeAttr("disabled"); //PARA QUE ESTÉ DESBLOQUEADO LA NOTA DE VENTA O EL NOMBRE QUE LE HAYA PUESTO EL CLIENTE
                $("#cboDocumentoVenta option[value=0001]").removeAttr("disabled");

                //var oItems = $('#cboDocumentoVenta option');
                //for (var i = 0; i < oItems.length; i++) {
                //    if (oItems[i].value === "0012") {
                //        $("#cboDocumentoVenta").select2("val", "0012").change();
                //    } else {
                //        if ($('#cboSerieDocVenta').val() == "") {//DPORTA
                //            $("#cboDocumentoVenta").select2("val", "0001").change();
                //        }
                //    }
                //}
                var oItems = $('#cboDocumentoVenta option');
                for (var i = 0; i < oItems.length; i++) {
                    if (oItems[i].value != "" && oItems[i].value != "0003") {
                        if (oItems[i].value === "0012" && $("#txtNroDocVenta").val() == "") {
                            $("#cboDocumentoVenta").select2("val", "0012").change();
                        } else if (oItems[i].value === "0001" && $("#txtNroDocVenta").val() == "") {
                            //if ($('#cboSerieDocVenta').val() == "0001") {//DPORTA
                            $("#cboDocumentoVenta").select2("val", "0001").change();
                            //}
                        } else if (oItems[i].value === "0101" && $("#txtNroDocVenta").val() == "") {
                            $("#cboDocumentoVenta").select2("val", "0101").change();
                        }
                    }
                }
            } else {
                $("#cboDocumentoVenta option:not([value=0001])").removeAttr("disabled");
                $("#cboDocumentoVenta option[value=0001]").attr("disabled", "disabled");

                //var oItems = $('#cboDocumentoVenta option');
                //for (var i = 0; i < oItems.length; i++) {
                //    if (oItems[i].value === "0012") {
                //        $("#cboDocumentoVenta").select2("val", "0012").change();
                //    } else {
                //        if ($('#cboSerieDocVenta').val() == "") {//DPORTA
                //            $("#cboDocumentoVenta").select2("val", "0003").change();
                //        }
                //    }
                //}
                var oItems = $('#cboDocumentoVenta option');
                for (var i = 0; i < oItems.length; i++) {
                    if (oItems[i].value != "" && oItems[i].value != "0001") {
                        if (oItems[i].value === "0012" && $("#txtNroDocVenta").val() == "") {
                            $("#cboDocumentoVenta").select2("val", "0012").change();
                        } else if (oItems[i].value === "0003" && $("#txtNroDocVenta").val() == "") {
                            //if ($('#cboSerieDocVenta').val() == "0003") {
                            $("#cboDocumentoVenta").select2("val", "0003").change();
                            //}
                        } else if (oItems[i].value === "0101" && $("#txtNroDocVenta").val() == "") {
                            $("#cboDocumentoVenta").select2("val", "0101").change();
                        }
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
            //DPORTA (PERMITE MODIFICAR CLIENTE LUEGO DE HABER GRABADO UNA VENTA)
            $("#cboTipoDoc,#txtNroDctoCliente").removeAttr("disabled");
            if ($("#chkResponsablePago").is(":checked")) {
                $("#chkResponsablePago").click();
                $("#chkResponsablePago").parent().removeClass("checked");
            }
            $("#txtClientes").val("").keyup();
            //$("#cbo_direccion").empty().html("<option></option>")
            //$("#cbo_direccion").select2("val", "")
            if ($("#txtNroDctoCliente").val() != "") {
                $("#txtNroDctoCliente").focus();
            }
        });

        //EnviarCorreo - enviarMail
        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val('COTIZACIÓN CLIENTE');
            $('#txtcontenido').val("");
            cargarCorreos();
            $('#divMail').modal('show');
        });

        //$('#btnMail').click(function (e) {
        //    if ($("#txtNumDctoComp").val().trim() != "") {

        //        e.preventDefault();

        //        if ($("#txt_comentario").val() == '')
        //            $('#txtAsunto').val('COTIZACION CLIENTE');
        //        else
        //            $('#txtAsunto').val($("#txt_comentario").val());                
        //        $('#lblEmpresa').text($('#cbo_Empresa :selected').html());
        //        $('#lblAsunto').text('COTIZACION CLIENTE- ' + $("#cbo_Sucursal :selected").html());
        //        $('#lblEmision').text($('#txt_fec_emision').val());
        //        $('#lblTransaccion').text($('#txt_fec_transaccion').val());

        //        $('#lblCliente').text($('#txtClientes').val().trim());
        //        if ($("#chkResponsablePago").is(":checked")) {
        //            $('#lblResponsablePago').text($('#txtResponsablePago').val().trim());
        //        } else {
        //            $('#lblResponsablePago').text($('#txtClientes').val().trim());
        //        }

        //        // $('#lblAux').text(aux + ': ');
        //        $('#lblRazSocial').text($('#txtrazsocial').val());
        //        $('#lblTipoDoc').text($('#cboTipoDoc :selected').html());
        //        $('#lblNumDoc').text($('#txtNroDctoCliente').val());
        //        $('#lblDocRegistro').text($('#txtSerieCotizacion').val() + '-' + $('#txtNroCotizacion').val());
        //        $('#lblGlosa').text(($('#txt_comentario').val() == "" ? "Cotización a cliente" : $('#txt_comentario').val()));

        //        var data = new FormData();
        //        data.append('p_CODE', $("#txtNumDctoComp").val());
        //        Bloquear("ventana");
        //        var jqxhr = $.ajax({
        //            type: "POST",
        //            url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=IMPR",
        //            contentType: false,
        //            data: data,
        //            processData: false,
        //            cache: false,
        //            async: false
        //        })
        //       .success(function (datos) {
        //           Desbloquear("ventana");
        //           if (datos != null) {
        //               $("#lblTablaHtml").html(datos);
        //           }
        //       })
        //       .error(function () {
        //           Desbloquear("ventana");
        //       });
        //        //$('#lblTablaHtml').html(ObtenerTablaDetalles());
        //        cargarCorreos();
        //        $('#divMail').modal('show');
        //    }
        //    else {
        //        alertCustom("El documento no puede enviarse sin antes ser completado");
        //    }

        //});

        $("#cbo_und_medida").on("change", function () {

            let equi = parseFloat($('#cbo_und_medida option:selected').attr('equivalencia'));
            let precio = parseFloat($('#txtPrecioUnitInicio').val());
            let precio_unitario = equi * precio;
            $('#txtPrecioUnitario').val(precio_unitario.toFixed(prmtDIGP));
            $('#hfCodUnd_Producto').val($("#cbo_und_medida").val());

            if ($("#hfCompletoInd").val() == "N") {
                if (prodActual.CODIGO != undefined && prodActual.CODE_UNIDAD != undefined) {
                    if ($("#cbo_und_medida").val() != "") {
                        calcula_factor_conversion(prodActual.CODE_UNIDAD, $("#cbo_und_medida").val());
                    }
                }
            }
        });

        $("#info_btnf").on("click", function () {
            $("#bloqueInfo").slideToggle();
        });

        $('#cbo_und_medida ').on('change', function () {
            let equi = parseFloat($('#cbo_und_medida option:selected').attr('equivalencia'));
            let precio = parseFloat($('#txtPrecioUnitInicio').val());

            let precio_unitario = equi * precio;

            $('#txtPrecioUnitario').val(precio_unitario.toFixed(2));
            
        });

    }

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");

        $("#cbo_Empresa").val($("#ctl00_hddctlg").val());
        $("#cbo_Empresa").change();
        $("#cboAlmacen").val($("#cbo_Sucursal option:selected").attr("data-almc"));
        $("#cboAlmacen").change();
        if (cod !== undefined) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:ActualizarDctoVenta();");

            //Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=LDOCC&p_FVBVTAC_CODE=" + cod,
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

                    $("#txtNumDctoComp").val(datos[0].CODIGO);
                    $("#txtNumSec").val(datos[0].SECUENCIA);
                    //F2
                    $("#cbo_Empresa").select2('val', datos[0].EMPRESA).change();
                    $("#cbo_Sucursal").select2('val', datos[0].SUCURSAL).change();
                    //DPORTA
                    $("#cboAlmacen").val($("#cbo_Sucursal option:selected").attr("data-almc"));
                    $("#cboAlmacen").change();

                    $("#txtClientes").attr("disabled", "disabled");
                    $("#txtNroDctoCliente").attr("disabled", "disabled");
                    $("#cboTipoDoc").attr("disabled", "disabled");
                    $("#cboTipoDoc").select2("val", datos[0].CLIE_DOID).change();            
                    

                    //Carga datos de cliente
                    $("#txtClientes").val(datos[0].RAZON_SOCIAL);
                    $("#txtClientes").keyup().siblings("ul").children("li").click();

                    
                    $("#cboDocumentoVenta").select2("val", datos[0].DCTO_CODE);
                    $("#cboVendedor").select2("val", datos[0].USVE_USUA_ID);

                    if ($("#hfCompletoInd").val() == "S") {
                        $("#txt_fec_emision").val(datos[0].EMISION);
                        $("#txt_fec_transaccion").val(datos[0].TRANSACCION);
                        $("#txt_fec_vencimiento").val(datos[0].VENCIMIENTO);
                        $("#txtFechaVigencia").val(datos[0].FECHA_VIGENCIA);
                        $("#txtDiasVigencia").val(datos[0].DIAS_VIGENCIA);
                    } else {
                        $('#txt_fec_emision').datepicker('setDate', 'now');
                        $('#txt_fec_transaccion').datepicker('setDate', 'now');
                        $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                        $('#txtFechaVigencia').datepicker('setDate', 'now');
                        $("#txtDiasVigencia").val(0);
                        $("#txtFechaVigencia, #txtDiasVigencia").pulsate({
                            color: "#0004FF",
                            reach: 20,
                            repeat: 3,
                            glow: true
                        });
                    }                   
                    
                    //$("#hfPIDM").val(datos[0].CLIE_PIDM);
                    $("#cbo_moneda").select2('val', datos[0].MONEDA).change();
                    //Carga datos responsable de pago
                    if (datos[0].RESPONSABLE_PAGO_PIDM != "") {
                        $("#chkResponsablePago").prop('checked', true).parent().addClass('checked');
                        $("#txtResponsablePago").removeAttr("disabled");
                        $("#txtResponsablePago").val(datos[0].RESPONSABLE_PAGO);
                        $("#hfResponsablePagoPIDM").val(datos[0].RESPONSABLE_PAGO_PIDM);
                        $("#txtResponsablePago").keyup().siblings("ul").children("li").click();
                    }
                    $("#cbo_modo_pago").select2('val', datos[0].MOPA).change();                    

                    //Si el documento ha sido COMPLETADO se bloquea la edicion y se carga el correlativo correspondiente
                    if ($("#hfCompletoInd").val() == "S") {

                        $("#btnImprimir").attr("style", "display:inline-block;margin-top:2px;");
                        $("#divBtnsMantenimiento,#btnBuscadocs").attr("style", "display:none");
                        $("#hfImprimirPreciosIGV").val(datos[0].IGV_IMPR_IND);

                        //PENDIENTE Llenar serie y nro cotizacion
                        $("#txtSerieCotizacion").val(datos[0].DCTO_SERIE);
                        $("#txtNroCotizacion").val(datos[0].DCTO_NRO);
                        $("#txtCodigoAutorizacion").val("");

                        $("#txt_valor_cambio").val(datos[0].VALOR_CAMBIO);
                        $("#txt_valor_cambio_Oficial").val(datos[0].VALOR_CAMBIO_OFI);
                        $("#lbl_fec_vig").attr("style", "display:none");
                        $("#input_fec_vig").attr("style", "display:none");
                        $("#lbl_fec_vig_Oficial").attr("style", "display:none");
                        $("#input_fec_vig_Oficial").attr("style", "display:none");
                        $("#btnRecargarPersona").attr("style", "display:none");
                        BloquearCampos();

                    } else {
                        cargarCorrelativo();
                    }

                    $("#txt_valor_cambio").val(datos[0].VALOR_CAMBIO);
                    $("#txt_comentario").val(datos[0].GLOSA);


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


                    if (datos[0].DETRACCION_IND == "S") {
                        $('#chk_detraccion').prop('checked', true).parent().addClass('checked');
                        $("#txt_detraccion").val(datos[0].DETRACCION)

                        $("#txt_num_op_detrac").val(datos[0].NUM_DCTO_DETRAC);
                        $("#txt_cta_detrac").val(datos[0].NRO_CUENTA_DETRAC);
                        $("#txt_fec_comp_detrac").datepicker('setDate', datos[0].FECHA_DETRAC);
                        $('#txt_num_op_detrac, #txt_fec_comp_detrac').prop('disabled', false);
                    }
                    $("#txt_detraccion").val(datos[0].DETRACCION)
                    $("#txt_monto_detraccion").val(datos[0].DETRACCION)


                    if (datos[0].RETENCION_IND == "S") {
                        $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                        $("#chk_retencion").change();
                        $("#txt_Retencion").val(datos[0].RETENCION)
                        $("#txt_num_comp_reten").val(datos[0].NUM_DCTO_RETEN);
                        $("#txt_fec_comp_reten").datepicker('setDate', datos[0].FECHA_RETEN);
                    }
                    $("#txt_Retencion").val(datos[0].RETENCION)

                    if (datos[0].PERCEPCION == "S") {
                        $('#chk_percepcion').prop('checked', true).parent().addClass('checked');
                        $("#chk_percepcion").change();

                    }
                    $("#txt_Percepcion").val(datos[0].PERCEPCION)

                    $("#txt_monto_total").val(datos[0].IMPORTE);
                    $("#lblImporteCobrar").html(datos[0].IMPORTE);
                    //FIN CARGA TOTALES                 

                    var monedaCabecera = datos[0].MONEDA;
                    //LISTAR DETALLES
                    $.ajax({
                        type: "POST",
                        url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=LDOCD&p_FVBVTAC_CODE=" + cod,
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (datos2) {
                            var cont = 0;
                            var contBon = 0;
                            var contMues = 0;
                            if (datos2 != null) {
                                for (var i = 0; i < datos2.length; i++) {
                                    var objProd = {};

                                    if (datos2[i].TIPO_PRODUCTO == 'N') {
                                        objProd.ITEM_TABLA = cont + 1;
                                        objProd.ITEM = datos2[i].ITEM;
                                        objProd.CODIGO = datos2[i].PROD_CODE;
                                        objProd.PROD_CODE_ANTIGUO = datos2[i].PROD_CODIGO_ANTIGUO;
                                        objProd.TIPO_BIEN = datos2[i].TIPO_BIEN;
                                        objProd.ALMACENABLE = datos2[i].ALMACENABLE;

                                        objProd.CODE_UNIDAD = datos2[i].UNIDAD;
                                        objProd.UNIDAD = datos2[i].UNIDAD;
                                        objProd.DESC_UNIDAD = datos2[i].DESC_UNIDAD;

                                        objProd.GLOSA = datos2[i].GLOSA;

                                        //Almacen
                                        objProd.ALMC = datos2[i].ALMC;
                                        objProd.DESC_ALMC = datos2[i].DESC_ALMC;

                                        objProd.NOMBRE_IMPRESION = datos2[i].NOMBRE_IMPRESION;

                                        objProd.CANTIDAD = datos2[i].CANTIDAD;
                                        if ($("#cbo_moneda option[value=" + monedaCabecera + "]").attr("data-tipo") == "MOBA") {

                                            objProd.MONTO_DESCUENTO = datos2[i].DESCUENTO;
                                            objProd.PRECIO_DETALLE = datos2[i].PU; //El precio está en la misma moneda que  cbo_moneda
                                            objProd.PU = datos2[i].PU;
                                            objProd.TOTAL_BRUTO = (parseFloat(datos2[i].CANTIDAD) * parseFloat(datos2[i].PU)).toFixed(prmtDIGP);
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
                                            objProd.TOTAL_BRUTO = (parseFloat(datos2[i].CANTIDAD) * parseFloat(datos2[i].CONVERT_PU)).toFixed(prmtDIGP);
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
                                        objProd.PRECIO_IND = "";
                                        objProd.CTAS_CODE = "";
                                        objProd.CECO_CODE = "";
                                        objProd.TIPO_PROD = "";
                                        objProd.TIPO_PRODUCTO = datos2[i].TIPO_PRODUCTO;
                                        objProd.SERIADO = datos2[i].SERIADO;

                                        detallesVenta.push(objProd);
                                        cont = cont + 1;
                                    } else {
                                        if (datos2[i].TIPO_PRODUCTO == 'B') {
                                            objProd.ITEM_TABLA = contBon + 1;
                                            objProd.CODIGO = datos2[i].PROD_CODE;
                                            objProd.PROD_CODE_ANTIGUO = datos2[i].PROD_CODIGO_ANTIGUO;
                                            objProd.TIPO_BIEN = datos2[i].TIPO_BIEN;
                                            objProd.ALMACENABLE = datos2[i].ALMACENABLE;
                                            objProd.ITEM = datos2[i].ITEM;
                                            objProd.CODE_UNIDAD = datos2[i].UNIDAD;
                                            objProd.UNIDAD = datos2[i].UNIDAD;
                                            objProd.DESC_UNIDAD = datos2[i].DESC_UNIDAD;

                                            objProd.GLOSA = datos2[i].GLOSA;

                                            //Almacen
                                            objProd.ALMC = datos2[i].ALMC;
                                            objProd.DESC_ALMC = datos2[i].DESC_ALMC;

                                            objProd.NOMBRE_IMPRESION = datos2[i].NOMBRE_IMPRESION;

                                            objProd.CANTIDAD = datos2[i].CANTIDAD;
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
                                            objProd.PRECIO_IND = "";
                                            objProd.CTAS_CODE = "";
                                            objProd.CECO_CODE = "";
                                            objProd.TIPO_PROD = "";
                                            objProd.TIPO_PRODUCTO = datos2[i].TIPO_PRODUCTO;
                                            objProd.SERIADO = datos2[i].SERIADO;

                                            detallesBonificacion.push(objProd);
                                            contBon = contBon + 1;
                                        } else {
                                            if (datos2[i].TIPO_PRODUCTO == 'M') {
                                                objProd.ITEM_TABLA = contMues + 1;
                                                objProd.CODIGO = datos2[i].PROD_CODE;
                                                objProd.PROD_CODE_ANTIGUO = datos2[i].PROD_CODIGO_ANTIGUO;
                                                objProd.TIPO_BIEN = datos2[i].TIPO_BIEN;
                                                objProd.ALMACENABLE = datos2[i].ALMACENABLE;
                                                objProd.ITEM = datos2[i].ITEM;
                                                objProd.CODE_UNIDAD = datos2[i].UNIDAD;
                                                objProd.UNIDAD = datos2[i].UNIDAD;
                                                objProd.DESC_UNIDAD = datos2[i].DESC_UNIDAD;

                                                objProd.GLOSA = datos2[i].GLOSA;

                                                //Almacen
                                                objProd.ALMC = datos2[i].ALMC;
                                                objProd.DESC_ALMC = datos2[i].DESC_ALMC;

                                                objProd.NOMBRE_IMPRESION = datos2[i].NOMBRE_IMPRESION;

                                                objProd.CANTIDAD = datos2[i].CANTIDAD;
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
                                                objProd.PRECIO_IND = "";
                                                objProd.CTAS_CODE = "";
                                                objProd.CECO_CODE = "";
                                                objProd.TIPO_PROD = "";
                                                objProd.TIPO_PRODUCTO = datos2[i].TIPO_PRODUCTO;
                                                objProd.SERIADO = datos2[i].SERIADO;

                                                detallesMuestra.push(objProd);
                                                contMues = contMues + 1;
                                            }
                                        }
                                    }
                                }

                                if (detallesVenta.length > 0) {
                                    var datos2 = ObtenerTablaDetalles();
                                    ListarTablaDetalles(datos2);
                                }

                                if (detallesBonificacion.length > 0) {
                                    var datos3 = ObtenerTablaDetallesBonificacion();
                                    ListarTablaDetallesBonificacion(datos3);
                                }

                                if (detallesMuestra.length > 0) {
                                    var datos4 = ObtenerTablaDetallesMuestra();
                                    ListarTablaDetallesMuestra(datos4);
                                }

                                if ($("#hfCompletoInd").val() == "S") {
                                    $(".btnEliminarDetalle").remove();
                                    $("#tabla_det").DataTable().column(0).visible(false);

                                } else {
                                    $("#div_btn_completar").attr("style", "display:none");//para que obligatoriamente se tenga que modificar antes de completar
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
                },
                error: function (msg) {
                    alertCustom(msg);
                }
            });
            //Desbloquear("ventana");
        } else {
            if (prmtACON == "SI") {
                //fnCargaTablaCuentasC();
            }
        }
    }

    return {
        init: function () {
            cargarParametrosSistema();
            plugins();            
            fillCboEmpresa();
            //if (ObtenerQueryString("codigo") == undefined) {
            //    fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", true);
            //}
            //cargarAlmacenes();
            eventoControles();
            //fillcboRegistroEspecifico('VENT');           
            fillcboMoneda();
            fillCboModoPago();
            fillEquivalenciasUnidades();
            //fillcboUniMedida();
            fillCboTipoDoc();
            cargaInicial();

        }
    };
}();

function cargarParametrosSistema() {
    let filtro = "DIGP,DETR,RETN,RETR,IMRE,BFDV,ODON,VNST,ADET,ACON,CURS"; //Aquí van los parámetros que se van a utilizar en la pantalla y luego se le hace su case
    //Se hizo así para que en una sola consulta traiga los datos necesarios y no esté solicitando uno por uno
    //TODOS LOS PARAMETROS -- DPORTA 11/03/2022
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3.5&FILTRO=" + filtro,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    switch (datos[i].CODIGO) {
                        case "DIGP":
                            prmtDIGP = datos[i].VALOR;
                            break;
                        //case "STKP":
                        //    $('#hfParamStock').val(datos[i].VALOR);
                        //    paramStock = parseFloat($("#hfParamStock").val());
                        //    break;
                        //case "REDN":
                        //    $('#hfParamRedondeo').val(datos[i].VALOR);
                        //    break;
                        case "DETR":
                            if (!isNaN(parseFloat(datos[i].VALOR))) {
                                $('#hfParamDetraccion').val(datos[i].VALOR);
                            } else {
                                infoCustom2("El parámetro de sistema de Detracción(DETR) no es válido. Se considerará como monto requerido 700")
                                $('#hfParamDetraccion').val("700");
                            }
                            break;
                        case "RETN":
                            if (!isNaN(parseFloat(datos[i].VALOR))) {
                                $('#hfParamRetencion').val(datos[i].VALOR);
                            } else {
                                infoCustom2("El parámetro de sistema de Retención(RETN) no es válido. Se considerará retención 3%")
                                $('#hfParamRetencion').val("3");
                            }
                            break;
                        case "RETR":
                            if (!isNaN(parseFloat(datos[i].VALOR))) {
                                $('#hfParamMontoRetencion').val(datos[i].VALOR);
                            } else {
                                infoCustom2("El parámetro de sistema de Retención(RETR) no es válido. Se considerará 300")
                                $('#hfParamMontoRetencion').val("300");
                            }
                            break;
                        case "IMRE":
                            if (!isNaN(parseFloat(datos[i].VALOR))) {
                                $('#hfFactorImpuestoRenta').val(parseFloat(datos[i].VALOR));
                            } else {
                                infoCustom2("El parámetro Factor de Impuesto a la Renta Mínimo (IMRE) no es válido. Se considerará Factor Mínimo de 1.5%")
                                $('#hfFactorImpuestoRenta').val("1.5");
                            }
                            break;
                        case "BFDV":
                            if (datos[i].VALOR == "SI") {
                                $("#txt_fec_emision").attr('disabled', true);
                                //$("#txtFechaPago").attr('disabled', true);//20/02

                            } else {
                                $("#txt_fec_emision").attr('disabled', false);
                                //$("#txtFechaPago").attr('disabled', false);//20/02
                            }
                            break;
                        case "ODON":
                            if (datos[i].VALOR == "SI") {
                                $("#div_chk_donacion").attr("style", "display:none");

                            } else {
                                $("#div_chk_donacion").attr("style", "display:inline");
                            }
                            break;
                        case "VNST":
                            prmtVNST = datos[i].VALOR;
                            break;
                        case "ADET":
                            agregarDetalle = datos[i].VALOR;
                            break;
                        case "ACON":
                            prmtACON = datos[i].VALOR;
                            break;
                        case "CURS":
                            prmtCURS = datos[i].VALOR;
                            break;
                        //case "MIGO":
                        //    token_migo = datos[i].DESCRIPCION_DETALLADA;
                        //    break;
                        //case "GRAN":
                        //    if (datos[i].VALOR == "SI") {
                        //        $("#div_gran_redondeo").attr("style", "display:inline");

                        //    } else {
                        //        $("#div_gran_redondeo").attr("style", "display:none");
                        //    }
                        //    break;
                        //case "CANT":
                        //    if (datos[i].VALOR == "SI") {
                        //        $("#txtStockReal").attr('disabled', true);
                        //    }
                        //    break;
                    }
                }

            }
            else { alertCustom("No se recuperaron correctamente los parámetros!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperaron correctamente los parámetros!");
        }
    });
    //OBTENER PARAMETRO DE DETRACCION
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=DETR",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            if (!isNaN(parseFloat(datos[0].VALOR))) {
    //                $('#hfParamDetraccion').val(datos[0].VALOR);
    //            } else {
    //                infoCustom2("El parámetro de sistema de Detracción(DETR) no es válido. Se considerará como monto requerido 700")
    //                $('#hfParamDetraccion').val("700");
    //            }
    //        }
    //        else { alertCustom("No se recuperó el parámetro de Detracción(DETR) correctamente!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó el parámetro de Detracción(DETR) correctamente!");
    //    }
    //});

    //OBTENER PARAMETRO DE RETENCION
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=RETN",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            if (!isNaN(parseFloat(datos[0].VALOR))) {
    //                $('#hfParamRetencion').val(datos[0].VALOR);
    //            } else {
    //                infoCustom2("El parámetro de sistema de Retención(RETN) no es válido. Se considerará retención 3%")
    //                $('#hfParamRetencion').val("3");
    //            }
    //        }
    //        else { alertCustom("No se recuperó el parámetro de Retención(RETN) correctamente!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó el parámetro de Retención(RETN) correctamente!");
    //    }
    //});
    //OBTENER PARAMETRO DE MONTO REQUERIDO PARA RETENCION
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=RETR",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            if (!isNaN(parseFloat(datos[0].VALOR))) {
    //                $('#hfParamMontoRetencion').val(datos[0].VALOR);
    //            } else {
    //                infoCustom2("El parámetro de sistema de Retención(RETR) no es válido. Se considerará 300")
    //                $('#hfParamMontoRetencion').val("300");
    //            }
    //        }
    //        else {
    //            alertCustom("No se recuperó el parámetro de Monto Requerido para Retención(RETR) correctamente!");
    //        }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó el parámetro de Monto Requerido para Retención(RETR) correctamente!");
    //    }
    //});
    ////OBTENER IMPUESTO GENERAL A LAS VENTAS
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=0021",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            if (!isNaN(parseFloat(datos[0].VALOR))) {
    //                $('#hfIMPUESTO').val(parseFloat(datos[0].VALOR) * 100);
    //            } else {
    //                infoCustom2("El parámetro de Impuesto(0021) no es válido. Se considerará IGV 18%")
    //                $('#hfIMPUESTO').val("18");
    //            }
    //        }
    //        else { alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!");
    //    }
    //});
    
    //OBTENER FACTOR DE IMPUESTO A LA RENTA
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=IMRE",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            if (!isNaN(parseFloat(datos[0].VALOR))) {
    //                $('#hfFactorImpuestoRenta').val(parseFloat(datos[0].VALOR));
    //            } else {
    //                infoCustom2("El parámetro Factor de Impuesto a la Renta Mínimo (IMRE) no es válido. Se considerará Factor Mínimo de 1.5%")
    //                $('#hfFactorImpuestoRenta').val("1.5");
    //            }
    //        }
    //        else { alertCustom("No se recuperó el Factor de Impuesto a la Renta Mínimo correctamente!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó el Factor de Impuesto a la Renta Mínimo correctamente!");
    //    }
    //});

    //OBTENER CANTIDAD DIGITOS EN LA PARTE DECIMAL (PRECIO)
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=DIGP",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            prmtDIGP = datos[0].VALOR;
    //        }
    //        else { alertCustom("No se recuperó correctamente el parámetro DIGP!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó correctamente el parámetro DIGP!");
    //    }
    //});

    //BLOQUEAR CAMPO FECHA DE EMISIÓN EN DOCUMENTO DE VENTA
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=BFDV",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            if (datos[0].VALOR == "SI") {
    //                $("#txt_fec_emision").attr('disabled', true);

    //            } else {
    //                $("#txt_fec_emision").attr('disabled', false);
    //            }
    //        }
    //    },
    //});

    //OCULTAR DONACION
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ODON",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            if (datos[0].VALOR == "SI") {
    //                $("#div_chk_donacion").attr("style", "display:none");

    //            } else {
    //                $("#div_chk_donacion").attr("style", "display:inline");
    //            }
    //        }
    //    },
    //});

    //OBTENER INDICADOR DE VALIDACION AL AGREGDAR DETALLE
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ADET",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            agregarDetalle = datos[0].VALOR;
    //        }
    //        else { alertCustom("No se recuperó el Indicador de Validación de Agregar Detalle correctamente!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó el Indicador de Validación de Agregar Deralle correctamente!");
    //    }
    //});

    //QUE SE GENERE O NO EL ASIENTO CONTABLE
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ACON",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: false,
    //    success: function (datos) {
    //        if (datos != null) {
    //            prmtACON = datos[0].VALOR;
    //        }
    //        else { alertCustom("No se recuperó correctamente el parámetro ACON!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó correctamente el parámetro ACON!");
    //    }
    //});

    //OBTENER CURSOR PARA QUE SE POSICIONE EN EL NOMBRE DEL PRODUCTO
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=CURS",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            prmtCURS = datos[0].VALOR;
    //        }
    //        else { prmtCURS = ""; }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó correctamente el parámetro CURS!");
    //    }
    //});

    //TOKEN PARA PODER HACER LAS CONSULTAS DE LOS N° DE DOCS. A SUNAT
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=MIGO",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            token_migo = datos[0].DESCRIPCION_DETALLADA;
    //        } else {
    //            alertCustom("No se recuperó correctamente el parámetro MIGO!");
    //        }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó correctamente el parámetro MIGO!");
    //    }
    //});

    // CARGAR CLIENTE POR DEFECTO
    //if (ObtenerQueryString("codigo") == undefined) {
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=CLID",
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: true,
    //        success: function (datos) {
    //            if (datos != null) {
    //                if (datos[0].VALOR !== "" || datos[0].VALOR == "0") {

    //                    //cargar el cliente con el valor pidm
    //                    //fillCboDirecciones(datos[0].VALOR);
    //                    //alert("go");
    //                    cargarprederteminado = true;
    //                    fillTxtCliente("#txtClientes", datos[0].VALOR);
    //                    console.log(jsonPredeterminado.PIDM);
    //                } else {
    //                    // QUE CARGUEN TODOS LOS CLIENTES NORMAL  
    //                    fillTxtCliente("#txtClientes", "");
    //                }
    //            }
    //        },
    //    });
    //}
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
            $('#cbo_Sucursal').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cbo_Sucursal').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" data-ubigeo="' + datos[i].UBIGEO + '" >' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $('#cbo_Sucursal').select2('val', $('#ctl00_hddestablecimiento').val());
            $("#cbo_Sucursal").change();
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function fillCboVendedor(ctlg, scsl, estado, bAsync) {
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
            alertCustom("Vendedores no se listaron correctamente.");
        }
    });
}


//Llenar productos
var productos = [];
function filltxtdescproducto(seriado) {
    $('#input_cod_prod').html('<input id="txt_cod_producto" disabled="disabled" class="span6" type="text" style="margin-right: 4px" /><input id="txt_cod_a_producto" class="span6" type="text" style="margin-left:-2px;" placeholder="Código"/>');
    $("#input_desc_prod").html("<input id='txt_desc_producto' class='span12' type='text' placeholder='Nombre' />");

    Bloquear("input_cod_prod");
    Bloquear("input_desc_prod");
    //Bloquear("form_add_prod")
    if ($('#cboAlmacen').val() != null) {
        $.ajax({
            type: "post",
            //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC&CTLG=" + $('#cbo_Empresa').val() + "&ALMC_CODE=" + $('#cboAlmacen').val() + "&SERIADO_IND=" + seriado,
            //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODTODOS&CTLG=" + $('#cbo_Empresa').val() + "&SCSL=" + $('#cbo_Sucursal').val() + "&SERIADO_IND=" + seriado,
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC_CAB&CTLG=" + $('#cbo_Empresa').val() + "&ALMC_CODE=" + $('#cboAlmacen').val() + "&SERIADO_IND=" + seriado,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //Desbloquear("form_add_prod")
                Desbloquear("input_cod_prod");
                Desbloquear("input_desc_prod");
                if (datos != null) {
                    productos = datos;
                    // UPDATER_DESC_PROD
                    var input = $('#txt_desc_producto');
                    input.typeahead({
                        items: 50,
                        source: function (query, process) {
                            array = [];
                            map = {};
                            let oObjet = new Array();

                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].DESC_ADM);

                                var obj = {};
                                obj.DESC_ADM = datos[i].DESC_ADM;
                                obj.CODIGO = datos[i].CODIGO;
                                obj.NOMBRE_COMERCIAL = datos[i].NOMBRE_COMERCIAL;
                                obj.CODIGO_ANTIGUO = datos[i].CODIGO_ANTIGUO;
                                obj.MONEDA = datos[i].MONEDA;
                                obj.UNIDAD = datos[i].UNIDAD;
                                obj.NO_SERIADA = datos[i].NO_SERIADA;
                                obj.SERIADO = datos[i].SERIADA;
                                obj.PRECIO_IND = datos[i].PRECIO_IND;
                                obj.CTLG = datos[i].CTLG;
                                obj.DETRACCION = datos[i].DETRACCION;
                                oObjet.push(obj);
                            }

                            $.each(oObjet, function (i, objeto) {
                                map[objeto.DESC_ADM] = objeto;
                            });
                            process(array);
                        },
                        updater: function (item) {
                            //Bloquear("form_add_prod");
                            if ($("#hfPIDM").val() != "") {
                                $("#txtClientes").attr("disabled", "disabled");
                                $("#txtNroDctoCliente").attr("disabled", "disabled");
                                $("#cboTipoDoc").attr("disabled", "disabled");
                                $("#hfCOD_PROD").val(map[item].CODIGO);
                                $("#hfProdSeriado").val(map[item].SERIADO);
                                $("#hfporcentaje_detraccion").val(map[item].DETRACCION)
                                $("#txt_cod_producto").val($("#hfCOD_PROD").val());
                                $("#txt_cod_a_producto").val(map[item].CODIGO_ANTIGUO);
                                $("#txt_desc_producto").val(map[item].DESC_ADM);
                                fillcboUniMedida(map[item].UNIDAD);
                                $("#cbo_und_medida").select2("destroy");
                                $("#cbo_und_medida").attr("disabled", false);
                                $("#cbo_und_medida").val(map[item].UNIDAD);
                                $("#cbo_und_medida").select2();
                                $("#txt_cantidad").val("");
                                $("#txt_cantidad").focus();
                                $("#hfCodUnd_Producto").val(map[item].UNIDAD);
                                prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPIDM").val());
                                ActualizarCamposPrecios();
                                //---                          
                                $('#txtPrecioUnitario').keyup(function (e) {
                                    var key = e.keyCode ? e.keyCode : e.which;
                                    if (key === 13 && $(this).val() != '') {
                                        $('#txt_glosa_det').focus();
                                    }
                                });
                                //---                            
                                $("#cbo_moneda").attr("disabled", "disabled");
                                //Desbloquear("form_add_prod");
                                return item;

                            } else {
                                //Desbloquear("form_add_prod");
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
                            $("#txtPrecioUnitario").val("0.00");

                            if (detallesVenta.length == 0) {
                                $("#txtClientes").removeAttr("disabled");
                                $("#txtNroDctoCliente").removeAttr("disabled");
                                $("#cboTipoDoc").removeAttr("disabled");
                            }
                            $("#hfCOD_PROD").val("");
                            prodActual = {};
                            if (detallesVenta.length == 0) {
                                $("#cbo_moneda").removeAttr("disabled");
                            }
                        }
                    });

                    var input = $('#txt_cod_a_producto');
                    input.typeahead({
                        items: 50,
                        source: function (query, process) {
                            array = [];
                            map = {};
                            let oObjet = new Array();

                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].CODIGO_ANTIGUO);
                                var obj = {};
                                obj.DESC_ADM = datos[i].DESC_ADM;
                                obj.CODIGO = datos[i].CODIGO;
                                obj.NOMBRE_COMERCIAL = datos[i].NOMBRE_COMERCIAL;
                                obj.CODIGO_ANTIGUO = datos[i].CODIGO_ANTIGUO;
                                obj.MONEDA = datos[i].MONEDA;
                                obj.UNIDAD = datos[i].UNIDAD;
                                obj.NO_SERIADA = datos[i].NO_SERIADA;
                                obj.SERIADO = datos[i].SERIADA;
                                obj.PRECIO_IND = datos[i].PRECIO_IND;
                                obj.CTLG = datos[i].CTLG;
                                obj.DETRACCION = datos[i].DETRACCION;
                                oObjet.push(obj);
                            }

                            $.each(oObjet, function (i, objeto) {
                                map[objeto.CODIGO_ANTIGUO] = objeto;
                            });
                            process(array);
                        },
                        updater: function (item) {
                            //Bloquear("form_add_prod");
                            if ($("#hfPIDM").val() != "") {

                                $("#txtClientes").attr("disabled", "disabled");
                                $("#txtNroDctoCliente").attr("disabled", "disabled");
                                $("#cboTipoDoc").attr("disabled", "disabled");

                                $("#hfCOD_PROD").val(map[item].CODIGO);
                                $("#hfProdSeriado").val(map[item].SERIADO);

                                $("#txt_cod_producto").val($("#hfCOD_PROD").val());
                                //$("#txt_cod_producto").change();
                                $("#txt_desc_producto").val(map[item].DESC_ADM);
                                fillcboUniMedida(map[item].UNIDAD);
                                $("#cbo_und_medida").select2("destroy");
                                $("#cbo_und_medida").attr("disabled", false);
                                $("#cbo_und_medida").val(map[item].UNIDAD);
                                $("#cbo_und_medida").select2();
                                $("#hfporcentaje_detraccion").val(map[item].DETRACCION)
                                $("#txt_cantidad").val("");
                                $("#txt_cantidad").focus();
                                $("#hfCodUnd_Producto").val(map[item].UNIDAD);
                                prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPIDM").val());
                                ActualizarCamposPrecios();
                                //---                            
                                $('#txtPrecioUnitario').keyup(function (e) {
                                    var key = e.keyCode ? e.keyCode : e.which;
                                    if (key === 13 && $(this).val() != '') {
                                        $('#txt_glosa_det').focus();
                                    }
                                });
                                //---
                                $("#cbo_moneda").attr("disabled", "disabled");
                                //Desbloquear("form_add_prod");
                                return item;
                            } else {
                                //Desbloquear("form_add_prod");
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
                            $("#txtPrecioUnitario").val("0.00");

                            if (detallesVenta.length == 0) {
                                $("#txtClientes").removeAttr("disabled");
                                $("#txtNroDctoCliente").removeAttr("disabled");
                                $("#cboTipoDoc").removeAttr("disabled");
                            }
                            $("#hfCOD_PROD").val("");
                            prodActual = {};
                            if (detallesVenta.length == 0) {
                                $("#cbo_moneda").removeAttr("disabled");
                            }
                        }
                    });
                }
            },
            error: function (msg) {
                //Desbloquear("form_add_prod")
                Desbloquear("input_cod_prod");
                Desbloquear("input_desc_prod");
                alert(msg);
            }
        });
    }
}


//function fillcboUniMedida(codUniMed) {
//    $.ajax({
//        type: "post",
//        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LUNPRO&COD_UNI=" + codUniMed,
//        contenttype: "application/json;",
//        datatype: "json",
//        async: false,
//        success: function (datos) {
//            $('#cbo_und_medida').empty();
//            $('#cbo_und_medida').append('<option></option>');
//            if (datos != null) {
//                for (var i = 0; i < datos.length; i++) {
//                    $('#cbo_und_medida').append('<option value="' + datos[i].CODUNI2 + '" equivalencia="' + datos[i].EQUI + '">' + datos[i].UNIDAD_MEDIDA + '</option>');
//                }
//            }
//            $('#cbo_und_medida').select2('val', "");
//        },
//        error: function (msg) {
//            alert(msg);
//        }
//    });
//}

//Actualiza campos para precios 
function ActualizarCamposPrecios() {
    if (prodActual != null && prodActual.length != 0) {
        $("#divPrecioUnitario").html("");
        //La moneda de venta coincide con la moneda del producto
        if (prodActual.MONEDA == $("#cbo_moneda").val()) {
            if (prodActual.PRECIO_IND == "E") {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + prodActual.PRECIO_VENTA + '" onkeyup="return ValidaPrecioEstandar(\'' + prodActual.PRECIO_VENTA + '\',\'' + prodActual.PRECIO_MINIMO + '\')"  onkeypress="return ValidaDecimales(event,this)" />')
                $("#txtPrecioUnitInicio").val(prodActual.PRECIO_VENTA);
            } else if (prodActual.PRECIO_IND == "C") {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" disabled="disabled" />')
                $("#txtPrecioUnitInicio").val(prodActual.PRECIO_VENTA);
            }
            else {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + prodActual.PRECIO_VENTA + '" onkeyup="return ValidaPrecioCliente(\'' + prodActual.PRECIO_VENTA + '\',\'' + prodActual.PRECIO_MINIMO + '\')"  onkeypress="return ValidaDecimales(event,this)" />')
                $("#txtPrecioUnitInicio").val(prodActual.PRECIO_VENTA);
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
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + precioVenta.toFixed(prmtDIGP) + '" onkeyup="return ValidaPrecioEstandar(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this)" />')
                    $("#txtPrecioUnitInicio").val(precioVenta.toFixed(prmtDIGP));
                } else {
                    //Si es igual a la moneda alterna: Convierte a MOBA
                    precioVenta = parseFloat(prodActual.PRECIO_VENTA) * valorCambio;
                    precioMinimo = parseFloat(prodActual.PRECIO_MINIMO) * valorCambio;
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + precioVenta.toFixed(prmtDIGP) + '" onkeyup="return ValidaPrecioEstandar(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this)" />')
                    $("#txtPrecioUnitInicio").val(precioVenta.toFixed(prmtDIGP));
                }
            }
            else if (prodActual.PRECIO_IND == "C") {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" disabled="disabled" />')
            } else {
                // precio por cliente
                if (prodActual.MONEDA == $("#cbo_moneda [data-tipo='MOBA']").val()) {
                    //Si es igual a la moneda base: Convierte a MOAL
                    precioVenta = parseFloat(prodActual.PRECIO_VENTA) / valorCambio;
                    precioMinimo = parseFloat(prodActual.PRECIO_MINIMO) / valorCambio;
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + precioVenta.toFixed(prmtDIGP) + '" onkeyup="return ValidaPrecioCliente(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this)" />')
                    $("#txtPrecioUnitInicio").val(precioVenta.toFixed(prmtDIGP));
                } else {
                    //Si es igual a la moneda alterna: Convierte a MOBA
                    precioVenta = parseFloat(prodActual.PRECIO_VENTA) * valorCambio;
                    precioMinimo = parseFloat(prodActual.PRECIO_MINIMO) * valorCambio;
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + precioVenta.toFixed(prmtDIGP) + '" onkeyup="return ValidaPrecioCliente(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this)" />')
                    $("#txtPrecioUnitInicio").val(precioVenta.toFixed(prmtDIGP));
                }  
            }
        }
    }
}

function ValidaPrecioCliente(venta, min) {
    if (min == "") {
        min = "0";
    } else {
        var c = $("#txtPrecioUnitario").val();
        if ((c.indexOf(".")) > 0) {
            var nroDecimales = c.substring(c.indexOf(".") + 1, c.length).length;
            if (nroDecimales == prmtDIGP) {
                $("#txtPrecioUnitario").val(c.substring(0, c.length - 1));
            }
        }
    }
    $("#txtPrecioUnitario").on("blur", function () {
        if (parseFloat($("#txtPrecioUnitario").val()) < parseFloat(min)) {
            infoCustom2("El valor ingresado no puede ser menor al precio mínimo: " + parseFloat(min).toFixed(prmtDIGP))
            $("#txtPrecioUnitario").val(parseFloat(min).toFixed(prmtDIGP));
        }
    });
    $('#txt_cantidad').keyup();
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
            async: false,
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
            async: false,
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
    //if (asincrono == true) {
    //    Bloquear("divFilaCliente");
    //}
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2&CTLG=" + $("#cbo_Empresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: asincrono,
        success: function (datos) {
            //if (asincrono == true) {
            //    Desbloquear("divFilaCliente");
            //}
            if (datos != null) {
                textclientes = selectRazonSocial.typeahead({
                    items: 20,
                    source: function (query, process) {
                        arrayRazonSocial = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {

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
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);
                        jsonClientes = json;
                        $.each(json, function (i, objeto) {
                            map[objeto.RAZON_SOCIAL] = objeto;
                        });
                        process(arrayRazonSocial);
                    },
                    updater: function (item) {

                        $('#cboDocumentoVenta').removeAttr("disabled");
                        $("#hfPIDM").val(map[item].PIDM);

                        $("#hfAgenteRetencionCliente").val(map[item].AGENTE_RETEN_IND);
                        $("#hfCodigoCategoriaCliente").val(map[item].CODIGO_CATEGORIA);
                        $("#hfCodigoTipoDocumento").val(map[item].CODIGO_TIPO_DOCUMENTO);
                        $("#hfTipoDocumento").val(map[item].TIPO_DOCUMENTO);
                        $("#hfNroDocumento").val(map[item].NRO_DOCUMENTO);
                        $("#hfRUC").val(map[item].RUC);
                        $("#hfDIR").val(map[item].DIRECCION);


                        if (map[item].RUC != "") {
                            $('#cboTipoDoc').select2("val", "6").change();
                            $("#txtNroDctoCliente").val(map[item].RUC);

                        } else {
                            $('#cboTipoDoc').select2("val", map[item].CODIGO_TIPO_DOCUMENTO).change();
                            $("#txtNroDctoCliente").val(map[item].NRO_DOCUMENTO);
                            if (map[item].CODIGO_TIPO_DOCUMENTO === "6") {
                                $("#hfRUC").val(map[item].NRO_DOCUMENTO);
                            }
                        }

                        if ($('#cboTipoDoc').val() == '6') {
                            $("#cboDocumentoVenta option:not([value=0001])").attr("disabled", "disabled");
                            $("#cboDocumentoVenta option[value=0012]").removeAttr("disabled");
                            $("#cboDocumentoVenta option[value=0101]").removeAttr("disabled"); //PARA QUE ESTÉ DESBLOQUEADO LA NOTA DE VENTA O EL NOMBRE QUE LE HAYA PUESTO EL CLIENTE
                            $("#cboDocumentoVenta option[value=0001]").removeAttr("disabled");

                            //var oItems = $('#cboDocumentoVenta option');
                            //for (var i = 0; i < oItems.length; i++) {
                            //    if (oItems[i].value === "0012") {
                            //        $("#cboDocumentoVenta").select2("val", "0012").change();
                            //    } else {
                            //        $("#cboDocumentoVenta").select2("val", "0001").change();
                            //    }
                            //}
                            var oItems = $('#cboDocumentoVenta option');
                            for (var i = 0; i < oItems.length; i++) {
                                if (oItems[i].value != "" && oItems[i].value != "0003") {
                                    if (oItems[i].value === "0012" && $("#txtNroDocVenta").val() == "") {
                                        $("#cboDocumentoVenta").select2("val", "0012").change();
                                    } else if (oItems[i].value === "0001" && $("#txtNroDocVenta").val() == "") {
                                        //if ($('#cboSerieDocVenta').val() == "0001") {//DPORTA
                                        $("#cboDocumentoVenta").select2("val", "0001").change();
                                        //}
                                    } else if (oItems[i].value === "0101" && $("#txtNroDocVenta").val() == "") {
                                        $("#cboDocumentoVenta").select2("val", "0101").change();
                                    }
                                }
                            }
                        } else {
                            $("#cboDocumentoVenta option:not([value=0001])").removeAttr("disabled");
                            $("#cboDocumentoVenta option[value=0001]").attr("disabled", "disabled");

                            //var oItems = $('#cboDocumentoVenta option');
                            //for (var i = 0; i < oItems.length; i++) {
                            //    if (oItems[i].value === "0012") {
                            //        $("#cboDocumentoVenta").select2("val", "0012").change();
                            //    } else {
                            //        $("#cboDocumentoVenta").select2("val", "0003").change();
                            //    }
                            //}
                            var oItems = $('#cboDocumentoVenta option');
                            for (var i = 0; i < oItems.length; i++) {
                                if (oItems[i].value != "" && oItems[i].value != "0001") {
                                    if (oItems[i].value === "0012" && $("#txtNroDocVenta").val() == "") {
                                        $("#cboDocumentoVenta").select2("val", "0012").change();
                                    } else if (oItems[i].value === "0003" && $("#txtNroDocVenta").val() == "") {
                                        //if ($('#cboSerieDocVenta').val() == "0003") {
                                        $("#cboDocumentoVenta").select2("val", "0003").change();
                                        //}
                                    } else if (oItems[i].value === "0101" && $("#txtNroDocVenta").val() == "") {
                                        $("#cboDocumentoVenta").select2("val", "0101").change();
                                    }
                                }
                            }
                        }

                        if (map[item].RUC != "") {
                            $('#cboTipoDoc').select2("val", "6").change();
                            $("#txtNroDctoCliente").val(map[item].RUC);

                        } else {
                            $('#cboTipoDoc').select2("val", map[item].CODIGO_TIPO_DOCUMENTO).change();
                            $("#txtNroDctoCliente").val(map[item].NRO_DOCUMENTO);
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
                        //
                        $('#chk_retencion').prop('disabled', true);
                        $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                        $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                        //Evalua si se aplica retencion
                        if (map[item].AGENTE_RETEN_IND == 'S' && $("#cbo_Empresa :selected").attr("agente-reten-ind") == "N") {//CAMBIO RETENCION
                            $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                            //$('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');
                        }

                        if (map[item].DIAS > 0) {
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
                    if ($("#txtClientes").val().length <= 0) {

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

              
                        $("#hfPIDM").val('');
                        $("#hfAgenteRetencionCliente").val('');
                        $("#hfCodigoCategoriaCliente").val('');
                        $("#hfCodigoTipoDocumento").val('');
                        $("#hfTipoDocumento").val('');
                        $("#hfNroDocumento").val('');
                        $("#hfRUC").val('');
                        $("#hfDIR").val('');
                        $("#hfCreditoDispMoba").val("0");
                    }
                });
            }

            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }

        },
        error: function (msg) {
            alertCustom("Clientes no se listaron correctamente");
            //Desbloquear("divFilaCliente");
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
                            $("#txt_plazo_pago").val(map[item].DIAS);
                            //Cargar modo de pago
                            $("#cbo_modo_pago").select2('val', '0001');
                            $("#cbo_modo_pago").change();

                            if ($("#txt_plazo_pago").val() > 0) {
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
                $("#txt_plazo_pago").val(map[item].DIAS);
                //Cargar modo de pago
                $("#cbo_modo_pago").select2('val', '0001');
                $("#cbo_modo_pago").change();
                if ($("#txt_plazo_pago").val() > 0) {
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
//Agregar Detalle
var detallesVenta = [];
var detallesBonificacion = [];
var detallesMuestra = [];
var contVenta = 0;
var contBoni = 0;
var contMuestra = 0;
var contItem = 0;

function AgregarDetalleVenta() {

    if (!$("#chkBonificacion").is(":checked") && !$("#chkMuestra").is(":checked")) {
        var codeProd = $("#hfCOD_PROD").val();//no varia, es único  
        var codeProdAntiguo = $("#txt_cod_a_producto").val();
        var nomProdVenta = $("#txt_desc_producto").val();
        var cantidad = $("#txt_cantidad").val();
        var unidadMedidaCode = $("#cbo_und_medida :selected").val();
        var unidadMedida = $("#cbo_und_medida :selected").html();
        var precioUnidad = $("#txtPrecioUnitario").val();
        var glosa = $.trim($("#txt_glosa_det").val());

        //Guardar Almacen
        var almacenCode = $("#cboAlmacen :selected").val();
        var almacen = $("#cboAlmacen :selected").html();

        var descuento = parseFloat($("#txt_descuento_det").val()).toFixed(prmtDIGP);
        var unidadMedidaCode_Prod = $("#hfCodUnd_Producto").val();
        let equi = parseFloat($('#cbo_und_medida option:selected').attr('equivalencia'));
        //var prod;
        var objProd = prodActual; //Json Producto
        var factor = calcula_factor_conversion(unidadMedidaCode_Prod, unidadMedidaCode) // factor conversion unidades
        var totalBruto = parseFloat((cantidad / factor) * precioUnidad).toFixed(prmtDIGP);
        var totalNeto = parseFloat(totalBruto - descuento).toFixed(prmtDIGP);
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
        if (continuar) {

            if (objProd != null && typeof objProd != "undefined") {
                if (ValidarProductoAgregado(objProd) < 0) {

                    if ($("#hfProdSeriado").val() == "N" || $("#hfProdSeriado").val() == "S") {
                        contItem = detallesVenta.length + detallesBonificacion.length + detallesMuestra.length;
                        contVenta = detallesVenta.length;
                        var item = contVenta + 1;
                        objProd.ITEM_TABLA = item;
                        objProd.ITEM = contItem +1;
                        objProd.DESC_UNIDAD = unidadMedida;
                        objProd.GLOSA = glosa;
                        objProd.NOMBRE_IMPRESION = nomProdVenta;
                        objProd.MONTO_DESCUENTO = descuento;
                        objProd.CANTIDAD = cantidad;
                        objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                        objProd.PU = precioUnidad;
                        objProd.ALMC = almacenCode;
                        objProd.DESC_ALMC = almacen;
                        objProd.TOTAL_BRUTO = totalBruto;
                        objProd.TOTAL_NETO = totalNeto;//Total neto Incluido IGV
                        objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                        objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;
                        //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)

                        var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                        var detraccion, isc;
                        let tipoDocCode = $("#cboDocumentoVenta").val();//DPORTA SIN-IMPUESTOS
                        //if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') {
                        if (tipoDocCode == '0001') {
                            detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                        } else {
                            detraccion = parseFloat(0) * (totalNeto);
                        }
                        objProd.MONTO_DETRAC = detraccion.toFixed(prmtDIGP);

                        if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(prmtDIGP);

                        } else {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(prmtDIGP);
                        }
                        objProd.TIPO_PRODUCTO = 'N';

                        detallesVenta.push(objProd);


                        //Bloquear edicion
                        $("#cbo_moneda").attr("disabled", "disabled");
                        $("#cbo_uni_medida").attr("disabled", "disabled");
                        $("#cbo_Sucursal").attr("disabled", "disabled");
                        $("#cbo_Empresa").attr("disabled", "disabled");

                        LimpiarCamposDetalle();

                        contVenta = contVenta + 1;

                    } else {
                        alertCustom("Error al agregar detalle.");
                    }
                    var datos = ObtenerTablaDetalles();
                    ListarTablaDetalles(datos);
                } else {
                    alertCustom("El producto ya ha sido agregado.");
                }

            }
            else {
                alertCustom("Error al obtener datos completos de producto.");
            }

            CalcularDetraccion();
            CalcularDatosMonetarios();
            $("#lblImporteCobrar").html($("#txt_monto_total").val());
            console.log(detallesVenta);
            console.log(detallesBonificacion);
        }
    } else if ($("#chkBonificacion").is(":checked")) // DETALLE BONIFICACION
    {
        //alert('Agregar Bonificación');
        var codeProd = $("#hfCOD_PROD").val();//no varia, es único  
        var codeProdAntiguo = $("#txt_cod_a_producto").val();
        var nomProdVenta = $("#txt_desc_producto").val();
        var cantidad = $("#txt_cantidad").val();
        var unidadMedidaCode = $("#cbo_und_medida :selected").val();
        var unidadMedida = $("#cbo_und_medida :selected").html();
        var precioUnidad = $("#txtPrecioUnitario").val();
        // var precioUnidad = 0.00;
        var glosa = $.trim($("#txt_glosa_det").val());
        var descuento = $("#txt_descuento_det").val();

        //var prod;
        var objProd = prodActual; //Json Producto

        var totalBruto = cantidad * 0;
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
        if (continuar) {

            if (objProd != null && typeof objProd != "undefined") {
                if (ValidarProductoAgregadoBonificacion(objProd) < 0) {

                    if ($("#hfProdSeriado").val() == "N" || $("#hfProdSeriado").val() == "S") {
                        contItem = detallesVenta.length + detallesBonificacion.length + detallesMuestra.length;
                        contBoni = detallesBonificacion.length;
                        //console.log(detallesVenta);
                        var item = contBoni + 1;
                        objProd.ITEM_TABLA = item;
                        objProd.ITEM = contItem + 1;
                        objProd.DESC_UNIDAD = unidadMedida;
                        objProd.GLOSA = glosa;
                        objProd.NOMBRE_IMPRESION = nomProdVenta;
                        objProd.MONTO_DESCUENTO = descuento;
                        objProd.CANTIDAD = cantidad;
                        objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                        objProd.PU = precioUnidad;
                        objProd.TOTAL_BRUTO = totalBruto;
                        objProd.TOTAL_NETO = totalNeto;//Total neto Incluido IGV
                        objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                        objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;
                        //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)

                        var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                        var detraccion, isc;
                        let tipoDocCode = $("#cboDocumentoVenta").val();//DPORTA SIN-IMPUESTOS
                        //if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') {
                        if (tipoDocCode == '0001') {
                            detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                        } else {
                            detraccion = parseFloat(0) * (totalNeto);
                        }
                        objProd.MONTO_DETRAC = detraccion.toFixed(prmtDIGP);

                        if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(prmtDIGP);

                        } else {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(prmtDIGP);
                        }
                        objProd.TIPO_PRODUCTO = 'B';
                        detallesBonificacion.push(objProd);


                        //Bloquear edicion
                        $("#cbo_moneda").attr("disabled", "disabled");
                        $("#cbo_uni_medida").attr("disabled", "disabled");
                        $("#cbo_Sucursal").attr("disabled", "disabled");
                        $("#cbo_Empresa").attr("disabled", "disabled");

                        LimpiarCamposDetalle();

                        contBoni = contBoni + 1;

                    } else {
                        alertCustom("Error al agregar detalle.");
                    }
                    var datos = ObtenerTablaDetallesBonificacion();
                    ListarTablaDetallesBonificacion(datos);
                } else {
                    alertCustom("El producto ya ha sido agregado.");
                }

            }
            else {
                alertCustom("Error al obtener datos completos de producto.");
            }
            $("#chkBonificacion").prop('checked', false).parent().removeClass('checked'); 

            CalcularDetraccion();
            CalcularDatosMonetarios();
            $("#lblImporteCobrar").html($("#txt_monto_total").val());            
        }
    } else if ($("#chkMuestra").is(":checked")) // DETALLE BONIFICACION
    {
        //alert('Agregar Muestra');
        var codeProd = $("#hfCOD_PROD").val();//no varia, es único  
        var codeProdAntiguo = $("#txt_cod_a_producto").val();
        var nomProdVenta = $("#txt_desc_producto").val();
        var cantidad = $("#txt_cantidad").val();
        var unidadMedidaCode = $("#cbo_und_medida :selected").val();
        var unidadMedida = $("#cbo_und_medida :selected").html();
        var precioUnidad = $("#txtPrecioUnitario").val();
        // var precioUnidad = 0.00;
        var glosa = $.trim($("#txt_glosa_det").val());
        var descuento = $("#txt_descuento_det").val();

        //var prod;
        var objProd = prodActual; //Json Producto

        var totalBruto = cantidad * 0;
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
        if (continuar) {

            if (objProd != null && typeof objProd != "undefined") {
                if (ValidarProductoAgregadoMuestra(objProd) < 0) {

                    if ($("#hfProdSeriado").val() == "N" || $("#hfProdSeriado").val() == "S") {
                        contItem = detallesVenta.length + detallesBonificacion.length + detallesMuestra.length;
                        contMuestra = detallesMuestra.length;
                        //console.log(detallesVenta);
                        var item = contMuestra + 1;
                        objProd.ITEM_TABLA = item;
                        objProd.ITEM = contItem + 1;
                        objProd.DESC_UNIDAD = unidadMedida;
                        objProd.GLOSA = glosa;
                        objProd.NOMBRE_IMPRESION = nomProdVenta;
                        objProd.MONTO_DESCUENTO = descuento;
                        objProd.CANTIDAD = cantidad;
                        objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                        objProd.PU = precioUnidad;
                        objProd.TOTAL_BRUTO = totalBruto;
                        objProd.TOTAL_NETO = totalNeto;//Total neto Incluido IGV
                        objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                        objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;
                        //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)

                        var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                        var detraccion, isc;
                        let tipoDocCode = $("#cboDocumentoVenta").val();//DPORTA SIN-IMPUESTOS
                        //if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') {
                        if (tipoDocCode == '0001') {
                            detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                        } else {
                            detraccion = parseFloat(0) * (totalNeto);
                        }
                        objProd.MONTO_DETRAC = detraccion.toFixed(prmtDIGP);

                        if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(prmtDIGP);

                        } else {
                            isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                            objProd.MONTO_ISC = isc.toFixed(prmtDIGP);
                        }
                        objProd.TIPO_PRODUCTO = 'M';
                        detallesMuestra.push(objProd);


                        //Bloquear edicion
                        $("#cbo_moneda").attr("disabled", "disabled");
                        $("#cbo_uni_medida").attr("disabled", "disabled");
                        $("#cbo_Sucursal").attr("disabled", "disabled");
                        $("#cbo_Empresa").attr("disabled", "disabled");

                        LimpiarCamposDetalle();

                        contMuestra = contMuestra + 1;

                    } else {
                        alertCustom("Error al agregar detalle.");
                    }
                    var datos = ObtenerTablaDetallesMuestra();
                    ListarTablaDetallesMuestra(datos);
                } else {
                    alertCustom("El producto ya ha sido agregado.");
                }

            }
            else {
                alertCustom("Error al obtener datos completos de producto.");
            }
            $("#chkMuestra").prop('checked', false).parent().removeClass('checked');

            CalcularDetraccion();
            CalcularDatosMonetarios();
            $("#lblImporteCobrar").html($("#txt_monto_total").val());
        }
    }
    //Agregado, no se muestra hasta que se de grabar a la venta
    $("#div_btn_completar").attr("style", "display:none");
}

//Limpiar campos para llenar nuevo producto
function LimpiarCamposDetalle() {
    $("#txt_cod_a_producto").focus();
    $('#txt_cod_a_producto, #txt_cod_producto,#txt_desc_producto').val('');
    $("#cbo_und_medida").select2('destroy');
    $("#cbo_und_medida").val('');
    $("#cbo_und_medida").select2();
    $("#cbo_und_medida").attr("disabled", true);
    $("#txt_cantidad").val('');
    $("#txtPrecioUnitario").val('');
    $("#txt_descuento_det").val('0.00');
    $("#txt_glosa_det").val('');

    $("#hfCOD_PROD").val('');
    prodActual = {};
    if (detallesVenta.length == 0) {
        $("#cbo_moneda").removeAttr("disabled");
        $("#chkDespachoVenta").removeAttr("disabled");
        $("#cbo_Sucursal").removeAttr("disabled");
        $("#cbo_Empresa").removeAttr("disabled");
        $("#txtClientes").removeAttr("disabled");
        $("#txtNroDctoCliente").removeAttr("disabled");
        $("#cboTipoDoc").removeAttr("disabled");
        $("#div_btn_completar").attr("style", "display:none");
        $("#cbo_und_medida").attr("disabled", true);

    }
}

//Obtiene todos los datos de producto, precios, descuento por cliente. Devuelve un json con formato de detalle de venta
function ObtenerProductoCompleto(codeProd, cliePidm) {

    var productoJSON = [];
    var descuentoCliente = 0;
    // OBTENER DESCUENTO
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=6&PROD_CODE=" + codeProd + "&CODIGO_CATEGORIA=" + $("#hfCodigoCategoriaCliente").val() + "&CTLG_CODE=" + $("#cbo_Empresa").val(),
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
        //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD_COTI&PROD_CODE=" + codeProd,
        //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC" +
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC_DET" +
        "&PROD_CODE=" + codeProd +
        "&CTLG=" + $("#cbo_Empresa").val() +
        "&ALMC_CODE=" + $('#cboAlmacen').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null && datos.length != 0) {
                console.log(datos);
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
                prod += '"ALMC":"' + datos[0].ALMC + '",';
                prod += '"DESC_ALMC":"' + datos[0].DESC_ALMC + '",';
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

                //Indicadores/valores otros de producto
                prod += '"SERIADO":"' + datos[0].SERIADA + '",';
                prod += '"CODIGO_SERIADO":"' + datos[0].CODIGO_SERIADO + '",';
                prod += '"CODIGO_BARRAS":"' + datos[0].CODIGO_BARRAS + '",';
                prod += '"PRECIO_IND":"' + datos[0].PRECIO_IND + '",'; //Cantidad - Estandar

                //PRECIO PARA SUCURSALES EXONERADAS
                if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {

                    $("#chk_inc_igv").attr("disabled", "disabled").prop('checked', false).parent().removeClass('checked');
                    var igv = parseFloat($("#hfIMPUESTO").val()) / 100;
                    var precios = ObtenerPrecioProducto(datos[0].CODIGO, datos[0].CTLG, $("#cbo_Sucursal").val(), datos[0].PRECIO_IND);

                    if (datos[0].TIPO_BIEN == "EXO" || datos[0].TIPO_BIEN == "INA") {
                        //NO SE DESCUENTA IGV DE LOS PRECIOS PARA PRODUCTOS EXONERADOS E INAFECTOS
                        if (precios.length > 0) {
                            if (datos[0].PRECIO_IND == "E") {//Precio estandar 
                                prod += '"PRECIO_VENTA":"' + precios[0].PRECIO_VENTA + '",';//E
                                prod += '"PRECIO_MINIMO":"' + precios[0].PRECIO_MINIMO + '",';//E
                                prod += '"RANGOS_PRECIO":[] ,'; //C
                            }
                            else {//Precio por cantidad 
                                prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                                prod += '"PRECIO_MINIMO":"' + "0" + '",';//E  
                                prod += '"RANGOS_PRECIO":' + JSON.stringify(precios) + ','; //C
                            }
                        } else {

                            infoCustom2("No se han definido precios para este producto! </br>Haga <a href='?f=nmmprod&codigo=" + datos[0].CODIGO + "' target='_blank'>click aquí </a> para modificar");

                            prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                            prod += '"PRECIO_MINIMO":"' + "0" + '",';//E                    
                            prod += '"RANGOS_PRECIO":[],'; //C    
                        }
                    }
                    else {
                        //DESCONTAR IGV DE PRODUCTOS GRAVADOS
                        if (precios.length > 0) {
                            if (datos[0].PRECIO_IND == "E") {//Precio estandar 
                                var pVenta = parseFloat(precios[0].PRECIO_VENTA) / (igv + 1);
                                var pMinimo = parseFloat(precios[0].PRECIO_MINIMO) / (igv + 1);
                                prod += '"PRECIO_VENTA":"' + pVenta.toFixed(2) + '",';//E
                                prod += '"PRECIO_MINIMO":"' + pMinimo.toFixed(2) + '",';//E
                                prod += '"RANGOS_PRECIO":[] ,'; //C
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
                            }
                        } else {

                            infoCustom2("No se han definido precios para este producto! </br>Haga <a href='?f=nmmprod&codigo=" + datos[0].CODIGO + "' target='_blank'>click aquí </a> para modificar");

                            prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                            prod += '"PRECIO_MINIMO":"' + "0" + '",';//E                    
                            prod += '"RANGOS_PRECIO":[],'; //C    
                        }
                    }

                } else {
                    //PRECIO PARA SUCURSALES NO EXONERADAS
                    $("#chk_inc_igv").removeAttr("disabled").prop('checked', true).parent().addClass('checked');
                    var precios = ObtenerPrecioProducto(datos[0].CODIGO, datos[0].CTLG, $("#cbo_Sucursal").val(), datos[0].PRECIO_IND, $("#hfPIDM").val());

                    if (precios.length > 0) {
                        if (datos[0].PRECIO_IND == "E") {//Precio estandar 
                            prod += '"PRECIO_VENTA":"' + precios[0].PRECIO_VENTA + '",';//E
                            prod += '"PRECIO_MINIMO":"' + precios[0].PRECIO_MINIMO + '",';//E
                            prod += '"RANGOS_PRECIO":[] ,'; //C

                        } else if (datos[0].PRECIO_IND == "C") { //Precio por cantidad 
                            prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                            prod += '"PRECIO_MINIMO":"' + "0" + '",';//E  
                            prod += '"RANGOS_PRECIO":' + JSON.stringify(precios) + ','; //C
                        }
                        else {
                            prod += '"PRECIO_VENTA":"' + precios[0].PRECIO_VENTA + '",';//L
                            prod += '"PRECIO_MINIMO":"' + precios[0].PRECIO_MINIMO + '",';//L
                            prod += '"RANGOS_PRECIO":[] ,'; //C
                        }
                    } else {

                        infoCustom2("No se han definido precios para este producto! </br>Haga <a href='?f=nmmprod&codigo=" + datos[0].CODIGO + "' target='_blank'>click aquí </a> para modificar");

                        prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                        prod += '"PRECIO_MINIMO":"' + "0" + '",';//E                    
                        prod += '"RANGOS_PRECIO":[],'; //C    
                    }
                }

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

function ObtenerPrecioProducto(codeProd, ctlg, scsl, precioInd, pidmCliente) {
    var precios;
    if (precioInd != "L") {
        pidmCliente = "";
    }
    $.ajax({
        type: "post",
        //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=4&PROD_CODE=" + codeProd + "&CTLG=" + ctlg +
        //    "&PRECIO_IND=" + precioInd +
        //    "&SCSL=" + scsl +
        //    "&ALMC_CODE=" + $("#cbo_Sucursal :selected").attr("data-almc"),
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=4&PROD_CODE=" + codeProd + "&CTLG=" + ctlg +
        "&PRECIO_IND=" + precioInd +
        "&SCSL=" + scsl +
        "&ALMC_CODE=" + $('#cboAlmacen').val() +
        "&PIDM=" + pidmCliente,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            precios = datos;
        },
        error: function (msg) {
            alert(msg);
        }
    });
    return precios;
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

function Delete(item) {
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede eliminar un detalle de un documento ya 'Completado'")
    } else {
        var detallesNuevo = [];
        for (var i = 0; i < detallesVenta.length; i++) {
            if (detallesVenta[i].ITEM_TABLA == item) {
                detallesVenta.splice(i, 1);
            }
        }
        for (var i = 0; i < detallesVenta.length; i++) {
            detallesVenta[i].ITEM_TABLA = i + 1;
            detallesNuevo.push(detallesVenta[i]);
        }

        detallesVenta.splice(0, detallesVenta.length);
        detallesVenta = detallesNuevo;
        var datos = ObtenerTablaDetalles();


        $("#div_tabla_det").attr("style", "display:block");
        //$("#div_btn_completar").attr("style", "display:inline");
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
            $("#txtNroDctoCliente").removeAttr("disabled");
            $("#cboTipoDoc").removeAttr("disabled");

            $("#div_btn_completar").attr("style", "display:none");
            $("#div_btn_add_prods,#divAgregarProducto").attr("style", "display:block");

        } else {
            $("#cbo_moneda").attr("disabled", "disabled");
        }

        CalcularDetraccion();
        CalcularDatosMonetarios();
        $("#lblImporteCobrar").html($("#txt_monto_total").val());

        contVenta = contVenta - 1;
    }
}

function DeleteBonificacion(item) {
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede eliminar un detalle de un documento ya 'Completado'")
    } else {
        var detallesNuevo = [];
        for (var i = 0; i < detallesBonificacion.length; i++) {
            if (detallesBonificacion[i].ITEM_TABLA == item) {
                detallesBonificacion.splice(i, 1);
            }
        }
        for (var i = 0; i < detallesBonificacion.length; i++) {
            detallesBonificacion[i].ITEM_TABLA = i + 1;
            detallesNuevo.push(detallesBonificacion[i]);
        }

        detallesBonificacion.splice(0, detallesBonificacion.length);
        detallesBonificacion = detallesNuevo;
        var datos = ObtenerTablaDetallesBonificacion();


        $("#div_tabla_det_boni").attr("style", "display:block");
        $("#div_btn_completar").attr("style", "display:inline");
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

        contBoni = contBoni - 1;
        //if (detallesBonificacion.length == 0) {
        //    $("#cbo_moneda").removeAttr("disabled");
        //    $("#chkDespachoVenta").removeAttr("disabled");
        //    $("#cbo_Sucursal").removeAttr("disabled");
        //    $("#cbo_Empresa").removeAttr("disabled");
        //    $("#txtClientes").removeAttr("disabled");
        //    $("#chkDespachoVenta").removeAttr("disabled");

        //    $("#div_btn_completar").attr("style", "display:none");
        //    $("#rbRedondeo,#rbDonacion").attr("disabled", "disabled").prop('checked', false).parent().removeClass('checked');

        //    $("#div_btn_add_prods,#divAgregarProducto").attr("style", "display:block");
        //    LimpiarCamposDetalle();
        //} else {
        //    $("#cbo_moneda").attr("disabled", "disabled");
        //}

        //CalcularDetraccion();
        //CalcularDatosMonetarios();
        //$("#lblImporteCobrar").html($("#txt_monto_total").val());
    }
}


function DeleteMuestra(item) {
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede eliminar un detalle de un documento ya 'Completado'")
    } else {
        var detallesNuevo = [];
        for (var i = 0; i < detallesMuestra.length; i++) {
            if (detallesMuestra[i].ITEM_TABLA == item) {
                detallesMuestra.splice(i, 1);
            }
        }
        for (var i = 0; i < detallesMuestra.length; i++) {
            detallesMuestra[i].ITEM_TABLA = i + 1;
            detallesNuevo.push(detallesMuestra[i]);
        }

        detallesMuestra.splice(0, detallesMuestra.length);
        detallesMuestra = detallesNuevo;
        var datos = ObtenerTablaDetallesMuestra();


        $("#div_tabla_det_muestra").attr("style", "display:block");
        $("#div_btn_completar").attr("style", "display:inline");
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

        contMuestra = contMuestra - 1;
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

        if (montoParaDetraccion >= parametroDetraccion) {

            $('#chk_detraccion').prop('checked', true).parent().addClass('checked');
            if ($("#cbo_moneda :selected").attr("data-tipo") == "MOAL") {
                $("#txt_detraccion").val(detraccionMoal.toFixed(2));
            } else {
                $("#txt_detraccion").val(detraccionActual.toFixed(2));
            }

            $("#txt_num_op_detrac,#txt_fec_comp_detrac").prop('disabled', false);
            $('#chk_percepcion, #chk_retencion').prop('checked', false).parent().removeClass('checked');
            $('#txt_Percepcion, #txt_Retencion, #txt_num_comp_percep, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');
            $('#rbsinserie, #rbseriada').prop('disabled', true);
            $('#rbsinserie').prop('checked', true).parent().addClass('checked');
            $('#rbseriada').prop('checked', false).parent().removeClass('checked');
            cargarCuentaDetraccion();
        }
        else {

            if ($("#cbo_Empresa :selected").attr("agente-reten-ind") == "N" && $("#hfAgenteRetencionCliente").val() == "S") {//CAMBIO RETENCION
                $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                //$('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');

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
        var percepcion = 0;
        var retencion = 0;
        var importeCobrar = 0;

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
                        //OP gravada:(GRA / GIS)
                        opGravada += parseFloat(detallesVenta[i].TOTAL_NETO);
                    }
                }
            }
            //FIN RECORRIDO DETALLES

            //IGV(%) igv definido como parametro de sistema
            igv = parseFloat($("#hfIMPUESTO").val());

            //Op Gravada Sin IGV
            var opGravadaSinIGV = opGravada / (igv / 100 + 1); //Ejm. OpGrav/1.18   

            //IGV calculado de la operacion gravada sin IGV
            igvCalc = opGravadaSinIGV * (parseFloat(igv) / 100);

            baseImponible += opExonerada + opInafecta + opGravadaSinIGV

            importeTotal = baseImponible + igvCalc;

            //Retención (Parametro:RETN): Si el cliente es agente de retención no aplica, si somos agentes de retención y ellos no, sí se aplica retención: 
            var parametroRetencion = parseFloat($("#hfParamRetencion").val()) / 100;

            if ($("#cbo_Empresa :selected").attr("agente-reten-ind") == "N" && $("#hfAgenteRetencionCliente").val() == "S") {//CAMBIO RETENCION
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
                        //$('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false);
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
        $("#txt_monto_total").val(importeCobrar.toFixed(2));

        if ($.trim($("#txt_detraccion").val()) == "") {
            $("#txt_detraccion").val("0.00");
        }
    }
}

// VALIDACIONES 

function ValidarProductoAgregado(obj) { //DPORTA

    if (agregarDetalle == "SI") {
        for (var i = 0; i < detallesVenta.length; i++) {
            if (detallesVenta[i].GLOSA == obj.DESC_ADM) {
                //if (detallesVenta[i].ALMC == obj.ALMC) {
                return i;
                //}
            }
        }
        return -1;
    } if (agregarDetalle == "NO") {
        for (var i = 0; i < detallesVenta.length; i++) {
            if (detallesVenta[i].CODIGO == obj.CODIGO) {
                if (detallesVenta[i].ALMC == obj.ALMC) {
                    return i;
                }
            }
        }
        return -1;
    }
}

function ValidarProductoAgregadoBonificacion(obj) {
    //for (var i = 0; i < detallesBonificacion.length; i++) {
    //    if (detallesBonificacion[i].CODIGO == obj.CODIGO) {
    //        return i;
    //    }
    //}
    //return -1;
    if (agregarDetalle == "SI") {
        for (var i = 0; i < detallesBonificacion.length; i++) {
            if (detallesBonificacion[i].GLOSA == obj.DESC_ADM) {
                //if (detallesVenta[i].ALMC == obj.ALMC) {
                return i;
                //}
            }
        }
        return -1;
    } if (agregarDetalle == "NO") {
        for (var i = 0; i < detallesBonificacion.length; i++) {
            if (detallesBonificacion[i].CODIGO == obj.CODIGO) {
                if (detallesBonificacion[i].ALMC == obj.ALMC) {
                    return i;
                }
            }
        }
        return -1;
    }
}

function ValidarProductoAgregadoMuestra(obj) {
    //for (var i = 0; i < detallesMuestra.length; i++) {
    //    if (detallesMuestra[i].CODIGO == obj.CODIGO) {
    //        return i;
    //    }
    //}
    //return -1;
    if (agregarDetalle == "SI") {
        for (var i = 0; i < detallesMuestra.length; i++) {
            if (detallesMuestra[i].GLOSA == obj.DESC_ADM) {
                //if (detallesVenta[i].ALMC == obj.ALMC) {
                return i;
                //}
            }
        }
        return -1;
    } if (agregarDetalle == "NO") {
        for (var i = 0; i < detallesMuestra.length; i++) {
            if (detallesMuestra[i].CODIGO == obj.CODIGO) {
                if (detallesMuestra[i].ALMC == obj.ALMC) {
                    return i;
                }
            }
        }
        return -1;
    }
}

function ValidaPrecioEstandar(venta, min) {
    if (min == "") {
        min = "0";
    } else {
        var c = $("#txtPrecioUnitario").val();
        if ((c.indexOf(".")) > 0) {
            var nroDecimales = c.substring(c.indexOf(".") + 1, c.length).length;
            if (nroDecimales == prmtDIGP) {
                $("#txtPrecioUnitario").val(c.substring(0, c.length - 1));
            }
        }
    }
    $("#txtPrecioUnitario").on("blur", function () {
        if (parseFloat($("#txtPrecioUnitario").val()) < parseFloat(min)) {
            infoCustom2("El valor ingresado no puede ser menor al precio mínimo: " + parseFloat(min).toFixed(prmtDIGP))
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
                    for (var i = pLength - 1 ; i >= 0 ; i--) {
                        if (parseFloat($("#txt_cantidad").val()) >= prodActual.RANGOS_PRECIO[i].RANGO) {
                            $("#txtPrecioUnitario").val(prodActual.RANGOS_PRECIO[i].PRECIO)
                            break;
                        }
                    }

                    if ($("#txtPrecioUnitario").val() == "" || parseFloat($("#txt_cantidad").val()) < prodActual.RANGOS_PRECIO[0].RANGO) {
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
                        for (var i = pLength - 1 ; i >= 0; i--) {

                            if (parseFloat($("#txt_cantidad").val()) >= parseFloat(prodActual.RANGOS_PRECIO[i].RANGO)) {

                                precio = parseFloat(prodActual.RANGOS_PRECIO[i].PRECIO) / valorCambio;
                                $("#txtPrecioUnitario").val(precio.toFixed(prmtDIGP));
                                break;
                            }
                        }

                        if ($("#txtPrecioUnitario").val() == "" || parseFloat($("#txt_cantidad").val()) < prodActual.RANGOS_PRECIO[0].RANGO) {

                            precio = parseFloat(prodActual.RANGOS_PRECIO[0].PRECIO) / valorCambio;
                            $("#txtPrecioUnitario").val(precio.toFixed(prmtDIGP));

                        }
                    }
                    else {
                        //Si es moneda alterna: convertir a MOBA
                        var pLength = prodActual.RANGOS_PRECIO.length;
                        for (var i = pLength - 1; i >= 0; i--) {

                            if (parseFloat($("#txt_cantidad").val()) >= parseFloat(prodActual.RANGOS_PRECIO[i].RANGO)) {

                                precio = parseFloat(prodActual.RANGOS_PRECIO[i].PRECIO) * valorCambio;
                                $("#txtPrecioUnitario").val(precio.toFixed(prmtDIGP));
                                break;

                            }
                        }

                        if ($("#txtPrecioUnitario").val() == "" || parseFloat($("#txt_cantidad").val()) < prodActual.RANGOS_PRECIO[0].RANGO) {

                            precio = parseFloat(prodActual.RANGOS_PRECIO[0].PRECIO) * valorCambio;
                            $("#txtPrecioUnitario").val(precio.toFixed(prmtDIGP));

                        }

                    }

                }


            } else {
                $("#txtPrecioUnitario").val("0.00")
            }
        }
    }
}

// MANTENIMIENTO DE COTIZACION----------------------------------

function GrabarDctoVenta() {

    CalcularDatosMonetarios();
    //Validaciones iniciales antes de guardado
    var continuar = false;

    if (vErrors(['cboDocumentoVenta', 'cboVendedor', 'txtClientes', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'txt_valor_cambio_Oficial', 'txt_valor_cambio', 'txtFechaVigencia', 'txtDiasVigencia'])) {
        continuar = true;
    }

    if ($("#chkResponsablePago").is(":checked")) {
        if ($("#hfResponsablePagoPIDM").val() == "") {
            $("#txtResponsablePago").val("");
            $("#txtClientes").keyup().siblings("ul").children("li").click();
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

    //Fin validaciones iniciales
    if (continuar) {
        var valorCambio = parseFloat($("#txt_valor_cambio").val());
        var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());
        if (detallesVenta.length != 0) {
            var detalles = "";
            var detallesBoni = "";
            var detallesMues = "";
            //Bloquear("ventana");
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

                    detallesVenta[i].TIPO_PRODUCTO + ";" +
                    detallesVenta[i].SERIADO + ";" +
                    detallesVenta[i].ALMC +
                    "|";
                }

                for (var i = 0; i < detallesBonificacion.length; i++) {
                    detallesBoni += ValidaCaracter(detallesBonificacion[i].ITEM) + ";" +
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
                        detallesBonificacion[i].TIPO_PRODUCTO + ";" +
                        detallesBonificacion[i].SERIADO +
                        "|";
                }

                for (var i = 0; i < detallesMuestra.length; i++) {
                    detallesMues += ValidaCaracter(detallesMuestra[i].ITEM) + ";" +
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
                        detallesMuestra[i].TIPO_PRODUCTO + ";" +
                        detallesMuestra[i].SERIADO +
                        "|";
                }

            } else {
                //Si los valores estan en MonedaAlterna
                for (var i = 0; i < detallesVenta.length; i++) {
                    detalles += detallesVenta[i].ITEM + ";" +
                        detallesVenta[i].CODIGO + ";" +
                        detallesVenta[i].NOMBRE_IMPRESION + ";" +
                        detallesVenta[i].CODE_UNIDAD + ";" +
                        detallesVenta[i].CANTIDAD + ";" +
                        (parseFloat(detallesVenta[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                        //10
                        detallesVenta[i].GLOSA + ";" +
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
                        detallesVenta[i].TIPO_PRODUCTO + ";" +
                        detallesVenta[i].SERIADO + ";" +
                        detallesVenta[i].ALMC +
                        "|";
                }

                for (var i = 0; i < detallesBonificacion.length; i++) {
                    detallesBoni += detallesBonificacion[i].ITEM + ";" +
                        detallesBonificacion[i].CODIGO + ";" +
                        detallesBonificacion[i].NOMBRE_IMPRESION + ";" +
                        detallesBonificacion[i].CODE_UNIDAD + ";" +
                        detallesBonificacion[i].CANTIDAD + ";" +
                        (parseFloat(detallesBonificacion[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                        //10
                        detallesBonificacion[i].GLOSA + ";" +
                        detallesBonificacion[i].TIPO_BIEN + ";" +
                        detallesBonificacion[i].PRECIO_IND + ";" +
                        //Montos convertidos:
                        (parseFloat(detallesBonificacion[i].MONTO_ISC)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DETRAC)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].PRECIO_DETALLE)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DESCUENTO)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].TOTAL_NETO)).toFixed(2) + ";" +
                        detallesBonificacion[i].CTAS_CODE + ";" +
                        detallesBonificacion[i].CECO_CODE + ";" +
                        //20
                        detallesBonificacion[i].ALMACENABLE + ";" +
                        detallesBonificacion[i].TIPO_PROD + ";" +
                        detallesBonificacion[i].TIPO_PRODUCTO + ";" +
                        detallesBonificacion[i].SERIADO +
                        "|";
                }

                for (var i = 0; i < detallesMuestra.length; i++) {
                    detallesMues += ValidaCaracter(detallesMuestra[i].ITEM) + ";" +
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
                        detallesMuestra[i].TIPO_PRODUCTO + ";" +
                        detallesMuestra[i].SERIADO +
                        "|";
                }

            }

            var data = new FormData();
            data.append('p_NUM_SERIE', $("#txtSerieCotizacion").val());
            data.append('p_NUM_DCTO', $("#txtNroCotizacion").val());
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

            data.append('p_IMPORTE_DETRACCION', $("#txt_detraccion").val());
            data.append("p_IMPORTE_RETENCION", $("#txt_Retencion").val());
            data.append('p_IMPORTE_PERCEPCION', $("#txt_Percepcion").val());
            data.append('p_IMPORTE_OTROS', "0");
            data.append('p_MOPA_CODE', $("#cbo_modo_pago").val());
            // data.append('p_FOPA_CODE', '');
            data.append('p_CLIE_PIDM', $("#hfPIDM").val());
            data.append('p_CLIE_DOID', $("#cboTipoDoc").val());
            data.append('p_USVE_USUA_ID', $("#cboVendedor").val());
            data.append('p_COMPLETO_IND', "N");

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
            data.append('p_COD_AUT', $('#txtCodigoAutorizacion').val());
            data.append('p_PCTJ_IGV', $("#hfIMPUESTO").val());
            var ir = ((parseFloat($("#hfFactorImpuestoRentaVenta").val()) / 100) * parseFloat($('#txt_monto_total').val())).toFixed(4);
            data.append('p_FACTOR_RENTA', $("#hfFactorImpuestoRentaVenta").val());
            data.append('p_IMPUESTO_RENTA', ir);
            data.append('p_RESP_PIDM', $("#hfResponsablePagoPIDM").val());
            data.append('p_DETALLES', detalles);
            data.append('p_DETALLES_BONIFICACION', detallesBoni);
            data.append('p_DETALLES_MUESTRA', detallesMues);

            data.append('p_FECHA_VIGENCIA', $("#txtFechaVigencia").val());
            data.append('p_DIAS_VIGENCIA', $("#txtDiasVigencia").val());

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=5",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
           .success(function (datos) {
               if (datos != null) {
                   if (typeof datos[0].CODIGO != "undefined" && datos[0].CODIGO != 'ERROR') {
                       if (datos[0].CODIGO != 'LIMITE') {

                           exito();
                           $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                           $("#grabar").attr("href", "javascript:ActualizarDctoVenta();");
                           $("#txtNumDctoComp").val(datos[0].CODIGO);
                           $("#div_btn_completar").attr("style", "display:inline");
                           $('.buscar, .add, .remove').css('display', 'none');
                           $('#cbo_Empresa').attr('disabled', 'disabled');
                           $("#btnBuscarDctoOrigen").attr("style", "display:inline:block;");
                       }
                       else {
                           alertCustom("Se ha excedido el límite de los documentos autorizados. Intente utilizar otra serie o refrescar la página");
                       }
                   }
                   else {
                       noexito();
                   }
               } else {
                   noexito();
               }
               //Desbloquear("ventana");
           })
           .error(function () {
               noexito();
               //Desbloquear("ventana");
           });

        } else {
            alertCustom("Ingrese almenos 1 detalle!");
        }
    }
}

function GrabarCompletarDctoVenta() {
    /*
   - Esta función modifica y completa el documento si ya ha sido grabado previamente, o inserta un nuevo documento en caso
   el documento no aún no esté grabado   
   */
    if ($("#txtNumDctoComp").val() == "") {//INSERTA
        CalcularDatosMonetarios();
        //Validaciones iniciales antes de guardado
        var continuar = false;

        if (vErrors(['cboDocumentoVenta', 'cboVendedor', 'txtClientes', 'cboDocumentoVenta', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'txt_valor_cambio_Oficial', 'txt_valor_cambio', 'txtSerieCotizacion', 'txtNroCotizacion', 'txtFechaVigencia', 'txtDiasVigencia'])) {
            continuar = true;
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

        //Fin validaciones iniciales

        if (continuar) {

            var valorCambio = parseFloat($("#txt_valor_cambio").val());
            var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());
            if (detallesVenta.length != 0 || detallesBonificacion.length != 0 || detallesMues !=0) {
                Bloquear("ventana");
                var detalles = "";
                var detallesBoni = "";
                var detallesMues = "";
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
                        detallesVenta[i].TIPO_PRODUCTO + ";" +
                        detallesVenta[i].SERIADO + ";" +
                        detallesVenta[i].ALMC +
                        "|";
                    }

                    for (var i = 0; i < detallesBonificacion.length; i++) {
                        detallesBoni += ValidaCaracter(detallesBonificacion[i].ITEM) + ";" +
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
                            detallesBonificacion[i].TIPO_PRODUCTO + ";" +
                            detallesBonificacion[i].SERIADO +
                            "|";
                    }

                    for (var i = 0; i < detallesMuestra.length; i++) {
                        detallesMues += ValidaCaracter(detallesMuestra[i].ITEM) + ";" +
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
                            detallesMuestra[i].TIPO_PRODUCTO + ";" +
                            detallesMuestra[i].SERIADO +
                            "|";
                    }


                } else {
                    //Si los valores estan en MonedaAlterna
                    for (var i = 0; i < detallesVenta.length; i++) {
                        detalles += detallesVenta[i].ITEM + ";" +
                        detallesVenta[i].CODIGO + ";" +
                        detallesVenta[i].NOMBRE_IMPRESION + ";" +
                        detallesVenta[i].CODE_UNIDAD + ";" +
                        detallesVenta[i].CANTIDAD + ";" +
                        (parseFloat(detallesVenta[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                        //10
                        detallesVenta[i].GLOSA + ";" +
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
                        detallesVenta[i].TIPO_PRODUCTO + ";" +
                        detallesVenta[i].SERIADO + ";" +
                        detallesVenta[i].ALMC +
                        "|";
                    }

                    for (var i = 0; i < detallesBonificacion.length; i++) {
                        detallesBoni += detallesBonificacion[i].ITEM + ";" +
                            detallesBonificacion[i].CODIGO + ";" +
                            detallesBonificacion[i].NOMBRE_IMPRESION + ";" +
                            detallesBonificacion[i].CODE_UNIDAD + ";" +
                            detallesBonificacion[i].CANTIDAD + ";" +
                            (parseFloat(detallesBonificacion[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                            //10
                            detallesBonificacion[i].GLOSA + ";" +
                            detallesBonificacion[i].TIPO_BIEN + ";" +
                            detallesBonificacion[i].PRECIO_IND + ";" +
                            //Montos convertidos:
                            (parseFloat(detallesBonificacion[i].MONTO_ISC)).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].MONTO_DETRAC)).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].PRECIO_DETALLE)).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].MONTO_DESCUENTO)).toFixed(2) + ";" +
                            (parseFloat(detallesBonificacion[i].TOTAL_NETO)).toFixed(2) + ";" +
                            detallesBonificacion[i].CTAS_CODE + ";" +
                            detallesBonificacion[i].CECO_CODE + ";" +
                            //20
                            detallesBonificacion[i].ALMACENABLE + ";" +
                            detallesBonificacion[i].TIPO_PROD + ";" +
                            detallesBonificacion[i].TIPO_PRODUCTO + ";" +
                            detallesBonificacion[i].SERIADO +
                            "|";
                    }

                    for (var i = 0; i < detallesMuestra.length; i++) {
                        detallesMues += ValidaCaracter(detallesMuestra[i].ITEM) + ";" +
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
                            detallesMuestra[i].TIPO_PRODUCTO + ";" +
                            detallesMuestra[i].SERIADO +
                            "|";
                    }
                }

                var data = new FormData();
                data.append('p_NUM_SERIE', $("#txtSerieCotizacion").val());
                data.append('p_NUM_DCTO', $("#txtNroCotizacion").val());
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
                data.append('p_COD_AUT', $('#txtCodigoAutorizacion').val());
                data.append('p_PCTJ_IGV', $("#hfIMPUESTO").val());
                var ir = ((parseFloat($("#hfFactorImpuestoRentaVenta").val()) / 100) * parseFloat($('#txt_monto_total').val())).toFixed(4);
                data.append('p_FACTOR_RENTA', $("#hfFactorImpuestoRentaVenta").val());
                data.append('p_IMPUESTO_RENTA', ir);
                data.append('p_RESP_PIDM', $("#hfResponsablePagoPIDM").val());
                data.append('p_DETALLES', detalles);
                data.append('p_DETALLES_BONIFICACION', detallesBoni);
                data.append('p_DETALLES_MUESTRA', detallesMues);

                data.append('p_FECHA_VIGENCIA', $("#txtFechaVigencia").val());
                data.append('p_DIAS_VIGENCIA', $("#txtDiasVigencia").val());

                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=5",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                })
               .success(function (datos) {
                   if (datos != null) {
                       if (typeof datos[0].CODIGO != "undefined" && datos[0].CODIGO != 'ERROR') {
                           if (datos[0].CODIGO != 'LIMITE') {
                               exito();
                               //COMPLETAR
                               $("#hfCompletoInd").val("S")
                               $("#grabar").attr("href", "javascript:ActualizarDctoVenta();");
                               $("#divBtnsMantenimiento").attr("style", "display:none");
                               $("#div_btn_completar").attr("style", "display:inline");
                               $("#btnImprimir").attr("style", "display:inline-block;margin-top:2px;");
                               $("#txtNumDctoComp").val(datos[0].CODIGO);
                               BloquearCampos();
                           }
                           else {
                               alertCustom("Se ha excedido el límite de los documentos autorizados. Intente utilizar otra serie o refrescar la página");
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
               });

            } else {
                alertCustom("Ingrese almenos 1 detalle!");
            }
        }
    } else {//MODIFICA
        CompletarDctoVenta();
    }
}

function ActualizarDctoVenta() {
    CalcularDatosMonetarios();
    //Validaciones iniciales antes de guardado
    var continuar = false;

    if (vErrors(['cboDocumentoVenta', 'cboVendedor', 'txtClientes', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'txt_valor_cambio_Oficial', 'txt_valor_cambio', 'txtFechaVigencia', 'txtDiasVigencia'])) {
        continuar = true;
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

    //Fin validaciones iniciales
    if (continuar) {

        var valorCambio = parseFloat($("#txt_valor_cambio").val());
        var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());
        if (detallesVenta.length != 0) {
            Bloquear("ventana");
            var detalles = "";
            var detallesBoni = "";
            var detallesMues = "";
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
                        detallesVenta[i].TIPO_PRODUCTO + ";" +
                        detallesVenta[i].SERIADO + ";" +
                        detallesVenta[i].ALMC +
                        "|";
                }
                for (var i = 0; i < detallesBonificacion.length; i++) {
                    detallesBoni += ValidaCaracter(detallesBonificacion[i].ITEM) + ";" +
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
                        detallesBonificacion[i].TIPO_PRODUCTO + ";" +
                        detallesBonificacion[i].SERIADO +
                        "|";
                }

                for (var i = 0; i < detallesMuestra.length; i++) {
                    detallesMues += ValidaCaracter(detallesMuestra[i].ITEM) + ";" +
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
                        detallesMuestra[i].TIPO_PRODUCTO + ";" +
                        detallesMuestra[i].SERIADO +
                        "|";
                }

            } else {
                //Si los valores estan en MonedaAlterna
                for (var i = 0; i < detallesVenta.length; i++) {
                    detalles += detallesVenta[i].ITEM + ";" +
                        detallesVenta[i].CODIGO + ";" +
                        detallesVenta[i].NOMBRE_IMPRESION + ";" +
                        detallesVenta[i].CODE_UNIDAD + ";" +
                        detallesVenta[i].CANTIDAD + ";" +
                        (parseFloat(detallesVenta[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                        //10
                        detallesVenta[i].GLOSA + ";" +
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
                        detallesVenta[i].TIPO_PRODUCTO + ";" +
                        detallesVenta[i].SERIADO + ";" +
                        detallesVenta[i].ALMC +
                        "|";
                }

                for (var i = 0; i < detallesBonificacion.length; i++) {
                    detallesBoni += ValidaCaracter(detallesBonificacion[i].ITEM) + ";" +
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
                        detallesBonificacion[i].TIPO_PRODUCTO + ";" +
                        detallesBonificacion[i].SERIADO +
                        "|";
                }

                for (var i = 0; i < detallesMuestra.length; i++) {
                    detallesMues += ValidaCaracter(detallesMuestra[i].ITEM) + ";" +
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
                        detallesMuestra[i].TIPO_PRODUCTO + ";" +
                        detallesMuestra[i].SERIADO +
                        "|";
                }
            }

            var data = new FormData();
            data.append('p_CODE', $("#txtNumDctoComp").val());
            data.append('p_NUM_SERIE', $("#txtSerieCotizacion").val());
            data.append('p_NUM_DCTO', $("#txtNroCotizacion").val());
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

            data.append('p_IMPORTE_DETRACCION', $("#txt_detraccion").val());
            data.append("p_IMPORTE_RETENCION", $("#txt_Retencion").val());
            data.append('p_IMPORTE_PERCEPCION', $("#txt_Percepcion").val());
            data.append('p_IMPORTE_OTROS', "0");
            data.append('p_MOPA_CODE', $("#cbo_modo_pago").val());
            // data.append('p_FOPA_CODE', '');
            data.append('p_CLIE_PIDM', $("#hfPIDM").val());
            data.append('p_CLIE_DOID', $("#cboTipoDoc").val());
            data.append('p_USVE_USUA_ID', $("#cboVendedor").val());
            data.append('p_COMPLETO_IND', "N");

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
            data.append('p_COD_AUT', $('#txtCodigoAutorizacion').val());
            data.append('p_PCTJ_IGV', $("#hfIMPUESTO").val());
            var ir = ((parseFloat($("#hfFactorImpuestoRentaVenta").val()) / 100) * parseFloat($('#txt_monto_total').val())).toFixed(4);
            data.append('p_FACTOR_RENTA', $("#hfFactorImpuestoRentaVenta").val());
            data.append('p_IMPUESTO_RENTA', ir);
            data.append('p_RESP_PIDM', $("#hfResponsablePagoPIDM").val());
            data.append('p_DETALLES', detalles);
            data.append('p_DETALLES_BONIFICACION', detallesBoni);
            data.append('p_DETALLES_MUESTRA', detallesMues);

            data.append('p_FECHA_VIGENCIA', $("#txtFechaVigencia").val());
            data.append('p_DIAS_VIGENCIA', $("#txtDiasVigencia").val());

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=7",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
           .success(function (datos) {
               if (datos != null) {
                   if (typeof datos[0].CODIGO != "undefined" && datos[0].CODIGO != 'ERROR') {
                       if (datos[0].CODIGO != 'LIMITE') {

                           exito();
                           $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                           $("#grabar").attr("href", "javascript:ActualizarDctoVenta();");
                           $("#txtNumDctoComp").val(datos[0].CODIGO);
                           $("#txtNumSec").val(datos[0].SECUENCIA);
                           $('#cbo_Empresa').attr('disabled', 'disabled');
                           $('.buscar, .add, .remove').css('display', 'none');
                           $("#div_btn_completar").attr("style", "display:inline");
                       }
                       else {
                           alertCustom("Se ha excedido el límite de los documentos autorizados. Intente utilizar otra serie o refrescar la página");
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
           });
        } else {
            alertCustom("Ingrese almenos 1 detalle!");
        }
    }
}

function CompletarDctoVenta() {
    //Completa un documento que ha sido grabado anteriormente
    CalcularDatosMonetarios();
    //Validaciones iniciales antes de guardado
    var continuar = false;

    if (vErrors(['cboDocumentoVenta', 'cboVendedor', 'txtClientes', 'cboDocumentoVenta', 'cbo_Empresa', 'txtNroDctoCliente', 'cbo_Sucursal', 'txt_valor_cambio_Oficial', 'txt_valor_cambio', 'txtSerieCotizacion', 'txtNroCotizacion', 'txtFechaVigencia', 'txtDiasVigencia'])) {
        continuar = true;
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


    //Fin validaciones iniciales

    if (continuar) {
        var valorCambio = parseFloat($("#txt_valor_cambio").val());
        var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());
        if (detallesVenta.length != 0) {
            var detalles = "";
            var detallesBoni = "";
            var detallesMues = "";
            Bloquear("ventana");
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
                    detallesVenta[i].TIPO_PRODUCTO + ";" +
                    detallesVenta[i].SERIADO + ";" +
                    detallesVenta[i].ALMC +
                    "|";
                }

                for (var i = 0; i < detallesBonificacion.length; i++) {
                    detallesBoni += detallesBonificacion[i].ITEM + ";" +
                        detallesBonificacion[i].CODIGO + ";" +
                        detallesBonificacion[i].NOMBRE_IMPRESION + ";" +
                        detallesBonificacion[i].CODE_UNIDAD + ";" +
                        detallesBonificacion[i].CANTIDAD + ";" +
                        (parseFloat(detallesBonificacion[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                        //10
                        detallesBonificacion[i].GLOSA + ";" +
                        detallesBonificacion[i].TIPO_BIEN + ";" +
                        detallesBonificacion[i].PRECIO_IND + ";" +
                        //Montos convertidos:
                        (parseFloat(detallesBonificacion[i].MONTO_ISC)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DETRAC)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].PRECIO_DETALLE)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DESCUENTO)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].TOTAL_NETO)).toFixed(2) + ";" +
                        detallesBonificacion[i].CTAS_CODE + ";" +
                        detallesBonificacion[i].CECO_CODE + ";" +
                        //20
                        detallesBonificacion[i].ALMACENABLE + ";" +
                        detallesBonificacion[i].TIPO_PROD + ";" +
                        detallesBonificacion[i].TIPO_PRODUCTO + ";" +
                        detallesBonificacion[i].SERIADO +
                        "|";
                }

                for (var i = 0; i < detallesMuestra.length; i++) {
                    detallesMues += ValidaCaracter(detallesMuestra[i].ITEM) + ";" +
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
                        detallesMuestra[i].TIPO_PRODUCTO + ";" +
                        detallesMuestra[i].SERIADO +
                        "|";
                }

            } else {
                //Si los valores estan en MonedaAlterna
                for (var i = 0; i < detallesVenta.length; i++) {
                    detalles += detallesVenta[i].ITEM + ";" +
                        detallesVenta[i].CODIGO + ";" +
                        detallesVenta[i].NOMBRE_IMPRESION + ";" +
                        detallesVenta[i].CODE_UNIDAD + ";" +
                        detallesVenta[i].CANTIDAD + ";" +
                        (parseFloat(detallesVenta[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                        //10
                        detallesVenta[i].GLOSA + ";" +
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
                        detallesVenta[i].TIPO_PRODUCTO + ";" +
                        detallesVenta[i].SERIADO + ";" +
                        detallesVenta[i].ALMC +
                        "|";
                }

                for (var i = 0; i < detallesBonificacion.length; i++) {
                    detallesBoni += detallesBonificacion[i].ITEM + ";" +
                        detallesBonificacion[i].CODIGO + ";" +
                        detallesBonificacion[i].NOMBRE_IMPRESION + ";" +
                        detallesBonificacion[i].CODE_UNIDAD + ";" +
                        detallesBonificacion[i].CANTIDAD + ";" +
                        (parseFloat(detallesBonificacion[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                        //10
                        detallesBonificacion[i].GLOSA + ";" +
                        detallesBonificacion[i].TIPO_BIEN + ";" +
                        detallesBonificacion[i].PRECIO_IND + ";" +
                        //Montos convertidos:
                        (parseFloat(detallesBonificacion[i].MONTO_ISC)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DETRAC)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].PRECIO_DETALLE)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DESCUENTO)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].TOTAL_NETO)).toFixed(2) + ";" +
                        detallesBonificacion[i].CTAS_CODE + ";" +
                        detallesBonificacion[i].CECO_CODE + ";" +
                        //20
                        detallesBonificacion[i].ALMACENABLE + ";" +
                        detallesBonificacion[i].TIPO_PROD + ";" +
                        detallesBonificacion[i].TIPO_PRODUCTO + ";" +
                        detallesBonificacion[i].SERIADO +
                        "|";
                }

                for (var i = 0; i < detallesMuestra.length; i++) {
                    detallesMues += ValidaCaracter(detallesMuestra[i].ITEM) + ";" +
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
                        detallesMuestra[i].TIPO_PRODUCTO + ";" +
                        detallesMuestra[i].SERIADO +
                        "|";
                }
            }

            var data = new FormData();
            data.append('p_CODE', $("#txtNumDctoComp").val());
            data.append('p_NUM_SERIE', $("#txtSerieCotizacion").val());
            data.append('p_NUM_DCTO', $("#txtNroCotizacion").val());
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
            data.append('p_COD_AUT', $('#txtCodigoAutorizacion').val());
            data.append('p_PCTJ_IGV', $("#hfIMPUESTO").val());
            var ir = ((parseFloat($("#hfFactorImpuestoRentaVenta").val()) / 100) * parseFloat($('#txt_monto_total').val())).toFixed(4);
            data.append('p_FACTOR_RENTA', $("#hfFactorImpuestoRentaVenta").val());
            data.append('p_IMPUESTO_RENTA', ir);
            data.append('p_RESP_PIDM', $("#hfResponsablePagoPIDM").val());
            data.append('p_DETALLES', detalles);
            data.append('p_DETALLES_BONIFICACION', detallesBoni);
            data.append('p_DETALLES_MUESTRA', detallesMues);


            data.append('p_FECHA_VIGENCIA', $("#txtFechaVigencia").val());
            data.append('p_DIAS_VIGENCIA', $("#txtDiasVigencia").val());

            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=8",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
           .success(function (datos) {
               if (datos != null) {
                   if (typeof datos[0].CODIGO != "undefined" && datos[0].CODIGO != 'ERROR') {
                       if (datos[0].CODIGO != 'LIMITE') {
                           exito();
                           //COMPLETAR
                           $("#hfCompletoInd").val("S")
                           $("#grabar").attr("href", "javascript:ActualizarDctoVenta();");
                           $("#divBtnsMantenimiento").attr("style", "display:none");

                           $("#btnImprimir").attr("style", "display:inline-block;margin-top:2px;");
                           $("#txtNumDctoComp").val(datos[0].CODIGO);
                           BloquearCampos();

                       }
                       else {
                           alertCustom("Se ha excedido el límite de los documentos autorizados. Intente utilizar otra serie o refrescar la página");
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
           });

        } else {
            alertCustom("Ingrese almenos 1 detalle!");
        }
    }
}

// IMPRIMIR -----------------------------------------------------
function ImprimirDctoVenta() {
    //Bloquear("ventana");
    var data = new FormData();
    data.append('p_CODE', $("#txtNumDctoComp").val());
    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=IMPR",
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
           }, 0.0000000000000001)

       } else {
           noexito();
       }
       //Desbloquear("ventana");
   })
   .error(function () {
       //Desbloquear("ventana");
       noexito();
   });
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
            flag: "RES_LINEA_CRED_CLI",
            pidm: pidm,
            empr: $("#cbo_Empresa").val()
        },
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            if (datos != "" & datos != null) {
                $("#txt_plazo_pago").val(datos[0].PLAZO);
                $("#hfCreditoDispMoba").val(datos[0].ACTUAL_MOBA)
                $("#hfCreditoDispMoal").val(datos[0].ACTUAL_MOAL)
            }
        },
        error: function () {
            alertCustom("Error al obtener datos de Linea de Credito de Cliente.");
        }
    });
}

function Cancelar() {
    window.location.href = '?f=NVMCOTI';
}

function BloquearCampos() {
    //Bloqueo campos Datos Generales
    $("#cbo_Empresa").attr("disabled", "disabled");
    $("#cbo_Sucursal").attr("disabled", "disabled");

    $("#cboDocumentoVenta").attr("disabled", "disabled");
    $("#txtClientes").attr("disabled", "disabled");
    $("#cboTipoDoc").attr("disabled", "disabled");
    $("#txtNroDctoCliente").attr("disabled", "disabled");

    $("#txt_fec_emision").attr("disabled", "disabled");
    $("#cboVendedor").attr("disabled", "disabled");

    $(".btnEliminarDetalle").attr("style", "display:none");
    $("#cboDctoOrigen").attr("disabled", "disabled");
    $("#info_btnf").attr("style", "display:none");
    $("#btnBuscarDctoOrigen").attr("style", "display:none");
    $("#txtFechaVigencia").attr("disabled", "disabled");
    
    $("#txt_comentario").attr("readonly", "true");
    //Bloqueo campos Detalles Venta
    $("#cbo_moneda").attr("disabled", "disabled");
    $("#A1").attr("style", "display:none");
    $("#A2").attr("style", "display:none");
    $("#A2").parent().attr("style", "display:none");
    $("#fila_5").attr("style", "display:none");
    $("#div_tabla_det").find(".input,textarea").attr("disabled", "disabled")

    $("#divAgregarProducto").attr("style", "display:none");
    //Bloqueo campos Datos Credito
    $("#cbo_modo_pago").attr("disabled", "disabled");
    $("#txt_plazo_pago").attr("disabled", "disabled");
    $("#txt_fec_vencimiento").attr("disabled", "disabled");

    $("#txtResponsablePago").attr("disabled", "disabled");
    $("#chkResponsablePago").attr("disabled", "disabled");

    //Bloqueo campos Tributaciones
    $("#txt_monto_detraccion").attr("disabled", "disabled");
    $("#txt_num_op_detrac").attr("disabled", "disabled");
    $("#txt_fec_comp_detrac").attr("disabled", "disabled");
    $("#txt_num_comp_percep").attr("disabled", "disabled");
    $("#txt_fec_comp_percep").attr("disabled", "disabled");
    $("#txt_num_comp_reten").attr("disabled", "disabled");
    $("#txt_fec_comp_reten").attr("disabled", "disabled");
}

//VAlida que el texto no contenga ";" o "|" en los detalles
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

var NuevaVenta = function () {
    window.location.href = '?f=NVMCOTI'
    //Bloquear("ventana");
    //window.history.pushState("Object", "COTIZACION CLIENTE", "/Default.aspx?f=nvmcoti");
    //$("#hfResponsablePagoPIDM,#hfPIDM,#hfRUC,#hfCodigoTipoDocumento,#hfTipoDocumento,#hfNroDocumento,#hfCOD_PROD,#hfProdSeriado,#hfCodigoCategoriaCliente,#hfAgenteRetencionCliente,#hfDIR,#hfDNI").val("");

    //$("#hfIMPUESTO,#hfCreditoDispMoba,#hfCreditoDispMoal,#hfParamDetraccion,#hfParamRetencion,#hfporcentaje_detraccion").val("0.00");
    //$("#hfImprimirPreciosIGV,#hfCompletoInd").val("N");

    //$("#divDctoImprimir").html("");

    //$('#txt_fec_emision, #txt_fec_transaccion,#txt_fec_vencimiento').datepicker("setDate", "now");
    //$("#txtNumDctoComp,#txtClientes,#txtNroDctoCliente").val("")
    //$("#txtNumSec").val("1")
    //$("#cboVendedor").select2("val", "")
    //LimpiarCamposDetalle();
    //detallesVenta = [];
    //detallesBonificacion = [];
    //detallesMuestra = [];
    //ListarTablaDetalles(ObtenerTablaDetalles());
    //ListarTablaDetallesBonificacion(ObtenerTablaDetallesBonificacion());
    //ListarTablaDetallesMuestra(ObtenerTablaDetallesMuestra());
    //$("#porlet_boni,#porlet_muestra, #div_tabla_det").attr("style", "display:none;");

    //$('#cbo_modo_pago, #chk_retencion, #txt_Retencion, #txt_num_comp_reten,#txt_fec_comp_reten').prop('disabled', true);
    //$('#chk_retencion').parent().removeClass('checked');

    //$("#txt_comentario").removeAttr("readonly").val("");

    // $("#chkResponsablePago").removeAttr("disabled");

    //$('#cbo_modo_pago option:first-child').prop('selected', true);
    //$('#cbo_modo_pago').change();
    //$('#txt_plazo_pago').val('0');
    //$('#cboTipoDoc').val('1').change();
    //$("#cboTipoDoc,#txtNroDctoCliente").removeAttr("disabled");
    //$("#txtNroDctoCliente, #txt_id_proveedor, #txt_Retencion").val("");
    //$("#txtResponsablePago").val("").attr("disabled", "disabled");
    //$("#chkResponsablePago").prop("checked", false).parent().removeClass('checked');
    //$('#cboDocumentoVenta').attr("disabled", "disabled");
    //$('#cboDocumentoVenta').select2("val", "");
    ////Documento Cotización   
    //$("#txtSerieCotizacion,#txtNroCotizacion").val("");

    //$("#cboDctoOrigen").removeAttr("disabled");
    //$("#info_btnf").attr("style", "display:inline-block");
    //$("#btnBuscarDctoOrigen").attr("style", "display:inline-block");
    //$("#divBtnsMantenimiento").attr("style", "display:inline-block");
    //$("#txtFechaVigencia").removeAttr("disabled");

    //$("#cbo_Empresa,#cbo_Sucursal,#cboVendedor").removeAttr("disabled");
    //$("#txt_fec_emision,#txtClientes").removeAttr("disabled");
    //$("#btnBuscadocs").attr("style", "display:inline-block;");
    //$("#div_btn_completar,#btnImprimir").attr("style", "display:none;");
    //$("#divAgregarProducto,#lbl_fec_vig,#txt_fec_vig,#lbl_fec_vig_Oficial,#txt_fec_vig_Oficial,#input_fec_vig_Oficial,#input_fec_vig,#div_btn_add_prods").attr("style", "display:block;");
    //$("#btnRecargarPersona").attr("style", "display:inline-block");
    //$("#A1").attr("style", "display:block;margin-right: 5px;");
    //$("#A2").attr("style", "display:block;");
    //$("#grabar").attr("href", "javascript:GrabarDctoVenta();");
    //$("#grabar").html("<i class='icon-save'></i> Grabar");
    //$("#div_tabla_det").html("");
    //$("#lblImporteCobrar").html("0.00");

    //$("#cbo_Sucursal").change();
    //$("input").parent().parent().removeClass("error");
    //$("select").parent().parent().removeClass("error");
    //$(".icon-ok").parent().remove();
    //$("#txtFechaVigencia").removeAttr("disabled").val("").change();
    //$("#tabDatosGenerales").click();
    //$('#txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten,#txt_cta_detrac').val("");



    //cargarParametrosSistema();
    //CalcularDetraccion();
    //CalcularDatosMonetarios();
    //setTimeout(function () {
    //    Desbloquear("ventana");
    //}, 500);

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
            url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=correo" +
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

//var enviarCorreo = function () {
//    var destinos = $('#cboCorreos').val();
//    if (vErrors(['cboCorreos', 'txtAsunto'])) {

//        var filas = "";    
//        for (var i = 0; i < detallesVenta.length; i++) { 
//            filas += detallesVenta[i].ITEM  +","
//            filas += detallesVenta[i].PROD_CODE_ANTIGUO + ","
//            filas += detallesVenta[i].NOMBRE_IMPRESION + ","
//            filas += detallesVenta[i].CANTIDAD + ","
//            filas += detallesVenta[i].DESC_UNIDAD + ","
//            filas += detallesVenta[i].PRECIO_DETALLE + ","
//            filas += detallesVenta[i].TOTAL_BRUTO + ","
//            filas += detallesVenta[i].MONTO_DESCUENTO + ","
//            filas += detallesVenta[i].TOTAL_NETO + ","
//            filas += detallesVenta[i].MONTO_ISC + ","
//            filas += detallesVenta[i].MONTO_DETRAC + ","
//            filas += detallesVenta[i].GLOSA + ""
//            if (i != detallesVenta.length - 1) {
//                filas += "|"
//            }
//        } 


//        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
//        destinos = destinos.toString();

//        var continuar = true;
//        var cod = "";
//        if (ObtenerQueryString("codigo")!=undefined) {
//            cod = ObtenerQueryString("codigo");
//        } else {
//            if ($("#txtNumDctoComp").val()!="") {
//                cod = $("#txtNumDctoComp").val();
//            }
//        }
//        if (true) {
//            $.ajax({
//                type: "post",
//                url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=SENDMAIL" +
//                    "&REMITENTE=" + $('#txtRemitente').val() +
//                    "&NREMITENTE=" + $('#txtNRemitente').val() + "&DESTINATARIOS=" + destinos +
//                    "&ASUNTO=" + $('#lblAsunto').html() + "&MENSAJE=" + $('#txtcontenido').val() +
//                    "&EMPRESA=" + $('#lblEmpresa').html() +
//                    "&SECUENCIA=" + $('#txtNumSec').val() + "&EMISION=" + $('#lblEmision').html() +
//                    "&TRANSACCION=" + $('#lblTransaccion').html() + "&CLIENTE=" + $('#lblCliente').html() +
//                    "&RESPONSABLE_PAGO=" + $('#lblResponsablePago').html() +
//                    "&DOC_REGISTRO=" + $('#lblDocRegistro').html() +
//                    "&GLOSA=" + $('#lblGlosa').html() +
//                    "&DETALLES=" + filas +
//                    "&codigo=" + cod +
//                    "&p_FECHA_VIGENCIA=" + $('#txtFechaVigencia').val(),
//                contentType: "application/json;",
//                dataType: false,
//                success: function (datos) {
//                    exito();
//                    $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
//                    setTimeout(function () { $('#divMail').modal('hide'); }, 25);
//                },
//                error: function (msg) {
//                    alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
//                    $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
//                }
//            });
//        } else {
//            alertInfo("El documento aún no puede ser enviado!");
//        }

//    }
//};

// -----------------------------------------------------------------------------------------
/* //PERMITE OBTENER LA TABLA DE IMPRESION 
 function ObtenerDctoImprimir() {
    var data = new FormData();
    data.append('p_CODE', "V00000007");  
    Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=IMPR",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
   .success(function (datos) {
       Desbloquear("ventana");
       if (datos != null) {
           $("#divDctoImprimir").html(datos);
       } else {
           noexito();
       }
   })
   .error(function () {
       Desbloquear("ventana");
       noexito();
   });
}
*/


/*NUEVAS FUNCIONES DE VALIDACION*/

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

            //Calcular 01-TOTAL BRUTO, 02-DESCUENTO, 03-TOTAL NETO, 04-DETRACCION,05-ISC
            var totalBruto = parseFloat(detallesVenta[indice].CANTIDAD) * parseFloat(valor);
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
        }
    }
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


        res += '<tr id="' + detallesBonificacion[i].ITEM_TABLA + '">'

        if (detallesBonificacion[i].CODE_DCTO_ORIGEN != "" && $("#cboDctoOrigen").val() == "0027") {
            res += '<td align="center"><a href="javascript:infoCustom2(\'Para eliminar este detalle debe cambiar de documento de origen!\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        } else {
            res += '<td align="center"><a href="javascript:DeleteBonificacion(\'' + detallesBonificacion[i].ITEM_TABLA + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'
        }

        res += '<td align="center">' + detallesBonificacion[i].ITEM_TABLA + '</td>'

        res += '<td class="producto" align="center">' + detallesBonificacion[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td ><textarea class="inputNombre" disabled="disabled" onkeyup="ActualizaNombreDetalle(\'' + detallesBonificacion[i].ITEM + '\',this.value,this);" maxlength="500" >' + detallesBonificacion[i].NOMBRE_IMPRESION + '</textarea></td>'

        res += '<td class="cantidad' + detallesBonificacion[i].ITEM + '" style="text-align: center">' + parseFloat(detallesBonificacion[i].CANTIDAD).toFixed(2) + '</td>'

        res += '<td align="center">' + detallesBonificacion[i].DESC_UNIDAD + '</td>'

        if (detallesBonificacion[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N" && $("#cboDctoOrigen").val() != "0027") {//Si es precio estandar es modificable
            res += '<td class="precio' + detallesBonificacion[i].ITEM + '" align="center"><input class="input2" type="text" disabled="disabled" onblur="ActualizaPrecioEstandarDetalle(this,this.value,\'' + i + '\')" value="' + detallesBonificacion[i].PRECIO_DETALLE + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
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

    for (var i = 0; i < detallesMuestra.length; i++) {


        res += '<tr id="' + detallesMuestra[i].ITEM_TABLA + '">'

        if (detallesMuestra[i].CODE_DCTO_ORIGEN != "" && $("#cboDctoOrigen").val() == "0027") {
            res += '<td align="center"><a href="javascript:infoCustom2(\'Para eliminar este detalle debe cambiar de documento de origen!\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        } else {
            res += '<td align="center"><a href="javascript:DeleteMuestra(\'' + detallesMuestra[i].ITEM_TABLA + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'
        }

        res += '<td align="center">' + detallesMuestra[i].ITEM_TABLA + '</td>'

        res += '<td class="producto" align="center">' + detallesMuestra[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td ><textarea class="inputNombre" disabled="disabled" onkeyup="ActualizaNombreDetalle(\'' + detallesMuestra[i].ITEM + '\',this.value,this);" maxlength="500" >' + detallesMuestra[i].NOMBRE_IMPRESION + '</textarea></td>'

        res += '<td class="cantidad' + detallesMuestra[i].ITEM + '" style="text-align: center">' + parseFloat(detallesMuestra[i].CANTIDAD).toFixed(2) + '</td>'

        res += '<td align="center">' + detallesMuestra[i].DESC_UNIDAD + '</td>'

        if (detallesMuestra[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N" && $("#cboDctoOrigen").val() != "0027") {//Si es precio estandar es modificable
            res += '<td class="precio' + detallesMuestra[i].ITEM + '" align="center"><input class="input2" type="text" disabled="disabled" onblur="ActualizaPrecioEstandarDetalle(this,this.value,\'' + i + '\')" value="' + detallesMuestra[i].PRECIO_DETALLE + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
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
    res += '<th>ALMACÉN</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesVenta.length; i++) {


        res += '<tr id="' + detallesVenta[i].ITEM_TABLA + '">'

        res += '<td align="center"><a href="javascript:Delete(\'' + detallesVenta[i].ITEM_TABLA + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        res += '<td align="center">' + detallesVenta[i].ITEM_TABLA + '</td>'

        res += '<td class="producto" align="center">' + detallesVenta[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td ><textarea class="inputNombre" onblur="ActualizaNombreDetalle(\'' + detallesVenta[i].ITEM + '\',this.value,this);" maxlength="500" >' + detallesVenta[i].NOMBRE_IMPRESION + '</textarea></td>'

        res += '<td class="cantidad' + detallesVenta[i].ITEM + '" style="text-align: center">' + detallesVenta[i].CANTIDAD + '</td>'

        res += '<td align="center">' + detallesVenta[i].DESC_UNIDAD + '</td>'

        if (detallesVenta[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N") {//Si es precio estandar es modificable
            res += '<td class="precio' + detallesVenta[i].ITEM + '" align="center"><input class="input2" type="text" onblur="ActualizaPrecioEstandarDetalle(this,this.value,\'' + i + '\')" value="' + detallesVenta[i].PRECIO_DETALLE + '" onkeypress="return ValidaDecimales(event,this)"/></td>'
        }
        else {
            res += '<td class="precio' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].PRECIO_DETALLE + '</td>'
        }

        res += '<td class="bruto' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].TOTAL_BRUTO + '</td>'

        res += '<td class="descuento' + detallesVenta[i].ITEM + '" style="text-align: center">' + detallesVenta[i].MONTO_DESCUENTO + '</td>'

        res += '<td class="suma neto' + detallesVenta[i].ITEM + '"   align="center">' + detallesVenta[i].TOTAL_NETO + '</td>'

        res += '<td class="isc" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].MONTO_ISC + '</td>'

        res += '<td class="detraccion" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].MONTO_DETRAC + '</td>'

        res += '<td class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].DESC_ALMC + '</td>'

        res += '<td class="glosa" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].GLOSA + '</td>'

        res += '</tr>'
    }

    res += '</tbody>'
    res += '</table>'
    return res;
}

function ListarTablaDetalles(datos) {
    $("#div_tabla_det").attr("style", "display:block");
    if ($("#txtNumDctoComp").val() != "") {
        $("#div_btn_completar").attr("style", "display:inline");
    } else {
        $("#div_btn_completar").attr("style", "display:none");
    }
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


function BuscarDocumentoOrigen() {
    if (vErrors(['txtClientes', 'cboDctoOrigen', 'cbo_moneda', 'cbo_Sucursal'])) {
        if ($('#cboDctoOrigen').val().indexOf('P') == 0) {

            $.ajax({
                type: 'post',
                url: 'vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCS' +
                    '&TIPO_DCTO=' + $('#cboDctoOrigen').val() +
                    '&p_CTLG_CODE=' + $('#cbo_Empresa').val() +
                    '&p_SCSL_CODE=' + $('#cbo_Sucursal').val() +
                    '&p_MONE_CODE=' + $('#cbo_moneda').val() +                    
                    '&PIDM=' + $('#hfPIDM').val(),
                contenttype: "application/json",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $("#tblPlantillas").DataTable().destroy();
                    $("#tblPlantillas tbody tr").remove();
                    if (datos != null) {                        
                        for (var i = 0; i < datos.length; i++) {
                            var detalle = "";
                            detalle += '<tr id="f_' + datos[i].CODIGO + '">'
                            detalle+='<td style="text-align:center;"><img id="' + datos[i].CODIGO + '" src="recursos/img/details_open.png" /></td>'
                            detalle+='<td style="text-align: center">' + datos[i].CODIGO + '</td>'
                            detalle+='<td style="text-align: center">' + datos[i].TRANSACCION + '</td>'
                            detalle+='<td>' + datos[i].ALIAS + '</td>'
                            detalle+='<td style="text-align: center">'
                            detalle += '<a id="btnCargarPlantilla" class="btn blue" href="javascript:CargarPlantilla(\'' + datos[i].CODIGO + '\');" title="Cargar Plantilla" style="margin:0px 2px 2px 0px;"><i class="icon-download"></i></a>'
                            detalle += '<a id="btnDarBajaPlantilla" class="btn red" href="javascript:DarBajaPlantilla(\'' + datos[i].CODIGO + '\');" title="Dar de Baja Plantilla" style="margin:0px 2px 2px 0px;"><i class="icon-minus"></i></a>'
                            detalle+='</td>'
                            detalle+='</tr>'
                            $("#tblPlantillas tbody").append(detalle);
                        }
                    }
                    $("#modalPlantilla").modal("show");

                    if ($("#modalPlantilla").hasClass('in') == true) {
                        $('#tblPlantillas_filter.dataTables_filter input[type=search]').focus();
                    }
                    $('#modalPlantilla').on('shown.bs.modal', function () {
                        $('#tblPlantillas_filter.dataTables_filter input[type=search]').focus();
                    });

                    oTable = $("#tblPlantillas").dataTable({
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        }
                    });
                },
                error: function (msg) {
                    alertCustom("No se listó plantillas correctamente.");
                }
            });

        } else {
            //Otros dctos de origen         
        }
    }

}

function GrabarPlantilla() {
    //Validaciones iniciales antes de guardado
    var continuar = false;

    if (vErrors(['cboDocumentoVenta', 'cboVendedor', 'txtClientes', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'txt_valor_cambio_Oficial', 'txt_valor_cambio', 'txtDescPlantilla'])) {
        continuar = true;
    }

    if ($("#chkResponsablePago").is(":checked")) {
        if ($("#hfResponsablePagoPIDM").val() == "") {
            $("#txtResponsablePago").val("");
            $("#txtClientes").keyup().siblings("ul").children("li").click();
        }
        if (!vErrorsNotMessage(['txtResponsablePago'])) {
            continuar = false;
            alertCustom("Debe indicar un responsable de pago válido!")
        }
    }

    //Fin validaciones iniciales
    if (continuar) {
        var valorCambio = parseFloat($("#txt_valor_cambio").val());
        var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());
        if (detallesVenta.length != 0) {
            var detalles = "";
            var detallesBoni = "";
            var detallesMue = "";
            Bloquear("ventana");
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
                    detallesVenta[i].TIPO_PRODUCTO + ";" +
                    detallesVenta[i].SERIADO + ";" +
                    detallesVenta[i].ALMC +
                    "|";
                }

                for (var i = 0; i < detallesBonificacion.length; i++) {
                    detallesBoni += ValidaCaracter(detallesBonificacion[i].ITEM) + ";" +
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
                        detallesBonificacion[i].TIPO_PRODUCTO + ";" +
                        detallesBonificacion[i].SERIADO +
                        "|";
                }

                for (var i = 0; i < detallesMuestra.length; i++) {
                    detallesMue += ValidaCaracter(detallesMuestra[i].ITEM) + ";" +
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
                        detallesMuestra[i].TIPO_PRODUCTO + ";" +
                        detallesMuestra[i].SERIADO +
                        "|";
                }


            } else {
                //Si los valores estan en MonedaAlterna
                for (var i = 0; i < detallesVenta.length; i++) {
                    detalles += detallesVenta[i].ITEM + ";" +
                        detallesVenta[i].CODIGO + ";" +
                        detallesVenta[i].NOMBRE_IMPRESION + ";" +
                        detallesVenta[i].CODE_UNIDAD + ";" +
                        detallesVenta[i].CANTIDAD + ";" +
                        (parseFloat(detallesVenta[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                        (parseFloat(detallesVenta[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                        //10
                        detallesVenta[i].GLOSA + ";" +
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
                        detallesVenta[i].TIPO_PRODUCTO + ";" +
                        detallesVenta[i].SERIADO + ";" +
                        detallesVenta[i].ALMC +
                        "|";
                }

                for (var i = 0; i < detallesBonificacion.length; i++) {
                    detallesBoni += detallesBonificacion[i].ITEM + ";" +
                        detallesBonificacion[i].CODIGO + ";" +
                        detallesBonificacion[i].NOMBRE_IMPRESION + ";" +
                        detallesBonificacion[i].CODE_UNIDAD + ";" +
                        detallesBonificacion[i].CANTIDAD + ";" +
                        (parseFloat(detallesBonificacion[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                        //10
                        detallesBonificacion[i].GLOSA + ";" +
                        detallesBonificacion[i].TIPO_BIEN + ";" +
                        detallesBonificacion[i].PRECIO_IND + ";" +
                        //Montos convertidos:
                        (parseFloat(detallesBonificacion[i].MONTO_ISC)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DETRAC)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].PRECIO_DETALLE)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].MONTO_DESCUENTO)).toFixed(2) + ";" +
                        (parseFloat(detallesBonificacion[i].TOTAL_NETO)).toFixed(2) + ";" +
                        detallesBonificacion[i].CTAS_CODE + ";" +
                        detallesBonificacion[i].CECO_CODE + ";" +
                        //20
                        detallesBonificacion[i].ALMACENABLE + ";" +
                        detallesBonificacion[i].TIPO_PROD + ";" +
                        detallesBonificacion[i].TIPO_PRODUCTO + ";" +
                        detallesBonificacion[i].SERIADO +
                        "|";
                }

                for (var i = 0; i < detallesMuestra.length; i++) {
                    detallesMue += detallesMuestra[i].ITEM + ";" +
                        detallesMuestra[i].CODIGO + ";" +
                        detallesMuestra[i].NOMBRE_IMPRESION + ";" +
                        detallesMuestra[i].CODE_UNIDAD + ";" +
                        detallesMuestra[i].CANTIDAD + ";" +
                        (parseFloat(detallesMuestra[i].PRECIO_DETALLE) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesMuestra[i].MONTO_DESCUENTO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesMuestra[i].TOTAL_NETO) * valorCambio).toFixed(2) + ";" +
                        (parseFloat(detallesMuestra[i].MONTO_DETRAC) * valorCambioOfi).toFixed(2) + ";" +
                        (parseFloat(detallesMuestra[i].MONTO_ISC) * valorCambio).toFixed(2) + ";" +
                        //10
                        detallesMuestra[i].GLOSA + ";" +
                        detallesMuestra[i].TIPO_BIEN + ";" +
                        detallesMuestra[i].PRECIO_IND + ";" +
                        //Montos convertidos:
                        (parseFloat(detallesMuestra[i].MONTO_ISC)).toFixed(2) + ";" +
                        (parseFloat(detallesMuestra[i].MONTO_DETRAC)).toFixed(2) + ";" +
                        (parseFloat(detallesMuestra[i].PRECIO_DETALLE)).toFixed(2) + ";" +
                        (parseFloat(detallesMuestra[i].MONTO_DESCUENTO)).toFixed(2) + ";" +
                        (parseFloat(detallesMuestra[i].TOTAL_NETO)).toFixed(2) + ";" +
                        detallesMuestra[i].CTAS_CODE + ";" +
                        detallesMuestra[i].CECO_CODE + ";" +
                        //20
                        detallesMuestra[i].ALMACENABLE + ";" +
                        detallesMuestra[i].TIPO_PROD + ";" +
                        detallesMuestra[i].TIPO_PRODUCTO + ";" +
                        detallesMuestra[i].SERIADO +
                        "|";
                }
            }

            var data = new FormData();
            data.append('p_NUM_SERIE', $("#txtSerieCotizacion").val());
            data.append('p_NUM_DCTO', $("#txtNroCotizacion").val());
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

            data.append('p_IMPORTE_DETRACCION', $("#txt_detraccion").val());
            data.append("p_IMPORTE_RETENCION", $("#txt_Retencion").val());
            data.append('p_IMPORTE_PERCEPCION', $("#txt_Percepcion").val());
            data.append('p_IMPORTE_OTROS', "0");
            data.append('p_MOPA_CODE', $("#cbo_modo_pago").val());
            // data.append('p_FOPA_CODE', '');
            data.append('p_CLIE_PIDM', $("#hfPIDM").val());
            data.append('p_CLIE_DOID', $("#cboTipoDoc").val());
            data.append('p_USVE_USUA_ID', $("#cboVendedor").val());
            data.append('p_COMPLETO_IND', "N");

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
            data.append('p_COD_AUT', $('#txtCodigoAutorizacion').val());
            data.append('p_PCTJ_IGV', $("#hfIMPUESTO").val());
            var ir = ((parseFloat($("#hfFactorImpuestoRentaVenta").val()) / 100) * parseFloat($('#txt_monto_total').val())).toFixed(4);
            data.append('p_FACTOR_RENTA', $("#hfFactorImpuestoRentaVenta").val());
            data.append('p_IMPUESTO_RENTA', ir);
            data.append('p_RESP_PIDM', $("#hfResponsablePagoPIDM").val());
            data.append('p_DETALLES', detalles);
            data.append('p_DETALLES_BONIFICACION', detallesBoni);

            data.append('p_DETALLES_MUESTRA', detallesMue);

            data.append('p_TIPO_DCTO_PLAN', "P0053");
            data.append('p_DESC_PLAN', $("#txtDescPlantilla").val());            

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CPLAN",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
           .success(function (datos) {
               if (datos != null) {
                   if (typeof datos[0].CODIGO != "undefined" && datos[0].CODIGO != 'ERROR') {
                       $("#txtDescPlantilla").val("");
                       $("#btnGrabarPlantilla").attr("style", "display:none");
                       $("#btnImprimir").attr("style", "display:inline-block;margin-top:2px;");
                       exito();
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
           });

        } else {
            alertCustom("Ingrese almenos 1 detalle!");
        }
    }
}
function DarBajaPlantilla(codigo) {
    $("#modal-confirmar #btnAceptar").attr("href", "javascript:EliminarPlantilla('" + codigo + "')");
    $('#modalPlantilla').modal('hide');
    $("#modal-confirmar").modal("show");
}

function EliminarPlantilla(codigo) {
    $.ajax({
        type: 'post',
        url: 'vistas/nv/ajax/nvmdocv.ashx?OPCION=BPLAN' +
            '&p_PLAN_CODE=' + codigo +
            '&p_USUA_ID=' + $("#ctl00_txtus").val(),
        contentType: false,
        async: false,
        success: function (datos) {
            $('#modalPlantilla').modal('show');
            $("#modal-confirmar").modal("hide");
            if (datos == "OK") {
                $("#f_" + codigo + "").remove();
                $("#c" + codigo + "").parent().parent().remove();               
                exito();
            }
            else {
                noexito();
            }
        },
        error: function (msg) {
            $('#modalPlantilla').modal('show');
            $("#modal-confirmar").modal("hide");
            noexito();
        }
    });
}

function CargarPlantilla(codigo) {
    infoCustom2("Cargando Detalles...")

    cargarCabeceraPlantilla(codigo);
    var nroDetallesInsertados = 0;
    var detallesDctoOrigen = [];
    var detallesDctoOrigenBoni = [];
    var detallesDctoOrigenMuestra = [];
    
    var data = new FormData();

    data.append('p_PLAN_CODE', codigo);
    data.append('TIPO_DCTO', $("#cboDctoOrigen").val());
    Bloquear("ventana");
    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCSD",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
     .success(function (datos) {            
        Desbloquear("ventana");
        if (datos != null && datos != "") {
            for (var i = 0; i < datos.length; i++) {
                LimpiarCamposDetalle();
                prodActual = ObtenerProductoCompleto(datos[i].PROD_CODE, $("#hfPIDM").val());
                //--------------------------------------------------------------------------              
                $("#txtClientes").attr("disabled", "disabled");
                $("#txtNroDctoCliente").attr("disabled", "disabled");
                $("#cboTipoDoc").attr("disabled", "disabled");

                $("#hfCOD_PROD").val(datos[i].PROD_CODE);               
                $("#txt_desc_producto").val(datos[i].NOMBRE_IMPRESION);
                $("#txt_cantidad").val(datos[i].CANTIDAD);
                $("#cbo_und_medida").select2("val", datos[i].UNIDAD);
                $("#txt_glosa_det").val(datos[i].GLOSA);
                
                var nomProdVenta = $("#txt_desc_producto").val();
                var cantidad = $("#txt_cantidad").val();
                var unidadMedidaCode = $("#cbo_und_medida :selected").val();
                var unidadMedida = $("#cbo_und_medida :selected").html();
                
                $("#txtPrecioUnitario").val(datos[i].PU)
                $("#txt_descuento_det").val(datos[i].DESCUENTO);

                var precioUnidad = $("#txtPrecioUnitario").val();
                var descuento = $("#txt_descuento_det").val();
                var glosa = $.trim($("#txt_glosa_det").val());

                //Guardar Almacen
                var almacenCode = datos[i].ALMC;
                var almacen = datos[i].DESC_ALMC;
                var unidadMedidaCode_Prod = $("#hfCodUnd_Producto").val();
                let equi = parseFloat($('#cbo_und_medida option:selected').attr('equivalencia'));
                //var prod;
                var objProd = prodActual; //Json Producto
                var factor = calcula_factor_conversion(unidadMedidaCode_Prod, unidadMedidaCode) // factor conversion unidades
                var totalBruto = parseFloat((cantidad / factor) * precioUnidad).toFixed(prmtDIGP);
                var totalNeto = parseFloat(totalBruto - descuento).toFixed(prmtDIGP);

                //Validacion precio                
                var continuar = false;
                if (parseFloat($("#txtPrecioUnitario").val()) == 0) {
                    alertCustom("No puede agregar un producto('" + objProd.PROD_CODE_ANTIGUO + "') con precio 0. No se agregará ningún detalle.");
                    EliminarDatosDocumentoOrigen(btn)
                    break;
                }
                else if (parseFloat($("#txt_cantidad").val()) == 0) {
                    alertCustom("La cantidad de un detalle('" + objProd.PROD_CODE_ANTIGUO + "') es 0. No se agregará ningún detalle.");
                    EliminarDatosDocumentoOrigen(btn)
                    break;
                }
                else {
                    continuar = true
                }
                if (isNaN($("#txt_cantidad").val())) {
                    alertCustom("La cantidad en el detalle('" + objProd.PROD_CODE_ANTIGUO + "') no es válida. Intente nuevamente.");
                    EliminarDatosDocumentoOrigen(btn)
                    break;
                }
                if (isNaN($("#txt_descuento_det").val())) {
                    alertCustom("El descuento obtenido no válido('" + objProd.PROD_CODE_ANTIGUO + "'). Intente nuevamente.");
                    EliminarDatosDocumentoOrigen(btn)
                    break;
                }
                if (isNaN($("#txtPrecioUnitario").val())) {
                    alertCustom("El precio obtenido no es válido('" + objProd.PROD_CODE_ANTIGUO + "'). Intente nuevamente.");
                    EliminarDatosDocumentoOrigen(btn)
                    break;
                }
                //Fin validaciones
                if (continuar) {
                    var objProd = prodActual;
                    //Siempre Productos no seriados
                    if (ValidarProductoAgregado(objProd) < 0) {

                        if (datos[i].TIPO_PRODUCTO == 'N') {
                            contItem = detallesVenta.length + detallesBonificacion.length + detallesMuestra.length;
                            var item = contVenta + 1 ;
                            objProd.ITEM_TABLA = item;
                            objProd.CODE_DCTO_ORIGEN = datos[i].CODIGO;
                            objProd.ITEM = contItem + 1;
                            //objProd.DESC_UNIDAD = unidadMedida;
                            objProd.GLOSA = glosa;

                            objProd.ALMC = almacenCode;
                            objProd.DESC_ALMC = almacen;

                            objProd.NOMBRE_IMPRESION = nomProdVenta;
                            objProd.MONTO_DESCUENTO = descuento;
                            objProd.CANTIDAD = cantidad;
                            objProd.PRECIO_DETALLE = parseFloat(precioUnidad).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                            objProd.PU = parseFloat(precioUnidad).toFixed(prmtDIGP);
                            objProd.TOTAL_BRUTO = totalBruto;
                            objProd.TOTAL_NETO = totalNeto;//Total neto Incluido IGV
                            objProd.CODE_UNIDAD = datos[i].UNIDAD;
                            objProd.UNIDAD = datos[i].UNIDAD;
                            objProd.DESC_UNIDAD = datos[i].DESC_UNIDAD;
                            objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                            objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;
                            //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)
                            var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                            var detraccion, isc;
                            let tipoDocCode = $("#cboDocumentoVenta").val();//DPORTA SIN-IMPUESTOS
                            //if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') {
                            if (tipoDocCode == '0001') {
                                detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                            } else {
                                detraccion = parseFloat(0) * (totalNeto);
                            }
                            objProd.MONTO_DETRAC = detraccion.toFixed(prmtDIGP);
                            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                objProd.MONTO_ISC = isc.toFixed(prmtDIGP);
                            } else {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                                objProd.MONTO_ISC = isc.toFixed(prmtDIGP);
                            }

                            objProd.TIPO_PRODUCTO = 'N';
                            detallesDctoOrigen.push(objProd);
                            nroDetallesInsertados++;
                            detallesVenta.push(objProd);
                            contVenta = contVenta + 1;                                                   
                        }

                        if (datos[i].TIPO_PRODUCTO == 'B') {
                            contItem = detallesVenta.length + detallesBonificacion.length + detallesMuestra.length;
                            var item = contBoni + 1;
                            objProd.ITEM_TABLA = item;
                            objProd.CODE_DCTO_ORIGEN = "";
                            objProd.ITEM = contItem + 1;
                            objProd.DESC_UNIDAD = unidadMedida;
                            objProd.GLOSA = glosa;

                            objProd.ALMC = almacenCode;
                            objProd.DESC_ALMC = almacen;

                            objProd.NOMBRE_IMPRESION = nomProdVenta;
                            objProd.MONTO_DESCUENTO = descuento;
                            objProd.CANTIDAD = cantidad;
                            objProd.PRECIO_DETALLE = parseFloat(precioUnidad).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                            objProd.PU = parseFloat(precioUnidad).toFixed(prmtDIGP);
                            objProd.TOTAL_BRUTO = parseFloat(totalBruto * 0).toFixed(prmtDIGP);
                            objProd.TOTAL_NETO = parseFloat(totalNeto * 0).toFixed(prmtDIGP);//Total neto Incluido IGV
                            objProd.CODE_UNIDAD = datos[i].UNIDAD;
                            objProd.UNIDAD = datos[i].UNIDAD;
                            objProd.DESC_UNIDAD = datos[i].DESC_UNIDAD;
                            objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                            objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;
                            //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)
                            var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                            var detraccion, isc;
                            let tipoDocCode = $("#cboDocumentoVenta").val();//DPORTA SIN-IMPUESTOS
                            //if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') {
                            if (tipoDocCode == '0001') {
                                detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                            } else {
                                detraccion = parseFloat(0) * (totalNeto);
                            }
                            objProd.MONTO_DETRAC = parseFloat(detraccion).toFixed(prmtDIGP);
                            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                objProd.MONTO_ISC = parseFloat(0).toFixed(prmtDIGP);
                            } else {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                                objProd.MONTO_ISC = parseFloat(0).toFixed(prmtDIGP);
                            }

                            objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();
                            objProd.TIPO_PRODUCTO = 'B';

                            detallesDctoOrigenBoni.push(objProd);

                            detallesBonificacion.push(objProd);

                            nroDetallesInsertados++;
                            contBoni++;
                           
                        }

                        if (datos[i].TIPO_PRODUCTO == 'M') {
                            contItem = detallesVenta.length + detallesBonificacion.length + detallesMuestra.length;
                            var item = contMuestra + 1;
                            objProd.ITEM_TABLA = item;
                            objProd.CODE_DCTO_ORIGEN = "";
                            objProd.ITEM = contItem + 1;
                            objProd.DESC_UNIDAD = unidadMedida;
                            objProd.GLOSA = glosa;

                            objProd.ALMC = almacenCode;
                            objProd.DESC_ALMC = almacen;

                            objProd.NOMBRE_IMPRESION = nomProdVenta;
                            objProd.MONTO_DESCUENTO = descuento;
                            objProd.CANTIDAD = cantidad;
                            objProd.PRECIO_DETALLE = parseFloat(precioUnidad).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                            objProd.PU = parseFloat(precioUnidad).toFixed(prmtDIGP);
                            objProd.TOTAL_BRUTO = parseFloat(totalBruto * 0).toFixed(prmtDIGP);
                            objProd.TOTAL_NETO = parseFloat(totalNeto * 0).toFixed(prmtDIGP);//Total neto Incluido IGV
                            objProd.CODE_UNIDAD = datos[i].UNIDAD;
                            objProd.UNIDAD = datos[i].UNIDAD;
                            objProd.DESC_UNIDAD = datos[i].DESC_UNIDAD;
                            objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                            objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;
                            //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)
                            var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                            var detraccion, isc;
                            let tipoDocCode = $("#cboDocumentoVenta").val();//DPORTA SIN-IMPUESTOS
                            //if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') {
                            if (tipoDocCode == '0001') {
                                detraccion = parseFloat(objProd.DETRACCION) * (totalNeto);
                            } else {
                                detraccion = parseFloat(0) * (totalNeto);
                            }
                            objProd.MONTO_DETRAC = parseFloat(detraccion).toFixed(prmtDIGP);
                            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                objProd.MONTO_ISC = parseFloat(0).toFixed(prmtDIGP);
                            } else {
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                                objProd.MONTO_ISC = parseFloat(0).toFixed(prmtDIGP);
                            }

                            objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();
                            objProd.TIPO_PRODUCTO = 'M';

                            detallesDctoOrigenMuestra.push(objProd);

                            detallesMuestra.push(objProd);

                            nroDetallesInsertados++;
                            contMuestra++;

                        }

                    } else {
                        if (agregarDetalle == "NO") {
                            alertCustom("El producto '" + objProd.PROD_CODE_ANTIGUO + "' ya ha sido agregado.");
                        }                        
                    }
                }

            } //fin FOR

            if (nroDetallesInsertados == datos.length || nroDetallesInsertados > 0) {    
                CalcularDetraccion();
                CalcularDatosMonetarios();
                $("#lblImporteCobrar").html($("#txt_monto_total").val());
                //Bloquear edicion
                $("#cbo_moneda").attr("disabled", "disabled");
                $("#cbo_uni_medida").attr("disabled", "disabled");
                $("#cbo_Sucursal").attr("disabled", "disabled");
                $("#cbo_Empresa").attr("disabled", "disabled");

                if (nroDetallesInsertados == datos.length) {
                    exitoCustom("Todos los detalles del documento de origen se cargaron correctamente.");
                }
                else {
                    exitoCustom("(" + nroDetallesInsertados + " de " + datos.length + ") detalles del documento de origen se cargaron correctamente.");
                }
            } else {
                alertCustom("Los detalles del documento de origen ("+ datos.length + ") NO se cargaron correctamente.");
            }

            LimpiarCamposDetalle();

            if (detallesDctoOrigen.length > 0) {
                var datos = ObtenerTablaDetalles();
                ListarTablaDetalles(datos);
            }


            if (detallesDctoOrigenBoni.length > 0) {
                var datos2 = ObtenerTablaDetallesBonificacion();
                ListarTablaDetallesBonificacion(datos2);
            }

            if (detallesDctoOrigenMuestra.length > 0) {
                var datos3 = ObtenerTablaDetallesMuestra();
                ListarTablaDetallesMuestra(datos3);    
            }          
        }
        else {
            alertCustom("Detalles del documento de origen no se cargaron correctamente")
        }

        $("#modalPlantilla").modal("hide");
    })
    .error(function () {
        alertCustom("Detalles del documento de origen no se cargaron correctamente")
        $("#modalPlantilla").modal("hide");
        Desbloquear("ventana");
    });
}



function cargarCabeceraPlantilla(codigo) {
    var data = new FormData();
    data.append('p_PLAN_CODE', codigo);
    data.append('TIPO_DCTO', $("#cboDctoOrigen").val());

    Bloquear("ventana");
    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCPCAP",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (datos) {
            console.log(datos);
            $("#cboDocumentoVenta").select2('val', datos[0].DOCUMENTO).change();
            $("#cbo_modo_pago").select2('val', datos[0].MODO_PAGO).change();
            $("#nombre_plantilla").html(datos[0].DESCRIPCION);
               
        })
        .error(function () {            
            
        });
}


//Listar detalles Plantilla
$(function () {

    $('#tblPlantillas tbody td img').live('click', function () {

        var id = $(this).attr('id');
        var nTr = $(this).parents('tr')[0];

        if (oTable.fnIsOpen(nTr)) {
            this.src = "recursos/img/details_open.png";
            oTable.fnClose(nTr);
        }
        else {
            /* Open this row */
            this.src = "recursos/img/details_close.png";
            oTable.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
            oTable.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
            $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
            $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCSD"
                + "&p_PLAN_CODE=" + id.toString() + "&TIPO_DCTO=" + $("#cboDctoOrigen").val(),
                success: function (datos) {
                    var tablaDetalles = "";
                    tablaDetalles = "<table class='table table-hover'><thead><tr><th>ITEM</th><th>CODIGO</th><th>PRODUCTO</th><th>UNIDAD</th><th>CANTIDAD</th></tr></thead><tbody>"
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            tablaDetalles += "<tr>";
                            tablaDetalles += "<td>" + datos[i].ITEM + "</td>";
                            tablaDetalles += "<td>" + datos[i].PROD_CODIGO_ANTIGUO + "</td>";
                            tablaDetalles += "<td>" + datos[i].NOMBRE_IMPRESION + "</td>";
                            tablaDetalles += "<td>" + datos[i].DESC_UNIDAD + "</td>";
                            tablaDetalles += "<td>" + datos[i].CANTIDAD + "</td>";
                            tablaDetalles += "</tr>";
                        }
                    }
                    tablaDetalles += "</tbody></table>";
                    $('#c' + id).html(tablaDetalles);
                }
            });
        }
    });

    function fnFormatDetails(nTr, id) {
        //var aData = oTable.fnGetData(nTr);
        var sOut = '<div id="c' + id + '"></div>';
        return sOut;
    }
});

// Cliente Rápido
function BuscarClientexDocumento() {
    if (vErrors(['cboTipoDoc'])) {
        Bloquear("divFilaCliente");
        $.ajax({
            type: "post",
            async: true,
            url: "vistas/NV/ajax/NVMDOCV.ashx?OPCION=BCLI" +
                "&p_CLIE_DOID=" + $("#cboTipoDoc").val() +
                "&p_CLIE_DOID_NRO=" + $("#txtNroDctoCliente").val(),
            contenttype: "application/json;",
            datatype: "json",
            success: function (datos) {
                var doid = $("#cboTipoDoc").val();
                var nro = $("#txtNroDctoCliente").val();
                if (datos != null && datos != "") {
                    var esCliente = false;
                    $("#txtClientes").val(" ").keyup();
                    $("#txtClientes").val("").keyup();
                    for (var i = 0; i < jsonClientes.length; i++) {
                        if ($.trim(jsonClientes[i].RAZON_SOCIAL) == $.trim(datos[0].RAZON_SOCIAL)) {
                            esCliente = true;
                            $("#txtClientes").val(datos[0].RAZON_SOCIAL);
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
            },
            error: function (msg) {
                Desbloquear("divFilaCliente");
                alertCustom("No se pudo verificar Identidad de Cliente correctamente");
            }
        });
    }
}

// Ver Cliente Rápido
function NuevoClienteRapido(doid, nro) {
    var tp, td, d, ubi;
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
                    window.open("?f=NKMGECL&tp=" + tp + "&td=" + td + "&d=" + d + "&ubi=" + $("#cbo_Sucursal :selected").attr("data-ubigeo") + "", "_blank");
                } else {
                    //PERSONA JURÍDICA  
                    tp = "J";
                    window.open("?f=NCMCLIR&tp=" + tp + "&td=" + td + "&d=" + d + "&ctlg=" + $("#cbo_Empresa").val() + "&ubi=" + $("#cbo_Sucursal :selected").attr("data-ubigeo") + "", "_blank");
                }
            } else {
                alertCustom("Ingrese un número de documento válido");
            }
        } else {//PERSONA NATURAL
            tp = "N";
            window.open("?f=NCMCLIR&tp=" + tp + "&td=" + td + "&d=" + d + "&ctlg=" + $("#cbo_Empresa").val() + "&ubi=" + $("#cbo_Sucursal :selected").attr("data-ubigeo") + "", "_blank");
        }
    }
}
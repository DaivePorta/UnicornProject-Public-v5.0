var prodActual = {};
var asincrono = true;//clientes y responsablesPago
var gImporteCobrar = 0;
var jsonClientes = [];
var jsonPredeterminado = new Array();
var validarStockInd = "S";
var paramStock = -1;
var stockVenta = 0;
var stockReal = 0;
var limitItems = false; controlCargaIgv = false;
var cargarprederteminado = false;
var aux_predeterminado = false;
//CODIGO DE LA VENTA DE MANERA GLOBAL
//var codigodctoglobal;
var deuda;
//Pruebita 2 DPORTA
var cod_cate_clie = "";
var des_cate_clie = "";
//EQUIVALENCIA DE UNIDADES
var equivalencias = [];
//DPORTA
var prmtDIGP = 0;
var prmtACON = "NO";//VERIFICA SI DESEA QUE SE GENERE O NO EL ASIENTO CONTABLE
var prmtBFDV = "NO";//BLOQUEA FECHA DE EMISIÓN
var prmtCLIE = "NO";//RESTRINGE LA CARGA DE CLIENTES
var prmtGLIT = "";
var GLIT = "";
var total_boni = 0;
carga_ini_ind = false;
var token_migo = '';//dporta
const sCodModulo = "0001";
var agregarDetalle = "";//AGREGAR DETALLE VALIDADO
var prmtCURS = "";
var desc_producto = '';
const mediosPago = ['0001', '0003', '0005', '0006', '0020']; //PARA VERIFICAR EL NÚMERO DE OPERACIÓN O COD. DE AUTORIZACIÓN. DPORTA 16/08/2023
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

var fillCboDirecciones = function (pidm) {
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=7&PIDM=" + pidm,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
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
            infoCustom2("No existen direcciones registradas para el cliente seleccionado.");
        }
    });
}

//Agregado (Lista todos lo almacenes por empresa)
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
//            $('#cboAlmacen').select2('val', $('#ctl00_hddestablecimiento').val());
//        },
//        error: function (msg) {
//            alertCustom('Ocurrió un error al listar almacenes.');
//        }
//    });
//    $('#cboAlmacen').select2();
//};

var NVMDOVS = function () {

    var plugins = function () {
        $('#cbo_Empresa, #cbo_Sucursal,#cboVendedor, #cbo_modo_pago, #cboDocumentoVenta,  #cbo_moneda, #cbo_und_medida,  #cboTipoDoc,#cbo_correlativo,#cboSerieDocVenta').select2();
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_vig').datepicker();

        $('#txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_vig').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento,#txtFechaPago').datepicker("setDate", "now"); //20/02
        //CargarFactorImpuestoRentaVenta();

        $('#txtFechaPago').datepicker();//20/02

        $('#cbo_OrigenPago, #cbo_OrigenPago2, #cbo_OrigenPago3').select2();//20/02
        $('#cboMedioPago, #cboMedioPago2, #cboMedioPago3').select2();//20/02
        $('#cbo_Det_Origen, #cbo_Det_Origen2 ,#cbo_Det_Origen3').select2();//20/02
        $('#cboCtaEmpresa').select2();
        $("#txtMonto, #txtEfectivo, #txtEfectivo2, #txtEfectivo3, #txtVuelto, #txtAcumulado").keypress(function (e) { return (ValidaDecimales(e, this, 2)); })//20/02

        $('#cbo_direccion').select2();
        $('#cbo_appPago, #cbo_appPago2, #cbo_appPago3').select2();

        autocompletarGlosa('#txt_glosa_det', $('#hfTxtGlosaDet').val());
    }

    var fillCboEmpresa = function () {
        var select = $('#cbo_Empresa').select2('destroy');
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNVMDOCV");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CTLG_SHORT&USUA_ID=" + $('#ctl00_txtus').val(),
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
                    $(select).val($('#ctl00_hddctlg').val()).change();
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
            $(select).val($('#ctl00_hddctlg').val()).change();
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
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOID",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
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
                alertCustom("Documentos de Identidad no se listaron correctamente.");
            }
        });
    }

    var cargarCorrelativo = function () {
        if ($("#cboDocumentoVenta").val() != "") {
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
                            $(select).append('<option value="' + datos[i].CODIGO + '" data-ticket="' + datos[i].FORMATO_TICKET_IND + '" data-tipoDocCode ="' + datos[i].DOC_CODE + '" data-formato="' + datos[i].FORMATO + '"   data-actual="' + datos[i].VALOR_ACTUAL + '"  data-fin="' + datos[i].VALOR_FIN + '"  data-ind="' + datos[i].CORRELATIVO + '" data-lineas="' + datos[i].NRO_LINEAS + '" >' + datos[i].SERIE + '</option>');
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
            AplicarImpuestosPorItem(); //DPORTA SIN-IMPUESTOS
        }
    }

    var limpiarCorrelativo = function () {
        $("#txtNroDocVenta").val("");
        $("#cboSerieDocVenta").select2("val", "");
        $("#lblTipoCorrelativo").html("");
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
        var dctoOrigenAnterior = "x";
        // traer direcciones del cliente selecionado
        $('#btn_act_direccion').on('click', function () {
            if (vErrors(["txtClientes"])) {
                fillCboDirecciones($("#hfPIDM").val());
            }
        });
        // check de la tabla anticipos
        $('#chkTodos').click(function () {
            var checked = $(this).is(':checked');
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
                //Agregado (Al cambiar la empresa, carga los almacenes correspondientes)
                //cargarAlmacenes();
                fillcboRegistroEspecifico('VENT');

                if (ObtenerQueryString("codigo") == undefined) {
                    if (prmtCLIE == 'NO') {
                        fillTxtCliente("#txtClientes", "");
                        //fillTxtResponsablePago();
                    }                    
                }
                else {
                    asincrono = false;
                    fillTxtCliente("#txtClientes", "");
                    fillTxtResponsablePago();
                    asincrono = true;
                }
                // no entiendo porque es esto
                if ($("#hfPIDM").val() != "") {
                    filltxtdescproducto('');
                }
                cargarJsonEmpleado($(this).val());
                empresaAnterior = $(this).val();
                //CargarDatosCobroPorDefecto();
            }
        });

        $('#cbo_Sucursal').on('change', function () {
            if ($('#cbo_Empresa').val() != "" && $('#cbo_Sucursal').val() != "") {
                filltxtdescproducto('');
                if (ObtenerQueryString("codigo") != undefined) {
                    if ($("#hfCompletoInd").val() == "S") {
                        fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "", false);
                    } else {
                        fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", false);
                        $("#cboVendedor").removeAttr("disabled", "disabled");//DPORTA
                    }
                } else {
                    fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", true);
                    $("#cboVendedor").removeAttr("disabled", "disabled");//DPORTA
                }

                cargarCorrelativo();
                CargarDatosCobroPorDefecto();//DPORTA
                //$('#cboAlmacen').select2('val', $('#cbo_Sucursal').val());
                //$("#cboAlmacen").change();

                if ($('#cbo_Sucursal').val() != "") {
                    if ($('#cbo_Sucursal option:selected').attr("data-exonerado") == "SI") {
                        $("#lblExonerado").html("Exonerado");
                    } else {
                        $("#lblExonerado").html("");
                    }
                } else {
                    $("#lblExonerado").html("");
                }

                //if ($("#cbo_Sucursal").val() != "") {
                //    if ($("#cbo_Sucursal option:selected").attr("data-exonerado") == "SI") {
                //        $("#hfIMPUESTO").val("0");
                //        if (ObtenerQueryString("codigo") == undefined) {
                //            infoCustom2("Se considerará IGV: " + $('#hfIMPUESTO').val() + "%");
                //        }
                //    } else {
                //        //OBTENER IMPUESTO GENERAL A LAS VENTAS
                //        $.ajax({
                //            type: "post",
                //            url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=0021",
                //            contenttype: "application/json;",
                //            datatype: "json",
                //            async: false,
                //            success: function (datos) {
                //                if (datos != null) {
                //                    if (!isNaN(parseFloat(datos[0].VALOR))) {
                //                        $('#hfIMPUESTO').val(parseFloat(datos[0].VALOR) * 100);
                //                        if (ObtenerQueryString("codigo") == undefined) {
                //                            infoCustom2("Se considerará IGV: " + $('#hfIMPUESTO').val() + "%");
                //                        }
                //                    } else {
                //                        infoCustom2("El parámetro de Impuesto(0021) no es válido. Se considerará IGV 18%")
                //                        $('#hfIMPUESTO').val("18");
                //                    }
                //                }
                //                else { alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!"); }
                //            },
                //            error: function (msg) {
                //                alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!");
                //            }
                //        });
                //    }
                //}
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
            $("#txt_fec_emision").change();
        });
        //Agregado (Al cambiar de almacen, se cargan los productos correspondientes)
        //$('#cboAlmacen').on('change', function () {
        //    LimpiarCamposDetalle();
        //    if ($('#cboAlmacen').val() != null) {
        //        filltxtdescproducto('');
        //    }
        //});

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
                fillTxtResponsablePago();
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
            if ($('#cbo_modo_pago').val() == "0001" || $('#cbo_modo_pago').val() == "0000") { // CONTADO O CONTRAENTREGA
                $("#txt_fec_vencimiento").val($("#txt_fec_emision").val());
                $('#txtFechaPago').datepicker("setDate", "now");
                //CargarDatosCobroPorDefecto();
                $("#txtMonto").val($("#lblImporteCobrar").html());
                //$("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
                $("#txt_plazo_pago").val('0');
                if (($("#txtClientes").val() !== "" || $("#txtClientes").val().length !== 0) && ($("#hfPIDM").val() !== "" || $("#hfPIDM").val().length !== 0)) {
                    if (deuda != 0 && deuda != undefined) {
                        CargaDeudaCliente($("#hfPIDM").val());
                    }
                } else {
                    $("#divAlCredito").hide();
                }
                $("#p_DatCobro").show();
                $("#p_DatCobro2").show();
                $("#p_DatCobro3").show();
                $("#p_DatVuelto").show();
            } else {
                CargarDatosLineaCredito();
                calcularFechaVencimiento();
                $("#txtFechaPago").val("");
                $("#cbo_OrigenPago, #cbo_OrigenPago2, #cbo_OrigenPago3").select2("val", "").change().removeAttr("disabled");
                $("#cbo_Det_Origen, #cbo_Det_Origen2, #cbo_Det_Origen3").empty().select2("val", "").attr("disabled", "disabled");
                $("#cboMedioPago, #cboMedioPago2, #cboMedioPago3").empty().select2("val", "").attr("disabled", "disabled");
                $("#txtDestino, #txtDestino2, #txtDestino3").val("").attr("disabled", "disabled");
                $("#txtMonto").val("");
                $("#txtNroOpe, #txtNroOpe2, #txtNroOpe3").val("");
                $("#lbl_detalle1, #lbl_detalle1_2, #lbl_detalle1_3").html("-");
                $("#p_DatCobro").hide();
                $("#p_DatCobro input").parent().parent().removeClass("error");
                $("#p_DatCobro select").parent().parent().removeClass("error");
                $("#p_DatCobro .icon-ok").parent().remove();
                $("#p_DatCobro2 input").parent().parent().removeClass("error");
                $("#p_DatCobro2 select").parent().parent().removeClass("error");
                $("#p_DatCobro2 .icon-ok").parent().remove();
                $("#p_DatCobro2").hide();
                $("#p_DatCobro3 input").parent().parent().removeClass("error");
                $("#p_DatCobro3 select").parent().parent().removeClass("error");
                $("#p_DatCobro3 .icon-ok").parent().remove();
                $("#p_DatCobro3").hide();
                $("#p_DatVuelto").hide();
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
            if ($('#cboDocumentoVenta').val() == '0001' || $('#cboDocumentoVenta').val() == '0003') {
                if ($("#txt_fec_emision").val() != $("#txt_fec_transaccion").val()) { //DPORTA 31/01/2023
                    validarFechaEmision($("#txt_fec_emision").val(), $("#txt_fec_transaccion").val());
                }
            } else {
                if ($("#txt_fec_emision").val() != fechaEmisionAnterior) {
                    //CargarFactorImpuestoRentaVenta();
                    if ($("#cbo_modo_pago").val() == "0001") {
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
            }          
        });

        //Actualiza el plazo de pago al presionar "Enter"
        $('#txt_plazo_pago').bind('keypress', function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) { //Enter keycode
                calcularFechaVencimiento();
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
            $("#txtMonto").val($("#txt_monto_total").val()).keyup();
            $("#txtEfectivo").keyup();

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
            $("#txtMonto").val($("#txt_monto_total").val()).keyup();
            $("#txtEfectivo").keyup();
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
                //        if ($('#cboSerieDocVenta').val() == "") {
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

        $("#txtClientes").live("keyup", function (e) {
            $(this).siblings("ul").css("width", $(this).css("width"))
            if ($("#txtClientes").val().length <= 0) {
                $("#txtClientes").attr("disabled", true);
                $("#lblHabido").html("");
                $("#lblEstado").html("");
                $('#cbo_modo_pago, #chk_retencion, #txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true);
                $('#chk_retencion').parent().removeClass('checked');
                $('#cbo_modo_pago option:first-child').prop('selected', true);
                $('#cbo_modo_pago').change();
                $('#txt_plazo_pago').val('0');
                //if ($("#txt_fec_emision").val() != "") {
                //    $('#txt_fec_vencimiento').val($("#txt_fec_emision").val());
                //} else {
                //    $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                //}
                if ($("#txtNroDctoCliente").val() != "" && $("#txtClientes").val() != "") {
                    $('#cboTipoDoc').val('1').change();
                }

                $("#txtNroDctoCliente, #txt_id_proveedor, #txt_Retencion").val("");

                prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);
                $('#txt_fec_emision, #txt_fec_vencimiento').datepicker('setDate', 'now');

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

        $("#p_DatCobro2 .portlet-title").on("click", function () {//20/02
            $("#p_DatCobro2 .portlet-body").slideToggle();
            if ($("#p_DatCobro2 .portlet-title i").hasClass("icon-chevron-down")) {
                $("#p_DatCobro2 .portlet-title i").removeClass("icon-chevron-down");
                $("#p_DatCobro2 .portlet-title i").addClass("icon-chevron-up");
                //24/06/2022
                $('#cbo_OrigenPago2').select2("val", "Caja").change();
                if ($("#cbo_Det_Origen2 option").length > 0) {
                    $("#cbo_Det_Origen2").select2("val", $($("#cbo_Det_Origen2 option")[1]).val()).change();
                }
                //adicional 21/02
                if ($("#cboMedioPago2 option").length > 0) {
                    $("#cboMedioPago2").select2("val", "");
                    $("#cboMedioPago2").change();
                }
            }
            else {
                $("#p_DatCobro2 .portlet-title i").addClass("icon-chevron-down");
                $("#p_DatCobro2 .portlet-title i").removeClass("icon-chevron-up");
                $("#txtDestino2").val("").attr("disabled", "disabled");
                $("#txtNroOpe2").val("");
                $("#txtEfectivo2").val("");
                $("#lbl_detalle1_2").html("-");
                ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                $("#p_DatCobro2 input").parent().parent().removeClass("error");
                $("#p_DatCobro2 select").parent().parent().removeClass("error");
                $("#p_DatCobro2 .icon-ok").parent().remove();
            }
        });

        $("#p_DatCobro3 .portlet-title").on("click", function () {//20/02
            $("#p_DatCobro3 .portlet-body").slideToggle();
            if ($("#p_DatCobro3 .portlet-title i").hasClass("icon-chevron-down")) {
                $("#p_DatCobro3 .portlet-title i").removeClass("icon-chevron-down");
                $("#p_DatCobro3 .portlet-title i").addClass("icon-chevron-up");
                //24/06/2022
                $('#cbo_OrigenPago3').select2("val", "Caja").change();
                if ($("#cbo_Det_Origen3 option").length > 0) {
                    //var cbo = $("#cbo_Det_Origen3 option");
                    $("#cbo_Det_Origen3").select2("val", $($("#cbo_Det_Origen3 option")[1]).val()).change();
                }
                //adicional 21/02
                if ($("#cboMedioPago3 option").length > 0) {
                    $("#cboMedioPago3").select2("val", "");
                    $("#cboMedioPago3").change();
                }
            }
            else {
                $("#p_DatCobro3 .portlet-title i").addClass("icon-chevron-down");
                $("#p_DatCobro3 .portlet-title i").removeClass("icon-chevron-up");
                $("#txtDestino3").val("").attr("disabled", "disabled");
                $("#txtNroOpe3").val("");
                $("#txtEfectivo3").val("");
                $("#lbl_detalle1_3").html("-");
                ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                $("#p_DatCobro3 input").parent().parent().removeClass("error");
                $("#p_DatCobro3 select").parent().parent().removeClass("error");
                $("#p_DatCobro3 .icon-ok").parent().remove();
            }
        });

        $("#btnLimpiarCobro").on("click", function () {//20/02

            $("#cbo_OrigenPago, #cbo_OrigenPago2, #cbo_OrigenPago3").select2("val", "").change().removeAttr("disabled");
            $("#cbo_Det_Origen, #cbo_Det_Origen2, #cbo_Det_Origen3").empty().select2("val", "").attr("disabled", "disabled");
            $("#cboMedioPago, #cboMedioPago2, #cboMedioPago3").empty().select2("val", "").attr("disabled", "disabled");
            $("#txtDestino, #txtDestino2, #txtDestino3").val("").attr("disabled", "disabled");
            $("#txtNroOpe, #txtNroOpe2, #txtNroOpe3").val("");
            $("#txtEfectivo,#txtEfectivo2, #txtEfectivo3").val("");
            $("#lbl_detalle1, lbl_detalle1_2, lbl_detalle1_3").html("-");
            $("#txtAcumulado, #txtVuelto").val("0.00");
            $("#p_DatCobro input").parent().parent().removeClass("error");
            $("#p_DatCobro select").parent().parent().removeClass("error");
            $("#p_DatCobro .icon-ok").parent().remove();

            $("#p_DatCobro2 input").parent().parent().removeClass("error");
            $("#p_DatCobro2 select").parent().parent().removeClass("error");
            $("#p_DatCobro2 .icon-ok").parent().remove();
            $("#p_DatCobro2 .portlet-title").click();

            $("#p_DatCobro3 input").parent().parent().removeClass("error");
            $("#p_DatCobro3 select").parent().parent().removeClass("error");
            $("#p_DatCobro3 .icon-ok").parent().remove();
            $("#p_DatCobro3 .portlet-title").click();
        })

        $("#btnActualizarProductos").on("click", function () {
            if (vErrors(['cbo_Sucursal', 'cbo_Empresa'])) {
                LimpiarCamposDetalle();
                filltxtdescproducto('');
            }
        });

        $("#btnRecargarPersona").on("click", function () {
            $("#hfPIDM").val("");
            fillTxtCliente2("#txtClientes", "");
            //fillTxtResponsablePago();
            if ($("#chkResponsablePago").is(":checked")) {
                $("#chkResponsablePago").click();
                $("#chkResponsablePago").parent().removeClass("checked");
            }
            $("#txtClientes").val("").keyup();
            $("#cbo_direccion").empty().html("<option></option>")
            $("#cbo_direccion").select2("val", "")
            if ($("#txtNroDctoCliente").val() != "") {
                $("#txtNroDctoCliente").focus();
            }
        });

        //EMAIL
        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtcontenido').val("");
            $('#txtAsunto').val($('#txt_comentario').val());
            cargarCorreos();
            $('#divMail').modal('show');
        });

        //WHATSAPP
        $('#btnWhatsapp').click(function (e) {
            $('#txtcontenidoWhatsapp').attr('disabled', false);
            $('#txtcontenidoWhatsapp').val("");
            cargarTelefonos();
            $('#divWhatsapp').modal('show');
        });

        //PDF
        $('#btnPdfAlt').click(function (e) {
            DescargarPDFAlt($('#txtNumDctoComp').val());
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

        $('#btnagregarAnticipoDetalle').click(function (e) {
            ListarAnticipos();
            $('#divAnticipos').modal('show');
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

        $('#btnNroAtencion').on('click', function () {
            if (vErrors(["cbo_Empresa", "cbo_Sucursal"])) {
                mostrarModalBuscarDocumento();
            }
        });

        $('#chk_Autodetraccion').click(function () {//DPORTA 24/02/2021 
            var checked = $(this).is(':checked');

            if (checked) {
                $("#txt_monto_total").val($("#txt_subtotal").val())
                $("#lblImporteCobrar").html($("#txt_subtotal").val());
                $("#txtMonto").val("");
                $("#txtMonto").val($("#txt_monto_total").val());
            } else {
                CalcularDatosMonetarios();
            }
        });
    };

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
            sHtml += "<th style='text-align:center;font-weight: 600;'>Cuenta</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Descripción</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Centro de Costos</th>";            
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
                    var sCuenta = value.CTAS_CODE;
                    var sDescripcionItem = value.CTAS;
                    var sCCosto = value.CCOSTO_DET;                    
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
                    sHtml += ("<td style='text-align:right;'>" + sCuenta + "</td>");
                    sHtml += ("<td>" + sDescripcionItem + "</td>");
                    sHtml += ("<td>" + sCCosto + "</td>");                    
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
        //$("#cboAlmacen").val($("#cbo_Sucursal option:selected").attr("data-almc"));
        //$("#cboAlmacen").change();
        if (cod !== undefined) {

            $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LVU_CAB&p_FVBVTAC_CODE=" + cod,
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
                    //DPORTA
                    $("#txtNumAt").val(datos[0].DCTO_CODE_REF);
                    $("#txtKardex").val(datos[0].KARDEX);
                    $("#divFilaCliente2").hide();
                    $("#btnNroAtencion").attr("style", "display:none");
                    //$("#p_DatCredito .portlet-title").click();
                    //$("#p_DatTributaciones .portlet-title").click();
                    $("#p_DatCredito .portlet-body").addClass("display:none");
                    $("#p_DatTributaciones .portlet-body").addClass("display:none");
                    //F2
                    $("#cbo_Empresa").select2('val', datos[0].EMPRESA).change();
                    $("#cbo_Sucursal").select2('val', datos[0].SUCURSAL).change();
                    //F3 - Carga datos de cliente
                    carga_ini_ind = true;
                    if ($("#hfCompletoInd").val() == "N") {
                        $("#txtClientes").attr("disabled", false);
                    }
                    $("#cboTipoDoc").select2("val", datos[0].CLIE_DOID).change();
                    $("#txtNroDctoCliente").val(datos[0].CLIE_DCTO_NRO);
                    $("#txtClientes").val(datos[0].RAZON_SOCIAL);
                    //$("#txtClientes").keyup().siblings("ul").children("li").click();

                    // COMBO DIRECCION 
                    $("#cbo_direccion").empty()
                    $("#cbo_direccion").html("<option value=''>" + datos[0].DIRECCION_VENTA + "</option>")
                    $("#cbo_direccion").select2('val', '')

                    //F4 - Documento venta
                    //$("#cboDocumentoVenta").select2("val", datos[0].DCTO_CODE).change();
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

                    if (datos[0].AUTODETRACCION == "N") { //DPORTA 25/02/2021
                        $("#chk_Autodetraccion").prop('checked', false).parent().removeClass('checked');
                    } else {
                        $("#chk_Autodetraccion").prop('checked', true).parent().addClass('checked');
                    }

                    //Si el documento ha sido COMPLETADO se bloquea la edicion y se carga el correlativo correspondiente
                    if ($("#hfCompletoInd").val() == "S") {

                        $("#hfImprimirPreciosIGV").val(datos[0].IGV_IMPR_IND);
                        $("#btnImprimir, #btnImprimirST").attr("style", "display:inline-block;margin-top:2px;");
                        $("#btnImprimir").html("<i class='icon-print'></i> Imprimir Doc.");
                        $("#btnImprimirST").html("<i class='icon-print'></i> Imprimir Ticket.");
                        $(".btnImprimir").show();
                        $('#btnMail').removeClass('hidden');
                        $('#btnWhatsapp').removeClass('hidden');
                        $("#btnPdfAlt").removeClass('hidden');

                        $("#lblCopia").css("display", "inline-block");
                        $("#divBtnsMantenimiento").attr("style", "display:none");

                        //F4-DG
                        //$("#cboSerieDocVenta").empty();
                        //$("#cboSerieDocVenta").append('<option value="' + datos[0].CODIGO + '" data-ticket="' + datos[0].FORMATO_TICKET_IND + '" >' + datos[0].DCTO_SERIE + '</option>');
                        //$("#cboSerieDocVenta").select2("val", datos[0].CODIGO);
                        //$("#txtNroDocVenta").val(datos[0].DCTO_NRO);
                        //$("#lblTipoCorrelativo").html("[" + datos[0].COD_AUT + "]");
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
                        $("#p_DatCobro, #p_DatCobro2, #p_DatCobro3, #p_DatVuelto").fadeOut();
                        //$("#p_DatTributaciones .portlet-title").click();

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
                    $("#lblImporteTotal").html(datos[0].VALOR);
                    //FIN CARGA TOTALES

                    var monedaCabecera = datos[0].MONEDA;

                    //var validarDoc = $('#cboSerieDocVenta').text();
                    //if (validarDoc.substring(0, 1) == 'F' || validarDoc.substring(0, 1) == 'B') {
                    //    //$('#btnEFac').removeClass('hidden');
                    //}

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

                                    //Almacen
                                    objProd.ALMC = datos2[i].ALMC;
                                    objProd.DESC_ALMC = datos2[i].DESC_ALMC;

                                    //CATEGORIA CLIENTE
                                    objProd.CAT_CODE = datos2[i].CAT_CODE;
                                    objProd.CAT_DESC = datos2[i].CAT_DESC;

                                    $("#hfcod_cate").val(datos2[i].CAT_CODE);
                                    $("#hfdes_cate").val(datos2[i].CAT_DESC);

                                    //Despacho ven venta
                                    objProd.DESP_VENTA = datos2[i].DESP_VENTA;

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
                                    $("#cboDocumentoVenta").select2("val", datos[0].DCTO_CODE).change();
                                    $("#cboSerieDocVenta").empty();
                                    $("#cboSerieDocVenta").append('<option value="' + datos[0].CODIGO + '" data-ticket="' + datos[0].FORMATO_TICKET_IND + '" >' + datos[0].DCTO_SERIE + '</option>');
                                    $("#cboSerieDocVenta").select2("val", datos[0].CODIGO);
                                    $("#txtNroDocVenta").val(datos[0].DCTO_NRO);
                                    $("#lblTipoCorrelativo").html("[" + datos[0].COD_AUT + "]");
                                    $('#cboSerieDocVenta').attr('disabled', true);
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
                    if (prmtACON == "SI") {
                        var sCodVenta = ObtenerQueryString("codigo");//AVENGER

                        let sCodMovContab = datos[0].MOVCONT_CODE;
                        sCodMovContab = (sCodMovContab === null ? "" : sCodMovContab);
                        if (sCodMovContab !== "") {
                            $("#divGenAsiento").hide();
                            //fnGetMovContable(sCodMovContab); //AVENGER
                            fnGetMovContable(sCodVenta);
                        }
                    }

                    //if (prmtACON == "SI") {
                    //    var sCodVenta = ObtenerQueryString("codigo");//AVENGER

                    //    let sCodMovContab = datos[0].MOVCONT_CODE;
                    //    let sCodMovContabCobro = datos[0].ASIENTO_COBRO;
                    //    sCodMovContab = (sCodMovContab === null ? "" : sCodMovContab);
                    //    if (sCodMovContab !== "" || sCodMovContabCobro == 'SI') {
                    //        if (sCodMovContab !== "") {
                    //            $("#divGenAsiento").hide();
                    //        }                            
                    //        //fnGetMovContable(sCodMovContab); //AVENGER
                    //        fnGetMovContable(sCodVenta);
                    //    }
                    //}
                },
                error: function (msg) {
                    alertCustom(msg);
                }
            });
            //Desbloquear("ventana");
        } else {
            $('#modificar').attr('disabled', true);
            $('#modificar').hide();

            if (prmtACON == "NO") {
                $("#asientos_contables").hide();
            }
        }
    }

    var fnGenerarAsiento = function (sCodVenta) {

        var data = new FormData();
        data.append("OPCION", "GEN_ASIENTO");
        data.append("p_CODE", $("#txtNumDctoComp").val());
        data.append("USUA_ID", $("#ctl00_txtus").val());
        data.append("p_NCMOCONT_CODIGO", sCodModulo);

        $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmdocv.ashx",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
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

                if (response == "SIN_CTA_CONTABLE_ORIGEN_COBRO") {
                    infoCustom2("No se pudo generar el asiento. El origen de cobro no tiene asociada una cuenta contable.");
                    return;
                }

                if (response == "NO_GENERA_ASIENTO_VENTA") {
                    infoCustom2("Solo se genera asiento de cobro para este tipo de documento.");
                    return;
                }

                $("#divGenAsiento").hide();
                fnGetMovContable(sCodVenta); //AVENGER

                exito();
            },
            error: function (msg) {
                noexitoCustom("No se pudo generar el asiento.");
            }
        });
    };

    return {
        init: function () {
            //No usan CTLG
            cargarParametrosSistema();          
            plugins();
            eventoControles();
            fillCboModoPago();
            fillCboTipoDoc();
            //Usan CTLG            
            fillCboEmpresa();
            fillcboMoneda();            
            if (ObtenerQueryString("codigo") == undefined) {
                $("#cboSerieDocVenta").select2("val", "");
                CargarDatosCobro();
                CrearListaAnticiposObjeto();
            }    
            cargaInicial();
            fnFillBandejaCtas();
        }
    };
}();

function mostrarModalBuscarDocumento() { //DPORTA
    Bloquear("ventana")
    var html =
        '<div id="_buscarDocumento" style="display: block; width: 60%; left: 20%;"  class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">' +
        '<div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color:#ffffff;">' +
        ' <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">' +
        '  <i class="icon-remove"></i>' +
        ' </button>' +
        '        <h4 id="myModalLabel">ATENCIONES PENDIENTES DE PAGO</h4>' +
        '    </div>' +
        '    <div class="modal-body" id="ventanaBuscarDocumento">' +
        '       <div class="row-fluid" >' +
        '         <div class="span12" id="divTblDocumentos" >' +
        '            <table id="tblBuscarDocumento" class="display DTTT_selectable" style="width: 100%;">' +
        '                 <thead>' +
        '                    <tr>' +
        '                         <th>NRO. ATENCIÓN</th>' +
        '                         <th>ID KARDEX</th>' +
        '                         <th>CLIENTE</th>' +
        '                         <th>MONTO</th>' +
        '                         <th>ABOGADO</th>' +
        '                         <th>FECHA EMISIÓN</th>' +
        '                     </tr>' +
        '                 </thead>' +
        '                 <tbody>' +
        '                    <tr>' +
        '                       <td></td>' +
        '                       <td></td>' +
        '                       <td></td>' +
        '                       <td></td>' +
        '                       <td></td>' +
        '                       <td></td>' +
        '                   </tr>' +
        '               </tbody>' +
        '            </table>    ' +
        '           </div>' +
        '       </div>' +
        '       <div class="row-fluid" >' +
        '              <div class="form-actions">' +
        '                     <p>*Haga clic en una fila para seleccionar.</p>' +
        '              </div>' +
        '       </div>' +
        '    </div>' +
        '</div>'
        ;
    if ($("#_buscarDocumento").html() == undefined) {
        $("body").append(html);
    }
    fillTblDocumentos()
    Desbloquear("ventana")
    $("#tblBuscarDocumento").DataTable({
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla.",
            "sZeroRecords": "No hay datos disponibles en la tabla."
        },
        "columnDefs": [
            {
                "targets": [2],
                "visible": true,
                "searchable": false
            }
        ]
    });
    var oTable = $('#tblBuscarDocumento').dataTable();
    oTable.fnSort([[0, "desc"]]);
    $("#_buscarDocumento").modal('show');

    //Por algún motivo el primer if identifica la caja pero pierde el foco a los pocos segundos
    //La segunda función solo funciona si el mouse pasa por el botón de cerrar modal, un error que solo sucede en el primer intento
    //Para que el foco identifique la caja y se mantenga ahí al primer intento hay que usarse ambos en simultaneo
    if ($("#_buscarDocumento").hasClass('in') == true) {
        $('#tblBuscarDocumento_filter.dataTables_filter input[type=search]').focus();
    }
    $('#_buscarDocumento').on('shown.bs.modal', function () {
        $('#tblBuscarDocumento_filter.dataTables_filter input[type=search]').focus();
    });
    
}

function fillTblDocumentos() { //DPORTA
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/NVMDOVS.ashx?OPCION=LISTAR_ATENCIONES",
        async: false,
        success: function (datos) {
            if (datos != null) {
                $('#divTblDocumentos').html(datos)
                $("#tblDocumentosSisnot").DataTable({
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    }
                });
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

//LO QUE SE VA A HACER AL SELECCIONAR UN REGISTRO 'DPORTA
function setSeleccionDocumento(nro_atencion, cliente, pidm_abogado, valor, nombre_abogado, kardex) {//POR EL MOMENTO TODOS LOS SERVICIOS ESTÁN EN MONEDA SOLES
    if (detallesVenta.length != 0) {//SI ES QUE EL DETALLE ESTÁ LLENO Y SE SELECCIONA OTRO N° DE ATENCIÓN
        detallesVenta = [];
    }
    $("#txtKardex").val(kardex);
    $("#txtNumAt").val(nro_atencion);
    $("#txtClienteReferencial").val(cliente);

    $("#txtEfectivo, #txtEfectivo2, #txtEfectivo3").val("");
    if (!($("#p_DatCobro2 .portlet-title i").hasClass("icon-chevron-down"))) {
        $("#p_DatCobro2 .portlet-title").click();
    }
    if (!($("#p_DatCobro3 .portlet-title i").hasClass("icon-chevron-down"))) {
        $("#p_DatCobro3 .portlet-title").click();
    }
    ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
    $("#cboVendedor").select2("val", pidm_abogado).change(); //AQUÍ IRAN LOS ABOGADOS SUPUESTAMENTE
    if ($("#cboVendedor").val() != '') {
        $("#cboVendedor").attr("disabled", "disabled");
    } else {
        $("#cboVendedor").removeAttr("disabled", "disabled");
    }
    //$("#cbo_moneda").select2("val", moneda).change();
    $("#cbo_moneda").attr("disabled", "disabled");

    $("#divDctoSeleccionado").slideDown();

    $(".doc_fila").css("background-color", "#f9f9f9 !important");
    $("#doc_fila_" + nro_atencion + "").css("background-color", "#cbcbcb !important");

    $("#_buscarDocumento").modal('hide');

    //LISTAR DETALLES
    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=LISTAR_DETALLE_ATENCION&p_NRO_ATENCION=" + nro_atencion,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {

            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {

                    let item_producto = datos[i].ITEM_PRODUCTO;
                    let codigo_producto = datos[i].CODIGO_PRODUCTO;
                    let cantidad_producto = datos[i].CANTIDAD_SERVICIO;
                    let valor_producto = datos[i].VALOR_SERVICIO;
                    let prec_min = 0;
                    let tipoDocCode = $("#cboSerieDocVenta :selected").attr("data-tipoDocCode");//DPORTA SIN-IMPUESTOS
                    //LISTAR DETALLES
                    $.ajax({
                        type: "POST",
                        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=LISTAR_DATOS_PRODUCTO&PROD_CODE=" + codigo_producto + "&CTLG=" + $("#cbo_Empresa").val() + "&ALMC_CODE=" + $("#cbo_Sucursal").val() + "&CANTIDAD_PROD=" + cantidad_producto,
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (datos2) {
                            if (datos2 != null) {
                                for (var i = 0; i < datos2.length; i++) {
                                    var objProd = {};

                                    objProd.ITEM = item_producto;
                                    objProd.CODIGO = codigo_producto;
                                    objProd.PROD_CODE_ANTIGUO = datos2[i].PROD_CODIGO_ANTIGUO;
                                    objProd.TIPO_BIEN = datos2[i].TIPO_BIEN;

                                    objProd.CODE_UNIDAD = datos2[i].UNIDAD;
                                    //objProd.UNIDAD = datos2[i].UNIDAD;
                                    objProd.DESC_UNIDAD = datos2[i].DESC_UNIDAD;
                                    objProd.GLOSA = datos2[i].GLOSA;

                                    //Almacen
                                    objProd.ALMC = datos2[i].ALMC;
                                    objProd.DESC_ALMC = datos2[i].DESC_ALMC;

                                    //CATEGORIA CLIENTE
                                    objProd.CAT_CODE = "";
                                    objProd.CAT_DESC = "";

                                    //Despacho ven venta
                                    objProd.DESP_VENTA = datos2[i].DESP_VENTA;

                                    objProd.NOMBRE_IMPRESION = datos2[i].NOMBRE_IMPRESION;

                                    objProd.CANTIDAD = cantidad_producto;

                                    objProd.MONEDA = datos2[i].MONEDA;
                                    objProd.PRECIO_IND = datos2[i].PRECIO_IND;
                                    if ($("#hfCompletoInd").val() == "N") {
                                        //OBTENER DATOS PRECIOS
                                        if (datos2[i].PRECIO_IND = "E") {
                                            objProd.PRECIO_VENTA = ObtenerPreciosProductoJSON(codigo_producto, datos2[i].PRECIO_IND, datos2[i].TIPO_BIEN, datos2[i].EMPRESA, datos2[i].SUCURSAL, "PV");
                                            objProd.PRECIO_MINIMO = ObtenerPreciosProductoJSON(codigo_producto, datos2[i].PRECIO_IND, datos2[i].PRECIO_IND, datos2[i].EMPRESA, datos2[i].SUCURSAL, "PM");
                                            prec_min = objProd.PRECIO_MINIMO;
                                            objProd.RANGOS_PRECIO = [];

                                        } else {
                                            objProd.PRECIO_VENTA = "0";
                                            objProd.PRECIO_MINIMO = "0";
                                            objProd.RANGOS_PRECIO = ObtenerPreciosProductoJSON(codigo_producto, datos2[i].PRECIO_IND, datos2[i].PRECIO_IND, datos2[i].EMPRESA, datos2[i].SUCURSAL, "R");
                                        }
                                        objProd.DESCUENTO = 0;
                                        objProd.ISC = datos2[i].ISC;
                                    }

                                    if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') {//DPORTA SIN-IMPUESTOS
                                        if ($("#cbo_moneda").val() == '0002') {//SERVICIOS EN SOLES
                                            let val_prod = parseFloat(valor_producto).toFixed(2);
                                            let val_min = parseFloat(prec_min).toFixed(2);
                                            if (parseFloat(val_min) > parseFloat(val_prod)) { //COMO LOS PRECIOS VIENEN DE SISNOT
                                                objProd.MONTO_DESCUENTO = datos2[i].DESCUENTO;
                                                objProd.PRECIO_DETALLE = parseFloat(prec_min).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                                objProd.PU = parseFloat(prec_min).toFixed(prmtDIGP);
                                                objProd.TOTAL_BRUTO = (parseFloat(cantidad_producto) * parseFloat(prec_min)).toFixed(prmtDIGP);
                                                objProd.TOTAL_NETO = (parseFloat(cantidad_producto) * parseFloat(prec_min)).toFixed(prmtDIGP);                                                
                                                if (tipoDocCode == '0001') {
                                                    objProd.MONTO_DETRAC = parseFloat(datos2[i].DETRACCION_DECIMALES * objProd.TOTAL_NETO).toFixed(prmtDIGP);
                                                    objProd.DETRACCION = datos2[i].DETRACCION_DECIMALES;
                                                } else {
                                                    objProd.MONTO_DETRAC = parseFloat(datos2[i].DETRACCION_DECIMALES * 0).toFixed(prmtDIGP);
                                                    objProd.DETRACCION = datos2[i].DETRACCION_DECIMALES;
                                                }                                                
                                                objProd.MONTO_ISC = datos2[i].ISC;
                                            } else {
                                                objProd.MONTO_DESCUENTO = datos2[i].DESCUENTO;
                                                objProd.PRECIO_DETALLE = parseFloat(valor_producto).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                                objProd.PU = parseFloat(valor_producto).toFixed(prmtDIGP);
                                                objProd.TOTAL_BRUTO = (parseFloat(cantidad_producto) * parseFloat(valor_producto)).toFixed(prmtDIGP);
                                                objProd.TOTAL_NETO = (parseFloat(cantidad_producto) * parseFloat(valor_producto)).toFixed(prmtDIGP);
                                                if (tipoDocCode == '0001') {
                                                    objProd.MONTO_DETRAC = parseFloat(datos2[i].DETRACCION_DECIMALES * objProd.TOTAL_NETO).toFixed(prmtDIGP);
                                                    objProd.DETRACCION = datos2[i].DETRACCION_DECIMALES;
                                                } else {
                                                    objProd.MONTO_DETRAC = parseFloat(datos2[i].DETRACCION_DECIMALES * 0).toFixed(prmtDIGP);
                                                    objProd.DETRACCION = datos2[i].DETRACCION_DECIMALES;
                                                }  
                                                objProd.MONTO_ISC = datos2[i].ISC;
                                            }
                                        } else {//SI ES QUE LOS SERVICIOS SE EMPIEZAN A PAGAR EN DOLARES (PERO AUN NO VALE)

                                            objProd.MONTO_DESCUENTO = datos2[i].DESCUENTO / parseFloat($("#txt_valor_cambio").val());
                                            objProd.PRECIO_DETALLE = (datos2[i].PU / parseFloat($("#txt_valor_cambio").val())).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                            objProd.PU = (datos2[i].PU / parseFloat($("#txt_valor_cambio").val())).toFixed(prmtDIGP);
                                            objProd.TOTAL_BRUTO = (parseFloat(cantidad_producto) * parseFloat(datos2[i].PU / parseFloat($("#txt_valor_cambio").val()))).toFixed(prmtDIGP);
                                            objProd.TOTAL_NETO = (datos2[i].TOTAL / parseFloat($("#txt_valor_cambio").val())).toFixed(prmtDIGP);
                                            if (tipoDocCode == '0001') {
                                                objProd.MONTO_DETRAC = parseFloat((datos2[i].DETRACCION_DECIMALES * datos2[i].TOTAL) / parseFloat($("#txt_valor_cambio").val())).toFixed(prmtDIGP);
                                                objProd.DETRACCION = datos2[i].DETRACCION_DECIMALES;
                                            } else {
                                                objProd.MONTO_DETRAC = parseFloat((datos2[i].DETRACCION_DECIMALES * 0) / parseFloat($("#txt_valor_cambio").val())).toFixed(prmtDIGP);
                                                objProd.DETRACCION = datos2[i].DETRACCION_DECIMALES;
                                            }                                            
                                            objProd.MONTO_ISC = (datos2[i].ISC / parseFloat($("#txt_valor_cambio").val())).toFixed(2);
                                        }
                                    } else {
                                        if ($("#cbo_moneda").val() == '0002') {//SERVICIOS EN SOLES
                                            let val_prod = parseFloat(valor_producto).toFixed(2);
                                            let val_min = parseFloat(prec_min).toFixed(2);
                                            if (parseFloat(val_min) > parseFloat(val_prod)) { //COMO LOS PRECIOS VIENEN DE SISNOT
                                                objProd.MONTO_DESCUENTO = datos2[i].DESCUENTO;
                                                objProd.PRECIO_DETALLE = parseFloat(prec_min).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                                objProd.PU = parseFloat(prec_min).toFixed(prmtDIGP);
                                                objProd.TOTAL_BRUTO = (parseFloat(cantidad_producto) * parseFloat(prec_min)).toFixed(prmtDIGP);
                                                objProd.TOTAL_NETO = (parseFloat(cantidad_producto) * parseFloat(prec_min)).toFixed(prmtDIGP);
                                                objProd.MONTO_DETRAC = parseFloat(0).toFixed(prmtDIGP);
                                                objProd.DETRACCION = datos2[i].DETRACCION_DECIMALES;
                                                objProd.MONTO_ISC = 0;
                                            } else {
                                                objProd.MONTO_DESCUENTO = datos2[i].DESCUENTO;
                                                objProd.PRECIO_DETALLE = parseFloat(valor_producto).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                                objProd.PU = parseFloat(valor_producto).toFixed(prmtDIGP);
                                                objProd.TOTAL_BRUTO = (parseFloat(cantidad_producto) * parseFloat(valor_producto)).toFixed(prmtDIGP);
                                                objProd.TOTAL_NETO = (parseFloat(cantidad_producto) * parseFloat(valor_producto)).toFixed(prmtDIGP);
                                                objProd.MONTO_DETRAC = parseFloat(0).toFixed(prmtDIGP);
                                                objProd.DETRACCION = datos2[i].DETRACCION_DECIMALES;
                                                objProd.MONTO_ISC = 0;
                                            }
                                        } else {//SI ES QUE LOS SERVICIOS SE EMPIEZAN A PAGAR EN DOLARES (PERO AUN NO VALE)

                                            objProd.MONTO_DESCUENTO = datos2[i].DESCUENTO / parseFloat($("#txt_valor_cambio").val());
                                            objProd.PRECIO_DETALLE = (datos2[i].PU / parseFloat($("#txt_valor_cambio").val())).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                            objProd.PU = (datos2[i].PU / parseFloat($("#txt_valor_cambio").val())).toFixed(prmtDIGP);
                                            objProd.TOTAL_BRUTO = (parseFloat(cantidad_producto) * parseFloat(datos2[i].PU / parseFloat($("#txt_valor_cambio").val()))).toFixed(prmtDIGP);
                                            objProd.TOTAL_NETO = (datos2[i].TOTAL / parseFloat($("#txt_valor_cambio").val())).toFixed(prmtDIGP);
                                            if (tipoDocCode == '0001') {
                                                objProd.MONTO_DETRAC = parseFloat((datos2[i].DETRACCION_DECIMALES * datos2[i].TOTAL) / parseFloat($("#txt_valor_cambio").val())).toFixed(prmtDIGP);
                                                objProd.DETRACCION = datos2[i].DETRACCION_DECIMALES;
                                            } else {
                                                objProd.MONTO_DETRAC = parseFloat((datos2[i].DETRACCION_DECIMALES * 0) / parseFloat($("#txt_valor_cambio").val())).toFixed(prmtDIGP);
                                                objProd.DETRACCION = datos2[i].DETRACCION_DECIMALES;
                                            }
                                            objProd.MONTO_ISC = (datos2[i].ISC / parseFloat($("#txt_valor_cambio").val())).toFixed(2);
                                        }
                                    }


                                    objProd.CTAS_CODE = "";
                                    objProd.CECO_CODE = "";
                                    objProd.TIPO_PROD = "";
                                    objProd.SERIADO = "N";
                                    objProd.COSTO_PRODUCTO = 0;
                                    objProd.ALMACENABLE = "N";
                                    objProd.CODE_DCTO_ORIGEN = "";

                                    detallesVenta.push(objProd);
                                }

                                if ($("#hfCompletoInd").val() == "N") { //NO COMPLETADO
                                    LimpiarCamposDetalle();
                                    var datos2 = ObtenerTablaDetalles();
                                    ListarTablaDetalles(datos2);
                                    sortTable();
                                } else {
                                    var datos2 = ObtenerTablaDetallesCompletado();
                                    ListarTablaDetalles(datos2);
                                    sortTable();
                                    $(".btnEliminarDetalle").remove();
                                    $("#tabla_det").DataTable().column(0).visible(false);
                                }

                                CalcularDetraccion();
                                CalcularDatosMonetarios();
                                $("#rbRedondeo").removeAttr("disabled");
                                if ($("#hfPermisoModificarVenta").val() == "N") {
                                    $(".btnEliminarDetalle").remove();
                                    $("#tabla_det").DataTable().column(0).visible(false);
                                    //$("#divAgregarProducto,#div_btn_add_prods").hide();
                                }                             
                                //} else {
                                //    $("#rbRedondeo,#rbDonacion").removeAttr("disabled");
                                //    CalcularDetraccion();
                                //    CalcularDatosMonetarios();
                                //}
                                //$("#divDetalleVenta1").attr("style", "display:none"); 
                            }

                        },
                        error: function (msg) {
                            alertCustom(msg);
                        }
                    });
                }
            }
        },
        error: function (msg) {
            alertCustom(msg);
        }
    });
    //FIN LISTAR DETALLES
}

function sortTable() {//ORDENA LA TABLA ASCENDENTEMENTE POR EL ITEM (DPORTA)
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tabla_det");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function ValidarSuma(valor1, valor2, valor3) { //27/02  DPORTA
    var sumaAcumulada;
    sumaAcumulada = parseFloat(valor1) + parseFloat(valor2) + parseFloat(valor3);
    $("#txtAcumulado").val(parseFloat(sumaAcumulada).toFixed(2));
    if (sumaAcumulada > $("#txtMonto").val()) {
        var vuelto;
        vuelto = parseFloat(sumaAcumulada) - parseFloat($("#txtMonto").val());
        $("#txtVuelto").val(parseFloat(vuelto).toFixed(2));
    } else {
        $("#txtVuelto").val("0.00");
    }
}

function ValidarTotales() {//21/02
    if ($("#cboMedioPago").val() != "0008") { // SI NO ES EFECTIVO DIRETO
        var sum2;
        var sum3;

        if ($("#txtEfectivo2").val() == "") {
            sum2 = 0;
        } else {
            sum2 = parseFloat($("#txtEfectivo2").val().replace(",", ""));
        }
        if ($("#txtEfectivo3").val() == "") {
            sum3 = 0;
        } else {
            sum3 = parseFloat($("#txtEfectivo3").val().replace(",", ""));
        }
        if (sum2 + sum3 + parseFloat($("#txtEfectivo").val().replace(",", "")) > parseFloat($("#txtMonto").val())) {
            if (parseFloat($("#txtMonto").val() - sum2 - sum3) >= 0) {
                parseFloat($("#txtEfectivo").val(parseFloat($("#txtMonto").val() - sum2 - sum3)))
            } else {
                $("#txtEfectivo").val("");
            }
        }
        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), sum2, sum3); //27/02
    } else {
        if ($("#txtEfectivo2").val() == "") {
            sum2 = 0;
        } else {
            sum2 = parseFloat($("#txtEfectivo2").val().replace(",", ""));
        }
        if ($("#txtEfectivo3").val() == "") {
            sum3 = 0;
        } else {
            sum3 = parseFloat($("#txtEfectivo3").val().replace(",", ""));
        }
        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), sum2, sum3); //27/02
    }
}

function ValidarTotales2() {//21/02
    var sumt;
    var sum3;

    if ($("#txtEfectivo").val() == "") {
        sumt = 0;
    } else {
        sumt = parseFloat($("#txtEfectivo").val().replace(",", ""));
    }
    if ($("#txtEfectivo3").val() == "") {
        sum3 = 0;
    } else {
        sum3 = parseFloat($("#txtEfectivo3").val().replace(",", ""));
    }
    if (sumt + sum3 + parseFloat($("#txtEfectivo2").val().replace(",", "")) > parseFloat($("#txtMonto").val())) {
        if (parseFloat($("#txtMonto").val() - sumt - sum3) >= 0) {
            parseFloat($("#txtEfectivo2").val(parseFloat($("#txtMonto").val() - sumt - sum3)))
        } else {
            $("#txtEfectivo2").val("");
        }
    }
    ValidarSuma(sumt, ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), sum3); //27/02
}

function ValidarTotales3() {//21/02
    var sumt;
    var sum2;

    if ($("#txtEfectivo").val() == "") {
        sumt = 0;
    } else {
        sumt = parseFloat($("#txtEfectivo").val().replace(",", ""));
    }
    if ($("#txtEfectivo2").val() == "") {
        sum2 = 0;
    } else {
        sum2 = parseFloat($("#txtEfectivo2").val().replace(",", ""));
    }
    if (sumt + sum2 + parseFloat($("#txtEfectivo3").val().replace(",", "")) > parseFloat($("#txtMonto").val())) {
        if (parseFloat($("#txtMonto").val() - sumt - sum2) >= 0) {
            parseFloat($("#txtEfectivo3").val(parseFloat($("#txtMonto").val() - sumt - sum2)))
        } else {
            $("#txtEfectivo3").val("");
        }
    }
    ValidarSuma(sumt, sum2, ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", ""))); //27/02
}

function cargarParametrosSistema() {
    let filtro = "DIGP,REDN,DETR,RETN,RETR,IMRE,BFDV,ODON,ADET,ACON,CURS,MIGO,0021,CLIE,GLIT"; //Aquí van los parámetros que se van a utilizar en la pantalla y luego se le hace su case
    //Se hizo así para que en una sola consulta traiga los datos necesarios y no esté solicitando uno por uno
    //TODOS LOS PARAMETROS -- DPORTA 11/03/2022
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3.5&FILTRO=" + filtro,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    switch (datos[i].CODIGO) {
                        case "0021":
                            if (!isNaN(parseFloat(datos[i].VALOR))) {
                                $('#hfIMPUESTO').val(parseFloat(datos[i].VALOR) * 100);
                                if (ObtenerQueryString("codigo") == undefined) {
                                    infoCustom2("Se considerará IGV: " + $('#hfIMPUESTO').val() + "%");
                                }
                            } else {
                                infoCustom2("El parámetro de Impuesto(0021) no es válido. Se considerará IGV 18%")
                                $('#hfIMPUESTO').val("18");
                            }
                            break;
                        case "DIGP":
                            prmtDIGP = datos[i].VALOR;
                            break;
                        //case "STKP":
                        //    $('#hfParamStock').val(datos[i].VALOR);
                        //    paramStock = parseFloat($("#hfParamStock").val());
                        //    break;
                        case "REDN":
                            $('#hfParamRedondeo').val(datos[i].VALOR);
                            break;
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
                                $('#hfFactorImpuestoRentaVenta').val(parseFloat(datos[i].VALOR));
                            } else {
                                infoCustom2("El parámetro Factor de Impuesto a la Renta Mínimo (IMRE) no es válido. Se considerará Factor Mínimo de 1.5%")
                                $('#hfFactorImpuestoRentaVenta').val("1.5");
                            }
                            break;
                        case "BFDV":
                            if (datos[i].VALOR == "SI") {
                                $("#txt_fec_emision").attr('disabled', true);
                                $("#txtFechaPago").attr('disabled', true);//20/02

                            } else {
                                $("#txt_fec_emision").attr('disabled', false);
                                $("#txtFechaPago").attr('disabled', false);//20/02
                            }
                            prmtBFDV = datos[i].VALOR;
                            break;
                        case "ODON":
                            if (datos[i].VALOR == "SI") {
                                $("#div_chk_donacion").attr("style", "display:none");

                            } else {
                                $("#div_chk_donacion").attr("style", "display:inline");
                            }
                            break;
                        //case "VNST":
                        //    prmtVNST = datos[i].VALOR;
                        //    break;
                        case "ADET":
                            agregarDetalle = datos[i].VALOR;
                            break;
                        case "ACON":
                            prmtACON = datos[i].VALOR;
                            break;
                        case "CURS":
                            prmtCURS = datos[i].VALOR;
                            break;
                        case "MIGO":
                            token_migo = datos[i].DESCRIPCION_DETALLADA;
                            break;
                        case "CLIE":
                            prmtCLIE = datos[i].VALOR;
                            break;
                        case "GLIT":
                            prmtGLIT = datos[i].VALOR;
                            if (prmtGLIT === "SI") {
                                GLIT = toTitleCase(datos[i].DESCRIPCION_DETALLADA);
                                $("#eti_glosa").text(GLIT);
                            }
                            break;
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

    //OBTENER PARAMETRO DE REDONDEO
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=REDN",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            $('#hfParamRedondeo').val(datos[0].VALOR);
    //        }
    //        else { alertCustom("No se recuperó el Parámetro de Redondeo(REDN) correctamente!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó el Parámetro de Redondeo(REDN) correctamente!");
    //    }
    //});

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

    //BLOQUEAR CAMPOS DE FECHA DE EMISIÓN Y PAGO EN VENTA RAPIDA
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
    //                $("#txtFechaPago").attr('disabled', true);//20/02

    //            } else {
    //                $("#txt_fec_emision").attr('disabled', false);
    //                $("#txtFechaPago").attr('disabled', false);//20/02
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

    //QUE SE GENERE O NO EL ASIENTO CONTABLE
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ACON",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
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

    //PERMISO PARA MODIFICAR LA VENTA EN LA PANTALLA NVMDOVS
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=PERMISO_MOD_VENTA&USUARIO=" + $("#ctl00_txtus").val() + "&CTLG=" + $("#ctl00_hddctlg").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                $("#hfPermisoModificarVenta").val(datos[0].PERMISO);
            }
            else { alertCustom("No se recuperó correctamente el PERMISO!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el PERMISO!");
        }
    });

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
    if (ObtenerQueryString("codigo") == undefined) {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=CLID",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos != null) {
                    if (datos[0].VALOR !== "" || datos[0].VALOR == "0") {
                        cargarprederteminado = true;
                        fillTxtCliente("#txtClientes", datos[0].VALOR);
                    } else {
                        // QUE CARGUEN TODOS LOS CLIENTES NORMAL  
                        fillTxtCliente("#txtClientes", "");
                    }
                }
            },
        });
    }
}

//function CargarFactorImpuestoRentaVenta() {
//    var data = new FormData();
//    data.append('p_FECHA_BUSQUEDA', $("#txt_fec_emision").val());
//    $.ajax({
//        type: "POST",
//        url: "vistas/nc/ajax/ncmimre.ashx?OPCION=1",
//        contentType: false,
//        data: data,
//        processData: false,
//        cache: false
//    })
//        .success(function (datos) {
//            if (datos != null && datos != "") {
//                if (parseFloat(datos[0].FACTOR) < parseFloat($("#hfFactorImpuestoRenta").val())) {
//                    $("#hfFactorImpuestoRentaVenta").val($("#hfFactorImpuestoRenta").val());
//                } else {
//                    $("#hfFactorImpuestoRentaVenta").val(datos[0].FACTOR);
//                }
//            }
//            else {
//                $("#hfFactorImpuestoRentaVenta").val($("#hfFactorImpuestoRenta").val());
//            }
//        })
//        .error(function () {
//        });
//}

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
        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=LVEND" +
            "&CTLG=" + ctlg +
            "&SCSL=" + scsl +
            "&ESTADO=" + estado,
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
    $("#input_desc_prod").html("<input id='txt_desc_producto' class='span12' type='text' placeholder='Descripción de Servicio' />");

    Bloquear("input_cod_prod");
    Bloquear("input_desc_prod");
    if ($('#cbo_Sucursal').val() != null) {
        if (ajaxProducto) {
            ajaxProducto.abort();
        }
        ajaxProducto = $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC_CAB&CTLG=" + $('#cbo_Empresa').val() + "&ALMC_CODE=" + $('#cbo_Sucursal').val() + "&SERIADO_IND=" + seriado,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
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
                            let aoObj = new Array();

                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].DESC_ADM);
                                array.sort();
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
                                obj.ALMACENABLE_IND = datos[i].ALMACENABLE_IND;
                                obj.PRECIO_IND = datos[i].PRECIO_IND;
                                obj.CTLG = datos[i].CTLG;
                                obj.STOCK_REAL = datos[i].STOCK_REAL;
                                obj.STOCK_TOTAL = datos[i].STOCK_TOTAL;
                                obj.DETRACCION = datos[i].DETRACCION;
                                obj.ALMC = datos[i].ALMC;
                                aoObj.push(obj);
                            }

                            $.each(aoObj, function (i, objeto) {
                                map[objeto.DESC_ADM] = objeto;
                            });
                            process(array);
                        },
                        updater: function (item) {
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

                                $("#cbo_und_medida").select2("destroy");
                                $("#cbo_und_medida").val(map[item].UNIDAD);
                                $("#cbo_und_medida").select2();

                                $("#txt_cantidad").val("");
                                $("#txt_cantidad").focus();

                                if (map[item].ALMACENABLE_IND == "N") {
                                    $("#txtStockReal").val("SERVICIO");
                                    $("#txtStockReal").attr("disabled", "disabled");
                                } else {
                                    stockReal = map[item].STOCK_REAL;
                                    $("#txtStockReal").val(stockReal);
                                    $("#txtStockReal").attr("disabled", "disabled");
                                }
                                prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPIDM").val());

                                $("#hfCostoProducto").val(prodActual.COSTO_PRODUCTO);

                                ActualizarCamposPrecios();

                                $('#txtPrecioUnitario').keyup(function (e) {
                                    var key = e.keyCode ? e.keyCode : e.which;
                                    if (key === 13 && $(this).val() != '') {
                                        $('#txt_glosa_det').focus();
                                    }
                                });
                                $("#cbo_moneda").attr("disabled", "disabled");
                                desc_producto = map[item].DESC_ADM;
                                return item;

                            } else {
                                alertCustom("Seleccione un cliente válido para continuar.");

                                $('#txt_desc_producto, #txt_cod_producto').val('');

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
                            $("#txtStockReal").val('');
                            $("#txtPrecioUnitario").val("0.00");

                            if (detallesVenta.length == 0) {
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
                        items: 50,
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
                                obj.ALMACENABLE_IND = datos[i].ALMACENABLE_IND;
                                obj.PRECIO_IND = datos[i].PRECIO_IND;
                                obj.CTLG = datos[i].CTLG;
                                obj.STOCK_REAL = datos[i].STOCK_REAL;
                                obj.STOCK_TOTAL = datos[i].STOCK_TOTAL;
                                obj.DETRACCION = datos[i].DETRACCION;
                                obj.ALMC = datos[i].ALMC;
                                aoObj.push(obj);
                            }

                            $.each(aoObj, function (i, objeto) {
                                map[objeto.CODIGO_ANTIGUO] = objeto;
                            });
                            process(array);
                        },
                        updater: function (item) {
                            if ($("#hfPIDM").val() != "") {

                                $("#txtClientes").attr("disabled", "disabled");
                                $("#txtNroDctoCliente").attr("disabled", "disabled");
                                $("#cboTipoDoc").attr("disabled", "disabled")

                                $("#hfCOD_PROD").val(map[item].CODIGO);
                                $("#hfProdSeriado").val(map[item].SERIADO);

                                $("#txt_cod_producto").val($("#hfCOD_PROD").val());
                                $("#txt_desc_producto").val(map[item].DESC_ADM);

                                $("#cbo_und_medida").select2("destroy");
                                $("#cbo_und_medida").val(map[item].UNIDAD);
                                $("#cbo_und_medida").select2();

                                $("#hfporcentaje_detraccion").val(map[item].DETRACCION)
                                $("#txt_cantidad").val("");
                                $("#txt_cantidad").focus();

                                if (map[item].ALMACENABLE_IND == "N") {
                                    $("#txtStockReal").val("SERVICIO");
                                    $("#txtStockReal").attr("disabled", "disabled");
                                } else {
                                    stockReal = map[item].STOCK_REAL;
                                    $("#txtStockReal").val(stockReal);
                                    $("#txtStockReal").attr("disabled", "disabled");
                                }
                                prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPIDM").val());
                                $("#hfCostoProducto").val(prodActual.COSTO_PRODUCTO);
                                ActualizarCamposPrecios();

                                $('#txtPrecioUnitario').keyup(function (e) {
                                    var key = e.keyCode ? e.keyCode : e.which;
                                    if (key === 13 && $(this).val() != '') {
                                        $('#txt_glosa_det').focus();
                                    }
                                });
                                $("#cbo_moneda").attr("disabled", "disabled");
                                desc_producto = map[item].DESC_ADM;
                                return item;
                            } else {
                                alertCustom("Seleccione un cliente válido para continuar.");

                                $('#txt_desc_producto, #txt_cod_producto').val('');
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
                            $("#txtPrecioUnitario").val("0.00");

                            if (detallesVenta.length == 0) {
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
                }
            },
            error: function (msg) {
                Desbloquear("input_cod_prod");
                Desbloquear("input_desc_prod");
                if (msg.statusText != "abort") {
                    alertCustom("Productos no se listaron correctamente");
                }
            }
        });
    }
}

function validarFechaEmision(fechaInicio, fechaFin) { //DPORTA 31/01/2023

    let dia = fechaInicio.split("/")[0];
    let mes = fechaInicio.split("/")[1];
    let anio = fechaInicio.split("/")[2];

    var fecha_ini = new Date(anio + '/' + mes + '/' + dia).getTime();

    let diaFin = fechaFin.split("/")[0];
    let mesFin = fechaFin.split("/")[1];
    let anioFin = fechaFin.split("/")[2];

    var fecha_fin = new Date(anioFin + '/' + mesFin + '/' + diaFin).getTime();

    var diff = (fecha_fin - fecha_ini) / (1000 * 60 * 60 * 24);

    if (diff > 1) {
        $('#txt_fec_emision, #txt_fec_vencimiento').datepicker('setDate', 'now');
        infoCustom2("Los documentos electrónicos, solo se pueden emitir con 1 día de antelación.");
    } else {
        //CargarFactorImpuestoRentaVenta();
        if ($("#cbo_modo_pago").val() == "0001") {
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
            }
        }
    }
}

//Actualiza campos para precios 
function ActualizarCamposPrecios() {
    if (prodActual != null && prodActual.length != 0) {
        $("#divPrecioUnitario").html("");
        //La moneda de venta coincide con la moneda del producto
        if (prodActual.MONEDA == $("#cbo_moneda").val()) {
            if (prodActual.PRECIO_IND == "E") {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + prodActual.PRECIO_VENTA + '" onkeyup="return ValidaPrecioEstandar(\'' + prodActual.PRECIO_VENTA + '\',\'' + prodActual.PRECIO_MINIMO + '\')"  onkeypress="return ValidaDecimales(event,this,5)" />')
                $("#txtPrecioUnitInicio").val(prodActual.PRECIO_VENTA);
            }
            else if (prodActual.PRECIO_IND == "C") {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" disabled="disabled" />')
                $("#txtPrecioUnitInicio").val('');
            } else {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + prodActual.PRECIO_VENTA + '" onkeyup="return ValidaPrecioCliente(\'' + prodActual.PRECIO_VENTA + '\',\'' + prodActual.PRECIO_MINIMO + '\')"  onkeypress="return ValidaDecimales(event,this,5)" />')
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
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + precioVenta.toFixed(prmtDIGP) + '" onkeyup="return ValidaPrecioEstandar(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this,5)" />')
                    $("#txtPrecioUnitInicio").val(precioVenta.toFixed(prmtDIGP));
                } else {
                    //Si es igual a la moneda alterna: Convierte a MOBA
                    precioVenta = parseFloat(prodActual.PRECIO_VENTA) * valorCambio;
                    precioMinimo = parseFloat(prodActual.PRECIO_MINIMO) * valorCambio;
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + precioVenta.toFixed(prmtDIGP) + '" onkeyup="return ValidaPrecioEstandar(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this,5)" />')
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
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + precioVenta.toFixed(prmtDIGP) + '" onkeyup="return ValidaPrecioCliente(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this,5)" />')
                    $("#txtPrecioUnitInicio").val(precioVenta.toFixed(prmtDIGP));
                } else {
                    //Si es igual a la moneda alterna: Convierte a MOBA
                    precioVenta = parseFloat(prodActual.PRECIO_VENTA) * valorCambio;
                    precioMinimo = parseFloat(prodActual.PRECIO_MINIMO) * valorCambio;
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + precioVenta.toFixed(prmtDIGP) + '" onkeyup="return ValidaPrecioCliente(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this,5)" />')
                    $("#txtPrecioUnitInicio").val(precioVenta.toFixed(prmtDIGP));
                }
            }
        }
    }
}

//insertar TC - DPORTA
function InsertarValorCambioOficial(monecode) {
    if (typeof $("#cbo_moneda [data-tipo='MOAL']").val() != "undefined" && $("#cbo_moneda [data-tipo='MOAL']").val() != "") {
        monecode = $("#cbo_moneda [data-tipo='MOAL']").val();

        var formData = new FormData();
        formData.append("token", token_migo);

        var request = new XMLHttpRequest();

        request.open("POST", "https://api.migo.pe/api/v1/exchange/latest");
        request.setRequestHeader("Accept", "application/json");

        request.send(formData);
        request.onload = function () {
            var data = JSON.parse(this.response);
            if (data.success == true) {
                let fecha = $("#txt_fec_transaccion").val();
                let valorcomprabase = data.precio_compra;
                let valorventabase = data.precio_venta;
                let valorcompralt = data.precio_compra;
                let valorventalt = data.precio_venta;

                $.ajax({
                    type: "POST",
                    url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=3.5&valorcomprabase=" + valorcomprabase + "&valorventabase=" + valorventabase +
                        "&valorcompralt=" + valorcompralt + "&valorventalt=" + valorventalt + "&fecha=" + fecha + "&usuario=" + "SIST" +
                        "&codbase=" + "0002" + "&codalt=" + monecode,
                    //contentType: "application/json;",
                    //dataType: "json",
                    //async: true,
                    success: function (datos) {
                        if (datos == "OK") {
                            ListarValorCambio($('#cbo_moneda').val());
                            ListarValorCambioOficial($('#cbo_moneda').val());
                        } else {
                            noexito();
                        }
                    },
                    error: function (msg) {
                        $("#msgSunat").html("Ocurrió un error al obtener tipo de Cambio.");
                        //console.log("Error al obtener datos de SUNAT.");
                    }
                });
            }
        };
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

//Cliente Especifico 
function fillTxtClienteEspecifico(nro) {
    $("#divTxtClientes").html('<input id="txtClientes" class="span12" type="text" placeholder="Cliente" style="text-transform: uppercase" />');
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2.7&CTLG_CODE=" + $("#cbo_Empresa").val() + "&NRO_DOC=" + nro,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                map = {};
                let oObjet = new Array();
                for (var i = 0; i < datos.length; i++) {

                    var obj = {};
                    obj.TIPO_DOCUMENTO = datos[i].TIPO_DOCUMENTO;
                    obj.NRO_DOCUMENTO = datos[i].NRO_DOCUMENTO;
                    obj.CODIGO_TIPO_DOCUMENTO = datos[i].CODIGO_TIPO_DOCUMENTO;
                    obj.RUC = datos[i].RUC;
                    obj.RAZON_SOCIAL = datos[i].RAZON_SOCIAL;
                    obj.CODIGO_CATEGORIA = datos[i].CODIGO_CATEGORIA;
                    obj.CATE_DESC = datos[i].CATE_DESC;
                    obj.DEUDA = datos[i].DEUDA;
                    obj.PIDM = datos[i].PIDM;
                    obj.DIAS = datos[i].DIAS;
                    obj.ID = datos[i].ID;
                    obj.AGENTE_RETEN_IND = datos[i].AGENTE_RETEN_IND;
                    obj.PPBIDEN_CONDICION_SUNAT = datos[i].PPBIDEN_CONDICION_SUNAT;
                    obj.PPBIDEN_ESTADO_SUNAT = datos[i].PPBIDEN_ESTADO_SUNAT;

                    oObjet.push(obj);
                }

                jsonClientes = oObjet;

                if (obj.RUC != "") {
                    $('#cboTipoDoc').select2("val", "6").change();
                    $("#txtNroDctoCliente").val(obj.RUC);
                    $("#btnHabido").show();
                } else {
                    $('#cboTipoDoc').select2("val", obj.CODIGO_TIPO_DOCUMENTO).change();
                    $("#txtNroDctoCliente").val(obj.NRO_DOCUMENTO);
                    $("#btnHabido").hide();
                }

                $("#lblHabido").html("");
                $("#lblEstado").html("");

                $('#cboDocumentoVenta').removeAttr("disabled");
                $("#hfPIDM").val(obj.PIDM);
                $("#hfAgenteRetencionCliente").val(obj.AGENTE_RETEN_IND);
                $("#hfCodigoCategoriaCliente").val(obj.CODIGO_CATEGORIA);
                $("#hfCodigoTipoDocumento").val(obj.CODIGO_TIPO_DOCUMENTO);
                $("#hfTipoDocumento").val(obj.TIPO_DOCUMENTO);
                $("#hfNroDocumento").val(obj.NRO_DOCUMENTO);
                $("#hfRUC").val(obj.RUC);

                cod_cate_clie = obj.CODIGO_CATEGORIA;
                des_cate_clie = obj.CATE_DESC;
                deuda = obj.DEUDA;

                if ($("#txt_fec_transaccion").val() != $("#txt_fec_vig_Oficial").val()) {//DPORTA
                    if (ObtenerQueryString("codigo") == undefined) {
                        InsertarValorCambioOficial($('#cbo_moneda').val());
                    }
                }
                prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);

                //Cargar modo de pago
                $("#cbo_modo_pago").select2('val', '0001');
                if ($("#hfPIDM").val() !== '1') {
                    $("#linea").html('');
                    $("#disponible").html('');
                    $("#vencido").html('');
                    $("#divAlCredito").hide();
                } else {
                    $("#linea").html('');
                    $("#disponible").html('');
                    $("#vencido").html('');
                    $("#divAlCredito").hide();
                }

                $('#chk_retencion').prop('disabled', true);
                $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                //Evalua si se aplica retencion
                if (obj.AGENTE_RETEN_IND == 'S' && $("#cbo_Empresa :selected").attr("agente-reten-ind") == "N") {//CAMBIO_RETENCION
                    $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                    $('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');
                }

                if (obj.DIAS > 0) {
                    $("#cbo_modo_pago").prop("disabled", false);
                }
                else {
                    $("#cbo_modo_pago").prop("disabled", true);
                }

                fillCboDirecciones(obj.PIDM);
            }
        },
        error: function (msg) {
            alertCustom("Cliente no se encontró");
        }
    });
}

//Lista Clientes 
function fillTxtCliente(v_ID, v_value) {
    //if (prmtCLIE == 'NO') {
        $("#divTxtClientes").html('<input id="txtClientes" class="span12" type="text" placeholder="Cliente" style="text-transform: uppercase" />');
        var selectRazonSocial = $(v_ID);
        $.ajax({
            type: "post",
            //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2&CTLG_CODE=" + $("#cbo_Empresa").val(),
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2.5&CTLG_CODE=" + $("#cbo_Empresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: asincrono,
            success: function (datos) {
                if (datos != null) {
                    textclientes = selectRazonSocial.typeahead({
                        items: 20,
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
                                //obj.DIRECCION = datos[i].DIRECCION;
                                obj.CODIGO_CATEGORIA = datos[i].CODIGO_CATEGORIA;
                                obj.CATE_DESC = datos[i].CATE_DESC;
                                obj.DEUDA = datos[i].DEUDA;
                                obj.PIDM = datos[i].PIDM;
                                obj.DIAS = datos[i].DIAS;
                                obj.ID = datos[i].ID;
                                obj.AGENTE_RETEN_IND = datos[i].AGENTE_RETEN_IND;
                                obj.PPBIDEN_CONDICION_SUNAT = datos[i].PPBIDEN_CONDICION_SUNAT;
                                obj.PPBIDEN_ESTADO_SUNAT = datos[i].PPBIDEN_ESTADO_SUNAT;

                                if (v_value == obj.PIDM) {
                                    jsonPredeterminado = obj;
                                }
                                oObjet.push(obj);
                            }
                            jsonClientes = oObjet;
                            $.each(oObjet, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });
                            process(arrayRazonSocial);

                            if (jsonPredeterminado.PIDM == v_value && !aux_predeterminado) {//SE PUEDE COMENTAR TODO ESTO
                                var auxArrayRazonSocial = [];
                                auxArrayRazonSocial.push(jsonPredeterminado.RAZON_SOCIAL);
                                $("#txtClientes").val(jsonPredeterminado.RAZON_SOCIAL);
                                $("#lblHabido").html("");
                                $("#lblEstado").html("");

                                $('#cboDocumentoVenta').removeAttr("disabled");
                                $("#hfPIDM").val(jsonPredeterminado.PIDM);
                                $("#hfAgenteRetencionCliente").val(jsonPredeterminado.AGENTE_RETEN_IND);
                                $("#hfCodigoCategoriaCliente").val(jsonPredeterminado.CODIGO_CATEGORIA);
                                $("#hfCodigoTipoDocumento").val(jsonPredeterminado.CODIGO_TIPO_DOCUMENTO);
                                $("#hfTipoDocumento").val(jsonPredeterminado.TIPO_DOCUMENTO);
                                $("#hfNroDocumento").val(jsonPredeterminado.NRO_DOCUMENTO);
                                $("#hfRUC").val(jsonPredeterminado.RUC);
                                //$("#hfDIR").val(jsonPredeterminado.DIRECCION);

                                $("#hfcod_cate2").val(jsonPredeterminado.CODIGO_CATEGORIA);
                                $("#hfdes_cate2").val(jsonPredeterminado.CATE_DESC);
                                cod_cate_clie = jsonPredeterminado.CODIGO_CATEGORIA;
                                des_cate_clie = jsonPredeterminado.CATE_DESC;

                                if (jsonPredeterminado.PPBIDEN_CONDICION_SUNAT != "") {
                                    $("#lblHabido").html("CONDICIÓN: " + "<b>" + jsonPredeterminado.PPBIDEN_CONDICION_SUNAT + "</b>");
                                }
                                if (jsonPredeterminado.PPBIDEN_ESTADO_SUNAT != "") {
                                    $("#lblEstado").html("ESTADO: " + "<b>" + jsonPredeterminado.PPBIDEN_ESTADO_SUNAT + "</b>");
                                }

                                if ($("#txt_fec_transaccion").val() != $("#txt_fec_vig_Oficial").val()) {//DPORTA
                                    if (ObtenerQueryString("codigo") == undefined) {
                                        InsertarValorCambioOficial($('#cbo_moneda').val());
                                    }
                                }
                                prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);
                                if (jsonPredeterminado.RUC != "") {
                                    $('#cboTipoDoc').select2("val", "6").change();
                                    $("#txtNroDctoCliente").val(jsonPredeterminado.RUC);
                                    $("#btnHabido").show();
                                } else {
                                    $('#cboTipoDoc').select2("val", jsonPredeterminado.CODIGO_TIPO_DOCUMENTO).change();
                                    $("#txtNroDctoCliente").val(jsonPredeterminado.NRO_DOCUMENTO);
                                    $("#btnHabido").hide();
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
                                //Cargar modo de pago
                                $("#cbo_modo_pago").select2('val', '0001');
                                $("#cbo_modo_pago").change();
                                $('#chk_retencion').prop('disabled', true);
                                $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                                $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                                //Evalua si se aplica retencion
                                if (jsonPredeterminado.AGENTE_RETEN_IND == 'S' && $("#cbo_Empresa :selected").attr("agente-reten-ind") == "N") {//CAMBIO_RETENCION
                                    $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                                    $('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');
                                }

                                if (jsonPredeterminado.DIAS > 0) {
                                    $("#cbo_modo_pago").prop("disabled", false);
                                }
                                else {
                                    $("#cbo_modo_pago").prop("disabled", true);
                                }

                                //if (!carga_ini_ind) {
                                fillCboDirecciones(jsonPredeterminado.PIDM);
                                //}

                                //CARGA POR DEFECTO
                                //if ($("#cboDocumentoVenta").val() == "" && $("#txtNroDocVenta").val() == "") {
                                //    $("#cboDocumentoVenta").select2("val", "0012").change();
                                //}

                                process(auxArrayRazonSocial);
                                aux_predeterminado = true;

                            }
                        },
                        updater: function (item) {
                            if (map[item].RUC != "") {
                                $('#cboTipoDoc').select2("val", "6").change();
                                $("#txtNroDctoCliente").val(map[item].RUC);
                                $("#btnHabido").show();
                            } else {
                                $('#cboTipoDoc').select2("val", map[item].CODIGO_TIPO_DOCUMENTO).change();
                                $("#txtNroDctoCliente").val(map[item].NRO_DOCUMENTO);
                                $("#btnHabido").hide();
                            }

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
                            //$("#hfDIR").val(map[item].DIRECCION);

                            cod_cate_clie = map[item].CODIGO_CATEGORIA;
                            des_cate_clie = map[item].CATE_DESC;
                            deuda = map[item].DEUDA;

                            if ($("#txt_fec_transaccion").val() != $("#txt_fec_vig_Oficial").val()) {//DPORTA
                                if (ObtenerQueryString("codigo") == undefined) {
                                    InsertarValorCambioOficial($('#cbo_moneda').val());
                                }
                            }
                            prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);

                            //Cargar modo de pago
                            $("#cbo_modo_pago").select2('val', '0001');
                            if ($("#hfPIDM").val() !== '1') {
                                //$("#cbo_modo_pago").change();
                                $("#linea").html('');
                                $("#disponible").html('');
                                $("#vencido").html('');
                                $("#divAlCredito").hide();
                            } else {
                                $("#linea").html('');
                                $("#disponible").html('');
                                $("#vencido").html('');
                                $("#divAlCredito").hide();
                            }

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

                            //if (!carga_ini_ind) {
                            fillCboDirecciones(map[item].PIDM);
                            //}

                            //CARGA POR DEFECTO                       
                            //if ($("#cboDocumentoVenta").val() == "" && $("#txtNroDocVenta").val() == "") {
                            //    $("#cboDocumentoVenta").select2("val", "0012").change();
                            //}

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
                            //if ($("#txt_fec_emision").val() != "") {
                            //    $('#txt_fec_vencimiento').val($("#txt_fec_emision").val());
                            //} else {
                            //    $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                            //}
                            if ($("#txtNroDctoCliente").val() != "" && $("#txtClientes").val() != "") {
                                $('#cboTipoDoc').val('1').change();
                            }

                            $("#txtNroDctoCliente, #txt_id_proveedor, #txt_Retencion").val("");

                            prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);
                            $('#txt_fec_emision, #txt_fec_vencimiento').datepicker('setDate', 'now');

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

                if (cargarprederteminado) {
                    selectRazonSocial.val(" ").keyup();
                }
            },
            error: function (msg) {
                alertCustom("Clientes no se listaron correctamente");
            }
        });
    //} 
}

//Lista Clientes 
function fillTxtCliente2(v_ID, v_value) {

    $("#divTxtClientes").html('<input id="txtClientes" class="span12" type="text" placeholder="Cliente" style="text-transform: uppercase" />');
    var selectRazonSocial = $(v_ID);
    if (asincrono == true) {
        Bloquear("divFilaCliente");
    }
    $.ajax({
        type: "post",
        //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2&CTLG_CODE=" + $("#cbo_Empresa").val(),
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2.5&CTLG_CODE=" + $("#cbo_Empresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: asincrono,
        success: function (datos) {
            if (asincrono == true) {
                Desbloquear("divFilaCliente");
            }
            if (datos != null) {
                textclientes = selectRazonSocial.typeahead({
                    items: 20,
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
                            //obj.DIRECCION = datos[i].DIRECCION;
                            obj.CODIGO_CATEGORIA = datos[i].CODIGO_CATEGORIA;
                            obj.CATE_DESC = datos[i].CATE_DESC;
                            obj.DEUDA = datos[i].DEUDA;
                            obj.PIDM = datos[i].PIDM;
                            obj.DIAS = datos[i].DIAS;
                            obj.ID = datos[i].ID;
                            obj.AGENTE_RETEN_IND = datos[i].AGENTE_RETEN_IND;
                            obj.PPBIDEN_CONDICION_SUNAT = datos[i].PPBIDEN_CONDICION_SUNAT;
                            obj.PPBIDEN_ESTADO_SUNAT = datos[i].PPBIDEN_ESTADO_SUNAT;

                            if (v_value == obj.PIDM) {
                                jsonPredeterminado = obj;
                            }
                            oObjet.push(obj);
                        }
                        jsonClientes = oObjet;
                        $.each(oObjet, function (i, objeto) {
                            map[objeto.RAZON_SOCIAL] = objeto;
                        });
                        process(arrayRazonSocial);

                        if (jsonPredeterminado.PIDM == v_value && !aux_predeterminado) {//SE PUEDE COMENTAR TODO ESTO
                            var auxArrayRazonSocial = [];
                            auxArrayRazonSocial.push(jsonPredeterminado.RAZON_SOCIAL);
                            $("#txtClientes").val(jsonPredeterminado.RAZON_SOCIAL);
                            $("#lblHabido").html("");
                            $("#lblEstado").html("");

                            $('#cboDocumentoVenta').removeAttr("disabled");
                            $("#hfPIDM").val(jsonPredeterminado.PIDM);
                            $("#hfAgenteRetencionCliente").val(jsonPredeterminado.AGENTE_RETEN_IND);
                            $("#hfCodigoCategoriaCliente").val(jsonPredeterminado.CODIGO_CATEGORIA);
                            $("#hfCodigoTipoDocumento").val(jsonPredeterminado.CODIGO_TIPO_DOCUMENTO);
                            $("#hfTipoDocumento").val(jsonPredeterminado.TIPO_DOCUMENTO);
                            $("#hfNroDocumento").val(jsonPredeterminado.NRO_DOCUMENTO);
                            $("#hfRUC").val(jsonPredeterminado.RUC);
                            //$("#hfDIR").val(jsonPredeterminado.DIRECCION);

                            $("#hfcod_cate2").val(jsonPredeterminado.CODIGO_CATEGORIA);
                            $("#hfdes_cate2").val(jsonPredeterminado.CATE_DESC);
                            cod_cate_clie = jsonPredeterminado.CODIGO_CATEGORIA;
                            des_cate_clie = jsonPredeterminado.CATE_DESC;

                            if (jsonPredeterminado.PPBIDEN_CONDICION_SUNAT != "") {
                                $("#lblHabido").html("CONDICIÓN: " + "<b>" + jsonPredeterminado.PPBIDEN_CONDICION_SUNAT + "</b>");
                            }
                            if (jsonPredeterminado.PPBIDEN_ESTADO_SUNAT != "") {
                                $("#lblEstado").html("ESTADO: " + "<b>" + jsonPredeterminado.PPBIDEN_ESTADO_SUNAT + "</b>");
                            }

                            if ($("#txt_fec_transaccion").val() != $("#txt_fec_vig_Oficial").val()) {//DPORTA
                                if (ObtenerQueryString("codigo") == undefined) {
                                    InsertarValorCambioOficial($('#cbo_moneda').val());
                                }
                            }
                            prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);
                            if (jsonPredeterminado.RUC != "") {
                                $('#cboTipoDoc').select2("val", "6").change();
                                $("#txtNroDctoCliente").val(jsonPredeterminado.RUC);
                                $("#btnHabido").show();
                            } else {
                                $('#cboTipoDoc').select2("val", jsonPredeterminado.CODIGO_TIPO_DOCUMENTO).change();
                                $("#txtNroDctoCliente").val(jsonPredeterminado.NRO_DOCUMENTO);
                                $("#btnHabido").hide();
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
                            //Cargar modo de pago
                            $("#cbo_modo_pago").select2('val', '0001');
                            $("#cbo_modo_pago").change();
                            $('#chk_retencion').prop('disabled', true);
                            $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                            $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                            //Evalua si se aplica retencion
                            if (jsonPredeterminado.AGENTE_RETEN_IND == 'S' && $("#cbo_Empresa :selected").attr("agente-reten-ind") == "N") {//CAMBIO_RETENCION
                                $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                                $('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');
                            }

                            if (jsonPredeterminado.DIAS > 0) {
                                $("#cbo_modo_pago").prop("disabled", false);
                            }
                            else {
                                $("#cbo_modo_pago").prop("disabled", true);
                            }

                            //if (!carga_ini_ind) {
                            fillCboDirecciones(jsonPredeterminado.PIDM);
                            //}

                            //CARGA POR DEFECTO                       
                            //if ($("#cboDocumentoVenta").val() == "" && $("#txtNroDocVenta").val() == "") {
                            //    $("#cboDocumentoVenta").select2("val", "0012").change();
                            //}

                            process(auxArrayRazonSocial);
                            aux_predeterminado = true;
                        }
                    },
                    updater: function (item) {
                        if (map[item].RUC != "") {
                            $('#cboTipoDoc').select2("val", "6").change();
                            $("#txtNroDctoCliente").val(map[item].RUC);
                            $("#btnHabido").show();
                        } else {
                            $('#cboTipoDoc').select2("val", map[item].CODIGO_TIPO_DOCUMENTO).change();
                            $("#txtNroDctoCliente").val(map[item].NRO_DOCUMENTO);
                            $("#btnHabido").hide();
                        }

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
                        //$("#hfDIR").val(map[item].DIRECCION);

                        cod_cate_clie = map[item].CODIGO_CATEGORIA;
                        des_cate_clie = map[item].CATE_DESC;
                        deuda = map[item].DEUDA;

                        if ($("#txt_fec_transaccion").val() != $("#txt_fec_vig_Oficial").val()) {//DPORTA
                            if (ObtenerQueryString("codigo") == undefined) {
                                InsertarValorCambioOficial($('#cbo_moneda').val());
                            }
                        }
                        prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);
                        if (map[item].PPBIDEN_CONDICION_SUNAT != "") {
                            $("#lblHabido").html("CONDICIÓN: " + "<b>" + map[item].PPBIDEN_CONDICION_SUNAT + "</b>");
                        }
                        if (map[item].PPBIDEN_ESTADO_SUNAT != "") {
                            $("#lblEstado").html("ESTADO: " + "<b>" + map[item].PPBIDEN_ESTADO_SUNAT + "</b>");
                        }                        

                        //Cargar modo de pago
                        $("#cbo_modo_pago").select2('val', '0001');
                        if ($("#hfPIDM").val() !== '1') {
                            //$("#cbo_modo_pago").change();
                            $("#linea").html('');
                            $("#disponible").html('');
                            $("#vencido").html('');
                            $("#divAlCredito").hide();
                        }
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

                        //if (!carga_ini_ind) {
                        fillCboDirecciones(map[item].PIDM);
                        //}

                        //CARGA POR DEFECTO                       
                        //if ($("#cboDocumentoVenta").val() == "" && $("#txtNroDocVenta").val() == "") {
                        //    $("#cboDocumentoVenta").select2("val", "0012").change();
                        //}

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
                        //if ($("#txt_fec_emision").val() != "") {
                        //    $('#txt_fec_vencimiento').val($("#txt_fec_emision").val());
                        //} else {
                        //    $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                        //}
                        if ($("#txtNroDctoCliente").val() != "" && $("#txtClientes").val() != "") {
                            $('#cboTipoDoc').val('1').change();
                        }

                        $("#txtNroDctoCliente, #txt_id_proveedor, #txt_Retencion").val("");

                        prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);
                        $('#txt_fec_emision, #txt_fec_vencimiento').datepicker('setDate', 'now');

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

            if (cargarprederteminado) {
                selectRazonSocial.val(" ").keyup();
            }

            $("#txtClientes").attr("disabled", false);
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

    $.ajax({
        type: "post",
        //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2&CTLG_CODE=" + $("#cbo_Empresa").val(),
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2.6&CTLG_CODE=" + $("#cbo_Empresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: asincrono,
        success: function (datos) {
            if (datos != null) {
                textclientes = selectRazonSocial.typeahead({
                    items: 20,
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
                                    //'","DIRECCION":"' + datos[i].DIRECCION +
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

    //if (jsonClientes.length = 0) {
    //    $.ajax({
    //        type: "post",
    //        //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2&CTLG_CODE=" + $("#cbo_Empresa").val(),
    //        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2.5&CTLG_CODE=" + $("#cbo_Empresa").val(),
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: asincrono,
    //        success: function (datos) {
    //            if (datos != null) {
    //                textclientes = selectRazonSocial.typeahead({
    //                    items: 20,
    //                    source: function (query, process) {
    //                        arrayRazonSocial = [];
    //                        map = {};
    //                        var obj = "[";
    //                        for (var i = 0; i < datos.length; i++) {
    //                            if (datos[i].PIDM != $("#hfPIDM").val()) {
    //                                arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
    //                                obj += '{';
    //                                obj += '"TIPO_DOCUMENTO":"' + datos[i].TIPO_DOCUMENTO +
    //                                    '","NRO_DOCUMENTO":"' + datos[i].NRO_DOCUMENTO +
    //                                    '","CODIGO_TIPO_DOCUMENTO":"' + datos[i].CODIGO_TIPO_DOCUMENTO +
    //                                    '","RUC":"' + datos[i].RUC +
    //                                    '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL +
    //                                    //'","DIRECCION":"' + datos[i].DIRECCION +
    //                                    '","CODIGO_CATEGORIA":"' + datos[i].CODIGO_CATEGORIA +
    //                                    '","PIDM":"' + datos[i].PIDM +
    //                                    '","DIAS":"' + datos[i].DIAS +
    //                                    '","ID":"' + datos[i].ID +
    //                                    '","AGENTE_RETEN_IND": "' + datos[i].AGENTE_RETEN_IND + '"';
    //                                obj += '},';
    //                            }
    //                        }
    //                        obj += "{}";
    //                        obj = obj.replace(",{}", "");
    //                        obj += "]";
    //                        var json = $.parseJSON(obj);

    //                        $.each(json, function (i, objeto) {
    //                            map[objeto.RAZON_SOCIAL] = objeto;
    //                        });
    //                        process(arrayRazonSocial);
    //                    },
    //                    updater: function (item) {
    //                        $("#hfResponsablePagoPIDM").val(map[item].PIDM);
    //                        let iDiasPlazo = parseInt(map[item].DIAS);
    //                        $("#txt_plazo_pago").val(iDiasPlazo);
    //                        //Cargar modo de pago
    //                        $("#cbo_modo_pago").select2('val', '0001');
    //                        $("#cbo_modo_pago").change();

    //                        if (iDiasPlazo > 0) {
    //                            $("#cbo_modo_pago").prop("disabled", false);
    //                        }
    //                        else {
    //                            $("#cbo_modo_pago").prop("disabled", true);
    //                        }
    //                        return item;
    //                    },
    //                });

    //                selectRazonSocial.keyup(function () {
    //                    $(this).siblings("ul").css("width", $(this).css("width"))
    //                    if ($("#txtResponsablePago").val().length <= 0) {

    //                        $('#cbo_modo_pago').prop('disabled', true);
    //                        $('#cbo_modo_pago option:first-child').prop('selected', true);

    //                        $('#txt_plazo_pago').val('0');
    //                        if ($("#txt_fec_emision").val() != "") {
    //                            $('#txt_fec_vencimiento').val($("#txt_fec_emision").val());
    //                        } else {
    //                            $('#txt_fec_vencimiento').datepicker('setDate', 'now');
    //                        }
    //                        //Limpiar campos
    //                        $("#hfResponsablePagoPIDM").val("");
    //                        $("#txtClientes").keyup().siblings("ul").children("li").click();
    //                        $('#cbo_modo_pago').change();
    //                        $("#txtResponsablePago").focus();
    //                    }
    //                });
    //            }
    //            if (datos != null && $.trim(v_value).length > 0) {
    //                selectRazonSocial.val(v_value);
    //            }
    //        },
    //        error: function (msg) {
    //            alertCustom("Responsables de pago no se listaron correctamente.");
    //        }
    //    });

    //} else {
    //    textclientes = selectRazonSocial.typeahead({
    //        items: 20,
    //        source: function (query, process) {
    //            arrayRazonSocial = [];
    //            map = {};
    //            var obj = "[";
    //            for (var i = 0; i < jsonClientes.length; i++) {
    //                if (jsonClientes[i].PIDM != $("#hfPIDM").val()) {
    //                    arrayRazonSocial.push(jsonClientes[i].RAZON_SOCIAL);
    //                    obj += '{';
    //                    obj += '"TIPO_DOCUMENTO":"' + jsonClientes[i].TIPO_DOCUMENTO +
    //                        '","NRO_DOCUMENTO":"' + jsonClientes[i].NRO_DOCUMENTO +
    //                        '","CODIGO_TIPO_DOCUMENTO":"' + jsonClientes[i].CODIGO_TIPO_DOCUMENTO +
    //                        '","RUC":"' + jsonClientes[i].RUC +
    //                        '","RAZON_SOCIAL":"' + jsonClientes[i].RAZON_SOCIAL +
    //                        //'","DIRECCION":"' + jsonClientes[i].DIRECCION +
    //                        '","CODIGO_CATEGORIA":"' + jsonClientes[i].CODIGO_CATEGORIA +
    //                        '","PIDM":"' + jsonClientes[i].PIDM +
    //                        '","DIAS":"' + jsonClientes[i].DIAS +
    //                        '","ID":"' + jsonClientes[i].ID +
    //                        '","AGENTE_RETEN_IND": "' + jsonClientes[i].AGENTE_RETEN_IND + '"';
    //                    obj += '},';
    //                }
    //            }
    //            obj += "{}";
    //            obj = obj.replace(",{}", "");
    //            obj += "]";
    //            var json = $.parseJSON(obj);

    //            $.each(json, function (i, objeto) {
    //                map[objeto.RAZON_SOCIAL] = objeto;
    //            });
    //            process(arrayRazonSocial);
    //        },
    //        updater: function (item) {
    //            $("#hfResponsablePagoPIDM").val(map[item].PIDM);
    //            let iDiasPlazo = parseInt(map[item].DIAS);
    //            $("#txt_plazo_pago").val(iDiasPlazo);
    //            //Cargar modo de pago
    //            $("#cbo_modo_pago").select2('val', '0001');
    //            $("#cbo_modo_pago").change();
    //            if (iDiasPlazo > 0) {
    //                $("#cbo_modo_pago").prop("disabled", false);
    //            }
    //            else {
    //                $("#cbo_modo_pago").prop("disabled", true);
    //            }
    //            return item;
    //        },
    //    });
    //    selectRazonSocial.keyup(function () {
    //        $(this).siblings("ul").css("width", $(this).css("width"))
    //        if ($("#txtResponsablePago").val().length <= 0) {
    //            $('#cbo_modo_pago').prop('disabled', true);
    //            $('#cbo_modo_pago option:first-child').prop('selected', true);

    //            $('#txt_plazo_pago').val('0');
    //            if ($("#txt_fec_emision").val() != "") {
    //                $('#txt_fec_vencimiento').val($("#txt_fec_emision").val());
    //            } else {
    //                $('#txt_fec_vencimiento').datepicker('setDate', 'now');
    //            }
    //            //Limpiar campos
    //            $("#hfResponsablePagoPIDM").val("");
    //            $("#txtClientes").keyup().siblings("ul").children("li").click();
    //            $('#cbo_modo_pago').change();
    //            $("#txtResponsablePago").focus();
    //        }
    //    });
    //}
}

//Agregar Detalle
var detallesVenta = [];

function obtenerNumeroItems(table) {

    var nro_items = null;

    if (table.DataTable().rows()[0] == undefined) {
        nro_items = 0;
    } else {
        nro_items = table.DataTable().rows()[0].length;
    }
    return nro_items;
}

function AgregarDetalleVenta() {

    // Variables para validar el nro de items o detalles, según el tipo de documento;
    var current_nro_lineas = parseInt($("#cboSerieDocVenta :selected").attr('data-lineas'));
    var current_filas_table = (obtenerNumeroItems($("#tabla_det")) !== null) ? obtenerNumeroItems($("#tabla_det")) : 0;
    var message_nro_lineas = "";

    if (current_filas_table >= current_nro_lineas) {
        infoCustom2("Ya no se pueden agregar más productos al detalle, según el tipo de documento");
        LimpiarCamposDetalle();
        return;
    } else {
        nro_items_permitidos = current_nro_lineas - current_filas_table;
    }

    var cantidad = $("#txt_cantidad").val();
    var unidadMedidaCode = $("#cbo_und_medida :selected").val();
    var unidadMedida = $("#cbo_und_medida :selected").html();
    var precioUnidad = $("#txtPrecioUnitario").val().replace(",", ".");
    var glosa = $.trim($("#txt_glosa_det").val().replace(/<\/?[^>]+(>|$)/gi, ""));

    //Guardar Almacen
    var almacenCode = $("#cbo_Sucursal :selected").val();
    var almacen = $("#cbo_Sucursal :selected").html();

    //Guardar Categoria Cliente
    var categoriaCode = "";
    var categoriaDesc = ""; //$("#hfdes_cate").val();

    //Guardar Despacho
    var despacho = $("#chkDespachoVenta").is(":checked") ? "SI" : "NO";

    var nomProdVenta = desc_producto + " " + glosa; //$("#txt_desc_producto").val() + " " + glosa;
    var descuento = parseFloat($("#txt_descuento_det").val()).toFixed(prmtDIGP);
    let equi = 1;

    //var prod;
    var objProd = prodActual; //Json Producto
    var factor = 1; // factor conversion unidades
    var totalBruto = parseFloat((cantidad / factor) * precioUnidad).toFixed(prmtDIGP);
    var totalNeto = parseFloat(totalBruto - descuento).toFixed(prmtDIGP);
    //Validaciones iniciales
    var continuar = false;
    if (vErrors(["txt_cod_producto", "txt_cantidad", "cbo_und_medida", "txt_descuento_det", "txtPrecioUnitario", "cbo_Empresa", "cbo_Sucursal"])) {

        if (typeof prodActual.CODIGO != undefined) {
            if (parseFloat($("#txtPrecioUnitario").val()) == 0) {
                alertCustom("No puede agregar un producto con precio 0.");
                continuar = false;
            }
            else if (parseFloat($("#txt_cantidad").val()) == 0) {
                alertCustom("La cantidad debe ser mayor a 0.");
                continuar = false;
            }
            else {
                continuar = true
            }
        } else {
            alertCustom("Debe seleccionar un producto.")
        }
    }

    if (continuar) {
        if (isNaN($("#txt_cantidad").val()) || isNaN($("#txt_descuento_det").val()) || isNaN($("#txtPrecioUnitario").val())) {
            continuar = false;
            alertCustom("Los valores ingresados no son válidos. Intente nuevamente.")
            LimpiarCamposDetalle();
        } else {
            if (vErrors(["txt_cod_producto", "cbo_und_medida", "txt_cantidad"])) {
                continuar = true
            } else {
                continuar = false
            }
        }
    }
    //Fin validaciones

    if (continuar) {

        if (objProd != null && typeof objProd != "undefined") {
            if (ValidarProductoAgregado(objProd, precioUnidad, glosa) < 0) {
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
                objProd.ALMC = almacenCode;
                objProd.DESC_ALMC = almacen;
                objProd.CAT_CODE = categoriaCode;
                objProd.CAT_DESC = categoriaDesc;
                objProd.DESP_VENTA = despacho;
                objProd.TOTAL_BRUTO = totalBruto;
                objProd.TOTAL_NETO = totalNeto;//Total neto Incluido IGV
                objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;
                //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)

                var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
                var detraccion, isc;
                let tipoDocCode = $("#cboSerieDocVenta :selected").attr("data-tipoDocCode");//DPORTA SIN-IMPUESTOS
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
                objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();
                detallesVenta.push(objProd);

                //Bloquear edicion
                $("#cbo_moneda").attr("disabled", "disabled");
                $("#cbo_Sucursal").attr("disabled", "disabled");
                $("#cbo_Empresa").attr("disabled", "disabled");
                $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                //Agregar glosa si no hay registro
                if ($("#hfTxtGlosaDet").val() == "") agregarGlosa();

                if (current_filas_table < current_nro_lineas) {
                    LimpiarCamposDetalle();
                    ListarTablaDetalles(ObtenerTablaDetalles());
                    if ($("#hfPermisoModificarVenta").val() == "N") {
                        $(".btnEliminarDetalle").remove();
                        $("#tabla_det").DataTable().column(0).visible(false);
                    }
                } else {
                    message_nro_lineas = "Ya no se pueden agregar más productos al detalle, según el tipo de documento";
                }
            }
            else {
                //if ($("#hfPermisoModificarVenta").val() == "N") {
                //    infoCustom2("El servicio ya ha sido agregado");
                //} else {
                //    infoCustom2("El servicio ya ha sido agregado con el mismo precio, puede modificarlo directamente en el detalle.");
                //}
                //LimpiarCamposDetalle();
            }

        } else { alertCustom("Error al obtener datos completos de producto."); }
    }

    if (message_nro_lineas != "") {
        infoCustom2(message_nro_lineas);
    }
    sortTable();
    CalcularDetraccion();
    CalcularDatosMonetarios();
    $("#lblImporteCobrar").html($("#txt_monto_total").val());
    $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
    $("#txtMonto").val("");
    $("#txtMonto").val($("#txt_monto_total").val());
    ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
    if ($('#cbo_modo_pago').val() == '0002') {
        $("#txtMonto").val('').keyup();
    } else {
        $("#txtMonto").val($("#txt_monto_total").val()).keyup();
    }

    $("#txtEfectivo").keyup();
}

//--------------- ANTICIPOS -----------------------

seleccionados = new Array();
function AgregarAnticipo() {

    var filas = tabla_det.api(true).rows('.seleccionado').data().toArray();
    var item = '';
    var importe_total = 0;//DPORTA
    var diferencia = 0;//DPORTA
    var importe_anticipo = 0;//DPORTA
    if ($("#txt_monto_total").val() != "") {//DPORTA
        importe_total = $("#txt_monto_total").val();
    }
    for (var i = 0; i < filas.length; i++) {//DPORTA
        importe_anticipo += parseFloat(filas[i].MONTO_MOBA);
    }
    diferencia = parseFloat(importe_total) - parseFloat(importe_anticipo); //DPORTA
    if (diferencia >= 0) {//DPORTA
        for (var i in filas) {
            item = filas[i].CODIGO;
            if (seleccionados.indexOf(item) < 0) {
                var objProd = ObtenerAnticipoCompleto(item);
                if (objProd.TIPO_DCTO == $("#cboDocumentoVenta").val()) {//DPORTA
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
                } else {
                    alertCustom("El anticipo " + objProd.CODIGO + " no se agregó, ya que difiere al tipo de documento de la venta.");
                }
            }
        }
        LimpiarCamposDetalle();
        ListarTablaDetalles(ObtenerTablaDetalles());
        $(".btnEliminarDetalle").remove();
        $("#tabla_det").DataTable().column(0).visible(false);
        CalcularDetraccion();
        CalcularDatosMonetarios();
        $("#lblImporteCobrar").html($("#txt_monto_total").val());
        $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
        $("#txtMonto").val($("#txt_monto_total").val());
        $('#divAnticipos').modal('hide');
    } else {
        $('#divAnticipos').modal('hide');
        infoCustom2("El importe del anticipo no debe ser mayor al Importe Total");
    }
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
                prod += '"ALMC":"' + $("#cbo_Sucursal :selected").val() + '",';
                prod += '"DESC_ALMC":"' + $("#cbo_Sucursal :selected").html() + '",';
                prod += '"CAT_CODE":"' + (($("#hfcod_cate").val()) != "" ? $("#hfcod_cate").val() : cod_cate_clie) + '",' //DPORTA
                prod += '"CAT_DESC":"' + (($("#hfdes_cate").val()) != "" ? $("#hfdes_cate").val() : des_cate_clie) + '",' //DPORTA
                prod += '"DESP_VENTA":"NO",'; //DPORTA
                prod += '"TIPO_DCTO":"' + datos[0].TIPO_DCTO + '",';
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
            //console.log(datos);
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

//Limpiar campos para llenar nuevo producto
function LimpiarCamposDetalle() {

    if ($("#txtNroDctoCliente").val() == "") {
        $("#txtNroDctoCliente").focus();
    } else if ($("#txtNroDctoCliente").val() == "" && $("#cboVendedor").val() == "") {
        $("#cboVendedor").focus();
    } else {
        if (prmtCURS == "SI") {
            $("#txt_desc_producto").focus();
        } else {
            $("#txt_cod_a_producto").focus();
        }
    }
    $('#txt_cod_a_producto, #txt_cod_producto,#txt_desc_producto').val('');

    $("#txt_cantidad").val('');
    $("#txtPrecioUnitario").val('');
    $("#txt_descuento_det").val('0.00');
    $("#txt_glosa_det").val('');
    $("#txtStockReal").val('');
    stockReal = 0;

    $("#hfTxtGlosaDet").val('');

    $("#hfCOD_PROD").val('');
    $("#hfCostoProducto").val('');
    prodActual = {};
    if (detallesVenta.length == 0) {
        $("#cbo_moneda").removeAttr("disabled");
        $("#cbo_Sucursal").removeAttr("disabled");
        $("#cbo_Empresa").removeAttr("disabled");
        $("#txtClientes").removeAttr("disabled");
        $("#div_btn_completar").attr("style", "display:none");
        $("#rbRedondeo,#rbDonacion").attr("disabled", "disabled").prop('checked', false).parent().removeClass('checked');
    } else {
        $("#txt_cantidad").removeAttr("disabled");
        $("#txtStockReal").removeAttr("disabled");
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
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC_DET" +
            "&PROD_CODE=" + codeProd +
            "&CTLG=" + $("#cbo_Empresa").val() +
            "&ALMC_CODE=" + $('#cbo_Sucursal').val(),
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

function ObtenerPrecioProducto(codeProd, ctlg, scsl, precioInd, pidmCliente) {
    var precios;
    if (precioInd != "L") {
        pidmCliente = "";
    }
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=4&PROD_CODE=" + codeProd + "&CTLG=" + ctlg +
            "&PRECIO_IND=" + precioInd +
            "&SCSL=" + scsl +
            //"&ALMC_CODE=" + $("#cbo_Sucursal :selected").attr("data-almc"),
            "&ALMC_CODE=" + $('#cbo_Sucursal').val() +
            "&PIDM=" + pidmCliente,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            precios = datos;
            if (precioInd == "L" && precios.length != 0) {
                $("#hfcod_cate").val(datos[0].COD_CATEGORIA);//DPORTA
                $("#hfdes_cate").val(datos[0].DES_CATEGORIA);//DPORTA
            } else {
                $("#hfcod_cate").val("");
                $("#hfdes_cate").val("");
            };
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
                    prod += '"PRECIO_VENTA":"' + (precios[0].PRECIO_VENTA).replace(",", ".") + '",';//E
                    prod += '"PRECIO_MINIMO":"' + (precios[0].PRECIO_MINIMO).replace(",", ".") + '",';//E
                    prod += '"RANGOS_PRECIO":[] ,'; //C

                    pv = (precios[0].PRECIO_VENTA).replace(",", ".");
                    pm = (precios[0].PRECIO_MINIMO).replace(",", ".");
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
                    prod += '"PRECIO_VENTA":"' + (pVenta.toFixed(2)).replace(",", ".") + '",';//E
                    prod += '"PRECIO_MINIMO":"' + (pMinimo.toFixed(2)).replace(",", ".") + '",';//E
                    prod += '"RANGOS_PRECIO":[] ,'; //C

                    pv = (pVenta.toFixed(2)).replace(",", ".");
                    pm = (pMinimo.toFixed(2)).replace(",", ".");
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
        var precios = ObtenerPrecioProducto(codeProd, ctlg, scsl, precioInd, $("#hfPIDM").val());

        if (precios.length > 0) {
            if (precioInd == "E") {//Precio estandar 
                prod += '"PRECIO_VENTA":"' + (precios[0].PRECIO_VENTA).replace(",", ".") + '",';//E
                prod += '"PRECIO_MINIMO":"' + (precios[0].PRECIO_MINIMO).replace(",", ".") + '",';//E
                prod += '"RANGOS_PRECIO":[] ,'; //C

                pv = (precios[0].PRECIO_VENTA).replace(",", ".");
                pm = (precios[0].PRECIO_MINIMO).replace(",", ".");
                r = [];

            }
            else if (precioInd == "C") {//Precio por cantidad 
                prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                prod += '"PRECIO_MINIMO":"' + "0" + '",';//E  
                prod += '"RANGOS_PRECIO":' + JSON.stringify(precios) + ','; //C

                pv = "0";
                pm = "0";
                r = precios;
            } else {
                prod += '"PRECIO_VENTA":"' + (precios[0].PRECIO_VENTA).replace(",", ".") + '",';//L
                prod += '"PRECIO_MINIMO":"' + (precios[0].PRECIO_MINIMO).replace(",", ".") + '",';//L
                prod += '"RANGOS_PRECIO":[] ,'; //C

                pv = (precios[0].PRECIO_VENTA).replace(",", ".");
                pm = (precios[0].PRECIO_MINIMO).replace(",", ".");
                r = [];
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
    res += '<th>SERVICIO</th>'
    res += '<th style="text-align: left">DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>PU</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th style="display: none;">DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th style="display: none;">ISC</th>'
    res += '<th>DETRACCIÓN</th>'
    res += '<th style="display: none;">ALMACÉN</th>'
    res += '<th style="display: none;">CATEGORIA CLIENTE</th>'
    res += '<th style="display: none;">DESPACHO EN VENTA</th>'
    res += '<th>' + (prmtGLIT === "SI" ? GLIT.toUpperCase() : 'GLOSA') + '</th>'
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

        if ($("#hfCompletoInd").val() == "N" && $("#hfPermisoModificarVenta").val() == "S" && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si tiene el permiso y aún no está completado
            res += '<td class="cantidad' + detallesVenta[i].ITEM + '" align="center"><input class="input2" type="text" onblur="ActualizaCantidad(this,this.value,\'' + i + '\')" value="' + detallesVenta[i].CANTIDAD + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        }
        else {
            res += '<td class="cantidad' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].CANTIDAD + '</td>'
        }

        res += '<td align="center">' + detallesVenta[i].DESC_UNIDAD + '</td>'


        if (detallesVenta[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N" && $("#hfPermisoModificarVenta").val() == "S" && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si es precio estandar es modificable
            res += '<td class="precio' + detallesVenta[i].ITEM + '" align="center"><input class="input2" type="text" onblur="ActualizaPrecioEstandarDetalle(this,this.value,\'' + i + '\')" value="' + detallesVenta[i].PRECIO_DETALLE + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        }
        else {
            res += '<td class="precio' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].PRECIO_DETALLE + '</td>'
        }

        res += '<td class="bruto' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].TOTAL_BRUTO + '</td>'

        res += '<td style="display: none;" class="descuento' + detallesVenta[i].ITEM + '" style="text-align: center">' + detallesVenta[i].MONTO_DESCUENTO + '</td>'

        res += '<td class="suma neto' + detallesVenta[i].ITEM + '"   align="center">' + detallesVenta[i].TOTAL_NETO + '</td>'

        res += '<td style="display: none;" class="isc" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].MONTO_ISC + '</td>'

        res += '<td class="detraccion" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].MONTO_DETRAC + '</td>'

        res += '<td style="display: none;" class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].DESC_ALMC + '</td>'

        res += '<td style="display: none;" class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].CAT_DESC + '</td>'

        res += '<td style="display: none;" class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].DESP_VENTA + '</td>'

        //if ($("#hfCompletoInd").val() == "N" && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si no está completo y no es un anticipo
        if ($("#hfCompletoInd").val() == "N") {//Si no está completo
            res += '<td class="glosa" id ="det' + detallesVenta[i].ITEM + '" align="center"><input class="input2" type="text" onblur="ActualizaGlosaDet(this,this.value,\'' + i + '\')" value="' + detallesVenta[i].GLOSA + '"/></td>'
        }
        else {
            res += '<td class="glosa" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].GLOSA + '</td>'
        }

        //res += '<td class="glosa" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].GLOSA + '</td>'

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
    res += '<th>SERVICIO</th>'
    res += '<th style="text-align: left">DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>PU</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th style="display: none;">DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th style="display: none;">ISC</th>'
    res += '<th>DETRACCIÓN</th>'
    res += '<th style="display: none;">ALMACÉN</th>'
    res += '<th style="display: none;">CATEGORIA CLIENTE</th>'
    res += '<th style="display: none;">DESPACHO EN VENTA</th>'
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

        if ($("#hfCompletoInd").val() == "N" && $("#hfPermisoModificarVenta").val() == "S" && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si tiene el permiso y aún no está completado
            res += '<td class="cantidad' + detallesVenta[i].ITEM + '" align="center"><input class="input2" type="text" onblur="ActualizaCantidad(this,this.value,\'' + i + '\')" value="' + detallesVenta[i].CANTIDAD + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        }
        else {
            res += '<td class="cantidad' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].CANTIDAD + '</td>'
        }

        res += '<td align="center">' + detallesVenta[i].DESC_UNIDAD + '</td>'


        if (detallesVenta[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N" && $("#hfPermisoModificarVenta").val() == "S" && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si es precio estandar es modificable
            res += '<td class="precio' + detallesVenta[i].ITEM + '" align="center"><input class="input2" type="text" onblur="ActualizaPrecioEstandarDetalle(this,this.value,\'' + i + '\')" value="' + detallesVenta[i].PRECIO_DETALLE + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        }
        else {
            res += '<td class="precio' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].PRECIO_DETALLE + '</td>'
        }

        res += '<td class="bruto' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].TOTAL_BRUTO + '</td>'

        res += '<td style="display: none;" class="descuento' + detallesVenta[i].ITEM + '" style="text-align: center">' + detallesVenta[i].MONTO_DESCUENTO + '</td>'

        res += '<td class="suma neto' + detallesVenta[i].ITEM + '"   align="center">' + detallesVenta[i].TOTAL_NETO + '</td>'

        res += '<td style="display: none;" class="isc" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].MONTO_ISC + '</td>'

        res += '<td class="detraccion" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].MONTO_DETRAC + '</td>'

        res += '<td style="display: none;" class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].DESC_ALMC + '</td>'

        res += '<td style="display: none;" class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].CAT_DESC + '</td>'

        res += '<td style="display: none;" class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].DESP_VENTA + '</td>'

        //if ($("#hfCompletoInd").val() == "N" && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si no está completo y no es un anticipo
        if ($("#hfCompletoInd").val() == "N") {//Si no está completo
            res += '<td class="glosa" id ="det' + detallesVenta[i].ITEM + '" align="center"><input class="input2" type="text" onblur="ActualizaGlosaDet(this,this.value,\'' + i + '\')" value="' + detallesVenta[i].GLOSA + '"/></td>'
        }
        else {
            res += '<td class="glosa" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].GLOSA + '</td>'
        }

        //res += '<td class="glosa" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].GLOSA + '</td>'

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
            $("#cbo_Sucursal").removeAttr("disabled");
            $("#cbo_Empresa").removeAttr("disabled");
            $("#txtClientes").removeAttr("disabled");
            $("#cboTipoDoc").removeAttr("disabled");
            $("#txtNroDctoCliente").removeAttr("disabled");

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
        $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
        $("#txtMonto").val($("#txt_monto_total").val());
        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
    }
}

function AplicarImpuestosPorItem() {//DPORTA SIN-IMPUESTOS
    if ($("#hfCompletoInd").val() == "N") {
        for (var i = 0; i < detallesVenta.length; i++) {//DPORTA
            if (parseFloat(detallesVenta[i].PRECIO_DETALLE) > 0) {
                ActualizaMontosPorItem(parseFloat(detallesVenta[i].PRECIO_DETALLE), i)
            }
        }
    }
}

function ActualizaMontosPorItem(valor, indice) {//DPORTA SIN-IMPUESTOS
    if (detallesVenta.length != 0) {
        if ($("#hfCompletoInd").val() == "S") {
            alertCustom("No puede modificar un detalle de un documento ya 'Completado'")
        } else {

            var precioVenta, precioMinimo;
            let tipoDocCode = $("#cboSerieDocVenta :selected").attr("data-tipoDocCode");//DPORTA SIN-IMPUESTOS
            //La moneda de venta coincide con la moneda del producto
            if (detallesVenta[indice].MONEDA == $("#cbo_moneda").val()) {
                precioVenta = detallesVenta[indice].PRECIO_VENTA;
            } else {
                var valorCambio = parseFloat($("#txt_valor_cambio").val());
                //La moneda de venta no coincide con la moneda del producto                                          
                if (detallesVenta[indice].MONEDA == $("#cbo_moneda [data-tipo='MOBA']").val()) {
                    precioVenta = parseFloat(detallesVenta[indice].PRECIO_VENTA) / valorCambio;
                } else {
                    //Si es igual a la moneda alterna: Convierte a MOBA
                    precioVenta = parseFloat(detallesVenta[indice].PRECIO_VENTA) * valorCambio;
                }
            }

            if (precioMinimo == "" && precioMinimo == "0" && precioMinimo == "0.00") {
                precioMinimo = valor;
            }

            //var factor = calcula_factor_conversion(detallesVenta[indice].CODE_UNIDAD_PROD_BASE, detallesVenta[indice].CODE_UNIDAD) // factor conversion unidades
            //Calcular 01-TOTAL BRUTO, 02-DESCUENTO, 03-TOTAL NETO, 04-DETRACCION,05-ISC
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
            if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') { //DPORTA SIN-IMPUESTOS
                var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
            } else {
                var decimalIGV = 0;
            }

            var detraccion, isc;

            //if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') {
            if (tipoDocCode == '0001') {//DPORTA SIN-IMPUESTOS
                detraccion = parseFloat(detallesVenta[indice].DETRACCION) * (totalNeto);
            /*04*/detallesVenta[indice].MONTO_DETRAC = detraccion.toFixed(2);
            } else {
                detraccion = parseFloat(0) * (totalNeto);
            /*04*/detallesVenta[indice].MONTO_DETRAC = detraccion.toFixed(2);
            }


            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                isc = parseFloat(detallesVenta[indice].ISC / 100) * (totalNeto); //Total neto Sin IGV
                /*05*/ detallesVenta[indice].MONTO_ISC = isc.toFixed(2);

            } else {
                isc = parseFloat(detallesVenta[indice].ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                /*05*/detallesVenta[indice].MONTO_ISC = isc.toFixed(2);
            }

            ListarTablaDetalles(ObtenerTablaDetalles());
            $(".btnEliminarDetalle").remove();
            $("#tabla_det").DataTable().column(0).visible(false);
            CalcularDetraccion();
            CalcularDatosMonetarios();
            $("#lblImporteCobrar").html($("#txt_monto_total").val());
            $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
            ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
            //}
        }
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
                montoParaDetraccion += Math.round(parseFloat(detallesVenta[i].TOTAL_NETO));
                detraccionActual += Math.round(parseFloat(detallesVenta[i].MONTO_DETRAC));
            }
        }

        //Muestra detraccion MOAL / MOBA
        var valorCambio = parseFloat($("#txt_valor_cambio").val());
        var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());

        //$("#txt_monto_detraccion").val(detraccionActual.toFixed(2));
        $("#txt_monto_detraccion").val(detraccionActual);

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
                $("#txt_detraccion").val(detraccionMoal);
            } else {
                $("#txt_detraccion").val(detraccionActual);
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
        var percepcion = 0;
        var retencion = 0;
        var importeCobrar = 0;
        let tipoDocCode = $("#cboSerieDocVenta :selected").attr("data-tipoDocCode");//DPORTA SIN-IMPUESTOS
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

            if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') { //DPORTA SIN-IMPUESTOS
                //IGV(%) igv definido como parametro de sistema
                igv = parseFloat($("#hfIMPUESTO").val());
            } else {
                igv = 0;
            }

            //Op Gravada Sin IGV
            var opGravadaSinIGV = opGravada / (igv / 100 + 1); //Ejm. OpGrav/1.18   

            //IGV calculado de la operacion gravada sin IGV
            igvCalc = (opGravadaSinIGV * (parseFloat(igv) / 100));

            baseImponible += opExonerada + opInafecta + opGravadaSinIGV

            importeTotal = baseImponible + igvCalc;
            //Retención (Parametro:RETN): Si el cliente es agente de retención no aplica, si somos agentes de retención y ellos no, sí se aplica retención: 
            if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') { //DPORTA SIN-IMPUESTOS
                var parametroRetencion = parseFloat($("#hfParamRetencion").val()) / 100;
            } else {
                var parametroRetencion = 0;
            }

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
                if (!$("#chk_Autodetraccion").is(":checked")) {
                    importeCobrar -= parseFloat($("#txt_detraccion").val());
                } 
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

        var importeCobrar = parseFloat(gImporteCobrar);
        if ($('#rbRedondeo').is(":checked")) {
            importeCobrar += parseFloat($("#txtRedondeo").val());
        }
        if ($('#rbDonacion').is(":checked")) {
            importeCobrar += parseFloat($("#txtDonacion").val());
        }

        //$("#txt_monto_total").val(importeCobrar.toFixed(2))
        $("#lblImporteCobrar").html($("#txt_monto_total").val());
        $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
        $("#txtMonto").val($("#txt_monto_total").val())//DPORTA

        if (parseFloat($("#txt_monto_total").val()) != 0 && parseFloat($("#txt_subtotal").val()) != 0 && parseFloat($("#txt_subtotal").val()) >= parseFloat($("#hfParamDetraccion").val())) { //DPORTA 25/02/2021
            $("#chk_Autodetraccion").removeAttr("disabled");
        } else {
            if (!$("#chk_Autodetraccion").is(":checked")) {
                $('#chk_Autodetraccion').attr("disabled", "disabled");
                $("#chk_Autodetraccion").prop('checked', false).parent().removeClass('checked');
            } else {
                $('#chk_Autodetraccion').attr("disabled", "disabled");
            }           
        }

        $("#rbRedondeo").is(":checked") ? $("#txtRedondeo2").val($("#txtRedondeo").val()) : $("#txtRedondeo2").val("0.00");
        $("#rbDonacion").is(":checked") ? $("#txtDonacion2").val($("#txtDonacion").val()) : $("#txtDonacion2").val("0.00");

        if ($.trim($("#txt_detraccion").val()) == "") {
            $("#txt_detraccion").val("0.00");
        }
    }
}

// VALIDACIONES 
//function ValidarProductoAgregado(obj, precioUnidad, glosa) {//DPORTA VALIDACIÓN PARA CUANDO SE APRUEBE EL EDITAR EN EL DETALLE LA CANTIDAD 
//    for (var i = 0; i < detallesVenta.length; i++) {
//        //if (detallesVenta[i].CODIGO == obj.CODIGO ) {
//        //    if (detallesVenta[i].PRECIO_DETALLE == precioUnidad && detallesVenta[i].GLOSA == glosa) {
//        //        return i;
//        //    }
//        //}
//        //if (detallesVenta[i].CODIGO == obj.CODIGO && detallesVenta[i].CODIGO == obj.CODIGO && detallesVenta[i].GLOSA != glosa) {
//        //    return -1;
//        //} else {
//        //    return i;
//        //}
//        if (detallesVenta[i].CODIGO == obj.CODIGO) {
//            if (detallesVenta[i].PRECIO_DETALLE == precioUnidad && detallesVenta[i].GLOSA == glosa) {
//                if ($("#hfPermisoModificarVenta").val() == "N") {
//                    infoCustom2("El producto ya se encuentra en el item " + detallesVenta[i].ITEM + " del detalle.");
//                    //infoCustom2("El servicio ya ha sido agregado");
//                } else {
//                    infoCustom2("El producto ya se encuentra en el item " + detallesVenta[i].ITEM + " con el mismo precio y glosa, puede modificarlo directamente en el detalle.");
//                    //infoCustom2("El servicio ya ha sido agregado con el mismo precio, puede modificarlo directamente en el detalle.");
//                }
//                return i;
//            }

//            if (detallesVenta[i].CODIGO == obj.CODIGO && detallesVenta[i].GLOSA == glosa && detallesVenta[i].PRECIO_DETALLE == precioUnidad) {
//                if ($("#hfPermisoModificarVenta").val() == "N") {
//                    infoCustom2("El producto ya se encuentra en el item " + detallesVenta[i].ITEM + " del detalle.");
//                    //infoCustom2("El servicio ya ha sido agregado");
//                } else {
//                    infoCustom2("El producto ya se encuentra en el item " + detallesVenta[i].ITEM+ " puede modificarlo directamente en el detalle.");
//                    //infoCustom2("El servicio ya ha sido agregado con el mismo precio, puede modificarlo directamente en el detalle.");
//                }
//                return i;
//            }
//        }
//    }
//    return -1;
//}

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

function ValidaPrecioEstandar(venta, min) {
    if (min == "") {
        min = "0";
    } else {
        var c = $("#txtPrecioUnitario").val();
        if ((c.indexOf(".")) > 0) {
            var nroDecimales = c.substring(c.indexOf(".") + 1, c.length).length;
            if (nroDecimales > prmtDIGP) {
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

function ValidaPrecioCliente(venta, min) {
    if (min == "") {
        min = "0";
    } else {
        var c = $("#txtPrecioUnitario").val();
        if ((c.indexOf(".")) > 0) {
            var nroDecimales = c.substring(c.indexOf(".") + 1, c.length).length;
            if (nroDecimales > prmtDIGP) {
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
//Obtiene el precio cantidad para el producto seleccionado
function ValidaPrecioCantidad() {

    if (prodActual != null && prodActual.length != 0 && $("#txt_cantidad").val() != "") {
        if (prodActual.PRECIO_IND == "C") {


            if (typeof prodActual.RANGOS_PRECIO != "undefined" && prodActual.RANGOS_PRECIO.length > 0) {

                if (prodActual.MONEDA == $("#cbo_moneda").val()) {
                    //Moneda de producto coincide con la de cbo_moneda
                    var pLength = prodActual.RANGOS_PRECIO.length;
                    for (var i = pLength - 1; i >= 0; i--) {
                        if (parseFloat($("#txt_cantidad").val()) >= parseFloat(prodActual.RANGOS_PRECIO[i].RANGO)) {
                            $("#txtPrecioUnitario").val(prodActual.RANGOS_PRECIO[i].PRECIO)
                            break;
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

// VERIFICACIÓN DE COD. OP Y COD. AUT.
//function verificarNroOperacion(nroOpera, nroOpera2, nroOpera3) { //DPORTA 21/04/2021

//    if (nroOpera2 === '-' && nroOpera3 === '-') {
//        nroOpera3 = '@';
//    }
//    //var respuesta = false;
//    let arrayCodOperaciones = [nroOpera, nroOpera2, nroOpera3];

//    let duplicados = arrayCodOperaciones =>
//        new Set(arrayCodOperaciones).size < arrayCodOperaciones.length

//    if (duplicados(arrayCodOperaciones) === true) {
//        respuesta = "Duplicado";
//    } else {
//        $.ajax({
//            type: "post",
//            url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=4.5&p_NRO_OPERA=" + nroOpera + "/" + nroOpera2 + "/" + nroOpera3,
//            contenttype: "application/json;",
//            datatype: "json",
//            async: false,
//            success: function (datos) {
//                //respuesta = datos;
//                if (datos == 'OK') {
//                    respuesta = datos;
//                } else {
//                    respuesta = datos;
//                };
//            },
//            error: function (msg) {
//                alertCustom("Error");
//            }
//        });
//    }
//    return respuesta;
//}

// VERIFICACIÓN DE COD. OP Y COD. AUT.
function verificarNroOperacionVenta(origen, origen2, origen3, nroOpera, nroOpera2, nroOpera3) { //DPORTA 21/04/2021    
    if ($("#cboMedioPago").val() == '0005' || $("#cboMedioPago").val() == '0006') {
        if (origen.length == 16) {
            origen = origen.substring(12);
        }        
    } else if ($("#cboMedioPago").val() == '0008'){
        origen = "-";
        nroOpera = '%';
    }

    if ($("#cboMedioPago2").val() == '0005' || $("#cboMedioPago2").val() == '0006') {
        if (origen2.length == 16) {
            origen2 = origen2.substring(12);
        }
    } else if ($("#cboMedioPago2").val() == '0008') {
        origen2 = "-";
        nroOpera2 = '-';
    }

    if ($("#cboMedioPago3").val() == '0005' || $("#cboMedioPago3").val() == '0006') {
        if (origen3.length == 16) {
            origen3 = origen3.substring(12);
        }
    } else if ($("#cboMedioPago3").val() == '0008') {
        origen3 = "-";
        nroOpera3 = '-';
    }   
    
    if (nroOpera2 === '-' && nroOpera3 === '-') {
        nroOpera3 = '@';
    }
    //var respuesta = false;
    let arrayCodOperaciones = [nroOpera, nroOpera2, nroOpera3];

    let duplicados = arrayCodOperaciones =>
        new Set(arrayCodOperaciones).size < arrayCodOperaciones.length

    if (duplicados(arrayCodOperaciones) === true) {
        respuesta = "Duplicado";
    } else {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=4.6&p_NRO_OPERA=" + nroOpera + "/" + nroOpera2 + "/" + nroOpera3 + "&p_ORIGEN_OPERA=" + origen + "/" + origen2 + "/" + origen3,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //respuesta = datos;
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
    }
    return respuesta;
}

// MANTENIMIENTO DE DOCUMENTO VENTA
function CompletaryPagar() {

    $("#A4").attr("disabled", true);
    var current_nro_lineas = parseInt($("#cboSerieDocVenta :selected").attr("data-lineas"));

    var current_filas_table = (obtenerNumeroItems($("#tabla_det")) !== null) ? obtenerNumeroItems($("#tabla_det")) : 0;

    if (current_nro_lineas < current_filas_table) {
        limitItems = true;
    } else {
        limitItems = false;
    }

    if (limitItems) {

        var current_nro_lineas = parseInt($("#cboSerieDocVenta :selected").attr("data-lineas"));
        infoCustom2("Debe de eliminar items, el tipo de documento éstá configurado para registrar sólo " + current_nro_lineas + " items.");
        return;

    } else {
        
        //setTimeout(() => {
            GrabarCompletarDctoVenta();
        //}, Math.floor(Math.random() * 2000));

    }
}

function GrabarCompletarDctoVenta() {
    /*
   - Esta función modifica y completa el documento no grabado previamente, o inserta un nuevo documento en caso
   el documento no aún no esté grabado   
   */
    var continuar = false;
    var aux_vuelto = false;
    var verificaNroOpera = "";//DPORTA 21/04/2021
    var monto = $("#txtMonto").val();
    var efectivo = $('#txtEfectivo').val();
    var vuelto = $('#txtVuelto').val();

    var efectivo2 = $('#txtEfectivo2').val(); //25/02

    var efectivo3 = $('#txtEfectivo3').val(); //25/02

    if (monto.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
        var re = /,/g;
        monto = monto.replace(re, '');
    }

    if (efectivo.indexOf(',') !== -1) { // Valida si el efectivo contiene el caracter ","
        var re = /,/g;
        efectivo = efectivo.replace(re, '');
    }

    if (vuelto.indexOf(',') !== -1) { // Valida si el vuelto contiene el caracter ","
        var re = /,/g;
        vuelto = vuelto.replace(re, '');
    }

    if (efectivo2 != "") { //25/02
        if (efectivo2.indexOf(',') !== -1) { // Valida si el efectivo contiene el caracter ","
            var re = /,/g;
            efectivo2 = efectivo2.replace(re, '');
        }
    } else {
        efectivo2 = 0;
    }

    if (efectivo3 != "") { //25/02
        if (efectivo3.indexOf(',') !== -1) { // Valida si el efectivo contiene el caracter ","
            var re = /,/g;
            efectivo3 = efectivo3.replace(re, '');
        }
    } else {
        efectivo3 = 0;
    }
    //Se agregó .toFixed(2) al monto y sumita 28/02/2022
    monto = parseFloat(monto).toFixed(2);
    efectivo = parseFloat(efectivo);
    vuelto = parseFloat(vuelto);

    efectivo2 = parseFloat(efectivo2); //25/02
    efectivo3 = parseFloat(efectivo3); //25/02
    var sumita = parseFloat(efectivo + efectivo2 + efectivo3).toFixed(2);
    try {
        if (parseFloat($("#lblImporteCobrar").text()) >= 0) {
            if ($('#cboMedioPago').val() === "0008") { //EFECTIVO DIRECTO
                if (parseFloat(sumita) >= parseFloat(monto)) { //25/02
                    if (vuelto >= 0) {
                        continuar = true;
                        aux_vuelto = true;
                    } else {
                        infoCustom2("Vuelto inválido");
                        $("#A4").attr("disabled", false);
                        return;
                    }
                } else {
                    infoCustom2("Monto recibido inválido");
                    $("#A4").attr("disabled", false);
                    return;
                }
            } else {
                if ($("#cbo_modo_pago").val() == "0002" || (parseFloat($("#txtAcumulado").val()) == parseFloat($("#txtMonto").val()))) { // DPORTA 02/03/2020
                    continuar = true;
                    aux_vuelto = false;
                } else {
                    infoCustom2("El monto acumulado debe coincidir con el monto a cobrar");
                    $("#A4").attr("disabled", false);
                    return;
                }
            }
        }
        else {
            infoCustom2("Monto de cobro inválido");
            $("#A4").attr("disabled", false);
            return;
        }
    }
    catch (er) {
        infoCustom2("Monto de cobro inválido");
        $("#A4").attr("disabled", false);
        return;
    }

    if ($("#txtNumDctoComp").val() == "") {//INSERTA
        //CalcularDatosMonetarios();
        //Validaciones iniciales antes de guardado

        //DPORTA 13/04/2021
        if (vErrors(['cbo_direccion', 'cboDocumentoVenta', 'cboVendedor', 'txtClientes', 'cboDocumentoVenta', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'cboSerieDocVenta', 'txtNroDocVenta', 'txt_valor_cambio_Oficial', 'txt_valor_cambio'])) {
            if ($("#cbo_OrigenPago").val().substring(0, 1) == "C" && $("#cbo_Det_Origen").val() == null) {
                vErrorBodyAnyElement(".obligatorio")
                camposCompletos = "P";
                continuar = false;
                alertCustom("Complete los campos de Cobro de Venta");
            } else {
                continuar = true;
            }
        } else {
            continuar = false;
            $("#A4").attr("disabled", false);
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
        //Fin validaciones iniciales
        var camposCompletos; // (N)inguno, (P)arcial, (T)odos
        if (continuar) {
            //var nroCamposOblig = $(".obligatorio").length - $("#p_DatCobro div.obligatorio").length;
            //vErrorBodyAnyElement(".obligatorio")
            //var nroCamposCompl = nroCamposOblig - $("#p_DatCobro .error").length;
            //$("#p_DatCobro input").parent().parent().removeClass("error");
            //$("#p_DatCobro select").parent().parent().removeClass("error");
            //$("#p_DatCobro .icon-ok").parent().remove();


            //if ($("#chkDespachoVenta").is(":checked") && $("#cbo_modo_pago").val() == "0001") {
            //    pagarInd = true;//Es obligatorio pagar
            //    camposCompletos = "T";
            //} else if ($("#txtFechaPago").val() == "" && $("#cbo_modo_pago").val() == "0002") { // SI ES CRÉDITO 28/02
            //    camposCompletos = "N";
            //    pagarInd = false;
            //}
            //else {
            //    pagarInd = false;
            //    if (nroCamposCompl == 0) {
            //        camposCompletos = "N";

            //    } else if (nroCamposCompl == nroCamposOblig) {
            //        camposCompletos = "T";

            //    } else {
            //        vErrorBodyAnyElement(".obligatorio")
            //        camposCompletos = "P";
            //        continuar = false;
            //        alertCustom("Complete o limpie los campos de Cobro de Venta");
            //    }

            //}

            if ($("#cbo_modo_pago").val() == "0002") {
                camposCompletos = "N";
                pagarInd = false;
            } else {
                camposCompletos = "T";
                pagarInd = true;
            }

            //Si es obligatorio pagar Validar que los datos de pago no esten vacios
            var detallesPago = "";
            var detallesPago2 = ""; //25/02
            var detallesPago3 = ""; //25/02

            if (pagarInd) {
                if (continuar) {
                    detallesPago = pagar();
                    detallesPago2 = pagar2(); //25/02
                    detallesPago3 = pagar3(); //25/02
                    if (detallesPago == "") {
                        continuar = false;
                    }
                }
            //} else {
            //    if (camposCompletos == 'T') {
            //        detallesPago = pagar();
            //        detallesPago2 = pagar2(); //25/02
            //        detallesPago3 = pagar3(); //25/02
            //        if (detallesPago == "") {
            //            continuar = false;
            //        }
            //    }
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
        if (continuar) {//DPORTA 21/04/2021
            //if ($("#cboMedioPago").val() == '0001' || $("#cboMedioPago").val() == '0003' || $("#cboMedioPago").val() == '0005' || $("#cboMedioPago").val() == '0006' || $("#cboMedioPago").val() == '0020' ||
            //    $("#cboMedioPago2").val() == '0001' || $("#cboMedioPago2").val() == '0003' || $("#cboMedioPago2").val() == '0005' || $("#cboMedioPago2").val() == '0006' || $("#cboMedioPago2").val() == '0020' ||
            //    $("#cboMedioPago3").val() == '0001' || $("#cboMedioPago3").val() == '0003' || $("#cboMedioPago3").val() == '0005' || $("#cboMedioPago3").val() == '0006' || $("#cboMedioPago3").val() == '0020') {
            if (mediosPago.includes($("#cboMedioPago").val()) || mediosPago.includes($("#cboMedioPago2").val()) || mediosPago.includes($("#cboMedioPago3").val())) {

                //verificaNroOpera = verificarNroOperacion($("#cbo_OrigenPago").val().substring(0, 1) + '-' + ($("#cboMedioPago").val() == '0020' ? $("#cbo_appPago").val() + " - " + "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val()),
                //    $("#cbo_OrigenPago2").val().substring(0, 1) + '-' + ($("#cboMedioPago2").val() == '0020' ? $("#cbo_appPago2").val() + " - " + "OP" + $("#txtNroOpe2").val() : $("#txtNroOpe2").val()),
                //    $("#cbo_OrigenPago3").val().substring(0, 1) + '-' + ($("#cboMedioPago3").val() == '0020' ? $("#cbo_appPago3").val() + " - " + "OP" + $("#txtNroOpe3").val() : $("#txtNroOpe3").val()));

                verificaNroOpera = verificarNroOperacionVenta(($("#txtDestino").val() === undefined || $("#txtDestino").val() === ""  ? "-" : $("#txtDestino").val()),
                    ($("#txtDestino2").val() === undefined || $("#txtDestino2").val() === "" ? "-" : $("#txtDestino2").val()),
                    ($("#txtDestino3").val() === undefined || $("#txtDestino3").val() === "" ? "-" : $("#txtDestino3").val()),
                    $("#cbo_OrigenPago").val().substring(0, 1) + '-' + ($("#cboMedioPago").val() == '0020' ? $("#cbo_appPago").val() + " - " + "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val()),
                    $("#cbo_OrigenPago2").val().substring(0, 1) + '-' + ($("#cboMedioPago2").val() == '0020' ? $("#cbo_appPago2").val() + " - " + "OP" + $("#txtNroOpe2").val() : $("#txtNroOpe2").val()),
                    $("#cbo_OrigenPago3").val().substring(0, 1) + '-' + ($("#cboMedioPago3").val() == '0020' ? $("#cbo_appPago3").val() + " - " + "OP" + $("#txtNroOpe3").val() : $("#txtNroOpe3").val()));

                if (verificaNroOpera == 'OK') {
                    continuar = true;
                } else if (verificaNroOpera == "Duplicado") {
                    continuar = false;
                    $("#A4").attr("disabled", false);
                    alertCustom("Está ingresando el " + $("#lbl_detalle4").html() + " duplicado en los campos de cobro.");
                    $("#txtNroOpe, #txtNroOpe2, #txtNroOpe3").pulsate({
                        color: "#FF0000",
                        reach: 20,
                        repeat: 3,
                        glow: true
                    });
                } else {
                    continuar = false;
                    $("#A4").attr("disabled", false);
                    if (verificaNroOpera.substring(0, 1) == 'B') { //BANCO
                        infoCustom2("El Nro. de Op. " + verificaNroOpera.split("@")[0].substring(2).replace("OP", '') + " ya se encuentra registrado en el sistema");
                        if (verificaNroOpera.split("@")[1] == "1") {
                            $("#txtNroOpe").pulsate({
                                color: "#FF0000",
                                reach: 20,
                                repeat: 3,
                                glow: true
                            });
                        } else if (verificaNroOpera.split("@")[1] == "2") {
                            $("#txtNroOpe2").pulsate({
                                color: "#FF0000",
                                reach: 20,
                                repeat: 3,
                                glow: true
                            });
                        } else {
                            $("#txtNroOpe3").pulsate({
                                color: "#FF0000",
                                reach: 20,
                                repeat: 3,
                                glow: true
                            });
                        }
                    } else { //CAJA
                        infoCustom2("El Cod. de Aut. " + verificaNroOpera.split("@")[0].substring(2) + " ya se encuentra registrado en el sistema");
                        if (verificaNroOpera.split("@")[1] == "1") {
                            $("#txtNroOpe").pulsate({
                                color: "#FF0000",
                                reach: 20,
                                repeat: 3,
                                glow: true
                            });
                        } else if (verificaNroOpera.split("@")[1] == "2") {
                            $("#txtNroOpe2").pulsate({
                                color: "#FF0000",
                                reach: 20,
                                repeat: 3,
                                glow: true
                            });
                        } else {
                            $("#txtNroOpe3").pulsate({
                                color: "#FF0000",
                                reach: 20,
                                repeat: 3,
                                glow: true
                            });
                        }
                    }
                }
            }
        }

        if (continuar) {
            // variables adicionales a una venta
            var efectivo_recibido = "";
            var efectivo_recibido_alterno = "";
            var vuelto_recibido = "";
            var vuelto_alterno = "";
            //

            var valorCambio = parseFloat($("#txt_valor_cambio").val());
            var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());
            if (detallesVenta.length != 0) {
                //Bloquear("ventana");
                var detalles = "";
                var detalles_bon = "";
                var detalles_mue = "";
                if ($("#cbo_moneda :selected").attr("data-tipo") == "MOBA") {
                    if (aux_vuelto) {
                        var efectivo_recibido = efectivo;
                        var efectivo_recibido_alterno = parseFloat(efectivo / valorCambio).toFixed(2);
                        var vuelto_recibido = vuelto;
                        var vuelto_alterno = parseFloat(vuelto / valorCambio).toFixed(2);
                    }
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
                            (detallesVenta[i].COSTO_PRODUCTO === undefined ? 0 : detallesVenta[i].COSTO_PRODUCTO) + ";" + //COSTO EN MONEDA BASE
                            detallesVenta[i].ALMC + ";" +
                            detallesVenta[i].CAT_CODE + ";" +
                            detallesVenta[i].DESP_VENTA +
                            "|";
                    }
                } else {
                    //Si los valores estan en MonedaAlterna
                    if (aux_vuelto) {
                        var efectivo_recibido = efectivo;
                        var efectivo_recibido_alterno = parseFloat(efectivo * valorCambio).toFixed(2);
                        var vuelto_recibido = vuelto;
                        var vuelto_alterno = parseFloat(vuelto * valorCambio).toFixed(2);
                    }
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
                            detallesVenta[i].COSTO_PRODUCTO + ";" + //COSTO EN MONEDA BASE
                            detallesVenta[i].ALMC + ";" +
                            detallesVenta[i].CAT_CODE + ";" +
                            detallesVenta[i].DESP_VENTA +
                            "|";
                    }
                }

                var data = new FormData();
                data.append('p_NUM_SERIE', ($("#cboSerieDocVenta :selected").html() == undefined) ? "" : $("#cboSerieDocVenta :selected").html());
                data.append('p_NUM_DCTO', $("#txtNroDocVenta").val());
                data.append('p_DCTO_CODE', $("#cboDocumentoVenta").val());
                data.append('p_FECHA_EMISION', $("#txt_fec_emision").val());
                data.append('p_FECHA_TRANS', $("#txt_fec_transaccion").val());
                data.append('p_FECHA_VENCIMIENTO', $("#txt_fec_vencimiento").val());
                data.append('p_CMNT_DCTO', ($("#txt_comentario").val() == "" || $("#txt_comentario").val().length == 0) ? "Orden de Servicio" : $("#txt_comentario").val().replace(/<\/?[^>]+(>|$)/gi, ""));
                data.append('p_CTLG_CODE', $("#cbo_Empresa").val());
                data.append('p_SCSL_CODE', $("#cbo_Sucursal").val());
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
                data.append("p_IMPORTE_RETENCION", ($("#txt_Retencion").val() == "") ? "0.00" : $("#txt_Retencion").val());
                data.append('p_IMPORTE_PERCEPCION', $("#txt_Percepcion").val());
                data.append('p_IMPORTE_OTROS', "0");
                data.append('p_MOPA_CODE', $("#cbo_modo_pago").val());
                data.append('p_CLIE_PIDM', $("#hfPIDM").val());
                data.append('p_CLIE_DOID', $("#cboTipoDoc").val());
                data.append('p_USVE_USUA_ID', $("#cboVendedor").val());
                data.append('p_COMPLETO_IND', "S");
                data.append('p_TRNH_DOC', "");
                data.append('p_CODE_REF', $("#txtNumAt").val());
                data.append('p_DCTO_CODE_REF', "XXXX");//CODIGO PARA ORDEN DE SERVICIO
                data.append('p_VALOR_CAMBIO', ($("#txt_valor_cambio").val() == "") ? "1" : $("#txt_valor_cambio").val());
                data.append('p_USUA_ID', $("#ctl00_txtus").val());
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
                data.append('p_DETALLES_PAGO2', detallesPago2); //25/02
                data.append('p_DETALLES_PAGO3', detallesPago3); //25/02
                data.append('p_DESPACHO_VENTA_IND', ($("#chkDespachoVenta").is(":checked") ? "S" : "N"));
                data.append('p_COBRAR_IND', (camposCompletos == "T") ? "S" : "N");
                data.append('p_VALIDAR_STOCK_IND', validarStockInd);
                data.append('p_DETALLES_BONI', detalles_bon);
                data.append('p_DIRECCION', $("#cbo_direccion option:selected").text());
                data.append('p_LATITUD', $("#cbo_direccion option:selected").attr("latitud"));
                data.append('p_LONGITUD', $("#cbo_direccion option:selected").attr("longitud"));
                data.append('p_DETALLES_MUESTRA', detalles_mue);
                data.append('p_TOTAL_GRATUITAS', total_boni);
                data.append('p_EFECTIVO_RECIBIDO', efectivo_recibido);
                data.append('p_EFECTIVO_RECIBIDO_ALTERNO', efectivo_recibido_alterno);
                data.append('p_VUELTO', vuelto_recibido);
                data.append('p_VUELTO_ALTERNO', vuelto_alterno);
                data.append('p_AUTODETRACCION', ($("#chk_Autodetraccion").is(":checked") ? "S" : "N")); //DPORTA 25/02/2021
                data.append('p_KARDEX', $("#txtKardex").val()); //DPORTA 13/06/2023

                Bloquear("ventana");
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=COMPLETAR_NVMDOVS",
                    contentType: false,
                    data: data,
                    processData: false,
                    async: false,
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
                                } else if (datos[0].CODIGO == 'EXISTE') {
                                    alertCustom("El nro. de documento ya está registrado en el sistema. Intente nuevamente!");
                                } else if (datos[0].CODIGO == 'ERROR_CAB') {
                                    alertCustom("Error al registrar datos de cabecera. Verifique los datos!");
                                } else if (datos[0].CODIGO == 'ERROR_DET') {
                                    alertCustom("Error al registrar los detalles. Verifique los datos!");
                                } else if (datos[0].CODIGO == 'ERROR_COB') {
                                    alertCustom("Error al procesar cobro. Verifique los datos e intente nuevamente!");
                                } else if (datos[0].CODIGO == 'ERROR_B') {
                                    alertCustom("Error al registrar pago bancario dentro del cobro!");
                                } else if (datos[0].CODIGO == 'ERROR_C') {
                                    alertCustom("Error al registrar pago en caja dentro del cobro!");
                                //} else if (datos[0].CODIGO == 'ERROR_B2') {
                                //    alertCustom("Error al registrar pago bancario dentro de cobro venta 2!");
                                //} else if (datos[0].CODIGO == 'ERROR_C2') {
                                //    alertCustom("Error al registrar pago en caja dentro de cobro venta 2!");
                                //} else if (datos[0].CODIGO == 'ERROR_B3') {
                                //    alertCustom("Error al registrar pago bancario dentro de cobro venta 3!");
                                //} else if (datos[0].CODIGO == 'ERROR_C3') {
                                //    alertCustom("Error al registrar pago en caja dentro de cobro venta 3!");
                                } else if (datos[0].CODIGO == 'ERROR_P') {
                                    alertCustom("Error al procesar el cobro. Intente nuevamente!");
                                } else if (datos[0].CODIGO == 'ERROR_DTR') {
                                    alertCustom("Error al registrar detracción. Intente nuevamente!");
                                } else if (datos[0].CODIGO == 'ERROR_PAG') {
                                    alertCustom("Error al guardar datos de cobro. Intente nuevamente!");
                                } else {
                                    exito();
                                    BloquearCampos();
                                    if (datos[0].MSGERROR.indexOf("ERROR") >= 0) {
                                        alertCustom(datos[0].MSGERROR);
                                    } else {
                                        //COMPLETAR
                                        $("#hfCompletoInd").val("S")
                                        //$("#grabar").attr("href", "javascript:ActualizarDctoVenta();");
                                        $("#divBtnsMantenimiento").attr("style", "display:none");
                                        $("#btnNroAtencion").attr("style", "display:none");
                                        $(".btnEliminarDetalle").attr("style", "display:none");
                                        $("#chk_Autodetraccion").attr('disabled', true);
                                        $("#btnImprimir, #btnImprimirST").attr("style", "display:inline-block;margin-top:2px;");
                                        $(".btnImprimir").show();
                                        $('#btnMail').removeClass('hidden');
                                        $('#btnWhatsapp').removeClass('hidden');
                                        $("#btnPdfAlt").removeClass('hidden');
                                        //$('#btnEFac').removeClass('hidden');
                                        $("#lblCopia").css("display", "inline-block");
                                        //$("#lblCopia").css("display", "inline-block");
                                        $("#txtNumDctoComp").val(datos[0].CODIGO);
                                        //Desbloquear("ventana");
                                        //EL CODIGO GLOBAL OBTIENE EL CODIGO DE LA VENTA
                                        //codigodctoglobal = datos[0].CODIGO;
                                        if ($("#txt_comentario").val() == "" || $("#txt_comentario").val().length == 0) {
                                            $("#txt_comentario").val("Orden de Servicio");
                                        }
                                        //let formato = $("#cboSerieDocVenta :selected").attr("data-formato");//DPORTA
                                        //if (formato == 'E') {//DPORTA
                                        //    var miCodigoQR = new QRCode("codigoQR");
                                        //    miCodigoQR.makeCode(datos[0].DATOS_QR);
                                        //    $('#codigoQR').hide();
                                        //    //setTimeout(guardarQR, 0.0000000000000001);
                                        //    setTimeout(guardarQR, 500);
                                        //}
                                        BloquearCampos();
                                        //$(".mAppPago, .mAppPago2, .mAppPago3").css("display", "none");
                                        $("#txtEfectivo, #txtEfectivo2, #txtEfectivo3, #cbo_appPago, #cbo_appPago2, #cbo_appPago3").attr('disabled', true);
                                        if (prmtACON == "SI") {
                                            $('#btnGenerarAsiento').click();
                                        }
                                        setTimeout(ImprimirDctoVentaServicios, 0.0000000000001);
                                        //setTimeout(ImprimirDctoVentaServicios, 500);
                                    }
                                }
                            }
                            else {
                                //noexito();
                                //alertCustom("Parece que hubo un error al completar la venta. Intente nuevamente!");
                                alertCustom("Surgió un error inesperado. Intente nuevamente, por favor.");
                                $("#A4").attr("disabled", false);
                            }
                        } else {
                            noexito();
                            $("#A4").attr("disabled", false);
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
                    });

            } else {
                alertCustom("Ingrese al menos 1 detalle!");
            }
        }
    } else {
        // COMPLETA UN DOCUMENTO DE VENTA RAPIDA, DESDE UNA VENTA NORMAL O TOMAPEDIDO
        //ActualizarCompletarDctoVentaRapida();
    }
};

//function guardarQR() {
//    //CAPTURA LA IMAGEN DEL QR CODIFICADA EN BASE64 
//    var NombreQR = $('#codigoQR img').attr('src');

//    var qrData = new FormData();
//    qrData.append('p_IMGQR', NombreQR);

//    $.ajax({
//        type: "post",
//        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=GQR_VENTA&p_FVBVTAC_CODE=" + $("#txtNumDctoComp").val(),
//        data: qrData,
//        async: false,
//        contentType: false,
//        processData: false,
//        success: function (res) {
//            if (res != "OK") {
//                noexito();
//            }
//        },
//        error: function () {
//            alertCustom("No se guardaron correctamente los datos!")
//        }
//    });
//}

//function verificarFormatoTicket(tipoDoc) {
//    //Bloquear("ventana");

//    var data = new FormData();
//    data.append('DOC_CODE', tipoDoc);
//    data.append('CTLG', $("#cbo_Empresa").val());
//    data.append('SCSL', $("#cbo_Sucursal").val());

//    var jqxhr = $.ajax({
//        type: "POST",
//        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=FORTICK",
//        contentType: false,
//        data: data,
//        processData: false,
//        async: false,
//        cache: false
//    })
//        .success(function (datos) {
//            //Desbloquear("ventana");
//            if (datos != null) {
//                if (datos[0].FORMATO_TICKET == "SI") {
//                    return true;
//                } else {
//                    return false;
//                }
//            } else {
//                return false;
//                //noexito();
//            }
//        })
//        .error(function () {
//            //Desbloquear("ventana");
//            //noexito();
//        });

//    return jqxhr.responseText;

//}

//Imprimir dcto venta
function ImprimirDctoVenta() {

    var data = new FormData();
    data.append('p_CODE', $("#txtNumDctoComp").val());
    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    //data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "N")
    data.append('p_CTLG_CODE', $("#cbo_Empresa").val());

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRT",
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
        })
        .error(function () {
            noexito();
        });

    //Bloquear("ventana");
    //let ticket = $("#cboSerieDocVenta :selected").attr("data-ticket");//DPORTA

    //if (ticket == 'SI') {
    //    //if (verificarFormatoTicket($("#cboDocumentoVenta").val()) == '[{"FORMATO_TICKET" :"SI"}]') {
    //    var data = new FormData();
    //    data.append('p_CODE', $("#txtNumDctoComp").val());
    //    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    //    //data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "N")
    //    data.append('p_CTLG_CODE', $("#cbo_Empresa").val());

    //    var jqxhr = $.ajax({
    //        type: "POST",
    //        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRT",
    //        contentType: false,
    //        data: data,
    //        processData: false,
    //        async: false,
    //        cache: false
    //    })
    //        .success(function (datos) {
    //            if (datos != null) {

    //                $("#divDctoImprimir").html(datos);
    //                setTimeout(function () {
    //                    window.print();
    //                }, 0.0000000000000001)

    //            } else {
    //                noexito();
    //            }
    //        })
    //        .error(function () {
    //            noexito();
    //        });
    //    //ImprimirDctoVentaTicket();
    //} else {
    //    //if ($("#cboDocumentoVenta").val() == '0012' || $("#cboDocumentoVenta :selected").html().indexOf("TICKET") >= 0 || $("#cboDocumentoVenta").val() == '0101' || $("#cboDocumentoVenta").val() == '0001' || $("#cboDocumentoVenta").val() == '0003') {
    //    //    var data = new FormData();
    //    //    data.append('p_CODE', $("#txtNumDctoComp").val());
    //    //    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    //    //    //data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "N")
    //    //    data.append('p_CTLG_CODE', $("#cbo_Empresa").val());

    //    //    var jqxhr = $.ajax({
    //    //        type: "POST",
    //    //        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRT",
    //    //        contentType: false,
    //    //        data: data,
    //    //        processData: false,
    //    //        async: false,
    //    //        cache: false
    //    //    })
    //    //        .success(function (datos) {
    //    //            if (datos != null) {

    //    //                $("#divDctoImprimir").html(datos);
    //    //                setTimeout(function () {
    //    //                    window.print();
    //    //                }, 0.0000000000000001)

    //    //            } else {
    //    //                noexito();
    //    //            }
    //    //        })
    //    //        .error(function () {
    //    //            noexito();
    //    //        });
    //    //    //ImprimirDctoVentaTicket();
    //    //} else {
    //    //    crearImpresion($("#txtNumDctoComp").val());
    //    //}
    //    crearImpresion($("#txtNumDctoComp").val());
    //}
}

function ImprimirDctoVentaServicios() {

    var data = new FormData();
    data.append('p_CODE', $("#txtNumDctoComp").val());
    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    //data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "N")
    data.append("p_CTLG_CODE", $("#cbo_Empresa").val());

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRT",
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
        })
        .error(function () {
            noexito();
        });
    ImprimirDctoVentaTicket();

    //Bloquear("ventana");
    //let ticket = $("#cboSerieDocVenta :selected").attr("data-ticket");//DPORTA

    //if (ticket == 'SI') {
    //    //if (verificarFormatoTicket($("#cboDocumentoVenta").val()) == '[{"FORMATO_TICKET" :"SI"}]') {
    //    var data = new FormData();
    //    data.append('p_CODE', $("#txtNumDctoComp").val());
    //    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    //    //data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "N")
    //    data.append("p_CTLG_CODE", $("#cbo_Empresa").val());

    //    var jqxhr = $.ajax({
    //        type: "POST",
    //        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRT",
    //        contentType: false,
    //        data: data,
    //        processData: false,
    //        async: false,
    //        cache: false
    //    })
    //        .success(function (datos) {
    //            if (datos != null) {

    //                $("#divDctoImprimir").html(datos);
    //                setTimeout(function () {
    //                    window.print();
    //                }, 0.0000000000000001)

    //            } else {
    //                noexito();
    //            }
    //        })
    //        .error(function () {
    //            noexito();
    //        });
    //    ImprimirDctoVentaTicket();
    //} else {
    //    if ($("#cboDocumentoVenta").val() == '0012' || $("#cboDocumentoVenta :selected").html().indexOf("TICKET") >= 0 || $("#cboDocumentoVenta").val() == '0101' || $("#cboDocumentoVenta").val() == '0001' || $("#cboDocumentoVenta").val() == '0003') {
    //        var data = new FormData();
    //        data.append('p_CODE', $("#txtNumDctoComp").val());
    //        data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    //        //data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "N")
    //        data.append("p_CTLG_CODE", $("#cbo_Empresa").val());

    //        var jqxhr = $.ajax({
    //            type: "POST",
    //            url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRT",
    //            contentType: false,
    //            data: data,
    //            processData: false,
    //            async: false,
    //            cache: false
    //        })
    //            .success(function (datos) {
    //                if (datos != null) {


    //                    $("#divDctoImprimir").html(datos);
    //                    setTimeout(function () {
    //                        window.print();
    //                    }, 0.0000000000000001)

    //                } else {
    //                    noexito();
    //                }
    //            })
    //            .error(function () {
    //                noexito();
    //            });
    //        ImprimirDctoVentaTicket();
    //    } else {
    //        crearImpresion($("#txtNumDctoComp").val());
    //    }
    //}
}

function ImprimirDctoVentaTicket() {
    //Bloquear("ventana");

    var data = new FormData();
    data.append('p_CODE', $("#txtNumDctoComp").val());
    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    data.append("p_CTLG_CODE", $("#cbo_Empresa").val());

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRTICKET",
        contentType: false,
        data: data,
        processData: false,
        async: true,
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
        })
        .error(function () {
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

function CargaDeudaCliente(cliente) {
    $.ajax({
        type: "GET",
        url: "vistas/NC/estereotipos/ajax/Cliente.ASHX",
        data: {
            flag: "LISTAR_DEUDAS_CLIENTES",
            pidm: cliente,
            empr: $("#cbo_Empresa").val()
        },
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            //console.log(datos);
            if (datos != "" & datos != null) {
                $("#txt_plazo_pago").val("");
                $("#hfCreditoDispMoba").val("");
                $("#hfCreditoDispMoal").val("");
                $("#linea").html('Deuda Total: S/ ' + formatoMiles(datos[0].DEUDA_SOLES));
                $("#disponible").html('Días de Mora: ' + datos[0].DIAS + ' días.');
                $("#vencido").html('');
                $("#divAlCredito").show();
            }
        },
        error: function () {
            alertCustom("Error al obtener datos de Deuda del Cliente.");
        }
    });
}
//DPORTA
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
                $("#linea").html('Linea: S/ ' + formatoMiles(datos[0].LINEA_MOBA));
                $("#disponible").html('Disponible: S/ ' + formatoMiles(datos[0].ACTUAL_MOBA));
                $("#vencido").html('Vencido: S/ ' + formatoMiles(datos[0].MONTO_VENCIDO));
            }
        },
        error: function () {
            alertCustom("Error al obtener datos de Linea de Credito de Cliente.");
        }
    });
}

function Cancelar() {
    window.location.href = '?f=NVMDOVS';
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
    $("#cbo_OrigenPago, #cbo_OrigenPago2, #cbo_OrigenPago3").attr("disabled", "disabled"); // 26/02
    $("#cbo_Det_Origen, #cbo_Det_Origen2, #cbo_Det_Origen3").attr("disabled", "disabled");
    $("#cboMedioPago, #cboMedioPago2, #cboMedioPago3").attr("disabled", "disabled");
    $("#txtMonto, #txtDestino, #txtDestino2, #txtDestino3, #txtNroOpe, #txtNroOpe2, #txtNroOpe3").attr("disabled", "disabled");

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
    window.location.href = '?f=NVMDOVS';
}

function ActualizaPrecioEstandarDetalle(campo, valor, indice) {
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede modificar un detalle de un documento ya 'Completado'")
    } else {

        var precioVenta, precioMinimo;
        let tipoDocCode = $("#cboSerieDocVenta :selected").attr("data-tipoDocCode");//DPORTA SIN-IMPUESTOS
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
            infoCustom2("El valor ingresado no puede ser menor al precio mínimo: " + parseFloat(precioMinimo).toFixed(prmtDIGP))
            $(campo).val(parseFloat(precioMinimo).toFixed(prmtDIGP));
            //DPORTA
            var totalBruto = (parseFloat(detallesVenta[indice].CANTIDAD)) * parseFloat(precioMinimo).toFixed(prmtDIGP);
            var montoDescuento = 0;

            /*00*/detallesVenta[indice].PRECIO_DETALLE = parseFloat(precioMinimo).toFixed(prmtDIGP);
            /*01*/detallesVenta[indice].TOTAL_BRUTO = totalBruto.toFixed(prmtDIGP);
            /*02*/detallesVenta[indice].MONTO_DESCUENTO = montoDescuento.toFixed(prmtDIGP);
            /*03*/detallesVenta[indice].TOTAL_NETO = (totalBruto - montoDescuento).toFixed(prmtDIGP);
            ListarTablaDetalles(ObtenerTablaDetalles());
            sortTable();
            CalcularDetraccion();
            CalcularDatosMonetarios();
            $("#lblImporteCobrar").html($("#txt_monto_total").val());
            $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
            //console.log($("#lblImporteCobrar").html());
            if ($('#cbo_modo_pago').val() == '0002') {
                $("#txtMonto").val('');
            } else {
                $("#txtMonto").val($("#lblImporteCobrar").html());
            }
            $(campo).focus();
        } else {

            var totalBruto = (parseFloat(detallesVenta[indice].CANTIDAD)) * parseFloat(valor).toFixed(prmtDIGP);
            var montoDescuento = 0;

            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") { //POR SI ACASO
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
            /*00*/detallesVenta[indice].PRECIO_DETALLE = parseFloat(valor).toFixed(prmtDIGP);
            /*01*/detallesVenta[indice].TOTAL_BRUTO = totalBruto.toFixed(prmtDIGP);
            /*02*/detallesVenta[indice].MONTO_DESCUENTO = montoDescuento.toFixed(prmtDIGP);
            /*03*/detallesVenta[indice].TOTAL_NETO = (totalBruto - montoDescuento).toFixed(prmtDIGP);
            var totalNeto = totalBruto - montoDescuento;
            if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') { //DPORTA SIN-IMPUESTOS
                var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
            } else {
                var decimalIGV = 0;
            }
            var detraccion, isc;
            //if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') {
            if (tipoDocCode == '0001') { //DPORTA SIN-IMPUESTOS
                detraccion = parseFloat(detallesVenta[indice].DETRACCION) * (totalNeto);
            /*04*/detallesVenta[indice].MONTO_DETRAC = detraccion.toFixed(prmtDIGP);
            } else {
                detraccion = parseFloat(0) * (totalNeto);
            /*04*/detallesVenta[indice].MONTO_DETRAC = detraccion.toFixed(prmtDIGP);
            }

            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                isc = parseFloat(detallesVenta[indice].ISC / 100) * (totalNeto); //Total neto Sin IGV
                /*05*/ detallesVenta[indice].MONTO_ISC = isc.toFixed(prmtDIGP);

            } else {
                isc = parseFloat(detallesVenta[indice].ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                /*05*/detallesVenta[indice].MONTO_ISC = isc.toFixed(prmtDIGP);
            }

            ListarTablaDetalles(ObtenerTablaDetalles());
            sortTable();
            CalcularDetraccion();
            CalcularDatosMonetarios();
            $("#lblImporteCobrar").html($("#txt_monto_total").val());
            $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
            $("#txtMonto").val("");
            $("#txtMonto").val($("#txt_monto_total").val());
            ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
            //console.log($("#lblImporteCobrar").html());
            if ($('#cbo_modo_pago').val() == '0002') {
                $("#txtMonto").val('');
            } else {
                $("#txtMonto").val($("#lblImporteCobrar").html());
            }

        }
    }
}

function ActualizaCantidad(campo, valor, indice) {//DPORTA
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede modificar un detalle de un documento ya 'Completado'")
    } else {
        if (parseFloat($(campo).val()) < 0 || $(campo).val().trim() == "") {
            infoCustom2("El valor ingresado no puede ser menor a 0")
            $(campo).val("1");
            $(campo).focus();
        } else {

            var totalBruto = (parseFloat(detallesVenta[indice].PRECIO_DETALLE)) * parseFloat(valor);
            var montoDescuento = 0;
            let tipoDocCode = $("#cboSerieDocVenta :selected").attr("data-tipoDocCode");//DPORTA SIN-IMPUESTOS
            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") { //POR SI ACASO
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
            /*00*/detallesVenta[indice].CANTIDAD = parseFloat(valor).toFixed(prmtDIGP);
            /*01*/detallesVenta[indice].TOTAL_BRUTO = totalBruto.toFixed(prmtDIGP);
            /*02*/detallesVenta[indice].MONTO_DESCUENTO = montoDescuento.toFixed(prmtDIGP);
            /*03*/detallesVenta[indice].TOTAL_NETO = (totalBruto - montoDescuento).toFixed(prmtDIGP);
            var totalNeto = totalBruto - montoDescuento;
            if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') { //DPORTA SIN-IMPUESTOS
                var decimalIGV = parseFloat($("#hfIMPUESTO").val()) / 100;
            } else {
                var decimalIGV = 0;
            }
            var detraccion, isc;
            //if (tipoDocCode == '0001' || tipoDocCode == '0003' || tipoDocCode == '0012') {
            if (tipoDocCode == '0001') { //DPORTA SIN-IMPUESTOS
                detraccion = parseFloat(detallesVenta[indice].DETRACCION) * (totalNeto);
                /*04*/detallesVenta[indice].MONTO_DETRAC = detraccion.toFixed(prmtDIGP);
            } else {
                detraccion = parseFloat(0) * (totalNeto);
                /*04*/detallesVenta[indice].MONTO_DETRAC = detraccion.toFixed(prmtDIGP);
            }

            if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                isc = parseFloat(detallesVenta[indice].ISC / 100) * (totalNeto); //Total neto Sin IGV
                /*05*/ detallesVenta[indice].MONTO_ISC = isc.toFixed(prmtDIGP);

            } else {
                isc = parseFloat(detallesVenta[indice].ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                /*05*/detallesVenta[indice].MONTO_ISC = isc.toFixed(prmtDIGP);
            }

            ListarTablaDetalles(ObtenerTablaDetalles());
            sortTable();
            CalcularDetraccion();
            CalcularDatosMonetarios();
            $("#lblImporteCobrar").html($("#txt_monto_total").val());
            $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
            $("#txtMonto").val("");
            $("#txtMonto").val($("#txt_monto_total").val());
            ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
            //console.log($("#lblImporteCobrar").html());
            if ($('#cbo_modo_pago').val() == '0002') {
                $("#txtMonto").val('');
            } else {
                $("#txtMonto").val($("#lblImporteCobrar").html());
            }

        }
    }
}

function ActualizaGlosaDet(campo, valor, indice) {//DPORTA - Glosa editable
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede modificar un detalle de un documento ya 'Completado'")
    } else {
        detallesVenta[indice].GLOSA = valor;
        //ListarTablaDetalles(ObtenerTablaDetalles());
        //$(".btnEliminarDetalle").remove();
        //$("#tabla_det").DataTable().column(0).visible(false);
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

jsonPersonas = null;
var pagarInd = true; //Pago Obligatorio
function cargarJsonEmpleado(empresa) {
    $.ajax({
        type: "post",
        async: false,
        url: "vistas/GL/ajax/GLMLETR.ashx?flag=LE-2&empresa=" + empresa,
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
var html_txtDestino = $("#txtDestino").parent().html();//20/02
var html_txtDestino2 = $("#txtDestino2").parent().html();
var html_txtDestino3 = $("#txtDestino3").parent().html();

function CargarDatosCobro() {
    if (bDatosCobroIniciado == false) {
        bDatosCobroIniciado = true;
        //       
        $("#cbo_OrigenPago, #cbo_OrigenPago2, #cbo_OrigenPago3").removeAttr("disabled");
        $("#txtNroOpe, #txtNroOpe2, #txtNroOpe3").removeAttr("disabled");
        $("#txtMonto").removeAttr("disabled");

        //eventoControles
        $('#cbo_OrigenPago').change(function () {
            $("#txtMonto, #cbo_moneda, #txtNroOpe, #txtDestino, #cbo_appPago").attr("disabled", true);
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
                    //DPORTA 09/12/2021 BILLETERA DIG.
                    $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "0001" && valorO != "0020" && valorO != "") $(j).remove(); });
                    //$("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "0001" && valorO != "") $(j).remove(); });
                    $("#cboMedioPago").attr("disabled", false);

                    break;
            }
        });

        $('#cbo_OrigenPago2').change(function () {
            $("#txtMonto, #cbo_moneda, #txtNroOpe2, #txtDestino2, #cbo_appPago2").attr("disabled", true);
            var OrigenActual2 = $(this).val();
            $("#lbl_detalle3_2").html("-");
            $("#lbl_detalle4_2").html("-");
            $("#cboMedioPago2").val("").change();

            switch (OrigenActual2) {

                case "Caja":

                    $("#lbl_detalle1_2").html("Caja");
                    $("#cbo_Det_Origen2").off("change");
                    $("#cbo_Det_Origen2").attr("data-placeholder", "CAJA").select2("val", "").change();

                    $("#txtDestino2").val("");

                    //LISTAR CAJAS APERTURADAS
                    $.ajaxSetup({ async: false });
                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 7, empresa: $("#cbo_Empresa").val(), scsl: $("#cbo_Sucursal").val(), usua_id: $("#ctl00_lblusuario").html() },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {

                                $("#cbo_Det_Origen2").html(res).attr("disabled", false);

                            } else {
                                $("#cbo_Det_Origen2").html("").attr("disabled", true);

                            }
                        });
                    $.ajaxSetup({ async: true });

                    $("#cboMedioPago2").html(StringMediosPago);

                    $("#cboMedioPago2 option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0006" && valorO != "0005" && valorO != "") $(j).remove(); });

                    $("#cboMedioPago2").attr("disabled", false);

                    break;

                case "Banco":

                    $("#txtDestino2").off("change");
                    $("#pos2,#tarjeta2,#bco2").remove();
                    $("#lbl_detalle1_2").html("Cuenta Destino");

                    //CargarCuentas Origen
                    $("#cbo_Det_Origen2").val("").change().attr("data-placeholder", "CUENTA BANCARIA").select2();

                    $.ajaxSetup({ async: false });
                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 6, empresapidm: $("#cbo_Empresa :selected").attr("data-pidm"), banco: "", moneda: $("#cbo_moneda").val() },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbo_Det_Origen2").html(res).attr("disabled", false).change(function () {
                                    $("#cboMedioPago2").change();
                                    var mone_code = $("#cbo_Det_Origen2 :selected").attr("moneda");

                                    $("#cbo_moneda").select2("val", mone_code).change();
                                }
                                );
                            } else {
                                $("#cbo_Det_Origen2").html("<option></option>").change();
                            }

                        });
                    $.ajaxSetup({ async: true });

                    $("#cboMedioPago2").html(StringMediosPago);
                    //DPORTA 09/12/2021 BILLETERA DIG.
                    $("#cboMedioPago2 option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "0001" && valorO != "0020" && valorO != "") $(j).remove(); });
                    //$("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "") $(j).remove(); });
                    $("#cboMedioPago2").attr("disabled", false);

                    break;
            }
        });


        $('#cbo_OrigenPago3').change(function () {
            $("#txtMonto, #cbo_moneda, #txtNroOpe3, #txtDestino3, #cbo_appPago3").attr("disabled", true);
            var OrigenActual3 = $(this).val();
            $("#lbl_detalle3_3").html("-");
            $("#lbl_detalle4_3").html("-");
            $("#cboMedioPago3").val("").change();

            switch (OrigenActual3) {

                case "Caja":

                    $("#lbl_detalle1_3").html("Caja");
                    $("#cbo_Det_Origen3").off("change");
                    $("#cbo_Det_Origen3").attr("data-placeholder", "CAJA").select2("val", "").change();

                    $("#txtDestino3").val("");

                    //LISTAR CAJAS APERTURADAS
                    $.ajaxSetup({ async: false });
                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 7, empresa: $("#cbo_Empresa").val(), scsl: $("#cbo_Sucursal").val(), usua_id: $("#ctl00_lblusuario").html() },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {

                                $("#cbo_Det_Origen3").html(res).attr("disabled", false);

                            } else {
                                $("#cbo_Det_Origen3").html("").attr("disabled", true);

                            }
                        });
                    $.ajaxSetup({ async: true });

                    $("#cboMedioPago3").html(StringMediosPago);

                    $("#cboMedioPago3 option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0006" && valorO != "0005" && valorO != "") $(j).remove(); });

                    $("#cboMedioPago3").attr("disabled", false);

                    break;

                case "Banco":

                    $("#txtDestino3").off("change");
                    $("#pos3,#tarjeta3,#bco3").remove();
                    $("#lbl_detalle1_3").html("Cuenta Destino");

                    //CargarCuentas Origen
                    $("#cbo_Det_Origen3").val("").change().attr("data-placeholder", "CUENTA BANCARIA").select2();

                    $.ajaxSetup({ async: false });
                    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 6, empresapidm: $("#cbo_Empresa :selected").attr("data-pidm"), banco: "", moneda: $("#cbo_moneda").val() },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbo_Det_Origen3").html(res).attr("disabled", false).change(function () {
                                    $("#cboMedioPago3").change();
                                    var mone_code = $("#cbo_Det_Origen3 :selected").attr("moneda");

                                    $("#cbo_moneda").select2("val", mone_code).change();
                                }
                                );
                            } else {
                                $("#cbo_Det_Origen3").html("<option></option>").change();
                            }

                        });
                    $.ajaxSetup({ async: true });

                    $("#cboMedioPago3").html(StringMediosPago);
                    //DPORTA 09/12/2021 BILLETERA DIG.
                    $("#cboMedioPago3 option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "0001" && valorO != "0020" && valorO != "") $(j).remove(); });
                    //$("#cboMedioPago3 option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "") $(j).remove(); });
                    $("#cboMedioPago3").attr("disabled", false);

                    break;
            }
        });
        $("#txtEfectivo").change(function () {
            var valor = $(this).val();
            $(this).val(formatoMiles(valor));
        });

        $("#txtEfectivo2").change(function () {
            var valor = $(this).val();
            $(this).val(formatoMiles(valor));
        });

        $("#txtEfectivo3").change(function () {
            var valor = $(this).val();
            $(this).val(formatoMiles(valor));
        });

        $('#txtEfectivo').keyup(function () {
            var monto_cobrar = $('#txtMonto').val();
            if (monto_cobrar.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
                var re = /,/g;
                monto_cobrar = monto_cobrar.replace(re, '');
            }
            monto_cobrar = parseFloat(monto_cobrar);

            var efectivo_recibido = $(this).val();
            if (efectivo_recibido.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
                var re = /,/g;
                efectivo_recibido = efectivo_recibido.replace(re, '');
            }
            efectivo_recibido = parseFloat(efectivo_recibido);
        });

        $('#txtEfectivo2').keyup(function () {
            var monto_cobrar = $('#txtMonto').val();
            if (monto_cobrar.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
                var re = /,/g;
                monto_cobrar = monto_cobrar.replace(re, '');
            }
            monto_cobrar = parseFloat(monto_cobrar);

            var efectivo_recibido = $(this).val();
            if (efectivo_recibido.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
                var re = /,/g;
                efectivo_recibido = efectivo_recibido.replace(re, '');
            }
            efectivo_recibido = parseFloat(efectivo_recibido);
        });

        $('#txtEfectivo3').keyup(function () {
            var monto_cobrar = $('#txtMonto').val();
            if (monto_cobrar.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
                var re = /,/g;
                monto_cobrar = monto_cobrar.replace(re, '');
            }
            monto_cobrar = parseFloat(monto_cobrar);

            var efectivo_recibido = $(this).val();
            if (efectivo_recibido.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
                var re = /,/g;
                efectivo_recibido = efectivo_recibido.replace(re, '');
            }
            efectivo_recibido = parseFloat(efectivo_recibido);
        });

        $('#cboMedioPago').change(function () {
            html_monedas = $("#cbo_moneda").html();

            var MedioActual = $(this).val();

            if (MedioActual != null) {
                $(".cbocta").parent().html(html_txtDestino);
                $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                $("#txtDestino").val("");
                $("#txtDestino").attr("disabled", false).off("change").attr("placeholder", "");
                $("#txtNroOpe").val("");

                $("#pos,#tarjeta,#bco").remove();
                $(".mPersona").css("display", "none");
                offObjectEvents("txtNroOpe");

                $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                $("#txtNroOpe").attr("disabled", false).attr("placeholder", "");
                switch (MedioActual) {
                    case "0001"://DEPOSITO BANCARIO
                        $(".mAppPago").css("display", "none");
                        $(".mNroOpe").attr('class', 'span8 mNroOpe');
                        $("#lbl_detalle3").html("Origen de Pago");
                        $("#lbl_detalle4").html("Nro. Operación");
                        $("#txtDestino").parent().html("<select id='cbDestino' class='obligatorio span12 cbocta' data-placeholder='CUENTA DE CLIENTE'></select>");
                        $("#cbDestino").html("<option>DEPOSITO DIRECTO VENTANILLA</option>").attr("disabled", true).select2();

                        $(".mPersona").css("display", "none");
                        offObjectEvents("txtNroOpe");
                        $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la transacción");
                        $("#txtMonto").attr("disabled", true);
                        $("#cbo_moneda").val($("#cbo_Det_Origen :selected").attr("moneda")).change().attr("disabled", true);
                        $("#txtEfectivo").val("");
                        $("#id_Vuelto").hide();
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
                        break;

                    case "0008": //EFECTIVO
                        $(".mAppPago").css("display", "none");
                        $(".mNroOpe").attr('class', 'span8 mNroOpe');
                        $("#lbl_detalle3").html("Destino");
                        $("#lbl_detalle4").html("Persona Recibe");

                        $("#txtDestino").val("ENTREGA DIRECTA").attr("disabled", true);
                        $(".mPersona").css("display", "block");
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "");
                        $("#txtNroOpe").addClass("personas").attr("disabled", false);
                        cargarInputsPersona();

                        $("#cbo_moneda").attr("disabled", false);
                        $("#txtMonto").attr("disabled", true);

                        $("#txtEfectivo").attr('disabled', false);
                        $("#id_Vuelto").show();
                        $("#txtEfectivo").val("");
                        $("#txtVuelto").val("0.00");
                        $("#txtVuelto").attr("disabled", true);
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                        break;

                    case "0003": //transferencia
                        $(".mAppPago").css("display", "none");
                        $(".mNroOpe").attr('class', 'span8 mNroOpe');
                        $("#lbl_detalle3").html("Origen");
                        $("#lbl_detalle4").html("Nro. Operación");

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
                        $("#txtMonto").attr("disabled", true);
                        //$("#txtNroOpe").attr("disabled", false);
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la transacción");
                        $("#txtEfectivo").val("");
                        $("#id_Vuelto").hide();
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
                        break;

                    case "0013": //cheques bancarios
                        $(".mAppPago").css("display", "none");
                        $(".mNroOpe").attr('class', 'span8 mNroOpe');
                        $("#lbl_detalle3").html("N° Cheque");
                        $("#lbl_detalle4").html("Girado a");
                        $("#txtDestino").attr("disabled", false);
                        //$("#txtNroOpe").attr("disabled", false);
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "");
                        $("#txtMonto").attr("disabled", true);
                        $("#txtEfectivo").val("");
                        $("#id_Vuelto").hide();
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
                        break;

                    case "0006": //tarjeta de credito
                        $(".mAppPago").css("display", "none");
                        $(".mNroOpe").attr('class', 'span8 mNroOpe');
                        $("#cbo_moneda").attr("disabled", false);
                        $("#lbl_detalle3").html("N° Tarjeta");
                        $("#lbl_detalle4").html("Cod. Autorización");
                        $("#txtNroOpe").attr("disabled", false);
                        $("#txtMonto").attr("disabled", true);
                        $("#txtDestino").attr("disabled", false).attr("placeholder", "ult. 4 digitos");
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la operación");
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

                                        var tarj_pos = $("#slcPos :selected").attr("tarjetas");
                                        $("#slcTarjeta").html(listaTarjetas).select2("val", "");
                                        $("#slcTarjeta option").filter(function (e, d) {
                                            var val0r = $(d).val();
                                            if (tarj_pos.indexOf(val0r) < 0) { $("#slcTarjeta option[value=" + val0r + "]").remove(); }

                                        });
                                        $("#slcTarjeta").select2("val", "00006");//DPORTA 08/07/2021 PARA QUE CARGUE POR DEFECTO LA MARCA "VISA"
                                    });

                                } else {
                                    $("#slcPos").html("").attr("disabled", true);
                                }

                            }).done(function () //DPORTA 24/06/2021
                            {
                                Desbloquear($($("#slcPos").siblings("div")).attr("id"));
                                $.ajax({
                                    type: "post",
                                    url: "vistas/CC/ajax/CCMCBCL.ASHX?flag=POS_PRED&caja=" + $("#cbo_Det_Origen").val() + "&empresa=" + $("#cbo_Empresa").val() + "&estable=" + $("#cbo_Det_Origen :selected").attr("stbl"),
                                    contenttype: "application/json;",
                                    datatype: "json",
                                    async: false,
                                    success: function (datos) {
                                        if (datos != null) {
                                            $("#slcPos").val(datos);
                                            $("#slcPos").change();
                                        }
                                    },
                                    error: function (msg) {
                                        alertCustom("Monedas no se listaron correctamente.");
                                    }
                                });

                            });
                        $("#txtEfectivo").val("");
                        $("#id_Vuelto").hide();
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
                        break;
                    case "0005": // tarjeta de debito
                        $(".mAppPago").css("display", "none");
                        $(".mNroOpe").attr('class', 'span8 mNroOpe');
                        $("#lbl_detalle3").html("N° Tarjeta");
                        $("#lbl_detalle4").html("Cod. Autorización");

                        $("#txtNroOpe").attr("disabled", false);
                        $("#txtMonto").attr("disabled", true);

                        $("#txtDestino").attr("disabled", false).attr("placeholder", "ult. 4 digitos");
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la operación");
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

                                        var tarj_pos = $("#slcPos :selected").attr("tarjetas");
                                        $("#slcTarjeta").html(listaTarjetas).select2("val", "");
                                        $("#slcTarjeta option").filter(function (e, d) {
                                            var val0r = $(d).val();
                                            if (tarj_pos.indexOf(val0r) < 0) { $("#slcTarjeta option[value=" + val0r + "]").remove(); }
                                        });
                                        $("#slcTarjeta").select2("val", "00006");//DPORTA 08/07/2021 PARA QUE CARGUE POR DEFECTO LA MARCA "VISA"
                                    });

                                } else {
                                    $("#slcPos").html("").attr("disabled", true);
                                }

                            }).done(function () //DPORTA 24/06/2021
                            {
                                Desbloquear($($("#slcPos").siblings("div")).attr("id"));
                                $.ajax({
                                    type: "post",
                                    url: "vistas/CC/ajax/CCMCBCL.ASHX?flag=POS_PRED&caja=" + $("#cbo_Det_Origen").val() + "&empresa=" + $("#cbo_Empresa").val() + "&estable=" + $("#cbo_Det_Origen :selected").attr("stbl"),
                                    contenttype: "application/json;",
                                    datatype: "json",
                                    async: false,
                                    success: function (datos) {
                                        if (datos != null) {
                                            $("#slcPos").val(datos);
                                            $("#slcPos").change();
                                        }
                                    },
                                    error: function (msg) {
                                        alertCustom("Monedas no se listaron correctamente.");
                                    }
                                });

                            });
                        $("#txtEfectivo").val("");
                        $("#id_Vuelto").hide();
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
                        break;
                    case "0020"://OTROS: YAPE, PLIN, TUNKI, ETC BILLETERA DIG.

                        let billetera_dig = $("#cbo_Det_Origen :selected").attr("billetera_dig");

                        if (billetera_dig == 'S') {
                            $(".mAppPago").css("display", "block");
                            $("#lbl_detalle3").html("Origen de Pago");
                            //$("#lbl_detalle4").html("Nro. Op.");
                            $("#lbl_detalle4").html("App - Nro. Operación");
                            $("#txtDestino").parent().html("<select id='cbDestino' class='obligatorio span12 cbocta' data-placeholder='CUENTA DE CLIENTE'></select>");
                            $("#cbDestino").html("<option>BILLETERA DIGITAL</option>").attr("disabled", true).select2();

                            $(".mPersona").css("display", "none");
                            offObjectEvents("txtNroOpe");
                            $("#cbo_appPago").removeClass("personas").attr("disabled", false);


                            $("#cbo_appPago").attr("disabled", false);
                            $(".mNroOpe").attr('class', 'span4 mNroOpe');
                            $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                            $("#txtNroOpe").attr("disabled", false).attr("placeholder", "Nro. Operación");
                            $("#txtMonto").attr("disabled", true);
                            $("#cbo_moneda").val($("#cbo_Det_Origen :selected").attr("moneda")).change().attr("disabled", true);

                            //$("#txtVuelto").hide();
                            $("#txtEfectivo").val("");
                            //$("#txtVuelto").val("");
                            $("#id_Vuelto").hide();

                            //let nombre_cuenta = $("#cbo_Det_Origen :selected").html(); //DPORTA 09/12/2021

                            //if (nombre_cuenta.indexOf('BCP') > 0) {
                            //    //$("#txtNroOpe").val("YAPE  -");
                            //    mascespecial("txtNroOpe", "YAPE  -", 16);
                            //} else if (nombre_cuenta.indexOf('BBVA') > 0) {
                            //    //$("#txtNroOpe").val("LUKITA-");
                            //    mascespecial("txtNroOpe", "LUKITA-", 16);
                            //} else if (nombre_cuenta.indexOf('IBK') > 0) {
                            //    //$("#txtNroOpe").val("TUNKI -");
                            //    mascespecial("txtNroOpe", "TUNKI -", 16);
                            //} else if (nombre_cuenta.indexOf('BIF') > 0 || nombre_cuenta.indexOf('SCT') > 0) {
                            //    //$("#txtNroOpe").val("PLIN  -");
                            //    mascespecial("txtNroOpe", "PLIN  -", 16);
                            //}

                            ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
                        } else {
                            infoCustom2("La cuenta destino seleccionada no tiene asociada una Billetera digital");
                            $(".mAppPago").css("display", "none");
                            $(".mNroOpe").attr('class', 'span8 mNroOpe');
                        }

                        break;
                }
            }
        });

        $('#cboMedioPago2').change(function () { //20/02
            html_monedas = $("#cbo_moneda").html();

            var MedioActual2 = $(this).val();

            if (MedioActual2 != null) {
                $(".cbocta2").parent().html(html_txtDestino2);
                $("#txtNroOpe2").removeClass("personas").attr("disabled", false);
                $("#txtDestino2").val("");
                $("#txtDestino2").attr("disabled", false).off("change").attr("placeholder", "");
                $("#txtNroOpe2").val("");

                $("#pos2,#tarjeta2,#bco2").remove();
                $(".mPersona2").css("display", "none");
                offObjectEvents("txtNroOpe2");

                $("#txtNroOpe2").removeClass("personas").attr("disabled", false);
                $("#txtNroOpe2").attr("disabled", false).attr("placeholder", "");
                switch (MedioActual2) {
                    case "0001"://DEPOSITO BANCARIO
                        $(".mAppPago2").css("display", "none");
                        $(".mNroOpe2").attr('class', 'span8 mNroOpe2');
                        $("#lbl_detalle3_2").html("Origen de Pago");
                        $("#lbl_detalle4_2").html("Nro. Operación");
                        $("#txtDestino2").parent().html("<select id='cbDestino2' class='obligatorio span12 cbocta2' data-placeholder='CUENTA DE CLIENTE'></select>");
                        $("#cbDestino2").html("<option>DEPOSITO DIRECTO VENTANILLA</option>").attr("disabled", true).select2();

                        $(".mPersona2").css("display", "none");
                        offObjectEvents("txtNroOpe2");
                        $("#txtNroOpe2").removeClass("personas").attr("disabled", false);
                        $("#txtNroOpe2").attr("disabled", false).attr("placeholder", "de la transacción");
                        $("#txtMonto").attr("disabled", true);
                        $("#cbo_moneda").val($("#cbo_Det_Origen2 :selected").attr("moneda")).change().attr("disabled", true);
                        $("#txtEfectivo2").val("");
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                        break;

                    case "0003": //transferencia
                        $(".mAppPago2").css("display", "none");
                        $(".mNroOpe2").attr('class', 'span8 mNroOpe2');
                        $("#lbl_detalle3_2").html("Origen");
                        $("#lbl_detalle4_2").html("Nro. Operación");

                        $("#txtDestino2").parent().html("<select id='cbDestino2' class='obligatorio span12 cbocta2' data-placeholder='CUENTA DE CLIENTE'></select>");
                        $("#cbDestino2").select2();
                        $.ajaxSetup({ async: false });

                        $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 6.5, moneda: $("#cbo_Det_Origen2 :selected").attr("moneda"), empresapidm: $("#hfPIDM").val() },
                            function (res) {
                                if (res != null && res != "" && res.indexOf("error") < 0) {
                                    $("#cbDestino2").html(res).select2();
                                } else {
                                    $("#cbDestino2").html("<option></option>").select2();
                                }

                            });
                        $.ajaxSetup({ async: true });
                        $.ajaxSetup({ async: false });

                        $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 6, banco: $("#cbo_Det_Origen2 :selected").attr("banco"), moneda: $("#cbo_Det_Origen2 :selected").attr("moneda"), empresapidm: $("#hfPIDM").val() },
                            function (res) {
                                if (res != null && res != "" < 0) {
                                    $("#cbDestino2 option").filter(function (e, j) { var valorO = $(j).val(); if (res.indexOf(valorO) > 0) $(j).remove(); });
                                    if (res != "error") {
                                        $("#cbDestino2").append(res.split("<option></option")[1]);
                                    }
                                } else {
                                    $("#cbDestino2").html("<option></option>").change();
                                }

                            });
                        $.ajaxSetup({ async: true });

                        $("#cbDestino2").attr("disabled", false).change();
                        $("#cbo_moneda").attr("disabled", true);
                        $("#txtMonto").attr("disabled", true);
                        //$("#txtNroOpe2").attr("disabled", false);
                        $("#txtNroOpe2").attr("disabled", false).attr("placeholder", "de la transacción");
                        $("#txtEfectivo2").val("");
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                        break;

                    case "0013": //cheques bancarios
                        $(".mAppPago2").css("display", "none");
                        $(".mNroOpe2").attr('class', 'span8 mNroOpe2');
                        $("#lbl_detalle3_2").html("N° Cheque");
                        $("#lbl_detalle4_2").html("Girado a");
                        $("#txtDestino2").attr("disabled", false);
                        //$("#txtNroOpe2").attr("disabled", false);
                        $("#txtNroOpe2").attr("disabled", false).attr("placeholder", "");
                        $("#txtMonto").attr("disabled", true);
                        $("#txtEfectivo2").val("");
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                        break;

                    case "0006": //tarjeta de credito
                        $(".mAppPago2").css("display", "none");
                        $(".mNroOpe2").attr('class', 'span8 mNroOpe2');
                        $("#cbo_moneda").attr("disabled", false);
                        $("#lbl_detalle3_2").html("N° Tarjeta");
                        $("#lbl_detalle4_2").html("Cod. Autorización");

                        $("#txtNroOpe2").attr("disabled", false);
                        $("#txtMonto").attr("disabled", true);

                        $("#txtDestino2").attr("disabled", false).attr("placeholder", "ult. 4 digitos");
                        $("#txtNroOpe2").attr("disabled", false).attr("placeholder", "de la operación");
                        mascespecial("txtDestino2", "************", 16);

                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="pos2"><div class="span4">POS</div><div class="span8"><select data-placeholder="POS" id="slcPos2" class="span12"><option></option></select></div></div>');
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="tarjeta2"><div class="span4">MARCA</div><div class="span8"><select data-placeholder="MARCA TARJETA" id="slcTarjeta2" class="span12"><option></option></select></div></div>')
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="bco2"><div class="span4">BANCO</div><div class="span8"><select data-placeholder="BANCO" id="slcBco2" class="span12"><option></option></select></div></div>')

                        $("#slcPos2, #slcTarjeta2, #slcBco2").select2();
                        $("#slcPos2, #slcBco2, #slcTarjeta2").attr("disabled", true);

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "BCO" },
                            function (res) {
                                Bloquear($($("#slcBco2").siblings("div")).attr("id"));
                                $("#slcBco2").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {
                                    $("#slcBco2").addClass("obligatorio").html(res);

                                } else {
                                    $("#slcBco2").html("").attr("disabled", true);
                                }

                            }).done(function () { Desbloquear($($("#slcBco2").siblings("div")).attr("id")); });

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "MTAR" },
                            function (res) {
                                Bloquear($($("#slcTarjeta2").siblings("div")).attr("id"));
                                $("#slcTarjeta2").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {
                                    listaTarjetas = res;
                                    $("#slcTarjeta2").addClass("obligatorio").html(res);

                                } else {
                                    $("#slcTarjeta2").html("").attr("disabled", true);
                                }

                            }).done(function () { Desbloquear($($("#slcTarjeta2").siblings("div")).attr("id")); });;

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "POS", caja: $("#cbo_Det_Origen2").val(), empresa: $("#cbo_Empresa").val(), estable: $("#cbo_Det_Origen2 :selected").attr("stbl") },
                            function (res) {
                                Bloquear($($("#slcPos2").siblings("div")).attr("id"));
                                $("#slcPos2").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {

                                    $("#slcPos2").addClass("obligatorio").html(res).change(function () {

                                        var mone_pos = $("#slcPos2 :selected").attr("moneda");

                                        if (mone_pos.indexOf($("#cbo_moneda").val()) < 0) {
                                            $("#slcPos2").select2("val", "");
                                            infoCustom2("Moneda de POS no coincide con moneda del Documento de Venta")
                                        }

                                        var tarj_pos = $("#slcPos2 :selected").attr("tarjetas");
                                        $("#slcTarjeta2").html(listaTarjetas).select2("val", "");
                                        $("#slcTarjeta2 option").filter(function (e, d) {
                                            var val0r = $(d).val();
                                            if (tarj_pos.indexOf(val0r) < 0) { $("#slcTarjeta2 option[value=" + val0r + "]").remove(); }

                                        });
                                        $("#slcTarjeta2").select2("val", "00006");//DPORTA 08/07/2021 PARA QUE CARGUE POR DEFECTO LA MARCA "VISA"
                                    });

                                } else {
                                    $("#slcPos2").html("").attr("disabled", true);
                                }

                            }).done(function () //DPORTA 24/06/2021
                            {
                                Desbloquear($($("#slcPos2").siblings("div")).attr("id"));
                                $.ajax({
                                    type: "post",
                                    url: "vistas/CC/ajax/CCMCBCL.ASHX?flag=POS_PRED&caja=" + $("#cbo_Det_Origen2").val() + "&empresa=" + $("#cbo_Empresa").val() + "&estable=" + $("#cbo_Det_Origen2 :selected").attr("stbl"),
                                    contenttype: "application/json;",
                                    datatype: "json",
                                    async: false,
                                    success: function (datos) {
                                        if (datos != null) {
                                            $("#slcPos2").val(datos);
                                            $("#slcPos2").change();
                                        }
                                    },
                                    error: function (msg) {
                                        alertCustom("Monedas no se listaron correctamente.");
                                    }
                                });

                            });
                        $("#txtEfectivo2").val("");
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                        break;
                    case "0005": // tarjeta de debito
                        $(".mAppPago2").css("display", "none");
                        $(".mNroOpe2").attr('class', 'span8 mNroOpe2');
                        $("#lbl_detalle3_2").html("N° Tarjeta");
                        $("#lbl_detalle4_2").html("Cod. Autorización");

                        $("#txtNroOpe2").attr("disabled", false);
                        $("#txtMonto").attr("disabled", true);

                        $("#txtDestino2").attr("disabled", false).attr("placeholder", "ult. 4 digitos");
                        $("#txtNroOpe2").attr("disabled", false).attr("placeholder", "de la operación");
                        mascespecial("txtDestino2", "************", 16);

                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="pos2"><div class="span4">POS</div><div class="span8"><select data-placeholder="POS" id="slcPos2" class="span12"><option></option></select></div></div>');
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="tarjeta2"><div class="span4">MARCA</div><div class="span8"><select data-placeholder="MARCA TARJETA" id="slcTarjeta2" class="span12"><option></option></select></div></div>')
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="bco2"><div class="span4">BANCO</div><div class="span8"><select data-placeholder="BANCO" id="slcBco2" class="span12"><option></option></select></div></div>')

                        $("#slcPos2, #slcTarjeta2, #slcBco2").select2();
                        $("#slcPos2, #slcBco2, #slcTarjeta2").attr("disabled", true);

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "BCO" },
                            function (res) {
                                Bloquear($($("#slcBco2").siblings("div")).attr("id"));
                                $("#slcBco2").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {
                                    $("#slcBco2").addClass("obligatorio").html(res);

                                } else {
                                    $("#slcBco2").html("").attr("disabled", true);
                                }

                            }).done(function () { Desbloquear($($("#slcBco2").siblings("div")).attr("id")); });

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "MTAR" },
                            function (res) {
                                Bloquear($($("#slcTarjeta2").siblings("div")).attr("id"));
                                $("#slcTarjeta2").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {
                                    listaTarjetas = res;
                                    $("#slcTarjeta2").addClass("obligatorio").html(res);

                                } else {
                                    $("#slcTarjeta2").html("").attr("disabled", true);
                                }

                            }).done(function () { Desbloquear($($("#slcTarjeta2").siblings("div")).attr("id")); });;

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "POS", caja: $("#cbo_Det_Origen2").val(), empresa: $("#cbo_Empresa").val(), estable: $("#cbo_Det_Origen2 :selected").attr("stbl") },
                            function (res) {
                                Bloquear($($("#slcPos2").siblings("div")).attr("id"));
                                $("#slcPos2").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {

                                    $("#slcPos2").addClass("obligatorio").html(res).change(function () {

                                        var mone_pos = $("#slcPos2 :selected").attr("moneda");

                                        if (mone_pos.indexOf($("#cbo_moneda").val()) < 0) {
                                            $("#slcPos2").select2("val", "");
                                            infoCustom2("Moneda de POS no coincide con moneda del Documento de Venta")
                                        }

                                        var tarj_pos = $("#slcPos2 :selected").attr("tarjetas");
                                        $("#slcTarjeta2").html(listaTarjetas).select2("val", "");
                                        $("#slcTarjeta2 option").filter(function (e, d) {
                                            var val0r = $(d).val();
                                            if (tarj_pos.indexOf(val0r) < 0) { $("#slcTarjeta2 option[value=" + val0r + "]").remove(); }
                                        });
                                        $("#slcTarjeta2").select2("val", "00006");//DPORTA 08/07/2021 PARA QUE CARGUE POR DEFECTO LA MARCA "VISA"
                                    });

                                } else {
                                    $("#slcPos2").html("").attr("disabled", true);
                                }

                            }).done(function () //DPORTA 24/06/2021
                            {
                                Desbloquear($($("#slcPos2").siblings("div")).attr("id"));
                                $.ajax({
                                    type: "post",
                                    url: "vistas/CC/ajax/CCMCBCL.ASHX?flag=POS_PRED&caja=" + $("#cbo_Det_Origen2").val() + "&empresa=" + $("#cbo_Empresa").val() + "&estable=" + $("#cbo_Det_Origen2 :selected").attr("stbl"),
                                    contenttype: "application/json;",
                                    datatype: "json",
                                    async: false,
                                    success: function (datos) {
                                        if (datos != null) {
                                            $("#slcPos2").val(datos);
                                            $("#slcPos2").change();
                                        }
                                    },
                                    error: function (msg) {
                                        alertCustom("Monedas no se listaron correctamente.");
                                    }
                                });

                            });
                        $("#txtEfectivo2").val("");
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                        break;
                    case "0020"://OTROS: YAPE, PLIN, TUNKI, ETC BILLETERA DIG.

                        let billetera_dig = $("#cbo_Det_Origen2 :selected").attr("billetera_dig");

                        if (billetera_dig == 'S') {
                            $(".mAppPago2").css("display", "block");
                            $("#lbl_detalle3_2").html("Origen de Pago");
                            //$("#lbl_detalle4_2").html("Nro. Op.");
                            $("#lbl_detalle4_2").html("App - Nro. Operación");
                            $("#txtDestino2").parent().html("<select id='cbDestino2' class='obligatorio span12 cbocta2' data-placeholder='CUENTA DE CLIENTE'></select>");
                            $("#cbDestino2").html("<option>BILLETERA DIGITAL</option>").attr("disabled", true).select2();

                            $(".mPersona2").css("display", "none");
                            offObjectEvents("txtNroOpe2");
                            $("#cbo_appPago2").removeClass("personas").attr("disabled", false);


                            $("#cbo_appPago2").attr("disabled", false);
                            $(".mNroOpe2").attr('class', 'span4 mNroOpe2');
                            $("#txtNroOpe2").removeClass("personas").attr("disabled", false);
                            $("#txtNroOpe2").attr("disabled", false).attr("placeholder", "Nro. Operación");
                            $("#txtMonto").attr("disabled", true);
                            $("#cbo_moneda").val($("#cbo_Det_Origen2 :selected").attr("moneda")).change().attr("disabled", true);

                            //$("#p_DatVuelto").hide();
                            $("#txtEfectivo2").val("");
                            //$("#txtVuelto").val("");

                            //let nombre_cuenta = $("#cbo_Det_Origen2 :selected").html(); //DPORTA 09/12/2021

                            //if (nombre_cuenta.indexOf('BCP') > 0) {
                            //    //$("#txtNroOpe2").val("YAPE  -");
                            //    mascespecial("txtNroOpe2", "YAPE  -", 16);
                            //} else if (nombre_cuenta.indexOf('BBVA') > 0) {
                            //    //$("#txtNroOpe2").val("LUKITA-");
                            //    mascespecial("txtNroOpe2", "LUKITA-", 16);
                            //} else if (nombre_cuenta.indexOf('IBK') > 0) {
                            //    //$("#txtNroOpe2").val("TUNKI -");
                            //    mascespecial("txtNroOpe2", "TUNKI -", 16);
                            //} else if (nombre_cuenta.indexOf('BIF') > 0 || nombre_cuenta.indexOf('SCT') > 0) {
                            //    //$("#txtNroOpe2").val("PLIN  -");
                            //    mascespecial("txtNroOpe2", "PLIN  -", 16);
                            //}

                            ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
                        } else {
                            infoCustom2("La cuenta destino seleccionada no tiene asociada una Billetera digital");
                            $(".mAppPago2").css("display", "none");
                            $(".mNroOpe2").attr('class', 'span8 mNroOpe2');
                        }

                        break;
                }
            }
        });

        $('#cboMedioPago3').change(function () {
            html_monedas = $("#cbo_moneda").html();

            var MedioActual3 = $(this).val();

            if (MedioActual3 != null) {
                $(".cbocta3").parent().html(html_txtDestino);
                $("#txtNroOpe3").removeClass("personas").attr("disabled", false);
                $("#txtDestino3").val("");
                $("#txtDestino3").attr("disabled", false).off("change").attr("placeholder", "");
                $("#txtNroOpe3").val("");

                $("#pos3,#tarjeta3,#bco3").remove();
                $(".mPersona3").css("display", "none");
                offObjectEvents("txtNroOpe3");

                $("#txtNroOpe3").removeClass("personas").attr("disabled", false);
                $("#txtNroOpe3").attr("disabled", false).attr("placeholder", "");
                switch (MedioActual3) {
                    case "0001"://DEPOSITO BANCARIO
                        $(".mAppPago3").css("display", "none");
                        $(".mNroOpe3").attr('class', 'span8 mNroOpe3');
                        $("#lbl_detalle3_3").html("Origen de Pago");
                        $("#lbl_detalle4_3").html("Nro. Operación");
                        $("#txtDestino3").parent().html("<select id='cbDestino3' class='obligatorio span12 cbocta3' data-placeholder='CUENTA DE CLIENTE'></select>");
                        $("#cbDestino3").html("<option>DEPOSITO DIRECTO VENTANILLA</option>").attr("disabled", true).select2();

                        $(".mPersona3").css("display", "none");
                        offObjectEvents("txtNroOpe3");
                        $("#txtNroOpe3").removeClass("personas").attr("disabled", false);
                        $("#txtNroOpe3").attr("disabled", false).attr("placeholder", "de la transacción");
                        $("#txtMonto").attr("disabled", true);
                        $("#cbo_moneda").val($("#cbo_Det_Origen3 :selected").attr("moneda")).change().attr("disabled", true);
                        $("#txtEfectivo3").val("");
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                        break;

                    case "0003": //transferencia
                        $(".mAppPago3").css("display", "none");
                        $(".mNroOpe3").attr('class', 'span8 mNroOpe3');
                        $("#lbl_detalle3_3").html("Origen");
                        $("#lbl_detalle4_3").html("Nro. Operación");

                        $("#txtDestino3").parent().html("<select id='cbDestino3' class='obligatorio span12 cbocta3' data-placeholder='CUENTA DE CLIENTE'></select>");
                        $("#cbDestino3").select2();
                        $.ajaxSetup({ async: false });

                        $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 6.5, moneda: $("#cbo_Det_Origen3 :selected").attr("moneda"), empresapidm: $("#hfPIDM").val() },
                            function (res) {
                                if (res != null && res != "" && res.indexOf("error") < 0) {
                                    $("#cbDestino3").html(res).select2();
                                } else {
                                    $("#cbDestino3").html("<option></option>").select2();
                                }

                            });
                        $.ajaxSetup({ async: true });
                        $.ajaxSetup({ async: false });

                        $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 6, banco: $("#cbo_Det_Origen3 :selected").attr("banco"), moneda: $("#cbo_Det_Origen3 :selected").attr("moneda"), empresapidm: $("#hfPIDM").val() },
                            function (res) {
                                if (res != null && res != "" < 0) {
                                    $("#cbDestino3 option").filter(function (e, j) { var valorO = $(j).val(); if (res.indexOf(valorO) > 0) $(j).remove(); });
                                    if (res != "error") {
                                        $("#cbDestino3").append(res.split("<option></option")[1]);
                                    }
                                } else {
                                    $("#cbDestino3").html("<option></option>").change();
                                }

                            });
                        $.ajaxSetup({ async: true });

                        $("#cbDestino3").attr("disabled", false).change();
                        $("#cbo_moneda").attr("disabled", true);
                        $("#txtMonto").attr("disabled", true);
                        //$("#txtNroOpe3").attr("disabled", false);
                        $("#txtNroOpe3").attr("disabled", false).attr("placeholder", "de la transacción");
                        $("#txtEfectivo3").val("");
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                        break;

                    case "0013": //cheques bancarios
                        $(".mAppPago3").css("display", "none");
                        $(".mNroOpe3").attr('class', 'span8 mNroOpe3');
                        $("#lbl_detalle3_3").html("N° Cheque");
                        $("#lbl_detalle4_3").html("Girado a");
                        $("#txtDestino3").attr("disabled", false);
                        //$("#txtNroOpe3").attr("disabled", false);
                        $("#txtNroOpe3").attr("disabled", false).attr("placeholder", "");
                        $("#txtMonto").attr("disabled", true);
                        $("#txtEfectivo3").val("");
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                        break;

                    case "0006": //tarjeta de credito
                        $(".mAppPago3").css("display", "none");
                        $(".mNroOpe3").attr('class', 'span8 mNroOpe3');
                        $("#cbo_moneda").attr("disabled", false);
                        $("#lbl_detalle3_3").html("N° Tarjeta");
                        $("#lbl_detalle4_3").html("Cod. Autorización");

                        $("#txtNroOpe3").attr("disabled", false);
                        $("#txtMonto").attr("disabled", true);

                        $("#txtDestino3").attr("disabled", false).attr("placeholder", "ult. 4 digitos");
                        $("#txtNroOpe3").attr("disabled", false).attr("placeholder", "de la operación");
                        mascespecial("txtDestino3", "************", 16);

                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="pos3"><div class="span4">POS</div><div class="span8"><select data-placeholder="POS" id="slcPos3" class="span12"><option></option></select></div></div>');
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="tarjeta3"><div class="span4">MARCA</div><div class="span8"><select data-placeholder="MARCA TARJETA" id="slcTarjeta3" class="span12"><option></option></select></div></div>')
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="bco3"><div class="span4">BANCO</div><div class="span8"><select data-placeholder="BANCO" id="slcBco3" class="span12"><option></option></select></div></div>')

                        $("#slcPos3, #slcTarjeta3, #slcBco3").select2();
                        $("#slcPos3, #slcBco3, #slcTarjeta3").attr("disabled", true);

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "BCO" },
                            function (res) {
                                Bloquear($($("#slcBco3").siblings("div")).attr("id"));
                                $("#slcBco3").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {
                                    $("#slcBco3").addClass("obligatorio").html(res);

                                } else {
                                    $("#slcBco3").html("").attr("disabled", true);
                                }

                            }).done(function () { Desbloquear($($("#slcBco3").siblings("div")).attr("id")); });

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "MTAR" },
                            function (res) {
                                Bloquear($($("#slcTarjeta3").siblings("div")).attr("id"));
                                $("#slcTarjeta3").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {
                                    listaTarjetas = res;
                                    $("#slcTarjeta3").addClass("obligatorio").html(res);

                                } else {
                                    $("#slcTarjeta3").html("").attr("disabled", true);
                                }

                            }).done(function () { Desbloquear($($("#slcTarjeta3").siblings("div")).attr("id")); });;

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "POS", caja: $("#cbo_Det_Origen3").val(), empresa: $("#cbo_Empresa").val(), estable: $("#cbo_Det_Origen3 :selected").attr("stbl") },
                            function (res) {
                                Bloquear($($("#slcPos3").siblings("div")).attr("id"));
                                $("#slcPos3").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {

                                    $("#slcPos3").addClass("obligatorio").html(res).change(function () {

                                        var mone_pos = $("#slcPos3 :selected").attr("moneda");

                                        if (mone_pos.indexOf($("#cbo_moneda").val()) < 0) {
                                            $("#slcPos3").select2("val", "");
                                            infoCustom2("Moneda de POS no coincide con moneda del Documento de Venta")
                                        }

                                        var tarj_pos = $("#slcPos3 :selected").attr("tarjetas");
                                        $("#slcTarjeta3").html(listaTarjetas).select2("val", "");
                                        $("#slcTarjeta3 option").filter(function (e, d) {
                                            var val0r = $(d).val();
                                            if (tarj_pos.indexOf(val0r) < 0) { $("#slcTarjeta3 option[value=" + val0r + "]").remove(); }

                                        });
                                        $("#slcTarjeta3").select2("val", "00006");//DPORTA 08/07/2021 PARA QUE CARGUE POR DEFECTO LA MARCA "VISA"
                                    });

                                } else {
                                    $("#slcPos3").html("").attr("disabled", true);
                                }

                            }).done(function () //DPORTA 24/06/2021
                            {
                                Desbloquear($($("#slcPos3").siblings("div")).attr("id"));
                                $.ajax({
                                    type: "post",
                                    url: "vistas/CC/ajax/CCMCBCL.ASHX?flag=POS_PRED&caja=" + $("#cbo_Det_Origen3").val() + "&empresa=" + $("#cbo_Empresa").val() + "&estable=" + $("#cbo_Det_Origen3 :selected").attr("stbl"),
                                    contenttype: "application/json;",
                                    datatype: "json",
                                    async: false,
                                    success: function (datos) {
                                        if (datos != null) {
                                            $("#slcPos3").val(datos);
                                            $("#slcPos3").change();
                                        }
                                    },
                                    error: function (msg) {
                                        alertCustom("Monedas no se listaron correctamente.");
                                    }
                                });

                            });
                        $("#txtEfectivo3").val("");
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                        break;
                    case "0005": // tarjeta de debito
                        $(".mAppPago3").css("display", "none");
                        $(".mNroOpe3").attr('class', 'span8 mNroOpe3');
                        $("#lbl_detalle3_3").html("N° Tarjeta");
                        $("#lbl_detalle4_3").html("Cod. Autorización");

                        $("#txtNroOpe3").attr("disabled", false);
                        $("#txtMonto").attr("disabled", true);

                        $("#txtDestino3").attr("disabled", false).attr("placeholder", "ult. 4 digitos");
                        $("#txtNroOpe3").attr("disabled", false).attr("placeholder", "de la operación");
                        mascespecial("txtDestino3", "************", 16);

                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="pos3"><div class="span4">POS</div><div class="span8"><select data-placeholder="POS" id="slcPos3" class="span12"><option></option></select></div></div>');
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="tarjeta3"><div class="span4">MARCA</div><div class="span8"><select data-placeholder="MARCA TARJETA" id="slcTarjeta3" class="span12"><option></option></select></div></div>')
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="bco3"><div class="span4">BANCO</div><div class="span8"><select data-placeholder="BANCO" id="slcBco3" class="span12"><option></option></select></div></div>')

                        $("#slcPos3, #slcTarjeta3, #slcBco3").select2();
                        $("#slcPos3, #slcBco3, #slcTarjeta3").attr("disabled", true);

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "BCO" },
                            function (res) {
                                Bloquear($($("#slcBco3").siblings("div")).attr("id"));
                                $("#slcBco3").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {
                                    $("#slcBco3").addClass("obligatorio").html(res);

                                } else {
                                    $("#slcBco3").html("").attr("disabled", true);
                                }

                            }).done(function () { Desbloquear($($("#slcBco3").siblings("div")).attr("id")); });

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "MTAR" },
                            function (res) {
                                Bloquear($($("#slcTarjeta3").siblings("div")).attr("id"));
                                $("#slcTarjeta3").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {
                                    listaTarjetas = res;
                                    $("#slcTarjeta3").addClass("obligatorio").html(res);

                                } else {
                                    $("#slcTarjeta3").html("").attr("disabled", true);
                                }

                            }).done(function () { Desbloquear($($("#slcTarjeta3").siblings("div")).attr("id")); });;

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "POS", caja: $("#cbo_Det_Origen3").val(), empresa: $("#cbo_Empresa").val(), estable: $("#cbo_Det_Origen3 :selected").attr("stbl") },
                            function (res) {
                                Bloquear($($("#slcPos3").siblings("div")).attr("id"));
                                $("#slcPos3").attr("disabled", false);
                                if (res != null && res != "" && res.indexOf("error") < 0) {

                                    $("#slcPos3").addClass("obligatorio").html(res).change(function () {

                                        var mone_pos = $("#slcPos3 :selected").attr("moneda");

                                        if (mone_pos.indexOf($("#cbo_moneda").val()) < 0) {
                                            $("#slcPos3").select2("val", "");
                                            infoCustom2("Moneda de POS no coincide con moneda del Documento de Venta")
                                        }

                                        var tarj_pos = $("#slcPos3 :selected").attr("tarjetas");
                                        $("#slcTarjeta3").html(listaTarjetas).select2("val", "");
                                        $("#slcTarjeta3 option").filter(function (e, d) {
                                            var val0r = $(d).val();
                                            if (tarj_pos.indexOf(val0r) < 0) { $("#slcTarjeta3 option[value=" + val0r + "]").remove(); }
                                        });
                                        $("#slcTarjeta3").select2("val", "00006");//DPORTA 08/07/2021 PARA QUE CARGUE POR DEFECTO LA MARCA "VISA"
                                    });

                                } else {
                                    $("#slcPos3").html("").attr("disabled", true);
                                }

                            }).done(function () //DPORTA 24/06/2021
                            {
                                Desbloquear($($("#slcPos3").siblings("div")).attr("id"));
                                $.ajax({
                                    type: "post",
                                    url: "vistas/CC/ajax/CCMCBCL.ASHX?flag=POS_PRED&caja=" + $("#cbo_Det_Origen3").val() + "&empresa=" + $("#cbo_Empresa").val() + "&estable=" + $("#cbo_Det_Origen3 :selected").attr("stbl"),
                                    contenttype: "application/json;",
                                    datatype: "json",
                                    async: false,
                                    success: function (datos) {
                                        if (datos != null) {
                                            $("#slcPos3").val(datos);
                                            $("#slcPos3").change();
                                        }
                                    },
                                    error: function (msg) {
                                        alertCustom("Monedas no se listaron correctamente.");
                                    }
                                });

                            });
                        $("#txtEfectivo3").val("");
                        ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));

                        break;
                    case "0020"://OTROS: YAPE, PLIN, TUNKI, ETC BILLETERA DIG.

                        let billetera_dig = $("#cbo_Det_Origen3 :selected").attr("billetera_dig");

                        if (billetera_dig == 'S') {
                            $(".mAppPago3").css("display", "block");
                            $("#lbl_detalle3_3").html("Origen de Pago");
                            //$("#lbl_detalle4_3").html("Nro. Op.");
                            $("#lbl_detalle4_3").html("App - Nro. Operación");
                            $("#txtDestino3").parent().html("<select id='cbDestino3' class='obligatorio span12 cbocta3' data-placeholder='CUENTA DE CLIENTE'></select>");
                            $("#cbDestino3").html("<option>BILLETERA DIGITAL</option>").attr("disabled", true).select2();

                            $(".mPersona3").css("display", "none");
                            offObjectEvents("txtNroOpe3");
                            $("#cbo_appPago3").removeClass("personas").attr("disabled", false);


                            $("#cbo_appPago3").attr("disabled", false);
                            $(".mNroOpe3").attr('class', 'span4 mNroOpe3');
                            $("#txtNroOpe3").removeClass("personas").attr("disabled", false);
                            $("#txtNroOpe3").attr("disabled", false).attr("placeholder", "Nro. Operación");
                            $("#txtMonto").attr("disabled", true);
                            $("#cbo_moneda").val($("#cbo_Det_Origen3 :selected").attr("moneda")).change().attr("disabled", true);

                            //$("#p_DatVuelto").hide();
                            $("#txtEfectivo3").val("");
                            //$("#txtVuelto").val("");

                            //let nombre_cuenta = $("#cbo_Det_Origen3 :selected").html(); //DPORTA 09/12/2021

                            //if (nombre_cuenta.indexOf('BCP') > 0) {
                            //    //$("#txtNroOpe3").val("YAPE  -");
                            //    mascespecial("txtNroOpe3", "YAPE  -", 16);
                            //} else if (nombre_cuenta.indexOf('BBVA') > 0) {
                            //    //$("#txtNroOpe3").val("LUKITA-");
                            //    mascespecial("txtNroOpe3", "LUKITA-", 16);
                            //} else if (nombre_cuenta.indexOf('IBK') > 0) {
                            //    //$("#txtNroOpe3").val("TUNKI -");
                            //    mascespecial("txtNroOpe3", "TUNKI -", 16);
                            //} else if (nombre_cuenta.indexOf('BIF') > 0 || nombre_cuenta.indexOf('SCT') > 0) {
                            //    //$("#txtNroOpe3").val("PLIN  -");
                            //    mascespecial("txtNroOpe3", "PLIN  -", 16);
                            //}

                            ValidarSuma(($("#txtEfectivo").val() == "" ? 0 : $("#txtEfectivo").val().replace(",", "")), ($("#txtEfectivo2").val() == "" ? 0 : $("#txtEfectivo2").val().replace(",", "")), ($("#txtEfectivo3").val() == "" ? 0 : $("#txtEfectivo3").val().replace(",", "")));
                        } else {
                            infoCustom2("La cuenta destino seleccionada no tiene asociada una Billetera digital");
                            $(".mAppPago3").css("display", "none");
                            $(".mNroOpe3").attr('class', 'span8 mNroOpe3');
                        }

                        break;
                }
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
            $("#txtEfectivo").keyup();//OBSERVAR
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

    if (!vErrorBodyAnyElement("#obligatorio")) {

        if ($("#txtMonto").val() == "") {
            alertCustom("Indique un monto a cobrar");
            // } else if (parseFloat($("#txtMonto").val()) == 0) {
            //  alertCustom("Monto a cobrar no puede ser 0");
        } else {

            var monto = parseFloat($("#txtMonto").val().split(",").join(""));
            var origenCobroInd = $("#cbo_OrigenPago").val().substring(0, 1); //Antes ind_tipo

            var monto_pb = ""; //Por pagar base
            var monto_pa = ""; //Por pagar alter
            var monto_pp = ""; //Por pagar segun venta

            if ($("#cbo_moneda :selected").attr("data-tipo") == "MOBA") {
                if ($("#cboMedioPago").val() == "0008") {// 27/02
                    monto_pb = parseFloat($("#txtEfectivo").val().split(",").join("")).toFixed(2) - parseFloat($("#txtVuelto").val().split(",").join("")).toFixed(2); // 27/02
                    monto_pp = parseFloat(monto_pb);
                } else {
                    monto_pb = parseFloat($("#txtEfectivo").val().split(",").join("")).toFixed(2); // 26/02
                    monto_pp = parseFloat(monto_pb);
                }
            } else {
                if ($("#cboMedioPago").val() == "0008") {// 27/02
                    monto_pa = parseFloat($("#txtEfectivo").val().split(",").join("")).toFixed(2) - parseFloat($("#txtVuelto").val().split(",").join("")).toFixed(2); // 26/02
                    monto_pp = parseFloat(monto_pa);
                } else {
                    monto_pa = parseFloat($("#txtEfectivo").val().split(",").join("")).toFixed(2); // 26/02
                    monto_pp = parseFloat(monto_pa);
                }
            }

            var codigoVenta = ""; //EN BD
            var documento = ""; //EN BD

            cade_pagar += (codigoVenta + "," + documento + "," + (monto_pb == "" ? 0 : monto_pb) + "," + (monto_pa == "" ? 0 : monto_pa) + "," + (parseFloat($("#txt_monto_total").val()) === parseFloat($("#txtMonto").val()) ? "S" : "N"));


            var p_empresa = $("#cbo_Empresa").val();
            var p_user = $("#ctl00_txtus").val();
            var p_destino = $("#cbo_Det_Origen").val(); // origen
            var p_moneda = $("#cbo_moneda").val();

            var p_fecha_pago = ConvertirDate($("#txtFechaPago").val());
            var medio_pa = $("#cboMedioPago").val();
            var p_origen = $("#txtDestino").val();

            if (medio_pa == "0020") {
                var p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#cbo_appPago").val() + " - " + "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
            } else {
                var p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
            }  
            
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
                    case "0001": //depósito bancario
                        det_desc = "DEPÓSITO*" + "/" + $("#txtClientes").val();
                        var p_origen = $("#cbDestino").val();
                        break;

                    case "0003": //transferencia
                        det_desc = "TRANSFERENCIA*" + "/" + $("#txtClientes").val();
                        var p_origen = $("#cbDestino").val();
                        break;

                    case "0013": //cheques bancarios
                        det_desc = "CHEQ.PAGADOR N°:" + $("#txtDestino").val() + " " + $("#txtClientes").val();
                        adicional = $("#txtDestino").val();
                        compl = "N";
                        p_documento = "";
                        break;
                    case "0020": // OTROS (BILLETERA DIGITAL) DPORTA 09/12/2021
                        det_desc = "BILLETERA DIGITAL*" + "/" + $("#txtClientes").val();
                        var p_origen = $("#cbDestino").val();
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
                v_MONTO_TOTAL = $("#txtEfectivo").val().split(",").join("") + ";";
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

function pagar2() { //25/02
    var datosPago2 = "";
    cade_pagar2 = "";

    if ($("#txtEfectivo2").val() != "") {

        if ($("#txtMonto").val() == "") {
            alertCustom("Indique un monto a cobrar");
        } else {

            var monto = parseFloat($("#txtMonto").val().split(",").join(""));
            var origenCobroInd2 = $("#cbo_OrigenPago2").val().substring(0, 1); //Antes ind_tipo

            var monto_pb2 = ""; //Por pagar base
            var monto_pa2 = ""; //Por pagar alter
            var monto_pp2 = ""; //Por pagar segun venta

            if ($("#cbo_moneda :selected").attr("data-tipo") == "MOBA") {
                monto_pb2 = parseFloat($("#txtEfectivo2").val().split(",").join("")).toFixed(2); // 26/02
                monto_pp2 = parseFloat(monto_pb2);
            } else {
                monto_pa2 = parseFloat($("#txtEfectivo2").val().split(",").join("")).toFixed(2); // 26/02
                monto_pp2 = parseFloat(monto_pa2);
            }

            var codigoVenta2 = ""; //EN BD
            var documento2 = ""; //EN BD

            cade_pagar2 += (codigoVenta2 + "," + documento2 + "," + (monto_pb2 == "" ? 0 : monto_pb2) + "," + (monto_pa2 == "" ? 0 : monto_pa2) + "," + (parseFloat($("#txt_monto_total").val()) === parseFloat($("#txtMonto").val()) ? "S" : "N"));


            var p_empresa2 = $("#cbo_Empresa").val();
            var p_user2 = $("#ctl00_txtus").val();
            var p_destino2 = $("#cbo_Det_Origen2").val(); // origen
            var p_moneda2 = $("#cbo_moneda").val();

            var p_fecha_pago2 = ConvertirDate($("#txtFechaPago").val());
            var medio_pa2 = $("#cboMedioPago2").val();
            var p_origen2 = $("#txtDestino2").val();

            if (medio_pa2 == "0020") {
                var p_documento2 = $("#txtNroOpe2.personas").html() == undefined ? "OP" + $("#cbo_appPago2").val() + " - " + "OP" + $("#txtNroOpe2").val() : $("#txtNroOpe2").val();
            } else {
                var p_documento2 = $("#txtNroOpe2.personas").html() == undefined ? "OP" + $("#txtNroOpe2").val() : $("#txtNroOpe2").val();
            } 
            
            var adicional2 = "";
            var cod_ape2 = "";
            var det_desc2 = "", pidm_cta2 = "", cta2 = "", compl2 = "";
            var p_flag2 = 1;

            if (origenCobroInd2 == "B") {
                pidm_cta2 = $("#cbo_Det_Origen2 :selected").attr("pidm"); //Pidm Cuenta bancaria
                cta2 = $("#cbo_Det_Origen2").val();//Cuenta bancaria
                compl2 = "S";
                p_flag2 = 1.5;

                switch ($("#cboMedioPago2").val()) {
                    case "0001": //depósito bancario
                        det_desc2 = "DEPÓSITO*" + "/" + $("#txtClientes").val();
                        var p_origen2 = $("#cbDestino2").val();
                        break;

                    case "0003": //transferencia
                        det_desc2 = "TRANSFERENCIA*" + "/" + $("#txtClientes").val();
                        var p_origen2 = $("#cbDestino2").val();
                        break;

                    case "0013": //cheques bancarios
                        det_desc2 = "CHEQ.PAGADOR N°:" + $("#txtDestino").val() + " " + $("#txtClientes").val();
                        adicional2 = $("#txtDestino2").val();
                        compl2 = "N";
                        p_documento2 = "";
                        break;
                    case "0020": // OTROS (BILLETERA DIGITAL) DPORTA 09/12/2021
                        det_desc2 = "BILLETERA DIGITAL*" + "/" + $("#txtClientes").val();
                        var p_origen2 = $("#cbDestino2").val();
                        break;
                }
            } else if (origenCobroInd2 == "C") {

                switch ($("#cboMedioPago2").val()) {
                    case "0006": //tarjeta de credito
                        p_documento2 = p_documento2.replace("OP", "COD.AUT.");
                        p_origen2 = p_origen2.substring(12);
                        det_desc2 = $("#txtClientes").val() + "/" + $("#txtDestino2").val();
                        adicional2 = $("#slcPos2").val() + "|" + $("#slcTarjeta2").val() + "|" + $("#slcBco2").val() + "|W"; //pos|marca|banco|tipoind
                        break;

                    case "0005": // tarjeta de debito
                        p_documento2 = p_documento2.replace("OP", "COD.AUT.");
                        p_origen2 = p_origen2.substring(12);
                        det_desc2 = $("#txtClientes").val() + "/" + $("#txtDestino2").val();
                        adicional2 = $("#slcPos2").val() + "|" + $("#slcTarjeta2").val() + "|" + $("#slcBco2").val() + "|W";
                        break;
                }
                cod_ape2 = $("#cbo_Det_Origen2 :selected").attr("codigo");
            }

            var descripcion2 = origenCobroInd2 == "C" ? "COBRO A CLIENTE" : det_desc2;


            v_CTLG_CODE = p_empresa2;
            v_MONE_CODE = p_moneda2;
            v_USUA_ID = p_user2;
            v_DETALLE = cade_pagar2;
            v_fecha_pago = p_fecha_pago2;
            v_medio_pago = medio_pa2;
            v_descripcion = descripcion2;
            v_destino = p_destino2;
            v_documento = p_documento2;
            v_ORIGEN = p_origen2;
            v_adicional = adicional2;

            if (p_flag2 == "1") {
                v_codigo_apertura = cod_ape2;
                v_ind = "CAJ";
                v_pidm = "";
                v_cta_code = "";
                v_oficina = "";
                v_canal = "";
                v_ind_completo = "";
                v_MONTO_TOTAL = "0";

            } else if (p_flag2 == "1.5") {
                v_pidm = pidm_cta2;
                v_cta_code = cta2;
                v_ind_completo = compl2;
                v_MONTO_TOTAL = $("#txtEfectivo2").val().split(",").join("") + ";";
                v_ind = "BAN";
                v_codigo_apertura = "";
                v_oficina = "";
                v_canal = "";
            }

            datosPago2 += v_DETALLE + ";";
            datosPago2 += v_ORIGEN + ";";
            datosPago2 += v_USUA_ID + ";";
            datosPago2 += v_codigo_apertura + ";";
            datosPago2 += v_CTLG_CODE + ";";
            datosPago2 += v_MONE_CODE + ";";
            datosPago2 += v_medio_pago + ";";
            datosPago2 += v_descripcion + ";";
            datosPago2 += v_fecha_pago + ";";
            datosPago2 += v_destino + ";";
            datosPago2 += v_documento + ";";
            datosPago2 += v_ind + ";";
            datosPago2 += v_pidm + ";";
            datosPago2 += v_cta_code + ";";
            datosPago2 += v_oficina + ";";
            datosPago2 += v_canal + ";";
            datosPago2 += v_ind_completo + ";";
            datosPago2 += v_adicional + ";";
            datosPago2 += v_MONTO_TOTAL + ";";
            return datosPago2;
        }
    }
    return datosPago2;
}

function pagar3() { //25/02
    var datosPago3 = "";
    cade_pagar3 = "";

    if ($("#txtEfectivo3").val() != "") {

        if ($("#txtMonto").val() == "") {
            alertCustom("Indique un monto a cobrar");
        } else {

            var monto = parseFloat($("#txtMonto").val().split(",").join(""));
            var origenCobroInd3 = $("#cbo_OrigenPago3").val().substring(0, 1); //Antes ind_tipo

            var monto_pb3 = ""; //Por pagar base
            var monto_pa3 = ""; //Por pagar alter
            var monto_pp3 = ""; //Por pagar segun venta

            if ($("#cbo_moneda :selected").attr("data-tipo") == "MOBA") {
                monto_pb3 = parseFloat($("#txtEfectivo3").val().split(",").join("")).toFixed(2); // 26/02
                monto_pp3 = parseFloat(monto_pb3);
            } else {
                monto_pa3 = parseFloat($("#txtEfectivo3").val().split(",").join("")).toFixed(2); // 26/02
                monto_pp3 = parseFloat(monto_pa3);
            }

            var codigoVenta3 = ""; //EN BD
            var documento3 = ""; //EN BD

            cade_pagar3 += (codigoVenta3 + "," + documento3 + "," + (monto_pb3 == "" ? 0 : monto_pb3) + "," + (monto_pa3 == "" ? 0 : monto_pa3) + "," + (parseFloat($("#txt_monto_total").val()) === parseFloat($("#txtMonto").val()) ? "S" : "N"));


            var p_empresa3 = $("#cbo_Empresa").val();
            var p_user3 = $("#ctl00_txtus").val();
            var p_destino3 = $("#cbo_Det_Origen3").val(); // origen
            var p_moneda3 = $("#cbo_moneda").val();

            var p_fecha_pago3 = ConvertirDate($("#txtFechaPago").val());
            var medio_pa3 = $("#cboMedioPago3").val();
            var p_origen3 = $("#txtDestino3").val();

            if (medio_pa3 == "0020") {
                var p_documento3 = $("#txtNroOpe3.personas").html() == undefined ? "OP" + $("#cbo_appPago3").val() + " - " + "OP" + $("#txtNroOpe3").val() : $("#txtNroOpe3").val();
            } else {
                var p_documento3 = $("#txtNroOpe3.personas").html() == undefined ? "OP" + $("#txtNroOpe3").val() : $("#txtNroOpe3").val();
            }
            
            var adicional3 = "";
            var cod_ape3 = "";
            var det_desc3 = "", pidm_cta3 = "", cta3 = "", compl3 = "";
            var p_flag3 = 1;

            if (origenCobroInd3 == "B") {
                pidm_cta3 = $("#cbo_Det_Origen3 :selected").attr("pidm"); //Pidm Cuenta bancaria
                cta3 = $("#cbo_Det_Origen3").val();//Cuenta bancaria
                compl3 = "S";
                p_flag3 = 1.5;

                switch ($("#cboMedioPago3").val()) {
                    case "0001": //depósito bancario
                        det_desc3 = "DEPÓSITO*" + "/" + $("#txtClientes").val();
                        var p_origen3 = $("#cbDestino3").val();
                        break;

                    case "0003": //transferencia
                        det_desc3 = "TRANSFERENCIA*" + "/" + $("#txtClientes").val();
                        var p_origen3 = $("#cbDestino3").val();
                        break;

                    case "0013": //cheques bancarios
                        det_desc3 = "CHEQ.PAGADOR N°:" + $("#txtDestino").val() + " " + $("#txtClientes").val();
                        adicional3 = $("#txtDestino3").val();
                        compl3 = "N";
                        p_documento3 = "";
                        break;
                    case "0020": // OTROS (BILLETERA DIGITAL) DPORTA 09/12/2021
                        det_desc3 = "BILLETERA DIGITAL*" + "/" + $("#txtClientes").val();
                        var p_origen3 = $("#cbDestino3").val();
                        break;
                }
            } else if (origenCobroInd3 == "C") {

                switch ($("#cboMedioPago3").val()) {
                    case "0006": //tarjeta de credito
                        p_documento3 = p_documento3.replace("OP", "COD.AUT.");
                        p_origen3 = p_origen3.substring(12);
                        det_desc3 = $("#txtClientes").val() + "/" + $("#txtDestino3").val();
                        adicional3 = $("#slcPos3").val() + "|" + $("#slcTarjeta3").val() + "|" + $("#slcBco3").val() + "|W"; //pos|marca|banco|tipoind
                        break;

                    case "0005": // tarjeta de debito
                        p_documento3 = p_documento3.replace("OP", "COD.AUT.");
                        p_origen3 = p_origen3.substring(12);
                        det_desc3 = $("#txtClientes").val() + "/" + $("#txtDestino3").val();
                        adicional3 = $("#slcPos3").val() + "|" + $("#slcTarjeta3").val() + "|" + $("#slcBco3").val() + "|W";
                        break;
                }
                cod_ape3 = $("#cbo_Det_Origen3 :selected").attr("codigo");
            }

            var descripcion3 = origenCobroInd3 == "C" ? "COBRO A CLIENTE" : det_desc3;


            v_CTLG_CODE = p_empresa3;
            v_MONE_CODE = p_moneda3;
            v_USUA_ID = p_user3;
            v_DETALLE = cade_pagar3;
            v_fecha_pago = p_fecha_pago3;
            v_medio_pago = medio_pa3;
            v_descripcion = descripcion3;
            v_destino = p_destino3;
            v_documento = p_documento3;
            v_ORIGEN = p_origen3;
            v_adicional = adicional3;

            if (p_flag3 == "1") {
                v_codigo_apertura = cod_ape3;
                v_ind = "CAJ";
                v_pidm = "";
                v_cta_code = "";
                v_oficina = "";
                v_canal = "";
                v_ind_completo = "";
                v_MONTO_TOTAL = "0";

            } else if (p_flag3 == "1.5") {
                v_pidm = pidm_cta3;
                v_cta_code = cta3;
                v_ind_completo = compl3;
                v_MONTO_TOTAL = $("#txtEfectivo3").val().split(",").join("") + ";";
                v_ind = "BAN";
                v_codigo_apertura = "";
                v_oficina = "";
                v_canal = "";
            }

            datosPago3 += v_DETALLE + ";";
            datosPago3 += v_ORIGEN + ";";
            datosPago3 += v_USUA_ID + ";";
            datosPago3 += v_codigo_apertura + ";";
            datosPago3 += v_CTLG_CODE + ";";
            datosPago3 += v_MONE_CODE + ";";
            datosPago3 += v_medio_pago + ";";
            datosPago3 += v_descripcion + ";";
            datosPago3 += v_fecha_pago + ";";
            datosPago3 += v_destino + ";";
            datosPago3 += v_documento + ";";
            datosPago3 += v_ind + ";";
            datosPago3 += v_pidm + ";";
            datosPago3 += v_cta_code + ";";
            datosPago3 += v_oficina + ";";
            datosPago3 += v_canal + ";";
            datosPago3 += v_ind_completo + ";";
            datosPago3 += v_adicional + ";";
            datosPago3 += v_MONTO_TOTAL + ";";
            return datosPago3;
        }
    }
    return datosPago3;
}

function CargarDatosCobroPorDefecto() {
    //CARGA POR DEFECTO
    $("#txtMonto,#txtNroOpe, #txtNroOpe2, #txtNroOpe3").val("");//20/02
    //$('#cbo_OrigenPago, #cbo_OrigenPago2, #cbo_OrigenPago3').select2("val", "Caja").change();
    $('#cbo_OrigenPago').select2("val", "Caja").change();
    if ($("#cbo_Det_Origen option").length > 0) {
        //var cbo = $("#cbo_Det_Origen option");
        $("#cbo_Det_Origen").select2("val", $($("#cbo_Det_Origen option")[1]).val()).change();
    }
    if ($("#cbo_Det_Origen2 option").length > 0) {
        //var cbo = $("#cbo_Det_Origen2 option");
        $("#cbo_Det_Origen2").select2("val", $($("#cbo_Det_Origen2 option")[1]).val()).change();
    }
    //if ($("#cbo_Det_Origen3 option").length > 0) {
    //    //var cbo = $("#cbo_Det_Origen3 option");
    //    $("#cbo_Det_Origen3").select2("val", $($("#cbo_Det_Origen3 option")[1]).val()).change();
    //}

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

        var doid = $("#cboTipoDoc").val();
        var nro = $("#txtNroDctoCliente").val();

        var esCliente = false;
        $("#txtClientes").val(" ").keyup();
        $("#txtClientes").val("").keyup();

        //DPORTA
        if (prmtCLIE == 'NO') {
            if (nro.length == 11 && doid == '6') {
                if (rucValido(nro)) {
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
                } else {
                    infoCustom2("El RUC ingresado NO existe en SUNAT");
                }
            } else {
                if (jsonClientes != null && jsonClientes.length > 0) {

                    for (var i = 0; i < jsonClientes.length; i++) {
                        if ((parseInt(jsonClientes[i].CODIGO_TIPO_DOCUMENTO) == parseInt(doid) && jsonClientes[i].NRO_DOCUMENTO == nro) || (jsonClientes[i].RUC == parseInt(nro) && parseInt(doid) == 6)) {
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
            }
        } else {
            if (nro.length == 11 && doid == '6') {
                if (rucValido(nro)) {
                    fillTxtClienteEspecifico(nro)
                    if (jsonClientes != null && jsonClientes.length > 0) {

                        for (var i = 0; i < jsonClientes.length; i++) {
                            if ((parseInt(jsonClientes[i].CODIGO_TIPO_DOCUMENTO) == parseInt(doid) && parseInt(jsonClientes[i].NRO_DOCUMENTO) == parseInt(nro)) || (jsonClientes[i].RUC == parseInt(nro) && parseInt(doid) == 6)) {
                                esCliente = true;
                                $("#txtClientes").attr("disabled", false);
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
                } else {
                    infoCustom2("El RUC ingresado NO existe en SUNAT");
                }
            } else {
                fillTxtClienteEspecifico(nro)
                if (jsonClientes != null && jsonClientes.length > 0) {

                    for (var i = 0; i < jsonClientes.length; i++) {
                        if ((parseInt(jsonClientes[i].CODIGO_TIPO_DOCUMENTO) == parseInt(doid) && jsonClientes[i].NRO_DOCUMENTO == nro) || (jsonClientes[i].RUC == parseInt(nro) && parseInt(doid) == 6)) {
                            esCliente = true;
                            $("#txtClientes").attr("disabled", false);
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
            }
        }
    }
}

//DPORTA -- AMBAS FORMAS FUNCIONAN BIEN, PERO SE DEJÓ EN EL SEGUNDO PORQUE ES MÁS FÁCIL DE ENTENDER

//function rucValido(ruc) {
//    //11 dígitos y empieza en 10,15,16,17 o 20
//    if (!(ruc >= 1e10 && ruc < 11e9
//        || ruc >= 15e9 && ruc < 18e9
//        || ruc >= 2e10 && ruc < 21e9))
//        return false;

//    for (var suma = -(ruc % 10 < 2), i = 0; i < 11; i++ , ruc = ruc / 10 | 0)
//        suma += (ruc % 10) * (i % 7 + (i / 7 | 0) + 1);
//    return suma % 11 === 0;

//}

//DPORTA
function rucValido(ruc) {

    var dig01 = ruc.substr(0, 1) * 5;
    var dig02 = ruc.substr(1, 1) * 4;
    var dig03 = ruc.substr(2, 1) * 3;
    var dig04 = ruc.substr(3, 1) * 2;
    var dig05 = ruc.substr(4, 1) * 7;
    var dig06 = ruc.substr(5, 1) * 6;
    var dig07 = ruc.substr(6, 1) * 5;
    var dig08 = ruc.substr(7, 1) * 4;
    var dig09 = ruc.substr(8, 1) * 3;
    var dig10 = ruc.substr(9, 1) * 2;
    var dig11 = ruc.substr(10, 1);

    var suma = dig01 + dig02 + dig03 + dig04 + dig05 + dig06 + dig07 + dig08 + dig09 + dig10;

    var residuo = suma % 11;
    var resta = 11 - residuo;

    var digVerifica;

    if (resta == 10) {
        digVerifica = 0;
    } else if (resta == 11) {
        digVerifica = 1;
    } else {
        digVerifica = resta;
    }

    if (dig11 == digVerifica) {
        return true;
    } else {
        return false;
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

//Descargar dcto alternativo
var DescargarPDFAlt = function (sCodVenta) {

    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_CodDoc").val(sCodVenta);

    var data = new FormData();
    data.append("OPCION", "pdfAlternativo");
    data.append("p_CODE", sCodVenta);
    data.append("p_CTLG_CODE", $("#cbo_Empresa").val());
    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    data.append("p_PLAZO", $("#txt_plazo_pago").val());
    data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "La operación NO se ha realizado correctamente!")

    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdocv.ashx",
        contentType: false,
        data: data,
        processData: false,
        async: false,
        success: function (data) {
            if (data == "OK") {
                $("[id*=btnDescPDF]").click();
            } else {
                noexito();
                return;
            }
        },
        error: function (msg) {
            noexitoCustom("No se pudo generar el PDF.");
        }
    });

    //let ticket = $("#cboSerieDocVenta :selected").attr("data-ticket");
    //if (ticket == 'SI') {
    //    var data = new FormData();
    //    data.append("OPCION", "pdfAlternativo");
    //    data.append("p_CODE", sCodVenta);
    //    data.append("p_CTLG_CODE", $("#cbo_Empresa").val());
    //    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    //    data.append("p_PLAZO", $("#txt_plazo_pago").val());
    //    data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "La operación NO se ha realizado correctamente!")

    //    $.ajax({
    //        type: "POST",
    //        url: "vistas/nv/ajax/nvmdocv.ashx",
    //        contentType: false,
    //        data: data,
    //        processData: false,
    //        async: false,
    //        success: function (data) {
    //            if (data == "OK") {
    //                $("[id*=btnDescPDF]").click();
    //            } else {
    //                noexito();
    //                return;
    //            }
    //        },
    //        error: function (msg) {
    //            noexitoCustom("No se pudo generar el PDF.");
    //        }
    //    });

    //} else {
    //    console.log(sCodVenta);
    //    //if ($("#cboDocumentoVenta").val() == '0012' || $("#cboDocumentoVenta :selected").html().indexOf("TICKET") >= 0 || $("#cboDocumentoVenta").val() == '0101' || $("#cboDocumentoVenta").val() == '0001' || $("#cboDocumentoVenta").val() == '0003') {

    //    //    var data = new FormData();
    //    //    data.append("OPCION", "pdfAlternativo");
    //    //    data.append("p_CODE", sCodVenta);
    //    //    data.append("p_CTLG_CODE", $("#cbo_Empresa").val());
    //    //    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    //    //    data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "N")

    //    //    $.ajax({
    //    //        type: "POST",
    //    //        url: "vistas/nv/ajax/nvmdocv.ashx",
    //    //        contentType: false,
    //    //        data: data,
    //    //        processData: false,
    //    //        async: false,
    //    //        success: function (data) {
    //    //            if (data == "OK") {
    //    //                $("[id*=btnPdf_Click]").click();
    //    //            } else {
    //    //                noexito();
    //    //                return;
    //    //            }
    //    //        },
    //    //        error: function (msg) {
    //    //            noexitoCustom("No se pudo generar el PDF.");
    //    //        }
    //    //    });
    //    //} else {
    //    //    crearImpresion($("#txtNumDctoComp").val());
    //    //}
    //}
}


//WHATSAPP

function cargarTelefonos() {
    REGEX_TELE = "([0-9]*)"
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LTELEFONOS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);

        $('#cboClienteWhatsapp').selectize({
            persist: false,
            maxItems: null,
            valueField: 'telefono',
            labelField: 'name',
            searchField: ['name', 'telefono'],
            options: data,
            render: {
                item: function (item, escape) {
                    return '<div>' +
                        (item.name ? '<span class="name">' + escape(item.name) + '</span>&nbsp;' : '') +
                        (item.telefono ? '<span class="telefono">' + escape(item.telefono) + '</span>' : '') +
                        '</div>';
                },
                option: function (item, escape) {
                    var label = item.name || item.telefono;
                    var caption = item.name ? item.telefono : null;
                    return '<div style="padding: 2px">' +
                        '<span class="label" style="display: block; font-size: 14px; background-color: inherit; color: inherit; text-shadow: none">' + escape(label) + '</span>' +
                        (caption ? '<span class="caption" style="display: block; font-size: 12px; margin: 2px 5px">' + escape(caption) + '</span>' : '') +
                        '</div>';
                }
            },
            createFilter: function (input) {
                var match, regex;
                regex = new RegExp('^' + REGEX_TELE + '$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[0]);
                // name phone_number
                regex = new RegExp('^([^<]*)\<' + REGEX_TELE + '\>$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[2]);
                return false;
            },
            create: function (input) {
                if ((new RegExp('^' + REGEX_TELE + '$', 'i')).test(input)) {
                    return { telefono: input };
                }
                var match = input.match(new RegExp('^([^<]*)\<' + REGEX_TELE + '\>$', 'i'));
                if (match) { return { telefono: match[2], name: $.trim(match[1]) }; }
                alert('Invalid number.');
                return false;
            }
        });
        $('.selectize-control').css('margin-left', '0px').css('margin-bottom', '15px');
        $('.selectize-dropdown').css('margin-left', '0px');

        for (var c in data) {
            if (data[c].codigo === $('#hfPIDM').val()) {
                $("#cboClienteWhatsapp")[0].selectize.setValue(data[c].telefono);
                break;
            }
        }
    });
}

function enviarWhatsapp() {

    var telefonos = $("#cboClienteWhatsapp").val();

    if (vErrors(['cboClienteWhatsapp'])) {
        $('#btnEnviarWhatsapp').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        RECIPIENT_PHONE_NUMBER = telefonos.toString();
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=whatsapp" +
                "&p_CODE=" + $('#txtNumDctoComp').val() +
                "&p_CTLG_CODE=" + $('#cbo_Empresa').val() +
                "&p_PLAZO=" + $("#txt_plazo_pago").val() +
                "&RECIPIENT_PHONE_NUMBER=" + RECIPIENT_PHONE_NUMBER +
                "&MENSAJEWHATSAPP=" + $('#txtContenidoWhatsapp').val(),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                if (datos.indexOf("error") >= 0) {
                    alertCustom("El mensaje no se envio correctamente");
                } else {
                    exito();
                }
                $('#btnEnviarWhatsapp').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
                setTimeout(function () { $('#divWhatsapp').modal('hide'); }, 25);

            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el mensaje. Por favor, inténtelo nuevamente.');
                $('#btnEnviarWhatsapp').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            }
        });
    }
};

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
                HABIDO_IND = "1";
            } else {
                HABIDO_IND = "0";
            }
            DatosSunatCargados = data;
            debugger;
            Desbloquear("divConsultaHabido");
            $("#lblEstadoSunat").html(data.estado_del_contribuyente);
            $("#spanVerificando").html(data.condicion_de_domicilio);
        }
    };
}

function CancelarSunat() {
    $('#ModalSunat').modal('hide');
}

function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

function agregarGlosa() {
    var continuar = true;

    var glosa = $.trim($("#txt_glosa_det").val());
    var glosa_codigo = $("#hfTxtGlosaDet").val();

    var data = new FormData();

    data.append('p_GLOSA', glosa);
    data.append('p_GLOSA_CODIGO', glosa_codigo);

    if (continuar) {
        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=AGREGAR_GLOS",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos == "OK") {
                    autocompletarGlosa('#txt_glosa_det', $('#hfTxtGlosaDet').val());
                }
            })
            .error(function () {
                Desbloquear("ventana");
                alertCustom("Error al agregar glosa");
            });
    }
}

var autocompletarGlosa = function (v_ID, v_value) {
    var txtResp = $(v_ID);
    var parent = txtResp.parent();
    var newInput = $('<textarea id="' + txtResp.attr('id') + '" class="' + txtResp.attr('class') + '" maxlength="' + txtResp.attr('maxlength') + '" style="' + txtResp.attr('style') + '"></textarea>');

    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=GLOS",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                txtResp.replaceWith(newInput);
                txtResp = newInput;

                txtResp.typeahead({
                    source: function (query, process) {
                        txtResp.removeData('typeahead');

                        arrayNC = [];
                        map = {};

                        var obj = '[';
                        for (var i = 0; i < datos.length; i++) {
                            arrayNC.push(datos[i].DESCRIPCION);
                            obj += '{ "CODIGO" : "' + datos[i].CODIGO + '", "DESCRIPCION" : "' + datos[i].DESCRIPCION + '" },';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.DESCRIPCION] = objeto;
                        });
                        process(arrayNC);
                    },
                    updater: function (item) {
                        $('#hfTxtGlosaDet').val(map[item].CODIGO);
                        return item;
                    }
                });

                txtResp.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if (txtResp.val().length <= 0) {
                        $('#hfTxtGlosaDet').val('');
                    }
                });

                txtResp.keydown(function (e) {
                    if (e.keyCode === 13) {
                        var dropdownMenu = $(this).siblings("ul.dropdown-menu");
                        if (dropdownMenu.is(":visible")) {
                            e.preventDefault();
                            var activeItem = dropdownMenu.find(".active");
                            if (activeItem.length) {
                                activeItem.trigger("click");
                            }
                        }
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                txtResp.val(v_value);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
};